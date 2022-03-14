import { DataProvider, fetchUtils } from 'react-admin'
import { stringify } from 'qs'
import { mapValues } from 'lodash'
import { getBaseURL as getAPIBaseURL } from 'api'
import simpleRestProvider from 'ra-data-simple-rest'
import { PromiseQueue } from 'services/promiseQueue'
import { envFlag } from 'services/environment'

export const getBaseURL = () => `${getAPIBaseURL()}/admin`

const enableRequestQueue = envFlag(process.env.FLEXHIRE_QUEUE_API_CALLS)
let requestQueue

if (enableRequestQueue) {
  // Queue requests to avoid rails backend freezing in dev mode (probably because of code-reload).
  requestQueue = new PromiseQueue()
}

export const httpClient = async (url: string, options: RequestInit = {}) => {
  options.credentials = 'include' // https://github.com/developit/unfetch#fetchurl-string-options-object
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' })
  }
  if (enableRequestQueue) {
    return requestQueue.enqueue(
      (resolve, reject) => fetchUtils.fetchJson(url, options).then(resolve).catch(reject),
    )
  }
  return fetchUtils.fetchJson(url, options)
}

function flattenObjectParams(params) {
  params = { ...params }

  Object.keys(params).forEach((paramKey) => {
    const param = params[paramKey]

    if (typeof param === 'object' && param !== null) {
      delete params[paramKey]

      Object.keys(param).forEach(objectParamKey => params[objectParamKey] = param[objectParamKey])
    }
  })

  return params
}

const restClient = simpleRestProvider(getBaseURL(), httpClient)

async function runGetList(resource, params) {
  const { page, perPage } = params.pagination
  const { field, order } = params.sort
  const filters = flattenObjectParams(mapValues(params.filter, f => Array.isArray(f) ? f.join(',') : f))

  const query = {
    ...filters,
    _sort: field,
    _order: order,
    _start: (page - 1) * perPage,
    _end: page * perPage,
  }

  if (params.target) {
    // needed for getManyReference
    query[params.target] = params.id
  }

  const response = await httpClient(`${getBaseURL()}/${resource}?${stringify(query)}`, { method: 'GET' })

  return {
    data: response.json,
    total: parseInt(response.headers.get('x-total-count'), 10),
  }
}

const fixDataProvider = (client: DataProvider) => {
  // Overrideable methods: getOne, getMany, getManyReference, updateMany, create, delete, deleteMany
  // Source: https://github.com/marmelab/react-admin/blob/master/packages/ra-data-simple-rest/src/index.ts
  // We had to override some stuff because a few details in getMany were not playing nice with rails
  // When upgrading to v3, they changed how the simple-rest adapter works so we now have to override some other stuff
  return {
    ...client,
    getMany: (resource, params) => {
      /*
      GET_MANY works by doing this: GET api/resource?id=1&id=2&id=3
      Rails does not pick up on this and only sees the last duplicate param
      So we override the request handler to handle GET_MANY by making many
      requests.
      It's ugly but it works. I searched for how to get rails to understand
      URLs like the one above, found nothing, but if anyone is able to
      remove this override and fix the backend it'd be nice.
      */
      return Promise.all(
        params.ids.map(id => httpClient(`${getBaseURL()}/${resource}/${id}`, { method: 'GET' }).catch(() => null)),
      ).then((responses: any[]) => ({
        data: responses.filter(x => x !== null).map(response => response.json),
      }))
    },
    getList: async (resource, params) => {
      /*
      GET_LIST applies array filters like this: GET api/resource?filter_ids=1&filter_ids=2
      This is similar to GET_MANY: rails does not handle it well.
      We work around this by transforming the Array filters into this string form: ?filter_ids=1,2
      The backend must split by `,` to get the array back
      */
      return runGetList(resource, params)
    },
    getManyReference: async (resource, params) => {
      // runGetList can also handle getManyReference
      return runGetList(resource, params)
    },
  } as DataProvider
}

export const dataProvider = fixDataProvider(restClient)

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type HireFirmsPaginationQueryVariables = {
    count?: number | null;
    cursor?: string | null;
};
export type HireFirmsPaginationQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"FirmSelector_Query">;
};
export type HireFirmsPaginationQuery = {
    readonly response: HireFirmsPaginationQueryResponse;
    readonly variables: HireFirmsPaginationQueryVariables;
};



/*
query HireFirmsPaginationQuery(
  $count: Int = 5
  $cursor: String
) {
  ...FirmSelector_Query_1G22uz
}

fragment FirmSelector_Query_1G22uz on Query {
  firms(first: $count, after: $cursor) {
    totalCount
    edges {
      node {
        id
        slug
        name
        jobs(filters: {status: opened}) {
          totalCount
        }
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 5,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HireFirmsPaginationQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count"
          },
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          }
        ],
        "kind": "FragmentSpread",
        "name": "FirmSelector_Query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HireFirmsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FirmConnection",
        "kind": "LinkedField",
        "name": "firms",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "FirmEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Firm",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "filters",
                        "value": {
                          "status": "opened"
                        }
                      }
                    ],
                    "concreteType": "JobConnection",
                    "kind": "LinkedField",
                    "name": "jobs",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/)
                    ],
                    "storageKey": "jobs(filters:{\"status\":\"opened\"})"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "FirmSelector_firms",
        "kind": "LinkedHandle",
        "name": "firms"
      }
    ]
  },
  "params": {
    "cacheID": "40ee538ebcf861f6ca545c529e907630",
    "id": null,
    "metadata": {},
    "name": "HireFirmsPaginationQuery",
    "operationKind": "query",
    "text": "query HireFirmsPaginationQuery(\n  $count: Int = 5\n  $cursor: String\n) {\n  ...FirmSelector_Query_1G22uz\n}\n\nfragment FirmSelector_Query_1G22uz on Query {\n  firms(first: $count, after: $cursor) {\n    totalCount\n    edges {\n      node {\n        id\n        slug\n        name\n        jobs(filters: {status: opened}) {\n          totalCount\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5c8e6e031289fd7877055ed05e51a836';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type AdvertisingIntegrationsField_QueryVariables = {};
export type AdvertisingIntegrationsField_QueryResponse = {
    readonly jobIntegrationProviders: ReadonlyArray<{
        readonly name: string;
        readonly activationFeeUsd: number | null;
        readonly dailyFeeUsd: number | null;
    }> | null;
};
export type AdvertisingIntegrationsField_Query = {
    readonly response: AdvertisingIntegrationsField_QueryResponse;
    readonly variables: AdvertisingIntegrationsField_QueryVariables;
};



/*
query AdvertisingIntegrationsField_Query {
  jobIntegrationProviders {
    name
    activationFeeUsd
    dailyFeeUsd
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "JobIntegrationProvider",
    "kind": "LinkedField",
    "name": "jobIntegrationProviders",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "activationFeeUsd",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "dailyFeeUsd",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AdvertisingIntegrationsField_Query",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AdvertisingIntegrationsField_Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "882310c6bdf7964006590b76323777ec",
    "id": null,
    "metadata": {},
    "name": "AdvertisingIntegrationsField_Query",
    "operationKind": "query",
    "text": "query AdvertisingIntegrationsField_Query {\n  jobIntegrationProviders {\n    name\n    activationFeeUsd\n    dailyFeeUsd\n  }\n}\n"
  }
};
})();
(node as any).hash = '9edcc1eefc561018ecd447e0df24cf0d';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ClientSagas_ContractIdQueryVariables = {
    contractId: number;
};
export type ClientSagas_ContractIdQueryResponse = {
    readonly contract: {
        readonly id: string;
    } | null;
};
export type ClientSagas_ContractIdQuery = {
    readonly response: ClientSagas_ContractIdQueryResponse;
    readonly variables: ClientSagas_ContractIdQueryVariables;
};



/*
query ClientSagas_ContractIdQuery(
  $contractId: Int!
) {
  contract(rawId: $contractId) {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "contractId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "rawId",
        "variableName": "contractId"
      }
    ],
    "concreteType": "Contract",
    "kind": "LinkedField",
    "name": "contract",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ClientSagas_ContractIdQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ClientSagas_ContractIdQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "559c72045bfe122d4701eb12c9bf0c37",
    "id": null,
    "metadata": {},
    "name": "ClientSagas_ContractIdQuery",
    "operationKind": "query",
    "text": "query ClientSagas_ContractIdQuery(\n  $contractId: Int!\n) {\n  contract(rawId: $contractId) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '80179351576b0f89a5e5b7c8ff6bb673';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type FreelancerTypeField_QueryVariables = {};
export type FreelancerTypeField_QueryResponse = {
    readonly freelancerTypes: ReadonlyArray<{
        readonly name: string | null;
        readonly rawId: number | null;
    }> | null;
};
export type FreelancerTypeField_Query = {
    readonly response: FreelancerTypeField_QueryResponse;
    readonly variables: FreelancerTypeField_QueryVariables;
};



/*
query FreelancerTypeField_Query {
  freelancerTypes {
    name
    rawId
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FreelancerTypeField_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "FreelancerType",
        "kind": "LinkedField",
        "name": "freelancerTypes",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FreelancerTypeField_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "FreelancerType",
        "kind": "LinkedField",
        "name": "freelancerTypes",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "f4f5f143687a5e0e9babb26ea9bf021a",
    "id": null,
    "metadata": {},
    "name": "FreelancerTypeField_Query",
    "operationKind": "query",
    "text": "query FreelancerTypeField_Query {\n  freelancerTypes {\n    name\n    rawId\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '72d45cb34cd29b0d6029d2b97b8ee11d';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type Dashboard_QueryVariables = {};
export type Dashboard_QueryResponse = {
    readonly currentUser: {
        readonly managerContract: {
            readonly allowHireAccess: boolean | null;
            readonly allowManageAccess: boolean | null;
        } | null;
    } | null;
};
export type Dashboard_Query = {
    readonly response: Dashboard_QueryResponse;
    readonly variables: Dashboard_QueryVariables;
};



/*
query Dashboard_Query {
  currentUser {
    managerContract {
      allowHireAccess
      allowManageAccess
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allowHireAccess",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allowManageAccess",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Dashboard_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "managerContract",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/)
            ],
            "storageKey": null
          }
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
    "name": "Dashboard_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "managerContract",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6d0c3b60c662eeab1482366fff37d53b",
    "id": null,
    "metadata": {},
    "name": "Dashboard_Query",
    "operationKind": "query",
    "text": "query Dashboard_Query {\n  currentUser {\n    managerContract {\n      allowHireAccess\n      allowManageAccess\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '13bd52c41724da6b85841a618613f017';
export default node;

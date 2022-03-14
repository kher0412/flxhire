/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type NavigationMenu_QueryVariables = {};
export type NavigationMenu_QueryResponse = {
    readonly currentUser: {
        readonly managerContract: {
            readonly allowHireAccess: boolean | null;
            readonly allowManageAccess: boolean | null;
        } | null;
    } | null;
};
export type NavigationMenu_Query = {
    readonly response: NavigationMenu_QueryResponse;
    readonly variables: NavigationMenu_QueryVariables;
};



/*
query NavigationMenu_Query {
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
    "name": "NavigationMenu_Query",
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
    "name": "NavigationMenu_Query",
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
    "cacheID": "1316b9ccb9c71d5ba7db5c2abbfd0ff6",
    "id": null,
    "metadata": {},
    "name": "NavigationMenu_Query",
    "operationKind": "query",
    "text": "query NavigationMenu_Query {\n  currentUser {\n    managerContract {\n      allowHireAccess\n      allowManageAccess\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e6ac51340f3e62b9100f04895f13002f';
export default node;

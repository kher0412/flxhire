/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractSettingsDialog_UserQueryVariables = {};
export type ContractSettingsDialog_UserQueryResponse = {
    readonly currentUser: {
        readonly id: string;
        readonly managerContract: {
            readonly isFirmAdmin: boolean | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"ContractSettingsForm_User">;
    } | null;
};
export type ContractSettingsDialog_UserQuery = {
    readonly response: ContractSettingsDialog_UserQueryResponse;
    readonly variables: ContractSettingsDialog_UserQueryVariables;
};



/*
query ContractSettingsDialog_UserQuery {
  currentUser {
    id
    managerContract {
      isFirmAdmin
      id
    }
    ...ContractSettingsForm_User
  }
}

fragment ContractSettingsForm_User on User {
  id
  managerContract {
    allowManageAccess
    isFirmAdmin
    id
  }
  configuration {
    enableAutoBonuses
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFirmAdmin",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ContractSettingsDialog_UserQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "managerContract",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ContractSettingsForm_User"
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
    "name": "ContractSettingsDialog_UserQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "managerContract",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "allowManageAccess",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Configuration",
            "kind": "LinkedField",
            "name": "configuration",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "enableAutoBonuses",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "201722afbccf3de2c2a58899102e1c42",
    "id": null,
    "metadata": {},
    "name": "ContractSettingsDialog_UserQuery",
    "operationKind": "query",
    "text": "query ContractSettingsDialog_UserQuery {\n  currentUser {\n    id\n    managerContract {\n      isFirmAdmin\n      id\n    }\n    ...ContractSettingsForm_User\n  }\n}\n\nfragment ContractSettingsForm_User on User {\n  id\n  managerContract {\n    allowManageAccess\n    isFirmAdmin\n    id\n  }\n  configuration {\n    enableAutoBonuses\n  }\n}\n"
  }
};
})();
(node as any).hash = '77e314776703d5850d9fc392f5be7b69';
export default node;

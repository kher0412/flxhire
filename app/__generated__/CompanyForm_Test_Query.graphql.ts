/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type CompanyForm_Test_QueryVariables = {};
export type CompanyForm_Test_QueryResponse = {
    readonly currentUser: {
        readonly " $fragmentRefs": FragmentRefs<"CompanyForm_User">;
    } | null;
};
export type CompanyForm_Test_Query = {
    readonly response: CompanyForm_Test_QueryResponse;
    readonly variables: CompanyForm_Test_QueryVariables;
};



/*
query CompanyForm_Test_Query {
  currentUser {
    ...CompanyForm_User
    id
  }
}

fragment CompanyForm_User on User {
  managerContract {
    isFirmAdmin
    id
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CompanyForm_Test_Query",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "CompanyForm_User"
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
    "name": "CompanyForm_Test_Query",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isFirmAdmin",
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fb27c5f73273eee49377a5112f3550b3",
    "id": null,
    "metadata": {},
    "name": "CompanyForm_Test_Query",
    "operationKind": "query",
    "text": "query CompanyForm_Test_Query {\n  currentUser {\n    ...CompanyForm_User\n    id\n  }\n}\n\nfragment CompanyForm_User on User {\n  managerContract {\n    isFirmAdmin\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '3dd03aee9651c53e6461c21770e46afe';
export default node;

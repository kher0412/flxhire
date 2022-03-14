/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EmailSettingsContainer_QueryVariables = {};
export type EmailSettingsContainer_QueryResponse = {
    readonly currentUser: {
        readonly " $fragmentRefs": FragmentRefs<"EmailSettings_User">;
    } | null;
};
export type EmailSettingsContainer_Query = {
    readonly response: EmailSettingsContainer_QueryResponse;
    readonly variables: EmailSettingsContainer_QueryVariables;
};



/*
query EmailSettingsContainer_Query {
  currentUser {
    ...EmailSettings_User
    id
  }
}

fragment EmailSettings_User on User {
  emailSubscriptions {
    id
    subscriptionName
    userEnabled
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
    "name": "EmailSettingsContainer_Query",
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
            "name": "EmailSettings_User"
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
    "name": "EmailSettingsContainer_Query",
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
            "concreteType": "EmailSubscription",
            "kind": "LinkedField",
            "name": "emailSubscriptions",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "subscriptionName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "userEnabled",
                "storageKey": null
              }
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
    "cacheID": "0901ab6805c5c87f125b1025a4caa478",
    "id": null,
    "metadata": {},
    "name": "EmailSettingsContainer_Query",
    "operationKind": "query",
    "text": "query EmailSettingsContainer_Query {\n  currentUser {\n    ...EmailSettings_User\n    id\n  }\n}\n\nfragment EmailSettings_User on User {\n  emailSubscriptions {\n    id\n    subscriptionName\n    userEnabled\n  }\n}\n"
  }
};
})();
(node as any).hash = '53b186bd17a3a6eb14b7002e5e864f95';
export default node;

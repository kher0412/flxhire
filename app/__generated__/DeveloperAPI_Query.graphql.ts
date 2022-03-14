/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type DeveloperAPI_QueryVariables = {};
export type DeveloperAPI_QueryResponse = {
    readonly currentUser: {
        readonly " $fragmentRefs": FragmentRefs<"APIKeys_User">;
    } | null;
};
export type DeveloperAPI_Query = {
    readonly response: DeveloperAPI_QueryResponse;
    readonly variables: DeveloperAPI_QueryVariables;
};



/*
query DeveloperAPI_Query {
  currentUser {
    ...APIKeys_User
    id
  }
}

fragment APIKeyListItem_ApiKey on ApiKey {
  id
  keySlice
  createdAt
  lastUsedAt
  user {
    name
    id
  }
}

fragment APIKeys_User on User {
  apiKeys {
    ...APIKeyListItem_ApiKey
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
    "name": "DeveloperAPI_Query",
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
            "name": "APIKeys_User"
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
    "name": "DeveloperAPI_Query",
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
            "concreteType": "ApiKey",
            "kind": "LinkedField",
            "name": "apiKeys",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "keySlice",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "createdAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastUsedAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  (v0/*: any*/)
                ],
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
    "cacheID": "0edef6c9f7c2f1b112df287bb3848bf6",
    "id": null,
    "metadata": {},
    "name": "DeveloperAPI_Query",
    "operationKind": "query",
    "text": "query DeveloperAPI_Query {\n  currentUser {\n    ...APIKeys_User\n    id\n  }\n}\n\nfragment APIKeyListItem_ApiKey on ApiKey {\n  id\n  keySlice\n  createdAt\n  lastUsedAt\n  user {\n    name\n    id\n  }\n}\n\nfragment APIKeys_User on User {\n  apiKeys {\n    ...APIKeyListItem_ApiKey\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bf685e7b89938589bdae7d37b25c2c90';
export default node;

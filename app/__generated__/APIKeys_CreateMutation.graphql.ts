/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type CreateApiKeyInput = {
    clientMutationId?: string | null;
};
export type APIKeys_CreateMutationVariables = {
    input: CreateApiKeyInput;
};
export type APIKeys_CreateMutationResponse = {
    readonly createApiKey: {
        readonly key: string | null;
        readonly apiKey: {
            readonly user: {
                readonly apiKeys: ReadonlyArray<{
                    readonly " $fragmentRefs": FragmentRefs<"APIKeyListItem_ApiKey">;
                }> | null;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"APIKeyListItem_ApiKey">;
        } | null;
    } | null;
};
export type APIKeys_CreateMutation = {
    readonly response: APIKeys_CreateMutationResponse;
    readonly variables: APIKeys_CreateMutationVariables;
};



/*
mutation APIKeys_CreateMutation(
  $input: CreateApiKeyInput!
) {
  createApiKey(input: $input) {
    key
    apiKey {
      ...APIKeyListItem_ApiKey
      user {
        apiKeys {
          ...APIKeyListItem_ApiKey
          id
        }
        id
      }
      id
    }
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v3 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "APIKeyListItem_ApiKey"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "keySlice",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastUsedAt",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "APIKeys_CreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateApiKeyPayload",
        "kind": "LinkedField",
        "name": "createApiKey",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ApiKey",
            "kind": "LinkedField",
            "name": "apiKey",
            "plural": false,
            "selections": [
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
                    "concreteType": "ApiKey",
                    "kind": "LinkedField",
                    "name": "apiKeys",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "APIKeys_CreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateApiKeyPayload",
        "kind": "LinkedField",
        "name": "createApiKey",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ApiKey",
            "kind": "LinkedField",
            "name": "apiKey",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ApiKey",
                    "kind": "LinkedField",
                    "name": "apiKeys",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "user",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
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
    "cacheID": "bf788ea4ce7ee6c4b7ec3d34f3193ea3",
    "id": null,
    "metadata": {},
    "name": "APIKeys_CreateMutation",
    "operationKind": "mutation",
    "text": "mutation APIKeys_CreateMutation(\n  $input: CreateApiKeyInput!\n) {\n  createApiKey(input: $input) {\n    key\n    apiKey {\n      ...APIKeyListItem_ApiKey\n      user {\n        apiKeys {\n          ...APIKeyListItem_ApiKey\n          id\n        }\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment APIKeyListItem_ApiKey on ApiKey {\n  id\n  keySlice\n  createdAt\n  lastUsedAt\n  user {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '902be4c9a05569e01525abbc9842bdec';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type RemoveSignableDocumentInput = {
    clientMutationId?: string | null;
    signableDocumentId: string;
};
export type SignableDocuments_RemoveMutationVariables = {
    input: RemoveSignableDocumentInput;
};
export type SignableDocuments_RemoveMutationResponse = {
    readonly removeSignableDocument: {
        readonly signableDocument: {
            readonly id: string;
        } | null;
        readonly currentUser: {
            readonly firm: {
                readonly signableDocuments: ReadonlyArray<{
                    readonly id: string;
                    readonly title: string;
                    readonly url: string;
                    readonly user: {
                        readonly name: string | null;
                    } | null;
                }> | null;
            } | null;
        } | null;
    } | null;
};
export type SignableDocuments_RemoveMutation = {
    readonly response: SignableDocuments_RemoveMutationResponse;
    readonly variables: SignableDocuments_RemoveMutationVariables;
};



/*
mutation SignableDocuments_RemoveMutation(
  $input: RemoveSignableDocumentInput!
) {
  removeSignableDocument(input: $input) {
    signableDocument {
      id
    }
    currentUser {
      firm {
        signableDocuments {
          id
          title
          url
          user {
            name
            id
          }
        }
        id
      }
      id
    }
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v5 = {
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
    "name": "SignableDocuments_RemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveSignableDocumentPayload",
        "kind": "LinkedField",
        "name": "removeSignableDocument",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SignableDocument",
            "kind": "LinkedField",
            "name": "signableDocument",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          },
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
                "concreteType": "Firm",
                "kind": "LinkedField",
                "name": "firm",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SignableDocument",
                    "kind": "LinkedField",
                    "name": "signableDocuments",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "user",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/)
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
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignableDocuments_RemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveSignableDocumentPayload",
        "kind": "LinkedField",
        "name": "removeSignableDocument",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SignableDocument",
            "kind": "LinkedField",
            "name": "signableDocument",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteRecord",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id"
              }
            ],
            "storageKey": null
          },
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
                "concreteType": "Firm",
                "kind": "LinkedField",
                "name": "firm",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SignableDocument",
                    "kind": "LinkedField",
                    "name": "signableDocuments",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "user",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "40e4e5f830afe9748dc1127b28edcbbb",
    "id": null,
    "metadata": {},
    "name": "SignableDocuments_RemoveMutation",
    "operationKind": "mutation",
    "text": "mutation SignableDocuments_RemoveMutation(\n  $input: RemoveSignableDocumentInput!\n) {\n  removeSignableDocument(input: $input) {\n    signableDocument {\n      id\n    }\n    currentUser {\n      firm {\n        signableDocuments {\n          id\n          title\n          url\n          user {\n            name\n            id\n          }\n        }\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f6a1462a9256eaa86305e16211c87e45';
export default node;

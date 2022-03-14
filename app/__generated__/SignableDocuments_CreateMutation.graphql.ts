/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CreateSignableDocumentInput = {
    clientMutationId?: string | null;
    title: string;
    url: string;
};
export type SignableDocuments_CreateMutationVariables = {
    input: CreateSignableDocumentInput;
};
export type SignableDocuments_CreateMutationResponse = {
    readonly createSignableDocument: {
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
export type SignableDocuments_CreateMutation = {
    readonly response: SignableDocuments_CreateMutationResponse;
    readonly variables: SignableDocuments_CreateMutationVariables;
};



/*
mutation SignableDocuments_CreateMutation(
  $input: CreateSignableDocumentInput!
) {
  createSignableDocument(input: $input) {
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
    "name": "SignableDocuments_CreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateSignableDocumentPayload",
        "kind": "LinkedField",
        "name": "createSignableDocument",
        "plural": false,
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
    "name": "SignableDocuments_CreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateSignableDocumentPayload",
        "kind": "LinkedField",
        "name": "createSignableDocument",
        "plural": false,
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
    "cacheID": "14dd21e55a8533e0518be5aab868b109",
    "id": null,
    "metadata": {},
    "name": "SignableDocuments_CreateMutation",
    "operationKind": "mutation",
    "text": "mutation SignableDocuments_CreateMutation(\n  $input: CreateSignableDocumentInput!\n) {\n  createSignableDocument(input: $input) {\n    currentUser {\n      firm {\n        signableDocuments {\n          id\n          title\n          url\n          user {\n            name\n            id\n          }\n        }\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '996acc5a31dd7ad89bae567c5a76a535';
export default node;

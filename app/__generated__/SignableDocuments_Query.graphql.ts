/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type SignableDocuments_QueryVariables = {};
export type SignableDocuments_QueryResponse = {
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
};
export type SignableDocuments_Query = {
    readonly response: SignableDocuments_QueryResponse;
    readonly variables: SignableDocuments_QueryVariables;
};



/*
query SignableDocuments_Query {
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
  "name": "title",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SignableDocuments_Query",
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
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/)
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SignableDocuments_Query",
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
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
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
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d63b338709f5492307d58e45c8493a58",
    "id": null,
    "metadata": {},
    "name": "SignableDocuments_Query",
    "operationKind": "query",
    "text": "query SignableDocuments_Query {\n  currentUser {\n    firm {\n      signableDocuments {\n        id\n        title\n        url\n        user {\n          name\n          id\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '0c1540aa3f6ae97954e343961fb2539f';
export default node;

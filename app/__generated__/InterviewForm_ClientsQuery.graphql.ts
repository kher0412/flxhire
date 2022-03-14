/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type InterviewForm_ClientsQueryVariables = {};
export type InterviewForm_ClientsQueryResponse = {
    readonly currentUser: {
        readonly firm: {
            readonly users: ReadonlyArray<{
                readonly rawId: number | null;
                readonly name: string | null;
                readonly timezoneOffset: number | null;
            }> | null;
        } | null;
    } | null;
};
export type InterviewForm_ClientsQuery = {
    readonly response: InterviewForm_ClientsQueryResponse;
    readonly variables: InterviewForm_ClientsQueryVariables;
};



/*
query InterviewForm_ClientsQuery {
  currentUser {
    firm {
      users {
        rawId
        name
        timezoneOffset
        id
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
  "name": "rawId",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timezoneOffset",
  "storageKey": null
},
v3 = {
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
    "name": "InterviewForm_ClientsQuery",
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
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "users",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/)
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
    "name": "InterviewForm_ClientsQuery",
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
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "users",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "22441a9b731c7b4d1d59f707fc754b7c",
    "id": null,
    "metadata": {},
    "name": "InterviewForm_ClientsQuery",
    "operationKind": "query",
    "text": "query InterviewForm_ClientsQuery {\n  currentUser {\n    firm {\n      users {\n        rawId\n        name\n        timezoneOffset\n        id\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'dabf4885da0a925e2118c4ea1fc059db';
export default node;

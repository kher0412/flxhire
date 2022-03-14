/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type NotifyAboutJob_JobsQueryVariables = {};
export type NotifyAboutJob_JobsQueryResponse = {
    readonly currentUser: {
        readonly firm: {
            readonly jobs: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly rawId: number | null;
                        readonly title: string;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
};
export type NotifyAboutJob_JobsQuery = {
    readonly response: NotifyAboutJob_JobsQueryResponse;
    readonly variables: NotifyAboutJob_JobsQueryVariables;
};



/*
query NotifyAboutJob_JobsQuery {
  currentUser {
    firm {
      jobs(first: 20, filters: {status: opened}) {
        edges {
          node {
            rawId
            title
            id
          }
        }
      }
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "filters",
    "value": {
      "status": "opened"
    }
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
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
    "name": "NotifyAboutJob_JobsQuery",
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
                "args": (v0/*: any*/),
                "concreteType": "JobConnection",
                "kind": "LinkedField",
                "name": "jobs",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "JobEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Job",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "jobs(filters:{\"status\":\"opened\"},first:20)"
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
    "name": "NotifyAboutJob_JobsQuery",
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
                "args": (v0/*: any*/),
                "concreteType": "JobConnection",
                "kind": "LinkedField",
                "name": "jobs",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "JobEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Job",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v2/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "jobs(filters:{\"status\":\"opened\"},first:20)"
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
    "cacheID": "3c1e0bf702631585af573e4b8ea5756c",
    "id": null,
    "metadata": {},
    "name": "NotifyAboutJob_JobsQuery",
    "operationKind": "query",
    "text": "query NotifyAboutJob_JobsQuery {\n  currentUser {\n    firm {\n      jobs(first: 20, filters: {status: opened}) {\n        edges {\n          node {\n            rawId\n            title\n            id\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '9aa8205643979882fc41255afb68863e';
export default node;

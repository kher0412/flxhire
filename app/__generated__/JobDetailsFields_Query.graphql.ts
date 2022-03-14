/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type JobDetailsFields_QueryVariables = {};
export type JobDetailsFields_QueryResponse = {
    readonly freelancerTypes: ReadonlyArray<{
        readonly name: string | null;
        readonly rawId: number | null;
        readonly slug: string | null;
    }> | null;
    readonly freelancerSubtypes: ReadonlyArray<{
        readonly name: string | null;
        readonly rawId: number | null;
        readonly freelancerType: {
            readonly rawId: number | null;
        } | null;
    }> | null;
    readonly skills: ReadonlyArray<{
        readonly rawId: number | null;
        readonly name: string | null;
        readonly freelancerTypes: ReadonlyArray<{
            readonly rawId: number | null;
        }> | null;
        readonly customUser: {
            readonly firm: {
                readonly rawId: number | null;
            } | null;
        } | null;
    }> | null;
    readonly firm: {
        readonly users: ReadonlyArray<{
            readonly rawId: number | null;
            readonly name: string | null;
        }> | null;
    } | null;
};
export type JobDetailsFields_Query = {
    readonly response: JobDetailsFields_QueryResponse;
    readonly variables: JobDetailsFields_QueryVariables;
};



/*
query JobDetailsFields_Query {
  freelancerTypes {
    name
    rawId
    slug
    id
  }
  freelancerSubtypes {
    name
    rawId
    freelancerType {
      rawId
      id
    }
    id
  }
  skills {
    rawId
    name
    freelancerTypes {
      rawId
      id
    }
    customUser {
      firm {
        rawId
        id
      }
      id
    }
    id
  }
  firm {
    users {
      rawId
      name
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
  "name": "name",
  "storageKey": null
},
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
  "name": "slug",
  "storageKey": null
},
v3 = [
  (v1/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  (v1/*: any*/),
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "JobDetailsFields_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "FreelancerType",
        "kind": "LinkedField",
        "name": "freelancerTypes",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "FreelancerSubtype",
        "kind": "LinkedField",
        "name": "freelancerSubtypes",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "FreelancerType",
            "kind": "LinkedField",
            "name": "freelancerType",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Skill",
        "kind": "LinkedField",
        "name": "skills",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "FreelancerType",
            "kind": "LinkedField",
            "name": "freelancerTypes",
            "plural": true,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "customUser",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Firm",
                "kind": "LinkedField",
                "name": "firm",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
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
              (v1/*: any*/),
              (v0/*: any*/)
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
    "name": "JobDetailsFields_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "FreelancerType",
        "kind": "LinkedField",
        "name": "freelancerTypes",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "FreelancerSubtype",
        "kind": "LinkedField",
        "name": "freelancerSubtypes",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "FreelancerType",
            "kind": "LinkedField",
            "name": "freelancerType",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Skill",
        "kind": "LinkedField",
        "name": "skills",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "FreelancerType",
            "kind": "LinkedField",
            "name": "freelancerTypes",
            "plural": true,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "customUser",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Firm",
                "kind": "LinkedField",
                "name": "firm",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      },
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
              (v1/*: any*/),
              (v0/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6dfa2d51489fdc04160bff50b3163979",
    "id": null,
    "metadata": {},
    "name": "JobDetailsFields_Query",
    "operationKind": "query",
    "text": "query JobDetailsFields_Query {\n  freelancerTypes {\n    name\n    rawId\n    slug\n    id\n  }\n  freelancerSubtypes {\n    name\n    rawId\n    freelancerType {\n      rawId\n      id\n    }\n    id\n  }\n  skills {\n    rawId\n    name\n    freelancerTypes {\n      rawId\n      id\n    }\n    customUser {\n      firm {\n        rawId\n        id\n      }\n      id\n    }\n    id\n  }\n  firm {\n    users {\n      rawId\n      name\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ac2d8bbc2d4080ce57dfd9650b6b517c';
export default node;

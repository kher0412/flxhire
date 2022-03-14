/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type JobStatus = "closed" | "draft" | "opened";
export type InvitationEditorMainQuery_JobQueryVariables = {
    contractId?: number | null;
    hasContract: boolean;
    freelancerId?: number | null;
    hasFreelancer: boolean;
};
export type InvitationEditorMainQuery_JobQueryResponse = {
    readonly currentUser: {
        readonly id: string;
        readonly firm: {
            readonly currency: {
                readonly code: string | null;
            } | null;
            readonly jobs: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly id: string;
                        readonly title: string;
                        readonly status: JobStatus | null;
                    } | null;
                } | null> | null;
            } | null;
            readonly users: ReadonlyArray<{
                readonly id: string;
                readonly self: boolean | null;
                readonly name: string | null;
            }> | null;
        } | null;
        readonly managerContract: {
            readonly allowManageAccess: boolean | null;
        } | null;
    } | null;
    readonly freelancer?: {
        readonly id: string;
        readonly firstName: string | null;
    } | null;
    readonly contract?: {
        readonly id: string;
        readonly job: {
            readonly id: string;
        } | null;
        readonly freelancer: {
            readonly id: string;
            readonly firstName: string | null;
            readonly lastName: string | null;
            readonly email: string | null;
        } | null;
        readonly client: {
            readonly id: string;
            readonly firstName: string | null;
        } | null;
        readonly currency: {
            readonly code: string | null;
        };
        readonly managedOffPlatform: boolean | null;
        readonly clientRate: {
            readonly currency: {
                readonly code: string | null;
            };
            readonly value: number;
        } | null;
        readonly freelancerRate: {
            readonly currency: {
                readonly code: string | null;
            };
            readonly value: number;
        } | null;
        readonly annualCompensation: {
            readonly currency: {
                readonly code: string | null;
            };
            readonly value: number;
        } | null;
        readonly projectLengthInMonths: number | null;
    } | null;
};
export type InvitationEditorMainQuery_JobQuery = {
    readonly response: InvitationEditorMainQuery_JobQueryResponse;
    readonly variables: InvitationEditorMainQuery_JobQueryVariables;
};



/*
query InvitationEditorMainQuery_JobQuery(
  $contractId: Int
  $hasContract: Boolean!
  $freelancerId: Int
  $hasFreelancer: Boolean!
) {
  currentUser {
    id
    firm {
      currency {
        code
        id
      }
      jobs {
        edges {
          node {
            id
            title
            status
          }
        }
      }
      users {
        id
        self
        name
      }
      id
    }
    managerContract {
      allowManageAccess
      id
    }
  }
  freelancer: user(rawId: $freelancerId) @include(if: $hasFreelancer) {
    id
    firstName
  }
  contract(rawId: $contractId) @include(if: $hasContract) {
    id
    job {
      id
    }
    freelancer {
      id
      firstName
      lastName
      email
    }
    client {
      id
      firstName
    }
    currency {
      code
      id
    }
    managedOffPlatform
    clientRate {
      currency {
        code
        id
      }
      value
    }
    freelancerRate {
      currency {
        code
        id
      }
      value
    }
    annualCompensation {
      currency {
        code
        id
      }
      value
    }
    projectLengthInMonths
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "contractId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "freelancerId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasContract"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasFreelancer"
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
  "name": "code",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    (v5/*: any*/)
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
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
            (v4/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "status",
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
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "users",
  "plural": true,
  "selections": [
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "self",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allowManageAccess",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v11 = [
  (v4/*: any*/),
  (v10/*: any*/)
],
v12 = {
  "condition": "hasFreelancer",
  "kind": "Condition",
  "passingValue": true,
  "selections": [
    {
      "alias": "freelancer",
      "args": [
        {
          "kind": "Variable",
          "name": "rawId",
          "variableName": "freelancerId"
        }
      ],
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": (v11/*: any*/),
      "storageKey": null
    }
  ]
},
v13 = [
  {
    "kind": "Variable",
    "name": "rawId",
    "variableName": "contractId"
  }
],
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "Job",
  "kind": "LinkedField",
  "name": "job",
  "plural": false,
  "selections": [
    (v4/*: any*/)
  ],
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "freelancer",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v10/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "client",
  "plural": false,
  "selections": (v11/*: any*/),
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "managedOffPlatform",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v19 = [
  (v6/*: any*/),
  (v18/*: any*/)
],
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "projectLengthInMonths",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    (v4/*: any*/)
  ],
  "storageKey": null
},
v22 = [
  (v21/*: any*/),
  (v18/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "InvitationEditorMainQuery_JobQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Firm",
            "kind": "LinkedField",
            "name": "firm",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "managerContract",
            "plural": false,
            "selections": [
              (v9/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      (v12/*: any*/),
      {
        "condition": "hasContract",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v13/*: any*/),
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v6/*: any*/),
              (v17/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "clientRate",
                "plural": false,
                "selections": (v19/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "freelancerRate",
                "plural": false,
                "selections": (v19/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "annualCompensation",
                "plural": false,
                "selections": (v19/*: any*/),
                "storageKey": null
              },
              (v20/*: any*/)
            ],
            "storageKey": null
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "InvitationEditorMainQuery_JobQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Firm",
            "kind": "LinkedField",
            "name": "firm",
            "plural": false,
            "selections": [
              (v21/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "managerContract",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      (v12/*: any*/),
      {
        "condition": "hasContract",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v13/*: any*/),
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v21/*: any*/),
              (v17/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "clientRate",
                "plural": false,
                "selections": (v22/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "freelancerRate",
                "plural": false,
                "selections": (v22/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "annualCompensation",
                "plural": false,
                "selections": (v22/*: any*/),
                "storageKey": null
              },
              (v20/*: any*/)
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "97d989e35edbd0f1d980c9785d683555",
    "id": null,
    "metadata": {},
    "name": "InvitationEditorMainQuery_JobQuery",
    "operationKind": "query",
    "text": "query InvitationEditorMainQuery_JobQuery(\n  $contractId: Int\n  $hasContract: Boolean!\n  $freelancerId: Int\n  $hasFreelancer: Boolean!\n) {\n  currentUser {\n    id\n    firm {\n      currency {\n        code\n        id\n      }\n      jobs {\n        edges {\n          node {\n            id\n            title\n            status\n          }\n        }\n      }\n      users {\n        id\n        self\n        name\n      }\n      id\n    }\n    managerContract {\n      allowManageAccess\n      id\n    }\n  }\n  freelancer: user(rawId: $freelancerId) @include(if: $hasFreelancer) {\n    id\n    firstName\n  }\n  contract(rawId: $contractId) @include(if: $hasContract) {\n    id\n    job {\n      id\n    }\n    freelancer {\n      id\n      firstName\n      lastName\n      email\n    }\n    client {\n      id\n      firstName\n    }\n    currency {\n      code\n      id\n    }\n    managedOffPlatform\n    clientRate {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    freelancerRate {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    annualCompensation {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    projectLengthInMonths\n  }\n}\n"
  }
};
})();
(node as any).hash = '6589f52c354d7a89fb64fd2c65d0fd5f';
export default node;

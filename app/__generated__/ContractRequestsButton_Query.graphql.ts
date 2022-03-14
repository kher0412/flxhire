/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractRequestsStatus = "completed" | "pending" | "rejected" | "started";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type ContractRequestsButton_QueryVariables = {
    freelancerId?: number | null;
    contractId?: number | null;
    withContract: boolean;
    withFreelancer: boolean;
};
export type ContractRequestsButton_QueryResponse = {
    readonly contract?: {
        readonly status: ContractStatus;
        readonly requestsStatus: ContractRequestsStatus | null;
        readonly job: {
            readonly " $fragmentRefs": FragmentRefs<"RequestMoreInfoDialog_Job">;
        } | null;
        readonly contractRequests: ReadonlyArray<{
            readonly status: string | null;
            readonly requestType: string | null;
        }> | null;
        readonly " $fragmentRefs": FragmentRefs<"RequestMoreInfoDialog_Contract">;
    } | null;
    readonly freelancer?: {
        readonly video: {
            readonly status: string;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"RequestMoreInfoDialog_Freelancer">;
    } | null;
};
export type ContractRequestsButton_Query = {
    readonly response: ContractRequestsButton_QueryResponse;
    readonly variables: ContractRequestsButton_QueryVariables;
};



/*
query ContractRequestsButton_Query(
  $freelancerId: Int
  $contractId: Int
  $withContract: Boolean!
  $withFreelancer: Boolean!
) {
  contract(rawId: $contractId) @include(if: $withContract) {
    status
    requestsStatus
    job {
      ...RequestMoreInfoDialog_Job
      id
    }
    contractRequests {
      status
      requestType
      id
    }
    ...RequestMoreInfoDialog_Contract
    id
  }
  freelancer: user(rawId: $freelancerId) @include(if: $withFreelancer) {
    video {
      status
      id
    }
    ...RequestMoreInfoDialog_Freelancer
    id
  }
}

fragment RequestMoreInfoDialog_Contract on Contract {
  id
  rawId
  answers {
    question {
      rawId
      id
    }
    id
  }
  projectSubmission {
    url
    screenshotUrl
    description
    project {
      title
      id
    }
    id
  }
  contractRequests {
    status
    requestType
    question {
      rawId
      title
      id
    }
    project {
      rawId
      title
      description
      id
    }
    projectSubmission {
      rawId
      url
      screenshotUrl
      description
      id
    }
    id
  }
}

fragment RequestMoreInfoDialog_Freelancer on User {
  firstName
  video {
    id
  }
}

fragment RequestMoreInfoDialog_Job on Job {
  rawId
  screeningRequestMessageTemplate
  questions {
    rawId
    title
    id
  }
  project {
    rawId
    title
    description
    id
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
  "name": "withContract"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "withFreelancer"
},
v4 = [
  {
    "kind": "Variable",
    "name": "rawId",
    "variableName": "contractId"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "requestsStatus",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "requestType",
  "storageKey": null
},
v8 = [
  {
    "kind": "Variable",
    "name": "rawId",
    "variableName": "freelancerId"
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = [
  (v9/*: any*/),
  (v10/*: any*/),
  (v11/*: any*/)
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "Project",
  "kind": "LinkedField",
  "name": "project",
  "plural": false,
  "selections": [
    (v9/*: any*/),
    (v10/*: any*/),
    (v13/*: any*/),
    (v11/*: any*/)
  ],
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "screenshotUrl",
  "storageKey": null
};
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
    "name": "ContractRequestsButton_Query",
    "selections": [
      {
        "condition": "withContract",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Job",
                "kind": "LinkedField",
                "name": "job",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "RequestMoreInfoDialog_Job"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ContractRequest",
                "kind": "LinkedField",
                "name": "contractRequests",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "RequestMoreInfoDialog_Contract"
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "condition": "withFreelancer",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": "freelancer",
            "args": (v8/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Video",
                "kind": "LinkedField",
                "name": "video",
                "plural": false,
                "selections": [
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "RequestMoreInfoDialog_Freelancer"
              }
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
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "ContractRequestsButton_Query",
    "selections": [
      {
        "condition": "withContract",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Job",
                "kind": "LinkedField",
                "name": "job",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "screeningRequestMessageTemplate",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Question",
                    "kind": "LinkedField",
                    "name": "questions",
                    "plural": true,
                    "selections": (v12/*: any*/),
                    "storageKey": null
                  },
                  (v14/*: any*/),
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ContractRequest",
                "kind": "LinkedField",
                "name": "contractRequests",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v7/*: any*/),
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Question",
                    "kind": "LinkedField",
                    "name": "question",
                    "plural": false,
                    "selections": (v12/*: any*/),
                    "storageKey": null
                  },
                  (v14/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ProjectSubmission",
                    "kind": "LinkedField",
                    "name": "projectSubmission",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v13/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v11/*: any*/),
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Video",
                "kind": "LinkedField",
                "name": "answers",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Question",
                    "kind": "LinkedField",
                    "name": "question",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ProjectSubmission",
                "kind": "LinkedField",
                "name": "projectSubmission",
                "plural": false,
                "selections": [
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v13/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Project",
                    "kind": "LinkedField",
                    "name": "project",
                    "plural": false,
                    "selections": [
                      (v10/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "condition": "withFreelancer",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": "freelancer",
            "args": (v8/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Video",
                "kind": "LinkedField",
                "name": "video",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "firstName",
                "storageKey": null
              },
              (v11/*: any*/)
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "0fc086dda521e1e92fb42e4e63231dc2",
    "id": null,
    "metadata": {},
    "name": "ContractRequestsButton_Query",
    "operationKind": "query",
    "text": "query ContractRequestsButton_Query(\n  $freelancerId: Int\n  $contractId: Int\n  $withContract: Boolean!\n  $withFreelancer: Boolean!\n) {\n  contract(rawId: $contractId) @include(if: $withContract) {\n    status\n    requestsStatus\n    job {\n      ...RequestMoreInfoDialog_Job\n      id\n    }\n    contractRequests {\n      status\n      requestType\n      id\n    }\n    ...RequestMoreInfoDialog_Contract\n    id\n  }\n  freelancer: user(rawId: $freelancerId) @include(if: $withFreelancer) {\n    video {\n      status\n      id\n    }\n    ...RequestMoreInfoDialog_Freelancer\n    id\n  }\n}\n\nfragment RequestMoreInfoDialog_Contract on Contract {\n  id\n  rawId\n  answers {\n    question {\n      rawId\n      id\n    }\n    id\n  }\n  projectSubmission {\n    url\n    screenshotUrl\n    description\n    project {\n      title\n      id\n    }\n    id\n  }\n  contractRequests {\n    status\n    requestType\n    question {\n      rawId\n      title\n      id\n    }\n    project {\n      rawId\n      title\n      description\n      id\n    }\n    projectSubmission {\n      rawId\n      url\n      screenshotUrl\n      description\n      id\n    }\n    id\n  }\n}\n\nfragment RequestMoreInfoDialog_Freelancer on User {\n  firstName\n  video {\n    id\n  }\n}\n\nfragment RequestMoreInfoDialog_Job on Job {\n  rawId\n  screeningRequestMessageTemplate\n  questions {\n    rawId\n    title\n    id\n  }\n  project {\n    rawId\n    title\n    description\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '907cf2f0ac6b2d49348d36034a83b17b';
export default node;

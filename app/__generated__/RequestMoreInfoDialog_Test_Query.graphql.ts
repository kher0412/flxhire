/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RequestMoreInfoDialog_Test_QueryVariables = {
    freelancerId?: number | null;
    contractId?: number | null;
    withContract: boolean;
    withFreelancer: boolean;
};
export type RequestMoreInfoDialog_Test_QueryResponse = {
    readonly contract?: {
        readonly job: {
            readonly " $fragmentRefs": FragmentRefs<"RequestMoreInfoDialog_Job">;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"RequestMoreInfoDialog_Contract">;
    } | null;
    readonly freelancer?: {
        readonly " $fragmentRefs": FragmentRefs<"RequestMoreInfoDialog_Freelancer">;
    } | null;
};
export type RequestMoreInfoDialog_Test_Query = {
    readonly response: RequestMoreInfoDialog_Test_QueryResponse;
    readonly variables: RequestMoreInfoDialog_Test_QueryVariables;
};



/*
query RequestMoreInfoDialog_Test_Query(
  $freelancerId: Int
  $contractId: Int
  $withContract: Boolean!
  $withFreelancer: Boolean!
) {
  contract(rawId: $contractId) @include(if: $withContract) {
    job {
      ...RequestMoreInfoDialog_Job
      id
    }
    ...RequestMoreInfoDialog_Contract
    id
  }
  freelancer: user(rawId: $freelancerId) @include(if: $withFreelancer) {
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
v5 = [
  {
    "kind": "Variable",
    "name": "rawId",
    "variableName": "freelancerId"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = [
  (v6/*: any*/),
  (v7/*: any*/),
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Project",
  "kind": "LinkedField",
  "name": "project",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    (v7/*: any*/),
    (v10/*: any*/),
    (v8/*: any*/)
  ],
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v13 = {
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
    "name": "RequestMoreInfoDialog_Test_Query",
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
            "args": (v5/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
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
    "name": "RequestMoreInfoDialog_Test_Query",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "Job",
                "kind": "LinkedField",
                "name": "job",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
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
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/),
              (v6/*: any*/),
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
                      (v6/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
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
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Project",
                    "kind": "LinkedField",
                    "name": "project",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "requestType",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Question",
                    "kind": "LinkedField",
                    "name": "question",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ProjectSubmission",
                    "kind": "LinkedField",
                    "name": "projectSubmission",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v10/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
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
            "args": (v5/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "firstName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Video",
                "kind": "LinkedField",
                "name": "video",
                "plural": false,
                "selections": [
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "99b7f190f1e0866e2494f58601022d2c",
    "id": null,
    "metadata": {},
    "name": "RequestMoreInfoDialog_Test_Query",
    "operationKind": "query",
    "text": "query RequestMoreInfoDialog_Test_Query(\n  $freelancerId: Int\n  $contractId: Int\n  $withContract: Boolean!\n  $withFreelancer: Boolean!\n) {\n  contract(rawId: $contractId) @include(if: $withContract) {\n    job {\n      ...RequestMoreInfoDialog_Job\n      id\n    }\n    ...RequestMoreInfoDialog_Contract\n    id\n  }\n  freelancer: user(rawId: $freelancerId) @include(if: $withFreelancer) {\n    ...RequestMoreInfoDialog_Freelancer\n    id\n  }\n}\n\nfragment RequestMoreInfoDialog_Contract on Contract {\n  id\n  rawId\n  answers {\n    question {\n      rawId\n      id\n    }\n    id\n  }\n  projectSubmission {\n    url\n    screenshotUrl\n    description\n    project {\n      title\n      id\n    }\n    id\n  }\n  contractRequests {\n    status\n    requestType\n    question {\n      rawId\n      title\n      id\n    }\n    project {\n      rawId\n      title\n      description\n      id\n    }\n    projectSubmission {\n      rawId\n      url\n      screenshotUrl\n      description\n      id\n    }\n    id\n  }\n}\n\nfragment RequestMoreInfoDialog_Freelancer on User {\n  firstName\n  video {\n    id\n  }\n}\n\nfragment RequestMoreInfoDialog_Job on Job {\n  rawId\n  screeningRequestMessageTemplate\n  questions {\n    rawId\n    title\n    id\n  }\n  project {\n    rawId\n    title\n    description\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '3aae71f456abf77c73e27e003a4cd66a';
export default node;

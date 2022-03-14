/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobSourcingStep_Test_JobQueryVariables = {
    jobSlug?: string | null;
    hasJob: boolean;
};
export type JobSourcingStep_Test_JobQueryResponse = {
    readonly job?: {
        readonly " $fragmentRefs": FragmentRefs<"JobSourcingStep_Job">;
    } | null;
};
export type JobSourcingStep_Test_JobQuery = {
    readonly response: JobSourcingStep_Test_JobQueryResponse;
    readonly variables: JobSourcingStep_Test_JobQueryVariables;
};



/*
query JobSourcingStep_Test_JobQuery(
  $jobSlug: String
  $hasJob: Boolean!
) {
  job(slug: $jobSlug) @include(if: $hasJob) {
    ...JobSourcingStep_Job
    id
  }
}

fragment JobHiringManagerFields_Job on Job {
  user {
    firm {
      billingPlan {
        allowFlexhireRecruiters
        dailyFlexhireRecruiterPerJobFeeUsd
        id
      }
      users {
        id
        rawId
        name
      }
      id
    }
    id
  }
  recruiters {
    id
    rawId
    name
  }
}

fragment JobSourcingForm_Job on Job {
  slug
  status
  ...JobHiringManagerFields_Job
}

fragment JobSourcingStep_Job on Job {
  slug
  user {
    rawId
    id
  }
  hiringManager {
    rawId
    id
  }
  hiringManagerType
  referralBounty {
    currency {
      code
      id
    }
    value
  }
  activeJobIntegrationsNames
  candidatesToNotify {
    rawId
    status
    id
  }
  automaticallyNotifyCandidates
  jobSocialIntegrations
  ...JobSourcingForm_Job
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasJob"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "jobSlug"
},
v2 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "jobSlug"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  (v4/*: any*/),
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "JobSourcingStep_Test_JobQuery",
    "selections": [
      {
        "condition": "hasJob",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "Job",
            "kind": "LinkedField",
            "name": "job",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "JobSourcingStep_Job"
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
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "JobSourcingStep_Test_JobQuery",
    "selections": [
      {
        "condition": "hasJob",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "Job",
            "kind": "LinkedField",
            "name": "job",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
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
                        "concreteType": "BillingPlan",
                        "kind": "LinkedField",
                        "name": "billingPlan",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "allowFlexhireRecruiters",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "dailyFlexhireRecruiterPerJobFeeUsd",
                            "storageKey": null
                          },
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "users",
                        "plural": true,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "hiringManager",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hiringManagerType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "referralBounty",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Currency",
                    "kind": "LinkedField",
                    "name": "currency",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "code",
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "value",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "activeJobIntegrationsNames",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CandidateToNotify",
                "kind": "LinkedField",
                "name": "candidatesToNotify",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v6/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "automaticallyNotifyCandidates",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "jobSocialIntegrations",
                "storageKey": null
              },
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "recruiters",
                "plural": true,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "2123f38335bc6d4821628a3cc97fbf7b",
    "id": null,
    "metadata": {},
    "name": "JobSourcingStep_Test_JobQuery",
    "operationKind": "query",
    "text": "query JobSourcingStep_Test_JobQuery(\n  $jobSlug: String\n  $hasJob: Boolean!\n) {\n  job(slug: $jobSlug) @include(if: $hasJob) {\n    ...JobSourcingStep_Job\n    id\n  }\n}\n\nfragment JobHiringManagerFields_Job on Job {\n  user {\n    firm {\n      billingPlan {\n        allowFlexhireRecruiters\n        dailyFlexhireRecruiterPerJobFeeUsd\n        id\n      }\n      users {\n        id\n        rawId\n        name\n      }\n      id\n    }\n    id\n  }\n  recruiters {\n    id\n    rawId\n    name\n  }\n}\n\nfragment JobSourcingForm_Job on Job {\n  slug\n  status\n  ...JobHiringManagerFields_Job\n}\n\nfragment JobSourcingStep_Job on Job {\n  slug\n  user {\n    rawId\n    id\n  }\n  hiringManager {\n    rawId\n    id\n  }\n  hiringManagerType\n  referralBounty {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  activeJobIntegrationsNames\n  candidatesToNotify {\n    rawId\n    status\n    id\n  }\n  automaticallyNotifyCandidates\n  jobSocialIntegrations\n  ...JobSourcingForm_Job\n}\n"
  }
};
})();
(node as any).hash = '0e65c6678db0337d30f26ddab5f939fe';
export default node;

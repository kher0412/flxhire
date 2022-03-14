/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UpdateJobSourcingInput = {
    activeJobIntegrationsNames?: Array<string> | null;
    automaticallyNotifyCandidates?: boolean | null;
    candidatesToNotify?: Array<CandidateToNotifyAttributes> | null;
    clientMutationId?: string | null;
    hiringManagerId?: number | null;
    jobSocialIntegrations?: Array<string> | null;
    referralBounty?: MoneyInput | null;
    slug: string;
    userId?: number | null;
};
export type CandidateToNotifyAttributes = {
    rawId?: number | null;
};
export type MoneyInput = {
    currencyCode: string;
    value: number;
};
export type JobSourcingStep_UpdateJobDetailsMutationVariables = {
    input: UpdateJobSourcingInput;
};
export type JobSourcingStep_UpdateJobDetailsMutationResponse = {
    readonly updateJobSourcing: {
        readonly job: {
            readonly user: {
                readonly id: string;
                readonly rawId: number | null;
                readonly name: string | null;
            } | null;
            readonly hiringManager: {
                readonly id: string;
                readonly rawId: number | null;
                readonly name: string | null;
            } | null;
            readonly hiringManagerType: string | null;
            readonly slug: string | null;
            readonly referralBounty: {
                readonly currency: {
                    readonly code: string | null;
                };
                readonly value: number;
            } | null;
            readonly automaticallyNotifyCandidates: boolean | null;
            readonly jobSocialIntegrations: ReadonlyArray<string> | null;
            readonly activeJobIntegrationsNames: ReadonlyArray<string> | null;
            readonly candidatesToNotify: ReadonlyArray<{
                readonly rawId: number | null;
            }> | null;
        } | null;
    } | null;
};
export type JobSourcingStep_UpdateJobDetailsMutation = {
    readonly response: JobSourcingStep_UpdateJobDetailsMutationResponse;
    readonly variables: JobSourcingStep_UpdateJobDetailsMutationVariables;
};



/*
mutation JobSourcingStep_UpdateJobDetailsMutation(
  $input: UpdateJobSourcingInput!
) {
  updateJobSourcing(input: $input) {
    job {
      user {
        id
        rawId
        name
      }
      hiringManager {
        id
        rawId
        name
      }
      hiringManagerType
      slug
      referralBounty {
        currency {
          code
          id
        }
        value
      }
      automaticallyNotifyCandidates
      jobSocialIntegrations
      activeJobIntegrationsNames
      candidatesToNotify {
        rawId
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
  "name": "rawId",
  "storageKey": null
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "hiringManager",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hiringManagerType",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "automaticallyNotifyCandidates",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "jobSocialIntegrations",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "activeJobIntegrationsNames",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "JobSourcingStep_UpdateJobDetailsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateJobSourcingPayload",
        "kind": "LinkedField",
        "name": "updateJobSourcing",
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
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
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
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "CandidateToNotify",
                "kind": "LinkedField",
                "name": "candidatesToNotify",
                "plural": true,
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "JobSourcingStep_UpdateJobDetailsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateJobSourcingPayload",
        "kind": "LinkedField",
        "name": "updateJobSourcing",
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
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
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
                      (v9/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "CandidateToNotify",
                "kind": "LinkedField",
                "name": "candidatesToNotify",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
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
    "cacheID": "0ca8ae3a85c0bd957f0bb48b4b88e158",
    "id": null,
    "metadata": {},
    "name": "JobSourcingStep_UpdateJobDetailsMutation",
    "operationKind": "mutation",
    "text": "mutation JobSourcingStep_UpdateJobDetailsMutation(\n  $input: UpdateJobSourcingInput!\n) {\n  updateJobSourcing(input: $input) {\n    job {\n      user {\n        id\n        rawId\n        name\n      }\n      hiringManager {\n        id\n        rawId\n        name\n      }\n      hiringManagerType\n      slug\n      referralBounty {\n        currency {\n          code\n          id\n        }\n        value\n      }\n      automaticallyNotifyCandidates\n      jobSocialIntegrations\n      activeJobIntegrationsNames\n      candidatesToNotify {\n        rawId\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '770aef55031a7191d3252c154ab72b16';
export default node;

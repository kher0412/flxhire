/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type JobStatus = "closed" | "draft" | "opened";
export type Position = "freelancer" | "permanent";
export type UpdateJobDetailsInput = {
    autoRenew?: boolean | null;
    availabilityType?: string | null;
    city?: string | null;
    clientMutationId?: string | null;
    clientRate?: MoneyInput | null;
    clientRateCents?: number | null;
    country?: string | null;
    defaultDistance?: number | null;
    description?: string | null;
    descriptionExperience?: string | null;
    descriptionResponsibilities?: string | null;
    freelancerSubtypes?: Array<FreelancerSubtypeAttributes> | null;
    freelancerType?: FreelancerTypeAttributes | null;
    fullAddress?: string | null;
    jobCountries?: Array<string> | null;
    jobSkills?: Array<JobSkillAttributes> | null;
    jobTimezone?: string | null;
    locationLatitude?: number | null;
    locationLongitude?: number | null;
    locationType?: string | null;
    minClientRate?: MoneyInput | null;
    minClientRateCents?: number | null;
    numberOfHires?: number | null;
    positionTypes?: Array<string> | null;
    projectLengthInMonths?: number | null;
    rateMode?: string | null;
    referralBounty?: MoneyInput | null;
    referralBountyCents?: number | null;
    region?: string | null;
    requiredExperienceYears?: number | null;
    slug?: string | null;
    status?: JobStatus | null;
    timezoneRange?: number | null;
    timezoneValue?: number | null;
    title?: string | null;
    userId?: number | null;
};
export type MoneyInput = {
    currencyCode: string;
    value: number;
};
export type FreelancerSubtypeAttributes = {
    groupIndex?: number | null;
    rawId?: number | null;
};
export type FreelancerTypeAttributes = {
    rawId?: number | null;
};
export type JobSkillAttributes = {
    groupIndex?: number | null;
    name?: string | null;
    rawId?: number | null;
    rawSkillId?: number | null;
    required?: boolean | null;
    requiredYears?: number | null;
};
export type JobDetailsStep_SubmitMutationVariables = {
    input: UpdateJobDetailsInput;
};
export type JobDetailsStep_SubmitMutationResponse = {
    readonly updateJobDetails: {
        readonly job: {
            readonly slug: string | null;
            readonly title: string;
            readonly description: string | null;
            readonly descriptionExperience: string | null;
            readonly descriptionResponsibilities: string | null;
            readonly user: {
                readonly id: string;
                readonly name: string | null;
                readonly firm: {
                    readonly name: string | null;
                    readonly description: string | null;
                    readonly website: string | null;
                } | null;
            } | null;
            readonly positionTypes: ReadonlyArray<Position>;
            readonly clientRate: {
                readonly currency: {
                    readonly code: string | null;
                };
                readonly value: number;
            } | null;
            readonly minClientRate: {
                readonly currency: {
                    readonly code: string | null;
                };
                readonly value: number;
            } | null;
            readonly requiredExperienceYears: number | null;
            readonly rateMode: string | null;
            readonly projectLengthInMonths: number | null;
            readonly numberOfHires: number | null;
            readonly locationType: string | null;
            readonly jobCountries: ReadonlyArray<string>;
            readonly jobTimezone: string | null;
            readonly timezoneValue: number | null;
            readonly timezoneRange: number | null;
            readonly fullAddress: string | null;
            readonly country: string | null;
            readonly region: string | null;
            readonly city: string | null;
            readonly locationLatitude: number | null;
            readonly locationLongitude: number | null;
            readonly defaultDistance: number | null;
            readonly jobSkills: ReadonlyArray<{
                readonly rawId: number | null;
                readonly required: boolean | null;
                readonly requiredYears: number | null;
                readonly groupIndex: number | null;
                readonly skill: {
                    readonly name: string | null;
                    readonly rawId: number | null;
                } | null;
            }>;
            readonly jobSubtypes: ReadonlyArray<{
                readonly groupIndex: number | null;
                readonly freelancerSubtype: {
                    readonly rawId: number | null;
                    readonly name: string | null;
                } | null;
            }>;
            readonly freelancerType: {
                readonly rawId: number | null;
            } | null;
        } | null;
    } | null;
};
export type JobDetailsStep_SubmitMutation = {
    readonly response: JobDetailsStep_SubmitMutationResponse;
    readonly variables: JobDetailsStep_SubmitMutationVariables;
};



/*
mutation JobDetailsStep_SubmitMutation(
  $input: UpdateJobDetailsInput!
) {
  updateJobDetails(input: $input) {
    job {
      slug
      title
      description
      descriptionExperience
      descriptionResponsibilities
      user {
        id
        name
        firm {
          name
          description
          website
          id
        }
      }
      positionTypes
      clientRate {
        currency {
          code
          id
        }
        value
      }
      minClientRate {
        currency {
          code
          id
        }
        value
      }
      requiredExperienceYears
      rateMode
      projectLengthInMonths
      numberOfHires
      locationType
      jobCountries
      jobTimezone
      timezoneValue
      timezoneRange
      fullAddress
      country
      region
      city
      locationLatitude
      locationLongitude
      defaultDistance
      jobSkills {
        rawId
        required
        requiredYears
        groupIndex
        skill {
          name
          rawId
          id
        }
        id
      }
      jobSubtypes {
        groupIndex
        freelancerSubtype {
          rawId
          name
          id
        }
        id
      }
      freelancerType {
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
  "name": "slug",
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
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionExperience",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionResponsibilities",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "website",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "positionTypes",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v13 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Currency",
    "kind": "LinkedField",
    "name": "currency",
    "plural": false,
    "selections": [
      (v11/*: any*/)
    ],
    "storageKey": null
  },
  (v12/*: any*/)
],
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "requiredExperienceYears",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rateMode",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "projectLengthInMonths",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "numberOfHires",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locationType",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "jobCountries",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "jobTimezone",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timezoneValue",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timezoneRange",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullAddress",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "region",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locationLatitude",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locationLongitude",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "defaultDistance",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "required",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "requiredYears",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "groupIndex",
  "storageKey": null
},
v34 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Currency",
    "kind": "LinkedField",
    "name": "currency",
    "plural": false,
    "selections": [
      (v11/*: any*/),
      (v7/*: any*/)
    ],
    "storageKey": null
  },
  (v12/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "JobDetailsStep_SubmitMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateJobDetailsPayload",
        "kind": "LinkedField",
        "name": "updateJobDetails",
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
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Firm",
                    "kind": "LinkedField",
                    "name": "firm",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v4/*: any*/),
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "clientRate",
                "plural": false,
                "selections": (v13/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "minClientRate",
                "plural": false,
                "selections": (v13/*: any*/),
                "storageKey": null
              },
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              (v22/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              (v29/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "JobSkill",
                "kind": "LinkedField",
                "name": "jobSkills",
                "plural": true,
                "selections": [
                  (v30/*: any*/),
                  (v31/*: any*/),
                  (v32/*: any*/),
                  (v33/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Skill",
                    "kind": "LinkedField",
                    "name": "skill",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v30/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "JobSubtype",
                "kind": "LinkedField",
                "name": "jobSubtypes",
                "plural": true,
                "selections": [
                  (v33/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FreelancerSubtype",
                    "kind": "LinkedField",
                    "name": "freelancerSubtype",
                    "plural": false,
                    "selections": [
                      (v30/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "FreelancerType",
                "kind": "LinkedField",
                "name": "freelancerType",
                "plural": false,
                "selections": [
                  (v30/*: any*/)
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
    "name": "JobDetailsStep_SubmitMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateJobDetailsPayload",
        "kind": "LinkedField",
        "name": "updateJobDetails",
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
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Firm",
                    "kind": "LinkedField",
                    "name": "firm",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v4/*: any*/),
                      (v9/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "clientRate",
                "plural": false,
                "selections": (v34/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "minClientRate",
                "plural": false,
                "selections": (v34/*: any*/),
                "storageKey": null
              },
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              (v22/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              (v29/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "JobSkill",
                "kind": "LinkedField",
                "name": "jobSkills",
                "plural": true,
                "selections": [
                  (v30/*: any*/),
                  (v31/*: any*/),
                  (v32/*: any*/),
                  (v33/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Skill",
                    "kind": "LinkedField",
                    "name": "skill",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v30/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "JobSubtype",
                "kind": "LinkedField",
                "name": "jobSubtypes",
                "plural": true,
                "selections": [
                  (v33/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FreelancerSubtype",
                    "kind": "LinkedField",
                    "name": "freelancerSubtype",
                    "plural": false,
                    "selections": [
                      (v30/*: any*/),
                      (v8/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "FreelancerType",
                "kind": "LinkedField",
                "name": "freelancerType",
                "plural": false,
                "selections": [
                  (v30/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5b5c597036e36b6023c8b71de024b869",
    "id": null,
    "metadata": {},
    "name": "JobDetailsStep_SubmitMutation",
    "operationKind": "mutation",
    "text": "mutation JobDetailsStep_SubmitMutation(\n  $input: UpdateJobDetailsInput!\n) {\n  updateJobDetails(input: $input) {\n    job {\n      slug\n      title\n      description\n      descriptionExperience\n      descriptionResponsibilities\n      user {\n        id\n        name\n        firm {\n          name\n          description\n          website\n          id\n        }\n      }\n      positionTypes\n      clientRate {\n        currency {\n          code\n          id\n        }\n        value\n      }\n      minClientRate {\n        currency {\n          code\n          id\n        }\n        value\n      }\n      requiredExperienceYears\n      rateMode\n      projectLengthInMonths\n      numberOfHires\n      locationType\n      jobCountries\n      jobTimezone\n      timezoneValue\n      timezoneRange\n      fullAddress\n      country\n      region\n      city\n      locationLatitude\n      locationLongitude\n      defaultDistance\n      jobSkills {\n        rawId\n        required\n        requiredYears\n        groupIndex\n        skill {\n          name\n          rawId\n          id\n        }\n        id\n      }\n      jobSubtypes {\n        groupIndex\n        freelancerSubtype {\n          rawId\n          name\n          id\n        }\n        id\n      }\n      freelancerType {\n        rawId\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6e5ffa27774a3d1bdcc6b2edd9e0fae0';
export default node;

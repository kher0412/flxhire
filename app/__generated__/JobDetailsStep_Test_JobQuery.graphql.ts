/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobStatus = "closed" | "draft" | "opened";
export type JobDetailsStep_Test_JobQueryVariables = {
    jobSlug?: string | null;
    hasJob: boolean;
};
export type JobDetailsStep_Test_JobQueryResponse = {
    readonly job?: {
        readonly status: JobStatus | null;
        readonly " $fragmentRefs": FragmentRefs<"JobDetailsStep_Job">;
    } | null;
};
export type JobDetailsStep_Test_JobQuery = {
    readonly response: JobDetailsStep_Test_JobQueryResponse;
    readonly variables: JobDetailsStep_Test_JobQueryVariables;
};



/*
query JobDetailsStep_Test_JobQuery(
  $jobSlug: String
  $hasJob: Boolean!
) {
  job(slug: $jobSlug) @include(if: $hasJob) {
    status
    ...JobDetailsStep_Job
    id
  }
}

fragment JobDetailsStep_Job on Job {
  title
  description
  descriptionExperience
  descriptionResponsibilities
  user {
    rawId
    name
    firm {
      name
      description
      website
      id
    }
    id
  }
  status
  freelancerType {
    rawId
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
  jobSkills {
    rawId
    requiredYears
    required
    groupIndex
    skill {
      rawId
      name
      id
    }
    id
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
  "name": "status",
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
  "name": "rawId",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
  "name": "groupIndex",
  "storageKey": null
},
v9 = [
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/)
],
v10 = [
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
      (v7/*: any*/)
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "JobDetailsStep_Test_JobQuery",
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
              (v3/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "JobDetailsStep_Job"
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
    "name": "JobDetailsStep_Test_JobQuery",
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "descriptionExperience",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "descriptionResponsibilities",
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
                  (v5/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Firm",
                    "kind": "LinkedField",
                    "name": "firm",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "website",
                        "storageKey": null
                      },
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
                  (v5/*: any*/),
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
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FreelancerSubtype",
                    "kind": "LinkedField",
                    "name": "freelancerSubtype",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "JobSkill",
                "kind": "LinkedField",
                "name": "jobSkills",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "requiredYears",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "required",
                    "storageKey": null
                  },
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Skill",
                    "kind": "LinkedField",
                    "name": "skill",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "positionTypes",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "clientRate",
                "plural": false,
                "selections": (v10/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "minClientRate",
                "plural": false,
                "selections": (v10/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "requiredExperienceYears",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "rateMode",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "projectLengthInMonths",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "numberOfHires",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "locationType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "jobCountries",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "jobTimezone",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "timezoneValue",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "timezoneRange",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "fullAddress",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "country",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "region",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "city",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "locationLatitude",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "locationLongitude",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "defaultDistance",
                "storageKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "72a2bc5534daf61df33fa65acc2ea0d8",
    "id": null,
    "metadata": {},
    "name": "JobDetailsStep_Test_JobQuery",
    "operationKind": "query",
    "text": "query JobDetailsStep_Test_JobQuery(\n  $jobSlug: String\n  $hasJob: Boolean!\n) {\n  job(slug: $jobSlug) @include(if: $hasJob) {\n    status\n    ...JobDetailsStep_Job\n    id\n  }\n}\n\nfragment JobDetailsStep_Job on Job {\n  title\n  description\n  descriptionExperience\n  descriptionResponsibilities\n  user {\n    rawId\n    name\n    firm {\n      name\n      description\n      website\n      id\n    }\n    id\n  }\n  status\n  freelancerType {\n    rawId\n    id\n  }\n  jobSubtypes {\n    groupIndex\n    freelancerSubtype {\n      rawId\n      name\n      id\n    }\n    id\n  }\n  jobSkills {\n    rawId\n    requiredYears\n    required\n    groupIndex\n    skill {\n      rawId\n      name\n      id\n    }\n    id\n  }\n  positionTypes\n  clientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  minClientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  requiredExperienceYears\n  rateMode\n  projectLengthInMonths\n  numberOfHires\n  locationType\n  jobCountries\n  jobTimezone\n  timezoneValue\n  timezoneRange\n  fullAddress\n  country\n  region\n  city\n  locationLatitude\n  locationLongitude\n  defaultDistance\n}\n"
  }
};
})();
(node as any).hash = 'bb7ed627eff0f17fdc36aa5497be6a1a';
export default node;

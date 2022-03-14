/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobStatus = "closed" | "draft" | "opened";
export type JobEditorMain_JobQueryVariables = {
    jobSlug?: string | null;
    hasJob: boolean;
};
export type JobEditorMain_JobQueryResponse = {
    readonly job?: {
        readonly id: string;
        readonly slug: string | null;
        readonly status: JobStatus | null;
        readonly user: {
            readonly firm: {
                readonly slug: string | null;
                readonly name: string | null;
                readonly description: string | null;
            } | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"JobDetailsStep_Job" | "JobSourcingStep_Job" | "JobScreeningStep_Job" | "JobPreviewContainer_Job">;
    } | null;
};
export type JobEditorMain_JobQuery = {
    readonly response: JobEditorMain_JobQueryResponse;
    readonly variables: JobEditorMain_JobQueryVariables;
};



/*
query JobEditorMain_JobQuery(
  $jobSlug: String
  $hasJob: Boolean!
) {
  job(slug: $jobSlug) @include(if: $hasJob) {
    id
    slug
    status
    user {
      firm {
        slug
        name
        description
        id
      }
      id
    }
    ...JobDetailsStep_Job
    ...JobSourcingStep_Job
    ...JobScreeningStep_Job
    ...JobPreviewContainer_Job
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

fragment JobPreviewContainer_Job on Job {
  title
  description
  descriptionExperience
  descriptionResponsibilities
  user {
    rawId
    id
  }
  freelancerType {
    name
    rawId
    id
  }
  jobSubtypes {
    groupIndex
    freelancerSubtype {
      name
      rawId
      id
    }
    id
  }
  jobSkills {
    groupIndex
    required
    requiredYears
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

fragment JobScreeningForm_Job on Job {
  slug
  status
  freelancerType {
    rawId
    name
    slug
    jobsHaveCodeTests
    id
  }
  freelancerSubtypes {
    rawId
    name
    slug
    freelancerType {
      rawId
      id
    }
    id
  }
  jobSkills {
    skill {
      rawId
      name
      id
    }
    id
  }
}

fragment JobScreeningStep_Job on Job {
  rawId
  slug
  status
  screeningRequestMessageTemplate
  autoSendScreeningRequests
  allowTextualAnswers
  questions {
    rawId
    title
    status
    description
    answersCount
    jobsCount
    maxDuration
    id
  }
  project {
    rawId
    title
    description
    id
  }
  ...JobScreeningForm_Job
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
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
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
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v9 = [
  (v3/*: any*/),
  (v8/*: any*/),
  (v6/*: any*/)
],
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
  "name": "groupIndex",
  "storageKey": null
},
v12 = [
  (v8/*: any*/),
  (v6/*: any*/),
  (v3/*: any*/)
],
v13 = [
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
      (v3/*: any*/)
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
v14 = [
  (v8/*: any*/),
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "JobEditorMain_JobQuery",
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
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
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
                      (v4/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "JobDetailsStep_Job"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "JobSourcingStep_Job"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "JobScreeningStep_Job"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "JobPreviewContainer_Job"
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
    "name": "JobEditorMain_JobQuery",
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
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
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
                      (v4/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "website",
                        "storageKey": null
                      },
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
                          (v3/*: any*/)
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
                        "selections": (v9/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  (v8/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              (v7/*: any*/),
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
                "concreteType": "FreelancerType",
                "kind": "LinkedField",
                "name": "freelancerType",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v3/*: any*/),
                  (v6/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "jobsHaveCodeTests",
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
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FreelancerSubtype",
                    "kind": "LinkedField",
                    "name": "freelancerSubtype",
                    "plural": false,
                    "selections": (v12/*: any*/),
                    "storageKey": null
                  },
                  (v3/*: any*/)
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
                  (v8/*: any*/),
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
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Skill",
                    "kind": "LinkedField",
                    "name": "skill",
                    "plural": false,
                    "selections": (v12/*: any*/),
                    "storageKey": null
                  },
                  (v3/*: any*/)
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
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "hiringManager",
                "plural": false,
                "selections": (v14/*: any*/),
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
                "selections": (v13/*: any*/),
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
                  (v8/*: any*/),
                  (v5/*: any*/),
                  (v3/*: any*/)
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
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "recruiters",
                "plural": true,
                "selections": (v9/*: any*/),
                "storageKey": null
              },
              (v8/*: any*/),
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
                "kind": "ScalarField",
                "name": "autoSendScreeningRequests",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "allowTextualAnswers",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Question",
                "kind": "LinkedField",
                "name": "questions",
                "plural": true,
                "selections": [
                  (v8/*: any*/),
                  (v10/*: any*/),
                  (v5/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "answersCount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "jobsCount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "maxDuration",
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Project",
                "kind": "LinkedField",
                "name": "project",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v10/*: any*/),
                  (v7/*: any*/),
                  (v3/*: any*/)
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
                  (v8/*: any*/),
                  (v6/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FreelancerType",
                    "kind": "LinkedField",
                    "name": "freelancerType",
                    "plural": false,
                    "selections": (v14/*: any*/),
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "673b75c7230aa8a50224e26731d58bf0",
    "id": null,
    "metadata": {},
    "name": "JobEditorMain_JobQuery",
    "operationKind": "query",
    "text": "query JobEditorMain_JobQuery(\n  $jobSlug: String\n  $hasJob: Boolean!\n) {\n  job(slug: $jobSlug) @include(if: $hasJob) {\n    id\n    slug\n    status\n    user {\n      firm {\n        slug\n        name\n        description\n        id\n      }\n      id\n    }\n    ...JobDetailsStep_Job\n    ...JobSourcingStep_Job\n    ...JobScreeningStep_Job\n    ...JobPreviewContainer_Job\n  }\n}\n\nfragment JobDetailsStep_Job on Job {\n  title\n  description\n  descriptionExperience\n  descriptionResponsibilities\n  user {\n    rawId\n    name\n    firm {\n      name\n      description\n      website\n      id\n    }\n    id\n  }\n  status\n  freelancerType {\n    rawId\n    id\n  }\n  jobSubtypes {\n    groupIndex\n    freelancerSubtype {\n      rawId\n      name\n      id\n    }\n    id\n  }\n  jobSkills {\n    rawId\n    requiredYears\n    required\n    groupIndex\n    skill {\n      rawId\n      name\n      id\n    }\n    id\n  }\n  positionTypes\n  clientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  minClientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  requiredExperienceYears\n  rateMode\n  projectLengthInMonths\n  numberOfHires\n  locationType\n  jobCountries\n  jobTimezone\n  timezoneValue\n  timezoneRange\n  fullAddress\n  country\n  region\n  city\n  locationLatitude\n  locationLongitude\n  defaultDistance\n}\n\nfragment JobHiringManagerFields_Job on Job {\n  user {\n    firm {\n      billingPlan {\n        allowFlexhireRecruiters\n        dailyFlexhireRecruiterPerJobFeeUsd\n        id\n      }\n      users {\n        id\n        rawId\n        name\n      }\n      id\n    }\n    id\n  }\n  recruiters {\n    id\n    rawId\n    name\n  }\n}\n\nfragment JobPreviewContainer_Job on Job {\n  title\n  description\n  descriptionExperience\n  descriptionResponsibilities\n  user {\n    rawId\n    id\n  }\n  freelancerType {\n    name\n    rawId\n    id\n  }\n  jobSubtypes {\n    groupIndex\n    freelancerSubtype {\n      name\n      rawId\n      id\n    }\n    id\n  }\n  jobSkills {\n    groupIndex\n    required\n    requiredYears\n    skill {\n      rawId\n      name\n      id\n    }\n    id\n  }\n  positionTypes\n  clientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  minClientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  requiredExperienceYears\n  rateMode\n  projectLengthInMonths\n  numberOfHires\n  locationType\n  jobCountries\n  jobTimezone\n  timezoneValue\n  timezoneRange\n  fullAddress\n  country\n  region\n  city\n  locationLatitude\n  locationLongitude\n  defaultDistance\n}\n\nfragment JobScreeningForm_Job on Job {\n  slug\n  status\n  freelancerType {\n    rawId\n    name\n    slug\n    jobsHaveCodeTests\n    id\n  }\n  freelancerSubtypes {\n    rawId\n    name\n    slug\n    freelancerType {\n      rawId\n      id\n    }\n    id\n  }\n  jobSkills {\n    skill {\n      rawId\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment JobScreeningStep_Job on Job {\n  rawId\n  slug\n  status\n  screeningRequestMessageTemplate\n  autoSendScreeningRequests\n  allowTextualAnswers\n  questions {\n    rawId\n    title\n    status\n    description\n    answersCount\n    jobsCount\n    maxDuration\n    id\n  }\n  project {\n    rawId\n    title\n    description\n    id\n  }\n  ...JobScreeningForm_Job\n}\n\nfragment JobSourcingForm_Job on Job {\n  slug\n  status\n  ...JobHiringManagerFields_Job\n}\n\nfragment JobSourcingStep_Job on Job {\n  slug\n  user {\n    rawId\n    id\n  }\n  hiringManager {\n    rawId\n    id\n  }\n  hiringManagerType\n  referralBounty {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  activeJobIntegrationsNames\n  candidatesToNotify {\n    rawId\n    status\n    id\n  }\n  automaticallyNotifyCandidates\n  jobSocialIntegrations\n  ...JobSourcingForm_Job\n}\n"
  }
};
})();
(node as any).hash = 'a638793f235cede7bf88b14fa81680d2';
export default node;

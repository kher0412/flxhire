/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Hire_QueryVariables = {
    jobSlug?: string | null;
    firmSlug?: string | null;
    hasJob: boolean;
};
export type Hire_QueryResponse = {
    readonly allJobs: {
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly slug: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly firm: {
        readonly job?: {
            readonly id: string;
            readonly slug: string | null;
            readonly rawId: number | null;
            readonly " $fragmentRefs": FragmentRefs<"HireHooks_JobDefaultFilters" | "Sidebar_Job" | "Candidates_Job" | "Applications_Job">;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"Header_Firm" | "JobsPanel_Firm" | "Sidebar_Firm" | "JobSelector_Firm">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FirmSelector_Query">;
};
export type Hire_Query = {
    readonly response: Hire_QueryResponse;
    readonly variables: Hire_QueryVariables;
};



/*
query Hire_Query(
  $jobSlug: String
  $firmSlug: String
  $hasJob: Boolean!
) {
  allJobs: jobs(first: 1, firmSlug: $firmSlug) {
    totalCount
    edges {
      node {
        slug
        id
      }
    }
  }
  firm(slug: $firmSlug) {
    job(slug: $jobSlug) @include(if: $hasJob) {
      id
      slug
      rawId
      ...HireHooks_JobDefaultFilters
      ...Sidebar_Job
      ...Candidates_Job
      ...Applications_Job
    }
    ...Header_Firm
    ...JobsPanel_Firm
    ...Sidebar_Firm
    ...JobSelector_Firm
    id
  }
  ...FirmSelector_Query
}

fragment Applications_Job on Job {
  autoSendScreeningRequests
}

fragment Candidates_Job on Job {
  user {
    firm {
      slug
      id
    }
    id
  }
  slug
}

fragment FiltersPanel_Firm on Firm {
  ...SkillsFields_Firm
}

fragment FiltersPanel_Job on Job {
  ...SkillsFields_Job
  ...LocationFields_Job
}

fragment FirmSelector_Query on Query {
  firms(first: 5) {
    totalCount
    edges {
      node {
        id
        slug
        name
        jobs(filters: {status: opened}) {
          totalCount
        }
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment Header_Firm on Firm {
  name
}

fragment HireHooks_JobDefaultFilters on Job {
  id
  updatedAt
  jobTimezone
  positionTypes
  defaultDistance
  locationLatitude
  locationLongitude
  clientRate {
    currency {
      code
      id
    }
    value
  }
  timezoneValue
  timezoneRange
  jobCountries
  locationType
  requiredExperienceYears
  jobSkills {
    required
    requiredYears
    groupIndex
    skill {
      rawId
      name
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
}

fragment JobSelector_Firm on Firm {
  selectableJobs: jobs(first: 20) {
    edges {
      node {
        id
        slug
        title
        status
        user {
          firm {
            slug
            id
          }
          id
        }
        autoSendScreeningRequests
        rawId
        ...HireHooks_JobDefaultFilters
        ...Sidebar_Job
        ...Candidates_Job
        ...Applications_Job
      }
    }
  }
  name
}

fragment JobsPanel_Firm on Firm {
  users {
    id
    name
    self
  }
}

fragment LocationFields_Job on Job {
  locationLongitude
  locationLatitude
}

fragment Sidebar_Firm on Firm {
  ...FiltersPanel_Firm
}

fragment Sidebar_Job on Job {
  ...FiltersPanel_Job
}

fragment SkillsFields_Firm on Firm {
  skills {
    rawId
    name
    id
  }
  freelancerSubtypes {
    rawId
    name
    id
  }
}

fragment SkillsFields_Job on Job {
  jobSkills {
    requiredYears
    skill {
      rawId
      name
      id
    }
    id
  }
  jobSubtypes {
    freelancerSubtype {
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
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "firmSlug"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasJob"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "jobSlug"
},
v3 = [
  {
    "kind": "Variable",
    "name": "firmSlug",
    "variableName": "firmSlug"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v6 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "firmSlug"
  }
],
v7 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "jobSlug"
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v10 = [
  (v5/*: any*/),
  (v8/*: any*/)
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v12 = [
  (v9/*: any*/),
  (v11/*: any*/),
  (v8/*: any*/)
],
v13 = {
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
      "selections": (v10/*: any*/),
      "storageKey": null
    },
    (v8/*: any*/)
  ],
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "autoSendScreeningRequests",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "jobTimezone",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "positionTypes",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "defaultDistance",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locationLatitude",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locationLongitude",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "clientRate",
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
        (v8/*: any*/)
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
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timezoneValue",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timezoneRange",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "jobCountries",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locationType",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "requiredExperienceYears",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "groupIndex",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "concreteType": "JobSkill",
  "kind": "LinkedField",
  "name": "jobSkills",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "required",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "requiredYears",
      "storageKey": null
    },
    (v27/*: any*/),
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
    (v8/*: any*/)
  ],
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "concreteType": "JobSubtype",
  "kind": "LinkedField",
  "name": "jobSubtypes",
  "plural": true,
  "selections": [
    (v27/*: any*/),
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
    (v8/*: any*/)
  ],
  "storageKey": null
},
v30 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "Hire_Query",
    "selections": [
      {
        "alias": "allJobs",
        "args": (v3/*: any*/),
        "concreteType": "JobConnection",
        "kind": "LinkedField",
        "name": "jobs",
        "plural": false,
        "selections": [
          (v4/*: any*/),
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
                  (v5/*: any*/)
                ],
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
        "args": (v6/*: any*/),
        "concreteType": "Firm",
        "kind": "LinkedField",
        "name": "firm",
        "plural": false,
        "selections": [
          {
            "condition": "hasJob",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "alias": null,
                "args": (v7/*: any*/),
                "concreteType": "Job",
                "kind": "LinkedField",
                "name": "job",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v5/*: any*/),
                  (v9/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "HireHooks_JobDefaultFilters"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "Sidebar_Job"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "Candidates_Job"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "Applications_Job"
                  }
                ],
                "storageKey": null
              }
            ]
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Header_Firm"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JobsPanel_Firm"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Sidebar_Firm"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JobSelector_Firm"
          }
        ],
        "storageKey": null
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "FirmSelector_Query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "Hire_Query",
    "selections": [
      {
        "alias": "allJobs",
        "args": (v3/*: any*/),
        "concreteType": "JobConnection",
        "kind": "LinkedField",
        "name": "jobs",
        "plural": false,
        "selections": [
          (v4/*: any*/),
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
                "selections": (v10/*: any*/),
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
        "args": (v6/*: any*/),
        "concreteType": "Firm",
        "kind": "LinkedField",
        "name": "firm",
        "plural": false,
        "selections": [
          (v11/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "users",
            "plural": true,
            "selections": [
              (v8/*: any*/),
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "self",
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
            "selections": (v12/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "FreelancerSubtype",
            "kind": "LinkedField",
            "name": "freelancerSubtypes",
            "plural": true,
            "selections": (v12/*: any*/),
            "storageKey": null
          },
          {
            "alias": "selectableJobs",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
              }
            ],
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
                      (v8/*: any*/),
                      (v5/*: any*/),
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
                      },
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v9/*: any*/),
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
                      (v28/*: any*/),
                      (v29/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "jobs(first:20)"
          },
          (v8/*: any*/),
          {
            "condition": "hasJob",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "alias": null,
                "args": (v7/*: any*/),
                "concreteType": "Job",
                "kind": "LinkedField",
                "name": "job",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v5/*: any*/),
                  (v9/*: any*/),
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
                  (v28/*: any*/),
                  (v29/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/)
                ],
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v30/*: any*/),
        "concreteType": "FirmConnection",
        "kind": "LinkedField",
        "name": "firms",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "FirmEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Firm",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v5/*: any*/),
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "filters",
                        "value": {
                          "status": "opened"
                        }
                      }
                    ],
                    "concreteType": "JobConnection",
                    "kind": "LinkedField",
                    "name": "jobs",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/)
                    ],
                    "storageKey": "jobs(filters:{\"status\":\"opened\"})"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "firms(first:5)"
      },
      {
        "alias": null,
        "args": (v30/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "FirmSelector_firms",
        "kind": "LinkedHandle",
        "name": "firms"
      }
    ]
  },
  "params": {
    "cacheID": "f33996a442e0f6146cc9eb46c4152302",
    "id": null,
    "metadata": {},
    "name": "Hire_Query",
    "operationKind": "query",
    "text": "query Hire_Query(\n  $jobSlug: String\n  $firmSlug: String\n  $hasJob: Boolean!\n) {\n  allJobs: jobs(first: 1, firmSlug: $firmSlug) {\n    totalCount\n    edges {\n      node {\n        slug\n        id\n      }\n    }\n  }\n  firm(slug: $firmSlug) {\n    job(slug: $jobSlug) @include(if: $hasJob) {\n      id\n      slug\n      rawId\n      ...HireHooks_JobDefaultFilters\n      ...Sidebar_Job\n      ...Candidates_Job\n      ...Applications_Job\n    }\n    ...Header_Firm\n    ...JobsPanel_Firm\n    ...Sidebar_Firm\n    ...JobSelector_Firm\n    id\n  }\n  ...FirmSelector_Query\n}\n\nfragment Applications_Job on Job {\n  autoSendScreeningRequests\n}\n\nfragment Candidates_Job on Job {\n  user {\n    firm {\n      slug\n      id\n    }\n    id\n  }\n  slug\n}\n\nfragment FiltersPanel_Firm on Firm {\n  ...SkillsFields_Firm\n}\n\nfragment FiltersPanel_Job on Job {\n  ...SkillsFields_Job\n  ...LocationFields_Job\n}\n\nfragment FirmSelector_Query on Query {\n  firms(first: 5) {\n    totalCount\n    edges {\n      node {\n        id\n        slug\n        name\n        jobs(filters: {status: opened}) {\n          totalCount\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment Header_Firm on Firm {\n  name\n}\n\nfragment HireHooks_JobDefaultFilters on Job {\n  id\n  updatedAt\n  jobTimezone\n  positionTypes\n  defaultDistance\n  locationLatitude\n  locationLongitude\n  clientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  timezoneValue\n  timezoneRange\n  jobCountries\n  locationType\n  requiredExperienceYears\n  jobSkills {\n    required\n    requiredYears\n    groupIndex\n    skill {\n      rawId\n      name\n      id\n    }\n    id\n  }\n  jobSubtypes {\n    groupIndex\n    freelancerSubtype {\n      rawId\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment JobSelector_Firm on Firm {\n  selectableJobs: jobs(first: 20) {\n    edges {\n      node {\n        id\n        slug\n        title\n        status\n        user {\n          firm {\n            slug\n            id\n          }\n          id\n        }\n        autoSendScreeningRequests\n        rawId\n        ...HireHooks_JobDefaultFilters\n        ...Sidebar_Job\n        ...Candidates_Job\n        ...Applications_Job\n      }\n    }\n  }\n  name\n}\n\nfragment JobsPanel_Firm on Firm {\n  users {\n    id\n    name\n    self\n  }\n}\n\nfragment LocationFields_Job on Job {\n  locationLongitude\n  locationLatitude\n}\n\nfragment Sidebar_Firm on Firm {\n  ...FiltersPanel_Firm\n}\n\nfragment Sidebar_Job on Job {\n  ...FiltersPanel_Job\n}\n\nfragment SkillsFields_Firm on Firm {\n  skills {\n    rawId\n    name\n    id\n  }\n  freelancerSubtypes {\n    rawId\n    name\n    id\n  }\n}\n\nfragment SkillsFields_Job on Job {\n  jobSkills {\n    requiredYears\n    skill {\n      rawId\n      name\n      id\n    }\n    id\n  }\n  jobSubtypes {\n    freelancerSubtype {\n      rawId\n      name\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '13c9ca85e7c1cafa7f03e24449833e10';
export default node;

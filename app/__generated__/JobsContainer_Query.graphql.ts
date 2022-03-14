/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobsContainer_QueryVariables = {
    slug?: string | null;
};
export type JobsContainer_QueryResponse = {
    readonly firm: {
        readonly " $fragmentRefs": FragmentRefs<"Jobs_Firm">;
    } | null;
};
export type JobsContainer_Query = {
    readonly response: JobsContainer_QueryResponse;
    readonly variables: JobsContainer_QueryVariables;
};



/*
query JobsContainer_Query(
  $slug: String
) {
  firm(slug: $slug) {
    ...Jobs_Firm
    id
  }
}

fragment JobActions_Job on Job {
  slug
}

fragment Job_Job on Job {
  title
  user {
    firm {
      slug
      id
    }
    id
  }
  slug
  status
  expiresAt
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
  freelancerRate {
    currency {
      code
      id
    }
    value
  }
  minFreelancerRate {
    currency {
      code
      id
    }
    value
  }
  autoRenew
  freelancerType {
    name
    id
  }
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
  positionTypes
  projectLengthInMonths
  ...LocationTypeListItem_Job
  ...JobActions_Job
}

fragment Jobs_Firm on Firm {
  jobs(first: 5) {
    totalCount
    edges {
      node {
        id
        ...Job_Job
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  id
}

fragment LocationTypeListItem_Job on Job {
  locationType
  jobTimezone
  jobCountries
  fullAddress
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
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
v5 = [
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
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "JobsContainer_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Firm",
        "kind": "LinkedField",
        "name": "firm",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Jobs_Firm"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "JobsContainer_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Firm",
        "kind": "LinkedField",
        "name": "firm",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "JobConnection",
            "kind": "LinkedField",
            "name": "jobs",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              },
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
                      (v3/*: any*/),
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
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/),
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
                        "name": "expiresAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "clientRate",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "minClientRate",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "freelancerRate",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "minFreelancerRate",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "autoRenew",
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
                          (v6/*: any*/),
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "groupIndex",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Skill",
                            "kind": "LinkedField",
                            "name": "skill",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "rawId",
                                "storageKey": null
                              },
                              (v6/*: any*/),
                              (v3/*: any*/)
                            ],
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
                        "kind": "ScalarField",
                        "name": "projectLengthInMonths",
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
                        "name": "jobTimezone",
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
                        "name": "fullAddress",
                        "storageKey": null
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
            "storageKey": "jobs(first:5)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": [
              "filters"
            ],
            "handle": "connection",
            "key": "Jobs_jobs",
            "kind": "LinkedHandle",
            "name": "jobs"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f0edb139f9ab1a1005c74b013fec7b41",
    "id": null,
    "metadata": {},
    "name": "JobsContainer_Query",
    "operationKind": "query",
    "text": "query JobsContainer_Query(\n  $slug: String\n) {\n  firm(slug: $slug) {\n    ...Jobs_Firm\n    id\n  }\n}\n\nfragment JobActions_Job on Job {\n  slug\n}\n\nfragment Job_Job on Job {\n  title\n  user {\n    firm {\n      slug\n      id\n    }\n    id\n  }\n  slug\n  status\n  expiresAt\n  clientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  minClientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  freelancerRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  minFreelancerRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  autoRenew\n  freelancerType {\n    name\n    id\n  }\n  jobSkills {\n    required\n    requiredYears\n    groupIndex\n    skill {\n      rawId\n      name\n      id\n    }\n    id\n  }\n  positionTypes\n  projectLengthInMonths\n  ...LocationTypeListItem_Job\n  ...JobActions_Job\n}\n\nfragment Jobs_Firm on Firm {\n  jobs(first: 5) {\n    totalCount\n    edges {\n      node {\n        id\n        ...Job_Job\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment LocationTypeListItem_Job on Job {\n  locationType\n  jobTimezone\n  jobCountries\n  fullAddress\n}\n"
  }
};
})();
(node as any).hash = '203d76573dcfcb71816ac3773283c5dd';
export default node;

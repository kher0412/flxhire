/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobStatus = "closed" | "draft" | "opened";
export type JobsFilters = {
    status?: JobStatus | null;
    userId?: string | null;
};
export type HireJobsPaginationQueryVariables = {
    count?: number | null;
    cursor?: string | null;
    filters?: JobsFilters | null;
    id: string;
};
export type HireJobsPaginationQueryResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"Jobs_Firm">;
    } | null;
};
export type HireJobsPaginationQuery = {
    readonly response: HireJobsPaginationQueryResponse;
    readonly variables: HireJobsPaginationQueryVariables;
};



/*
query HireJobsPaginationQuery(
  $count: Int = 5
  $cursor: String
  $filters: JobsFilters
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...Jobs_Firm_4DMzEc
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

fragment Jobs_Firm_4DMzEc on Firm {
  jobs(first: $count, after: $cursor, filters: $filters) {
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
    "defaultValue": 5,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filters"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "Variable",
  "name": "filters",
  "variableName": "filters"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v2/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v7 = [
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
v8 = {
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
    "name": "HireJobsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              },
              (v2/*: any*/)
            ],
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
    "name": "HireJobsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v5/*: any*/),
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
                                  (v6/*: any*/),
                                  (v4/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v6/*: any*/),
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
                            "selections": (v7/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Money",
                            "kind": "LinkedField",
                            "name": "minClientRate",
                            "plural": false,
                            "selections": (v7/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Money",
                            "kind": "LinkedField",
                            "name": "freelancerRate",
                            "plural": false,
                            "selections": (v7/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Money",
                            "kind": "LinkedField",
                            "name": "minFreelancerRate",
                            "plural": false,
                            "selections": (v7/*: any*/),
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
                              (v8/*: any*/),
                              (v4/*: any*/)
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
                                  (v8/*: any*/),
                                  (v4/*: any*/)
                                ],
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
                          (v3/*: any*/)
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
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "filters": [
                  "filters"
                ],
                "handle": "connection",
                "key": "Jobs_jobs",
                "kind": "LinkedHandle",
                "name": "jobs"
              }
            ],
            "type": "Firm",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5e0a94f7efb2a82495fb6c2f3e8c3647",
    "id": null,
    "metadata": {},
    "name": "HireJobsPaginationQuery",
    "operationKind": "query",
    "text": "query HireJobsPaginationQuery(\n  $count: Int = 5\n  $cursor: String\n  $filters: JobsFilters\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...Jobs_Firm_4DMzEc\n    id\n  }\n}\n\nfragment JobActions_Job on Job {\n  slug\n}\n\nfragment Job_Job on Job {\n  title\n  user {\n    firm {\n      slug\n      id\n    }\n    id\n  }\n  slug\n  status\n  expiresAt\n  clientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  minClientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  freelancerRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  minFreelancerRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  autoRenew\n  freelancerType {\n    name\n    id\n  }\n  jobSkills {\n    required\n    requiredYears\n    groupIndex\n    skill {\n      rawId\n      name\n      id\n    }\n    id\n  }\n  positionTypes\n  projectLengthInMonths\n  ...LocationTypeListItem_Job\n  ...JobActions_Job\n}\n\nfragment Jobs_Firm_4DMzEc on Firm {\n  jobs(first: $count, after: $cursor, filters: $filters) {\n    totalCount\n    edges {\n      node {\n        id\n        ...Job_Job\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment LocationTypeListItem_Job on Job {\n  locationType\n  jobTimezone\n  jobCountries\n  fullAddress\n}\n"
  }
};
})();
(node as any).hash = '187b6d6bc4042eeee66588e95c60dd34';
export default node;

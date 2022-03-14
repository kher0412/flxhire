/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type WorkTab_QueryVariables = {};
export type WorkTab_QueryResponse = {
    readonly firm: {
        readonly " $fragmentRefs": FragmentRefs<"WorkFilters_Firm" | "TimesheetsList_Firm">;
    } | null;
};
export type WorkTab_Query = {
    readonly response: WorkTab_QueryResponse;
    readonly variables: WorkTab_QueryVariables;
};



/*
query WorkTab_Query {
  firm {
    ...WorkFilters_Firm
    ...TimesheetsList_Firm
    id
  }
}

fragment ManagerFilter_Firm on Firm {
  ...ManagerSelect_Firm
}

fragment ManagerSelect_Firm on Firm {
  users {
    id
    rawId
    name
  }
}

fragment TimesheetCard_Timesheet on Timesheet {
  rawId
  freelancer {
    name
    avatarUrl
    id
  }
  approvedAt
  status
  totalHours
  totalMinutes
  startDate
  endDate
  totalToPayClient {
    currency {
      code
      id
    }
    value
  }
  currency {
    code
    id
  }
  invoice {
    invoiceNum
    invoiceDate
    paymentStartedAt
    clientPaidAt
    payoutDueDate
    id
  }
  freelancerStatus
  autoApprove
  submittedAt
  payrollItem {
    assumedPayoutDueDate
    assumedInvoiceDate
    paycheck {
      paidOutAt
      id
    }
    id
  }
  ...TimesheetListActions_Timesheet
}

fragment TimesheetListActions_Timesheet on Timesheet {
  id
  status
  rawId
}

fragment TimesheetRow_Timesheet on Timesheet {
  rawId
  freelancer {
    name
    id
  }
  submittedAt
  approvedAt
  totalToPayClient {
    currency {
      code
      id
    }
    value
  }
  currency {
    code
    id
  }
  totalHours
  totalMinutes
  startDate
  endDate
  invoice {
    invoiceNum
    invoiceDate
    paymentStartedAt
    clientPaidAt
    payoutDueDate
    id
  }
  status
  freelancerStatus
  autoApprove
  payrollItem {
    assumedPayoutDueDate
    assumedInvoiceDate
    paycheck {
      paidOutAt
      id
    }
    id
  }
  ...TimesheetListActions_Timesheet
}

fragment TimesheetsList_Firm on Firm {
  timesheets(first: 10) {
    totalCount
    edges {
      node {
        id
        ...TimesheetCard_Timesheet
        ...TimesheetRow_Timesheet
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

fragment WorkFilters_Firm on Firm {
  users {
    id
    name
  }
  tags {
    rawId
    name
    id
  }
  jobs(first: 20) {
    edges {
      node {
        id
        rawId
        title
      }
    }
  }
  skills {
    rawId
    name
    id
  }
  ...ManagerFilter_Firm
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v3 = [
  (v2/*: any*/),
  (v1/*: any*/),
  (v0/*: any*/)
],
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v5 = {
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
    (v0/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkTab_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Firm",
        "kind": "LinkedField",
        "name": "firm",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WorkFilters_Firm"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TimesheetsList_Firm"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "WorkTab_Query",
    "selections": [
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
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "users",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Tag",
            "kind": "LinkedField",
            "name": "tags",
            "plural": true,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
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
                      (v0/*: any*/),
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "jobs(first:20)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Skill",
            "kind": "LinkedField",
            "name": "skills",
            "plural": true,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "TimesheetConnection",
            "kind": "LinkedField",
            "name": "timesheets",
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
                "concreteType": "TimesheetEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Timesheet",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "freelancer",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "avatarUrl",
                            "storageKey": null
                          },
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "approvedAt",
                        "storageKey": null
                      },
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
                        "name": "totalHours",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "totalMinutes",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "startDate",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endDate",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "totalToPayClient",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
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
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Invoice",
                        "kind": "LinkedField",
                        "name": "invoice",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "invoiceNum",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "invoiceDate",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "paymentStartedAt",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "clientPaidAt",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "payoutDueDate",
                            "storageKey": null
                          },
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "freelancerStatus",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "autoApprove",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "submittedAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PayrollItem",
                        "kind": "LinkedField",
                        "name": "payrollItem",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "assumedPayoutDueDate",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "assumedInvoiceDate",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Paycheck",
                            "kind": "LinkedField",
                            "name": "paycheck",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "paidOutAt",
                                "storageKey": null
                              },
                              (v0/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v0/*: any*/)
                        ],
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
              },
              {
                "kind": "ClientExtension",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__id",
                    "storageKey": null
                  }
                ]
              }
            ],
            "storageKey": "timesheets(first:10)"
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "filters": [
              "filters"
            ],
            "handle": "connection",
            "key": "TimesheetList_timesheets",
            "kind": "LinkedHandle",
            "name": "timesheets"
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9a3884e709c7758b01d58eeea3559165",
    "id": null,
    "metadata": {},
    "name": "WorkTab_Query",
    "operationKind": "query",
    "text": "query WorkTab_Query {\n  firm {\n    ...WorkFilters_Firm\n    ...TimesheetsList_Firm\n    id\n  }\n}\n\nfragment ManagerFilter_Firm on Firm {\n  ...ManagerSelect_Firm\n}\n\nfragment ManagerSelect_Firm on Firm {\n  users {\n    id\n    rawId\n    name\n  }\n}\n\nfragment TimesheetCard_Timesheet on Timesheet {\n  rawId\n  freelancer {\n    name\n    avatarUrl\n    id\n  }\n  approvedAt\n  status\n  totalHours\n  totalMinutes\n  startDate\n  endDate\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n  invoice {\n    invoiceNum\n    invoiceDate\n    paymentStartedAt\n    clientPaidAt\n    payoutDueDate\n    id\n  }\n  freelancerStatus\n  autoApprove\n  submittedAt\n  payrollItem {\n    assumedPayoutDueDate\n    assumedInvoiceDate\n    paycheck {\n      paidOutAt\n      id\n    }\n    id\n  }\n  ...TimesheetListActions_Timesheet\n}\n\nfragment TimesheetListActions_Timesheet on Timesheet {\n  id\n  status\n  rawId\n}\n\nfragment TimesheetRow_Timesheet on Timesheet {\n  rawId\n  freelancer {\n    name\n    id\n  }\n  submittedAt\n  approvedAt\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n  totalHours\n  totalMinutes\n  startDate\n  endDate\n  invoice {\n    invoiceNum\n    invoiceDate\n    paymentStartedAt\n    clientPaidAt\n    payoutDueDate\n    id\n  }\n  status\n  freelancerStatus\n  autoApprove\n  payrollItem {\n    assumedPayoutDueDate\n    assumedInvoiceDate\n    paycheck {\n      paidOutAt\n      id\n    }\n    id\n  }\n  ...TimesheetListActions_Timesheet\n}\n\nfragment TimesheetsList_Firm on Firm {\n  timesheets(first: 10) {\n    totalCount\n    edges {\n      node {\n        id\n        ...TimesheetCard_Timesheet\n        ...TimesheetRow_Timesheet\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment WorkFilters_Firm on Firm {\n  users {\n    id\n    name\n  }\n  tags {\n    rawId\n    name\n    id\n  }\n  jobs(first: 20) {\n    edges {\n      node {\n        id\n        rawId\n        title\n      }\n    }\n  }\n  skills {\n    rawId\n    name\n    id\n  }\n  ...ManagerFilter_Firm\n}\n"
  }
};
})();
(node as any).hash = 'e87bee349d58029c638e0dc63c75df83';
export default node;

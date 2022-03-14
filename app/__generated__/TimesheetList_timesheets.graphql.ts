/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SortOrder = "asc" | "desc";
export type TimesheetClientStatus = "approved" | "client_query" | "paid" | "payout_failed" | "pending" | "rejected" | "submitted" | "void";
export type TimesheetStatus = "approved" | "client_query" | "pending" | "rejected" | "submitted" | "void";
export type TimesheetsFilters = {
    clientId?: string | null;
    clientRawId?: number | null;
    clientStatus?: TimesheetClientStatus | null;
    fromDate?: string | null;
    invoiceNum?: number | null;
    name?: string | null;
    notInvoiced?: boolean | null;
    order?: SortOrder | null;
    sortBy?: string | null;
    status?: TimesheetStatus | null;
    tags?: Array<TagFilter> | null;
    toDate?: string | null;
};
export type TagFilter = {
    id: number;
};
export type TimesheetList_timesheetsVariables = {
    count?: number | null;
    cursor?: string | null;
    filters?: TimesheetsFilters | null;
    id: string;
};
export type TimesheetList_timesheetsResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"TimesheetsList_Firm">;
    } | null;
};
export type TimesheetList_timesheets = {
    readonly response: TimesheetList_timesheetsResponse;
    readonly variables: TimesheetList_timesheetsVariables;
};



/*
query TimesheetList_timesheets(
  $count: Int = 10
  $cursor: String
  $filters: TimesheetsFilters
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...TimesheetsList_Firm_4DMzEc
    id
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

fragment TimesheetsList_Firm_4DMzEc on Firm {
  timesheets(first: $count, after: $cursor, filters: $filters) {
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 10,
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TimesheetList_timesheets",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TimesheetList_timesheets",
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
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "rawId",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "freelancer",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "name",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "avatarUrl",
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
                              (v6/*: any*/),
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
                          (v6/*: any*/),
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
                              (v4/*: any*/)
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
                                  (v4/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v4/*: any*/)
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
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "filters": [
                  "filters"
                ],
                "handle": "connection",
                "key": "TimesheetList_timesheets",
                "kind": "LinkedHandle",
                "name": "timesheets"
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
    "cacheID": "93f6fde9228f38b3f9189910c3c98b90",
    "id": null,
    "metadata": {},
    "name": "TimesheetList_timesheets",
    "operationKind": "query",
    "text": "query TimesheetList_timesheets(\n  $count: Int = 10\n  $cursor: String\n  $filters: TimesheetsFilters\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...TimesheetsList_Firm_4DMzEc\n    id\n  }\n}\n\nfragment TimesheetCard_Timesheet on Timesheet {\n  rawId\n  freelancer {\n    name\n    avatarUrl\n    id\n  }\n  approvedAt\n  status\n  totalHours\n  totalMinutes\n  startDate\n  endDate\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n  invoice {\n    invoiceNum\n    invoiceDate\n    paymentStartedAt\n    clientPaidAt\n    payoutDueDate\n    id\n  }\n  freelancerStatus\n  autoApprove\n  submittedAt\n  payrollItem {\n    assumedPayoutDueDate\n    assumedInvoiceDate\n    paycheck {\n      paidOutAt\n      id\n    }\n    id\n  }\n  ...TimesheetListActions_Timesheet\n}\n\nfragment TimesheetListActions_Timesheet on Timesheet {\n  id\n  status\n  rawId\n}\n\nfragment TimesheetRow_Timesheet on Timesheet {\n  rawId\n  freelancer {\n    name\n    id\n  }\n  submittedAt\n  approvedAt\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n  totalHours\n  totalMinutes\n  startDate\n  endDate\n  invoice {\n    invoiceNum\n    invoiceDate\n    paymentStartedAt\n    clientPaidAt\n    payoutDueDate\n    id\n  }\n  status\n  freelancerStatus\n  autoApprove\n  payrollItem {\n    assumedPayoutDueDate\n    assumedInvoiceDate\n    paycheck {\n      paidOutAt\n      id\n    }\n    id\n  }\n  ...TimesheetListActions_Timesheet\n}\n\nfragment TimesheetsList_Firm_4DMzEc on Firm {\n  timesheets(first: $count, after: $cursor, filters: $filters) {\n    totalCount\n    edges {\n      node {\n        id\n        ...TimesheetCard_Timesheet\n        ...TimesheetRow_Timesheet\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
  }
};
})();
(node as any).hash = '8cc7456aa1058abd46cd840756c213d3';
export default node;

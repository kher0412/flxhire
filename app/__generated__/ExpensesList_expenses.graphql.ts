/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ExpensesFilters = {
    clientId?: string | null;
    invoiceNum?: number | null;
    name?: string | null;
    status?: string | null;
};
export type ExpensesList_expensesVariables = {
    count?: number | null;
    cursor?: string | null;
    filters?: ExpensesFilters | null;
    id: string;
};
export type ExpensesList_expensesResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"ExpensesList_Firm">;
    } | null;
};
export type ExpensesList_expenses = {
    readonly response: ExpensesList_expensesResponse;
    readonly variables: ExpensesList_expensesVariables;
};



/*
query ExpensesList_expenses(
  $count: Int = 5
  $cursor: String
  $filters: ExpensesFilters
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...ExpensesList_Firm_4DMzEc
    id
  }
}

fragment ExpenseCard_Expense on Expense {
  id
  rawId
  timesheet {
    status
    approvedAt
    submittedAt
    payrollItem {
      invoiceItem {
        id
        rawId
        invoice {
          invoiceNum
          id
        }
      }
      id
    }
    client {
      name
      id
    }
    freelancer {
      name
      id
    }
    id
  }
  amount {
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
}

fragment ExpenseRow_Expense on Expense {
  id
  itemNum
  timesheet {
    status
    approvedAt
    submittedAt
    payrollItem {
      invoiceItem {
        id
        rawId
        invoice {
          rawId
          invoiceNum
          token
          id
        }
      }
      id
    }
    client {
      name
      id
    }
    freelancer {
      name
      id
    }
    id
  }
  amount {
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
}

fragment ExpensesList_Firm_4DMzEc on Firm {
  expenses(first: $count, after: $cursor, filters: $filters) {
    totalCount
    edges {
      node {
        id
        ...ExpenseRow_Expense
        ...ExpenseCard_Expense
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
  "name": "rawId",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  (v4/*: any*/)
],
v8 = {
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
    "name": "ExpensesList_expenses",
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
            "name": "ExpensesList_Firm"
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
    "name": "ExpensesList_expenses",
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
                "concreteType": "ExpenseConnection",
                "kind": "LinkedField",
                "name": "expenses",
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
                    "concreteType": "ExpenseEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Expense",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "itemNum",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Timesheet",
                            "kind": "LinkedField",
                            "name": "timesheet",
                            "plural": false,
                            "selections": [
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
                                "name": "approvedAt",
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
                                    "concreteType": "InvoiceItem",
                                    "kind": "LinkedField",
                                    "name": "invoiceItem",
                                    "plural": false,
                                    "selections": [
                                      (v4/*: any*/),
                                      (v6/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Invoice",
                                        "kind": "LinkedField",
                                        "name": "invoice",
                                        "plural": false,
                                        "selections": [
                                          (v6/*: any*/),
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
                                            "name": "token",
                                            "storageKey": null
                                          },
                                          (v4/*: any*/)
                                        ],
                                        "storageKey": null
                                      }
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
                                "concreteType": "User",
                                "kind": "LinkedField",
                                "name": "client",
                                "plural": false,
                                "selections": (v7/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "User",
                                "kind": "LinkedField",
                                "name": "freelancer",
                                "plural": false,
                                "selections": (v7/*: any*/),
                                "storageKey": null
                              },
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Money",
                            "kind": "LinkedField",
                            "name": "amount",
                            "plural": false,
                            "selections": [
                              (v8/*: any*/),
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
                          (v8/*: any*/),
                          (v6/*: any*/),
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
                "key": "ExpensesList_expenses",
                "kind": "LinkedHandle",
                "name": "expenses"
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
    "cacheID": "a0ad2b2fc6841de37fe5b49c048ceaad",
    "id": null,
    "metadata": {},
    "name": "ExpensesList_expenses",
    "operationKind": "query",
    "text": "query ExpensesList_expenses(\n  $count: Int = 5\n  $cursor: String\n  $filters: ExpensesFilters\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...ExpensesList_Firm_4DMzEc\n    id\n  }\n}\n\nfragment ExpenseCard_Expense on Expense {\n  id\n  rawId\n  timesheet {\n    status\n    approvedAt\n    submittedAt\n    payrollItem {\n      invoiceItem {\n        id\n        rawId\n        invoice {\n          invoiceNum\n          id\n        }\n      }\n      id\n    }\n    client {\n      name\n      id\n    }\n    freelancer {\n      name\n      id\n    }\n    id\n  }\n  amount {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n}\n\nfragment ExpenseRow_Expense on Expense {\n  id\n  itemNum\n  timesheet {\n    status\n    approvedAt\n    submittedAt\n    payrollItem {\n      invoiceItem {\n        id\n        rawId\n        invoice {\n          rawId\n          invoiceNum\n          token\n          id\n        }\n      }\n      id\n    }\n    client {\n      name\n      id\n    }\n    freelancer {\n      name\n      id\n    }\n    id\n  }\n  amount {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n}\n\nfragment ExpensesList_Firm_4DMzEc on Firm {\n  expenses(first: $count, after: $cursor, filters: $filters) {\n    totalCount\n    edges {\n      node {\n        id\n        ...ExpenseRow_Expense\n        ...ExpenseCard_Expense\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
  }
};
})();
(node as any).hash = '5b2882c7c3b25d6a33de1ced8da766d6';
export default node;

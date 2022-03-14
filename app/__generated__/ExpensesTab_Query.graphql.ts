/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ExpensesTab_QueryVariables = {};
export type ExpensesTab_QueryResponse = {
    readonly firm: {
        readonly " $fragmentRefs": FragmentRefs<"ExpensesFilters_Firm" | "ExpensesList_Firm">;
    } | null;
};
export type ExpensesTab_Query = {
    readonly response: ExpensesTab_QueryResponse;
    readonly variables: ExpensesTab_QueryVariables;
};



/*
query ExpensesTab_Query {
  firm {
    ...ExpensesFilters_Firm
    ...ExpensesList_Firm
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

fragment ExpensesFilters_Firm on Firm {
  users {
    id
    name
  }
}

fragment ExpensesList_Firm on Firm {
  expenses(first: 5) {
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
  "name": "rawId",
  "storageKey": null
},
v4 = [
  (v1/*: any*/),
  (v0/*: any*/)
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
    "name": "ExpensesTab_Query",
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
            "name": "ExpensesFilters_Firm"
          },
          {
            "args": null,
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ExpensesTab_Query",
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
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
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
                      (v0/*: any*/),
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
                                  (v0/*: any*/),
                                  (v3/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Invoice",
                                    "kind": "LinkedField",
                                    "name": "invoice",
                                    "plural": false,
                                    "selections": [
                                      (v3/*: any*/),
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
                                      (v0/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
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
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "client",
                            "plural": false,
                            "selections": (v4/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "freelancer",
                            "plural": false,
                            "selections": (v4/*: any*/),
                            "storageKey": null
                          },
                          (v0/*: any*/)
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
                      (v3/*: any*/),
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
            "storageKey": "expenses(first:5)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": [
              "filters"
            ],
            "handle": "connection",
            "key": "ExpensesList_expenses",
            "kind": "LinkedHandle",
            "name": "expenses"
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "25d8fd10250223d0d05ce181e9c9a3df",
    "id": null,
    "metadata": {},
    "name": "ExpensesTab_Query",
    "operationKind": "query",
    "text": "query ExpensesTab_Query {\n  firm {\n    ...ExpensesFilters_Firm\n    ...ExpensesList_Firm\n    id\n  }\n}\n\nfragment ExpenseCard_Expense on Expense {\n  id\n  rawId\n  timesheet {\n    status\n    approvedAt\n    submittedAt\n    payrollItem {\n      invoiceItem {\n        id\n        rawId\n        invoice {\n          invoiceNum\n          id\n        }\n      }\n      id\n    }\n    client {\n      name\n      id\n    }\n    freelancer {\n      name\n      id\n    }\n    id\n  }\n  amount {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n}\n\nfragment ExpenseRow_Expense on Expense {\n  id\n  itemNum\n  timesheet {\n    status\n    approvedAt\n    submittedAt\n    payrollItem {\n      invoiceItem {\n        id\n        rawId\n        invoice {\n          rawId\n          invoiceNum\n          token\n          id\n        }\n      }\n      id\n    }\n    client {\n      name\n      id\n    }\n    freelancer {\n      name\n      id\n    }\n    id\n  }\n  amount {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n}\n\nfragment ExpensesFilters_Firm on Firm {\n  users {\n    id\n    name\n  }\n}\n\nfragment ExpensesList_Firm on Firm {\n  expenses(first: 5) {\n    totalCount\n    edges {\n      node {\n        id\n        ...ExpenseRow_Expense\n        ...ExpenseCard_Expense\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
  }
};
})();
(node as any).hash = '84b9bca9e69c8e2290978e3637d2578e';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PayrollItemStatus = "failed" | "paid" | "pending" | "processing" | "waiting";
export type PayrollItemType = "bonus" | "expense" | "salary" | "timesheet";
export type PayrollItemsFilters = {
    clientId?: string | null;
    invoiceNum?: number | null;
    name?: string | null;
    status?: PayrollItemStatus | null;
    type?: PayrollItemType | null;
};
export type PayrollItemList_payrollItemsVariables = {
    count?: number | null;
    cursor?: string | null;
    filters?: PayrollItemsFilters | null;
    id: string;
};
export type PayrollItemList_payrollItemsResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"PayrollItemList_Firm">;
    } | null;
};
export type PayrollItemList_payrollItems = {
    readonly response: PayrollItemList_payrollItemsResponse;
    readonly variables: PayrollItemList_payrollItemsVariables;
};



/*
query PayrollItemList_payrollItems(
  $count: Int = 10
  $cursor: String
  $filters: PayrollItemsFilters
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...PayrollItemList_Firm_4DMzEc
    id
  }
}

fragment PayrollItemCard_PayrollItem on PayrollItem {
  id
  itemNum
  status
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
  type
  startDate
  endDate
  approvedAt
  autoApproved
  invoiceItem {
    invoice {
      invoiceNum
      rawId
      token
      id
    }
    id
  }
  timesheet {
    rawId
    id
  }
  invoiceable
  contract {
    freelancer {
      name
      id
    }
    client {
      name
      id
    }
    id
  }
}

fragment PayrollItemList_Firm_4DMzEc on Firm {
  payrollItems(first: $count, after: $cursor, filters: $filters) {
    totalCount
    edges {
      node {
        id
        ...PayrollItemRow_PayrollItem
        ...PayrollItemCard_PayrollItem
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

fragment PayrollItemRow_PayrollItem on PayrollItem {
  id
  itemNum
  status
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
  type
  startDate
  endDate
  approvedAt
  autoApproved
  invoiceItem {
    invoice {
      rawId
      invoiceNum
      token
      id
    }
    id
  }
  invoiceable
  contract {
    freelancer {
      name
      id
    }
    client {
      name
      id
    }
    id
  }
  timesheet {
    rawId
    id
  }
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
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PayrollItemList_payrollItems",
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
            "name": "PayrollItemList_Firm"
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
    "name": "PayrollItemList_payrollItems",
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
                "concreteType": "PayrollItemConnection",
                "kind": "LinkedField",
                "name": "payrollItems",
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
                    "concreteType": "PayrollItemEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PayrollItem",
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
                            "kind": "ScalarField",
                            "name": "status",
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
                            "kind": "ScalarField",
                            "name": "type",
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
                            "kind": "ScalarField",
                            "name": "approvedAt",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "autoApproved",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "InvoiceItem",
                            "kind": "LinkedField",
                            "name": "invoiceItem",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Invoice",
                                "kind": "LinkedField",
                                "name": "invoice",
                                "plural": false,
                                "selections": [
                                  (v7/*: any*/),
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
                              },
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "invoiceable",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Contract",
                            "kind": "LinkedField",
                            "name": "contract",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "User",
                                "kind": "LinkedField",
                                "name": "freelancer",
                                "plural": false,
                                "selections": (v8/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "User",
                                "kind": "LinkedField",
                                "name": "client",
                                "plural": false,
                                "selections": (v8/*: any*/),
                                "storageKey": null
                              },
                              (v4/*: any*/)
                            ],
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
                              (v7/*: any*/),
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
                "key": "PayrollItemList_payrollItems",
                "kind": "LinkedHandle",
                "name": "payrollItems"
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
    "cacheID": "dbfbccc27c81c74d33aceb6bf89382a8",
    "id": null,
    "metadata": {},
    "name": "PayrollItemList_payrollItems",
    "operationKind": "query",
    "text": "query PayrollItemList_payrollItems(\n  $count: Int = 10\n  $cursor: String\n  $filters: PayrollItemsFilters\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...PayrollItemList_Firm_4DMzEc\n    id\n  }\n}\n\nfragment PayrollItemCard_PayrollItem on PayrollItem {\n  id\n  itemNum\n  status\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n  type\n  startDate\n  endDate\n  approvedAt\n  autoApproved\n  invoiceItem {\n    invoice {\n      invoiceNum\n      rawId\n      token\n      id\n    }\n    id\n  }\n  timesheet {\n    rawId\n    id\n  }\n  invoiceable\n  contract {\n    freelancer {\n      name\n      id\n    }\n    client {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment PayrollItemList_Firm_4DMzEc on Firm {\n  payrollItems(first: $count, after: $cursor, filters: $filters) {\n    totalCount\n    edges {\n      node {\n        id\n        ...PayrollItemRow_PayrollItem\n        ...PayrollItemCard_PayrollItem\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment PayrollItemRow_PayrollItem on PayrollItem {\n  id\n  itemNum\n  status\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n  type\n  startDate\n  endDate\n  approvedAt\n  autoApproved\n  invoiceItem {\n    invoice {\n      rawId\n      invoiceNum\n      token\n      id\n    }\n    id\n  }\n  invoiceable\n  contract {\n    freelancer {\n      name\n      id\n    }\n    client {\n      name\n      id\n    }\n    id\n  }\n  timesheet {\n    rawId\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '549318477c7f2ff4084c897370d2c381';
export default node;

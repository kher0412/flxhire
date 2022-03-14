/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PayrollTab_QueryVariables = {};
export type PayrollTab_QueryResponse = {
    readonly currentUser: {
        readonly id: string;
    } | null;
    readonly firm: {
        readonly " $fragmentRefs": FragmentRefs<"PayrollAutoInvoiceDialog_Firm" | "PayrollFilters_Firm" | "PayrollItemList_Firm">;
    } | null;
};
export type PayrollTab_Query = {
    readonly response: PayrollTab_QueryResponse;
    readonly variables: PayrollTab_QueryVariables;
};



/*
query PayrollTab_Query {
  currentUser {
    id
  }
  firm {
    ...PayrollAutoInvoiceDialog_Firm
    ...PayrollFilters_Firm
    ...PayrollItemList_Firm
    id
  }
}

fragment PayrollAutoInvoiceDialog_Firm on Firm {
  invoiceSchedule
  nextAutoInvoiceDate
  invoiceSalariesInAdvance
}

fragment PayrollFilters_Firm on Firm {
  users {
    id
    name
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

fragment PayrollItemList_Firm on Firm {
  payrollItems(first: 10) {
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
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "currentUser",
  "plural": false,
  "selections": [
    (v0/*: any*/)
  ],
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v4 = {
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
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v6 = [
  (v2/*: any*/),
  (v0/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PayrollTab_Query",
    "selections": [
      (v1/*: any*/),
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
            "name": "PayrollAutoInvoiceDialog_Firm"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PayrollFilters_Firm"
          },
          {
            "args": null,
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PayrollTab_Query",
    "selections": [
      (v1/*: any*/),
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
            "kind": "ScalarField",
            "name": "invoiceSchedule",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "nextAutoInvoiceDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "invoiceSalariesInAdvance",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "users",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
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
                          (v4/*: any*/),
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
                      (v4/*: any*/),
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
                              (v5/*: any*/),
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
                          },
                          (v0/*: any*/)
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
                            "selections": (v6/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "client",
                            "plural": false,
                            "selections": (v6/*: any*/),
                            "storageKey": null
                          },
                          (v0/*: any*/)
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
                          (v5/*: any*/),
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
            "storageKey": "payrollItems(first:10)"
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
            "filters": [
              "filters"
            ],
            "handle": "connection",
            "key": "PayrollItemList_payrollItems",
            "kind": "LinkedHandle",
            "name": "payrollItems"
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "727c98c015d8a758ba4132a49a40989c",
    "id": null,
    "metadata": {},
    "name": "PayrollTab_Query",
    "operationKind": "query",
    "text": "query PayrollTab_Query {\n  currentUser {\n    id\n  }\n  firm {\n    ...PayrollAutoInvoiceDialog_Firm\n    ...PayrollFilters_Firm\n    ...PayrollItemList_Firm\n    id\n  }\n}\n\nfragment PayrollAutoInvoiceDialog_Firm on Firm {\n  invoiceSchedule\n  nextAutoInvoiceDate\n  invoiceSalariesInAdvance\n}\n\nfragment PayrollFilters_Firm on Firm {\n  users {\n    id\n    name\n  }\n}\n\nfragment PayrollItemCard_PayrollItem on PayrollItem {\n  id\n  itemNum\n  status\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n  type\n  startDate\n  endDate\n  approvedAt\n  autoApproved\n  invoiceItem {\n    invoice {\n      invoiceNum\n      rawId\n      token\n      id\n    }\n    id\n  }\n  timesheet {\n    rawId\n    id\n  }\n  invoiceable\n  contract {\n    freelancer {\n      name\n      id\n    }\n    client {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment PayrollItemList_Firm on Firm {\n  payrollItems(first: 10) {\n    totalCount\n    edges {\n      node {\n        id\n        ...PayrollItemRow_PayrollItem\n        ...PayrollItemCard_PayrollItem\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment PayrollItemRow_PayrollItem on PayrollItem {\n  id\n  itemNum\n  status\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n  type\n  startDate\n  endDate\n  approvedAt\n  autoApproved\n  invoiceItem {\n    invoice {\n      rawId\n      invoiceNum\n      token\n      id\n    }\n    id\n  }\n  invoiceable\n  contract {\n    freelancer {\n      name\n      id\n    }\n    client {\n      name\n      id\n    }\n    id\n  }\n  timesheet {\n    rawId\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b491478f1ef81010632646eb8fee53d0';
export default node;

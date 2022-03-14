/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type InvoiceDetails_Test_QueryVariables = {
    token: string;
};
export type InvoiceDetails_Test_QueryResponse = {
    readonly invoice: {
        readonly " $fragmentRefs": FragmentRefs<"InvoiceDetails_Invoice">;
    } | null;
};
export type InvoiceDetails_Test_Query = {
    readonly response: InvoiceDetails_Test_QueryResponse;
    readonly variables: InvoiceDetails_Test_QueryVariables;
};



/*
query InvoiceDetails_Test_Query(
  $token: String!
) {
  invoice(token: $token) {
    ...InvoiceDetails_Invoice
    id
  }
}

fragment InvoiceDetails_Invoice on Invoice {
  currency {
    code
    id
  }
  client {
    name
    id
  }
  capitalExpenditureSubtotal {
    currency {
      code
      id
    }
    value
  }
  operatingExpenditureSubtotal {
    currency {
      code
      id
    }
    value
  }
  totalToPayClient {
    currency {
      code
      id
    }
    value
  }
  invoiceItems {
    id
    description
    amountExchanged
    currency {
      code
      id
    }
    totalAmount {
      currency {
        code
        id
      }
      value
    }
    itemTypeHumanized
    projectCodesHumanized
    associatedPeriodHumanized
    startDate
    endDate
    subjectName
    contract {
      client {
        name
        id
      }
      purchaseOrderNumber
      id
    }
    payrollItem {
      type
      itemNum
      timesheet {
        projectCodes
        totalCapitalExpenditure {
          currency {
            code
            id
          }
          value
        }
        totalOperatingExpenditure {
          currency {
            code
            id
          }
          value
        }
        id
      }
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "token",
    "variableName": "token"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
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
    (v2/*: any*/)
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "client",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v2/*: any*/)
  ],
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InvoiceDetails_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Invoice",
        "kind": "LinkedField",
        "name": "invoice",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "InvoiceDetails_Invoice"
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
    "name": "InvoiceDetails_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Invoice",
        "kind": "LinkedField",
        "name": "invoice",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "capitalExpenditureSubtotal",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "operatingExpenditureSubtotal",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "totalToPayClient",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "InvoiceItem",
            "kind": "LinkedField",
            "name": "invoiceItems",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "amountExchanged",
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "totalAmount",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "itemTypeHumanized",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "projectCodesHumanized",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "associatedPeriodHumanized",
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
                "name": "subjectName",
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
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "purchaseOrderNumber",
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
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
                    "name": "type",
                    "storageKey": null
                  },
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
                        "name": "projectCodes",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "totalCapitalExpenditure",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "totalOperatingExpenditure",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2886e303ebbcb4018722e3ba260056e5",
    "id": null,
    "metadata": {},
    "name": "InvoiceDetails_Test_Query",
    "operationKind": "query",
    "text": "query InvoiceDetails_Test_Query(\n  $token: String!\n) {\n  invoice(token: $token) {\n    ...InvoiceDetails_Invoice\n    id\n  }\n}\n\nfragment InvoiceDetails_Invoice on Invoice {\n  currency {\n    code\n    id\n  }\n  client {\n    name\n    id\n  }\n  capitalExpenditureSubtotal {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  operatingExpenditureSubtotal {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  invoiceItems {\n    id\n    description\n    amountExchanged\n    currency {\n      code\n      id\n    }\n    totalAmount {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    itemTypeHumanized\n    projectCodesHumanized\n    associatedPeriodHumanized\n    startDate\n    endDate\n    subjectName\n    contract {\n      client {\n        name\n        id\n      }\n      purchaseOrderNumber\n      id\n    }\n    payrollItem {\n      type\n      itemNum\n      timesheet {\n        projectCodes\n        totalCapitalExpenditure {\n          currency {\n            code\n            id\n          }\n          value\n        }\n        totalOperatingExpenditure {\n          currency {\n            code\n            id\n          }\n          value\n        }\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3bcf0bd60b4cfe0d5456b083c41f3fde';
export default node;

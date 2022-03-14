/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Invoice_Test_QueryVariables = {
    token: string;
};
export type Invoice_Test_QueryResponse = {
    readonly invoice: {
        readonly " $fragmentRefs": FragmentRefs<"Invoice_Invoice">;
    } | null;
};
export type Invoice_Test_Query = {
    readonly response: Invoice_Test_QueryResponse;
    readonly variables: Invoice_Test_QueryVariables;
};



/*
query Invoice_Test_Query(
  $token: String!
) {
  invoice(token: $token) {
    ...Invoice_Invoice
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

fragment Invoice_Invoice on Invoice {
  client {
    additionalInvoiceText
    firm {
      currency {
        code
        id
      }
      name
      additionalInvoiceText
      id
    }
    id
  }
  expenses {
    id
  }
  currency {
    code
    id
  }
  totalToPayClient {
    currency {
      code
      id
    }
    value
  }
  invoiceItemsExchangeRates {
    fromCurrency {
      code
      id
    }
    toCurrency {
      code
      id
    }
    value
  }
  invoiceDate
  invoiceNum
  bankTransferDetails {
    swiftCode
    achAccountNumber
    achRoutingNumber
    institutionName
  }
  ...Summary_Invoice
  ...InvoiceDetails_Invoice
}

fragment Summary_Invoice on Invoice {
  invoiceDate
  dueDate
  startDate
  endDate
  currency {
    code
    id
  }
  totalToPayClient {
    currency {
      code
      id
    }
    value
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
  "name": "additionalInvoiceText",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "code",
    "storageKey": null
  },
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v8 = [
  (v5/*: any*/),
  (v7/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startDate",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endDate",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Invoice_Test_Query",
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
            "name": "Invoice_Invoice"
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
    "name": "Invoice_Test_Query",
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
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "client",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Firm",
                "kind": "LinkedField",
                "name": "firm",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Expense",
            "kind": "LinkedField",
            "name": "expenses",
            "plural": true,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "totalToPayClient",
            "plural": false,
            "selections": (v8/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "InvoiceExchangeRate",
            "kind": "LinkedField",
            "name": "invoiceItemsExchangeRates",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Currency",
                "kind": "LinkedField",
                "name": "fromCurrency",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Currency",
                "kind": "LinkedField",
                "name": "toCurrency",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": null
              },
              (v7/*: any*/)
            ],
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
            "name": "invoiceNum",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "BankTransferDetails",
            "kind": "LinkedField",
            "name": "bankTransferDetails",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "swiftCode",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "achAccountNumber",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "achRoutingNumber",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "institutionName",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "dueDate",
            "storageKey": null
          },
          (v9/*: any*/),
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "capitalExpenditureSubtotal",
            "plural": false,
            "selections": (v8/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "operatingExpenditureSubtotal",
            "plural": false,
            "selections": (v8/*: any*/),
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
              (v3/*: any*/),
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
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "totalAmount",
                "plural": false,
                "selections": (v8/*: any*/),
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
              (v9/*: any*/),
              (v10/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "client",
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
                    "kind": "ScalarField",
                    "name": "purchaseOrderNumber",
                    "storageKey": null
                  },
                  (v3/*: any*/)
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
                        "selections": (v8/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "totalOperatingExpenditure",
                        "plural": false,
                        "selections": (v8/*: any*/),
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "69bbd22593d6c245b5e38a2bd804acab",
    "id": null,
    "metadata": {},
    "name": "Invoice_Test_Query",
    "operationKind": "query",
    "text": "query Invoice_Test_Query(\n  $token: String!\n) {\n  invoice(token: $token) {\n    ...Invoice_Invoice\n    id\n  }\n}\n\nfragment InvoiceDetails_Invoice on Invoice {\n  currency {\n    code\n    id\n  }\n  client {\n    name\n    id\n  }\n  capitalExpenditureSubtotal {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  operatingExpenditureSubtotal {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  invoiceItems {\n    id\n    description\n    amountExchanged\n    currency {\n      code\n      id\n    }\n    totalAmount {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    itemTypeHumanized\n    projectCodesHumanized\n    associatedPeriodHumanized\n    startDate\n    endDate\n    subjectName\n    contract {\n      client {\n        name\n        id\n      }\n      purchaseOrderNumber\n      id\n    }\n    payrollItem {\n      type\n      itemNum\n      timesheet {\n        projectCodes\n        totalCapitalExpenditure {\n          currency {\n            code\n            id\n          }\n          value\n        }\n        totalOperatingExpenditure {\n          currency {\n            code\n            id\n          }\n          value\n        }\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment Invoice_Invoice on Invoice {\n  client {\n    additionalInvoiceText\n    firm {\n      currency {\n        code\n        id\n      }\n      name\n      additionalInvoiceText\n      id\n    }\n    id\n  }\n  expenses {\n    id\n  }\n  currency {\n    code\n    id\n  }\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  invoiceItemsExchangeRates {\n    fromCurrency {\n      code\n      id\n    }\n    toCurrency {\n      code\n      id\n    }\n    value\n  }\n  invoiceDate\n  invoiceNum\n  bankTransferDetails {\n    swiftCode\n    achAccountNumber\n    achRoutingNumber\n    institutionName\n  }\n  ...Summary_Invoice\n  ...InvoiceDetails_Invoice\n}\n\nfragment Summary_Invoice on Invoice {\n  invoiceDate\n  dueDate\n  startDate\n  endDate\n  currency {\n    code\n    id\n  }\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n}\n"
  }
};
})();
(node as any).hash = '071e2e89675f4a027b8055889cb5e56b';
export default node;

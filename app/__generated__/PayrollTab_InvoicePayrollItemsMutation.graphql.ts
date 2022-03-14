/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type PayrollItemStatus = "failed" | "paid" | "pending" | "processing" | "waiting";
export type InvoicePayrollItemsInput = {
    clientMutationId?: string | null;
    forceAutoPay?: boolean | null;
    managerId?: string | null;
    payrollItemIds: Array<string>;
};
export type PayrollTab_InvoicePayrollItemsMutationVariables = {
    input: InvoicePayrollItemsInput;
};
export type PayrollTab_InvoicePayrollItemsMutationResponse = {
    readonly invoicePayrollItems: {
        readonly invoices: ReadonlyArray<{
            readonly rawId: number;
            readonly token: string | null;
        }> | null;
        readonly payrollItems: ReadonlyArray<{
            readonly status: PayrollItemStatus | null;
            readonly invoiceItem: {
                readonly invoice: {
                    readonly invoiceNum: number | null;
                    readonly token: string | null;
                } | null;
            } | null;
        }> | null;
    } | null;
};
export type PayrollTab_InvoicePayrollItemsMutation = {
    readonly response: PayrollTab_InvoicePayrollItemsMutationResponse;
    readonly variables: PayrollTab_InvoicePayrollItemsMutationVariables;
};



/*
mutation PayrollTab_InvoicePayrollItemsMutation(
  $input: InvoicePayrollItemsInput!
) {
  invoicePayrollItems(input: $input) {
    invoices {
      rawId
      token
      id
    }
    payrollItems {
      status
      invoiceItem {
        invoice {
          invoiceNum
          token
          id
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
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "token",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "invoiceNum",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PayrollTab_InvoicePayrollItemsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "InvoicePayrollItemsPayload",
        "kind": "LinkedField",
        "name": "invoicePayrollItems",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Invoice",
            "kind": "LinkedField",
            "name": "invoices",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PayrollItem",
            "kind": "LinkedField",
            "name": "payrollItems",
            "plural": true,
            "selections": [
              (v4/*: any*/),
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PayrollTab_InvoicePayrollItemsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "InvoicePayrollItemsPayload",
        "kind": "LinkedField",
        "name": "invoicePayrollItems",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Invoice",
            "kind": "LinkedField",
            "name": "invoices",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PayrollItem",
            "kind": "LinkedField",
            "name": "payrollItems",
            "plural": true,
            "selections": [
              (v4/*: any*/),
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
                      (v3/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "04744c8ffaf4c758a751c24d6be26898",
    "id": null,
    "metadata": {},
    "name": "PayrollTab_InvoicePayrollItemsMutation",
    "operationKind": "mutation",
    "text": "mutation PayrollTab_InvoicePayrollItemsMutation(\n  $input: InvoicePayrollItemsInput!\n) {\n  invoicePayrollItems(input: $input) {\n    invoices {\n      rawId\n      token\n      id\n    }\n    payrollItems {\n      status\n      invoiceItem {\n        invoice {\n          invoiceNum\n          token\n          id\n        }\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '40dad02a2c1959a688e0892d3dda7b26';
export default node;

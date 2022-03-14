/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PayrollItemType = "bonus" | "expense" | "salary" | "timesheet";
export type InvoiceDetails_Invoice = {
    readonly currency: {
        readonly code: string | null;
    } | null;
    readonly client: {
        readonly name: string | null;
    } | null;
    readonly capitalExpenditureSubtotal: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly operatingExpenditureSubtotal: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly totalToPayClient: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly invoiceItems: ReadonlyArray<{
        readonly id: string;
        readonly description: string | null;
        readonly amountExchanged: boolean | null;
        readonly currency: {
            readonly code: string | null;
        } | null;
        readonly totalAmount: {
            readonly currency: {
                readonly code: string | null;
            };
            readonly value: number;
        } | null;
        readonly itemTypeHumanized: string | null;
        readonly projectCodesHumanized: string | null;
        readonly associatedPeriodHumanized: string | null;
        readonly startDate: string | null;
        readonly endDate: string | null;
        readonly subjectName: string | null;
        readonly contract: {
            readonly client: {
                readonly name: string | null;
            } | null;
            readonly purchaseOrderNumber: string | null;
        } | null;
        readonly payrollItem: {
            readonly type: PayrollItemType | null;
            readonly itemNum: number | null;
            readonly timesheet: {
                readonly projectCodes: ReadonlyArray<string> | null;
                readonly totalCapitalExpenditure: {
                    readonly currency: {
                        readonly code: string | null;
                    };
                    readonly value: number;
                } | null;
                readonly totalOperatingExpenditure: {
                    readonly currency: {
                        readonly code: string | null;
                    };
                    readonly value: number;
                } | null;
            } | null;
        } | null;
    }> | null;
    readonly " $refType": "InvoiceDetails_Invoice";
};
export type InvoiceDetails_Invoice$data = InvoiceDetails_Invoice;
export type InvoiceDetails_Invoice$key = {
    readonly " $data"?: InvoiceDetails_Invoice$data;
    readonly " $fragmentRefs": FragmentRefs<"InvoiceDetails_Invoice">;
};



const node: ReaderFragment = (function(){
var v0 = {
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
    }
  ],
  "storageKey": null
},
v1 = {
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
    }
  ],
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InvoiceDetails_Invoice",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "capitalExpenditureSubtotal",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "operatingExpenditureSubtotal",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "totalToPayClient",
      "plural": false,
      "selections": (v2/*: any*/),
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "totalAmount",
          "plural": false,
          "selections": (v2/*: any*/),
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
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "purchaseOrderNumber",
              "storageKey": null
            }
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
                  "selections": (v2/*: any*/),
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Money",
                  "kind": "LinkedField",
                  "name": "totalOperatingExpenditure",
                  "plural": false,
                  "selections": (v2/*: any*/),
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
  "type": "Invoice",
  "abstractKey": null
};
})();
(node as any).hash = 'e883a8348d61c91599db2ee58bc2fe9a';
export default node;

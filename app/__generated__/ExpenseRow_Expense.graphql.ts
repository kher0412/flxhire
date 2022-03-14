/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type TimesheetStatus = "approved" | "client_query" | "pending" | "rejected" | "submitted" | "void";
export type ExpenseRow_Expense = {
    readonly id: string;
    readonly itemNum: number | null;
    readonly timesheet: {
        readonly status: TimesheetStatus | null;
        readonly approvedAt: string | null;
        readonly submittedAt: string | null;
        readonly payrollItem: {
            readonly invoiceItem: {
                readonly id: string;
                readonly rawId: number | null;
                readonly invoice: {
                    readonly rawId: number;
                    readonly invoiceNum: number | null;
                    readonly token: string | null;
                } | null;
            } | null;
        } | null;
        readonly client: {
            readonly name: string | null;
        } | null;
        readonly freelancer: {
            readonly name: string | null;
        } | null;
    } | null;
    readonly amount: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly currency: {
        readonly code: string | null;
    } | null;
    readonly " $refType": "ExpenseRow_Expense";
};
export type ExpenseRow_Expense$data = ExpenseRow_Expense;
export type ExpenseRow_Expense$key = {
    readonly " $data"?: ExpenseRow_Expense$data;
    readonly " $fragmentRefs": FragmentRefs<"ExpenseRow_Expense">;
};



const node: ReaderFragment = (function(){
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
  "name": "rawId",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
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
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExpenseRow_Expense",
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
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Invoice",
                  "kind": "LinkedField",
                  "name": "invoice",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
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
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
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
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "freelancer",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        }
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
        (v3/*: any*/),
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
    (v3/*: any*/)
  ],
  "type": "Expense",
  "abstractKey": null
};
})();
(node as any).hash = 'e62c5d04bca8648591c64f26b8240b3d';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type TimesheetStatus = "approved" | "client_query" | "pending" | "rejected" | "submitted" | "void";
export type ExpenseCard_Expense = {
    readonly id: string;
    readonly rawId: number;
    readonly timesheet: {
        readonly status: TimesheetStatus | null;
        readonly approvedAt: string | null;
        readonly submittedAt: string | null;
        readonly payrollItem: {
            readonly invoiceItem: {
                readonly id: string;
                readonly rawId: number | null;
                readonly invoice: {
                    readonly invoiceNum: number | null;
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
    readonly " $refType": "ExpenseCard_Expense";
};
export type ExpenseCard_Expense$data = ExpenseCard_Expense;
export type ExpenseCard_Expense$key = {
    readonly " $data"?: ExpenseCard_Expense$data;
    readonly " $fragmentRefs": FragmentRefs<"ExpenseCard_Expense">;
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
  "name": "ExpenseCard_Expense",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
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
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "invoiceNum",
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
(node as any).hash = 'bb18227fccc3fb60134cd9431f93460e';
export default node;

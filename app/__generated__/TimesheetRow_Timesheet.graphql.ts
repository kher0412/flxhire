/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type TimesheetFreelancerStatus = "approved" | "client_paid" | "client_payment_processing" | "client_query" | "invoiced" | "paid" | "payout_failed" | "pending" | "rejected" | "submitted" | "void";
export type TimesheetStatus = "approved" | "client_query" | "pending" | "rejected" | "submitted" | "void";
export type TimesheetRow_Timesheet = {
    readonly rawId: number;
    readonly freelancer: {
        readonly name: string | null;
    } | null;
    readonly submittedAt: string | null;
    readonly approvedAt: string | null;
    readonly totalToPayClient: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly currency: {
        readonly code: string | null;
    } | null;
    readonly totalHours: number | null;
    readonly totalMinutes: number | null;
    readonly startDate: string | null;
    readonly endDate: string | null;
    readonly invoice: {
        readonly invoiceNum: number | null;
        readonly invoiceDate: string | null;
        readonly paymentStartedAt: string | null;
        readonly clientPaidAt: string | null;
        readonly payoutDueDate: string | null;
    } | null;
    readonly status: TimesheetStatus | null;
    readonly freelancerStatus: TimesheetFreelancerStatus | null;
    readonly autoApprove: boolean | null;
    readonly payrollItem: {
        readonly assumedPayoutDueDate: string | null;
        readonly assumedInvoiceDate: string | null;
        readonly paycheck: {
            readonly paidOutAt: string | null;
        } | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"TimesheetListActions_Timesheet">;
    readonly " $refType": "TimesheetRow_Timesheet";
};
export type TimesheetRow_Timesheet$data = TimesheetRow_Timesheet;
export type TimesheetRow_Timesheet$key = {
    readonly " $data"?: TimesheetRow_Timesheet$data;
    readonly " $fragmentRefs": FragmentRefs<"TimesheetRow_Timesheet">;
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
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TimesheetRow_Timesheet",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rawId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "freelancer",
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
      "kind": "ScalarField",
      "name": "approvedAt",
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
        (v0/*: any*/),
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
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalHours",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalMinutes",
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
          "name": "paymentStartedAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "clientPaidAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "payoutDueDate",
          "storageKey": null
        }
      ],
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
      "kind": "ScalarField",
      "name": "freelancerStatus",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "autoApprove",
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
          "name": "assumedPayoutDueDate",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "assumedInvoiceDate",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Paycheck",
          "kind": "LinkedField",
          "name": "paycheck",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "paidOutAt",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TimesheetListActions_Timesheet"
    }
  ],
  "type": "Timesheet",
  "abstractKey": null
};
})();
(node as any).hash = '7be8ffd1580e82c399f76da12bb0c2eb';
export default node;

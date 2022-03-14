/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type InvoiceSchedule = "biweekly" | "monthly" | "weekly";
export type PayrollAutoInvoiceDialog_Firm = {
    readonly invoiceSchedule: InvoiceSchedule | null;
    readonly nextAutoInvoiceDate: string | null;
    readonly invoiceSalariesInAdvance: boolean | null;
    readonly " $refType": "PayrollAutoInvoiceDialog_Firm";
};
export type PayrollAutoInvoiceDialog_Firm$data = PayrollAutoInvoiceDialog_Firm;
export type PayrollAutoInvoiceDialog_Firm$key = {
    readonly " $data"?: PayrollAutoInvoiceDialog_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"PayrollAutoInvoiceDialog_Firm">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PayrollAutoInvoiceDialog_Firm",
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
    }
  ],
  "type": "Firm",
  "abstractKey": null
};
(node as any).hash = '320987b443e804dffc1ac0e90401098a';
export default node;

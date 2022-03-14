/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type RejectDialog_Contract = {
    readonly id: string;
    readonly status: ContractStatus;
    readonly " $fragmentRefs": FragmentRefs<"RejectDialogForm_Contract">;
    readonly " $refType": "RejectDialog_Contract";
};
export type RejectDialog_Contract$data = RejectDialog_Contract;
export type RejectDialog_Contract$key = {
    readonly " $data"?: RejectDialog_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"RejectDialog_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RejectDialog_Contract",
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
      "name": "status",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RejectDialogForm_Contract"
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = '157a07e6647517c9951bb1059a3c7768';
export default node;

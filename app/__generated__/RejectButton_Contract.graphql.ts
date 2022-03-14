/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type RejectButton_Contract = {
    readonly status: ContractStatus;
    readonly invitationType: string | null;
    readonly " $fragmentRefs": FragmentRefs<"RejectDialog_Contract">;
    readonly " $refType": "RejectButton_Contract";
};
export type RejectButton_Contract$data = RejectButton_Contract;
export type RejectButton_Contract$key = {
    readonly " $data"?: RejectButton_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"RejectButton_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RejectButton_Contract",
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
      "name": "invitationType",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RejectDialog_Contract"
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = 'e2a66b2979b748949e58ee0c9f4653bb';
export default node;

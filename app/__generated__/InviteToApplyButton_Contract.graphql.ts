/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type InviteToApplyButton_Contract = {
    readonly status: ContractStatus;
    readonly jobOpportunitySentAt: string | null;
    readonly " $refType": "InviteToApplyButton_Contract";
};
export type InviteToApplyButton_Contract$data = InviteToApplyButton_Contract;
export type InviteToApplyButton_Contract$key = {
    readonly " $data"?: InviteToApplyButton_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"InviteToApplyButton_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InviteToApplyButton_Contract",
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
      "name": "jobOpportunitySentAt",
      "storageKey": null
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = '51a4c84b61ed4eca0c46579145ff584b';
export default node;

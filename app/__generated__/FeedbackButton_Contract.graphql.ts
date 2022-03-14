/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type FeedbackButton_Contract = {
    readonly id: string;
    readonly rawId: number | null;
    readonly status: ContractStatus;
    readonly positiveFeedbackCount: number | null;
    readonly negativeFeedbackCount: number | null;
    readonly " $refType": "FeedbackButton_Contract";
};
export type FeedbackButton_Contract$data = FeedbackButton_Contract;
export type FeedbackButton_Contract$key = {
    readonly " $data"?: FeedbackButton_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"FeedbackButton_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeedbackButton_Contract",
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
      "name": "rawId",
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
      "name": "positiveFeedbackCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "negativeFeedbackCount",
      "storageKey": null
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = 'f82c36ea74e5ad54516b8b1d1986f193';
export default node;

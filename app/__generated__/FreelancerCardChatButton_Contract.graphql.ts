/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type FreelancerCardChatButton_Contract = {
    readonly status: ContractStatus;
    readonly " $refType": "FreelancerCardChatButton_Contract";
};
export type FreelancerCardChatButton_Contract$data = FreelancerCardChatButton_Contract;
export type FreelancerCardChatButton_Contract$key = {
    readonly " $data"?: FreelancerCardChatButton_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardChatButton_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerCardChatButton_Contract",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = '58faaf7a642b94777dcc492ee267373b';
export default node;

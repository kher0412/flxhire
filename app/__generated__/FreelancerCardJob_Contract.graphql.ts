/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type FreelancerCardJob_Contract = {
    readonly status: ContractStatus;
    readonly " $refType": "FreelancerCardJob_Contract";
};
export type FreelancerCardJob_Contract$data = FreelancerCardJob_Contract;
export type FreelancerCardJob_Contract$key = {
    readonly " $data"?: FreelancerCardJob_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardJob_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerCardJob_Contract",
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
(node as any).hash = '72600908e25a9034e35c0b6f8e87cea2';
export default node;

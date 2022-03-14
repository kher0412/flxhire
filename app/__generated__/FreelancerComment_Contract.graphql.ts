/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractRequestsStatus = "completed" | "pending" | "rejected" | "started";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type FreelancerComment_Contract = {
    readonly freelancerFeedback: string | null;
    readonly freelancerMessage: string | null;
    readonly status: ContractStatus;
    readonly requestsStatus: ContractRequestsStatus | null;
    readonly " $refType": "FreelancerComment_Contract";
};
export type FreelancerComment_Contract$data = FreelancerComment_Contract;
export type FreelancerComment_Contract$key = {
    readonly " $data"?: FreelancerComment_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerComment_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerComment_Contract",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "freelancerFeedback",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "freelancerMessage",
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
      "name": "requestsStatus",
      "storageKey": null
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = '94771a9bf98655a5faf46a7fe2009276';
export default node;

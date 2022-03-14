/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractRequestsStatus = "completed" | "pending" | "rejected" | "started";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type FreelancerCardStatus_Contract = {
    readonly status: ContractStatus;
    readonly requestsStatus: ContractRequestsStatus | null;
    readonly lastInteractionAt: string | null;
    readonly invitationType: string | null;
    readonly " $refType": "FreelancerCardStatus_Contract";
};
export type FreelancerCardStatus_Contract$data = FreelancerCardStatus_Contract;
export type FreelancerCardStatus_Contract$key = {
    readonly " $data"?: FreelancerCardStatus_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardStatus_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerCardStatus_Contract",
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
      "name": "requestsStatus",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastInteractionAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "invitationType",
      "storageKey": null
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = 'be4134836ff1bd761a58c4fc717d2409';
export default node;

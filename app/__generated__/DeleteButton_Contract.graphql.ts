/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type DeleteButton_Contract = {
    readonly id: string;
    readonly status: ContractStatus;
    readonly freelancerFirstName: string | null;
    readonly " $refType": "DeleteButton_Contract";
};
export type DeleteButton_Contract$data = DeleteButton_Contract;
export type DeleteButton_Contract$key = {
    readonly " $data"?: DeleteButton_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"DeleteButton_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteButton_Contract",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "freelancerFirstName",
      "storageKey": null
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = 'e338cdb59b157da406ded247b6591c57';
export default node;

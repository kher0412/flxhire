/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type RejectDialogForm_Contract = {
    readonly id: string;
    readonly status: ContractStatus;
    readonly freelancerFirstName: string | null;
    readonly job: {
        readonly title: string;
    } | null;
    readonly " $refType": "RejectDialogForm_Contract";
};
export type RejectDialogForm_Contract$data = RejectDialogForm_Contract;
export type RejectDialogForm_Contract$key = {
    readonly " $data"?: RejectDialogForm_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"RejectDialogForm_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RejectDialogForm_Contract",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Job",
      "kind": "LinkedField",
      "name": "job",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = '319462372eb6cec8e51dd5b70100743d';
export default node;

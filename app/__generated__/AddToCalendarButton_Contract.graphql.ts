/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type AddToCalendarButton_Contract = {
    readonly interviewDate: string | null;
    readonly status: ContractStatus;
    readonly freelancerContactEmail: string | null;
    readonly freelancer: {
        readonly firstName: string | null;
        readonly lastName: string | null;
    } | null;
    readonly " $refType": "AddToCalendarButton_Contract";
};
export type AddToCalendarButton_Contract$data = AddToCalendarButton_Contract;
export type AddToCalendarButton_Contract$key = {
    readonly " $data"?: AddToCalendarButton_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"AddToCalendarButton_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddToCalendarButton_Contract",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "interviewDate",
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
      "name": "freelancerContactEmail",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "freelancer",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "firstName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastName",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = 'f1db731d0fbdccbd06537ea08678fa4d';
export default node;

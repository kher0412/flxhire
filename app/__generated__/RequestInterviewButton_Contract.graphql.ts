/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type RequestInterviewButton_Contract = {
    readonly id: string;
    readonly status: ContractStatus;
    readonly interviewDate: string | null;
    readonly interviewDate1: string | null;
    readonly interviewDate2: string | null;
    readonly interviewDate3: string | null;
    readonly calendlyUrl: string | null;
    readonly managedOffPlatform: boolean | null;
    readonly " $refType": "RequestInterviewButton_Contract";
};
export type RequestInterviewButton_Contract$data = RequestInterviewButton_Contract;
export type RequestInterviewButton_Contract$key = {
    readonly " $data"?: RequestInterviewButton_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"RequestInterviewButton_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RequestInterviewButton_Contract",
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
      "name": "interviewDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "interviewDate1",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "interviewDate2",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "interviewDate3",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "calendlyUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "managedOffPlatform",
      "storageKey": null
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = 'a470d09b82fe0c4c8f7847fbfdf522a1';
export default node;

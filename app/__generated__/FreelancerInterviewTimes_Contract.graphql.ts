/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type FreelancerInterviewTimes_Contract = {
    readonly status: ContractStatus;
    readonly freelancerTimezoneName: string | null;
    readonly freelancerContactEmail: string | null;
    readonly interviewSchedulingMethod: string | null;
    readonly interviewDate: string | null;
    readonly interviewDate1: string | null;
    readonly interviewDate2: string | null;
    readonly interviewDate3: string | null;
    readonly " $refType": "FreelancerInterviewTimes_Contract";
};
export type FreelancerInterviewTimes_Contract$data = FreelancerInterviewTimes_Contract;
export type FreelancerInterviewTimes_Contract$key = {
    readonly " $data"?: FreelancerInterviewTimes_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerInterviewTimes_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerInterviewTimes_Contract",
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
      "name": "freelancerTimezoneName",
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
      "kind": "ScalarField",
      "name": "interviewSchedulingMethod",
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
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = 'f06493d64e8383d58e5513283fcfc9ee';
export default node;

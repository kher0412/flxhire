/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobStatus = "closed" | "draft" | "opened";
export type RequestInterviewButton_Job = {
    readonly rawId: number | null;
    readonly status: JobStatus | null;
    readonly " $refType": "RequestInterviewButton_Job";
};
export type RequestInterviewButton_Job$data = RequestInterviewButton_Job;
export type RequestInterviewButton_Job$key = {
    readonly " $data"?: RequestInterviewButton_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"RequestInterviewButton_Job">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RequestInterviewButton_Job",
  "selections": [
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
    }
  ],
  "type": "Job",
  "abstractKey": null
};
(node as any).hash = '03c41e7cbb8c00a6fdc0d045acae11d7';
export default node;

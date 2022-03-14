/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobStatus = "closed" | "draft" | "opened";
export type InviteToApplyButton_Job = {
    readonly rawId: number | null;
    readonly status: JobStatus | null;
    readonly " $refType": "InviteToApplyButton_Job";
};
export type InviteToApplyButton_Job$data = InviteToApplyButton_Job;
export type InviteToApplyButton_Job$key = {
    readonly " $data"?: InviteToApplyButton_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"InviteToApplyButton_Job">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InviteToApplyButton_Job",
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
(node as any).hash = '75556dbb766a1bee49c4b212e6379bec';
export default node;

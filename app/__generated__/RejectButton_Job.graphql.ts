/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobStatus = "closed" | "draft" | "opened";
export type RejectButton_Job = {
    readonly id: string;
    readonly status: JobStatus | null;
    readonly " $refType": "RejectButton_Job";
};
export type RejectButton_Job$data = RejectButton_Job;
export type RejectButton_Job$key = {
    readonly " $data"?: RejectButton_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"RejectButton_Job">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RejectButton_Job",
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
    }
  ],
  "type": "Job",
  "abstractKey": null
};
(node as any).hash = '8bb7adfe4effebec5bc6a3de64810090';
export default node;

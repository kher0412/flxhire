/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobStatus = "closed" | "draft" | "opened";
export type MakeOfferButton_Job = {
    readonly status: JobStatus | null;
    readonly " $refType": "MakeOfferButton_Job";
};
export type MakeOfferButton_Job$data = MakeOfferButton_Job;
export type MakeOfferButton_Job$key = {
    readonly " $data"?: MakeOfferButton_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"MakeOfferButton_Job">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MakeOfferButton_Job",
  "selections": [
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
(node as any).hash = '69a170f8bc06358f0a4fe298e0408d2d';
export default node;

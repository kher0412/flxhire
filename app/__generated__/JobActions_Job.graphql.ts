/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobActions_Job = {
    readonly slug: string | null;
    readonly " $refType": "JobActions_Job";
};
export type JobActions_Job$data = JobActions_Job;
export type JobActions_Job$key = {
    readonly " $data"?: JobActions_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"JobActions_Job">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JobActions_Job",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Job",
  "abstractKey": null
};
(node as any).hash = '42b5c30da419e691498e8a78086f46b9';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobStatus = "closed" | "draft" | "opened";
export type JobSourcingForm_Job = {
    readonly slug: string | null;
    readonly status: JobStatus | null;
    readonly " $fragmentRefs": FragmentRefs<"JobHiringManagerFields_Job">;
    readonly " $refType": "JobSourcingForm_Job";
};
export type JobSourcingForm_Job$data = JobSourcingForm_Job;
export type JobSourcingForm_Job$key = {
    readonly " $data"?: JobSourcingForm_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"JobSourcingForm_Job">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JobSourcingForm_Job",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "JobHiringManagerFields_Job"
    }
  ],
  "type": "Job",
  "abstractKey": null
};
(node as any).hash = '7b578076a780959559f23a810ea20534';
export default node;

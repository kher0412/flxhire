/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type AdminButton_Job = {
    readonly id: string;
    readonly " $refType": "AdminButton_Job";
};
export type AdminButton_Job$data = AdminButton_Job;
export type AdminButton_Job$key = {
    readonly " $data"?: AdminButton_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"AdminButton_Job">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminButton_Job",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Job",
  "abstractKey": null
};
(node as any).hash = 'c4abe90866ca374bc3f31320fe6d509d';
export default node;

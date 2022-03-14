/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Sidebar_Job = {
    readonly " $fragmentRefs": FragmentRefs<"FiltersPanel_Job">;
    readonly " $refType": "Sidebar_Job";
};
export type Sidebar_Job$data = Sidebar_Job;
export type Sidebar_Job$key = {
    readonly " $data"?: Sidebar_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"Sidebar_Job">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Sidebar_Job",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FiltersPanel_Job"
    }
  ],
  "type": "Job",
  "abstractKey": null
};
(node as any).hash = '2298fd3ded686e678040acf248f4001f';
export default node;

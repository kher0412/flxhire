/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FiltersPanel_Job = {
    readonly " $fragmentRefs": FragmentRefs<"SkillsFields_Job" | "LocationFields_Job">;
    readonly " $refType": "FiltersPanel_Job";
};
export type FiltersPanel_Job$data = FiltersPanel_Job;
export type FiltersPanel_Job$key = {
    readonly " $data"?: FiltersPanel_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"FiltersPanel_Job">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FiltersPanel_Job",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SkillsFields_Job"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LocationFields_Job"
    }
  ],
  "type": "Job",
  "abstractKey": null
};
(node as any).hash = '9f65b5861c54a61e9f84bfb392362a81';
export default node;

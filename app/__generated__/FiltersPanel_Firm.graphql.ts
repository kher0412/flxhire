/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FiltersPanel_Firm = {
    readonly " $fragmentRefs": FragmentRefs<"SkillsFields_Firm">;
    readonly " $refType": "FiltersPanel_Firm";
};
export type FiltersPanel_Firm$data = FiltersPanel_Firm;
export type FiltersPanel_Firm$key = {
    readonly " $data"?: FiltersPanel_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"FiltersPanel_Firm">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FiltersPanel_Firm",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SkillsFields_Firm"
    }
  ],
  "type": "Firm",
  "abstractKey": null
};
(node as any).hash = '372bae0fd3ed950f90af98ea69fab0ba';
export default node;

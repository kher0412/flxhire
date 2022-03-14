/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ManagerFilter_Firm = {
    readonly " $fragmentRefs": FragmentRefs<"ManagerSelect_Firm">;
    readonly " $refType": "ManagerFilter_Firm";
};
export type ManagerFilter_Firm$data = ManagerFilter_Firm;
export type ManagerFilter_Firm$key = {
    readonly " $data"?: ManagerFilter_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"ManagerFilter_Firm">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ManagerFilter_Firm",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManagerSelect_Firm"
    }
  ],
  "type": "Firm",
  "abstractKey": null
};
(node as any).hash = '1bd7d6cf0609a1532d40ff791445fbd1';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Sidebar_Firm = {
    readonly " $fragmentRefs": FragmentRefs<"FiltersPanel_Firm">;
    readonly " $refType": "Sidebar_Firm";
};
export type Sidebar_Firm$data = Sidebar_Firm;
export type Sidebar_Firm$key = {
    readonly " $data"?: Sidebar_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"Sidebar_Firm">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Sidebar_Firm",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FiltersPanel_Firm"
    }
  ],
  "type": "Firm",
  "abstractKey": null
};
(node as any).hash = 'b091a5c5561fd6ef5057a420cb6dfc6a';
export default node;

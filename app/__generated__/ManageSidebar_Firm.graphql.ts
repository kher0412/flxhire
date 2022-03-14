/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ManageSidebar_Firm = {
    readonly " $fragmentRefs": FragmentRefs<"ManageFiltersPanel_Firm">;
    readonly " $refType": "ManageSidebar_Firm";
};
export type ManageSidebar_Firm$data = ManageSidebar_Firm;
export type ManageSidebar_Firm$key = {
    readonly " $data"?: ManageSidebar_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"ManageSidebar_Firm">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ManageSidebar_Firm",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManageFiltersPanel_Firm"
    }
  ],
  "type": "Firm",
  "abstractKey": null
};
(node as any).hash = '94153b3d49dffa919afabcc123edef38';
export default node;

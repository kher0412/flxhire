/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Header_Firm = {
    readonly name: string | null;
    readonly " $refType": "Header_Firm";
};
export type Header_Firm$data = Header_Firm;
export type Header_Firm$key = {
    readonly " $data"?: Header_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"Header_Firm">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Header_Firm",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Firm",
  "abstractKey": null
};
(node as any).hash = 'c3ddf1199eb853ebc9a3198f5ae5896d';
export default node;

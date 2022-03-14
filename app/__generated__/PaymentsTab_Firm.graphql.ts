/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PaymentsTab_Firm = {
    readonly " $fragmentRefs": FragmentRefs<"ManageSidebar_Firm">;
    readonly " $refType": "PaymentsTab_Firm";
};
export type PaymentsTab_Firm$data = PaymentsTab_Firm;
export type PaymentsTab_Firm$key = {
    readonly " $data"?: PaymentsTab_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"PaymentsTab_Firm">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PaymentsTab_Firm",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManageSidebar_Firm"
    }
  ],
  "type": "Firm",
  "abstractKey": null
};
(node as any).hash = '2e76ed7165bcbb488cfd5ef58247930d';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type AdminButton_Contract = {
    readonly " $fragmentRefs": FragmentRefs<"AdminTools_Contract">;
    readonly " $refType": "AdminButton_Contract";
};
export type AdminButton_Contract$data = AdminButton_Contract;
export type AdminButton_Contract$key = {
    readonly " $data"?: AdminButton_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"AdminButton_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminButton_Contract",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdminTools_Contract"
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = '98e0406fc18f094e0ae6593220fa7add';
export default node;

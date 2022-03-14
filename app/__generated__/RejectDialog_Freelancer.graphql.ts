/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RejectDialog_Freelancer = {
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"RejectDialogForm_Freelancer">;
    readonly " $refType": "RejectDialog_Freelancer";
};
export type RejectDialog_Freelancer$data = RejectDialog_Freelancer;
export type RejectDialog_Freelancer$key = {
    readonly " $data"?: RejectDialog_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"RejectDialog_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RejectDialog_Freelancer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RejectDialogForm_Freelancer"
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'cdc2a97029ae8208d1228e7af5335414';
export default node;

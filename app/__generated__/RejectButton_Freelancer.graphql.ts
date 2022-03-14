/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RejectButton_Freelancer = {
    readonly " $fragmentRefs": FragmentRefs<"RejectDialog_Freelancer">;
    readonly " $refType": "RejectButton_Freelancer";
};
export type RejectButton_Freelancer$data = RejectButton_Freelancer;
export type RejectButton_Freelancer$key = {
    readonly " $data"?: RejectButton_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"RejectButton_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RejectButton_Freelancer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RejectDialog_Freelancer"
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '1ca46b702e7ec7322406eca794d4bf1a';
export default node;

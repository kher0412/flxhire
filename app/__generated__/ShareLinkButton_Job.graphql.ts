/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ShareLinkButton_Job = {
    readonly rawId: number | null;
    readonly " $refType": "ShareLinkButton_Job";
};
export type ShareLinkButton_Job$data = ShareLinkButton_Job;
export type ShareLinkButton_Job$key = {
    readonly " $data"?: ShareLinkButton_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"ShareLinkButton_Job">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShareLinkButton_Job",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rawId",
      "storageKey": null
    }
  ],
  "type": "Job",
  "abstractKey": null
};
(node as any).hash = '5aaacb8236f39aa6b401fb838792d9f1';
export default node;

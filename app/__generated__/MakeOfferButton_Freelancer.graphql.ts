/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type MakeOfferButton_Freelancer = {
    readonly rawId: number | null;
    readonly " $refType": "MakeOfferButton_Freelancer";
};
export type MakeOfferButton_Freelancer$data = MakeOfferButton_Freelancer;
export type MakeOfferButton_Freelancer$key = {
    readonly " $data"?: MakeOfferButton_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"MakeOfferButton_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MakeOfferButton_Freelancer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rawId",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'c96ee1b2620c709a9261c2fc3e7338dd';
export default node;

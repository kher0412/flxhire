/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FeedbackButton_Freelancer = {
    readonly firstName: string | null;
    readonly avatarUrl: string | null;
    readonly " $refType": "FeedbackButton_Freelancer";
};
export type FeedbackButton_Freelancer$data = FeedbackButton_Freelancer;
export type FeedbackButton_Freelancer$key = {
    readonly " $data"?: FeedbackButton_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"FeedbackButton_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeedbackButton_Freelancer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatarUrl",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'ef8593eb6e4bd1138a02c4005f9c0f5d';
export default node;

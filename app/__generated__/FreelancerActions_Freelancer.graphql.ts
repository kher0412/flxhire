/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerActions_Freelancer = {
    readonly rawId: number | null;
    readonly " $fragmentRefs": FragmentRefs<"AddToCalendarButton_Freelancer" | "AdminButton_Freelancer" | "RejectButton_Freelancer" | "RequestInterviewButton_Freelancer" | "MakeOfferButton_Freelancer" | "InviteToApplyButton_Freelancer">;
    readonly " $refType": "FreelancerActions_Freelancer";
};
export type FreelancerActions_Freelancer$data = FreelancerActions_Freelancer;
export type FreelancerActions_Freelancer$key = {
    readonly " $data"?: FreelancerActions_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerActions_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerActions_Freelancer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rawId",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AddToCalendarButton_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdminButton_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RejectButton_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RequestInterviewButton_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MakeOfferButton_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "InviteToApplyButton_Freelancer"
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '61fced84858f31d8d4d98b24bc63a7a9';
export default node;

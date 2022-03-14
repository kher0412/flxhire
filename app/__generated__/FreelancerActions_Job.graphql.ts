/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerActions_Job = {
    readonly " $fragmentRefs": FragmentRefs<"AdminButton_Job" | "InviteToApplyButton_Job" | "RequestInterviewButton_Job" | "MakeOfferButton_Job" | "RejectButton_Job">;
    readonly " $refType": "FreelancerActions_Job";
};
export type FreelancerActions_Job$data = FreelancerActions_Job;
export type FreelancerActions_Job$key = {
    readonly " $data"?: FreelancerActions_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerActions_Job">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerActions_Job",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdminButton_Job"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "InviteToApplyButton_Job"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RequestInterviewButton_Job"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MakeOfferButton_Job"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RejectButton_Job"
    }
  ],
  "type": "Job",
  "abstractKey": null
};
(node as any).hash = '30e7983f5d6fad0c6792961d5b47fd48';
export default node;

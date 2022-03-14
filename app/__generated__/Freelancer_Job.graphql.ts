/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Freelancer_Job = {
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardJob_Job" | "ShareLinkButton_Job" | "FreelancerActions_Job">;
    readonly " $refType": "Freelancer_Job";
};
export type Freelancer_Job$data = Freelancer_Job;
export type Freelancer_Job$key = {
    readonly " $data"?: Freelancer_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"Freelancer_Job">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Freelancer_Job",
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
      "name": "FreelancerCardJob_Job"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShareLinkButton_Job"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerActions_Job"
    }
  ],
  "type": "Job",
  "abstractKey": null
};
(node as any).hash = '9e70a898c8828e3fb6caa55e9e3088c3';
export default node;

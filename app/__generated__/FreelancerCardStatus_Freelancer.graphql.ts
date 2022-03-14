/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerCardStatus_Freelancer = {
    readonly status: string | null;
    readonly hidden: boolean | null;
    readonly createdAt: string | null;
    readonly appliedAt: string | null;
    readonly " $refType": "FreelancerCardStatus_Freelancer";
};
export type FreelancerCardStatus_Freelancer$data = FreelancerCardStatus_Freelancer;
export type FreelancerCardStatus_Freelancer$key = {
    readonly " $data"?: FreelancerCardStatus_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardStatus_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerCardStatus_Freelancer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hidden",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "appliedAt",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '256ad8c6cd3bcd7bf2b19500a17fdd25';
export default node;

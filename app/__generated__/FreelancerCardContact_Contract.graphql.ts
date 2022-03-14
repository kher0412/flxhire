/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerCardContact_Contract = {
    readonly freelancerPhone: string | null;
    readonly freelancerContactEmail: string | null;
    readonly freelancerFirstName: string | null;
    readonly " $refType": "FreelancerCardContact_Contract";
};
export type FreelancerCardContact_Contract$data = FreelancerCardContact_Contract;
export type FreelancerCardContact_Contract$key = {
    readonly " $data"?: FreelancerCardContact_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardContact_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerCardContact_Contract",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "freelancerPhone",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "freelancerContactEmail",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "freelancerFirstName",
      "storageKey": null
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = 'bbcef425dc329c60dd591d14dc74e650';
export default node;

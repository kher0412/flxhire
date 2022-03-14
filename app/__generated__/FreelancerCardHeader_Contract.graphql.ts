/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerCardHeader_Contract = {
    readonly freelancerFirstName: string | null;
    readonly freelancerLastName: string | null;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardStatus_Contract">;
    readonly " $refType": "FreelancerCardHeader_Contract";
};
export type FreelancerCardHeader_Contract$data = FreelancerCardHeader_Contract;
export type FreelancerCardHeader_Contract$key = {
    readonly " $data"?: FreelancerCardHeader_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardHeader_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerCardHeader_Contract",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "freelancerFirstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "freelancerLastName",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardStatus_Contract"
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = '932fc42901265d9601baea9856c6ff85';
export default node;

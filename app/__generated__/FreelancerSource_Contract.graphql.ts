/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerSource_Contract = {
    readonly " $fragmentRefs": FragmentRefs<"contract_getApplicantSource" | "contract_getApplicantSourceIcon">;
    readonly " $refType": "FreelancerSource_Contract";
};
export type FreelancerSource_Contract$data = FreelancerSource_Contract;
export type FreelancerSource_Contract$key = {
    readonly " $data"?: FreelancerSource_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerSource_Contract">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "applicantSource",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerSource_Contract",
  "selections": [
    {
      "kind": "InlineDataFragmentSpread",
      "name": "contract_getApplicantSource",
      "selections": (v0/*: any*/)
    },
    {
      "kind": "InlineDataFragmentSpread",
      "name": "contract_getApplicantSourceIcon",
      "selections": (v0/*: any*/)
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
})();
(node as any).hash = 'e166cf8b2ee849721adf0e73c24c9bdc';
export default node;

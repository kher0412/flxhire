/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerActions_Contract = {
    readonly rawId: number | null;
    readonly " $fragmentRefs": FragmentRefs<"AddToCalendarButton_Contract" | "AdminButton_Contract" | "DeleteButton_Contract" | "RejectButton_Contract" | "RequestInterviewButton_Contract" | "MakeOfferButton_Contract" | "InviteToApplyButton_Contract" | "ResendButton_Contract">;
    readonly " $refType": "FreelancerActions_Contract";
};
export type FreelancerActions_Contract$data = FreelancerActions_Contract;
export type FreelancerActions_Contract$key = {
    readonly " $data"?: FreelancerActions_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerActions_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerActions_Contract",
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
      "name": "AddToCalendarButton_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdminButton_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DeleteButton_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RejectButton_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RequestInterviewButton_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MakeOfferButton_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "InviteToApplyButton_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResendButton_Contract"
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = 'c871281925a7e5c758b6603325884afe';
export default node;

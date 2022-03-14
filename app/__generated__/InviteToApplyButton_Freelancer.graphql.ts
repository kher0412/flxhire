/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type InviteToApplyButton_Freelancer = {
    readonly firstName: string | null;
    readonly rawId: number | null;
    readonly " $refType": "InviteToApplyButton_Freelancer";
};
export type InviteToApplyButton_Freelancer$data = InviteToApplyButton_Freelancer;
export type InviteToApplyButton_Freelancer$key = {
    readonly " $data"?: InviteToApplyButton_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"InviteToApplyButton_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InviteToApplyButton_Freelancer",
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
      "name": "rawId",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'f1b0570b84b95923b6fe13699ea89a65';
export default node;

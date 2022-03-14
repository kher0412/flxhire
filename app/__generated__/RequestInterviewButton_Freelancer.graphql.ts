/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RequestInterviewButton_Freelancer = {
    readonly rawId: number | null;
    readonly firstName: string | null;
    readonly timezoneOffset: number | null;
    readonly avatarUrl: string | null;
    readonly " $refType": "RequestInterviewButton_Freelancer";
};
export type RequestInterviewButton_Freelancer$data = RequestInterviewButton_Freelancer;
export type RequestInterviewButton_Freelancer$key = {
    readonly " $data"?: RequestInterviewButton_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"RequestInterviewButton_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RequestInterviewButton_Freelancer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rawId",
      "storageKey": null
    },
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
      "name": "timezoneOffset",
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
(node as any).hash = 'afa910dd6083ba64ab749271911e18f9';
export default node;

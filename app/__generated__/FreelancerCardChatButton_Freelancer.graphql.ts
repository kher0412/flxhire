/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerCardChatButton_Freelancer = {
    readonly rawId: number | null;
    readonly status: string | null;
    readonly directChatThreadId: number | null;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly avatarUrl: string | null;
    readonly lastSeenAt: string | null;
    readonly " $refType": "FreelancerCardChatButton_Freelancer";
};
export type FreelancerCardChatButton_Freelancer$data = FreelancerCardChatButton_Freelancer;
export type FreelancerCardChatButton_Freelancer$key = {
    readonly " $data"?: FreelancerCardChatButton_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardChatButton_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerCardChatButton_Freelancer",
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
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "directChatThreadId",
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
      "name": "lastName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatarUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastSeenAt",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '2245b85c225a11a01915d85cc19f5e9c';
export default node;

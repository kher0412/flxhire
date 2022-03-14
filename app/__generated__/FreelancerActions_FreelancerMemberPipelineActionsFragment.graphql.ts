/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerActions_FreelancerMemberPipelineActionsFragment = {
    readonly rawId: number | null;
    readonly directChatThreadId: number | null;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly avatarUrl: string | null;
    readonly lastSeenAt: string | null;
    readonly " $fragmentRefs": FragmentRefs<"AdminTools_Freelancer">;
    readonly " $refType": "FreelancerActions_FreelancerMemberPipelineActionsFragment";
};
export type FreelancerActions_FreelancerMemberPipelineActionsFragment$data = FreelancerActions_FreelancerMemberPipelineActionsFragment;
export type FreelancerActions_FreelancerMemberPipelineActionsFragment$key = {
    readonly " $data"?: FreelancerActions_FreelancerMemberPipelineActionsFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerActions_FreelancerMemberPipelineActionsFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerActions_FreelancerMemberPipelineActionsFragment",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdminTools_Freelancer"
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'e2479fa68550b6ec569a0fd54c054c5b';
export default node;

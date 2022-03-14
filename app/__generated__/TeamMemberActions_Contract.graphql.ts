/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type TeamMemberActions_Contract = {
    readonly client: {
        readonly rawId: number | null;
    } | null;
    readonly id: string;
    readonly rawId: number | null;
    readonly status: ContractStatus;
    readonly paymentMode: string | null;
    readonly invitationType: string | null;
    readonly deletable: boolean | null;
    readonly freelancer: {
        readonly rawId: number | null;
        readonly firstName: string | null;
        readonly lastName: string | null;
        readonly avatarUrl: string | null;
        readonly lastSeenAt: string | null;
        readonly directChatThreadId: number | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ContractSettingsDialog_Contract">;
    readonly " $refType": "TeamMemberActions_Contract";
};
export type TeamMemberActions_Contract$data = TeamMemberActions_Contract;
export type TeamMemberActions_Contract$key = {
    readonly " $data"?: TeamMemberActions_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"TeamMemberActions_Contract">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TeamMemberActions_Contract",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "client",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
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
      "name": "paymentMode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "invitationType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "deletable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "freelancer",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "directChatThreadId",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContractSettingsDialog_Contract"
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
})();
(node as any).hash = '46d066fcd526e1615589c2d01d94e837';
export default node;

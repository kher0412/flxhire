/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type JobStatus = "closed" | "draft" | "opened";
export type ResendButton_Contract = {
    readonly rawId: number | null;
    readonly status: ContractStatus;
    readonly invitationType: string | null;
    readonly freelancerFirstName: string | null;
    readonly freelancerEmail: string | null;
    readonly job: {
        readonly status: JobStatus | null;
    } | null;
    readonly " $refType": "ResendButton_Contract";
};
export type ResendButton_Contract$data = ResendButton_Contract;
export type ResendButton_Contract$key = {
    readonly " $data"?: ResendButton_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"ResendButton_Contract">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResendButton_Contract",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rawId",
      "storageKey": null
    },
    (v0/*: any*/),
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
      "name": "freelancerFirstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "freelancerEmail",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Job",
      "kind": "LinkedField",
      "name": "job",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
})();
(node as any).hash = '409e1c84d7171a71f9126ef5838a5f67';
export default node;

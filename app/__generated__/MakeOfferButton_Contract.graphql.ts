/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type JobStatus = "closed" | "draft" | "opened";
export type MakeOfferButton_Contract = {
    readonly rawId: number | null;
    readonly status: ContractStatus;
    readonly job: {
        readonly status: JobStatus | null;
    } | null;
    readonly " $refType": "MakeOfferButton_Contract";
};
export type MakeOfferButton_Contract$data = MakeOfferButton_Contract;
export type MakeOfferButton_Contract$key = {
    readonly " $data"?: MakeOfferButton_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"MakeOfferButton_Contract">;
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
  "name": "MakeOfferButton_Contract",
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
(node as any).hash = '99707904960873ec45b9e016cafea61d';
export default node;

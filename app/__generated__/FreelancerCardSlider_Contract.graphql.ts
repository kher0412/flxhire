/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type FreelancerCardSlider_Contract = {
    readonly id: string;
    readonly rawId: number | null;
    readonly status: ContractStatus;
    readonly contractRequests: ReadonlyArray<{
        readonly status: string | null;
        readonly requestType: string | null;
    }> | null;
    readonly " $refType": "FreelancerCardSlider_Contract";
};
export type FreelancerCardSlider_Contract$data = FreelancerCardSlider_Contract;
export type FreelancerCardSlider_Contract$key = {
    readonly " $data"?: FreelancerCardSlider_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardSlider_Contract">;
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
  "name": "FreelancerCardSlider_Contract",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
      "concreteType": "ContractRequest",
      "kind": "LinkedField",
      "name": "contractRequests",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "requestType",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
})();
(node as any).hash = 'd0329fe5bb48c1170d2256bf8a1974f6';
export default node;

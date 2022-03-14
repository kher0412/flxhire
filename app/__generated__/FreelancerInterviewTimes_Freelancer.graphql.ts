/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerInterviewTimes_Freelancer = {
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly " $refType": "FreelancerInterviewTimes_Freelancer";
};
export type FreelancerInterviewTimes_Freelancer$data = FreelancerInterviewTimes_Freelancer;
export type FreelancerInterviewTimes_Freelancer$key = {
    readonly " $data"?: FreelancerInterviewTimes_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerInterviewTimes_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerInterviewTimes_Freelancer",
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
      "name": "lastName",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '0a860a88eec66ddfdc198c34cf1e8970';
export default node;

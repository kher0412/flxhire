/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerComment_Freelancer = {
    readonly firstName: string | null;
    readonly " $refType": "FreelancerComment_Freelancer";
};
export type FreelancerComment_Freelancer$data = FreelancerComment_Freelancer;
export type FreelancerComment_Freelancer$key = {
    readonly " $data"?: FreelancerComment_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerComment_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerComment_Freelancer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'e19fc1fe8cdd1d5457ddad830d0ec363';
export default node;

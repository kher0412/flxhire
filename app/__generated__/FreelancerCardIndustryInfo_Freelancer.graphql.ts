/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerCardIndustryInfo_Freelancer = {
    readonly profile: {
        readonly freelancerType: {
            readonly name: string | null;
        } | null;
    } | null;
    readonly " $refType": "FreelancerCardIndustryInfo_Freelancer";
};
export type FreelancerCardIndustryInfo_Freelancer$data = FreelancerCardIndustryInfo_Freelancer;
export type FreelancerCardIndustryInfo_Freelancer$key = {
    readonly " $data"?: FreelancerCardIndustryInfo_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardIndustryInfo_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerCardIndustryInfo_Freelancer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FreelancerType",
          "kind": "LinkedField",
          "name": "freelancerType",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '2fca0f895562a6aed42f2f9146216a00';
export default node;

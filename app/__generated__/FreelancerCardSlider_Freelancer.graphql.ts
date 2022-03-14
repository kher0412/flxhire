/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerCardSlider_Freelancer = {
    readonly rawId: number | null;
    readonly firstName: string | null;
    readonly video: {
        readonly url: string;
        readonly posterUrl: string;
    } | null;
    readonly " $refType": "FreelancerCardSlider_Freelancer";
};
export type FreelancerCardSlider_Freelancer$data = FreelancerCardSlider_Freelancer;
export type FreelancerCardSlider_Freelancer$key = {
    readonly " $data"?: FreelancerCardSlider_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardSlider_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerCardSlider_Freelancer",
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
      "concreteType": "Video",
      "kind": "LinkedField",
      "name": "video",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "posterUrl",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '451886c67c772b92298541ec5ff09382';
export default node;

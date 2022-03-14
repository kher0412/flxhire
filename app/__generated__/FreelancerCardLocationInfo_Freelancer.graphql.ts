/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerCardLocationInfo_Freelancer = {
    readonly profile: {
        readonly city: string | null;
        readonly region: string | null;
        readonly country: string | null;
        readonly fullAddress: string | null;
        readonly locationLatitude: number | null;
        readonly locationLongitude: number | null;
        readonly locationBounds0: number | null;
        readonly locationBounds1: number | null;
        readonly locationBounds2: number | null;
        readonly locationBounds3: number | null;
    } | null;
    readonly " $refType": "FreelancerCardLocationInfo_Freelancer";
};
export type FreelancerCardLocationInfo_Freelancer$data = FreelancerCardLocationInfo_Freelancer;
export type FreelancerCardLocationInfo_Freelancer$key = {
    readonly " $data"?: FreelancerCardLocationInfo_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardLocationInfo_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerCardLocationInfo_Freelancer",
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
          "kind": "ScalarField",
          "name": "city",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "region",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "country",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "fullAddress",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "locationLatitude",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "locationLongitude",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "locationBounds0",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "locationBounds1",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "locationBounds2",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "locationBounds3",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '4853a3a22504c7cb84c6279066cc7ba0';
export default node;

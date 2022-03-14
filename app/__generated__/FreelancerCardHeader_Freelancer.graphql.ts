/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerCardHeader_Freelancer = {
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly status: string | null;
    readonly email: string | null;
    readonly lastSeenAt: string | null;
    readonly resumeUrl: string | null;
    readonly avatarUrl: string | null;
    readonly profile: {
        readonly slug: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardStatus_Freelancer">;
    readonly " $refType": "FreelancerCardHeader_Freelancer";
};
export type FreelancerCardHeader_Freelancer$data = FreelancerCardHeader_Freelancer;
export type FreelancerCardHeader_Freelancer$key = {
    readonly " $data"?: FreelancerCardHeader_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardHeader_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerCardHeader_Freelancer",
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
    },
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
      "name": "email",
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
      "name": "resumeUrl",
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
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardStatus_Freelancer"
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '5c738445f1d98913a1d30151979f40f4';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobType = "freelance" | "permanent";
export type FreelancerRates_Freelancer = {
    readonly firstName: string | null;
    readonly profile: {
        readonly clientRate: {
            readonly currency: {
                readonly code: string | null;
            };
            readonly value: number;
        } | null;
        readonly freelancerRate: {
            readonly currency: {
                readonly code: string | null;
            };
            readonly value: number;
        } | null;
        readonly jobTypes: ReadonlyArray<JobType>;
        readonly availabilityType: ReadonlyArray<string> | null;
        readonly annualCompensation: {
            readonly currency: {
                readonly code: string | null;
            };
            readonly value: number;
        } | null;
    } | null;
    readonly " $refType": "FreelancerRates_Freelancer";
};
export type FreelancerRates_Freelancer$data = FreelancerRates_Freelancer;
export type FreelancerRates_Freelancer$key = {
    readonly " $data"?: FreelancerRates_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerRates_Freelancer">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Currency",
    "kind": "LinkedField",
    "name": "currency",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "code",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerRates_Freelancer",
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
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "clientRate",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "freelancerRate",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "jobTypes",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "availabilityType",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "annualCompensation",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();
(node as any).hash = 'c94aaae24896e686dfbf685ef581c5ea';
export default node;

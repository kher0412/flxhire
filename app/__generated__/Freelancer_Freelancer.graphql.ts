/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Freelancer_Freelancer = {
    readonly id: string;
    readonly firstName: string | null;
    readonly profile: {
        readonly availableAt: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardHeader_Freelancer" | "FreelancerCardIndustryInfo_Freelancer" | "FreelancerCardChatButton_Freelancer" | "FeedbackButton_Freelancer" | "FreelancerComment_Freelancer" | "FreelancerCardLocationInfo_Freelancer" | "FreelancerRates_Freelancer" | "ShareLinkButton_Freelancer" | "FreelancerInterviewTimes_Freelancer" | "FreelancerCardSkillsInfo_Freelancer" | "FreelancerActions_Freelancer" | "FreelancerCardSlider_Freelancer">;
    readonly " $refType": "Freelancer_Freelancer";
};
export type Freelancer_Freelancer$data = Freelancer_Freelancer;
export type Freelancer_Freelancer$key = {
    readonly " $data"?: Freelancer_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"Freelancer_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Freelancer_Freelancer",
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
          "kind": "ScalarField",
          "name": "availableAt",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardHeader_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardIndustryInfo_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardChatButton_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FeedbackButton_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerComment_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardLocationInfo_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerRates_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShareLinkButton_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerInterviewTimes_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardSkillsInfo_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerActions_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardSlider_Freelancer"
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '58489a6b0cbba44a56a46d5430ad74ef';
export default node;

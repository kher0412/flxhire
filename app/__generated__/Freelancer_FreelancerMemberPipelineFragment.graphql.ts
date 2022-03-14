/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Freelancer_FreelancerMemberPipelineFragment = {
    readonly rawId: number | null;
    readonly firstName: string | null;
    readonly hidden: boolean | null;
    readonly profile: {
        readonly slug: string | null;
        readonly availableAt: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardHeader_Freelancer" | "FreelancerCardLocationInfo_Freelancer" | "FreelancerCardIndustryInfo_Freelancer" | "FreelancerRates_Freelancer" | "ShareLinkButton_Freelancer" | "FreelancerCardChatButton_Freelancer" | "FreelancerCardSkillsInfo_Freelancer" | "FreelancerCardSlider_Freelancer" | "FreelancerReferences_Freelancer" | "FreelancerContracts_Contracts">;
    readonly " $refType": "Freelancer_FreelancerMemberPipelineFragment";
};
export type Freelancer_FreelancerMemberPipelineFragment$data = Freelancer_FreelancerMemberPipelineFragment;
export type Freelancer_FreelancerMemberPipelineFragment$key = {
    readonly " $data"?: Freelancer_FreelancerMemberPipelineFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"Freelancer_FreelancerMemberPipelineFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Freelancer_FreelancerMemberPipelineFragment",
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
      "kind": "ScalarField",
      "name": "hidden",
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
        },
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
      "name": "FreelancerCardLocationInfo_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardIndustryInfo_Freelancer"
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
      "name": "FreelancerCardChatButton_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardSkillsInfo_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardSlider_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerReferences_Freelancer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerContracts_Contracts"
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '5270b76c01feeb55001142b6c992e869';
export default node;

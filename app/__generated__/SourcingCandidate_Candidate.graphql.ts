/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SourcingCandidate_Candidate = {
    readonly jobIncompatibilityReasons: ReadonlyArray<string> | null;
    readonly freelancer: {
        readonly rawId: number | null;
        readonly firstName: string | null;
        readonly invitedToJob: boolean | null;
        readonly " $fragmentRefs": FragmentRefs<"FreelancerCardHeader_Freelancer" | "FreelancerCardIndustryInfo_Freelancer" | "FreelancerCardChatButton_Freelancer" | "FreelancerComment_Freelancer" | "FreelancerCardLocationInfo_Freelancer" | "FreelancerRates_Freelancer" | "FreelancerInterviewTimes_Freelancer" | "FreelancerCardSkillsInfo_Freelancer" | "FreelancerCardSlider_Freelancer" | "FreelancerActions_Freelancer">;
    };
    readonly " $refType": "SourcingCandidate_Candidate";
};
export type SourcingCandidate_Candidate$data = SourcingCandidate_Candidate;
export type SourcingCandidate_Candidate$key = {
    readonly " $data"?: SourcingCandidate_Candidate$data;
    readonly " $fragmentRefs": FragmentRefs<"SourcingCandidate_Candidate">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "jobSlug"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SourcingCandidate_Candidate",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "jobIncompatibilityReasons",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "freelancer",
      "plural": false,
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
          "args": [
            {
              "kind": "Variable",
              "name": "jobSlug",
              "variableName": "jobSlug"
            }
          ],
          "kind": "ScalarField",
          "name": "invitedToJob",
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
          "name": "FreelancerCardSlider_Freelancer"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FreelancerActions_Freelancer"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Candidate",
  "abstractKey": null
};
(node as any).hash = 'bc8c0151b3cb3690153605e7617803f2';
export default node;

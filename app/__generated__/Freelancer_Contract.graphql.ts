/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type Freelancer_Contract = {
    readonly id: string;
    readonly rawId: number | null;
    readonly status: ContractStatus;
    readonly startDate: string | null;
    readonly paymentsEnabled: boolean | null;
    readonly applicantSource: string | null;
    readonly client: {
        readonly rawId: number | null;
        readonly name: string | null;
    } | null;
    readonly projectSubmission: {
        readonly description: string | null;
        readonly url: string | null;
        readonly screenshotUrl: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"BookmarkButton_Contract" | "FreelancerCardHeader_Contract" | "FreelancerCardChatButton_Contract" | "FeedbackButton_Contract" | "FreelancerComment_Contract" | "FreelancerSource_Contract" | "FreelancerCardContact_Contract" | "FreelancerRates_Contract" | "FreelancerInterviewTimes_Contract" | "FreelancerCardJob_Contract" | "FreelancerCardSlider_Contract" | "FreelancerActions_Contract" | "HireManager_Contract" | "contract_FilteredOutReason">;
    readonly " $refType": "Freelancer_Contract";
};
export type Freelancer_Contract$data = Freelancer_Contract;
export type Freelancer_Contract$key = {
    readonly " $data"?: Freelancer_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"Freelancer_Contract">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v2 = [
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
],
v3 = [
  (v0/*: any*/)
],
v4 = [
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Freelancer_Contract",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
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
      "name": "startDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "paymentsEnabled",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "applicantSource",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "client",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ProjectSubmission",
      "kind": "LinkedField",
      "name": "projectSubmission",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        },
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
          "name": "screenshotUrl",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BookmarkButton_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardHeader_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardChatButton_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FeedbackButton_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerComment_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerSource_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardContact_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerRates_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerInterviewTimes_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardJob_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerCardSlider_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FreelancerActions_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HireManager_Contract"
    },
    {
      "kind": "InlineDataFragmentSpread",
      "name": "contract_FilteredOutReason",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "requestsStatus",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "clientRate",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "annualCompensation",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bookmarked",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ProjectSubmission",
          "kind": "LinkedField",
          "name": "projectSubmission",
          "plural": false,
          "selections": (v3/*: any*/),
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
              "name": "timezoneOffset",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Video",
              "kind": "LinkedField",
              "name": "video",
              "plural": false,
              "selections": (v3/*: any*/),
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
                  "name": "totalExperience",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "FreelancerSubtype",
                  "kind": "LinkedField",
                  "name": "freelancerSubtypes",
                  "plural": true,
                  "selections": (v4/*: any*/),
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "UserSkill",
              "kind": "LinkedField",
              "name": "userSkills",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "experience",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Skill",
                  "kind": "LinkedField",
                  "name": "skill",
                  "plural": false,
                  "selections": (v4/*: any*/),
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ]
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
})();
(node as any).hash = '4563a34ee1af1999240b976de4298853';
export default node;

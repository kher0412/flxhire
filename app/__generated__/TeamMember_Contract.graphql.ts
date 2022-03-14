/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type TeamMember_Contract = {
    readonly id: string;
    readonly rawId: number | null;
    readonly paymentsEnabled: boolean | null;
    readonly enableTimesheets: boolean | null;
    readonly freelancerEmail: string | null;
    readonly startDate: string | null;
    readonly endDate: string | null;
    readonly nextSalaryInvoiceDate: string | null;
    readonly isManager: boolean | null;
    readonly status: ContractStatus;
    readonly client: {
        readonly name: string | null;
        readonly firm: {
            readonly tags: ReadonlyArray<{
                readonly rawId: number;
                readonly name: string | null;
            }> | null;
        } | null;
    } | null;
    readonly tags: ReadonlyArray<{
        readonly rawId: number;
        readonly name: string | null;
    }> | null;
    readonly freelancer: {
        readonly " $fragmentRefs": FragmentRefs<"FreelancerCardHeader_Freelancer" | "FreelancerCardIndustryInfo_Freelancer" | "FreelancerCardChatButton_Freelancer" | "FeedbackButton_Freelancer" | "FreelancerComment_Freelancer" | "FreelancerCardLocationInfo_Freelancer" | "FreelancerRates_Freelancer" | "ShareLinkButton_Freelancer" | "FreelancerInterviewTimes_Freelancer" | "FreelancerCardSkillsInfo_Freelancer">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardHeader_Contract" | "FreelancerCardChatButton_Contract" | "FeedbackButton_Contract" | "FreelancerComment_Contract" | "FreelancerCardContact_Contract" | "FreelancerRates_Contract" | "FreelancerInterviewTimes_Contract" | "FreelancerCardJob_Contract" | "TeamMemberActions_Contract" | "TeamMemberRole_Contract">;
    readonly " $refType": "TeamMember_Contract";
};
export type TeamMember_Contract$data = TeamMember_Contract;
export type TeamMember_Contract$key = {
    readonly " $data"?: TeamMember_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"TeamMember_Contract">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "Tag",
  "kind": "LinkedField",
  "name": "tags",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/)
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TeamMember_Contract",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
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
      "name": "enableTimesheets",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "freelancerEmail",
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
      "name": "endDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "nextSalaryInvoiceDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isManager",
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
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "client",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Firm",
          "kind": "LinkedField",
          "name": "firm",
          "plural": false,
          "selections": [
            (v2/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "freelancer",
      "plural": false,
      "selections": [
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
        }
      ],
      "storageKey": null
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
      "name": "TeamMemberActions_Contract"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TeamMemberRole_Contract"
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
})();
(node as any).hash = '7662f99a618fd9aa186ff3737c7477b2';
export default node;

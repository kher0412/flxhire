/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FocusedFreelancerActions_QueryVariables = {
    contractId?: number | null;
    freelancerId: number;
    jobId: number;
    hasContract: boolean;
};
export type FocusedFreelancerActions_QueryResponse = {
    readonly freelancer: {
        readonly " $fragmentRefs": FragmentRefs<"FreelancerCardChatButton_Freelancer" | "FeedbackButton_Freelancer" | "FreelancerActions_Freelancer">;
    } | null;
    readonly contract?: {
        readonly " $fragmentRefs": FragmentRefs<"FreelancerCardChatButton_Contract" | "FeedbackButton_Contract" | "FreelancerActions_Contract">;
    } | null;
    readonly job: {
        readonly " $fragmentRefs": FragmentRefs<"FreelancerActions_Job">;
    } | null;
};
export type FocusedFreelancerActions_Query = {
    readonly response: FocusedFreelancerActions_QueryResponse;
    readonly variables: FocusedFreelancerActions_QueryVariables;
};



/*
query FocusedFreelancerActions_Query(
  $contractId: Int
  $freelancerId: Int!
  $jobId: Int!
  $hasContract: Boolean!
) {
  freelancer: user(rawId: $freelancerId) {
    ...FreelancerCardChatButton_Freelancer
    ...FeedbackButton_Freelancer
    ...FreelancerActions_Freelancer
    id
  }
  contract(rawId: $contractId) @include(if: $hasContract) {
    ...FreelancerCardChatButton_Contract
    ...FeedbackButton_Contract
    ...FreelancerActions_Contract
    id
  }
  job(rawId: $jobId) {
    ...FreelancerActions_Job
    id
  }
}

fragment AddToCalendarButton_Contract on Contract {
  interviewDate
  status
  freelancerContactEmail
  freelancer {
    firstName
    lastName
    id
  }
}

fragment AddToCalendarButton_Freelancer on User {
  firstName
  lastName
}

fragment AdminButton_Contract on Contract {
  ...AdminTools_Contract
}

fragment AdminButton_Freelancer on User {
  ...AdminTools_Freelancer
}

fragment AdminButton_Job on Job {
  id
}

fragment AdminTools_Contract on Contract {
  id
  rawId
  status
}

fragment AdminTools_Freelancer on User {
  id
  rawId
  hidden
  status
}

fragment DeleteButton_Contract on Contract {
  id
  status
  freelancerFirstName
}

fragment FeedbackButton_Contract on Contract {
  id
  rawId
  status
  positiveFeedbackCount
  negativeFeedbackCount
}

fragment FeedbackButton_Freelancer on User {
  firstName
  avatarUrl
}

fragment FreelancerActions_Contract on Contract {
  rawId
  ...AddToCalendarButton_Contract
  ...AdminButton_Contract
  ...DeleteButton_Contract
  ...RejectButton_Contract
  ...RequestInterviewButton_Contract
  ...MakeOfferButton_Contract
  ...InviteToApplyButton_Contract
  ...ResendButton_Contract
}

fragment FreelancerActions_Freelancer on User {
  rawId
  ...AddToCalendarButton_Freelancer
  ...AdminButton_Freelancer
  ...RejectButton_Freelancer
  ...RequestInterviewButton_Freelancer
  ...MakeOfferButton_Freelancer
  ...InviteToApplyButton_Freelancer
}

fragment FreelancerActions_Job on Job {
  ...AdminButton_Job
  ...InviteToApplyButton_Job
  ...RequestInterviewButton_Job
  ...MakeOfferButton_Job
  ...RejectButton_Job
}

fragment FreelancerCardChatButton_Contract on Contract {
  status
}

fragment FreelancerCardChatButton_Freelancer on User {
  rawId
  status
  directChatThreadId
  firstName
  lastName
  avatarUrl
  lastSeenAt
}

fragment InviteToApplyButton_Contract on Contract {
  status
  jobOpportunitySentAt
}

fragment InviteToApplyButton_Freelancer on User {
  firstName
  rawId
}

fragment InviteToApplyButton_Job on Job {
  rawId
  status
}

fragment MakeOfferButton_Contract on Contract {
  rawId
  status
  job {
    status
    id
  }
}

fragment MakeOfferButton_Freelancer on User {
  rawId
}

fragment MakeOfferButton_Job on Job {
  status
}

fragment RejectButton_Contract on Contract {
  status
  invitationType
  ...RejectDialog_Contract
}

fragment RejectButton_Freelancer on User {
  ...RejectDialog_Freelancer
}

fragment RejectButton_Job on Job {
  id
  status
}

fragment RejectDialogForm_Contract on Contract {
  id
  status
  freelancerFirstName
  job {
    title
    id
  }
}

fragment RejectDialogForm_Freelancer on User {
  id
  firstName
}

fragment RejectDialog_Contract on Contract {
  id
  status
  ...RejectDialogForm_Contract
}

fragment RejectDialog_Freelancer on User {
  id
  ...RejectDialogForm_Freelancer
}

fragment RequestInterviewButton_Contract on Contract {
  id
  status
  interviewDate
  interviewDate1
  interviewDate2
  interviewDate3
  calendlyUrl
  managedOffPlatform
}

fragment RequestInterviewButton_Freelancer on User {
  rawId
  firstName
  timezoneOffset
  avatarUrl
}

fragment RequestInterviewButton_Job on Job {
  rawId
  status
}

fragment ResendButton_Contract on Contract {
  rawId
  status
  invitationType
  freelancerFirstName
  freelancerEmail
  job {
    status
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "contractId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "freelancerId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasContract"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "jobId"
},
v4 = [
  {
    "kind": "Variable",
    "name": "rawId",
    "variableName": "freelancerId"
  }
],
v5 = [
  {
    "kind": "Variable",
    "name": "rawId",
    "variableName": "jobId"
  }
],
v6 = [
  {
    "kind": "Variable",
    "name": "rawId",
    "variableName": "contractId"
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FocusedFreelancerActions_Query",
    "selections": [
      {
        "alias": "freelancer",
        "args": (v4/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
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
            "name": "FreelancerActions_Freelancer"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "Job",
        "kind": "LinkedField",
        "name": "job",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FreelancerActions_Job"
          }
        ],
        "storageKey": null
      },
      {
        "condition": "hasContract",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
            "plural": false,
            "selections": [
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
                "name": "FreelancerActions_Contract"
              }
            ],
            "storageKey": null
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "FocusedFreelancerActions_Query",
    "selections": [
      {
        "alias": "freelancer",
        "args": (v4/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "directChatThreadId",
            "storageKey": null
          },
          (v9/*: any*/),
          (v10/*: any*/),
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
            "kind": "ScalarField",
            "name": "lastSeenAt",
            "storageKey": null
          },
          (v11/*: any*/),
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
            "kind": "ScalarField",
            "name": "timezoneOffset",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "Job",
        "kind": "LinkedField",
        "name": "job",
        "plural": false,
        "selections": [
          (v11/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/)
        ],
        "storageKey": null
      },
      {
        "condition": "hasContract",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              (v11/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "positiveFeedbackCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "negativeFeedbackCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "interviewDate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "freelancerContactEmail",
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
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "freelancerFirstName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "invitationType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Job",
                "kind": "LinkedField",
                "name": "job",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "interviewDate1",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "interviewDate2",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "interviewDate3",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "calendlyUrl",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "managedOffPlatform",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "jobOpportunitySentAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "freelancerEmail",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "027365f7394d127db2eb85cd3a89fb62",
    "id": null,
    "metadata": {},
    "name": "FocusedFreelancerActions_Query",
    "operationKind": "query",
    "text": "query FocusedFreelancerActions_Query(\n  $contractId: Int\n  $freelancerId: Int!\n  $jobId: Int!\n  $hasContract: Boolean!\n) {\n  freelancer: user(rawId: $freelancerId) {\n    ...FreelancerCardChatButton_Freelancer\n    ...FeedbackButton_Freelancer\n    ...FreelancerActions_Freelancer\n    id\n  }\n  contract(rawId: $contractId) @include(if: $hasContract) {\n    ...FreelancerCardChatButton_Contract\n    ...FeedbackButton_Contract\n    ...FreelancerActions_Contract\n    id\n  }\n  job(rawId: $jobId) {\n    ...FreelancerActions_Job\n    id\n  }\n}\n\nfragment AddToCalendarButton_Contract on Contract {\n  interviewDate\n  status\n  freelancerContactEmail\n  freelancer {\n    firstName\n    lastName\n    id\n  }\n}\n\nfragment AddToCalendarButton_Freelancer on User {\n  firstName\n  lastName\n}\n\nfragment AdminButton_Contract on Contract {\n  ...AdminTools_Contract\n}\n\nfragment AdminButton_Freelancer on User {\n  ...AdminTools_Freelancer\n}\n\nfragment AdminButton_Job on Job {\n  id\n}\n\nfragment AdminTools_Contract on Contract {\n  id\n  rawId\n  status\n}\n\nfragment AdminTools_Freelancer on User {\n  id\n  rawId\n  hidden\n  status\n}\n\nfragment DeleteButton_Contract on Contract {\n  id\n  status\n  freelancerFirstName\n}\n\nfragment FeedbackButton_Contract on Contract {\n  id\n  rawId\n  status\n  positiveFeedbackCount\n  negativeFeedbackCount\n}\n\nfragment FeedbackButton_Freelancer on User {\n  firstName\n  avatarUrl\n}\n\nfragment FreelancerActions_Contract on Contract {\n  rawId\n  ...AddToCalendarButton_Contract\n  ...AdminButton_Contract\n  ...DeleteButton_Contract\n  ...RejectButton_Contract\n  ...RequestInterviewButton_Contract\n  ...MakeOfferButton_Contract\n  ...InviteToApplyButton_Contract\n  ...ResendButton_Contract\n}\n\nfragment FreelancerActions_Freelancer on User {\n  rawId\n  ...AddToCalendarButton_Freelancer\n  ...AdminButton_Freelancer\n  ...RejectButton_Freelancer\n  ...RequestInterviewButton_Freelancer\n  ...MakeOfferButton_Freelancer\n  ...InviteToApplyButton_Freelancer\n}\n\nfragment FreelancerActions_Job on Job {\n  ...AdminButton_Job\n  ...InviteToApplyButton_Job\n  ...RequestInterviewButton_Job\n  ...MakeOfferButton_Job\n  ...RejectButton_Job\n}\n\nfragment FreelancerCardChatButton_Contract on Contract {\n  status\n}\n\nfragment FreelancerCardChatButton_Freelancer on User {\n  rawId\n  status\n  directChatThreadId\n  firstName\n  lastName\n  avatarUrl\n  lastSeenAt\n}\n\nfragment InviteToApplyButton_Contract on Contract {\n  status\n  jobOpportunitySentAt\n}\n\nfragment InviteToApplyButton_Freelancer on User {\n  firstName\n  rawId\n}\n\nfragment InviteToApplyButton_Job on Job {\n  rawId\n  status\n}\n\nfragment MakeOfferButton_Contract on Contract {\n  rawId\n  status\n  job {\n    status\n    id\n  }\n}\n\nfragment MakeOfferButton_Freelancer on User {\n  rawId\n}\n\nfragment MakeOfferButton_Job on Job {\n  status\n}\n\nfragment RejectButton_Contract on Contract {\n  status\n  invitationType\n  ...RejectDialog_Contract\n}\n\nfragment RejectButton_Freelancer on User {\n  ...RejectDialog_Freelancer\n}\n\nfragment RejectButton_Job on Job {\n  id\n  status\n}\n\nfragment RejectDialogForm_Contract on Contract {\n  id\n  status\n  freelancerFirstName\n  job {\n    title\n    id\n  }\n}\n\nfragment RejectDialogForm_Freelancer on User {\n  id\n  firstName\n}\n\nfragment RejectDialog_Contract on Contract {\n  id\n  status\n  ...RejectDialogForm_Contract\n}\n\nfragment RejectDialog_Freelancer on User {\n  id\n  ...RejectDialogForm_Freelancer\n}\n\nfragment RequestInterviewButton_Contract on Contract {\n  id\n  status\n  interviewDate\n  interviewDate1\n  interviewDate2\n  interviewDate3\n  calendlyUrl\n  managedOffPlatform\n}\n\nfragment RequestInterviewButton_Freelancer on User {\n  rawId\n  firstName\n  timezoneOffset\n  avatarUrl\n}\n\nfragment RequestInterviewButton_Job on Job {\n  rawId\n  status\n}\n\nfragment ResendButton_Contract on Contract {\n  rawId\n  status\n  invitationType\n  freelancerFirstName\n  freelancerEmail\n  job {\n    status\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '8820f87e25d24995de00396f857f498b';
export default node;

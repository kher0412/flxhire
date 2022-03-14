/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Offers_offersVariables = {
    count?: number | null;
    cursor?: string | null;
    jobId?: string | null;
    id: string;
};
export type Offers_offersResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"Offers_Firm">;
    } | null;
};
export type Offers_offers = {
    readonly response: Offers_offersResponse;
    readonly variables: Offers_offersVariables;
};



/*
query Offers_offers(
  $count: Int = 5
  $cursor: String
  $jobId: ID
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...Offers_Firm_2ZqXB3
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

fragment Application_Contract on Contract {
  ...Freelancer_Contract
  job {
    ...Freelancer_Job
    id
  }
  freelancer {
    ...Freelancer_Freelancer
    id
  }
  client {
    firm {
      slug
      id
    }
    id
  }
}

fragment BookmarkButton_Contract on Contract {
  id
  bookmarked
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

fragment FreelancerCardContact_Contract on Contract {
  freelancerPhone
  freelancerContactEmail
  freelancerFirstName
}

fragment FreelancerCardHeader_Contract on Contract {
  freelancerFirstName
  freelancerLastName
  ...FreelancerCardStatus_Contract
}

fragment FreelancerCardHeader_Freelancer on User {
  firstName
  lastName
  status
  email
  lastSeenAt
  resumeUrl
  avatarUrl
  profile {
    slug
    id
  }
  ...FreelancerCardStatus_Freelancer
}

fragment FreelancerCardIndustryInfo_Freelancer on User {
  profile {
    freelancerType {
      name
      id
    }
    id
  }
}

fragment FreelancerCardJob_Contract on Contract {
  status
}

fragment FreelancerCardJob_Job on Job {
  status
  title
  slug
  user {
    firm {
      slug
      name
      id
    }
    id
  }
}

fragment FreelancerCardLocationInfo_Freelancer on User {
  profile {
    city
    region
    country
    fullAddress
    locationLatitude
    locationLongitude
    locationBounds0
    locationBounds1
    locationBounds2
    locationBounds3
    id
  }
}

fragment FreelancerCardSkillsInfo_Freelancer on User {
  profile {
    freelancerSubtypes {
      rawId
      name
      id
    }
    id
  }
  userSkills {
    experience
    skill {
      rawId
      name
      id
    }
    id
  }
}

fragment FreelancerCardSlider_Contract on Contract {
  id
  rawId
  status
  contractRequests {
    status
    requestType
    id
  }
}

fragment FreelancerCardSlider_Freelancer on User {
  rawId
  firstName
  video {
    url
    posterUrl
    id
  }
}

fragment FreelancerCardStatus_Contract on Contract {
  status
  requestsStatus
  lastInteractionAt
  invitationType
}

fragment FreelancerCardStatus_Freelancer on User {
  status
  hidden
  createdAt
  appliedAt
}

fragment FreelancerComment_Contract on Contract {
  freelancerFeedback
  freelancerMessage
  status
  requestsStatus
}

fragment FreelancerComment_Freelancer on User {
  firstName
}

fragment FreelancerInterviewTimes_Contract on Contract {
  status
  freelancerTimezoneName
  freelancerContactEmail
  interviewSchedulingMethod
  interviewDate
  interviewDate1
  interviewDate2
  interviewDate3
}

fragment FreelancerInterviewTimes_Freelancer on User {
  firstName
  lastName
}

fragment FreelancerRates_Contract on Contract {
  status
  freelancerFirstName
  clientRate {
    currency {
      code
      id
    }
    value
  }
  freelancerRate {
    currency {
      code
      id
    }
    value
  }
  annualCompensation {
    currency {
      code
      id
    }
    value
  }
  currency {
    code
    id
  }
  invitationType
  availabilityType
  positionTypes
  rateMode
  nextSalaryInvoiceDate
  dailyFee {
    currency {
      code
      id
    }
    value
  }
}

fragment FreelancerRates_Freelancer on User {
  firstName
  profile {
    clientRate {
      currency {
        code
        id
      }
      value
    }
    freelancerRate {
      currency {
        code
        id
      }
      value
    }
    jobTypes
    availabilityType
    annualCompensation {
      currency {
        code
        id
      }
      value
    }
    id
  }
}

fragment FreelancerSource_Contract on Contract {
  ...contract_getApplicantSource
  ...contract_getApplicantSourceIcon
}

fragment Freelancer_Contract on Contract {
  id
  rawId
  status
  startDate
  paymentsEnabled
  applicantSource
  client {
    rawId
    name
    id
  }
  projectSubmission {
    description
    url
    screenshotUrl
    id
  }
  ...BookmarkButton_Contract
  ...FreelancerCardHeader_Contract
  ...FreelancerCardChatButton_Contract
  ...FeedbackButton_Contract
  ...FreelancerComment_Contract
  ...FreelancerSource_Contract
  ...FreelancerCardContact_Contract
  ...FreelancerRates_Contract
  ...FreelancerInterviewTimes_Contract
  ...FreelancerCardJob_Contract
  ...FreelancerCardSlider_Contract
  ...FreelancerActions_Contract
  ...HireManager_Contract
  ...contract_FilteredOutReason
}

fragment Freelancer_Freelancer on User {
  id
  firstName
  profile {
    availableAt
    id
  }
  ...FreelancerCardHeader_Freelancer
  ...FreelancerCardIndustryInfo_Freelancer
  ...FreelancerCardChatButton_Freelancer
  ...FeedbackButton_Freelancer
  ...FreelancerComment_Freelancer
  ...FreelancerCardLocationInfo_Freelancer
  ...FreelancerRates_Freelancer
  ...ShareLinkButton_Freelancer
  ...FreelancerInterviewTimes_Freelancer
  ...FreelancerCardSkillsInfo_Freelancer
  ...FreelancerActions_Freelancer
  ...FreelancerCardSlider_Freelancer
}

fragment Freelancer_Job on Job {
  id
  ...FreelancerCardJob_Job
  ...ShareLinkButton_Job
  ...FreelancerActions_Job
}

fragment HireManager_Contract on Contract {
  id
  status
  client {
    id
    name
    firm {
      users {
        id
        name
      }
      id
    }
  }
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

fragment Offers_Firm_2ZqXB3 on Firm {
  offers: contracts(first: $count, after: $cursor, filters: {stage: "offer", jobId: $jobId, membersOnly: true}) {
    totalCount
    edges {
      node {
        id
        ...Application_Contract
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  id
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

fragment ShareLinkButton_Freelancer on User {
  rawId
  profile {
    slug
    id
  }
}

fragment ShareLinkButton_Job on Job {
  rawId
}

fragment contract_FilteredOutReason on Contract {
  requestsStatus
  clientRate {
    currency {
      code
      id
    }
    value
  }
  annualCompensation {
    currency {
      code
      id
    }
    value
  }
  bookmarked
  projectSubmission {
    id
  }
  freelancer {
    timezoneOffset
    video {
      id
    }
    profile {
      totalExperience
      freelancerSubtypes {
        rawId
        id
      }
      id
    }
    userSkills {
      experience
      skill {
        rawId
        id
      }
      id
    }
    id
  }
}

fragment contract_getApplicantSource on Contract {
  applicantSource
}

fragment contract_getApplicantSourceIcon on Contract {
  applicantSource
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": 5,
  "kind": "LocalArgument",
  "name": "count"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "jobId"
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v5 = {
  "kind": "Variable",
  "name": "jobId",
  "variableName": "jobId"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "fields": [
      (v5/*: any*/),
      {
        "kind": "Literal",
        "name": "membersOnly",
        "value": true
      },
      {
        "kind": "Literal",
        "name": "stage",
        "value": "offer"
      }
    ],
    "kind": "ObjectValue",
    "name": "filters"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v14 = {
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
    },
    (v7/*: any*/)
  ],
  "storageKey": null
},
v15 = [
  (v14/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
],
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "clientRate",
  "plural": false,
  "selections": (v15/*: any*/),
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "freelancerRate",
  "plural": false,
  "selections": (v15/*: any*/),
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "annualCompensation",
  "plural": false,
  "selections": (v15/*: any*/),
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "availabilityType",
  "storageKey": null
},
v20 = [
  (v9/*: any*/),
  (v7/*: any*/),
  (v11/*: any*/)
];
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
    "name": "Offers_offers",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              },
              (v5/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "Offers_Firm"
          }
        ],
        "storageKey": null
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
    "name": "Offers_offers",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": "offers",
                "args": (v8/*: any*/),
                "concreteType": "ContractConnection",
                "kind": "LinkedField",
                "name": "contracts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "totalCount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ContractEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Contract",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
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
                              (v9/*: any*/),
                              (v11/*: any*/),
                              (v7/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Firm",
                                "kind": "LinkedField",
                                "name": "firm",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "User",
                                    "kind": "LinkedField",
                                    "name": "users",
                                    "plural": true,
                                    "selections": [
                                      (v7/*: any*/),
                                      (v11/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v7/*: any*/),
                                  (v12/*: any*/)
                                ],
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
                              (v13/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "screenshotUrl",
                                "storageKey": null
                              },
                              (v7/*: any*/)
                            ],
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
                            "kind": "ScalarField",
                            "name": "freelancerFirstName",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "freelancerLastName",
                            "storageKey": null
                          },
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
                            "kind": "ScalarField",
                            "name": "lastInteractionAt",
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
                            "name": "freelancerFeedback",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "freelancerMessage",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "freelancerPhone",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "freelancerContactEmail",
                            "storageKey": null
                          },
                          (v16/*: any*/),
                          (v17/*: any*/),
                          (v18/*: any*/),
                          (v14/*: any*/),
                          (v19/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "positionTypes",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "rateMode",
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
                            "concreteType": "Money",
                            "kind": "LinkedField",
                            "name": "dailyFee",
                            "plural": false,
                            "selections": (v15/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "freelancerTimezoneName",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "interviewSchedulingMethod",
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
                            "concreteType": "ContractRequest",
                            "kind": "LinkedField",
                            "name": "contractRequests",
                            "plural": true,
                            "selections": [
                              (v10/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "requestType",
                                "storageKey": null
                              },
                              (v7/*: any*/)
                            ],
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
                              (v7/*: any*/),
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
                                "selections": [
                                  (v7/*: any*/),
                                  (v13/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "posterUrl",
                                    "storageKey": null
                                  }
                                ],
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
                                    "selections": (v20/*: any*/),
                                    "storageKey": null
                                  },
                                  (v7/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "availableAt",
                                    "storageKey": null
                                  },
                                  (v12/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "FreelancerType",
                                    "kind": "LinkedField",
                                    "name": "freelancerType",
                                    "plural": false,
                                    "selections": [
                                      (v11/*: any*/),
                                      (v7/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
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
                                  },
                                  (v16/*: any*/),
                                  (v17/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "jobTypes",
                                    "storageKey": null
                                  },
                                  (v19/*: any*/),
                                  (v18/*: any*/)
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
                                    "selections": (v20/*: any*/),
                                    "storageKey": null
                                  },
                                  (v7/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v10/*: any*/),
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
                                "kind": "ScalarField",
                                "name": "hidden",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "createdAt",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "appliedAt",
                                "storageKey": null
                              },
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "directChatThreadId",
                                "storageKey": null
                              }
                            ],
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
                              (v7/*: any*/),
                              (v10/*: any*/),
                              (v12/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "User",
                                "kind": "LinkedField",
                                "name": "user",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Firm",
                                    "kind": "LinkedField",
                                    "name": "firm",
                                    "plural": false,
                                    "selections": [
                                      (v12/*: any*/),
                                      (v11/*: any*/),
                                      (v7/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v7/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v9/*: any*/)
                            ],
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
                          },
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cursor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "ClientExtension",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__id",
                        "storageKey": null
                      }
                    ]
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "offers",
                "args": (v8/*: any*/),
                "filters": [
                  "filters"
                ],
                "handle": "connection",
                "key": "Offers_offers",
                "kind": "LinkedHandle",
                "name": "contracts"
              }
            ],
            "type": "Firm",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1fc3e40b64c2db86ff14ad3cee46127a",
    "id": null,
    "metadata": {},
    "name": "Offers_offers",
    "operationKind": "query",
    "text": "query Offers_offers(\n  $count: Int = 5\n  $cursor: String\n  $jobId: ID\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...Offers_Firm_2ZqXB3\n    id\n  }\n}\n\nfragment AddToCalendarButton_Contract on Contract {\n  interviewDate\n  status\n  freelancerContactEmail\n  freelancer {\n    firstName\n    lastName\n    id\n  }\n}\n\nfragment AddToCalendarButton_Freelancer on User {\n  firstName\n  lastName\n}\n\nfragment AdminButton_Contract on Contract {\n  ...AdminTools_Contract\n}\n\nfragment AdminButton_Freelancer on User {\n  ...AdminTools_Freelancer\n}\n\nfragment AdminButton_Job on Job {\n  id\n}\n\nfragment AdminTools_Contract on Contract {\n  id\n  rawId\n  status\n}\n\nfragment AdminTools_Freelancer on User {\n  id\n  rawId\n  hidden\n  status\n}\n\nfragment Application_Contract on Contract {\n  ...Freelancer_Contract\n  job {\n    ...Freelancer_Job\n    id\n  }\n  freelancer {\n    ...Freelancer_Freelancer\n    id\n  }\n  client {\n    firm {\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment BookmarkButton_Contract on Contract {\n  id\n  bookmarked\n}\n\nfragment DeleteButton_Contract on Contract {\n  id\n  status\n  freelancerFirstName\n}\n\nfragment FeedbackButton_Contract on Contract {\n  id\n  rawId\n  status\n  positiveFeedbackCount\n  negativeFeedbackCount\n}\n\nfragment FeedbackButton_Freelancer on User {\n  firstName\n  avatarUrl\n}\n\nfragment FreelancerActions_Contract on Contract {\n  rawId\n  ...AddToCalendarButton_Contract\n  ...AdminButton_Contract\n  ...DeleteButton_Contract\n  ...RejectButton_Contract\n  ...RequestInterviewButton_Contract\n  ...MakeOfferButton_Contract\n  ...InviteToApplyButton_Contract\n  ...ResendButton_Contract\n}\n\nfragment FreelancerActions_Freelancer on User {\n  rawId\n  ...AddToCalendarButton_Freelancer\n  ...AdminButton_Freelancer\n  ...RejectButton_Freelancer\n  ...RequestInterviewButton_Freelancer\n  ...MakeOfferButton_Freelancer\n  ...InviteToApplyButton_Freelancer\n}\n\nfragment FreelancerActions_Job on Job {\n  ...AdminButton_Job\n  ...InviteToApplyButton_Job\n  ...RequestInterviewButton_Job\n  ...MakeOfferButton_Job\n  ...RejectButton_Job\n}\n\nfragment FreelancerCardChatButton_Contract on Contract {\n  status\n}\n\nfragment FreelancerCardChatButton_Freelancer on User {\n  rawId\n  status\n  directChatThreadId\n  firstName\n  lastName\n  avatarUrl\n  lastSeenAt\n}\n\nfragment FreelancerCardContact_Contract on Contract {\n  freelancerPhone\n  freelancerContactEmail\n  freelancerFirstName\n}\n\nfragment FreelancerCardHeader_Contract on Contract {\n  freelancerFirstName\n  freelancerLastName\n  ...FreelancerCardStatus_Contract\n}\n\nfragment FreelancerCardHeader_Freelancer on User {\n  firstName\n  lastName\n  status\n  email\n  lastSeenAt\n  resumeUrl\n  avatarUrl\n  profile {\n    slug\n    id\n  }\n  ...FreelancerCardStatus_Freelancer\n}\n\nfragment FreelancerCardIndustryInfo_Freelancer on User {\n  profile {\n    freelancerType {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment FreelancerCardJob_Contract on Contract {\n  status\n}\n\nfragment FreelancerCardJob_Job on Job {\n  status\n  title\n  slug\n  user {\n    firm {\n      slug\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment FreelancerCardLocationInfo_Freelancer on User {\n  profile {\n    city\n    region\n    country\n    fullAddress\n    locationLatitude\n    locationLongitude\n    locationBounds0\n    locationBounds1\n    locationBounds2\n    locationBounds3\n    id\n  }\n}\n\nfragment FreelancerCardSkillsInfo_Freelancer on User {\n  profile {\n    freelancerSubtypes {\n      rawId\n      name\n      id\n    }\n    id\n  }\n  userSkills {\n    experience\n    skill {\n      rawId\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment FreelancerCardSlider_Contract on Contract {\n  id\n  rawId\n  status\n  contractRequests {\n    status\n    requestType\n    id\n  }\n}\n\nfragment FreelancerCardSlider_Freelancer on User {\n  rawId\n  firstName\n  video {\n    url\n    posterUrl\n    id\n  }\n}\n\nfragment FreelancerCardStatus_Contract on Contract {\n  status\n  requestsStatus\n  lastInteractionAt\n  invitationType\n}\n\nfragment FreelancerCardStatus_Freelancer on User {\n  status\n  hidden\n  createdAt\n  appliedAt\n}\n\nfragment FreelancerComment_Contract on Contract {\n  freelancerFeedback\n  freelancerMessage\n  status\n  requestsStatus\n}\n\nfragment FreelancerComment_Freelancer on User {\n  firstName\n}\n\nfragment FreelancerInterviewTimes_Contract on Contract {\n  status\n  freelancerTimezoneName\n  freelancerContactEmail\n  interviewSchedulingMethod\n  interviewDate\n  interviewDate1\n  interviewDate2\n  interviewDate3\n}\n\nfragment FreelancerInterviewTimes_Freelancer on User {\n  firstName\n  lastName\n}\n\nfragment FreelancerRates_Contract on Contract {\n  status\n  freelancerFirstName\n  clientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  freelancerRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  annualCompensation {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n  invitationType\n  availabilityType\n  positionTypes\n  rateMode\n  nextSalaryInvoiceDate\n  dailyFee {\n    currency {\n      code\n      id\n    }\n    value\n  }\n}\n\nfragment FreelancerRates_Freelancer on User {\n  firstName\n  profile {\n    clientRate {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    freelancerRate {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    jobTypes\n    availabilityType\n    annualCompensation {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    id\n  }\n}\n\nfragment FreelancerSource_Contract on Contract {\n  ...contract_getApplicantSource\n  ...contract_getApplicantSourceIcon\n}\n\nfragment Freelancer_Contract on Contract {\n  id\n  rawId\n  status\n  startDate\n  paymentsEnabled\n  applicantSource\n  client {\n    rawId\n    name\n    id\n  }\n  projectSubmission {\n    description\n    url\n    screenshotUrl\n    id\n  }\n  ...BookmarkButton_Contract\n  ...FreelancerCardHeader_Contract\n  ...FreelancerCardChatButton_Contract\n  ...FeedbackButton_Contract\n  ...FreelancerComment_Contract\n  ...FreelancerSource_Contract\n  ...FreelancerCardContact_Contract\n  ...FreelancerRates_Contract\n  ...FreelancerInterviewTimes_Contract\n  ...FreelancerCardJob_Contract\n  ...FreelancerCardSlider_Contract\n  ...FreelancerActions_Contract\n  ...HireManager_Contract\n  ...contract_FilteredOutReason\n}\n\nfragment Freelancer_Freelancer on User {\n  id\n  firstName\n  profile {\n    availableAt\n    id\n  }\n  ...FreelancerCardHeader_Freelancer\n  ...FreelancerCardIndustryInfo_Freelancer\n  ...FreelancerCardChatButton_Freelancer\n  ...FeedbackButton_Freelancer\n  ...FreelancerComment_Freelancer\n  ...FreelancerCardLocationInfo_Freelancer\n  ...FreelancerRates_Freelancer\n  ...ShareLinkButton_Freelancer\n  ...FreelancerInterviewTimes_Freelancer\n  ...FreelancerCardSkillsInfo_Freelancer\n  ...FreelancerActions_Freelancer\n  ...FreelancerCardSlider_Freelancer\n}\n\nfragment Freelancer_Job on Job {\n  id\n  ...FreelancerCardJob_Job\n  ...ShareLinkButton_Job\n  ...FreelancerActions_Job\n}\n\nfragment HireManager_Contract on Contract {\n  id\n  status\n  client {\n    id\n    name\n    firm {\n      users {\n        id\n        name\n      }\n      id\n    }\n  }\n}\n\nfragment InviteToApplyButton_Contract on Contract {\n  status\n  jobOpportunitySentAt\n}\n\nfragment InviteToApplyButton_Freelancer on User {\n  firstName\n  rawId\n}\n\nfragment InviteToApplyButton_Job on Job {\n  rawId\n  status\n}\n\nfragment MakeOfferButton_Contract on Contract {\n  rawId\n  status\n  job {\n    status\n    id\n  }\n}\n\nfragment MakeOfferButton_Freelancer on User {\n  rawId\n}\n\nfragment MakeOfferButton_Job on Job {\n  status\n}\n\nfragment Offers_Firm_2ZqXB3 on Firm {\n  offers: contracts(first: $count, after: $cursor, filters: {stage: \"offer\", jobId: $jobId, membersOnly: true}) {\n    totalCount\n    edges {\n      node {\n        id\n        ...Application_Contract\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment RejectButton_Contract on Contract {\n  status\n  invitationType\n  ...RejectDialog_Contract\n}\n\nfragment RejectButton_Freelancer on User {\n  ...RejectDialog_Freelancer\n}\n\nfragment RejectButton_Job on Job {\n  id\n  status\n}\n\nfragment RejectDialogForm_Contract on Contract {\n  id\n  status\n  freelancerFirstName\n  job {\n    title\n    id\n  }\n}\n\nfragment RejectDialogForm_Freelancer on User {\n  id\n  firstName\n}\n\nfragment RejectDialog_Contract on Contract {\n  id\n  status\n  ...RejectDialogForm_Contract\n}\n\nfragment RejectDialog_Freelancer on User {\n  id\n  ...RejectDialogForm_Freelancer\n}\n\nfragment RequestInterviewButton_Contract on Contract {\n  id\n  status\n  interviewDate\n  interviewDate1\n  interviewDate2\n  interviewDate3\n  calendlyUrl\n  managedOffPlatform\n}\n\nfragment RequestInterviewButton_Freelancer on User {\n  rawId\n  firstName\n  timezoneOffset\n  avatarUrl\n}\n\nfragment RequestInterviewButton_Job on Job {\n  rawId\n  status\n}\n\nfragment ResendButton_Contract on Contract {\n  rawId\n  status\n  invitationType\n  freelancerFirstName\n  freelancerEmail\n  job {\n    status\n    id\n  }\n}\n\nfragment ShareLinkButton_Freelancer on User {\n  rawId\n  profile {\n    slug\n    id\n  }\n}\n\nfragment ShareLinkButton_Job on Job {\n  rawId\n}\n\nfragment contract_FilteredOutReason on Contract {\n  requestsStatus\n  clientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  annualCompensation {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  bookmarked\n  projectSubmission {\n    id\n  }\n  freelancer {\n    timezoneOffset\n    video {\n      id\n    }\n    profile {\n      totalExperience\n      freelancerSubtypes {\n        rawId\n        id\n      }\n      id\n    }\n    userSkills {\n      experience\n      skill {\n        rawId\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment contract_getApplicantSource on Contract {\n  applicantSource\n}\n\nfragment contract_getApplicantSourceIcon on Contract {\n  applicantSource\n}\n"
  }
};
})();
(node as any).hash = '6d32a7d35cbdba3088f3bc3005bb94d8';
export default node;

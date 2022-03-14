/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Manage_QueryVariables = {};
export type Manage_QueryResponse = {
    readonly currentUser: {
        readonly firm: {
            readonly " $fragmentRefs": FragmentRefs<"TeamTab_Firm" | "PaymentsTab_Firm">;
        } | null;
        readonly managerContract: {
            readonly allowManageAccess: boolean | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"PaymentsTab_User">;
    } | null;
};
export type Manage_Query = {
    readonly response: Manage_QueryResponse;
    readonly variables: Manage_QueryVariables;
};



/*
query Manage_Query {
  currentUser {
    firm {
      ...TeamTab_Firm
      ...PaymentsTab_Firm
      id
    }
    managerContract {
      allowManageAccess
      id
    }
    ...PaymentsTab_User
    id
  }
}

fragment ContractSettingsDialog_Contract on Contract {
  id
  endDate
  startDate
  currency {
    code
    id
  }
  clientRate {
    currency {
      code
      id
    }
    value
  }
  rateMode
  freelancerRate {
    currency {
      code
      id
    }
    value
  }
  enableTimesheets
  allowManageAccess
  requireTimesheetApprovalForPayments
  purchaseOrderNumber
  isManager
  isFirmAdmin
  client {
    id
    rawId
  }
  bonusPeriod
  bonusClientRate {
    currency {
      code
      id
    }
    value
  }
  ...ContractSettingsForm_Contract
}

fragment ContractSettingsForm_Contract on Contract {
  id
  client {
    self
    id
  }
  freelancer {
    __typename
    id
  }
  firm {
    users {
      id
      rawId
      name
    }
    id
  }
  freelancerFirstName
  freelancerName
  freelancerRate {
    currency {
      code
      id
    }
    value
  }
  rateMode
  isManager
  status
  startDate
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

fragment ManageFiltersPanel_Firm on Firm {
  tags {
    rawId
    name
    id
  }
  jobs(first: 20) {
    edges {
      node {
        id
        rawId
        title
      }
    }
  }
  skills {
    rawId
    name
    id
  }
  ...ManagerFilter_Firm
}

fragment ManageSidebar_Firm on Firm {
  ...ManageFiltersPanel_Firm
}

fragment ManagerFilter_Firm on Firm {
  ...ManagerSelect_Firm
}

fragment ManagerSelect_Firm on Firm {
  users {
    id
    rawId
    name
  }
}

fragment PaymentsTab_Firm on Firm {
  ...ManageSidebar_Firm
}

fragment PaymentsTab_User on User {
  hasInvoiceAccess
  managerContract {
    client {
      name
      id
    }
    isFirmAdmin
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

fragment TeamList_Firm on Firm {
  contracts(first: 5) {
    totalCount
    edges {
      node {
        rawId
        ...TeamMember_Contract
        id
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

fragment TeamMemberActions_Contract on Contract {
  client {
    rawId
    id
  }
  id
  rawId
  status
  paymentMode
  invitationType
  deletable
  freelancer {
    rawId
    firstName
    lastName
    avatarUrl
    lastSeenAt
    directChatThreadId
    id
  }
  ...ContractSettingsDialog_Contract
}

fragment TeamMemberRole_Contract on Contract {
  isManager
  isFirmAdmin
}

fragment TeamMember_Contract on Contract {
  id
  rawId
  paymentsEnabled
  enableTimesheets
  freelancerEmail
  startDate
  endDate
  nextSalaryInvoiceDate
  isManager
  status
  client {
    name
    firm {
      tags {
        rawId
        name
        id
      }
      id
    }
    id
  }
  tags {
    rawId
    name
    id
  }
  ...FreelancerCardHeader_Contract
  ...FreelancerCardChatButton_Contract
  ...FeedbackButton_Contract
  ...FreelancerComment_Contract
  ...FreelancerCardContact_Contract
  ...FreelancerRates_Contract
  ...FreelancerInterviewTimes_Contract
  ...FreelancerCardJob_Contract
  ...TeamMemberActions_Contract
  ...TeamMemberRole_Contract
  freelancer {
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
    id
  }
}

fragment TeamTab_Firm on Firm {
  ...TeamList_Firm
  ...ManageSidebar_Firm
  users {
    id
    rawId
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allowManageAccess",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
  (v2/*: any*/),
  (v5/*: any*/),
  (v3/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Tag",
  "kind": "LinkedField",
  "name": "tags",
  "plural": true,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v8 = {
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
    (v3/*: any*/)
  ],
  "storageKey": null
},
v9 = [
  (v8/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
],
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "clientRate",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "freelancerRate",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "annualCompensation",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "availabilityType",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v15 = [
  (v5/*: any*/),
  (v3/*: any*/)
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFirmAdmin",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "users",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    (v2/*: any*/),
    (v5/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Manage_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "TeamTab_Firm"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PaymentsTab_Firm"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "managerContract",
            "plural": false,
            "selections": [
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PaymentsTab_User"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "Manage_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
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
              {
                "alias": null,
                "args": (v1/*: any*/),
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
                          (v2/*: any*/),
                          (v3/*: any*/),
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
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "client",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Firm",
                                "kind": "LinkedField",
                                "name": "firm",
                                "plural": false,
                                "selections": [
                                  (v7/*: any*/),
                                  (v3/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v3/*: any*/),
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "self",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v7/*: any*/),
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
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v8/*: any*/),
                          (v13/*: any*/),
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
                            "concreteType": "Money",
                            "kind": "LinkedField",
                            "name": "dailyFee",
                            "plural": false,
                            "selections": (v9/*: any*/),
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
                            "kind": "ScalarField",
                            "name": "paymentMode",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "deletable",
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
                              (v2/*: any*/),
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
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "directChatThreadId",
                                "storageKey": null
                              },
                              (v3/*: any*/),
                              (v14/*: any*/),
                              (v4/*: any*/),
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
                                "name": "resumeUrl",
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
                                  (v3/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "FreelancerType",
                                    "kind": "LinkedField",
                                    "name": "freelancerType",
                                    "plural": false,
                                    "selections": (v15/*: any*/),
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
                                  (v10/*: any*/),
                                  (v11/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "jobTypes",
                                    "storageKey": null
                                  },
                                  (v13/*: any*/),
                                  (v12/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "FreelancerSubtype",
                                    "kind": "LinkedField",
                                    "name": "freelancerSubtypes",
                                    "plural": true,
                                    "selections": (v6/*: any*/),
                                    "storageKey": null
                                  }
                                ],
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
                                    "selections": (v6/*: any*/),
                                    "storageKey": null
                                  },
                                  (v3/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v0/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "requireTimesheetApprovalForPayments",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "purchaseOrderNumber",
                            "storageKey": null
                          },
                          (v16/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "bonusPeriod",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Money",
                            "kind": "LinkedField",
                            "name": "bonusClientRate",
                            "plural": false,
                            "selections": (v9/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Firm",
                            "kind": "LinkedField",
                            "name": "firm",
                            "plural": false,
                            "selections": [
                              (v17/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "freelancerName",
                            "storageKey": null
                          },
                          (v14/*: any*/)
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
                "storageKey": "contracts(first:5)"
              },
              {
                "alias": null,
                "args": (v1/*: any*/),
                "filters": [
                  "filters"
                ],
                "handle": "connection",
                "key": "TeamList_contracts",
                "kind": "LinkedHandle",
                "name": "contracts"
              },
              (v3/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 20
                  }
                ],
                "concreteType": "JobConnection",
                "kind": "LinkedField",
                "name": "jobs",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "JobEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Job",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "title",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "jobs(first:20)"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Skill",
                "kind": "LinkedField",
                "name": "skills",
                "plural": true,
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              (v17/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "managerContract",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "client",
                "plural": false,
                "selections": (v15/*: any*/),
                "storageKey": null
              },
              (v16/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasInvoiceAccess",
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2ef92da8db18ede87e32fc0f2489fc80",
    "id": null,
    "metadata": {},
    "name": "Manage_Query",
    "operationKind": "query",
    "text": "query Manage_Query {\n  currentUser {\n    firm {\n      ...TeamTab_Firm\n      ...PaymentsTab_Firm\n      id\n    }\n    managerContract {\n      allowManageAccess\n      id\n    }\n    ...PaymentsTab_User\n    id\n  }\n}\n\nfragment ContractSettingsDialog_Contract on Contract {\n  id\n  endDate\n  startDate\n  currency {\n    code\n    id\n  }\n  clientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  rateMode\n  freelancerRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  enableTimesheets\n  allowManageAccess\n  requireTimesheetApprovalForPayments\n  purchaseOrderNumber\n  isManager\n  isFirmAdmin\n  client {\n    id\n    rawId\n  }\n  bonusPeriod\n  bonusClientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  ...ContractSettingsForm_Contract\n}\n\nfragment ContractSettingsForm_Contract on Contract {\n  id\n  client {\n    self\n    id\n  }\n  freelancer {\n    __typename\n    id\n  }\n  firm {\n    users {\n      id\n      rawId\n      name\n    }\n    id\n  }\n  freelancerFirstName\n  freelancerName\n  freelancerRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  rateMode\n  isManager\n  status\n  startDate\n}\n\nfragment FeedbackButton_Contract on Contract {\n  id\n  rawId\n  status\n  positiveFeedbackCount\n  negativeFeedbackCount\n}\n\nfragment FeedbackButton_Freelancer on User {\n  firstName\n  avatarUrl\n}\n\nfragment FreelancerCardChatButton_Contract on Contract {\n  status\n}\n\nfragment FreelancerCardChatButton_Freelancer on User {\n  rawId\n  status\n  directChatThreadId\n  firstName\n  lastName\n  avatarUrl\n  lastSeenAt\n}\n\nfragment FreelancerCardContact_Contract on Contract {\n  freelancerPhone\n  freelancerContactEmail\n  freelancerFirstName\n}\n\nfragment FreelancerCardHeader_Contract on Contract {\n  freelancerFirstName\n  freelancerLastName\n  ...FreelancerCardStatus_Contract\n}\n\nfragment FreelancerCardHeader_Freelancer on User {\n  firstName\n  lastName\n  status\n  email\n  lastSeenAt\n  resumeUrl\n  avatarUrl\n  profile {\n    slug\n    id\n  }\n  ...FreelancerCardStatus_Freelancer\n}\n\nfragment FreelancerCardIndustryInfo_Freelancer on User {\n  profile {\n    freelancerType {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment FreelancerCardJob_Contract on Contract {\n  status\n}\n\nfragment FreelancerCardLocationInfo_Freelancer on User {\n  profile {\n    city\n    region\n    country\n    fullAddress\n    locationLatitude\n    locationLongitude\n    locationBounds0\n    locationBounds1\n    locationBounds2\n    locationBounds3\n    id\n  }\n}\n\nfragment FreelancerCardSkillsInfo_Freelancer on User {\n  profile {\n    freelancerSubtypes {\n      rawId\n      name\n      id\n    }\n    id\n  }\n  userSkills {\n    experience\n    skill {\n      rawId\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment FreelancerCardStatus_Contract on Contract {\n  status\n  requestsStatus\n  lastInteractionAt\n  invitationType\n}\n\nfragment FreelancerCardStatus_Freelancer on User {\n  status\n  hidden\n  createdAt\n  appliedAt\n}\n\nfragment FreelancerComment_Contract on Contract {\n  freelancerFeedback\n  freelancerMessage\n  status\n  requestsStatus\n}\n\nfragment FreelancerComment_Freelancer on User {\n  firstName\n}\n\nfragment FreelancerInterviewTimes_Contract on Contract {\n  status\n  freelancerTimezoneName\n  freelancerContactEmail\n  interviewSchedulingMethod\n  interviewDate\n  interviewDate1\n  interviewDate2\n  interviewDate3\n}\n\nfragment FreelancerInterviewTimes_Freelancer on User {\n  firstName\n  lastName\n}\n\nfragment FreelancerRates_Contract on Contract {\n  status\n  freelancerFirstName\n  clientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  freelancerRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  annualCompensation {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n  invitationType\n  availabilityType\n  positionTypes\n  rateMode\n  nextSalaryInvoiceDate\n  dailyFee {\n    currency {\n      code\n      id\n    }\n    value\n  }\n}\n\nfragment FreelancerRates_Freelancer on User {\n  firstName\n  profile {\n    clientRate {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    freelancerRate {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    jobTypes\n    availabilityType\n    annualCompensation {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    id\n  }\n}\n\nfragment ManageFiltersPanel_Firm on Firm {\n  tags {\n    rawId\n    name\n    id\n  }\n  jobs(first: 20) {\n    edges {\n      node {\n        id\n        rawId\n        title\n      }\n    }\n  }\n  skills {\n    rawId\n    name\n    id\n  }\n  ...ManagerFilter_Firm\n}\n\nfragment ManageSidebar_Firm on Firm {\n  ...ManageFiltersPanel_Firm\n}\n\nfragment ManagerFilter_Firm on Firm {\n  ...ManagerSelect_Firm\n}\n\nfragment ManagerSelect_Firm on Firm {\n  users {\n    id\n    rawId\n    name\n  }\n}\n\nfragment PaymentsTab_Firm on Firm {\n  ...ManageSidebar_Firm\n}\n\nfragment PaymentsTab_User on User {\n  hasInvoiceAccess\n  managerContract {\n    client {\n      name\n      id\n    }\n    isFirmAdmin\n    id\n  }\n}\n\nfragment ShareLinkButton_Freelancer on User {\n  rawId\n  profile {\n    slug\n    id\n  }\n}\n\nfragment TeamList_Firm on Firm {\n  contracts(first: 5) {\n    totalCount\n    edges {\n      node {\n        rawId\n        ...TeamMember_Contract\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment TeamMemberActions_Contract on Contract {\n  client {\n    rawId\n    id\n  }\n  id\n  rawId\n  status\n  paymentMode\n  invitationType\n  deletable\n  freelancer {\n    rawId\n    firstName\n    lastName\n    avatarUrl\n    lastSeenAt\n    directChatThreadId\n    id\n  }\n  ...ContractSettingsDialog_Contract\n}\n\nfragment TeamMemberRole_Contract on Contract {\n  isManager\n  isFirmAdmin\n}\n\nfragment TeamMember_Contract on Contract {\n  id\n  rawId\n  paymentsEnabled\n  enableTimesheets\n  freelancerEmail\n  startDate\n  endDate\n  nextSalaryInvoiceDate\n  isManager\n  status\n  client {\n    name\n    firm {\n      tags {\n        rawId\n        name\n        id\n      }\n      id\n    }\n    id\n  }\n  tags {\n    rawId\n    name\n    id\n  }\n  ...FreelancerCardHeader_Contract\n  ...FreelancerCardChatButton_Contract\n  ...FeedbackButton_Contract\n  ...FreelancerComment_Contract\n  ...FreelancerCardContact_Contract\n  ...FreelancerRates_Contract\n  ...FreelancerInterviewTimes_Contract\n  ...FreelancerCardJob_Contract\n  ...TeamMemberActions_Contract\n  ...TeamMemberRole_Contract\n  freelancer {\n    ...FreelancerCardHeader_Freelancer\n    ...FreelancerCardIndustryInfo_Freelancer\n    ...FreelancerCardChatButton_Freelancer\n    ...FeedbackButton_Freelancer\n    ...FreelancerComment_Freelancer\n    ...FreelancerCardLocationInfo_Freelancer\n    ...FreelancerRates_Freelancer\n    ...ShareLinkButton_Freelancer\n    ...FreelancerInterviewTimes_Freelancer\n    ...FreelancerCardSkillsInfo_Freelancer\n    id\n  }\n}\n\nfragment TeamTab_Firm on Firm {\n  ...TeamList_Firm\n  ...ManageSidebar_Firm\n  users {\n    id\n    rawId\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd8c34b6f9038f9c72df218540e2df5d4';
export default node;

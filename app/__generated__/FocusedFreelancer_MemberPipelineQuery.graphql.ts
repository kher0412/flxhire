/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FocusedFreelancer_MemberPipelineQueryVariables = {
    freelancerSlug?: string | null;
    hasSlug: boolean;
};
export type FocusedFreelancer_MemberPipelineQueryResponse = {
    readonly freelancer?: {
        readonly " $fragmentRefs": FragmentRefs<"Freelancer_FreelancerMemberPipelineFragment" | "FreelancerActions_FreelancerMemberPipelineActionsFragment">;
    } | null;
};
export type FocusedFreelancer_MemberPipelineQuery = {
    readonly response: FocusedFreelancer_MemberPipelineQueryResponse;
    readonly variables: FocusedFreelancer_MemberPipelineQueryVariables;
};



/*
query FocusedFreelancer_MemberPipelineQuery(
  $freelancerSlug: String
  $hasSlug: Boolean!
) {
  freelancer: user(slug: $freelancerSlug) @include(if: $hasSlug) {
    ...Freelancer_FreelancerMemberPipelineFragment
    ...FreelancerActions_FreelancerMemberPipelineActionsFragment
    id
  }
}

fragment AdminTools_Freelancer on User {
  id
  rawId
  hidden
  status
}

fragment FreelancerActions_FreelancerMemberPipelineActionsFragment on User {
  rawId
  directChatThreadId
  firstName
  lastName
  avatarUrl
  lastSeenAt
  ...AdminTools_Freelancer
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

fragment FreelancerCardSlider_Freelancer on User {
  rawId
  firstName
  video {
    url
    posterUrl
    id
  }
}

fragment FreelancerCardStatus_Freelancer on User {
  status
  hidden
  createdAt
  appliedAt
}

fragment FreelancerContracts_Contracts on User {
  hidden
  profile {
    slug
    id
  }
  freelancerContracts(first: 5) {
    edges {
      node {
        rawId
        id
        hidden
        lastInteractionAt
        status
        previousStatus
        requestsStatus
        applicantSource
        jobApplicationReminderSentAt
        profileJobIncompatibilityReasons
        contractRequests {
          id
        }
        job {
          slug
          title
          id
        }
        client {
          firm {
            name
            slug
            id
          }
          id
        }
        referer {
          name
          id
        }
      }
    }
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

fragment FreelancerReferences_Freelancer on User {
  firstName
  lastName
  references {
    name
    email
    status
    relation
    otherRelation
    comments
    id
  }
}

fragment Freelancer_FreelancerMemberPipelineFragment on User {
  rawId
  firstName
  hidden
  profile {
    slug
    availableAt
    id
  }
  ...FreelancerCardHeader_Freelancer
  ...FreelancerCardLocationInfo_Freelancer
  ...FreelancerCardIndustryInfo_Freelancer
  ...FreelancerRates_Freelancer
  ...ShareLinkButton_Freelancer
  ...FreelancerCardChatButton_Freelancer
  ...FreelancerCardSkillsInfo_Freelancer
  ...FreelancerCardSlider_Freelancer
  ...FreelancerReferences_Freelancer
  ...FreelancerContracts_Contracts
}

fragment ShareLinkButton_Freelancer on User {
  rawId
  profile {
    slug
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "freelancerSlug"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "hasSlug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "freelancerSlug"
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
  "name": "hidden",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = [
  (v6/*: any*/),
  (v5/*: any*/)
],
v8 = [
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
      },
      (v5/*: any*/)
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
v9 = [
  (v2/*: any*/),
  (v6/*: any*/),
  (v5/*: any*/)
],
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
  "name": "email",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FocusedFreelancer_MemberPipelineQuery",
    "selections": [
      {
        "condition": "hasSlug",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": "freelancer",
            "args": (v1/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Freelancer_FreelancerMemberPipelineFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "FreelancerActions_FreelancerMemberPipelineActionsFragment"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FocusedFreelancer_MemberPipelineQuery",
    "selections": [
      {
        "condition": "hasSlug",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": "freelancer",
            "args": (v1/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "availableAt",
                    "storageKey": null
                  },
                  (v5/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FreelancerType",
                    "kind": "LinkedField",
                    "name": "freelancerType",
                    "plural": false,
                    "selections": (v7/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "clientRate",
                    "plural": false,
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "freelancerRate",
                    "plural": false,
                    "selections": (v8/*: any*/),
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
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FreelancerSubtype",
                    "kind": "LinkedField",
                    "name": "freelancerSubtypes",
                    "plural": true,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastName",
                "storageKey": null
              },
              (v10/*: any*/),
              (v11/*: any*/),
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
                "kind": "ScalarField",
                "name": "directChatThreadId",
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
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
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
                    "name": "posterUrl",
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Reference",
                "kind": "LinkedField",
                "name": "references",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  (v11/*: any*/),
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "relation",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "otherRelation",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "comments",
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 5
                  }
                ],
                "concreteType": "ContractConnection",
                "kind": "LinkedField",
                "name": "freelancerContracts",
                "plural": false,
                "selections": [
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
                          (v5/*: any*/),
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lastInteractionAt",
                            "storageKey": null
                          },
                          (v10/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "previousStatus",
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
                            "name": "applicantSource",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "jobApplicationReminderSentAt",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "profileJobIncompatibilityReasons",
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
                              (v5/*: any*/)
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
                              (v4/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "title",
                                "storageKey": null
                              },
                              (v5/*: any*/)
                            ],
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
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Firm",
                                "kind": "LinkedField",
                                "name": "firm",
                                "plural": false,
                                "selections": [
                                  (v6/*: any*/),
                                  (v4/*: any*/),
                                  (v5/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "referer",
                            "plural": false,
                            "selections": (v7/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "freelancerContracts(first:5)"
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "5bd9ec6be628c3d11336a29245c1920e",
    "id": null,
    "metadata": {},
    "name": "FocusedFreelancer_MemberPipelineQuery",
    "operationKind": "query",
    "text": "query FocusedFreelancer_MemberPipelineQuery(\n  $freelancerSlug: String\n  $hasSlug: Boolean!\n) {\n  freelancer: user(slug: $freelancerSlug) @include(if: $hasSlug) {\n    ...Freelancer_FreelancerMemberPipelineFragment\n    ...FreelancerActions_FreelancerMemberPipelineActionsFragment\n    id\n  }\n}\n\nfragment AdminTools_Freelancer on User {\n  id\n  rawId\n  hidden\n  status\n}\n\nfragment FreelancerActions_FreelancerMemberPipelineActionsFragment on User {\n  rawId\n  directChatThreadId\n  firstName\n  lastName\n  avatarUrl\n  lastSeenAt\n  ...AdminTools_Freelancer\n}\n\nfragment FreelancerCardChatButton_Freelancer on User {\n  rawId\n  status\n  directChatThreadId\n  firstName\n  lastName\n  avatarUrl\n  lastSeenAt\n}\n\nfragment FreelancerCardHeader_Freelancer on User {\n  firstName\n  lastName\n  status\n  email\n  lastSeenAt\n  resumeUrl\n  avatarUrl\n  profile {\n    slug\n    id\n  }\n  ...FreelancerCardStatus_Freelancer\n}\n\nfragment FreelancerCardIndustryInfo_Freelancer on User {\n  profile {\n    freelancerType {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment FreelancerCardLocationInfo_Freelancer on User {\n  profile {\n    city\n    region\n    country\n    fullAddress\n    locationLatitude\n    locationLongitude\n    locationBounds0\n    locationBounds1\n    locationBounds2\n    locationBounds3\n    id\n  }\n}\n\nfragment FreelancerCardSkillsInfo_Freelancer on User {\n  profile {\n    freelancerSubtypes {\n      rawId\n      name\n      id\n    }\n    id\n  }\n  userSkills {\n    experience\n    skill {\n      rawId\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment FreelancerCardSlider_Freelancer on User {\n  rawId\n  firstName\n  video {\n    url\n    posterUrl\n    id\n  }\n}\n\nfragment FreelancerCardStatus_Freelancer on User {\n  status\n  hidden\n  createdAt\n  appliedAt\n}\n\nfragment FreelancerContracts_Contracts on User {\n  hidden\n  profile {\n    slug\n    id\n  }\n  freelancerContracts(first: 5) {\n    edges {\n      node {\n        rawId\n        id\n        hidden\n        lastInteractionAt\n        status\n        previousStatus\n        requestsStatus\n        applicantSource\n        jobApplicationReminderSentAt\n        profileJobIncompatibilityReasons\n        contractRequests {\n          id\n        }\n        job {\n          slug\n          title\n          id\n        }\n        client {\n          firm {\n            name\n            slug\n            id\n          }\n          id\n        }\n        referer {\n          name\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment FreelancerRates_Freelancer on User {\n  firstName\n  profile {\n    clientRate {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    freelancerRate {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    jobTypes\n    availabilityType\n    annualCompensation {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    id\n  }\n}\n\nfragment FreelancerReferences_Freelancer on User {\n  firstName\n  lastName\n  references {\n    name\n    email\n    status\n    relation\n    otherRelation\n    comments\n    id\n  }\n}\n\nfragment Freelancer_FreelancerMemberPipelineFragment on User {\n  rawId\n  firstName\n  hidden\n  profile {\n    slug\n    availableAt\n    id\n  }\n  ...FreelancerCardHeader_Freelancer\n  ...FreelancerCardLocationInfo_Freelancer\n  ...FreelancerCardIndustryInfo_Freelancer\n  ...FreelancerRates_Freelancer\n  ...ShareLinkButton_Freelancer\n  ...FreelancerCardChatButton_Freelancer\n  ...FreelancerCardSkillsInfo_Freelancer\n  ...FreelancerCardSlider_Freelancer\n  ...FreelancerReferences_Freelancer\n  ...FreelancerContracts_Contracts\n}\n\nfragment ShareLinkButton_Freelancer on User {\n  rawId\n  profile {\n    slug\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '4be33d8b5e7f3738f03271a6b2491b10';
export default node;

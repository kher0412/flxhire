/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Freelancer_FreelancerPreviewQueryVariables = {
    freelancerId: number;
    contractId?: number | null;
    hasContract: boolean;
};
export type Freelancer_FreelancerPreviewQueryResponse = {
    readonly freelancer: {
        readonly firstName: string | null;
        readonly " $fragmentRefs": FragmentRefs<"FreelancerCardHeader_Freelancer" | "FreelancerCardIndustryInfo_Freelancer" | "FreelancerCardLocationInfo_Freelancer" | "FreelancerCardSkillsInfo_Freelancer" | "FreelancerCardSlider_Freelancer">;
    } | null;
    readonly contract?: {
        readonly rawId: number | null;
        readonly " $fragmentRefs": FragmentRefs<"BookmarkButton_Contract" | "FreelancerCardHeader_Contract" | "FreelancerRates_Contract" | "FreelancerCardSlider_Contract">;
    } | null;
};
export type Freelancer_FreelancerPreviewQuery = {
    readonly response: Freelancer_FreelancerPreviewQueryResponse;
    readonly variables: Freelancer_FreelancerPreviewQueryVariables;
};



/*
query Freelancer_FreelancerPreviewQuery(
  $freelancerId: Int!
  $contractId: Int
  $hasContract: Boolean!
) {
  freelancer: user(rawId: $freelancerId) {
    firstName
    ...FreelancerCardHeader_Freelancer
    ...FreelancerCardIndustryInfo_Freelancer
    ...FreelancerCardLocationInfo_Freelancer
    ...FreelancerCardSkillsInfo_Freelancer
    ...FreelancerCardSlider_Freelancer
    id
  }
  contract(rawId: $contractId) @include(if: $hasContract) {
    rawId
    ...BookmarkButton_Contract
    ...FreelancerCardHeader_Contract
    ...FreelancerRates_Contract
    ...FreelancerCardSlider_Contract
    id
  }
}

fragment BookmarkButton_Contract on Contract {
  id
  bookmarked
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
v3 = [
  {
    "kind": "Variable",
    "name": "rawId",
    "variableName": "freelancerId"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v5 = [
  {
    "kind": "Variable",
    "name": "rawId",
    "variableName": "contractId"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = [
  (v6/*: any*/),
  (v9/*: any*/),
  (v8/*: any*/)
],
v11 = {
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
    (v8/*: any*/)
  ],
  "storageKey": null
},
v12 = [
  (v11/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "Freelancer_FreelancerPreviewQuery",
    "selections": [
      {
        "alias": "freelancer",
        "args": (v3/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v4/*: any*/),
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
            "name": "FreelancerCardLocationInfo_Freelancer"
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
            "args": (v5/*: any*/),
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
            "plural": false,
            "selections": [
              (v6/*: any*/),
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
                "name": "FreelancerRates_Contract"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "FreelancerCardSlider_Contract"
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
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "Freelancer_FreelancerPreviewQuery",
    "selections": [
      {
        "alias": "freelancer",
        "args": (v3/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v4/*: any*/),
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
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "FreelancerType",
                "kind": "LinkedField",
                "name": "freelancerType",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  (v8/*: any*/)
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
              {
                "alias": null,
                "args": null,
                "concreteType": "FreelancerSubtype",
                "kind": "LinkedField",
                "name": "freelancerSubtypes",
                "plural": true,
                "selections": (v10/*: any*/),
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
                "selections": (v10/*: any*/),
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/),
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
              (v8/*: any*/)
            ],
            "storageKey": null
          },
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
            "args": (v5/*: any*/),
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v8/*: any*/),
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
              (v7/*: any*/),
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
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "clientRate",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "freelancerRate",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "annualCompensation",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": null
              },
              (v11/*: any*/),
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
                "selections": (v12/*: any*/),
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
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "requestType",
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
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
    "cacheID": "1b625122f08a79a7ccf292c58b1db544",
    "id": null,
    "metadata": {},
    "name": "Freelancer_FreelancerPreviewQuery",
    "operationKind": "query",
    "text": "query Freelancer_FreelancerPreviewQuery(\n  $freelancerId: Int!\n  $contractId: Int\n  $hasContract: Boolean!\n) {\n  freelancer: user(rawId: $freelancerId) {\n    firstName\n    ...FreelancerCardHeader_Freelancer\n    ...FreelancerCardIndustryInfo_Freelancer\n    ...FreelancerCardLocationInfo_Freelancer\n    ...FreelancerCardSkillsInfo_Freelancer\n    ...FreelancerCardSlider_Freelancer\n    id\n  }\n  contract(rawId: $contractId) @include(if: $hasContract) {\n    rawId\n    ...BookmarkButton_Contract\n    ...FreelancerCardHeader_Contract\n    ...FreelancerRates_Contract\n    ...FreelancerCardSlider_Contract\n    id\n  }\n}\n\nfragment BookmarkButton_Contract on Contract {\n  id\n  bookmarked\n}\n\nfragment FreelancerCardHeader_Contract on Contract {\n  freelancerFirstName\n  freelancerLastName\n  ...FreelancerCardStatus_Contract\n}\n\nfragment FreelancerCardHeader_Freelancer on User {\n  firstName\n  lastName\n  status\n  email\n  lastSeenAt\n  resumeUrl\n  avatarUrl\n  profile {\n    slug\n    id\n  }\n  ...FreelancerCardStatus_Freelancer\n}\n\nfragment FreelancerCardIndustryInfo_Freelancer on User {\n  profile {\n    freelancerType {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment FreelancerCardLocationInfo_Freelancer on User {\n  profile {\n    city\n    region\n    country\n    fullAddress\n    locationLatitude\n    locationLongitude\n    locationBounds0\n    locationBounds1\n    locationBounds2\n    locationBounds3\n    id\n  }\n}\n\nfragment FreelancerCardSkillsInfo_Freelancer on User {\n  profile {\n    freelancerSubtypes {\n      rawId\n      name\n      id\n    }\n    id\n  }\n  userSkills {\n    experience\n    skill {\n      rawId\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment FreelancerCardSlider_Contract on Contract {\n  id\n  rawId\n  status\n  contractRequests {\n    status\n    requestType\n    id\n  }\n}\n\nfragment FreelancerCardSlider_Freelancer on User {\n  rawId\n  firstName\n  video {\n    url\n    posterUrl\n    id\n  }\n}\n\nfragment FreelancerCardStatus_Contract on Contract {\n  status\n  requestsStatus\n  lastInteractionAt\n  invitationType\n}\n\nfragment FreelancerCardStatus_Freelancer on User {\n  status\n  hidden\n  createdAt\n  appliedAt\n}\n\nfragment FreelancerRates_Contract on Contract {\n  status\n  freelancerFirstName\n  clientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  freelancerRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  annualCompensation {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n  invitationType\n  availabilityType\n  positionTypes\n  rateMode\n  nextSalaryInvoiceDate\n  dailyFee {\n    currency {\n      code\n      id\n    }\n    value\n  }\n}\n"
  }
};
})();
(node as any).hash = '99738b0ea81296359ad61a4351cb8188';
export default node;

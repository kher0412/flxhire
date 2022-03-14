/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerRates_TestQueryVariables = {};
export type FreelancerRates_TestQueryResponse = {
    readonly freelancer: {
        readonly " $fragmentRefs": FragmentRefs<"FreelancerRates_Freelancer">;
    } | null;
    readonly contract: {
        readonly " $fragmentRefs": FragmentRefs<"FreelancerRates_Contract">;
    } | null;
};
export type FreelancerRates_TestQuery = {
    readonly response: FreelancerRates_TestQueryResponse;
    readonly variables: FreelancerRates_TestQueryVariables;
};



/*
query FreelancerRates_TestQuery {
  freelancer: node(id: "test-freelancer-id") {
    __typename
    ...FreelancerRates_Freelancer
    id
  }
  contract: node(id: "test-contract-id") {
    __typename
    ...FreelancerRates_Contract
    id
  }
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test-freelancer-id"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test-contract-id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
v5 = [
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "clientRate",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "freelancerRate",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "availabilityType",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "annualCompensation",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Node"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Currency"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FreelancerRates_TestQuery",
    "selections": [
      {
        "alias": "freelancer",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FreelancerRates_Freelancer"
          }
        ],
        "storageKey": "node(id:\"test-freelancer-id\")"
      },
      {
        "alias": "contract",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FreelancerRates_Contract"
          }
        ],
        "storageKey": "node(id:\"test-contract-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FreelancerRates_TestQuery",
    "selections": [
      {
        "alias": "freelancer",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
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
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "jobTypes",
                    "storageKey": null
                  },
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": "node(id:\"test-freelancer-id\")"
      },
      {
        "alias": "contract",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
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
                "name": "freelancerFirstName",
                "storageKey": null
              },
              (v6/*: any*/),
              (v7/*: any*/),
              (v9/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "invitationType",
                "storageKey": null
              },
              (v8/*: any*/),
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
                "selections": (v5/*: any*/),
                "storageKey": null
              }
            ],
            "type": "Contract",
            "abstractKey": null
          }
        ],
        "storageKey": "node(id:\"test-contract-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "4535cda090ee349bedfe4c16675319a2",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "contract": (v10/*: any*/),
        "contract.__typename": (v11/*: any*/),
        "contract.annualCompensation": (v12/*: any*/),
        "contract.annualCompensation.currency": (v13/*: any*/),
        "contract.annualCompensation.currency.code": (v14/*: any*/),
        "contract.annualCompensation.currency.id": (v15/*: any*/),
        "contract.annualCompensation.value": (v16/*: any*/),
        "contract.availabilityType": (v17/*: any*/),
        "contract.clientRate": (v12/*: any*/),
        "contract.clientRate.currency": (v13/*: any*/),
        "contract.clientRate.currency.code": (v14/*: any*/),
        "contract.clientRate.currency.id": (v15/*: any*/),
        "contract.clientRate.value": (v16/*: any*/),
        "contract.currency": (v13/*: any*/),
        "contract.currency.code": (v14/*: any*/),
        "contract.currency.id": (v15/*: any*/),
        "contract.dailyFee": (v12/*: any*/),
        "contract.dailyFee.currency": (v13/*: any*/),
        "contract.dailyFee.currency.code": (v14/*: any*/),
        "contract.dailyFee.currency.id": (v15/*: any*/),
        "contract.dailyFee.value": (v16/*: any*/),
        "contract.freelancerFirstName": (v14/*: any*/),
        "contract.freelancerRate": (v12/*: any*/),
        "contract.freelancerRate.currency": (v13/*: any*/),
        "contract.freelancerRate.currency.code": (v14/*: any*/),
        "contract.freelancerRate.currency.id": (v15/*: any*/),
        "contract.freelancerRate.value": (v16/*: any*/),
        "contract.id": (v15/*: any*/),
        "contract.invitationType": (v14/*: any*/),
        "contract.nextSalaryInvoiceDate": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DateTime"
        },
        "contract.positionTypes": (v17/*: any*/),
        "contract.rateMode": {
          "enumValues": [
            "day",
            "hour",
            "month",
            "year"
          ],
          "nullable": true,
          "plural": false,
          "type": "RateMode"
        },
        "contract.status": {
          "enumValues": [
            "active",
            "deleted",
            "expired",
            "freelancer_not_interested",
            "interview_accepted",
            "interview_rejected",
            "job_application_draft",
            "job_application_invited",
            "job_application_sent",
            "job_viewed",
            "offer_made",
            "offer_rejected",
            "paused",
            "pending",
            "potential",
            "rejected"
          ],
          "nullable": false,
          "plural": false,
          "type": "ContractStatus"
        },
        "freelancer": (v10/*: any*/),
        "freelancer.__typename": (v11/*: any*/),
        "freelancer.firstName": (v14/*: any*/),
        "freelancer.id": (v15/*: any*/),
        "freelancer.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "freelancer.profile.annualCompensation": (v12/*: any*/),
        "freelancer.profile.annualCompensation.currency": (v13/*: any*/),
        "freelancer.profile.annualCompensation.currency.code": (v14/*: any*/),
        "freelancer.profile.annualCompensation.currency.id": (v15/*: any*/),
        "freelancer.profile.annualCompensation.value": (v16/*: any*/),
        "freelancer.profile.availabilityType": (v17/*: any*/),
        "freelancer.profile.clientRate": (v12/*: any*/),
        "freelancer.profile.clientRate.currency": (v13/*: any*/),
        "freelancer.profile.clientRate.currency.code": (v14/*: any*/),
        "freelancer.profile.clientRate.currency.id": (v15/*: any*/),
        "freelancer.profile.clientRate.value": (v16/*: any*/),
        "freelancer.profile.freelancerRate": (v12/*: any*/),
        "freelancer.profile.freelancerRate.currency": (v13/*: any*/),
        "freelancer.profile.freelancerRate.currency.code": (v14/*: any*/),
        "freelancer.profile.freelancerRate.currency.id": (v15/*: any*/),
        "freelancer.profile.freelancerRate.value": (v16/*: any*/),
        "freelancer.profile.id": (v15/*: any*/),
        "freelancer.profile.jobTypes": {
          "enumValues": [
            "freelance",
            "permanent"
          ],
          "nullable": false,
          "plural": true,
          "type": "JobType"
        }
      }
    },
    "name": "FreelancerRates_TestQuery",
    "operationKind": "query",
    "text": "query FreelancerRates_TestQuery {\n  freelancer: node(id: \"test-freelancer-id\") {\n    __typename\n    ...FreelancerRates_Freelancer\n    id\n  }\n  contract: node(id: \"test-contract-id\") {\n    __typename\n    ...FreelancerRates_Contract\n    id\n  }\n}\n\nfragment FreelancerRates_Contract on Contract {\n  status\n  freelancerFirstName\n  clientRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  freelancerRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  annualCompensation {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n  invitationType\n  availabilityType\n  positionTypes\n  rateMode\n  nextSalaryInvoiceDate\n  dailyFee {\n    currency {\n      code\n      id\n    }\n    value\n  }\n}\n\nfragment FreelancerRates_Freelancer on User {\n  firstName\n  profile {\n    clientRate {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    freelancerRate {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    jobTypes\n    availabilityType\n    annualCompensation {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd1a176998c9271faa9fc39df8f997d13';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ContractBonusPeriod = "monthly" | "yearly";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type InvoiceSchedule = "biweekly" | "monthly" | "weekly";
export type RateMode = "day" | "hour" | "month" | "year";
export type MakeOfferInput = {
    annualCompensation?: MoneyInput | null;
    availabilityType: Array<string>;
    bonusClientRate?: MoneyInput | null;
    bonusPeriod?: ContractBonusPeriod | null;
    clientAgreesTerms: boolean;
    clientId: string;
    clientMutationId?: string | null;
    clientRate?: MoneyInput | null;
    currency?: string | null;
    discountCode?: string | null;
    enableTimesheets?: boolean | null;
    endDate?: string | null;
    freelancerId: string;
    invoiceSchedule?: string | null;
    jobId?: string | null;
    offerNote?: string | null;
    paymentMode: string;
    rateMode?: RateMode | null;
    requireTimesheetApprovalForPayments?: boolean | null;
    startDate: string;
};
export type MoneyInput = {
    currencyCode: string;
    value: number;
};
export type InvitationTeamContainer_MakeOfferMutationVariables = {
    input: MakeOfferInput;
};
export type InvitationTeamContainer_MakeOfferMutationResponse = {
    readonly makeOffer: {
        readonly contract: {
            readonly id: string;
            readonly lastInteractionAt: string | null;
            readonly status: ContractStatus;
            readonly clientRate: {
                readonly currency: {
                    readonly code: string | null;
                };
                readonly value: number;
            } | null;
            readonly freelancerRate: {
                readonly currency: {
                    readonly code: string | null;
                };
                readonly value: number;
            } | null;
            readonly currency: {
                readonly code: string | null;
            };
            readonly positionTypes: ReadonlyArray<string> | null;
            readonly availabilityType: ReadonlyArray<string> | null;
            readonly rateMode: RateMode | null;
            readonly paymentMode: string | null;
            readonly enableTimesheets: boolean | null;
            readonly requireTimesheetApprovalForPayments: boolean | null;
            readonly client: {
                readonly name: string | null;
                readonly firm: {
                    readonly invoiceSchedule: InvoiceSchedule | null;
                } | null;
            } | null;
            readonly job: {
                readonly title: string;
            } | null;
            readonly bonusClientRate: {
                readonly currency: {
                    readonly code: string | null;
                };
                readonly value: number;
            } | null;
            readonly bonusPeriod: ContractBonusPeriod | null;
        } | null;
    } | null;
};
export type InvitationTeamContainer_MakeOfferMutation = {
    readonly response: InvitationTeamContainer_MakeOfferMutationResponse;
    readonly variables: InvitationTeamContainer_MakeOfferMutationVariables;
};



/*
mutation InvitationTeamContainer_MakeOfferMutation(
  $input: MakeOfferInput!
) {
  makeOffer(input: $input) {
    contract {
      id
      lastInteractionAt
      status
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
      currency {
        code
        id
      }
      positionTypes
      availabilityType
      rateMode
      paymentMode
      enableTimesheets
      requireTimesheetApprovalForPayments
      client {
        name
        firm {
          invoiceSchedule
          id
        }
        id
      }
      job {
        title
        id
      }
      bonusClientRate {
        currency {
          code
          id
        }
        value
      }
      bonusPeriod
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastInteractionAt",
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
  "name": "code",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    (v5/*: any*/)
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v8 = [
  (v6/*: any*/),
  (v7/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "positionTypes",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "availabilityType",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rateMode",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "paymentMode",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "enableTimesheets",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "requireTimesheetApprovalForPayments",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "invoiceSchedule",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bonusPeriod",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
},
v20 = [
  (v19/*: any*/),
  (v7/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InvitationTeamContainer_MakeOfferMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MakeOfferPayload",
        "kind": "LinkedField",
        "name": "makeOffer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
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
              (v6/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "client",
                "plural": false,
                "selections": [
                  (v15/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Firm",
                    "kind": "LinkedField",
                    "name": "firm",
                    "plural": false,
                    "selections": [
                      (v16/*: any*/)
                    ],
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
                  (v17/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "bonusClientRate",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": null
              },
              (v18/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InvitationTeamContainer_MakeOfferMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MakeOfferPayload",
        "kind": "LinkedField",
        "name": "makeOffer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "clientRate",
                "plural": false,
                "selections": (v20/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "freelancerRate",
                "plural": false,
                "selections": (v20/*: any*/),
                "storageKey": null
              },
              (v19/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "client",
                "plural": false,
                "selections": [
                  (v15/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Firm",
                    "kind": "LinkedField",
                    "name": "firm",
                    "plural": false,
                    "selections": [
                      (v16/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
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
                  (v17/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "bonusClientRate",
                "plural": false,
                "selections": (v20/*: any*/),
                "storageKey": null
              },
              (v18/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3b2d58eee68c315b77a83381def6fb67",
    "id": null,
    "metadata": {},
    "name": "InvitationTeamContainer_MakeOfferMutation",
    "operationKind": "mutation",
    "text": "mutation InvitationTeamContainer_MakeOfferMutation(\n  $input: MakeOfferInput!\n) {\n  makeOffer(input: $input) {\n    contract {\n      id\n      lastInteractionAt\n      status\n      clientRate {\n        currency {\n          code\n          id\n        }\n        value\n      }\n      freelancerRate {\n        currency {\n          code\n          id\n        }\n        value\n      }\n      currency {\n        code\n        id\n      }\n      positionTypes\n      availabilityType\n      rateMode\n      paymentMode\n      enableTimesheets\n      requireTimesheetApprovalForPayments\n      client {\n        name\n        firm {\n          invoiceSchedule\n          id\n        }\n        id\n      }\n      job {\n        title\n        id\n      }\n      bonusClientRate {\n        currency {\n          code\n          id\n        }\n        value\n      }\n      bonusPeriod\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f2f508de01a0607d9f48d738894a9e78';
export default node;

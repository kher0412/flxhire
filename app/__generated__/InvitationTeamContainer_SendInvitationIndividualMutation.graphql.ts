/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ContractBonusPeriod = "monthly" | "yearly";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type InvoiceSchedule = "biweekly" | "monthly" | "weekly";
export type RateMode = "day" | "hour" | "month" | "year";
export type SendInvitationInput = {
    allowHireAccess?: boolean | null;
    allowManageAccess?: boolean | null;
    annualCompensation?: MoneyInput | null;
    bonusClientRate?: MoneyInput | null;
    bonusPeriod?: ContractBonusPeriod | null;
    clientId?: string | null;
    clientMutationId?: string | null;
    clientRate?: MoneyInput | null;
    currency?: string | null;
    endDate?: string | null;
    freelancerEmail: string;
    freelancerFirstName: string;
    freelancerLastName: string;
    invitationMessage?: string | null;
    invoiceSchedule?: string | null;
    isFirmAdmin?: boolean | null;
    jobId?: string | null;
    paymentMode?: string | null;
    rateMode?: RateMode | null;
    startDate: string;
};
export type MoneyInput = {
    currencyCode: string;
    value: number;
};
export type InvitationTeamContainer_SendInvitationIndividualMutationVariables = {
    input: SendInvitationInput;
};
export type InvitationTeamContainer_SendInvitationIndividualMutationResponse = {
    readonly sendInvitation: {
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
            readonly currency: {
                readonly code: string | null;
            };
            readonly positionTypes: ReadonlyArray<string> | null;
            readonly availabilityType: ReadonlyArray<string> | null;
            readonly rateMode: RateMode | null;
            readonly paymentMode: string | null;
            readonly freelancer: {
                readonly firstName: string | null;
                readonly lastName: string | null;
                readonly email: string | null;
            } | null;
            readonly client: {
                readonly id: string;
                readonly name: string | null;
                readonly teamInvitationMessage: string | null;
                readonly firm: {
                    readonly invoiceSchedule: InvoiceSchedule | null;
                } | null;
            } | null;
            readonly job: {
                readonly id: string;
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
export type InvitationTeamContainer_SendInvitationIndividualMutation = {
    readonly response: InvitationTeamContainer_SendInvitationIndividualMutationResponse;
    readonly variables: InvitationTeamContainer_SendInvitationIndividualMutationVariables;
};



/*
mutation InvitationTeamContainer_SendInvitationIndividualMutation(
  $input: SendInvitationInput!
) {
  sendInvitation(input: $input) {
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
      currency {
        code
        id
      }
      positionTypes
      availabilityType
      rateMode
      paymentMode
      freelancer {
        firstName
        lastName
        email
        id
      }
      client {
        id
        name
        teamInvitationMessage
        firm {
          invoiceSchedule
          id
        }
      }
      job {
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
  "name": "firstName",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "teamInvitationMessage",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "invoiceSchedule",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "Job",
  "kind": "LinkedField",
  "name": "job",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bonusPeriod",
  "storageKey": null
},
v21 = {
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
v22 = [
  (v21/*: any*/),
  (v7/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InvitationTeamContainer_SendInvitationIndividualMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendInvitationPayload",
        "kind": "LinkedField",
        "name": "sendInvitation",
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
              (v6/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "freelancer",
                "plural": false,
                "selections": [
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/)
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
                  (v2/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Firm",
                    "kind": "LinkedField",
                    "name": "firm",
                    "plural": false,
                    "selections": [
                      (v18/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v19/*: any*/),
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
              (v20/*: any*/)
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
    "name": "InvitationTeamContainer_SendInvitationIndividualMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendInvitationPayload",
        "kind": "LinkedField",
        "name": "sendInvitation",
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
                "selections": (v22/*: any*/),
                "storageKey": null
              },
              (v21/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "freelancer",
                "plural": false,
                "selections": [
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v2/*: any*/)
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
                  (v2/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Firm",
                    "kind": "LinkedField",
                    "name": "firm",
                    "plural": false,
                    "selections": [
                      (v18/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v19/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "bonusClientRate",
                "plural": false,
                "selections": (v22/*: any*/),
                "storageKey": null
              },
              (v20/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0c17e65e91ddcdca855bb78ddfb226ea",
    "id": null,
    "metadata": {},
    "name": "InvitationTeamContainer_SendInvitationIndividualMutation",
    "operationKind": "mutation",
    "text": "mutation InvitationTeamContainer_SendInvitationIndividualMutation(\n  $input: SendInvitationInput!\n) {\n  sendInvitation(input: $input) {\n    contract {\n      id\n      lastInteractionAt\n      status\n      clientRate {\n        currency {\n          code\n          id\n        }\n        value\n      }\n      currency {\n        code\n        id\n      }\n      positionTypes\n      availabilityType\n      rateMode\n      paymentMode\n      freelancer {\n        firstName\n        lastName\n        email\n        id\n      }\n      client {\n        id\n        name\n        teamInvitationMessage\n        firm {\n          invoiceSchedule\n          id\n        }\n      }\n      job {\n        id\n      }\n      bonusClientRate {\n        currency {\n          code\n          id\n        }\n        value\n      }\n      bonusPeriod\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c939ddeb1654a0d618aef35e3ef8bd89';
export default node;

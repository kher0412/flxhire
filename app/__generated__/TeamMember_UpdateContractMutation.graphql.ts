/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ContractBonusPeriod = "monthly" | "yearly";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type RateMode = "day" | "hour" | "month" | "year";
export type UpdateContractInput = {
    allowHireAccess?: boolean | null;
    allowManageAccess?: boolean | null;
    bonusClientRate?: MoneyInput | null;
    bonusPeriod?: ContractBonusPeriod | null;
    clientId?: string | null;
    clientMutationId?: string | null;
    clientRate?: MoneyInput | null;
    contractId: string;
    currency?: string | null;
    enableTimesheets?: boolean | null;
    endDate?: string | null;
    hidden?: boolean | null;
    inheritorId?: string | null;
    isFirmAdmin?: boolean | null;
    paymentMode?: string | null;
    purchaseOrderNumber?: string | null;
    rateMode?: RateMode | null;
    requireTimesheetApprovalForPayments?: boolean | null;
    startDate?: string | null;
    status?: string | null;
    tags?: Array<string> | null;
};
export type MoneyInput = {
    currencyCode: string;
    value: number;
};
export type TeamMember_UpdateContractMutationVariables = {
    input: UpdateContractInput;
};
export type TeamMember_UpdateContractMutationResponse = {
    readonly updateContract: {
        readonly contract: {
            readonly status: ContractStatus;
            readonly deletable: boolean | null;
            readonly lastInteractionAt: string | null;
            readonly startDate: string | null;
            readonly endDate: string | null;
            readonly tags: ReadonlyArray<{
                readonly name: string | null;
            }> | null;
            readonly client: {
                readonly firm: {
                    readonly tags: ReadonlyArray<{
                        readonly rawId: number;
                        readonly name: string | null;
                    }> | null;
                } | null;
            } | null;
        } | null;
    } | null;
};
export type TeamMember_UpdateContractMutation = {
    readonly response: TeamMember_UpdateContractMutationResponse;
    readonly variables: TeamMember_UpdateContractMutationVariables;
};



/*
mutation TeamMember_UpdateContractMutation(
  $input: UpdateContractInput!
) {
  updateContract(input: $input) {
    contract {
      status
      deletable
      lastInteractionAt
      startDate
      endDate
      tags {
        name
        id
      }
      client {
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
      id
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
  "name": "status",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "deletable",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastInteractionAt",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startDate",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endDate",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TeamMember_UpdateContractMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateContractPayload",
        "kind": "LinkedField",
        "name": "updateContract",
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
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Tag",
                "kind": "LinkedField",
                "name": "tags",
                "plural": true,
                "selections": [
                  (v7/*: any*/)
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tag",
                        "kind": "LinkedField",
                        "name": "tags",
                        "plural": true,
                        "selections": [
                          (v8/*: any*/),
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
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
    "name": "TeamMember_UpdateContractMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateContractPayload",
        "kind": "LinkedField",
        "name": "updateContract",
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
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Tag",
                "kind": "LinkedField",
                "name": "tags",
                "plural": true,
                "selections": [
                  (v7/*: any*/),
                  (v9/*: any*/)
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tag",
                        "kind": "LinkedField",
                        "name": "tags",
                        "plural": true,
                        "selections": [
                          (v8/*: any*/),
                          (v7/*: any*/),
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0a55cf2fc41a9806a8df2785ba50045c",
    "id": null,
    "metadata": {},
    "name": "TeamMember_UpdateContractMutation",
    "operationKind": "mutation",
    "text": "mutation TeamMember_UpdateContractMutation(\n  $input: UpdateContractInput!\n) {\n  updateContract(input: $input) {\n    contract {\n      status\n      deletable\n      lastInteractionAt\n      startDate\n      endDate\n      tags {\n        name\n        id\n      }\n      client {\n        firm {\n          tags {\n            rawId\n            name\n            id\n          }\n          id\n        }\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '4bc692b2fbbba2ee6fc75ad257a1f49a';
export default node;

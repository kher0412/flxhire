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
export type ContractSettingsFormContainer_UpdateContractMutationVariables = {
    input: UpdateContractInput;
};
export type ContractSettingsFormContainer_UpdateContractMutationResponse = {
    readonly updateContract: {
        readonly contract: {
            readonly status: ContractStatus;
            readonly lastInteractionAt: string | null;
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
            readonly enableTimesheets: boolean | null;
            readonly rateMode: RateMode | null;
            readonly isManager: boolean | null;
            readonly isFirmAdmin: boolean | null;
            readonly allowHireAccess: boolean | null;
            readonly allowManageAccess: boolean | null;
            readonly requireTimesheetApprovalForPayments: boolean | null;
            readonly purchaseOrderNumber: string | null;
            readonly client: {
                readonly rawId: number | null;
                readonly name: string | null;
            } | null;
            readonly startDate: string | null;
            readonly endDate: string | null;
            readonly tags: ReadonlyArray<{
                readonly rawId: number;
                readonly name: string | null;
            }> | null;
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
export type ContractSettingsFormContainer_UpdateContractMutation = {
    readonly response: ContractSettingsFormContainer_UpdateContractMutationResponse;
    readonly variables: ContractSettingsFormContainer_UpdateContractMutationVariables;
};



/*
mutation ContractSettingsFormContainer_UpdateContractMutation(
  $input: UpdateContractInput!
) {
  updateContract(input: $input) {
    contract {
      status
      lastInteractionAt
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
      enableTimesheets
      rateMode
      isManager
      isFirmAdmin
      allowHireAccess
      allowManageAccess
      requireTimesheetApprovalForPayments
      purchaseOrderNumber
      client {
        rawId
        name
        id
      }
      startDate
      endDate
      tags {
        rawId
        name
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
  "name": "lastInteractionAt",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    (v4/*: any*/)
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v7 = [
  (v5/*: any*/),
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "enableTimesheets",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rateMode",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isManager",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFirmAdmin",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allowHireAccess",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allowManageAccess",
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
  "name": "purchaseOrderNumber",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v18 = [
  (v16/*: any*/),
  (v17/*: any*/)
],
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startDate",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endDate",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bonusPeriod",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v22/*: any*/)
  ],
  "storageKey": null
},
v24 = [
  (v23/*: any*/),
  (v6/*: any*/)
],
v25 = [
  (v16/*: any*/),
  (v17/*: any*/),
  (v22/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ContractSettingsFormContainer_UpdateContractMutation",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "clientRate",
                "plural": false,
                "selections": (v7/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "freelancerRate",
                "plural": false,
                "selections": (v7/*: any*/),
                "storageKey": null
              },
              (v5/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "client",
                "plural": false,
                "selections": (v18/*: any*/),
                "storageKey": null
              },
              (v19/*: any*/),
              (v20/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Tag",
                "kind": "LinkedField",
                "name": "tags",
                "plural": true,
                "selections": (v18/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "bonusClientRate",
                "plural": false,
                "selections": (v7/*: any*/),
                "storageKey": null
              },
              (v21/*: any*/)
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
    "name": "ContractSettingsFormContainer_UpdateContractMutation",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "clientRate",
                "plural": false,
                "selections": (v24/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "freelancerRate",
                "plural": false,
                "selections": (v24/*: any*/),
                "storageKey": null
              },
              (v23/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "client",
                "plural": false,
                "selections": (v25/*: any*/),
                "storageKey": null
              },
              (v19/*: any*/),
              (v20/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Tag",
                "kind": "LinkedField",
                "name": "tags",
                "plural": true,
                "selections": (v25/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "bonusClientRate",
                "plural": false,
                "selections": (v24/*: any*/),
                "storageKey": null
              },
              (v21/*: any*/),
              (v22/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6e5ff186a9a1bd1421963febc32525be",
    "id": null,
    "metadata": {},
    "name": "ContractSettingsFormContainer_UpdateContractMutation",
    "operationKind": "mutation",
    "text": "mutation ContractSettingsFormContainer_UpdateContractMutation(\n  $input: UpdateContractInput!\n) {\n  updateContract(input: $input) {\n    contract {\n      status\n      lastInteractionAt\n      clientRate {\n        currency {\n          code\n          id\n        }\n        value\n      }\n      freelancerRate {\n        currency {\n          code\n          id\n        }\n        value\n      }\n      currency {\n        code\n        id\n      }\n      enableTimesheets\n      rateMode\n      isManager\n      isFirmAdmin\n      allowHireAccess\n      allowManageAccess\n      requireTimesheetApprovalForPayments\n      purchaseOrderNumber\n      client {\n        rawId\n        name\n        id\n      }\n      startDate\n      endDate\n      tags {\n        rawId\n        name\n        id\n      }\n      bonusClientRate {\n        currency {\n          code\n          id\n        }\n        value\n      }\n      bonusPeriod\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd797c0650efb856e3aed4a660297d4e8';
export default node;

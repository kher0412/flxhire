/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ContractBonusPeriod = "monthly" | "yearly";
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
export type HireManager_UpdateContractMutationVariables = {
    input: UpdateContractInput;
};
export type HireManager_UpdateContractMutationResponse = {
    readonly updateContract: {
        readonly contract: {
            readonly client: {
                readonly id: string;
                readonly name: string | null;
            } | null;
        } | null;
    } | null;
};
export type HireManager_UpdateContractMutation = {
    readonly response: HireManager_UpdateContractMutationResponse;
    readonly variables: HireManager_UpdateContractMutationVariables;
};



/*
mutation HireManager_UpdateContractMutation(
  $input: UpdateContractInput!
) {
  updateContract(input: $input) {
    contract {
      client {
        id
        name
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "client",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HireManager_UpdateContractMutation",
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
              (v3/*: any*/)
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
    "name": "HireManager_UpdateContractMutation",
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
              (v3/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6ced0f1b8a56d7b376415192e134ea86",
    "id": null,
    "metadata": {},
    "name": "HireManager_UpdateContractMutation",
    "operationKind": "mutation",
    "text": "mutation HireManager_UpdateContractMutation(\n  $input: UpdateContractInput!\n) {\n  updateContract(input: $input) {\n    contract {\n      client {\n        id\n        name\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '81844dd36a54c02f8faf153c3b245be4';
export default node;

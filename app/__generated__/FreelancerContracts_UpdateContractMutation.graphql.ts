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
export type FreelancerContracts_UpdateContractMutationVariables = {
    input: UpdateContractInput;
};
export type FreelancerContracts_UpdateContractMutationResponse = {
    readonly updateContract: {
        readonly contract: {
            readonly hidden: boolean | null;
        } | null;
    } | null;
};
export type FreelancerContracts_UpdateContractMutation = {
    readonly response: FreelancerContracts_UpdateContractMutationResponse;
    readonly variables: FreelancerContracts_UpdateContractMutationVariables;
};



/*
mutation FreelancerContracts_UpdateContractMutation(
  $input: UpdateContractInput!
) {
  updateContract(input: $input) {
    contract {
      hidden
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
  "name": "hidden",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FreelancerContracts_UpdateContractMutation",
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
              (v2/*: any*/)
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
    "name": "FreelancerContracts_UpdateContractMutation",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "471dddc35c000fb9995edb54e4bdf71f",
    "id": null,
    "metadata": {},
    "name": "FreelancerContracts_UpdateContractMutation",
    "operationKind": "mutation",
    "text": "mutation FreelancerContracts_UpdateContractMutation(\n  $input: UpdateContractInput!\n) {\n  updateContract(input: $input) {\n    contract {\n      hidden\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '1b0fd67f9fea2fc5bd63479f41cf271e';
export default node;

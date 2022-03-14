/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type ExpireContractInput = {
    clientMutationId?: string | null;
    contractId: string;
    inheritorId?: string | null;
};
export type ManageSagas_ExpireContractMutationVariables = {
    input: ExpireContractInput;
};
export type ManageSagas_ExpireContractMutationResponse = {
    readonly expireContract: {
        readonly contract: {
            readonly lastInteractionAt: string | null;
            readonly status: ContractStatus;
            readonly endDate: string | null;
        } | null;
    } | null;
};
export type ManageSagas_ExpireContractMutation = {
    readonly response: ManageSagas_ExpireContractMutationResponse;
    readonly variables: ManageSagas_ExpireContractMutationVariables;
};



/*
mutation ManageSagas_ExpireContractMutation(
  $input: ExpireContractInput!
) {
  expireContract(input: $input) {
    contract {
      lastInteractionAt
      status
      endDate
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
  "name": "lastInteractionAt",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endDate",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ManageSagas_ExpireContractMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ExpireContractPayload",
        "kind": "LinkedField",
        "name": "expireContract",
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
              (v4/*: any*/)
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
    "name": "ManageSagas_ExpireContractMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ExpireContractPayload",
        "kind": "LinkedField",
        "name": "expireContract",
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
    "cacheID": "d86177bbe4dd9e43030eeacfb398237a",
    "id": null,
    "metadata": {},
    "name": "ManageSagas_ExpireContractMutation",
    "operationKind": "mutation",
    "text": "mutation ManageSagas_ExpireContractMutation(\n  $input: ExpireContractInput!\n) {\n  expireContract(input: $input) {\n    contract {\n      lastInteractionAt\n      status\n      endDate\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'eb8b1854cb75e8712a84a03416a343f0';
export default node;

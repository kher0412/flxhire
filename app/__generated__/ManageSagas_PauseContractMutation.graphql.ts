/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type PauseContractInput = {
    clientMutationId?: string | null;
    contractId: string;
};
export type ManageSagas_PauseContractMutationVariables = {
    input: PauseContractInput;
};
export type ManageSagas_PauseContractMutationResponse = {
    readonly pauseContract: {
        readonly contract: {
            readonly lastInteractionAt: string | null;
            readonly status: ContractStatus;
        } | null;
    } | null;
};
export type ManageSagas_PauseContractMutation = {
    readonly response: ManageSagas_PauseContractMutationResponse;
    readonly variables: ManageSagas_PauseContractMutationVariables;
};



/*
mutation ManageSagas_PauseContractMutation(
  $input: PauseContractInput!
) {
  pauseContract(input: $input) {
    contract {
      lastInteractionAt
      status
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ManageSagas_PauseContractMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PauseContractPayload",
        "kind": "LinkedField",
        "name": "pauseContract",
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
    "name": "ManageSagas_PauseContractMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PauseContractPayload",
        "kind": "LinkedField",
        "name": "pauseContract",
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
    "cacheID": "63be70fc0eaba425c36471f9f33a4f8e",
    "id": null,
    "metadata": {},
    "name": "ManageSagas_PauseContractMutation",
    "operationKind": "mutation",
    "text": "mutation ManageSagas_PauseContractMutation(\n  $input: PauseContractInput!\n) {\n  pauseContract(input: $input) {\n    contract {\n      lastInteractionAt\n      status\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '387553959c7d8753b7ededce5aa8090e';
export default node;

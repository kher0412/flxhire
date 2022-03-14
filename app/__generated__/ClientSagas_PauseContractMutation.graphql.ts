/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type PauseContractInput = {
    clientMutationId?: string | null;
    contractId: string;
};
export type ClientSagas_PauseContractMutationVariables = {
    input: PauseContractInput;
};
export type ClientSagas_PauseContractMutationResponse = {
    readonly pauseContract: {
        readonly contract: {
            readonly lastInteractionAt: string | null;
            readonly status: ContractStatus;
        } | null;
    } | null;
};
export type ClientSagas_PauseContractMutation = {
    readonly response: ClientSagas_PauseContractMutationResponse;
    readonly variables: ClientSagas_PauseContractMutationVariables;
};



/*
mutation ClientSagas_PauseContractMutation(
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
    "name": "ClientSagas_PauseContractMutation",
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
    "name": "ClientSagas_PauseContractMutation",
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
    "cacheID": "4ccaa355ec3f6434ef1c8d16a5e0c098",
    "id": null,
    "metadata": {},
    "name": "ClientSagas_PauseContractMutation",
    "operationKind": "mutation",
    "text": "mutation ClientSagas_PauseContractMutation(\n  $input: PauseContractInput!\n) {\n  pauseContract(input: $input) {\n    contract {\n      lastInteractionAt\n      status\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '456a51403fad48e1438be3c20fe7f9cb';
export default node;

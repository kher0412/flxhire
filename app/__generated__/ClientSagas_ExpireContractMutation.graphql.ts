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
export type ClientSagas_ExpireContractMutationVariables = {
    input: ExpireContractInput;
};
export type ClientSagas_ExpireContractMutationResponse = {
    readonly expireContract: {
        readonly contract: {
            readonly lastInteractionAt: string | null;
            readonly status: ContractStatus;
        } | null;
    } | null;
};
export type ClientSagas_ExpireContractMutation = {
    readonly response: ClientSagas_ExpireContractMutationResponse;
    readonly variables: ClientSagas_ExpireContractMutationVariables;
};



/*
mutation ClientSagas_ExpireContractMutation(
  $input: ExpireContractInput!
) {
  expireContract(input: $input) {
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
    "name": "ClientSagas_ExpireContractMutation",
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
    "name": "ClientSagas_ExpireContractMutation",
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
    "cacheID": "0640ef641f4bb46b1503035124e86a5a",
    "id": null,
    "metadata": {},
    "name": "ClientSagas_ExpireContractMutation",
    "operationKind": "mutation",
    "text": "mutation ClientSagas_ExpireContractMutation(\n  $input: ExpireContractInput!\n) {\n  expireContract(input: $input) {\n    contract {\n      lastInteractionAt\n      status\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7e039899c13946ee610215b8d3ba140e';
export default node;

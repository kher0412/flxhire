/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type ResumeContractInput = {
    clientMutationId?: string | null;
    contractId: string;
};
export type ClientSagas_ResumeContractMutationVariables = {
    input: ResumeContractInput;
};
export type ClientSagas_ResumeContractMutationResponse = {
    readonly resumeContract: {
        readonly contract: {
            readonly lastInteractionAt: string | null;
            readonly status: ContractStatus;
        } | null;
    } | null;
};
export type ClientSagas_ResumeContractMutation = {
    readonly response: ClientSagas_ResumeContractMutationResponse;
    readonly variables: ClientSagas_ResumeContractMutationVariables;
};



/*
mutation ClientSagas_ResumeContractMutation(
  $input: ResumeContractInput!
) {
  resumeContract(input: $input) {
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
    "name": "ClientSagas_ResumeContractMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ResumeContractPayload",
        "kind": "LinkedField",
        "name": "resumeContract",
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
    "name": "ClientSagas_ResumeContractMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ResumeContractPayload",
        "kind": "LinkedField",
        "name": "resumeContract",
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
    "cacheID": "da5bfe5a53c5d89dfac227d4fe89e63b",
    "id": null,
    "metadata": {},
    "name": "ClientSagas_ResumeContractMutation",
    "operationKind": "mutation",
    "text": "mutation ClientSagas_ResumeContractMutation(\n  $input: ResumeContractInput!\n) {\n  resumeContract(input: $input) {\n    contract {\n      lastInteractionAt\n      status\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '4f5c614680dc06ad785579d5bba75a7e';
export default node;

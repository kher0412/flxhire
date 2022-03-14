/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type ResumeContractInput = {
    clientMutationId?: string | null;
    contractId: string;
};
export type ManageSagas_ResumeContractMutationVariables = {
    input: ResumeContractInput;
};
export type ManageSagas_ResumeContractMutationResponse = {
    readonly resumeContract: {
        readonly contract: {
            readonly lastInteractionAt: string | null;
            readonly status: ContractStatus;
        } | null;
    } | null;
};
export type ManageSagas_ResumeContractMutation = {
    readonly response: ManageSagas_ResumeContractMutationResponse;
    readonly variables: ManageSagas_ResumeContractMutationVariables;
};



/*
mutation ManageSagas_ResumeContractMutation(
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
    "name": "ManageSagas_ResumeContractMutation",
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
    "name": "ManageSagas_ResumeContractMutation",
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
    "cacheID": "941386230f49d730e6ed2b6d8eacb60a",
    "id": null,
    "metadata": {},
    "name": "ManageSagas_ResumeContractMutation",
    "operationKind": "mutation",
    "text": "mutation ManageSagas_ResumeContractMutation(\n  $input: ResumeContractInput!\n) {\n  resumeContract(input: $input) {\n    contract {\n      lastInteractionAt\n      status\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '841f0d120378e31a2b5cc052cc04e458';
export default node;

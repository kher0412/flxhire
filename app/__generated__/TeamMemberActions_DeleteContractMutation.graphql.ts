/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type DeleteContractInput = {
    clientMutationId?: string | null;
    contractId?: string | null;
    contractRawId?: number | null;
};
export type TeamMemberActions_DeleteContractMutationVariables = {
    input: DeleteContractInput;
};
export type TeamMemberActions_DeleteContractMutationResponse = {
    readonly deleteContract: {
        readonly contract: {
            readonly status: ContractStatus;
            readonly lastInteractionAt: string | null;
        } | null;
    } | null;
};
export type TeamMemberActions_DeleteContractMutation = {
    readonly response: TeamMemberActions_DeleteContractMutationResponse;
    readonly variables: TeamMemberActions_DeleteContractMutationVariables;
};



/*
mutation TeamMemberActions_DeleteContractMutation(
  $input: DeleteContractInput!
) {
  deleteContract(input: $input) {
    contract {
      status
      lastInteractionAt
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TeamMemberActions_DeleteContractMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteContractPayload",
        "kind": "LinkedField",
        "name": "deleteContract",
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
    "name": "TeamMemberActions_DeleteContractMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteContractPayload",
        "kind": "LinkedField",
        "name": "deleteContract",
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
    "cacheID": "77780ddf1e3f186795a7e17872a2710e",
    "id": null,
    "metadata": {},
    "name": "TeamMemberActions_DeleteContractMutation",
    "operationKind": "mutation",
    "text": "mutation TeamMemberActions_DeleteContractMutation(\n  $input: DeleteContractInput!\n) {\n  deleteContract(input: $input) {\n    contract {\n      status\n      lastInteractionAt\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '4c6b4f71394e5fc8cf8ff170b22026a2';
export default node;

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
export type TeamBulkActions_DeleteContractMutationVariables = {
    input: DeleteContractInput;
};
export type TeamBulkActions_DeleteContractMutationResponse = {
    readonly deleteContract: {
        readonly contract: {
            readonly status: ContractStatus;
            readonly lastInteractionAt: string | null;
            readonly endDate: string | null;
        } | null;
    } | null;
};
export type TeamBulkActions_DeleteContractMutation = {
    readonly response: TeamBulkActions_DeleteContractMutationResponse;
    readonly variables: TeamBulkActions_DeleteContractMutationVariables;
};



/*
mutation TeamBulkActions_DeleteContractMutation(
  $input: DeleteContractInput!
) {
  deleteContract(input: $input) {
    contract {
      status
      lastInteractionAt
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
  "name": "endDate",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TeamBulkActions_DeleteContractMutation",
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
    "name": "TeamBulkActions_DeleteContractMutation",
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
    "cacheID": "ef92ccefd99523ae1a3ac27f4485ccd8",
    "id": null,
    "metadata": {},
    "name": "TeamBulkActions_DeleteContractMutation",
    "operationKind": "mutation",
    "text": "mutation TeamBulkActions_DeleteContractMutation(\n  $input: DeleteContractInput!\n) {\n  deleteContract(input: $input) {\n    contract {\n      status\n      lastInteractionAt\n      endDate\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd1dba8bd734b7ddc24d84815247915cb';
export default node;

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
export type DeleteButton_MutationVariables = {
    input: DeleteContractInput;
    connections: Array<string>;
};
export type DeleteButton_MutationResponse = {
    readonly deleteContract: {
        readonly contract: {
            readonly id: string;
            readonly status: ContractStatus;
        } | null;
    } | null;
};
export type DeleteButton_Mutation = {
    readonly response: DeleteButton_MutationResponse;
    readonly variables: DeleteButton_MutationVariables;
};



/*
mutation DeleteButton_Mutation(
  $input: DeleteContractInput!
) {
  deleteContract(input: $input) {
    contract {
      id
      status
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteButton_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "DeleteButton_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteEdge",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connections"
                  }
                ]
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f21c53f2cbc5647dca17723abce65d10",
    "id": null,
    "metadata": {},
    "name": "DeleteButton_Mutation",
    "operationKind": "mutation",
    "text": "mutation DeleteButton_Mutation(\n  $input: DeleteContractInput!\n) {\n  deleteContract(input: $input) {\n    contract {\n      id\n      status\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7df9c10aee9d6de3b270c81151e28785';
export default node;

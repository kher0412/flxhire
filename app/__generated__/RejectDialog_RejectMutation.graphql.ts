/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type RejectFreelancerInput = {
    clientMutationId?: string | null;
    clientRejectionComments?: string | null;
    clientRejectionMessage?: string | null;
    clientRejectionReason?: string | null;
    contractId: string;
};
export type RejectDialog_RejectMutationVariables = {
    input: RejectFreelancerInput;
};
export type RejectDialog_RejectMutationResponse = {
    readonly rejectFreelancer: {
        readonly contract: {
            readonly status: ContractStatus;
            readonly lastInteractionAt: string | null;
            readonly clientRejectionReason: string | null;
            readonly clientRejectionComments: string | null;
            readonly clientRejectionMessage: string | null;
        } | null;
    } | null;
};
export type RejectDialog_RejectMutation = {
    readonly response: RejectDialog_RejectMutationResponse;
    readonly variables: RejectDialog_RejectMutationVariables;
};



/*
mutation RejectDialog_RejectMutation(
  $input: RejectFreelancerInput!
) {
  rejectFreelancer(input: $input) {
    contract {
      status
      lastInteractionAt
      clientRejectionReason
      clientRejectionComments
      clientRejectionMessage
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
  "name": "clientRejectionReason",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientRejectionComments",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientRejectionMessage",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RejectDialog_RejectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RejectFreelancerPayload",
        "kind": "LinkedField",
        "name": "rejectFreelancer",
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
              (v5/*: any*/),
              (v6/*: any*/)
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
    "name": "RejectDialog_RejectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RejectFreelancerPayload",
        "kind": "LinkedField",
        "name": "rejectFreelancer",
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
              (v5/*: any*/),
              (v6/*: any*/),
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
    "cacheID": "bad2c4a034388242aa01fcde85ccc2b0",
    "id": null,
    "metadata": {},
    "name": "RejectDialog_RejectMutation",
    "operationKind": "mutation",
    "text": "mutation RejectDialog_RejectMutation(\n  $input: RejectFreelancerInput!\n) {\n  rejectFreelancer(input: $input) {\n    contract {\n      status\n      lastInteractionAt\n      clientRejectionReason\n      clientRejectionComments\n      clientRejectionMessage\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '74ec40005fb4eab983d2173e33e4f4f4';
export default node;

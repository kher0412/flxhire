/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type SkipCandidateInput = {
    clientMutationId?: string | null;
    comments?: string | null;
    freelancerId: string;
    jobId: string;
    reason?: string | null;
    system?: boolean | null;
};
export type RejectDialog_SkipMutationVariables = {
    input: SkipCandidateInput;
    connections: Array<string>;
};
export type RejectDialog_SkipMutationResponse = {
    readonly skipCandidate: {
        readonly candidate: {
            readonly id: string;
        };
    } | null;
};
export type RejectDialog_SkipMutation = {
    readonly response: RejectDialog_SkipMutationResponse;
    readonly variables: RejectDialog_SkipMutationVariables;
};



/*
mutation RejectDialog_SkipMutation(
  $input: SkipCandidateInput!
) {
  skipCandidate(input: $input) {
    candidate {
      id
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RejectDialog_SkipMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "SkipCandidatePayload",
        "kind": "LinkedField",
        "name": "skipCandidate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Candidate",
            "kind": "LinkedField",
            "name": "candidate",
            "plural": false,
            "selections": [
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "RejectDialog_SkipMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "SkipCandidatePayload",
        "kind": "LinkedField",
        "name": "skipCandidate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Candidate",
            "kind": "LinkedField",
            "name": "candidate",
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
    "cacheID": "5e43972f9837ee9ecaec964301c97725",
    "id": null,
    "metadata": {},
    "name": "RejectDialog_SkipMutation",
    "operationKind": "mutation",
    "text": "mutation RejectDialog_SkipMutation(\n  $input: SkipCandidateInput!\n) {\n  skipCandidate(input: $input) {\n    candidate {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b88468490a071e03ae14d946999d1dac';
export default node;

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
export type AdminTools_SkipMutationVariables = {
    input: SkipCandidateInput;
};
export type AdminTools_SkipMutationResponse = {
    readonly skipCandidate: {
        readonly candidate: {
            readonly id: string;
        };
    } | null;
};
export type AdminTools_SkipMutation = {
    readonly response: AdminTools_SkipMutationResponse;
    readonly variables: AdminTools_SkipMutationVariables;
};



/*
mutation AdminTools_SkipMutation(
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AdminTools_SkipMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AdminTools_SkipMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "11af23e892a4e0200b93db577e2ec89a",
    "id": null,
    "metadata": {},
    "name": "AdminTools_SkipMutation",
    "operationKind": "mutation",
    "text": "mutation AdminTools_SkipMutation(\n  $input: SkipCandidateInput!\n) {\n  skipCandidate(input: $input) {\n    candidate {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e1715eb5a35cc72e49a2aa344b5b2110';
export default node;

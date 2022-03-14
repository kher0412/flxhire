/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type JobStatus = "closed" | "draft" | "opened";
export type DeleteJobInput = {
    clientMutationId?: string | null;
    id?: number | null;
    slug?: string | null;
};
export type ExistingJobButtonsContainer_DeleteJobMutationVariables = {
    input: DeleteJobInput;
};
export type ExistingJobButtonsContainer_DeleteJobMutationResponse = {
    readonly deleteJob: {
        readonly job: {
            readonly status: JobStatus | null;
        } | null;
    } | null;
};
export type ExistingJobButtonsContainer_DeleteJobMutation = {
    readonly response: ExistingJobButtonsContainer_DeleteJobMutationResponse;
    readonly variables: ExistingJobButtonsContainer_DeleteJobMutationVariables;
};



/*
mutation ExistingJobButtonsContainer_DeleteJobMutation(
  $input: DeleteJobInput!
) {
  deleteJob(input: $input) {
    job {
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
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ExistingJobButtonsContainer_DeleteJobMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteJobPayload",
        "kind": "LinkedField",
        "name": "deleteJob",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Job",
            "kind": "LinkedField",
            "name": "job",
            "plural": false,
            "selections": [
              (v2/*: any*/)
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
    "name": "ExistingJobButtonsContainer_DeleteJobMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteJobPayload",
        "kind": "LinkedField",
        "name": "deleteJob",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Job",
            "kind": "LinkedField",
            "name": "job",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
    "cacheID": "3d42caa2f58cb9afc5eff5029bb2dfe0",
    "id": null,
    "metadata": {},
    "name": "ExistingJobButtonsContainer_DeleteJobMutation",
    "operationKind": "mutation",
    "text": "mutation ExistingJobButtonsContainer_DeleteJobMutation(\n  $input: DeleteJobInput!\n) {\n  deleteJob(input: $input) {\n    job {\n      status\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0ac553b404d527b1a77bfd589cd3e1d6';
export default node;

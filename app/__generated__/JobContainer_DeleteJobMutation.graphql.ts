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
export type JobContainer_DeleteJobMutationVariables = {
    input: DeleteJobInput;
};
export type JobContainer_DeleteJobMutationResponse = {
    readonly deleteJob: {
        readonly job: {
            readonly status: JobStatus | null;
        } | null;
    } | null;
};
export type JobContainer_DeleteJobMutation = {
    readonly response: JobContainer_DeleteJobMutationResponse;
    readonly variables: JobContainer_DeleteJobMutationVariables;
};



/*
mutation JobContainer_DeleteJobMutation(
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
    "name": "JobContainer_DeleteJobMutation",
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
    "name": "JobContainer_DeleteJobMutation",
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
    "cacheID": "fea6c70a6d36dbadb2b3de951290f9cc",
    "id": null,
    "metadata": {},
    "name": "JobContainer_DeleteJobMutation",
    "operationKind": "mutation",
    "text": "mutation JobContainer_DeleteJobMutation(\n  $input: DeleteJobInput!\n) {\n  deleteJob(input: $input) {\n    job {\n      status\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '10b3627032c2bfc6709d160a374021f1';
export default node;

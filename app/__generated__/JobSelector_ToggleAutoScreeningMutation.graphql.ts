/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UpdateJobScreeningInput = {
    allowTextualAnswers?: boolean | null;
    autoSendScreeningRequests?: boolean | null;
    clientMutationId?: string | null;
    project?: ProjectAttributes | null;
    questions?: Array<QuestionAttributes> | null;
    screeningRequestMessageTemplate?: string | null;
    slug: string;
};
export type ProjectAttributes = {
    description?: string | null;
    rawId?: number | null;
    title?: string | null;
};
export type QuestionAttributes = {
    description?: string | null;
    maxDuration?: number | null;
    rawId?: number | null;
    status?: string | null;
    title: string;
};
export type JobSelector_ToggleAutoScreeningMutationVariables = {
    input: UpdateJobScreeningInput;
};
export type JobSelector_ToggleAutoScreeningMutationResponse = {
    readonly updateJobScreening: {
        readonly job: {
            readonly autoSendScreeningRequests: boolean | null;
        } | null;
    } | null;
};
export type JobSelector_ToggleAutoScreeningMutation = {
    readonly response: JobSelector_ToggleAutoScreeningMutationResponse;
    readonly variables: JobSelector_ToggleAutoScreeningMutationVariables;
};



/*
mutation JobSelector_ToggleAutoScreeningMutation(
  $input: UpdateJobScreeningInput!
) {
  updateJobScreening(input: $input) {
    job {
      autoSendScreeningRequests
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
  "name": "autoSendScreeningRequests",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "JobSelector_ToggleAutoScreeningMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateJobScreeningPayload",
        "kind": "LinkedField",
        "name": "updateJobScreening",
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
    "name": "JobSelector_ToggleAutoScreeningMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateJobScreeningPayload",
        "kind": "LinkedField",
        "name": "updateJobScreening",
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
    "cacheID": "4afc7094ebdb46c09b8436c76ec67e82",
    "id": null,
    "metadata": {},
    "name": "JobSelector_ToggleAutoScreeningMutation",
    "operationKind": "mutation",
    "text": "mutation JobSelector_ToggleAutoScreeningMutation(\n  $input: UpdateJobScreeningInput!\n) {\n  updateJobScreening(input: $input) {\n    job {\n      autoSendScreeningRequests\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '58592dcb63918366c447020c9bf26012';
export default node;

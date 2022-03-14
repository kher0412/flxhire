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
export type JobScreeningStep_UpdateJobScreeningMutationVariables = {
    input: UpdateJobScreeningInput;
};
export type JobScreeningStep_UpdateJobScreeningMutationResponse = {
    readonly updateJobScreening: {
        readonly job: {
            readonly autoSendScreeningRequests: boolean | null;
            readonly screeningRequestMessageTemplate: string | null;
            readonly allowTextualAnswers: boolean;
            readonly project: {
                readonly rawId: number;
                readonly title: string | null;
                readonly description: string | null;
            } | null;
            readonly questions: ReadonlyArray<{
                readonly rawId: number;
                readonly title: string | null;
                readonly description: string | null;
                readonly status: string | null;
                readonly answersCount: number | null;
                readonly jobsCount: number | null;
                readonly maxDuration: number | null;
            }> | null;
        } | null;
    } | null;
};
export type JobScreeningStep_UpdateJobScreeningMutation = {
    readonly response: JobScreeningStep_UpdateJobScreeningMutationResponse;
    readonly variables: JobScreeningStep_UpdateJobScreeningMutationVariables;
};



/*
mutation JobScreeningStep_UpdateJobScreeningMutation(
  $input: UpdateJobScreeningInput!
) {
  updateJobScreening(input: $input) {
    job {
      autoSendScreeningRequests
      screeningRequestMessageTemplate
      allowTextualAnswers
      project {
        rawId
        title
        description
        id
      }
      questions {
        rawId
        title
        description
        status
        answersCount
        jobsCount
        maxDuration
        id
      }
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
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "screeningRequestMessageTemplate",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "allowTextualAnswers",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "answersCount",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "jobsCount",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "maxDuration",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "JobScreeningStep_UpdateJobScreeningMutation",
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
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Project",
                "kind": "LinkedField",
                "name": "project",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Question",
                "kind": "LinkedField",
                "name": "questions",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/)
                ],
                "storageKey": null
              }
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
    "name": "JobScreeningStep_UpdateJobScreeningMutation",
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
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Project",
                "kind": "LinkedField",
                "name": "project",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v12/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Question",
                "kind": "LinkedField",
                "name": "questions",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/)
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b9aaf342a4d68e58de9fd69028be70d8",
    "id": null,
    "metadata": {},
    "name": "JobScreeningStep_UpdateJobScreeningMutation",
    "operationKind": "mutation",
    "text": "mutation JobScreeningStep_UpdateJobScreeningMutation(\n  $input: UpdateJobScreeningInput!\n) {\n  updateJobScreening(input: $input) {\n    job {\n      autoSendScreeningRequests\n      screeningRequestMessageTemplate\n      allowTextualAnswers\n      project {\n        rawId\n        title\n        description\n        id\n      }\n      questions {\n        rawId\n        title\n        description\n        status\n        answersCount\n        jobsCount\n        maxDuration\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '22c9f8b01dd70aebdcc89cc6e4c5f29e';
export default node;

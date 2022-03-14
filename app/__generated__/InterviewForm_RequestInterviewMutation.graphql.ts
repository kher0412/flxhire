/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type RequestInterviewInput = {
    calendlyUrl?: string | null;
    clientAgreesTerms: boolean;
    clientId: number;
    clientMutationId?: string | null;
    contractId: string;
    interviewDate1?: string | null;
    interviewDate2?: string | null;
    interviewDate3?: string | null;
    interviewNote?: string | null;
    interviewSchedulingMethod: string;
};
export type InterviewForm_RequestInterviewMutationVariables = {
    input: RequestInterviewInput;
    connections: Array<string>;
};
export type InterviewForm_RequestInterviewMutationResponse = {
    readonly requestInterview: {
        readonly contract: {
            readonly id: string;
            readonly lastInteractionAt: string | null;
            readonly status: ContractStatus;
            readonly interviewDate: string | null;
            readonly interviewDate1: string | null;
            readonly interviewDate2: string | null;
            readonly interviewDate3: string | null;
            readonly calendlyUrl: string | null;
            readonly interviewSchedulingMethod: string | null;
            readonly client: {
                readonly name: string | null;
            } | null;
        } | null;
    } | null;
};
export type InterviewForm_RequestInterviewMutation = {
    readonly response: InterviewForm_RequestInterviewMutationResponse;
    readonly variables: InterviewForm_RequestInterviewMutationVariables;
};



/*
mutation InterviewForm_RequestInterviewMutation(
  $input: RequestInterviewInput!
) {
  requestInterview(input: $input) {
    contract {
      id
      lastInteractionAt
      status
      interviewDate
      interviewDate1
      interviewDate2
      interviewDate3
      calendlyUrl
      interviewSchedulingMethod
      client {
        name
        id
      }
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
  "name": "lastInteractionAt",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "interviewDate",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "interviewDate1",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "interviewDate2",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "interviewDate3",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "calendlyUrl",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "interviewSchedulingMethod",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
    "name": "InterviewForm_RequestInterviewMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RequestInterviewPayload",
        "kind": "LinkedField",
        "name": "requestInterview",
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
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "client",
                "plural": false,
                "selections": [
                  (v12/*: any*/)
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "InterviewForm_RequestInterviewMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RequestInterviewPayload",
        "kind": "LinkedField",
        "name": "requestInterview",
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
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "client",
                "plural": false,
                "selections": [
                  (v12/*: any*/),
                  (v3/*: any*/)
                ],
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
    "cacheID": "f5853aa89b49dfcf84d01a59d09b627b",
    "id": null,
    "metadata": {},
    "name": "InterviewForm_RequestInterviewMutation",
    "operationKind": "mutation",
    "text": "mutation InterviewForm_RequestInterviewMutation(\n  $input: RequestInterviewInput!\n) {\n  requestInterview(input: $input) {\n    contract {\n      id\n      lastInteractionAt\n      status\n      interviewDate\n      interviewDate1\n      interviewDate2\n      interviewDate3\n      calendlyUrl\n      interviewSchedulingMethod\n      client {\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c414da7c034784202979f8436c1255e5';
export default node;

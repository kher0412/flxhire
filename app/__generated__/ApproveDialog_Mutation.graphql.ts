/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type TimesheetStatus = "approved" | "client_query" | "pending" | "rejected" | "submitted" | "void";
export type ApproveTimesheetInput = {
    clientMutationId?: string | null;
    clientRatingFeedbackContinue?: string | null;
    clientRatingFeedbackStart?: string | null;
    clientRatingFeedbackStop?: string | null;
    clientRatingScore?: number | null;
    timesheetId: string;
};
export type ApproveDialog_MutationVariables = {
    input: ApproveTimesheetInput;
};
export type ApproveDialog_MutationResponse = {
    readonly approveTimesheet: {
        readonly timesheet: {
            readonly status: TimesheetStatus | null;
            readonly clientRatingScore: number | null;
            readonly clientRatingFeedbackStart: string | null;
            readonly clientRatingFeedbackStop: string | null;
            readonly clientRatingFeedbackContinue: string | null;
        } | null;
    } | null;
};
export type ApproveDialog_Mutation = {
    readonly response: ApproveDialog_MutationResponse;
    readonly variables: ApproveDialog_MutationVariables;
};



/*
mutation ApproveDialog_Mutation(
  $input: ApproveTimesheetInput!
) {
  approveTimesheet(input: $input) {
    timesheet {
      status
      clientRatingScore
      clientRatingFeedbackStart
      clientRatingFeedbackStop
      clientRatingFeedbackContinue
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
  "name": "clientRatingScore",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientRatingFeedbackStart",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientRatingFeedbackStop",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientRatingFeedbackContinue",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ApproveDialog_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ApproveTimesheetPayload",
        "kind": "LinkedField",
        "name": "approveTimesheet",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Timesheet",
            "kind": "LinkedField",
            "name": "timesheet",
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
    "name": "ApproveDialog_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ApproveTimesheetPayload",
        "kind": "LinkedField",
        "name": "approveTimesheet",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Timesheet",
            "kind": "LinkedField",
            "name": "timesheet",
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
    "cacheID": "5a6f123ad0199f0c55dea01220c03311",
    "id": null,
    "metadata": {},
    "name": "ApproveDialog_Mutation",
    "operationKind": "mutation",
    "text": "mutation ApproveDialog_Mutation(\n  $input: ApproveTimesheetInput!\n) {\n  approveTimesheet(input: $input) {\n    timesheet {\n      status\n      clientRatingScore\n      clientRatingFeedbackStart\n      clientRatingFeedbackStop\n      clientRatingFeedbackContinue\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5308a6011beace1dbc66bc05bf052696';
export default node;

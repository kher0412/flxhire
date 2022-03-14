/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type TimesheetStatus = "approved" | "client_query" | "pending" | "rejected" | "submitted" | "void";
export type RejectTimesheetInput = {
    clientMutationId?: string | null;
    timesheetId: string;
};
export type TimesheetListActions_RejectMutationVariables = {
    input: RejectTimesheetInput;
};
export type TimesheetListActions_RejectMutationResponse = {
    readonly rejectTimesheet: {
        readonly timesheet: {
            readonly status: TimesheetStatus | null;
        } | null;
    } | null;
};
export type TimesheetListActions_RejectMutation = {
    readonly response: TimesheetListActions_RejectMutationResponse;
    readonly variables: TimesheetListActions_RejectMutationVariables;
};



/*
mutation TimesheetListActions_RejectMutation(
  $input: RejectTimesheetInput!
) {
  rejectTimesheet(input: $input) {
    timesheet {
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
    "name": "TimesheetListActions_RejectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RejectTimesheetPayload",
        "kind": "LinkedField",
        "name": "rejectTimesheet",
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
    "name": "TimesheetListActions_RejectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RejectTimesheetPayload",
        "kind": "LinkedField",
        "name": "rejectTimesheet",
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
    "cacheID": "9800f258ba7f2c9cec4b9a7e628ec689",
    "id": null,
    "metadata": {},
    "name": "TimesheetListActions_RejectMutation",
    "operationKind": "mutation",
    "text": "mutation TimesheetListActions_RejectMutation(\n  $input: RejectTimesheetInput!\n) {\n  rejectTimesheet(input: $input) {\n    timesheet {\n      status\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8a6662ab03ad0bfe9d5e66f74546e3ae';
export default node;

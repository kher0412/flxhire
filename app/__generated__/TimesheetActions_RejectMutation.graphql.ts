/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type TimesheetStatus = "approved" | "client_query" | "pending" | "rejected" | "submitted" | "void";
export type RejectTimesheetInput = {
    clientMutationId?: string | null;
    timesheetId: string;
};
export type TimesheetActions_RejectMutationVariables = {
    input: RejectTimesheetInput;
};
export type TimesheetActions_RejectMutationResponse = {
    readonly rejectTimesheet: {
        readonly timesheet: {
            readonly status: TimesheetStatus | null;
        } | null;
    } | null;
};
export type TimesheetActions_RejectMutation = {
    readonly response: TimesheetActions_RejectMutationResponse;
    readonly variables: TimesheetActions_RejectMutationVariables;
};



/*
mutation TimesheetActions_RejectMutation(
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
    "name": "TimesheetActions_RejectMutation",
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
    "name": "TimesheetActions_RejectMutation",
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
    "cacheID": "c630988c7faa75acbc35822a98b3e790",
    "id": null,
    "metadata": {},
    "name": "TimesheetActions_RejectMutation",
    "operationKind": "mutation",
    "text": "mutation TimesheetActions_RejectMutation(\n  $input: RejectTimesheetInput!\n) {\n  rejectTimesheet(input: $input) {\n    timesheet {\n      status\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e2be1205d6a0a6f9d36bbc72078d5572';
export default node;

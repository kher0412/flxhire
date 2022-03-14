/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type TimesheetStatus = "approved" | "client_query" | "pending" | "rejected" | "submitted" | "void";
export type QueryTimesheetInput = {
    clientComments: string;
    clientMutationId?: string | null;
    timesheetId: string;
};
export type QueryDialog_MutationVariables = {
    input: QueryTimesheetInput;
};
export type QueryDialog_MutationResponse = {
    readonly queryTimesheet: {
        readonly timesheet: {
            readonly status: TimesheetStatus | null;
            readonly clientComments: string | null;
        } | null;
    } | null;
};
export type QueryDialog_Mutation = {
    readonly response: QueryDialog_MutationResponse;
    readonly variables: QueryDialog_MutationVariables;
};



/*
mutation QueryDialog_Mutation(
  $input: QueryTimesheetInput!
) {
  queryTimesheet(input: $input) {
    timesheet {
      status
      clientComments
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
  "name": "clientComments",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QueryDialog_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "QueryTimesheetPayload",
        "kind": "LinkedField",
        "name": "queryTimesheet",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QueryDialog_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "QueryTimesheetPayload",
        "kind": "LinkedField",
        "name": "queryTimesheet",
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
    "cacheID": "0d4b07ca175ca34aca12af7528cde0ab",
    "id": null,
    "metadata": {},
    "name": "QueryDialog_Mutation",
    "operationKind": "mutation",
    "text": "mutation QueryDialog_Mutation(\n  $input: QueryTimesheetInput!\n) {\n  queryTimesheet(input: $input) {\n    timesheet {\n      status\n      clientComments\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '54309d462c9071c5873a783459d8713c';
export default node;

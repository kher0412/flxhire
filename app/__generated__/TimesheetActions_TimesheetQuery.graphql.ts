/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type TimesheetActions_TimesheetQueryVariables = {
    rawId?: number | null;
};
export type TimesheetActions_TimesheetQueryResponse = {
    readonly timesheet: {
        readonly id: string;
        readonly freelancer: {
            readonly name: string | null;
        } | null;
    } | null;
};
export type TimesheetActions_TimesheetQuery = {
    readonly response: TimesheetActions_TimesheetQueryResponse;
    readonly variables: TimesheetActions_TimesheetQueryVariables;
};



/*
query TimesheetActions_TimesheetQuery(
  $rawId: Int
) {
  timesheet(rawId: $rawId) {
    id
    freelancer {
      name
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
    "name": "rawId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "rawId",
    "variableName": "rawId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TimesheetActions_TimesheetQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Timesheet",
        "kind": "LinkedField",
        "name": "timesheet",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "freelancer",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TimesheetActions_TimesheetQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Timesheet",
        "kind": "LinkedField",
        "name": "timesheet",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "freelancer",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cb2cd08b142761fe2ece2aa4ad6ff5af",
    "id": null,
    "metadata": {},
    "name": "TimesheetActions_TimesheetQuery",
    "operationKind": "query",
    "text": "query TimesheetActions_TimesheetQuery(\n  $rawId: Int\n) {\n  timesheet(rawId: $rawId) {\n    id\n    freelancer {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd2790acdf00f92da227b1be6edc5a228';
export default node;

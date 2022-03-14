/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ApproveDialog_TimesheetQueryVariables = {
    rawId?: number | null;
};
export type ApproveDialog_TimesheetQueryResponse = {
    readonly timesheet: {
        readonly id: string;
        readonly freelancer: {
            readonly name: string | null;
        } | null;
    } | null;
};
export type ApproveDialog_TimesheetQuery = {
    readonly response: ApproveDialog_TimesheetQueryResponse;
    readonly variables: ApproveDialog_TimesheetQueryVariables;
};



/*
query ApproveDialog_TimesheetQuery(
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
    "name": "ApproveDialog_TimesheetQuery",
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
    "name": "ApproveDialog_TimesheetQuery",
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
    "cacheID": "9cd896949be125f0c0d8959a165baf07",
    "id": null,
    "metadata": {},
    "name": "ApproveDialog_TimesheetQuery",
    "operationKind": "query",
    "text": "query ApproveDialog_TimesheetQuery(\n  $rawId: Int\n) {\n  timesheet(rawId: $rawId) {\n    id\n    freelancer {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a7c1f08181834e380d76a9e927cebb2e';
export default node;

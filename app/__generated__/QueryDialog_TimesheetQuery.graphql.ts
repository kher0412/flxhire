/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type QueryDialog_TimesheetQueryVariables = {
    rawId?: number | null;
};
export type QueryDialog_TimesheetQueryResponse = {
    readonly timesheet: {
        readonly id: string;
        readonly freelancer: {
            readonly name: string | null;
        } | null;
    } | null;
};
export type QueryDialog_TimesheetQuery = {
    readonly response: QueryDialog_TimesheetQueryResponse;
    readonly variables: QueryDialog_TimesheetQueryVariables;
};



/*
query QueryDialog_TimesheetQuery(
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
    "name": "QueryDialog_TimesheetQuery",
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
    "name": "QueryDialog_TimesheetQuery",
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
    "cacheID": "2c21e4b32b0a430d55af63b0b6ebee90",
    "id": null,
    "metadata": {},
    "name": "QueryDialog_TimesheetQuery",
    "operationKind": "query",
    "text": "query QueryDialog_TimesheetQuery(\n  $rawId: Int\n) {\n  timesheet(rawId: $rawId) {\n    id\n    freelancer {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f1cc7397f7ed491ca9e67eb57bfd609a';
export default node;

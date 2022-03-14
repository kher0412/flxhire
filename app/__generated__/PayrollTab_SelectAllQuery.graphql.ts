/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type PayrollItemStatus = "failed" | "paid" | "pending" | "processing" | "waiting";
export type PayrollItemType = "bonus" | "expense" | "salary" | "timesheet";
export type PayrollItemsFilters = {
    clientId?: string | null;
    invoiceNum?: number | null;
    name?: string | null;
    status?: PayrollItemStatus | null;
    type?: PayrollItemType | null;
};
export type PayrollTab_SelectAllQueryVariables = {
    filters?: PayrollItemsFilters | null;
};
export type PayrollTab_SelectAllQueryResponse = {
    readonly currentUser: {
        readonly firm: {
            readonly payrollItems: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly id: string;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
};
export type PayrollTab_SelectAllQuery = {
    readonly response: PayrollTab_SelectAllQueryResponse;
    readonly variables: PayrollTab_SelectAllQueryVariables;
};



/*
query PayrollTab_SelectAllQuery(
  $filters: PayrollItemsFilters
) {
  currentUser {
    firm {
      payrollItems(filters: $filters) {
        edges {
          node {
            id
          }
        }
      }
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filters"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "filters",
      "variableName": "filters"
    }
  ],
  "concreteType": "PayrollItemConnection",
  "kind": "LinkedField",
  "name": "payrollItems",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PayrollItemEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PayrollItem",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PayrollTab_SelectAllQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Firm",
            "kind": "LinkedField",
            "name": "firm",
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PayrollTab_SelectAllQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Firm",
            "kind": "LinkedField",
            "name": "firm",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c17526c70e8a678d4a35e4b8aa0ed631",
    "id": null,
    "metadata": {},
    "name": "PayrollTab_SelectAllQuery",
    "operationKind": "query",
    "text": "query PayrollTab_SelectAllQuery(\n  $filters: PayrollItemsFilters\n) {\n  currentUser {\n    firm {\n      payrollItems(filters: $filters) {\n        edges {\n          node {\n            id\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '6645b85bdf457e1c6fc3496addfb70f4';
export default node;

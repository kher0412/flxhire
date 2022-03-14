/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PayrollAutoInvoiceDialogTest_QueryVariables = {};
export type PayrollAutoInvoiceDialogTest_QueryResponse = {
    readonly currentUser: {
        readonly firm: {
            readonly " $fragmentRefs": FragmentRefs<"PayrollAutoInvoiceDialog_Firm">;
        } | null;
    } | null;
};
export type PayrollAutoInvoiceDialogTest_Query = {
    readonly response: PayrollAutoInvoiceDialogTest_QueryResponse;
    readonly variables: PayrollAutoInvoiceDialogTest_QueryVariables;
};



/*
query PayrollAutoInvoiceDialogTest_Query {
  currentUser {
    firm {
      ...PayrollAutoInvoiceDialog_Firm
      id
    }
    id
  }
}

fragment PayrollAutoInvoiceDialog_Firm on Firm {
  invoiceSchedule
  nextAutoInvoiceDate
  invoiceSalariesInAdvance
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PayrollAutoInvoiceDialogTest_Query",
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PayrollAutoInvoiceDialog_Firm"
              }
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PayrollAutoInvoiceDialogTest_Query",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "invoiceSchedule",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "nextAutoInvoiceDate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "invoiceSalariesInAdvance",
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6712f2e30cb9df54eabe5ff08697b67b",
    "id": null,
    "metadata": {},
    "name": "PayrollAutoInvoiceDialogTest_Query",
    "operationKind": "query",
    "text": "query PayrollAutoInvoiceDialogTest_Query {\n  currentUser {\n    firm {\n      ...PayrollAutoInvoiceDialog_Firm\n      id\n    }\n    id\n  }\n}\n\nfragment PayrollAutoInvoiceDialog_Firm on Firm {\n  invoiceSchedule\n  nextAutoInvoiceDate\n  invoiceSalariesInAdvance\n}\n"
  }
};
})();
(node as any).hash = '4d0da499de005c85555badb8977d3ddf';
export default node;

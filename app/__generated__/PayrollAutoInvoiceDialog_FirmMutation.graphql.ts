/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type InvoiceSchedule = "biweekly" | "monthly" | "weekly";
export type UpdateFirmInput = {
    additionalInvoiceText?: string | null;
    allowInvoiceAutoCharge?: boolean | null;
    backgroundTheme?: string | null;
    billingPlanId?: string | null;
    clientMutationId?: string | null;
    currency?: string | null;
    defaultPaymentMethodId?: string | null;
    description?: string | null;
    firmId?: string | null;
    greenhouseApiKey?: string | null;
    invoiceSalariesInAdvance?: boolean | null;
    invoiceSchedule?: string | null;
    logoUrl?: string | null;
    managerForNonPayrollFees?: string | null;
    name?: string | null;
    nextAutoInvoiceDate?: string | null;
    purchaseOrderNumberForNonPayrollFees?: string | null;
    unifyInvoicesInPreferredCurrency?: boolean | null;
    website?: string | null;
};
export type PayrollAutoInvoiceDialog_FirmMutationVariables = {
    input: UpdateFirmInput;
};
export type PayrollAutoInvoiceDialog_FirmMutationResponse = {
    readonly updateFirm: {
        readonly firm: {
            readonly invoiceSchedule: InvoiceSchedule | null;
            readonly nextAutoInvoiceDate: string | null;
            readonly invoiceSalariesInAdvance: boolean | null;
        } | null;
    } | null;
};
export type PayrollAutoInvoiceDialog_FirmMutation = {
    readonly response: PayrollAutoInvoiceDialog_FirmMutationResponse;
    readonly variables: PayrollAutoInvoiceDialog_FirmMutationVariables;
};



/*
mutation PayrollAutoInvoiceDialog_FirmMutation(
  $input: UpdateFirmInput!
) {
  updateFirm(input: $input) {
    firm {
      invoiceSchedule
      nextAutoInvoiceDate
      invoiceSalariesInAdvance
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
  "name": "invoiceSchedule",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nextAutoInvoiceDate",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "invoiceSalariesInAdvance",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PayrollAutoInvoiceDialog_FirmMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateFirmPayload",
        "kind": "LinkedField",
        "name": "updateFirm",
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
              (v3/*: any*/),
              (v4/*: any*/)
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
    "name": "PayrollAutoInvoiceDialog_FirmMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateFirmPayload",
        "kind": "LinkedField",
        "name": "updateFirm",
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
              (v3/*: any*/),
              (v4/*: any*/),
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
    "cacheID": "865c26230655cf465620be340c2bd520",
    "id": null,
    "metadata": {},
    "name": "PayrollAutoInvoiceDialog_FirmMutation",
    "operationKind": "mutation",
    "text": "mutation PayrollAutoInvoiceDialog_FirmMutation(\n  $input: UpdateFirmInput!\n) {\n  updateFirm(input: $input) {\n    firm {\n      invoiceSchedule\n      nextAutoInvoiceDate\n      invoiceSalariesInAdvance\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '077735284add1707af2a99387260fcb1';
export default node;

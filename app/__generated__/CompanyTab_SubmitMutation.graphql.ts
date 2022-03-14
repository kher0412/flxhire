/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

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
export type CompanyTab_SubmitMutationVariables = {
    input: UpdateFirmInput;
};
export type CompanyTab_SubmitMutationResponse = {
    readonly updateFirm: {
        readonly firm: {
            readonly logoUrl: string | null;
            readonly name: string | null;
            readonly website: string | null;
            readonly description: string | null;
            readonly backgroundTheme: string | null;
        } | null;
    } | null;
};
export type CompanyTab_SubmitMutation = {
    readonly response: CompanyTab_SubmitMutationResponse;
    readonly variables: CompanyTab_SubmitMutationVariables;
};



/*
mutation CompanyTab_SubmitMutation(
  $input: UpdateFirmInput!
) {
  updateFirm(input: $input) {
    firm {
      logoUrl
      name
      website
      description
      backgroundTheme
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
  "name": "logoUrl",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "website",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "backgroundTheme",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CompanyTab_SubmitMutation",
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
    "name": "CompanyTab_SubmitMutation",
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
    "cacheID": "5833b2275fa49dbe09f8983db1f33094",
    "id": null,
    "metadata": {},
    "name": "CompanyTab_SubmitMutation",
    "operationKind": "mutation",
    "text": "mutation CompanyTab_SubmitMutation(\n  $input: UpdateFirmInput!\n) {\n  updateFirm(input: $input) {\n    firm {\n      logoUrl\n      name\n      website\n      description\n      backgroundTheme\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a4f6f0d644a0dab70a5e2af7cf285333';
export default node;

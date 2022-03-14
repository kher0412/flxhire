/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
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
export type PayingUs_UpdateFirmMutationVariables = {
    input: UpdateFirmInput;
};
export type PayingUs_UpdateFirmMutationResponse = {
    readonly updateFirm: {
        readonly firm: {
            readonly " $fragmentRefs": FragmentRefs<"PayingUs_Firm">;
        } | null;
    } | null;
};
export type PayingUs_UpdateFirmMutation = {
    readonly response: PayingUs_UpdateFirmMutationResponse;
    readonly variables: PayingUs_UpdateFirmMutationVariables;
};



/*
mutation PayingUs_UpdateFirmMutation(
  $input: UpdateFirmInput!
) {
  updateFirm(input: $input) {
    firm {
      ...PayingUs_Firm
      id
    }
  }
}

fragment PayingUs_Firm on Firm {
  id
  paymentMethods {
    id
    ...PaymentMethod_PaymentMethod
  }
}

fragment PaymentMethodIcon_PaymentMethod on PaymentMethod {
  paymentMethodType
}

fragment PaymentMethodSubheader_PaymentMethod on PaymentMethod {
  paymentMethodType
  expMonth
  expYear
  cardholderName
  institutionName
  currency {
    code
    id
  }
  amountAvailable {
    currency {
      code
      id
    }
    value
  }
}

fragment PaymentMethodTitle_PaymentMethod on PaymentMethod {
  paymentMethodType
  mask
  name
}

fragment PaymentMethod_PaymentMethod on PaymentMethod {
  default
  paymentMethodType
  ...PaymentMethodTitle_PaymentMethod
  ...PaymentMethodSubheader_PaymentMethod
  ...PaymentMethodIcon_PaymentMethod
  ...WireTransferDialog_PaymentMethod
}

fragment WireTransferDialog_PaymentMethod on PaymentMethod {
  institutionName
  achAccountNumber
  achRoutingNumber
  swiftCode
  amountAvailable {
    currency {
      code
      id
    }
    value
  }
  currency {
    code
    id
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    },
    (v2/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PayingUs_UpdateFirmMutation",
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PayingUs_Firm"
              }
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
    "name": "PayingUs_UpdateFirmMutation",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "PaymentMethod",
                "kind": "LinkedField",
                "name": "paymentMethods",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "default",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "paymentMethodType",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "mask",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "expMonth",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "expYear",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cardholderName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "institutionName",
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "amountAvailable",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "value",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "achAccountNumber",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "achRoutingNumber",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "swiftCode",
                    "storageKey": null
                  }
                ],
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
    "cacheID": "f00a6aad3336f0f06a2d6cb75c2c31d1",
    "id": null,
    "metadata": {},
    "name": "PayingUs_UpdateFirmMutation",
    "operationKind": "mutation",
    "text": "mutation PayingUs_UpdateFirmMutation(\n  $input: UpdateFirmInput!\n) {\n  updateFirm(input: $input) {\n    firm {\n      ...PayingUs_Firm\n      id\n    }\n  }\n}\n\nfragment PayingUs_Firm on Firm {\n  id\n  paymentMethods {\n    id\n    ...PaymentMethod_PaymentMethod\n  }\n}\n\nfragment PaymentMethodIcon_PaymentMethod on PaymentMethod {\n  paymentMethodType\n}\n\nfragment PaymentMethodSubheader_PaymentMethod on PaymentMethod {\n  paymentMethodType\n  expMonth\n  expYear\n  cardholderName\n  institutionName\n  currency {\n    code\n    id\n  }\n  amountAvailable {\n    currency {\n      code\n      id\n    }\n    value\n  }\n}\n\nfragment PaymentMethodTitle_PaymentMethod on PaymentMethod {\n  paymentMethodType\n  mask\n  name\n}\n\nfragment PaymentMethod_PaymentMethod on PaymentMethod {\n  default\n  paymentMethodType\n  ...PaymentMethodTitle_PaymentMethod\n  ...PaymentMethodSubheader_PaymentMethod\n  ...PaymentMethodIcon_PaymentMethod\n  ...WireTransferDialog_PaymentMethod\n}\n\nfragment WireTransferDialog_PaymentMethod on PaymentMethod {\n  institutionName\n  achAccountNumber\n  achRoutingNumber\n  swiftCode\n  amountAvailable {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fc4b8b236cf8ca647001b1d797379e53';
export default node;

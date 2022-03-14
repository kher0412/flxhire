/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type DeletePaymentMethodInput = {
    clientMutationId?: string | null;
    id: string;
};
export type PayingUs_DeletePaymentMethodMutationVariables = {
    input: DeletePaymentMethodInput;
};
export type PayingUs_DeletePaymentMethodMutationResponse = {
    readonly deletePaymentMethod: {
        readonly paymentMethod: {
            readonly user: {
                readonly firm: {
                    readonly " $fragmentRefs": FragmentRefs<"PayingUs_Firm">;
                } | null;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"PaymentMethod_PaymentMethod">;
        } | null;
    } | null;
};
export type PayingUs_DeletePaymentMethodMutation = {
    readonly response: PayingUs_DeletePaymentMethodMutationResponse;
    readonly variables: PayingUs_DeletePaymentMethodMutationVariables;
};



/*
mutation PayingUs_DeletePaymentMethodMutation(
  $input: DeletePaymentMethodInput!
) {
  deletePaymentMethod(input: $input) {
    paymentMethod {
      ...PaymentMethod_PaymentMethod
      user {
        firm {
          ...PayingUs_Firm
          id
        }
        id
      }
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
  "name": "default",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "paymentMethodType",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mask",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expMonth",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expYear",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cardholderName",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "institutionName",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = {
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
    (v10/*: any*/)
  ],
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "amountAvailable",
  "plural": false,
  "selections": [
    (v11/*: any*/),
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
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "achAccountNumber",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "achRoutingNumber",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "swiftCode",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PayingUs_DeletePaymentMethodMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeletePaymentMethodPayload",
        "kind": "LinkedField",
        "name": "deletePaymentMethod",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PaymentMethod",
            "kind": "LinkedField",
            "name": "paymentMethod",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
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
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PaymentMethod_PaymentMethod"
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
    "name": "PayingUs_DeletePaymentMethodMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeletePaymentMethodPayload",
        "kind": "LinkedField",
        "name": "deletePaymentMethod",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PaymentMethod",
            "kind": "LinkedField",
            "name": "paymentMethod",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
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
                      (v10/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PaymentMethod",
                        "kind": "LinkedField",
                        "name": "paymentMethods",
                        "plural": true,
                        "selections": [
                          (v10/*: any*/),
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v15/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              (v10/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c77475311b4c97f8bbba6f34c84c85b6",
    "id": null,
    "metadata": {},
    "name": "PayingUs_DeletePaymentMethodMutation",
    "operationKind": "mutation",
    "text": "mutation PayingUs_DeletePaymentMethodMutation(\n  $input: DeletePaymentMethodInput!\n) {\n  deletePaymentMethod(input: $input) {\n    paymentMethod {\n      ...PaymentMethod_PaymentMethod\n      user {\n        firm {\n          ...PayingUs_Firm\n          id\n        }\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment PayingUs_Firm on Firm {\n  id\n  paymentMethods {\n    id\n    ...PaymentMethod_PaymentMethod\n  }\n}\n\nfragment PaymentMethodIcon_PaymentMethod on PaymentMethod {\n  paymentMethodType\n}\n\nfragment PaymentMethodSubheader_PaymentMethod on PaymentMethod {\n  paymentMethodType\n  expMonth\n  expYear\n  cardholderName\n  institutionName\n  currency {\n    code\n    id\n  }\n  amountAvailable {\n    currency {\n      code\n      id\n    }\n    value\n  }\n}\n\nfragment PaymentMethodTitle_PaymentMethod on PaymentMethod {\n  paymentMethodType\n  mask\n  name\n}\n\nfragment PaymentMethod_PaymentMethod on PaymentMethod {\n  default\n  paymentMethodType\n  ...PaymentMethodTitle_PaymentMethod\n  ...PaymentMethodSubheader_PaymentMethod\n  ...PaymentMethodIcon_PaymentMethod\n  ...WireTransferDialog_PaymentMethod\n}\n\nfragment WireTransferDialog_PaymentMethod on PaymentMethod {\n  institutionName\n  achAccountNumber\n  achRoutingNumber\n  swiftCode\n  amountAvailable {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '4930f24d0b0d0139b69dfebd2a6a9132';
export default node;

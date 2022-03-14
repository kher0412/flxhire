/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PayingUsContainer_QueryVariables = {};
export type PayingUsContainer_QueryResponse = {
    readonly currentUser: {
        readonly firm: {
            readonly " $fragmentRefs": FragmentRefs<"PayingUs_Firm">;
        } | null;
    } | null;
};
export type PayingUsContainer_Query = {
    readonly response: PayingUsContainer_QueryResponse;
    readonly variables: PayingUsContainer_QueryVariables;
};



/*
query PayingUsContainer_Query {
  currentUser {
    firm {
      ...PayingUs_Firm
      id
    }
    id
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
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
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
    (v0/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PayingUsContainer_Query",
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
                "name": "PayingUs_Firm"
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
    "name": "PayingUsContainer_Query",
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
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PaymentMethod",
                "kind": "LinkedField",
                "name": "paymentMethods",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
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
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "amountAvailable",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
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
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "009a904ab6b2dfea9a6fa4b5ae3db54d",
    "id": null,
    "metadata": {},
    "name": "PayingUsContainer_Query",
    "operationKind": "query",
    "text": "query PayingUsContainer_Query {\n  currentUser {\n    firm {\n      ...PayingUs_Firm\n      id\n    }\n    id\n  }\n}\n\nfragment PayingUs_Firm on Firm {\n  id\n  paymentMethods {\n    id\n    ...PaymentMethod_PaymentMethod\n  }\n}\n\nfragment PaymentMethodIcon_PaymentMethod on PaymentMethod {\n  paymentMethodType\n}\n\nfragment PaymentMethodSubheader_PaymentMethod on PaymentMethod {\n  paymentMethodType\n  expMonth\n  expYear\n  cardholderName\n  institutionName\n  currency {\n    code\n    id\n  }\n  amountAvailable {\n    currency {\n      code\n      id\n    }\n    value\n  }\n}\n\nfragment PaymentMethodTitle_PaymentMethod on PaymentMethod {\n  paymentMethodType\n  mask\n  name\n}\n\nfragment PaymentMethod_PaymentMethod on PaymentMethod {\n  default\n  paymentMethodType\n  ...PaymentMethodTitle_PaymentMethod\n  ...PaymentMethodSubheader_PaymentMethod\n  ...PaymentMethodIcon_PaymentMethod\n  ...WireTransferDialog_PaymentMethod\n}\n\nfragment WireTransferDialog_PaymentMethod on PaymentMethod {\n  institutionName\n  achAccountNumber\n  achRoutingNumber\n  swiftCode\n  amountAvailable {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  currency {\n    code\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'cae8cf461b0924db204106211044da23';
export default node;

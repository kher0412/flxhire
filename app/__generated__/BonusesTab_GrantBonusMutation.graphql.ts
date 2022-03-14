/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type GrantBonusInput = {
    autoApprove?: boolean | null;
    clientAmount: MoneyInput;
    clientMutationId?: string | null;
    contractId: string;
    endDate?: string | null;
    startDate?: string | null;
};
export type MoneyInput = {
    currencyCode: string;
    value: number;
};
export type BonusesTab_GrantBonusMutationVariables = {
    input: GrantBonusInput;
};
export type BonusesTab_GrantBonusMutationResponse = {
    readonly grantBonus: {
        readonly bonus: {
            readonly id: string | null;
            readonly " $fragmentRefs": FragmentRefs<"BonusRow_Bonus" | "BonusCard_Bonus">;
        } | null;
    } | null;
};
export type BonusesTab_GrantBonusMutation = {
    readonly response: BonusesTab_GrantBonusMutationResponse;
    readonly variables: BonusesTab_GrantBonusMutationVariables;
};



/*
mutation BonusesTab_GrantBonusMutation(
  $input: GrantBonusInput!
) {
  grantBonus(input: $input) {
    bonus {
      id
      ...BonusRow_Bonus
      ...BonusCard_Bonus
    }
  }
}

fragment BonusCard_Bonus on Bonus {
  stage
  totalToPayClient {
    currency {
      code
      id
    }
    value
  }
  startDate
  endDate
  approvedAt
  currency {
    code
    id
  }
  payrollItem {
    invoiceItem {
      invoice {
        invoiceNum
        id
      }
      id
    }
    id
  }
  contract {
    freelancer {
      name
      id
    }
    client {
      name
      id
    }
    id
  }
}

fragment BonusRow_Bonus on Bonus {
  id
  stage
  totalToPayClient {
    currency {
      code
      id
    }
    value
  }
  startDate
  endDate
  approvedAt
  currency {
    code
    id
  }
  payrollItem {
    invoiceItem {
      invoice {
        rawId
        invoiceNum
        token
        id
      }
      id
    }
    id
  }
  contract {
    freelancer {
      name
      id
    }
    client {
      name
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
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BonusesTab_GrantBonusMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GrantBonusPayload",
        "kind": "LinkedField",
        "name": "grantBonus",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Bonus",
            "kind": "LinkedField",
            "name": "bonus",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "BonusRow_Bonus"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "BonusCard_Bonus"
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
    "name": "BonusesTab_GrantBonusMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GrantBonusPayload",
        "kind": "LinkedField",
        "name": "grantBonus",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Bonus",
            "kind": "LinkedField",
            "name": "bonus",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "stage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "totalToPayClient",
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
                "name": "startDate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endDate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "approvedAt",
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PayrollItem",
                "kind": "LinkedField",
                "name": "payrollItem",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "InvoiceItem",
                    "kind": "LinkedField",
                    "name": "invoiceItem",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Invoice",
                        "kind": "LinkedField",
                        "name": "invoice",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "rawId",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "invoiceNum",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "token",
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Contract",
                "kind": "LinkedField",
                "name": "contract",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "freelancer",
                    "plural": false,
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "client",
                    "plural": false,
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  (v2/*: any*/)
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
    "cacheID": "dee5678718c0f055b0ffafb193400d77",
    "id": null,
    "metadata": {},
    "name": "BonusesTab_GrantBonusMutation",
    "operationKind": "mutation",
    "text": "mutation BonusesTab_GrantBonusMutation(\n  $input: GrantBonusInput!\n) {\n  grantBonus(input: $input) {\n    bonus {\n      id\n      ...BonusRow_Bonus\n      ...BonusCard_Bonus\n    }\n  }\n}\n\nfragment BonusCard_Bonus on Bonus {\n  stage\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  startDate\n  endDate\n  approvedAt\n  currency {\n    code\n    id\n  }\n  payrollItem {\n    invoiceItem {\n      invoice {\n        invoiceNum\n        id\n      }\n      id\n    }\n    id\n  }\n  contract {\n    freelancer {\n      name\n      id\n    }\n    client {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment BonusRow_Bonus on Bonus {\n  id\n  stage\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  startDate\n  endDate\n  approvedAt\n  currency {\n    code\n    id\n  }\n  payrollItem {\n    invoiceItem {\n      invoice {\n        rawId\n        invoiceNum\n        token\n        id\n      }\n      id\n    }\n    id\n  }\n  contract {\n    freelancer {\n      name\n      id\n    }\n    client {\n      name\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '0558fc019d55ced959da0334c3f1456e';
export default node;

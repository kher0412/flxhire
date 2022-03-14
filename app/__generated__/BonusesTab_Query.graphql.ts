/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type BonusesTab_QueryVariables = {};
export type BonusesTab_QueryResponse = {
    readonly firm: {
        readonly " $fragmentRefs": FragmentRefs<"BonusFilters_Firm" | "BonusList_Firm">;
    } | null;
};
export type BonusesTab_Query = {
    readonly response: BonusesTab_QueryResponse;
    readonly variables: BonusesTab_QueryVariables;
};



/*
query BonusesTab_Query {
  firm {
    ...BonusFilters_Firm
    ...BonusList_Firm
    id
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

fragment BonusFilters_Firm on Firm {
  users {
    id
    name
  }
}

fragment BonusList_Firm on Firm {
  bonuses(first: 5) {
    totalCount
    edges {
      node {
        id
        ...BonusRow_Bonus
        ...BonusCard_Bonus
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  id
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
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
],
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
    (v0/*: any*/)
  ],
  "storageKey": null
},
v4 = [
  (v1/*: any*/),
  (v0/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BonusesTab_Query",
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
            "name": "BonusFilters_Firm"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BonusList_Firm"
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
    "name": "BonusesTab_Query",
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
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "users",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "BonusConnection",
            "kind": "LinkedField",
            "name": "bonuses",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "BonusEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Bonus",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
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
                                  (v0/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v0/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v0/*: any*/)
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
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "ClientExtension",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__id",
                    "storageKey": null
                  }
                ]
              }
            ],
            "storageKey": "bonuses(first:5)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": [
              "filters"
            ],
            "handle": "connection",
            "key": "BonusList_bonuses",
            "kind": "LinkedHandle",
            "name": "bonuses"
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7d8d60b7a7257f2394b89244117cf8b6",
    "id": null,
    "metadata": {},
    "name": "BonusesTab_Query",
    "operationKind": "query",
    "text": "query BonusesTab_Query {\n  firm {\n    ...BonusFilters_Firm\n    ...BonusList_Firm\n    id\n  }\n}\n\nfragment BonusCard_Bonus on Bonus {\n  stage\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  startDate\n  endDate\n  approvedAt\n  currency {\n    code\n    id\n  }\n  payrollItem {\n    invoiceItem {\n      invoice {\n        invoiceNum\n        id\n      }\n      id\n    }\n    id\n  }\n  contract {\n    freelancer {\n      name\n      id\n    }\n    client {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment BonusFilters_Firm on Firm {\n  users {\n    id\n    name\n  }\n}\n\nfragment BonusList_Firm on Firm {\n  bonuses(first: 5) {\n    totalCount\n    edges {\n      node {\n        id\n        ...BonusRow_Bonus\n        ...BonusCard_Bonus\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment BonusRow_Bonus on Bonus {\n  id\n  stage\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  startDate\n  endDate\n  approvedAt\n  currency {\n    code\n    id\n  }\n  payrollItem {\n    invoiceItem {\n      invoice {\n        rawId\n        invoiceNum\n        token\n        id\n      }\n      id\n    }\n    id\n  }\n  contract {\n    freelancer {\n      name\n      id\n    }\n    client {\n      name\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'cd0c7d00e57cac2540af720ba888338e';
export default node;

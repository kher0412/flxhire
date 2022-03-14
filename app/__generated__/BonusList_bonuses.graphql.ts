/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type BonusStage = "approved" | "paid" | "pending";
export type BonusesFilters = {
    clientId?: string | null;
    date?: string | null;
    invoiceNum?: number | null;
    name?: string | null;
    stage?: BonusStage | null;
};
export type BonusList_bonusesVariables = {
    count?: number | null;
    cursor?: string | null;
    filters?: BonusesFilters | null;
    id: string;
};
export type BonusList_bonusesResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"BonusList_Firm">;
    } | null;
};
export type BonusList_bonuses = {
    readonly response: BonusList_bonusesResponse;
    readonly variables: BonusList_bonusesVariables;
};



/*
query BonusList_bonuses(
  $count: Int = 5
  $cursor: String
  $filters: BonusesFilters
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...BonusList_Firm_4DMzEc
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

fragment BonusList_Firm_4DMzEc on Firm {
  bonuses(first: $count, after: $cursor, filters: $filters) {
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
var v0 = [
  {
    "defaultValue": 5,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filters"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "Variable",
  "name": "filters",
  "variableName": "filters"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v2/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
],
v6 = {
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
    (v4/*: any*/)
  ],
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BonusList_bonuses",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              },
              (v2/*: any*/)
            ],
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BonusList_bonuses",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v5/*: any*/),
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
                          (v4/*: any*/),
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
                              (v6/*: any*/),
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
                          (v6/*: any*/),
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
                                      (v4/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v4/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v4/*: any*/)
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
                                "selections": (v7/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "User",
                                "kind": "LinkedField",
                                "name": "client",
                                "plural": false,
                                "selections": (v7/*: any*/),
                                "storageKey": null
                              },
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/)
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
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "filters": [
                  "filters"
                ],
                "handle": "connection",
                "key": "BonusList_bonuses",
                "kind": "LinkedHandle",
                "name": "bonuses"
              }
            ],
            "type": "Firm",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bb8c2b187772446ad11903bac83f72f7",
    "id": null,
    "metadata": {},
    "name": "BonusList_bonuses",
    "operationKind": "query",
    "text": "query BonusList_bonuses(\n  $count: Int = 5\n  $cursor: String\n  $filters: BonusesFilters\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...BonusList_Firm_4DMzEc\n    id\n  }\n}\n\nfragment BonusCard_Bonus on Bonus {\n  stage\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  startDate\n  endDate\n  approvedAt\n  currency {\n    code\n    id\n  }\n  payrollItem {\n    invoiceItem {\n      invoice {\n        invoiceNum\n        id\n      }\n      id\n    }\n    id\n  }\n  contract {\n    freelancer {\n      name\n      id\n    }\n    client {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment BonusList_Firm_4DMzEc on Firm {\n  bonuses(first: $count, after: $cursor, filters: $filters) {\n    totalCount\n    edges {\n      node {\n        id\n        ...BonusRow_Bonus\n        ...BonusCard_Bonus\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment BonusRow_Bonus on Bonus {\n  id\n  stage\n  totalToPayClient {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  startDate\n  endDate\n  approvedAt\n  currency {\n    code\n    id\n  }\n  payrollItem {\n    invoiceItem {\n      invoice {\n        rawId\n        invoiceNum\n        token\n        id\n      }\n      id\n    }\n    id\n  }\n  contract {\n    freelancer {\n      name\n      id\n    }\n    client {\n      name\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bbde71164786c7885ff45fedf6c09800';
export default node;

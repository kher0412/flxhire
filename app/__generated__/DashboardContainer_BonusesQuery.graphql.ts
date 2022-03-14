/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type DashboardContainer_BonusesQueryVariables = {};
export type DashboardContainer_BonusesQueryResponse = {
    readonly firm: {
        readonly bonuses: {
            readonly __id: string;
            readonly totalCount: number | null;
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string | null;
                    readonly totalToPayClient: {
                        readonly currency: {
                            readonly code: string | null;
                        };
                        readonly value: number;
                    } | null;
                    readonly contract: {
                        readonly freelancer: {
                            readonly name: string | null;
                        } | null;
                        readonly client: {
                            readonly name: string | null;
                        } | null;
                        readonly currency: {
                            readonly code: string | null;
                        };
                    } | null;
                } | null;
            } | null> | null;
        } | null;
    } | null;
};
export type DashboardContainer_BonusesQuery = {
    readonly response: DashboardContainer_BonusesQueryResponse;
    readonly variables: DashboardContainer_BonusesQueryVariables;
};



/*
query DashboardContainer_BonusesQuery {
  firm {
    bonuses(first: 3) {
      totalCount
      edges {
        node {
          id
          totalToPayClient {
            currency {
              code
              id
            }
            value
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
            currency {
              code
              id
            }
            id
          }
        }
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
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
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    (v3/*: any*/)
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = [
  (v6/*: any*/)
],
v8 = {
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
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
},
v10 = [
  (v6/*: any*/),
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DashboardContainer_BonusesQuery",
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
            "args": (v0/*: any*/),
            "concreteType": "BonusConnection",
            "kind": "LinkedField",
            "name": "bonuses",
            "plural": false,
            "selections": [
              (v1/*: any*/),
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
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "totalToPayClient",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v5/*: any*/)
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
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": "bonuses(first:3)"
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
    "name": "DashboardContainer_BonusesQuery",
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
            "args": (v0/*: any*/),
            "concreteType": "BonusConnection",
            "kind": "LinkedField",
            "name": "bonuses",
            "plural": false,
            "selections": [
              (v1/*: any*/),
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
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "totalToPayClient",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          (v5/*: any*/)
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
                            "selections": (v10/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "client",
                            "plural": false,
                            "selections": (v10/*: any*/),
                            "storageKey": null
                          },
                          (v9/*: any*/),
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": "bonuses(first:3)"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4e0a9f8712e97eeae756cd31e7be65c7",
    "id": null,
    "metadata": {},
    "name": "DashboardContainer_BonusesQuery",
    "operationKind": "query",
    "text": "query DashboardContainer_BonusesQuery {\n  firm {\n    bonuses(first: 3) {\n      totalCount\n      edges {\n        node {\n          id\n          totalToPayClient {\n            currency {\n              code\n              id\n            }\n            value\n          }\n          contract {\n            freelancer {\n              name\n              id\n            }\n            client {\n              name\n              id\n            }\n            currency {\n              code\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e054579da6b3b8abe62963ecff2adeb9';
export default node;

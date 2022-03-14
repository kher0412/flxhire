/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type PayrollItemType = "bonus" | "expense" | "salary" | "timesheet";
export type DashboardContainer_PayrollItemsQueryVariables = {};
export type DashboardContainer_PayrollItemsQueryResponse = {
    readonly firm: {
        readonly payrollItems: {
            readonly totalCount: number | null;
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly totalToPayClient: {
                        readonly currency: {
                            readonly code: string | null;
                        };
                        readonly value: number;
                    } | null;
                    readonly type: PayrollItemType | null;
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
export type DashboardContainer_PayrollItemsQuery = {
    readonly response: DashboardContainer_PayrollItemsQueryResponse;
    readonly variables: DashboardContainer_PayrollItemsQueryVariables;
};



/*
query DashboardContainer_PayrollItemsQuery {
  firm {
    payrollItems(first: 3) {
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
          type
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
  "name": "type",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = [
  (v7/*: any*/)
],
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
  (v7/*: any*/),
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DashboardContainer_PayrollItemsQuery",
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
            "concreteType": "PayrollItemConnection",
            "kind": "LinkedField",
            "name": "payrollItems",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PayrollItemEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PayrollItem",
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
                      (v6/*: any*/),
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
                            "selections": (v8/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "client",
                            "plural": false,
                            "selections": (v8/*: any*/),
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
              }
            ],
            "storageKey": "payrollItems(first:3)"
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
    "name": "DashboardContainer_PayrollItemsQuery",
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
            "concreteType": "PayrollItemConnection",
            "kind": "LinkedField",
            "name": "payrollItems",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PayrollItemEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PayrollItem",
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
                      (v6/*: any*/),
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
              }
            ],
            "storageKey": "payrollItems(first:3)"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d9897636d36e9c35aa41fb3004e5e44d",
    "id": null,
    "metadata": {},
    "name": "DashboardContainer_PayrollItemsQuery",
    "operationKind": "query",
    "text": "query DashboardContainer_PayrollItemsQuery {\n  firm {\n    payrollItems(first: 3) {\n      totalCount\n      edges {\n        node {\n          id\n          totalToPayClient {\n            currency {\n              code\n              id\n            }\n            value\n          }\n          type\n          contract {\n            freelancer {\n              name\n              id\n            }\n            client {\n              name\n              id\n            }\n            currency {\n              code\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ead9db40c2dc42e2728ef44d4fcff3a1';
export default node;

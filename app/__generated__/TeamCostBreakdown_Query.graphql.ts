/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type TeamCostBreakdown_QueryVariables = {};
export type TeamCostBreakdown_QueryResponse = {
    readonly currentUser: {
        readonly firm: {
            readonly contracts: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly freelancer: {
                            readonly id: string;
                            readonly rawId: number | null;
                            readonly name: string | null;
                        } | null;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
};
export type TeamCostBreakdown_Query = {
    readonly response: TeamCostBreakdown_QueryResponse;
    readonly variables: TeamCostBreakdown_QueryVariables;
};



/*
query TeamCostBreakdown_Query {
  currentUser {
    firm {
      contracts(filters: {stage: "contract", membersOnly: true}, first: 20) {
        edges {
          node {
            freelancer {
              id
              rawId
              name
            }
            id
          }
        }
      }
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "filters",
    "value": {
      "membersOnly": true,
      "stage": "contract"
    }
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "freelancer",
  "plural": false,
  "selections": [
    (v1/*: any*/),
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
      "name": "name",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TeamCostBreakdown_Query",
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
                "alias": null,
                "args": (v0/*: any*/),
                "concreteType": "ContractConnection",
                "kind": "LinkedField",
                "name": "contracts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ContractEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Contract",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "contracts(filters:{\"membersOnly\":true,\"stage\":\"contract\"},first:20)"
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
    "name": "TeamCostBreakdown_Query",
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
                "alias": null,
                "args": (v0/*: any*/),
                "concreteType": "ContractConnection",
                "kind": "LinkedField",
                "name": "contracts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ContractEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Contract",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "contracts(filters:{\"membersOnly\":true,\"stage\":\"contract\"},first:20)"
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3bdbbe2c6cb9d19b646fa0d689435d06",
    "id": null,
    "metadata": {},
    "name": "TeamCostBreakdown_Query",
    "operationKind": "query",
    "text": "query TeamCostBreakdown_Query {\n  currentUser {\n    firm {\n      contracts(filters: {stage: \"contract\", membersOnly: true}, first: 20) {\n        edges {\n          node {\n            freelancer {\n              id\n              rawId\n              name\n            }\n            id\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '4c44ffb5c70d3585fa1fa967051c813e';
export default node;

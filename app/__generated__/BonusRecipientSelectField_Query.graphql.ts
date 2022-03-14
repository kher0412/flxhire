/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type BonusRecipientSelectField_QueryVariables = {};
export type BonusRecipientSelectField_QueryResponse = {
    readonly firm: {
        readonly contracts: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly status: ContractStatus;
                    readonly currency: {
                        readonly symbol: string | null;
                        readonly code: string | null;
                    };
                    readonly freelancer: {
                        readonly name: string | null;
                    } | null;
                } | null;
            } | null> | null;
        } | null;
    } | null;
};
export type BonusRecipientSelectField_Query = {
    readonly response: BonusRecipientSelectField_QueryResponse;
    readonly variables: BonusRecipientSelectField_QueryVariables;
};



/*
query BonusRecipientSelectField_Query {
  firm {
    contracts(filters: {membersOnly: true, statuses: ["active", "paused"]}) {
      edges {
        node {
          id
          status
          currency {
            symbol
            code
            id
          }
          freelancer {
            name
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
    "name": "filters",
    "value": {
      "membersOnly": true,
      "statuses": [
        "active",
        "paused"
      ]
    }
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
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "symbol",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BonusRecipientSelectField_Query",
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
                      (v1/*: any*/),
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Currency",
                        "kind": "LinkedField",
                        "name": "currency",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "freelancer",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/)
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
            "storageKey": "contracts(filters:{\"membersOnly\":true,\"statuses\":[\"active\",\"paused\"]})"
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
    "name": "BonusRecipientSelectField_Query",
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
                      (v1/*: any*/),
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Currency",
                        "kind": "LinkedField",
                        "name": "currency",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "freelancer",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v1/*: any*/)
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
            "storageKey": "contracts(filters:{\"membersOnly\":true,\"statuses\":[\"active\",\"paused\"]})"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "15d78c0ab4f48b060425a11ba2b7169b",
    "id": null,
    "metadata": {},
    "name": "BonusRecipientSelectField_Query",
    "operationKind": "query",
    "text": "query BonusRecipientSelectField_Query {\n  firm {\n    contracts(filters: {membersOnly: true, statuses: [\"active\", \"paused\"]}) {\n      edges {\n        node {\n          id\n          status\n          currency {\n            symbol\n            code\n            id\n          }\n          freelancer {\n            name\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a3ebe815d22e0920beaab51fd2b83cc2';
export default node;

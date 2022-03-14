/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RatingDialog_QueryVariables = {
    id: number;
};
export type RatingDialog_QueryResponse = {
    readonly contract: {
        readonly contractFeedbacks: ReadonlyArray<{
            readonly id: string;
            readonly user: {
                readonly rawId: number | null;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"RatingEntry_Feedback">;
        }> | null;
    } | null;
};
export type RatingDialog_Query = {
    readonly response: RatingDialog_QueryResponse;
    readonly variables: RatingDialog_QueryVariables;
};



/*
query RatingDialog_Query(
  $id: Int!
) {
  contract(rawId: $id) {
    contractFeedbacks {
      id
      user {
        rawId
        id
      }
      ...RatingEntry_Feedback
    }
    id
  }
}

fragment RatingEntry_Feedback on ContractFeedback {
  user {
    rawId
    name
    id
  }
  updatedAt
  ratingPositive
  description
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "rawId",
    "variableName": "id"
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
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RatingDialog_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Contract",
        "kind": "LinkedField",
        "name": "contract",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ContractFeedback",
            "kind": "LinkedField",
            "name": "contractFeedbacks",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "RatingEntry_Feedback"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RatingDialog_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Contract",
        "kind": "LinkedField",
        "name": "contract",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ContractFeedback",
            "kind": "LinkedField",
            "name": "contractFeedbacks",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "updatedAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "ratingPositive",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fab1e7d231bbfdb7050d5db3facde55b",
    "id": null,
    "metadata": {},
    "name": "RatingDialog_Query",
    "operationKind": "query",
    "text": "query RatingDialog_Query(\n  $id: Int!\n) {\n  contract(rawId: $id) {\n    contractFeedbacks {\n      id\n      user {\n        rawId\n        id\n      }\n      ...RatingEntry_Feedback\n    }\n    id\n  }\n}\n\nfragment RatingEntry_Feedback on ContractFeedback {\n  user {\n    rawId\n    name\n    id\n  }\n  updatedAt\n  ratingPositive\n  description\n}\n"
  }
};
})();
(node as any).hash = '4420c2481022a52c8801cc9183146b9d';
export default node;

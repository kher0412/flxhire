/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SendContractRatingInput = {
    clientMutationId?: string | null;
    contractId: string;
    description: string;
    ratingPositive: boolean;
    status: string;
};
export type RatingFormContainer_SendContractRatingMutationVariables = {
    input: SendContractRatingInput;
};
export type RatingFormContainer_SendContractRatingMutationResponse = {
    readonly sendContractRating: {
        readonly contractFeedback: {
            readonly contract: {
                readonly positiveFeedbackCount: number | null;
                readonly negativeFeedbackCount: number | null;
                readonly contractFeedbacks: ReadonlyArray<{
                    readonly id: string;
                    readonly user: {
                        readonly rawId: number | null;
                    } | null;
                    readonly " $fragmentRefs": FragmentRefs<"RatingEntry_Feedback">;
                }> | null;
            } | null;
        } | null;
    } | null;
};
export type RatingFormContainer_SendContractRatingMutation = {
    readonly response: RatingFormContainer_SendContractRatingMutationResponse;
    readonly variables: RatingFormContainer_SendContractRatingMutationVariables;
};



/*
mutation RatingFormContainer_SendContractRatingMutation(
  $input: SendContractRatingInput!
) {
  sendContractRating(input: $input) {
    contractFeedback {
      contract {
        positiveFeedbackCount
        negativeFeedbackCount
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
      id
    }
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
  "name": "positiveFeedbackCount",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "negativeFeedbackCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
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
    "name": "RatingFormContainer_SendContractRatingMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendContractRatingPayload",
        "kind": "LinkedField",
        "name": "sendContractRating",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ContractFeedback",
            "kind": "LinkedField",
            "name": "contractFeedback",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Contract",
                "kind": "LinkedField",
                "name": "contract",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ContractFeedback",
                    "kind": "LinkedField",
                    "name": "contractFeedbacks",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "user",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/)
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
    "name": "RatingFormContainer_SendContractRatingMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendContractRatingPayload",
        "kind": "LinkedField",
        "name": "sendContractRating",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ContractFeedback",
            "kind": "LinkedField",
            "name": "contractFeedback",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Contract",
                "kind": "LinkedField",
                "name": "contract",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ContractFeedback",
                    "kind": "LinkedField",
                    "name": "contractFeedbacks",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "user",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v4/*: any*/),
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
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7f819017bbd6150ba9da84d92e8941d5",
    "id": null,
    "metadata": {},
    "name": "RatingFormContainer_SendContractRatingMutation",
    "operationKind": "mutation",
    "text": "mutation RatingFormContainer_SendContractRatingMutation(\n  $input: SendContractRatingInput!\n) {\n  sendContractRating(input: $input) {\n    contractFeedback {\n      contract {\n        positiveFeedbackCount\n        negativeFeedbackCount\n        contractFeedbacks {\n          id\n          user {\n            rawId\n            id\n          }\n          ...RatingEntry_Feedback\n        }\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment RatingEntry_Feedback on ContractFeedback {\n  user {\n    rawId\n    name\n    id\n  }\n  updatedAt\n  ratingPositive\n  description\n}\n"
  }
};
})();
(node as any).hash = '4ee58096d995d9eb030225fa6f26a9a4';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type FreelancerCardSlider_AnswersQueryVariables = {
    contractId?: number | null;
    freelancerId?: number | null;
    withContract: boolean;
    withFreelancer: boolean;
};
export type FreelancerCardSlider_AnswersQueryResponse = {
    readonly contract?: {
        readonly id: string;
        readonly answers: ReadonlyArray<{
            readonly question: {
                readonly title: string | null;
            } | null;
            readonly url: string;
            readonly posterUrl: string;
        }> | null;
        readonly textualAnswers: ReadonlyArray<{
            readonly question: {
                readonly title: string | null;
            } | null;
            readonly textualAnswer: string | null;
        }> | null;
    } | null;
    readonly freelancer?: {
        readonly answers: ReadonlyArray<{
            readonly question: {
                readonly title: string | null;
            } | null;
            readonly url: string;
            readonly posterUrl: string;
        }> | null;
    } | null;
};
export type FreelancerCardSlider_AnswersQuery = {
    readonly response: FreelancerCardSlider_AnswersQueryResponse;
    readonly variables: FreelancerCardSlider_AnswersQueryVariables;
};



/*
query FreelancerCardSlider_AnswersQuery(
  $contractId: Int
  $freelancerId: Int
  $withContract: Boolean!
  $withFreelancer: Boolean!
) {
  contract(rawId: $contractId) @include(if: $withContract) {
    id
    answers {
      question {
        title
        id
      }
      url
      posterUrl
      id
    }
    textualAnswers {
      question {
        title
        id
      }
      textualAnswer
      id
    }
  }
  freelancer: user(rawId: $freelancerId) @include(if: $withFreelancer) {
    answers {
      question {
        title
        id
      }
      url
      posterUrl
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
    "name": "contractId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "freelancerId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "withContract"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "withFreelancer"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "rawId",
    "variableName": "contractId"
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
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Question",
  "kind": "LinkedField",
  "name": "question",
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
  "name": "url",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "posterUrl",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Video",
  "kind": "LinkedField",
  "name": "answers",
  "plural": true,
  "selections": [
    (v4/*: any*/),
    (v5/*: any*/),
    (v6/*: any*/)
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "textualAnswer",
  "storageKey": null
},
v9 = [
  {
    "kind": "Variable",
    "name": "rawId",
    "variableName": "freelancerId"
  }
],
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "Question",
  "kind": "LinkedField",
  "name": "question",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Video",
  "kind": "LinkedField",
  "name": "answers",
  "plural": true,
  "selections": [
    (v10/*: any*/),
    (v5/*: any*/),
    (v6/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FreelancerCardSlider_AnswersQuery",
    "selections": [
      {
        "condition": "withContract",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Answer",
                "kind": "LinkedField",
                "name": "textualAnswers",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v8/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "condition": "withFreelancer",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": "freelancer",
            "args": (v9/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FreelancerCardSlider_AnswersQuery",
    "selections": [
      {
        "condition": "withContract",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Answer",
                "kind": "LinkedField",
                "name": "textualAnswers",
                "plural": true,
                "selections": [
                  (v10/*: any*/),
                  (v8/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "condition": "withFreelancer",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": "freelancer",
            "args": (v9/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v11/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "31b1a797a2e588c0d6a949cf28a44bd4",
    "id": null,
    "metadata": {},
    "name": "FreelancerCardSlider_AnswersQuery",
    "operationKind": "query",
    "text": "query FreelancerCardSlider_AnswersQuery(\n  $contractId: Int\n  $freelancerId: Int\n  $withContract: Boolean!\n  $withFreelancer: Boolean!\n) {\n  contract(rawId: $contractId) @include(if: $withContract) {\n    id\n    answers {\n      question {\n        title\n        id\n      }\n      url\n      posterUrl\n      id\n    }\n    textualAnswers {\n      question {\n        title\n        id\n      }\n      textualAnswer\n      id\n    }\n  }\n  freelancer: user(rawId: $freelancerId) @include(if: $withFreelancer) {\n    answers {\n      question {\n        title\n        id\n      }\n      url\n      posterUrl\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '3321a67f52ecaee1f79e4ca4f0ea903f';
export default node;

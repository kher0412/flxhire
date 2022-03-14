/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type RateMode = "day" | "hour" | "month" | "year";
export type ContractPreviewAttributes = {
    annualCompensation?: MoneyInput | null;
    availabilityType?: Array<string> | null;
    clientId?: string | null;
    clientRate?: MoneyInput | null;
    contractId?: string | null;
    currency?: string | null;
    discountCode?: string | null;
    freelancerEmail?: string | null;
    freelancerId?: string | null;
    freelancerRate?: MoneyInput | null;
    jobId?: string | null;
    rateMode?: RateMode | null;
};
export type MoneyInput = {
    currencyCode: string;
    value: number;
};
export type RatePreviewText_ContractPreviewQueryVariables = {
    input: ContractPreviewAttributes;
};
export type RatePreviewText_ContractPreviewQueryResponse = {
    readonly contractPreview: {
        readonly freelancerRate: {
            readonly currency: {
                readonly code: string | null;
            };
            readonly value: number;
        } | null;
        readonly currency: {
            readonly code: string | null;
        } | null;
        readonly rateMode: RateMode | null;
        readonly margin: number | null;
        readonly minMarginUsd: number | null;
        readonly dailyFee: {
            readonly currency: {
                readonly code: string | null;
            };
            readonly value: number;
        } | null;
    } | null;
};
export type RatePreviewText_ContractPreviewQuery = {
    readonly response: RatePreviewText_ContractPreviewQueryResponse;
    readonly variables: RatePreviewText_ContractPreviewQueryVariables;
};



/*
query RatePreviewText_ContractPreviewQuery(
  $input: ContractPreviewAttributes!
) {
  contractPreview(input: $input) {
    freelancerRate {
      currency {
        code
        id
      }
      value
    }
    currency {
      code
      id
    }
    rateMode
    margin
    minMarginUsd
    dailyFee {
      currency {
        code
        id
      }
      value
    }
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
  "name": "code",
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
    (v2/*: any*/)
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rateMode",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "margin",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "minMarginUsd",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v10 = [
  (v9/*: any*/),
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RatePreviewText_ContractPreviewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ContractPreview",
        "kind": "LinkedField",
        "name": "contractPreview",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "freelancerRate",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          (v3/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "dailyFee",
            "plural": false,
            "selections": (v5/*: any*/),
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
    "name": "RatePreviewText_ContractPreviewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ContractPreview",
        "kind": "LinkedField",
        "name": "contractPreview",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "freelancerRate",
            "plural": false,
            "selections": (v10/*: any*/),
            "storageKey": null
          },
          (v9/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "dailyFee",
            "plural": false,
            "selections": (v10/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "78ad61231256f32c7e8e06156ed160da",
    "id": null,
    "metadata": {},
    "name": "RatePreviewText_ContractPreviewQuery",
    "operationKind": "query",
    "text": "query RatePreviewText_ContractPreviewQuery(\n  $input: ContractPreviewAttributes!\n) {\n  contractPreview(input: $input) {\n    freelancerRate {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    currency {\n      code\n      id\n    }\n    rateMode\n    margin\n    minMarginUsd\n    dailyFee {\n      currency {\n        code\n        id\n      }\n      value\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3a60145e0be6abcdc4b713f219e1dcac';
export default node;

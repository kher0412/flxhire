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
export type ReviewStep_ContractPreviewQueryVariables = {
    input: ContractPreviewAttributes;
};
export type ReviewStep_ContractPreviewQueryResponse = {
    readonly contractPreview: {
        readonly freelancerRate: {
            readonly currency: {
                readonly code: string | null;
            };
            readonly value: number;
        } | null;
    } | null;
};
export type ReviewStep_ContractPreviewQuery = {
    readonly response: ReviewStep_ContractPreviewQueryResponse;
    readonly variables: ReviewStep_ContractPreviewQueryVariables;
};



/*
query ReviewStep_ContractPreviewQuery(
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
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ReviewStep_ContractPreviewQuery",
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
            "selections": [
              {
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
              (v3/*: any*/)
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
    "name": "ReviewStep_ContractPreviewQuery",
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
            "selections": [
              {
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
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a1cce34a20a3085ac6a1ab6093f73608",
    "id": null,
    "metadata": {},
    "name": "ReviewStep_ContractPreviewQuery",
    "operationKind": "query",
    "text": "query ReviewStep_ContractPreviewQuery(\n  $input: ContractPreviewAttributes!\n) {\n  contractPreview(input: $input) {\n    freelancerRate {\n      currency {\n        code\n        id\n      }\n      value\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '325a1d1b2122a36fdd1721e1cdbdd8e0';
export default node;

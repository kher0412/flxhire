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
export type useContractPreview_ContractPreviewQueryVariables = {
    input: ContractPreviewAttributes;
};
export type useContractPreview_ContractPreviewQueryResponse = {
    readonly contractPreview: {
        readonly freelancerRate: {
            readonly currency: {
                readonly code: string | null;
            };
            readonly value: number;
        } | null;
        readonly clientRate: {
            readonly currency: {
                readonly code: string | null;
            };
            readonly value: number;
        } | null;
    } | null;
};
export type useContractPreview_ContractPreviewQuery = {
    readonly response: useContractPreview_ContractPreviewQueryResponse;
    readonly variables: useContractPreview_ContractPreviewQueryVariables;
};



/*
query useContractPreview_ContractPreviewQuery(
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
    clientRate {
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
},
v4 = [
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
v5 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useContractPreview_ContractPreviewQuery",
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
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "clientRate",
            "plural": false,
            "selections": (v4/*: any*/),
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
    "name": "useContractPreview_ContractPreviewQuery",
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
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "clientRate",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "31ab513c00d7ddbfe8f01675cd3dedaa",
    "id": null,
    "metadata": {},
    "name": "useContractPreview_ContractPreviewQuery",
    "operationKind": "query",
    "text": "query useContractPreview_ContractPreviewQuery(\n  $input: ContractPreviewAttributes!\n) {\n  contractPreview(input: $input) {\n    freelancerRate {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    clientRate {\n      currency {\n        code\n        id\n      }\n      value\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'db385d48785aba45cc30997983219c59';
export default node;

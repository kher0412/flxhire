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
export type MarginNotice_ContractPreviewQueryVariables = {
    input: ContractPreviewAttributes;
};
export type MarginNotice_ContractPreviewQueryResponse = {
    readonly contractPreview: {
        readonly paymentsEnabled: boolean | null;
        readonly freelancerFirstName: string | null;
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
        readonly invitationType: string | null;
    } | null;
};
export type MarginNotice_ContractPreviewQuery = {
    readonly response: MarginNotice_ContractPreviewQueryResponse;
    readonly variables: MarginNotice_ContractPreviewQueryVariables;
};



/*
query MarginNotice_ContractPreviewQuery(
  $input: ContractPreviewAttributes!
) {
  contractPreview(input: $input) {
    paymentsEnabled
    freelancerFirstName
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
    invitationType
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
  "name": "paymentsEnabled",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "freelancerFirstName",
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
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    (v4/*: any*/)
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rateMode",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "margin",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "minMarginUsd",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "invitationType",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MarginNotice_ContractPreviewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ContractPreview",
        "kind": "LinkedField",
        "name": "contractPreview",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "freelancerRate",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/)
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
    "name": "MarginNotice_ContractPreviewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ContractPreview",
        "kind": "LinkedField",
        "name": "contractPreview",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "freelancerRate",
            "plural": false,
            "selections": [
              (v11/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v11/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cfa1248a17ffc345e800d673d4c05770",
    "id": null,
    "metadata": {},
    "name": "MarginNotice_ContractPreviewQuery",
    "operationKind": "query",
    "text": "query MarginNotice_ContractPreviewQuery(\n  $input: ContractPreviewAttributes!\n) {\n  contractPreview(input: $input) {\n    paymentsEnabled\n    freelancerFirstName\n    freelancerRate {\n      currency {\n        code\n        id\n      }\n      value\n    }\n    currency {\n      code\n      id\n    }\n    rateMode\n    margin\n    minMarginUsd\n    invitationType\n  }\n}\n"
  }
};
})();
(node as any).hash = '63ab3fdeeb8ef13322bb9de5ac8dffd2';
export default node;

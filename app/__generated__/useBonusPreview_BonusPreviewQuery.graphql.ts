/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type BonusPreviewAttributes = {
    clientBonus?: MoneyInput | null;
    memberBonus?: MoneyInput | null;
};
export type MoneyInput = {
    currencyCode: string;
    value: number;
};
export type useBonusPreview_BonusPreviewQueryVariables = {
    contractId?: string | null;
    input: BonusPreviewAttributes;
};
export type useBonusPreview_BonusPreviewQueryResponse = {
    readonly contract: {
        readonly bonusPreview: {
            readonly memberBonus: {
                readonly currency: {
                    readonly code: string | null;
                };
                readonly value: number;
            } | null;
            readonly clientBonus: {
                readonly currency: {
                    readonly code: string | null;
                };
                readonly value: number;
            } | null;
        } | null;
    } | null;
};
export type useBonusPreview_BonusPreviewQuery = {
    readonly response: useBonusPreview_BonusPreviewQueryResponse;
    readonly variables: useBonusPreview_BonusPreviewQueryVariables;
};



/*
query useBonusPreview_BonusPreviewQuery(
  $contractId: ID
  $input: BonusPreviewAttributes!
) {
  contract(id: $contractId) {
    bonusPreview(input: $input) {
      memberBonus {
        currency {
          code
          id
        }
        value
      }
      clientBonus {
        currency {
          code
          id
        }
        value
      }
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
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "contractId"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
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
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v5 = [
  {
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
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Currency",
    "kind": "LinkedField",
    "name": "currency",
    "plural": false,
    "selections": [
      (v3/*: any*/),
      (v6/*: any*/)
    ],
    "storageKey": null
  },
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useBonusPreview_BonusPreviewQuery",
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
            "args": (v2/*: any*/),
            "concreteType": "BonusPreview",
            "kind": "LinkedField",
            "name": "bonusPreview",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "memberBonus",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "clientBonus",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
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
    "name": "useBonusPreview_BonusPreviewQuery",
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
            "args": (v2/*: any*/),
            "concreteType": "BonusPreview",
            "kind": "LinkedField",
            "name": "bonusPreview",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "memberBonus",
                "plural": false,
                "selections": (v7/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "clientBonus",
                "plural": false,
                "selections": (v7/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "769bf1c9d72530ecc1b06ddc96d1ab57",
    "id": null,
    "metadata": {},
    "name": "useBonusPreview_BonusPreviewQuery",
    "operationKind": "query",
    "text": "query useBonusPreview_BonusPreviewQuery(\n  $contractId: ID\n  $input: BonusPreviewAttributes!\n) {\n  contract(id: $contractId) {\n    bonusPreview(input: $input) {\n      memberBonus {\n        currency {\n          code\n          id\n        }\n        value\n      }\n      clientBonus {\n        currency {\n          code\n          id\n        }\n        value\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '6f8745610583bd371e880b01340c8f3d';
export default node;

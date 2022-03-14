/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PayingYouContainer_QueryVariables = {};
export type PayingYouContainer_QueryResponse = {
    readonly currentUser: {
        readonly " $fragmentRefs": FragmentRefs<"PayingYou_User">;
    } | null;
};
export type PayingYouContainer_Query = {
    readonly response: PayingYouContainer_QueryResponse;
    readonly variables: PayingYouContainer_QueryVariables;
};



/*
query PayingYouContainer_Query {
  currentUser {
    ...PayingYou_User
    id
  }
}

fragment PayingYou_User on User {
  canSetupPayoutMethod
  payoutMethods {
    id
    payoutMethodType
    status
    ...PayoutMethod_PayoutMethod
  }
  configuration {
    payoutMethodTypes
    stripeConnectSupportedCountries
  }
}

fragment PayoutMethod_PayoutMethod on PayoutMethod {
  id
  status
  payoutMethodType
  isDefault
  setupUrl
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PayingYouContainer_Query",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "PayingYou_User"
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
    "name": "PayingYouContainer_Query",
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
            "kind": "ScalarField",
            "name": "canSetupPayoutMethod",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PayoutMethod",
            "kind": "LinkedField",
            "name": "payoutMethods",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "payoutMethodType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "status",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isDefault",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "setupUrl",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Configuration",
            "kind": "LinkedField",
            "name": "configuration",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "payoutMethodTypes",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "stripeConnectSupportedCountries",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f737a6d034b22a3d2d4550c7f5e015e6",
    "id": null,
    "metadata": {},
    "name": "PayingYouContainer_Query",
    "operationKind": "query",
    "text": "query PayingYouContainer_Query {\n  currentUser {\n    ...PayingYou_User\n    id\n  }\n}\n\nfragment PayingYou_User on User {\n  canSetupPayoutMethod\n  payoutMethods {\n    id\n    payoutMethodType\n    status\n    ...PayoutMethod_PayoutMethod\n  }\n  configuration {\n    payoutMethodTypes\n    stripeConnectSupportedCountries\n  }\n}\n\nfragment PayoutMethod_PayoutMethod on PayoutMethod {\n  id\n  status\n  payoutMethodType\n  isDefault\n  setupUrl\n}\n"
  }
};
})();
(node as any).hash = '18c8f04595b3a697f86d189caa48f2e2';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type SetupStripeConnectedAccountInput = {
    clientMutationId?: string | null;
};
export type StripeConnectItem_MutationVariables = {
    input: SetupStripeConnectedAccountInput;
};
export type StripeConnectItem_MutationResponse = {
    readonly setupStripeConnectedAccount: {
        readonly payoutMethod: {
            readonly status: string;
            readonly setupUrl: string | null;
        } | null;
    } | null;
};
export type StripeConnectItem_Mutation = {
    readonly response: StripeConnectItem_MutationResponse;
    readonly variables: StripeConnectItem_MutationVariables;
};



/*
mutation StripeConnectItem_Mutation(
  $input: SetupStripeConnectedAccountInput!
) {
  setupStripeConnectedAccount(input: $input) {
    payoutMethod {
      status
      setupUrl
      id
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
  "name": "status",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "setupUrl",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StripeConnectItem_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetupStripeConnectedAccountPayload",
        "kind": "LinkedField",
        "name": "setupStripeConnectedAccount",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PayoutMethod",
            "kind": "LinkedField",
            "name": "payoutMethod",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
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
    "name": "StripeConnectItem_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetupStripeConnectedAccountPayload",
        "kind": "LinkedField",
        "name": "setupStripeConnectedAccount",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PayoutMethod",
            "kind": "LinkedField",
            "name": "payoutMethod",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e1941d9bb7a5d44d69fa649d1f0ba483",
    "id": null,
    "metadata": {},
    "name": "StripeConnectItem_Mutation",
    "operationKind": "mutation",
    "text": "mutation StripeConnectItem_Mutation(\n  $input: SetupStripeConnectedAccountInput!\n) {\n  setupStripeConnectedAccount(input: $input) {\n    payoutMethod {\n      status\n      setupUrl\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '71597bd45571efbe3994bfa44dedf513';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type SetupPayoneerInput = {
    clientMutationId?: string | null;
};
export type PayoneerItem_MutationVariables = {
    input: SetupPayoneerInput;
};
export type PayoneerItem_MutationResponse = {
    readonly setupPayoneer: {
        readonly message: string | null;
        readonly payoutMethod: {
            readonly status: string;
            readonly setupUrl: string | null;
        } | null;
    } | null;
};
export type PayoneerItem_Mutation = {
    readonly response: PayoneerItem_MutationResponse;
    readonly variables: PayoneerItem_MutationVariables;
};



/*
mutation PayoneerItem_Mutation(
  $input: SetupPayoneerInput!
) {
  setupPayoneer(input: $input) {
    message
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
  "name": "message",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v4 = {
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
    "name": "PayoneerItem_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetupPayoneerPayload",
        "kind": "LinkedField",
        "name": "setupPayoneer",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "PayoutMethod",
            "kind": "LinkedField",
            "name": "payoutMethod",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
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
    "name": "PayoneerItem_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetupPayoneerPayload",
        "kind": "LinkedField",
        "name": "setupPayoneer",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "PayoutMethod",
            "kind": "LinkedField",
            "name": "payoutMethod",
            "plural": false,
            "selections": [
              (v3/*: any*/),
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d92a583d712a42d4995d0792d170a71d",
    "id": null,
    "metadata": {},
    "name": "PayoneerItem_Mutation",
    "operationKind": "mutation",
    "text": "mutation PayoneerItem_Mutation(\n  $input: SetupPayoneerInput!\n) {\n  setupPayoneer(input: $input) {\n    message\n    payoutMethod {\n      status\n      setupUrl\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '817b8e39dd7b79be4de0d0bc704ce879';
export default node;

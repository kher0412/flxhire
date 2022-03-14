/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UpdateEmailSubscriptionInput = {
    clientMutationId?: string | null;
    id: string;
    userEnabled?: boolean | null;
};
export type EmailSettings_UpdateEmailSubscriptionMutationVariables = {
    input: UpdateEmailSubscriptionInput;
};
export type EmailSettings_UpdateEmailSubscriptionMutationResponse = {
    readonly updateEmailSubscription: {
        readonly emailSubscription: {
            readonly userEnabled: boolean | null;
        } | null;
    } | null;
};
export type EmailSettings_UpdateEmailSubscriptionMutation = {
    readonly response: EmailSettings_UpdateEmailSubscriptionMutationResponse;
    readonly variables: EmailSettings_UpdateEmailSubscriptionMutationVariables;
};



/*
mutation EmailSettings_UpdateEmailSubscriptionMutation(
  $input: UpdateEmailSubscriptionInput!
) {
  updateEmailSubscription(input: $input) {
    emailSubscription {
      userEnabled
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
  "name": "userEnabled",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EmailSettings_UpdateEmailSubscriptionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateEmailSubscriptionPayload",
        "kind": "LinkedField",
        "name": "updateEmailSubscription",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EmailSubscription",
            "kind": "LinkedField",
            "name": "emailSubscription",
            "plural": false,
            "selections": [
              (v2/*: any*/)
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
    "name": "EmailSettings_UpdateEmailSubscriptionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateEmailSubscriptionPayload",
        "kind": "LinkedField",
        "name": "updateEmailSubscription",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EmailSubscription",
            "kind": "LinkedField",
            "name": "emailSubscription",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ff614fde12174442d923e65b4212815b",
    "id": null,
    "metadata": {},
    "name": "EmailSettings_UpdateEmailSubscriptionMutation",
    "operationKind": "mutation",
    "text": "mutation EmailSettings_UpdateEmailSubscriptionMutation(\n  $input: UpdateEmailSubscriptionInput!\n) {\n  updateEmailSubscription(input: $input) {\n    emailSubscription {\n      userEnabled\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a378d799c230aead7cc1b4cc05ec2b8b';
export default node;

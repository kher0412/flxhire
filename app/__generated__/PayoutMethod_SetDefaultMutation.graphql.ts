/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UpdateUserInput = {
    accept?: boolean | null;
    avatarUrl?: string | null;
    clientMutationId?: string | null;
    currentPassword?: string | null;
    defaultPayoutMethodId?: string | null;
    email?: string | null;
    firstName?: string | null;
    hidden?: boolean | null;
    lastName?: string | null;
    password?: string | null;
    phone?: string | null;
    profile?: ProfileAttributes | null;
    reject?: boolean | null;
    sendTimesheetReminders?: boolean | null;
    status?: string | null;
    teamInvitationMessage?: string | null;
    userId?: string | null;
};
export type ProfileAttributes = {
    addressRecipient?: string | null;
    cityRecipient?: string | null;
    countryRecipient?: string | null;
    stateRecipient?: string | null;
    taxId?: string | null;
    usCitizen?: boolean | null;
    visibility?: string | null;
    zip?: string | null;
};
export type PayoutMethod_SetDefaultMutationVariables = {
    input: UpdateUserInput;
};
export type PayoutMethod_SetDefaultMutationResponse = {
    readonly updateUser: {
        readonly user: {
            readonly payoutMethods: ReadonlyArray<{
                readonly setupUrl: string | null;
                readonly isDefault: boolean | null;
            }> | null;
        } | null;
    } | null;
};
export type PayoutMethod_SetDefaultMutation = {
    readonly response: PayoutMethod_SetDefaultMutationResponse;
    readonly variables: PayoutMethod_SetDefaultMutationVariables;
};



/*
mutation PayoutMethod_SetDefaultMutation(
  $input: UpdateUserInput!
) {
  updateUser(input: $input) {
    user {
      payoutMethods {
        setupUrl
        isDefault
        id
      }
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
  "name": "setupUrl",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDefault",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PayoutMethod_SetDefaultMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateUserPayload",
        "kind": "LinkedField",
        "name": "updateUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PayoutMethod",
                "kind": "LinkedField",
                "name": "payoutMethods",
                "plural": true,
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
    "name": "PayoutMethod_SetDefaultMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateUserPayload",
        "kind": "LinkedField",
        "name": "updateUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PayoutMethod",
                "kind": "LinkedField",
                "name": "payoutMethods",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8756fe95d13478237dd2e0f3ee8ef3f9",
    "id": null,
    "metadata": {},
    "name": "PayoutMethod_SetDefaultMutation",
    "operationKind": "mutation",
    "text": "mutation PayoutMethod_SetDefaultMutation(\n  $input: UpdateUserInput!\n) {\n  updateUser(input: $input) {\n    user {\n      payoutMethods {\n        setupUrl\n        isDefault\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '79c3f2aa2a50e7edd7a2154cd533d2a7';
export default node;

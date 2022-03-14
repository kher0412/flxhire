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
export type AdminTools_UpdateUserMutationVariables = {
    input: UpdateUserInput;
};
export type AdminTools_UpdateUserMutationResponse = {
    readonly updateUser: {
        readonly user: {
            readonly status: string | null;
            readonly hidden: boolean | null;
        } | null;
    } | null;
};
export type AdminTools_UpdateUserMutation = {
    readonly response: AdminTools_UpdateUserMutationResponse;
    readonly variables: AdminTools_UpdateUserMutationVariables;
};



/*
mutation AdminTools_UpdateUserMutation(
  $input: UpdateUserInput!
) {
  updateUser(input: $input) {
    user {
      status
      hidden
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
  "name": "hidden",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AdminTools_UpdateUserMutation",
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
    "name": "AdminTools_UpdateUserMutation",
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
    "cacheID": "576cd5cecf198da4234109a34bd4cb8b",
    "id": null,
    "metadata": {},
    "name": "AdminTools_UpdateUserMutation",
    "operationKind": "mutation",
    "text": "mutation AdminTools_UpdateUserMutation(\n  $input: UpdateUserInput!\n) {\n  updateUser(input: $input) {\n    user {\n      status\n      hidden\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6b74b8d8c99ed1793a1703efbb425b3b';
export default node;

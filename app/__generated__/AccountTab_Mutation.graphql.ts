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
export type AccountTab_MutationVariables = {
    input: UpdateUserInput;
};
export type AccountTab_MutationResponse = {
    readonly updateUser: {
        readonly user: {
            readonly avatarUrl: string | null;
            readonly firstName: string | null;
            readonly lastName: string | null;
            readonly email: string | null;
            readonly unconfirmedEmail: string | null;
            readonly phone: string | null;
            readonly teamInvitationMessage: string | null;
            readonly sendTimesheetReminders: boolean | null;
            readonly profile: {
                readonly visibility: string | null;
            } | null;
        } | null;
    } | null;
};
export type AccountTab_Mutation = {
    readonly response: AccountTab_MutationResponse;
    readonly variables: AccountTab_MutationVariables;
};



/*
mutation AccountTab_Mutation(
  $input: UpdateUserInput!
) {
  updateUser(input: $input) {
    user {
      avatarUrl
      firstName
      lastName
      email
      unconfirmedEmail
      phone
      teamInvitationMessage
      sendTimesheetReminders
      profile {
        visibility
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
  "name": "avatarUrl",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unconfirmedEmail",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phone",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "teamInvitationMessage",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sendTimesheetReminders",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visibility",
  "storageKey": null
},
v11 = {
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
    "name": "AccountTab_Mutation",
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
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  (v10/*: any*/)
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
    "name": "AccountTab_Mutation",
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
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  (v10/*: any*/),
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              (v11/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "333dc2c77be75790f27e1b1521caa95d",
    "id": null,
    "metadata": {},
    "name": "AccountTab_Mutation",
    "operationKind": "mutation",
    "text": "mutation AccountTab_Mutation(\n  $input: UpdateUserInput!\n) {\n  updateUser(input: $input) {\n    user {\n      avatarUrl\n      firstName\n      lastName\n      email\n      unconfirmedEmail\n      phone\n      teamInvitationMessage\n      sendTimesheetReminders\n      profile {\n        visibility\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '461f175de683ed78c36778af24981453';
export default node;

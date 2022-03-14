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
export type TaxComplianceContainer_UpdateUserMutationVariables = {
    input: UpdateUserInput;
};
export type TaxComplianceContainer_UpdateUserMutationResponse = {
    readonly updateUser: {
        readonly user: {
            readonly id: string;
        } | null;
    } | null;
};
export type TaxComplianceContainer_UpdateUserMutation = {
    readonly response: TaxComplianceContainer_UpdateUserMutationResponse;
    readonly variables: TaxComplianceContainer_UpdateUserMutationVariables;
};



/*
mutation TaxComplianceContainer_UpdateUserMutation(
  $input: UpdateUserInput!
) {
  updateUser(input: $input) {
    user {
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TaxComplianceContainer_UpdateUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TaxComplianceContainer_UpdateUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8d44db26ec6423672ba5e535018c55fc",
    "id": null,
    "metadata": {},
    "name": "TaxComplianceContainer_UpdateUserMutation",
    "operationKind": "mutation",
    "text": "mutation TaxComplianceContainer_UpdateUserMutation(\n  $input: UpdateUserInput!\n) {\n  updateUser(input: $input) {\n    user {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '9cd59d032d3180b06f502c1118663eab';
export default node;

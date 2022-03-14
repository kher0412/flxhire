/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ResendInvitationEmailInput = {
    clientMutationId?: string | null;
    contractId: string;
};
export type TeamMemberActions_ResendInvitationEmailMutationVariables = {
    input: ResendInvitationEmailInput;
};
export type TeamMemberActions_ResendInvitationEmailMutationResponse = {
    readonly resendInvitationEmail: {
        readonly contract: {
            readonly lastInteractionAt: string | null;
        } | null;
    } | null;
};
export type TeamMemberActions_ResendInvitationEmailMutation = {
    readonly response: TeamMemberActions_ResendInvitationEmailMutationResponse;
    readonly variables: TeamMemberActions_ResendInvitationEmailMutationVariables;
};



/*
mutation TeamMemberActions_ResendInvitationEmailMutation(
  $input: ResendInvitationEmailInput!
) {
  resendInvitationEmail(input: $input) {
    contract {
      lastInteractionAt
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
  "name": "lastInteractionAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TeamMemberActions_ResendInvitationEmailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ResendInvitationEmailPayload",
        "kind": "LinkedField",
        "name": "resendInvitationEmail",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
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
    "name": "TeamMemberActions_ResendInvitationEmailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ResendInvitationEmailPayload",
        "kind": "LinkedField",
        "name": "resendInvitationEmail",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
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
    "cacheID": "2c80d6d93bf513a0eec5e0ea5896fae3",
    "id": null,
    "metadata": {},
    "name": "TeamMemberActions_ResendInvitationEmailMutation",
    "operationKind": "mutation",
    "text": "mutation TeamMemberActions_ResendInvitationEmailMutation(\n  $input: ResendInvitationEmailInput!\n) {\n  resendInvitationEmail(input: $input) {\n    contract {\n      lastInteractionAt\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7c214a762a01f1ea9a7ce1b6cd408463';
export default node;

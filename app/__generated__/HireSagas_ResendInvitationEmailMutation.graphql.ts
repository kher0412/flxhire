/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ResendInvitationEmailInput = {
    clientMutationId?: string | null;
    contractId: string;
};
export type HireSagas_ResendInvitationEmailMutationVariables = {
    input: ResendInvitationEmailInput;
};
export type HireSagas_ResendInvitationEmailMutationResponse = {
    readonly resendInvitationEmail: {
        readonly contract: {
            readonly lastInteractionAt: string | null;
        } | null;
    } | null;
};
export type HireSagas_ResendInvitationEmailMutation = {
    readonly response: HireSagas_ResendInvitationEmailMutationResponse;
    readonly variables: HireSagas_ResendInvitationEmailMutationVariables;
};



/*
mutation HireSagas_ResendInvitationEmailMutation(
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
    "name": "HireSagas_ResendInvitationEmailMutation",
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
    "name": "HireSagas_ResendInvitationEmailMutation",
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
    "cacheID": "a7d83cd639b61139052e9d68e6eca29b",
    "id": null,
    "metadata": {},
    "name": "HireSagas_ResendInvitationEmailMutation",
    "operationKind": "mutation",
    "text": "mutation HireSagas_ResendInvitationEmailMutation(\n  $input: ResendInvitationEmailInput!\n) {\n  resendInvitationEmail(input: $input) {\n    contract {\n      lastInteractionAt\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '43c1d5b15f1408e7a34d5c423e362300';
export default node;

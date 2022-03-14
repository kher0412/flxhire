/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ContractBonusPeriod = "monthly" | "yearly";
export type RateMode = "day" | "hour" | "month" | "year";
export type SendInvitationInput = {
    allowHireAccess?: boolean | null;
    allowManageAccess?: boolean | null;
    annualCompensation?: MoneyInput | null;
    bonusClientRate?: MoneyInput | null;
    bonusPeriod?: ContractBonusPeriod | null;
    clientId?: string | null;
    clientMutationId?: string | null;
    clientRate?: MoneyInput | null;
    currency?: string | null;
    endDate?: string | null;
    freelancerEmail: string;
    freelancerFirstName: string;
    freelancerLastName: string;
    invitationMessage?: string | null;
    invoiceSchedule?: string | null;
    isFirmAdmin?: boolean | null;
    jobId?: string | null;
    paymentMode?: string | null;
    rateMode?: RateMode | null;
    startDate: string;
};
export type MoneyInput = {
    currencyCode: string;
    value: number;
};
export type InvitationTeamContainer_SendInvitationManagerMutationVariables = {
    input: SendInvitationInput;
};
export type InvitationTeamContainer_SendInvitationManagerMutationResponse = {
    readonly sendInvitation: {
        readonly contract: {
            readonly freelancerFirstName: string | null;
            readonly freelancerLastName: string | null;
            readonly freelancerEmail: string | null;
            readonly invitationType: string | null;
            readonly client: {
                readonly name: string | null;
                readonly id: string;
            } | null;
        } | null;
    } | null;
};
export type InvitationTeamContainer_SendInvitationManagerMutation = {
    readonly response: InvitationTeamContainer_SendInvitationManagerMutationResponse;
    readonly variables: InvitationTeamContainer_SendInvitationManagerMutationVariables;
};



/*
mutation InvitationTeamContainer_SendInvitationManagerMutation(
  $input: SendInvitationInput!
) {
  sendInvitation(input: $input) {
    contract {
      freelancerFirstName
      freelancerLastName
      freelancerEmail
      invitationType
      client {
        name
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
  "name": "freelancerFirstName",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "freelancerLastName",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "freelancerEmail",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "invitationType",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "client",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v6/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InvitationTeamContainer_SendInvitationManagerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendInvitationPayload",
        "kind": "LinkedField",
        "name": "sendInvitation",
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
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v7/*: any*/)
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
    "name": "InvitationTeamContainer_SendInvitationManagerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendInvitationPayload",
        "kind": "LinkedField",
        "name": "sendInvitation",
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
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v7/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0871d365f0975a8d005c86a8235e3f4e",
    "id": null,
    "metadata": {},
    "name": "InvitationTeamContainer_SendInvitationManagerMutation",
    "operationKind": "mutation",
    "text": "mutation InvitationTeamContainer_SendInvitationManagerMutation(\n  $input: SendInvitationInput!\n) {\n  sendInvitation(input: $input) {\n    contract {\n      freelancerFirstName\n      freelancerLastName\n      freelancerEmail\n      invitationType\n      client {\n        name\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '108a2393be71b55bef45a5468ae780ff';
export default node;

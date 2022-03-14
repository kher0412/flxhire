/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type RejectBonusInput = {
    bonusId: string;
    clientMutationId?: string | null;
};
export type BonusList_DeleteBonusMutationVariables = {
    input: RejectBonusInput;
    connections: Array<string>;
};
export type BonusList_DeleteBonusMutationResponse = {
    readonly rejectBonus: {
        readonly bonus: {
            readonly id: string | null;
        } | null;
    } | null;
};
export type BonusList_DeleteBonusMutation = {
    readonly response: BonusList_DeleteBonusMutationResponse;
    readonly variables: BonusList_DeleteBonusMutationVariables;
};



/*
mutation BonusList_DeleteBonusMutation(
  $input: RejectBonusInput!
) {
  rejectBonus(input: $input) {
    bonus {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "BonusList_DeleteBonusMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RejectBonusPayload",
        "kind": "LinkedField",
        "name": "rejectBonus",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Bonus",
            "kind": "LinkedField",
            "name": "bonus",
            "plural": false,
            "selections": [
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "BonusList_DeleteBonusMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RejectBonusPayload",
        "kind": "LinkedField",
        "name": "rejectBonus",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Bonus",
            "kind": "LinkedField",
            "name": "bonus",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteEdge",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connections"
                  }
                ]
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
    "cacheID": "ca4ebfb7c8eed0df61860eac13d26ff2",
    "id": null,
    "metadata": {},
    "name": "BonusList_DeleteBonusMutation",
    "operationKind": "mutation",
    "text": "mutation BonusList_DeleteBonusMutation(\n  $input: RejectBonusInput!\n) {\n  rejectBonus(input: $input) {\n    bonus {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '44f77bde33776537e2d892978135ea4b';
export default node;

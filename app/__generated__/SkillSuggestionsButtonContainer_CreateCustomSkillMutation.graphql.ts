/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CreateCustomSkillInput = {
    clientMutationId?: string | null;
    freelancerTypeIds: Array<number>;
    name: string;
};
export type SkillSuggestionsButtonContainer_CreateCustomSkillMutationVariables = {
    input: CreateCustomSkillInput;
};
export type SkillSuggestionsButtonContainer_CreateCustomSkillMutationResponse = {
    readonly createCustomSkill: {
        readonly skill: {
            readonly name: string | null;
        } | null;
    } | null;
};
export type SkillSuggestionsButtonContainer_CreateCustomSkillMutation = {
    readonly response: SkillSuggestionsButtonContainer_CreateCustomSkillMutationResponse;
    readonly variables: SkillSuggestionsButtonContainer_CreateCustomSkillMutationVariables;
};



/*
mutation SkillSuggestionsButtonContainer_CreateCustomSkillMutation(
  $input: CreateCustomSkillInput!
) {
  createCustomSkill(input: $input) {
    skill {
      name
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
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SkillSuggestionsButtonContainer_CreateCustomSkillMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateCustomSkillPayload",
        "kind": "LinkedField",
        "name": "createCustomSkill",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Skill",
            "kind": "LinkedField",
            "name": "skill",
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
    "name": "SkillSuggestionsButtonContainer_CreateCustomSkillMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateCustomSkillPayload",
        "kind": "LinkedField",
        "name": "createCustomSkill",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Skill",
            "kind": "LinkedField",
            "name": "skill",
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
    "cacheID": "84a2d66142a78c678d1b0307a8671695",
    "id": null,
    "metadata": {},
    "name": "SkillSuggestionsButtonContainer_CreateCustomSkillMutation",
    "operationKind": "mutation",
    "text": "mutation SkillSuggestionsButtonContainer_CreateCustomSkillMutation(\n  $input: CreateCustomSkillInput!\n) {\n  createCustomSkill(input: $input) {\n    skill {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '479aaace401c94e08930339fd3027602';
export default node;

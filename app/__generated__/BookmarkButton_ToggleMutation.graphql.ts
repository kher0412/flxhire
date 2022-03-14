/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ToggleBookmarkFreelancerInput = {
    clientMutationId?: string | null;
    contractId: string;
};
export type BookmarkButton_ToggleMutationVariables = {
    input: ToggleBookmarkFreelancerInput;
};
export type BookmarkButton_ToggleMutationResponse = {
    readonly toggleBookmarkFreelancer: {
        readonly contract: {
            readonly bookmarked: boolean | null;
        } | null;
    } | null;
};
export type BookmarkButton_ToggleMutation = {
    readonly response: BookmarkButton_ToggleMutationResponse;
    readonly variables: BookmarkButton_ToggleMutationVariables;
};



/*
mutation BookmarkButton_ToggleMutation(
  $input: ToggleBookmarkFreelancerInput!
) {
  toggleBookmarkFreelancer(input: $input) {
    contract {
      bookmarked
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
  "name": "bookmarked",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BookmarkButton_ToggleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ToggleBookmarkFreelancerPayload",
        "kind": "LinkedField",
        "name": "toggleBookmarkFreelancer",
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
    "name": "BookmarkButton_ToggleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ToggleBookmarkFreelancerPayload",
        "kind": "LinkedField",
        "name": "toggleBookmarkFreelancer",
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
    "cacheID": "9dc3d059ae411d8b9176f490b39b63ee",
    "id": null,
    "metadata": {},
    "name": "BookmarkButton_ToggleMutation",
    "operationKind": "mutation",
    "text": "mutation BookmarkButton_ToggleMutation(\n  $input: ToggleBookmarkFreelancerInput!\n) {\n  toggleBookmarkFreelancer(input: $input) {\n    contract {\n      bookmarked\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '03c016574567fee05ad2bfda78bb5592';
export default node;

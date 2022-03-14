/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type DeleteApiKeyInput = {
    clientMutationId?: string | null;
    id: string;
};
export type APIKeyListItem_DeleteMutationVariables = {
    input: DeleteApiKeyInput;
};
export type APIKeyListItem_DeleteMutationResponse = {
    readonly deleteApiKey: {
        readonly apiKey: {
            readonly id: string;
        } | null;
    } | null;
};
export type APIKeyListItem_DeleteMutation = {
    readonly response: APIKeyListItem_DeleteMutationResponse;
    readonly variables: APIKeyListItem_DeleteMutationVariables;
};



/*
mutation APIKeyListItem_DeleteMutation(
  $input: DeleteApiKeyInput!
) {
  deleteApiKey(input: $input) {
    apiKey {
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
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "APIKeyListItem_DeleteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteApiKeyPayload",
        "kind": "LinkedField",
        "name": "deleteApiKey",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ApiKey",
            "kind": "LinkedField",
            "name": "apiKey",
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
    "name": "APIKeyListItem_DeleteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteApiKeyPayload",
        "kind": "LinkedField",
        "name": "deleteApiKey",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ApiKey",
            "kind": "LinkedField",
            "name": "apiKey",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteRecord",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id"
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
    "cacheID": "b7628897db23fab13f073338b898c968",
    "id": null,
    "metadata": {},
    "name": "APIKeyListItem_DeleteMutation",
    "operationKind": "mutation",
    "text": "mutation APIKeyListItem_DeleteMutation(\n  $input: DeleteApiKeyInput!\n) {\n  deleteApiKey(input: $input) {\n    apiKey {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '892a9ddb23a004cd0777e928f4ba7271';
export default node;

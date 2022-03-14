/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type APIKeys_User = {
    readonly apiKeys: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"APIKeyListItem_ApiKey">;
    }> | null;
    readonly " $refType": "APIKeys_User";
};
export type APIKeys_User$data = APIKeys_User;
export type APIKeys_User$key = {
    readonly " $data"?: APIKeys_User$data;
    readonly " $fragmentRefs": FragmentRefs<"APIKeys_User">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "APIKeys_User",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ApiKey",
      "kind": "LinkedField",
      "name": "apiKeys",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "APIKeyListItem_ApiKey"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '2a44bf5a65d70506dcbe8aa5a543cd2c';
export default node;

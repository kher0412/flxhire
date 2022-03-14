/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type APIKeyListItem_ApiKey = {
    readonly id: string;
    readonly keySlice: string | null;
    readonly createdAt: string | null;
    readonly lastUsedAt: string | null;
    readonly user: {
        readonly name: string | null;
    } | null;
    readonly " $refType": "APIKeyListItem_ApiKey";
};
export type APIKeyListItem_ApiKey$data = APIKeyListItem_ApiKey;
export type APIKeyListItem_ApiKey$key = {
    readonly " $data"?: APIKeyListItem_ApiKey$data;
    readonly " $fragmentRefs": FragmentRefs<"APIKeyListItem_ApiKey">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "APIKeyListItem_ApiKey",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "keySlice",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastUsedAt",
      "storageKey": null
    },
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
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ApiKey",
  "abstractKey": null
};
(node as any).hash = 'b7a6b40f7b76ecd4a42ac270058879ac';
export default node;

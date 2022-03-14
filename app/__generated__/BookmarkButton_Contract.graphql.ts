/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type BookmarkButton_Contract = {
    readonly id: string;
    readonly bookmarked: boolean | null;
    readonly " $refType": "BookmarkButton_Contract";
};
export type BookmarkButton_Contract$data = BookmarkButton_Contract;
export type BookmarkButton_Contract$key = {
    readonly " $data"?: BookmarkButton_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"BookmarkButton_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BookmarkButton_Contract",
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
      "name": "bookmarked",
      "storageKey": null
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = 'feadc62d3eacce9c29b6bfb08af95c52';
export default node;

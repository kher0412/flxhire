/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type AdminTools_Freelancer = {
    readonly id: string;
    readonly rawId: number | null;
    readonly hidden: boolean | null;
    readonly status: string | null;
    readonly " $refType": "AdminTools_Freelancer";
};
export type AdminTools_Freelancer$data = AdminTools_Freelancer;
export type AdminTools_Freelancer$key = {
    readonly " $data"?: AdminTools_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"AdminTools_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminTools_Freelancer",
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
      "name": "rawId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hidden",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '0638380720f73939bcd8491dbf5d48d1';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ManagerSelect_Firm = {
    readonly users: ReadonlyArray<{
        readonly id: string;
        readonly rawId: number | null;
        readonly name: string | null;
    }> | null;
    readonly " $refType": "ManagerSelect_Firm";
};
export type ManagerSelect_Firm$data = ManagerSelect_Firm;
export type ManagerSelect_Firm$key = {
    readonly " $data"?: ManagerSelect_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"ManagerSelect_Firm">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ManagerSelect_Firm",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "users",
      "plural": true,
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
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Firm",
  "abstractKey": null
};
(node as any).hash = '5fff509dd61f6b88ae1aca3e297aee6b';
export default node;

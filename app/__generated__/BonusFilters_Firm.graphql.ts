/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type BonusFilters_Firm = {
    readonly users: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
    }> | null;
    readonly " $refType": "BonusFilters_Firm";
};
export type BonusFilters_Firm$data = BonusFilters_Firm;
export type BonusFilters_Firm$key = {
    readonly " $data"?: BonusFilters_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"BonusFilters_Firm">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BonusFilters_Firm",
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
(node as any).hash = '761bf208c945f10f5e0135e534082e5f';
export default node;

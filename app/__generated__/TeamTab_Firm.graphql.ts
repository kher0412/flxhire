/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type TeamTab_Firm = {
    readonly users: ReadonlyArray<{
        readonly id: string;
        readonly rawId: number | null;
    }> | null;
    readonly " $fragmentRefs": FragmentRefs<"TeamList_Firm" | "ManageSidebar_Firm">;
    readonly " $refType": "TeamTab_Firm";
};
export type TeamTab_Firm$data = TeamTab_Firm;
export type TeamTab_Firm$key = {
    readonly " $data"?: TeamTab_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"TeamTab_Firm">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TeamTab_Firm",
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
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TeamList_Firm"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManageSidebar_Firm"
    }
  ],
  "type": "Firm",
  "abstractKey": null
};
(node as any).hash = '4d5221be6d647404939dd04a4adab952';
export default node;

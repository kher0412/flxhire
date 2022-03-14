/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PayrollFilters_Firm = {
    readonly users: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
    }> | null;
    readonly " $refType": "PayrollFilters_Firm";
};
export type PayrollFilters_Firm$data = PayrollFilters_Firm;
export type PayrollFilters_Firm$key = {
    readonly " $data"?: PayrollFilters_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"PayrollFilters_Firm">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PayrollFilters_Firm",
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
(node as any).hash = '7286be41180cc9214791f734a6afb959';
export default node;

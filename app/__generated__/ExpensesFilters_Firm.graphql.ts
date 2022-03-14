/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ExpensesFilters_Firm = {
    readonly users: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
    }> | null;
    readonly " $refType": "ExpensesFilters_Firm";
};
export type ExpensesFilters_Firm$data = ExpensesFilters_Firm;
export type ExpensesFilters_Firm$key = {
    readonly " $data"?: ExpensesFilters_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"ExpensesFilters_Firm">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExpensesFilters_Firm",
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
(node as any).hash = 'd4fb8010abf95bcdf1b3b17633581c37';
export default node;

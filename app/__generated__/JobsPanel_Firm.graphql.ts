/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobsPanel_Firm = {
    readonly users: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
        readonly self: boolean | null;
    }> | null;
    readonly " $refType": "JobsPanel_Firm";
};
export type JobsPanel_Firm$data = JobsPanel_Firm;
export type JobsPanel_Firm$key = {
    readonly " $data"?: JobsPanel_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"JobsPanel_Firm">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JobsPanel_Firm",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "self",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Firm",
  "abstractKey": null
};
(node as any).hash = '0190bbe296523fe2fccbc4e0d7df61d9';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ManageFiltersPanel_Firm = {
    readonly tags: ReadonlyArray<{
        readonly rawId: number;
        readonly name: string | null;
    }> | null;
    readonly jobs: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly rawId: number | null;
                readonly title: string;
            } | null;
        } | null> | null;
    } | null;
    readonly skills: ReadonlyArray<{
        readonly rawId: number | null;
        readonly name: string | null;
    }> | null;
    readonly " $fragmentRefs": FragmentRefs<"ManagerFilter_Firm">;
    readonly " $refType": "ManageFiltersPanel_Firm";
};
export type ManageFiltersPanel_Firm$data = ManageFiltersPanel_Firm;
export type ManageFiltersPanel_Firm$key = {
    readonly " $data"?: ManageFiltersPanel_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"ManageFiltersPanel_Firm">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ManageFiltersPanel_Firm",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Tag",
      "kind": "LinkedField",
      "name": "tags",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "JobConnection",
      "kind": "LinkedField",
      "name": "jobs",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "JobEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Job",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "title",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "jobs(first:20)"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Skill",
      "kind": "LinkedField",
      "name": "skills",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManagerFilter_Firm"
    }
  ],
  "type": "Firm",
  "abstractKey": null
};
})();
(node as any).hash = 'c103c6cf66a1f2a674d6f86fb0922e04';
export default node;

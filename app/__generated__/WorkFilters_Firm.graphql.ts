/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type WorkFilters_Firm = {
    readonly users: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
    }> | null;
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
    readonly " $refType": "WorkFilters_Firm";
};
export type WorkFilters_Firm$data = WorkFilters_Firm;
export type WorkFilters_Firm$key = {
    readonly " $data"?: WorkFilters_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"WorkFilters_Firm">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v3 = [
  (v2/*: any*/),
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorkFilters_Firm",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "users",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Tag",
      "kind": "LinkedField",
      "name": "tags",
      "plural": true,
      "selections": (v3/*: any*/),
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
                (v0/*: any*/),
                (v2/*: any*/),
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
      "selections": (v3/*: any*/),
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
(node as any).hash = 'a60325e5f91e84cc4c131fbf2a4dfef0';
export default node;

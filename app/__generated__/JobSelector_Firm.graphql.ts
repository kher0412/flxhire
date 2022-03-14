/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobStatus = "closed" | "draft" | "opened";
export type JobSelector_Firm = {
    readonly selectableJobs: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly slug: string | null;
                readonly title: string;
                readonly status: JobStatus | null;
                readonly user: {
                    readonly firm: {
                        readonly slug: string | null;
                    } | null;
                } | null;
                readonly autoSendScreeningRequests: boolean | null;
                readonly rawId: number | null;
                readonly " $fragmentRefs": FragmentRefs<"HireHooks_JobDefaultFilters" | "Sidebar_Job" | "Candidates_Job" | "Applications_Job">;
            } | null;
        } | null> | null;
    } | null;
    readonly name: string | null;
    readonly " $refType": "JobSelector_Firm";
};
export type JobSelector_Firm$data = JobSelector_Firm;
export type JobSelector_Firm$key = {
    readonly " $data"?: JobSelector_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"JobSelector_Firm">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JobSelector_Firm",
  "selections": [
    {
      "alias": "selectableJobs",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "status",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "User",
                  "kind": "LinkedField",
                  "name": "user",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Firm",
                      "kind": "LinkedField",
                      "name": "firm",
                      "plural": false,
                      "selections": [
                        (v0/*: any*/)
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "autoSendScreeningRequests",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "HireHooks_JobDefaultFilters"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "Sidebar_Job"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "Candidates_Job"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "Applications_Job"
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
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Firm",
  "abstractKey": null
};
})();
(node as any).hash = 'a073eaf84898da031c57b8550bb1a831';
export default node;

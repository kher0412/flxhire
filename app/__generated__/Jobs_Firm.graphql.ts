/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import HireJobsPaginationQuery from "./HireJobsPaginationQuery.graphql";
import { FragmentRefs } from "relay-runtime";
export type Jobs_Firm = {
    readonly jobs: {
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"Job_Job">;
            } | null;
        } | null> | null;
    } | null;
    readonly id: string;
    readonly " $refType": "Jobs_Firm";
};
export type Jobs_Firm$data = Jobs_Firm;
export type Jobs_Firm$key = {
    readonly " $data"?: Jobs_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"Jobs_Firm">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "jobs"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": 5,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "filters"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": HireJobsPaginationQuery,
      "identifierField": "id"
    }
  },
  "name": "Jobs_Firm",
  "selections": [
    {
      "alias": "jobs",
      "args": [
        {
          "kind": "Variable",
          "name": "filters",
          "variableName": "filters"
        }
      ],
      "concreteType": "JobConnection",
      "kind": "LinkedField",
      "name": "__Jobs_jobs_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
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
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "Job_Job"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v1/*: any*/)
  ],
  "type": "Firm",
  "abstractKey": null
};
})();
(node as any).hash = '187b6d6bc4042eeee66588e95c60dd34';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import HireFirmsPaginationQuery from "./HireFirmsPaginationQuery.graphql";
import { FragmentRefs } from "relay-runtime";
export type FirmSelector_Query = {
    readonly firms: {
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly slug: string | null;
                readonly name: string | null;
                readonly jobs: {
                    readonly totalCount: number | null;
                } | null;
            } | null;
        } | null> | null;
    };
    readonly " $refType": "FirmSelector_Query";
};
export type FirmSelector_Query$data = FirmSelector_Query;
export type FirmSelector_Query$key = {
    readonly " $data"?: FirmSelector_Query$data;
    readonly " $fragmentRefs": FragmentRefs<"FirmSelector_Query">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "firms"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
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
      "fragmentPathInResult": [],
      "operation": HireFirmsPaginationQuery
    }
  },
  "name": "FirmSelector_Query",
  "selections": [
    {
      "alias": "firms",
      "args": null,
      "concreteType": "FirmConnection",
      "kind": "LinkedField",
      "name": "__FirmSelector_firms_connection",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "FirmEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Firm",
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "slug",
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
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "filters",
                      "value": {
                        "status": "opened"
                      }
                    }
                  ],
                  "concreteType": "JobConnection",
                  "kind": "LinkedField",
                  "name": "jobs",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/)
                  ],
                  "storageKey": "jobs(filters:{\"status\":\"opened\"})"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
(node as any).hash = '5c8e6e031289fd7877055ed05e51a836';
export default node;

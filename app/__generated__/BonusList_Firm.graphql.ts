/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import BonusList_bonuses from "./BonusList_bonuses.graphql";
import { FragmentRefs } from "relay-runtime";
export type BonusList_Firm = {
    readonly bonuses: {
        readonly __id: string;
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string | null;
                readonly " $fragmentRefs": FragmentRefs<"BonusRow_Bonus" | "BonusCard_Bonus">;
            } | null;
        } | null> | null;
    } | null;
    readonly id: string;
    readonly " $refType": "BonusList_Firm";
};
export type BonusList_Firm$data = BonusList_Firm;
export type BonusList_Firm$key = {
    readonly " $data"?: BonusList_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"BonusList_Firm">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "bonuses"
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
      "operation": BonusList_bonuses,
      "identifierField": "id"
    }
  },
  "name": "BonusList_Firm",
  "selections": [
    {
      "alias": "bonuses",
      "args": [
        {
          "kind": "Variable",
          "name": "filters",
          "variableName": "filters"
        }
      ],
      "concreteType": "BonusConnection",
      "kind": "LinkedField",
      "name": "__BonusList_bonuses_connection",
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
          "concreteType": "BonusEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Bonus",
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
                  "name": "BonusRow_Bonus"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "BonusCard_Bonus"
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
        },
        {
          "kind": "ClientExtension",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__id",
              "storageKey": null
            }
          ]
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
(node as any).hash = 'bbde71164786c7885ff45fedf6c09800';
export default node;

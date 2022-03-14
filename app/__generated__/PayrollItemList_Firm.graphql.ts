/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import PayrollItemList_payrollItems from "./PayrollItemList_payrollItems.graphql";
import { FragmentRefs } from "relay-runtime";
export type PayrollItemList_Firm = {
    readonly payrollItems: {
        readonly __id: string;
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"PayrollItemRow_PayrollItem" | "PayrollItemCard_PayrollItem">;
            } | null;
        } | null> | null;
    } | null;
    readonly id: string;
    readonly " $refType": "PayrollItemList_Firm";
};
export type PayrollItemList_Firm$data = PayrollItemList_Firm;
export type PayrollItemList_Firm$key = {
    readonly " $data"?: PayrollItemList_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"PayrollItemList_Firm">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "payrollItems"
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
      "defaultValue": 10,
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
      "operation": PayrollItemList_payrollItems,
      "identifierField": "id"
    }
  },
  "name": "PayrollItemList_Firm",
  "selections": [
    {
      "alias": "payrollItems",
      "args": [
        {
          "kind": "Variable",
          "name": "filters",
          "variableName": "filters"
        }
      ],
      "concreteType": "PayrollItemConnection",
      "kind": "LinkedField",
      "name": "__PayrollItemList_payrollItems_connection",
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
          "concreteType": "PayrollItemEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "PayrollItem",
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
                  "name": "PayrollItemRow_PayrollItem"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PayrollItemCard_PayrollItem"
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
(node as any).hash = '549318477c7f2ff4084c897370d2c381';
export default node;

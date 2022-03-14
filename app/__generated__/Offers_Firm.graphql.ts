/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import Offers_offers from "./Offers_offers.graphql";
import { FragmentRefs } from "relay-runtime";
export type Offers_Firm = {
    readonly offers: {
        readonly __id: string;
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"Application_Contract">;
            } | null;
        } | null> | null;
    } | null;
    readonly id: string;
    readonly " $refType": "Offers_Firm";
};
export type Offers_Firm$data = Offers_Firm;
export type Offers_Firm$key = {
    readonly " $data"?: Offers_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"Offers_Firm">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "offers"
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
      "name": "jobId"
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
      "operation": Offers_offers,
      "identifierField": "id"
    }
  },
  "name": "Offers_Firm",
  "selections": [
    {
      "alias": "offers",
      "args": [
        {
          "fields": [
            {
              "kind": "Variable",
              "name": "jobId",
              "variableName": "jobId"
            },
            {
              "kind": "Literal",
              "name": "membersOnly",
              "value": true
            },
            {
              "kind": "Literal",
              "name": "stage",
              "value": "offer"
            }
          ],
          "kind": "ObjectValue",
          "name": "filters"
        }
      ],
      "concreteType": "ContractConnection",
      "kind": "LinkedField",
      "name": "__Offers_offers_connection",
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
          "concreteType": "ContractEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Contract",
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
                  "name": "Application_Contract"
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
(node as any).hash = '6d32a7d35cbdba3088f3bc3005bb94d8';
export default node;

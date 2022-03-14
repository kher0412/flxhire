/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import Screening_applications from "./Screening_applications.graphql";
import { FragmentRefs } from "relay-runtime";
export type Screening_Firm = {
    readonly screening: {
        readonly filteredOutIds: ReadonlyArray<number>;
        readonly filteredOutCount: number;
        readonly applications: {
            readonly totalCount: number | null;
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly rawId: number | null;
                    readonly " $fragmentRefs": FragmentRefs<"Application_Contract">;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly id: string;
    readonly " $refType": "Screening_Firm";
};
export type Screening_Firm$data = Screening_Firm;
export type Screening_Firm$key = {
    readonly " $data"?: Screening_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"Screening_Firm">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "screening",
  "applications"
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
      "operation": Screening_applications,
      "identifierField": "id"
    }
  },
  "name": "Screening_Firm",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "filters",
          "variableName": "filters"
        }
      ],
      "concreteType": "ApplicationsResults",
      "kind": "LinkedField",
      "name": "screening",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "filteredOutIds",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "filteredOutCount",
          "storageKey": null
        },
        {
          "alias": "applications",
          "args": null,
          "concreteType": "ContractConnection",
          "kind": "LinkedField",
          "name": "__Screening_applications_connection",
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
                      "name": "rawId",
                      "storageKey": null
                    },
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
(node as any).hash = 'cefadf10420eeb8acc5184dca347c3a5';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import Applications_applications from "./Applications_applications.graphql";
import { FragmentRefs } from "relay-runtime";
export type Applications_Firm = {
    readonly applications: {
        readonly filteredOutIds: ReadonlyArray<number>;
        readonly filteredOutCount: number;
        readonly applications: {
            readonly __id: string;
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
    readonly " $refType": "Applications_Firm";
};
export type Applications_Firm$data = Applications_Firm;
export type Applications_Firm$key = {
    readonly " $data"?: Applications_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"Applications_Firm">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "applications",
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
      "operation": Applications_applications,
      "identifierField": "id"
    }
  },
  "name": "Applications_Firm",
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
      "name": "applications",
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
          "name": "__Applications_applications_connection",
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
(node as any).hash = 'ba4bb921153cc2ff8cecca086b47a927';
export default node;

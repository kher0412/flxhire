/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import Candidates_candidates from "./Candidates_candidates.graphql";
import { FragmentRefs } from "relay-runtime";
export type Candidates_Firm = {
    readonly candidates: {
        readonly __id: string;
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly freelancer: {
                    readonly id: string;
                    readonly " $fragmentRefs": FragmentRefs<"Freelancer_Freelancer">;
                };
                readonly contract: {
                    readonly id: string;
                    readonly " $fragmentRefs": FragmentRefs<"Freelancer_Contract">;
                } | null;
                readonly job: {
                    readonly id: string;
                    readonly user: {
                        readonly firm: {
                            readonly slug: string | null;
                        } | null;
                    } | null;
                    readonly " $fragmentRefs": FragmentRefs<"Freelancer_Job">;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly id: string;
    readonly " $refType": "Candidates_Firm";
};
export type Candidates_Firm$data = Candidates_Firm;
export type Candidates_Firm$key = {
    readonly " $data"?: Candidates_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"Candidates_Firm">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "candidates"
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
      "operation": Candidates_candidates,
      "identifierField": "id"
    }
  },
  "name": "Candidates_Firm",
  "selections": [
    {
      "alias": "candidates",
      "args": [
        {
          "kind": "Variable",
          "name": "filters",
          "variableName": "filters"
        }
      ],
      "concreteType": "CandidateConnection",
      "kind": "LinkedField",
      "name": "__Candidates_candidates_connection",
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
          "concreteType": "CandidateEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Candidate",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "User",
                  "kind": "LinkedField",
                  "name": "freelancer",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "Freelancer_Freelancer"
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Contract",
                  "kind": "LinkedField",
                  "name": "contract",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "Freelancer_Contract"
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Job",
                  "kind": "LinkedField",
                  "name": "job",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
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
                            {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "slug",
                              "storageKey": null
                            }
                          ],
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "Freelancer_Job"
                    }
                  ],
                  "storageKey": null
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
(node as any).hash = 'bf4192e0a83d4248623a3d9d0afb396c';
export default node;

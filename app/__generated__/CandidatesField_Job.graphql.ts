/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import CandidatesField_candidates from "./CandidatesField_candidates.graphql";
import { FragmentRefs } from "relay-runtime";
export type CandidatesField_Job = {
    readonly candidates: {
        readonly __id: string;
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly freelancer: {
                    readonly id: string;
                    readonly rawId: number | null;
                };
                readonly jobIncompatibilityReasons: ReadonlyArray<string> | null;
                readonly " $fragmentRefs": FragmentRefs<"SourcingCandidate_Candidate">;
            } | null;
        } | null> | null;
    } | null;
    readonly id: string;
    readonly " $refType": "CandidatesField_Job";
};
export type CandidatesField_Job$data = CandidatesField_Job;
export type CandidatesField_Job$key = {
    readonly " $data"?: CandidatesField_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"CandidatesField_Job">;
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
      "kind": "RootArgument",
      "name": "jobSlug"
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
      "operation": CandidatesField_candidates,
      "identifierField": "id"
    }
  },
  "name": "CandidatesField_Job",
  "selections": [
    {
      "alias": "candidates",
      "args": null,
      "concreteType": "CandidateConnection",
      "kind": "LinkedField",
      "name": "__CandidatesField_candidates_connection",
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
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "rawId",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "jobIncompatibilityReasons",
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
                  "name": "SourcingCandidate_Candidate"
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
  "type": "Job",
  "abstractKey": null
};
})();
(node as any).hash = '1674c0d50c867eab8df9bc0ad2c118a3';
export default node;

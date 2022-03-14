/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RatingEntry_Feedback = {
    readonly user: {
        readonly rawId: number | null;
        readonly name: string | null;
    } | null;
    readonly updatedAt: string | null;
    readonly ratingPositive: boolean;
    readonly description: string | null;
    readonly " $refType": "RatingEntry_Feedback";
};
export type RatingEntry_Feedback$data = RatingEntry_Feedback;
export type RatingEntry_Feedback$key = {
    readonly " $data"?: RatingEntry_Feedback$data;
    readonly " $fragmentRefs": FragmentRefs<"RatingEntry_Feedback">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RatingEntry_Feedback",
  "selections": [
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
          "kind": "ScalarField",
          "name": "rawId",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ratingPositive",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "ContractFeedback",
  "abstractKey": null
};
(node as any).hash = '4a922005f37c13c1e6bdb389a05e8e89';
export default node;

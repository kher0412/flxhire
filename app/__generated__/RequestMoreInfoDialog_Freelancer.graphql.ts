/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RequestMoreInfoDialog_Freelancer = {
    readonly firstName: string | null;
    readonly video: {
        readonly id: string;
    } | null;
    readonly " $refType": "RequestMoreInfoDialog_Freelancer";
};
export type RequestMoreInfoDialog_Freelancer$data = RequestMoreInfoDialog_Freelancer;
export type RequestMoreInfoDialog_Freelancer$key = {
    readonly " $data"?: RequestMoreInfoDialog_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"RequestMoreInfoDialog_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RequestMoreInfoDialog_Freelancer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Video",
      "kind": "LinkedField",
      "name": "video",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '4f98b0ebea02028968c7c8e864fb5f8f';
export default node;

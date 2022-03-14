/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ShareLinkButton_Freelancer = {
    readonly rawId: number | null;
    readonly profile: {
        readonly slug: string | null;
    } | null;
    readonly " $refType": "ShareLinkButton_Freelancer";
};
export type ShareLinkButton_Freelancer$data = ShareLinkButton_Freelancer;
export type ShareLinkButton_Freelancer$key = {
    readonly " $data"?: ShareLinkButton_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"ShareLinkButton_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShareLinkButton_Freelancer",
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
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
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
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '7aa2359138c28ba5d6863a735fe18601';
export default node;

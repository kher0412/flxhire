/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type AdminButton_Freelancer = {
    readonly " $fragmentRefs": FragmentRefs<"AdminTools_Freelancer">;
    readonly " $refType": "AdminButton_Freelancer";
};
export type AdminButton_Freelancer$data = AdminButton_Freelancer;
export type AdminButton_Freelancer$key = {
    readonly " $data"?: AdminButton_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"AdminButton_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminButton_Freelancer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdminTools_Freelancer"
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '633453c3bf1f992c7bd144d56362dbae';
export default node;

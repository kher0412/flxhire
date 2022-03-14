/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RejectDialogForm_Freelancer = {
    readonly id: string;
    readonly firstName: string | null;
    readonly " $refType": "RejectDialogForm_Freelancer";
};
export type RejectDialogForm_Freelancer$data = RejectDialogForm_Freelancer;
export type RejectDialogForm_Freelancer$key = {
    readonly " $data"?: RejectDialogForm_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"RejectDialogForm_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RejectDialogForm_Freelancer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '88022b48d3919b78f5da227f38429d2b';
export default node;

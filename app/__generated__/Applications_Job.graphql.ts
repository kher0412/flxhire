/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Applications_Job = {
    readonly autoSendScreeningRequests: boolean | null;
    readonly " $refType": "Applications_Job";
};
export type Applications_Job$data = Applications_Job;
export type Applications_Job$key = {
    readonly " $data"?: Applications_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"Applications_Job">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Applications_Job",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "autoSendScreeningRequests",
      "storageKey": null
    }
  ],
  "type": "Job",
  "abstractKey": null
};
(node as any).hash = '98960bbfb16cb0fe9a6b194fd87e388c';
export default node;

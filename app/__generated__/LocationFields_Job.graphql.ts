/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type LocationFields_Job = {
    readonly locationLongitude: number | null;
    readonly locationLatitude: number | null;
    readonly " $refType": "LocationFields_Job";
};
export type LocationFields_Job$data = LocationFields_Job;
export type LocationFields_Job$key = {
    readonly " $data"?: LocationFields_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"LocationFields_Job">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationFields_Job",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locationLongitude",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locationLatitude",
      "storageKey": null
    }
  ],
  "type": "Job",
  "abstractKey": null
};
(node as any).hash = '76e6c7c8eea482efbea241497de82313';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type LocationTypeListItem_Job = {
    readonly locationType: string | null;
    readonly jobTimezone: string | null;
    readonly jobCountries: ReadonlyArray<string>;
    readonly fullAddress: string | null;
    readonly " $refType": "LocationTypeListItem_Job";
};
export type LocationTypeListItem_Job$data = LocationTypeListItem_Job;
export type LocationTypeListItem_Job$key = {
    readonly " $data"?: LocationTypeListItem_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"LocationTypeListItem_Job">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationTypeListItem_Job",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locationType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "jobTimezone",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "jobCountries",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "fullAddress",
      "storageKey": null
    }
  ],
  "type": "Job",
  "abstractKey": null
};
(node as any).hash = '357f2c36c8b38457a4bba8f7876b7deb';
export default node;

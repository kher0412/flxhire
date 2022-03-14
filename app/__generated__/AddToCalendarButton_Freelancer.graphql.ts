/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type AddToCalendarButton_Freelancer = {
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly " $refType": "AddToCalendarButton_Freelancer";
};
export type AddToCalendarButton_Freelancer$data = AddToCalendarButton_Freelancer;
export type AddToCalendarButton_Freelancer$key = {
    readonly " $data"?: AddToCalendarButton_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"AddToCalendarButton_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddToCalendarButton_Freelancer",
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
      "kind": "ScalarField",
      "name": "lastName",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'ddb21962f36531d3712b43e599ab8b5e';
export default node;

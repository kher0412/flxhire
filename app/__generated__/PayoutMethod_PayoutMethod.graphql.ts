/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PayoutMethod_PayoutMethod = {
    readonly id: string;
    readonly status: string;
    readonly payoutMethodType: string;
    readonly isDefault: boolean | null;
    readonly setupUrl: string | null;
    readonly " $refType": "PayoutMethod_PayoutMethod";
};
export type PayoutMethod_PayoutMethod$data = PayoutMethod_PayoutMethod;
export type PayoutMethod_PayoutMethod$key = {
    readonly " $data"?: PayoutMethod_PayoutMethod$data;
    readonly " $fragmentRefs": FragmentRefs<"PayoutMethod_PayoutMethod">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PayoutMethod_PayoutMethod",
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
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "payoutMethodType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isDefault",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "setupUrl",
      "storageKey": null
    }
  ],
  "type": "PayoutMethod",
  "abstractKey": null
};
(node as any).hash = '789c35f4d5e059b89acaa9b286aa6f5f';
export default node;

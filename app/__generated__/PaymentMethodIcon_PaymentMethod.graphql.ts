/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PaymentMethodIcon_PaymentMethod = {
    readonly paymentMethodType: string | null;
    readonly " $refType": "PaymentMethodIcon_PaymentMethod";
};
export type PaymentMethodIcon_PaymentMethod$data = PaymentMethodIcon_PaymentMethod;
export type PaymentMethodIcon_PaymentMethod$key = {
    readonly " $data"?: PaymentMethodIcon_PaymentMethod$data;
    readonly " $fragmentRefs": FragmentRefs<"PaymentMethodIcon_PaymentMethod">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PaymentMethodIcon_PaymentMethod",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "paymentMethodType",
      "storageKey": null
    }
  ],
  "type": "PaymentMethod",
  "abstractKey": null
};
(node as any).hash = '740a4cfc3a1689236630d12176bbda03';
export default node;

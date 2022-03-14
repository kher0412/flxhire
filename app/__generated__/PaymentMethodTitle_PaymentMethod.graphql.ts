/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PaymentMethodTitle_PaymentMethod = {
    readonly paymentMethodType: string | null;
    readonly mask: string | null;
    readonly name: string | null;
    readonly " $refType": "PaymentMethodTitle_PaymentMethod";
};
export type PaymentMethodTitle_PaymentMethod$data = PaymentMethodTitle_PaymentMethod;
export type PaymentMethodTitle_PaymentMethod$key = {
    readonly " $data"?: PaymentMethodTitle_PaymentMethod$data;
    readonly " $fragmentRefs": FragmentRefs<"PaymentMethodTitle_PaymentMethod">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PaymentMethodTitle_PaymentMethod",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "paymentMethodType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mask",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "PaymentMethod",
  "abstractKey": null
};
(node as any).hash = '2707013c280749f4766215f30f039f36';
export default node;

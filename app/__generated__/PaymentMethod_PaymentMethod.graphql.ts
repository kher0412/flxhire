/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PaymentMethod_PaymentMethod = {
    readonly default: boolean;
    readonly paymentMethodType: string | null;
    readonly " $fragmentRefs": FragmentRefs<"PaymentMethodTitle_PaymentMethod" | "PaymentMethodSubheader_PaymentMethod" | "PaymentMethodIcon_PaymentMethod" | "WireTransferDialog_PaymentMethod">;
    readonly " $refType": "PaymentMethod_PaymentMethod";
};
export type PaymentMethod_PaymentMethod$data = PaymentMethod_PaymentMethod;
export type PaymentMethod_PaymentMethod$key = {
    readonly " $data"?: PaymentMethod_PaymentMethod$data;
    readonly " $fragmentRefs": FragmentRefs<"PaymentMethod_PaymentMethod">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PaymentMethod_PaymentMethod",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "default",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "paymentMethodType",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PaymentMethodTitle_PaymentMethod"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PaymentMethodSubheader_PaymentMethod"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PaymentMethodIcon_PaymentMethod"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WireTransferDialog_PaymentMethod"
    }
  ],
  "type": "PaymentMethod",
  "abstractKey": null
};
(node as any).hash = '062fcd922b0facb5573874dbffdb118c';
export default node;

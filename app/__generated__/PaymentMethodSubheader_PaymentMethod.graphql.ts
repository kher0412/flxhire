/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PaymentMethodSubheader_PaymentMethod = {
    readonly paymentMethodType: string | null;
    readonly expMonth: string | null;
    readonly expYear: string | null;
    readonly cardholderName: string | null;
    readonly institutionName: string | null;
    readonly currency: {
        readonly code: string | null;
    } | null;
    readonly amountAvailable: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly " $refType": "PaymentMethodSubheader_PaymentMethod";
};
export type PaymentMethodSubheader_PaymentMethod$data = PaymentMethodSubheader_PaymentMethod;
export type PaymentMethodSubheader_PaymentMethod$key = {
    readonly " $data"?: PaymentMethodSubheader_PaymentMethod$data;
    readonly " $fragmentRefs": FragmentRefs<"PaymentMethodSubheader_PaymentMethod">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PaymentMethodSubheader_PaymentMethod",
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
      "name": "expMonth",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "expYear",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cardholderName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "institutionName",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "amountAvailable",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "value",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PaymentMethod",
  "abstractKey": null
};
})();
(node as any).hash = 'd922c99af26b4c3b5d9d4bcd13406464';
export default node;

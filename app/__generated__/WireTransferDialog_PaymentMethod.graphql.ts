/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type WireTransferDialog_PaymentMethod = {
    readonly institutionName: string | null;
    readonly achAccountNumber: string | null;
    readonly achRoutingNumber: string | null;
    readonly swiftCode: string | null;
    readonly amountAvailable: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly currency: {
        readonly code: string | null;
    } | null;
    readonly " $refType": "WireTransferDialog_PaymentMethod";
};
export type WireTransferDialog_PaymentMethod$data = WireTransferDialog_PaymentMethod;
export type WireTransferDialog_PaymentMethod$key = {
    readonly " $data"?: WireTransferDialog_PaymentMethod$data;
    readonly " $fragmentRefs": FragmentRefs<"WireTransferDialog_PaymentMethod">;
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
  "name": "WireTransferDialog_PaymentMethod",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "institutionName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "achAccountNumber",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "achRoutingNumber",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "swiftCode",
      "storageKey": null
    },
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
    },
    (v0/*: any*/)
  ],
  "type": "PaymentMethod",
  "abstractKey": null
};
})();
(node as any).hash = '6808be1b7fa247255337ae09bffc940d';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PayingUs_Firm = {
    readonly id: string;
    readonly paymentMethods: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"PaymentMethod_PaymentMethod">;
    }> | null;
    readonly " $refType": "PayingUs_Firm";
};
export type PayingUs_Firm$data = PayingUs_Firm;
export type PayingUs_Firm$key = {
    readonly " $data"?: PayingUs_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"PayingUs_Firm">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PayingUs_Firm",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PaymentMethod",
      "kind": "LinkedField",
      "name": "paymentMethods",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PaymentMethod_PaymentMethod"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Firm",
  "abstractKey": null
};
})();
(node as any).hash = '6b5aa60ab164ee3480dd427f3f086401';
export default node;

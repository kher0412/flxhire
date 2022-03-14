/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PayingYou_User = {
    readonly canSetupPayoutMethod: boolean | null;
    readonly payoutMethods: ReadonlyArray<{
        readonly id: string;
        readonly payoutMethodType: string;
        readonly status: string;
        readonly " $fragmentRefs": FragmentRefs<"PayoutMethod_PayoutMethod">;
    }> | null;
    readonly configuration: {
        readonly payoutMethodTypes: ReadonlyArray<string> | null;
        readonly stripeConnectSupportedCountries: ReadonlyArray<string> | null;
    } | null;
    readonly " $refType": "PayingYou_User";
};
export type PayingYou_User$data = PayingYou_User;
export type PayingYou_User$key = {
    readonly " $data"?: PayingYou_User$data;
    readonly " $fragmentRefs": FragmentRefs<"PayingYou_User">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PayingYou_User",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "canSetupPayoutMethod",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PayoutMethod",
      "kind": "LinkedField",
      "name": "payoutMethods",
      "plural": true,
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
          "name": "payoutMethodType",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "PayoutMethod_PayoutMethod"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Configuration",
      "kind": "LinkedField",
      "name": "configuration",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "payoutMethodTypes",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "stripeConnectSupportedCountries",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'fd1fa340d01cd4b81d87a4fae1ae3443';
export default node;

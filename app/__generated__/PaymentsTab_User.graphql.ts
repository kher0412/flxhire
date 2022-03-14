/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PaymentsTab_User = {
    readonly hasInvoiceAccess: boolean | null;
    readonly managerContract: {
        readonly client: {
            readonly name: string | null;
        } | null;
        readonly isFirmAdmin: boolean | null;
    } | null;
    readonly " $refType": "PaymentsTab_User";
};
export type PaymentsTab_User$data = PaymentsTab_User;
export type PaymentsTab_User$key = {
    readonly " $data"?: PaymentsTab_User$data;
    readonly " $fragmentRefs": FragmentRefs<"PaymentsTab_User">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PaymentsTab_User",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasInvoiceAccess",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Contract",
      "kind": "LinkedField",
      "name": "managerContract",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "client",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isFirmAdmin",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'c47bad20010da68c8a1097d864f5a192';
export default node;

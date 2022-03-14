/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type BonusStage = "approved" | "paid" | "pending";
export type BonusCard_Bonus = {
    readonly stage: BonusStage | null;
    readonly totalToPayClient: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly startDate: string | null;
    readonly endDate: string | null;
    readonly approvedAt: string | null;
    readonly currency: {
        readonly code: string | null;
    } | null;
    readonly payrollItem: {
        readonly invoiceItem: {
            readonly invoice: {
                readonly invoiceNum: number | null;
            } | null;
        } | null;
    } | null;
    readonly contract: {
        readonly freelancer: {
            readonly name: string | null;
        } | null;
        readonly client: {
            readonly name: string | null;
        } | null;
    } | null;
    readonly " $refType": "BonusCard_Bonus";
};
export type BonusCard_Bonus$data = BonusCard_Bonus;
export type BonusCard_Bonus$key = {
    readonly " $data"?: BonusCard_Bonus$data;
    readonly " $fragmentRefs": FragmentRefs<"BonusCard_Bonus">;
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
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BonusCard_Bonus",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "stage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "totalToPayClient",
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "approvedAt",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PayrollItem",
      "kind": "LinkedField",
      "name": "payrollItem",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "InvoiceItem",
          "kind": "LinkedField",
          "name": "invoiceItem",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Invoice",
              "kind": "LinkedField",
              "name": "invoice",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "invoiceNum",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Contract",
      "kind": "LinkedField",
      "name": "contract",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "freelancer",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "client",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Bonus",
  "abstractKey": null
};
})();
(node as any).hash = 'd7751c36fb47439baeee7f34830b3ad3';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type BonusStage = "approved" | "paid" | "pending";
export type BonusRow_Bonus = {
    readonly id: string | null;
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
                readonly rawId: number;
                readonly invoiceNum: number | null;
                readonly token: string | null;
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
    readonly " $refType": "BonusRow_Bonus";
};
export type BonusRow_Bonus$data = BonusRow_Bonus;
export type BonusRow_Bonus$key = {
    readonly " $data"?: BonusRow_Bonus$data;
    readonly " $fragmentRefs": FragmentRefs<"BonusRow_Bonus">;
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
  "name": "BonusRow_Bonus",
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
                  "name": "rawId",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "invoiceNum",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "token",
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
(node as any).hash = '33a53792f252a536b207aea25c558fac';
export default node;

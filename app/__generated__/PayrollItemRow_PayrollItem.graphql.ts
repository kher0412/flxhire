/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type PayrollItemStatus = "failed" | "paid" | "pending" | "processing" | "waiting";
export type PayrollItemType = "bonus" | "expense" | "salary" | "timesheet";
export type PayrollItemRow_PayrollItem = {
    readonly id: string;
    readonly itemNum: number | null;
    readonly status: PayrollItemStatus | null;
    readonly totalToPayClient: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly currency: {
        readonly code: string | null;
    } | null;
    readonly type: PayrollItemType | null;
    readonly startDate: string | null;
    readonly endDate: string | null;
    readonly approvedAt: string | null;
    readonly autoApproved: boolean | null;
    readonly invoiceItem: {
        readonly invoice: {
            readonly rawId: number;
            readonly invoiceNum: number | null;
            readonly token: string | null;
        } | null;
    } | null;
    readonly invoiceable: boolean | null;
    readonly contract: {
        readonly freelancer: {
            readonly name: string | null;
        } | null;
        readonly client: {
            readonly name: string | null;
        } | null;
    } | null;
    readonly timesheet: {
        readonly rawId: number;
    } | null;
    readonly " $refType": "PayrollItemRow_PayrollItem";
};
export type PayrollItemRow_PayrollItem$data = PayrollItemRow_PayrollItem;
export type PayrollItemRow_PayrollItem$key = {
    readonly " $data"?: PayrollItemRow_PayrollItem$data;
    readonly " $fragmentRefs": FragmentRefs<"PayrollItemRow_PayrollItem">;
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v2 = [
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
  "name": "PayrollItemRow_PayrollItem",
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
      "name": "itemNum",
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
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "autoApproved",
      "storageKey": null
    },
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
            (v1/*: any*/),
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "invoiceable",
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
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "client",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Timesheet",
      "kind": "LinkedField",
      "name": "timesheet",
      "plural": false,
      "selections": [
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "PayrollItem",
  "abstractKey": null
};
})();
(node as any).hash = 'af603f334f61015c84d735b61694ca0a';
export default node;

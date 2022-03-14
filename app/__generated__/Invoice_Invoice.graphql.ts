/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Invoice_Invoice = {
    readonly client: {
        readonly additionalInvoiceText: string | null;
        readonly firm: {
            readonly currency: {
                readonly code: string | null;
            } | null;
            readonly name: string | null;
            readonly additionalInvoiceText: string | null;
        } | null;
    } | null;
    readonly expenses: ReadonlyArray<{
        readonly id: string;
    }> | null;
    readonly currency: {
        readonly code: string | null;
    } | null;
    readonly totalToPayClient: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly invoiceItemsExchangeRates: ReadonlyArray<{
        readonly fromCurrency: {
            readonly code: string | null;
        } | null;
        readonly toCurrency: {
            readonly code: string | null;
        } | null;
        readonly value: number | null;
    }> | null;
    readonly invoiceDate: string | null;
    readonly invoiceNum: number | null;
    readonly bankTransferDetails: {
        readonly swiftCode: string | null;
        readonly achAccountNumber: string | null;
        readonly achRoutingNumber: string | null;
        readonly institutionName: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"Summary_Invoice" | "InvoiceDetails_Invoice">;
    readonly " $refType": "Invoice_Invoice";
};
export type Invoice_Invoice$data = Invoice_Invoice;
export type Invoice_Invoice$key = {
    readonly " $data"?: Invoice_Invoice$data;
    readonly " $fragmentRefs": FragmentRefs<"Invoice_Invoice">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "additionalInvoiceText",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "code",
    "storageKey": null
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": (v1/*: any*/),
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Invoice_Invoice",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "client",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Firm",
          "kind": "LinkedField",
          "name": "firm",
          "plural": false,
          "selections": [
            (v2/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            },
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Expense",
      "kind": "LinkedField",
      "name": "expenses",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "totalToPayClient",
      "plural": false,
      "selections": [
        (v2/*: any*/),
        (v3/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "InvoiceExchangeRate",
      "kind": "LinkedField",
      "name": "invoiceItemsExchangeRates",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Currency",
          "kind": "LinkedField",
          "name": "fromCurrency",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Currency",
          "kind": "LinkedField",
          "name": "toCurrency",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        (v3/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "invoiceDate",
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
      "concreteType": "BankTransferDetails",
      "kind": "LinkedField",
      "name": "bankTransferDetails",
      "plural": false,
      "selections": [
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
          "name": "institutionName",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Summary_Invoice"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "InvoiceDetails_Invoice"
    }
  ],
  "type": "Invoice",
  "abstractKey": null
};
})();
(node as any).hash = '469ca6e37b4b808a168c25cc1bcb3508';
export default node;

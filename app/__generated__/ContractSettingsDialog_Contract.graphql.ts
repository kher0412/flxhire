/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractBonusPeriod = "monthly" | "yearly";
export type RateMode = "day" | "hour" | "month" | "year";
export type ContractSettingsDialog_Contract = {
    readonly id: string;
    readonly endDate: string | null;
    readonly startDate: string | null;
    readonly currency: {
        readonly code: string | null;
    };
    readonly clientRate: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly rateMode: RateMode | null;
    readonly freelancerRate: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly enableTimesheets: boolean | null;
    readonly allowManageAccess: boolean | null;
    readonly requireTimesheetApprovalForPayments: boolean | null;
    readonly purchaseOrderNumber: string | null;
    readonly isManager: boolean | null;
    readonly isFirmAdmin: boolean | null;
    readonly client: {
        readonly id: string;
        readonly rawId: number | null;
    } | null;
    readonly bonusPeriod: ContractBonusPeriod | null;
    readonly bonusClientRate: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ContractSettingsForm_Contract">;
    readonly " $refType": "ContractSettingsDialog_Contract";
};
export type ContractSettingsDialog_Contract$data = ContractSettingsDialog_Contract;
export type ContractSettingsDialog_Contract$key = {
    readonly " $data"?: ContractSettingsDialog_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"ContractSettingsDialog_Contract">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
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
v2 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContractSettingsDialog_Contract",
  "selections": [
    (v0/*: any*/),
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
      "name": "startDate",
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "clientRate",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rateMode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "freelancerRate",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "enableTimesheets",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "allowManageAccess",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "requireTimesheetApprovalForPayments",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "purchaseOrderNumber",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isManager",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isFirmAdmin",
      "storageKey": null
    },
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
          "kind": "ScalarField",
          "name": "rawId",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bonusPeriod",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "bonusClientRate",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContractSettingsForm_Contract"
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
})();
(node as any).hash = '6077574158d40ef5cc95b8502a26285c';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractSettingsForm_User = {
    readonly id: string;
    readonly managerContract: {
        readonly allowManageAccess: boolean | null;
        readonly isFirmAdmin: boolean | null;
    } | null;
    readonly configuration: {
        readonly enableAutoBonuses: boolean | null;
    } | null;
    readonly " $refType": "ContractSettingsForm_User";
};
export type ContractSettingsForm_User$data = ContractSettingsForm_User;
export type ContractSettingsForm_User$key = {
    readonly " $data"?: ContractSettingsForm_User$data;
    readonly " $fragmentRefs": FragmentRefs<"ContractSettingsForm_User">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContractSettingsForm_User",
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
      "concreteType": "Contract",
      "kind": "LinkedField",
      "name": "managerContract",
      "plural": false,
      "selections": [
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
          "name": "isFirmAdmin",
          "storageKey": null
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
          "name": "enableAutoBonuses",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '2bf5953bb859b3561eb12adf0f4cdc69';
export default node;

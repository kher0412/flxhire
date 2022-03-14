/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type CompanyForm_User = {
    readonly managerContract: {
        readonly isFirmAdmin: boolean | null;
    } | null;
    readonly " $refType": "CompanyForm_User";
};
export type CompanyForm_User$data = CompanyForm_User;
export type CompanyForm_User$key = {
    readonly " $data"?: CompanyForm_User$data;
    readonly " $fragmentRefs": FragmentRefs<"CompanyForm_User">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CompanyForm_User",
  "selections": [
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
(node as any).hash = '34ef9db25d17ba2d50d74aa72af4ac3d';
export default node;

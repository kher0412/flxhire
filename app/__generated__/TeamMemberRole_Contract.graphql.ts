/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type TeamMemberRole_Contract = {
    readonly isManager: boolean | null;
    readonly isFirmAdmin: boolean | null;
    readonly " $refType": "TeamMemberRole_Contract";
};
export type TeamMemberRole_Contract$data = TeamMemberRole_Contract;
export type TeamMemberRole_Contract$key = {
    readonly " $data"?: TeamMemberRole_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"TeamMemberRole_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TeamMemberRole_Contract",
  "selections": [
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
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = 'd0abd387986b720eb7e1b15583934c71';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderInlineDataFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type contract_getApplicantSourceIcon = {
    readonly applicantSource: string | null;
    readonly " $refType": "contract_getApplicantSourceIcon";
};
export type contract_getApplicantSourceIcon$data = contract_getApplicantSourceIcon;
export type contract_getApplicantSourceIcon$key = {
    readonly " $data"?: contract_getApplicantSourceIcon$data;
    readonly " $fragmentRefs": FragmentRefs<"contract_getApplicantSourceIcon">;
};



const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "contract_getApplicantSourceIcon"
};
(node as any).hash = '5c067169676f43e3169a4c2678e75825';
export default node;

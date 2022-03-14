/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderInlineDataFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type contract_getApplicantSource = {
    readonly applicantSource: string | null;
    readonly " $refType": "contract_getApplicantSource";
};
export type contract_getApplicantSource$data = contract_getApplicantSource;
export type contract_getApplicantSource$key = {
    readonly " $data"?: contract_getApplicantSource$data;
    readonly " $fragmentRefs": FragmentRefs<"contract_getApplicantSource">;
};



const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "contract_getApplicantSource"
};
(node as any).hash = '034d4cee6b55c4240f5ce53c11a91bed';
export default node;

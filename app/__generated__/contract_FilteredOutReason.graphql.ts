/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderInlineDataFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractRequestsStatus = "completed" | "pending" | "rejected" | "started";
export type contract_FilteredOutReason = {
    readonly requestsStatus: ContractRequestsStatus | null;
    readonly clientRate: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly annualCompensation: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly bookmarked: boolean | null;
    readonly projectSubmission: {
        readonly id: string;
    } | null;
    readonly freelancer: {
        readonly timezoneOffset: number | null;
        readonly video: {
            readonly id: string;
        } | null;
        readonly profile: {
            readonly totalExperience: number | null;
            readonly freelancerSubtypes: ReadonlyArray<{
                readonly rawId: number | null;
            }> | null;
        } | null;
        readonly userSkills: ReadonlyArray<{
            readonly experience: number | null;
            readonly skill: {
                readonly rawId: number | null;
            } | null;
        }> | null;
    } | null;
    readonly " $refType": "contract_FilteredOutReason";
};
export type contract_FilteredOutReason$data = contract_FilteredOutReason;
export type contract_FilteredOutReason$key = {
    readonly " $data"?: contract_FilteredOutReason$data;
    readonly " $fragmentRefs": FragmentRefs<"contract_FilteredOutReason">;
};



const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "contract_FilteredOutReason"
};
(node as any).hash = 'e2ff164f038221f6be1f15a72d0254a9';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobHiringManagerFields_Job = {
    readonly user: {
        readonly firm: {
            readonly billingPlan: {
                readonly allowFlexhireRecruiters: boolean | null;
                readonly dailyFlexhireRecruiterPerJobFeeUsd: number | null;
            } | null;
            readonly users: ReadonlyArray<{
                readonly id: string;
                readonly rawId: number | null;
                readonly name: string | null;
            }> | null;
        } | null;
    } | null;
    readonly recruiters: ReadonlyArray<{
        readonly id: string;
        readonly rawId: number | null;
        readonly name: string | null;
    }> | null;
    readonly " $refType": "JobHiringManagerFields_Job";
};
export type JobHiringManagerFields_Job$data = JobHiringManagerFields_Job;
export type JobHiringManagerFields_Job$key = {
    readonly " $data"?: JobHiringManagerFields_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"JobHiringManagerFields_Job">;
};



const node: ReaderFragment = (function(){
var v0 = [
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
    "name": "rawId",
    "storageKey": null
  },
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
  "name": "JobHiringManagerFields_Job",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Firm",
          "kind": "LinkedField",
          "name": "firm",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "BillingPlan",
              "kind": "LinkedField",
              "name": "billingPlan",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "allowFlexhireRecruiters",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "dailyFlexhireRecruiterPerJobFeeUsd",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "User",
              "kind": "LinkedField",
              "name": "users",
              "plural": true,
              "selections": (v0/*: any*/),
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
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "recruiters",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Job",
  "abstractKey": null
};
})();
(node as any).hash = 'de6c6cdc3107ec4f65d609433af34542';
export default node;

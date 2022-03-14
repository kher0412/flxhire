/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobSourcingStep_Job = {
    readonly slug: string | null;
    readonly user: {
        readonly rawId: number | null;
    } | null;
    readonly hiringManager: {
        readonly rawId: number | null;
    } | null;
    readonly hiringManagerType: string | null;
    readonly referralBounty: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly activeJobIntegrationsNames: ReadonlyArray<string> | null;
    readonly candidatesToNotify: ReadonlyArray<{
        readonly rawId: number | null;
        readonly status: string | null;
    }> | null;
    readonly automaticallyNotifyCandidates: boolean | null;
    readonly jobSocialIntegrations: ReadonlyArray<string> | null;
    readonly " $fragmentRefs": FragmentRefs<"JobSourcingForm_Job">;
    readonly " $refType": "JobSourcingStep_Job";
};
export type JobSourcingStep_Job$data = JobSourcingStep_Job;
export type JobSourcingStep_Job$key = {
    readonly " $data"?: JobSourcingStep_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"JobSourcingStep_Job">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JobSourcingStep_Job",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "hiringManager",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hiringManagerType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "referralBounty",
      "plural": false,
      "selections": [
        {
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "activeJobIntegrationsNames",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CandidateToNotify",
      "kind": "LinkedField",
      "name": "candidatesToNotify",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "status",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "automaticallyNotifyCandidates",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "jobSocialIntegrations",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JobSourcingForm_Job"
    }
  ],
  "type": "Job",
  "abstractKey": null
};
})();
(node as any).hash = '2df6bdd62fd77a3c7a294c46423b6ef6';
export default node;

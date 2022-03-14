/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobStatus = "closed" | "draft" | "opened";
export type FreelancerCardJob_Job = {
    readonly status: JobStatus | null;
    readonly title: string;
    readonly slug: string | null;
    readonly user: {
        readonly firm: {
            readonly slug: string | null;
            readonly name: string | null;
        } | null;
    } | null;
    readonly " $refType": "FreelancerCardJob_Job";
};
export type FreelancerCardJob_Job$data = FreelancerCardJob_Job;
export type FreelancerCardJob_Job$key = {
    readonly " $data"?: FreelancerCardJob_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardJob_Job">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerCardJob_Job",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    (v0/*: any*/),
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
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Job",
  "abstractKey": null
};
})();
(node as any).hash = 'c099bb6512d7c1dd47f071673b29e7f1';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobStatus = "closed" | "draft" | "opened";
export type JobScreeningForm_Job = {
    readonly slug: string | null;
    readonly status: JobStatus | null;
    readonly freelancerType: {
        readonly rawId: number | null;
        readonly name: string | null;
        readonly slug: string | null;
        readonly jobsHaveCodeTests: boolean | null;
    } | null;
    readonly freelancerSubtypes: ReadonlyArray<{
        readonly rawId: number | null;
        readonly name: string | null;
        readonly slug: string | null;
        readonly freelancerType: {
            readonly rawId: number | null;
        } | null;
    }>;
    readonly jobSkills: ReadonlyArray<{
        readonly skill: {
            readonly rawId: number | null;
            readonly name: string | null;
        } | null;
    }>;
    readonly " $refType": "JobScreeningForm_Job";
};
export type JobScreeningForm_Job$data = JobScreeningForm_Job;
export type JobScreeningForm_Job$key = {
    readonly " $data"?: JobScreeningForm_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"JobScreeningForm_Job">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JobScreeningForm_Job",
  "selections": [
    (v0/*: any*/),
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
      "concreteType": "FreelancerType",
      "kind": "LinkedField",
      "name": "freelancerType",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        (v2/*: any*/),
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "jobsHaveCodeTests",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FreelancerSubtype",
      "kind": "LinkedField",
      "name": "freelancerSubtypes",
      "plural": true,
      "selections": [
        (v1/*: any*/),
        (v2/*: any*/),
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "FreelancerType",
          "kind": "LinkedField",
          "name": "freelancerType",
          "plural": false,
          "selections": [
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "JobSkill",
      "kind": "LinkedField",
      "name": "jobSkills",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Skill",
          "kind": "LinkedField",
          "name": "skill",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            (v2/*: any*/)
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
(node as any).hash = '94417ece8721692ec08782b634c52e26';
export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SkillsFields_Job = {
    readonly jobSkills: ReadonlyArray<{
        readonly requiredYears: number | null;
        readonly skill: {
            readonly rawId: number | null;
            readonly name: string | null;
        } | null;
    }>;
    readonly jobSubtypes: ReadonlyArray<{
        readonly freelancerSubtype: {
            readonly rawId: number | null;
            readonly name: string | null;
        } | null;
    }>;
    readonly " $refType": "SkillsFields_Job";
};
export type SkillsFields_Job$data = SkillsFields_Job;
export type SkillsFields_Job$key = {
    readonly " $data"?: SkillsFields_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"SkillsFields_Job">;
};



const node: ReaderFragment = (function(){
var v0 = [
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
  "name": "SkillsFields_Job",
  "selections": [
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
          "kind": "ScalarField",
          "name": "requiredYears",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Skill",
          "kind": "LinkedField",
          "name": "skill",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "JobSubtype",
      "kind": "LinkedField",
      "name": "jobSubtypes",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FreelancerSubtype",
          "kind": "LinkedField",
          "name": "freelancerSubtype",
          "plural": false,
          "selections": (v0/*: any*/),
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
(node as any).hash = '4be06955269bfff147075d09fb75cc72';
export default node;

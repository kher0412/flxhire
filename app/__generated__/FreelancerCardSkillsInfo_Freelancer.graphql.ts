/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerCardSkillsInfo_Freelancer = {
    readonly profile: {
        readonly freelancerSubtypes: ReadonlyArray<{
            readonly rawId: number | null;
            readonly name: string | null;
        }> | null;
    } | null;
    readonly userSkills: ReadonlyArray<{
        readonly experience: number | null;
        readonly skill: {
            readonly rawId: number | null;
            readonly name: string | null;
        } | null;
    }> | null;
    readonly " $refType": "FreelancerCardSkillsInfo_Freelancer";
};
export type FreelancerCardSkillsInfo_Freelancer$data = FreelancerCardSkillsInfo_Freelancer;
export type FreelancerCardSkillsInfo_Freelancer$key = {
    readonly " $data"?: FreelancerCardSkillsInfo_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerCardSkillsInfo_Freelancer">;
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
  "name": "FreelancerCardSkillsInfo_Freelancer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FreelancerSubtype",
          "kind": "LinkedField",
          "name": "freelancerSubtypes",
          "plural": true,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UserSkill",
      "kind": "LinkedField",
      "name": "userSkills",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "experience",
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
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();
(node as any).hash = 'b2b0c454c64e7895cd12b0087549e1b0';
export default node;

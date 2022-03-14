/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SkillsFields_Firm = {
    readonly skills: ReadonlyArray<{
        readonly rawId: number | null;
        readonly name: string | null;
    }> | null;
    readonly freelancerSubtypes: ReadonlyArray<{
        readonly rawId: number | null;
        readonly name: string | null;
    }> | null;
    readonly " $refType": "SkillsFields_Firm";
};
export type SkillsFields_Firm$data = SkillsFields_Firm;
export type SkillsFields_Firm$key = {
    readonly " $data"?: SkillsFields_Firm$data;
    readonly " $fragmentRefs": FragmentRefs<"SkillsFields_Firm">;
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
  "name": "SkillsFields_Firm",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Skill",
      "kind": "LinkedField",
      "name": "skills",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
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
  "type": "Firm",
  "abstractKey": null
};
})();
(node as any).hash = 'a45b146a82b138ba6b336015123bc541';
export default node;

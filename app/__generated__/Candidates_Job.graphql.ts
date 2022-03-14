/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Candidates_Job = {
    readonly user: {
        readonly firm: {
            readonly slug: string | null;
        } | null;
    } | null;
    readonly slug: string | null;
    readonly " $refType": "Candidates_Job";
};
export type Candidates_Job$data = Candidates_Job;
export type Candidates_Job$key = {
    readonly " $data"?: Candidates_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"Candidates_Job">;
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
  "name": "Candidates_Job",
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
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v0/*: any*/)
  ],
  "type": "Job",
  "abstractKey": null
};
})();
(node as any).hash = '1bb0de32dd15adcea3d58b9b39ca8d07';
export default node;

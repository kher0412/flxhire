/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RequestMoreInfoDialog_Job = {
    readonly rawId: number | null;
    readonly screeningRequestMessageTemplate: string | null;
    readonly questions: ReadonlyArray<{
        readonly rawId: number;
        readonly title: string | null;
    }> | null;
    readonly project: {
        readonly rawId: number;
        readonly title: string | null;
        readonly description: string | null;
    } | null;
    readonly " $refType": "RequestMoreInfoDialog_Job";
};
export type RequestMoreInfoDialog_Job$data = RequestMoreInfoDialog_Job;
export type RequestMoreInfoDialog_Job$key = {
    readonly " $data"?: RequestMoreInfoDialog_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"RequestMoreInfoDialog_Job">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RequestMoreInfoDialog_Job",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "screeningRequestMessageTemplate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Question",
      "kind": "LinkedField",
      "name": "questions",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Project",
      "kind": "LinkedField",
      "name": "project",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
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
(node as any).hash = '3165c440aa80f241e15cc5459e858aa7';
export default node;

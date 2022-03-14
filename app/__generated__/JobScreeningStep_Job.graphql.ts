/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobStatus = "closed" | "draft" | "opened";
export type JobScreeningStep_Job = {
    readonly rawId: number | null;
    readonly slug: string | null;
    readonly status: JobStatus | null;
    readonly screeningRequestMessageTemplate: string | null;
    readonly autoSendScreeningRequests: boolean | null;
    readonly allowTextualAnswers: boolean;
    readonly questions: ReadonlyArray<{
        readonly rawId: number;
        readonly title: string | null;
        readonly status: string | null;
        readonly description: string | null;
        readonly answersCount: number | null;
        readonly jobsCount: number | null;
        readonly maxDuration: number | null;
    }> | null;
    readonly project: {
        readonly rawId: number;
        readonly title: string | null;
        readonly description: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"JobScreeningForm_Job">;
    readonly " $refType": "JobScreeningStep_Job";
};
export type JobScreeningStep_Job$data = JobScreeningStep_Job;
export type JobScreeningStep_Job$key = {
    readonly " $data"?: JobScreeningStep_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"JobScreeningStep_Job">;
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
  "name": "status",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JobScreeningStep_Job",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    (v1/*: any*/),
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
      "kind": "ScalarField",
      "name": "autoSendScreeningRequests",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "allowTextualAnswers",
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
        (v2/*: any*/),
        (v1/*: any*/),
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "answersCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "jobsCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "maxDuration",
          "storageKey": null
        }
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
        (v2/*: any*/),
        (v3/*: any*/)
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JobScreeningForm_Job"
    }
  ],
  "type": "Job",
  "abstractKey": null
};
})();
(node as any).hash = '2a1d9178f6ac618b54a2083b5deb93f9';
export default node;

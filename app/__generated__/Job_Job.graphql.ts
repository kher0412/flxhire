/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobStatus = "closed" | "draft" | "opened";
export type Position = "freelancer" | "permanent";
export type Job_Job = {
    readonly title: string;
    readonly user: {
        readonly firm: {
            readonly slug: string | null;
        } | null;
    } | null;
    readonly slug: string | null;
    readonly status: JobStatus | null;
    readonly expiresAt: string | null;
    readonly clientRate: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly minClientRate: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly freelancerRate: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly minFreelancerRate: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly autoRenew: boolean | null;
    readonly freelancerType: {
        readonly name: string | null;
    } | null;
    readonly jobSkills: ReadonlyArray<{
        readonly required: boolean | null;
        readonly requiredYears: number | null;
        readonly groupIndex: number | null;
        readonly skill: {
            readonly rawId: number | null;
            readonly name: string | null;
        } | null;
    }>;
    readonly positionTypes: ReadonlyArray<Position>;
    readonly projectLengthInMonths: number | null;
    readonly " $fragmentRefs": FragmentRefs<"LocationTypeListItem_Job" | "JobActions_Job">;
    readonly " $refType": "Job_Job";
};
export type Job_Job$data = Job_Job;
export type Job_Job$key = {
    readonly " $data"?: Job_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"Job_Job">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v1 = [
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
  "name": "Job_Job",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
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
      "kind": "ScalarField",
      "name": "expiresAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "clientRate",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "minClientRate",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "freelancerRate",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "minFreelancerRate",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "autoRenew",
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
        (v2/*: any*/)
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
          "kind": "ScalarField",
          "name": "required",
          "storageKey": null
        },
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
          "kind": "ScalarField",
          "name": "groupIndex",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Skill",
          "kind": "LinkedField",
          "name": "skill",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "rawId",
              "storageKey": null
            },
            (v2/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "positionTypes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "projectLengthInMonths",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LocationTypeListItem_Job"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JobActions_Job"
    }
  ],
  "type": "Job",
  "abstractKey": null
};
})();
(node as any).hash = '8e5d8112dc2f14f27cc3bca1dba90c1e';
export default node;

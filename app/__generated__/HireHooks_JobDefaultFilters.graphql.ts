/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Position = "freelancer" | "permanent";
export type HireHooks_JobDefaultFilters = {
    readonly id: string;
    readonly updatedAt: string | null;
    readonly jobTimezone: string | null;
    readonly positionTypes: ReadonlyArray<Position>;
    readonly defaultDistance: number | null;
    readonly locationLatitude: number | null;
    readonly locationLongitude: number | null;
    readonly clientRate: {
        readonly currency: {
            readonly code: string | null;
        };
        readonly value: number;
    } | null;
    readonly timezoneValue: number | null;
    readonly timezoneRange: number | null;
    readonly jobCountries: ReadonlyArray<string>;
    readonly locationType: string | null;
    readonly requiredExperienceYears: number | null;
    readonly jobSkills: ReadonlyArray<{
        readonly required: boolean | null;
        readonly requiredYears: number | null;
        readonly groupIndex: number | null;
        readonly skill: {
            readonly rawId: number | null;
            readonly name: string | null;
        } | null;
    }>;
    readonly jobSubtypes: ReadonlyArray<{
        readonly groupIndex: number | null;
        readonly freelancerSubtype: {
            readonly rawId: number | null;
            readonly name: string | null;
        } | null;
    }>;
    readonly " $refType": "HireHooks_JobDefaultFilters";
};
export type HireHooks_JobDefaultFilters$data = HireHooks_JobDefaultFilters;
export type HireHooks_JobDefaultFilters$key = {
    readonly " $data"?: HireHooks_JobDefaultFilters$data;
    readonly " $fragmentRefs": FragmentRefs<"HireHooks_JobDefaultFilters">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "groupIndex",
  "storageKey": null
},
v1 = [
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
  "name": "HireHooks_JobDefaultFilters",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "jobTimezone",
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
      "name": "defaultDistance",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locationLatitude",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locationLongitude",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "clientRate",
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
      "name": "timezoneValue",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timezoneRange",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "jobCountries",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locationType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "requiredExperienceYears",
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Skill",
          "kind": "LinkedField",
          "name": "skill",
          "plural": false,
          "selections": (v1/*: any*/),
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "FreelancerSubtype",
          "kind": "LinkedField",
          "name": "freelancerSubtype",
          "plural": false,
          "selections": (v1/*: any*/),
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
(node as any).hash = '0ddc872be36b521b1ba1b448df54cd60';
export default node;

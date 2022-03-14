/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobStatus = "closed" | "draft" | "opened";
export type Position = "freelancer" | "permanent";
export type JobDetailsStep_Job = {
    readonly title: string;
    readonly description: string | null;
    readonly descriptionExperience: string | null;
    readonly descriptionResponsibilities: string | null;
    readonly user: {
        readonly rawId: number | null;
        readonly name: string | null;
        readonly firm: {
            readonly name: string | null;
            readonly description: string | null;
            readonly website: string | null;
        } | null;
    } | null;
    readonly status: JobStatus | null;
    readonly freelancerType: {
        readonly rawId: number | null;
    } | null;
    readonly jobSubtypes: ReadonlyArray<{
        readonly groupIndex: number | null;
        readonly freelancerSubtype: {
            readonly rawId: number | null;
            readonly name: string | null;
        } | null;
    }>;
    readonly jobSkills: ReadonlyArray<{
        readonly rawId: number | null;
        readonly requiredYears: number | null;
        readonly required: boolean | null;
        readonly groupIndex: number | null;
        readonly skill: {
            readonly rawId: number | null;
            readonly name: string | null;
        } | null;
    }>;
    readonly positionTypes: ReadonlyArray<Position>;
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
    readonly requiredExperienceYears: number | null;
    readonly rateMode: string | null;
    readonly projectLengthInMonths: number | null;
    readonly numberOfHires: number | null;
    readonly locationType: string | null;
    readonly jobCountries: ReadonlyArray<string>;
    readonly jobTimezone: string | null;
    readonly timezoneValue: number | null;
    readonly timezoneRange: number | null;
    readonly fullAddress: string | null;
    readonly country: string | null;
    readonly region: string | null;
    readonly city: string | null;
    readonly locationLatitude: number | null;
    readonly locationLongitude: number | null;
    readonly defaultDistance: number | null;
    readonly " $refType": "JobDetailsStep_Job";
};
export type JobDetailsStep_Job$data = JobDetailsStep_Job;
export type JobDetailsStep_Job$key = {
    readonly " $data"?: JobDetailsStep_Job$data;
    readonly " $fragmentRefs": FragmentRefs<"JobDetailsStep_Job">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
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
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "groupIndex",
  "storageKey": null
},
v4 = [
  (v1/*: any*/),
  (v2/*: any*/)
],
v5 = [
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
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JobDetailsStep_Job",
  "selections": [
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
      "kind": "ScalarField",
      "name": "descriptionExperience",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "descriptionResponsibilities",
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
        (v1/*: any*/),
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Firm",
          "kind": "LinkedField",
          "name": "firm",
          "plural": false,
          "selections": [
            (v2/*: any*/),
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "website",
              "storageKey": null
            }
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
        (v1/*: any*/)
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
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "FreelancerSubtype",
          "kind": "LinkedField",
          "name": "freelancerSubtype",
          "plural": false,
          "selections": (v4/*: any*/),
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
        (v1/*: any*/),
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
          "name": "required",
          "storageKey": null
        },
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Skill",
          "kind": "LinkedField",
          "name": "skill",
          "plural": false,
          "selections": (v4/*: any*/),
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
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "clientRate",
      "plural": false,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "minClientRate",
      "plural": false,
      "selections": (v5/*: any*/),
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
      "kind": "ScalarField",
      "name": "rateMode",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "numberOfHires",
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
      "name": "jobCountries",
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
      "name": "fullAddress",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "country",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "region",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "city",
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
      "kind": "ScalarField",
      "name": "defaultDistance",
      "storageKey": null
    }
  ],
  "type": "Job",
  "abstractKey": null
};
})();
(node as any).hash = 'a397df851417aa973cb4f4e7f5141a70';
export default node;

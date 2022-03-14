/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobScreeningForm_Test_JobQueryVariables = {
    jobSlug?: string | null;
};
export type JobScreeningForm_Test_JobQueryResponse = {
    readonly job: {
        readonly " $fragmentRefs": FragmentRefs<"JobScreeningForm_Job">;
    } | null;
};
export type JobScreeningForm_Test_JobQuery = {
    readonly response: JobScreeningForm_Test_JobQueryResponse;
    readonly variables: JobScreeningForm_Test_JobQueryVariables;
};



/*
query JobScreeningForm_Test_JobQuery(
  $jobSlug: String
) {
  job(slug: $jobSlug) {
    ...JobScreeningForm_Job
    id
  }
}

fragment JobScreeningForm_Job on Job {
  slug
  status
  freelancerType {
    rawId
    name
    slug
    jobsHaveCodeTests
    id
  }
  freelancerSubtypes {
    rawId
    name
    slug
    freelancerType {
      rawId
      id
    }
    id
  }
  jobSkills {
    skill {
      rawId
      name
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "jobSlug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "jobSlug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "JobScreeningForm_Test_JobQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Job",
        "kind": "LinkedField",
        "name": "job",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JobScreeningForm_Job"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "JobScreeningForm_Test_JobQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Job",
        "kind": "LinkedField",
        "name": "job",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
              (v3/*: any*/),
              (v4/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "jobsHaveCodeTests",
                "storageKey": null
              },
              (v5/*: any*/)
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
              (v3/*: any*/),
              (v4/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "FreelancerType",
                "kind": "LinkedField",
                "name": "freelancerType",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/)
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "54298e07fec02e7924087fdc72ccdccb",
    "id": null,
    "metadata": {},
    "name": "JobScreeningForm_Test_JobQuery",
    "operationKind": "query",
    "text": "query JobScreeningForm_Test_JobQuery(\n  $jobSlug: String\n) {\n  job(slug: $jobSlug) {\n    ...JobScreeningForm_Job\n    id\n  }\n}\n\nfragment JobScreeningForm_Job on Job {\n  slug\n  status\n  freelancerType {\n    rawId\n    name\n    slug\n    jobsHaveCodeTests\n    id\n  }\n  freelancerSubtypes {\n    rawId\n    name\n    slug\n    freelancerType {\n      rawId\n      id\n    }\n    id\n  }\n  jobSkills {\n    skill {\n      rawId\n      name\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '45dfcf00671297633c4482eb5ef89314';
export default node;

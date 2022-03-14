/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type JobScreeningStep_Test_JobQueryVariables = {
    jobSlug?: string | null;
    hasJob: boolean;
};
export type JobScreeningStep_Test_JobQueryResponse = {
    readonly job?: {
        readonly " $fragmentRefs": FragmentRefs<"JobScreeningStep_Job">;
    } | null;
};
export type JobScreeningStep_Test_JobQuery = {
    readonly response: JobScreeningStep_Test_JobQueryResponse;
    readonly variables: JobScreeningStep_Test_JobQueryVariables;
};



/*
query JobScreeningStep_Test_JobQuery(
  $jobSlug: String
  $hasJob: Boolean!
) {
  job(slug: $jobSlug) @include(if: $hasJob) {
    ...JobScreeningStep_Job
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

fragment JobScreeningStep_Job on Job {
  rawId
  slug
  status
  screeningRequestMessageTemplate
  autoSendScreeningRequests
  allowTextualAnswers
  questions {
    rawId
    title
    status
    description
    answersCount
    jobsCount
    maxDuration
    id
  }
  project {
    rawId
    title
    description
    id
  }
  ...JobScreeningForm_Job
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasJob"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "jobSlug"
},
v2 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "jobSlug"
  }
],
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
  "name": "slug",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "JobScreeningStep_Test_JobQuery",
    "selections": [
      {
        "condition": "hasJob",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "Job",
            "kind": "LinkedField",
            "name": "job",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "JobScreeningStep_Job"
              }
            ],
            "storageKey": null
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "JobScreeningStep_Test_JobQuery",
    "selections": [
      {
        "condition": "hasJob",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "Job",
            "kind": "LinkedField",
            "name": "job",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
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
                  (v3/*: any*/),
                  (v6/*: any*/),
                  (v5/*: any*/),
                  (v7/*: any*/),
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
                  },
                  (v8/*: any*/)
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
                  (v3/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/)
                ],
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
                  (v9/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "jobsHaveCodeTests",
                    "storageKey": null
                  },
                  (v8/*: any*/)
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
                  (v9/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FreelancerType",
                    "kind": "LinkedField",
                    "name": "freelancerType",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
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
                      (v9/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "0eac91545fb7595cd73c027dea00cbe9",
    "id": null,
    "metadata": {},
    "name": "JobScreeningStep_Test_JobQuery",
    "operationKind": "query",
    "text": "query JobScreeningStep_Test_JobQuery(\n  $jobSlug: String\n  $hasJob: Boolean!\n) {\n  job(slug: $jobSlug) @include(if: $hasJob) {\n    ...JobScreeningStep_Job\n    id\n  }\n}\n\nfragment JobScreeningForm_Job on Job {\n  slug\n  status\n  freelancerType {\n    rawId\n    name\n    slug\n    jobsHaveCodeTests\n    id\n  }\n  freelancerSubtypes {\n    rawId\n    name\n    slug\n    freelancerType {\n      rawId\n      id\n    }\n    id\n  }\n  jobSkills {\n    skill {\n      rawId\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment JobScreeningStep_Job on Job {\n  rawId\n  slug\n  status\n  screeningRequestMessageTemplate\n  autoSendScreeningRequests\n  allowTextualAnswers\n  questions {\n    rawId\n    title\n    status\n    description\n    answersCount\n    jobsCount\n    maxDuration\n    id\n  }\n  project {\n    rawId\n    title\n    description\n    id\n  }\n  ...JobScreeningForm_Job\n}\n"
  }
};
})();
(node as any).hash = '74f6ea21429c779401048d2960ecd8ea';
export default node;

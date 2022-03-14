/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type SourcingCandidate_FreelancerSourcingQueryVariables = {
    jobSlug: string;
};
export type SourcingCandidate_FreelancerSourcingQueryResponse = {
    readonly job: {
        readonly jobSkills: ReadonlyArray<{
            readonly skill: {
                readonly rawId: number | null;
            } | null;
        }>;
    } | null;
};
export type SourcingCandidate_FreelancerSourcingQuery = {
    readonly response: SourcingCandidate_FreelancerSourcingQueryResponse;
    readonly variables: SourcingCandidate_FreelancerSourcingQueryVariables;
};



/*
query SourcingCandidate_FreelancerSourcingQuery(
  $jobSlug: String!
) {
  job(slug: $jobSlug) {
    jobSkills {
      skill {
        rawId
        id
      }
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
  "name": "rawId",
  "storageKey": null
},
v3 = {
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
    "name": "SourcingCandidate_FreelancerSourcingQuery",
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
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
    "name": "SourcingCandidate_FreelancerSourcingQuery",
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
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d0c5cb06393aed91b8d76bc97ed68b91",
    "id": null,
    "metadata": {},
    "name": "SourcingCandidate_FreelancerSourcingQuery",
    "operationKind": "query",
    "text": "query SourcingCandidate_FreelancerSourcingQuery(\n  $jobSlug: String!\n) {\n  job(slug: $jobSlug) {\n    jobSkills {\n      skill {\n        rawId\n        id\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'beaf1a215ca1cf4d9ab1964959de81d9';
export default node;

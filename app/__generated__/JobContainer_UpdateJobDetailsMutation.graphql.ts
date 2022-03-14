/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type JobStatus = "closed" | "draft" | "opened";
export type UpdateJobDetailsInput = {
    autoRenew?: boolean | null;
    availabilityType?: string | null;
    city?: string | null;
    clientMutationId?: string | null;
    clientRate?: MoneyInput | null;
    clientRateCents?: number | null;
    country?: string | null;
    defaultDistance?: number | null;
    description?: string | null;
    descriptionExperience?: string | null;
    descriptionResponsibilities?: string | null;
    freelancerSubtypes?: Array<FreelancerSubtypeAttributes> | null;
    freelancerType?: FreelancerTypeAttributes | null;
    fullAddress?: string | null;
    jobCountries?: Array<string> | null;
    jobSkills?: Array<JobSkillAttributes> | null;
    jobTimezone?: string | null;
    locationLatitude?: number | null;
    locationLongitude?: number | null;
    locationType?: string | null;
    minClientRate?: MoneyInput | null;
    minClientRateCents?: number | null;
    numberOfHires?: number | null;
    positionTypes?: Array<string> | null;
    projectLengthInMonths?: number | null;
    rateMode?: string | null;
    referralBounty?: MoneyInput | null;
    referralBountyCents?: number | null;
    region?: string | null;
    requiredExperienceYears?: number | null;
    slug?: string | null;
    status?: JobStatus | null;
    timezoneRange?: number | null;
    timezoneValue?: number | null;
    title?: string | null;
    userId?: number | null;
};
export type MoneyInput = {
    currencyCode: string;
    value: number;
};
export type FreelancerSubtypeAttributes = {
    groupIndex?: number | null;
    rawId?: number | null;
};
export type FreelancerTypeAttributes = {
    rawId?: number | null;
};
export type JobSkillAttributes = {
    groupIndex?: number | null;
    name?: string | null;
    rawId?: number | null;
    rawSkillId?: number | null;
    required?: boolean | null;
    requiredYears?: number | null;
};
export type JobContainer_UpdateJobDetailsMutationVariables = {
    input: UpdateJobDetailsInput;
};
export type JobContainer_UpdateJobDetailsMutationResponse = {
    readonly updateJobDetails: {
        readonly job: {
            readonly autoRenew: boolean | null;
        } | null;
    } | null;
};
export type JobContainer_UpdateJobDetailsMutation = {
    readonly response: JobContainer_UpdateJobDetailsMutationResponse;
    readonly variables: JobContainer_UpdateJobDetailsMutationVariables;
};



/*
mutation JobContainer_UpdateJobDetailsMutation(
  $input: UpdateJobDetailsInput!
) {
  updateJobDetails(input: $input) {
    job {
      autoRenew
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "autoRenew",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "JobContainer_UpdateJobDetailsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateJobDetailsPayload",
        "kind": "LinkedField",
        "name": "updateJobDetails",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Job",
            "kind": "LinkedField",
            "name": "job",
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "JobContainer_UpdateJobDetailsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateJobDetailsPayload",
        "kind": "LinkedField",
        "name": "updateJobDetails",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
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
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fede589daea2491b1538bd94f4ef087e",
    "id": null,
    "metadata": {},
    "name": "JobContainer_UpdateJobDetailsMutation",
    "operationKind": "mutation",
    "text": "mutation JobContainer_UpdateJobDetailsMutation(\n  $input: UpdateJobDetailsInput!\n) {\n  updateJobDetails(input: $input) {\n    job {\n      autoRenew\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '40897e6774db1553d5e21eb8174781eb';
export default node;

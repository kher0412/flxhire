/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractRequestsStatus = "completed" | "pending" | "rejected" | "started";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type SendContractRequestsInput = {
    clientMutationId?: string | null;
    contractId: string;
    messageTemplate?: string | null;
    projectDescription?: string | null;
    projectId?: number | null;
    projectTitle?: string | null;
    questionsIds?: Array<number> | null;
    questionsTitles?: Array<string> | null;
    videoIntroduction?: boolean | null;
};
export type FreelancerCardSlider_RequestVideoIntroductionMutationVariables = {
    input: SendContractRequestsInput;
    connections: Array<string>;
};
export type FreelancerCardSlider_RequestVideoIntroductionMutationResponse = {
    readonly sendContractRequests: {
        readonly contract: {
            readonly id: string;
            readonly status: ContractStatus;
            readonly requestsStatus: ContractRequestsStatus | null;
            readonly lastInteractionAt: string | null;
            readonly " $fragmentRefs": FragmentRefs<"RequestMoreInfoDialog_Contract">;
        } | null;
    } | null;
};
export type FreelancerCardSlider_RequestVideoIntroductionMutation = {
    readonly response: FreelancerCardSlider_RequestVideoIntroductionMutationResponse;
    readonly variables: FreelancerCardSlider_RequestVideoIntroductionMutationVariables;
};



/*
mutation FreelancerCardSlider_RequestVideoIntroductionMutation(
  $input: SendContractRequestsInput!
) {
  sendContractRequests(input: $input) {
    contract {
      id
      status
      requestsStatus
      lastInteractionAt
      ...RequestMoreInfoDialog_Contract
    }
  }
}

fragment RequestMoreInfoDialog_Contract on Contract {
  id
  rawId
  answers {
    question {
      rawId
      id
    }
    id
  }
  projectSubmission {
    url
    screenshotUrl
    description
    project {
      title
      id
    }
    id
  }
  contractRequests {
    status
    requestType
    question {
      rawId
      title
      id
    }
    project {
      rawId
      title
      description
      id
    }
    projectSubmission {
      rawId
      url
      screenshotUrl
      description
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "requestsStatus",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastInteractionAt",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "screenshotUrl",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
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
    "name": "FreelancerCardSlider_RequestVideoIntroductionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "SendContractRequestsPayload",
        "kind": "LinkedField",
        "name": "sendContractRequests",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "RequestMoreInfoDialog_Contract"
              }
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "FreelancerCardSlider_RequestVideoIntroductionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "SendContractRequestsPayload",
        "kind": "LinkedField",
        "name": "sendContractRequests",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "contract",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteEdge",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connections"
                  }
                ]
              },
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Video",
                "kind": "LinkedField",
                "name": "answers",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Question",
                    "kind": "LinkedField",
                    "name": "question",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ProjectSubmission",
                "kind": "LinkedField",
                "name": "projectSubmission",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Project",
                    "kind": "LinkedField",
                    "name": "project",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ContractRequest",
                "kind": "LinkedField",
                "name": "contractRequests",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "requestType",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Question",
                    "kind": "LinkedField",
                    "name": "question",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v11/*: any*/),
                      (v3/*: any*/)
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
                      (v7/*: any*/),
                      (v11/*: any*/),
                      (v10/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ProjectSubmission",
                    "kind": "LinkedField",
                    "name": "projectSubmission",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
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
    "cacheID": "94114593383e056b26c7391f6ceeb8e0",
    "id": null,
    "metadata": {},
    "name": "FreelancerCardSlider_RequestVideoIntroductionMutation",
    "operationKind": "mutation",
    "text": "mutation FreelancerCardSlider_RequestVideoIntroductionMutation(\n  $input: SendContractRequestsInput!\n) {\n  sendContractRequests(input: $input) {\n    contract {\n      id\n      status\n      requestsStatus\n      lastInteractionAt\n      ...RequestMoreInfoDialog_Contract\n    }\n  }\n}\n\nfragment RequestMoreInfoDialog_Contract on Contract {\n  id\n  rawId\n  answers {\n    question {\n      rawId\n      id\n    }\n    id\n  }\n  projectSubmission {\n    url\n    screenshotUrl\n    description\n    project {\n      title\n      id\n    }\n    id\n  }\n  contractRequests {\n    status\n    requestType\n    question {\n      rawId\n      title\n      id\n    }\n    project {\n      rawId\n      title\n      description\n      id\n    }\n    projectSubmission {\n      rawId\n      url\n      screenshotUrl\n      description\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '1cebfe5cf21056d5133517640e5ac730';
export default node;

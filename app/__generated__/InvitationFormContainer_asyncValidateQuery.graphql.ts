/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type InvitationFormContainer_asyncValidateQueryVariables = {
    freelancerEmail: string;
};
export type InvitationFormContainer_asyncValidateQueryResponse = {
    readonly contract: {
        readonly id: string;
        readonly status: ContractStatus;
    } | null;
};
export type InvitationFormContainer_asyncValidateQuery = {
    readonly response: InvitationFormContainer_asyncValidateQueryResponse;
    readonly variables: InvitationFormContainer_asyncValidateQueryVariables;
};



/*
query InvitationFormContainer_asyncValidateQuery(
  $freelancerEmail: String!
) {
  contract(freelancerEmail: $freelancerEmail) {
    id
    status
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "freelancerEmail"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "freelancerEmail",
        "variableName": "freelancerEmail"
      }
    ],
    "concreteType": "Contract",
    "kind": "LinkedField",
    "name": "contract",
    "plural": false,
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
        "name": "status",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InvitationFormContainer_asyncValidateQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InvitationFormContainer_asyncValidateQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0b20294a6548493f558ee6fcf731ab3a",
    "id": null,
    "metadata": {},
    "name": "InvitationFormContainer_asyncValidateQuery",
    "operationKind": "query",
    "text": "query InvitationFormContainer_asyncValidateQuery(\n  $freelancerEmail: String!\n) {\n  contract(freelancerEmail: $freelancerEmail) {\n    id\n    status\n  }\n}\n"
  }
};
})();
(node as any).hash = '12b6a5423e2779729ec4531489bd0aff';
export default node;

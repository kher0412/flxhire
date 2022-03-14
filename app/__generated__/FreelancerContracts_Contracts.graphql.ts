/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractRequestsStatus = "completed" | "pending" | "rejected" | "started";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type FreelancerContracts_Contracts = {
    readonly hidden: boolean | null;
    readonly profile: {
        readonly slug: string | null;
    } | null;
    readonly freelancerContracts: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly rawId: number | null;
                readonly id: string;
                readonly hidden: boolean | null;
                readonly lastInteractionAt: string | null;
                readonly status: ContractStatus;
                readonly previousStatus: string | null;
                readonly requestsStatus: ContractRequestsStatus | null;
                readonly applicantSource: string | null;
                readonly jobApplicationReminderSentAt: string | null;
                readonly profileJobIncompatibilityReasons: ReadonlyArray<string> | null;
                readonly contractRequests: ReadonlyArray<{
                    readonly id: string;
                }> | null;
                readonly job: {
                    readonly slug: string | null;
                    readonly title: string;
                } | null;
                readonly client: {
                    readonly firm: {
                        readonly name: string | null;
                        readonly slug: string | null;
                    } | null;
                } | null;
                readonly referer: {
                    readonly name: string | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "FreelancerContracts_Contracts";
};
export type FreelancerContracts_Contracts$data = FreelancerContracts_Contracts;
export type FreelancerContracts_Contracts$key = {
    readonly " $data"?: FreelancerContracts_Contracts$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerContracts_Contracts">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hidden",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
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
  "name": "FreelancerContracts_Contracts",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 5
        }
      ],
      "concreteType": "ContractConnection",
      "kind": "LinkedField",
      "name": "freelancerContracts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ContractEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Contract",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "rawId",
                  "storageKey": null
                },
                (v2/*: any*/),
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "lastInteractionAt",
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
                  "kind": "ScalarField",
                  "name": "previousStatus",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "requestsStatus",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "applicantSource",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "jobApplicationReminderSentAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "profileJobIncompatibilityReasons",
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
                    (v2/*: any*/)
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Job",
                  "kind": "LinkedField",
                  "name": "job",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "title",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "User",
                  "kind": "LinkedField",
                  "name": "client",
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
                        (v3/*: any*/),
                        (v1/*: any*/)
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "User",
                  "kind": "LinkedField",
                  "name": "referer",
                  "plural": false,
                  "selections": [
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
      ],
      "storageKey": "freelancerContracts(first:5)"
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();
(node as any).hash = 'c0d948fd2a22fa3186514ba315692e74';
export default node;

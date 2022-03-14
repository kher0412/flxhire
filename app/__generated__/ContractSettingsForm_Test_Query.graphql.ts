/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "active" | "deleted" | "expired" | "freelancer_not_interested" | "interview_accepted" | "interview_rejected" | "job_application_draft" | "job_application_invited" | "job_application_sent" | "job_viewed" | "offer_made" | "offer_rejected" | "paused" | "pending" | "potential" | "rejected";
export type ContractSettingsForm_Test_QueryVariables = {
    contractId: string;
};
export type ContractSettingsForm_Test_QueryResponse = {
    readonly contract: {
        readonly currency?: {
            readonly code: string | null;
        };
        readonly startDate?: string | null;
        readonly endDate?: string | null;
        readonly isManager?: boolean | null;
        readonly isFirmAdmin?: boolean | null;
        readonly status?: ContractStatus;
        readonly " $fragmentRefs": FragmentRefs<"ContractSettingsForm_Contract">;
    } | null;
    readonly currentUser: {
        readonly " $fragmentRefs": FragmentRefs<"ContractSettingsForm_User">;
    } | null;
};
export type ContractSettingsForm_Test_Query = {
    readonly response: ContractSettingsForm_Test_QueryResponse;
    readonly variables: ContractSettingsForm_Test_QueryVariables;
};



/*
query ContractSettingsForm_Test_Query(
  $contractId: ID!
) {
  contract: node(id: $contractId) {
    __typename
    ... on Contract {
      currency {
        code
        id
      }
      startDate
      endDate
      isManager
      isFirmAdmin
      status
      ...ContractSettingsForm_Contract
    }
    id
  }
  currentUser {
    ...ContractSettingsForm_User
    id
  }
}

fragment ContractSettingsForm_Contract on Contract {
  id
  client {
    self
    id
  }
  freelancer {
    __typename
    id
  }
  firm {
    users {
      id
      rawId
      name
    }
    id
  }
  freelancerFirstName
  freelancerName
  freelancerRate {
    currency {
      code
      id
    }
    value
  }
  rateMode
  isManager
  status
  startDate
}

fragment ContractSettingsForm_User on User {
  id
  managerContract {
    allowManageAccess
    isFirmAdmin
    id
  }
  configuration {
    enableAutoBonuses
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "contractId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "contractId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startDate",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endDate",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isManager",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFirmAdmin",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v9/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ContractSettingsForm_Test_Query",
    "selections": [
      {
        "alias": "contract",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Currency",
                "kind": "LinkedField",
                "name": "currency",
                "plural": false,
                "selections": [
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ContractSettingsForm_Contract"
              }
            ],
            "type": "Contract",
            "abstractKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ContractSettingsForm_User"
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
    "name": "ContractSettingsForm_Test_Query",
    "selections": [
      {
        "alias": "contract",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v10/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
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
                    "kind": "ScalarField",
                    "name": "self",
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "freelancer",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Firm",
                "kind": "LinkedField",
                "name": "firm",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "users",
                    "plural": true,
                    "selections": [
                      (v9/*: any*/),
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
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "freelancerFirstName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "freelancerName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "freelancerRate",
                "plural": false,
                "selections": [
                  (v10/*: any*/),
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
                "name": "rateMode",
                "storageKey": null
              }
            ],
            "type": "Contract",
            "abstractKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "managerContract",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "allowManageAccess",
                "storageKey": null
              },
              (v6/*: any*/),
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Configuration",
            "kind": "LinkedField",
            "name": "configuration",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "enableAutoBonuses",
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
    "cacheID": "64f000d3fe48e62ae5a6838e37f98b2c",
    "id": null,
    "metadata": {},
    "name": "ContractSettingsForm_Test_Query",
    "operationKind": "query",
    "text": "query ContractSettingsForm_Test_Query(\n  $contractId: ID!\n) {\n  contract: node(id: $contractId) {\n    __typename\n    ... on Contract {\n      currency {\n        code\n        id\n      }\n      startDate\n      endDate\n      isManager\n      isFirmAdmin\n      status\n      ...ContractSettingsForm_Contract\n    }\n    id\n  }\n  currentUser {\n    ...ContractSettingsForm_User\n    id\n  }\n}\n\nfragment ContractSettingsForm_Contract on Contract {\n  id\n  client {\n    self\n    id\n  }\n  freelancer {\n    __typename\n    id\n  }\n  firm {\n    users {\n      id\n      rawId\n      name\n    }\n    id\n  }\n  freelancerFirstName\n  freelancerName\n  freelancerRate {\n    currency {\n      code\n      id\n    }\n    value\n  }\n  rateMode\n  isManager\n  status\n  startDate\n}\n\nfragment ContractSettingsForm_User on User {\n  id\n  managerContract {\n    allowManageAccess\n    isFirmAdmin\n    id\n  }\n  configuration {\n    enableAutoBonuses\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd0c15f7632c61822c1ca58a164081ffa';
export default node;

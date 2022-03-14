/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type FirmRole = "firm_admin" | "firm_member";
export type ContractsFilters = {
    clientId?: string | null;
    excludeSelf?: boolean | null;
    firmRole?: FirmRole | null;
    freelancerId?: string | null;
    invitationType?: string | null;
    jobId?: string | null;
    managersOnly?: boolean | null;
    membersOnly?: boolean | null;
    name?: string | null;
    skillsIds?: Array<number> | null;
    stage?: string | null;
    statuses?: Array<string> | null;
    tagsIds?: Array<number> | null;
};
export type TeamHeaderTabsWithCounter_QueryVariables = {
    individualFilters?: ContractsFilters | null;
    managerFilters?: ContractsFilters | null;
    adminFilters?: ContractsFilters | null;
    invitedFilters?: ContractsFilters | null;
};
export type TeamHeaderTabsWithCounter_QueryResponse = {
    readonly currentUser: {
        readonly firm: {
            readonly individualContracts: {
                readonly totalCount: number | null;
            } | null;
            readonly managerContracts: {
                readonly totalCount: number | null;
            } | null;
            readonly adminContracts: {
                readonly totalCount: number | null;
            } | null;
            readonly invitedContracts: {
                readonly totalCount: number | null;
            } | null;
        } | null;
    } | null;
};
export type TeamHeaderTabsWithCounter_Query = {
    readonly response: TeamHeaderTabsWithCounter_QueryResponse;
    readonly variables: TeamHeaderTabsWithCounter_QueryVariables;
};



/*
query TeamHeaderTabsWithCounter_Query(
  $individualFilters: ContractsFilters
  $managerFilters: ContractsFilters
  $adminFilters: ContractsFilters
  $invitedFilters: ContractsFilters
) {
  currentUser {
    firm {
      individualContracts: contracts(filters: $individualFilters) {
        totalCount
      }
      managerContracts: contracts(filters: $managerFilters) {
        totalCount
      }
      adminContracts: contracts(filters: $adminFilters) {
        totalCount
      }
      invitedContracts: contracts(filters: $invitedFilters) {
        totalCount
      }
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
  "name": "adminFilters"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "individualFilters"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "invitedFilters"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "managerFilters"
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
],
v5 = {
  "alias": "individualContracts",
  "args": [
    {
      "kind": "Variable",
      "name": "filters",
      "variableName": "individualFilters"
    }
  ],
  "concreteType": "ContractConnection",
  "kind": "LinkedField",
  "name": "contracts",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v6 = {
  "alias": "managerContracts",
  "args": [
    {
      "kind": "Variable",
      "name": "filters",
      "variableName": "managerFilters"
    }
  ],
  "concreteType": "ContractConnection",
  "kind": "LinkedField",
  "name": "contracts",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v7 = {
  "alias": "adminContracts",
  "args": [
    {
      "kind": "Variable",
      "name": "filters",
      "variableName": "adminFilters"
    }
  ],
  "concreteType": "ContractConnection",
  "kind": "LinkedField",
  "name": "contracts",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": "invitedContracts",
  "args": [
    {
      "kind": "Variable",
      "name": "filters",
      "variableName": "invitedFilters"
    }
  ],
  "concreteType": "ContractConnection",
  "kind": "LinkedField",
  "name": "contracts",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TeamHeaderTabsWithCounter_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
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
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "TeamHeaderTabsWithCounter_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
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
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "02d505c613b7c5e4d8f22a600930c66d",
    "id": null,
    "metadata": {},
    "name": "TeamHeaderTabsWithCounter_Query",
    "operationKind": "query",
    "text": "query TeamHeaderTabsWithCounter_Query(\n  $individualFilters: ContractsFilters\n  $managerFilters: ContractsFilters\n  $adminFilters: ContractsFilters\n  $invitedFilters: ContractsFilters\n) {\n  currentUser {\n    firm {\n      individualContracts: contracts(filters: $individualFilters) {\n        totalCount\n      }\n      managerContracts: contracts(filters: $managerFilters) {\n        totalCount\n      }\n      adminContracts: contracts(filters: $adminFilters) {\n        totalCount\n      }\n      invitedContracts: contracts(filters: $invitedFilters) {\n        totalCount\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a1e6f2dc03397514afe72c556146923b';
export default node;

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
export type TeamHeader_SelectAllQueryVariables = {
    filters?: ContractsFilters | null;
};
export type TeamHeader_SelectAllQueryResponse = {
    readonly currentUser: {
        readonly firm: {
            readonly contracts: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly rawId: number | null;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
};
export type TeamHeader_SelectAllQuery = {
    readonly response: TeamHeader_SelectAllQueryResponse;
    readonly variables: TeamHeader_SelectAllQueryVariables;
};



/*
query TeamHeader_SelectAllQuery(
  $filters: ContractsFilters
) {
  currentUser {
    firm {
      contracts(filters: $filters) {
        edges {
          node {
            rawId
            id
          }
        }
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
    "name": "filters"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "filters",
    "variableName": "filters"
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
    "name": "TeamHeader_SelectAllQuery",
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
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "ContractConnection",
                "kind": "LinkedField",
                "name": "contracts",
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
    "name": "TeamHeader_SelectAllQuery",
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
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "ContractConnection",
                "kind": "LinkedField",
                "name": "contracts",
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
                          (v2/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
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
    "cacheID": "371ec72b8afbdf6755174ddaf7fdd7f3",
    "id": null,
    "metadata": {},
    "name": "TeamHeader_SelectAllQuery",
    "operationKind": "query",
    "text": "query TeamHeader_SelectAllQuery(\n  $filters: ContractsFilters\n) {\n  currentUser {\n    firm {\n      contracts(filters: $filters) {\n        edges {\n          node {\n            rawId\n            id\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '7b1a29b9cc646f2a48296c653ed339bc';
export default node;

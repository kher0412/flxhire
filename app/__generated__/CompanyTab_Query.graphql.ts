/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type CompanyTab_QueryVariables = {};
export type CompanyTab_QueryResponse = {
    readonly currentUser: {
        readonly firm: {
            readonly logoUrl: string | null;
            readonly name: string | null;
            readonly website: string | null;
            readonly description: string | null;
            readonly backgroundTheme: string | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"CompanyForm_User">;
    } | null;
};
export type CompanyTab_Query = {
    readonly response: CompanyTab_QueryResponse;
    readonly variables: CompanyTab_QueryVariables;
};



/*
query CompanyTab_Query {
  currentUser {
    ...CompanyForm_User
    firm {
      logoUrl
      name
      website
      description
      backgroundTheme
      id
    }
    id
  }
}

fragment CompanyForm_User on User {
  managerContract {
    isFirmAdmin
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "logoUrl",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "website",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "backgroundTheme",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CompanyTab_Query",
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
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CompanyForm_User"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CompanyTab_Query",
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
            "concreteType": "Contract",
            "kind": "LinkedField",
            "name": "managerContract",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isFirmAdmin",
                "storageKey": null
              },
              (v5/*: any*/)
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
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
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
    "cacheID": "ef45750979ce8b0d0fd93172a2c7a927",
    "id": null,
    "metadata": {},
    "name": "CompanyTab_Query",
    "operationKind": "query",
    "text": "query CompanyTab_Query {\n  currentUser {\n    ...CompanyForm_User\n    firm {\n      logoUrl\n      name\n      website\n      description\n      backgroundTheme\n      id\n    }\n    id\n  }\n}\n\nfragment CompanyForm_User on User {\n  managerContract {\n    isFirmAdmin\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '27225c9c5631bc2f756a7e1c2b781e41';
export default node;

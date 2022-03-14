/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type UserRole = "admin" | "client" | "customer_success_rep" | "member" | "recruiter" | "sales" | "screening";
export type Account_QueryVariables = {};
export type Account_QueryResponse = {
    readonly currentUser: {
        readonly roles: ReadonlyArray<UserRole>;
        readonly " $fragmentRefs": FragmentRefs<"AccountTab_User">;
    } | null;
};
export type Account_Query = {
    readonly response: Account_QueryResponse;
    readonly variables: Account_QueryVariables;
};



/*
query Account_Query {
  currentUser {
    roles
    ...AccountTab_User
    id
  }
}

fragment AccountTab_User on User {
  firstName
  lastName
  email
  unconfirmedEmail
  phone
  avatarUrl
  roles
  teamInvitationMessage
  sendTimesheetReminders
  profile {
    visibility
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "roles",
  "storageKey": null
},
v1 = {
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
    "name": "Account_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AccountTab_User"
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
    "name": "Account_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "firstName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "unconfirmedEmail",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "phone",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatarUrl",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "teamInvitationMessage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sendTimesheetReminders",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "visibility",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "36930bce6de98440b5a46aecb158aebc",
    "id": null,
    "metadata": {},
    "name": "Account_Query",
    "operationKind": "query",
    "text": "query Account_Query {\n  currentUser {\n    roles\n    ...AccountTab_User\n    id\n  }\n}\n\nfragment AccountTab_User on User {\n  firstName\n  lastName\n  email\n  unconfirmedEmail\n  phone\n  avatarUrl\n  roles\n  teamInvitationMessage\n  sendTimesheetReminders\n  profile {\n    visibility\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f46a6a73a8fda61da7855ef9b63649e4';
export default node;

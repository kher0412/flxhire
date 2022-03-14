/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type AccountTab_Test_QueryVariables = {};
export type AccountTab_Test_QueryResponse = {
    readonly currentUser: {
        readonly " $fragmentRefs": FragmentRefs<"AccountTab_User">;
    } | null;
};
export type AccountTab_Test_Query = {
    readonly response: AccountTab_Test_QueryResponse;
    readonly variables: AccountTab_Test_QueryVariables;
};



/*
query AccountTab_Test_Query {
  currentUser {
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
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AccountTab_Test_Query",
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
    "name": "AccountTab_Test_Query",
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
            "name": "roles",
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
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "321425dc123a61029dc95ae0c9cfdd12",
    "id": null,
    "metadata": {},
    "name": "AccountTab_Test_Query",
    "operationKind": "query",
    "text": "query AccountTab_Test_Query {\n  currentUser {\n    ...AccountTab_User\n    id\n  }\n}\n\nfragment AccountTab_User on User {\n  firstName\n  lastName\n  email\n  unconfirmedEmail\n  phone\n  avatarUrl\n  roles\n  teamInvitationMessage\n  sendTimesheetReminders\n  profile {\n    visibility\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bfa2ffe86b4a02a4756ba2e70faa3518';
export default node;

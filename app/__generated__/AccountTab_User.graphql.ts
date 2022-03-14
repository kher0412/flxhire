/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type UserRole = "admin" | "client" | "customer_success_rep" | "member" | "recruiter" | "sales" | "screening";
export type AccountTab_User = {
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly email: string | null;
    readonly unconfirmedEmail: string | null;
    readonly phone: string | null;
    readonly avatarUrl: string | null;
    readonly roles: ReadonlyArray<UserRole>;
    readonly teamInvitationMessage: string | null;
    readonly sendTimesheetReminders: boolean | null;
    readonly profile: {
        readonly visibility: string | null;
    } | null;
    readonly " $refType": "AccountTab_User";
};
export type AccountTab_User$data = AccountTab_User;
export type AccountTab_User$key = {
    readonly " $data"?: AccountTab_User$data;
    readonly " $fragmentRefs": FragmentRefs<"AccountTab_User">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountTab_User",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'afeed924e092d990b8428b81c53c7c10';
export default node;

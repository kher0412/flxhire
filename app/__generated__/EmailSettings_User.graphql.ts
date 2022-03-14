/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type SubscriptionName = "freelancer_incomplete" | "job_opportunity" | "referral_opportunity" | "timesheet_reminders";
export type EmailSettings_User = {
    readonly emailSubscriptions: ReadonlyArray<{
        readonly id: string;
        readonly subscriptionName: SubscriptionName | null;
        readonly userEnabled: boolean | null;
    }> | null;
    readonly " $refType": "EmailSettings_User";
};
export type EmailSettings_User$data = EmailSettings_User;
export type EmailSettings_User$key = {
    readonly " $data"?: EmailSettings_User$data;
    readonly " $fragmentRefs": FragmentRefs<"EmailSettings_User">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EmailSettings_User",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "EmailSubscription",
      "kind": "LinkedField",
      "name": "emailSubscriptions",
      "plural": true,
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
          "name": "subscriptionName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "userEnabled",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'ef050012ec2685e77f872ff1943fcaf4';
export default node;

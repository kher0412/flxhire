/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Application_Contract = {
    readonly job: {
        readonly " $fragmentRefs": FragmentRefs<"Freelancer_Job">;
    } | null;
    readonly freelancer: {
        readonly " $fragmentRefs": FragmentRefs<"Freelancer_Freelancer">;
    } | null;
    readonly client: {
        readonly firm: {
            readonly slug: string | null;
        } | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"Freelancer_Contract">;
    readonly " $refType": "Application_Contract";
};
export type Application_Contract$data = Application_Contract;
export type Application_Contract$key = {
    readonly " $data"?: Application_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"Application_Contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Application_Contract",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Job",
      "kind": "LinkedField",
      "name": "job",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Freelancer_Job"
        }
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
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Freelancer_Freelancer"
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "slug",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Freelancer_Contract"
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = '34845225eb22790c65bf98736c874b3e';
export default node;

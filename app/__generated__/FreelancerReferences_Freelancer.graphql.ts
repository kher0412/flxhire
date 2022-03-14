/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type FreelancerReferences_Freelancer = {
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly references: ReadonlyArray<{
        readonly name: string | null;
        readonly email: string | null;
        readonly status: string | null;
        readonly relation: string | null;
        readonly otherRelation: string | null;
        readonly comments: string | null;
    }> | null;
    readonly " $refType": "FreelancerReferences_Freelancer";
};
export type FreelancerReferences_Freelancer$data = FreelancerReferences_Freelancer;
export type FreelancerReferences_Freelancer$key = {
    readonly " $data"?: FreelancerReferences_Freelancer$data;
    readonly " $fragmentRefs": FragmentRefs<"FreelancerReferences_Freelancer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FreelancerReferences_Freelancer",
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
      "concreteType": "Reference",
      "kind": "LinkedField",
      "name": "references",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
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
          "name": "status",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "relation",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "otherRelation",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "comments",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '60dc521d42a9037e49cd13914a27e348';
export default node;

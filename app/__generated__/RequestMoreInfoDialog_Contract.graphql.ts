/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RequestMoreInfoDialog_Contract = {
    readonly id: string;
    readonly rawId: number | null;
    readonly answers: ReadonlyArray<{
        readonly question: {
            readonly rawId: number;
        } | null;
    }> | null;
    readonly projectSubmission: {
        readonly url: string | null;
        readonly screenshotUrl: string | null;
        readonly description: string | null;
        readonly project: {
            readonly title: string | null;
        } | null;
    } | null;
    readonly contractRequests: ReadonlyArray<{
        readonly status: string | null;
        readonly requestType: string | null;
        readonly question: {
            readonly rawId: number;
            readonly title: string | null;
        } | null;
        readonly project: {
            readonly rawId: number;
            readonly title: string | null;
            readonly description: string | null;
        } | null;
        readonly projectSubmission: {
            readonly rawId: number;
            readonly url: string | null;
            readonly screenshotUrl: string | null;
            readonly description: string | null;
        } | null;
    }> | null;
    readonly " $refType": "RequestMoreInfoDialog_Contract";
};
export type RequestMoreInfoDialog_Contract$data = RequestMoreInfoDialog_Contract;
export type RequestMoreInfoDialog_Contract$key = {
    readonly " $data"?: RequestMoreInfoDialog_Contract$data;
    readonly " $fragmentRefs": FragmentRefs<"RequestMoreInfoDialog_Contract">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "screenshotUrl",
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
  "name": "title",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RequestMoreInfoDialog_Contract",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Video",
      "kind": "LinkedField",
      "name": "answers",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Question",
          "kind": "LinkedField",
          "name": "question",
          "plural": false,
          "selections": [
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ProjectSubmission",
      "kind": "LinkedField",
      "name": "projectSubmission",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Project",
          "kind": "LinkedField",
          "name": "project",
          "plural": false,
          "selections": [
            (v4/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ContractRequest",
      "kind": "LinkedField",
      "name": "contractRequests",
      "plural": true,
      "selections": [
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
          "name": "requestType",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Question",
          "kind": "LinkedField",
          "name": "question",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v4/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Project",
          "kind": "LinkedField",
          "name": "project",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v4/*: any*/),
            (v3/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ProjectSubmission",
          "kind": "LinkedField",
          "name": "projectSubmission",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            (v2/*: any*/),
            (v3/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
})();
(node as any).hash = 'cd7c7a5a69273f2da010724c9dfe1e94';
export default node;

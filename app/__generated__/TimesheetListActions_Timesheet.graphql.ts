/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type TimesheetStatus = "approved" | "client_query" | "pending" | "rejected" | "submitted" | "void";
export type TimesheetListActions_Timesheet = {
    readonly id: string;
    readonly status: TimesheetStatus | null;
    readonly rawId: number;
    readonly " $refType": "TimesheetListActions_Timesheet";
};
export type TimesheetListActions_Timesheet$data = TimesheetListActions_Timesheet;
export type TimesheetListActions_Timesheet$key = {
    readonly " $data"?: TimesheetListActions_Timesheet$data;
    readonly " $fragmentRefs": FragmentRefs<"TimesheetListActions_Timesheet">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TimesheetListActions_Timesheet",
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
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rawId",
      "storageKey": null
    }
  ],
  "type": "Timesheet",
  "abstractKey": null
};
(node as any).hash = 'de6a42169e685866c934fc4b0b7e2efa';
export default node;

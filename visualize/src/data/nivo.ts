import {NetworkLinkInput, NetworkNodeInput} from "./types";

export const networkNodeInputData: NetworkNodeInput[] = [
  {
    id: "1",
    name: "1",
    size: 5,
    additionRate: 0,
    deletionRate: 0,
  },
  {
    id: "2",
    name: "2",
    size: 5,
    additionRate: 0,
    deletionRate: 0,
  },
];

export const networkLinkInputData: NetworkLinkInput[] = [
  {
    source: "1",
    target: "2",
    type: "add",
    color: "black",
    style: {
      strokeDasharray: "",
    },
  },
];
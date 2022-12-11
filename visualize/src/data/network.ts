
export type NetworkNodeInput = {
  id: string
  name: string
  size: number
  color: string
  additionRate: number
  deletionRate: number
}

export type NetworkLinkInput = {
  source: string
  target: string
  color: string
  style: NetworkLinkStyleInput
}

type NetworkLinkStyleInput = {
  strokeDasharray: string
}

export const networkNodeInputData: NetworkNodeInput[] = [
  {
    id: "1",
    name: "1",
    size: 5,
    color: "black",
    additionRate: 0,
    deletionRate: 0,
  },
  {
    id: "2",
    name: "2",
    size: 5,
    color: "green",
    additionRate: 0.2,
    deletionRate: 0,
  },
  {
    id: "3",
    name: "Node 3\n+112\n-58",
    size: 5,
    color: "black",
    additionRate: 0.2,
    deletionRate: 0.1,
  },
  {
    id: "4",
    name: "4",
    size: 5,
    color: "black",
    additionRate: 0,
    deletionRate: 0,
  },
  {
    id: "5",
    name: "5",
    size: 5,
    color: "red",
    additionRate: 0.2,
    deletionRate: 0.2,
  },
  {
    id: "6",
    name: "6",
    size: 5,
    color: "black",
    additionRate: 0.2,
    deletionRate: 0,
  },
  {
    id: "7",
    name: "7",
    size: 5,
    color: "red",
    additionRate: 0,
    deletionRate: 0.2,
  },
];

export const networkLinkInputData: NetworkLinkInput[] = [
  {
    source: "1",
    target: "2",
    color: "black",
    style: {
      strokeDasharray: "",
    },
  },
  {
    source: "2",
    target: "3",
    color: "black",
    style: {
      strokeDasharray: "",
    },
  },
  {
    source: "2",
    target: "4",
    style: {
      strokeDasharray: "1 2",
    },
    color: "green",
  },
  {
    source: "6",
    target: "5",
    style: {
      strokeDasharray: "1 2",
    },
    color: "green",
  },
  {
    source: "6",
    target: "3",
    color: "black",
    style: {
      strokeDasharray: "",
    },
  },
  {
    source: "7",
    target: "1",
    color: "red",
    style: {
      strokeDasharray: "1 2",
    },
  },
];
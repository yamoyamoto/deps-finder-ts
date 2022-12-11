
export type NetworkNodeInput = {
  id: string
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
    size: 5,
    color: "black",
    additionRate: 0.1,
    deletionRate: 0.1,
  },
  {
    id: "2",
    size: 5,
    color: "green",
    additionRate: 0.1,
    deletionRate: 0.1,
  },
  {
    id: "3",
    size: 5,
    color: "black",
    additionRate: 0.1,
    deletionRate: 0.1,
  },
  {
    id: "4",
    size: 5,
    color: "black",
    additionRate: 0.1,
    deletionRate: 0.1,
  },
  {
    id: "5",
    size: 5,
    color: "red",
    additionRate: 0.1,
    deletionRate: 0.1,
  },
  {
    id: "6",
    size: 5,
    color: "black",
    additionRate: 0.1,
    deletionRate: 0.1,
  },
  {
    id: "7",
    size: 5,
    color: "red",
    additionRate: 0.1,
    deletionRate: 0.1,
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
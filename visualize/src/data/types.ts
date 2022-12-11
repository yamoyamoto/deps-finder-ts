export type NetworkNodeInput = {
  id: string
  name: string
  size: number
  additionRate: number
  deletionRate: number
}

export type NetworkLinkInput = {
  source: string
  target: string
  color: string
  type: string
  style: NetworkLinkStyleInput
}

type NetworkLinkStyleInput = {
  strokeDasharray: string
}
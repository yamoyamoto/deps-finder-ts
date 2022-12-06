import * as react from "react";
import { Network, ResponsiveNetwork, InputNode } from "@nivo/network";
import * as network from "@nivo/network";

export const App = () => {
  return (
    <div>
      <Network
        data={{
          nodes: [
            {
              id: "1",
              height: 2,
              size: 5,
            },
            {
              id: "2",
              height: 2,
              size: 8,
            },
            {
              id: "3",
              height: 2,
              size: 15,
            },
            {
              id: "4",
              height: 2,
              size: 10,
            },
          ],
          links: [
            {
              source: "1",
              target: "2",
            },
            {
              source: "2",
              target: "3",
            },
            {
              source: "2",
              target: "4",
            },
          ],
        }}
        width={100}
        height={100}
        nodeSize={(node: any) => {
          return node.size;
        }}
      ></Network>
    </div>
  );
};

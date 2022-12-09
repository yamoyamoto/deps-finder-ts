import { animated } from '@react-spring/web'
import {Network} from "@nivo/network";

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
              color: "red",
            },
            {
              source: "2",
              target: "3",
              color: "green",
            },
            {
              source: "2",
              target: "4",
              style: {
                strokeDasharray: "5 7",
              },
              color: "blue",
            },
          ],
        }}
        width={100}
        height={100}
        nodeSize={(node: any) => {
          return node.size;
        }}
        linkColor={(link: any) =>{
          return link.data.color;
        }}
        linkComponent={(l: any) =>{
          console.log(l)
          return <animated.line
              data-testid={`link.${l.link.id}`}
              stroke={l.animated.color}
              style={{ mixBlendMode: l.animated.blendMode }}
              strokeWidth={1}
              strokeLinecap="round"
              strokeDasharray="3 3"
              opacity={l.animated.opacity}
              x1={l.link.source.x}
              y1={l.link.source.y}
              x2={l.link.target.x}
              y2={l.link.target.y}
            ></animated.line>}
        }
      ></Network>
    </div>
  );
};

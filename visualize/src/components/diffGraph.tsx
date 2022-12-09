import { animated, to } from '@react-spring/web'
import {Network} from "@nivo/network";


export const App = () => {
  return (
    <div>

      <Network
        layers={[
          () => {
            return <defs>
              <marker id="mu_us" viewBox="0 0 10 10" refX="7" refY="5"
                      markerWidth="6" markerHeight="6" fill="blue"
                      orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
              </marker>
            </defs>;
          },
          "links",
          "nodes",
          "annotations",
        ]}
        data={{
          nodes: [
            {
              id: "1",
              height: 2,
              size: 10,
              color: "black",
            },
            {
              id: "2",
              height: 2,
              size: 10,
              color: "green",
            },
            {
              id: "3",
              height: 2,
              size: 10,
              color: "black",
            },
            {
              id: "4",
              height: 2,
              size: 10,
              color: "black",
            },
            {
              id: "5",
              height: 2,
              size: 10,
              color: "red",
            },
            {
              id: "6",
              height: 2,
              size: 10,
              color: "black",
            },
            {
              id: "7",
              height: 2,
              size: 10,
              color: "red",
            },
          ],
          links: [
            {
              source: "1",
              target: "2",
              color: "black",
            },
            {
              source: "2",
              target: "3",
              color: "black",
            },
            {
              source: "2",
              target: "4",
              style: {
                strokeDasharray: "1 2", // nivo依存
              },
              color: "green",
            },
            {
              source: "6",
              target: "5",
              style: {
                strokeDasharray: "1 2", // nivo依存
              },
              color: "green",
            },
            {
              source: "6",
              target: "3",
              color: "black",
            },
            {
              source: "7",
              target: "1",
              style: {
                strokeDasharray: "1 2", // nivo依存
              },
              color: "red",
            },
          ],
        }}
        width={1000}
        height={1000}
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
              strokeDasharray={l.link.data.style?.strokeDasharray ?? null}
              opacity={l.animated.opacity}
              x1={l.link.source.x}
              y1={l.link.source.y}
              x2={calcPosition(l.link.target.x, l.link.source.x)}
              y2={calcPosition(l.link.target.y, l.link.source.y)}
              markerEnd="url(#mu_us)"
            ></animated.line>}
        }
        nodeComponent={(n: any)=>{
          console.log(n);
          return <>
            <animated.circle
              data-testid={`node.${n.node.id}`}
              transform={to([n.node.x, n.node.y, n.animated.scale], (x, y, scale) => {
                return `translate(${x},${y}) scale(${scale})`
              })}
              r={to([n.animated.size], size => size / 2)}
              fill={n.node.data.color}
              onClick={n.onClick ? event => n.onClick(n.node, event) : undefined}
              onMouseEnter={n.onMouseEnter ? event => n.onMouseEnter(n.node, event) : undefined}
              onMouseMove={n.onMouseMove ? event => n.onMouseMove(n.node, event) : undefined}
              onMouseLeave={n.onMouseLeave ? event => n.onMouseLeave(n.node, event) : undefined}
            ></animated.circle>
            <animated.circle
              data-testid={`node.${n.node.id}`}
              transform={to([n.node.x, n.node.y, n.animated.scale], (x, y, scale) => {
                return `translate(${x},${y}) scale(${scale})`
              })}
              r={n.node.size / 3.5}
              fill="black"
              onClick={n.onClick ? event => n.onClick(n.node, event) : undefined}
              onMouseEnter={n.onMouseEnter ? event => n.onMouseEnter(n.node, event) : undefined}
              onMouseMove={n.onMouseMove ? event => n.onMouseMove(n.node, event) : undefined}
              onMouseLeave={n.onMouseLeave ? event => n.onMouseLeave(n.node, event) : undefined}
            ></animated.circle>
            <animated.text
              x={n.node.x + 7}
              y={n.node.y}
              fontSize="10px"
            >
              {n.node.id}
            </animated.text>
            </>
        }}
      ></Network>
    </div>
  );
};

function calcPosition(s: number, t: number){
  return (3*s + t) / 4
}
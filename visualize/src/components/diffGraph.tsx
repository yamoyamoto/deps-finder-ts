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
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#eab942" />
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
            },
            {
              id: "2",
              height: 2,
              size: 10,
            },
            {
              id: "3",
              height: 2,
              size: 10,
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
              strokeDasharray="1 2"
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
              fill={n.animated.color}
              // strokeWidth={animatedProps.borderWidth}
              // stroke={animatedProps.borderColor}
              // opacity={animatedProps.opacity}
              // onClick={onClick ? event => onClick(node, event) : undefined}
              // onMouseEnter={onMouseEnter ? event => onMouseEnter(node, event) : undefined}
              // onMouseMove={onMouseMove ? event => onMouseMove(node, event) : undefined}
              // onMouseLeave={onMouseLeave ? event => onMouseLeave(node, event) : undefined}
            ></animated.circle>
            <animated.circle
              data-testid={`node.${n.node.id}`}
              transform={to([n.node.x, n.node.y, n.animated.scale], (x, y, scale) => {
                return `translate(${x},${y}) scale(${scale})`
              })}
              r={n.node.size / 2 - 2}
              fill="red"
              // strokeWidth={animatedProps.borderWidth}
              // stroke={animatedProps.borderColor}
              // opacity={animatedProps.opacity}
              // onClick={onClick ? event => onClick(node, event) : undefined}
              // onMouseEnter={onMouseEnter ? event => onMouseEnter(node, event) : undefined}
              // onMouseMove={onMouseMove ? event => onMouseMove(node, event) : undefined}
              // onMouseLeave={onMouseLeave ? event => onMouseLeave(node, event) : undefined}
            ></animated.circle>
            </>
        }}
      ></Network>
    </div>
  );
};

function calcPosition(s: number, t: number){
  return (3*s + t) / 4
}
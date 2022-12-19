import { animated, to } from '@react-spring/web'
import {Network} from "@nivo/network";
import {networkNodeInputData, networkLinkInputData} from "../data/nivo";
import { BasicTooltip } from '@nivo/tooltip';

export const App = () => {
  return (
    <div>

      <Network
        distanceMin={10}
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
          nodes: networkNodeInputData,
          links: networkLinkInputData
        }}
        nodeTooltip={(node)=>{
          return <BasicTooltip id={node.node.data.name} enableChip={true} />
        }}
        width={1000}
        height={1000}
        nodeSize={(node: any) => {
          return node.size;
        }}
        linkColor={(link: any) =>{
          return link.data.color;
        }}
        linkComponent={(l) =>{
          let fillColor: string;
          let strokeDasharray: string;
          console.log(l.link.data)
          switch (l.link.data.type){
            case "add":
              fillColor = "green";
              strokeDasharray = "1 2";
              break;
            case "delete":
              strokeDasharray = "1 2";
              fillColor = "red";
              break;
            default:
              fillColor = "black";
              strokeDasharray = "";
              break;
          }

          return <animated.line
              data-testid={`link.${l.link.id}`}
              stroke={fillColor}
              strokeWidth={1}
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              x1={l.link.source.x}
              y1={l.link.source.y}
              x2={calcPosition(l.link.target.x, l.link.source.x)}
              y2={calcPosition(l.link.target.y, l.link.source.y)}
              markerEnd="url(#mu_us)"
            ></animated.line>}
        }
        nodeComponent={(n)=>{
          const redNodeSize = n.node.data.size;
          const greenNodeSize = redNodeSize * (1 - n.node.data.deletionRate);
          const baseNodeSize = greenNodeSize * (1 - n.node.data.additionRate)
          return <>
            {/* 「削除」用のノード */}
            <animated.circle
              data-testid={`node.${n.node.id}`}
              transform={to([n.node.x, n.node.y, n.animated.scale], (x, y, scale) => {
                return `translate(${x},${y}) scale(${scale})`
              })}
              r={redNodeSize}
              fill="red"
              onClick={event => {
                return n?.onClick ? n?.onClick(n.node, event) : undefined;
              }}
              onMouseEnter={event => {
                return n?.onMouseEnter ? n?.onMouseEnter(n.node, event) : undefined;
              }}
              onMouseMove={event => {
                return n?.onMouseMove ? n?.onMouseMove(n.node, event) : undefined;
              }}
              onMouseLeave={event => {
                return n?.onMouseLeave ? n?.onMouseLeave(n.node, event) : undefined;
              }}
            ></animated.circle>
            {/* 「追加」用のノード */}
            <animated.circle
              data-testid={`node.${n.node.id}`}
              transform={to([n.node.x, n.node.y, n.animated.scale], (x, y, scale) => {
                return `translate(${x},${y}) scale(${scale})`
              })}
              r={greenNodeSize}
              fill="green"
              onClick={event => {
                return n?.onClick ? n?.onClick(n.node, event) : undefined;
              }}
              onMouseEnter={event => {
                return n?.onMouseEnter ? n?.onMouseEnter(n.node, event) : undefined;
              }}
              onMouseMove={event => {
                return n?.onMouseMove ? n?.onMouseMove(n.node, event) : undefined;
              }}
              onMouseLeave={event => {
                return n?.onMouseLeave ? n?.onMouseLeave(n.node, event) : undefined;
              }}
            ></animated.circle>
            {/* ベースのノード */}
            <animated.circle
              data-testid={`node.${n.node.id}`}
              transform={to([n.node.x, n.node.y, n.animated.scale], (x, y, scale) => {
                return `translate(${x},${y}) scale(${scale})`
              })}
              r={baseNodeSize}
              fill={n.node.data.color}
              onClick={event => {
                return n?.onClick ? n?.onClick(n.node, event) : undefined;
              }}
              onMouseEnter={event => {
                return n?.onMouseEnter ? n?.onMouseEnter(n.node, event) : undefined;
              }}
              onMouseMove={event => {
                return n?.onMouseMove ? n?.onMouseMove(n.node, event) : undefined;
              }}
              onMouseLeave={event => {
                return n?.onMouseLeave ? n?.onMouseLeave(n.node, event) : undefined;
              }}
            ></animated.circle>
            <animated.text
              x={n.node.x + 7}
              y={n.node.y}
              fontSize="10px"
            >
              {n.node.data.name.match(/\/([^\/]*?)$/)}
              {/*{n.node.id}*/}
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
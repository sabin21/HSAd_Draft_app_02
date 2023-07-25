import TempNode from"../core/TempNode.js";import{addNodeClass}from"../core/Node.js";import{addNodeElement,nodeProxy}from"../shadernode/ShaderNode.js";class PackingNode extends TempNode{constructor(o,e){super(),this.scope=o,this.node=e}getNodeType(o){return this.node.getNodeType(o)}construct(){const{scope:o,node:e}=this;let d=null;return o===PackingNode.DIRECTION_TO_COLOR?d=e.mul(.5).add(.5):o===PackingNode.COLOR_TO_DIRECTION&&(d=e.mul(2).sub(1)),d}}PackingNode.DIRECTION_TO_COLOR="directionToColor",PackingNode.COLOR_TO_DIRECTION="colorToDirection";export default PackingNode;export const directionToColor=nodeProxy(PackingNode,PackingNode.DIRECTION_TO_COLOR);export const colorToDirection=nodeProxy(PackingNode,PackingNode.COLOR_TO_DIRECTION);addNodeElement("directionToColor",directionToColor),addNodeElement("colorToDirection",colorToDirection),addNodeClass(PackingNode);
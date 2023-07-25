import FogNode from"./FogNode.js";import{smoothstep}from"../math/MathNode.js";import{positionView}from"../accessors/PositionNode.js";import{addNodeClass}from"../core/Node.js";import{addNodeElement,nodeProxy}from"../shadernode/ShaderNode.js";class FogRangeNode extends FogNode{constructor(o,e,d){super(o),this.isFogRangeNode=!0,this.nearNode=e,this.farNode=d}construct(){return smoothstep(this.nearNode,this.farNode,positionView.z.negate())}}export default FogRangeNode;export const rangeFog=nodeProxy(FogRangeNode);addNodeElement("rangeFog",rangeFog),addNodeClass(FogRangeNode);
import AnalyticLightNode from"./AnalyticLightNode.js";import{lightTargetDirection}from"./LightNode.js";import{addLightNode}from"./LightsNode.js";import{addNodeClass}from"../core/Node.js";import{DirectionalLight}from"three";class DirectionalLightNode extends AnalyticLightNode{constructor(t=null){super(t)}construct(t){super.construct(t);const i=this.colorNode,o=lightTargetDirection(this.light),e=t.context.lightingModelNode,r=t.context.reflectedLight;e&&e.direct&&e.direct.call({lightDirection:o,lightColor:i,reflectedLight:r},t)}}export default DirectionalLightNode;addLightNode(DirectionalLight,DirectionalLightNode),addNodeClass(DirectionalLightNode);
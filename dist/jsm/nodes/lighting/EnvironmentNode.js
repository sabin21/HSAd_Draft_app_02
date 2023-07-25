import LightingNode from"./LightingNode.js";import{cache}from"../core/CacheNode.js";import{context}from"../core/ContextNode.js";import{roughness}from"../core/PropertyNode.js";import{equirectUV}from"../utils/EquirectUVNode.js";import{specularMIPLevel}from"../utils/SpecularMIPLevelNode.js";import{cameraViewMatrix}from"../accessors/CameraNode.js";import{transformedNormalView,transformedNormalWorld}from"../accessors/NormalNode.js";import{positionViewDirection}from"../accessors/PositionNode.js";import{addNodeClass}from"../core/Node.js";import{float,vec2}from"../shadernode/ShaderNode.js";class EnvironmentNode extends LightingNode{constructor(e=null){super(),this.envNode=e}construct(e){const o=this.envNode,r=e.getNodeProperties(this);let t,i,s;const d=context(o,{getUVNode:e=>{let o=null;return void 0===t&&(t=positionViewDirection.negate().reflect(transformedNormalView),t=roughness.mul(roughness).mix(t,transformedNormalView).normalize(),t=t.transformDirection(cameraViewMatrix)),e.isCubeTextureNode?o=t:e.isTextureNode&&(void 0===i&&(i=equirectUV(t)),o=i),o},getSamplerLevelNode:()=>roughness,getMIPLevelAlgorithmNode:(e,o)=>specularMIPLevel(e,o)}),n=context(o,{getUVNode:e=>{let o=null;return e.isCubeTextureNode?o=transformedNormalWorld:e.isTextureNode&&(void 0===s&&(s=equirectUV(transformedNormalWorld),s=vec2(s.x,s.y.oneMinus())),o=s),o},getSamplerLevelNode:()=>float(1),getMIPLevelAlgorithmNode:(e,o)=>specularMIPLevel(e,o)}),a=cache(d);e.context.radiance.addAssign(a),e.context.iblIrradiance.addAssign(n.mul(Math.PI)),r.radianceContext=a,r.irradianceContext=n}}export default EnvironmentNode;addNodeClass(EnvironmentNode);
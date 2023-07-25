import TempNode from"../core/TempNode.js";import{add}from"../math/OperatorNode.js";import{bitangentView}from"../accessors/BitangentNode.js";import{modelNormalMatrix}from"../accessors/ModelNode.js";import{normalView}from"../accessors/NormalNode.js";import{positionView}from"../accessors/PositionNode.js";import{tangentView}from"../accessors/TangentNode.js";import{uv}from"../accessors/UVNode.js";import{faceDirection}from"./FrontFacingNode.js";import{addNodeClass}from"../core/Node.js";import{ShaderNode,nodeProxy,vec3,mat3}from"../shadernode/ShaderNode.js";import{TangentSpaceNormalMap,ObjectSpaceNormalMap}from"three";const perturbNormal2ArbNode=new ShaderNode((o=>{const{eye_pos:e,surf_norm:r,mapN:a,uv:t}=o,m=e.dFdx(),s=e.dFdy(),d=t.dFdx(),n=t.dFdy(),l=r,i=s.cross(l),p=l.cross(m),c=i.mul(d.x).add(p.mul(n.x)),N=i.mul(d.y).add(p.mul(n.y)),u=c.dot(c).max(N.dot(N)),f=faceDirection.mul(u.inverseSqrt());return add(c.mul(a.x,f),N.mul(a.y,f),l.mul(a.z)).normalize()}));class NormalMapNode extends TempNode{constructor(o,e=null){super("vec3"),this.node=o,this.scaleNode=e,this.normalMapType=TangentSpaceNormalMap}construct(o){const{normalMapType:e,scaleNode:r}=this;let a=this.node.mul(2).sub(1);null!==r&&(a=vec3(a.xy.mul(r),a.z));let t=null;return e===ObjectSpaceNormalMap?t=modelNormalMatrix.mul(a).normalize():e===TangentSpaceNormalMap&&(t=!0===o.hasGeometryAttribute("tangent")?TBNViewMatrix.mul(a).normalize():perturbNormal2ArbNode.call({eye_pos:positionView,surf_norm:normalView,mapN:a,uv:uv()})),t}}export default NormalMapNode;export const normalMap=nodeProxy(NormalMapNode);export const TBNViewMatrix=mat3(tangentView,bitangentView,normalView);addNodeClass(NormalMapNode);
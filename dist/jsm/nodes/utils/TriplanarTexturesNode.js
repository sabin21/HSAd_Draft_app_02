import Node,{addNodeClass}from"../core/Node.js";import{add}from"../math/OperatorNode.js";import{normalWorld}from"../accessors/NormalNode.js";import{positionWorld}from"../accessors/PositionNode.js";import{texture}from"../accessors/TextureNode.js";import{addNodeElement,nodeProxy,float,vec3}from"../shadernode/ShaderNode.js";class TriplanarTexturesNode extends Node{constructor(e,o=null,r=null,t=float(1),d=positionWorld,s=normalWorld){super("vec4"),this.textureXNode=e,this.textureYNode=o,this.textureZNode=r,this.scaleNode=t,this.positionNode=d,this.normalNode=s}construct(){const{textureXNode:e,textureYNode:o,textureZNode:r,scaleNode:t,positionNode:d,normalNode:s}=this;let a=s.abs().normalize();a=a.div(a.dot(vec3(1)));const l=d.yz.mul(t),u=d.zx.mul(t),n=d.xy.mul(t),i=e.value,x=null!==o?o.value:i,N=null!==r?r.value:i,m=texture(i,l).mul(a.x),p=texture(x,u).mul(a.y),c=texture(N,n).mul(a.z);return add(m,p,c)}}export default TriplanarTexturesNode;export const triplanarTextures=nodeProxy(TriplanarTexturesNode);export const triplanarTexture=(e,...o)=>triplanarTextures(e,e,e,...o);addNodeElement("triplanarTexture",triplanarTexture),addNodeClass(TriplanarTexturesNode);
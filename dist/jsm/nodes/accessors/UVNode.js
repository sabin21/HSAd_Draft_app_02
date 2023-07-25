import{addNodeClass}from"../core/Node.js";import AttributeNode from"../core/AttributeNode.js";import{nodeObject}from"../shadernode/ShaderNode.js";class UVNode extends AttributeNode{constructor(e=0){super(null,"vec2"),this.isUVNode=!0,this.index=e}getAttributeName(){const e=this.index;return"uv"+(e>0?e+1:"")}serialize(e){super.serialize(e),e.index=this.index}deserialize(e){super.deserialize(e),this.index=e.index}}export default UVNode;export const uv=(...e)=>nodeObject(new UVNode(...e));addNodeClass(UVNode);
import Node,{addNodeClass}from"../core/Node.js";import{nodeProxy}from"../shadernode/ShaderNode.js";class CodeNode extends Node{constructor(e="",o=[],d=""){super("code"),this.isCodeNode=!0,this.code=e,this.language=d,this._includes=o}setIncludes(e){return this._includes=e,this}getIncludes(){return this._includes}generate(e){const o=this.getIncludes(e);for(const d of o)d.build(e);const d=e.getCodeFromNode(this,this.getNodeType(e));return d.code=this.code,d.code}serialize(e){super.serialize(e),e.code=this.code,e.language=this.language}deserialize(e){super.deserialize(e),this.code=e.code,this.language=e.language}}export default CodeNode;export const code=nodeProxy(CodeNode);export const js=(e,o)=>code(e,o,"js");addNodeClass(CodeNode);
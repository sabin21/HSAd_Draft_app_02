import Node,{addNodeClass}from"../core/Node.js";class ArrayElementNode extends Node{constructor(e,d){super(),this.node=e,this.indexNode=d}getNodeType(e){return this.node.getNodeType(e)}generate(e){return`${this.node.build(e)}[ ${this.indexNode.build(e,"uint")} ]`}}export default ArrayElementNode;addNodeClass(ArrayElementNode);
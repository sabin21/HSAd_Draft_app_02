import Node,{addNodeClass}from"./Node.js";import{assign}from"../math/OperatorNode.js";import{bypass}from"../core/BypassNode.js";import{expression}from"../code/ExpressionNode.js";import{cond}from"../math/CondNode.js";import{nodeProxy,shader}from"../shadernode/ShaderNode.js";class StackNode extends Node{constructor(e=null){super(),this.nodes=[],this.outputNode=null,this.parent=e,this._currentCond=null,this.isStackNode=!0}getNodeType(e){return this.outputNode?this.outputNode.getNodeType(e):"void"}add(e){return this.nodes.push(bypass(expression(),e)),this}if(e,o){const s=shader(o);return this._currentCond=cond(e,s),this.add(this._currentCond)}elseif(e,o){const s=shader(o),t=cond(e,s);return this._currentCond.elseNode=t,this._currentCond=t,this}else(e){return this._currentCond.elseNode=shader(e),this}assign(e,o){return this.add(assign(e,o))}build(e,...o){for(const o of this.nodes)o.build(e);return this.outputNode?this.outputNode.build(e,...o):super.build(e,...o)}}export default StackNode;export const stack=nodeProxy(StackNode);addNodeClass(StackNode);
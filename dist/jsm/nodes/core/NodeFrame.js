import{NodeUpdateType}from"./constants.js";class NodeFrame{constructor(){this.time=0,this.deltaTime=0,this.frameId=0,this.renderId=0,this.startTime=null,this.frameMap=new WeakMap,this.frameBeforeMap=new WeakMap,this.renderMap=new WeakMap,this.renderBeforeMap=new WeakMap,this.renderer=null,this.material=null,this.camera=null,this.object=null,this.scene=null}updateBeforeNode(e){const t=e.getUpdateBeforeType();t===NodeUpdateType.FRAME?this.frameBeforeMap.get(e)!==this.frameId&&(this.frameBeforeMap.set(e,this.frameId),e.updateBefore(this)):t===NodeUpdateType.RENDER?this.renderBeforeMap.get(e)===this.renderId&&this.frameBeforeMap.get(e)===this.frameId||(this.renderBeforeMap.set(e,this.renderId),this.frameBeforeMap.set(e,this.frameId),e.updateBefore(this)):t===NodeUpdateType.OBJECT&&e.updateBefore(this)}updateNode(e){const t=e.getUpdateType();t===NodeUpdateType.FRAME?this.frameMap.get(e)!==this.frameId&&(this.frameMap.set(e,this.frameId),e.update(this)):t===NodeUpdateType.RENDER?this.renderMap.get(e)===this.renderId&&this.frameMap.get(e)===this.frameId||(this.renderMap.set(e,this.renderId),this.frameMap.set(e,this.frameId),e.update(this)):t===NodeUpdateType.OBJECT&&e.update(this)}update(){this.frameId++,void 0===this.lastTime&&(this.lastTime=performance.now()),this.deltaTime=(performance.now()-this.lastTime)/1e3,this.lastTime=performance.now(),this.time+=this.deltaTime}}export default NodeFrame;
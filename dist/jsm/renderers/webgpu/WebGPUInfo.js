class WebGPUInfo{constructor(){this.autoReset=!0,this.render={frame:0,drawCalls:0,triangles:0,points:0,lines:0},this.memory={geometries:0,textures:0}}update(e,s,r){this.render.drawCalls++,e.isMesh||e.isSprite?this.render.triangles+=r*(s/3):e.isPoints?this.render.points+=r*s:e.isLineSegments?this.render.lines+=r*(s/2):e.isLine?this.render.lines+=r*(s-1):console.error("THREE.WebGPUInfo: Unknown object type.")}reset(){this.render.frame++,this.render.drawCalls=0,this.render.triangles=0,this.render.points=0,this.render.lines=0}dispose(){this.reset(),this.render.frame=0,this.memory.geometries=0,this.memory.textures=0}}export default WebGPUInfo;
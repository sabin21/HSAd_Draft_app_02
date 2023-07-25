import WebGPUUniformBuffer from"./WebGPUUniformBuffer.js";import{GPUChunkSize}from"./constants.js";class WebGPUUniformsGroup extends WebGPUUniformBuffer{constructor(e){super(e),this.isUniformsGroup=!0,this.uniforms=[]}addUniform(e){return this.uniforms.push(e),this}removeUniform(e){const t=this.uniforms.indexOf(e);return-1!==t&&this.uniforms.splice(t,1),this}getBuffer(){let e=this.buffer;if(null===e){const t=this.getByteLength();e=new Float32Array(new ArrayBuffer(t)),this.buffer=e}return e}getByteLength(){let e=0;for(let t=0,r=this.uniforms.length;t<r;t++){const r=this.uniforms[t],s=e%GPUChunkSize;0!==s&&GPUChunkSize-s-r.boundary<0?e+=GPUChunkSize-s:s%r.boundary!=0&&(e+=s%r.boundary),r.offset=e/this.bytesPerElement,e+=r.itemSize*this.bytesPerElement}return Math.ceil(e/GPUChunkSize)*GPUChunkSize}update(){let e=!1;for(const t of this.uniforms)!0===this.updateByType(t)&&(e=!0);return e}updateByType(e){return e.isFloatUniform?this.updateNumber(e):e.isVector2Uniform?this.updateVector2(e):e.isVector3Uniform?this.updateVector3(e):e.isVector4Uniform?this.updateVector4(e):e.isColorUniform?this.updateColor(e):e.isMatrix3Uniform?this.updateMatrix3(e):e.isMatrix4Uniform?this.updateMatrix4(e):void console.error("THREE.WebGPUUniformsGroup: Unsupported uniform type.",e)}updateNumber(e){let t=!1;const r=this.buffer,s=e.getValue(),o=e.offset;return r[o]!==s&&(r[o]=s,t=!0),t}updateVector2(e){let t=!1;const r=this.buffer,s=e.getValue(),o=e.offset;return r[o+0]===s.x&&r[o+1]===s.y||(r[o+0]=s.x,r[o+1]=s.y,t=!0),t}updateVector3(e){let t=!1;const r=this.buffer,s=e.getValue(),o=e.offset;return r[o+0]===s.x&&r[o+1]===s.y&&r[o+2]===s.z||(r[o+0]=s.x,r[o+1]=s.y,r[o+2]=s.z,t=!0),t}updateVector4(e){let t=!1;const r=this.buffer,s=e.getValue(),o=e.offset;return r[o+0]===s.x&&r[o+1]===s.y&&r[o+2]===s.z&&r[o+4]===s.w||(r[o+0]=s.x,r[o+1]=s.y,r[o+2]=s.z,r[o+3]=s.w,t=!0),t}updateColor(e){let t=!1;const r=this.buffer,s=e.getValue(),o=e.offset;return r[o+0]===s.r&&r[o+1]===s.g&&r[o+2]===s.b||(r[o+0]=s.r,r[o+1]=s.g,r[o+2]=s.b,t=!0),t}updateMatrix3(e){let t=!1;const r=this.buffer,s=e.getValue().elements,o=e.offset;return r[o+0]===s[0]&&r[o+1]===s[1]&&r[o+2]===s[2]&&r[o+4]===s[3]&&r[o+5]===s[4]&&r[o+6]===s[5]&&r[o+8]===s[6]&&r[o+9]===s[7]&&r[o+10]===s[8]||(r[o+0]=s[0],r[o+1]=s[1],r[o+2]=s[2],r[o+4]=s[3],r[o+5]=s[4],r[o+6]=s[5],r[o+8]=s[6],r[o+9]=s[7],r[o+10]=s[8],t=!0),t}updateMatrix4(e){let t=!1;const r=this.buffer,s=e.getValue().elements,o=e.offset;return!1===arraysEqual(r,s,o)&&(r.set(s,o),t=!0),t}}function arraysEqual(e,t,r){for(let s=0,o=t.length;s<o;s++)if(e[r+s]!==t[s])return!1;return!0}export default WebGPUUniformsGroup;
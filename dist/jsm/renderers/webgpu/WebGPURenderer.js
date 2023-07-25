import{GPUIndexFormat,GPUTextureFormat,GPUFeatureName,GPULoadOp}from"./constants.js";import WebGPUAnimation from"./WebGPUAnimation.js";import WebGPURenderObjects from"./WebGPURenderObjects.js";import WebGPUAttributes from"./WebGPUAttributes.js";import WebGPUGeometries from"./WebGPUGeometries.js";import WebGPUInfo from"./WebGPUInfo.js";import WebGPUProperties from"./WebGPUProperties.js";import WebGPURenderPipelines from"./WebGPURenderPipelines.js";import WebGPUComputePipelines from"./WebGPUComputePipelines.js";import WebGPUBindings from"./WebGPUBindings.js";import WebGPURenderLists from"./WebGPURenderLists.js";import WebGPURenderStates from"./WebGPURenderStates.js";import WebGPUTextures from"./WebGPUTextures.js";import WebGPUBackground from"./WebGPUBackground.js";import WebGPUNodes from"./nodes/WebGPUNodes.js";import WebGPUUtils from"./WebGPUUtils.js";import{Frustum,Matrix4,Vector3,Color,SRGBColorSpace,NoToneMapping,DepthFormat}from"three";console.info("THREE.WebGPURenderer: Modified Matrix4.makePerspective() and Matrix4.makeOrtographic() to work with WebGPU, see https://github.com/mrdoob/three.js/issues/20276."),Matrix4.prototype.makePerspective=function(e,t,i,s,r,o){const n=this.elements,a=2*r/(t-e),h=2*r/(i-s),l=(t+e)/(t-e),p=(i+s)/(i-s),u=-o/(o-r),d=-o*r/(o-r);return n[0]=a,n[4]=0,n[8]=l,n[12]=0,n[1]=0,n[5]=h,n[9]=p,n[13]=0,n[2]=0,n[6]=0,n[10]=u,n[14]=d,n[3]=0,n[7]=0,n[11]=-1,n[15]=0,this},Matrix4.prototype.makeOrthographic=function(e,t,i,s,r,o){const n=this.elements,a=1/(t-e),h=1/(i-s),l=1/(o-r),p=(t+e)*a,u=(i+s)*h,d=r*l;return n[0]=2*a,n[4]=0,n[8]=0,n[12]=-p,n[1]=0,n[5]=2*h,n[9]=0,n[13]=-u,n[2]=0,n[6]=0,n[10]=-1*l,n[14]=-d,n[3]=0,n[7]=0,n[11]=0,n[15]=1,this},Frustum.prototype.setFromProjectionMatrix=function(e){const t=this.planes,i=e.elements,s=i[0],r=i[1],o=i[2],n=i[3],a=i[4],h=i[5],l=i[6],p=i[7],u=i[8],d=i[9],c=i[10],_=i[11],m=i[12],f=i[13],g=i[14],P=i[15];return t[0].setComponents(n-s,p-a,_-u,P-m).normalize(),t[1].setComponents(n+s,p+a,_+u,P+m).normalize(),t[2].setComponents(n+r,p+h,_+d,P+f).normalize(),t[3].setComponents(n-r,p-h,_-d,P-f).normalize(),t[4].setComponents(n-o,p-l,_-c,P-g).normalize(),t[5].setComponents(o,l,c,g).normalize(),this};const _frustum=new Frustum,_projScreenMatrix=new Matrix4,_vector3=new Vector3;class WebGPURenderer{constructor(e={}){this.isWebGPURenderer=!0,this.domElement=void 0!==e.canvas?e.canvas:this._createCanvasElement(),this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.outputColorSpace=SRGBColorSpace,this.toneMapping=NoToneMapping,this.toneMappingExposure=1,this.sortObjects=!0,this._parameters=Object.assign({},e),this._pixelRatio=1,this._width=this.domElement.width,this._height=this.domElement.height,this._viewport=null,this._scissor=null,this._adapter=null,this._device=null,this._context=null,this._colorBuffer=null,this._depthBuffer=null,this._info=null,this._properties=null,this._attributes=null,this._geometries=null,this._nodes=null,this._bindings=null,this._objects=null,this._renderPipelines=null,this._computePipelines=null,this._renderLists=null,this._renderStates=null,this._textures=null,this._background=null,this._animation=new WebGPUAnimation,this._currentRenderState=null,this._opaqueSort=null,this._transparentSort=null,this._clearAlpha=1,this._clearColor=new Color(0),this._clearDepth=1,this._clearStencil=0,this._renderTarget=null,this._initialized=!1,this._parameters.antialias=!0===e.antialias,!0===this._parameters.antialias?this._parameters.sampleCount=void 0===e.sampleCount?4:e.sampleCount:this._parameters.sampleCount=1,this._parameters.requiredLimits=void 0===e.requiredLimits?{}:e.requiredLimits,this.shadow={shadowMap:{}}}async init(){if(!0===this._initialized)throw new Error("WebGPURenderer: Device has already been initialized.");const e=this._parameters,t={powerPreference:e.powerPreference},i=await navigator.gpu.requestAdapter(t);if(null===i)throw new Error("WebGPURenderer: Unable to create WebGPU adapter.");const s=Object.values(GPUFeatureName),r=[];for(const e of s)i.features.has(e)&&r.push(e);const o={requiredFeatures:r,requiredLimits:e.requiredLimits},n=await i.requestDevice(o),a=void 0!==e.context?e.context:this.domElement.getContext("webgpu");this._adapter=i,this._device=n,this._context=a,this._configureContext(),this._info=new WebGPUInfo,this._properties=new WebGPUProperties,this._attributes=new WebGPUAttributes(n),this._geometries=new WebGPUGeometries(this._attributes,this._properties,this._info),this._textures=new WebGPUTextures(n,this._properties,this._info),this._utils=new WebGPUUtils(this),this._nodes=new WebGPUNodes(this,this._properties),this._objects=new WebGPURenderObjects(this,this._nodes,this._geometries,this._info),this._computePipelines=new WebGPUComputePipelines(n,this._nodes),this._renderPipelines=new WebGPURenderPipelines(n,this._nodes,this._utils),this._bindings=this._renderPipelines.bindings=new WebGPUBindings(n,this._info,this._properties,this._textures,this._renderPipelines,this._computePipelines,this._attributes,this._nodes),this._renderLists=new WebGPURenderLists,this._renderStates=new WebGPURenderStates,this._background=new WebGPUBackground(this,this._properties),this._setupColorBuffer(),this._setupDepthBuffer(),this._animation.setNodes(this._nodes),this._animation.start(),this._initialized=!0}async render(e,t){!1===this._initialized&&await this.init();const i=this._nodes.nodeFrame,s=i.renderId,r=this._currentRenderState,o=this._renderStates.get(e,t),n=this._renderTarget;this._currentRenderState=o,i.renderId++,!1===this._animation.isAnimating&&i.update(),!0===e.matrixWorldAutoUpdate&&e.updateMatrixWorld(),null===t.parent&&!0===t.matrixWorldAutoUpdate&&t.updateMatrixWorld(),!0===this._info.autoReset&&this._info.reset(),_projScreenMatrix.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),_frustum.setFromProjectionMatrix(_projScreenMatrix);const a=this._renderLists.get(e,t);a.init(),this._projectObject(e,t,0,a),a.finish(),!0===this.sortObjects&&a.sort(this._opaqueSort,this._transparentSort),o.descriptorGPU={colorAttachments:[{view:null}],depthStencilAttachment:{view:null}};const h=o.descriptorGPU.colorAttachments[0],l=o.descriptorGPU.depthStencilAttachment;if(null!==n){this._textures.initRenderTarget(n);const e=this._properties.get(n);h.view=e.colorTextureGPU.createView(),l.view=e.depthTextureGPU.createView(),o.stencil=!n.depthTexture||n.depthTexture.format!==DepthFormat}else!0===this._parameters.antialias?(h.view=this._colorBuffer.createView(),h.resolveTarget=this._context.getCurrentTexture().createView()):(h.view=this._context.getCurrentTexture().createView(),h.resolveTarget=void 0),l.view=this._depthBuffer.createView();this._nodes.updateEnvironment(e),this._nodes.updateFog(e),this._nodes.updateBackground(e),this._nodes.updateToneMapping(),this._background.update(e,a,o);const p=this._device;o.encoderGPU=p.createCommandEncoder({}),o.currentPassGPU=o.encoderGPU.beginRenderPass(o.descriptorGPU);const u=this._viewport;if(null!==u){const e=Math.floor(u.width*this._pixelRatio),t=Math.floor(u.height*this._pixelRatio);o.currentPassGPU.setViewport(u.x,u.y,e,t,u.minDepth,u.maxDepth)}const d=this._scissor;if(null!==d){const e=Math.floor(d.width*this._pixelRatio),t=Math.floor(d.height*this._pixelRatio);o.currentPassGPU.setScissorRect(d.x,d.y,e,t)}const c=a.opaque,_=a.transparent,m=a.lightsNode;c.length>0&&this._renderObjects(c,t,e,m,o),_.length>0&&this._renderObjects(_,t,e,m,o),o.currentPassGPU.end(),p.queue.submit([o.encoderGPU.finish()]),i.renderId=s,this._currentRenderState=r}setAnimationLoop(e){!1===this._initialized&&this.init();const t=this._animation;t.setAnimationLoop(e),null===e?t.stop():t.start()}async getArrayBuffer(e){return await this._attributes.getArrayBuffer(e)}getContext(){return this._context}getPixelRatio(){return this._pixelRatio}getDrawingBufferSize(e){return e.set(this._width*this._pixelRatio,this._height*this._pixelRatio).floor()}getSize(e){return e.set(this._width,this._height)}setPixelRatio(e=1){this._pixelRatio=e,this.setSize(this._width,this._height,!1)}setDrawingBufferSize(e,t,i){this._width=e,this._height=t,this._pixelRatio=i,this.domElement.width=Math.floor(e*i),this.domElement.height=Math.floor(t*i),this._configureContext(),this._setupColorBuffer(),this._setupDepthBuffer()}setSize(e,t,i=!0){this._width=e,this._height=t,this.domElement.width=Math.floor(e*this._pixelRatio),this.domElement.height=Math.floor(t*this._pixelRatio),!0===i&&(this.domElement.style.width=e+"px",this.domElement.style.height=t+"px"),this._configureContext(),this._setupColorBuffer(),this._setupDepthBuffer()}setOpaqueSort(e){this._opaqueSort=e}setTransparentSort(e){this._transparentSort=e}getScissor(e){const t=this._scissor;return e.x=t.x,e.y=t.y,e.width=t.width,e.height=t.height,e}setScissor(e,t,i,s){this._scissor=null===e?null:{x:e,y:t,width:i,height:s}}copyFramebufferToRenderTarget(e){const t=this._currentRenderState,{encoderGPU:i,descriptorGPU:s}=t,r=e.texture;r.internalFormat=GPUTextureFormat.BGRA8Unorm,this._textures.initRenderTarget(e);const o=this._context.getCurrentTexture(),n=this._textures.getTextureGPU(r);t.currentPassGPU.end(),i.copyTextureToTexture({texture:o},{texture:n},[r.image.width,r.image.height]),s.colorAttachments[0].loadOp=GPULoadOp.Load,t.depth&&(s.depthStencilAttachment.depthLoadOp=GPULoadOp.Load),t.stencil&&(s.depthStencilAttachment.stencilLoadOp=GPULoadOp.Load),t.currentPassGPU=i.beginRenderPass(s)}getViewport(e){const t=this._viewport;return e.x=t.x,e.y=t.y,e.width=t.width,e.height=t.height,e.minDepth=t.minDepth,e.maxDepth=t.maxDepth,e}setViewport(e,t,i,s,r=0,o=1){this._viewport=null===e?null:{x:e,y:t,width:i,height:s,minDepth:r,maxDepth:o}}getClearColor(e){return e.copy(this._clearColor)}setClearColor(e,t=1){this._clearColor.set(e),this._clearAlpha=t}getClearAlpha(){return this._clearAlpha}setClearAlpha(e){this._clearAlpha=e}getClearDepth(){return this._clearDepth}setClearDepth(e){this._clearDepth=e}getClearStencil(){return this._clearStencil}setClearStencil(e){this._clearStencil=e}clear(){this._background&&this._background.clear()}dispose(){this._objects.dispose(),this._properties.dispose(),this._renderPipelines.dispose(),this._computePipelines.dispose(),this._nodes.dispose(),this._bindings.dispose(),this._info.dispose(),this._renderLists.dispose(),this._renderStates.dispose(),this._textures.dispose(),this.setRenderTarget(null),this.setAnimationLoop(null)}setRenderTarget(e){this._renderTarget=e}async compute(...e){!1===this._initialized&&await this.init();const t=this._device,i=this._computePipelines,s=t.createCommandEncoder({}),r=s.beginComputePass();for(const t of e){!1===i.has(t)&&t.onInit({renderer:this});const e=i.get(t);r.setPipeline(e);const s=this._bindings.getForCompute(t).group;this._bindings.update(t),r.setBindGroup(0,s),r.dispatchWorkgroups(t.dispatchCount)}r.end(),t.queue.submit([s.finish()])}getRenderTarget(){return this._renderTarget}hasFeature(e){if(!1===this._initialized)throw new Error("THREE.WebGPURenderer: Renderer must be initialized before testing features.");if(!1===Object.values(GPUFeatureName).includes(e))throw new Error("THREE.WebGPURenderer: Unknown WebGPU GPU feature: "+e);return this._adapter.features.has(e)}_projectObject(e,t,i,s){if(!1===e.visible)return;if(e.layers.test(t.layers))if(e.isGroup)i=e.renderOrder;else if(e.isLOD)!0===e.autoUpdate&&e.update(t);else if(e.isLight)s.pushLight(e);else if(e.isSprite){if(!e.frustumCulled||_frustum.intersectsSprite(e)){!0===this.sortObjects&&_vector3.setFromMatrixPosition(e.matrixWorld).applyMatrix4(_projScreenMatrix);const t=e.geometry,r=e.material;r.visible&&s.push(e,t,r,i,_vector3.z,null)}}else if(e.isLineLoop)console.error("THREE.WebGPURenderer: Objects of type THREE.LineLoop are not supported. Please use THREE.Line or THREE.LineSegments.");else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||_frustum.intersectsObject(e))){const t=e.geometry,r=e.material;if(!0===this.sortObjects&&(null===t.boundingSphere&&t.computeBoundingSphere(),_vector3.copy(t.boundingSphere.center).applyMatrix4(e.matrixWorld).applyMatrix4(_projScreenMatrix)),Array.isArray(r)){const o=t.groups;for(let n=0,a=o.length;n<a;n++){const a=o[n],h=r[a.materialIndex];h&&h.visible&&s.push(e,t,h,i,_vector3.z,a)}}else r.visible&&s.push(e,t,r,i,_vector3.z,null)}const r=e.children;for(let e=0,o=r.length;e<o;e++)this._projectObject(r[e],t,i,s)}_renderObjects(e,t,i,s){for(let r=0,o=e.length;r<o;r++){const o=e[r],{object:n,geometry:a,material:h,group:l}=o;if(t.isArrayCamera){const e=t.cameras;for(let t=0,r=e.length;t<r;t++){const r=e[t];if(n.layers.test(r.layers)){const e=r.viewport,t=void 0===e.minDepth?0:e.minDepth,o=void 0===e.maxDepth?1:e.maxDepth;this._currentRenderState.currentPassGPU.setViewport(e.x,e.y,e.width,e.height,t,o),this._renderObject(n,i,r,a,h,l,s)}}}else this._renderObject(n,i,t,a,h,l,s)}}_renderObject(e,t,i,s,r,o,n){r=null!==t.overrideMaterial?t.overrideMaterial:r,e.onBeforeRender(this,t,i,s,r,o);const a=this._getRenderObject(e,r,t,i,n);this._nodes.updateBefore(a);const h=this._currentRenderState.currentPassGPU,l=this._info;e.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),this._nodes.update(a),this._geometries.update(a),this._bindings.update(a);const p=this._renderPipelines.get(a);h.setPipeline(p.pipeline);const u=this._bindings.get(a).group;h.setBindGroup(0,u);const d=this._geometries.getIndex(a),c=null!==d;!0===c&&this._setupIndexBuffer(d,h),this._setupVertexBuffers(s.attributes,h,p);const _=s.drawRange,m=_.start,f=s.isInstancedBufferGeometry?s.instanceCount:e.isInstancedMesh?e.count:1;if(!0===c){const t=_.count!==1/0?_.count:d.count;h.drawIndexed(t,f,m,0,0),l.update(e,t,f)}else{const t=s.attributes.position,i=_.count!==1/0?_.count:t.count;h.draw(i,f,m,0),l.update(e,i,f)}}_getRenderObject(e,t,i,s,r){const o=this._objects.get(e,t,i,s,r),n=this._properties.get(o);if(!0!==n.initialized){n.initialized=!0;const a=()=>{this._renderPipelines.remove(o),this._nodes.remove(o),this._properties.remove(o),this._objects.remove(e,t,i,s,r),o.material.removeEventListener("dispose",a)};o.material.addEventListener("dispose",a)}const a=o.getCacheKey();return n.cacheKey!==a&&(n.cacheKey=a,this._renderPipelines.remove(o),this._nodes.remove(o)),o}_setupIndexBuffer(e,t){const i=this._attributes.get(e).buffer,s=e.array instanceof Uint16Array?GPUIndexFormat.Uint16:GPUIndexFormat.Uint32;t.setIndexBuffer(i,s)}_setupVertexBuffers(e,t,i){const s=i.shaderAttributes;for(const i of s){const s=i.name,r=i.slot,o=e[s];if(void 0!==o){const e=this._attributes.get(o).buffer;t.setVertexBuffer(r,e)}}}_setupColorBuffer(){this._device&&(this._colorBuffer&&this._colorBuffer.destroy(),this._colorBuffer=this._device.createTexture({label:"colorBuffer",size:{width:Math.floor(this._width*this._pixelRatio),height:Math.floor(this._height*this._pixelRatio),depthOrArrayLayers:1},sampleCount:this._parameters.sampleCount,format:GPUTextureFormat.BGRA8Unorm,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC}))}_setupDepthBuffer(){this._device&&(this._depthBuffer&&this._depthBuffer.destroy(),this._depthBuffer=this._device.createTexture({label:"depthBuffer",size:{width:Math.floor(this._width*this._pixelRatio),height:Math.floor(this._height*this._pixelRatio),depthOrArrayLayers:1},sampleCount:this._parameters.sampleCount,format:GPUTextureFormat.Depth24PlusStencil8,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC}))}_configureContext(){const e=this._device;e&&this._context.configure({device:e,format:GPUTextureFormat.BGRA8Unorm,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,alphaMode:"premultiplied"})}_createCanvasElement(){const e=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");return e.style.display="block",e}}export default WebGPURenderer;
import WebGPUBinding from"./WebGPUBinding.js";import{GPUBindingType}from"./constants.js";class WebGPUSampler extends WebGPUBinding{constructor(e,t){super(e),this.isSampler=!0,this.texture=t,this.type=GPUBindingType.Sampler,this.visibility=GPUShaderStage.FRAGMENT,this.samplerGPU=null}getTexture(){return this.texture}}export default WebGPUSampler;
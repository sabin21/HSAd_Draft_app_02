import WebGPUBinding from"./WebGPUBinding.js";import{GPUBindingType,GPUTextureViewDimension,GPUTextureAspect}from"./constants.js";class WebGPUSampledTexture extends WebGPUBinding{constructor(e,t){super(e),this.isSampledTexture=!0,this.texture=t,this.dimension=GPUTextureViewDimension.TwoD,this.type=GPUBindingType.SampledTexture,this.visibility=GPUShaderStage.FRAGMENT,this.aspect=t.isDepthTexture?GPUTextureAspect.DepthOnly:GPUTextureAspect.All,this.textureGPU=null}getTexture(){return this.texture}}class WebGPUSampledArrayTexture extends WebGPUSampledTexture{constructor(e,t){super(e,t),this.isSampledArrayTexture=!0,this.dimension=GPUTextureViewDimension.TwoDArray}}class WebGPUSampled3DTexture extends WebGPUSampledTexture{constructor(e,t){super(e,t),this.isSampled3DTexture=!0,this.dimension=GPUTextureViewDimension.ThreeD}}class WebGPUSampledCubeTexture extends WebGPUSampledTexture{constructor(e,t){super(e,t),this.isSampledCubeTexture=!0,this.dimension=GPUTextureViewDimension.Cube}}export{WebGPUSampledTexture,WebGPUSampledArrayTexture,WebGPUSampled3DTexture,WebGPUSampledCubeTexture};
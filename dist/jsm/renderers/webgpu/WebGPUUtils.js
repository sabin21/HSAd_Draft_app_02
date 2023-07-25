import{GPUPrimitiveTopology,GPUTextureFormat}from"./constants.js";class WebGPUUtils{constructor(e){this.renderer=e}getCurrentColorSpace(){const e=this.renderer,t=e.getRenderTarget();return null!==t?t.texture.colorSpace:e.outputColorSpace}getCurrentColorFormat(){let e;const t=this.renderer,r=t.getRenderTarget();return e=null!==r?t._properties.get(r).colorTextureFormat:GPUTextureFormat.BGRA8Unorm,e}getCurrentDepthStencilFormat(){let e;const t=this.renderer,r=t.getRenderTarget();return e=null!==r?t._properties.get(r).depthTextureFormat:GPUTextureFormat.Depth24PlusStencil8,e}getPrimitiveTopology(e,t){return e.isPoints?GPUPrimitiveTopology.PointList:e.isLineSegments||e.isMesh&&!0===t.wireframe?GPUPrimitiveTopology.LineList:e.isLine?GPUPrimitiveTopology.LineStrip:e.isMesh?GPUPrimitiveTopology.TriangleList:void 0}getSampleCount(){return this.renderer._parameters.sampleCount}}export default WebGPUUtils;
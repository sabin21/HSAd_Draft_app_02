import{GPUTextureViewDimension,GPUIndexFormat,GPUFilterMode,GPUPrimitiveTopology,GPULoadOp,GPUStoreOp}from"./constants.js";class WebGPUTextureUtils{constructor(e){this.device=e,this.sampler=e.createSampler({minFilter:GPUFilterMode.Linear}),this.pipelines={},this.mipmapVertexShaderModule=e.createShaderModule({label:"mipmapVertex",code:"\nstruct VarysStruct {\n\t@builtin( position ) Position: vec4<f32>,\n\t@location( 0 ) vTex : vec2<f32>\n};\n\n@vertex\nfn main( @builtin( vertex_index ) vertexIndex : u32 ) -> VarysStruct {\n\n\tvar Varys : VarysStruct;\n\n\tvar pos = array< vec2<f32>, 4 >(\n\t\tvec2<f32>( -1.0,  1.0 ),\n\t\tvec2<f32>(  1.0,  1.0 ),\n\t\tvec2<f32>( -1.0, -1.0 ),\n\t\tvec2<f32>(  1.0, -1.0 )\n\t);\n\n\tvar tex = array< vec2<f32>, 4 >(\n\t\tvec2<f32>( 0.0, 0.0 ),\n\t\tvec2<f32>( 1.0, 0.0 ),\n\t\tvec2<f32>( 0.0, 1.0 ),\n\t\tvec2<f32>( 1.0, 1.0 )\n\t);\n\n\tVarys.vTex = tex[ vertexIndex ];\n\tVarys.Position = vec4<f32>( pos[ vertexIndex ], 0.0, 1.0 );\n\n\treturn Varys;\n\n}\n"}),this.mipmapFragmentShaderModule=e.createShaderModule({label:"mipmapFragment",code:"\n@group( 0 ) @binding( 0 )\nvar imgSampler : sampler;\n\n@group( 0 ) @binding( 1 )\nvar img : texture_2d<f32>;\n\n@fragment\nfn main( @location( 0 ) vTex : vec2<f32> ) -> @location( 0 ) vec4<f32> {\n\n\treturn textureSample( img, imgSampler, vTex );\n\n}\n"})}getMipmapPipeline(e){let t=this.pipelines[e];return void 0===t&&(t=this.device.createRenderPipeline({vertex:{module:this.mipmapVertexShaderModule,entryPoint:"main"},fragment:{module:this.mipmapFragmentShaderModule,entryPoint:"main",targets:[{format:e}]},primitive:{topology:GPUPrimitiveTopology.TriangleStrip,stripIndexFormat:GPUIndexFormat.Uint32},layout:"auto"}),this.pipelines[e]=t),t}generateMipmaps(e,t,n=0){const i=this.getMipmapPipeline(t.format),r=this.device.createCommandEncoder({}),a=i.getBindGroupLayout(0);let o=e.createView({baseMipLevel:0,mipLevelCount:1,dimension:GPUTextureViewDimension.TwoD,baseArrayLayer:n});for(let s=1;s<t.mipLevelCount;s++){const t=e.createView({baseMipLevel:s,mipLevelCount:1,dimension:GPUTextureViewDimension.TwoD,baseArrayLayer:n}),p=r.beginRenderPass({colorAttachments:[{view:t,loadOp:GPULoadOp.Clear,storeOp:GPUStoreOp.Store,clearValue:[0,0,0,0]}]}),m=this.device.createBindGroup({layout:a,entries:[{binding:0,resource:this.sampler},{binding:1,resource:o}]});p.setPipeline(i),p.setBindGroup(0,m),p.draw(4,1,0,0),p.end(),o=t}this.device.queue.submit([r.finish()])}}export default WebGPUTextureUtils;
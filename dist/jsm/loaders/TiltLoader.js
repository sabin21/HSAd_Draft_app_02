import{BufferAttribute,BufferGeometry,Color,DoubleSide,FileLoader,Group,Loader,Mesh,MeshBasicMaterial,RawShaderMaterial,TextureLoader,Quaternion,Vector3}from"three";import*as fflate from"../libs/fflate.module.js";class TiltLoader extends Loader{load(t,e,a,r){const o=this,n=new FileLoader(this.manager);n.setPath(this.path),n.setResponseType("arraybuffer"),n.setWithCredentials(this.withCredentials),n.load(t,(function(a){try{e(o.parse(a))}catch(e){r?r(e):console.error(e),o.manager.itemError(t)}}),a,r)}parse(t){const e=new Group,a=fflate.unzipSync(new Uint8Array(t.slice(16))),r=JSON.parse(fflate.strFromU8(a["metadata.json"])),o=new DataView(a["data.sketch"].buffer),n=o.getInt32(16,!0),c={};let i=20;for(let t=0;t<n;t++){const t=o.getInt32(i,!0),e=[o.getFloat32(i+4,!0),o.getFloat32(i+8,!0),o.getFloat32(i+12,!0),o.getFloat32(i+16,!0)],a=o.getFloat32(i+20,!0),r=o.getUint32(i+24,!0),n=o.getUint32(i+28,!0);let l=0,d=0;for(let t=0;t<4;t++){const e=1<<t;(r&e)>0&&(l+=4),(n&e)>0&&(d+=4)}i=i+28+l+4;const f=o.getInt32(i,!0),b=new Float32Array(3*f),s=new Float32Array(4*f);i+=4;for(let t=0,e=0;t<b.length;t+=3,e+=4)b[t+0]=o.getFloat32(i+0,!0),b[t+1]=o.getFloat32(i+4,!0),b[t+2]=o.getFloat32(i+8,!0),s[e+0]=o.getFloat32(i+12,!0),s[e+1]=o.getFloat32(i+16,!0),s[e+2]=o.getFloat32(i+20,!0),s[e+3]=o.getFloat32(i+24,!0),i=i+28+d;t in c==0&&(c[t]=[]),c[t].push([b,s,a,e])}for(const t in c){const a=new StrokeGeometry(c[t]),o=getMaterial(r.BrushIndex[t]);e.add(new Mesh(a,o))}return e}}class StrokeGeometry extends BufferGeometry{constructor(t){super();const e=[],a=[],r=[],o=new Vector3,n=new Vector3,c=new Quaternion,i=new Quaternion,l=new Vector3,d=new Vector3,f=new Vector3,b=new Vector3,s=new Color;for(const u in t){const p=t[u],h=p[0],g=p[1],m=p[2],v=p[3],S=p[3][3];s.fromArray(v).convertSRGBToLinear(),n.fromArray(h,0),i.fromArray(g,0);for(let t=3,u=4,p=h.length;t<p;t+=3,u+=4){o.fromArray(h,t),c.fromArray(g,u),l.set(-m,0,0),l.applyQuaternion(c),l.add(o),d.set(m,0,0),d.applyQuaternion(c),d.add(o),f.set(m,0,0),f.applyQuaternion(i),f.add(n),b.set(-m,0,0),b.applyQuaternion(i),b.add(n),e.push(l.x,l.y,-l.z),e.push(d.x,d.y,-d.z),e.push(b.x,b.y,-b.z),e.push(d.x,d.y,-d.z),e.push(f.x,f.y,-f.z),e.push(b.x,b.y,-b.z),n.copy(o),i.copy(c),a.push(...s,S),a.push(...s,S),a.push(...s,S),a.push(...s,S),a.push(...s,S),a.push(...s,S);const v=t/p,y=(t-3)/p;r.push(v,0),r.push(v,1),r.push(y,0),r.push(v,1),r.push(y,1),r.push(y,0)}}this.setAttribute("position",new BufferAttribute(new Float32Array(e),3)),this.setAttribute("color",new BufferAttribute(new Float32Array(a),4)),this.setAttribute("uv",new BufferAttribute(new Float32Array(r),2))}}const BRUSH_LIST_ARRAY={"89d104cd-d012-426b-b5b3-bbaee63ac43c":"Bubbles","700f3aa8-9a7c-2384-8b8a-ea028905dd8c":"CelVinyl","0f0ff7b2-a677-45eb-a7d6-0cd7206f4816":"ChromaticWave","1161af82-50cf-47db-9706-0c3576d43c43":"CoarseBristles","79168f10-6961-464a-8be1-57ed364c5600":"CoarseBristlesSingleSided","1caa6d7d-f015-3f54-3a4b-8b5354d39f81":"Comet","c8313697-2563-47fc-832e-290f4c04b901":"DiamondHull","4391aaaa-df73-4396-9e33-31e4e4930b27":"Disco","d1d991f2-e7a0-4cf1-b328-f57e915e6260":"DotMarker","6a1cf9f9-032c-45ec-9b1d-a6680bee30f7":"Dots","0d3889f3-3ede-470c-8af4-f44813306126":"DoubleTaperedFlat","0d3889f3-3ede-470c-8af4-de4813306126":"DoubleTaperedMarker","d0262945-853c-4481-9cbd-88586bed93cb":"DuctTape","3ca16e2f-bdcd-4da2-8631-dcef342f40f1":"DuctTapeSingleSided","f6e85de3-6dcc-4e7f-87fd-cee8c3d25d51":"Electricity","02ffb866-7fb2-4d15-b761-1012cefb1360":"Embers","cb92b597-94ca-4255-b017-0e3f42f12f9e":"Fire","2d35bcf0-e4d8-452c-97b1-3311be063130":"Flat","55303bc4-c749-4a72-98d9-d23e68e76e18":"FlatDeprecated","280c0a7a-aad8-416c-a7d2-df63d129ca70":"FlatSingleSided","cf019139-d41c-4eb0-a1d0-5cf54b0a42f3":"Highlighter","6a1cf9f9-032c-45ec-9b6e-a6680bee32e9":"HyperGrid","dce872c2-7b49-4684-b59b-c45387949c5c":"Hypercolor","e8ef32b1-baa8-460a-9c2c-9cf8506794f5":"HypercolorSingleSided","2f212815-f4d3-c1a4-681a-feeaf9c6dc37":"Icing","f5c336cf-5108-4b40-ade9-c687504385ab":"Ink","c0012095-3ffd-4040-8ee1-fc180d346eaa":"InkSingleSided","4a76a27a-44d8-4bfe-9a8c-713749a499b0":"Leaves","ea19de07-d0c0-4484-9198-18489a3c1487":"LeavesSingleSided","2241cd32-8ba2-48a5-9ee7-2caef7e9ed62":"Light","4391aaaa-df81-4396-9e33-31e4e4930b27":"LightWire","d381e0f5-3def-4a0d-8853-31e9200bcbda":"Lofted","429ed64a-4e97-4466-84d3-145a861ef684":"Marker","79348357-432d-4746-8e29-0e25c112e3aa":"MatteHull","b2ffef01-eaaa-4ab5-aa64-95a2c4f5dbc6":"NeonPulse","f72ec0e7-a844-4e38-82e3-140c44772699":"OilPaint","c515dad7-4393-4681-81ad-162ef052241b":"OilPaintSingleSided","f1114e2e-eb8d-4fde-915a-6e653b54e9f5":"Paper","759f1ebd-20cd-4720-8d41-234e0da63716":"PaperSingleSided","e0abbc80-0f80-e854-4970-8924a0863dcc":"Petal","c33714d1-b2f9-412e-bd50-1884c9d46336":"Plasma","ad1ad437-76e2-450d-a23a-e17f8310b960":"Rainbow","faaa4d44-fcfb-4177-96be-753ac0421ba3":"ShinyHull","70d79cca-b159-4f35-990c-f02193947fe8":"Smoke","d902ed8b-d0d1-476c-a8de-878a79e3a34c":"Snow","accb32f5-4509-454f-93f8-1df3fd31df1b":"SoftHighlighter","cf7f0059-7aeb-53a4-2b67-c83d863a9ffa":"Spikes","8dc4a70c-d558-4efd-a5ed-d4e860f40dc3":"Splatter","7a1c8107-50c5-4b70-9a39-421576d6617e":"SplatterSingleSided","0eb4db27-3f82-408d-b5a1-19ebd7d5b711":"Stars","44bb800a-fbc3-4592-8426-94ecb05ddec3":"Streamers","0077f88c-d93a-42f3-b59b-b31c50cdb414":"Taffy","b468c1fb-f254-41ed-8ec9-57030bc5660c":"TaperedFlat","c8ccb53d-ae13-45ef-8afb-b730d81394eb":"TaperedFlatSingleSided","d90c6ad8-af0f-4b54-b422-e0f92abe1b3c":"TaperedMarker","1a26b8c0-8a07-4f8a-9fac-d2ef36e0cad0":"TaperedMarker_Flat","75b32cf0-fdd6-4d89-a64b-e2a00b247b0f":"ThickPaint","fdf0326a-c0d1-4fed-b101-9db0ff6d071f":"ThickPaintSingleSided","4391385a-df73-4396-9e33-31e4e4930b27":"Toon","a8fea537-da7c-4d4b-817f-24f074725d6d":"UnlitHull","d229d335-c334-495a-a801-660ac8a87360":"VelvetInk","10201aa3-ebc2-42d8-84b7-2e63f6eeb8ab":"Waveform","b67c0e81-ce6d-40a8-aeb0-ef036b081aa3":"WetPaint","dea67637-cd1a-27e4-c9b1-52f4bbcb84e5":"WetPaintSingleSided","5347acf0-a8e2-47b6-8346-30c70719d763":"WigglyGraphite","e814fef1-97fd-7194-4a2f-50c2bb918be2":"WigglyGraphiteSingleSided","4391385a-cf83-4396-9e33-31e4e4930b27":"Wire"},common={colors:{BloomColor:"\n\t\t\tvec3 BloomColor(vec3 color, float gain) {\n\t\t\t\t// Guarantee that there's at least a little bit of all 3 channels.\n\t\t\t\t// This makes fully-saturated strokes (which only have 2 non-zero\n\t\t\t\t// color channels) eventually clip to white rather than to a secondary.\n\t\t\t\tfloat cmin = length(color.rgb) * .05;\n\t\t\t\tcolor.rgb = max(color.rgb, vec3(cmin, cmin, cmin));\n\t\t\t\t// If we try to remove this pow() from .a, it brightens up\n\t\t\t\t// pressure-sensitive strokes; looks better as-is.\n\t\t\t\tcolor = pow(color, vec3(2.2));\n\t\t\t\tcolor.rgb *= 2. * exp(gain * 10.);\n\t\t\t\treturn color;\n\t\t\t}\n\t\t",LinearToSrgb:"\n\t\t\tvec3 LinearToSrgb(vec3 color) {\n\t\t\t\t// Approximation http://chilliant.blogspot.com/2012/08/srgb-approximations-for-hlsl.html\n\t\t\t\tvec3 linearColor = color.rgb;\n\t\t\t\tvec3 S1 = sqrt(linearColor);\n\t\t\t\tvec3 S2 = sqrt(S1);\n\t\t\t\tvec3 S3 = sqrt(S2);\n\t\t\t\tcolor.rgb = 0.662002687 * S1 + 0.684122060 * S2 - 0.323583601 * S3 - 0.0225411470 * linearColor;\n\t\t\t\treturn color;\n\t\t\t}\n\t\t",hsv:"\n\t\t\t// uniform sampler2D lookupTex;\n\t\t\tvec4 lookup(vec4 textureColor) {\n\t\t\t\treturn textureColor;\n\t\t\t}\n\n\t\t\tvec3 lookup(vec3 textureColor) {\n\t\t\t\treturn textureColor;\n\t\t\t}\n\n\t\t\tvec3 hsv2rgb( vec3 hsv ) {\n\t\t\t\tvec3 rgb = clamp( abs(mod(hsv.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );\n\t\t\t\treturn hsv.z * mix( vec3(1.0), rgb, hsv.y);\n\t\t\t}\n\n\t\t\tvec3 rgb2hsv( vec3 rgb ) {\n\t\t\t\tvec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n\t\t\t\tvec4 p = mix(vec4(rgb.bg, K.wz), vec4(rgb.gb, K.xy), step(rgb.b, rgb.g));\n\t\t\t\tvec4 q = mix(vec4(p.xyw, rgb.r), vec4(rgb.r, p.yzx), step(p.x, rgb.r));\n\n\t\t\t\tfloat d = q.x - min(q.w, q.y);\n\t\t\t\tfloat e = 1.0e-10;\n\n\t\t\t\treturn vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\n\t\t\t}\n\t\t",SrgbToLinear:"\n\t\t\tvec3 SrgbToLinear(vec3 color) {\n\t\t\t\t// Approximation http://chilliant.blogspot.com/2012/08/srgb-approximations-for-hlsl.html\n\t\t\t\tvec3 sRGB = color.rgb;\n\t\t\t\tcolor.rgb = sRGB * (sRGB * (sRGB * 0.305306011 + 0.682171111) + 0.012522878);\n\t\t\t\treturn color;\n\t\t\t}\n\t\t"}};let shaders=null;function getShaders(){if(null===shaders){const t=(new TextureLoader).setPath("./textures/tiltbrush/");shaders={Light:{uniforms:{mainTex:{value:t.load("Light.webp")},alphaTest:{value:.067},emission_gain:{value:.45},alpha:{value:1}},vertexShader:`\n\t\t\t\t\tprecision highp float;\n\t\t\t\t\tprecision highp int;\n\n\t\t\t\t\tattribute vec2 uv;\n\t\t\t\t\tattribute vec4 color;\n\t\t\t\t\tattribute vec3 position;\n\n\t\t\t\t\tuniform mat4 modelMatrix;\n\t\t\t\t\tuniform mat4 modelViewMatrix;\n\t\t\t\t\tuniform mat4 projectionMatrix;\n\t\t\t\t\tuniform mat4 viewMatrix;\n\t\t\t\t\tuniform mat3 normalMatrix;\n\t\t\t\t\tuniform vec3 cameraPosition;\n\n\t\t\t\t\tvarying vec2 vUv;\n\t\t\t\t\tvarying vec3 vColor;\n\n\t\t\t\t\t${common.colors.LinearToSrgb}\n\t\t\t\t\t${common.colors.hsv}\n\n\t\t\t\t\tvoid main() {\n\n\t\t\t\t\t\tvUv = uv;\n\n\t\t\t\t\t\tvColor = lookup(color.rgb);\n\n\t\t\t\t\t\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\n\t\t\t\t\t\tgl_Position = projectionMatrix * mvPosition;\n\n\t\t\t\t\t}\n\t\t\t\t`,fragmentShader:`\n\t\t\t\t\tprecision highp float;\n\t\t\t\t\tprecision highp int;\n\n\t\t\t\t\tuniform float emission_gain;\n\n\t\t\t\t\tuniform sampler2D mainTex;\n\t\t\t\t\tuniform float alphaTest;\n\n\t\t\t\t\tvarying vec2 vUv;\n\t\t\t\t\tvarying vec3 vColor;\n\n\t\t\t\t\t${common.colors.BloomColor}\n\t\t\t\t\t${common.colors.SrgbToLinear}\n\n\t\t\t\t\tvoid main(){\n\t\t\t\t\t\tvec4 col = texture2D(mainTex, vUv);\n\t\t\t\t\t\tvec3 color = vColor;\n\t\t\t\t\t\tcolor = BloomColor(color, emission_gain);\n\t\t\t\t\t\tcolor = color * col.rgb;\n\t\t\t\t\t\tcolor = color * col.a;\n\t\t\t\t\t\tcolor = SrgbToLinear(color);\n\t\t\t\t\t\tgl_FragColor = vec4(color, 1.0);\n\t\t\t\t\t}\n\t\t\t\t`,side:2,transparent:!0,depthFunc:2,depthWrite:!0,depthTest:!1,blending:5,blendDst:201,blendDstAlpha:201,blendEquation:100,blendEquationAlpha:100,blendSrc:201,blendSrcAlpha:201}}}return shaders}function getMaterial(t){return"Light"===BRUSH_LIST_ARRAY[t]?new RawShaderMaterial(getShaders().Light):new MeshBasicMaterial({vertexColors:!0,side:DoubleSide})}export{TiltLoader};
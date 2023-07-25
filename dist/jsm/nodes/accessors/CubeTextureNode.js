import TextureNode from"./TextureNode.js";import UniformNode from"../core/UniformNode.js";import{reflectVector}from"./ReflectVectorNode.js";import{addNodeClass}from"../core/Node.js";import{addNodeElement,nodeProxy,vec3}from"../shadernode/ShaderNode.js";class CubeTextureNode extends TextureNode{constructor(e,t=null,r=null){super(e,t,r),this.isCubeTextureNode=!0}getInputType(){return"cubeTexture"}getDefaultUV(){return reflectVector}generate(e,t){const{uvNode:r,levelNode:o}=e.getNodeProperties(this),u=this.value;if(!u||!0!==u.isCubeTexture)throw new Error("CubeTextureNode: Need a three.js cube texture.");const d=UniformNode.prototype.generate.call(this,e,"cubeTexture");if("sampler"===t)return d+"_sampler";if(e.isReference(t))return d;{const u=e.getDataFromNode(this);let s=u.propertyName;if(void 0===s){const t=vec3(r.x.negate(),r.yz).build(e,"vec3"),n=e.getVarFromNode(this,"vec4");s=e.getPropertyName(n);let i=null;if(o&&!0===o.isNode){const r=o.build(e,"float");i=e.getTextureLevel(this,d,t,r)}else i=e.getTexture(this,d,t);e.addLineFlowCode(`${s} = ${i}`),u.snippet=i,u.propertyName=s}return e.format(s,"vec4",t)}}}export default CubeTextureNode;export const cubeTexture=nodeProxy(CubeTextureNode);addNodeElement("cubeTexture",cubeTexture),addNodeClass(CubeTextureNode);
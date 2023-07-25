import BRDF_Lambert from"./BSDF/BRDF_Lambert.js";import BRDF_BlinnPhong from"./BSDF/BRDF_BlinnPhong.js";import{lightingModel}from"../core/LightingModel.js";import{diffuseColor}from"../core/PropertyNode.js";import{materialReflectivity}from"../accessors/MaterialNode.js";import{transformedNormalView}from"../accessors/NormalNode.js";import{ShaderNode}from"../shadernode/ShaderNode.js";const RE_Direct_BlinnPhong=new ShaderNode((({lightDirection:e,lightColor:i,reflectedLight:o})=>{const r=transformedNormalView.dot(e).clamp().mul(i);o.directDiffuse.addAssign(r.mul(BRDF_Lambert.call({diffuseColor:diffuseColor.rgb}))),o.directSpecular.addAssign(r.mul(BRDF_BlinnPhong.call({lightDirection:e})).mul(materialReflectivity))})),RE_IndirectDiffuse_BlinnPhong=new ShaderNode((({irradiance:e,reflectedLight:i})=>{i.indirectDiffuse.addAssign(e.mul(BRDF_Lambert.call({diffuseColor})))})),phongLightingModel=lightingModel(RE_Direct_BlinnPhong,RE_IndirectDiffuse_BlinnPhong);export default phongLightingModel;
import{BackSide,BoxGeometry,BufferAttribute,BufferGeometry,ClampToEdgeWrapping,Color,ConeGeometry,CylinderGeometry,DataTexture,DoubleSide,FileLoader,Float32BufferAttribute,FrontSide,Group,LineBasicMaterial,LineSegments,Loader,LoaderUtils,Mesh,MeshBasicMaterial,MeshPhongMaterial,Object3D,Points,PointsMaterial,Quaternion,RepeatWrapping,Scene,ShapeUtils,SphereGeometry,TextureLoader,Vector2,Vector3}from"three";import chevrotain from"../libs/chevrotain.module.min.js";class VRMLLoader extends Loader{constructor(e){super(e)}load(e,t,r,n){const o=this,a=""===o.path?LoaderUtils.extractUrlBase(e):o.path,s=new FileLoader(o.manager);s.setPath(o.path),s.setRequestHeader(o.requestHeader),s.setWithCredentials(o.withCredentials),s.load(e,(function(r){try{t(o.parse(r,a))}catch(t){n?n(t):console.error(t),o.manager.itemError(e)}}),r,n)}parse(e,t){const r={};function n(e){e.DEF&&(r[e.DEF]=e);const t=e.fields;for(let e=0,r=t.length;e<r;e++){const r=t[e];if("node"===r.type){const e=r.values;for(let t=0,r=e.length;t<r;t++)n(e[t])}}}function o(e){return e.USE?function(e){const t=o(r[e]);return t.isObject3D||t.isMaterial?t.clone():t}(e.USE):(void 0!==e.build||(e.build=function(e){const t=e.name;let r;switch(t){case"Anchor":case"Group":case"Transform":case"Collision":r=function(e){const t=new Group,r=e.fields;for(let e=0,n=r.length;e<n;e++){const n=r[e],o=n.name,a=n.values;switch(o){case"bboxCenter":case"bboxSize":case"center":case"description":case"collide":case"parameter":case"scaleOrientation":case"proxy":case"url":break;case"children":i(a,t);break;case"rotation":const e=new Vector3(a[0],a[1],a[2]),r=a[3];t.quaternion.setFromAxisAngle(e,r);break;case"scale":t.scale.set(a[0],a[1],a[2]);break;case"translation":t.position.set(a[0],a[1],a[2]);break;default:console.warn("THREE.VRMLLoader: Unknown field:",o)}}return t}(e);break;case"Background":r=function(e){const t=new Group;let r,n,o,a;const s=e.fields;for(let e=0,t=s.length;e<t;e++){const t=s[e],i=t.name,l=t.values;switch(i){case"groundAngle":r=l;break;case"groundColor":n=l;break;case"backUrl":case"bottomUrl":case"frontUrl":case"leftUrl":case"rightUrl":case"topUrl":break;case"skyAngle":o=l;break;case"skyColor":a=l;break;default:console.warn("THREE.VRMLLoader: Unknown field:",i)}}const i=1e4;if(a){const e=new SphereGeometry(i,32,16),r=new MeshBasicMaterial({fog:!1,side:BackSide,depthWrite:!1,depthTest:!1});a.length>3?(U(e,i,o,A(a),!0),r.vertexColors=!0):r.color.setRGB(a[0],a[1],a[2]);const n=new Mesh(e,r);t.add(n)}if(n&&n.length>0){const e=new SphereGeometry(i,32,16,0,2*Math.PI,.5*Math.PI,1.5*Math.PI),o=new MeshBasicMaterial({fog:!1,side:BackSide,vertexColors:!0,depthWrite:!1,depthTest:!1});U(e,i,r,A(n),!1);const a=new Mesh(e,o);t.add(a)}return t.renderOrder=-1/0,t}(e);break;case"Shape":r=function(e){const t=e.fields;let r,n,a=new MeshBasicMaterial({color:0});for(let e=0,n=t.length;e<n;e++){const n=t[e],s=n.name,i=n.values;switch(s){case"appearance":null!==i[0]&&(a=o(i[0]));break;case"geometry":null!==i[0]&&(r=o(i[0]));break;default:console.warn("THREE.VRMLLoader: Unknown field:",s)}}if(r&&r.attributes.position){const e=r._type;if("points"===e){const e=new PointsMaterial({color:16777215});void 0!==r.attributes.color?e.vertexColors=!0:a.isMeshPhongMaterial&&e.color.copy(a.emissive),n=new Points(r,e)}else if("line"===e){const e=new LineBasicMaterial({color:16777215});void 0!==r.attributes.color?e.vertexColors=!0:a.isMeshPhongMaterial&&e.color.copy(a.emissive),n=new LineSegments(r,e)}else void 0!==r._solid&&(a.side=r._solid?FrontSide:DoubleSide),void 0!==r.attributes.color&&(a.vertexColors=!0),n=new Mesh(r,a)}else n=new Object3D,n.visible=!1;return n}(e);break;case"Appearance":r=function(e){let t,r=new MeshPhongMaterial;const n=e.fields;for(let e=0,a=n.length;e<a;e++){const a=n[e],s=a.name,i=a.values;switch(s){case"material":if(null!==i[0]){const e=o(i[0]);e.diffuseColor&&r.color.copy(e.diffuseColor),e.emissiveColor&&r.emissive.copy(e.emissiveColor),e.shininess&&(r.shininess=e.shininess),e.specularColor&&r.specular.copy(e.specularColor),e.transparency&&(r.opacity=1-e.transparency),e.transparency>0&&(r.transparent=!0)}else r=new MeshBasicMaterial({color:0});break;case"texture":const e=i[0];null!==e&&("ImageTexture"!==e.name&&"PixelTexture"!==e.name||(r.map=o(e)));break;case"textureTransform":null!==i[0]&&(t=o(i[0]));break;default:console.warn("THREE.VRMLLoader: Unknown field:",s)}}if(r.map){if(r.map.__type){switch(r.map.__type){case TEXTURE_TYPE.INTENSITY_ALPHA:r.opacity=1;break;case TEXTURE_TYPE.RGB:r.color.set(16777215);break;case TEXTURE_TYPE.RGBA:r.color.set(16777215),r.opacity=1}delete r.map.__type}t&&(r.map.center.copy(t.center),r.map.rotation=t.rotation,r.map.repeat.copy(t.scale),r.map.offset.copy(t.translation))}return r}(e);break;case"Material":r=function(e){const t={},r=e.fields;for(let e=0,n=r.length;e<n;e++){const n=r[e],o=n.name,a=n.values;switch(o){case"ambientIntensity":break;case"diffuseColor":t.diffuseColor=new Color(a[0],a[1],a[2]);break;case"emissiveColor":case"specularColor":t.emissiveColor=new Color(a[0],a[1],a[2]);break;case"shininess":t.shininess=a[0];break;case"transparency":t.transparency=a[0];break;default:console.warn("THREE.VRMLLoader: Unknown field:",o)}}return t}(e);break;case"ImageTexture":r=function(e){let t,r=RepeatWrapping,n=RepeatWrapping;const o=e.fields;for(let e=0,a=o.length;e<a;e++){const a=o[e],s=a.name,i=a.values;switch(s){case"url":const e=i[0];e&&(t=M.load(e));break;case"repeatS":!1===i[0]&&(r=ClampToEdgeWrapping);break;case"repeatT":!1===i[0]&&(n=ClampToEdgeWrapping);break;default:console.warn("THREE.VRMLLoader: Unknown field:",s)}}return t&&(t.wrapS=r,t.wrapT=n),t}(e);break;case"PixelTexture":r=function(e){let t,r=RepeatWrapping,n=RepeatWrapping;const o=e.fields;for(let e=0,i=o.length;e<i;e++){const i=o[e],l=i.name,c=i.values;switch(l){case"image":const e=c[0],o=c[1],i=s(c[2]),u=new Uint8Array(4*e*o),f={r:0,g:0,b:0,a:0};for(let e=3,t=0,r=c.length;e<r;e++,t++){a(c[e],i,f);const r=4*t;u[r+0]=f.r,u[r+1]=f.g,u[r+2]=f.b,u[r+3]=f.a}t=new DataTexture(u,e,o),t.needsUpdate=!0,t.__type=i;break;case"repeatS":!1===c[0]&&(r=ClampToEdgeWrapping);break;case"repeatT":!1===c[0]&&(n=ClampToEdgeWrapping);break;default:console.warn("THREE.VRMLLoader: Unknown field:",l)}}return t&&(t.wrapS=r,t.wrapT=n),t}(e);break;case"TextureTransform":r=function(e){const t={center:new Vector2,rotation:new Vector2,scale:new Vector2,translation:new Vector2},r=e.fields;for(let e=0,n=r.length;e<n;e++){const n=r[e],o=n.name,a=n.values;switch(o){case"center":t.center.set(a[0],a[1]);break;case"rotation":t.rotation=a[0];break;case"scale":t.scale.set(a[0],a[1]);break;case"translation":t.translation.set(a[0],a[1]);break;default:console.warn("THREE.VRMLLoader: Unknown field:",o)}}return t}(e);break;case"IndexedFaceSet":r=function(e){let t,r,n,a,s,i,f,d,p=!0,h=!0,b=0,x=!0,m=!0;const g=e.fields;for(let e=0,l=g.length;e<l;e++){const l=g[e],c=l.name,u=l.values;switch(c){case"color":const e=u[0];null!==e&&(t=o(e));break;case"coord":const l=u[0];null!==l&&(r=o(l));break;case"normal":const g=u[0];null!==g&&(n=o(g));break;case"texCoord":const E=u[0];null!==E&&(a=o(E));break;case"ccw":p=u[0];break;case"colorIndex":s=u;break;case"colorPerVertex":x=u[0];break;case"convex":break;case"coordIndex":i=u;break;case"creaseAngle":b=u[0];break;case"normalIndex":f=u;break;case"normalPerVertex":m=u[0];break;case"solid":h=u[0];break;case"texCoordIndex":d=u;break;default:console.warn("THREE.VRMLLoader: Unknown field:",c)}}if(void 0===i)return console.warn("THREE.VRMLLoader: Missing coordIndex."),new BufferGeometry;const w=l(i,p);let k,y,R;t&&(k=!0===x?s&&s.length>0?E(w,l(s,p),t,3):T(w,new Float32BufferAttribute(t,3)):s&&s.length>0?L(w,c(u(t,s),i)):L(w,c(t,i))),y=n?!0===m?f&&f.length>0?E(w,l(f,p),n,3):T(w,new Float32BufferAttribute(n,3)):f&&f.length>0?L(w,c(u(n,f),i)):L(w,c(n,i)):S(w,r,b),a&&(R=d&&d.length>0?E(w,l(d,p),a,2):T(w,new Float32BufferAttribute(a,2)));const A=new BufferGeometry,U=T(w,new Float32BufferAttribute(r,3));return A.setAttribute("position",U),A.setAttribute("normal",y),k&&A.setAttribute("color",k),R&&A.setAttribute("uv",R),A._solid=h,A._type="mesh",A}(e);break;case"IndexedLineSet":r=function(e){let t,r,n,a,s=!0;const i=e.fields;for(let e=0,l=i.length;e<l;e++){const l=i[e],c=l.name,u=l.values;switch(c){case"color":const e=u[0];null!==e&&(t=o(e));break;case"coord":const i=u[0];null!==i&&(r=o(i));break;case"colorIndex":n=u;break;case"colorPerVertex":s=u[0];break;case"coordIndex":a=u;break;default:console.warn("THREE.VRMLLoader: Unknown field:",c)}}let l;const c=f(a);t&&(l=!0===s?n.length>0?E(c,f(n),t,3):T(c,new Float32BufferAttribute(t,3)):n.length>0?w(c,d(u(t,n),a)):w(c,d(t,a)));const p=new BufferGeometry,h=T(c,new Float32BufferAttribute(r,3));return p.setAttribute("position",h),l&&p.setAttribute("color",l),p._type="line",p}(e);break;case"PointSet":r=function(e){let t,r;const n=e.fields;for(let e=0,a=n.length;e<a;e++){const a=n[e],s=a.name,i=a.values;switch(s){case"color":const e=i[0];null!==e&&(t=o(e));break;case"coord":const n=i[0];null!==n&&(r=o(n));break;default:console.warn("THREE.VRMLLoader: Unknown field:",s)}}const a=new BufferGeometry;return a.setAttribute("position",new Float32BufferAttribute(r,3)),t&&a.setAttribute("color",new Float32BufferAttribute(t,3)),a._type="points",a}(e);break;case"Box":r=function(e){const t=new Vector3(2,2,2),r=e.fields;for(let e=0,n=r.length;e<n;e++){const n=r[e],o=n.name,a=n.values;"size"===o?(t.x=a[0],t.y=a[1],t.z=a[2]):console.warn("THREE.VRMLLoader: Unknown field:",o)}return new BoxGeometry(t.x,t.y,t.z)}(e);break;case"Cone":r=function(e){let t=1,r=2,n=!1;const o=e.fields;for(let e=0,a=o.length;e<a;e++){const a=o[e],s=a.name,i=a.values;switch(s){case"bottom":n=!i[0];break;case"bottomRadius":t=i[0];break;case"height":r=i[0];break;case"side":break;default:console.warn("THREE.VRMLLoader: Unknown field:",s)}}return new ConeGeometry(t,r,16,1,n)}(e);break;case"Cylinder":r=function(e){let t=1,r=2;const n=e.fields;for(let e=0,o=n.length;e<o;e++){const o=n[e],a=o.name,s=o.values;switch(a){case"bottom":case"side":case"top":break;case"radius":t=s[0];break;case"height":r=s[0];break;default:console.warn("THREE.VRMLLoader: Unknown field:",a)}}return new CylinderGeometry(t,t,r,16,1)}(e);break;case"Sphere":r=function(e){let t=1;const r=e.fields;for(let e=0,n=r.length;e<n;e++){const n=r[e],o=n.name,a=n.values;"radius"===o?t=a[0]:console.warn("THREE.VRMLLoader: Unknown field:",o)}return new SphereGeometry(t,16,16)}(e);break;case"ElevationGrid":r=function(e){let t,r,n,a,s=!0,i=!0,l=!0,c=!0,u=0,f=2,d=2,p=1,h=1;const b=e.fields;for(let e=0,x=b.length;e<x;e++){const x=b[e],m=x.name,g=x.values;switch(m){case"color":const e=g[0];null!==e&&(t=o(e));break;case"normal":const b=g[0];null!==b&&(r=o(b));break;case"texCoord":const x=g[0];null!==x&&(n=o(x));break;case"height":a=g;break;case"ccw":c=g[0];break;case"colorPerVertex":s=g[0];break;case"creaseAngle":u=g[0];break;case"normalPerVertex":i=g[0];break;case"solid":l=g[0];break;case"xDimension":f=g[0];break;case"xSpacing":p=g[0];break;case"zDimension":d=g[0];break;case"zSpacing":h=g[0];break;default:console.warn("THREE.VRMLLoader: Unknown field:",m)}}const x=[],m=[],g=[],E=[];for(let e=0;e<d;e++)for(let o=0;o<f;o++){const l=e*f+o,c=p*e,u=a[l],b=h*o;if(x.push(c,u,b),t&&!0===s){const e=t[3*l+0],r=t[3*l+1],n=t[3*l+2];g.push(e,r,n)}if(r&&!0===i){const e=r[3*l+0],t=r[3*l+1],n=r[3*l+2];m.push(e,t,n)}if(n){const e=n[2*l+0],t=n[2*l+1];E.push(e,t)}else E.push(e/(f-1),o/(d-1))}const L=[];for(let e=0;e<f-1;e++)for(let t=0;t<d-1;t++){const r=e+t*f,n=e+(t+1)*f,o=e+1+(t+1)*f,a=e+1+t*f;!0===c?(L.push(r,o,n),L.push(o,r,a)):(L.push(r,n,o),L.push(o,a,r))}const w=T(L,new Float32BufferAttribute(x,3)),k=T(L,new Float32BufferAttribute(E,2));let y,R;if(t)if(!1===s){for(let e=0;e<f-1;e++)for(let r=0;r<d-1;r++){const n=e+r*(f-1),o=t[3*n+0],a=t[3*n+1],s=t[3*n+2];g.push(o,a,s),g.push(o,a,s),g.push(o,a,s),g.push(o,a,s),g.push(o,a,s),g.push(o,a,s)}y=new Float32BufferAttribute(g,3)}else y=T(L,new Float32BufferAttribute(g,3));if(r)if(!1===i){for(let e=0;e<f-1;e++)for(let t=0;t<d-1;t++){const n=e+t*(f-1),o=r[3*n+0],a=r[3*n+1],s=r[3*n+2];m.push(o,a,s),m.push(o,a,s),m.push(o,a,s),m.push(o,a,s),m.push(o,a,s),m.push(o,a,s)}R=new Float32BufferAttribute(m,3)}else R=T(L,new Float32BufferAttribute(m,3));else R=S(L,x,u);const A=new BufferGeometry;return A.setAttribute("position",w),A.setAttribute("normal",R),A.setAttribute("uv",k),y&&A.setAttribute("color",y),A._solid=l,A._type="mesh",A}(e);break;case"Extrusion":r=function(e){let t,r,n=[1,1,1,-1,-1,-1,-1,1,1,1],o=[0,0,0,0,1,0],a=!0,s=!0,i=0,l=!0,c=!0;const u=e.fields;for(let e=0,f=u.length;e<f;e++){const f=u[e],d=f.name,p=f.values;switch(d){case"beginCap":a=p[0];break;case"ccw":s=p[0];break;case"convex":break;case"creaseAngle":i=p[0];break;case"crossSection":n=p;break;case"endCap":l=p[0];break;case"orientation":r=p;break;case"scale":t=p;break;case"solid":c=p[0];break;case"spine":o=p;break;default:console.warn("THREE.VRMLLoader: Unknown field:",d)}}const f=n[0]===n[n.length-2]&&n[1]===n[n.length-1],d=[],p=new Vector3,h=new Vector3,b=new Vector3,x=new Vector3,m=new Quaternion;for(let e=0,a=0,s=0,i=o.length;e<i;e+=3,a+=2,s+=4){p.fromArray(o,e),h.x=t?t[a+0]:1,h.y=1,h.z=t?t[a+1]:1,b.x=r?r[s+0]:0,b.y=r?r[s+1]:0,b.z=r?r[s+2]:1;const i=r?r[s+3]:0;for(let e=0,t=n.length;e<t;e+=2)x.x=n[e+0],x.y=0,x.z=n[e+1],x.multiply(h),m.setFromAxisAngle(b,i),x.applyQuaternion(m),x.add(p),d.push(x.x,x.y,x.z)}const g=[],E=o.length/3,L=n.length/2;for(let e=0;e<E-1;e++)for(let t=0;t<L-1;t++){const r=t+e*L;let n=t+1+e*L;const o=t+(e+1)*L;let a=t+1+(e+1)*L;t===L-2&&!0===f&&(n=e*L,a=(e+1)*L),!0===s?(g.push(r,n,o),g.push(o,n,a)):(g.push(r,o,n),g.push(o,a,n))}if(!0===a||!0===l){const e=[];for(let t=0,r=n.length;t<r;t+=2)e.push(new Vector2(n[t],n[t+1]));const t=ShapeUtils.triangulateShape(e,[]),r=[];for(let e=0,n=t.length;e<n;e++){const n=t[e];r.push(n[0],n[1],n[2])}if(!0===a)for(let e=0,t=r.length;e<t;e+=3)!0===s?g.push(r[e+0],r[e+1],r[e+2]):g.push(r[e+0],r[e+2],r[e+1]);if(!0===l){const e=L*(E-1);for(let t=0,n=r.length;t<n;t+=3)!0===s?g.push(e+r[t+0],e+r[t+2],e+r[t+1]):g.push(e+r[t+0],e+r[t+1],e+r[t+2])}}const w=T(g,new Float32BufferAttribute(d,3)),k=S(g,d,i),y=new BufferGeometry;return y.setAttribute("position",w),y.setAttribute("normal",k),y._solid=c,y._type="mesh",y}(e);break;case"Color":case"Coordinate":case"Normal":case"TextureCoordinate":r=function(e){return e.fields[0].values}(e);break;case"WorldInfo":r=function(e){const t={},r=e.fields;for(let e=0,n=r.length;e<n;e++){const n=r[e],o=n.name,a=n.values;switch(o){case"title":t.title=a[0];break;case"info":t.info=a;break;default:console.warn("THREE.VRMLLoader: Unknown field:",o)}}return t}(e);break;case"Billboard":case"Inline":case"LOD":case"Switch":case"AudioClip":case"DirectionalLight":case"PointLight":case"Script":case"Sound":case"SpotLight":case"CylinderSensor":case"PlaneSensor":case"ProximitySensor":case"SphereSensor":case"TimeSensor":case"TouchSensor":case"VisibilitySensor":case"Text":case"FontStyle":case"MovieTexture":case"ColorInterpolator":case"CoordinateInterpolator":case"NormalInterpolator":case"OrientationInterpolator":case"PositionInterpolator":case"ScalarInterpolator":case"Fog":case"NavigationInfo":case"Viewpoint":break;default:console.warn("THREE.VRMLLoader: Unknown node:",t)}return void 0!==r&&void 0!==e.DEF&&!0===r.hasOwnProperty("name")&&(r.name=e.DEF),r}(e)),e.build)}function a(e,t,r){let n;switch(t){case TEXTURE_TYPE.INTENSITY:n=parseInt(e),r.r=n,r.g=n,r.b=n,r.a=1;break;case TEXTURE_TYPE.INTENSITY_ALPHA:n=parseInt("0x"+e.substring(2,4)),r.r=n,r.g=n,r.b=n,r.a=parseInt("0x"+e.substring(4,6));break;case TEXTURE_TYPE.RGB:r.r=parseInt("0x"+e.substring(2,4)),r.g=parseInt("0x"+e.substring(4,6)),r.b=parseInt("0x"+e.substring(6,8)),r.a=1;break;case TEXTURE_TYPE.RGBA:r.r=parseInt("0x"+e.substring(2,4)),r.g=parseInt("0x"+e.substring(4,6)),r.b=parseInt("0x"+e.substring(6,8)),r.a=parseInt("0x"+e.substring(8,10))}}function s(e){let t;switch(e){case 1:t=TEXTURE_TYPE.INTENSITY;break;case 2:t=TEXTURE_TYPE.INTENSITY_ALPHA;break;case 3:t=TEXTURE_TYPE.RGB;break;case 4:t=TEXTURE_TYPE.RGBA}return t}function i(e,t){for(let r=0,n=e.length;r<n;r++){const n=o(e[r]);n instanceof Object3D&&t.add(n)}}function l(e,t){const r=[];let n=0;for(let o=0,a=e.length;o<a;o++){const s=e[n],i=e[o+(t?1:2)],l=e[o+(t?2:1)];r.push(s,i,l),(-1===e[o+3]||o+3>=a)&&(o+=3,n=o+1)}return r}function c(e,t){const r=[];let n=0;for(let o=0,a=t.length;o<a;o++){const s=3*n,i=e[s],l=e[s+1],c=e[s+2];r.push(i,l,c),(-1===t[o+3]||o+3>=a)&&(o+=3,n++)}return r}function u(e,t){const r=[];for(let n=0,o=t.length;n<o;n++){const o=3*t[n],a=e[o],s=e[o+1],i=e[o+2];r.push(a,s,i)}return r}function f(e){const t=[];for(let r=0,n=e.length;r<n;r++){const o=e[r],a=e[r+1];t.push(o,a),(-1===e[r+2]||r+2>=n)&&(r+=2)}return t}function d(e,t){const r=[];let n=0;for(let o=0,a=t.length;o<a;o++){const s=3*n,i=e[s],l=e[s+1],c=e[s+2];r.push(i,l,c),(-1===t[o+2]||o+2>=a)&&(o+=2,n++)}return r}const p=new Vector3,h=new Vector3,b=new Vector3,x=new Vector2,m=new Vector2,g=new Vector2;function E(e,t,r,n){const o=[];for(let a=0,s=e.length;a<s;a+=3){const e=t[a],s=t[a+1],i=t[a+2];2===n?(x.fromArray(r,e*n),m.fromArray(r,s*n),g.fromArray(r,i*n),o.push(x.x,x.y),o.push(m.x,m.y),o.push(g.x,g.y)):(p.fromArray(r,e*n),h.fromArray(r,s*n),b.fromArray(r,i*n),o.push(p.x,p.y,p.z),o.push(h.x,h.y,h.z),o.push(b.x,b.y,b.z))}return new Float32BufferAttribute(o,n)}function L(e,t){const r=[];for(let n=0,o=0,a=e.length;n<a;n+=3,o++)p.fromArray(t,3*o),r.push(p.x,p.y,p.z),r.push(p.x,p.y,p.z),r.push(p.x,p.y,p.z);return new Float32BufferAttribute(r,3)}function w(e,t){const r=[];for(let n=0,o=0,a=e.length;n<a;n+=2,o++)p.fromArray(t,3*o),r.push(p.x,p.y,p.z),r.push(p.x,p.y,p.z);return new Float32BufferAttribute(r,3)}function T(e,t){const r=t.array,n=t.itemSize,o=new r.constructor(e.length*n);let a=0,s=0;for(let t=0,i=e.length;t<i;t++){a=e[t]*n;for(let e=0;e<n;e++)o[s++]=r[a++]}return new Float32BufferAttribute(o,n)}const k=new Vector3,y=new Vector3;function S(e,t,r){const n=[],o={};for(let r=0,a=e.length;r<a;r+=3){const a=e[r],s=e[r+1],i=e[r+2],l=new Face(a,s,i);p.fromArray(t,3*a),h.fromArray(t,3*s),b.fromArray(t,3*i),y.subVectors(b,h),k.subVectors(p,h),y.cross(k),y.normalize(),l.normal.copy(y),void 0===o[a]&&(o[a]=[]),void 0===o[s]&&(o[s]=[]),void 0===o[i]&&(o[i]=[]),o[a].push(l.normal),o[s].push(l.normal),o[i].push(l.normal),n.push(l)}const a=[];for(let e=0,s=n.length;e<s;e++){const s=n[e],i=R(o[s.a],s.normal,r),l=R(o[s.b],s.normal,r),c=R(o[s.c],s.normal,r);p.fromArray(t,3*s.a),h.fromArray(t,3*s.b),b.fromArray(t,3*s.c),a.push(i.x,i.y,i.z),a.push(l.x,l.y,l.z),a.push(c.x,c.y,c.z)}return new Float32BufferAttribute(a,3)}function R(e,t,r){const n=new Vector3;if(0===r)n.copy(t);else for(let o=0,a=e.length;o<a;o++)e[o].angleTo(t)<r&&n.add(e[o]);return n.normalize()}function A(e){const t=[];for(let r=0,n=e.length;r<n;r+=3)t.push(new Color(e[r],e[r+1],e[r+2]));return t}function U(e,t,r,n,o){const a=[],s=!0===o?0:Math.PI;for(let e=0,i=n.length;e<i;e++){let n=0===e?0:r[e-1];n=!0===o?n:s-n;const i=new Vector3;i.setFromSphericalCoords(t,n,0),a.push(i)}const i=e.index,l=e.attributes.position,c=new BufferAttribute(new Float32Array(3*e.attributes.position.count),3),u=new Vector3,f=new Color;for(let e=0;e<i.count;e++){const t=i.getX(e);let r,s;u.fromBufferAttribute(l,t);let d=1;for(let e=1;e<a.length;e++){r=e-1,s=e;const t=a[r],n=a[s];if(!0===o){if(u.y<=t.y&&u.y>n.y){d=Math.abs(t.y-u.y)/Math.abs(t.y-n.y);break}}else if(u.y>=t.y&&u.y<n.y){d=Math.abs(t.y-u.y)/Math.abs(t.y-n.y);break}}const p=n[r],h=n[s];f.copy(p).lerp(h,d),c.setXYZ(t,f.r,f.g,f.b)}e.setAttribute("color",c)}const M=new TextureLoader(this.manager);if(M.setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin),-1===e.indexOf("#VRML V2.0"))throw Error("THREE.VRMLLexer: Version of VRML asset not supported.");const C=function(e){const t=function(){const e=chevrotain.createToken,t=e({name:"RouteIdentifier",pattern:/[^\x30-\x39\0-\x20\x22\x27\x23\x2b\x2c\x2d\x2e\x5b\x5d\x5c\x7b\x7d][^\0-\x20\x22\x27\x23\x2b\x2c\x2d\x2e\x5b\x5d\x5c\x7b\x7d]*[\.][^\x30-\x39\0-\x20\x22\x27\x23\x2b\x2c\x2d\x2e\x5b\x5d\x5c\x7b\x7d][^\0-\x20\x22\x27\x23\x2b\x2c\x2d\x2e\x5b\x5d\x5c\x7b\x7d]*/}),r=e({name:"Identifier",pattern:/[^\x30-\x39\0-\x20\x22\x27\x23\x2b\x2c\x2d\x2e\x5b\x5d\x5c\x7b\x7d][^\0-\x20\x22\x27\x23\x2b\x2c\x2d\x2e\x5b\x5d\x5c\x7b\x7d]*/,longer_alt:t}),n=e({name:"Version",pattern:/#VRML.*/,longer_alt:r}),o=e({name:"NodeName",pattern:new RegExp(["Anchor","Billboard","Collision","Group","Transform","Inline","LOD","Switch","AudioClip","DirectionalLight","PointLight","Script","Shape","Sound","SpotLight","WorldInfo","CylinderSensor","PlaneSensor","ProximitySensor","SphereSensor","TimeSensor","TouchSensor","VisibilitySensor","Box","Cone","Cylinder","ElevationGrid","Extrusion","IndexedFaceSet","IndexedLineSet","PointSet","Sphere","Color","Coordinate","Normal","TextureCoordinate","Appearance","FontStyle","ImageTexture","Material","MovieTexture","PixelTexture","TextureTransform","ColorInterpolator","CoordinateInterpolator","NormalInterpolator","OrientationInterpolator","PositionInterpolator","ScalarInterpolator","Background","Fog","NavigationInfo","Viewpoint","Text"].join("|")),longer_alt:r}),a=e({name:"DEF",pattern:/DEF/,longer_alt:r}),s=e({name:"USE",pattern:/USE/,longer_alt:r}),i=e({name:"ROUTE",pattern:/ROUTE/,longer_alt:r}),l=e({name:"TO",pattern:/TO/,longer_alt:r}),c=e({name:"StringLiteral",pattern:/"(?:[^\\"\n\r]|\\[bfnrtv"\\/]|\\u[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F])*"/}),u=e({name:"HexLiteral",pattern:/0[xX][0-9a-fA-F]+/}),f=e({name:"NumberLiteral",pattern:/[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/}),d=e({name:"TrueLiteral",pattern:/TRUE/}),p=e({name:"FalseLiteral",pattern:/FALSE/}),h=e({name:"NullLiteral",pattern:/NULL/}),b=e({name:"LSquare",pattern:/\[/}),x=e({name:"RSquare",pattern:/]/}),m=e({name:"LCurly",pattern:/{/}),g=e({name:"RCurly",pattern:/}/}),E=e({name:"Comment",pattern:/#.*/,group:chevrotain.Lexer.SKIPPED}),L=[e({name:"WhiteSpace",pattern:/[ ,\s]/,group:chevrotain.Lexer.SKIPPED}),o,a,s,i,l,d,p,h,n,r,t,c,u,f,b,x,m,g,E],w={};for(let e=0,t=L.length;e<t;e++){const t=L[e];w[t.name]=t}return{tokens:L,tokenVocabulary:w}}(),r=new VRMLLexer(t.tokens),n=new VRMLParser(t.tokenVocabulary),o=function(e){function t(e,t){const r={type:null,values:[]};if(t.node){r.type="node";for(let n=0,o=t.node.length;n<o;n++){const o=t.node[n];r.values.push(e.visit(o))}}if(t.use){r.type="use";for(let n=0,o=t.use.length;n<o;n++){const o=t.use[n];r.values.push(e.visit(o))}}if(t.StringLiteral){r.type="string";for(let e=0,n=t.StringLiteral.length;e<n;e++){const n=t.StringLiteral[e];r.values.push(n.image.replace(/'|"/g,""))}}if(t.NumberLiteral){r.type="number";for(let e=0,n=t.NumberLiteral.length;e<n;e++){const n=t.NumberLiteral[e];r.values.push(parseFloat(n.image))}}if(t.HexLiteral){r.type="hex";for(let e=0,n=t.HexLiteral.length;e<n;e++){const n=t.HexLiteral[e];r.values.push(n.image)}}if(t.TrueLiteral){r.type="boolean";for(let e=0,n=t.TrueLiteral.length;e<n;e++)"TRUE"===t.TrueLiteral[e].image&&r.values.push(!0)}if(t.FalseLiteral){r.type="boolean";for(let e=0,n=t.FalseLiteral.length;e<n;e++)"FALSE"===t.FalseLiteral[e].image&&r.values.push(!1)}return t.NullLiteral&&(r.type="null",t.NullLiteral.forEach((function(){r.values.push(null)}))),r}return new class extends e{constructor(){super(),this.validateVisitor()}vrml(e){const t={version:this.visit(e.version),nodes:[],routes:[]};for(let r=0,n=e.node.length;r<n;r++){const n=e.node[r];t.nodes.push(this.visit(n))}if(e.route)for(let r=0,n=e.route.length;r<n;r++){const n=e.route[r];t.routes.push(this.visit(n))}return t}version(e){return e.Version[0].image}node(e){const t={name:e.NodeName[0].image,fields:[]};if(e.field)for(let r=0,n=e.field.length;r<n;r++){const n=e.field[r];t.fields.push(this.visit(n))}return e.def&&(t.DEF=this.visit(e.def[0])),t}field(e){const t={name:e.Identifier[0].image,type:null,values:null};let r;return e.singleFieldValue&&(r=this.visit(e.singleFieldValue[0])),e.multiFieldValue&&(r=this.visit(e.multiFieldValue[0])),t.type=r.type,t.values=r.values,t}def(e){return(e.Identifier||e.NodeName)[0].image}use(e){return{USE:(e.Identifier||e.NodeName)[0].image}}singleFieldValue(e){return t(this,e)}multiFieldValue(e){return t(this,e)}route(e){return{FROM:e.RouteIdentifier[0].image,TO:e.RouteIdentifier[1].image}}}}(n.getBaseCstVisitorConstructor()),a=r.lex(e);n.input=a.tokens;const s=n.vrml();if(n.errors.length>0)throw console.error(n.errors),Error("THREE.VRMLLoader: Parsing errors detected.");return o.visit(s)}(e),v=function(e){const t=e.nodes,r=new Scene;for(let e=0,r=t.length;e<r;e++)n(t[e]);for(let e=0,n=t.length;e<n;e++){const n=t[e],a=o(n);a instanceof Object3D&&r.add(a),"WorldInfo"===n.name&&(r.userData.worldInfo=a)}return r}(C);return v}}class VRMLLexer{constructor(e){this.lexer=new chevrotain.Lexer(e)}lex(e){const t=this.lexer.tokenize(e);if(t.errors.length>0)throw console.error(t.errors),Error("THREE.VRMLLexer: Lexing errors detected.");return t}}const CstParser=chevrotain.CstParser;class VRMLParser extends CstParser{constructor(e){super(e);const t=this,r=e.Version,n=e.LCurly,o=e.RCurly,a=e.LSquare,s=e.RSquare,i=e.Identifier,l=e.RouteIdentifier,c=e.StringLiteral,u=e.HexLiteral,f=e.NumberLiteral,d=e.TrueLiteral,p=e.FalseLiteral,h=e.NullLiteral,b=e.DEF,x=e.USE,m=e.ROUTE,g=e.TO,E=e.NodeName;t.RULE("vrml",(function(){t.SUBRULE(t.version),t.AT_LEAST_ONE((function(){t.SUBRULE(t.node)})),t.MANY((function(){t.SUBRULE(t.route)}))})),t.RULE("version",(function(){t.CONSUME(r)})),t.RULE("node",(function(){t.OPTION((function(){t.SUBRULE(t.def)})),t.CONSUME(E),t.CONSUME(n),t.MANY((function(){t.SUBRULE(t.field)})),t.CONSUME(o)})),t.RULE("field",(function(){t.CONSUME(i),t.OR2([{ALT:function(){t.SUBRULE(t.singleFieldValue)}},{ALT:function(){t.SUBRULE(t.multiFieldValue)}}])})),t.RULE("def",(function(){t.CONSUME(b),t.OR([{ALT:function(){t.CONSUME(i)}},{ALT:function(){t.CONSUME(E)}}])})),t.RULE("use",(function(){t.CONSUME(x),t.OR([{ALT:function(){t.CONSUME(i)}},{ALT:function(){t.CONSUME(E)}}])})),t.RULE("singleFieldValue",(function(){t.AT_LEAST_ONE((function(){t.OR([{ALT:function(){t.SUBRULE(t.node)}},{ALT:function(){t.SUBRULE(t.use)}},{ALT:function(){t.CONSUME(c)}},{ALT:function(){t.CONSUME(u)}},{ALT:function(){t.CONSUME(f)}},{ALT:function(){t.CONSUME(d)}},{ALT:function(){t.CONSUME(p)}},{ALT:function(){t.CONSUME(h)}}])}))})),t.RULE("multiFieldValue",(function(){t.CONSUME(a),t.MANY((function(){t.OR([{ALT:function(){t.SUBRULE(t.node)}},{ALT:function(){t.SUBRULE(t.use)}},{ALT:function(){t.CONSUME(c)}},{ALT:function(){t.CONSUME(u)}},{ALT:function(){t.CONSUME(f)}},{ALT:function(){t.CONSUME(h)}}])})),t.CONSUME(s)})),t.RULE("route",(function(){t.CONSUME(m),t.CONSUME(l),t.CONSUME(g),t.CONSUME2(l)})),this.performSelfAnalysis()}}class Face{constructor(e,t,r){this.a=e,this.b=t,this.c=r,this.normal=new Vector3}}const TEXTURE_TYPE={INTENSITY:1,INTENSITY_ALPHA:2,RGB:3,RGBA:4};export{VRMLLoader};
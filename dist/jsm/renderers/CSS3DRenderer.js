import{Matrix4,Object3D,Quaternion,Vector3}from"three";const _position=new Vector3,_quaternion=new Quaternion,_scale=new Vector3;class CSS3DObject extends Object3D{constructor(e=document.createElement("div")){super(),this.isCSS3DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",(function(){this.traverse((function(e){e.element instanceof Element&&null!==e.element.parentNode&&e.element.parentNode.removeChild(e.element)}))}))}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this}}class CSS3DSprite extends CSS3DObject{constructor(e){super(e),this.isCSS3DSprite=!0,this.rotation2D=0}copy(e,t){return super.copy(e,t),this.rotation2D=e.rotation2D,this}}const _matrix=new Matrix4,_matrix2=new Matrix4;class CSS3DRenderer{constructor(e={}){const t=this;let r,n,i,s;const o={camera:{fov:0,style:""},objects:new WeakMap},a=void 0!==e.element?e.element:document.createElement("div");a.style.overflow="hidden",this.domElement=a;const l=document.createElement("div");l.style.transformOrigin="0 0",l.style.pointerEvents="none",a.appendChild(l);const c=document.createElement("div");function m(e){return Math.abs(e)<1e-10?0:e}function d(e){const t=e.elements;return"matrix3d("+m(t[0])+","+m(-t[1])+","+m(t[2])+","+m(t[3])+","+m(t[4])+","+m(-t[5])+","+m(t[6])+","+m(t[7])+","+m(t[8])+","+m(-t[9])+","+m(t[10])+","+m(t[11])+","+m(t[12])+","+m(-t[13])+","+m(t[14])+","+m(t[15])+")"}function p(e){const t=e.elements;return"translate(-50%,-50%)matrix3d("+m(t[0])+","+m(t[1])+","+m(t[2])+","+m(t[3])+","+m(-t[4])+","+m(-t[5])+","+m(-t[6])+","+m(-t[7])+","+m(t[8])+","+m(t[9])+","+m(t[10])+","+m(t[11])+","+m(t[12])+","+m(t[13])+","+m(t[14])+","+m(t[15])+")"}function h(e,r,n,i){if(e.isCSS3DObject){const i=!0===e.visible&&!0===e.layers.test(n.layers);if(e.element.style.display=!0===i?"":"none",!0===i){let i;e.onBeforeRender(t,r,n),e.isCSS3DSprite?(_matrix.copy(n.matrixWorldInverse),_matrix.transpose(),0!==e.rotation2D&&_matrix.multiply(_matrix2.makeRotationZ(e.rotation2D)),e.matrixWorld.decompose(_position,_quaternion,_scale),_matrix.setPosition(_position),_matrix.scale(_scale),_matrix.elements[3]=0,_matrix.elements[7]=0,_matrix.elements[11]=0,_matrix.elements[15]=1,i=p(_matrix)):i=p(e.matrixWorld);const s=e.element,a=o.objects.get(e);if(void 0===a||a.style!==i){s.style.transform=i;const t={style:i};o.objects.set(e,t)}s.parentNode!==c&&c.appendChild(s),e.onAfterRender(t,r,n)}}for(let t=0,s=e.children.length;t<s;t++)h(e.children[t],r,n,i)}c.style.transformStyle="preserve-3d",l.appendChild(c),this.getSize=function(){return{width:r,height:n}},this.render=function(e,t){const a=t.projectionMatrix.elements[5]*s;let p,x;o.camera.fov!==a&&(l.style.perspective=t.isPerspectiveCamera?a+"px":"",o.camera.fov=a),t.view&&t.view.enabled?(l.style.transform=`translate( ${-t.view.offsetX*(r/t.view.width)}px, ${-t.view.offsetY*(n/t.view.height)}px )`,l.style.transform+=`scale( ${t.view.fullWidth/t.view.width}, ${t.view.fullHeight/t.view.height} )`):l.style.transform="",!0===e.matrixWorldAutoUpdate&&e.updateMatrixWorld(),null===t.parent&&!0===t.matrixWorldAutoUpdate&&t.updateMatrixWorld(),t.isOrthographicCamera&&(p=-(t.right+t.left)/2,x=(t.top+t.bottom)/2);const u=t.view&&t.view.enabled?t.view.height/t.view.fullHeight:1,v=t.isOrthographicCamera?`scale( ${u} )scale(`+a+")translate("+m(p)+"px,"+m(x)+"px)"+d(t.matrixWorldInverse):`scale( ${u} )translateZ(`+a+"px)"+d(t.matrixWorldInverse),f=v+"translate("+i+"px,"+s+"px)";o.camera.style!==f&&(c.style.transform=f,o.camera.style=f),h(e,e,t,v)},this.setSize=function(e,t){r=e,n=t,i=r/2,s=n/2,a.style.width=e+"px",a.style.height=t+"px",l.style.width=e+"px",l.style.height=t+"px",c.style.width=e+"px",c.style.height=t+"px"}}}export{CSS3DObject,CSS3DSprite,CSS3DRenderer};
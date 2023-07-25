import{FileLoader,Loader,CanvasTexture,NearestFilter,SRGBColorSpace}from"three";import lottie from"../libs/lottie_canvas.module.js";class LottieLoader extends Loader{setQuality(e){this._quality=e}load(e,t,a,i){const o=this._quality||1,n=new CanvasTexture;n.minFilter=NearestFilter,n.colorSpace=SRGBColorSpace;const r=new FileLoader(this.manager);return r.setPath(this.path),r.setWithCredentials(this.withCredentials),r.load(e,(function(e){const a=JSON.parse(e),i=document.createElement("div");i.style.width=a.w+"px",i.style.height=a.h+"px",document.body.appendChild(i);const r=lottie.loadAnimation({container:i,animType:"canvas",loop:!0,autoplay:!0,animationData:a,rendererSettings:{dpr:o}});n.animation=r,n.image=r.container,r.addEventListener("enterFrame",(function(){n.needsUpdate=!0})),i.style.display="none",void 0!==t&&t(n)}),a,i),n}}export{LottieLoader};
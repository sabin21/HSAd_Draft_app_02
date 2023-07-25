import{Box2,BufferGeometry,FileLoader,Float32BufferAttribute,Loader,Matrix3,Path,Shape,ShapePath,ShapeUtils,SRGBColorSpace,Vector2,Vector3}from"three";const COLOR_SPACE_SVG=SRGBColorSpace;class SVGLoader extends Loader{constructor(t){super(t),this.defaultDPI=90,this.defaultUnit="px"}load(t,e,n,r){const o=this,i=new FileLoader(o.manager);i.setPath(o.path),i.setRequestHeader(o.requestHeader),i.setWithCredentials(o.withCredentials),i.load(t,(function(n){try{e(o.parse(n))}catch(e){r?r(e):console.error(e),o.manager.itemError(t)}}),n,r)}parse(t){const e=this;function n(t,e,n,o,i,s,a,c){if(0==e||0==n)return void t.lineTo(c.x,c.y);o=o*Math.PI/180,e=Math.abs(e),n=Math.abs(n);const l=(a.x-c.x)/2,u=(a.y-c.y)/2,y=Math.cos(o)*l+Math.sin(o)*u,h=-Math.sin(o)*l+Math.cos(o)*u;let f=e*e,p=n*n;const d=y*y,x=h*h,b=d/f+x/p;if(b>1){const t=Math.sqrt(b);f=(e*=t)*e,p=(n*=t)*n}const g=f*x+p*d,m=(f*p-g)/g;let A=Math.sqrt(Math.max(0,m));i===s&&(A=-A);const w=A*e*h/n,M=-A*n*y/e,k=Math.cos(o)*w-Math.sin(o)*M+(a.x+c.x)/2,v=Math.sin(o)*w+Math.cos(o)*M+(a.y+c.y)/2,S=r(1,0,(y-w)/e,(h-M)/n),P=r((y-w)/e,(h-M)/n,(-y-w)/e,(-h-M)/n)%(2*Math.PI);t.currentPath.absellipse(k,v,e,n,S,S+P,0===s,o)}function r(t,e,n,r){const o=t*n+e*r,i=Math.sqrt(t*t+e*e)*Math.sqrt(n*n+r*r);let s=Math.acos(Math.max(-1,Math.min(1,o/i)));return t*r-e*n<0&&(s=-s),s}function o(t,e){e=Object.assign({},e);let n={};if(t.hasAttribute("class")){const e=t.getAttribute("class").split(/\s/).filter(Boolean).map((t=>t.trim()));for(let t=0;t<e.length;t++)n=Object.assign(n,d["."+e[t]])}function r(r,o,i){void 0===i&&(i=function(t){return t.startsWith("url")&&console.warn("SVGLoader: url access in attributes is not implemented."),t}),t.hasAttribute(r)&&(e[o]=i(t.getAttribute(r))),n[r]&&(e[o]=i(n[r])),t.style&&""!==t.style[r]&&(e[o]=i(t.style[r]))}function o(t){return Math.max(0,Math.min(1,l(t)))}function i(t){return Math.max(0,l(t))}return t.hasAttribute("id")&&(n=Object.assign(n,d["#"+t.getAttribute("id")])),r("fill","fill"),r("fill-opacity","fillOpacity",o),r("fill-rule","fillRule"),r("opacity","opacity",o),r("stroke","stroke"),r("stroke-opacity","strokeOpacity",o),r("stroke-width","strokeWidth",i),r("stroke-linejoin","strokeLineJoin"),r("stroke-linecap","strokeLineCap"),r("stroke-miterlimit","strokeMiterLimit",i),r("visibility","visibility"),e}function i(t,e){return t-(e-t)}function s(t,e,n){if("string"!=typeof t)throw new TypeError("Invalid input: "+typeof t);const r={SEPARATOR:/[ \t\r\n\,.\-+]/,WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/};let o=0,i=!0,s="",a="";const c=[];function l(t,e,n){const r=new SyntaxError('Unexpected character "'+t+'" at index '+e+".");throw r.partial=n,r}function u(){""!==s&&(""===a?c.push(Number(s)):c.push(Number(s)*Math.pow(10,Number(a)))),s="",a=""}let y;const h=t.length;for(let f=0;f<h;f++)if(y=t[f],Array.isArray(e)&&e.includes(c.length%n)&&r.FLAGS.test(y))o=1,s=y,u();else{if(0===o){if(r.WHITESPACE.test(y))continue;if(r.DIGIT.test(y)||r.SIGN.test(y)){o=1,s=y;continue}if(r.POINT.test(y)){o=2,s=y;continue}r.COMMA.test(y)&&(i&&l(y,f,c),i=!0)}if(1===o){if(r.DIGIT.test(y)){s+=y;continue}if(r.POINT.test(y)){s+=y,o=2;continue}if(r.EXP.test(y)){o=3;continue}r.SIGN.test(y)&&1===s.length&&r.SIGN.test(s[0])&&l(y,f,c)}if(2===o){if(r.DIGIT.test(y)){s+=y;continue}if(r.EXP.test(y)){o=3;continue}r.POINT.test(y)&&"."===s[s.length-1]&&l(y,f,c)}if(3===o){if(r.DIGIT.test(y)){a+=y;continue}if(r.SIGN.test(y)){if(""===a){a+=y;continue}1===a.length&&r.SIGN.test(a)&&l(y,f,c)}}r.WHITESPACE.test(y)?(u(),o=0,i=!1):r.COMMA.test(y)?(u(),o=0,i=!0):r.SIGN.test(y)?(u(),o=1,s=y):r.POINT.test(y)?(u(),o=2,s=y):l(y,f,c)}return u(),c}const a=["mm","cm","in","pt","pc","px"],c={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:12,pc:1,px:-1},px:{px:1}};function l(t){let n,r="px";if("string"==typeof t||t instanceof String)for(let e=0,n=a.length;e<n;e++){const n=a[e];if(t.endsWith(n)){r=n,t=t.substring(0,t.length-n.length);break}}return"px"===r&&"px"!==e.defaultUnit?n=c.in[e.defaultUnit]/e.defaultDPI:(n=c[r][e.defaultUnit],n<0&&(n=c[r].in*e.defaultDPI)),n*parseFloat(t)}function u(t){const e=t.elements;return e[0]*e[4]-e[1]*e[3]<0}function y(t){const e=t.elements,n=e[0]*e[3]+e[1]*e[4];if(0===n)return!1;const r=h(t),o=f(t);return Math.abs(n/(r*o))>Number.EPSILON}function h(t){const e=t.elements;return Math.sqrt(e[0]*e[0]+e[1]*e[1])}function f(t){const e=t.elements;return Math.sqrt(e[3]*e[3]+e[4]*e[4])}const p=[],d={},x=[],b=new Matrix3,g=new Matrix3,m=new Matrix3,A=new Matrix3,w=new Vector2,M=new Vector3,k=new Matrix3,v=(new DOMParser).parseFromString(t,"image/svg+xml");return function t(e,r){if(1!==e.nodeType)return;const a=function(t){if(!(t.hasAttribute("transform")||"use"===t.nodeName&&(t.hasAttribute("x")||t.hasAttribute("y"))))return null;const e=function(t){const e=new Matrix3,n=b;if("use"===t.nodeName&&(t.hasAttribute("x")||t.hasAttribute("y"))){const n=l(t.getAttribute("x")),r=l(t.getAttribute("y"));e.translate(n,r)}if(t.hasAttribute("transform")){const r=t.getAttribute("transform").split(")");for(let t=r.length-1;t>=0;t--){const o=r[t].trim();if(""===o)continue;const i=o.indexOf("("),a=o.length;if(i>0&&i<a){const t=o.slice(0,i),e=s(o.slice(i+1));switch(n.identity(),t){case"translate":if(e.length>=1){const t=e[0];let r=0;e.length>=2&&(r=e[1]),n.translate(t,r)}break;case"rotate":if(e.length>=1){let t=0,r=0,o=0;t=e[0]*Math.PI/180,e.length>=3&&(r=e[1],o=e[2]),g.makeTranslation(-r,-o),m.makeRotation(t),A.multiplyMatrices(m,g),g.makeTranslation(r,o),n.multiplyMatrices(g,A)}break;case"scale":if(e.length>=1){const t=e[0];let r=t;e.length>=2&&(r=e[1]),n.scale(t,r)}break;case"skewX":1===e.length&&n.set(1,Math.tan(e[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":1===e.length&&n.set(1,0,0,Math.tan(e[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":6===e.length&&n.set(e[0],e[2],e[4],e[1],e[3],e[5],0,0,1)}}e.premultiply(n)}}return e}(t);return x.length>0&&e.premultiply(x[x.length-1]),k.copy(e),x.push(e),e}(e);let c=!1,v=null;switch(e.nodeName){case"svg":case"g":r=o(e,r);break;case"style":!function(t){if(t.sheet&&t.sheet.cssRules&&t.sheet.cssRules.length)for(let e=0;e<t.sheet.cssRules.length;e++){const n=t.sheet.cssRules[e];if(1!==n.type)continue;const r=n.selectorText.split(/,/gm).filter(Boolean).map((t=>t.trim()));for(let t=0;t<r.length;t++){const e=Object.fromEntries(Object.entries(n.style).filter((([,t])=>""!==t)));d[r[t]]=Object.assign(d[r[t]]||{},e)}}}(e);break;case"path":r=o(e,r),e.hasAttribute("d")&&(v=function(t){const e=new ShapePath,r=new Vector2,o=new Vector2,a=new Vector2;let c=!0,l=!1;const u=t.getAttribute("d");if(""===u||"none"===u)return null;const y=u.match(/[a-df-z][^a-df-z]*/gi);for(let t=0,u=y.length;t<u;t++){const u=y[t],h=u.charAt(0),f=u.slice(1).trim();let p;switch(!0===c&&(l=!0,c=!1),h){case"M":p=s(f);for(let t=0,n=p.length;t<n;t+=2)r.x=p[t+0],r.y=p[t+1],o.x=r.x,o.y=r.y,0===t?e.moveTo(r.x,r.y):e.lineTo(r.x,r.y),0===t&&a.copy(r);break;case"H":p=s(f);for(let t=0,n=p.length;t<n;t++)r.x=p[t],o.x=r.x,o.y=r.y,e.lineTo(r.x,r.y),0===t&&!0===l&&a.copy(r);break;case"V":p=s(f);for(let t=0,n=p.length;t<n;t++)r.y=p[t],o.x=r.x,o.y=r.y,e.lineTo(r.x,r.y),0===t&&!0===l&&a.copy(r);break;case"L":p=s(f);for(let t=0,n=p.length;t<n;t+=2)r.x=p[t+0],r.y=p[t+1],o.x=r.x,o.y=r.y,e.lineTo(r.x,r.y),0===t&&!0===l&&a.copy(r);break;case"C":p=s(f);for(let t=0,n=p.length;t<n;t+=6)e.bezierCurveTo(p[t+0],p[t+1],p[t+2],p[t+3],p[t+4],p[t+5]),o.x=p[t+2],o.y=p[t+3],r.x=p[t+4],r.y=p[t+5],0===t&&!0===l&&a.copy(r);break;case"S":p=s(f);for(let t=0,n=p.length;t<n;t+=4)e.bezierCurveTo(i(r.x,o.x),i(r.y,o.y),p[t+0],p[t+1],p[t+2],p[t+3]),o.x=p[t+0],o.y=p[t+1],r.x=p[t+2],r.y=p[t+3],0===t&&!0===l&&a.copy(r);break;case"Q":p=s(f);for(let t=0,n=p.length;t<n;t+=4)e.quadraticCurveTo(p[t+0],p[t+1],p[t+2],p[t+3]),o.x=p[t+0],o.y=p[t+1],r.x=p[t+2],r.y=p[t+3],0===t&&!0===l&&a.copy(r);break;case"T":p=s(f);for(let t=0,n=p.length;t<n;t+=2){const n=i(r.x,o.x),s=i(r.y,o.y);e.quadraticCurveTo(n,s,p[t+0],p[t+1]),o.x=n,o.y=s,r.x=p[t+0],r.y=p[t+1],0===t&&!0===l&&a.copy(r)}break;case"A":p=s(f,[3,4],7);for(let t=0,i=p.length;t<i;t+=7){if(p[t+5]==r.x&&p[t+6]==r.y)continue;const i=r.clone();r.x=p[t+5],r.y=p[t+6],o.x=r.x,o.y=r.y,n(e,p[t],p[t+1],p[t+2],p[t+3],p[t+4],i,r),0===t&&!0===l&&a.copy(r)}break;case"m":p=s(f);for(let t=0,n=p.length;t<n;t+=2)r.x+=p[t+0],r.y+=p[t+1],o.x=r.x,o.y=r.y,0===t?e.moveTo(r.x,r.y):e.lineTo(r.x,r.y),0===t&&a.copy(r);break;case"h":p=s(f);for(let t=0,n=p.length;t<n;t++)r.x+=p[t],o.x=r.x,o.y=r.y,e.lineTo(r.x,r.y),0===t&&!0===l&&a.copy(r);break;case"v":p=s(f);for(let t=0,n=p.length;t<n;t++)r.y+=p[t],o.x=r.x,o.y=r.y,e.lineTo(r.x,r.y),0===t&&!0===l&&a.copy(r);break;case"l":p=s(f);for(let t=0,n=p.length;t<n;t+=2)r.x+=p[t+0],r.y+=p[t+1],o.x=r.x,o.y=r.y,e.lineTo(r.x,r.y),0===t&&!0===l&&a.copy(r);break;case"c":p=s(f);for(let t=0,n=p.length;t<n;t+=6)e.bezierCurveTo(r.x+p[t+0],r.y+p[t+1],r.x+p[t+2],r.y+p[t+3],r.x+p[t+4],r.y+p[t+5]),o.x=r.x+p[t+2],o.y=r.y+p[t+3],r.x+=p[t+4],r.y+=p[t+5],0===t&&!0===l&&a.copy(r);break;case"s":p=s(f);for(let t=0,n=p.length;t<n;t+=4)e.bezierCurveTo(i(r.x,o.x),i(r.y,o.y),r.x+p[t+0],r.y+p[t+1],r.x+p[t+2],r.y+p[t+3]),o.x=r.x+p[t+0],o.y=r.y+p[t+1],r.x+=p[t+2],r.y+=p[t+3],0===t&&!0===l&&a.copy(r);break;case"q":p=s(f);for(let t=0,n=p.length;t<n;t+=4)e.quadraticCurveTo(r.x+p[t+0],r.y+p[t+1],r.x+p[t+2],r.y+p[t+3]),o.x=r.x+p[t+0],o.y=r.y+p[t+1],r.x+=p[t+2],r.y+=p[t+3],0===t&&!0===l&&a.copy(r);break;case"t":p=s(f);for(let t=0,n=p.length;t<n;t+=2){const n=i(r.x,o.x),s=i(r.y,o.y);e.quadraticCurveTo(n,s,r.x+p[t+0],r.y+p[t+1]),o.x=n,o.y=s,r.x=r.x+p[t+0],r.y=r.y+p[t+1],0===t&&!0===l&&a.copy(r)}break;case"a":p=s(f,[3,4],7);for(let t=0,i=p.length;t<i;t+=7){if(0==p[t+5]&&0==p[t+6])continue;const i=r.clone();r.x+=p[t+5],r.y+=p[t+6],o.x=r.x,o.y=r.y,n(e,p[t],p[t+1],p[t+2],p[t+3],p[t+4],i,r),0===t&&!0===l&&a.copy(r)}break;case"Z":case"z":e.currentPath.autoClose=!0,e.currentPath.curves.length>0&&(r.copy(a),e.currentPath.currentPoint.copy(r),c=!0);break;default:console.warn(u)}l=!1}return e}(e));break;case"rect":r=o(e,r),v=function(t){const e=l(t.getAttribute("x")||0),n=l(t.getAttribute("y")||0),r=l(t.getAttribute("rx")||t.getAttribute("ry")||0),o=l(t.getAttribute("ry")||t.getAttribute("rx")||0),i=l(t.getAttribute("width")),s=l(t.getAttribute("height")),a=.448084975506,c=new ShapePath;return c.moveTo(e+r,n),c.lineTo(e+i-r,n),(0!==r||0!==o)&&c.bezierCurveTo(e+i-r*a,n,e+i,n+o*a,e+i,n+o),c.lineTo(e+i,n+s-o),(0!==r||0!==o)&&c.bezierCurveTo(e+i,n+s-o*a,e+i-r*a,n+s,e+i-r,n+s),c.lineTo(e+r,n+s),(0!==r||0!==o)&&c.bezierCurveTo(e+r*a,n+s,e,n+s-o*a,e,n+s-o),c.lineTo(e,n+o),(0!==r||0!==o)&&c.bezierCurveTo(e,n+o*a,e+r*a,n,e+r,n),c}(e);break;case"polygon":r=o(e,r),v=function(t){const e=new ShapePath;let n=0;return t.getAttribute("points").replace(/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,(function(t,r,o){const i=l(r),s=l(o);0===n?e.moveTo(i,s):e.lineTo(i,s),n++})),e.currentPath.autoClose=!0,e}(e);break;case"polyline":r=o(e,r),v=function(t){const e=new ShapePath;let n=0;return t.getAttribute("points").replace(/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,(function(t,r,o){const i=l(r),s=l(o);0===n?e.moveTo(i,s):e.lineTo(i,s),n++})),e.currentPath.autoClose=!1,e}(e);break;case"circle":r=o(e,r),v=function(t){const e=l(t.getAttribute("cx")||0),n=l(t.getAttribute("cy")||0),r=l(t.getAttribute("r")||0),o=new Path;o.absarc(e,n,r,0,2*Math.PI);const i=new ShapePath;return i.subPaths.push(o),i}(e);break;case"ellipse":r=o(e,r),v=function(t){const e=l(t.getAttribute("cx")||0),n=l(t.getAttribute("cy")||0),r=l(t.getAttribute("rx")||0),o=l(t.getAttribute("ry")||0),i=new Path;i.absellipse(e,n,r,o,0,2*Math.PI);const s=new ShapePath;return s.subPaths.push(i),s}(e);break;case"line":r=o(e,r),v=function(t){const e=l(t.getAttribute("x1")||0),n=l(t.getAttribute("y1")||0),r=l(t.getAttribute("x2")||0),o=l(t.getAttribute("y2")||0),i=new ShapePath;return i.moveTo(e,n),i.lineTo(r,o),i.currentPath.autoClose=!1,i}(e);break;case"defs":c=!0;break;case"use":r=o(e,r);const a=(e.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),u=e.viewportElement.getElementById(a);u?t(u,r):console.warn("SVGLoader: 'use node' references non-existent node id: "+a)}v&&(void 0!==r.fill&&"none"!==r.fill&&v.color.setStyle(r.fill,COLOR_SPACE_SVG),function(t,e){function n(t){M.set(t.x,t.y,1).applyMatrix3(e),t.set(M.x,M.y)}function r(t){const n=t.xRadius,r=t.yRadius,o=Math.cos(t.aRotation),i=Math.sin(t.aRotation),s=new Vector3(n*o,n*i,0),a=new Vector3(-r*i,r*o,0),c=s.applyMatrix3(e),l=a.applyMatrix3(e),y=b.set(c.x,l.x,0,c.y,l.y,0,0,0,1),h=g.copy(y).invert(),f=m.copy(h).transpose().multiply(h).elements,p=function(t,e,n){let r,o,i,s,a;const c=t+n,l=t-n,u=Math.sqrt(l*l+4*e*e);return c>0?(r=.5*(c+u),a=1/r,o=t*a*n-e*a*e):c<0?o=.5*(c-u):(r=.5*u,o=-.5*u),i=l>0?l+u:l-u,Math.abs(i)>2*Math.abs(e)?(a=-2*e/i,s=1/Math.sqrt(1+a*a),i=a*s):0===Math.abs(e)?(i=1,s=0):(a=-.5*i/e,i=1/Math.sqrt(1+a*a),s=a*i),l>0&&(a=i,i=-s,s=a),{rt1:r,rt2:o,cs:i,sn:s}}(f[0],f[1],f[4]),d=Math.sqrt(p.rt1),x=Math.sqrt(p.rt2);if(t.xRadius=1/d,t.yRadius=1/x,t.aRotation=Math.atan2(p.sn,p.cs),!((t.aEndAngle-t.aStartAngle)%(2*Math.PI)<Number.EPSILON)){const n=g.set(d,0,0,0,x,0,0,0,1),r=m.set(p.cs,p.sn,0,-p.sn,p.cs,0,0,0,1),o=n.multiply(r).multiply(y),i=t=>{const{x:e,y:n}=new Vector3(Math.cos(t),Math.sin(t),0).applyMatrix3(o);return Math.atan2(n,e)};t.aStartAngle=i(t.aStartAngle),t.aEndAngle=i(t.aEndAngle),u(e)&&(t.aClockwise=!t.aClockwise)}}function o(t){const n=h(e),r=f(e);t.xRadius*=n,t.yRadius*=r;const o=n>Number.EPSILON?Math.atan2(e.elements[1],e.elements[0]):Math.atan2(-e.elements[3],e.elements[4]);t.aRotation+=o,u(e)&&(t.aStartAngle*=-1,t.aEndAngle*=-1,t.aClockwise=!t.aClockwise)}const i=t.subPaths;for(let t=0,s=i.length;t<s;t++){const s=i[t].curves;for(let t=0;t<s.length;t++){const i=s[t];i.isLineCurve?(n(i.v1),n(i.v2)):i.isCubicBezierCurve?(n(i.v0),n(i.v1),n(i.v2),n(i.v3)):i.isQuadraticBezierCurve?(n(i.v0),n(i.v1),n(i.v2)):i.isEllipseCurve&&(w.set(i.aX,i.aY),n(w),i.aX=w.x,i.aY=w.y,y(e)?r(i):o(i))}}}(v,k),p.push(v),v.userData={node:e,style:r});const S=e.childNodes;for(let e=0;e<S.length;e++){const n=S[e];c&&"style"!==n.nodeName&&"defs"!==n.nodeName||t(n,r)}a&&(x.pop(),x.length>0?k.copy(x[x.length-1]):k.identity())}(v.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:p,xml:v.documentElement}}static createShapes(t){const e=999999999,n={loc:0,t:0};function r(t,e,r,i){const s=t.x,a=e.x,c=r.x,l=i.x,u=t.y,y=e.y,h=r.y,f=i.y,p=(l-c)*(u-h)-(f-h)*(s-c),d=(f-h)*(a-s)-(l-c)*(y-u),x=p/d,b=((a-s)*(u-h)-(y-u)*(s-c))/d;if(0===d&&0!==p||x<=0||x>=1||b<0||b>1)return null;if(0===p&&0===d){for(let c=0;c<2;c++){if(o(0===c?r:i,t,e),0==n.loc){const t=0===c?r:i;return{x:t.x,y:t.y,t:n.t}}if(2==n.loc)return{x:+(s+n.t*(a-s)).toPrecision(10),y:+(u+n.t*(y-u)).toPrecision(10),t:n.t}}return null}for(let s=0;s<2;s++)if(o(0===s?r:i,t,e),0==n.loc){const t=0===s?r:i;return{x:t.x,y:t.y,t:n.t}}return{x:+(s+x*(a-s)).toPrecision(10),y:+(u+x*(y-u)).toPrecision(10),t:x}}function o(t,e,r){const o=r.x-e.x,i=r.y-e.y,s=t.x-e.x,a=t.y-e.y,c=o*a-s*i;if(t.x===e.x&&t.y===e.y)return n.loc=0,void(n.t=0);if(t.x===r.x&&t.y===r.y)return n.loc=1,void(n.t=1);if(c<-Number.EPSILON)return void(n.loc=3);if(c>Number.EPSILON)return void(n.loc=4);if(o*s<0||i*a<0)return void(n.loc=5);if(Math.sqrt(o*o+i*i)<Math.sqrt(s*s+a*a))return void(n.loc=6);let l;l=0!==o?s/o:a/i,n.loc=2,n.t=l}let i=e,s=-999999999,a=t.subPaths.map((t=>{const n=t.getPoints();let r=-999999999,o=e,a=-999999999,c=e;for(let t=0;t<n.length;t++){const e=n[t];e.y>r&&(r=e.y),e.y<o&&(o=e.y),e.x>a&&(a=e.x),e.x<c&&(c=e.x)}return s<=a&&(s=a+1),i>=c&&(i=c-1),{curves:t.curves,points:n,isCW:ShapeUtils.isClockWise(n),identifier:-1,boundingBox:new Box2(new Vector2(c,o),new Vector2(a,r))}}));a=a.filter((t=>t.points.length>1));for(let t=0;t<a.length;t++)a[t].identifier=t;const c=a.map((e=>function(t,e,n,o,i){null!=i&&""!==i||(i="nonzero");const s=new Vector2;t.boundingBox.getCenter(s);const a=function(t,e,n){const o=new Vector2;e.getCenter(o);const i=[];return n.forEach((e=>{e.boundingBox.containsPoint(o)&&function(t,e){const n=[],o=[];for(let i=1;i<t.length;i++){const s=t[i-1],a=t[i];for(let t=1;t<e.length;t++){const i=r(s,a,e[t-1],e[t]);null!==i&&void 0===n.find((t=>t.t<=i.t+Number.EPSILON&&t.t>=i.t-Number.EPSILON))&&(n.push(i),o.push(new Vector2(i.x,i.y)))}}return o}(t,e.points).forEach((t=>{i.push({identifier:e.identifier,isCW:e.isCW,point:t})}))})),i.sort(((t,e)=>t.point.x-e.point.x)),i}([new Vector2(n,s.y),new Vector2(o,s.y)],t.boundingBox,e);a.sort(((t,e)=>t.point.x-e.point.x));const c=[],l=[];a.forEach((e=>{e.identifier===t.identifier?c.push(e):l.push(e)}));const u=c[0].point.x,y=[];let h=0;for(;h<l.length&&l[h].point.x<u;)y.length>0&&y[y.length-1]===l[h].identifier?y.pop():y.push(l[h].identifier),h++;if(y.push(t.identifier),"evenodd"===i){const e=y.length%2==0,n=y[y.length-2];return{identifier:t.identifier,isHole:e,for:n}}if("nonzero"===i){let n=!0,r=null,o=null;for(let t=0;t<y.length;t++){const i=y[t];n?(o=e[i].isCW,n=!1,r=i):o!==e[i].isCW&&(o=e[i].isCW,n=!0)}return{identifier:t.identifier,isHole:n,for:r}}console.warn('fill-rule: "'+i+'" is currently not implemented.')}(e,a,i,s,t.userData?t.userData.style.fillRule:void 0))),l=[];return a.forEach((t=>{if(!c[t.identifier].isHole){const e=new Shape;e.curves=t.curves,c.filter((e=>e.isHole&&e.for===t.identifier)).forEach((t=>{const n=a[t.identifier],r=new Path;r.curves=n.curves,e.holes.push(r)})),l.push(e)}})),l}static getStrokeStyle(t,e,n,r,o){return{strokeColor:e=void 0!==e?e:"#000",strokeWidth:t=void 0!==t?t:1,strokeLineJoin:n=void 0!==n?n:"miter",strokeLineCap:r=void 0!==r?r:"butt",strokeMiterLimit:o=void 0!==o?o:4}}static pointsToStroke(t,e,n,r){const o=[],i=[],s=[];if(0===SVGLoader.pointsToStrokeWithBuffers(t,e,n,r,o,i,s))return null;const a=new BufferGeometry;return a.setAttribute("position",new Float32BufferAttribute(o,3)),a.setAttribute("normal",new Float32BufferAttribute(i,3)),a.setAttribute("uv",new Float32BufferAttribute(s,2)),a}static pointsToStrokeWithBuffers(t,e,n,r,o,i,s,a){const c=new Vector2,l=new Vector2,u=new Vector2,y=new Vector2,h=new Vector2,f=new Vector2,p=new Vector2,d=new Vector2,x=new Vector2,b=new Vector2,g=new Vector2,m=new Vector2,A=new Vector2,w=new Vector2,M=new Vector2,k=new Vector2,v=new Vector2;n=void 0!==n?n:12,r=void 0!==r?r:.001,a=void 0!==a?a:0;const S=(t=function(t){let e=!1;for(let n=1,o=t.length-1;n<o;n++)if(t[n].distanceTo(t[n+1])<r){e=!0;break}if(!e)return t;const n=[];n.push(t[0]);for(let e=1,o=t.length-1;e<o;e++)t[e].distanceTo(t[e+1])>=r&&n.push(t[e]);return n.push(t[t.length-1]),n}(t)).length;if(S<2)return 0;const P=t[0].equals(t[S-1]);let T,V,C=t[0];const I=e.strokeWidth/2,E=1/(S-1);let N,L,O,G,R=0,q=!1,B=0,z=3*a,W=2*a;D(t[0],t[1],c).multiplyScalar(I),d.copy(t[0]).sub(c),x.copy(t[0]).add(c),b.copy(d),g.copy(x);for(let n=1;n<S;n++){T=t[n],V=n===S-1?P?t[1]:void 0:t[n+1];const r=c;if(D(C,T,r),u.copy(r).multiplyScalar(I),m.copy(T).sub(u),A.copy(T).add(u),N=R+E,L=!1,void 0!==V){D(T,V,l),u.copy(l).multiplyScalar(I),w.copy(T).sub(u),M.copy(T).add(u),O=!0,u.subVectors(V,C),r.dot(u)<0&&(O=!1),1===n&&(q=O),u.subVectors(V,T),u.normalize();const t=Math.abs(r.dot(u));if(t>Number.EPSILON){const n=I/t;u.multiplyScalar(-n),y.subVectors(T,C),h.copy(y).setLength(n).add(u),k.copy(h).negate();const r=h.length(),o=y.length();y.divideScalar(o),f.subVectors(V,T);const i=f.length();switch(f.divideScalar(i),y.dot(k)<o&&f.dot(k)<i&&(L=!0),v.copy(h).add(T),k.add(T),G=!1,L?O?(M.copy(k),A.copy(k)):(w.copy(k),m.copy(k)):j(),e.strokeLineJoin){case"bevel":U(O,L,N);break;case"round":X(O,L),O?H(T,m,w,N,0):H(T,M,A,N,1);break;default:const t=I*e.strokeMiterLimit/r;if(t<1){if("miter-clip"!==e.strokeLineJoin){U(O,L,N);break}X(O,L),O?(f.subVectors(v,m).multiplyScalar(t).add(m),p.subVectors(v,w).multiplyScalar(t).add(w),F(m,N,0),F(f,N,0),F(T,N,.5),F(T,N,.5),F(f,N,0),F(p,N,0),F(T,N,.5),F(p,N,0),F(w,N,0)):(f.subVectors(v,A).multiplyScalar(t).add(A),p.subVectors(v,M).multiplyScalar(t).add(M),F(A,N,1),F(f,N,1),F(T,N,.5),F(T,N,.5),F(f,N,1),F(p,N,1),F(T,N,.5),F(p,N,1),F(M,N,1))}else L?(O?(F(x,R,1),F(d,R,0),F(v,N,0),F(x,R,1),F(v,N,0),F(k,N,1)):(F(x,R,1),F(d,R,0),F(v,N,1),F(d,R,0),F(k,N,0),F(v,N,1)),O?w.copy(v):M.copy(v)):O?(F(m,N,0),F(v,N,0),F(T,N,.5),F(T,N,.5),F(v,N,0),F(w,N,0)):(F(A,N,1),F(v,N,1),F(T,N,.5),F(T,N,.5),F(v,N,1),F(M,N,1)),G=!0}}else j()}else j();P||n!==S-1||J(t[0],b,g,O,!0,R),R=N,C=T,d.copy(w),x.copy(M)}if(P){if(L&&o){let t=v,e=k;q!==O&&(t=k,e=v),O?(G||q)&&(e.toArray(o,0),e.toArray(o,9),G&&t.toArray(o,3)):!G&&q||(e.toArray(o,3),e.toArray(o,9),G&&t.toArray(o,0))}}else J(T,m,A,O,!1,N);return B;function D(t,e,n){return n.subVectors(e,t),n.set(-n.y,n.x).normalize()}function F(t,e,n){o&&(o[z]=t.x,o[z+1]=t.y,o[z+2]=0,i&&(i[z]=0,i[z+1]=0,i[z+2]=1),z+=3,s&&(s[W]=e,s[W+1]=n,W+=2)),B+=3}function H(t,e,r,o,i){c.copy(e).sub(t).normalize(),l.copy(r).sub(t).normalize();let s=Math.PI;const a=c.dot(l);Math.abs(a)<1&&(s=Math.abs(Math.acos(a))),s/=n,u.copy(e);for(let e=0,r=n-1;e<r;e++)y.copy(u).rotateAround(t,s),F(u,o,i),F(y,o,i),F(t,o,.5),u.copy(y);F(y,o,i),F(r,o,i),F(t,o,.5)}function j(){F(x,R,1),F(d,R,0),F(m,N,0),F(x,R,1),F(m,N,1),F(A,N,0)}function U(t,e,n){e?t?(F(x,R,1),F(d,R,0),F(m,N,0),F(x,R,1),F(m,N,0),F(k,N,1),F(m,n,0),F(w,n,0),F(k,n,.5)):(F(x,R,1),F(d,R,0),F(A,N,1),F(d,R,0),F(k,N,0),F(A,N,1),F(A,n,1),F(M,n,0),F(k,n,.5)):t?(F(m,n,0),F(w,n,0),F(T,n,.5)):(F(A,n,1),F(M,n,0),F(T,n,.5))}function X(t,e){e&&(t?(F(x,R,1),F(d,R,0),F(m,N,0),F(x,R,1),F(m,N,0),F(k,N,1),F(m,R,0),F(T,N,.5),F(k,N,1),F(T,N,.5),F(w,R,0),F(k,N,1)):(F(x,R,1),F(d,R,0),F(A,N,1),F(d,R,0),F(k,N,0),F(A,N,1),F(A,R,1),F(k,N,0),F(T,N,.5),F(T,N,.5),F(k,N,0),F(M,R,1)))}function J(t,n,r,i,s,a){switch(e.strokeLineCap){case"round":s?H(t,r,n,a,.5):H(t,n,r,a,.5);break;case"square":if(s)c.subVectors(n,t),l.set(c.y,-c.x),u.addVectors(c,l).add(t),y.subVectors(l,c).add(t),i?(u.toArray(o,3),y.toArray(o,0),y.toArray(o,9)):(u.toArray(o,3),u.toArray(o,9),y.toArray(o,0));else{c.subVectors(r,t),l.set(c.y,-c.x),u.addVectors(c,l).add(t),y.subVectors(l,c).add(t);const e=o.length;i?(u.toArray(o,e-3),y.toArray(o,e-6),y.toArray(o,e-12)):(u.toArray(o,e-6),y.toArray(o,e-3),y.toArray(o,e-12))}}}}}export{SVGLoader};
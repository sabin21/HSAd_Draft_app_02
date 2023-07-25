import{AnimationClip,Bone,FileLoader,Loader,Quaternion,QuaternionKeyframeTrack,Skeleton,Vector3,VectorKeyframeTrack}from"three";class BVHLoader extends Loader{constructor(e){super(e),this.animateBonePositions=!0,this.animateBoneRotations=!0}load(e,t,o,n){const r=this,a=new FileLoader(r.manager);a.setPath(r.path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(e,(function(o){try{t(r.parse(o))}catch(t){n?n(t):console.error(t),r.manager.itemError(e)}}),o,n)}parse(e){function t(e,o,n){if("ENDSITE"===n.type)return;const r={time:o,position:new Vector3,rotation:new Quaternion};n.frames.push(r);const a=new Quaternion,s=new Vector3(1,0,0),i=new Vector3(0,1,0),l=new Vector3(0,0,1);for(let t=0;t<n.channels.length;t++)switch(n.channels[t]){case"Xposition":r.position.x=parseFloat(e.shift().trim());break;case"Yposition":r.position.y=parseFloat(e.shift().trim());break;case"Zposition":r.position.z=parseFloat(e.shift().trim());break;case"Xrotation":a.setFromAxisAngle(s,parseFloat(e.shift().trim())*Math.PI/180),r.rotation.multiply(a);break;case"Yrotation":a.setFromAxisAngle(i,parseFloat(e.shift().trim())*Math.PI/180),r.rotation.multiply(a);break;case"Zrotation":a.setFromAxisAngle(l,parseFloat(e.shift().trim())*Math.PI/180),r.rotation.multiply(a);break;default:console.warn("THREE.BVHLoader: Invalid channel type.")}for(let r=0;r<n.children.length;r++)t(e,o,n.children[r])}function o(e,t,r){const a={name:"",type:"",frames:[]};r.push(a);let s=t.split(/[\s]+/);"END"===s[0].toUpperCase()&&"SITE"===s[1].toUpperCase()?(a.type="ENDSITE",a.name="ENDSITE"):(a.name=s[1],a.type=s[0].toUpperCase()),"{"!==n(e)&&console.error("THREE.BVHLoader: Expected opening { after type & name"),s=n(e).split(/[\s]+/),"OFFSET"!==s[0]&&console.error("THREE.BVHLoader: Expected OFFSET but got: "+s[0]),4!==s.length&&console.error("THREE.BVHLoader: Invalid number of values for OFFSET.");const i=new Vector3(parseFloat(s[1]),parseFloat(s[2]),parseFloat(s[3]));if((isNaN(i.x)||isNaN(i.y)||isNaN(i.z))&&console.error("THREE.BVHLoader: Invalid values of OFFSET."),a.offset=i,"ENDSITE"!==a.type){s=n(e).split(/[\s]+/),"CHANNELS"!==s[0]&&console.error("THREE.BVHLoader: Expected CHANNELS definition.");const t=parseInt(s[1]);a.channels=s.splice(2,t),a.children=[]}for(;;){const t=n(e);if("}"===t)return a;a.children.push(o(e,t,r))}}function n(e){let t;for(;0===(t=e.shift().trim()).length;);return t}const r=this,a=function(e){"HIERARCHY"!==n(e)&&console.error("THREE.BVHLoader: HIERARCHY expected.");const r=[],a=o(e,n(e),r);"MOTION"!==n(e)&&console.error("THREE.BVHLoader: MOTION expected.");let s=n(e).split(/[\s]+/);const i=parseInt(s[1]);isNaN(i)&&console.error("THREE.BVHLoader: Failed to read number of frames."),s=n(e).split(/[\s]+/);const l=parseFloat(s[2]);isNaN(l)&&console.error("THREE.BVHLoader: Failed to read frame time.");for(let o=0;o<i;o++)s=n(e).split(/[\s]+/),t(s,o*l,a);return r}(e.split(/[\r\n]+/g)),s=[];!function e(t,o){const n=new Bone;if(o.push(n),n.position.add(t.offset),n.name=t.name,"ENDSITE"!==t.type)for(let r=0;r<t.children.length;r++)n.add(e(t.children[r],o));return n}(a[0],s);const i=function(e){const t=[];for(let o=0;o<e.length;o++){const n=e[o];if("ENDSITE"===n.type)continue;const a=[],s=[],i=[];for(let e=0;e<n.frames.length;e++){const t=n.frames[e];a.push(t.time),s.push(t.position.x+n.offset.x),s.push(t.position.y+n.offset.y),s.push(t.position.z+n.offset.z),i.push(t.rotation.x),i.push(t.rotation.y),i.push(t.rotation.z),i.push(t.rotation.w)}r.animateBonePositions&&t.push(new VectorKeyframeTrack(n.name+".position",a,s)),r.animateBoneRotations&&t.push(new QuaternionKeyframeTrack(n.name+".quaternion",a,i))}return new AnimationClip("animation",-1,t)}(a);return{skeleton:new Skeleton(s),clip:i}}}export{BVHLoader};
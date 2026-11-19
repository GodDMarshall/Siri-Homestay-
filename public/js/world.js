var Ju=0,Mc=1,$u=2;var Hi=1,Ku=2,Bs=3,wi=0,tn=1,Pt=2,Gi=0,zs=1,ks=2,Sc=3,bc=4,Qu=5;var Vi=100,ju=101,ed=102,td=103,nd=104,id=200,sd=201,rd=202,od=203,Ec=204,wc=205,ad=206,ld=207,cd=208,hd=209,ud=210,dd=211,fd=212,pd=213,md=214,qo=0,gs=1,Yo=2,xs=3,Zo=4,Jo=5,$o=6,Ko=7,Tc=0,gd=1,xd=2,Zn=0,Ac=1,Rc=2,Cc=3,Jr=4,Ic=5,Pc=6,Lc=7;var Dc=300,Wi=301,Hs=302,Sa=303,ba=304,_s=1e3,qn=1001,Qo=1002,Jt=1003,_d=1004;var $r=1005;var mn=1006,Ea=1007;var zn=1008;var vn=1009,Nc=1010,Uc=1011,Gs=1012,wa=1013,kn=1014,Pn=1015,An=1016,Ta=1017,Aa=1018,Xi=1020,Fc=35902,Oc=35899,Bc=1021,zc=1022,Hn=1023,ai=1026,hi=1027,Ra=1028,Ca=1029,Ti=1030,Ia=1031;var Pa=1033,Kr=33776,Qr=33777,jr=33778,eo=33779,La=35840,Da=35841,Na=35842,Ua=35843,Fa=36196,Oa=37492,Ba=37496,za=37488,ka=37489,to=37490,Ha=37491,Ga=37808,Va=37809,Wa=37810,Xa=37811,qa=37812,Ya=37813,Za=37814,Ja=37815,$a=37816,Ka=37817,Qa=37818,ja=37819,el=37820,tl=37821,nl=36492,il=36494,sl=36495,rl=36283,ol=36284,no=36285,al=36286;var pr=2300,jo=2301,Wo=2302,ac=2303,lc=2400,cc=2401,hc=2402;var vd=3200,kc=3201;var ll=0,yd=1,Gn="",Qt="srgb",mr="srgb-linear",gr="linear",ut="srgb";var Xo=7680;var Md=519,Sd=512,bd=513,Ed=514,Hc=515,wd=516,Td=517,Gc=518,Vc=519,Wc=35044;var Xc="300 es",In=2e3,vs=2001;function lp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function cp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function xr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ad(){let i=xr("canvas");return i.style.display="block",i}var du={},ys=null;function _r(...i){let e="THREE."+i.shift();ys?ys("log",e,...i):console.log(e,...i)}function Rd(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function ke(...i){i=Rd(i);let e="THREE."+i.shift();if(ys)ys("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function He(...i){i=Rd(i);let e="THREE."+i.shift();if(ys)ys("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ni(...i){let e=i.join(" ");e in du||(du[e]=!0,ke(...i))}function Cd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Id={[qo]:qo,[Yo]:$o,[Zo]:Zo,[xs]:Jo,[gs]:gs,[$o]:Yo,[Ko]:Ko,[Jo]:xs},Yn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],fu=1234567,hr=Math.PI/180,Ui=180/Math.PI;function ui(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(rn[i&255]+rn[i>>8&255]+rn[i>>16&255]+rn[i>>24&255]+"-"+rn[e&255]+rn[e>>8&255]+"-"+rn[e>>16&15|64]+rn[e>>24&255]+"-"+rn[t&63|128]+rn[t>>8&255]+"-"+rn[t>>16&255]+rn[t>>24&255]+rn[n&255]+rn[n>>8&255]+rn[n>>16&255]+rn[n>>24&255]).toLowerCase()}function Ke(i,e,t){return Math.max(e,Math.min(t,i))}function qc(i,e){return(i%e+e)%e}function hp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function up(i,e,t){return i!==e?(t-i)/(e-i):0}function ur(i,e,t){return(1-t)*i+t*e}function dp(i,e,t,n){return ur(i,e,1-Math.exp(-t*n))}function fp(i,e=1){return e-Math.abs(qc(i,e*2)-e)}function pp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function mp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function gp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function xp(i,e){return i+Math.random()*(e-i)}function _p(i){return i*(.5-Math.random())}function vp(i){i!==void 0&&(fu=i);let e=fu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function yp(i){return i*hr}function Mp(i){return i*Ui}function Sp(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function bp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Yc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ep(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),p=o((n-e)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*p,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*p,a*c);break;case"ZYZ":i.set(l*p,l*f,a*h,a*c);break;default:ke("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function cl(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Zc(i,e){if(e.constructor===Float32Array)return i;let t=cl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function Jc(i,e){if(e.constructor===Float32Array)return i;let t=cl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var Vs={DEG2RAD:hr,RAD2DEG:Ui,generateUUID:ui,clamp:Ke,euclideanModulo:qc,mapLinear:hp,inverseLerp:up,lerp:ur,damp:dp,pingpong:fp,smoothstep:pp,smootherstep:mp,randInt:gp,randFloat:xp,randFloatSpread:_p,seededRandom:vp,degToRad:yp,radToDeg:Mp,isPowerOfTwo:Sp,ceilPowerOfTwo:bp,floorPowerOfTwo:Yc,setQuaternionFromProperEuler:Ep,normalize:Jc,denormalize:Zc},th=class th{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};th.prototype.isVector2=!0;var re=th,an=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],p=r[o+2],_=r[o+3];if(u!==_||l!==d||c!==f||h!==p){let m=l*d+c*f+h*p+u*_;m<0&&(d=-d,f=-f,p=-p,_=-_,m=-m);let g=1-a;if(m<.9995){let y=Math.acos(m),b=Math.sin(y);g=Math.sin(g*y)/b,a=Math.sin(a*y)/b,l=l*g+d*a,c=c*g+f*a,h=h*g+p*a,u=u*g+_*a}else{l=l*g+d*a,c=c*g+f*a,h=h*g+p*a,u=u*g+_*a;let y=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=y,c*=y,h*=y,u*=y}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],p=r[o+3];return e[t]=a*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-a*f,e[t+2]=c*p+h*f+a*d-l*u,e[t+3]=h*p-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),p=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:ke("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},nh=class nh{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(pu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(pu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ol.copy(this).projectOnVector(e),this.sub(Ol)}reflect(e){return this.sub(Ol.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};nh.prototype.isVector3=!0;var C=nh,Ol=new C,pu=new an,ih=class ih{constructor(e,t,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],_=s[0],m=s[3],g=s[6],y=s[1],b=s[4],S=s[7],I=s[2],A=s[5],x=s[8];return r[0]=o*_+a*y+l*I,r[3]=o*m+a*b+l*A,r[6]=o*g+a*S+l*x,r[1]=c*_+h*y+u*I,r[4]=c*m+h*b+u*A,r[7]=c*g+h*S+u*x,r[2]=d*_+f*y+p*I,r[5]=d*m+f*b+p*A,r[8]=d*g+f*S+p*x,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,p=t*u+n*d+s*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return e[0]=u*_,e[1]=(s*c-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=d*_,e[4]=(h*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return Ni("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Bl.makeScale(e,t)),this}rotate(e){return Ni("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Bl.makeRotation(-e)),this}translate(e,t){return Ni("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Bl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ih.prototype.isMatrix3=!0;var We=ih,Bl=new We,mu=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gu=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wp(){let i={enabled:!0,workingColorSpace:mr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ut&&(s.r=oi(s.r),s.g=oi(s.g),s.b=oi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ut&&(s.r=ps(s.r),s.g=ps(s.g),s.b=ps(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Gn?gr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[mr]:{primaries:e,whitePoint:n,transfer:gr,toXYZ:mu,fromXYZ:gu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Qt},outputColorSpaceConfig:{drawingBufferColorSpace:Qt}},[Qt]:{primaries:e,whitePoint:n,transfer:ut,toXYZ:mu,fromXYZ:gu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Qt}}}),i}var rt=wp();function oi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ps(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var $i,ea=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{$i===void 0&&($i=xr("canvas")),$i.width=e.width,$i.height=e.height;let s=$i.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=$i}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=xr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=oi(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(oi(t[n]/255)*255):t[n]=oi(t[n]);return{data:t,width:e.width,height:e.height}}else return ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Tp=0,Ms=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=ui(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(zl(s[o].image)):r.push(zl(s[o]))}else r=zl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function zl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ea.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(ke("Texture: Unable to serialize Texture."),{})}var Ap=0,kl=new C,gn=class i extends Yn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=qn,s=qn,r=mn,o=zn,a=Hn,l=vn,c=i.DEFAULT_ANISOTROPY,h=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ap++}),this.uuid=ui(),this.name="",this.source=new Ms(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(kl).x}get height(){return this.source.getSize(kl).y}get depth(){return this.source.getSize(kl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){ke(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Dc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _s:e.x=e.x-Math.floor(e.x);break;case qn:e.x=e.x<0?0:1;break;case Qo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case _s:e.y=e.y-Math.floor(e.y);break;case qn:e.y=e.y<0?0:1;break;case Qo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};gn.DEFAULT_IMAGE=null;gn.DEFAULT_MAPPING=Dc;gn.DEFAULT_ANISOTROPY=1;var sh=class sh{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],_=l[2],m=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(p+m)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(c+1)/2,S=(f+1)/2,I=(g+1)/2,A=(h+d)/4,x=(u+_)/4,E=(p+m)/4;return b>S&&b>I?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=A/n,r=x/n):S>I?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=A/s,r=E/s):I<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),n=x/r,s=E/r),this.set(n,s,r,t),this}let y=Math.sqrt((m-p)*(m-p)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-p)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};sh.prototype.isVector4=!0;var mt=sh,ta=class extends Yn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new gn({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:mn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ms(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},xn=class extends ta{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},vr=class extends gn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var na=class extends gn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ma=class Ma{constructor(e,t,n,s,r,o,a,l,c,h,u,d,f,p,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,u,d,f,p,_,m)}set(e,t,n,s,r,o,a,l,c,h,u,d,f,p,_,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=_,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ma().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Ki.setFromMatrixColumn(e,0).length(),r=1/Ki.setFromMatrixColumn(e,1).length(),o=1/Ki.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,p=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=p+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,p=c*h,_=c*u;t[0]=d+_*a,t[4]=p*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-p,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,p=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*h,f=o*u,p=a*h,_=a*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=p*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-_*u}else if(e.order==="XZY"){let d=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rp,e,Cp)}lookAt(e,t,n){let s=this.elements;return Mn.subVectors(e,t),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),pi.crossVectors(n,Mn),pi.lengthSq()===0&&(Math.abs(n.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),pi.crossVectors(n,Mn)),pi.normalize(),_o.crossVectors(Mn,pi),s[0]=pi.x,s[4]=_o.x,s[8]=Mn.x,s[1]=pi.y,s[5]=_o.y,s[9]=Mn.y,s[2]=pi.z,s[6]=_o.z,s[10]=Mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],_=n[6],m=n[10],g=n[14],y=n[3],b=n[7],S=n[11],I=n[15],A=s[0],x=s[4],E=s[8],L=s[12],w=s[1],D=s[5],U=s[9],P=s[13],T=s[2],O=s[6],z=s[10],k=s[14],q=s[3],G=s[7],X=s[11],Q=s[15];return r[0]=o*A+a*w+l*T+c*q,r[4]=o*x+a*D+l*O+c*G,r[8]=o*E+a*U+l*z+c*X,r[12]=o*L+a*P+l*k+c*Q,r[1]=h*A+u*w+d*T+f*q,r[5]=h*x+u*D+d*O+f*G,r[9]=h*E+u*U+d*z+f*X,r[13]=h*L+u*P+d*k+f*Q,r[2]=p*A+_*w+m*T+g*q,r[6]=p*x+_*D+m*O+g*G,r[10]=p*E+_*U+m*z+g*X,r[14]=p*L+_*P+m*k+g*Q,r[3]=y*A+b*w+S*T+I*q,r[7]=y*x+b*D+S*O+I*G,r[11]=y*E+b*U+S*z+I*X,r[15]=y*L+b*P+S*k+I*Q,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],_=e[7],m=e[11],g=e[15],y=l*f-c*d,b=a*f-c*u,S=a*d-l*u,I=o*f-c*h,A=o*d-l*h,x=o*u-a*h;return t*(_*y-m*b+g*S)-n*(p*y-m*I+g*A)+s*(p*b-_*I+g*x)-r*(p*S-_*A+m*x)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],h=e[10];return t*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],_=e[13],m=e[14],g=e[15],y=t*a-n*o,b=t*l-s*o,S=t*c-r*o,I=n*l-s*a,A=n*c-r*a,x=s*c-r*l,E=h*_-u*p,L=h*m-d*p,w=h*g-f*p,D=u*m-d*_,U=u*g-f*_,P=d*g-f*m,T=y*P-b*U+S*D+I*w-A*L+x*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/T;return e[0]=(a*P-l*U+c*D)*O,e[1]=(s*U-n*P-r*D)*O,e[2]=(_*x-m*A+g*I)*O,e[3]=(d*A-u*x-f*I)*O,e[4]=(l*w-o*P-c*L)*O,e[5]=(t*P-s*w+r*L)*O,e[6]=(m*S-p*x-g*b)*O,e[7]=(h*x-d*S+f*b)*O,e[8]=(o*U-a*w+c*E)*O,e[9]=(n*w-t*U-r*E)*O,e[10]=(p*A-_*S+g*y)*O,e[11]=(u*S-h*A-f*y)*O,e[12]=(a*L-o*D-l*E)*O,e[13]=(t*D-n*L+s*E)*O,e[14]=(_*b-p*I-m*y)*O,e[15]=(h*I-u*b+d*y)*O,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,p=r*u,_=o*h,m=o*u,g=a*u,y=l*c,b=l*h,S=l*u,I=n.x,A=n.y,x=n.z;return s[0]=(1-(_+g))*I,s[1]=(f+S)*I,s[2]=(p-b)*I,s[3]=0,s[4]=(f-S)*A,s[5]=(1-(d+g))*A,s[6]=(m+y)*A,s[7]=0,s[8]=(p+b)*x,s[9]=(m-y)*x,s[10]=(1-(d+_))*x,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=Ki.set(s[0],s[1],s[2]).length(),a=Ki.set(s[4],s[5],s[6]).length(),l=Ki.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Nn.copy(this);let c=1/o,h=1/a,u=1/l;return Nn.elements[0]*=c,Nn.elements[1]*=c,Nn.elements[2]*=c,Nn.elements[4]*=h,Nn.elements[5]*=h,Nn.elements[6]*=h,Nn.elements[8]*=u,Nn.elements[9]*=u,Nn.elements[10]*=u,t.setFromRotationMatrix(Nn),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,s,r,o,a=In,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s),p,_;if(l)p=r/(o-r),_=o*r/(o-r);else if(a===In)p=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===vs)p=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=In,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s),p,_;if(l)p=1/(o-r),_=o/(o-r);else if(a===In)p=-2/(o-r),_=-(o+r)/(o-r);else if(a===vs)p=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ma.prototype.isMatrix4=!0;var Ye=Ma,Ki=new C,Nn=new Ye,Rp=new C(0,0,0),Cp=new C(1,1,1),pi=new C,_o=new C,Mn=new C,xu=new Ye,_u=new an,On=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return xu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return _u.setFromEuler(this),this.setFromQuaternion(_u,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};On.DEFAULT_ORDER="XYZ";var Ss=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Ip=0,vu=new C,Qi=new an,ei=new Ye,vo=new C,er=new C,Pp=new C,Lp=new an,yu=new C(1,0,0),Mu=new C(0,1,0),Su=new C(0,0,1),bu={type:"added"},Dp={type:"removed"},ji={type:"childadded",child:null},Hl={type:"childremoved",child:null},Vt=class i extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ip++}),this.uuid=ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new C,t=new On,n=new an,s=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ye},normalMatrix:{value:new We}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ss,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Qi.setFromAxisAngle(e,t),this.quaternion.multiply(Qi),this}rotateOnWorldAxis(e,t){return Qi.setFromAxisAngle(e,t),this.quaternion.premultiply(Qi),this}rotateX(e){return this.rotateOnAxis(yu,e)}rotateY(e){return this.rotateOnAxis(Mu,e)}rotateZ(e){return this.rotateOnAxis(Su,e)}translateOnAxis(e,t){return vu.copy(e).applyQuaternion(this.quaternion),this.position.add(vu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yu,e)}translateY(e){return this.translateOnAxis(Mu,e)}translateZ(e){return this.translateOnAxis(Su,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ei.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?vo.copy(e):vo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ei.lookAt(er,vo,this.up):ei.lookAt(vo,er,this.up),this.quaternion.setFromRotationMatrix(ei),s&&(ei.extractRotation(s.matrixWorld),Qi.setFromRotationMatrix(ei),this.quaternion.premultiply(Qi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(He("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bu),ji.child=e,this.dispatchEvent(ji),ji.child=null):He("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dp),Hl.child=e,this.dispatchEvent(Hl),Hl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ei.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ei.multiply(e.parent.matrixWorld)),e.applyMatrix4(ei),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bu),ji.child=e,this.dispatchEvent(ji),ji.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,e,Pp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,Lp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Vt.DEFAULT_UP=new C(0,1,0);Vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pn=class extends Vt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Np={type:"move"},bs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),g=this._getHandJoint(c,_);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Np)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new pn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Pd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mi={h:0,s:0,l:0},yo={h:0,s:0,l:0};function Gl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Te=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,rt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=rt.workingColorSpace){if(e=qc(e,1),t=Ke(t,0,1),n=Ke(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Gl(o,r,e+1/3),this.g=Gl(o,r,e),this.b=Gl(o,r,e-1/3)}return rt.colorSpaceToWorking(this,s),this}setStyle(e,t=Qt){function n(r){r!==void 0&&parseFloat(r)<1&&ke("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:ke("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qt){let n=Pd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=oi(e.r),this.g=oi(e.g),this.b=oi(e.b),this}copyLinearToSRGB(e){return this.r=ps(e.r),this.g=ps(e.g),this.b=ps(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qt){return rt.workingToColorSpace(on.copy(this),e),Math.round(Ke(on.r*255,0,255))*65536+Math.round(Ke(on.g*255,0,255))*256+Math.round(Ke(on.b*255,0,255))}getHexString(e=Qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.workingToColorSpace(on.copy(this),t);let n=on.r,s=on.g,r=on.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=rt.workingColorSpace){return rt.workingToColorSpace(on.copy(this),t),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=Qt){rt.workingToColorSpace(on.copy(this),e);let t=on.r,n=on.g,s=on.b;return e!==Qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(mi),this.setHSL(mi.h+e,mi.s+t,mi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(mi),e.getHSL(yo);let n=ur(mi.h,yo.h,t),s=ur(mi.s,yo.s,t),r=ur(mi.l,yo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},on=new Te;Te.NAMES=Pd;var yr=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Te(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Fi=class extends Vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new On,this.environmentIntensity=1,this.environmentRotation=new On,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Un=new C,ti=new C,Vl=new C,ni=new C,es=new C,ts=new C,Eu=new C,Wl=new C,Xl=new C,ql=new C,Yl=new mt,Zl=new mt,Jl=new mt,ri=class i{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Un.subVectors(e,t),s.cross(Un);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Un.subVectors(s,t),ti.subVectors(n,t),Vl.subVectors(e,t);let o=Un.dot(Un),a=Un.dot(ti),l=Un.dot(Vl),c=ti.dot(ti),h=ti.dot(Vl),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,p=(o*h-a*l)*d;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ni)===null?!1:ni.x>=0&&ni.y>=0&&ni.x+ni.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,ni)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ni.x),l.addScaledVector(o,ni.y),l.addScaledVector(a,ni.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return Yl.setScalar(0),Zl.setScalar(0),Jl.setScalar(0),Yl.fromBufferAttribute(e,t),Zl.fromBufferAttribute(e,n),Jl.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Yl,r.x),o.addScaledVector(Zl,r.y),o.addScaledVector(Jl,r.z),o}static isFrontFacing(e,t,n,s){return Un.subVectors(n,t),ti.subVectors(e,t),Un.cross(ti).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Un.subVectors(this.c,this.b),ti.subVectors(this.a,this.b),Un.cross(ti).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;es.subVectors(s,n),ts.subVectors(r,n),Wl.subVectors(e,n);let l=es.dot(Wl),c=ts.dot(Wl);if(l<=0&&c<=0)return t.copy(n);Xl.subVectors(e,s);let h=es.dot(Xl),u=ts.dot(Xl);if(h>=0&&u<=h)return t.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0&&l-h>0)return o=l/(l-h),t.copy(n).addScaledVector(es,o);ql.subVectors(e,r);let f=es.dot(ql),p=ts.dot(ql);if(p>=0&&f<=p)return t.copy(r);let _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(ts,a);let m=h*p-f*u;if(m<=0&&u-h>=0&&f-p>=0)return Eu.subVectors(r,s),a=(u-h)/(u-h+(f-p)),t.copy(s).addScaledVector(Eu,a);let g=1/(m+_+d);return o=_*g,a=d*g,t.copy(n).addScaledVector(es,o).addScaledVector(ts,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},En=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Fn):Fn.fromBufferAttribute(r,o),Fn.applyMatrix4(e.matrixWorld),this.expandByPoint(Fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Mo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Mo.copy(n.boundingBox)),Mo.applyMatrix4(e.matrixWorld),this.union(Mo)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Fn),Fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(tr),So.subVectors(this.max,tr),ns.subVectors(e.a,tr),is.subVectors(e.b,tr),ss.subVectors(e.c,tr),gi.subVectors(is,ns),xi.subVectors(ss,is),Ii.subVectors(ns,ss);let t=[0,-gi.z,gi.y,0,-xi.z,xi.y,0,-Ii.z,Ii.y,gi.z,0,-gi.x,xi.z,0,-xi.x,Ii.z,0,-Ii.x,-gi.y,gi.x,0,-xi.y,xi.x,0,-Ii.y,Ii.x,0];return!$l(t,ns,is,ss,So)||(t=[1,0,0,0,1,0,0,0,1],!$l(t,ns,is,ss,So))?!1:(bo.crossVectors(gi,xi),t=[bo.x,bo.y,bo.z],$l(t,ns,is,ss,So))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ii=[new C,new C,new C,new C,new C,new C,new C,new C],Fn=new C,Mo=new En,ns=new C,is=new C,ss=new C,gi=new C,xi=new C,Ii=new C,tr=new C,So=new C,bo=new C,Pi=new C;function $l(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Pi.fromArray(i,r);let a=s.x*Math.abs(Pi.x)+s.y*Math.abs(Pi.y)+s.z*Math.abs(Pi.z),l=e.dot(Pi),c=t.dot(Pi),h=n.dot(Pi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var kt=new C,Eo=new re,Up=0,Bt=class extends Yn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Up++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Wc,this.updateRanges=[],this.gpuType=Pn,this.version=0,this._normalizationScale=e!==void 0?cl(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Eo.fromBufferAttribute(this,t),Eo.applyMatrix3(e),this.setXY(t,Eo.x,Eo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix3(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Zc(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Jc(e,this.array)}};var Mr=class extends Bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Sr=class extends Bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var et=class extends Bt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Fp=new En,nr=new C,Kl=new C,Bn=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Fp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;nr.subVectors(e,this.center);let t=nr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(nr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Kl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(nr.copy(e.center).add(Kl)),this.expandByPoint(nr.copy(e.center).sub(Kl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Op=0,Cn=new Ye,Ql=new Vt,rs=new C,Sn=new En,ir=new En,Zt=new C,Nt=class i extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Op++}),this.uuid=ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(lp(e)?Sr:Mr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new We().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Cn.makeRotationFromQuaternion(e),this.applyMatrix4(Cn),this}rotateX(e){return Cn.makeRotationX(e),this.applyMatrix4(Cn),this}rotateY(e){return Cn.makeRotationY(e),this.applyMatrix4(Cn),this}rotateZ(e){return Cn.makeRotationZ(e),this.applyMatrix4(Cn),this}translate(e,t,n){return Cn.makeTranslation(e,t,n),this.applyMatrix4(Cn),this}scale(e,t,n){return Cn.makeScale(e,t,n),this.applyMatrix4(Cn),this}lookAt(e){return Ql.lookAt(e),Ql.updateMatrix(),this.applyMatrix4(Ql.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(rs).negate(),this.translate(rs.x,rs.y,rs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new et(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new En);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Sn.setFromBufferAttribute(r),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&He('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let n=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];ir.setFromBufferAttribute(a),this.morphTargetsRelative?(Zt.addVectors(Sn.min,ir.min),Sn.expandByPoint(Zt),Zt.addVectors(Sn.max,ir.max),Sn.expandByPoint(Zt)):(Sn.expandByPoint(ir.min),Sn.expandByPoint(ir.max))}Sn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Zt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Zt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Zt.fromBufferAttribute(a,c),l&&(rs.fromBufferAttribute(e,c),Zt.add(rs)),s=Math.max(s,n.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&He('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){He("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Bt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[],c=new Uint8Array(n.count);for(let L=0;L<n.count;L++)a[L]=new C,l[L]=new C;let h=new C,u=new C,d=new C,f=new re,p=new re,_=new re,m=new C,g=new C;function y(L,w,D){c[L]=c[w]=c[D]=1,h.fromBufferAttribute(n,L),u.fromBufferAttribute(n,w),d.fromBufferAttribute(n,D),f.fromBufferAttribute(r,L),p.fromBufferAttribute(r,w),_.fromBufferAttribute(r,D),u.sub(h),d.sub(h),p.sub(f),_.sub(f);let U=1/(p.x*_.y-_.x*p.y);isFinite(U)&&(m.copy(u).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(U),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(U),a[L].add(m),a[w].add(m),a[D].add(m),l[L].add(g),l[w].add(g),l[D].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let L=0,w=b.length;L<w;++L){let D=b[L],U=D.start,P=D.count;for(let T=U,O=U+P;T<O;T+=3)y(e.getX(T+0),e.getX(T+1),e.getX(T+2))}let S=new C,I=new C,A=new C,x=new C;function E(L){A.fromBufferAttribute(s,L),x.copy(A);let w=a[L];S.copy(w),S.sub(A.multiplyScalar(A.dot(w))).normalize(),I.crossVectors(x,w);let U=I.dot(l[L])<0?-1:1;o.setXYZW(L,S.x,S.y,S.z,U)}for(let L=0,w=n.count;L<w;++L)c[L]&&E(L);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Bt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new C,r=new C,o=new C,a=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){let p=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Zt.fromBufferAttribute(e,t),Zt.normalize(),e.setXYZ(t,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,p=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let g=0;g<h;g++)d[p++]=c[f++]}return new Bt(d,h,u)}if(this.index===null)return ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},br=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Wc,this.updateRanges=[],this.version=0,this.uuid=ui()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=wu(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=wu(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function wu(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=ui()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}var fn=new C,Es=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s,this._normalizationScale=e!==void 0?cl(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)fn.fromBufferAttribute(this,t),fn.applyMatrix4(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)fn.fromBufferAttribute(this,t),fn.applyNormalMatrix(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)fn.fromBufferAttribute(this,t),fn.transformDirection(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){_r("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Bt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){_r("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Zc(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Jc(e,this.data.array)}},jl=new C,Bp=new C,zp=new We,bn=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=jl.subVectors(n,t).cross(Bp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(jl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||zp.getNormalMatrix(e),s=this.coplanarPoint(jl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},kp=0,li=class extends Yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:kp++}),this.uuid=ui(),this.name="",this.type="Material",this.blending=zs,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ec,this.blendDst=wc,this.blendEquation=Vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Te(0,0,0),this.blendAlpha=0,this.depthFunc=xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Md,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xo,this.stencilZFail=Xo,this.stencilZPass=Xo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){ke(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Te().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new bn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new re().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new re().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ws=class extends li{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Te(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},os,sr=new C,as=new C,ls=new C,cs=new re,rr=new re,Ld=new Ye,wo=new C,or=new C,To=new C,Tu=new re,ec=new re,Au=new re,Er=class extends Vt{constructor(e=new ws){if(super(),this.isSprite=!0,this.type="Sprite",os===void 0){os=new Nt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new br(t,5);os.setIndex([0,1,2,0,2,3]),os.setAttribute("position",new Es(n,3,0,!1)),os.setAttribute("uv",new Es(n,2,3,!1))}this.geometry=os,this.material=e,this.center=new re(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&He('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),as.setFromMatrixScale(this.matrixWorld),Ld.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ls.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&as.multiplyScalar(-ls.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;Ao(wo.set(-.5,-.5,0),ls,o,as,s,r),Ao(or.set(.5,-.5,0),ls,o,as,s,r),Ao(To.set(.5,.5,0),ls,o,as,s,r),Tu.set(0,0),ec.set(1,0),Au.set(1,1);let a=e.ray.intersectTriangle(wo,or,To,!1,sr);if(a===null&&(Ao(or.set(-.5,.5,0),ls,o,as,s,r),ec.set(0,1),a=e.ray.intersectTriangle(wo,To,or,!1,sr),a===null))return;let l=e.ray.origin.distanceTo(sr);l<e.near||l>e.far||t.push({distance:l,point:sr.clone(),uv:ri.getInterpolation(sr,wo,or,To,Tu,ec,Au,new re),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function Ao(i,e,t,n,s,r){cs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(rr.x=r*cs.x-s*cs.y,rr.y=s*cs.x+r*cs.y):rr.copy(cs),i.copy(e),i.x+=rr.x,i.y+=rr.y,i.applyMatrix4(Ld)}var si=new C,tc=new C,Ro=new C,Co=new C,wr=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,si)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=si.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(si.copy(this.origin).addScaledVector(this.direction,t),si.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){tc.copy(e).add(t).multiplyScalar(.5),Ro.copy(t).sub(e).normalize(),Co.copy(this.origin).sub(tc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Ro),a=Co.dot(this.direction),l=-Co.dot(Ro),c=Co.lengthSq(),h=Math.abs(1-o*o),u,d,f,p;if(h>0)if(u=o*l-a,d=o*a-l,p=r*h,u>=0)if(d>=-p)if(d<=p){let _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(tc).addScaledVector(Ro,d),f}intersectSphere(e,t){if(e.radius<0)return null;si.subVectors(e.center,this.origin);let n=si.dot(this.direction),s=si.dot(si)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,si)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,u=e.x-o.x,d=e.y-o.y,f=e.z-o.z,p=t.x-o.x,_=t.y-o.y,m=t.z-o.z,g=n.x-o.x,y=n.y-o.y,b=n.z-o.z,S=Math.abs(l),I=Math.abs(c),A=Math.abs(h),x,E,L,w,D,U,P,T,O,z,k,q;if(S>=I&&S>=A?(L=l,U=u,O=p,q=g,l>=0?(x=c,E=h,w=d,D=f,P=_,T=m,z=y,k=b):(x=h,E=c,w=f,D=d,P=m,T=_,z=b,k=y)):I>=A?(L=c,U=d,O=_,q=y,c>=0?(x=h,E=l,w=f,D=u,P=m,T=p,z=b,k=g):(x=l,E=h,w=u,D=f,P=p,T=m,z=g,k=b)):(L=h,U=f,O=m,q=b,h>=0?(x=l,E=c,w=u,D=d,P=p,T=_,z=g,k=y):(x=c,E=l,w=d,D=u,P=_,T=p,z=y,k=g)),L===0)return null;let G=x/L,X=E/L,Q=1/L,_e=w-G*U,Se=D-X*U,J=P-G*O,le=T-X*O,be=z-G*q,Ee=k-X*q,pe=be*le-Ee*J,Ae=_e*Ee-Se*be,xt=J*Se-le*_e;if(s){if(pe<0||Ae<0||xt<0)return null}else if((pe<0||Ae<0||xt<0)&&(pe>0||Ae>0||xt>0))return null;let Le=pe+Ae+xt;if(Le===0)return null;let qe=Q*(pe*U+Ae*O+xt*q);return(Le>0?qe<0:qe>0)?null:this.at(qe/Le,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ts=class extends li{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.combine=Tc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ru=new Ye,Li=new wr,Io=new Bn,Cu=new C,Po=new C,Lo=new C,Do=new C,nc=new C,No=new C,Iu=new C,Uo=new C,Ut=class extends Vt{constructor(e=new Nt,t=new Ts){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){No.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(nc.fromBufferAttribute(u,e),o?No.addScaledVector(nc,h):No.addScaledVector(nc.sub(t),h))}t.add(No)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(r),Li.copy(e.ray).recast(e.near),!(Io.containsPoint(Li.origin)===!1&&(Li.intersectSphere(Io,Cu)===null||Li.origin.distanceToSquared(Cu)>(e.far-e.near)**2))&&(Ru.copy(r).invert(),Li.copy(e.ray).applyMatrix4(Ru),!(n.boundingBox!==null&&Li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Li)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){let m=d[p],g=o[m.materialIndex],y=Math.max(m.start,f.start),b=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let S=y,I=b;S<I;S+=3){let A=a.getX(S),x=a.getX(S+1),E=a.getX(S+2);s=Fo(this,g,e,n,c,h,u,A,x,E),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=p,g=_;m<g;m+=3){let y=a.getX(m),b=a.getX(m+1),S=a.getX(m+2);s=Fo(this,o,e,n,c,h,u,y,b,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){let m=d[p],g=o[m.materialIndex],y=Math.max(m.start,f.start),b=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let S=y,I=b;S<I;S+=3){let A=S,x=S+1,E=S+2;s=Fo(this,g,e,n,c,h,u,A,x,E),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=p,g=_;m<g;m+=3){let y=m,b=m+1,S=m+2;s=Fo(this,o,e,n,c,h,u,y,b,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Hp(i,e,t,n,s,r,o,a){let l;if(e.side===tn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===wi,a),l===null)return null;Uo.copy(a),Uo.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Uo);return c<t.near||c>t.far?null:{distance:c,point:Uo.clone(),object:i}}function Fo(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,Po),i.getVertexPosition(l,Lo),i.getVertexPosition(c,Do);let h=Hp(i,e,t,n,Po,Lo,Do,Iu);if(h){let u=new C;ri.getBarycoord(Iu,Po,Lo,Do,u),s&&(h.uv=ri.getInterpolatedAttribute(s,a,l,c,u,new re)),r&&(h.uv1=ri.getInterpolatedAttribute(r,a,l,c,u,new re)),o&&(h.normal=ri.getInterpolatedAttribute(o,a,l,c,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new C,materialIndex:0};ri.getNormal(Po,Lo,Do,d.normal),h.face=d,h.barycoord=u}return h}var Tr=class extends gn{constructor(e=null,t=1,n=1,s,r,o,a,l,c=Jt,h=Jt,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var As=class extends Bt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},hs=new Ye,Pu=new Ye,Oo=[],Lu=new En,Gp=new Ye,ar=new Ut,lr=new Bn,Ar=class extends Ut{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new As(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Gp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new En),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,hs),Lu.copy(e.boundingBox).applyMatrix4(hs),this.boundingBox.union(Lu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Bn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,hs),lr.copy(e.boundingSphere).applyMatrix4(hs),this.boundingSphere.union(lr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(ar.geometry=this.geometry,ar.material=this.material,ar.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),lr.copy(this.boundingSphere),lr.applyMatrix4(n),e.ray.intersectsSphere(lr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,hs),Pu.multiplyMatrices(n,hs),ar.matrixWorld=Pu,ar.raycast(e,Oo);for(let o=0,a=Oo.length;o<a;o++){let l=Oo[o];l.instanceId=r,l.object=this,t.push(l)}Oo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new As(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Tr(new Float32Array(s*this.count),s,this.count,Ra,Pn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Di=new Bn,Vp=new re(.5,.5),Bo=new C,vi=class{constructor(e=new bn,t=new bn,n=new bn,s=new bn,r=new bn,o=new bn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=In,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],p=r[8],_=r[9],m=r[10],g=r[11],y=r[12],b=r[13],S=r[14],I=r[15];if(s[0].setComponents(c-o,f-h,g-p,I-y).normalize(),s[1].setComponents(c+o,f+h,g+p,I+y).normalize(),s[2].setComponents(c+a,f+u,g+_,I+b).normalize(),s[3].setComponents(c-a,f-u,g-_,I-b).normalize(),n)s[4].setComponents(l,d,m,S).normalize(),s[5].setComponents(c-l,f-d,g-m,I-S).normalize();else if(s[4].setComponents(c-l,f-d,g-m,I-S).normalize(),t===In)s[5].setComponents(c+l,f+d,g+m,I+S).normalize();else if(t===vs)s[5].setComponents(l,d,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Di.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Di)}intersectsSprite(e){Di.center.set(0,0,0);let t=Vp.distanceTo(e.center);return Di.radius=.7071067811865476+t,Di.applyMatrix4(e.matrixWorld),this.intersectsSphere(Di)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Bo.x=s.normal.x>0?e.max.x:e.min.x,Bo.y=s.normal.y>0?e.max.y:e.min.y,Bo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Bo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Du=new Ye,ia=class i{constructor(){this.coordinateSystem=In,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];Du.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new vi),n[s].setFromProjectionMatrix(Du,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new vi),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}};var Rr=class extends gn{constructor(e=[],t=Wi,n,s,r,o,a,l,c,h){super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Cr=class extends gn{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ci=class extends gn{constructor(e,t,n=kn,s,r,o,a=Jt,l=Jt,c,h=ai,u=1){if(h!==ai&&h!==hi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ms(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ir=class extends ci{constructor(e,t=kn,n=Wi,s,r,o=Jt,a=Jt,l,c=ai){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Pr=class extends gn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},en=class i extends Nt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,s,o,2),p("x","z","y",1,-1,e,n,-t,s,o,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new et(c,3)),this.setAttribute("normal",new et(h,3)),this.setAttribute("uv",new et(u,2));function p(_,m,g,y,b,S,I,A,x,E,L){let w=S/x,D=I/E,U=S/2,P=I/2,T=A/2,O=x+1,z=E+1,k=0,q=0,G=new C;for(let X=0;X<z;X++){let Q=X*D-P;for(let _e=0;_e<O;_e++){let Se=_e*w-U;G[_]=Se*y,G[m]=Q*b,G[g]=T,c.push(G.x,G.y,G.z),G[_]=0,G[m]=0,G[g]=A>0?1:-1,h.push(G.x,G.y,G.z),u.push(_e/x),u.push(1-X/E),k+=1}}for(let X=0;X<E;X++)for(let Q=0;Q<x;Q++){let _e=d+Q+O*X,Se=d+Q+O*(X+1),J=d+(Q+1)+O*(X+1),le=d+(Q+1)+O*X;l.push(_e,Se,le),l.push(Se,J,le),q+=6}a.addGroup(f,q,L),f+=q,d+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var yi=class i extends Nt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],p=0,_=[],m=n/2,g=0;y(),o===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new et(u,3)),this.setAttribute("normal",new et(d,3)),this.setAttribute("uv",new et(f,2));function y(){let S=new C,I=new C,A=0,x=(t-e)/n;for(let E=0;E<=r;E++){let L=[],w=E/r,D=w*(t-e)+e;for(let U=0;U<=s;U++){let P=U/s,T=P*l+a,O=Math.sin(T),z=Math.cos(T);I.x=D*O,I.y=-w*n+m,I.z=D*z,u.push(I.x,I.y,I.z),S.set(O,x,z).normalize(),d.push(S.x,S.y,S.z),f.push(P,1-w),L.push(p++)}_.push(L)}for(let E=0;E<s;E++)for(let L=0;L<r;L++){let w=_[L][E],D=_[L+1][E],U=_[L+1][E+1],P=_[L][E+1];(e>0||L!==0)&&(h.push(w,D,P),A+=3),(t>0||L!==r-1)&&(h.push(D,U,P),A+=3)}c.addGroup(g,A,0),g+=A}function b(S){let I=p,A=new re,x=new C,E=0,L=S===!0?e:t,w=S===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,m*w,0),d.push(0,w,0),f.push(.5,.5),p++;let D=p;for(let U=0;U<=s;U++){let T=U/s*l+a,O=Math.cos(T),z=Math.sin(T);x.x=L*z,x.y=m*w,x.z=L*O,u.push(x.x,x.y,x.z),d.push(0,w,0),A.x=O*.5+.5,A.y=z*.5*w+.5,f.push(A.x,A.y),p++}for(let U=0;U<s;U++){let P=I+U,T=D+U;S===!0?h.push(T,T+1,P):h.push(T+1,T,P),E+=3}c.addGroup(g,E,S===!0?1:2),g+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var wn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ke("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new re:new C);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new C,s=[],r=[],o=[],a=new C,l=new Ye;for(let f=0;f<=e;f++){let p=f/e;s[f]=this.getTangentAt(p,new C)}r[0]=new C,o[0]=new C;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(Ke(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Ke(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],f*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},Rs=class extends wn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new re){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},sa=class extends Rs{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function $c(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var Nu=new C,Uu=new C,ic=new $c,sc=new $c,rc=new $c,ln=class extends wn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new C){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Uu.subVectors(s[0],s[1]).add(s[0]),c=Uu);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Nu.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Nu),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),m<1e-4&&(m=_),ic.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,_,m),sc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,_,m),rc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,_,m)}else this.curveType==="catmullrom"&&(ic.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),sc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),rc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(ic.calc(l),sc.calc(l),rc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new C().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Fu(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function Wp(i,e){let t=1-i;return t*t*e}function Xp(i,e){return 2*(1-i)*i*e}function qp(i,e){return i*i*e}function dr(i,e,t,n){return Wp(i,e)+Xp(i,t)+qp(i,n)}function Yp(i,e){let t=1-i;return t*t*t*e}function Zp(i,e){let t=1-i;return 3*t*t*i*e}function Jp(i,e){return 3*(1-i)*i*i*e}function $p(i,e){return i*i*i*e}function fr(i,e,t,n,s){return Yp(i,e)+Zp(i,t)+Jp(i,n)+$p(i,s)}var Lr=class extends wn{constructor(e=new re,t=new re,n=new re,s=new re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new re){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(fr(e,s.x,r.x,o.x,a.x),fr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ra=class extends wn{constructor(e=new C,t=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new C){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(fr(e,s.x,r.x,o.x,a.x),fr(e,s.y,r.y,o.y,a.y),fr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Dr=class extends wn{constructor(e=new re,t=new re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new re){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},oa=class extends wn{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Nr=class extends wn{constructor(e=new re,t=new re,n=new re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new re){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(dr(e,s.x,r.x,o.x),dr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ur=class extends wn{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(dr(e,s.x,r.x,o.x),dr(e,s.y,r.y,o.y),dr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Fr=class extends wn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new re){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Fu(a,l.x,c.x,h.x,u.x),Fu(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new re().fromArray(s))}return this}},uc=Object.freeze({__proto__:null,ArcCurve:sa,CatmullRomCurve3:ln,CubicBezierCurve:Lr,CubicBezierCurve3:ra,EllipseCurve:Rs,LineCurve:Dr,LineCurve3:oa,QuadraticBezierCurve:Nr,QuadraticBezierCurve3:Ur,SplineCurve:Fr}),aa=class extends wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new uc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new uc[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},Or=class extends aa{constructor(e){super(),this.type="Path",this.currentPoint=new re,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Dr(this.currentPoint.clone(),new re(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new Nr(this.currentPoint.clone(),new re(e,t),new re(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new Lr(this.currentPoint.clone(),new re(e,t),new re(n,s),new re(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Fr(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){let c=new Rs(e,t,n,s,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Mi=class extends Or{constructor(e){super(e),this.uuid=ui(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Or().fromJSON(s))}return this}};function Kp(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Dd(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=nm(i,e,r,t)),i.length>80*t){a=i[0],l=i[1];let h=a,u=l;for(let d=t;d<s;d+=t){let f=i[d],p=i[d+1];f<a&&(a=f),p<l&&(l=p),f>h&&(h=f),p>u&&(u=p)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return Br(r,o,t,a,l,c,0),o}function Dd(i,e,t,n,s){let r;if(s===fm(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=Ou(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Ou(o/n|0,i[o],i[o+1],r);return r&&Cs(r,r.next)&&(kr(r),r=r.next),r}function Oi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Cs(t,t.next)||Dt(t.prev,t,t.next)===0)){if(kr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Br(i,e,t,n,s,r,o){if(!i)return;!o&&r&&am(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?jp(i,n,s,r):Qp(i)){e.push(l.i,i.i,c.i),kr(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=em(Oi(i),e),Br(i,e,t,n,s,r,2)):o===2&&tm(i,e,t,n,s,r):Br(Oi(i),e,t,n,s,r,1);break}}}function Qp(i){let e=i.prev,t=i,n=i.next;if(Dt(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(s,r,o),u=Math.min(a,l,c),d=Math.max(s,r,o),f=Math.max(a,l,c),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&cr(s,a,r,l,o,c,p.x,p.y)&&Dt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function jp(i,e,t,n){let s=i.prev,r=i,o=i.next;if(Dt(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,d=o.y,f=Math.min(a,l,c),p=Math.min(h,u,d),_=Math.max(a,l,c),m=Math.max(h,u,d),g=dc(f,p,e,t,n),y=dc(_,m,e,t,n),b=i.prevZ,S=i.nextZ;for(;b&&b.z>=g&&S&&S.z<=y;){if(b.x>=f&&b.x<=_&&b.y>=p&&b.y<=m&&b!==s&&b!==o&&cr(a,h,l,u,c,d,b.x,b.y)&&Dt(b.prev,b,b.next)>=0||(b=b.prevZ,S.x>=f&&S.x<=_&&S.y>=p&&S.y<=m&&S!==s&&S!==o&&cr(a,h,l,u,c,d,S.x,S.y)&&Dt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;b&&b.z>=g;){if(b.x>=f&&b.x<=_&&b.y>=p&&b.y<=m&&b!==s&&b!==o&&cr(a,h,l,u,c,d,b.x,b.y)&&Dt(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;S&&S.z<=y;){if(S.x>=f&&S.x<=_&&S.y>=p&&S.y<=m&&S!==s&&S!==o&&cr(a,h,l,u,c,d,S.x,S.y)&&Dt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function em(i,e){let t=i;do{let n=t.prev,s=t.next.next;!Cs(n,s)&&Ud(n,t,t.next,s)&&zr(n,s)&&zr(s,n)&&(e.push(n.i,t.i,s.i),kr(t),kr(t.next),t=i=s),t=t.next}while(t!==i);return Oi(t)}function tm(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&hm(o,a)){let l=Fd(o,a);o=Oi(o,o.next),l=Oi(l,l.next),Br(o,e,t,n,s,r,0),Br(l,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function nm(i,e,t,n){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:i.length,c=Dd(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(cm(c))}s.sort(im);for(let r=0;r<s.length;r++)t=sm(s[r],t);return t}function im(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function sm(i,e){let t=rm(i,e);if(!t)return e;let n=Fd(t,i);return Oi(n,n.next),Oi(t,t.next)}function rm(i,e){let t=e,n=i.x,s=i.y,r=-1/0,o;if(Cs(i,t))return t;do{if(Cs(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Nd(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let u=Math.abs(s-t.y)/(n-t.x);zr(t,i)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&om(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function om(i,e){return Dt(i.prev,i,e.prev)<0&&Dt(e.next,i,i.next)<0}function am(i,e,t,n){let s=i;do s.z===0&&(s.z=dc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,lm(s)}function lm(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function dc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function cm(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Nd(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function cr(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&Nd(i,e,t,n,s,r,o,a)}function hm(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!um(i,e)&&(zr(i,e)&&zr(e,i)&&dm(i,e)&&(Dt(i.prev,i,e.prev)||Dt(i,e.prev,e))||Cs(i,e)&&Dt(i.prev,i,i.next)>0&&Dt(e.prev,e,e.next)>0)}function Dt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Cs(i,e){return i.x===e.x&&i.y===e.y}function Ud(i,e,t,n){let s=ko(Dt(i,e,t)),r=ko(Dt(i,e,n)),o=ko(Dt(t,n,i)),a=ko(Dt(t,n,e));return!!(s!==r&&o!==a||s===0&&zo(i,t,e)||r===0&&zo(i,n,e)||o===0&&zo(t,i,n)||a===0&&zo(t,e,n))}function zo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ko(i){return i>0?1:i<0?-1:0}function um(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Ud(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function zr(i,e){return Dt(i.prev,i,i.next)<0?Dt(i,e,i.next)>=0&&Dt(i,i.prev,e)>=0:Dt(i,e,i.prev)<0||Dt(i,i.next,e)<0}function dm(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Fd(i,e){let t=fc(i.i,i.x,i.y),n=fc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Ou(i,e,t,n){let s=fc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function kr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function fc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function fm(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var pc=class{static triangulate(e,t,n=2){return Kp(e,t,n)}},ms=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Bu(e),zu(n,e);let o=e.length;t.forEach(Bu);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,zu(n,t[l]);let a=pc.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Bu(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function zu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Hr=class i extends Nt{constructor(e=[new re(0,-.5),new re(.5,0),new re(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Ke(s,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/t,u=new C,d=new re,f=new C,p=new C,_=new C,m=0,g=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:m=e[y+1].x-e[y].x,g=e[y+1].y-e[y].y,f.x=g*1,f.y=-m,f.z=g*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:_.normalize(),l.push(_.x,_.y,_.z);break;default:m=e[y+1].x-e[y].x,g=e[y+1].y-e[y].y,f.x=g*1,f.y=-m,f.z=g*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(p)}for(let y=0;y<=t;y++){let b=n+y*h*s,S=Math.sin(b),I=Math.cos(b);for(let A=0;A<=e.length-1;A++){u.x=e[A].x*S,u.y=e[A].y,u.z=e[A].x*I,o.push(u.x,u.y,u.z),d.x=y/t,d.y=A/(e.length-1),a.push(d.x,d.y);let x=l[3*A+0]*S,E=l[3*A+1],L=l[3*A+0]*I;c.push(x,E,L)}}for(let y=0;y<t;y++)for(let b=0;b<e.length-1;b++){let S=b+y*e.length,I=S,A=S+e.length,x=S+e.length+1,E=S+1;r.push(I,A,E),r.push(x,E,A)}this.setIndex(r),this.setAttribute("position",new et(o,3)),this.setAttribute("uv",new et(a,2)),this.setAttribute("normal",new et(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}};var bt=class i extends Nt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=e/a,d=t/l,f=[],p=[],_=[],m=[];for(let g=0;g<h;g++){let y=g*d-o;for(let b=0;b<c;b++){let S=b*u-r;p.push(S,-y,0),_.push(0,0,1),m.push(b/a),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let y=0;y<a;y++){let b=y+c*g,S=y+c*(g+1),I=y+1+c*(g+1),A=y+1+c*g;f.push(b,S,A),f.push(S,I,A)}this.setIndex(f),this.setAttribute("position",new et(p,3)),this.setAttribute("normal",new et(_,3)),this.setAttribute("uv",new et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Gr=class i extends Nt{constructor(e=new Mi([new re(0,.5),new re(-.5,-.5),new re(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],s=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new et(s,3)),this.setAttribute("normal",new et(r,3)),this.setAttribute("uv",new et(o,2));function c(h){let u=s.length/3,d=h.extractPoints(t),f=d.shape,p=d.holes;ms.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,g=p.length;m<g;m++){let y=p[m];ms.isClockWise(y)===!0&&(p[m]=y.reverse())}let _=ms.triangulateShape(f,p);for(let m=0,g=p.length;m<g;m++){let y=p[m];f=f.concat(y)}for(let m=0,g=f.length;m<g;m++){let y=f[m];s.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let m=0,g=_.length;m<g;m++){let y=_[m],b=y[0]+u,S=y[1]+u,I=y[2]+u;n.push(b,S,I),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return pm(t,e)}static fromJSON(e,t){let n=[];for(let s=0,r=e.shapes.length;s<r;s++){let o=t[e.shapes[s]];n.push(o)}return new i(n,e.curveSegments)}};function pm(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}var Bi=class i extends Nt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new C,d=new C,f=[],p=[],_=[],m=[];for(let g=0;g<=n;g++){let y=[],b=g/n,S=o+b*a,I=e*Math.cos(S),A=Math.sqrt(e*e-I*I),x=0;g===0&&o===0?x=.5/t:g===n&&l===Math.PI&&(x=-.5/t);for(let E=0;E<=t;E++){let L=E/t,w=s+L*r;u.x=-A*Math.cos(w),u.y=I,u.z=A*Math.sin(w),p.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(L+x,1-b),y.push(c++)}h.push(y)}for(let g=0;g<n;g++)for(let y=0;y<t;y++){let b=h[g][y+1],S=h[g][y],I=h[g+1][y],A=h[g+1][y+1];(g!==0||o>0)&&f.push(b,S,A),(g!==n-1||l<Math.PI)&&f.push(S,I,A)}this.setIndex(f),this.setAttribute("position",new et(p,3)),this.setAttribute("normal",new et(_,3)),this.setAttribute("uv",new et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Is=class i extends Nt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],u=[],d=new C,f=new C,p=new C;for(let _=0;_<=n;_++){let m=o+_/n*a;for(let g=0;g<=s;g++){let y=g/s*r;f.x=(e+t*Math.cos(m))*Math.cos(y),f.y=(e+t*Math.cos(m))*Math.sin(y),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(y),d.y=e*Math.sin(y),p.subVectors(f,d).normalize(),h.push(p.x,p.y,p.z),u.push(g/s),u.push(_/n)}}for(let _=1;_<=n;_++)for(let m=1;m<=s;m++){let g=(s+1)*_+m-1,y=(s+1)*(_-1)+m-1,b=(s+1)*(_-1)+m,S=(s+1)*_+m;l.push(g,y,S),l.push(y,b,S)}this.setIndex(l),this.setAttribute("position",new et(c,3)),this.setAttribute("normal",new et(h,3)),this.setAttribute("uv",new et(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var Vr=class i extends Nt{constructor(e=new Ur(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new C,l=new C,c=new re,h=new C,u=[],d=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new et(u,3)),this.setAttribute("normal",new et(d,3)),this.setAttribute("uv",new et(f,2));function _(){for(let b=0;b<t;b++)m(b);m(r===!1?t:0),y(),g()}function m(b){h=e.getPointAt(b/t,h);let S=o.normals[b],I=o.binormals[b];for(let A=0;A<=s;A++){let x=A/s*Math.PI*2,E=Math.sin(x),L=-Math.cos(x);l.x=L*S.x+E*I.x,l.y=L*S.y+E*I.y,l.z=L*S.z+E*I.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function g(){for(let b=1;b<=t;b++)for(let S=1;S<=s;S++){let I=(s+1)*(b-1)+(S-1),A=(s+1)*b+(S-1),x=(s+1)*b+S,E=(s+1)*(b-1)+S;p.push(I,A,E),p.push(A,x,E)}}function y(){for(let b=0;b<=t;b++)for(let S=0;S<=s;S++)c.x=b/t,c.y=S/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new uc[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function qi(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(ku(s))s.isRenderTargetTexture?(ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(ku(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function cn(i){let e={};for(let t=0;t<i.length;t++){let n=qi(i[t]);for(let s in n)e[s]=n[s]}return e}function ku(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function mm(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Kc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}var hl={clone:qi,merge:cn},gm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,_n=class extends li{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gm,this.fragmentShader=xm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qi(e.uniforms),this.uniformsGroups=mm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Te().setHex(s.value);break;case"v2":this.uniforms[n].value=new re().fromArray(s.value);break;case"v3":this.uniforms[n].value=new C().fromArray(s.value);break;case"v4":this.uniforms[n].value=new mt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new We().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ye().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},la=class extends _n{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ps=class extends li{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ll,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},zi=class extends Ps{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new re(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ke(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Te(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Te(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Te(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Ni('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Ni('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ls=class extends li{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ca=class extends li{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function us(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Ho(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Si=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ha=class extends Si{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:lc,endingEnd:lc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case cc:r=e,a=2*t-n;break;case hc:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case cc:o=e,l=2*n-t;break;case hc:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(s-t),_=p*p,m=_*p,g=-d*m+2*d*_-d*p,y=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*p+1,b=(-1-f)*m+(1.5+f)*_+.5*p,S=f*m-f*_;for(let I=0;I!==a;++I)r[I]=g*o[h+I]+y*o[c+I]+b*o[l+I]+S*o[u+I];return r}},ua=class extends Si{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},da=class extends Si{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},fa=class extends Si{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(n-t)/(s-t),_=1-p;for(let m=0;m!==a;++m)r[m]=o[c+m]*_+o[l+m]*p;return r}let d=a*2,f=e-1;for(let p=0;p!==a;++p){let _=o[c+p],m=o[l+p],g=f*d+p*2,y=u[g],b=u[g+1],S=e*d+p*2,I=h[S],A=h[S+1],x=vm(n,t,y,I,s);r[p]=Od(x,_,b,A,m)}return r}};function Od(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function _m(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function vm(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let a=Od(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;let l=_m(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var Tn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=us(t,this.TimeBufferType),this.values=us(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:us(e.times,Array),values:us(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Ho(e.settings)&&(n.settings={inTangents:us(e.settings.inTangents,Array),outTangents:us(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new da(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ua(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ha(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new fa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case pr:t=this.InterpolantFactoryMethodDiscrete;break;case jo:t=this.InterpolantFactoryMethodLinear;break;case Wo:t=this.InterpolantFactoryMethodSmooth;break;case ac:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return ke("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return pr;case this.InterpolantFactoryMethodLinear:return jo;case this.InterpolantFactoryMethodSmooth:return Wo;case this.InterpolantFactoryMethodBezier:return ac}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;Ho(this.settings)&&(Hu(this.settings.inTangents,e),Hu(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Ho(this.settings)&&(Gu(this.settings.inTangents,e),Gu(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(He("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(He("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){He("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){He("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&cp(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){He("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Wo,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(s)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){let _=t[u+p];if(_!==t[d+p]||_!==t[f+p]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Ho(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Hu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function Gu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Tn.prototype.ValueTypeName="";Tn.prototype.TimeBufferType=Float32Array;Tn.prototype.ValueBufferType=Float32Array;Tn.prototype.DefaultInterpolation=jo;var bi=class extends Tn{constructor(e,t,n){super(e,t,n)}};bi.prototype.ValueTypeName="bool";bi.prototype.ValueBufferType=Array;bi.prototype.DefaultInterpolation=pr;bi.prototype.InterpolantFactoryMethodLinear=void 0;bi.prototype.InterpolantFactoryMethodSmooth=void 0;var pa=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}};pa.prototype.ValueTypeName="color";var ma=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}};ma.prototype.ValueTypeName="number";var ga=class extends Si{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t),c=e*a;for(let h=c+a;c!==h;c+=4)an.slerpFlat(r,0,o,c-a,o,c,l);return r}},Wr=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new ga(this.times,this.values,this.getValueSize(),e)}};Wr.prototype.ValueTypeName="quaternion";Wr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ei=class extends Tn{constructor(e,t,n){super(e,t,n)}};Ei.prototype.ValueTypeName="string";Ei.prototype.ValueBufferType=Array;Ei.prototype.DefaultInterpolation=pr;Ei.prototype.InterpolantFactoryMethodLinear=void 0;Ei.prototype.InterpolantFactoryMethodSmooth=void 0;var xa=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}};xa.prototype.ValueTypeName="vector";var _a=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Bd=new _a,va=class{constructor(e){this.manager=e!==void 0?e:Bd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};va.DEFAULT_MATERIAL_NAME="__DEFAULT";var ki=class extends Vt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Te(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ds=class extends ki{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Te(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},oc=new Ye,Vu=new C,Wu=new C,Ns=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.mapType=vn,this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vi,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Vu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Vu),Wu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Wu),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){oc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(oc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===vs||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(oc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Go=new C,Vo=new an,Xn=new C,Xr=class extends Vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=In,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Go,Vo,Xn),Xn.x===1&&Xn.y===1&&Xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Go,Vo,Xn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Go,Vo,Xn),Xn.x===1&&Xn.y===1&&Xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Go,Vo,Xn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},_i=new C,Xu=new re,qu=new re,jt=class extends Xr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ui*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(hr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ui*2*Math.atan(Math.tan(hr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){_i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(_i.x,_i.y).multiplyScalar(-e/_i.z),_i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(_i.x,_i.y).multiplyScalar(-e/_i.z)}getViewSize(e,t){return this.getViewBounds(e,Xu,qu),t.subVectors(qu,Xu)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(hr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},mc=class extends Ns{constructor(){super(new jt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Ui*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},qr=class extends ki{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Vt.DEFAULT_UP),this.updateMatrix(),this.target=new Vt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new mc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},gc=class extends Ns{constructor(){super(new jt(90,1,.5,500)),this.isPointLightShadow=!0}},Us=class extends ki{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new gc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Yr=class extends Xr{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},xc=class extends Ns{constructor(){super(new Yr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Fs=class extends ki{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Vt.DEFAULT_UP),this.updateMatrix(),this.target=new Vt,this.shadow=new xc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ds=-90,fs=1,Os=class extends Vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new jt(ds,fs,e,t);s.layers=this.layers,this.add(s);let r=new jt(ds,fs,e,t);r.layers=this.layers,this.add(r);let o=new jt(ds,fs,e,t);o.layers=this.layers,this.add(o);let a=new jt(ds,fs,e,t);a.layers=this.layers,this.add(a);let l=new jt(ds,fs,e,t);l.layers=this.layers,this.add(l);let c=new jt(ds,fs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===In)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===vs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=_,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ya=class extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var Qc="\\[\\]\\.:\\/",ym=new RegExp("["+Qc+"]","g"),jc="[^"+Qc+"]",Mm="[^"+Qc.replace("\\.","")+"]",Sm=/((?:WC+[\/:])*)/.source.replace("WC",jc),bm=/(WCOD+)?/.source.replace("WCOD",Mm),Em=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",jc),wm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",jc),Tm=new RegExp("^"+Sm+bm+Em+wm+"$"),Am=["material","materials","bones","map"],_c=class{constructor(e,t,n){let s=n||Ct.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ct=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ym,"")}static parseTrackName(e){let t=Tm.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Am.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){ke("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){He("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){He("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){He("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){He("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){He("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;He("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ct.Composite=_c;Ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ct.prototype.GetterByBindingType=[Ct.prototype._getValue_direct,Ct.prototype._getValue_array,Ct.prototype._getValue_arrayElement,Ct.prototype._getValue_toArray];Ct.prototype.SetterByBindingTypeAndVersioning=[[Ct.prototype._setValue_direct,Ct.prototype._setValue_direct_setNeedsUpdate,Ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_array,Ct.prototype._setValue_array_setNeedsUpdate,Ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_arrayElement,Ct.prototype._setValue_arrayElement_setNeedsUpdate,Ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_fromArray,Ct.prototype._setValue_fromArray_setNeedsUpdate,Ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Gv=new Float32Array(1);var Yu=new Ye,Zr=class{constructor(e,t,n=0,s=1/0){this.ray=new wr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Ss,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):He("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Yu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Yu),this}intersectObject(e,t=!0,n=[]){return vc(e,this,n,t),n.sort(Zu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)vc(e[s],this,n,t);return n.sort(Zu),n}};function Zu(i,e){return i.distance-e.distance}function vc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)vc(r[o],e,t,!0)}}var rh=class rh{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};rh.prototype.isMatrix2=!0;var yc=rh;function eh(i,e,t,n){let s=Rm(n);switch(t){case Bc:return i*e;case Ra:return i*e/s.components*s.byteLength;case Ca:return i*e/s.components*s.byteLength;case Ti:return i*e*2/s.components*s.byteLength;case Ia:return i*e*2/s.components*s.byteLength;case zc:return i*e*3/s.components*s.byteLength;case Hn:return i*e*4/s.components*s.byteLength;case Pa:return i*e*4/s.components*s.byteLength;case Kr:case Qr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case jr:case eo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Da:case Ua:return Math.max(i,16)*Math.max(e,8)/4;case La:case Na:return Math.max(i,8)*Math.max(e,8)/2;case Fa:case Oa:case za:case ka:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ba:case to:case Ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ga:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Va:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Wa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Xa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case qa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ya:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Za:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ja:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case $a:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ja:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case el:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case tl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case nl:case il:case sl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case rl:case ol:return Math.ceil(i/4)*Math.ceil(e/4)*8;case no:case al:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Rm(i){switch(i){case vn:case Nc:return{byteLength:1,components:1};case Gs:case Uc:case An:return{byteLength:2,components:1};case Ta:case Aa:return{byteLength:2,components:4};case kn:case wa:case Pn:return{byteLength:4,components:1};case Fc:case Oc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function af(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Dm(i){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){let p=u[d],_=u[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){let _=u[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Nm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Um=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Fm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Om=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,km=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Hm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Vm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ym=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Zm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Jm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$m=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,e0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,t0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,n0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,i0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,s0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,r0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,o0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,a0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,l0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,c0="gl_FragColor = linearToOutputTexel( gl_FragColor );",h0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,u0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,d0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,f0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,p0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,m0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,g0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,x0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,v0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,y0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,M0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,S0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,b0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,E0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,w0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,T0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,A0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,R0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,C0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,I0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,P0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,L0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,D0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,N0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,U0=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,F0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,O0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,B0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,z0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,k0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,H0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,G0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,V0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,W0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,X0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,q0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Y0=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Z0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,J0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,K0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Q0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,j0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ng=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ig=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,og=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ag=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,cg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ug=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,gg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,xg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,_g=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,vg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Mg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,bg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Eg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ag=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Rg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Cg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Lg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Dg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ng=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ug=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fg=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,kg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Hg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Gg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Vg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Yg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Zg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$g=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Qg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ex=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ix=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ox=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ax=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ux=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qe={alphahash_fragment:Nm,alphahash_pars_fragment:Um,alphamap_fragment:Fm,alphamap_pars_fragment:Om,alphatest_fragment:Bm,alphatest_pars_fragment:zm,aomap_fragment:km,aomap_pars_fragment:Hm,batching_pars_vertex:Gm,batching_vertex:Vm,begin_vertex:Wm,beginnormal_vertex:Xm,bsdfs:qm,iridescence_fragment:Ym,bumpmap_pars_fragment:Zm,clipping_planes_fragment:Jm,clipping_planes_pars_fragment:$m,clipping_planes_pars_vertex:Km,clipping_planes_vertex:Qm,color_fragment:jm,color_pars_fragment:e0,color_pars_vertex:t0,color_vertex:n0,common:i0,defaultnormal_vertex:s0,displacementmap_pars_vertex:r0,displacementmap_vertex:o0,emissivemap_fragment:a0,emissivemap_pars_fragment:l0,colorspace_fragment:c0,colorspace_pars_fragment:h0,envmap_fragment:u0,envmap_common_pars_fragment:d0,envmap_pars_fragment:f0,envmap_pars_vertex:p0,envmap_physical_pars_fragment:w0,envmap_vertex:m0,fog_vertex:g0,fog_pars_vertex:x0,fog_fragment:_0,fog_pars_fragment:v0,gradientmap_pars_fragment:y0,lightmap_pars_fragment:M0,lights_lambert_fragment:S0,lights_lambert_pars_fragment:b0,lights_pars_begin:E0,lights_toon_fragment:T0,lights_toon_pars_fragment:A0,lights_phong_fragment:R0,lights_phong_pars_fragment:C0,lights_physical_fragment:I0,lights_physical_pars_fragment:P0,lights_fragment_begin:L0,lights_fragment_maps:D0,lights_fragment_end:N0,lightprobes_pars_fragment:U0,logdepthbuf_fragment:F0,logdepthbuf_pars_fragment:O0,logdepthbuf_pars_vertex:B0,logdepthbuf_vertex:z0,map_fragment:k0,map_pars_fragment:H0,map_particle_fragment:G0,map_particle_pars_fragment:V0,metalnessmap_fragment:W0,metalnessmap_pars_fragment:X0,morphinstance_vertex:q0,morphcolor_vertex:Y0,morphnormal_vertex:Z0,morphtarget_pars_vertex:J0,morphtarget_vertex:$0,normal_fragment_begin:K0,normal_fragment_maps:Q0,normal_pars_fragment:j0,normal_pars_vertex:eg,normal_vertex:tg,normalmap_pars_fragment:ng,clearcoat_normal_fragment_begin:ig,clearcoat_normal_fragment_maps:sg,clearcoat_pars_fragment:rg,iridescence_pars_fragment:og,opaque_fragment:ag,packing:lg,premultiplied_alpha_fragment:cg,project_vertex:hg,dithering_fragment:ug,dithering_pars_fragment:dg,roughnessmap_fragment:fg,roughnessmap_pars_fragment:pg,shadowmap_pars_fragment:mg,shadowmap_pars_vertex:gg,shadowmap_vertex:xg,shadowmask_pars_fragment:_g,skinbase_vertex:vg,skinning_pars_vertex:yg,skinning_vertex:Mg,skinnormal_vertex:Sg,specularmap_fragment:bg,specularmap_pars_fragment:Eg,tonemapping_fragment:wg,tonemapping_pars_fragment:Tg,transmission_fragment:Ag,transmission_pars_fragment:Rg,uv_pars_fragment:Cg,uv_pars_vertex:Ig,uv_vertex:Pg,worldpos_vertex:Lg,background_vert:Dg,background_frag:Ng,backgroundCube_vert:Ug,backgroundCube_frag:Fg,cube_vert:Og,cube_frag:Bg,depth_vert:zg,depth_frag:kg,distance_vert:Hg,distance_frag:Gg,equirect_vert:Vg,equirect_frag:Wg,linedashed_vert:Xg,linedashed_frag:qg,meshbasic_vert:Yg,meshbasic_frag:Zg,meshlambert_vert:Jg,meshlambert_frag:$g,meshmatcap_vert:Kg,meshmatcap_frag:Qg,meshnormal_vert:jg,meshnormal_frag:ex,meshphong_vert:tx,meshphong_frag:nx,meshphysical_vert:ix,meshphysical_frag:sx,meshtoon_vert:rx,meshtoon_frag:ox,points_vert:ax,points_frag:lx,shadow_vert:cx,shadow_frag:hx,sprite_vert:ux,sprite_frag:dx},ye={common:{diffuse:{value:new Te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Te(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},$n={basic:{uniforms:cn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:cn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Te(0)},envMapIntensity:{value:1}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:cn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Te(0)},specular:{value:new Te(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:cn([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:cn([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Te(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:cn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:cn([ye.points,ye.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:cn([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:cn([ye.common,ye.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:cn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:cn([ye.sprite,ye.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distance:{uniforms:cn([ye.common,ye.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distance_vert,fragmentShader:Qe.distance_frag},shadow:{uniforms:cn([ye.lights,ye.fog,{color:{value:new Te(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};$n.physical={uniforms:cn([$n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new We},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Te(0)},specularColor:{value:new Te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};var ul={r:0,b:0,g:0},fx=new Ye,lf=new We;lf.set(-1,0,0,0,1,0,0,0,1);function px(i,e,t,n,s,r){let o=new Te(0),a=s===!0?0:1,l,c,h=null,u=0,d=null;function f(y){let b=y.isScene===!0?y.background:null;if(b&&b.isTexture){let S=y.backgroundBlurriness>0;b=e.get(b,S)}return b}function p(y){let b=!1,S=f(y);S===null?m(o,a):S&&S.isColor&&(m(S,1),b=!0);let I=i.xr.getEnvironmentBlendMode();I==="additive"?t.buffers.color.setClear(0,0,0,1,r):I==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(y,b){let S=f(b);S&&S.isCubeTexture?(c===void 0&&(c=new Ut(new en(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:qi($n.backgroundCube.uniforms),vertexShader:$n.backgroundCube.vertexShader,fragmentShader:$n.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(I,A,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(fx.makeRotationFromEuler(b.backgroundRotation)).transpose(),S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(lf),c.material.toneMapped=rt.getTransfer(S.colorSpace)!==ut,(h!==S||u!==S.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=S,u=S.version,d=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Ut(new bt(2,2),new _n({name:"BackgroundMaterial",uniforms:qi($n.background.uniforms),vertexShader:$n.background.vertexShader,fragmentShader:$n.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=rt.getTransfer(S.colorSpace)!==ut,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||u!==S.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=S,u=S.version,d=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,b){y.getRGB(ul,Kc(i)),t.buffers.color.setClear(ul.r,ul.g,ul.b,b,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,b=1){o.set(y),a=b,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,m(o,a)},render:p,addToRenderList:_,dispose:g}}function mx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(D,U,P,T,O){let z=!1,k=u(D,T,P,U);r!==k&&(r=k,c(r.object)),z=f(D,T,P,O),z&&p(D,T,P,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,S(D,U,P,T),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return i.createVertexArray()}function c(D){return i.bindVertexArray(D)}function h(D){return i.deleteVertexArray(D)}function u(D,U,P,T){let O=T.wireframe===!0,z=n[U.id];z===void 0&&(z={},n[U.id]=z);let k=D.isInstancedMesh===!0?D.id:0,q=z[k];q===void 0&&(q={},z[k]=q);let G=q[P.id];G===void 0&&(G={},q[P.id]=G);let X=G[O];return X===void 0&&(X=d(l()),G[O]=X),X}function d(D){let U=[],P=[],T=[];for(let O=0;O<t;O++)U[O]=0,P[O]=0,T[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:P,attributeDivisors:T,object:D,attributes:{},index:null}}function f(D,U,P,T){let O=r.attributes,z=U.attributes,k=0,q=P.getAttributes();for(let G in q)if(q[G].location>=0){let Q=O[G],_e=z[G];if(_e===void 0&&(G==="instanceMatrix"&&D.instanceMatrix&&(_e=D.instanceMatrix),G==="instanceColor"&&D.instanceColor&&(_e=D.instanceColor)),Q===void 0||Q.attribute!==_e||_e&&Q.data!==_e.data)return!0;k++}return r.attributesNum!==k||r.index!==T}function p(D,U,P,T){let O={},z=U.attributes,k=0,q=P.getAttributes();for(let G in q)if(q[G].location>=0){let Q=z[G];Q===void 0&&(G==="instanceMatrix"&&D.instanceMatrix&&(Q=D.instanceMatrix),G==="instanceColor"&&D.instanceColor&&(Q=D.instanceColor));let _e={};_e.attribute=Q,Q&&Q.data&&(_e.data=Q.data),O[G]=_e,k++}r.attributes=O,r.attributesNum=k,r.index=T}function _(){let D=r.newAttributes;for(let U=0,P=D.length;U<P;U++)D[U]=0}function m(D){g(D,0)}function g(D,U){let P=r.newAttributes,T=r.enabledAttributes,O=r.attributeDivisors;P[D]=1,T[D]===0&&(i.enableVertexAttribArray(D),T[D]=1),O[D]!==U&&(i.vertexAttribDivisor(D,U),O[D]=U)}function y(){let D=r.newAttributes,U=r.enabledAttributes;for(let P=0,T=U.length;P<T;P++)U[P]!==D[P]&&(i.disableVertexAttribArray(P),U[P]=0)}function b(D,U,P,T,O,z,k){k===!0?i.vertexAttribIPointer(D,U,P,O,z):i.vertexAttribPointer(D,U,P,T,O,z)}function S(D,U,P,T){_();let O=T.attributes,z=P.getAttributes(),k=U.defaultAttributeValues;for(let q in z){let G=z[q];if(G.location>=0){let X=O[q];if(X===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(X=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(X=D.instanceColor)),X!==void 0){let Q=X.normalized,_e=X.itemSize,Se=e.get(X);if(Se===void 0)continue;let J=Se.buffer,le=Se.type,be=Se.bytesPerElement,Ee=le===i.INT||le===i.UNSIGNED_INT||X.gpuType===wa;if(X.isInterleavedBufferAttribute){let pe=X.data,Ae=pe.isInterleavedBuffer===!0?pe.stride:pe.itemSize,xt=X.offset;if(pe.isInstancedInterleavedBuffer||pe.isInstancedBufferAttribute){for(let Le=0;Le<G.locationSize;Le++)g(G.location+Le,pe.meshPerAttribute);D.isInstancedMesh!==!0&&T._maxInstanceCount===void 0&&(T._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Le=0;Le<G.locationSize;Le++)m(G.location+Le);i.bindBuffer(i.ARRAY_BUFFER,J);for(let Le=0;Le<G.locationSize;Le++)b(G.location+Le,_e/G.locationSize,le,Q,Ae*be,(xt+_e/G.locationSize*Le)*be,Ee)}else{if(X.isInstancedBufferAttribute){for(let pe=0;pe<G.locationSize;pe++)g(G.location+pe,X.meshPerAttribute);D.isInstancedMesh!==!0&&T._maxInstanceCount===void 0&&(T._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let pe=0;pe<G.locationSize;pe++)m(G.location+pe);i.bindBuffer(i.ARRAY_BUFFER,J);for(let pe=0;pe<G.locationSize;pe++)b(G.location+pe,_e/G.locationSize,le,Q,_e*be,_e/G.locationSize*pe*be,Ee)}}else if(k!==void 0){let Q=k[q];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(G.location,Q);break;case 3:i.vertexAttrib3fv(G.location,Q);break;case 4:i.vertexAttrib4fv(G.location,Q);break;default:i.vertexAttrib1fv(G.location,Q)}}}}y()}function I(){L();for(let D in n){let U=n[D];for(let P in U){let T=U[P];for(let O in T){let z=T[O];for(let k in z)h(z[k].object),delete z[k];delete T[O]}}delete n[D]}}function A(D){if(n[D.id]===void 0)return;let U=n[D.id];for(let P in U){let T=U[P];for(let O in T){let z=T[O];for(let k in z)h(z[k].object),delete z[k];delete T[O]}}delete n[D.id]}function x(D){for(let U in n){let P=n[U];for(let T in P){let O=P[T];if(O[D.id]===void 0)continue;let z=O[D.id];for(let k in z)h(z[k].object),delete z[k];delete O[D.id]}}}function E(D){for(let U in n){let P=n[U],T=D.isInstancedMesh===!0?D.id:0,O=P[T];if(O!==void 0){for(let z in O){let k=O[z];for(let q in k)h(k[q].object),delete k[q];delete O[z]}delete P[T],Object.keys(P).length===0&&delete n[U]}}}function L(){w(),o=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:w,dispose:I,releaseStatesOfGeometry:A,releaseStatesOfObject:E,releaseStatesOfProgram:x,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function gx(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function a(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function xx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let x=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(x){return!(x!==Hn&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(x){let E=x===An&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(x!==vn&&x!==Pn&&!E&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(ke("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&u===!0&&ke("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:S,maxSamples:I,samples:A}}function _x(i){let e=this,t=null,n=0,s=!1,r=!1,o=new bn,a=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let p=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,g=i.get(u);if(!s||p===null||p.length===0||r&&!m)r?h(null):c();else{let y=r?0:n,b=y*4,S=g.clippingState||null;l.value=S,S=h(p,d,b,f);for(let I=0;I!==b;++I)S[I]=t[I];g.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=l.value,p!==!0||m===null){let g=f+_*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<g)&&(m=new Float32Array(g));for(let b=0,S=f;b!==_;++b,S+=4)o.copy(u[b]).applyMatrix4(y,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}var ro=class extends xn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Rr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new en(5,5,5),r=new _n({name:"CubemapFromEquirect",uniforms:qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:Gi});r.uniforms.tEquirect.value=t;let o=new Ut(s,r),a=t.minFilter;return t.minFilter===zn&&(t.minFilter=mn),new Os(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},zd=256,vx=3,yx=20,cf=256,hf=16,Mx=3,Sx=new C,bx=new Te,Xs=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Os(1,10,null),this._boxMesh=new Ut(new en(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=Sx}=r,l=this._renderer;this._setSize(o);let c=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let u=l.autoClear,d=l.autoClearColor,f=l.autoClearDepth,p=l.autoClearStencil,_=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,_===null&&(e.background=l.getClearColor(bx));let m=new Os(n,s,h);return m.position.copy(a),m.update(l,e),l.autoClear=u,l.autoClearColor=d,l.autoClearDepth=f,l.autoClearStencil=p,e.background=_,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(zd,Yc(e))}_fromTexture(e,t){e.mapping===Wi||e.mapping===Hs?this._setSize(e.image.length===0?zd:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=kd(e,!1,!1),n=Math.log2(e)-vx;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=kd(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Wi||e.mapping===Hs?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gd()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Hd()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Ex(),this._integrationMaterial=wx());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/hf);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-Mx)r.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let l=a>0?Math.log2(t)+.5*Math.log2(6/(cf*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=l,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Tx());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};function kd(i,e,t){return new ro(i,{minFilter:zn,generateMipmaps:e,type:An,colorSpace:mr,depthBuffer:t})}function oo(i,e,t){return new _n({name:i,uniforms:e,vertexShader:Qe.cube_vert,fragmentShader:t,side:tn,blending:Gi,depthTest:!1,depthWrite:!1})}function Ex(){return oo("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${cf}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function wx(){return oo("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:hf}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Tx(){return oo("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${yx}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Hd(){return oo("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Gd(){return oo("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Ax(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===Sa||f===ba)if(e.has(d)){let p=e.get(d).texture;return a(p,d.mapping)}else{let p=d.image;if(p&&p.height>0){let _=new ro(p.height);return _.fromEquirectangularTexture(i,d),e.set(d,_),d.addEventListener("dispose",c),a(_.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let f=d.mapping,p=f===Sa||f===ba,_=f===Wi||f===Hs;if(p||_){let m=t.get(d),g=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return n===null&&(n=new Xs(i)),m=p?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{let y=d.image;return p&&y&&y.height>0||_&&y&&l(y)?(n===null&&(n=new Xs(i)),m=p?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function a(d,f){return f===Sa?d.mapping=Wi:f===ba&&(d.mapping=Hs),d}function l(d){let f=0,p=6;for(let _=0;_<p;_++)d[_]!==void 0&&f++;return f===p}function c(d){let f=d.target;f.removeEventListener("dispose",c);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Rx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Ni("WebGLRenderer: "+n+" extension not supported."),s}}}function Cx(i,e,t,n){let s={},r=new WeakMap,o=new FinalizationRegistry(p=>delete s[p]);function a(p){l(p.target)}function l(p){p.index!==null&&e.remove(p.index);for(let m in p.attributes)e.remove(p.attributes[m]);p.removeEventListener("dispose",a),delete s[p.id],o.unregister(p);let _=r.get(p);_&&(e.remove(_),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function c(p,_){return s[_.id]!==void 0||(_.addEventListener("dispose",a),s[_.id]=new WeakRef(_),o.register(_,_.id,_),t.memory.geometries++),_}function h(p){let _=p.attributes;for(let m in _)e.update(_[m],i.ARRAY_BUFFER)}function u(p){let _=p.index,m=p.attributes.position,g=0;if(m===void 0)return;let y=_!==null?_.array.length:m.array.length/3-1,b=m.count>=65535?Sr:Mr,S=new b(Math.ceil(y/3)*6,1),I=S.array;if(_!==null){let x=_.array;g=_.version;for(let E=0,L=0;E<y;E+=3){let w=x[E+0],D=x[E+1],U=x[E+2];I[L++]=w,I[L++]=D,I[L++]=D,I[L++]=U,I[L++]=U,I[L++]=w}}else{g=m.version;for(let x=0,E=0;x<y;x+=3){let L=x+0,w=x+1,D=x+2;I[E++]=L,I[E++]=w,I[E++]=w,I[E++]=D,I[E++]=D,I[E++]=L}}S.version=g;let A=r.get(p);A&&e.remove(A),r.set(p,S)}function d(p){let _=r.get(p);if(_){let m=p.index;m!==null&&_.version<m.version&&u(p)}else u(p);return r.get(p)}function f(){for(let p in s){let _=s[p].deref();_!==void 0&&l(_)}}return{get:c,update:h,getWireframeAttribute:d,dispose:f}}function Ix(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,d){i.drawElements(n,d,r,u*o),t.update(d,n,1)}function c(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,u*o,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let _=0;for(let m=0;m<f;m++)_+=d[m];t.update(_,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Px(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:He("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Lx(i,e,t){let n=new WeakMap,s=new mt;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let L=function(){x.dispose(),n.delete(a),a.removeEventListener("dispose",L)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],b=0;f===!0&&(b=1),p===!0&&(b=2),_===!0&&(b=3);let S=a.attributes.position.count*b,I=1;S>e.maxTextureSize&&(I=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);let A=new Float32Array(S*I*4*u),x=new vr(A,S,I,u);x.type=Pn,x.needsUpdate=!0;let E=b*4;for(let w=0;w<u;w++){let D=m[w],U=g[w],P=y[w],T=S*I*4*w;for(let O=0;O<D.count;O++){let z=O*E;f===!0&&(s.fromBufferAttribute(D,O),A[T+z+0]=s.x,A[T+z+1]=s.y,A[T+z+2]=s.z,A[T+z+3]=0),p===!0&&(s.fromBufferAttribute(U,O),A[T+z+4]=s.x,A[T+z+5]=s.y,A[T+z+6]=s.z,A[T+z+7]=0),_===!0&&(s.fromBufferAttribute(P,O),A[T+z+8]=s.x,A[T+z+9]=s.y,A[T+z+10]=s.z,A[T+z+11]=P.itemSize===4?s.w:1)}}d={count:u,texture:x,size:new re(S,I)},n.set(a,d),a.addEventListener("dispose",L)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Dx(i,e,t,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var Nx={[Ac]:"LINEAR_TONE_MAPPING",[Rc]:"REINHARD_TONE_MAPPING",[Cc]:"CINEON_TONE_MAPPING",[Jr]:"ACES_FILMIC_TONE_MAPPING",[Pc]:"AGX_TONE_MAPPING",[Lc]:"NEUTRAL_TONE_MAPPING",[Ic]:"CUSTOM_TONE_MAPPING"};function Ux(i,e,t,n,s,r){let o=new xn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=null,h=new Nt;h.setAttribute("position",new et([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new et([0,2,0,0,2,0],2));let u=new la({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Ut(h,u),f=new Yr(-1,1,1,-1,0,1),p=null,_=null,m=!1,g,y=null,b=[],S=!1;this.setSize=function(I,A){o.setSize(I,A),a!==null&&a.setSize(I,A),l!==null&&l.setSize(I,A);for(let x=0;x<b.length;x++){let E=b[x];E.setSize&&E.setSize(I,A)}},this.setEffects=function(I){b=I,S=b.length>0&&b[0].isRenderPass===!0;let A=o.width,x=o.height;b.length>0&&a===null&&(a=new xn(A,x,{type:An,depthBuffer:!1,stencilBuffer:!1}),l=new xn(A,x,{type:An,depthBuffer:!1,stencilBuffer:!1}));let E=s===!0&&b.some(L=>L.needsDepthTexture===!0);E!==(o.depthTexture!==null)&&(E===!0&&c===null&&(c=new ci(A,x),r===!0&&(c.format=hi,c.type=Xi)),o.dispose(),o.depthTexture=E?c:null,o.resolveDepthBuffer=E,o.storeMultisampledDepthBuffer=E);for(let L=0;L<b.length;L++){let w=b[L];w.setSize&&w.setSize(A,x),E&&w.needsDepthTexture===!0&&w.setDepthTexture&&w.setDepthTexture(c)}},this.begin=function(I,A){if(m||I.toneMapping===Zn&&b.length===0)return!1;if(y=A,A!==null){let x=A.width,E=A.height;(o.width!==x||o.height!==E)&&this.setSize(x,E)}return S===!1&&I.setRenderTarget(o),g=I.toneMapping,I.toneMapping=Zn,!0},this.hasRenderPass=function(){return S},this.end=function(I,A){I.toneMapping=g,m=!0;let x=o,E=a;for(let L=0;L<b.length;L++){let w=b[L];w.enabled!==!1&&(w.render(I,E,x,A),w.needsSwap!==!1&&(x=E,E=E===a?l:a))}if(p!==I.outputColorSpace||_!==I.toneMapping){p=I.outputColorSpace,_=I.toneMapping,u.defines={},rt.getTransfer(p)===ut&&(u.defines.SRGB_TRANSFER="");let L=Nx[_];L&&(u.defines[L]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=x.texture,I.setRenderTarget(y),I.render(d,f),y=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}var uf=new gn,df=new ci(1,1),ff=new Ir(1),pf=new vr,mf=new na,gf=new Rr,Vd=[],Wd=[],Xd=new Float32Array(16),qd=new Float32Array(9),Yd=new Float32Array(4);function qs(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Vd[s];if(r===void 0&&(r=new Float32Array(s),Vd[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Wt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Xt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function pl(i,e){let t=Wd[e];t===void 0&&(t=new Int32Array(e),Wd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Fx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ox(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2fv(this.addr,e),Xt(t,e)}}function Bx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;i.uniform3fv(this.addr,e),Xt(t,e)}}function zx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4fv(this.addr,e),Xt(t,e)}}function kx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Yd.set(n),i.uniformMatrix2fv(this.addr,!1,Yd),Xt(t,n)}}function Hx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;qd.set(n),i.uniformMatrix3fv(this.addr,!1,qd),Xt(t,n)}}function Gx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Xd.set(n),i.uniformMatrix4fv(this.addr,!1,Xd),Xt(t,n)}}function Vx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Wx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2iv(this.addr,e),Xt(t,e)}}function Xx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3iv(this.addr,e),Xt(t,e)}}function qx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4iv(this.addr,e),Xt(t,e)}}function Yx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Zx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2uiv(this.addr,e),Xt(t,e)}}function Jx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3uiv(this.addr,e),Xt(t,e)}}function $x(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4uiv(this.addr,e),Xt(t,e)}}function ml(i){return i.version===0&&(i.compareFunction=Vc,i.needsUpdate=!0),i}function Kx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=ml(df):r=uf,t.setTexture2D(e||r,s)}function Qx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||mf,s)}function jx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=ml(ff):r=gf,t.setTextureCube(e||r,s)}function e_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||pf,s)}function t_(i){switch(i){case 5126:return Fx;case 35664:return Ox;case 35665:return Bx;case 35666:return zx;case 35674:return kx;case 35675:return Hx;case 35676:return Gx;case 5124:case 35670:return Vx;case 35667:case 35671:return Wx;case 35668:case 35672:return Xx;case 35669:case 35673:return qx;case 5125:return Yx;case 36294:return Zx;case 36295:return Jx;case 36296:return $x;case 35678:case 36198:case 36298:case 36306:case 35682:return Kx;case 35679:case 36299:case 36307:return Qx;case 35680:case 36300:case 36308:case 36293:return jx;case 36289:case 36303:case 36311:case 36292:return e_}}function n_(i,e){i.uniform1fv(this.addr,e)}function i_(i,e){let t=qs(e,this.size,2);i.uniform2fv(this.addr,t)}function s_(i,e){let t=qs(e,this.size,3);i.uniform3fv(this.addr,t)}function r_(i,e){let t=qs(e,this.size,4);i.uniform4fv(this.addr,t)}function o_(i,e){let t=qs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function a_(i,e){let t=qs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function l_(i,e){let t=qs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function c_(i,e){i.uniform1iv(this.addr,e)}function h_(i,e){i.uniform2iv(this.addr,e)}function u_(i,e){i.uniform3iv(this.addr,e)}function d_(i,e){i.uniform4iv(this.addr,e)}function f_(i,e){i.uniform1uiv(this.addr,e)}function p_(i,e){i.uniform2uiv(this.addr,e)}function m_(i,e){i.uniform3uiv(this.addr,e)}function g_(i,e){i.uniform4uiv(this.addr,e)}function x_(i,e,t){let n=this.cache,s=e.length,r=pl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=ml(df):o=uf;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function __(i,e,t){let n=this.cache,s=e.length,r=pl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||mf,r[o])}function v_(i,e,t){let n=this.cache,s=e.length,r=pl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=ml(ff):o=gf;for(let a=0;a!==s;++a)t.setTextureCube(e[a]||o,r[a])}function y_(i,e,t){let n=this.cache,s=e.length,r=pl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||pf,r[o])}function M_(i){switch(i){case 5126:return n_;case 35664:return i_;case 35665:return s_;case 35666:return r_;case 35674:return o_;case 35675:return a_;case 35676:return l_;case 5124:case 35670:return c_;case 35667:case 35671:return h_;case 35668:case 35672:return u_;case 35669:case 35673:return d_;case 5125:return f_;case 36294:return p_;case 36295:return m_;case 36296:return g_;case 35678:case 36198:case 36298:case 36306:case 35682:return x_;case 35679:case 36299:case 36307:return __;case 35680:case 36300:case 36308:case 36293:return v_;case 36289:case 36303:case 36311:case 36292:return y_}}var lh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=t_(t.type)}},ch=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=M_(t.type)}},hh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},oh=/(\w+)(\])?(\[|\.)?/g;function Zd(i,e){i.seq.push(e),i.map[e.id]=e}function S_(i,e,t){let n=i.name,s=n.length;for(oh.lastIndex=0;;){let r=oh.exec(n),o=oh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Zd(t,c===void 0?new lh(a,i,e):new ch(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new hh(a),Zd(t,u)),t=u}}}var Ws=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);S_(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Jd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var b_=37297,E_=0;function w_(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var $d=new We;function T_(i){rt._getMatrix($d,rt.workingColorSpace,i);let e=`mat3( ${$d.elements.map(t=>t.toFixed(4))} )`;switch(rt.getTransfer(i)){case gr:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return ke("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Kd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+w_(i.getShaderSource(e),a)}else return r}function A_(i,e){let t=T_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var R_={[Ac]:"Linear",[Rc]:"Reinhard",[Cc]:"Cineon",[Jr]:"ACESFilmic",[Pc]:"AgX",[Lc]:"Neutral",[Ic]:"Custom"};function C_(i,e){let t=R_[e];return t===void 0?(ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var dl=new C;function I_(){rt.getLuminanceCoefficients(dl);let i=dl.x.toFixed(4),e=dl.y.toFixed(4),t=dl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function P_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(so).join(`
`)}function L_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function D_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function so(i){return i!==""}function Qd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function jd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var N_=/^[ \t]*#include +<([\w\d./]+)>/gm;function uh(i){return i.replace(N_,U_)}function U_(i,e){let t=Qe[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return uh(t)}var F_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ef(i){return i.replace(F_,O_)}function O_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function tf(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var B_={[Hi]:"SHADOWMAP_TYPE_PCF",[Bs]:"SHADOWMAP_TYPE_VSM"};function z_(i){return B_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var k_={[Hs]:"ENVMAP_MODE_REFRACTION"};function H_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":k_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var G_={[Tc]:"ENVMAP_BLENDING_MULTIPLY",[gd]:"ENVMAP_BLENDING_MIX",[xd]:"ENVMAP_BLENDING_ADD"};function V_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":G_[i.combine]||"ENVMAP_BLENDING_NONE"}function W_(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=z_(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=H_(t),u=V_(t),d=P_(t),f=L_(r),p=s.createProgram(),_,m,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(so).join(`
`),_.length>0&&(_+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(so).join(`
`),m.length>0&&(m+=`
`)):(_=[tf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(so).join(`
`),m=[tf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Zn?"#define TONE_MAPPING":"",t.toneMapping!==Zn?Qe.tonemapping_pars_fragment:"",t.toneMapping!==Zn?C_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,A_("linearToOutputTexel",t.outputColorSpace),I_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(so).join(`
`)),o=uh(o),o=Qd(o,t),o=jd(o,t),a=uh(a),a=Qd(a,t),a=jd(a,t),o=ef(o),a=ef(a),t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,_=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,m=["#define varying in",t.glslVersion===Xc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Xc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let y=g+_+o,b=g+m+a,S=Jd(s,s.VERTEX_SHADER,y),I=Jd(s,s.FRAGMENT_SHADER,b);s.attachShader(p,S),s.attachShader(p,I),t.index0AttributeName!==void 0?s.bindAttribLocation(p,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function A(w){if(i.debug.checkShaderErrors){let D=s.getProgramInfoLog(p)||"",U=s.getShaderInfoLog(S)||"",P=s.getShaderInfoLog(I)||"",T=D.trim(),O=U.trim(),z=P.trim(),k=!0,q=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,S,I);else{let G=Kd(s,S,"vertex"),X=Kd(s,I,"fragment");He("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+T+`
`+G+`
`+X)}else T!==""?ke("WebGLProgram: Program Info Log:",T):(O===""||z==="")&&(q=!1);q&&(w.diagnostics={runnable:k,programLog:T,vertexShader:{log:O,prefix:_},fragmentShader:{log:z,prefix:m}})}s.deleteShader(S),s.deleteShader(I),x=new Ws(s,p),E=D_(s,p)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(p,b_)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=E_++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=S,this.fragmentShader=I,this}var X_=0,dh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new fh(e),t.set(e,n)),n}},fh=class{constructor(e){this.id=X_++,this.code=e,this.usedTimes=0}};function q_(i){return i===Ti||i===to||i===no}function Y_(i,e,t,n,s,r){let o=new Ss,a=new dh,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(x){return l.add(x),x===0?"uv":`uv${x}`}function p(x,E,L,w,D,U){let P=w.fog,T=D.geometry,O=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?w.environment:null,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,k=e.get(x.envMap||O,z),q=d[x.type],G=n.precision;x.precision!==null&&(G=n.getMaxPrecision(x.precision),G!==x.precision&&ke("WebGLProgram.getParameters:",x.precision,"not supported, using",G,"instead."));let X=T.morphAttributes.position||T.morphAttributes.normal||T.morphAttributes.color,Q=X!==void 0?X.length:0,_e=0;T.morphAttributes.position!==void 0&&(_e=1),T.morphAttributes.normal!==void 0&&(_e=2),T.morphAttributes.color!==void 0&&(_e=3);let Se,J,le,be;if(q){let ve=$n[q];Se=ve.vertexShader,J=ve.fragmentShader}else{Se=x.vertexShader,J=x.fragmentShader;let ve=a.getVertexShaderStage(x),pt=a.getFragmentShaderStage(x);a.update(x,ve,pt),le=ve.id,be=pt.id}let Ee=i.getRenderTarget(),pe=i.state.buffers.depth.getReversed(),Ae=D.isInstancedMesh===!0,xt=D.isBatchedMesh===!0,Le=!!x.map,qe=!!x.matcap,je=!!k,Ge=je&&k.isPMREMTexture===!0,Tt=!!x.aoMap,ct=!!x.lightMap,Ot=!!x.bumpMap&&x.wireframe===!1,At=!!x.normalMap,Rn=!!x.displacementMap,Mt=!!x.emissiveMap,me=!!x.metalnessMap,Ue=!!x.roughnessMap,we=x.anisotropy>0,F=x.clearcoat>0,at=x.diffuseRoughness>0,Je=x.dispersion>0,ht=x.retroreflectivity>0,ce=x.iridescence>0,Rt=x.sheen>0,Oe=x.transmission>0,Ve=we&&!!x.anisotropyMap,R=F&&!!x.clearcoatMap,v=F&&!!x.clearcoatNormalMap,H=F&&!!x.clearcoatRoughnessMap,ne=at&&!!x.diffuseRoughnessMap,te=ce&&!!x.iridescenceMap,oe=ce&&!!x.iridescenceThicknessMap,ge=Rt&&!!x.sheenColorMap,K=Rt&&!!x.sheenRoughnessMap,j=!!x.specularMap,he=!!x.specularColorMap,N=!!x.specularIntensityMap,ee=Oe&&!!x.transmissionMap,$=Oe&&!!x.thicknessMap,ue=!!x.gradientMap,se=!!x.alphaMap,ae=x.alphaTest>0,Fe=!!x.alphaHash,$e=!!x.extensions,ie=Zn;x.toneMapped&&(Ee===null||Ee.isXRRenderTarget===!0)&&(ie=i.toneMapping);let Be=Ge?k.isCompressedCubeTexture?k.image[0].mipmaps:k.mipmaps:null,Ze={shaderID:q,shaderType:x.type,shaderName:x.name,vertexShader:Se,fragmentShader:J,defines:x.defines,customVertexShaderID:le,customFragmentShaderID:be,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:G,batching:xt,batchingColor:xt&&D._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&D.instanceColor!==null,instancingMorph:Ae&&D.morphTexture!==null,outputColorSpace:Ee===null?i.outputColorSpace:Ee.isXRRenderTarget===!0?Ee.texture.colorSpace:rt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Le,matcap:qe,envMap:je,envMapMode:je&&k.mapping,envMapPMREM:Ge,envMapMaxLod:Ge?Be.length-1:null,envMapSize:Ge?Be[0].width:null,aoMap:Tt,lightMap:ct,bumpMap:Ot,normalMap:At,displacementMap:Rn,emissiveMap:Mt,normalMapObjectSpace:At&&x.normalMapType===yd,normalMapTangentSpace:At&&x.normalMapType===ll,packedNormalMap:At&&x.normalMapType===ll&&q_(x.normalMap.format),metalnessMap:me,roughnessMap:Ue,anisotropy:we,anisotropyMap:Ve,clearcoat:F,clearcoatMap:R,clearcoatNormalMap:v,clearcoatRoughnessMap:H,diffuseRoughness:at,diffuseRoughnessMap:ne,dispersion:Je,retroreflection:ht,iridescence:ce,iridescenceMap:te,iridescenceThicknessMap:oe,sheen:Rt,sheenColorMap:ge,sheenRoughnessMap:K,specularMap:j,specularColorMap:he,specularIntensityMap:N,transmission:Oe,transmissionMap:ee,thicknessMap:$,gradientMap:ue,opaque:x.transparent===!1&&x.blending===zs&&x.alphaToCoverage===!1,alphaMap:se,alphaTest:ae,alphaHash:Fe,combine:x.combine,mapUv:Le&&f(x.map.channel),aoMapUv:Tt&&f(x.aoMap.channel),lightMapUv:ct&&f(x.lightMap.channel),bumpMapUv:Ot&&f(x.bumpMap.channel),normalMapUv:At&&f(x.normalMap.channel),displacementMapUv:Rn&&f(x.displacementMap.channel),emissiveMapUv:Mt&&f(x.emissiveMap.channel),metalnessMapUv:me&&f(x.metalnessMap.channel),roughnessMapUv:Ue&&f(x.roughnessMap.channel),anisotropyMapUv:Ve&&f(x.anisotropyMap.channel),clearcoatMapUv:R&&f(x.clearcoatMap.channel),clearcoatNormalMapUv:v&&f(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:H&&f(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ne&&f(x.diffuseRoughnessMap.channel),iridescenceMapUv:te&&f(x.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&f(x.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&f(x.sheenColorMap.channel),sheenRoughnessMapUv:K&&f(x.sheenRoughnessMap.channel),specularMapUv:j&&f(x.specularMap.channel),specularColorMapUv:he&&f(x.specularColorMap.channel),specularIntensityMapUv:N&&f(x.specularIntensityMap.channel),transmissionMapUv:ee&&f(x.transmissionMap.channel),thicknessMapUv:$&&f(x.thicknessMap.channel),alphaMapUv:se&&f(x.alphaMap.channel),vertexTangents:!!T.attributes.tangent&&(At||we),vertexNormals:!!T.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!T.attributes.color&&T.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!T.attributes.uv&&(Le||se),fog:!!P,useFog:x.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||T.attributes.normal===void 0&&At===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:pe,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:T.attributes.position!==void 0,morphTargets:T.morphAttributes.position!==void 0,morphNormals:T.morphAttributes.normal!==void 0,morphColors:T.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:_e,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:U.filter(ve=>ve.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:ie,decodeVideoTexture:Le&&x.map.isVideoTexture===!0&&rt.getTransfer(x.map.colorSpace)===ut,decodeVideoTextureEmissive:Mt&&x.emissiveMap.isVideoTexture===!0&&rt.getTransfer(x.emissiveMap.colorSpace)===ut,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Pt,flipSided:x.side===tn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:$e&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($e&&x.extensions.multiDraw===!0||xt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ze.vertexUv1s=l.has(1),Ze.vertexUv2s=l.has(2),Ze.vertexUv3s=l.has(3),l.clear(),Ze}function _(x){let E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(let L in x.defines)E.push(L),E.push(x.defines[L]);return x.isRawShaderMaterial===!1&&(m(E,x),g(E,x),E.push(i.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function m(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapPMREM),x.push(E.envMapMaxLod),x.push(E.envMapSize),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.diffuseRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.numSunLights),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numSunLightShadows),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.numLightProbeGrids),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function g(x,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.retroreflection&&o.enable(24),E.diffuseRoughness&&o.enable(25),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function y(x){let E=d[x.type],L;if(E){let w=$n[E];L=hl.clone(w.uniforms)}else L=x.uniforms;return L}function b(x,E){let L=h.get(E);return L!==void 0?++L.usedTimes:(L=new W_(i,E,x,s),c.push(L),h.set(E,L)),L}function S(x){if(--x.usedTimes===0){let E=c.indexOf(x);c[E]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function I(x){a.remove(x)}function A(){a.dispose()}return{getParameters:p,getProgramCacheKey:_,getUniforms:y,acquireProgram:b,releaseProgram:S,releaseShaderCache:I,programs:c,dispose:A}}function Z_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function J_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function nf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function sf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,p,_,m,g){let y=i[e];return y===void 0?(y={id:d.id,object:d,geometry:f,material:p,materialVariant:o(d),groupOrder:_,renderOrder:d.renderOrder,z:m,group:g},i[e]=y):(y.id=d.id,y.object=d,y.geometry=f,y.material=p,y.materialVariant=o(d),y.groupOrder=_,y.renderOrder=d.renderOrder,y.z=m,y.group=g),e++,y}function l(d,f,p,_,m,g,y){y.reversedDepth===!0&&(m=-m);let b=a(d,f,p,_,m,g);p.transmission>0?n.push(b):p.transparent===!0?s.push(b):t.push(b)}function c(d,f,p,_,m,g){let y=a(d,f,p,_,m,g);p.transmission>0?n.unshift(y):p.transparent===!0?s.unshift(y):t.unshift(y)}function h(d,f){t.length>1&&t.sort(d||J_),n.length>1&&n.sort(f||nf),s.length>1&&s.sort(f||nf)}function u(){for(let d=e,f=i.length;d<f;d++){let p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function $_(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new sf,i.set(n,[o])):s>=r.length?(o=new sf,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function K_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new C,color:new Te};break;case"SpotLight":t={position:new C,direction:new C,color:new Te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Te,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Te,groundColor:new Te};break;case"RectAreaLight":t={color:new Te,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function Q_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var j_=0;function ev(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function tv(i){let e=new K_,t=Q_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);let s=new C,r=new Ye,o=new Ye;function a(c){let h=0,u=0,d=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let f=0,p=0,_=0,m=0,g=0,y=0,b=0,S=0,I=0,A=0,x=0,E=0,L=0,w=0;c.sort(ev);for(let U=0,P=c.length;U<P;U++){let T=c[U],O=T.color,z=T.intensity,k=T.distance,q=null;if(T.shadow&&T.shadow.map&&(T.shadow.map.texture.format===Ti?q=T.shadow.map.texture:q=T.shadow.map.depthTexture||T.shadow.map.texture),T.isAmbientLight)h+=O.r*z,u+=O.g*z,d+=O.b*z;else if(T.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(T.sh.coefficients[G],z);w++}else if(T.isSunLight){let G=e.get(T);if(G.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let X=T.shadow,Q=t.get(T);Q.shadowIntensity=X.intensity,Q.shadowBias=X.bias,Q.shadowNormalBias=X.normalBias,Q.shadowRadius=X.radius,Q.shadowMapSize.copy(X.mapSize).multiply(X.getFrameExtents()),n.sunShadow[p]=Q,n.sunShadowMap[p]=q;let _e=X.getViewportCount();for(let Se=0;Se<_e;Se++)n.sunShadowMatrix[_+Se]=X.getMatrix(Se),n.sunShadowCascade[_+Se]=X._cascadeData[Se];_+=_e,p++}n.sun[f]=G,f++}else if(T.isDirectionalLight){let G=e.get(T);if(G.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let X=T.shadow,Q=t.get(T);Q.shadowIntensity=X.intensity,Q.shadowBias=X.bias,Q.shadowNormalBias=X.normalBias,Q.shadowRadius=X.radius,Q.shadowMapSize=X.mapSize,n.directionalShadow[m]=Q,n.directionalShadowMap[m]=q,n.directionalShadowMatrix[m]=T.shadow.matrix,I++}n.directional[m]=G,m++}else if(T.isSpotLight){let G=e.get(T);G.position.setFromMatrixPosition(T.matrixWorld),G.color.copy(O).multiplyScalar(z),G.distance=k,G.coneCos=Math.cos(T.angle),G.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),G.decay=T.decay,n.spot[y]=G;let X=T.shadow;if(T.map&&(n.spotLightMap[E]=T.map,E++,X.updateMatrices(T),T.castShadow&&L++),n.spotLightMatrix[y]=X.matrix,T.castShadow){let Q=t.get(T);Q.shadowIntensity=X.intensity,Q.shadowBias=X.bias,Q.shadowNormalBias=X.normalBias,Q.shadowRadius=X.radius,Q.shadowMapSize=X.mapSize,n.spotShadow[y]=Q,n.spotShadowMap[y]=q,x++}y++}else if(T.isRectAreaLight){let G=e.get(T);G.color.copy(O).multiplyScalar(z),G.halfWidth.set(T.width*.5,0,0),G.halfHeight.set(0,T.height*.5,0),n.rectArea[b]=G,b++}else if(T.isPointLight){let G=e.get(T);if(G.color.copy(T.color).multiplyScalar(T.intensity),G.distance=T.distance,G.decay=T.decay,T.castShadow){let X=T.shadow,Q=t.get(T);Q.shadowIntensity=X.intensity,Q.shadowBias=X.bias,Q.shadowNormalBias=X.normalBias,Q.shadowRadius=X.radius,Q.shadowMapSize=X.mapSize,Q.shadowCameraNear=X.camera.near,Q.shadowCameraFar=X.camera.far,n.pointShadow[g]=Q,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=T.shadow.matrix,A++}n.point[g]=G,g++}else if(T.isHemisphereLight){let G=e.get(T);G.skyColor.copy(T.color).multiplyScalar(z),G.groundColor.copy(T.groundColor).multiplyScalar(z),n.hemi[S]=G,S++}}b>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let D=n.hash;(D.sunLength!==f||D.directionalLength!==m||D.pointLength!==g||D.spotLength!==y||D.rectAreaLength!==b||D.hemiLength!==S||D.numSunShadows!==p||D.numDirectionalShadows!==I||D.numPointShadows!==A||D.numSpotShadows!==x||D.numSpotMaps!==E||D.numLightProbes!==w)&&(n.sun.length=f,n.directional.length=m,n.spot.length=y,n.rectArea.length=b,n.point.length=g,n.hemi.length=S,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=I,n.directionalShadowMap.length=I,n.directionalShadowMatrix.length=I,n.pointShadow.length=A,n.pointShadowMap.length=A,n.pointShadowMatrix.length=A,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+E-L,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=L,n.numLightProbes=w,D.sunLength=f,D.directionalLength=m,D.pointLength=g,D.spotLength=y,D.rectAreaLength=b,D.hemiLength=S,D.numSunShadows=p,D.numDirectionalShadows=I,D.numPointShadows=A,D.numSpotShadows=x,D.numSpotMaps=E,D.numLightProbes=w,n.version=j_++)}function l(c,h){let u=0,d=0,f=0,p=0,_=0,m=0,g=h.matrixWorldInverse;for(let y=0,b=c.length;y<b;y++){let S=c[y];if(S.isSunLight){let I=n.sun[u];I.direction.setFromMatrixPosition(S.matrixWorld),I.direction.transformDirection(g),u++}else if(S.isDirectionalLight){let I=n.directional[d];I.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(g),d++}else if(S.isSpotLight){let I=n.spot[p];I.position.setFromMatrixPosition(S.matrixWorld),I.position.applyMatrix4(g),I.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(g),p++}else if(S.isRectAreaLight){let I=n.rectArea[_];I.position.setFromMatrixPosition(S.matrixWorld),I.position.applyMatrix4(g),o.identity(),r.copy(S.matrixWorld),r.premultiply(g),o.extractRotation(r),I.halfWidth.set(S.width*.5,0,0),I.halfHeight.set(0,S.height*.5,0),I.halfWidth.applyMatrix4(o),I.halfHeight.applyMatrix4(o),_++}else if(S.isPointLight){let I=n.point[f];I.position.setFromMatrixPosition(S.matrixWorld),I.position.applyMatrix4(g),f++}else if(S.isHemisphereLight){let I=n.hemi[m];I.direction.setFromMatrixPosition(S.matrixWorld),I.direction.transformDirection(g),m++}}}return{setup:a,setupView:l,state:n}}function rf(i){let e=new tv(i),t=[],n=[],s=[];function r(u){h.camera=u,t.length=0,n.length=0,s.length=0}function o(u){u.isLightProbeGrid?s.push(u):t.push(u)}function a(u){n.push(u)}function l(){e.setup(t),s.sort((u,d)=>u.priority-d.priority||u.id-d.id)}function c(u){e.setupView(t,u)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function nv(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new rf(i),e.set(s,[a])):r>=o.length?(a=new rf(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var iv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,rv=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],ov=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],of=new Ye,io=new C,ah=new C;function av(i,e,t){let n=new vi,s=new re,r=new re,o=new mt,a=new Ls,l=new ca,c={},h=t.maxTextureSize,u={[wi]:tn,[tn]:wi,[Pt]:Pt},d=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:iv,fragmentShader:sv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let p=new Nt;p.setAttribute("position",new Bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ut(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hi;let g=this.type;this.render=function(A,x,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===Ku&&(ke("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Hi);let L=i.getRenderTarget(),w=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Gi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let P=g!==this.type;P&&x.traverse(function(T){T.material&&(Array.isArray(T.material)?T.material.forEach(O=>O.needsUpdate=!0):T.material.needsUpdate=!0)});for(let T=0,O=A.length;T<O;T++){let z=A[T],k=z.shadow;if(k===void 0){ke("WebGLShadowMap:",z,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);let q=k.getFrameExtents();s.multiply(q),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,k.mapSize.y=r.y));let G=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=G,k.map===null||P===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Bs){if(z.isPointLight){ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new xn(s.x,s.y,{format:Ti,type:An,minFilter:mn,magFilter:mn,generateMipmaps:!1}),k.map.texture.name=z.name+".shadowMap",k.map.depthTexture=new ci(s.x,s.y,Pn),k.map.depthTexture.name=z.name+".shadowMapDepth",k.map.depthTexture.format=ai,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Jt,k.map.depthTexture.magFilter=Jt}else z.isPointLight?(k.map=new ro(s.x),k.map.depthTexture=new Ir(s.x,kn)):(k.map=new xn(s.x,s.y),k.map.depthTexture=new ci(s.x,s.y,kn)),k.map.depthTexture.name=z.name+".shadowMap",k.map.depthTexture.format=ai,this.type===Hi?(k.map.depthTexture.compareFunction=G?Gc:Hc,k.map.depthTexture.minFilter=mn,k.map.depthTexture.magFilter=mn):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Jt,k.map.depthTexture.magFilter=Jt);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==s.x||k.map.height!==s.y)&&k.map.setSize(s.x,s.y);let X=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();z.isPointLight!==!0&&k.updateMatrices(z,E);let Q=(k.camera.layers.mask&4294967294)!==0?k.camera.layers:E.layers;for(let _e=0;_e<X;_e++){let Se=k.getCamera(_e);if(z.isPointLight){let J=k.camera,le=k.matrix,be=z.distance||J.far;be!==J.far&&(J.far=be,J.updateProjectionMatrix()),io.setFromMatrixPosition(z.matrixWorld),J.position.copy(io),ah.copy(J.position),ah.add(rv[_e]),J.up.copy(ov[_e]),J.lookAt(ah),J.updateMatrixWorld(),le.makeTranslation(-io.x,-io.y,-io.z),of.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),k._frustum.setFromProjectionMatrix(of,J.coordinateSystem,J.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,_e),i.clear();else{_e===0&&(i.setRenderTarget(k.map),i.clear());let J=k.getViewport(_e);o.set(r.x*J.x,r.y*J.y,r.x*J.z,r.y*J.w),U.viewport(o)}n=k.getFrustum(_e),S(x,E,Se,z,Q,this.type)}k.isPointLightShadow!==!0&&this.type===Bs&&y(k,E),k.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(L,w,D)};function y(A,x){let E=e.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null?A.mapPass=new xn(s.x,s.y,{format:Ti,type:An}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),d.uniforms.shadow_pass.value=A.map.depthTexture,d.uniforms.resolution.value.set(A.map.width,A.map.height),d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(x,null,E,d,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value.set(A.map.width,A.map.height),f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(x,null,E,f,_,null)}function b(A,x,E,L){let w=null,D=E.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(D!==void 0)w=D;else if(w=E.isPointLight===!0?l:a,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let U=w.uuid,P=x.uuid,T=c[U];T===void 0&&(T={},c[U]=T);let O=T[P];O===void 0&&(O=w.clone(),T[P]=O,x.addEventListener("dispose",I)),w=O}if(w.visible=x.visible,w.wireframe=x.wireframe,L===Bs?w.side=x.shadowSide!==null?x.shadowSide:x.side:w.side=x.shadowSide!==null?x.shadowSide:u[x.side],w.alphaMap=x.alphaMap,w.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,w.map=x.map,w.clipShadows=x.clipShadows,w.clippingPlanes=x.clippingPlanes,w.clipIntersection=x.clipIntersection,w.displacementMap=x.displacementMap,w.displacementScale=x.displacementScale,w.displacementBias=x.displacementBias,w.wireframeLinewidth=x.wireframeLinewidth,w.linewidth=x.linewidth,E.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let U=i.properties.get(w);U.light=E}return w}function S(A,x,E,L,w,D){if(A.visible===!1)return;if(A.layers.test(w)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&D===Bs)&&(!A.frustumCulled||A.intersectsFrustum(n))){A.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,A.matrixWorld);let T=e.update(A),O=A.material;if(Array.isArray(O)){let z=T.groups;for(let k=0,q=z.length;k<q;k++){let G=z[k],X=O[G.materialIndex];if(X&&X.visible){let Q=b(A,X,L,D);A.onBeforeShadow(i,A,x,E,T,Q,G),i.renderBufferDirect(E,null,T,Q,A,G),A.onAfterShadow(i,A,x,E,T,Q,G)}}}else if(O.visible){let z=b(A,O,L,D);A.onBeforeShadow(i,A,x,E,T,z,null),i.renderBufferDirect(E,null,T,z,A,null),A.onAfterShadow(i,A,x,E,T,z,null)}}let P=A.children;for(let T=0,O=P.length;T<O;T++)S(P[T],x,E,L,w,D)}function I(A){A.target.removeEventListener("dispose",I);for(let E in c){let L=c[E],w=A.target.uuid;w in L&&(L[w].dispose(),delete L[w])}}}function lv(i,e){function t(){let N=!1,ee=new mt,$=null,ue=new mt(0,0,0,0);return{setMask:function(se){$!==se&&!N&&(i.colorMask(se,se,se,se),$=se)},setLocked:function(se){N=se},setClear:function(se,ae,Fe,$e,ie){ie===!0&&(se*=$e,ae*=$e,Fe*=$e),ee.set(se,ae,Fe,$e),ue.equals(ee)===!1&&(i.clearColor(se,ae,Fe,$e),ue.copy(ee))},reset:function(){N=!1,$=null,ue.set(-1,0,0,0)}}}function n(){let N=!1,ee=!1,$=null,ue=null,se=null;return{setReversed:function(ae){if(ee!==ae){let Fe=e.get("EXT_clip_control");ae?Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.ZERO_TO_ONE_EXT):Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.NEGATIVE_ONE_TO_ONE_EXT),ee=ae;let $e=se;se=null,this.setClear($e)}},getReversed:function(){return ee},setTest:function(ae){ae?pe(i.DEPTH_TEST):Ae(i.DEPTH_TEST)},setMask:function(ae){$!==ae&&!N&&(i.depthMask(ae),$=ae)},setFunc:function(ae){if(ee&&(ae=Id[ae]),ue!==ae){switch(ae){case qo:i.depthFunc(i.NEVER);break;case gs:i.depthFunc(i.ALWAYS);break;case Yo:i.depthFunc(i.LESS);break;case xs:i.depthFunc(i.LEQUAL);break;case Zo:i.depthFunc(i.EQUAL);break;case Jo:i.depthFunc(i.GEQUAL);break;case $o:i.depthFunc(i.GREATER);break;case Ko:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ue=ae}},setLocked:function(ae){N=ae},setClear:function(ae){se!==ae&&(se=ae,ee&&(ae=1-ae),i.clearDepth(ae))},reset:function(){N=!1,$=null,ue=null,se=null,ee=!1}}}function s(){let N=!1,ee=null,$=null,ue=null,se=null,ae=null,Fe=null,$e=null,ie=null;return{setTest:function(Be){N||(Be?pe(i.STENCIL_TEST):Ae(i.STENCIL_TEST))},setMask:function(Be){ee!==Be&&!N&&(i.stencilMask(Be),ee=Be)},setFunc:function(Be,Ze,ve){($!==Be||ue!==Ze||se!==ve)&&(i.stencilFunc(Be,Ze,ve),$=Be,ue=Ze,se=ve)},setOp:function(Be,Ze,ve){(ae!==Be||Fe!==Ze||$e!==ve)&&(i.stencilOp(Be,Ze,ve),ae=Be,Fe=Ze,$e=ve)},setLocked:function(Be){N=Be},setClear:function(Be){ie!==Be&&(i.clearStencil(Be),ie=Be)},reset:function(){N=!1,ee=null,$=null,ue=null,se=null,ae=null,Fe=null,$e=null,ie=null}}}let r=new t,o=new n,a=new s,l={},c=new WeakMap,h={},u={},d={},f=new WeakMap,p=[],_=null,m=!1,g=null,y=null,b=null,S=null,I=null,A=null,x=null,E=new Te(0,0,0),L=0,w=!1,D=null,U=null,P=null,T=null,O=null,z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,q=0,G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(G)[1]),k=q>=1):G.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),k=q>=2);let X=null,Q={},_e=i.getParameter(i.SCISSOR_BOX),Se=i.getParameter(i.VIEWPORT),J=new mt().fromArray(_e),le=new mt().fromArray(Se);function be(N,ee,$,ue){let se=new Uint8Array(4),ae=i.createTexture();i.bindTexture(N,ae),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Fe=0;Fe<$;Fe++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(ee,0,i.RGBA,1,1,ue,0,i.RGBA,i.UNSIGNED_BYTE,se):i.texImage2D(ee+Fe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,se);return ae}let Ee={};Ee[i.TEXTURE_2D]=be(i.TEXTURE_2D,i.TEXTURE_2D,1),Ee[i.TEXTURE_CUBE_MAP]=be(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ee[i.TEXTURE_2D_ARRAY]=be(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ee[i.TEXTURE_3D]=be(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),pe(i.DEPTH_TEST),o.setFunc(xs),Ot(!1),At(Mc),pe(i.CULL_FACE),Tt(Gi);function pe(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function Ae(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function xt(N,ee){return d[N]!==ee?(i.bindFramebuffer(N,ee),d[N]=ee,N===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ee),N===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ee),!0):!1}function Le(N,ee){let $=p,ue=!1;if(N){$=f.get(ee),$===void 0&&($=[],f.set(ee,$));let se=N.textures;if($.length!==se.length||$[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,Fe=se.length;ae<Fe;ae++)$[ae]=i.COLOR_ATTACHMENT0+ae;$.length=se.length,ue=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,ue=!0);ue&&i.drawBuffers($)}function qe(N){return _!==N?(i.useProgram(N),_=N,!0):!1}let je={[Vi]:i.FUNC_ADD,[ju]:i.FUNC_SUBTRACT,[ed]:i.FUNC_REVERSE_SUBTRACT};je[td]=i.MIN,je[nd]=i.MAX;let Ge={[id]:i.ZERO,[sd]:i.ONE,[rd]:i.SRC_COLOR,[Ec]:i.SRC_ALPHA,[ud]:i.SRC_ALPHA_SATURATE,[cd]:i.DST_COLOR,[ad]:i.DST_ALPHA,[od]:i.ONE_MINUS_SRC_COLOR,[wc]:i.ONE_MINUS_SRC_ALPHA,[hd]:i.ONE_MINUS_DST_COLOR,[ld]:i.ONE_MINUS_DST_ALPHA,[dd]:i.CONSTANT_COLOR,[fd]:i.ONE_MINUS_CONSTANT_COLOR,[pd]:i.CONSTANT_ALPHA,[md]:i.ONE_MINUS_CONSTANT_ALPHA};function Tt(N,ee,$,ue,se,ae,Fe,$e,ie,Be){if(N===Gi){m===!0&&(Ae(i.BLEND),m=!1);return}if(m===!1&&(pe(i.BLEND),m=!0),N!==Qu){if(N!==g||Be!==w){if((y!==Vi||I!==Vi)&&(i.blendEquation(i.FUNC_ADD),y=Vi,I=Vi),Be)switch(N){case zs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ks:i.blendFunc(i.ONE,i.ONE);break;case Sc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case bc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:He("WebGLState: Invalid blending: ",N);break}else switch(N){case zs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ks:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Sc:He("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bc:He("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:He("WebGLState: Invalid blending: ",N);break}b=null,S=null,A=null,x=null,E.set(0,0,0),L=0,g=N,w=Be}return}se=se||ee,ae=ae||$,Fe=Fe||ue,(ee!==y||se!==I)&&(i.blendEquationSeparate(je[ee],je[se]),y=ee,I=se),($!==b||ue!==S||ae!==A||Fe!==x)&&(i.blendFuncSeparate(Ge[$],Ge[ue],Ge[ae],Ge[Fe]),b=$,S=ue,A=ae,x=Fe),($e.equals(E)===!1||ie!==L)&&(i.blendColor($e.r,$e.g,$e.b,ie),E.copy($e),L=ie),g=N,w=!1}function ct(N,ee){N.side===Pt?Ae(i.CULL_FACE):pe(i.CULL_FACE);let $=N.side===tn;ee&&($=!$),Ot($),N.blending===zs&&N.transparent===!1?Tt(Gi):Tt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let ue=N.stencilWrite;a.setTest(ue),ue&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Mt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?pe(i.SAMPLE_ALPHA_TO_COVERAGE):Ae(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(N){D!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),D=N)}function At(N){N!==Ju?(pe(i.CULL_FACE),N!==U&&(N===Mc?i.cullFace(i.BACK):N===$u?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ae(i.CULL_FACE),U=N}function Rn(N){N!==P&&(k&&i.lineWidth(N),P=N)}function Mt(N,ee,$){N?(pe(i.POLYGON_OFFSET_FILL),(T!==ee||O!==$)&&(T=ee,O=$,o.getReversed()&&(ee=-ee,$=-$),i.polygonOffset(ee,$))):Ae(i.POLYGON_OFFSET_FILL)}function me(N){N?pe(i.SCISSOR_TEST):Ae(i.SCISSOR_TEST)}function Ue(N){N===void 0&&(N=i.TEXTURE0+z-1),X!==N&&(i.activeTexture(N),X=N)}function we(N,ee,$){$===void 0&&(X===null?$=i.TEXTURE0+z-1:$=X);let ue=Q[$];ue===void 0&&(ue={type:void 0,texture:void 0},Q[$]=ue),(ue.type!==N||ue.texture!==ee)&&(X!==$&&(i.activeTexture($),X=$),i.bindTexture(N,ee||Ee[N]),ue.type=N,ue.texture=ee)}function F(){let N=Q[X];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function at(){try{i.compressedTexImage2D(...arguments)}catch(N){He("WebGLState:",N)}}function Je(){try{i.compressedTexImage3D(...arguments)}catch(N){He("WebGLState:",N)}}function ht(){try{i.texSubImage2D(...arguments)}catch(N){He("WebGLState:",N)}}function ce(){try{i.texSubImage3D(...arguments)}catch(N){He("WebGLState:",N)}}function Rt(){try{i.compressedTexSubImage2D(...arguments)}catch(N){He("WebGLState:",N)}}function Oe(){try{i.compressedTexSubImage3D(...arguments)}catch(N){He("WebGLState:",N)}}function Ve(){try{i.texStorage2D(...arguments)}catch(N){He("WebGLState:",N)}}function R(){try{i.texStorage3D(...arguments)}catch(N){He("WebGLState:",N)}}function v(){try{i.texImage2D(...arguments)}catch(N){He("WebGLState:",N)}}function H(){try{i.texImage3D(...arguments)}catch(N){He("WebGLState:",N)}}function ne(N){return u[N]!==void 0?u[N]:i.getParameter(N)}function te(N,ee){u[N]!==ee&&(i.pixelStorei(N,ee),u[N]=ee)}function oe(N){J.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),J.copy(N))}function ge(N){le.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),le.copy(N))}function K(N,ee){let $=c.get(ee);$===void 0&&($=new WeakMap,c.set(ee,$));let ue=$.get(N);ue===void 0&&(ue=i.getUniformBlockIndex(ee,N.name),i.uniformBlockBinding(ee,ue,ue),$.set(N,ue))}function j(N,ee,$){let se=c.get(ee).get(N);l[se]!==$&&(i.bindBufferBase(i.UNIFORM_BUFFER,se,$),l[se]=$)}function he(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},X=null,Q={},d={},l={},f=new WeakMap,p=[],_=null,m=!1,g=null,y=null,b=null,S=null,I=null,A=null,x=null,E=new Te(0,0,0),L=0,w=!1,D=null,U=null,P=null,T=null,O=null,J.set(0,0,i.canvas.width,i.canvas.height),le.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:pe,disable:Ae,bindFramebuffer:xt,drawBuffers:Le,useProgram:qe,setBlending:Tt,setMaterial:ct,setFlipSided:Ot,setCullFace:At,setLineWidth:Rn,setPolygonOffset:Mt,setScissorTest:me,activeTexture:Ue,bindTexture:we,unbindTexture:F,compressedTexImage2D:at,compressedTexImage3D:Je,texImage2D:v,texImage3D:H,pixelStorei:te,getParameter:ne,updateUBOMapping:K,uniformBlockBinding:j,texStorage2D:Ve,texStorage3D:R,texSubImage2D:ht,texSubImage3D:ce,compressedTexSubImage2D:Rt,compressedTexSubImage3D:Oe,scissor:oe,viewport:ge,reset:he}}function cv(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new re,h=new WeakMap,u=new Set,d,f=new WeakMap,p=new Set,_=new FinalizationRegistry(R=>p.delete(R)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,v){return m?new OffscreenCanvas(R,v):xr("canvas")}function y(R,v,H){let ne=1,te=Ve(R);if((te.width>H||te.height>H)&&(ne=H/Math.max(te.width,te.height)),ne<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let oe=Math.floor(ne*te.width),ge=Math.floor(ne*te.height);d===void 0&&(d=g(oe,ge));let K=v?g(oe,ge):d;return K.width=oe,K.height=ge,K.getContext("2d").drawImage(R,0,0,oe,ge),ke("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+oe+"x"+ge+")."),K}else return"data"in R&&ke("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),R;return R}function b(R){return R.generateMipmaps}function S(R){i.generateMipmap(R)}function I(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function A(R,v,H,ne,te,oe=!1){if(R!==null){if(i[R]!==void 0)return i[R];ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ge;ne&&(ge=e.get("EXT_texture_norm16"),ge||ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=v;if(v===i.RED&&(H===i.FLOAT&&(K=i.R32F),H===i.HALF_FLOAT&&(K=i.R16F),H===i.UNSIGNED_BYTE&&(K=i.R8),H===i.UNSIGNED_SHORT&&ge&&(K=ge.R16_EXT),H===i.SHORT&&ge&&(K=ge.R16_SNORM_EXT)),v===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.R8UI),H===i.UNSIGNED_SHORT&&(K=i.R16UI),H===i.UNSIGNED_INT&&(K=i.R32UI),H===i.BYTE&&(K=i.R8I),H===i.SHORT&&(K=i.R16I),H===i.INT&&(K=i.R32I)),v===i.RG&&(H===i.FLOAT&&(K=i.RG32F),H===i.HALF_FLOAT&&(K=i.RG16F),H===i.UNSIGNED_BYTE&&(K=i.RG8),H===i.UNSIGNED_SHORT&&ge&&(K=ge.RG16_EXT),H===i.SHORT&&ge&&(K=ge.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RG8UI),H===i.UNSIGNED_SHORT&&(K=i.RG16UI),H===i.UNSIGNED_INT&&(K=i.RG32UI),H===i.BYTE&&(K=i.RG8I),H===i.SHORT&&(K=i.RG16I),H===i.INT&&(K=i.RG32I)),v===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RGB8UI),H===i.UNSIGNED_SHORT&&(K=i.RGB16UI),H===i.UNSIGNED_INT&&(K=i.RGB32UI),H===i.BYTE&&(K=i.RGB8I),H===i.SHORT&&(K=i.RGB16I),H===i.INT&&(K=i.RGB32I)),v===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),H===i.UNSIGNED_INT&&(K=i.RGBA32UI),H===i.BYTE&&(K=i.RGBA8I),H===i.SHORT&&(K=i.RGBA16I),H===i.INT&&(K=i.RGBA32I)),v===i.RGB&&(H===i.UNSIGNED_SHORT&&ge&&(K=ge.RGB16_EXT),H===i.SHORT&&ge&&(K=ge.RGB16_SNORM_EXT),H===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),v===i.RGBA){let j=oe?gr:rt.getTransfer(te);H===i.FLOAT&&(K=i.RGBA32F),H===i.HALF_FLOAT&&(K=i.RGBA16F),H===i.UNSIGNED_BYTE&&(K=j===ut?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT&&ge&&(K=ge.RGBA16_EXT),H===i.SHORT&&ge&&(K=ge.RGBA16_SNORM_EXT),H===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function x(R,v){let H;return R?v===null||v===kn||v===Xi?H=i.DEPTH24_STENCIL8:v===Pn?H=i.DEPTH32F_STENCIL8:v===Gs&&(H=i.DEPTH24_STENCIL8,ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===kn||v===Xi?H=i.DEPTH_COMPONENT24:v===Pn?H=i.DEPTH_COMPONENT32F:v===Gs&&(H=i.DEPTH_COMPONENT16),H}function E(R,v){return b(R)===!0||R.isFramebufferTexture&&R.minFilter!==Jt&&R.minFilter!==mn?Math.log2(Math.max(v.width,v.height))+1:R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?v.mipmaps.length:1}function L(R){let v=new WeakRef(R);n.get(R).__ref=v,p.add(v),_.register(R,v,v)}function w(R){let v=n.get(R).__ref;v!==void 0&&(p.delete(v),_.unregister(v))}function D(R){P(R.target)}function U(R){T(R.target)}function P(R){R.removeEventListener("dispose",D),w(R),z(R),R.isVideoTexture&&h.delete(R),R.isHTMLTexture&&u.delete(R)}function T(R){R.removeEventListener("dispose",U),w(R),q(R)}function O(){for(let R of p){let v=R.deref();v!==void 0&&(v.isRenderTarget===!0?T(v):P(v))}p.clear(),u.clear()}function z(R){let v=n.get(R);if(v.__webglInit===void 0)return;let H=R.source,ne=f.get(H);if(ne){let te=ne[v.__cacheKey];te.usedTimes--,te.usedTimes===0&&k(R),Object.keys(ne).length===0&&f.delete(H)}n.remove(R)}function k(R){let v=n.get(R);i.deleteTexture(v.__webglTexture);let H=R.source,ne=f.get(H);delete ne[v.__cacheKey],o.memory.textures--}function q(R){let v=n.get(R);v.__depthDisposeCallback&&v.__depthDisposeCallback();let H=R.depthTexture;if(H&&H.renderTarget===R&&P(H),R.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(v.__webglFramebuffer[te]))for(let oe=0;oe<v.__webglFramebuffer[te].length;oe++)i.deleteFramebuffer(v.__webglFramebuffer[te][oe]);else i.deleteFramebuffer(v.__webglFramebuffer[te]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[te])}else{if(Array.isArray(v.__webglFramebuffer))for(let te=0;te<v.__webglFramebuffer.length;te++)i.deleteFramebuffer(v.__webglFramebuffer[te]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let te=0;te<v.__webglColorRenderbuffer.length;te++)v.__webglColorRenderbuffer[te]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[te]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let ne=R.textures;for(let te=0,oe=ne.length;te<oe;te++){let ge=n.get(ne[te]);ge.__webglTexture&&(i.deleteTexture(ge.__webglTexture),o.memory.textures--),n.remove(ne[te])}n.remove(R)}let G=0;function X(){G=0}function Q(){return G}function _e(R){G=R}function Se(){let R=G;return R>=s.maxTextures&&ke("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),G+=1,R}function J(R){let v=[];return v.push(R.wrapS),v.push(R.wrapT),v.push(R.wrapR||0),v.push(R.magFilter),v.push(R.minFilter),v.push(R.anisotropy),v.push(R.internalFormat),v.push(R.format),v.push(R.type),v.push(R.generateMipmaps),v.push(R.mipmapsAutoUpdate),v.push(R.premultiplyAlpha),v.push(R.flipY),v.push(R.unpackAlignment),v.push(R.colorSpace),v.join()}function le(R,v){let H=n.get(R);if(R.isVideoTexture&&Rt(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&H.__version!==R.version){let ne=R.image;if(ne===null)ke("WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)ke("WebGLRenderer: Texture marked for update but image is incomplete");else{ct(H,R,v);return}}else R.isExternalTexture&&(H.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+v)}function be(R,v){let H=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&H.__version!==R.version){ct(H,R,v);return}else R.isExternalTexture&&(H.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+v)}function Ee(R,v){let H=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&H.__version!==R.version){ct(H,R,v);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+v)}function pe(R,v){let H=n.get(R);if(R.version>0&&H.__version!==R.version){Ot(H,R,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+v)}let Ae={[_s]:i.REPEAT,[qn]:i.CLAMP_TO_EDGE,[Qo]:i.MIRRORED_REPEAT},xt={[Jt]:i.NEAREST,[_d]:i.NEAREST_MIPMAP_NEAREST,[$r]:i.NEAREST_MIPMAP_LINEAR,[mn]:i.LINEAR,[Ea]:i.LINEAR_MIPMAP_NEAREST,[zn]:i.LINEAR_MIPMAP_LINEAR},Le={[Sd]:i.NEVER,[Vc]:i.ALWAYS,[bd]:i.LESS,[Hc]:i.LEQUAL,[Ed]:i.EQUAL,[Gc]:i.GEQUAL,[wd]:i.GREATER,[Td]:i.NOTEQUAL};function qe(R,v){if(v.type===Pn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===mn||v.magFilter===Ea||v.magFilter===$r||v.magFilter===zn||v.minFilter===mn||v.minFilter===Ea||v.minFilter===$r||v.minFilter===zn)&&ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Ae[v.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Ae[v.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Ae[v.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,xt[v.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,xt[v.minFilter]),v.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Le[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Jt||v.minFilter!==$r&&v.minFilter!==zn||v.type===Pn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function je(R,v){let H=!1;R.__webglInit===void 0&&(R.__webglInit=!0,v.addEventListener("dispose",D),L(v));let ne=v.source,te=f.get(ne);te===void 0&&(te={},f.set(ne,te));let oe=J(v);if(oe!==R.__cacheKey){te[oe]===void 0&&(te[oe]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),te[oe].usedTimes++;let ge=te[R.__cacheKey];ge!==void 0&&(te[R.__cacheKey].usedTimes--,ge.usedTimes===0&&k(v)),R.__cacheKey=oe,R.__webglTexture=te[oe].texture}return H}function Ge(R,v,H){return Math.floor(Math.floor(R/H)/v)}function Tt(R,v,H,ne){let oe=R.updateRanges;if(oe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,H,ne,v.data);else{oe.sort((N,ee)=>N.start-ee.start);let ge=0;for(let N=1;N<oe.length;N++){let ee=oe[ge],$=oe[N],ue=ee.start+ee.count,se=Ge($.start,v.width,4),ae=Ge(ee.start,v.width,4);$.start<=ue+1&&se===ae&&Ge($.start+$.count-1,v.width,4)===se?ee.count=Math.max(ee.count,$.start+$.count-ee.start):(++ge,oe[ge]=$)}oe.length=ge+1;let K=t.getParameter(i.UNPACK_ROW_LENGTH),j=t.getParameter(i.UNPACK_SKIP_PIXELS),he=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let N=0,ee=oe.length;N<ee;N++){let $=oe[N],ue=Math.floor($.start/4),se=Math.ceil($.count/4),ae=ue%v.width,Fe=Math.floor(ue/v.width),$e=se,ie=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ae),t.pixelStorei(i.UNPACK_SKIP_ROWS,Fe),t.texSubImage2D(i.TEXTURE_2D,0,ae,Fe,$e,ie,H,ne,v.data)}R.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,K),t.pixelStorei(i.UNPACK_SKIP_PIXELS,j),t.pixelStorei(i.UNPACK_SKIP_ROWS,he)}}function ct(R,v,H){let ne=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(ne=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(ne=i.TEXTURE_3D);let te=je(R,v),oe=v.source;t.bindTexture(ne,R.__webglTexture,i.TEXTURE0+H);let ge=n.get(oe);if(oe.version!==ge.__version||te===!0){if(t.activeTexture(i.TEXTURE0+H),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let ie=rt.getPrimaries(rt.workingColorSpace),Be=v.colorSpace===Gn?null:rt.getPrimaries(v.colorSpace),Ze=v.colorSpace===Gn||ie===Be?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let j=y(v.image,!1,s.maxTextureSize);j=Oe(v,j);let he=r.convert(v.format,v.colorSpace),N=r.convert(v.type),ee=A(v.internalFormat,he,N,v.normalized,v.colorSpace,v.isVideoTexture);qe(ne,v);let $,ue=v.mipmaps,se=v.isVideoTexture!==!0,ae=ge.__version===void 0||te===!0,Fe=oe.dataReady,$e=E(v,j);if(v.isDepthTexture)ee=x(v.format===hi,v.type),ae&&(se?t.texStorage2D(i.TEXTURE_2D,1,ee,j.width,j.height):t.texImage2D(i.TEXTURE_2D,0,ee,j.width,j.height,0,he,N,null));else if(v.isDataTexture)if(ue.length>0){se&&ae&&t.texStorage2D(i.TEXTURE_2D,$e,ee,ue[0].width,ue[0].height);for(let ie=0,Be=ue.length;ie<Be;ie++)$=ue[ie],se?Fe&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,$.width,$.height,he,N,$.data):t.texImage2D(i.TEXTURE_2D,ie,ee,$.width,$.height,0,he,N,$.data);v.generateMipmaps=!1}else se?(ae&&t.texStorage2D(i.TEXTURE_2D,$e,ee,j.width,j.height),Fe&&Tt(v,j,he,N)):t.texImage2D(i.TEXTURE_2D,0,ee,j.width,j.height,0,he,N,j.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){se&&ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,$e,ee,ue[0].width,ue[0].height,j.depth);for(let ie=0,Be=ue.length;ie<Be;ie++)if($=ue[ie],v.format!==Hn)if(he!==null)if(se){if(Fe)if(v.layerUpdates.size>0){let Ze=eh($.width,$.height,v.format,v.type);for(let ve of v.layerUpdates){let pt=$.data.subarray(ve*Ze/$.data.BYTES_PER_ELEMENT,(ve+1)*Ze/$.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,ve,$.width,$.height,1,he,pt)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,$.width,$.height,j.depth,he,$.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,ee,$.width,$.height,j.depth,0,$.data,0,0);else ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else se?Fe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,$.width,$.height,j.depth,he,N,$.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,ee,$.width,$.height,j.depth,0,he,N,$.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{se&&ae&&t.texStorage2D(i.TEXTURE_2D,$e,ee,ue[0].width,ue[0].height);for(let ie=0,Be=ue.length;ie<Be;ie++)$=ue[ie],v.format!==Hn?he!==null?se?Fe&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,$.width,$.height,he,$.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,ee,$.width,$.height,0,$.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):se?Fe&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,$.width,$.height,he,N,$.data):t.texImage2D(i.TEXTURE_2D,ie,ee,$.width,$.height,0,he,N,$.data)}else if(v.isDataArrayTexture)if(se){if(ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,$e,ee,j.width,j.height,j.depth),Fe)if(v.layerUpdates.size>0){let ie=eh(j.width,j.height,v.format,v.type);for(let Be of v.layerUpdates){let Ze=j.data.subarray(Be*ie/j.data.BYTES_PER_ELEMENT,(Be+1)*ie/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Be,j.width,j.height,1,he,N,Ze)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,he,N,j.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ee,j.width,j.height,j.depth,0,he,N,j.data);else if(v.isData3DTexture)se?(ae&&t.texStorage3D(i.TEXTURE_3D,$e,ee,j.width,j.height,j.depth),Fe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,he,N,j.data)):t.texImage3D(i.TEXTURE_3D,0,ee,j.width,j.height,j.depth,0,he,N,j.data);else if(v.isFramebufferTexture){if(ae)if(se)t.texStorage2D(i.TEXTURE_2D,$e,ee,j.width,j.height);else{let ie=j.width,Be=j.height;for(let Ze=0;Ze<$e;Ze++)t.texImage2D(i.TEXTURE_2D,Ze,ee,ie,Be,0,he,N,null),ie>>=1,Be>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let ie=i.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),j.parentNode!==ie){ie.appendChild(j),u.add(v),ie.onpaint=Be=>{let Ze=Be.changedElements;for(let ve of u)Ze.includes(ve.image)&&(ve.needsUpdate=!0)},ie.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,j);else{let Ze=i.RGBA,ve=i.RGBA,pt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ze,ve,pt,j)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ue.length>0){if(se&&ae){let ie=Ve(ue[0]);t.texStorage2D(i.TEXTURE_2D,$e,ee,ie.width,ie.height)}for(let ie=0,Be=ue.length;ie<Be;ie++)$=ue[ie],se?Fe&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,he,N,$):t.texImage2D(i.TEXTURE_2D,ie,ee,he,N,$);v.generateMipmaps=!1}else if(se){if(ae){let ie=Ve(j);t.texStorage2D(i.TEXTURE_2D,$e,ee,ie.width,ie.height)}Fe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he,N,j)}else t.texImage2D(i.TEXTURE_2D,0,ee,he,N,j);b(v)&&v.mipmapsAutoUpdate===!0&&S(ne),ge.__version=oe.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function Ot(R,v,H){if(v.image.length!==6)return;let ne=je(R,v),te=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+H);let oe=n.get(te);if(te.version!==oe.__version||ne===!0){t.activeTexture(i.TEXTURE0+H);let ge=rt.getPrimaries(rt.workingColorSpace),K=v.colorSpace===Gn?null:rt.getPrimaries(v.colorSpace),j=v.colorSpace===Gn||ge===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);let he=v.isCompressedTexture||v.image[0].isCompressedTexture,N=v.image[0]&&v.image[0].isDataTexture,ee=[];for(let ve=0;ve<6;ve++)!he&&!N?ee[ve]=y(v.image[ve],!0,s.maxCubemapSize):ee[ve]=N?v.image[ve].image:v.image[ve],ee[ve]=Oe(v,ee[ve]);let $=ee[0],ue=r.convert(v.format,v.colorSpace),se=r.convert(v.type),ae=A(v.internalFormat,ue,se,v.normalized,v.colorSpace),Fe=v.isVideoTexture!==!0,$e=oe.__version===void 0||ne===!0,ie=te.dataReady,Be=E(v,$);qe(i.TEXTURE_CUBE_MAP,v);let Ze;if(v.isDepthTexture){if(ae=x(v.format===hi,v.type),$e)if(Fe)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,ae,$.width,$.height);else for(let ve=0;ve<6;ve++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ae,$.width,$.height,0,ue,se,null)}else if(he){Fe&&$e&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Be,ae,$.width,$.height);for(let ve=0;ve<6;ve++){Ze=ee[ve].mipmaps;for(let pt=0;pt<Ze.length;pt++){let qt=Ze[pt];v.format!==Hn?ue!==null?Fe?ie&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,pt,0,0,qt.width,qt.height,ue,qt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,pt,ae,qt.width,qt.height,0,qt.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,pt,0,0,qt.width,qt.height,ue,se,qt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,pt,ae,qt.width,qt.height,0,ue,se,qt.data)}}}else{if(Ze=v.mipmaps,Fe&&$e){Ze.length>0&&Be++;let ve=Ve(ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Be,ae,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(N){Fe?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,ee[ve].width,ee[ve].height,ue,se,ee[ve].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ae,ee[ve].width,ee[ve].height,0,ue,se,ee[ve].data);for(let pt=0;pt<Ze.length;pt++){let di=Ze[pt].image[ve].image;Fe?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,pt+1,0,0,di.width,di.height,ue,se,di.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,pt+1,ae,di.width,di.height,0,ue,se,di.data)}}else{Fe?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,ue,se,ee[ve]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ae,ue,se,ee[ve]);for(let pt=0;pt<Ze.length;pt++){let qt=Ze[pt];Fe?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,pt+1,0,0,ue,se,qt.image[ve]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,pt+1,ae,ue,se,qt.image[ve])}}}b(v)&&v.mipmapsAutoUpdate===!0&&S(i.TEXTURE_CUBE_MAP),oe.__version=te.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function At(R,v,H,ne,te,oe){let ge=r.convert(H.format,H.colorSpace),K=r.convert(H.type),j=A(H.internalFormat,ge,K,H.normalized,H.colorSpace),he=n.get(v),N=n.get(H);if(N.__renderTarget=v,!he.__hasExternalTextures){let ee=Math.max(1,v.width>>oe),$=Math.max(1,v.height>>oe);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,oe,j,ee,$,v.depth,0,ge,K,null):t.texImage2D(te,oe,j,ee,$,0,ge,K,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),ce(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,te,N.__webglTexture,0,ht(v)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ne,te,N.__webglTexture,oe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Rn(R,v,H){if(i.bindRenderbuffer(i.RENDERBUFFER,R),v.depthBuffer){let ne=v.depthTexture,te=ne&&ne.isDepthTexture?ne.type:null,oe=x(v.stencilBuffer,te),ge=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ce(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht(v),oe,v.width,v.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht(v),oe,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,oe,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ge,i.RENDERBUFFER,R)}else{let ne=v.textures;for(let te=0;te<ne.length;te++){let oe=ne[te],ge=r.convert(oe.format,oe.colorSpace),K=r.convert(oe.type),j=A(oe.internalFormat,ge,K,oe.normalized,oe.colorSpace);ce(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht(v),j,v.width,v.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht(v),j,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,j,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Mt(R,v,H){let ne=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let te=n.get(v.depthTexture);te.__renderTarget=v;let oe=ne?v.depthTexture.image[0]:v.depthTexture.image;(!te.__webglTexture||oe.width!==v.width||oe.height!==v.height)&&(oe.width=v.width,oe.height=v.height,v.depthTexture.needsUpdate=!0),ne?pe(v.depthTexture,0):le(v.depthTexture,0);let ge=te.__webglTexture,K=ht(v),j=ne?i.TEXTURE_CUBE_MAP_POSITIVE_X+H:i.TEXTURE_2D,he=v.depthTexture.format===hi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===ai)ce(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,he,j,ge,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,he,j,ge,0);else if(v.depthTexture.format===hi)ce(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,he,j,ge,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,he,j,ge,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function me(R){let v=n.get(R),H=R.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==R.depthTexture){let ne=R.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),ne){let te=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,ne.removeEventListener("dispose",te)};ne.addEventListener("dispose",te),v.__depthDisposeCallback=te}v.__boundDepthTexture=ne}if(R.depthTexture&&!v.__autoAllocateDepthBuffer)if(H)for(let ne=0;ne<6;ne++)Mt(v.__webglFramebuffer[ne],R,ne);else R.texture.mipmaps.length>0?Mt(v.__webglFramebuffer[0],R,0):Mt(v.__webglFramebuffer,R,0);else if(H){v.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[ne]),v.__webglDepthbuffer[ne]===void 0)v.__webglDepthbuffer[ne]=i.createRenderbuffer(),Rn(v.__webglDepthbuffer[ne],R,!1);else{let te=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=v.__webglDepthbuffer[ne];i.bindRenderbuffer(i.RENDERBUFFER,oe),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,oe)}}else if(R.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Rn(v.__webglDepthbuffer,R,!1);else{let te=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,oe),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,oe)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ue(R,v,H){let ne=n.get(R);v!==void 0&&At(ne.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&me(R)}function we(R){let v=R.texture,H=n.get(R),ne=n.get(v);R.addEventListener("dispose",U),L(R);let te=R.textures,oe=R.isWebGLCubeRenderTarget===!0,ge=te.length>1;if(ge||(ne.__webglTexture===void 0&&(ne.__webglTexture=i.createTexture()),ne.__version=v.version,o.memory.textures++),oe){H.__webglFramebuffer=[];for(let K=0;K<6;K++)if(v.mipmaps.length>0){H.__webglFramebuffer[K]=[];for(let j=0;j<v.mipmaps.length;j++)H.__webglFramebuffer[K][j]=i.createFramebuffer()}else H.__webglFramebuffer[K]=i.createFramebuffer()}else{if(v.mipmaps.length>0){H.__webglFramebuffer=[];for(let K=0;K<v.mipmaps.length;K++)H.__webglFramebuffer[K]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(ge)for(let K=0,j=te.length;K<j;K++){let he=n.get(te[K]);he.__webglTexture===void 0&&(he.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&ce(R)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let K=0;K<te.length;K++){let j=te[K];H.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[K]);let he=r.convert(j.format,j.colorSpace),N=r.convert(j.type),ee=A(j.internalFormat,he,N,j.normalized,j.colorSpace,R.isXRRenderTarget===!0),$=ht(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,$,ee,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,H.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),Rn(H.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(oe){t.bindTexture(i.TEXTURE_CUBE_MAP,ne.__webglTexture),qe(i.TEXTURE_CUBE_MAP,v);for(let K=0;K<6;K++)if(v.mipmaps.length>0)for(let j=0;j<v.mipmaps.length;j++)At(H.__webglFramebuffer[K][j],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,j);else At(H.__webglFramebuffer[K],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);b(v)?S(i.TEXTURE_CUBE_MAP):v.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}else if(ge){for(let K=0,j=te.length;K<j;K++){let he=te[K],N=n.get(he),ee=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ee=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ee,N.__webglTexture),qe(ee,he),At(H.__webglFramebuffer,R,he,i.COLOR_ATTACHMENT0+K,ee,0),b(he)&&S(ee)}t.unbindTexture()}else{let K=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(K=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,ne.__webglTexture),qe(K,v),v.mipmaps.length>0)for(let j=0;j<v.mipmaps.length;j++)At(H.__webglFramebuffer[j],R,v,i.COLOR_ATTACHMENT0,K,j);else At(H.__webglFramebuffer,R,v,i.COLOR_ATTACHMENT0,K,0);b(v)?S(K):v.mipmaps.length>0&&i.texParameteri(K,i.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}R.depthBuffer&&me(R)}function F(R){let v=R.textures;for(let H=0,ne=v.length;H<ne;H++){let te=v[H];if(b(te)&&te.mipmapsAutoUpdate===!0){let oe=I(R),ge=n.get(te).__webglTexture;t.bindTexture(oe,ge),S(oe),t.unbindTexture()}}}let at=[];function Je(R){if(R.samples>0){if(ce(R)===!1){let v=R.textures,H=R.width,ne=R.height,te=i.COLOR_BUFFER_BIT,oe=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ge=n.get(R),K=v.length>1;if(K)for(let he=0;he<v.length;he++)t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer),R.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let he=0;he<v.length;he++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ge.__webglColorRenderbuffer[he]);let N=n.get(v[he]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,N,0)}i.blitFramebuffer(0,0,H,ne,0,0,H,ne,te,i.NEAREST),l===!0&&(at.length=0,at.push(i.COLOR_ATTACHMENT0+he),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&at.push(oe),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,at))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let he=0;he<v.length;he++){t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,ge.__webglColorRenderbuffer[he]);let N=n.get(v[he]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,N,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){let v=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function ht(R){return Math.min(s.maxSamples,R.samples)}function ce(R){let v=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Rt(R){let v=o.render.frame;h.get(R)!==v&&(h.set(R,v),R.update())}function Oe(R,v){let H=R.colorSpace,ne=R.format,te=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||H!==mr&&H!==Gn&&(rt.getTransfer(H)===ut?(ne!==Hn||te!==vn)&&ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):He("WebGLTextures: Unsupported texture color space:",H)),v}function Ve(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=Se,this.resetTextureUnits=X,this.getTextureUnits=Q,this.setTextureUnits=_e,this.setTexture2D=le,this.setTexture2DArray=be,this.setTexture3D=Ee,this.setTextureCube=pe,this.rebindTextures=Ue,this.setupRenderTarget=we,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=Je,this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=At,this.useMultisampledRTT=ce,this.dispose=O}function hv(i,e){function t(n,s=Gn){let r,o=rt.getTransfer(s);if(n===vn)return i.UNSIGNED_BYTE;if(n===Ta)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Aa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Fc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Oc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Nc)return i.BYTE;if(n===Uc)return i.SHORT;if(n===Gs)return i.UNSIGNED_SHORT;if(n===wa)return i.INT;if(n===kn)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===An)return i.HALF_FLOAT;if(n===Bc)return i.ALPHA;if(n===zc)return i.RGB;if(n===Hn)return i.RGBA;if(n===ai)return i.DEPTH_COMPONENT;if(n===hi)return i.DEPTH_STENCIL;if(n===Ra)return i.RED;if(n===Ca)return i.RED_INTEGER;if(n===Ti)return i.RG;if(n===Ia)return i.RG_INTEGER;if(n===Pa)return i.RGBA_INTEGER;if(n===Kr||n===Qr||n===jr||n===eo)if(o===ut)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Kr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Kr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===jr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===eo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===La||n===Da||n===Na||n===Ua)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===La)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Da)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Na)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ua)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Fa||n===Oa||n===Ba||n===za||n===ka||n===to||n===Ha)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Fa||n===Oa)return o===ut?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ba)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===za)return r.COMPRESSED_R11_EAC;if(n===ka)return r.COMPRESSED_SIGNED_R11_EAC;if(n===to)return r.COMPRESSED_RG11_EAC;if(n===Ha)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ga||n===Va||n===Wa||n===Xa||n===qa||n===Ya||n===Za||n===Ja||n===$a||n===Ka||n===Qa||n===ja||n===el||n===tl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ga)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Va)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Wa)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Xa)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===qa)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ya)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Za)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ja)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===$a)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ka)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Qa)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ja)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===el)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===tl)return o===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===nl||n===il||n===sl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===nl)return o===ut?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===il)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===sl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===rl||n===ol||n===no||n===al)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===rl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ol)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===no)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===al)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var uv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,ph=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Pr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new _n({vertexShader:uv,fragmentShader:dv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ut(new bt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},mh=class extends Yn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null,_=typeof XRWebGLBinding<"u",m=new ph,g={},y=t.getContextAttributes(),b=null,S=null,I=[],A=[],x=new re,E=null,L=null,w=new jt;w.viewport=new mt;let D=new jt;D.viewport=new mt;let U=[w,D],P=new ya,T=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let le=I[J];return le===void 0&&(le=new bs,I[J]=le),le.getTargetRaySpace()},this.getControllerGrip=function(J){let le=I[J];return le===void 0&&(le=new bs,I[J]=le),le.getGripSpace()},this.getHand=function(J){let le=I[J];return le===void 0&&(le=new bs,I[J]=le),le.getHandSpace()};function z(J){let le=A.indexOf(J.inputSource);if(le===-1)return;let be=I[le];be!==void 0&&(be.update(J.inputSource,J.frame,c||o),be.dispatchEvent({type:J.type,data:J.inputSource}))}function k(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",q);for(let J=0;J<I.length;J++){let le=A[J];le!==null&&(A[J]=null,I[J].disconnect(le))}T=null,O=null,m.reset();for(let J in g)delete g[J];if(e.setRenderTarget(b),f=null,d=null,u=null,s=null,S=null,Se.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(x.width,x.height,!1),L!==null){let J=L.camera;J.fov=L.fov,J.zoom=L.zoom,J.updateProjectionMatrix(),L=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",k),s.addEventListener("inputsourceschange",q),y.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(x),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let be=null,Ee=null,pe=null;y.depth&&(pe=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,be=y.stencil?hi:ai,Ee=y.stencil?Xi:kn);let Ae={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ae),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new xn(d.textureWidth,d.textureHeight,{format:Hn,type:vn,depthTexture:new ci(d.textureWidth,d.textureHeight,Ee,void 0,void 0,void 0,void 0,void 0,void 0,be),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let be={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,be),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new xn(f.framebufferWidth,f.framebufferHeight,{format:Hn,type:vn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Se.setContext(s),Se.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function q(J){for(let le=0;le<J.removed.length;le++){let be=J.removed[le],Ee=A.indexOf(be);Ee>=0&&(A[Ee]=null,I[Ee].disconnect(be))}for(let le=0;le<J.added.length;le++){let be=J.added[le],Ee=A.indexOf(be);if(Ee===-1){for(let Ae=0;Ae<I.length;Ae++)if(Ae>=A.length){A.push(be),Ee=Ae;break}else if(A[Ae]===null){A[Ae]=be,Ee=Ae;break}if(Ee===-1)break}let pe=I[Ee];pe&&pe.connect(be)}}function G(J,le){le===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(le.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let le=J.near,be=J.far;m.texture!==null&&(m.depthNear>0&&(le=m.depthNear),m.depthFar>0&&(be=m.depthFar)),P.near=D.near=w.near=le,P.far=D.far=w.far=be,(T!==P.near||O!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),T=P.near,O=P.far),P.layers.mask=J.layers.mask|6,w.layers.mask=P.layers.mask&-5,D.layers.mask=P.layers.mask&-3;let Ee=J.parent,pe=P.cameras;G(P,Ee);for(let Ae=0;Ae<pe.length;Ae++)G(pe[Ae],Ee);P.projectionMatrix.copy(w.projectionMatrix),P.projectionMatrixInverse.copy(w.projectionMatrixInverse),L===null&&J.isPerspectiveCamera&&(L={camera:J,fov:J.fov,zoom:J.zoom}),X(J,P,Ee)};function X(J,le,be){be===null?J.matrix.copy(le.matrixWorld):(J.matrix.copy(be.matrixWorld),J.matrix.invert(),J.matrix.multiply(le.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(le.projectionMatrix),J.projectionMatrixInverse.copy(le.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Ui*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(J){l=J,d!==null&&(d.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(P)},this.getCameraTexture=function(J){return g[J]};let Q=null;function _e(J,le){if(h=le.getViewerPose(c||o),p=le,h!==null){let be=h.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let Ee=!1;be.length!==P.cameras.length&&(P.cameras.length=0,Ee=!0);for(let Le=0;Le<be.length;Le++){let qe=be[Le],je=null;if(f!==null)je=f.getViewport(qe);else{let Tt=u.getViewSubImage(d,qe);je=Tt.viewport,Le===0&&(e.setRenderTargetTextures(S,Tt.colorTexture,Tt.depthStencilTexture),e.setRenderTarget(S))}let Ge=U[Le];Ge===void 0&&(Ge=new jt,Ge.layers.enable(Le),Ge.viewport=new mt,U[Le]=Ge),Ge.matrix.fromArray(qe.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(qe.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(je.x,je.y,je.width,je.height),Le===0&&(P.matrix.copy(Ge.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Ee===!0&&P.cameras.push(Ge)}let pe=s.enabledFeatures;if(pe&&pe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let Le=u.getDepthInformation(be[0]);Le&&Le.isValid&&Le.texture&&m.init(Le,s.renderState)}if(pe&&pe.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let Le=0;Le<be.length;Le++){let qe=be[Le].camera;if(qe){let je=g[qe];je||(je=new Pr,g[qe]=je);let Ge=u.getCameraImage(qe);je.sourceTexture=Ge}}}}for(let be=0;be<I.length;be++){let Ee=A[be],pe=I[be];Ee!==null&&pe!==void 0&&pe.update(Ee,le,c||o)}Q&&Q(J,le),le.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:le}),p=null}let Se=new af;Se.setAnimationLoop(_e),this.setAnimationLoop=function(J){Q=J},this.dispose=function(){}}},fv=new Ye,xf=new We;xf.set(-1,0,0,0,1,0,0,0,1);function pv(i,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,Kc(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,y,b,S){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),d(m,g),g.isMeshPhysicalMaterial&&f(m,g,S)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),_(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?l(m,g,y,b):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===tn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===tn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let y=e.get(g),b=y.envMap,S=y.envMapRotation;b&&(m.envMap.value=b,m.envMapRotation.value.setFromMatrix4(fv.makeRotationFromEuler(S)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(xf),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,y,b){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*y,m.scale.value=b*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function f(m,g,y){m.ior.value=g.ior,g.diffuseRoughness>0&&(m.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=g.diffuseRoughnessMap,t(g.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===tn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function _(m,g){let y=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function mv(i,e,t,n){let s={},r={};function o(y,b){let S=b.program;n.uniformBlockBinding(y,S,s[y.id])}function a(y,b){let S=s[y.id];S===void 0&&(p(y),S=l(y),s[y.id]=S,y.addEventListener("dispose",m));let I=b.program;n.updateUBOMapping(y,I);let A=e.render.frame;r[y.id]!==A&&(c(y),r[y.id]=A)}function l(y){let b=i.createBuffer(),S=y.__size,I=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,S,I),i.bindBuffer(i.UNIFORM_BUFFER,null),b}function c(y){let b=s[y.id],S=y.uniforms,I=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let A=0,x=S.length;A<x;A++){let E=S[A];if(Array.isArray(E))for(let L=0,w=E.length;L<w;L++)h(E[L],A,L,I);else h(E,A,0,I)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(y,b,S,I){if(d(y,b,S,I)===!0){let A=y.__offset,x=y.value;if(Array.isArray(x)){let E=0;for(let L=0;L<x.length;L++){let w=x[L],D=_(w,!0);u(w,y.__data,E),E+=D.storage/Float32Array.BYTES_PER_ELEMENT}}else u(x,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,A,y.__data)}}function u(y,b,S){typeof y=="number"||typeof y=="boolean"?b[S]=y:y.isMatrix3?(b[S]=y.elements[0],b[S+1]=y.elements[1],b[S+2]=y.elements[2],b[S+3]=0,b[S+4]=y.elements[3],b[S+5]=y.elements[4],b[S+6]=y.elements[5],b[S+7]=0,b[S+8]=y.elements[6],b[S+9]=y.elements[7],b[S+10]=y.elements[8],b[S+11]=0):ArrayBuffer.isView(y)?b.set(y.subarray(0,b.length-S),S):y.toArray(b,S)}function d(y,b,S,I){let A=y.value,x=b+"_"+S;if(Array.isArray(A)){I[x]===void 0&&(I[x]=[]);let E=I[x],L=!1;for(let w=0;w<A.length;w++)f(A[w],E,w)===!0&&(L=!0);return L}return f(A,I,x)}function f(y,b,S){if(b[S]===void 0)return typeof y=="number"||typeof y=="boolean"?b[S]=y:ArrayBuffer.isView(y)?b[S]=y.slice():b[S]=y.clone(),!0;{let I=b[S];if(typeof y=="number"||typeof y=="boolean"){if(I!==y)return b[S]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(I.equals(y)===!1)return I.copy(y),!0}}return!1}function p(y){let b=y.uniforms,S=0,I=16;for(let x=0,E=b.length;x<E;x++){let L=Array.isArray(b[x])?b[x]:[b[x]];for(let w=0,D=L.length;w<D;w++){let U=L[w],P=Array.isArray(U.value)?U.value:[U.value],T=Array.isArray(b[x])||Array.isArray(U.value),O=S;for(let k=0,q=P.length;k<q;k++){let G=P[k],X=_(G,T),Q=S%I,_e=Q%X.boundary,Se=Q+_e;S+=_e,Se!==0&&I-Se<X.storage&&(S+=I-Se),k===0&&(O=S),S+=X.storage}let z=U.type==="int"?Int32Array:U.type==="uint"?Uint32Array:Float32Array;U.__data=new z((S-O)/Float32Array.BYTES_PER_ELEMENT),U.__offset=O}}let A=S%I;return A>0&&(S+=I-A),y.__size=S,y.__cache={},this}function _(y,b){let S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=16,S.storage=48):y.isMatrix4?(S.boundary=16,S.storage=64):y.isTexture?ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(S.boundary=16,S.storage=y.byteLength):ke("WebGLRenderer: Unsupported uniform value type.",y),b===!0&&(S.boundary=16,S.storage=Math.ceil(S.storage/16)*16),S}function m(y){let b=y.target;b.removeEventListener("dispose",m),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function g(){for(let y in s)i.deleteBuffer(s[y]);s={},r={}}return{bind:o,update:a,dispose:g}}var gv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Jn=null;function xv(){return Jn===null&&(Jn=new Tr(gv,16,16,Ti,An),Jn.name="DFG_LUT",Jn.minFilter=mn,Jn.magFilter=mn,Jn.wrapS=qn,Jn.wrapT=qn,Jn.generateMipmaps=!1,Jn.needsUpdate=!0),Jn}var fl=class{constructor(e={}){let{canvas:t=Ad(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=vn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let _=f,m=new Set([Pa,Ia,Ca]),g=new Set([vn,kn,Gs,Xi,Ta,Aa]),y=new Uint32Array(4),b=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]},I=null,A=null,x=[],E=[],L=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let w=this,D=!1,U=null,P=null,T=null,O=null;this._outputColorSpace=Qt;let z=0,k=0,q=null,G=-1,X=null,Q=new mt,_e=new mt,Se=null,J=new Te(0),le=0,be=t.width,Ee=t.height,pe=1,Ae=null,xt=null,Le=new mt(0,0,be,Ee),qe=new mt(0,0,be,Ee),je=!1,Ge=new vi,Tt=new ia,ct=!1,Ot=!1,At=new Ye,Rn=new C,Mt=new mt,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ue=!1;function we(){return q===null?pe:1}let F=n;function at(M,B){return t.getContext(M,B)}let Je,ht,ce,Rt,Oe,Ve,R,v,H,ne,te,oe,ge,K,j,he,N,ee,$,ue,se,ae,Fe;try{let M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",Be,!1),t.addEventListener("webglcontextrestored",Ze,!1),t.addEventListener("webglcontextcreationerror",ve,!1),F===null){let B="webgl2";if(F=at(B,M),F===null)throw at(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}$e()}catch(M){throw t.removeEventListener("webglcontextlost",Be,!1),t.removeEventListener("webglcontextrestored",Ze,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),He("WebGLRenderer: "+M.message),M}function $e(){Je=new Rx(F),Je.init(),se=new hv(F,Je),ht=new xx(F,Je,e,se),ce=new lv(F,Je),ht.reversedDepthBuffer&&d&&ce.buffers.depth.setReversed(!0),P=F.createFramebuffer(),T=F.createFramebuffer(),O=F.createFramebuffer(),Rt=new Px(F),Oe=new Z_,Ve=new cv(F,Je,ce,Oe,ht,se,Rt),R=new Ax(w),v=new Dm(F),ae=new mx(F,v),H=new Cx(F,v,Rt,ae),ne=new Dx(F,H,v,ae,Rt),ee=new Lx(F,ht,Ve),j=new _x(Oe),te=new Y_(w,R,Je,ht,ae,j),oe=new pv(w,Oe),ge=new $_,K=new nv(Je),N=new px(w,R,ce,ne,p,l),he=new av(w,ne,ht),Fe=new mv(F,Rt,ht,ce),$=new gx(F,Je,Rt),ue=new Ix(F,Je,Rt),Rt.programs=te.programs,w.capabilities=ht,w.extensions=Je,w.properties=Oe,w.renderLists=ge,w.shadowMap=he,w.state=ce,w.info=Rt}_!==vn&&(L=new Ux(_,t.width,t.height,a,s,r));let ie=new mh(w,F);this.xr=ie,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let M=Je.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=Je.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return pe},this.setPixelRatio=function(M){M!==void 0&&(pe=M,this.setSize(be,Ee,!1))},this.getSize=function(M){return M.set(be,Ee)},this.setSize=function(M,B,Y=!0){if(ie.isPresenting){ke("WebGLRenderer: Can't change size while VR device is presenting.");return}be=M,Ee=B,t.width=Math.floor(M*pe),t.height=Math.floor(B*pe),Y===!0&&(t.style.width=M+"px",t.style.height=B+"px"),L!==null&&L.setSize(t.width,t.height),this.setViewport(0,0,M,B)},this.getDrawingBufferSize=function(M){return M.set(be*pe,Ee*pe).floor()},this.setDrawingBufferSize=function(M,B,Y){be=M,Ee=B,pe=Y,t.width=Math.floor(M*Y),t.height=Math.floor(B*Y),this.setViewport(0,0,M,B)},this.setEffects=function(M){if(_===vn){He("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let B=0;B<M.length;B++)if(M[B].isOutputPass===!0){ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(Q)},this.getViewport=function(M){return M.copy(Le)},this.setViewport=function(M,B,Y,V){M.isVector4?Le.set(M.x,M.y,M.z,M.w):Le.set(M,B,Y,V),ce.viewport(Q.copy(Le).multiplyScalar(we()).round())},this.getScissor=function(M){return M.copy(qe)},this.setScissor=function(M,B,Y,V){M.isVector4?qe.set(M.x,M.y,M.z,M.w):qe.set(M,B,Y,V),ce.scissor(_e.copy(qe).multiplyScalar(we()).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(M){ce.setScissorTest(je=M)},this.setOpaqueSort=function(M){Ae=M},this.setTransparentSort=function(M){xt=M},this.getClearColor=function(M){return M.copy(N.getClearColor())},this.setClearColor=function(){N.setClearColor(...arguments)},this.getClearAlpha=function(){return N.getClearAlpha()},this.setClearAlpha=function(){N.setClearAlpha(...arguments)},this.clear=function(M=!0,B=!0,Y=!0){let V=0;if(M){let W=!1;if(q!==null){let xe=q.texture.format;W=m.has(xe)}if(W){let xe=q.texture.type,Re=g.has(xe),fe=N.getClearColor(),Me=N.getClearAlpha(),De=fe.r,Xe=fe.g,it=fe.b;Re?(y[0]=De,y[1]=Xe,y[2]=it,y[3]=Me,F.clearBufferuiv(F.COLOR,0,y)):(b[0]=De,b[1]=Xe,b[2]=it,b[3]=Me,F.clearBufferiv(F.COLOR,0,b))}else V|=F.COLOR_BUFFER_BIT}B&&(V|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(V|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&F.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),U=M},this.dispose=function(){t.removeEventListener("webglcontextlost",Be,!1),t.removeEventListener("webglcontextrestored",Ze,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),N.dispose(),ge.dispose(),K.dispose(),Ve.dispose(),Oe.dispose(),R.dispose(),ne.dispose(),H.dispose(),ae.dispose(),Fe.dispose(),te.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",nu),ie.removeEventListener("sessionend",iu),Ai.stop()};function Be(M){M.preventDefault(),_r("WebGLRenderer: Context Lost."),D=!0}function Ze(){_r("WebGLRenderer: Context Restored."),D=!1;let M=Rt.autoReset,B=he.enabled,Y=he.autoUpdate,V=he.needsUpdate,W=he.type;$e(),Rt.autoReset=M,he.enabled=B,he.autoUpdate=Y,he.needsUpdate=V,he.type=W}function ve(M){He("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function pt(M){let B=M.target;B.removeEventListener("dispose",pt),qt(B)}function qt(M){di(M),Oe.remove(M)}function di(M){let B=Oe.get(M).programs;B!==void 0&&(B.forEach(function(Y){te.releaseProgram(Y)}),M.isShaderMaterial&&te.releaseShaderCache(M))}this.renderBufferDirect=function(M,B,Y,V,W,xe){B===null&&(B=me);let Re=W.isMesh&&W.matrixWorld.determinantAffine()<0,fe=rp(M,B,Y,V,W);ce.setMaterial(V,Re);let Me=Y.index,De=1;if(V.wireframe===!0){if(Me=H.getWireframeAttribute(Y),Me===void 0)return;De=2}let Xe=Y.drawRange,it=Y.attributes.position,Ie=Xe.start*De,st=(Xe.start+Xe.count)*De;xe!==null&&(Ie=Math.max(Ie,xe.start*De),st=Math.min(st,(xe.start+xe.count)*De)),Me!==null?(Ie=Math.max(Ie,0),st=Math.min(st,Me.count)):it!=null&&(Ie=Math.max(Ie,0),st=Math.min(st,it.count));let zt=st-Ie;if(zt<0||zt===1/0)return;ae.setup(W,V,fe,Y,Me);let St,_t=$;if(Me!==null&&(St=v.get(Me),_t=ue,_t.setIndex(St)),W.isMesh)V.wireframe===!0?(ce.setLineWidth(V.wireframeLinewidth*we()),_t.setMode(F.LINES)):_t.setMode(F.TRIANGLES);else if(W.isLine){let nn=V.linewidth;nn===void 0&&(nn=1),ce.setLineWidth(nn*we()),W.isLineSegments?_t.setMode(F.LINES):W.isLineLoop?_t.setMode(F.LINE_LOOP):_t.setMode(F.LINE_STRIP)}else W.isPoints?_t.setMode(F.POINTS):W.isSprite&&_t.setMode(F.TRIANGLES);if(W.isBatchedMesh)if(Je.get("WEBGL_multi_draw"))_t.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let nn=W._multiDrawStarts,Pe=W._multiDrawCounts,dn=W._multiDrawCount,lt=Me?v.get(Me).bytesPerElement:1,Ri=Oe.get(V).currentProgram.getUniforms();for(let sn=0;sn<dn;sn++)Ri.setValue(F,"_gl_DrawID",sn),_t.render(nn[sn]/lt,Pe[sn])}else if(W.isInstancedMesh)_t.renderInstances(Ie,zt,W.count);else if(Y.isInstancedBufferGeometry){let nn=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Pe=Math.min(Y.instanceCount,nn);_t.renderInstances(Ie,zt,Pe)}else _t.render(Ie,zt)};function tu(M,B,Y,V){U!==null&&M.isNodeMaterial&&U.setObject(V,M),ct===!0&&j.setState(M,Y,!1),M.transparent===!0&&M.side===Pt&&M.forceSinglePass===!1?(M.side=tn,M.needsUpdate=!0,js(M,B,V),M.side=wi,M.needsUpdate=!0,js(M,B,V),M.side=Pt):js(M,B,V)}this.compile=function(M,B,Y=null){Y===null&&(Y=M),U!==null&&U.renderStart(M,B,Y),A=K.get(Y),A.init(B),E.push(A),Y.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(A.pushLight(W),W.castShadow&&A.pushShadow(W))}),M!==Y&&M.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(A.pushLight(W),W.castShadow&&A.pushShadow(W))}),A.setupLights(),U!==null&&U.updateLights(A.state.lightsArray),Ot=this.localClippingEnabled,ct=j.init(this.clippingPlanes,Ot),ct===!0&&j.setGlobalState(this.clippingPlanes,B),U!==null&&he.render(A.state.shadowsArray,Y,B);let V=new Set;return M.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let xe=W.material;if(xe)if(Array.isArray(xe))for(let Re=0;Re<xe.length;Re++){let fe=xe[Re];tu(fe,Y,B,W),V.add(fe)}else tu(xe,Y,B,W),V.add(xe)}),A=E.pop(),U!==null&&U.renderEnd(),V},this.compileAsync=function(M,B,Y=null){let V=this.compile(M,B,Y);return new Promise(W=>{function xe(){if(V.forEach(function(Re){let Me=Oe.get(Re).currentProgram;(Me===void 0||Me.isReady())&&V.delete(Re)}),V.size===0){W(M);return}setTimeout(xe,10)}Je.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Ul=null;function ip(M){Ul&&Ul(M)}function nu(){Ai.stop()}function iu(){Ai.start()}let Ai=new af;Ai.setAnimationLoop(ip),typeof self<"u"&&Ai.setContext(self),this.setAnimationLoop=function(M){Ul=M,ie.setAnimationLoop(M),M===null?Ai.stop():Ai.start()},ie.addEventListener("sessionstart",nu),ie.addEventListener("sessionend",iu),this.render=function(M,B){if(B!==void 0&&B.isCamera!==!0){He("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;U!==null&&U.renderStart(M,B);let Y=ie.enabled===!0&&ie.isPresenting===!0,V=L!==null&&(q===null||Y)&&L.begin(w,q);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(B),B=ie.getCamera()),M.isScene===!0&&M.onBeforeRender(w,M,B,q),A=K.get(M,E.length),A.init(B),A.state.textureUnits=Ve.getTextureUnits(),E.push(A),At.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),B.isArrayCamera?Tt.setFromArrayCamera(B):Ge.setFromProjectionMatrix(At,In,B.reversedDepth),Ot=this.localClippingEnabled,ct=j.init(this.clippingPlanes,Ot),I=ge.get(M,x.length),I.init(),x.push(I),this.info.render.frame++,ie.enabled===!0&&ie.isPresenting===!0){let Re=w.xr.getDepthSensingMesh();Re!==null&&Fl(Re,B,-1/0,w.sortObjects)}Fl(M,B,0,w.sortObjects),I.finish(),U!==null&&U.updateLights(A.state.lightsArray),w.sortObjects===!0&&I.sort(Ae,xt),Ue=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,Ue&&N.addToRenderList(I,M),this.info.autoReset===!0&&this.info.reset(),ct===!0&&j.beginShadows();let W=A.state.shadowsArray;if(he.render(W,M,B),ct===!0&&j.endShadows(),(V&&L.hasRenderPass())===!1){let Re=I.opaque,fe=I.transmissive;if(A.setupLights(),B.isArrayCamera){let Me=B.cameras;if(fe.length>0)for(let De=0,Xe=Me.length;De<Xe;De++){let it=Me[De];ru(Re,fe,M,it)}Ue&&N.render(M);for(let De=0,Xe=Me.length;De<Xe;De++){let it=Me[De];su(I,M,it,it.viewport)}}else fe.length>0&&ru(Re,fe,M,B),Ue&&N.render(M),su(I,M,B)}q!==null&&k===0&&(Ve.updateMultisampleRenderTarget(q),Ve.updateRenderTargetMipmap(q)),V&&L.end(w),M.isScene===!0&&M.onAfterRender(w,M,B),ae.resetDefaultState(),G=-1,X=null,E.pop(),E.length>0?(A=E[E.length-1],Ve.setTextureUnits(A.state.textureUnits),ct===!0&&j.setGlobalState(w.clippingPlanes,A.state.camera)):A=null,x.pop(),x.length>0?I=x[x.length-1]:I=null,U!==null&&U.renderEnd()};function Fl(M,B,Y,V){if(M.visible===!1)return;if(M.layers.test(B.layers)){if(M.isGroup)Y=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(B);else if(M.isLight)A.pushLight(M),M.castShadow&&A.pushShadow(M);else if(M.isSprite){let Re=B.isArrayCamera?Tt:Ge;if(!M.frustumCulled||M.intersectsFrustum(Re)){V&&Mt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(At);let fe=ne.update(M),Me=M.material;Me.visible&&I.push(M,fe,Me,Y,Mt.z,null,B)}}else if(M.isMesh||M.isLine||M.isPoints){let Re=B.isArrayCamera?Tt:Ge;if(!M.frustumCulled||M.intersectsFrustum(Re)){let fe=ne.update(M),Me=M.material;if(V&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Mt.copy(M.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),Mt.copy(fe.boundingSphere.center)),Mt.applyMatrix4(M.matrixWorld).applyMatrix4(At)),Array.isArray(Me)){let De=fe.groups;for(let Xe=0,it=De.length;Xe<it;Xe++){let Ie=De[Xe],st=Me[Ie.materialIndex];st&&st.visible&&I.push(M,fe,st,Y,Mt.z,Ie,B)}}else Me.visible&&I.push(M,fe,Me,Y,Mt.z,null,B)}}}let xe=M.children;for(let Re=0,fe=xe.length;Re<fe;Re++)Fl(xe[Re],B,Y,V)}function su(M,B,Y,V){let{opaque:W,transmissive:xe,transparent:Re}=M;A.setupLightsView(Y),ct===!0&&j.setGlobalState(w.clippingPlanes,Y),V&&ce.viewport(Q.copy(V)),W.length>0&&go(W,B,Y),xe.length>0&&go(xe,B,Y),Re.length>0&&go(Re,B,Y),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function ru(M,B,Y,V){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[V.id]===void 0){let Ie=Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[V.id]=new xn(1,1,{generateMipmaps:!0,type:Ie?An:vn,minFilter:zn,samples:Math.max(4,ht.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:rt.workingColorSpace})}let xe=A.state.transmissionRenderTarget[V.id],Re=V.viewport||Q;xe.setSize(Re.z*w.transmissionResolutionScale,Re.w*w.transmissionResolutionScale);let fe=w.getRenderTarget(),Me=w.getActiveCubeFace(),De=w.getActiveMipmapLevel();w.setRenderTarget(xe),w.getClearColor(J),le=w.getClearAlpha(),le<1&&w.setClearColor(16777215,.5),w.clear(),Ue&&N.render(Y);let Xe=w.toneMapping;w.toneMapping=Zn;let it=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),A.setupLightsView(V),ct===!0&&j.setGlobalState(w.clippingPlanes,V),go(M,Y,V),Ve.updateMultisampleRenderTarget(xe),Ve.updateRenderTargetMipmap(xe),Je.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let st=0,zt=B.length;st<zt;st++){let St=B[st],{object:_t,geometry:nn,material:Pe,group:dn}=St;if(Pe.side===Pt&&_t.layers.test(V.layers)){let lt=Pe.side;Pe.side=tn,Pe.needsUpdate=!0,ou(_t,Y,V,nn,Pe,dn),Pe.side=lt,Pe.needsUpdate=!0,Ie=!0}}Ie===!0&&(Ve.updateMultisampleRenderTarget(xe),Ve.updateRenderTargetMipmap(xe))}w.setRenderTarget(fe,Me,De),w.setClearColor(J,le),it!==void 0&&(V.viewport=it),w.toneMapping=Xe}function go(M,B,Y){let V=B.isScene===!0?B.overrideMaterial:null;for(let W=0,xe=M.length;W<xe;W++){let Re=M[W],{object:fe,geometry:Me,group:De}=Re,Xe=Re.material;Xe.allowOverride===!0&&V!==null&&(Xe=V),fe.layers.test(Y.layers)&&ou(fe,B,Y,Me,Xe,De)}}function ou(M,B,Y,V,W,xe){U!==null&&W.isNodeMaterial&&U.setObject(M,W),M.onBeforeRender(w,B,Y,V,W,xe),M.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),W.onBeforeRender(w,B,Y,V,M,xe),W.transparent===!0&&W.side===Pt&&W.forceSinglePass===!1?(W.side=tn,W.needsUpdate=!0,w.renderBufferDirect(Y,B,V,W,M,xe),W.side=wi,W.needsUpdate=!0,w.renderBufferDirect(Y,B,V,W,M,xe),W.side=Pt):w.renderBufferDirect(Y,B,V,W,M,xe),M.onAfterRender(w,B,Y,V,W,xe)}function au(M){let B=0;for(let Y of M)Y.texture!==null&&B++;return B}function js(M,B,Y){B.isScene!==!0&&(B=me);let V=Oe.get(M),W=A.state.lights,xe=A.state.shadowsArray,Re=W.state.version,fe=te.getParameters(M,W.state,xe,B,Y,A.state.lightProbeGridArray),Me=te.getProgramCacheKey(fe),De=V.programs;V.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?B.environment:null,V.fog=B.fog;let Xe=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;V.envMap=R.get(M.envMap||V.environment,Xe),V.envMapRotation=V.environment!==null&&M.envMap===null?B.environmentRotation:M.envMapRotation,De===void 0&&(M.addEventListener("dispose",pt),De=new Map,V.programs=De,V.programVariants=new Map);let it=De.get(Me);if(it!==void 0){if(V.currentProgram===it&&V.lightsStateVersion===Re)return cu(M,fe),it}else fe.uniforms=te.getUniforms(M),U!==null&&M.isNodeMaterial&&U.build(M,Y,fe),M.onBeforeCompile(fe,w),it=te.acquireProgram(fe,Me),De.set(Me,it),V.uniforms=fe.uniforms;let Ie=V.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ie.clippingPlanes=j.uniform),cu(M,fe),V.needsLights=ap(M),V.lightsStateVersion=Re,V.needsLights&&(Ie.ambientLightColor.value=W.state.ambient,Ie.lightProbe.value=W.state.probe,Ie.sunLights.value=W.state.sun,Ie.sunLightShadows.value=W.state.sunShadow,Ie.directionalLights.value=W.state.directional,Ie.directionalLightShadows.value=W.state.directionalShadow,Ie.spotLights.value=W.state.spot,Ie.spotLightShadows.value=W.state.spotShadow,Ie.rectAreaLights.value=W.state.rectArea,Ie.ltc_1.value=W.state.rectAreaLTC1,Ie.ltc_2.value=W.state.rectAreaLTC2,Ie.pointLights.value=W.state.point,Ie.pointLightShadows.value=W.state.pointShadow,Ie.hemisphereLights.value=W.state.hemi,Ie.sunShadowMatrix.value=W.state.sunShadowMatrix,Ie.sunShadowCascade.value=W.state.sunShadowCascade,Ie.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ie.spotLightMatrix.value=W.state.spotLightMatrix,Ie.spotLightMap.value=W.state.spotLightMap,Ie.pointShadowMatrix.value=W.state.pointShadowMatrix),V.numLightProbeGrids=au(A.state.lightProbeGridArray),V.currentProgram=it,V.uniformsList=null,it}function sp(M,B,Y,V,W){let xe=Oe.get(M),Re=xe.currentProgram.id+","+V+","+W,fe=xe.programVariants.get(Re);return fe===void 0?(fe=js(M,B,Y),xe.programVariants.set(Re,fe)):(xe.currentProgram=fe,xe.uniformsList=null,xe.outputColorSpace=V,xe.toneMapping=W),fe}function lu(M){if(M.uniformsList===null){let B=M.currentProgram.getUniforms();M.uniformsList=Ws.seqWithValue(B.seq,M.uniforms)}return M.uniformsList}function cu(M,B){let Y=Oe.get(M);Y.outputColorSpace=B.outputColorSpace,Y.batching=B.batching,Y.batchingColor=B.batchingColor,Y.instancing=B.instancing,Y.instancingColor=B.instancingColor,Y.instancingMorph=B.instancingMorph,Y.skinning=B.skinning,Y.morphTargets=B.morphTargets,Y.morphNormals=B.morphNormals,Y.morphColors=B.morphColors,Y.morphTargetsCount=B.morphTargetsCount,Y.numClippingPlanes=B.numClippingPlanes,Y.numIntersection=B.numClipIntersection,Y.vertexAlphas=B.vertexAlphas,Y.vertexTangents=B.vertexTangents,Y.toneMapping=B.toneMapping}function rp(M,B,Y,V,W){B.isScene!==!0&&(B=me),Ve.resetTextureUnits();let xe=B.fog,Re=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?B.environment:null,fe=q===null?w.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:rt.workingColorSpace,Me=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,De=R.get(V.envMap||Re,Me),Xe=V.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,it=!!Y.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ie=!!Y.morphAttributes.position,st=!!Y.morphAttributes.normal,zt=!!Y.morphAttributes.color,St=Zn;V.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(St=w.toneMapping);let _t=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,nn=_t!==void 0?_t.length:0,Pe=Oe.get(V),dn=A.state.lights;if(ct===!0&&(Ot===!0||M!==X)){let Lt=M===X&&V.id===G;j.setState(V,M,Lt)}let lt=!1,Ri=!1;V.version===Pe.__version?Pe.needsLights&&Pe.lightsStateVersion!==dn.state.version||W.isBatchedMesh&&Pe.batching===!1||!W.isBatchedMesh&&Pe.batching===!0||W.isBatchedMesh&&Pe.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Pe.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Pe.instancing===!1||!W.isInstancedMesh&&Pe.instancing===!0||W.isSkinnedMesh&&Pe.skinning===!1||!W.isSkinnedMesh&&Pe.skinning===!0||W.isInstancedMesh&&Pe.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Pe.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Pe.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Pe.instancingMorph===!1&&W.morphTexture!==null||Pe.envMap!==De||V.fog===!0&&Pe.fog!==xe||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==j.numPlanes||Pe.numIntersection!==j.numIntersection)||Pe.vertexAlphas!==Xe||Pe.vertexTangents!==it||Pe.morphTargets!==Ie||Pe.morphNormals!==st||Pe.morphColors!==zt||Pe.morphTargetsCount!==nn||Pe.numLightProbeGrids!==au(A.state.lightProbeGridArray)?lt=!0:(Pe.outputColorSpace!==fe||Pe.toneMapping!==St)&&(Ri=!0):(lt=!0,Pe.__version=V.version);let sn=Pe.currentProgram;(lt===!0||Ri===!0)&&(sn=Ri===!0?sp(V,B,W,fe,St):js(V,B,W),U&&V.isNodeMaterial&&U.onUpdateProgram(V,sn,Pe));let xo=!1,fi=!1,Ci=!1,ot=sn.getUniforms(),Kt=Pe.uniforms;if(ce.useProgram(sn.program)&&(xo=!0,fi=!0,Ci=!0),V.id!==G&&(G=V.id,fi=!0),xo||X!==M){ce.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ot.setValue(F,"projectionMatrix",M.projectionMatrix),ot.setValue(F,"viewMatrix",M.matrixWorldInverse);let Yt=ot.map.cameraPosition;Yt!==void 0&&Yt.setValue(F,Rn.setFromMatrixPosition(M.matrixWorld)),ht.logarithmicDepthBuffer&&ot.setValue(F,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ot.setValue(F,"isOrthographic",M.isOrthographicCamera===!0),X!==M&&(X=M,fi=!0,Ci=!0)}if(Pe.needsLights&&(dn.state.sunShadowMap.length>0&&ot.setValue(F,"sunShadowMap",dn.state.sunShadowMap,Ve),dn.state.directionalShadowMap.length>0&&ot.setValue(F,"directionalShadowMap",dn.state.directionalShadowMap,Ve),dn.state.spotShadowMap.length>0&&ot.setValue(F,"spotShadowMap",dn.state.spotShadowMap,Ve),dn.state.pointShadowMap.length>0&&ot.setValue(F,"pointShadowMap",dn.state.pointShadowMap,Ve)),W.isSkinnedMesh){ot.setOptional(F,W,"bindMatrix"),ot.setOptional(F,W,"bindMatrixInverse");let Lt=W.skeleton;Lt&&(Lt.boneTexture===null&&Lt.computeBoneTexture(),ot.setValue(F,"boneTexture",Lt.boneTexture,Ve))}W.isBatchedMesh&&(ot.setOptional(F,W,"batchingTexture"),ot.setValue(F,"batchingTexture",W._matricesTexture,Ve),ot.setOptional(F,W,"batchingIdTexture"),ot.setValue(F,"batchingIdTexture",W._indirectTexture,Ve),ot.setOptional(F,W,"batchingColorTexture"),W._colorsTexture!==null&&ot.setValue(F,"batchingColorTexture",W._colorsTexture,Ve));let Dn=Y.morphAttributes;if((Dn.position!==void 0||Dn.normal!==void 0||Dn.color!==void 0)&&ee.update(W,Y,sn),(fi||Pe.receiveShadow!==W.receiveShadow)&&(Pe.receiveShadow=W.receiveShadow,ot.setValue(F,"receiveShadow",W.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&B.environment!==null&&(Kt.envMapIntensity.value=B.environmentIntensity),Kt.dfgLUT!==void 0&&(Kt.dfgLUT.value=xv()),fi){if(ot.setValue(F,"toneMappingExposure",w.toneMappingExposure),Pe.needsLights&&op(Kt,Ci),xe&&V.fog===!0&&oe.refreshFogUniforms(Kt,xe),oe.refreshMaterialUniforms(Kt,V,pe,Ee,A.state.transmissionRenderTarget[M.id]),Pe.needsLights&&Pe.numLightProbeGrids>0){let Lt=S,Yt=0;for(let jn of A.state.lightProbeGridArray)jn.texture!==null&&(Lt.textures[Yt]=jn.texture,Lt.min[Yt]=jn.boundingBox.min,Lt.max[Yt]=jn.boundingBox.max,Lt.resolution[Yt]=jn.resolution,Yt++);for(let jn in Lt)Lt[jn].length=Yt;Kt.probesSH.value=Lt.textures,Kt.probesMin.value=Lt.min,Kt.probesMax.value=Lt.max,Kt.probesResolution.value=Lt.resolution}Ws.upload(F,lu(Pe),Kt,Ve)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Ws.upload(F,lu(Pe),Kt,Ve),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ot.setValue(F,"center",W.center),ot.setValue(F,"modelViewMatrix",W.modelViewMatrix),ot.setValue(F,"normalMatrix",W.normalMatrix),ot.setValue(F,"modelMatrix",W.matrixWorld),V.uniformsGroups!==void 0){let Lt=V.uniformsGroups;for(let Yt=0,jn=Lt.length;Yt<jn;Yt++){let uu=Lt[Yt];Fe.update(uu,sn),Fe.bind(uu,sn)}}return sn}function op(M,B){M.ambientLightColor.needsUpdate=B,M.lightProbe.needsUpdate=B,M.sunLights.needsUpdate=B,M.sunLightShadows.needsUpdate=B,M.directionalLights.needsUpdate=B,M.directionalLightShadows.needsUpdate=B,M.pointLights.needsUpdate=B,M.pointLightShadows.needsUpdate=B,M.spotLights.needsUpdate=B,M.spotLightShadows.needsUpdate=B,M.rectAreaLights.needsUpdate=B,M.hemisphereLights.needsUpdate=B}function ap(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(M,B,Y){let V=Oe.get(M);V.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),Oe.get(M.texture).__webglTexture=B,Oe.get(M.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:Y,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,B){let Y=Oe.get(M);Y.__webglFramebuffer=B,Y.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(M,B=0,Y=0){q=M,z=B,k=Y;let V=null,W=!1,xe=!1;if(M){let fe=Oe.get(M);if(fe.__useDefaultFramebuffer!==void 0){ce.bindFramebuffer(F.FRAMEBUFFER,fe.__webglFramebuffer),Q.copy(M.viewport),_e.copy(M.scissor),Se=M.scissorTest,ce.viewport(Q),ce.scissor(_e),ce.setScissorTest(Se),G=-1;return}else if(fe.__webglFramebuffer===void 0)Ve.setupRenderTarget(M);else if(fe.__hasExternalTextures)Ve.rebindTextures(M,Oe.get(M.texture).__webglTexture,Oe.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Xe=M.depthTexture;if(fe.__boundDepthTexture!==Xe){if(Xe!==null&&Oe.has(Xe)&&(M.width!==Xe.image.width||M.height!==Xe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ve.setupDepthRenderbuffer(M)}}let Me=M.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(xe=!0);let De=Oe.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(De[B])?V=De[B][Y]:V=De[B],W=!0):M.samples>0&&Ve.useMultisampledRTT(M)===!1?V=Oe.get(M).__webglMultisampledFramebuffer:Array.isArray(De)?V=De[Y]:V=De,Q.copy(M.viewport),_e.copy(M.scissor),Se=M.scissorTest}else Q.copy(Le).multiplyScalar(pe).floor(),_e.copy(qe).multiplyScalar(pe).floor(),Se=je;if(Y!==0&&(V=P),ce.bindFramebuffer(F.FRAMEBUFFER,V)&&ce.drawBuffers(M,V),ce.viewport(Q),ce.scissor(_e),ce.setScissorTest(Se),W){let fe=Oe.get(M.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+B,fe.__webglTexture,Y)}else if(xe){let fe=B;for(let Me=0;Me<M.textures.length;Me++){let De=Oe.get(M.textures[Me]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Me,De.__webglTexture,Y,fe)}}else if(M!==null&&Y!==0){let fe=Oe.get(M.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,fe.__webglTexture,Y)}G=-1};function hu(M){let B=Oe.get(M);return(B.__readFormat!==M.format||B.__readType!==M.type)&&(B.__readFormat=M.format,B.__readType=M.type,B.__formatReadable=ht.textureFormatReadable(M.format),B.__typeReadable=ht.textureTypeReadable(M.type)),B}this.readRenderTargetPixels=function(M,B,Y,V,W,xe,Re,fe=0){if(!(M&&M.isWebGLRenderTarget)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=Oe.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Re!==void 0&&(Me=Me[Re],Array.isArray(Me)&&(Me=Me[0])),Me){ce.bindFramebuffer(F.FRAMEBUFFER,Me);try{let De=M.textures[fe],Xe=De.format,it=De.type;M.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+fe);let Ie=hu(De);if(Ie.__formatReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ie.__typeReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=M.width-V&&Y>=0&&Y<=M.height-W&&F.readPixels(B,Y,V,W,se.convert(Xe),se.convert(it),xe)}finally{let De=q!==null?Oe.get(q).__webglFramebuffer:null;ce.bindFramebuffer(F.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(M,B,Y,V,W,xe,Re,fe=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=Oe.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Re!==void 0&&(Me=Me[Re],Array.isArray(Me)&&(Me=Me[0])),Me)if(B>=0&&B<=M.width-V&&Y>=0&&Y<=M.height-W){ce.bindFramebuffer(F.FRAMEBUFFER,Me);let De=M.textures[fe],Xe=De.format,it=De.type;M.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+fe);let Ie=hu(De);if(Ie.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ie.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let st=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,st),F.bufferData(F.PIXEL_PACK_BUFFER,xe.byteLength,F.STREAM_READ),F.readPixels(B,Y,V,W,se.convert(Xe),se.convert(it),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let zt=q!==null?Oe.get(q).__webglFramebuffer:null;ce.bindFramebuffer(F.FRAMEBUFFER,zt);let St=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Cd(F,St,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,st),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,xe),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(st),F.deleteSync(St),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,B=null,Y=0){let V=Math.pow(2,-Y),W=Math.floor(M.image.width*V),xe=Math.floor(M.image.height*V),Re=B!==null?B.x:0,fe=B!==null?B.y:0;Ve.setTexture2D(M,0),F.copyTexSubImage2D(F.TEXTURE_2D,Y,0,0,Re,fe,W,xe),ce.unbindTexture()},this.copyTextureToTexture=function(M,B,Y=null,V=null,W=0,xe=0){let Re,fe,Me,De,Xe,it,Ie,st,zt,St=M.isCompressedTexture?M.mipmaps[xe]:M.image;if(Y!==null)Re=Y.max.x-Y.min.x,fe=Y.max.y-Y.min.y,Me=Y.isBox3?Y.max.z-Y.min.z:1,De=Y.min.x,Xe=Y.min.y,it=Y.isBox3?Y.min.z:0;else{let ot=Math.pow(2,-W);Re=Math.floor(St.width*ot),fe=Math.floor(St.height*ot),M.isDataArrayTexture?Me=St.depth:M.isData3DTexture?Me=Math.floor(St.depth*ot):Me=1,De=0,Xe=0,it=0}V!==null?(Ie=V.x,st=V.y,zt=V.z):(Ie=0,st=0,zt=0);let _t=se.convert(B.format),nn=se.convert(B.type),Pe;B.isData3DTexture?(Ve.setTexture3D(B,0),Pe=F.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Ve.setTexture2DArray(B,0),Pe=F.TEXTURE_2D_ARRAY):(Ve.setTexture2D(B,0),Pe=F.TEXTURE_2D),ce.activeTexture(F.TEXTURE0),ce.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,B.flipY),ce.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),ce.pixelStorei(F.UNPACK_ALIGNMENT,B.unpackAlignment);let dn=ce.getParameter(F.UNPACK_ROW_LENGTH),lt=ce.getParameter(F.UNPACK_IMAGE_HEIGHT),Ri=ce.getParameter(F.UNPACK_SKIP_PIXELS),sn=ce.getParameter(F.UNPACK_SKIP_ROWS),xo=ce.getParameter(F.UNPACK_SKIP_IMAGES);ce.pixelStorei(F.UNPACK_ROW_LENGTH,St.width),ce.pixelStorei(F.UNPACK_IMAGE_HEIGHT,St.height),ce.pixelStorei(F.UNPACK_SKIP_PIXELS,De),ce.pixelStorei(F.UNPACK_SKIP_ROWS,Xe),ce.pixelStorei(F.UNPACK_SKIP_IMAGES,it);let fi=M.isDataArrayTexture||M.isData3DTexture,Ci=B.isDataArrayTexture||B.isData3DTexture;if(M.isDepthTexture){let ot=Oe.get(M),Kt=Oe.get(B),Dn=Oe.get(ot.__renderTarget),Lt=Oe.get(Kt.__renderTarget);ce.bindFramebuffer(F.READ_FRAMEBUFFER,Dn.__webglFramebuffer),ce.bindFramebuffer(F.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Yt=0;Yt<Me;Yt++)fi&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Oe.get(M).__webglTexture,W,it+Yt),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Oe.get(B).__webglTexture,xe,zt+Yt)),F.blitFramebuffer(De,Xe,De+Re,Xe+fe,Ie,st,Ie+Re,st+fe,F.DEPTH_BUFFER_BIT,F.NEAREST);ce.bindFramebuffer(F.READ_FRAMEBUFFER,null),ce.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(W!==0||M.isRenderTargetTexture||Oe.has(M)){let ot=Oe.get(M),Kt=Oe.get(B);ce.bindFramebuffer(F.READ_FRAMEBUFFER,T),ce.bindFramebuffer(F.DRAW_FRAMEBUFFER,O);for(let Dn=0;Dn<Me;Dn++)fi?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ot.__webglTexture,W,it+Dn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ot.__webglTexture,W),Ci?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Kt.__webglTexture,xe,zt+Dn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Kt.__webglTexture,xe),W!==0?F.blitFramebuffer(De,Xe,De+Re,Xe+fe,Ie,st,Ie+Re,st+fe,F.COLOR_BUFFER_BIT,F.NEAREST):Ci?F.copyTexSubImage3D(Pe,xe,Ie,st,zt+Dn,De,Xe,Re,fe):F.copyTexSubImage2D(Pe,xe,Ie,st,De,Xe,Re,fe);ce.bindFramebuffer(F.READ_FRAMEBUFFER,null),ce.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Ci?M.isDataTexture||M.isData3DTexture?F.texSubImage3D(Pe,xe,Ie,st,zt,Re,fe,Me,_t,nn,St.data):B.isCompressedArrayTexture?F.compressedTexSubImage3D(Pe,xe,Ie,st,zt,Re,fe,Me,_t,St.data):F.texSubImage3D(Pe,xe,Ie,st,zt,Re,fe,Me,_t,nn,St):M.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,xe,Ie,st,Re,fe,_t,nn,St.data):M.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,xe,Ie,st,St.width,St.height,_t,St.data):F.texSubImage2D(F.TEXTURE_2D,xe,Ie,st,Re,fe,_t,nn,St);ce.pixelStorei(F.UNPACK_ROW_LENGTH,dn),ce.pixelStorei(F.UNPACK_IMAGE_HEIGHT,lt),ce.pixelStorei(F.UNPACK_SKIP_PIXELS,Ri),ce.pixelStorei(F.UNPACK_SKIP_ROWS,sn),ce.pixelStorei(F.UNPACK_SKIP_IMAGES,xo),xe===0&&B.generateMipmaps===!0&&B.mipmapsAutoUpdate===!0&&F.generateMipmap(Pe),ce.unbindTexture()},this.initRenderTarget=function(M){Oe.get(M).__webglFramebuffer===void 0&&Ve.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Ve.setTextureCube(M,0):M.isData3DTexture?Ve.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Ve.setTexture2DArray(M,0):Ve.setTexture2D(M,0),ce.unbindTexture()},this.resetState=function(){z=0,k=0,q=null,ce.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=rt._getUnpackColorSpace()}};var ao=class i extends Ut{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;let n=this,s=t.color!==void 0?new Te(t.color):new Te(8355711),r=t.textureWidth||512,o=t.textureHeight||512,a=t.clipBias||0,l=t.shader||i.ReflectorShader,c=t.multisample!==void 0?t.multisample:4,h=new bn,u=new C,d=new C,f=new C,p=new Ye,_=new C(0,0,-1),m=new mt,g=new C,y=new C,b=new mt,S=new Ye,I=new xn(r,o,{samples:c,type:An}),A=new _n({name:l.name!==void 0?l.name:"unspecified",uniforms:hl.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});A.uniforms.tDiffuse.value=I.texture,A.uniforms.color.value=s,A.uniforms.textureMatrix.value=S,this.material=A,this.onBeforeRender=function(x,E,L){let w=this.getReflectionCamera(L);if(d.setFromMatrixPosition(n.matrixWorld),f.setFromMatrixPosition(L.matrixWorld),p.extractRotation(n.matrixWorld),u.set(0,0,1),u.applyMatrix4(p),g.subVectors(d,f),g.dot(u)>0===!0&&this.forceUpdate===!1)return;g.reflect(u).negate(),g.add(d),p.extractRotation(L.matrixWorld),_.set(0,0,-1),_.applyMatrix4(p),_.add(f),y.subVectors(d,_),y.reflect(u).negate(),y.add(d),w.position.copy(g),w.up.set(0,1,0),w.up.applyMatrix4(p),w.up.reflect(u),w.lookAt(y),w.far=L.far,w.updateMatrixWorld(),w.projectionMatrix.copy(L.projectionMatrix),w.projectionMatrix.elements[8]*=-1,w.projectionMatrix.elements[12]*=-1,S.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),S.multiply(w.projectionMatrix),S.multiply(w.matrixWorldInverse),S.multiply(n.matrixWorld),h.setFromNormalAndCoplanarPoint(u,d),h.applyMatrix4(w.matrixWorldInverse),m.set(h.normal.x,h.normal.y,h.normal.z,h.constant);let U=w.projectionMatrix;w.isOrthographicCamera?(b.x=(Math.sign(m.x)+U.elements[8])/U.elements[0],b.y=(Math.sign(m.y)+U.elements[9])/U.elements[5],b.z=-L.far,b.w=1):(b.x=(Math.sign(m.x)+U.elements[8])/U.elements[0],b.y=(Math.sign(m.y)+U.elements[9])/U.elements[5],b.z=-1,b.w=(1+U.elements[10])/U.elements[14]),m.multiplyScalar(2/m.dot(b)),U.elements[2]=m.x,U.elements[6]=m.y,w.isOrthographicCamera?(U.elements[10]=m.z-a,U.elements[14]=m.w-1):(U.elements[10]=m.z+1-a,U.elements[14]=m.w),n.visible=!1;let P=x.getRenderTarget(),T=x.xr.enabled,O=x.shadowMap.autoUpdate;x.xr.enabled=!1,x.shadowMap.autoUpdate=!1,x.setRenderTarget(I),x.state.buffers.depth.setMask(!0),x.autoClear===!1&&x.clear(),x.render(E,w),x.xr.enabled=T,x.shadowMap.autoUpdate=O,x.setRenderTarget(P);let z=L.viewport;z!==void 0&&x.state.viewport(z),n.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return I},this.dispose=function(){I.dispose(),n.material.dispose()},this.getReflectionCamera=function(x){let E=this._reflectionCameras.get(x);return E===void 0&&(E=x.clone(),this._reflectionCameras.set(x,E)),E}}};ao.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function lo(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new Nt;l.morphTargetsRelative=a;let c=0;for(let h=0;h<i.length;++h){let u=i[h],d=0,f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in u.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(u.morphAttributes[p].length!==i[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;o[p]===void 0&&(o[p]=[]),o[p].push(u.morphAttributes[p]),f++}if(f!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(e){let p;if(t)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(t){let h=0,u=[];for(let d=0;d<i.length;++d){let f=i[d].index;for(let p=0;p<f.count;++p)u.push(f.getX(p)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(let h in r){let u=_f(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let _=0;_<o[h].length;++_)f.push(o[h][_][d]);let p=_f(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}}return l}function _f(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let o=new e(r),a=new Bt(o,t,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let d=0,f=h.count;d<f;d++)for(let p=0;p<t;p++){let _=h.getComponent(d,p);a.setComponent(d+u,p,_)}}else o.set(h.array,l);l+=h.count*t}return s!==void 0&&(a.gpuType=s),a}function dt(i=1){let e=i>>>0;return function(){e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var gh=(i,e,t)=>i+(e-i)*t;var vf=i=>i*i*(3-2*i);function gl(i,e,t){let n=i*374761393+e*668265263+t*2147483647|0;return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function _v(i,e,t=1e9,n=0){let s=Math.floor(i),r=Math.floor(e),o=i-s,a=e-r,l=_=>(_%t+t)%t,c=gl(l(s),l(r),n),h=gl(l(s+1),l(r),n),u=gl(l(s),l(r+1),n),d=gl(l(s+1),l(r+1),n),f=vf(o),p=vf(a);return gh(gh(c,h,f),gh(u,d,f),p)}function Ys(i,e,{octaves:t=4,period:n=1e9,seed:s=0,gain:r=.5}={}){let o=.5,a=1,l=0,c=0;for(let h=0;h<t;h++)l+=o*_v(i*a,e*a,n*a,s+h*17),c+=o,o*=r,a*=2;return l/c}var yf=new an,Mf=new On,vv=new C,yv=new C;function Z(i=0,e=0,t=0,n=0,s=0,r=0,o=1,a=o,l=o){return Mf.set(s,n,r,"YXZ"),yf.setFromEuler(Mf),new Ye().compose(vv.set(i,e,t),yf,yv.set(o,a,l))}var ft=(i,e)=>new Ye().multiplyMatrices(i,e);function Yi(i,e=1,t=[0,0]){let n=i.attributes.position,s=i.attributes.normal,r=new Float32Array(n.count*2);for(let o=0;o<n.count;o++){let a=n.getX(o),l=n.getY(o),c=n.getZ(o),h=Math.abs(s.getX(o)),u=Math.abs(s.getY(o)),d=Math.abs(s.getZ(o)),f,p;u>=h&&u>=d?(f=a,p=c):h>=d?(f=c,p=l):(f=a,p=l),r[o*2]=f/e+t[0],r[o*2+1]=p/e+t[1]}return i.setAttribute("uv",new Bt(r,2)),i}function Ne(i,e,t,n,s,r,o=1){let a=new en(n-i,s-e,r-t);return a.translate((i+n)/2,(e+s)/2,(t+r)/2),Yi(a,o)}var xl=class{constructor(){this.parts=new Map}add(e,t,n=null,{cast:s=!0,receive:r=!0}={}){let o=(e.index,e.clone());n&&o.applyMatrix4(n);for(let l of Object.keys(o.attributes))["position","normal","uv"].includes(l)||o.deleteAttribute(l);if(o.attributes.normal||o.computeVertexNormals(),o.attributes.uv||o.setAttribute("uv",new Bt(new Float32Array(o.attributes.position.count*2),2)),!o.index){let l=o.attributes.position.count,c=new(l>65535?Uint32Array:Uint16Array)(l);for(let h=0;h<l;h++)c[h]=h;o.setIndex(new Bt(c,1))}o.morphAttributes={},o.clearGroups();let a=`${t.uuid}|${s?1:0}${r?1:0}`;this.parts.has(a)||this.parts.set(a,{mat:t,cast:s,receive:r,geos:[]}),this.parts.get(a).geos.push(o)}build(e="batch"){let t=new pn;t.name=e;for(let{mat:n,cast:s,receive:r,geos:o}of this.parts.values())for(let a=0;a<o.length;a+=400){let l=lo(o.slice(a,a+400),!1);if(!l)continue;l.computeBoundingSphere();let c=new Ut(l,n);c.castShadow=s,c.receiveShadow=r,c.matrixAutoUpdate=!1,t.add(c)}return this.parts.clear(),t}};function Wn(i,e,t,{cast:n=!0,receive:s=!0,colors:r=null}={}){let o=new Ar(i,e,t.length);return t.forEach((a,l)=>o.setMatrixAt(l,a)),r&&r.forEach((a,l)=>o.setColorAt(l,a)),o.instanceMatrix.needsUpdate=!0,o.castShadow=n,o.receiveShadow=s,o.computeBoundingSphere(),o.frustumCulled=!0,o}function Zs(i,e=120){let n=new ln(i.map(([s,r])=>new C(s,0,r)),!0,"centripetal").getSpacedPoints(e).map(s=>new re(s.x,-s.z));return new Mi(n)}function Zi(i,e=0,t=1,n=24){let s=new Gr(i,n);s.rotateX(-Math.PI/2),s.translate(0,e,0);let r=s.attributes.position,o=new Float32Array(r.count*2);for(let a=0;a<r.count;a++)o[a*2]=r.getX(a)/t,o[a*2+1]=r.getZ(a)/t;return s.setAttribute("uv",new Bt(o,2)),s}function gt(i,e){if(typeof OffscreenCanvas<"u")try{let n=new OffscreenCanvas(i,e);if(n.getContext("2d"))return n}catch{}let t=document.createElement("canvas");return t.width=i,t.height=e,t}var Sf=8,Et=1;function bf({anisotropy:i=8,scale:e=1}={}){Sf=i,Et=e}var co=new Map;function vt(i,e){return co.has(i)||co.set(i,e()),co.get(i)}function Ef(){for(let i of co.values())i.dispose&&i.dispose();co.clear()}function yt(i,{srgb:e=!0,wrap:t=!0}={}){let n=new Cr(i);return n.colorSpace=e?Qt:Gn,t&&(n.wrapS=n.wrapT=_s),n.anisotropy=Sf,n.generateMipmaps=!0,n.minFilter=zn,n.needsUpdate=!0,n}var wt=i=>Math.max(32,Math.round(i*Et));function Mv(i){let e=parseInt(i.slice(1),16);return[e>>16&255,e>>8&255,e&255]}function Sv(i,e){e=Math.min(1,Math.max(0,e));let t=e*(i.length-1),n=Math.min(i.length-2,Math.floor(t)),s=t-n,r=i[n],o=i[n+1];return[r[0]+(o[0]-r[0])*s,r[1]+(o[1]-r[1])*s,r[2]+(o[2]-r[2])*s]}function yn(i,e,t,{period:n=4,octaves:s=4,seed:r=1,contrast:o=1.25,res:a=128}={}){let l=Math.min(a,e),c=gt(l,l),h=c.getContext("2d"),u=h.createImageData(l,l),d=t.map(Mv);for(let f=0;f<l;f++)for(let p=0;p<l;p++){let _=Ys(p/l*n,f/l*n,{octaves:s,period:n,seed:r});_=(_-.5)*o+.5;let[m,g,y]=Sv(d,_),b=(f*l+p)*4;u.data[b]=m,u.data[b+1]=g,u.data[b+2]=y,u.data[b+3]=255}h.putImageData(u,0,0),i.imageSmoothingEnabled=!0,i.imageSmoothingQuality="high";for(let f=-1;f<=1;f++)for(let p=-1;p<=1;p++)i.drawImage(c,f*e,p*e,e,e)}function xh(i,e){for(let t of[-i,0,i])for(let n of[-i,0,i])e(t,n)}function _l(i,e,t,n,s,r=.5,o=1.5,a=.6){for(let l=0;l<t;l++){i.fillStyle=n[s()*n.length|0],i.globalAlpha=a*(.4+s()*.6);let c=s()*e,h=s()*e,u=r+s()*(o-r);i.beginPath(),i.arc(c,h,u,0,Math.PI*2),i.fill()}i.globalAlpha=1}var _h=()=>vt("grass",()=>{let i=wt(512),e=gt(i,i),t=e.getContext("2d"),n=dt(11);yn(t,i,["#557A2B","#688D35","#7C9C3F","#93AB4D"],{period:5,seed:3});let s=["#5A8030","#6A8F36","#7A9C3F","#8BA84A","#9EB257","#4D7228","#AEB866"];t.lineCap="round";for(let r=0;r<16e3*Et*Et;r++){let o=n()*i,a=n()*i,l=(2+n()*6)*Et+1,c=-Math.PI/2+(n()-.5)*1.3;t.strokeStyle=n()<.06?"#BDB878":s[n()*s.length|0],t.globalAlpha=.45+n()*.5,t.lineWidth=.8+n()*.9,xh(i,(h,u)=>{o+h<-10||o+h>i+10||a+u<-10||a+u>i+10||(t.beginPath(),t.moveTo(o+h,a+u),t.lineTo(o+h+Math.cos(c)*l,a+u+Math.sin(c)*l),t.stroke())})}return t.globalAlpha=1,yt(e)}),ho=()=>vt("soil",()=>{let i=wt(512),e=gt(i,i),t=e.getContext("2d"),n=dt(21);yn(t,i,["#5A4331","#6E523C","#83674C","#937A5E"],{period:4,seed:7}),_l(t,i,2500*Et,["#3E2E22","#4B3828","#A08767"],n,.4,1.4,.7);let s=["#B49563","#C5AC80","#9E8257","#D2BE95","#8A7048"];for(let r=0;r<700*Et;r++){let o=n()*i,a=n()*i,l=(10+n()*16)*Et,c=(1.4+n()*1.6)*Et,h=n()*Math.PI;t.fillStyle=s[n()*s.length|0],t.globalAlpha=.75+n()*.25,xh(i,(u,d)=>{t.save(),t.translate(o+u,a+d),t.rotate(h),t.beginPath(),t.ellipse(0,0,l,c,0,0,Math.PI*2),t.fill(),t.restore()})}return t.globalAlpha=1,yt(e)}),uo=()=>vt("concrete",()=>{let i=wt(512),e=gt(i,i),t=e.getContext("2d"),n=dt(31);yn(t,i,["#8F8B83","#A5A199","#B6B2AA","#C3BFB6"],{period:6,seed:9,contrast:1.1}),_l(t,i,3e3*Et,["#6F6B65","#D2CEC6","#85817A"],n,.3,1.1,.5);for(let s=0;s<14;s++)t.fillStyle="#4F4B45",t.globalAlpha=.05+n()*.05,t.beginPath(),t.ellipse(n()*i,n()*i,20+n()*70,10+n()*40,n()*3,0,Math.PI*2),t.fill();return t.globalAlpha=1,yt(e)}),vh=()=>vt("stone",()=>{let i=wt(256),e=gt(i,i),t=e.getContext("2d"),n=dt(41);return yn(t,i,["#7B7266","#8E8475","#A09684","#B0A693"],{period:3,seed:13}),_l(t,i,1400*Et,["#5E564C","#C2B8A4","#6F675B"],n,.3,1.3,.6),yt(e)}),yh=()=>vt("pavers",()=>{let i=wt(1024),e=gt(i,i),t=e.getContext("2d"),n=dt(51);t.fillStyle="#5A5246",t.fillRect(0,0,i,i);let s=i/2,r=.22*s,o=.11*s,a=.008*s,l=["#9A9083","#A69C8D","#8E8578","#B0A594","#968C7E","#A89E8F"];for(let c=0,h=0;h<i+o;c++,h+=o+a){let u=c%2*(r/2);for(let d=-r+u;d<i+r;d+=r+a){t.fillStyle=l[n()*l.length|0],t.beginPath();let f=o*.22;t.moveTo(d,h),t.lineTo(d+r*.38,h),t.quadraticCurveTo(d+r/2,h+f,d+r*.62,h),t.lineTo(d+r,h),t.lineTo(d+r,h+o),t.lineTo(d+r*.62,h+o),t.quadraticCurveTo(d+r/2,h+o-f,d+r*.38,h+o),t.lineTo(d,h+o),t.closePath(),t.fill()}}t.globalCompositeOperation="multiply",yn(t,i,["#9C9A92","#D8D6CF","#FFFFFF"],{period:4,seed:17,contrast:1.4}),t.globalCompositeOperation="source-over";for(let c=0;c<1600*Et;c++)t.fillStyle=n()<.5?"#5F6E39":"#6E7D44",t.globalAlpha=.55,t.fillRect(n()*i,n()*i,1+n()*3,1+n()*2);return t.globalAlpha=1,yt(e)}),Mh=()=>vt("roof",()=>{let i=wt(512),e=gt(i,i),t=e.getContext("2d"),n=dt(61);t.fillStyle="#3A1F17",t.fillRect(0,0,i,i);let s=7,r=i/s,o=8,a=i/o,l=["#94442B","#87402A","#7B3A27","#A04B2F","#6F3424"];for(let c=0;c<s;c++)for(let h=0;h<o;h++){let u=h*a+c%2*a/2,d=c*r;for(let f of[-i,0]){let p=t.createLinearGradient(0,d,0,d+r),_=l[n()*l.length|0];p.addColorStop(0,_),p.addColorStop(.75,_),p.addColorStop(1,"#4A2219"),t.fillStyle=p,t.fillRect(u+f+1,d+1,a-2,r-2);for(let m of[.3,.7]){let g=t.createLinearGradient(u+f+a*(m-.12),0,u+f+a*(m+.12),0);g.addColorStop(0,"rgba(0,0,0,0.25)"),g.addColorStop(.5,"rgba(255,190,150,0.18)"),g.addColorStop(1,"rgba(0,0,0,0.25)"),t.fillStyle=g,t.fillRect(u+f+a*(m-.12),d+1,a*.24,r-2)}}}return t.globalCompositeOperation="multiply",yn(t,i,["#4C3A33","#9A8578","#E6DDD5","#FFFFFF"],{period:3,seed:19,contrast:1.6}),t.globalCompositeOperation="source-over",yt(e)}),vl=()=>vt("plaster",()=>{let i=wt(256),e=gt(i,i),t=e.getContext("2d"),n=dt(71);return yn(t,i,["#D6D3CC","#E2E0DA","#ECEAE5"],{period:4,seed:23,contrast:1}),_l(t,i,600*Et,["#C9C5BE","#F2F0EC"],n,.3,.9,.5),yt(e)}),Sh=()=>vt("wenge",()=>{let i=wt(512),e=gt(i,i),t=e.getContext("2d"),n=dt(81);t.fillStyle="#3B2B22",t.fillRect(0,0,i,i);for(let s=0;s<260;s++){let r=n()*i,o=1+n()*3,a=.01+n()*.02,l=n()*6;t.strokeStyle=n()<.5?"#2A1E18":"#4A382D",t.globalAlpha=.35+n()*.4,t.lineWidth=.6+n()*1.8,t.beginPath();for(let c=0;c<=i;c+=8){let h=r+Math.sin(c*a+l)*o;c?t.lineTo(c,h):t.moveTo(c,h)}t.stroke()}return t.globalAlpha=1,yt(e)}),bh=()=>vt("rootwood",()=>{let i=wt(256),e=gt(i,i),t=e.getContext("2d"),n=dt(91);yn(t,i,["#4A3123","#674632","#7E5A40","#946B4C"],{period:3,seed:29,contrast:1.5});for(let s=0;s<160;s++){let r=n()*i;t.strokeStyle=n()<.6?"#3A271C":"#A07A58",t.globalAlpha=.4,t.lineWidth=.5+n()*1.5,t.beginPath(),t.moveTo(r,0),t.bezierCurveTo(r+6,i*.3,r-6,i*.6,r+n()*6,i),t.stroke()}return t.globalAlpha=1,yt(e)}),yl=()=>vt("bark",()=>{let i=wt(256),e=gt(i,i),t=e.getContext("2d"),n=dt(101);yn(t,i,["#6C6356","#857B6C","#9C9282","#B0A796"],{period:3,seed:31});for(let s=0;s<200;s++){let r=n()*i;t.strokeStyle=n()<.6?"#544B40":"#BDB4A4",t.globalAlpha=.45,t.lineWidth=.5+n()*2,t.beginPath(),t.moveTo(r,0),t.lineTo(r+(n()-.5)*10,i),t.stroke()}return t.globalAlpha=1,yt(e)}),Eh=()=>vt("culm",()=>{let i=wt(64),e=wt(512),t=gt(i,e),n=t.getContext("2d"),s=dt(111),r=n.createLinearGradient(0,0,i,0);r.addColorStop(0,"#B38F2F"),r.addColorStop(.35,"#E6C150"),r.addColorStop(.55,"#EED062"),r.addColorStop(1,"#AE8A2C"),n.fillStyle=r,n.fillRect(0,0,i,e);for(let o=0;o<3;o++){let a=(.15+s()*.7)*i,l=(1.5+s()*4)*Et;n.fillStyle=s()<.5?"#557F31":"#6A8D3A",n.globalAlpha=.85,n.beginPath(),n.moveTo(a,0);for(let c=0;c<=e;c+=16)n.lineTo(a+Math.sin(c*.02+o)*1.5,c);for(let c=e;c>=0;c-=16)n.lineTo(a+l+Math.sin(c*.02+o)*1.5,c);n.closePath(),n.fill()}return n.globalAlpha=1,n.fillStyle="#5E4C22",n.fillRect(0,0,i,3*Et+1),n.fillStyle="#F2E6B4",n.globalAlpha=.7,n.fillRect(0,3*Et+1,i,5*Et),n.globalAlpha=1,n.fillStyle="#7A6530",n.globalAlpha=.5,n.fillRect(0,e-3*Et,i,3*Et),n.globalAlpha=1,yt(t)});function wh(i,e,t){return vt(i,()=>{let n=wt(512),s=gt(n,n),r=s.getContext("2d"),o=dt(e);r.clearRect(0,0,n,n);for(let l=0;l<4;l++)r.save(),r.translate(l%2*n/2,(l/2|0)*n/2),r.beginPath(),r.rect(1,1,n/2-2,n/2-2),r.clip(),t(r,n/2,o,l),r.restore();let a=yt(s,{wrap:!1});return a.premultiplyAlpha=!1,a})}function bv(i,e,t,n,s){i.fillStyle=n,i.beginPath(),i.moveTo(0,0),i.quadraticCurveTo(t,e*.35,0,e),i.quadraticCurveTo(-t,e*.35,0,0),i.fill(),i.strokeStyle=s,i.lineWidth=Math.max(.6,t*.08),i.globalAlpha=.6,i.beginPath(),i.moveTo(0,2),i.lineTo(0,e*.92),i.stroke(),i.globalAlpha=1}var Th=()=>wh("bambooLeaves",121,(i,e,t)=>{let n=["#3C6A28","#4C7A31","#2E5A21","#5A8A3A","#41702B"];i.strokeStyle="#6E6A33",i.lineWidth=1.2;let s=3+(t()*2|0);for(let r=0;r<s;r++){let o=e*(.25+t()*.5),a=e*.06,l=(t()-.5)*1.2,c=e*(.45+t()*.35),h=o+Math.sin(l)*c,u=a+Math.cos(l)*c;i.beginPath(),i.moveTo(o,a),i.quadraticCurveTo(o+Math.sin(l)*c*.5+6,a+c*.5,h,u),i.stroke();let d=5+(t()*5|0);for(let f=0;f<d;f++){let p=.25+f/d*.75,_=o+(h-o)*p,m=a+(u-a)*p;i.save(),i.translate(_,m),i.rotate(l+(t()<.5?-1:1)*(.35+t()*.6)),bv(i,e*(.18+t()*.16),e*(.025+t()*.02),n[t()*n.length|0],"#8DB062"),i.restore()}}}),Ml=()=>wh("treeLeaves",131,(i,e,t,n)=>{let s=n===3?["#5D7E36","#6E8C3E","#839A45","#4E6E2F"]:["#2F5426","#3B652C","#4B7633","#28491F","#577F3A"];for(let r=0;r<160;r++){let o=t()*Math.PI*2,a=Math.sqrt(t())*e*.44,l=e/2+Math.cos(o)*a,c=e/2+Math.sin(o)*a*.8;i.fillStyle=s[t()*s.length|0],i.save(),i.translate(l,c),i.rotate(t()*Math.PI*2),i.beginPath(),i.ellipse(0,0,e*(.025+t()*.03),e*(.012+t()*.012),0,0,Math.PI*2),i.fill(),i.restore()}}),Ah=()=>wh("broadLeaves",141,(i,e,t)=>{let n=["#3F6E2C","#4F7F35","#5E8E3C","#36602A","#6B9A45"];for(let s=0;s<46;s++){let r=t()*Math.PI*2,o=Math.sqrt(t())*e*.38,a=e/2+Math.cos(r)*o,l=e/2+Math.sin(r)*o*.7;i.save(),i.translate(a,l),i.rotate(r+Math.PI/2+(t()-.5)),i.fillStyle=n[t()*n.length|0],i.beginPath(),i.moveTo(0,0),i.bezierCurveTo(e*.07,e*.05,e*.06,e*.15,0,e*.17),i.bezierCurveTo(-e*.06,e*.15,-e*.07,e*.05,0,0),i.fill(),i.strokeStyle="#9CC06E",i.globalAlpha=.45,i.lineWidth=1,i.beginPath(),i.moveTo(0,2),i.lineTo(0,e*.16),i.stroke(),i.globalAlpha=1,i.restore()}}),Rh=()=>vt("spider",()=>{let i=wt(256),e=gt(i,i),t=e.getContext("2d"),n=dt(151);t.clearRect(0,0,i,i),t.lineCap="round";for(let s=0;s<42;s++){let r=-Math.PI/2+(n()-.5)*2.6,o=i*(.35+n()*.5),a=i/2+Math.cos(r)*o,l=i+Math.sin(r)*o*.9,c=i/2+Math.cos(r)*o*.5,h=i-o*.75;t.strokeStyle=n()<.5?"#5C8E3A":"#4E7D30",t.lineWidth=3.2*Et+1,t.beginPath(),t.moveTo(i/2,i),t.quadraticCurveTo(c,h,a,l),t.stroke(),t.strokeStyle="#E7E5C6",t.lineWidth=1.1*Et+.4,t.beginPath(),t.moveTo(i/2,i),t.quadraticCurveTo(c,h,a,l),t.stroke()}return yt(e,{wrap:!1})}),Ch=()=>vt("fabric",()=>{let i=wt(256),e=gt(i,i),t=e.getContext("2d"),n=dt(161);yn(t,i,["#D6D0C1","#E3DED1","#EEEAE0"],{period:4,seed:37,contrast:.9});for(let s=0;s<i;s+=2)t.fillStyle="rgba(0,0,0,0.035)",t.fillRect(0,s,i,1),t.fillRect(s,0,1,i);return yt(e)}),Ih=()=>vt("net",()=>{let i=wt(256),e=gt(i,i),t=e.getContext("2d");t.clearRect(0,0,i,i),t.strokeStyle="#F4F4F2",t.lineWidth=Math.max(1.5,3*Et);let n=i/8;for(let s=0;s<=i;s+=n)t.beginPath(),t.moveTo(s,0),t.lineTo(s,i),t.stroke(),t.beginPath(),t.moveTo(0,s),t.lineTo(i,s),t.stroke();return yt(e)}),Ph=()=>vt("curtainBrown",()=>{let i=wt(256),e=gt(i,i),t=e.getContext("2d"),n=dt(171);for(let s=0;s<i;s++){let o=.75+.35*(.5+.5*Math.sin(s/i*Math.PI*2*6));t.fillStyle=`rgb(${92*o|0},${72*o|0},${54*o|0})`,t.fillRect(s,0,1,i)}for(let s=0;s<2600*Et;s++)t.fillStyle=n()<.5?"rgba(40,28,18,0.25)":"rgba(160,130,100,0.18)",t.fillRect(n()*i,n()*i,1,2+n()*4);return yt(e)}),Lh=()=>vt("curtainPolka",()=>{let i=wt(256),e=gt(i,i),t=e.getContext("2d"),n=dt(181);t.fillStyle="#6A2332",t.fillRect(0,0,i,i);for(let s=0;s<10;s++)for(let r=0;r<10;r++)t.fillStyle=n()<.3?"#E9C9CF":"#F3EDE6",t.beginPath(),t.arc((r+s%2*.5)*i/10,(s+.5)*i/10,i/34,0,Math.PI*2),t.fill();for(let s=0;s<i;s++){let r=.5+.5*Math.sin(s/i*Math.PI*2*5);t.fillStyle=`rgba(0,0,0,${.18*r})`,t.fillRect(s,0,1,i)}return yt(e)}),Dh=()=>vt("floorTile",()=>{let i=wt(512),e=gt(i,i),t=e.getContext("2d");return yn(t,i,["#E1E1DD","#EAEAE7","#F2F2EF"],{period:3,seed:41,contrast:.9}),t.fillStyle="#CFCFC9",t.fillRect(0,0,i,2),t.fillRect(0,i/2-1,i,2),t.fillRect(0,0,2,i),t.fillRect(i/2-1,0,2,i),yt(e)}),Nh=()=>vt("bathWall",()=>{let i=wt(512),e=gt(i,i),t=e.getContext("2d"),n=dt(191),s=i/8,r=["#6D8A8D","#7A9696","#678284","#83A09F"];for(let o=0;o<8;o++)for(let a=-1;a<3;a++){let l=a*i/2+o%2*i/4;t.fillStyle=r[n()*r.length|0],t.fillRect(l+1,o*s+1,i/2-2,s-2)}for(let o=0;o<900*Et;o++){t.strokeStyle=n()<.7?"rgba(60,80,82,0.35)":"rgba(150,104,72,0.55)",t.lineWidth=.7;let a=n()*i,l=n()*i;t.beginPath(),t.moveTo(l,a),t.lineTo(l+8+n()*30,a+(n()-.5)*2),t.stroke()}return yt(e)}),Uh=()=>vt("bathFloor",()=>{let i=wt(256),e=gt(i,i),t=e.getContext("2d");return yn(t,i,["#4C3A2D","#5C4637","#6C5442"],{period:3,seed:43}),t.fillStyle="#3A2C22",t.fillRect(0,0,i,2),t.fillRect(0,0,2,i),yt(e)}),Fh=()=>vt("blanket",()=>{let i=wt(256),e=gt(i,i),t=e.getContext("2d");t.fillStyle="#2B3343",t.fillRect(0,0,i,i),t.strokeStyle="#3E4A5E",t.lineWidth=2;let n=i/10;for(let s=-1;s<12;s++)for(let r=-1;r<8;r++){let o=r*n*1.75+s%2*n*.87,a=s*n*1.5;t.beginPath();for(let l=0;l<7;l++){let c=Math.PI/6+l*Math.PI/3,h=o+Math.cos(c)*n*.9,u=a+Math.sin(c)*n*.9;l?t.lineTo(h,u):t.moveTo(h,u)}t.stroke()}return yt(e)}),Oh=()=>vt("mirrorFrame",()=>{let i=wt(256),e=wt(32),t=gt(i,e),n=t.getContext("2d");n.fillStyle="#B3202A",n.fillRect(0,0,i,e),n.fillStyle="#121212";for(let s=0;s<i;s+=i/6)n.fillRect(s+i/24,e*.22,i/12,e*.56);return yt(t)}),Bh=(i="NO SMOKING")=>vt("sign:"+i,()=>{let n=gt(256,64),s=n.getContext("2d");return s.fillStyle="#F7F7F5",s.fillRect(0,0,256,64),s.fillStyle="#C8102E",s.font="bold 30px Arial, Helvetica, sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText(i,256/2,64/2+2),yt(n,{wrap:!1})}),zh=()=>vt("doormat",()=>{let i=wt(512),e=Math.round(i*.6),t=gt(i,e),n=t.getContext("2d"),s=dt(77);n.fillStyle="#9b1f24",n.fillRect(0,0,i,e);for(let r=0;r<9e3*Et;r++)n.fillStyle=s()<.5?"#7d171c":"#b4343a",n.globalAlpha=.5,n.fillRect(s()*i,s()*e,1.5,1.5);return n.globalAlpha=1,n.strokeStyle="#2a1414",n.lineWidth=i*.03,n.strokeRect(i*.04,e*.07,i*.92,e*.86),n.fillStyle="#211010",n.font=`bold ${Math.round(e*.26)}px Georgia, serif`,n.textAlign="center",n.textBaseline="middle",n.fillText("WELCOME",i/2,e/2+2),yt(t,{wrap:!1})}),kh=()=>vt("forest",()=>{let i=wt(512),e=gt(i,i),t=e.getContext("2d"),n=dt(201);yn(t,i,["#1C3519","#26431F","#335427","#41652F"],{period:6,seed:47,contrast:1.3});for(let s=0;s<2200*Et;s++){t.fillStyle=["#2B4A22","#3A5E2B","#4D7234","#1E3819","#5B7E3B"][n()*5|0],t.globalAlpha=.6;let r=n()*i,o=n()*i,a=2+n()*7;xh(i,(l,c)=>{t.beginPath(),t.arc(r+l,o+c,a,0,Math.PI*2),t.fill()})}return t.globalAlpha=1,yt(e)}),Hh=()=>vt("glow",()=>{let e=gt(128,128),t=e.getContext("2d"),n=t.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.15,"rgba(255,255,255,0.75)"),n.addColorStop(.45,"rgba(255,255,255,0.16)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,128,128),yt(e,{wrap:!1})}),Sl=()=>vt("macro",()=>{let e=gt(256,256),t=e.getContext("2d");return yn(t,256,["#7A7A7A","#B5B5B5","#FFFFFF"],{period:4,seed:53,octaves:5,contrast:1.3,res:256}),yt(e,{srgb:!1})}),bl=[_h,ho,uo,vh,yh,Mh,vl,Sh,bh,yl,Eh,Th,Ml,Ah,Rh,Ch,Ih,Ph,Lh,Dh,Nh,Uh,Fh,Oh,zh,kh,Hh,Sl,()=>Bh()];var Gh={value:0},Vh={value:0};function Ce(i){return new Ps(i)}function It(i,e=[1,1]){let t=i.clone();return t.needsUpdate=!0,t.repeat.set(e[0],e[1]),t}function El(i,e=.02,t=.4){let n=Sl();return i.onBeforeCompile=s=>{s.uniforms.macroMap={value:n},s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
varying vec2 vMacroPos;`).replace("#include <project_vertex>",`#include <project_vertex>
vMacroPos = (modelMatrix * vec4(transformed, 1.0)).xz;`),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
uniform sampler2D macroMap;
varying vec2 vMacroPos;`).replace("#include <map_fragment>",`#include <map_fragment>
        float mA = texture2D(macroMap, vMacroPos * ${e.toFixed(4)}).r;
        float mB = texture2D(macroMap, vMacroPos * ${(e*.31).toFixed(4)} + vec2(0.37, 0.71)).r;
        diffuseColor.rgb *= mix(1.0, 0.55 + 0.5 * (mA * 0.6 + mB * 0.6), ${t.toFixed(3)});`)},i.customProgramCacheKey=()=>`macro${e}|${t}`,i}var Js=40,Wh={value:Array.from({length:Js},()=>new mt(0,0,1,0))};function Ev(i,e){let t=Sl();return i.onBeforeCompile=n=>{n.uniforms.macroMap={value:t},n.uniforms.soilMap={value:e},n.uniforms.uWear=Wh,n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
varying vec2 vMacroPos;`).replace("#include <project_vertex>",`#include <project_vertex>
vMacroPos = (modelMatrix * vec4(transformed, 1.0)).xz;`),n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
        uniform sampler2D macroMap; uniform sampler2D soilMap; uniform vec4 uWear[${Js}];
        varying vec2 vMacroPos;`).replace("#include <map_fragment>",`#include <map_fragment>
        float mA = texture2D(macroMap, vMacroPos * 0.018).r;
        float mB = texture2D(macroMap, vMacroPos * 0.0056 + vec2(0.37, 0.71)).r;
        diffuseColor.rgb *= mix(1.0, 0.6 + 0.45 * (mA * 0.6 + mB * 0.6), 0.5);
        float dryN = texture2D(macroMap, vMacroPos * 0.031 + vec2(0.13, 0.52)).r;
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(1.25, 1.1, 0.62), smoothstep(0.42, 0.8, dryN) * 0.7);
        float wearF = 0.0;
        for (int i = 0; i < ${Js}; i++) {
          vec4 w = uWear[i];
          float d = length(vMacroPos - w.xy) / w.z;
          wearF = max(wearF, w.w * (1.0 - smoothstep(0.25, 1.0, d)));
        }
        float bn = texture2D(macroMap, vMacroPos * 0.21).r * 0.55 + texture2D(macroMap, vMacroPos * 0.67 + 0.2).r * 0.45;
        wearF = smoothstep(0.38, 0.7, wearF * (0.25 + 1.35 * bn));
        vec3 soilC = texture2D(soilMap, vMacroPos / 1.3).rgb * vec3(0.92, 0.88, 0.84);
        diffuseColor.rgb = mix(diffuseColor.rgb, mix(soilC, diffuseColor.rgb * vec3(1.15, 1.0, 0.7), 0.25), wearF);`)},i.customProgramCacheKey=()=>"lawn"+Js,i}function Tf(i,e=.05,t="w"){let n=i.onBeforeCompile;return i.onBeforeCompile=(s,r)=>{n&&n(s,r),s.uniforms.uWind=Gh,s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
uniform float uWind;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        #ifdef USE_INSTANCING
          vec3 wIp = vec3(instanceMatrix[3]);
        #else
          vec3 wIp = vec3(0.0);
        #endif
        float wK = clamp(length(position.xy), 0.0, 2.0);
        transformed.x += sin(uWind * 1.4 + wIp.x * 0.6 + wIp.z * 0.3) * ${e.toFixed(3)} * wK;
        transformed.z += cos(uWind * 1.1 + wIp.z * 0.5 + wIp.x * 0.2) * ${(e*.8).toFixed(3)} * wK;`)},i.customProgramCacheKey=()=>`wind${e}${t}`,i}function Af(i,e){let t=Ce({color:"#2a2a2a",emissive:new Te(i),emissiveIntensity:0,roughness:.4});return t.onBeforeCompile=n=>{n.uniforms.uNight=Vh,n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
uniform float uNight;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
 totalEmissiveRadiance = emissive * ${e.toFixed(2)} * uNight;`)},t.customProgramCacheKey=()=>"lamp"+i+e,t}function Rf({quality:i="high"}={}){let e=i!=="low",t=(r,o="#ffffff",a="#1d2a12")=>Tf(Ce({map:r,color:o,alphaTest:.45,side:Pt,roughness:.8,metalness:0,emissive:new Te(a),emissiveMap:r}),.04,r.uuid),n={grass:Ev(Ce({map:It(_h()),color:"#f6f2df",roughness:.96}),ho()),soil:El(Ce({map:It(ho()),roughness:1}),.03,.35),concrete:Ce({map:It(uo()),roughness:.92}),padConcrete:El(Ce({map:It(uo()),color:"#ddd6ca",roughness:.95}),.6,.32),stone:Ce({map:It(vh()),roughness:.85}),pavers:El(Ce({map:It(yh()),roughness:.9}),.04,.3),forest:Ce({map:It(kh()),roughness:1}),plaster:Ce({map:It(vl()),color:"#ffffff",roughness:.92}),plasterTaupe:Ce({map:It(vl()),color:"#9b9186",roughness:.95}),plinth:Ce({map:It(uo()),color:"#d2cec6",roughness:.95}),roof:Ce({map:It(Mh()),roughness:.85}),fascia:Ce({color:"#4a3024",roughness:.8}),ceiling:Ce({color:"#efeee9",roughness:.95,emissive:new Te("#ddd6ca"),emissiveIntensity:.4}),frame:Ce({color:"#f1f1ec",roughness:.42,metalness:.1}),steel:Ce({color:"#c3c5c6",roughness:.5,metalness:.45}),pergolaRoof:Ce({color:"#f6f6f2",emissive:new Te("#d9dcd8"),emissiveIntensity:.75,transparent:!0,opacity:.5,roughness:.3,side:Pt,depthWrite:!1}),glass:new zi({color:"#b9cfd2",transparent:!0,opacity:.16,roughness:.03,metalness:0,reflectivity:.6,depthWrite:!1,side:Pt}),poolBlue:Ce({color:"#2a63ad",roughness:.55}),water:new zi({color:"#2a5559",transparent:!0,opacity:.78,roughness:.04,metalness:.05,depthWrite:!1}),pond:new zi({color:"#1f2c22",roughness:.07,metalness:0,clearcoat:.6,clearcoatRoughness:.05}),mud:El(Ce({map:It(ho()),color:"#9c8f80",roughness:.92}),.05,.35),doorWhite:Ce({color:"#eeeeea",roughness:.55}),pipe:Ce({color:"#e3e3de",roughness:.5}),dish:Ce({color:"#d8d8d4",roughness:.45,metalness:.3}),floorTile:Ce({map:It(Dh()),roughness:.18,metalness:0,envMapIntensity:.6}),wallInner:Ce({color:"#ebe6dd",roughness:.9}),wenge:Ce({map:It(Sh()),roughness:.55}),linen:Ce({color:"#f2f2ee",roughness:.92}),throwRed:Ce({color:"#8a1f27",roughness:.96}),blanket:Ce({map:It(Fh()),roughness:.95}),curtain:Ce({map:It(Ph()),roughness:.95,side:Pt}),curtainPolka:Ce({map:It(Lh()),roughness:.95,side:Pt}),mirror:Ce({color:"#dfe6ea",metalness:1,roughness:.03}),mirrorFrame:Ce({map:It(Oh()),roughness:.5}),tv:Ce({color:"#0c0d0e",roughness:.18,metalness:.2}),sign:Ce({map:Bh(),roughness:.6}),doormat:Ce({map:zh(),roughness:1}),bathWall:Ce({map:It(Nh()),roughness:.45}),bathFloor:Ce({map:It(Uh()),roughness:.35}),porcelain:Ce({color:"#f5f5f3",roughness:.12}),granite:Ce({color:"#1d1f20",roughness:.22}),rod:Ce({color:"#6c5c4b",roughness:.5,metalness:.3}),rootWood:Ce({map:It(bh()),roughness:.8}),chairBlue:Ce({color:"#1f98d0",roughness:.42,side:Pt}),chairYellow:Ce({color:"#efbd18",roughness:.45,side:Pt}),chairWhite:Ce({color:"#e8e8e4",roughness:.45,side:Pt}),alu:Ce({color:"#b8bcc0",roughness:.35,metalness:.7}),tableTop:Ce({color:"#232826",roughness:.2,metalness:.05}),black:Ce({color:"#1b1b1b",roughness:.7}),umbrella:Ce({map:It(Ch()),color:"#f3efe4",roughness:.9,side:Pt,emissive:new Te("#cbc5b4"),emissiveMap:null,emissiveIntensity:.5}),pole:Ce({color:"#e6e8e9",roughness:.4,metalness:.3}),net:Ce({map:Ih(),alphaTest:.4,side:Pt,roughness:.8,transparent:!1}),netBand:Ce({color:"#f4f4f1",roughness:.7}),log:Ce({map:It(yl()),color:"#a58a6a",roughness:.95}),branch:Ce({color:"#5f4c3a",roughness:1}),ash:Ce({color:"#6a6560",roughness:1}),rim:Ce({color:"#4d3a2f",roughness:.6,metalness:.4}),pot:Ce({color:"#1d1e1d",roughness:.55}),lampBody:Ce({color:"#3a3d40",roughness:.5,metalness:.4}),floodLens:Af("#f4f8ff",6),warmLens:Af("#ffb95c",5),tubeLight:Ce({color:"#ffffff",emissive:new Te("#ffffff"),emissiveIntensity:1.6}),culm:Ce({map:It(Eh()),roughness:.55}),bark:Ce({map:It(yl()),roughness:.95}),bambooLeaf:t(Th(),"#f2f6e4","#2a3d18"),treeLeaf:t(Ml(),"#ffffff","#1a2711"),broadLeaf:t(Ah(),"#eef4e2","#22331a"),spider:Tf(Ce({map:Rh(),alphaTest:.4,side:Pt,roughness:.8}),.02,"spider"),reed:Ce({color:"#6c7f3c",roughness:.9,side:Pt}),shrub:t(Ml(),"#e2ecd0","#1c2a12"),blade:Ce({color:"#ffffff",roughness:.9,side:Pt,emissive:new Te("#1c2410")})},s=(r,o,a=!0)=>{r.userData.layer=o,a&&(r.depthFunc=gs)};s(n.soil,-6,!1),s(n.grass,-5),s(n.pavers,-4),s(n.mud,-4),s(n.pond,-3),e||(n.glass.opacity=.2);for(let[r,o]of[["ceiling",.12],["wallInner",.3],["linen",.55],["bathWall",.45],["wenge",.6],["doorWhite",.6],["throwRed",.5],["curtain",.5]])n[r].envMapIntensity=o;for(let r of["bambooLeaf","treeLeaf","broadLeaf","shrub","spider","net"])n[r+"Depth"]=new Ls({depthPacking:kc,map:n[r].map,alphaTest:n[r].alphaTest});return n}var $t={garden:[{id:"V1",x:-34,z:-13,rot:Math.PI/2,interior:!1},{id:"V2",x:-34,z:4,rot:Math.PI/2,interior:!0},{id:"V3",x:-33,z:21,rot:Math.PI/2+.06,interior:!1}],cottage:[{id:"V4",x:21,z:-30,rot:0},{id:"V5",x:46,z:-21,rot:-Math.PI/2}]},ze={lawn:[[-29,-19],[-12,-22],[6,-21],[16,-18],[24,-10],[27,2],[25,15],[14,23],[-4,25],[-20,26],[-28.5,20],[-29,6],[-29.5,-8]],courtyard:[[12,-22],[14,-30.3],[29,-30.5],[32.4,-28],[32.4,-12],[27,-8],[20,-9],[14,-14]],eastLawn:[[32.6,-30],[45.5,-29.5],[45.7,-12],[44,2],[33,4],[32.6,-8]],diningHall:{x:-8,z:-30,rot:0},kitchen:{x:5,z:-30,rot:0},staff:{x:-25,z:-37,rot:.1},pond:{x:22,z:50,r:21},pads:[{id:"P1",x:-20,z:-9,seed:3},{id:"P2",x:2,z:-15,seed:5},{id:"P3",x:-22,z:15.5,seed:7},{id:"P4",x:18,z:11,seed:9},{id:"P5",x:-13,z:11.5,seed:4}],treeTable:{x:35,z:-12.5},crossTable:{x:37.6,z:-16.2},manhole:{x:39.2,z:-7.4},firewood:[{x:-24.5,z:-5.5,rot:.6,ring:[-25.6,-8.4]},{x:6.2,z:-17.6,rot:2.4,ring:[4.4,-12.4]},{x:-27.4,z:18.6,rot:1.2,ring:[-25.6,17.6]}],net:{x:9,z:-7,rot:Math.PI/2},stones:[[-30.2,2.1],[-26.2,3.4],[-21,5.6],[-16.5,8.4],[-11,8],[-5,4],[1,.5],[5.5,-1.5]],floodlights:[{x:-26,z:17,ry:2.5},{x:24,z:18,ry:-2.4},{x:-2,z:-23,ry:.1},{x:26,z:-12,ry:-1.2}],gardenLamps:[[-17,15.5],[-11,15.8],[-22,14],[15,14],[21,14.5],[-23,-12],[-17,-12.5],[-1,-19],[5,-19],[-29,9.5],[-29,-1]],bamboo:[[-29.6,.8,1.1,18,8],[-29.2,7.6,1,16,7.5],[-30.1,4.6,.6,9,7.5],[-29.8,-10,1,16,8],[-29.5,-16.5,1.1,18,7.5],[-29.4,17.6,1,16,7],[-29.1,24.2,1,14,7.5],[-33.6,10.8,.9,12,7],[-34.5,-4.3,.8,10,6.5],[12.5,21.8,1.2,18,8],[21.5,18.8,1,14,7.5],[-14,-23.5,1.2,16,8],[6.5,-24.5,1,14,7],[27.5,7.5,.9,12,7],[-40.5,-22,1.1,16,8.5],[-41,28,1.2,18,8],[34.5,16,1,14,8]],bigTree:{x:37,z:-19},potRows:[{from:[32.8,-29.4],to:[32.8,-12.4],step:.62},{from:[32.3,-11.5],to:[26.8,-7.7],step:.62}],thickets:[[30.5,-4,31.5,21],[27,20,14,28.5],[-34,30,-18,31.5],[-2,-25.5,12,-26.5]],shrubs:[[-3,-24.5,2.2],[7,-36,1.8],[-31,-27,2.5],[33,14,2],[-22,-27,2],[9,27,2.5],[-15,28.5,2.2],[9,-40,1.6]]};function hn(i,e,t,n){let s=Math.cos(i.rot),r=Math.sin(i.rot);return new C(i.x+e*s+n*r,t,i.z-e*r+n*s)}var Cf=()=>$t.garden.find(i=>i.interior),Ht={x0:-5,x1:4.97,z0:-5.77,z1:-.23,y1:3.25};var If=[{x:300,z:-190,r:210,h:48,seed:6},{x:-340,z:-220,r:240,h:58,seed:7},{x:-60,z:-400,r:250,h:70,seed:8},{x:370,z:170,r:230,h:42,seed:9},{x:-260,z:320,r:250,h:52,seed:10}];function qh(i,e){let t=0;for(let n of If){let s=Math.hypot(i-n.x,e-n.z)/n.r;if(s<1){let r=1-s*s;t=Math.max(t,n.h*r*r*(.8+.4*Ys(i*.012+n.seed,e*.012,{octaves:3})))}}return t}function wv(i,e){let n=new bt(i.r*2,i.r*2,48,48);n.rotateX(-Math.PI/2);let s=n.attributes.position;for(let o=0;o<s.count;o++){let a=s.getX(o)+i.x,l=s.getZ(o)+i.z,c=Math.hypot(a-i.x,l-i.z)/i.r,h=-2;if(c<1){let u=1-c*c;h=i.h*u*u*(.8+.4*Ys(a*.012+i.seed,l*.012,{octaves:3}))-.5}s.setY(o,h)}n.translate(i.x,0,i.z),n.computeVertexNormals(),Yi(n,30);let r=new Ut(n,e);return r.receiveShadow=!1,r.matrixAutoUpdate=!1,r.name="hills",r}var Xh=(i,e,t)=>{let n=!1;for(let s=0,r=t.length-1;s<t.length;r=s++){let[o,a]=t[s],[l,c]=t[r];a>e!=c>e&&i<(l-o)*(e-a)/(c-a)+o&&(n=!n)}return n},fo=(i,e)=>Xh(i,e,ze.lawn)||Xh(i,e,ze.eastLawn),Pf=(i,e)=>Xh(i,e,ze.courtyard);function wl(i=0,e=16){let t=ze.pond;return Array.from({length:e},(n,s)=>{let r=s/e*Math.PI*2,o=1+(Ys(Math.cos(r)*2+3,Math.sin(r)*2,{octaves:2})-.5)*.36;return[t.x+Math.cos(r)*(t.r+i)*o,t.z+Math.sin(r)*(t.r+i)*o*.85]})}function Tv(){let i=ze,e=[];for(let t of i.pads)e.push([t.x,t.z,3.6,.85]);for(let t of i.firewood)e.push([t.x+.8,t.z,3.2,1]),e.push([t.ring[0],t.ring[1],1.8,1]);e.push([i.net.x,i.net.z-2.5,3.6,.5],[i.net.x,i.net.z+2.5,3.6,.5]);for(let t of i.stones)e.push([t[0],t[1],2,.55]);for(let t=-18;t<=24;t+=4.2)e.push([-29.5,t,3.4,.95]);return e.push([-24,9.5,3.5,.75],[-22,3,2.6,.6],[-25.5,12.5,3,.7]),e.push([i.treeTable.x,i.treeTable.z,1.5,.6],[i.crossTable.x,i.crossTable.z,2.2,.7]),e.slice(0,Js)}function Lf(i,e,t){let n=Yi(new bt(900,900,1,1).rotateX(-Math.PI/2),2.5);e.add(n,t.soil,null,{cast:!1}),e.add(Zi(Zs(ze.lawn,160),0,2.5),t.grass,null,{cast:!1}),e.add(Zi(Zs(ze.eastLawn,90),0,2.5),t.grass,null,{cast:!1});let s=ze.pond,r=[[s.x-34,s.z-30],[s.x+8,s.z-32],[s.x+36,s.z-18],[s.x+34,s.z+22],[s.x-4,s.z+32],[s.x-38,s.z+16]];e.add(Zi(Zs(r,120),0,2.5),t.grass,null,{cast:!1}),e.add(Zi(Zs(wl(1.8),140),0,2.5),t.mud,null,{cast:!1}),e.add(Zi(Zs(wl(0),140),0,4),t.pond,null,{cast:!1});let o=new Mi(ze.courtyard.map(([l,c])=>new re(l,-c)));e.add(Zi(o,0,2),t.pavers,null,{cast:!1});let a=ze.courtyard;for(let l=0;l<a.length;l++){let[c,h]=a[l],[u,d]=a[(l+1)%a.length],f=Math.hypot(u-c,d-h),p=Math.atan2(u-c,d-h);e.add(Yi(new en(.16,.08,f),2),t.concrete,Z((c+u)/2,.04,(h+d)/2,p),{cast:!1})}Tv().forEach((l,c)=>Wh.value[c].set(...l));for(let l of If)i.add(wv(l,t.forest))}var nt=(i,e,t)=>hn(Cf(),i,e,t).toArray(),$s={"lawn-stepping-stones":{pos:[-28.2,1.55,6.4],target:[0,.6,.5],fov:55,preset:"day",focus:30},"estate-lawn-dining":{pos:[-27.8,1.5,-1.2],target:[-5,1.3,-16],fov:55,preset:"day",focus:32},"lawn-umbrellas":{pos:[-.4,1.45,-10.9],target:[3.7,.65,-16.1],fov:60,preset:"day",focus:28},"lawn-table-villa":{pos:[-16.2,1.6,13.4],target:[-27,1.4,17.8],fov:55,preset:"day",focus:22},"lawn-table-closeup":{pos:[-18.7,1.3,14],target:[-23.5,.5,16.1],fov:62,preset:"day",focus:18},"bamboo-view-lawn":{pos:[-31.4,1.45,5.9],target:[-21,1,13.5],fov:69,aspect:.75,preset:"day",focus:24},"villa-patio":{pos:nt(-.2,1.4,7.6),target:nt(1.4,1.65,0),fov:58,preset:"day",focus:14},"patio-chairs":{pos:nt(1.75,1.6,-.3),target:nt(.5,.25,1.7),fov:69,aspect:.75,preset:"day",focus:10,door:1},"doorway-bedroom":{pos:nt(1.9,1.55,1.1),target:nt(3.6,.85,-3.2),fov:69,aspect:.75,preset:"day",focus:10,door:1},"villa-bedroom":{pos:nt(2,1.45,-5.45),target:nt(2.6,.85,-.3),fov:66,preset:"day",focus:12,door:0},"villa-window-pool":{pos:nt(-2.55,1.5,-2.65),target:nt(-2,.4,1.2),fov:62,preset:"day",focus:10},"villa-pool":{pos:nt(-1,1.55,5.2),target:nt(-1.9,1.05,-.2),fov:58,preset:"day",focus:12},"room-beds":{pos:nt(2.15,1.55,-1),target:nt(4.5,.7,-2.15),fov:69,aspect:.75,preset:"day",focus:10,door:0},"room-pool-view":{pos:nt(-.6,1.5,-2.6),target:nt(-1.8,.75,1.2),fov:69,aspect:.75,preset:"day",focus:10,door:0},"bath-basin":{pos:nt(-3.45,1.5,-3.75),target:nt(-4.9,1.05,-1.55),fov:69,aspect:.75,preset:"day",focus:8},"bath-wc":{pos:nt(-3.4,1.45,-.75),target:nt(-4.8,.65,-2.9),fov:69,aspect:.75,preset:"day",focus:8},"walk-door":{pos:nt(1.4,1.5,3.4),target:nt(2,.7,0),fov:69,aspect:.75,preset:"day",focus:10,door:1},"walk-bed":{pos:nt(2,1.55,-.45),target:nt(3.9,.65,-2.1),fov:69,aspect:.75,preset:"day",focus:10,door:1},"courtyard-villas":{pos:[16,1.6,-12.5],target:[27,1.6,-28],fov:55,preset:"overcast",focus:30},"courtyard-villa":{pos:[14.5,1.6,-15.5],target:[22,1.6,-31],fov:55,preset:"overcast",focus:24},"courtyard-garden":{pos:[41,1.6,-4.5],target:[33,1.6,-22],fov:55,preset:"overcast",focus:24},"night-garden":{pos:[-20,1.5,21],target:[-6,1.6,6],fov:55,preset:"night",focus:34},"night-lawn":{pos:[-9,1.5,16],target:[14,1.2,3],fov:55,preset:"night",focus:34},"night-path":{pos:[13,1.5,25],target:[24,3.6,17],fov:55,preset:"night",focus:24},aerial:{pos:[-62,46,58],target:[2,0,-2],fov:40,preset:"golden",focus:60},"arrival-start":{pos:[24,7,46],target:[-10,2,4],fov:50,preset:"golden",focus:50},pond:{pos:[-2,2.2,31],target:[26,.6,52],fov:55,preset:"golden",focus:40},bed:{pos:nt(1.6,1.45,-.95),target:nt(3.95,.72,-2),fov:55,preset:"day",focus:10,door:1}},Ks={arrival:[[[24,9,46],[-10,2,4]],[[8,5,26],[-18,1.6,6]],[[-8,2.6,12],[-26,1.5,4.5]],[[-21,1.65,6.2],nt(1.6,1.6,0)],[nt(1.95,1.62,4.2),nt(1.95,1.5,0)],[nt(2,1.6,2.4),nt(2,1.5,-1)]],enter:[[nt(2,1.6,2.4),nt(2,1.5,-1)],[nt(2,1.58,.6),nt(2.3,1.3,-3)],[nt(1.6,1.45,-.95),nt(3.95,.72,-2)]],drift:[[[-28.2,1.55,6.4],[0,.6,.5]],[[-27.4,1.65,7.6],[0,.6,2.5]]]};function Yh(i){let e=$s[i];if(!e)throw new Error("Unknown view "+i);return{pos:new C(...e.pos),target:new C(...e.target),fov:e.fov||55,preset:e.preset||"day",focus:e.focus||30,door:e.door,aspect:e.aspect||4/3}}var po=class{constructor(e){this.pos=new ln(e.map(t=>new C(...t[0])),!1,"centripetal"),this.tgt=new ln(e.map(t=>new C(...t[1])),!1,"centripetal")}at(e,t=new C,n=new C){let s=Math.min(1,Math.max(0,e));return this.pos.getPointAt(s,t),this.tgt.getPoint(s,n),{pos:t,tgt:n}}};function Tl(i,{w:e=1,h:t=1,hang:n=!1,planes:s=2}={}){let r=i%2*.5,o=i<2?.5:0,a=[];for(let u=0;u<s;u++){let d=new bt(e,t);d.translate(0,n?-t/2:0,0),u===2?d.rotateX(-Math.PI/2):d.rotateY(u*Math.PI/2);let f=d.attributes.uv;for(let p=0;p<f.count;p++)f.setXY(p,r+f.getX(p)*.5,o+f.getY(p)*.5);a.push(d)}let l=lo(a),c=l.attributes.position,h=l.attributes.normal;for(let u=0;u<c.count;u++){let d=new C(c.getX(u)*.6,1+c.getY(u)*.15,c.getZ(u)*.6).normalize();h.setXYZ(u,d.x,d.y,d.z)}return l}function Av(){let i=[];for(let e of Object.values($s))i.push(new C(...e.pos));for(let e of Object.values(Ks)){let t=new ln(e.map(s=>new C(...s[0])),!1,"centripetal"),n=Math.ceil(t.getLength()/.6);for(let s=0;s<=n;s++)i.push(t.getPointAt(s/n))}return i}var Rv=[...$t.garden,...$t.cottage].map(i=>({v:i,cottage:!!$t.cottage.includes(i)}));function Zh(i){for(let{v:e,cottage:t}of Rv){let n=i.x-e.x,s=i.z-e.z,r=Math.cos(e.rot),o=Math.sin(e.rot),a=n*r-s*o,l=n*o+s*r;if(t?Math.abs(a)<6&&l>-8.2&&l<1.2&&i.y<6.2:Math.abs(a)<6.1&&l>-6.9&&l<3.6&&i.y<5.6)return!0}return!1}function Jh(i,e,t=0){if(fo(i,e)||Pf(i,e))return!0;for(let s of $t.garden)if(Math.abs(i-(s.x-3))<7.5+t&&Math.abs(e-s.z)<7+t)return!0;for(let s of $t.cottage){let r=hn(s,0,0,-3.6);if(Math.abs(i-r.x)<7+t&&Math.abs(e-r.z)<7+t)return!0}let n=ze;if(Math.hypot(i-n.diningHall.x,e-n.diningHall.z)<9+t)return!0;for(let s of[n.kitchen,n.staff])if(Math.hypot(i-s.x,e-(s.z-2.5))<7+t)return!0;return Math.hypot(i-n.pond.x,(e-n.pond.z)/.85)<n.pond.r+6}function Df(i,e,t){let n=dt(2026),s=t.density,r=new pn;r.name="vegetation";let o=Av(),a=(L,w)=>{for(let D of o)if(D.distanceToSquared(L)<w*w)return!0;return!1},l=new C,c=new yi(.72,1,1,7,1,!0).translate(0,.5,0),h=[],u=[[],[],[],[]],d=new C(0,1,0);for(let[L,w,D,U,P]of ze.bamboo){let T=Math.max(5,Math.round(U*Math.min(1,s+.25)));for(let O=0;O<T;O++){let z=n()*Math.PI*2,k=Math.sqrt(n())*D,q=L+Math.cos(z)*k,G=w+Math.sin(z)*k,X=P*(.7+n()*.45),Q=.03+n()*.022,_e=.03+k/D*.13+n()*.05,Se=new C(Math.cos(z)*Math.sin(_e),Math.cos(_e),Math.sin(z)*Math.sin(_e)).normalize(),J=!1;for(let Ee=.05;Ee<1;Ee+=.1)if(a(l.set(q,0,G).addScaledVector(Se,X*Ee),.3)){J=!0;break}if(J||Zh(l.set(q,0,G).addScaledVector(Se,X*.5)))continue;let le=new an().setFromUnitVectors(d,Se);h.push(new Ye().compose(new C(q,0,G),le,new C(Q,X,Q)));let be=Math.round((9+X*2)*Math.min(1,s+.15));for(let Ee=0;Ee<be;Ee++){let pe=.36+Math.pow(n(),.65)*.64,Ae=new C(q,0,G).add(Se.clone().multiplyScalar(X*pe)),xt=z+(n()-.5)*2.8,Le=.12+n()*.6*pe;Ae.x+=Math.cos(xt)*Le,Ae.z+=Math.sin(xt)*Le,Ae.y+=.2;let qe=.7+n()*.5;a(l.copy(Ae).setY(Ae.y-.47*qe),.25+.62*qe)||Zh(l)||Zh(Ae)||u[n()*4|0].push(Z(Ae.x,Ae.y,Ae.z,n()*Math.PI*2,(n()-.5)*.5,(n()-.5)*.5,qe,qe*(.9+n()*.4),qe))}}}r.add(Object.assign(Wn(c,e.culm,h,{cast:!0,receive:!0}),{name:"bamboo-culms"})),u.forEach((L,w)=>{if(!L.length)return;let D=Wn(Tl(w,{w:.78,h:.95,hang:!0}),e.bambooLeaf,L,{cast:!0,receive:!0});D.customDepthMaterial=e.bambooLeafDepth,D.name="bamboo-leaves",r.add(D)});let f=new yi(.55,1,1,7,1,!0).translate(0,.5,0),p=[],_=[[],[],[],[]],m=[[],[],[],[]],g=[[],[],[],[]],y=[[],[],[],[]],b=["#ffffff","#f2f7e6","#e3ecd2","#fff7e0","#d8e4c8","#eef0d6"].map(L=>new Te(L)),S=(L,w=.06)=>L.clone().offsetHSL((n()-.5)*.02,(n()-.5)*w,(n()-.5)*w);function I(L,w,D=0,U=1,P=!1){let T=(9+n()*11)*U,O=T*(.4+n()*.18),z=(.13+n()*.13)*U,k=(n()-.5)*.06,q=(n()-.5)*.06;p.push(Z(L,D-.3,w,n()*6,k,q,z,O+T*.18,z));let G=b[n()*b.length|0],X=(2+n()*2.4)*U,Q=P?2+(n()*2|0):3+(n()*4|0),_e=n()<.18;for(let Se=0;Se<Q;Se++){let J=n()*Math.PI*2,le=Se===0?0:(.35+n()*.6)*X*.75,be=D+O+(T-O)*(Se===0?.55:.15+n()*.75),Ee=X*(Se===0?.85:.45+n()*.35),pe=L+Math.cos(J)*le+q*be,Ae=w+Math.sin(J)*le-k*be;if(Se>0&&!P){let Le=L+q*O,qe=D+O*(.8+n()*.2),je=w-k*O,Ge=pe-Le,Tt=be-qe,ct=Ae-je,Ot=Math.hypot(Ge,Tt,ct);p.push(Z(Le,qe,je,Math.atan2(Ge,ct),Math.acos(Math.max(-1,Math.min(1,Tt/Ot))),0,z*.45,Ot,z*.45))}let xt=Math.max(3,Math.round((P?3+Ee:5+Ee*2.6)*Math.max(.55,s)));for(let Le=0;Le<xt;Le++){let qe=n()*Math.PI*2,je=Math.acos(2*n()-1),Ge=Math.cbrt(n())*Ee,Tt=(P?2.6+n()*1.6:1.5+n()*1.3)*U,ct=_e?3:n()*3|0;_[ct].push(Z(pe+Ge*Math.sin(je)*Math.cos(qe),be+Ge*Math.cos(je)*.62,Ae+Ge*Math.sin(je)*Math.sin(qe),n()*6,(n()-.5)*.9,(n()-.5)*.9,Tt)),m[ct].push(S(G))}}}function A(L,w,D,U,P=0){let T=Math.max(3,Math.round(D*U*3.2*Math.max(.5,s))),O=b[n()*b.length|0];for(let z=0;z<T;z++){let k=n()*Math.PI*2,q=Math.sqrt(n())*D,G=.9+n()*1,X=P+.3+n()*U*.85;if(a(l.set(L+Math.cos(k)*q,X,w+Math.sin(k)*q),.5+G*.5))continue;let Q=n()*4|0;g[Q].push(Z(l.x,X,l.z,n()*6,(n()-.5)*.5,(n()-.5)*.5,G)),y[Q].push(S(O,.1))}}let x=Math.round(330*s),E=Math.round(420*Math.max(.5,s));for(let L=0;L<x+E;L++){let w=L>=x,D=n()*Math.PI*2,U=w?95+Math.pow(n(),.7)*160:44+Math.pow(n(),.9)*55,P=2+Math.cos(D)*U,T=4+Math.sin(D)*U*.95;if(Jh(P,T,2))continue;let O=qh(P,T);I(P,T,O,w?1.15:1,w),!w&&n()<.8&&A(P+(n()-.5)*4,T+(n()-.5)*4,1.5+n()*2,1.5+n()*2.5,O)}for(let[L,w,D]of[[-46,-8,7],[-47,12,7],[-45,30,6],[-4,-50,8],[26,-46,7],[58,-14,7],[56,10,6],[-22,-48,6],[-38,-34,5],[8,34,4],[-30,36,5],[50,-32,5],[44,22,5]])for(let U=0;U<Math.round(D*Math.max(.6,s));U++){let P=L+(n()-.5)*14,T=w+(n()-.5)*14;Jh(P,T,.5)||(I(P,T,qh(P,T)),n()<.6&&A(P+(n()-.5)*3,T+(n()-.5)*3,1.4+n()*1.6,1.4+n()*2))}{let L=new ln(ze.lawn.map(([U,P])=>new C(U,0,P)),!0,"centripetal"),w=Math.round(L.getLength()/2.6),D=new C(-2,0,2);for(let U=0;U<w;U++){let P=L.getPointAt(U/w),T=P.clone().sub(D).setY(0).normalize();for(let O=0;O<2;O++){let z=P.clone().addScaledVector(T,3+n()*7).add(new C((n()-.5)*2,0,(n()-.5)*2));Jh(z.x,z.z,.8)||Math.abs(z.x-ze.pond.x)<40&&z.z>24||(A(z.x,z.z,1.4+n()*1.8,1.6+n()*2.8),n()<.35&&I(z.x+T.x*2.5,z.z+T.z*2.5,0,.8+n()*.3))}}}for(let[L,w,D,U]of ze.thickets){let P=Math.hypot(D-L,U-w),T=Math.round(P/2.2);for(let O=0;O<=T;O++){let z=O/T,k=L+(D-L)*z+(n()-.5)*2,q=w+(U-w)*z+(n()-.5)*2;A(k,q,1.6+n()*1.6,2.2+n()*2.6),n()<.5&&I(k+(n()-.5)*3,q+(n()-.5)*3,0,.75+n()*.35)}}for(let[L,w,D]of ze.shrubs)A(L,w,D,D*1.1);for(let L of $t.cottage){let w=hn(L,5.9,0,-1.2);A(w.x,w.z,1.1,1.3)}r.add(Object.assign(Wn(f,e.bark,p,{cast:!0,receive:!1}),{name:"trunks"})),_.forEach((L,w)=>{if(!L.length)return;let D=Wn(Tl(w,{planes:3}),e.treeLeaf,L,{cast:!0,receive:!0,colors:m[w]});D.customDepthMaterial=e.treeLeafDepth,D.name="crowns",r.add(D)}),g.forEach((L,w)=>{if(!L.length)return;let D=Wn(Tl(w,{planes:3}),e.shrub,L,{cast:!0,receive:!0,colors:y[w]});D.customDepthMaterial=e.shrubDepth,D.name="shrubs",r.add(D)});{let{x:L,z:w}=ze.bigTree,D=[],U=[[],[],[],[]];D.push(Z(L,0,w,0,.05,-.04,.3,6.8,.3));let P=[[3.3,3.4],[4.6,3],[5.8,2.4],[6.9,1.5]];for(let[T,O]of P){for(let z=0;z<4;z++){let k=z*1.6+T;D.push(Z(L,T-.5,w,k,Math.PI/2-.25,0,.06,O*.9,.06))}for(let z=0;z<Math.round(O*11);z++){let k=n()*Math.PI*2,q=Math.sqrt(n())*O;U[n()*4|0].push(Z(L+Math.cos(k)*q,T+(n()-.3)*.55,w+Math.sin(k)*q,n()*6,(n()-.5)*.3,0,1.5+n()*.7,.8+n()*.4,1.5+n()*.7))}}r.add(Object.assign(Wn(f,e.bark,D),{name:"big-tree"})),U.forEach((T,O)=>{if(T.length){let z=Wn(Tl(O,{planes:3}),e.broadLeaf,T);z.customDepthMaterial=e.broadLeafDepth,z.name="big-tree-leaves",r.add(z)}})}{let L=[],w=new ln(wl(.3).map(([U,P])=>new C(U,0,P)),!0),D=new bt(.05,1.3).translate(0,.65,0);for(let U=0;U<Math.round(900*s);U++){let P=w.getPointAt(n());L.push(Z(P.x+(n()-.5)*1.6,0,P.z+(n()-.5)*1.6,n()*6,(n()-.5)*.3,(n()-.5)*.3,1,.5+n()*.9,1))}r.add(Object.assign(Wn(D,e.reed,L,{cast:!1}),{name:"reeds"}))}{let L=[];for(let O of ze.potRows){let[z,k]=O.from,[q,G]=O.to,X=Math.hypot(q-z,G-k),Q=Math.floor(X/O.step);for(let _e=0;_e<=Q;_e++){let Se=_e/Q,J=z+(q-z)*Se,le=k+(G-k)*Se;L.push(Z(J,.22,le,n()*6,0,0,.65+n()*.2))}}let w=new bt(1,.7).translate(0,.35,0),D=w.clone().rotateY(Math.PI/2),U=w.clone().rotateY(Math.PI/4),P=w.clone().rotateY(-Math.PI/4),T=Wn(lo([w,D,U,P]),e.spider,L,{cast:!0});T.customDepthMaterial=e.spiderDepth,T.name="spider-plants",r.add(T)}if(t.grass>0){let L=[];for(let k=0;k<6;k++){let q=k/6*Math.PI*2+.4,G=Math.cos(q)*.035,X=Math.sin(q)*.035,Q=.03+k%3*.012,_e=.05+k%3*.018,Se=.0045;L.push(G-Se*Math.sin(q),0,X+Se*Math.cos(q),G+Se*Math.sin(q),0,X-Se*Math.cos(q),G+Math.cos(q)*Q,_e,X+Math.sin(q)*Q)}let w=new Nt;w.setAttribute("position",new et(L,3));let D=new Float32Array(L.length);for(let k=1;k<D.length;k+=3)D[k]=1;w.setAttribute("normal",new Bt(D,3));let U=[];for(let k of Object.values($s)){if(k.pos[1]>3)continue;let q=new C(...k.pos),X=new C(...k.target).clone().sub(q).setY(0).normalize(),Q=q.clone().addScaledVector(X,6);(fo(Q.x,Q.z)||fo(q.x,q.z))&&U.push({c:Q,rad:9})}let P=[],T=[],O=["#93ad4c","#86a345","#a1b55a","#b1bb66","#7b9a40","#bdbd72"].map(k=>new Te(k)),z=Math.floor(t.grass/Math.max(1,U.length));for(let{c:k,rad:q}of U){let G=0,X=0;for(;G<z&&X<z*3;){X++;let Q=n()*Math.PI*2,_e=Math.sqrt(n())*q,Se=k.x+Math.cos(Q)*_e,J=k.z+Math.sin(Q)*_e;fo(Se,J)&&(P.push(Z(Se,0,J,n()*6,0,0,.55+n()*.6)),T.push(O[n()*O.length|0]),G++)}}P.length&&r.add(Object.assign(Wn(w,e.blade,P,{cast:!1,receive:!0,colors:T}),{name:"grass"}))}return i.add(r),r}var mo=new C;function Ln(i,e,t,n,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;mo.copy(e),mo[n]=0,mo.normalize();let c=.5*o/(o+a),h=1-mo.angleTo(i)/l;return Math.sign(mo[t])===1?h*c:a/(o+a)+c+c*(1-h)}var Al=class i extends en{constructor(e=1,t=1,n=1,s=2,r=.1){let o=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let l=new C,c=new C,h=new C(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,_=new C,m=.5/o;for(let g=0,y=0;g<u.length;g+=3,y+=2)switch(l.fromArray(u,g),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),u[g+0]=h.x*Math.sign(l.x)+c.x*r,u[g+1]=h.y*Math.sign(l.y)+c.y*r,u[g+2]=h.z*Math.sign(l.z)+c.z*r,d[g+0]=c.x,d[g+1]=c.y,d[g+2]=c.z,Math.floor(g/p)){case 0:_.set(1,0,0),f[y+0]=Ln(_,c,"z","y",r,n),f[y+1]=1-Ln(_,c,"y","z",r,t);break;case 1:_.set(-1,0,0),f[y+0]=1-Ln(_,c,"z","y",r,n),f[y+1]=1-Ln(_,c,"y","z",r,t);break;case 2:_.set(0,1,0),f[y+0]=1-Ln(_,c,"x","z",r,e),f[y+1]=Ln(_,c,"z","x",r,n);break;case 3:_.set(0,-1,0),f[y+0]=1-Ln(_,c,"x","z",r,e),f[y+1]=1-Ln(_,c,"z","x",r,n);break;case 4:_.set(0,0,1),f[y+0]=1-Ln(_,c,"x","y",r,e),f[y+1]=1-Ln(_,c,"y","x",r,t);break;case 5:_.set(0,0,-1),f[y+0]=Ln(_,c,"x","y",r,e),f[y+1]=1-Ln(_,c,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}};var tt=(i,e,t)=>new en(i,e,t),Gt=(i,e,t,n=12,s=!1)=>new yi(i,e,t,n,1,s),un=(i,e,t,n=.02,s=2)=>new Al(i,e,t,s,Math.min(n,i/2.01,e/2.01,t/2.01)),de=(i,e,t,n,s,r)=>i.add(e,t,s?ft(n,s):n,r);function Ft(i,e,t,n,s,r,o=8,a){let l=new C(...n),c=new C(...s),h=l.distanceTo(c),u=Gt(r,r,h,o),d=l.clone().add(c).multiplyScalar(.5),f=new an().setFromUnitVectors(new C(0,1,0),c.clone().sub(l).normalize()),p=new Ye().compose(d,f,new C(1,1,1));i.add(u,e,ft(t,p),a)}function Cv(i=.27,e=.47,t=.84,n=.65,s=3.7,r=28,o=5){let a=[],l=[],c=[],h=[];for(let f=0;f<=r;f++){let p=-s/2+s*f/r,_=Math.cos(p/s*Math.PI),m=n+(t-n)*_*_;for(let g=0;g<=o;g++){let y=g/o,b=i*(1+.14*y),S=e+(m-e)*y;a.push(b*Math.sin(p),S,-b*Math.cos(p)+.03),c.push(f/r,y)}h.push(new C(i*1.14*Math.sin(p),m,-i*1.14*Math.cos(p)+.03))}for(let f=0;f<r;f++)for(let p=0;p<o;p++){let _=f*(o+1)+p,m=_+o+1;l.push(_,m,_+1,m,m+1,_+1)}let u=new Nt;u.setAttribute("position",new et(a,3)),u.setAttribute("uv",new et(c,2)),u.setIndex(l),u.computeVertexNormals();let d=new Vr(new ln(h),r,.016,6,!1);return[u,d]}var Rl=null;function Cl(i,e,t,{color:n="chairBlue",metalLegs:s=!0}={}){let r=e[n],o=s?e.alu:e[n];Rl||(Rl=Cv()),de(i,un(.46,.045,.43,.02),r,t,Z(0,.465,.02)),de(i,Rl[0],r,t,null),de(i,Rl[1],r,t,null);for(let a=0;a<4;a++)de(i,tt(.15,.013,.01),e.black,t,Z(0,.6+a*.04,-.255,0,-.12));for(let[a,l]of[[-.2,-.17],[.2,-.17],[-.21,.2],[.21,.2]])Ft(i,o,t,[a*1.1,.02,l*1.12],[a,.45,l],.012,8),de(i,Gt(.017,.017,.03,8),r,t,Z(a*1.1,.015,l*1.12))}function Il(i,e,t){let n=e.rootWood,s=dt(7),r=[[-.22,-.2],[.22,-.2],[-.22,.2],[.22,.2]];for(let[o,a]of r)Ft(i,n,t,[o*1.15,.02,a*1.1],[o,.46,a],.042,7);Ft(i,n,t,[-.32,.06,-.12],[.32,.06,.18],.05,7),Ft(i,n,t,[.3,.06,-.15],[-.3,.06,.2],.05,7);for(let o=0;o<3;o++)de(i,tt(.5,.045,.14),n,t,Z(0,.48,-.16+o*.155,0,0,(s()-.5)*.05));for(let o of[-.22,.22])Ft(i,n,t,[o,.46,-.2],[o*.95,1.12,-.25],.04,7);for(let o=0;o<3;o++)Ft(i,n,t,[-.23,.68+o*.16,-.22-o*.01],[.23,.68+o*.16,-.22-o*.01],.03,6);de(i,tt(.5,.05,.08),n,t,Z(0,1.12,-.25))}function $h(i,e,t,{radius:n=.32,height:s=.52}={}){let r=dt(11);for(let o=0;o<5;o++){let a=o/5*Math.PI*2+r();Ft(i,e.rootWood,t,[Math.cos(a)*.28,.02,Math.sin(a)*.28],[Math.cos(a+1.2)*.06,s-.02,Math.sin(a+1.2)*.06],.035,6)}de(i,Gt(n,n,.015,32),e.glass,t,Z(0,s,0),{cast:!1})}function Iv(i=2,e=3.15,t=2.5,n=18){let s=new bt(i*2,i*2,n,n);s.rotateX(-Math.PI/2);let r=s.attributes.position;for(let o=0;o<r.count;o++){let a=r.getX(o),l=r.getZ(o),c=Math.max(Math.abs(a),Math.abs(l))/i,h=Math.min(Math.abs(a),Math.abs(l))/i,u=Math.sin(Math.min(1,h/Math.max(c,.001))*Math.PI)*0;r.setY(o,e-(e-t)*Math.pow(c,.92)-u-.06*Math.sin(c*Math.PI))}return s.computeVertexNormals(),s}function Kh(i,e,t,{chairs:n=6,seed:s=1,pad:r=!0,chairColor:o="chairBlue"}={}){let a=dt(s);r&&(de(i,Gt(2.22,2.3,.1,48),e.padConcrete,t,Z(0,.05,0),{cast:!1}),de(i,Gt(2.3,2.42,.04,48),e.padConcrete,t,Z(0,.02,0),{cast:!1}));let c=ft(t,Z(0,r?.1:0,0));de(i,Gt(.56,.56,.03,40),e.tableTop,c,Z(0,.745,0)),de(i,tt(.07,.68,.07),e.black,c,Z(0,.38,0));for(let f of[Math.PI/4,-Math.PI/4])de(i,tt(1.05,.06,.07),e.black,c,Z(0,.03,0,f)),de(i,tt(.62,.05,.05),e.black,c,Z(0,.7,0,f)),Ft(i,e.black,c,[Math.cos(f)*.48,.05,Math.sin(f)*.48],[0,.66,0],.03,6),Ft(i,e.black,c,[-Math.cos(f)*.48,.05,-Math.sin(f)*.48],[0,.66,0],.03,6);let h=3.2,u=2.5,d=2;de(i,Gt(.027,.03,h+.1,10),e.pole,c,Z(0,(h+.1)/2,0)),de(i,Iv(d,h,u),e.umbrella,c,null,{cast:!0,receive:!0});for(let[f,p]of[[1,0],[-1,0],[0,1],[0,-1]]){let _=tt(f?.005:d*2,.16,p?.005:d*2);de(i,_,e.umbrella,c,Z(f*d,u-.08,p*d))}for(let f=0;f<8;f++){let p=f/8*Math.PI*2,_=f%2?1:Math.SQRT2,m=Math.cos(p)*d*_*.97,g=Math.sin(p)*d*_*.97;Ft(i,e.pole,c,[0,h-.05,0],[m,u+.02,g],.012,5),Ft(i,e.pole,c,[0,2.15,0],[m*.45,u+.32,g*.45],.01,5)}de(i,Gt(.05,.06,.16,10),e.pole,c,Z(0,h+.08,0));for(let f=0;f<n;f++){let p=f/n*Math.PI*2+(a()-.5)*.35+s,_=.95+a()*.25,m=Math.cos(p)*_,g=Math.sin(p)*_;Cl(i,e,ft(c,Z(m,0,g,Math.atan2(-m,-g)+Math.PI+(a()-.5)*.4)),{color:o})}}function Nf(i,e,t){de(i,tt(2.25,1.12,.07),e.wenge,t,Z(0,.56,.035)),de(i,tt(1.86,.26,1.98),e.wenge,t,Z(0,.19,1.08)),de(i,tt(1.7,.06,1.8),e.black,t,Z(0,.03,1.08),{cast:!1}),de(i,un(1.82,.26,1.98,.06,3),e.linen,t,Z(0,.45,1.08)),de(i,un(1.9,.05,1.5,.025,2),e.linen,t,Z(0,.6,1.32));for(let[n,s,r]of[[-.45,.3,.665],[.45,.3,.665],[-.43,.5,.69],[.43,.5,.69]])de(i,un(.7,.12,.44,.05,3),e.linen,t,Z(n,r,s,0,-.22));de(i,un(1.98,.02,.7,.008,1),e.throwRed,t,Z(.02,.633,1.72,.03)),de(i,un(1.94,.26,.02,.008,1),e.throwRed,t,Z(.02,.515,2.075,.03,.06));for(let n of[-1,1])de(i,un(.02,.2,.68,.008,1),e.throwRed,t,Z(n*.99+.02,.545,1.72,.03,0,n*.07));for(let n of[-1,1])de(i,tt(.45,.42,.42),e.wenge,t,Z(n*1.38,.21,.26))}function Uf(i,e,t){de(i,tt(1.02,.95,.06),e.wenge,t,Z(0,.475,.03)),de(i,tt(.96,.3,1.98),e.wenge,t,Z(0,.15,1.05)),de(i,un(.92,.2,1.94,.05,3),e.linen,t,Z(0,.4,1.05)),de(i,un(.6,.13,.36,.06,3),e.linen,t,Z(0,.56,.3)),de(i,un(.94,.07,.62,.03,2),e.blanket,t,Z(0,.53,1.62))}function Ff(i,e,t){for(let[n,s]of[[-.42,-.9],[.42,-.9],[-.42,.9],[.42,.9]])de(i,Gt(.035,.03,.42,10),e.rootWood,t,Z(n,.21,s));de(i,tt(.96,.08,1.96),e.rootWood,t,Z(0,.42,0)),de(i,un(.9,.15,1.9,.05,3),e.linen,t,Z(0,.535,0)),de(i,un(.5,.12,.34,.05,3),e.linen,t,Z(0,.66,-.7)),de(i,un(.7,.1,.45,.04,2),e.linen,t,Z(.05,.66,-.25,.2))}function Of(i,e,t){de(i,tt(1.2,2.1,.58),e.wenge,t,Z(0,1.05,.29)),de(i,tt(.006,2,.01),e.black,t,Z(0,1.05,.585));for(let n of[-1,1])de(i,tt(.02,.2,.02),e.alu,t,Z(n*.05,1.1,.6))}function Bf(i,e,t){de(i,tt(1.25,.045,.46),e.wenge,t,Z(0,.76,.23)),de(i,tt(.04,.76,.44),e.wenge,t,Z(.6,.38,.22)),de(i,tt(.42,.3,.44),e.wenge,t,Z(-.4,.6,.22)),de(i,tt(.62,.84,.01),e.mirror,t,Z(.05,1.42,.01));for(let[n,s,r,o]of[[.74,.06,.05,1.87],[.74,.06,.05,.97],[.06,.96,-.31,1.42],[.06,.96,.41,1.42]])de(i,tt(n,s,.02),e.mirrorFrame,t,Z(r,o,.015));Cl(i,e,ft(t,Z(.05,0,.78,Math.PI+.25)))}function zf(i,e,t){de(i,tt(1.4,2.5,.05),e.wenge,t,Z(0,1.25,.025)),de(i,tt(1.02,.6,.05),e.tv,t,Z(0,1.25,.07)),de(i,new bt(.42,.105),e.sign,t,Z(0,2.12,.052))}function Qs(i,e,t,{width:n=1,height:s=2.6,folds:r=7,mat:o="curtain"}={}){let a=new bt(n,s,r*6,2),l=a.attributes.position;for(let c=0;c<l.count;c++)l.setZ(c,Math.sin(l.getX(c)/n*Math.PI*2*r)*.045);a.computeVertexNormals(),de(i,a,e[o],t,Z(0,s/2,0))}function Pl(i,e,t){de(i,tt(1.22,.05,.05),e.frame,t,Z(0,0,.03)),de(i,Gt(.016,.016,1.15,10),e.tubeLight,t,Z(0,-.005,.06,0,0,Math.PI/2),{cast:!1})}function kf(i,e,t){de(i,tt(.95,.05,.5),e.granite,t,Z(0,.84,.25)),de(i,tt(.05,.2,.45),e.granite,t,Z(.4,.73,.23));let n=new Hr([.02,.1,.17,.205,.215,.2].map((r,o)=>new re(r,o*.03)),28);de(i,n,e.porcelain,t,Z(0,.865,.27)),Ft(i,e.alu,t,[.3,.865,.18],[.3,1.1,.18],.012),Ft(i,e.alu,t,[.3,1.1,.18],[.18,1.08,.24],.011),de(i,tt(.55,.75,.01),e.mirror,t,Z(0,1.55,.006));let s=ft(t,Z(1.25,0,0));de(i,un(.38,.3,.55,.12,4),e.porcelain,s,Z(0,.48,.3)),de(i,un(.4,.04,.5,.02,2),e.porcelain,s,Z(0,.64,.3)),de(i,tt(.25,.17,.012),e.black,s,Z(0,1.05,.008)),de(i,new Is(.09,.01,8,24),e.alu,t,Z(-.62,1.35,.03))}function Hf(i,e,t,{span:n=9.4}={}){for(let o of[-1,1])de(i,Gt(.04,.045,2.6,12),e.pole,t,Z(o*n/2,1.3,0)),Ft(i,e.branch,t,[o*n/2,2.4,0],[o*(n/2+1.4),0,.6],.004,4,{cast:!1});let s=new bt(n-.1,.9),r=s.attributes.uv;for(let o=0;o<r.count;o++)r.setXY(o,r.getX(o)*(n/.9),r.getY(o));de(i,s,e.net,t,Z(0,1.98,0),{cast:!0,receive:!1}),de(i,tt(n-.1,.06,.012),e.netBand,t,Z(0,2.43,0)),de(i,tt(n-.1,.035,.012),e.netBand,t,Z(0,1.53,0))}function Gf(i,e,t,{seed:n=3}={}){let s=dt(n),r=new ln(t.map(([a,l])=>new C(a,0,l))),o=Math.round(r.getLength()/1.05);for(let a=0;a<=o;a++){let l=r.getPointAt(a/o),c=r.getTangentAt(a/o),h=Math.atan2(c.x,c.z)+Math.PI/2+(s()-.5)*.35,u=Yi(un(.6+s()*.12,.05,.34+s()*.08,.012,1),.6,[s(),s()]);i.add(u,e.stone,Z(l.x+(s()-.5)*.12,.012,l.z+(s()-.5)*.12,h),{cast:!1})}}function Vf(i,e,t,{seed:n=5,heap:s=!0}={}){let r=dt(n);for(let a=0;a<9;a++){let l=.8+r()*1.3,c=.07+r()*.08,h=(r()-.5)*1.2;de(i,Gt(c,c*1.05,l,9),e.log,t,Z((r()-.5)*1.2,c+(a>5?.15:0),(r()-.5)*.9,h,0,Math.PI/2))}if(!s)return;let o=ft(t,Z(1.6,0,.3));for(let a=0;a<190;a++){let l=r()*Math.PI*2,c=.25+Math.sqrt(r())*1.05,h=Math.cos(l)*c,u=Math.sin(l)*c,d=r()<.7,f=l+(r()-.5)*1.2,p=d?r()*.5:c+.3+r()*.6,_=Math.cos(f)*p,m=Math.sin(f)*p,g=d?.55+r()*.65:.1+r()*.5;Ft(i,e.branch,o,[h,.02+r()*.1,u],[_,g,m],.006+r()*.01,3,{cast:!0,receive:!1})}for(let a=0;a<60;a++){let l=r()*Math.PI*2,c=r()*.8,h=.3+r()*.8,u=l+(r()-.5),d=.4+r()*.7;Ft(i,e.branch,o,[Math.cos(l)*c,h,Math.sin(l)*c],[Math.cos(l)*c+Math.cos(u)*d,h+(r()-.3)*.5,Math.sin(l)*c+Math.sin(u)*d],.004,3,{cast:!1,receive:!1})}}function Wf(i,e,t){de(i,new Is(.42,.06,8,28),e.rim,t,Z(0,.07,0,0,Math.PI/2)),de(i,Gt(.6,.75,.04,24),e.ash,t,Z(0,.01,0),{cast:!1})}function Xf(i,e,t,{height:n=7}={}){de(i,Gt(.06,.09,n,10),e.lampBody,t,Z(0,n/2,0)),de(i,tt(.5,.36,.14),e.lampBody,t,Z(0,n+.05,.12,0,-.45)),de(i,tt(.44,.3,.02),e.floodLens,t,Z(0,n,.2,0,-.45),{cast:!1})}function qf(i,e,t){de(i,Gt(.06,.07,.22,10),e.lampBody,t,Z(0,.11,0)),de(i,Gt(.05,.05,.02,10),e.warmLens,t,Z(0,.225,0),{cast:!1})}function Qh(i,e,t){de(i,tt(.1,.18,.08),e.frame,t,Z(0,0,.04)),de(i,tt(.07,.12,.01),e.warmLens,t,Z(0,0,.085),{cast:!1})}function Yf(i,e,t,{r:n=.17,h:s=.26}={}){de(i,Gt(n,n*.8,s,14),e.pot,t,Z(0,s/2,0)),de(i,Gt(n*.93,n*.93,.02,14),e.soil,t,Z(0,s-.02,0),{cast:!1})}function Zf(i,e,t){let n=new Bi(.45,20,8,0,Math.PI*2,0,.55);de(i,n,e.dish,t,Z(0,0,.3,0,-Math.PI/2+.5)),Ft(i,e.dish,t,[0,0,0],[0,0,.3],.02),Ft(i,e.dish,t,[0,.05,.42],[0,.25,.75],.008)}function Jf(i,e,t){de(i,Gt(.52,.52,.04,32),e.tableTop,t,Z(0,.74,0));for(let n of[-1,1])de(i,tt(.06,1,.06),e.black,t,Z(0,.37,0,0,0,n*.62)),de(i,tt(.06,1,.06),e.black,t,Z(0,.37,0,Math.PI/2,0,n*.62));de(i,tt(.9,.05,.05),e.black,t,Z(0,.03,0)),de(i,tt(.05,.05,.9),e.black,t,Z(0,.03,0))}function $f(i,e,t){de(i,Gt(.66,.68,.03,40),e.concrete,t,Z(0,.012,0),{cast:!1})}function Pv(i,e,t,n=2){let s=i/2,r=e/2,o=Math.max(.01,s-r),a=(y,b,S)=>new C(y,b,S),l=a(-s,0,-r),c=a(s,0,-r),h=a(s,0,r),u=a(-s,0,r),d=a(-o,t,0),f=a(o,t,0),p=[],_=[];function m(y,b,S,I){let A=S.clone().sub(b).normalize(),x=b.clone().add(S).multiplyScalar(.5),E=I.clone().sub(x);E.sub(A.clone().multiplyScalar(E.dot(A))).normalize();for(let L of y){p.push(L.x,L.y,L.z);let w=L.clone().sub(b);_.push(w.dot(A)/n,w.dot(E)/n)}}m([u,h,f,u,f,d],u,h,d),m([c,l,d,c,d,f],c,l,d),m([h,c,f],h,c,f),m([l,u,d],l,u,d);let g=new Nt;return g.setAttribute("position",new et(p,3)),g.setAttribute("uv",new et(_,2)),g.computeVertexNormals(),g}function Dl(i,e,t,{W:n,D:s,H:r,cx:o=0,cz:a=0,y:l}){i.add(Pv(n,s,r),e.roof,ft(t,Z(o,l+.06,a))),i.add(Ne(-n/2,l-.02,-s/2,n/2,l+.06,s/2),e.fascia,ft(t,Z(o,0,a)),{cast:!1});for(let[c,h,u,d]of[[-n/2,s/2-.04,n/2,s/2+.02],[-n/2,-s/2-.02,n/2,-s/2+.04],[n/2-.04,-s/2,n/2+.02,s/2],[-n/2-.02,-s/2,-n/2+.04,s/2]])i.add(Ne(c,l-.18,h,u,l+.08,d),e.fascia,ft(t,Z(o,0,a)),{cast:!1})}function Qn(i,e,t,n,s,r,o,a,{fw:l=.05,depth:c=.07,mullions:h=[]}={}){let u=new bt(r-n-l,o-s-l);i.add(u,e.glass,ft(t,Z((n+r)/2,(s+o)/2,a)),{cast:!1,receive:!1});let d=(f,p,_,m)=>i.add(Ne(f,p,a-c/2,_,m,a+c/2),e.frame,t,{cast:!1});d(n,s,r,s+l),d(n,o-l,r,o),d(n,s,n+l,o),d(r-l,s,r,o);for(let f of h)d(f-l/2,s,f+l/2,o)}function Kn(i,e,t,n,s,r,o,a,l,c=[],h=2){let u=[n,s,...c.flatMap(d=>[d[0],d[1]])].sort((d,f)=>d-f);for(let d=0;d<u.length-1;d++){let f=u[d],p=u[d+1];if(p-f<.001)continue;let _=(f+p)/2,m=c.find(g=>_>g[0]&&_<g[1]);m?(m[2]>r&&i.add(Ne(f,r,a,p,m[2],l,h),e,t),m[3]<o&&i.add(Ne(f,m[3],a,p,o,l,h),e,t)):i.add(Ne(f,r,a,p,o,l,h),e,t)}}function Ll(i,e,t,n,s,r,o,a,l,c=[],h=2){let u=[n,s,...c.flatMap(d=>[d[0],d[1]])].sort((d,f)=>d-f);for(let d=0;d<u.length-1;d++){let f=u[d],p=u[d+1];if(p-f<.001)continue;let _=(f+p)/2,m=c.find(g=>_>g[0]&&_<g[1]);m?(m[2]>r&&i.add(Ne(a,r,f,l,m[2],p,h),e,t),m[3]<o&&i.add(Ne(a,m[3],f,l,o,p,h),e,t)):i.add(Ne(a,r,f,l,o,p,h),e,t)}}function Qf(i,e,t,{interior:n=!1,seed:s=1}={}){let l={x0:-5.2,x1:5.2,z0:-6,z1:0};i.add(Ne(-5.35,0,-6.15,5.35,.3,.02),e.plinth,t,{cast:!1}),i.add(Ne(-5.35,0,.02,5.35,.2,3.25,3),e.concrete,t,{cast:!1}),i.add(Ne(-3.1,.3-.02,Ht.z0,Ht.x1,.3+.012,Ht.z1,1.6),e.floorTile,t,{cast:!1}),i.add(Ne(Ht.x0,.3-.02,Ht.z0,-3.1,.3+.012,Ht.z1,.6),e.bathFloor,t,{cast:!1}),i.add(Ne(Ht.x0,3.25,Ht.z0,Ht.x1,3.25+.04,Ht.z1),e.ceiling,t,{cast:!1}),Kn(i,e.plasterTaupe,t,-5.2,-3.1,.3,3.4,-.12,0),i.add(Ne(-3.1,.3,-.12,-.7,.9,0),e.poolBlue,t),i.add(Ne(-3.1,3,-.12,2.9,3.4,0),e.plaster,t),Kn(i,e.plaster,t,2.9,5.2,.3,3.4,-.12,0,[[3.75,4.85,.95,2.65]]),Kn(i,e.bathWall,t,-4.97,-3.1,.3,3.4-.15,-.23,-.12,[],1.2),i.add(Ne(-3.1,.3,-.23,-.7,.9,-.12),e.wallInner,t),i.add(Ne(-3.1,3,-.23,2.9,3.25,-.12),e.wallInner,t),Kn(i,e.wallInner,t,2.9,4.97,.3,3.25,-.23,-.12,[[3.75,4.85,.95,2.65]]),Qn(i,e,t,-3.1,.9,-.7,3,-.1,{mullions:[-1.9]}),Qn(i,e,t,-.7,.3,1.1,2.75,-.08),Qn(i,e,t,-.7,2.75,2.9,3,-.1,{mullions:[1.1]}),Qn(i,e,t,3.75,.95,4.85,2.65,-.1),i.add(Ne(-.75,.3-.02,-.16,2.95,.3+.02,.02),e.alu,t,{cast:!1}),Kn(i,e.plaster,t,-5.2,5.2,.3,3.4,-6,-5.88,[[2,2.9,.3,2.4],[-4.6,-3.6,2.1,2.7]]),Kn(i,e.wallInner,t,-3.1,4.97,.3,3.25,-5.88,-5.77,[[2,2.9,.3,2.4]]),Kn(i,e.bathWall,t,-4.97,-3.1,.3,3.25,-5.88,-5.77,[[-4.6,-3.6,2.1,2.7]],1.2),i.add(Ne(2,.3,-5.95,2.9,2.4,-5.9),e.doorWhite,t),Qn(i,e,t,-4.6,2.1,-3.6,2.7,-5.94),i.add(Ne(1.7,0,-6.95,3.2,.15,-6,2),e.concrete,t),i.add(Ne(1.8,.15,-6.55,3.1,.3,-6,2),e.concrete,t),i.add(Ne(-5.2,.3,-6,-5.08,3.4,0,2),e.plaster,t),i.add(Ne(-5.08,.3,-5.88,-4.97,3.25,-.12,1.2),e.bathWall,t),i.add(Ne(5.08,.3,-6,5.2,3.4,0,2),e.plaster,t),i.add(Ne(4.97,.3,-5.88,5.08,3.25,-.12),e.wallInner,t),Ll(i,e.wallInner,t,-5.77,-.23,.3,3.25,-3.04,-2.98,[[-5.3,-4.4,.3,2.15]]),Ll(i,e.bathWall,t,-5.77,-.23,.3,3.25,-3.1,-3.04,[[-5.3,-4.4,.3,2.15]],1.2),Dl(i,e,t,{W:11.5,D:7.1,H:1.75,cz:-3,y:3.4});for(let p of[-5.15,-3.1,5.15])i.add(Ne(p-.045,.2,3.1,p+.045,2.95,3.19),e.steel,t);i.add(Ne(-5.25,2.84,3.08,5.25,2.96,3.2),e.steel,t),i.add(Ne(-5.25,2.84,.02,5.25,2.96,.12),e.steel,t);for(let p=-5.15;p<=5.2;p+=1.03)i.add(Ne(p-.03,2.96,.02,p+.03,3.02,3.2),e.steel,t,{cast:!1});i.add(new bt(10.5,3.2).rotateX(-Math.PI/2+.03),e.pergolaRoof,ft(t,Z(0,3.06,1.6)),{cast:!1,receive:!1});let c=(p,_,m,g)=>i.add(Ne(p,.2,_,m,.78,g,2),e.concrete,t);c(-3.05,.02,-2.9,2.75),c(-.95,.02,-.8,2.75),c(-3.05,2.6,-.8,2.75),i.add(Ne(-2.9,.2,.02,-.95,.24,2.6),e.poolBlue,t,{cast:!1}),i.add(Ne(-2.9,.24,2.58,-.95,.7,2.6),e.poolBlue,t,{cast:!1}),i.add(Ne(-2.92,.24,.02,-2.9,.7,2.6),e.poolBlue,t,{cast:!1}),i.add(Ne(-.95,.24,.02,-.93,.7,2.6),e.poolBlue,t,{cast:!1}),i.add(new bt(1.95,2.58).rotateX(-Math.PI/2),e.water,ft(t,Z(-1.925,.69,1.31)),{cast:!1,receive:!0}),Qh(i,e,ft(t,Z(-4.1,2.35,0))),i.add(Ne(1.55,.2,.12,2.45,.218,.67),e.doormat,t,{cast:!1}),$h(i,e,ft(t,Z(.55,.2,1.3)),{height:.5,radius:.3}),Il(i,e,ft(t,Z(-.35,.2,1.25,1.1))),Il(i,e,ft(t,Z(1.35,.2,1,-.9))),Il(i,e,ft(t,Z(1.55,.2,1.95,-1.9)));let h=new pn,u=new i.constructor;Qn(u,e,Z(),1.1,.3,2.9,2.75,-.03),u.add(new en(.03,.3,.04),e.alu,Z(1.2,1.25,0)),h.add(u.build("door")),h.matrixAutoUpdate=!0;let d={},f=[];if(n)Lv(i,e,t,d,f);else for(let[p,_]of[[-1.9,2.4],[1.1,3.6],[4.3,1.1]])Qs(i,e,ft(t,Z(p,.3,-.32)),{width:_,height:2.65,folds:Math.round(_*4)});return{door:h,anchors:d,lights:f,doorTravel:1.72}}function Lv(i,e,t,n,s){let o=(l,c,h,u=0)=>ft(t,Z(l,c,h,u));Nf(i,e,o(4.97,.3,-2,-Math.PI/2)),Uf(i,e,o(4.97,.3,-4.55,-Math.PI/2)),Of(i,e,o(1.15,.3,-5.77)),Bf(i,e,o(-.95,.3,-5.77)),zf(i,e,o(-2.98,.3,-2.6,Math.PI/2)),Ff(i,e,o(-1.55,.3,-1.37,Math.PI)),$h(i,e,o(-2.45,.3,-1.3),{height:.5,radius:.3}),Qs(i,e,o(-2.75,.3,-.33),{width:.55,height:2.75,folds:4}),Qs(i,e,o(3.25,.3,-.33),{width:.6,height:2.75,folds:4}),Qs(i,e,o(4.55,.3,-.33),{width:.75,height:2.75,folds:5}),Ft(i,e.rod,t,[-3,3.08,-.3],[2.9,3.08,-.3],.012,6,{cast:!1}),Pl(i,e,o(1.1,3,-.23,Math.PI)),Pl(i,e,o(1.4,2.9,-5.77,0)),i.add(new en(.88,2.08,.04),e.doorWhite,ft(t,Z(-2.98+.44*Math.sin(1.1),.3+1.04,-4.4-.44*Math.cos(1.1),Math.PI/2-1.1))),kf(i,e,o(-4.97,.3,-1.6,Math.PI/2));let a=(l,c,h)=>({local:[l,c,h]});Object.assign(n,{doorOutside:a(2,1.6,2.6),doorInside:a(2,1.55,-1.1),door:a(2,1.4,0),bed:a(3.9,.75,-2),pillows:a(4.55,.9,-2),throw:a(2.9,.7,-2),singleBed:a(4,.7,-4.55),pool:a(-1.9,.75,1.3),patio:a(.6,.7,1.4),dayBed:a(-1.55,.65,-1.37),sideTable:a(-2.45,.8,-1.3),tv:a(-2.95,1.55,-2.6),dressing:a(-.95,1.4,-5.6),wardrobe:a(1.15,1.3,-5.5),bathroomDoor:a(-3.05,1.3,-4.85),basin:a(-4.72,1,-1.6),wc:a(-4.7,.7,-2.85),glass:a(-1.9,1.9,-.1)}),s.push({type:"room",local:[1,2.6,-2.8]})}function jf(i,e,t,{seed:n=1,dish:s=!0}={}){i.add(Ne(-4.8-.1,0,-7.2-.1,4.8+.1,.45,.1),e.plinth,t,{cast:!1}),i.add(Ne(-4.8,.45,-7.2,4.8,.75,.005),e.plinth,t),Kn(i,e.plaster,t,-4.8,4.8,.75,3.45,-.2,0,[[-3.6,-2.5,1.25,2.35],[-.2,1.9,1.05,2.55],[2.9,3.85,.75,2.55]]),Kn(i,e.plaster,t,-4.8,4.8,.75,3.45,-7.2,-7.2+.2,[[-2.2,-1.1,1.3,2.3],[1.6,2.7,1.3,2.3]]),Ll(i,e.plaster,t,-7.2,0,.75,3.45,-4.8,-4.8+.2,[[-4.6,-3.4,1.3,2.3]]),Ll(i,e.plaster,t,-7.2,0,.75,3.45,4.8-.2,4.8,[[-3.8,-2.6,1.3,2.3]]),i.add(Ne(-4.8+.2,.45,-7.2+.2,4.8-.2,3.45-.1,-.2),e.black,t,{cast:!1,receive:!1}),Qn(i,e,t,-3.6,1.25,-2.5,2.35,-.06,{mullions:[-3.05]});for(let h=1.4;h<2.3;h+=.18)i.add(Ne(-3.58,h,-.13,-2.52,h+.012,-.11),e.frame,t,{cast:!1});Qn(i,e,t,-.2,1.05,1.9,2.55,-.06,{mullions:[.85]}),Qs(i,e,ft(t,Z(.85,1,-.15)),{width:2.1,height:1.55,folds:8,mat:"curtainPolka"});for(let[h,u]of[[-2.2,-1.1],[1.6,2.7]])Qn(i,e,t,h,1.3,u,2.3,-7.2+.06);i.add(Ne(2.9,.45,-.12,3.85,2.55,-.06),e.doorWhite,t),i.add(Ne(2.7,0,.1,4.05,.3,.75,2),e.concrete,t),i.add(Ne(2.7,.3,.1,4.05,.45,.4,2),e.concrete,t),i.add(Ne(2.6,2.8,0,4.15,2.86,1.1),e.steel,t),i.add(new bt(1.5,1.1).rotateX(-Math.PI/2),e.pergolaRoof,ft(t,Z(3.375,2.88,.55)),{cast:!1}),Qh(i,e,ft(t,Z(2.5,2.4,0))),Ft(i,e.pipe,t,[-4.4,.4,.06],[-4.4,3.45-.1,.06],.04,8),Ft(i,e.pipe,t,[4.2,.4,.06],[4.2,1.6,.06],.03,8),s&&Zf(i,e,ft(t,Z(-4.8-.05,3,-1.6,-Math.PI/2))),Dl(i,e,t,{W:9.6+1.5,D:7.2+1.5,H:2.15,cz:-7.2/2,y:3.45})}function ep(i,e,t){i.add(Ne(-6,0,-4,6,.45,4,3),e.plinth,t,{cast:!1}),i.add(Ne(-6+.1,.45,-4+.1,6-.1,.45+.02,4-.1,1.6),e.floorTile,t,{cast:!1});let l=(h,u,d,f)=>i.add(Ne(h,.45,u,d,.45+.55,f),e.plaster,t);l(-6,-4,6,-4+.2),l(-6,-4,-6+.2,4),l(6-.2,-4,6,4),l(-6,4-.2,-1.6,4),l(1.6,4-.2,6,4);for(let h of[-6+.15,-2,2,6-.15])for(let u of[-4+.15,4-.15])i.add(Ne(h-.16,.45,u-.16,h+.16,3.3,u+.16),e.plaster,t);for(let h of[-.5])for(let u of[-6+.15,6-.15])i.add(Ne(u-.16,.45,h-.16,u+.16,3.3,h+.16),e.plaster,t);i.add(Ne(-6,3.1,-4,6,3.35,4),e.plaster,t),i.add(Ne(-6+.3,3.05,-4+.3,6-.3,3.1,4-.3),e.ceiling,t,{cast:!1}),Dl(i,e,t,{W:12+1.8,D:8+1.8,H:2.3,y:3.35}),Pl(i,e,ft(t,Z(0,3,-4+.2)));let c=dt(17);for(let[h,u]of[[-3.2,-1.5],[1.2,-1.5],[-3.2,1.6],[1.2,1.6],[4.4,0]]){let d=ft(t,Z(h,.45,u));i.add(Ne(-.8,.72,-.42,.8,.76,.42),e.chairWhite,d);for(let[f,p]of[[-.72,-.35],[.72,-.35],[-.72,.35],[.72,.35]])i.add(Ne(f-.025,0,p-.025,f+.025,.72,p+.025),e.chairWhite,d);for(let[f,p,_]of[[-.45,-.75,0],[.45,-.75,0],[-.45,.75,Math.PI],[.45,.75,Math.PI]])Cl(i,e,ft(d,Z(f,0,p,_+(c()-.5)*.3)),{color:c()<.6?"chairYellow":"chairWhite",metalLegs:!1})}}function jh(i,e,t,{W:n=7,D:s=5,door:r=!0}={}){let o=n/2;i.add(Ne(-o-.1,0,-s-.1,o+.1,.35,.1),e.plinth,t,{cast:!1}),Kn(i,e.plaster,t,-o,o,.35,3.1,-.2,0,r?[[-.5,.45,.35,2.4],[1.4,2.4,1.2,2.2]]:[[1.4,2.4,1.2,2.2]]),i.add(Ne(-o,.35,-s,o,3.1,-s+.2),e.plaster,t),i.add(Ne(-o,.35,-s,-o+.2,3.1,0),e.plaster,t),i.add(Ne(o-.2,.35,-s,o,3.1,0),e.plaster,t),i.add(Ne(-o+.2,.35,-s+.2,o-.2,3,-.2),e.black,t,{cast:!1,receive:!1}),r&&i.add(Ne(-.5,.35,-.1,.45,2.4,-.04),e.doorWhite,t),Qn(i,e,t,1.4,1.2,2.4,2.2,-.06),Dl(i,e,t,{W:n+1.2,D:s+1.2,H:1.7,cz:-s/2,y:3.1})}var Ji={day:{sunElev:50,sunAzim:128,sunColor:"#fff3e0",sunI:3.1,skyTop:"#4f86d4",skyHorizon:"#cfe1ef",skyBottom:"#56653e",sunGlow:.35,fog:"#c6d5dc",fogDensity:.0034,env:1.25,exposure:.9,night:0,stars:0},golden:{sunElev:9,sunAzim:98,sunColor:"#ffb067",sunI:2.6,skyTop:"#5a83c2",skyHorizon:"#f3c393",skyBottom:"#4a4a2c",sunGlow:1,fog:"#e5c39d",fogDensity:.0045,env:1,exposure:.98,night:0,stars:0},overcast:{sunElev:24,sunAzim:230,sunColor:"#f1ece4",sunI:.9,skyTop:"#9fb0c2",skyHorizon:"#e3e4e2",skyBottom:"#5e6450",sunGlow:.25,fog:"#d3d8d8",fogDensity:.0048,env:1.25,exposure:.95,night:0,stars:0},dusk:{sunElev:-3,sunAzim:255,sunColor:"#ff9a72",sunI:0,skyTop:"#1c2b57",skyHorizon:"#c98d78",skyBottom:"#1e2119",sunGlow:.8,fog:"#465372",fogDensity:.0055,env:.55,exposure:1.2,night:.75,stars:.15},night:{sunElev:-30,sunAzim:200,sunColor:"#9fb4e8",sunI:0,skyTop:"#03060f",skyHorizon:"#141d33",skyBottom:"#06080a",sunGlow:0,fog:"#0b1120",fogDensity:.0065,env:.32,exposure:1.2,night:1,stars:.1,moon:{elev:42,azim:215,color:"#a9bce6",intensity:.28}}},Nv=`
  varying vec3 vDir;
  void main() {
    vDir = normalize((modelMatrix * vec4(position, 0.0)).xyz);
    vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = p.xyww;
  }`,Uv=`
  uniform vec3 uTop; uniform vec3 uHorizon; uniform vec3 uBottom;
  uniform vec3 uSunDir; uniform vec3 uSunColor; uniform float uSunGlow; uniform float uStars; uniform float uDisc;
  varying vec3 vDir;
  float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  void main() {
    vec3 d = normalize(vDir);
    float h = d.y;
    vec3 col = h > 0.0 ? mix(uHorizon, uTop, pow(clamp(h, 0.0, 1.0), 0.48)) : mix(uHorizon, uBottom, clamp(-h * 6.0, 0.0, 1.0));
    float sd = max(dot(d, uSunDir), 0.0);
    col += uSunColor * uSunGlow * (pow(sd, 6.0) * 0.35 + pow(sd, 64.0) * 0.6) * smoothstep(-0.12, 0.05, h);
    col += uSunColor * uDisc * smoothstep(0.9993, 0.9997, sd) * 30.0;
    if (uStars > 0.0 && h > 0.0) {
      vec3 g = floor(d * 380.0);
      float s = hash(g);
      float star = step(0.9975, s) * (0.4 + 0.6 * hash(g + 3.1));
      col += vec3(star) * uStars * smoothstep(0.02, 0.3, h) * 1.4;
    }
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }`;function eu(i,e){let t=Vs.degToRad(i),n=Vs.degToRad(e);return new C(Math.sin(n)*Math.cos(t),Math.sin(t),-Math.cos(n)*Math.cos(t))}function tp(i,e,t){let n={preset:"day"},s=new _n({vertexShader:Nv,fragmentShader:Uv,side:tn,depthWrite:!1,fog:!1,uniforms:{uTop:{value:new Te},uHorizon:{value:new Te},uBottom:{value:new Te},uSunDir:{value:new C(0,1,0)},uSunColor:{value:new Te},uSunGlow:{value:0},uStars:{value:0},uDisc:{value:1}}}),r=new Ut(new Bi(1,48,24),s);r.scale.setScalar(1500),r.frustumCulled=!1,r.renderOrder=-10,r.name="sky",e.add(r);let o=new Fi,a=new Ut(r.geometry,s.clone());a.material.uniforms=s.uniforms,a.scale.setScalar(100),o.add(a);let l=new Xs(i),c=null,h=new Fs("#ffffff",3);h.castShadow=t.shadow>0,h.castShadow&&(h.shadow.mapSize.set(t.shadow,t.shadow),h.shadow.bias=-2e-4,h.shadow.normalBias=.03,h.shadow.radius=3),e.add(h,h.target);let u=new Fs("#a9bce6",0);e.add(u,u.target);let d=new Ds("#cfe3ff","#4f5b33",.25);e.add(d);let f=new Ds("#fff3e3","#e6dac8",0);e.add(f),e.fog=new yr("#c3d3dc",.004);let p={center:new C(-4,0,0),radius:55},_=Hh(),m=[],g=(P,T,O,z=1)=>{let k=new ws({map:_,color:O,blending:ks,depthWrite:!1,transparent:!0,opacity:0,fog:!1}),q=new Er(k);return q.position.copy(P),q.scale.setScalar(T),q.renderOrder=5,q.userData.strength=z,m.push(q),e.add(q),q},y=(P,T,O,z,k=1,q=.03)=>{let G=new Ts({map:_,color:z,blending:ks,depthWrite:!1,transparent:!0,opacity:0,fog:!1,polygonOffset:!0,polygonOffsetFactor:-2}),X=new Ut(new bt(O,O).rotateX(-Math.PI/2),G);return X.position.set(P,q,T),X.renderOrder=4,X.userData.strength=k,m.push(X),e.add(X),X},b=[];for(let P of ze.floodlights){let T=new C(Math.sin(P.ry),0,Math.cos(P.ry)),O=new C(P.x,7,P.z).addScaledVector(T,.2),z=new qr("#e8f0ff",0,60,.82,.55,1.6);z.position.copy(O),z.target.position.copy(O).addScaledVector(T,15).setY(0),z.castShadow=!1,e.add(z,z.target),b.push(z),g(O.clone().addScaledVector(T,.1),7.5,"#eef4ff",1.5),g(O.clone().addScaledVector(T,.12),2.2,"#ffffff",1)}for(let[P,T]of ze.gardenLamps)g(new C(P,.32,T),.9,"#ffbf73",.9),y(P,T,3.2,"#ffb15c",.55);let S=[];for(let P of $t.garden){let T=hn(P,-4.1,2.35,.12);g(T,1.3,"#ffc27a",1);let O=hn(P,-4.1,0,1.4);y(O.x,O.z,4.5,"#ffb763",.45,.22),S.push(T)}for(let P of $t.cottage){let T=Math.cos(P.rot),O=Math.sin(P.rot),z=new C(P.x+2.5*T+.12*O,2.4,P.z-2.5*O+.12*T);g(z,1.3,"#ffc27a",1),S.push(z)}let I=S.slice(0,4).map(P=>{let T=new Us("#ffb866",0,9,1.8);return T.position.copy(P).add(new C(0,-.15,0)),e.add(T),T}),A=new Us("#fff6ea",0,10,1.5);e.add(A);let x=[];for(let P of $t.garden){let T=hn(P,.5,0,1.8);x.push(y(T.x,T.z,7,"#ffd29a",.35,.215))}let E={};function L(P){let T=eu(P.sunElev,P.sunAzim);if(s.uniforms.uTop.value.set(P.skyTop),s.uniforms.uHorizon.value.set(P.skyHorizon),s.uniforms.uBottom.value.set(P.skyBottom),s.uniforms.uSunDir.value.copy(T),s.uniforms.uSunColor.value.set(P.sunColor),s.uniforms.uSunGlow.value=P.sunGlow,s.uniforms.uStars.value=P.stars,s.uniforms.uDisc.value=P.sunElev>-1?1:0,h.color.set(P.sunColor),h.intensity=P.sunI*Vs.smoothstep(P.sunElev,-2,6),h.visible=h.intensity>.001,n.sunDir=T,D(),P.moon){u.color.set(P.moon.color),u.intensity=P.moon.intensity;let O=eu(P.moon.elev,P.moon.azim);u.position.copy(p.center).addScaledVector(O,100),u.target.position.copy(p.center)}else u.intensity=0;u.visible=u.intensity>0,d.color.set(P.skyHorizon).lerp(new Te(P.skyTop),.4),d.groundColor.set(P.skyBottom).lerp(new Te("#8c8274"),.6),d.intensity=.15+.22*(1-P.night),n.fillBase=.3+.55*(1-P.night),e.fog.color.set(P.fog),e.fog.density=P.fogDensity,i.toneMappingExposure=P.exposure,n.baseEnv=P.env,Vh.value=P.night;for(let O of m)O.material.opacity=P.night*O.userData.strength;for(let O of b)O.intensity=P.night*720;for(let O of I)O.intensity=P.night*7;A.intensity=9+P.night*14,Object.assign(E,P)}function w(){let P=c;c=l.fromScene(o,0,.1,1e3),e.environment=c.texture,P&&P.dispose()}function D(){let P=n.sunDir||eu(50,128),T=p.radius;if(h.position.copy(p.center).addScaledVector(P,T*2.2+40),h.target.position.copy(p.center),h.target.updateMatrixWorld(),h.castShadow){let O=h.shadow.camera;O.left=-T,O.right=T,O.top=T,O.bottom=-T,O.near=1,O.far=T*4.4+80,O.updateProjectionMatrix()}i.shadowMap.needsUpdate=!0}function U(P,T,O){let z=Ji[P],k=Ji[T],q={};for(let G of Object.keys(z)){let X=z[G],Q=k[G]??X;typeof X=="number"?q[G]=X+(Q-X)*O:typeof X=="string"&&X[0]==="#"?q[G]="#"+new Te(X).lerp(new Te(Q),O).getHexString():q[G]=O<.5?X:Q}return!z.moon&&k.moon&&(q.moon={...k.moon,intensity:k.moon.intensity*O}),z.moon&&!k.moon&&(q.moon={...z.moon,intensity:z.moon.intensity*(1-O)}),q}return n.set=(P,{env:T=!0}={})=>{n.preset=P,L(Ji[P]),T&&w()},n.blend=(P,T,O,{env:z=!1}={})=>{L(U(P,T,O)),n.preset=O<.5?P:T,z&&w()},n.rebuildEnv=w,n.setFocus=(P,T)=>{p.center.copy(P),p.radius=T,D()},n.setRoomLight=P=>{A.position.copy(P)},n.interior=P=>{e.environmentIntensity=(n.baseEnv??1)*(1-.45*P),d.intensity=(.15+.22*(1-(E.night||0)))*(1-.5*P),f.intensity=(n.fillBase??1)*P},n.sun=h,n.hemi=d,n.room=A,n.sky=r,n.dispose=()=>{c&&c.dispose(),l.dispose()},n}var np={low:{pixelRatio:1,shadow:1024,density:.45,grass:0,texScale:.5,aniso:2,antialias:!1,reflect:0},medium:{pixelRatio:1.25,shadow:2048,density:.7,grass:14e3,texScale:.75,aniso:4,antialias:!0,reflect:0},high:{pixelRatio:1.75,shadow:4096,density:1,grass:3e4,texScale:1,aniso:8,antialias:!0,reflect:1024},ultra:{pixelRatio:2,shadow:4096,density:1.15,grass:5e4,texScale:1,aniso:16,antialias:!0,reflect:1536}};function Fv(){if(typeof window>"u")return"medium";let i=window.matchMedia&&window.matchMedia("(pointer: coarse)").matches,e=Math.min(window.screen?.width||1200,window.screen?.height||800)<600,t=navigator.deviceMemory||4,n=navigator.hardwareConcurrency||4;return i||e?t>=6&&n>=8?"medium":"low":t>=8&&n>=8?"high":"medium"}function Pb(){try{let i=document.createElement("canvas");return!!(i.getContext("webgl2")||i.getContext("webgl"))}catch{return!1}}var Nl=()=>new Promise(i=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>i()):setTimeout(i,0)),Ov=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;function Bv(){let i=[];for(let e of ze.potRows){let[t,n]=e.from,[s,r]=e.to,o=Math.floor(Math.hypot(s-t,r-n)/e.step);for(let a=0;a<=o;a++)i.push([t+(s-t)*a/o,n+(r-n)*a/o])}return i}var zv={name:"GlossFloor",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null},strength:{value:.3}},vertexShader:`
    uniform mat4 textureMatrix;
    varying vec4 vUv; varying vec3 vWorld;
    void main() {
      vUv = textureMatrix * vec4(position, 1.0);
      vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,fragmentShader:`
    uniform vec3 color; uniform sampler2D tDiffuse; uniform float strength;
    varying vec4 vUv; varying vec3 vWorld;
    void main() {
      vec3 v = normalize(cameraPosition - vWorld);
      float f = 0.05 + 0.95 * pow(1.0 - max(v.y, 0.0), 4.0);
      vec4 base = texture2DProj(tDiffuse, vUv);
      gl_FragColor = vec4(base.rgb * color, clamp(strength * (0.45 + 0.55 * f), 0.0, 0.85));
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`};function kv(i,e,t){let r=Ht.x1,o=Ht.z0,a=Ht.z1,l=new ao(new bt(r- -3.1,a-o),{textureWidth:t,textureHeight:Math.round(t*.7),color:"#ffffff",shader:zv,multisample:0});return l.material.transparent=!0,l.material.depthWrite=!1,l.matrixAutoUpdate=!1,l.matrix.copy(e.T).multiply(Z((-3.1+r)/2,.3+.0135,(o+a)/2,0,-Math.PI/2)),l.matrixWorldNeedsUpdate=!0,l.name="floor-gloss",i.add(l),l}function Hv(i,e){let t=new xl;Lf(i,t,e);let n=null;for(let u of $t.garden){let d=Z(u.x,0,u.z,u.rot),f=Qf(t,e,d,{interior:u.interior,seed:u.id.charCodeAt(1)}),p=new pn;p.matrixAutoUpdate=!1,p.matrix.copy(d),p.matrixWorldNeedsUpdate=!0,p.add(f.door),i.add(p),u.interior&&(n={v:u,T:d,...f})}for(let u of $t.cottage)jf(t,e,Z(u.x,0,u.z,u.rot),{seed:u.id.charCodeAt(1),dish:u.id==="V4"});let{diningHall:s,kitchen:r,staff:o}=ze;ep(t,e,Z(s.x,0,s.z,s.rot)),jh(t,e,Z(r.x,0,r.z,r.rot),{W:7,D:5}),jh(t,e,Z(o.x,0,o.z,o.rot),{W:9,D:4.5});for(let u of ze.pads)Kh(t,e,Z(u.x,0,u.z,u.seed*.7),{seed:u.seed});let a=ze.treeTable,l=ze.crossTable,c=ze.manhole;Kh(t,e,Z(a.x,0,a.z,.3),{chairs:0,pad:!1,seed:11}),Jf(t,e,Z(l.x,0,l.z,.4)),$f(t,e,Z(c.x,0,c.z));for(let u of ze.firewood)Vf(t,e,Z(u.x,0,u.z,u.rot),{seed:Math.round(u.x*3)}),Wf(t,e,Z(u.ring[0],0,u.ring[1]));Hf(t,e,Z(ze.net.x,0,ze.net.z,ze.net.rot)),Gf(t,e,ze.stones);for(let u of ze.floodlights)Xf(t,e,Z(u.x,0,u.z,u.ry));for(let[u,d]of ze.gardenLamps)qf(t,e,Z(u,0,d));for(let[u,d]of Bv())Yf(t,e,Z(u,0,d));let h=t.build("estate");return h.traverse(u=>{u.isMesh&&u.material.userData.layer!==void 0&&(u.renderOrder=u.material.userData.layer)}),i.add(h),n}async function Lb(i,e={}){let{quality:t="auto",view:n="lawn-stepping-stones",preset:s=null,onProgress:r=()=>{},live:o=!1,preserveDrawingBuffer:a=!1,maxFps:l=60,pixelRatio:c=null}=e,h=t==="auto"?Fv():t,u=np[h]||np.medium,d=new fl({canvas:i,antialias:u.antialias,powerPreference:"high-performance",preserveDrawingBuffer:a,alpha:!1,stencil:!1});d.setPixelRatio(c??Math.min(typeof devicePixelRatio=="number"?devicePixelRatio:1,u.pixelRatio)),d.toneMapping=Jr,d.outputColorSpace=Qt,d.shadowMap.enabled=u.shadow>0,d.shadowMap.type=Hi,d.shadowMap.autoUpdate=!1,bf({anisotropy:Math.min(u.aniso,d.capabilities.getMaxAnisotropy()),scale:u.texScale});let f=new Fi,p=new jt(55,4/3,.05,3e3);for(let me=0;me<bl.length;me++)r(.05+.25*(me/bl.length),"textures"),bl[me](),await Nl();let _=Rf({quality:h});r(.3,"buildings"),await Nl();let m=Hv(f,_);r(.6,"planting"),await Nl(),Df(f,_,u),r(.8,"light"),await Nl();let g=tp(d,f,u);u.reflect&&kv(f,m,u.reflect),g.setRoomLight(hn(m.v,...m.lights[0].local));let y={};for(let[me,Ue]of Object.entries(m.anchors))y[me]=hn(m.v,...Ue.local);let b=(me,Ue=2.6)=>{let we=ze.pads.find(F=>F.id===me);return new C(we.x,Ue,we.z)},S=ze.firewood[0],I=ze.floodlights[0],A=ze.gardenLamps[0],x=$t.garden[2],E=$t.cottage[0],L=$t.cottage[1];Object.assign(y,{lawn:new C(-2,.5,2),stones:new C(-16.5,.3,8.4),diningHall:new C(ze.diningHall.x,2.2,ze.diningHall.z+4.2),kitchen:new C(ze.kitchen.x,2,ze.kitchen.z-1),courtyard:new C(24,.3,-20),pond:new C(ze.pond.x,.4,ze.pond.z),net:new C(ze.net.x,2,ze.net.z),umbrella:b("P3"),umbrellaP1:b("P1"),umbrellaP2:b("P2"),umbrellaP4:b("P4"),umbrellaP5:b("P5"),tableP3:b("P3",.85),tableP5:b("P5",.85),firewood:new C(S.x+1.4,.7,S.z-.6),bamboo:new C(-29.4,4,7.6),villa:hn(x,.5,1.8,.2),patioChairs:hn(m.v,.9,.8,1.5),cottage:hn(E,0,2,.1),cottageV5:hn(L,0,2,.1),potRow:new C(ze.potRows[0].from[0],.5,(ze.potRows[0].from[1]+ze.potRows[0].to[1])/2),bigTree:new C(ze.bigTree.x,4.5,ze.bigTree.z),floodlight:new C(I.x,7,I.z),gardenLamp:new C(A[0],.3,A[1])});let w={pos:new C,target:new C,fov:55,door:0,interiorK:0},D=!0,U=0,P=!1,T=0,O=!1,z=new Set,k=new C,q=new Ye().copy(m.T).invert();function G(me){return k.copy(me).applyMatrix4(q),k.x>Ht.x0-.05&&k.x<Ht.x1&&k.z>Ht.z0&&k.z<Ht.z1+.2&&k.y<Ht.y1}function X(){p.position.copy(w.pos),p.fov=w.fov,p.updateProjectionMatrix(),p.lookAt(w.target),m.door.position.x=-m.doorTravel*w.door;let me=G(w.pos)?1:0;me!==w.interiorK&&(w.interiorK=me,g.interior(me));let Ue=me?.04:Math.min(.15,.04+.05*Math.max(0,w.pos.y-1));p.near!==Ue&&(p.near=Ue,p.updateProjectionMatrix()),D=!0}function Q(me){w.door=Math.max(0,Math.min(1,me)),X()}function _e(me,Ue){g.setFocus(me,Ue),D=!0}function Se(me){(g.preset!==me||!f.environment)&&g.set(me),g.interior(w.interiorK),_.pergolaRoof.emissiveIntensity=.75*(1-Ji[me].night),_.umbrella.emissiveIntensity=.5*(1-Ji[me].night),D=!0}function J(me){let Ue=Yh(me);return w.pos.copy(Ue.pos),w.target.copy(Ue.target),w.fov=Ue.fov,Ue.door!==void 0&&(w.door=Ue.door),Se(e.lockPreset||Ue.preset),_e(Ue.target.clone().lerp(Ue.pos,.35),Ue.focus),X(),Ue}function le(me,{duration:Ue=2.2}={}){let we=Yh(me),F={pos:w.pos.clone(),target:w.target.clone(),fov:w.fov},at=G(F.pos),Je=G(we.pos),ht;if(at!==Je){let H=y.doorOutside,ne=y.doorInside,te=y.door.clone().setY(1.55);ht=at?[[F.pos,F.target],[ne,te],[H,H.clone().lerp(we.target,.5)],[we.pos,we.target]]:[[F.pos,F.target],[H,te],[ne,ne.clone().lerp(we.target,.5)],[we.pos,we.target]]}else{let H=F.pos.distanceTo(we.pos),ne=F.pos.clone().lerp(we.pos,.5);at||(ne.y+=Math.min(14,H*.18)),ht=[[F.pos,F.target],[ne,F.target.clone().lerp(we.target,.5)],[we.pos,we.target]]}let ce=new po(ht.map(([H,ne])=>[H.toArray(),ne.toArray()])),Rt=w.door,Oe=at!==Je?1:we.door??w.door,R=new En().setFromPoints([F.pos,we.pos,F.target,we.target]).getBoundingSphere(new Bn);_e(R.center,Math.max(we.focus,R.radius+8)),we.preset!==g.preset&&!e.lockPreset&&Se(we.preset);let v=at!==Je?Math.max(Ue,3.2):Ue;return be(v,H=>{let ne=Ov(H);ce.at(ne,w.pos,w.target),w.fov=F.fov+(we.fov-F.fov)*ne,w.door=at!==Je?Math.min(1,Math.max(Rt,ne*3)):Rt+(Oe-Rt)*ne,X()}).then(()=>(_e(we.target.clone().lerp(we.pos,.35),we.focus),we))}function be(me,Ue){return new Promise(we=>{let F={start:-1,duration:me*1e3,fn:Ue,resolve:we};z.add(F),ct()})}let Ee={};function pe(me,Ue,{fov:we=null,door:F=null}={}){if(!Ee[me]){let Je=new po(Ks[me]),ht=Ks[me].flatMap(([Rt,Oe])=>[new C(...Rt),new C(...Oe)]),ce=new En().setFromPoints(ht).getBoundingSphere(new Bn);Ee[me]={p:Je,center:ce.center,radius:Math.min(70,ce.radius+6)}}let at=Ee[me];w.activePath!==me&&(w.activePath=me,_e(at.center,at.radius)),at.p.at(Ue,w.pos,w.target),we&&(w.fov=we),F!==null&&(w.door=F),X()}let Ae=new C;function xt(me){let Ue=typeof me=="string"?y[me]:me;if(!Ue)return null;Ae.copy(Ue).project(p);let we=i.clientWidth,F=i.clientHeight,at=Ae.z>1;return{x:(Ae.x*.5+.5)*we,y:(-Ae.y*.5+.5)*F,visible:!at&&Math.abs(Ae.x)<=1.02&&Math.abs(Ae.y)<=1.02,depth:Ae.z}}let Le=new Zr;function qe(me,Ue){p.updateMatrixWorld(),Le.setFromCamera(new re(me,Ue),p);let we=Le.intersectObjects(f.children,!0).find(Je=>Je.object.visible&&Je.object.name!=="sky");if(!we)return null;let F=we.object,at=new Ye;return F.isInstancedMesh&&we.instanceId!==void 0&&F.getMatrixAt(we.instanceId,at),{name:F.name||F.parent?.name,material:F.material?.color?.getHexString?.(),instanceId:we.instanceId,point:we.point.toArray().map(Je=>+Je.toFixed(2)),distance:+we.distance.toFixed(2),matrix:F.isInstancedMesh?at.elements.map(Je=>+Je.toFixed(2)):null}}function je(me=i.clientWidth,Ue=i.clientHeight){!me||!Ue||(d.setSize(me,Ue,!1),p.aspect=me/Ue,p.updateProjectionMatrix(),D=!0)}function Ge(){d.render(f,p),D=!1}function Tt(me){if(O||(U=requestAnimationFrame(Tt),me-T<1e3/Mt.maxFps-2))return;let Ue=T?Math.min(.1,(me-T)/1e3):0;T=me;for(let we of[...z]){we.start<0&&(we.start=me);let F=Math.min(1,(me-we.start)/we.duration);we.fn(F),F>=1&&(z.delete(we),we.resolve())}Mt.live&&(Gh.value+=Ue,D=!0),Mt.onFrame&&Mt.onFrame(Ue),D&&Ge(),!Mt.live&&!z.size&&!D&&!Mt.keepAlive&&(P=!1,cancelAnimationFrame(U))}function ct(){P||O||(P=!0,T=0,U=requestAnimationFrame(Tt))}function Ot(){D=!0,ct()}function At(me,Ue,we="image/png",F=.95){let at=new re;d.getSize(at),me&&Ue&&je(me,Ue),Ge();let Je=i.toDataURL(we,F);return me&&Ue&&je(at.x,at.y),Je}function Rn(){O=!0,cancelAnimationFrame(U),f.traverse(me=>{me.geometry&&me.geometry.dispose(),me.material&&(Array.isArray(me.material)?me.material:[me.material]).forEach(Ue=>Ue.dispose())}),g.dispose(),Ef(),d.dispose();try{d.forceContextLoss()}catch{}}let Mt={renderer:d,scene:f,camera:p,anchors:y,quality:h,live:o,views:Object.keys($s),paths:Object.keys(Ks),presets:Object.keys(Ji),setView:J,flyTo:le,setPreset:Se,setDoor:Q,setPathProgress:pe,project:xt,pick:qe,resize:je,render:Ge,invalidate:Ot,start:ct,snapshot:At,dispose:Rn,blendPresets(me,Ue,we){g.blend(me,Ue,we),g.interior(w.interiorK),Ot()},rebuildEnvironment(){g.rebuildEnv(),Ot()},get state(){return w},get preset(){return g.preset},onFrame:null,keepAlive:!1,maxFps:l};return r(.95,"first frame"),je(),J(n),s&&Se(s),Ge(),r(1,"ready"),o&&ct(),Mt}export{Ks as PATHS,Ji as PRESETS,np as QUALITY,$s as VIEWS,Lb as createWorld,Fv as pickQuality,Pb as webglAvailable};

import{createRequire as ___cr}from'module';const require=___cr(process.cwd()+'/');
var hi=Object.create;var rr=Object.defineProperty;var fi=Object.getOwnPropertyDescriptor;var mi=Object.getOwnPropertyNames;var gi=Object.getPrototypeOf,bi=Object.prototype.hasOwnProperty;var x=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(e,t)=>(typeof require<"u"?require:e)[t]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var f=(r,e)=>()=>{try{return e||r((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}};var yi=(r,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of mi(e))!bi.call(r,i)&&i!==t&&rr(r,i,{get:()=>e[i],enumerable:!(s=fi(e,i))||s.enumerable});return r};var vi=(r,e,t)=>(t=r!=null?hi(gi(r)):{},yi(e||!r||!r.__esModule?rr(t,"default",{value:r,enumerable:!0}):t,r));var Ge=f(ir=>{"use strict";ir.parse=function(r,e){return new Ue(r,e).parse()};var Ue=class r{constructor(e,t){this.source=e,this.transform=t||wi,this.position=0,this.entries=[],this.recorded=[],this.dimension=0}isEof(){return this.position>=this.source.length}nextCharacter(){var e=this.source[this.position++];return e==="\\"?{value:this.source[this.position++],escaped:!0}:{value:e,escaped:!1}}record(e){this.recorded.push(e)}newEntry(e){var t;(this.recorded.length>0||e)&&(t=this.recorded.join(""),t==="NULL"&&!e&&(t=null),t!==null&&(t=this.transform(t)),this.entries.push(t),this.recorded=[])}consumeDimensions(){if(this.source[0]==="[")for(;!this.isEof();){var e=this.nextCharacter();if(e.value==="=")break}}parse(e){var t,s,i;for(this.consumeDimensions();!this.isEof();)if(t=this.nextCharacter(),t.value==="{"&&!i)this.dimension++,this.dimension>1&&(s=new r(this.source.substr(this.position-1),this.transform),this.entries.push(s.parse(!0)),this.position+=s.position-2);else if(t.value==="}"&&!i){if(this.dimension--,!this.dimension&&(this.newEntry(),e))return this.entries}else t.value==='"'&&!t.escaped?(i&&this.newEntry(!0),i=!i):t.value===","&&!i?this.newEntry():this.record(t.value);if(this.dimension!==0)throw new Error("array dimension not balanced");return this.entries}};function wi(r){return r}});var We=f((dl,nr)=>{var Si=Ge();nr.exports={create:function(r,e){return{parse:function(){return Si.parse(r,e)}}}}});var lr=f((ul,or)=>{"use strict";var ki=/(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/,_i=/^(\d{1,})-(\d{2})-(\d{2})( BC)?$/,Ei=/([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/,Ci=/^-?infinity$/;or.exports=function(e){if(Ci.test(e))return Number(e.replace("i","I"));var t=ki.exec(e);if(!t)return $i(e)||null;var s=!!t[8],i=parseInt(t[1],10);s&&(i=ar(i));var n=parseInt(t[2],10)-1,a=t[3],o=parseInt(t[4],10),l=parseInt(t[5],10),c=parseInt(t[6],10),d=t[7];d=d?1e3*parseFloat(d):0;var h,m=Ai(e);return m!=null?(h=new Date(Date.UTC(i,n,a,o,l,c,d)),Ve(i)&&h.setUTCFullYear(i),m!==0&&h.setTime(h.getTime()-m)):(h=new Date(i,n,a,o,l,c,d),Ve(i)&&h.setFullYear(i)),h};function $i(r){var e=_i.exec(r);if(e){var t=parseInt(e[1],10),s=!!e[4];s&&(t=ar(t));var i=parseInt(e[2],10)-1,n=e[3],a=new Date(t,i,n);return Ve(t)&&a.setFullYear(t),a}}function Ai(r){if(r.endsWith("+00"))return 0;var e=Ei.exec(r.split(" ")[1]);if(e){var t=e[1];if(t==="Z")return 0;var s=t==="-"?-1:1,i=parseInt(e[2],10)*3600+parseInt(e[3]||0,10)*60+parseInt(e[4]||0,10);return i*s*1e3}}function ar(r){return-(r-1)}function Ve(r){return r>=0&&r<100}});var dr=f((pl,cr)=>{cr.exports=Pi;var Ti=Object.prototype.hasOwnProperty;function Pi(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Ti.call(t,s)&&(r[s]=t[s])}return r}});var hr=f((hl,pr)=>{"use strict";var Ii=dr();pr.exports=te;function te(r){if(!(this instanceof te))return new te(r);Ii(this,ji(r))}var Mi=["seconds","minutes","hours","days","months","years"];te.prototype.toPostgres=function(){var r=Mi.filter(this.hasOwnProperty,this);return this.milliseconds&&r.indexOf("seconds")<0&&r.push("seconds"),r.length===0?"0":r.map(function(e){var t=this[e]||0;return e==="seconds"&&this.milliseconds&&(t=(t+this.milliseconds/1e3).toFixed(6).replace(/\.?0+$/,"")),t+" "+e},this).join(" ")};var qi={years:"Y",months:"M",days:"D",hours:"H",minutes:"M",seconds:"S"},Ri=["years","months","days"],Oi=["hours","minutes","seconds"];te.prototype.toISOString=te.prototype.toISO=function(){var r=Ri.map(t,this).join(""),e=Oi.map(t,this).join("");return"P"+r+"T"+e;function t(s){var i=this[s]||0;return s==="seconds"&&this.milliseconds&&(i=(i+this.milliseconds/1e3).toFixed(6).replace(/0+$/,"")),i+qi[s]}};var Ye="([+-]?\\d+)",Li=Ye+"\\s+years?",Di=Ye+"\\s+mons?",Bi=Ye+"\\s+days?",zi="([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?",Fi=new RegExp([Li,Di,Bi,zi].map(function(r){return"("+r+")?"}).join("\\s*")),ur={years:2,months:4,days:6,hours:9,minutes:10,seconds:11,milliseconds:12},Ni=["hours","minutes","seconds","milliseconds"];function Qi(r){var e=r+"000000".slice(r.length);return parseInt(e,10)/1e3}function ji(r){if(!r)return{};var e=Fi.exec(r),t=e[8]==="-";return Object.keys(ur).reduce(function(s,i){var n=ur[i],a=e[n];return!a||(a=i==="milliseconds"?Qi(a):parseInt(a,10),!a)||(t&&~Ni.indexOf(i)&&(a*=-1),s[i]=a),s},{})}});var gr=f((fl,mr)=>{"use strict";var fr=Buffer.from||Buffer;mr.exports=function(e){if(/^\\x/.test(e))return fr(e.substr(2),"hex");for(var t="",s=0;s<e.length;)if(e[s]!=="\\")t+=e[s],++s;else if(/[0-7]{3}/.test(e.substr(s+1,3)))t+=String.fromCharCode(parseInt(e.substr(s+1,3),8)),s+=4;else{for(var i=1;s+i<e.length&&e[s+i]==="\\";)i++;for(var n=0;n<Math.floor(i/2);++n)t+="\\";s+=Math.floor(i/2)*2}return fr(t,"binary")}});var kr=f((ml,Sr)=>{var ce=Ge(),de=We(),Se=lr(),yr=hr(),vr=gr();function ke(r){return function(t){return t===null?t:r(t)}}function xr(r){return r===null?r:r==="TRUE"||r==="t"||r==="true"||r==="y"||r==="yes"||r==="on"||r==="1"}function Hi(r){return r?ce.parse(r,xr):null}function Ui(r){return parseInt(r,10)}function Ke(r){return r?ce.parse(r,ke(Ui)):null}function Gi(r){return r?ce.parse(r,ke(function(e){return wr(e).trim()})):null}var Wi=function(r){if(!r)return null;var e=de.create(r,function(t){return t!==null&&(t=et(t)),t});return e.parse()},Xe=function(r){if(!r)return null;var e=de.create(r,function(t){return t!==null&&(t=parseFloat(t)),t});return e.parse()},z=function(r){if(!r)return null;var e=de.create(r);return e.parse()},Je=function(r){if(!r)return null;var e=de.create(r,function(t){return t!==null&&(t=Se(t)),t});return e.parse()},Vi=function(r){if(!r)return null;var e=de.create(r,function(t){return t!==null&&(t=yr(t)),t});return e.parse()},Yi=function(r){return r?ce.parse(r,ke(vr)):null},Ze=function(r){return parseInt(r,10)},wr=function(r){var e=String(r);return/^\d+$/.test(e)?e:r},br=function(r){return r?ce.parse(r,ke(JSON.parse)):null},et=function(r){return r[0]!=="("?null:(r=r.substring(1,r.length-1).split(","),{x:parseFloat(r[0]),y:parseFloat(r[1])})},Ki=function(r){if(r[0]!=="<"&&r[1]!=="(")return null;for(var e="(",t="",s=!1,i=2;i<r.length-1;i++){if(s||(e+=r[i]),r[i]===")"){s=!0;continue}else if(!s)continue;r[i]!==","&&(t+=r[i])}var n=et(e);return n.radius=parseFloat(t),n},Xi=function(r){r(20,wr),r(21,Ze),r(23,Ze),r(26,Ze),r(700,parseFloat),r(701,parseFloat),r(16,xr),r(1082,Se),r(1114,Se),r(1184,Se),r(600,et),r(651,z),r(718,Ki),r(1e3,Hi),r(1001,Yi),r(1005,Ke),r(1007,Ke),r(1028,Ke),r(1016,Gi),r(1017,Wi),r(1021,Xe),r(1022,Xe),r(1231,Xe),r(1014,z),r(1015,z),r(1008,z),r(1009,z),r(1040,z),r(1041,z),r(1115,Je),r(1182,Je),r(1185,Je),r(1186,yr),r(1187,Vi),r(17,vr),r(114,JSON.parse.bind(JSON)),r(3802,JSON.parse.bind(JSON)),r(199,br),r(3807,br),r(3907,z),r(2951,z),r(791,z),r(1183,z),r(1270,z)};Sr.exports={init:Xi}});var Er=f((gl,_r)=>{"use strict";var M=1e6;function Ji(r){var e=r.readInt32BE(0),t=r.readUInt32BE(4),s="";e<0&&(e=~e+(t===0),t=~t+1>>>0,s="-");var i="",n,a,o,l,c,d;{if(n=e%M,e=e/M>>>0,a=4294967296*n+t,t=a/M>>>0,o=""+(a-M*t),t===0&&e===0)return s+o+i;for(l="",c=6-o.length,d=0;d<c;d++)l+="0";i=l+o+i}{if(n=e%M,e=e/M>>>0,a=4294967296*n+t,t=a/M>>>0,o=""+(a-M*t),t===0&&e===0)return s+o+i;for(l="",c=6-o.length,d=0;d<c;d++)l+="0";i=l+o+i}{if(n=e%M,e=e/M>>>0,a=4294967296*n+t,t=a/M>>>0,o=""+(a-M*t),t===0&&e===0)return s+o+i;for(l="",c=6-o.length,d=0;d<c;d++)l+="0";i=l+o+i}return n=e%M,a=4294967296*n+t,o=""+a%M,s+o+i}_r.exports=Ji});var Pr=f((bl,Tr)=>{var Zi=Er(),S=function(r,e,t,s,i){t=t||0,s=s||!1,i=i||function(w,q,u){return w*Math.pow(2,u)+q};var n=t>>3,a=function(w){return s?~w&255:w},o=255,l=8-t%8;e<l&&(o=255<<8-e&255,l=e),t&&(o=o>>t%8);var c=0;t%8+e>=8&&(c=i(0,a(r[n])&o,l));for(var d=e+t>>3,h=n+1;h<d;h++)c=i(c,a(r[h]),8);var m=(e+t)%8;return m>0&&(c=i(c,a(r[d])>>8-m,m)),c},Ar=function(r,e,t){var s=Math.pow(2,t-1)-1,i=S(r,1),n=S(r,t,1);if(n===0)return 0;var a=1,o=function(c,d,h){c===0&&(c=1);for(var m=1;m<=h;m++)a/=2,(d&1<<h-m)>0&&(c+=a);return c},l=S(r,e,t+1,!1,o);return n==Math.pow(2,t+1)-1?l===0?i===0?1/0:-1/0:NaN:(i===0?1:-1)*Math.pow(2,n-s)*l},en=function(r){return S(r,1)==1?-1*(S(r,15,1,!0)+1):S(r,15,1)},Cr=function(r){return S(r,1)==1?-1*(S(r,31,1,!0)+1):S(r,31,1)},tn=function(r){return Ar(r,23,8)},rn=function(r){return Ar(r,52,11)},sn=function(r){var e=S(r,16,32);if(e==49152)return NaN;for(var t=Math.pow(1e4,S(r,16,16)),s=0,i=[],n=S(r,16),a=0;a<n;a++)s+=S(r,16,64+16*a)*t,t/=1e4;var o=Math.pow(10,S(r,16,48));return(e===0?1:-1)*Math.round(s*o)/o},$r=function(r,e){var t=S(e,1),s=S(e,63,1),i=new Date((t===0?1:-1)*s/1e3+9466848e5);return r||i.setTime(i.getTime()+i.getTimezoneOffset()*6e4),i.usec=s%1e3,i.getMicroSeconds=function(){return this.usec},i.setMicroSeconds=function(n){this.usec=n},i.getUTCMicroSeconds=function(){return this.usec},i},ue=function(r){for(var e=S(r,32),t=S(r,32,32),s=S(r,32,64),i=96,n=[],a=0;a<e;a++)n[a]=S(r,32,i),i+=32,i+=32;var o=function(c){var d=S(r,32,i);if(i+=32,d==4294967295)return null;var h;if(c==23||c==20)return h=S(r,d*8,i),i+=d*8,h;if(c==25)return h=r.toString(this.encoding,i>>3,(i+=d<<3)>>3),h;console.log("ERROR: ElementType not implemented: "+c)},l=function(c,d){var h=[],m;if(c.length>1){var w=c.shift();for(m=0;m<w;m++)h[m]=l(c,d);c.unshift(w)}else for(m=0;m<c[0];m++)h[m]=o(d);return h};return l(n,s)},nn=function(r){return r.toString("utf8")},an=function(r){return r===null?null:S(r,8)>0},on=function(r){r(20,Zi),r(21,en),r(23,Cr),r(26,Cr),r(1700,sn),r(700,tn),r(701,rn),r(16,an),r(1114,$r.bind(null,!1)),r(1184,$r.bind(null,!0)),r(1e3,ue),r(1007,ue),r(1016,ue),r(1008,ue),r(1009,ue),r(25,nn)};Tr.exports={init:on}});var Mr=f((yl,Ir)=>{Ir.exports={BOOL:16,BYTEA:17,CHAR:18,INT8:20,INT2:21,INT4:23,REGPROC:24,TEXT:25,OID:26,TID:27,XID:28,CID:29,JSON:114,XML:142,PG_NODE_TREE:194,SMGR:210,PATH:602,POLYGON:604,CIDR:650,FLOAT4:700,FLOAT8:701,ABSTIME:702,RELTIME:703,TINTERVAL:704,CIRCLE:718,MACADDR8:774,MONEY:790,MACADDR:829,INET:869,ACLITEM:1033,BPCHAR:1042,VARCHAR:1043,DATE:1082,TIME:1083,TIMESTAMP:1114,TIMESTAMPTZ:1184,INTERVAL:1186,TIMETZ:1266,BIT:1560,VARBIT:1562,NUMERIC:1700,REFCURSOR:1790,REGPROCEDURE:2202,REGOPER:2203,REGOPERATOR:2204,REGCLASS:2205,REGTYPE:2206,UUID:2950,TXID_SNAPSHOT:2970,PG_LSN:3220,PG_NDISTINCT:3361,PG_DEPENDENCIES:3402,TSVECTOR:3614,TSQUERY:3615,GTSVECTOR:3642,REGCONFIG:3734,REGDICTIONARY:3769,JSONB:3802,REGNAMESPACE:4089,REGROLE:4096}});var fe=f(he=>{var ln=kr(),cn=Pr(),dn=We(),un=Mr();he.getTypeParser=pn;he.setTypeParser=hn;he.arrayParser=dn;he.builtins=un;var pe={text:{},binary:{}};function qr(r){return String(r)}function pn(r,e){return e=e||"text",pe[e]&&pe[e][r]||qr}function hn(r,e,t){typeof e=="function"&&(t=e,e="text"),pe[e][r]=t}ln.init(function(r,e){pe.text[r]=e});cn.init(function(r,e){pe.binary[r]=e})});var me=f((xl,tt)=>{"use strict";var Rr;try{Rr=process.platform==="win32"?process.env.USERNAME:process.env.USER}catch{}tt.exports={host:"localhost",user:Rr,database:void 0,password:null,connectionString:void 0,port:5432,rows:0,binary:!1,max:10,idleTimeoutMillis:3e4,client_encoding:"",ssl:!1,sslnegotiation:void 0,application_name:void 0,fallback_application_name:void 0,options:void 0,parseInputDatesAsUTC:!1,statement_timeout:!1,lock_timeout:!1,idle_in_transaction_session_timeout:!1,query_timeout:!1,connect_timeout:0,keepalives:1,keepalives_idle:0};var re=fe(),fn=re.getTypeParser(20,"text"),mn=re.getTypeParser(1016,"text");tt.exports.__defineSetter__("parseInt8",function(r){re.setTypeParser(20,"text",r?re.getTypeParser(23,"text"):fn),re.setTypeParser(1016,"text",r?re.getTypeParser(1007,"text"):mn)})});var V=f((wl,Lr)=>{"use strict";var gn=me(),bn=x("util"),{isDate:yn}=x("util/types"),vn=bn.deprecate(()=>{},"Sending an invalid date to Postgres is deprecated and will throw an error in the next major version of pg. Ensure any Date object passed as a query parameter is valid.","PG_INVALID_DATE");function xn(r){return'"'+r.replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'}function Or(r){let e="{";for(let t=0;t<r.length;t++){t>0&&(e+=",");let s=r[t];s==null?e+="NULL":Array.isArray(s)?e+=Or(s):ArrayBuffer.isView(s)?(s instanceof Buffer||(s=Buffer.from(s.buffer,s.byteOffset,s.byteLength)),e+="\\\\x"+s.toString("hex")):e+=xn(_e(s))}return e+="}",e}var _e=function(r,e){return r==null?null:typeof r=="object"?r instanceof Buffer?r:ArrayBuffer.isView(r)?Buffer.from(r.buffer,r.byteOffset,r.byteLength):yn(r)?(isNaN(r.getTime())&&vn(),gn.parseInputDatesAsUTC?kn(r):Sn(r)):Array.isArray(r)?Or(r):wn(r,e):r.toString()};function wn(r,e){if(r&&typeof r.toPostgres=="function"){if(e=e||[],e.indexOf(r)!==-1)throw new Error('circular reference detected while preparing "'+r+'" for query');return e.push(r),_e(r.toPostgres(_e),e)}return JSON.stringify(r)}function Sn(r){let e=-r.getTimezoneOffset(),t=r.getFullYear(),s=t<1;s&&(t=Math.abs(t)+1);let i=String(t).padStart(4,"0")+"-"+String(r.getMonth()+1).padStart(2,"0")+"-"+String(r.getDate()).padStart(2,"0")+"T"+String(r.getHours()).padStart(2,"0")+":"+String(r.getMinutes()).padStart(2,"0")+":"+String(r.getSeconds()).padStart(2,"0")+"."+String(r.getMilliseconds()).padStart(3,"0");return e<0?(i+="-",e*=-1):i+="+",i+=String(Math.floor(e/60)).padStart(2,"0")+":"+String(e%60).padStart(2,"0"),s&&(i+=" BC"),i}function kn(r){let e=r.getUTCFullYear(),t=e<1;t&&(e=Math.abs(e)+1);let s=String(e).padStart(4,"0")+"-"+String(r.getUTCMonth()+1).padStart(2,"0")+"-"+String(r.getUTCDate()).padStart(2,"0")+"T"+String(r.getUTCHours()).padStart(2,"0")+":"+String(r.getUTCMinutes()).padStart(2,"0")+":"+String(r.getUTCSeconds()).padStart(2,"0")+"."+String(r.getUTCMilliseconds()).padStart(3,"0");return s+="+00:00",t&&(s+=" BC"),s}function _n(r,e,t){return r=typeof r=="string"?{text:r}:En(r),e&&(typeof e=="function"?r.callback=e:r.values=e),t&&(r.callback=t),r}function En(r){return r==null?r:Object.defineProperties(Object.create(Object.getPrototypeOf(r)),Object.getOwnPropertyDescriptors(r))}var Cn=function(r){return'"'+r.replace(/"/g,'""')+'"'},$n=function(r){let e=!1,t="'";if(r==null||typeof r!="string")return"''";for(let s=0;s<r.length;s++){let i=r[s];i==="'"?t+=i+i:i==="\\"?(t+=i+i,e=!0):t+=i}return t+="'",e===!0&&(t=" E"+t),t};Lr.exports={prepareValue:function(e){return _e(e)},normalizeQueryConfig:_n,escapeIdentifier:Cn,escapeLiteral:$n}});var it=f((Sl,zr)=>{var Dr=x("crypto");zr.exports={postgresMd5PasswordHash:Tn,randomBytes:An,deriveKey:qn,sha256:Pn,hashByName:In,hmacSha256:Mn,md5:rt};var Br=Dr.webcrypto||globalThis.crypto,Y=Br.subtle,st=new TextEncoder;function An(r){return Br.getRandomValues(Buffer.alloc(r))}async function rt(r){try{return Dr.createHash("md5").update(r,"utf-8").digest("hex")}catch{let t=typeof r=="string"?st.encode(r):r,s=await Y.digest("MD5",t);return Array.from(new Uint8Array(s)).map(i=>i.toString(16).padStart(2,"0")).join("")}}async function Tn(r,e,t){let s=await rt(e+r);return"md5"+await rt(Buffer.concat([Buffer.from(s),t]))}async function Pn(r){return await Y.digest("SHA-256",r)}async function In(r,e){return await Y.digest(r,e)}async function Mn(r,e){let t=await Y.importKey("raw",r,{name:"HMAC",hash:"SHA-256"},!1,["sign"]);return await Y.sign("HMAC",t,st.encode(e))}async function qn(r,e,t){let s=await Y.importKey("raw",st.encode(r),"PBKDF2",!1,["deriveBits"]),i={name:"PBKDF2",hash:"SHA-256",salt:e,iterations:t};return await Y.deriveBits(i,s,256,["deriveBits"])}});var Qr=f((kl,Nr)=>{function K(r,e){return new Error("SASL channel binding: "+r+" when parsing public certificate "+e.toString("base64"))}function nt(r,e){let t=r[e++];if(t<128)return{length:t,index:e};let s=t&127;if(s>4)throw K("bad length",r);t=0;for(let i=0;i<s;i++)t=t<<8|r[e++];return{length:t,index:e}}function Fr(r,e){if(r[e++]!==6)throw K("non-OID data",r);let{length:t,index:s}=nt(r,e);e=s;let i=e+t,n=r[e++],a=(n/40>>0)+"."+n%40;for(;e<i;){let o=0;for(;e<i;){let l=r[e++];if(o=o<<7|l&127,l<128)break}a+="."+o}return{oid:a,index:e}}function ge(r,e){if(r[e++]!==48)throw K("non-sequence data",r);return nt(r,e)}function Rn(r,e){e===void 0&&(e=0),e=ge(r,e).index;let{length:t,index:s}=ge(r,e);e=s+t,e=ge(r,e).index;let{oid:i,index:n}=Fr(r,e);switch(i){case"1.2.840.113549.1.1.4":return"MD5";case"1.2.840.113549.1.1.5":return"SHA-1";case"1.2.840.113549.1.1.11":return"SHA-256";case"1.2.840.113549.1.1.12":return"SHA-384";case"1.2.840.113549.1.1.13":return"SHA-512";case"1.2.840.113549.1.1.14":return"SHA-224";case"1.2.840.113549.1.1.15":return"SHA512-224";case"1.2.840.113549.1.1.16":return"SHA512-256";case"1.2.840.10045.4.1":return"SHA-1";case"1.2.840.10045.4.3.1":return"SHA-224";case"1.2.840.10045.4.3.2":return"SHA-256";case"1.2.840.10045.4.3.3":return"SHA-384";case"1.2.840.10045.4.3.4":return"SHA-512";case"1.2.840.113549.1.1.10":{if(e=n,e=ge(r,e).index,r[e++]!==160)throw K("non-tag data",r);e=nt(r,e).index,e=ge(r,e).index;let{oid:a}=Fr(r,e);switch(a){case"1.2.840.113549.2.5":return"MD5";case"1.3.14.3.2.26":return"SHA-1";case"2.16.840.1.101.3.4.2.1":return"SHA-256";case"2.16.840.1.101.3.4.2.2":return"SHA-384";case"2.16.840.1.101.3.4.2.3":return"SHA-512"}throw K("unknown hash OID "+a,r)}case"1.3.101.110":case"1.3.101.112":return"SHA-512";case"1.3.101.111":case"1.3.101.113":throw K("Ed448 certificate channel binding is not currently supported by Postgres")}throw K("unknown OID "+i,r)}Nr.exports={signatureAlgorithmHashFromCertificate:Rn}});var Gr=f((_l,Ur)=>{"use strict";var H=it(),{signatureAlgorithmHashFromCertificate:On}=Qr();function Ln(r){let e=/[\u00A0\u1680\u2000-\u200B\u202F\u205F\u3000]/g,t=/[\u00AD\u034F\u1806\u180B\u180C\u180D\u200C\u200D\u2060\uFE00-\uFE0F\uFEFF]/g;return r.replace(e," ").replace(t,"").normalize("NFKC")}var at=1e5;function Dn(r,e,t=at){let s=["SCRAM-SHA-256"];e&&s.unshift("SCRAM-SHA-256-PLUS");let i=s.find(o=>r.includes(o));if(!i)throw new Error("SASL: Only mechanism(s) "+s.join(" and ")+" are supported");if(i==="SCRAM-SHA-256-PLUS"&&typeof e.getPeerCertificate!="function")throw new Error("SASL: Mechanism SCRAM-SHA-256-PLUS requires a certificate");let n=H.randomBytes(18).toString("base64");return{mechanism:i,clientNonce:n,response:(i==="SCRAM-SHA-256-PLUS"?"p=tls-server-end-point":e?"y":"n")+",,n=*,r="+n,message:"SASLInitialResponse",scramMaxIterations:t}}async function Bn(r,e,t,s){if(r.message!=="SASLInitialResponse")throw new Error("SASL: Last message was not SASLInitialResponse");if(typeof e!="string")throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");if(e==="")throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a non-empty string");if(typeof t!="string")throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");let i=Nn(t);if(i.nonce.startsWith(r.clientNonce)){if(i.nonce.length===r.clientNonce.length)throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short")}else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");let n=typeof r.scramMaxIterations=="number"?r.scramMaxIterations:at;if(n!==0&&i.iteration>n)throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration count "+i.iteration+" exceeds scramMaxIterations of "+n);let a="n=*,r="+r.clientNonce,o="r="+i.nonce+",s="+i.salt+",i="+i.iteration,l=s?"eSws":"biws";if(r.mechanism==="SCRAM-SHA-256-PLUS"){let _=s.getPeerCertificate().raw,v=On(_);(v==="MD5"||v==="SHA-1")&&(v="SHA-256");let F=await H.hashByName(v,_);l=Buffer.concat([Buffer.from("p=tls-server-end-point,,"),Buffer.from(F)]).toString("base64")}let c="c="+l+",r="+i.nonce,d=a+","+o+","+c,h=Buffer.from(i.salt,"base64"),m=await H.deriveKey(Ln(e),h,i.iteration),w=await H.hmacSha256(m,"Client Key"),q=await H.sha256(w),u=await H.hmacSha256(q,d),g=jn(Buffer.from(w),Buffer.from(u)).toString("base64"),E=await H.hmacSha256(m,"Server Key"),B=await H.hmacSha256(E,d);r.message="SASLResponse",r.serverSignature=Buffer.from(B).toString("base64"),r.response=c+",p="+g}function zn(r,e){if(r.message!=="SASLResponse")throw new Error("SASL: Last message was not SASLResponse");if(typeof e!="string")throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");let{serverSignature:t}=Qn(e);if(t!==r.serverSignature)throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match")}function Fn(r){if(typeof r!="string")throw new TypeError("SASL: text must be a string");return r.split("").map((e,t)=>r.charCodeAt(t)).every(e=>e>=33&&e<=43||e>=45&&e<=126)}function jr(r){return/^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(r)}function Hr(r){if(typeof r!="string")throw new TypeError("SASL: attribute pairs text must be a string");return new Map(r.split(",").map(e=>{if(!/^.=/.test(e))throw new Error("SASL: Invalid attribute pair entry");let t=e[0],s=e.substring(2);return[t,s]}))}function Nn(r){let e=Hr(r),t=e.get("r");if(t){if(!Fn(t))throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters")}else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");let s=e.get("s");if(s){if(!jr(s))throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64")}else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");let i=e.get("i");if(i){if(!/^[1-9][0-9]*$/.test(i))throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count")}else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");let n=parseInt(i,10);return{nonce:t,salt:s,iteration:n}}function Qn(r){let e=Hr(r),t=e.get("e"),s=e.get("v");if(t)throw new Error(`SASL: SCRAM-SERVER-FINAL-MESSAGE: server returned error: "${t}"`);if(s){if(!jr(s))throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64")}else throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");return{serverSignature:s}}function jn(r,e){if(!Buffer.isBuffer(r))throw new TypeError("first argument must be a Buffer");if(!Buffer.isBuffer(e))throw new TypeError("second argument must be a Buffer");if(r.length!==e.length)throw new Error("Buffer lengths must match");if(r.length===0)throw new Error("Buffers cannot be empty");return Buffer.from(r.map((t,s)=>r[s]^e[s]))}Ur.exports={startSession:Dn,continueSession:Bn,finalizeSession:zn,DEFAULT_MAX_SCRAM_ITERATIONS:at}});var Ce=f((El,Wr)=>{"use strict";var Hn=fe();function Ee(r){this._types=r||Hn,this.text={},this.binary={}}Ee.prototype.getOverrides=function(r){switch(r){case"text":return this.text;case"binary":return this.binary;default:return{}}};Ee.prototype.setTypeParser=function(r,e,t){typeof e=="function"&&(t=e,e="text"),this.getOverrides(e)[r]=t};Ee.prototype.getTypeParser=function(r,e){return e=e||"text",this.getOverrides(e)[r]||this._types.getTypeParser(r,e)};Wr.exports=Ee});var Kr=f((Cl,Yr)=>{"use strict";function se(r,e={}){if(r.charAt(0)==="/"){let l=r.split(" ");return{host:l[0],database:l[1]}}let t=Object.create(null),s,i=!1;/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(r)&&(r=encodeURI(r).replace(/%25(\d\d)/g,"%$1"));try{try{s=new URL(r,"postgres://base")}catch{s=new URL(r.replace("@/","@___DUMMY___/"),"postgres://base"),i=!0}}catch(l){throw l.input&&(l.input="*****REDACTED*****"),l}for(let l of s.searchParams.entries())t[l[0]]=l[1];if(t.user=t.user||decodeURIComponent(s.username),t.password=t.password||decodeURIComponent(s.password),s.protocol=="socket:")return t.host=decodeURI(s.pathname),t.database=s.searchParams.get("db"),t.client_encoding=s.searchParams.get("encoding"),t;let n=(i?"":s.hostname).replace(/^\[(.+)\]$/,"$1");t.host?n&&/^%2f/i.test(n)&&(s.pathname=n+s.pathname):t.host=decodeURIComponent(n),t.port||(t.port=s.port);let a=s.pathname.slice(1)||null;t.database=a?decodeURI(a):null,(t.ssl==="true"||t.ssl==="1")&&(t.ssl=!0),t.ssl==="0"&&(t.ssl=!1),(t.sslcert||t.sslkey||t.sslrootcert||t.sslmode)&&(t.ssl={}),t.sslnegotiation==="direct"&&t.ssl===void 0&&(t.ssl=!0);let o=t.sslcert||t.sslkey||t.sslrootcert?x("fs"):null;if(t.sslcert&&(t.ssl.cert=o.readFileSync(t.sslcert).toString()),t.sslkey&&(t.ssl.key=o.readFileSync(t.sslkey).toString()),t.sslrootcert&&(t.ssl.ca=o.readFileSync(t.sslrootcert).toString()),e.useLibpqCompat&&t.uselibpqcompat)throw new Error("Both useLibpqCompat and uselibpqcompat are set. Please use only one of them.");if(t.uselibpqcompat==="true"||e.useLibpqCompat)switch(t.sslmode){case"disable":{t.ssl=!1;break}case"prefer":{t.ssl.rejectUnauthorized=!1;break}case"require":{t.sslrootcert?t.ssl.checkServerIdentity=function(){}:t.ssl.rejectUnauthorized=!1;break}case"verify-ca":{if(!t.ssl.ca)throw new Error("SECURITY WARNING: Using sslmode=verify-ca requires specifying a CA with sslrootcert. If a public CA is used, verify-ca allows connections to a server that somebody else may have registered with the CA, making you vulnerable to Man-in-the-Middle attacks. Either specify a custom CA certificate with sslrootcert parameter or use sslmode=verify-full for proper security.");t.ssl.checkServerIdentity=function(){};break}case"verify-full":break}else switch(t.sslmode){case"disable":{t.ssl=!1;break}case"prefer":case"require":case"verify-ca":case"verify-full":{t.sslmode!=="verify-full"&&ot(t.sslmode);break}case"no-verify":{t.ssl.rejectUnauthorized=!1;break}}return t}function Un(r){return Object.entries(r).reduce((t,[s,i])=>(i!=null&&(t[s]=i),t),Object.create(null))}function Vr(r){return Object.entries(r).reduce((t,[s,i])=>{if(s==="ssl"){let n=i;typeof n=="boolean"&&(t[s]=n),typeof n=="object"&&(t[s]=Un(n))}else if(i!=null)if(s==="port"){if(i!==""){let n=parseInt(i,10);if(isNaN(n))throw new Error(`Invalid ${s}: ${i}`);t[s]=n}}else t[s]=i;return t},Object.create(null))}function Gn(r){return Vr(se(r))}function ot(r){!ot.warned&&typeof process<"u"&&process.emitWarning&&(ot.warned=!0,process.emitWarning(`SECURITY WARNING: The SSL modes 'prefer', 'require', and 'verify-ca' are treated as aliases for 'verify-full'.
In the next major version (pg-connection-string v3.0.0 and pg v9.0.0), these modes will adopt standard libpq semantics, which have weaker security guarantees.

To prepare for this change:
- If you want the current behavior, explicitly use 'sslmode=verify-full'
- If you want libpq compatibility now, use 'uselibpqcompat=true&sslmode=${r}'

See https://www.postgresql.org/docs/current/libpq-ssl.html for libpq SSL mode definitions.`))}Yr.exports=se;se.parse=se;se.toClientConfig=Vr;se.parseIntoClientConfig=Gn});var ct=f(($l,Zr)=>{"use strict";var Wn=x("dns"),Jr=me(),Xr=Kr().parse,A=function(r,e,t){return e[r]?e[r]:(t===void 0?t=process.env["PG"+r.toUpperCase()]:t===!1||(t=process.env[t]),t||Jr[r])},Vn=function(){switch(process.env.PGSSLMODE){case"disable":return!1;case"prefer":case"require":case"verify-ca":case"verify-full":return!0;case"no-verify":return{rejectUnauthorized:!1}}return Jr.ssl},ie=function(r){return"'"+(""+r).replace(/\\/g,"\\\\").replace(/'/g,"\\'")+"'"},R=function(r,e,t){let s=e[t];s!=null&&r.push(t+"="+ie(s))},lt=class{constructor(e){if(e=typeof e=="string"?Xr(e):e||{},e.connectionString&&(e=Object.assign({},e,Xr(e.connectionString))),this.user=A("user",e),this.database=A("database",e),this.database===void 0&&(this.database=this.user),this.port=parseInt(A("port",e),10),this.host=A("host",e),Object.defineProperty(this,"password",{configurable:!0,enumerable:!1,writable:!0,value:A("password",e)}),this.binary=A("binary",e),this.options=A("options",e),this.ssl=typeof e.ssl>"u"?Vn():e.ssl,typeof this.ssl=="string"&&this.ssl==="true"&&(this.ssl=!0),this.ssl==="no-verify"&&(this.ssl={rejectUnauthorized:!1}),this.ssl&&this.ssl.key&&Object.defineProperty(this.ssl,"key",{enumerable:!1}),this.sslnegotiation=A("sslnegotiation",e,"PGSSLNEGOTIATION"),this.sslnegotiation!==void 0&&this.sslnegotiation!=="postgres"&&this.sslnegotiation!=="direct")throw new Error(`Invalid sslnegotiation value: "${this.sslnegotiation}". Valid values are "postgres" and "direct".`);if(this.sslnegotiation==="direct"&&!this.ssl)throw new Error("sslnegotiation=direct requires SSL to be enabled");this.client_encoding=A("client_encoding",e),this.replication=A("replication",e),this.isDomainSocket=!(this.host||"").indexOf("/"),this.application_name=A("application_name",e,"PGAPPNAME"),this.fallback_application_name=A("fallback_application_name",e,!1),this.statement_timeout=A("statement_timeout",e,!1),this.lock_timeout=A("lock_timeout",e,!1),this.idle_in_transaction_session_timeout=A("idle_in_transaction_session_timeout",e,!1),this.query_timeout=A("query_timeout",e,!1),e.connectionTimeoutMillis===void 0?this.connect_timeout=process.env.PGCONNECT_TIMEOUT||0:this.connect_timeout=Math.floor(e.connectionTimeoutMillis/1e3),e.keepAlive===!1?this.keepalives=0:e.keepAlive===!0&&(this.keepalives=1),typeof e.keepAliveInitialDelayMillis=="number"&&(this.keepalives_idle=Math.floor(e.keepAliveInitialDelayMillis/1e3))}getLibpqConnectionString(e){let t=[];R(t,this,"user"),R(t,this,"password"),R(t,this,"port"),R(t,this,"application_name"),R(t,this,"fallback_application_name"),R(t,this,"connect_timeout"),R(t,this,"options");let s=typeof this.ssl=="object"?this.ssl:this.ssl?{sslmode:this.ssl}:{};if(R(t,s,"sslmode"),R(t,s,"sslca"),R(t,s,"sslkey"),R(t,s,"sslcert"),R(t,s,"sslrootcert"),R(t,this,"sslnegotiation"),this.database&&t.push("dbname="+ie(this.database)),this.replication&&t.push("replication="+ie(this.replication)),this.host&&t.push("host="+ie(this.host)),this.isDomainSocket)return e(null,t.join(" "));this.client_encoding&&t.push("client_encoding="+ie(this.client_encoding)),Wn.lookup(this.host,function(i,n){return i?e(i,null):(t.push("hostaddr="+ie(n)),e(null,t.join(" ")))})}};Zr.exports=lt});var ut=f((Al,ts)=>{"use strict";var Yn=fe(),es=/^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/,dt=class{constructor(e,t){this.command=null,this.rowCount=null,this.oid=null,this.rows=[],this.fields=[],this._parsers=void 0,this._types=t,this.RowCtor=null,this.rowAsArray=e==="array",this.rowAsArray&&(this.parseRow=this._parseRowAsArray),this._prebuiltEmptyResultObject=null}addCommandComplete(e){let t;e.text?t=es.exec(e.text):t=es.exec(e.command),t&&(this.command=t[1],t[3]?(this.oid=parseInt(t[2],10),this.rowCount=parseInt(t[3],10)):t[2]&&(this.rowCount=parseInt(t[2],10)))}_parseRowAsArray(e){let t=new Array(e.length);for(let s=0,i=e.length;s<i;s++){let n=e[s];n!==null?t[s]=this._parsers[s](n):t[s]=null}return t}parseRow(e){let t={...this._prebuiltEmptyResultObject};for(let s=0,i=e.length;s<i;s++){let n=e[s],a=this.fields[s].name;if(n!==null){let o=this.fields[s].format==="binary"?Buffer.from(n):n;t[a]=this._parsers[s](o)}else t[a]=null}return t}addRow(e){this.rows.push(e)}addFields(e){this.fields=e,this.fields.length&&(this._parsers=new Array(e.length));let t=Object.create(null);for(let s=0;s<e.length;s++){let i=e[s];t[i.name]=null,this._types?this._parsers[s]=this._types.getTypeParser(i.dataTypeID,i.format||"text"):this._parsers[s]=Yn.getTypeParser(i.dataTypeID,i.format||"text")}this._prebuiltEmptyResultObject={...t}}};ts.exports=dt});var ns=f((Tl,is)=>{"use strict";var{EventEmitter:Kn}=x("events"),rs=ut(),ss=V(),pt=class extends Kn{constructor(e,t,s){super(),e=ss.normalizeQueryConfig(e,t,s),this.text=e.text,this.values=e.values,this.rows=e.rows,this.types=e.types,this.name=e.name,this.queryMode=e.queryMode,this.binary=e.binary,this.portal=e.portal||"",this.callback=e.callback,this._rowMode=e.rowMode,process.domain&&e.callback&&(this.callback=process.domain.bind(e.callback)),this._result=new rs(this._rowMode,this.types),this._results=this._result,this._canceledDueToError=!1}requiresPreparation(){return this.queryMode==="extended"||this.name||this.rows?!0:!this.text||!this.values?!1:this.values.length>0}_checkForMultirow(){this._result.command&&(Array.isArray(this._results)||(this._results=[this._result]),this._result=new rs(this._rowMode,this._result._types),this._results.push(this._result))}handleRowDescription(e){this._checkForMultirow(),this._result.addFields(e.fields),this._accumulateRows=this.callback||!this.listeners("row").length}handleDataRow(e){let t;if(!this._canceledDueToError){try{t=this._result.parseRow(e.fields)}catch(s){this._canceledDueToError=s;return}this.emit("row",t,this._result),this._accumulateRows&&this._result.addRow(t)}}handleCommandComplete(e,t){this._checkForMultirow(),this._result.addCommandComplete(e),this.rows&&t.sync()}handleEmptyQuery(e){this.rows&&e.sync()}handleError(e,t){if(this._canceledDueToError&&(e=this._canceledDueToError,this._canceledDueToError=!1),this.callback)return this.callback(e);this.emit("error",e)}handleReadyForQuery(e){if(this._canceledDueToError)return this.handleError(this._canceledDueToError,e);if(this.callback)try{this.callback(null,this._results)}catch(t){process.nextTick(()=>{throw t})}this.emit("end",this._results)}submit(e){if(typeof this.text!="string"&&typeof this.name!="string")return new Error("A query must have either text or a name. Supplying neither is unsupported.");let t=e.parsedStatements[this.name]||e.submittedNamedStatements[this.name];if(this.text&&t&&this.text!==t)return new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);if(this.values&&!Array.isArray(this.values))return new Error("Query values must be an array");if(this.requiresPreparation()){e.stream.cork&&e.stream.cork();try{this.prepare(e)}finally{e.stream.uncork&&e.stream.uncork()}}else e.query(this.text);return null}hasBeenParsed(e){return this.name&&(e.parsedStatements[this.name]!==void 0||e.submittedNamedStatements[this.name]!==void 0)}handlePortalSuspended(e){this._getRows(e,this.rows)}_getRows(e,t){e.execute({portal:this.portal,rows:t}),t?e.flush():e.sync()}prepare(e){this.hasBeenParsed(e)||(e.parse({text:this.text,name:this.name,types:this.types}),this.name&&(e.submittedNamedStatements[this.name]=this.text));try{e.bind({portal:this.portal,statement:this.name,values:this.values,binary:this.binary,valueMapper:ss.prepareValue})}catch(t){e.close({type:"S",name:this.name}),e.sync(),this.handleError(t,e);return}e.describe({type:"P",name:this.portal||""}),this._getRows(e,this.rows)}handleCopyInResponse(e){e.sendCopyFail("No source stream defined")}handleCopyData(e,t){}};is.exports=pt});var $t=f(p=>{"use strict";Object.defineProperty(p,"__esModule",{value:!0});p.NoticeMessage=p.DataRowMessage=p.CommandCompleteMessage=p.ReadyForQueryMessage=p.NotificationResponseMessage=p.BackendKeyDataMessage=p.AuthenticationMD5Password=p.ParameterStatusMessage=p.ParameterDescriptionMessage=p.RowDescriptionMessage=p.Field=p.CopyResponse=p.CopyDataMessage=p.DatabaseError=p.copyDone=p.emptyQuery=p.replicationStart=p.portalSuspended=p.noData=p.closeComplete=p.bindComplete=p.parseComplete=void 0;p.parseComplete={name:"parseComplete",length:5};p.bindComplete={name:"bindComplete",length:5};p.closeComplete={name:"closeComplete",length:5};p.noData={name:"noData",length:5};p.portalSuspended={name:"portalSuspended",length:5};p.replicationStart={name:"replicationStart",length:4};p.emptyQuery={name:"emptyQuery",length:4};p.copyDone={name:"copyDone",length:4};var ht=class extends Error{constructor(e,t,s){super(e),this.length=t,this.name=s}};p.DatabaseError=ht;var ft=class{constructor(e,t){this.length=e,this.chunk=t,this.name="copyData"}};p.CopyDataMessage=ft;var mt=class{constructor(e,t,s,i){this.length=e,this.name=t,this.binary=s,this.columnTypes=new Array(i)}};p.CopyResponse=mt;var gt=class{constructor(e,t,s,i,n,a,o){this.name=e,this.tableID=t,this.columnID=s,this.dataTypeID=i,this.dataTypeSize=n,this.dataTypeModifier=a,this.format=o}};p.Field=gt;var bt=class{constructor(e,t){this.length=e,this.fieldCount=t,this.name="rowDescription",this.fields=new Array(this.fieldCount)}};p.RowDescriptionMessage=bt;var yt=class{constructor(e,t){this.length=e,this.parameterCount=t,this.name="parameterDescription",this.dataTypeIDs=new Array(this.parameterCount)}};p.ParameterDescriptionMessage=yt;var vt=class{constructor(e,t,s){this.length=e,this.parameterName=t,this.parameterValue=s,this.name="parameterStatus"}};p.ParameterStatusMessage=vt;var xt=class{constructor(e,t){this.length=e,this.salt=t,this.name="authenticationMD5Password"}};p.AuthenticationMD5Password=xt;var wt=class{constructor(e,t,s){this.length=e,this.processID=t,this.secretKey=s,this.name="backendKeyData"}};p.BackendKeyDataMessage=wt;var St=class{constructor(e,t,s,i){this.length=e,this.processId=t,this.channel=s,this.payload=i,this.name="notification"}};p.NotificationResponseMessage=St;var kt=class{constructor(e,t){this.length=e,this.status=t,this.name="readyForQuery"}};p.ReadyForQueryMessage=kt;var _t=class{constructor(e,t){this.length=e,this.text=t,this.name="commandComplete"}};p.CommandCompleteMessage=_t;var Et=class{constructor(e,t){this.length=e,this.fields=t,this.name="dataRow",this.fieldCount=t.length}};p.DataRowMessage=Et;var Ct=class{constructor(e,t){this.length=e,this.message=t,this.name="notice"}};p.NoticeMessage=Ct});var as=f($e=>{"use strict";Object.defineProperty($e,"__esModule",{value:!0});$e.Writer=void 0;var At=class{constructor(e=256){this.size=e,this.offset=5,this.headerPosition=0,this.buffer=Buffer.allocUnsafe(e)}ensure(e){if(this.buffer.length-this.offset<e){let s=this.buffer,i=s.length+(s.length>>1)+e;this.buffer=Buffer.allocUnsafe(i),s.copy(this.buffer,0,0,this.offset)}}addInt32(e){return this.ensure(4),this.buffer[this.offset++]=e>>>24&255,this.buffer[this.offset++]=e>>>16&255,this.buffer[this.offset++]=e>>>8&255,this.buffer[this.offset++]=e>>>0&255,this}addInt16(e){return this.ensure(2),this.buffer[this.offset++]=e>>>8&255,this.buffer[this.offset++]=e>>>0&255,this}addCString(e){if(!e)this.ensure(1);else{let t=Buffer.byteLength(e);this.ensure(t+1),this.buffer.write(e,this.offset,"utf-8"),this.offset+=t}return this.buffer[this.offset++]=0,this}addString(e=""){let t=Buffer.byteLength(e);return this.ensure(t),this.buffer.write(e,this.offset),this.offset+=t,this}addInt32PrefixedString(e){let t=Buffer.byteLength(e);this.ensure(4+t);let s=this.buffer,i=this.offset;return s[i++]=t>>>24&255,s[i++]=t>>>16&255,s[i++]=t>>>8&255,s[i++]=t>>>0&255,s.write(e,i,"utf-8"),this.offset=i+t,this}add(e){return this.ensure(e.length),e.copy(this.buffer,this.offset),this.offset+=e.length,this}reserveUnsafe(e){let t=this.offset;return this.ensure(e),this.offset+=e,t}join(e){if(e){this.buffer[this.headerPosition]=e;let t=this.offset-(this.headerPosition+1);this.buffer.writeInt32BE(t,this.headerPosition+1)}return this.buffer.slice(e?0:5,this.offset)}flush(e){let t=this.join(e);return this.offset=5,this.headerPosition=0,this.buffer=Buffer.allocUnsafe(this.size),t}clear(){this.offset=5,this.headerPosition=0}};$e.Writer=At});var cs=f(Te=>{"use strict";Object.defineProperty(Te,"__esModule",{value:!0});Te.serialize=void 0;var os=as(),y=new os.Writer,Xn=r=>{y.addInt16(3).addInt16(0);for(let s of Object.keys(r))y.addCString(s).addCString(r[s]);y.addCString("client_encoding").addCString("UTF8");let e=y.addCString("").flush(),t=e.length+4;return new os.Writer().addInt32(t).add(e).flush()},Jn=()=>{let r=Buffer.allocUnsafe(8);return r.writeInt32BE(8,0),r.writeInt32BE(80877103,4),r},Zn=r=>y.addCString(r).flush(112),ea=function(r,e){return y.addCString(r).addInt32PrefixedString(e),y.flush(112)},ta=function(r){return y.addString(r).flush(112)},ra=r=>y.addCString(r).flush(81),ls=[],sa=r=>{let e=r.name||"";e.length>63&&(console.error("Warning! Postgres only supports 63 characters for query names."),console.error("You supplied %s (%s)",e,e.length),console.error("This can cause conflicts and silent errors executing queries"));let t=r.types||ls,s=t.length,i=y.addCString(e).addCString(r.text).addInt16(s);for(let n=0;n<s;n++)i.addInt32(t[n]);return y.flush(80)},ia=function(r,e,t){let s=r.length;for(let i=0;i<s;i++){let n=e?e(r[i],i):r[i],a=0;n==null?y.addInt32(-1):n instanceof Buffer?(a=1,y.addInt32(n.length),y.add(n)):y.addInt32PrefixedString(n);let o=y.buffer;o[t++]=0,o[t++]=a}},na=(r={})=>{let e=r.portal||"",t=r.statement||"",s=r.binary||!1,i=r.values||ls,n=i.length;y.addCString(e).addCString(t),y.addInt16(n);let a=y.reserveUnsafe(n*2);y.addInt16(n);try{ia(i,r.valueMapper,a)}catch(o){throw y.clear(),o}return y.addInt16(1),y.addInt16(s?1:0),y.flush(66)},aa=Buffer.from([69,0,0,0,9,0,0,0,0,0]),oa=r=>{if(!r||!r.portal&&!r.rows)return aa;let e=r.portal||"",t=r.rows||0,s=Buffer.byteLength(e),i=4+s+1+4,n=Buffer.allocUnsafe(1+i);return n[0]=69,n.writeInt32BE(i,1),n.write(e,5,"utf-8"),n[s+5]=0,n.writeUInt32BE(t,n.length-4),n},la=(r,e)=>{let t=Buffer.allocUnsafe(16);return t.writeInt32BE(16,0),t.writeInt16BE(1234,4),t.writeInt16BE(5678,6),t.writeInt32BE(r,8),t.writeInt32BE(e,12),t},Tt=(r,e)=>{let s=4+Buffer.byteLength(e)+1,i=Buffer.allocUnsafe(1+s);return i[0]=r,i.writeInt32BE(s,1),i.write(e,5,"utf-8"),i[s]=0,i},ca=y.addCString("P").flush(68),da=y.addCString("S").flush(68),ua=r=>r.name?Tt(68,`${r.type}${r.name||""}`):r.type==="P"?ca:da,pa=r=>{let e=`${r.type}${r.name||""}`;return Tt(67,e)},ha=r=>y.add(r).flush(100),fa=r=>Tt(102,r),Ae=r=>Buffer.from([r,0,0,0,4]),ma=Ae(72),ga=Ae(83),ba=Ae(88),ya=Ae(99),va={startup:Xn,password:Zn,requestSsl:Jn,sendSASLInitialResponseMessage:ea,sendSCRAMClientFinalMessage:ta,query:ra,parse:sa,bind:na,execute:oa,describe:ua,close:pa,flush:()=>ma,sync:()=>ga,end:()=>ba,copyData:ha,copyDone:()=>ya,copyFail:fa,cancel:la};Te.serialize=va});var ds=f(Pe=>{"use strict";Object.defineProperty(Pe,"__esModule",{value:!0});Pe.BufferReader=void 0;var Pt=class{constructor(e=0){this.offset=e,this.buffer=Buffer.allocUnsafe(0),this.encoding="utf-8"}setBuffer(e,t){this.offset=e,this.buffer=t}int16(){let e=this.buffer.readInt16BE(this.offset);return this.offset+=2,e}byte(){let e=this.buffer[this.offset];return this.offset++,e}int32(){let e=this.buffer.readInt32BE(this.offset);return this.offset+=4,e}uint32(){let e=this.buffer.readUInt32BE(this.offset);return this.offset+=4,e}string(e){let t=this.buffer.toString(this.encoding,this.offset,this.offset+e);return this.offset+=e,t}cstring(){let e=this.offset,t=e;for(;this.buffer[t++];);return this.offset=t,this.buffer.toString(this.encoding,e,t-1)}bytes(e){let t=this.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}};Pe.BufferReader=Pt});var fs=f(Ie=>{"use strict";Object.defineProperty(Ie,"__esModule",{value:!0});Ie.Parser=void 0;var k=$t(),xa=ds(),Mt=1,wa=4,us=Mt+wa,O=-1,It=Buffer.allocUnsafe(0),qt=class{constructor(e){if(this.buffer=It,this.bufferLength=0,this.bufferOffset=0,this.reader=new xa.BufferReader,e?.mode==="binary")throw new Error("Binary mode not supported yet");this.mode=e?.mode||"text"}parse(e,t){this.mergeBuffer(e);let s=this.bufferOffset+this.bufferLength,i=this.bufferOffset;for(;i+us<=s;){let n=this.buffer[i],a=this.buffer.readUInt32BE(i+Mt),o=Mt+a;if(o+i<=s){let l=this.handlePacket(i+us,n,a,this.buffer);t(l),i+=o}else break}i===s?(this.buffer=It,this.bufferLength=0,this.bufferOffset=0):(this.bufferLength=s-i,this.bufferOffset=i)}mergeBuffer(e){if(this.bufferLength>0){let t=this.bufferLength+e.byteLength;if(t+this.bufferOffset>this.buffer.byteLength){let i;if(t<=this.buffer.byteLength&&this.bufferOffset>=this.bufferLength)i=this.buffer;else{let n=this.buffer.byteLength*2;for(;t>=n;)n*=2;i=Buffer.allocUnsafe(n)}this.buffer.copy(i,0,this.bufferOffset,this.bufferOffset+this.bufferLength),this.buffer=i,this.bufferOffset=0}e.copy(this.buffer,this.bufferOffset+this.bufferLength),this.bufferLength=t}else this.buffer=e,this.bufferOffset=0,this.bufferLength=e.byteLength}handlePacket(e,t,s,i){let{reader:n}=this;n.setBuffer(e,i);let a;switch(t){case 50:a=k.bindComplete;break;case 49:a=k.parseComplete;break;case 51:a=k.closeComplete;break;case 110:a=k.noData;break;case 115:a=k.portalSuspended;break;case 99:a=k.copyDone;break;case 87:a=k.replicationStart;break;case 73:a=k.emptyQuery;break;case 68:a=Ia(n);break;case 67:a=ka(n);break;case 90:a=Sa(n);break;case 65:a=$a(n);break;case 82:a=Ra(n,s);break;case 83:a=Ma(n);break;case 75:a=qa(n);break;case 69:a=ps(n,"error");break;case 78:a=ps(n,"notice");break;case 84:a=Aa(n);break;case 116:a=Pa(n);break;case 71:a=Ea(n);break;case 72:a=Ca(n);break;case 100:a=_a(n,s);break;default:return new k.DatabaseError("received invalid response: "+t.toString(16),s,"error")}return n.setBuffer(0,It),a.length=s,a}};Ie.Parser=qt;var Sa=r=>{let e=r.string(1);return new k.ReadyForQueryMessage(O,e)},ka=r=>{let e=r.cstring();return new k.CommandCompleteMessage(O,e)},_a=(r,e)=>{let t=r.bytes(e-4);return new k.CopyDataMessage(O,t)},Ea=r=>hs(r,"copyInResponse"),Ca=r=>hs(r,"copyOutResponse"),hs=(r,e)=>{let t=r.byte()!==0,s=r.int16(),i=new k.CopyResponse(O,e,t,s);for(let n=0;n<s;n++)i.columnTypes[n]=r.int16();return i},$a=r=>{let e=r.int32(),t=r.cstring(),s=r.cstring();return new k.NotificationResponseMessage(O,e,t,s)},Aa=r=>{let e=r.int16(),t=new k.RowDescriptionMessage(O,e);for(let s=0;s<e;s++)t.fields[s]=Ta(r);return t},Ta=r=>{let e=r.cstring(),t=r.uint32(),s=r.int16(),i=r.uint32(),n=r.int16(),a=r.int32(),o=r.int16()===0?"text":"binary";return new k.Field(e,t,s,i,n,a,o)},Pa=r=>{let e=r.int16(),t=new k.ParameterDescriptionMessage(O,e);for(let s=0;s<e;s++)t.dataTypeIDs[s]=r.uint32();return t},Ia=r=>{let e=r.int16(),t=new Array(e);for(let s=0;s<e;s++){let i=r.int32();t[s]=i===-1?null:r.string(i)}return new k.DataRowMessage(O,t)},Ma=r=>{let e=r.cstring(),t=r.cstring();return new k.ParameterStatusMessage(O,e,t)},qa=r=>{let e=r.int32(),t=r.int32();return new k.BackendKeyDataMessage(O,e,t)},Ra=(r,e)=>{let t=r.int32(),s={name:"authenticationOk",length:e};switch(t){case 0:break;case 3:s.length===8&&(s.name="authenticationCleartextPassword");break;case 5:if(s.length===12){s.name="authenticationMD5Password";let i=r.bytes(4);return new k.AuthenticationMD5Password(O,i)}break;case 10:{s.name="authenticationSASL",s.mechanisms=[];let i;do i=r.cstring(),i&&s.mechanisms.push(i);while(i)}break;case 11:s.name="authenticationSASLContinue",s.data=r.string(e-8);break;case 12:s.name="authenticationSASLFinal",s.data=r.string(e-8);break;default:throw new Error("Unknown authenticationOk message type "+t)}return s},ps=(r,e)=>{let t={},s=r.string(1);for(;s!=="\0";)t[s]=r.cstring(),s=r.string(1);let i=t.M,n=e==="notice"?new k.NoticeMessage(O,i):new k.DatabaseError(i,O,e);return n.severity=t.S,n.code=t.C,n.detail=t.D,n.hint=t.H,n.position=t.P,n.internalPosition=t.p,n.internalQuery=t.q,n.where=t.W,n.schema=t.s,n.table=t.t,n.column=t.c,n.dataType=t.d,n.constraint=t.n,n.file=t.F,n.line=t.L,n.routine=t.R,n}});var Rt=f(X=>{"use strict";Object.defineProperty(X,"__esModule",{value:!0});X.DatabaseError=X.serialize=void 0;X.parse=Ba;var Oa=$t();Object.defineProperty(X,"DatabaseError",{enumerable:!0,get:function(){return Oa.DatabaseError}});var La=cs();Object.defineProperty(X,"serialize",{enumerable:!0,get:function(){return La.serialize}});var Da=fs();function Ba(r,e){let t=new Da.Parser;return r.on("data",s=>t.parse(s,e)),new Promise(s=>r.on("end",()=>s()))}});var ms=f(Ot=>{"use strict";Object.defineProperty(Ot,"__esModule",{value:!0});Ot.default={}});var bs=f((Dl,gs)=>{var{getStream:za,getSecureStream:Fa}=Ha();gs.exports={getStream:za,getSecureStream:Fa};function Na(){function r(t){let s=x("net");return new s.Socket}function e(t){return x("tls").connect(t)}return{getStream:r,getSecureStream:e}}function Qa(){function r(t){let{CloudflareSocket:s}=ms();return new s(t)}function e(t){return t.socket.startTls(t),t.socket}return{getStream:r,getSecureStream:e}}function ja(){if(typeof navigator=="object"&&navigator!==null&&typeof navigator.userAgent=="string")return navigator.userAgent==="Cloudflare-Workers";if(typeof Response=="function"){let r=new Response(null,{cf:{thing:!0}});if(typeof r.cf=="object"&&r.cf!==null&&r.cf.thing)return!0}return!1}function Ha(){return ja()?Qa():Na()}});var Dt=f((Bl,vs)=>{"use strict";var Ua=x("events").EventEmitter,{parse:Ga,serialize:C}=Rt(),ys=bs(),{getStream:Wa}=ys,Va=C.flush(),Ya=C.sync(),Ka=C.end(),Lt=class extends Ua{constructor(e){super(),e=e||{},this.stream=e.stream||Wa(e.ssl),typeof this.stream=="function"&&(this.stream=this.stream(e)),this._keepAlive=e.keepAlive,this._keepAliveInitialDelayMillis=e.keepAliveInitialDelayMillis,this.parsedStatements={},this.submittedNamedStatements={},this.ssl=e.ssl||!1,this.sslNegotiation=e.sslNegotiation||"postgres",this._ending=!1,this._emitMessage=!1;let t=this;this.on("newListener",function(s){s==="message"&&(t._emitMessage=!0)})}connect(e,t){let s=this;this._connecting=!0,this.stream.setNoDelay(!0),this.stream.connect(e,t),this.stream.once("connect",function(){s._keepAlive&&s.stream.setKeepAlive(!0,s._keepAliveInitialDelayMillis),s.emit("connect")});let i=function(n){s._ending&&(n.code==="ECONNRESET"||n.code==="EPIPE")||s.emit("error",n)};if(this.stream.on("error",i),this.stream.on("close",function(){s.emit("end")}),!this.ssl)return this.attachListeners(this.stream);if(this.sslNegotiation==="direct")return this.stream.once("connect",function(){s.upgradeToSSL(t,i)});this.stream.once("data",function(n){switch(n.toString("utf8")){case"S":break;case"N":return s.stream.end(),s.emit("error",new Error("The server does not support SSL connections"));default:return s.stream.end(),s.emit("error",new Error("There was an error establishing an SSL connection"))}s.upgradeToSSL(t,i)})}upgradeToSSL(e,t){let s=this,i={socket:s.stream,host:e};s.ssl!==!0&&(Object.assign(i,s.ssl),"key"in s.ssl&&(i.key=s.ssl.key)),s.sslNegotiation==="direct"&&(i.ALPNProtocols=["postgresql"]);let n=x("net");n.isIP&&n.isIP(e)===0&&(i.servername=e);try{s.stream=ys.getSecureStream(i)}catch(a){return s.emit("error",a)}s.attachListeners(s.stream),s.stream.on("error",t),s.emit("sslconnect")}attachListeners(e){Ga(e,t=>{let s=t.name==="error"?"errorMessage":t.name;this._emitMessage&&this.emit("message",t),this.emit(s,t)})}requestSsl(){this.stream.write(C.requestSsl())}startup(e){this.stream.write(C.startup(e))}cancel(e,t){this._send(C.cancel(e,t))}password(e){this._send(C.password(e))}sendSASLInitialResponseMessage(e,t){this._send(C.sendSASLInitialResponseMessage(e,t))}sendSCRAMClientFinalMessage(e){this._send(C.sendSCRAMClientFinalMessage(e))}_send(e){return this.stream.writable?this.stream.write(e):!1}query(e){this._send(C.query(e))}parse(e){this._send(C.parse(e))}bind(e){this._send(C.bind(e))}execute(e){this._send(C.execute(e))}flush(){this.stream.writable&&this.stream.write(Va)}sync(){this._send(Ya)}ref(){this.stream.ref()}unref(){this.stream.unref()}end(){if(this._ending=!0,!this._connecting||!this.stream.writable){this.stream.end();return}return this.stream.write(Ka,()=>{this.stream.end()})}close(e){this._send(C.close(e))}describe(e){this._send(C.describe(e))}sendCopyFromChunk(e){this._send(C.copyData(e))}endCopyFrom(){this._send(C.copyDone())}sendCopyFail(e){this._send(C.copyFail(e))}};vs.exports=Lt});var ks=f((zl,Ss)=>{"use strict";var{Transform:Xa}=x("stream"),{StringDecoder:Ja}=x("string_decoder"),U=Symbol("last"),Me=Symbol("decoder");function Za(r,e,t){let s;if(this.overflow){if(s=this[Me].write(r).split(this.matcher),s.length===1)return t();s.shift(),this.overflow=!1}else this[U]+=this[Me].write(r),s=this[U].split(this.matcher);this[U]=s.pop();for(let i=0;i<s.length;i++)try{ws(this,this.mapper(s[i]))}catch(n){return t(n)}if(this.overflow=this[U].length>this.maxLength,this.overflow&&!this.skipOverflow){t(new Error("maximum buffer reached"));return}t()}function eo(r){if(this[U]+=this[Me].end(),this[U])try{ws(this,this.mapper(this[U]))}catch(e){return r(e)}r()}function ws(r,e){e!==void 0&&r.push(e)}function xs(r){return r}function to(r,e,t){switch(r=r||/\r?\n/,e=e||xs,t=t||{},arguments.length){case 1:typeof r=="function"?(e=r,r=/\r?\n/):typeof r=="object"&&!(r instanceof RegExp)&&!r[Symbol.split]&&(t=r,r=/\r?\n/);break;case 2:typeof r=="function"?(t=e,e=r,r=/\r?\n/):typeof e=="object"&&(t=e,e=xs)}t=Object.assign({},t),t.autoDestroy=!0,t.transform=Za,t.flush=eo,t.readableObjectMode=!0;let s=new Xa(t);return s[U]="",s[Me]=new Ja("utf8"),s.matcher=r,s.mapper=e,s.maxLength=t.maxLength,s.skipOverflow=t.skipOverflow||!1,s.overflow=!1,s._destroy=function(i,n){this._writableState.errorEmitted=!1,n(i)},s}Ss.exports=to});var Cs=f((Fl,Q)=>{"use strict";var _s=x("path"),ro=x("stream").Stream,so=ks(),Es=x("util"),io=5432,qe=process.platform==="win32",be=process.stderr,no=56,ao=7,oo=61440,lo=32768;function co(r){return(r&oo)==lo}var ne=["host","port","database","user","password"],Bt=ne.length,uo=ne[Bt-1];function zt(){var r=be instanceof ro&&be.writable===!0;if(r){var e=Array.prototype.slice.call(arguments).concat(`
`);be.write(Es.format.apply(Es,e))}}Object.defineProperty(Q.exports,"isWin",{get:function(){return qe},set:function(r){qe=r}});Q.exports.warnTo=function(r){var e=be;return be=r,e};Q.exports.getFileName=function(r){var e=r||process.env,t=e.PGPASSFILE||(qe?_s.join(e.APPDATA||"./","postgresql","pgpass.conf"):_s.join(e.HOME||"./",".pgpass"));return t};Q.exports.usePgPass=function(r,e){return Object.prototype.hasOwnProperty.call(process.env,"PGPASSWORD")?!1:qe?!0:(e=e||"<unkn>",co(r.mode)?r.mode&(no|ao)?(zt('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less',e),!1):!0:(zt('WARNING: password file "%s" is not a plain file',e),!1))};var po=Q.exports.match=function(r,e){return ne.slice(0,-1).reduce(function(t,s,i){return i==1&&Number(r[s]||io)===Number(e[s])?t&&!0:t&&(e[s]==="*"||e[s]===r[s])},!0)};Q.exports.getPassword=function(r,e,t){var s,i=e.pipe(so());function n(l){var c=ho(l);c&&fo(c)&&po(r,c)&&(s=c[uo],i.end())}var a=function(){e.destroy(),t(s)},o=function(l){e.destroy(),zt("WARNING: error on reading file: %s",l),t(void 0)};e.on("error",o),i.on("data",n).on("end",a).on("error",o)};var ho=Q.exports.parseLine=function(r){if(r.length<11||r.match(/^\s+#/))return null;for(var e="",t="",s=0,i=0,n=0,a={},o=!1,l=function(d,h,m){var w=r.substring(h,m);Object.hasOwnProperty.call(process.env,"PGPASS_NO_DEESCAPE")||(w=w.replace(/\\([:\\])/g,"$1")),a[ne[d]]=w},c=0;c<r.length-1;c+=1){if(e=r.charAt(c+1),t=r.charAt(c),o=s==Bt-1,o){l(s,i);break}c>=0&&e==":"&&t!=="\\"&&(l(s,i,c+1),i=c+2,s+=1)}return a=Object.keys(a).length===Bt?a:null,a},fo=Q.exports.isValidEntry=function(r){for(var e={0:function(a){return a.length>0},1:function(a){return a==="*"?!0:(a=Number(a),isFinite(a)&&a>0&&a<9007199254740992&&Math.floor(a)===a)},2:function(a){return a.length>0},3:function(a){return a.length>0},4:function(a){return a.length>0}},t=0;t<ne.length;t+=1){var s=e[t],i=r[ne[t]]||"",n=s(i);if(!n)return!1}return!0}});var As=f((Ql,Ft)=>{"use strict";var Nl=x("path"),$s=x("fs"),Re=Cs();Ft.exports=function(r,e){var t=Re.getFileName();$s.stat(t,function(s,i){if(s||!Re.usePgPass(i,t))return e(void 0);var n=$s.createReadStream(t);Re.getPassword(r,n,e)})};Ft.exports.warnTo=Re.warnTo});var Ms=f((jl,Is)=>{var mo=x("events").EventEmitter,Ts=V(),ye=x("util"),Oe=Gr(),go=Ce(),bo=ct(),Nt=ns(),yo=me(),vo=Dt(),xo=it(),Ps=ye.deprecate(()=>{},"Client.activeQuery is deprecated and will be removed in pg@9.0"),wo=ye.deprecate(()=>{},"Client.queryQueue is deprecated and will be removed in pg@9.0."),So=ye.deprecate(()=>{},"pgpass support is deprecated and will be removed in pg@9.0. You can provide an async function as the password property to the Client/Pool constructor that returns a password instead. Within this function you can call the pgpass module in your own code."),ko=ye.deprecate(()=>{},"Passing a custom Promise implementation to the Client/Pool constructor is deprecated and will be removed in pg@9.0."),_o=ye.deprecate(()=>{},"Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use async/await or an external async flow control mechanism instead.");function Eo(r,e){if(typeof r=="number")return Number.isFinite(r)?r:e;if(typeof r=="string"&&r.trim()!==""){let t=Number(r);return Number.isFinite(t)?t:e}return e}var Le=class extends mo{constructor(e){super(),this.connectionParameters=new bo(e),this.user=this.connectionParameters.user,this.database=this.connectionParameters.database,this.port=this.connectionParameters.port,this.host=this.connectionParameters.host,Object.defineProperty(this,"password",{configurable:!0,enumerable:!1,writable:!0,value:this.connectionParameters.password}),this.replication=this.connectionParameters.replication;let t=e||{};t.Promise&&ko(),this._Promise=t.Promise||global.Promise,this._types=new go(t.types),this._ending=!1,this._ended=!1,this._connecting=!1,this._connected=!1,this._connectionError=!1,this._queryable=!0,this._activeQuery=null,this._txStatus=null,this.enableChannelBinding=!!t.enableChannelBinding,this.scramMaxIterations=Eo(t.scramMaxIterations,Oe.DEFAULT_MAX_SCRAM_ITERATIONS),this.connection=t.connection||new vo({stream:t.stream,ssl:this.connectionParameters.ssl,sslNegotiation:this.connectionParameters.sslnegotiation,keepAlive:t.keepAlive||!1,keepAliveInitialDelayMillis:t.keepAliveInitialDelayMillis||0,encoding:this.connectionParameters.client_encoding||"utf8"}),this._queryQueue=[],this._sentQueryQueue=[],this.pipeline=!!t.pipeline,this.binary=t.binary||yo.binary,this.processID=null,this.secretKey=null,this.ssl=this.connectionParameters.ssl||!1,this.sslNegotiation=this.connectionParameters.sslnegotiation||"postgres",this.ssl&&this.ssl.key&&Object.defineProperty(this.ssl,"key",{enumerable:!1}),this._connectionTimeoutMillis=t.connectionTimeoutMillis||0}get activeQuery(){return Ps(),this._activeQuery}set activeQuery(e){Ps(),this._activeQuery=e}_getActiveQuery(){return this._activeQuery}_errorAllQueries(e){let t=i=>{process.nextTick(()=>{i.handleError(e,this.connection)})},s=this._getActiveQuery();s&&(t(s),this._activeQuery=null),this._sentQueryQueue.forEach(t),this._sentQueryQueue.length=0,this._queryQueue.forEach(t),this._queryQueue.length=0}_connect(e){let t=this,s=this.connection;if(this._connectionCallback=e,this._connecting||this._connected){let i=new Error("Client has already been connected. You cannot reuse a client.");process.nextTick(()=>{e(i)});return}this._connecting=!0,this._connectionTimeoutMillis>0&&(this.connectionTimeoutHandle=setTimeout(()=>{s._ending=!0,s.stream.destroy(new Error("timeout expired"))},this._connectionTimeoutMillis),this.connectionTimeoutHandle.unref&&this.connectionTimeoutHandle.unref()),this.host&&this.host.indexOf("/")===0?s.connect(this.host+"/.s.PGSQL."+this.port):s.connect(this.port,this.host),s.on("connect",function(){t.ssl?t.sslNegotiation!=="direct"&&s.requestSsl():s.startup(t.getStartupConf())}),s.on("sslconnect",function(){s.startup(t.getStartupConf())}),this._attachListeners(s),s.once("end",()=>{let i=this._ending?new Error("Connection terminated"):new Error("Connection terminated unexpectedly");clearTimeout(this.connectionTimeoutHandle),this._errorAllQueries(i),this._ended=!0,this._ending||(this._connecting&&!this._connectionError?this._connectionCallback?this._connectionCallback(i):this._handleErrorEvent(i):this._connectionError||this._handleErrorEvent(i)),process.nextTick(()=>{this.emit("end")})})}connect(e){if(e){this._connect(e);return}return new this._Promise((t,s)=>{this._connect(i=>{i?s(i):t(this)})})}_attachListeners(e){e.on("authenticationCleartextPassword",this._handleAuthCleartextPassword.bind(this)),e.on("authenticationMD5Password",this._handleAuthMD5Password.bind(this)),e.on("authenticationSASL",this._handleAuthSASL.bind(this)),e.on("authenticationSASLContinue",this._handleAuthSASLContinue.bind(this)),e.on("authenticationSASLFinal",this._handleAuthSASLFinal.bind(this)),e.on("backendKeyData",this._handleBackendKeyData.bind(this)),e.on("error",this._handleErrorEvent.bind(this)),e.on("errorMessage",this._handleErrorMessage.bind(this)),e.on("readyForQuery",this._handleReadyForQuery.bind(this)),e.on("notice",this._handleNotice.bind(this)),e.on("rowDescription",this._handleRowDescription.bind(this)),e.on("dataRow",this._handleDataRow.bind(this)),e.on("portalSuspended",this._handlePortalSuspended.bind(this)),e.on("emptyQuery",this._handleEmptyQuery.bind(this)),e.on("commandComplete",this._handleCommandComplete.bind(this)),e.on("parseComplete",this._handleParseComplete.bind(this)),e.on("copyInResponse",this._handleCopyInResponse.bind(this)),e.on("copyData",this._handleCopyData.bind(this)),e.on("notification",this._handleNotification.bind(this))}_getPassword(e){let t=this.connection;if(typeof this.password=="function")this._Promise.resolve().then(()=>this.password(this.connectionParameters)).then(s=>{if(s!==void 0){if(typeof s!="string"){t.emit("error",new TypeError("Password must be a string"));return}this.connectionParameters.password=this.password=s}else this.connectionParameters.password=this.password=null;e()}).catch(s=>{t.emit("error",s)});else if(this.password!==null)e();else try{As()(this.connectionParameters,i=>{i!==void 0&&(So(),this.connectionParameters.password=this.password=i),e()})}catch(s){this.emit("error",s)}}_handleAuthCleartextPassword(e){this._getPassword(()=>{this.connection.password(this.password)})}_handleAuthMD5Password(e){this._getPassword(async()=>{try{let t=await xo.postgresMd5PasswordHash(this.user,this.password,e.salt);this.connection.password(t)}catch(t){this.emit("error",t)}})}_handleAuthSASL(e){this._getPassword(()=>{try{this.saslSession=Oe.startSession(e.mechanisms,this.enableChannelBinding&&this.connection.stream,this.scramMaxIterations),this.connection.sendSASLInitialResponseMessage(this.saslSession.mechanism,this.saslSession.response)}catch(t){this.connection.emit("error",t)}})}async _handleAuthSASLContinue(e){try{await Oe.continueSession(this.saslSession,this.password,e.data,this.enableChannelBinding&&this.connection.stream),this.connection.sendSCRAMClientFinalMessage(this.saslSession.response)}catch(t){this.connection.emit("error",t)}}_handleAuthSASLFinal(e){try{Oe.finalizeSession(this.saslSession,e.data),this.saslSession=null}catch(t){this.connection.emit("error",t)}}_handleBackendKeyData(e){this.processID=e.processID,this.secretKey=e.secretKey}_handleReadyForQuery(e){this._connecting&&(this._connecting=!1,this._connected=!0,clearTimeout(this.connectionTimeoutHandle),this._connectionCallback&&(this._connectionCallback(null,this),this._connectionCallback=null),this.emit("connect"));let t=this._getActiveQuery();this._activeQuery=null,this._txStatus=e?.status??null,this.readyForQuery=!0,t&&t.handleReadyForQuery(this.connection),this._pulseQueryQueue()}_handleErrorWhileConnecting(e){if(!this._connectionError){if(this._connectionError=!0,clearTimeout(this.connectionTimeoutHandle),this._connectionCallback)return this._connectionCallback(e);this.emit("error",e)}}_handleErrorEvent(e){if(this._connecting)return this._handleErrorWhileConnecting(e);this._queryable=!1,this._errorAllQueries(e),this.emit("error",e)}_handleErrorMessage(e){if(this._connecting)return this._handleErrorWhileConnecting(e);let t=this._getActiveQuery();if(!t){this._handleErrorEvent(e);return}this._activeQuery=null,t.name&&delete this.connection.submittedNamedStatements[t.name],t.handleError(e,this.connection)}_handleRowDescription(e){let t=this._getActiveQuery();if(t==null){let s=new Error("Received unexpected rowDescription message from backend.");this._handleErrorEvent(s);return}t.handleRowDescription(e)}_handleDataRow(e){let t=this._getActiveQuery();if(t==null){let s=new Error("Received unexpected dataRow message from backend.");this._handleErrorEvent(s);return}t.handleDataRow(e)}_handlePortalSuspended(e){let t=this._getActiveQuery();if(t==null){let s=new Error("Received unexpected portalSuspended message from backend.");this._handleErrorEvent(s);return}t.handlePortalSuspended(this.connection)}_handleEmptyQuery(e){let t=this._getActiveQuery();if(t==null){let s=new Error("Received unexpected emptyQuery message from backend.");this._handleErrorEvent(s);return}t.handleEmptyQuery(this.connection)}_handleCommandComplete(e){let t=this._getActiveQuery();if(t==null){let s=new Error("Received unexpected commandComplete message from backend.");this._handleErrorEvent(s);return}t.handleCommandComplete(e,this.connection)}_handleParseComplete(){let e=this._getActiveQuery();if(e==null){let t=new Error("Received unexpected parseComplete message from backend.");this._handleErrorEvent(t);return}e.name&&(this.connection.parsedStatements[e.name]=e.text,delete this.connection.submittedNamedStatements[e.name])}_handleCopyInResponse(e){let t=this._getActiveQuery();if(t==null){let s=new Error("Received unexpected copyInResponse message from backend.");this._handleErrorEvent(s);return}t.handleCopyInResponse(this.connection)}_handleCopyData(e){let t=this._getActiveQuery();if(t==null){let s=new Error("Received unexpected copyData message from backend.");this._handleErrorEvent(s);return}t.handleCopyData(e,this.connection)}_handleNotification(e){this.emit("notification",e)}_handleNotice(e){this.emit("notice",e)}getStartupConf(){let e=this.connectionParameters,t={user:e.user,database:e.database},s=e.application_name||e.fallback_application_name;return s&&(t.application_name=s),e.replication&&(t.replication=""+e.replication),e.statement_timeout&&(t.statement_timeout=String(parseInt(e.statement_timeout,10))),e.lock_timeout&&(t.lock_timeout=String(parseInt(e.lock_timeout,10))),e.idle_in_transaction_session_timeout&&(t.idle_in_transaction_session_timeout=String(parseInt(e.idle_in_transaction_session_timeout,10))),e.options&&(t.options=e.options),t}cancel(e,t){if(e.activeQuery===t){let s=this.connection;this.host&&this.host.indexOf("/")===0?s.connect(this.host+"/.s.PGSQL."+this.port):s.connect(this.port,this.host),s.on("connect",function(){s.cancel(e.processID,e.secretKey)})}else e._queryQueue.indexOf(t)!==-1?e._queryQueue.splice(e._queryQueue.indexOf(t),1):e._sentQueryQueue.indexOf(t)!==-1&&(t.callback=()=>{})}setTypeParser(e,t,s){return this._types.setTypeParser(e,t,s)}getTypeParser(e,t){return this._types.getTypeParser(e,t)}escapeIdentifier(e){return Ts.escapeIdentifier(e)}escapeLiteral(e){return Ts.escapeLiteral(e)}_pulseQueryQueue(){if(this.pipeline){this._pulsePipelinedQueryQueue();return}if(this.readyForQuery===!0){this._activeQuery=this._queryQueue.shift();let e=this._getActiveQuery();if(e){this.readyForQuery=!1,this.hasExecuted=!0;let t=e.submit(this.connection);t&&process.nextTick(()=>{e.handleError(t,this.connection),this.readyForQuery=!0,this._pulseQueryQueue()})}else this.hasExecuted&&(this._activeQuery=null,this.emit("drain"))}}_pulsePipelinedQueryQueue(){if(!(!this._connected||!this._queryable)){for(;this._queryQueue.length>0;){let e=this._queryQueue.shift();this.hasExecuted=!0;let t=e.submit(this.connection);if(t){process.nextTick(()=>{e.handleError(t,this.connection)});continue}this._sentQueryQueue.push(e)}this.readyForQuery&&!this._activeQuery&&this._sentQueryQueue.length>0&&(this._activeQuery=this._sentQueryQueue.shift(),this.readyForQuery=!1),!this._activeQuery&&this._sentQueryQueue.length===0&&this._queryQueue.length===0&&this.hasExecuted&&this.emit("drain")}}query(e,t,s){let i,n;if(e==null)throw new TypeError("Client was passed a null or undefined query");if(typeof e.submit=="function")n=i=e,i.callback||(typeof t=="function"?i.callback=t:s&&(i.callback=s));else if(i=new Nt(e,t,s),!i.callback)n=new this._Promise((o,l)=>{i.callback=(c,d)=>c?l(c):o(d)}).catch(o=>{throw Error.captureStackTrace(o),o});else if(typeof i.callback!="function")throw new TypeError("callback is not a function");let a=e.query_timeout||this.connectionParameters.query_timeout;if(a){let o=i.callback||(()=>{}),l=setTimeout(()=>{let c=new Error("Query read timeout");process.nextTick(()=>{i.handleError(c,this.connection)}),o(c),i.callback=()=>{};let d=this._queryQueue.indexOf(i);if(d>-1)this._queryQueue.splice(d,1);else if(this.pipeline){this.connection.stream.destroy();return}this._pulseQueryQueue()},a);i.callback=(c,d)=>{clearTimeout(l),o(c,d)}}if(this.binary&&!i.binary&&(i.binary=!0),i._result&&!i._result._types&&(i._result._types=this._types),this.pipeline){let o=typeof e.submit=="function"&&!(i instanceof Nt)?"Custom query classes such as pg-cursor and pg-query-stream are":i.rows?"The `rows` option is":null;if(o)return process.nextTick(()=>{i.handleError(new Error(`${o} not supported in pipeline mode`),this.connection)}),n}return this._queryable?this._ending?(process.nextTick(()=>{i.handleError(new Error("Client was closed and is not queryable"),this.connection)}),n):(this._queryQueue.length>0&&!this.pipeline&&_o(),this._queryQueue.push(i),this._pulseQueryQueue(),n):(process.nextTick(()=>{i.handleError(new Error("Client has encountered a connection error and is not queryable"),this.connection)}),n)}ref(){this.connection.ref()}unref(){this.connection.unref()}getTransactionStatus(){return this._txStatus}end(e){if(this._ending=!0,!this.connection._connecting||this._ended)if(e){e();return}else return this._Promise.resolve();if(this._queryable?this.pipeline&&(this._getActiveQuery()||this._sentQueryQueue.length>0||this._queryQueue.length>0)?this.once("drain",()=>this.connection.end()):this._getActiveQuery()?this.connection.stream.destroy():this.connection.end():this.connection.stream.destroy(),e)this.connection.once("end",e);else return new this._Promise(t=>{this.connection.once("end",t)})}get queryQueue(){return wo(),this._queryQueue}};Le.Query=Nt;Is.exports=Le});var Os=f((Hl,Rs)=>{"use strict";var Co=x("events").EventEmitter,Qt=function(){},qs=(r,e)=>{let t=r.findIndex(e);return t===-1?void 0:r.splice(t,1)[0]},jt=class{constructor(e,t,s){this.client=e,this.idleListener=t,this.timeoutId=s}},ae=class{constructor(e){this.callback=e}};function $o(){throw new Error("Release called on client which has already been released to the pool.")}function De(r,e){if(e)return{callback:e,result:void 0};let t,s,i=function(a,o){a?t(a):s(o)},n=new r(function(a,o){s=a,t=o}).catch(a=>{throw Error.captureStackTrace(a),a});return{callback:i,result:n}}function Ao(r,e){return function t(s){s.client=e,e.removeListener("error",t),e.on("error",()=>{r.log("additional client error after disconnection due to error",s)}),r._remove(e),r.emit("error",s,e)}}var Ht=class extends Co{constructor(e,t){super(),this.options=Object.assign({},e),e!=null&&"password"in e&&Object.defineProperty(this.options,"password",{configurable:!0,enumerable:!1,writable:!0,value:e.password}),e!=null&&e.ssl&&e.ssl.key&&Object.defineProperty(this.options.ssl,"key",{enumerable:!1}),this.options.max=this.options.max||this.options.poolSize||10,this.options.min=this.options.min||0,this.options.maxUses=this.options.maxUses||1/0,this.options.allowExitOnIdle=this.options.allowExitOnIdle||!1,this.options.maxLifetimeSeconds=this.options.maxLifetimeSeconds||0,this.log=this.options.log||function(){},this.Client=this.options.Client||t||Ut().Client,this.Promise=this.options.Promise||global.Promise,typeof this.options.idleTimeoutMillis>"u"&&(this.options.idleTimeoutMillis=1e4),this._clients=[],this._idle=[],this._expired=new WeakSet,this._pendingQueue=[],this._endCallback=void 0,this.ending=!1,this.ended=!1}_promiseTry(e){let t=this.Promise;return typeof t.try=="function"?t.try(e):new t(s=>s(e()))}_isFull(){return this._clients.length>=this.options.max}_isAboveMin(){return this._clients.length>this.options.min}_pulseQueue(){if(this.log("pulse queue"),this.ended){this.log("pulse queue ended");return}if(this.ending){this.log("pulse queue on ending"),this._idle.length&&this._idle.slice().map(t=>{this._remove(t.client)}),this._clients.length||(this.ended=!0,this._endCallback());return}if(!this._pendingQueue.length){this.log("no queued requests");return}if(!this._idle.length&&this._isFull())return;let e=this._pendingQueue.shift();if(this._idle.length){let t=this._idle.pop();clearTimeout(t.timeoutId);let s=t.client;s.ref&&s.ref();let i=t.idleListener;return this._acquireClient(s,e,i,!1)}if(!this._isFull())return this.newClient(e);throw new Error("unexpected condition")}_remove(e,t){let s=qs(this._idle,n=>n.client===e);s!==void 0&&clearTimeout(s.timeoutId),this._clients=this._clients.filter(n=>n!==e);let i=this;e.end(()=>{i.emit("remove",e),typeof t=="function"&&t()})}connect(e){if(this.ending){let i=new Error("Cannot use a pool after calling end on the pool");return e?e(i):this.Promise.reject(i)}let t=De(this.Promise,e),s=t.result;if(this._isFull()||this._idle.length){if(this._idle.length&&process.nextTick(()=>this._pulseQueue()),!this.options.connectionTimeoutMillis)return this._pendingQueue.push(new ae(t.callback)),s;let i=(o,l,c)=>{clearTimeout(a),t.callback(o,l,c)},n=new ae(i),a=setTimeout(()=>{qs(this._pendingQueue,o=>o.callback===i),n.timedOut=!0,t.callback(new Error("timeout exceeded when trying to connect"))},this.options.connectionTimeoutMillis);return a.unref&&a.unref(),this._pendingQueue.push(n),s}return this.newClient(new ae(t.callback)),s}newClient(e){let t=new this.Client(this.options);this._clients.push(t);let s=Ao(this,t);this.log("checking client timeout");let i,n=!1;this.options.connectionTimeoutMillis&&(i=setTimeout(()=>{t.connection?(this.log("ending client due to timeout"),n=!0,t.connection.stream.destroy()):t.isConnected()||(this.log("ending client due to timeout"),n=!0,t.end())},this.options.connectionTimeoutMillis)),this.log("connecting new client"),t.connect(a=>{if(i&&clearTimeout(i),t.on("error",s),a)this.log("client failed to connect",a),this._clients=this._clients.filter(o=>o!==t),n&&(a=new Error("Connection terminated due to connection timeout",{cause:a})),this._pulseQueue(),e.timedOut||e.callback(a,void 0,Qt);else{if(this.log("new client connected"),this.options.onConnect){this._promiseTry(()=>this.options.onConnect(t)).then(()=>{this._afterConnect(t,e,s)},o=>{this._clients=this._clients.filter(l=>l!==t),t.end(()=>{this._pulseQueue(),e.timedOut||e.callback(o,void 0,Qt)})});return}return this._afterConnect(t,e,s)}})}_afterConnect(e,t,s){if(this.options.maxLifetimeSeconds!==0){let i=setTimeout(()=>{this.log("ending client due to expired lifetime"),this._expired.add(e),this._idle.findIndex(a=>a.client===e)!==-1&&this._acquireClient(e,new ae((a,o,l)=>l()),s,!1)},this.options.maxLifetimeSeconds*1e3);i.unref(),e.once("end",()=>clearTimeout(i))}return this._acquireClient(e,t,s,!0)}_acquireClient(e,t,s,i){i&&this.emit("connect",e),this.emit("acquire",e),e.release=this._releaseOnce(e,s),e.removeListener("error",s),t.timedOut?i&&this.options.verify?this.options.verify(e,e.release):e.release():i&&this.options.verify?this.options.verify(e,n=>{if(n)return e.release(n),t.callback(n,void 0,Qt);t.callback(void 0,e,e.release)}):t.callback(void 0,e,e.release)}_releaseOnce(e,t){let s=!1;return i=>{s&&$o(),s=!0,this._release(e,t,i)}}_release(e,t,s){if(e.on("error",t),e._poolUseCount=(e._poolUseCount||0)+1,this.emit("release",s,e),s||this.ending||!e._queryable||e._ending||e._poolUseCount>=this.options.maxUses)return e._poolUseCount>=this.options.maxUses&&this.log("remove expended client"),this._remove(e,this._pulseQueue.bind(this));if(this._expired.has(e))return this.log("remove expired client"),this._expired.delete(e),this._remove(e,this._pulseQueue.bind(this));let n;this.options.idleTimeoutMillis&&this._isAboveMin()&&(n=setTimeout(()=>{this._isAboveMin()&&(this.log("remove idle client"),this._remove(e,this._pulseQueue.bind(this)))},this.options.idleTimeoutMillis),this.options.allowExitOnIdle&&n.unref()),this.options.allowExitOnIdle&&e.unref(),this._idle.push(new jt(e,t,n)),this._pulseQueue()}query(e,t,s){if(typeof e=="function"){let n=De(this.Promise,e);return setImmediate(function(){return n.callback(new Error("Passing a function as the first parameter to pool.query is not supported"))}),n.result}typeof t=="function"&&(s=t,t=void 0);let i=De(this.Promise,s);return s=i.callback,this.connect((n,a)=>{if(n)return s(n);let o=!1,l=c=>{o||(o=!0,a.release(c),s(c))};a.once("error",l),this.log("dispatching query");try{a.query(e,t,(c,d)=>{if(this.log("query dispatched"),a.removeListener("error",l),!o)return o=!0,a.release(c),c?s(c):s(void 0,d)})}catch(c){return a.release(c),s(c)}}),i.result}end(e){if(this.log("ending"),this.ending){let s=new Error("Called end on pool more than once");return e?e(s):this.Promise.reject(s)}this.ending=!0;let t=De(this.Promise,e);return this._endCallback=t.callback,this._pulseQueue(),t.result}get waitingCount(){return this._pendingQueue.length}get idleCount(){return this._idle.length}get expiredCount(){return this._clients.reduce((e,t)=>e+(this._expired.has(t)?1:0),0)}get totalCount(){return this._clients.length}};Rs.exports=Ht});var Bs=f((Ul,Ds)=>{"use strict";var Ls=x("events").EventEmitter,To=x("util"),Gt=V(),oe=Ds.exports=function(r,e,t){Ls.call(this),r=Gt.normalizeQueryConfig(r,e,t),this.text=r.text,this.values=r.values,this.name=r.name,this.queryMode=r.queryMode,this.callback=r.callback,this.state="new",this._arrayMode=r.rowMode==="array",this._emitRowEvents=!1,this.on("newListener",function(s){s==="row"&&(this._emitRowEvents=!0)}.bind(this))};To.inherits(oe,Ls);var Po={sqlState:"code",statementPosition:"position",messagePrimary:"message",messageDetail:"detail",messageHint:"hint",context:"where",schemaName:"schema",tableName:"table",columnName:"column",dataTypeName:"dataType",constraintName:"constraint",sourceFile:"file",sourceLine:"line",sourceFunction:"routine"};oe.prototype.handleError=function(r){let e=this.native&&this.native.pq.resultErrorFields();if(e)for(let t in e){let s=Po[t]||t;r[s]=e[t]}this.callback?this.callback(r):this.emit("error",r),this.state="error"};oe.prototype.then=function(r,e){return this._getPromise().then(r,e)};oe.prototype.catch=function(r){return this._getPromise().catch(r)};oe.prototype._getPromise=function(){return this._promise?this._promise:(this._promise=new Promise(function(r,e){this._once("end",r),this._once("error",e)}.bind(this)),this._promise)};oe.prototype.submit=function(r){this.state="running";let e=this;this.native=r.native,r.native.arrayMode=this._arrayMode;let t=function(s,i,n){if(r.native.arrayMode=!1,setImmediate(function(){e.emit("_done")}),s)return e.handleError(s);e._emitRowEvents&&(n.length>1?i.forEach((a,o)=>{a.forEach(l=>{e.emit("row",l,n[o])})}):i.forEach(function(a){e.emit("row",a,n)})),e.state="end",e.emit("end",n),e.callback&&e.callback(null,n)};if(process.domain&&(t=process.domain.bind(t)),this.name){this.name.length>63&&(console.error("Warning! Postgres only supports 63 characters for query names."),console.error("You supplied %s (%s)",this.name,this.name.length),console.error("This can cause conflicts and silent errors executing queries"));let s=(this.values||[]).map(Gt.prepareValue);if(r.namedQueries[this.name]!==void 0){if(this.text&&r.namedQueries[this.name]!==this.text){let i=new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);return t(i)}return r.native.execute(this.name,s,t)}return r.native.prepare(this.name,this.text,s.length,function(i){return i?t(i):(r.namedQueries[e.name]=e.text,e.native.execute(e.name,s,t))})}else if(this.values){if(!Array.isArray(this.values)){let i=new Error("Query values must be an array");return t(i)}let s=this.values.map(Gt.prepareValue);r.native.query(this.text,s,t)}else this.queryMode==="extended"?r.native.query(this.text,[],t):r.native.query(this.text,t)}});var js=f((Gl,Qs)=>{var Io=x("util"),zs;try{zs=x("pg-native")}catch(r){throw r}var Mo=Ce(),Fs=x("events").EventEmitter,qo=x("util"),Ro=ct(),Ns=Bs(),Oo=Io.deprecate(()=>{},"Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use async/await or an external async flow control mechanism instead."),$=Qs.exports=function(r){Fs.call(this),r=r||{},this._Promise=r.Promise||global.Promise,this._types=new Mo(r.types),this.native=new zs({types:this._types}),this._queryQueue=[],this._ending=!1,this._connecting=!1,this._connected=!1,this._queryable=!0,this.pipeline=!!r.pipeline,this._pipelineInFlight=!1;let e=this.connectionParameters=new Ro(r);r.nativeConnectionString&&(e.nativeConnectionString=r.nativeConnectionString),this.user=e.user,Object.defineProperty(this,"password",{configurable:!0,enumerable:!1,writable:!0,value:e.password}),this.database=e.database,this.host=e.host,this.port=e.port,this.namedQueries={}};$.Query=Ns;qo.inherits($,Fs);$.prototype._errorAllQueries=function(r){let e=t=>{process.nextTick(()=>{t.native=this.native,t.handleError(r)})};this._hasActiveQuery()&&(e(this._activeQuery),this._activeQuery=null),this._queryQueue.forEach(e),this._queryQueue.length=0};$.prototype._connect=function(r){let e=this;if(this._connecting){process.nextTick(()=>r(new Error("Client has already been connected. You cannot reuse a client.")));return}this._connecting=!0,this.connectionParameters.getLibpqConnectionString(function(t,s){if(e.connectionParameters.nativeConnectionString&&(s=e.connectionParameters.nativeConnectionString),t)return r(t);e.native.connect(s,function(i){if(i)return e.native.end(),r(i);e._connected=!0,e.native.on("error",function(n){e._queryable=!1,e._errorAllQueries(n),e.emit("error",n)}),e.native.on("notification",function(n){e.emit("notification",{channel:n.relname,payload:n.extra})}),e.emit("connect"),e._pulseQueryQueue(!0),r(null,this)})})};$.prototype.connect=function(r){if(r){this._connect(r);return}return new this._Promise((e,t)=>{this._connect(s=>{s?t(s):e(this)})})};$.prototype.query=function(r,e,t){let s,i,n,a,o;if(r==null)throw new TypeError("Client was passed a null or undefined query");if(typeof r.submit=="function")n=r.query_timeout||this.connectionParameters.query_timeout,i=s=r,typeof e=="function"&&(r.callback=e);else if(n=r.query_timeout||this.connectionParameters.query_timeout,s=new Ns(r,e,t),!s.callback){let l,c;i=new this._Promise((d,h)=>{l=d,c=h}).catch(d=>{throw Error.captureStackTrace(d),d}),s.callback=(d,h)=>d?c(d):l(h)}return n&&(o=s.callback||(()=>{}),a=setTimeout(()=>{let l=new Error("Query read timeout");process.nextTick(()=>{s.handleError(l,this.connection)}),o(l),s.callback=()=>{};let c=this._queryQueue.indexOf(s);c>-1&&this._queryQueue.splice(c,1),this._pulseQueryQueue()},n),s.callback=(l,c)=>{clearTimeout(a),o(l,c)}),this._queryable?this._ending?(s.native=this.native,process.nextTick(()=>{s.handleError(new Error("Client was closed and is not queryable"))}),i):(this._queryQueue.length>0&&!this.pipeline&&Oo(),this._queryQueue.push(s),this._pulseQueryQueue(),i):(s.native=this.native,process.nextTick(()=>{s.handleError(new Error("Client has encountered a connection error and is not queryable"))}),i)};$.prototype.end=function(r){let e=this;this._ending=!0,this._connecting&&!this._connected&&this.once("connect",()=>{this.end(()=>{})});let t;r||(t=new this._Promise(function(i,n){r=a=>a?n(a):i()}));let s=function(){e.native.end(function(){e._connected=!1,e._errorAllQueries(new Error("Connection terminated")),process.nextTick(()=>{e.emit("end"),r&&r()})})};return this.pipeline&&(this._pipelineInFlight||this._queryQueue.length>0)?this.once("drain",s):s(),t};$.prototype._hasActiveQuery=function(){return this._activeQuery&&this._activeQuery.state!=="error"&&this._activeQuery.state!=="end"};$.prototype._pulseQueryQueue=function(r){if(!this._connected)return;if(this.pipeline&&!r)return this._pulsePipelinedQueryQueue();if(this._hasActiveQuery())return;let e=this._queryQueue.shift();if(!e){r||this.emit("drain");return}this._activeQuery=e,e.submit(this);let t=this;e.once("_done",function(){t._pulseQueryQueue()})};$.prototype._pulsePipelinedQueryQueue=function(){if(!this._connected||this._pipelineInFlight)return;if(this._queryQueue.length===0){this.hasExecuted&&this.emit("drain");return}this._pipelineInFlight=!0;let r=this,e=[],t=[],s=V();for(;this._queryQueue.length>0;){let i=this._queryQueue.shift();this.hasExecuted=!0,t.push(i);let n=i.values?i.values.map(s.prepareValue):null,a={text:i.text,name:i.name,arrayMode:i._arrayMode};n&&(a.values=n),i.name&&this.namedQueries[i.name]&&(a._alreadyPrepared=!0),e.push(a)}this.native.pipeline(e,function(i,n){if(r._pipelineInFlight=!1,i){r._connected=!1,r._queryable=!1;for(let a=0;a<t.length;a++){let o=t[a];o.native=r.native,o.handleError(i)}r._errorAllQueries(i),r.emit("error",i),r.emit("end");return}for(let a=0;a<t.length;a++){let o=t[a],l=n[a];o.native=r.native,l.err?o.handleError(l.err):(o.name&&(r.namedQueries[o.name]=o.text),o.state="end",o.emit("end",l.result),o.callback&&o.callback(null,l.result)),setImmediate(function(){o.emit("_done")})}r._pulsePipelinedQueryQueue()})};$.prototype.cancel=function(r){this._activeQuery===r?this.native.cancel(function(){}):this._queryQueue.indexOf(r)!==-1&&this._queryQueue.splice(this._queryQueue.indexOf(r),1)};$.prototype.ref=function(){};$.prototype.unref=function(){};$.prototype.setTypeParser=function(r,e,t){return this._types.setTypeParser(r,e,t)};$.prototype.getTypeParser=function(r,e){return this._types.getTypeParser(r,e)};$.prototype.isConnected=function(){return this._connected};$.prototype.getTransactionStatus=function(){return this.native.getTransactionStatus()}});var Wt=f((Wl,Hs)=>{"use strict";Hs.exports=js()});var Ut=f((Yl,Be)=>{"use strict";var Lo=Ms(),Do=me(),Bo=Dt(),zo=ut(),Fo=V(),No=Os(),Qo=Ce(),{DatabaseError:jo}=Rt(),{escapeIdentifier:Ho,escapeLiteral:Uo}=V(),Go=r=>class extends No{constructor(t){super(t,r)}},Us=function(r){this.defaults=Do,this.Client=r,this.Query=this.Client.Query,this.Pool=Go(this.Client),this._pools=[],this.Connection=Bo,this.types=fe(),this.DatabaseError=jo,this.TypeOverrides=Qo,this.escapeIdentifier=Ho,this.escapeLiteral=Uo,this.Result=zo,this.utils=Fo},Gs=Lo,Ws=!1;try{Ws=!!process.env.NODE_PG_FORCE_NATIVE}catch{}Ws&&(Gs=Wt());Be.exports=new Us(Gs);Object.defineProperty(Be.exports,"native",{configurable:!0,enumerable:!1,get(){let r=null;try{r=new Us(Wt())}catch(e){if(e.code!=="MODULE_NOT_FOUND")throw e}return Object.defineProperty(Be.exports,"native",{value:r}),r}})});var sr=`<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="Gym Babes: activewear for women who train in the Maldives. Seamless leggings, sports tops and full-sleeve training wear with free delivery.">
<title>Gym Babes | Activewear in the Maldives</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
/* Layout: app-like storefront. Sticky header + mobile bottom tab bar; photo-led grids; back office behind the same shell. */
:root{
  --bg:#fff8fb; --surface:#ffffff; --sunk:#fbeef4; --ink:#21101a; --muted:#7a6270; --line:#f0dbe6;
  --brand:#e5007e; --brand-strong:#c2006b; --on-brand:#ffffff; --blush:#ffe3f0;
  --ok:#17845a; --ok-bg:#e3f5ec; --warn:#a96a00; --warn-bg:#fdf1dc; --bad:#c42c3c; --bad-bg:#fde6e8; --info:#3456b8; --info-bg:#e6ecfb;
  --photo:#ffffff; --shadow:0 10px 30px rgba(84,10,52,.10);
  --f-display:"Bricolage Grotesque", "Avenir Next", "Segoe UI", system-ui, sans-serif;
  --f-body:"Figtree", "Segoe UI", system-ui, -apple-system, sans-serif;
  --r:16px; --r-s:10px;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --bg:#150a10; --surface:#1f1118; --sunk:#29161f; --ink:#fbeef5; --muted:#c3a6b6; --line:#3b2330;
  --brand:#ff4aa8; --brand-strong:#ff73bc; --on-brand:#1b0712; --blush:#3a1428;
  --ok:#53d39a; --ok-bg:#163326; --warn:#f3b552; --warn-bg:#3a2a10; --bad:#ff7b88; --bad-bg:#3d1720; --info:#8fa9ff; --info-bg:#1b2443;
  --photo:#f6f1f3; --shadow:0 10px 30px rgba(0,0,0,.35); color-scheme:dark }}
:root[data-theme="dark"]{
  --bg:#150a10; --surface:#1f1118; --sunk:#29161f; --ink:#fbeef5; --muted:#c3a6b6; --line:#3b2330;
  --brand:#ff4aa8; --brand-strong:#ff73bc; --on-brand:#1b0712; --blush:#3a1428;
  --ok:#53d39a; --ok-bg:#163326; --warn:#f3b552; --warn-bg:#3a2a10; --bad:#ff7b88; --bad-bg:#3d1720; --info:#8fa9ff; --info-bg:#1b2443;
  --photo:#f6f1f3; --shadow:0 10px 30px rgba(0,0,0,.35); color-scheme:dark }

*{box-sizing:border-box}
body{background:var(--bg);color:var(--ink);font-family:var(--f-body);font-size:15px;line-height:1.5;margin:0;
  padding-left:max(0px, env(safe-area-inset-left,0px));padding-right:max(0px, env(safe-area-inset-right,0px))}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:60;background:var(--surface)}
button,input,select,textarea{font:inherit;color:inherit}
button{cursor:pointer;background:none;border:0;padding:0}
a{color:inherit}
:focus-visible{outline:2.5px solid var(--brand);outline-offset:2px;border-radius:6px}
h1,h2,h3,h4{font-family:var(--f-display);margin:0;line-height:1.08;text-wrap:balance;letter-spacing:-.02em}
p{margin:0}
.wrap{max-width:1180px;margin:0 auto;padding-left:max(16px, env(safe-area-inset-left,0px));padding-right:max(16px, env(safe-area-inset-right,0px))}
.eyebrow{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--brand)}
.muted{color:var(--muted)}
.num{font-variant-numeric:tabular-nums}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}

/* logo: real wordmark recoloured by token */
.logo{display:inline-block;aspect-ratio:684/367;background:var(--brand);
  -webkit-mask:url(img/logo.png) center/contain no-repeat;mask:url(img/logo.png) center/contain no-repeat}

/* announcement */
.announce{background:var(--brand);color:var(--on-brand);font-size:13px;font-weight:600}
.announce .wrap{display:flex;align-items:center;gap:10px;justify-content:center;padding-block:9px;text-align:center}
.announce a{color:inherit;text-decoration:underline;text-underline-offset:3px;white-space:nowrap;cursor:pointer}
.announce .x{margin-left:auto;opacity:.8;font-size:18px;line-height:1;padding:0 4px;color:inherit}

/* header */
header.top{position:sticky;top:env(safe-area-inset-top,0px);z-index:40;background:color-mix(in srgb,var(--surface) 92%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.bar{display:flex;align-items:center;gap:20px;height:66px}
.bar .logo{height:40px}
.nav{display:flex;gap:4px;margin-left:12px}
.nav button{padding:8px 12px;border-radius:999px;font-weight:600;font-size:14px;color:var(--muted)}
.nav button[aria-current="page"],.nav button:hover{color:var(--ink);background:var(--sunk)}
.tools{margin-left:auto;display:flex;align-items:center;gap:6px}
.icon-btn{width:42px;height:42px;border-radius:999px;display:grid;place-items:center;position:relative;color:var(--ink)}
.icon-btn:hover{background:var(--sunk)}
.icon-btn svg{width:22px;height:22px}
.count{position:absolute;top:3px;right:2px;min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:var(--brand);color:var(--on-brand);font-size:11px;font-weight:700;display:grid;place-items:center}
.count[data-n="0"]{display:none}
.admin-pill{font-size:12px;font-weight:700;padding:7px 12px;border-radius:999px;border:1.5px solid var(--ink)}
@media (max-width:820px){.nav,.tools .hide-m{display:none}.bar{height:58px}.bar .logo{height:34px}}

/* bottom tabs (mobile) */
.tabs{display:none}
@media (max-width:820px){
  .tabs{display:grid;grid-template-columns:repeat(5,1fr);position:fixed;left:0;right:0;bottom:0;z-index:45;background:var(--surface);border-top:1px solid var(--line);
    padding:6px max(8px,env(safe-area-inset-right,0px)) calc(6px + env(safe-area-inset-bottom,0px)) max(8px,env(safe-area-inset-left,0px))}
  .tabs button{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:11px;font-weight:600;color:var(--muted);padding:6px 0;position:relative}
  .tabs button svg{width:22px;height:22px}
  .tabs button[aria-current="page"]{color:var(--brand)}
  .tabs .count{top:0;right:calc(50% - 22px)}
  main{padding-bottom:84px}
}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:50px;padding:0 24px;border-radius:999px;font-weight:700;font-size:15px;background:var(--brand);color:var(--on-brand);transition:transform .12s, background .15s}
.btn:hover{background:var(--brand-strong)}
.btn:active{transform:scale(.98)}
.btn[disabled]{opacity:.45;pointer-events:none}
.btn.dark{background:var(--ink);color:var(--bg)}
.btn.ghost{background:transparent;color:var(--ink);border:1.5px solid var(--line)}
.btn.ghost:hover{border-color:var(--ink)}
.btn.sm{height:38px;padding:0 16px;font-size:13px}
.btn.block{width:100%}
.link{font-weight:700;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1.5px}

/* hero */
.hero{padding-block:28px 12px}
.hero-grid{display:grid;grid-template-columns:1.05fr 1fr;gap:28px;align-items:center}
.hero-copy{display:flex;flex-direction:column;gap:18px}
.hero .logo{width:min(380px,80%)}
.hero h1{font-size:clamp(30px,4.4vw,52px);font-weight:800}
.hero h1 em{font-style:normal;color:var(--brand)}
.hero p.lede{font-size:17px;color:var(--muted);max-width:44ch}
.hero .ctas{display:flex;gap:10px;flex-wrap:wrap}
.collage{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:12px;aspect-ratio:1/1;max-width:100%}
.collage button{border-radius:22px;overflow:hidden;background:var(--photo);position:relative}
.collage button:first-child{grid-row:span 2}
.collage img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s}
.collage button:hover img{transform:scale(1.04)}
.collage .chip{position:absolute;left:12px;bottom:12px;background:var(--surface);color:var(--ink);font-size:12px;font-weight:700;padding:6px 10px;border-radius:999px;box-shadow:var(--shadow)}
@media (max-width:820px){.hero-grid{grid-template-columns:1fr}.collage{aspect-ratio:4/3}.hero{padding-top:20px}}

.trust{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-block:22px 8px}
.trust div{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:14px 16px;display:flex;gap:12px;align-items:center;font-size:14px}
.trust b{display:block;font-size:14px}
.trust svg{flex:none;width:26px;height:26px;color:var(--brand)}
@media (max-width:820px){.trust{grid-template-columns:1fr}}

section.block{padding-block:34px}
.sec-head{display:flex;align-items:end;justify-content:space-between;gap:16px;margin-bottom:18px;flex-wrap:wrap}
.sec-head h2{font-size:clamp(24px,3vw,34px);font-weight:800}

/* category tiles */
.cats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.cat{position:relative;border-radius:22px;overflow:hidden;aspect-ratio:4/5;background:var(--photo);text-align:left}
.cat img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s}
.cat:hover img{transform:scale(1.04)}
.cat .lab{position:absolute;inset:auto 12px 12px 12px;background:var(--surface);color:var(--ink);border-radius:14px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;gap:8px}
.cat .lab b{font-family:var(--f-display);font-size:18px}
.cat .lab span{font-size:12px;color:var(--muted)}
@media (max-width:820px){.cats{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.cat .lab{inset:auto 6px 6px 6px;padding:8px 9px;border-radius:10px}.cat .lab b{font-size:13px}.cat .lab span,.cat .lab .arr{display:none}}

/* product grid */
.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px 16px}
@media (max-width:1000px){.grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (max-width:700px){.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 10px}}
.card{display:flex;flex-direction:column;gap:10px;min-width:0}
.ph{position:relative;border-radius:18px;overflow:hidden;background:var(--photo);aspect-ratio:720/860;max-width:100%}
.ph img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s}
.card:hover .ph img{transform:scale(1.035)}
.ph .badge{position:absolute;left:10px;top:10px}
.card .heart{position:absolute;right:8px;top:8px;width:36px;height:36px;border-radius:999px;background:rgba(255,255,255,.92);display:grid;place-items:center;color:#21101a}
.card .heart svg{width:18px;height:18px}
.card .heart[aria-pressed="true"]{color:#e5007e}
.card .heart[aria-pressed="true"] svg{fill:currentColor}
.ph .soldout{position:absolute;inset:auto 10px 10px 10px;background:rgba(33,16,26,.82);color:#fff;font-size:12px;font-weight:700;text-align:center;border-radius:999px;padding:6px}
.card .meta{display:flex;flex-direction:column;gap:4px;text-align:left}
.card .nm{font-weight:600;font-size:15px;line-height:1.3}
.card .pr{display:flex;gap:8px;align-items:baseline;font-weight:700}
.card .pr s{color:var(--muted);font-weight:500;font-size:13px}
.dots{display:flex;gap:5px;flex-wrap:wrap;align-items:center}
.dots i{width:13px;height:13px;border-radius:50%;border:1px solid color-mix(in srgb,var(--ink) 18%,transparent)}
.dots small{font-size:12px;color:var(--muted);margin-left:2px}
.stars{display:inline-flex;gap:1px;color:var(--brand);vertical-align:middle}
.stars svg{width:14px;height:14px}
.rate{display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--muted)}

.badge{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;padding:5px 9px;border-radius:999px;background:var(--brand);color:var(--on-brand)}
.badge.soft{background:var(--blush);color:var(--brand-strong)}
.pill{display:inline-block;font-size:12px;font-weight:700;padding:4px 10px;border-radius:999px;white-space:nowrap}
.pill.ok{background:var(--ok-bg);color:var(--ok)}.pill.warn{background:var(--warn-bg);color:var(--warn)}.pill.bad{background:var(--bad-bg);color:var(--bad)}.pill.info{background:var(--info-bg);color:var(--info)}.pill.mute{background:var(--sunk);color:var(--muted)}

/* promo strips */
.promos{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.promo{border-radius:22px;padding:26px;display:flex;flex-direction:column;gap:12px;min-height:200px;position:relative;overflow:hidden}
.promo h3{font-size:26px;font-weight:800;max-width:16ch}
.promo p{max-width:40ch}
.promo.pink{background:var(--brand);color:var(--on-brand)}
.promo.pink .btn{background:var(--on-brand);color:var(--brand)}
.promo.soft{background:var(--blush);color:var(--ink)}
.promo .stripes{position:absolute;right:-50px;top:-50px;width:200px;height:200px;border-radius:50%;opacity:.35;
  background:repeating-linear-gradient(135deg,currentColor 0 6px,transparent 6px 15px)}
@media (max-width:820px){.promos{grid-template-columns:1fr}}

/* shop page */
.shop-head{padding-block:26px 6px;display:flex;flex-direction:column;gap:14px}
.shop-head h1{font-size:clamp(28px,4vw,42px);font-weight:800}
.filters{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.filters::-webkit-scrollbar{display:none}
.fchip{flex:none;height:38px;padding:0 15px;border-radius:999px;border:1.5px solid var(--line);font-weight:600;font-size:13.5px;background:var(--surface)}
.fchip[aria-pressed="true"]{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.shop-tools{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.search{flex:1;min-width:200px;display:flex;align-items:center;gap:8px;height:44px;padding:0 14px;border:1.5px solid var(--line);border-radius:999px;background:var(--surface)}
.search input{border:0;outline:0;background:transparent;flex:1;min-width:0}
.search svg{width:18px;height:18px;color:var(--muted)}
select.sel,input.inp,textarea.inp{height:44px;border:1.5px solid var(--line);border-radius:12px;background:var(--surface);padding:0 12px;min-width:0}
textarea.inp{height:auto;padding:10px 12px;resize:vertical}
input.inp:focus,select.sel:focus,textarea.inp:focus{outline:none;border-color:var(--brand)}
.empty{padding:50px 20px;text-align:center;color:var(--muted);display:flex;flex-direction:column;gap:12px;align-items:center}

/* product page */
.pdp{display:grid;grid-template-columns:1.1fr 1fr;gap:40px;padding-block:22px 10px}
@media (max-width:820px){.pdp{grid-template-columns:1fr;gap:18px}}
.gallery{display:flex;flex-direction:column;gap:10px;min-width:0}
.gallery .main{border-radius:24px;overflow:hidden;background:var(--photo);aspect-ratio:720/860;max-width:100%}
.gallery .main img{width:100%;height:100%;object-fit:cover;display:block}
.thumbs{display:flex;gap:8px;overflow-x:auto}
.thumbs button{flex:none;width:70px;aspect-ratio:720/860;border-radius:12px;overflow:hidden;background:var(--photo);border:2px solid transparent}
.thumbs button[aria-pressed="true"]{border-color:var(--brand)}
.thumbs img{width:100%;height:100%;object-fit:cover;display:block}
.buy{display:flex;flex-direction:column;gap:16px;min-width:0}
.crumbs{font-size:13px;color:var(--muted)}
.crumbs button{text-decoration:underline;text-underline-offset:3px}
.buy h1{font-size:clamp(28px,3.4vw,40px);font-weight:800}
.price-l{display:flex;gap:10px;align-items:baseline;font-size:22px;font-weight:800}
.price-l s{font-size:16px;color:var(--muted);font-weight:500}
.opt-lab{display:flex;justify-content:space-between;align-items:baseline;font-size:13px;font-weight:700;margin-bottom:8px}
.opt-lab span{font-weight:500;color:var(--muted)}
.swatches{display:flex;gap:10px;flex-wrap:wrap}
.swatches button{width:38px;height:38px;border-radius:50%;border:3px solid var(--surface);box-shadow:0 0 0 1.5px var(--line)}
.swatches button[aria-pressed="true"]{box-shadow:0 0 0 2.5px var(--brand)}
.sizes{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}
.sizes button{height:46px;border-radius:12px;border:1.5px solid var(--line);font-weight:700;background:var(--surface);position:relative}
.sizes button[aria-pressed="true"]{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.sizes button.out{color:var(--muted);background:var(--sunk);text-decoration:line-through}
.sizes button .low{position:absolute;left:0;right:0;bottom:-17px;font-size:10px;color:var(--warn);font-weight:700;text-decoration:none}
.qty{display:inline-flex;align-items:center;border:1.5px solid var(--line);border-radius:999px;height:50px}
.qty button{width:44px;height:100%;font-size:20px}
.qty span{min-width:26px;text-align:center;font-weight:700}
.buy-row{display:flex;gap:10px;align-items:center}
.buy-row .btn{flex:1}
.perks-l{display:grid;gap:8px;font-size:14px;background:var(--sunk);border-radius:var(--r);padding:14px 16px}
.perks-l div{display:flex;gap:10px;align-items:flex-start}
.perks-l svg{flex:none;width:18px;height:18px;color:var(--brand);margin-top:2px}
details.acc{border-top:1px solid var(--line)}
details.acc:last-of-type{border-bottom:1px solid var(--line)}
details.acc summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;padding:16px 0;font-weight:700}
details.acc summary::-webkit-details-marker{display:none}
details.acc summary::after{content:"+";font-size:22px;font-weight:400;color:var(--muted)}
details.acc[open] summary::after{content:"\u2013"}
details.acc .body{padding-bottom:16px;color:var(--muted);display:flex;flex-direction:column;gap:10px}
details.acc ul{margin:0;padding-left:18px}
table.sg{border-collapse:collapse;width:100%;font-size:13px}
table.sg th,table.sg td{border-bottom:1px solid var(--line);padding:7px 6px;text-align:left}
table.sg th{color:var(--ink)}
.fitbar{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;font-size:12px;color:var(--muted)}
.fitbar .track{height:6px;border-radius:99px;background:var(--line);position:relative}
.fitbar .track i{position:absolute;top:-4px;width:14px;height:14px;border-radius:50%;background:var(--brand);transform:translateX(-50%)}

/* reviews */
.rev-wrap{display:grid;grid-template-columns:280px 1fr;gap:30px}
@media (max-width:820px){.rev-wrap{grid-template-columns:1fr}}
.rev-sum{display:flex;flex-direction:column;gap:12px;background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:20px;align-self:start}
.rev-sum .big{font-family:var(--f-display);font-size:46px;font-weight:800;line-height:1}
.rev-list{display:flex;flex-direction:column}
.rev{padding:18px 0;border-bottom:1px solid var(--line);display:flex;flex-direction:column;gap:6px}
.rev .who{font-size:13px;color:var(--muted);display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.rev h4{font-family:var(--f-body);font-size:15px;letter-spacing:0}
.rev p{max-width:65ch}
.star-in{display:flex;gap:4px}
.star-in button{width:34px;height:34px;color:var(--line)}
.star-in button.on{color:var(--brand)}
.star-in svg{width:30px;height:30px}

/* drawer */
.scrim{position:fixed;inset:0;background:rgba(20,6,14,.5);z-index:70}
.drawer{position:fixed;z-index:80;top:0;right:0;bottom:0;width:min(440px,100%);background:var(--surface);display:flex;flex-direction:column;
  transform:translateX(100%);transition:transform .25s ease;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);padding-right:env(safe-area-inset-right,0px)}
.drawer.on{transform:none}
.d-head{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid var(--line)}
.d-head h2{font-size:22px;font-weight:800}
.d-body{flex:1;overflow:auto;padding:4px 20px 16px}
.d-foot{border-top:1px solid var(--line);padding:16px 20px;display:flex;flex-direction:column;gap:10px;background:var(--surface)}
.line{display:grid;grid-template-columns:72px 1fr auto;gap:12px;padding:14px 0;border-bottom:1px solid var(--line);align-items:start}
.line .ph{border-radius:12px}
.line .t{display:flex;flex-direction:column;gap:3px;min-width:0;font-size:14px}
.line .t b{font-weight:600}
.line .mini-q{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;margin-top:4px;width:max-content}
.line .mini-q button{width:30px;height:28px}
.line .mini-q span{min-width:20px;text-align:center;font-size:13px;font-weight:700}
.rm{font-size:12px;color:var(--muted);text-decoration:underline}
.sumrow{display:flex;justify-content:space-between;font-size:14px}
.sumrow.total{font-size:18px;font-weight:800;padding-top:6px}
.sumrow.disc{color:var(--ok);font-weight:600}
.progress{background:var(--sunk);border-radius:var(--r-s);padding:12px 14px;font-size:13px;display:flex;flex-direction:column;gap:8px}
.progress .track{height:6px;border-radius:99px;background:var(--line);overflow:hidden}
.progress .track i{display:block;height:100%;background:var(--brand);border-radius:99px}
.code-row{display:flex;gap:8px}
.code-row input{flex:1;text-transform:uppercase}

/* forms */
.form{display:grid;gap:12px}
.form .row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media (max-width:560px){.form .row2{grid-template-columns:1fr}}
.field{display:flex;flex-direction:column;gap:6px;min-width:0}
.field label{font-size:13px;font-weight:700}
.field .inp,.field .sel{width:100%}
.radio-card{display:flex;gap:12px;align-items:flex-start;border:1.5px solid var(--line);border-radius:14px;padding:14px;cursor:pointer;background:var(--surface)}
.radio-card:has(input:checked){border-color:var(--brand);background:var(--blush)}
.radio-card input{margin-top:3px;accent-color:var(--brand)}
.check{display:flex;gap:10px;align-items:flex-start;font-size:14px}
.check input{margin-top:3px;accent-color:var(--brand)}
.err{color:var(--bad);font-size:13px;font-weight:600}

/* checkout + account layout */
.two{display:grid;grid-template-columns:1.3fr 1fr;gap:30px;padding-block:24px}
@media (max-width:900px){.two{grid-template-columns:1fr}}
.panel{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:20px;display:flex;flex-direction:column;gap:14px;min-width:0}
.panel h2{font-size:20px;font-weight:800}
.panel h3{font-size:16px;font-weight:700;font-family:var(--f-body);letter-spacing:0}
.notice{border-radius:var(--r-s);padding:12px 14px;font-size:14px;background:var(--info-bg);color:var(--ink)}
.notice.warn{background:var(--warn-bg)}
.copybox{display:flex;justify-content:space-between;align-items:center;gap:10px;border:1.5px dashed var(--brand);border-radius:12px;padding:10px 12px;font-weight:700;font-variant-numeric:tabular-nums}
.copybox span{min-width:0;overflow-wrap:anywhere}

.order{border:1px solid var(--line);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:12px}
.order-top{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:4px}
.steps div{display:flex;flex-direction:column;gap:6px;font-size:11.5px;color:var(--muted)}
.steps div i{height:5px;border-radius:99px;background:var(--line)}
.steps div.on{color:var(--ink);font-weight:600}
.steps div.on i{background:var(--brand)}
.mini-items{display:flex;gap:8px;flex-wrap:wrap}
.mini-items .ph{width:52px;border-radius:10px}
.points-card{background:var(--brand);color:var(--on-brand);border-radius:var(--r);padding:20px;display:flex;flex-direction:column;gap:8px}
.points-card .big{font-family:var(--f-display);font-size:40px;font-weight:800;line-height:1}

/* footer */
footer.foot{background:var(--surface);border-top:1px solid var(--line);margin-top:30px}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.4fr;gap:26px;padding-block:36px}
.foot-grid h4{font-family:var(--f-body);font-size:13px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px}
.foot-grid ul{list-style:none;margin:0;padding:0;display:grid;gap:7px;font-size:14px;color:var(--muted)}
.foot-grid button{text-align:left}
.foot-grid .logo{height:46px}
.news{display:flex;gap:8px}
.news input{flex:1}
@media (max-width:820px){.foot-grid{grid-template-columns:1fr 1fr}.foot-grid > :first-child,.foot-grid > :last-child{grid-column:span 2}}

/* toast */
.toast{position:fixed;left:50%;bottom:calc(24px + env(safe-area-inset-bottom,0px));transform:translate(-50%,160%);background:var(--ink);color:var(--bg);padding:12px 18px;border-radius:999px;font-weight:600;font-size:14px;z-index:90;transition:transform .25s;max-width:calc(100% - 32px);text-align:center}
.toast.on{transform:translate(-50%,0)}
@media (max-width:820px){.toast{bottom:calc(86px + env(safe-area-inset-bottom,0px))}}

/* ===== admin ===== */
.adm{padding-block:22px 40px;display:flex;flex-direction:column;gap:18px}
.adm-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.adm-head h1{font-size:30px;font-weight:800}
.adm-tabs{display:flex;gap:6px;overflow-x:auto;border-bottom:1px solid var(--line);scrollbar-width:none}
.adm-tabs button{flex:none;padding:10px 14px;font-weight:700;font-size:14px;color:var(--muted);border-bottom:2.5px solid transparent;margin-bottom:-1px;display:flex;gap:6px;align-items:center}
.adm-tabs button[aria-current="page"]{color:var(--ink);border-color:var(--brand)}
.adm-tabs .pill{padding:1px 7px;font-size:11px}
.kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
@media (max-width:820px){.kpis{grid-template-columns:repeat(2,minmax(0,1fr))}}
.kpi{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:16px;display:flex;flex-direction:column;gap:4px;min-width:0}
.kpi .v{font-family:var(--f-display);font-size:26px;font-weight:800;font-variant-numeric:tabular-nums}
.kpi .l{font-size:12.5px;color:var(--muted);font-weight:600}
.kpi.alert{border-color:var(--warn);background:var(--warn-bg)}
.bars{display:flex;align-items:flex-end;gap:5px;height:150px;padding-top:10px;border-bottom:1px solid var(--line)}
.bars div{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:100%;gap:4px;min-width:0}
.bars i{display:block;width:100%;max-width:26px;background:var(--brand);border-radius:6px 6px 0 0;min-height:2px}
.bars i.zero{background:var(--line)}
.bars-x{display:flex;gap:5px;font-size:10px;color:var(--muted)}
.bars-x span{flex:1;text-align:center;min-width:0}
.tbl-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:var(--r);background:var(--surface)}
table.tbl{border-collapse:collapse;width:100%;font-size:13.5px}
table.tbl th{text-align:left;font-size:12px;color:var(--muted);font-weight:700;padding:10px 12px;border-bottom:1px solid var(--line);white-space:nowrap;background:var(--sunk)}
table.tbl td{padding:10px 12px;border-bottom:1px solid var(--line);vertical-align:top}
table.tbl tr:last-child td{border-bottom:0}
table.tbl td.r,table.tbl th.r{text-align:right;font-variant-numeric:tabular-nums}
.inv-grid{display:grid;grid-template-columns:110px repeat(5,minmax(52px,1fr));gap:6px;align-items:center;font-size:13px}
.inv-grid input{width:100%;height:36px;border:1.5px solid var(--line);border-radius:8px;background:var(--surface);text-align:center;font-variant-numeric:tabular-nums}
.inv-grid input.low{border-color:var(--warn);background:var(--warn-bg)}
.inv-grid input.zero{border-color:var(--bad);background:var(--bad-bg)}
.inv-card{display:grid;grid-template-columns:90px 1fr;gap:16px;background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:16px}
.inv-card .ph{border-radius:12px}
.inv-card .body{display:flex;flex-direction:column;gap:12px;min-width:0}
.inv-top{display:flex;gap:10px;flex-wrap:wrap;align-items:end}
.inv-top .field{width:120px}
.inv-top .field.wide{flex:1;min-width:180px;width:auto}
@media (max-width:640px){.inv-card{grid-template-columns:1fr}.inv-card > .ph{width:90px}}
.toggle{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;cursor:pointer}
.toggle input{width:40px;height:22px;appearance:none;background:var(--line);border-radius:99px;position:relative;cursor:pointer;transition:background .15s;margin:0}
.toggle input::after{content:"";position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .15s}
.toggle input:checked{background:var(--ok)}
.toggle input:checked::after{left:21px}
.req{border:1px solid var(--line);border-left-width:4px;border-radius:12px;padding:16px;background:var(--surface);display:flex;flex-direction:column;gap:10px}
.req.open{border-left-color:var(--warn)}.req.done{border-left-color:var(--ok)}.req.no{border-left-color:var(--muted)}
.row-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.inline-confirm{display:flex;gap:8px;align-items:center;flex-wrap:wrap;background:var(--bad-bg);padding:8px 10px;border-radius:10px;font-size:13px}
.adm-grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media (max-width:900px){.adm-grid2{grid-template-columns:1fr}}
.banner-prev{border-radius:12px;overflow:hidden;border:1px solid var(--line)}
.code-list{display:flex;flex-direction:column;gap:8px}
.code-item{display:flex;gap:10px;align-items:center;justify-content:space-between;border:1px solid var(--line);border-radius:12px;padding:10px 12px;flex-wrap:wrap}
.code-item b{font-variant-numeric:tabular-nums;letter-spacing:.04em}

.co-bar{display:none}
@media (max-width:820px){.co-bar{display:flex;position:fixed;left:0;right:0;bottom:calc(64px + env(safe-area-inset-bottom,0px));z-index:44;background:var(--surface);border-top:1px solid var(--line);padding:10px max(16px,env(safe-area-inset-right,0px)) 10px max(16px,env(safe-area-inset-left,0px));justify-content:space-between;align-items:center;gap:12px}.co-bar .btn{flex:1;max-width:240px}}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
</style>
</head><body>
<script type="application/json" id="cfg">__CONFIG__</script>

<div id="announce"></div>

<header class="top">
  <div class="wrap bar">
    <button onclick="go('home')" aria-label="Gym Babes home"><span class="logo" role="img" aria-label="Gym Babes"></span></button>
    <nav class="nav" aria-label="Main">
      <button data-nav="shop" onclick="go('shop')">Shop all</button>
      <button data-nav="leggings" onclick="go('leggings')">Leggings</button>
      <button data-nav="tops" onclick="go('tops')">Tops &amp; jackets</button>
      <button data-nav="coverage" onclick="go('coverage')">Full-sleeve edit</button>
    </nav>
    <div class="tools">
      <button class="icon-btn hide-m" aria-label="Wishlist" onclick="go('wishlist')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.6 0 5.4 3.7 3.8 6.9C19 15.6 12 20 12 20z"/></svg><span class="count" data-n="0" id="wishN">0</span></button>
      <button class="icon-btn hide-m" aria-label="Track my order" onclick="go('track')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg></button>
      <button class="icon-btn" aria-label="Bag" onclick="openBag()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg><span class="count" data-n="0" id="bagN">0</span></button>
    </div>
  </div>
</header>

<main id="app"></main>

<footer class="foot">
  <div class="wrap foot-grid">
    <div style="display:flex;flex-direction:column;gap:12px">
      <span class="logo" role="img" aria-label="Gym Babes"></span>
      <p class="muted" style="max-width:34ch">Activewear for women who train in the Maldives. Feel confident and crush your fitness goals.</p>
    </div>
    <div><h4>Shop</h4><ul>
      <li><button onclick="go('leggings')">Leggings</button></li>
      <li><button onclick="go('tops')">Tops &amp; jackets</button></li>
      <li><button onclick="go('coverage')">Full-sleeve edit</button></li>
      <li><button onclick="go('shop')">Shop all</button></li></ul></div>
    <div><h4>Help</h4><ul>
      <li><button onclick="go('help')">Delivery &amp; payment</button></li>
      <li><button onclick="go('help')">Size guide</button></li>
      <li><button onclick="go('help')">Returns policy</button></li>
      <li><button onclick="go('track')">Track my order</button></li></ul></div>
    <div style="display:flex;flex-direction:column;gap:10px">
      <h4 style="margin:0">Join the Babe list</h4>
      <p class="muted" style="font-size:14px">New drops and restocks first, plus member-only deals.</p>
      <form class="news" id="newsForm"><label for="newsIn" class="sr">Phone or email</label><input class="inp" id="newsIn" placeholder="Phone or email" autocomplete="email"><button class="btn sm" type="submit">Join</button></form>
      <p class="muted" style="font-size:13px" id="igLine"></p>
    </div>
  </div>
</footer>

<nav class="tabs" aria-label="Quick">
  <button data-tab="home" onclick="go('home')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 11l8-7 8 7v9H4z"/></svg>Home</button>
  <button data-tab="shop" onclick="go('shop')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/></svg>Shop</button>
  <button data-tab="wishlist" onclick="go('wishlist')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.6 0 5.4 3.7 3.8 6.9C19 15.6 12 20 12 20z"/></svg>Saved<span class="count" data-n="0" id="wishN2">0</span></button>
  <button data-tab="track" onclick="go('track')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>Track</button>
  <button onclick="openBag()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>Bag<span class="count" data-n="0" id="bagN2">0</span></button>
</nav>

<div class="scrim" id="scrim" hidden onclick="closeBag()"></div>
<aside class="drawer" id="bag" aria-label="Shopping bag" aria-hidden="true">
  <div class="d-head"><h2>Your bag</h2><button class="icon-btn" aria-label="Close bag" onclick="closeBag()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
  <div class="d-body" id="bagBody"></div>
  <div class="d-foot" id="bagFoot"></div>
</aside>
<div class="toast" id="toast" role="status" aria-live="polite"></div>

<script>
/* ================= CATALOGUE (photos from @gymbabes.mv) ================= */
const SIZES=["XS","S","M","L","XL"];
const CONFIG=JSON.parse(document.getElementById('cfg').textContent||'{}');
const img=src=>/^https?:/.test(src||'')?src:(CONFIG.img||'')+src;
let CATALOG=[];
const DEF_SETTINGS={deliverySlots:null,
  banner:{on:true,text:"Free delivery anywhere in the Maldives. New here? Use WELCOME10 for 10% off your first order.",link:"shop",cta:"Shop now"},
  instagram:"gymbabes.mv", whatsapp:"", bank:{bank:"",acct:"",holder:""}, drivers:[],
  pointsPer:10, redeemStep:100, redeemValue:50, setDeal:10, lowStock:2
};
const SLOTS=["Morning (9am to 12pm)","Afternoon (12pm to 4pm)","Evening (4pm to 8pm)","Night (8pm to 10pm)"];
function deliveryDays(){const out=[];const late=new Date().getHours()>=21;for(let i=late?1:0;i<(late?5:4);i++){const d=new Date();d.setDate(d.getDate()+i);const v=d.toISOString().slice(0,10);out.push({v,l:(i===0?"Today, ":i===1?"Tomorrow, ":"")+d.toLocaleDateString("en-GB",{weekday:i>1?"long":undefined,day:"numeric",month:"short"})})}return out}
const ISLANDS=["Mal\xE9","Hulhumal\xE9","Villimal\xE9","Other island (tell us below)"];
const STATUS=[["review","Payment check"],["confirmed","Confirmed"],["shipped","Out for delivery"],["delivered","Delivered"]];
const normStatus=s=>s==="new"?"review":s;

/* ================= STATE ================= */
const S={loaded:false,loadErr:false,live:true,isAdmin:false,uid:null,settings:structuredClone(DEF_SETTINGS),ov:{},reviews:{},me:null,custs:{},
  cart:[],wish:[],recent:[],route:"home",sel:{},filter:{q:"",sort:"featured"},admTab:"overview",pending:{}};
const store={get(k,d){try{const v=localStorage.getItem("gb_"+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem("gb_"+k,JSON.stringify(v))}catch(e){}}};
S.cart=store.get("cart",[]);S.wish=store.get("wish",[]);S.recent=store.get("recent",[]);

/* ================= HELPERS ================= */
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const mvr=n=>"MVR "+Math.round(n).toLocaleString("en-US");
const fmtDate=t=>new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});
const fmtShort=t=>new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"short"});
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),2600)}
const ICON={
 star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
 starO:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
 heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.6 0 5.4 3.7 3.8 6.9C19 15.6 12 20 12 20z"/></svg>',
 truck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
 bolt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M13 3L5 14h6l-1 7 8-11h-6z"/></svg>',
 chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5h16v11H9l-5 4z"/></svg>',
 ruler:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 16L16 3l5 5L8 21z"/><path d="M7 12l2 2M10 9l2 2M13 6l2 2"/></svg>',
 search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
 shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>'
};
const stars=(r,size)=>'<span class="stars" aria-label="'+r.toFixed(1)+' out of 5">'+[1,2,3,4,5].map(i=>i<=Math.round(r)?ICON.star:ICON.starO).join("")+"</span>";

/* products: source catalogue + live overrides/new products from the back office */
function products(all){return CATALOG.filter(p=>all||p.active!==false).map(p=>({...p,colours:(p.colours||[]).map(c=>({...c,img:img(c.img)})),stock:p.stock||null}))}
function pick(o,keys){const r={};keys.forEach(k=>{if(o[k]!==undefined&&o[k]!==null&&o[k]!=="")r[k]=o[k]});return r}
const prod=id=>products(true).find(p=>p.id===id);
function stockOf(p,ck,sz){const v=p.stock?.[ck]?.[sz];return (v===undefined||v===null||v==="")?null:Number(v)}
function colourAvail(p,ck){return SIZES.some(s=>{const v=stockOf(p,ck,s);return v===null||v>0})}
function inStock(p){return p.colours.some(c=>colourAvail(p,c.k))}
function rating(pid){const rs=allReviews().filter(r=>r.pid===pid&&!r.hidden);if(!rs.length)return null;
  return {avg:rs.reduce((a,r)=>a+r.rating,0)/rs.length,n:rs.length,fit:rs.filter(r=>r.fit).reduce((a,r,_,arr)=>a+({small:0,true:0.5,large:1}[r.fit])/arr.length,0),fitN:rs.filter(r=>r.fit).length,rs}}
function allReviews(){return (S.reviewsList||[]).map(r=>({...r,uid:""}))}
/* ================= ROUTER ================= */
function go(r){if(location.hash!=="#"+r)location.hash=r;else render();window.scrollTo({top:0})}
window.addEventListener("hashchange",()=>{render();window.scrollTo({top:0})});
function route(){return (location.hash||"#home").slice(1)||"home"}

function render(){
  const r=route();S.route=r;
  document.querySelectorAll("[data-nav]").forEach(b=>{if(b.dataset.nav===r)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
  document.querySelectorAll("[data-tab]").forEach(b=>{const on=b.dataset.tab===r||(b.dataset.tab==="shop"&&["leggings","tops","coverage"].includes(r))||(b.dataset.tab==="track"&&r.startsWith("track"));if(on)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
  const app=$("#app");
  if(!S.loaded&&!["track","help"].includes(r)&&!r.startsWith("track-")){app.innerHTML=S.loadErr?\`<div class="wrap empty" style="padding-block:80px"><b>We couldn't load the shop.</b><span>Check your connection and try again.</span><button class="btn" onclick="location.reload()">Try again</button></div>\`:\`<div class="wrap empty" style="padding-block:80px"><span class="logo" role="img" aria-label="Gym Babes" style="height:60px"></span><span>Loading the collection\u2026</span></div>\`;renderChrome();return}
  if(r==="home")app.innerHTML=vHome();
  else if(["shop","leggings","tops","coverage","new"].includes(r))app.innerHTML=vShop(r);
  else if(r==="wishlist")app.innerHTML=vWish();
  else if(r.startsWith("product-"))app.innerHTML=vProduct(r.slice(8));
  else if(r==="checkout")app.innerHTML=vCheckout();
  else if(r.startsWith("thanks-"))app.innerHTML=vThanks(r.slice(7));
  else if(r==="track"||r.startsWith("track-"))app.innerHTML=vTrack(r.startsWith("track-")?r.slice(6):"");
  else if(r==="help")app.innerHTML=vHelp();
  else app.innerHTML=vHome();
  afterRender(r);
  renderChrome();
}
function renderChrome(){
  const n=S.cart.reduce((a,c)=>a+c.qty,0);
  ["#bagN","#bagN2"].forEach(s=>{const e=$(s);e.textContent=n;e.dataset.n=n});
  ["#wishN","#wishN2"].forEach(s=>{const e=$(s);e.textContent=S.wish.length;e.dataset.n=S.wish.length});
  const b=S.settings.banner, dismissed=store.get("bannerX","")===b.text;
  $("#announce").innerHTML=(b.on&&b.text&&!dismissed)?\`<div class="announce"><div class="wrap"><span>\${esc(b.text)}</span>\${b.link?\`<a onclick="go('\${esc(b.link)}')">\${esc(b.cta||"Shop now")}</a>\`:""}<button class="x" aria-label="Dismiss announcement" onclick="dismissBanner()">\xD7</button></div></div>\`:"";
  $("#igLine").innerHTML="Instagram: <b>@"+esc(S.settings.instagram)+"</b>"+(S.settings.whatsapp?" \xB7 WhatsApp: <b>"+esc(S.settings.whatsapp)+"</b>":"");
}
function dismissBanner(){store.set("bannerX",S.settings.banner.text);renderChrome()}

/* ================= STOREFRONT VIEWS ================= */
function card(p){
  const c=p.colours[0], r=rating(p.id), w=S.wish.includes(p.id), out=!inStock(p);
  return \`<div class="card">
    <div style="position:relative">
      <button class="ph" style="width:100%;display:block" onclick="go('product-\${p.id}')" aria-label="\${esc(p.name)}">
        <img src="\${esc(c.img)}" alt="\${esc(p.name)} in \${esc(c.n)}" loading="lazy">
        \${p.badge?\`<span class="badge">\${esc(p.badge)}</span>\`:""}
        \${out?'<span class="soldout">Sold out</span>':""}
      </button>
      <button class="heart" aria-pressed="\${w}" aria-label="Save \${esc(p.name)}" onclick="toggleWish('\${p.id}')">\${ICON.heart}</button>
    </div>
    <div class="meta">
      <button class="nm" style="text-align:left" onclick="go('product-\${p.id}')">\${esc(p.name)}</button>
      <div class="pr num">\${mvr(p.price)}\${p.compareAt>p.price?\`<s>\${mvr(p.compareAt)}</s>\`:""}</div>
      \${r?\`<div class="rate">\${stars(r.avg)} <span>\${r.avg.toFixed(1)} (\${r.n})</span></div>\`:""}
      <div class="dots">\${p.colours.slice(0,6).map(dot).join("")}\${p.colours.length>1?\`<small>\${p.colours.length} colours</small>\`:""}</div>
    </div>
  </div>\`;
}
const dot=c=>\`<i title="\${esc(c.n)}" style="background:\${c.hex2?\`linear-gradient(135deg,\${c.hex} 50%,\${c.hex2} 50%)\`:c.hex}"></i>\`;

function vHome(){
  const ps=products();
  const best=ps.filter(p=>/best/i.test(p.badge||"")).concat(ps.filter(p=>!/best/i.test(p.badge||""))).slice(0,8);
  const revs=allReviews().filter(r=>!r.hidden&&r.rating>=4).slice(0,3);
  const g=id=>prod(id)||ps[0];
  return \`
  <section class="hero"><div class="wrap hero-grid">
    <div class="hero-copy">
      <span class="logo" role="img" aria-label="Gym Babes"></span>
      <h1>Feel confident &amp; <em>crush your fitness goals.</em></h1>
      <p class="lede">Seamless leggings, sculpting jackets and full-sleeve training tops for women who train in the Maldives. Everything is in stock in Mal\xE9, paid cashless and delivered free.</p>
      <div class="ctas"><button class="btn" onclick="go('shop')">Shop the collection</button><button class="btn ghost" onclick="go('coverage')">Full-sleeve edit</button></div>
    </div>
    <div class="collage">
      <button onclick="go('product-sculpt')"><img src="img/sculpt-rose.jpg" alt="Sculpt Seamless Leggings in rose marl"><span class="chip">Sculpt Seamless \xB7 \${mvr(g('sculpt').price)}</span></button>
      <button onclick="go('product-jacket')"><img src="img/jacket-burgundy.jpg" alt="Seamless Zip Jacket in burgundy"><span class="chip">Zip Jacket</span></button>
      <button onclick="go('product-tiedye')"><img src="img/td-emerald.jpg" alt="Tie-Dye Scrunch Leggings in emerald"><span class="chip">Tie-Dye Scrunch</span></button>
    </div>
  </div>
  <div class="wrap"><div class="trust">
    <div>\${ICON.truck}<span><b>Free delivery, Maldives-wide</b><span class="muted">On every order, no minimum</span></span></div>
    <div>\${ICON.bolt}<span><b>Instant purchase</b><span class="muted">In stock in Mal\xE9, ready to send</span></span></div>
    <div>\${ICON.chat}<span><b>Size help before you buy</b><span class="muted">Message us on Instagram</span></span></div>
  </div></div></section>

  <section class="block"><div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Shop by category</p><h2>Built for your training</h2></div></div>
    <div class="cats">
      <button class="cat" onclick="go('leggings')"><img src="img/sculpt-mocha.jpg" alt="" loading="lazy"><span class="lab"><span><b>Leggings</b><br><span>\${ps.filter(p=>p.cat==="leggings").length} styles</span></span><span class="arr">\u2192</span></span></button>
      <button class="cat" onclick="go('tops')"><img src="img/ls-red.jpg" alt="" loading="lazy"><span class="lab"><span><b>Tops &amp; jackets</b><br><span>\${ps.filter(p=>p.cat==="tops").length} styles</span></span><span class="arr">\u2192</span></span></button>
      <button class="cat" onclick="go('coverage')"><img src="img/hood-curve-grey.jpg" alt="" loading="lazy"><span class="lab"><span><b>Full-sleeve edit</b><br><span>Modest coverage</span></span><span class="arr">\u2192</span></span></button>
    </div>
  </div></section>

  <section class="block" style="padding-top:6px"><div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Most loved</p><h2>The Babe favourites</h2></div><button class="link" onclick="go('shop')">Shop all</button></div>
    <div class="grid">\${best.map(card).join("")}</div>
  </div></section>

  <section class="block"><div class="wrap promos">
    <div class="promo pink"><span class="stripes"></span><p class="eyebrow" style="color:inherit;opacity:.85">Set deal</p><h3>Leggings + top = \${S.settings.setDeal}% off</h3><p>Add any leggings and any top or jacket to your bag and the discount applies automatically.</p><div><button class="btn" onclick="go('tops')">Build your set</button></div></div>
    <div class="promo soft"><span class="stripes" style="color:var(--brand)"></span><p class="eyebrow">Babe Points</p><h3>Every MVR \${S.settings.pointsPer} earns a point</h3><p>Check your balance on your order tracking page. Collect 100 points and message us to swap them for \${mvr(50)} off.</p><div><button class="btn dark" onclick="go('track')">Track an order</button></div></div>
  </div></section>

  <section class="block"><div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Real reviews</p><h2>From Babes who bought</h2></div></div>
    \${revs.length?\`<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">\${revs.map(r=>{const p=prod(r.pid);return \`<div class="panel">\${stars(r.rating)}<h3>\${esc(r.title||"Loved it")}</h3><p class="muted">\${esc(r.text)}</p><p style="font-size:13px"><b>\${esc(r.name)}</b> \xB7 <button class="link" onclick="go('product-\${r.pid}')">\${esc(p?.name||"")}</button></p></div>\`}).join("")}</div>\`
    :\`<div class="panel" style="align-items:flex-start"><p>Reviews appear here as soon as customers rate what they bought. Only verified buyers can leave one, so every review is from someone who wore it.</p><button class="btn ghost sm" onclick="go('track')">Bought from us? Leave a review</button></div>\`}
  </div></section>\`;
}

function vShop(r){
  const titles={shop:["Shop all","Every style, in stock in Mal\xE9"],leggings:["Leggings","Seamless, sculpting and full-length"],tops:["Tops & jackets","Tees, long sleeves, hoodies and zips"],coverage:["Full-sleeve edit","Long sleeves, hoods and thumbholes for modest training"]};
  const [t,sub]=titles[r]||titles.shop;
  let ps=products();
  if(r==="leggings")ps=ps.filter(p=>p.cat==="leggings");
  if(r==="tops")ps=ps.filter(p=>p.cat==="tops");
  if(r==="coverage")ps=ps.filter(p=>p.cover);
  const q=S.filter.q.trim().toLowerCase();
  if(q)ps=ps.filter(p=>(p.name+" "+p.colours.map(c=>c.n).join(" ")+" "+p.cat).toLowerCase().includes(q));
  if(S.filter.sort==="low")ps.sort((a,b)=>a.price-b.price);
  if(S.filter.sort==="high")ps.sort((a,b)=>b.price-a.price);
  if(S.filter.sort==="rated")ps.sort((a,b)=>(rating(b.id)?.avg||0)-(rating(a.id)?.avg||0));
  return \`<div class="wrap shop-head">
    <h1>\${esc(t)}</h1><p class="muted">\${esc(sub)}</p>
    <div class="filters" role="group" aria-label="Category">
      \${[["shop","All"],["leggings","Leggings"],["tops","Tops & jackets"],["coverage","Full-sleeve edit"]].map(([k,l])=>\`<button class="fchip" aria-pressed="\${r===k}" onclick="go('\${k}')">\${l}</button>\`).join("")}
    </div>
    <div class="shop-tools">
      <label class="search">\${ICON.search}<span class="sr">Search</span><input id="q" placeholder="Search styles or colours" value="\${esc(S.filter.q)}" oninput="S.filter.q=this.value;refreshGrid()"></label>
      <label class="sr" for="sort">Sort</label>
      <select class="sel" id="sort" onchange="S.filter.sort=this.value;render()">
        \${[["featured","Featured"],["low","Price: low to high"],["high","Price: high to low"],["rated","Top rated"]].map(([v,l])=>\`<option value="\${v}" \${S.filter.sort===v?"selected":""}>\${l}</option>\`).join("")}
      </select>
    </div>
  </div>
  <section class="wrap" style="padding-block:14px 30px" id="gridWrap">
    \${ps.length?\`<div class="grid">\${ps.map(card).join("")}</div>\`:\`<div class="empty"><b>No styles match "\${esc(S.filter.q)}"</b><button class="btn ghost sm" onclick="S.filter.q='';render()">Clear search</button></div>\`}
  </section>\`;
}
function refreshGrid(){const pos=$("#q").selectionStart;render();const i=$("#q");if(i){i.focus();i.setSelectionRange(pos,pos)}}

function vWish(){
  const ps=S.wish.map(prod).filter(Boolean);
  const rec=S.recent.map(prod).filter(p=>p&&!S.wish.includes(p.id)).slice(0,4);
  return \`<div class="wrap shop-head"><h1>Saved styles</h1><p class="muted">Tap the heart on any product to keep it here.</p></div>
  <section class="wrap" style="padding-block:10px 30px">\${ps.length?\`<div class="grid">\${ps.map(card).join("")}</div>\`:\`<div class="empty"><b>Nothing saved yet</b><button class="btn" onclick="go('shop')">Browse the collection</button></div>\`}
  \${rec.length?\`<div class="sec-head" style="margin-top:34px"><h2 style="font-size:24px">Recently viewed</h2></div><div class="grid">\${rec.map(card).join("")}</div>\`:""}</section>\`;
}

function vProduct(id){
  const p=prod(id);
  if(!p||p.active===false&&!S.isAdmin)return \`<div class="wrap empty"><b>This style isn't available right now.</b><button class="btn" onclick="go('shop')">Back to shop</button></div>\`;
  if(!S.recent.includes(id)){S.recent=[id,...S.recent.filter(x=>x!==id)].slice(0,8);store.set("recent",S.recent)}
  const sel=S.sel[id]||(S.sel[id]={ck:(p.colours.find(c=>colourAvail(p,c.k))||p.colours[0]).k,size:null,qty:1});
  const c=p.colours.find(x=>x.k===sel.ck)||p.colours[0];
  const r=rating(id), w=S.wish.includes(id);
  const sizeBtns=SIZES.map(s=>{const v=stockOf(p,c.k,s);const out=v!==null&&v<=0;const low=v!==null&&v>0&&v<=S.settings.lowStock;
    return \`<button class="\${out?"out":""}" aria-pressed="\${sel.size===s}" onclick="pickSize('\${id}','\${s}')" aria-label="\${s}\${out?" sold out":""}">\${s}\${low?\`<span class="low">\${v} left</span>\`:""}</button>\`}).join("");
  const selOut=sel.size&&(stockOf(p,c.k,sel.size)??1)<=0;
  const bought=false, myRev=false;
  const pair=products().filter(x=>x.cat!==p.cat&&x.id!==id).slice(0,4);
  return \`<div class="wrap">
  <div class="pdp">
    <div class="gallery">
      <div class="main"><img src="\${esc(c.img)}" alt="\${esc(p.name)} in \${esc(c.n)}"></div>
      \${p.colours.length>1?\`<div class="thumbs">\${p.colours.map(x=>\`<button aria-pressed="\${x.k===c.k}" aria-label="\${esc(x.n)}" onclick="pickColour('\${id}','\${x.k}')"><img src="\${esc(x.img)}" alt=""></button>\`).join("")}</div>\`:""}
    </div>
    <div class="buy">
      <p class="crumbs"><button onclick="go('shop')">Shop</button> / <button onclick="go('\${p.cat==="leggings"?"leggings":"tops"}')">\${p.cat==="leggings"?"Leggings":"Tops & jackets"}</button></p>
      <div style="display:flex;flex-direction:column;gap:10px">
        \${p.badge?\`<span><span class="badge soft">\${esc(p.badge)}</span></span>\`:""}
        <h1>\${esc(p.name)}</h1>
        <div class="price-l num">\${mvr(p.price)}\${p.compareAt>p.price?\`<s>\${mvr(p.compareAt)}</s>\`:""}</div>
        \${r?\`<button class="rate" style="font-size:14px" onclick="document.getElementById('reviews').scrollIntoView({behavior:'smooth'})">\${stars(r.avg)} <span>\${r.avg.toFixed(1)} \xB7 \${r.n} review\${r.n>1?"s":""}</span></button>\`:\`<span class="rate">No reviews yet</span>\`}
      </div>
      <p>\${esc(p.desc)}</p>
      <div><div class="opt-lab">Colour <span>\${esc(c.n)}</span></div>
        <div class="swatches">\${p.colours.map(x=>\`<button aria-pressed="\${x.k===c.k}" aria-label="\${esc(x.n)}" title="\${esc(x.n)}" style="background:\${x.hex2?\`linear-gradient(135deg,\${x.hex} 50%,\${x.hex2} 50%)\`:x.hex}" onclick="pickColour('\${id}','\${x.k}')"></button>\`).join("")}</div></div>
      <div><div class="opt-lab">Size <button class="link" style="font-size:13px" onclick="document.getElementById('sg').open=true;document.getElementById('sg').scrollIntoView({behavior:'smooth',block:'center'})">Size guide</button></div>
        <div class="sizes">\${sizeBtns}</div>
        \${r&&r.fitN?\`<div class="fitbar" style="margin-top:22px"><span>Runs small</span><span class="track"><i style="left:\${(r.fit*100).toFixed(0)}%"></i></span><span>Runs large</span></div><p class="muted" style="font-size:12px;margin-top:4px">Based on \${r.fitN} buyer\${r.fitN>1?"s":""}</p>\`:""}
      </div>
      \${selOut?\`<div class="notice warn" style="display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap"><span><b>\${sel.size} is sold out</b> in \${esc(c.n)}.</span><form class="code-row" style="flex:1 1 100%" onsubmit="event.preventDefault();notifyMe('\${id}')"><label class="sr" for="nfy">Phone or email</label><input class="inp" id="nfy" placeholder="Phone or email" style="flex:1"><button class="btn sm dark">Notify me</button></form></div>\`:""}
      <div class="buy-row">
        <div class="qty"><button aria-label="Fewer" onclick="chQty('\${id}',-1)">\u2212</button><span class="num">\${sel.qty}</span><button aria-label="More" onclick="chQty('\${id}',1)">+</button></div>
        <button class="btn" \${selOut?"disabled":""} onclick="addToBag('\${id}')">\${sel.size?"Add to bag \xB7 "+mvr(p.price*sel.qty):"Choose a size"}</button>
        <button class="icon-btn" style="border:1.5px solid var(--line);width:50px;height:50px;\${w?"color:var(--brand)":""}" aria-pressed="\${w}" aria-label="Save" onclick="toggleWish('\${id}')">\${w?ICON.heart.replace('fill="none"','fill="currentColor"'):ICON.heart}</button>
      </div>
      <div class="perks-l">
        <div>\${ICON.truck}<span><b>Free delivery</b> anywhere in the Maldives</span></div>
        <div>\${ICON.bolt}<span><b>In stock in Mal\xE9</b>, sent as soon as payment is verified</span></div>
        <div>\${ICON.star}<span>Earn <b>\${Math.floor(p.price/S.settings.pointsPer)} Babe Points</b> with this item</span></div>
      </div>
      <div>
        <details class="acc" open><summary>Details</summary><div class="body"><ul>\${(p.feats||[]).map(f=>\`<li>\${esc(f)}</li>\`).join("")}</ul></div></details>
        <details class="acc" id="sg"><summary>Size &amp; fit guide</summary><div class="body">\${sizeTable()}</div></details>
        <details class="acc"><summary>Delivery &amp; returns</summary><div class="body"><p>Free delivery to every island. Pick your preferred day and time at checkout; we email you when your order is confirmed and when it's on its way.</p><p>All sales are final: we don't offer change-of-mind refunds or exchanges, so check the size guide or message us first. If something arrives wrong or faulty, report it from your order tracking page within 48 hours and we'll put it right.</p></div></details>
      </div>
    </div>
  </div>

  <section class="block" id="reviews">
    <div class="sec-head"><div><p class="eyebrow">Reviews</p><h2>What buyers say</h2></div></div>
    <div class="rev-wrap">
      <div class="rev-sum">
        \${r?\`<div class="big num">\${r.avg.toFixed(1)}</div>\${stars(r.avg)}<p class="muted">\${r.n} verified review\${r.n>1?"s":""}</p>\`:\`<b>No reviews yet</b><p class="muted">Only customers who received this item can review it.</p>\`}
        \${bought&&!myRev?\`\`:myRev?\`<span class="pill ok">You reviewed this</span>\`:""}
      </div>
      <div class="rev-list" id="revForm-\${id}">
        \${r?r.rs.map(rv=>\`<div class="rev">\${stars(rv.rating)}<h4>\${esc(rv.title||"")}</h4><p>\${esc(rv.text)}</p><p class="who"><b>\${esc(rv.name)}</b><span class="pill ok">Verified buyer</span>\${rv.size?\`<span>Bought \${esc(rv.size)}</span>\`:""}\${rv.fit?\`<span>Fit: \${{small:"runs small",true:"true to size",large:"runs large"}[rv.fit]}</span>\`:""}<span>\${fmtDate(rv.at)}</span></p></div>\`).join(""):\`<div class="empty" style="padding:24px"><span>Be the first to share how it fits.</span></div>\`}
      </div>
    </div>
  </section>

  \${pair.length?\`<section class="block" style="padding-top:0"><div class="sec-head"><div><p class="eyebrow">Complete the set \xB7 \${S.settings.setDeal}% off together</p><h2>Pair it with</h2></div></div><div class="grid">\${pair.map(card).join("")}</div></section>\`:""}
  </div>\`;
}
function sizeTable(){return \`<table class="sg"><thead><tr><th>Size</th><th>Waist (cm)</th><th>Hip (cm)</th><th>Bust (cm)</th></tr></thead><tbody>
  <tr><td>XS</td><td>60\u201364</td><td>86\u201390</td><td>78\u201382</td></tr><tr><td>S</td><td>64\u201368</td><td>90\u201396</td><td>82\u201386</td></tr><tr><td>M</td><td>68\u201374</td><td>96\u2013102</td><td>86\u201392</td></tr><tr><td>L</td><td>74\u201380</td><td>102\u2013108</td><td>92\u201398</td></tr><tr><td>XL</td><td>80\u201386</td><td>108\u2013114</td><td>98\u2013104</td></tr></tbody></table>
  <p>A general guide; seamless styles stretch. Between sizes? Size down for a firmer, sculpted hold or up for comfort. Unsure? Message us on Instagram before you order.</p>\`}

function pickColour(id,k){S.sel[id].ck=k;S.sel[id].size=null;render()}
function pickSize(id,s){S.sel[id].size=s;render()}
function chQty(id,d){const s=S.sel[id];s.qty=Math.max(1,Math.min(10,s.qty+d));render()}
function toggleWish(id){const on=S.wish.includes(id);S.wish=on?S.wish.filter(x=>x!==id):[...S.wish,id];store.set("wish",S.wish);toast(on?"Removed from saved":"Saved for later");render()}
function addToBag(id){
  const s=S.sel[id];if(!s.size){toast("Choose a size first");return}
  const p=prod(id), v=stockOf(p,s.ck,s.size);
  const ex=S.cart.find(c=>c.pid===id&&c.ck===s.ck&&c.size===s.size);
  const want=(ex?ex.qty:0)+s.qty;
  if(v!==null&&want>v){toast(\`Only \${v} left in \${s.size}\`);return}
  ex?ex.qty=want:S.cart.push({pid:id,ck:s.ck,size:s.size,qty:s.qty});
  saveCart();openBag();
}
function saveCart(){store.set("cart",S.cart);renderChrome()}

/* ================= BAG + PRICING ================= */
function lines(){return S.cart.map(c=>{const p=prod(c.pid);if(!p)return null;const col=p.colours.find(x=>x.k===c.ck)||p.colours[0];return {...c,p,col,price:p.price,sum:p.price*c.qty}}).filter(Boolean)}
function pricing(){
  const L=lines(), sub=L.reduce((a,l)=>a+l.sum,0), st=S.settings;
  const hasLeg=L.some(l=>l.p.cat==="leggings"), hasTop=L.some(l=>l.p.cat==="tops");
  const opts=[];
  if(hasLeg&&hasTop&&st.setDeal>0)opts.push({label:\`Set deal (\${st.setDeal}%)\`,amt:Math.round(sub*st.setDeal/100)});
  const q=CO.quote; if(q&&q.key===quoteKey()&&q.discount&&/^Code /.test(q.discountLabel))opts.push({label:q.discountLabel,amt:q.discount});
  const best=opts.sort((a,b)=>b.amt-a.amt)[0]||null;
  return {L,sub,disc:best,codeMsg:CO.quote?.codeMsg||"",total:Math.max(0,sub-(best?.amt||0)),hasLeg,hasTop};
}
function quoteKey(){return JSON.stringify([S.cart,CO.code,normPhone(CO.form?.phone||"")])}
const normPhone=p=>String(p||"").replace(/[^\\d+]/g,"").replace(/^\\+?960/,"");

let CO={code:store.get("code",""),file:null,quote:null,form:null};
function openBag(){renderBag();$("#scrim").hidden=false;$("#bag").classList.add("on");$("#bag").setAttribute("aria-hidden","false")}
function closeBag(){$("#scrim").hidden=true;$("#bag").classList.remove("on");$("#bag").setAttribute("aria-hidden","true")}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeBag()});
function renderBag(){
  const P=pricing();
  if(!P.L.length){$("#bagBody").innerHTML=\`<div class="empty"><b>Your bag is empty</b><span>Start with our bestselling Sculpt Seamless Leggings.</span><button class="btn" onclick="closeBag();go('product-sculpt')">Shop leggings</button></div>\`;$("#bagFoot").innerHTML="";return}
  const nudge=P.hasLeg&&!P.hasTop?\`Add a top to unlock the \${S.settings.setDeal}% set deal.\`:!P.hasLeg&&P.hasTop?\`Add leggings to unlock the \${S.settings.setDeal}% set deal.\`:\`Set deal unlocked: \${S.settings.setDeal}% off.\`;
  $("#bagBody").innerHTML=\`<div class="progress" style="margin-top:14px"><span>\${ICON.truck.replace("<svg",'<svg style="width:16px;height:16px;vertical-align:-3px;color:var(--brand)"')} Free delivery included \xB7 \${nudge}</span><span class="track"><i style="width:\${P.hasLeg&&P.hasTop?100:50}%"></i></span></div>\`+
   P.L.map((l,i)=>\`<div class="line"><button class="ph" onclick="closeBag();go('product-\${l.pid}')"><img src="\${esc(l.col.img)}" alt=""></button>
     <div class="t"><b>\${esc(l.p.name)}</b><span class="muted">\${esc(l.col.n)} \xB7 \${l.size}</span>
     <span class="mini-q"><button aria-label="Fewer" onclick="lineQty(\${i},-1)">\u2212</button><span class="num">\${l.qty}</span><button aria-label="More" onclick="lineQty(\${i},1)">+</button></span></div>
     <div style="display:flex;flex-direction:column;align-items:end;gap:6px"><b class="num">\${mvr(l.sum)}</b><button class="rm" onclick="lineQty(\${i},-99)">Remove</button></div></div>\`).join("");
  $("#bagFoot").innerHTML=\`
    <div class="sumrow"><span>Subtotal</span><span class="num">\${mvr(P.sub)}</span></div>
    \${P.disc?\`<div class="sumrow disc"><span>\${esc(P.disc.label)}</span><span class="num">\u2212\${mvr(P.disc.amt)}</span></div>\`:""}
    <div class="sumrow"><span>Delivery</span><span>Free</span></div>
    <div class="sumrow total"><span>Total</span><span class="num">\${mvr(P.sub-(P.disc?.amt||0))}</span></div>
    <button class="btn block" onclick="closeBag();go('checkout')">Checkout</button>
    <button class="btn ghost block sm" onclick="closeBag()">Keep shopping</button>\`;
}
function lineQty(i,d){const c=S.cart[i];const p=prod(c.pid);const v=stockOf(p,c.ck,c.size);c.qty+=d;if(v!==null&&c.qty>v){c.qty=v;toast(\`Only \${v} left\`)}if(c.qty<=0)S.cart.splice(i,1);saveCart();renderBag()}

/* ================= CHECKOUT ================= */
function vCheckout(){
  const P=pricing();
  if(!P.L.length)return \`<div class="wrap empty"><b>Your bag is empty</b><button class="btn" onclick="go('shop')">Shop the collection</button></div>\`;
  const prof=store.get("profile",{}), F=CO.form||{}, v=k=>esc(F[k]??prof[k]??"");
  const st=S.settings, island=F.island??prof.island??ISLANDS[0], other=!ISLANDS.slice(0,-1).includes(island);
  const days=deliveryDays(), day=F.day&&days.some(d=>d.v===F.day)?F.day:days[0].v, slots=slotsFor(day);
  const ready=!!st.bank?.acct;
  return \`<div class="wrap two">
  <form class="form" id="coForm" novalidate oninput="saveForm()" onchange="saveForm()" onsubmit="event.preventDefault()">
    <h1 style="font-size:32px;font-weight:800">Checkout</h1>
    \${ready?"":\`<div class="notice warn">Online checkout opens shortly. Message @\${esc(st.instagram)} on Instagram to order today.</div>\`}
    <div class="panel"><h2>Contact</h2>
      <div class="field"><label for="fN">Full name</label><input class="inp" id="fN" autocomplete="name" maxlength="80" value="\${v("name")}" required></div>
      <div class="row2"><div class="field"><label for="fP">Contact number</label><input class="inp" id="fP" type="tel" inputmode="tel" autocomplete="tel" placeholder="7xx xxxx" maxlength="16" value="\${v("phone")}" required></div>
      <div class="field"><label for="fE">Email</label><input class="inp" id="fE" type="email" inputmode="email" autocomplete="email" placeholder="you@example.com" maxlength="254" value="\${v("email")}" required></div></div>
      <span class="muted" style="font-size:12.5px">We email your receipt and delivery updates. Your number is used to find your order and by the driver.</span>
    </div>
    <div class="panel"><h2>Delivery</h2>
      <div class="row2"><div class="field"><label for="fI">Island</label><select class="sel" id="fI" onchange="saveForm();render()">\${ISLANDS.map(i=>\`<option \${(other?i===ISLANDS.at(-1):island===i)?"selected":""}>\${esc(i)}</option>\`).join("")}</select></div>
      \${other?\`<div class="field"><label for="fIo">Which island?</label><input class="inp" id="fIo" maxlength="60" placeholder="e.g. Thulusdhoo" value="\${esc(other&&island!==ISLANDS.at(-1)?island:"")}"></div>\`:\`<div class="field"><label for="fA">House / building and road</label><input class="inp" id="fA" autocomplete="street-address" maxlength="200" value="\${v("address")}" required></div>\`}</div>
      \${other?\`<div class="field"><label for="fA">Address on the island</label><input class="inp" id="fA" autocomplete="street-address" maxlength="200" value="\${v("address")}" required></div>\`:""}
      <div class="row2"><div class="field"><label for="fD">Preferred day</label><select class="sel" id="fD" onchange="saveForm();render()">\${days.map(d=>\`<option value="\${d.v}" \${day===d.v?"selected":""}>\${d.l}</option>\`).join("")}</select></div>
      <div class="field"><label for="fS">Preferred time</label><select class="sel" id="fS">\${slots.map(x=>\`<option \${F.slot===x?"selected":""}>\${x}</option>\`).join("")}</select></div></div>
      <div class="field"><label for="fX">Delivery notes (optional)</label><textarea class="inp" id="fX" rows="2" maxlength="400" placeholder="Floor, landmark or anything the driver should know">\${esc(F.note||"")}</textarea></div>
      <p class="muted" style="font-size:13px">\${other?"For islands outside Greater Mal\xE9 we arrange ferry or cargo with you after payment.":"Free delivery. Your order goes out once the payment is verified; we'll contact you if your chosen time isn't possible."}</p>
    </div>
    <div class="panel"><h2>Payment</h2>
      <p>We're cashless. Transfer <b class="num">\${mvr(P.total)}</b> from any local bank app, then attach the receipt below.</p>
      \${ready?\`<div class="copybox"><span>\${esc(st.bank.bank)} \xB7 \${esc(st.bank.acct)}\${st.bank.holder?" \xB7 "+esc(st.bank.holder):""}</span><button type="button" class="btn sm dark" onclick="copyText('\${esc(st.bank.acct)}').then(ok=>toast(ok?'Account number copied':'Select and copy the number'))">Copy</button></div>\`:""}
      <div class="field"><label for="fR">Transfer receipt</label>
        <label class="radio-card" style="align-items:center" for="fR"><span style="flex:1;min-width:0"><b style="overflow-wrap:anywhere">\${CO.file?esc(CO.file.name):"Attach a screenshot or PDF of your receipt"}</b><br><span class="muted" style="font-size:13px">\${CO.file?"Tap to replace":"JPG, PNG, HEIC or PDF, up to 8 MB"}</span></span><span class="btn sm \${CO.file?"ghost":""}">\${CO.file?"Change":"Choose file"}</span></label>
        <input id="fR" type="file" accept="image/*,application/pdf" class="sr" onchange="pickReceipt(this)"></div>
    </div>
    <label class="check"><input type="checkbox" id="fM" \${F.marketing!==false?"checked":""}> <span>Email me new drops, restocks and member deals.</span></label>
    <label class="check"><input type="checkbox" id="fT" \${F.terms?"checked":""}> <span>I understand all sales are final, with no change-of-mind refunds or exchanges. Wrong or faulty items can be reported within 48 hours of delivery.</span></label>
    <p class="err" id="coErr" role="alert" hidden></p>
  </form>
  <aside><div class="panel" style="position:sticky;top:90px">
    <h2>Order summary</h2>
    \${P.L.map(l=>\`<div class="line" style="grid-template-columns:56px 1fr auto;padding:8px 0"><span class="ph"><img src="\${esc(l.col.img)}" alt=""></span><span class="t"><b>\${esc(l.p.name)}</b><span class="muted">\${esc(l.col.n)} \xB7 \${l.size} \xB7 \xD7\${l.qty}</span></span><b class="num">\${mvr(l.sum)}</b></div>\`).join("")}
    <div class="field"><label for="code">Discount code</label><div class="code-row"><input class="inp" id="code" maxlength="30" value="\${esc(CO.code)}" placeholder="e.g. WELCOME10" autocapitalize="characters"><button class="btn sm dark" type="button" onclick="applyCode()">Apply</button></div>\${P.codeMsg?\`<span class="err">\${esc(P.codeMsg)}</span>\`:""}</div>
    <div class="sumrow"><span>Subtotal</span><span class="num">\${mvr(P.sub)}</span></div>
    \${P.disc?\`<div class="sumrow disc"><span>\${esc(P.disc.label)}</span><span class="num">\u2212\${mvr(P.disc.amt)}</span></div>\`:""}
    <div class="sumrow"><span>Delivery</span><span>Free</span></div>
    <div class="sumrow total"><span>Total</span><span class="num">\${mvr(P.total)}</span></div>
    <p class="muted" style="font-size:13px">You'll earn \${Math.floor(P.total/(st.pointsPer||10))} Babe Points when this order is delivered.</p>
    <button class="btn block" id="placeBtn" \${ready?"":"disabled"} onclick="placeOrder()">Place order \xB7 \${mvr(P.total)}</button>
  </div></aside></div>
  <div class="co-bar"><span><span class="muted" style="font-size:12px">Total</span><br><b class="num">\${mvr(P.total)}</b></span><button class="btn" \${ready?"":"disabled"} onclick="placeOrder()">Place order</button></div>\`;
}
function slotsFor(day){const today=new Date().toISOString().slice(0,10)===day, h=new Date().getHours();return SLOTS.filter((x,i)=>!today||[12,16,20,22][i]-1>h)}
function saveForm(){const g=id=>document.getElementById(id);if(!g("fN"))return;const isl=g("fI").value;
  CO.form={...(CO.form||{}),name:g("fN").value,phone:g("fP").value,email:g("fE").value,island:isl===ISLANDS.at(-1)?(g("fIo")?.value.trim()||ISLANDS.at(-1)):isl,address:g("fA")?.value||"",day:g("fD").value,slot:g("fS").value,note:g("fX").value,marketing:g("fM").checked,terms:g("fT").checked}}
function pickReceipt(inp){const f=inp.files[0];if(!f)return;if(f.size>8e6){toast("That file is over 8 MB. Try a screenshot instead");return}saveForm();CO.file=f;render()}
async function applyCode(){saveForm();CO.code=$("#code").value.trim().toUpperCase();store.set("code",CO.code);
  if(!CO.code){CO.quote=null;render();return}
  try{const r=await api("/api/quote",{items:S.cart,code:CO.code,phone:CO.form?.phone||""});CO.quote={...r,key:quoteKey()};toast(r.codeMsg||"Code applied")}
  catch(e){toast(e.message)}render()}
async function api(path,body){const r=await fetch(path,body?{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)}:{});let d={};try{d=await r.json()}catch(_){}
  if(!r.ok)throw new Error(d.error||"Something went wrong. Please try again.");return d}
function orderText(o){return \`Gym Babes order \${o.id}\\n\\n\`+o.items.map((i,n)=>\`\${n+1}. \${i.name} | \${i.colour} | \${i.size} | x\${i.qty} | \${mvr(i.price*i.qty)}\`).join("\\n")+\`\\n\\nTotal: \${mvr(o.total)}\`}
async function copyText(t){try{await navigator.clipboard.writeText(t);return true}catch(e){try{const a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();const ok=document.execCommand("copy");a.remove();return ok}catch(_){return false}}}
async function placeOrder(){
  saveForm();const F=CO.form||{}, err=$("#coErr");
  const fail=m=>{err.hidden=false;err.textContent=m;err.scrollIntoView({block:"center",behavior:"smooth"})};
  const miss=[!F.name?.trim()&&"name",!F.phone?.trim()&&"contact number",!F.email?.trim()&&"email",!F.address?.trim()&&"delivery address"].filter(Boolean);
  if(miss.length)return fail("Please add your "+miss.join(", ")+".");
  if(!/^[3-9]\\d{6}$/.test(normPhone(F.phone)))return fail("Please enter a 7-digit Maldivian contact number.");
  if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(F.email.trim()))return fail("Please check your email address.");
  if(F.island===ISLANDS.at(-1))return fail("Tell us which island you're on.");
  if(!CO.file)return fail("Attach your transfer receipt so we can confirm your order.");
  if(!F.terms)return fail("Please tick to confirm you've read the returns policy.");
  err.hidden=true;
  const btns=document.querySelectorAll("#placeBtn,.co-bar .btn");btns.forEach(b=>{b.disabled=true;b.textContent="Placing order\u2026"});
  const fd=new FormData();
  fd.append("order",JSON.stringify({items:S.cart,code:CO.code,name:F.name,phone:F.phone,email:F.email,address:F.address,island:F.island,deliverDay:F.day,deliverSlot:F.slot,note:F.note,marketing:F.marketing,terms:F.terms}));
  fd.append("receipt",CO.file,CO.file.name);
  try{
    const r=await fetch("/api/orders",{method:"POST",body:fd});let d={};try{d=await r.json()}catch(_){}
    if(!r.ok)throw new Error(d.error||"We couldn't place your order. Please try again.");
    store.set("profile",{name:F.name,phone:F.phone,email:F.email,address:F.address,island:F.island});
    const mine=store.get("myOrders",[]).filter(x=>x.id!==d.order.id);mine.unshift({id:d.order.id,t:d.track,at:Date.now()});store.set("myOrders",mine.slice(0,10));
    S.lastOrder=d.order;S.cart=[];saveCart();CO={code:"",file:null,quote:null,form:null};store.set("code","");go("thanks-"+d.order.id);
  }catch(e){btns.forEach(b=>{b.disabled=false;b.textContent="Place order"});fail(e.message)}
}
function vThanks(id){
  const o=S.lastOrder&&S.lastOrder.id===id?S.lastOrder:null;
  if(!o)return \`<div class="wrap empty"><b>Order \${esc(id)}</b><button class="btn" onclick="go('track-\${esc(id)}')">Track this order</button></div>\`;
  return \`<div class="wrap" style="max-width:720px;padding-block:34px;display:flex;flex-direction:column;gap:18px">
    <span class="logo" role="img" aria-label="Gym Babes" style="height:56px"></span>
    <h1 style="font-size:34px;font-weight:800">Thank you, \${esc(o.name.split(" ")[0])}! Your order is in.</h1>
    <div class="copybox"><span>Order number: \${esc(o.id)}</span><button class="btn sm dark" onclick="copyText('\${esc(o.id)}').then(ok=>toast(ok?'Order number copied':'Note it down'))">Copy</button></div>
    <div class="panel"><h2>What happens next</h2>
      <ol style="margin:0;padding-left:20px;display:grid;gap:8px"><li>We check your transfer of <b>\${mvr(o.total)}</b> against our bank account.</li><li>You get an email receipt with photos of your items as soon as it's confirmed.</li><li>A driver brings your order\${o.deliverSlot?\` around your chosen time (\${esc(o.deliverSlot)})\`:""}, and we email you their name and number.</li></ol>
      <p class="muted" style="font-size:13px">Track it any time with your order number and phone number.</p></div>
    <div class="row-actions"><button class="btn dark" onclick="go('track-\${esc(o.id)}')">Track my order</button><button class="btn ghost" onclick="go('shop')">Keep shopping</button></div>
  </div>\`;
}

/* ================= ACCOUNT ================= */

function vTrack(pre){
  const mine=store.get("myOrders",[]), T=S.track;
  const found=T&&T.order&&(!pre||T.order.id===pre);
  if(pre&&!found&&!S.trackBusy){const m=mine.find(x=>x.id===pre);if(m)setTimeout(()=>lookup(pre,"",m.t),0)}
  return \`<div class="wrap two">
   <div style="display:flex;flex-direction:column;gap:16px;min-width:0">
     <h1 style="font-size:32px;font-weight:800">Track my order</h1>
     \${found?trackResult(T):\`<form class="panel form" onsubmit="event.preventDefault();lookup($('#tId').value,$('#tPh').value)">
       <div class="row2"><div class="field"><label for="tId">Order number</label><input class="inp" id="tId" value="\${esc(pre||"")}" placeholder="GB-XXXXXXXX" autocapitalize="characters" maxlength="12" required></div>
       <div class="field"><label for="tPh">Phone number used</label><input class="inp" id="tPh" type="tel" inputmode="tel" placeholder="7xx xxxx" maxlength="16" required></div></div>
       <p class="err" id="tErr" role="alert" hidden></p>
       <div><button class="btn" \${S.trackBusy?"disabled":""}>\${S.trackBusy?"Finding your order\u2026":"Find my order"}</button></div></form>\`}
   </div>
   <aside style="display:flex;flex-direction:column;gap:16px">
     \${mine.length?\`<div class="panel"><h3>Orders on this device</h3>\${mine.map(m=>\`<button class="link" style="text-align:left" onclick="lookup('\${esc(m.id)}','','\${esc(m.t)}')">\${esc(m.id)} \xB7 \${fmtDate(m.at)}</button>\`).join("")}</div>\`:""}
     <div class="panel"><h3>Returns policy</h3><p class="muted" style="font-size:14px">All sales are final. If an item arrives wrong or faulty, use \u201CReport a problem\u201D on your order within 48 hours of delivery and we'll put it right.</p></div>
   </aside></div>\`;
}
async function lookup(id,phone,t){
  id=String(id||"").trim().toUpperCase();if(!id)return;S.trackBusy=true;if(route()!=="track-"+id)location.hash="track-"+id;else render();
  try{const qs=new URLSearchParams({id,...(phone?{phone}:{}),...(t?{t}:{})});const d=await api("/api/track?"+qs);S.track={...d,phone:normPhone(phone)};
    const mine=store.get("myOrders",[]).filter(x=>x.id!==id);mine.unshift({id,t:d.token,at:d.order.at});store.set("myOrders",mine.slice(0,10))}
  catch(e){S.track=null;S.trackErr=e.message;setTimeout(()=>{const x=$("#tErr");if(x){x.hidden=false;x.textContent=e.message}},0)}
  S.trackBusy=false;render()}
function trackResult(T){const o=T.order;
  const toReview=o.status==="delivered"?o.items.filter((i,ix,a)=>a.findIndex(x=>x.pid===i.pid)===ix&&!T.reviewed.includes(i.pid)):[];
  return \`\${orderCard(o)}
   <div class="points-card"><span>Babe Points on this number</span><span class="big num">\${T.points}</span><span>\${T.points>=100?\`Message us on Instagram to swap 100 points for \${mvr(50)} off.\`:\`\${100-T.points} more points until your first reward.\`}</span></div>
   \${toReview.length?\`<div class="panel"><h2>Review your items</h2><p class="muted">Help other Babes choose their size.</p>\${toReview.map(i=>\`<div class="line" style="grid-template-columns:56px 1fr auto;padding:8px 0"><span class="ph"><img src="\${esc(img(i.img))}" alt=""></span><span class="t"><b>\${esc(i.name)}</b><span class="muted">\${esc(i.colour)} \xB7 \${esc(i.size)}</span></span><button class="btn sm" onclick="openReview('\${esc(i.pid)}')">Review</button></div><div id="revForm-\${esc(i.pid)}"></div>\`).join("")}</div>\`:""}
   <div><button class="btn ghost sm" onclick="S.track=null;go('track')">Track another order</button></div>\`}
function orderCard(o){
  const stt=o.status, idx=Math.max(0,STATUS.findIndex(s=>s[0]===stt));
  const st=stt==="cancelled"?\`<span class="pill bad">Cancelled</span>\`:stt==="refunded"?\`<span class="pill mute">Refunded</span>\`:\`<span class="pill \${stt==="delivered"?"ok":stt==="review"?"warn":"info"}">\${STATUS[idx][1]}</span>\`;
  const canReport=stt==="delivered"&&!o.request&&(Date.now()-(o.deliveredAt||o.at))<48*3600e3;
  const pay=o.payStatus==="verified"||o.paid?'<span class="pill ok">Payment verified</span>':o.payStatus==="rejected"?'<span class="pill bad">Receipt not accepted</span>':'<span class="pill warn">Payment being checked</span>';
  return \`<div class="order">
    <div class="order-top"><span><b class="num">\${esc(o.id)}</b> <span class="muted">\xB7 \${fmtDate(o.at)}</span></span>\${st}</div>
    \${["cancelled","refunded"].includes(stt)?"":\`<div class="steps">\${STATUS.map((s,i)=>\`<div class="\${i<=idx?"on":""}"><i></i>\${s[1]}</div>\`).join("")}</div>\`}
    <div class="mini-items">\${o.items.map(i=>\`<span class="ph" title="\${esc(i.name)}"><img src="\${esc(img(i.img))}" alt="\${esc(i.name)}"></span>\`).join("")}</div>
    <div class="order-top"><span class="muted" style="font-size:13px">\${o.items.reduce((a,i)=>a+i.qty,0)} item(s) \xB7 \${pay}</span><b class="num">\${mvr(o.total)}</b></div>
    \${o.deliverSlot?\`<p class="muted" style="font-size:13px">Preferred delivery: \${esc(fmtSlot(o))}</p>\`:""}
    \${o.payStatus==="rejected"&&stt==="review"?\`<div class="notice warn"><b>We couldn't match this receipt to a payment.</b>\${o.rejectReason?" "+esc(o.rejectReason):""}<div class="row-actions" style="margin-top:8px"><label class="btn sm" for="ru-\${o.id}">Upload a new receipt</label><input id="ru-\${o.id}" class="sr" type="file" accept="image/*,application/pdf" onchange="reupload('\${o.id}',this)"></div></div>\`:""}
    \${stt==="shipped"&&o.driver?\`<div class="notice">Out for delivery with <b>\${esc(o.driver.name)}</b>\${o.driver.vehicle?" ("+esc(o.driver.vehicle)+")":""}. Driver's number: <b class="num">\${esc(o.driver.phone)}</b></div>\`:""}
    \${o.request?\`<div class="notice \${o.request.status==="open"?"warn":""}"><b>\${o.request.type==="refund"?"Refund request":"Problem reported"}:</b> \${esc(o.request.reason)} \xB7 <b>\${{open:"Under review",approved:"Approved",resolved:"Resolved",rejected:"Declined"}[o.request.status]}</b>\${o.request.resolution?\`<br>\${esc(o.request.resolution)}\`:""}</div>\`:""}
    \${canReport?\`<div class="row-actions"><button class="btn sm ghost" onclick="openReport('\${o.id}')">Report a problem</button></div>\`:""}
    <div id="rep-\${o.id}"></div>
  </div>\`;
}
function fmtSlot(o){if(!o.deliverDay)return o.deliverSlot||"Any time";return new Date(o.deliverDay+"T00:00").toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"})+", "+(o.deliverSlot||"")}
function trackAuth(){return S.track?.phone?{phone:S.track.phone}:{t:S.track?.token}}
async function reupload(id,inp){const f=inp.files[0];if(!f)return;if(f.size>8e6){toast("That file is over 8 MB");return}
  const fd=new FormData();const a=trackAuth();Object.entries(a).forEach(([k,v])=>fd.append(k,v));fd.append("receipt",f,f.name);
  try{toast("Uploading receipt\u2026");const r=await fetch(\`/api/orders/\${encodeURIComponent(id)}/receipt\`,{method:"POST",body:fd});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||"Upload failed");
    toast("Receipt sent. We'll check it shortly");lookup(id,S.track.phone,S.track.token)}catch(e){toast(e.message)}}
function openReport(id){
  $("#rep-"+id).innerHTML=\`<div class="form panel" style="background:var(--sunk)">
   <div class="field"><label for="rr-\${id}">What went wrong?</label><select class="sel" id="rr-\${id}"><option>Wrong item or size sent</option><option>Item is faulty or damaged</option><option>Item missing from my order</option><option>Order never arrived</option></select></div>
   <div class="field"><label for="rt-\${id}">What would you like?</label><select class="sel" id="rt-\${id}"><option value="dispute">Replace or fix it</option><option value="refund">Refund</option></select></div>
   <div class="field"><label for="rd-\${id}">Details</label><textarea class="inp" id="rd-\${id}" rows="3" placeholder="Tell us what happened. You can send photos to us on Instagram."></textarea></div>
   <div class="row-actions"><button class="btn sm" onclick="submitReport('\${id}')">Send report</button><button class="btn sm ghost" onclick="$('#rep-\${id}').innerHTML=''">Cancel</button></div></div>\`;
}
async function submitReport(id){
  try{await api(\`/api/orders/\${encodeURIComponent(id)}/report\`,{...trackAuth(),type:$("#rt-"+id).value,reason:$("#rr-"+id).value,details:$("#rd-"+id).value.trim()});toast("Report sent. We'll reply within a day");lookup(id,S.track.phone,S.track.token)}
  catch(e){toast(e.message)}}
async function notifyMe(id){const s=S.sel[id], c=($("#nfy")?.value||"").trim();if(!c){toast("Add your phone or email");return}
  try{await api("/api/notify",{pid:id,ck:s.ck,size:s.size,contact:c});toast("We'll let you know when it's back")}catch(e){toast(e.message)}}
/* reviews */
let RV={rating:0,fit:"true"};
function openReview(pid){
  const host=$("#revForm-"+pid);if(!host||$("#rvf"))return;RV={rating:0,fit:"true"};
  host.insertAdjacentHTML("afterbegin",\`<form class="form panel" id="rvf" onsubmit="event.preventDefault();submitReview('\${pid}')">
    <h3>Your review</h3>
    <div class="field"><span style="font-size:13px;font-weight:700">Rating</span><div class="star-in" id="starIn">\${[1,2,3,4,5].map(i=>\`<button type="button" aria-label="\${i} star\${i>1?"s":""}" onclick="setStars(\${i})">\${ICON.star}</button>\`).join("")}</div></div>
    <div class="field"><label for="rvFit">How did it fit?</label><select class="sel" id="rvFit"><option value="small">Runs small</option><option value="true" selected>True to size</option><option value="large">Runs large</option></select></div>
    <div class="field"><label for="rvT">Headline</label><input class="inp" id="rvT" maxlength="80" placeholder="e.g. Perfect for leg day"></div>
    <div class="field"><label for="rvX">Your review</label><textarea class="inp" id="rvX" rows="4" maxlength="800" placeholder="How does it feel, fit and wash?"></textarea></div>
    <p class="err" id="rvE" role="alert" hidden></p>
    <div class="row-actions"><button class="btn sm" type="submit">Post review</button><button class="btn sm ghost" type="button" onclick="$('#rvf').remove()">Cancel</button></div></form>\`);
  $("#rvf").scrollIntoView({behavior:"smooth",block:"center"});
}
function setStars(n){RV.rating=n;document.querySelectorAll("#starIn button").forEach((b,i)=>b.classList.toggle("on",i<n))}
async function submitReview(pid){
  const text=$("#rvX").value.trim(), e=$("#rvE");
  if(!RV.rating||text.length<10){e.hidden=false;e.textContent=!RV.rating?"Choose a star rating.":"Write at least a sentence about the fit or feel.";return}
  try{await api("/api/reviews",{orderId:S.track.order.id,...trackAuth(),productId:pid,rating:RV.rating,fit:$("#rvFit").value,title:$("#rvT").value.trim(),text});
    toast("Thanks! Your review is live");S.track.reviewed.push(pid);loadCatalog();render()}
  catch(err){e.hidden=false;e.textContent=err.message}
}
function vHelp(){
  return \`<div class="wrap" style="max-width:780px;padding-block:30px;display:flex;flex-direction:column;gap:18px">
  <h1 style="font-size:34px;font-weight:800">Help &amp; policies</h1>
  <div class="panel"><h2>Delivery</h2><p>Free delivery to every island in the Maldives, on every order. In Greater Mal\xE9 a driver brings your order once payment is confirmed, and you'll see the driver's name and number in My orders. For other islands we arrange the ferry or cargo with you.</p></div>
  <div class="panel"><h2>Payment</h2><p>We're fully cashless. Transfer the total from any local bank app using your order number as the reference, then attach the receipt at checkout. We confirm your order once the payment shows in our account, usually within a few hours during the day.</p></div>
  <div class="panel"><h2>Size guide</h2>\${sizeTable()}</div>
  <div class="panel"><h2>Returns, refunds and problems</h2><p>All sales are final, with no change-of-mind refunds or exchanges. If we send the wrong item or size, or something arrives faulty or missing, report it from <button class="link" onclick="go('track')">your order tracking page</button> within 48 hours of delivery and we'll replace it or refund you.</p></div>
  <div class="panel"><h2>Talk to us</h2><p>Instagram: <b>@\${esc(S.settings.instagram)}</b>\${S.settings.whatsapp?\` \xB7 WhatsApp: <b>\${esc(S.settings.whatsapp)}</b>\`:""}</p></div></div>\`;
}


$("#newsForm").addEventListener("submit",async e=>{e.preventDefault();const v=$("#newsIn").value.trim();if(!v){toast("Add your phone or email");return}
  try{await api("/api/subscribe",{contact:v});toast("You're on the Babe list");$("#newsIn").value=""}catch(err){toast(err.message)}});
let rerenderT;function soon(){clearTimeout(rerenderT);rerenderT=setTimeout(()=>{const a=document.activeElement;if(a&&/INPUT|TEXTAREA|SELECT/.test(a.tagName)&&$("#app").contains(a))return;render()},60)}
async function loadCatalog(){
  try{const d=await api("/api/catalog");CATALOG=d.products;S.settings={...structuredClone(DEF_SETTINGS),...d.settings};S.reviewsList=d.reviews;S.loaded=true;S.loadErr=false;
    S.cart=S.cart.filter(c=>{const p=CATALOG.find(x=>x.id===c.pid);return p&&p.colours.some(x=>x.k===c.ck)});saveCart()}
  catch(e){S.loadErr=!S.loaded}
  soon();
}
(function boot(){
  const u=new URL(location.href), tr=u.searchParams.get("track"), t=u.searchParams.get("t");
  if(tr){history.replaceState(null,"",u.pathname+"#track-"+tr.toUpperCase());if(t)setTimeout(()=>lookup(tr,"",t),0)}
  render();loadCatalog();
})();
</script>
</body></html>
`;var L=vi(Ut(),1),Kl=L.default.Client,Xl=L.default.Pool,Jl=L.default.Connection,Zl=L.default.types,ec=L.default.Query,tc=L.default.DatabaseError,rc=L.default.escapeIdentifier,sc=L.default.escapeLiteral,ic=L.default.Result,nc=L.default.TypeOverrides,ac=L.default.defaults,Vs=L.default;var Yt=new TextEncoder,Wo={appstream2:"appstream",cloudhsmv2:"cloudhsm",email:"ses",marketplace:"aws-marketplace",mobile:"AWSMobileHubService",pinpoint:"mobiletargeting",queue:"sqs","git-codecommit":"codecommit","mturk-requester-sandbox":"mturk-requester","personalize-runtime":"personalize"},Vo=new Set(["authorization","content-type","content-length","user-agent","presigned-expires","expect","x-amzn-trace-id","range","connection"]),ze=class{constructor({accessKeyId:e,secretAccessKey:t,sessionToken:s,service:i,region:n,cache:a,retries:o,initRetryMs:l}){if(e==null)throw new TypeError("accessKeyId is a required option");if(t==null)throw new TypeError("secretAccessKey is a required option");this.accessKeyId=e,this.secretAccessKey=t,this.sessionToken=s,this.service=i,this.region=n,this.cache=a||new Map,this.retries=o??10,this.initRetryMs=l||50}async sign(e,t){if(e instanceof Request){let{method:n,url:a,headers:o,body:l}=e;t=Object.assign({method:n,url:a,headers:o},t),t.body==null&&o.has("Content-Type")&&(t.body=l!=null&&o.has("X-Amz-Content-Sha256")?l:await e.clone().arrayBuffer()),e=a}let s=new Kt(Object.assign({url:e.toString()},t,this,t&&t.aws)),i=Object.assign({},t,await s.sign());delete i.aws;try{return new Request(i.url.toString(),i)}catch(n){if(n instanceof TypeError)return new Request(i.url.toString(),Object.assign({duplex:"half"},i));throw n}}async fetch(e,t){for(let s=0;s<=this.retries;s++){let i=fetch(await this.sign(e,t));if(s===this.retries)return i;let n=await i;if(n.status<500&&n.status!==429)return n;await new Promise(a=>setTimeout(a,Math.random()*this.initRetryMs*Math.pow(2,s)))}throw new Error("An unknown error occurred, ensure retries is not negative")}},Kt=class{constructor({method:e,url:t,headers:s,body:i,accessKeyId:n,secretAccessKey:a,sessionToken:o,service:l,region:c,cache:d,datetime:h,signQuery:m,appendSessionToken:w,allHeaders:q,singleEncode:u}){if(t==null)throw new TypeError("url is a required option");if(n==null)throw new TypeError("accessKeyId is a required option");if(a==null)throw new TypeError("secretAccessKey is a required option");this.method=e||(i?"POST":"GET"),this.url=new URL(t),this.headers=new Headers(s||{}),this.body=i,this.accessKeyId=n,this.secretAccessKey=a,this.sessionToken=o;let g,E;(!l||!c)&&([g,E]=Yo(this.url,this.headers)),this.service=l||g||"",this.region=c||E||"us-east-1",this.cache=d||new Map,this.datetime=h||new Date().toISOString().replace(/[:-]|\.\d{3}/g,""),this.signQuery=m,this.appendSessionToken=w||this.service==="iotdevicegateway",this.headers.delete("Host"),this.service==="s3"&&!this.signQuery&&!this.headers.has("X-Amz-Content-Sha256")&&this.headers.set("X-Amz-Content-Sha256","UNSIGNED-PAYLOAD");let B=this.signQuery?this.url.searchParams:this.headers;if(B.set("X-Amz-Date",this.datetime),this.sessionToken&&!this.appendSessionToken&&B.set("X-Amz-Security-Token",this.sessionToken),this.signableHeaders=["host",...this.headers.keys()].filter(v=>q||!Vo.has(v)).sort(),this.signedHeaders=this.signableHeaders.join(";"),this.canonicalHeaders=this.signableHeaders.map(v=>v+":"+(v==="host"?this.url.host:(this.headers.get(v)||"").replace(/\s+/g," "))).join(`
`),this.credentialString=[this.datetime.slice(0,8),this.region,this.service,"aws4_request"].join("/"),this.signQuery&&(this.service==="s3"&&!B.has("X-Amz-Expires")&&B.set("X-Amz-Expires","86400"),B.set("X-Amz-Algorithm","AWS4-HMAC-SHA256"),B.set("X-Amz-Credential",this.accessKeyId+"/"+this.credentialString),B.set("X-Amz-SignedHeaders",this.signedHeaders)),this.service==="s3")try{this.encodedPath=decodeURIComponent(this.url.pathname.replace(/\+/g," "))}catch{this.encodedPath=this.url.pathname}else this.encodedPath=this.url.pathname.replace(/\/+/g,"/");u||(this.encodedPath=encodeURIComponent(this.encodedPath).replace(/%2F/g,"/")),this.encodedPath=Xs(this.encodedPath);let _=new Set;this.encodedSearch=[...this.url.searchParams].filter(([v])=>{if(!v)return!1;if(this.service==="s3"){if(_.has(v))return!1;_.add(v)}return!0}).map(v=>v.map(F=>Xs(encodeURIComponent(F)))).sort(([v,F],[G,W])=>v<G?-1:v>G?1:F<W?-1:F>W?1:0).map(v=>v.join("=")).join("&")}async sign(){return this.signQuery?(this.url.searchParams.set("X-Amz-Signature",await this.signature()),this.sessionToken&&this.appendSessionToken&&this.url.searchParams.set("X-Amz-Security-Token",this.sessionToken)):this.headers.set("Authorization",await this.authHeader()),{method:this.method,url:this.url,headers:this.headers,body:this.body}}async authHeader(){return["AWS4-HMAC-SHA256 Credential="+this.accessKeyId+"/"+this.credentialString,"SignedHeaders="+this.signedHeaders,"Signature="+await this.signature()].join(", ")}async signature(){let e=this.datetime.slice(0,8),t=[this.secretAccessKey,e,this.region,this.service].join(),s=this.cache.get(t);if(!s){let i=await ve("AWS4"+this.secretAccessKey,e),n=await ve(i,this.region),a=await ve(n,this.service);s=await ve(a,"aws4_request"),this.cache.set(t,s)}return Vt(await ve(s,await this.stringToSign()))}async stringToSign(){return["AWS4-HMAC-SHA256",this.datetime,this.credentialString,Vt(await Ys(await this.canonicalString()))].join(`
`)}async canonicalString(){return[this.method.toUpperCase(),this.encodedPath,this.encodedSearch,this.canonicalHeaders+`
`,this.signedHeaders,await this.hexBodyHash()].join(`
`)}async hexBodyHash(){let e=this.headers.get("X-Amz-Content-Sha256")||(this.service==="s3"&&this.signQuery?"UNSIGNED-PAYLOAD":null);if(e==null){if(this.body&&typeof this.body!="string"&&!("byteLength"in this.body))throw new Error("body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header");e=Vt(await Ys(this.body||""))}return e}};async function ve(r,e){let t=await crypto.subtle.importKey("raw",typeof r=="string"?Yt.encode(r):r,{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign"]);return crypto.subtle.sign("HMAC",t,Yt.encode(e))}async function Ys(r){return crypto.subtle.digest("SHA-256",typeof r=="string"?Yt.encode(r):r)}var Ks=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];function Vt(r){let e=new Uint8Array(r),t="";for(let s=0;s<e.length;s++){let i=e[s];t+=Ks[i>>>4&15],t+=Ks[i&15]}return t}function Xs(r){return r.replace(/[!'()*]/g,e=>"%"+e.charCodeAt(0).toString(16).toUpperCase())}function Yo(r,e){let{hostname:t,pathname:s}=r;if(t.endsWith(".on.aws")){let o=t.match(/^[^.]{1,63}\.lambda-url\.([^.]{1,63})\.on\.aws$/);return o!=null?["lambda",o[1]||""]:["",""]}if(t.endsWith(".r2.cloudflarestorage.com"))return["s3","auto"];if(t.endsWith(".backblazeb2.com")){let o=t.match(/^(?:[^.]{1,63}\.)?s3\.([^.]{1,63})\.backblazeb2\.com$/);return o!=null?["s3",o[1]||""]:["",""]}let i=t.replace("dualstack.","").match(/([^.]{1,63})\.(?:([^.]{0,63})\.)?amazonaws\.com(?:\.cn)?$/),n=i&&i[1]||"",a=i&&i[2];if(a==="us-gov")a="us-gov-west-1";else if(a==="s3"||a==="s3-accelerate")a="us-east-1",n="s3";else if(n==="iot")t.startsWith("iot.")?n="execute-api":t.startsWith("data.jobs.iot.")?n="iot-jobs-data":n=s==="/mqtt"?"iotdevicegateway":"iotdata";else if(n==="autoscaling"){let o=(e.get("X-Amz-Target")||"").split(".")[0];o==="AnyScaleFrontendService"?n="application-autoscaling":o==="AnyScaleScalingPlannerFrontendService"&&(n="autoscaling-plans")}else a==null&&n.startsWith("s3-")?(a=n.slice(3).replace(/^fips-|^external-1/,""),n="s3"):n.endsWith("-fips")?n=n.slice(0,-5):a&&/-\d$/.test(n)&&!/-\d$/.test(a)&&([n,a]=[a,n]);return[Wo[n]||n,a||""]}import Zt from"node:crypto";var Fe=null,J=null;function Js(){return Fe||(Fe=new Vs.Pool({connectionString:process.env.DATABASE_URL,max:5,idleTimeoutMillis:3e4}),Fe.on("error",()=>{})),Fe}async function P(r,e=[]){return J?J.query(r,e):Js().query(r,e)}async function Zs(r){if(J){await J.query("begin");try{let t=await r(J);return await J.query("commit"),t}catch(t){throw await J.query("rollback"),t}}let e=await Js().connect();try{await e.query("begin");let t=await r(e);return await e.query("commit"),t}catch(t){try{await e.query("rollback")}catch{}throw t}finally{e.release()}}var ei={"strict-transport-security":"max-age=31536000; includeSubDomains","x-content-type-options":"nosniff","x-frame-options":"DENY","referrer-policy":"strict-origin-when-cross-origin","permissions-policy":"camera=(), microphone=(), geolocation=(), payment=()","cross-origin-opener-policy":"same-origin"};function D(r,e=200,t={}){return new Response(JSON.stringify(r),{status:e,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store",...ei,...t}})}function ti(r,e,t={}){return new Response(r,{status:200,headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store","content-security-policy":e,...ei,...t}})}var ee=class extends Error{constructor(e,t){super(t),this.status=e}},b=r=>{throw new ee(400,r)};function ri(r){return(r.headers.get("x-forwarded-for")||"").split(",")[0].trim()||r.headers.get("x-real-ip")||"unknown"}async function le(r,e=2e4){let t=await r.text();t.length>e&&b("Request too large.");try{return t?JSON.parse(t):{}}catch{b("Invalid request.")}}function N(r,e){let t=[],s=new RegExp("^"+e.replace(/:([a-z]+)/gi,(i,n)=>(t.push(n),"([^/]+)"))+"$");return{method:r,re:s,keys:t}}async function si(r,e,t){let s=new URL(e.url);for(let[i,n]of r){if(i.method!==e.method)continue;let a=s.pathname.match(i.re);if(!a)continue;let o={};i.keys.forEach((l,c)=>o[l]=decodeURIComponent(a[c+1]));try{return await n(e,{...t,url:s,params:o})}catch(l){return l instanceof ee?D({error:l.message},l.status):(console.error("handler error",e.method,s.pathname,l&&l.stack||l),D({error:"Something went wrong. Please try again."},500))}}return null}async function j(r,e,t){if((await P(`insert into rate_limits (key, count, reset_at) values ($1, 1, now() + make_interval(secs => $2))
     on conflict (key) do update set
       count = case when rate_limits.reset_at < now() then 1 else rate_limits.count + 1 end,
       reset_at = case when rate_limits.reset_at < now() then now() + make_interval(secs => $2) else rate_limits.reset_at end
     returning count`,[r,t])).rows[0].count>e)throw new ee(429,"Too many attempts. Please wait a few minutes and try again.")}function xe(r){let e=process.env.APP_SECRET;if(!e)throw new Error("APP_SECRET not set");return Zt.createHmac("sha256",e).update(r).digest("base64url").slice(0,22)}function ii(r,e){let t=Buffer.from(String(r)),s=Buffer.from(String(e));return t.length===s.length&&Zt.timingSafeEqual(t,s)}function ni(){let r="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";return"GB-"+[...Zt.randomBytes(8)].map(t=>r[t%r.length]).join("")}var I=(r,e,t,s=!0)=>{let i=String(r??"").trim();return s&&!i&&b(`Please add your ${t}.`),i.length>e&&b(`${t[0].toUpperCase()+t.slice(1)} is too long.`),i},Z=r=>String(r||"").replace(/[^\d+]/g,"").replace(/^\+?960/,""),Ne=r=>/^[3-9]\d{6}$/.test(Z(r)),Qe=r=>/^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/.test(String(r||"")),Xt=null;function Ko(){return Xt||(Xt=new ze({accessKeyId:process.env.AWS_ACCESS_KEY_ID,secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,service:"s3",region:process.env.AWS_REGION||"ap-southeast-1"})),Xt}var Xo=(r,e)=>`${process.env.AWS_ENDPOINT_URL_S3}/${r}/${e.split("/").map(encodeURIComponent).join("/")}`;async function ai(r,e,t,s){let i=await Ko().fetch(Xo(r,e),{method:"PUT",body:t,headers:{"content-type":s}});if(!i.ok)throw new Error("storage put failed "+i.status+" "+(await i.text()).slice(0,200))}function oi(r){let e=new Uint8Array(r.slice(0,12));if(e[0]===255&&e[1]===216&&e[2]===255)return{type:"image/jpeg",ext:"jpg"};if(e[0]===137&&e[1]===80&&e[2]===78&&e[3]===71)return{type:"image/png",ext:"png"};if(e[0]===82&&e[1]===73&&e[2]===70&&e[3]===70&&e[8]===87&&e[9]===69)return{type:"image/webp",ext:"webp"};if(e[0]===37&&e[1]===80&&e[2]===68&&e[3]===70)return{type:"application/pdf",ext:"pdf"};let t=String.fromCharCode(...e.slice(4,12));return t.startsWith("ftyphei")||t.startsWith("ftypmif1")||t.startsWith("ftypheic")?{type:"image/heic",ext:"heic"}:null}var Jo={banner:{on:!0,text:"Free delivery anywhere in the Maldives. New here? WELCOME10 takes 10% off your first order.",link:"shop",cta:"Shop now"},codes:[{code:"WELCOME10",type:"pct",value:10,first:!0,on:!0}],instagram:"gymbabes.mv",whatsapp:"",bank:{bank:"",acct:"",holder:""},drivers:[],pointsPer:10,setDeal:10,lowStock:2,storeEmail:""};async function we(){let r=await P("select data from settings where id = 1");return{...Jo,...r.rows[0]?.data||{}}}var Zo=["XS","S","M","L","XL"];function el(r,e,t){let s=r.stock?.[e]?.[t];return s==null||s===""?null:Number(s)}async function er(r=!1){return(await P(`select id, data, active, sort from products ${r?"":"where active"} order by sort, id`)).rows.map(t=>({...t.data,id:t.id,active:t.active,sort:t.sort}))}async function tr(r,e,t,s,i,n={query:P}){(!Array.isArray(r)||!r.length)&&b("Your bag is empty."),r.length>30&&b("Too many lines in one order.");let a=Object.fromEntries(i.map(u=>[u.id,u])),o=r.map(u=>{let g=a[u.pid];(!g||g.active===!1)&&b("An item in your bag is no longer available. Please refresh.");let E=(g.colours||[]).find(v=>v.k===u.ck);E||b("Please choose a colour again for "+g.name+"."),(g.sizes||Zo).includes(u.size)||b("Please choose a size again for "+g.name+".");let _=Math.floor(Number(u.qty));return _>=1&&_<=10||b("Quantities must be between 1 and 10."),{pid:g.id,name:g.name,ck:E.k,colour:E.n,img:E.img,size:u.size,qty:_,price:Number(g.price),cat:g.cat}}),l={};o.forEach(u=>{let g=u.pid+"|"+u.ck+"|"+u.size;l[g]?l[g].qty+=u.qty:l[g]={...u}});let c=Object.values(l);for(let u of c){let g=el(a[u.pid],u.ck,u.size);g!==null&&u.qty>g&&b(`${u.name} (${u.colour}, ${u.size}) has only ${g} left.`)}let d=c.reduce((u,g)=>u+g.price*g.qty,0),h=[];c.some(u=>u.cat==="leggings")&&c.some(u=>u.cat==="tops")&&s.setDeal>0&&h.push({label:`Set deal (${s.setDeal}%)`,amt:Math.round(d*s.setDeal/100)});let m="",w=String(e||"").trim().toUpperCase().slice(0,30);if(w){let u=(s.codes||[]).find(g=>g.code===w&&g.on);if(!u)m="That code isn't valid.";else if(u.maxUses&&(u.uses||0)>=u.maxUses)m="That code has already been used.";else{let g=!0;u.first&&(g=!(await n.query("select 1 from orders where phone = $1 and status <> 'cancelled' limit 1",[Z(t)])).rows.length),u.phone&&Z(u.phone)!==Z(t)?m="That code belongs to another customer.":g?h.push({label:`Code ${u.code}`,amt:u.type==="pct"?Math.round(d*u.value/100):Math.min(d,u.value),code:u.code}):m="That code is for first orders only."}}let q=h.sort((u,g)=>g.amt-u.amt)[0]||null;return{lines:c,subtotal:d,discount:q?.amt||0,discountLabel:q?.label||"",code:q?.code||"",codeMsg:m,total:Math.max(0,d-(q?.amt||0))}}var T=r=>String(r??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Jt=r=>"MVR "+Math.round(r).toLocaleString("en-US");function tl(r){return/^https?:/.test(r)?r:(process.env.IMG_BASE||"")+r}function rl(r){return`${process.env.SHOP_URL||""}?track=${encodeURIComponent(r.id)}&t=${xe("track:"+r.id)}`}function sl(r,e,t,s){let i=(t.items||[]).map(n=>`<tr><td style="padding:10px 0;width:76px"><img src="${T(tl(n.img))}" width="64" height="76" alt="${T(n.name)}" style="border-radius:10px;object-fit:cover;display:block"></td><td style="padding:10px 12px;font:14px Arial,sans-serif;color:#21101a"><b>${T(n.name)}</b><br><span style="color:#7a6270">${T(n.colour)} \xB7 ${T(n.size)} \xB7 Qty ${n.qty}</span></td><td style="padding:10px 0;font:bold 14px Arial,sans-serif;color:#21101a;text-align:right;white-space:nowrap">${Jt(n.price*n.qty)}</td></tr>`).join("");return`<!doctype html><html><body style="margin:0;background:#fff8fb"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:18px;border:1px solid #f0dbe6" cellpadding="0" cellspacing="0">
<tr><td style="padding:24px 24px 8px;font:800 26px Arial,sans-serif;color:#e5007e">Gym Babes</td></tr>
<tr><td style="padding:0 24px;font:bold 20px Arial,sans-serif;color:#21101a">${T(r)}</td></tr>
<tr><td style="padding:8px 24px 0;font:15px/1.5 Arial,sans-serif;color:#21101a">${e}</td></tr>
<tr><td style="padding:16px 24px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f0dbe6;border-bottom:1px solid #f0dbe6">${i}</table></td></tr>
<tr><td style="padding:12px 24px 0;font:14px Arial,sans-serif;color:#21101a">${t.discount?`${T(t.discount_label||t.discountLabel)}: \u2212${Jt(t.discount)}<br>`:""}Delivery: Free<br><b style="font-size:17px">Total paid: ${Jt(t.total)}</b><br><span style="color:#7a6270">Order ${T(t.id)}</span></td></tr>
${s||""}
<tr><td style="padding:20px 24px"><a href="${T(rl(t))}" style="display:inline-block;background:#e5007e;color:#ffffff;font:bold 15px Arial,sans-serif;text-decoration:none;padding:14px 24px;border-radius:999px">Track my order</a></td></tr>
<tr><td style="padding:0 24px 24px;font:12px/1.5 Arial,sans-serif;color:#7a6270">Questions? Message us on Instagram @gymbabes.mv. All sales are final; report a wrong or faulty item within 48 hours of delivery from the tracking page.</td></tr>
</table></td></tr></table></body></html>`}async function li(r,e){let t=process.env.RESEND_API_KEY,s=process.env.EMAIL_FROM;if(!t||!s||!r.email)return{skipped:!0};let i=T(String(r.name||"").split(" ")[0]),n=r.deliver_slot?`${T(r.deliver_day?new Date(r.deliver_day).toDateString().slice(0,10):"")}, ${T(r.deliver_slot)}`:"",a={received:["We've got your order",`Hi ${i}, thank you! We're checking your transfer receipt now. Once the payment shows in our account we'll email your confirmation.`],confirmed:["Payment confirmed: here's your receipt",`Hi ${i}, your payment is confirmed and your order is being packed.${n?` Preferred delivery: <b>${n}</b>.`:""}`],rejected:["We couldn't match your receipt",`Hi ${i}, we couldn't find this payment in our account${r.reject_reason?`: ${T(r.reject_reason)}`:"."} Please upload a new receipt from your tracking page.`],shipped:["Your order is on its way",`Hi ${i}, your order is out for delivery${r.driver?` with <b>${T(r.driver.name)}</b> (${T(r.driver.phone)})`:""}.`],delivered:["Delivered! How did it fit?",`Hi ${i}, your order has been delivered. Help other Babes choose their size by leaving a quick review from your tracking page.`]}[e];if(!a)return{skipped:!0};let o=await fetch("https://api.resend.com/emails",{method:"POST",headers:{authorization:`Bearer ${t}`,"content-type":"application/json"},body:JSON.stringify({from:s,to:[r.email],subject:`${a[0]} \xB7 ${r.id}`,html:sl(a[0],a[1],r),reply_to:process.env.EMAIL_REPLY_TO||void 0})}),l=o.ok,c=null;try{c=(await o.json()).id}catch{}return await P("update orders set emails = emails || jsonb_build_object($2::text, jsonb_build_object('at', now(), 'ok', $3::boolean, 'id', $4::text)) where id = $1",[r.id,e,l,c]),{ok:l}}var il="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https://cdn.jsdelivr.net https://*.neon.tech; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",nl=["banner","instagram","whatsapp","bank","pointsPer","setDeal","lowStock"],ci=(r,e)=>({id:r.id,at:new Date(r.created_at).getTime(),status:r.status,payStatus:r.pay_status,paid:r.paid,items:r.items,subtotal:r.subtotal,discount:r.discount,discountLabel:r.discount_label,total:r.total,name:r.name,island:r.island,deliverDay:r.deliver_day?new Date(r.deliver_day).toISOString().slice(0,10):null,deliverSlot:r.deliver_slot,hasReceipt:!!r.receipt_key,rejectReason:r.reject_reason,request:r.request,refunded:r.refunded,driver:r.status==="shipped"&&r.driver?{name:r.driver.name,phone:r.driver.phone,vehicle:r.driver.vehicle}:null,deliveredAt:r.delivered_at?new Date(r.delivered_at).getTime():null});async function je(r,e,t){let i=(await P("select * from orders where id = $1",[String(r||"").toUpperCase().slice(0,20)])).rows[0],n=t&&i&&ii(t,xe("track:"+i.id)),a=e&&i&&Z(e)===i.phone;if(!i||!(n||a))throw new ee(404,"We couldn't find an order with that number and phone.");return i}async function di(r,e){Number(r.headers.get("content-length")||0)>e&&b("That file is too large. Please upload a screenshot under 8 MB.");try{return await r.formData()}catch{b("Upload failed. Please try again.")}}async function ui(r,e){if(!r||typeof r=="string")return null;r.size>8*1024*1024&&b("That file is too large. Please upload a screenshot under 8 MB.");let t=await r.arrayBuffer(),s=oi(t);s||b("Receipts must be a photo (JPG, PNG, WEBP, HEIC) or a PDF.");let i=`receipts/${e}-${Date.now().toString(36)}.${s.ext}`;return await ai("private",i,t,s.type),{key:i,type:s.type}}var al=[[N("GET","/"),async()=>ti(sr.replace("__CONFIG__",JSON.stringify({img:process.env.IMG_BASE||""})),il)],[N("GET","/api/catalog"),async()=>{let[r,e,t]=await Promise.all([we(),er(!1),P("select product_id, rating, fit, title, body, name, size, created_at from reviews where not hidden order by created_at desc limit 500")]),s=Object.fromEntries(nl.map(i=>[i,r[i]]));return s.drivers=void 0,D({settings:s,products:e,reviews:t.rows.map(i=>({pid:i.product_id,rating:i.rating,fit:i.fit,title:i.title,text:i.body,name:i.name,size:i.size,at:new Date(i.created_at).getTime()}))},200,{"cache-control":"public, max-age=30"})}],[N("POST","/api/quote"),async(r,e)=>{await j("quote:"+e.ip,60,600);let t=await le(r),[s,i]=await Promise.all([we(),er(!1)]),n=await tr(t.items,t.code,t.phone,s,i);return D({subtotal:n.subtotal,discount:n.discount,discountLabel:n.discountLabel,total:n.total,codeMsg:n.codeMsg})}],[N("POST","/api/orders"),async(r,e)=>{await j("order:"+e.ip,8,3600);let t=await di(r,9*1024*1024),s;try{s=JSON.parse(String(t.get("order")||"{}"))}catch{b("Invalid order.")}let i=I(s.name,80,"name"),n=I(s.address,200,"delivery address"),a=I(s.island,60,"island"),o=Z(s.phone);Ne(o)||b("Please enter a 7-digit Maldivian contact number.");let l=I(s.email,254,"email").toLowerCase();Qe(l)||b("Please check your email address.");let c=I(s.note,400,"note",!1);s.terms||b("Please confirm you've read the returns policy.");let d=/^\d{4}-\d{2}-\d{2}$/.test(s.deliverDay||"")?s.deliverDay:null,h=I(s.deliverSlot,60,"delivery time",!1),m=await we();m.bank?.acct||b("Online orders open once our bank details are set. Please message us on Instagram.");let w=t.get("receipt");(!w||typeof w=="string")&&b("Attach your transfer receipt so we can confirm your order.");let q=ni(),u=await ui(w,q),g=await Zs(async E=>{let B=(await E.query("select id, data, active from products where active for update")).rows.map(F=>({...F.data,id:F.id,active:F.active})),_=await tr(s.items,s.code,o,m,B,E);s.code&&_.codeMsg&&b(_.codeMsg);let v=await E.query(`insert into orders (id, items, subtotal, discount, discount_label, code, total, name, phone, email, address, island, deliver_day, deliver_slot, note, marketing, receipt_key, receipt_type, ip, log)
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19, jsonb_build_array(jsonb_build_object('st','review','at',now())))
        returning *`,[q,JSON.stringify(_.lines),_.subtotal,_.discount,_.discountLabel,_.code||null,_.total,i,o,l,n,a,d,h||null,c||null,!!s.marketing,u.key,u.type,e.ip]);if(_.code){let G=(await E.query("select data from settings where id = 1 for update")).rows[0].data||{},W=G.codes||m.codes,He=W.findIndex(pi=>pi.code===_.code);He>=0&&(W[He].uses=(W[He].uses||0)+1,G.codes=W,await E.query("update settings set data = $1, updated_at = now() where id = 1",[G]))}return v.rows[0]});return li(g,"received").catch(E=>console.error("email",E)),D({order:ci(g,m),track:xe("track:"+g.id)},201)}],[N("GET","/api/track"),async(r,e)=>{await j("track:"+e.ip,30,600);let t=await je(e.url.searchParams.get("id"),e.url.searchParams.get("phone"),e.url.searchParams.get("t")),s=await we(),i=await P("select coalesce(sum(floor((total - refunded) / $2::numeric)),0)::int as p from orders where phone = $1 and status = 'delivered'",[t.phone,s.pointsPer||10]),n=(await P("select product_id from reviews where order_id = $1",[t.id])).rows.map(a=>a.product_id);return D({order:ci(t,s),points:i.rows[0].p,reviewed:n,token:xe("track:"+t.id)})}],[N("POST","/api/orders/:id/receipt"),async(r,e)=>{await j("reupload:"+e.ip,10,3600);let t=await di(r,9*1024*1024),s=await je(e.params.id,t.get("phone"),t.get("t"));s.status==="review"&&s.pay_status==="rejected"||b("This order isn't waiting for a new receipt.");let i=await ui(t.get("receipt"),s.id);return i||b("Attach your receipt."),await P("update orders set receipt_key=$2, receipt_type=$3, pay_status='pending', reject_reason=null, log = log || jsonb_build_array(jsonb_build_object('st','reupload','at',now())) where id=$1",[s.id,i.key,i.type]),D({ok:!0})}],[N("POST","/api/orders/:id/report"),async(r,e)=>{await j("report:"+e.ip,10,3600);let t=await le(r),s=await je(e.params.id,t.phone,t.t);s.status!=="delivered"&&b("You can report a problem once your order is delivered."),s.request&&b("You've already reported a problem with this order. We'll be in touch."),Date.now()-new Date(s.delivered_at||s.created_at).getTime()>48*36e5&&b("Problems must be reported within 48 hours of delivery. Please message us on Instagram.");let i=t.type==="refund"?"refund":"dispute";return["Wrong item or size sent","Item is faulty or damaged","Item missing from my order","Order never arrived"].includes(t.reason)||b("Choose what went wrong."),await P("update orders set request = $2 where id = $1",[s.id,{type:i,reason:t.reason,details:I(t.details,800,"details",!1),at:Date.now(),status:"open"}]),D({ok:!0})}],[N("POST","/api/reviews"),async(r,e)=>{await j("review:"+e.ip,20,3600);let t=await le(r),s=await je(t.orderId,t.phone,t.t);s.status!=="delivered"&&b("You can review items once your order is delivered.");let i=(s.items||[]).find(d=>d.pid===t.productId);i||b("That item isn't in this order.");let n=Math.round(Number(t.rating));n>=1&&n<=5||b("Choose a star rating.");let a=I(t.text,800,"review");a.length<10&&b("Write at least a sentence about the fit or feel.");let o=["small","true","large"].includes(t.fit)?t.fit:null,l=String(s.name).trim().split(/\s+/),c=l[0]+(l[1]?" "+l[1][0]+".":"");return await P(`insert into reviews (order_id, product_id, rating, fit, title, body, name, size) values ($1,$2,$3,$4,$5,$6,$7,$8)
      on conflict (order_id, product_id) do nothing`,[s.id,i.pid,n,o,I(t.title,80,"headline",!1),a,c,i.size]),D({ok:!0})}],[N("POST","/api/notify"),async(r,e)=>{await j("notify:"+e.ip,20,3600);let t=await le(r),s=I(t.contact,254,"phone or email");return!Ne(s)&&!Qe(s)&&b("Enter a phone number or email."),await P("insert into notify_requests (product_id, ck, size, contact) values ($1,$2,$3,$4) on conflict do nothing",[I(t.pid,40,"product"),I(t.ck,40,"colour"),I(t.size,5,"size"),s]),D({ok:!0})}],[N("POST","/api/subscribe"),async(r,e)=>{await j("sub:"+e.ip,10,3600);let t=await le(r),s=I(t.contact,254,"phone or email");return!Ne(s)&&!Qe(s)&&b("Enter a phone number or email."),await P("insert into subscribers (contact) values ($1) on conflict do nothing",[s]),D({ok:!0})}]],bc={async fetch(r){let e=ri(r);return await si(al,r,{ip:e})||D({error:"Not found"},404)}};export{bc as default};

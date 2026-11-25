// Browser helper for the daily update. Paste into a page on space.bilibili.com (logged in) via the
// built-in browser's javascript tool (paste the whole file). It defines window.BILI; long jobs run in the background and
// report through window.BILI.job (poll it; each javascript call times out after about 45 s).
window.BILI=(()=>{
 const MID=698277118,A='https://api.bilibili.com';
 const sleep=ms=>new Promise(r=>setTimeout(r,ms));
 const csrf=()=>(document.cookie.match(/bili_jct=([^;]+)/)||[])[1];
 async function get(u){let last;for(let i=0;i<4;i++){try{const r=await fetch(A+u,{credentials:'include'}).then(r=>r.json());if(r.code===0)return r.data;last=r.code+' '+r.message;}catch(e){last=String(e);}await sleep(2500*(i+1));}throw new Error('GET '+u+' → '+last);}
 async function post(u,p){const b=new URLSearchParams({...p,csrf:csrf()});const r=await fetch(A+u,{method:'POST',credentials:'include',body:b}).then(r=>r.json());if(r.code!==0)throw new Error('POST '+u+' → '+r.code+' '+r.message);await sleep(1300);return r.data;}
 const folders=async()=>(await get('/x/v3/fav/folder/created/list-all?up_mid='+MID)).list.map(f=>({id:f.id,title:f.title,count:f.media_count}));
 async function items(id){const out=[];for(let pn=1;;pn++){const d=await get('/x/v3/fav/resource/list?media_id='+id+'&pn='+pn+'&ps=40&platform=web');out.push(...(d.medias||[]));if(!d.has_more)break;await sleep(1300);}return out;}
 const dead=m=>m.title==='已失效视频'||m.attr===1||m.attr===9;
 // moves: [{id, dst}] where id is the video's resource id (avid) and dst a folder id
 async function move(src,moves){const by={};moves.forEach(m=>(by[m.dst]=by[m.dst]||[]).push(m.id+':2'));for(const dst in by)await post('/x/v3/fav/resource/move',{src_media_id:src,tar_media_id:dst,mid:MID,resources:by[dst].join(','),platform:'web'});return Object.keys(by).length;}
 const clean=id=>post('/x/v3/fav/resource/clean',{media_id:id});
 const job={state:'idle'};
 function run(fn){job.state='running';job.error=null;job.result=null;fn().then(r=>{job.result=r;job.state='done';},e=>{job.error=String(e&&e.message||e);job.state='error';});return 'started';}
 // 1) what is waiting in the default folder, and which folders hold dead videos
 const survey=()=>run(async()=>{const fs=await folders();const def=fs[0];const inbox=(await items(def.id)).map(m=>({id:m.id,type:m.type,bv:m.bvid,title:m.title,up:m.upper&&m.upper.name,intro:(m.intro||'').slice(0,200),dead:dead(m)}));
  const deadIn=[];for(const f of fs){if(!f.count)continue;const ms=await items(f.id);const n=ms.filter(dead).length;if(n)deadIn.push({id:f.id,title:f.title,n,titles:ms.filter(dead).map(m=>m.bvid)});await sleep(800);}
  return {folders:fs,inbox,deadIn};});
 // 2) snapshot every folder, then diff it against the published page (decrypted here with the
 //    password) so only the changes travel back: {F, moved:[[bv,folderIdx]], removed:[bv], added:[{...}]}.
 //    Read the result with part(i); the browser pane cannot save a downloaded file during an unattended run.
 let OUT='';
 const PAGE='https://zijiun.github.io/bilibili-favorites/index.html';
 async function published(pw){const s=await fetch(PAGE+'?t='+Date.now(),{cache:'no-store'}).then(r=>r.text());const m=s.match(/\)\("([^"]+)","([^"]+)","([^"]+)",(\d+)\);<\/script>/);
  const b=x=>Uint8Array.from(atob(x),c=>c.charCodeAt(0));const km=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:b(m[1]),iterations:+m[4],hash:'SHA-256'},km,{name:'AES-GCM',length:256},false,['decrypt']);
  const h=new TextDecoder().decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:b(m[2])},key,b(m[3])));return JSON.parse(h.match(/const D=(\[.*?\]);const F=/s)[1]);}
 const diff=pw=>run(async()=>{const fs=await folders();const now={},M={};
  for(let i=0;i<fs.length;i++){if(!fs[i].count)continue;for(const m of await items(fs[i].id)){if(dead(m)||m.type!==2)continue;now[m.bvid]=i;M[m.bvid]=m;}await sleep(800);}
  const D=await published(pw),old={};D.forEach(r=>old[r[3].split('/').pop()]=r[2]);
  const moved=[],removed=[],added=[];for(const bv in now){if(!(bv in old)){const m=M[bv];added.push({bv,fi:now[bv],fav:m.fav_time,t:m.title,up:m.upper&&m.upper.name||'',dur:m.duration,intro:m.intro||'',cover:m.cover||''});}else if(old[bv]!==now[bv])moved.push([bv,now[bv]]);}
  for(const bv in old)if(!(bv in now))removed.push(bv);
  OUT=JSON.stringify({F:fs.map(f=>f.title),moved,removed,added});return {videos:Object.keys(now).length,published:D.length,moved:moved.length,removed:removed.length,added:added.length,chars:OUT.length,parts:Math.ceil(OUT.length/30000)};});
 const part=i=>OUT.slice(i*30000,(i+1)*30000);
 return {folders,items,move,clean,survey,diff,part,run,job};
})();'BILI ready'

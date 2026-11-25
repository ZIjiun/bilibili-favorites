// Recover the data embedded in the published page: PW=... node tools/prev.js index.html prev.json
const fs=require('fs'),{webcrypto:c}=require('crypto');
(async()=>{const s=fs.readFileSync(process.argv[2],'utf8');const m=s.match(/\)\("([^"]+)","([^"]+)","([^"]+)",(\d+)\);<\/script>/);
 const b=x=>Uint8Array.from(Buffer.from(x,'base64'));
 const km=await c.subtle.importKey('raw',new TextEncoder().encode(process.env.PW),'PBKDF2',false,['deriveKey']);
 const key=await c.subtle.deriveKey({name:'PBKDF2',salt:b(m[1]),iterations:+m[4],hash:'SHA-256'},km,{name:'AES-GCM',length:256},false,['decrypt']);
 const h=new TextDecoder().decode(await c.subtle.decrypt({name:'AES-GCM',iv:b(m[2])},key,b(m[3])));
 const D=JSON.parse(h.match(/const D=(\[.*?\]);const F=/s)[1]),F=JSON.parse(h.match(/;const F=(\[.*?\]);/s)[1]);
 fs.writeFileSync(process.argv[3],JSON.stringify({D,F}));console.log('previous rows',D.length);})().catch(e=>{console.error('decrypt failed:',e.message);process.exit(1);});

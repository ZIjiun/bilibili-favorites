// Encrypt the plain catalog behind a password gate: PW=... node src/encrypt.js plain.html index.html
const fs=require('fs'),path=require('path'),{webcrypto:c}=require('crypto');
(async()=>{
 const pw=process.env.PW;if(!pw){console.error('set PW');process.exit(1);}
 const html=fs.readFileSync(process.argv[2]||'plain.html','utf8');
 const head=fs.readFileSync(path.join(__dirname,'gate.head.html'),'utf8');
 // keep the salt of the page being replaced: the gate remembers a device by a key tied to the salt,
 // so a stable salt keeps "記住我" working across daily updates (the IV is still fresh every time)
 let salt=c.getRandomValues(new Uint8Array(16));const iv=c.getRandomValues(new Uint8Array(12)),IT=600000;
 try{const old=fs.readFileSync(process.argv[3]||'index.html','utf8').match(/\)\("([^"]+)","[^"]+","[^"]+",\d+\);<\/script><\/body><\/html>$/);if(old)salt=Uint8Array.from(Buffer.from(old[1],'base64'));}catch(e){}
 const km=await c.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
 const key=await c.subtle.deriveKey({name:'PBKDF2',salt,iterations:IT,hash:'SHA-256'},km,{name:'AES-GCM',length:256},false,['encrypt']);
 const ct=new Uint8Array(await c.subtle.encrypt({name:'AES-GCM',iv},key,new TextEncoder().encode(html)));
 const b=u=>Buffer.from(u).toString('base64');
 const out=head+')("'+b(salt)+'","'+b(iv)+'","'+b(ct)+'",'+IT+');</script></body></html>';
 fs.writeFileSync(process.argv[3]||'index.html',out);console.log('wrote',out.length);
})();

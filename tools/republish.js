// Rebuild the published page with the current src/ (no new data): PW=... node tools/republish.js
// Decrypts index.html, rebuilds it from src/, re-encrypts with the same salt, and checks it decrypts.
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process'),{webcrypto:c}=require('crypto');
const root=path.join(__dirname,'..'),idx=path.join(root,'index.html'),plain=path.join(root,'plain.html'),data=path.join(root,'src','data.json');
(async()=>{
 const pw=process.env.PW;if(!pw){console.error('set PW');process.exit(1);}
 const s=fs.readFileSync(idx,'utf8');const m=s.match(/\)\("([^"]+)","([^"]+)","([^"]+)",(\d+)\);<\/script>/);
 const b=x=>Uint8Array.from(Buffer.from(x,'base64'));
 const km=await c.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
 const key=await c.subtle.deriveKey({name:'PBKDF2',salt:b(m[1]),iterations:+m[4],hash:'SHA-256'},km,{name:'AES-GCM',length:256},false,['decrypt']);
 let h;try{h=new TextDecoder().decode(await c.subtle.decrypt({name:'AES-GCM',iv:b(m[2])},key,b(m[3])));}catch(e){console.error('密碼不對，沒有改動任何檔案');process.exit(1);}
 const D=JSON.parse(h.match(/const D=(\[.*?\]);const F=/s)[1]),F=JSON.parse(h.match(/;const F=(\[.*?\]);/s)[1]);
 const a=h.match(/;app\(D,F,("[^"]*"),("[^"]*"),("[^"]*")\);<\/script>/);
 fs.writeFileSync(data,JSON.stringify({D,F,gen:JSON.parse(a[1]),MA:JSON.parse(a[2]),MB:JSON.parse(a[3])}));
 execFileSync(process.execPath,[path.join(root,'src','build.js'),data,plain],{stdio:'inherit'});
 execFileSync(process.execPath,[path.join(root,'src','encrypt.js'),plain,idx],{stdio:'inherit',env:process.env});
 execFileSync(process.execPath,[path.join(root,'tools','prev.js'),idx,path.join(require('os').tmpdir(),'check.json')],{stdio:'inherit',env:process.env});
 console.log('完成：index.html 已用新版 src 重新加密，共',D.length,'支影片');
})();

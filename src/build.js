// Build the plain (unencrypted) catalog page: node src/build.js [data.json] [out.html]
const fs=require('fs'),path=require('path');
const dir=__dirname;
const dataFile=process.argv[2]||path.join(dir,'data.json');
const out=process.argv[3]||path.join(dir,'..','plain.html');
const {D,F,gen,MA,MB}=JSON.parse(fs.readFileSync(dataFile,'utf8'));
const app=fs.readFileSync(path.join(dir,'art.js'),'utf8').trim()+'\n'+fs.readFileSync(path.join(dir,'app.js'),'utf8').trim();
const css=fs.readFileSync(path.join(dir,'style.css'),'utf8').trim();
const data=JSON.stringify(D).replace(/</g,'\\u003c');
const html='<!DOCTYPE html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="referrer" content="no-referrer"><title>收藏島</title><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Cpath d=\'M3 26C8 12 17 8 22 14c4 4 6 8 7 12z\' fill=\'%231b2735\'/%3E%3Ccircle cx=\'24\' cy=\'7\' r=\'3\' fill=\'%23e4572e\'/%3E%3C/svg%3E"><style>'+css+'</style></head><body><div id="app"></div><script>const D='+data+';const F='+JSON.stringify(F)+';'+app+';app(D,F,'+JSON.stringify(gen)+','+JSON.stringify(MA)+','+JSON.stringify(MB)+');</script></body></html>';
fs.writeFileSync(out,html);
console.log('wrote',out,html.length);

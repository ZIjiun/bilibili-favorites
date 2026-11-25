function app(D,F,gen,MA,MB){
 const $=s=>document.querySelector(s);
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const m={},bb=[...MB];[...MA].forEach((c,i)=>m[c]=bb[i]);
 const norm=s=>{let o='';for(const ch of s)o+=(m[ch]??ch);return o.toLowerCase();};
 const groups=[],gi={};
 F.forEach((n,i)=>{const p=n.split('｜');const g=p.length>1?p[0]:'未整理';const sub=p.length>1?p.slice(1).join('｜'):n;if(!(g in gi)){gi[g]=groups.length;groups.push({name:g,items:[]});}groups[gi[g]].items.push({i,sub});});
 const fc=F.map(()=>0);D.forEach(d=>fc[d[2]]++);
 const hay=D.map(d=>norm(d[0]+' '+d[1]+' '+d[6]+' '+F[d[2]]));
 const fshort=i=>{const p=F[i].split('｜');return p.length>1?p[0]+' · '+p.slice(1).join('｜'):F[i];};
 const img=c=>c?(/^http/.test(c)?c:'https://i0.hdslb.com/bfs/'+c+'@480w_270h_1c.webp'):'';
 const live=groups.filter(g=>g.items.some(x=>fc[x.i]));
 const nodesOf=g=>g.items.filter(x=>fc[x.i]);
 const ORDN=['命理','AI','程式','遊戲','開源','學習','職場','心理','生活','萌寵','感情','娛樂','放鬆'];
 const ORD=ORDN.concat(groups.map(g=>g.name).filter(n=>!ORDN.includes(n))).map(n=>groups.findIndex(g=>g.name===n)).filter(i=>i>=0);
/*stage*/ const stage=s=>{const a=s.split('・')[0].trim(),u=c=>/[\x00-\x7f]/.test(c)?.5:1;let w=0,o='';for(const c of a){if(w+u(c)>6){return o.trim()+'…';}w+=u(c);o+=c;}return o;};

 /* ---------- island world map ---------- */
 const ROWS=[['命理','AI','程式','遊戲'],['開源','學習','職場','心理','生活'],['萌寵','感情','娛樂','放鬆']];
 const known=ROWS.flat();
 const extraG=live.filter(g=>!known.includes(g.name)).map(g=>g.name);
 const f=n=>Math.round(n*10)/10;
 const rnd=a=>()=>{a=(a*16807)%2147483647;return(a-1)/2147483646;};
 function layout(mob){
  const pos={};let W,H,R,circ=[],river,ridge;
  if(!mob){W=1400;R=136;const xs4=[302,567,832,1097],xs5=[170,435,700,965,1230];const rows=ROWS.map(r=>r.slice());
   let ex=extraG.slice();while(ex.length){const n=rows.length%2?5:4;rows.push(ex.splice(0,n));}
   rows.forEach((r,i)=>{const xs=i%2?xs5:xs4,y=238+i*184;r.forEach((nm,k)=>{pos[nm]=[xs[k]+(r.length<xs.length&&i>2?Math.floor((xs.length-r.length)/2)*265:0),y];});});
   H=238+(rows.length-1)*184+150;
   for(let x=260;x<=1140;x+=110)circ.push([x,150,105]);
   river=[[760,150]];rows.forEach((r,i)=>{const y=238+i*184;river.push([i%2?832:700,y-80],[i%2?826:706,y+10]);});
   ridge={x0:230,x1:1170,y:182,step:58};
  }else{W=720;R=132;const list=known.concat(extraG);const nr=Math.ceil(list.length/3),rem=list.length%3;list.forEach((nm,k)=>{const r=Math.floor(k/3),c=k%3;const last=r===nr-1&&rem;pos[nm]=last?[rem===1?360:[242,478][c],250+r*285+40]:[[125,360,595][c],250+r*285+(c===1?70:0)];});
   const ys=Object.values(pos).map(p=>p[1]);H=Math.max(...ys)+190;
   circ.push([200,140,110],[520,140,110],[360,120,110]);
   river=[[250,150]];for(let y=300;y<H;y+=170)river.push([y%340<170?240:252,y]);
   ridge={x0:110,x1:610,y:170,step:52};}
  Object.values(pos).forEach(p=>circ.push([p[0],p[1]-36,R]));
  {const lx=river[river.length-1][0];let ye=0;circ.forEach(q=>{const dx=Math.abs(q[0]-lx);if(dx<q[2])ye=Math.max(ye,q[1]+Math.sqrt(q[2]*q[2]-dx*dx));});while(river.length&&river[river.length-1][1]>ye-10)river.pop();river.push([lx,ye+8]);}
  /* coast bumps and bays so the shore reads as land, not a rounded rectangle */
  const rr=rnd(mob?11:5),base=circ.slice(),cx=W/2,cy=H/2;for(let k=0;k<(mob?14:22);k++){const q=base[Math.floor(rr()*base.length)],a=Math.atan2(q[1]-cy,q[0]-cx)+(rr()-.5)*1.2;circ.push([q[0]+Math.cos(a)*q[2]*.7,q[1]+Math.sin(a)*q[2]*.7,q[2]*(.28+rr()*.3)]);}
  const VX=mob?-40:-110,VW=W-2*VX,VY=mob?-20:-24,VH=H-VY+(mob?40:30);
  const isles=mob?[[40,H-30,26],[690,60,22]]:[[-40,H-60,34],[1450,120,30],[1470,H-140,22]];
  return {W,H,pos,circ,river,ridge,mob,vb:[VX,VY,VW,VH],isles};
 }
 const cat=pts=>{let d='M'+pts[0].map(f).join(' ');for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;d+='C'+f(p1[0]+(p2[0]-p0[0])/6)+' '+f(p1[1]+(p2[1]-p0[1])/6)+' '+f(p2[0]-(p3[0]-p1[0])/6)+' '+f(p2[1]-(p3[1]-p1[1])/6)+' '+f(p2[0])+' '+f(p2[1]);}return d;};
 const closed=p=>{const n=p.length;let d='M'+f(p[0][0])+' '+f(p[0][1]);for(let i=0;i<n;i++){const a=p[(i-1+n)%n],b=p[i],c=p[(i+1)%n],e=p[(i+2)%n];d+='C'+f(b[0]+(c[0]-a[0])/6)+' '+f(b[1]+(c[1]-a[1])/6)+' '+f(c[0]-(e[0]-b[0])/6)+' '+f(c[1]-(e[1]-b[1])/6)+' '+f(c[0])+' '+f(c[1]);}return d+'Z';};
 const blob=(c,k,cls)=>'<g filter="url(#goo)" class="'+cls+'">'+c.map(q=>'<circle cx="'+q[0]+'" cy="'+q[1]+'" r="'+(q[2]+k)+'"/>').join('')+'</g>';
 const inIsl=(L,x,y,m)=>L.circ.some(q=>Math.hypot(q[0]-x,q[1]-y)<q[2]-m);
 const STATIC={};
 function scenery(L){
  const key=L.mob?'m':'d';if(STATIC[key])return STATIC[key];const r=rnd(L.mob?7:3);let s='';
  s+='<defs><filter id="goo" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="34"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 36 -16"/></filter>'+
   '<linearGradient id="gRay" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff6c2" stop-opacity=".95"/><stop offset="1" stop-color="#fff6c2" stop-opacity="0"/></linearGradient>';
  Object.keys(L.pos).forEach((nm,k)=>{const c=ART.colOf(nm)[1];s+='<radialGradient id="pt'+k+'"><stop offset="0" stop-color="'+c+'"/><stop offset=".62" stop-color="'+c+'" stop-opacity=".9"/><stop offset="1" stop-color="'+c+'" stop-opacity="0"/></radialGradient>';});
  s+='</defs><rect x="-400" y="-400" width="'+(L.W+800)+'" height="'+(L.H+800)+'" class="sea"/>';
  for(let k=0;k<(L.mob?26:34);k++){const x=L.vb[0]+r()*L.vb[2],y=L.vb[1]+r()*L.vb[3];if(inIsl(L,x,y,-70))continue;s+='<path class="wave" style="animation-delay:'+f(-r()*6)+'s" d="M'+f(x)+' '+f(y)+'q7-6 14 0t14 0" />';}
  s+=blob(L.circ,62,'shallow')+blob(L.circ,24,'sand')+blob(L.circ,0,'grass');
  L.isles.forEach(q=>{s+='<ellipse cx="'+q[0]+'" cy="'+q[1]+'" rx="'+(q[2]*1.6)+'" ry="'+(q[2]*.9)+'" class="shallow"/><ellipse cx="'+q[0]+'" cy="'+q[1]+'" rx="'+(q[2]*1.1)+'" ry="'+(q[2]*.55)+'" class="sand o"/><circle cx="'+(q[0]-4)+'" cy="'+(q[1]-q[2]*.5)+'" r="'+(q[2]*.42)+'" class="leaf"/>';});
  for(let k=0;k<(L.mob?30:44);k++){const x=r()*L.W,y=r()*L.H;if(!inIsl(L,x,y,60))continue;s+='<ellipse cx="'+f(x)+'" cy="'+f(y)+'" rx="'+f(20+r()*30)+'" ry="'+f(8+r()*10)+'" class="grass2"/>';}
  /* each region owns a patch of ground with its own material */
  Object.keys(L.pos).forEach((nm,k)=>{const p=L.pos[nm],T=ART.tOf(nm),rx=L.mob?112:124,ry=L.mob?80:74,cx=p[0],cy=p[1]-20,pr=rnd(k*97+13);
   const pts=[];for(let q=0;q<14;q++){const a=q/14*Math.PI*2,w=.84+pr()*.3;pts.push([cx+Math.cos(a)*rx*w,cy+Math.sin(a)*ry*w]);}
   const d=closed(pts);s+='<path d="'+d+'" class="pedge" style="fill:'+T[1]+'"/><path d="'+d+'" class="patch" style="fill:'+T[0]+'"/>';
   s+='<g class="tex">'+T[2](pr,cx,cy,rx*.82,ry*.8)+'</g>';});
  const rv=cat(L.river),mo=L.river[L.river.length-1];s+='<path d="'+rv+'" class="riv0"/><path d="M'+(mo[0]-16)+' '+(mo[1]-14)+'Q'+mo[0]+' '+(mo[1]-4)+' '+(mo[0]+16)+' '+(mo[1]-14)+'L'+(mo[0]+40)+' '+(mo[1]+22)+'Q'+mo[0]+' '+(mo[1]+34)+' '+(mo[0]-40)+' '+(mo[1]+22)+'Z" class="mouth"/><path d="'+rv+'" class="riv"/><path d="'+rv+'" class="riv2"/>';
  /* mountain ridge behind the first row */
  const g=L.ridge;let back='',front='';const big=L.mob?[g.x0+120,g.x1-140]:[g.x0+150,g.x0+520,g.x1-210];
  const pk=(x,y,w,hh)=>'<path d="M'+f(x-w)+' '+y+'Q'+f(x-8)+' '+f(y-hh)+' '+f(x)+' '+f(y-hh)+'Q'+f(x+8)+' '+f(y-hh)+' '+f(x+w)+' '+y+'Z" class="rock"/><path d="M'+f(x)+' '+f(y-hh)+'Q'+f(x+8)+' '+f(y-hh)+' '+f(x+w)+' '+y+'H'+f(x+10)+'Q'+f(x+14)+' '+f(y-hh*.5)+' '+f(x)+' '+f(y-hh)+'Z" class="rock2"/>'+(hh>78?'<path d="M'+f(x-16)+' '+f(y-hh+22)+'Q'+f(x-8)+' '+f(y-hh)+' '+f(x)+' '+f(y-hh)+'Q'+f(x+9)+' '+f(y-hh)+' '+f(x+17)+' '+f(y-hh+22)+'L'+f(x+8)+' '+f(y-hh+15)+'L'+f(x)+' '+f(y-hh+24)+'L'+f(x-7)+' '+f(y-hh+15)+'Z" class="snow"/>':'');
  for(let x=g.x0;x<=g.x1;x+=g.step*(.7+r()*.6)){const hh=40+r()*58,w=44+r()*40;back+=pk(x,g.y-14-r()*14,w,hh);}
  for(let x=g.x0+30;x<=g.x1;x+=g.step*(1+r()*.9)){const hh=34+r()*40,w=40+r()*30;front+=pk(x,g.y+6,w,hh);}
  big.forEach(x=>{back=pk(x,g.y-6,96+r()*20,124+r()*24)+back;});
  s+=back+front;
  /* tree clumps where no landmark stands */
  const P=Object.values(L.pos),tr=[];for(let k=0;k<(L.mob?160:220);k++){const x=r()*L.W,y=g.y+20+r()*(L.H-g.y-40);if(!inIsl(L,x,y,6))continue;if(P.some(p=>Math.abs(p[0]-x)<(L.mob?100:96)&&y>p[1]-175&&y<p[1]+(L.mob?112:92)))continue;
   if(L.river.some((q,i)=>i&&Math.hypot(q[0]-x,q[1]-y)<40))continue;tr.push([x,y,.75+r()*.5]);}
  tr.sort((a,b)=>a[1]-b[1]).forEach(([x,y,k])=>{s+='<g class="tree"><ellipse cx="'+f(x)+'" cy="'+f(y)+'" rx="'+f(10*k)+'" ry="'+f(4*k)+'" class="tsh"/><path d="M'+f(x-2.5*k)+' '+f(y)+'v-'+f(9*k)+'h'+f(5*k)+'v'+f(9*k)+'z" class="trunk"/><circle cx="'+f(x)+'" cy="'+f(y-16*k)+'" r="'+f(11*k)+'" class="leaf"/><circle cx="'+f(x-3.5*k)+'" cy="'+f(y-19*k)+'" r="'+f(4*k)+'" class="leaf2"/></g>';});
  STATIC[key]=s;return s;
 }
 const cloud=(x,y,k)=>'<g class="cloud" transform="translate('+x+' '+y+') scale('+k+')"><path d="M-40 0Q-44-18-24-20Q-18-36 2-32Q18-42 30-26Q48-26 46-8Q48 4 36 4H-30Q-44 4-40 0Z"/></g>';
 let LY=null;
 function drawMap(cf,active){
  const mob=mq.matches;LY=layout(mob);const L=LY;const fs=mob?27:19;
  let s='<svg id="isl" viewBox="'+L.vb.join(' ')+'" role="group" aria-label="收藏島地圖" class="'+(mob?'m':'d')+'">'+scenery(L);
  const names=Object.keys(L.pos).sort((a,b)=>L.pos[a][1]-L.pos[b][1]||L.pos[a][0]-L.pos[b][0]);let top='';
  names.forEach(nm=>{const g=live.find(x=>x.name===nm);if(!g)return;const gx=groups.indexOf(g),[x,y]=L.pos[nm];const col=ART.colOf(nm);
   const tot=g.items.reduce((a,t)=>a+cf[t.i],0),all=g.items.reduce((a,t)=>a+fc[t.i],0),nf=nodesOf(g).length;
   const sel=st.g===gx||(st.f!==null&&g.items.some(t=>t.i===st.f)),dim=active&&!tot,hit=active&&tot;
   const lab=nm+'區，'+(active?'符合 '+tot+' 支':all+' 支影片')+'，'+nf+' 個收藏夾'+(sel?'，已選取':'');
   s+='<g class="rg'+(sel?' sel':'')+(dim?' dm':'')+(hit?' hit':'')+'" data-t="g" data-v="'+gx+'" role="button" tabindex="-1" aria-pressed="'+sel+'" aria-label="'+esc(lab)+'" transform="translate('+x+' '+y+')">'+
    '<ellipse cx="0" cy="16" rx="86" ry="27" class="psh"/><ellipse class="selbk" cx="0" cy="4" rx="88" ry="28"/><ellipse class="selring" cx="0" cy="4" rx="88" ry="28"/><ellipse class="fring" cx="0" cy="4" rx="97" ry="34"/>'+
    '<g class="ped"><path d="M-72 0V10A72 22 0 0 0 72 10V0" fill="#6b4a36" class="o"/><ellipse cx="0" cy="0" rx="72" ry="22" fill="'+col[1]+'" class="o"/><ellipse cx="-6" cy="-3" rx="54" ry="13" fill="#ffffff" opacity=".28"/></g>'+
    '<g class="lift"><g class="art">'+ART.lOf(nm)()+'</g></g></g>';
   /* badge + info bar */
   const nw=[...nm].reduce((a,c)=>a+(/[\x00-\x7f]/.test(c)?fs*.62:fs*1.04),0)+fs*.2*([...nm].length-1);const ic=fs*.82,bw=ic*2+8+nw,by=y+30+fs*.6;
   const bar=mob?226:150,bh=mob?fs*1.4:fs*1.25,yb=by+fs*.95;
   const lt0=active?'符合':'收藏夾 '+nf,rt=active?tot+' / '+all:all+' 支';const est=t=>[...t].reduce((a,c)=>a+(/[\x00-\x7f]/.test(c)?.58:1),0);const lt=(mob&&!active||est(lt0)*fs*(mob?.92:.75)+est(rt)*fs*(mob?.96:.78)+bh*1.1+fs*.5>bar)?(active?'':nf+' 夾'):lt0;
   top+='<g class="bd'+(sel?' sel':'')+(dim?' dm':'')+(hit?' hit':'')+'" data-t="g" data-v="'+gx+'" aria-hidden="true">'+
    '<g transform="translate('+f(x-bw/2+ic)+' '+f(by)+')" style="--ic:'+col[0]+'"><circle r="'+f(ic)+'" fill="'+col[0]+'" class="o bic"/><g fill="#fff" stroke="none" transform="scale('+f(ic/11)+')">'+ART.iOf(nm)+'</g></g>'+
    '<text x="'+f(x-bw/2+ic*2+8)+'" y="'+f(by+fs*.36)+'" class="bn" style="font-size:'+fs+'px;letter-spacing:'+f(fs*.2)+'px">'+esc(nm)+'</text>'+
    '<rect x="'+f(x-bar/2)+'" y="'+f(yb)+'" width="'+bar+'" height="'+f(bh)+'" rx="'+f(bh/2)+'" class="bar"/>'+
    '<text x="'+f(x-bar/2+bh*.55)+'" y="'+f(yb+bh*.7)+'" class="bl" style="font-size:'+f(fs*(mob?.92:.75))+'px">'+lt+'</text><text x="'+f(x+bar/2-bh*.55)+'" y="'+f(yb+bh*.7)+'" text-anchor="end" class="br" style="font-size:'+f(fs*(mob?.96:.78))+'px">'+rt+'</text></g>';});
  s+=top;
  s+=mob?cloud(660,40,.8)+cloud(-12,L.H*.42,.6):cloud(-30,70,1.1)+cloud(1420,260,.9)+cloud(1380,L.H-40,1)+cloud(-50,L.H*.45,.8);
  const mx=L.vb[0]+L.vb[2]-(mob?70:150),my=L.vb[1]+(mob?60:70);
  s+='<g class="night"><circle cx="'+mx+'" cy="'+my+'" r="'+(mob?22:30)+'" fill="#fff4c9"/><circle cx="'+(mx+9)+'" cy="'+(my-6)+'" r="'+(mob?20:27)+'" class="sea"/>'+[0,1,2,3].map(k=>'<ellipse cx="'+(mx-6)+'" cy="'+(my+(mob?50:62)+k*16)+'" rx="'+(26-k*5)+'" ry="2.4" fill="#fff4c9" opacity="'+(.55-k*.1)+'"/>').join('')+'</g>';
  s+='</svg>';$('#map').innerHTML=s;{const rs=[...document.querySelectorAll('#map .rg')];const r0=rs.find(r=>r.classList.contains('sel'))||rs[0];if(r0)r0.tabIndex=0;}$('#isl').classList.toggle('focus',(st.g!==null||st.f!==null)&&!active);
 }
 const mq=window.matchMedia('(max-width:900px)');
 document.getElementById('app').innerHTML=
 '<a class="skip" href="#grid">跳到影片</a><header class="top"><div class="bi"><div class="brand"><svg class="mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4l12 6v12l-12 6-12-6V10z" fill="var(--g2)"/><path d="M16 4l12 6-12 6-12-6z" fill="var(--g1)"/><path d="M16 16v12l12-6V10z" fill="var(--g3)"/><circle cx="16" cy="10" r="2.6" fill="var(--accent)"/></svg>收藏島</div>'+
 '<label class="sr"><svg viewBox="0 0 20 20" class="si" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4.5 4.5"/></svg><input id="q" type="search" autocomplete="off" spellcheck="false" placeholder="搜尋 '+D.length+' 支影片：標題、UP 主、簡介" aria-label="搜尋影片"><kbd class="kb">/</kbd><button id="x" type="button" aria-label="清除搜尋" hidden><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15"/></svg></button></label>'+
 '<div class="theme" role="group" aria-label="外觀"><button type="button" data-th="auto">自動</button><button type="button" data-th="light">淺色</button><button type="button" data-th="beige">米色</button><button type="button" data-th="dark">深色</button></div></div></header>'+
 '<main class="wrap"><section class="mapbox" aria-labelledby="mh1"><div class="mh"><div><h1 id="mh1">選一個區域出發</h1><p>點地區，下方列出它的收藏夾和影片。</p></div><button id="mt" type="button" aria-expanded="true">收合地圖</button></div>'+
 '<div id="mapw" class="mapw"><div id="map"></div></div></section>'+
 '<nav id="chips" class="chips" aria-label="分類篩選"></nav>'+
 '<div class="rh"><span id="cnt" aria-live="polite"></span><label>排序 <select id="so"><option value="new">最新收藏</option><option value="old">最早收藏</option></select></label></div>'+
 '<h2 class="vh">影片</h2><div id="grid" class="grid"></div><div id="more"></div><footer class="foot">資料為 '+gen+' 的快照・'+D.length+' 支影片・'+fc.filter(n=>n).length+' 個收藏夾</footer></main>';
 const st={q:'',g:null,f:null,sort:'new'};
 const H=new URLSearchParams(location.hash.slice(1));
 if(H.get('q'))st.q=H.get('q');if(H.get('f')!==null&&H.get('f')!=='')st.f=+H.get('f');else if(H.get('g')!==null&&H.get('g')!=='')st.g=+H.get('g');if(st.g!==null&&!groups[st.g])st.g=null;
 const isW=k=>/^[a-z0-9]{1,3}$/.test(k),kpat=k=>isW(k)?'(?<![a-z0-9])'+k+'(?![a-z0-9])':k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const hl=(s,ks)=>{if(!ks.length)return esc(s);const re=new RegExp('(?:'+ks.map(kpat).join('|')+')','gi'),out=[];let last=0,m;while((m=re.exec(s))){if(!m[0].length){re.lastIndex++;continue;}out.push(esc(s.slice(last,m.index)),'<mark>'+esc(m[0])+'</mark>');last=m.index+m[0].length;}out.push(esc(s.slice(last)));return out.join('');};
 let view=[],shown=0,ks=[];
 const card=i=>{const d=D[i];let sn='';
  if(ks.length&&d[6]){const nl=norm(d[6]);const p=ks.map(k=>nl.indexOf(k)).filter(x=>x>=0).sort((a,b)=>a-b)[0];if(p!==undefined){const s=Math.max(0,p-18);sn='<p class="sn">'+(s?'…':'')+hl(d[6].slice(s,s+70),ks)+'…</p>';}}
  const gn=F[d[2]].split('｜')[0],gc=ART.colOf(gn);
  return '<article class="card"><a class="th" href="'+esc(d[3])+'" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true" style="--gc:'+gc[0]+';--gl:'+gc[1]+'"><svg class="ph" viewBox="-12 -12 24 24"><g fill="#fff" style="--ic:'+gc[0]+'">'+ART.iOf(gn)+'</g></svg>'+(d[8]?'<img src="'+esc(img(d[8]))+'" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.remove()">':'')+'<span class="du">'+d[4]+'</span></a>'+
  '<h3 class="tw"><a class="t" href="'+esc(d[3])+'" target="_blank" rel="noopener">'+hl(d[0],ks)+'</a></h3><div class="up">'+hl(d[1],ks)+' · <span class="nw">'+d[5]+' 收藏</span></div>'+sn+
  '<button class="f" type="button" data-i="'+d[2]+'">'+hl(fshort(d[2]),ks)+'</button></article>';};
 const more=()=>{const n=Math.min(shown+48,view.length);if(n<=shown)return;$('#grid').insertAdjacentHTML('beforeend',view.slice(shown,n).map(card).join(''));shown=n;};
 const fill=()=>{let g=0;while(shown<view.length&&g++<20&&$('#more').getBoundingClientRect().top<innerHeight+900)more();};

 let lastCf=null,lastActive=false;
 const fkey=()=>{const a=document.activeElement;return a&&a.dataset&&a.dataset.t?[a.closest('#map')?'#map':'#chips',a.dataset.t,a.dataset.v]:null;};
 const frestore=k=>{if(!k)return;const n=document.querySelector(k[0]+' [data-t="'+k[1]+'"]'+(k[2]!==undefined?'[data-v="'+k[2]+'"]':''));if(n)n.focus({preventScroll:true});};
 function render(){
  const fk=fkey();
  ks=norm(st.q).split(/\s+/).filter(Boolean);
  const tests=ks.map(k=>{if(!isW(k))return h=>h.includes(k);const r=new RegExp(kpat(k));return h=>r.test(h);});const hit=[];D.forEach((d,i)=>{if(tests.every(t=>t(hay[i])))hit.push(i);});
  const cf=F.map(()=>0);hit.forEach(i=>cf[D[i][2]]++);
  const inScope=i=>st.f!==null?D[i][2]===st.f:st.g!==null?groups[st.g].items.some(x=>x.i===D[i][2]):true;
  let rows=hit.filter(inScope);if(st.sort==='old')rows=rows.slice().reverse();
  lastCf=cf;lastActive=ks.length>0;drawMap(cf,lastActive);
  let c1='<button data-t="all" aria-pressed="'+(st.f===null&&st.g===null)+'">全部 <span>'+hit.length+'</span></button>',c2='';
  ORD.forEach(gx=>{const g=groups[gx];if(!g.items.some(x=>fc[x.i]))return;const gt=g.items.reduce((a,x)=>a+cf[x.i],0);
   const open=st.g===gx||(st.f!==null&&g.items.some(x=>x.i===st.f));const R=ART.colOf(g.name);
   c1+='<button data-t="g" data-v="'+gx+'" aria-pressed="'+open+'"'+(gt?'':' class="zero"')+'><i style="background:'+R[0]+'"></i>'+esc(g.name)+' <span>'+gt+'</span></button>';
   if(open&&nodesOf(g).length>1)g.items.forEach(x=>{if(fc[x.i])c2+='<button data-t="f" data-v="'+x.i+'" aria-pressed="'+(st.f===x.i)+'">'+esc(x.sub)+' <span>'+cf[x.i]+'</span></button>';});});
  $('#chips').innerHTML='<div class="cr"><span class="cl">總分類</span>'+c1+'</div>'+(c2?'<div class="cr sub"><span class="cl">收藏夾</span>'+c2+'</div>':'');
  document.querySelectorAll('#chips .cr').forEach(cr=>{const b=cr.querySelector('[aria-pressed=true]:not([data-t=all])');if(b&&cr.scrollWidth>cr.clientWidth)cr.scrollLeft=Math.max(0,b.offsetLeft-(cr.clientWidth-b.offsetWidth)/2);});
  const scope=st.f!==null?fshort(st.f):st.g!==null?groups[st.g].name:'';const sq=ks.length?'搜尋「'+st.q.trim()+'」':'';
  $('#cnt').innerHTML=(scope||sq)?'<b>'+esc([scope,sq].filter(Boolean).join(' ・ '))+'</b>　'+rows.length+' 支':'全部收藏　'+rows.length+' 支';
  $('#x').hidden=!st.q;$('.kb').hidden=!!st.q;view=rows;shown=0;
  if(!rows.length){$('#grid').innerHTML='<div class="empty"><p class="et">找不到符合的影片</p><p>試試少打幾個字，或換個說法。多個關鍵字要同時出現才會列出。</p><button type="button" id="rs">清除搜尋與篩選</button></div>';}
  else{$('#grid').innerHTML='';fill();}
  const Q=new URLSearchParams();if(st.q)Q.set('q',st.q);if(st.f!==null)Q.set('f',st.f);else if(st.g!==null)Q.set('g',st.g);history.replaceState(null,'',Q.toString()?'#'+Q:location.pathname+location.search);
  frestore(fk);
 }
 const q=$('#q');q.value=st.q;

 const go=()=>{$('#chips').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});};
 q.addEventListener('input',()=>{const was=!!st.q;st.q=q.value;render();if(!was&&st.q&&$('#chips').getBoundingClientRect().top>innerHeight*.55)go();});
 q.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go();if(mq.matches)q.blur();}});
 $('#x').onclick=()=>{st.q='';q.value='';render();q.focus();};
 $('#so').onchange=e=>{st.sort=e.target.value;render();};
 const pick=e=>{const b=e.target.closest('[data-t]');if(!b)return;const t=b.dataset.t;const inMap=!!b.closest('#map');st.f=t==='f'?+b.dataset.v:null;st.g=t==='g'?+b.dataset.v:null;render();if(inMap){const c=$('#chips [data-t=g][data-v="'+b.dataset.v+'"]');if(c)c.focus({preventScroll:true});go();}};
 $('#map').addEventListener('click',pick);$('#chips').addEventListener('click',pick);
 $('#map').addEventListener('focusin',e=>{const r=e.target.closest('.rg');if(!r)return;document.querySelectorAll('#map .rg').forEach(x=>x.tabIndex=x===r?0:-1);});
 $('#map').addEventListener('keydown',e=>{const K={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1};if(e.key in K||e.key==='Home'||e.key==='End'){const rs=[...document.querySelectorAll('#map .rg')],i=rs.indexOf(e.target.closest('.rg'));if(i<0)return;e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?rs.length-1:(i+K[e.key]+rs.length)%rs.length;rs[n].focus();return;}if(e.key==='Enter'||e.key===' '){const b=e.target.closest('[data-t]');if(b){e.preventDefault();e.stopPropagation();pick({target:b});}}});
 const mbox=$('.mapbox'),setMap=c=>{mbox.classList.toggle('closed',c);$('#mt').textContent=c?'展開地圖':'收合地圖';$('#mt').setAttribute('aria-expanded',String(!c));try{localStorage.setItem('bm',c?'closed':'open');}catch(e){}};
 $('#mt').onclick=()=>setMap(!mbox.classList.contains('closed'));
 try{if(localStorage.getItem('bm')==='closed')setMap(true);}catch(e){}
 $('.skip').onclick=e=>{e.preventDefault();const t=$('#grid .t');if(t){t.scrollIntoView({block:'center'});t.focus();}};
 let ly=scrollY;addEventListener('scroll',()=>{const y=scrollY,t=document.querySelector('.top');if(!mq.matches){t.classList.remove('hs');ly=y;return;}if(y>ly+6&&y>140&&document.activeElement!==q)t.classList.add('hs');else if(y<ly-6||y<=140)t.classList.remove('hs');ly=y;},{passive:true});
 $('#grid').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.id==='rs'){st.q='';q.value='';st.f=null;st.g=null;render();}else if(b.classList.contains('f')){st.f=+b.dataset.i;st.g=null;render();const c=$('#chips [data-t=f][data-v="'+st.f+'"]')||$('#chips [data-t=g][aria-pressed=true]');if(c)c.focus({preventScroll:true});go();}});
 if('IntersectionObserver' in window)new IntersectionObserver(es=>{if(es[0].isIntersecting)fill();},{rootMargin:'900px'}).observe($('#more'));else addEventListener('scroll',fill);
 document.addEventListener('keydown',e=>{if(e.key==='/'&&document.activeElement!==q){e.preventDefault();q.focus();q.select();}else if(e.key==='Escape'){if(document.activeElement===q&&st.q){st.q='';q.value='';render();}else if(st.g!==null||st.f!==null){st.g=null;st.f=null;render();}}});
 const root=document.documentElement;let th='auto';try{th=localStorage.getItem('bt')||'auto';}catch(e){}
 const setTh=t=>{th=t;if(t==='auto')root.removeAttribute('data-theme');else root.setAttribute('data-theme',t);try{localStorage.setItem('bt',t);}catch(e){}document.querySelectorAll('.theme button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.th===t)));};
 document.querySelector('.theme').addEventListener('click',e=>{const b=e.target.closest('button');if(b)setTh(b.dataset.th);});setTh(th);
 mq.addEventListener('change',()=>render());
 render();
}

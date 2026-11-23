/* Landmark art: each drawn around (0,0) = centre of its pedestal top, rising to about y=-160. */
const ART=(()=>{
 const O=' class="o"';
 const star=(x,y,r,c)=>'<path class="spk" d="M'+x+' '+(y-r)+'Q'+x+' '+y+' '+(x+r)+' '+y+'Q'+x+' '+y+' '+x+' '+(y+r)+'Q'+x+' '+y+' '+(x-r)+' '+y+'Q'+x+' '+y+' '+x+' '+(y-r)+'Z" fill="'+(c||'#fff')+'"/>';
 const gearPath=(cx,cy,r,n)=>{let d='';for(let k=0;k<n*2;k++){const a0=k/(n*2)*Math.PI*2,a1=(k+1)/(n*2)*Math.PI*2,rr=k%2?r*.8:r;d+=(k?'L':'M')+(cx+Math.cos(a0)*rr).toFixed(1)+' '+(cy+Math.sin(a0)*rr).toFixed(1)+'L'+(cx+Math.cos(a1)*rr).toFixed(1)+' '+(cy+Math.sin(a1)*rr).toFixed(1);}return d+'Z';};
 const tree=(x,y,s,c1,c2)=>'<path d="M'+(x-3*s)+' '+y+'l1-'+(16*s)+'h'+(4*s)+'l1 '+(16*s)+'z" fill="#8a5a3a"'+O+'/><circle cx="'+x+'" cy="'+(y-24*s)+'" r="'+(14*s)+'" fill="'+(c1||'#5fb35a')+'"'+O+'/><circle cx="'+(x-5*s)+'" cy="'+(y-28*s)+'" r="'+(5*s)+'" fill="'+(c2||'#8fd57d')+'"/>';
 const L={
 'AI':()=>'<path d="M-52 0Q-50-16-32-22H32Q50-16 52 0Z" fill="#6c7a9c"'+O+'/>'+
  '<path d="M-44-18L-54-62-38-82-24-60-26-18Z" fill="#a9ecf8"'+O+'/><path d="M-38-82L-24-60-26-18-36-18Z" fill="#6fcfe6"/>'+
  '<path d="M26-18L30-70 46-90 58-60 44-18Z" fill="#7ad6ec"'+O+'/><path d="M46-90L58-60 44-18 40-18Z" fill="#46b3d3"/>'+
  '<path d="M-56-84A56 15 0 0 1 56-84" fill="none" stroke="#ffcf4a" stroke-width="5" stroke-linecap="round"/>'+
  '<path d="M0-162L-27-124V-34L0-18Z" fill="#c4f4fc"'+O+'/><path d="M0-162L27-124V-34L0-18Z" fill="#59c1e0"'+O+'/>'+
  '<path d="M9-44V-74H17V-100M-12-50V-86" fill="none" stroke="#eafdff" stroke-width="2.4" stroke-linecap="round"/><circle cx="17" cy="-104" r="3.2" fill="#eafdff"/><circle cx="-12" cy="-90" r="3" fill="#ffffff"/>'+
  '<path d="M-56-84A56 15 0 0 0 56-84" fill="none" stroke="#ffcf4a" stroke-width="5" stroke-linecap="round"/><circle class="gl" cx="0" cy="-118" r="22" fill="#8ff0ff" opacity=".0"/>'+
  star(-62,-128,9)+star(54,-138,7)+star(40,-164,5,'#ffe9a0'),
 '程式':()=>'<rect x="6" y="-118" width="14" height="34" fill="#c9644f"'+O+'/><circle class="puff" cx="16" cy="-128" r="8" fill="#f4f4f4" opacity=".9"/><circle class="puff p2" cx="26" cy="-142" r="10" fill="#f4f4f4" opacity=".8"/>'+
  '<rect x="-52" y="-74" width="74" height="74" rx="3" fill="#efe7d6"'+O+'/><rect x="6" y="-74" width="16" height="74" fill="#ddd1b8"/><path d="M-60-72L-15-110 30-72Z" fill="#56699a"'+O+'/>'+
  '<rect x="-44" y="-58" width="34" height="26" rx="3" fill="#1f2a44"'+O+'/><path d="M-33-50l-6 5 6 5M-21-50l6 5-6 5M-25-41l-4-10" fill="none" stroke="#6ee7ff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>'+
  '<path d="M-2 0V-30Q-2-38 6-38Q14-38 14-30V0Z" fill="#8a5a3a"'+O+'/>'+
  '<path class="spin" d="'+gearPath(40,-42,30,10)+'" fill="#f2b84b"'+O+'/><circle cx="40" cy="-42" r="11" fill="#c98c2a"'+O+'/><circle cx="40" cy="-42" r="4" fill="#fff6dd"/>'+
  '<path class="spin r" d="'+gearPath(60,-86,15,8)+'" fill="#9fb0cc"'+O+'/><circle cx="60" cy="-86" r="5" fill="#6d7e9c"/>',
 '命理':()=>'<rect x="-54" y="-14" width="108" height="14" rx="3" fill="#cfc2e4"'+O+'/><rect x="-44" y="-27" width="88" height="13" rx="3" fill="#e6def2"'+O+'/>'+
  '<rect x="-36" y="-72" width="9" height="45" fill="#f6f1e8"'+O+'/><rect x="-15" y="-72" width="9" height="45" fill="#f6f1e8"'+O+'/><rect x="6" y="-72" width="9" height="45" fill="#f6f1e8"'+O+'/><rect x="27" y="-72" width="9" height="45" fill="#f6f1e8"'+O+'/>'+
  '<rect x="-46" y="-84" width="92" height="13" rx="2" fill="#b9a2e6"'+O+'/><path d="M-40-84A40 42 0 0 1 40-84Z" fill="#6a4fb6"'+O+'/><path d="M-24-104Q-14-118 2-122" fill="none" stroke="#a48df0" stroke-width="4" stroke-linecap="round"/>'+
  '<path d="M0-126V-138" stroke="#2a2340" stroke-width="2.5"/><path d="M10-170A17 17 0 1 0 10-138A13 13 0 1 1 10-170Z" fill="#ffd24a"'+O+'/><circle class="gl" cx="4" cy="-154" r="24" fill="#ffe27a" opacity="0"/>'+
  star(-44,-138,8,'#ffe9a0')+star(46,-124,6,'#ffffff')+star(34,-160,5,'#ffe9a0'),
 '遊戲':()=>'<path d="M-68 0L-24-108Q0-116 24-108L68 0Z" fill="#6e5046"'+O+'/><path d="M0-114Q14-112 24-108L68 0H18Q10-50 0-114Z" fill="#573c33"/>'+
  '<path d="M-68 0L-24-108Q0-116 24-108L68 0Z" fill="none"'+O+'/><ellipse cx="0" cy="-108" rx="24" ry="7" fill="#ff7a2f"'+O+'/>'+
  '<path class="lava" d="M-6-104Q-18-74-6-56Q2-40-6-18" fill="none" stroke="#ff8a36" stroke-width="7" stroke-linecap="round"/><path class="lava" d="M10-104Q20-84 14-66" fill="none" stroke="#ffb347" stroke-width="5" stroke-linecap="round"/>'+
  '<path class="fire" d="M0-158C10-146 18-134 14-120C12-112 6-108 0-108C-8-108-16-114-14-126C-12-136-4-140 0-158Z" fill="#ff9a3c"'+O+'/><path class="fire" d="M0-138C5-130 7-124 5-118C3-114-3-114-5-118C-7-124-3-128 0-138Z" fill="#fff0a3"/>'+
  '<path d="M-60-4L-52-16-40-12-36 0Z" fill="#4a3530"'+O+'/><path d="M40 0L46-14 58-12 62 0Z" fill="#4a3530"'+O+'/><circle class="gl" cx="0" cy="-118" r="30" fill="#ff8a36" opacity="0"/>',
 '開源':()=>'<path class="ray" d="M-36-50L-74-150H74L36-50Z" fill="url(#gRay)"/>'+
  '<path d="M-48-50L-42-100Q0-112 42-100L48-50Z" fill="#c98545"'+O+'/><path d="M-30-100V-52M22-104V-52" stroke="#e8b54f" stroke-width="7"/>'+
  '<ellipse cx="0" cy="-50" rx="46" ry="9" fill="#5a3418"'+O+'/><rect x="-14" y="-76" width="30" height="22" rx="2" fill="#4f7fd8"'+O+' transform="rotate(-14 0 -66)"/><path d="M-6-74h16" stroke="#fff" stroke-width="2" transform="rotate(-14 0 -66)"/>'+
  '<path d="M-48-50H48V-4Q48 0 44 0H-44Q-48 0-48-4Z" fill="#b8743d"'+O+'/><rect x="-32" y="-50" width="9" height="50" fill="#e8b54f"'+O+'/><rect x="23" y="-50" width="9" height="50" fill="#e8b54f"'+O+'/>'+
  '<rect x="-8" y="-40" width="16" height="18" rx="3" fill="#ffd34d"'+O+'/><circle cx="0" cy="-32" r="2.6" fill="#5a3418"/>'+star(-30,-120,8,'#fff6c2')+star(32,-132,10,'#fff6c2')+star(4,-150,6),
 '學習':()=>'<rect x="-60" y="-48" width="38" height="48" fill="#f4e7cf"'+O+'/><path d="M-66-46L-41-72-16-46Z" fill="#c4513b"'+O+'/><path d="M-50 0V-20Q-50-28-41-28Q-32-28-32-20V0Z" fill="#7a4a2e"'+O+'/>'+
  '<rect x="-22" y="-124" width="46" height="124" fill="#f4e7cf"'+O+'/><rect x="10" y="-124" width="14" height="124" fill="#e5d0aa"/><rect x="-22" y="-124" width="46" height="124" fill="none"'+O+'/>'+
  '<path d="M-30-122L1-172 32-122Z" fill="#c4513b"'+O+'/><path d="M1-172V-186" stroke="#2a2340" stroke-width="2.5"/><path d="M1-186l14 4-14 5z" fill="#ffcf4a"'+O+'/>'+
  '<circle cx="1" cy="-94" r="15" fill="#fffdf6"'+O+'/><path d="M1-94V-104M1-94L8-90" stroke="#2a2340" stroke-width="2.4" stroke-linecap="round"/>'+
  '<rect class="win" x="-12" y="-58" width="10" height="16" rx="5" fill="#7fb6e6" stroke="#2a2340" stroke-width="2.5"/><rect class="win" x="4" y="-58" width="10" height="16" rx="5" fill="#7fb6e6" stroke="#2a2340" stroke-width="2.5"/>'+
  '<rect x="30" y="-12" width="34" height="12" rx="2" fill="#4f7fd8"'+O+'/><rect x="33" y="-24" width="30" height="12" rx="2" fill="#e8566c"'+O+'/><rect x="31" y="-36" width="28" height="12" rx="2" fill="#5fb35a"'+O+'/>',
 '職場':()=>'<rect x="-46" y="-150" width="54" height="150" fill="#7fa0cc"'+O+'/><rect x="-6" y="-150" width="14" height="150" fill="#6283b1"/><rect x="-46" y="-150" width="54" height="150" fill="none"'+O+'/><path d="M-20-150V-166" stroke="#2a2340" stroke-width="2.5"/><circle class="blink" cx="-20" cy="-168" r="3.5" fill="#ff5a5a"/>'+
  (()=>{let s='';for(let r=0;r<9;r++)for(let c=0;c<3;c++)s+='<rect class="win" x="'+(-40+c*14)+'" y="'+(-140+r*15)+'" width="9" height="9" rx="1.5" fill="#dff1ff"/>';return s;})()+
  '<rect x="8" y="-100" width="46" height="100" fill="#a9bedf"'+O+'/><rect x="42" y="-100" width="12" height="100" fill="#8da6cc"/><rect x="8" y="-100" width="46" height="100" fill="none"'+O+'/>'+
  (()=>{let s='';for(let r=0;r<6;r++)for(let c=0;c<2;c++)s+='<rect class="win" x="'+(14+c*14)+'" y="'+(-90+r*15)+'" width="9" height="9" rx="1.5" fill="#f2f8ff"/>';return s;})()+
  '<rect x="-60" y="-22" width="22" height="16" rx="3" fill="#8a5a3a"'+O+'/><path d="M-54-22v-5h10v5" fill="none" stroke="#2a2340" stroke-width="2.4"/>',
 '心理':()=>'<path class="beam" d="M0-132L-92-160V-110ZM0-132L92-160V-110Z" fill="#fff4b8" opacity=".55"/>'+
  '<path d="M-56 0Q-58-18-40-24Q-30-34-12-30H14Q32-34 44-22Q58-16 56 0Z" fill="#8f96a8"'+O+'/>'+
  '<path d="M-17-26L-11-124H11L17-26Z" fill="#ffffff"'+O+'/><path d="M-15-52L-14-70H14L15-52Z" fill="#e2574c"/><path d="M-13-88L-12-104H12L13-88Z" fill="#e2574c"/><path d="M-17-26L-11-124H11L17-26Z" fill="none"'+O+'/>'+
  '<rect x="-15" y="-142" width="30" height="18" rx="2" fill="#ffe27a"'+O+'/><circle class="gl" cx="0" cy="-133" r="20" fill="#ffe27a" opacity="0"/><path d="M-19-142L0-160 19-142Z" fill="#e2574c"'+O+'/>'+
  '<path d="M-60 8q8-6 16 0t16 0M24 8q8-6 16 0t16 0" fill="none" stroke="#5ab3dc" stroke-width="3" stroke-linecap="round"/>',
 '生活':()=>tree(46,0,1.25,'#5fb35a')+'<rect x="-56" y="-76" width="86" height="76" fill="#fff4e2"'+O+'/><path d="M-64-74L-13-116 38-74Z" fill="#e07a4f"'+O+'/><rect x="-36" y="-104" width="12" height="14" fill="#fff4e2"'+O+'/>'+
  '<path d="M-58-58H32L28-44Q22-38 16-44Q10-38 4-44Q-2-38-8-44Q-14-38-20-44Q-26-38-32-44Q-38-38-44-44Q-50-38-56-44Z" fill="#e8566c"'+O+'/><path d="M-43-58l-1 14M-19-58l-1 14M5-58l-1 14" stroke="#fff" stroke-width="6"/>'+
  '<rect class="win" x="-46" y="-34" width="30" height="22" rx="2" fill="#bfe3f5" stroke="#2a2340" stroke-width="2.5"/><path d="M-2 0V-28Q-2-34 6-34Q14-34 14-28V0Z" fill="#7a4a2e"'+O+'/>'+
  '<path d="M-62 0L-60-12H-48L-46 0Z" fill="#c9644f"'+O+'/><circle cx="-54" cy="-18" r="7" fill="#5fb35a"'+O+'/>',
 '感情':()=>'<ellipse cx="0" cy="-6" rx="30" ry="9" fill="#9fdcec"'+O+'/><path d="M0-10V-26" stroke="#9fdcec" stroke-width="4"/><path class="drop" d="M0-26q-8-6-12 4M0-26q8-6 12 4" fill="none" stroke="#bfeaf5" stroke-width="3" stroke-linecap="round"/>'+
  '<path d="M0-24C-62-64-74-132-32-146C-12-152 0-136 0-124C0-136 12-152 32-146C74-132 62-64 0-24" fill="none" stroke="#2a2340" stroke-width="20" stroke-linecap="round" class="ol2"/>'+
  '<path d="M0-24C-62-64-74-132-32-146C-12-152 0-136 0-124C0-136 12-152 32-146C74-132 62-64 0-24" fill="none" stroke="#5fae5f" stroke-width="15" stroke-linecap="round"/>'+
  (()=>{let s='';const pts=[[-46,-62],[-60,-96],[-52,-130],[-26,-146],[-6,-132],[6,-132],[26,-146],[52,-130],[60,-96],[46,-62],[-24,-40],[24,-40]];pts.forEach((p,i)=>s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(i%3?5:6.5)+'" fill="'+(i%2?'#ff8fb1':'#ff5c8a')+'" stroke="#2a2340" stroke-width="1.6"/>');return s;})()+
  '<path d="M0-78C-12-90-20-98-14-104C-10-108-4-106 0-100C4-106 10-108 14-104C20-98 12-90 0-78Z" fill="#ff5c8a"'+O+'/>',
 '娛樂':()=>'<path d="M-34 0L0-82 34 0" fill="none" stroke="#2a2340" stroke-width="9" stroke-linejoin="round"/><path d="M-34 0L0-82 34 0" fill="none" stroke="#7d6aa8" stroke-width="5" stroke-linejoin="round"/>'+
  '<g class="wheel">'+(()=>{let s='<circle cx="0" cy="-82" r="62" fill="none" stroke="#2a2340" stroke-width="8"/><circle cx="0" cy="-82" r="62" fill="none" stroke="#ff6b81" stroke-width="5"/>';for(let k=0;k<8;k++){const a=k/8*Math.PI*2;s+='<path d="M0-82L'+(Math.cos(a)*62).toFixed(1)+' '+(-82+Math.sin(a)*62).toFixed(1)+'" stroke="#ff9aa8" stroke-width="2"/>';}
   for(let k=0;k<8;k++){const a=k/8*Math.PI*2,x=Math.cos(a)*62,y=-82+Math.sin(a)*62;s+='<rect x="'+(x-8).toFixed(1)+'" y="'+(y-2).toFixed(1)+'" width="16" height="13" rx="4" fill="'+['#ffd166','#4cc9f0','#90be6d','#f9844a'][k%4]+'" stroke="#2a2340" stroke-width="2"/>';}return s;})()+'</g>'+
  '<circle cx="0" cy="-82" r="7" fill="#ffd166"'+O+'/>',
 '放鬆':()=>'<path d="M44-2Q40-60 22-112" fill="none" stroke="#2a2340" stroke-width="12" stroke-linecap="round"/><path d="M44-2Q40-60 22-112" fill="none" stroke="#a8743f" stroke-width="8" stroke-linecap="round"/>'+
  (()=>{let s='';[[-50,-10],[-20,-34],[18,-36],[46,-8],[0,8]].forEach((v,i)=>s+='<path d="M22-112Q'+(22+v[0]*.6)+' '+(-112+v[1]-18)+' '+(22+v[0])+' '+(-112+v[1]+16)+'Q'+(22+v[0]*.45)+' '+(-112+v[1]*.3)+' 22-112Z" fill="'+(i%2?'#3f9a55':'#56b36a')+'"'+O+'/>');return s;})()+
  '<circle cx="30" cy="-104" r="5" fill="#8a5a3a"'+O+'/>'+
  '<ellipse cx="-14" cy="-12" rx="48" ry="15" fill="#d9c6a0"'+O+'/><ellipse cx="-14" cy="-14" rx="38" ry="10" fill="#8fd8e6"/><path d="M-30-16q6-3 12 0" stroke="#fff" stroke-width="2" fill="none"/>'+
  '<path class="steam" d="M-30-30q-6-10 0-18t0-18M-12-30q-6-10 0-18t0-18M6-30q-6-10 0-18t0-18" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity=".85"/>'+
  '<path d="M-58-8V-74" stroke="#2a2340" stroke-width="3"/><path d="M-90-72Q-58-102-26-72Z" fill="#ffd166"'+O+'/><path d="M-69-72Q-62-96-58-98Q-54-96-47-72Z" fill="#e8566c"/>',
 '萌寵':()=>'<path d="M-16 0Q-12-40-14-70H14Q12-40 16 0Z" fill="#8a5a3a"'+O+'/><path d="M14-54Q30-58 40-70" fill="none" stroke="#8a5a3a" stroke-width="7" stroke-linecap="round"/>'+
  '<circle cx="-36" cy="-92" r="30" fill="#4f9e4a"'+O+'/><circle cx="36" cy="-98" r="32" fill="#4f9e4a"'+O+'/><circle cx="0" cy="-122" r="40" fill="#6cbf5a"'+O+'/><circle cx="-14" cy="-134" r="12" fill="#95d980"/><circle cx="-40" cy="-100" r="8" fill="#7ccb6a"/>'+
  '<circle cx="22" cy="-126" r="4" fill="#ff6b6b"/><circle cx="-22" cy="-104" r="4" fill="#ff6b6b"/><circle cx="44" cy="-90" r="4" fill="#ff6b6b"/>'+
  '<rect x="-12" y="-58" width="24" height="22" rx="2" fill="#f0c27b"'+O+'/><circle class="gl" cx="0" cy="-47" r="16" fill="#ffd36b" opacity="0"/><path d="M-17-56L0-72 17-56Z" fill="#c4513b"'+O+'/><circle cx="0" cy="-47" r="5" fill="#5a3418"/>'+
  '<g class="bird"><ellipse cx="44" cy="-78" rx="10" ry="8" fill="#ffd34d"'+O+'/><path d="M53-80l7 2-7 3z" fill="#ff8a36"/><circle cx="47" cy="-81" r="1.8" fill="#2a2340"/></g>',
 '_':()=>'<path d="M-46 0L0-96 46 0Z" fill="#f4efe6"'+O+'/><path d="M0-96L46 0H14Z" fill="#e2d6c2"/><path d="M-10 0L0-36 10 0Z" fill="#7a4a2e"/><path d="M0-96V-124" stroke="#2a2340" stroke-width="3"/><path d="M0-124l22 7-22 7z" fill="#e8566c"'+O+'/>'
 };
 /* badge icons, 24-unit box, white on the region colour */
 const I={
  'AI':'<path d="M0-9L2.5-2.5 9 0 2.5 2.5 0 9-2.5 2.5-9 0-2.5-2.5Z"/>',
  '程式':'<path d="'+gearPath(0,0,9,8)+'"/><circle r="3.2" fill="var(--ic)"/>',
  '命理':'<path d="M4-9A9 9 0 1 0 4 9A11 11 0 0 1 4-9Z"/>',
  '遊戲':'<path d="M0-10C5-5 7-1 6 3C5 7 2 9 0 9S-6 7-6 2C-6-2-2-4 0-10Z"/>',
  '開源':'<path d="M-9-7H9V-2H-9ZM-8-1H8V8H-8Z"/><rect x="-2" y="-3" width="4" height="5" fill="var(--ic)"/>',
  '學習':'<path d="M-9-6Q-4-9 0-5Q4-9 9-6V7Q4 4 0 8Q-4 4-9 7Z"/>',
  '職場':'<path d="M-9-4H9V8H-9ZM-4-4V-8H4V-4H2V-6H-2V-4Z"/>',
  '心理':'<path d="M-7 8C-8-3 0-9 9-9C9 0 3 8-7 8Z"/>',
  '生活':'<path d="M0-9L9-1H6V8H-6V-1H-9Z"/>',
  '感情':'<path d="M0 8C-11 1-10-8-4-8C-2-8 0-6 0-5C0-6 2-8 4-8C10-8 11 1 0 8Z"/>',
  '娛樂':'<path d="M0-9L2.6-3 9-2.6 4-1.6 5.6 6 0 3 -5.6 6-4-1.6-9-2.6-2.6-3Z"/>',
  '放鬆':'<path d="M-9 1Q-4.5-5 0 1T9 1V8H-9Z"/>',
  '萌寵':'<ellipse cx="0" cy="4" rx="5" ry="4.2"/><circle cx="-6" cy="-2" r="2.6"/><circle cx="-2" cy="-6.5" r="2.6"/><circle cx="3" cy="-6.5" r="2.6"/><circle cx="7" cy="-2" r="2.6"/>',
  '_':'<path d="M-6-9V9M-6-9L8-5-6-1"/>'
 };
 const COL={'AI':['#2fb0d4','#bfe8ef'],'程式':['#56699a','#cdd5e3'],'命理':['#7a5cc8','#d3c3ee'],'遊戲':['#d9542a','#a98472'],'開源':['#c27d3e','#ecd9a2'],'學習':['#d4892a','#f3d9a0'],
  '職場':['#4f78b0','#d6d3ca'],'心理':['#3a8bd6','#bcd6f3'],'生活':['#d79b2c','#f4e3a6'],'感情':['#e0577f','#f8c6d4'],'娛樂':['#e04d64','#f7c4b8'],'放鬆':['#24a596','#f2e5bd'],'萌寵':['#469a42','#94cf7c'],'_':['#6b8f71','#cfe3b8']};
 /* ground material per region: [fill, edge, marks(rand,cx,cy,rx,ry)] */
 const sc=(r,cx,cy,rx,ry,n,fn)=>{let s='';for(let k=0;k<n;k++){const a=r()*Math.PI*2,d=Math.sqrt(r());const x=cx+Math.cos(a)*rx*d,y=cy+Math.sin(a)*ry*d;s+=fn(x,y,r,k);}return s;};
 const fx=n=>n.toFixed(1);
 const T={
  'AI':['#d9f3f8','#a9dbe6',(r,cx,cy,rx,ry)=>sc(r,cx,cy,rx,ry,9,(x,y,r)=>'<path d="M'+fx(x)+' '+fx(y)+'l4-12 4 12z" fill="#9ee3f2" stroke="#6cbfd6" stroke-width="1.2"/>')],
  '程式':['#cfd7e4','#a7b3c8',(r,cx,cy,rx,ry)=>sc(r,cx,cy,rx,ry,7,(x,y)=>'<path d="M'+fx(x)+' '+fx(y)+'h14v-8h10" fill="none" stroke="#8796b2" stroke-width="2" stroke-linecap="round"/><circle cx="'+fx(x+24)+'" cy="'+fx(y-8)+'" r="2.4" fill="#8796b2"/>')],
  '命理':['#cbbbe9','#a893d6',(r,cx,cy,rx,ry)=>sc(r,cx,cy,rx,ry,12,(x,y,r,k)=>'<circle cx="'+fx(x)+'" cy="'+fx(y)+'" r="'+(k%3?1.6:2.6)+'" fill="#fff6d6"/>')],
  '遊戲':['#7d6156','#5c463e',(r,cx,cy,rx,ry)=>sc(r,cx,cy,rx,ry,6,(x,y,r)=>'<path class="lava" d="M'+fx(x)+' '+fx(y)+'l'+fx(8+r()*8)+' '+fx(3-r()*6)+'l'+fx(6+r()*6)+' '+fx(4)+'" fill="none" stroke="#ff8a3a" stroke-width="2.4" stroke-linecap="round"/>')],
  '開源':['#ecd9a0','#d2bb7a',(r,cx,cy,rx,ry)=>sc(r,cx,cy,rx,ry,10,(x,y)=>'<path d="M'+fx(x)+' '+fx(y)+'l-3-7M'+fx(x)+' '+fx(y)+'v-8M'+fx(x)+' '+fx(y)+'l3-7" stroke="#c9a85a" stroke-width="1.8" stroke-linecap="round"/>')],
  '學習':['#f3dba3','#dcbd7c',(r,cx,cy,rx,ry)=>{let s='';for(let k=-3;k<=3;k++)s+='<rect x="'+fx(cx+k*16-6)+'" y="'+fx(cy+ry*.55+Math.abs(k)*-2)+'" width="12" height="7" rx="2" fill="#e8c88a" stroke="#cfa964" stroke-width="1"/>';return s;}],
  '職場':['#dcd7cd','#bdb6a8',(r,cx,cy,rx,ry)=>{let s='';for(let i=-3;i<=3;i++)s+='<path d="M'+fx(cx+i*24-30)+' '+fx(cy-ry*.6)+'L'+fx(cx+i*24+30)+' '+fx(cy+ry*.6)+'" stroke="#c7c0b2" stroke-width="1.4"/>';return s;}],
  '心理':['#c2daf3','#99bde6',(r,cx,cy,rx,ry)=>sc(r,cx,cy,rx,ry,6,(x,y)=>'<path d="M'+fx(x)+' '+fx(y)+'q5-4 10 0t10 0" fill="none" stroke="#86b0e0" stroke-width="2" stroke-linecap="round"/>')],
  '生活':['#f3e3a6','#d9c47c',(r,cx,cy,rx,ry)=>sc(r,cx,cy,rx,ry,14,(x,y)=>'<ellipse cx="'+fx(x)+'" cy="'+fx(y)+'" rx="5" ry="3" fill="#e6d08e" stroke="#cdb46e" stroke-width="1"/>')],
  '感情':['#f9cad8','#ee9fb7',(r,cx,cy,rx,ry)=>sc(r,cx,cy,rx,ry,16,(x,y,r,k)=>'<circle cx="'+fx(x)+'" cy="'+fx(y)+'" r="3" fill="'+['#ff6f91','#ffffff','#ffd166'][k%3]+'"/>')],
  '娛樂':['#f8cbbd','#eba493',(r,cx,cy,rx,ry)=>sc(r,cx,cy,rx,ry,16,(x,y,r,k)=>'<rect x="'+fx(x)+'" y="'+fx(y)+'" width="5" height="3" rx="1" transform="rotate('+(k*37%90)+' '+fx(x)+' '+fx(y)+')" fill="'+['#4cc9f0','#ffd166','#90be6d','#f9844a'][k%4]+'"/>')],
  '放鬆':['#f5e7bf','#e2cd93',(r,cx,cy,rx,ry)=>sc(r,cx,cy,rx,ry,9,(x,y,r,k)=>k%2?'<path d="M'+fx(x)+' '+fx(y)+'a5 5 0 0 1 10 0z" fill="#fff4dc" stroke="#d6b87c" stroke-width="1.2"/>':'<circle cx="'+fx(x)+'" cy="'+fx(y)+'" r="1.8" fill="#d6b87c"/>')],
  '萌寵':['#86c46f','#67a653',(r,cx,cy,rx,ry)=>sc(r,cx,cy,rx,ry,14,(x,y)=>'<path d="M'+fx(x-4)+' '+fx(y)+'l2-7 2 5 2-6 2 8" fill="none" stroke="#4f9443" stroke-width="1.8" stroke-linejoin="round"/>')],
  '_':['#d6e8c2','#b7cf9d',()=>'']
 };
 return {L,I,COL,T};
})();

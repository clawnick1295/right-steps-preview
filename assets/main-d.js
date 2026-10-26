(()=>{
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)],root=document.documentElement;
const lerp=(a,b,t)=>a+(b-a)*t,clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
// nav
const tg=$('.nav-toggle'),nav=$('#main-nav');tg&&tg.addEventListener('click',()=>{tg.setAttribute('aria-expanded',nav.classList.toggle('open'))});
// split letter index
$$('.kinetic .ch').forEach((c,i)=>c.style.setProperty('--i',i));
// counters
function count(el){const to=+el.dataset.to,comma=el.dataset.comma;if(rm){return}const t0=performance.now(),d=1400;
(function f(t){const p=Math.min(1,(t-t0)/d),v=Math.round(to*(1-Math.pow(1-p,3)));el.textContent=comma?v.toLocaleString('en-US'):v;if(p<1)requestAnimationFrame(f)})(t0)}
// reveals
const rv=$$('.reveal');
if(rm||!('IntersectionObserver'in window))rv.forEach(e=>e.classList.add('in'));
else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');$$('.count',e.target).forEach(count);io.unobserve(e.target)}}),{threshold:.15});rv.forEach(e=>io.observe(e))}
// owl
const owl=$('.owl'),lines=['Hoo! Hi there!','Come take a tour!','Gold Seal quality!','Breakfast, lunch & snack!','See you at 7am!'];let li=0,to;
owl&&owl.addEventListener('click',()=>{owl.querySelector('.bubble').textContent=lines[li++%lines.length];owl.classList.remove('hop');void owl.offsetWidth;owl.classList.add('hop','talk');clearTimeout(to);to=setTimeout(()=>owl.classList.remove("talk"),2200);rm||burst()});
if(rm)return;
// pointer state
let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
// custom cursor
const cur=$('.cursor');if(fine&&cur){root.classList.add('has-cursor');
document.addEventListener('pointerover',e=>{cur.classList.toggle('hover',!!e.target.closest('a,button,.tile,.shot'))});}
// magnetic
if(fine)$$('.magnetic').forEach(b=>{const s=b.firstElementChild;
b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;b.style.transform=`translate(${x*.3}px,${y*.4}px)`;s.style.transform=`translate(${x*.15}px,${y*.2}px)`});
b.addEventListener('pointerleave',()=>{b.style.transform='';s.style.transform=''})});
// tilt + glare
if(fine)$$('.tilt').forEach(t=>{t.addEventListener('pointermove',e=>{const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
t.style.transform=`rotateY(${(x-.5)*14}deg) rotateX(${(.5-y)*14}deg) translateZ(0)`;t.style.setProperty('--gx',x*100+'%');t.style.setProperty('--gy',y*100+'%')});
t.addEventListener('pointerleave',()=>t.style.transform='')});
// star canvas
const cv=$('#stars'),ctx=cv.getContext('2d');let W,H,dpr,P=[],sparks=[];
function size(){dpr=Math.min(2,devicePixelRatio||1);W=cv.width=innerWidth*dpr;H=cv.height=innerHeight*dpr;const n=Math.round(clamp(innerWidth*innerHeight/9000,50,170));
P=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*.8+.2,vx:0,vy:0,t:Math.random()*6}))}
size();addEventListener('resize',size);
function burst(){if(!owl)return;const r=owl.getBoundingClientRect();for(let i=0;i<40;i++){const a=Math.random()*6.28,s=2+Math.random()*5;sparks.push({x:(r.left+r.width/2)*dpr,y:(r.top+r.height*.4)*dpr,vx:Math.cos(a)*s*dpr,vy:Math.sin(a)*s*dpr-2*dpr,l:1})}}
let sy=scrollY,lastSy=sy,vel=0;
// showcase pin
const sc=$('.showcase'),track=$('.sc-track'),rail=$('.sc-rail');let pinned=false,dist=0;
function setupPin(){pinned=innerWidth>=900;sc.classList.toggle('pinned',pinned);if(pinned){dist=track.scrollWidth-innerWidth;sc.style.height=(innerHeight+dist)+'px'}else{sc.style.height='';track.style.removeProperty('--tx')}}
setupPin();addEventListener('resize',setupPin);addEventListener('load',setupPin);
// drag to scroll (desktop pinned maps to page scroll; mobile uses native swipe)
let drag=null;rail.addEventListener('pointerdown',e=>{if(!pinned||e.pointerType!=='mouse')return;drag={x:e.clientX,s:scrollY};cur&&cur.classList.add('drag');rail.setPointerCapture(e.pointerId)});
rail.addEventListener('pointermove',e=>{if(drag)scrollTo(0,drag.s-(e.clientX-drag.x)*1.2)});
['pointerup','pointercancel'].forEach(ev=>rail.addEventListener(ev,()=>{drag=null;cur&&cur.classList.remove('drag')}));
rail.addEventListener('keydown',e=>{if(!pinned)return;const d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(d){e.preventDefault();scrollBy({top:d*innerWidth*.35,behavior:'smooth'})}});
$$('.shot').forEach(s=>s.addEventListener('focus',()=>{if(!pinned)return;const i=$$('.shot').indexOf(s),n=$$('.shot').length;scrollTo({top:sc.offsetTop+dist*(i/(n-1)),behavior:'smooth'})}));
const owlEyes=owl&&owl.querySelector('.pupils'),portal=$('.portal'),shots=$$('.shot-img img');
function frame(){
cx=lerp(cx,mx,.18);cy=lerp(cy,my,.18);if(cur)cur.style.transform=`translate3d(${cx}px,${cy}px,0)`;
sy=scrollY;vel=lerp(vel,sy-lastSy,.2);lastSy=sy;
root.style.setProperty('--sp',(sy/(document.body.scrollHeight-innerHeight)).toFixed(4));
// hero parallax
if(portal&&sy<innerHeight*1.2){portal.style.setProperty('--px',((mx/innerWidth-.5)*16)+'px');portal.style.setProperty('--py',((my/innerHeight-.5)*16+sy*.08)+'px')}
if(owl){const r=owl.getBoundingClientRect(),a=Math.atan2(my-(r.top+r.height*.45),mx-(r.left+r.width/2)),d=Math.min(1,Math.hypot(mx-r.left,my-r.top)/200);owl.style.setProperty('--ex',Math.cos(a)*6*d+'px');owl.style.setProperty('--ey',Math.sin(a)*6*d+'px')}
// showcase
if(pinned){const top=sc.offsetTop,p=clamp((sy-top)/dist,0,1);track.style.setProperty('--tx',(-p*dist)+'px');sc.style.setProperty('--sc',p);
shots.forEach((im,i)=>{im.style.setProperty('--sx',((p*(shots.length-1)-i)*-4)+'%')})}
else{const p=rail.scrollLeft/Math.max(1,rail.scrollWidth-rail.clientWidth);sc.style.setProperty('--sc',p)}
// stars
ctx.clearRect(0,0,W,H);const pmx=mx*dpr,pmy=my*dpr;
for(const s of P){s.t+=.02;s.y-=(.15+vel*.25)*s.z*dpr;if(s.y<0)s.y+=H;if(s.y>H)s.y-=H;
const dx=s.x-pmx,dy=s.y-pmy,d2=dx*dx+dy*dy,R=140*dpr;if(d2<R*R){const f=(1-Math.sqrt(d2)/R)*1.4;s.vx+=dx/R*f;s.vy+=dy/R*f}
s.x+=s.vx;s.y+=s.vy;s.vx*=.92;s.vy*=.92;if(s.x<0)s.x+=W;if(s.x>W)s.x-=W;
const a=.45+Math.sin(s.t)*.35;ctx.fillStyle=`rgba(255,${200+s.z*40|0},${120+s.z*80|0},${a*s.z})`;ctx.beginPath();ctx.arc(s.x,s.y,s.z*1.8*dpr,0,6.28);ctx.fill()}
// constellation lines near cursor
ctx.strokeStyle='rgba(255,210,122,.18)';ctx.lineWidth=dpr;ctx.beginPath();
const near=P.filter(s=>Math.abs(s.x-pmx)<220*dpr&&Math.abs(s.y-pmy)<220*dpr);
for(let i=0;i<near.length;i++)for(let j=i+1;j<near.length;j++){const a=near[i],b=near[j];if(Math.abs(a.x-b.x)+Math.abs(a.y-b.y)<110*dpr){ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y)}}ctx.stroke();
sparks=sparks.filter(k=>(k.l-=.02)>0);for(const k of sparks){k.x+=k.vx;k.y+=k.vy;k.vy+=.15*dpr;ctx.fillStyle=`rgba(255,210,122,${k.l})`;ctx.beginPath();ctx.arc(k.x,k.y,2.4*dpr*k.l,0,6.28);ctx.fill()}
requestAnimationFrame(frame)}
requestAnimationFrame(frame);
})();

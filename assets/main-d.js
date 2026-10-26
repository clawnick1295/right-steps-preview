(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const t=document.querySelector('.nav-toggle'),n=document.getElementById('main-nav');
t&&t.addEventListener('click',()=>{const o=n.classList.toggle('open');t.setAttribute('aria-expanded',o)});
const r=document.querySelectorAll('.reveal');
if(rm||!('IntersectionObserver'in window)){r.forEach(e=>e.classList.add('in'));}
else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});r.forEach(e=>io.observe(e));}
const tl=document.querySelector('.timeline');if(rm){tl&&tl.style.setProperty('--p',1);return;}
const par=document.querySelectorAll('[data-speed]'),eyes=document.querySelectorAll('.eye i'),root=document.documentElement;let tick=false;
function onScroll(){if(tick)return;tick=true;requestAnimationFrame(()=>{const vh=innerHeight;
par.forEach(el=>{const b=el.getBoundingClientRect();const c=b.top+b.height/2-vh/2;el.style.transform=`translateY(${Math.max(-40,Math.min(40,c*+el.dataset.speed))}px)`});
if(tl){const b=tl.getBoundingClientRect();const p=Math.min(1,Math.max(0,(vh*.6-b.top)/b.height));tl.style.setProperty('--p',p.toFixed(3))}
tick=false})}
addEventListener('scroll',onScroll,{passive:true});onScroll();
addEventListener('pointermove',e=>{root.style.setProperty('--x',e.clientX+'px');root.style.setProperty('--y',e.clientY+'px');
eyes.forEach(i=>{const b=i.parentElement.getBoundingClientRect();const a=Math.atan2(e.clientY-b.top-17,e.clientX-b.left-17);i.style.setProperty('--ex',Math.cos(a)*6+'px');i.style.setProperty('--ey',Math.sin(a)*6+'px')})},{passive:true});
})();

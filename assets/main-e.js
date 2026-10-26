(()=>{const root=document.documentElement,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$=s=>[...document.querySelectorAll(s)];
// tuition toggle
$$('.tu-toggle button').forEach(b=>b.addEventListener('click',()=>{$$('.tu-toggle button').forEach(x=>x.setAttribute('aria-pressed',x===b));$$('.price').forEach(c=>c.classList.toggle('is-on',c.dataset.plan===b.dataset.plan))}));
// reveals
const rv=$$('.reveal');if(rm||!('IntersectionObserver'in window))rv.forEach(e=>e.classList.add('in'));else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -10% 0px'});rv.forEach(e=>io.observe(e))}
if(rm){root.classList.add('static');return}
const J=document.querySelector('.journey'),S=$$('.scene'),D=$$('.dots li'),N=S.length;J.style.setProperty('--n',N);
// preload next images early so zooms never show blanks
S.forEach((s,i)=>{s.querySelector('img').loading='eager';if(i)s.style.setProperty('--co',S[i-1].style.getPropertyValue('--fo'))});
const c=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
let tick=false;
function upd(){tick=false;const r=J.getBoundingClientRect(),len=J.offsetHeight-innerHeight;const p=c(-r.top/len)*(N-1+.6);
S.forEach((s,i)=>{const l=p-i;
// entering: circle grows from previous scene's focal point
if(i>0){const e=ease(c((l+1-.25)/.75));s.style.setProperty('--r',(e*150).toFixed(2)+'%');s.style.setProperty('--s',(1.15-.15*e).toFixed(4));if(e<1)s.querySelector('img').style.transform=`scale(${1.15-.15*e})`}
// leaving: zoom into focal point
if(i===N-1&&l>=0){s.querySelector('img').style.transform=`scale(${(1+c(l)*.08).toFixed(4)})`}
else if(l>=0){const z=1+ease(c(l/1.0))*1.6;s.querySelector('img').style.transform=`scale(${z.toFixed(4)})`}
else if(i===0)s.querySelector('img').style.transform='scale(1)';
const o=i===0?c(1-l*2.2):i===N-1?c(1-Math.max(0,-.03-l)*4):c(1-Math.max(0,Math.abs(l-.15)-.18)*4);s.style.setProperty('--o',o.toFixed(3));
s.setAttribute('aria-hidden',o<.05?'true':'false')});
const a=Math.round(c(p,0,N-1));D.forEach((d,i)=>d.classList.toggle('on',i===a))}
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd);upd();
})();

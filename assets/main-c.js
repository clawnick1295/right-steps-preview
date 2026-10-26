// Option C: section scroll reveals and word by word tagline reveal (IntersectionObserver only)
document.addEventListener('DOMContentLoaded',function(){
  if(!('IntersectionObserver' in window))return;
  var secs=document.querySelectorAll('.option-c main > section:not(.hero), .option-c .facts');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  secs.forEach(function(s){s.classList.add('rv');io.observe(s)});
  document.querySelectorAll('.reveal-words').forEach(function(p){
    p.innerHTML=p.textContent.trim().split(/\s+/).map(function(w){return '<span class="w">'+w+'</span>'}).join(' ');
    var ws=p.querySelectorAll('.w');
    var wo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');wo.unobserve(e.target)}})},{rootMargin:'0px 0px -40% 0px'});
    ws.forEach(function(w){wo.observe(w)});
  });
});

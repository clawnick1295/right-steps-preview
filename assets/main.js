// Mobile nav toggle, mock form handler (nothing is sent in the mockup), and option-B review carousel
document.addEventListener('DOMContentLoaded',function(){
  var b=document.querySelector('.nav-toggle'),n=document.getElementById('main-nav');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)})}
  var f=document.getElementById('tour-form');
  if(f&&f.dataset.mock==='true'){f.addEventListener('submit',function(e){e.preventDefault();var m=document.getElementById('form-msg');m.classList.add('show');m.focus()})}
  document.querySelectorAll('.b-carousel').forEach(function(c){
    var t=c.querySelector('.b-track');
    c.querySelector('.b-prev').addEventListener('click',function(){t.scrollBy({left:-t.clientWidth,behavior:'smooth'})});
    c.querySelector('.b-next').addEventListener('click',function(){t.scrollBy({left:t.clientWidth,behavior:'smooth'})});
  });
});

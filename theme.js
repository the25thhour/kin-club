(function(){
  var KEY='kin-theme', root=document.documentElement, t='lime';
  try{var q=new URLSearchParams(location.search).get('theme');if(q==='pink'||q==='lime'){t=q}else{t=localStorage.getItem(KEY)||'lime'}}catch(e){}
  function swapImages(theme){
    document.querySelectorAll('img[src*="assets/social/"],a[href*="assets/social/"]').forEach(function(el){
      var attr=el.tagName==='IMG'?'src':'href', v=el.getAttribute(attr);
      if(!/assets\/social\/0\d/.test(v)&&!/assets\/social\/pink\//.test(v))return;
      v=v.replace('assets/social/pink/','assets/social/');
      if(theme==='pink')v=v.replace('assets/social/','assets/social/pink/');
      el.setAttribute(attr,v);
    });
  }
  function apply(theme){
    root.setAttribute('data-theme',theme);
    var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',theme==='pink'?'#FFA8CD':'#E6FFA9');
    document.querySelectorAll('.theme-switch button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.theme===theme))});
    document.querySelectorAll('a[href]').forEach(function(a){var h=a.getAttribute('href');if(/^(index|brand|social)\.html/.test(h)){h=h.replace(/\?theme=\w+/,'');if(theme==='pink')h=h.replace(/\.html/,'.html?theme=pink');a.setAttribute('href',h)}});
    swapImages(theme);
    try{localStorage.setItem(KEY,theme)}catch(e){}
  }
  root.setAttribute('data-theme',t);
  document.addEventListener('DOMContentLoaded',function(){
    var w=document.createElement('div');w.className='theme-switch';w.setAttribute('role','group');w.setAttribute('aria-label','Colour direction');
    w.innerHTML='<span>Colours</span><button type="button" data-theme="lime"><i style="background:#E6FFA9"></i>Lime</button><button type="button" data-theme="pink"><i style="background:#FFA8CD"></i>Pink</button>';
    document.body.appendChild(w);
    w.addEventListener('click',function(e){var b=e.target.closest('button');if(b)apply(b.dataset.theme)});
    apply(t);
  });
})();

(function(){
  var KEY='kin-theme', root=document.documentElement;
  var THEMES={lime:{label:'Lime',dot:'#E6FFA9',meta:'#E6FFA9'},pink:{label:'Pink',dot:'#FFA8CD',meta:'#FFA8CD'},orchard:{label:'Orchard',dot:'#FBE7A1',meta:'#FBE7A1'}};
  var t='lime';
  try{var q=new URLSearchParams(location.search).get('theme');if(THEMES[q]){t=q}else{var s=localStorage.getItem(KEY);if(THEMES[s])t=s}}catch(e){}
  function swapImages(theme){
    document.querySelectorAll('img[src*="assets/social/"],a[href*="assets/social/"]').forEach(function(el){
      var attr=el.tagName==='IMG'?'src':'href', v=el.getAttribute(attr);
      if(!/assets\/social\/(pink\/|orchard\/)?0\d/.test(v))return;
      v=v.replace(/assets\/social\/(pink|orchard)\//,'assets/social/');
      if(theme!=='lime')v=v.replace('assets/social/','assets/social/'+theme+'/');
      el.setAttribute(attr,v);
    });
  }
  function apply(theme){
    root.setAttribute('data-theme',theme);
    var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',THEMES[theme].meta);
    document.querySelectorAll('.theme-switch button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.theme===theme))});
    document.querySelectorAll('a[href]').forEach(function(a){var h=a.getAttribute('href');if(/^(index|brand|social)\.html/.test(h)){h=h.replace(/\?theme=\w+/,'');if(theme!=='lime')h=h.replace(/\.html/,'.html?theme='+theme);a.setAttribute('href',h)}});
    swapImages(theme);
    try{localStorage.setItem(KEY,theme)}catch(e){}
  }
  root.setAttribute('data-theme',t);
  document.addEventListener('DOMContentLoaded',function(){
    var w=document.createElement('div');w.className='theme-switch';w.setAttribute('role','group');w.setAttribute('aria-label','Colour direction');
    var h='<span>Colours</span>';for(var k in THEMES)h+='<button type="button" data-theme="'+k+'"><i style="background:'+THEMES[k].dot+'"></i>'+THEMES[k].label+'</button>';
    w.innerHTML=h;document.body.appendChild(w);
    w.addEventListener('click',function(e){var b=e.target.closest('button');if(b)apply(b.dataset.theme)});
    apply(t);
  });
})();

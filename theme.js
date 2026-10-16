// The approved neutral direction is the default for every visitor, including saved previews.
(function(){
  document.documentElement.setAttribute('data-theme','neutral');
  try{localStorage.setItem('kin-theme','neutral')}catch(e){}
})();

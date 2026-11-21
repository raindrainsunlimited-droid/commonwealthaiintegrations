(function(){
  var boxes=[].slice.call(document.querySelectorAll('#tasks input'));
  var tally=document.getElementById('tally');
  var drains=document.getElementById('f-drains');
  var base='We can take some or all of this off your plate. Check what applies and we’ll start there.';
  function update(){
    var picked=boxes.filter(function(b){return b.checked}).map(function(b){return b.value});
    if(!picked.length){tally.textContent=base;return}
    tally.innerHTML='';
    tally.appendChild(document.createTextNode(picked.length+(picked.length===1?' area':' areas')+' to work on. '));
    var a=document.createElement('a');a.href='#intake';a.setAttribute('data-intake','');a.textContent='Add them to your intake form';
    a.addEventListener('click',function(){drains.value=picked.join(', ');});
    tally.appendChild(a);
  }
  boxes.forEach(function(b){b.addEventListener('change',function(){update();drains.value=boxes.filter(function(x){return x.checked}).map(function(x){return x.value}).join(', ');})});

  // Paste your Formspree form address here (formspree.io → New form → copy the endpoint),
  // e.g. 'https://formspree.io/f/abcdwxyz'. Until it's set, the form asks visitors to call or email.
  var FORM_ENDPOINT='';
  var dlg=document.getElementById('intake');
  function openIntake(e){ if(e) e.preventDefault(); if(!dlg.open){ try{dlg.showModal()}catch(_){dlg.setAttribute('open','')} document.body.classList.add('no-scroll'); setTimeout(function(){var g=document.getElementById('f-goal'); if(g) g.focus();},50);} }
  function closeIntake(){ if(dlg.open){ dlg.close?dlg.close():dlg.removeAttribute('open'); } }
  dlg.addEventListener('close',function(){document.body.classList.remove('no-scroll'); if(location.hash==='#intake'){try{history.replaceState(null,'',location.pathname+location.search)}catch(_){}}});
  dlg.addEventListener('click',function(e){ if(e.target===dlg) closeIntake(); });
  dlg.querySelector('.intake-close').addEventListener('click',closeIntake);
  document.addEventListener('click',function(e){ var t=e.target.closest && e.target.closest('[data-intake]'); if(t) openIntake(e); });
  if(location.hash==='#intake') openIntake();
  window.addEventListener('hashchange',function(){ if(location.hash==='#intake') openIntake(); });
  var form=document.getElementById('lead');
  var err=document.getElementById('f-err'), ok=document.getElementById('f-ok');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var labels={primary_goal:'your main goal',name:'your name',business:'your business name',email:'your email',phone:'your phone',annual_revenue:'annual revenue',employees:'number of employees'};
    var missing=[];
    Object.keys(labels).forEach(function(k){ if(!String(form[k].value||'').trim()) missing.push(labels[k]); });
    if(missing.length){err.textContent='Please add '+missing.join(', ')+'.';err.hidden=false;ok.hidden=true;return}
    if(form.email.validity && !form.email.validity.valid){err.textContent='Please check your email address.';err.hidden=false;ok.hidden=true;return}
    var web=form.website.value.trim(); if(web && !/^https?:\/\//i.test(web)) form.website.value='https://'+web;
    err.hidden=true;
    var name=form.name.value.trim();
    var btn=form.querySelector('button[type=submit]'); btn.disabled=true; btn.textContent='Sending…';
    if(!FORM_ENDPOINT){err.textContent='Our online form isn\u2019t switched on yet. Please call or email us using the details on this page.';err.hidden=false;btn.disabled=false;btn.textContent='Send my intake form';return}
    fetch(FORM_ENDPOINT,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)})
      .then(function(r){ if(!r.ok) throw new Error(r.status);
        ok.textContent='Thanks, '+name.split(' ')[0]+'. We got your intake form and will reach out within one business day to set up your free call.';
        ok.hidden=false; form.reset(); })
      .catch(function(){ err.textContent='That didn\u2019t go through. Please try again, or call or email us using the details on this page.'; err.hidden=false; })
      .then(function(){ btn.disabled=false; btn.textContent='Send my intake form'; });
  });
})();

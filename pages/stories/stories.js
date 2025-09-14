// Stories page scaffold
(function(){
  'use strict';
  function init(){
    const el = document.getElementById('storiesContainer');
    if (!el) return;
    const sample = (i)=>({
      id:i,
      title:`Story ${i}: Courage and Hope`,
      author:['Ahmed','Fatima','Rahman','Sultana'][i%4],
      excerpt:'A brief memory from 1971 that reflects resilience and unity.'
    });
    const items = Array.from({length:6},(_,i)=>sample(i+1));
    el.innerHTML = items.map(s=>`
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <h5>${s.title}</h5>
          <div class="muted">by ${s.author}</div>
          <p>${s.excerpt}</p>
          <button class="btn" onclick="navigate('archive')"><i class="fas fa-book"></i> Read</button>
        </div>
      </div>
    `).join('');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

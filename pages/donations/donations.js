(function(){
	// Ensure hamburger works locally on the Donations page (no core.js changes)
	function donationsToggleMenu(force){
		const side = document.getElementById('side');
		const overlay = document.getElementById('overlay');
		if(!side || !overlay) return;
		const willOpen = typeof force === 'boolean' ? force : !side.classList.contains('open');
		side.classList.toggle('open', willOpen);
		overlay.classList.toggle('active', willOpen);
	}
	function initDonationsHamburger(){
		const hamb = document.getElementById('hamb');
		const overlay = document.getElementById('overlay');
		if(hamb){
			// Capture phase to avoid other handlers swallowing the click
			hamb.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); donationsToggleMenu(); }, true);
		}
		if(overlay){
			overlay.addEventListener('click', ()=> donationsToggleMenu(false));
		}
	}
	// Initialize immediately (script is loaded at the end of body)
	initDonationsHamburger();

	// Elements
	const chips = document.getElementById('quickChips');
	const amount = document.getElementById('amount');
	const range = document.getElementById('amountRange');
	const donateBtn = document.getElementById('donateBtn');
	const currency = document.getElementById('currency');
	const currencyPrefix = document.getElementById('currencyPrefix');

	// Campaign State
	const goalBDT = 200000; // ৳
	let raisedBDT = 0;

	// Simple counters in hero
	const countUp = (el, target, dur=900)=>{
		if(!el) return; let s=0; const step = Math.max(1, Math.round(target/(dur/16)));
		const t = setInterval(()=>{ s+=step; if(s>=target){ s=target; clearInterval(t);} el.textContent=s.toLocaleString(); },16);
	};
	countUp(document.getElementById('statArtifacts'), 156);
	countUp(document.getElementById('statStudents'), 3200);
	countUp(document.getElementById('statEvents'), 18);

	// Helpers
	const fmt = (val)=> Number(val).toLocaleString();
	const updatePrefix = ()=>{ currencyPrefix.textContent = currency.value === 'USD' ? '$' : '৳'; };
	updatePrefix();

	// Sync amount and range
	const setAmount = (v)=>{
		const n = Math.min(20000, Math.max(100, Number(v)||0));
		amount.value = n;
		range.value = n;
		// activate chip if matching
		if(chips){
			chips.querySelectorAll('.chip').forEach(c=> c.classList.toggle('active', Number(c.dataset.amt)===n));
		}
	};
	amount?.addEventListener('input', e=> setAmount(e.target.value));
	range?.addEventListener('input', e=> setAmount(e.target.value));
	chips?.addEventListener('click', (e)=>{
		const btn = e.target.closest('.chip'); if(!btn) return; setAmount(btn.dataset.amt);
	});

	// Tabs
	document.querySelectorAll('.donations-tabs .tab').forEach(tab=>{
		tab.addEventListener('click', ()=>{
			document.querySelectorAll('.donations-tabs .tab').forEach(t=> t.classList.remove('active'));
			document.querySelectorAll('.tab-panel').forEach(p=> p.classList.remove('active'));
			tab.classList.add('active');
			document.getElementById(tab.dataset.tab)?.classList.add('active');
		});
	});

	// Progress and impact
	const progressFill = document.getElementById('progressFill');
	const raisedDisplay = document.getElementById('raisedDisplay');
	const pctDisplay = document.getElementById('pctDisplay');
	const goalDisplay = document.getElementById('goalDisplay');
	const impactHours = document.getElementById('impactHours');
	const impactKits = document.getElementById('impactKits');
	const impactStudents = document.getElementById('impactStudents');
	goalDisplay.textContent = `৳${fmt(goalBDT)}`;

	const updateProgress = ()=>{
		raisedDisplay.textContent = `৳${fmt(raisedBDT)}`;
		const pct = Math.min(100, Math.round(raisedBDT/goalBDT*100));
		pctDisplay.textContent = `${pct}%`;
		progressFill.style.width = pct + '%';
		// impact mapping (heuristic)
		const hours = Math.round(raisedBDT / 500); // every ৳500 funds ~1 hour
		const kits = Math.round(raisedBDT / 5000); // ~1 kit per ৳5,000
		const students = Math.round(raisedBDT / 100); // outreach per ৳100
		impactHours.textContent = fmt(hours);
		impactKits.textContent = fmt(kits);
		impactStudents.textContent = fmt(students);
	};
	updateProgress();

	// Gratitude bubbles
	const wall = document.getElementById('gratitudeWall');
	const addBubble = (text)=>{
		if(!wall) return; const b = document.createElement('div');
		b.className = 'bubble'; b.textContent = text;
		const x = Math.random()*70 + 10; // 10% to 80%
		const delay = (Math.random()*0.8).toFixed(2);
		b.style.left = x+'%'; b.style.bottom = '-6px'; b.style.animationDelay = delay+'s';
		wall.appendChild(b);
		setTimeout(()=> b.remove(), 6500);
	};

	// Tiny confetti
	const confetti = ()=>{
		const c = document.createElement('canvas'); c.width = innerWidth; c.height = 200; c.style.position='fixed'; c.style.left=0; c.style.top=0; c.style.pointerEvents='none'; c.style.zIndex=9999; document.body.appendChild(c);
		const ctx = c.getContext('2d'); const pieces = Array.from({length: 120},()=>({x:Math.random()*c.width,y:Math.random()*-50, s:Math.random()*6+4, vx:(Math.random()-0.5)*2, vy:Math.random()*2+2, color:`hsl(${Math.random()*360},80%,60%)`}));
		let t=0; const loop=()=>{ t++; ctx.clearRect(0,0,c.width,c.height); pieces.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; ctx.fillStyle=p.color; ctx.fillRect(p.x,p.y,p.s*0.6,p.s);}); if(t<120){ requestAnimationFrame(loop);} else { c.remove(); } };
		loop();
	};

	// Donate handler
	donateBtn?.addEventListener('click', ()=>{
		const amt = Number(amount?.value||0);
		if(!amt || amt < 100) return alert('Please enter at least ৳100');
		// convert to BDT if needed (simple approx rate)
		const valBDT = currency?.value==='USD' ? Math.round(amt*120) : amt;
		raisedBDT += valBDT;
		updateProgress();
		confetti();
		addBubble(`Thank you • ${currencyPrefix.textContent}${fmt(amt)}`);
	});

	currency?.addEventListener('change', updatePrefix);

	// Artifact dropzone
	const dropZone = document.getElementById('dropZone');
	const fileInput = document.getElementById('fileInput');
	const previews = document.getElementById('previews');

	const addPreview = (file)=>{
		if(!file || !file.type.startsWith('image/')) return;
		const url = URL.createObjectURL(file);
		const p = document.createElement('div'); p.className='preview';
		p.innerHTML = `<img src="${url}" alt="preview"/>`;
		previews?.appendChild(p);
	};

	dropZone?.addEventListener('click', ()=> fileInput?.click());
	dropZone?.addEventListener('dragover', e=>{ e.preventDefault(); dropZone.classList.add('hover'); });
	dropZone?.addEventListener('dragleave', ()=> dropZone.classList.remove('hover'));
	dropZone?.addEventListener('drop', (e)=>{
		e.preventDefault(); dropZone.classList.remove('hover');
		const files = Array.from(e.dataTransfer?.files||[]).slice(0,5);
		files.forEach(addPreview);
	});
	fileInput?.addEventListener('change', (e)=>{
		const files = Array.from(e.target.files||[]).slice(0,5);
		files.forEach(addPreview);
	});

	// Submit interest
	const artifactSubmit = document.getElementById('artifactSubmit');
	const artifactThanks = document.getElementById('artifactThanks');
	artifactSubmit?.addEventListener('click', ()=>{
		artifactThanks.style.display = 'block';
		addBubble('New artifact interest submitted');
	});
})();
(function(){})();

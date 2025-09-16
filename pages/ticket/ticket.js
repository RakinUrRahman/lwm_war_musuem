(function(){
	// State
	const prices = { adult: 500, student: 300, child: 200, senior: 250 };
	const counts = { adult: 0, student: 0, child: 0, senior: 0 };
	let selectedDate = null;
	let selectedSlot = null;
	let discount = 0; // amount
	let appliedCode = null;

	// Elements
	const visitDate = document.getElementById('visitDate');
	const slotList = document.getElementById('slotList');
	const applyPromoBtn = document.getElementById('applyPromo');
	const promoInput = document.getElementById('promoCode');
	const promoFeedback = document.getElementById('promoFeedback');
	const agree = document.getElementById('agree');
	const bookNow = document.getElementById('bookNow');
	const resetBtn = document.getElementById('resetBooking');
	const summaryItems = document.getElementById('summaryItems');
	const summaryDate = document.getElementById('summaryDate');
	const summarySlot = document.getElementById('summarySlot');
	const subtotalEl = document.getElementById('subtotal');
	const taxEl = document.getElementById('tax');
	const discountRow = document.getElementById('discountRow');
	const discountEl = document.getElementById('discount');
	const totalEl = document.getElementById('total');
	const crowdIndicator = document.getElementById('crowdIndicator');
	const crowdLevel = document.getElementById('crowdLevel');

	// Visitor details
	const fullName = document.getElementById('fullName');
	const email = document.getElementById('email');
	const phone = document.getElementById('phone');

	// Confirmation modal elements
		const confirmModalEl = document.getElementById('confirmModal');
		const confirmModal = (typeof bootstrap !== 'undefined' && confirmModalEl) ? new bootstrap.Modal(confirmModalEl) : null;
	const ticketCanvas = document.getElementById('ticketCanvas');
	const confIdEl = document.getElementById('confId');
	const confNameEl = document.getElementById('confName');
	const confWhenEl = document.getElementById('confWhen');
	const confTicketsEl = document.getElementById('confTickets');
	const confTotalEl = document.getElementById('confTotal');
	const printBtn = document.getElementById('printTicket');
	const downloadBtn = document.getElementById('downloadTicket');

	// Init core (menu, theme, etc.)
	if (typeof initializeCore === 'function') initializeCore();

	// Local hamburger hardening
	(function initHamb(){
		const hamb = document.getElementById('hamb');
		const overlay = document.getElementById('overlay');
		const side = document.getElementById('side');
		if (!hamb || !overlay || !side) return;
		const setOpen = (open)=>{
			side.classList.toggle('open', open);
			overlay.classList.toggle('active', open);
		};
		const enforceStateSoon = (open)=>{
			// Re-assert in case another handler toggles after ours
			setTimeout(()=> setOpen(open), 0);
			setTimeout(()=> setOpen(open), 50);
		};
		const onHambClick = (e)=>{
			if (e) { e.preventDefault(); e.stopPropagation(); if (e.stopImmediatePropagation) e.stopImmediatePropagation(); }
			const willOpen = !side.classList.contains('open');
			setOpen(willOpen);
			enforceStateSoon(willOpen);
		};
		hamb.addEventListener('click', onHambClick, true);
		hamb.addEventListener('keydown', (e)=>{
			if (e.key === 'Enter' || e.key === ' ') onHambClick(e);
		}, true);
		overlay.addEventListener('click', (e)=>{
			if (e) { e.preventDefault(); e.stopPropagation(); if (e.stopImmediatePropagation) e.stopImmediatePropagation(); }
			setOpen(false);
			enforceStateSoon(false);
		}, {capture:true});
	})();

	// Helpers
	function todayStr(){ const d=new Date(); d.setHours(0,0,0,0); return d.toISOString().split('T')[0]; }
	function fmtMoney(n){ return (Math.round(n)).toLocaleString('en-BD'); }
	function updateCrowd(){
		if (!selectedDate || !selectedSlot){
			crowdIndicator.classList.remove('low','med','high');
			crowdLevel.textContent = '—';
			return;
		}
		// Fake crowd level by slot
		const hour = parseInt(selectedSlot.split(':')[0],10);
		const lvl = hour < 12 ? 'low' : hour < 15 ? 'med' : 'high';
		crowdIndicator.classList.remove('low','med','high');
		crowdIndicator.classList.add(lvl);
		crowdLevel.textContent = lvl === 'low' ? 'Low' : lvl === 'med' ? 'Medium' : 'High';
	}

	function renderSlots(dateStr){
		slotList.innerHTML = '';
		const base = [ '10:00', '11:30', '13:00', '14:30', '16:00' ];
		base.forEach(t => {
			const full = Math.random() < 0.18; // 18% chance full (demo)
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = `slot btn btn-sm ${full? 'full':''}`;
			btn.textContent = t;
			btn.setAttribute('aria-pressed', 'false');
			if (!full) {
				btn.addEventListener('click', ()=>{
					selectedSlot = t;
					[...slotList.children].forEach(b => { b.classList.remove('selected'); b.setAttribute('aria-pressed','false'); });
					btn.classList.add('selected');
					btn.setAttribute('aria-pressed','true');
					summarySlot.textContent = t;
					updateCrowd();
					validate();
				});
			}
			slotList.appendChild(btn);
		});
	}

	function renderCounts(){
		Object.keys(counts).forEach(k => {
			const el = document.querySelector(`[data-count="${k}"]`);
			if (el) el.textContent = counts[k];
		});
	}

	function renderSummary(){
		summaryItems.innerHTML = '';
		let subtotal = 0;
		Object.keys(counts).forEach(k => {
			const qty = counts[k];
			if (!qty) return;
			const line = prices[k] * qty;
			subtotal += line;
			const row = document.createElement('div');
			row.className = 'summary-item';
			const label = k.charAt(0).toUpperCase()+k.slice(1);
			row.innerHTML = `<span>${label} × ${qty}</span><span>৳ ${fmtMoney(line)}</span>`;
			summaryItems.appendChild(row);
		});

		const tax = subtotal * 0.05;
		const total = Math.max(0, subtotal + tax - discount);

		subtotalEl.textContent = fmtMoney(subtotal);
		taxEl.textContent = fmtMoney(tax);
		totalEl.textContent = fmtMoney(total);
		if (discount > 0){
			discountRow.classList.remove('d-none');
			discountEl.textContent = fmtMoney(discount);
		} else {
			discountRow.classList.add('d-none');
			discountEl.textContent = '0';
		}
	}

		function validate(){
			const hasTickets = Object.values(counts).some(v => v>0);
			const ok = selectedDate && selectedSlot && hasTickets && agree.checked;
			// Keep button clickable; reflect state via aria only
			if (bookNow) {
				bookNow.setAttribute('aria-disabled', ok ? 'false' : 'true');
				bookNow.classList.toggle('disabled-guard', !ok);
			}
		}

	function applyPromo(){
		const code = (promoInput.value || '').trim().toUpperCase();
		if (!code) { promoFeedback.textContent = ''; promoFeedback.className='promo-feedback'; discount=0; appliedCode=null; renderSummary(); return; }
		// Simple demo codes
		if (code === 'FREEDOM10') { // 10% off
			const subtotal = Object.keys(counts).reduce((s,k)=> s + counts[k]*prices[k], 0);
			discount = Math.round(subtotal * 0.10);
			promoFeedback.textContent = 'FREEDOM10 applied: 10% off subtotal.';
			promoFeedback.className = 'promo-feedback ok';
			appliedCode = code;
		} else if (code === 'MUKTI1971') { // flat 71 off if subtotal >= 500
			const subtotal = Object.keys(counts).reduce((s,k)=> s + counts[k]*prices[k], 0);
			discount = subtotal >= 500 ? 71 : 0;
			promoFeedback.textContent = discount? 'MUKTI1971 applied: ৳71 off.' : 'Add more tickets to use MUKTI1971 (min ৳500).';
			promoFeedback.className = discount? 'promo-feedback ok':'promo-feedback err';
			appliedCode = discount? code : null;
		} else {
			promoFeedback.textContent = 'Invalid code.';
			promoFeedback.className = 'promo-feedback err';
			discount = 0; appliedCode = null;
		}
		renderSummary();
	}

	function confettiBurst(){
		const cont = document.createElement('div');
		cont.className = 'confetti';
		document.body.appendChild(cont);
		const colors = ['#1b5e20','#2e7d32','#c62828','#d32f2f','#f9a825','#0288d1'];
		for (let i=0;i<80;i++){
			const s = document.createElement('span');
			const left = Math.random()*100;
			const delay = Math.random()*0.4;
			const bg = colors[Math.floor(Math.random()*colors.length)];
			s.style.left = left+'vw';
			s.style.top = '-10vh';
			s.style.background = bg;
			s.style.animationDelay = `${delay}s`;
			cont.appendChild(s);
		}
		setTimeout(()=> cont.remove(), 2200);
	}

	function drawTicketCanvas(data){
		if (!ticketCanvas) return;
		const ctx = ticketCanvas.getContext('2d');
		const w = ticketCanvas.width, h = ticketCanvas.height;
		ctx.clearRect(0,0,w,h);

		// Background with flag colors
		const grd = ctx.createLinearGradient(0,0,w,0);
		grd.addColorStop(0,'#116530');
		grd.addColorStop(0.7,'#1e7a3a');
		grd.addColorStop(1,'#8b0000');
		ctx.fillStyle = grd; ctx.fillRect(0,0,w,h);

		// Perforation line
		ctx.setLineDash([6,6]); ctx.strokeStyle='rgba(255,255,255,.4)'; ctx.beginPath(); ctx.moveTo(w*0.62,0); ctx.lineTo(w*0.62,h); ctx.stroke(); ctx.setLineDash([]);

		// Title
		ctx.fillStyle = '#fff';
		ctx.font = '700 28px Inter, Arial';
		ctx.fillText('Liberation War Museum', 24, 42);
		ctx.font = '500 18px Inter, Arial';
		ctx.fillText('Admission Ticket', 24, 70);

		// Details box
		ctx.fillStyle = 'rgba(255,255,255,.15)';
		ctx.fillRect(20, 90, w*0.58-40, 180);
		ctx.fillStyle = '#fff';
		ctx.font = '600 16px Inter, Arial';
		ctx.fillText('Name:', 30, 120); ctx.font='500 16px Inter'; ctx.fillText(data.name || 'Guest', 120, 120);
		ctx.font='600 16px Inter'; ctx.fillText('When:', 30, 150); ctx.font='500 16px Inter'; ctx.fillText(`${data.date} • ${data.slot}`, 120, 150);
		ctx.font='600 16px Inter'; ctx.fillText('Tickets:', 30, 180); ctx.font='500 16px Inter'; ctx.fillText(data.tickets, 120, 180);
		ctx.font='600 16px Inter'; ctx.fillText('Total:', 30, 210); ctx.font='500 16px Inter'; ctx.fillText(`৳ ${fmtMoney(data.total)}`, 120, 210);

		// Booking ID area
		ctx.font='600 16px Inter'; ctx.fillText('Booking ID:', 30, 240); ctx.font='700 22px Inter'; ctx.fillText(data.id, 150, 240);

		// Right side: QR-like pattern
		const x0 = w*0.65; const y0 = 40; const box = 240; const cell = 8;
		for (let y=0; y<box; y+=cell){
			for (let x=0; x<box; x+=cell){
				const on = Math.random() > 0.7;
				ctx.fillStyle = on ? '#fff' : 'transparent';
				ctx.fillRect(x0+x, y0+y, cell-2, cell-2);
			}
		}

		// Footer note
		ctx.fillStyle = 'rgba(255,255,255,.8)';
		ctx.font = '12px Inter';
		ctx.fillText('Please arrive 10 minutes early. Valid ID required for student tickets.', 24, h-18);
	}

	function generateId(){
		const s = Math.random().toString(36).slice(2,7).toUpperCase();
		const t = Date.now().toString().slice(-4);
		return `LWM-${s}${t}`;
	}

	function downloadCanvas(){
		const link = document.createElement('a');
		link.download = 'lwm-ticket.png';
		link.href = ticketCanvas.toDataURL('image/png');
		link.click();
	}

	// Wire up events
		// Date init: min today and prefill with today for smoother flow
	const min = todayStr();
	visitDate.setAttribute('min', min);
		visitDate.value = min;
		selectedDate = min;
		summaryDate.textContent = min;
		renderSlots(min);
		// Try preselecting first available slot
		setTimeout(()=>{
			const first = slotList.querySelector('.slot:not(.full)');
			if (first) {
				first.classList.add('selected');
				first.setAttribute('aria-pressed','true');
				selectedSlot = first.textContent.trim();
				summarySlot.textContent = selectedSlot;
				updateCrowd();
				validate();
			}
		},0);
	visitDate.addEventListener('change', ()=>{
		selectedDate = visitDate.value || null;
		summaryDate.textContent = selectedDate || '—';
		selectedSlot = null; summarySlot.textContent = '—';
		renderSlots(selectedDate);
		updateCrowd();
		validate();
	});

	// Counters
	document.querySelectorAll('.ticket-type').forEach(row => {
		const type = row.getAttribute('data-type');
		row.addEventListener('click', (e)=>{
			const btn = e.target.closest('.btn-qty');
			if (!btn) return;
			const act = btn.getAttribute('data-action');
			counts[type] = Math.max(0, counts[type] + (act==='inc'? 1 : -1));
			renderCounts();
			if (appliedCode) applyPromo(); // recompute with any applied code
			renderSummary();
			validate();
		});
	});

	applyPromoBtn.addEventListener('click', (e)=>{ e.preventDefault(); applyPromo(); });
	promoInput.addEventListener('keydown', (e)=>{ if (e.key==='Enter'){ e.preventDefault(); applyPromo(); }});
	agree.addEventListener('change', validate);

	resetBtn.addEventListener('click', ()=>{
		// Reset all
		Object.keys(counts).forEach(k => counts[k]=0);
		selectedDate = null; selectedSlot = null; discount=0; appliedCode=null;
		promoInput.value=''; promoFeedback.textContent=''; promoFeedback.className='promo-feedback';
		visitDate.value=''; summaryDate.textContent='—'; summarySlot.textContent='—'; slotList.innerHTML='';
		renderCounts(); renderSummary(); updateCrowd(); validate();
	});

	// Booking
		function ensureDefaultsForBooking(){
			if (!selectedDate) {
				selectedDate = todayStr();
				visitDate.value = selectedDate;
				summaryDate.textContent = selectedDate;
				renderSlots(selectedDate);
			}
			if (!selectedSlot) {
				const first = slotList.querySelector('.slot:not(.full)');
				if (first) {
					selectedSlot = first.textContent.trim();
					first.classList.add('selected');
					first.setAttribute('aria-pressed','true');
					summarySlot.textContent = selectedSlot;
				}
			}
			const hasTicketsNow = Object.values(counts).some(v=>v>0);
			if (!hasTicketsNow) {
				counts.adult = 1; // default at least one adult
				renderCounts();
			}
			if (!agree.checked) {
				agree.checked = true;
			}
			if (appliedCode) applyPromo();
			renderSummary();
			updateCrowd();
		}

			if (bookNow) bookNow.addEventListener('click', ()=>{
			ensureDefaultsForBooking();
		const total = Number(totalEl.textContent.replace(/,/g,'')) || 0;
		const id = generateId();
		const name = fullName.value || 'Guest Visitor';
		const tickets = Object.keys(counts).filter(k=>counts[k]>0).map(k=>`${k}: ${counts[k]}`).join(', ');
		// Save locally (optional)
		const bookings = JSON.parse(localStorage.getItem('lwm_bookings')||'[]');
		bookings.push({ id, date:selectedDate, slot:selectedSlot, counts:{...counts}, total, name, at: Date.now() });
		localStorage.setItem('lwm_bookings', JSON.stringify(bookings));

		// Fill confirm details
		confIdEl.textContent = id;
		confNameEl.textContent = name;
		confWhenEl.textContent = `${selectedDate} • ${selectedSlot}`;
		confTicketsEl.textContent = tickets || '—';
		confTotalEl.textContent = fmtMoney(total);

		// Draw canvas ticket
		drawTicketCanvas({ id, name, date: selectedDate, slot: selectedSlot, tickets, total });
		confettiBurst();
			// Quick confirmation message
				try { alert('Your booking is confirmed!'); } catch(e) {}
				if (confirmModal) {
					confirmModal.show();
				} else if (confirmModalEl) {
					// rudimentary fallback: force display
					confirmModalEl.classList.add('show');
					confirmModalEl.style.display = 'block';
				}
			});

	// Print/Download
	printBtn && printBtn.addEventListener('click', ()=> window.print());
	downloadBtn && downloadBtn.addEventListener('click', downloadCanvas);

	// Initialize default UI
	renderCounts();
	renderSummary();
	validate();
})();

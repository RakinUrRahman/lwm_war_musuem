document.addEventListener('DOMContentLoaded', () => {

    // Sidebar toggle
    const side = document.getElementById('side');
    const overlay = document.getElementById('overlay');
    const hamb = document.getElementById('hamb');

    if (side && overlay && hamb) {
        hamb.addEventListener('click', () => {
            side.classList.toggle('open');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', () => {
            side.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    // Sample artifacts
    const artifacts = [
        { id: 'A001', title: 'Ration Card (1971)', desc: 'Paper ration card used during the war.', img: '../../assets/images (1).jpeg' },
        { id: 'A002', title: 'Handwritten Letter', desc: 'Letter from a freedom fighter.', img: '../../assets/new1.jpg' }
    ];

    const listEl = document.getElementById('artifactList');
    const adoptMsg = document.getElementById('adoptMsg');

    function renderArtifacts() {
        if (!listEl) return;
        listEl.innerHTML = artifacts.map(a => `
            <div class="artifact-card" data-id="${a.id}">
                <img src="${a.img}" onerror="this.src='https://via.placeholder.com/220x140'">
                <div class="meta">
                    <strong>${a.title}</strong>
                    <p style="margin:6px 0;">${a.desc}</p>
                    <button class="btn adopt-btn" data-id="${a.id}">Adopt</button>
                </div>
            </div>
        `).join('');
        attachAdoptHandlers();
    }

    function attachAdoptHandlers() {
        document.querySelectorAll('.adopt-btn').forEach(b => {
            b.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                const sponsor = prompt('Enter your name to sponsor (demo only):');
                if (!sponsor) return;
                const key = 'lwm_adoptions';
                const map = JSON.parse(localStorage.getItem(key) || '{}');
                map[id] = map[id] || [];
                map[id].push({ name: sponsor, date: new Date().toISOString() });
                localStorage.setItem(key, JSON.stringify(map));
                adoptMsg.textContent = `Thank you ${sponsor}. Your sponsorship is saved locally.`;
                adoptMsg.style.color = 'green';
            });
        });
    }

    // Volunteer form
    const volSubmit = document.getElementById('volSubmit');
    const volClear = document.getElementById('volClear');

    if (volSubmit) {
        volSubmit.addEventListener('click', () => {
            const name = (document.getElementById('volName') || {}).value || '';
            const email = (document.getElementById('volEmail') || {}).value || '';
            const role = (document.getElementById('volRole') || {}).value || '';
            const note = (document.getElementById('volNote') || {}).value || '';
            const out = document.getElementById('volMsg');

            if (!name || !email) {
                out.textContent = 'Name & email are required.';
                out.style.color = 'crimson';
                return;
            }
            const appsKey = 'lwm_volApplications';
            const apps = JSON.parse(localStorage.getItem(appsKey) || '[]');
            apps.push({ name, email, role, note, date: new Date().toISOString() });
            localStorage.setItem(appsKey, JSON.stringify(apps));
            out.textContent = 'Application submitted (saved locally).';
            out.style.color = 'green';

            document.getElementById('volName').value = '';
            document.getElementById('volEmail').value = '';
            document.getElementById('volNote').value = '';
        });
    }

    if (volClear) {
        volClear.addEventListener('click', () => {
            document.getElementById('volName').value = '';
            document.getElementById('volEmail').value = '';
            document.getElementById('volNote').value = '';
            document.getElementById('volMsg').textContent = '';
        });
    }

    renderArtifacts();
});

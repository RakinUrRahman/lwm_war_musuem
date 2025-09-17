// Media page logic extracted from inline script
// Provides tab filtering, modal display for video/photo, and initial render.

const uploads = {
	audio: [
		{ title: '17Jan05', src: 'uploads/audio/1756591235_17Jan05.mp3' },
		{ title: '21Feb05', src: 'uploads/audio/1756591352_21Feb05.mp3' },
		{ title: '18Dec06', src: 'uploads/audio/1756591458_18Dec06.mp3' },
		{ title: '19Feb07', src: 'uploads/audio/1756591588_19Feb07.mp3' },
		{ title: '30Jul07', src: 'uploads/audio/1756591682_30Jul07.mp3' }
	],
	video: [
		{ title: 'Getty Images', src: 'uploads/videos/1756587899_gettyimages-1822348632-640_adpp.mp4', thumb: 'uploads/thumbnails/1756587899_thumb_download1.jpeg' },
		{ title: 'Screen Recording', src: 'uploads/videos/1756590463_Screen Recording 2025-08-31 034409.mp4', thumb: 'uploads/thumbnails/1756590463_thumb_Screenshot 2025-08-31 034235.png' }
	],
	photo: [
		{ title: 'Historical Document', src: 'uploads/artifacts/1756579360_download (3).jpeg' },
		{ title: 'Liberation War Photograph', src: 'uploads/artifacts/1756724716_WhatsApp Image 2025-09-01 at 16.50.11_7a72ed69.jpg' },
		{ title: 'War Memorial Image', src: 'uploads/artifacts/1756725024_images (1).jpeg' },
		{ title: 'Human Remains Documentation', src: 'uploads/artifacts/Human_Remains.jpg' },
		{ title: 'Historical Archive Photo', src: 'uploads/artifacts/OIP.webp' },
		{ title: 'Liberation War Collection', src: 'uploads/artifacts/OLC.webp' },
		{ title: 'War Artifact', src: 'uploads/artifacts/th.jpg' }
	]
};

function renderMedia(tab) {
	let items = [];
	if (tab === 'all') {
		items = [
			...uploads.audio.map(a => ({ ...a, type: 'Audio' })),
			...uploads.video.map(v => ({ ...v, type: 'Video' })),
			...uploads.photo.map(p => ({ ...p, type: 'Photograph' }))
		];
	} else if (tab === 'audio') items = uploads.audio.map(a => ({ ...a, type: 'Audio' }));
	else if (tab === 'video') items = uploads.video.map(v => ({ ...v, type: 'Video' }));
	else if (tab === 'photo') items = uploads.photo.map(p => ({ ...p, type: 'Photograph' }));

	const grid = document.getElementById('mediaGrid');
	if (!grid) return;
	grid.innerHTML = items.map(item => {
		if (item.type === 'Audio') {
			return `<div class="card">
				<div style="height:160px;background:linear-gradient(135deg,#2a6d4c,#1a4b36);border-radius:8px;position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:20px;">
					<div style="margin-bottom:16px;">
						<i class="fas fa-music" style="font-size:48px;color:white;text-shadow:2px 2px 4px rgba(0,0,0,0.3);"></i>
					</div>
					<div style="position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.7);color:white;padding:4px 8px;border-radius:4px;font-size:12px;">Audio</div>
					<h4 style="color:white;margin:0;font-size:18px;text-shadow:1px 1px 2px rgba(0,0,0,0.5);">${item.title}</h4>
				</div>
				<div style="padding-top:16px;">
					<audio controls style="width:100%;">
						<source src="${item.src}" type="audio/mpeg">
						Your browser does not support the audio element.
					</audio>
				</div>
			</div>`;
		} else if (item.type === 'Video') {
			return `<div class="card">
				<div style="position:relative;">
					<img style="border-radius:8px;width:100%;height:180px;object-fit:cover;" src="${item.thumb || 'https://via.placeholder.com/600x400?text=Video'}" alt="${item.title}">
					<div style="position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.7);color:white;padding:4px 8px;border-radius:4px;font-size:12px;">Video</div>
					<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.8);color:white;border-radius:50%;width:60px;height:60px;display:flex;align-items:center;justify-content:center;cursor:pointer;" onclick="playVideo('${item.src}', '${item.title.replace(/'/g,"&apos;")}')">
						<i class="fas fa-play" style="font-size:24px;margin-left:4px;"></i>
					</div>
				</div>
				<div style="padding-top:16px;">
					<h4 style="margin-bottom:8px;">${item.title}</h4>
					<div style="display:flex;align-items:center;gap:8px;color:var(--muted);font-size:14px;">
						<i class="fas fa-film"></i> Video
					</div>
				</div>
			</div>`;
		} else if (item.type === 'Photograph') {
			return `<div class="card">
				<div style="position:relative;">
					<img style="border-radius:8px;width:100%;height:180px;object-fit:cover;cursor:pointer;" src="${item.src}" alt="${item.title}" onclick="viewPhoto('${item.src}','${item.title.replace(/'/g,"&apos;")}')">
					<div style="position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.7);color:white;padding:4px 8px;border-radius:4px;font-size:12px;">Photo</div>
				</div>
				<div style="padding-top:16px;">
					<h4 style="margin-bottom:8px;">${item.title}</h4>
					<div style="display:flex;align-items:center;justify-content:space-between;">
						<div style="display:flex;align-items:center;gap:8px;color:var(--muted);font-size:14px;">
							<i class="fas fa-image"></i> Photograph
						</div>
						<button class="btn" onclick="viewPhoto('${item.src}','${item.title.replace(/'/g,"&apos;")}')" style="padding:6px 12px;font-size:12px;">
							<i class="fas fa-expand"></i> View
						</button>
					</div>
				</div>
			</div>`;
		}
		return '';
	}).join('');
}

function playVideo(src, title) {
	const modal = document.createElement('div');
	modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:1000;display:flex;align-items:center;justify-content:center;';
	modal.innerHTML = `
		<div style="max-width:90%;max-height:90%;position:relative;">
			<button onclick="this.parentElement.parentElement.remove()" style="position:absolute;top:-40px;right:0;background:white;border:none;padding:8px 12px;border-radius:4px;cursor:pointer;">
				<i class="fas fa-times"></i> Close
			</button>
			<video controls style="width:100%;height:auto;max-height:80vh;">
				<source src="${src}" type="video/mp4">
				Your browser does not support the video tag.
			</video>
		</div>`;
	document.body.appendChild(modal);
}

function viewPhoto(src, title) {
	const modal = document.createElement('div');
	modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:1000;display:flex;align-items:center;justify-content:center;';
	modal.innerHTML = `
		<div style="max-width:90%;max-height:90%;position:relative;">
			<button onclick="this.parentElement.parentElement.remove()" style="position:absolute;top:-40px;right:0;background:white;border:none;padding:8px 12px;border-radius:4px;cursor:pointer;">
				<i class="fas fa-times"></i> Close
			</button>
			<img src="${src}" alt="${title}" style="width:100%;height:auto;max-height:80vh;object-fit:contain;">
		</div>`;
	document.body.appendChild(modal);
}

// Initialize tabs after DOM ready
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.tab-btn').forEach(btn => {
		btn.addEventListener('click', function () {
			document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
			this.classList.add('active');
			renderMedia(this.dataset.tab);
		});
	});
	renderMedia('all');
});


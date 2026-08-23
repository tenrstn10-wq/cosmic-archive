const audio = document.getElementById('audio-player');
const interstellarAudio = document.getElementById('interstellar-player');
const canvasVideo = document.getElementById('canvas-video');
const canvasToggleBtn = document.getElementById('canvas-toggle-btn');
const playBtn = document.getElementById('play-pause-btn');
const progressFill = document.getElementById('progress-fill');
const mainTimer = document.getElementById('main-timer');
const durationCounter = document.getElementById('duration-counter');
const albumImg = document.getElementById('album-img');

let isCosmicPlaying = false;
let isCanvasActive = true;

let defaultLyrics = [
    { time: 0.0, text: "Tiada yang bilang" },
    { time: 5.8, text: "Badainya 'kan reda" },
    { time: 11.7, text: "Berhadapan dengan cahaya yang kerap membutakan hu" },
    { time: 23.5, text: "Tiada yang bilang" },
    { time: 30.0, text: "Jawaban 'kan datang" },
    { time: 34.6, text: "Jauh dari seram yang selama ini telah kubayangkan" },
    { time: 44.8, text: "Semua aku dirayakan" }
];

const cosmicDatabase = [
    { id: "BimaSakti", name: "Galaksi Bima Sakti (Milky Way)", title1: "Profil Galaksi Bima Sakti", title2: "Fakta Ilmiah & Pusat Galaksi", desc1: "Galaksi Bima Sakti (Milky Way) adalah galaksi spiral berbatang tempat sistem tata surya kita berada. Garis tengahnya diperkirakan mencapai sekitar 100.000 hingga 200.000 tahun cahaya, menampung lebih dari 100 miliar bintang.", desc2: "Di jantung Bima Sakti bersemayam lubang hitam supermasif bernama Sagittarius A*. Tata surya kita membutuhkan waktu sekitar 230 juta tahun untuk menyelesaikan satu putaran penuh mengelilingi pusat galaksi ini." },
    { id: "Andromeda", name: "Galaksi Andromeda (M31)", title1: "Profil Galaksi Andromeda", title2: "Tabrakan Kosmik Masa Depan", desc1: "Galaksi Andromeda (M31) adalah galaksi spiral terdekat dari Bima Sakti, berjarak sekitar 2,5 juta tahun cahaya. Andromeda mengandung sekitar satu triliun bintang, menjadikannya lebih besar daripada Bima Sakti.", desc2: "Berdasarkan pengamatan gravitasi, galaksi Andromeda dan Bima Sakti sedang bergerak mendekati satu sama lain dengan kecepatan tinggi, dan diprediksi akan mengalami tabrakan agung membentuk galaksi baru dalam 4 miliar tahun ke depan." },
    { id: "TataSurya", name: "Sistem Tata Surya", title1: "Profil Sistem Tata Surya", title2: "Batas & Struktur Gravitasi", desc1: "Tata surya terbentuk sekitar 4,6 miliar tahun lalu dari keruntuhan gravitasi awan molekul raksasa. Sistem ini terdiri dari Matahari sebagai pusat, delapan planet, puluhan bulan, asteroid, komet, serta sabuk Kuiper.", desc2: "Batas terluar pengaruh gravitasi Matahari disebut Awan Oort, yang membentang hingga ribuan tahun cahaya ke dalam ruang antarbintang, menjadi tempat bersemayamnya komet-komet purba." },
    { id: "Matahari", name: "Bintang Induk: Matahari", title1: "Profil Bintang Induk (Matahari)", title2: "Reaksi Fusi Nuklir & Energi", desc1: "Matahari adalah bintang deret utama tipe G yang memegang 99,8% massa seluruh tata surya. Inti matahari membakar hidrogen menjadi helium melalui proses fusi nuklir yang sangat masif.", desc2: "Setiap detik, Matahari mengubah sekitar 600 juta ton hidrogen menjadi helium, memancarkan energi cahaya dan panas yang menempuh waktu 8 menit 20 detik untuk sampai ke permukaan Bumi." },
    { id: "Merkurius", name: "Planet Merkurius", title1: "Profil Planet Merkurius", title2: "Suhu Ekstrem & Kawah Tubrukan", desc1: "Merkurius adalah planet terkecil di tata surya sekaligus yang paling dekat dengan Matahari. Permukaannya dipenuhi kawah meteoroid karena planet ini tidak memiliki lapisan atmosfer yang tebal.", desc2: "Karena rotasinya yang sangat lambat, perbedaan suhu di Merkurius adalah yang paling ekstrem di tata surya: mencapai 430 derajat Celsius di sisi siang hari dan turun hingga -180 derajat Celsius di malam hari." },
    { id: "Venus", name: "Planet Venus", title1: "Profil Planet Venus", title2: "Efek Rumah Kaca & Atmosfer", desc1: "Venus adalah planet kedua dari Matahari yang sering dijuluki sebagai kembaran Bumi karena ukurannya yang mirip. Namun, kondisi permukaannya sangat berbeda jauh.", desc2: "Venus adalah planet terpanas di tata surya dengan suhu mencapai 465 derajat Celsius akibat terperangkapnya panas oleh atmosfer tebal karbon dioksida dan awan asam sulfat yang pekat." },
    { id: "Bumi", name: "Planet Bumi", title1: "Profil Planet Bumi", title2: "Kehidupan & Medan Magnet", desc1: "Bumi adalah planet ketiga dari Matahari dan satu-satunya dunia di alam semesta yang terbukti menopang kehidupan. Sekitar 71% permukaan Bumi ditutupi oleh samudera air cair.", desc2: "Atmosfer yang kaya oksigen serta keberadaan medan magnet global yang kuat melindungi permukaan Bumi dari terjangan radiasi kosmik berbahaya dan angin matahari secara langsung." },
    { id: "Mars", name: "Planet Mars", title1: "Profil Planet Mars", title2: "Gunung Tertinggi & Air Purba", desc1: "Mars adalah planet keempat, dikenal sebagai planet merah karena tingginya kandungan besi oksida (karat) di permukaannya. Mars memiliki ngarai raksasa Valles Marineris yang membentang sangat panjang.", desc2: "Di Mars terdapat Olympus Mons, gunung berapi tertinggi di tata surya yang tingginya hampir tiga kali Gunung Everest. Bukti geologis menunjukkan Mars purba dulunya memiliki sungai dan danau." },
    { id: "Jupiter", name: "Planet Jupiter", title1: "Profil Planet Jupiter", title2: "Raksasa Gas & Bintik Merah", desc1: "Jupiter adalah planet terbesar di tata surya dengan massa lebih dari dua kali gabungan seluruh planet lainnya. Planet ini tersusun sebagian besar dari gas hidrogen dan helium.", desc2: "Ciri khas Jupiter adalah Bintik Merah Raksasa, sebuah badai badai antisiklon raksasa yang sudah mengamuk selama ratusan tahun, berukuran cukup besar untuk menelan planet Bumi." },
    { id: "Saturnus", name: "Planet Saturnus", title1: "Profil Planet Saturnus", title2: "Cincin Es & Massa Jenis", desc1: "Saturnus adalah planet keenam, terkenal karena sistem cincin es spektakuler yang mengitarinya. Cincin ini terdiri dari miliaran pecahan es murni dan batuan kecil.", desc2: "Saturnus memiliki massa jenis yang sangat rendah; jika Anda memiliki wadah air yang cukup luas, planet Saturnus akan mengapung di atas air tanpa tenggelam." },
    { id: "Uranus", name: "Planet Uranus", title1: "Profil Planet Uranus", title2: "Rotasi Miring & Raksasa Es", desc1: "Uranus adalah raksasa es ketujuh dari Matahari dengan atmosfer kaya metana yang memberikan warna biru kehijauan yang khas serta dingin yang membekukan.", desc2: "Keunikan ekstrem Uranus adalah sumbu rotasinya yang miring hingga hampir 98 derajat, membuat planet ini seolah-olah berputar menggelinding mengelilingi Matahari." },
    { id: "Neptunus", name: "Planet Neptunus", title1: "Profil Planet Neptunus", title2: "Angin Supersonik & Jarak Terjauh", desc1: "Neptunus adalah planet terjauh di tata surya utama. Planet es raksasa ini memiliki warna biru tua yang pekat dan dikelilingi oleh badai angin tercepat di tata surya.", desc2: "Kecepatan angin di Neptunus dapat mencapai lebih dari 2.000 kilometer per jam, meniupkan badai metana beku melintasi seluruh permukaan planet yang sunyi ini." },
    { id: "Supernova", name: "Supernova (Ledakan Bintang)", title1: "Profil Ledakan Supernova", title2: "Kelahiran Unsur Berat", desc1: "Supernova adalah ledakan kolosal dari sebuah bintang masif di akhir siklus hidupnya. Dalam beberapa hari, ledakan ini memancarkan energi setara dengan cahaya milyaran bintang.", desc2: "Seluruh unsur kimia berat di alam semesta, termasuk emas dan besi di dalam darah manusia, tercipta dari inti ledakan supernova. Manusia secara harfiah terbuat dari debu bintang." },
    { id: "BlackHole", name: "Lubang Hitam (Black Hole)", title1: "Profil Lubang Hitam", title2: "Cakrawala Peristiwa & Gravitasi", desc1: "Lubang hitam adalah wilayah ruang angkasa dengan gravitasi begitu kuat sehingga tidak ada materi atau cahaya yang mampu melarikan diri setelah melewati batas tertentu.", desc2: "Batas terluar lubang hitam disebut cakrawala peristiwa. Di wilayah ini, hukum fisika konvensional runtuh dan alur waktu melambat secara ekstrem akibat tarikan massa tak terhingga." },
    { id: "Nebula", name: "Nebula (Pabrik Bintang)", title1: "Profil Awan Nebula", title2: "Pabrik Kelahiran Bintang", desc1: "Nebula adalah awan raksasa di antariksa yang terdiri dari debu kosmik, gas hidrogen, helium, dan plasma terionisasi, membentang hingga puluhan tahun cahaya.", desc2: "Melalui proses gaya gravitasi selama jutaan tahun, gas di dalam nebula akan memadat dan memanas hingga memicu fusi nuklir, melahirkan bintang-bintang baru." },
    { id: "Pulsar", name: "Bintang Pulsar & Magnetar", title1: "Profil Bintang Pulsar", title2: "Medan Magnet & Sinyal Radio", desc1: "Pulsar adalah bintang neutron yang berputar sangat cepat dan memancarkan radiasi elektromagnetik tajam dari kutubnya secara teratur seperti mercusuar kosmik.", desc2: "Meskipun ukurannya sekecil kota kecil, massa sebuah bintang pulsar jauh melampaui massa Matahari, menghasilkan medan magnet triliunan kali lebih kuat dari magnet Bumi." },
    { id: "DarkMatter", name: "Materi Gelap & Energi Gelap", title1: "Profil Materi & Energi Gelap", title2: "Misteri Terbesar Kosmologi", desc1: "Materi gelap adalah komponen misterius yang diperkirakan menyusun sekitar 27% alam semesta, tidak memancarkan cahaya namun memiliki efek gravitasi yang menyatukan galaksi.", desc2: "Sementara itu, energi gelap mencakup 68% alam semesta dan bertindak sebagai tenaga pendorong yang menyebabkan ekspansi kosmos semakin cepat dari waktu ke waktu." },
    { id: "Voyager", name: "Wahana Voyager 1 dan 2", title1: "Wahana Voyager 1 dan 2", title2: "Misi Antarbintang & Pesan Emas", desc1: "Diluncurkan NASA pada 1977, Voyager 1 dan 2 adalah objek buatan manusia terjauh dari Bumi. Voyager 1 kini telah resmi keluar dari tata surya menuju ruang antarbintang.", desc2: "Tujuan utamanya mempelajari planet luar, namun keduanya membawa piringan emas berisi rekaman suara bumi, musik, dan salam bahasa manusia untuk peradaban lain di masa depan." },
    { id: "JWST", name: "Teleskop James Webb (JWST)", title1: "Teleskop Luar Angkasa James Webb", title2: "Melihat Galaksi Kuno Pertama", desc1: "JWST adalah teleskop inframerah tercanggih yang ditempatkan 1,5 juta kilometer dari Bumi, menggunakan cermin berlapis emas raksasa untuk menangkap cahaya kosmik terjauh.", desc2: "Tujuan utamanya adalah menembus tirai debu kosmik untuk mengamati galaksi-galaksi pertama yang lahir setelah peristiwa awal pembentukan alam semesta." },
    { id: "Hubble", name: "Teleskop Luar Angkasa Hubble", title1: "Profil Teleskop Luar Angkasa Hubble", title2: "Revolusi Citra Astronomi Modern", desc1: "Beroperasi di orbit rendah sejak 1990, teleskop Hubble berada di atas atmosfer bumi sehingga terbebas dari distorsi udara, menghasilkan foto kosmos beresolusi sangat tinggi.", desc2: "Tujuan utamanya adalah mengukur tingkat ekspansi alam semesta, menghitung usia kosmos, serta memotret detail nebula dan galaksi jauh secara konsisten." },
    { id: "Perseverance", name: "Penjelajah Mars Perseverance", title1: "Profil Penjelajah Mars Perseverance", title2: "Mencari Jejak Kehidupan Purba", desc1: "Perseverance adalah robot penjelajah canggih milik NASA yang mendarat di Kawah Jezero pada tahun 2021, dilengkapi instrumen sains modern dan helikopter mini Ingenuity.", desc2: "Tujuan utamanya adalah mencari tanda-tanda kehidupan mikroba masa lalu di Mars serta mengumpulkan sampel batuan terpilih untuk dibawa kembali ke Bumi." },
    { id: "ISS", name: "Stasiun Luar Angkasa (ISS)", title1: "Stasiun Luar Angkasa Internasional", title2: "Laboratorium Sains Tanpa Bobot", desc1: "ISS adalah fasilitas riset ilmiah raksasa yang mengorbit Bumi di ketinggian 400 kilometer dengan kecepatan tinggi, dibangun atas kerja sama berbagai negara dunia.", desc2: "Tujuan utamanya adalah menjadi wadah bagi para astronot melakukan eksperimen sains dalam kondisi mikrogravitasi serta meneliti ketahanan tubuh manusia di luar angkasa." },
    { id: "Parker", name: "Wahana Surya Parker", title1: "Profil Wahana Surya Parker", title2: "Misi Mendekati Korona Matahari", desc1: "Parker Solar Probe adalah wahana tercepat buatan manusia yang dirancang dengan perisai panas tebal berbahan karbon untuk terbang langsung menembus atmosfer matahari.", desc2: "Tujuan utamanya adalah meneliti panas korona matahari serta aliran angin surya yang memicu badai magnetik dan berdampak langsung pada teknologi di Bumi." },
    { id: "NewHorizons", name: "Wahana New Horizons (Pluto)", title1: "Profil Wahana New Horizons", title2: "Menjelajahi Pluto & Sabuk Kuiper", desc1: "Diluncurkan pada 2006, New Horizons adalah wahana tercepat yang pernah meninggalkan orbit Bumi untuk menempuh perjalanan jauh menuju planet kerdil Pluto.", desc2: "Tujuan utamanya adalah memotret permukaan Pluto dari jarak dekat untuk pertama kalinya dalam sejarah serta meneliti objek-objek es terluar di Sabuk Kuiper." },
    { id: "Cassini", name: "Misi Cassini-Huygens (Saturnus)", title1: "Profil Misi Cassini-Huygens", title2: "Meneliti Saturnus & Bulan Enceladus", desc1: "Cassini adalah wahana pengorbit yang menginvestigasi sistem Saturnus selama bertahun-tahun, dilengkapi modul pendarat Huygens yang mendarat di bulan Titan.", desc2: "Tujuan utamanya adalah mengungkap struktur cincin Saturnus serta menemukan bukti adanya lautan air cair di bawah permukaan es bulan Enceladus." }
];

window.addEventListener('DOMContentLoaded', () => {
    const savedLyrics = localStorage.getItem('customLyrics');
    if(savedLyrics && !savedLyrics.includes("Tiada yang bilang")) {
        localStorage.removeItem('customLyrics');
    }

    if(localStorage.getItem('customTitle')) {
        document.getElementById('editable-title').innerHTML = localStorage.getItem('customTitle');
    }
    if(localStorage.getItem('customArtist')) {
        document.getElementById('editable-artist').innerText = localStorage.getItem('customArtist');
    }
    if(localStorage.getItem('customLyrics')) {
        try {
            defaultLyrics = JSON.parse(localStorage.getItem('customLyrics'));
        } catch(e) {}
    }

    const defaultMsg = "Nadin, ternyata menunggu sorai sampai dengan 'semua aku dirayakan' tak semulus yang pernah kulihat.";
    window.savedMessage = localStorage.getItem('customMessage') || defaultMsg;

    updatePlayerFooterLabel();
    renderLyrics();
    renderAccordionList();

    canvasVideo.play().then(() => {
        canvasVideo.style.display = 'block';
        isCanvasActive = true;
        canvasToggleBtn.innerText = "ON";
    }).catch(() => {
        canvasVideo.style.display = 'none';
        isCanvasActive = false;
        canvasToggleBtn.innerText = "OFF";
    });
});

function toggleCanvas() {
    isCanvasActive = !isCanvasActive;
    if (isCanvasActive) {
        canvasVideo.style.display = 'block';
        canvasVideo.play().catch(e => {});
        canvasToggleBtn.innerText = "ON";
    } else {
        canvasVideo.style.display = 'none';
        canvasVideo.pause();
        canvasToggleBtn.innerText = "OFF";
    }
}

function toggleGuide() {
    const modal = document.getElementById('guide-modal');
    modal.classList.toggle('active');
}

function openWhatsApp() {
    const phoneNumber = "6281461232770";
    const message = "Hai! Saya melihat Cosmic Archive kamu, keren banget!";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

function renderAccordionList() {
    const container = document.getElementById('accordion-list');
    container.innerHTML = '';
    cosmicDatabase.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'accordion-card';
        card.id = `card-${index}`;
        card.onclick = () => toggleAccordion(`card-${index}`);
        card.innerHTML = `
            <div class="accordion-header">
                <span>${item.name}</span>
                <span class="icon">&#9662;</span>
            </div>
            <div class="accordion-body">
                <div class="accordion-content-block" style="border-top:none; padding-top:0; margin-top:4px;">
                    <div class="accordion-subtitle">${item.title1}</div>
                    <div class="accordion-text">${item.desc1}</div>
                </div>
                <div class="accordion-content-block">
                    <div class="accordion-subtitle">${item.title2}</div>
                    <div class="accordion-text">${item.desc2}</div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function toggleAccordion(id) {
    const card = document.getElementById(id);
    const icon = card.querySelector('.icon');
    const isOpen = card.classList.contains('active');

    document.querySelectorAll('.accordion-card, .special-guest-card').forEach(c => {
        if(c !== card) {
            c.classList.remove('active');
            const cIcon = c.querySelector('.icon');
            if(cIcon) cIcon.innerHTML = '&#9662;';
        }
    });

    if (isOpen) {
        card.classList.remove('active');
        icon.innerHTML = '&#9662;';
    } else {
        card.classList.add('active');
        icon.innerHTML = '&#9652;';
    }
}

function updatePlayerFooterLabel() {
    if (isCosmicPlaying) {
        document.getElementById('audio-file-label').innerText = "INTERSTELLAR SOUNDTRACK";
        return;
    }
    const titleText = document.getElementById('editable-title').innerText.replace(/\n/g, ' ');
    const artistText = document.getElementById('editable-artist').innerText;
    document.getElementById('audio-file-label').innerText = `${titleText.toUpperCase()} / ${artistText.toUpperCase()}`;
}

function renderLyrics() {
    const container = document.getElementById('content-container');
    if(!container) return;
    container.innerHTML = `<ul class="lyrics-list" id="lyrics-list-el"></ul>`;
    const listEl = document.getElementById('lyrics-list-el');
    defaultLyrics.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = index === 0 ? 'lyric-item active-lyric' : 'lyric-item';
        li.setAttribute('data-time', item.time);
        li.onclick = () => jumpToTime(item.time);
        li.innerText = item.text;
        listEl.appendChild(li);
    });
}

function editTitle() {
    if(isCosmicPlaying) return;
    const currentText = document.getElementById('editable-title').innerText;
    const newText = prompt("Masukkan Judul Lagu Baru:", currentText);
    if (newText !== null && newText.trim() !== "") {
        const formattedText = newText.replace(/\n/g, '<br>');
        document.getElementById('editable-title').innerHTML = formattedText;
        localStorage.setItem('customTitle', formattedText);
        updatePlayerFooterLabel();
    }
}

function editArtist() {
    if(isCosmicPlaying) return;
    const currentText = document.getElementById('editable-artist').innerText;
    const newText = prompt("Masukkan Nama Artis Baru:", currentText);
    if (newText !== null && newText.trim() !== "") {
        document.getElementById('editable-artist').innerText = newText;
        localStorage.setItem('customArtist', newText);
        updatePlayerFooterLabel();
    }
}

let typingTimer = null;
function typeWriterEffect(text, elementId, speed = 55) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.innerHTML = "";
    let i = 0;
    
    if (typingTimer) clearInterval(typingTimer);

    typingTimer = setInterval(() => {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typingTimer);
        }
    }, speed);
}

function switchTab(tabName) {
    const btnLyrics = document.getElementById('btn-lyrics');
    const btnEdit = document.getElementById('btn-edit');
    const btnMessage = document.getElementById('btn-message');
    const container = document.getElementById('content-container');

    btnLyrics.classList.remove('active');
    btnEdit.classList.remove('active');
    btnMessage.classList.remove('active');

    if (tabName === 'lyrics') {
        btnLyrics.classList.add('active');
        renderLyrics();
        syncLyricsWithTime(audio.currentTime);
    } else if (tabName === 'edit') {
        btnEdit.classList.add('active');
        let currentString = defaultLyrics.map(l => l.text).join('\n');

        container.innerHTML = `
            <div class="lyric-studio-overlay">
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em;">
                    Paste Lirik (1 Baris = 1 Kalimat):
                </div>
                <textarea id="studio-lyrics-input" class="studio-textarea">${currentString}</textarea>
                
                <div style="font-size: 0.62rem; color: #ffc2d1; margin-bottom: 10px; line-height: 1.4;">
                    <b>Cara Rekam Ritme Real-Time:</b><br>
                    1. Putar lagu dari tombol Play di bawah.<br>
                    2. Klik tombol <b>"Rekam Baris Ini"</b> tepat saat vokal masuk. Waktu detik akan langsung tersimpan presisi!
                </div>

                <div id="studio-preview-list" style="font-size: 0.7rem; color: var(--text-muted); margin-bottom: 10px; max-height: 90px; overflow-y: auto;"></div>

                <div class="studio-btn-row">
                    <button class="studio-btn primary" onclick="recordLyricLine(event)">Rekam Baris Ini</button>
                    <button class="studio-btn" onclick="saveStudioLyrics()">Simpan</button>
                </div>
            </div>
        `;
        window.tempRecordedLyrics = [];
    } else if (tabName === 'message') {
        btnMessage.classList.add('active');
        const currentMsg = window.savedMessage || "";

        container.innerHTML = `
            <div id="editable-message" onclick="editMessage()" title="Klik untuk edit pesan" style="font-family: 'Playfair Display', serif; font-size: 1.05rem; line-height: 1.6; color: var(--text-main); padding-top: 10px; text-align: center; font-style: italic; cursor: pointer; min-height: 80px;">
            </div>
            <div style="font-size: 0.55rem; text-align: center; color: var(--text-muted); margin-top: 15px; text-transform: uppercase; letter-spacing: 0.1em;">(Klik teks di atas untuk mengubah pesan)</div>
        `;
        
        setTimeout(() => {
            typeWriterEffect(currentMsg, 'editable-message', 60);
        }, 100);
    }
}

function recordLyricLine(e) {
    const textarea = document.getElementById('studio-lyrics-input');
    if (!textarea) return;
    const lines = textarea.value.split('\n').filter(l => l.trim() !== "");
    const recordedCount = window.tempRecordedLyrics.length;

    if (recordedCount >= lines.length) {
        alert("Semua baris lirik sudah selesai direkam! Silakan klik 'Simpan'.");
        return;
    }

    const currentTime = parseFloat(audio.currentTime.toFixed(2));
    const currentLineText = lines[recordedCount];

    window.tempRecordedLyrics.push({ time: currentTime, text: currentLineText });

    const previewEl = document.getElementById('studio-preview-list');
    if(previewEl) {
        previewEl.innerHTML = window.tempRecordedLyrics.map(l => `<div>[${l.time}s] ${l.text}</div>`).join('');
    }
    
    if(window.tempRecordedLyrics.length < lines.length) {
        e.target.innerText = `Rekam Berikutnya (${window.tempRecordedLyrics.length}/${lines.length})`;
    } else {
        e.target.innerText = "Selesai Direkam!";
    }
}

function saveStudioLyrics() {
    if (!window.tempRecordedLyrics || window.tempRecordedLyrics.length === 0) {
        alert("Belum ada lirik yang direkam waktunya!");
        return;
    }

    defaultLyrics = window.tempRecordedLyrics;
    localStorage.setItem('customLyrics', JSON.stringify(defaultLyrics));
    alert("Lirik dan ritme berhasil diperbarui secara akurat!");
    switchTab('lyrics');
}

function editMessage() {
    const currentMsgRaw = window.savedMessage || "";
    const newMsg = prompt("Masukkan Pesan Baru:", currentMsgRaw);
    if (newMsg !== null && newMsg.trim() !== "") {
        window.savedMessage = newMsg.replace(/\n/g, '<br>');
        localStorage.setItem('customMessage', window.savedMessage);
        typeWriterEffect(window.savedMessage, 'editable-message', 60);
    }
}

function handleAudioUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        audio.src = fileURL;
        audio.load();
        alert("File lagu berhasil diganti!");
    }
}

function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        canvasVideo.src = fileURL;
        isCanvasActive = true;
        canvasVideo.style.display = 'block';
        canvasVideo.play().catch(e => {});
        canvasToggleBtn.innerText = "ON";
        alert("Canvas Video latar belakang berhasil dipasang!");
    }
}

function showCosmicScreen() {
    document.getElementById('screen-slider').classList.add('show-cosmic');
    if (!audio.paused) {
        audio.pause();
    }
    isCosmicPlaying = true;
    interstellarAudio.volume = 0.6;
    interstellarAudio.loop = true;
    interstellarAudio.play().catch(e => {});
    canvasVideo.pause();
    canvasVideo.style.opacity = '0.1';
    playBtn.innerHTML = '&#10074;&#10074;';
    updatePlayerFooterLabel();
}

function showMainScreen() {
    document.getElementById('screen-slider').classList.remove('show-cosmic');
    isCosmicPlaying = false;
    interstellarAudio.pause();
    interstellarAudio.currentTime = 0;
    if (isCanvasActive) {
        canvasVideo.play().catch(e => {});
        canvasVideo.style.opacity = '0.35';
    }
    playBtn.innerHTML = '&#9654;';
    updatePlayerFooterLabel();
}

function togglePlay() {
    if (isCosmicPlaying) {
        if (interstellarAudio.paused) {
            interstellarAudio.play();
            playBtn.innerHTML = '&#10074;&#10074;';
        } else {
            interstellarAudio.pause();
            playBtn.innerHTML = '&#9654;';
        }
        return;
    }

    if (audio.paused) {
        audio.play().catch(e => {
            alert("Pastikan file audio sudah dipilih atau file lagu tersedia!");
        });
        if (isCanvasActive) canvasVideo.play().catch(e => {});
        playBtn.innerHTML = '&#10074;&#10074;';
    } else {
        audio.pause();
        canvasVideo.pause();
        playBtn.innerHTML = '&#9654;';
    }
}

audio.addEventListener('ended', () => {
    if (!isCosmicPlaying) {
        playBtn.innerHTML = '&#9654;';
        progressFill.style.width = '0%';
        mainTimer.innerText = '00:00';
        syncLyricsWithTime(0);
    }
});

audio.addEventListener('timeupdate', () => {
    if (isCosmicPlaying || !audio.duration) return;
    const current = audio.currentTime;
    const duration = audio.duration;
    const percentage = (current / duration) * 100;
    progressFill.style.width = percentage + '%';

    let mins = Math.floor(current / 60);
    let secs = Math.floor(current % 60);
    let timeFormatted = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
    mainTimer.innerText = timeFormatted;
    
    let dMins = Math.floor(duration / 60);
    let dSecs = Math.floor(duration % 60);
    durationCounter.innerText = mins + ":" + (secs < 10 ? "0" : "") + secs + "/" + dMins + ":" + (dSecs < 10 ? "0" : "") + dSecs;

    syncLyricsWithTime(current);
});

interstellarAudio.addEventListener('timeupdate', () => {
    if (!isCosmicPlaying || !interstellarAudio.duration) return;
    const current = interstellarAudio.currentTime;
    const duration = interstellarAudio.duration;
    const percentage = (current / duration) * 100;
    progressFill.style.width = percentage + '%';

    let mins = Math.floor(current / 60);
    let secs = Math.floor(current % 60);
    let timeFormatted = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
    mainTimer.innerText = timeFormatted;
    
    let dMins = Math.floor(duration / 60);
    let dSecs = Math.floor(duration % 60);
    durationCounter.innerText = mins + ":" + (secs < 10 ? "0" : "") + secs + "/" + dMins + ":" + (dSecs < 10 ? "0" : "") + dSecs;
});

function syncLyricsWithTime(currentTime) {
    const items = document.querySelectorAll('.lyric-item');
    if (items.length === 0) return;

    let activeIndex = -1;
    items.forEach((item, index) => {
        const time = parseFloat(item.getAttribute('data-time'));
        if (currentTime >= time) {
            activeIndex = index;
        }
    });

    items.forEach((item, index) => {
        if (index === activeIndex) {
            item.classList.add('active-lyric');
        } else {
            item.classList.remove('active-lyric');
        }
    });
}

function jumpToTime(seconds) {
    audio.currentTime = seconds;
    audio.play().catch(e => {});
    if (isCanvasActive) canvasVideo.play().catch(e => {});
    playBtn.innerHTML = '&#10074;&#10074;';
}

function seekAudio(event) {
    const container = event.currentTarget;
    const clickX = event.offsetX;
    const width = container.offsetWidth;
    if (isCosmicPlaying && interstellarAudio.duration) {
        interstellarAudio.currentTime = (clickX / width) * interstellarAudio.duration;
    } else if (audio.duration) {
        audio.currentTime = (clickX / width) * audio.duration;
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            albumImg.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

albumImg.addEventListener('load', function() {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 50;
        canvas.height = 50;
        ctx.drawImage(albumImg, 0, 0, 50, 50);

        const imageData = ctx.getImageData(0, 0, 50, 50).data;
        let r = 0, g = 0, b = 0, count = 0;

        for (let i = 0; i < imageData.length; i += 8) {
            r += imageData[i];
            g += imageData[i+1];
            b += imageData[i+2];
            count++;
        }

        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        const gradR1 = Math.min(255, Math.max(20, Math.floor(r * 0.75)));
        const gradG1 = Math.min(255, Math.max(15, Math.floor(g * 0.75)));
        const gradB1 = Math.min(255, Math.max(50, Math.floor(b * 0.75)));

        const gradR2 = Math.max(8, Math.floor(r * 0.35));
        const gradG2 = Math.max(6, Math.floor(g * 0.35));
        const gradB2 = Math.max(20, Math.floor(b * 0.35));

        document.documentElement.style.setProperty('--bg-color-1', `rgb(${gradR1}, ${gradG1}, ${gradB1})`);
        document.documentElement.style.setProperty('--bg-color-2', `rgb(${gradR2}, ${gradG2}, ${gradB2})`);
    } catch (err) {
        console.log("Ekstraksi warna dibatasi keamanan browser.");
    }
});

if (albumImg.complete) {
    albumImg.dispatchEvent(new Event('load'));
}

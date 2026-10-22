// build_complete_app.js
const fs = require('fs');

let html = fs.readFileSync('./index.html', 'utf8');

// 1. UPDATE TITLE
html = html.replace(
  /<title>.*?<\/title>/,
  '<title>LingoDays - 2. Sınıf İngilizce (1, 2, 3, 4, 5, 6. Üniteler & 20 Sorulu Puanlı Sınav)</title>'
);

// 2. UPDATE HEADER & TOP NAVIGATION
const oldHeaderRegex = /<header>[\s\S]*?<\/header>/;
const newHeaderHtml = `<header>
    <div class="header-top">
      <div class="logo-group" onclick="switchMainTab('menu')" style="cursor:pointer;" title="Ana Menüye Dön">
        <div class="logo-icon">📚</div>
        <div class="title-area">
          <h1>LingoDays 2. Sınıf</h1>
          <p id="subHeaderTitle">Tüm 6 Ünite & 20 Sorulu Puanlı Sınav</p>
        </div>
      </div>
      <div class="header-widgets">
        <button class="sound-btn" onclick="copyFullHtmlCode()" id="copyCodeBtn" title="Tüm index.html Kodunu Panoya Kopyala" style="width:auto;padding:5px 12px;font-size:12px;font-weight:700;display:inline-flex;align-items:center;gap:4px;background:#2563eb;border-color:#3b82f6;">📋 Kodu Kopyala</button>
        <button class="sound-btn" onclick="downloadHtmlFile()" id="downloadHtmlBtn" title="index.html Dosyasını Bilgisayara İndir" style="width:auto;padding:5px 12px;font-size:12px;font-weight:700;display:inline-flex;align-items:center;gap:4px;background:#059669;border-color:#10b981;">⬇️ HTML İndir</button>
        <div class="timer-badge" id="studyTimerBadge" title="10 saniye hareketsiz kalırsanız durur">
          ⏱️ <span id="studyTimerText">00:00</span>
        </div>
        <button class="sound-btn" id="soundToggleBtn" onclick="toggleSound()" title="Sesi Aç/Kapat">🔊</button>
      </div>
    </div>
    <!-- MAIN NAV SCROLL (DOĞRU SIRALI 1'den 6'ya KADAR TÜM ÜNİTELER + 20 SORULU SINAV) -->
    <div class="nav-scroll">
      <button class="nav-tab active" onclick="switchMainTab('menu')" id="tab_menu">🏠 Tüm Üniteler (Menü)</button>
      <button class="nav-tab" onclick="switchMainTab('unit1')" id="tab_unit1">👋 1. Ünite (9-16)</button>
      <button class="nav-tab" onclick="switchMainTab('unit2')" id="tab_unit2">🏫 2. Ünite (17-24)</button>
      <button class="nav-tab" onclick="switchMainTab('unit3')" id="tab_unit3">👤 3. Ünite (25-32)</button>
      <button class="nav-tab" onclick="switchMainTab('unit4')" id="tab_unit4">👨‍👩‍👧‍👦 4. Ünite (33-40)</button>
      <button class="nav-tab" onclick="switchMainTab('unit5')" id="tab_unit5">🏡 5. Ünite (41-48)</button>
      <button class="nav-tab" onclick="switchMainTab('unit6')" id="tab_unit6">🌆 6. Ünite (49-56)</button>
      <button class="nav-tab" onclick="switchMainTab('quiz')" id="tab_quiz" style="border-color:#f59e0b;color:#fde047;background:rgba(245,158,11,0.15);">🏆 20 Sorulu Sınav</button>
      <button class="nav-tab" onclick="switchMainTab('days_sort')" id="tab_days_sort">📅 Gün Sıralama</button>
      <button class="nav-tab" onclick="switchMainTab('flashcards')" id="tab_flashcards">🃏 Kelime Kartları</button>
      <button class="nav-tab" onclick="switchMainTab('guide')" id="tab_guide">📖 Günler Rehberi</button>
    </div>
  </header>`;

html = html.replace(oldHeaderRegex, newHeaderHtml);

// 3. UPDATE BOTTOM NAVIGATION
const oldBottomNavRegex = /<nav class="bottom-nav">[\s\S]*?<\/nav>/;
const newBottomNavHtml = `<nav class="bottom-nav">
    <button class="b-nav-item active" onclick="switchMainTab('menu')" id="bnav_menu">
      <span class="b-icon">🏠</span>
      <span>Menü</span>
    </button>
    <button class="b-nav-item" onclick="switchMainTab('unit1')" id="bnav_unit1">
      <span class="b-icon">👋</span>
      <span>1. Ünite</span>
    </button>
    <button class="b-nav-item" onclick="switchMainTab('unit2')" id="bnav_unit2">
      <span class="b-icon">🏫</span>
      <span>2. Ünite</span>
    </button>
    <button class="b-nav-item" onclick="switchMainTab('unit3')" id="bnav_unit3">
      <span class="b-icon">👤</span>
      <span>3. Ünite</span>
    </button>
    <button class="b-nav-item" onclick="switchMainTab('unit4')" id="bnav_unit4">
      <span class="b-icon">👨‍👩‍👧‍👦</span>
      <span>4. Ünite</span>
    </button>
    <button class="b-nav-item" onclick="switchMainTab('unit5')" id="bnav_unit5">
      <span class="b-icon">🏡</span>
      <span>5. Ünite</span>
    </button>
    <button class="b-nav-item" onclick="switchMainTab('unit6')" id="bnav_unit6">
      <span class="b-icon">🌆</span>
      <span>6. Ünite</span>
    </button>
    <button class="b-nav-item" onclick="switchMainTab('quiz')" id="bnav_quiz">
      <span class="b-icon">🏆</span>
      <span>20 Sınav</span>
    </button>
    <button class="b-nav-item" onclick="switchMainTab('days_sort')" id="bnav_days_sort">
      <span class="b-icon">📅</span>
      <span>Sıralama</span>
    </button>
    <button class="b-nav-item" onclick="switchMainTab('flashcards')" id="bnav_flashcards">
      <span class="b-icon">🃏</span>
      <span>Kartlar</span>
    </button>
  </nav>`;

html = html.replace(oldBottomNavRegex, newBottomNavHtml);

// 4. UPDATE switchMainTab FUNCTION TO SUPPORT 'menu' TAB
const oldSwitchRegex = /function switchMainTab\(tabId\) \{[\s\S]*?\}[\s]*\/\* ===* 2\.1\./;
const newSwitchFunction = `function switchMainTab(tabId) {
      recordActivity();
      currentMainTab = tabId;
      document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
      const activeNavTab = document.getElementById(\`tab_\${tabId}\`);
      if (activeNavTab) activeNavTab.classList.add('active');

      document.querySelectorAll('.b-nav-item').forEach(b => b.classList.remove('active'));
      const activeBNav = document.getElementById(\`bnav_\${tabId}\`);
      if (activeBNav) activeBNav.classList.add('active');

      if (tabId === 'menu') {
        document.getElementById('subHeaderTitle').textContent = '2. Sınıf İngilizce - Tüm Üniteler (1-6) ve Sınav';
        renderUnitsOverview();
      } else if (tabId === 'unit1') {
        document.getElementById('subHeaderTitle').textContent = \`1. Ünite: Words & Greetings (Sayfa \${currentUnit1Page})\`;
        renderUnit1();
      } else if (tabId === 'unit2') {
        document.getElementById('subHeaderTitle').textContent = \`2. Ünite: Classroom Life (Sayfa \${currentUnit2Page})\`;
        renderUnit2();
      } else if (tabId === 'unit3') {
        document.getElementById('subHeaderTitle').textContent = \`3. Ünite: Personal Life (Sayfa \${currentUnit3Page})\`;
        renderUnit3();
      } else if (tabId === 'unit4') {
        document.getElementById('subHeaderTitle').textContent = \`4. Ünite: Family Life (Sayfa \${currentUnit4Page})\`;
        renderUnit4();
      } else if (tabId === 'unit5') {
        document.getElementById('subHeaderTitle').textContent = \`5. Ünite: Homes & Houses (Sayfa \${currentUnit5Page})\`;
        renderUnit5();
      } else if (tabId === 'unit6') {
        document.getElementById('subHeaderTitle').textContent = \`6. Ünite: Life in the City (Sayfa \${currentUnit6Page})\`;
        renderUnit6();
      } else if (tabId === 'days_sort') {
        document.getElementById('subHeaderTitle').textContent = 'Haftanın Günleri Sıralama Ödevi';
        renderDaysSort();
      } else if (tabId === 'quiz') {
        document.getElementById('subHeaderTitle').textContent = '🏆 20 Sorulu Puanlı Büyük Sınav (Puan & Seri)';
        renderQuiz();
      } else if (tabId === 'flashcards') {
        document.getElementById('subHeaderTitle').textContent = 'Kelimeler & Flaş Kartlar';
        renderFlashcards();
      } else if (tabId === 'guide') {
        document.getElementById('subHeaderTitle').textContent = 'Günler ve Telaffuz Rehberi';
        renderDaysGuide();
      }
    }

    /* ========================================================
       2.0. UNITS OVERVIEW / MAIN MENU (ANA MENÜ)
    ======================================================== */
    function renderUnitsOverview() {
      const unitsData = [
        { id: 'unit1', num: '1. Ünite', title: 'Words & Greetings', pages: 'Sayfa 9 - 16', icon: '👋', desc: 'Selamlaşma, duygular (fine, happy, tired), 1-10 sayılar, renkler ve günler.', color: '#3b82f6' },
        { id: 'unit2', num: '2. Ünite', title: 'Classroom Life', pages: 'Sayfa 17 - 24', icon: '🏫', desc: 'Sınıf eşyaları, yönergeler (Open the door), çiçek şifresi, hikaye ve sayma.', color: '#10b981' },
        { id: 'unit3', num: '3. Ünite', title: 'Personal Life', pages: 'Sayfa 25 - 32', icon: '👤', desc: 'Vücut organları (head, nose, eye), giysiler, boyama ve şarkı.', color: '#8b5cf6' },
        { id: 'unit4', num: '4. Ünite', title: 'Family Life', pages: 'Sayfa 33 - 40', icon: '👨‍👩‍👧‍👦', desc: 'Aile bireyleri (mother, father, baby, grandfather), cümle kurma.', color: '#f59e0b' },
        { id: 'unit5', num: '5. Ünite', title: 'Homes & Houses', pages: 'Sayfa 41 - 48', icon: '🏡', desc: 'Evin bölümleri (bedroom, kitchen, bathroom), mobilyalar, Where is the dog?', color: '#ec4899' },
        { id: 'unit6', num: '6. Ünite', title: 'Life in the City', pages: 'Sayfa 49 - 56', icon: '🌆', desc: 'Şehir mekanları (school, park, hospital, zoo, museum, cinema) ve dünya.', color: '#06b6d4' }
      ];

      const html = \`
        <div class="card" style="margin-bottom:16px;background:linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.9));border:2px solid var(--accent);">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
            <div>
              <h2 style="font-size:20px;color:#fff;margin-bottom:4px;">📖 2. Sınıf İngilizce Kitabı</h2>
              <p style="font-size:13px;color:var(--muted);">Tüm 6 Ünite (Sayfa 9'dan 56'ya kadar) ve Puan Veren 20 Sorulu Sınav</p>
            </div>
            <div style="display:flex;gap:8px;">
              <button class="action-btn" onclick="copyFullHtmlCode()" style="background:#2563eb;font-size:12px;padding:8px 12px;">📋 Kodu Kopyala</button>
              <button class="action-btn" onclick="downloadHtmlFile()" style="background:#059669;font-size:12px;padding:8px 12px;">⬇️ HTML İndir</button>
            </div>
          </div>
        </div>

        <!-- 20 SORULU BÜYÜK SINAV VURGULU KART -->
        <div class="card" style="margin-bottom:20px;background:linear-gradient(135deg, rgba(245,158,11,0.15), rgba(30,41,59,0.9));border:2px solid #f59e0b;cursor:pointer;" onclick="switchMainTab('quiz')">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
            <div style="display:flex;align-items:center;gap:14px;">
              <div style="font-size:40px;">🏆</div>
              <div>
                <div style="display:inline-block;background:#f59e0b;color:#0f172a;font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;margin-bottom:4px;">İLK YAPTIĞIMIZ SINAV</div>
                <h3 style="font-size:18px;color:#fde047;margin-bottom:4px;">20 Sorulu Puanlı Büyük Sınav</h3>
                <p style="font-size:12px;color:#cbd5e1;">Puan kazandıran (+10 Puan), seri çarpanlı (🔥 Seri), sesli dinleme ve hata hakkı veren sınav.</p>
              </div>
            </div>
            <button class="action-btn" style="background:#f59e0b;color:#0f172a;white-space:nowrap;font-weight:800;" onclick="event.stopPropagation();switchMainTab('quiz');">Sınava Başla ➔</button>
          </div>
        </div>

        <!-- TÜM 6 ÜNİTE KARTLARI -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:14px;margin-bottom:20px;">
          \${unitsData.map(u => \`
            <div class="card" style="margin-bottom:0;border:1px solid var(--border);transition:all 0.2s;cursor:pointer;" onclick="switchMainTab('\${u.id}')">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;">
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="font-size:32px;background:rgba(255,255,255,0.05);padding:8px;border-radius:12px;">\${u.icon}</div>
                  <div>
                    <span style="font-size:11px;font-weight:700;color:\${u.color};">\${u.num} • \${u.pages}</span>
                    <h4 style="font-size:16px;color:#fff;margin-top:2px;">\${u.title}</h4>
                  </div>
                </div>
              </div>
              <p style="font-size:12px;color:var(--muted);line-height:1.4;margin-bottom:12px;min-height:34px;">\${u.desc}</p>
              <button class="action-btn" style="width:100%;background:\${u.color};font-size:13px;padding:8px;" onclick="event.stopPropagation();switchMainTab('\${u.id}');">
                Derslere Başla ➔
              </button>
            </div>
          \`).join('')}
        </div>

        <!-- DİĞER MODLAR -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));gap:12px;">
          <div class="card" style="margin-bottom:0;text-align:center;cursor:pointer;" onclick="switchMainTab('days_sort')">
            <div style="font-size:32px;margin-bottom:6px;">📅</div>
            <div style="font-weight:700;color:#fff;font-size:14px;">Haftanın Günleri Sıralama</div>
            <p style="font-size:11px;color:var(--muted);margin:4px 0 10px;">Pazartesi'den Pazar'a günleri doğru sıraya dizme oyunu.</p>
            <button class="action-btn" style="font-size:11px;padding:6px 12px;background:#3b82f6;">Oyna</button>
          </div>
          <div class="card" style="margin-bottom:0;text-align:center;cursor:pointer;" onclick="switchMainTab('flashcards')">
            <div style="font-size:32px;margin-bottom:6px;">🃏</div>
            <div style="font-weight:700;color:#fff;font-size:14px;">Sesli Kelime Kartları</div>
            <p style="font-size:11px;color:var(--muted);margin:4px 0 10px;">Tüm 6 ünitenin resimli ve sesli telaffuz kartları.</p>
            <button class="action-btn" style="font-size:11px;padding:6px 12px;background:#8b5cf6;">İncele</button>
          </div>
          <div class="card" style="margin-bottom:0;text-align:center;cursor:pointer;" onclick="switchMainTab('guide')">
            <div style="font-size:32px;margin-bottom:6px;">📖</div>
            <div style="font-weight:700;color:#fff;font-size:14px;">Günler Rehberi</div>
            <p style="font-size:11px;color:var(--muted);margin:4px 0 10px;">Tüm günlerin telaffuzları, ipuçları ve bilgileri.</p>
            <button class="action-btn" style="font-size:11px;padding:6px 12px;background:#10b981;">Aç</button>
          </div>
        </div>
      \`;

      document.getElementById('appContent').innerHTML = html;
    }

    /* ========================================================
       2.1.`;

html = html.replace(oldSwitchRegex, newSwitchFunction);

// 5. REPLACE ENTIRE QUIZ SECTION WITH FULL 20-QUESTION SCORING EXAM
const oldQuizSectionRegex = /\/\* =* 7\. QUIZ \/ TEST MODU[\s\S]*?\/\* =* 8\. FLASHCARDS/;

const newQuizSectionCode = `/* ========================================================
       7. 20 SORULU PUANLI BÜYÜK SINAV (SKORLU, SERİLİ VE TEKRAR HAKLI)
    ======================================================== */
    const quizQuestions = [
      {
        direction: "TR_TO_EN",
        directionLabel: "🇹🇷 TÜRKÇE ➔ 🇬🇧 İNGİLİZCE",
        prompt: "Aşağıdakilerden hangisi 'Pazartesi' demektir?",
        word: "Pazartesi",
        correct: "Monday",
        options: ["Monday", "Tuesday", "Sunday", "Friday"],
        audioText: "Monday"
      },
      {
        direction: "EN_TO_TR",
        directionLabel: "🇬🇧 İNGİLİZCE ➔ 🇹🇷 TÜRKÇE",
        prompt: "'PENCIL CASE' kelimesinin Türkçe karşılığı nedir?",
        word: "Pencil case",
        correct: "Kalem Kutusu",
        options: ["Kalem Kutusu", "Defter", "Masa", "Silgi"],
        audioText: "Pencil case"
      },
      {
        direction: "LISTENING",
        directionLabel: "🎧 DİNLE ➔ DOĞRU GÜNÜ SEÇ",
        prompt: "Hoparlörden okunan kelimeyi dinleyin ve doğru olanı seçin:",
        word: "Wednesday",
        correct: "Wednesday",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        audioText: "Wednesday"
      },
      {
        direction: "TR_TO_EN",
        directionLabel: "🇹🇷 TÜRKÇE ➔ 🇬🇧 İNGİLİZCE",
        prompt: "Aşağıdakilerden hangisi 'YATAK ODASI' demektir?",
        word: "Yatak Odası",
        correct: "Bedroom",
        options: ["Bedroom", "Kitchen", "Bathroom", "Living Room"],
        audioText: "Bedroom"
      },
      {
        direction: "EN_TO_TR",
        directionLabel: "🇬🇧 İNGİLİZCE ➔ 🇹🇷 TÜRKÇE",
        prompt: "'OPEN THE DOOR, PLEASE!' cümlesi ne anlama gelir?",
        word: "Open the door, please!",
        correct: "Kapıyı aç, lütfen!",
        options: ["Kapıyı aç, lütfen!", "Pencereyi kapat, lütfen!", "Ayağa kalk!", "Sessiz ol!"],
        audioText: "Open the door, please!"
      },
      {
        direction: "TR_TO_EN",
        directionLabel: "🇹🇷 TÜRKÇE ➔ 🇬🇧 İNGİLİZCE",
        prompt: "Aşağıdakilerden hangisi 'BÜYÜKBABA / DEDE' demektir?",
        word: "Dede",
        correct: "Grandfather",
        options: ["Father", "Grandfather", "Brother", "Uncle"],
        audioText: "Grandfather"
      },
      {
        direction: "LISTENING",
        directionLabel: "🎧 DİNLE ➔ DOĞRU AİLE BİREYİNİ SEÇ",
        prompt: "Hoparlörden okunan aile bireyini dinleyin ve seçin:",
        word: "Mother",
        correct: "Mother (Anne)",
        options: ["Mother (Anne)", "Father (Baba)", "Sister (Kız kardeş)", "Baby (Bebek)"],
        audioText: "Mother"
      },
      {
        direction: "EN_TO_TR",
        directionLabel: "🇬🇧 İNGİLİZCE ➔ 🇹🇷 TÜRKÇE",
        prompt: "'WHERE IS THE DOG?' sorusunun anlamı nedir?",
        word: "Where is the dog?",
        correct: "Köpek nerede?",
        options: ["Kedi nerede?", "Köpek nerede?", "Kuş nerede?", "Tavşan nerede?"],
        audioText: "Where is the dog?"
      },
      {
        direction: "TR_TO_EN",
        directionLabel: "🇹🇷 TÜRKÇE ➔ 🇬🇧 İNGİLİZCE",
        prompt: "Aşağıdakilerden hangisi 'BURUN' demektir?",
        word: "Burun",
        correct: "Nose",
        options: ["Eye", "Nose", "Ear", "Mouth"],
        audioText: "Nose"
      },
      {
        direction: "EN_TO_TR",
        directionLabel: "🇬🇧 İNGİLİZCE ➔ 🇹🇷 TÜRKÇE",
        prompt: "'SHOES' kelimesinin Türkçe karşılığı nedir?",
        word: "Shoes",
        correct: "Ayakkabı",
        options: ["Şapka", "Gözlük", "Ayakkabı", "Pantolon"],
        audioText: "Shoes"
      },
      {
        direction: "LISTENING",
        directionLabel: "🎧 DİNLE ➔ DOĞRU ŞEHİR MEKANINI SEÇ",
        prompt: "Hoparlörden okunan mekanı dinleyin ve seçin:",
        word: "Hospital",
        correct: "Hospital (Hastane)",
        options: ["Hospital (Hastane)", "School (Okul)", "Park (Park)", "Zoo (Hayvanat Bahçesi)"],
        audioText: "Hospital"
      },
      {
        direction: "TR_TO_EN",
        directionLabel: "🇹🇷 TÜRKÇE ➔ 🇬🇧 İNGİLİZCE",
        prompt: "Aşağıdakilerden hangisi 'CUMA' demektir?",
        word: "Cuma",
        correct: "Friday",
        options: ["Monday", "Thursday", "Friday", "Saturday"],
        audioText: "Friday"
      },
      {
        direction: "EN_TO_TR",
        directionLabel: "🇬🇧 İNGİLİZCE ➔ 🇹🇷 TÜRKÇE",
        prompt: "'CLOSE THE WINDOW, PLEASE!' ne anlama gelir?",
        word: "Close the window, please!",
        correct: "Pencereyi kapat, lütfen!",
        options: ["Kapıyı aç, lütfen!", "Pencereyi kapat, lütfen!", "Tahtaya gel!", "Defteri aç!"],
        audioText: "Close the window, please!"
      },
      {
        direction: "TR_TO_EN",
        directionLabel: "🇹🇷 TÜRKÇE ➔ 🇬🇧 İNGİLİZCE",
        prompt: "Aşağıdakilerden hangisi 'MUTFAK' demektir?",
        word: "Mutfak",
        correct: "Kitchen",
        options: ["Kitchen", "Bedroom", "Balcony", "Garden"],
        audioText: "Kitchen"
      },
      {
        direction: "LISTENING",
        directionLabel: "🎧 DİNLE ➔ DOĞRU GÜNÜ SEÇ",
        prompt: "Hoparlörden okunan günü dinleyin ve seçin:",
        word: "Sunday",
        correct: "Sunday (Pazar)",
        options: ["Saturday (Cumartesi)", "Sunday (Pazar)", "Monday (Pazartesi)", "Tuesday (Salı)"],
        audioText: "Sunday"
      },
      {
        direction: "EN_TO_TR",
        directionLabel: "🇬🇧 İNGİLİZCE ➔ 🇹🇷 TÜRKÇE",
        prompt: "'A RULER' kelimesinin Türkçe anlamı nedir?",
        word: "A ruler",
        correct: "Cetvel",
        options: ["Kalemtıraş", "Makas", "Cetvel", "Boya kalemi"],
        audioText: "A ruler"
      },
      {
        direction: "TR_TO_EN",
        directionLabel: "🇹🇷 TÜRKÇE ➔ 🇬🇧 İNGİLİZCE",
        prompt: "Aşağıdakilerden hangisi 'KEDİ' demektir?",
        word: "Kedi",
        correct: "Cat",
        options: ["Dog", "Cat", "Rabbit", "Bird"],
        audioText: "Cat"
      },
      {
        direction: "EN_TO_TR",
        directionLabel: "🇬🇧 İNGİLİZCE ➔ 🇹🇷 TÜRKÇE",
        prompt: "'MUSEUM' kelimesinin Türkçe karşılığı nedir?",
        word: "Museum",
        correct: "Müze",
        options: ["Kütüphane", "Müze", "Sinema", "Banka"],
        audioText: "Museum"
      },
      {
        direction: "LISTENING",
        directionLabel: "🎧 DİNLE ➔ DOĞRU VÜCUT BÖLÜMÜNÜ SEÇ",
        prompt: "Hoparlörden okunan vücut bölümünü dinleyin ve seçin:",
        word: "Head",
        correct: "Head (Baş / Kafa)",
        options: ["Head (Baş / Kafa)", "Hand (El)", "Leg (Bacak)", "Arm (Kol)"],
        audioText: "Head"
      },
      {
        direction: "TR_TO_EN",
        directionLabel: "🇹🇷 TÜRKÇE ➔ 🇬🇧 İNGİLİZCE",
        prompt: "Haftanın 6. günü olan 'CUMARTESİ' hangisidir?",
        word: "Cumartesi",
        correct: "Saturday",
        options: ["Sunday", "Friday", "Saturday", "Wednesday"],
        audioText: "Saturday"
      }
    ];

    let currentQuizIndex = 0;
    let quizScore = 0;
    let quizStreak = 0;
    let quizBestStreak = 0;
    let quizWrongInCurrent = 0;
    let quizTotalFirstTryCorrect = 0;
    let quizTotalMistakes = 0;
    let quizWrongClicked = [];
    let quizAnsweredCorrectly = false;

    function restartQuiz() {
      currentQuizIndex = 0;
      quizScore = 0;
      quizStreak = 0;
      quizBestStreak = 0;
      quizWrongInCurrent = 0;
      quizTotalFirstTryCorrect = 0;
      quizTotalMistakes = 0;
      quizWrongClicked = [];
      quizAnsweredCorrectly = false;
      renderQuiz();
    }

    function renderQuiz() {
      // TÜM 20 SORU BİTTİĞİNDE: KUTLAMA VE PUAN RAPORU
      if (currentQuizIndex >= quizQuestions.length) {
        const accuracy = Math.round((quizTotalFirstTryCorrect / quizQuestions.length) * 100);
        let starRating = '⭐⭐⭐⭐⭐';
        if (accuracy < 60) starRating = '⭐⭐⭐';
        else if (accuracy < 85) starRating = '⭐⭐⭐⭐';

        document.getElementById('appContent').innerHTML = \`
          <div class="quiz-card" style="max-width:540px;margin:20px auto;border:2px solid #f59e0b;padding:26px;">
            <div style="font-size:58px;margin-bottom:12px;">🏆 🌟 🎉</div>
            <div style="display:inline-block;background:#f59e0b;color:#0f172a;font-size:12px;font-weight:800;padding:4px 12px;border-radius:8px;margin-bottom:8px;">
              20 SORULUK SINAV TAMAMLANDI!
            </div>
            <h2 style="font-size:24px;color:#fde047;margin-bottom:6px;">Harika Bir Başarı!</h2>
            <div style="font-size:28px;margin-bottom:14px;">\${starRating}</div>

            <!-- PUAN VE İSTATİSTİK KUTUSU -->
            <div style="background:#0f172a;border:1px solid var(--border);border-radius:14px;padding:16px;margin:16px 0;text-align:left;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid var(--border);">
                <span style="color:var(--muted);font-size:14px;">Toplam Skor / Puan:</span>
                <span style="color:#fde047;font-size:20px;font-weight:800;">★ \${quizScore} Puan</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span style="color:var(--muted);font-size:13px;">İlk Denemede Doğru:</span>
                <span style="color:#34d399;font-weight:700;font-size:14px;">\${quizTotalFirstTryCorrect} / \${quizQuestions.length} soru</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span style="color:var(--muted);font-size:13px;">En Yüksek Seri (Streak):</span>
                <span style="color:#f97316;font-weight:700;font-size:14px;">🔥 \${quizBestStreak}x Seri</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span style="color:var(--muted);font-size:13px;">Düzeltilen Yanlış Sayısı:</span>
                <span style="color:#f87171;font-weight:700;font-size:14px;">\${quizTotalMistakes} kez tekrar denendi</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="color:var(--muted);font-size:13px;">Genel Başarı Oranı:</span>
                <span style="color:#38bdf8;font-weight:800;font-size:14px;">%\${accuracy}</span>
              </div>
            </div>

            <p style="font-size:13px;color:var(--muted);margin-bottom:20px;">
              Yanlış yaptığınız sorularda da pes etmeyip doğruyu kendiniz bulana kadar çalıştınız!
            </p>

            <div style="display:flex;gap:10px;">
              <button class="action-btn" style="flex:1;background:#f59e0b;color:#0f172a;font-weight:800;" onclick="restartQuiz()">
                Sınavı Tekrar Başlat 🔄
              </button>
              <button class="action-btn" style="flex:1;" onclick="switchMainTab('menu')">
                🏠 Tüm Üniteler Menüsü
              </button>
            </div>
          </div>
        \`;
        return;
      }

      const q = quizQuestions[currentQuizIndex];
      const remainingCount = quizQuestions.length - currentQuizIndex;

      // Dinleme sorusu ise sorunun başında otomatik seslendir
      if (q.direction === 'LISTENING' && !quizAnsweredCorrectly && quizWrongInCurrent === 0) {
        setTimeout(() => { speakText(q.audioText); }, 300);
      }

      const html = \`
        <div class="quiz-card" style="max-width:540px;margin:16px auto;border:2px solid var(--border);">
          <!-- 1. ÜST BİLGİ VE PUAN ÇUBUĞU (Android'deki TopHeaderBar ile Birebir) -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border);flex-wrap:wrap;gap:8px;">
            <div style="background:rgba(56,189,248,0.15);color:#38bdf8;font-size:11px;font-weight:700;padding:4px 10px;border-radius:8px;">
              \${q.directionLabel}
            </div>
            <div style="display:flex;align-items:center;gap:12px;">
              \${quizStreak >= 2 ? \`<span style="background:rgba(234,88,12,0.2);color:#f97316;font-size:11px;font-weight:800;padding:3px 8px;border-radius:6px;">🔥 \${quizStreak}x Seri</span>\` : ''}
              <span style="color:#fde047;font-size:14px;font-weight:800;">★ \${quizScore} Puan</span>
            </div>
          </div>

          <!-- 2. SORU SAYISI & SIFIRLA BUTONU -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
            <div style="font-size:13px;font-weight:700;color:#34d399;">
              Soru \${currentQuizIndex + 1} / \${quizQuestions.length} <span style="font-size:11px;color:var(--muted);font-weight:normal;">(Kalan: \${remainingCount})</span>
            </div>
            <button class="reset-btn" onclick="restartQuiz()" title="Sınavı Baştan Başlat">🔄 Sınavı Sıfırla</button>
          </div>

          <!-- 3. SORU VE SES ALANI -->
          <div class="quiz-question-box" style="margin:14px 0 20px;">
            <div class="quiz-prompt" style="font-size:14px;color:#cbd5e1;margin-bottom:10px;">
              \${q.prompt}
            </div>

            \${q.direction === 'LISTENING' ? \`
              <div onclick="speakText('\${q.audioText}')" style="cursor:pointer;background:#0f172a;border:2px dashed #38bdf8;border-radius:14px;padding:16px;display:inline-flex;align-items:center;gap:10px;margin:6px 0;">
                <span style="font-size:28px;">🔊</span>
                <span style="color:#38bdf8;font-weight:700;font-size:15px;">Tekrar Dinlemek İçin Dokunun</span>
              </div>
            \` : \`
              <div class="quiz-word" onclick="speakText('\${q.audioText}')" title="Dinlemek için tıkla" style="font-size:24px;color:#38bdf8;font-weight:800;cursor:pointer;">
                <span>\${q.word}</span>
                <span style="font-size:18px;">🔊</span>
              </div>
            \`}
          </div>

          <!-- 4. DÖRT SEÇENEK ŞIKLARI -->
          <div class="options-grid" style="grid-template-columns:1fr 1fr;gap:10px;">
            \${q.options.map(opt => {
              const isWrong = quizWrongClicked.includes(opt);
              const isCorrectChosen = quizAnsweredCorrectly && opt === q.correct;
              let btnClass = 'option-btn';
              if (isCorrectChosen) btnClass += ' correct';
              if (isWrong) btnClass += ' wrong';

              return \`
                <button
                  class="\${btnClass}"
                  \${quizAnsweredCorrectly ? 'disabled' : ''}
                  onclick="handleQuizOption('\${opt.replace(/'/g, "\\\\'")}')"
                  style="padding:14px 10px;font-size:14px;min-height:54px;display:flex;align-items:center;justify-content:center;text-align:center;"
                >
                  \${opt}
                </button>
              \`;
            }).join('')}
          </div>

          <!-- 5. GERİ BİLDİRİM VE SONRAKİ SORU BUTONU -->
          <div id="quizFeedbackArea" style="margin-top:16px;">
            \${quizAnsweredCorrectly ? \`
              <div class="feedback-banner success" style="display:flex;justify-content:space-between;align-items:center;">
                <span>🎉 Harika! Doğru cevap!</span>
                <button class="action-btn" onclick="nextQuizQuestion()" style="font-size:12px;padding:8px 14px;background:#10b981;">
                  Sonraki Soru ➔
                </button>
              </div>
            \` : ''}
            \${quizWrongClicked.length > 0 && !quizAnsweredCorrectly ? \`
              <div class="feedback-banner error" style="text-align:left;">
                <span>❌ Yanlış şık! Pes etmek yok, doğru şıkkı bulana kadar tekrar dene!</span>
              </div>
            \` : ''}
          </div>
        </div>
      \`;

      document.getElementById('appContent').innerHTML = html;
    }

    function handleQuizOption(selectedOpt) {
      if (quizAnsweredCorrectly) return;
      recordActivity();

      const q = quizQuestions[currentQuizIndex];

      if (selectedOpt === q.correct) {
        // DOĞRU CEVAP
        quizAnsweredCorrectly = true;
        let pointsEarned = 10;

        if (quizWrongInCurrent === 0) {
          // İlk denemede bildi
          quizTotalFirstTryCorrect++;
          quizStreak++;
          if (quizStreak > quizBestStreak) quizBestStreak = quizStreak;
          if (quizStreak >= 2) pointsEarned += 5; // Seri bonusu!
        } else {
          // Yanlış denemelerden sonra doğruyu buldu
          pointsEarned = 5;
        }

        quizScore += pointsEarned;
        speakText('Correct! ' + q.audioText);
        renderQuiz();

        // 1.5 saniye sonra otomatik ilerle (kullanıcı beklemek istemezse butona da basabilir)
        setTimeout(() => {
          if (quizAnsweredCorrectly) {
            nextQuizQuestion();
          }
        }, 1600);
      } else {
        // YANLIŞ CEVAP - DOĞRUYU BULANA KADAR DEVAM EDER!
        if (!quizWrongClicked.includes(selectedOpt)) {
          quizWrongClicked.push(selectedOpt);
          quizWrongInCurrent++;
          quizTotalMistakes++;
          quizStreak = 0; // Seri sıfırlandı
        }
        speakText('Try again');
        renderQuiz();
      }
    }

    function nextQuizQuestion() {
      if (currentQuizIndex < quizQuestions.length) {
        currentQuizIndex++;
        quizWrongInCurrent = 0;
        quizWrongClicked = [];
        quizAnsweredCorrectly = false;
        renderQuiz();
      }
    }

    /* ========================================================
       8. FLASHCARDS`;

html = html.replace(oldQuizSectionRegex, newQuizSectionCode);

// 6. UPDATE STARTUP TAB TO 'menu' SO USER SEES ALL 6 UNITS & QUIZ IMMEDIATELY
html = html.replace(
  /\/\/ Başlangıçta.*?switchMainTab\(.*?\);/s,
  `// Başlangıçta tüm ünitelerin göründüğü ana menüyü yükle\n    switchMainTab('menu');`
);

// 7. ENHANCE copyFullHtmlCode & downloadHtmlFile
const oldCopyFuncRegex = /function copyFullHtmlCode\(\) \{[\s\S]*?function downloadHtmlFile\(\) \{[\s\S]*?\}/;
const newCopyAndDownloadFuncs = `function copyFullHtmlCode() {
      recordActivity();
      const currentDocHtml = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;
      const copyBtn = document.getElementById('copyCodeBtn');

      function showSuccess() {
        if (copyBtn) {
          copyBtn.textContent = '✅ Kod Kopyalandı!';
          copyBtn.style.background = '#10b981';
          setTimeout(() => {
            copyBtn.textContent = '📋 Kodu Kopyala';
            copyBtn.style.background = '#2563eb';
          }, 3000);
        }
        alert('🎉 Tüm 6 ünite ve 20 sorulu sınavı içeren eksiksiz index.html kodu panonuza kopyalandı! İstediğiniz yere (Not Defteri / VS Code / GitHub) yapıştırabilirsiniz.');
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(currentDocHtml).then(showSuccess).catch(() => {
          fallbackCopyText(currentDocHtml, showSuccess);
        });
      } else {
        fallbackCopyText(currentDocHtml, showSuccess);
      }
    }

    function fallbackCopyText(text, callback) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        callback();
      } catch (err) {
        alert('Panoya kopyalanamadı. Lütfen "HTML İndir" butonunu kullanarak doğrudan dosyayı indirin.');
      }
      document.body.removeChild(ta);
    }

    function downloadHtmlFile() {
      recordActivity();
      const currentDocHtml = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;
      const blob = new Blob([currentDocHtml], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      const dlBtn = document.getElementById('downloadHtmlBtn');
      if (dlBtn) {
        dlBtn.textContent = '✅ İndirildi!';
        setTimeout(() => { dlBtn.textContent = '⬇️ HTML İndir'; }, 2500);
      }
    }`;

html = html.replace(oldCopyFuncRegex, newCopyAndDownloadFuncs);

// Save updated index.html
fs.writeFileSync('./index.html', html, 'utf8');

// Also update app/src/main/assets/index.html
fs.writeFileSync('app/src/main/assets/index.html', html, 'utf8');

console.log('Build complete! Total size of index.html:', html.length);

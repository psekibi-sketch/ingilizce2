// build_full_all_units.js
const fs = require('fs');

let html = fs.readFileSync('./index.html', 'utf8');

// 1. Update Title to include all 6 units
html = html.replace(
  /<title>.*?<\/title>/,
  '<title>LingoDays - 2. Sınıf İngilizce (1, 2, 3, 4, 5, 6. Üniteler & Ödevler)</title>'
);

// 2. Add Unit 1 tab in nav-scroll if not already present
if (!html.includes('id="tab_unit1"')) {
  html = html.replace(
    '<div class="nav-scroll">',
    `<div class="nav-scroll">
      <button class="nav-tab" onclick="switchMainTab('unit1')" id="tab_unit1">👋 1. Ünite: Words & Greetings</button>`
  );
}

// 3. Add Unit 1 in bottom-nav if not already present
if (!html.includes('id="bnav_unit1"')) {
  html = html.replace(
    '<nav class="bottom-nav">',
    `<nav class="bottom-nav">
    <button class="b-nav-item" onclick="switchMainTab('unit1')" id="bnav_unit1">
      <span class="b-icon">👋</span>
      <span>1. Ünite</span>
    </button>`
  );
}

// 4. Update switchMainTab to handle unit1
if (!html.includes("tabId === 'unit1'")) {
  html = html.replace(
    "if (tabId === 'unit6') {",
    `if (tabId === 'unit1') {
        document.getElementById('subHeaderTitle').textContent = \`1. Ünite: Words & Greetings (Sayfa \${currentUnit1Page})\`;
        renderUnit1();
      } else if (tabId === 'unit6') {`
  );
}

// 5. Add Unit 1 Data & renderUnit1 if not present
const unit1Code = `
    /* ========================================================
       2.1. UNIT 1: WORDS & GREETINGS (SAYFA 9 - 16)
    ======================================================== */
    let currentUnit1Page = 9;
    const u1Greetings = [
      { en: "Hello", tr: "Merhaba", icon: "👋" },
      { en: "Hi", tr: "Selam", icon: "🙋" },
      { en: "Good morning", tr: "Günaydın", icon: "🌅" },
      { en: "Good afternoon", tr: "Tünaydın / İyi günler", icon: "☀️" },
      { en: "Good evening", tr: "İyi akşamlar", icon: "🌆" },
      { en: "Good night", tr: "İyi geceler", icon: "🌙" },
      { en: "Goodbye", tr: "Hoşça kal", icon: "👋" },
      { en: "Bye-bye", tr: "Güle güle", icon: "🚶" }
    ];

    const u1Feelings = [
      { en: "I am fine, thank you.", tr: "İyiyim, teşekkür ederim.", icon: "😊" },
      { en: "Great", tr: "Harika", icon: "🤩" },
      { en: "Good", tr: "İyi", icon: "👍" },
      { en: "OK / So-so", tr: "Şöyle böyle / İdare eder", icon: "🙂" },
      { en: "Tired", tr: "Yorgun", icon: "🥱" },
      { en: "Sad", tr: "Üzgün", icon: "😢" }
    ];

    const u1Numbers = [
      { num: 1, en: "One", tr: "Bir", icon: "1️⃣" },
      { num: 2, en: "Two", tr: "İki", icon: "2️⃣" },
      { num: 3, en: "Three", tr: "Üç", icon: "3️⃣" },
      { num: 4, en: "Four", tr: "Dört", icon: "4️⃣" },
      { num: 5, en: "Five", tr: "Beş", icon: "5️⃣" },
      { num: 6, en: "Six", tr: "Altı", icon: "6️⃣" },
      { num: 7, en: "Seven", tr: "Yedi", icon: "7️⃣" },
      { num: 8, en: "Eight", tr: "Sekiz", icon: "8️⃣" },
      { num: 9, en: "Nine", tr: "Dokuz", icon: "9️⃣" },
      { num: 10, en: "Ten", tr: "On", icon: "🔟" }
    ];

    const u1Colors = [
      { en: "Red", tr: "Kırmızı", hex: "#ef4444", icon: "🔴" },
      { en: "Blue", tr: "Mavi", hex: "#3b82f6", icon: "🔵" },
      { en: "Yellow", tr: "Sarı", hex: "#eab308", icon: "🟡" },
      { en: "Green", tr: "Yeşil", hex: "#22c55e", icon: "🟢" },
      { en: "Orange", tr: "Turuncu", hex: "#f97316", icon: "🟠" },
      { en: "Purple", tr: "Mor", hex: "#a855f7", icon: "🟣" },
      { en: "Pink", tr: "Pembe", hex: "#ec4899", icon: "🌸" },
      { en: "Black", tr: "Siyah", hex: "#1e293b", icon: "⚫" },
      { en: "White", tr: "Beyaz", hex: "#f8fafc", icon: "⚪" }
    ];

    const u1CommonWords = [
      { en: "Taxi", tr: "Taksi", icon: "🚕" },
      { en: "Cake", tr: "Kek / Pasta", icon: "🍰" },
      { en: "Ambulance", tr: "Ambulans", icon: "🚑" },
      { en: "Gorilla", tr: "Goril", icon: "🦍" },
      { en: "Kangaroo", tr: "Kanguru", icon: "🦘" },
      { en: "Lemon", tr: "Limon", icon: "🍋" },
      { en: "Robot", tr: "Robot", icon: "🤖" },
      { en: "Television", tr: "Televizyon", icon: "📺" },
      { en: "Yogurt", tr: "Yoğurt", icon: "🥣" },
      { en: "Zebra", tr: "Zebra", icon: "🦓" }
    ];

    let p15Answers = { q1: null, q2: null, q3: null };
    let p16Profile = { name: '', age: '7', greeting: 'Hello' };

    function selectUnit1Page(p) {
      currentUnit1Page = p;
      document.getElementById('subHeaderTitle').textContent = \`1. Ünite: Words & Greetings (Sayfa \${p})\`;
      renderUnit1();
    }

    function resetUnit1Page(p) {
      if (p === 15) {
        p15Answers = { q1: null, q2: null, q3: null };
      }
      renderUnit1();
    }

    function checkP15(qKey, val, isCorrect) {
      recordActivity();
      p15Answers[qKey] = val;
      if (isCorrect) {
        speakText('Great job! That is correct!');
      } else {
        speakText('Try again, you can do it!');
      }
      renderUnit1();
    }

    function updateP16Profile(key, val) {
      recordActivity();
      p16Profile[key] = val;
      renderUnit1();
    }

    function speakP16Profile() {
      recordActivity();
      const n = p16Profile.name || 'a student';
      const text = \`\${p16Profile.greeting}! My name is \${n}. I am \${p16Profile.age} years old. Nice to meet you!\`;
      speakText(text);
    }

    function renderUnit1() {
      let pageNavHtml = \`
        <div class="page-nav-bar">
          \${[9, 10, 11, 12, 13, 14, 15, 16].map(p => \`
            <button class="page-chip \${currentUnit1Page === p ? 'active' : ''}" onclick="selectUnit1Page(\${p})">
              Sayfa \${p}
            </button>
          \`).join('')}
        </div>
      \`;

      let contentHtml = '';

      if (currentUnit1Page === 9) {
        contentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">👋 Sayfa 9: Greetings & Introduction (Tanışma & Selamlaşma)</div>
              <button class="reset-btn" onclick="resetUnit1Page(9)">🔄 Dersi Sıfırla</button>
            </div>
            <p style="color:var(--muted);font-size:13px;margin-bottom:14px;">
              Kelimeleri dinlemek için üzerlerine dokunun.
            </p>
            <div class="word-grid">
              \${u1Greetings.map(item => \`
                <div class="word-tile" onclick="speakText('\${item.en}')">
                  <span class="speaker-icon">🔊</span>
                  <div class="tile-icon">\${item.icon}</div>
                  <div class="en-text">\${item.en}</div>
                  <div class="tr-text">\${item.tr}</div>
                </div>
              \`).join('')}
            </div>
            <div style="margin-top:16px;background:rgba(99,102,241,0.1);padding:14px;border-radius:12px;border:1px solid rgba(99,102,241,0.3);">
              <h4 style="color:#818cf8;margin-bottom:6px;">💬 Temel Soru & Cevap:</h4>
              <p style="font-size:15px;margin-bottom:4px;"><b>What is your name?</b> (Senin adın ne?)</p>
              <p style="font-size:15px;color:#38bdf8;"><b>My name is Ali.</b> (Benim adım Ali.)</p>
              <button class="action-btn" style="margin-top:10px;" onclick="speakText('What is your name? My name is Ali.')">🔊 Örnek Diyaloğu Dinle</button>
            </div>
          </div>
        \`;
      } else if (currentUnit1Page === 10) {
        contentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">😊 Sayfa 10: How are you? (Nasılsın?) & Duygular</div>
              <button class="reset-btn" onclick="resetUnit1Page(10)">🔄 Dersi Sıfırla</button>
            </div>
            <p style="color:var(--muted);font-size:13px;margin-bottom:14px;">
              "How are you?" sorusuna verilen cevapları dinleyin ve tekrar edin:
            </p>
            <div class="word-grid">
              \${u1Feelings.map(item => \`
                <div class="word-tile" onclick="speakText('\${item.en}')">
                  <span class="speaker-icon">🔊</span>
                  <div class="tile-icon">\${item.icon}</div>
                  <div class="en-text">\${item.en}</div>
                  <div class="tr-text">\${item.tr}</div>
                </div>
              \`).join('')}
            </div>
            <div style="margin-top:16px;text-align:center;">
              <button class="action-btn" onclick="speakText('How are you? I am fine, thank you.')">🔊 "How are you? I am fine, thank you" Dinle</button>
            </div>
          </div>
        \`;
      } else if (currentUnit1Page === 11) {
        contentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">🔢 Sayfa 11: Numbers 1 to 10 (Sayılar 1-10)</div>
              <button class="reset-btn" onclick="resetUnit1Page(11)">🔄 Dersi Sıfırla</button>
            </div>
            <p style="color:var(--muted);font-size:13px;margin-bottom:14px;">
              1'den 10'a kadar sayıları dinleyin:
            </p>
            <div class="word-grid">
              \${u1Numbers.map(item => \`
                <div class="word-tile" onclick="speakText('\${item.en}')">
                  <span class="speaker-icon">🔊</span>
                  <div class="tile-icon">\${item.icon}</div>
                  <div class="en-text">\${item.en}</div>
                  <div class="tr-text">\${item.num} - \${item.tr}</div>
                </div>
              \`).join('')}
            </div>
            <div style="margin-top:16px;background:rgba(16,185,129,0.1);padding:14px;border-radius:12px;border:1px solid rgba(16,185,129,0.3);text-align:center;">
              <h4 style="color:#34d399;margin-bottom:6px;">🎂 Yaş Sorma:</h4>
              <p style="font-size:15px;margin-bottom:4px;"><b>How old are you?</b> (Kaç yaşındasın?)</p>
              <p style="font-size:15px;color:#a7f3d0;"><b>I am seven years old.</b> (Ben 7 yaşındayım.)</p>
              <button class="action-btn" style="margin-top:10px;background:#059669;" onclick="speakText('How old are you? I am seven years old.')">🔊 Dinle</button>
            </div>
          </div>
        \`;
      } else if (currentUnit1Page === 12) {
        contentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">📅 Sayfa 12: Days of the Week (Haftanın Günleri)</div>
              <button class="reset-btn" onclick="resetUnit1Page(12)">🔄 Dersi Sıfırla</button>
            </div>
            <p style="color:var(--muted);font-size:13px;margin-bottom:14px;">
              Okul ödevi günleri sıralı sayma pratiği:
            </p>
            <div class="word-grid">
              \${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => \`
                <div class="word-tile" onclick="speakText('\${day}')">
                  <span class="speaker-icon">🔊</span>
                  <div class="tile-icon">\${i < 5 ? '💼' : '🎉'}</div>
                  <div class="en-text">\${day}</div>
                  <div class="tr-text">\${['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'][i]}</div>
                </div>
              \`).join('')}
            </div>
            <div style="margin-top:16px;text-align:center;">
              <button class="action-btn" onclick="switchMainTab('days_sort')">📅 İnteraktif Gün Sıralama Oyununa Git ➔</button>
            </div>
          </div>
        \`;
      } else if (currentUnit1Page === 13) {
        contentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">🎨 Sayfa 13: Colors (Temel Renkler)</div>
              <button class="reset-btn" onclick="resetUnit1Page(13)">🔄 Dersi Sıfırla</button>
            </div>
            <p style="color:var(--muted);font-size:13px;margin-bottom:14px;">
              Renkleri dinleyin ve Türkçe anlamlarını öğrenin:
            </p>
            <div class="word-grid">
              \${u1Colors.map(item => \`
                <div class="word-tile" onclick="speakText('\${item.en}')" style="border-bottom: 3px solid \${item.hex};">
                  <span class="speaker-icon">🔊</span>
                  <div class="tile-icon">\${item.icon}</div>
                  <div class="en-text" style="color:\${item.hex === '#1e293b' ? '#94a3b8' : item.hex};">\${item.en}</div>
                  <div class="tr-text">\${item.tr}</div>
                </div>
              \`).join('')}
            </div>
          </div>
        \`;
      } else if (currentUnit1Page === 14) {
        contentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">📖 Sayfa 14: Common English Words (Türkçede de Geçen Kelimeler)</div>
              <button class="reset-btn" onclick="resetUnit1Page(14)">🔄 Dersi Sıfırla</button>
            </div>
            <p style="color:var(--muted);font-size:13px;margin-bottom:14px;">
              Günlük hayatta sıkça karşılaştığımız ortak İngilizce kelimeler:
            </p>
            <div class="word-grid">
              \${u1CommonWords.map(item => \`
                <div class="word-tile" onclick="speakText('\${item.en}')">
                  <span class="speaker-icon">🔊</span>
                  <div class="tile-icon">\${item.icon}</div>
                  <div class="en-text">\${item.en}</div>
                  <div class="tr-text">\${item.tr}</div>
                </div>
              \`).join('')}
            </div>
          </div>
        \`;
      } else if (currentUnit1Page === 15) {
        contentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">📝 Sayfa 15: Let's Check! (1. Ünite Değerlendirme Testi)</div>
              <button class="reset-btn" onclick="resetUnit1Page(15)">🔄 Testi Sıfırla</button>
            </div>
            <p style="color:var(--muted);font-size:13px;margin-bottom:14px;">
              Doğru seçeneği işaretleyin. Yanlış yaparsanız tekrar deneyebilirsiniz!
            </p>
            <div style="display:flex;flex-direction:column;gap:14px;">
              <!-- Soru 1 -->
              <div style="background:rgba(30,41,59,0.8);padding:14px;border-radius:12px;border:1px solid var(--border);">
                <div style="font-weight:700;margin-bottom:8px;">1. Sabah karşılaştığımızda ne deriz?</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                  \${[
                    { text: 'Good morning', correct: true },
                    { text: 'Good night', correct: false },
                    { text: 'Goodbye', correct: false }
                  ].map(opt => \`
                    <button class="action-btn" style="background:\${p15Answers.q1 === opt.text ? (opt.correct ? '#10b981' : '#ef4444') : '#334155'};" onclick="checkP15('q1', '\${opt.text}', \${opt.correct})">
                      \${opt.text} \${p15Answers.q1 === opt.text ? (opt.correct ? '✅' : '❌') : ''}
                    </button>
                  \`).join('')}
                </div>
              </div>

              <!-- Soru 2 -->
              <div style="background:rgba(30,41,59,0.8);padding:14px;border-radius:12px;border:1px solid var(--border);">
                <div style="font-weight:700;margin-bottom:8px;">2. "What is your name?" sorusunun cevabı hangisidir?</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                  \${[
                    { text: 'My name is Can.', correct: true },
                    { text: 'I am fine.', correct: false },
                    { text: 'Today is Monday.', correct: false }
                  ].map(opt => \`
                    <button class="action-btn" style="background:\${p15Answers.q2 === opt.text ? (opt.correct ? '#10b981' : '#ef4444') : '#334155'};" onclick="checkP15('q2', '\${opt.text}', \${opt.correct})">
                      \${opt.text} \${p15Answers.q2 === opt.text ? (opt.correct ? '✅' : '❌') : ''}
                    </button>
                  \`).join('')}
                </div>
              </div>

              <!-- Soru 3 -->
              <div style="background:rgba(30,41,59,0.8);padding:14px;border-radius:12px;border:1px solid var(--border);">
                <div style="font-weight:700;margin-bottom:8px;">3. "Five" sayısı kaçı ifade eder?</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                  \${[
                    { text: '3', correct: false },
                    { text: '5', correct: true },
                    { text: '8', correct: false }
                  ].map(opt => \`
                    <button class="action-btn" style="background:\${p15Answers.q3 === opt.text ? (opt.correct ? '#10b981' : '#ef4444') : '#334155'};" onclick="checkP15('q3', '\${opt.text}', \${opt.correct})">
                      \${opt.text} \${p15Answers.q3 === opt.text ? (opt.correct ? '✅' : '❌') : ''}
                    </button>
                  \`).join('')}
                </div>
              </div>
            </div>
          </div>
        \`;
      } else if (currentUnit1Page === 16) {
        contentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">🌟 Sayfa 16: All About Me (İlk İngilizce Profilim)</div>
              <button class="reset-btn" onclick="resetUnit1Page(16)">🔄 Sıfırla</button>
            </div>
            <p style="color:var(--muted);font-size:13px;margin-bottom:14px;">
              Bilgilerini seç ve "Beni Seslendir" butonuna basarak İngilizce dinle!
            </p>
            <div style="display:flex;flex-direction:column;gap:12px;max-width:400px;margin:0 auto;">
              <div>
                <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:4px;">Adın (Your Name):</label>
                <input type="text" value="\${p16Profile.name}" placeholder="Adını yaz..." oninput="updateP16Profile('name', this.value)" style="width:100%;padding:10px;border-radius:8px;background:#334155;border:1px solid var(--border);color:#fff;font-size:15px;">
              </div>
              <div>
                <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:4px;">Yaşın (Your Age):</label>
                <select onchange="updateP16Profile('age', this.value)" style="width:100%;padding:10px;border-radius:8px;background:#334155;border:1px solid var(--border);color:#fff;font-size:15px;">
                  \${[6, 7, 8, 9, 10].map(a => \`
                    <option value="\${a}" \${p16Profile.age == a ? 'selected' : ''}>\${a} yaşında (\${a} years old)</option>
                  \`).join('')}
                </select>
              </div>
              <div>
                <label style="font-size:12px;color:var(--muted);display:block;margin-bottom:4px;">Selamın (Greeting):</label>
                <select onchange="updateP16Profile('greeting', this.value)" style="width:100%;padding:10px;border-radius:8px;background:#334155;border:1px solid var(--border);color:#fff;font-size:15px;">
                  <option value="Hello" \${p16Profile.greeting === 'Hello' ? 'selected' : ''}>Hello! 👋</option>
                  <option value="Hi" \${p16Profile.greeting === 'Hi' ? 'selected' : ''}>Hi! 🙋</option>
                  <option value="Good morning" \${p16Profile.greeting === 'Good morning' ? 'selected' : ''}>Good morning! 🌅</option>
                </select>
              </div>
              <button class="action-btn" style="margin-top:10px;background:#2563eb;" onclick="speakP16Profile()">
                🔊 İngilizce Kendini Tanıt & Dinle!
              </button>
            </div>
          </div>
        \`;
      }

      document.getElementById('appContent').innerHTML = pageNavHtml + contentHtml;
    }
`;

if (!html.includes('2.1. UNIT 1: WORDS & GREETINGS')) {
  html = html.replace(
    '/* ========================================================\n       2.5. UNIT 5: HOMES & HOUSES',
    unit1Code + '\n    /* ========================================================\n       2.5. UNIT 5: HOMES & HOUSES'
  );
}

// 6. Write to ./index.html
fs.writeFileSync('./index.html', html, 'utf8');

// 7. Write to app/src/main/assets/index.html as well!
if (!fs.existsSync('app/src/main/assets')) {
  fs.mkdirSync('app/src/main/assets', { recursive: true });
}
fs.writeFileSync('app/src/main/assets/index.html', html, 'utf8');

console.log('Successfully updated index.html with all 6 units! Total size:', html.length);

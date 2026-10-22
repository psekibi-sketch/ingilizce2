// build_unit6.js
const fs = require('fs');

let html = fs.readFileSync('./index.html', 'utf8');

// 1. Update Title
html = html.replace(
  '<title>LingoDays - 2. Sınıf İngilizce Öğreniyorum (1 - 5. Üniteler & Ödevler)</title>',
  '<title>LingoDays - 2. Sınıf İngilizce Öğreniyorum (1 - 6. Üniteler & Ödevler)</title>'
);

// 2. Add "Kodu Kopyala" & "İndir" buttons in Header Widgets
if (!html.includes('copyFullHtmlCode')) {
  html = html.replace(
    '<div class="header-widgets">',
    `<div class="header-widgets">
        <button class="sound-btn" onclick="copyFullHtmlCode()" id="copyCodeBtn" title="Tüm index.html Kodunu Kopyala" style="width:auto;padding:4px 10px;font-size:12px;font-weight:700;display:inline-flex;align-items:center;gap:4px;background:#2563eb;border-color:#3b82f6;">📋 Kodu Kopyala</button>
        <button class="sound-btn" onclick="downloadHtmlFile()" id="downloadHtmlBtn" title="index.html Dosyasını İndir" style="width:auto;padding:4px 10px;font-size:12px;font-weight:700;display:inline-flex;align-items:center;gap:4px;background:#059669;border-color:#10b981;">⬇️ HTML İndir</button>`
  );
}

// 3. Add 6. Ünite to Navigation bar
const oldTopNav = `<button class="nav-tab active" onclick="switchMainTab('unit5')" id="tab_unit5">🏡 5. Ünite: Homes & Houses (Yeni!)</button>`;
const newTopNav = `<button class="nav-tab active" onclick="switchMainTab('unit6')" id="tab_unit6">🌆 6. Ünite: Life in the City (Son Ünite!)</button>
      <button class="nav-tab" onclick="switchMainTab('unit5')" id="tab_unit5">🏡 5. Ünite: Homes & Houses</button>`;
html = html.replace(oldTopNav, newTopNav);

// 4. Add 6. Ünite to Bottom navigation bar
const oldBottomNav = `<button class="b-nav-item active" onclick="switchMainTab('unit5')" id="bnav_unit5">
      <span class="b-icon">🏡</span>
      <span>5. Ünite</span>
    </button>`;
const newBottomNav = `<button class="b-nav-item active" onclick="switchMainTab('unit6')" id="bnav_unit6">
      <span class="b-icon">🌆</span>
      <span>6. Ünite</span>
    </button>
    <button class="b-nav-item" onclick="switchMainTab('unit5')" id="bnav_unit5">
      <span class="b-icon">🏡</span>
      <span>5. Ünite</span>
    </button>`;
html = html.replace(oldBottomNav, newBottomNav);

// 5. Update State & Initial Variable in script
html = html.replace(
  "let currentMainTab = 'unit5';",
  "let currentMainTab = 'unit6';\n    let currentUnit6Page = 49;"
);

// 6. Update switchMainTab to include 'unit6'
const oldSwitchTab = `if (tabId === 'unit5') {
        document.getElementById('subHeaderTitle').textContent = \`5. Ünite: Homes & Houses (Sayfa \${currentUnit5Page})\`;
        renderUnit5();`;

const newSwitchTab = `if (tabId === 'unit6') {
        document.getElementById('subHeaderTitle').textContent = \`6. Ünite: Life in the City & The World (Sayfa \${currentUnit6Page})\`;
        renderUnit6();
      } else if (tabId === 'unit5') {
        document.getElementById('subHeaderTitle').textContent = \`5. Ünite: Homes & Houses (Sayfa \${currentUnit5Page})\`;
        renderUnit5();`;

html = html.replace(oldSwitchTab, newSwitchTab);

// 7. Add Unit 6 Implementation and renderUnit6 function before renderUnit5
const unit6Code = `
    /* ========================================================
       THEME 6: LIFE IN THE CITY & THE WORLD (Sayfa 49 - 56)
    ======================================================== */
    let p50Answers = { 1: 'a pear', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '', 10: '' };
    let p50Checked = false;
    const p50Correct = {
      1: 'a pear',
      2: 'fish',
      3: 'milk',
      4: 'tea',
      5: 'cauliflower',
      6: 'grapes',
      7: 'broccoli',
      8: 'cherries',
      9: 'banana',
      10: 'lettuce'
    };

    let p51OddAnswers = { 1: 'courgette', 2: null, 3: null, 4: null, 5: null };
    const p51OddCorrect = {
      1: 'courgette',
      2: 'meat',
      3: 'strawberry',
      4: 'pear',
      5: 'coffee'
    };

    let p51OrderWords = { b: '', c: '', d: '', e: '', f: '' };
    const p51OrderCorrect = {
      b: 'apple',
      c: 'carrot',
      d: 'grapes',
      e: 'cherries',
      f: 'orange'
    };

    let p52Checked = { 1: 1, 2: null, 3: null, 4: null, 5: null, 6: null };
    const p52Correct = { 1: 1, 2: 2, 3: 2, 4: 1, 5: 1, 6: 2 };

    let p53Q5 = { 1: 'no', 2: null, 3: null, 4: null, 5: null };
    const p53Q5Correct = {
      1: 'no',
      2: 'yes',
      3: 'no',
      4: 'yes',
      5: 'yes'
    };

    let p53Q6 = { 1: 'yes', 2: null, 3: null, 4: null };
    const p53Q6Correct = {
      1: 'yes',
      2: 'no',
      3: 'no',
      4: 'yes'
    };

    let p54Matches = { 1: 'a', 2: null, 3: null, 4: null };
    const p54Correct = { 1: 'a', 2: 'c', 3: 'd', 4: 'b' };

    let p55Answers = { 1: 'enjoy', 2: '', 3: '', 4: '', 5: '' };
    const p55Correct = {
      1: 'enjoy',
      2: 'hungry',
      3: 'delicious',
      4: 'thirsty',
      5: 'breakfast'
    };

    let p56About = {
      name: '',
      favFood: 'pizza',
      favDrink: 'milk',
      likeFood: 'apples',
      dislikeFood: 'broccoli',
      breakfast: 'eggs',
      lunch: 'chicken',
      dinner: 'fish'
    };
    let p56FavFruit = 'apple';
    let p56LikeTea = 'yes';
    let p56Stars = 5;

    function selectUnit6Page(page) {
      recordActivity();
      currentUnit6Page = page;
      document.getElementById('subHeaderTitle').textContent = \`6. Ünite: Life in the City & The World (Sayfa \${currentUnit6Page})\`;
      renderUnit6();
    }

    function resetUnit6Page(page) {
      recordActivity();
      if (page === 50) {
        p50Answers = { 1: 'a pear', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '', 10: '' };
        p50Checked = false;
      } else if (page === 51) {
        p51OddAnswers = { 1: 'courgette', 2: null, 3: null, 4: null, 5: null };
        p51OrderWords = { b: '', c: '', d: '', e: '', f: '' };
      } else if (page === 52) {
        p52Checked = { 1: 1, 2: null, 3: null, 4: null, 5: null, 6: null };
      } else if (page === 53) {
        p53Q5 = { 1: 'no', 2: null, 3: null, 4: null, 5: null };
        p53Q6 = { 1: 'yes', 2: null, 3: null, 4: null };
      } else if (page === 54) {
        p54Matches = { 1: 'a', 2: null, 3: null, 4: null };
      } else if (page === 55) {
        p55Answers = { 1: 'enjoy', 2: '', 3: '', 4: '', 5: '' };
      } else if (page === 56) {
        p56About = { name: '', favFood: 'pizza', favDrink: 'milk', likeFood: 'apples', dislikeFood: 'broccoli', breakfast: 'eggs', lunch: 'chicken', dinner: 'fish' };
        p56FavFruit = 'apple';
        p56LikeTea = 'yes';
        p56Stars = 5;
      }
      renderUnit6();
      speakText('Sayfa sıfırlandı. Tekrar deneyebilirsin!');
    }

    function renderUnit6() {
      const p = currentUnit6Page;
      const navChips = [49, 50, 51, 52, 53, 54, 55, 56].map(num => \`
        <button class="page-chip \${p === num ? 'active' : ''}" onclick="selectUnit6Page(\${num})">
          Sayfa \${num}
        </button>
      \`).join('');

      let pageContentHtml = '';

      if (p === 49) {
        // SAYFA 49: KAPAK & TEMA GİRİŞİ
        pageContentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">🏙️ Theme 6: LIFE IN THE CITY & THE WORLD</div>
              <button class="reset-btn" onclick="renderUnit6()">🔄 Sayfayı Yenile</button>
            </div>
            <p style="font-size:13px;color:var(--muted);margin-bottom:12px;">
              Şehirde yaşam, yiyecekler, içecekler, okul kantini ve sağlıklı beslenme!
            </p>
            <div style="background:#1e293b;border-radius:14px;padding:16px;text-align:center;border:1px solid var(--border);margin-bottom:16px;">
              <div style="font-size:42px;margin-bottom:8px;">🏫 🥪 🥤 🍎</div>
              <h2 style="color:var(--accent);font-size:20px;margin-bottom:6px;">Life in the City & The World</h2>
              <p style="font-size:13px;color:#94a3b8;">Okul kantininde ve şehir hayatında yiyecek siparişi verme, sevdiklerimizi söyleme ve nezaket kalıpları.</p>
              <button class="action-btn" onclick="speakText('Theme 6: Life in the city and the world')" style="margin-top:10px;">
                🔊 Başlığı Dinle
              </button>
            </div>

            <h3 style="font-size:15px;color:#38bdf8;margin:16px 0 8px 0;">🎙️ Ünitenin Temel Yiyecek ve İçecek Kelimeleri (Tıkla ve Dinle)</h3>
            <div class="word-grid">
              \${[
                { en: 'pear', tr: 'armut', icon: '🍐' },
                { en: 'fish', tr: 'balık', icon: '🐟' },
                { en: 'milk', tr: 'süt', icon: '🥛' },
                { en: 'tea', tr: 'çay', icon: '🍵' },
                { en: 'cauliflower', tr: 'karnabahar', icon: '🥦' },
                { en: 'grapes', tr: 'üzüm', icon: '🍇' },
                { en: 'broccoli', tr: 'brokoli', icon: '🥦' },
                { en: 'cherries', tr: 'kiraz', icon: '🍒' },
                { en: 'banana', tr: 'muz', icon: '🍌' },
                { en: 'lettuce', tr: 'marul', icon: '🥬' },
                { en: 'water', tr: 'su', icon: '💧' },
                { en: 'ayran', tr: 'ayran', icon: '🥛' },
                { en: 'courgette', tr: 'kabak', icon: '🥒' },
                { en: 'meat', tr: 'et', icon: '🥩' },
                { en: 'strawberry', tr: 'çilek', icon: '🍓' },
                { en: 'chicken', tr: 'tavuk', icon: '🍗' },
                { en: 'potato', tr: 'patates', icon: '🥔' },
                { en: 'coffee', tr: 'kahve', icon: '☕' },
                { en: 'carrot', tr: 'havuç', icon: '🥕' },
                { en: 'orange', tr: 'portakal', icon: '🍊' },
                { en: 'apple', tr: 'elma', icon: '🍎' },
                { en: 'tomato', tr: 'domates', icon: '🍅' },
                { en: 'bread', tr: 'ekmek', icon: '🍞' },
                { en: 'breakfast', tr: 'kahvaltı', icon: '🍳' },
                { en: 'lunch', tr: 'öğle yemeği', icon: '🥪' },
                { en: 'dinner', tr: 'akşam yemeği', icon: '🍲' },
                { en: 'hungry', tr: 'aç (karnı aç)', icon: '😋' },
                { en: 'thirsty', tr: 'susamış', icon: '🥤' },
                { en: 'delicious', tr: 'lezzetli / nefis', icon: '✨' },
                { en: 'enjoy your meal', tr: 'Afiyet olsun!', icon: '🍽️' }
              ].map(w => \`
                <div class="word-tile" onclick="speakText('\${w.en}')">
                  <span class="speaker-icon">🔊</span>
                  <div class="tile-icon">\${w.icon}</div>
                  <div class="en-text">\${w.en}</div>
                  <div class="tr-text">\${w.tr}</div>
                </div>
              \`).join('')}
            </div>

            <div style="text-align:center;margin-top:20px;">
              <button class="action-btn" onclick="selectUnit6Page(50)" style="background:var(--accent);color:#0f172a;font-weight:800;padding:12px 24px;">
                50. Sayfaya Geç ➡️
              </button>
            </div>
          </div>
        \`;
      } else if (p === 50) {
        // SAYFA 50: 1. LOOK AND WRITE
        const foodList = [
          { num: 1, label: '1 (Örnek)', val: 'a pear', tr: 'armut', icon: '🍐' },
          { num: 2, label: '2', val: 'fish', tr: 'balık', icon: '🐟' },
          { num: 3, label: '3', val: 'milk', tr: 'süt', icon: '🥛' },
          { num: 4, label: '4', val: 'tea', tr: 'çay', icon: '🍵' },
          { num: 5, label: '5', val: 'cauliflower', tr: 'karnabahar', icon: '🥦' },
          { num: 6, label: '6', val: 'grapes', tr: 'üzüm', icon: '🍇' },
          { num: 7, label: '7', val: 'broccoli', tr: 'brokoli', icon: '🥦' },
          { num: 8, label: '8', val: 'cherries', tr: 'kiraz', icon: '🍒' },
          { num: 9, label: '9', val: 'banana', tr: 'muz', icon: '🍌' },
          { num: 10, label: '10', val: 'lettuce', tr: 'marul', icon: '🥬' }
        ];

        pageContentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">📖 Sayfa 50: 1. Look and write.</div>
              <button class="reset-btn" onclick="resetUnit6Page(50)">🔄 Dersi Sıfırla</button>
            </div>
            <p style="font-size:13px;color:var(--muted);margin-bottom:12px;">
              Piknik masasındaki yiyecek ve içeceklerin numaralarına bakarak isimlerini seçin veya yazın.
            </p>

            <div style="background:#1e293b;border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:14px;text-align:center;">
              <div style="font-size:32px;margin-bottom:6px;">🧺 🥪 🍇 🥛 🐟 🥦 🍒 🍌 🥬 🍵</div>
              <div style="font-size:12px;color:#94a3b8;">
                <strong>Masa Üstü Numaraları:</strong> 1: Armut (a pear) | 2: Balık (fish) | 3: Süt (milk) | 4: Çay (tea) | 5: Karnabahar (cauliflower) | 6: Üzüm (grapes) | 7: Brokoli (broccoli) | 8: Kiraz (cherries) | 9: Muz (banana) | 10: Marul (lettuce)
              </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:12px;">
              \${foodList.map(item => {
                const userVal = (p50Answers[item.num] || '').trim().toLowerCase();
                const isCorrect = userVal === item.val.toLowerCase() || (item.num === 9 && (userVal === 'a banana' || userVal === 'banana'));
                const showStatus = p50Checked;
                return \`
                  <div style="background:#0f172a;border:1px solid \${showStatus ? (isCorrect ? 'var(--success)' : 'var(--danger)') : 'var(--border)'};border-radius:10px;padding:10px;display:flex;align-items:center;gap:10px;">
                    <div style="background:var(--primary);color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;">
                      \${item.num}
                    </div>
                    <div style="flex:1;">
                      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                        <span style="font-size:12px;color:var(--muted);">\${item.icon} İpucu: \${item.tr}</span>
                        <button onclick="speakText('\${item.val}')" style="background:none;border:none;cursor:pointer;font-size:14px;">🔊</button>
                      </div>
                      \${item.num === 1 ? \`
                        <input type="text" value="a pear" disabled style="width:100%;padding:6px 10px;background:#334155;color:#94a3b8;border:1px solid var(--border);border-radius:6px;font-weight:bold;" />
                      \` : \`
                        <select onchange="p50Answers[\${item.num}] = this.value; p50Checked = false; renderUnit6();" style="width:100%;padding:6px 8px;background:#1e293b;color:#fff;border:1px solid var(--border);border-radius:6px;font-size:13px;">
                          <option value="">Seçiniz...</option>
                          \${['fish', 'milk', 'tea', 'cauliflower', 'grapes', 'broccoli', 'cherries', 'banana', 'lettuce'].map(opt => \`
                            <option value="\${opt}" \${p50Answers[item.num] === opt ? 'selected' : ''}>\${opt}</option>
                          \`).join('')}
                        </select>
                      \`}
                    </div>
                  </div>
                \`;
              }).join('')}
            </div>

            <div style="margin-top:16px;text-align:center;display:flex;gap:10px;justify-content:center;">
              <button class="action-btn" onclick="checkP50()" style="padding:10px 20px;">
                ✅ Cevaplarımı Kontrol Et
              </button>
              <button class="action-btn retry" onclick="resetUnit6Page(50)" style="padding:10px 20px;">
                🔄 Yeniden Başlat
              </button>
            </div>
            <div id="p50Feedback" style="margin-top:12px;text-align:center;font-weight:bold;"></div>
          </div>
        \`;
      } else if (p === 51) {
        // SAYFA 51: 2. CIRCLE THE ODD ONE & 3. ORDER, WRITE AND DRAW
        const oddTasks = [
          {
            id: 1,
            words: [
              { w: 'water', tr: 'su (içecek)' },
              { w: 'ayran', tr: 'ayran (içecek)' },
              { w: 'courgette', tr: 'kabak (sebze)' }
            ],
            correct: 'courgette',
            reason: 'Kabak sebzedir, diğer ikisi içecektir.'
          },
          {
            id: 2,
            words: [
              { w: 'orange', tr: 'portakal (meyve)' },
              { w: 'meat', tr: 'et (yiyecek)' },
              { w: 'banana', tr: 'muz (meyve)' }
            ],
            correct: 'meat',
            reason: 'Et bir et ürünüdür, diğer ikisi meyvedir.'
          },
          {
            id: 3,
            words: [
              { w: 'strawberry', tr: 'çilek (meyve)' },
              { w: 'chicken', tr: 'tavuk (et)' },
              { w: 'meat', tr: 'et' }
            ],
            correct: 'strawberry',
            reason: 'Çilek meyvedir, diğerleri ettir.'
          },
          {
            id: 4,
            words: [
              { w: 'pepper', tr: 'biber (sebze)' },
              { w: 'pear', tr: 'armut (meyve)' },
              { w: 'potato', tr: 'patates (sebze)' }
            ],
            correct: 'pear',
            reason: 'Armut meyvedir, diğer ikisi sebzedir.'
          },
          {
            id: 5,
            words: [
              { w: 'garlic', tr: 'sarımsak (sebze)' },
              { w: 'cauliflower', tr: 'karnabahar (sebze)' },
              { w: 'coffee', tr: 'kahve (içecek)' }
            ],
            correct: 'coffee',
            reason: 'Kahve içecektir, diğer ikisi sebzedir.'
          }
        ];

        const anagrams = [
          { key: 'a', scrambled: 'a n n a s b a', word: 'bananas', tr: 'muzlar', done: true },
          { key: 'b', scrambled: 'a l p p e', word: 'apple', tr: 'elma' },
          { key: 'c', scrambled: 'a c r t r o', word: 'carrot', tr: 'havuç' },
          { key: 'd', scrambled: 'p g s e a r', word: 'grapes', tr: 'üzüm' },
          { key: 'e', scrambled: 'e c e r i r h s', word: 'cherries', tr: 'kiraz' },
          { key: 'f', scrambled: 'a n e o g r', word: 'orange', tr: 'portakal' }
        ];

        pageContentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">📖 Sayfa 51: 2. Circle the odd one & 3. Order and write</div>
              <button class="reset-btn" onclick="resetUnit6Page(51)">🔄 Dersi Sıfırla</button>
            </div>

            <h3 style="font-size:15px;color:var(--accent);margin:10px 0 6px 0;">2. Circle the odd one. (Farklı olanı bul ve tıkla)</h3>
            <p style="font-size:13px;color:var(--muted);margin-bottom:12px;">Gruba uymayan kelimeyi tıklayın. Doğruyu bulana kadar deneyebilirsiniz!</p>

            <div style="display:flex;flex-direction:column;gap:10px;">
              \${oddTasks.map(task => \`
                <div style="background:#0f172a;border:1px solid var(--border);border-radius:12px;padding:12px;">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                    <span style="background:var(--primary);color:#fff;font-weight:bold;width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">\${task.id}</span>
                    <span style="font-size:12px;color:var(--muted);">Farklı olan hangisi?</span>
                  </div>
                  <div style="display:flex;gap:10px;flex-wrap:wrap;">
                    \${task.words.map(wObj => {
                      const isSelected = p51OddAnswers[task.id] === wObj.w;
                      const isCorrect = task.correct === wObj.w;
                      let btnStyle = 'background:#1e293b;border:2px solid var(--border);color:#fff;';
                      if (isSelected) {
                        btnStyle = isCorrect
                          ? 'background:rgba(16,185,129,0.25);border:2px solid var(--success);color:#34d399;'
                          : 'background:rgba(239,68,68,0.25);border:2px solid var(--danger);color:#f87171;';
                      }
                      return \`
                        <button onclick="pickOdd(\${task.id}, '\${wObj.w}')" style="flex:1;min-width:100px;padding:10px;border-radius:10px;font-weight:700;cursor:pointer;\${btnStyle}">
                          \${wObj.w}
                          <div style="font-size:10px;font-weight:normal;opacity:0.8;">\${wObj.tr}</div>
                        </button>
                      \`;
                    }).join('')}
                  </div>
                  \${p51OddAnswers[task.id] === task.correct ? \`
                    <div style="margin-top:6px;font-size:12px;color:var(--success);font-weight:bold;">
                      ✅ Doğru! (\${task.reason})
                    </div>
                  \` : (p51OddAnswers[task.id] ? \`
                    <div style="margin-top:6px;font-size:12px;color:var(--danger);font-weight:bold;">
                      ❌ Tekrar dene! İpucu: Anlamlarına ve kategorilerine dikkat et.
                    </div>
                  \` : '')}
                </div>
              \`).join('')}
            </div>

            <hr style="border:none;border-top:1px solid var(--border);margin:24px 0;" />

            <h3 style="font-size:15px;color:var(--accent);margin:10px 0 6px 0;">3. Order, write, and draw. (Harfleri Sıraya Diz)</h3>
            <p style="font-size:13px;color:var(--muted);margin-bottom:12px;">Karışık verilmiş harflerden doğru yiyecek/meyve kelimesini yazın.</p>

            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:12px;">
              \${anagrams.map(ana => {
                const userVal = (p51OrderWords[ana.key] || '').trim().toLowerCase();
                const isRight = userVal === ana.word;
                return \`
                  <div style="background:#0f172a;border:1px solid \${ana.done || isRight ? 'var(--success)' : 'var(--border)'};border-radius:12px;padding:12px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                      <span style="font-weight:bold;color:var(--accent);">[\${ana.key}] \${ana.scrambled}</span>
                      <button onclick="speakText('\${ana.word}')" style="background:none;border:none;cursor:pointer;font-size:14px;">🔊 Dinle</button>
                    </div>
                    <div style="font-size:11px;color:var(--muted);margin-bottom:6px;">Türkçesi: \${ana.tr}</div>
                    \${ana.done ? \`
                      <input type="text" value="bananas" disabled style="width:100%;padding:8px;background:#334155;border:1px solid var(--border);border-radius:8px;color:#34d399;font-weight:bold;" />
                    \` : \`
                      <div style="display:flex;gap:6px;">
                        <input type="text" placeholder="Kelimeyi yaz..." value="\${p51OrderWords[ana.key] || ''}" oninput="p51OrderWords['\${ana.key}'] = this.value; checkP51Order('\${ana.key}');" style="flex:1;padding:8px;background:#1e293b;border:1px solid var(--border);border-radius:8px;color:#fff;font-weight:bold;" />
                      </div>
                    \`}
                    <div id="p51_status_\${ana.key}" style="margin-top:4px;font-size:11px;font-weight:bold;\${isRight ? 'color:var(--success);' : 'color:var(--muted);'}">
                      \${ana.done || isRight ? '✅ Harika! (' + ana.word + ')' : ''}
                    </div>
                  </div>
                \`;
              }).join('')}
            </div>

            <div style="margin-top:16px;text-align:center;">
              <button class="action-btn retry" onclick="resetUnit6Page(51)">
                🔄 Sayfayı Sıfırla ve Yeniden Dene
              </button>
            </div>
          </div>
        \`;
      } else if (p === 52) {
        // SAYFA 52: 4. LOOK, READ, AND TICK
        const tickExercises = [
          {
            id: 1,
            icon: '🍌 🎒',
            opt1: 'There is a banana in my bag.',
            opt2: 'There are some bananas in my bag.',
            correct: 1,
            note: 'Çantada 1 adet tekil muz var (There is a banana).'
          },
          {
            id: 2,
            icon: '🧺 🍎🍎🍎',
            opt1: 'There is an apple in the basket.',
            opt2: 'There are some apples in the basket.',
            correct: 2,
            note: 'Sepette birden fazla çoğul elma var (There are some apples).'
          },
          {
            id: 3,
            icon: '🪑 🍊🍊',
            opt1: 'There is an orange on the table.',
            opt2: 'There are some oranges on the table.',
            correct: 2,
            note: 'Masada birden fazla portakal var (There are some oranges).'
          },
          {
            id: 4,
            icon: '✋ 🍐',
            opt1: 'There is a pear in my hand.',
            opt2: 'There are some pears in my hand.',
            correct: 1,
            note: 'Elde 1 adet tekil armut var (There is a pear).'
          },
          {
            id: 5,
            icon: '🍱 🍅',
            opt1: 'There is a tomato in the lunch box.',
            opt2: 'There are some tomatoes in the lunch box.',
            correct: 1,
            note: 'Beslenme kutusunda 1 adet domates var (There is a tomato).'
          },
          {
            id: 6,
            icon: '🍽️ 🥕🥕🥕',
            opt1: 'There is a carrot on the plate.',
            opt2: 'There are some carrots on the plate.',
            correct: 2,
            note: 'Tabakta birden fazla havuç var (There are some carrots).'
          }
        ];

        pageContentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">📖 Sayfa 52: 4. Look, read, and tick [✓]</div>
              <button class="reset-btn" onclick="resetUnit6Page(52)">🔄 Dersi Sıfırla</button>
            </div>
            <p style="font-size:13px;color:var(--muted);margin-bottom:12px;">
              Görsellere bakın ve doğru cümleyi seçin. (Tekil için: <em>There is a...</em> | Çoğul için: <em>There are some...</em>)
            </p>

            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:14px;">
              \${tickExercises.map(ex => {
                const selected = p52Checked[ex.id];
                return \`
                  <div style="background:#0f172a;border:1px solid var(--border);border-radius:12px;padding:14px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                      <span style="background:var(--primary);color:#fff;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:12px;">\${ex.id}</span>
                      <span style="font-size:24px;">\${ex.icon}</span>
                    </div>

                    <div style="display:flex;flex-direction:column;gap:8px;">
                      <label onclick="checkP52(\${ex.id}, 1)" style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:#1e293b;border-radius:8px;cursor:pointer;\${selected === 1 ? (ex.correct === 1 ? 'border:1px solid var(--success);color:#34d399;' : 'border:1px solid var(--danger);color:#f87171;') : 'border:1px solid transparent;'}">
                        <input type="radio" name="p52_q_\${ex.id}" \${selected === 1 ? 'checked' : ''} />
                        <span style="font-size:13px;font-weight:600;">\${ex.opt1}</span>
                      </label>

                      <label onclick="checkP52(\${ex.id}, 2)" style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:#1e293b;border-radius:8px;cursor:pointer;\${selected === 2 ? (ex.correct === 2 ? 'border:1px solid var(--success);color:#34d399;' : 'border:1px solid var(--danger);color:#f87171;') : 'border:1px solid transparent;'}">
                        <input type="radio" name="p52_q_\${ex.id}" \${selected === 2 ? 'checked' : ''} />
                        <span style="font-size:13px;font-weight:600;">\${ex.opt2}</span>
                      </label>
                    </div>

                    \${selected ? \`
                      <div style="margin-top:8px;font-size:11px;font-weight:bold;\${selected === ex.correct ? 'color:var(--success);' : 'color:var(--danger);'}">
                        \${selected === ex.correct ? '✅ Doğru! ' + ex.note : '❌ Yanlış, tekrar dene! İpucu: Tekil mi çoğul mu?'}
                      </div>
                    \` : ''}
                  </div>
                \`;
              }).join('')}
            </div>

            <div style="margin-top:16px;text-align:center;">
              <button class="action-btn retry" onclick="resetUnit6Page(52)">
                🔄 Sayfayı Sıfırla ve Yeniden Dene
              </button>
            </div>
          </div>
        \`;
      } else if (p === 53) {
        // SAYFA 53: 5. LOOK AND CIRCLE & 6. ASK AND ANSWER (CAN I HAVE...?)
        const q5Questions = [
          { id: 1, text: '1. Is there any water?', correct: 'no', note: 'Kutuda su yok -> No, there isn\'t.' },
          { id: 2, text: '2. Are there any bananas?', correct: 'yes', note: 'Muzlar var -> Yes, there are.' },
          { id: 3, text: '3. Is there an orange?', correct: 'no', note: 'Portakal yok -> No, there isn\'t.' },
          { id: 4, text: '4. Are there any cherries?', correct: 'yes', note: 'Kirazlar var -> Yes, there are.' },
          { id: 5, text: '5. Is there a carrot?', correct: 'yes', note: 'Havuç var -> Yes, there is.' }
        ];

        const q6Prompts = [
          { id: 1, icon: '🥐 / 🍞 (✓)', question: 'Can I have some bread?', answer: 'Yes, you can.', correct: 'yes' },
          { id: 2, icon: '🥔 (✗)', question: 'Can I have some potatoes?', answer: 'No, you cannot.', correct: 'no' },
          { id: 3, icon: '🍎 (✗)', question: 'Can I have an apple?', answer: 'No, you cannot.', correct: 'no' },
          { id: 4, icon: '🍇 (✓)', question: 'Can I have some grapes?', answer: 'Yes, you can.', correct: 'yes' }
        ];

        pageContentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">📖 Sayfa 53: 5. Look and circle & 6. Ask and answer</div>
              <button class="reset-btn" onclick="resetUnit6Page(53)">🔄 Dersi Sıfırla</button>
            </div>

            <div style="background:#1e293b;border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:16px;">
              <h3 style="font-size:15px;color:var(--accent);margin-bottom:6px;">5. Look and circle the answer. (Beslenme Kutusu)</h3>
              <p style="font-size:13px;color:var(--muted);margin-bottom:10px;">Kutudaki yiyeceklere göre sorulara <em>Yes</em> veya <em>No</em> cevabı verin.</p>
              
              <div style="display:flex;flex-direction:column;gap:10px;">
                \${q5Questions.map(q => \`
                  <div style="background:#0f172a;border-radius:10px;padding:10px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="font-weight:600;font-size:14px;color:#fff;">
                      \${q.text}
                      <button onclick="speakText('\${q.text}')" style="background:none;border:none;cursor:pointer;">🔊</button>
                    </div>
                    <div style="display:flex;gap:8px;">
                      <button onclick="pickQ5(\${q.id}, 'yes')" style="padding:6px 14px;border-radius:8px;font-weight:bold;cursor:pointer;\${p53Q5[q.id] === 'yes' ? (q.correct === 'yes' ? 'background:var(--success);color:#fff;' : 'background:var(--danger);color:#fff;') : 'background:#334155;color:#fff;border:none;'}">
                        Yes
                      </button>
                      <button onclick="pickQ5(\${q.id}, 'no')" style="padding:6px 14px;border-radius:8px;font-weight:bold;cursor:pointer;\${p53Q5[q.id] === 'no' ? (q.correct === 'no' ? 'background:var(--success);color:#fff;' : 'background:var(--danger);color:#fff;') : 'background:#334155;color:#fff;border:none;'}">
                        No
                      </button>
                    </div>
                  </div>
                \`).join('')}
              </div>
            </div>

            <div style="background:#1e293b;border:1px solid var(--border);border-radius:12px;padding:12px;">
              <h3 style="font-size:15px;color:var(--accent);margin-bottom:6px;">6. Ask and answer: "Can I have...?" (İsteme & Nezaket)</h3>
              <p style="font-size:13px;color:var(--muted);margin-bottom:10px;">İşarete (✓ / ✗) bakarak doğru cevabı verin.</p>

              <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:10px;">
                \${q6Prompts.map(prm => \`
                  <div style="background:#0f172a;border-radius:10px;padding:12px;border:1px solid var(--border);">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                      <span style="font-weight:bold;color:var(--primary);">\${prm.id}. Soru</span>
                      <span style="font-size:18px;">\${prm.icon}</span>
                    </div>
                    <div style="font-size:13px;color:#38bdf8;margin-bottom:8px;font-weight:600;">
                      - \${prm.question}
                      <button onclick="speakText('\${prm.question}')" style="background:none;border:none;cursor:pointer;">🔊</button>
                    </div>
                    <div style="display:flex;gap:6px;">
                      <button onclick="pickQ6(\${prm.id}, 'yes')" style="flex:1;padding:8px;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;\${p53Q6[prm.id] === 'yes' ? (prm.correct === 'yes' ? 'background:var(--success);color:#fff;' : 'background:var(--danger);color:#fff;') : 'background:#334155;color:#fff;border:none;'}">
                        Yes, you can.
                      </button>
                      <button onclick="pickQ6(\${prm.id}, 'no')" style="flex:1;padding:8px;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;\${p53Q6[prm.id] === 'no' ? (prm.correct === 'no' ? 'background:var(--success);color:#fff;' : 'background:var(--danger);color:#fff;') : 'background:#334155;color:#fff;border:none;'}">
                        No, you can't.
                      </button>
                    </div>
                  </div>
                \`).join('')}
              </div>
            </div>

            <div style="margin-top:16px;text-align:center;">
              <button class="action-btn retry" onclick="resetUnit6Page(53)">
                🔄 Sayfayı Sıfırla ve Yeniden Başlat
              </button>
            </div>
          </div>
        \`;
      } else if (p === 54) {
        // SAYFA 54: 7. READ AND MATCH
        const children = [
          {
            id: 1,
            name: 'Ece',
            text: 'I like potatoes and meat. I don\\'t like apples or milk.',
            tray: 'a',
            trayDesc: 'Tepsi A (Patates, Et, Kahve, Muz)'
          },
          {
            id: 2,
            name: 'Kaan',
            text: 'I like chicken and carrots. I don\\'t like bananas or coffee.',
            tray: 'c',
            trayDesc: 'Tepsi C (Tavuk, Havuç, Elma, Süt)'
          },
          {
            id: 3,
            name: 'Sarp',
            text: 'I like chicken and potatoes. I don\\'t like coffee or apples.',
            tray: 'd',
            trayDesc: 'Tepsi D (Tavuk, Patates, Muz, Süt)'
          },
          {
            id: 4,
            name: 'Elif',
            text: 'I like meat and carrots. I don\\'t like bananas or milk.',
            tray: 'b',
            trayDesc: 'Tepsi B (Et, Havuç, Elma, Kahve)'
          }
        ];

        pageContentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">📖 Sayfa 54: 7. Read and match.</div>
              <button class="reset-btn" onclick="resetUnit6Page(54)">🔄 Dersi Sıfırla</button>
            </div>
            <p style="font-size:13px;color:var(--muted);margin-bottom:14px;">
              Çocukların sevdikleri ve sevmedikleri yiyecekleri okuyun ve doğru tepsiyle eşleştirin.
            </p>

            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:12px;margin-bottom:16px;">
              \${children.map(ch => {
                const isSelected = p54Matches[ch.id];
                const isRight = isSelected === ch.tray;
                return \`
                  <div style="background:#0f172a;border:1px solid \${isSelected ? (isRight ? 'var(--success)' : 'var(--danger)') : 'var(--border)'};border-radius:12px;padding:12px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                      <h4 style="color:var(--accent);font-size:15px;margin:0;">👤 \${ch.name}</h4>
                      <button onclick="speakText('\${ch.text}')" style="background:none;border:none;cursor:pointer;font-size:14px;">🔊 Dinle</button>
                    </div>
                    <p style="font-size:13px;color:#e2e8f0;background:#1e293b;padding:8px;border-radius:8px;margin-bottom:10px;">
                      "\${ch.text}"
                    </p>
                    <div style="font-size:12px;color:var(--muted);margin-bottom:4px;">Doğru Yemek Tepsisini Seç:</div>
                    <select onchange="p54Matches[\${ch.id}] = this.value; renderUnit6();" style="width:100%;padding:8px;background:#1e293b;color:#fff;border:1px solid var(--border);border-radius:8px;font-size:13px;">
                      <option value="">Tepsi Seçiniz...</option>
                      <option value="a" \${isSelected === 'a' ? 'selected' : ''}>Tepsi A (Patates, Et, Kahve, Muz)</option>
                      <option value="b" \${isSelected === 'b' ? 'selected' : ''}>Tepsi B (Et, Havuç, Elma, Kahve)</option>
                      <option value="c" \${isSelected === 'c' ? 'selected' : ''}>Tepsi C (Tavuk, Havuç, Elma, Süt)</option>
                      <option value="d" \${isSelected === 'd' ? 'selected' : ''}>Tepsi D (Tavuk, Patates, Muz, Süt)</option>
                    </select>
                    \${isSelected ? \`
                      <div style="margin-top:6px;font-size:11px;font-weight:bold;\${isRight ? 'color:var(--success);' : 'color:var(--danger);'}">
                        \${isRight ? '✅ Harika eşleşti! (' + ch.trayDesc + ')' : '❌ Yanlış tepsi, malzemeleri tekrar kontrol et!'}
                      </div>
                    \` : ''}
                  </div>
                \`;
              }).join('')}
            </div>

            <div style="margin-top:16px;text-align:center;">
              <button class="action-btn retry" onclick="resetUnit6Page(54)">
                🔄 Sayfayı Sıfırla ve Yeniden Dene
              </button>
            </div>
          </div>
        \`;
      } else if (p === 55) {
        // SAYFA 55: 8. READ, CHOOSE, AND WRITE
        const dialogues = [
          { id: 1, prompt: '- Enjoy your meal! - Thanks, mum.', word: 'enjoy', desc: 'Anne çocuğuna yemek verirken: Afiyet olsun!' },
          { id: 2, prompt: '- I\\'m hungry. - Here is your chicken.', word: 'hungry', desc: 'Karnı acıkmış çocuk: Açım!' },
          { id: 3, prompt: '- Here is your fish. - Yummy! It\\'s delicious.', word: 'delicious', desc: 'Balığı beğenen kız: Nefis / Lezzetli!' },
          { id: 4, prompt: '- I\\'m thirsty. - Here is some water.', word: 'thirsty', desc: 'Terlemiş çocuk: Susadım!' },
          { id: 5, prompt: '- Time for breakfast! - Yummy! I like eggs.', word: 'breakfast', desc: 'Yumurta pişiren baba: Kahvaltı zamanı!' }
        ];

        pageContentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">📖 Sayfa 55: 8. Read, choose, and write.</div>
              <button class="reset-btn" onclick="resetUnit6Page(55)">🔄 Dersi Sıfırla</button>
            </div>
            <p style="font-size:13px;color:var(--muted);margin-bottom:12px;">
              Kelimelerden uygun olanı seçerek konuşma diyaloglarını tamamlayın.
            </p>

            <div style="background:#1e293b;border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:14px;text-align:center;">
              <div style="font-size:12px;color:var(--muted);margin-bottom:6px;">Kelime Havuzu (Kelimelere tıklayarak telaffuzunu dinleyebilirsiniz):</div>
              <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
                \${['breakfast', 'enjoy', 'hungry', 'delicious', 'thirsty'].map(w => \`
                  <button class="word-chip pool" onclick="speakText('\${w}')">
                    🔊 \${w}
                  </button>
                \`).join('')}
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:12px;">
              \${dialogues.map(d => {
                const userVal = p55Answers[d.id];
                const isRight = userVal === d.word;
                return \`
                  <div style="background:#0f172a;border:1px solid \${userVal ? (isRight ? 'var(--success)' : 'var(--danger)') : 'var(--border)'};border-radius:12px;padding:14px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                      <span style="font-weight:bold;color:var(--primary);">Diyalog \${d.id}</span>
                      <button onclick="speakText('\${d.prompt}')" style="background:none;border:none;cursor:pointer;font-size:13px;color:var(--muted);">🔊 Diyaloğu Dinle</button>
                    </div>
                    <div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">\${d.desc}</div>

                    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
                      <select onchange="p55Answers[\${d.id}] = this.value; renderUnit6();" style="padding:8px 12px;background:#1e293b;color:#fff;border:1px solid var(--border);border-radius:8px;font-size:14px;font-weight:bold;">
                        <option value="">Kelimeyi seç...</option>
                        <option value="breakfast" \${userVal === 'breakfast' ? 'selected' : ''}>breakfast (kahvaltı)</option>
                        <option value="enjoy" \${userVal === 'enjoy' ? 'selected' : ''}>enjoy (afiyet olsun)</option>
                        <option value="hungry" \${userVal === 'hungry' ? 'selected' : ''}>hungry (aç)</option>
                        <option value="delicious" \${userVal === 'delicious' ? 'selected' : ''}>delicious (lezzetli)</option>
                        <option value="thirsty" \${userVal === 'thirsty' ? 'selected' : ''}>thirsty (susamış)</option>
                      </select>
                      \${userVal ? \`
                        <span style="font-size:12px;font-weight:bold;\${isRight ? 'color:var(--success);' : 'color:var(--danger);'}">
                          \${isRight ? '✅ Harika!' : '❌ Tekrar dene! İpucu: ' + d.desc}
                        </span>
                      \` : ''}
                    </div>
                  </div>
                \`;
              }).join('')}
            </div>

            <div style="margin-top:16px;text-align:center;">
              <button class="action-btn retry" onclick="resetUnit6Page(55)">
                🔄 Sayfayı Sıfırla ve Yeniden Dene
              </button>
            </div>
          </div>
        \`;
      } else if (p === 56) {
        // SAYFA 56: 9. WRITE ABOUT YOU & LET'S CHECK!
        pageContentHtml = \`
          <div class="card">
            <div class="card-header-bar">
              <div class="card-title">📖 Sayfa 56: 9. Write about you & Let's Check!</div>
              <button class="reset-btn" onclick="resetUnit6Page(56)">🔄 Dersi Sıfırla</button>
            </div>
            <p style="font-size:13px;color:var(--muted);margin-bottom:14px;">
              Kendinizi tanıtın, sevdiklerinizi ve öğünlerinizi seçin ve İngilizce seslendirin!
            </p>

            <div style="background:#1e293b;border:1px solid var(--border);border-radius:14px;padding:16px;margin-bottom:16px;">
              <h3 style="color:var(--accent);font-size:15px;margin-bottom:12px;">✍️ 9. Write about you (Kendini Tanıt)</h3>
              
              <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(240px, 1fr));gap:10px;margin-bottom:12px;">
                <div>
                  <label style="font-size:11px;color:var(--muted);">Adınız:</label>
                  <input type="text" placeholder="Adınızı yazın..." value="\${p56About.name}" oninput="p56About.name = this.value;" style="width:100%;padding:8px;background:#0f172a;border:1px solid var(--border);border-radius:8px;color:#fff;" />
                </div>
                <div>
                  <label style="font-size:11px;color:var(--muted);">En Sevdiğin Yemek (Favourite food):</label>
                  <input type="text" placeholder="pizza, chicken, fish..." value="\${p56About.favFood}" oninput="p56About.favFood = this.value;" style="width:100%;padding:8px;background:#0f172a;border:1px solid var(--border);border-radius:8px;color:#fff;" />
                </div>
                <div>
                  <label style="font-size:11px;color:var(--muted);">En Sevdiğin İçecek (Favourite drink):</label>
                  <input type="text" placeholder="milk, water, tea, ayran..." value="\${p56About.favDrink}" oninput="p56About.favDrink = this.value;" style="width:100%;padding:8px;background:#0f172a;border:1px solid var(--border);border-radius:8px;color:#fff;" />
                </div>
                <div>
                  <label style="font-size:11px;color:var(--muted);">Sevdiğin Yiyecek (I like):</label>
                  <input type="text" placeholder="apples, carrots..." value="\${p56About.likeFood}" oninput="p56About.likeFood = this.value;" style="width:100%;padding:8px;background:#0f172a;border:1px solid var(--border);border-radius:8px;color:#fff;" />
                </div>
                <div>
                  <label style="font-size:11px;color:var(--muted);">Sevmediğin Yiyecek (I don't like):</label>
                  <input type="text" placeholder="broccoli, garlic..." value="\${p56About.dislikeFood}" oninput="p56About.dislikeFood = this.value;" style="width:100%;padding:8px;background:#0f172a;border:1px solid var(--border);border-radius:8px;color:#fff;" />
                </div>
              </div>

              <div style="background:#0f172a;padding:12px;border-radius:10px;border:1px solid var(--border);margin-bottom:12px;">
                <div style="font-size:13px;line-height:1.6;color:#e2e8f0;">
                  "Hello! My name is <strong>\${p56About.name || '...'}</strong>. My favourite food is <strong>\${p56About.favFood}</strong>. My favourite drink is <strong>\${p56About.favDrink}</strong>. I like <strong>\${p56About.likeFood}</strong>. I don't like <strong>\${p56About.dislikeFood}</strong>. I like <strong>\${p56About.breakfast}</strong> for breakfast, <strong>\${p56About.lunch}</strong> for lunch and <strong>\${p56About.dinner}</strong> for dinner."
                </div>
              </div>

              <div style="text-align:center;">
                <button class="action-btn" onclick="speakText(\`Hello! My name is \${p56About.name || 'a student'}. My favourite food is \${p56About.favFood}. My favourite drink is \${p56About.favDrink}. I like \${p56About.likeFood}. I do not like \${p56About.dislikeFood}. I like \${p56About.breakfast} for breakfast, \${p56About.lunch} for lunch and \${p56About.dinner} for dinner.\`)">
                  🗣️ Paragrafımı İngilizce Seslendir!
                </button>
              </div>
            </div>

            <div style="background:#1e293b;border:1px solid var(--border);border-radius:14px;padding:16px;">
              <h3 style="color:var(--accent);font-size:15px;margin-bottom:10px;">🎯 LET'S CHECK! (Üniteyi Değerlendir)</h3>

              <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(240px, 1fr));gap:12px;">
                <div style="background:#0f172a;padding:10px;border-radius:10px;border:1px solid var(--border);">
                  <div style="font-size:12px;color:var(--muted);margin-bottom:6px;">Tick ✓ My favourite fruit is:</div>
                  <div style="display:flex;flex-direction:column;gap:4px;">
                    \${['banana', 'pear', 'apple', 'orange', 'cherry'].map(fr => \`
                      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px;">
                        <input type="radio" name="p56Fruit" \${p56FavFruit === fr ? 'checked' : ''} onchange="p56FavFruit = '\${fr}'; speakText('\${fr}');" />
                        <span>\${fr}</span>
                      </label>
                    \`).join('')}
                  </div>
                </div>

                <div style="background:#0f172a;padding:10px;border-radius:10px;border:1px solid var(--border);">
                  <div style="font-size:12px;color:var(--muted);margin-bottom:6px;">Write: Do you like tea?</div>
                  <div style="display:flex;gap:8px;margin-top:10px;">
                    <button onclick="p56LikeTea = 'yes'; speakText('Yes, I do.'); renderUnit6();" style="flex:1;padding:8px;border-radius:8px;font-weight:bold;cursor:pointer;\${p56LikeTea === 'yes' ? 'background:var(--success);color:#fff;' : 'background:#334155;color:#fff;border:none;'}">
                      Yes, I do.
                    </button>
                    <button onclick="p56LikeTea = 'no'; speakText('No, I do not.'); renderUnit6();" style="flex:1;padding:8px;border-radius:8px;font-weight:bold;cursor:pointer;\${p56LikeTea === 'no' ? 'background:var(--warning);color:#0f172a;' : 'background:#334155;color:#fff;border:none;'}">
                      No, I don't.
                    </button>
                  </div>
                </div>

                <div style="background:#0f172a;padding:10px;border-radius:10px;border:1px solid var(--border);text-align:center;">
                  <div style="font-size:12px;color:var(--muted);margin-bottom:6px;">Colour: How many stars for this theme?</div>
                  <div style="font-size:24px;margin:8px 0;cursor:pointer;">
                    \${[1, 2, 3, 4, 5].map(st => \`
                      <span onclick="p56Stars = \${st}; speakText('\${st} stars! Well done!'); renderUnit6();" style="color:\${st <= p56Stars ? '#f59e0b' : '#475569'};">★</span>
                    \`).join('')}
                  </div>
                  <div style="font-size:12px;color:var(--accent);font-weight:bold;">
                    Tebrikler! 6. Üniteyi ve Tüm Kitabı Başarıyla Tamamladınız! 🎓
                  </div>
                </div>
              </div>
            </div>
          </div>
        \`;
      }

      document.getElementById('appContent').innerHTML = \`
        <div class="page-nav-bar">
          \${navChips}
        </div>
        \${pageContentHtml}
      \`;
    }

    function checkP50() {
      recordActivity();
      p50Checked = true;
      renderUnit6();
      let allRight = true;
      for (let i = 2; i <= 10; i++) {
        const u = (p50Answers[i] || '').trim().toLowerCase();
        const c = p50Correct[i].toLowerCase();
        if (i === 9) {
          if (u !== 'banana' && u !== 'a banana') allRight = false;
        } else {
          if (u !== c) allRight = false;
        }
      }
      const fb = document.getElementById('p50Feedback');
      if (fb) {
        if (allRight) {
          fb.style.color = 'var(--success)';
          fb.textContent = '🎉 Mükemmel! Masadaki tüm yiyecekleri doğru bildin!';
          speakText('Excellent! You named all foods correctly!');
        } else {
          fb.style.color = 'var(--warning)';
          fb.textContent = 'Doğru olmayanlar kırmızı işaretlendi. Lütfen tekrar dene!';
          speakText('Please check the red items and try again.');
        }
      }
    }

    function pickOdd(taskId, word) {
      recordActivity();
      p51OddAnswers[taskId] = word;
      renderUnit6();
      if (p51OddCorrect[taskId] === word) {
        speakText('Correct! ' + word);
      } else {
        speakText('Try again!');
      }
    }

    function checkP51Order(key) {
      recordActivity();
      const val = (p51OrderWords[key] || '').trim().toLowerCase();
      if (val === p51OrderCorrect[key]) {
        speakText('Well done! ' + val);
        renderUnit6();
      }
    }

    function checkP52(id, choice) {
      recordActivity();
      p52Checked[id] = choice;
      renderUnit6();
      if (p52Correct[id] === choice) {
        speakText('Correct answer!');
      } else {
        speakText('Try again!');
      }
    }

    function pickQ5(id, val) {
      recordActivity();
      p53Q5[id] = val;
      renderUnit6();
      if (p53Q5Correct[id] === val) {
        speakText('Yes, correct!');
      } else {
        speakText('Think again!');
      }
    }

    function pickQ6(id, val) {
      recordActivity();
      p53Q6[id] = val;
      renderUnit6();
      if (p53Q6Correct[id] === val) {
        speakText('Great answer!');
      } else {
        speakText('Try again!');
      }
    }
`;

html = html.replace('function renderUnit5() {', unit6Code + '\n    function renderUnit5() {');

// 8. Add copyFullHtmlCode & downloadHtmlFile helper functions
const copyDownloadFunctions = `
    /* ========================================================
       COPY CODE & DOWNLOAD HTML HELPERS
    ======================================================== */
    function copyFullHtmlCode() {
      recordActivity();
      const fullCode = document.documentElement.outerHTML;
      navigator.clipboard.writeText(fullCode).then(() => {
        alert('✅ Tüm index.html kodu panoya kopyalandı! GitHub dosyanıza doğrudan yapıştırabilirsiniz.');
      }).catch(err => {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = fullCode;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        alert('✅ Tüm index.html kodu panoya kopyalandı! GitHub dosyanıza doğrudan yapıştırabilirsiniz.');
      });
    }

    function downloadHtmlFile() {
      recordActivity();
      const fullCode = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;
      const blob = new Blob([fullCode], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
`;

html = html.replace('/* ========================================================\n       1. GLOBAL STATE & SOUND & INACTIVITY TIMER', copyDownloadFunctions + '\n    /* ========================================================\n       1. GLOBAL STATE & SOUND & INACTIVITY TIMER');

// 9. Add Unit 6 questions to quiz questions (NO EMOJIS in questions or options!)
const unit6QuizItems = `
      // Unit 6: Life in the City & The World
      { q: "Aşağıdakilerden hangisi 'ARMUT' demektir?", a: "Pear", options: ["Pear", "Fish", "Milk", "Tea"], tr: "Armut" },
      { q: "Aşağıdakilerden hangisi 'BALIK' demektir?", a: "Fish", options: ["Fish", "Banana", "Lettuce", "Meat"], tr: "Balık" },
      { q: "Aşağıdakilerden hangisi 'SÜT' demektir?", a: "Milk", options: ["Milk", "Tea", "Coffee", "Water"], tr: "Süt" },
      { q: "Aşağıdakilerden hangisi 'ÇAY' demektir?", a: "Tea", options: ["Tea", "Ayran", "Water", "Coffee"], tr: "Çay" },
      { q: "Aşağıdakilerden hangisi 'ÜZÜM' demektir?", a: "Grapes", options: ["Grapes", "Cherries", "Broccoli", "Carrot"], tr: "Üzüm" },
      { q: "Aşağıdakilerden hangisi 'KİRAZ' demektir?", a: "Cherries", options: ["Cherries", "Banana", "Orange", "Apple"], tr: "Kiraz" },
      { q: "Aşağıdakilerden hangisi 'MARUL' demektir?", a: "Lettuce", options: ["Lettuce", "Cauliflower", "Broccoli", "Potato"], tr: "Marul" },
      { q: "Aşağıdakilerden hangisi 'KABAK' demektir?", a: "Courgette", options: ["Courgette", "Garlic", "Pepper", "Potato"], tr: "Kabak" },
      { q: "Aşağıdakilerden hangisi 'TAVUK' demektir?", a: "Chicken", options: ["Chicken", "Meat", "Fish", "Egg"], tr: "Tavuk" },
      { q: "Aşağıdakilerden hangisi 'HAVUÇ' demektir?", a: "Carrot", options: ["Carrot", "Potato", "Tomato", "Apple"], tr: "Havuç" },
      { q: "Aşağıdakilerden hangisi 'KAHVALTI' demektir?", a: "Breakfast", options: ["Breakfast", "Lunch", "Dinner", "Meal"], tr: "Kahvaltı" },
      { q: "Aşağıdakilerden hangisi 'ÖĞLE YEMEĞİ' demektir?", a: "Lunch", options: ["Lunch", "Dinner", "Breakfast", "Enjoy"], tr: "Öğle Yemeği" },
      { q: "Aşağıdakilerden hangisi 'AKŞAM YEMEĞİ' demektir?", a: "Dinner", options: ["Dinner", "Lunch", "Breakfast", "Food"], tr: "Akşam Yemeği" },
      { q: "Aşağıdakilerden hangisi 'AÇ / KARNI AÇ' demektir?", a: "Hungry", options: ["Hungry", "Thirsty", "Delicious", "Tired"], tr: "Karnı aç" },
      { q: "Aşağıdakilerden hangisi 'SUSAMIŞ' demektir?", a: "Thirsty", options: ["Thirsty", "Hungry", "Happy", "Sad"], tr: "Susamış" },
      { q: "Aşağıdakilerden hangisi 'LEZZETLİ / NEFİS' demektir?", a: "Delicious", options: ["Delicious", "Hungry", "Thirsty", "Bad"], tr: "Lezzetli" },
      { q: "Aşağıdakilerden hangisi 'AFİYET OLSUN' demektir?", a: "Enjoy your meal", options: ["Enjoy your meal", "Good morning", "Goodbye", "Thank you"], tr: "Afiyet olsun" },
`;

html = html.replace('let allQuizQuestions = [', 'let allQuizQuestions = [' + unit6QuizItems);

// 10. Add Unit 6 words to allFlashcards
const unit6Flashcards = `
      // Unit 6
      { en: "Pear", tr: "Armut", icon: "🍐", ex: "There is a pear in my hand." },
      { en: "Fish", tr: "Balık", icon: "🐟", ex: "Here is your fish." },
      { en: "Milk", tr: "Süt", icon: "🥛", ex: "I like milk." },
      { en: "Tea", tr: "Çay", icon: "🍵", ex: "Do you like tea?" },
      { en: "Cauliflower", tr: "Karnabahar", icon: "🥦", ex: "I like cauliflower." },
      { en: "Grapes", tr: "Üzüm", icon: "🍇", ex: "There are some grapes." },
      { en: "Broccoli", tr: "Brokoli", icon: "🥦", ex: "Broccoli is healthy." },
      { en: "Cherries", tr: "Kiraz", icon: "🍒", ex: "I love cherries." },
      { en: "Banana", tr: "Muz", icon: "🍌", ex: "There is a banana in my bag." },
      { en: "Lettuce", tr: "Marul", icon: "🥬", ex: "Fresh lettuce." },
      { en: "Water", tr: "Su", icon: "💧", ex: "Here is some water." },
      { en: "Ayran", tr: "Ayran", icon: "🥛", ex: "Ayran is cold." },
      { en: "Courgette", tr: "Kabak", icon: "🥒", ex: "Green courgette." },
      { en: "Meat", tr: "Et", icon: "🥩", ex: "I like meat and potatoes." },
      { en: "Strawberry", tr: "Çilek", icon: "🍓", ex: "Sweet strawberry." },
      { en: "Chicken", tr: "Tavuk", icon: "🍗", ex: "Here is your chicken." },
      { en: "Potato", tr: "Patates", icon: "🥔", ex: "I like potatoes." },
      { en: "Coffee", tr: "Kahve", icon: "☕", ex: "I don't like coffee." },
      { en: "Carrot", tr: "Havuç", icon: "🥕", ex: "There are some carrots." },
      { en: "Tomato", tr: "Domates", icon: "🍅", ex: "There is a tomato." },
      { en: "Bread", tr: "Ekmek", icon: "🍞", ex: "Can I have some bread?" },
      { en: "Breakfast", tr: "Kahvaltı", icon: "🍳", ex: "Time for breakfast!" },
      { en: "Lunch", tr: "Öğle Yemeği", icon: "🥪", ex: "I like chicken for lunch." },
      { en: "Dinner", tr: "Akşam Yemeği", icon: "🍲", ex: "Fish for dinner." },
      { en: "Hungry", tr: "Aç (Karnı Aç)", icon: "😋", ex: "I'm hungry." },
      { en: "Thirsty", tr: "Susamış", icon: "🥤", ex: "I'm thirsty." },
      { en: "Delicious", tr: "Lezzetli", icon: "✨", ex: "Yummy! It's delicious." },
      { en: "Enjoy your meal", tr: "Afiyet olsun", icon: "🍽️", ex: "Enjoy your meal!" },
`;

html = html.replace('let allFlashcards = [', 'let allFlashcards = [' + unit6Flashcards);

// 11. Initial tab set to unit6
html = html.replace("switchMainTab('unit5');", "switchMainTab('unit6');");

fs.writeFileSync('./index.html', html, 'utf8');
console.log('Unit 6 successfully added to index.html!');

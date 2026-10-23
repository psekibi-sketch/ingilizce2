with open('index.html', 'r', encoding='utf-8') as f:
    code = f.read()

# Add new tab support in switchMainTab
old_switch = """      } else if (tabId === 'guide') {
        document.getElementById('subHeaderTitle').textContent = 'Günler ve Telaffuz Rehberi';
        renderDaysGuide();
      }"""

new_switch = """      } else if (tabId === 'guide') {
        document.getElementById('subHeaderTitle').textContent = 'Günler ve Telaffuz Rehberi';
        renderDaysGuide();
      } else if (tabId === 'speed_math') {
        document.getElementById('subHeaderTitle').textContent = '⚡ 1 Dakika Hızlı Parmak • Zamana Karşı Ritmik Sayma';
        renderSpeedMath();
      } else if (tabId === 'listen_match') {
        document.getElementById('subHeaderTitle').textContent = '🎧 Dinle & Resmi Yakala • Görsel İngilizce Eşleştirme';
        renderListenMatch();
      }"""

if 'tabId === \'speed_math\'' not in code:
    code = code.replace(old_switch, new_switch, 1)

# New games JS: Speed Math & Listen Match
games_js = '''
    /* ========================================================
       ⚡ 1 DAKİKA HIZLI PARMAK (ZAMANA KARŞI RİTMİK SAYMA)
    ======================================================== */
    let speedMathTimeLeft = 60;
    let speedMathScore = 0;
    let speedMathCombo = 0;
    let speedMathBestCombo = 0;
    let speedMathActive = false;
    let speedMathTimer = null;
    let speedMathCurrentQ = null;
    let speedMathTotalAnswered = 0;
    let speedMathTotalCorrect = 0;

    function renderSpeedMath() {
      recordActivity();
      const html = `
        <div class="card" style="border:2px solid #eab308;background:linear-gradient(145deg, #1e293b, #0f172a);">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <span style="font-size:36px;">⚡</span>
              <div>
                <span style="background:#eab308;color:#0f172a;font-size:11px;font-weight:900;padding:2px 8px;border-radius:6px;">REKOR OYUNU</span>
                <h3 style="font-size:20px;color:#fff;margin:2px 0;font-weight:900;">1 Dakika Hızlı Parmak Yarışı</h3>
                <p style="font-size:12px;color:#fde047;margin:0;">60 saniyede eksik ritmik sayıları en hızlı şekilde yakala, seri çarpanı kazan!</p>
              </div>
            </div>
            <div style="display:flex;gap:10px;align-items:center;">
              <div style="background:#0f172a;border:2px solid ${speedMathTimeLeft <= 10 ? '#ef4444' : '#eab308'};padding:6px 14px;border-radius:12px;text-align:center;">
                <div style="font-size:10px;color:#94a3b8;font-weight:700;">KALAN SÜRE</div>
                <div style="font-size:22px;font-weight:900;color:${speedMathTimeLeft <= 10 ? '#ef4444' : '#fff'};">⏱️ ${speedMathTimeLeft}s</div>
              </div>
              <div style="background:#0f172a;border:2px solid #38bdf8;padding:6px 14px;border-radius:12px;text-align:center;">
                <div style="font-size:10px;color:#94a3b8;font-weight:700;">TOPLAM PUAN</div>
                <div style="font-size:22px;font-weight:900;color:#38bdf8;">⭐ ${speedMathScore}</div>
              </div>
            </div>
          </div>

          ${!speedMathActive && speedMathTimeLeft === 60 ? `
            <div style="text-align:center;padding:30px 16px;background:rgba(255,255,255,0.03);border-radius:16px;margin-bottom:16px;">
              <div style="font-size:64px;margin-bottom:10px;">⏱️⚡</div>
              <h4 style="font-size:22px;color:#fff;font-weight:900;margin-bottom:8px;">Hazır mısın Şampiyon?</h4>
              <p style="font-size:13px;color:#cbd5e1;max-width:480px;margin:0 auto 20px;line-height:1.5;">
                2'şer, 3'er, 4'er ve 5'er ritmik saymada eksik bırakılan sayıyı 4 seçenek arasından en hızlı sen bulacaksın.
                Her doğru cevapta <strong>+10 Puan</strong> ve kombo kazanırsın!
              </p>
              <button class="action-btn" style="background:#eab308;color:#0f172a;font-size:16px;font-weight:900;padding:14px 32px;" onclick="startSpeedMath()">
                🚀 60 Saniyelik Yarışı Başlat!
              </button>
            </div>
          ` : speedMathTimeLeft === 0 ? `
            <div style="text-align:center;padding:26px 16px;background:rgba(255,255,255,0.03);border-radius:16px;margin-bottom:16px;">
              <div style="font-size:64px;margin-bottom:10px;">🏆🌟</div>
              <h4 style="font-size:24px;color:#fde047;font-weight:900;margin-bottom:6px;">Süre Doldu! Muhteşem Yarış!</h4>
              <div style="display:flex;justify-content:center;gap:16px;margin:16px 0;flex-wrap:wrap;">
                <div style="background:#0f172a;border:1px solid #eab308;padding:12px 20px;border-radius:12px;">
                  <div style="font-size:12px;color:#94a3b8;">Kazanılan Puan</div>
                  <div style="font-size:28px;font-weight:900;color:#fde047;">${speedMathScore} Puan</div>
                </div>
                <div style="background:#0f172a;border:1px solid #10b981;padding:12px 20px;border-radius:12px;">
                  <div style="font-size:12px;color:#94a3b8;">Doğru / Toplam</div>
                  <div style="font-size:28px;font-weight:900;color:#10b981;">${speedMathTotalCorrect} / ${speedMathTotalAnswered}</div>
                </div>
                <div style="background:#0f172a;border:1px solid #f43f5e;padding:12px 20px;border-radius:12px;">
                  <div style="font-size:12px;color:#94a3b8;">En Yüksek Seri</div>
                  <div style="font-size:28px;font-weight:900;color:#f43f5e;">🔥 x${speedMathBestCombo}</div>
                </div>
              </div>
              <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:20px;">
                <button class="whatsapp-share-btn" onclick="shareSpeedMathWhatsApp()">
                  📲 Karneni WhatsApp ile Paylaş
                </button>
                <button class="action-btn" style="background:#3b82f6;font-size:14px;padding:12px 22px;font-weight:900;" onclick="resetSpeedMath(); startSpeedMath();">
                  🔄 Yeniden Yarış
                </button>
                <button class="action-btn" style="background:#334155;font-size:14px;padding:12px 18px;" onclick="switchMainTab('menu')">
                  🏠 Ana Menüye Dön
                </button>
              </div>
            </div>
          ` : `
            <div style="background:#0f172a;border:2px solid #38bdf8;border-radius:18px;padding:24px;text-align:center;margin-bottom:16px;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                <span style="font-size:12px;font-weight:800;color:#94a3b8;">
                  ${speedMathCurrentQ.mode}'şer Ritmik Dizi
                </span>
                ${speedMathCombo > 1 ? `
                  <span style="background:#f43f5e;color:#fff;font-size:12px;font-weight:900;padding:3px 10px;border-radius:999px;">
                    🔥 Seri x${speedMathCombo}
                  </span>
                ` : ''}
              </div>

              <div style="font-size:32px;font-weight:900;color:#fff;letter-spacing:1px;margin:16px 0;background:rgba(255,255,255,0.05);padding:18px;border-radius:14px;">
                ${speedMathCurrentQ.displaySequence}
              </div>

              <p style="font-size:14px;color:#cbd5e1;margin-bottom:20px;">Soru işaretli boşluğa hangi sayı gelmelidir?</p>

              <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:12px;max-width:440px;margin:0 auto;">
                ${speedMathCurrentQ.options.map(opt => `
                  <button type="button" class="speed-choice-btn" onclick="pickSpeedMathChoice(${opt})">
                    ${opt}
                  </button>
                `).join('')}
              </div>
            </div>
          `}
        </div>
      `;
      document.getElementById('appContent').innerHTML = html;
    }

    function startSpeedMath() {
      speedMathTimeLeft = 60;
      speedMathScore = 0;
      speedMathCombo = 0;
      speedMathBestCombo = 0;
      speedMathTotalAnswered = 0;
      speedMathTotalCorrect = 0;
      speedMathActive = true;
      nextSpeedMathQuestion();
      renderSpeedMath();

      if (speedMathTimer) clearInterval(speedMathTimer);
      speedMathTimer = setInterval(() => {
        if (speedMathTimeLeft > 0) {
          speedMathTimeLeft--;
          renderSpeedMath();
          if (speedMathTimeLeft === 0) {
            clearInterval(speedMathTimer);
            speedMathActive = false;
            if (speedMathScore >= 40) {
              unlockBadge('speed_master');
            }
            playChimeSound('fanfare');
            renderSpeedMath();
            speakTurkish(`Süre bitti! Tebrikler, toplam skorun ${speedMathScore} puan!`);
          }
        }
      }, 1000);
    }

    function resetSpeedMath() {
      if (speedMathTimer) clearInterval(speedMathTimer);
      speedMathActive = false;
      speedMathTimeLeft = 60;
      speedMathScore = 0;
    }

    function nextSpeedMathQuestion() {
      const modes = [2, 3, 4, 5];
      const mode = modes[Math.floor(Math.random() * modes.length)];
      const startMult = Math.floor(Math.random() * 5) + 1; // 1..5
      const nums = [
        startMult * mode,
        (startMult + 1) * mode,
        (startMult + 2) * mode,
        (startMult + 3) * mode
      ];
      const missingIndex = Math.floor(Math.random() * 4);
      const correctVal = nums[missingIndex];
      const displayParts = nums.map((n, i) => i === missingIndex ? '❓' : n);
      const displaySequence = displayParts.join(' ➔ ');

      const optionsSet = new Set([correctVal]);
      while (optionsSet.size < 4) {
        const offset = (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
        const wrong = Math.max(1, correctVal + offset);
        optionsSet.add(wrong);
      }
      const options = Array.from(optionsSet).sort((a, b) => a - b);

      speedMathCurrentQ = {
        mode,
        displaySequence,
        correctVal,
        options
      };
    }

    function pickSpeedMathChoice(chosen) {
      if (!speedMathActive || !speedMathCurrentQ) return;
      speedMathTotalAnswered++;
      if (chosen === speedMathCurrentQ.correctVal) {
        speedMathTotalCorrect++;
        speedMathCombo++;
        if (speedMathCombo > speedMathBestCombo) speedMathBestCombo = speedMathCombo;
        const addScore = 10 + Math.min(10, (speedMathCombo - 1) * 2);
        speedMathScore += addScore;
        playChimeSound('correct');
      } else {
        speedMathCombo = 0;
        playChimeSound('wrong');
      }
      nextSpeedMathQuestion();
      renderSpeedMath();
    }

    function shareSpeedMathWhatsApp() {
      const text = `⚡ *LingoDay Hızlı Parmak Raporu* ⚡\\n👤 Öğrenci 60 saniyede ${speedMathScore} Puan kazandı!\\n🎯 Doğru: ${speedMathTotalCorrect} / ${speedMathTotalAnswered}\\n🔥 En Yüksek Seri: x${speedMathBestCombo}\\nTebrikler! 🏆`;
      openWhatsAppShare(text);
    }

    /* ========================================================
       🎧 DİNLE & RESMİ YAKALA (GÖRSEL İNGİLİZCE EŞLEŞTİRME)
    ======================================================== */
    const LISTEN_MATCH_QUESTIONS = [
      {
        prompt: "Where is the hospital?",
        audio: "Where is the hospital?",
        speakHelp: "Where is the hospital?",
        correct: "🏥 Hastane",
        options: [
          { label: "🏥 Hastane", icon: "🏥", isCorrect: true },
          { label: "🏫 Okul", icon: "🏫", isCorrect: false },
          { label: "🌳 Park", icon: "🌳", isCorrect: false }
        ]
      },
      {
        prompt: "Touch the yellow pencil!",
        audio: "Touch the yellow pencil!",
        speakHelp: "Touch the yellow pencil!",
        correct: "✏️ Sarı Kalem",
        options: [
          { label: "✏️ Sarı Kalem", icon: "✏️", isCorrect: true },
          { label: "📕 Kırmızı Kitap", icon: "📕", isCorrect: false },
          { label: "✂️ Makas", icon: "✂️", isCorrect: false }
        ]
      },
      {
        prompt: "Show me Thursday!",
        audio: "Show me Thursday!",
        speakHelp: "Thursday",
        correct: "📅 Thursday (Perşembe)",
        options: [
          { label: "📅 Thursday", icon: "📅", isCorrect: true },
          { label: "📅 Monday", icon: "📅", isCorrect: false },
          { label: "📅 Sunday", icon: "📅", isCorrect: false }
        ]
      },
      {
        prompt: "Find the bedroom!",
        audio: "Find the bedroom!",
        speakHelp: "Where is the bedroom?",
        correct: "🛏️ Yatak Odası",
        options: [
          { label: "🛏️ Bedroom (Yatak Odası)", icon: "🛏️", isCorrect: true },
          { label: "🍳 Kitchen (Mutfak)", icon: "🍳", isCorrect: false },
          { label: "🚿 Bathroom (Banyo)", icon: "🚿", isCorrect: false }
        ]
      },
      {
        prompt: "Where is the zoo?",
        audio: "Where is the zoo?",
        speakHelp: "The zoo",
        correct: "🦁 Hayvanat Bahçesi",
        options: [
          { label: "🦁 Zoo (Hayvanat Bahçesi)", icon: "🦁", isCorrect: true },
          { label: "🎬 Cinema (Sinema)", icon: "🎬", isCorrect: false },
          { label: "🏬 Market", icon: "🏬", isCorrect: false }
        ]
      },
      {
        prompt: "Touch the green apple!",
        audio: "Touch the green apple!",
        speakHelp: "Green apple",
        correct: "🍏 Yeşil Elma",
        options: [
          { label: "🍏 Green Apple", icon: "🍏", isCorrect: true },
          { label: "🍓 Strawberry", icon: "🍓", isCorrect: false },
          { label: "🍌 Banana", icon: "🍌", isCorrect: false }
        ]
      },
      {
        prompt: "Show me the head!",
        audio: "Show me the head!",
        speakHelp: "Head",
        correct: "🗣️ Head (Baş)",
        options: [
          { label: "🗣️ Head (Baş)", icon: "🗣️", isCorrect: true },
          { label: "👂 Ear (Kulak)", icon: "👂", isCorrect: false },
          { label: "👃 Nose (Burun)", icon: "👃", isCorrect: false }
        ]
      },
      {
        prompt: "Find number eight!",
        audio: "Find number eight!",
        speakHelp: "Eight",
        correct: "8️⃣ Eight (8)",
        options: [
          { label: "8️⃣ Eight (8)", icon: "8️⃣", isCorrect: true },
          { label: "5️⃣ Five (5)", icon: "5️⃣", isCorrect: false },
          { label: "9️⃣ Nine (9)", icon: "9️⃣", isCorrect: false }
        ]
      },
      {
        prompt: "Where is the cinema?",
        audio: "Where is the cinema?",
        speakHelp: "Cinema",
        correct: "🎬 Sinema",
        options: [
          { label: "🎬 Cinema", icon: "🎬", isCorrect: true },
          { label: "🏥 Hospital", icon: "🏥", isCorrect: false },
          { label: "🏫 School", icon: "🏫", isCorrect: false }
        ]
      },
      {
        prompt: "Touch the happy face!",
        audio: "Touch the happy face!",
        speakHelp: "Happy",
        correct: "😊 Happy (Mutlu)",
        options: [
          { label: "😊 Happy", icon: "😊", isCorrect: true },
          { label: "😢 Sad", icon: "😢", isCorrect: false },
          { label: "😴 Tired", icon: "😴", isCorrect: false }
        ]
      }
    ];

    let listenMatchIndex = 0;
    let listenMatchScore = 0;
    let listenMatchWrongFeedback = '';

    function renderListenMatch() {
      recordActivity();
      if (listenMatchIndex >= LISTEN_MATCH_QUESTIONS.length) {
        unlockBadge('listen_detective');
        const html = `
          <div class="card" style="border:2px solid #f43f5e;background:#1e293b;text-align:center;padding:32px 16px;">
            <div style="font-size:64px;margin-bottom:12px;">🎉🎧🌟</div>
            <h3 style="font-size:24px;color:#fde047;font-weight:900;margin-bottom:8px;">Harika Kulaklar! Dinleme Oyunu Bitti!</h3>
            <p style="font-size:14px;color:#fff;margin-bottom:18px;">
              Tüm 10 soruyu başarıyla tamamladın! Toplam Puan: <strong>${listenMatchScore} / 100</strong>
            </p>
            <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
              <button class="whatsapp-share-btn" onclick="openWhatsAppShare('🇬🇧 *LingoDay Dinle & Resmi Yakala Karnesi*\\n10 soruluk görsel dinleme testini ${listenMatchScore}/100 puanla tamamladı! 🎧🌟')">
                📲 Karneni WhatsApp ile Paylaş
              </button>
              <button class="action-btn" style="background:#3b82f6;font-size:13px;padding:10px 20px;" onclick="listenMatchIndex = 0; listenMatchScore = 0; renderListenMatch(); speakListenMatchPrompt();">
                🔄 Tekrar Oyna
              </button>
              <button class="action-btn" style="background:#334155;font-size:13px;padding:10px 16px;" onclick="switchMainTab('menu')">
                🏠 Ana Menüye Dön
              </button>
            </div>
          </div>
        `;
        document.getElementById('appContent').innerHTML = html;
        return;
      }

      const q = LISTEN_MATCH_QUESTIONS[listenMatchIndex];
      const html = `
        <div class="card" style="border:2px solid #f43f5e;background:linear-gradient(145deg, #1e293b, #0f172a);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:32px;">🎧</span>
              <div>
                <span style="background:#f43f5e;color:#fff;font-size:11px;font-weight:900;padding:2px 8px;border-radius:6px;">SESLİ DİNLEME OYUNU</span>
                <h3 style="font-size:18px;color:#fff;margin:2px 0;font-weight:900;">Dinle ve Resmi Yakala (${listenMatchIndex + 1} / 10)</h3>
              </div>
            </div>
            <div style="font-size:14px;font-weight:900;color:#fde047;background:rgba(255,255,255,0.06);padding:6px 14px;border-radius:12px;">
              ⭐ ${listenMatchScore} Puan
            </div>
          </div>

          <div style="background:#0f172a;border:2px dashed #f43f5e;border-radius:18px;padding:22px;text-align:center;margin-bottom:20px;">
            <button class="action-btn" style="background:linear-gradient(135deg, #f43f5e, #ec4899);color:#fff;font-size:16px;font-weight:900;padding:14px 26px;box-shadow:0 6px 18px rgba(244,63,94,0.35);margin-bottom:12px;" onclick="speakListenMatchPrompt()">
              🔊 Dinlemek İçin Dokun: "${q.audio}"
            </button>
            <div style="font-size:13px;color:#94a3b8;">Yukarıdaki sesi dinleyin ve aşağıdaki 3 resimden doğru olanına dokunun:</div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:16px;margin-bottom:16px;">
            ${q.options.map((opt, i) => `
              <div class="listen-match-tile" onclick="pickListenMatchChoice(${i})">
                <div style="font-size:54px;margin-bottom:10px;">${opt.icon}</div>
                <div style="font-size:16px;font-weight:900;color:#fff;">${opt.label}</div>
              </div>
            `).join('')}
          </div>

          ${listenMatchWrongFeedback ? `
            <div class="feedback-banner error" style="margin-top:12px;font-weight:800;justify-content:center;">
              ${listenMatchWrongFeedback}
            </div>
          ` : ''}
        </div>
      `;
      document.getElementById('appContent').innerHTML = html;
    }

    function speakListenMatchPrompt() {
      if (listenMatchIndex < LISTEN_MATCH_QUESTIONS.length) {
        const q = LISTEN_MATCH_QUESTIONS[listenMatchIndex];
        speakText(q.audio, 0.9);
      }
    }

    function pickListenMatchChoice(idx) {
      recordActivity();
      const q = LISTEN_MATCH_QUESTIONS[listenMatchIndex];
      const selected = q.options[idx];
      if (selected.isCorrect) {
        listenMatchScore += 10;
        listenMatchWrongFeedback = '';
        playChimeSound('correct');
        listenMatchIndex++;
        renderListenMatch();
        if (listenMatchIndex < LISTEN_MATCH_QUESTIONS.length) {
          setTimeout(() => speakListenMatchPrompt(), 300);
        }
      } else {
        listenMatchWrongFeedback = `❌ Yanlış resim! Tekrar dinle ve doğruyu bul.`;
        playChimeSound('wrong');
        renderListenMatch();
        speakTurkish("Tekrar dene! Doğru resmi bul.");
      }
    }
'''

if 'renderSpeedMath' not in code:
    code = code.replace('    /* ========================================================\n       2.05. 3\'ER (30\'A KADAR)', games_js + '\n    /* ========================================================\n       2.05. 3\'ER (30\'A KADAR)', 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(code)

print('Step 3 complete: Speed math and Listen match modules added.')

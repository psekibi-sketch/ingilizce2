import re

with open('index.html', 'r', encoding='utf-8') as f:
    code = f.read()

# JS code to insert right after "<script>"
js_core_additions = '''
    /* ========================================================
       SES EFEKTLERİ SYNTHESIZER (WEB AUDIO API - SIFIR DOSYA BAĞIMLILIĞI)
    ======================================================== */
    let audioCtx = null;
    function getAudioContext() {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    function playChimeSound(type) {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        if (type === 'correct') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, now);
          osc.frequency.setValueAtTime(659.25, now + 0.1);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.35);
        } else if (type === 'wrong') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.setValueAtTime(180, now + 0.12);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.28);
        } else if (type === 'fanfare') {
          [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.1);
            gain.gain.setValueAtTime(0.15, now + idx * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.1);
            osc.stop(now + idx * 0.1 + 0.3);
          });
        } else if (type === 'rocket') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(130, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.7);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.85);
        }
      } catch (e) {}
    }

    /* ========================================================
       10 BAŞARI ROZETİ VE ÖDÜL SİSTEMİ
    ======================================================== */
    const BADGE_DEFINITIONS = [
      { id: 'rhythm_2', title: "2'ler Balon Ustası", icon: '🎈', desc: "2'şer ritmik saymayı tam puanla bitirdi!", color: '#38bdf8' },
      { id: 'rhythm_3', title: "3'ler Çilek Şampiyonu", icon: '🍓', desc: "3'er ritmik saymayı başarıyla tamamladı!", color: '#ec4899' },
      { id: 'rhythm_4', title: "4'ler Hızlı Sürücü", icon: '🚗', desc: "4'er ritmik saymayı başarıyla tamamladı!", color: '#06b6d4' },
      { id: 'rhythm_5', title: "5'ler Yıldız Avcısı", icon: '⭐', desc: "5'er ritmik saymayı başarıyla tamamladı!", color: '#f59e0b' },
      { id: 'rocket_pilot', title: "Uzay Roketi Pilotu", icon: '🚀', desc: "Geriye ritmik sayıp roketi uzaya fırlattı!", color: '#8b5cf6' },
      { id: 'speed_master', title: "Hızlı Parmak Şampiyonu", icon: '⚡', desc: "1 dakikalık yarışta 40+ puan kazandı!", color: '#eab308' },
      { id: 'exam_hero', title: "Matematik Dehası", icon: '🏆', desc: "Ritmik sayma sınavında yüksek skor yaptı!", color: '#10b981' },
      { id: 'english_star', title: "İngilizce Elçisi", icon: '🇬🇧', desc: "20 soruluk büyük İngilizce sınavını çözdü!", color: '#3b82f6' },
      { id: 'days_expert', title: "Günler Bilgini", icon: '📅', desc: "Haftanın günlerini eksiksiz sıraya dizdi!", color: '#14b8a6' },
      { id: 'listen_detective', title: "Dinle & Bul Dedektifi", icon: '🎧', desc: "Görsel dinleme oyununda tüm hedefleri buldu!", color: '#f43f5e' }
    ];

    function getUnlockedBadges() {
      try {
        const raw = localStorage.getItem('lingoday_badges');
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }

    function unlockBadge(badgeId) {
      const unlocked = getUnlockedBadges();
      if (!unlocked.includes(badgeId)) {
        unlocked.push(badgeId);
        try {
          localStorage.setItem('lingoday_badges', JSON.stringify(unlocked));
        } catch (e) {}
        const badge = BADGE_DEFINITIONS.find(b => b.id === badgeId);
        if (badge) {
          playChimeSound('fanfare');
          showBadgeUnlockToast(badge);
        }
        updateBadgeCountDisplay();
      }
    }

    function updateBadgeCountDisplay() {
      const count = getUnlockedBadges().length;
      const countEl = document.getElementById('unlockedBadgesCount');
      if (countEl) countEl.textContent = count;
      const homeBadgeEl = document.getElementById('homeBadgesCountText');
      if (homeBadgeEl) homeBadgeEl.textContent = `${count} / ${BADGE_DEFINITIONS.length} Rozet`;
    }

    function showBadgeUnlockToast(badge) {
      const toast = document.createElement('div');
      toast.className = 'badge-unlock-toast';
      toast.innerHTML = `
        <div style="font-size:36px;animation:rocketFly 0.6s infinite alternate;">${badge.icon}</div>
        <div>
          <div style="font-size:11px;font-weight:900;color:#fde047;letter-spacing:0.5px;">YENİ ROZET KAZANILDI! 🌟</div>
          <div style="font-size:16px;font-weight:900;color:#fff;">${badge.title}</div>
          <div style="font-size:11px;color:#cbd5e1;">${badge.desc}</div>
        </div>
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => toast.remove(), 400);
      }, 4200);
    }

    function openBadgesModal() {
      recordActivity();
      const unlocked = getUnlockedBadges();
      const modal = document.createElement('div');
      modal.id = 'badgesModal';
      modal.className = 'rhythm-choice-modal-overlay';
      modal.innerHTML = `
        <div class="card" style="max-width:680px;width:92%;max-height:85vh;overflow-y:auto;border:2px solid #f59e0b;background:#0f172a;box-shadow:0 12px 36px rgba(0,0,0,0.8);position:relative;">
          <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:12px;margin-bottom:16px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:32px;">🏆</span>
              <div>
                <h3 style="font-size:20px;color:#fff;margin:0;font-weight:900;">Başarı Rozet Vitrini</h3>
                <p style="font-size:12px;color:#fde047;margin:0;">Kazanılan: ${unlocked.length} / ${BADGE_DEFINITIONS.length} Rozet</p>
              </div>
            </div>
            <button onclick="document.getElementById('badgesModal').remove()" style="background:#334155;color:#fff;border:none;border-radius:10px;width:34px;height:34px;font-weight:900;cursor:pointer;">✕</button>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:12px;margin-bottom:20px;">
            ${BADGE_DEFINITIONS.map(b => {
              const isUnlocked = unlocked.includes(b.id);
              return `
                <div class="badge-item-card ${isUnlocked ? 'unlocked' : 'locked'}" style="border-color:${isUnlocked ? b.color : '#334155'};">
                  <div style="font-size:36px;margin-bottom:6px;">${isUnlocked ? b.icon : '🔒'}</div>
                  <div style="font-size:12px;font-weight:900;color:${isUnlocked ? '#fff' : '#64748b'};margin-bottom:4px;">${b.title}</div>
                  <div style="font-size:10px;color:${isUnlocked ? '#cbd5e1' : '#475569'};line-height:1.3;">${b.desc}</div>
                  ${isUnlocked ? '<span style="display:inline-block;margin-top:6px;background:#10b981;color:#fff;font-size:9px;font-weight:900;padding:2px 6px;border-radius:4px;">AÇILDI ✓</span>' : '<span style="display:inline-block;margin-top:6px;background:#334155;color:#94a3b8;font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;">KİLİTLİ</span>'}
                </div>
              `;
            }).join('')}
          </div>

          <div style="text-align:center;">
            <button class="action-btn" style="background:#3b82f6;padding:10px 24px;" onclick="document.getElementById('badgesModal').remove()">
              Harika, Devam Et!
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    /* ========================================================
       WHATSAPP KARNE PAYLAŞIMI
    ======================================================== */
    function openWhatsAppShare(msg) {
      recordActivity();
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    }

    /* ========================================================
       GITHUB İÇİN KODU KOPYALAMA YARDIMCISI & REHBER MODAL
    ======================================================== */
    function copyFullHtmlCodeManual() {
      recordActivity();
      try {
        const fullHtml = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;
        navigator.clipboard.writeText(fullHtml).then(() => {
          showGitHubCopySuccessModal();
        }).catch(() => {
          showGitHubCopySuccessModal();
        });
      } catch (e) {
        showGitHubCopySuccessModal();
      }
    }

    function showGitHubCopySuccessModal() {
      const existing = document.getElementById('ghModal');
      if (existing) existing.remove();
      const modal = document.createElement('div');
      modal.id = 'ghModal';
      modal.className = 'rhythm-choice-modal-overlay';
      modal.innerHTML = `
        <div class="card" style="max-width:550px;width:92%;border:2px solid #38bdf8;background:#0f172a;box-shadow:0 12px 36px rgba(0,0,0,0.85);text-align:left;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:10px;">
            <span style="font-size:32px;">📋</span>
            <div>
              <h3 style="font-size:18px;color:#fff;margin:0;font-weight:900;">HTML Kodu Kopyalandı!</h3>
              <p style="font-size:12px;color:#38bdf8;margin:0;">GitHub Güncelleme ve Önbellek Rehberi</p>
            </div>
          </div>
          <div style="font-size:13px;color:#cbd5e1;line-height:1.6;margin-bottom:16px;">
            <p style="margin-bottom:8px;"><strong>1. GitHub'a Yapıştırma:</strong> GitHub reponuzdaki (örn. <code>ingilizce2/index.html</code>) dosyasını düzenleme moduna alıp eski kodları silin ve panodaki yeni kodu yapıştırın (<strong>Ctrl + V</strong>). Ardından <em>Commit changes</em> deyin.</p>
            <p style="margin-bottom:8px;"><strong>2. GitHub Pages Dağıtımı:</strong> GitHub'ın yeni sayfayı yayına alması genellikle <strong>1 - 2 dakika</strong> sürer.</p>
            <p style="margin-bottom:8px;background:rgba(245,158,11,0.12);border-left:3px solid #f59e0b;padding:8px 10px;border-radius:6px;color:#fde047;">
              <strong>⚠️ Tarayıcı Önbelleği:</strong> Sayfayı açtığınızda eski sürüm görünüyorsa klavyeden <strong>Ctrl + Shift + R</strong> (veya <strong>Ctrl + F5</strong>) tuşlarına basarak tarayıcı önbelleğini yenileyin.
            </p>
          </div>
          <div style="text-align:center;">
            <button class="action-btn" style="background:#10b981;font-size:13px;padding:10px 24px;font-weight:900;" onclick="document.getElementById('ghModal').remove()">
              Anladım, Kapat ✓
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
'''

if 'BADGE_DEFINITIONS' not in code:
    code = code.replace('<script>', '<script>\n' + js_core_additions, 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(code)

print('Step 2 complete: Web Audio Synthesizer, Badge System, WhatsApp share, and GitHub modal injected.')

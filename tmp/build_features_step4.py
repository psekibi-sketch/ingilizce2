with open('index.html', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update renderUnitsOverview to include Badges Widget, Speed Math Card, Rocket Card, and Listen Match Card
target_cards_hub = """          <!-- 2 BÜYÜK DERS KARTI (PORTALLAR) -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;">"""

replacement_cards_hub = """          <!-- BAŞARI ROZETLERİ VİTRİNİ BANNER'I -->
          <div class="card" style="margin-bottom:14px;background:linear-gradient(135deg, rgba(245,158,11,0.22), rgba(30,41,59,0.95));border:2px solid #f59e0b;cursor:pointer;" onclick="openBadgesModal()">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
              <div style="display:flex;align-items:center;gap:12px;">
                <span style="font-size:36px;">🏆</span>
                <div>
                  <span style="background:#f59e0b;color:#0f172a;font-size:10px;font-weight:900;padding:2px 8px;border-radius:6px;">BAŞARI MADALYALARI</span>
                  <h3 style="font-size:18px;color:#fde047;margin:2px 0;font-weight:900;">Rozet Vitrinim & Karne Ödülleri</h3>
                  <p style="font-size:12px;color:#cbd5e1;margin:0;">Dersleri ve testleri bitirdikçe açılan 10 özel rozetini gör!</p>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;">
                <span id="homeBadgesCountText" style="font-size:14px;font-weight:900;color:#fff;background:rgba(255,255,255,0.08);padding:6px 14px;border-radius:12px;">
                  Rozetlerimi Aç ➔
                </span>
              </div>
            </div>
          </div>

          <!-- 2 BÜYÜK DERS KARTI (PORTALLAR) -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;">"""

if 'homeBadgesCountText' not in code:
    code = code.replace(target_cards_hub, replacement_cards_hub, 1)

# 2. Add Speed Math & Reverse counting banners under Matematik
target_math_grid = """            <!-- MATEMATİK RİTMİK SAYMA SINAVI VURGULU KART -->"""

new_math_extra = """            <!-- MATEMATİK EXTRA OYUNLAR (HIZLI PARMAK & ROKET) -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;margin-bottom:16px;">
              <!-- 1 DAKİKA HIZLI PARMAK KARTI -->
              <div class="card" style="margin-bottom:0;border:2px solid #eab308;background:linear-gradient(135deg, rgba(234,179,8,0.18), rgba(30,41,59,0.95));cursor:pointer;" onclick="switchMainTab('speed_math')">
                <div style="display:flex;align-items:center;gap:12px;">
                  <span style="font-size:38px;">⚡</span>
                  <div style="flex:1;">
                    <span style="background:#eab308;color:#0f172a;font-size:10px;font-weight:900;padding:2px 8px;border-radius:6px;">REKOR OYUNU</span>
                    <h4 style="font-size:17px;color:#fff;font-weight:900;margin:3px 0 1px;">1 Dakika Hızlı Parmak</h4>
                    <p style="font-size:11px;color:#cbd5e1;margin:0;">60 saniyede eksik ritmik sayıları yakala!</p>
                  </div>
                  <button class="action-btn" style="background:#eab308;color:#0f172a;font-size:12px;font-weight:900;padding:6px 12px;">Başla ➔</button>
                </div>
              </div>

              <!-- ROKET MODU (GERİYE RİTMİK SAYMA) -->
              <div class="card" style="margin-bottom:0;border:2px solid #8b5cf6;background:linear-gradient(135deg, rgba(139,92,246,0.18), rgba(30,41,59,0.95));cursor:pointer;" onclick="selectRhythmStepAndOpen(rhythmActiveMode, 'learn'); toggleRhythmDirection('backward');">
                <div style="display:flex;align-items:center;gap:12px;">
                  <span style="font-size:38px;">🚀</span>
                  <div style="flex:1;">
                    <span style="background:#8b5cf6;color:#fff;font-size:10px;font-weight:900;padding:2px 8px;border-radius:6px;">ROKET FIRLATMA</span>
                    <h4 style="font-size:17px;color:#fff;font-weight:900;margin:3px 0 1px;">Geriye Ritmik Sayma</h4>
                    <p style="font-size:11px;color:#cbd5e1;margin:0;">Geri sayımı tamamla, uzay roketini fırlat!</p>
                  </div>
                  <button class="action-btn" style="background:#8b5cf6;color:#fff;font-size:12px;font-weight:900;padding:6px 12px;">Fırlat ➔</button>
                </div>
              </div>
            </div>

            <!-- MATEMATİK RİTMİK SAYMA SINAVI VURGULU KART -->"""

if '1 Dakika Hızlı Parmak' not in code:
    code = code.replace(target_math_grid, new_math_extra, 1)

# 3. Add Listen Match under İngilizce
target_en_tools = """            <!-- İNGİLİZCE ETKİLEŞİMLİ PRATİK ARAÇLARI -->
            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));gap:12px;">"""

replacement_en_tools = """            <!-- İNGİLİZCE ETKİLEŞİMLİ PRATİK ARAÇLARI -->
            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(190px, 1fr));gap:12px;">
              <div class="card" style="margin-bottom:0;text-align:center;cursor:pointer;border:2px solid #f43f5e;" onclick="switchMainTab('listen_match')">
                <div style="font-size:32px;margin-bottom:6px;">🎧</div>
                <div style="font-weight:700;color:#fff;font-size:14px;">Dinle ve Resmi Yakala</div>
                <p style="font-size:11px;color:var(--muted);margin:4px 0 10px;">Söylenen kelimeyi dinleyip doğru resmi bulma oyunu.</p>
                <button class="action-btn" style="font-size:11px;padding:6px 12px;background:#f43f5e;">Oyna ➔</button>
              </div>"""

if 'Dinle ve Resmi Yakala' not in code:
    code = code.replace(target_en_tools, replacement_en_tools, 1)

# 4. Add rhythmCountDirection support to rhythmic module
target_rhythm_vars = "let rhythmActiveMode = 2;          // 2, 3, 4 veya 5"
replacement_rhythm_vars = """let rhythmActiveMode = 2;          // 2, 3, 4 veya 5
    let rhythmCountDirection = 'forward'; // 'forward' (İleriye Sayma) veya 'backward' (Geriye Sayma / Roket Modu)"""

if 'rhythmCountDirection' not in code:
    code = code.replace(target_rhythm_vars, replacement_rhythm_vars, 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(code)

print('Step 4 complete: Hub cards, speed math, rocket button, and listen match integrated into overview.')

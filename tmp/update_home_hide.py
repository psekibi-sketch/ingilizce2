with open('index.html', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update currentHomeSubject initial value to 'home'
target_var = "let currentHomeSubject = 'all'; // 'all', 'math', 'english'"
replacement_var = "let currentHomeSubject = 'home'; // 'home' (sadece 2 ana başlık portalı), 'math', 'english'"

if target_var in code:
    code = code.replace(target_var, replacement_var, 1)

# 2. Update showMath and showEnglish conditions
target_show = """      const showMath = currentHomeSubject === 'all' || currentHomeSubject === 'math';
      const showEnglish = currentHomeSubject === 'all' || currentHomeSubject === 'english';"""

replacement_show = """      const showMath = currentHomeSubject === 'math';
      const showEnglish = currentHomeSubject === 'english';
      const isHomeOnly = currentHomeSubject === 'home';"""

if target_show in code:
    code = code.replace(target_show, replacement_show, 1)

# 3. Update the filter pill buttons to reflect Home vs Math vs English
target_pills = """            <!-- FİLTRELEME BUTONLARI -->
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button class="subject-pill-btn ${currentHomeSubject === 'all' ? 'active-all' : ''}" onclick="selectHomeSubject('all')">
                ✨ Tüm Dersler
              </button>
              <button class="subject-pill-btn ${currentHomeSubject === 'math' ? 'active-math' : ''}" onclick="selectHomeSubject('math')">
                🔢 Matematik
              </button>
              <button class="subject-pill-btn ${currentHomeSubject === 'english' ? 'active-english' : ''}" onclick="selectHomeSubject('english')">
                🇬🇧 İngilizce
              </button>
            </div>"""

replacement_pills = """            <!-- FİLTRELEME BUTONLARI -->
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button class="subject-pill-btn ${currentHomeSubject === 'home' ? 'active-all' : ''}" onclick="selectHomeSubject('home')">
                🏠 Ana Ders Menüsü
              </button>
              <button class="subject-pill-btn ${currentHomeSubject === 'math' ? 'active-math' : ''}" onclick="selectHomeSubject('math')">
                🔢 Matematik
              </button>
              <button class="subject-pill-btn ${currentHomeSubject === 'english' ? 'active-english' : ''}" onclick="selectHomeSubject('english')">
                🇬🇧 İngilizce
              </button>
            </div>"""

if target_pills in code:
    code = code.replace(target_pills, replacement_pills, 1)

# 4. If math or english is chosen, add a "⬅️ Ana Menüye Dön" bar right above it!
target_math_header = """            <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid rgba(236,72,153,0.3);">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:28px;">🔢</span>
                <div>
                  <h3 style="font-size:20px;color:#fff;font-weight:900;margin:0;">1. ANA BAŞLIK: MATEMATİK</h3>"""

replacement_math_header = """            <div style="margin-bottom:14px;">
              <button class="action-btn" style="background:#334155;color:#f8fafc;font-size:13px;font-weight:800;padding:8px 16px;display:inline-flex;align-items:center;gap:6px;" onclick="selectHomeSubject('home')">
                ⬅️ Ana Ders Menüsüne Dön
              </button>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid rgba(236,72,153,0.3);">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:28px;">🔢</span>
                <div>
                  <h3 style="font-size:20px;color:#fff;font-weight:900;margin:0;">1. ANA BAŞLIK: MATEMATİK</h3>"""

if target_math_header in code:
    code = code.replace(target_math_header, replacement_math_header, 1)

target_english_header = """            <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid rgba(59,130,246,0.3);">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:28px;">🇬🇧</span>
                <div>
                  <h3 style="font-size:20px;color:#fff;font-weight:900;margin:0;">2. ANA BAŞLIK: İNGİLİZCE</h3>"""

replacement_english_header = """            <div style="margin-bottom:14px;">
              <button class="action-btn" style="background:#334155;color:#f8fafc;font-size:13px;font-weight:800;padding:8px 16px;display:inline-flex;align-items:center;gap:6px;" onclick="selectHomeSubject('home')">
                ⬅️ Ana Ders Menüsüne Dön
              </button>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid rgba(59,130,246,0.3);">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:28px;">🇬🇧</span>
                <div>
                  <h3 style="font-size:20px;color:#fff;font-weight:900;margin:0;">2. ANA BAŞLIK: İNGİLİZCE</h3>"""

if target_english_header in code:
    code = code.replace(target_english_header, replacement_english_header, 1)

# Write to index.html and app/src/main/assets/index.html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(code)

with open('app/src/main/assets/index.html', 'w', encoding='utf-8') as f:
    f.write(code)

print('Update successful: Submenus completely hidden on Home screen.')

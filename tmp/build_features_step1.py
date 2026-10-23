import sys
import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Cache-Control meta tags in <head>
if 'no-cache, no-store' not in content:
    cache_meta = '''  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
'''
    content = content.replace('<meta charset="UTF-8">\n', '<meta charset="UTF-8">\n' + cache_meta, 1)

# 2. Add extra CSS styles before </style>
extra_css = '''
    /* ========================================================
       YENİ ÖZELLİK VE ANİMASYON STİLLERİ
    ======================================================== */
    .badge-unlock-toast {
      position: fixed;
      top: 24px;
      right: 24px;
      background: linear-gradient(135deg, #1e1b4b, #312e81);
      border: 2px solid #fde047;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
      border-radius: 18px;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      z-index: 10000;
      animation: slideInDown 0.4s ease;
      transition: all 0.4s ease;
    }
    @keyframes slideInDown {
      from { transform: translateY(-40px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .badge-item-card {
      background: #1e293b;
      border: 2px solid var(--border);
      border-radius: 16px;
      padding: 16px;
      text-align: center;
      transition: all 0.2s ease;
      position: relative;
    }
    .badge-item-card.unlocked {
      background: linear-gradient(145deg, #1e293b, #0f172a);
      border-color: #f59e0b;
      box-shadow: 0 6px 20px rgba(245, 158, 11, 0.25);
    }
    .badge-item-card.locked {
      opacity: 0.5;
      filter: grayscale(0.85);
    }

    .speed-choice-btn {
      padding: 16px 12px;
      font-size: 24px;
      font-weight: 900;
      border-radius: 16px;
      border: 3px solid #38bdf8;
      background: #1e293b;
      color: #fff;
      cursor: pointer;
      transition: transform 0.1s;
    }
    .speed-choice-btn:active {
      transform: scale(0.95);
    }

    .listen-match-tile {
      background: #1e293b;
      border: 3px solid var(--border);
      border-radius: 20px;
      padding: 24px 16px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .listen-match-tile:hover {
      border-color: #38bdf8;
      transform: translateY(-4px);
      box-shadow: 0 10px 24px rgba(56, 189, 248, 0.25);
    }

    .whatsapp-share-btn {
      background: linear-gradient(135deg, #25d366, #128c7e);
      color: #fff;
      border: none;
      border-radius: 14px;
      padding: 12px 20px;
      font-size: 14px;
      font-weight: 900;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 6px 18px rgba(37, 211, 102, 0.35);
      transition: transform 0.15s ease;
    }
    .whatsapp-share-btn:hover {
      transform: translateY(-2px);
    }

    .rocket-launch-anim {
      font-size: 64px;
      display: inline-block;
      animation: rocketFly 1.2s ease-in-out infinite alternate;
    }
    @keyframes rocketFly {
      from { transform: translateY(0) rotate(-5deg); }
      to { transform: translateY(-20px) rotate(5deg); }
    }
'''

if 'badge-unlock-toast' not in content:
    content = content.replace('  </style>', extra_css + '  </style>', 1)

# 3. Add App Footer before <script>
footer_html = '''
  <!-- APP FOOTER & GITHUB EXPORT / ROZETLER -->
  <footer id="appFooter" style="margin-top:auto;padding:24px 16px 16px;text-align:center;border-top:1px solid rgba(255,255,255,0.08);background:rgba(15,23,42,0.7);font-size:12px;color:#94a3b8;">
    <div style="max-width:900px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <div>
        📚 <strong>LingoDay</strong> • 2. Sınıf İngilizce & Matematik Paketi
        <div style="font-size:11px;color:#64748b;margin-top:2px;">Önce Öğretir, Çocuk Sayar, Sınav Yapar • MEB Müfredatına Uygun</div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        <button onclick="openBadgesModal()" class="action-btn" style="background:#f59e0b;color:#0f172a;font-size:11px;padding:7px 12px;font-weight:900;">
          🏆 Rozet Vitrini (<span id="unlockedBadgesCount">0</span>/10)
        </button>
        <button onclick="copyFullHtmlCodeManual()" class="action-btn" style="background:#334155;color:#e2e8f0;font-size:11px;padding:7px 14px;font-weight:700;">
          📋 GitHub İçin HTML Kodunu Kopyala
        </button>
      </div>
    </div>
  </footer>
'''

if 'id="appFooter"' not in content:
    content = content.replace('  <script>', footer_html + '\n  <script>', 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Step 1 complete: Head, CSS, and Footer added.')

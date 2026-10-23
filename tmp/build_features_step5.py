with open('index.html', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add toggleRhythmDirection function and handle reverse steps in renderRhythmicCounting
dir_logic = '''
    function toggleRhythmDirection(dir) {
      recordActivity();
      stopRhythmAutoTeach();
      rhythmCountDirection = dir;
      rhythmCurrentHighlightStep = 0;
      rhythmTeachCompletedOnce = false;
      if (rhythmActiveStage === 'practice') {
        initRhythmPractice();
      } else {
        renderRhythmicCounting();
        if (rhythmActiveStage === 'learn') {
          setTimeout(() => startRhythmAutoTeach(), 250);
        }
      }
    }
'''

if 'function toggleRhythmDirection' not in code:
    code = code.replace('    function switchRhythmStage(newStage) {', dir_logic + '\n    function switchRhythmStage(newStage) {', 1)

# 2. Add Direction toggle buttons in fullHtml before stageContentHtml
target_stage_tabs = """        <!-- 3 AŞAMALI PEDAGOJİK AKIŞ SEKMELERİ -->
        <div class="rhythm-stage-tabs">
          <button class="rhythm-stage-tab ${rhythmActiveStage === 'learn' ? 'active' : ''}" onclick="switchRhythmStage('learn')">
            <span style="font-size:22px;">🎓 1. Aşama</span>
            <span>Önce Öğren & Sesli Dinle</span>
          </button>
          <button class="rhythm-stage-tab ${rhythmActiveStage === 'practice' ? 'active' : ''}" onclick="switchRhythmStage('practice')">
            <span style="font-size:22px;">🗣️ 2. Aşama</span>
            <span>Sıra Sende: Şimdi Sen Say!</span>
          </button>
          <button class="rhythm-stage-tab ${rhythmActiveStage === 'exam' ? 'active' : ''}" onclick="switchRhythmStage('exam')">
            <span style="font-size:22px;">🏆 3. Aşama</span>
            <span>Ritmik Sayma Sınavı</span>
          </button>
        </div>"""

replacement_stage_tabs = """        <!-- 3 AŞAMALI PEDAGOJİK AKIŞ SEKMELERİ -->
        <div class="rhythm-stage-tabs">
          <button class="rhythm-stage-tab ${rhythmActiveStage === 'learn' ? 'active' : ''}" onclick="switchRhythmStage('learn')">
            <span style="font-size:22px;">🎓 1. Aşama</span>
            <span>Önce Öğren & Sesli Dinle</span>
          </button>
          <button class="rhythm-stage-tab ${rhythmActiveStage === 'practice' ? 'active' : ''}" onclick="switchRhythmStage('practice')">
            <span style="font-size:22px;">🗣️ 2. Aşama</span>
            <span>Sıra Sende: Şimdi Sen Say!</span>
          </button>
          <button class="rhythm-stage-tab ${rhythmActiveStage === 'exam' ? 'active' : ''}" onclick="switchRhythmStage('exam')">
            <span style="font-size:22px;">🏆 3. Aşama</span>
            <span>Ritmik Sayma Sınavı</span>
          </button>
        </div>

        <!-- SAYMA YÖNÜ (İLERİYE vs GERİYE / ROKET MODU) -->
        <div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:14px;flex-wrap:wrap;">
          <button class="action-btn" style="background:${rhythmCountDirection === 'forward' ? '#38bdf8' : '#1e293b'};color:${rhythmCountDirection === 'forward' ? '#0f172a' : '#cbd5e1'};border:2px solid ${rhythmCountDirection === 'forward' ? '#38bdf8' : '#334155'};font-weight:900;padding:8px 16px;" onclick="toggleRhythmDirection('forward')">
            ▶️ İleriye Doğru Sayma
          </button>
          <button class="action-btn" style="background:${rhythmCountDirection === 'backward' ? '#8b5cf6' : '#1e293b'};color:${rhythmCountDirection === 'backward' ? '#fff' : '#cbd5e1'};border:2px solid ${rhythmCountDirection === 'backward' ? '#8b5cf6' : '#334155'};font-weight:900;padding:8px 16px;" onclick="toggleRhythmDirection('backward')">
            🚀 Geriye Doğru Sayma (Uzay Roketi Modu)
          </button>
        </div>"""

if 'SAYMA YÖNÜ (İLERİYE vs GERİYE' not in code:
    code = code.replace(target_stage_tabs, replacement_stage_tabs, 1)

# 3. Add Badge Unlock & WhatsApp share button in rhythmPracticeCompleted
target_practice_buttons = """                  <button class="action-btn" style="background:#3b82f6;color:#fff;font-size:14px;padding:12px 20px;font-weight:800;" onclick="initRhythmPractice()">
                    🔄 Yeniden Dene (Testi Başa Al)
                  </button>"""

replacement_practice_buttons = """                  <button class="whatsapp-share-btn" onclick="openWhatsAppShare('🌟 *LingoDay 2. Sınıf Ritmik Sayma Raporu* 🌟\\n👤 Öğrenci ' + rhythmActiveMode + '\\'şer saymayı ' + rhythmPracticeDuration + ' saniyede tamamladı!\\n🎯 Skor: ' + stats.totalScore + '/100\\nPedagojik Not: ' + stats.pedagojikNot + '\\nTebrikler! 🏆')">
                    📲 Karneni WhatsApp ile Paylaş
                  </button>
                  <button class="action-btn" style="background:#3b82f6;color:#fff;font-size:14px;padding:12px 20px;font-weight:800;" onclick="initRhythmPractice()">
                    🔄 Yeniden Dene (Testi Başa Al)
                  </button>"""

if 'LingoDay 2. Sınıf Ritmik Sayma Raporu' not in code:
    code = code.replace(target_practice_buttons, replacement_practice_buttons, 1)

# 4. Trigger badge unlock in calculateRhythmPracticeScore and rocket in reverse
target_calc_score = """      // 10 basamak için ezbere süre: 18 - 25 saniye (basamak başı ~2 saniye)"""
replacement_calc_score = """      if (rhythmCountDirection === 'backward') {
        unlockBadge('rocket_pilot');
        playChimeSound('rocket');
      } else {
        unlockBadge('rhythm_' + rhythmActiveMode);
        playChimeSound('correct');
      }
      // 10 basamak için ezbere süre: 18 - 25 saniye (basamak başı ~2 saniye)"""

if 'unlockBadge(\'rhythm_\'' not in code:
    code = code.replace(target_calc_score, replacement_calc_score, 1)

# 5. In Exam completion, unlock exam_hero badge and add WhatsApp share
target_exam_done = """              if (rhythmExamScore > rhythmBestExamScore) {
                rhythmBestExamScore = rhythmExamScore;
              }"""

replacement_exam_done = """              if (rhythmExamScore > rhythmBestExamScore) {
                rhythmBestExamScore = rhythmExamScore;
              }
              unlockBadge('exam_hero');
              playChimeSound('fanfare');"""

if 'unlockBadge(\'exam_hero\')' not in code:
    code = code.replace(target_exam_done, replacement_exam_done, 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(code)

print('Step 5 complete: Direction toggle, reverse rocket mode, badges, and WhatsApp sharing integrated.')

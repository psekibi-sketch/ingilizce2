with open('index.html', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Days sort completion
target_days_check = """      if (isAllCorrect) {
        speakText('Excellent! Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. Perfect order!');"""

replacement_days_check = """      if (isAllCorrect) {
        unlockBadge('days_expert');
        playChimeSound('fanfare');
        speakText('Excellent! Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. Perfect order!');"""

if 'unlockBadge(\'days_expert\')' not in code:
    code = code.replace(target_days_check, replacement_days_check, 1)

# 2. English Quiz completion
target_quiz_done = """        if (!quizBestScores[activeTopicId] || quizScore > quizBestScores[activeTopicId]) {
          quizBestScores[activeTopicId] = quizScore;
        }"""

replacement_quiz_done = """        if (!quizBestScores[activeTopicId] || quizScore > quizBestScores[activeTopicId]) {
          quizBestScores[activeTopicId] = quizScore;
        }
        unlockBadge('english_star');
        playChimeSound('fanfare');"""

if 'unlockBadge(\'english_star\')' not in code:
    code = code.replace(target_quiz_done, replacement_quiz_done, 1)

target_quiz_whatsapp = """            <div style="display:flex;flex-direction:column;gap:10px;">
              <div style="display:flex;gap:10px;">
                <button class="action-btn" style="flex:1;background:#f59e0b;color:#0f172a;font-weight:800;" onclick="startTopicQuiz('${activeTopicId}')">"""

replacement_quiz_whatsapp = """            <div style="display:flex;flex-direction:column;gap:10px;">
              <button class="whatsapp-share-btn" style="width:100%;justify-content:center;font-size:14px;padding:12px;" onclick="openWhatsAppShare('🇬🇧 *LingoDay İngilizce Karne Raporu* 🇬🇧\\nÖğrenci ${topic.title} testini ' + quizScore + ' Puan ile tamamladı!\\n🎯 Başarı: %' + accuracy + '\\nTebrikler! 🏆')">
                📲 Karneni WhatsApp ile Paylaş
              </button>
              <div style="display:flex;gap:10px;">
                <button class="action-btn" style="flex:1;background:#f59e0b;color:#0f172a;font-weight:800;" onclick="startTopicQuiz('${activeTopicId}')">"""

if 'LingoDay İngilizce Karne Raporu' not in code:
    code = code.replace(target_quiz_whatsapp, replacement_quiz_whatsapp, 1)

# Write to index.html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(code)

# Synchronize to app/src/main/assets/index.html
with open('app/src/main/assets/index.html', 'w', encoding='utf-8') as f:
    f.write(code)

print('Step 6 complete: Days expert and English star badges added. Assets synchronized.')

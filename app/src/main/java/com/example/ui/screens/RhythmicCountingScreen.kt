package com.example.ui.screens

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.widget.Toast
import androidx.compose.animation.animateColorAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ContentCopy
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Stop
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableLongStateOf
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.QuizViewModel
import com.example.ui.theme.EmeraldSuccess
import com.example.ui.theme.RoseError
import com.example.ui.theme.SkyPrimary
import com.example.ui.theme.Slate400
import com.example.ui.theme.Slate700
import com.example.ui.theme.Slate800
import com.example.ui.theme.Slate900
import kotlinx.coroutines.delay

data class RhythmStepItem(
    val step: Int,
    val num: Int,
    val tr: String,
    val en: String,
    val mult: String,
    val explain: String,
    val speakTeach: String
)

data class RhythmExamQuestion(
    val badge: String,
    val visual: String,
    val prompt: String,
    val correct: String,
    val options: List<String>,
    val speakPrompt: String
)

private val rhythmSteps3 = listOf(
    RhythmStepItem(1, 3, "Üç", "Three", "1 × 3 = 3", "1 tane 3, 3 eder", "Üç! Bir tane üç, üç eder."),
    RhythmStepItem(2, 6, "Altı", "Six", "2 × 3 = 6", "2 tane 3, 6 eder", "Altı! İki tane üç, altı eder."),
    RhythmStepItem(3, 9, "Dokuz", "Nine", "3 × 3 = 9", "3 tane 3, 9 eder", "Dokuz! Üç tane üç, dokuz eder."),
    RhythmStepItem(4, 12, "On iki", "Twelve", "4 × 3 = 12", "4 tane 3, 12 eder", "On iki! Dört tane üç, on iki eder."),
    RhythmStepItem(5, 15, "On beş", "Fifteen", "5 × 3 = 15", "5 tane 3, 15 eder", "On beş! Beş tane üç, on beş eder."),
    RhythmStepItem(6, 18, "On sekiz", "Eighteen", "6 × 3 = 18", "6 tane 3, 18 eder", "On sekiz! Altı tane üç, on sekiz eder."),
    RhythmStepItem(7, 21, "Yirmi bir", "Twenty-one", "7 × 3 = 21", "7 tane 3, 21 eder", "Yirmi bir! Yedi tane üç, yirmi bir eder."),
    RhythmStepItem(8, 24, "Yirmi dört", "Twenty-four", "8 × 3 = 24", "8 tane 3, 24 eder", "Yirmi dört! Sekiz tane üç, yirmi dört eder."),
    RhythmStepItem(9, 27, "Yirmi yedi", "Twenty-seven", "9 × 3 = 27", "9 tane 3, 27 eder", "Yirmi yedi! Dokuz tane üç, yirmi yedi eder."),
    RhythmStepItem(10, 30, "Otuz", "Thirty", "10 × 3 = 30", "10 tane 3, 30 eder", "Otuz! On tane üç, otuz eder. Harikasın!")
)

private val rhythmSteps4 = listOf(
    RhythmStepItem(1, 4, "Dört", "Four", "1 × 4 = 4", "1 tane 4, 4 eder", "Dört! Bir tane dört, dört eder."),
    RhythmStepItem(2, 8, "Sekiz", "Eight", "2 × 4 = 8", "2 tane 4, 8 eder", "Sekiz! İki tane dört, sekiz eder."),
    RhythmStepItem(3, 12, "On iki", "Twelve", "3 × 4 = 12", "3 tane 4, 12 eder", "On iki! Üç tane dört, on iki eder."),
    RhythmStepItem(4, 16, "On altı", "Sixteen", "4 × 4 = 16", "4 tane 4, 16 eder", "On altı! Dört tane dört, on altı eder."),
    RhythmStepItem(5, 20, "Yirmi", "Twenty", "5 × 4 = 20", "5 tane 4, 20 eder", "Yirmi! Beş tane dört, yirmi eder."),
    RhythmStepItem(6, 24, "Yirmi dört", "Twenty-four", "6 × 4 = 24", "6 tane 4, 24 eder", "Yirmi dört! Altı tane dört, yirmi dört eder."),
    RhythmStepItem(7, 28, "Yirmi sekiz", "Twenty-eight", "7 × 4 = 28", "7 tane 4, 28 eder", "Yirmi sekiz! Yedi tane dört, yirmi sekiz eder."),
    RhythmStepItem(8, 32, "Otuz iki", "Thirty-two", "8 × 4 = 32", "8 tane 4, 32 eder", "Otuz iki! Sekiz tane dört, otuz iki eder."),
    RhythmStepItem(9, 36, "Otuz altı", "Thirty-six", "9 × 4 = 36", "9 tane 4, 36 eder", "Otuz altı! Dokuz tane dört, otuz altı eder."),
    RhythmStepItem(10, 40, "Kırk", "Forty", "10 × 4 = 40", "10 tane 4, 40 eder", "Kırk! On tane dört, kırk eder. Süpersin!")
)

private val examQuestions3 = listOf(
    RhythmExamQuestion(
        badge = "🍓 3'ER İLERİYE SAYMA",
        visual = "3 ➔ 6 ➔ 9 ➔ 12 ➔ ❓",
        prompt = "3'er 3'er ritmik sayarken 12'den hemen sonra hangi sayı gelir?",
        correct = "15 (On beş)",
        options = listOf("14 (On dört)", "15 (On beş)", "16 (On altı)", "18 (On sekiz)"),
        speakPrompt = "Üçer üçer sayarken on ikiden hemen sonra hangi sayı gelir?"
    ),
    RhythmExamQuestion(
        badge = "🍓 ÇARPIM TABLOSUNA HAZIRLIK",
        visual = "🍓🍓🍓 | 🍓🍓🍓 | 🍓🍓🍓",
        prompt = "Her tabakta 3 çilek var. 3 tabakta toplam kaç çilek olur? (3 × 3)",
        correct = "9 (Dokuz)",
        options = listOf("6 (Altı)", "8 (Sekiz)", "9 (Dokuz)", "12 (On iki)"),
        speakPrompt = "Üç tane üç kaç eder?"
    ),
    RhythmExamQuestion(
        badge = "🍓 ARADAKİ EKSİK SAYI",
        visual = "15 ➔ 18 ➔ ❓ ➔ 24 ➔ 27",
        prompt = "3'er ritmik saymada soru işaretli boşluğa hangi sayı gelmelidir?",
        correct = "21 (Yirmi bir)",
        options = listOf("19 (On dokuz)", "20 (Yirmi)", "21 (Yirmi bir)", "22 (Yirmi iki)"),
        speakPrompt = "On sekiz ile yirmi dört arasındaki sayı kaçtır?"
    ),
    RhythmExamQuestion(
        badge = "🍓 ÇARPIM HAZIRLIĞI (6 × 3)",
        visual = "🍓🍓🍓 × 6 Sepet",
        prompt = "6 tane 3 kaç eder? (3'er sayarken 6. sırada söylediğimiz sayı)",
        correct = "18 (On sekiz)",
        options = listOf("15 (On beş)", "18 (On sekiz)", "21 (Yirmi bir)", "24 (Yirmi dört)"),
        speakPrompt = "Altı tane üç kaç eder?"
    ),
    RhythmExamQuestion(
        badge = "🍓 SON BASAMAK (10 × 3)",
        visual = "18 ➔ 21 ➔ 24 ➔ 27 ➔ ❓",
        prompt = "3'er ritmik sayarken 27'den sonra ulaştığımız son sayı (10 tane 3) kaçtır?",
        correct = "30 (Otuz)",
        options = listOf("28 (Yirmi sekiz)", "29 (Yirmi dokuz)", "30 (Otuz)", "33 (Otuz üç)"),
        speakPrompt = "Yirmi yediden sonra hangi sayı gelir?"
    )
)

private val examQuestions4 = listOf(
    RhythmExamQuestion(
        badge = "🚗 4'ER İLERİYE SAYMA",
        visual = "4 ➔ 8 ➔ 12 ➔ 16 ➔ ❓",
        prompt = "4'er 4'er ritmik sayarken 16'dan hemen sonra hangi sayı gelir?",
        correct = "20 (Yirmi)",
        options = listOf("18 (On sekiz)", "20 (Yirmi)", "22 (Yirmi iki)", "24 (Yirmi dört)"),
        speakPrompt = "Dörder dörder sayarken on altıdan hemen sonra hangi sayı gelir?"
    ),
    RhythmExamQuestion(
        badge = "🚗 ÇARPIM TABLOSUNA HAZIRLIK",
        visual = "🚗🚗🚗🚗 | 🚗🚗🚗🚗 | 🚗🚗🚗🚗",
        prompt = "Her garajda 4 araba var. 3 garajda toplam kaç araba olur? (3 × 4)",
        correct = "12 (On iki)",
        options = listOf("8 (Sekiz)", "10 (On)", "12 (On iki)", "16 (On altı)"),
        speakPrompt = "Üç tane dört kaç eder?"
    ),
    RhythmExamQuestion(
        badge = "🚗 ARADAKİ EKSİK SAYI",
        visual = "20 ➔ 24 ➔ ❓ ➔ 32 ➔ 36",
        prompt = "4'er ritmik saymada 24 ile 32 arasındaki boşluğa hangi sayı gelmelidir?",
        correct = "28 (Yirmi sekiz)",
        options = listOf("26 (Yirmi altı)", "27 (Yirmi yedi)", "28 (Yirmi sekiz)", "30 (Otuz)"),
        speakPrompt = "Yirmi dört ile otuz iki arasındaki sayı kaçtır?"
    ),
    RhythmExamQuestion(
        badge = "🚗 ÇARPIM HAZIRLIĞI (6 × 4)",
        visual = "🚗🚗🚗🚗 × 6 Kutu",
        prompt = "6 tane 4 kaç eder? (4'er sayarken 6. sırada söylediğimiz sayı)",
        correct = "24 (Yirmi dört)",
        options = listOf("20 (Yirmi)", "24 (Yirmi dört)", "28 (Yirmi sekiz)", "32 (Otuz iki)"),
        speakPrompt = "Altı tane dört kaç eder?"
    ),
    RhythmExamQuestion(
        badge = "🚗 SON BASAMAK (10 × 4)",
        visual = "28 ➔ 32 ➔ 36 ➔ ❓",
        prompt = "4'er ritmik sayarken 36'dan sonra ulaştığımız 10. sayı (10 × 4) kaçtır?",
        correct = "40 (Kırk)",
        options = listOf("38 (Otuz sekiz)", "39 (Otuz dokuz)", "40 (Kırk)", "44 (Kırk dört)"),
        speakPrompt = "Otuz altıdan sonra hangi sayı gelir?"
    )
)

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun RhythmicCountingScreen(
    viewModel: QuizViewModel,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val scrollState = rememberScrollState()

    // 3 veya 4 seçimi
    var rhythmMode by remember { mutableIntStateOf(3) }
    // Aşama: 1 = Önce Öğret & Sesli Say, 2 = Sıra Sende Çocuk Saysın, 3 = Sınav
    var activeStage by remember { mutableIntStateOf(1) }

    // 1. Aşama state
    var isAutoCounting by remember { mutableStateOf(true) }
    var currentHighlightStep by remember { mutableIntStateOf(1) }
    var teachWithMultiplication by remember { mutableStateOf(false) }
    var showTeachFinishedDialog by remember { mutableStateOf(false) }

    // 2. Aşama (Çocuğun sayması & Süre/Parmak hesabı analizi) state
    var practiceStep by remember { mutableIntStateOf(1) }
    var practiceCompleted by remember { mutableStateOf(false) }
    var practiceWrongFeedback by remember { mutableStateOf("") }
    var practiceStartTime by remember { mutableLongStateOf(0L) }
    var practiceDurationSeconds by remember { mutableLongStateOf(0L) }
    var practiceMistakes by remember { mutableIntStateOf(0) }
    var practiceCurrentAttempts by remember { mutableIntStateOf(1) }
    val practiceStepRecords = remember { mutableStateListOf<Triple<Int, Int, Int>>() }

    // 3. Aşama (Sınav) state
    var examFilter by remember { mutableStateOf("both") } // "3", "4", "both"
    var examIndex by remember { mutableIntStateOf(0) }
    var examScore by remember { mutableIntStateOf(0) }
    var examStreak by remember { mutableIntStateOf(0) }
    var examAnswered by remember { mutableStateOf(false) }
    val examWrongOptions = remember { mutableStateListOf<String>() }

    val activeSteps = if (rhythmMode == 3) rhythmSteps3 else rhythmSteps4
    val emojiGroup = if (rhythmMode == 3) "🍓🍓🍓" else "🚗🚗🚗🚗"
    val accentColor = if (rhythmMode == 3) Color(0xFFEC4899) else Color(0xFF06B6D4)

    // 1. Aşamada otomatik sesli öğretme ve sayma döngüsü
    LaunchedEffect(rhythmMode, activeStage, isAutoCounting, teachWithMultiplication) {
        if (activeStage == 1 && isAutoCounting) {
            val intro = if (rhythmMode == 3) {
                "Haydi 3'er 3'er 30'a kadar beraber sayalım!"
            } else {
                "Haydi 4'er 4'er 40'a kadar beraber sayalım!"
            }
            viewModel.speakTurkish(intro)
            delay(2300)
            for (stepIdx in 1..activeSteps.size) {
                if (!isAutoCounting || activeStage != 1) break
                currentHighlightStep = stepIdx
                val item = activeSteps[stepIdx - 1]
                val speech = if (teachWithMultiplication) item.speakTeach else item.tr
                viewModel.speakTurkish(speech)
                delay(if (teachWithMultiplication) 2300L else 1350L)
            }
            if (isAutoCounting && activeStage == 1) {
                isAutoCounting = false
                showTeachFinishedDialog = true
                viewModel.speakTurkish("Harika dinledin! Sayma tamamlandı. Tekrar sayayım mı yoksa sonraki aşamaya geçelim mi?")
            }
        }
    }

    if (showTeachFinishedDialog) {
        AlertDialog(
            onDismissRequest = { showTeachFinishedDialog = false },
            title = { Text("🎉 Sayma Tamamlandı!", fontWeight = FontWeight.Bold) },
            text = { Text("Öğretmen saymayı bitirdi. Tekrar sayayım mı yoksa sonraki aşamaya geçip sen mi sayacaksın?") },
            confirmButton = {
                Button(
                    onClick = {
                        showTeachFinishedDialog = false
                        activeStage = 2
                        practiceStep = 1
                        practiceCompleted = false
                        practiceWrongFeedback = ""
                        practiceStartTime = System.currentTimeMillis()
                        practiceDurationSeconds = 0L
                        practiceMistakes = 0
                        practiceCurrentAttempts = 1
                        practiceStepRecords.clear()
                        viewModel.speakTurkish("Şimdi sıra sende! İlk sayımız kaç?")
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = EmeraldSuccess)
                ) {
                    Text("🗣️ Sen Say (2. Aşama)")
                }
            },
            dismissButton = {
                OutlinedButton(
                    onClick = {
                        showTeachFinishedDialog = false
                        currentHighlightStep = 1
                        isAutoCounting = true
                    }
                ) {
                    Text("🔄 Tekrar Say")
                }
            }
        )
    }

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(Slate900)
            .padding(horizontal = 12.dp, vertical = 8.dp),
        contentAlignment = Alignment.TopCenter
    ) {
        Column(
            modifier = Modifier
                .widthIn(max = 650.dp)
                .fillMaxWidth()
                .verticalScroll(scrollState),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // ÜST BAŞLIK VE GITHUB KODU KOPYALA BUTONU
            Card(
                colors = CardDefaults.cardColors(containerColor = Slate800),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(2.dp, Color(0xFFF472B6), RoundedCornerShape(16.dp))
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(
                            Brush.horizontalGradient(
                                listOf(Color(0xFF4F46E5), Color(0xFF7C3AED), Color(0xFFDB2777))
                            )
                        )
                        .padding(14.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "🚀 3'er & 4'er Ritmik Sayma",
                            color = Color.White,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.ExtraBold
                        )
                        Text(
                            text = "Çarpım Tablosuna Hazırlık • Önce Öğretir, Sonra Çocuk Sayar + Sınav",
                            color = Color(0xFFFCE7F3),
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Medium
                        )
                    }

                    Button(
                        onClick = { copyIndexHtmlFromAssets(context) },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color(0xFFFDE047),
                            contentColor = Color(0xFF0F172A)
                        ),
                        shape = RoundedCornerShape(10.dp),
                        contentPadding = PaddingValues(horizontal = 10.dp, vertical = 6.dp),
                        modifier = Modifier.testTag("copy_github_html_button")
                    ) {
                        Icon(
                            imageVector = Icons.Default.ContentCopy,
                            contentDescription = "GitHub index.html Kopyala",
                            modifier = Modifier.size(15.dp)
                        )
                        Text(
                            text = " GitHub Kodu",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.ExtraBold
                        )
                    }
                }
            }

            // 3'ER VE 4'ER MOD SEÇİCİ
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                val is3 = rhythmMode == 3
                Button(
                    onClick = {
                        rhythmMode = 3
                        practiceStep = 1
                        practiceCompleted = false
                        practiceWrongFeedback = ""
                        if (activeStage == 1) {
                            currentHighlightStep = 1
                            isAutoCounting = true
                        }
                    },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (is3) Color(0xFFEC4899) else Slate800,
                        contentColor = Color.White
                    ),
                    shape = RoundedCornerShape(14.dp),
                    modifier = Modifier
                        .weight(1f)
                        .height(56.dp)
                        .border(
                            width = 2.dp,
                            color = if (is3) Color(0xFFFDA4AF) else Slate700,
                            shape = RoundedCornerShape(14.dp)
                        )
                        .testTag("mode_3s_button")
                ) {
                    Text(
                        text = "🍓 3'er Sayma\n(3 ➔ 30)",
                        fontSize = 13.sp,
                        fontWeight = FontWeight.ExtraBold,
                        textAlign = TextAlign.Center
                    )
                }

                val is4 = rhythmMode == 4
                Button(
                    onClick = {
                        rhythmMode = 4
                        practiceStep = 1
                        practiceCompleted = false
                        practiceWrongFeedback = ""
                        if (activeStage == 1) {
                            currentHighlightStep = 1
                            isAutoCounting = true
                        }
                    },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (is4) Color(0xFF06B6D4) else Slate800,
                        contentColor = Color.White
                    ),
                    shape = RoundedCornerShape(14.dp),
                    modifier = Modifier
                        .weight(1f)
                        .height(56.dp)
                        .border(
                            width = 2.dp,
                            color = if (is4) Color(0xFF7DD3FC) else Slate700,
                            shape = RoundedCornerShape(14.dp)
                        )
                        .testTag("mode_4s_button")
                ) {
                    Text(
                        text = "🚗 4'er Sayma\n(4 ➔ 40)",
                        fontSize = 13.sp,
                        fontWeight = FontWeight.ExtraBold,
                        textAlign = TextAlign.Center
                    )
                }
            }

            // 3 AŞAMALI PEDAGOJİK AKIŞ SEKMELERİ
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                StageTabButton(
                    title = "🎓 1. Öğren",
                    subtitle = "Sesli Dinle",
                    selected = activeStage == 1,
                    onClick = {
                        activeStage = 1
                        currentHighlightStep = 1
                        isAutoCounting = true
                    },
                    modifier = Modifier
                        .weight(1f)
                        .testTag("stage_1_learn_tab")
                )
                StageTabButton(
                    title = "🗣️ 2. Sen Say",
                    subtitle = "Sıra Sende",
                    selected = activeStage == 2,
                    onClick = {
                        isAutoCounting = false
                        activeStage = 2
                        practiceStep = 1
                        practiceCompleted = false
                        practiceWrongFeedback = ""
                        practiceStartTime = System.currentTimeMillis()
                        practiceDurationSeconds = 0L
                        practiceMistakes = 0
                        practiceCurrentAttempts = 1
                        practiceStepRecords.clear()
                        viewModel.speakTurkish("Şimdi sıra sende! Sırayla sayalım, ilk sayımız kaç?")
                    },
                    modifier = Modifier
                        .weight(1f)
                        .testTag("stage_2_practice_tab")
                )
                StageTabButton(
                    title = "🏆 3. Sınav",
                    subtitle = "Çarpım Hazırlık",
                    selected = activeStage == 3,
                    onClick = {
                        isAutoCounting = false
                        activeStage = 3
                        examIndex = 0
                        examScore = 0
                        examStreak = 0
                        examAnswered = false
                        examWrongOptions.clear()
                    },
                    modifier = Modifier
                        .weight(1f)
                        .testTag("stage_3_exam_tab")
                )
            }

            // AŞAMA 1: ÖNCE ÖĞRET VE SESLİ SAY
            if (activeStage == 1) {
                Card(
                    colors = CardDefaults.cardColors(containerColor = Slate800),
                    shape = RoundedCornerShape(16.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(2.dp, accentColor, RoundedCornerShape(16.dp))
                ) {
                    Column(
                        modifier = Modifier.padding(14.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = if (rhythmMode == 3) "🎓 3'er 3'er 30'a Kadar Öğrenelim" else "🎓 4'er 4'er 40'a Kadar Öğrenelim",
                                    color = Color.White,
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.ExtraBold
                                )
                                Text(
                                    text = "Öğretmen sırayla sesli sayar. Kartlara dokunarak da dinleyebilirsin!",
                                    color = Slate400,
                                    fontSize = 12.sp
                                )
                            }

                            Button(
                                onClick = {
                                    if (isAutoCounting) {
                                        isAutoCounting = false
                                        viewModel.stopSpeaking()
                                    } else {
                                        currentHighlightStep = 1
                                        isAutoCounting = true
                                    }
                                },
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = if (isAutoCounting) RoseError else EmeraldSuccess,
                                    contentColor = Color.White
                                ),
                                shape = RoundedCornerShape(10.dp),
                                modifier = Modifier.testTag("auto_count_toggle_button")
                            ) {
                                Icon(
                                    imageVector = if (isAutoCounting) Icons.Default.Stop else Icons.Default.PlayArrow,
                                    contentDescription = if (isAutoCounting) "Durdur" else "Baştan Say"
                                )
                                Text(
                                    text = if (isAutoCounting) " Durdur" else " Sesli Say!",
                                    fontWeight = FontWeight.ExtraBold,
                                    fontSize = 12.sp
                                )
                            }
                        }

                        // Ses stili seçimi (Sadece sayılar vs Çarpım açıklamalı)
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            OutlinedButton(
                                onClick = {
                                    teachWithMultiplication = false
                                    currentHighlightStep = 1
                                    isAutoCounting = true
                                },
                                shape = RoundedCornerShape(10.dp),
                                modifier = Modifier.weight(1f)
                            ) {
                                Text(
                                    text = if (!teachWithMultiplication) "✅ Ritmik Say (3, 6, 9...)" else "🔢 Ritmik Say (3, 6, 9...)",
                                    color = if (!teachWithMultiplication) Color(0xFFFDE047) else Slate400,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                            OutlinedButton(
                                onClick = {
                                    teachWithMultiplication = true
                                    currentHighlightStep = 1
                                    isAutoCounting = true
                                },
                                shape = RoundedCornerShape(10.dp),
                                modifier = Modifier.weight(1f)
                            ) {
                                Text(
                                    text = if (teachWithMultiplication) "✅ Çarpımlı Anlat (2×3=6)" else "✖️ Çarpımlı Anlat (2×3=6)",
                                    color = if (teachWithMultiplication) Color(0xFFFDE047) else Slate400,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }

                        // Hızlı sayı şeridi
                        FlowRow(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(12.dp))
                                .background(Slate900)
                                .padding(10.dp),
                            horizontalArrangement = Arrangement.spacedBy(6.dp, Alignment.CenterHorizontally),
                            verticalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            activeSteps.forEach { item ->
                                val isHighlighted = currentHighlightStep == item.step
                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(8.dp))
                                        .background(if (isHighlighted) Color(0xFFFDE047) else Slate800)
                                        .border(
                                            1.dp,
                                            if (isHighlighted) Color(0xFFF59E0B) else Slate700,
                                            RoundedCornerShape(8.dp)
                                        )
                                        .clickable {
                                            isAutoCounting = false
                                            currentHighlightStep = item.step
                                            viewModel.speakTurkish("${item.tr}. ${item.explain}")
                                        }
                                        .padding(horizontal = 10.dp, vertical = 6.dp)
                                ) {
                                    Text(
                                        text = "${item.num}",
                                        color = if (isHighlighted) Color(0xFF0F172A) else Color.White,
                                        fontWeight = FontWeight.ExtraBold,
                                        fontSize = 15.sp
                                    )
                                }
                            }
                        }

                        // 10 Adım Görsel Kartlar (2'li Satırlar)
                        activeSteps.chunked(2).forEach { pair ->
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(10.dp)
                            ) {
                                pair.forEach { item ->
                                    val isCurrent = currentHighlightStep == item.step
                                    val cardBg by animateColorAsState(
                                        if (isCurrent) Color(0xFF3B2F1E) else Slate900,
                                        label = "cardBg"
                                    )
                                    val borderColor = if (isCurrent) Color(0xFFFDE047) else Slate700

                                    Card(
                                        colors = CardDefaults.cardColors(containerColor = cardBg),
                                        shape = RoundedCornerShape(14.dp),
                                        modifier = Modifier
                                            .weight(1f)
                                            .border(2.dp, borderColor, RoundedCornerShape(14.dp))
                                            .clickable {
                                                isAutoCounting = false
                                                currentHighlightStep = item.step
                                                viewModel.speakTurkish("${item.tr}. ${item.explain}")
                                            }
                                            .testTag("rhythm_card_${item.num}")
                                    ) {
                                        Column(
                                            modifier = Modifier
                                                .fillMaxWidth()
                                                .padding(12.dp),
                                            horizontalAlignment = Alignment.CenterHorizontally
                                        ) {
                                            Row(
                                                modifier = Modifier.fillMaxWidth(),
                                                horizontalArrangement = Arrangement.SpaceBetween,
                                                verticalAlignment = Alignment.CenterVertically
                                            ) {
                                                Text(
                                                    text = "${item.step}. Adım",
                                                    color = Slate400,
                                                    fontSize = 10.sp,
                                                    fontWeight = FontWeight.Bold
                                                )
                                                Icon(
                                                    imageVector = Icons.Default.VolumeUp,
                                                    contentDescription = "Dinle",
                                                    tint = if (isCurrent) Color(0xFFFDE047) else SkyPrimary,
                                                    modifier = Modifier.size(16.dp)
                                                )
                                            }

                                            Text(
                                                text = "${item.num}",
                                                color = if (isCurrent) Color(0xFFFDE047) else Color.White,
                                                fontSize = 32.sp,
                                                fontWeight = FontWeight.Black
                                            )
                                            Text(
                                                text = "\"${item.tr}\" (${item.en})",
                                                color = SkyPrimary,
                                                fontSize = 12.sp,
                                                fontWeight = FontWeight.Bold
                                            )

                                            Box(
                                                modifier = Modifier
                                                    .padding(top = 4.dp)
                                                    .clip(RoundedCornerShape(6.dp))
                                                    .background(Color(0xFF312E81))
                                                    .padding(horizontal = 8.dp, vertical = 3.dp)
                                            ) {
                                                Text(
                                                    text = item.mult,
                                                    color = Color(0xFFC7D2FE),
                                                    fontSize = 11.sp,
                                                    fontWeight = FontWeight.ExtraBold
                                                )
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // 2. Aşamaya Geçiş Butonu
                        Button(
                            onClick = {
                                isAutoCounting = false
                                activeStage = 2
                                practiceStep = 1
                                practiceCompleted = false
                                practiceWrongFeedback = ""
                                practiceStartTime = System.currentTimeMillis()
                                practiceDurationSeconds = 0L
                                practiceMistakes = 0
                                practiceCurrentAttempts = 1
                                practiceStepRecords.clear()
                                viewModel.speakTurkish("Şimdi sıra sende! İlk sayımız kaç? Yüksek sesle söyle ve seç!")
                            },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = EmeraldSuccess,
                                contentColor = Color.White
                            ),
                            shape = RoundedCornerShape(12.dp),
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(52.dp)
                                .testTag("go_to_stage_2_button")
                        ) {
                            Text(
                                text = "🗣️ Öğrendim! Şimdi Sıra Bende (2. Aşamaya Geç ➔)",
                                fontSize = 14.sp,
                                fontWeight = FontWeight.ExtraBold
                            )
                        }
                    }
                }
            }

            // AŞAMA 2: SIRA SENDE (ÇOCUĞUN SAYMASI)
            if (activeStage == 2) {
                Card(
                    colors = CardDefaults.cardColors(containerColor = Slate800),
                    shape = RoundedCornerShape(16.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(2.dp, EmeraldSuccess, RoundedCornerShape(16.dp))
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(14.dp)
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "🗣️ 2. Aşama: Şimdi Sen Say! ($practiceStep / 10)",
                                color = Color.White,
                                fontSize = 16.sp,
                                fontWeight = FontWeight.ExtraBold
                            )
                            OutlinedButton(
                                onClick = {
                                    practiceStep = 1
                                    practiceCompleted = false
                                    practiceWrongFeedback = ""
                                },
                                shape = RoundedCornerShape(8.dp),
                                contentPadding = PaddingValues(horizontal = 10.dp, vertical = 4.dp)
                            ) {
                                Icon(Icons.Default.Refresh, contentDescription = "Sıfırla", modifier = Modifier.size(14.dp))
                                Text(" Baştan", fontSize = 11.sp)
                            }
                        }

                        // İlerleme kutucukları
                        FlowRow(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(6.dp, Alignment.CenterHorizontally),
                            verticalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            activeSteps.forEach { item ->
                                val isDone = practiceCompleted || item.step < practiceStep
                                val isCurrent = !practiceCompleted && item.step == practiceStep
                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(10.dp))
                                        .background(
                                            when {
                                                isDone -> EmeraldSuccess.copy(alpha = 0.25f)
                                                isCurrent -> Color(0xFFF59E0B).copy(alpha = 0.3f)
                                                else -> Slate900
                                            }
                                        )
                                        .border(
                                            2.dp,
                                            when {
                                                isDone -> EmeraldSuccess
                                                isCurrent -> Color(0xFFFDE047)
                                                else -> Slate700
                                            },
                                            RoundedCornerShape(10.dp)
                                        )
                                        .padding(horizontal = 10.dp, vertical = 6.dp),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(
                                        text = when {
                                            isDone -> "${item.num}"
                                            isCurrent -> "❓"
                                            else -> "🔒"
                                        },
                                        color = Color.White,
                                        fontWeight = FontWeight.ExtraBold,
                                        fontSize = 15.sp
                                    )
                                }
                            }
                        }

                        if (practiceCompleted) {
                            val speedScore = when {
                                practiceDurationSeconds <= 22 -> 50
                                practiceDurationSeconds <= 32 -> 44
                                practiceDurationSeconds <= 48 -> 30
                                practiceDurationSeconds <= 65 -> 18
                                else -> 8
                            }
                            val mistakePenalty = practiceMistakes * 6
                            val accuracyScore = (50 - mistakePenalty).coerceAtLeast(0)
                            val totalScore = (speedScore + accuracyScore).coerceIn(10, 100)
                            val (statusText, statusColor) = when {
                                practiceDurationSeconds <= 22 -> "⚡ YILDIRIM EZBER (Parmak Hesabı YOK!)" to Color(0xFF10B981)
                                practiceDurationSeconds <= 32 -> "👏 ÇOK HIZLI (Parmak Hesabı Yok)" to Color(0xFF38BDF8)
                                practiceDurationSeconds <= 48 -> "✋ ORTA HIZ (Hafif Parmak Hesabı)" to Color(0xFFF59E0B)
                                else -> "🐢 PARMAK HESABI TESPİT EDİLDİ" to Color(0xFFEF4444)
                            }

                            Card(
                                colors = CardDefaults.cardColors(containerColor = Slate900),
                                shape = RoundedCornerShape(16.dp),
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .border(2.dp, statusColor, RoundedCornerShape(16.dp))
                            ) {
                                Column(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(16.dp),
                                    horizontalAlignment = Alignment.CenterHorizontally,
                                    verticalArrangement = Arrangement.spacedBy(10.dp)
                                ) {
                                    Text(
                                        text = statusText,
                                        color = statusColor,
                                        fontSize = 14.sp,
                                        fontWeight = FontWeight.Black
                                    )
                                    Text(
                                        text = "$totalScore / 100 PUAN",
                                        color = Color(0xFFFDE047),
                                        fontSize = 32.sp,
                                        fontWeight = FontWeight.Black
                                    )
                                    Text(
                                        text = "⏱️ Süre: $practiceDurationSeconds sn (İdeal: ~20 sn) | ❌ Hata: $practiceMistakes defa",
                                        color = Color.White,
                                        fontSize = 13.sp
                                    )

                                    Button(
                                        onClick = {
                                            practiceStep = 1
                                            practiceCompleted = false
                                            practiceWrongFeedback = ""
                                            practiceStartTime = System.currentTimeMillis()
                                            practiceDurationSeconds = 0L
                                            practiceMistakes = 0
                                            practiceCurrentAttempts = 1
                                            practiceStepRecords.clear()
                                        },
                                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB)),
                                        shape = RoundedCornerShape(12.dp),
                                        modifier = Modifier.fillMaxWidth()
                                    ) {
                                        Text("🔄 Yeniden Dene (Testi Başa Al)", fontWeight = FontWeight.Bold)
                                    }

                                    Button(
                                        onClick = {
                                            activeStage = 3
                                            examIndex = 0
                                            examScore = 0
                                            examStreak = 0
                                            examAnswered = false
                                            examWrongOptions.clear()
                                        },
                                        colors = ButtonDefaults.buttonColors(
                                            containerColor = Color(0xFFF59E0B),
                                            contentColor = Color(0xFF0F172A)
                                        ),
                                        shape = RoundedCornerShape(12.dp),
                                        modifier = Modifier.fillMaxWidth()
                                    ) {
                                        Text(
                                            text = "🏆 3. Aşamaya Geç: Ritmik Sayma Sınavı ➔",
                                            fontWeight = FontWeight.Black,
                                            fontSize = 14.sp
                                        )
                                    }
                                }
                            }
                        } else {
                            val currentTarget = activeSteps[practiceStep - 1]
                            val choices = remember(rhythmMode, practiceStep) {
                                val correct = currentTarget.num
                                val stepVal = rhythmMode
                                listOf(
                                    correct,
                                    correct + 1,
                                    (correct - 1).coerceAtLeast(1),
                                    correct + stepVal
                                ).distinct().sorted()
                            }

                            Column(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(RoundedCornerShape(14.dp))
                                    .background(Slate900)
                                    .border(2.dp, Color(0xFFFDE047), RoundedCornerShape(14.dp))
                                    .padding(16.dp),
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.spacedBy(10.dp)
                            ) {
                                Text(
                                    text = "${currentTarget.step}. BASAMAK (${currentTarget.mult.substringBefore("=").trim()} = ❓)",
                                    color = Color(0xFFFDE047),
                                    fontSize = 13.sp,
                                    fontWeight = FontWeight.ExtraBold
                                )
                                Text(
                                    text = if (currentTarget.step == 1) {
                                        "İlk sayımız kaçtır? Yüksek sesle söyle ve dokun!"
                                    } else {
                                        "${activeSteps[currentTarget.step - 2].num} sayısından sonra $rhythmMode eklersek kaç olur?"
                                    },
                                    color = Color.White,
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Bold,
                                    textAlign = TextAlign.Center
                                )

                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.spacedBy(10.dp, Alignment.CenterHorizontally)
                                ) {
                                    choices.forEach { numChoice ->
                                        Button(
                                            onClick = {
                                                if (numChoice == currentTarget.num) {
                                                    practiceWrongFeedback = ""
                                                    practiceStepRecords.add(Triple(currentTarget.step, currentTarget.num, practiceCurrentAttempts))
                                                    practiceCurrentAttempts = 1
                                                    viewModel.speakTurkish("Aferin, ${currentTarget.tr}!")
                                                    if (practiceStep >= activeSteps.size) {
                                                        practiceDurationSeconds = ((System.currentTimeMillis() - practiceStartTime) / 1000).coerceAtLeast(1)
                                                        practiceCompleted = true
                                                    } else {
                                                        practiceStep++
                                                    }
                                                } else {
                                                    practiceMistakes++
                                                    practiceCurrentAttempts++
                                                    practiceWrongFeedback = "❌ $numChoice değil! ${currentTarget.step} tane $rhythmMode kaç eder? Tekrar sayalım!"
                                                    viewModel.speakTurkish("Tekrar dene! ${currentTarget.step} tane $rhythmMode kaç eder?")
                                                }
                                            },
                                            colors = ButtonDefaults.buttonColors(
                                                containerColor = Color(0xFF2563EB),
                                                contentColor = Color.White
                                            ),
                                            shape = RoundedCornerShape(14.dp),
                                            modifier = Modifier
                                                .weight(1f)
                                                .height(58.dp)
                                                .testTag("practice_choice_$numChoice")
                                        ) {
                                            Text(
                                                text = "$numChoice",
                                                fontSize = 22.sp,
                                                fontWeight = FontWeight.Black
                                            )
                                        }
                                    }
                                }

                                if (practiceWrongFeedback.isNotEmpty()) {
                                    Text(
                                        text = practiceWrongFeedback,
                                        color = RoseError,
                                        fontSize = 13.sp,
                                        fontWeight = FontWeight.Bold,
                                        textAlign = TextAlign.Center
                                    )
                                }
                            }
                        }
                    }
                }
            }

            // AŞAMA 3: RİTMİK SAYMA VE ÇARPIM TABLOSUNA HAZIRLIK SINAVI
            if (activeStage == 3) {
                val examQuestions = remember(examFilter) {
                    when (examFilter) {
                        "3" -> examQuestions3
                        "4" -> examQuestions4
                        else -> (examQuestions3 + examQuestions4)
                    }
                }

                Card(
                    colors = CardDefaults.cardColors(containerColor = Slate800),
                    shape = RoundedCornerShape(16.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(2.dp, Color(0xFFF59E0B), RoundedCornerShape(16.dp))
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        // Sınav Filtresi (3'er / 4'er / Karışık) ve Puan
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                listOf(
                                    "3" to "🍓 3'er",
                                    "4" to "🚗 4'er",
                                    "both" to "🏆 Karışık"
                                ).forEach { (key, label) ->
                                    val selected = examFilter == key
                                    Button(
                                        onClick = {
                                            examFilter = key
                                            examIndex = 0
                                            examScore = 0
                                            examStreak = 0
                                            examAnswered = false
                                            examWrongOptions.clear()
                                        },
                                        colors = ButtonDefaults.buttonColors(
                                            containerColor = if (selected) Color(0xFFF59E0B) else Slate900,
                                            contentColor = if (selected) Color(0xFF0F172A) else Color.White
                                        ),
                                        contentPadding = PaddingValues(horizontal = 10.dp, vertical = 4.dp),
                                        shape = RoundedCornerShape(8.dp)
                                    ) {
                                        Text(label, fontSize = 11.sp, fontWeight = FontWeight.ExtraBold)
                                    }
                                }
                            }

                            Text(
                                text = "⭐ $examScore Puan  🔥 $examStreak",
                                color = Color(0xFFFDE047),
                                fontSize = 13.sp,
                                fontWeight = FontWeight.ExtraBold
                            )
                        }

                        if (examIndex >= examQuestions.size) {
                            Column(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(16.dp),
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.spacedBy(10.dp)
                            ) {
                                Text("🏅🌟", fontSize = 48.sp)
                                Text(
                                    text = "Ritmik Sayma Sınavı Tamamlandı!",
                                    color = Color(0xFFFDE047),
                                    fontSize = 20.sp,
                                    fontWeight = FontWeight.Black,
                                    textAlign = TextAlign.Center
                                )
                                Text(
                                    text = "Toplam Puan: $examScore / ${examQuestions.size * 10}",
                                    color = Color.White,
                                    fontSize = 22.sp,
                                    fontWeight = FontWeight.ExtraBold
                                )
                                Button(
                                    onClick = {
                                        examIndex = 0
                                        examScore = 0
                                        examStreak = 0
                                        examAnswered = false
                                        examWrongOptions.clear()
                                    },
                                    colors = ButtonDefaults.buttonColors(
                                        containerColor = EmeraldSuccess,
                                        contentColor = Color.White
                                    ),
                                    shape = RoundedCornerShape(12.dp)
                                ) {
                                    Text("🔄 Sınavı Tekrar Çöz", fontWeight = FontWeight.ExtraBold)
                                }
                            }
                        } else {
                            val q = examQuestions[examIndex]
                            Column(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(RoundedCornerShape(14.dp))
                                    .background(Slate900)
                                    .padding(16.dp),
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.spacedBy(12.dp)
                            ) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(
                                        text = q.badge,
                                        color = SkyPrimary,
                                        fontSize = 11.sp,
                                        fontWeight = FontWeight.ExtraBold
                                    )
                                    Text(
                                        text = "Soru ${examIndex + 1} / ${examQuestions.size}",
                                        color = Slate400,
                                        fontSize = 12.sp,
                                        fontWeight = FontWeight.Bold
                                    )
                                }

                                Box(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .clip(RoundedCornerShape(12.dp))
                                        .background(Slate800)
                                        .padding(14.dp),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(
                                        text = q.visual,
                                        color = Color(0xFFFDE047),
                                        fontSize = 22.sp,
                                        fontWeight = FontWeight.Black,
                                        textAlign = TextAlign.Center
                                    )
                                }

                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.Center
                                ) {
                                    Text(
                                        text = q.prompt,
                                        color = Color.White,
                                        fontSize = 15.sp,
                                        fontWeight = FontWeight.Bold,
                                        textAlign = TextAlign.Center,
                                        modifier = Modifier.weight(1f)
                                    )
                                    OutlinedButton(
                                        onClick = { viewModel.speakTurkish(q.speakPrompt) },
                                        shape = RoundedCornerShape(8.dp),
                                        contentPadding = PaddingValues(8.dp)
                                    ) {
                                        Icon(Icons.Default.VolumeUp, contentDescription = "Soruyu Dinle")
                                    }
                                }

                                q.options.chunked(2).forEach { rowOpts ->
                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                                    ) {
                                        rowOpts.forEach { opt ->
                                            val isWrong = examWrongOptions.contains(opt)
                                            val isCorrect = examAnswered && opt == q.correct
                                            Button(
                                                onClick = {
                                                    if (!examAnswered && !isWrong) {
                                                        if (opt == q.correct) {
                                                            examAnswered = true
                                                            if (examWrongOptions.isEmpty()) {
                                                                examScore += 10
                                                                examStreak++
                                                            } else {
                                                                examScore += 5
                                                            }
                                                            viewModel.speakTurkish("Harika! Doğru cevap!")
                                                        } else {
                                                            examWrongOptions.add(opt)
                                                            examStreak = 0
                                                            viewModel.speakTurkish("Tekrar dikkatlice sayalım!")
                                                        }
                                                    }
                                                },
                                                colors = ButtonDefaults.buttonColors(
                                                    containerColor = when {
                                                        isCorrect -> EmeraldSuccess
                                                        isWrong -> RoseError.copy(alpha = 0.4f)
                                                        else -> Slate800
                                                    },
                                                    contentColor = Color.White
                                                ),
                                                shape = RoundedCornerShape(12.dp),
                                                modifier = Modifier
                                                    .weight(1f)
                                                    .height(54.dp)
                                                    .border(
                                                        1.dp,
                                                        when {
                                                            isCorrect -> EmeraldSuccess
                                                            isWrong -> RoseError
                                                            else -> Slate700
                                                        },
                                                        RoundedCornerShape(12.dp)
                                                    )
                                            ) {
                                                Text(
                                                    text = opt,
                                                    fontSize = 14.sp,
                                                    fontWeight = FontWeight.ExtraBold
                                                )
                                            }
                                        }
                                    }
                                }

                                if (examAnswered) {
                                    Button(
                                        onClick = {
                                            examIndex++
                                            examAnswered = false
                                            examWrongOptions.clear()
                                        },
                                        colors = ButtonDefaults.buttonColors(
                                            containerColor = EmeraldSuccess,
                                            contentColor = Color.White
                                        ),
                                        shape = RoundedCornerShape(10.dp),
                                        modifier = Modifier.fillMaxWidth()
                                    ) {
                                        Text(
                                            text = "✅ Doğru! Sıradaki Soru ➔",
                                            fontWeight = FontWeight.ExtraBold,
                                            fontSize = 14.sp
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun StageTabButton(
    title: String,
    subtitle: String,
    selected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .clip(RoundedCornerShape(12.dp))
            .background(if (selected) Color(0xFFF59E0B).copy(alpha = 0.2f) else Slate800)
            .border(
                width = 2.dp,
                color = if (selected) Color(0xFFF59E0B) else Slate700,
                shape = RoundedCornerShape(12.dp)
            )
            .clickable(onClick = onClick)
            .padding(vertical = 8.dp, horizontal = 6.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = title,
            color = if (selected) Color(0xFFFDE047) else Color.White,
            fontSize = 12.sp,
            fontWeight = FontWeight.ExtraBold,
            textAlign = TextAlign.Center
        )
        Text(
            text = subtitle,
            color = if (selected) Color(0xFFFDE047).copy(alpha = 0.9f) else Slate400,
            fontSize = 10.sp,
            textAlign = TextAlign.Center
        )
    }
}

fun copyIndexHtmlFromAssets(context: Context) {
    try {
        val htmlContent = context.assets.open("index.html").bufferedReader().use { it.readText() }
        val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        val clip = ClipData.newPlainText("LingoDays index.html", htmlContent)
        clipboard.setPrimaryClip(clip)
        Toast.makeText(
            context,
            "✅ Güncel index.html (3'er & 4'er Ritmik Sayma + 6 Ünite) panoya kopyalandı! GitHub'a yapıştırabilirsiniz.",
            Toast.LENGTH_LONG
        ).show()
    } catch (e: Exception) {
        Toast.makeText(context, "Kopyalama hatası: ${e.message}", Toast.LENGTH_SHORT).show()
    }
}

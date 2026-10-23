package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Tune
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.QuizUiState
import com.example.ui.QuizViewModel
import com.example.ui.components.FeedbackBanner
import com.example.ui.components.OptionButton
import com.example.ui.components.OptionButtonState
import com.example.ui.components.QuestionCard
import com.example.ui.components.TopHeaderBar
import com.example.ui.components.VictoryDialog
import com.example.ui.theme.Slate400
import com.example.ui.theme.Slate600
import com.example.ui.theme.Slate800
import com.example.ui.theme.Slate900

@Composable
fun QuizScreen(
    uiState: QuizUiState,
    viewModel: QuizViewModel,
    onOpenSettings: () -> Unit,
    modifier: Modifier = Modifier
) {
    val scrollState = rememberScrollState()
    val interactionSource = remember { MutableInteractionSource() }

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(Slate900)
            .clickable(interactionSource = interactionSource, indication = null) {
                viewModel.recordUserActivity()
            }
            .padding(horizontal = 16.dp, vertical = 8.dp),
        contentAlignment = Alignment.TopCenter
    ) {
        Column(
            modifier = Modifier
                .widthIn(max = 500.dp)
                .fillMaxWidth()
                .verticalScroll(scrollState),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // App Title Header & Quick Actions
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 4.dp, vertical = 4.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Lingo Ders Arkadaşım",
                        color = Color.White,
                        fontSize = 22.sp,
                        fontWeight = FontWeight.ExtraBold,
                        letterSpacing = 0.5.sp
                    )
                    Text(
                        text = "İngilizce Günler & Ödev Testi",
                        color = Slate400,
                        fontSize = 12.sp
                    )
                }

                Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                    IconButton(
                        onClick = { viewModel.startNewQuiz(uiState.totalCount) },
                        modifier = Modifier.testTag("restart_quiz_icon_button")
                    ) {
                        Icon(
                            imageVector = Icons.Default.Refresh,
                            contentDescription = "Testi Yeniden Başlat",
                            tint = Slate400
                        )
                    }

                    IconButton(
                        onClick = onOpenSettings,
                        modifier = Modifier.testTag("settings_icon_button")
                    ) {
                        Icon(
                            imageVector = Icons.Default.Tune,
                            contentDescription = "Ayarlar",
                            tint = Slate400
                        )
                    }
                }
            }

            // Main Card (Kart)
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .shadow(16.dp, RoundedCornerShape(20.dp), spotColor = Color.Black)
                    .border(2.dp, Slate600, RoundedCornerShape(20.dp))
                    .testTag("main_quiz_card"),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Slate800)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(20.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    val currentQ = uiState.currentQuestion

                    if (currentQ != null) {
                        // 1. Top Bar with Timer
                        TopHeaderBar(
                            direction = currentQ.direction,
                            remainingCount = uiState.remainingCount,
                            streak = uiState.streak,
                            score = uiState.score,
                            studyTimeSeconds = uiState.studyTimeSeconds,
                            isTimerActive = uiState.isTimerActive
                        )

                        // 2. Question Row + Audio + Tip (Telaffuz okunuşu ve seslendirme)
                        QuestionCard(
                            question = currentQ,
                            isHintVisible = uiState.isHintVisible,
                            onToggleHint = { viewModel.toggleHint() },
                            onSpeak = { slow -> viewModel.speakCurrentWord(slow) }
                        )

                        // 3. Speaking Exercise Card OR 4 Options
                        if (currentQ.direction == com.example.data.QuestionDirection.SPEAKING) {
                            Card(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .border(2.dp, Color(0xFF10B981), RoundedCornerShape(16.dp)),
                                colors = CardDefaults.cardColors(containerColor = Slate900),
                                shape = RoundedCornerShape(16.dp)
                            ) {
                                Column(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(18.dp),
                                    horizontalAlignment = Alignment.CenterHorizontally,
                                    verticalArrangement = Arrangement.spacedBy(12.dp)
                                ) {
                                    Box(
                                        modifier = Modifier
                                            .clip(RoundedCornerShape(8.dp))
                                            .background(Color(0xFF10B981).copy(alpha = 0.2f))
                                            .padding(horizontal = 10.dp, vertical = 4.dp)
                                    ) {
                                        Text(
                                            text = "🗣️ SESLİ TELAFFUZ BÖLÜMÜ • SIRA SENDE!",
                                            color = Color(0xFF34D399),
                                            fontSize = 11.sp,
                                            fontWeight = FontWeight.ExtraBold
                                        )
                                    }

                                    Text(
                                        text = "Mikrofona bas ve kelimeyi yüksek sesle telaffuz et:",
                                        color = Slate400,
                                        fontSize = 13.sp,
                                        textAlign = androidx.compose.ui.text.style.TextAlign.Center
                                    )

                                    Column(
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .clip(RoundedCornerShape(12.dp))
                                            .background(Color(0xFF1E293B))
                                            .padding(vertical = 14.dp, horizontal = 12.dp),
                                        horizontalAlignment = Alignment.CenterHorizontally
                                    ) {
                                        Text(
                                            text = currentQ.target.en,
                                            color = Color(0xFFFDE047),
                                            fontSize = 28.sp,
                                            fontWeight = FontWeight.ExtraBold,
                                            letterSpacing = 1.sp
                                        )
                                        Text(
                                            text = "Türkçe Anlamı: ${currentQ.target.tr}",
                                            color = Color(0xFF38BDF8),
                                            fontSize = 14.sp,
                                            fontWeight = FontWeight.Bold
                                        )
                                        Text(
                                            text = "Okunuşu: [ ${currentQ.target.phonetic} ]",
                                            color = Slate400,
                                            fontSize = 12.sp
                                        )
                                    }

                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                                    ) {
                                        androidx.compose.material3.Button(
                                            onClick = { viewModel.speakCurrentWord(slow = false) },
                                            modifier = Modifier.weight(1f),
                                            colors = androidx.compose.material3.ButtonDefaults.buttonColors(containerColor = Color(0xFF334155)),
                                            shape = RoundedCornerShape(10.dp)
                                        ) {
                                            Text("🔊 Dinle", fontSize = 13.sp, fontWeight = FontWeight.Bold)
                                        }

                                        androidx.compose.material3.Button(
                                            onClick = { viewModel.speakCurrentWord(slow = false) },
                                            modifier = Modifier.weight(1f),
                                            colors = androidx.compose.material3.ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB)),
                                            shape = RoundedCornerShape(10.dp)
                                        ) {
                                            Text("🎙️ Söyle", fontSize = 13.sp, fontWeight = FontWeight.Bold)
                                        }
                                    }

                                    androidx.compose.material3.Button(
                                        onClick = { viewModel.confirmSpeakingCorrect() },
                                        modifier = Modifier.fillMaxWidth(),
                                        colors = androidx.compose.material3.ButtonDefaults.buttonColors(containerColor = Color(0xFF10B981)),
                                        shape = RoundedCornerShape(12.dp)
                                    ) {
                                        Text("✅ Sesli Söyledim (+10 Puan)", fontSize = 14.sp, fontWeight = FontWeight.ExtraBold, color = Color.White)
                                    }
                                }
                            }
                        } else {
                            // 3. Options (4 Şık - Türkçe açıklamalı şıklar)
                            Column(
                                verticalArrangement = Arrangement.spacedBy(10.dp),
                                modifier = Modifier.testTag("options_container")
                            ) {
                                currentQ.options.forEach { option ->
                                    val buttonState = when {
                                        !uiState.isAnswerChecked -> OptionButtonState.DEFAULT
                                        uiState.selectedOption?.id == option.id && uiState.isCorrect == true -> OptionButtonState.SELECTED_CORRECT
                                        uiState.selectedOption?.id == option.id && uiState.isCorrect == false -> OptionButtonState.SELECTED_WRONG
                                        else -> OptionButtonState.DIMMED
                                    }

                                    OptionButton(
                                        option = option,
                                        direction = currentQ.direction,
                                        state = buttonState,
                                        enabled = !uiState.isAnswerChecked,
                                        onClick = { viewModel.selectOption(option) }
                                    )
                                }
                            }
                        }

                        // 4. Feedback Banner & Continue / Retry Button
                        if (uiState.isAnswerChecked && uiState.isCorrect != null) {
                            FeedbackBanner(
                                isCorrect = uiState.isCorrect,
                                targetDay = currentQ.target,
                                onContinue = { viewModel.advanceToNextQuestion() },
                                onRetry = { viewModel.retryCurrentQuestion() }
                            )
                        }
                    } else {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(200.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "Sorular yükleniyor...",
                                color = Slate400,
                                fontSize = 16.sp
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))
        }
    }

    // Victory Dialog (Tüm sorular bitince karne ve sonuç)
    if (uiState.isVictory) {
        VictoryDialog(
            score = uiState.score,
            bestStreak = uiState.bestStreak,
            correctCount = uiState.correctAnswersCount,
            onRestart = { viewModel.startNewQuiz(uiState.totalCount) }
        )
    }
}

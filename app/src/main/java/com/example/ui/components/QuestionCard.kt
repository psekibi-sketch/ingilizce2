package com.example.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.expandVertically
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.shrinkVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.QuestionDirection
import com.example.data.QuizQuestion
import com.example.ui.theme.AmberBg
import com.example.ui.theme.AmberTip
import com.example.ui.theme.Slate400
import com.example.ui.theme.SkyPrimary
import com.example.ui.theme.Slate700
import com.example.ui.theme.Slate900

@Composable
fun QuestionCard(
    question: QuizQuestion,
    isHintVisible: Boolean,
    onToggleHint: () -> Unit,
    onSpeak: (slow: Boolean) -> Unit,
    modifier: Modifier = Modifier
) {
    val questionText = when (question.direction) {
        QuestionDirection.TR_TO_EN -> "\"${question.target.tr}\" gününün İngilizcesi hangisidir?"
        QuestionDirection.EN_TO_TR -> "\"${question.target.en}\" hangi gündür?"
        QuestionDirection.LISTENING -> "🎧 Dinlediğin günün Türkçe karşılığı nedir?"
        QuestionDirection.SPEAKING -> "🎙️ Şimdi Sıra Sende: Sesli Telaffuz Et!"
    }

    Column(
        modifier = modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        // Question title & Audio buttons
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = questionText,
                color = Color.White,
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                lineHeight = 26.sp,
                modifier = Modifier
                    .weight(1f)
                    .testTag("question_title_text")
            )

            Spacer(modifier = Modifier.width(8.dp))

            // Sound button row
            Row(
                horizontalArrangement = Arrangement.spacedBy(6.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Main audio button
                IconButton(
                    onClick = { onSpeak(false) },
                    modifier = Modifier
                        .size(46.dp)
                        .clip(CircleShape)
                        .background(SkyPrimary)
                        .testTag("speak_audio_button")
                ) {
                    Icon(
                        imageVector = Icons.Default.VolumeUp,
                        contentDescription = "Telaffuzu Dinle",
                        tint = Slate900,
                        modifier = Modifier.size(24.dp)
                    )
                }

                // Slow audio button
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .clip(CircleShape)
                        .background(Slate700)
                        .clickable { onSpeak(true) }
                        .testTag("slow_speak_button"),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "🐢",
                        fontSize = 16.sp
                    )
                }
            }
        }

        // Hint toggle button
        Row(
            modifier = Modifier
                .clip(RoundedCornerShape(6.dp))
                .clickable { onToggleHint() }
                .padding(vertical = 4.dp, horizontal = 2.dp)
                .testTag("hint_toggle_button"),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = if (isHintVisible) "💡 İpucunu gizle" else "💡 İpucu ister misin?",
                color = Slate400,
                fontSize = 13.sp,
                fontWeight = FontWeight.Medium
            )
        }

        // Hint Box (Mnemonic Clue)
        AnimatedVisibility(
            visible = isHintVisible,
            enter = expandVertically() + fadeIn(),
            exit = shrinkVertically() + fadeOut()
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(10.dp))
                    .background(AmberBg)
                    .border(1.dp, AmberTip.copy(alpha = 0.4f), RoundedCornerShape(10.dp))
                    .padding(12.dp)
                    .testTag("hint_content_box")
            ) {
                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text(
                        text = "💡 Hatırlatıcı İpucu:",
                        color = AmberTip,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = question.target.hint,
                        color = Color(0xFFFEF08A),
                        fontSize = 14.sp,
                        lineHeight = 19.sp
                    )
                    Text(
                        text = "Fonetik: ${question.target.phonetic}",
                        color = AmberTip.copy(alpha = 0.7f),
                        fontSize = 12.sp
                    )
                }
            }
        }
    }
}

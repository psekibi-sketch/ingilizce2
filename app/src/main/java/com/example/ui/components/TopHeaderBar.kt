package com.example.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.scaleIn
import androidx.compose.animation.scaleOut
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
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
import com.example.ui.theme.EmeraldSuccess
import com.example.ui.theme.SkyPrimary
import com.example.ui.theme.Slate400

@Composable
fun TopHeaderBar(
    direction: QuestionDirection?,
    remainingCount: Int,
    streak: Int,
    score: Int,
    studyTimeSeconds: Int = 0,
    isTimerActive: Boolean = true,
    modifier: Modifier = Modifier
) {
    val directionLabel = when (direction) {
        QuestionDirection.TR_TO_EN -> "🇹🇷 TÜRKÇE ➔ 🇬🇧 İNGİLİZCE"
        QuestionDirection.EN_TO_TR -> "🇬🇧 İNGİLİZCE ➔ 🇹🇷 TÜRKÇE"
        QuestionDirection.LISTENING -> "🎧 DİNLE ➔ TÜRKÇE ANLAMI SEÇ"
        QuestionDirection.SPEAKING -> "🎙️ SEN SÖYLE / TELAFFUZ ET"
        null -> "ALIŞTIRMA"
    }

    val minutes = studyTimeSeconds / 60
    val seconds = studyTimeSeconds % 60
    val timeFormatted = "%02d:%02d".format(minutes, seconds)

    Column(
        modifier = modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Direction Badge
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(8.dp))
                    .background(SkyPrimary.copy(alpha = 0.15f))
                    .padding(horizontal = 10.dp, vertical = 6.dp)
                    .testTag("direction_badge")
            ) {
                Text(
                    text = directionLabel,
                    color = SkyPrimary,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 0.5.sp
                )
            }

            // Stats row (Streak & Score)
            Row(
                horizontalArrangement = Arrangement.spacedBy(10.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                AnimatedVisibility(
                    visible = streak >= 2,
                    enter = scaleIn() + fadeIn(),
                    exit = scaleOut() + fadeOut()
                ) {
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(6.dp))
                            .background(Color(0xFFEA580C).copy(alpha = 0.2f))
                            .padding(horizontal = 6.dp, vertical = 3.dp)
                    ) {
                        Text(
                            text = "🔥 ${streak}x",
                            color = Color(0xFFF97316),
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                Text(
                    text = "★ $score",
                    color = Color(0xFFFACC15),
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        // Secondary status row: Remaining Words & Active Study Timer (stops after 10s idle)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Kalan: $remainingCount soru",
                color = EmeraldSuccess,
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.testTag("remaining_count_text")
            )

            // Çalışma Sayacı
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(4.dp),
                modifier = Modifier
                    .clip(RoundedCornerShape(6.dp))
                    .background(if (isTimerActive) Color(0xFF1E293B) else Color(0xFF334155))
                    .padding(horizontal = 8.dp, vertical = 4.dp)
                    .testTag("study_timer_badge")
            ) {
                Text(
                    text = if (isTimerActive) "⏱️" else "⏸️",
                    fontSize = 12.sp
                )
                Text(
                    text = "Çalışma: $timeFormatted",
                    color = if (isTimerActive) Color(0xFF38BDF8) else Slate400,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }
        }
    }
}

package com.example.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.DayItem
import com.example.data.QuestionDirection
import com.example.ui.theme.EmeraldBg
import com.example.ui.theme.EmeraldSuccess
import com.example.ui.theme.RoseBg
import com.example.ui.theme.RoseError
import com.example.ui.theme.Slate600
import com.example.ui.theme.Slate700

enum class OptionButtonState {
    DEFAULT,
    SELECTED_CORRECT,
    SELECTED_WRONG,
    REVEALED_CORRECT,
    DIMMED
}

@Composable
fun OptionButton(
    option: DayItem,
    direction: QuestionDirection,
    state: OptionButtonState,
    enabled: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val displayText = when (direction) {
        QuestionDirection.TR_TO_EN -> "${option.en} (${option.tr})"
        QuestionDirection.EN_TO_TR -> "${option.tr} (${option.en})"
        QuestionDirection.LISTENING -> "${option.tr} (${option.en})"
        QuestionDirection.SPEAKING -> "${option.en} (${option.tr})"
    }

    val subText = when (direction) {
        QuestionDirection.TR_TO_EN -> option.abbrev
        QuestionDirection.EN_TO_TR -> option.abbrev
        QuestionDirection.LISTENING -> null
        QuestionDirection.SPEAKING -> null
    }

    val backgroundColor by animateColorAsState(
        targetValue = when (state) {
            OptionButtonState.DEFAULT -> Slate700
            OptionButtonState.SELECTED_CORRECT -> EmeraldBg
            OptionButtonState.SELECTED_WRONG -> RoseBg
            OptionButtonState.REVEALED_CORRECT -> EmeraldBg.copy(alpha = 0.8f)
            OptionButtonState.DIMMED -> Slate700.copy(alpha = 0.45f)
        },
        animationSpec = tween(durationMillis = 200),
        label = "bgColor"
    )

    val borderColor by animateColorAsState(
        targetValue = when (state) {
            OptionButtonState.DEFAULT -> Slate600
            OptionButtonState.SELECTED_CORRECT -> EmeraldSuccess
            OptionButtonState.SELECTED_WRONG -> RoseError
            OptionButtonState.REVEALED_CORRECT -> EmeraldSuccess
            OptionButtonState.DIMMED -> Slate600.copy(alpha = 0.3f)
        },
        animationSpec = tween(durationMillis = 200),
        label = "borderColor"
    )

    val textColor by animateColorAsState(
        targetValue = when (state) {
            OptionButtonState.DEFAULT -> Color.White
            OptionButtonState.SELECTED_CORRECT -> EmeraldSuccess
            OptionButtonState.SELECTED_WRONG -> RoseError
            OptionButtonState.REVEALED_CORRECT -> EmeraldSuccess
            OptionButtonState.DIMMED -> Color.White.copy(alpha = 0.4f)
        },
        animationSpec = tween(durationMillis = 200),
        label = "textColor"
    )

    Box(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(backgroundColor)
            .border(2.dp, borderColor, RoundedCornerShape(12.dp))
            .clickable(enabled = enabled) { onClick() }
            .padding(horizontal = 16.dp, vertical = 14.dp)
            .testTag("option_button_${option.en.lowercase()}"),
        contentAlignment = Alignment.CenterStart
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                // Number / Indicator badge
                Box(
                    modifier = Modifier
                        .size(28.dp)
                        .clip(CircleShape)
                        .background(
                            when (state) {
                                OptionButtonState.SELECTED_CORRECT, OptionButtonState.REVEALED_CORRECT -> EmeraldSuccess.copy(alpha = 0.2f)
                                OptionButtonState.SELECTED_WRONG -> RoseError.copy(alpha = 0.2f)
                                else -> Color.White.copy(alpha = 0.08f)
                            }
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    when (state) {
                        OptionButtonState.SELECTED_CORRECT, OptionButtonState.REVEALED_CORRECT -> {
                            Icon(
                                imageVector = Icons.Default.Check,
                                contentDescription = "Doğru",
                                tint = EmeraldSuccess,
                                modifier = Modifier.size(16.dp)
                            )
                        }
                        OptionButtonState.SELECTED_WRONG -> {
                            Icon(
                                imageVector = Icons.Default.Close,
                                contentDescription = "Yanlış",
                                tint = RoseError,
                                modifier = Modifier.size(16.dp)
                            )
                        }
                        else -> {
                            Text(
                                text = "${option.id}",
                                color = textColor.copy(alpha = 0.7f),
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }

                Text(
                    text = displayText,
                    color = textColor,
                    fontSize = 17.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            if (subText != null) {
                Text(
                    text = subText,
                    color = textColor.copy(alpha = 0.5f),
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Medium
                )
            }
        }
    }
}

package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Slider
import androidx.compose.material3.SliderDefaults
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.QuizUiState
import com.example.ui.QuizViewModel
import com.example.ui.theme.EmeraldSuccess
import com.example.ui.theme.SkyPrimary
import com.example.ui.theme.Slate400
import com.example.ui.theme.Slate800
import com.example.ui.theme.Slate950

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsSheet(
    uiState: QuizUiState,
    viewModel: QuizViewModel,
    onDismiss: () -> Unit
) {
    ModalBottomSheet(
        onDismissRequest = onDismiss,
        containerColor = Slate800,
        shape = RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp, vertical = 12.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text(
                text = "⚙️ Alıştırma Ayarları",
                color = Color.White,
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold
            )

            // Auto pronounce toggle
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(text = "Otomatik Telaffuz", color = Color.White, fontSize = 15.sp, fontWeight = FontWeight.SemiBold)
                    Text(text = "Yeni soruda İngilizce telaffuzu oku", color = Slate400, fontSize = 12.sp)
                }
                Switch(
                    checked = uiState.autoPronounce,
                    onCheckedChange = { viewModel.toggleAutoPronounce() },
                    colors = SwitchDefaults.colors(checkedThumbColor = Color.White, checkedTrackColor = SkyPrimary)
                )
            }

            // Sound Enabled
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(text = "Ses Çalma", color = Color.White, fontSize = 15.sp, fontWeight = FontWeight.SemiBold)
                    Text(text = "Telaffuz seslerini etkinleştir", color = Slate400, fontSize = 12.sp)
                }
                Switch(
                    checked = uiState.soundEnabled,
                    onCheckedChange = { viewModel.toggleSound() },
                    colors = SwitchDefaults.colors(checkedThumbColor = Color.White, checkedTrackColor = SkyPrimary)
                )
            }

            // Haptic Enabled
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(text = "Titreşimli Geri Bildirim", color = Color.White, fontSize = 15.sp, fontWeight = FontWeight.SemiBold)
                    Text(text = "Doğru ve yanlışlarda hafif titreşim", color = Slate400, fontSize = 12.sp)
                }
                Switch(
                    checked = uiState.hapticEnabled,
                    onCheckedChange = { viewModel.toggleHaptic() },
                    colors = SwitchDefaults.colors(checkedThumbColor = Color.White, checkedTrackColor = EmeraldSuccess)
                )
            }

            // Speech Rate
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(text = "Konuşma Hızı", color = Color.White, fontSize = 15.sp, fontWeight = FontWeight.SemiBold)
                    Text(text = "%.2fx".format(uiState.speechRate), color = SkyPrimary, fontSize = 14.sp, fontWeight = FontWeight.Bold)
                }
                Slider(
                    value = uiState.speechRate,
                    onValueChange = { viewModel.setSpeechRate(it) },
                    valueRange = 0.5f..1.1f,
                    colors = SliderDefaults.colors(
                        thumbColor = SkyPrimary,
                        activeTrackColor = SkyPrimary,
                        inactiveTrackColor = Slate400.copy(alpha = 0.3f)
                    )
                )
            }

            // Question Count presets
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text(text = "Soru Sayısı Seç", color = Color.White, fontSize = 15.sp, fontWeight = FontWeight.SemiBold)
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    listOf(10, 20, 30).forEach { count ->
                        val isSelected = uiState.totalCount == count
                        Button(
                            onClick = {
                                viewModel.startNewQuiz(count)
                                onDismiss()
                            },
                            shape = RoundedCornerShape(10.dp),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (isSelected) SkyPrimary else Slate950,
                                contentColor = if (isSelected) Slate950 else Color.White
                            ),
                            modifier = Modifier.weight(1f)
                        ) {
                            Text("$count Soru", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))
        }
    }
}

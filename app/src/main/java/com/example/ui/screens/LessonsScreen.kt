package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.ScrollableTabRow
import androidx.compose.material3.Tab
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.BookPageInfo
import com.example.data.BookThemeInfo
import com.example.data.ClassroomCommandItem
import com.example.data.ClassroomLifeRepository
import com.example.data.ClassroomVocabItem
import com.example.data.CountExercise
import com.example.data.MathWordExercise
import com.example.data.Page18Exercise
import com.example.data.Page21ColourItem
import com.example.data.Page23Question
import com.example.ui.AppTab
import com.example.ui.QuizUiState
import com.example.ui.QuizViewModel
import com.example.ui.theme.EmeraldSuccess
import com.example.ui.theme.RoseError
import com.example.ui.theme.SkyPrimary
import com.example.ui.theme.Slate400
import com.example.ui.theme.Slate600
import com.example.ui.theme.Slate700
import com.example.ui.theme.Slate800
import com.example.ui.theme.Slate900

@Composable
fun LessonsScreen(
    uiState: QuizUiState,
    viewModel: QuizViewModel,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val scrollState = rememberScrollState()
    val pages: List<BookPageInfo> = ClassroomLifeRepository.allPages

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
            verticalArrangement = Arrangement.spacedBy(14.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Ana Menüye Dön Butonu
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.Start
            ) {
                Button(
                    onClick = { viewModel.selectTab(AppTab.HOME) },
                    colors = ButtonDefaults.buttonColors(containerColor = Slate800, contentColor = Color.White),
                    shape = RoundedCornerShape(10.dp),
                    contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 12.dp, vertical = 6.dp)
                ) {
                    Text("🏠 Ana Ders Menüsüne Dön", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                }
            }

            // Header: 2. Sınıf Ünite Seçimi & Tekrar Başlat Butonu
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "📖 2. Sınıf Eğitim & İngilizce",
                        color = Color.White,
                        fontSize = 19.sp,
                        fontWeight = FontWeight.ExtraBold
                    )
                    val activeTheme = ClassroomLifeRepository.allThemes.find { it.number == uiState.selectedThemeNumber }
                        ?: ClassroomLifeRepository.allThemes[1]
                    Text(
                        text = "${activeTheme.number}. Ünite: ${activeTheme.title} (${activeTheme.pageRange})",
                        color = SkyPrimary,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }

                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    // Sayfayı Yeniden Başlat Butonu
                    OutlinedButton(
                        onClick = { viewModel.resetCurrentPage(uiState.selectedPageNumber) },
                        shape = RoundedCornerShape(8.dp),
                        contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 8.dp, vertical = 4.dp),
                        colors = ButtonDefaults.outlinedButtonColors(contentColor = SkyPrimary)
                    ) {
                        Icon(Icons.Default.Refresh, contentDescription = "Tekrar Başlat", modifier = Modifier.size(14.dp))
                        Text(" Dersi Sıfırla", fontSize = 11.sp, fontWeight = FontWeight.Bold)
                    }

                    // Aktif Sayaç
                    val mins = uiState.studyTimeSeconds / 60
                    val secs = uiState.studyTimeSeconds % 60
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(if (uiState.isTimerActive) Color(0xFF1E293B) else Color(0xFF334155))
                            .padding(horizontal = 8.dp, vertical = 6.dp)
                    ) {
                        Text(
                            text = "⏱️ %02d:%02d".format(mins, secs),
                            color = if (uiState.isTimerActive) Color(0xFF38BDF8) else Slate400,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }

            // YENİ ÖZELLİK KARTI: 3'ER (30'A KADAR) VE 4'ER (40'A KADAR) RİTMİK SAYMA & ÇARPIM TABLOSUNA HAZIRLIK
            Card(
                colors = CardDefaults.cardColors(containerColor = Slate800),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(2.dp, Color(0xFFF472B6), RoundedCornerShape(16.dp))
                    .clickable { viewModel.selectTab(AppTab.RHYTHMIC) }
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(
                            Brush.horizontalGradient(
                                listOf(Color(0xFF4F46E5), Color(0xFF7C3AED), Color(0xFFDB2777))
                            )
                        )
                        .padding(14.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "⭐ YENİ ÖDEV • ÇARPIM TABLOSUNA HAZIRLIK",
                            color = Color(0xFFFDE047),
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Black
                        )
                        Button(
                            onClick = { copyIndexHtmlFromAssets(context) },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = Color(0xFF0F172A),
                                contentColor = Color(0xFFFDE047)
                            ),
                            shape = RoundedCornerShape(8.dp),
                            contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 10.dp, vertical = 4.dp)
                        ) {
                            Text("📋 GitHub index.html Kopyala", fontSize = 11.sp, fontWeight = FontWeight.ExtraBold)
                        }
                    }

                    Text(
                        text = "🚀 3'er (30'a Kadar) & 4'er (40'a Kadar) Ritmik Sayma",
                        color = Color.White,
                        fontSize = 17.sp,
                        fontWeight = FontWeight.ExtraBold
                    )
                    Text(
                        text = "1. Önce Öğretmen Sesli Sayar & Öğretir ➔ 2. Sonra Çocuk Sayar ➔ 3. Puanlı Ritmik Sınav!",
                        color = Color(0xFFFCE7F3),
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Medium
                    )

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Button(
                            onClick = { viewModel.selectTab(AppTab.RHYTHMIC) },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = Color(0xFFFDE047),
                                contentColor = Color(0xFF0F172A)
                            ),
                            shape = RoundedCornerShape(10.dp),
                            modifier = Modifier.weight(1f)
                        ) {
                            Text("🍓 3'er & 🚗 4'er Saymaya Başla ➔", fontWeight = FontWeight.Black, fontSize = 12.sp)
                        }
                    }
                }
            }

            // 1. TÜM ÜNİTELER SEÇİM ÇUBUĞU (1, 2, 3, 4, 5, 6 SIRALI)
            ScrollableTabRow(
                selectedTabIndex = ClassroomLifeRepository.allThemes.indexOfFirst { it.number == uiState.selectedThemeNumber }.coerceAtLeast(0),
                containerColor = Slate800,
                contentColor = SkyPrimary,
                edgePadding = 8.dp,
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
            ) {
                ClassroomLifeRepository.allThemes.forEach { theme ->
                    val isThemeSelected = uiState.selectedThemeNumber == theme.number
                    Tab(
                        selected = isThemeSelected,
                        onClick = { viewModel.selectTheme(theme.number) },
                        text = {
                            Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.padding(vertical = 4.dp)) {
                                Text(
                                    text = "${theme.number}. Ünite",
                                    color = if (isThemeSelected) SkyPrimary else Slate400,
                                    fontSize = 12.sp,
                                    fontWeight = if (isThemeSelected) FontWeight.Bold else FontWeight.Normal
                                )
                                Text(
                                    text = theme.title.take(14),
                                    color = if (isThemeSelected) Color.White else Slate400.copy(alpha = 0.7f),
                                    fontSize = 10.sp
                                )
                            }
                        }
                    )
                }
            }

            // 2. ÜNİTE İÇERİĞİ
            if (uiState.selectedThemeNumber == 2) {
                // Sayfa Seçme Çubuğu (Tabs)
                ScrollableTabRow(
                    selectedTabIndex = pages.indexOfFirst { it.pageNumber == uiState.selectedPageNumber }.coerceAtLeast(0),
                    containerColor = Slate800,
                    contentColor = SkyPrimary,
                    edgePadding = 8.dp,
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                ) {
                    pages.forEach { page ->
                        val isSelected = uiState.selectedPageNumber == page.pageNumber
                        Tab(
                            selected = isSelected,
                            onClick = { viewModel.selectPage(page.pageNumber) },
                            text = {
                                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                    Text(
                                        text = "Sayfa ${page.pageNumber}",
                                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                                        fontSize = 13.sp
                                    )
                                    Text(
                                        text = page.title.take(12),
                                        fontSize = 10.sp,
                                        color = if (isSelected) SkyPrimary else Slate400
                                    )
                                }
                            }
                        )
                    }
                }

                // Seçilen Sayfanın Detay İçeriği
                when (uiState.selectedPageNumber) {
                    17 -> Page17CoverView(viewModel)
                    18 -> Page18VocabView(uiState, viewModel)
                    19 -> Page19DrawingVocabView(viewModel)
                    20 -> Page20CommandsAndCipherView(uiState, viewModel)
                    21 -> Page21ColouringView(uiState, viewModel)
                    22 -> Page22MathAnagramsView(uiState, viewModel)
                    23 -> Page23MustafaStoryView(uiState, viewModel)
                    24 -> Page24CheckAndCountView(uiState, viewModel)
                    else -> Page17CoverView(viewModel)
                }
            } else {
                // Diğer Ünitelerin (1, 3, 4, 5, 6) İnteraktif Kartı
                val curTheme = ClassroomLifeRepository.allThemes.find { it.number == uiState.selectedThemeNumber }
                    ?: ClassroomLifeRepository.allThemes[0]
                UnitOverviewCard(theme = curTheme, viewModel = viewModel)
            }

            Spacer(modifier = Modifier.height(20.dp))
        }
    }
}

// ---------------- S A Y F A   1 7 ----------------
@Composable
private fun Page17CoverView(viewModel: QuizViewModel) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Slate800)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Box(
                modifier = Modifier
                    .size(72.dp)
                    .clip(CircleShape)
                    .background(SkyPrimary.copy(alpha = 0.2f)),
                contentAlignment = Alignment.Center
            ) {
                Text("🏫", fontSize = 36.sp)
            }

            Text(
                text = "UNIT 2: CLASSROOM LIFE",
                color = Color.White,
                fontSize = 22.sp,
                fontWeight = FontWeight.ExtraBold
            )
            Text(
                text = "2. ÜNİTE: SINIF YAŞAMI",
                color = SkyPrimary,
                fontSize = 14.sp,
                fontWeight = FontWeight.SemiBold
            )

            Text(
                text = "Bu ünitede sınıf eşyalarını (pencil, rubber, bag...), sınıf içi yönergeleri ('Open the door, please!') ve sayıları öğreneceğiz.",
                color = Slate400,
                fontSize = 13.sp,
                lineHeight = 18.sp
            )

            Button(
                onClick = { viewModel.selectPage(18) },
                colors = ButtonDefaults.buttonColors(containerColor = SkyPrimary),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Ders 1'e Başla: Sınıf Eşyaları (Sayfa 18) ➔", color = Color.White, fontWeight = FontWeight.Bold)
            }
        }
    }
}

// ---------------- S A Y F A   1 8 ----------------
@Composable
private fun Page18VocabView(uiState: QuizUiState, viewModel: QuizViewModel) {
    val items = ClassroomLifeRepository.page18Exercises

    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Slate800)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "Sayfa 18: Listen and choose (Sınıf Eşyaları)",
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp
                    )
                    Text(
                        text = "Doğru eşyayı kendin bulana kadar tekrar deneyebilirsin!",
                        color = Slate400,
                        fontSize = 12.sp
                    )
                }

                IconButton(onClick = { viewModel.resetCurrentPage(18) }) {
                    Icon(Icons.Default.Refresh, contentDescription = "Sayfayı Sıfırla", tint = SkyPrimary)
                }
            }
        }

        items.forEach { item ->
            val selected = uiState.page18Selections[item.itemNumber]
            val isAnswered = selected != null
            val isCorrect = selected == item.correctEn

            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = Slate800),
                border = if (isAnswered) CardDefaults.outlinedCardBorder().copy(
                    brush = androidx.compose.ui.graphics.SolidColor(if (isCorrect) EmeraldSuccess else RoseError)
                ) else null
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(14.dp),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
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
                            Text(item.iconEmoji, fontSize = 28.sp)
                            Column {
                                Text(
                                    text = if (isCorrect) item.correctEn else "Doğruyu Seç 👇",
                                    color = if (isCorrect) EmeraldSuccess else Color.White,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 16.sp
                                )
                                Text(
                                    text = "${item.correctTr} • Okunuşu: [${item.phoneticTr}]",
                                    color = Color(0xFF38BDF8),
                                    fontSize = 12.sp
                                )
                            }
                        }

                        IconButton(onClick = { viewModel.speakText(item.correctEn) }) {
                            Icon(Icons.Default.VolumeUp, contentDescription = "Dinle", tint = SkyPrimary)
                        }
                    }

                    // Şıklar - Yanlış seçilse bile çocuk doğruyu bulana kadar tıklayabilir!
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        item.options.forEach { opt ->
                            val isThisSelected = selected == opt
                            val btnBg = when {
                                !isThisSelected -> Slate700
                                opt == item.correctEn -> EmeraldSuccess
                                else -> RoseError
                            }

                            Box(
                                modifier = Modifier
                                    .weight(1f)
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(btnBg)
                                    .clickable {
                                        // Kullanıcı yanlış yapsa da doğruyu seçene kadar tekrar tıklayabilir
                                        viewModel.selectPage18Option(item.itemNumber, opt)
                                    }
                                    .padding(vertical = 10.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = opt,
                                    color = Color.White,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 13.sp
                                )
                            }
                        }
                    }

                    if (isAnswered && !isCorrect) {
                        Text(
                            text = "⚠️ Yanlış seçenek! Lütfen doğru olanı tekrar deneyin.",
                            color = RoseError,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                }
            }
        }
    }
}

// ---------------- S A Y F A   1 9 ----------------
@Composable
private fun Page19DrawingVocabView(viewModel: QuizViewModel) {
    val items = ClassroomLifeRepository.page19DrawingItems

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Slate800)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            Text(
                text = "Sayfa 19: Draw, colour, and say",
                color = Color.White,
                fontWeight = FontWeight.Bold,
                fontSize = 16.sp
            )
            Text(
                text = "Sınıf eşyalarının İngilizce adları ve okunuşları. Hoparlöre dokunup dinle ve tekrar et!",
                color = Slate400,
                fontSize = 12.sp
            )

            items.forEach { item ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(10.dp))
                        .background(Slate700)
                        .padding(horizontal = 12.dp, vertical = 10.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Text(item.iconEmoji, fontSize = 26.sp)
                        Column {
                            Text(
                                text = item.en,
                                color = Color.White,
                                fontWeight = FontWeight.Bold,
                                fontSize = 15.sp
                            )
                            Text(
                                text = "${item.tr}  •  [${item.phoneticTr}]",
                                color = Color(0xFF38BDF8),
                                fontSize = 12.sp
                            )
                        }
                    }

                    IconButton(onClick = { viewModel.speakText(item.en) }) {
                        Icon(Icons.Default.VolumeUp, contentDescription = "Dinle", tint = SkyPrimary)
                    }
                }
            }
        }
    }
}

// ---------------- S A Y F A   2 0 ----------------
@Composable
private fun Page20CommandsAndCipherView(uiState: QuizUiState, viewModel: QuizViewModel) {
    val commands = ClassroomLifeRepository.page20Commands

    Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
        // Bölüm 1: Sınıf Yönergeleri
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Slate800)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(
                    text = "Sayfa 20: Listen and point (Sınıf Yönergeleri)",
                    color = Color.White,
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp
                )
                Text(
                    text = "Öğretmenin sınıfta verdiği komutlar. Okunuşları altındadır:",
                    color = Slate400,
                    fontSize = 12.sp
                )

                commands.forEach { cmd ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(10.dp))
                            .background(Slate700)
                            .padding(horizontal = 12.dp, vertical = 10.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(10.dp),
                            modifier = Modifier.weight(1f)
                        ) {
                            Text(cmd.iconEmoji, fontSize = 24.sp)
                            Column {
                                Text(
                                    text = cmd.en,
                                    color = Color.White,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 14.sp
                                )
                                Text(
                                    text = "${cmd.tr} • Okunuşu: [${cmd.phoneticTr}]",
                                    color = Color(0xFF38BDF8),
                                    fontSize = 11.sp
                                )
                            }
                        }

                        IconButton(onClick = { viewModel.speakText(cmd.en) }) {
                            Icon(Icons.Default.VolumeUp, contentDescription = "Dinle", tint = SkyPrimary)
                        }
                    }
                }
            }
        }

        // Bölüm 2: Sayfa 20 Çiçek Şifresi (Letter Flower Cipher)
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Slate800)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(
                    text = "🌸 Find and Write (Çiçek Şifresi)",
                    color = Color(0xFFF472B6),
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp
                )
                Text(
                    text = "Kitaptaki çiçeğin harflerini çöz: Şifreli soru 'Can I open the door?' (Kapıyı açabilir miyim?)",
                    color = Slate400,
                    fontSize = 12.sp
                )

                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(10.dp))
                        .background(Slate700)
                        .padding(12.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Gizli Soru: CAN I OPEN THE DOOR?",
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 1.sp
                    )
                }

                Button(
                    onClick = { viewModel.speakText("Can I open the door, please?") },
                    colors = ButtonDefaults.buttonColors(containerColor = SkyPrimary)
                ) {
                    Text("🔊 'Can I open the door?' Dinle", fontSize = 12.sp)
                }
            }
        }
    }
}

// ---------------- S A Y F A   2 1 ----------------
@Composable
private fun Page21ColouringView(uiState: QuizUiState, viewModel: QuizViewModel) {
    val items = ClassroomLifeRepository.page21ColourItems

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Slate800)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "Sayfa 21: Read and Colour",
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        fontSize = 16.sp
                    )
                    Text(
                        text = "Cümleyi oku, dinle ve eşyayı doğru renkle boyamak için butona dokun!",
                        color = Slate400,
                        fontSize = 12.sp
                    )
                }

                IconButton(onClick = { viewModel.resetCurrentPage(21) }) {
                    Icon(Icons.Default.Refresh, contentDescription = "Temizle", tint = SkyPrimary)
                }
            }

            items.forEach { item ->
                val isColored = uiState.page21ColoredItems.contains(item.id)

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(if (isColored) Color(0xFF1E293B) else Slate700)
                        .padding(12.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = item.instructionEn,
                            color = Color.White,
                            fontWeight = FontWeight.Bold,
                            fontSize = 15.sp
                        )
                        Text(
                            text = "${item.instructionTr} • [${item.phoneticTr}]",
                            color = Color(0xFF38BDF8),
                            fontSize = 12.sp
                        )
                        Text(
                            text = "Renk: ${item.colorNameTr} ${item.previewEmoji}",
                            color = Slate400,
                            fontSize = 11.sp
                        )
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        IconButton(onClick = { viewModel.speakText(item.instructionEn) }) {
                            Icon(Icons.Default.VolumeUp, contentDescription = "Dinle", tint = SkyPrimary)
                        }

                        Button(
                            onClick = { viewModel.togglePage21Color(item.id) },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (isColored) EmeraldSuccess else SkyPrimary
                            )
                        ) {
                            Text(if (isColored) "✓ Boyandı" else "Boya", fontSize = 11.sp)
                        }
                    }
                }
            }
        }
    }
}

// ---------------- S A Y F A   2 2 ----------------
@Composable
private fun Page22MathAnagramsView(uiState: QuizUiState, viewModel: QuizViewModel) {
    val items = ClassroomLifeRepository.page22MathExercises

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Slate800)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            Text(
                text = "Sayfa 22: Count and Write (Toplama ve Sayılar)",
                color = Color.White,
                fontWeight = FontWeight.Bold,
                fontSize = 16.sp
            )
            Text(
                text = "İşlemleri yap ve karışık verilen harfleri doğru sıraya dizerek sayının İngilizcesini bul:",
                color = Slate400,
                fontSize = 12.sp
            )

            items.forEach { item ->
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(Slate700)
                        .padding(12.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "${item.num1} + ${item.num2} = ${item.sum}",
                            color = Color.White,
                            fontWeight = FontWeight.Bold,
                            fontSize = 16.sp
                        )

                        Text(
                            text = "Harfler: ${item.scrambledLetters}",
                            color = Color(0xFFFBBF24),
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp
                        )
                    }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Doğru Yazılışı: ${item.wordEn}",
                            color = EmeraldSuccess,
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp
                        )

                        Spacer(modifier = Modifier.weight(1f))

                        IconButton(onClick = { viewModel.speakText(item.wordEn) }) {
                            Icon(Icons.Default.VolumeUp, contentDescription = "Dinle", tint = SkyPrimary)
                        }
                    }

                    Text(
                        text = "Okunuşu: [${item.phoneticTr}]",
                        color = Color(0xFF38BDF8),
                        fontSize = 12.sp
                    )
                }
            }
        }
    }
}

// ---------------- S A Y F A   2 3 ----------------
@Composable
private fun Page23MustafaStoryView(uiState: QuizUiState, viewModel: QuizViewModel) {
    val qItems = ClassroomLifeRepository.page23Questions

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Slate800)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Sayfa 23: Mustafa's Classroom",
                    color = Color.White,
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp
                )

                IconButton(onClick = { viewModel.resetCurrentPage(23) }) {
                    Icon(Icons.Default.Refresh, contentDescription = "Soruları Sıfırla", tint = SkyPrimary)
                }
            }

            // Hikaye Kutusu
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color(0xFF1E293B))
                    .padding(14.dp)
            ) {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(
                        text = "\"${ClassroomLifeRepository.PAGE_23_STORY_EN}\"",
                        color = Color.White,
                        fontSize = 13.sp,
                        lineHeight = 20.sp,
                        fontStyle = FontStyle.Italic
                    )

                    Button(
                        onClick = { viewModel.speakText(ClassroomLifeRepository.PAGE_23_STORY_EN) },
                        colors = ButtonDefaults.buttonColors(containerColor = SkyPrimary)
                    ) {
                        Text("🔊 Hikayeyi Sesli Dinle", fontSize = 12.sp)
                    }
                }
            }

            Text(
                text = "Soruları Cevapla (Kendin doğruyu bulana kadar dene):",
                color = Color.White,
                fontWeight = FontWeight.Bold,
                fontSize = 14.sp
            )

            qItems.forEach { q ->
                val selected = uiState.page23Answers[q.id]
                val isAnswered = selected != null
                val isCorrect = selected == q.correctAnswer

                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(10.dp))
                        .background(Slate700)
                        .padding(10.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text(
                        text = "${q.id}. ${q.questionEn}",
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp
                    )

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        q.options.forEach { opt ->
                            val isThisSelected = selected == opt
                            val btnBg = when {
                                !isThisSelected -> Slate800
                                opt == q.correctAnswer -> EmeraldSuccess
                                else -> RoseError
                            }

                            Box(
                                modifier = Modifier
                                    .weight(1f)
                                    .clip(RoundedCornerShape(6.dp))
                                    .background(btnBg)
                                    .clickable {
                                        // Kullanıcı yanlış yapsa da doğru cevabı bulana kadar tıklayabilir
                                        viewModel.selectPage23Answer(q.id, opt)
                                    }
                                    .padding(vertical = 8.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = opt,
                                    color = Color.White,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.SemiBold
                                )
                            }
                        }
                    }

                    if (isAnswered && !isCorrect) {
                        Text(
                            text = "❌ Yanlış oldu, doğru kelimeyi bulana kadar diğer şıkları deneyin!",
                            color = RoseError,
                            fontSize = 11.sp
                        )
                    }
                }
            }
        }
    }
}

// ---------------- S A Y F A   2 4 ----------------
@Composable
private fun Page24CheckAndCountView(uiState: QuizUiState, viewModel: QuizViewModel) {
    val countItems = ClassroomLifeRepository.page24CountExercises

    Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
        // Bölüm 1: How many...?
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Slate800)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(
                    text = "Sayfa 24: How many...? (Kaç Tane?)",
                    color = Color.White,
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp
                )
                Text(
                    text = "Resimdeki eşyaları say ve doğru sayıyı dinle:",
                    color = Slate400,
                    fontSize = 12.sp
                )

                countItems.forEach { item ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(10.dp))
                            .background(Slate700)
                            .padding(10.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(
                                text = "${item.iconEmoji} ${item.questionEn}",
                                color = Color.White,
                                fontWeight = FontWeight.Bold,
                                fontSize = 14.sp
                            )
                            Text(
                                text = "${item.questionTr} • Cevap: ${item.answerEn}",
                                color = Color(0xFF38BDF8),
                                fontSize = 12.sp
                            )
                        }

                        IconButton(onClick = { viewModel.speakText("${item.questionEn}. ${item.answerEn}") }) {
                            Icon(Icons.Default.VolumeUp, contentDescription = "Dinle", tint = SkyPrimary)
                        }
                    }
                }
            }
        }

        // Bölüm 2: Let's Check! (Kendini Değerlendir)
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Slate800)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Text(
                    text = "⭐ Let's Check! (Üniteyi Değerlendir)",
                    color = Color(0xFFFACC15),
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp
                )
                Text(
                    text = "Bu ünitedeki tüm sınıf eşyalarını ve yönergeleri öğrendin mi? Yıldız ver!",
                    color = Slate400,
                    fontSize = 12.sp
                )

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    for (i in 1..5) {
                        IconButton(onClick = { viewModel.setUserStarRating(i) }) {
                            Icon(
                                Icons.Default.Star,
                                contentDescription = "$i Yıldız",
                                tint = if (i <= uiState.userStarRating) Color(0xFFFACC15) else Slate600,
                                modifier = Modifier.size(32.dp)
                            )
                        }
                    }
                }

                Text(
                    text = "${uiState.userStarRating} / 5 Yıldız",
                    color = Color.White,
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp
                )
            }
        }
    }
}

// ---------------- Ü N İ T E   G E N E L   B A K I Ş ----------------
@Composable
private fun UnitOverviewCard(theme: BookThemeInfo, viewModel: QuizViewModel) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Slate800)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            val emoji = when (theme.number) {
                1 -> "👋"
                3 -> "👤"
                4 -> "👨‍👩‍👧‍👦"
                5 -> "🏡"
                6 -> "🌆"
                else -> "📖"
            }
            Text(
                text = "$emoji ${theme.number}. Ünite: ${theme.title}",
                color = Color.White,
                fontSize = 20.sp,
                fontWeight = FontWeight.ExtraBold
            )
            Text(
                text = "${theme.pageRange} • ${theme.titleTr}",
                color = SkyPrimary,
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold
            )

            // Konu Detayı ve Kelimeler
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = Slate900),
                shape = RoundedCornerShape(12.dp)
            ) {
                Column(
                    modifier = Modifier.padding(14.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text(
                        text = "📚 Bu Ünitede Öğrenilen Konular:",
                        color = Color.White,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold
                    )
                    val summaryText = when (theme.number) {
                        1 -> "• Selamlaşma: Hello, Hi, Good morning, Goodbye\n• Duygular: I am fine, happy, tired\n• Sayılar: One to Ten (1-10)\n• Günler: Monday to Sunday\n• Renkler: Red, Blue, Green, Yellow"
                        3 -> "• Vücut Bölümleri: Head, eye, nose, ear, mouth, hand, arm, leg, foot\n• Giysiler: T-shirt, dress, trousers, shoes\n• Yönergeler: Touch your nose, Clap your hands"
                        4 -> "• Aile Bireyleri: Mother, Father, Brother, Sister, Baby, Grandfather, Grandmother\n• Cümleler: This is my family, Who is this?"
                        5 -> "• Evin Odaları: Living room, Bedroom, Kitchen, Bathroom\n• Eşyalar: Table, Sofa, Bed, Chair, Door, Window\n• Soru: Where is the dog? In the kitchen"
                        6 -> "• Şehir Mekanları: School, Park, Hospital, Zoo, Museum, Cinema, Library\n• Ulaşım: Bus, Car\n• Dünya & Şehir: In the city, Where is the school?"
                        else -> theme.titleTr
                    }
                    Text(
                        text = summaryText,
                        color = Slate400,
                        fontSize = 13.sp,
                        lineHeight = 18.sp
                    )
                }
            }

            // Aksiyon Butonları
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Button(
                    onClick = { viewModel.selectTab(com.example.ui.AppTab.QUIZ) },
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFF59E0B)),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Text("📝 Konu Testini Aç", color = Color(0xFF0F172A), fontWeight = FontWeight.ExtraBold)
                }
                OutlinedButton(
                    onClick = { viewModel.selectTheme(2) },
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(10.dp),
                    colors = ButtonDefaults.outlinedButtonColors(contentColor = SkyPrimary)
                ) {
                    Text("🏫 2. Ünite Dersleri", fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

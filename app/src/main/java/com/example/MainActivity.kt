package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Assignment
import androidx.compose.material.icons.filled.Calculate
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Quiz
import androidx.compose.material.icons.filled.Sort
import androidx.compose.material.icons.filled.Style
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.ui.AppTab
import com.example.ui.QuizViewModel
import com.example.ui.components.SettingsSheet
import com.example.ui.screens.DaysGuideScreen
import com.example.ui.screens.FlashcardsScreen
import com.example.ui.screens.LessonsScreen
import com.example.ui.screens.OrderingScreen
import com.example.ui.screens.QuizScreen
import com.example.ui.screens.RhythmicCountingScreen
import com.example.ui.theme.MyApplicationTheme
import com.example.ui.theme.SkyPrimary
import com.example.ui.theme.Slate400
import com.example.ui.theme.Slate800
import com.example.ui.theme.Slate900

class MainActivity : ComponentActivity() {

    private val viewModel: QuizViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            MyApplicationTheme {
                MainAppContainer(viewModel = viewModel)
            }
        }
    }
}

@Composable
fun MainAppContainer(viewModel: QuizViewModel) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    var isSettingsOpen by remember { mutableStateOf(false) }
    val interactionSource = remember { MutableInteractionSource() }

    // Geri tuşu: Lessons dışındaysa Lessons'a dön
    BackHandler(enabled = uiState.activeTab != AppTab.LESSONS) {
        viewModel.selectTab(AppTab.LESSONS)
    }

    Scaffold(
        modifier = Modifier
            .fillMaxSize()
            .clickable(interactionSource = interactionSource, indication = null) {
                // Dokunma olduğunda hareketsizlik sayacını sıfırla
                viewModel.recordUserActivity()
            },
        containerColor = Slate900,
        bottomBar = {
            NavigationBar(
                containerColor = Slate800,
                tonalElevation = 8.dp,
                modifier = Modifier.testTag("bottom_nav_bar")
            ) {
                // 1. Dersler (Kitap Sayfaları - MEB 2. Sınıf)
                NavigationBarItem(
                    selected = uiState.activeTab == AppTab.LESSONS,
                    onClick = { viewModel.selectTab(AppTab.LESSONS) },
                    icon = { Icon(imageVector = Icons.Default.MenuBook, contentDescription = "Dersler") },
                    label = { Text("Dersler", fontWeight = FontWeight.Bold, fontSize = 10.sp) },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = SkyPrimary,
                        selectedTextColor = SkyPrimary,
                        unselectedIconColor = Slate400,
                        unselectedTextColor = Slate400,
                        indicatorColor = SkyPrimary.copy(alpha = 0.15f)
                    ),
                    modifier = Modifier.testTag("nav_item_lessons")
                )

                // 2. Matematik (2, 3, 4, 5'er Ritmik Sayma)
                NavigationBarItem(
                    selected = uiState.activeTab == AppTab.RHYTHMIC,
                    onClick = { viewModel.selectTab(AppTab.RHYTHMIC) },
                    icon = { Icon(imageVector = Icons.Default.Calculate, contentDescription = "Matematik Ritmik Sayma") },
                    label = { Text("Matematik", fontWeight = FontWeight.ExtraBold, fontSize = 10.sp) },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = Color(0xFFF472B6),
                        selectedTextColor = Color(0xFFF472B6),
                        unselectedIconColor = Color(0xFFF472B6).copy(alpha = 0.8f),
                        unselectedTextColor = Color(0xFFF472B6).copy(alpha = 0.8f),
                        indicatorColor = Color(0xFFF472B6).copy(alpha = 0.18f)
                    ),
                    modifier = Modifier.testTag("nav_item_rhythmic")
                )

                // 3. Ödev & Test
                NavigationBarItem(
                    selected = uiState.activeTab == AppTab.QUIZ,
                    onClick = { viewModel.selectTab(AppTab.QUIZ) },
                    icon = { Icon(imageVector = Icons.Default.Quiz, contentDescription = "Ödev & Test") },
                    label = { Text("Testler", fontWeight = FontWeight.Bold, fontSize = 10.sp) },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = SkyPrimary,
                        selectedTextColor = SkyPrimary,
                        unselectedIconColor = Slate400,
                        unselectedTextColor = Slate400,
                        indicatorColor = SkyPrimary.copy(alpha = 0.15f)
                    ),
                    modifier = Modifier.testTag("nav_item_quiz")
                )

                // 4. Sıralama Ödevi (Okul ödevi: günleri sıralı saymak)
                NavigationBarItem(
                    selected = uiState.activeTab == AppTab.ORDERING,
                    onClick = { viewModel.selectTab(AppTab.ORDERING) },
                    icon = { Icon(imageVector = Icons.Default.Sort, contentDescription = "Sıralama") },
                    label = { Text("Sıralama", fontWeight = FontWeight.Bold, fontSize = 10.sp) },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = SkyPrimary,
                        selectedTextColor = SkyPrimary,
                        unselectedIconColor = Slate400,
                        unselectedTextColor = Slate400,
                        indicatorColor = SkyPrimary.copy(alpha = 0.15f)
                    ),
                    modifier = Modifier.testTag("nav_item_ordering")
                )

                // 5. Kelime Kartları
                NavigationBarItem(
                    selected = uiState.activeTab == AppTab.FLASHCARDS,
                    onClick = { viewModel.selectTab(AppTab.FLASHCARDS) },
                    icon = { Icon(imageVector = Icons.Default.Style, contentDescription = "Kartlar") },
                    label = { Text("Kartlar", fontWeight = FontWeight.Bold, fontSize = 10.sp) },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = SkyPrimary,
                        selectedTextColor = SkyPrimary,
                        unselectedIconColor = Slate400,
                        unselectedTextColor = Slate400,
                        indicatorColor = SkyPrimary.copy(alpha = 0.15f)
                    ),
                    modifier = Modifier.testTag("nav_item_flashcards")
                )
            }
        }
    ) { innerPadding ->
        when (uiState.activeTab) {
            AppTab.LESSONS -> {
                LessonsScreen(
                    uiState = uiState,
                    viewModel = viewModel,
                    modifier = Modifier.padding(innerPadding)
                )
            }
            AppTab.RHYTHMIC -> {
                RhythmicCountingScreen(
                    viewModel = viewModel,
                    modifier = Modifier.padding(innerPadding)
                )
            }
            AppTab.QUIZ -> {
                QuizScreen(
                    uiState = uiState,
                    viewModel = viewModel,
                    onOpenSettings = { isSettingsOpen = true },
                    modifier = Modifier.padding(innerPadding)
                )
            }
            AppTab.ORDERING -> {
                OrderingScreen(
                    uiState = uiState,
                    viewModel = viewModel,
                    modifier = Modifier.padding(innerPadding)
                )
            }
            AppTab.FLASHCARDS -> {
                FlashcardsScreen(
                    uiState = uiState,
                    viewModel = viewModel,
                    modifier = Modifier.padding(innerPadding)
                )
            }
            AppTab.GUIDE -> {
                DaysGuideScreen(
                    viewModel = viewModel,
                    modifier = Modifier.padding(innerPadding)
                )
            }
        }

        if (isSettingsOpen) {
            SettingsSheet(
                uiState = uiState,
                viewModel = viewModel,
                onDismiss = { isSettingsOpen = false }
            )
        }
    }
}

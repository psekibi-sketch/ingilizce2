package com.example.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.ClassroomLifeRepository
import com.example.data.DayItem
import com.example.data.DaysRepository
import com.example.data.QuestionDirection
import com.example.data.QuizQuestion
import com.example.util.HapticHelper
import com.example.util.TtsManager
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch

enum class AppTab {
    HOME,        // Ana Menü: 2 Ana Başlık (Matematik ve İngilizce)
    LESSONS,     // İngilizce Dersleri (1-6. Üniteler)
    RHYTHMIC,    // Matematik (2, 3, 4, 5'er Ritmik Sayma & Çarpım Tablosu)
    QUIZ,        // Testler
    ORDERING,    // Sıralama Ödevi (Haftanın Günleri Sıralı)
    FLASHCARDS,  // Kelime Kartları
    GUIDE        // Günler & Eşyalar Rehberi
}

data class QuizUiState(
    val activeTab: AppTab = AppTab.HOME,
    val selectedThemeNumber: Int = 2,
    val selectedPageNumber: Int = 17,
    // Active Study Timer (10 saniye hareketsizlikte duran sayaç)
    val studyTimeSeconds: Int = 0,
    val isTimerActive: Boolean = true,
    // Quiz / Ödev State
    val currentQuestion: QuizQuestion? = null,
    val remainingCount: Int = 20,
    val totalCount: Int = 20,
    val score: Int = 0,
    val streak: Int = 0,
    val bestStreak: Int = 0,
    val correctAnswersCount: Int = 0,
    val wrongAnswersCount: Int = 0,
    val isAnswerChecked: Boolean = false,
    val selectedOption: DayItem? = null,
    val isCorrect: Boolean? = null,
    val wrongAttemptsCount: Int = 0, // Bu soruda yapılan yanlış deneme sayısı
    val isHintVisible: Boolean = false,
    val isVictory: Boolean = false,
    val speechRate: Float = 0.85f,
    val soundEnabled: Boolean = true,
    val hapticEnabled: Boolean = true,
    val autoPronounce: Boolean = true,
    // Ordering Homework State
    val orderedDays: List<DayItem> = emptyList(),
    val poolDays: List<DayItem> = emptyList(),
    val isOrderingCompleted: Boolean = false,
    // Page 18
    val page18Selections: Map<Int, String> = emptyMap(),
    // Page 20 Cipher
    val cipherInputs: String = "",
    val isCipherSolved: Boolean = false,
    // Page 21 Colouring
    val page21ColoredItems: Set<Int> = emptySet(),
    // Page 22 Math Unscramble
    val page22Answers: Map<String, String> = emptyMap(),
    // Page 23 Reading comprehension
    val page23Answers: Map<Int, String> = emptyMap(),
    // Page 24 Count answers
    val page24Answers: Map<Int, Int> = emptyMap(),
    val userStarRating: Int = 5,
    // Flashcard state
    val flashcardIndex: Int = 0,
    val isFlashcardFlipped: Boolean = false
)

class QuizViewModel(application: Application) : AndroidViewModel(application) {

    private val ttsManager = TtsManager(application)
    private val hapticHelper = HapticHelper(application)

    private val _uiState = MutableStateFlow(QuizUiState())
    val uiState: StateFlow<QuizUiState> = _uiState.asStateFlow()

    private val questionQueue = ArrayDeque<QuizQuestion>()

    private var lastUserActivityTimestamp: Long = System.currentTimeMillis()

    init {
        ttsManager.speechRate = 0.85f
        startNewQuiz(20)
        resetOrderingHomework()
        startActiveStudyTimer()
    }

    fun recordUserActivity() {
        lastUserActivityTimestamp = System.currentTimeMillis()
        if (!_uiState.value.isTimerActive) {
            _uiState.update { it.copy(isTimerActive = true) }
        }
    }

    private fun startActiveStudyTimer() {
        viewModelScope.launch {
            while (isActive) {
                delay(1000)
                val now = System.currentTimeMillis()
                val idleSeconds = (now - lastUserActivityTimestamp) / 1000
                if (idleSeconds <= 10) {
                    _uiState.update {
                        it.copy(
                            studyTimeSeconds = it.studyTimeSeconds + 1,
                            isTimerActive = true
                        )
                    }
                } else {
                    if (_uiState.value.isTimerActive) {
                        _uiState.update { it.copy(isTimerActive = false) }
                    }
                }
            }
        }
    }

    // --- Ders & Sayfa Yönetimi ---
    fun selectTheme(themeNumber: Int) {
        recordUserActivity()
        _uiState.update { it.copy(selectedThemeNumber = themeNumber) }
    }

    fun selectPage(pageNumber: Int) {
        recordUserActivity()
        _uiState.update { it.copy(selectedPageNumber = pageNumber) }
    }

    /**
     * Kullanıcı isteği: Sayfadaki alıştırmayı sıfırlayıp dersi en baştan başlatma butonu
     */
    fun resetCurrentPage(pageNumber: Int) {
        recordUserActivity()
        if (_uiState.value.hapticEnabled) hapticHelper.vibrateClick()
        when (pageNumber) {
            18 -> _uiState.update { it.copy(page18Selections = emptyMap()) }
            20 -> _uiState.update { it.copy(cipherInputs = "", isCipherSolved = false) }
            21 -> _uiState.update { it.copy(page21ColoredItems = emptySet()) }
            22 -> _uiState.update { it.copy(page22Answers = emptyMap()) }
            23 -> _uiState.update { it.copy(page23Answers = emptyMap()) }
            24 -> _uiState.update { it.copy(page24Answers = emptyMap(), userStarRating = 5) }
        }
    }

    fun speakText(text: String) {
        recordUserActivity()
        if (_uiState.value.soundEnabled) {
            ttsManager.speak(text)
        }
    }

    fun speakTurkish(text: String) {
        recordUserActivity()
        if (_uiState.value.soundEnabled) {
            ttsManager.speakTurkish(text)
        }
    }

    fun stopSpeaking() {
        ttsManager.stop()
    }

    fun speakWord(text: String, slow: Boolean = false) {
        recordUserActivity()
        if (_uiState.value.hapticEnabled) hapticHelper.vibrateClick()
        if (_uiState.value.soundEnabled) {
            ttsManager.speak(text, if (slow) 0.6f else null)
        }
    }

    // --- Sayfa 18 Etkileşimi ---
    fun selectPage18Option(itemNumber: Int, option: String) {
        recordUserActivity()
        val item = ClassroomLifeRepository.page18Exercises.find { it.itemNumber == itemNumber }
        val isCorrect = (item?.correctEn == option)

        if (_uiState.value.hapticEnabled) {
            if (isCorrect) hapticHelper.vibrateSuccess() else hapticHelper.vibrateError()
        }

        if (_uiState.value.soundEnabled) {
            ttsManager.speak(option)
        }

        _uiState.update {
            val updated = it.page18Selections.toMutableMap()
            updated[itemNumber] = option
            it.copy(page18Selections = updated)
        }
    }

    // --- Sayfa 21 Renk Etkileşimi ---
    fun togglePage21Color(id: Int) {
        recordUserActivity()
        if (_uiState.value.hapticEnabled) hapticHelper.vibrateSuccess()
        val item = ClassroomLifeRepository.page21ColourItems.find { it.id == id }
        if (item != null && _uiState.value.soundEnabled) {
            ttsManager.speak(item.instructionEn)
        }
        _uiState.update {
            val updated = it.page21ColoredItems.toMutableSet()
            if (updated.contains(id)) updated.remove(id) else updated.add(id)
            it.copy(page21ColoredItems = updated)
        }
    }

    // --- Sayfa 22 Matematik Harf Dizimi ---
    fun setPage22Answer(letterKey: String, answer: String) {
        recordUserActivity()
        val ex = ClassroomLifeRepository.page22MathExercises.find { it.letter == letterKey } ?: return
        val isCorrect = answer.equals(ex.wordEn, ignoreCase = true)

        if (_uiState.value.hapticEnabled) {
            if (isCorrect) hapticHelper.vibrateSuccess() else hapticHelper.vibrateClick()
        }

        if (isCorrect && _uiState.value.soundEnabled) {
            ttsManager.speak(ex.wordEn)
        }

        _uiState.update {
            val updated = it.page22Answers.toMutableMap()
            updated[letterKey] = answer
            it.copy(page22Answers = updated)
        }
    }

    // --- Sayfa 23 Okuma Parçası Boşluk Doldurma ---
    fun selectPage23Answer(id: Int, answer: String) {
        recordUserActivity()
        val q = ClassroomLifeRepository.page23Questions.find { it.id == id }
        val isCorrect = (q?.correctAnswer == answer)

        if (_uiState.value.hapticEnabled) {
            if (isCorrect) hapticHelper.vibrateSuccess() else hapticHelper.vibrateError()
        }
        if (_uiState.value.soundEnabled) {
            ttsManager.speak(answer)
        }
        _uiState.update {
            val updated = it.page23Answers.toMutableMap()
            updated[id] = answer
            it.copy(page23Answers = updated)
        }
    }

    // --- Sayfa 24 Değerlendirme & Sayma ---
    fun setPage24Answer(id: Int, count: Int) {
        recordUserActivity()
        val ex = ClassroomLifeRepository.page24CountExercises.find { it.id == id }
        if (ex != null) {
            if (count == ex.targetCount) {
                if (_uiState.value.hapticEnabled) hapticHelper.vibrateSuccess()
                if (_uiState.value.soundEnabled) ttsManager.speak(ex.answerEn)
            } else {
                if (_uiState.value.hapticEnabled) hapticHelper.vibrateError()
            }
        }
        _uiState.update {
            val updated = it.page24Answers.toMutableMap()
            updated[id] = count
            it.copy(page24Answers = updated)
        }
    }

    fun setUserStarRating(rating: Int) {
        recordUserActivity()
        if (_uiState.value.hapticEnabled) hapticHelper.vibrateSuccess()
        _uiState.update { it.copy(userStarRating = rating) }
    }

    // --- Sıralı Gün Sayma Ödevi (Ordering Homework) ---
    fun resetOrderingHomework() {
        recordUserActivity()
        val allDaysShuffled = DaysRepository.allDays.shuffled()
        _uiState.update {
            it.copy(
                orderedDays = emptyList(),
                poolDays = allDaysShuffled,
                isOrderingCompleted = false
            )
        }
    }

    fun selectDayForOrdering(day: DayItem) {
        recordUserActivity()
        val state = _uiState.value
        val expectedNextId = state.orderedDays.size + 1
        val isCorrectNextDay = (day.id == expectedNextId)

        if (state.soundEnabled) {
            ttsManager.speak(day.en)
        }

        if (isCorrectNextDay) {
            if (state.hapticEnabled) hapticHelper.vibrateSuccess()
            val newOrdered = state.orderedDays + day
            val newPool = state.poolDays.filter { it.id != day.id }
            val isDone = (newOrdered.size == DaysRepository.allDays.size)

            _uiState.update {
                it.copy(
                    orderedDays = newOrdered,
                    poolDays = newPool,
                    isOrderingCompleted = isDone
                )
            }

            if (isDone && state.soundEnabled) {
                viewModelScope.launch {
                    delay(300)
                    ttsManager.speak("Great job! All days are in perfect order!")
                }
            }
        } else {
            if (state.hapticEnabled) hapticHelper.vibrateError()
        }
    }

    fun removeLastOrderedDay() {
        recordUserActivity()
        if (_uiState.value.hapticEnabled) hapticHelper.vibrateClick()
        val state = _uiState.value
        if (state.orderedDays.isNotEmpty()) {
            val lastDay = state.orderedDays.last()
            val newOrdered = state.orderedDays.dropLast(1)
            val newPool = (state.poolDays + lastDay).sortedBy { it.id }
            _uiState.update {
                it.copy(
                    orderedDays = newOrdered,
                    poolDays = newPool,
                    isOrderingCompleted = false
                )
            }
        }
    }

    // --- Sınav / Test (Quiz) ---
    fun startNewQuiz(count: Int = 20) {
        recordUserActivity()
        questionQueue.clear()
        val questions = DaysRepository.generateQuestionQueue(count)
        questionQueue.addAll(questions)

        val firstQuestion = questionQueue.firstOrNull()

        _uiState.update {
            it.copy(
                currentQuestion = firstQuestion,
                remainingCount = questionQueue.size,
                totalCount = count,
                score = 0,
                streak = 0,
                correctAnswersCount = 0,
                wrongAnswersCount = 0,
                isAnswerChecked = false,
                selectedOption = null,
                isCorrect = null,
                wrongAttemptsCount = 0,
                isHintVisible = false,
                isVictory = false
            )
        }

        firstQuestion?.let { q ->
            if (_uiState.value.autoPronounce && _uiState.value.soundEnabled) {
                viewModelScope.launch {
                    delay(300)
                    ttsManager.speak(q.target.en)
                }
            }
        }
    }

    /**
     * Kullanıcı isteği: Yanlış seçtiğinde doğruyu kendisi yapana kadar geçişe izin verilmesin!
     * Yanlış seçtiğinde kullanıcıya tekrar deneme hakkı verilir.
     */
    fun selectOption(option: DayItem) {
        recordUserActivity()
        val state = _uiState.value
        val currentQ = state.currentQuestion ?: return

        if (state.hapticEnabled) hapticHelper.vibrateClick()

        val isAnswerCorrect = (option.id == currentQ.target.id)

        if (isAnswerCorrect) {
            // DOĞRU CEVAP
            if (state.hapticEnabled) hapticHelper.vibrateSuccess()
            if (state.soundEnabled) {
                ttsManager.speak(currentQ.target.en)
            }

            val newStreak = state.streak + 1
            val newBest = maxOf(state.bestStreak, newStreak)
            val addedScore = 10 + (newStreak * 2)

            _uiState.update {
                it.copy(
                    isAnswerChecked = true,
                    selectedOption = option,
                    isCorrect = true,
                    score = it.score + addedScore,
                    streak = newStreak,
                    bestStreak = newBest,
                    correctAnswersCount = it.correctAnswersCount + 1
                )
            }

            if (questionQueue.isNotEmpty()) {
                questionQueue.removeFirst()
            }

            viewModelScope.launch {
                delay(1000)
                if (_uiState.value.isAnswerChecked && _uiState.value.isCorrect == true) {
                    advanceToNextQuestion()
                }
            }
        } else {
            // YANLIŞ CEVAP: Çocuğa hemen doğru cevabı vermeyip tekrar deneme fırsatı tanıyoruz!
            if (state.hapticEnabled) hapticHelper.vibrateError()
            if (state.soundEnabled) {
                ttsManager.speak("Try again")
            }

            // Soru kuyruğunun sonuna da eklenir, böylece ileride tekrar pekiştirir
            val currentMissed = questionQueue.removeFirstOrNull()
            if (currentMissed != null) {
                val others = DaysRepository.allDays.filter { it.id != currentMissed.target.id }.shuffled().take(3)
                val reshuffled = currentMissed.copy(options = (others + currentMissed.target).shuffled())
                questionQueue.addLast(reshuffled)
            }

            _uiState.update {
                it.copy(
                    isAnswerChecked = true,
                    selectedOption = option,
                    isCorrect = false,
                    streak = 0,
                    wrongAttemptsCount = it.wrongAttemptsCount + 1,
                    wrongAnswersCount = it.wrongAnswersCount + 1
                )
            }
        }
    }

    /**
     * Yanlış yapıldığında çocuğu bu soruda tekrar denemeye hazırlar
     */
    fun retryCurrentQuestion() {
        recordUserActivity()
        _uiState.update {
            it.copy(
                isAnswerChecked = false,
                selectedOption = null,
                isCorrect = null
            )
        }
    }

    fun advanceToNextQuestion() {
        recordUserActivity()
        val nextQuestion = questionQueue.firstOrNull()
        if (nextQuestion == null) {
            _uiState.update {
                it.copy(
                    isVictory = true,
                    isAnswerChecked = false,
                    selectedOption = null,
                    isCorrect = null,
                    wrongAttemptsCount = 0
                )
            }
        } else {
            _uiState.update {
                it.copy(
                    currentQuestion = nextQuestion,
                    remainingCount = questionQueue.size,
                    isAnswerChecked = false,
                    selectedOption = null,
                    isCorrect = null,
                    wrongAttemptsCount = 0,
                    isHintVisible = false
                )
            }

            if (_uiState.value.autoPronounce && _uiState.value.soundEnabled) {
                ttsManager.speak(nextQuestion.target.en)
            }
        }
    }

    fun toggleHint() {
        recordUserActivity()
        if (_uiState.value.hapticEnabled) hapticHelper.vibrateClick()
        _uiState.update { it.copy(isHintVisible = !it.isHintVisible) }
    }

    fun confirmSpeakingCorrect() {
        recordUserActivity()
        val state = _uiState.value
        val currentQ = state.currentQuestion ?: return

        if (state.hapticEnabled) hapticHelper.vibrateSuccess()
        if (state.soundEnabled) {
            ttsManager.speak("Excellent pronunciation! Well done!")
        }

        val newStreak = state.streak + 1
        val newBestStreak = maxOf(state.bestStreak, newStreak)
        val newScore = state.score + 10
        val newCorrectCount = state.correctAnswersCount + 1

        _uiState.update {
            it.copy(
                score = newScore,
                streak = newStreak,
                bestStreak = newBestStreak,
                correctAnswersCount = newCorrectCount,
                isAnswerChecked = true,
                isCorrect = true,
                selectedOption = currentQ.target
            )
        }

        viewModelScope.launch {
            delay(1200)
            advanceToNextQuestion()
        }
    }

    fun speakCurrentWord(slow: Boolean = false) {
        recordUserActivity()
        val word = _uiState.value.currentQuestion?.target?.en ?: return
        if (_uiState.value.hapticEnabled) hapticHelper.vibrateClick()
        ttsManager.speak(word, if (slow) 0.6f else null)
    }

    fun selectTab(tab: AppTab) {
        recordUserActivity()
        if (_uiState.value.hapticEnabled) hapticHelper.vibrateClick()
        _uiState.update { it.copy(activeTab = tab) }
    }

    fun setSpeechRate(rate: Float) {
        recordUserActivity()
        ttsManager.speechRate = rate
        _uiState.update { it.copy(speechRate = rate) }
    }

    fun toggleSound() {
        recordUserActivity()
        _uiState.update { it.copy(soundEnabled = !it.soundEnabled) }
    }

    fun toggleHaptic() {
        recordUserActivity()
        _uiState.update { it.copy(hapticEnabled = !it.hapticEnabled) }
    }

    fun toggleAutoPronounce() {
        recordUserActivity()
        _uiState.update { it.copy(autoPronounce = !it.autoPronounce) }
    }

    // Flashcard functions
    fun flipFlashcard() {
        recordUserActivity()
        if (_uiState.value.hapticEnabled) hapticHelper.vibrateClick()
        _uiState.update { it.copy(isFlashcardFlipped = !it.isFlashcardFlipped) }
    }

    fun nextFlashcard() {
        recordUserActivity()
        if (_uiState.value.hapticEnabled) hapticHelper.vibrateClick()
        val allDays = DaysRepository.allDays
        val nextIdx = (_uiState.value.flashcardIndex + 1) % allDays.size
        _uiState.update {
            it.copy(
                flashcardIndex = nextIdx,
                isFlashcardFlipped = false
            )
        }
        if (_uiState.value.autoPronounce && _uiState.value.soundEnabled) {
            ttsManager.speak(allDays[nextIdx].en)
        }
    }

    fun prevFlashcard() {
        recordUserActivity()
        if (_uiState.value.hapticEnabled) hapticHelper.vibrateClick()
        val allDays = DaysRepository.allDays
        val prevIdx = if (_uiState.value.flashcardIndex > 0) _uiState.value.flashcardIndex - 1 else allDays.size - 1
        _uiState.update {
            it.copy(
                flashcardIndex = prevIdx,
                isFlashcardFlipped = false
            )
        }
        if (_uiState.value.autoPronounce && _uiState.value.soundEnabled) {
            ttsManager.speak(allDays[prevIdx].en)
        }
    }

    override fun onCleared() {
        super.onCleared()
        ttsManager.shutdown()
    }
}

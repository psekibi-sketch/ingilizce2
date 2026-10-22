package com.example.util

import android.content.Context
import android.speech.tts.TextToSpeech
import android.util.Log
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.util.Locale

class TtsManager(context: Context) {
    private var tts: TextToSpeech? = null
    private val _isReady = MutableStateFlow(false)
    val isReady: StateFlow<Boolean> = _isReady.asStateFlow()

    private val _isSpeaking = MutableStateFlow(false)
    val isSpeaking: StateFlow<Boolean> = _isSpeaking.asStateFlow()

    var speechRate: Float = 0.85f
        set(value) {
            field = value
            tts?.setSpeechRate(value)
        }

    init {
        tts = TextToSpeech(context.applicationContext) { status ->
            if (status == TextToSpeech.SUCCESS) {
                val result = tts?.setLanguage(Locale.US)
                if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                    Log.w("TtsManager", "US English not supported, trying default Locale")
                    tts?.setLanguage(Locale.ENGLISH)
                }
                tts?.setSpeechRate(speechRate)
                _isReady.value = true
            } else {
                Log.e("TtsManager", "TTS initialization failed with status: $status")
            }
        }
    }

    fun speak(text: String, rateOverride: Float? = null) {
        if (!_isReady.value || tts == null) return
        try {
            tts?.language = Locale.US
            rateOverride?.let { tts?.setSpeechRate(it) } ?: tts?.setSpeechRate(speechRate)
            tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, "LingoDaysUtterance")
        } catch (e: Exception) {
            Log.e("TtsManager", "Error speaking text: $text", e)
        }
    }

    fun speakTurkish(text: String, rateOverride: Float = 0.92f) {
        if (!_isReady.value || tts == null) return
        try {
            val trLocale = Locale.forLanguageTag("tr-TR")
            tts?.language = trLocale
            tts?.setSpeechRate(rateOverride)
            tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, "LingoDaysTrUtterance")
        } catch (e: Exception) {
            Log.e("TtsManager", "Error speaking Turkish text: $text", e)
        }
    }

    fun stop() {
        try {
            tts?.stop()
        } catch (e: Exception) {
            // ignore
        }
    }

    fun shutdown() {
        try {
            tts?.stop()
            tts?.shutdown()
        } catch (e: Exception) {
            // ignore
        }
        tts = null
        _isReady.value = false
    }
}

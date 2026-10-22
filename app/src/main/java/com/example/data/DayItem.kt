package com.example.data

data class DayItem(
    val id: Int,
    val en: String,
    val tr: String,
    val hint: String,
    val mnemonicKey: String,
    val abbrev: String,
    val phonetic: String,
    val isWeekend: Boolean,
    val exampleEn: String,
    val exampleTr: String,
    val funFact: String
)

object DaysRepository {
    val allDays = listOf(
        DayItem(
            id = 1,
            en = "Monday",
            tr = "Pazartesi",
            hint = "Moon-day (Ay günü) - Haftanın 1. iş günü",
            mnemonicKey = "Moon-day 🌙",
            abbrev = "Mon",
            phonetic = "/ˈmʌn.deɪ/",
            isWeekend = false,
            exampleEn = "Monday is the start of the work week.",
            exampleTr = "Pazartesi çalışma haftasının başlangıcıdır.",
            funFact = "Eski İngilizce'de 'Mōnandæg' yani 'Ay'ın günü' anlamına gelirdi."
        ),
        DayItem(
            id = 2,
            en = "Tuesday",
            tr = "Salı",
            hint = "Two-sday (2. gün) - İkinci gün Salı",
            mnemonicKey = "Two-sday ✌️",
            abbrev = "Tue",
            phonetic = "/ˈtjuːz.deɪ/",
            isWeekend = false,
            exampleEn = "We have a team meeting on Tuesday.",
            exampleTr = "Salı günü ekip toplantımız var.",
            funFact = "İskandinav savaş tanrısı Tyr (Tiw)'den adını almıştır."
        ),
        DayItem(
            id = 3,
            en = "Wednesday",
            tr = "Çarşamba",
            hint = "Wed-nes-day - Ortadaki en uzun gün, d harfi okunmaz!",
            mnemonicKey = "Wed-nes-day 🐪",
            abbrev = "Wed",
            phonetic = "/ˈwenz.deɪ/",
            isWeekend = false,
            exampleEn = "Wednesday is known as 'Hump Day' in the US.",
            exampleTr = "Çarşamba Amerika'da 'Hafta Ortası' olarak bilinir.",
            funFact = "Woden (Odin) tanrısından türemiştir; 'd' harfi telaffuz edilmez ('Wenz-dey')."
        ),
        DayItem(
            id = 4,
            en = "Thursday",
            tr = "Perşembe",
            hint = "Thor-sday (Şimşek günü) - Cuma öncesi bereketli gün",
            mnemonicKey = "Thor-sday ⚡",
            abbrev = "Thu",
            phonetic = "/ˈθɜːz.deɪ/",
            isWeekend = false,
            exampleEn = "Thursday is almost the weekend!",
            exampleTr = "Perşembe neredeyse hafta sonu demektir!",
            funFact = "Mitolojik şimşek tanrısı Thor'un günüdür ('Thor's Day')."
        ),
        DayItem(
            id = 5,
            en = "Friday",
            tr = "Cuma",
            hint = "Fri-day (Fries / Özgürlük) - Hafta sonu kapısı, sevinç günü",
            mnemonicKey = "Fri-day 🍟🎉",
            abbrev = "Fri",
            phonetic = "/ˈfraɪ.deɪ/",
            isWeekend = false,
            exampleEn = "Thank God it's Friday (TGIF)!",
            exampleTr = "Şükürler olsun bugün Cuma!",
            funFact = "Aşk ve güzellik tanrıçası Frigg'in adından gelir."
        ),
        DayItem(
            id = 6,
            en = "Saturday",
            tr = "Cumartesi",
            hint = "Saturn-day - Gezegen günü, hafta sonu eğlencesi",
            mnemonicKey = "Saturn-day 🪐",
            abbrev = "Sat",
            phonetic = "/ˈsæt.ə.deɪ/",
            isWeekend = true,
            exampleEn = "I love sleeping in on Saturday morning.",
            exampleTr = "Cumartesi sabahı geç uyanmayı severim.",
            funFact = "Roma tarım tanrısı Satürn'den (Saturn) adını alan tek gündür."
        ),
        DayItem(
            id = 7,
            en = "Sunday",
            tr = "Pazar",
            hint = "Sun-day (Güneş günü) - Dinlenme ve aile günü",
            mnemonicKey = "Sun-day ☀️",
            abbrev = "Sun",
            phonetic = "/ˈsʌn.deɪ/",
            isWeekend = true,
            exampleEn = "Sunday is a peaceful rest day with family.",
            exampleTr = "Pazar aileyle huzurlu bir dinlenme günüdür.",
            funFact = "Eski kültürlerde Güneş'e (Sun) adanmış kutsal dinlenme günüdür."
        )
    )

    fun getDayById(id: Int): DayItem? = allDays.find { it.id == id }

    fun generateQuestionQueue(count: Int = 20): List<QuizQuestion> {
        val list = mutableListOf<QuizQuestion>()
        for (i in 0 until count) {
            val target = allDays[i % allDays.size]
            val direction = when (i % 4) {
                0 -> QuestionDirection.TR_TO_EN
                1 -> QuestionDirection.EN_TO_TR
                2 -> QuestionDirection.LISTENING
                else -> QuestionDirection.SPEAKING
            }
            val otherOptions = allDays.filter { it.id != target.id }.shuffled().take(3)
            val allOptions = (otherOptions + target).shuffled()
            list.add(QuizQuestion(id = "q_$i", target = target, direction = direction, options = allOptions))
        }
        return list.shuffled()
    }
}

enum class QuestionDirection {
    TR_TO_EN,
    EN_TO_TR,
    LISTENING,
    SPEAKING
}

data class QuizQuestion(
    val id: String,
    val target: DayItem,
    val direction: QuestionDirection,
    val options: List<DayItem>
)

package com.example.data

data class BookThemeInfo(
    val id: Int,
    val number: Int,
    val title: String,
    val titleTr: String,
    val pageRange: String,
    val isAvailable: Boolean = true
)

data class BookPageInfo(
    val pageNumber: Int,
    val title: String,
    val descriptionTr: String
)

data class ClassroomVocabItem(
    val id: String,
    val en: String,
    val tr: String,
    val phoneticTr: String,
    val iconEmoji: String,
    val category: String = "Eşya"
)

data class ClassroomCommandItem(
    val letter: String,
    val en: String,
    val tr: String,
    val phoneticTr: String,
    val matchedPictureNumber: Int,
    val description: String,
    val iconEmoji: String = "👉"
)

data class Page18Exercise(
    val itemNumber: Int,
    val correctEn: String,
    val correctTr: String,
    val phoneticTr: String,
    val options: List<String>,
    val iconEmoji: String
)

data class Page21ColourItem(
    val id: Int,
    val instructionEn: String,
    val instructionTr: String,
    val phoneticTr: String,
    val colorNameTr: String,
    val previewEmoji: String
)

data class MathWordExercise(
    val letter: String,
    val num1: Int,
    val num2: Int,
    val sum: Int,
    val wordEn: String,
    val scrambledLetters: String,
    val phoneticTr: String
)

data class Page23Question(
    val id: Int,
    val questionEn: String,
    val correctAnswer: String,
    val options: List<String>
)

data class CountExercise(
    val id: Int,
    val questionEn: String,
    val questionTr: String,
    val targetCount: Int,
    val answerEn: String,
    val itemEn: String,
    val itemTr: String,
    val iconEmoji: String
)

object ClassroomLifeRepository {

    val allThemes = listOf(
        BookThemeInfo(1, 1, "Words & Greetings", "Kelimeler, Günler & Selamlaşma", "Sayfa 9 - 16", isAvailable = true),
        BookThemeInfo(2, 2, "Classroom Life", "Sınıf Yaşamı & Komutlar", "Sayfa 17 - 24", isAvailable = true),
        BookThemeInfo(3, 3, "Personal Life", "Kişisel Yaşam & Vücut", "Sayfa 25 - 32", isAvailable = true),
        BookThemeInfo(4, 4, "Family Life", "Aile Yaşamı & Bireyler", "Sayfa 33 - 40", isAvailable = true),
        BookThemeInfo(5, 5, "Homes & Houses", "Evimiz & Odalar", "Sayfa 41 - 48", isAvailable = true),
        BookThemeInfo(6, 6, "Life in the City", "Şehirde Yaşam & Dünya", "Sayfa 49 - 56", isAvailable = true)
    )

    val allPages = listOf(
        BookPageInfo(17, "Unit 2 Kapak", "Classroom Life Ünite Girişi"),
        BookPageInfo(18, "Sınıf Eşyaları", "Listen and point, choose"),
        BookPageInfo(19, "Eşyalar & Komutlar", "Look and number, draw & say"),
        BookPageInfo(20, "Sınıf Yönergeleri & Şifre", "Open the door please & Flower cipher"),
        BookPageInfo(21, "Oku ve Boya", "Read and colour"),
        BookPageInfo(22, "Matematik & Sayılar", "Count and write, letter unscramble"),
        BookPageInfo(23, "Mustafa's Class", "Hikaye ve Boşluk Doldurma"),
        BookPageInfo(24, "Kaç Tane? & Değerlendir", "How many? and Let's Check!")
    )

    // Sayfa 18 Eşyaları
    val page18Exercises = listOf(
        Page18Exercise(
            itemNumber = 1,
            correctEn = "a pencil case",
            correctTr = "kalem kutusu / kalemlik",
            phoneticTr = "e pensıl keys",
            options = listOf("a desk", "a pencil case", "a sharpener"),
            iconEmoji = "👝"
        ),
        Page18Exercise(
            itemNumber = 2,
            correctEn = "a ruler",
            correctTr = "cetvel",
            phoneticTr = "e ruulır",
            options = listOf("scissors", "a ruler", "a crayon"),
            iconEmoji = "📏"
        ),
        Page18Exercise(
            itemNumber = 3,
            correctEn = "a chair",
            correctTr = "sandalye",
            phoneticTr = "e çeer",
            options = listOf("a computer", "a clock", "a chair"),
            iconEmoji = "🪑"
        ),
        Page18Exercise(
            itemNumber = 4,
            correctEn = "a whiteboard",
            correctTr = "yazı tahtası",
            phoneticTr = "e vaytbord",
            options = listOf("a table", "a whiteboard", "a window"),
            iconEmoji = "📋"
        ),
        Page18Exercise(
            itemNumber = 5,
            correctEn = "a bookcase",
            correctTr = "kitaplık",
            phoneticTr = "e buk-keys",
            options = listOf("a bookcase", "a wall", "a door"),
            iconEmoji = "📚"
        ),
        Page18Exercise(
            itemNumber = 6,
            correctEn = "a notebook",
            correctTr = "defter",
            phoneticTr = "e nootbuk",
            options = listOf("a tablet", "a rubber", "a notebook"),
            iconEmoji = "📓"
        )
    )

    // Sayfa 19 Eşyaları (Draw, colour and say)
    val page19DrawingItems = listOf(
        ClassroomVocabItem("desk", "a desk", "sıra", "e desk", "🏫"),
        ClassroomVocabItem("sharpener", "a sharpener", "kalemtıraş", "e şarpnır", "✏️"),
        ClassroomVocabItem("scissors", "scissors", "makas", "sizırs", "✂️"),
        ClassroomVocabItem("crayon", "a crayon", "pastel boya", "e kreyon", "🖍️"),
        ClassroomVocabItem("computer", "a computer", "bilgisayar", "e kımpyutır", "💻"),
        ClassroomVocabItem("clock", "a clock", "duvar saati", "e klok", "⏰"),
        ClassroomVocabItem("table", "a table", "masa", "e teybıl", "🪵"),
        ClassroomVocabItem("window", "a window", "pencere", "e vindov", "🪟"),
        ClassroomVocabItem("wall", "a wall", "duvar", "e vol", "🧱"),
        ClassroomVocabItem("door", "a door", "kapı", "e door", "🚪"),
        ClassroomVocabItem("tablet", "a tablet", "tablet bilgisayar", "e teblıt", "📱"),
        ClassroomVocabItem("rubber", "a rubber", "silgi", "e rabır", "🧼")
    )

    // Sayfa 20 Komutları
    val page20Commands = listOf(
        ClassroomCommandItem("a", "Open the door, please!", "Kapıyı aç, lütfen!", "Opın dı door, pliiz!", 1, "Kapıyı açıyor", "🚪"),
        ClassroomCommandItem("b", "Close the window, please!", "Pencereyi kapat, lütfen!", "Klooz dı vindov, pliiz!", 2, "Pencereyi kapatıyor", "🪟"),
        ClassroomCommandItem("c", "Put your pencil in the box, please!", "Kalemini kutuya koy, lütfen!", "Put yor pensıl in dı boks, pliiz!", 3, "Kalemi kutuya koyuyor", "✏️"),
        ClassroomCommandItem("d", "Pass the rubber, please!", "Silgiyi uzat, lütfen!", "Paas dı rabır, pliiz!", 4, "Silgiyi arkadaşına uzatıyor", "🧼"),
        ClassroomCommandItem("e", "Come to the board, please!", "Tahtaya gel, lütfen!", "Kam tu dı bord, pliiz!", 5, "Tahtanın önüne geliyor", "📋")
    )

    const val PAGE_20_SECRET_CODE = "CAN I OPEN THE DOOR?"
    const val PAGE_20_SECRET_TR = "Kapıyı açabilir miyim?"

    // Sayfa 21 Oku ve Boya (Read and Colour)
    val page21ColourItems = listOf(
        Page21ColourItem(1, "This is a book. It's orange.", "Bu bir kitaptır. O turuncudur.", "Dis iz e buk. İts orınç.", "Turuncu", "🟧"),
        Page21ColourItem(2, "This is a rubber. It's red and blue.", "Bu bir silgidir. O kırmızı ve mavidir.", "Dis iz e rabır. İts red end blu.", "Kırmızı ve Mavi", "🟥🟦"),
        Page21ColourItem(3, "This is a sharpener. It's yellow.", "Bu bir kalemtıraştır. O sarıdır.", "Dis iz e şarpnır. İts yelov.", "Sarı", "🟨"),
        Page21ColourItem(4, "This is a tablet. It's white and black.", "Bu bir tablettir. O beyaz ve siyahtır.", "Dis iz e teblıt. İts vayt end blek.", "Beyaz ve Siyah", "⬜⬛"),
        Page21ColourItem(5, "This is a pencil case. It's green and brown.", "Bu bir kalemliktir. O yeşil ve kahverengidir.", "Dis iz e pensıl keys. İts griin end bravn.", "Yeşil ve Kahverengi", "🟩🟫")
    )

    // Sayfa 22 Matematik + Karışık Harfler (Count and write)
    val page22MathExercises = listOf(
        MathWordExercise("a", 3, 5, 8, "EIGHT", "TEGIH", "eyt"),
        MathWordExercise("b", 5, 6, 11, "ELEVEN", "NLEVEE", "ilevın"),
        MathWordExercise("c", 12, 8, 20, "TWENTY", "WETNYT", "tventi"),
        MathWordExercise("d", 10, 6, 16, "SIXTEEN", "TSXENIE", "sikstiin"),
        MathWordExercise("e", 7, 6, 13, "THIRTEEN", "THIRETEN", "törtiin"),
        MathWordExercise("f", 3, 4, 7, "SEVEN", "VESEN", "sevın"),
        MathWordExercise("g", 7, 8, 15, "FIFTEEN", "TEFIEFN", "fiftiin")
    )

    // Sayfa 23 Hikaye
    const val PAGE_23_STORY_EN =
        "Hello! I'm Mustafa. I am a pupil. Mrs. Genç is my teacher. This is my classroom. We have got a smart board, a teacher's desk, and fifteen desks. Look! My bag is red, and Efe's bag is blue."
    const val PAGE_23_STORY_TR =
        "Merhaba! Ben Mustafa. Ben bir öğrenciyim. Bayan Genç benim öğretmenimdir. Bu benim sınıfım. Akıllı tahtamız, öğretmen masamız ve on beş sıramız var. Bakın! Benim çantam kırmızı, Efe'nin çantası mavi."

    val page23Questions = listOf(
        Page23Question(1, "Mustafa is a ________.", "pupil", listOf("pupil", "teacher", "doctor")),
        Page23Question(2, "Mrs. Genç is a ________.", "teacher", listOf("pupil", "teacher", "nurse")),
        Page23Question(3, "They have got a ________ board.", "smart", listOf("black", "smart", "small")),
        Page23Question(4, "Mustafa has got a ________ bag.", "red", listOf("red", "blue", "green")),
        Page23Question(5, "Efe has got a ________ bag.", "blue", listOf("yellow", "blue", "red"))
    )

    // Sayfa 24 Sayma Alıştırması
    val page24CountExercises = listOf(
        CountExercise(1, "How many crayons?", "Kaç tane pastel boya var?", 6, "Six crayons.", "crayons", "pastel boya", "🖍️"),
        CountExercise(2, "How many rubbers?", "Kaç tane silgi var?", 10, "Ten rubbers.", "rubbers", "silgi", "🧼"),
        CountExercise(3, "How many pencil cases?", "Kaç tane kalemlik var?", 3, "Three pencil cases.", "pencil cases", "kalemlik", "👝"),
        CountExercise(4, "How many scissors?", "Kaç tane makas var?", 4, "Four scissors.", "scissors", "makas", "✂️"),
        CountExercise(5, "How many books?", "Kaç tane kitap var?", 5, "Five books.", "books", "kitap", "📚")
    )
}

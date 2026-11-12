const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const bankRegex = /const turkishBooksBank = (\[[\s\S]*?\]);\s*\/\/\s*OKUMA SİSTEMİ/;
const match = html.match(bankRegex);
if (!match) {
  console.error("Could not find turkishBooksBank");
  process.exit(1);
}

const books = eval(match[1]);

// 1. Shorten the 4 long books cleanly to ~280-305 words (~4.5 - 5 min MAX!) while preserving every quiz fact
const shortenedContent = {
  "book_kungfupanda": {
    "title": "Kung Fu Panda: Barış Vadisi ve Altın Mantı Şenliği",
    "subtitle": "Po ve Korkusuz Beşli'nin 300 Kelimelik Bilgelik Macerası",
    "badge": "🐼 KUNG FU PANDA • MAX 5 DK",
    "coverImg": "book_kungfupanda.jpg",
    "targetDurationSec": 280,
    "desc": "Ejderha Savaşçısı Po, Usta Shifu ve Korkusuz Beşli; 100 yıldır çalınmayan Antik Ejderha Çanı'nı çalmak için 6'şar ritmik sayma ve 100'e tamamlama bulmacalarını çözüyor.",
    "pages": [
      {
        "pageNum": 1,
        "title": "1. Bölüm: Barış Vadisi'nde Şenlik Heyecanı",
        "image": "book_kungfupanda.jpg",
        "text": "Barış Vadisi’ndeki tarihi Yeşim Sarayı’nda bugün Geleneksel Altın Mantı ve Bilgelik Şenliği vardı!\n\nSaray avlusunda Ejderha Savaşçısı dev panda Po, elinde buharlar tüten bir kase mantıyla neşeyle antrenman yapıyordu. Yanında Korkusuz Beşli vardı: Kaplan, Maymun, Turna, Engerek ve Mantis!\n\nUsta Shifu asasını yere vurdu: 'Vadideki Antik Ejderha Çanı tam 100 yıldır çalınmadı. O çanı çalmak için dikkatle okumak, dinlemek, sabır ve matematik aklı gerekir. Hazır mısınız?'\n\nPo son mantıyı yiyip gülümsedi: 'Skadoosh! Dostlarımızın birliğiyle başarırız!'"
      },
      {
        "pageNum": 2,
        "title": "2. Bölüm: Taş Basamaklar ve Altışar Sayma",
        "image": "scene_kungfupanda_temple.jpg",
        "text": "Korkusuz Beşli ve Po, sarayın yüksek merdivenlerine yöneldiler. İlk kapıdaki levhada şöyle yazıyordu: 'Gizli kapıyı açmak için 60 basamağı altışar altışar ritmik sayarak çıkmalısınız!'\n\nKaplan öne atıldı: 'Haydi hep birlikte sayalım!' Po her adımda zıplayarak neşeyle saydı:\n'6... 12... 18... 24... 30... 36... 42... 48... 54... ve tam 60!'\n\nSon basamakta dev taş kapı büyük bir gıcırtıyla açıldı ve etrafa mis kokulu çiçekler saçıldı."
      },
      {
        "pageNum": 3,
        "title": "3. Bölüm: Yüz Fener Odası Problemi",
        "image": "scene_panda_lanterns.jpg",
        "text": "İç salonda 100 adet fener yuvası vardı ancak sadece 65 tanesi yanıyordu.\n\nMantis levhayı okudu: 'Odayı aydınlatmak için 100 fener yanmalı. 65 fener yanıyorsa karanlık kalan kaç feneri daha yakmalıyız?'\n\nPo gülümseyerek akıl yürüttü: '65'e önce 5 ekleyelim, 70 olur! 70'ten 100'e de 30 vardır. 30 artı 5 eşittir tam 35 fener daha yakmalıyız!'\n\nTurna havalandı ve 35 feneri daha yakarak salonu pırıl pırıl aydınlattı."
      },
      {
        "pageNum": 4,
        "title": "4. Bölüm: Altın Ejderha Çanı",
        "image": "scene_panda_bell.jpg",
        "text": "Sonunda sarayın en yüksek kulesindeki masif Altın Ejderha Çanı’na ulaştılar.\n\nPo, Korkusuz Beşli ve Usta Shifu el ele verip çanın kalın ipini hep birlikte çektiler: 'DOOOONG!' Muhteşem ses bütün vadiye neşeyle yayıldı.\n\nPo dostlarına sarıldı: 'Gerçek kung fu gücü; doğru düşünmek, sabretmek ve dostlarla yardımlaşmaktır!' Barış Vadisi'nde mantı ziyafeti ve bayram sevinci akşam dek sürdü."
      }
    ]
  },
  "book_sonic": {
    "title": "Kirpi Sonic ve Yeşil Tepe'nin Parlayan Zümrüdü",
    "subtitle": "Sonic, Tails ve Knuckles'ın 4 Dakikalık Hız ve Dostluk Macerası",
    "badge": "⚡ SÜPER HIZ • MAX 4 DK",
    "coverImg": "book_sonic.jpg",
    "targetDurationSec": 240,
    "desc": "Ses hızında koşan mavi kirpi Sonic, iki kuyruklu tilki Tails ve güçlü Knuckles; Yeşil Tepe Adası'ndaki kayıp Kaos Zümrüdü'nü bulmak için 4'er ve 15'er ritmik sayma şifrelerini çözüyor!",
    "pages": [
      {
        "pageNum": 1,
        "title": "1. Bölüm: Yeşil Tepe'de Büyük Haber",
        "image": "book_sonic.jpg",
        "text": "Yeşil Tepe Adası’nda güneş masmavi gökyüzünde pırıl pırıl parlıyordu. Mavi kirpi Sonic kırmızı ayakkabılarıyla yeşil çimenlerde rüzgar gibi süzülüyordu.\n\nGökyüzünden iki kuyruğunu pervane gibi döndürerek uçan dahi dostu tilki Tails geldi! Elindeki dijital ada haritasını göstererek seslendi: 'Sonic! Yeşil Kaos Zümrüdü antik tapınakta uyanmış ama kapı sadece ritmik sayma bilen gerçek dostlara açılıyormuş!'\n\nSonic başparmağını kaldırıp gülümsedi: 'Harika! Hiç vakit kaybetmeyelim, haydi!'"
      },
      {
        "pageNum": 2,
        "title": "2. Bölüm: Altın Halkalar ve Dörder Sayma",
        "image": "scene_sonic_rings.jpg",
        "text": "Tapınak patikasında havada süzülen altın sarısı halkalar parlıyordu. Levhada şöyle yazıyordu: 'Kapıya varmak için tam 40 altın halkayı dörder dörder sayarak toplamalısınız!'\n\nTails uçarak yolu aydınlattı, Sonic ise ışık hızıyla koşarken yüksek sesle saydı:\n'4, 8, 12, 16, 20, 24, 28, 32, 36 ve tam 40!'\n\nSon halka da yakalandığında patika masmavi yıldız ışıklarıyla aydınlandı."
      },
      {
        "pageNum": 3,
        "title": "3. Bölüm: Knuckles ile Taş Kapı Bilmecesi",
        "image": "scene_sonic_emerald.jpg",
        "text": "Tapınak kapısında adanın güçlü koruyucusu kırmızı ekidne Knuckles onları bekliyordu.\n\nKnuckles gülümsedi: 'Hoş geldiniz dostlar! Bu dev kapıyı açmak için sadece kas gücü yetmez, matematik gerekir. 60 basamağı on beşer on beşer sayarak çıkmalıyız!'\n\nSonic, Tails ve Knuckles el ele tutuşup saydılar: '15... 30... 45... 60!' Dev taş kapı gıcırtıyla açıldı, içeride zümrüt yeşili ışık parladı."
      },
      {
        "pageNum": 4,
        "title": "4. Bölüm: Birlikte Başarmanın Zaferi",
        "image": "scene_sonic_celebration.jpg",
        "text": "Antik taşın üzerinde parlayan Yeşil Kaos Zümrüdü dostları görünce adayı yeniden canlandırdı! Çiçekler açtı, kuşlar neşeli şarkılar söyledi.\n\nSonic dostlarına sarıldı: 'Tek başına ne kadar hızlı koşarsan koş, dünyadaki en süper güç; birlikte başarmak, dikkatle okumak ve yardımlaşmaktır!' Yeşil Tepe Adası'nda gün batımına dek şenlik yapıldı."
      }
    ]
  },
  "book_epic_hero_alliance": {
    "title": "Süper Kahramanlar İttifakı: Saat Kulesi Bilmecesi",
    "subtitle": "Mario, Örümcek Adam ve Batman'in 5 Dakikalık İttifak Macerası",
    "badge": "🌟 SÜPER İTTİFAK • MAX 5 DK",
    "coverImg": "scene_hero_crossover.jpg",
    "targetDurationSec": 280,
    "desc": "Gökkuşağı kapısıyla buluşan Süper Mario, Örümcek Adam ve Batman; tarihi saat kulesindeki 600 sayılık matematik bilmecesini akıl yürütme ve dayanışmayla çözüyor.",
    "pages": [
      {
        "pageNum": 1,
        "title": "1. Bölüm: Gökyüzünde Gökkuşağı Kapısı",
        "image": "scene_hero_crossover.jpg",
        "text": "Mantar Krallığı'nda sabah güneşi parlarken gökyüzünde dev bir gökkuşağı halkası açıldı! Halkanın içinden kırmızı mavi kostümlü Örümcek Adam esnek bir ağ atarak zıpladı.\n\nSüper Mario şapkasını düzeltip güldü: 'Mamma mia! Hoş geldin arkadaşım!' Örümcek Adam haber verdi: 'Mario, şehrimizdeki tarihi saat kulesi durmak üzere! İki dünyanın kapısı kilitlenmeden yetişmeliyiz!' Birlikte yola koyuldular."
      },
      {
        "pageNum": 2,
        "title": "2. Bölüm: Gökdelenlerden Saat Kulesine",
        "image": "book_spiderman.jpg",
        "text": "Örümcek Adam sağlam bir ağ uzattı, Mario ise borudan zıplayıp ipe tutundu. İki dost gökdelenlerin üzerinden süzüldüler. Sokaktaki çocuklar el ele vermiş kahramanları görüp sevinçle alkışladılar.\n\nAz sonra kulenin kütüphane salonuna indiler. Karşılarında bilge dedektif Batman bekliyordu. Batman sakin bir sesle: 'Bu saat kas gücüyle değil, sadece dikkatle okuyan ve matematik çözen kahramanlara açılır!' dedi."
      },
      {
        "pageNum": 3,
        "title": "3. Bölüm: 600 Altın Paranın Şifresi",
        "image": "scene_batman_clocktower.jpg",
        "text": "Ekranda dev bir soru parladı: 'Saat yayını kurmak için 600 altın enerji parası lazım. Kasada 300 para var. Mario 150, Örümcek Adam 150 para eklerse toplam kaç olur?'\n\nMario hesapladı: '300'e 150 eklersek 450 para eder!' Örümcek Adam sevindi: '450'ye de benim 150 paramı eklersek tam 600 para!' Batman gülümseyerek anahtarı 600 yuvasına çevirdi."
      },
      {
        "pageNum": 4,
        "title": "4. Bölüm: Dostluk Bayramı ve Altın Öğüt",
        "image": "scene_mario_castle.jpg",
        "text": "Büyük saat çanı 'BOMMM!' diye çaldı, gökyüzü gökkuşağı renkleriyle ışıldadı ve şehirde büyük bir dostluk bayramı başladı.\n\nBatman çocuklara gülümsedi: 'Bir problemi çözmek için acele etmemek, metni dikkatle okumak ve yardımlaşmak gerekir!' Mario, Örümcek Adam ve Batman el ele verip tüm kahramanları selamladılar."
      }
    ]
  },
  "book_epic_galactic_creativity": {
    "title": "Galaktik Dostluk: Astrobot, Sackboy ve Bip-Bip",
    "subtitle": "Uzay ve El Emeğinin 5 Dakikalık Kurtarma Macerası",
    "badge": "🚀 GALAKTİK BİRLİK • MAX 5 DK",
    "coverImg": "scene_space_alliance.jpg",
    "targetDurationSec": 270,
    "desc": "Yıldız Gemisi Kartal'ı kurtarmak için robot Astrobot, örgü kahraman Sackboy ve droid Bip-Bip birleşip Dinozorlar Vadisi'nden kristal toplayarak 100 watt enerjiyi tamamlıyor.",
    "pages": [
      {
        "pageNum": 1,
        "title": "1. Bölüm: Kopan İletişim Kabloları",
        "image": "scene_space_alliance.jpg",
        "text": "Uzay istasyonunda devriye gezen mavi robot Astro ve turuncu droid Bip-Bip acil bir alarm aldılar. Yıldız Gemisi Kartal'ın motor kabloları uzay fırtınasında kopmuştu!\n\nGemiyi onarmak için sağlam el emeği iplikler gerekiyordu. Astro hemen örgü dostu Sackboy'a sinyal gönderdi. Sackboy sırt çantasıyla hızla yetişti: 'Korkmayın! Çantamda dünyanın en sağlam ipek iplikleri ve dikiş iğneleri var!'"
      },
      {
        "pageNum": 2,
        "title": "2. Bölüm: Dinozorlar Vadisi'nde 80 Basamak",
        "image": "book_sackboy.jpg",
        "text": "Motoru çalıştırmak için Dinozorlar Vadisi'nden iletken gökkuşağı kristali almaya gittiler. Küçük T-Rex Boni onları karşılayıp yüksek tepeyi işaret etti: 'Kristaller tepede, ama 80 basamağı aşmalısınız!'\n\nSackboy gülümsedi: 'Yirmişer yirmişer sayalım: 20, 40, 60 ve 80!' Astrobot, Sackboy, Bip-Bip ve Boni dört büyük adımda tepeye çıkıp kristalleri topladılar."
      },
      {
        "pageNum": 3,
        "title": "3. Bölüm: 100 Watt Enerji Şifresi",
        "image": "scene_ittakestwo_dino.jpg",
        "text": "Gemiye döndüklerinde Astro kristalleri kablolara yerleştirdi, Sackboy ise ipek iplikleriyle kabloları sağlam düğümlerle dikti.\n\nBip-Bip ekranı gösterdi: 'Gemi için tam 100 watt enerji lazım. Şu an 70 watt var, kaç watt eksik?'\nAstro cevapladı: '100'den 70 çıkarsa 30 watt daha gerekir!' Son kristal takılınca motorlar güçlüce çalıştı."
      },
      {
        "pageNum": 4,
        "title": "4. Bölüm: Uzay Meydanında Büyük Kutlama",
        "image": "scene_astrobot_party.jpg",
        "text": "Yıldız Gemisi güvenle uzay istasyonuna döndü ve meydanda harika bir şenlik başladı!\n\nAstro mikrofonu alıp gülümsedi: 'Bugün gördük ki teknoloji, el emeği ve doğa sevgisi birleştiğinde çözülemeyecek hiçbir problem yoktur!' Sackboy gökyüzüne balonlar bıraktı, Bip-Bip sevinç melodileri çaldı."
      }
    ]
  }
};

// Also ensure every book has unique coverImg and unique non-repeating on-theme pages, and <= 300 targetDurationSec
const customBookImages = {
  "book_kungfupanda": {
    coverImg: "book_kungfupanda.jpg",
    pageImgs: ["book_kungfupanda.jpg", "scene_kungfupanda_temple.jpg", "scene_panda_lanterns.jpg", "scene_panda_bell.jpg"],
    badge: "🐼 KUNG FU PANDA • MAX 5 DK"
  },
  "book_sonic": {
    coverImg: "book_sonic.jpg",
    pageImgs: ["book_sonic.jpg", "scene_sonic_rings.jpg", "scene_sonic_emerald.jpg", "scene_sonic_celebration.jpg"],
    badge: "⚡ KİRPİ SONİC • MAX 4 DK"
  },
  "book_epic_hero_alliance": {
    coverImg: "scene_hero_crossover.jpg",
    pageImgs: ["scene_hero_crossover.jpg", "book_spiderman.jpg", "scene_batman_clocktower.jpg", "scene_mario_castle.jpg"],
    badge: "🌟 SÜPER İTTİFAK • MAX 5 DK"
  },
  "book_epic_galactic_creativity": {
    coverImg: "scene_space_alliance.jpg",
    pageImgs: ["scene_space_alliance.jpg", "book_sackboy.jpg", "scene_ittakestwo_dino.jpg", "scene_astrobot_party.jpg"],
    badge: "🚀 GALAKTİK BİRLİK • MAX 5 DK"
  },
  "book_batman": {
    coverImg: "book_batman.jpg",
    pageImgs: ["book_batman.jpg", "scene_batman_detective.jpg", "scene_batman_clocktower.jpg", "scene_batman_gotham.jpg"],
    badge: "🦇 BATMAN & DEDEKTİF • 4 DK"
  },
  "book_spiderman": {
    coverImg: "book_spiderman.jpg",
    pageImgs: ["book_spiderman.jpg", "scene_spiderman_cat.jpg", "scene_spiderman_sunset.jpg", "scene_hero_crossover.jpg"],
    badge: "🕷️ ÖRÜMCEK ADAM • 4 DK"
  },
  "book_mario": {
    coverImg: "book_mario.jpg",
    pageImgs: ["book_mario.jpg", "scene_mario_pipes.jpg", "scene_mario_castle.jpg", "scene_hero_crossover.jpg"],
    badge: "🍄 SÜPER MARİO • 4 DK"
  },
  "book_ittakestwo": {
    coverImg: "book_ittakestwo.jpg",
    pageImgs: ["book_ittakestwo.jpg", "scene_ittakestwo_dino.jpg", "scene_dino_waterfall.jpg", "scene_sackboy_kite.jpg"],
    badge: "🤝 IT TAKES TWO • 4 DK"
  },
  "book_sackboy": {
    coverImg: "book_sackboy.jpg",
    pageImgs: ["book_sackboy.jpg", "scene_ittakestwo_dino.jpg", "scene_sackboy_kite.jpg", "scene_lingo_picnic.jpg"],
    badge: "🧶 SACKBOY • 4 DK"
  },
  "book_lingo_math": {
    coverImg: "book_lingo_math.jpg",
    pageImgs: ["book_lingo_math.jpg", "scene_lingo_sharing.jpg", "scene_lingo_picnic.jpg", "scene_astrobot_party.jpg"],
    badge: "🍎 ROBOT LİNGO & ALİ • 4 DK"
  },
  "book_starwars": {
    coverImg: "book_starwars.jpg",
    pageImgs: ["book_starwars.jpg", "scene_space_alliance.jpg", "scene_starwars_crystal.jpg", "scene_astrobot_party.jpg"],
    badge: "✨ STAR WARS • 4 DK"
  },
  "book_dinosaurs": {
    coverImg: "book_dinosaurs.jpg",
    pageImgs: ["book_dinosaurs.jpg", "scene_ittakestwo_dino.jpg", "scene_dino_waterfall.jpg", "scene_sonic_celebration.jpg"],
    badge: "🌿 DİNOZORLAR • 4 DK"
  },
  "book_astrobot": {
    coverImg: "book_astrobot.jpg",
    pageImgs: ["book_astrobot.jpg", "scene_astrobot_squirrel.jpg", "scene_space_alliance.jpg", "scene_astrobot_party.jpg"],
    badge: "🤖 ASTROBOT • 4 DK"
  }
};

// Apply updates to each book
books.forEach(b => {
  if (shortenedContent[b.id]) {
    const sc = shortenedContent[b.id];
    b.title = sc.title;
    b.subtitle = sc.subtitle;
    b.badge = sc.badge;
    b.coverImg = sc.coverImg;
    b.targetDurationSec = sc.targetDurationSec;
    b.desc = sc.desc;
    b.pages = sc.pages;
  }

  // Apply custom images
  if (customBookImages[b.id]) {
    b.coverImg = customBookImages[b.id].coverImg;
    b.badge = customBookImages[b.id].badge;
    b.pages.forEach((p, idx) => {
      if (customBookImages[b.id].pageImgs[idx]) {
        p.image = customBookImages[b.id].pageImgs[idx];
      }
    });
  }

  // Recompute EXACT actual word count
  const actualWords = b.pages.map(p => p.text).join(' ').trim().split(/\s+/).filter(Boolean).length;
  b.wordsCount = actualWords;

  // Ensure duration target never exceeds 300s (max 5 minutes)
  // At ~65 WPM ideal, targetDurationSec = Math.min(300, Math.max(210, Math.round((actualWords / 62) * 60)))
  b.targetDurationSec = Math.min(300, Math.max(210, Math.round((actualWords / 64) * 60)));

  // Scale questions: shorter (~220-260) -> 6-7, longer (~260-320) -> 7-8
  if ((b.id === 'book_epic_hero_alliance' || b.id === 'book_epic_galactic_creativity') && b.questions.length > 8) {
    b.questions = b.questions.slice(0, 8);
  }
});

// Log final metrics and check image uniqueness
const coversSeen = new Set();
books.forEach(b => {
  const imgs = b.pages.map(p => p.image);
  const uniqueInBook = new Set(imgs).size;
  const dupCover = coversSeen.has(b.coverImg);
  coversSeen.add(b.coverImg);
  console.log(`${b.id} | words: ${b.wordsCount} | mins: ${(b.targetDurationSec/60).toFixed(1)} | qs: ${b.questions.length} | cover: ${b.coverImg} ${dupCover ? '(DUP COVER!)' : '(OK)'} | pageImgs unique: ${uniqueInBook}/${imgs.length}`);
});

const newBooksJson = JSON.stringify(books, null, 6);
html = html.replace(bankRegex, `const turkishBooksBank = ${newBooksJson};\n\n    // OKUMA SİSTEMİ`);

// Also update bartuHeroCardsData image for book_lingo_math so it shows book_lingo_math.jpg instead of scene_hero_crossover.jpg!
html = html.replace(
  /id: 'book_lingo_math',\s*title: 'Bartu & Robot Lingo',\s*hero: 'Ali & Lingo',\s*icon: '🍎',\s*tier: 'MATEMATİK DEDEKTİFİ KARTI',\s*cardColor: '#ec4899',\s*image: 'scene_hero_crossover\.jpg'/,
  "id: 'book_lingo_math',\n        title: 'Bartu & Robot Lingo',\n        hero: 'Ali & Lingo',\n        icon: '🍎',\n        tier: 'MATEMATİK DEDEKTİFİ KARTI',\n        cardColor: '#ec4899',\n        image: 'book_lingo_math.jpg'"
);

// Update card badge display on book hub to explicitly show max 5 min friendly reading time like `⏱️ ~4-5 Dk`
html = html.replace(
  /<span>📝 \$\{book\.wordsCount\} Kelime • ❓ \$\{book\.questions \? book\.questions\.length : 6\} Soru<\/span>/g,
  "<span>📝 ${book.wordsCount} Kelime • ❓ ${book.questions ? book.questions.length : 6} Soru • ⏱️ ${Math.min(5, Math.max(3, Math.round(book.targetDurationSec / 60)))} Dk</span>"
);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully updated index.html with <= 5 min stories and unique images!");

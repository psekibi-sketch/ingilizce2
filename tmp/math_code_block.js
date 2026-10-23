
    /* ========================================================
       2.06. 2. SINIF MATEMATİK: DOĞAL SAYILARLA TOPLAMA, ÇIKARMA & MEB MAARİF PROBLEMLERİ
    ======================================================== */
    let mathActiveStage = 'learn'; // 'learn', 'practice', 'quiz'
    let additionPracticeType = 'with_carry'; // 'no_carry', 'with_carry'
    let additionCurrentProblem = null;
    let additionCurrentStep = 'ones'; // 'ones', 'carry', 'tens', 'done'
    let additionUserOnes = '';
    let additionUserTens = '';
    let additionCarryActive = false;
    let additionScore = 0;
    let additionStreak = 0;

    let subtractionPracticeType = 'with_borrow'; // 'no_borrow', 'with_borrow'
    let subtractionCurrentProblem = null;
    let subtractionCurrentStep = 'borrow_check'; // 'borrow_check', 'ones', 'tens', 'done'
    let subtractionHasBorrowed = false;
    let subtractionUserOnes = '';
    let subtractionUserTens = '';
    let subtractionScore = 0;
    let subtractionStreak = 0;

    let storyProblemIndex = 0;
    let storyProblemScore = 0;
    let storyProblemUserChoice = null;
    let storyProblemShowSolution = false;
    let storyProblemWrongStreak = 0;

    const mathStoryProblems = [
      {
        id: 1,
        title: "🍎 Elma Bahçesi",
        theme: "Meyve Toplama",
        badge: "Eldeli Toplama",
        text: "Ali bahçeden 28 kırmızı elma, Ayşe ise 15 yeşil elma topladı. İki arkadaş toplam kaç elma toplamıştır?",
        type: "addition",
        num1: 28,
        num2: 15,
        answer: 43,
        options: ["41", "42", "43", "45"],
        clue: "Verilenler: Ali 28 elma, Ayşe 15 elma topladı. İstenen: Toplam elma sayısı. İki arkadaşın elmaları birleştiği için TOPLAMA (+) işlemi yaparız.",
        solution: "Önce birler basamağı: 8 + 5 = 13 birlik. 13'ün 3'ünü birler basamağına yazarız, elde var 1 onluk! Onlar basamağı: 1 (elde) + 2 + 1 = 4 onluk. Toplam 43 elma olur."
      },
      {
        id: 2,
        title: "🚌 Okul Servisi",
        theme: "Yolcu Sayısı",
        badge: "Onluk Bozmalı Çıkarma",
        text: "Okul servisinde 42 öğrenci vardı. İlk durakta 16 öğrenci indi. Serviste kaç öğrenci kaldı?",
        type: "subtraction",
        num1: 42,
        num2: 16,
        answer: 26,
        options: ["24", "26", "28", "36"],
        clue: "Verilenler: Serviste 42 öğrenci vardı, 16 öğrenci indi (azaldı). İstenen: Kalan öğrenci sayısı. Azalma olduğu için ÇIKARMA (-) işlemi yaparız.",
        solution: "42 - 16 işlemi: 2'den 6 çıkmaz. Komşudaki 4 onluktan 1 onluk alırız (komşuda 3 onluk kalır). 10 + 2 = 12 birlik olur. 12'den 6 çıktı 6 kaldı. Onlar basamağında 3'ten 1 çıktı 2 kaldı. Kalan öğrenci sayısı: 26."
      },
      {
        id: 3,
        title: "📚 Sınıf Kütüphanesi",
        theme: "Kitap Sayısı",
        badge: "Eldeli Toplama",
        text: "Sınıf kütüphanemizde 37 hikaye kitabı vardı. Öğretmenimiz kütüphaneye 26 yeni kitap daha ekledi. Kütüphanemizde toplam kaç kitap oldu?",
        type: "addition",
        num1: 37,
        num2: 26,
        answer: 63,
        options: ["53", "61", "63", "65"],
        clue: "Kütüphaneye yeni kitaplar eklenerek kitap sayısı arttı. Toplamı bulmak için TOPLAMA (+) işlemi yaparız.",
        solution: "37 + 26 işlemi: Birler basamağı: 7 + 6 = 13 (elde var 1 onluk). Onlar basamağı: 1 (elde) + 3 + 2 = 6 onluk. Sonuç: 63 kitap."
      },
      {
        id: 4,
        title: "🌰 Sincabın Fındıkları",
        theme: "Kış Hazırlığı",
        badge: "Onluk Bozmalı Çıkarma",
        text: "Sevimli sincap kış için 53 fındık topladı. Bu fındıkların 27 tanesini yedi. Sincabın geriye kaç fındığı kaldı?",
        type: "subtraction",
        num1: 53,
        num2: 27,
        answer: 26,
        options: ["24", "26", "28", "30"],
        clue: "Fındıklar yendiği için azaldı. Kalan fındıkları bulmak için ÇIKARMA (-) işlemi yaparız.",
        solution: "53 - 27 işlemi: 3'ten 7 çıkmaz. Onluk bozarız: Komşuda 4 onluk kalır, bizde 13 birlik olur. 13 - 7 = 6 birlik. 4 - 2 = 2 onluk. Kalan: 26 fındık."
      },
      {
        id: 5,
        title: "🎈 Uçan Balonlar",
        theme: "Çocuk Parkı",
        badge: "Eldesiz Toplama",
        text: "Baloncu amca sabah 24 balon, öğleden sonra ise 32 balon sattı. Baloncu amca gün boyunca kaç balon satmıştır?",
        type: "addition",
        num1: 24,
        num2: 32,
        answer: 56,
        options: ["54", "56", "58", "60"],
        clue: "Sabah ve öğleden sonra satılan tüm balonları birleştirmeliyiz. Eldesiz TOPLAMA işlemi yaparız.",
        solution: "24 + 32 işlemi: Birler basamağı: 4 + 2 = 6. Onlar basamağı: 2 + 3 = 5. Sonuç: 56 balon."
      },
      {
        id: 6,
        title: "🌱 Fidan Dikme Etkinliği",
        theme: "Doğa Sevgisi",
        badge: "Onluk Bozmasız Çıkarma",
        text: "Okul bahçesine dikilmek üzere 68 fidan getirildi. Öğrenciler 35 fidanı dikti. Dikilecek kaç fidan kaldı?",
        type: "subtraction",
        num1: 68,
        num2: 35,
        answer: 33,
        options: ["31", "33", "35", "43"],
        clue: "Dikilen fidanlar bahçedeki fidan grubundan ayrıldı. Geriye kalan fidanlar için ÇIKARMA işlemi yaparız.",
        solution: "68 - 35 işlemi: Birler basamağı: 8 - 5 = 3. Onlar basamağı: 6 - 3 = 3. Kalan fidan: 33."
      },
      {
        id: 7,
        title: "💰 Harçlık Kumbarası",
        theme: "Tasarruf Bilinci",
        badge: "Eldeli Toplama",
        text: "Emre'nin kumbarasında 46 lirası vardı. Bayramda dedesi Emre'ye 38 lira harçlık verdi. Emre'nin kumbarasında kaç lira oldu?",
        type: "addition",
        num1: 46,
        num2: 38,
        answer: 84,
        options: ["74", "82", "84", "86"],
        clue: "Kumbaraya para eklendiği için arttı. TOPLAMA işlemi yaparız.",
        solution: "46 + 38 işlemi: 6 + 8 = 14 (4 yazarız, elde var 1 onluk). 1 + 4 + 3 = 8 onluk. Toplam: 84 lira."
      },
      {
        id: 8,
        title: "🧁 Fırındaki Kekler",
        theme: "Lezzetli Tatlar",
        badge: "Onluk Bozmalı Çıkarma",
        text: "Bir pastanede sabah 71 kek pişirildi. Akşama kadar 38 kek satıldı. Pastanede satılmayan kaç kek kaldı?",
        type: "subtraction",
        num1: 71,
        num2: 38,
        answer: 33,
        options: ["31", "33", "35", "43"],
        clue: "Satılan kekler azaldı. Kalanı bulmak için ÇIKARMA yaparız.",
        solution: "71 - 38 işlemi: 1'den 8 çıkmaz. Komşudan 1 onluk alırız (komşuda 6 onluk kalır). 11 - 8 = 3. Onlar basamağı: 6 - 3 = 3. Kalan kek: 33."
      },
      {
        id: 9,
        title: "🎏 23 Nisan Bayrakları",
        theme: "Milli Bayram",
        badge: "Eldeli Toplama",
        text: "23 Nisan için sınıfımızı süslemek amacıyla Ayşe 35 Türk bayrağı, Mehmet ise 29 Türk bayrağı getirdi. Sınıfta toplam kaç bayrak oldu?",
        type: "addition",
        num1: 35,
        num2: 29,
        answer: 64,
        options: ["54", "62", "64", "66"],
        clue: "Tüm bayrakları bir araya getirdiğimiz için TOPLAMA işlemi yaparız.",
        solution: "35 + 29 işlemi: 5 + 9 = 14 (elde 1 onluk). 1 + 3 + 2 = 6 onluk. Toplam: 64 bayrak."
      },
      {
        id: 10,
        title: "🥚 Kümesteki Yumurtalar",
        theme: "Çiftlik Hayatı",
        badge: "Onluk Bozmalı Çıkarma",
        text: "Çiftlikteki kümesten 60 yumurta toplandı. Bu yumurtaların 24 tanesi kahvaltıda kullanıldı. Geriye kaç yumurta kaldı?",
        type: "subtraction",
        num1: 60,
        num2: 24,
        answer: 36,
        options: ["34", "36", "38", "46"],
        clue: "Yumurtalar kullanıldığı için azaldı. Kalanı bulmak için ÇIKARMA işlemi yaparız.",
        solution: "60 - 24 işlemi: 0'dan 4 çıkmaz. 6 onluktan 1 onluk alırız (5 onluk kalır). 10 - 4 = 6. Onlar basamağı: 5 - 2 = 3. Kalan: 36 yumurta."
      }
    ];

    function setMathStage(stage, module) {
      recordActivity();
      mathActiveStage = stage;
      if (module === 'addition') renderMathAddition();
      else if (module === 'subtraction') renderMathSubtraction();
      else if (module === 'problems') renderMathProblems();
    }

    // TOPLAMA İŞLEMİ ÜRETİCİSİ
    function generateAdditionProblem(withCarry = true) {
      let n1, n2, ones1, ones2;
      if (withCarry) {
        ones1 = Math.floor(Math.random() * 6) + 4; // 4..9
        const minOnes2 = 10 - ones1;
        ones2 = Math.floor(Math.random() * (9 - minOnes2 + 1)) + minOnes2;
        const tens1 = Math.floor(Math.random() * 4) + 1;
        const tens2 = Math.floor(Math.random() * 4) + 1;
        n1 = tens1 * 10 + ones1;
        n2 = tens2 * 10 + ones2;
      } else {
        ones1 = Math.floor(Math.random() * 5) + 1; // 1..5
        ones2 = Math.floor(Math.random() * (9 - ones1));
        const tens1 = Math.floor(Math.random() * 4) + 1;
        const tens2 = Math.floor(Math.random() * 4) + 1;
        n1 = tens1 * 10 + ones1;
        n2 = tens2 * 10 + ones2;
      }
      const sum = n1 + n2;
      const onesSum = (n1 % 10) + (n2 % 10);
      const carry = onesSum >= 10 ? 1 : 0;
      const tensSum = Math.floor(n1 / 10) + Math.floor(n2 / 10) + carry;

      return {
        n1,
        n2,
        sum,
        ones1: n1 % 10,
        ones2: n2 % 10,
        tens1: Math.floor(n1 / 10),
        tens2: Math.floor(n2 / 10),
        onesSum,
        carry,
        onesDigit: onesSum % 10,
        tensSum
      };
    }

    // ÇIKARMA İŞLEMİ ÜRETİCİSİ
    function generateSubtractionProblem(withBorrow = true) {
      let n1, n2;
      if (withBorrow) {
        const ones1 = Math.floor(Math.random() * 5); // 0..4
        const ones2 = Math.floor(Math.random() * (9 - (ones1 + 1) + 1)) + (ones1 + 1); // > ones1
        const tens1 = Math.floor(Math.random() * 4) + 4; // 4..7
        const tens2 = Math.floor(Math.random() * (tens1 - 2)) + 1;
        n1 = tens1 * 10 + ones1;
        n2 = tens2 * 10 + ones2;
      } else {
        const ones2 = Math.floor(Math.random() * 6);
        const ones1 = ones2 + Math.floor(Math.random() * (9 - ones2));
        const tens1 = Math.floor(Math.random() * 4) + 3;
        const tens2 = Math.floor(Math.random() * (tens1 - 1)) + 1;
        n1 = tens1 * 10 + ones1;
        n2 = tens2 * 10 + ones2;
      }
      const diff = n1 - n2;
      const needsBorrow = (n1 % 10) < (n2 % 10);

      return {
        n1,
        n2,
        diff,
        ones1: n1 % 10,
        ones2: n2 % 10,
        tens1: Math.floor(n1 / 10),
        tens2: Math.floor(n2 / 10),
        needsBorrow,
        borrowedTens1: Math.floor(n1 / 10) - 1,
        borrowedOnes1: (n1 % 10) + 10,
        onesDiff: ((n1 % 10) + (needsBorrow ? 10 : 0)) - (n2 % 10),
        tensDiff: (Math.floor(n1 / 10) - (needsBorrow ? 1 : 0)) - Math.floor(n2 / 10)
      };
    }

    /* TOPLAMA EKRANI RENDER */
    function renderMathAddition() {
      recordActivity();
      currentMainTab = 'math_addition';
      document.getElementById('subHeaderTitle').textContent = '➕ 2. Sınıf Doğal Sayılarla Toplama İşlemi (Eldeli & Eldesiz)';

      if (!additionCurrentProblem) {
        additionCurrentProblem = generateAdditionProblem(additionPracticeType === 'with_carry');
        additionCurrentStep = 'ones';
        additionUserOnes = '';
        additionUserTens = '';
        additionCarryActive = false;
      }

      let contentHtml = '';

      if (mathActiveStage === 'learn') {
        contentHtml = `
          <div class="card" style="border:2px solid #10b981;">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:10px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:32px;">➕</span>
                <div>
                  <h3 style="font-size:20px;color:#fff;font-weight:900;margin:0;">2. Sınıf Toplama İşlemi Rehberi</h3>
                  <p style="font-size:12px;color:#6ee7b7;margin:0;">MEB Maarif Modeli • Onluk Taban Blokları ve Basamak Tablosu</p>
                </div>
              </div>
              <button class="sound-btn" onclick="speakTurkish('Toplama işleminde önce birler basamağındaki birlikler toplanır. Eğer birliklerin toplamı 10 veya daha büyükse, 10 birlik birleşerek 1 onluk olur ve onlar basamağına elde olarak eklenir!')" title="Dersi Sesli Dinle">
                🔊 Sesli Dinle
              </button>
            </div>

            <!-- 1. KAVRAMSAL MODEL: ONLUK TABAN BLOKLARI -->
            <div style="background:rgba(255,255,255,0.04);border-radius:14px;padding:16px;margin-bottom:16px;">
              <h4 style="font-size:15px;color:#38bdf8;margin-bottom:8px;font-weight:800;">🧱 1. Onluk ve Birlik Nedir?</h4>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:13px;line-height:1.5;">
                <div style="background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.3);padding:10px;border-radius:10px;">
                  <div style="font-size:22px;margin-bottom:4px;">🟨</div>
                  <strong style="color:#fff;">1 Birlik:</strong> Tek başına duran 1 adet küçük küp.
                </div>
                <div style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);padding:10px;border-radius:10px;">
                  <div style="font-size:22px;margin-bottom:4px;">🟦</div>
                  <strong style="color:#fff;">1 Onluk:</strong> 10 tane birliğin alt alta birleştiği çubuk (10 Birlik = 1 Onluk).
                </div>
              </div>
            </div>

            <!-- 2. ELDESİZ TOPLAMA ÖRNEĞİ -->
            <div style="background:rgba(255,255,255,0.04);border-radius:14px;padding:16px;margin-bottom:16px;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                <h4 style="font-size:15px;color:#10b981;font-weight:800;">🟢 2. Eldesiz Toplama: 34 + 23</h4>
                <button class="sound-btn" style="font-size:11px;padding:4px 8px;width:auto;" onclick="speakTurkish('34 ile 23 ü toplarken önce birlikleri toplarız: 4 artı 3 eşittir 7. Sonra onlar basamağı: 3 artı 2 eşittir 5. Sonuç 57!')">🔊 Dinle</button>
              </div>
              <p style="font-size:13px;color:#cbd5e1;line-height:1.5;margin-bottom:10px;">
                Birliklerin toplamı 10'u geçmiyorsa işlem çok basittir:
              </p>
              <div style="display:flex;align-items:center;justify-content:center;gap:20px;background:#0f172a;border-radius:12px;padding:14px;font-family:monospace;font-size:18px;">
                <div style="text-align:right;line-height:1.4;">
                  <div>&nbsp; 3 4</div>
                  <div>+ 2 3</div>
                  <div style="border-top:2px solid #334155;color:#10b981;font-weight:900;">&nbsp; 5 7</div>
                </div>
                <div style="font-size:12px;color:#94a3b8;font-family:sans-serif;text-align:left;">
                  <div>1️⃣ <strong>Birlikler:</strong> 4 + 3 = <strong>7</strong></div>
                  <div>2️⃣ <strong>Onluklar:</strong> 3 + 2 = <strong>5</strong></div>
                  <div style="color:#10b981;font-weight:700;">Sonuç: 57</div>
                </div>
              </div>
            </div>

            <!-- 3. ELDELİ TOPLAMA ÖRNEĞİ -->
            <div style="background:linear-gradient(135deg, rgba(239,68,68,0.1), rgba(15,23,42,0.8));border:1px solid rgba(239,68,68,0.3);border-radius:14px;padding:16px;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                <h4 style="font-size:15px;color:#f87171;font-weight:800;">🔴 3. Eldeli Toplama: 28 + 15 (10 Birlik = 1 Onluk!)</h4>
                <button class="sound-btn" style="font-size:11px;padding:4px 8px;width:auto;" onclick="speakTurkish('28 ile 15 i toplarken önce birler basamağı: 8 artı 5 eşittir 13. 13 ün 3 ünü birler basamağına yazarız, 1 onluğu ise elde var 1 diyerek onlar basamağına ekleriz. Onlar basamağında 1 artı 2 artı 1 eşittir 4. Sonuç 43!')">🔊 Dinle</button>
              </div>
              <p style="font-size:13px;color:#cbd5e1;line-height:1.5;margin-bottom:12px;">
                Birliklerin toplamı 10 veya daha büyükse, 10 birlik paketlenip <strong>1 ONLUK</strong> olur ve komşuya uçar!
              </p>
              <div style="display:flex;align-items:center;justify-content:center;gap:20px;background:#0f172a;border-radius:12px;padding:14px;font-family:monospace;font-size:18px;">
                <div style="text-align:right;line-height:1.4;">
                  <div style="color:#ef4444;font-size:12px;font-weight:900;">① (Elde)</div>
                  <div>&nbsp; 2 8</div>
                  <div>+ 1 5</div>
                  <div style="border-top:2px solid #ef4444;color:#fde047;font-weight:900;">&nbsp; 4 3</div>
                </div>
                <div style="font-size:12px;color:#cbd5e1;font-family:sans-serif;text-align:left;line-height:1.6;">
                  <div>1️⃣ 8 + 5 = <strong>13</strong></div>
                  <div>2️⃣ 13'ün <strong>3</strong>'ünü yazdık, <strong>1 ONLUK</strong> elde kaldı!</div>
                  <div>3️⃣ Onluklar: 1 (elde) + 2 + 1 = <strong>4</strong></div>
                  <div style="color:#fde047;font-weight:900;">Cevap: 43</div>
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (mathActiveStage === 'practice') {
        const prob = additionCurrentProblem;
        const onesDone = additionCurrentStep === 'tens' || additionCurrentStep === 'done';
        const isDone = additionCurrentStep === 'done';

        contentHtml = `
          <div class="card" style="border:2px solid #10b981;text-align:center;">
            <!-- SEVİYE SEÇİCİ -->
            <div style="display:flex;justify-content:center;gap:10px;margin-bottom:16px;flex-wrap:wrap;">
              <button class="action-btn" style="background:${additionPracticeType === 'no_carry' ? '#10b981' : '#334155'};font-size:12px;font-weight:800;padding:8px 14px;" onclick="setAdditionPracticeType('no_carry')">
                🟢 Eldesiz Toplama
              </button>
              <button class="action-btn" style="background:${additionPracticeType === 'with_carry' ? '#ef4444' : '#334155'};font-size:12px;font-weight:800;padding:8px 14px;" onclick="setAdditionPracticeType('with_carry')">
                🔴 Eldeli Toplama
              </button>
              <button class="action-btn" style="background:#06b6d4;font-size:12px;font-weight:800;padding:8px 14px;" onclick="nextAdditionProblem()">
                🔄 Yeni Sayılar Getir
              </button>
            </div>

            <div style="display:flex;justify-content:center;gap:14px;margin-bottom:12px;">
              <span style="background:rgba(16,185,129,0.2);color:#34d399;padding:4px 10px;border-radius:8px;font-weight:800;font-size:12px;">⭐ Puan: ${additionScore}</span>
              <span style="background:rgba(245,158,11,0.2);color:#fde047;padding:4px 10px;border-radius:8px;font-weight:800;font-size:12px;">🔥 Seri: ${additionStreak}</span>
            </div>

            <!-- İŞLEM TAHTASI -->
            <div style="max-width:320px;margin:0 auto 18px;background:#0f172a;border:2px solid #334155;border-radius:16px;padding:20px;position:relative;">
              <div style="display:flex;justify-content:center;gap:24px;margin-bottom:8px;font-size:14px;">
                <div style="width:40px;height:28px;display:flex;align-items:center;justify-content:center;">
                  ${additionCarryActive ? '<span style="background:#ef4444;color:#fff;border-radius:999px;width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;font-weight:900;font-size:12px;animation:fadeIn 0.3s ease;">+1</span>' : '<span style="color:#475569;font-size:11px;">Onluk</span>'}
                </div>
                <div style="width:40px;height:28px;display:flex;align-items:center;justify-content:center;color:#475569;font-size:11px;">
                  Birlik
                </div>
              </div>

              <div style="font-family:monospace;font-size:36px;font-weight:900;line-height:1.3;letter-spacing:14px;text-align:right;padding-right:24px;">
                <div style="color:#fff;">${prob.n1}</div>
                <div style="color:#fff;position:relative;">
                  <span style="position:absolute;left:20px;color:#10b981;font-size:32px;">+</span>${prob.n2}
                </div>
                <div style="border-top:3px solid #64748b;margin:6px 0;"></div>
                <div style="display:flex;justify-content:flex-end;gap:14px;letter-spacing:normal;">
                  <div style="width:46px;height:50px;border:2px dashed ${onesDone ? '#10b981' : '#64748b'};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:32px;color:#fde047;background:rgba(255,255,255,0.04);">
                    ${additionUserTens !== '' ? additionUserTens : '?'}
                  </div>
                  <div style="width:46px;height:50px;border:2px dashed ${additionCurrentStep === 'ones' ? '#38bdf8' : '#10b981'};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:32px;color:#38bdf8;background:rgba(255,255,255,0.04);">
                    ${additionUserOnes !== '' ? additionUserOnes : '?'}
                  </div>
                </div>
              </div>
            </div>

            <!-- ADIM YÖNERGESİ VE CEVAP BUTONLARI -->
            <div id="additionStepArea" style="max-width:440px;margin:0 auto;">
              ${!isDone ? `
                <div style="font-size:15px;color:#fff;font-weight:800;margin-bottom:12px;">
                  ${additionCurrentStep === 'ones' 
                    ? `👉 1. Adım: Birler basamağını topla: <strong>${prob.ones1} + ${prob.ones2}</strong> kaç eder?` 
                    : `👉 2. Adım: Onlar basamağını topla: <strong>${additionCarryActive ? '1 (elde) + ' : ''}${prob.tens1} + ${prob.tens2}</strong> kaç eder?`}
                </div>
                <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
                  ${getAdditionStepChoices(prob, additionCurrentStep).map(val => `
                    <button class="action-btn" style="background:#1e293b;border:2px solid #38bdf8;color:#fff;font-size:20px;font-weight:900;padding:10px 22px;min-width:60px;" onclick="handleAdditionStepAnswer(${val})">
                      ${val}
                    </button>
                  `).join('')}
                </div>
              ` : `
                <div style="background:rgba(16,185,129,0.15);border:2px solid #10b981;border-radius:14px;padding:16px;">
                  <div style="font-size:36px;margin-bottom:4px;">🎉🌟</div>
                  <h4 style="font-size:18px;color:#6ee7b7;font-weight:900;margin-bottom:6px;">Harika Çözdün!</h4>
                  <p style="font-size:13px;color:#cbd5e1;margin-bottom:14px;">
                    ${prob.n1} + ${prob.n2} = <strong>${prob.sum}</strong> işlemini doğru tamamladın.
                  </p>
                  <button class="action-btn" style="background:#10b981;color:#fff;font-size:14px;font-weight:900;padding:10px 24px;" onclick="nextAdditionProblem()">
                    Sonraki Soruya Geç ➔
                  </button>
                </div>
              `}
            </div>
          </div>
        `;
      }

      const fullHtml = `
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
          <button class="action-btn" style="background:#334155;color:#f8fafc;font-size:13px;font-weight:800;padding:8px 16px;display:inline-flex;align-items:center;gap:6px;" onclick="selectHomeSubject('math')">
            ⬅️ Matematik Menüsüne Dön
          </button>
          <div style="display:flex;gap:8px;">
            <button class="action-btn ${mathActiveStage === 'learn' ? 'active-all' : ''}" style="background:${mathActiveStage === 'learn' ? '#10b981' : '#1e293b'};font-size:12px;font-weight:800;padding:7px 12px;" onclick="setMathStage('learn', 'addition')">
              📖 Konu Anlatımı
            </button>
            <button class="action-btn ${mathActiveStage === 'practice' ? 'active-all' : ''}" style="background:${mathActiveStage === 'practice' ? '#10b981' : '#1e293b'};font-size:12px;font-weight:800;padding:7px 12px;" onclick="setMathStage('practice', 'addition')">
              ✏️ İnteraktif Tahta
            </button>
          </div>
        </div>

        ${contentHtml}
      `;

      document.getElementById('appContent').innerHTML = fullHtml;
    }

    function setAdditionPracticeType(type) {
      additionPracticeType = type;
      nextAdditionProblem();
    }

    function nextAdditionProblem() {
      additionCurrentProblem = generateAdditionProblem(additionPracticeType === 'with_carry');
      additionCurrentStep = 'ones';
      additionUserOnes = '';
      additionUserTens = '';
      additionCarryActive = false;
      renderMathAddition();
    }

    function getAdditionStepChoices(prob, step) {
      if (step === 'ones') {
        const correct = prob.onesDigit;
        const set = new Set([correct]);
        while (set.size < 4) {
          const r = Math.floor(Math.random() * 10);
          set.add(r);
        }
        return Array.from(set).sort((a, b) => a - b);
      } else {
        const correct = prob.tensSum;
        const set = new Set([correct]);
        while (set.size < 4) {
          const r = Math.max(1, correct + Math.floor(Math.random() * 5) - 2);
          set.add(r);
        }
        return Array.from(set).sort((a, b) => a - b);
      }
    }

    function handleAdditionStepAnswer(val) {
      recordActivity();
      const prob = additionCurrentProblem;
      if (additionCurrentStep === 'ones') {
        if (val === prob.onesDigit) {
          playChimeSound('correct');
          additionUserOnes = String(val);
          if (prob.carry === 1) {
            additionCarryActive = true;
            speakTurkish("Harika! " + prob.ones1 + " artı " + prob.ones2 + " eşittir " + prob.onesSum + ". " + prob.onesDigit + "'i yazdık, elde var 1 onluk!");
          } else {
            speakTurkish("Aferin! " + prob.ones1 + " artı " + prob.ones2 + " eşittir " + prob.onesDigit + ".");
          }
          additionCurrentStep = 'tens';
          renderMathAddition();
        } else {
          playChimeSound('wrong');
          speakTurkish("Tekrar dene! " + prob.ones1 + " ile " + prob.ones2 + " toplanırsa kaç eder?");
        }
      } else if (additionCurrentStep === 'tens') {
        if (val === prob.tensSum) {
          playChimeSound('fanfare');
          additionUserTens = String(val);
          additionCurrentStep = 'done';
          additionScore += 10;
          additionStreak++;
          unlockBadge('math_addition_hero');
          speakTurkish("Tebrikler! Sonuç " + prob.sum + "! Harika topladın.");
          renderMathAddition();
        } else {
          playChimeSound('wrong');
          speakTurkish("Onlukları tekrar topla: " + (additionCarryActive ? "1 elde artı " : "") + prob.tens1 + " artı " + prob.tens2 + " kaç eder?");
        }
      }
    }

    /* ÇIKARMA EKRANI RENDER */
    function renderMathSubtraction() {
      recordActivity();
      currentMainTab = 'math_subtraction';
      document.getElementById('subHeaderTitle').textContent = '➖ 2. Sınıf Doğal Sayılarla Çıkarma İşlemi (Onluk Bozmalı & Bozmasız)';

      if (!subtractionCurrentProblem) {
        subtractionCurrentProblem = generateSubtractionProblem(subtractionPracticeType === 'with_borrow');
        subtractionCurrentStep = subtractionCurrentProblem.needsBorrow ? 'borrow_check' : 'ones';
        subtractionHasBorrowed = false;
        subtractionUserOnes = '';
        subtractionUserTens = '';
      }

      let contentHtml = '';

      if (mathActiveStage === 'learn') {
        contentHtml = `
          <div class="card" style="border:2px solid #ef4444;">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:10px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:32px;">➖</span>
                <div>
                  <h3 style="font-size:20px;color:#fff;font-weight:900;margin:0;">2. Sınıf Çıkarma İşlemi Rehberi</h3>
                  <p style="font-size:12px;color:#fca5a5;margin:0;">MEB Maarif Modeli • Eksilen, Çıkan, Fark ve Onluk Bozma</p>
                </div>
              </div>
              <button class="sound-btn" onclick="speakTurkish('Çıkarma işleminde en üstteki sayı eksilen, çıkarılan sayı çıkan, sonuç ise farktır. Küçük sayıdan büyük sayı çıkmazsa onlar basamağındaki komşuya gidip bir onluk bozarız!')" title="Dersi Sesli Dinle">
                🔊 Sesli Dinle
              </button>
            </div>

            <!-- 1. TERİMLER: EKSİLEN, ÇIKAN, FARK -->
            <div style="background:rgba(255,255,255,0.04);border-radius:14px;padding:16px;margin-bottom:16px;">
              <h4 style="font-size:15px;color:#f87171;margin-bottom:8px;font-weight:800;">🍰 1. Çıkarma İşleminin Terimleri</h4>
              <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:10px;font-size:12px;">
                <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);padding:10px;border-radius:10px;text-align:center;">
                  <div style="font-size:24px;margin-bottom:4px;">🎂</div>
                  <strong style="color:#fca5a5;font-size:13px;">Eksilen:</strong>
                  <div>Azalacak olan büyük sayı</div>
                </div>
                <div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);padding:10px;border-radius:10px;text-align:center;">
                  <div style="font-size:24px;margin-bottom:4px;">🍴</div>
                  <strong style="color:#fde047;font-size:13px;">Çıkan:</strong>
                  <div>Eksilenden alınan miktar</div>
                </div>
                <div style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);padding:10px;border-radius:10px;text-align:center;">
                  <div style="font-size:24px;margin-bottom:4px;">🍽️</div>
                  <strong style="color:#6ee7b7;font-size:13px;">Fark (Kalan):</strong>
                  <div>İşlem sonucu geriye kalan</div>
                </div>
              </div>
            </div>

            <!-- 2. ONLUK BOZMASIZ ÇIKARMA -->
            <div style="background:rgba(255,255,255,0.04);border-radius:14px;padding:16px;margin-bottom:16px;">
              <h4 style="font-size:15px;color:#10b981;font-weight:800;margin-bottom:8px;">🟢 2. Onluk Bozmasız Çıkarma: 48 - 25</h4>
              <div style="display:flex;align-items:center;justify-content:center;gap:20px;background:#0f172a;border-radius:12px;padding:14px;font-family:monospace;font-size:18px;">
                <div style="text-align:right;line-height:1.4;">
                  <div>&nbsp; 4 8 (Eksilen)</div>
                  <div>- 2 5 (Çıkan)</div>
                  <div style="border-top:2px solid #334155;color:#10b981;font-weight:900;">&nbsp; 2 3 (Fark)</div>
                </div>
                <div style="font-size:12px;color:#cbd5e1;font-family:sans-serif;text-align:left;">
                  <div>1️⃣ <strong>Birlikler:</strong> 8 - 5 = <strong>3</strong></div>
                  <div>2️⃣ <strong>Onluklar:</strong> 4 - 2 = <strong>2</strong></div>
                  <div style="color:#10b981;font-weight:700;">Fark: 23</div>
                </div>
              </div>
            </div>

            <!-- 3. ONLUK BOZARAK ÇIKARMA (KOMŞUYA GİTME) -->
            <div style="background:linear-gradient(135deg, rgba(239,68,68,0.15), rgba(15,23,42,0.9));border:1px solid rgba(239,68,68,0.35);border-radius:14px;padding:16px;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                <h4 style="font-size:15px;color:#f87171;font-weight:800;">🔴 3. Onluk Bozarak Çıkarma: 52 - 27</h4>
                <button class="sound-btn" style="font-size:11px;padding:4px 8px;width:auto;" onclick="speakTurkish('52 den 27 yi çıkarırken birler basamağında 2 den 7 çıkmaz. Komşudaki 5 onluktan bir onluk alırız. Komşuda 4 onluk kalır. 10 birlik ile 2 birliği birleştiririz, 12 birlik olur. 12 den 7 çıktı 5 kaldı. Onlar basamağında 4 ten 2 çıktı 2 kaldı. Sonuç 25!')">🔊 Dinle</button>
              </div>
              <p style="font-size:13px;color:#cbd5e1;line-height:1.5;margin-bottom:12px;">
                Birler basamağında <strong>2'den 7 çıkmaz!</strong> Komşuya (onlar basamağına) gideriz ve 1 ONLUK bozarız:
              </p>
              <div style="display:flex;align-items:center;justify-content:center;gap:20px;background:#0f172a;border-radius:12px;padding:14px;font-family:monospace;font-size:18px;">
                <div style="text-align:right;line-height:1.4;">
                  <div style="color:#38bdf8;font-size:12px;font-weight:900;">(4) (12)</div>
                  <div>&nbsp; <span style="text-decoration:line-through;color:#94a3b8;">5</span> <span style="text-decoration:line-through;color:#94a3b8;">2</span></div>
                  <div>- 2 &nbsp;7</div>
                  <div style="border-top:2px solid #ef4444;color:#fde047;font-weight:900;">&nbsp; 2 &nbsp;5</div>
                </div>
                <div style="font-size:12px;color:#cbd5e1;font-family:sans-serif;text-align:left;line-height:1.6;">
                  <div>1️⃣ 2'den 7 çıkmaz. Komşudan 1 onluk aldık.</div>
                  <div>2️⃣ Komşuda <strong>4 onluk</strong> kaldı. Bizde <strong>12 birlik</strong> oldu!</div>
                  <div>3️⃣ 12 - 7 = <strong>5</strong></div>
                  <div>4️⃣ Onluklar: 4 - 2 = <strong>2</strong></div>
                  <div style="color:#fde047;font-weight:900;">Kalan: 25</div>
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (mathActiveStage === 'practice') {
        const prob = subtractionCurrentProblem;
        const onesDone = subtractionCurrentStep === 'tens' || subtractionCurrentStep === 'done';
        const isDone = subtractionCurrentStep === 'done';

        contentHtml = `
          <div class="card" style="border:2px solid #ef4444;text-align:center;">
            <div style="display:flex;justify-content:center;gap:10px;margin-bottom:16px;flex-wrap:wrap;">
              <button class="action-btn" style="background:${subtractionPracticeType === 'no_borrow' ? '#10b981' : '#334155'};font-size:12px;font-weight:800;padding:8px 14px;" onclick="setSubtractionPracticeType('no_borrow')">
                🟢 Onluk Bozmasız Çıkarma
              </button>
              <button class="action-btn" style="background:${subtractionPracticeType === 'with_borrow' ? '#ef4444' : '#334155'};font-size:12px;font-weight:800;padding:8px 14px;" onclick="setSubtractionPracticeType('with_borrow')">
                🔴 Onluk Bozmalı Çıkarma
              </button>
              <button class="action-btn" style="background:#06b6d4;font-size:12px;font-weight:800;padding:8px 14px;" onclick="nextSubtractionProblem()">
                🔄 Yeni Sayılar Getir
              </button>
            </div>

            <div style="display:flex;justify-content:center;gap:14px;margin-bottom:12px;">
              <span style="background:rgba(239,68,68,0.2);color:#fca5a5;padding:4px 10px;border-radius:8px;font-weight:800;font-size:12px;">⭐ Puan: ${subtractionScore}</span>
              <span style="background:rgba(245,158,11,0.2);color:#fde047;padding:4px 10px;border-radius:8px;font-weight:800;font-size:12px;">🔥 Seri: ${subtractionStreak}</span>
            </div>

            <!-- İŞLEM TAHTASI -->
            <div style="max-width:320px;margin:0 auto 18px;background:#0f172a;border:2px solid #334155;border-radius:16px;padding:20px;position:relative;">
              <!-- ONLUK BOZULDUĞUNDA ÜSTTEKİ SAYILAR -->
              <div style="display:flex;justify-content:flex-end;gap:18px;margin-bottom:4px;padding-right:24px;font-size:14px;font-weight:900;">
                ${subtractionHasBorrowed ? `
                  <div style="color:#38bdf8;animation:fadeIn 0.3s ease;">(${prob.borrowedTens1})</div>
                  <div style="color:#38bdf8;animation:fadeIn 0.3s ease;">(${prob.borrowedOnes1})</div>
                ` : `
                  <div style="color:#475569;font-size:11px;">Onluk</div>
                  <div style="color:#475569;font-size:11px;">Birlik</div>
                `}
              </div>

              <!-- SAYILAR -->
              <div style="font-family:monospace;font-size:36px;font-weight:900;line-height:1.3;letter-spacing:14px;text-align:right;padding-right:24px;">
                <div style="color:#fff;">
                  ${subtractionHasBorrowed ? `<span style="text-decoration:line-through;color:#94a3b8;">${prob.tens1}</span><span style="text-decoration:line-through;color:#94a3b8;">${prob.ones1}</span>` : prob.n1}
                </div>
                <div style="color:#fff;position:relative;">
                  <span style="position:absolute;left:20px;color:#ef4444;font-size:32px;">-</span>${prob.n2}
                </div>
                <div style="border-top:3px solid #64748b;margin:6px 0;"></div>
                <!-- ÇÖZÜM SATIRI -->
                <div style="display:flex;justify-content:flex-end;gap:14px;letter-spacing:normal;">
                  <div style="width:46px;height:50px;border:2px dashed ${onesDone ? '#10b981' : '#64748b'};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:32px;color:#fde047;background:rgba(255,255,255,0.04);">
                    ${subtractionUserTens !== '' ? subtractionUserTens : '?'}
                  </div>
                  <div style="width:46px;height:50px;border:2px dashed ${subtractionCurrentStep === 'ones' ? '#38bdf8' : '#10b981'};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:32px;color:#38bdf8;background:rgba(255,255,255,0.04);">
                    ${subtractionUserOnes !== '' ? subtractionUserOnes : '?'}
                  </div>
                </div>
              </div>
            </div>

            <!-- ADIM ALANI -->
            <div style="max-width:440px;margin:0 auto;">
              ${subtractionCurrentStep === 'borrow_check' ? `
                <div style="background:rgba(245,158,11,0.12);border:1px solid #f59e0b;border-radius:12px;padding:14px;margin-bottom:14px;">
                  <div style="font-size:15px;color:#fff;font-weight:800;margin-bottom:6px;">
                    🤔 Dikkat: ${prob.ones1}'den ${prob.ones2} çıkar mı?
                  </div>
                  <p style="font-size:13px;color:#fde047;margin-bottom:12px;">
                    ${prob.ones1}, ${prob.ones2}'den küçük olduğu için çıkmaz! Komşudan 1 onluk almalısın.
                  </p>
                  <button class="action-btn" style="background:#f59e0b;color:#0f172a;font-size:15px;font-weight:900;padding:12px 24px;border-radius:12px;box-shadow:0 4px 16px rgba(245,158,11,0.4);" onclick="handleBorrowTens()">
                    🚪 Komşudan 1 Onluk Al (+10 Birlik)
                  </button>
                </div>
              ` : !isDone ? `
                <div style="font-size:15px;color:#fff;font-weight:800;margin-bottom:12px;">
                  ${subtractionCurrentStep === 'ones' 
                    ? `👉 1. Adım: Birler basamağını çıkar: <strong>${subtractionHasBorrowed ? prob.borrowedOnes1 : prob.ones1} - ${prob.ones2}</strong> kaç eder?` 
                    : `👉 2. Adım: Onlar basamağını çıkar: <strong>${subtractionHasBorrowed ? prob.borrowedTens1 : prob.tens1} - ${prob.tens2}</strong> kaç eder?`}
                </div>
                <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
                  ${getSubtractionStepChoices(prob, subtractionCurrentStep, subtractionHasBorrowed).map(val => `
                    <button class="action-btn" style="background:#1e293b;border:2px solid #38bdf8;color:#fff;font-size:20px;font-weight:900;padding:10px 22px;min-width:60px;" onclick="handleSubtractionStepAnswer(${val})">
                      ${val}
                    </button>
                  `).join('')}
                </div>
              ` : `
                <div style="background:rgba(16,185,129,0.15);border:2px solid #10b981;border-radius:14px;padding:16px;">
                  <div style="font-size:36px;margin-bottom:4px;">🎉🌟</div>
                  <h4 style="font-size:18px;color:#6ee7b7;font-weight:900;margin-bottom:6px;">Harika Çözdün!</h4>
                  <p style="font-size:13px;color:#cbd5e1;margin-bottom:14px;">
                    ${prob.n1} - ${prob.n2} = <strong>${prob.diff}</strong> çıkarma işlemini doğru tamamladın.
                  </p>
                  <button class="action-btn" style="background:#10b981;color:#fff;font-size:14px;font-weight:900;padding:10px 24px;" onclick="nextSubtractionProblem()">
                    Sonraki Soruya Geç ➔
                  </button>
                </div>
              `}
            </div>
          </div>
        `;
      }

      const fullHtml = `
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
          <button class="action-btn" style="background:#334155;color:#f8fafc;font-size:13px;font-weight:800;padding:8px 16px;display:inline-flex;align-items:center;gap:6px;" onclick="selectHomeSubject('math')">
            ⬅️ Matematik Menüsüne Dön
          </button>
          <div style="display:flex;gap:8px;">
            <button class="action-btn ${mathActiveStage === 'learn' ? 'active-all' : ''}" style="background:${mathActiveStage === 'learn' ? '#ef4444' : '#1e293b'};font-size:12px;font-weight:800;padding:7px 12px;" onclick="setMathStage('learn', 'subtraction')">
              📖 Konu Anlatımı
            </button>
            <button class="action-btn ${mathActiveStage === 'practice' ? 'active-all' : ''}" style="background:${mathActiveStage === 'practice' ? '#ef4444' : '#1e293b'};font-size:12px;font-weight:800;padding:7px 12px;" onclick="setMathStage('practice', 'subtraction')">
              ✏️ İnteraktif Tahta
            </button>
          </div>
        </div>

        ${contentHtml}
      `;

      document.getElementById('appContent').innerHTML = fullHtml;
    }

    function setSubtractionPracticeType(type) {
      subtractionPracticeType = type;
      nextSubtractionProblem();
    }

    function nextSubtractionProblem() {
      subtractionCurrentProblem = generateSubtractionProblem(subtractionPracticeType === 'with_borrow');
      subtractionCurrentStep = subtractionCurrentProblem.needsBorrow ? 'borrow_check' : 'ones';
      subtractionHasBorrowed = false;
      subtractionUserOnes = '';
      subtractionUserTens = '';
      renderMathSubtraction();
    }

    function handleBorrowTens() {
      recordActivity();
      playChimeSound('fanfare');
      subtractionHasBorrowed = true;
      subtractionCurrentStep = 'ones';
      speakTurkish("Harika! Komşudan 1 onluk aldın. Komşuda " + subtractionCurrentProblem.borrowedTens1 + " onluk kaldı, sende " + subtractionCurrentProblem.borrowedOnes1 + " birlik oldu!");
      renderMathSubtraction();
    }

    function getSubtractionStepChoices(prob, step, hasBorrowed) {
      if (step === 'ones') {
        const correct = prob.onesDiff;
        const set = new Set([correct]);
        while (set.size < 4) {
          const r = Math.floor(Math.random() * 10);
          set.add(r);
        }
        return Array.from(set).sort((a, b) => a - b);
      } else {
        const correct = prob.tensDiff;
        const set = new Set([correct]);
        while (set.size < 4) {
          const r = Math.max(0, correct + Math.floor(Math.random() * 5) - 2);
          set.add(r);
        }
        return Array.from(set).sort((a, b) => a - b);
      }
    }

    function handleSubtractionStepAnswer(val) {
      recordActivity();
      const prob = subtractionCurrentProblem;
      if (subtractionCurrentStep === 'ones') {
        if (val === prob.onesDiff) {
          playChimeSound('correct');
          subtractionUserOnes = String(val);
          subtractionCurrentStep = 'tens';
          const topOnes = subtractionHasBorrowed ? prob.borrowedOnes1 : prob.ones1;
          speakTurkish("Aferin! " + topOnes + " eksi " + prob.ones2 + " eşittir " + prob.onesDiff + ".");
          renderMathSubtraction();
        } else {
          playChimeSound('wrong');
          const topOnes = subtractionHasBorrowed ? prob.borrowedOnes1 : prob.ones1;
          speakTurkish("Tekrar dene! " + topOnes + " sayısından " + prob.ones2 + " çıkarsa kaç kalır?");
        }
      } else if (subtractionCurrentStep === 'tens') {
        if (val === prob.tensDiff) {
          playChimeSound('fanfare');
          subtractionUserTens = String(val);
          subtractionCurrentStep = 'done';
          subtractionScore += 10;
          subtractionStreak++;
          unlockBadge('math_subtraction_hero');
          speakTurkish("Tebrikler! Çıkarma işleminin farkı " + prob.diff + "! Çok güzel çözdün.");
          renderMathSubtraction();
        } else {
          playChimeSound('wrong');
          const topTens = subtractionHasBorrowed ? prob.borrowedTens1 : prob.tens1;
          speakTurkish("Onlukları tekrar çıkar: " + topTens + " eksi " + prob.tens2 + " kaç eder?");
        }
      }
    }

    /* MEB MAARİF MODELİ HİKAYELİ PROBLEM ÇÖZME ATÖLYESİ */
    function renderMathProblems() {
      recordActivity();
      currentMainTab = 'math_problems';
      document.getElementById('subHeaderTitle').textContent = '🧠 2. Sınıf MEB Maarif Modeli Hikayeli Problem Çözme Atölyesi';

      if (storyProblemIndex >= mathStoryProblems.length) {
        // TÜM PROBLEMLER TAMAMLANDI EKRANI
        const fullScore = mathStoryProblems.length * 10;
        const html = `
          <div style="margin-bottom:14px;">
            <button class="action-btn" style="background:#334155;color:#f8fafc;font-size:13px;font-weight:800;padding:8px 16px;display:inline-flex;align-items:center;gap:6px;" onclick="selectHomeSubject('math')">
              ⬅️ Matematik Menüsüne Dön
            </button>
          </div>
          <div class="card" style="text-align:center;padding:32px 20px;border:2px solid #f59e0b;">
            <div style="font-size:60px;margin-bottom:8px;">🏆🎖️</div>
            <h3 style="font-size:24px;color:#fde047;margin-bottom:8px;font-weight:900;">Tebrikler Şampiyon!</h3>
            <p style="font-size:14px;color:#cbd5e1;margin-bottom:18px;">
              2. Sınıf MEB Maarif Modeli Hikayeli Problem Çözme Atölyesini başarıyla tamamladın!
            </p>
            <div style="font-size:36px;color:#fff;font-weight:900;margin-bottom:20px;">
              ${storyProblemScore} / ${fullScore} Puan
            </div>
            <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
              <button class="whatsapp-share-btn" onclick="openWhatsAppShare('🌟 *Lingo Ders Arkadaşım 2. Sınıf Matematik Karne Raporu* 🌟\n👤 Öğrenci MEB Maarif Hikayeli Problem Atölyesini ' + storyProblemScore + '/${fullScore} tam puanla tamamladı!\nTebrikler! 🏆')">
                📲 Karneni WhatsApp ile Paylaş
              </button>
              <button class="action-btn" style="background:#3b82f6;color:#fff;font-weight:800;font-size:14px;padding:12px 20px;" onclick="storyProblemIndex = 0; storyProblemScore = 0; storyProblemUserChoice = null; renderMathProblems();">
                🔄 Problemleri Yeniden Çöz
              </button>
            </div>
          </div>
        `;
        document.getElementById('appContent').innerHTML = html;
        return;
      }

      const p = mathStoryProblems[storyProblemIndex];

      const html = `
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
          <button class="action-btn" style="background:#334155;color:#f8fafc;font-size:13px;font-weight:800;padding:8px 16px;display:inline-flex;align-items:center;gap:6px;" onclick="selectHomeSubject('math')">
            ⬅️ Matematik Menüsüne Dön
          </button>
          <div style="display:flex;gap:10px;align-items:center;">
            <span style="background:rgba(245,158,11,0.2);color:#fde047;padding:5px 12px;border-radius:10px;font-size:13px;font-weight:800;">
              ⭐ Puan: ${storyProblemScore}
            </span>
            <span style="font-size:13px;color:#94a3b8;font-weight:700;">
              Problem: ${storyProblemIndex + 1} / ${mathStoryProblems.length}
            </span>
          </div>
        </div>

        <div class="card" style="border:2px solid #38bdf8;padding:22px;">
          <!-- PROBLEM BAŞLIĞI VE ETİKETLER -->
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:11px;font-weight:900;background:#0284c7;color:#fff;padding:3px 10px;border-radius:6px;">
                ${p.badge}
              </span>
              <span style="font-size:11px;color:#94a3b8;background:rgba(255,255,255,0.06);padding:3px 10px;border-radius:6px;">
                ${p.theme}
              </span>
            </div>
            <button class="sound-btn" onclick="speakTurkish('${p.text.replace(/'/g, "\\'")}')" title="Problemi Sesli Dinle">
              🔊 Soruyu Dinle
            </button>
          </div>

          <h3 style="font-size:19px;color:#fff;font-weight:900;margin-bottom:10px;">
            ${p.title}
          </h3>

          <!-- PROBLEM METNİ -->
          <div style="background:rgba(255,255,255,0.04);border-left:4px solid #38bdf8;border-radius:8px;padding:16px;margin-bottom:16px;font-size:15px;line-height:1.6;color:#f8fafc;">
            ${p.text}
          </div>

          <!-- DÜŞÜNME VE ANLAMA REHBERİ (MAARİF MODELİ) -->
          <div style="background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.25);border-radius:12px;padding:12px 14px;margin-bottom:18px;font-size:13px;color:#bae6fd;line-height:1.5;">
            💡 <strong>Problemi Anlayalım:</strong> ${p.clue}
          </div>

          <!-- CEVAP ŞIKLARI -->
          <div style="font-size:14px;font-weight:800;color:#fff;margin-bottom:10px;">
            Cevabını Seç:
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
            ${p.options.map(opt => {
              const isSelected = storyProblemUserChoice === opt;
              const isCorrect = parseInt(opt) === p.answer;
              let btnStyle = 'background:#1e293b;border:2px solid #334155;color:#fff;';
              if (storyProblemShowSolution) {
                if (isCorrect) btnStyle = 'background:#10b981;border:2px solid #10b981;color:#fff;font-weight:900;';
                else if (isSelected && !isCorrect) btnStyle = 'background:#ef4444;border:2px solid #ef4444;color:#fff;';
              }
              return `
                <button class="action-btn" style="${btnStyle}font-size:18px;padding:14px;font-weight:800;border-radius:12px;" onclick="handleStoryProblemAnswer('${opt}')">
                  ${opt}
                </button>
              `;
            }).join('')}
          </div>

          <!-- DETAYLI AÇIKLAMA ADIMI -->
          ${storyProblemShowSolution ? `
            <div style="background:rgba(16,185,129,0.12);border:1px solid #10b981;border-radius:14px;padding:16px;margin-bottom:16px;animation:fadeIn 0.3s ease;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                <span style="font-size:20px;">✅</span>
                <strong style="color:#6ee7b7;font-size:15px;">Pedagojik Çözüm Adımları:</strong>
              </div>
              <p style="font-size:13px;color:#cbd5e1;line-height:1.6;margin-bottom:12px;">
                ${p.solution}
              </p>
              <button class="action-btn" style="background:#10b981;color:#fff;font-size:14px;font-weight:900;padding:10px 22px;border-radius:10px;" onclick="nextStoryProblem()">
                Sonraki Probleme Geç ➔
              </button>
            </div>
          ` : ''}
        </div>
      `;

      document.getElementById('appContent').innerHTML = html;
    }

    function handleStoryProblemAnswer(selectedOpt) {
      if (storyProblemShowSolution) return;
      recordActivity();
      storyProblemUserChoice = selectedOpt;
      storyProblemShowSolution = true;
      const p = mathStoryProblems[storyProblemIndex];

      if (parseInt(selectedOpt) === p.answer) {
        playChimeSound('correct');
        storyProblemScore += 10;
        speakTurkish("Tebrikler, doğru cevap! " + p.solution);
      } else {
        playChimeSound('wrong');
        speakTurkish("Dikkat et! Doğru cevap " + p.answer + ". Çözüm adımlarına bakalım.");
      }
      renderMathProblems();
    }

    function nextStoryProblem() {
      storyProblemIndex++;
      storyProblemUserChoice = null;
      storyProblemShowSolution = false;
      renderMathProblems();
    }

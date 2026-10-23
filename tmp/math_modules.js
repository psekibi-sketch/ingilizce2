// Test script for Math Operations module
const mathAdditionData = {
  lessons: [
    {
      title: "1. Eldesiz Toplama İşlemi (2 Basamaklı)",
      desc: "İki basamaklı sayılar toplanırken önce birler basamağındaki birlikler toplanıp birler basamağına, sonra onlar basamağındaki onluklar toplanıp onlar basamağına yazılır.",
      example: {
        num1: 34,
        num2: 23,
        step1: "Birlikler: 4 + 3 = 7 birlik",
        step2: "Onluklar: 3 + 2 = 5 onluk",
        result: 57,
        explain: "34'ün 4 birliği ile 23'ün 3 birliğini topladık 7 bulduk. Sonra 3 onluk ile 2 onluğu topladık 5 bulduk. Sonuç 57!"
      }
    },
    {
      title: "2. Eldeli Toplama İşlemi (10 Birlik = 1 Onluk!)",
      desc: "Birler basamağını topladığımızda sonuç 10 veya 10'dan büyük olursa, 10 birlik birleşerek 1 ONLUK oluşturur. Birliği birler basamağına yazarız, 1 onluğu ise 'ELDE VAR 1' olarak onlar basamağına ekleriz.",
      example: {
        num1: 28,
        num2: 15,
        step1: "Birlikler: 8 + 5 = 13 birlik (1 Onluk + 3 Birlik)",
        step2: "3 birliği birler basamağına yazarız. 1 onluk elde olarak onlar basamağına uçar!",
        step3: "Onluklar: 1 (elde) + 2 + 1 = 4 onluk",
        result: 43,
        explain: "8 ile 5'i topladık 13 etti. 13'ün 3'ünü yazdık, elde var 1 onluk! Onlar basamağında 1 + 2 + 1 = 4 oldu. Sonuç 43!"
      }
    }
  ]
};

console.log('Math addition data parsed successfully!');

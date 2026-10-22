const fs = require('fs');
let html = fs.readFileSync('./index.html', 'utf8');

const target = '<button class="action-btn" onclick="speakText(`Hello! My name is ${p56About.name || \'a student\'}. My favourite food is ${p56About.favFood}. My favourite drink is ${p56About.favDrink}. I like ${p56About.likeFood}. I do not like ${p56About.dislikeFood}. I like ${p56About.breakfast} for breakfast, ${p56About.lunch} for lunch and ${p56About.dinner} for dinner.`)">';

if (html.includes(target)) {
  html = html.replace(target, '<button class="action-btn" onclick="speakP56About()">');
  console.log('Target found and replaced!');
} else {
  console.log('Target not found directly, finding via indexOf...');
  const idx = html.indexOf('speakText(`Hello!');
  if (idx !== -1) {
    const endIdx = html.indexOf('</button>', idx);
    const before = html.substring(0, idx - 37); // <button class="action-btn" onclick="
    const after = html.substring(endIdx);
    html = before + '<button class="action-btn" onclick="speakP56About()">' + after;
    console.log('Replaced via substring!');
  }
}

fs.writeFileSync('./index.html', html, 'utf8');
console.log('Saved index.html');

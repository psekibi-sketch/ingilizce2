const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const mathCode = fs.readFileSync('tmp/math_code_block.js', 'utf8');

const targetAnchor = "    document.getElementById('appContent').innerHTML = fullHtml;\n    }\n\n\n    /* ========================================================\n       2.1. UNIT 1: WORDS & GREETINGS (SAYFA 9 - 16)";

if (!indexHtml.includes(targetAnchor)) {
  console.error("Target anchor not found!");
  // Try with flexible whitespace
  const regex = /document\.getElementById\('appContent'\)\.innerHTML = fullHtml;\s*\}\s*\/\* ========================================================\s*2\.1\. UNIT 1: WORDS & GREETINGS/m;
  if (!regex.test(indexHtml)) {
    console.error("Regex match failed as well!");
    process.exit(1);
  }
  const newHtml = indexHtml.replace(regex, "document.getElementById('appContent').innerHTML = fullHtml;\n    }\n\n" + mathCode + "\n\n    /* ========================================================\n       2.1. UNIT 1: WORDS & GREETINGS");
  fs.writeFileSync('index.html', newHtml, 'utf8');
  console.log("Successfully injected using regex!");
} else {
  const replacement = "    document.getElementById('appContent').innerHTML = fullHtml;\n    }\n\n" + mathCode + "\n\n    /* ========================================================\n       2.1. UNIT 1: WORDS & GREETINGS (SAYFA 9 - 16)";
  const newHtml = indexHtml.replace(targetAnchor, replacement);
  fs.writeFileSync('index.html', newHtml, 'utf8');
  console.log("Successfully injected math module into index.html!");
}

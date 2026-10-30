// Erzeugt eine einzelne HTML-Datei (offline per Doppelklick nutzbar): dist/neuromod-grouper.html
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const mod = (file, name) => {
  let src = readFileSync(file, "utf8");
  const exportsList = [];
  // import { a, b } from "./x.js";  →  const { a, b } = __x;
  src = src.replace(/^import\s*\{([^}]+)\}\s*from\s*"\.\/(\w+)\.js";\s*$/gm, (_, names, f) => `const {${names}} = __${f};`);
  src = src.replace(/^export\s+(const|function|let)\s+(\w+)/gm, (_, kw, n) => { exportsList.push(n); return `${kw} ${n}`; });
  return `const __${name} = (() => {\n${src}\nreturn { ${exportsList.join(", ")} };\n})();\n`;
};

const css = readFileSync("assets/style.css", "utf8");
const js = mod("assets/data.js", "data") + mod("assets/grouper.js", "grouper") + mod("assets/app.js", "app");
let html = readFileSync("index.html", "utf8");
html = html.replace('<link rel="stylesheet" href="assets/style.css" />', `<style>\n${css}\n</style>`);
html = html.replace('<script type="module" src="assets/app.js"></script>', `<script>\n${js}\n</script>`);
mkdirSync("dist", { recursive: true });
writeFileSync("dist/neuromod-grouper.html", html);
console.log("dist/neuromod-grouper.html", html.length, "Bytes");

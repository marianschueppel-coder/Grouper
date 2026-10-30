import { META, LBFW, DRGS, ZE, ICD, OPS, PRESETS, SOURCES } from "./data.js";
import { group, calcRevenue, ambulant, checkReadmission, MDC_NAMES } from "./grouper.js";

const $ = (s) => document.querySelector(s);
const eur = (x) => x == null ? "–" : x.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
const br = (x, d = 3) => x == null ? "–" : x.toLocaleString("de-DE", { minimumFractionDigits: d, maximumFractionDigits: 4 });
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// ---------- Einstellungen (lokal gespeichert) ----------
const SETTINGS_KEY = "nmg-settings-v1";
function loadSettings() {
  try { return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}; } catch { return {}; }
}
function saveSettings(s) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch { /* ignorieren */ }
}
const settings = Object.assign({ bfwId: "BUND", bfwCustom: "", pew: META.pflegeentgeltwert, ze61: "", inclPflege: true, ow: META.orientierungswert }, loadSettings());

const state = { hd: "", ops: new Set(), amb: new Set() };

// ---------- Tabs ----------
document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach((x) => { x.classList.toggle("active", x === t); x.setAttribute("aria-selected", x === t); });
  document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === `tab-${t.dataset.tab}`));
}));

// ---------- Hauptdiagnose ----------
function renderHdList() {
  const q = norm($("#hd-search").value.trim());
  const list = ICD.filter((i) => !q || norm(i.code).includes(q) || norm(i.text).includes(q) || norm(i.group).includes(q));
  let html = "", grp = "";
  for (const i of list) {
    if (i.group !== grp) { grp = i.group; html += `<div class="pick-group">${esc(grp)}</div>`; }
    html += `<button type="button" role="option" class="pick${state.hd === i.code ? " sel" : ""}" data-code="${i.code}"><span class="code">${i.code}</span><span>${esc(i.text)}</span></button>`;
  }
  $("#hd-list").innerHTML = html || `<div class="empty-list">Keine Treffer. Das Tool enthält nur typische Diagnosen der Neuromodulation.</div>`;
}
$("#hd-list").addEventListener("click", (e) => {
  const b = e.target.closest(".pick"); if (!b) return;
  state.hd = b.dataset.code; renderHdSelected(); renderHdList(); compute();
});
$("#hd-search").addEventListener("input", renderHdList);
function renderHdSelected() {
  const i = ICD.find((x) => x.code === state.hd);
  const el = $("#hd-selected");
  el.classList.toggle("empty", !i);
  el.innerHTML = i ? `<span class="code">${i.code}</span>${esc(i.text)}` : "Noch keine Hauptdiagnose gewählt";
}

// ---------- OPS (stationär + ambulant) ----------
function opsTags(p, mode) {
  const t = [];
  if (p.ze) t.push(`<span class="tag ze">${p.ze}</span>`);
  if (mode === "amb" && p.aop) t.push(`<span class="tag aop">AOP</span>`);
  if (mode === "amb" && p.ebm) t.push(`<span class="tag">EBM ${p.ebm}</span>`);
  return t.length ? `<span class="tags">${t.join("")}</span>` : "";
}
function renderOpsList(listSel, searchSel, set, filter, mode) {
  const q = norm($(searchSel).value.trim());
  const list = OPS.filter(filter).filter((p) => !q || norm(p.code).includes(q) || norm(p.text).includes(q) || norm(p.group).includes(q));
  let html = "", grp = "";
  for (const p of list) {
    if (p.group !== grp) { grp = p.group; html += `<div class="pick-group">${esc(grp)}</div>`; }
    html += `<button type="button" class="pick${set.has(p.code) ? " sel" : ""}" data-code="${p.code}" aria-pressed="${set.has(p.code)}"><span class="box"></span><span class="code">${p.code}</span><span>${esc(p.text)}${opsTags(p, mode)}</span></button>`;
  }
  $(listSel).innerHTML = html || `<div class="empty-list">Keine Treffer.</div>`;
}
function renderChips(sel, set, onRemove) {
  $(sel).innerHTML = [...set].map((c) => `<span class="chip">${c}<button type="button" data-code="${c}" aria-label="${c} entfernen">×</button></span>`).join("");
  $(sel).querySelectorAll("button").forEach((b) => b.addEventListener("click", () => onRemove(b.dataset.code)));
}

const statFilter = (p) => !p.ambulantOnly;
const ambFilter = (p) => p.aop || p.ebm || p.fam.startsWith("rfa");

function refreshStatOps() {
  renderOpsList("#ops-list", "#ops-search", state.ops, statFilter, "stat");
  renderChips("#ops-selected", state.ops, (c) => { state.ops.delete(c); refreshStatOps(); compute(); });
}
function refreshAmbOps() {
  renderOpsList("#amb-list", "#amb-search", state.amb, ambFilter, "amb");
  renderChips("#amb-selected", state.amb, (c) => { state.amb.delete(c); refreshAmbOps(); computeAmb(); });
}
$("#ops-list").addEventListener("click", (e) => {
  const b = e.target.closest(".pick"); if (!b) return;
  const c = b.dataset.code; state.ops.has(c) ? state.ops.delete(c) : state.ops.add(c);
  refreshStatOps(); compute();
});
$("#amb-list").addEventListener("click", (e) => {
  const b = e.target.closest(".pick"); if (!b) return;
  const c = b.dataset.code; state.amb.has(c) ? state.amb.delete(c) : state.amb.add(c);
  refreshAmbOps(); computeAmb();
});
$("#ops-search").addEventListener("input", () => renderOpsList("#ops-list", "#ops-search", state.ops, statFilter, "stat"));
$("#amb-search").addEventListener("input", () => renderOpsList("#amb-list", "#amb-search", state.amb, ambFilter, "amb"));
$("#ops-clear").addEventListener("click", () => { state.ops.clear(); refreshStatOps(); compute(); });
$("#amb-clear").addEventListener("click", () => { state.amb.clear(); refreshAmbOps(); computeAmb(); });

// ---------- Presets ----------
$("#preset").innerHTML += PRESETS.map((p) => `<option value="${p.id}">${esc(p.label)}</option>`).join("");
$("#preset").addEventListener("change", (e) => {
  const p = PRESETS.find((x) => x.id === e.target.value); if (!p) return;
  state.hd = p.hd; state.ops = new Set(p.ops); $("#vwd").value = p.vwd;
  $("#hd-search").value = ""; $("#ops-search").value = "";
  renderHdSelected(); renderHdList(); refreshStatOps(); compute();
});

// ---------- Parameter ----------
$("#bfw-select").innerHTML = LBFW.map((l) => `<option value="${l.id}">${esc(l.name)} – ${eur(l.value)}</option>`).join("") + `<option value="CUSTOM">Eigener Wert …</option>`;
$("#bfw-select").value = settings.bfwId;
$("#bfw-custom").value = settings.bfwCustom;
$("#pew").value = settings.pew;
$("#ze61").value = settings.ze61;
$("#incl-pflege").checked = settings.inclPflege;
$("#ow").value = settings.ow;
function syncBfwCustom() { $("#bfw-custom-wrap").classList.toggle("hidden", $("#bfw-select").value !== "CUSTOM"); }
syncBfwCustom();

function currentBfw() {
  const id = $("#bfw-select").value;
  if (id === "CUSTOM") return parseFloat($("#bfw-custom").value) || META.bbfw;
  return (LBFW.find((l) => l.id === id) || LBFW[0]).value;
}
function persist() {
  Object.assign(settings, {
    bfwId: $("#bfw-select").value, bfwCustom: $("#bfw-custom").value, pew: parseFloat($("#pew").value) || 0,
    ze61: $("#ze61").value, inclPflege: $("#incl-pflege").checked, ow: parseFloat($("#ow").value) || META.orientierungswert,
  });
  saveSettings(settings);
}
["#vwd", "#alter", "#bfw-custom", "#pew", "#ze61"].forEach((s) => $(s).addEventListener("input", () => { persist(); compute(); }));
["#bfw-select", "#incl-pflege"].forEach((s) => $(s).addEventListener("change", () => { syncBfwCustom(); persist(); compute(); }));
$("#ow").addEventListener("input", () => { persist(); computeAmb(); });

// ---------- Mobile Ergebnisleiste ----------
function setMobileBar(text) {
  const bar = $("#mobile-bar");
  bar.classList.toggle("hidden", !text || !$("#tab-stationaer").classList.contains("active"));
  if (text) $("#mobile-bar-text").textContent = text;
}
$("#mobile-bar").addEventListener("click", () => $("#result").scrollIntoView({ behavior: "smooth", block: "start" }));
document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => compute()));

// ---------- Stationäre Berechnung ----------
let lastText = "";
function compute() {
  const out = $("#result");
  if (!state.hd && !state.ops.size) {
    out.innerHTML = `<div class="result-empty"><p>Hauptdiagnose und Prozedur wählen – das Ergebnis erscheint hier.</p></div>`;
    setMobileBar(null);
    return;
  }
  const vwd = Math.max(1, parseInt($("#vwd").value, 10) || 1);
  const alterRaw = $("#alter").value;
  const r = group({ hd: state.hd, ops: [...state.ops], vwd, alter: alterRaw === "" ? null : parseInt(alterRaw, 10) });
  const alerts = [
    ...r.errors.map((m) => `<div class="alert err">${esc(m)}</div>`),
    ...r.warnings.map((m) => `<div class="alert warn">${esc(m)}</div>`),
  ].join("");
  const stepsHtml = r.steps.length ? `<div class="section-title">So wurde gruppiert</div><ol class="steps">${r.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>` : "";

  if (!r.drg) {
    setMobileBar("Keine DRG ermittelt");
    out.innerHTML = `<div class="no-drg">Keine DRG ermittelt</div><p class="muted small">Die gewählte Kombination ist unvollständig oder im Tool nicht abgebildet.</p>${alerts}${stepsHtml}`;
    lastText = "";
    return;
  }

  const ze61 = parseFloat($("#ze61").value);
  const bfw = currentBfw();
  const rev = calcRevenue(r.drg, r.ze, {
    vwd, bfw, pew: parseFloat($("#pew").value) || 0, includePflege: $("#incl-pflege").checked,
    zeAmounts: isNaN(ze61) ? {} : { "ZE2026-61": ze61 },
  });
  const d = rev.def;
  const gvd = `${d.ugvd ?? "–"} / ${d.ogvd ?? "–"}`;

  let rows = `<tr><td>Basisbetrag<span class="sub">Bewertungsrelation ${br(d.rg)} × Basisfallwert ${eur(bfw)}</span></td><td>${eur(rev.basis)}</td></tr>`;
  if (rev.abschlagTage) rows += `<tr class="neg"><td>Abschlag untere Grenzverweildauer<span class="sub">${rev.abschlagTage} Tag(e) × ${br(d.ugvdBR)} BR</span></td><td>− ${eur(rev.abschlag)}</td></tr>`;
  if (rev.zuschlagTage) rows += `<tr class="pos"><td>Zuschlag obere Grenzverweildauer<span class="sub">${rev.zuschlagTage} Tag(e) × ${br(d.ogvdBR)} BR</span></td><td>+ ${eur(rev.zuschlag)}</td></tr>`;
  if ($("#incl-pflege").checked) rows += `<tr><td>Pflegeerlös<span class="sub">${rev.vwd} Tag(e) × ${br(d.pflege, 4)} BR × ${eur(parseFloat($("#pew").value) || 0)}</span></td><td>${eur(rev.pflege)}</td></tr>`;
  for (const z of rev.zeItems) {
    rows += `<tr><td>${z.code}<span class="sub">${esc(z.title)}</span></td><td>${z.amount != null ? eur(z.amount) : "individuell"}</td></tr>`;
  }
  rows += `<tr class="total"><td>Erlös gesamt (Schätzung)</td><td>${eur(rev.gesamt)}</td></tr>`;

  const zeNote = rev.zeItems.some((z) => z.individuell && z.amount == null)
    ? `<div class="alert info">ZE2026-61 ist krankenhausindividuell vereinbart und daher nicht in der Summe enthalten. Betrag unter „Fallparameter“ eintragen.</div>` : "";

  out.innerHTML = `
    <div class="drg-head">
      <div class="drg-code">${r.drg}</div>
      <div class="drg-title">${esc(d.title)}</div>
    </div>
    <div class="kpis">
      <div class="kpi"><div class="k">Bew.-Relation</div><div class="v">${br(d.rg)}</div></div>
      <div class="kpi"><div class="k">Partition</div><div class="v">${d.part}</div></div>
      <div class="kpi"><div class="k">uGVD / oGVD</div><div class="v">${gvd}</div></div>
      <div class="kpi"><div class="k">mittl. VWD</div><div class="v">${br(d.mvd, 1)}</div></div>
    </div>
    <table class="calc">${rows}</table>
    ${zeNote}${alerts}${stepsHtml}
    <div class="section-title">Annahmen</div>
    <p class="muted small">PCCL 0, Hauptabteilung, keine Verlegung, ${MDC_NAMES[r.mdc] || ""}. uGVD/oGVD = erster Tag mit Abschlag bzw. Zuschlag.</p>
    <div class="actions">
      <button class="btn" type="button" id="btn-copy">Ergebnis kopieren</button>
      <button class="btn" type="button" id="btn-print">Drucken / PDF</button>
    </div>`;

  setMobileBar(`${r.drg} · ${eur(rev.gesamt)}`);
  lastText = [
    `Neuromod-Grouper ${META.year} (privates Projekt, ohne Gewähr)`,
    `HD: ${state.hd}`, `OPS: ${[...state.ops].join(", ")}`, `VWD: ${rev.vwd} Tage`,
    `aG-DRG: ${r.drg} – ${d.title}`, `Bewertungsrelation: ${br(d.rg)}; Basisfallwert: ${eur(bfw)}`,
    `DRG-Erlös: ${eur(rev.drgErloes)}`, `Pflegeerlös: ${eur(rev.pflege)}`,
    ...rev.zeItems.map((z) => `${z.code}: ${z.amount != null ? eur(z.amount) : "individuell"}`),
    `Gesamt (Schätzung): ${eur(rev.gesamt)}`,
  ].join("\n");
  $("#btn-copy").addEventListener("click", async (e) => {
    try { await navigator.clipboard.writeText(lastText); e.target.textContent = "Kopiert ✓"; }
    catch { e.target.textContent = "Kopieren nicht möglich"; }
    setTimeout(() => (e.target.textContent = "Ergebnis kopieren"), 1800);
  });
  $("#btn-print").addEventListener("click", () => window.print());
}

// ---------- Ambulant ----------
function computeAmb() {
  const out = $("#amb-result");
  if (!state.amb.size) {
    out.innerHTML = `<div class="result-empty"><p>Prozedur wählen, um AOP-Fähigkeit und EBM-Bewertung zu sehen.</p></div>`;
    return;
  }
  const ow = parseFloat($("#ow").value) || META.orientierungswert;
  const res = ambulant([...state.amb], ow);
  const rows = res.rows.map((r) => `<tr><td><strong>${r.code}</strong>${r.aop ? ' <span class="tag aop">AOP § 115b</span>' : ""}<span class="sub">${esc(r.text)}</span>
      <span class="sub">${r.ebm ? `EBM-GOP ${r.ebm} · ${r.points.toLocaleString("de-DE")} Punkte` : "keine EBM-OP-Leistung hinterlegt"}</span></td>
      <td>${r.euro != null ? eur(r.euro) : "–"}</td></tr>`).join("");
  const hasRfa = [...state.amb].some((c) => /^5-8(3a|30|59)/.test(c));
  const rfaBox = hasRfa ? `
    <div class="section-title">Radiofrequenzablation beim Vertragsarzt (Beispiel)</div>
    <table class="calc">
      ${[["34503", "Bildwandlergestützte Intervention an der Wirbelsäule", 667], ["30700", "Grundpauschale schmerztherapeutischer Patient*", 394], ["30702", "Zusatzpauschale Schmerztherapie*", 498], ["16220", "Neurologisches Gespräch, je 10 Min.", 154]]
        .map(([g, t, p]) => `<tr><td>GOP ${g}<span class="sub">${t} · ${p} Pkt.</span></td><td>${eur(Math.round(p * ow * 100) / 100)}</td></tr>`).join("")}
    </table>
    <p class="muted small">* nur mit Genehmigung nach QS-Vereinbarung Schmerztherapie (§ 135 Abs. 2 SGB V). Punktzahlen ohne Gewähr.</p>` : "";

  out.innerHTML = `
    ${res.leading ? `<div class="drg-head"><div class="drg-code">${res.leading.ebm}</div><div class="drg-title">Führende OP-Leistung (höchste Bewertung)<br><strong>${eur(res.leading.euro)}</strong> bei ${br(ow, 4)} € je Punkt</div></div>` : `<div class="no-drg">Keine EBM-OP-Leistung hinterlegt</div>`}
    ${res.uew ? `<table class="calc"><tr><td>Postoperative Überwachung (GOP ${res.uew.gop})<span class="sub">${res.uew.title} · ${res.uew.points.toLocaleString("de-DE")} Punkte · nur bei erbrachtem Leistungsinhalt</span></td><td>${eur(res.uew.euro)}</td></tr><tr class="total"><td>OP-Leistung + Überwachung</td><td>${eur(Math.round((res.leading.euro + res.uew.euro) * 100) / 100)}</td></tr></table>` : ""}
    <div class="section-title">Prozeduren</div>
    <table class="calc">${rows}</table>
    <div class="alert info">Bei mehreren Eingriffen in einer Sitzung wird i. d. R. die höchstbewertete OP-Leistung abgerechnet, weitere Eingriffe ggf. über den Simultanzuschlag (GOP 31258). Postoperative Behandlungskomplexe und Anästhesie sind gesondert berechnungsfähig. Zuordnung OPS → Kategorie/GOP laut Anhang 2 zum EBM (Stand 01.07.2026).</div>
    <div class="alert warn">Implantat-/Sachkosten (Neurostimulator, Elektroden) sind in der OP-Leistung nicht enthalten. Erstattung nach AOP-Vertrag bzw. regionalen Vereinbarungen prüfen.</div>
    ${rfaBox}`;
}

// ---------- Wiederaufnahme ----------
const drgOptions = Object.entries(DRGS).map(([k, v]) => `<option value="${k}">${k} – ${esc(v.title.slice(0, 70))}${v.title.length > 70 ? "…" : ""}</option>`).join("");
$("#wa-drg1").innerHTML = drgOptions; $("#wa-drg2").innerHTML = drgOptions;
$("#wa-drg1").value = "I19B"; $("#wa-drg2").value = "I19A";
const today = new Date(); const iso = (d) => d.toISOString().slice(0, 10);
$("#wa-d1").value = iso(today); $("#wa-d2").value = iso(new Date(today.getTime() + 7 * 864e5));
function computeWa() {
  const d1 = new Date($("#wa-d1").value), d2 = new Date($("#wa-d2").value);
  const out = $("#wa-result");
  if (isNaN(d1) || isNaN(d2)) { out.innerHTML = `<p class="muted">Bitte beide Aufnahmedaten eingeben.</p>`; return; }
  const tage = Math.round((d2 - d1) / 864e5);
  if (tage < 0) { out.innerHTML = `<div class="alert err">Aufnahme 2 liegt vor Aufnahme 1.</div>`; return; }
  const r = checkReadmission({ drg1: $("#wa-drg1").value, drg2: $("#wa-drg2").value, tage, komplikation: $("#wa-kompl").checked });
  out.innerHTML = `
    <div class="verdict ${r.merge ? "yes" : "no"}">${r.merge ? "Fallzusammenführung erforderlich" : "Getrennte Abrechnung"}</div>
    <p class="muted small">Abstand der Aufnahmen: ${tage} Kalendertage</p>
    <div class="section-title">Prüfschritte</div>
    <ol class="steps">${r.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
    <div class="alert info">Bei einer Zusammenführung wird der Gesamtfall mit allen Diagnosen und Prozeduren neu gruppiert. Vereinfachte Prüfung ohne Gewähr – Sonderregeln (z. B. Verlegungen, Partition A) sind nicht vollständig abgebildet.</div>`;
}
["#wa-drg1", "#wa-drg2", "#wa-d1", "#wa-d2", "#wa-kompl"].forEach((s) => $(s).addEventListener("change", computeWa));

// ---------- Info ----------
$("#sources").innerHTML = SOURCES.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join("")
  + `<li>Pflegeentgeltwert: ${eur(META.pflegeentgeltwert)} je Tag (§ 15 Abs. 2a KHEntgG), sofern kein krankenhausindividueller Wert vereinbart ist.</li>`
  + `<li>Zusatzentgelte: ZE140 ${eur(ZE.ZE140.amount)}, ZE141 ${eur(ZE.ZE141.amount)} (bundeseinheitliche ZE, Anlage 2/5 Fallpauschalenkatalog 2026).</li>`;
$("#stand").textContent = META.stand;

// ---------- Init ----------
renderHdList(); renderHdSelected(); refreshStatOps(); refreshAmbOps(); compute(); computeAmb(); computeWa();

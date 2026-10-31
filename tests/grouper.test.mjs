// Prüft die Gruppierungslogik gegen veröffentlichte Gruppierungsbeispiele 2026
// Aufruf: node tests/grouper.test.mjs
import { group, calcRevenue, checkReadmission, ambulant, ambulantCase, goaeEuro } from "../assets/grouper.js";
import { DRGS } from "../assets/data.js";

let pass = 0, fail = 0;
const eq = (name, got, exp) => {
  const ok = JSON.stringify(got) === JSON.stringify(exp);
  ok ? pass++ : fail++;
  if (!ok) console.log(`✗ ${name}: erwartet ${JSON.stringify(exp)}, erhalten ${JSON.stringify(got)}`);
};

// [Beschreibung, HD, OPS, erwartete DRG, erwartete ZE, VWD]
const cases = [
  // SCS – Rücken-/Beinschmerz M79.25
  ["SCS M79.25 F1", "M79.25", ["5-039.35"], "I19B", []],
  ["SCS M79.25 F2 n1", "M79.25", ["5-039.n1"], "I19A", ["ZE141"]],
  ["SCS M79.25 F2 n2", "M79.25", ["5-039.n2"], "I19A", ["ZE2026-61"]],
  ["SCS M79.25 F3 e1", "M79.25", ["5-039.e1", "5-039.35"], "I19A", ["ZE140"]],
  ["SCS M79.25 F4 f1", "M79.25", ["5-039.f1"], "I19A", ["ZE141"]],
  ["SCS Rev Elektrodenwechsel", "T85.1", ["5-039.c1", "5-039.35"], "B19B", []],
  ["SCS Rev Stimulator", "T85.1", ["5-039.b"], "B19C", []],
  // PAVK
  ["PAVK F1", "I70.22", ["5-039.35"], "F21C", []],
  ["PAVK F2", "I70.22", ["5-039.n1"], "F21E", ["ZE141"]],
  ["PAVK F3", "I70.22", ["5-039.e1", "5-039.35"], "F21C", ["ZE140"]],
  ["PAVK F4", "I70.22", ["5-039.f2"], "F21E", ["ZE2026-61"]],
  // FBSS
  ["FBSS F1", "M96.1", ["5-039.35"], "I19B", []],
  ["FBSS F2", "M96.1", ["5-039.n1"], "I19A", ["ZE141"]],
  ["FBSS F3", "M96.1", ["5-039.e2", "5-039.35"], "I19A", ["ZE2026-61"]],
  // CRPS
  ["CRPS F1", "G90.51", ["5-039.35"], "B19B", []],
  ["CRPS F2", "G90.51", ["5-039.n1"], "B19A", ["ZE141"]],
  ["CRPS F3", "G90.51", ["5-039.e1", "5-039.35"], "B19A", ["ZE140"]],
  ["CRPS F4", "G90.51", ["5-039.f1"], "B19A", ["ZE141"]],
  // Angina pectoris
  ["AP F1", "I20.9", ["5-039.35"], "F21C", []],
  ["AP F2", "I20.9", ["5-039.n1"], "F21E", ["ZE141"]],
  // DRG-Stimulation
  ["DRG Knie F1", "M79.66", ["5-039.j1"], "I19B", []],
  ["DRG Knie F2", "M79.66", ["5-039.q1"], "I19A", ["ZE141"]],
  ["DRG Knie F3", "M79.66", ["5-039.k1", "5-039.j1"], "I19A", ["ZE140"]],
  ["DRG Knie F4", "M79.66", ["5-039.m1"], "I19A", ["ZE141"]],
  ["DRG Rev", "T85.1", ["5-039.c7", "5-039.j1"], "B19B", []],
  ["DRG Leiste F1", "M79.65", ["5-039.j1"], "I19B", []],
  ["DRG Fuß F3", "M79.67", ["5-039.k1", "5-039.j1"], "I19A", ["ZE140"]],
  ["DRG CRPS F1", "G90.51", ["5-039.j1"], "B19B", []],
  ["DRG CRPS F2", "G90.51", ["5-039.q1"], "B19A", ["ZE141"]],
  ["DRG CRPS F3", "G90.51", ["5-039.k1", "5-039.j0"], "B19A", ["ZE140"]],
  // THS
  ["THS PD F1 Anker", "G20.10", ["5-029.f"], "B20B", []],
  ["THS PD F2 nicht aufladbar", "G20.10", ["5-028.91", "5-014.93"], "B21A", []],
  ["THS PD F2 aufladbar", "G20.10", ["5-028.92", "5-014.93"], "B21A", ["ZE2026-61"]],
  ["THS PD F3 Wechsel", "G20.10", ["5-028.a1"], "B21B", []],
  ["THS PD F3 Wechsel aufladbar", "G20.10", ["5-028.a2"], "B21B", ["ZE2026-61"]],
  ["THS Rev Elektroden", "T85.1", ["5-014.b1", "5-014.93"], "B20D", []],
  ["THS Rev Stimulator", "T85.1", ["5-028.3"], "B20E", []],
  ["THS ET", "G25.0", ["5-028.91", "5-014.93"], "B21A", []],
  ["THS Dystonie", "G24.2", ["5-029.f"], "B20B", []],
  // ICD-Tabelle (Trigger bei PCCL 0)
  ["M54.00 → 801C", "M54.00", ["5-039.e1", "5-039.35"], "801C", ["ZE140"]],
  ["M54.03 → I19A", "M54.03", ["5-039.e1", "5-039.35"], "I19A", ["ZE140"]],
  ["M79.21 → B19A", "M79.21", ["5-039.e1", "5-039.35"], "B19A", ["ZE140"]],
  ["G62.1 → B19A", "G62.1", ["5-039.e1", "5-039.35"], "B19A", ["ZE140"]],
  ["G54.6 → B19A", "G54.6", ["5-039.e1", "5-039.35"], "B19A", ["ZE140"]],
  ["I70.26 → F21C", "I70.26", ["5-039.e1", "5-039.35"], "F21C", ["ZE140"]],
  // RFA
  ["RFA BWS 1 Tag", "M54.6", ["5-83a.01"], "I68F", [], 1],
  ["RFA Kreuz 2 Tage", "M54.5", ["5-83a.01"], "I68E", [], 2],
  ["RFA ISG perkutan", "M54.4", ["5-83a.2"], "I68E", [], 2],
  ["RFA offen Weichteil", "M54.4", ["5-859.37"], "I24B", [], 2],
  ["RFA endoskopisch", "M54.5", ["5-830.2"], "I10H", [], 2],
  // Teststimulation (Kodierbeispiele 2026, öffentlich)
  ["Test 1 temp. Elektrode", "M96.1", ["5-039.32"], "I10F", [], 1],
  ["Test mehrere temp. Elektroden", "M96.1", ["5-039.33"], "I10G", [], 3],
  ["Test temp. PAVK", "I73.9", ["5-039.33"], "F21C", []],
  ["Test temp. CRPS", "G90.51", ["5-039.33"], "B19B", []],
  // Explantation
  ["Explant Stab + IPG", "M54.5", ["5-039.a2", "5-039.d"], "I23B", []],
  ["Explant Platte", "M79.66", ["5-039.a4"], "I10G", []],
  ["Explant PAVK 1 Stab", "I73.9", ["5-039.a2", "5-039.d"], "802D", []],
  ["Explant PAVK mehrere Stab", "I73.9", ["5-039.a3"], "802C", []],
  ["Explant PAVK Platte", "I73.9", ["5-039.a4"], "801E", []],
  ["Revision c0 T85.1", "T85.1", ["5-039.c0"], "B19C", []],
  // THS Revision/Entfernung (öffentliche Beispiele 2026)
  ["THS Rev b0", "G20.11", ["5-014.b0"], "B20D", []],
  ["THS Explant IPG", "G25.0", ["5-028.6"], "B20E", []],
  ["THS Explant Elektrode+Anker", "G24.1", ["5-028.7", "5-029.g"], "B09Z", []],
  // Einkanal / weitere
  ["SCS Einkanal n0", "M96.1", ["5-039.n0"], "I19A", ["ZE139"]],
  ["SCS Einkanal e0", "G57.8", ["5-039.e0", "5-039.34"], "B19A", ["ZE138"]],
  ["SCS PAVK I73.9 e1", "I73.9", ["5-039.e1", "5-039.34"], "F21C", ["ZE140"]],
];

for (const [name, hd, ops, expDrg, expZe, vwd = 3] of cases) {
  const r = group({ hd, ops, vwd });
  eq(`${name} DRG`, r.drg, expDrg);
  eq(`${name} ZE`, r.ze.sort(), expZe.sort());
}

// Fehlerfälle
eq("Doppelter Stimulator", group({ hd: "M96.1", ops: ["5-039.e1", "5-039.n1"], vwd: 2 }).drg, null);
eq("Keine HD", group({ hd: "", ops: ["5-039.e1"], vwd: 2 }).errors.length > 0, true);

// Basisbeträge mit BFW 4.525,17 € (Vergleichswerte aus Beispielrechnungen)
const bfw = 4525.17;
const basis = { I19B: 7136.19, I19A: 5475.46, B19A: 6552.44, B19B: 6909.93, B19C: 3371.25, F21C: 8996.04, F21E: 4126.96, B21A: 30820.93, B21B: 15987.43, B20B: 11625.16, B20D: 8072.90, B20E: 6507.19, I68E: 2013.70, I24B: 2276.16, I10H: 2615.55 };
for (const [d, exp] of Object.entries(basis)) {
  const r = calcRevenue(d, [], { vwd: DRGS[d].ugvd ? DRGS[d].ugvd + 2 : 2, bfw, pew: 250 });
  const ok = Math.abs(r.basis - exp) <= 0.02;
  ok ? pass++ : fail++;
  if (!ok) console.log(`✗ Basisbetrag ${d}: ${r.basis} vs ${exp}`);
}

// Abschlag pro Tag (Vergleich mit Beispielwerten)
const abschlag = { I19B: 556.60, I19A: 334.86, B19A: 343.91, B19B: 1248.95, B19C: 1045.31, F21C: 1031.74, F21E: 1162.97, I68E: 986.49, I24B: 239.83 };
for (const [d, exp] of Object.entries(abschlag)) {
  const r = calcRevenue(d, [], { vwd: DRGS[d].ugvd, bfw, pew: 250 });
  const perDay = r.abschlag / r.abschlagTage;
  const ok = Math.abs(perDay - exp) <= 0.02;
  ok ? pass++ : fail++;
  if (!ok) console.log(`✗ Abschlag/Tag ${d}: ${perDay} vs ${exp}`);
}

// Zu-/Abschlagstage nach FPV
const r1 = calcRevenue("B21A", [], { vwd: 1, bfw, pew: 250 });
eq("B21A VWD1 Abschlagstage", r1.abschlagTage, 2);
const r2 = calcRevenue("I19A", [], { vwd: 8, bfw, pew: 250 });
eq("I19A VWD8 Zuschlagstage", r2.zuschlagTage, 3);
const r3 = calcRevenue("I19A", ["ZE140"], { vwd: 3, bfw: 4570.64, pew: 250 });
eq("I19A Pflegeerlös 3 Tage", r3.pflege, Math.round(0.9561 * 3 * 250 * 100) / 100);
eq("I19A Gesamt mit ZE140", r3.gesamt, Math.round((1.21 * 4570.64 + 0.9561 * 750 + 12842.81) * 100) / 100);

// Wiederaufnahme (Beispiele)
eq("WA Bsp 1 (I68E → I10F, 5 Tage)", checkReadmission({ drg1: "I68E", drg2: "I10F", tage: 5, komplikation: false }).merge, true);
eq("WA Bsp 2 (I10G → I19A, 14 Tage)", checkReadmission({ drg1: "I10G", drg2: "I19A", tage: 14, komplikation: false }).merge, false);
eq("WA gleiche Basis-DRG innerhalb oGVD", checkReadmission({ drg1: "I19B", drg2: "I19A", tage: 4, komplikation: false }).merge, true);
eq("WA gleiche Basis-DRG außerhalb oGVD", checkReadmission({ drg1: "I19B", drg2: "I19A", tage: 10, komplikation: false }).merge, false);

// Ambulant
const amb = ambulant(["5-039.e1", "5-039.35"], 0.127404);
eq("Ambulant führende GOP", amb.leading.ebm, "31256");
eq("Ambulant € 31256", amb.leading.euro, 846.6);
eq("Ambulant Überwachung", amb.uew.gop, "31506");
eq("Ambulant Revision b → 31254", ambulant(["5-039.b"], 0.127404).leading.ebm, "31254");
eq("Ambulant k1 → 31251 (P1)", ambulant(["5-039.k1"], 0.127404).leading.ebm, "31251");

// Ambulanter Abrechnungsfall – Vergleich mit Abrechnungsbeispiel (SCS-Aggregat mit Elektroden)
const ow = 0.127404;
const c1 = ambulantCase(["5-039.e1", "5-039.35"], ow);
const gops = c1.positions.map((p) => p.gop);
eq("AOP Fall e1+35 Positionen", gops, ["16211", "32125", "31256", "31258", "31826", "31506", "31676", "40110", "01602"]);
const eur = Object.fromEntries(c1.positions.map((p) => [p.gop, p.euro]));
eq("31826 Narkose 6", eur["31826"], 420.43); eq("31258 Zuschlag", eur["31258"], 96.83); eq("31676", eur["31676"], 38.6);
eq("16211", eur["16211"], 23.44); eq("01602", eur["01602"], 1.53);
eq("Sachkosten 7 %", c1.sachkosten, Math.round(c1.honorar * 0.07 * 100) / 100);
const c2 = ambulantCase(["5-039.n1"], ow);
eq("AOP Fall n1 ohne Simultanzuschlag", c2.positions.some((p) => p.gop === "31258"), false);
eq("AOP Fall n1 Narkose 2", c2.positions.find((p) => p.gop === "31822").euro, 171.49);
eq("AOP Fall n1 Nachbehandlung 31670", c2.positions.find((p) => p.gop === "31670").euro, 10.83);
const c3 = ambulantCase(["5-039.c7"], ow);
eq("AOP P3 fehlende Punktzahlen gemeldet", c3.missing.sort(), ["31672", "31823"]);
eq("AOP manuelle Punktzahl", ambulantCase(["5-039.c7"], ow, { points: { "31823": 2000 } }).positions.find((p) => p.gop === "31823").euro, 254.81);
eq("Implantat addiert", ambulantCase(["5-039.n1"], ow, { implant: 10000 }).gesamt, Math.round((c2.gesamt + 10000) * 100) / 100);
// GOÄ
eq("GOÄ 452 × 2,3", goaeEuro(190, 2.3, 0.0582873), 25.47);
eq("GOÄ 2570 × 3,5", goaeEuro(4500, 3.5, 0.0582873), 918.02);
eq("GOÄ 5298", goaeEuro(187.5, 1.0, 0.0582873), 10.93);

console.log(`\n${pass} bestanden, ${fail} fehlgeschlagen`);
process.exit(fail ? 1 : 0);

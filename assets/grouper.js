// Regelbasierter Mini-Grouper für Neuromodulation / RFA (aG-DRG 2026)
// KEIN zertifizierter Grouper. Bildet nur die hier hinterlegten Konstellationen
// bei PCCL 0 ab (keine Nebendiagnosen, keine Altersverzweigungen < 18 Jahre).

import { DRGS, ZE, ICD, OPS, EBM } from "./data.js";

const icdMap = Object.fromEntries(ICD.map((i) => [i.code, i]));
const opsMap = Object.fromEntries(OPS.map((p) => [p.code, p]));

export const MDC_NAMES = {
  "01": "MDC 01 – Krankheiten und Störungen des Nervensystems",
  "05": "MDC 05 – Krankheiten und Störungen des Kreislaufsystems",
  "08": "MDC 08 – Krankheiten und Störungen an Muskel-Skelett-System und Bindegewebe",
  "801": "Fehler-DRG / OR-Prozedur ohne Bezug zur Hauptdiagnose (Diagnose außerhalb der Ziel-MDC)",
};

const round2 = (x) => Math.round(x * 100) / 100;

/**
 * @param {{hd:string, ops:string[], vwd:number, alter?:number}} input
 * @returns {{drg:string|null, mdc:string|null, ze:string[], steps:string[], warnings:string[], errors:string[]}}
 */
export function group(input) {
  const { hd, vwd = 1, alter = null } = input;
  const codes = [...new Set(input.ops || [])];
  const steps = [];
  const warnings = [];
  const errors = [];
  const ze = [];

  const diag = icdMap[hd];
  if (!diag) {
    errors.push("Bitte eine Hauptdiagnose aus der Liste wählen.");
    return { drg: null, mdc: null, ze, steps, warnings, errors };
  }
  steps.push(`Hauptdiagnose ${diag.code} → ${MDC_NAMES[diag.mdc]}`);

  const procs = codes.map((c) => opsMap[c]).filter(Boolean);
  const has = (fam) => procs.some((p) => p.fam === fam);
  const hasCode = (re) => procs.some((p) => re.test(p.code));

  if (procs.some((p) => p.ambulantOnly)) {
    warnings.push("Einkanal-/Sonderkodes sind nur für die ambulante Ansicht hinterlegt und werden stationär nicht gruppiert.");
  }

  if (alter !== null && alter < 18) {
    warnings.push("Alter < 18 Jahre: altersabhängige Verzweigungen (z. B. B20A, B20C) sind nicht abgebildet.");
  }

  // ----- Plausibilitätsprüfungen -----
  const stimWithLead = procs.filter((p) => p.fam === "stimWithLead");
  const stimNoLead = procs.filter((p) => p.fam === "stimNoLead" && !p.ambulantOnly);
  if (stimWithLead.length + stimNoLead.length > 1) {
    errors.push("Es ist mehr als ein Neurostimulator-Kode gewählt. Implantation mit Elektrode (5-039.e/k), ohne Elektrode (5-039.n/q) und Wechsel (5-039.f/m) schließen sich gegenseitig aus.");
  }
  if (hasCode(/^5-039\.e/) && !hasCode(/^5-039\.3[4-7]$/)) {
    warnings.push("Bei 5-039.e_ ist die Elektrode gesondert zu kodieren (5-039.34–.37).");
  }
  if (hasCode(/^5-039\.k/) && !hasCode(/^5-039\.j/)) {
    warnings.push("Bei 5-039.k_ ist die Elektrode gesondert zu kodieren (5-039.j_).");
  }
  if (hasCode(/^5-028\.9/) && !hasCode(/^5-014\.9/)) {
    warnings.push("Bei 5-028.9_ sind die intrazerebralen Elektroden gesondert zu kodieren (5-014.9_).");
  }
  if (hasCode(/^5-039\.(3|c|j|a)/) && !has("access") && hasCode(/^5-039\.(36|37|c2|c3|a4|a5)$/)) {
    warnings.push("Hinweis: Bei offen chirurgischen Eingriffen ist der Zugang gesondert zu kodieren (5-030 ff. bis 5-032 ff.). Er beeinflusst die DRG hier nicht.");
  }

  if (errors.length) return { drg: null, mdc: diag.mdc, ze, steps, warnings, errors };

  // ----- Prozedurklassen -----
  const thsProcs = procs.filter((p) => p.fam.startsWith("ths"));
  const spinal = {
    stimWith: stimWithLead.length > 0,
    stimNo: stimNoLead.length > 0,
    leadPerm: has("leadPerm"),
    leadTemp: has("leadTemp"),
    rev: has("revStim") || has("revLead"),
    removal: has("removal"),
  };
  const anySpinal = spinal.stimWith || spinal.stimNo || spinal.leadPerm || spinal.leadTemp || spinal.rev || spinal.removal;
  const anyStim = spinal.stimWith || spinal.stimNo;
  const rfa = { soft: has("rfaSoft"), endo: has("rfaEndo"), facet: has("rfaFacet") };

  let drg = null;

  if (thsProcs.length && anySpinal) {
    warnings.push("Kombination aus Hirn- und Rückenmarkstimulation in einem Aufenthalt ist nicht abgebildet – gruppiert wird die Hirnstimulation.");
  }

  // ===== Tiefe Hirnstimulation =====
  if (thsProcs.length) {
    steps.push("Prozedurklasse: Tiefe Hirnstimulation (5-014 / 5-028 / 5-029)");
    if (diag.mdc !== "01") {
      warnings.push("THS-Prozeduren erwarten eine Hauptdiagnose aus MDC 01 (z. B. G20.-, G24.-, G25.- oder T85.1). Diese Konstellation ist nicht abgebildet.");
    } else if (has("thsStimWithLead")) {
      drg = "B21A";
      steps.push("Neurostimulator zur Hirnstimulation mit Elektrodenimplantation (5-028.9_) → B21A");
    } else if (has("thsStimNoLead")) {
      drg = "B21B";
      steps.push("Neurostimulator zur Hirnstimulation ohne Elektrodenimplantation (5-028.a_/c_) → B21B");
    } else if (hasCode(/^5-014\.b/) || (has("thsRevLead") && has("thsLead"))) {
      drg = "B20D";
      steps.push("Revision intrazerebraler Elektroden (5-014.b_ bzw. 5-028.5 mit Elektrodenwechsel) → B20D");
    } else if (has("thsAnchor")) {
      drg = "B20B";
      steps.push("Implantation von Knochenankern zur stereotaktischen Elektrodeneinführung (5-029.f) → B20B");
    } else if (has("thsRevStim") || has("thsRemoveStim")) {
      drg = "B20E";
      steps.push("Revision bzw. Entfernung des Hirnstimulators ohne Neuanlage (5-028.3 / 5-028.6) → B20E");
    } else if (has("thsRemoveLead")) {
      drg = "B09Z";
      steps.push("Entfernung von Elektrode und/oder Knochenankern (5-028.7 / 5-029.g) → B09Z");
    } else {
      warnings.push("Diese THS-Konstellation (z. B. nur intrazerebrale Elektroden ohne Stimulator) ist im Tool nicht abgebildet.");
    }
    for (const p of thsProcs) if (p.ze && drg) ze.push(p.ze);
    if (drg && !ze.length && (drg === "B21A" || drg === "B21B")) {
      steps.push("Nicht wiederaufladbarer Hirnstimulator: Implantatkosten sind in der DRG einkalkuliert (kein ZE).");
    }
  }

  // ===== Rückenmark- / Spinalganglienstimulation =====
  else if (anySpinal) {
    steps.push("Prozedurklasse: Rückenmark- bzw. Spinalganglienstimulation (5-039)");
    if (diag.mdc === "801") {
      if (anyStim || spinal.leadPerm) {
        drg = "801C";
        steps.push("OR-Prozedur ohne Bezug zur Hauptdiagnose → 801C");
      } else {
        warnings.push("Diese Konstellation ist nicht abgebildet.");
      }
    } else if (diag.mdc === "01") {
      if (anyStim) { drg = "B19A"; steps.push("Implantation/Wechsel eines Neurostimulators → B19A"); }
      else if (spinal.leadPerm || spinal.leadTemp) { drg = "B19B"; steps.push("Implantation/Wechsel eines (permanenten oder temporären) Elektrodensystems ohne Stimulator → B19B"); }
      else { drg = "B19C"; steps.push("Revision/Entfernung ohne Implantation oder Wechsel von Stimulator bzw. Elektroden → B19C"); }
    } else if (diag.mdc === "08") {
      if (anyStim) { drg = "I19A"; steps.push("Implantation/Wechsel eines Neurostimulators → I19A (die Stimulator-Prozedur steuert die DRG, auch bei gleichzeitiger Elektrodenimplantation; der Katalogtitel ist daher missverständlich)"); }
      else if (spinal.leadPerm) { drg = "I19B"; steps.push("Implantation/Wechsel eines permanenten Elektrodensystems ohne Stimulator → I19B"); }
      else if (spinal.leadTemp) {
        drg = hasCode(/^5-039\.33$/) ? "I10G" : "I10F";
        steps.push(`Nur temporäre Teststimulationselektrode(n): ${drg === "I10F" ? "eine Elektrode (5-039.32) → I10F" : "mehrere Elektroden (5-039.33) → I10G"}`);
      } else if (spinal.removal && !spinal.rev) {
        const rm = new Set(procs.filter((p) => p.fam === "removal").map((p) => p.rm));
        if (rm.has("platte") || rm.has("platteMulti")) { drg = "I10G"; steps.push("Entfernung epiduraler Plattenelektrode(n) (5-039.a4/.a5) → I10G"); }
        else if (rm.has("stab") || rm.has("stabMulti")) { drg = "I23B"; steps.push("Entfernung epiduraler Stabelektrode(n) (5-039.a2/.a3, ggf. mit 5-039.d) → I23B"); }
        else warnings.push("Diese Entfernung (z. B. nur Aggregat 5-039.d oder Spinalganglien-Komponenten) ist im Tool nicht abgebildet.");
      } else {
        warnings.push("Revision mit Hauptdiagnose aus MDC 08 ist nicht abgebildet. Bei mechanischer Komplikation ist i. d. R. T85.1 Hauptdiagnose (→ MDC 01, B19C).");
      }
    } else if (diag.mdc === "05") {
      if (spinal.leadPerm || spinal.leadTemp) { drg = "F21C"; steps.push("OR-Prozedur bei Kreislauferkrankung mit Implantation (permanenter oder temporärer) Elektroden → F21C"); }
      else if (anyStim) { drg = "F21E"; steps.push("OR-Prozedur bei Kreislauferkrankung, Stimulator ohne Elektrodenimplantation → F21E"); }
      else if (spinal.removal && !spinal.rev) {
        const rm = new Set(procs.filter((p) => p.fam === "removal").map((p) => p.rm));
        if (rm.has("platte")) { drg = "801E"; steps.push("Entfernung einer Plattenelektrode ohne Bezug zur Hauptdiagnose → 801E"); }
        else if (rm.has("stabMulti")) { drg = "802C"; steps.push("Entfernung mehrerer Stabelektroden ohne Bezug zur Hauptdiagnose → 802C"); }
        else if (rm.has("stab")) { drg = "802D"; steps.push("Entfernung einer Stabelektrode ohne Bezug zur Hauptdiagnose → 802D"); }
        else warnings.push("Diese Entfernung mit Hauptdiagnose aus MDC 05 ist nicht abgebildet.");
      }
      else { warnings.push("Revision mit Hauptdiagnose aus MDC 05 ist nicht abgebildet. Bei mechanischer Komplikation ist i. d. R. T85.1 Hauptdiagnose (→ B19C)."); }
    }
    if (drg) for (const p of [...stimWithLead, ...stimNoLead]) if (p.ze) ze.push(p.ze);
    if (rfa.soft || rfa.endo || rfa.facet) warnings.push("Zusätzliche RFA-Prozeduren beeinflussen die Gruppierung hier nicht.");
  }

  // ===== Radiofrequenzablation =====
  else if (rfa.soft || rfa.endo || rfa.facet) {
    steps.push("Prozedurklasse: Minimalinvasive Schmerztherapie / Radiofrequenzablation");
    const spineDx = /^M5[34]/.test(diag.code) || diag.code === "M96.1";
    if (diag.mdc !== "08") {
      warnings.push("RFA mit Hauptdiagnose außerhalb von MDC 08 (z. B. Trigeminusneuralgie) ist nicht abgebildet.");
    } else if (rfa.soft) {
      drg = "I24B"; steps.push("Perkutane Destruktion von Weichteilen durch Thermoablation (5-859.37) → I24B");
    } else if (rfa.endo) {
      drg = "I10H"; steps.push("Facettendenervation (5-830.2) → I10H");
    } else if (spineDx) {
      drg = vwd > 1 ? "I68E" : "I68F";
      steps.push(`Nicht-OR-Prozedur (5-83a) bei Wirbelsäulenerkrankung, ${vwd > 1 ? "mehr als ein Belegungstag → I68E" : "ein Belegungstag → I68F"}`);
    } else {
      warnings.push("5-83a mit dieser Hauptdiagnose ist nicht abgebildet.");
    }
  }

  // ===== nur Nachkontrolle / Zugang =====
  else if (procs.length) {
    warnings.push("Ohne OR-Prozedur (z. B. nur Nachprogrammierung 8-631) ergibt sich eine medizinische DRG je nach Hauptdiagnose – nicht abgebildet.");
  } else {
    errors.push("Bitte mindestens eine Prozedur wählen.");
  }

  if (has("followup")) {
    steps.push("8-631.- (Nachprogrammierung) ist nicht gruppierungsrelevant; Ersteinstellung ist im Implantationskode enthalten.");
  }

  return { drg, mdc: diag.mdc, ze: [...new Set(ze)], steps, warnings, errors };
}

/**
 * Erlösberechnung nach FPV 2026 (vereinfacht, Hauptabteilung, keine Verlegung)
 * @param {string} drgCode
 * @param {{vwd:number, bfw:number, pew:number, zeAmounts?:Object, includePflege?:boolean}} p
 */
export function calcRevenue(drgCode, ze, p) {
  const d = DRGS[drgCode];
  if (!d) return null;
  const vwd = Math.max(1, Math.round(p.vwd || 1));
  let abschlagTage = 0, zuschlagTage = 0;
  if (d.ugvd && vwd <= d.ugvd) abschlagTage = d.ugvd + 1 - vwd;
  if (d.ogvd && vwd >= d.ogvd) zuschlagTage = vwd + 1 - d.ogvd;
  const abschlagBR = round3(abschlagTage * (d.ugvdBR || 0));
  const zuschlagBR = round3(zuschlagTage * (d.ogvdBR || 0));
  const effBR = round3(d.rg - abschlagBR + zuschlagBR);

  const basis = round2(d.rg * p.bfw);
  const abschlag = round2(abschlagBR * p.bfw);
  const zuschlag = round2(zuschlagBR * p.bfw);
  const drgErloes = round2(basis - abschlag + zuschlag);
  const pflege = p.includePflege === false ? 0 : round2(d.pflege * vwd * p.pew);

  const zeItems = (ze || []).map((code) => {
    const def = ZE[code];
    const custom = p.zeAmounts && p.zeAmounts[code];
    const amount = def && def.amount != null ? (custom ?? def.amount) : (custom ?? null);
    return { code, title: def ? def.title : code, amount, individuell: def ? def.amount == null : true };
  });
  const zeSumme = round2(zeItems.reduce((s, z) => s + (z.amount || 0), 0));

  return {
    drg: drgCode, def: d, vwd,
    abschlagTage, zuschlagTage, abschlagBR, zuschlagBR, effBR,
    basis, abschlag, zuschlag, drgErloes, pflege, zeItems, zeSumme,
    gesamt: round2(drgErloes + pflege + zeSumme),
  };
}

const round3 = (x) => Math.round(x * 1000) / 1000;

/** Ambulante Sicht: AOP-Fähigkeit und EBM-OP-Leistung je OPS */
export function ambulant(codes, ow) {
  const rows = codes.map((c) => opsMap[c]).filter(Boolean).map((p) => {
    const e = p.ebm ? EBM[p.ebm] : null;
    return {
      code: p.code, text: p.text, aop: !!p.aop, ebm: p.ebm || null,
      points: e ? e.points : null, euro: e ? round2(e.points * ow) : null,
    };
  });
  const withEbm = rows.filter((r) => r.euro != null);
  const max = withEbm.length ? withEbm.reduce((a, b) => (b.points > a.points ? b : a)) : null;
  let uew = null;
  if (max) {
    const cat = Number(max.ebm.slice(-1));
    const g = cat >= 6 ? "31506" : cat === 5 ? "31505" : "31504";
    uew = { gop: g, points: EBM[g].points, euro: round2(EBM[g].points * ow), title: EBM[g].title };
  }
  return { rows, leading: max, uew };
}

/**
 * Wiederaufnahme-Prüfung nach § 2 FPV 2026 (vereinfacht)
 * @param {{drg1:string, drg2:string, tage:number, komplikation:boolean}} p tage = Kalendertage zwischen Aufnahme 1 und Aufnahme 2
 */
export function checkReadmission({ drg1, drg2, tage, komplikation }) {
  const a = DRGS[drg1], b = DRGS[drg2];
  const steps = [];
  if (!a || !b) return { merge: null, steps: ["Bitte beide DRGs wählen."] };
  if (a.wiederaufnahmeAusnahme || b.wiederaufnahmeAusnahme) {
    steps.push(`Mindestens eine DRG (${a.wiederaufnahmeAusnahme ? drg1 : drg2}) ist im Katalog von der Wiederaufnahmeregel ausgenommen.`);
    return { merge: false, steps };
  }
  const ogvd = a.ogvd; // erster Tag mit Zuschlag des ersten Aufenthalts
  const withinOgvd = ogvd ? tage < ogvd : tage <= 1;
  steps.push(`Wiederaufnahme nach ${tage} Kalendertagen; oGVD Fall 1 (${drg1}): erster Tag mit Zuschlag = ${ogvd ?? "–"} → ${withinOgvd ? "innerhalb" : "außerhalb"} der oGVD`);
  const sameBasis = drg1.slice(0, 3) === drg2.slice(0, 3);
  steps.push(`Basis-DRG: ${drg1.slice(0, 3)} / ${drg2.slice(0, 3)} → ${sameBasis ? "gleich" : "verschieden"}`);
  if (withinOgvd && sameBasis) {
    steps.push("§ 2 Abs. 1 FPV: innerhalb oGVD und gleiche Basis-DRG → Zusammenfassung");
    return { merge: true, steps };
  }
  const within30 = tage <= 30;
  const sameMdc = a.mdc === b.mdc;
  steps.push(`30-Kalendertage-Frist: ${within30 ? "eingehalten (≤ 30)" : "überschritten"}; MDC: ${a.mdc} / ${b.mdc} → ${sameMdc ? "gleich" : "verschieden"}; Partitionen: ${a.part} → ${b.part}`);
  if (within30 && sameMdc && (a.part === "M" || a.part === "A") && b.part === "O") {
    steps.push("§ 2 Abs. 2 FPV: innerhalb 30 Tagen, gleiche MDC, erst Partition M/A, dann O → Zusammenfassung");
    return { merge: true, steps };
  }
  if (withinOgvd && komplikation) {
    steps.push("§ 2 Abs. 3 FPV: Wiederaufnahme wegen Komplikation (in Verantwortung des Krankenhauses) innerhalb der oGVD → Zusammenfassung");
    return { merge: true, steps };
  }
  steps.push("Keine Voraussetzung erfüllt → zwei getrennte Fälle");
  return { merge: false, steps };
}

// Katalogdaten 2026 – Neuromodulation / minimalinvasive Schmerztherapie
// Alle Werte aus öffentlich zugänglichen Quellen (siehe SOURCES). Ohne Gewähr.

export const META = {
  year: 2026,
  bbfw: 4570.64,            // Bundesbasisfallwert 2026 (Vereinbarung vom 27.03.2026)
  pflegeentgeltwert: 250.0, // § 15 Abs. 2a KHEntgG (gilt ohne krankenhausindividuellen Wert)
  orientierungswert: 0.127404, // EBM-Orientierungswert 2026 in Euro je Punkt
  stand: "Oktober 2026",
};

// Landesbasisfallwerte 2026 (mit Ausgleichen), Quelle: vdek, Stand 28.05.2026
export const LBFW = [
  { id: "BUND", name: "Bundesbasisfallwert 2026", value: 4570.64 },
  { id: "BW", name: "Baden-Württemberg", value: 4576.64 },
  { id: "BY", name: "Bayern", value: 4562.26 },
  { id: "BE", name: "Berlin", value: 4576.10 },
  { id: "BB", name: "Brandenburg", value: 4563.87 },
  { id: "HB", name: "Bremen", value: 4577.83 },
  { id: "HH", name: "Hamburg", value: 4563.89 },
  { id: "HE", name: "Hessen", value: 4563.60 },
  { id: "MV", name: "Mecklenburg-Vorpommern", value: 4570.65 },
  { id: "NI", name: "Niedersachsen", value: 4563.13 },
  { id: "NW", name: "Nordrhein-Westfalen", value: 4561.87 },
  { id: "RP", name: "Rheinland-Pfalz", value: 4680.62 },
  { id: "SL", name: "Saarland", value: 4599.55 },
  { id: "SN", name: "Sachsen", value: 4560.10 },
  { id: "ST", name: "Sachsen-Anhalt", value: 4562.06 },
  { id: "SH", name: "Schleswig-Holstein", value: 4561.00 },
  { id: "TH", name: "Thüringen", value: 4561.65 },
];

// aG-DRG-Katalog 2026, Teil a (Hauptabteilung) – Auszug
// ugvd = erster Tag mit Abschlag, ogvd = erster Tag mit Zuschlag (jeweils Belegungstage)
// *BR = Bewertungsrelation pro Tag; pflege = Pflegeerlös-Bewertungsrelation pro Tag
export const DRGS = {
  B19A: { mdc: "01", part: "O", rg: 1.448, mvd: 2.8, ugvd: 1, ugvdBR: 0.076, ogvd: 6, ogvdBR: 0.080, verlBR: 0.084, pflege: 0.9215,
    title: "Implantation, Revision und Entfernung von Neurostimulatoren und Neurostimulationselektroden bei Krankheiten und Störungen des Nervensystems mit Implantation oder Wechsel eines Neurostimulators" },
  B19B: { mdc: "01", part: "O", rg: 1.527, mvd: 2.6, ugvd: 1, ugvdBR: 0.276, ogvd: 6, ogvdBR: 0.076, verlBR: 0.079, pflege: 0.7897,
    title: "Implantation, Revision und Entfernung von Neurostimulatoren und Neurostimulationselektroden bei Krankheiten und Störungen des Nervensystems mit Implantation oder Wechsel eines permanenten oder temporären Elektrodensystems" },
  B19C: { mdc: "01", part: "O", rg: 0.745, mvd: 2.7, ugvd: 1, ugvdBR: 0.231, ogvd: 6, ogvdBR: 0.072, verlBR: 0.075, pflege: 0.7605,
    title: "Implantation, Revision und Entfernung von Neurostimulatoren und Neurostimulationselektroden bei Krankheiten und Störungen des Nervensystems ohne Implantation oder Wechsel von Neurostimulatoren und Elektrodensystemen" },
  B20B: { mdc: "01", part: "O", rg: 2.569, mvd: 8.6, ugvd: 2, ugvdBR: 0.429, ogvd: 18, ogvdBR: 0.181, verlBR: null, pflege: 1.1914,
    title: "Kraniotomie oder große Wirbelsäulen-Operation mit komplexer Prozedur, Alter > 17 Jahre oder ohne bestimmte komplexe Prozedur, mit komplizierenden Faktoren, Alter > 15 Jahre" },
  B20D: { mdc: "01", part: "O", rg: 1.784, mvd: 6.5, ugvd: 1, ugvdBR: 0.600, ogvd: 16, ogvdBR: 0.157, verlBR: null, pflege: 1.1835,
    title: "Kraniotomie oder große Wirbelsäulen-Operation mit komplexer Prozedur oder ohne komplexe Prozedur, Alter > 2 Jahre, mit komplexer Diagnose oder bestimmtem Eingriff bei Trigeminusneuralgie oder mit bestimmter Prozedur oder bei bösartiger Neubildung" },
  B20E: { mdc: "01", part: "O", rg: 1.438, mvd: 6.7, ugvd: 1, ugvdBR: 0.412, ogvd: 16, ogvdBR: 0.137, verlBR: null, pflege: 1.1047,
    title: "Kraniotomie oder große Wirbelsäulen-Operation ohne komplexe Prozedur, Alter > 2 Jahre, ohne komplexe Diagnose, ohne bestimmten Eingriff bei Trigeminusneuralgie, ohne bestimmte Prozedur, außer bei bösartiger Neubildung" },
  B21A: { mdc: "01", part: "O", rg: 6.811, mvd: 9.4, ugvd: 2, ugvdBR: 0.328, ogvd: 16, ogvdBR: 0.105, verlBR: 0.095, pflege: 0.8389,
    title: "Implantation eines Neurostimulators zur Hirnstimulation, Mehrelektrodensystem, mit Sondenimplantation" },
  B21B: { mdc: "01", part: "O", rg: 3.533, mvd: 3.0, ugvd: 1, ugvdBR: 0.148, ogvd: 7, ogvdBR: 0.096, verlBR: 0.072, pflege: 1.0627,
    title: "Implantation eines Neurostimulators zur Hirnstimulation, Mehrelektrodensystem, ohne Sondenimplantation" },
  F21C: { mdc: "05", part: "O", rg: 1.988, mvd: 16.8, ugvd: 5, ugvdBR: 0.228, ogvd: 33, ogvdBR: 0.057, verlBR: 0.077, pflege: 0.7579,
    title: "Andere OR-Prozeduren bei Kreislauferkrankungen ohne komplexen Eingriff, mit mäßig komplexem Eingriff oder anderer komplizierender Konstellation oder IntK > 196 / 184 / 368 Punkte" },
  F21E: { mdc: "05", part: "O", rg: 0.912, mvd: 9.3, ugvd: 2, ugvdBR: 0.257, ogvd: 19, ogvdBR: 0.058, verlBR: 0.075, pflege: 0.7561,
    title: "Andere OR-Prozeduren bei Kreislauferkrankungen ohne komplexen Eingriff, ohne komplizierende Konstellationen, ohne IntK > 196 / 184 / 368 Punkte, ohne mäßig komplexen Eingriff, ohne bestimmten anderen Eingriff" },
  I19A: { mdc: "08", part: "O", rg: 1.210, mvd: 2.9, ugvd: 1, ugvdBR: 0.074, ogvd: 6, ogvdBR: 0.079, verlBR: 0.084, pflege: 0.9561,
    title: "Implantation und Wechsel von Neurostimulatoren und Neurostimulationselektroden bei Krankheiten und Störungen an Muskel-Skelett-System und Bindegewebe ohne Implantation oder Wechsel eines permanenten Elektrodensystems" },
  I19B: { mdc: "08", part: "O", rg: 1.577, mvd: 2.9, ugvd: 1, ugvdBR: 0.123, ogvd: 7, ogvdBR: 0.080, verlBR: 0.085, pflege: 0.8208,
    title: "Implantation und Wechsel von Neurostimulatoren und Neurostimulationselektroden bei Krankheiten und Störungen an Muskel-Skelett-System und Bindegewebe mit Implantation oder Wechsel eines permanenten Elektrodensystems" },
  I10F: { mdc: "08", part: "O", rg: 0.938, mvd: 4.3, ugvd: 1, ugvdBR: 0.347, ogvd: 9, ogvdBR: 0.066, verlBR: 0.077, pflege: 0.6985,
    title: "Andere Eingriffe an der Wirbelsäule ohne mäßig komplexen Eingriff an der Wirbelsäule mit bestimmtem kleinen Eingriff und mehr als ein Belegungstag" },
  I10G: { mdc: "08", part: "O", rg: 0.754, mvd: 4.7, ugvd: 1, ugvdBR: 0.225, ogvd: 12, ogvdBR: 0.071, verlBR: 0.084, pflege: 0.7047,
    title: "Andere Eingriffe an der Wirbelsäule ohne mäßig komplexen Eingriff an der Wirbelsäule, ohne bestimmten kleinen Eingriff, ohne wenig komplexen Eingriff oder ein Belegungstag, mit anderem kleinen Eingriff" },
  I10H: { mdc: "08", part: "O", rg: 0.578, mvd: 2.6, ugvd: 1, ugvdBR: 0.123, ogvd: 6, ogvdBR: 0.075, verlBR: 0.077, pflege: 0.8587,
    title: "Andere Eingriffe an der Wirbelsäule ohne mäßig komplexen Eingriff, ohne bestimmten kleinen Eingriff, ohne anderen kleinen Eingriff" },
  I24B: { mdc: "08", part: "O", rg: 0.503, mvd: 2.3, ugvd: 1, ugvdBR: 0.053, ogvd: 5, ogvdBR: 0.081, verlBR: 0.081, pflege: 1.0664,
    title: "Arthroskopie oder andere Eingriffe an den Extremitäten oder Eingriffe am Weichteilgewebe ohne komplexen Eingriff, Alter > 17 Jahre" },
  I68E: { mdc: "08", part: "M", rg: 0.445, mvd: 4.1, ugvd: 1, ugvdBR: 0.218, ogvd: 10, ogvdBR: 0.071, verlBR: 0.082, pflege: 0.6663,
    title: "Nicht operativ behandelte Erkrankungen und Verletzungen im Wirbelsäulenbereich, mehr als ein Belegungstag oder andere Femurfraktur" },
  I68F: { mdc: "08", part: "M", rg: 0.231, mvd: 1.0, ugvd: null, ugvdBR: null, ogvd: null, ogvdBR: null, verlBR: null, pflege: 1.1327,
    title: "Nicht operativ behandelte Erkrankungen und Verletzungen im Wirbelsäulenbereich, ein Belegungstag oder Prellung am Oberschenkel" },
  I23B: { mdc: "08", part: "O", rg: 0.768, mvd: 2.8, ugvd: 1, ugvdBR: 0.188, ogvd: 6, ogvdBR: 0.076, verlBR: 0.080, pflege: 0.9969,
    title: "Andere kleine Eingriffe an Knochen und Weichteilen mit bestimmten kleinen Eingriffen an Knochen und Weichteilen, Alter > 17 Jahre oder ohne äußerst schwere oder schwere CC" },
  B09Z: { mdc: "01", part: "O", rg: 0.977, mvd: 4.3, ugvd: 1, ugvdBR: 0.405, ogvd: 10, ogvdBR: 0.079, verlBR: 0.092, pflege: 0.9034,
    title: "Andere Eingriffe am Schädel" },
  "801E": { mdc: "24", part: "O", rg: 1.951, mvd: 15.1, ugvd: 4, ugvdBR: 0.286, ogvd: 29, ogvdBR: 0.066, verlBR: 0.089, pflege: 0.8656, wiederaufnahmeAusnahme: true,
    title: "Ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose ohne komplizierende Konstellation, ohne hochkomplexe, komplexe oder bestimmte OR-Prozedur" },
  "802C": { mdc: "24", part: "O", rg: 1.672, mvd: 9.2, ugvd: 2, ugvdBR: 0.301, ogvd: 23, ogvdBR: 0.069, verlBR: 0.089, pflege: 0.8951, wiederaufnahmeAusnahme: true,
    title: "Andere nicht ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose ohne mäßig komplexe OR-Prozedur" },
  "802D": { mdc: "24", part: "O", rg: 0.983, mvd: 6.4, ugvd: 1, ugvdBR: 0.546, ogvd: 17, ogvdBR: 0.067, verlBR: 0.083, pflege: 0.8844, wiederaufnahmeAusnahme: true,
    title: "Wenig komplexe nicht ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose" },
  "801C": { mdc: "24", part: "O", rg: 2.901, mvd: 19.1, ugvd: 5, ugvdBR: 0.329, ogvd: 36, ogvdBR: 0.072, verlBR: 0.098, pflege: 1.0098, wiederaufnahmeAusnahme: true,
    title: "Ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose mit komplexer OR-Prozedur" },
  "801D": { mdc: "24", part: "O", rg: 2.512, mvd: 17.2, ugvd: 5, ugvdBR: 0.294, ogvd: 32, ogvdBR: 0.072, verlBR: 0.097, pflege: 0.9600, wiederaufnahmeAusnahme: true,
    title: "Ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose mit bestimmter OR-Prozedur oder mit intensivmedizinischer Komplexbehandlung > 196 / 184 / 368 Aufwandspunkte oder bestimmte nicht ausgedehnte OR-Prozedur mit neurologischer Komplexbehandlung des akuten Schlaganfalls" },
};

// Zusatzentgelte (Mehrkanalstimulatoren)
export const ZE = {
  ZE138: { amount: 7726.60, title: "Neurostimulatoren zur Rückenmarkstimulation oder zur Stimulation des peripheren Nervensystems, Einkanalstimulator, mit Sondenimplantation" },
  ZE139: { amount: 5667.63, title: "Neurostimulatoren zur Rückenmarkstimulation oder zur Stimulation des peripheren Nervensystems, Einkanalstimulator, ohne Sondenimplantation" },
  ZE140: { amount: 12842.81, title: "Neurostimulatoren zur Rückenmarkstimulation oder zur Stimulation des peripheren Nervensystems, Mehrkanalstimulator, nicht wiederaufladbar, mit Sondenimplantation" },
  ZE141: { amount: 10396.50, title: "Neurostimulatoren zur Rückenmarkstimulation oder zur Stimulation des peripheren Nervensystems, Mehrkanalstimulator, nicht wiederaufladbar, ohne Sondenimplantation" },
  "ZE2026-61": { amount: null, title: "Neurostimulatoren zur Hirn- oder Rückenmarkstimulation oder zur Stimulation des peripheren Nervensystems, Mehrkanalstimulator, wiederaufladbar (krankenhausindividuell nach § 6 Abs. 1 KHEntgG)" },
};

// EBM-Gebührenordnungspositionen (Punkte)
export const EBM = {
  "31251": { points: 1512, title: "Zentraler neurochirurgischer Eingriff der Kategorie P1" },
  "31252": { points: 2057, title: "Zentraler neurochirurgischer Eingriff der Kategorie P2" },
  "31253": { points: 2754, title: "Zentraler neurochirurgischer Eingriff der Kategorie P3" },
  "31254": { points: 3583, title: "Zentraler neurochirurgischer Eingriff der Kategorie P4" },
  "31255": { points: 4963, title: "Zentraler neurochirurgischer Eingriff der Kategorie P5" },
  "31256": { points: 6645, title: "Zentraler neurochirurgischer Eingriff der Kategorie P6" },
  "31504": { points: 694, title: "Postoperative Überwachung 4" },
  "31505": { points: 977, title: "Postoperative Überwachung 5" },
  "31506": { points: 1388, title: "Postoperative Überwachung 6" },
  "34503": { points: 667, title: "Bildwandlergestützte Intervention(en) an der Wirbelsäule" },
  "30700": { points: 394, title: "Grundpauschale schmerztherapeutischer Patient (QS-Vereinbarung Schmerztherapie)" },
  "30702": { points: 498, title: "Zusatzpauschale schmerztherapeutische Versorgung (QS-Vereinbarung Schmerztherapie)" },
  "16220": { points: 154, title: "Neurologisches Gespräch, Beratung, Erörterung, Abklärung, je vollendete 10 Minuten" },
};

// ---------------------------------------------------------------------------
// ICD-10-GM 2026 – Auswahl typischer Hauptdiagnosen
// mdc: "01" Nervensystem, "08" Muskel-Skelett, "05" Kreislauf, "801" = OR-Prozedur ohne Bezug zur HD
// ---------------------------------------------------------------------------
const ruecken5 = [
  ["0", "Mehrere Lokalisationen der Wirbelsäule"], ["1", "Okzipito-Atlanto-Axialbereich"], ["2", "Zervikalbereich"],
  ["3", "Zervikothorakalbereich"], ["4", "Thorakalbereich"], ["5", "Thorakolumbalbereich"], ["6", "Lumbalbereich"],
  ["7", "Lumbosakralbereich"], ["8", "Sakral- und Sakrokokzygealbereich"], ["9", "Nicht näher bezeichnete Lokalisation"],
];
const extrem5 = [
  ["0", "Mehrere Lokalisationen"], ["1", "Schulterregion"], ["2", "Oberarm"], ["3", "Unterarm"], ["4", "Hand"],
  ["5", "Beckenregion und Oberschenkel"], ["6", "Unterschenkel"], ["7", "Knöchel und Fuß"], ["8", "Sonstige"], ["9", "Nicht näher bezeichnete Lokalisation"],
];

const icd = [];
const add = (code, text, group, mdc) => icd.push({ code, text, group, mdc });

// Rücken / Bein (SCS, DRG-Stim, RFA)
add("M96.1", "Postlaminektomie-Syndrom, anderenorts nicht klassifiziert (FBSS)", "Rücken-/Beinschmerz", "08");
for (const [d, t] of ruecken5) add(`M54.0${d}`, `Pannikulitis in der Nacken- und Rückenregion: ${t}`, "Rücken-/Beinschmerz", Number(d) <= 2 ? "801" : "08");
for (const [d, t] of ruecken5) add(`M54.1${d}`, `Radikulopathie: ${t}`, "Rücken-/Beinschmerz", "08");
add("M54.2", "Zervikalneuralgie", "Rücken-/Beinschmerz", "08");
add("M54.3", "Ischialgie", "Rücken-/Beinschmerz", "08");
add("M54.4", "Lumboischialgie", "Rücken-/Beinschmerz", "08");
add("M54.5", "Kreuzschmerz", "Rücken-/Beinschmerz", "08");
add("M54.6", "Schmerzen im Bereich der Brustwirbelsäule", "Rücken-/Beinschmerz", "08");
for (const [d, t] of ruecken5) add(`M54.8${d}`, `Sonstige Rückenschmerzen: ${t}`, "Rücken-/Beinschmerz", "08");
for (const [d, t] of ruecken5) add(`M54.9${d}`, `Rückenschmerzen, nicht näher bezeichnet: ${t}`, "Rücken-/Beinschmerz", "08");
add("M53.0", "Zervikozephales Syndrom", "Rücken-/Beinschmerz", "08");

// Neuralgien / Extremitätenschmerz
for (const [d, t] of extrem5) add(`M79.2${d}`, `Neuralgie und Neuritis, nicht näher bezeichnet: ${t}`, "Neuralgie / Extremitätenschmerz", d === "5" ? "08" : "01");
add("M79.65", "Schmerzen in den Extremitäten: Beckenregion und Oberschenkel (z. B. Leiste)", "Neuralgie / Extremitätenschmerz", "08");
add("M79.66", "Schmerzen in den Extremitäten: Unterschenkel (z. B. Knie)", "Neuralgie / Extremitätenschmerz", "08");
add("M79.67", "Schmerzen in den Extremitäten: Knöchel und Fuß", "Neuralgie / Extremitätenschmerz", "08");

// Polyneuropathien
add("G62.0", "Arzneimittelinduzierte Polyneuropathie", "Polyneuropathie", "01");
add("G62.1", "Alkohol-Polyneuropathie", "Polyneuropathie", "01");
add("G62.2", "Polyneuropathie durch sonstige toxische Agenzien", "Polyneuropathie", "01");
add("G62.80", "Critical-illness-Polyneuropathie", "Polyneuropathie", "01");

// CRPS / Phantomschmerz
add("G90.50", "Komplexes regionales Schmerzsyndrom der oberen Extremität, Typ I", "CRPS / Phantomschmerz", "01");
add("G90.51", "Komplexes regionales Schmerzsyndrom der unteren Extremität, Typ I", "CRPS / Phantomschmerz", "01");
add("G90.59", "Komplexes regionales Schmerzsyndrom, Typ I, Lokalisation nicht näher bezeichnet", "CRPS / Phantomschmerz", "01");
add("G90.60", "Komplexes regionales Schmerzsyndrom der oberen Extremität, Typ II", "CRPS / Phantomschmerz", "01");
add("G90.61", "Komplexes regionales Schmerzsyndrom der unteren Extremität, Typ II", "CRPS / Phantomschmerz", "01");
add("G90.69", "Komplexes regionales Schmerzsyndrom, Typ II, Lokalisation nicht näher bezeichnet", "CRPS / Phantomschmerz", "01");
add("G54.6", "Phantomschmerz", "CRPS / Phantomschmerz", "01");

// PAVK / Angina pectoris
add("I70.22", "Atherosklerose der Extremitätenarterien: Becken-Bein-Typ, mit belastungsinduziertem Ischämieschmerz, Gehstrecke < 200 m", "PAVK / Angina pectoris", "05");
add("I70.23", "Atherosklerose der Extremitätenarterien: Becken-Bein-Typ, mit Ruheschmerz", "PAVK / Angina pectoris", "05");
add("I70.24", "Atherosklerose der Extremitätenarterien: Becken-Bein-Typ, mit Ulzeration", "PAVK / Angina pectoris", "05");
add("I70.25", "Atherosklerose der Extremitätenarterien: Becken-Bein-Typ, mit Gangrän", "PAVK / Angina pectoris", "05");
add("I70.26", "Atherosklerose der Extremitätenarterien: Schulter-Arm-Typ, alle Stadien", "PAVK / Angina pectoris", "05");
add("I73.9", "Periphere Gefäßkrankheit, nicht näher bezeichnet", "PAVK / Angina pectoris", "05");
add("I20.1", "Angina pectoris mit nachgewiesenem Koronarspasmus", "PAVK / Angina pectoris", "05");
add("I20.8", "Sonstige Formen der Angina pectoris", "PAVK / Angina pectoris", "05");
add("I20.9", "Angina pectoris, nicht näher bezeichnet", "PAVK / Angina pectoris", "05");

// Bewegungsstörungen (THS)
add("G20.00", "Primäres Parkinson-Syndrom mit fehlender oder geringer Beeinträchtigung: Ohne Wirkungsfluktuation", "Bewegungsstörungen (THS)", "01");
add("G20.01", "Primäres Parkinson-Syndrom mit fehlender oder geringer Beeinträchtigung: Mit Wirkungsfluktuation", "Bewegungsstörungen (THS)", "01");
add("G20.10", "Primäres Parkinson-Syndrom mit mäßiger bis schwerer Beeinträchtigung: Ohne Wirkungsfluktuation", "Bewegungsstörungen (THS)", "01");
add("G20.11", "Primäres Parkinson-Syndrom mit mäßiger bis schwerer Beeinträchtigung: Mit Wirkungsfluktuation", "Bewegungsstörungen (THS)", "01");
add("G20.20", "Primäres Parkinson-Syndrom mit schwerster Beeinträchtigung: Ohne Wirkungsfluktuation", "Bewegungsstörungen (THS)", "01");
add("G20.21", "Primäres Parkinson-Syndrom mit schwerster Beeinträchtigung: Mit Wirkungsfluktuation", "Bewegungsstörungen (THS)", "01");
add("G20.90", "Primäres Parkinson-Syndrom, nicht näher bezeichnet: Ohne Wirkungsfluktuation", "Bewegungsstörungen (THS)", "01");
add("G20.91", "Primäres Parkinson-Syndrom, nicht näher bezeichnet: Mit Wirkungsfluktuation", "Bewegungsstörungen (THS)", "01");
add("G24.0", "Arzneimittelinduzierte Dystonie", "Bewegungsstörungen (THS)", "01");
add("G24.1", "Idiopathische familiäre Dystonie", "Bewegungsstörungen (THS)", "01");
add("G24.2", "Idiopathische nichtfamiliäre Dystonie", "Bewegungsstörungen (THS)", "01");
add("G24.3", "Torticollis spasticus", "Bewegungsstörungen (THS)", "01");
add("G24.4", "Idiopathische orofaziale Dystonie", "Bewegungsstörungen (THS)", "01");
add("G24.5", "Blepharospasmus", "Bewegungsstörungen (THS)", "01");
add("G24.8", "Sonstige Dystonie", "Bewegungsstörungen (THS)", "01");
add("G24.9", "Dystonie, nicht näher bezeichnet", "Bewegungsstörungen (THS)", "01");
add("G25.0", "Essentieller Tremor", "Bewegungsstörungen (THS)", "01");
add("G25.1", "Arzneimittelinduzierter Tremor", "Bewegungsstörungen (THS)", "01");
add("G25.2", "Sonstige näher bezeichnete Tremorformen", "Bewegungsstörungen (THS)", "01");
add("G25.3", "Myoklonus", "Bewegungsstörungen (THS)", "01");
add("G25.4", "Arzneimittelinduzierte Chorea", "Bewegungsstörungen (THS)", "01");
add("G25.5", "Sonstige Chorea", "Bewegungsstörungen (THS)", "01");
add("G25.6", "Arzneimittelinduzierte Tics und sonstige Tics organischen Ursprungs", "Bewegungsstörungen (THS)", "01");
add("G25.80", "Periodische Beinbewegungen im Schlaf", "Bewegungsstörungen (THS)", "01");
add("G25.81", "Syndrom der unruhigen Beine [Restless-Legs-Syndrom]", "Bewegungsstörungen (THS)", "01");
add("G25.88", "Sonstige näher bezeichnete extrapyramidale Krankheiten und Bewegungsstörungen", "Bewegungsstörungen (THS)", "01");
add("G25.9", "Extrapyramidale Krankheit oder Bewegungsstörung, nicht näher bezeichnet", "Bewegungsstörungen (THS)", "01");

// Komplikation (Revisionen)
add("T85.1", "Mechanische Komplikation durch einen implantierten elektronischen Stimulator des Nervensystems", "Komplikation / Revision", "01");

// Weitere (Radiofrequenzablation)
add("G50.0", "Trigeminusneuralgie", "Weitere (RFA)", "01");
add("G56.9", "Mononeuropathie der oberen Extremität, nicht näher bezeichnet", "Weitere (RFA)", "01");
add("G57.6", "Läsion des N. plantaris (Morton-Neuralgie)", "Weitere (RFA)", "01");
add("G57.8", "Sonstige Mononeuropathien der unteren Extremität", "Weitere (RFA)", "01");
add("G57.9", "Mononeuropathie der unteren Extremität, nicht näher bezeichnet", "Weitere (RFA)", "01");
add("M18.1", "Sonstige primäre Rhizarthrose", "Weitere (RFA)", "08");
add("M20.2", "Hallux rigidus", "Weitere (RFA)", "08");

export const ICD = icd;

// ---------------------------------------------------------------------------
// OPS 2026 – Auswahl
// fam: Prozedurfamilie für die Gruppierungslogik
// aop: im AOP-Katalog (§ 115b SGB V) enthalten; ebm: OP-GOP laut Anhang 2 EBM
// ---------------------------------------------------------------------------
const ops = [];
const o = (code, text, group, fam, extra = {}) => ops.push({ code, text, group, fam, ...extra });

// SCS – Elektroden (Kategorie/EBM/§115b laut KBV Anhang 2 zum EBM, Stand 01.07.2026)
o("5-039.32", "Implantation einer temporären Elektrode zur epiduralen Teststimulation", "SCS – Elektroden", "leadTemp", { aop: true, ebm: "31255" });
o("5-039.33", "Implantation mehrerer temporärer Elektroden zur epiduralen Teststimulation", "SCS – Elektroden", "leadTemp", { aop: true, ebm: "31256" });
o("5-039.34", "Implantation oder Wechsel einer permanenten Elektrode zur epiduralen Dauerstimulation, perkutan", "SCS – Elektroden", "leadPerm", { aop: true, ebm: "31255" });
o("5-039.35", "Implantation oder Wechsel mehrerer permanenter Elektroden zur epiduralen Dauerstimulation, perkutan", "SCS – Elektroden", "leadPerm", { aop: true, ebm: "31256" });
o("5-039.36", "Implantation oder Wechsel einer permanenten Elektrode (Plattenelektrode) zur epiduralen Dauerstimulation, offen chirurgisch", "SCS – Elektroden", "leadPerm", { ebm: "31255" });
o("5-039.37", "Implantation oder Wechsel mehrerer permanenter Elektroden (Plattenelektrode) zur epiduralen Dauerstimulation, offen chirurgisch", "SCS – Elektroden", "leadPerm", { ebm: "31256" });
o("5-039.39", "Implantation oder Wechsel einer permanenten Elektrode zur epiduralen Dauerstimulation mit extrakorporalem Neurostimulator", "SCS – Elektroden", "other", { aop: true, ebm: "31255", ambulantOnly: true });
// SCS – Neurostimulator
o("5-039.e1", "Implantation oder Wechsel eines Neurostimulators zur epiduralen Rückenmarkstimulation mit Implantation oder Wechsel einer Neurostimulationselektrode: Mehrkanalstimulator, vollimplantierbar, nicht wiederaufladbar", "SCS – Neurostimulator", "stimWithLead", { aop: true, ebm: "31256", ze: "ZE140" });
o("5-039.e2", "Implantation oder Wechsel eines Neurostimulators zur epiduralen Rückenmarkstimulation mit Implantation oder Wechsel einer Neurostimulationselektrode: Mehrkanalstimulator, vollimplantierbar, mit wiederaufladbarem Akkumulator", "SCS – Neurostimulator", "stimWithLead", { aop: true, ebm: "31256", ze: "ZE2026-61" });
o("5-039.e0", "Implantation oder Wechsel eines Neurostimulators zur epiduralen Rückenmarkstimulation mit Implantation oder Wechsel einer Neurostimulationselektrode: Einkanalstimulator, vollimplantierbar, nicht wiederaufladbar", "SCS – Neurostimulator", "stimWithLead", { aop: true, ebm: "31255", ze: "ZE138" });
o("5-039.n1", "Implantation eines Neurostimulators zur epiduralen Rückenmarkstimulation ohne Implantation einer Neurostimulationselektrode: Mehrkanalstimulator, vollimplantierbar, nicht wiederaufladbar", "SCS – Neurostimulator", "stimNoLead", { aop: true, ebm: "31252", ze: "ZE141" });
o("5-039.n2", "Implantation eines Neurostimulators zur epiduralen Rückenmarkstimulation ohne Implantation einer Neurostimulationselektrode: Mehrkanalstimulator, vollimplantierbar, mit wiederaufladbarem Akkumulator", "SCS – Neurostimulator", "stimNoLead", { aop: true, ebm: "31252", ze: "ZE2026-61" });
o("5-039.n0", "Implantation eines Neurostimulators zur epiduralen Rückenmarkstimulation ohne Implantation einer Neurostimulationselektrode: Einkanalstimulator, vollimplantierbar, nicht wiederaufladbar", "SCS – Neurostimulator", "stimNoLead", { aop: true, ebm: "31252", ze: "ZE139" });
o("5-039.f1", "Wechsel eines Neurostimulators zur epiduralen Rückenmarkstimulation ohne Wechsel einer Neurostimulationselektrode: Mehrkanalstimulator, vollimplantierbar, nicht wiederaufladbar", "SCS – Neurostimulator", "stimNoLead", { aop: true, ebm: "31252", ze: "ZE141" });
o("5-039.f2", "Wechsel eines Neurostimulators zur epiduralen Rückenmarkstimulation ohne Wechsel einer Neurostimulationselektrode: Mehrkanalstimulator, vollimplantierbar, mit wiederaufladbarem Akkumulator", "SCS – Neurostimulator", "stimNoLead", { aop: true, ebm: "31252", ze: "ZE2026-61" });
o("5-039.f0", "Wechsel eines Neurostimulators zur epiduralen Rückenmarkstimulation ohne Wechsel einer Neurostimulationselektrode: Einkanalstimulator, vollimplantierbar, nicht wiederaufladbar", "SCS – Neurostimulator", "stimNoLead", { aop: true, ebm: "31252", ze: "ZE139" });
// SCS – Revision / Entfernung
o("5-039.b", "Revision von Neurostimulatoren zur epiduralen Rückenmarkstimulation oder zur Vorderwurzelstimulation", "Revision / Entfernung (spinal)", "revStim", { ebm: "31254" });
o("5-039.c0", "Revision von Elektroden: Eine epidurale Stabelektrode", "Revision / Entfernung (spinal)", "revLead", { ebm: "31253" });
o("5-039.c1", "Revision von Elektroden: Mehrere epidurale Stabelektroden", "Revision / Entfernung (spinal)", "revLead", { ebm: "31254" });
o("5-039.c2", "Revision von Elektroden: Eine epidurale Plattenelektrode", "Revision / Entfernung (spinal)", "revLead", { ebm: "31253" });
o("5-039.c3", "Revision von Elektroden: Mehrere epidurale Plattenelektroden", "Revision / Entfernung (spinal)", "revLead", { ebm: "31254" });
o("5-039.a2", "Entfernung von Elektroden: Eine epidurale Stabelektrode", "Revision / Entfernung (spinal)", "removal", { aop: true, ebm: "31251", rm: "stab" });
o("5-039.a3", "Entfernung von Elektroden: Mehrere epidurale Stabelektroden", "Revision / Entfernung (spinal)", "removal", { aop: true, ebm: "31252", rm: "stabMulti" });
o("5-039.a4", "Entfernung von Elektroden: Eine epidurale Plattenelektrode", "Revision / Entfernung (spinal)", "removal", { ebm: "31251", rm: "platte" });
o("5-039.a5", "Entfernung von Elektroden: Mehrere epidurale Plattenelektroden", "Revision / Entfernung (spinal)", "removal", { aop: true, ebm: "31252", rm: "platteMulti" });
o("5-039.d", "Entfernung von Neurostimulatoren zur epiduralen Rückenmarkstimulation oder zur Vorderwurzelstimulation", "Revision / Entfernung (spinal)", "removal", { aop: true, ebm: "31254", rm: "ipg" });
o("5-039.p", "Implantation eines Neurostimulators zur Vorderwurzelstimulation ohne Implantation einer subduralen Elektrode", "Revision / Entfernung (spinal)", "other", { aop: true, ebm: "31252", ambulantOnly: true });
// DRG-Stimulation (Spinalganglien)
o("5-039.j0", "Implantation oder Wechsel von Neurostimulationselektroden zur Stimulation von Spinalganglien: Eine Elektrode zur Ganglienstimulation", "Spinalganglien-Stimulation (DRG)", "leadPerm", { ebm: "31252" });
o("5-039.j1", "Implantation oder Wechsel von Neurostimulationselektroden zur Stimulation von Spinalganglien: Mehrere Elektroden zur Ganglienstimulation", "Spinalganglien-Stimulation (DRG)", "leadPerm", { ebm: "31253" });
o("5-039.k1", "Implantation oder Wechsel eines Neurostimulators zur Stimulation von Spinalganglien mit Implantation oder Wechsel einer Neurostimulationselektrode: Mehrkanalstimulator, vollimplantierbar, nicht wiederaufladbar", "Spinalganglien-Stimulation (DRG)", "stimWithLead", { ebm: "31251", ze: "ZE140" });
o("5-039.k0", "Implantation oder Wechsel eines Neurostimulators zur Stimulation von Spinalganglien mit Implantation oder Wechsel einer Neurostimulationselektrode: Einkanalstimulator, vollimplantierbar, nicht wiederaufladbar", "Spinalganglien-Stimulation (DRG)", "stimWithLead", { ebm: "31251", ze: "ZE138" });
o("5-039.q1", "Implantation eines Neurostimulators zur Stimulation von Spinalganglien ohne Implantation einer Neurostimulationselektrode: Mehrkanalstimulator, vollimplantierbar, nicht wiederaufladbar", "Spinalganglien-Stimulation (DRG)", "stimNoLead", { aop: true, ebm: "31252", ze: "ZE141" });
o("5-039.q0", "Implantation eines Neurostimulators zur Stimulation von Spinalganglien ohne Implantation einer Neurostimulationselektrode: Einkanalstimulator, vollimplantierbar, nicht wiederaufladbar", "Spinalganglien-Stimulation (DRG)", "stimNoLead", { aop: true, ebm: "31252", ze: "ZE139" });
o("5-039.m1", "Wechsel eines Neurostimulators zur Stimulation von Spinalganglien ohne Wechsel einer Neurostimulationselektrode: Mehrkanalstimulator, vollimplantierbar, nicht wiederaufladbar", "Spinalganglien-Stimulation (DRG)", "stimNoLead", { aop: true, ebm: "31251", ze: "ZE141" });
o("5-039.m0", "Wechsel eines Neurostimulators zur Stimulation von Spinalganglien ohne Wechsel einer Neurostimulationselektrode: Einkanalstimulator, vollimplantierbar, nicht wiederaufladbar", "Spinalganglien-Stimulation (DRG)", "stimNoLead", { aop: true, ebm: "31251", ze: "ZE139" });
o("5-039.c6", "Revision von Elektroden: Spinalganglion, eine Elektrode", "Spinalganglien-Stimulation (DRG)", "revLead", { ebm: "31252" });
o("5-039.c7", "Revision von Elektroden: Spinalganglion, mehrere Elektroden", "Spinalganglien-Stimulation (DRG)", "revLead", { ebm: "31253" });
o("5-039.a8", "Entfernung von Elektroden: Eine Elektrode zur Spinalganglienstimulation", "Spinalganglien-Stimulation (DRG)", "removal", { ebm: "31251", rm: "drg" });
o("5-039.a9", "Entfernung von Elektroden: Mehrere Elektroden zur Spinalganglienstimulation", "Spinalganglien-Stimulation (DRG)", "removal", { ebm: "31251", rm: "drg" });
o("5-039.r", "Entfernung eines Neurostimulators zur Spinalganglienstimulation", "Spinalganglien-Stimulation (DRG)", "removal", { ebm: "31251", rm: "drg" });
// Tiefe Hirnstimulation
o("5-029.f", "Implantation von Knochenankern zur Vorbereitung auf die stereotaktische Einführung von Stimulationselektroden", "Tiefe Hirnstimulation (THS)", "thsAnchor");
o("5-029.g", "Entfernung von Knochenankern", "Tiefe Hirnstimulation (THS)", "thsRemoveLead");
o("5-014.92", "Implantation oder Wechsel von intrazerebralen Elektroden: Implantation oder Wechsel einer permanenten Elektrode zur Dauerstimulation", "Tiefe Hirnstimulation (THS)", "thsLead");
o("5-014.93", "Implantation oder Wechsel von intrazerebralen Elektroden: Implantation oder Wechsel mehrerer permanenter Elektroden zur Dauerstimulation", "Tiefe Hirnstimulation (THS)", "thsLead");
o("5-014.b0", "Revision von intrazerebralen Elektroden: Eine permanente Elektrode zur Dauerstimulation", "Tiefe Hirnstimulation (THS)", "thsRevLead");
o("5-014.b1", "Revision von intrazerebralen Elektroden: Mehrere permanente Elektroden zur Dauerstimulation", "Tiefe Hirnstimulation (THS)", "thsRevLead");
o("5-028.91", "Implantation oder Wechsel eines Neurostimulators zur Hirnstimulation mit Implantation oder Wechsel einer Neurostimulationselektrode: Mehrkanalstimulator, vollimplantierbar, nicht wiederaufladbar", "Tiefe Hirnstimulation (THS)", "thsStimWithLead");
o("5-028.92", "Implantation oder Wechsel eines Neurostimulators zur Hirnstimulation mit Implantation oder Wechsel einer Neurostimulationselektrode: Mehrkanalstimulator, vollimplantierbar, mit wiederaufladbarem Akkumulator", "Tiefe Hirnstimulation (THS)", "thsStimWithLead", { ze: "ZE2026-61" });
o("5-028.a1", "Wechsel eines Neurostimulators zur Hirnstimulation ohne Wechsel einer Neurostimulationselektrode: Mehrkanalstimulator, vollimplantierbar, nicht wiederaufladbar", "Tiefe Hirnstimulation (THS)", "thsStimNoLead");
o("5-028.a2", "Wechsel eines Neurostimulators zur Hirnstimulation ohne Wechsel einer Neurostimulationselektrode: Mehrkanalstimulator, vollimplantierbar, mit wiederaufladbarem Akkumulator", "Tiefe Hirnstimulation (THS)", "thsStimNoLead", { ze: "ZE2026-61" });
o("5-028.c1", "Implantation eines Neurostimulators zur Hirnstimulation ohne Implantation einer Neurostimulationselektrode: Mehrkanalstimulator, vollimplantierbar, nicht wiederaufladbar", "Tiefe Hirnstimulation (THS)", "thsStimNoLead");
o("5-028.c2", "Implantation eines Neurostimulators zur Hirnstimulation ohne Implantation einer Neurostimulationselektrode: Mehrkanalstimulator, vollimplantierbar, mit wiederaufladbarem Akkumulator", "Tiefe Hirnstimulation (THS)", "thsStimNoLead", { ze: "ZE2026-61" });
o("5-028.3", "Revision eines Neurostimulators zur Hirnstimulation", "Tiefe Hirnstimulation (THS)", "thsRevStim");
o("5-028.5", "Revision einer permanenten Neurostimulationselektrode zur Dauerstimulation", "Tiefe Hirnstimulation (THS)", "thsRevLead");
o("5-028.6", "Entfernung eines Neurostimulators zur Hirnstimulation", "Tiefe Hirnstimulation (THS)", "thsRemoveStim", { ebm: "31251" });
o("5-028.7", "Entfernung einer Neurostimulationselektrode", "Tiefe Hirnstimulation (THS)", "thsRemoveLead");
// Nachkontrolle
o("8-631.0", "Nachprogrammierung eines implantierten Neurostimulators zur Hirnstimulation", "Nachkontrolle", "followup");
o("8-631.10", "Nachprogrammierung eines Neurostimulators zur Rückenmarkstimulation: Ohne pharmakologische Anpassung", "Nachkontrolle", "followup");
o("8-631.11", "Nachprogrammierung eines Neurostimulators zur Rückenmarkstimulation: Mit pharmakologischer Anpassung", "Nachkontrolle", "followup");
o("8-631.20", "Nachprogrammierung eines Neurostimulators zur peripheren Nervenstimulation: Ohne pharmakologische Anpassung", "Nachkontrolle", "followup");
o("8-631.21", "Nachprogrammierung eines Neurostimulators zur peripheren Nervenstimulation: Mit pharmakologischer Anpassung", "Nachkontrolle", "followup");
// Radiofrequenzablation / minimalinvasive Schmerztherapie
o("5-83a.00", "Facetten-Thermokoagulation oder Facetten-Kryodenervation: 1 Segment", "Radiofrequenzablation (RFA)", "rfaFacet");
o("5-83a.01", "Facetten-Thermokoagulation oder Facetten-Kryodenervation: 2 Segmente", "Radiofrequenzablation (RFA)", "rfaFacet");
o("5-83a.02", "Facetten-Thermokoagulation oder Facetten-Kryodenervation: 3 oder mehr Segmente", "Radiofrequenzablation (RFA)", "rfaFacet");
o("5-83a.2", "Thermokoagulation oder Kryodenervation des Iliosakralgelenkes", "Radiofrequenzablation (RFA)", "rfaFacet");
o("5-830.2", "Inzision von erkranktem Knochen- und Gelenkgewebe der Wirbelsäule: Facettendenervation (z. B. endoskopisch)", "Radiofrequenzablation (RFA)", "rfaEndo");
o("5-859.37", "Andere Operationen an Muskeln, Sehnen, Faszien und Schleimbeuteln: Perkutane Destruktion von Weichteilen durch Thermoablation, Leisten- und Genitalregion und Gesäß", "Radiofrequenzablation (RFA)", "rfaSoft");
// Zugänge (beeinflussen die Gruppierung hier nicht)
const seg = [["0", "1 Segment"], ["1", "2 Segmente"], ["2", "Mehr als 2 Segmente"]];
for (const [d, t] of seg) o(`5-031.0${d}`, `Zugang zur Brustwirbelsäule: BWS, dorsal: ${t}`, "Zugänge", "access");
for (const [d, t] of seg) o(`5-031.1${d}`, `Zugang zur Brustwirbelsäule: Laminotomie BWS: ${t}`, "Zugänge", "access");
for (const [d, t] of seg) o(`5-031.3${d}`, `Zugang zur Brustwirbelsäule: Laminektomie BWS: ${t}`, "Zugänge", "access");
for (const [d, t] of seg) o(`5-032.0${d}`, `Zugang zur Lendenwirbelsäule: LWS, dorsal: ${t}`, "Zugänge", "access");
for (const [d, t] of seg) o(`5-032.2${d}`, `Zugang zur Lendenwirbelsäule: Laminotomie LWS: ${t}`, "Zugänge", "access");
for (const [d, t] of seg) o(`5-032.4${d}`, `Zugang zur Lendenwirbelsäule: Laminektomie LWS: ${t}`, "Zugänge", "access");

export const OPS = ops;

// Fertige Fallbeispiele (Schnellauswahl)
export const PRESETS = [
  { id: "scs-fbss-1", label: "SCS bei FBSS – einzeitig (Stimulator + Elektroden)", hd: "M96.1", ops: ["5-039.e1", "5-039.35"], vwd: 3 },
  { id: "scs-fbss-2a", label: "SCS bei FBSS – Teststimulation mit permanenten Elektroden", hd: "M96.1", ops: ["5-039.35"], vwd: 3 },
  { id: "scs-fbss-2b", label: "SCS bei FBSS – Stimulator im 2. Aufenthalt (wiederaufladbar)", hd: "M96.1", ops: ["5-039.n2"], vwd: 2 },
  { id: "scs-crps", label: "SCS bei CRPS – einzeitig", hd: "G90.51", ops: ["5-039.e1", "5-039.35"], vwd: 3 },
  { id: "scs-pavk", label: "SCS bei PAVK – einzeitig", hd: "I70.22", ops: ["5-039.e1", "5-039.35"], vwd: 6 },
  { id: "scs-ipg", label: "SCS – Aggregatwechsel (nicht wiederaufladbar)", hd: "M96.1", ops: ["5-039.f1"], vwd: 2 },
  { id: "scs-rev", label: "SCS – Revision mit Elektrodenwechsel", hd: "T85.1", ops: ["5-039.c1", "5-039.35"], vwd: 2 },
  { id: "drg-knee", label: "DRG-Stimulation bei Knieschmerz – einzeitig", hd: "M79.66", ops: ["5-039.k1", "5-039.j1"], vwd: 2 },
  { id: "ths-pd", label: "THS bei Parkinson – Stimulator + Elektroden", hd: "G20.10", ops: ["5-028.91", "5-014.93"], vwd: 7 },
  { id: "ths-ipg", label: "THS – Aggregatwechsel (wiederaufladbar)", hd: "G20.10", ops: ["5-028.a2"], vwd: 2 },
  { id: "rfa-facet", label: "RFA – Facetten-Thermokoagulation 2 Segmente, 2 Tage", hd: "M54.5", ops: ["5-83a.01"], vwd: 2 },
];

export const SOURCES = [
  { label: "InEK: aG-DRG-Fallpauschalen-Katalog und Pflegeerlöskatalog 2026", url: "https://www.g-drg.de/ag-drg-system-2026/fallpauschalen-katalog/fallpauschalen-katalog-2026" },
  { label: "GKV-Spitzenverband: Bundesbasisfallwert 2026 (4.570,64 €)", url: "https://www.gkv-spitzenverband.de/media/dokumente/krankenversicherung_1/krankenhaeuser/budgetverhandlungen/bundesbasisfallwert/BBFW_2026.pdf" },
  { label: "vdek: Landesbasisfallwerte 2026 (Stand 28.05.2026)", url: "https://www.vdek.com/vertragspartner/Krankenhaeuser/landesbasisfallwerte.html" },
  { label: "KBV: EBM / Orientierungswert 2026 (12,7404 Cent)", url: "https://www.kbv.de/html/ebm.php" },
  { label: "BfArM: ICD-10-GM und OPS 2026", url: "https://www.bfarm.de/DE/Kodiersysteme/Klassifikationen/_node.html" },
  { label: "KBV: Anhang 2 zum EBM (OPS → Kategorie/GOP, § 115b-Kennzeichen), Stand 01.07.2026", url: "https://www.kbv.de/praxis/abrechnung/ambulantes-operieren/anhang-2" },
  { label: "Zusatzentgelte 2026 (ZE138–ZE141, Anlage 2/5)", url: "https://www.drgsystem.de/ze" },
  { label: "DKG: AOP-Katalog nach § 115b SGB V", url: "https://www.dkgev.de/themen/finanzierung-leistungskataloge/ambulante-verguetung/ambulantes-operieren-115b-sgb-v/" },
];

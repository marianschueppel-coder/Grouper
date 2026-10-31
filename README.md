# Neuromod-Grouper 2026

Kodier- und Erlösrechner für **Neuromodulation** (Rückenmarkstimulation, Spinalganglienstimulation, Tiefe Hirnstimulation) und **Radiofrequenzablation** auf Basis des aG-DRG-Systems 2026, mit ambulanter Sicht (AOP § 115b SGB V / EBM).

> **Privates, nicht-kommerzielles Projekt.** Kein zertifizierter DRG-Grouper, keine Abrechnungs- oder Rechtsberatung. Alle Angaben ohne Gewähr. Maßgeblich sind ausschließlich die amtlichen Klassifikationen (BfArM), die Deutschen Kodierrichtlinien, der aG-DRG-Katalog (InEK) und der zertifizierte Grouper des jeweiligen Krankenhauses.

## Funktionen

- **Stationär:** Hauptdiagnose + OPS wählen → aG-DRG mit Erklärung des Gruppierungswegs, Plausibilitätshinweisen und Erlösschätzung (Basisfallwert je Bundesland, Ab-/Zuschläge nach Grenzverweildauer, Pflegeerlös, ZE140 / ZE141 / ZE2026-61).
- **Ambulant:** kompletter AOP-/EBM-Abrechnungsfall (OP-Leistung, Simultanzuschlag, Narkose, Überwachung, Nachbehandlung, Pauschalen, 7 % Sachkostenpauschale, Implantatkosten), Kontextfaktoren-Check, Schmerztherapie-/Neurologie-Ziffern und GOÄ-Beispiel für Privatpatienten.
- **Wiederaufnahme:** vereinfachte Prüfung der Fallzusammenführung nach § 2 FPV 2026.
- Läuft vollständig im Browser – kein Server, keine Cookies, kein Tracking.

## Grenzen

Regelbasierte Abbildung typischer Konstellationen bei PCCL 0. Nicht berücksichtigt: Nebendiagnosen/PCCL, Alterssplits < 18 Jahre, Verlegungen, Belegabteilungen, Beatmung. Nicht abgebildete Kombinationen werden als solche angezeigt; es wird keine DRG geraten.

## Datenquellen (Stand 2026)

| Daten | Quelle |
|---|---|
| Bewertungsrelationen, Grenzverweildauern, Pflegeerlös | InEK, aG-DRG-Fallpauschalenkatalog und Pflegeerlöskatalog 2026 |
| Bundesbasisfallwert 4.570,64 € | GKV-Spitzenverband, Vereinbarung vom 27.03.2026 |
| Landesbasisfallwerte 2026 | vdek, Stand 28.05.2026 |
| Pflegeentgeltwert 250 € | § 15 Abs. 2a KHEntgG |
| EBM-Punktzahlen, Orientierungswert 12,7404 Cent | KBV / Bewertungsausschuss |
| ICD-10-GM / OPS 2026 | BfArM |
| OPS → EBM-Kategorie/GOP, § 115b-Kennzeichen | KBV, Anhang 2 zum EBM (Stand 01.07.2026) |
| ZE138–ZE141 | Anlage 2/5 Fallpauschalenkatalog 2026 |

## Installation

Siehe [ANLEITUNG.md](ANLEITUNG.md). Kurz: `dist/neuromod-grouper.html` läuft offline per Doppelklick; für die Website den Ordnerinhalt in ein GitHub-Repo laden und GitHub Pages (Branch `main`, `/root`) aktivieren.

## Tests

Die Gruppierungslogik wird gegen veröffentlichte Gruppierungsbeispiele geprüft:

```bash
node tests/grouper.test.mjs   # bzw. npm test
npm run build                 # erzeugt dist/neuromod-grouper.html
```

## Jährliche Aktualisierung

Alle Katalogwerte stehen in `assets/data.js` (DRGs, Zusatzentgelte, Basisfallwerte, EBM-Punkte, ICD/OPS-Auswahl). Die Regeln stehen in `assets/grouper.js`. Nach Änderungen Tests ausführen.

## Lizenz

MIT – siehe `LICENSE`. Inhalte der amtlichen Klassifikationen und Kataloge unterliegen den Nutzungsbedingungen der jeweiligen Herausgeber.

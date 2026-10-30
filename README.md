# Neuromod-Grouper 2026

Kodier- und Erlösrechner für **Neuromodulation** (Rückenmarkstimulation, Spinalganglienstimulation, Tiefe Hirnstimulation) und **Radiofrequenzablation** auf Basis des aG-DRG-Systems 2026, mit ambulanter Sicht (AOP § 115b SGB V / EBM).

> **Privates, nicht-kommerzielles Projekt.** Kein zertifizierter DRG-Grouper, keine Abrechnungs- oder Rechtsberatung. Alle Angaben ohne Gewähr. Maßgeblich sind ausschließlich die amtlichen Klassifikationen (BfArM), die Deutschen Kodierrichtlinien, der aG-DRG-Katalog (InEK) und der zertifizierte Grouper des jeweiligen Krankenhauses.

## Funktionen

- **Stationär:** Hauptdiagnose + OPS wählen → aG-DRG mit Erklärung des Gruppierungswegs, Plausibilitätshinweisen und Erlösschätzung (Basisfallwert je Bundesland, Ab-/Zuschläge nach Grenzverweildauer, Pflegeerlös, ZE140 / ZE141 / ZE2026-61).
- **Ambulant:** AOP-Fähigkeit und EBM-OP-Leistung inkl. Bewertung in Euro.
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

## Lokal starten

Statische Seite – z. B.:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Tests

Die Gruppierungslogik wird gegen veröffentlichte Gruppierungsbeispiele geprüft:

```bash
node tests/grouper.test.mjs
```

## Jährliche Aktualisierung

Alle Katalogwerte stehen in `assets/data.js` (DRGs, Zusatzentgelte, Basisfallwerte, EBM-Punkte, ICD/OPS-Auswahl). Die Regeln stehen in `assets/grouper.js`. Nach Änderungen Tests ausführen.

## Lizenz

MIT – siehe `LICENSE`. Inhalte der amtlichen Klassifikationen und Kataloge unterliegen den Nutzungsbedingungen der jeweiligen Herausgeber.

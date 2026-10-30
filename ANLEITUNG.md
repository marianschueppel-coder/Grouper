# Installation & Veröffentlichung

## Variante A – sofort offline nutzen (ohne Installation)
1. ZIP entpacken.
2. `dist/neuromod-grouper.html` doppelklicken → öffnet im Browser, funktioniert komplett offline.
   Die Datei kann man auch einzeln weitergeben (z. B. per E-Mail).

## Variante B – als Website über GitHub Pages
1. github.com → oben rechts **+** → **New repository**
   - Name: `neuromod-grouper`, **Public**, *kein* README/Lizenz anhaken → **Create repository**
2. Auf der leeren Repo-Seite: **uploading an existing file** klicken.
3. Den **Inhalt** des entpackten Ordners `neuromod-grouper` hineinziehen
   (also `index.html`, `assets/`, `dist/`, `tests/` … – nicht den Ordner selbst).
   Chrome/Edge übernehmen Unterordner beim Ziehen automatisch.
4. Unten **Commit changes**.
5. **Settings → Pages** → Source: **Deploy from a branch** → Branch **main**, Ordner **/ (root)** → **Save**.
6. Nach 1–2 Minuten ist die Seite erreichbar unter
   `https://<dein-github-name>.github.io/neuromod-grouper/`

## Aktualisieren
- Werte ändern in `assets/data.js` (DRGs, ZE, Basisfallwerte, EBM), Regeln in `assets/grouper.js`.
- Auf GitHub die geänderte Datei öffnen → Stift-Symbol → einfügen → **Commit changes**. Pages aktualisiert sich automatisch.
- Optional (mit Node.js): `npm test` prüft die Logik, `npm run build` erzeugt die Offline-Datei neu.

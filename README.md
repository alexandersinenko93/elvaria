# ELVARIA — Interaktiver Businessplan (README für AI-IDE-Agenten)

> **In 30 Sekunden:** ELVARIA ist eine einsprachig deutsche, **einzelne HTML-Datei**
> (`website/index.html`, ~4.570 Zeilen, kein Build, keine Bibliotheken, keine externen
> Fonts) für eine Yogalehrerin in Hamburg, die **Yoga als Event** verkauft — offene
> Abende (B2C), Firmen-Events (B2B), Material-Verleih und Gutscheine. **Kein Studio,
> keine Miete** (Raumkosten nur pro Event). Die Seite hat 4 Ansichten: **Start** ·
> **Assistent** (Wizard, 12 Fragen → eigene Rechnung) · **Businessplan** (6 Kapitel +
> Live-Rechner) · **Anhang** (14 Plattform-Tutorials, 40 Ideen, 36 Antworten).
> Stand: Runde 18, alle Tests grün (415 Prüfungen).

---

## 1. Schnellstart

```bash
# Seite ansehen: einfach öffnen, kein Server nötig
website/index.html            # file:// reicht; Hash-Routing (#/wiz, #/plan …)

# Nach Änderungen an Plan-Inhalten (Pflicht, siehe §3):
node website/sync_plan.js          # spielt plan.js in index.html ein
node website/sync_plan.js --check  # nur prüfen (Exit 1 bei Abweichung)

# Tests (immer über run.sh, nie direkt mit node — setzt Chromium-Libs):
./run.sh website/t_wiz.js      # 64 Prüfungen, Assistent
./run.sh website/t_plan.js     # 58, Businessplan + Rechner
./run.sh website/t_start.js    # 45, Startseite
./run.sh website/t_aufnahme.js # 106, Anhang/Plattformen
./run.sh website/t_deep.js     # 119, Deep-Tutorials
./run.sh website/t_keys.js     # 9, Tastatur/Suche
./run.sh website/t_print.js    # 14/14, Druck = 1 Seite je Tutorial
./run.sh website/t_printdeep.js
```

Falls `playwright`/Chromium in einer frischen Umgebung fehlt (`node_modules` und
`~/.cache/ms-playwright` sind nicht versioniert): `npm install` +
`npx playwright install chromium`. System-Bibliotheken ggf. ohne root nach
`/tmp/pwlibs` entpacken — `run.sh` setzt `LD_LIBRARY_PATH` +
`PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1` bereits.

## 2. Dateikarte

| Datei | Rolle |
|---|---|
| `website/index.html` | **Das Deliverable.** Komplette App: HTML, 1 Style-Block, 4 Script-Blöcke. Einzige Datei, die der Nutzer öffnet/braucht. |
| `website/plan.js` | **Quelle** für Businessplan-Inhalte + Rechenmodell + Wizard-Fragen (475 Z.). Wird per Sentinel in `index.html` eingespielt — nie die Kopie in der HTML editieren. |
| `website/sync_plan.js` | Kopiert `plan.js` zwischen `PLAN:BEGIN`/`PLAN:END` in `index.html` (`--check` = Abweichungstest). |
| `website/t_*.js` | Playwright-Tests (siehe §8). `t_shot*.js` = Screenshot-Helfer. |
| `run.sh` | Test-Runner mit Chromium-Umgebung. |
| `ELVARIA_Plattform-Aufnahme.md` | Begleitdossier: Kap. 10 = Businessplan-Umbau (R17), **Kap. 11 = Laien-Sprache/Design/Wizard (R18)**, davor Plattform-Recherche. |
| `ELVARIA_Komplettdossier.md` | Recherche-Grundlage (2.981 Z.). **Kap. 26.1–26.5 = Herkunft aller Rechenzahlen**, Kap. 18.3 Szenarien. |
| `ELVARIA_Audit.md`, `ELVARIA_Breakdown-Verbesserungen.md`, `ELVARIA_Gutschein-Zugang.md`, `ELVARIA_Ideen-Alternativen.md` | Ältere Arbeitsstände (R1–R16), nur Referenz. |
| `screens/` | Screenshots zur Sichtprüfung (`wiz-*.png`, `sleek-*.png` = aktuell). |

## 3. Die wichtigste Regel: `plan.js` ist die Quelle

`index.html` enthält eine **wortgleiche Kopie** von `plan.js` als Script-Block 0,
eingeschlossen von:

```
/* ═══ PLAN:BEGIN — Quelle ist website/plan.js, hier nicht editieren ═══ */
… Inhalt von plan.js …
/* ═══ PLAN:END ═══ */
```

**Workflow bei jeder Änderung an Plan/Wizard:** `website/plan.js` editieren →
`node website/sync_plan.js` → Tests. Die Sentineln dürfen nie verloren gehen,
sonst bricht der Sync mit „Sentineln fehlen in index.html" ab.

## 4. Architektur von `index.html`

| Script-Block | Inhalt |
|---|---|
| 0 | Kopie von `plan.js` (s.o.): `MODEL`, `calc()`, `SCEN`, `GLOSS`, `KPI`, `PLAN`, `MILESTONES`, `verdict()`, `WIZ` |
| 1 | Startguide-Daten: `START` (7 Schritte), `SIMPLE` (FAQ „einfach erklärt") |
| 2 | `DEEP`: ausführliche Step-by-step-Tutorials je Plattform (`req`/`deep`/`gu`) |
| 3 | App: Daten `P` (14 Plattformen), `I` (40 Ideen), `FAQ`, `NOGO`, Router, alle Views, Rechner, Wizard-Logik |

**Views & Routing** (`VIEWS=['dash','wiz','plan','anhang']`, `showView()`, `readHash()`):

| Hash | Ansicht |
|---|---|
| `#/dash` (oder leer) | Start: Hero, Startguide (7 Schritte, abhakbar), „Kurz erklärt", 4 Weg-Karten |
| `#/wiz`, `#/assistent` | Assistent (Wizard) |
| `#/plan` | Businessplan: KPI-Leiste, Rechner `#pl-rechner`, 6 Kapitel, Meilensteine |
| `#/anhang` | Anhang mit 3 Paneelen: `#anPlat` (Kanäle) · `#anIdeen` · `#anFaq`, Umschalter `#anbar` |
| `#/plat`, `#/ideen`, `#/faq` | Alt-Links → öffnen `anhang` mit dem jeweiligen Paneel |
| `#/p/<id>`, `#/i/<n>`, `#/n/<n>` | Detail-/Tutorial-Ansicht `#v-detail` |

Hero (`#hero`) wird nur auf `dash` gezeigt. Detail-Ansicht merkt sich Herkunft
(`RETURN_TO`) für die Zurück-Beschriftung.

## 5. Rechenmodell (`calc(a)` in `plan.js`)

Ein Modell für Rechner **und** Wizard — nie eine zweite Rechnung einführen.

**Eingaben `a`:** `b2cEvents, b2cTN, ticket, location, b2bEvents, b2bPreis,
verleih, gutschein, fix, scen` (+ im Wizard zusätzlich `on_b2c/on_b2b/on_verleih/
on_gutschein, fixZusatz, erledigt`).

**Regeln (`MODEL`):**

| Größe | Regel |
|---|---|
| Umsatz | `b2cEvents·b2cTN·ticket + b2bEvents·b2bPreis + verleih + gutschein` |
| Zahlung | 2 % auf B2C+Verleih+Gutscheine (B2B auf Rechnung = 0) |
| Material / Mentorinnen | 12 % / 25 % auf B2C+B2B |
| Raum | `b2cEvents · location` (variabel pro Event, **keine** Fixmiete) |
| Fixkosten | Pflicht **524 €** (`FIXSUM`: 59+220+30+85+70+60) + Szenario-Aufschlag `fixAuf` 526/926/1.576 → **1.050 / 1.450 / 2.100 €**; `a.fix` überschreibt explizit |
| Kapazität | Logistik-Last `last = b2cEvents + b2bEvents/2`, Grenze `lastMax = 8` |
| Break-even | `beB2C`, `beB2B`, `beMix` (immer alle drei zeigen, nie eine einzelne Zahl) |
| Dossier-Vergleich | `dossier = umsatz·0.63 − fix` — Abweichung zum Komplettdossier Kap. 26.2 wird im UI **ausgewiesen**, nicht versteckt |

**Szenarien `SCEN`** (Namen im UI: Vorsichtig / Realistisch / Ehrgeizig):

| Szenario | Umsatz | Ergebnis | Marge | DB B2C / B2B | BE B2C/B2B/Mix |
|---|---|---|---|---|---|
| konservativ | 6.100 € | 2.052 € | 34 % | 177 / 756 € | 6 / 2 / 3 |
| basis | 14.150 € | 7.433 € | 53 % | 475 / 945 € | 4 / 2 / 3 |
| ambitioniert | 25.380 € | 14.623 € | 58 % | 689 / 1.134 € | 4 / 2 / 3 |

Ändert sich ein Wert hier, ändern sich Rechner, Wizard, KPI-Kacheln und Tests
gemeinsam — die Zahlen oben sind die Referenz für `t_plan.js`/`t_wiz.js`.

**Urteil `verdict(r,a)`** → `{tone:'ok|mid|bad', title, lines[3]}`:
`ergebnis<=0` → bad („So trägt es noch nicht.") · `marge<0.3 || last>8` → mid ·
sonst ok. Wird unter dem Rechner (`#plVerdict`) und auf dem Wizard-Ergebnisblatt gezeigt.

## 6. Der Assistent / Wizard (`#/wiz`)

- **Daten:** `WIZ` in `plan.js` — 12 Schritte mit `id, kind, q, help, why` und je nach
  Art `field/opts/presets/min/max/unit/need`. Arten: `multi` (anfang), `pick`
  (Einzelauswahl, setzt `field` oder `set`), `range` (Regler + Presets), `check`
  (`kosten` = Fixkosten-Auswahl, `papier` mit `plain:true` = Erledigt-Häkchen), `out`.
- **Abhängigkeiten:** `wizSteps()` filtert `WIZ` nach `need` gegen `WS.A`
  (`on_gutschein`, `on_verleih`, `on_b2c`, `on_b2b`) → sichtbare Fragen: **11 ohne
  Verleih, 12 mit, 10 ohne Firmen**. `#wizCount` zeigt „Schritt x von n" aus der
  gefilterten Liste; `#wizFill` zeigt die **Position** (idx+1)/n.
- **State:** `WS = {i, A, done}`, Startwerte = `SCEN.basis` + `on_*` +
  `fix = FIXSUM + fixZusatz`. `WS.sel` hält die `kosten`-Auswahl (nicht persistiert
  als Feld, sondern über `fixZusatz`).
- **Live-Feld** `#wizLive` (`renderWizLive()`): Ergebnis, Umsatz, Fixkosten,
  Deckungsbeiträge, Break-even, Logistik + Warn-/OK-Zeile. Rechnet mit `calc(WS.A)`.
- **Ergebnisblatt** (`wizOut()`): 6 Kennzahlen, `verdict()`, offene Papier-Punkte
  als Aufgaben mit Kostensumme. Aktionen `data-w`: `copy` (Text via `wizText()`) ·
  `print` · `toplan` (schreibt `WS.A` nach `PST.A`, zeigt Plan-Rechner) · `restart`.
- **Tastatur:** Enter/→ weiter, ← zurück (`bindWizKeys()`, nur wenn `#v-wiz.on`).
- **Render-Funktionen:** `renderWiz()`, `bindWiz(st)`, `wizOpt(step,o,i,on,cls)` —
  **Parameter-Reihenfolge beachten** (Index vor `on`!), `wizIsOn()`, `wizFixBase()`.

## 7. Businessplan-Ansicht (`#/plan`)

- `PLAN` (6 Kapitel) je mit `id, num, t, sub, say` („Das ist die Antwort"), `gl`
  (Glossar-Begriffe), `blocks[]` (je `t`, optional `say`, `b` Bullets / `tab` Tabelle,
  `w:'warn'`) und `next` (2 Aufgaben „Was du daraus machst").
- Rendering: `renderPlan()` (Voll) + `updateCalc()` (Teil-Update bei Reglern).
  **Regel aus R17/R18: Alles, was im Voll-Render entsteht, muss auch im Teil-Update
  neu gezeichnet werden** (Szenario-Chips `scenChips()`, Vergleichstabelle
  `#plScenTbl`, `#plVerdict`, `#plNav`-Fußzeile) — sonst stale UI.
- Rechner: 9 Regler (`PLAN_FIELDS`: b2cEvents, b2cTN, ticket, location, b2bEvents,
  b2bPreis, verleih, gutschein, fix), 3 Szenario-Chips + „Angepasst"-Reset,
  Aktionen „nur B2C" (`worst`) und Drucken.
- Glossar: `GLOSS` (17 Begriffe), Chips `.gloss button[data-gl]` klappen `#gdef`
  auf (`bindGloss()`). Test erzwingt: jedes im Plan benutzte Fachwort steht im Glossar.
- Querverweise je Kapitel: `PLAN_REL` + `bindRel()` (`.plrel`-Zeile → Anhang-Paneele
  bzw. Startguide). Meilensteine: `MILESTONES` (7), abhakbar, Fortschritt in `DONE.plan`.

## 8. Persistenz (localStorage, alles in try/catch über `store`)

| Key | Inhalt |
|---|---|
| `elvaria-wiz` | Wizard: `{i, A, done}` |
| `elvaria-plan` | `PST`: Szenario, Reglerwerte `A`, offenes Kapitel |
| `elvaria-done` | Abgehaktes: `start[]`, `plan[]`, Detail-/Deep-Fortschritt (`p-<id>`, `d-…`) |
| `elvaria-anhang` | zuletzt offenes Anhang-Paneel |
| `elvaria-last` | zuletzt geöffnetes Detail (für „Weitermachen") |
| `elvaria-seg` | Tutorial-Modus quick/deep |
| `elvaria-logo` | Logo-Variante |

Startseite zeigt u. a. Wizard-Fortschritt `#mW` als `x/12` (`refreshProgress()`).

## 9. Design-System („DESIGN 2.0", letzter Teil des einen `<style>`-Blocks)

- **Fonts sind System-Stacks — niemals Webfonts/CDN einbauen** (Datei muss offline
  und in der sandboxed Vorschau ohne Netz funktionieren):
  `--f-display: "SF Pro Display","Segoe UI Variable Display","Helvetica Neue",…` ·
  `--f-body: system-ui,…` · `--f-serif: Georgia,…` **nur** für Kursiv-Akzente
  (`h1 em`, `h2 em`, `.brand b`).
- Zahlen überall `font-variant-numeric: tabular-nums`. Kapitelkopf: gefüllte
  Navy-Plakette `.plsech .n` + 2-px-Unterstrich. Tabellen `table.plt`: kein Zebra,
  Gold-Hover, Zahlen rechts. Header mit `backdrop-filter`-Blur.
- Bausteine: `.plsay` („Einfach gesagt"), `.gloss`/`.gdef`, `.plnext`
  („Was du daraus machst"), `.verdict.t-ok/.t-mid/.t-bad`, `.wiz*` (Wizard),
  `#plProg` (Scroll-Fortschrittslinie in Plan + Wizard).
- `prefers-reduced-motion` schaltet Übergänge ab. Druck-Regeln im selben Block:
  Wizard/Plan drucken ohne Buttons, Live-Panel weiß.
- **Hartes Constraint: eine Datei, keine externen Ressourcen.** Externe Links in
  Tutorial-Inhalten sind ok; externe Styles/Scripts/Fonts/Bilder nicht.

## 10. Inhaltliche Regeln (vom Nutzer vorgegeben — nicht „verbessern")

1. **Keine Miete, kein Studio.** Raumkosten nur variabel pro Event (`location`, 0–500 €).
2. **Laien-Sprache:** kein Fachwort ohne Glossar-Erklärung, kurze direkte Sätze,
   keine Werbesprache. Jedes Kapitel braucht `say`, `gl`, `next`.
3. **Chat-Antworten an den Nutzer: klar, deutlich, kurz.** Tiefe gehört in Dateien.
4. Design-Aufwertungen müssen **Lesbarkeit vor Effekt** stellen (10× clarity).
5. Alle 14 Plattformen brauchen Step-by-step-Tutorial mit klickbaren Links (Anhang).

## 11. Tests — was sie abdecken

| Datei | Prüft |
|---|---|
| `t_wiz.js` (64) | Routing/Alias, dynamische Fragenanzahl (11/12/10), Presets, Live-Feld, Modell-Gleichheit Wizard=Plan, Fixkosten-Summe, Papierliste, Ergebnisblatt, Urteile rot/grün, `toplan`, `wizText()`, Persistenz, Enter/Pfeile, Glossar-Klick, Font-Tokens, Overflow 390/768, Mobile-Layout, Druck, 0 Console-Fehler; schreibt Screenshots nach `screens/` |
| `t_plan.js` (58) | Struktur/Nummerierung/Titel, 5 KPI, Szenario-Vergleichstabelle, 9 Regler, Live-Rechnung, „Angepasst"-Reset, Was-wenn, Break-even-Plausibilität, Meilensteine + Persistenz, Alt-Links, Beleg-Zeilen, Navcards, Overflow 390/768/1440, mobile Navi |
| `t_start.js` (45) | Startseite: Roadmap-Inhalte, Abhaken + Reload, Tutorial-Sprung, Karten, Nav-Labels, Plattform-Sortierung, mobil |
| `t_aufnahme.js` (106) · `t_deep.js` (119) · `t_keys.js` (9) | Anhang-Suche/Filter, Deep-Guides, Tastatur |
| `t_print.js` (14/14) · `t_printdeep.js` | Druckausgabe = 1 Seite je Tutorial, keine Auffälligkeiten |

**Achtung bei UI-Änderungen:** Tests erwarten exakte Nav-Labels
(`Start|Assistent|Businessplan|Anhang`), Hero-`h1`, 4 `.navcard` und Kapitel-Titel —
bei Umbenennungen Tests mit anpassen, nicht umgekehrt „grün biegen".

## 12. Bekannte Fallen (schon einmal passiert)

| Falle | Details |
|---|---|
| `wizOpt()`-Parameter vertauscht | Signatur `(step, o, i, on, cls)`. Falsche Reihenfolge → `data-oi="true"` → Klick crasht mit `reading 'set'`. |
| Nav-Markierung bei Alt-Links | `showView()` markiert nur `data-v===v`; `setAnhang()` muss immer `anhang` markieren (nicht `ideen`/`faq`, diese Buttons existieren nicht mehr). |
| Fehlende Klick-Bindung | Neue Buttons brauchen explizites `onclick` — es gibt kein Event-Delegation-Framework. `.navcard`, `[data-wiz]`, `[data-start]` werden in `renderDash()` gebunden. |
| Teil-Update vergessen | Siehe §7: `updateCalc()` muss alles neu zeichnen, was `renderPlan()` erzeugt (Chips, Tabelle, Urteil). |
| `PLAN:END` verloren | Beim Umschreiben von `plan.js` Sentinel stehen lassen, sonst kein Sync. |
| Smooth-Scroll in Tests | Nach `scrollTo({behavior:'smooth'})` 800–1000 ms warten, sonst misst der Test die Animation. |
| Overflow-Tests | `.plnav` und `.tblwrap` sind eigene Scroll-Container → vom Überlauf-Test ausnehmen. Screenshot-Pfade absolut (`/home/user/screens/…`). |
| Playwright fehlt nach Snapshot | `node_modules`/Browser-Cache persistieren nicht → §1 neu installieren, Tests nur via `./run.sh`. |

## 13. Typische Änderungen — Rezepte

| Aufgabe | Wo |
|---|---|
| Rechenannahme ändern (Sätze, Fixkosten) | `MODEL` in `plan.js` → Sync → `t_plan` + `t_wiz` laufen lassen, Szenario-Tabelle in §5 ggf. nachziehen |
| Kapiteltext / Aufgaben ändern | `PLAN[i].blocks` / `PLAN[i].next` in `plan.js` → Sync |
| Neues Fachwort | In `GLOSS` erklären **und** in `gl:[]` des Kapitels listen → Sync |
| Wizard-Frage hinzufügen | Eintrag in `WIZ` (ggf. `need`) → bei neuem Feld auch `calc()`/`WS`-Startwerte prüfen → Sync → `t_wiz` |
| Szenario-Werte ändern | `SCEN` in `plan.js` (`fix` wird automatisch aus `fixAuf` gesetzt) → Sync → Tests |
| Plattform/Idee/FAQ ändern | Script-Block 3 in `index.html` (`P`/`I`/`FAQ`), Tutorials in Block 2 (`DEEP`) — hier **kein** Sync nötig |
| Design ändern | „DESIGN 2.0"-Abschnitt am Ende des Style-Blocks; Alt-CSS davor möglichst nicht anfassen |

## 14. Verifikation vor „fertig"

```bash
node website/sync_plan.js --check        # muss „synchron" melden
./run.sh website/t_wiz.js                # 64/64
./run.sh website/t_plan.js               # 58/58
./run.sh website/t_start.js              # 45/45
./run.sh website/t_aufnahme.js           # 106/106
./run.sh website/t_deep.js               # 119/119
./run.sh website/t_keys.js               # 9/9
./run.sh website/t_print.js              # 14/14
./run.sh website/t_printdeep.js          # „Auffällig: keine"
# + Screenshots in screens/ ansehen (wiz-1, wiz-5, wiz-out, wiz-mobil, sleek-*)
```

Ergebnis dokumentieren in `ELVARIA_Plattform-Aufnahme.md` als neues Kapitel
(bisher: Kap. 10 = Runde 17, Kap. 11 = Runde 18).

/**
 * ELVARIA Master-Fahrplan (Makro-Phasen & Kleinteilige Mikro-Schritte)
 * Sequentieller Ablauf vom Fundament über Raum-Deals bis zu B2B-Kunden
 */
const ROADMAP_PARTS = [
  {
    id: 'part-1', num: 1, title: 'Fundament, Recht & Voucher-Engine', timeframe: 'Woche 1',
    lead: 'Das rechtliche und technische Fundament für risikofreien Gutscheinverkauf ohne Kursstudio.',
    steps: [
      {
        id: 'rm-1-1', title: 'Eversports Vouchers-Widget aktivieren & einbinden', time: '30 Min',
        desc: 'Im Eversports Manager unter Einstellungen → Widgets das reine Gutschein-Widget freischalten. Beträge auf 25 / 50 / 100 € festlegen. 0 % Zusatzprovision bei bestehendem Account.',
        hint: 'Kein eigenes Shopsystem nötig. Das Widget liefert ein fertiges HTML-Snippet.',
        link: { kind: 'p', id: 'ev', label: 'Eversports Guide' }
      },
      {
        id: 'rm-1-2', title: 'Einlösebedingung in einem Satz rechtskonform definieren', time: '15 Min',
        desc: 'Klarer Text unter dem Widget: „Gilt für alle Elvaria Events, Yoga + X Specials und Equipment-Verleih. 3 Jahre gültig bis zum Jahresende (§ 195 BGB), frei übertragbar.“',
        hint: 'Schützt vor Abmahnungen und schafft sofortiges Vertrauen beim Käufer.'
      },
      {
        id: 'rm-1-3', title: 'AGB & Widerrufsbelehrung für Gutscheinverkauf veröffentlichen', time: '60 Min',
        desc: '6 der 14 Gutscheinplattformen prüfen zwingend die AGB. Frist 3 Jahre (§ 195 BGB), 14 Tage Widerrufsrecht für Gutscheine, Terminausfall-Klausel für gebuchte Event-Plätze verankern.',
        hint: 'HWG-konforme Klauseln: Yoga dient der Entspannung und Prävention, keine Heilbehandlung.',
        link: { kind: 'p', id: 'wu', label: 'Wunschgutschein Kriterien' }
      },
      {
        id: 'rm-1-4', title: 'Vektor-Logo & 16:9 Event-Bildmaterial bereitstellen', time: '45 Min',
        desc: 'Logo als EPS/SVG und transparentes PNG anlegen. 5 hochauflösende 16:9 Fotos ohne sichtbares Studio-Branding (Outdoor, Lofts, Yoga + X Dynamik) für Plattform-Freischaltungen.',
        hint: 'Plattformen wie gokonfetti und GetYourGuide verlangen professionelles Bildmaterial.'
      }
    ]
  },
  {
    id: 'part-2', num: 2, title: 'Raum-Deals & Location-Netzwerk Hamburg', timeframe: 'Woche 1–2',
    lead: '0 € fixe Raummiete. Stundenweise Partnerschaften in Eimsbüttel, Altona & Schanze sichern.',
    steps: [
      {
        id: 'rm-2-1', title: 'Khôra Studio (Eimsbüttel) für Wochenend-Specials anfragen', time: '30 Min',
        desc: '200 m² Studiofläche mit 70 m² Hauptsaal (20 Matten) stundenweise ab 40 €/Std. anfragen. Feste Slots für Samstag-/Sonntagnachmittag reservieren.',
        hint: 'Matten, Bolster und Musikanlage sind bereits komplett vor Ort vorhanden.'
      },
      {
        id: 'rm-2-2', title: 'The Shala Loft (Eimsbüttel) für Akustik- & High-End Events sichern', time: '30 Min',
        desc: '140 m² Loft mit Feng-Shui Holzparkett für Sanctuary Strings (Live-Cello) oder Scent & Stretch kontaktieren. Halbtages-Pauschale verhandeln.',
        hint: 'Bio-Tee und gefiltertes Wasser sind vor Ort inklusive.'
      },
      {
        id: 'rm-2-3', title: 'White Collar Boxing Club (Niendorf) für Flow & Fight anbinden', time: '45 Min',
        desc: 'Clubhaus mit Boxring und Tatamiböden kontaktieren. Co-Hosting oder Raummiete für 90-Minuten-Sessions (45 Min Pratzen + 45 Min Yin) abstimmen.',
        hint: 'Klären, ob Pratzen und Co-Trainer für die Pratzendrills gestellt werden können.'
      },
      {
        id: 'rm-2-4', title: 'Raum-Nutzungsvertrag & Haftungsfreistellung aufsetzen', time: '45 Min',
        desc: 'Klare Vereinbarung über Schlüsselübergabe, Reinigungszustand, Stornierungsfristen und Haftungsausschluss des Rauminhabers für Teilnehmerverletzungen.',
        hint: 'Eigene Veranstalterhaftpflicht muss körperliche Aktivitäten und fremde Räume abdecken.'
      }
    ]
  },
  {
    id: 'part-3', num: 3, title: 'Die 14 Gutscheinplattformen Onboarding', timeframe: 'Woche 2–4',
    lead: 'Stufe für Stufe die großen Vertriebskanäle freischalten: Erst offene Märkte, dann Netzwerke.',
    steps: [
      {
        id: 'rm-3-1', title: 'gokonfetti Partner-Registrierung abschließen', time: '45 Min',
        desc: 'Deutschlands führender Erlebnismarkt (Gruppe A). Sofort offene Registrierung ohne Mindestumsatz. Flow & Fight sowie Soundbath als buchbare Termine anlegen.',
        hint: 'Provision 20 % nur im Erfolgsfall. Extrem stark für JGA- und Afterwork-Buchungen.',
        link: { kind: 'p', id: 'gk', label: 'gokonfetti Guide' }
      },
      {
        id: 'rm-3-2', title: 'ATENTO Städtegutschein freischalten (Supermärkte)', time: '20 Min',
        desc: 'Selbstregistrierung auf app.atento.me/join. Eigene Kategorie „Yoga & Wellness“ wählen. Gutscheinwerte 25/50/100 € listen. Präsenz in REWE- und PENNY-Märkten.',
        hint: 'Keine Bonitätsprüfung, Auszahlung monatlich automatisch.',
        link: { kind: 'p', id: 'at', label: 'ATENTO Guide' }
      },
      {
        id: 'rm-3-3', title: 'WUNSCHGUTSCHEIN & Corporate Benefits Bewerbung einreichen', time: '60 Min',
        desc: 'Supermarkt-Gigant (>95.000 Verkaufsstellen) & DAX-Mitarbeiter-Portal (17,7 Mio. Nutzer). Antragsformular mit Eversports-Gutscheincodes und Vektor-Logo abschicken.',
        hint: 'Der größte Hebel für Weihnachtsgutscheine und Mitarbeiter-Präsente.',
        link: { kind: 'p', id: 'wu', label: 'WUNSCHGUTSCHEIN Guide' }
      },
      {
        id: 'rm-3-4', title: 'VU-Nummer für Sachbezugskarten (Edenred, Pluxee, givve) klären', time: '30 Min',
        desc: 'Kreditkartenabrechnung prüfen oder Händlerkennung (VU-Nummer) beim Zahlungsdienstleister (Stripe/Eversports) erfragen, um steuerfreie 50 € Sachbezüge anzunehmen.',
        hint: 'Kartenlesegerät SumUp Air (39 €) oder Online-Zahlungsfenster genügt.',
        link: { kind: 'p', id: 'gv', label: 'Karten-Weg Guide' }
      },
      {
        id: 'rm-3-5', title: 'GetYourGuide Erlebnis-Listung für Hamburg anlegen', time: '45 Min',
        desc: 'Erlebnis-Portal für Touristen und Wochenend-Besucher. Signature-Events auf Deutsch und Englisch ausschreiben.',
        hint: 'Achtung: Sofortige Buchungsbestätigung ohne manuelle Freigabe einstellen.',
        link: { kind: 'p', id: 'gy', label: 'GetYourGuide Guide' }
      }
    ]
  },
  {
    id: 'part-4', num: 4, title: 'Equipment & Logistik („Studio im Kofferraum“)', timeframe: 'Woche 3–4',
    lead: 'Das mobile Inventar aufbauen: Volle Flexibilität bei minimaler Kapitalbindung.',
    steps: [
      {
        id: 'rm-4-1', title: '20x Studio-Matten & Eurobox-Rollcontainer beschaffen', time: '45 Min',
        desc: 'Hochdichte 6mm TPE/PVC Matten in Anthrazit plus 2x 60L Euroboxen mit Rollen (60x40x32 cm). Passt in jeden Kleinwagen-Kofferraum.',
        hint: 'Klettbänder für schnelles Ein- und Ausrollen nutzen.'
      },
      {
        id: 'rm-4-2', title: 'Desinfektions- & Hygiene-Station zusammenstellen', time: '20 Min',
        desc: 'Wischdesinfektion (Biguacid / StinkFree Spray), Microfasertücher und Wäschesack für Deckenbezüge und Augenkissen einrichten.',
        hint: 'Garantierter Frische-Standard nach jedem einzelnen Event.'
      },
      {
        id: 'rm-4-3', title: 'Silent-Disco Funkkopfhörer-Mietpool testen (Lokee/Federmann)', time: '30 Min',
        desc: '25 Funk-Kopfhörer mit 3-Kanal-Sendern für Wochenend-Einsatz testen. Lärmschutz-Joker für Rooftops, Stadtpark und Elbstrand.',
        hint: 'Mietkosten ca. 125–140 € pro Wochenende. Keine Lärmauflagen.'
      },
      {
        id: 'rm-4-4', title: '432 Hz Kristallklangschalen & Gong Set sourcen', time: '60 Min',
        desc: '7-teiliges Chakra-Quarzschalen-Set (F-A-C-E) im gepolsterten Nesting-Bag beschaffen. 70cm Wind-Gong mit zerlegbarem Metallständer.',
        hint: 'Einmalige Anschaffung (ca. 650–850 €), hält lebenslang.'
      }
    ]
  },
  {
    id: 'part-5', num: 5, title: 'Signature-Events Pilotierung & Verkauf', timeframe: 'Monat 2',
    lead: 'Die ersten bezahlten Hybrid-Events in Hamburg live durchführen und dokumentieren.',
    steps: [
      {
        id: 'rm-5-1', title: 'Pilot-Event 1: Flow & Fight (Yoga + Boxen) ausschreiben', time: '60 Min',
        desc: '12 Teilnehmer im White Collar Boxing Club oder Zanshin Dojo. Ticketpreis 39–45 €. Trainer für Pratzendrills briefen.',
        hint: 'Fokus auf Auspowern und tiefes Yin Yoga. Perfekt für Social Media Content.'
      },
      {
        id: 'rm-5-2', title: 'Pilot-Event 2: Soundbath & Rest im Khôra Studio', time: '60 Min',
        desc: '20 Matten im großen Saal. Ticketpreis 35–42 € inkl. Bio-Kräutertee. Liegendes 50-Minuten Klangbad mit Kristallschalen.',
        hint: 'Reingewinn ca. 500–650 € bei 4 Stunden Raumnutzung.'
      },
      {
        id: 'rm-5-3', title: 'Pilot-Event 3: Clay & Calm oder Sip & Stretch für JGA', time: '60 Min',
        desc: 'Exklusivbuchung mit 10–14 Personen im Swawole Atelier oder Wein-Loft. Fester Gruppenpreis (450–650 €).',
        hint: 'Sehr hohe Mundpropaganda und Weiterempfehlungsquote.'
      },
      {
        id: 'rm-5-4', title: 'Foto- & Video-Dokumentation & Google-Bewertungen einsammeln', time: '30 Min',
        desc: 'Nach jedem Pilot-Event hochauflösende Reels und Fotos für Instagram und Plattformen erstellen. Alle Teilnehmer um Google-Bewertung bitten.',
        hint: '5-Sterne-Bewertungen sind der stärkste Konversions-Booster auf Plattformen.'
      }
    ]
  },
  {
    id: 'part-6', num: 6, title: 'B2B Firmenkunden & Skalierung', timeframe: 'Monat 2–3',
    lead: 'Planbare Firmenbudgets ohne Marketing-Streuverlust über § 3 Nr. 34 EStG heben.',
    steps: [
      {
        id: 'rm-6-1', title: '1-Seiter B2B Desk Reset Exposé erstellen', time: '60 Min',
        desc: 'Kompakte Broschüre für Office Manager & HR: Senkung des Krankenstands, Vagus-Atemübung und steuerfreie Abrechnung (bis 600 € / MA / Jahr nach § 3 Nr. 34 EStG).',
        hint: 'Fokus: Kein Umziehen nötig, findet direkt im Konferenzraum oder per Pop-up statt.'
      },
      {
        id: 'rm-6-2', title: 'Top-20 Hamburger Digital- und Kreativagenturen ansprechen', time: '90 Min',
        desc: 'Gezielte Kontaktaufnahme via LinkedIn und Mail in Altona, Schanze und Hafencity. Probesession für Führungsteams anbieten.',
        hint: 'Pitch: „Gesunde Pausenkultur ohne Leistungsdruck“.'
      },
      {
        id: 'rm-6-3', title: 'Wiederkehrende Firmen-Abos (2x monatlich) etablieren', time: '45 Min',
        desc: 'Halbjahres-Vereinbarungen mit festen Terminen (z.B. jeden zweiten Donnerstag um 12:00 oder 17:00 Uhr). Planbarer Cashflow.',
        hint: 'Ein Firmenkunde mit 2 Sessions/Monat bringt 400–600 € stabilen Deckungsbeitrag.'
      }
    ]
  }
];

const SIMPLE = [
  ['Was verkauft Elvaria im neuen Modell?','Wertgutscheine und Event-Tickets ohne starre Kursbindung. Kunden und Firmen erwerben ein Guthaben oder buchen gezielte Signature-Events (Yoga + X) oder B2B Desk Resets.'],
  ['Warum sind Gutscheinplattformen der Haupthebel?','Sie bringen sofortige Sichtbarkeit in Supermärkten, Google-Suchen und Mitarbeiterportalen, ohne dass Elvaria teures Werbebudget für Kaltakquise ausgeben muss.'],
  ['Wie funktioniert der Raum-Deal ohne eigenes Studio?','Bestehende Studios haben tagsüber oder zu Randzeiten Leerstand. Elvaria nutzt diese Räume gegen Stundenpauschale (ab 40 €/Std.) oder kleine Umsatzbeteiligung — 0 € monatliche Fixmiete.'],
  ['Was ist für die Aufnahme auf Plattformen zwingend nötig?','Gewerbeanmeldung, Steuernummer, Geschäftskonto, EPS-Logo, hochauflösende 16:9 Fotos und eine veröffentlichte AGB mit Widerrufsbelehrung.'],
  ['Wie lange sind Gutscheine rechtlich gültig?','Genau 3 Jahre bis zum Jahresende (§ 195 BGB). Klauseln wie „Gültig für 1 Jahr“ sind nach ständiger BGH-Rechtsprechung unwirksam.'],
  ['Können Firmen Elvaria steuerfrei buchen?','Ja. Bis zu 600 € pro Mitarbeiter und Jahr sind nach § 3 Nr. 34 EStG für zertifizierte betriebliche Gesundheitsförderung steuer- und sozialabgabenfrei.']
];

window.ROADMAP_PARTS = ROADMAP_PARTS;
window.ROADMAP_STEPS = ROADMAP_PARTS.flatMap(p => p.steps);
window.SIMPLE = SIMPLE;

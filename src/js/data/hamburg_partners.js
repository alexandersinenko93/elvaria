/**
 * ELVARIA Hamburg Location-, Partner- & Equipment-Directory
 * Vollständige Recherche verifizierter Hamburger Studios, Rooftops, Kooperationspartner & Logistik
 * Inklusive der 21 verifizierten Leads aus dem Hamburger Partneratlas (Stand: November 2026)
 */
window.HAMBURG_PARTNERS = {
  // ── 1. Verifizierte Partner-Studios (Randzeiten-Deals 35–60 €/Std.) ──
  studios: [
    {
      id: 'HH-02',
      name: 'Yoga im Hof (Komponistenviertel)',
      district: 'Barmbek-Uhlenhorst',
      size: '80 m² Pop-up Raum (18–20 Matten)',
      rate: '60 € brutto / 90 Min. tagsüber (75 € abends)',
      lead: 'Heller, ruhiger Gewerbehof. 20 Matten vor Ort, Teeküche & Musikanlage vorhanden.',
      deal: 'Top-Empfehlung (Prio A) für B2C Matcha & Matte (P03) und Leise Welle (P04).',
      prio: 'A'
    },
    {
      id: 'HH-03',
      name: 'Soulspaces Loft (Barmbek)',
      district: 'Barmbek-Süd',
      size: '82 m² Hinterhof-Loft (18 Matten)',
      rate: '140 € / 4h Fr · 175 € Sa/So (inkl. 19% MwSt.)',
      lead: 'Ruhiger Hinterhof im 1. OG ohne Straßenlärm. Hohe Decken, Korkmatten, Bolster & Sitzecke.',
      deal: 'Prio A Backup für Matcha & Matte (P03) sowie Soundbath & Vagusnerv-Reset.',
      prio: 'A'
    },
    {
      id: 'HH-05',
      name: 'Y8 Kunstraum + Yoga e.V.',
      district: 'Eimsbüttel / Rotherbaum',
      size: 'Galerie & Bewegungsraum',
      rate: 'ab 160 € Honorarvereinbarung für Kunstgespräch',
      lead: 'Etablierte Hamburger Kulturinstitution an der Schnittstelle von bildender Kunst und Yoga.',
      deal: 'Schlüssel-Partner (Prio A) für Hafenlicht Offsite (P02) und Kunst-Flows.',
      prio: 'A'
    },
    {
      id: 'HH-07',
      name: 'Iyengar Yoga Zentrum',
      district: 'Eimsbüttel',
      size: '90 m² Studio (24 Matten vorhanden)',
      rate: '238 € / WE (200 € netto) · 135 € Werktag',
      lead: 'Voll ausgestattetes Traditionsstudio mit Holzboden und Seilwänden.',
      deal: 'Prio B Alternativraum für Wochenend-Workshops bei Sonderkontingenten.',
      prio: 'B'
    },
    {
      id: 'HH-08',
      name: 'Khôra Studio',
      district: 'Eimsbüttel / Schanze',
      size: 'Mietstudio für Meditation & Somatik',
      rate: 'auf Anfrage / Kurzfenster',
      lead: 'Minimalistischer Raum im Szene-Umfeld für intime Kleingruppen.',
      deal: 'Prio B für Vagus-Reset & Breathwork-Sessions.',
      prio: 'B'
    },
    {
      id: 'HH-09',
      name: 'Yogaraum Hamburg',
      district: 'Karoviertel / St. Pauli',
      size: 'ca. 170 m² Großraum (bis 40 Matten)',
      rate: '65 € / Std. netto (min. 3h)',
      lead: 'Großzügiges Studio mit vollem Equipment für größere Gruppen & Firmen-Events.',
      deal: 'Prio B für große B2B-Klassen bei separater Kostenübernahme durch Kunden.',
      prio: 'B'
    },
    {
      id: 'HH-20',
      name: 'REINC. Yoga',
      district: 'St. Pauli',
      size: 'ca. 80 m² Studio (20–40 Matten)',
      rate: 'auf Anfrage inkl. Ausrüstung',
      lead: 'Matten und Props komplett im Raum vorhanden, zentrale Lage.',
      deal: 'Prio B für leise Randzeiten-Slots und Abendformate.',
      prio: 'B'
    },
    {
      id: 'mattenplatz-hohenfelde',
      name: 'Mattenplatz (Hohenfelde)',
      district: 'Hohenfelde / Alsternähe',
      size: '90 m² Loft (20–25 Matten)',
      rate: 'ab 50 € / Std.',
      lead: 'Lichtdurchflutetes Loft mit Vollholzboden, komplettem Yoga-Equipment & Teeküche.',
      deal: 'Ideal für Wochenend-Workshops & Runner Recovery Yoga an der Außenalster.',
      prio: 'A'
    },
    {
      id: 'mattenplatz-eilbek',
      name: 'Mattenplatz (Eilbek)',
      district: 'Eilbek',
      size: '50 m² Studio (12–16 Matten)',
      rate: 'ab 35 € / Std.',
      lead: 'Gemütliche Hinterhof-Atmosphäre, barrierefrei, Musikanlage & Tee/Wasser inklusive.',
      deal: 'Perfekt für intime Pilot-Events, Breathwork & Cacao-Zeremonien.',
      prio: 'A'
    },
    {
      id: 'the-shala',
      name: 'The Shala (Eimsbüttel)',
      district: 'Eimsbüttel',
      size: '140 m² Feng-Shui Loft',
      rate: 'ab 79 € / Std.',
      lead: 'Premium-Studio mit warmen Naturmaterialien, Holzbalken & stimmungsvollem Licht.',
      deal: 'Exklusiv für High-End Signature Retreats & Soundbaths.',
      prio: 'B'
    }
  ],

  // ── 2. Spektakuläre Rooftops, B2B-Hubs & Offsite-Flächen ──
  rooftops: [
    {
      id: 'HH-10',
      name: 'betahaus Schanze (Arena & Innospace)',
      district: 'Sternschanze',
      size: '85 m² Workshop-Fläche (bis 30 Personen)',
      rate: '675 € netto halbtags / 1.050 € ganztags (bucht Kunde direkt)',
      lead: 'Führender Hamburger Co-Working- & Innovationshub. Ideale Infrastruktur mit Aufzug und Lounge.',
      focus: 'Prio B: Optimaler Vertriebskanal für Team Reset (P01) & Hafenlicht Offsite (P02).',
      prio: 'B'
    },
    {
      id: 'HH-01',
      name: 'Firmenraum beim Kunden (Mobil)',
      district: 'Hamburg-weit / Inhouse',
      size: 'Besprechungsraum, Foyer oder Lounge (ab 35 m²)',
      rate: '0 € Raumkosten für Elvaria (stellt Kunde)',
      lead: 'Der wirtschaftlich stärkste Hebel: Das komplette Studio kommt direkt ins Unternehmen.',
      focus: 'Prio A: Top-Standard für Team Reset on Site (1.090 € netto / 63,9% DB).',
      prio: 'A'
    },
    {
      id: 'HH-06',
      name: 'Kulturhaus Eidelstedt',
      district: 'Eidelstedt',
      size: 'Kreativraum 76 m² (bis 20 P.) & Raum 7 (95 m²)',
      rate: 'ab 149 € bis 3h (Kategorie A) bzw. 275 €',
      lead: 'Modernes Bürger- und Kulturzentrum mit exzellenter barrierefreier Ausstattung.',
      focus: 'Prio A Kulturort für Hafenlicht Publikum & Stadtteil-Kooperationen.',
      prio: 'A'
    },
    {
      id: 'HH-11',
      name: 'DWCimage Content-Loft',
      district: 'Ottensen',
      size: 'Tageslicht-Atelier & Fotostudio',
      rate: '80–110 € / Std. (nur kundenseitig finanziert)',
      lead: 'Industrie-Charme mit hohen Sprossenfenstern für visuell spektakuläre Shootings.',
      focus: 'Prio B für B2B Kreativ-Offsites mit Medienproduktion.',
      prio: 'B'
    },
    {
      id: 'HH-14',
      name: 'Sturmfreie Bude Elphiblick',
      district: 'HafenCity / Speicherstadt',
      size: '260 m² Innenraum + 180 m² Panoramaterrasse',
      rate: 'auf Anfrage (nur als High-End Kundenoffsite)',
      lead: 'High-End Designlocation mit Blick auf Elbphilharmonie und Hafen.',
      focus: 'Prio C für exklusive B2B VIP-Events und Executive Retreats.',
      prio: 'C'
    },
    {
      id: 'HH-15',
      name: 'Nissis Kunstkantine',
      district: 'HafenCity',
      size: 'Galerie & Hospitality am Kaiserkai',
      rate: 'auf Anfrage / Soft-Hold',
      lead: 'Stilvolle Galerie mit Hafenflair in direkter Elbphilharmonie-Nachbarschaft.',
      focus: 'Prio B für Kunst-Workshops vor Tagesöffnung.',
      prio: 'B'
    },
    {
      id: 'outofoffice',
      name: 'OutOfOffice HafenCity',
      district: 'HafenCity',
      size: '160 m² Dachterrasse + 260 m² Indoor-Loft',
      rate: 'Kundenbuchung',
      lead: 'Spektakulärer 360°-Blick auf Elbphilharmonie & Hafen im 7. Stock.',
      focus: 'Sunset Yoga, B2B Sommerfeste & Firmen-Gesundheitstage.',
      prio: 'B'
    }
  ],

  // ── 3. Erlebnis-, Kultur- & Handwerks-Partner (Das „X“) ──
  experiences: [
    {
      id: 'HH-04',
      name: 'The Chae Bar (Winterhude)',
      category: 'Tee & Matcha-Sensorik',
      location: 'Winterhude & mobil',
      deal: 'Matcha-Lieferant & Portionen (Ziel: 4,25 € netto/Kopf) für Matcha & Matte (P03).',
      prio: 'A'
    },
    {
      id: 'HH-16',
      name: 'PAPER & TEA (Hanseviertel / Überseequartier)',
      category: 'Teezeremonie & Sortenwissen',
      location: 'Neustadt & HafenCity',
      deal: 'Fachbriefing, zeremonieller Bio-Matcha & Zubehör für Verkostungs-Events.',
      prio: 'B'
    },
    {
      id: 'HH-18',
      name: 'smileandpeace Atelier & Café',
      category: 'Keramik & Handaufbau',
      location: 'Ottensen / Altona',
      deal: 'Handaufbau-Workshops für Tonspur (P06) mit Brennservice und Atelier-Abholung.',
      prio: 'B'
    },
    {
      id: 'HH-19',
      name: 'Mindblossom (Winterhude)',
      category: 'Akustik & Sound Healing',
      location: 'Winterhude & mobil',
      deal: 'Kooperation für Kristallklangschalen-Begleitung & Business Sound Baths.',
      prio: 'B'
    },
    {
      id: 'HH-21',
      name: 'LIBERTÉ (Sternschanze)',
      category: 'Tee & Achtsamkeit',
      location: 'Sternschanze',
      deal: 'Benchmark-Partner & Wissensaustausch für Matcha & Yin-Konzepte.',
      prio: 'C'
    },
    {
      id: 'coffee-roasters',
      name: 'Public Coffee Roasters & Elbgold',
      category: 'Specialty Coffee Sensorik',
      location: 'Winterhude & Sternschanze',
      deal: 'Geführtes Barista-Cupping (Aromenrad) vor Ladenöffnung sonntags.',
      prio: 'A'
    },
    {
      id: 'sup-club',
      name: 'SUP CLUB Hamburg am Isekai',
      category: 'Fleet- & Wasser-Yoga',
      location: 'Isekai / Eppendorf',
      deal: '20 feste Yoga-SUP-Boards mit Verankerungsstern im strömungsfreien Fleet.',
      prio: 'B'
    },
    {
      id: 'hfmt-network',
      name: 'HfMT Master-Netzwerk (Handpan, Cello & Harfe)',
      category: 'Akustik & Live-Musik',
      location: 'Hamburg-weit',
      deal: '100% GEMA-freie Eigenkompositionen auf Honorarbasis (ca. 150–220 € / Event).',
      prio: 'A'
    }
  ],

  // ── 4. Equipment-Verleih & Logistik („Studio im Kofferraum“) ──
  equipment: [
    {
      item: '18–24 Premium Event-Matten im Kombi',
      supplier: 'Elvaria eigener Pool / Yogisha Amsterdam (5 € Benchmark)',
      cost: 'ca. 1 € Abschreibung/Matte je Einsatz',
      note: 'Stets trocken gepackt in 3 Mattensäcken für spontane Einsätze.'
    },
    {
      item: 'Silent Disco Funk-Kopfhörer',
      supplier: 'silent-disco.de / Headphone Revolution Hamburg',
      cost: 'ca. 125–140 € / WE (25 Stk. + 3 Sender)',
      note: 'Der Lärmschutz-Joker für Outdoor, Parks & Rooftops ohne Ruhestörungs-Risiko.'
    },
    {
      item: '432 Hz Quarz-Kristallklangschalen',
      supplier: 'Klangschalen Zentrum Hamburg / Meinl Sonic Energy',
      cost: 'Kauf ca. 450–650 € (7-teiliges Set in Schutztaschen)',
      note: 'Höchste Marge im Verleih & Einsatz für Soundbaths ohne Folgekosten.'
    },
    {
      item: 'UV-Schwarzlicht Fluter & Bio-Neonfarben',
      supplier: 'Veranstaltungstechnik Hamburg / UV-Elements',
      cost: 'ca. 40 € / WE oder Einmalkauf 120 € (4x 50W 395nm)',
      note: 'Dermatologisch geprüfte, abwaschbare Bio-Körperfarben für Glow-Events.'
    },
    {
      item: 'Blackroll Mobility & Faszien-Set',
      supplier: 'Blackroll Hamburg Partner / Sport-Thieme',
      cost: 'ca. 180 € für 15er Bundle (Rollen + Duobälle)',
      note: 'Essentiell für Runner Recovery Yoga & B2B Schreibtisch-Entlastung.'
    },
    {
      item: 'Box-Equipment (Focus Mitts & Quickwraps)',
      supplier: 'RDX Sports / Hammer Boxsport Hamburg',
      cost: 'ca. 220 € für 12 Paar Pratzen & waschbare Bandagen',
      note: 'Kontaktloses Pratzentraining ohne Verletzungsgefahr für Flow & Fight.'
    }
  ]
};

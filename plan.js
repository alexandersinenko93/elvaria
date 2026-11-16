/* ═══ PLAN:BEGIN — Quelle ist website/plan.js, hier nicht editieren ═══ */
/* ══════════════════════════════════════════════════════════════════════
   BUSINESSPLAN — Inhalte + Rechenmodell
   Zahlen aus dem Dossier (Kap. 18.3, 26.1–26.5). Sprache: einfach, kurze Sätze.
   ══════════════════════════════════════════════════════════════════════ */

/* ── Rechenmodell ──────────────────────────────────────────────────── */
const MODEL = {
  /* Kosten, die in jedem Fall anfallen (Kap. 26.1) */
  fix: [
    ['Buchungsprogramm Eversports', 59],
    ['Steuerberatung', 220],
    ['Rechnungen & Buchhaltung (Tool)', 30],
    ['Versicherung für Veranstaltungen', 85],
    ['Unfallversicherung für Mitarbeitende (VBG)', 70],
    ['Reinigung, Tee, Verbrauch', 60]
  ],
  /* Was die drei Plan-Varianten an Kosten zusätzlich brauchen:
     Werbung, Fotos, höhere Versicherung, Rücklage.
     Ende bei 1.050 / 1.450 / 2.100 € — exakt die Zeile „Fixkosten" in Kap. 26.2 */
  fixAuf: { konservativ:526, basis:926, ambitioniert:1576 },
  /* Kosten, die mit dem Umsatz wachsen */
  proz: { zahlung:0.02, material:0.12, mentor:0.25 }
};
const FIXSUM = MODEL.fix.reduce((a,x)=>a+x[1],0);   /* = 524 € im Monat */
const KAPAZITAET = 8;   /* so viele Termine schafft eine Person im Monat allein */

/* Eine Planung ausrechnen. a = deine Annahmen */
function calc(a){
  const b2c = a.b2cEvents * a.b2cTN * a.ticket;
  const b2b = a.b2bEvents * a.b2bPreis;
  const verleih = a.verleih;
  const gutschein = a.gutschein;
  const umsatz = b2c + b2b + verleih + gutschein;

  const zahlung = (b2c + verleih + gutschein) * MODEL.proz.zahlung;   /* Firma zahlt auf Rechnung, keine Gebühr */
  const material = (b2c + b2b) * MODEL.proz.material;
  const mentor   = (b2c + b2b) * MODEL.proz.mentor;
  const location = a.b2cEvents * a.location;

  const variabel = zahlung + material + mentor + location;
  const basisFix = FIXSUM + (MODEL.fixAuf[a.scen] || 0);
  const fix = a.fix!==undefined && a.fix!==null ? a.fix : basisFix;
  const ergebnis = umsatz - variabel - fix;

  /* Was von einem Termin übrig bleibt, bevor du davon lebst */
  const dbB2C = a.b2cTN*a.ticket*(1-MODEL.proz.zahlung-MODEL.proz.material-MODEL.proz.mentor) - a.location;
  const dbB2B = a.b2bPreis*(1-MODEL.proz.material-MODEL.proz.mentor);

  return {
    umsatz, b2c, b2b, verleih, gutschein,
    zahlung, material, mentor, location, variabel, fix,
    ergebnis,
    marge: umsatz>0 ? ergebnis/umsatz : 0,
    dbB2C, dbB2B,
    fixPflicht: FIXSUM, fixAuf: MODEL.fixAuf[a.scen] || 0,
    events: a.b2cEvents + a.b2bEvents,
    /* Logistik-Last: offene Termine zählen voll, Firmen-Termine halb — Aufbau beim Kunden */
    last: a.b2cEvents + a.b2bEvents/2, lastMax: KAPAZITAET,
    /* Wie viele Termine brauchst du, damit die Fixkosten drin sind? */
    beB2B: dbB2B>0 ? Math.ceil(fix/dbB2B) : Infinity,
    beB2C: dbB2C>0 ? Math.ceil(fix/dbB2C) : Infinity,
    dbMix: (a.b2cEvents*dbB2C + a.b2bEvents*dbB2B) / Math.max(1, a.b2cEvents + a.b2bEvents),
    beMix: (a.b2cEvents*dbB2C + a.b2bEvents*dbB2B) > 0
      ? Math.ceil(fix / ((a.b2cEvents*dbB2C + a.b2bEvents*dbB2B) / Math.max(1, a.b2cEvents + a.b2bEvents)))
      : Infinity,
    /* Die Zahl aus dem Dossier (Kap. 26.2) zum Vergleich: dort ohne Raum und Gebühren */
    dossier: umsatz*0.63 - fix
  };
}

/* Die drei Varianten aus Kap. 26.2 */
const SCEN = {
  konservativ: {scen:'konservativ', name:'Vorsichtig', b2cEvents:4, b2cTN:20, ticket:35, b2bEvents:2, b2bPreis:1200, location:250, verleih:600, gutschein:300},
  basis:       {scen:'basis', name:'Realistisch', b2cEvents:6, b2cTN:25, ticket:39, b2bEvents:4, b2bPreis:1500, location:120, verleih:1500, gutschein:800},
  ambitioniert:{scen:'ambitioniert', name:'Ehrgeizig', b2cEvents:8, b2cTN:30, ticket:42, b2bEvents:6, b2bPreis:1800, location:80, verleih:3000, gutschein:1500}
};
/* Die Fixkosten stehen gleich in der Variante drin, damit man sie sehen kann */
Object.keys(SCEN).forEach(function(k){ SCEN[k].fix = FIXSUM + MODEL.fixAuf[k]; });

/* ── Wörter, die man erklären muss ─────────────────────────────────── */
const GLOSS = {
  'B2C':      'Privatkunden. Also: du bewirbst einen Termin, viele einzelne Leute kaufen je ein Ticket.',
  'B2B':      'Firmenkunden. Ein Ansprechpartner, eine Rechnung, ein Termin — aber 5- bis 10-mal so viel Geld.',
  'Umsatz':   'Alles Geld, das reinkommt. Noch kein Gewinn — davon gehen erst die Kosten ab.',
  'Deckungsbeitrag':
              'Was von einem Termin übrig bleibt, wenn alle Kosten weg sind, die pro Termin entstehen. Davon bezahlst du deine Fixkosten.',
  'Fixkosten':'Kosten, die auch da sind, wenn du nichts machst. Miete, Versicherung, Steuerberatung.',
  'Marge':    'Wie viel vom Umsatz als Gewinn übrig bleibt. 50 % Marge heißt: von 100 € bleiben 50 €.',
  'Break-even':
              'Der Punkt, ab dem du nicht mehr draufzahlst. „3 Break-even-Events" heißt: ab dem dritten Termin im Monat arbeitest du nicht mehr für die Kosten.',
  'netto':    'Preis ohne Umsatzsteuer. Firmen rechnen netto, Privatleute sehen brutto. In diesem Plan ist alles netto.',
  'Raum-Deal':'Ein Studio verleiht dir seinen Raum günstig oder umsonst, weil du neue Kunden mitbringst. Größter Hebel im ganzen Plan.',
  'Lean':     'Die kleine Version: nur das Nötigste kaufen, alles andere mieten oder weglassen.',
  'VU-Nummer':'Eindeutige Nummer bei Mastercard/Visa. Ohne sie darfst du keine Karten-Zahlungen annehmen. Bekommst du über deinen Zahlungsanbieter.',
  'ZPP':      'Zentrale Prüfstelle Prävention. Die prüft deinen Kurs; ist er durch, zahlen Krankenkassen 75–120 € pro Teilnehmer.',
  'AGB':      'Allgemeine Geschäftsbedingungen: Storno, Haftung, Widerruf. Fehlen sie, kann dich ein Wettbewerber abmahnen.',
  'VBG':      'Berufsgenossenschaft. Gesetzliche Unfallversicherung. Du musst dich anmelden, auch ohne Angestellte.',
  'SGB V § 20b':
              'Der Paragraf, über den Krankenkassen Präventionskurse bezuschussen. Dein Ticket wird dadurch billiger — für die Kunden, nicht für dich.',
  'Förderung':'Geld vom Staat, das du nicht zurückzahlen musst (Zuschuss) oder das sehr günstig geliehen ist (Kredit).',
  'White-Label':
              'Ein anderer verkauft dein Angebot unter seinem Namen. Hotel verkauft „Wellness-Abend", du führst aus.'
};

/* ── Der Plan, Kapitel für Kapitel ─────────────────────────────────── */
const KPI = [
  {v:'7', u:'Schritte', l:'dauert es, bis der erste Euro da ist', n:'Anfangen'},
  {v:'439 €', u:'', l:'bleiben pro offenem Abend übrig, wenn der Raum günstig ist', n:'Kerngeschäft'},
  {v:'1.510 €', u:'', l:'bleiben pro Firmen-Event übrig — bei weniger Arbeit', n:'Bester Termin pro Aufwand'},
  {v:'5.560 €', u:'', l:'Startgeld in der kleinen Variante', n:'Was du brauchst'},
  {v:'—', u:'Events', l:'davon pro Monat, damit du die Kosten deckst', n:'Nötige Termine', live:'beMix'}
];

const PLAN = [
{
  id:'modell', num:'01', t:'Was du eigentlich verkaufst',
  sub:'Dein Angebot, deine Kunden, und warum ohne eigenes Studio',
  say:'Du verkaufst keine Yoga-Stunden. Du verkaufst einen Abend, an dem etwas passiert.',
  gl:['B2C','B2B','Lean','White-Label'],
  blocks:[
    {t:'Die Idee, in drei Sätzen',
     say:'Kein Raum, kein Vertrag, kein Risiko, wenn mal nichts läuft.',
     b:['Du machst Yoga-Abende für Gruppen — mit Boxen, Klang, Atem-Übungen oder VR-Brillen. Ein Termin, ein Ort, ein Preis.',
        'Du hast kein eigenes Studio. Du kommst in die Firma, ins Hotel, in den Hinterhof — oder mietest für einen Abend einen Raum.',
        'Der Vorteil: Ein Studio muss jeden Monat mehrere tausend Euro Miete zurückverdienen. Du musst <b>0 €</b> zurückverdienen.']},
    {t:'Die vier Sachen, die Geld bringen',
     say:'Vier Wege zum selben Ziel. Sie sind nicht gleich viel wert.',
     tab:{h:['Was du verkaufst','Preis','Wer kauft','Wie viel Arbeit'], r:[
        ['Firmen-Event','1.500–1.800 €','Firma bucht für ihre Belegschaft','wenig Werbung, viel Vorbereitung'],
        ['Offener Abend','35–42 € pro Person','einzeln Leute, die du selbst findest','viel Werbung, wenig Vorbereitung'],
        ['Ausrüstung verleihen','25–120 € pro Tag','andere Kursleiter, Hotels','nur Holen und Bringen'],
        ['Gutscheine','25 / 50 / 100 €','Geschenk-Käufer über Plattformen','einmal einrichten, dann läuft es']
      ]}},
    {t:'Wen du zuerst ansprichst',
     say:'Eine Firma zu überzeugen ist billiger als 25 Einzelne.',
     b:['<b>Platz 1: Firmen in Hamburg</b> mit 30 bis 300 Leuten. Die haben Budget für Gesundheit und dürfen 600 € pro Kopf steuerfrei ausgeben. Ein Ansprechpartner, 1.500–1.800 € pro Termin, keine Werbekosten.',
        '<b>Platz 2: Private</b> über Gutscheine und offene Abende. Die zahlen weniger, bringen aber Bewertungen und Mundpropaganda.',
        '<b>Platz 3: Touristen</b> über GetYourGuide. Erst, wenn ein Format nachweislich läuft.']},
    {t:'Warum dich niemand kopiert',
     say:'Du musst nicht besser Yoga unterrichten. Du musst andere Sachen kombinieren.',
     b:['<b>Kombination:</b> In Hamburg bietet kein Studio Yoga plus Boxen plus Klang plus VR. Wer das will, muss zu dir.',
        '<b>Mobil:</b> Du baust beim Kunden auf. Für Firmen ist das der entscheidende Punkt — die wollen niemanden durch die Stadt fahren.',
        '<b>Kein Studio:</b> Deine Preise sind nicht durch Miete nach oben gezwungen.'],
     w:'ok'}
  ],
  next:[['Sag deutlich, dass du mobil bist','„Wir kommen zu Ihnen" gehört auf die erste Seite, nicht ins Kleingedruckte.'],
        ['Leg ein Preisblatt für Firmen an','4 Pakete, netto, eine PDF. Das ist dein wichtigstes Verkaufs-Dokument.']]
},
{
  id:'markt', num:'02', t:'Wer kauft, und wer sonst noch da ist',
  sub:'Die Nachfrage in Hamburg — und die Lücke, die du füllen kannst',
  say:'Es gibt über 200 Yogastudios in Hamburg. Und trotzdem kauft niemand genau das, was du machst.',
  gl:['SGB V § 20b','ZPP','Förderung'],
  blocks:[
    {t:'Vier Signale, dass Nachfrage da ist',
     say:'Das hier ist keine Bauchfrage — es gibt Zahlen dafür.',
     tab:{h:['Was man messen kann','Zahl','Was das für dich heißt'], r:[
        ['Firmen dürfen steuerfrei ausgeben','600 € pro Kopf im Jahr','Der Chef zahlt für dein Event weniger, als wenn er Geld aufs Konto legt'],
        ['Kassen fördern Prävention','~282 Mio. € im Jahr (SGB V § 20b)','Dein Kurs kann für die Teilnehmerin fast gratis sein'],
        ['Ein Kurs mit ZPP-Siegel','75–120 € pro Teilnehmer','Bei 20 Leuten sind das 1.500–2.400 € — ohne dass du teurer werden musst'],
        ['Erwerbstätige in Hamburg','2,1 Mio. Menschen','Wenn 0,5 % davon bei dir buchen: 10.500 mögliche Kunden']
      ]}},
    {t:'Der Wettbewerb — und seine Schwäche',
     say:' Studios haben Räume. Räume kosten Geld. Du hast keine Räume.',
     b:['In Hamburg gibt es über 200 Studios, rund 40 davon bieten auch Firmen etwas an. Die meisten sind an ihren Raum gebunden und können nicht zu dir kommen.',
        '<b>Deine Lücke:</b> Veranstaltungen für 20 bis 60 Personen, die im Haus des Kunden stattfinden, mit mehr als einer Disziplin. In diesem Feld sitzt dir niemand im Weg.'],
     w:'ok'},
    {t:'Wo die Grenze liegt',
     say:'Nach acht Terminen im Monat wirst du schlampig — nicht reicher.',
     b:['Acht Termine im Monat sind das Maximum für eine Person: Raum bestätigen, Material fahren, aufbauen, anleiten, abbauen, reinigen.',
        'Wachsen geht deshalb nicht über <b>mehr Termine</b>, sondern über <b>höhere Preise</b> (Firmen) und <b>Verleihen</b> (Material, das arbeitet, während du schläfst).'],
     w:'warn'}
  ],
  next:[['Drei Studios anfragen, nicht eins','Nur so bekommst du einen echten Vergleich für den Raum-Deal.'],
        ['Firmenliste mit 150 Namen anlegen','Assistentinnen und HR-Leute in Eimsbüttel, Rotherbaum, Ottensen. Ein Blatt, eine Spalte Telefon.']]
},
{
  id:'zahlen', num:'03', t:'Was ein Termin einbringt',
  sub:'Die einzige Zahl, die wirklich zählt: was pro Abend übrig bleibt',
  say:'Ein Abend kann 189 € einbringen oder 1.510 €. Es ist dieselbe Arbeit.',
  gl:['Deckungsbeitrag','netto','Break-even','Raum-Deal'],
  blocks:[
    {t:'Drei Arten von Terminen im Vergleich',
     say:'Unten steht, was wirklich dir gehört. Nicht der Umsatz — das, was übrig bleibt.',
     tab:{h:['','Offener Abend, Raum gemietet','Offener Abend, Raum-Deal','Firmen-Event beim Kunden'], r:[
        ['Was reinkommt','780 € (20 × 39 €)','780 € (20 × 39 €)','1.900 € netto'],
        ['Raum','250 €','0–150 €','0 €'],
        ['Honorar für die zweite Trainerin','180 €','180 €','300 €'],
        ['Material','45 €','45 €','90 €'],
        ['Werbung','60 €','60 €','0 €'],
        ['<b>Übrig bleibt</b>','<b>189 € (24 %)</b>','<b>439 € (56 %)</b>','<b>1.510 € (79 %)</b>']
      ]}},
    {t:'Warum das die wichtigste Zahl ist',
     say:'Am Samstag 189 € zu verdienen ist ein Hobby, kein Geschäft.',
     b:['Ein gemieteter Abend bringt <b>189 €</b>. Dafür opferst du einen Samstag — und das Risiko, dass nur 12 Leute kommen.',
        'Derselbe Abend mit Raum-Deal bringt <b>439 €</b>. Mehr als das Doppelte, ohne einen Cent teurer für die Teilnehmerin. Der einzige Unterschied: der Raum.',
        'Ein Firmen-Event bringt <b>1.510 €</b> — das Achtfache, bei weniger Werbung und ohne Risiko, dass der Termin zu klein besucht ist.'],
     w:'warn'},
    {t:'Deine Preisliste',
     say:'Niedrig einsteigen, teuer enden. Die Probestunde ist kein Angebot, sie ist ein Köder.',
     tab:{h:['Produkt','Preis','Für was das gut ist'], r:[
        ['Probestunde','11 €','Absicherung: nimmt die Angst vor dem ersten Mal'],
        ['Einzelstunde','22,50 €','Vergleichspreis, an dem sich alles andere misst'],
        ['10er-Karte','200 €','Kundschaft binden, Geld früh im Monat haben'],
        ['Monat Abo','105 / 190 €','Planbarkeit — nur sinnvoll mit festem Kursplan'],
        ['Firmen-Event','1.500–1.800 €','Das eigentliche Geschäft'],
        ['Klang-Bad','470–590 €','Abend für 15–25 Personen, wenig Material'],
        ['Gutschein','25 / 50 / 100 €','Geschenk; 3 Jahre gültig, Geld sofort da']
      ]}}
  ],
  next:[['Nur noch Abende planen, bei denen mindestens 400 € übrig bleiben','Alles darunter ist Werbung, kein Umsatz.'],
        ['Den Raum-Deal vor dem ersten Termin klären','Er verdoppelt deine Marge. Das ist die wichtigste Verhandlung im ganzen Jahr.']]
},
{
  id:'finanzen', num:'04', t:'Was es kostet',
  sub:'Startgeld, laufende Kosten, und wie lange du durchhalten musst',
  say:'Du brauchst kein Geld für einen Raum. Du brauchst es für Material, Recht und einen Atemzug Puffer.',
  gl:['Fixkosten','VU-Nummer','Lean','Förderung'],
  blocks:[
    {t:'Was du am Anfang kaufen musst',
     say:'Die kleine Variante reicht für die ersten Monate. Alles andere kannst du mieten.',
     tab:{h:['Wofür','Kleine Variante','Große Variante'], r:[
        ['Matten, Blöcke, Gurt (2 Event-Sets)','2.150 €','4.500 €'],
        ['Klangschalen & Gong','450 €','1.500 €'],
        ['Boxen: Pratzen & Co','160 €','400 €'],
        ['VR-Brillen','— (mieten)','1.800 €'],
        ['Transport (Anhänger, Mietwagen)','600 €','1.200 €'],
        ['Fotos, Website, Aussehen','900 €','1.500 €'],
        ['Versicherung, Anmeldungen, Anwalt für AGB','800 €','1.800 €'],
        ['Puffer, damit dich nichts überrascht','500 €','1.000 €'],
        ['<b>Zusammen</b>','<b>~5.560 €</b>','<b>~14.200 €</b>']
      ]}},
    {t:'Was jeden Monat weg ist, egal ob was läuft',
     say:'Das sind 524 € Pflicht. Alles darüber ist Entscheidung.',
     tab:{h:['Posten','pro Monat','Art'], r: MODEL.fix.map(([n,v])=>[n, v+' €','immer']).concat([
        ['Gebühr je Kartenzahlung','2 %','nur wenn Geld fließt'],
        ['Material','12 %','nur wenn ein Termin stattfindet'],
        ['Zweite Trainerin','25 %','nur wenn ein Termin stattfindet']
      ])}},
    {t:'Geld vom Staat, das du nicht zurückzahlst',
     say:'Zwei davon sind realistisch. Der Rest ist schön, aber passt nicht zu einem Yoga-Unternehmen.',
     tab:{h:['Quelle','Wie viel','Was du dafür brauchst'], r:[
        ['Gründungszuschuss (Agentur für Arbeit)','bis ~20.000 € über 15 Monate, steuerfrei','ALG-I-Anspruch von mindestens 150 Tagen'],
        ['Hamburg-Kredit Mikro (IFB)','bis 25.000 €','über deine Bank, Businessplan nötig'],
        ['InnoFounder','45.000 €','nur wenn es wissenschaftlich-neu ist — schwierig hier'],
        ['hei — Existenzgründungsberatung Hamburg','0 € (kostenlos)','für alle, die gründen. Beratung, keine Zahlung.']
      ]}},
    {t:'Der ehrliche Realitätscheck',
     say:'Ein Yoga-Event-Unternehmen ist nicht „innovativ" im Sinne der Förderprogramme. Versuch es trotzdem — die Beratung ist gratis.',
     b:['Realistisch sind <b>Gründungszuschuss</b>, <b>Hamburg-Kredit Mikro</b> und die kostenlose <b>hei</b>-Beratung.',
        'Für Förderfähigkeit spricht: digitale Buchung, Vertrieb über Plattformen, Verleih an Hotels unter deren Namen. Das lässt sich als wissensbasiertes Modell verkaufen — garantieren kann es niemand.'],
     w:'warn'},
    {t:'Was du in Kapitel 26.2 nachlesen kannst',
     say:'Der Rechner oben auf der Seite rechnet genau diese Zahlen — mit zwei Unterschieden.',
     b:['Das Dossier sagt für die realistische Variante <b>~7.460 €</b> im Monat. Der Rechner hier zeigt <b>7.433 €</b>.',
        'Der Grund: Das Dossier rechnet Raum und Zahlungsgebühren in die Fixkosten, dieser Plan rechnet sie pro Termin. Das Ergebnis ist fast gleich, der Weg ist ehrlicher.']
    }
  ],
  next:[['Entscheide vor dem 1.12.: kleine oder große Variante','Ab 5.560 € kannst du starten. Alles darüber ist Wunsch.'],
        ['Termin bei hei buchen','Kostenlose Beratung, zwei Wochen Wartezeit. Der beste Termin, den du diese Woche bekommen kannst.']]
},
{
  id:'plan', num:'05', t:'Was du wann tust',
  sub:'90 Tage, Woche für Woche — und die Reihenfolge, die alles blockiert',
  say:'Fang mit dem an, was heute Geld bringt und heute möglich ist. Nicht mit dem, was am spannendsten klingt.',
  gl:['VU-Nummer','AGB','ZPP'],
  blocks:[
    {t:'Die Reihenfolge, die wirklich zählt',
     say:'Drei Stapel. Erst das Geld, dann das Recht, dann die Geduld.',
     b:['<b>Stapel 1 — diese Woche, nichts nötig:</b> Gutschein-Seite an. Dauert zwei Stunden, kostet nichts, bringt sofort Geld.',
        '<b>Stapel 2 — bevor du groß wirbst:</b> AGB und Widerruf. 300–600 €. Ohne sie darfst du eigentlich nichts verkaufen.',
        '<b>Stapel 3 — braucht Vorlauf:</b> Bewerbungen bei Plattformen, Versicherung, VU-Nummer. Du kannst sie anschieben, aber nicht beschleunigen.']},
    {t:'Die ersten 90 Tage',
     say:'Eine Spalte ist Aufgabe, eine Spalte ist das, womit du fertig bist. Nicht mehr.',
     tab:{h:['Woche','Was du tust','Womit du fertig bist'], r:[
        ['1','Gutschein-Seite an die Website','testweise gekauft, Geld da'],
        ['2','AGB und Widerruf schreiben lassen','Seite rechtssicher'],
        ['3','Bei zwei Gutschein-Plattformen bewerben','zwei Bewerbungen draußen'],
        ['4','Zahlungsanbieter und VU-Nummer','Karten gehen'],
        ['5–6','Website mit Filtern und Antworten','Verkaufs-ready'],
        ['7','Erste Firma anschreiben','ein Angebot draußen'],
        ['8–9','Erster Abend mit Raum-Deal','Deckungsbeitrag zum ersten Mal gemessen'],
        ['10','Präventionskurs einreichen (ZPP)','Unterlagen weg'],
        ['11–12','Bewerbung bei GetYourGuide','Produkt online'],
        ['13','Quartal anschauen','Entscheidung für Q2']
      ]}},
    {t:'Die Kapazitätsgrenze',
     say:'Der Fehler, den hier alle machen: zu viele Termine annehmen.',
     b:['Bei <b>acht Terminen im Monat</b> ist die Logistik am Ende — nicht die Nachfrage.',
        'Das Ziel ist deshalb nicht „mehr Termine", sondern <b>mehr Geld pro Termin</b>: Firmen statt privat, verleihen statt selbst machen.']
     ,w:'warn'}
  ],
  next:[['Jeden Freitag 20 Minuten: Liste abhaken','Der Startguide auf der Startseite hat die Häkchen schon. Nur nicht am Montag anfangen — am Freitag schauen, was fehlt.'],
        ['Echte Zahlen aufschreiben, ab Tag 1','Was reinkam, was weg war. Nach vier Wochen weißt du, ob dein Plan oder der vom Dossier recht hat.']]
},
{
  id:'risiko', num:'06', t:'Was schiefgehen kann',
  sub:'Fünf echte Risiken — und was du tust, wenn es passiert',
  say:'Es gibt hier nichts, was dich ruinieren muss. Außer zwei Dingen. Die stehen unten.',
  gl:['AGB','Fixkosten'],
  blocks:[
    {t:'Die fünf Risiken, sortiert nach Schaden',
     say:'Zwei davon kannst du mit Geld abräumen. Zwei mit Disziplin.',
     tab:{h:['Was passieren kann','Wie wahrscheinlich','Was es kostet','Was du dagegen tust'], r:[
        ['Kein Raum-Deal zustande','mittel','Marge fällt von 56 % auf 24 %','Drei Studios gleichzeitig anfragen, nicht eins nach dem anderen'],
        ['Unfall auf deinem Event, ohne Versicherung','niedrig','kann die Existenz kosten','Versicherung für Veranstalter — vor dem ersten Termin, nicht danach'],
        ['Firma sagt kurzfristig ab','mittel','Plan fällt auf privat zurück','Zwei Firmen-Termine im Monat als Minimum, nicht als Ziel'],
        ['Mehr als acht Termine','sicher ab Nr. 9','Qualität leidet, Bewertungen fallen','Ab dem 9. Termin jemanden für Aufbau und Transport bezahlen'],
        ['AGB fehlen oder falsch','mittel','Abmahnung, Rückabwicklung','Anwalt prüfen lassen, 300–600 € — einmal']
      ]}},
    {t:'Woran du nach drei Monaten siehst, dass es nicht trägt',
     say:'Drei Warnsignale. Eines davon reicht, um umzubauen.',
     tab:{h:['Warnsignal','Was es bedeutet','Was du dann änderst'], r:[
        ['Unter 300 € pro Termin','Dein Raum-Deal existiert nicht oder deine Preise sind zu niedrig','Preise erhöhen oder Terminformat wechseln'],
        ['Kein Firmen-Termin nach 12 Wochen','Deine Ansprache ist falsch, nicht dein Produkt','Pakete kleiner machen (12 Personen, 750 €) und per Telefon statt Mail'],
        ['Du arbeitest jeden Abend','Kein Puffer, keine Fehler erlaubt','Termine pro Monat deckeln — Umsatz weg, Gesundheit nicht']
      ]}},
    {t:'Was dieser Plan nicht ist',
     say:'Kein Wachstumsmärchen. Ein Plan für ein gutes Einkommen mit klarer Obergrenze.',
     b:['<b>Kein Studio.</b> Keine Miete, kein Kursplan, keine Bindung an einen Ort. Wer das anders rechnet, rechnet sich arm.',
        '<b>Kein Skalierungsgeschäft.</b> Es wächst über Preis und Verleih, nicht über Abende pro Woche.',
        '<b>Kein passives Einkommen.</b> Gutscheine kommen dem am nächsten — und brauchen trotzdem zweimal im Jahr Pflege.']
     ,w:'warn'}
  ],
  next:[['Setz dir einen Prüftermin für Ende März','Ohne Termin hörst du auf, wenn es am teuer ist. Mit Termin entscheidest du in Ruhe.'],
        ['Die zwei teuren Risiken sofort abräumen','Versicherung und AGB. Zusammen unter 2.000 €. Alles andere im Plan kann warten.']]
}
];

/* ── Meilensteine ──────────────────────────────────────────────────── */
const MILESTONES = [
  {w:'Woche 1–2', t:'Verkaufen dürfen', d:'Gutschein-Seite läuft. AGB und Widerruf sind online. Ab hier ist alles legal.'},
  {w:'Woche 3–4', t:'Erste Kanäle offen', d:'Bei zwei Gutschein-Plattformen beworben, VU-Nummer geklärt, Versicherungen angemeldet.'},
  {w:'Woche 5–7', t:'Erstes echte Geld', d:'Erste Firma hat angefragt oder gebucht. Erster offener Abend mit günstigem Raum ist gelaufen.'},
  {w:'Woche 8–10', t:'Krankenkassen Weg offen', d:'Antrag für Präventionskurs eingereicht. Danach kostet dein Kurs die Teilnehmerin fast nichts mehr.'},
  {w:'Woche 11–13', t:'Zweiter Vertriebsweg', d:'Angebot auf einem Reise-Portal online, erste Bewertung. Unabhängig von deiner eigenen Seite.'},
  {w:'Monat 4–6', t:'Es trägt sich', d:'Sechs Termine im Monat, davon drei mit Firmen. Du zahlst deine Kosten aus dem Geschäft.'},
  {w:'Monat 7–12', t:'Zweites Standbein', d:'Material verleihen wird zur eigenen Einnahme. Hotels verkaufen deine Abende unter ihrem Namen.'}
];

/* ── Das Urteil über eine Rechnung ─────────────────────────────────── */
function verdict(r,a){
  const line=[];
  let tone='ok', title;
  if(r.ergebnis<=0){
    tone='bad'; title='So trägt es noch nicht.';
    line.push('Du zahlst im Monat '+EUR0(-r.ergebnis)+' aus eigener Tasche drauf.');
    line.push('Es fehlt nicht an Werbung, es fehlt an Geld pro Termin. Raum-Deal klären oder Firmen-Termine vorziehen.');
  } else if(r.marge<0.3 || r.last>r.lastMax){
    tone='mid'; title='Es trägt — aber ohne Luft.';
    line.push('Nach allen Kosten bleiben '+EUR0(r.ergebnis)+' im Monat. Davon kannst du leben, wenn nichts kaputtgeht.');
    if(r.last>r.lastMax) line.push('Achtung: Du planst '+Math.round(r.last*10)/10+' Einheiten Logistik — möglich sind '+r.lastMax+'.');
    line.push('Der schnellste Hebel: ein Firmen-Termin zusätzlich. Das bringt rund '+EUR0(r.dbB2B)+'.');
  } else {
    tone='ok'; title='Das Modell funktioniert.';
    line.push('Nach allen Kosten bleiben '+EUR0(r.ergebnis)+' im Monat, das sind '+Math.round(r.marge*100)+' % vom Umsatz.');
    line.push('Du brauchst '+r.beMix+' Termine im Monat, um die Kosten zu decken — geplant sind '+(r.events)+'.');
    line.push('Größter Hebel bleibt der Firmen-Anteil: +1 Termin = rund '+EUR0(r.dbB2B)+'.');
  }
  return {tone:tone,title:title,lines:line};
}
function EUR0(v){ return new Intl.NumberFormat('de-DE',{maximumFractionDigits:0}).format(Math.round(Math.abs(v)))+' €'; }

/* ── Der Assistent: Fragen, die deine Zahlen ergeben ────────────────── */
const WIZ = [
  {id:'anfang', kind:'multi',
   q:'Was davon willst du wirklich machen?',
   help:'Hak ab, was für dich passt. Alles andere frag ich dich gar nicht erst.',
   why:'Weil ein Plan mit vier Geschäftsteilen und null Erfahrung nicht funktioniert. Fang mit ein oder zwei an.',
   opts:[
     {t:'Offene Abende für alle',d:'Du bewirbst einen Termin, einzelne kaufen Tickets.',set:{on_b2c:true}},
     {t:'Events für Firmen',d:'Ein Ansprechpartner, eine Rechnung, viel Geld pro Termin.',set:{on_b2b:true}},
     {t:'Material verleihen',d:'Matten, Klangschalen, VR-Brillen tageweise.',set:{on_verleih:true}},
     {t:'Gutscheine verkaufen',d:'Über Plattformen, 25–100 €, Geld sofort.',set:{on_gutschein:true}}
   ]},
  {id:'gutschein', kind:'pick', need:'on_gutschein',
   q:'Wie viel Gutschein-Umsatz erwartest du im Monat?',
   help:'Gutscheine laufen über Plattformen. Du machst nichts außer einmal einrichten.',
   why:'Weil das der einzige Teil ist, der wirklich nebenbei läuft — und weil er im ersten Monat Geld bringt, bevor dein erster Termin stattgefunden hat.',
   field:'gutschein',
   opts:[
     {t:'Nur die eigene Website',d:'zurückhaltend gerechnet',v:300},
     {t:'Website + 2 Plattformen',d:'so rechnet der Plan',v:800},
     {t:'Website + 4 Plattformen + Firmen-Weihnachten',d:'läuft gut',v:1500},
     {t:'Noch nicht sicher',d:'ich rechne mit der Mitte',v:800}
   ]},
  {id:'verleih', kind:'pick', need:'on_verleih',
   q:'Wie oft im Monat geht Material raus?',
   help:'Ein Set bringt je nach Größe 25–120 € pro Tag. Du holst ab und bringst zurück.',
   why:'Weil Verleih keine Trainerin braucht: Material arbeitet, du nicht.',
   field:'verleih',
   opts:[
     {t:'1–2 Ausleihen',d:'500–700 €',v:600},
     {t:'3–5 Ausleihen',d:'1.200–1.800 €',v:1500},
     {t:'6 oder mehr',d:'ab 2.500 €, dann aber Second-Hand-Material kaufen',v:3000},
     {t:'Erstmal nicht',d:'sonst zerreißt dich die Logistik',v:0}
   ]},
  {id:'groesse', kind:'range', need:'on_b2c',
   q:'Wie viele Leute kommen zu einem offenen Abend?',
   help:'Ein normaler Kurs hat 12–18 Leute. Ein Event-Abend mit Rahmenprogramm 20–35.',
   why:'Weil ab ca. 25 Leuten die zweite Trainerin Pflicht wird — und die kostet 25 % vom Umsatz.',
   field:'b2cTN', min:6, max:60, step:1, unit:'Pers.',
   presets:[['Kleiner Kreis',15],['Wie im Plan',25],['Großer Abend',35]]},
  {id:'preis', kind:'range', need:'on_b2c',
   q:'Was soll eine Person bezahlen?',
   help:'Zum Vergleich: Einzelstunde im Studio 22,50 €. Dein Abend ist länger, seltener und ein Erlebnis.',
   why:'Weil der Preis der einfachste Hebel ist: +5 € pro Ticket sind bei 25 Leuten 125 € mehr pro Termin — ohne einen Cent Mehrkosten.',
   field:'ticket', min:11, max:80, step:1, unit:'€',
   presets:[['Probestunde',11],['Studio-Niveau',22],['Event-Preis',39],['Premium',55]]},
  {id:'raum', kind:'pick', need:'on_b2c',
   q:'Was kostet dich der Raum für einen Abend?',
   help:'Das ist die Frage, über die du zuerst verhandeln musst. Nicht die zweitte.',
   why:'Sie entscheidet, ob dein Abend 189 € oder 439 € einbringt. Derselbe Aufwand.',
   field:'location', unit:'€',
   opts:[
     {t:'Günstig oder gratis, weil ich neue Kunden mitbringe',d:'der Raum-Deal — so rechnet der Plan',v:120},
     {t:'Normal gemietet',d:'200–300 € pro Abend',v:250},
     {t:'Firmenraum, Hotel-Saal — 0 €',d:'die Firma stellt den Raum',v:0},
     {t:'Weiß ich noch nicht',d:'dann rechne ich mit dem teureren Fall',v:250}
   ]},
  {id:'haeufig', kind:'range', need:'on_b2c',
   q:'Wie viele offene Abende pro Monat?',
   help:'Hoch ist nicht besser. Ab acht Terminen im Monat (alle Arten zusammen) leidet die Qualität.',
   why:'Weil das die einzige Zahl ist, die du wirklich selbst in der Hand hast — und weil Überlastung hier der häufigste Grund fürs Aufgeben ist.',
   field:'b2cEvents', min:0, max:12, step:1, unit:'Abende'},
  {id:'firma', kind:'pick', need:'on_b2b',
   q:'Was kostet ein Firmen-Event bei dir?',
   help:'Üblicher Rahmen in Hamburg: 1.200–1.800 € für 20–40 Personen, zwei Stunden, alles inklusive.',
   why:'Weil hier die Marge am höchsten ist: 79 % bleiben übrig, weil keine Werbung und kein Raum dazwischen sind.',
   field:'b2bPreis', unit:'€',
   opts:[
     {t:'Kleines Paket, 12–20 Personen',d:'einfach anzunehmen, schnell gebucht',v:1200},
     {t:'Standard, ca. 30 Personen',d:'so rechnet der Plan',v:1500},
     {t:'Großes Paket mit Verpflegung/Technik',d:'braucht mehr Vorbereitung',v:1800},
     {t:'Angebot auf Anfrage',d:'ich rechne mit der Mitte',v:1500}
   ]},
  {id:'firmazahl', kind:'range', need:'on_b2b',
   q:'Wie viele Firmen-Termine schaffst du im Monat?',
   help:'Zwei ist realistisch im ersten Quartal. Jeder bringt rund 945 € Deckungsbeitrag.',
   why:'Weil ein einziger extra Firmen-Termin mehr bringt als fünf zusätzliche Tickets beim offenen Abend.',
   field:'b2bEvents', min:0, max:12, step:1, unit:'Termine'},
  {id:'kosten', kind:'check',
   q:'Was davon willst du wirklich ausgeben?',
   help:'Pflicht ist schon drin: 524 € im Monat für Buchhaltung, Versicherung, Beratung und Verbrauch.',
   why:'Weil die meisten Pläne an den Kosten sterben, nicht am Umsatz. Was du hier abwählst, ist ein bewusster Verzicht — kein Versehen.',
   field:'fixZusatz',
   opts:[
     {t:'Nur das Nötigste, nichts dazu',d:'so startest du, wenn das Geld knapp ist',v:0,keep:true},
     {t:'Testwerbung bei Google',d:'0,80–2,50 € pro Klick, erst ab 200 € sinnvoll',v:300},
     {t:'Fotograf für einen Abend',d:'ohne Bilder verkauft nichts',v:200},
     {t:'Höhere Versicherungssumme',d:'teurer, aber ohne Sorge bei 40 Personen',v:40},
     {t:'Zweite Kraft für Aufbau & Transport',d:'ab dem 9. Termin nötig',v:450},
     {t:'Nur das Nötigste',d:'Grundausstattung, nichts extra',v:0,keep:true}
   ]},
  {id:'papier', kind:'check',
   q:'Was hast du schon erledigt?',
   help:'Das ist keine Wissensfrage. Das ist deine To-do-Liste für die nächsten vier Wochen.',
   why:'Weil drei dieser Punkte dir Geld oder Erlaubnis kosten, wenn du sie vergisst — und drei von ihnen blockieren alles andere.',
   field:'erledigt', plain:true,
   opts:[
     {t:'Gewerbe angemeldet',d:'20–60 € einmalig',c:40,block:'blockiert: nichts — aber ohne kein Finanzamt'},
     {t:'Versicherung für Veranstalter',d:'720–1.320 € im Jahr',c:1020,block:'blockiert: jeden Termin mit Publikum'},
     {t:'AGB und Widerruf online',d:'300–600 € beim Anwalt',c:450,block:'blockiert: gewerblichen Verkauf von Gutscheinen'},
     {t:'VU-Nummer geklärt',d:'0 €, über den Zahlungsanbieter',c:0,block:'blockiert: Kartenzahlung bei Plattformen'},
     {t:'Zahlungsanbieter eingerichtet',d:'ca. 1,4–2,9 % pro Buchung',c:0,block:'blockiert: Geldfluss'},
     {t:'Unfallversicherung (VBG) angemeldet',d:'Beitrag nach Entgelt',c:70,block:'Pflicht, auch ohne Angestellte'},
     {t:'Raum für die ersten drei Abende gesichert',d:'0–250 € pro Abend',c:0,block:'blockiert: offene Abende'},
     {t:'Preisblatt für Firmen als PDF',d:'0 €, zwei Stunden Arbeit',c:0,block:'blockiert: Firmen-Akquise'}
   ]},
  {id:'fertig', kind:'out',
   q:'Dein Plan. In einem Blatt.',
   help:'Unten stehen deine Zahlen, was du als Nächstes tust und wo du sie nachlesen kannst.'}
];
/* ═══ PLAN:END ═══ */

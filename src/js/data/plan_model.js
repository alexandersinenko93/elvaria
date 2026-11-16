/**
 * ELVARIA Business Plan — Core Financial Model & Calculation Engine
 * Source: Dossier Kap. 18.3, 26.1–26.5
 */
const MODEL = {
  /* Fixkosten, die in jedem Fall anfallen (Kap. 26.1) */
  fix: [
    ['Buchungsprogramm Eversports', 59],
    ['Steuerberatung', 220],
    ['Rechnungen & Buchhaltung (Tool)', 30],
    ['Versicherung für Veranstaltungen', 85],
    ['Unfallversicherung für Mitarbeitende (VBG)', 70],
    ['Reinigung, Tee, Verbrauch', 60]
  ],
  /* Varianten-Aufschläge für Werbung, Fotos, Rücklage */
  fixAuf: { konservativ: 526, basis: 926, ambitioniert: 1576 },
  /* Variable Kosten in % vom Umsatz */
  proz: { zahlung: 0.02, material: 0.12, mentor: 0.25 }
};

const FIXSUM = MODEL.fix.reduce((a, x) => a + x[1], 0); /* = 524 € Pflicht */
const KAPAZITAET = 8; /* max. Monatsevents für eine Soloperson */

/* Rechnet ein Szenario oder individuelle Annahmen aus */
function calc(a) {
  if (!a) a = SCEN.basis;
  const b2c = (a.b2cEvents || 0) * (a.b2cTN || 0) * (a.ticket || 0);
  const b2b = (a.b2bEvents || 0) * (a.b2bPreis || 0);
  const verleih = a.verleih || 0;
  const gutschein = a.gutschein || 0;
  const umsatz = b2c + b2b + verleih + gutschein;

  const zahlung = (b2c + verleih + gutschein) * MODEL.proz.zahlung;
  const material = (b2c + b2b) * MODEL.proz.material;
  const mentor   = (b2c + b2b) * MODEL.proz.mentor;
  const location = (a.b2cEvents || 0) * (a.location || 0);

  const variabel = zahlung + material + mentor + location;
  const basisFix = FIXSUM + (MODEL.fixAuf[a.scen] || 0);
  const fix = a.fix !== undefined && a.fix !== null ? a.fix : basisFix;
  const ergebnis = umsatz - variabel - fix;

  /* Deckungsbeitrag pro Event */
  const dbB2C = (a.b2cTN || 0) * (a.ticket || 0) * (1 - MODEL.proz.zahlung - MODEL.proz.material - MODEL.proz.mentor) - (a.location || 0);
  const dbB2B = (a.b2bPreis || 0) * (1 - MODEL.proz.material - MODEL.proz.mentor);

  return {
    umsatz, b2c, b2b, verleih, gutschein,
    zahlung, material, mentor, location, variabel, fix,
    ergebnis,
    marge: umsatz > 0 ? ergebnis / umsatz : 0,
    dbB2C, dbB2B,
    fixPflicht: FIXSUM, fixAuf: MODEL.fixAuf[a.scen] || 0,
    events: (a.b2cEvents || 0) + (a.b2bEvents || 0),
    last: (a.b2cEvents || 0) + (a.b2bEvents || 0) / 2, lastMax: KAPAZITAET,
    beB2B: dbB2B > 0 ? Math.ceil(fix / dbB2B) : Infinity,
    beB2C: dbB2C > 0 ? Math.ceil(fix / dbB2C) : Infinity,
    dbMix: ((a.b2cEvents || 0) * dbB2C + (a.b2bEvents || 0) * dbB2B) / Math.max(1, (a.b2cEvents || 0) + (a.b2bEvents || 0)),
    beMix: ((a.b2cEvents || 0) * dbB2C + (a.b2bEvents || 0) * dbB2B) > 0
      ? Math.ceil(fix / (((a.b2cEvents || 0) * dbB2C + (a.b2bEvents || 0) * dbB2B) / Math.max(1, (a.b2cEvents || 0) + (a.b2bEvents || 0))))
      : Infinity,
    dossier: umsatz * 0.63 - fix
  };
}

/* Die drei Referenz-Szenarien aus Kap. 26.2 */
const SCEN = {
  konservativ: { scen: 'konservativ', name: 'Vorsichtig', b2cEvents: 4, b2cTN: 20, ticket: 35, b2bEvents: 2, b2bPreis: 1200, location: 250, verleih: 600, gutschein: 300 },
  basis:       { scen: 'basis', name: 'Realistisch', b2cEvents: 6, b2cTN: 25, ticket: 39, b2bEvents: 4, b2bPreis: 1500, location: 120, verleih: 1500, gutschein: 800 },
  ambitioniert:{ scen: 'ambitioniert', name: 'Ehrgeizig', b2cEvents: 8, b2cTN: 30, ticket: 42, b2bEvents: 6, b2bPreis: 1800, location: 80, verleih: 3000, gutschein: 1500 }
};
Object.keys(SCEN).forEach(k => { SCEN[k].fix = FIXSUM + MODEL.fixAuf[k]; });

/* Glossar wichtiger Fachbegriffe */
const GLOSS = {
  'B2C': 'Privatkunden. Du bewirbst einen Termin, einzelne Personen kaufen ein Ticket.',
  'B2B': 'Firmenkunden. Ein Ansprechpartner, eine Rechnung — aber 5- bis 10-facher Ertrag.',
  'Umsatz': 'Alles Geld, das reinkommt. Noch kein Gewinn — davon gehen erst Kosten ab.',
  'Deckungsbeitrag': 'Was von einem Event nach variablen Kosten bleibt zur Deckung der Fixkosten.',
  'Fixkosten': 'Kosten, die unabhängig von Events jeden Monat anfallen (Tools, Steuerberater, Versicherung).',
  'Marge': 'Prozentualer Anteil des Gewinns am Umsatz.',
  'Break-even': 'Punkt, ab dem alle Kosten gedeckt sind und echter Gewinn beginnt.',
  'netto': 'Preis ohne Umsatzsteuer. Im Plan wird durchgehend netto gerechnet.',
  'Raum-Deal': 'Kooperation mit einem Studio: günstiger Raum gegen Neukundenzulauf.',
  'Lean': 'Nur das Nötigste anschaffen, den Rest mieten oder leihen.',
  'VU-Nummer': 'Vertragsunternehmen-Nummer für Kartenzahlungen über Visa/Mastercard.',
  'ZPP': 'Zentrale Prüfstelle Prävention für Krankenkassen-Zuschüsse.',
  'AGB': 'Allgemeine Geschäftsbedingungen mit Storno- und Haftungsregeln.',
  'VBG': 'Gesetzliche Unfallversicherung (Berufsgenossenschaft).',
  'SGB V § 20b': 'Gesetzliche Grundlage für bezuschusste Präventionskurse.',
  'Förderung': 'Staatliche Zuschüsse (z.B. Gründungszuschuss) ohne Rückzahlung.',
  'White-Label': 'Durchführung von Events unter der Marke eines Partners (z.B. Hotel).'
};

/* Live-KPI Schablone */
const KPI = [
  { v: '7', u: 'Schritte', l: 'dauert es, bis der erste Euro da ist', n: 'Anfangen' },
  { v: '439 €', u: '', l: 'bleiben pro offenem Abend übrig, wenn der Raum günstig ist', n: 'Kerngeschäft' },
  { v: '1.510 €', u: '', l: 'bleiben pro Firmen-Event übrig — bei weniger Arbeit', n: 'Bester Termin pro Aufwand' },
  { v: '5.560 €', u: '', l: 'Startgeld in der kleinen Variante', n: 'Was du brauchst' },
  { v: '—', u: 'Events', l: 'davon pro Monat, damit du die Kosten deckst', n: 'Nötige Termine', live: 'beMix' }
];

/* Bewertung eines Rechenergebnisses */
function verdict(r, a) {
  if (r.ergebnis < 0) {
    return { cls: 'bad', t: 'Du zahlst jeden Monat drauf', d: 'Die Einnahmen reichen nicht für Fixkosten und Helfer. Erhöhe B2B-Termine oder senke Raummiete.' };
  }
  if (r.last > KAPAZITAET) {
    return { cls: 'warn', t: 'Zu viel Arbeit für eine Person', d: 'Mehr als 8 Events im Monat schaffst du allein nicht ohne Burnout. Delegiere oder nimm höhere Preise.' };
  }
  if (r.ergebnis > 5000) {
    return { cls: 'good', t: 'Tragfähiges Haupteinkommen', d: 'Der Plan wirft nach allen Kosten ein solides Einkommen ab. B2B trägt das Fundament.' };
  }
  return { cls: 'mid', t: 'Gutes Nebeneinkommen', d: 'Deckung ist da, aber noch Puffer für Durststrecken einplanen.' };
}

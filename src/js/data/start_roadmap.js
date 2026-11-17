/**
 * ELVARIA Start Roadmap (7 Steps & Beginner FAQ)
 * Sequentieller 7-Schritte-Fahrplan bis zum ersten Event & Euro
 */
const START = [
{
  id: 'st-1', n:1, phase:'Phase 1 · Fundament', woche:'Diese Woche', dauer:'2 Stunden',
  title:'Eversports Voucher-Widget aktivieren',
  desc:'Direkter Wertgutschein-Verkauf ohne Kursbindung und 0 % Zusatzprovision über das bereits vorhandene Eversports-System.',
  tasks:['Eversports-Manager öffnen (Einstellungen → Widgets)','Vouchers Widget aktivieren','Gutschein-Seite auf Website einbinden'],
  go:{kind:'p',id:'ev'}, goText:'Anleitung öffnen'
},
{
  id: 'st-2', n:2, phase:'Phase 1 · Fundament', woche:'Diese Woche', dauer:'2 Stunden',
  title:'AGB & Widerrufsbelehrung rechtssicher anlegen',
  desc:'Rechtliche Grundvoraussetzung: 6 der 14 Gutscheinplattformen verlangen zwingend geprüfte AGB und Widerrufsbelehrung.',
  tasks:['AGB für Event- & Gutscheinverkauf anpassen (§ 195 BGB 3 Jahre)','HWG-konforme Klauseln (keine Heilbehandlung)','Unter /agb und /widerruf veröffentlichen'],
  go:{kind:'p',id:'wu'}, goText:'Warum das Pflicht ist'
},
{
  id: 'st-3', n:3, phase:'Phase 2 · Sachbezug', woche:'Diese Woche', dauer:'30 Minuten',
  title:'VU-Nummer (Vertragsunternehmensnummer) klären',
  desc:'Schlüsselfaktor für Kartenplattformen (Edenred, Pluxee, givve): Terminal- oder Online-Händlerkennung bereitstellen.',
  tasks:['Kreditkartenabrechnung von Eversports/Stripe prüfen','VU-Nummer beim Zahlungsdienstleister erfragen','Für Edenred, Pluxee & givve notieren'],
  go:{kind:'p',id:'gv'}, goText:'Karten-Weg prüfen'
},
{
  id: 'st-4', n:4, phase:'Phase 3 · Netzwerke', woche:'Nächste Woche', dauer:'15 Minuten',
  title:'Bei ATENTO Städtegutschein registrieren',
  desc:'Supermarkt-Präsenz (REWE, PENNY) in 400+ Städten. Selbstregistrierung mit eigener Yoga-Kategorie.',
  tasks:['app.atento.me/join aufrufen','Kategorie Yoga & Wellness wählen','Gutscheinwerte (15/25/50 €) anlegen'],
  go:{kind:'p',id:'at'}, goText:'Onboarding öffnen'
},
{
  id: 'st-5', n:5, phase:'Phase 3 · Netzwerke', woche:'Nächste Woche', dauer:'2 Stunden',
  title:'WUNSCHGUTSCHEIN & Corporate Benefits bewerben',
  desc:'Supermarkt-Netzwerk (>95.000 Verkaufsstellen) & B2B-Mitarbeitervorteile (17,7 Mio. Nutzer bei DAX-Konzernen).',
  tasks:['Gutschein-Codes im Eversports-System generieren','Logo im Vektor-Format (EPS/SVG) bereitstellen','Beide Antragsformulare abschicken'],
  go:{kind:'p',id:'wu'}, goText:'Wunschgutschein Guide'
},
{
  id: 'st-6', n:6, phase:'Phase 4 · Erlebnismärkte', woche:'Monat 1–2', dauer:'2 Tage',
  title:'Versicherung erweitern & Erlebnis-Portale live schalten',
  desc:'GetYourGuide & gokonfetti aktivieren. Veranstalterhaftpflicht inklusive Boxen/Aktivitäten prüfen.',
  tasks:['Betriebshaftpflicht um körperliche Events (Padwork) erweitern','Signature-Produkt definieren (z. B. Flow & Fight oder Soundbath)','5 hochauflösende 16:9 Fotos hochladen'],
  go:{kind:'p',id:'gy'}, goText:'GetYourGuide Guide'
},
{
  id: 'st-7', n:7, phase:'Phase 5 · Ausschluss', woche:'Fokus halten', dauer:'0 Stunden',
  title:'Zeitfresser & No-Gos meiden (Airbnb, Belonio, Probonio)',
  desc:'Fokussierung: Airbnb Experiences (5 Jahre Historie Pflicht) und geschlossene Plattformen vorerst ignorieren.',
  tasks:['Keine Zeit in Airbnb-Bewerbung investieren vor Medienberichten','Keine Kaltakquise bei geschlossenen Mitarbeiter-Netzwerken','Fokus 100% auf die 3 offenen & 7 bedingten Plattformen legen'],
  go:{kind:'p',id:'ab'}, goText:'Ausschluss-Gründe'
}
];

const SIMPLE = [
 ['Was verkauft Elvaria im neuen Modell?','Wertgutscheine und Event-Tickets ohne starre Kursbindung. Kunden und Firmen erwerben ein Guthaben oder buchen gezielte Signature-Events (Yoga + X) oder B2B Desk Resets.'],
 ['Warum sind Gutscheinplattformen der Haupthebel?','Sie bringen sofortige Sichtbarkeit in Supermärkten, Google-Suchen und Mitarbeiterportalen, ohne dass Elvaria teures Werbebudget für Kaltakquise ausgeben muss.'],
 ['Wie funktioniert der Raum-Deal ohne eigenes Studio?','Bestehende Studios haben tagsüber oder zu Randzeiten Leerstand. Elvaria nutzt diese Räume gegen Umsatzbeteiligung oder kleine Pauschale — 0 € monatliche Fixmiete.'],
 ['Was ist für die Aufnahme auf Plattformen zwingend nötig?','Gewerbeanmeldung, Steuernummer, Geschäftskonto, EPS-Logo, hochauflösende 16:9 Fotos und eine veröffentlichte AGB mit Widerrufsbelehrung.'],
 ['Wie lange sind Gutscheine rechtlich gültig?','Genau 3 Jahre bis zum Jahresende (§ 195 BGB). Klauseln wie „Gültig für 1 Jahr" sind nach ständiger BGH-Rechtsprechung unwirksam.'],
 ['Können Firmen Elvaria steuerfrei buchen?','Ja. Bis zu 600 € pro Mitarbeiter und Jahr sind nach § 3 Nr. 34 EStG für zertifizierte betriebliche Gesundheitsförderung steuer- und sozialabgabenfrei.']
];

window.START = START;
window.ROADMAP_STEPS = START;
window.SIMPLE = SIMPLE;

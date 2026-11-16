/**
 * ELVARIA Start Roadmap (7 Steps & Beginner FAQ)
 */
/* ══════════════════════════════════════════════════════════════════════
   STARTGUIDE — der Weg in 7 Schritten, für Menschen ohne Vorwissen
   Jeder Schritt: was er bringt, was er kostet, wann er dran ist.
   'go' springt in das passende Tutorial, 'auf' zeigt die Plattformen-Ampel.
   ══════════════════════════════════════════════════════════════════════ */
const START = [
{
  n:1, woche:'Diese Woche', dauer:'2 Stunden', kosten:'0 €',
  t:'Gutschein-Seite live schalten',
  kurz:'Deine Kunden können dir ab heute Geld geben, ohne einen Termin zu wählen.',
  b:['Du hast bei Eversports ein Gutschein-Widget, das du nie eingebaut hast. Es kostet nichts extra und nimmt null Prozent Provision — der Kunde kauft direkt bei dir.',
     'Es gibt keinen Grund, das länger liegen zu lassen: Es ist der einzige Kanal, den du heute noch starten kannst, ohne jemanden zu fragen.'],
  zuerst:['Eversports-Manager öffnen','Einstellungen → Widgets','Vouchers Widget aktivieren'],
  go:{kind:'p',id:'ev'}, goText:'Tutorial öffnen'},
{
  n:2, woche:'Diese Woche', dauer:'2 Stunden + 300–600 €', kosten:'300–600 €',
  t:'AGB und Widerruf anlegen',
  kurz:'Ohne AGB nimmt dich keine Plattform auf. Das ist der eine echte Blocker.',
  b:['ACHTUNG: Auf deiner Website liegen AGB und Widerrufsbelehrung nicht — die Seiten laufen ins Leere. Sechs der 14 Plattformen verlangen sie ausdrücklich.',
     'Das ist kein Papierkram, den man später macht: Eine Bewerbung ohne AGB wird nicht beantwortet oder abgelehnt. Kosten: 300–600 € beim Anwalt, oder eine Vorlage aus dem Dossier (Kap. 25.7) plus eigene Prüfung.'],
  zuerst:['Vorlage auswählen','An Impressum und Preise anpassen','Auf /agb und /widerruf stellen'],
  go:{kind:'p',id:'wu'}, goText:'Warum das blockiert'},
{
  n:3, woche:'Diese Woche', dauer:'30 Minuten', kosten:'0 €',
  t:'VU-Nummer erfragen',
  kurz:'Eine Nummer, die entscheidet, ob drei weitere Plattformen nächste Woche gehen oder erst in Monaten.',
  b:['Edenred, Pluxee und givve zahlen über Kartenakzeptanz. Dafür brauchst du deine VU-Nummer (Vertragsunternehmensnummer) beim Zahlungsdienstleister.',
     'Die Nummer steht meist auf der Kreditkartenabrechnung. Ein Anruf bei deinem Anbieter, und du weißt, ob es „in einer Woche live" heißt oder „erst nach Terminal-Kauf".',
     'Wenn du heute schon Online-Kartenzahlungen annimmst (Eversports/Stripe), hast du möglicherweise längst eine.'],
  zuerst:['Zahlungsdienstleister heraussuchen','Anrufen oder ins Backend schauen','Nummer notieren'],
  go:{kind:'p',id:'gv'}, goText:'Der Karten-Weg erklärt'},
{
  n:4, woche:'Nächste Woche', dauer:'15 Minuten', kosten:'0 €',
  t:'Bei ATENTO registrieren',
  kurz:'Damit liegt dein Name in 400+ Städten im Supermarktregal — bei REWE und PENNY.',
  b:['ATENTO ist der einzige Kanal, auf dem dein Name physisch an der Supermarktkasse liegt. Registrierung ist Selbstbedienung und dauert laut Anbieter zwei Minuten.',
     'Yoga ist dort eine eigene Kategorie — nutze sie, sonst wirst du nicht gefunden. Kalkuliere 10–20 % Direktrabatt ein, über 25 % lehnst du ab.'],
  zuerst:['app.atento.me/join öffnen','Kategorie Yoga wählen','15/25/50 € anlegen'],
  go:{kind:'p',id:'at'}, goText:'Tutorial öffnen'},
{
  n:5, woche:'Nächste Woche', dauer:'3 Stunden', kosten:'0 € + EPS',
  t:'Wunschgutschein und Corporate Benefits bewerben',
  kurz:'Zwei Formulare, zwei Kanäle, kein Geld. Aber erst, wenn AGB und Logo stehen.',
  b:['Wunschgutschein: Du brauchst fünf feste Wertstufen als eigene Codes, eine Kurzbeschreibung und ein Logo als EPS. Der Kunde hat dann bereits bezahlt, bevor er dich sieht — der beste Lead, den es gibt.',
     'Corporate Benefits: ein konkretes Rabattangebot in Prozent, mehr nicht. Reichweite 17,7 Mio. registrierte Nutzer.'],
  zuerst:['EPS-Logo besorgen','Kurzbeschreibung in 2–3 Sätzen','Beide Formulare abschicken'],
  go:{kind:'p',id:'wu'}, goText:'Tutorial öffnen', go2:{kind:'p',id:'cb'}, go2Text:'Corporate Benefits'},
{
  n:6, woche:'Monat 2', dauer:'2 Tage', kosten:'150–800 €',
  t:'Versicherung klären — dann Erlebnis-Plattformen',
  kurz:'Ohne Betriebshaftpflicht geht GetYourGuide nicht. Mit ihr ist es der größte Kanal.',
  b:['GetYourGuide verlangt eine Betriebshaftpflicht über 1–2 Mio. €. Prüfe ausdrücklich, ob BOXEN mitversichert ist — manche Policen schließen Kampfsport aus.',
     'Danach brauchst du genau ein Produkt mit Namen, keinen Katalog. Beispiel: „Flow & Fight: 90 Minuten Yoga und Boxen für zwei".',
     'konfetti (gokonfetti) lässt dich offen rein — kostet aber ab Tag 31 29 € im Monat. Erst nach dem dritten verkauften Event.'],
  zuerst:['Versicherung mit Boxen','Ein Produkt benennen','5 Fotos 16:9'],
  go:{kind:'p',id:'gy'}, goText:'GetYourGuide', go2:{kind:'p',id:'gk'}, go2Text:'konfetti'
},
{
  n:7, woche:'Jetzt nicht', dauer:'später', kosten:'—',
  t:'Was du heute NICHT anfassen solltest',
  kurz:'Drei Wege klingen verlockend und bringen nichts. Sie kosten Zeit, die du oben brauchst.',
  b:['Airbnb Experiences verlangt fünf Jahre Praxis oder Presseberichte. Elvaria ist 2026 gegründet — heute aussichtslos. In 12–24 Monaten mit Presse erneut prüfen.',
     'Belonio und Probonio haben keinen offenen Anbieter-Weg. Rund 250 und 100 kuratierte Partner, Aufnahme über Beziehung. Firmenkunden direkt ansprechen ist schneller.',
     'Jochen Schweizer ist stark, aber kuratiert: erst anrufen, wenn du ein Produkt hast, das in einen Satz passt.'],
  zuerst:['Nicht bewerben','In 6 Monaten erneut prüfen'],
  go:{kind:'p',id:'ab'}, goText:'Warum nicht', go2:{kind:'p',id:'be'}, go2Text:'Belonio'
}
];

/* Antworten auf die Fragen, die am Anfang kommen — bewusst einfach formuliert */
const SIMPLE = [
 ['Was verkaufe ich hier eigentlich?','Gutscheine über Geldbeträge. Der Kunde kauft 25 € und entscheidet später, ob er damit Yoga, Boxen, Klang oder Verleih bezahlt. Du verkaufst kein Produkt, sondern ein Guthaben — deshalb funktioniert es auch ohne festen Termin.'],
 ['Warum brauche ich überhaupt Plattformen?','Deine eigene Seite erreicht nur Menschen, die dich schon kennen. Plattformen erreichen Menschen, die dich nicht kennen — an der Supermarktkasse, im REWE-Regal, bei der Firmen-Benefits-App. Der Preis dafür ist ein Rabatt von 10–25 %.'],
 ['Wo fange ich an, wenn ich nur eine Stunde habe?','Schritt 1: Eversports-Widget einbauen. Zwei Stunden, 0 % Provision, sofort Umsatz. Alles andere kann warten.'],
 ['Was kostet mich das alles zusammen?','Der Einstieg kostet fast nichts: 0 € für Eversports, ATENTO und Corporate Benefits; 300–600 € für AGB; 0–60 € für ein Kartenterminal, wenn du die Karten-Plattformen willst. Der Rest ist Zeit.'],
 ['Was ist die VU-Nummer und warum ist sie wichtig?','Deine Händlernummer bei der Kreditkartenabwicklung. Edenred, Pluxee und givve können dir nur zahlen, wenn sie diese Nummer von dir haben. Ohne sie ist der Antrag zwecklos.'],
 ['Muss ich ein Gewerbe haben?','Ja. Jede Plattform fragt nach Firma, Steuernummer und einer Bankverbindung auf den Firmennamen. Ein Privatkonto führt regelmäßig zu Rückfragen.'],
 ['Wie lange dauert es, bis der erste Euro kommt?','Eversports: heute. ATENTO: 2–3 Wochen. Wunschgutschein: 2–6 Wochen. GetYourGuide: 2–5 Werktage nach Freigabe. Alles andere: 4–8 Wochen.'],
 ['Was, wenn ich keine Zeit für alles habe?','Mach Schritt 1 bis 3. Das sind unter drei Stunden plus AGB. Damit hast du den Kanal live, der blockiert, und du weißt, ob die Karten-Plattformen überhaupt erreichbar sind.']
];

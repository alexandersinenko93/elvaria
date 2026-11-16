const fs = require('fs');

const content = fs.readFileSync('ELVARIA_Komplettdossier.md', 'utf8');

const s11Start = content.indexOf('## 11. Quellen');
const s12Start = content.indexOf('## 12.');
const s11 = content.slice(s11Start, s12Start);

const s30Start = content.indexOf('## 30. Quellen II');
const s31Start = content.indexOf('## 31.');
const s30 = content.slice(s30Start, s31Start);

const sources = [];
let idCounter = 1;

function parseBlock(txt, defaultCategory) {
  let curCategory = defaultCategory;
  const lines = txt.split('\n');
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('##') || line.startsWith('>') || line.startsWith('---')) continue;
    if (line.startsWith('**') && line.endsWith('**')) {
      curCategory = line.replace(/\*\*/g, '').replace(':', '');
      continue;
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const entryText = line.slice(2).trim();
      if (!entryText) continue;
      
      const colonIdx = entryText.indexOf(':');
      let title = colonIdx !== -1 ? entryText.slice(0, colonIdx).trim() : entryText;
      let url = null;
      const urlMatch = entryText.match(/(https?:\/\/[^\s\)]+)/i);
      if (urlMatch) {
        url = urlMatch[1].replace(/[,;)]$/, '');
      }
      
      sources.push({
        id: 'src-' + (idCounter++),
        category: curCategory,
        title: title.slice(0, 80),
        citation: entryText,
        url: url
      });
    }
  }
}

parseBlock(s11, 'Grundquellen');
parseBlock(s30, 'Vertiefung');

const keyLegals = [
  {
    id: 'bgb-195',
    category: 'Recht & Steuern',
    title: 'BGB § 195 / § 199',
    citation: 'Regelmäßige Verjährungsfrist von 3 Jahren zum Jahresende für Wertgutscheine. BGH XI ZR 56/07; 1-Jahres-Befristung in AGB ist unwirksam.',
    url: 'https://www.gesetze-im-internet.de/bgb/__195.html'
  },
  {
    id: 'bgb-309',
    category: 'Recht & Steuern',
    title: 'BGB § 309 Nr. 7a',
    citation: 'Unwirksamkeit pauschaler Haftungsausschlüsse für Körperschäden in AGB („Teilnahme auf eigene Gefahr"). Erfordert Sorgfaltsdokumentation & Veranstalterhaftpflicht.',
    url: 'https://www.gesetze-im-internet.de/bgb/__309.html'
  },
  {
    id: 'heilprg-1',
    category: 'Recht & Steuern',
    title: 'Heilpraktikergesetz § 1 / HWG',
    citation: 'Heilversprechen und medizinische Diagnosen sind Ärzten/Heilpraktikern vorbehalten. Keine Heilaussagen bei Yoga, Klang & Breathwork.',
    url: 'https://www.gesetze-im-internet.de/heilprg/__1.html'
  },
  {
    id: 'sgb-vii-192',
    category: 'Recht & Steuern',
    title: 'SGB VII § 192 (VBG)',
    citation: 'Pflicht zur Anmeldung bei der gesetzlichen Unfallversicherung (VBG) binnen 1–4 Wochen ab Aufnahme der Tätigkeit, auch ohne Angestellte.',
    url: 'https://www.vbg.de'
  },
  {
    id: 'sgb-v-20b',
    category: 'Netzwerke & Förderung',
    title: 'SGB V § 20b / EStG § 3 Nr. 34',
    citation: 'Betriebliche Gesundheitsförderung: Bis zu 600 €/Mitarbeiter/Jahr steuerfrei nach EStG § 3 Nr. 34; Krankenkassenzuschuss nach § 20b SGB V.',
    url: 'https://www.gesetze-im-internet.de/sgb_5/__20b.html'
  },
  {
    id: 'gewo-56a',
    category: 'Recht & Steuern',
    title: 'Gewerbeordnung § 56a',
    citation: 'Wanderlager-Anzeige 2 Wochen vorher bei öffentlichen Verkaufsveranstaltungen außerhalb der festen Betriebsstätte.',
    url: 'https://www.gesetze-im-internet.de/gewo/__56a.html'
  },
  {
    id: 'eversports-fee',
    category: 'Eversports & Plattformen',
    title: 'Eversports Marketplace Gebühren',
    citation: '25% Provision je Neukundenbuchung, gedeckelt auf maximal 75 € pro Transaktion. Direkte Studio-Buchungen provisionsfrei.',
    url: 'https://helpcenter.eversportsmanager.com'
  },
  {
    id: 'hh-location-avg',
    category: 'Locations & Events',
    title: 'Hamburger Location-Kosten 2026',
    citation: 'Yogastudio ø 95 €/Std., Rooftops ab 159 €/Std., Speicherstadt-Loft 3.000–12.000 €/Tag. ELVARIA-Strategie nutzt 0-€-Raum-Deals gegen Kundenstrom.',
    url: null
  }
];

const allSources = [...keyLegals, ...sources];
fs.writeFileSync('src/data/sources.json', JSON.stringify(allSources, null, 2), 'utf8');
console.log('Successfully saved src/data/sources.json with', allSources.length, 'records.');

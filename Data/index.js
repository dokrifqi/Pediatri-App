// ============================================================
// data/index.js — Pediatri App Database Registry v2.0
// @dokrifqi | Total: 10 penyakit dari 40+ target
// ============================================================

const DISEASE_DATABASE = {

  // ─── NEONATOLOGI (2/8) ─────────────────────────────────────
  "sepsis-neonatorum": {
    path: "data/neonatologi/sepsis-neonatorum.json",
    name: "Sepsis Neonatorum",
    category: "neonatologi",
    icon: "🦠",
    shortDesc: "EOS & LOS — Ampisilin + Gentamisin"
  },
  "hiperbilirubinemia": {
    path: "data/neonatologi/hiperbilirubinemia.json",
    name: "Hiperbilirubinemia Neonatal",
    category: "neonatologi",
    icon: "🟡",
    shortDesc: "Ikterus fisiologis & patologis — Fototerapi & ET"
  },

  // ─── RESPIRASI (2/10) ──────────────────────────────────────
  "pneumonia-komunitas": {
    path: "data/respirasi/pneumonia-komunitas.json",
    name: "Pneumonia Komunitas Anak",
    category: "respirasi",
    icon: "🫁",
    shortDesc: "CAP — Amoksisilin Lini 1 + Klasifikasi WHO"
  },
  "asma-anak": {
    path: "data/respirasi/asma-anak.json",
    name: "Asma Anak — Serangan Akut",
    category: "respirasi",
    icon: "🌬️",
    shortDesc: "Derajat serangan & Salbutamol nebulisasi + Steroid"
  },

  // ─── PENCERNAAN (1/9) ──────────────────────────────────────
  "diare-akut": {
    path: "data/pencernaan/diare-akut.json",
    name: "Diare Akut Anak",
    category: "pencernaan",
    icon: "💧",
    shortDesc: "Rehidrasi WHO Plan A/B/C & Suplementasi Zinc"
  },

  // ─── SARAF / NEUROLOGI (1/7) ───────────────────────────────
  "kejang-demam": {
    path: "data/saraf/kejang-demam.json",
    name: "Kejang Demam",
    category: "saraf",
    icon: "⚡",
    shortDesc: "Simple vs Complex — Diazepam akut & Antipiretik"
  },

  // ─── INFEKSI TROPIS (3/8) ──────────────────────────────────
  "demam-berdarah-dengue": {
    path: "data/infeksi/demam-berdarah-dengue.json",
    name: "Demam Berdarah Dengue",
    category: "infeksi",
    icon: "🦟",
    shortDesc: "DHF Derajat I–IV — Ringer Laktat & Transfusi Platelet"
  },
  "demam-tifoid": {
    path: "data/infeksi/demam-tifoid.json",
    name: "Demam Tifoid Anak",
    category: "infeksi",
    icon: "🌡️",
    shortDesc: "Salmonella typhi — Ceftriaxone atau Kloramfenikol"
  },
  "tb-paru-anak": {
    path: "data/infeksi/tb-paru-anak.json",
    name: "Tuberkulosis Paru Anak",
    category: "infeksi",
    icon: "🧫",
    shortDesc: "Skor TB IDAI & OAT — HRZE 2 bln + HR 4 bln"
  },

  // ─── NEFROLOGI (1/7) ───────────────────────────────────────
  "sindrom-nefrotik": {
    path: "data/nefrologi/sindrom-nefrotik.json",
    name: "Sindrom Nefrotik Anak",
    category: "nefrologi",
    icon: "🫘",
    shortDesc: "Prednisolon 2 mg/kg/hr + Diuretik"
  }
  // ─── TAMBAH PENYAKIT BARU DI BAWAH SINI ───────────────────
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

async function loadDiseaseData(diseaseKey) {
  const entry = DISEASE_DATABASE[diseaseKey];
  if (!entry) { console.warn('[PA] Not found:', diseaseKey); return null; }
  try {
    const r = await fetch(entry.path);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  } catch(e) {
    console.error('[PA] Load error:', diseaseKey, e.message);
    return null;
  }
}

function getAllDiseases() {
  return Object.entries(DISEASE_DATABASE).map(([id, d]) => ({id, ...d}));
}

function getDiseasesByCategory(cat) {
  return getAllDiseases().filter(d => d.category === cat);
}

function searchDiseases(q) {
  const s = q.toLowerCase().trim();
  if (!s) return getAllDiseases();
  return getAllDiseases().filter(d =>
    d.name.toLowerCase().includes(s) ||
    d.id.toLowerCase().includes(s) ||
    (d.shortDesc || '').toLowerCase().includes(s)
  );
}

function getDatabaseStats() {
  const all = getAllDiseases();
  const byCat = {};
  all.forEach(d => { byCat[d.category] = (byCat[d.category] || 0) + 1; });
  return { total: all.length, byCategory: byCat };
}

console.log('[PediatriApp] DB loaded:', getDatabaseStats());

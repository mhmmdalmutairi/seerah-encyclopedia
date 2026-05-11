// موسوعة السيرة النبوية المؤسسية — تطبيق الواجهة
// المرحلة 3: تبويب الكيانات الكامل (عرض + بحث + فلترة + فرز + تفاصيل + تصدير)

(function () {
  "use strict";

  // ============================================================
  // 1. الترجمات: من رموز الـ schema إلى تسميات عربية
  // ============================================================

  const LABELS = {
    region: {
      arabia: "الجزيرة العربية",
      levant_iraq_nile: "الشام والعراق ووادي النيل",
      maghreb: "المغرب العربي",
      turkey: "تركيا",
      non_arab_muslim: "العالم الإسلامي غير العربي",
      western: "الاستشراق الغربي",
      global: "عابر للأقاليم",
    },
    country: {
      SA: "السعودية", AE: "الإمارات", QA: "قطر", KW: "الكويت", BH: "البحرين",
      OM: "عُمان", YE: "اليمن", EG: "مصر", JO: "الأردن", SY: "سوريا",
      LB: "لبنان", PS: "فلسطين", IQ: "العراق", SD: "السودان", MA: "المغرب",
      DZ: "الجزائر", TN: "تونس", LY: "ليبيا", MR: "موريتانيا", TR: "تركيا",
      PK: "باكستان", IN: "الهند", BD: "بنغلاديش", ID: "إندونيسيا", MY: "ماليزيا",
      UZ: "أوزبكستان", NG: "نيجيريا", SN: "السنغال", ZA: "جنوب أفريقيا",
      TZ: "تنزانيا", IR: "إيران", US: "الولايات المتحدة", KZ: "كازاخستان",
      SO: "الصومال", KE: "كينيا", ET: "إثيوبيا", ER: "إريتريا", DJ: "جيبوتي",
      GB: "المملكة المتحدة", CA: "كندا", DE: "ألمانيا",
      FR: "فرنسا", IT: "إيطاليا", NL: "هولندا", BE: "بلجيكا", AT: "النمسا",
      HU: "المجر", CH: "سويسرا", ES: "إسبانيا", DK: "الدنمارك", SE: "السويد",
      NO: "النرويج", FI: "فنلندا", PL: "بولندا", CZ: "التشيك", RU: "روسيا",
      AU: "أستراليا", JP: "اليابان", CN: "الصين", IL: "إسرائيل",
    },
    type: {
      // بحث وتعليم
      university_center: "مركز جامعي",
      university_department: "قسم جامعي",
      academic_chair: "كرسي علمي",
      research_center: "مركز بحثي",
      foundation_waqf: "مؤسسة/وقف بحثي",
      encyclopedia_project: "مشروع موسوعي",
      // نشر ومعرفة
      publisher: "دار نشر",
      journal: "مجلة محكّمة",
      popular_magazine: "مجلة ثقافية/شعبية",
      library_archive: "مكتبة/أرشيف",
      // إعلام وجمهور
      digital_platform: "منصة رقمية",
      production_studio: "شركة إنتاج",
      tv_channel: "قناة متخصصة",
      podcast_institutional: "بودكاست مؤسسي",
      mobile_app: "تطبيق جوّال",
      film_or_series: "فيلم/مسلسل بارز",
      // متاحف وثقافة
      museum: "متحف/معرض",
      mosque_program: "برنامج مسجدي",
      islamic_center: "مركز ثقافي إسلامي",
      // بنية مؤسسية
      award: "جائزة",
      grant: "منحة بحثية",
      conference_series: "مؤتمر دوري",
      ministry_program: "برنامج وزاري",
      royal_initiative: "مبادرة ملكية/رئاسية",
      // فاعلون أفراد
      individual_researcher: "باحث أكاديمي",
      popular_writer: "كاتب جماهيري",
      digital_creator: "صانع محتوى رقمي",
      reference_thinker: "مفكّر مرجعي",
    },
    type_group: {
      research_education: "🎓 بحث وتعليم",
      publishing_knowledge: "📚 نشر ومعرفة",
      media_audience: "📺 إعلام وجمهور",
      museums_culture: "🏛 متاحف وثقافة",
      institutional_infra: "⚙ بنية مؤسسية",
      individual_actors: "👤 فاعلون أفراد",
    },
    subjects_category: {
      classical_corpus: "📖 المتن السيري الكلاسيكي",
      geography_space: "🗺 الجغرافيا والفضاء",
      prophetic_demography: "👥 الديموغرافيا النبوية",
      auxiliary_sciences: "🔬 العلوم المساعدة",
      methodology_critique: "🧭 المنهج والنقد",
      application_outreach: "🌱 التطبيق والنشر",
      applied_jurisprudence: "⚖ الفقه التطبيقي",
    },
    subjects: {
      // المتن السيري الكلاسيكي
      seerah_general: "السيرة العامة",
      maghazi: "المغازي",
      shamail: "الشمائل",
      dalail_nubuwwa: "الدلائل والإعجاز",
      khasais_nabawiyyah: "الخصائص النبوية",
      // الجغرافيا والفضاء
      seerah_geography: "جغرافيا السيرة",
      makkah_studies: "دراسات مكة",
      madinah_studies: "دراسات المدينة",
      // الديموغرافيا النبوية
      early_islam: "الإسلام المبكر",
      rashidun: "الراشدون",
      tabaqat_companions: "طبقات الصحابة",
      women_in_seerah: "النساء في السيرة",
      wufud_diplomacy: "الوفود والديبلوماسية",
      ahlulbayt: "أهل البيت",
      ahl_al_sunna: "أهل السنة",
      family_household: "الأسرة النبوية",
      // العلوم المساعدة
      manuscripts: "المخطوطات",
      hadith_sciences: "علوم الحديث",
      sources_critique: "نقد المتون والأسانيد",
      historiography: "التأريخ",
      // المنهج والنقد
      biography_methodology: "منهج السيرة",
      orientalism_critique: "نقد الاستشراق",
      comparative_religion: "السيرة المقارنة",
      // التطبيق والنشر
      sufism_seerah: "السيرة الصوفية",
      seerah_pedagogy: "تعليم السيرة",
      youth_outreach: "السيرة للناشئة",
      digital_seerah: "السيرة الرقمية",
      tarjamah: "ترجمة السيرة",
      // الفقه التطبيقي
      medicine_prophetic: "الطب النبوي",
      seerah_in_quran: "السيرة في القرآن",
    },
    verification: {
      field_verified: "محقّق ميدانياً",
      desk_verified: "محقّق مكتبياً",
      needs_verification: "يحتاج تحقّقاً",
      unverifiable: "تعذّر التحقق",
    },
    inclusion_tier: {
      core: "تخصص أصلي",
      borderline: "حدّي",
      below_threshold: "تحت العتبة",
    },
    funding_type: {
      state: "حكومي",
      religious_authority: "هيئة دينية",
      waqf: "وقف",
      private: "خاص",
      academic_host: "جامعي",
      mixed: "مختلط",
      unknown: "غير محدد",
    },
    status: {
      active: "نشط",
      dormant: "متوقف مؤقتاً",
      suspended: "معلَّق (حرب/أزمة)",
      closed: "مغلق",
      archived_digital: "أرشيف رقمي",
    },
    scale: {
      local: "محلي",
      national: "وطني",
      regional: "إقليمي",
      international: "دولي",
    },
    output_types: {
      journal: "مجلة",
      books: "كتب",
      conference: "مؤتمرات",
      lectures: "محاضرات",
      podcast: "بودكاست",
      podcast_episode: "حلقات بودكاست",
      video: "فيديو",
      documentary_film: "أفلام وثائقية",
      tv_series: "مسلسلات",
      exhibition: "معارض",
      database: "قواعد بيانات",
      encyclopedia: "موسوعات",
      manuscripts: "مخطوطات",
      courses: "دورات",
      fatwa: "فتاوى",
      translation: "ترجمات",
      mobile_app_output: "تطبيقات جوّال",
      educational_game: "ألعاب تعليمية",
      khutbah_archive: "أرشيف خطب",
    },
    languages: {
      ar: "العربية", en: "الإنجليزية", tr: "التركية", fa: "الفارسية",
      ur: "الأردية", fr: "الفرنسية", de: "الألمانية", es: "الإسبانية",
      it: "الإيطالية", nl: "الهولندية", pt: "البرتغالية", zh: "الصينية",
      id: "الإندونيسية", ms: "الماليزية", bn: "البنغالية", sw: "السواحيلية",
      ha: "الهوسا", hi: "الهندية", uz: "الأوزبكية", sv: "السويدية",
      no: "النرويجية", pl: "البولندية", cs: "التشيكية", hu: "المجرية",
      ru: "الروسية", ja: "اليابانية", bs: "البوسنية",
    },
    relation_type: {
      parent_of: "أم لـ",
      child_of: "فرع من",
      partner: "شريك مع",
      successor_of: "خَلَف لـ",
      predecessor_of: "سَلَف لـ",
      member_of_network: "عضو شبكة",
      publisher_of: "ناشر لـ",
      cited_in: "مقتبس في",
      translated_by: "ترجمه",
    },
    round: {
      "01": "الجولة 1 — الجزيرة العربية",
      "02": "الجولة 2 — الشام/العراق/النيل",
      "03": "الجولة 3 — المغرب العربي",
      "04": "الجولة 4 — تركيا",
      "05": "الجولة 5 — العالم الإسلامي غير العربي",
      "06": "الجولة 6 — الاستشراق الغربي",
      "08a": "الجولة 8-أ — جنوب آسيا",
      "08b": "الجولة 8-ب — المسجدي والإفريقي",
      "08c": "الجولة 8-ج — الإعلامي والرقمي",
      "08d": "الجولة 8-د — الحوزوي/الشيعي",
      "08e": "الجولة 8-هـ — الصوفي الإفريقي",
      "08f": "الجولة 8-و — القرن الإفريقي",
    },
  };

  function label(facet, code) {
    if (!code) return "—";
    return (LABELS[facet] && LABELS[facet][code]) || code;
  }

  function labelList(facet, codes) {
    if (!Array.isArray(codes)) return "—";
    return codes.map((c) => label(facet, c)).join("، ");
  }

  // ============================================================
  // 2. ذاكرة التطبيق (State)
  // ============================================================

  const state = {
    entities: [],
    loaded: false,
    query: "",
    filters: {
      region: new Set(),
      country: new Set(),
      type_group: new Set(),
      type: new Set(),
      subjects_category: new Set(),
      subjects: new Set(),
      inclusion_tier: new Set(),
      verification: new Set(),
      founded_decade: new Set(),
      languages: new Set(),
      output_types: new Set(),
      funding_type: new Set(),
      status: new Set(),
      scale: new Set(),
      round: new Set(),
    },
    sort: "name_ar",
    selectedId: null,
  };

  const FACET_ORDER = [
    "type_group", "type",                                  // التصنيف الهرمي
    "subjects_category", "subjects",                       // الموضوع الهرمي
    "region", "country",                                   // الجغرافيا
    "inclusion_tier", "verification",                      // الجودة
    "founded_decade", "round",                             // الزمن
    "languages", "output_types",                           // المحتوى
    "funding_type", "status", "scale",                     // الخصائص
  ];

  // تجميع الفلاتر في أقسام لعرضها كمجموعات منفصلة في الشريط الجانبي.
  // النوعان: `hierarchy` (شجرة أب→أبناء) أو `facets` (قائمة مسطّحة).
  const FACET_SECTIONS = [
    { title: "التصنيف", hierarchy: { parent: "type_group", child: "type" } },
    { title: "الموضوع", hierarchy: { parent: "subjects_category", child: "subjects" } },
    { title: "الجغرافيا", hierarchy: { parent: "region", child: "country" } },
    { title: "الجودة", facets: ["inclusion_tier", "verification"] },
    { title: "الزمن", facets: ["founded_decade", "round"] },
    { title: "المحتوى", facets: ["languages", "output_types"] },
    { title: "خصائص أخرى", facets: ["funding_type", "status", "scale"] },
  ];

  // خرائط أب→أبناء — تُحسب من البيانات ساعة التحميل (تعكس الواقع الفعلي،
  // وليس قائمة مفترضة من الـ schema)
  function computeHierarchyMaps() {
    const tg2type = new Map(), sc2sub = new Map(), reg2country = new Map();
    state.entities.forEach((e) => {
      if (e.type_group && e.type) {
        if (!tg2type.has(e.type_group)) tg2type.set(e.type_group, new Set());
        tg2type.get(e.type_group).add(e.type);
      }
      (e.subjects || []).forEach((s) => {
        const cat = SUBJECT_CAT_LOOKUP[s];
        if (cat) {
          if (!sc2sub.has(cat)) sc2sub.set(cat, new Set());
          sc2sub.get(cat).add(s);
        }
      });
      if (e.region && e.country) {
        if (!reg2country.has(e.region)) reg2country.set(e.region, new Set());
        reg2country.get(e.region).add(e.country);
      }
    });
    return { type_group: tg2type, subjects_category: sc2sub, region: reg2country };
  }

  // قاموس عكسي subject → subjects_category (لاختصار الحساب)
  const SUBJECT_CAT_LOOKUP = {
    seerah_general: "classical_corpus", maghazi: "classical_corpus",
    shamail: "classical_corpus", dalail_nubuwwa: "classical_corpus",
    khasais_nabawiyyah: "classical_corpus",
    seerah_geography: "geography_space", makkah_studies: "geography_space",
    madinah_studies: "geography_space",
    early_islam: "prophetic_demography", rashidun: "prophetic_demography",
    tabaqat_companions: "prophetic_demography", women_in_seerah: "prophetic_demography",
    wufud_diplomacy: "prophetic_demography", ahlulbayt: "prophetic_demography",
    ahl_al_sunna: "prophetic_demography", family_household: "prophetic_demography",
    manuscripts: "auxiliary_sciences", hadith_sciences: "auxiliary_sciences",
    sources_critique: "auxiliary_sciences", historiography: "auxiliary_sciences",
    biography_methodology: "methodology_critique",
    orientalism_critique: "methodology_critique",
    comparative_religion: "methodology_critique",
    sufism_seerah: "application_outreach", seerah_pedagogy: "application_outreach",
    youth_outreach: "application_outreach", digital_seerah: "application_outreach",
    tarjamah: "application_outreach",
    medicine_prophetic: "applied_jurisprudence", seerah_in_quran: "applied_jurisprudence",
  };

  const FACET_TITLES = {
    region: "الإقليم",
    country: "الدولة",
    type_group: "المجموعة الرئيسة",
    type: "النوع التفصيلي",
    subjects_category: "المجموعة الموضوعية",
    subjects: "الموضوع التفصيلي",
    inclusion_tier: "مستوى الإدراج",
    verification: "درجة التحقق",
    founded_decade: "عقد التأسيس",
    languages: "اللغة",
    output_types: "نوع الإنتاج",
    funding_type: "التمويل",
    status: "الحالة",
    scale: "النطاق",
    round: "الجولة",
  };

  // ترتيب دلالي للفلاتر — يُستخدم في buildFilters بدل ترتيب العدد
  // الأقاليم: من الجزيرة العربية شرقاً ثم الشام ثم المغرب
  // مستوى الإدراج: من الأقوى للأضعف
  // التحقق: من الأعلى جودة للأدنى
  // العقد: من الأحدث للأقدم (تنازلي زمنياً)
  // الجولة: تسلسل تاريخي 1→6
  const FACET_SEMANTIC_ORDER = {
    region: ["arabia", "levant_iraq_nile", "maghreb", "turkey", "non_arab_muslim", "western", "global"],
    type_group: [
      "research_education", "publishing_knowledge", "media_audience",
      "museums_culture", "institutional_infra", "individual_actors",
    ],
    subjects_category: [
      "classical_corpus", "geography_space", "prophetic_demography",
      "auxiliary_sciences", "methodology_critique",
      "application_outreach", "applied_jurisprudence",
    ],
    inclusion_tier: ["core", "borderline", "below_threshold"],
    verification: ["field_verified", "desk_verified", "needs_verification", "unverifiable"],
    scale: ["international", "regional", "national", "local"],
    status: ["active", "dormant", "suspended", "closed", "archived_digital"],
    round: ["01", "02", "03", "04", "05", "06", "08a", "08b", "08c", "08d"],
    // العقد يرتَّب رقمياً تنازلياً في الكود (لا قائمة ثابتة)
  };

  // ============================================================
  // 3. أدوات مساعدة
  // ============================================================

  function debounce(fn, wait = 200) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), wait);
    };
  }

  function getFacetValue(entity, facet) {
    if (facet === "founded_decade") return entity.founded_decade || null;
    return entity[facet] || null;
  }

  function getFacetValues(entity, facet) {
    // للحقول التي تحتوي قيماً متعددة (subjects, languages, output_types)
    if (Array.isArray(entity[facet])) return entity[facet];
    const single = getFacetValue(entity, facet);
    return single ? [single] : [];
  }

  // ============================================================
  // 4. التنقل بين التبويبات
  // ============================================================

  const STORAGE_KEY = "seerah-active-tab";

  function initTabs() {
    const tabs = Array.from(document.querySelectorAll(".tab"));
    const panels = Array.from(document.querySelectorAll(".panel"));
    if (!tabs.length) return;

    const savedTab = safeGetItem(STORAGE_KEY);
    const initialTab = savedTab && document.querySelector(`[data-tab="${savedTab}"]`)
      ? savedTab
      : tabs[0].dataset.tab;

    activateTab(initialTab, tabs, panels);

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        activateTab(tab.dataset.tab, tabs, panels);
        safeSetItem(STORAGE_KEY, tab.dataset.tab);
      });

      tab.addEventListener("keydown", (e) => {
        const handled = handleArrowKeys(e, tabs);
        if (handled) {
          activateTab(handled.dataset.tab, tabs, panels);
          handled.focus();
          safeSetItem(STORAGE_KEY, handled.dataset.tab);
        }
      });
    });
  }

  function activateTab(tabName, tabs, panels) {
    tabs.forEach((t) => {
      const isActive = t.dataset.tab === tabName;
      t.classList.toggle("is-active", isActive);
      t.setAttribute("aria-selected", isActive ? "true" : "false");
      t.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panels.forEach((p) => {
      const isActive = p.id === `tab-${tabName}`;
      p.classList.toggle("is-active", isActive);
      p.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    if (tabName === "entities" && !state.loaded) {
      loadEntities();
    }
    if (tabName === "stats") {
      // تأكد من التحميل ثم ابنِ الإحصاءات
      if (!state.loaded) loadEntities().then(() => renderStats());
      else renderStats();
    }
    if (tabName === "gaps") {
      if (!state.loaded) loadEntities().then(() => renderGaps());
      else renderGaps();
    }
    if (tabName === "network") {
      if (!state.loaded) loadEntities().then(() => renderNetwork());
      else renderNetwork();
    }
    if (tabName === "diagnostic") {
      if (!state.loaded) loadEntities().then(() => renderDiagnostic());
      else renderDiagnostic();
    }
    if (tabName === "methodology") {
      renderStaticPage("methodology", "assets/methodology.html");
    }
    if (tabName === "references") {
      renderStaticPage("references", "assets/references.html");
    }
    if (tabName === "export") {
      if (!state.loaded) loadEntities().then(() => renderExport());
      else renderExport();
    }
  }

  const staticPagesLoaded = new Set();

  async function renderStaticPage(slug, url) {
    if (staticPagesLoaded.has(slug)) return;
    const container = document.querySelector(`#tab-${slug} .container`);
    if (!container) return;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("HTTP " + response.status);
      const html = await response.text();
      container.innerHTML = `<div class="diagnostic">${html}</div>`;

      // اربط استشهادات الكيانات
      container.querySelectorAll(".cite[data-id]").forEach((el) => {
        el.addEventListener("click", () => {
          buildModal();
          openModal(el.dataset.id);
        });
      });

      // اربط الـ TOC
      container.querySelectorAll(".diagnostic__toc a").forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const id = a.getAttribute("href").slice(1);
          const target = container.querySelector("#" + id);
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });

      staticPagesLoaded.add(slug);

      // فعّل scroll-spy
      const sections = Array.from(container.querySelectorAll(".diag-section"));
      const links = Array.from(container.querySelectorAll(".diagnostic__toc a"));
      if (sections.length && links.length) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                links.forEach((a) => {
                  a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
                });
              }
            });
          },
          { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
        );
        sections.forEach((sec) => observer.observe(sec));
      }
    } catch (err) {
      container.innerHTML = `
        <div class="empty-state">
          <h3 class="empty-state__title">تعذّر التحميل</h3>
          <p class="empty-state__hint">${escapeHtml(err.message)}</p>
        </div>
      `;
    }
  }

  function handleArrowKeys(event, tabs) {
    const isRTL = document.documentElement.dir === "rtl";
    const isPrev = isRTL ? event.key === "ArrowRight" : event.key === "ArrowLeft";
    const isNext = isRTL ? event.key === "ArrowLeft" : event.key === "ArrowRight";
    if (!isPrev && !isNext) return null;
    event.preventDefault();
    const currentIndex = tabs.findIndex((t) => t.classList.contains("is-active"));
    if (currentIndex === -1) return null;
    const nextIndex = isPrev
      ? (currentIndex - 1 + tabs.length) % tabs.length
      : (currentIndex + 1) % tabs.length;
    return tabs[nextIndex];
  }

  function safeGetItem(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  function safeSetItem(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  }

  // ============================================================
  // 5. تحميل البيانات
  // ============================================================

  async function loadEntities() {
    const grid = document.querySelector(".results__grid");
    if (grid) grid.innerHTML = '<div class="empty-state"><h3 class="empty-state__title">جاري التحميل…</h3></div>';

    try {
      const response = await fetch("data.json");
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();
      // استبعد كيانات "توثيق فجوة" — هي توصيف لمنطقة لا كيان فيها،
      // ليست كياناً مؤسسياً. نحتفظ بها للتشخيص لاحقاً لكن لا تُعدّ في الإجمالي.
      const rawEntities = Array.isArray(data.entities) ? data.entities : [];
      const gapMarker = (e) => /^\[توثيق فجوة\]/i.test(e?.name_ar || "");
      state.gapMarkers = rawEntities.filter(gapMarker);
      state.entities = rawEntities.filter((e) => !gapMarker(e));
      // طبّق التعديلات المحفوظة محلياً (من تبويب "الفجوات")
      loadGapEdits();
      applyGapEdits();
      state.loaded = true;

      // تحديث العدادات في الهيدر والتبويب
      const totalCount = state.entities.length;
      const countEls = document.querySelectorAll('[data-count="entities"], [data-count="entities-header"]');
      countEls.forEach((el) => { el.textContent = String(totalCount); });
      const roundsEl = document.querySelector('[data-count="rounds"]');
      if (roundsEl && data.rounds_completed) {
        roundsEl.textContent = String(data.rounds_completed.length);
      }
      const countriesEl = document.querySelector('[data-count="countries-header"]');
      if (countriesEl) {
        const uniqueCountries = new Set(state.entities.map((e) => e.country).filter(Boolean));
        countriesEl.textContent = String(uniqueCountries.size);
      }

      buildFilters();
      buildModal();
      bindToolbar();
      render();
      restoreFromHash();
    } catch (err) {
      if (grid) {
        grid.innerHTML = `<div class="empty-state"><h3 class="empty-state__title">تعذّر تحميل البيانات</h3><p class="empty-state__hint">${err.message}</p></div>`;
      }
    }
  }

  // ============================================================
  // 6. بناء الفلاتر بناء على البيانات
  // ============================================================

  function getFacetCounts(facet) {
    const counts = new Map();
    state.entities.forEach((e) => {
      const values = getFacetValues(e, facet);
      values.forEach((v) => {
        if (!v) return;
        counts.set(v, (counts.get(v) || 0) + 1);
      });
    });
    return counts;
  }

  function getColorForValue(facet, value) {
    if (facet === "type_group") {
      const map = {
        research_education:   "var(--type-research-education)",
        publishing_knowledge: "var(--type-publishing-knowledge)",
        media_audience:       "var(--type-media-audience)",
        museums_culture:      "var(--type-museums-culture)",
        institutional_infra:  "var(--type-institutional-infra)",
        individual_actors:    "var(--type-individual-actors)",
      };
      return map[value] || null;
    }
    if (facet === "verification") {
      const map = {
        field_verified: "var(--verif-field)",
        desk_verified: "var(--verif-desk)",
        needs_verification: "var(--verif-needs)",
        unverifiable: "var(--verif-unver)",
      };
      return map[value] || null;
    }
    if (facet === "inclusion_tier") {
      const map = {
        core: "var(--tier-core)",
        borderline: "var(--tier-borderline)",
        below_threshold: "var(--tier-below)",
      };
      return map[value] || null;
    }
    return null;
  }

  function buildFilters() {
    const container = document.querySelector(".filters__groups");
    if (!container) return;
    container.innerHTML = "";

    // مساعد لبناء filter-group واحد — مُستخرَج لتجنّب التكرار
    const buildOneFilterGroup = (facet) => {
      const counts = getFacetCounts(facet);
      if (counts.size === 0) return null;

      const group = document.createElement("div");
      group.className = "filter-group";
      group.dataset.facet = facet;

      const titleBtn = document.createElement("button");
      titleBtn.className = "filter-group__title";
      titleBtn.type = "button";
      titleBtn.setAttribute("aria-expanded", "true");
      titleBtn.innerHTML = `
        <span>${escapeHtml(FACET_TITLES[facet] || facet)}</span>
        <span class="filter-group__count">${counts.size}</span>
      `;
      titleBtn.addEventListener("click", () => {
        const isCollapsing = !group.classList.contains("is-collapsed");
        group.classList.toggle("is-collapsed");
        titleBtn.setAttribute("aria-expanded", isCollapsing ? "false" : "true");
      });
      // اطوِ افتراضياً فقط الفلاتر الطويلة جداً (>25 قيمة) — البقية مفتوحة
      if (counts.size > 25) {
        group.classList.add("is-collapsed");
        titleBtn.setAttribute("aria-expanded", "false");
      }
      group.appendChild(titleBtn);

      const list = document.createElement("div");
      list.className = "filter-group__options";

      let sortedEntries;
      const semantic = FACET_SEMANTIC_ORDER[facet];
      if (facet === "founded_decade") {
        // ترتيب زمني تنازلي: 2020s، 2010s، ...
        sortedEntries = Array.from(counts.entries())
          .sort((a, b) => parseInt(String(b[0])) - parseInt(String(a[0])));
      } else if (semantic) {
        // ترتيب دلالي حسب القائمة + غيرها في النهاية
        const rank = new Map();
        semantic.forEach((v, i) => rank.set(String(v), i));
        sortedEntries = Array.from(counts.entries()).sort((a, b) => {
          const ra = rank.has(String(a[0])) ? rank.get(String(a[0])) : 999;
          const rb = rank.has(String(b[0])) ? rank.get(String(b[0])) : 999;
          return ra - rb || b[1] - a[1];
        });
      } else {
        // الافتراضي: ترتيب حسب العدد تنازلياً
        sortedEntries = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
      }
      sortedEntries.forEach(([value, count]) => {
        const optLabel = document.createElement("label");
        optLabel.className = "filter-option";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = value;
        checkbox.dataset.facet = facet;
        checkbox.checked = state.filters[facet].has(value);
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) state.filters[facet].add(value);
          else state.filters[facet].delete(value);
          syncHash();
          render();
        });

        const color = getColorForValue(facet, value);
        if (color) {
          const swatch = document.createElement("span");
          swatch.className = "filter-option__color";
          swatch.style.backgroundColor = color;
          optLabel.appendChild(checkbox);
          optLabel.appendChild(swatch);
        } else {
          optLabel.appendChild(checkbox);
        }

        const text = document.createElement("span");
        text.textContent = label(facet, value);
        optLabel.appendChild(text);

        const countEl = document.createElement("span");
        countEl.className = "filter-option__count";
        countEl.textContent = count;
        optLabel.appendChild(countEl);

        list.appendChild(optLabel);
      });

      group.appendChild(list);
      return group;
    };

    // مساعد للترتيب الدلائلي/الزمني/العددي لقيم facet
    const sortFacetEntries = (counts, facet) => {
      const semantic = FACET_SEMANTIC_ORDER[facet];
      if (facet === "founded_decade") {
        return Array.from(counts.entries())
          .sort((a, b) => parseInt(String(b[0])) - parseInt(String(a[0])));
      }
      if (semantic) {
        const rank = new Map();
        semantic.forEach((v, i) => rank.set(String(v), i));
        return Array.from(counts.entries()).sort((a, b) => {
          const ra = rank.has(String(a[0])) ? rank.get(String(a[0])) : 999;
          const rb = rank.has(String(b[0])) ? rank.get(String(b[0])) : 999;
          return ra - rb || b[1] - a[1];
        });
      }
      return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
    };

    // مساعد لبناء صف option واحد (مع checkbox/swatch/label/count)
    const buildOptionRow = (facet, value, count, extraClass = "") => {
      const optLabel = document.createElement("label");
      optLabel.className = "filter-option " + extraClass;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = value;
      checkbox.dataset.facet = facet;
      checkbox.checked = state.filters[facet].has(value);
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) state.filters[facet].add(value);
        else state.filters[facet].delete(value);
        syncHash();
        render();
      });

      const color = getColorForValue(facet, value);
      if (color) {
        const swatch = document.createElement("span");
        swatch.className = "filter-option__color";
        swatch.style.backgroundColor = color;
        optLabel.appendChild(checkbox);
        optLabel.appendChild(swatch);
      } else {
        optLabel.appendChild(checkbox);
      }

      const text = document.createElement("span");
      text.textContent = label(facet, value);
      text.className = "filter-option__text";
      optLabel.appendChild(text);

      const countEl = document.createElement("span");
      countEl.className = "filter-option__count";
      countEl.textContent = count;
      optLabel.appendChild(countEl);
      return optLabel;
    };

    // === بناء فلتر هرمي: أب → أبناء داخل عُقد قابلة للطيّ ===
    const buildHierarchical = (parentFacet, childFacet, hierarchyMap) => {
      const parentCounts = getFacetCounts(parentFacet);
      const childCounts = getFacetCounts(childFacet);
      if (parentCounts.size === 0) return null;

      const group = document.createElement("div");
      group.className = "filter-group filter-group--hierarchy";
      group.dataset.facet = parentFacet;

      const titleBtn = document.createElement("button");
      titleBtn.className = "filter-group__title";
      titleBtn.type = "button";
      titleBtn.setAttribute("aria-expanded", "true");
      titleBtn.innerHTML = `
        <span>${escapeHtml(FACET_TITLES[parentFacet] || parentFacet)}</span>
        <span class="filter-group__count">${parentCounts.size}</span>
      `;
      titleBtn.addEventListener("click", () => {
        const isCollapsing = !group.classList.contains("is-collapsed");
        group.classList.toggle("is-collapsed");
        titleBtn.setAttribute("aria-expanded", isCollapsing ? "false" : "true");
      });
      group.appendChild(titleBtn);

      const list = document.createElement("div");
      list.className = "filter-group__options";

      const parentEntries = sortFacetEntries(parentCounts, parentFacet);
      parentEntries.forEach(([parentVal, parentCount]) => {
        // عقدة الأب
        const node = document.createElement("div");
        node.className = "filter-node";

        const parentRow = document.createElement("div");
        parentRow.className = "filter-node__parent";

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "filter-node__toggle";
        toggle.setAttribute("aria-label", "تمدّد/طيّ");
        toggle.textContent = "▾";
        parentRow.appendChild(toggle);

        parentRow.appendChild(buildOptionRow(parentFacet, parentVal, parentCount, "filter-option--parent"));
        node.appendChild(parentRow);

        // عقد الأبناء — فقط ما ينتمي للأب
        const childrenSet = hierarchyMap.get(parentVal) || new Set();
        if (childrenSet.size > 0) {
          const childList = document.createElement("div");
          childList.className = "filter-node__children";
          const childEntries = Array.from(childrenSet)
            .filter((c) => childCounts.has(c))
            .map((c) => [c, childCounts.get(c)])
            .sort((a, b) => b[1] - a[1]);
          childEntries.forEach(([childVal, childCount]) => {
            childList.appendChild(buildOptionRow(childFacet, childVal, childCount, "filter-option--child"));
          });
          node.appendChild(childList);

          toggle.addEventListener("click", (e) => {
            e.preventDefault();
            node.classList.toggle("is-children-collapsed");
            toggle.textContent = node.classList.contains("is-children-collapsed") ? "▸" : "▾";
          });
          // الأبناء مطوية بشكل افتراضي للأقسام الطويلة
          if (childrenSet.size > 8 || parentEntries.length > 4) {
            node.classList.add("is-children-collapsed");
            toggle.textContent = "▸";
          }
        } else {
          toggle.style.visibility = "hidden";
        }

        list.appendChild(node);
      });

      group.appendChild(list);
      return group;
    };

    // === ابنِ الأقسام ===
    const hierarchyMaps = computeHierarchyMaps();

    FACET_SECTIONS.forEach((section) => {
      let groups = [];
      if (section.hierarchy) {
        const { parent, child } = section.hierarchy;
        const g = buildHierarchical(parent, child, hierarchyMaps[parent]);
        if (g) groups.push(g);
      } else if (section.facets) {
        groups = section.facets.map((f) => buildOneFilterGroup(f)).filter(Boolean);
      }
      if (groups.length === 0) return;

      const sectionEl = document.createElement("div");
      sectionEl.className = "filters__section";
      const sectionTitle = document.createElement("h3");
      sectionTitle.className = "filters__section-title";
      sectionTitle.textContent = section.title;
      sectionEl.appendChild(sectionTitle);
      groups.forEach((g) => sectionEl.appendChild(g));
      container.appendChild(sectionEl);
    });

    // كذلك ابنِ شريط شارات المجموعات الرئيسة فوق الشبكة
    buildCategoriesNav();
  }

  // === شارات المجموعات الرئيسة فوق شبكة البطاقات ===
  function buildCategoriesNav() {
    const nav = document.querySelector(".categories-nav");
    if (!nav) return;
    const counts = getFacetCounts("type_group");
    if (counts.size === 0) return;

    // ترتيب المجموعات حسب الـ semantic order إن وُجد
    const orderedKeys = [
      "research_education", "publishing_knowledge", "media_audience",
      "museums_culture", "institutional_infra", "individual_actors",
    ];

    nav.innerHTML = "";

    // "الكل"
    const allBadge = document.createElement("button");
    allBadge.type = "button";
    allBadge.className = "category-badge category-badge--all";
    if (state.filters.type_group.size === 0) allBadge.classList.add("is-active");
    allBadge.innerHTML = `الكل <span class="category-badge__count">${state.entities.length}</span>`;
    allBadge.addEventListener("click", () => {
      state.filters.type_group.clear();
      syncHash();
      render();
    });
    nav.appendChild(allBadge);

    orderedKeys.forEach((key) => {
      const count = counts.get(key) || 0;
      if (count === 0) return;
      const badge = document.createElement("button");
      badge.type = "button";
      badge.className = "category-badge";
      const color = getColorForValue("type_group", key);
      if (color) badge.style.setProperty("--badge-color", color);
      if (state.filters.type_group.has(key)) badge.classList.add("is-active");
      badge.innerHTML = `${escapeHtml(label("type_group", key))}<span class="category-badge__count">${count}</span>`;
      badge.addEventListener("click", () => {
        if (state.filters.type_group.has(key)) {
          state.filters.type_group.delete(key);
        } else {
          state.filters.type_group.clear();
          state.filters.type_group.add(key);
        }
        syncHash();
        render();
      });
      nav.appendChild(badge);
    });
  }

  // ============================================================
  // 7. الفلترة + البحث + الفرز
  // ============================================================

  function matchesQuery(entity, q) {
    if (!q) return true;
    const haystack = [
      entity.name_ar, entity.name_en, entity.city_ar,
      entity.description_ar, entity.notes_ar,
      ...(entity.aka || []),
      ...(entity.key_figures || []),
      label("country", entity.country),
      label("region", entity.region),
    ].filter(Boolean).join(" ").toLowerCase();
    return haystack.includes(q.toLowerCase());
  }

  function matchesFilters(entity) {
    for (const facet of FACET_ORDER) {
      const selected = state.filters[facet];
      if (selected.size === 0) continue;
      const values = getFacetValues(entity, facet);
      const hit = values.some((v) => selected.has(v));
      if (!hit) return false;
    }
    return true;
  }

  function getFiltered() {
    const q = state.query.trim();
    let list = state.entities.filter((e) => matchesFilters(e) && matchesQuery(e, q));

    const sortField = state.sort;
    list.sort((a, b) => {
      if (sortField === "name_ar") {
        return (a.name_ar || "").localeCompare(b.name_ar || "", "ar");
      }
      if (sortField === "founded") {
        const af = a.founded || 9999;
        const bf = b.founded || 9999;
        return af - bf;
      }
      if (sortField === "round") {
        return (a.round || "").localeCompare(b.round || "");
      }
      if (sortField === "tier") {
        const tierOrder = { core: 0, borderline: 1, below_threshold: 2 };
        return (tierOrder[a.inclusion_tier] ?? 3) - (tierOrder[b.inclusion_tier] ?? 3);
      }
      return 0;
    });
    return list;
  }

  // ============================================================
  // 8. الرسم (Rendering)
  // ============================================================

  function render() {
    const filtered = getFiltered();
    renderResultsHeader(filtered.length);
    renderGrid(filtered);
    buildCategoriesNav();  // حدّث الحالة النشطة للشارات
  }

  function renderResultsHeader(filteredCount) {
    const countEl = document.querySelector(".results__count");
    if (countEl) {
      const total = state.entities.length;
      if (filteredCount === total) {
        countEl.innerHTML = `عرض <strong>${total}</strong> بطاقة`;
      } else {
        countEl.innerHTML = `<strong>${filteredCount}</strong> من <strong>${total}</strong>`;
      }
    }

    // الفلاتر النشطة
    const activeFiltersEl = document.querySelector(".results__active-filters");
    if (!activeFiltersEl) return;
    activeFiltersEl.innerHTML = "";

    FACET_ORDER.forEach((facet) => {
      state.filters[facet].forEach((value) => {
        const chip = document.createElement("span");
        chip.className = "active-filter";
        chip.innerHTML = `${FACET_TITLES[facet]}: ${label(facet, value)}<button class="active-filter__remove" aria-label="إزالة">×</button>`;
        chip.querySelector("button").addEventListener("click", () => {
          state.filters[facet].delete(value);
          const checkbox = document.querySelector(`.filter-option input[data-facet="${facet}"][value="${value}"]`);
          if (checkbox) checkbox.checked = false;
          syncHash();
          render();
        });
        activeFiltersEl.appendChild(chip);
      });
    });

    if (state.query) {
      const chip = document.createElement("span");
      chip.className = "active-filter";
      chip.innerHTML = `بحث: ${escapeHtml(state.query)}<button class="active-filter__remove" aria-label="إزالة">×</button>`;
      chip.querySelector("button").addEventListener("click", () => {
        state.query = "";
        const input = document.querySelector(".search-input");
        if (input) input.value = "";
        syncHash();
        render();
      });
      activeFiltersEl.appendChild(chip);
    }
  }

  function renderGrid(list) {
    const grid = document.querySelector(".results__grid");
    if (!grid) return;

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <h3 class="empty-state__title">لا توجد بطاقات تطابق المعايير</h3>
          <p class="empty-state__hint">جرّب إزالة بعض الفلاتر أو تبسيط البحث.</p>
        </div>`;
      return;
    }

    const fragment = document.createDocumentFragment();
    list.forEach((entity) => fragment.appendChild(createCard(entity)));
    grid.innerHTML = "";
    grid.appendChild(fragment);
  }

  function createCard(entity) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = entity.id;
    card.dataset.typeGroup = entity.type_group;
    card.dataset.tier = entity.inclusion_tier;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", entity.name_ar);

    const cityCountry = [entity.city_ar, label("country", entity.country)].filter(Boolean).join("، ");
    const subjects = (entity.subjects || []).slice(0, 3);
    const desc = describeEntity(entity);

    card.innerHTML = `
      <header class="card__header">
        <span class="card__type">${escapeHtml(label("type", entity.type))}</span>
        <span class="card__indicators">
          ${entity.inclusion_tier ? `<span class="card__tier tier--${entity.inclusion_tier}" title="${escapeHtml(label("inclusion_tier", entity.inclusion_tier))}">${escapeHtml(label("inclusion_tier", entity.inclusion_tier))}</span>` : ""}
          ${entity.verification ? `<span class="verif-dot" title="${label("verification", entity.verification)}"></span>` : ""}
          <span class="card__id">${escapeHtml(entity.id)}</span>
        </span>
      </header>
      <h3 class="card__title">${escapeHtml(entity.name_ar)}</h3>
      <p class="card__meta">
        ${cityCountry ? `<span class="card__meta-item">📍 ${escapeHtml(cityCountry)}</span>` : ""}
        ${entity.founded ? `<span class="card__meta-item">📅 ${entity.founded}</span>` : ""}
      </p>
      <p class="card__desc${desc.synthesized ? " card__desc--synthesized" : ""}">${escapeHtml(desc.text)}</p>
      <footer class="card__footer">
        ${subjects.map((s) => `<span class="card__tag" data-facet="subjects" data-value="${s}">${escapeHtml(label("subjects", s))}</span>`).join("")}
      </footer>
    `;

    // علاج بسيط للتطابق بين قيم verification وأسماء الـ CSS classes
    const dotEl = card.querySelector(".verif-dot");
    if (dotEl && entity.verification) {
      dotEl.className = "verif-dot " + verifClass(entity.verification);
      dotEl.setAttribute("title", label("verification", entity.verification));
    }

    card.addEventListener("click", (e) => {
      // النقر على الوسم → فلتر بدل فتح المودال
      const tag = e.target.closest(".card__tag");
      if (tag) {
        e.stopPropagation();
        addFilter(tag.dataset.facet, tag.dataset.value);
        return;
      }
      openModal(entity.id);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(entity.id);
      }
    });

    return card;
  }

  function verifClass(verif) {
    const map = {
      field_verified: "verif-dot--field",
      desk_verified: "verif-dot--desk",
      needs_verification: "verif-dot--needs",
      unverifiable: "verif-dot--unver",
    };
    return map[verif] || "verif-dot--unver";
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // وصف احتياطي مُولَّد من الحقول البنيوية حين يغيب description_ar.
  // ليس اختراعاً — إعادة صياغة لبيانات موجودة في الـ schema.
  function describeEntity(entity) {
    if (entity.description_ar) return { text: entity.description_ar, synthesized: false };

    const parts = [];
    const typeLabel = label("type", entity.type);
    const location = [entity.city_ar, label("country", entity.country)].filter(Boolean).join("، ");

    if (typeLabel && typeLabel !== "—") {
      parts.push(location ? `${typeLabel} في ${location}` : typeLabel);
    } else if (location) {
      parts.push(`مقره ${location}`);
    }

    if (entity.parent_organization_ar) {
      parts.push(`تابع لـ${entity.parent_organization_ar}`);
    }
    if (entity.founded) {
      parts.push(`تأسس عام ${entity.founded}`);
    }
    if (entity.subjects && entity.subjects.length > 0) {
      const subs = entity.subjects.slice(0, 3).map((s) => label("subjects", s)).join("، ");
      parts.push(`تخصصاته: ${subs}`);
    } else if (entity.key_figures && entity.key_figures.length > 0) {
      parts.push(`من شخصياته البارزة: ${entity.key_figures.slice(0, 2).join("، ")}`);
    }

    const text = parts.length ? parts.join(". ") + "." : "لا يتوفّر وصف تفصيلي في المصدر.";
    return { text, synthesized: true };
  }

  // ============================================================
  // 9. المودال (نافذة التفاصيل)
  // ============================================================

  function buildModal() {
    if (document.querySelector(".entity-modal")) return;

    const modal = document.createElement("dialog");
    modal.className = "entity-modal";
    modal.innerHTML = `
      <div class="entity-modal__inner">
        <header class="entity-modal__header">
          <button class="entity-modal__close" aria-label="إغلاق">×</button>
          <div class="entity-modal__type"></div>
          <h2 class="entity-modal__title"></h2>
          <p class="entity-modal__subtitle"></p>
          <div class="entity-modal__id"></div>
        </header>
        <div class="entity-modal__body"></div>
        <footer class="entity-modal__footer">
          <div class="entity-modal__source-info"></div>
          <div class="entity-modal__actions"></div>
        </footer>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".entity-modal__close").addEventListener("click", () => modal.close());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });
  }

  function openModal(id) {
    const entity = state.entities.find((e) => e.id === id);
    if (!entity) return;

    const modal = document.querySelector(".entity-modal");
    if (!modal) return;

    // المجموعات الستّ الجديدة → CSS variable مباشرة (research_education → --type-research-education)
    const accent = `var(--type-${(entity.type_group || "").replace(/_/g, "-")})`;
    modal.style.setProperty("--card-accent", accent);

    modal.querySelector(".entity-modal__type").textContent = label("type", entity.type);
    modal.querySelector(".entity-modal__title").textContent = entity.name_ar;
    const subtitle = modal.querySelector(".entity-modal__subtitle");
    subtitle.textContent = entity.name_en || "";
    subtitle.style.display = entity.name_en ? "block" : "none";
    modal.querySelector(".entity-modal__id").textContent = entity.id;

    renderModalBody(modal, entity);
    renderModalFooter(modal, entity);

    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
    state.selectedId = id;
    syncHash();
  }

  function renderModalBody(modal, entity) {
    const body = modal.querySelector(".entity-modal__body");
    body.innerHTML = "";

    // الحقائق الأساسية
    const facts = [];
    if (entity.country) facts.push(["الدولة", label("country", entity.country), "country", entity.country]);
    if (entity.city_ar) facts.push(["المدينة", entity.city_ar, null, null]);
    if (entity.region) facts.push(["الإقليم", label("region", entity.region), "region", entity.region]);
    if (entity.founded) facts.push(["سنة التأسيس", entity.founded, null, null]);
    if (entity.founded_decade) facts.push(["العقد", entity.founded_decade, "founded_decade", entity.founded_decade]);
    if (entity.scale) facts.push(["النطاق", label("scale", entity.scale), "scale", entity.scale]);
    if (entity.status) facts.push(["الحالة", label("status", entity.status), "status", entity.status]);
    if (entity.funding_type) facts.push(["التمويل", label("funding_type", entity.funding_type), "funding_type", entity.funding_type]);
    if (entity.inclusion_tier) facts.push(["مستوى الإدراج", label("inclusion_tier", entity.inclusion_tier), "inclusion_tier", entity.inclusion_tier]);
    if (entity.verification) facts.push(["التحقق", label("verification", entity.verification), "verification", entity.verification]);
    if (entity.round) facts.push(["الجولة", label("round", entity.round), "round", entity.round]);

    if (facts.length) {
      const section = document.createElement("div");
      section.className = "modal-section";
      section.innerHTML = `<h3 class="modal-section__title">المعلومات الأساسية</h3>`;
      const grid = document.createElement("div");
      grid.className = "modal-facts";
      facts.forEach(([label_, value, facet, code]) => {
        const fact = document.createElement("div");
        fact.className = "modal-fact";
        const isLink = facet && code;
        fact.innerHTML = `
          <span class="modal-fact__label">${escapeHtml(label_)}</span>
          <span class="modal-fact__value${isLink ? " modal-fact__value--link" : ""}">${escapeHtml(value)}</span>
        `;
        if (isLink) {
          fact.querySelector(".modal-fact__value").addEventListener("click", () => {
            closeModal();
            addFilter(facet, code);
          });
        }
        grid.appendChild(fact);
      });
      section.appendChild(grid);
      body.appendChild(section);
    }

    // الوصف
    const desc = describeEntity(entity);
    body.appendChild(modalSection(
      desc.synthesized ? "نبذة (مُولَّدة آلياً)" : "النبذة",
      `<p${desc.synthesized ? ' class="modal-section__synthesized"' : ""}>${escapeHtml(desc.text)}</p>`
    ));

    // الملاحظات
    if (entity.notes_ar) {
      body.appendChild(modalSection("ملاحظات منهجية", `<p>${escapeHtml(entity.notes_ar)}</p>`));
    }

    // الموضوعات
    if (entity.subjects && entity.subjects.length) {
      const tags = entity.subjects.map((s) =>
        `<span class="tag-list__item" data-facet="subjects" data-value="${s}">${escapeHtml(label("subjects", s))}</span>`
      ).join("");
      const section = modalSection("الموضوعات", `<div class="tag-list">${tags}</div>`);
      section.querySelectorAll(".tag-list__item").forEach((el) => {
        el.addEventListener("click", () => {
          closeModal();
          addFilter("subjects", el.dataset.value);
        });
      });
      body.appendChild(section);
    }

    // اللغات — قابلة للنقر لتصبح فلتراً
    if (entity.languages && entity.languages.length) {
      const tags = entity.languages.map((l) =>
        `<span class="tag-list__item" data-facet="languages" data-value="${l}">${escapeHtml(label("languages", l))}</span>`
      ).join("");
      const section = modalSection("اللغات", `<div class="tag-list">${tags}</div>`);
      section.querySelectorAll(".tag-list__item").forEach((el) => {
        el.addEventListener("click", () => {
          closeModal();
          addFilter("languages", el.dataset.value);
        });
      });
      body.appendChild(section);
    }

    // المخرجات — قابلة للنقر
    if (entity.output_types && entity.output_types.length) {
      const tags = entity.output_types.map((o) =>
        `<span class="tag-list__item" data-facet="output_types" data-value="${o}">${escapeHtml(label("output_types", o))}</span>`
      ).join("");
      const section = modalSection("نوع الإنتاج", `<div class="tag-list">${tags}</div>`);
      section.querySelectorAll(".tag-list__item").forEach((el) => {
        el.addEventListener("click", () => {
          closeModal();
          addFilter("output_types", el.dataset.value);
        });
      });
      body.appendChild(section);
    }

    // الشخصيات — نقرة = بحث نصّي بالاسم
    if (entity.key_figures && entity.key_figures.length) {
      const tags = entity.key_figures.map((p) =>
        `<span class="tag-list__item is-person" data-name="${escapeHtml(p)}">${escapeHtml(p)}</span>`
      ).join("");
      const section = modalSection("الشخصيات البارزة", `<div class="tag-list">${tags}</div>`);
      section.querySelectorAll(".tag-list__item").forEach((el) => {
        el.addEventListener("click", () => {
          closeModal();
          const tabs = Array.from(document.querySelectorAll(".tab"));
          const panels = Array.from(document.querySelectorAll(".panel"));
          activateTab("entities", tabs, panels);
          safeSetItem(STORAGE_KEY, "entities");
          state.query = el.dataset.name;
          const search = document.querySelector(".search-input");
          if (search) search.value = el.dataset.name;
          render();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      });
      body.appendChild(section);
    }

    // المؤسسة الأم
    if (entity.parent_organization_ar) {
      body.appendChild(modalSection("المؤسسة الأم", `<p>${escapeHtml(entity.parent_organization_ar)}</p>`));
    }

    // العلاقات الصريحة
    if (entity.explicit_relations && entity.explicit_relations.length) {
      const items = entity.explicit_relations.map((rel) => {
        const target = state.entities.find((e) => e.id === rel.target);
        const targetName = target ? target.name_ar : rel.target;
        return `
          <div class="relation-item" data-target-id="${rel.target}">
            <span class="relation-item__type">${escapeHtml(label("relation_type", rel.type))}</span>
            <span class="relation-item__name">${escapeHtml(targetName)}</span>
            <span class="relation-item__id">${escapeHtml(rel.target)}</span>
          </div>
        `;
      }).join("");
      const section = modalSection("العلاقات الصريحة", items);
      section.querySelectorAll(".relation-item").forEach((el) => {
        el.addEventListener("click", () => openModal(el.dataset.targetId));
      });
      body.appendChild(section);
    }

    // العلاقات الضمنية (faceted)
    const facetCounts = computeFacetedRelated(entity);
    if (facetCounts.length) {
      const items = facetCounts.map((fr) => `
        <div class="facet-related__item" data-facet="${fr.facet}" data-value="${fr.value}">
          <span class="facet-related__label">${escapeHtml(fr.labelText)}</span>
          <span class="facet-related__count">${fr.count}</span>
        </div>
      `).join("");
      const section = modalSection("كيانات مشابهة عبر الفلاتر", `<div class="facet-related">${items}</div>`);
      section.querySelectorAll(".facet-related__item").forEach((el) => {
        el.addEventListener("click", () => {
          closeModal();
          addFilter(el.dataset.facet, el.dataset.value);
        });
      });
      body.appendChild(section);
    }
  }

  function modalSection(title, html) {
    const section = document.createElement("div");
    section.className = "modal-section";
    section.innerHTML = `
      <h3 class="modal-section__title">${escapeHtml(title)}</h3>
      <div class="modal-section__content">${html}</div>
    `;
    return section;
  }

  function computeFacetedRelated(entity) {
    // ابحث عن كم بطاقة أخرى تشترك مع هذه البطاقة في كل قيمة من قيم حقولها
    const results = [];
    const facets = ["country", "type_group", "founded_decade", "scale", "funding_type"];

    facets.forEach((facet) => {
      const value = getFacetValue(entity, facet);
      if (!value) return;
      const count = state.entities.filter((e) => e.id !== entity.id && getFacetValue(e, facet) === value).length;
      if (count > 0) {
        results.push({
          facet,
          value,
          count,
          labelText: `نفس ${FACET_TITLES[facet]}: ${label(facet, value)}`,
        });
      }
    });

    // المواضيع (مصفوفة)
    (entity.subjects || []).forEach((subj) => {
      const count = state.entities.filter((e) => e.id !== entity.id && (e.subjects || []).includes(subj)).length;
      if (count > 0) {
        results.push({
          facet: "subjects",
          value: subj,
          count,
          labelText: `نفس الموضوع: ${label("subjects", subj)}`,
        });
      }
    });

    // الشخصيات (محقق بسيط: من يشارك في key_figures)
    (entity.key_figures || []).forEach((person) => {
      const count = state.entities.filter((e) => e.id !== entity.id && (e.key_figures || []).includes(person)).length;
      if (count > 0) {
        results.push({
          facet: "_person",
          value: person,
          count,
          labelText: `نفس الشخصية: ${person}`,
        });
      }
    });

    return results.sort((a, b) => b.count - a.count).slice(0, 12);
  }

  function renderModalFooter(modal, entity) {
    const sourceInfo = modal.querySelector(".entity-modal__source-info");
    const actions = modal.querySelector(".entity-modal__actions");

    sourceInfo.innerHTML = "";
    if (entity.sources && entity.sources.length) {
      const s = entity.sources[0];
      sourceInfo.innerHTML = `<small style="color: var(--color-text-muted)">المصدر: <code>${escapeHtml(s.round_file)}</code> ${s.anchor ? `· ${escapeHtml(s.anchor)}` : ""}</small>`;
    }

    actions.innerHTML = "";
    if (entity.url) {
      const link = document.createElement("a");
      link.href = entity.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "btn btn--primary btn--small";
      link.textContent = "↗ الموقع الرسمي";
      actions.appendChild(link);
    }
  }

  function closeModal() {
    const modal = document.querySelector(".entity-modal");
    if (modal && modal.open) modal.close();
    state.selectedId = null;
    syncHash();
  }

  // ============================================================
  // 10. شريط الأدوات: البحث، الفرز، التصدير، المسح
  // ============================================================

  function bindToolbar() {
    const searchInput = document.querySelector(".search-input");
    if (searchInput) {
      searchInput.addEventListener("input", debounce((e) => {
        state.query = e.target.value;
        syncHash();
        render();
      }, 180));
    }

    const sortSelect = document.querySelector(".sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        state.sort = e.target.value;
        syncHash();
        render();
      });
    }

    const clearBtn = document.querySelector(".btn-clear");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        clearAllFilters();
      });
    }

    const exportCsvBtn = document.querySelector(".btn-export-csv");
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener("click", () => exportData("csv"));
    }

    const exportJsonBtn = document.querySelector(".btn-export-json");
    if (exportJsonBtn) {
      exportJsonBtn.addEventListener("click", () => exportData("json"));
    }
  }

  function addFilter(facet, value) {
    if (!state.filters[facet]) return;
    state.filters[facet].add(value);
    const checkbox = document.querySelector(`.filter-option input[data-facet="${facet}"][value="${value}"]`);
    if (checkbox) checkbox.checked = true;
    // افتح المجموعة لو كانت مطوية
    const group = document.querySelector(`.filter-group[data-facet="${facet}"]`);
    if (group) group.classList.remove("is-collapsed");
    syncHash();
    render();
  }

  function clearAllFilters() {
    FACET_ORDER.forEach((f) => state.filters[f].clear());
    state.query = "";
    const input = document.querySelector(".search-input");
    if (input) input.value = "";
    document.querySelectorAll(".filter-option input[type=checkbox]").forEach((cb) => { cb.checked = false; });
    syncHash();
    render();
  }

  // ============================================================
  // 11. التصدير
  // ============================================================

  function exportData(format) {
    const list = getFiltered();
    if (list.length === 0) return;

    if (format === "json") {
      const blob = new Blob([JSON.stringify(list, null, 2)], { type: "application/json" });
      downloadBlob(blob, `entities-filtered-${list.length}.json`);
    } else {
      const csv = toCSV(list);
      const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
      downloadBlob(blob, `entities-filtered-${list.length}.csv`);
    }
  }

  function toCSV(list) {
    const cols = [
      "id", "round", "name_ar", "name_en", "type", "type_group",
      "country", "city_ar", "region", "founded", "status",
      "inclusion_tier", "verification", "scale", "funding_type",
      "subjects", "languages", "key_figures", "url", "description_ar",
    ];
    const header = cols.join(",");
    const rows = list.map((e) => cols.map((c) => csvCell(e[c])).join(","));
    return [header, ...rows].join("\n");
  }

  function csvCell(value) {
    if (value === null || value === undefined) return "";
    if (Array.isArray(value)) value = value.join("; ");
    const str = String(value).replace(/"/g, '""');
    if (/[",\n]/.test(str)) return `"${str}"`;
    return str;
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ============================================================
  // 12. مزامنة الـ URL (#hash) لحفظ الحالة عند التحديث
  // ============================================================

  function syncHash() {
    const params = new URLSearchParams();
    if (state.query) params.set("q", state.query);
    if (state.sort !== "name_ar") params.set("sort", state.sort);
    FACET_ORDER.forEach((facet) => {
      if (state.filters[facet].size > 0) {
        params.set(facet, Array.from(state.filters[facet]).join(","));
      }
    });
    if (state.selectedId) params.set("entity", state.selectedId);
    const hash = params.toString();
    history.replaceState(null, "", hash ? `#${hash}` : window.location.pathname);
  }

  function restoreFromHash() {
    if (!window.location.hash) return;
    const params = new URLSearchParams(window.location.hash.slice(1));
    const q = params.get("q");
    if (q) {
      state.query = q;
      const input = document.querySelector(".search-input");
      if (input) input.value = q;
    }
    const sort = params.get("sort");
    if (sort) {
      state.sort = sort;
      const sel = document.querySelector(".sort-select");
      if (sel) sel.value = sort;
    }
    FACET_ORDER.forEach((facet) => {
      const val = params.get(facet);
      if (!val) return;
      val.split(",").forEach((v) => {
        state.filters[facet].add(v);
        const cb = document.querySelector(`.filter-option input[data-facet="${facet}"][value="${v}"]`);
        if (cb) {
          cb.checked = true;
          const group = document.querySelector(`.filter-group[data-facet="${facet}"]`);
          if (group) group.classList.remove("is-collapsed");
        }
      });
    });
    render();

    // افتح الكيان المُمرَّر في URL (deep link) — يجب أن يأتي بعد render
    const entityId = params.get("entity");
    if (entityId) {
      // اضمن وجود المودال المبني
      if (typeof buildModal === "function") buildModal();
      setTimeout(() => openModal(entityId), 60);
    }
  }

  // مستمع لزرّ الرجوع/التقدّم في المتصفح — يحدّث المودال تلقائياً
  window.addEventListener("hashchange", () => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const entityId = params.get("entity");
    const modal = document.querySelector(".entity-modal");
    if (entityId && state.selectedId !== entityId) {
      if (typeof buildModal === "function") buildModal();
      openModal(entityId);
    } else if (!entityId && modal && modal.open) {
      modal.close();
      state.selectedId = null;
    }
  });

  // ============================================================
  // 13. التشغيل
  // ============================================================

  function init() {
    initTabs();

    // إذا كان التبويب النشط هو الكيانات منذ التحميل، فعّل التحميل فوراً
    if (document.querySelector(".tab.is-active")?.dataset.tab === "entities") {
      loadEntities();
    } else {
      // حمّل البيانات في الخلفية لتحديث العداد فقط
      preloadCounts();
    }

    // أغلق المودال بـ ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  async function preloadCounts() {
    try {
      const response = await fetch("data.json");
      if (!response.ok) return;
      const data = await response.json();
      const total = Array.isArray(data.entities) ? data.entities.length : 0;
      const els = document.querySelectorAll('[data-count="entities"], [data-count="entities-header"]');
      els.forEach((el) => { el.textContent = String(total); });
      const roundsEl = document.querySelector('[data-count="rounds"]');
      if (roundsEl && data.rounds_completed) {
        roundsEl.textContent = String(data.rounds_completed.length);
      }
    } catch {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // ============================================================
  // 14. تبويب الإحصاءات — المرحلة 4
  // ============================================================

  const PALETTE_REGIONS = {
    arabia: "#0A4D68",
    levant_iraq_nile: "#2C7B96",
    maghreb: "#C39B5C",
    turkey: "#7B3B7B",
    non_arab_muslim: "#5B7B3E",
    western: "#B86E3B",
    global: "#3A3A3A",
  };

  // ألوان المجموعات الستّ الجديدة (v2 hierarchical)
  const PALETTE_TYPE_GROUPS = {
    research_education: "#3B70A8",    // أزرق علمي
    publishing_knowledge: "#8B2929",  // أحمر-كستنائي للنشر
    media_audience: "#4A4A4A",        // رمادي رقمي
    museums_culture: "#C9A646",       // ذهبي تراثي
    institutional_infra: "#6B5B95",   // بنفسجي مؤسسي
    individual_actors: "#2A7F62",     // أخضر فاعل
  };

  const PALETTE_SUBJECTS_CATEGORY = {
    classical_corpus: "#0A4D68",
    geography_space: "#5B7B3E",
    prophetic_demography: "#7B3B7B",
    auxiliary_sciences: "#8B2929",
    methodology_critique: "#6B5B95",
    application_outreach: "#2A7F62",
    applied_jurisprudence: "#B86E3B",
  };

  const PALETTE_TIERS = {
    core: "#0A4D68",
    borderline: "#C39B5C",
    below_threshold: "#9A9A9A",
  };

  const PALETTE_VERIFICATION = {
    field_verified: "#3D8B47",
    desk_verified: "#C9A33D",
    needs_verification: "#B83A2E",
    unverifiable: "#6B6B6B",
  };

  let statsRendered = false;
  let tooltipEl = null;

  function renderStats() {
    if (statsRendered) return;
    const container = document.querySelector("#tab-stats .stats");
    if (!container) return;

    container.innerHTML = "";
    container.appendChild(buildKPIs());
    container.appendChild(buildChartsGrid());
    statsRendered = true;
    if (!tooltipEl) initTooltip();
  }

  // ============================================================
  // الفجوات — تبويب استدراك البيانات الناقصة
  // ============================================================

  // تعريفات الفجوات: لكل حقل، نوع المدخلات + شرط "ناقص"
  const GAP_DEFS = [
    {
      field: "founded",
      title: "تاريخ التأسيس",
      icon: "📅",
      input: "year",
      missing: (e) => !e.founded,
      hint: "أدخل سنة التأسيس (مثلاً 1985)",
    },
    {
      field: "funding_type",
      title: "نوع التمويل",
      icon: "💰",
      input: "select",
      options: "funding_type",
      missing: (e) => !e.funding_type || e.funding_type === "unknown",
      hint: "حدّد المصدر التمويلي للكيان",
    },
    {
      field: "url",
      title: "الرابط الإلكتروني",
      icon: "🔗",
      input: "url",
      missing: (e) => !e.url,
      hint: "الموقع الرسمي أو صفحة تعريفية",
    },
    {
      field: "description_ar",
      title: "الوصف بالعربية",
      icon: "📝",
      input: "textarea",
      missing: (e) => !e.description_ar || e.description_ar.length < 40,
      hint: "وصف موجز 2-4 أسطر",
    },
    {
      field: "key_figures",
      title: "الشخصيات البارزة",
      icon: "👥",
      input: "tags",
      missing: (e) => !e.key_figures || e.key_figures.length === 0,
      hint: "أسماء مفصولة بفواصل (مؤسس، مدير، رئيس تحرير…)",
    },
    {
      field: "parent_organization_ar",
      title: "المؤسسة الأم",
      icon: "🏛",
      input: "text",
      missing: (e) => !e.parent_organization_ar,
      hint: "الجامعة أو المؤسسة التابع لها (إن وُجد)",
    },
  ];

  function loadGapEdits() {
    try {
      state.gapEdits = JSON.parse(localStorage.getItem("seerah-gap-edits") || "{}");
    } catch (_) {
      state.gapEdits = {};
    }
  }

  function saveGapEdit(entityId, field, value) {
    if (!state.gapEdits) state.gapEdits = {};
    if (!state.gapEdits[entityId]) state.gapEdits[entityId] = {};
    if (value === "" || value === null || value === undefined ||
        (Array.isArray(value) && value.length === 0)) {
      delete state.gapEdits[entityId][field];
      if (Object.keys(state.gapEdits[entityId]).length === 0) {
        delete state.gapEdits[entityId];
      }
    } else {
      state.gapEdits[entityId][field] = value;
    }
    try {
      localStorage.setItem("seerah-gap-edits", JSON.stringify(state.gapEdits));
    } catch (_) {}
    // طبّق على الكيان في الذاكرة فوراً
    const e = state.entities.find((x) => x.id === entityId);
    if (e) {
      if (value === "" || value === null || value === undefined ||
          (Array.isArray(value) && value.length === 0)) {
        delete e[field];
      } else {
        e[field] = value;
        // اضبط founded_decade تلقائياً
        if (field === "founded" && typeof value === "number") {
          e.founded_decade = (Math.floor(value / 10) * 10) + "s";
        }
      }
    }
  }

  function applyGapEdits() {
    if (!state.gapEdits) return;
    Object.entries(state.gapEdits).forEach(([id, fields]) => {
      const e = state.entities.find((x) => x.id === id);
      if (!e) return;
      Object.entries(fields).forEach(([f, v]) => {
        e[f] = v;
        if (f === "founded" && typeof v === "number") {
          e.founded_decade = (Math.floor(v / 10) * 10) + "s";
        }
      });
    });
  }

  function countEditedEntities() {
    return Object.keys(state.gapEdits || {}).length;
  }

  function getTotalMissingCount() {
    return GAP_DEFS.reduce((sum, g) =>
      sum + state.entities.filter((e) => g.missing(e)).length, 0);
  }

  function renderGaps() {
    const container = document.querySelector("#tab-gaps .gaps");
    if (!container) return;

    const totalEdits = countEditedEntities();
    const totalMissing = getTotalMissingCount();

    // البطاقات الإجمالية + أزرار التحكم
    const summaryHtml = `
      <div class="gaps__header">
        <div>
          <h2 class="gaps__title">استدراك فجوات البيانات</h2>
          <p class="gaps__hint">حرّر الحقول الناقصة مباشرة. التعديلات تُحفظ محلياً ويمكن تصديرها كملف data.json محدّث.</p>
        </div>
        <div class="gaps__actions">
          <span class="gaps__counter" data-edits-counter>${totalEdits} تعديل محفوظ محلياً</span>
          <button class="btn btn--primary" type="button" id="gaps-export">⬇ تصدير data.json المعدّل</button>
          <button class="btn btn--ghost" type="button" id="gaps-clear">مسح التعديلات</button>
        </div>
      </div>

      <div class="gaps__overview">
        ${GAP_DEFS.map((g) => {
          const missing = state.entities.filter((e) => g.missing(e)).length;
          const pct = Math.round((missing / state.entities.length) * 100);
          return `
            <div class="gaps__overview-card" data-field="${g.field}">
              <div class="gaps__overview-icon">${g.icon}</div>
              <div class="gaps__overview-value">${missing}</div>
              <div class="gaps__overview-label">${escapeHtml(g.title)}</div>
              <div class="gaps__overview-pct">${pct}% من الإجمالي</div>
            </div>
          `;
        }).join("")}
      </div>

      <div class="gaps__sections">
        ${GAP_DEFS.map((g) => `
          <details class="gap-section" data-field="${g.field}">
            <summary class="gap-section__summary">
              <span class="gap-section__icon">${g.icon}</span>
              <span class="gap-section__title">${escapeHtml(g.title)}</span>
              <span class="gap-section__count">
                <span data-missing-count="${g.field}">${state.entities.filter((e) => g.missing(e)).length}</span>
                <span>ناقص</span>
              </span>
            </summary>
            <div class="gap-section__body" data-body="${g.field}"></div>
          </details>
        `).join("")}
      </div>
    `;
    container.innerHTML = summaryHtml;

    // اربط أزرار التحكم
    container.querySelector("#gaps-export").addEventListener("click", exportEditedDataJson);
    container.querySelector("#gaps-clear").addEventListener("click", clearAllGapEdits);

    // عند فتح section لأول مرة، ابنِ القائمة (lazy)
    container.querySelectorAll(".gap-section").forEach((section) => {
      section.addEventListener("toggle", () => {
        if (section.open) buildGapSectionBody(section.dataset.field);
      });
    });

    // اضغط على بطاقة الـ overview → افتح الـ section
    container.querySelectorAll(".gaps__overview-card").forEach((card) => {
      card.addEventListener("click", () => {
        const field = card.dataset.field;
        const section = container.querySelector(`.gap-section[data-field="${field}"]`);
        if (section) {
          section.open = true;
          section.scrollIntoView({ behavior: "smooth", block: "start" });
          buildGapSectionBody(field);
        }
      });
    });

    updateGapsTabBadge();
  }

  function buildGapSectionBody(field) {
    const body = document.querySelector(`.gap-section__body[data-body="${field}"]`);
    if (!body || body.dataset.built) return;
    body.dataset.built = "1";

    const gap = GAP_DEFS.find((g) => g.field === field);
    if (!gap) return;
    const list = state.entities.filter((e) => gap.missing(e));

    body.innerHTML = `
      <p class="gap-section__hint">${escapeHtml(gap.hint)}</p>
      <ol class="gap-rows">
        ${list.map((e) => renderGapRow(e, gap)).join("")}
      </ol>
    `;
    body.querySelectorAll(".gap-row").forEach((row) => {
      bindGapRowEvents(row, gap);
    });
  }

  function renderGapRow(entity, gap) {
    const safeId = entity.id;
    const safeName = escapeHtml(entity.name_ar || "");
    const country = entity.country ? `${flag(entity.country)} ${label("country", entity.country)}` : "";
    const region = entity.region ? label("region", entity.region) : "";
    const type = entity.type ? label("type", entity.type) : "";
    const inputHtml = gapInputHtml(entity, gap);
    return `
      <li class="gap-row" data-id="${safeId}">
        <div class="gap-row__meta">
          <span class="gap-row__id">${safeId}</span>
          <span class="gap-row__name">${safeName}</span>
          <span class="gap-row__chips">
            ${region ? `<span class="gap-row__chip">${escapeHtml(region)}</span>` : ""}
            ${country ? `<span class="gap-row__chip">${escapeHtml(country)}</span>` : ""}
            ${type ? `<span class="gap-row__chip">${escapeHtml(type)}</span>` : ""}
          </span>
        </div>
        <div class="gap-row__input">${inputHtml}</div>
        <button class="btn btn--ghost btn--small gap-row__open" type="button" title="افتح بطاقة الكيان">↗</button>
      </li>
    `;
  }

  function gapInputHtml(entity, gap) {
    const v = entity[gap.field];
    if (gap.input === "year") {
      return `<input type="number" min="500" max="2100" class="gap-input" data-field="${gap.field}" placeholder="مثلاً 1985" value="${v || ""}">`;
    }
    if (gap.input === "select") {
      const options = LABELS[gap.options] || {};
      return `<select class="gap-input" data-field="${gap.field}">
        <option value="">— اختر —</option>
        ${Object.entries(options).map(([k, lbl]) =>
          `<option value="${k}" ${v === k ? "selected" : ""}>${escapeHtml(lbl)}</option>`).join("")}
      </select>`;
    }
    if (gap.input === "url") {
      return `<input type="url" class="gap-input" data-field="${gap.field}" placeholder="https://…" value="${v || ""}">`;
    }
    if (gap.input === "textarea") {
      return `<textarea class="gap-input" data-field="${gap.field}" rows="2" placeholder="وصف موجز…">${escapeHtml(v || "")}</textarea>`;
    }
    if (gap.input === "tags") {
      const tags = Array.isArray(v) ? v.join(", ") : "";
      return `<input type="text" class="gap-input" data-field="${gap.field}" data-input-kind="tags" placeholder="اسم 1، اسم 2، …" value="${escapeHtml(tags)}">`;
    }
    return `<input type="text" class="gap-input" data-field="${gap.field}" value="${escapeHtml(v || "")}">`;
  }

  function bindGapRowEvents(row, gap) {
    const id = row.dataset.id;
    const input = row.querySelector(".gap-input");
    const openBtn = row.querySelector(".gap-row__open");
    const commit = debounce(() => {
      let value = input.value.trim();
      if (gap.input === "year") {
        value = value ? parseInt(value, 10) : null;
        if (!Number.isFinite(value)) value = null;
      } else if (input.dataset.inputKind === "tags") {
        value = value.split(/[،,]\s*/).map((s) => s.trim()).filter(Boolean);
      }
      saveGapEdit(id, gap.field, value);
      // علامة بصرية
      row.classList.add("is-saved");
      setTimeout(() => row.classList.remove("is-saved"), 1200);
      // إذا الحقل لم يعد ناقصاً، أزل الصف من الـ section
      const updated = state.entities.find((e) => e.id === id);
      if (updated && !gap.missing(updated)) {
        row.classList.add("is-resolved");
        setTimeout(() => row.remove(), 600);
        // حدّث العدّاد
        const cntEl = document.querySelector(`[data-missing-count="${gap.field}"]`);
        if (cntEl) cntEl.textContent = String(parseInt(cntEl.textContent, 10) - 1);
      }
      updateEditsCounter();
      updateGapsTabBadge();
    }, 600);
    input.addEventListener("input", commit);
    input.addEventListener("change", commit);
    openBtn.addEventListener("click", () => {
      buildModal();
      openModal(id);
    });
  }

  function updateEditsCounter() {
    const el = document.querySelector("[data-edits-counter]");
    if (el) el.textContent = `${countEditedEntities()} تعديل محفوظ محلياً`;
  }

  function updateGapsTabBadge() {
    const badge = document.querySelector('[data-count="gaps"]');
    if (!badge) return;
    const total = state.entities.length;
    const complete = state.entities.filter((e) => !GAP_DEFS.some((g) => g.missing(e))).length;
    badge.textContent = `${total - complete}`;
  }

  function exportEditedDataJson() {
    // ابنِ نسخة كاملة من data.json بمحتوى state.entities الحالي
    const out = {
      version: "2.1-edited",
      generated: new Date().toISOString().split("T")[0],
      schema: "schema.json (v2)",
      rounds_completed: ["01", "02", "03", "04", "05", "06"],
      edits_count: countEditedEntities(),
      entities: state.entities,
    };
    const blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json;charset=utf-8" });
    downloadBlob(blob, "data.json");
    if (typeof toast === "function") toast(`تم تصدير ${countEditedEntities()} تعديل`);
  }

  function clearAllGapEdits() {
    if (!confirm(`سيُحذف ${countEditedEntities()} تعديل من تخزينك المحلي. تأكيد؟`)) return;
    state.gapEdits = {};
    try { localStorage.removeItem("seerah-gap-edits"); } catch (_) {}
    if (typeof toast === "function") toast("حُذفت التعديلات المحلية. أعد تحميل الصفحة لاسترداد القيم الأصلية.");
    updateEditsCounter();
  }

  function initTooltip() {
    tooltipEl = document.createElement("div");
    tooltipEl.className = "chart-tooltip";
    document.body.appendChild(tooltipEl);
  }

  function showTooltip(title, value, event) {
    if (!tooltipEl) return;
    tooltipEl.innerHTML = `
      <div class="chart-tooltip__title">${escapeHtml(title)}</div>
      <div class="chart-tooltip__value">${escapeHtml(value)}</div>
    `;
    tooltipEl.classList.add("is-visible");
    moveTooltip(event);
  }

  function moveTooltip(event) {
    if (!tooltipEl) return;
    const x = event.clientX + 12;
    const y = event.clientY + 12;
    const maxX = window.innerWidth - tooltipEl.offsetWidth - 16;
    tooltipEl.style.left = Math.min(x, maxX) + "px";
    tooltipEl.style.top = y + "px";
  }

  function hideTooltip() {
    if (tooltipEl) tooltipEl.classList.remove("is-visible");
  }

  function jumpToEntitiesFilter(facet, value) {
    const tabs = Array.from(document.querySelectorAll(".tab"));
    const panels = Array.from(document.querySelectorAll(".panel"));
    activateTab("entities", tabs, panels);
    safeSetItem(STORAGE_KEY, "entities");
    clearAllFilters();
    if (state.filters[facet]) {
      addFilter(facet, value);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // sparkline صغير — sequence من القيم → SVG bars بسيط
  function sparkline(values, color = "currentColor") {
    if (!values.length) return "";
    const max = Math.max(...values, 1);
    const w = 100, h = 24, gap = 2;
    const barW = (w - gap * (values.length - 1)) / values.length;
    let svg = `<svg class="sparkline" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">`;
    values.forEach((v, i) => {
      const bh = Math.max((v / max) * h, 1);
      const x = i * (barW + gap);
      const y = h - bh;
      svg += `<rect x="${x}" y="${y}" width="${barW}" height="${bh}" fill="${color}" rx="1"/>`;
    });
    svg += `</svg>`;
    return svg;
  }

  function buildKPIs() {
    const ents = state.entities;
    const total = ents.length;
    const countries = new Set(ents.map((e) => e.country).filter(Boolean)).size;
    const coreCount = ents.filter((e) => e.inclusion_tier === "core").length;
    const relations = ents.reduce((sum, e) => sum + (e.explicit_relations?.length || 0), 0);
    const active = ents.filter((e) => e.status === "active").length;
    const suspended = ents.filter((e) => e.status === "suspended" || e.status === "closed").length;

    // sparkline data per round (1..6)
    const rounds = [1, 2, 3, 4, 5, 6];
    const perRound = (filter) => rounds.map((r) => ents.filter((e) => e.round === r && filter(e)).length);
    const seriesTotal = perRound(() => true);
    const seriesCore = perRound((e) => e.inclusion_tier === "core");
    const seriesCountries = rounds.map((r) =>
      new Set(ents.filter((e) => e.round === r).map((e) => e.country).filter(Boolean)).size
    );
    const seriesRelations = rounds.map((r) =>
      ents.filter((e) => e.round === r).reduce((s, e) => s + (e.explicit_relations?.length || 0), 0)
    );
    const seriesActive = perRound((e) => e.status === "active");

    const kpis = [
      { label: "إجمالي الكيانات", value: total, hint: "موزّعة على 6 جولات", accent: "var(--color-primary)", series: seriesTotal },
      { label: "تخصص أصلي (core)", value: coreCount, hint: `${Math.round(coreCount/total*100)}% من الإجمالي`, accent: "var(--tier-core)", series: seriesCore },
      { label: "دول مغطّاة", value: countries, hint: "في 5 قارات", accent: "var(--color-accent)", series: seriesCountries },
      { label: "علاقات صريحة", value: relations, hint: "بين الكيانات", accent: "var(--type-research)", series: seriesRelations },
      { label: "كيانات نشطة", value: active, hint: `${suspended} معلَّق/مغلق`, accent: "var(--verif-field)", series: seriesActive },
    ];

    const wrap = document.createElement("div");
    wrap.className = "kpis";
    kpis.forEach((k) => {
      const card = document.createElement("div");
      card.className = "kpi";
      card.style.setProperty("--kpi-accent", k.accent);
      card.innerHTML = `
        <div class="kpi__label">${escapeHtml(k.label)}</div>
        <div class="kpi__value">${k.value}</div>
        <div class="kpi__hint">${escapeHtml(k.hint)}</div>
        <div class="kpi__spark" title="التوزيع عبر الجولات الستّ (1 → 6)" style="color: ${k.accent};">
          ${sparkline(k.series)}
        </div>
      `;
      wrap.appendChild(card);
    });
    return wrap;
  }

  function buildChartsGrid() {
    const wrap = document.createElement("div");
    wrap.className = "charts";

    wrap.appendChild(buildWorldMap());
    wrap.appendChild(buildAnimatedTimeline());
    wrap.appendChild(buildPieRegions());
    wrap.appendChild(buildBarTypeGroups());
    wrap.appendChild(buildTimelineDecades());
    wrap.appendChild(buildBarCountries());
    wrap.appendChild(buildHeatmapRegionSubject());
    wrap.appendChild(buildStackedTierVerification());
    wrap.appendChild(buildTimelineImmersive());
    wrap.appendChild(buildProfilesIndex());      // طويلة — تُوضع في الذيل

    return wrap;
  }

  // ============================================================
  // إحداثيات تقريبية للدول (lng, lat) — لاستخدامها في الخريطة العالمية
  // ============================================================
  const COUNTRY_COORDS = {
    AE:[54,24], SA:[45,24], YE:[48,15], OM:[56,21], QA:[51,25], KW:[47.5,29],
    BH:[50.6,26], IQ:[44,33], JO:[36,31], SY:[38,35], LB:[35.9,33.9],
    PS:[35.2,31.9], IL:[34.8,31.5], EG:[30,27], SD:[30,12], LY:[17,27],
    TN:[10,34], DZ:[3,28], MA:[-7,32], MR:[-10,20], SN:[-14,14], NG:[8,10],
    SO:[46,5], TZ:[35,-6], ZA:[25,-29], TR:[35,39], IR:[53,32], PK:[70,30],
    IN:[78,22], BD:[90,24], CN:[105,35], JP:[138,36], MY:[102,4], ID:[120,-2],
    KZ:[68,48], UZ:[64,41], RU:[80,60], DE:[10,51], FR:[2,47], IT:[12,42],
    ES:[-4,40], GB:[-2,54], NL:[5,52], BE:[4,50], CH:[8,47], AT:[14,47],
    CZ:[15,50], PL:[20,52], HU:[19,47], SE:[15,62], NO:[10,62], DK:[10,56],
    FI:[25,62], US:[-95,38], CA:[-95,60], AU:[135,-25]
  };

  // ============================================================
  // خريطة العالم — دوائر مرقّمة وملوّنة حسب الإقليم
  // ============================================================
  // خطوط القارات المبسّطة (lng, lat) — تُسقَط عبر project() لتشكيل خلفية الخريطة
  const CONTINENT_OUTLINES = {
    north_america: [
      [-168,65],[-160,72],[-100,78],[-75,78],[-58,70],[-50,60],[-55,50],
      [-65,45],[-72,42],[-80,32],[-85,30],[-97,25],[-105,22],[-110,22],
      [-117,32],[-125,40],[-127,48],[-135,57],[-150,60],[-165,60],
    ],
    south_america: [
      [-80,12],[-75,11],[-65,8],[-55,5],[-50,0],[-44,-3],[-38,-12],
      [-38,-22],[-50,-30],[-58,-38],[-65,-50],[-71,-53],[-74,-50],
      [-72,-40],[-77,-30],[-72,-15],[-78,-5],[-80,5],
    ],
    europe: [
      [-10,36],[-9,43],[-5,48],[-3,52],[5,52],[8,54],[10,58],[18,60],
      [25,62],[30,65],[40,68],[45,60],[40,50],[37,45],[28,41],[20,40],
      [15,38],[5,38],[-5,36],
    ],
    africa: [
      [-17,14],[-17,21],[-12,28],[-5,35],[5,35],[15,32],[28,32],[36,32],
      [42,16],[51,12],[51,8],[44,2],[42,-5],[40,-12],[36,-18],[30,-30],
      [22,-34],[15,-32],[12,-22],[10,-12],[8,-3],[0,5],[-8,8],[-14,12],
    ],
    asia: [
      [42,40],[45,45],[55,55],[60,60],[80,72],[105,75],[140,73],[160,68],
      [175,65],[170,55],[155,50],[145,45],[140,35],[130,30],[121,20],
      [110,8],[105,2],[100,4],[90,15],[80,9],[72,17],[68,25],[60,25],
      [50,30],[40,38],
    ],
    indonesia_malaysia: [
      [95,3],[105,3],[120,-2],[135,-3],[140,-5],[120,-10],[105,-8],[95,-5],
    ],
    australia: [
      [113,-22],[120,-12],[135,-10],[143,-12],[150,-18],[153,-30],
      [148,-38],[140,-38],[120,-35],[114,-30],
    ],
    greenland: [
      [-50,60],[-45,65],[-30,70],[-22,77],[-30,82],[-50,80],[-55,70],
    ],
  };

  function buildWorldMap() {
    const w = 1000, h = 500, pad = 20;
    // equirectangular projection
    const project = (lng, lat) => {
      const x = ((lng + 180) / 360) * (w - pad * 2) + pad;
      const y = ((90 - lat) / 180) * (h - pad * 2) + pad;
      return { x, y };
    };

    // عدد الكيانات + الإقليم السائد لكل دولة
    const byCountry = new Map();
    state.entities.forEach((e) => {
      if (!e.country) return;
      const rec = byCountry.get(e.country) || { count: 0, regions: new Map(), names: new Set() };
      rec.count++;
      if (e.region) rec.regions.set(e.region, (rec.regions.get(e.region) || 0) + 1);
      rec.names.add(e.name_ar || e.id);
      byCountry.set(e.country, rec);
    });

    const max = Math.max(...Array.from(byCountry.values()).map((r) => r.count), 1);

    // 1) القارات المرسومة كـ polygons في الخلفية
    const continents = Object.entries(CONTINENT_OUTLINES).map(([name, coords]) => {
      const points = coords.map(([lng, lat]) => {
        const p = project(lng, lat);
        return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      }).join(" ");
      return `<polygon class="worldmap__continent" points="${points}"/>`;
    }).join("");

    // 2) خطوط الشبكة — خطوط الطول وخطوط العرض كل 30°
    let bg = "";
    for (let lng = -180; lng <= 180; lng += 30) {
      const p1 = project(lng, 90), p2 = project(lng, -90);
      bg += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" class="worldmap__grid"/>`;
    }
    for (let lat = -60; lat <= 90; lat += 30) {
      const p1 = project(-180, lat), p2 = project(180, lat);
      bg += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" class="worldmap__grid"/>`;
    }

    // المناطق كحقول بصرية (هالة) خلف الدول
    const regionCenters = {};
    Object.entries(COUNTRY_COORDS).forEach(([cc, coord]) => {
      const rec = byCountry.get(cc);
      if (!rec) return;
      const topRegion = Array.from(rec.regions.entries()).sort((a,b) => b[1]-a[1])[0]?.[0];
      if (!topRegion) return;
      if (!regionCenters[topRegion]) regionCenters[topRegion] = { x: 0, y: 0, n: 0 };
      const p = project(coord[0], coord[1]);
      regionCenters[topRegion].x += p.x;
      regionCenters[topRegion].y += p.y;
      regionCenters[topRegion].n++;
    });
    let halos = "";
    Object.entries(regionCenters).forEach(([reg, c]) => {
      const cx = c.x / c.n;
      const cy = c.y / c.n;
      const color = PALETTE_REGIONS[reg] || "#888";
      halos += `<circle cx="${cx}" cy="${cy}" r="80" fill="${color}" opacity="0.08"/>`;
    });

    // الدوائر للدول
    let dots = "";
    Object.entries(COUNTRY_COORDS).forEach(([cc, coord]) => {
      const rec = byCountry.get(cc);
      if (!rec) return;
      const p = project(coord[0], coord[1]);
      const r = 4 + (rec.count / max) * 18;
      const topRegion = Array.from(rec.regions.entries()).sort((a,b) => b[1]-a[1])[0]?.[0];
      const color = PALETTE_REGIONS[topRegion] || "var(--color-primary)";
      const countryLabel = label("country", cc);
      dots += `<g class="worldmap__country" data-country="${cc}" data-count="${rec.count}"
                  data-label="${escapeHtml(countryLabel)}" tabindex="0" role="button"
                  aria-label="${escapeHtml(countryLabel)}: ${rec.count}">
                <circle cx="${p.x}" cy="${p.y}" r="${r}" fill="${color}" opacity="0.85" stroke="#fff" stroke-width="1.5"/>
                ${rec.count >= 5 ? `<text x="${p.x}" y="${p.y + 3}" font-size="11" font-weight="700" fill="#fff" text-anchor="middle" pointer-events="none">${rec.count}</text>` : ''}
              </g>`;
    });

    const svg = `<svg class="worldmap__svg" viewBox="0 0 ${w} ${h}"
                     role="img" aria-label="خريطة عالم: توزيع الكيانات حسب الدول">
                  <rect class="worldmap__sea" x="0" y="0" width="${w}" height="${h}"/>
                  ${continents}
                  ${bg}
                  ${halos}
                  ${dots}
                </svg>`;

    // مفتاح حجم
    const legend = `
      <div class="worldmap__legend">
        <span class="worldmap__legend-title">حجم الدائرة = عدد الكيانات</span>
        <span class="worldmap__legend-scale">
          <span><span class="worldmap__legend-dot" style="inline-size:8px;block-size:8px;"></span>1-4</span>
          <span><span class="worldmap__legend-dot" style="inline-size:14px;block-size:14px;"></span>5-19</span>
          <span><span class="worldmap__legend-dot" style="inline-size:22px;block-size:22px;"></span>20+</span>
        </span>
      </div>
    `;

    const card = chartCard(
      "الخريطة العالمية للكيانات",
      `${byCountry.size} دولة، مسقط متساوي المستطيلات`,
      svg + legend,
      {
        wide: true,
        csv: () => {
          const rows = ["دولة,رمز ISO,خط الطول,خط العرض,عدد الكيانات"];
          Object.entries(COUNTRY_COORDS).forEach(([cc, coord]) => {
            const rec = byCountry.get(cc);
            if (!rec) return;
            rows.push(`${csvCell(label("country", cc))},${cc},${coord[0]},${coord[1]},${rec.count}`);
          });
          return rows.join("\n");
        },
        csvName: "world-map"
      }
    );

    card.querySelectorAll(".worldmap__country").forEach((g) => {
      const count = g.dataset.count;
      const lbl = g.dataset.label;
      const cc = g.dataset.country;
      g.addEventListener("mouseenter", (e) => showTooltip(lbl, `${count} كياناً`, e));
      g.addEventListener("mousemove", moveTooltip);
      g.addEventListener("mouseleave", hideTooltip);
      const go = () => jumpToEntitiesFilter("country", cc);
      g.addEventListener("click", go);
      g.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
      });
    });
    return card;
  }

  // ============================================================
  // الخط الزمني المتحرّك — خريطة عالمية تنمو عقداً بعد عقد
  // ============================================================
  function buildAnimatedTimeline() {
    const w = 1000, h = 500, pad = 20;
    const project = (lng, lat) => ({
      x: ((lng + 180) / 360) * (w - pad * 2) + pad,
      y: ((90 - lat) / 180) * (h - pad * 2) + pad,
    });

    // نطاق العقود من البيانات الفعلية
    const foundedValues = state.entities.map((e) => e.founded).filter((f) => f && f > 500 && f < 2030);
    const minYear = Math.floor(Math.min(...foundedValues) / 10) * 10;
    const maxYear = 2030;

    // قالب الخلفية (قارات وشبكة) — يُحسب مرّة واحدة
    const continents = Object.entries(CONTINENT_OUTLINES).map(([_, coords]) => {
      const points = coords.map(([lng, lat]) => {
        const p = project(lng, lat);
        return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      }).join(" ");
      return `<polygon class="worldmap__continent" points="${points}"/>`;
    }).join("");
    let grid = "";
    for (let lng = -180; lng <= 180; lng += 30) {
      const p1 = project(lng, 90), p2 = project(lng, -90);
      grid += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" class="worldmap__grid"/>`;
    }
    for (let lat = -60; lat <= 90; lat += 30) {
      const p1 = project(-180, lat), p2 = project(180, lat);
      grid += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" class="worldmap__grid"/>`;
    }
    const bg = continents + grid;

    function dotsForYear(maxFounded) {
      const byCountry = new Map();
      state.entities.forEach((e) => {
        if (!e.country) return;
        if (e.founded && e.founded > maxFounded) return;
        const rec = byCountry.get(e.country) || { count: 0, regions: new Map() };
        rec.count++;
        if (e.region) rec.regions.set(e.region, (rec.regions.get(e.region) || 0) + 1);
        byCountry.set(e.country, rec);
      });
      const max = Math.max(...Array.from(byCountry.values()).map((r) => r.count), 1);
      let dots = "";
      Object.entries(COUNTRY_COORDS).forEach(([cc, coord]) => {
        const rec = byCountry.get(cc);
        if (!rec) return;
        const p = project(coord[0], coord[1]);
        const r = 4 + (rec.count / max) * 18;
        const topRegion = Array.from(rec.regions.entries()).sort((a,b) => b[1]-a[1])[0]?.[0];
        const color = PALETTE_REGIONS[topRegion] || "var(--color-primary)";
        dots += `<circle cx="${p.x}" cy="${p.y}" r="${r}" fill="${color}" opacity="0.85" stroke="#fff" stroke-width="1.5"/>`;
        if (rec.count >= 5) {
          dots += `<text x="${p.x}" y="${p.y + 3}" font-size="11" font-weight="700" fill="#fff" text-anchor="middle" pointer-events="none">${rec.count}</text>`;
        }
      });
      return { dots, total: Array.from(byCountry.values()).reduce((a, r) => a + r.count, 0), countries: byCountry.size };
    }

    const card = document.createElement("article");
    card.className = "chart-card chart-card--wide timeline-card";
    card.innerHTML = `
      <header class="chart-card__head">
        <h3 class="chart-card__title">📅 الخط الزمني المتحرّك للحقل</h3>
        <p class="chart-card__hint">شغّل العرض لترى المؤسسات تظهر عقداً بعد عقد. اسحب الشريط للتنقّل بين العقود.</p>
      </header>
      <div class="timeline-controls">
        <button class="timeline-play" type="button" aria-label="تشغيل">▶ تشغيل</button>
        <input type="range" class="timeline-slider" min="${minYear}" max="${maxYear}" step="10" value="${minYear}" aria-label="عقد التصدير">
        <span class="timeline-year-badge" aria-live="polite">${minYear}</span>
      </div>
      <div class="timeline-stats">
        <span class="timeline-stat"><strong class="timeline-stat-entities">—</strong> كياناً</span>
        <span class="timeline-stat"><strong class="timeline-stat-countries">—</strong> دولة</span>
      </div>
      <div class="timeline-map-host">
        <svg class="worldmap__svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="خريطة عالم متحرّكة">
          <rect class="worldmap__sea" x="0" y="0" width="${w}" height="${h}"/>
          ${bg}
          <g class="timeline-dots"></g>
        </svg>
      </div>
    `;

    const slider = card.querySelector(".timeline-slider");
    const yearBadge = card.querySelector(".timeline-year-badge");
    const statEntities = card.querySelector(".timeline-stat-entities");
    const statCountries = card.querySelector(".timeline-stat-countries");
    const dotsGroup = card.querySelector(".timeline-dots");
    const playBtn = card.querySelector(".timeline-play");

    let timer = null;
    let playing = false;

    function renderAt(year) {
      const { dots, total, countries } = dotsForYear(year);
      dotsGroup.innerHTML = dots;
      yearBadge.textContent = year;
      statEntities.textContent = total;
      statCountries.textContent = countries;
    }

    function stopPlay() {
      playing = false;
      playBtn.textContent = "▶ تشغيل";
      playBtn.setAttribute("aria-label", "تشغيل");
      if (timer) { clearInterval(timer); timer = null; }
    }

    function startPlay() {
      playing = true;
      playBtn.textContent = "⏸ إيقاف";
      playBtn.setAttribute("aria-label", "إيقاف");
      // ابدأ من البداية إذا كنّا في النهاية
      if (+slider.value >= maxYear) {
        slider.value = minYear;
        renderAt(minYear);
      }
      timer = setInterval(() => {
        let y = +slider.value + 10;
        if (y > maxYear) {
          stopPlay();
          return;
        }
        slider.value = y;
        renderAt(y);
      }, 600);
    }

    playBtn.addEventListener("click", () => {
      playing ? stopPlay() : startPlay();
    });

    slider.addEventListener("input", () => {
      if (playing) stopPlay();
      renderAt(+slider.value);
    });

    // الرسم الأوّلي
    renderAt(minYear);

    return card;
  }

  // ============================================================
  // فهرس الشخصيات — استخراج key_figures عبر الكيانات
  // ============================================================
  function buildProfilesIndex() {
    const peopleMap = new Map();
    state.entities.forEach((e) => {
      (e.key_figures || []).forEach((p) => {
        const trimmed = String(p).trim();
        if (!trimmed) return;
        const rec = peopleMap.get(trimmed) || { entities: [], regions: new Set(), countries: new Set() };
        rec.entities.push(e.id);
        if (e.region) rec.regions.add(e.region);
        if (e.country) rec.countries.add(e.country);
        peopleMap.set(trimmed, rec);
      });
    });

    const all = Array.from(peopleMap.entries())
      .map(([name, rec]) => ({
        name,
        count: rec.entities.length,
        entities: rec.entities,
        regions: Array.from(rec.regions),
        countries: Array.from(rec.countries),
      }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ar"));

    const top = all.slice(0, 30);
    const html = `
      <div class="profiles">
        <div class="profiles__stats">
          <span><strong>${all.length}</strong> شخصية</span>
          <span><strong>${all.filter((p) => p.count > 1).length}</strong> مذكورة في كيانين أو أكثر</span>
        </div>
        <ol class="profiles__list">
          ${top.map((p, i) => `
            <li class="profiles__row" data-name="${escapeHtml(p.name)}" tabindex="0" role="button" aria-label="${escapeHtml(p.name)}: ${p.count} كياناً">
              <span class="profiles__rank">${i + 1}</span>
              <span class="profiles__name">${escapeHtml(p.name)}</span>
              <span class="profiles__meta">${p.regions.map((r) => escapeHtml(label("region", r))).join("، ")}</span>
              <span class="profiles__count">${p.count}</span>
            </li>
          `).join("")}
        </ol>
        ${all.length > 30 ? `<p class="profiles__note">يعرض أعلى 30 شخصية. الإجمالي ${all.length} اسماً.</p>` : ''}
      </div>
    `;

    const card = chartCard(
      "أعلام الحقل",
      "الشخصيات الأكثر ذكراً عبر الكيانات (key_figures)",
      html,
      {
        wide: true,
        csv: () => ["الاسم,عدد الكيانات,الكيانات,الأقاليم"]
          .concat(all.map((p) =>
            `${csvCell(p.name)},${p.count},${csvCell(p.entities.join("; "))},${csvCell(p.regions.map((r) => label("region", r)).join("; "))}`
          )).join("\n"),
        csvName: "profiles"
      }
    );
    card.querySelectorAll(".profiles__row").forEach((row) => {
      const go = () => {
        const tabs = Array.from(document.querySelectorAll(".tab"));
        const panels = Array.from(document.querySelectorAll(".panel"));
        activateTab("entities", tabs, panels);
        safeSetItem(STORAGE_KEY, "entities");
        state.query = row.dataset.name;
        const search = document.querySelector(".search-input");
        if (search) search.value = row.dataset.name;
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      row.addEventListener("click", go);
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
      });
    });
    return card;
  }

  // ============================================================
  // خط زمني غامر — كل عقد عمود يحتوي على البطاقات
  // ============================================================
  function buildTimelineImmersive() {
    const byDecade = new Map();
    state.entities.forEach((e) => {
      if (!e.founded_decade) return;
      const arr = byDecade.get(e.founded_decade) || [];
      arr.push(e);
      byDecade.set(e.founded_decade, arr);
    });

    const decades = Array.from(byDecade.keys())
      .sort((a, b) => parseInt(b) - parseInt(a));

    if (decades.length === 0) {
      return chartCard("خط زمني غامر", "لا بيانات تأسيس", "<p>—</p>", { wide: true });
    }

    const html = `
      <div class="timeline-imm__scroll" tabindex="0" aria-label="خط زمني — اسحب أفقياً">
        ${decades.map((dec) => {
          const ents = byDecade.get(dec).sort((a, b) =>
            (a.founded || 9999) - (b.founded || 9999) || a.name_ar.localeCompare(b.name_ar, "ar")
          );
          return `
            <div class="timeline-imm__col">
              <div class="timeline-imm__decade">${dec}</div>
              <div class="timeline-imm__count">${ents.length} كياناً</div>
              <ol class="timeline-imm__list">
                ${ents.slice(0, 50).map((e) => `
                  <li class="timeline-imm__entry" data-id="${e.id}" tabindex="0" role="button" title="${escapeHtml(e.name_ar)}">
                    <span class="timeline-imm__year">${e.founded || "؟"}</span>
                    <span class="timeline-imm__name">${escapeHtml(e.name_ar)}</span>
                  </li>
                `).join("")}
                ${ents.length > 50 ? `<li class="timeline-imm__more">+${ents.length - 50} أخرى</li>` : ''}
              </ol>
            </div>
          `;
        }).join("")}
      </div>
    `;
    const card = chartCard("خط زمني غامر", `${decades.length} عقد، من ${decades[decades.length-1]} إلى ${decades[0]} — اسحب أفقياً`, html, {
      wide: true,
      csv: () => {
        const rows = ["معرّف,الاسم,سنة التأسيس,عقد,الدولة,الإقليم"];
        decades.forEach((dec) => byDecade.get(dec).forEach((e) => {
          rows.push([e.id, csvCell(e.name_ar), e.founded || "", dec, e.country || "", e.region || ""].join(","));
        }));
        return rows.join("\n");
      },
      csvName: "timeline"
    });
    card.querySelectorAll(".timeline-imm__entry").forEach((row) => {
      row.addEventListener("click", () => {
        buildModal();
        openModal(row.dataset.id);
      });
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); buildModal(); openModal(row.dataset.id); }
      });
    });
    return card;
  }

  // ============================================================
  // 15. مخطط دائري: التوزيع الإقليمي
  // ============================================================

  function buildPieRegions() {
    const counts = new Map();
    state.entities.forEach((e) => {
      if (e.region) counts.set(e.region, (counts.get(e.region) || 0) + 1);
    });
    const data = Array.from(counts.entries())
      .map(([region, count]) => ({ region, count, color: PALETTE_REGIONS[region] || "#888" }))
      .sort((a, b) => b.count - a.count);

    const total = data.reduce((s, d) => s + d.count, 0);
    const w = 280, h = 280;
    const cx = w / 2, cy = h / 2;
    const r = Math.min(w, h) / 2 - 18;
    let angle = -Math.PI / 2;

    let svg = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="التوزيع الإقليمي">`;
    data.forEach((d) => {
      const sweep = (d.count / total) * Math.PI * 2;
      const x1 = cx + r * Math.cos(angle);
      const y1 = cy + r * Math.sin(angle);
      const x2 = cx + r * Math.cos(angle + sweep);
      const y2 = cy + r * Math.sin(angle + sweep);
      const large = sweep > Math.PI ? 1 : 0;
      const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
      const midAngle = angle + sweep / 2;
      const lx = cx + r * 0.62 * Math.cos(midAngle);
      const ly = cy + r * 0.62 * Math.sin(midAngle);
      const pct = Math.round(d.count / total * 100);

      svg += `<path d="${path}" fill="${d.color}" class="chart-segment" data-region="${d.region}" data-count="${d.count}" data-label="${escapeHtml(label("region", d.region))}" stroke="#fff" stroke-width="2"/>`;
      if (pct >= 6) {
        svg += `<text x="${lx}" y="${ly}" font-size="14" font-weight="700" fill="#fff" text-anchor="middle" dominant-baseline="middle" pointer-events="none">${pct}%</text>`;
      }
      angle += sweep;
    });
    svg += `</svg>`;

    const legend = data.map((d) => `
      <span class="chart-legend__item" data-region="${d.region}">
        <span class="chart-legend__swatch" style="background:${d.color}"></span>
        ${escapeHtml(label("region", d.region))}
        <span class="chart-legend__count">${d.count}</span>
      </span>
    `).join("");

    const card = chartCard("التوزيع الإقليمي", "النسبة المئوية للكيانات في كل إقليم",
      svg + `<div class="chart-legend">${legend}</div>`, {
        csv: () => ["إقليم,عدد,نسبة%"]
          .concat(data.map((d) => [
            csvCell(label("region", d.region)), d.count, Math.round(d.count/total*100)
          ].join(","))).join("\n"),
        csvName: "regions"
      }
    );
    bindChartInteractions(card, "region");
    return card;
  }

  // ============================================================
  // 16. مخطط أعمدة: مجموعات الأنواع
  // ============================================================

  // --- Helper مشترك: مخطط أعمدة أفقية بـ HTML/CSS Grid ---
  // التسميات والأرقام بـ HTML نصّ عادي يحترم RTL وحجم الخط ثابت بالبكسل،
  // بينما عرض الشريط % من المساحة المتاحة. لا يوجد SVG هنا.
  function htmlHorizontalBars(items, opts = {}) {
    const max = Math.max(...items.map((it) => it.value), 1);
    const defaultColor = opts.color || "var(--color-primary)";
    const valueColor = opts.valueColor || defaultColor;
    return `<div class="hbars">${items.map((it) => {
      const pct = (it.value / max) * 100;
      const color = it.color || defaultColor;
      const vColor = it.color ? color : valueColor;
      const safeLabel = escapeHtml(it.label);
      return `
        <div class="hbars__row" role="button" tabindex="0"
             data-key="${escapeHtml(String(it.key))}"
             data-label="${safeLabel}"
             data-count="${it.value}"
             aria-label="${safeLabel}: ${it.value}">
          <span class="hbars__label" title="${safeLabel}">${safeLabel}</span>
          <div class="hbars__track">
            <div class="hbars__bar" style="inline-size: ${pct}%; background: ${color};"></div>
          </div>
          <span class="hbars__value" style="color: ${vColor};">${it.value}</span>
        </div>
      `;
    }).join("")}</div>`;
  }

  function bindHBarsInteractions(card, facet) {
    card.querySelectorAll(".hbars__row").forEach((row) => {
      const key = row.dataset.key;
      const lbl = row.dataset.label;
      const cnt = row.dataset.count;
      row.addEventListener("mouseenter", (e) => showTooltip(lbl, `${cnt} كياناً`, e));
      row.addEventListener("mousemove", moveTooltip);
      row.addEventListener("mouseleave", hideTooltip);
      if (facet) {
        const go = () => jumpToEntitiesFilter(facet, key);
        row.addEventListener("click", go);
        row.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
        });
      }
    });
  }

  function buildBarTypeGroups() {
    const counts = new Map();
    state.entities.forEach((e) => {
      if (e.type_group) counts.set(e.type_group, (counts.get(e.type_group) || 0) + 1);
    });
    const items = Array.from(counts.entries())
      .map(([tg, count]) => ({
        key: tg,
        label: label("type_group", tg),
        value: count,
        color: PALETTE_TYPE_GROUPS[tg] || "#888",
      }))
      .sort((a, b) => b.value - a.value);

    const card = chartCard("أنواع الكيانات", "9 مجموعات لونية", htmlHorizontalBars(items), {
      csv: () => ["مجموعة النوع,عدد"]
        .concat(items.map((it) => `${csvCell(it.label)},${it.value}`))
        .join("\n"),
      csvName: "type-groups"
    });
    bindHBarsInteractions(card, "type_group");
    return card;
  }

  // ============================================================
  // 17. خط زمني: العقود (أعمدة أفقية)
  // ============================================================

  function buildTimelineDecades() {
    const counts = new Map();
    state.entities.forEach((e) => {
      if (e.founded_decade) counts.set(e.founded_decade, (counts.get(e.founded_decade) || 0) + 1);
    });
    const items = Array.from(counts.entries())
      .map(([dec, count]) => ({ key: dec, label: `عقد ${dec}`, value: count }))
      .sort((a, b) => parseInt(b.key) - parseInt(a.key));

    if (items.length === 0) {
      return chartCard("موجات النشأة", "لا بيانات تاريخ متوفرة", "<p>—</p>");
    }

    const subtitle = `${items[0].key} (الأحدث) ← ${items[items.length - 1].key}`;
    const card = chartCard("موجات النشأة", subtitle,
      htmlHorizontalBars(items, { color: "var(--color-primary)" }),
      {
        csv: () => ["عقد,عدد الكيانات"]
          .concat(items.map((it) => `${it.key},${it.value}`))
          .join("\n"),
        csvName: "decades"
      }
    );
    bindHBarsInteractions(card, "founded_decade");
    return card;
  }

  // ============================================================
  // 18. أعمدة أفقية: أعلى 15 دولة
  // ============================================================

  function buildBarCountries() {
    const counts = new Map();
    state.entities.forEach((e) => {
      if (e.country) counts.set(e.country, (counts.get(e.country) || 0) + 1);
    });
    const items = Array.from(counts.entries())
      .map(([c, count]) => ({ key: c, label: label("country", c), value: count }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 15);

    const card = chartCard("أعلى 15 دولة", "حسب عدد الكيانات",
      htmlHorizontalBars(items, { color: "var(--color-accent)", valueColor: "var(--color-accent-dark)" }),
      {
        csv: () => ["دولة,رمز ISO,عدد"]
          .concat(items.map((it) => `${csvCell(it.label)},${it.key},${it.value}`))
          .join("\n"),
        csvName: "countries-top15"
      }
    );
    bindHBarsInteractions(card, "country");
    return card;
  }

  // ============================================================
  // 19. خريطة حرارية: إقليم × موضوع (HTML Grid)
  // ============================================================

  function buildHeatmapRegionSubject() {
    const regions = Object.keys(LABELS.region);
    const subjectCounts = new Map();
    state.entities.forEach((e) => {
      (e.subjects || []).forEach((s) => {
        subjectCounts.set(s, (subjectCounts.get(s) || 0) + 1);
      });
    });
    const topSubjects = Array.from(subjectCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([s]) => s);

    const grid = regions.map((reg) =>
      topSubjects.map((sub) => ({
        region: reg,
        subject: sub,
        count: state.entities.filter((e) =>
          e.region === reg && (e.subjects || []).includes(sub)
        ).length,
      }))
    );
    const maxCount = Math.max(...grid.flat().map((c) => c.count), 1);

    // الترويسة العلوية (أرقام 1..N) + الصفوف
    let cells = '<div class="heatmap__corner" aria-hidden="true"></div>';
    topSubjects.forEach((sub, j) => {
      cells += `<div class="heatmap__col-head" title="${escapeHtml(label("subjects", sub))}">${j + 1}</div>`;
    });
    grid.forEach((row, i) => {
      cells += `<div class="heatmap__row-head">${escapeHtml(label("region", regions[i]))}</div>`;
      row.forEach((cell) => {
        const intensity = cell.count / maxCount;
        const bg = cell.count === 0
          ? "var(--color-bg-muted)"
          : `rgba(10, 77, 104, ${0.15 + intensity * 0.75})`;
        const fg = intensity > 0.5 ? "#fff" : "var(--color-text)";
        const tip = `${escapeHtml(label("region", cell.region))} × ${escapeHtml(label("subjects", cell.subject))}: ${cell.count}`;
        cells += `<div class="heatmap__cell${cell.count === 0 ? ' is-empty' : ''}"
                       data-region="${cell.region}" data-subject="${cell.subject}" data-count="${cell.count}"
                       style="background:${bg}; color:${fg};"
                       title="${tip}">${cell.count > 0 ? cell.count : ""}</div>`;
      });
    });

    const html = `
      <div class="heatmap" style="--heatmap-cols: ${topSubjects.length};">${cells}</div>
      <div class="heatmap__legend">
        ${topSubjects.map((sub, i) => `
          <span class="heatmap__legend-item" title="${escapeHtml(label("subjects", sub))}">
            <span class="heatmap__num">${i + 1}</span>
            <span class="heatmap__legend-text">${escapeHtml(label("subjects", sub))}</span>
          </span>
        `).join("")}
      </div>
    `;

    const card = chartCard(
      "الخريطة الحرارية: إقليم × موضوع",
      "الأرقام أعلى الجدول تطابق الموضوعات أسفله",
      html, {
        wide: true,
        csv: () => {
          const rows = ["إقليم,موضوع,عدد"];
          grid.forEach((row) => {
            row.forEach((cell) => {
              rows.push(`${csvCell(label("region", cell.region))},${csvCell(label("subjects", cell.subject))},${cell.count}`);
            });
          });
          return rows.join("\n");
        },
        csvName: "heatmap-region-subject"
      }
    );
    card.querySelectorAll(".heatmap__cell").forEach((cell) => {
      const count = parseInt(cell.dataset.count, 10);
      if (count === 0) return;
      const lbl = cell.getAttribute("title").split(":")[0];
      cell.addEventListener("mouseenter", (e) => showTooltip(lbl, `${count} كياناً`, e));
      cell.addEventListener("mousemove", moveTooltip);
      cell.addEventListener("mouseleave", hideTooltip);
      cell.addEventListener("click", () => {
        const tabs = Array.from(document.querySelectorAll(".tab"));
        const panels = Array.from(document.querySelectorAll(".panel"));
        activateTab("entities", tabs, panels);
        safeSetItem(STORAGE_KEY, "entities");
        clearAllFilters();
        addFilter("region", cell.dataset.region);
        addFilter("subjects", cell.dataset.subject);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
    return card;
  }

  // ============================================================
  // 20. مصفوفة عمودية: مستوى الإدراج × درجة التحقق (HTML)
  // ============================================================

  function buildStackedTierVerification() {
    const tiers = ["core", "borderline", "below_threshold"];
    const verifs = ["field_verified", "desk_verified", "needs_verification", "unverifiable"];
    const matrix = tiers.map((t) => verifs.map((v) =>
      state.entities.filter((e) => e.inclusion_tier === t && e.verification === v).length
    ));

    const totals = matrix.map((row) => row.reduce((a, b) => a + b, 0));
    const maxTotal = Math.max(...totals, 1);

    const columnsHtml = tiers.map((tier, i) => {
      const colPct = (totals[i] / maxTotal) * 100;
      const segments = verifs.map((v, j) => {
        const cnt = matrix[i][j];
        if (cnt === 0) return "";
        const segPct = (cnt / totals[i]) * 100;
        return `<div class="stacked-vbars__seg"
                     data-inclusion_tier="${tier}" data-verification="${v}" data-count="${cnt}"
                     data-label="${escapeHtml(label("inclusion_tier", tier))} + ${escapeHtml(label("verification", v))}"
                     style="--seg-pct: ${segPct}; background: ${PALETTE_VERIFICATION[v]};"
                     title="${escapeHtml(label("verification", v))}: ${cnt}"></div>`;
      }).join("");
      return `
        <div class="stacked-vbars__column">
          <div class="stacked-vbars__rail">
            <div class="stacked-vbars__stack" style="--col-pct: ${colPct};">
              ${segments}
            </div>
          </div>
          <div class="stacked-vbars__total">${totals[i]}</div>
          <div class="stacked-vbars__label">${escapeHtml(label("inclusion_tier", tier))}</div>
        </div>
      `;
    }).join("");

    const legend = verifs.map((v) => `
      <span class="chart-legend__item">
        <span class="chart-legend__swatch" style="background:${PALETTE_VERIFICATION[v]}"></span>
        ${escapeHtml(label("verification", v))}
      </span>
    `).join("");

    const html = `
      <div class="stacked-vbars">${columnsHtml}</div>
      <div class="chart-legend">${legend}</div>
    `;
    const card = chartCard("الإدراج × التحقق", "تقاطع مستوى التخصص مع جودة البيانات", html, {
      csv: () => {
        const rows = ["مستوى الإدراج,درجة التحقق,عدد"];
        tiers.forEach((t, i) => verifs.forEach((v, j) => {
          rows.push(`${csvCell(label("inclusion_tier", t))},${csvCell(label("verification", v))},${matrix[i][j]}`);
        }));
        return rows.join("\n");
      },
      csvName: "tier-by-verification"
    });
    card.querySelectorAll(".stacked-vbars__seg").forEach((seg) => {
      const count = parseInt(seg.dataset.count, 10);
      const lbl = seg.dataset.label;
      seg.addEventListener("mouseenter", (e) => showTooltip(lbl, `${count} كياناً`, e));
      seg.addEventListener("mousemove", moveTooltip);
      seg.addEventListener("mouseleave", hideTooltip);
      seg.addEventListener("click", () => {
        const tabs = Array.from(document.querySelectorAll(".tab"));
        const panels = Array.from(document.querySelectorAll(".panel"));
        activateTab("entities", tabs, panels);
        safeSetItem(STORAGE_KEY, "entities");
        clearAllFilters();
        addFilter("inclusion_tier", seg.dataset.inclusion_tier);
        addFilter("verification", seg.dataset.verification);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
    return card;
  }

  // ============================================================
  // 21. أدوات مساعدة للمخططات
  // ============================================================

  // chartCard(title, subtitle, bodyHtml, opts)
  // opts (object): { wide?: bool, csv?: () => string, csvName?: string }
  // opts (boolean): يُعتبر wide (للتوافق مع الاستدعاءات السابقة)
  function chartCard(title, subtitle, bodyHtml, opts = {}) {
    if (typeof opts === "boolean") opts = { wide: opts };
    const card = document.createElement("div");
    card.className = "chart-card" + (opts.wide ? " chart-card--wide" : "");
    const exportBtn = opts.csv
      ? `<button class="chart-card__export" type="button"
                 title="تصدير بيانات المخطط CSV" aria-label="تصدير CSV">⤓</button>`
      : "";
    card.innerHTML = `
      <div class="chart-card__header">
        <div class="chart-card__heading">
          <h3 class="chart-card__title">${escapeHtml(title)}</h3>
          <span class="chart-card__subtitle">${escapeHtml(subtitle)}</span>
        </div>
        ${exportBtn}
      </div>
      <div class="chart-card__body">${bodyHtml}</div>
    `;
    if (opts.csv) {
      card.querySelector(".chart-card__export").addEventListener("click", (e) => {
        e.stopPropagation();
        const blob = new Blob(["﻿" + opts.csv()], { type: "text/csv;charset=utf-8" });
        downloadBlob(blob, (opts.csvName || title) + ".csv");
        if (typeof toast === "function") toast("تم تنزيل CSV");
      });
    }
    return card;
  }

  function bindChartInteractions(card, facet) {
    card.querySelectorAll(".chart-segment").forEach((seg) => {
      const count = seg.dataset.count;
      const label_ = seg.dataset.label;
      seg.addEventListener("mouseenter", (e) => showTooltip(label_, `${count} كياناً`, e));
      seg.addEventListener("mousemove", moveTooltip);
      seg.addEventListener("mouseleave", hideTooltip);
      if (facet) {
        seg.addEventListener("click", () => {
          const value = seg.dataset[facet];
          jumpToEntitiesFilter(facet, value);
        });
      }
    });
    // المفتاح أيضاً قابل للنقر
    card.querySelectorAll(".chart-legend__item").forEach((item) => {
      if (!facet) return;
      const value = item.dataset[facet];
      if (!value) return;
      item.addEventListener("click", () => jumpToEntitiesFilter(facet, value));
    });
  }

  // ============================================================
  // X. تبويب التشخيص — المرحلة 6
  // ============================================================

  let diagnosticLoaded = false;

  async function renderDiagnostic() {
    if (diagnosticLoaded) {
      activateTOCScrollSpy();
      return;
    }
    const container = document.querySelector("#tab-diagnostic .container");
    if (!container) return;

    try {
      const response = await fetch("assets/diagnostic.html");
      if (!response.ok) throw new Error("HTTP " + response.status);
      const html = await response.text();
      container.innerHTML = `<div class="diagnostic">${html}</div>`;

      // اربط نقرات الاستشهاد ببطاقات الكيانات
      container.querySelectorAll(".cite[data-id]").forEach((el) => {
        el.addEventListener("click", () => {
          buildModal();
          openModal(el.dataset.id);
        });
        el.setAttribute("title", `افتح بطاقة ${el.dataset.id}`);
      });

      // اربط روابط الـ TOC بالتمرير السلس
      container.querySelectorAll(".diagnostic__toc a").forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const id = a.getAttribute("href").slice(1);
          const target = container.querySelector("#" + id);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      });

      diagnosticLoaded = true;
      activateTOCScrollSpy();
    } catch (err) {
      container.innerHTML = `
        <div class="empty-state">
          <h3 class="empty-state__title">تعذّر تحميل التشخيص</h3>
          <p class="empty-state__hint">${escapeHtml(err.message)}</p>
        </div>
      `;
    }
  }

  function activateTOCScrollSpy() {
    const sections = Array.from(document.querySelectorAll(".diag-section"));
    const links = Array.from(document.querySelectorAll(".diagnostic__toc a"));
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((a) => {
              a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((sec) => observer.observe(sec));
  }

  // ============================================================
  // 22. تبويب الشبكة — المرحلة 5
  // ============================================================

  let networkRendered = false;
  const networkState = {
    nodes: [],
    edges: [],
    showAll: false,
    selectedId: null,
    transform: { x: 0, y: 0, k: 1 },
  };

  const NET_VIEWBOX = { w: 1400, h: 900 };

  // مراكز العناقيد لكل إقليم (هندسية مثبتة لاستقرار التخطيط)
  const CLUSTER_CENTERS = {
    arabia:           { x:  450, y: 230, color: PALETTE_REGIONS.arabia },
    levant_iraq_nile: { x:  950, y: 230, color: PALETTE_REGIONS.levant_iraq_nile },
    maghreb:          { x:  220, y: 540, color: PALETTE_REGIONS.maghreb },
    turkey:           { x:  700, y: 480, color: PALETTE_REGIONS.turkey },
    non_arab_muslim:  { x: 1200, y: 530, color: PALETTE_REGIONS.non_arab_muslim },
    western:          { x:  700, y: 760, color: PALETTE_REGIONS.western },
  };

  function renderNetwork() {
    if (networkRendered) return;
    const container = document.querySelector("#tab-network .network");
    if (!container) return;

    buildNetworkData();
    container.innerHTML = networkHTML();

    bindNetworkInteractions();
    drawNetwork();
    networkRendered = true;
  }

  function buildNetworkData() {
    // كل البطاقات التي لها أو هي هدف لعلاقات صريحة
    const linked = new Set();
    state.entities.forEach((e) => {
      if (e.explicit_relations && e.explicit_relations.length) {
        linked.add(e.id);
        e.explicit_relations.forEach((r) => linked.add(r.target));
      }
    });

    // العقد: تشمل المرتبطين دائماً، والباقي حسب الـ toggle
    networkState.nodes = state.entities
      .filter((e) => networkState.showAll || linked.has(e.id))
      .map((e) => ({
        id: e.id,
        entity: e,
        region: e.region,
        // الحجم بحسب عدد الجيران
        degree: (e.explicit_relations?.length || 0)
              + state.entities.filter((o) => (o.explicit_relations || []).some((r) => r.target === e.id)).length,
      }));

    // الحواف
    const edges = [];
    const idSet = new Set(networkState.nodes.map((n) => n.id));
    state.entities.forEach((e) => {
      (e.explicit_relations || []).forEach((r) => {
        if (idSet.has(e.id) && idSet.has(r.target)) {
          edges.push({ source: e.id, target: r.target, type: r.type });
        }
      });
    });
    networkState.edges = edges;

    // ضع العقد ضمن العنقدة بحسب الإقليم: حلزون داخل دائرة
    layoutNodesInClusters();
  }

  function layoutNodesInClusters() {
    // تجميع حسب الإقليم
    const byRegion = new Map();
    networkState.nodes.forEach((n) => {
      const arr = byRegion.get(n.region) || [];
      arr.push(n);
      byRegion.set(n.region, arr);
    });

    byRegion.forEach((nodesArr, region) => {
      const center = CLUSTER_CENTERS[region] || { x: 700, y: 450 };
      // الأعلى درجة في الوسط
      nodesArr.sort((a, b) => b.degree - a.degree);

      const baseRadius = 25;
      const spacing = 24;
      const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // توزيع لولبي متساوي

      nodesArr.forEach((node, i) => {
        if (i === 0 && nodesArr.length > 1) {
          // الأول في المركز
          node.x = center.x;
          node.y = center.y;
          return;
        }
        const r = baseRadius + Math.sqrt(i) * spacing;
        const angle = i * goldenAngle;
        node.x = center.x + r * Math.cos(angle);
        node.y = center.y + r * Math.sin(angle);
      });
    });
  }

  function networkHTML() {
    return `
      <div class="network__main">
        <div class="network__toolbar">
          <label class="filter-option" style="cursor:pointer">
            <input type="checkbox" id="net-show-all" ${networkState.showAll ? "checked" : ""}>
            <span>عرض كل الكيانات (بما فيها المنعزلة)</span>
          </label>
          <div style="flex:1"></div>
          <button class="btn btn--ghost btn--small" id="net-reset">إعادة الضبط</button>
          <span class="chart-card__subtitle">
            <bdi>${networkState.nodes.length}</bdi> عقدة ·
            <bdi>${networkState.edges.length}</bdi> علاقة صريحة
          </span>
        </div>
        <div class="network__canvas-wrap">
          <svg class="network__canvas" viewBox="0 0 ${NET_VIEWBOX.w} ${NET_VIEWBOX.h}" preserveAspectRatio="xMidYMid meet">
            <g class="net-zoom">
              <g class="net-clusters"></g>
              <g class="net-edges"></g>
              <g class="net-nodes"></g>
              <g class="net-labels"></g>
            </g>
          </svg>
        </div>
        <div class="network__legend">
          ${Object.entries(LABELS.region).map(([k, v]) => `
            <span class="chart-legend__item" style="cursor:default">
              <span class="chart-legend__swatch" style="background:${PALETTE_REGIONS[k]}"></span>
              ${escapeHtml(v)}
            </span>
          `).join("")}
        </div>
      </div>
      <aside class="network__sidebar">
        <div class="network__sidebar-empty">
          <h4>اختر كياناً</h4>
          <p>انقر على أي عقدة لاستعراض اتصالاتها وتفاصيلها. مرّر الفأرة لتمييز الجيران.</p>
        </div>
      </aside>
    `;
  }

  function drawNetwork() {
    const svg = document.querySelector(".network__canvas");
    if (!svg) return;

    // 1. خلفيات العناقيد
    const clustersG = svg.querySelector(".net-clusters");
    clustersG.innerHTML = "";
    Object.entries(CLUSTER_CENTERS).forEach(([region, center]) => {
      const nodesInRegion = networkState.nodes.filter((n) => n.region === region);
      if (nodesInRegion.length === 0) return;
      const xs = nodesInRegion.map((n) => n.x);
      const ys = nodesInRegion.map((n) => n.y);
      const minX = Math.min(...xs), maxX = Math.max(...xs);
      const minY = Math.min(...ys), maxY = Math.max(...ys);
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const rx = Math.max((maxX - minX) / 2 + 30, 60);
      const ry = Math.max((maxY - minY) / 2 + 30, 60);

      const bg = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      bg.setAttribute("cx", cx);
      bg.setAttribute("cy", cy);
      bg.setAttribute("rx", rx);
      bg.setAttribute("ry", ry);
      bg.setAttribute("class", "net-cluster-bg");
      bg.style.setProperty("--cluster-color", center.color);
      clustersG.appendChild(bg);

      const labelEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      labelEl.setAttribute("x", cx);
      labelEl.setAttribute("y", cy - ry - 8);
      labelEl.setAttribute("text-anchor", "middle");
      labelEl.setAttribute("class", "net-cluster-label");
      labelEl.style.setProperty("--cluster-color", center.color);
      labelEl.textContent = `${LABELS.region[region]} (${nodesInRegion.length})`;
      clustersG.appendChild(labelEl);
    });

    // 2. الحواف
    const edgesG = svg.querySelector(".net-edges");
    edgesG.innerHTML = "";
    const nodeMap = new Map(networkState.nodes.map((n) => [n.id, n]));
    networkState.edges.forEach((e) => {
      const a = nodeMap.get(e.source);
      const b = nodeMap.get(e.target);
      if (!a || !b) return;

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      // قوس بسيط بين العقدتين
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const offset = Math.min(dist * 0.15, 40);
      const cx = mx + (-dy / dist) * offset;
      const cy = my + (dx / dist) * offset;
      path.setAttribute("d", `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`);
      path.setAttribute("class", "net-edge");
      path.dataset.source = e.source;
      path.dataset.target = e.target;
      path.dataset.relType = e.type;
      edgesG.appendChild(path);
    });

    // 3. العقد
    const nodesG = svg.querySelector(".net-nodes");
    const labelsG = svg.querySelector(".net-labels");
    nodesG.innerHTML = "";
    labelsG.innerHTML = "";
    networkState.nodes.forEach((n) => {
      const r = 4 + Math.min(n.degree, 10) * 1.2;
      const color = PALETTE_TYPE_GROUPS[n.entity.type_group] || "#888";

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", n.x);
      circle.setAttribute("cy", n.y);
      circle.setAttribute("r", r);
      circle.setAttribute("fill", color);
      circle.setAttribute("stroke", "#fff");
      circle.setAttribute("stroke-width", 1.5);
      circle.setAttribute("class", "net-node");
      circle.dataset.id = n.id;
      circle.dataset.degree = n.degree;
      nodesG.appendChild(circle);

      // تسمية مختصرة للعقد ذات الدرجة الأعلى فقط (لتقليل الازدحام)
      if (n.degree >= 3) {
        const lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        lbl.setAttribute("x", n.x);
        lbl.setAttribute("y", n.y - r - 4);
        lbl.setAttribute("text-anchor", "middle");
        lbl.setAttribute("class", "net-node-label");
        const short = n.entity.name_ar.length > 24 ? n.entity.name_ar.slice(0, 22) + "…" : n.entity.name_ar;
        lbl.textContent = short;
        labelsG.appendChild(lbl);
      }
    });
  }

  function bindNetworkInteractions() {
    const svg = document.querySelector(".network__canvas");
    const wrap = document.querySelector(".network__canvas-wrap");
    const sidebar = document.querySelector(".network__sidebar");
    if (!svg || !wrap || !sidebar) return;

    // toggle عرض الكل
    const toggle = document.querySelector("#net-show-all");
    if (toggle) {
      toggle.addEventListener("change", (e) => {
        networkState.showAll = e.target.checked;
        networkRendered = false;
        renderNetwork();
      });
    }

    // إعادة الضبط
    const resetBtn = document.querySelector("#net-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        networkState.selectedId = null;
        networkState.transform = { x: 0, y: 0, k: 1 };
        applyZoomTransform();
        clearSelection();
        showEmptySidebar();
      });
    }

    // تفاعلات العقد (event delegation)
    svg.addEventListener("mouseover", (e) => {
      const node = e.target.closest(".net-node");
      if (!node) return;
      const id = node.dataset.id;
      const entity = state.entities.find((x) => x.id === id);
      if (!entity) return;
      showTooltip(entity.name_ar, label("type", entity.type) + " · " + label("country", entity.country), e);
      highlightNeighbors(id, false);
    });

    svg.addEventListener("mousemove", moveTooltip);

    svg.addEventListener("mouseout", (e) => {
      const node = e.target.closest(".net-node");
      if (!node) return;
      hideTooltip();
      if (!networkState.selectedId) clearHighlights();
      else highlightNeighbors(networkState.selectedId, true);
    });

    svg.addEventListener("click", (e) => {
      const node = e.target.closest(".net-node");
      if (!node) {
        // النقر على الفراغ يلغي التركيز
        if (networkState.selectedId) {
          networkState.selectedId = null;
          clearHighlights();
          showEmptySidebar();
        }
        return;
      }
      const id = node.dataset.id;
      selectNode(id);
    });

    // التحريك والتكبير (pan/zoom)
    let panning = false, startX = 0, startY = 0, startTx = 0, startTy = 0;
    wrap.addEventListener("mousedown", (e) => {
      if (e.target.closest(".net-node")) return;
      panning = true;
      startX = e.clientX;
      startY = e.clientY;
      startTx = networkState.transform.x;
      startTy = networkState.transform.y;
      wrap.classList.add("is-panning");
    });
    window.addEventListener("mousemove", (e) => {
      if (!panning) return;
      networkState.transform.x = startTx + (e.clientX - startX);
      networkState.transform.y = startTy + (e.clientY - startY);
      applyZoomTransform();
    });
    window.addEventListener("mouseup", () => {
      panning = false;
      wrap.classList.remove("is-panning");
    });
    wrap.addEventListener("wheel", (e) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.0015;
      const k = Math.max(0.3, Math.min(3, networkState.transform.k + delta));
      networkState.transform.k = k;
      applyZoomTransform();
    }, { passive: false });
  }

  function applyZoomTransform() {
    const g = document.querySelector(".net-zoom");
    if (!g) return;
    const t = networkState.transform;
    g.setAttribute("transform", `translate(${t.x},${t.y}) scale(${t.k})`);
  }

  function selectNode(id) {
    networkState.selectedId = id;
    highlightNeighbors(id, true);
    fillSidebar(id);
  }

  function neighborIdsOf(id) {
    const set = new Set();
    networkState.edges.forEach((e) => {
      if (e.source === id) set.add(e.target);
      if (e.target === id) set.add(e.source);
    });
    return set;
  }

  function highlightNeighbors(id, isSelection) {
    const neighbors = neighborIdsOf(id);
    document.querySelectorAll(".net-node").forEach((n) => {
      n.classList.remove("net-node--selected", "net-node--neighbor", "net-node--dim");
      if (n.dataset.id === id) {
        n.classList.add(isSelection ? "net-node--selected" : "net-node--neighbor");
      } else if (neighbors.has(n.dataset.id)) {
        n.classList.add("net-node--neighbor");
      } else if (isSelection) {
        n.classList.add("net-node--dim");
      }
    });
    document.querySelectorAll(".net-edge").forEach((e) => {
      e.classList.remove("net-edge--highlight", "net-edge--dim");
      if (e.dataset.source === id || e.dataset.target === id) {
        e.classList.add("net-edge--highlight");
      } else if (isSelection) {
        e.classList.add("net-edge--dim");
      }
    });
  }

  function clearHighlights() {
    document.querySelectorAll(".net-node").forEach((n) => {
      n.classList.remove("net-node--selected", "net-node--neighbor", "net-node--dim");
    });
    document.querySelectorAll(".net-edge").forEach((e) => {
      e.classList.remove("net-edge--highlight", "net-edge--dim");
    });
  }

  function clearSelection() {
    networkState.selectedId = null;
    clearHighlights();
  }

  function showEmptySidebar() {
    const sidebar = document.querySelector(".network__sidebar");
    if (!sidebar) return;
    sidebar.innerHTML = `
      <div class="network__sidebar-empty">
        <h4>اختر كياناً</h4>
        <p>انقر على أي عقدة لاستعراض اتصالاتها وتفاصيلها. مرّر الفأرة لتمييز الجيران.</p>
      </div>
    `;
  }

  // === أعلام الدول (Emoji) ===
  const COUNTRY_FLAGS = {
    SA:"🇸🇦",AE:"🇦🇪",QA:"🇶🇦",KW:"🇰🇼",BH:"🇧🇭",OM:"🇴🇲",YE:"🇾🇪",
    EG:"🇪🇬",JO:"🇯🇴",SY:"🇸🇾",LB:"🇱🇧",PS:"🇵🇸",IQ:"🇮🇶",SD:"🇸🇩",
    MA:"🇲🇦",DZ:"🇩🇿",TN:"🇹🇳",LY:"🇱🇾",MR:"🇲🇷",TR:"🇹🇷",
    PK:"🇵🇰",IN:"🇮🇳",BD:"🇧🇩",ID:"🇮🇩",MY:"🇲🇾",UZ:"🇺🇿",NG:"🇳🇬",
    SN:"🇸🇳",ZA:"🇿🇦",TZ:"🇹🇿",IR:"🇮🇷",US:"🇺🇸",KZ:"🇰🇿",SO:"🇸🇴",
    KE:"🇰🇪",ET:"🇪🇹",ER:"🇪🇷",DJ:"🇩🇯",ML:"🇲🇱",
    GB:"🇬🇧",CA:"🇨🇦",DE:"🇩🇪",FR:"🇫🇷",IT:"🇮🇹",NL:"🇳🇱",BE:"🇧🇪",
    AT:"🇦🇹",HU:"🇭🇺",CH:"🇨🇭",ES:"🇪🇸",DK:"🇩🇰",SE:"🇸🇪",NO:"🇳🇴",
    FI:"🇫🇮",PL:"🇵🇱",CZ:"🇨🇿",RU:"🇷🇺",AU:"🇦🇺",JP:"🇯🇵",CN:"🇨🇳",IL:"🇮🇱",
  };

  function flag(country) {
    return COUNTRY_FLAGS[country] || "";
  }

  // === مسرد المصطلحات المؤقتة (Tooltip definitions) ===
  const TERM_DEFINITIONS = {
    "core": "تخصص أصلي في السيرة (السيرة محور رسالة الكيان وإنتاجه الرئيس).",
    "borderline": "حدّي (السيرة جزء مهم لكن ليس حصرياً ضمن نشاط أوسع).",
    "below_threshold": "تحت العتبة (السيرة موضوع هامشي ضمن منظومة أكاديمية أو دعوية أوسع).",
    "isnad_cum_matn": "منهج «نقد السند والمتن معاً» — مدرسة Görke-Motzki-Schoeler الألمانية.",
    "revisionist": "تيار غربي يشكّك في تاريخية الروايات الإسلامية الكلاسيكية (Crone, Cook, Shoemaker).",
    "late_antique": "منهج «العصور المتأخرة» — قراءة الإسلام المبكر في سياق نهاية العالم القديم.",
    "field_verified": "محقّق ميدانياً عبر زيارة فعلية للكيان.",
    "desk_verified": "محقّق مكتبياً عبر موقع رسمي + مصدر ثانوي مستقل.",
    "needs_verification": "بمصدر واحد فقط، يحتاج تحقّقاً إضافياً.",
    "unverifiable": "تعذّر التحقق من وجود الكيان أو من بياناته.",
  };

  function fillSidebar(id) {
    const sidebar = document.querySelector(".network__sidebar");
    const entity = state.entities.find((e) => e.id === id);
    if (!sidebar || !entity) return;

    const tg = entity.type_group;
    const color = PALETTE_TYPE_GROUPS[tg] || "#888";
    const neighbors = neighborIdsOf(id);
    const neighborEntities = state.entities.filter((e) => neighbors.has(e.id));
    const meta = [
      entity.city_ar,
      label("country", entity.country),
      entity.founded ? `تأسس ${entity.founded}` : null,
    ].filter(Boolean).join("، ");

    const desc = describeEntity(entity);
    const allRelations = entity.explicit_relations || [];
    const incomingRelations = state.entities
      .flatMap((e) => (e.explicit_relations || []).map((r) => ({ from: e.id, fromName: e.name_ar, ...r })))
      .filter((r) => r.target === id);

    sidebar.innerHTML = `
      <span class="net-side__type" style="background:${color}">${escapeHtml(label("type", entity.type))}</span>
      <h3 class="net-side__title">${escapeHtml(entity.name_ar)}</h3>
      <div class="net-side__id">${escapeHtml(entity.id)} · ${escapeHtml(label("region", entity.region))}</div>
      ${meta ? `<p class="net-side__meta">📍 ${escapeHtml(meta)}</p>` : ""}
      <p style="font-size:var(--text-sm); line-height:var(--leading-snug); color:var(--color-text);">
        ${escapeHtml(desc.text)}
      </p>
      <div style="display:flex; gap:var(--space-xs); margin-block-start:var(--space-sm);">
        <button class="btn btn--primary btn--small" id="net-open-card">عرض البطاقة</button>
        ${entity.url ? `<a class="btn btn--ghost btn--small" href="${entity.url}" target="_blank" rel="noopener">↗ الموقع</a>` : ""}
      </div>
      <div class="net-side__neighbors">
        <h5>الجيران المباشرون (${neighborEntities.length})</h5>
        ${neighborEntities.length === 0 ? '<p style="font-size:var(--text-sm); color:var(--color-text-faint);">لا يوجد.</p>' : neighborEntities.map((n) => `
          <div class="net-neighbor-item" data-id="${n.id}">
            <span class="net-neighbor-item__type">${escapeHtml(label("type", n.type))}</span>
            <span class="net-neighbor-item__name">${escapeHtml(n.name_ar)}</span>
          </div>
        `).join("")}
      </div>
    `;

    sidebar.querySelectorAll(".net-neighbor-item").forEach((el) => {
      el.addEventListener("click", () => selectNode(el.dataset.id));
    });
    const openBtn = sidebar.querySelector("#net-open-card");
    if (openBtn) openBtn.addEventListener("click", () => openModal(id));
  }

  // ============================================================
  // 23. وحدات المرحلة 8 — الصقل النهائي
  // ============================================================

  // === Toast ===
  let toastEl = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => toastEl.classList.remove("is-visible"), 2400);
  }

  // === Dark Mode ===
  function initDarkMode() {
    const saved = safeGetItem("seerah-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
    updateThemeButton(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    safeSetItem("seerah-theme", next);
    updateThemeButton(next);
  }

  function updateThemeButton(theme) {
    const btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.textContent = theme === "dark" ? "☀" : "🌙";
      btn.setAttribute("aria-label", theme === "dark" ? "وضع فاتح" : "وضع داكن");
    }
  }

  // === Global Search (Cmd/Ctrl+K) ===
  function openSearchOverlay() {
    let overlay = document.querySelector(".search-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "search-overlay";
      overlay.innerHTML = `
        <div class="search-overlay__panel">
          <input type="search" class="search-overlay__input" placeholder="ابحث في كل الموسوعة…" aria-label="بحث عالمي">
          <div class="search-overlay__hint">
            <kbd>↑</kbd><kbd>↓</kbd> للتنقّل · <kbd>Enter</kbd> للفتح · <kbd>Esc</kbd> للإغلاق
          </div>
          <div class="search-overlay__results" role="listbox"></div>
        </div>
      `;
      document.body.appendChild(overlay);

      const input = overlay.querySelector(".search-overlay__input");
      const results = overlay.querySelector(".search-overlay__results");

      const updateResults = debounce(() => {
        const q = input.value.trim().toLowerCase();
        if (!q) { results.innerHTML = ""; return; }
        const matches = globalSearch(q).slice(0, 20);
        results.innerHTML = matches.length
          ? matches.map((m, i) => `
              <a class="search-result" data-kind="${m.kind}" data-target="${m.target || ''}" tabindex="-1">
                <span class="search-result__kind">${escapeHtml(m.kindLabel)}</span>
                <span class="search-result__title">${highlightMatch(m.title, q)}</span>
                ${m.subtitle ? `<div class="search-result__meta">${highlightMatch(m.subtitle, q)}</div>` : ""}
              </a>
            `).join("")
          : `<p style="padding: var(--space-md); text-align: center; color: var(--color-text-muted);">لا نتائج تطابق «${escapeHtml(q)}»</p>`;
        bindSearchResults(matches);
      }, 150);

      input.addEventListener("input", updateResults);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeSearchOverlay();
        else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          navigateSearchResults(e.key === "ArrowDown" ? 1 : -1);
        } else if (e.key === "Enter") {
          e.preventDefault();
          const focused = results.querySelector(".search-result.is-focused") || results.querySelector(".search-result");
          if (focused) focused.click();
        }
      });

      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeSearchOverlay();
      });
    }
    overlay.classList.add("is-open");
    setTimeout(() => overlay.querySelector(".search-overlay__input").focus(), 30);
  }

  function closeSearchOverlay() {
    const overlay = document.querySelector(".search-overlay");
    if (overlay) overlay.classList.remove("is-open");
  }

  function navigateSearchResults(dir) {
    const results = Array.from(document.querySelectorAll(".search-overlay .search-result"));
    if (results.length === 0) return;
    const currentIdx = results.findIndex((r) => r.classList.contains("is-focused"));
    let next = currentIdx + dir;
    if (next < 0) next = results.length - 1;
    if (next >= results.length) next = 0;
    results.forEach((r) => r.classList.remove("is-focused"));
    results[next].classList.add("is-focused");
    results[next].scrollIntoView({ block: "nearest" });
  }

  function bindSearchResults(matches) {
    document.querySelectorAll(".search-overlay .search-result").forEach((el, i) => {
      el.addEventListener("click", () => {
        const m = matches[i];
        closeSearchOverlay();
        if (m.kind === "entity") {
          buildModal();
          openModal(m.target);
        } else if (m.kind === "tab") {
          const tabs = Array.from(document.querySelectorAll(".tab"));
          const panels = Array.from(document.querySelectorAll(".panel"));
          activateTab(m.target, tabs, panels);
        } else if (m.kind === "section") {
          const [tabName, anchor] = m.target.split("#");
          const tabs = Array.from(document.querySelectorAll(".tab"));
          const panels = Array.from(document.querySelectorAll(".panel"));
          activateTab(tabName, tabs, panels);
          setTimeout(() => {
            const el = document.querySelector("#" + anchor);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 400);
        }
      });
    });
  }

  function highlightMatch(text, q) {
    if (!text) return "";
    const safe = escapeHtml(text);
    const re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ")", "gi");
    return safe.replace(re, '<mark class="search-hit">$1</mark>');
  }

  function globalSearch(q) {
    const results = [];

    // الكيانات
    state.entities.forEach((e) => {
      const haystack = [
        e.name_ar, e.name_en, e.city_ar, e.description_ar,
        ...(e.aka || []), ...(e.key_figures || []),
        label("country", e.country)
      ].filter(Boolean).join(" ").toLowerCase();
      if (haystack.includes(q)) {
        results.push({
          kind: "entity",
          kindLabel: "كيان",
          title: e.name_ar,
          subtitle: `${flag(e.country)} ${label("country", e.country)} · ${label("type", e.type)}`,
          target: e.id,
        });
      }
    });

    // التبويبات (الأسماء الثابتة)
    const tabsList = [
      { id: "diagnostic", name: "التشخيص البنيوي" },
      { id: "entities", name: "بطاقات الكيانات" },
      { id: "network", name: "الشبكة" },
      { id: "stats", name: "الإحصاءات" },
      { id: "methodology", name: "المنهجية" },
      { id: "references", name: "المراجع" },
    ];
    tabsList.forEach((t) => {
      if (t.name.toLowerCase().includes(q)) {
        results.push({ kind: "tab", kindLabel: "تبويب", title: t.name, target: t.id });
      }
    });

    // ترتيب: الكيانات الـ core أولاً
    results.sort((a, b) => {
      if (a.kind === "tab" && b.kind !== "tab") return -1;
      if (b.kind === "tab" && a.kind !== "tab") return 1;
      return 0;
    });
    return results;
  }

  // === Compare ===
  const compareState = { ids: new Set() };

  function toggleCompare(id) {
    if (compareState.ids.has(id)) compareState.ids.delete(id);
    else {
      if (compareState.ids.size >= 4) {
        toast("الحد الأقصى 4 كيانات للمقارنة");
        return;
      }
      compareState.ids.add(id);
    }
    updateCompareTray();
    updateCompareButtons();
  }

  function updateCompareTray() {
    let tray = document.querySelector(".compare-tray");
    if (!tray) {
      tray = document.createElement("div");
      tray.className = "compare-tray";
      document.body.appendChild(tray);
    }
    if (compareState.ids.size === 0) {
      tray.classList.remove("is-visible");
      return;
    }
    const items = Array.from(compareState.ids).map((id) => {
      const e = state.entities.find((x) => x.id === id);
      return `<span class="compare-tray__item">
        ${escapeHtml(e ? e.name_ar.slice(0, 30) : id)}
        <button class="compare-tray__remove" data-id="${id}" aria-label="إزالة">×</button>
      </span>`;
    }).join("");
    tray.innerHTML = `
      <span style="font-weight: 600;">للمقارنة (${compareState.ids.size}):</span>
      <div class="compare-tray__items">${items}</div>
      <button class="btn btn--primary btn--small" id="compare-open" ${compareState.ids.size < 2 ? "disabled" : ""}>قارن</button>
      <button class="btn btn--ghost btn--small" id="compare-clear">إلغاء</button>
    `;
    tray.classList.add("is-visible");
    tray.querySelectorAll(".compare-tray__remove").forEach((b) => {
      b.addEventListener("click", () => { compareState.ids.delete(b.dataset.id); updateCompareTray(); updateCompareButtons(); });
    });
    const openBtn = tray.querySelector("#compare-open");
    if (openBtn) openBtn.addEventListener("click", openCompareModal);
    tray.querySelector("#compare-clear").addEventListener("click", () => {
      compareState.ids.clear();
      updateCompareTray();
      updateCompareButtons();
    });
  }

  function updateCompareButtons() {
    document.querySelectorAll(".compare-btn-in-card").forEach((b) => {
      b.classList.toggle("is-selected", compareState.ids.has(b.dataset.id));
      b.textContent = compareState.ids.has(b.dataset.id) ? "✓" : "+";
    });
  }

  function openCompareModal() {
    const ids = Array.from(compareState.ids);
    const ents = ids.map((id) => state.entities.find((e) => e.id === id)).filter(Boolean);
    if (ents.length < 2) return;

    let modal = document.querySelector(".compare-modal");
    if (!modal) {
      modal = document.createElement("dialog");
      modal.className = "compare-modal";
      document.body.appendChild(modal);
    }

    const rows = [
      ["النوع", (e) => label("type", e.type)],
      ["الإقليم", (e) => label("region", e.region)],
      ["الدولة", (e) => `${flag(e.country)} ${label("country", e.country)}`],
      ["المدينة", (e) => e.city_ar || "—"],
      ["التأسيس", (e) => e.founded || "—"],
      ["مستوى الإدراج", (e) => label("inclusion_tier", e.inclusion_tier)],
      ["التحقق", (e) => label("verification", e.verification)],
      ["النطاق", (e) => label("scale", e.scale)],
      ["التمويل", (e) => label("funding_type", e.funding_type)],
      ["المؤسسة الأم", (e) => e.parent_organization_ar || "—"],
      ["الموضوعات", (e) => (e.subjects || []).map((s) => label("subjects", s)).join("، ") || "—"],
      ["الشخصيات", (e) => (e.key_figures || []).join("، ") || "—"],
      ["الموقع", (e) => e.url ? `<a href="${e.url}" target="_blank" rel="noopener">↗</a>` : "—"],
    ];

    // اضبط --compare-cols لتعمل CSS responsive للمصفوفة على الجوال
    let html = `
      <div class="compare-modal__header">
        <h3 style="margin:0; color:#fff;">مقارنة ${ents.length} كيانات</h3>
        <button class="entity-modal__close" aria-label="إغلاق">×</button>
      </div>
      <div class="compare-modal__body">
        <div class="compare-grid" style="--compare-cols: ${ents.length};">
          <div class="compare-cell compare-cell--label">المعرّف</div>
          ${ents.map((e) => `<div class="compare-cell compare-cell--header">${escapeHtml(e.name_ar)}<br><span style="font-size:11px; color:var(--color-text-faint); font-family:var(--font-mono);">${e.id}</span></div>`).join("")}
    `;
    rows.forEach(([labelText, fn]) => {
      html += `<div class="compare-cell compare-cell--label">${labelText}</div>`;
      ents.forEach((e) => {
        html += `<div class="compare-cell">${fn(e)}</div>`;
      });
    });
    html += `</div></div>`;
    modal.innerHTML = html;
    modal.querySelector(".entity-modal__close").addEventListener("click", () => modal.close());
    if (typeof modal.showModal === "function") modal.showModal();
  }

  // كشف وجود نص لاتيني في حقول البطاقة (للترجمة)
  function hasNonArabicContent(entity) {
    const text = [
      entity.name_en, entity.description_ar, entity.notes_ar,
      entity.city_ar, entity.parent_organization_ar,
      ...(entity.key_figures || []),
    ].filter(Boolean).join(" ");
    if (!text) return false;
    const latin = (text.match(/[a-zA-Z]/g) || []).length;
    const arabic = (text.match(/[؀-ۿ]/g) || []).length;
    // إذا اللاتيني ≥ 15 حرف ولا يوجد كثير عربي → فيها محتوى غير عربي
    return latin >= 15 && latin / Math.max(arabic, 1) > 0.2;
  }

  // افتح Google Translate لمحتوى البطاقة (يكتشف اللغة تلقائياً → العربية)
  function openTranslateForEntity(entity) {
    const text = [
      entity.name_ar, entity.name_en,
      entity.description_ar, entity.notes_ar,
      entity.parent_organization_ar,
      ...(entity.key_figures || []),
    ].filter(Boolean).join("\n\n");
    if (!text) return;
    const url = "https://translate.google.com/?sl=auto&tl=ar&op=translate&text=" + encodeURIComponent(text);
    window.open(url, "_blank", "noopener");
  }

  // === Keyboard Shortcuts ===
  function initKeyboardShortcuts() {
    let gPressed = false;
    let gTimer = null;
    document.addEventListener("keydown", (e) => {
      // ignore in inputs
      if (e.target.matches("input, textarea, select")) {
        // إلا للـ Escape و Ctrl+K
        if (e.key === "Escape") return; // يُعالج في مكان آخر
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          openSearchOverlay();
        }
        return;
      }

      // Cmd/Ctrl + K للبحث العالمي
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearchOverlay();
        return;
      }
      // / لفتح البحث
      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        openSearchOverlay();
        return;
      }
      // ? لعرض الاختصارات
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        showShortcutsHelp();
        return;
      }
      // Esc يُعالج في كل مكان

      // gX للتبويبات
      if (gPressed) {
        const map = { d: "diagnostic", e: "entities", n: "network", s: "stats", m: "methodology", r: "references" };
        const tab = map[e.key.toLowerCase()];
        if (tab) {
          e.preventDefault();
          const tabs = Array.from(document.querySelectorAll(".tab"));
          const panels = Array.from(document.querySelectorAll(".panel"));
          activateTab(tab, tabs, panels);
        }
        gPressed = false;
        clearTimeout(gTimer);
        return;
      }
      if (e.key === "g" && !e.metaKey && !e.ctrlKey) {
        gPressed = true;
        gTimer = setTimeout(() => { gPressed = false; }, 1000);
      }
    });
  }

  function showShortcutsHelp() {
    toast("اختصارات: / أو Ctrl+K بحث · g d تشخيص · g e كيانات · g s إحصاءات · g n شبكة · Esc إغلاق");
  }

  // === Focus Trap للمودال ===
  function trapFocus(modal) {
    if (!modal) return;
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(modal.querySelectorAll(focusableSelectors));
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    modal.addEventListener("keydown", function trap(e) {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // === تصدير PDF (عبر window.print) ===
  function exportPDF() {
    toast("جاري التحضير للطباعة...");
    setTimeout(() => window.print(), 200);
  }

  // === مشاركة الرابط ===
  function shareLink() {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => toast("نُسخ الرابط ✓"));
    } else {
      prompt("انسخ الرابط:", url);
    }
  }

  // === Mobile Bottom Nav (4 ثابتة + زرّ «المزيد» يفتح ورقة بالباقي) ===
  const MOBILE_NAV_PRIMARY = [
    { id: "diagnostic", icon: "📊", name: "تشخيص" },
    { id: "entities", icon: "📋", name: "كيانات" },
    { id: "stats", icon: "📈", name: "إحصاء" },
    { id: "export", icon: "📥", name: "تصدير" },
  ];
  const MOBILE_NAV_SECONDARY = [
    { id: "gaps", icon: "⚠", name: "الفجوات" },
    { id: "network", icon: "🕸", name: "الشبكة" },
    { id: "methodology", icon: "📐", name: "المنهجية" },
    { id: "references", icon: "📚", name: "المراجع" },
  ];

  function initMobileNav() {
    if (document.querySelector(".mobile-nav")) return;

    const nav = document.createElement("nav");
    nav.className = "mobile-nav";
    nav.setAttribute("role", "tablist");
    nav.innerHTML =
      MOBILE_NAV_PRIMARY.map((t) => `
        <button data-tab="${t.id}" aria-label="${t.name}">
          <span class="mobile-nav__icon">${t.icon}</span>
          <span>${t.name}</span>
        </button>
      `).join("") +
      `<button class="mobile-nav__more" data-more="1" aria-label="المزيد" aria-expanded="false">
        <span class="mobile-nav__icon">⋯</span>
        <span>المزيد</span>
      </button>`;
    document.body.appendChild(nav);

    // الورقة السفلية للتبويبات الثانوية
    const sheet = document.createElement("div");
    sheet.className = "mobile-more-sheet";
    sheet.setAttribute("aria-hidden", "true");
    sheet.innerHTML = `
      <div class="mobile-more-sheet__backdrop"></div>
      <div class="mobile-more-sheet__panel" role="dialog" aria-label="المزيد">
        <div class="mobile-more-sheet__handle"></div>
        <h3 class="mobile-more-sheet__title">المزيد من التبويبات</h3>
        <div class="mobile-more-sheet__grid">
          ${MOBILE_NAV_SECONDARY.map((t) => `
            <button data-tab="${t.id}" aria-label="${t.name}">
              <span class="mobile-more-sheet__icon">${t.icon}</span>
              <span>${t.name}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;
    document.body.appendChild(sheet);

    const openSheet = () => {
      sheet.classList.add("is-open");
      sheet.setAttribute("aria-hidden", "false");
      nav.querySelector(".mobile-nav__more").setAttribute("aria-expanded", "true");
    };
    const closeSheet = () => {
      sheet.classList.remove("is-open");
      sheet.setAttribute("aria-hidden", "true");
      nav.querySelector(".mobile-nav__more").setAttribute("aria-expanded", "false");
    };

    // أزرار التبويبات الأولية
    nav.querySelectorAll("button[data-tab]").forEach((b) => {
      b.addEventListener("click", () => {
        const tabs = Array.from(document.querySelectorAll(".tab"));
        const panels = Array.from(document.querySelectorAll(".panel"));
        activateTab(b.dataset.tab, tabs, panels);
        syncMobileNavActive();
      });
    });

    // زرّ «المزيد»
    nav.querySelector(".mobile-nav__more").addEventListener("click", () => {
      sheet.classList.contains("is-open") ? closeSheet() : openSheet();
    });

    // أزرار الورقة السفلية
    sheet.querySelectorAll("button[data-tab]").forEach((b) => {
      b.addEventListener("click", () => {
        const tabs = Array.from(document.querySelectorAll(".tab"));
        const panels = Array.from(document.querySelectorAll(".panel"));
        activateTab(b.dataset.tab, tabs, panels);
        closeSheet();
        syncMobileNavActive();
      });
    });

    // إغلاق الورقة عند النقر على الخلفية
    sheet.querySelector(".mobile-more-sheet__backdrop").addEventListener("click", closeSheet);

    // إغلاق بـ Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sheet.classList.contains("is-open")) closeSheet();
    });

    state._closeMobileMoreSheet = closeSheet;

    syncMobileNavActive();

    // مراقب: يحدّث التنقّل السفلي تلقائياً عند أي تغيير في .tab.is-active
    const tabsContainer = document.querySelector(".tabs");
    if (tabsContainer && window.MutationObserver) {
      const mo = new MutationObserver(() => syncMobileNavActive());
      mo.observe(tabsContainer, {
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "aria-selected"],
      });
    }
  }

  function syncMobileNavActive() {
    const nav = document.querySelector(".mobile-nav");
    if (!nav) return;
    const activeName = document.querySelector(".tab.is-active")?.dataset.tab;
    const isPrimary = MOBILE_NAV_PRIMARY.some((t) => t.id === activeName);
    const isSecondary = MOBILE_NAV_SECONDARY.some((t) => t.id === activeName);

    nav.querySelectorAll("button[data-tab]").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.tab === activeName);
    });
    // إضاءة زرّ «المزيد» إذا كان التبويب الحالي ثانوياً
    const moreBtn = nav.querySelector(".mobile-nav__more");
    if (moreBtn) moreBtn.classList.toggle("is-active", isSecondary);

    // أبرز التبويب الحالي داخل الورقة أيضاً
    const sheet = document.querySelector(".mobile-more-sheet");
    if (sheet) {
      sheet.querySelectorAll("button[data-tab]").forEach((b) => {
        b.classList.toggle("is-active", b.dataset.tab === activeName);
      });
    }

    // إغلاق فلتر الجوال إذا انتقلنا لتبويب غير الكيانات
    if (activeName !== "entities" && state._closeFiltersDrawer) {
      state._closeFiltersDrawer();
    }
  }

  // === تشغيل الفلاتر للموبايل ===
  // الزرّ inline داخل شريط الأدوات (يظهر فقط ≤1024px عبر CSS).
  // الـ drawer ينزلق من الأسفل عند النقر، مع backdrop + زرّ إغلاق.
  function initMobileFiltersToggle() {
    const toolbarBtn = document.querySelector(".toolbar-filters-btn");
    const filters = document.querySelector(".filters");
    if (!toolbarBtn || !filters) return;
    if (toolbarBtn.dataset.bound) return;
    toolbarBtn.dataset.bound = "1";

    // backdrop
    let backdrop = document.querySelector(".filters-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "filters-backdrop";
      backdrop.setAttribute("aria-hidden", "true");
      document.body.appendChild(backdrop);
    }

    // زرّ إغلاق داخل رأس الفلاتر
    const filtersHeader = filters.querySelector(".filters__header");
    if (filtersHeader && !filtersHeader.querySelector(".filters__close")) {
      const closeBtn = document.createElement("button");
      closeBtn.className = "filters__close";
      closeBtn.type = "button";
      closeBtn.setAttribute("aria-label", "إغلاق الفلاتر");
      closeBtn.textContent = "×";
      closeBtn.addEventListener("click", closeFiltersDrawer);
      filtersHeader.appendChild(closeBtn);
    }

    function openFiltersDrawer() {
      filters.classList.add("is-open");
      backdrop.classList.add("is-visible");
      document.body.style.overflow = "hidden";
    }
    function closeFiltersDrawer() {
      filters.classList.remove("is-open");
      backdrop.classList.remove("is-visible");
      document.body.style.overflow = "";
    }

    toolbarBtn.addEventListener("click", () => {
      if (filters.classList.contains("is-open")) closeFiltersDrawer();
      else openFiltersDrawer();
    });
    backdrop.addEventListener("click", closeFiltersDrawer);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && filters.classList.contains("is-open")) closeFiltersDrawer();
    });

    // اجعل إغلاق الـ drawer تلقائياً عند الانتقال لتبويب آخر
    state._closeFiltersDrawer = closeFiltersDrawer;
  }

  // === ربط الـ theme toggle بالهيدر ===
  function injectHeaderActions() {
    const header = document.querySelector(".site-header__inner");
    if (!header || document.querySelector(".site-header__actions")) return;
    const actions = document.createElement("div");
    actions.className = "site-header__actions";
    actions.innerHTML = `
      <button class="theme-toggle" aria-label="وضع داكن" title="تبديل الوضع (D)">🌙</button>
      <button class="theme-toggle" aria-label="بحث (/)" title="بحث (Ctrl+K)" id="search-trigger">🔎</button>
      <button class="theme-toggle" aria-label="مشاركة" title="مشاركة الرابط" id="share-trigger">↗</button>
      <button class="theme-toggle" aria-label="جولة تعريفية" title="عرض الجولة التعريفية" id="tour-trigger">?</button>
    `;
    header.appendChild(actions);
    actions.querySelector(".theme-toggle").addEventListener("click", toggleTheme);
    actions.querySelector("#search-trigger").addEventListener("click", openSearchOverlay);
    actions.querySelector("#share-trigger").addEventListener("click", shareLink);
    actions.querySelector("#tour-trigger").addEventListener("click", () => {
      try { localStorage.removeItem("seerah-tour-seen"); } catch (_) {}
      startTour();
    });
  }

  // === تحسين العلم في الفلاتر والبطاقات (post-render hook) ===
  function enhanceWithFlags() {
    document.querySelectorAll(".filter-option").forEach((opt) => {
      const input = opt.querySelector('input[data-facet="country"]');
      if (!input) return;
      if (opt.querySelector(".flag")) return;
      const flagEmoji = flag(input.value);
      if (flagEmoji) {
        const span = document.createElement("span");
        span.className = "flag";
        span.textContent = flagEmoji;
        opt.insertBefore(span, opt.children[1] || null);
      }
    });
  }

  // === تطعيم بطاقات الكيانات بأزرار "إضافة للمقارنة" ===
  const origCreateCard = typeof createCard === "function" ? createCard : null;

  // === Hero stats في تبويب التشخيص ===
  function injectDiagnosticHero() {
    const content = document.querySelector("#tab-diagnostic .diagnostic__content");
    if (!content || content.querySelector(".diag-hero")) return;
    const ents = state.entities;
    const institutions = ents.filter((e) => e.type_group !== "individual_actors").length;
    const individuals = ents.filter((e) => e.type_group === "individual_actors").length;
    const stats = [
      { value: ents.length, label: `كياناً (${institutions} مؤسسة + ${individuals} فاعل فرد)` },
      { value: new Set(ents.map(e => e.country).filter(Boolean)).size, label: "دولة في 5 قارات" },
      { value: 6, label: "جولات بحثية" },
      { value: ents.filter(e => e.inclusion_tier === "core").length, label: "تخصص أصلي" },
      { value: ents.reduce((s, e) => s + (e.explicit_relations?.length || 0), 0), label: "علاقة موثَّقة" },
    ];
    const hero = document.createElement("div");
    hero.className = "diag-hero";
    hero.innerHTML = stats.map((s) => `
      <div class="diag-hero__stat">
        <div class="diag-hero__value">${s.value}</div>
        <div class="diag-hero__label">${s.label}</div>
      </div>
    `).join("");
    content.prepend(hero);
  }

  // === تطعيم محتوى التشخيص بـ tooltips للمصطلحات ===
  function enhanceDiagnosticTerms() {
    const content = document.querySelector("#tab-diagnostic");
    if (!content) return;
    Object.entries(TERM_DEFINITIONS).forEach(([key, def]) => {
      // ابحث عن مصطلحات بسيطة في النص ولفّها بـ <span class="term">
      // (نطبّق فقط على المصطلحات المعروفة الإنجليزية لتجنّب الإيجابيات الخاطئة)
      if (!key.match(/[A-Za-z]/)) return;
      const pattern = new RegExp("(" + key.replace("_", "[-_ ]") + ")", "gi");
      // نطبّق على فقرات النصوص فقط لا على الجداول والروابط
      content.querySelectorAll(".diag-section__body p").forEach((p) => {
        if (p.querySelector("code") || p.querySelector("a")) return;
        if (pattern.test(p.innerHTML) && !p.innerHTML.includes('class="term"')) {
          p.innerHTML = p.innerHTML.replace(pattern, `<span class="term" title="${escapeHtml(def)}">$1</span>`);
        }
      });
    });
  }

  // === تطعيم المودال بزر نسخ ===
  function enhanceModalActions() {
    const footer = document.querySelector(".entity-modal__footer .entity-modal__actions");
    if (!footer) return;
    if (footer.querySelector(".btn-copy-id")) return;
    const entity = state.entities.find((e) => e.id === state.selectedId);
    if (!entity) return;
    // أضف زر نسخ
    const copyBtn = document.createElement("button");
    copyBtn.className = "btn btn--ghost btn--small btn-copy-id";
    copyBtn.textContent = `📋 ${entity.id}`;
    copyBtn.title = "نسخ المعرّف";
    copyBtn.addEventListener("click", () => {
      navigator.clipboard?.writeText(entity.id);
      toast(`نُسخ ${entity.id} ✓`);
    });
    footer.prepend(copyBtn);

    // زرّ نسخ رابط مشاركة الكيان (deep link)
    if (!footer.querySelector(".btn-share-link")) {
      const shareBtn = document.createElement("button");
      shareBtn.className = "btn btn--ghost btn--small btn-share-link";
      shareBtn.textContent = "🔗 نسخ الرابط";
      shareBtn.title = "نسخ رابط مباشر لهذه البطاقة للمشاركة";
      shareBtn.addEventListener("click", async () => {
        const base = window.location.origin + window.location.pathname;
        const url = `${base}#entity=${entity.id}`;
        try {
          // Web Share API على الجوال
          if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
            await navigator.share({
              title: entity.name_ar,
              text: `${entity.name_ar} — موسوعة السيرة النبوية المؤسسية`,
              url,
            });
            return;
          }
        } catch (_) { /* fallback to clipboard */ }
        try {
          await navigator.clipboard.writeText(url);
          toast("نُسخ رابط البطاقة ✓");
        } catch (_) {
          // fallback: prompt
          prompt("انسخ الرابط:", url);
        }
      });
      footer.appendChild(shareBtn);
    }

    // أضف زرّ ترجمة إذا في البطاقة محتوى غير عربي
    if (hasNonArabicContent(entity) && !footer.querySelector(".btn-translate")) {
      const translateBtn = document.createElement("button");
      translateBtn.className = "btn btn--ghost btn--small btn-translate";
      translateBtn.textContent = "🌐 ترجم البطاقة";
      translateBtn.title = "افتح ترجمة المحتوى في Google Translate";
      translateBtn.addEventListener("click", () => openTranslateForEntity(entity));
      footer.appendChild(translateBtn);
    }
  }

  // === Hook لتعزيز المودال بعد الفتح ===
  const origOpenModal = typeof openModal === "function" ? openModal : null;
  if (origOpenModal) {
    window.__seerahOpenModalEnhanced = function(id) {
      origOpenModal(id);
      setTimeout(() => {
        enhanceModalActions();
        const modal = document.querySelector(".entity-modal");
        trapFocus(modal);
      }, 0);
    };
  }

  // === Guided Tour — يظهر مرة واحدة (مع localStorage) ===
  const TOUR_STEPS = [
    {
      icon: "📖",
      title: "أهلاً بك في الموسوعة",
      text: "موسوعة مؤسسية لرصد وتشخيص 399 كياناً متخصصاً في خدمة السيرة النبوية، عبر 56 دولة و6 جولات بحثية."
    },
    {
      icon: "🔎",
      title: "ابحث في كل مكان",
      text: "اضغط Ctrl+K (أو / على لوحة المفاتيح) لفتح بحث عالمي يغطي البطاقات، أقسام التشخيص، والشخصيات."
    },
    {
      icon: "🗂️",
      title: "فلترة متعدّدة الأبعاد",
      text: "في تبويب «الكيانات» يمكنك تطبيق فلاتر متراكبة (الإقليم + النوع + الموضوع + …) لاستكشاف تقاطعات مخصّصة."
    },
    {
      icon: "📊",
      title: "إحصاءات قابلة للتصدير",
      text: "كل مخطّط في «الإحصاءات» له زرّ ⤓ يصدّر بيانات المخطّط مباشرة كملف CSV."
    },
    {
      icon: "🌙",
      title: "الوضع الداكن",
      text: "زر 🌙 في الترويسة يبدّل الوضع. تجربتك محفوظة محلياً."
    }
  ];

  function shouldShowTour() {
    if (!state.entities || state.entities.length === 0) return false;
    try { return !localStorage.getItem("seerah-tour-seen"); } catch (_) { return false; }
  }

  function startTour() {
    let step = 0;
    const backdrop = document.createElement("div");
    backdrop.className = "tour-backdrop";
    document.body.appendChild(backdrop);

    function render() {
      const s = TOUR_STEPS[step];
      backdrop.innerHTML = `
        <div class="tour-card" role="dialog" aria-modal="true" aria-labelledby="tour-title">
          <button class="tour-card__skip" aria-label="تخطّي الجولة">×</button>
          <div class="tour-card__icon" aria-hidden="true">${s.icon}</div>
          <h3 class="tour-card__title" id="tour-title">${escapeHtml(s.title)}</h3>
          <p class="tour-card__text">${escapeHtml(s.text)}</p>
          <div class="tour-card__progress" aria-hidden="true">
            ${TOUR_STEPS.map((_, i) => `<span class="tour-card__dot${i === step ? ' is-active' : ''}"></span>`).join("")}
          </div>
          <div class="tour-card__actions">
            ${step > 0 ? `<button class="btn btn--ghost" data-action="prev">السابق</button>` : ''}
            ${step < TOUR_STEPS.length - 1
              ? `<button class="btn btn--primary" data-action="next">التالي</button>`
              : `<button class="btn btn--primary" data-action="finish">ابدأ التصفّح</button>`}
          </div>
        </div>
      `;
      backdrop.querySelector(".tour-card__skip").addEventListener("click", end);
      const next = backdrop.querySelector('[data-action="next"]');
      const prev = backdrop.querySelector('[data-action="prev"]');
      const fin = backdrop.querySelector('[data-action="finish"]');
      if (next) next.addEventListener("click", () => { step++; render(); });
      if (prev) prev.addEventListener("click", () => { step--; render(); });
      if (fin) fin.addEventListener("click", end);
    }

    function end() {
      try { localStorage.setItem("seerah-tour-seen", "1"); } catch (_) {}
      backdrop.remove();
      document.removeEventListener("keydown", onKey);
    }

    function onKey(e) {
      if (e.key === "Escape") end();
      else if (e.key === "ArrowRight" && step > 0) { step--; render(); }
      else if (e.key === "ArrowLeft" && step < TOUR_STEPS.length - 1) { step++; render(); }
    }

    document.addEventListener("keydown", onKey);
    render();
  }

  // === تشغيل وحدات المرحلة 8 ===
  function bootPhase8() {
    initDarkMode();
    injectHeaderActions();
    initKeyboardShortcuts();
    // الفلاتر السفلية تظهر على التابلت والجوال (≤1024px)
    initMobileFiltersToggle();
    // التنقّل السفلي يظهر فقط على الجوال (≤768px)
    if (window.innerWidth <= 768) initMobileNav();
    // عند تغيير العرض، أعد التشغيل إن لزم
    let lastIsMobile = window.innerWidth <= 768;
    window.addEventListener("resize", debounce(() => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile && !lastIsMobile) {
        initMobileNav();
        syncMobileNavActive();
      }
      initMobileFiltersToggle();
      lastIsMobile = isMobile;
    }, 250));
    // الجولة التعريفية — بعد تحميل البيانات
    const tryTour = () => {
      if (state.entities && state.entities.length > 0) {
        if (shouldShowTour()) setTimeout(startTour, 800);
      } else {
        setTimeout(tryTour, 300);
      }
    };
    tryTour();
  }

  // === ربط hook على renderGrid لإضافة أزرار المقارنة ===
  const _origRenderGrid = renderGrid;
  renderGrid = function(list) {
    _origRenderGrid(list);
    // أضف زر مقارنة لكل بطاقة
    document.querySelectorAll(".card").forEach((card) => {
      if (card.querySelector(".compare-btn-in-card")) return;
      const btn = document.createElement("button");
      btn.className = "compare-btn-in-card";
      btn.dataset.id = card.dataset.id;
      btn.textContent = compareState.ids.has(card.dataset.id) ? "✓" : "+";
      btn.title = "إضافة للمقارنة";
      if (compareState.ids.has(card.dataset.id)) btn.classList.add("is-selected");
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleCompare(card.dataset.id);
      });
      card.style.position = "relative";
      card.appendChild(btn);
    });
    enhanceWithFlags();
  };

  // === Hook على renderDiagnostic لإضافة Hero و Terms ===
  const _origRenderDiagnostic = renderDiagnostic;
  renderDiagnostic = async function() {
    await _origRenderDiagnostic();
    setTimeout(() => {
      injectDiagnosticHero();
      enhanceDiagnosticTerms();
    }, 100);
  };

  // === Hook على openModal لزر نسخ + روابط fallback ===
  const _origOpenModal = openModal;
  openModal = function(id) {
    _origOpenModal(id);
    setTimeout(() => {
      enhanceModalActions();
      const modal = document.querySelector(".entity-modal");
      trapFocus(modal);
    }, 50);
  };

  // ============================================================
  // تبويب التصدير إلى Word — لوحة تحكّم + توليد DOCX في المتصفح
  // ============================================================

  const exportState = {
    filterMode: "all",       // all | region | type_group | subjects_category | country | round
    filterValue: "",         // قيمة الفلتر (مثلاً "arabia")
    structure: "region",     // region | type_group | subjects_category | round | hierarchical
    contentLevel: "standard",// minimal | standard | full | table
    extras: {
      cover: true,
      toc: true,
      stats: true,
      alphaIndex: false,
      hyperlinks: true,
    },
  };

  let docxLibLoaded = null;

  function loadDocxLib() {
    if (docxLibLoaded) return docxLibLoaded;
    // المسار المحلّي (في repo نفسه — يعمل دائماً، بلا اعتماد على CDN خارجي).
    // الـ CDNs محتفظ بها كاحتياط إذا تعطّل الملف المحلّي لأي سبب.
    const sources = [
      "assets/vendor/docx-9.6.1.umd.js",
      "https://unpkg.com/docx@9.6.1/dist/index.umd.cjs",
      "https://cdn.jsdelivr.net/npm/docx@9.6.1/dist/index.umd.cjs",
    ];
    docxLibLoaded = (async () => {
      if (window.docx) return window.docx;

      const errors = [];

      // 1) محاولة <script src> مباشرة من كل مصدر
      for (const url of sources) {
        try {
          await new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = url;
            s.async = true;
            s.onload = resolve;
            s.onerror = () => reject(new Error("script onerror"));
            document.head.appendChild(s);
          });
          if (window.docx) return window.docx;
          errors.push(`${url}: script loaded but window.docx undefined`);
        } catch (e) {
          errors.push(`${url}: ${e.message}`);
        }
      }

      // 2) Fallback: fetch ثم blob URL (يتجاوز MIME nosniff)
      for (const url of sources) {
        try {
          const res = await fetch(url);
          if (!res.ok) { errors.push(`${url}: HTTP ${res.status}`); continue; }
          const src = await res.text();
          const blob = new Blob([src], { type: "text/javascript" });
          const blobUrl = URL.createObjectURL(blob);
          await new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = blobUrl;
            s.onload = resolve;
            s.onerror = () => reject(new Error("blob script failed"));
            document.head.appendChild(s);
          });
          URL.revokeObjectURL(blobUrl);
          if (window.docx) return window.docx;
          errors.push(`${url} (blob): loaded but window.docx undefined`);
        } catch (e) {
          errors.push(`${url} (blob): ${e.message}`);
        }
      }

      console.error("[docx loader] all sources failed:", errors);
      throw new Error("تعذّر تحميل مكتبة docx (راجع وحدة التحكّم Console للتفاصيل)");
    })();
    return docxLibLoaded;
  }

  let pdfLibLoaded = null;
  function loadPdfLib() {
    if (pdfLibLoaded) return pdfLibLoaded;
    const sources = [
      "assets/vendor/html2pdf-0.10.3.bundle.min.js",
      "https://unpkg.com/html2pdf.js@0.10.3/dist/html2pdf.bundle.min.js",
    ];
    pdfLibLoaded = (async () => {
      if (window.html2pdf) return window.html2pdf;
      const errors = [];
      for (const url of sources) {
        try {
          await new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = url;
            s.async = true;
            s.onload = resolve;
            s.onerror = () => reject(new Error("script onerror"));
            document.head.appendChild(s);
          });
          if (window.html2pdf) return window.html2pdf;
          errors.push(`${url}: script loaded but window.html2pdf undefined`);
        } catch (e) {
          errors.push(`${url}: ${e.message}`);
        }
      }
      console.error("[pdf loader] all sources failed:", errors);
      throw new Error("تعذّر تحميل مكتبة PDF (راجع وحدة التحكّم Console)");
    })();
    return pdfLibLoaded;
  }

  function getExportFilterOptions(facet) {
    const counts = new Map();
    state.entities.forEach((e) => {
      const v = e[facet];
      if (Array.isArray(v)) v.forEach((x) => counts.set(x, (counts.get(x) || 0) + 1));
      else if (v) counts.set(v, (counts.get(v) || 0) + 1);
    });
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([code, n]) => ({ code, label: label(facet, code), count: n }));
  }

  function selectedEntitiesForExport() {
    const m = exportState.filterMode;
    if (m === "all") return state.entities;
    const v = exportState.filterValue;
    if (!v) return state.entities;
    return state.entities.filter((e) => {
      const ev = e[m];
      if (Array.isArray(ev)) return ev.includes(v);
      return ev === v;
    });
  }

  function groupForStructure(entities, structure) {
    const groups = new Map();
    const push = (key, e) => {
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(e);
    };
    if (structure === "hierarchical") {
      entities.forEach((e) => {
        const reg = e.region || "—";
        if (!groups.has(reg)) groups.set(reg, new Map());
        const inner = groups.get(reg);
        const tg = e.type_group || "—";
        if (!inner.has(tg)) inner.set(tg, []);
        inner.get(tg).push(e);
      });
    } else if (structure === "subjects_category") {
      entities.forEach((e) => {
        const cats = e.subjects_category && e.subjects_category.length ? e.subjects_category : ["—"];
        cats.forEach((c) => push(c, e));
      });
    } else {
      entities.forEach((e) => push(e[structure] || "—", e));
    }
    return groups;
  }

  function structureLabel(structure, code) {
    if (structure === "region") return label("region", code);
    if (structure === "type_group") return label("type_group", code);
    if (structure === "subjects_category") return label("subjects_category", code);
    if (structure === "round") return label("round", code);
    return code;
  }

  // ترتيب الفصول بحسب البنية المختارة
  const STRUCTURE_ORDER = {
    region: ["arabia", "levant_iraq_nile", "maghreb", "turkey", "non_arab_muslim", "western", "global"],
    type_group: ["research_education", "publishing_knowledge", "media_audience", "museums_culture", "institutional_infra", "individual_actors"],
    subjects_category: ["classical_corpus", "geography_space", "prophetic_demography", "auxiliary_sciences", "methodology_critique", "application_outreach", "applied_jurisprudence"],
    round: ["01", "02", "03", "04", "05", "06", "08a", "08b", "08c", "08d"],
  };

  function sortGroupKeys(structure, keys) {
    const order = STRUCTURE_ORDER[structure];
    if (!order) return [...keys].sort();
    return [...keys].sort((a, b) => {
      const ia = order.indexOf(a);
      const ib = order.indexOf(b);
      if (ia === -1 && ib === -1) return String(a).localeCompare(String(b), "ar");
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  }

  function renderExport() {
    const root = document.querySelector("#tab-export .container");
    if (!root) return;

    root.innerHTML = `
      <div class="export">
        <header class="export__header">
          <h2 class="export__title">📥 تصدير إلى Word</h2>
          <p class="export__hint">
            اختر ما تريد تنزيله، نسّق ترتيبه، ثم احصل على ملف <code>.docx</code> مصمَّم بخطوط عربية، عناوين عريضة،
            وعناوين فرعية، وروابط نشطة قابلة للنقر داخل Word.
          </p>
        </header>

        <div class="export__layout">
          <div class="export__controls">

            <fieldset class="export-group">
              <legend>① ماذا تنزّل؟</legend>
              <label class="export-radio">
                <input type="radio" name="ex-mode" value="all" checked> الكل
              </label>
              <label class="export-radio">
                <input type="radio" name="ex-mode" value="region"> حسب الإقليم
              </label>
              <label class="export-radio">
                <input type="radio" name="ex-mode" value="type_group"> حسب النوع
              </label>
              <label class="export-radio">
                <input type="radio" name="ex-mode" value="subjects_category"> حسب الموضوع
              </label>
              <label class="export-radio">
                <input type="radio" name="ex-mode" value="country"> حسب الدولة
              </label>
              <label class="export-radio">
                <input type="radio" name="ex-mode" value="round"> حسب الجولة
              </label>
              <select class="export-select export-filter-value" disabled
                      aria-label="اختر القيمة">
                <option value="">— اختر —</option>
              </select>
            </fieldset>

            <fieldset class="export-group">
              <legend>② كيف ترتّب الفصول؟</legend>
              <label class="export-radio">
                <input type="radio" name="ex-struct" value="region" checked> حسب الإقليم (7 فصول)
              </label>
              <label class="export-radio">
                <input type="radio" name="ex-struct" value="type_group"> حسب النوع (6 فصول)
              </label>
              <label class="export-radio">
                <input type="radio" name="ex-struct" value="subjects_category"> حسب الموضوع (7 فصول)
              </label>
              <label class="export-radio">
                <input type="radio" name="ex-struct" value="round"> حسب الجولة (10 فصول)
              </label>
              <label class="export-radio">
                <input type="radio" name="ex-struct" value="hierarchical"> هرمي: إقليم → نوع → كيان
              </label>
            </fieldset>

            <fieldset class="export-group">
              <legend>③ مستوى التفاصيل</legend>
              <label class="export-radio">
                <input type="radio" name="ex-level" value="minimal"> سطر واحد (اسم + بلد + رابط)
              </label>
              <label class="export-radio">
                <input type="radio" name="ex-level" value="standard" checked> قياسي (وصف + سنة + موضوع)
              </label>
              <label class="export-radio">
                <input type="radio" name="ex-level" value="full"> كامل (كل الحقول)
              </label>
              <label class="export-radio">
                <input type="radio" name="ex-level" value="table"> جدول واسع
              </label>
            </fieldset>

            <fieldset class="export-group">
              <legend>④ إضافات</legend>
              <label class="export-check"><input type="checkbox" data-ex="cover" checked> صفحة غلاف</label>
              <label class="export-check"><input type="checkbox" data-ex="toc" checked> فهرس محتويات تلقائي</label>
              <label class="export-check"><input type="checkbox" data-ex="stats" checked> ملخص إحصائي في البداية</label>
              <label class="export-check"><input type="checkbox" data-ex="alphaIndex"> فهرس أبجدي بالأسماء (نهاية)</label>
              <label class="export-check"><input type="checkbox" data-ex="hyperlinks" checked> روابط نشطة قابلة للنقر</label>
            </fieldset>
          </div>

          <aside class="export__preview">
            <div class="export-summary">
              <h3>المعاينة</h3>
              <p class="export-summary__count">
                <strong class="ex-count">—</strong> كياناً
              </p>
              <p class="export-summary__chapters">
                <strong class="ex-chapters">—</strong> فصلاً
              </p>
              <p class="export-summary__pages">
                ~<strong class="ex-pages">—</strong> صفحة تقريباً
              </p>
            </div>
            <button class="btn btn--primary export-download" type="button">
              <span aria-hidden="true">⬇</span> تنزيل DOCX
            </button>
            <button class="btn btn--primary export-download-pdf" type="button" title="ستظهر نافذة طباعة — اختر &quot;Save as PDF&quot;">
              <span aria-hidden="true">🖨</span> تصدير PDF
            </button>
            <button class="btn btn--ghost export-reset" type="button">↻ إعادة ضبط</button>
            <p class="export-progress" hidden></p>
          </aside>
        </div>
      </div>
    `;

    wireExportControls();
    updateExportPreview();
  }

  function wireExportControls() {
    const root = document.querySelector("#tab-export");
    if (!root) return;

    // الفلتر الرئيس
    root.querySelectorAll('input[name="ex-mode"]').forEach((r) => {
      r.addEventListener("change", () => {
        exportState.filterMode = r.value;
        exportState.filterValue = "";
        const sel = root.querySelector(".export-filter-value");
        if (r.value === "all") {
          sel.disabled = true;
          sel.innerHTML = '<option value="">— اختر —</option>';
        } else {
          sel.disabled = false;
          const opts = getExportFilterOptions(r.value);
          sel.innerHTML = '<option value="">— كل القيم —</option>' +
            opts.map((o) => `<option value="${o.code}">${o.label} (${o.count})</option>`).join("");
        }
        updateExportPreview();
      });
    });

    root.querySelector(".export-filter-value").addEventListener("change", (e) => {
      exportState.filterValue = e.target.value;
      updateExportPreview();
    });

    root.querySelectorAll('input[name="ex-struct"]').forEach((r) => {
      r.addEventListener("change", () => {
        exportState.structure = r.value;
        updateExportPreview();
      });
    });

    root.querySelectorAll('input[name="ex-level"]').forEach((r) => {
      r.addEventListener("change", () => {
        exportState.contentLevel = r.value;
        updateExportPreview();
      });
    });

    root.querySelectorAll('input[data-ex]').forEach((c) => {
      c.addEventListener("change", () => {
        exportState.extras[c.dataset.ex] = c.checked;
      });
    });

    root.querySelector(".export-download").addEventListener("click", handleExportDownload);
    root.querySelector(".export-download-pdf").addEventListener("click", handleExportDownloadPdf);
    root.querySelector(".export-reset").addEventListener("click", () => renderExport());
  }

  function updateExportPreview() {
    const root = document.querySelector("#tab-export");
    if (!root) return;
    const entities = selectedEntitiesForExport();
    const groups = groupForStructure(entities, exportState.structure);
    const chapters = exportState.structure === "hierarchical"
      ? [...groups.keys()].length
      : groups.size;

    // تقدير الصفحات حسب مستوى المحتوى
    const perEntity = { minimal: 0.08, standard: 0.4, full: 0.9, table: 0.15 }[exportState.contentLevel] || 0.4;
    const pages = Math.max(1, Math.round(entities.length * perEntity + chapters * 0.5));

    root.querySelector(".ex-count").textContent = entities.length;
    root.querySelector(".ex-chapters").textContent = chapters;
    root.querySelector(".ex-pages").textContent = pages;
  }

  async function handleExportDownload() {
    const root = document.querySelector("#tab-export");
    const progress = root.querySelector(".export-progress");
    const btn = root.querySelector(".export-download");
    btn.disabled = true;
    progress.hidden = false;
    progress.textContent = "⏳ جاري تحميل المكتبة…";

    try {
      const docxLib = await loadDocxLib();
      progress.textContent = "⏳ جاري بناء المستند…";
      const blob = await buildDocxBlob(docxLib);
      progress.textContent = "✓ جاهز — يبدأ التنزيل…";
      const fname = `موسوعة-السيرة-النبوية-${new Date().toISOString().slice(0,10)}.docx`;
      downloadBlob(blob, fname);
      setTimeout(() => { progress.hidden = true; }, 3000);
    } catch (err) {
      console.error(err);
      progress.textContent = "✗ فشل التصدير: " + err.message;
    } finally {
      btn.disabled = false;
    }
  }

  function handleExportDownloadPdf() {
    const root = document.querySelector("#tab-export");
    const progress = root.querySelector(".export-progress");
    const btn = root.querySelector(".export-download-pdf");
    const btnDocx = root.querySelector(".export-download");
    btn.disabled = true; btnDocx.disabled = true;
    progress.hidden = false;
    progress.textContent = "⏳ جاري بناء المستند…";

    try {
      // نهج بلا نوافذ منبثقة (يفشل على الجوال): نحقن المحتوى داخل الصفحة الحالية،
      // ثم نضع CSS طباعة يُظهره ويُخفي الباقي، ثم window.print()
      cleanupPdfPrintArea(); // إزالة أي بقايا من تشغيل سابق

      const built = buildPdfHtmlContainer();
      const area = document.createElement("div");
      area.id = "pdf-print-area";
      area.innerHTML = built.innerHTML;
      document.body.appendChild(area);

      const printStyle = document.createElement("style");
      printStyle.id = "pdf-print-style";
      printStyle.textContent = `
        /* الإخفاء الافتراضي على الشاشة (لا يظهر للمستخدم) */
        #pdf-print-area { display: none; }

        @media print {
          @page { size: A4; margin: 14mm 12mm; }

          /* أخفِ كل شيء على الجسم ثم أظهر منطقة الطباعة فقط */
          body > *:not(#pdf-print-area) { display: none !important; }
          html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }

          #pdf-print-area {
            display: block !important;
            font-family: "Tajawal", "IBM Plex Sans Arabic", sans-serif;
            font-size: 11pt; line-height: 1.7; color: #2a2a2a;
            direction: rtl; text-align: right;
          }
          #pdf-print-area h1 { font-size: 22pt; color: #0A4D68; margin: 16pt 0 10pt;
            padding-bottom: 6pt; border-bottom: 2px solid #0A4D68; page-break-after: avoid; }
          #pdf-print-area h2 { font-size: 16pt; color: #0A4D68; margin: 14pt 0 8pt; page-break-after: avoid; }
          #pdf-print-area h3 { font-size: 13pt; color: #C39B5C; margin: 12pt 0 6pt; page-break-after: avoid; }
          #pdf-print-area p { margin: 6pt 0; }
          #pdf-print-area a { color: #0563C1; text-decoration: underline; word-break: break-all; }
          #pdf-print-area ul { padding-inline-start: 0; padding-inline-end: 18pt; margin: 6pt 0; }
          #pdf-print-area li { margin: 3pt 0; }
          #pdf-print-area table { width: 100%; border-collapse: collapse; margin: 6pt 0; font-size: 10pt; }
          #pdf-print-area th, #pdf-print-area td {
            border: 1px solid #d8d2c1; padding: 4pt 6pt; text-align: right; vertical-align: top; }
          #pdf-print-area .pdf-entity { margin: 10pt 0 16pt; padding: 6pt 0; page-break-inside: avoid; }
          #pdf-print-area .pdf-entity__en { font-style: italic; color: #777; font-size: 10pt; margin-bottom: 6pt; }
          #pdf-print-area .pdf-entity__fields th { background: #F5F1E8; font-weight: 700; color: #0A4D68; width: 30%; }
          #pdf-print-area .pdf-entity__desc { margin: 6pt 0; line-height: 1.75; }
          #pdf-print-area .pdf-entity__url { font-size: 10pt; color: #0563C1; word-break: break-all; }
          #pdf-print-area .pdf-page-break { page-break-before: always; break-before: page; height: 0; }
          #pdf-print-area .pdf-cover { text-align: center; padding-block: 40mm 20mm; }
          #pdf-print-area .pdf-cover__title { font-size: 32pt; font-weight: 800; color: #0A4D68; margin-bottom: 12pt; }
          #pdf-print-area .pdf-cover__subtitle { font-size: 14pt; color: #555; margin-bottom: 30pt; line-height: 1.6; }
          #pdf-print-area .pdf-cover__count { font-size: 22pt; font-weight: 700; color: #C39B5C; margin: 18pt 0 8pt; }
          #pdf-print-area .pdf-cover__date { font-size: 11pt; color: #888; }
          #pdf-print-area .pdf-toc { list-style: none; padding: 0; }
          #pdf-print-area .pdf-toc li { padding: 4pt 0; border-bottom: 1px dotted #ccc; }
          #pdf-print-area .pdf-alpha { list-style: none; padding: 0; font-size: 10pt;
                                       columns: 2; column-gap: 12pt; }
          #pdf-print-area .pdf-alpha li { padding: 2pt 0; break-inside: avoid; }
          #pdf-print-area .pdf-wide-table th { background: #0A4D68; color: #fff !important; padding: 5pt; }
          #pdf-print-area .pdf-wide-table td { border: 1px solid #d8d2c1; padding: 4pt; }
        }
      `;
      document.head.appendChild(printStyle);

      // التنظيف بعد إغلاق نافذة الطباعة
      const cleanup = () => {
        cleanupPdfPrintArea();
        window.removeEventListener("afterprint", cleanup);
      };
      window.addEventListener("afterprint", cleanup);
      // احتياط: نظّف بعد 5 دقائق على أبعد تقدير
      setTimeout(cleanup, 300000);

      progress.textContent = "🖨 ستظهر نافذة الطباعة — اختر «Save as PDF» ثم احفظ.";

      // انتظر إطار رسم لضمان أن الـ DOM والـ CSS التحما، ثم استدعِ Print
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          try {
            window.print();
          } catch (e) {
            console.error("[pdf print] failed:", e);
            progress.textContent = "✗ فشل استدعاء الطباعة: " + e.message;
            cleanup();
          }
        });
      });

      setTimeout(() => { progress.hidden = true; }, 8000);
    } catch (err) {
      console.error("[pdf export] failed:", err);
      progress.textContent = "✗ فشل التصدير: " + (err.message || err);
      cleanupPdfPrintArea();
    } finally {
      btn.disabled = false; btnDocx.disabled = false;
    }
  }

  function cleanupPdfPrintArea() {
    document.getElementById("pdf-print-area")?.remove();
    document.getElementById("pdf-print-style")?.remove();
  }

  // يبني عنصر HTML مؤقّت يتضمّن نفس محتوى DOCX. الـ caller يحدّد الموضع.
  function buildPdfHtmlContainer() {
    const c = document.createElement("div");
    c.className = "pdf-export-root";
    c.style.cssText = `
      width: 186mm;
      direction: rtl; font-family: "Tajawal","IBM Plex Sans Arabic", sans-serif;
      color: #2a2a2a; background: #fff; padding: 0; font-size: 11pt; line-height: 1.7;
    `;

    const entities = selectedEntitiesForExport();
    const struct = exportState.structure;
    const level = exportState.contentLevel;

    let html = "";

    // غلاف
    if (exportState.extras.cover) {
      html += `
        <section class="pdf-cover">
          <div class="pdf-cover__title">موسوعة السيرة النبوية المؤسسية</div>
          <div class="pdf-cover__subtitle">رصد وتشخيص الكيانات المتخصصة في خدمة السيرة النبوية على مستوى العالم</div>
          <div class="pdf-cover__count">${entities.length} كياناً مؤسسياً</div>
          <div class="pdf-cover__date">صادر بتاريخ ${new Date().toLocaleDateString("ar-EG")}</div>
        </section>
        <div class="pdf-page-break"></div>
      `;
    }

    // إحصاءات
    if (exportState.extras.stats) {
      const byRegion = new Map(), byTypeGroup = new Map();
      const countries = new Set();
      entities.forEach((e) => {
        if (e.region) byRegion.set(e.region, (byRegion.get(e.region) || 0) + 1);
        if (e.type_group) byTypeGroup.set(e.type_group, (byTypeGroup.get(e.type_group) || 0) + 1);
        if (e.country) countries.add(e.country);
      });
      html += `<h1>ملخص إحصائي</h1>`;
      html += `<p><strong>إجمالي الكيانات:</strong> ${entities.length}</p>`;
      html += `<p><strong>عدد الدول:</strong> ${countries.size}</p>`;
      html += `<h2>التوزيع الإقليمي</h2><ul>`;
      [...byRegion.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
        html += `<li>${escapeHtml(label("region", k))}: ${v} كياناً</li>`;
      });
      html += `</ul>`;
      html += `<h2>التوزيع حسب النوع</h2><ul>`;
      [...byTypeGroup.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
        html += `<li>${escapeHtml(label("type_group", k))}: ${v} كياناً</li>`;
      });
      html += `</ul><div class="pdf-page-break"></div>`;
    }

    // فهرس المحتويات
    if (exportState.extras.toc) {
      html += `<h1>فهرس المحتويات</h1><ul class="pdf-toc">`;
      const groupsForToc = groupForStructure(entities, struct);
      const keys = struct === "hierarchical"
        ? sortGroupKeys("region", [...groupsForToc.keys()])
        : sortGroupKeys(struct, [...groupsForToc.keys()]);
      keys.forEach((k) => {
        const innerSize = struct === "hierarchical"
          ? [...groupsForToc.get(k).values()].reduce((a, arr) => a + arr.length, 0)
          : groupsForToc.get(k).length;
        html += `<li>${escapeHtml(structureLabel(struct === "hierarchical" ? "region" : struct, k))} <span class="pdf-toc__count">(${innerSize})</span></li>`;
      });
      html += `</ul><div class="pdf-page-break"></div>`;
    }

    // المحتوى الرئيس
    html += buildPdfBodyHtml(entities, struct, level);

    // الفهرس الأبجدي
    if (exportState.extras.alphaIndex) {
      html += `<div class="pdf-page-break"></div><h1>فهرس أبجدي بالأسماء</h1><ul class="pdf-alpha">`;
      [...entities].sort((a, b) => (a.name_ar || "").localeCompare(b.name_ar || "", "ar"))
        .forEach((e) => {
          html += `<li>${escapeHtml(e.name_ar || "")} — [${e.id}] (${escapeHtml(label("country", e.country))})</li>`;
        });
      html += `</ul>`;
    }

    c.innerHTML = html;
    return c;
  }

  function buildPdfBodyHtml(entities, struct, level) {
    let html = "";
    if (struct === "hierarchical") {
      const groups = groupForStructure(entities, "hierarchical");
      const regionKeys = sortGroupKeys("region", [...groups.keys()]);
      regionKeys.forEach((reg, i) => {
        if (i > 0) html += `<div class="pdf-page-break"></div>`;
        html += `<h1>${escapeHtml(structureLabel("region", reg))}</h1>`;
        const inner = groups.get(reg);
        sortGroupKeys("type_group", [...inner.keys()]).forEach((tg) => {
          html += `<h2>${escapeHtml(structureLabel("type_group", tg))}</h2>`;
          inner.get(tg)
            .sort((a, b) => (a.name_ar || "").localeCompare(b.name_ar || "", "ar"))
            .forEach((e) => { html += renderEntityHtml(e, level); });
        });
      });
    } else {
      const groups = groupForStructure(entities, struct);
      const keys = sortGroupKeys(struct, [...groups.keys()]);
      keys.forEach((k, i) => {
        if (i > 0) html += `<div class="pdf-page-break"></div>`;
        html += `<h1>${escapeHtml(structureLabel(struct, k))}</h1>`;
        const list = groups.get(k).sort((a, b) => (a.name_ar || "").localeCompare(b.name_ar || "", "ar"));
        if (level === "table") {
          html += renderEntitiesTableHtml(list);
        } else {
          list.forEach((e) => { html += renderEntityHtml(e, level); });
        }
      });
    }
    return html;
  }

  function renderEntityHtml(e, level) {
    const url = e.url ? `<a href="${escapeHtml(e.url)}" target="_blank" rel="noopener">${escapeHtml(e.url)}</a>` : "";
    if (level === "minimal") {
      const parts = [];
      if (e.country) parts.push(`📍 ${escapeHtml(label("country", e.country))}`);
      if (e.type) parts.push(escapeHtml(label("type", e.type)));
      return `<div class="pdf-entity pdf-entity--mini">
        <h3>[${e.id}] ${escapeHtml(e.name_ar || "")}</h3>
        <p>${parts.join(" | ")} ${url ? "— " + url : ""}</p>
      </div>`;
    }

    const fields = [
      ["النوع", label("type", e.type)],
      ["المجموعة", label("type_group", e.type_group)],
      ["البلد", label("country", e.country)],
      ["الإقليم", label("region", e.region)],
      ["سنة التأسيس", e.founded ? String(e.founded) : "—"],
      ["مستوى التحقّق", label("verification", e.verification)],
    ];
    if (level === "full") {
      fields.push(
        ["التمويل", label("funding_type", e.funding_type)],
        ["الحالة", label("status", e.status)],
        ["النطاق", label("scale", e.scale)],
        ["مستوى الإدراج", label("inclusion_tier", e.inclusion_tier)],
        ["الجولة", label("round", e.round)],
        ["اللغات", (e.languages || []).map((l) => label("languages", l)).join("، ") || "—"],
        ["المخرجات", (e.output_types || []).map((o) => label("output_types", o)).join("، ") || "—"],
        ["الموضوعات", (e.subjects || []).map((s) => label("subjects", s)).join("، ") || "—"],
      );
    } else {
      fields.push(["الموضوعات", (e.subjects || []).slice(0, 4).map((s) => label("subjects", s)).join("، ") || "—"]);
    }

    let html = `<div class="pdf-entity">`;
    html += `<h3>[${e.id}] ${escapeHtml(e.name_ar || "")}</h3>`;
    if (e.name_en) html += `<div class="pdf-entity__en">${escapeHtml(e.name_en)}</div>`;
    html += `<table class="pdf-entity__fields"><tbody>`;
    fields.forEach(([k, v]) => {
      html += `<tr><th>${escapeHtml(k)}</th><td>${escapeHtml(String(v ?? "—"))}</td></tr>`;
    });
    html += `</tbody></table>`;
    if (e.description_ar) html += `<p class="pdf-entity__desc">${escapeHtml(e.description_ar)}</p>`;
    if (level === "full") {
      if (e.key_figures && e.key_figures.length) html += `<p><strong>الشخصيات الرئيسة:</strong> ${escapeHtml(e.key_figures.join("، "))}</p>`;
      if (e.parent_organization_ar) html += `<p><strong>المؤسسة الأم:</strong> ${escapeHtml(e.parent_organization_ar)}</p>`;
      if (e.notes_ar) html += `<p class="pdf-entity__notes"><strong>ملاحظات:</strong> ${escapeHtml(e.notes_ar)}</p>`;
    }
    if (url) html += `<p class="pdf-entity__url">🔗 ${url}</p>`;
    html += `</div>`;
    return html;
  }

  function renderEntitiesTableHtml(list) {
    let html = `<table class="pdf-wide-table"><thead><tr>
      <th>الرمز</th><th>الاسم</th><th>النوع</th><th>البلد</th><th>السنة</th><th>الموضوعات</th>
    </tr></thead><tbody>`;
    list.forEach((e) => {
      html += `<tr>
        <td>${escapeHtml(e.id)}</td>
        <td>${escapeHtml(e.name_ar || "")}</td>
        <td>${escapeHtml(label("type", e.type))}</td>
        <td>${escapeHtml(label("country", e.country))}</td>
        <td>${e.founded || "—"}</td>
        <td>${escapeHtml((e.subjects || []).slice(0, 3).map((s) => label("subjects", s)).join("، "))}</td>
      </tr>`;
    });
    html += `</tbody></table>`;
    return html;
  }

  function escapeHtml(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  async function buildDocxBlob(docxLib) {
    const {
      Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
      Table, TableRow, TableCell, WidthType, BorderStyle, ExternalHyperlink,
      PageBreak, TableOfContents, LevelFormat, convertInchesToTwip,
    } = docxLib;

    const entities = selectedEntitiesForExport();
    const sections = [];

    // قسم: الغلاف + الإحصاءات + TOC
    const introChildren = [];
    if (exportState.extras.cover) introChildren.push(...buildCoverPage(docxLib, entities));
    if (exportState.extras.stats) introChildren.push(...buildStatsPage(docxLib, entities));
    if (exportState.extras.toc) introChildren.push(...buildTocPage(docxLib));

    if (introChildren.length) {
      sections.push({
        properties: { page: { margin: { top: 1000, right: 1000, bottom: 1000, left: 1000 } } },
        children: introChildren,
      });
    }

    // قسم رئيس: الفصول (entities)
    const mainChildren = buildBodyChildren(docxLib, entities);

    // الفهرس الأبجدي
    if (exportState.extras.alphaIndex) {
      mainChildren.push(...buildAlphaIndex(docxLib, entities));
    }

    sections.push({
      properties: { page: { margin: { top: 1000, right: 1000, bottom: 1000, left: 1000 } } },
      children: mainChildren,
    });

    const doc = new Document({
      creator: "موسوعة السيرة النبوية المؤسسية",
      title: "موسوعة السيرة النبوية المؤسسية",
      description: "تصدير من بوابة الموسوعة",
      styles: { default: buildDocxStyles(docxLib) },
      sections,
    });

    return Packer.toBlob(doc);
  }

  function buildDocxStyles(docxLib) {
    return {
      document: {
        run: { font: "Tajawal", size: 22, rightToLeft: true },
        paragraph: { spacing: { line: 360 } },
      },
      heading1: {
        run: { font: "Tajawal", size: 40, bold: true, color: "0A4D68", rightToLeft: true },
        paragraph: { spacing: { before: 480, after: 240 } },
      },
      heading2: {
        run: { font: "Tajawal", size: 30, bold: true, color: "0A4D68", rightToLeft: true },
        paragraph: { spacing: { before: 360, after: 180 } },
      },
      heading3: {
        run: { font: "Tajawal", size: 26, bold: true, color: "C39B5C", rightToLeft: true },
        paragraph: { spacing: { before: 240, after: 120 } },
      },
    };
  }

  function rtl(opts = {}) {
    return Object.assign({ bidirectional: true, alignment: "right" }, opts);
  }

  function P(docxLib, text, opts = {}) {
    const { Paragraph, TextRun } = docxLib;
    return new Paragraph({
      bidirectional: true,
      alignment: opts.alignment || "right",
      spacing: opts.spacing,
      heading: opts.heading,
      pageBreakBefore: opts.pageBreakBefore,
      children: [new TextRun({
        text: text,
        bold: opts.bold,
        size: opts.size,
        color: opts.color,
        font: "Tajawal",
        rightToLeft: true,
      })],
    });
  }

  function buildCoverPage(docxLib, entities) {
    const { Paragraph, TextRun, AlignmentType } = docxLib;
    return [
      new Paragraph({
        bidirectional: true,
        alignment: AlignmentType.CENTER,
        spacing: { before: 2400, after: 480 },
        children: [new TextRun({
          text: "موسوعة السيرة النبوية المؤسسية",
          bold: true, size: 56, color: "0A4D68", font: "Tajawal", rightToLeft: true,
        })],
      }),
      new Paragraph({
        bidirectional: true,
        alignment: AlignmentType.CENTER,
        spacing: { after: 360 },
        children: [new TextRun({
          text: "رصد وتشخيص الكيانات المتخصصة في خدمة السيرة النبوية على مستوى العالم",
          size: 28, color: "3A3A3A", font: "Tajawal", rightToLeft: true,
        })],
      }),
      new Paragraph({
        bidirectional: true,
        alignment: AlignmentType.CENTER,
        spacing: { before: 1200, after: 120 },
        children: [new TextRun({
          text: `${entities.length} كياناً مؤسسياً`,
          bold: true, size: 36, color: "C39B5C", font: "Tajawal", rightToLeft: true,
        })],
      }),
      new Paragraph({
        bidirectional: true,
        alignment: AlignmentType.CENTER,
        children: [new TextRun({
          text: `صادر بتاريخ ${new Date().toLocaleDateString("ar-EG")}`,
          size: 22, color: "666666", font: "Tajawal", rightToLeft: true,
        })],
      }),
      new Paragraph({ children: [new docxLib.PageBreak()] }),
    ];
  }

  function buildStatsPage(docxLib, entities) {
    const { Paragraph, TextRun, AlignmentType, PageBreak } = docxLib;
    const out = [];
    out.push(P(docxLib, "ملخص إحصائي", { heading: "Heading1" }));

    // إحصاءات سريعة
    const byRegion = new Map();
    const byTypeGroup = new Map();
    const countries = new Set();
    entities.forEach((e) => {
      if (e.region) byRegion.set(e.region, (byRegion.get(e.region) || 0) + 1);
      if (e.type_group) byTypeGroup.set(e.type_group, (byTypeGroup.get(e.type_group) || 0) + 1);
      if (e.country) countries.add(e.country);
    });

    out.push(P(docxLib, `إجمالي الكيانات: ${entities.length}`, { size: 24 }));
    out.push(P(docxLib, `عدد الدول: ${countries.size}`, { size: 24 }));
    out.push(P(docxLib, "", { size: 12 }));

    out.push(P(docxLib, "التوزيع الإقليمي", { heading: "Heading2" }));
    [...byRegion.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
      out.push(P(docxLib, `• ${label("region", k)}: ${v} كياناً`, { size: 22 }));
    });

    out.push(P(docxLib, "التوزيع حسب النوع", { heading: "Heading2" }));
    [...byTypeGroup.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
      out.push(P(docxLib, `• ${label("type_group", k)}: ${v} كياناً`, { size: 22 }));
    });

    out.push(new Paragraph({ children: [new PageBreak()] }));
    return out;
  }

  function buildTocPage(docxLib) {
    const { Paragraph, TextRun, TableOfContents, PageBreak } = docxLib;
    return [
      P(docxLib, "فهرس المحتويات", { heading: "Heading1" }),
      new TableOfContents("فهرس المحتويات", {
        hyperlink: true,
        headingStyleRange: "1-3",
      }),
      new Paragraph({ children: [new PageBreak()] }),
    ];
  }

  function buildBodyChildren(docxLib, entities) {
    const out = [];
    const struct = exportState.structure;

    if (struct === "hierarchical") {
      const groups = groupForStructure(entities, "hierarchical");
      const regionKeys = sortGroupKeys("region", [...groups.keys()]);
      regionKeys.forEach((reg) => {
        out.push(P(docxLib, structureLabel("region", reg), { heading: "Heading1", pageBreakBefore: true }));
        const inner = groups.get(reg);
        const tgKeys = sortGroupKeys("type_group", [...inner.keys()]);
        tgKeys.forEach((tg) => {
          out.push(P(docxLib, structureLabel("type_group", tg), { heading: "Heading2" }));
          inner.get(tg)
            .sort((a, b) => (a.name_ar || "").localeCompare(b.name_ar || "", "ar"))
            .forEach((e) => out.push(...renderEntityBlock(docxLib, e)));
        });
      });
    } else {
      const groups = groupForStructure(entities, struct);
      const keys = sortGroupKeys(struct, [...groups.keys()]);
      keys.forEach((k) => {
        out.push(P(docxLib, structureLabel(struct, k), { heading: "Heading1", pageBreakBefore: true }));
        const list = groups.get(k).sort((a, b) => (a.name_ar || "").localeCompare(b.name_ar || "", "ar"));

        if (exportState.contentLevel === "table") {
          out.push(buildEntitiesTable(docxLib, list));
        } else {
          list.forEach((e) => out.push(...renderEntityBlock(docxLib, e)));
        }
      });
    }
    return out;
  }

  function renderEntityBlock(docxLib, e) {
    const level = exportState.contentLevel;
    const { Paragraph, TextRun, ExternalHyperlink } = docxLib;
    const out = [];

    // عنوان الكيان
    const titleRuns = [new TextRun({
      text: `[${e.id}] ${e.name_ar || ""}`,
      bold: true, size: 26, color: "0A4D68", font: "Tajawal", rightToLeft: true,
    })];
    out.push(new Paragraph({
      bidirectional: true, alignment: "right",
      heading: "Heading3",
      spacing: { before: 240, after: 80 },
      children: titleRuns,
    }));

    // الاسم الإنجليزي إن وُجد
    if (e.name_en) {
      out.push(new Paragraph({
        bidirectional: true, alignment: "right",
        spacing: { after: 80 },
        children: [new TextRun({
          text: e.name_en, italics: true, size: 20, color: "666666",
          font: "Tajawal", rightToLeft: true,
        })],
      }));
    }

    if (level === "minimal") {
      const parts = [];
      if (e.country) parts.push(`📍 ${label("country", e.country)}`);
      if (e.type) parts.push(label("type", e.type));
      const meta = parts.length ? parts.join(" | ") + " " : "";
      const runs = [new TextRun({ text: meta, size: 22, font: "Tajawal", rightToLeft: true })];
      if (e.url && exportState.extras.hyperlinks) {
        out.push(new Paragraph({
          bidirectional: true, alignment: "right",
          children: [
            ...runs,
            new ExternalHyperlink({
              link: e.url,
              children: [new TextRun({ text: e.url, color: "0563C1", underline: {}, size: 22, font: "Tajawal", rightToLeft: true })],
            }),
          ],
        }));
      } else {
        out.push(new Paragraph({ bidirectional: true, alignment: "right", children: runs }));
      }
      return out;
    }

    // قياسي / كامل: جدول الحقول
    const fields = [
      ["النوع", label("type", e.type)],
      ["المجموعة", label("type_group", e.type_group)],
      ["البلد", label("country", e.country)],
      ["الإقليم", label("region", e.region)],
      ["سنة التأسيس", e.founded ? String(e.founded) : "—"],
      ["مستوى التحقّق", label("verification", e.verification)],
    ];
    if (level === "full") {
      fields.push(
        ["التمويل", label("funding_type", e.funding_type)],
        ["الحالة", label("status", e.status)],
        ["النطاق", label("scale", e.scale)],
        ["مستوى الإدراج", label("inclusion_tier", e.inclusion_tier)],
        ["الجولة", label("round", e.round)],
        ["اللغات", (e.languages || []).map((l) => label("languages", l)).join("، ") || "—"],
        ["المخرجات", (e.output_types || []).map((o) => label("output_types", o)).join("، ") || "—"],
        ["الموضوعات", (e.subjects || []).map((s) => label("subjects", s)).join("، ") || "—"],
      );
    } else {
      fields.push(["الموضوعات", (e.subjects || []).slice(0, 4).map((s) => label("subjects", s)).join("، ") || "—"]);
    }

    out.push(buildFieldTable(docxLib, fields));

    // الوصف
    if (e.description_ar) {
      out.push(new Paragraph({
        bidirectional: true, alignment: "right",
        spacing: { before: 120, after: 80 },
        children: [new TextRun({
          text: e.description_ar, size: 22, font: "Tajawal", rightToLeft: true,
        })],
      }));
    }

    if (level === "full") {
      if (e.key_figures && e.key_figures.length) {
        out.push(P(docxLib, "الشخصيات الرئيسة: " + e.key_figures.join("، "), { size: 20 }));
      }
      if (e.parent_organization_ar) {
        out.push(P(docxLib, "المؤسسة الأم: " + e.parent_organization_ar, { size: 20 }));
      }
      if (e.notes_ar) {
        out.push(P(docxLib, "ملاحظات: " + e.notes_ar, { size: 20, color: "666666" }));
      }
    }

    // الرابط
    if (e.url && exportState.extras.hyperlinks) {
      out.push(new Paragraph({
        bidirectional: true, alignment: "right",
        spacing: { before: 80, after: 200 },
        children: [
          new TextRun({ text: "🔗 ", size: 22, font: "Tajawal", rightToLeft: true }),
          new ExternalHyperlink({
            link: e.url,
            children: [new TextRun({
              text: e.url, color: "0563C1", underline: {}, size: 20, font: "Tajawal", rightToLeft: true,
            })],
          }),
        ],
      }));
    } else if (e.url) {
      out.push(P(docxLib, "🔗 " + e.url, { size: 20, color: "0563C1" }));
    }

    return out;
  }

  function buildFieldTable(docxLib, fields) {
    const { Table, TableRow, TableCell, Paragraph, TextRun, WidthType, BorderStyle } = docxLib;
    const border = { style: BorderStyle.SINGLE, size: 4, color: "D8D2C1" };
    const borders = { top: border, bottom: border, left: border, right: border };

    const rows = fields.map(([key, val]) => new TableRow({
      children: [
        new TableCell({
          width: { size: 30, type: WidthType.PERCENTAGE },
          shading: { fill: "F5F1E8" },
          children: [new Paragraph({
            bidirectional: true, alignment: "right",
            children: [new TextRun({
              text: key, bold: true, size: 20, font: "Tajawal", rightToLeft: true, color: "0A4D68",
            })],
          })],
        }),
        new TableCell({
          width: { size: 70, type: WidthType.PERCENTAGE },
          children: [new Paragraph({
            bidirectional: true, alignment: "right",
            children: [new TextRun({
              text: String(val ?? "—"), size: 20, font: "Tajawal", rightToLeft: true,
            })],
          })],
        }),
      ],
    }));

    return new Table({
      visuallyRightToLeft: true,
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows,
      borders: {
        top: border, bottom: border, left: border, right: border,
        insideHorizontal: border, insideVertical: border,
      },
    });
  }

  function buildEntitiesTable(docxLib, entities) {
    const { Table, TableRow, TableCell, Paragraph, TextRun, WidthType, BorderStyle } = docxLib;
    const border = { style: BorderStyle.SINGLE, size: 4, color: "D8D2C1" };

    const headerCell = (txt, w) => new TableCell({
      width: { size: w, type: WidthType.PERCENTAGE },
      shading: { fill: "0A4D68" },
      children: [new Paragraph({
        bidirectional: true, alignment: "right",
        children: [new TextRun({ text: txt, bold: true, color: "FFFFFF", size: 20, font: "Tajawal", rightToLeft: true })],
      })],
    });

    const cell = (txt, w) => new TableCell({
      width: { size: w, type: WidthType.PERCENTAGE },
      children: [new Paragraph({
        bidirectional: true, alignment: "right",
        children: [new TextRun({ text: txt, size: 18, font: "Tajawal", rightToLeft: true })],
      })],
    });

    const rows = [
      new TableRow({ tableHeader: true, children: [
        headerCell("الرمز", 8),
        headerCell("الاسم", 32),
        headerCell("النوع", 18),
        headerCell("البلد", 12),
        headerCell("السنة", 8),
        headerCell("الموضوعات", 22),
      ]}),
      ...entities.map((e) => new TableRow({ children: [
        cell(e.id, 8),
        cell(e.name_ar || "", 32),
        cell(label("type", e.type), 18),
        cell(label("country", e.country), 12),
        cell(e.founded ? String(e.founded) : "—", 8),
        cell((e.subjects || []).slice(0, 3).map((s) => label("subjects", s)).join("، "), 22),
      ]})),
    ];

    return new Table({
      visuallyRightToLeft: true,
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows,
      borders: {
        top: border, bottom: border, left: border, right: border,
        insideHorizontal: border, insideVertical: border,
      },
    });
  }

  function buildAlphaIndex(docxLib, entities) {
    const out = [];
    out.push(P(docxLib, "فهرس أبجدي بالأسماء", { heading: "Heading1", pageBreakBefore: true }));
    const sorted = [...entities].sort((a, b) => (a.name_ar || "").localeCompare(b.name_ar || "", "ar"));
    sorted.forEach((e) => {
      out.push(P(docxLib, `${e.name_ar || ""} — [${e.id}] (${label("country", e.country)})`, { size: 20 }));
    });
    return out;
  }

  // === التشغيل الفعلي ===
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootPhase8);
  } else {
    bootPhase8();
  }

})();

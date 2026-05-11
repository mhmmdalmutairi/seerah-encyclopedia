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
    },
    country: {
      SA: "السعودية", AE: "الإمارات", QA: "قطر", KW: "الكويت", BH: "البحرين",
      OM: "عُمان", YE: "اليمن", EG: "مصر", JO: "الأردن", SY: "سوريا",
      LB: "لبنان", PS: "فلسطين", IQ: "العراق", SD: "السودان", MA: "المغرب",
      DZ: "الجزائر", TN: "تونس", LY: "ليبيا", MR: "موريتانيا", TR: "تركيا",
      PK: "باكستان", IN: "الهند", BD: "بنغلاديش", ID: "إندونيسيا", MY: "ماليزيا",
      UZ: "أوزبكستان", NG: "نيجيريا", SN: "السنغال", ZA: "جنوب أفريقيا",
      TZ: "تنزانيا", IR: "إيران", US: "الولايات المتحدة", KZ: "كازاخستان",
      SO: "الصومال", GB: "المملكة المتحدة", CA: "كندا", DE: "ألمانيا",
      FR: "فرنسا", IT: "إيطاليا", NL: "هولندا", BE: "بلجيكا", AT: "النمسا",
      HU: "المجر", CH: "سويسرا", ES: "إسبانيا", DK: "الدنمارك", SE: "السويد",
      NO: "النرويج", FI: "فنلندا", PL: "بولندا", CZ: "التشيك", RU: "روسيا",
      AU: "أستراليا", JP: "اليابان", CN: "الصين", IL: "إسرائيل",
    },
    type: {
      academic_chair: "كرسي علمي",
      university_center: "مركز جامعي",
      university_department: "قسم جامعي",
      research_center: "مركز بحثي",
      foundation_waqf: "مؤسسة/وقف",
      museum: "متحف",
      exhibition: "معرض",
      library_archive: "مكتبة/أرشيف",
      award: "جائزة",
      publisher: "دار نشر",
      journal: "مجلة محكّمة",
      conference_series: "مؤتمر دوري",
      digital_platform: "منصة رقمية",
      podcast_series: "بودكاست",
      encyclopedia_project: "مشروع موسوعي",
      ministry_program: "برنامج وزاري",
      mosque_program: "برنامج مسجدي",
      individual_researcher: "باحث فرد",
    },
    type_group: {
      academic: "أكاديمي",
      research_center: "مركز بحثي",
      museum_archive: "متحف/أرشيف",
      award: "جائزة",
      publisher: "دار نشر",
      journal: "مجلة",
      digital: "منصة رقمية",
      conference: "مؤتمر",
      program: "برنامج",
    },
    subjects: {
      seerah_general: "السيرة العامة",
      maghazi: "المغازي",
      shamail: "الشمائل",
      seerah_geography: "جغرافيا السيرة",
      early_islam: "الإسلام المبكر",
      rashidun: "الراشدون",
      manuscripts: "المخطوطات",
      hadith_sciences: "علوم الحديث",
      sources_critique: "نقد المتون والأسانيد",
      orientalism_critique: "نقد الاستشراق",
      historiography: "التأريخ",
      biography_methodology: "منهج السيرة",
      ahlulbayt: "أهل البيت",
      ahl_al_sunna: "أهل السنة",
      sufism_seerah: "السيرة الصوفية",
      seerah_pedagogy: "تعليم السيرة",
      youth_outreach: "السيرة للناشئة",
      digital_seerah: "السيرة الرقمية",
      tarjamah: "ترجمة السيرة",
      comparative_religion: "السيرة المقارنة",
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
      video: "فيديو",
      exhibition: "معارض",
      database: "قواعد بيانات",
      encyclopedia: "موسوعات",
      manuscripts: "مخطوطات",
      courses: "دورات",
      fatwa: "فتاوى",
      translation: "ترجمات",
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
      inclusion_tier: new Set(),
      verification: new Set(),
      founded_decade: new Set(),
      subjects: new Set(),
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
    "region", "country", "type_group", "type", "inclusion_tier", "verification",
    "founded_decade", "subjects", "languages", "output_types",
    "funding_type", "status", "scale", "round",
  ];

  const FACET_TITLES = {
    region: "الإقليم",
    country: "الدولة",
    type_group: "نوع الكيان (عام)",
    type: "النوع التفصيلي",
    inclusion_tier: "مستوى الإدراج",
    verification: "درجة التحقق",
    founded_decade: "عقد التأسيس",
    subjects: "الموضوع",
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
    region: ["arabia", "levant_iraq_nile", "maghreb", "turkey_anatolia", "non_arab_muslim_world", "western"],
    inclusion_tier: ["core", "borderline", "below_threshold"],
    verification: ["field_verified", "desk_verified", "needs_verification", "unverifiable"],
    scale: ["international", "regional", "national", "local"],
    status: ["active", "dormant", "suspended", "closed", "archived_digital"],
    round: ["1", "2", "3", "4", "5", "6", 1, 2, 3, 4, 5, 6],
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
        academic: "var(--type-academic)",
        research_center: "var(--type-research)",
        museum_archive: "var(--type-museum)",
        award: "var(--type-award)",
        publisher: "var(--type-publisher)",
        journal: "var(--type-journal)",
        digital: "var(--type-digital)",
        conference: "var(--type-conference)",
        program: "var(--type-program)",
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

    FACET_ORDER.forEach((facet) => {
      const counts = getFacetCounts(facet);
      if (counts.size === 0) return;

      const group = document.createElement("div");
      group.className = "filter-group";
      group.dataset.facet = facet;

      const titleBtn = document.createElement("button");
      titleBtn.className = "filter-group__title";
      titleBtn.type = "button";
      titleBtn.textContent = FACET_TITLES[facet] || facet;
      titleBtn.addEventListener("click", () => {
        group.classList.toggle("is-collapsed");
      });
      // اطوِ بشكل افتراضي الفلاتر الأطول لتقليل التشويش
      if (counts.size > 10) group.classList.add("is-collapsed");
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
      container.appendChild(group);
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

    const accent = `var(--type-${entity.type_group === "research_center" ? "research" : entity.type_group === "museum_archive" ? "museum" : entity.type_group})`;
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
  }

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
  };

  const PALETTE_TYPE_GROUPS = {
    academic: "#3B70A8",
    research_center: "#5B7B3E",
    museum_archive: "#C9A646",
    award: "#7B3B7B",
    publisher: "#B86E3B",
    journal: "#8B2929",
    digital: "#4A4A4A",
    conference: "#2A7F62",
    program: "#6B5B95",
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
    wrap.appendChild(buildProfilesIndex());      // مرتبة عالياً للظهور بوضوح
    wrap.appendChild(buildPieRegions());
    wrap.appendChild(buildBarTypeGroups());
    wrap.appendChild(buildTimelineDecades());
    wrap.appendChild(buildBarCountries());
    wrap.appendChild(buildHeatmapRegionSubject());
    wrap.appendChild(buildStackedTierVerification());
    wrap.appendChild(buildTimelineImmersive());

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

    // خطوط الشبكة — خطوط الطول وخطوط العرض كل 30°
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
                  <rect x="0" y="0" width="${w}" height="${h}" fill="var(--color-bg-subtle)"/>
                  ${halos}
                  ${bg}
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

    const gridCols = `repeat(${ents.length}, minmax(200px, 1fr))`;
    let html = `
      <div class="compare-modal__header">
        <h3 style="margin:0; color:#fff;">مقارنة ${ents.length} كيانات</h3>
        <button class="entity-modal__close" aria-label="إغلاق">×</button>
      </div>
      <div class="compare-modal__body">
        <div class="compare-grid" style="grid-template-columns: 140px ${gridCols};">
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

  // === Web fallback links (Google/Wikipedia) للبطاقات بدون URL ===
  function webFallbackLinks(entity) {
    const query = encodeURIComponent(entity.name_en || entity.name_ar);
    return `
      <a class="btn btn--ghost btn--small" href="https://www.google.com/search?q=${query}" target="_blank" rel="noopener" title="بحث Google">🔎 Google</a>
      <a class="btn btn--ghost btn--small" href="https://ar.wikipedia.org/wiki/Special:Search?search=${query}" target="_blank" rel="noopener" title="بحث ويكيبيديا">📖 Wikipedia</a>
    `;
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

  // === Mobile Bottom Nav ===
  function initMobileNav() {
    if (document.querySelector(".mobile-nav")) return;
    const tabsList = [
      { id: "diagnostic", icon: "📊", name: "تشخيص" },
      { id: "entities", icon: "📋", name: "كيانات" },
      { id: "network", icon: "🕸", name: "شبكة" },
      { id: "stats", icon: "📈", name: "إحصاء" },
      { id: "methodology", icon: "📐", name: "منهجية" },
      { id: "references", icon: "📚", name: "مراجع" },
    ];
    const nav = document.createElement("nav");
    nav.className = "mobile-nav";
    nav.setAttribute("role", "tablist");
    nav.innerHTML = tabsList.map((t) => `
      <button data-tab="${t.id}" aria-label="${t.name}">
        <span class="mobile-nav__icon">${t.icon}</span>
        <span>${t.name}</span>
      </button>
    `).join("");
    document.body.appendChild(nav);
    nav.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => {
        const tabs = Array.from(document.querySelectorAll(".tab"));
        const panels = Array.from(document.querySelectorAll(".panel"));
        activateTab(b.dataset.tab, tabs, panels);
        syncMobileNavActive();
      });
    });
    syncMobileNavActive();

    // مراقب: يحدّث التنقّل السفلي تلقائياً عند أي تغيير في .tab.is-active
    // (مثلاً من بطاقات استشهادية، من URL hash، من overlay البحث، …)
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
    nav.querySelectorAll("button").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.tab === activeName);
    });
    // إخفاء زر الفلاتر خارج تبويب الكيانات
    const filtersToggle = document.querySelector(".filters__toggle");
    if (filtersToggle) {
      filtersToggle.style.display = activeName === "entities" ? "" : "none";
    }
    // إغلاق الـ drawer إذا انتقلنا لتبويب آخر
    const filters = document.querySelector(".filters");
    if (filters && activeName !== "entities") filters.classList.remove("is-open");
  }

  // === زر فلاتر للموبايل — يظهر فقط في تبويب الكيانات ===
  function initMobileFiltersToggle() {
    if (document.querySelector(".filters__toggle")) return;
    const btn = document.createElement("button");
    btn.className = "btn btn--primary filters__toggle";
    btn.textContent = "⚙ فلاتر";
    btn.addEventListener("click", () => {
      const filters = document.querySelector(".filters");
      if (filters) filters.classList.toggle("is-open");
    });
    document.body.appendChild(btn);
    // الإخفاء الأوّلي إن لم نكن في تبويب الكيانات
    const activeName = document.querySelector(".tab.is-active")?.dataset.tab;
    if (activeName !== "entities") btn.style.display = "none";
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
    const stats = [
      { value: ents.length, label: "كياناً موسوعياً" },
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
    // إذا لا URL، أضف روابط Google/Wikipedia
    if (!entity.url) {
      const wrap = document.createElement("span");
      wrap.style.display = "inline-flex";
      wrap.style.gap = "var(--space-xs)";
      wrap.innerHTML = webFallbackLinks(entity);
      footer.appendChild(wrap);
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
    if (window.innerWidth <= 768) {
      initMobileNav();
      initMobileFiltersToggle();
    }
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

  // === التشغيل الفعلي ===
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootPhase8);
  } else {
    bootPhase8();
  }

})();

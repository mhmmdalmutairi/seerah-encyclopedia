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
      inclusion_tier: new Set(),
      verification: new Set(),
      founded_decade: new Set(),
      subjects: new Set(),
      funding_type: new Set(),
      status: new Set(),
      scale: new Set(),
      round: new Set(),
    },
    sort: "name_ar",
    selectedId: null,
  };

  const FACET_ORDER = [
    "region", "country", "type_group", "inclusion_tier", "verification",
    "founded_decade", "subjects", "funding_type", "status", "scale", "round",
  ];

  const FACET_TITLES = {
    region: "الإقليم",
    country: "الدولة",
    type_group: "نوع الكيان",
    inclusion_tier: "مستوى الإدراج",
    verification: "درجة التحقق",
    founded_decade: "عقد التأسيس",
    subjects: "الموضوع",
    funding_type: "التمويل",
    status: "الحالة",
    scale: "النطاق",
    round: "الجولة",
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
      state.entities = Array.isArray(data.entities) ? data.entities : [];
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

      const sortedEntries = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
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

    // اللغات
    if (entity.languages && entity.languages.length) {
      const tags = entity.languages.map((l) =>
        `<span class="tag-list__item">${escapeHtml(label("languages", l))}</span>`
      ).join("");
      body.appendChild(modalSection("اللغات", `<div class="tag-list">${tags}</div>`));
    }

    // المخرجات
    if (entity.output_types && entity.output_types.length) {
      const tags = entity.output_types.map((o) =>
        `<span class="tag-list__item">${escapeHtml(label("output_types", o))}</span>`
      ).join("");
      body.appendChild(modalSection("نوع الإنتاج", `<div class="tag-list">${tags}</div>`));
    }

    // الشخصيات
    if (entity.key_figures && entity.key_figures.length) {
      const tags = entity.key_figures.map((p) =>
        `<span class="tag-list__item">${escapeHtml(p)}</span>`
      ).join("");
      body.appendChild(modalSection("الشخصيات البارزة", `<div class="tag-list">${tags}</div>`));
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

  function buildKPIs() {
    const ents = state.entities;
    const total = ents.length;
    const countries = new Set(ents.map((e) => e.country).filter(Boolean)).size;
    const coreCount = ents.filter((e) => e.inclusion_tier === "core").length;
    const relations = ents.reduce((sum, e) => sum + (e.explicit_relations?.length || 0), 0);
    const active = ents.filter((e) => e.status === "active").length;
    const suspended = ents.filter((e) => e.status === "suspended" || e.status === "closed").length;

    const kpis = [
      { label: "إجمالي الكيانات", value: total, hint: "موزّعة على 6 جولات", accent: "var(--color-primary)" },
      { label: "تخصص أصلي (core)", value: coreCount, hint: `${Math.round(coreCount/total*100)}% من الإجمالي`, accent: "var(--tier-core)" },
      { label: "دول مغطّاة", value: countries, hint: "في 5 قارات", accent: "var(--color-accent)" },
      { label: "علاقات صريحة", value: relations, hint: "بين الكيانات", accent: "var(--type-research)" },
      { label: "كيانات نشطة", value: active, hint: `${suspended} معلَّق/مغلق`, accent: "var(--verif-field)" },
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
      `;
      wrap.appendChild(card);
    });
    return wrap;
  }

  function buildChartsGrid() {
    const wrap = document.createElement("div");
    wrap.className = "charts";

    wrap.appendChild(buildPieRegions());
    wrap.appendChild(buildBarTypeGroups());
    wrap.appendChild(buildTimelineDecades());
    wrap.appendChild(buildBarCountries());
    wrap.appendChild(buildHeatmapRegionSubject());
    wrap.appendChild(buildStackedTierVerification());

    return wrap;
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

    const card = chartCard("التوزيع الإقليمي", "النسبة المئوية للكيانات في كل إقليم", svg + `<div class="chart-legend">${legend}</div>`);
    bindChartInteractions(card, "region");
    return card;
  }

  // ============================================================
  // 16. مخطط أعمدة: مجموعات الأنواع
  // ============================================================

  function buildBarTypeGroups() {
    const counts = new Map();
    state.entities.forEach((e) => {
      if (e.type_group) counts.set(e.type_group, (counts.get(e.type_group) || 0) + 1);
    });
    const data = Array.from(counts.entries())
      .map(([tg, count]) => ({ tg, count, color: PALETTE_TYPE_GROUPS[tg] || "#888" }))
      .sort((a, b) => b.count - a.count);

    // أفقي: التسمية يسار، الشريط في الوسط، الرقم يمين
    const w = 480;
    const rowH = 32, gap = 6;
    const h = data.length * (rowH + gap) + 20;
    const padTop = 10, padBottom = 10;
    const padStart = 110, padEnd = 50;
    const max = Math.max(...data.map((d) => d.count));
    const chartW = w - padStart - padEnd;

    let svg = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="أنواع الكيانات">`;
    data.forEach((d, i) => {
      const y = padTop + i * (rowH + gap);
      const barW = (d.count / max) * chartW;
      // التسمية على اليسار (في RTL تظهر يميناً، لكن text-anchor end يجعلها تنتهي قرب الشريط)
      svg += `<text x="${padStart - 8}" y="${y + rowH/2 + 4}" class="chart-axis" text-anchor="end">${escapeHtml(label("type_group", d.tg))}</text>`;
      // الشريط
      svg += `<rect x="${padStart}" y="${y}" width="${barW}" height="${rowH}" fill="${d.color}" class="chart-segment" data-type_group="${d.tg}" data-count="${d.count}" data-label="${escapeHtml(label("type_group", d.tg))}" rx="4"/>`;
      // الرقم في نهاية الشريط
      svg += `<text x="${padStart + barW + 6}" y="${y + rowH/2 + 4}" class="chart-axis" font-weight="700" fill="${d.color}">${d.count}</text>`;
    });
    svg += `</svg>`;

    const card = chartCard("أنواع الكيانات", "9 مجموعات لونية", svg);
    bindChartInteractions(card, "type_group");
    return card;
  }

  // ============================================================
  // 17. خط زمني: العقود
  // ============================================================

  function buildTimelineDecades() {
    const counts = new Map();
    state.entities.forEach((e) => {
      if (e.founded_decade) counts.set(e.founded_decade, (counts.get(e.founded_decade) || 0) + 1);
    });
    // ترتيب تنازلي: الأحدث في الأعلى
    const data = Array.from(counts.entries())
      .map(([dec, count]) => ({ dec, count }))
      .sort((a, b) => parseInt(b.dec) - parseInt(a.dec));

    if (data.length === 0) {
      return chartCard("موجات النشأة", "لا بيانات تاريخ متوفرة", "<p>—</p>");
    }

    const max = Math.max(...data.map((d) => d.count));
    const w = 480;
    const rowH = 22, gap = 4;
    const h = data.length * (rowH + gap) + 20;
    const padTop = 10, padBottom = 10;
    const padStart = 60, padEnd = 50;
    const chartW = w - padStart - padEnd;

    let svg = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="موجات النشأة عبر العقود">`;
    data.forEach((d, i) => {
      const y = padTop + i * (rowH + gap);
      const barW = (d.count / max) * chartW;
      svg += `<text x="${padStart - 8}" y="${y + rowH/2 + 4}" class="chart-axis" text-anchor="end" font-weight="600">${d.dec}</text>`;
      svg += `<rect x="${padStart}" y="${y}" width="${barW}" height="${rowH}" fill="var(--color-primary)" class="chart-segment" data-founded_decade="${d.dec}" data-count="${d.count}" data-label="عقد ${d.dec}" rx="3"/>`;
      svg += `<text x="${padStart + barW + 6}" y="${y + rowH/2 + 4}" class="chart-axis" font-weight="700" fill="var(--color-primary)">${d.count}</text>`;
    });
    svg += `</svg>`;

    const card = chartCard("موجات النشأة", `${data[0].dec} (الأحدث) ← ${data[data.length-1].dec}`, svg);
    bindChartInteractions(card, "founded_decade");
    return card;
  }

  // ============================================================
  // 18. أعمدة أفقية: أعلى الدول
  // ============================================================

  function buildBarCountries() {
    const counts = new Map();
    state.entities.forEach((e) => {
      if (e.country) counts.set(e.country, (counts.get(e.country) || 0) + 1);
    });
    const data = Array.from(counts.entries())
      .map(([c, count]) => ({ c, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    const max = data[0].count;
    const w = 480;
    const rowH = 26, gap = 4;
    const h = data.length * (rowH + gap) + 20;
    const padTop = 10, padBottom = 10;
    const padStart = 140, padEnd = 50;          // مساحة أكبر للأسماء الطويلة (الإمارات، المملكة المتحدة، الولايات المتحدة، جنوب أفريقيا)
    const chartW = w - padStart - padEnd;

    let svg = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="أعلى 15 دولة بعدد الكيانات">`;
    data.forEach((d, i) => {
      const y = padTop + i * (rowH + gap);
      const barW = (d.count / max) * chartW;
      svg += `<text x="${padStart - 8}" y="${y + rowH/2 + 4}" class="chart-axis" text-anchor="end">${escapeHtml(label("country", d.c))}</text>`;
      svg += `<rect x="${padStart}" y="${y}" width="${barW}" height="${rowH}" fill="var(--color-accent)" class="chart-segment" data-country="${d.c}" data-count="${d.count}" data-label="${escapeHtml(label("country", d.c))}" rx="3"/>`;
      svg += `<text x="${padStart + barW + 6}" y="${y + rowH/2 + 4}" class="chart-axis" font-weight="700" fill="var(--color-accent-dark)">${d.count}</text>`;
    });
    svg += `</svg>`;

    const card = chartCard("أعلى 15 دولة", "حسب عدد الكيانات", svg);
    bindChartInteractions(card, "country");
    return card;
  }

  // ============================================================
  // 19. خريطة حرارية: إقليم × موضوع
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

    const grid = regions.map((reg) => {
      return topSubjects.map((sub) => {
        const count = state.entities.filter((e) =>
          e.region === reg && (e.subjects || []).includes(sub)
        ).length;
        return { region: reg, subject: sub, count };
      });
    });

    const maxCount = Math.max(...grid.flat().map((c) => c.count), 1);
    const cellSize = 50;
    const padStart = 200, padTop = 50, padBottom = 20, padEnd = 20;
    const cols = topSubjects.length;
    const rows = regions.length;
    const w = padStart + cols * cellSize + padEnd;
    const h = padTop + rows * cellSize + padBottom;

    let svg = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="الخريطة الحرارية: الإقليم × الموضوع">`;

    // ترميز رقمي للأعمدة (1-10) لتجنّب التداخل
    topSubjects.forEach((sub, j) => {
      const x = padStart + j * cellSize + cellSize / 2;
      const y = padTop - 20;
      svg += `<text x="${x}" y="${y}" class="chart-axis" text-anchor="middle" font-weight="700" font-size="13" fill="var(--color-primary)">${j + 1}</text>`;
    });
    // labels الصفوف (أقاليم)
    regions.forEach((reg, i) => {
      const x = padStart - 10;
      const y = padTop + i * cellSize + cellSize / 2 + 4;
      svg += `<text x="${x}" y="${y}" class="chart-axis" text-anchor="end" font-size="12" font-weight="600">${escapeHtml(label("region", reg))}</text>`;
    });
    // الخلايا
    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        const x = padStart + j * cellSize;
        const y = padTop + i * cellSize;
        const intensity = cell.count / maxCount;
        const fill = intensity === 0
          ? "var(--color-bg-muted)"
          : `rgba(10, 77, 104, ${0.15 + intensity * 0.75})`;
        svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${fill}" class="heatmap-cell" data-region="${cell.region}" data-subjects="${cell.subject}" data-count="${cell.count}" data-label="${escapeHtml(label("region", cell.region))} × ${escapeHtml(label("subjects", cell.subject))}"/>`;
        if (cell.count > 0) {
          const textColor = intensity > 0.5 ? "#fff" : "var(--color-text)";
          svg += `<text x="${x + cellSize/2}" y="${y + cellSize/2 + 5}" font-size="14" text-anchor="middle" fill="${textColor}" font-family="var(--font-mono)" font-weight="700" pointer-events="none">${cell.count}</text>`;
        }
      });
    });
    svg += `</svg>`;

    // مفتاح الترقيم تحت المخطط
    const numberLegend = `
      <div class="chart-legend" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); display: grid;">
        ${topSubjects.map((sub, i) => `
          <span class="chart-legend__item" data-subjects="${sub}" title="${escapeHtml(label("subjects", sub))}">
            <span style="display: inline-flex; align-items: center; justify-content: center; inline-size: 22px; block-size: 22px; background: var(--color-primary); color: #fff; border-radius: 50%; font-size: 11px; font-weight: 700; font-family: var(--font-mono);">${i + 1}</span>
            ${escapeHtml(label("subjects", sub))}
          </span>
        `).join("")}
      </div>
    `;

    const card = chartCard("الخريطة الحرارية: إقليم × موضوع", "تقاطع 6 أقاليم مع أعلى 10 موضوعات (الأرقام في الجدول تطابق الموضوعات أسفله)", svg + numberLegend, true);
    // تفاعلية مزدوجة: ينقل لتبويب الكيانات مع فلترين معاً
    card.querySelectorAll("[data-region][data-subjects]").forEach((cell) => {
      const count = parseInt(cell.dataset.count, 10);
      if (count === 0) return;
      cell.addEventListener("mouseenter", (e) => showTooltip(cell.dataset.label, `${count} كياناً`, e));
      cell.addEventListener("mousemove", moveTooltip);
      cell.addEventListener("mouseleave", hideTooltip);
      cell.addEventListener("click", () => {
        const tabs = Array.from(document.querySelectorAll(".tab"));
        const panels = Array.from(document.querySelectorAll(".panel"));
        activateTab("entities", tabs, panels);
        safeSetItem(STORAGE_KEY, "entities");
        clearAllFilters();
        addFilter("region", cell.dataset.region);
        addFilter("subjects", cell.dataset.subjects);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
    return card;
  }

  // ============================================================
  // 20. مصفوفة: مستوى الإدراج × درجة التحقق
  // ============================================================

  function buildStackedTierVerification() {
    const tiers = ["core", "borderline", "below_threshold"];
    const verifs = ["field_verified", "desk_verified", "needs_verification", "unverifiable"];
    const matrix = tiers.map((t) => verifs.map((v) =>
      state.entities.filter((e) => e.inclusion_tier === t && e.verification === v).length
    ));

    const w = 480, h = 280;
    const padTop = 16, padBottom = 60, padStart = 60, padEnd = 16;
    const chartH = h - padTop - padBottom;
    const chartW = w - padStart - padEnd;
    const barW = chartW / tiers.length * 0.7;
    const step = chartW / tiers.length;

    const totals = matrix.map((row) => row.reduce((a, b) => a + b, 0));
    const max = Math.max(...totals);

    let svg = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="مستوى الإدراج × درجة التحقق">`;
    for (let i = 0; i <= 4; i++) {
      const y = padTop + (chartH / 4) * i;
      const val = Math.round(max - (max / 4) * i);
      svg += `<line x1="${padStart}" y1="${y}" x2="${w - padEnd}" y2="${y}" class="chart-grid-line"/>`;
      svg += `<text x="${padStart - 4}" y="${y + 3}" class="chart-axis" text-anchor="end">${val}</text>`;
    }

    tiers.forEach((tier, i) => {
      const x = padStart + step * i + (step - barW) / 2;
      let cumY = padTop + chartH;
      matrix[i].forEach((count, j) => {
        if (count === 0) return;
        const segH = (count / max) * chartH;
        cumY -= segH;
        svg += `<rect x="${x}" y="${cumY}" width="${barW}" height="${segH}" fill="${PALETTE_VERIFICATION[verifs[j]]}" class="chart-segment" data-inclusion_tier="${tier}" data-verification="${verifs[j]}" data-count="${count}" data-label="${escapeHtml(label("inclusion_tier", tier))} + ${escapeHtml(label("verification", verifs[j]))}"/>`;
      });
      // الإجمالي على القمة
      svg += `<text x="${x + barW/2}" y="${padTop + chartH - (totals[i] / max) * chartH - 4}" class="chart-axis" text-anchor="middle" font-weight="700" fill="var(--color-primary)">${totals[i]}</text>`;
      // التسمية تحت
      svg += `<text x="${x + barW/2}" y="${padTop + chartH + 16}" class="chart-axis" text-anchor="middle">${escapeHtml(label("inclusion_tier", tier))}</text>`;
    });
    svg += `</svg>`;

    const legend = verifs.map((v) => `
      <span class="chart-legend__item">
        <span class="chart-legend__swatch" style="background:${PALETTE_VERIFICATION[v]}"></span>
        ${escapeHtml(label("verification", v))}
      </span>
    `).join("");

    const card = chartCard("الإدراج × التحقق", "تقاطع مستوى التخصص مع جودة البيانات", svg + `<div class="chart-legend">${legend}</div>`);
    bindChartInteractions(card, null); // تفاعل مخصص أدناه
    card.querySelectorAll(".chart-segment").forEach((seg) => {
      const count = parseInt(seg.dataset.count, 10);
      seg.addEventListener("mouseenter", (e) => showTooltip(seg.dataset.label, `${count} كياناً`, e));
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

  function chartCard(title, subtitle, bodyHtml, wide = false) {
    const card = document.createElement("div");
    card.className = "chart-card" + (wide ? " chart-card--wide" : "");
    card.innerHTML = `
      <div class="chart-card__header">
        <h3 class="chart-card__title">${escapeHtml(title)}</h3>
        <span class="chart-card__subtitle">${escapeHtml(subtitle)}</span>
      </div>
      <div class="chart-card__body">${bodyHtml}</div>
    `;
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
        nav.querySelectorAll("button").forEach((x) => x.classList.toggle("is-active", x === b));
      });
    });
    // الافتراضي
    const activeName = document.querySelector(".tab.is-active")?.dataset.tab;
    if (activeName) {
      const btn = nav.querySelector(`[data-tab="${activeName}"]`);
      if (btn) btn.classList.add("is-active");
    }
  }

  // === زر فلاتر للموبايل ===
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
    `;
    header.appendChild(actions);
    actions.querySelector(".theme-toggle").addEventListener("click", toggleTheme);
    actions.querySelector("#search-trigger").addEventListener("click", openSearchOverlay);
    actions.querySelector("#share-trigger").addEventListener("click", shareLink);
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

  // === تشغيل وحدات المرحلة 8 ===
  function bootPhase8() {
    initDarkMode();
    injectHeaderActions();
    initKeyboardShortcuts();
    if (window.innerWidth <= 720) {
      initMobileNav();
      initMobileFiltersToggle();
    }
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

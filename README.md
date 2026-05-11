# موسوعة السيرة النبوية — البوابة المؤسسية

مشروع لرصد وتشخيص الكيانات المتخصصة في خدمة السيرة النبوية على مستوى العالم، ينتهي ببوابة HTML تفاعلية موحّدة.

## بنية المشروع

```
seerah-encyclopedia/
├── README.md            ← هذا الملف (مدخل للقارئ البشري)
├── CLAUDE.md            ← تعليمات تنتقل تلقائياً لأي جلسة Claude في هذا المجلد
├── sources/             ← البيانات المصدرية (للقراءة فقط)
│   ├── manifest.json    ← فهرس برمجي للجولات السبع
│   └── round-NN-*.md    ← ملفات الجولات
├── data.json            ← (سيُنشأ) بطاقات الكيانات المستخرجة
├── index.html           ← (سيُنشأ) البوابة التفاعلية
└── assets/              ← (سيُنشأ) خطوط وأيقونات
```

## فهرس الجولات المصدرية

| الرقم | النطاق الجغرافي | الملف | عدد الكيانات |
|-------|-----------------|-------|--------------|
| 01 | الجزيرة العربية | [`sources/round-01-arabia.md`](sources/round-01-arabia.md) | 52 |
| 02 | بلاد الشام والعراق ووادي النيل | [`sources/round-02-levant-iraq-nile.md`](sources/round-02-levant-iraq-nile.md) | 46 |
| 03 | المغرب العربي | [`sources/round-03-maghreb.md`](sources/round-03-maghreb.md) | 45 |
| 04 | تركيا | [`sources/round-04-turkey.md`](sources/round-04-turkey.md) | 62 |
| 05 | العالم الإسلامي غير العربي | [`sources/round-05-non-arab-muslim.md`](sources/round-05-non-arab-muslim.md) | 63 |
| 06 | الاستشراق الأكاديمي الغربي | [`sources/round-06-western.md`](sources/round-06-western.md) | 96 (+22 تحت العتبة، +7 تعذّر التحقق) |
| 07-أ | تركيب شامل للجولات الست | [`sources/round-07a-synthesis.md`](sources/round-07a-synthesis.md) | — |

**الإجمالي وفق تقرير الجولة 7-أ:** 391 كياناً (سيُعاد عدّها عند استخراج البطاقات).

## اصطلاح تسمية ملفات الجولات

```
round-NN-region-slug.md
```

- `NN` رقم بصفرين (`01`–`06`، أو `07a`).
- `region-slug` معرّف ASCII مختصر.
- امتداد واحد `.md`.

## مصدر الحقيقة البرمجي

[`sources/manifest.json`](sources/manifest.json) يفهرس الجولات بحقول قابلة للقراءة الآلية (`id`, `file`, `title_ar`, `region_ar`, `region_en`, `entityCount`). عند إضافة أو تعديل أي جولة، حدّث `manifest.json` بالتزامن مع الملف.

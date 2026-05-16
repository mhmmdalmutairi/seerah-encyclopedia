#!/usr/bin/env python3
"""Build the 3-page Arabic strategic brief as a Word document."""

from docx import Document
from docx.shared import Pt, RGBColor, Cm, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.enum.table import WD_ALIGN_VERTICAL
from docx.oxml.ns import qn
from docx.oxml import OxmlElement


def set_rtl(paragraph):
    """Set paragraph to RTL Arabic."""
    pPr = paragraph._p.get_or_add_pPr()
    bidi = OxmlElement('w:bidi')
    bidi.set(qn('w:val'), '1')
    pPr.append(bidi)
    paragraph.alignment = WD_ALIGN_PARAGRAPH.RIGHT


def set_cell_rtl(cell):
    for p in cell.paragraphs:
        set_rtl(p)


def add_heading(doc, text, level=1, color=(10, 77, 104)):
    p = doc.add_paragraph()
    set_rtl(p)
    run = p.add_run(text)
    run.font.name = 'IBM Plex Sans Arabic'
    rPr = run._element.get_or_add_rPr()
    rFonts = rPr.find(qn('w:rFonts'))
    if rFonts is None:
        rFonts = OxmlElement('w:rFonts')
        rPr.append(rFonts)
    rFonts.set(qn('w:cs'), 'IBM Plex Sans Arabic')
    rFonts.set(qn('w:hAnsi'), 'IBM Plex Sans Arabic')
    if level == 1:
        run.font.size = Pt(18)
    elif level == 2:
        run.font.size = Pt(15)
    else:
        run.font.size = Pt(13)
    run.bold = True
    run.font.color.rgb = RGBColor(*color)
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(6)
    return p


def add_para(doc, text, bold=False, size=11, color=(58, 58, 58)):
    p = doc.add_paragraph()
    set_rtl(p)
    run = p.add_run(text)
    run.font.name = 'IBM Plex Sans Arabic'
    rPr = run._element.get_or_add_rPr()
    rFonts = rPr.find(qn('w:rFonts'))
    if rFonts is None:
        rFonts = OxmlElement('w:rFonts')
        rPr.append(rFonts)
    rFonts.set(qn('w:cs'), 'IBM Plex Sans Arabic')
    run.font.size = Pt(size)
    run.bold = bold
    run.font.color.rgb = RGBColor(*color)
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.ONE_POINT_FIVE
    p.paragraph_format.space_after = Pt(6)
    return p


def add_bullet(doc, text, size=11):
    p = doc.add_paragraph(style='List Bullet')
    set_rtl(p)
    run = p.add_run(text)
    run.font.name = 'IBM Plex Sans Arabic'
    rPr = run._element.get_or_add_rPr()
    rFonts = rPr.find(qn('w:rFonts'))
    if rFonts is None:
        rFonts = OxmlElement('w:rFonts')
        rPr.append(rFonts)
    rFonts.set(qn('w:cs'), 'IBM Plex Sans Arabic')
    run.font.size = Pt(size)
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
    p.paragraph_format.space_after = Pt(3)


def add_table(doc, header_row, rows, col_widths_cm=None):
    table = doc.add_table(rows=1 + len(rows), cols=len(header_row))
    table.style = 'Light Grid Accent 1'
    # Header
    for i, h in enumerate(header_row):
        cell = table.rows[0].cells[i]
        cell.text = ''
        p = cell.paragraphs[0]
        set_rtl(p)
        r = p.add_run(h)
        r.bold = True
        r.font.name = 'IBM Plex Sans Arabic'
        rPr = r._element.get_or_add_rPr()
        rFonts = rPr.find(qn('w:rFonts'))
        if rFonts is None:
            rFonts = OxmlElement('w:rFonts')
            rPr.append(rFonts)
        rFonts.set(qn('w:cs'), 'IBM Plex Sans Arabic')
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(255, 255, 255)
        # Cell shading
        tcPr = cell._tc.get_or_add_tcPr()
        shd = OxmlElement('w:shd')
        shd.set(qn('w:fill'), '0A4D68')
        tcPr.append(shd)
    # Rows
    for ri, row in enumerate(rows, start=1):
        for ci, v in enumerate(row):
            cell = table.rows[ri].cells[ci]
            cell.text = ''
            p = cell.paragraphs[0]
            set_rtl(p)
            r = p.add_run(v)
            r.font.name = 'IBM Plex Sans Arabic'
            rPr = r._element.get_or_add_rPr()
            rFonts = rPr.find(qn('w:rFonts'))
            if rFonts is None:
                rFonts = OxmlElement('w:rFonts')
                rPr.append(rFonts)
            rFonts.set(qn('w:cs'), 'IBM Plex Sans Arabic')
            r.font.size = Pt(10)

    if col_widths_cm:
        for i, w in enumerate(col_widths_cm):
            for row in table.rows:
                row.cells[i].width = Cm(w)
    return table


def set_table_rtl(table):
    """Apply RTL to table — reverses column order in display."""
    tblPr = table._tbl.tblPr
    bidi = OxmlElement('w:bidiVisual')
    bidi.set(qn('w:val'), '1')
    tblPr.append(bidi)


def add_callout(doc, text, fill='FEF3C7', accent='D97706'):
    """Add a colored callout box."""
    table = doc.add_table(rows=1, cols=1)
    table.autofit = False
    cell = table.rows[0].cells[0]
    cell.text = ''
    p = cell.paragraphs[0]
    set_rtl(p)
    r = p.add_run(text)
    r.font.name = 'IBM Plex Sans Arabic'
    rPr = r._element.get_or_add_rPr()
    rFonts = rPr.find(qn('w:rFonts'))
    if rFonts is None:
        rFonts = OxmlElement('w:rFonts')
        rPr.append(rFonts)
    rFonts.set(qn('w:cs'), 'IBM Plex Sans Arabic')
    r.font.size = Pt(11)
    r.bold = True
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:fill'), fill)
    tcPr.append(shd)
    return table


# =====================================================
# Document
# =====================================================

doc = Document()

# Page margins (compact)
for s in doc.sections:
    s.left_margin = Cm(2.0)
    s.right_margin = Cm(2.0)
    s.top_margin = Cm(1.8)
    s.bottom_margin = Cm(1.8)

# Title
title = doc.add_paragraph()
set_rtl(title)
r = title.add_run('مشروع مركز السيرة النبوية الجامع')
r.font.name = 'IBM Plex Sans Arabic'
rPr = r._element.get_or_add_rPr()
rFonts = OxmlElement('w:rFonts')
rFonts.set(qn('w:cs'), 'IBM Plex Sans Arabic')
rPr.append(rFonts)
r.font.size = Pt(22)
r.bold = True
r.font.color.rgb = RGBColor(10, 77, 104)
title.alignment = WD_ALIGN_PARAGRAPH.CENTER
title.paragraph_format.space_after = Pt(0)

subtitle = doc.add_paragraph()
set_rtl(subtitle)
r = subtitle.add_run('تشخيص استراتيجي على أوسع مسح عالمي لحقل السيرة')
r.font.name = 'IBM Plex Sans Arabic'
rPr = r._element.get_or_add_rPr()
rFonts = OxmlElement('w:rFonts')
rFonts.set(qn('w:cs'), 'IBM Plex Sans Arabic')
rPr.append(rFonts)
r.font.size = Pt(13)
r.font.color.rgb = RGBColor(195, 155, 92)
subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
subtitle.paragraph_format.space_after = Pt(14)

# =====================================================
# الصفحة 1: لا يوجد نظير
# =====================================================

add_heading(doc, '١. لا يوجد كيان مماثل في العالم', level=1)

add_callout(doc,
    'بعد مسح 472 كياناً متخصصاً بخدمة السيرة في 52 دولة عبر 20 جولة بحثية '
    '(2025–2026)، لا يوجد كيان واحد يَجمع الشمول والتكامل الذي تَقترحه هذه '
    'الوثيقة: منصة جامعة + موسوعة موضوعية أخلاقية + جامع للنصوص + أطلس تفاعلي '
    '+ قسم طفل + إنجليزي + بحثي + شبهات وردود — في كيان واحد لنفس الجمهور.',
    fill='FEF3C7', accent='D97706')

add_heading(doc, 'سعة المسح ودقّته', level=2)

scope_rows = [
    ['الكيانات المرصودة', '472 (436 جوهري + 34 ثانوي + 2 فجوة موثَّقة)'],
    ['الدول المغطّاة', '52 دولة عبر 7 أقاليم'],
    ['الجولات البحثية', '20 جولة موثَّقة (2025–2026)، منها 3 موجات استقراء شامل'],
    ['متوسط جودة الكيان', '86.6 / 100 — صفر كيان تحت 60'],
    ['نسبة التحقُّق المكتبي', '92.2% بزيارة الموقع الرسمي + المصدر'],
    ['حقول البطاقة', '35 حقلًا منضبطة بمخطّط JSON Schema'],
    ['حقول مكتملة بـ100%', '14 حقلًا (هوية، نوع، إقليم، تخصص، منهجية…)'],
    ['التدقيق الآلي', 'مدقّق يَمنع أي خطأ قبل النشر؛ pre-commit + CI'],
    ['الترخيص', 'مفتوح المصدر (CC BY 4.0) — قابل للتحقّق من أي طرف'],
]
t = add_table(doc, ['المؤشّر', 'القيمة'], scope_rows, col_widths_cm=[5, 11])
set_table_rtl(t)

add_heading(doc, 'أقرب النظراء — ولا يَكتمل أيّهم', level=2)
peers_rows = [
    ['وقف السيرة التركي (Siyer Vakfı)', 'منصة + معهد + نشر — لكن باللغة التركية، وبلا قسم موضوعي أخلاقي'],
    ['دار الرسول الأعظم العراقية', 'قوي شيعي إمامي، يَفتقد البُعد الأمميّ السنّي'],
    ['الهيئة العالمية للتعريف بالرسول (الرابطة)', 'تَعريف بـ8 لغات لكن بلا موسوعية موضوعية تطبيقية'],
    ['لجنة الموسوعة المصرية للسنة (2024)', 'ناشئة، تَركز على السنة لا السيرة، حكومية مصرية'],
    ['موسوعة العاملي «الصحيح من سيرة النبي الأعظم» (35 مجلد)', 'شيعي، تأريخي روائي، لا موضوعي أخلاقي'],
]
t = add_table(doc, ['الكيان النظير', 'الفجوة التي يَتركها'], peers_rows, col_widths_cm=[6, 10])
set_table_rtl(t)

doc.add_page_break()

# =====================================================
# الصفحة 2: ما لا يخدمه أحد
# =====================================================

add_heading(doc, '٢. ما لا يَخدمه أحد — أكبر فُرَص المشروع', level=1)

add_para(doc, 'خمس فجوات بنيوية موثَّقة بالبيانات، كلٌّ منها تَستحق منتجاً قائماً بذاته. أيّ مشروع يَطمح للأمميّة يَنبغي أن يُموضع نفسه على هذه الفجوات تَحديداً.', size=11)

gap1 = (
    '(١) الموسوعة الموضوعية الأخلاقية التطبيقية — أكبر فجوة في الحقل\n'
    'لا يوجد كيان واحد يُقدّم موسوعة موضوعية للسيرة: الإدارة النبوية للزواج، '
    'فرق العمل، التربية، إدارة الأزمات، التواصل الاجتماعي، الأخلاق الاقتصادية. '
    'أقرب الموجود (سلسلة بنت الشاطئ عن سيدات بيت النبوة، 5 مجلدات) جزئيّ. '
    'هذه — بشهادة البيانات — أكبر إضافة مَمكنة في الحقل عالمياً.'
)
add_callout(doc, gap1, fill='DCFCE7', accent='15803D')

gap2 = (
    '(٢) منهج «السيرة من كامل السنة» — لا نظير منهجياً\n'
    'الوثيقة تَقترح جمع نصوص السيرة من جميع كتب السنة (الجوامع والصحاح والسنن '
    'والمسانيد والأجزاء) ثم تَصنيفها زمنياً ومَوضوعياً. مَنهج لم يَقم به كيان '
    'بهذا الشمول في الـ472 كياناً. أقرب نظير: موسوعة العاملي الشيعية بمنهج روائي '
    'مختلف. هذا الجمع المنهجي = الإضافة الأكاديمية الكبرى.'
)
add_callout(doc, gap2, fill='DCFCE7', accent='15803D')

gap3 = (
    '(٣) الأطلس التفاعلي ثلاثي الأبعاد للسيرة على الويب\n'
    'الموجود: الأطلس الدارة السعودي (PDF ساكن)، SirahMaps (محدود بمكة)، '
    'ديوراما إسطنبول (فيزيائي). التفاعلية الرقمية ثلاثية الأبعاد للسيرة '
    '(بيت خديجة → غار حراء → داخل الغار → نزول الوحي) لا نظير لها.'
)
add_callout(doc, gap3, fill='DCFCE7', accent='15803D')

gap4 = (
    '(٤) قناة سيرة تلفزيونية مَكرَّسة عالمياً\n'
    'بعد فحص 472 كياناً: لا توجد قناة تلفزيونية واحدة في العالم مَكرَّسة '
    'كلّياً للسيرة. الأقرب: قناة السنة السعودية (سيرة جزئية). فجوة سوقية '
    'مُؤكَّدة، خاصة في صيغة OTT (الإنترنت) لا البث التقليدي.'
)
add_callout(doc, gap4, fill='DCFCE7', accent='15803D')

gap5 = (
    '(٥) المنظومة العربية-الإنجليزية المتكاملة\n'
    'الفضاء الإنجليزي للسيرة قوي (Yaqeen, AlMaghrib, Cambridge Muslim '
    'College) لكنّه مستقل تماماً عن الفضاء العربي. لا توجد منصة عربية-'
    'إنجليزية بمنهج موحَّد. الترجمة وحدها لا تَكفي — يَلزم منهج مُصاغ من '
    'البداية ثنائي اللسان.'
)
add_callout(doc, gap5, fill='DCFCE7', accent='15803D')

doc.add_page_break()

# =====================================================
# الصفحة 3: شراكات
# =====================================================

add_heading(doc, '٣. الشراكات الاستراتيجية المقترَحة', level=1)

add_para(doc,
    'البيانات تَكشف 15 كياناً يَستحق التعامل المُمنهج، مُصنَّفة في ثلاث فئات '
    'بحسب طبيعة التعاون.', size=11)

add_heading(doc, 'فئة أ — شراكات تَكاملية (مشاركة في البنية الأكاديمية)', level=2, color=(21, 128, 61))
cat_a = [
    ['وقف السيرة التركي', 'تركيا', 'تَبادل المنهجية، نموذج الحوكمة، ترجمة الإنتاج'],
    ['كرسي ابن باز للسيرة (الجامعة الإسلامية بالمدينة)', 'السعودية', 'اعتماد أكاديمي + إشراف بحثي على الإصدارات'],
    ['لجنة الموسوعة المصرية للسنة (المجلس الأعلى)', 'مصر', 'تَوزيع أدوار: هم السنة، نحن السيرة الموضوعية'],
    ['مجمع الملك سلمان للحديث النبوي (المدينة)', 'السعودية', 'تَحقيق نصوص السيرة من كامل السنة'],
    ['دار المصطفى تريم (الحبيب عمر بن حفيظ)', 'اليمن', 'قسم الحديث الصوفي + نموذج التأثير المعنوي'],
]
t = add_table(doc, ['الكيان', 'البلد', 'طبيعة الشراكة'], cat_a, col_widths_cm=[5.5, 1.8, 8.7])
set_table_rtl(t)

add_heading(doc, 'فئة ب — شراكات إنتاج (محتوى مشترك)', level=2, color=(180, 134, 11))
cat_b = [
    ['Yaqeen Institute', 'الولايات المتحدة', 'محتوى إنجليزي مشترك + شهادات قَصيرة للموسوعة الموضوعية'],
    ['AlMaghrib Institute', 'كندا/المملكة المتحدة', 'دورات إنجليزية تَعتمد المنهجية + برامج معتمَدة'],
    ['لجنة السيرة الوطنية البنغلاديشية', 'بنغلاديش', 'الترجمة البنغالية + توقيع شراكة أمميّة (153 مليون مسلم)'],
    ['Diyanet TV', 'تركيا', 'إنتاج تلفزيوني، خاصة برامج «السيرة في أسبوعها»'],
    ['الكراسي العلمية السعودية (الطب النبوي KAU وPSAU)', 'السعودية', 'تَخصص فرعي: الإنتاج المشترك في «الطب النبوي التطبيقي»'],
]
t = add_table(doc, ['الكيان', 'البلد', 'طبيعة الشراكة'], cat_b, col_widths_cm=[5.5, 2.5, 8])
set_table_rtl(t)

add_heading(doc, 'فئة ج — شراكات مرجعية (الاستئناس بالتجربة)', level=2, color=(120, 53, 15))
cat_c = [
    ['مركز ابن القطان لتحقيق التراث', 'المغرب', 'نموذج التحقيق الكلاسيكي للنصوص'],
    ['المعرض والمتحف الدولي للسيرة (الرابطة - المدينة)', 'السعودية', 'نموذج المتحف التفاعلي'],
    ['مهرجان مولد لامو السنوي', 'كينيا', 'نموذج التفاعل الجماهيري الإفريقي'],
    ['مجلة International Journal of Islamic and Complementary Medicine', 'إندونيسيا', 'نموذج المجلة المحكَّمة في تَخصُّص فرعي'],
    ['IslamHouse + Dorar.net (قسم السيرة)', 'السعودية', 'نموذج الأرشيف الرقمي المتاح بـ8 لغات'],
]
t = add_table(doc, ['الكيان', 'البلد', 'الدرس المرجعي'], cat_c, col_widths_cm=[5.5, 2.5, 8])
set_table_rtl(t)

# الخلاصة
add_heading(doc, 'الخلاصة', level=2, color=(10, 77, 104))
add_callout(doc,
    'المشروع يَدخل حقلاً نشطاً، لكنه ليس مُكتظّاً في النقاط الجوهرية. '
    'الإضافة الأقوى = الموضوعية الأخلاقية التطبيقية + الجمع المنهجي من '
    'كامل السنة. التوقيت حرج: اللجنة المصرية ستُكمل موسوعتها للسنة في '
    '3–5 سنوات. التَخصُّص قبل الانتشار، الشراكة قبل المنافسة، الإطلاق قبل '
    'الكَمال.', fill='FEE2E2', accent='B91C1C')

# Save
out = '/Users/mhmd/Documents/seerah-encyclopedia/مشروع_السيرة_تشخيص_استراتيجي.docx'
doc.save(out)
print(f"✓ Saved: {out}")
import os
print(f"  Size: {os.path.getsize(out):,} bytes")

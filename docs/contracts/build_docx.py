#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Build a print-ready .docx for the Token service contract.

Renders docs/contracts/token-service-contract.zh.md with Chinese contract
typography: A4, 宋体 五号正文, 1.5 倍行距, 黑体标题, 悬挂缩进条款, 固定列宽
表格 + 重复表头, 页眉页脚页码, 封面页, 附件分页.

Usage:  python docs/contracts/build_docx.py
"""
import io
import os
import re

import docx
from docx.enum.table import WD_ALIGN_VERTICAL, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

HERE = os.path.dirname(os.path.abspath(__file__))
MD = os.path.join(HERE, "token-service-contract.zh.md")
ANNEX_MD = os.path.join(HERE, "token-service-contract.zh.annex.md")
OUT = os.path.join(HERE, "token-service-contract.zh.docx")
ANNEX_OUT = os.path.join(HERE, "token-service-contract.zh.annex.docx")

BODY_FONT = "宋体"
HEAD_FONT = "黑体"
BODY_PT = 11          # 五号
INK = RGBColor(0, 0, 0)
GRAY = RGBColor(0x55, 0x55, 0x55)
HAIRLINE = "C0C0C0"
HEAD_FILL = "EFEFEF"
CONTENT_W_CM = 15.8   # A4 21 - 2.6 - 2.6

# Word (OOXML) requires these child elements in a fixed order; a wrong order or
# a duplicated element makes Word silently "repair" the document, which is what
# collapses the table layout.  Keep every insert order-aware.
PPR_ORDER = (
    "pStyle keepNext keepLines pageBreakBefore framePr widowControl numPr"
    " suppressLineNumbers pBdr shd tabs suppressAutoHyphens kinsoku wordWrap"
    " overflowPunct topLinePunct autoSpaceDE autoSpaceDN bidi adjustRightInd"
    " snapToGrid spacing ind contextualSpacing mirrorIndents suppressOverlap jc"
    " textDirection textAlignment textboxTightWrap outlineLvl divId cnfStyle"
    " rPr sectPr pPrChange"
).split()
TBLPR_ORDER = (
    "tblStyle tblpPr tblOverlap bidiVisual tblStyleRowBandSize"
    " tblStyleColBandSize tblW jc tblCellSpacing tblInd tblBorders shd"
    " tblLayout tblCellMar tblLook tblCaption tblDescription"
).split()
TRPR_ORDER = (
    "cnfStyle divId gridBefore gridAfter wBefore wAfter cantSplit trHeight"
    " tblHeader tblCellSpacing jc hidden ins del trPrChange"
).split()
TCPR_ORDER = (
    "cnfStyle tcW gridSpan hMerge vMerge tcBorders shd noWrap tcMar"
    " textDirection tcFitText vAlign hideMark headers cellIns cellDel cellMerge"
    " tcPrChange"
).split()
SECTPR_ORDER = (
    "headerReference footerReference footnotePr endnotePr type pgSz pgMar"
    " paperSrc pgBorders lnNumType pgNumType cols formProt vAlign noEndnote"
    " titlePg textDirection bidi rtlGutter docGrid printerSettings sectPrChange"
).split()


# ------------------------------------------------------------------ utils
def insert_ordered(parent, el, order):
    """Insert `el` into `parent` at the position OOXML requires."""
    tag = el.tag.split("}")[-1]
    idx = order.index(tag)
    for child in parent:
        ctag = child.tag.split("}")[-1]
        if ctag in order and order.index(ctag) > idx:
            child.addprevious(el)
            return el
    parent.append(el)
    return el


def replace_ordered(parent, el, order):
    """Drop any existing element with the same tag, then insert in order."""
    tag = el.tag.split("}")[-1]
    for existing in parent.findall(qn("w:" + tag)):
        parent.remove(existing)
    return insert_ordered(parent, el, order)


def get_or_add_ordered(parent, tagname, order, factory):
    el = parent.find(qn("w:" + tagname))
    if el is None:
        el = factory()
        insert_ordered(parent, el, order)
    return el


def set_font(run, name, size=None, bold=None, color=None):
    run.font.name = name
    rpr = run._element.get_or_add_rPr()
    rf = rpr.find(qn("w:rFonts"))
    if rf is None:
        rf = OxmlElement("w:rFonts")
        rpr.append(rf)
    for attr in ("w:eastAsia", "w:ascii", "w:hAnsi"):
        rf.set(qn(attr), name)
    if size is not None:
        run.font.size = Pt(size)
    if bold is not None:
        run.font.bold = bold
    if color is not None:
        run.font.color.rgb = color


def style_font(style, name, size, bold=None, color=None):
    style.font.name = name
    style.font.size = Pt(size)
    if bold is not None:
        style.font.bold = bold
    if color is not None:
        style.font.color.rgb = color
    rpr = style.element.get_or_add_rPr()
    rf = rpr.find(qn("w:rFonts"))
    if rf is None:
        rf = OxmlElement("w:rFonts")
        rpr.append(rf)
    for attr in ("w:eastAsia", "w:ascii", "w:hAnsi"):
        rf.set(qn(attr), name)


def add_border(paragraph, edge="bottom", sz=8, color=HAIRLINE, space=4):
    ppr = paragraph._p.get_or_add_pPr()
    pbdr = get_or_add_ordered(
        ppr, "pBdr", PPR_ORDER, lambda: OxmlElement("w:pBdr")
    )
    el = OxmlElement("w:" + edge)
    el.set(qn("w:val"), "single")
    el.set(qn("w:sz"), str(sz))
    el.set(qn("w:space"), str(space))
    el.set(qn("w:color"), color)
    pbdr.append(el)


def shade(cell, fill):
    tcpr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), fill)
    replace_ordered(tcpr, shd, TCPR_ORDER)


def table_borders(table, sz=6, color=HAIRLINE):
    tblpr = table._tbl.tblPr
    borders = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        el = OxmlElement("w:" + edge)
        el.set(qn("w:val"), "single")
        el.set(qn("w:sz"), str(sz))
        el.set(qn("w:space"), "0")
        el.set(qn("w:color"), color)
        borders.append(el)
    replace_ordered(tblpr, borders, TBLPR_ORDER)


def table_cell_margins(table, top=50, bottom=50, left=90, right=90):
    tblpr = table._tbl.tblPr
    mar = OxmlElement("w:tblCellMar")
    for edge, val in (("top", top), ("left", left), ("bottom", bottom), ("right", right)):
        el = OxmlElement("w:" + edge)
        el.set(qn("w:w"), str(val))
        el.set(qn("w:type"), "dxa")
        mar.append(el)
    replace_ordered(tblpr, mar, TBLPR_ORDER)


def fixed_layout(table, widths_cm):
    table.autofit = False
    tblpr = table._tbl.tblPr
    layout = OxmlElement("w:tblLayout")
    layout.set(qn("w:type"), "fixed")
    replace_ordered(tblpr, layout, TBLPR_ORDER)
    tblw = OxmlElement("w:tblW")
    tblw.set(qn("w:w"), str(int(sum(widths_cm) * 567)))
    tblw.set(qn("w:type"), "dxa")
    replace_ordered(tblpr, tblw, TBLPR_ORDER)
    grid = table._tbl.find(qn("w:tblGrid"))
    if grid is not None:
        for i, gc in enumerate(grid.findall(qn("w:gridCol"))):
            if i < len(widths_cm):
                gc.set(qn("w:w"), str(int(widths_cm[i] * 567)))
    for row in table.rows:
        for i, cell in enumerate(row.cells):
            if i < len(widths_cm):
                cell.width = Cm(widths_cm[i])


def repeat_header(row):
    trpr = row._tr.get_or_add_trPr()
    el = OxmlElement("w:tblHeader")
    el.set(qn("w:val"), "true")
    replace_ordered(trpr, el, TRPR_ORDER)


def cant_split(row):
    trpr = row._tr.get_or_add_trPr()
    el = OxmlElement("w:cantSplit")
    el.set(qn("w:val"), "true")
    replace_ordered(trpr, el, TRPR_ORDER)


def add_field(paragraph, instr, result="1"):
    run = paragraph.add_run()
    b = OxmlElement("w:fldChar"); b.set(qn("w:fldCharType"), "begin")
    it = OxmlElement("w:instrText"); it.set(qn("xml:space"), "preserve"); it.text = instr
    s = OxmlElement("w:fldChar"); s.set(qn("w:fldCharType"), "separate")
    t = OxmlElement("w:t"); t.text = result
    e = OxmlElement("w:fldChar"); e.set(qn("w:fldCharType"), "end")
    for el in (b, it, s, t, e):
        run._r.append(el)
    return run


def add_body_page_total(paragraph):
    """Emit `= { NUMPAGES } - 1` so the unnumbered cover is excluded from the total.

    A flat `NUMPAGES` inside a formula field is not substituted — Word needs the
    page count as a nested field.
    """
    run = paragraph.add_run()

    def el(tag, attr=None, val=None, text=None):
        node = OxmlElement(tag)
        if attr:
            node.set(qn(attr), val)
        if text is not None:
            node.text = text
        run._r.append(node)
        return node

    el("w:fldChar", "w:fldCharType", "begin")
    el("w:instrText", "xml:space", "preserve", " = ")
    el("w:fldChar", "w:fldCharType", "begin")
    el("w:instrText", "xml:space", "preserve", " NUMPAGES ")
    el("w:fldChar", "w:fldCharType", "separate")
    el("w:t", text="14")
    el("w:fldChar", "w:fldCharType", "end")
    el("w:instrText", "xml:space", "preserve", " - 1 ")
    el("w:fldChar", "w:fldCharType", "separate")
    el("w:t", text="13")
    el("w:fldChar", "w:fldCharType", "end")
    return run



INLINE = re.compile(r"(\*\*.+?\*\*|`[^`]+`)")


def set_outline(paragraph, level):
    """Give headings a real outline level so Word's navigation pane works."""
    ppr = paragraph._p.get_or_add_pPr()
    el = OxmlElement("w:outlineLvl")
    el.set(qn("w:val"), str(level))
    replace_ordered(ppr, el, PPR_ORDER)


def add_inline(paragraph, text, size=BODY_PT, color=INK, bold=False):
    for chunk in INLINE.split(text):
        if not chunk:
            continue
        if chunk.startswith("**") and chunk.endswith("**"):
            r = paragraph.add_run(chunk[2:-2])
            set_font(r, BODY_FONT, size, True, color)
        elif chunk.startswith("`") and chunk.endswith("`"):
            r = paragraph.add_run(chunk[1:-1])
            set_font(r, "Consolas", size - 1, bold, color)
        else:
            r = paragraph.add_run(chunk)
            set_font(r, BODY_FONT, size, bold, color)


# ------------------------------------------------------------------ parse

def build(md_path, out_path, with_cover=True, skip_cover_title=True):
    global signature_done
    signature_done = False
    with io.open(md_path, encoding="utf-8") as fh:
        src = fh.read().split("\n")

    blocks = []
    i = 0
    while i < len(src):
        s = src[i].strip()
        if not s or s == "---":
            i += 1
            continue
        if s.startswith("# ") and not s.startswith("## "):
            blocks.append(("annex", s[2:].strip()))
            i += 1
            continue
        if s.startswith("## "):
            blocks.append(("clause", s[3:].strip()))
            i += 1
            continue
        if s.startswith("### "):
            blocks.append(("sub", s[4:].strip()))
            i += 1
            continue
        if s.startswith(">"):
            blocks.append(("note", re.sub(r"^>\s*", "", s)))
            i += 1
            continue
        if s.startswith("|"):
            rows = []
            while i < len(src) and src[i].strip().startswith("|"):
                row = src[i].strip()
                if not re.match(r"^\|[\s:\-|]+\|$", row):
                    rows.append([c.strip() for c in row.strip("|").split("|")])
                i += 1
            blocks.append(("table", rows))
            continue
        m = re.match(r"^(\d+)\.\s+(.*)$", s)
        if m:
            blocks.append(("ol", (m.group(1), m.group(2))))
            i += 1
            continue
        if s.startswith("- "):
            blocks.append(("ul", s[2:].strip()))
            i += 1
            continue
        blocks.append(("p", s))
        i += 1


    # ------------------------------------------------------------------ doc
    doc = docx.Document()

    normal = doc.styles["Normal"]
    style_font(normal, BODY_FONT, BODY_PT, False, INK)
    pf = normal.paragraph_format
    pf.line_spacing_rule = WD_LINE_SPACING.ONE_POINT_FIVE
    pf.space_before = Pt(0)
    pf.space_after = Pt(0)
    pf.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

    # snapToGrid is inherited by every paragraph from Normal, so turning it off
    # here stops Word from forcing each line onto the 18pt CJK document grid.
    normal_pPr = normal.element.get_or_add_pPr()
    snap = OxmlElement("w:snapToGrid")
    snap.set(qn("w:val"), "0")
    replace_ordered(normal_pPr, snap, PPR_ORDER)

    sec = doc.sections[0]
    sec.page_width = Cm(21); sec.page_height = Cm(29.7)
    sec.left_margin = Cm(2.6); sec.right_margin = Cm(2.6)
    sec.top_margin = Cm(2.5); sec.bottom_margin = Cm(2.4)
    sec.header_distance = Cm(1.2); sec.footer_distance = Cm(1.2)

    # Doument grid: none.  A stale docGrid from the template makes Word re-flow
    # every Chinese line at a fixed char pitch, which breaks table and indent
    # alignment when the body font size differs from the grid value.
    doc_grid = OxmlElement("w:docGrid")
    doc_grid.set(qn("w:type"), "none")
    doc_grid.set(qn("w:linePitch"), "312")
    replace_ordered(sec._sectPr, doc_grid, SECTPR_ORDER)

    # cover page: no header / footer; the cover counts as page 0 so the first body
    # page prints "第 1 页". The footer total is therefore NUMPAGES - 1.
    if with_cover:
        sec.different_first_page_header_footer = True
        pg_num = OxmlElement("w:pgNumType")
        pg_num.set(qn("w:start"), "0")
        insert_ordered(sec._sectPr, pg_num, SECTPR_ORDER)
        header_text = "Token 服务采购合同  ·  词元人工智能研究（广州）有限公司"
    else:
        header_text = "Token 服务采购合同（附件）  ·  词元人工智能研究（广州）有限公司"

    hp = sec.header.paragraphs[0]
    hp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = hp.add_run(header_text)
    set_font(r, BODY_FONT, 8.5, False, GRAY)
    add_border(hp, "bottom", 4, "D9D9D9", 2)

    fp = sec.footer.paragraphs[0]
    fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = fp.add_run("第 "); set_font(r, BODY_FONT, 9, False, GRAY)
    set_font(add_field(fp, "PAGE"), BODY_FONT, 9, False, GRAY)
    r = fp.add_run(" 页 / 共 "); set_font(r, BODY_FONT, 9, False, GRAY)
    if with_cover:
        set_font(add_body_page_total(fp), BODY_FONT, 9, False, GRAY)
    else:
        set_font(add_field(fp, "NUMPAGES"), BODY_FONT, 9, False, GRAY)
    r = fp.add_run(" 页"); set_font(r, BODY_FONT, 9, False, GRAY)


    # ------------------------------------------------------------------ cover
    def build_cover():
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        p.paragraph_format.space_before = Pt(4)
        r = p.add_run("合同编号：DOITX-TOKEN-________-____")
        set_font(r, BODY_FONT, 10, False, GRAY)

        for _ in range(6):
            sp = doc.add_paragraph()
            sp.paragraph_format.line_spacing_rule = WD_LINE_SPACING.EXACTLY
            sp.paragraph_format.line_spacing = Pt(16)

        p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_after = Pt(6)
        r = p.add_run("Token 服务采购合同"); set_font(r, HEAD_FONT, 32, True, INK)

        p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run("TOKEN  SERVICE  PURCHASE  AGREEMENT")
        set_font(r, "Times New Roman", 10.5, False, GRAY)

        p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(18)
        p.paragraph_format.space_after = Pt(54)
        add_border(p, "bottom", 10, "808080", 8)
        r = p.add_run(" "); set_font(r, BODY_FONT, 2)

        rows = [
            ("甲方（采购方）", "______________________________"),
            ("乙方（服务方）", "词元人工智能研究（广州）有限公司"),
            ("服务项目", "Token 套餐采购（附赠独立站建设与 AI 团队交付）"),
            ("签订地点", "广东省广州市"),
            ("签订日期", "______ 年 ____ 月 ____ 日"),
        ]
        t = doc.add_table(rows=len(rows), cols=2)
        t.alignment = WD_TABLE_ALIGNMENT.CENTER
        fixed_layout(t, [4.4, 9.4])
        for ri, (k, v) in enumerate(rows):
            for ci, val in enumerate((k, v)):
                cell = t.cell(ri, ci)
                cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
                para = cell.paragraphs[0]
                para.paragraph_format.space_before = Pt(8)
                para.paragraph_format.space_after = Pt(8)
                para.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
                para.alignment = WD_ALIGN_PARAGRAPH.LEFT
                if ci == 0:
                    add_inline(para, val + "：", 11, INK, True)
                else:
                    add_inline(para, val, 11, INK, False)
        doc.add_page_break()


    if with_cover:
        build_cover()

    # ------------------------------------------------------------------ body
    WIDTHS = {
        ("项目", "内容"): [3.8, 12.0],
        ("项目", "内容", "价格"): [4.4, 6.8, 4.6],
        ("服务项目", "服务费", "计费周期"): [6.6, 5.8, 3.4],
        ("项目", "单价", "数量", "小计", "说明"): [4.4, 3.6, 1.6, 2.0, 4.2],
        ("套餐名称", "面值（元）", "赠送比例", "到账额度（元）", "有效期", "可用模型范围"):
            [2.9, 1.7, 1.3, 2.1, 1.4, 6.4],
        ("模型名称（router.doitx.ai）", "输入（元 / 百万 Token）", "输出（元 / 百万 Token）"):
            [6.4, 4.7, 4.7],
        ("序号", "套餐 / 服务", "单价", "数量", "金额", "备注"): [1.0, 3.9, 3.4, 1.4, 2.2, 3.9],
        ("验收项", "标准", "结果"): [3.6, 8.1, 4.1],
        ("交付项", "内容", "状态"): [3.4, 8.5, 3.9],
    }

    ANNEX_PAGEBREAK = True
    skip_title = skip_cover_title
    skip_meta = True
    signature_done = False


    def clause_heading(text, level, page_break=False):
        p = doc.add_paragraph()
        fmt = p.paragraph_format
        fmt.keep_with_next = True
        if page_break:
            fmt.page_break_before = True
        if level == "annex":
            fmt.space_before = Pt(0)
            fmt.space_after = Pt(16)
            fmt.alignment = WD_ALIGN_PARAGRAPH.CENTER
            fmt.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
            fmt.line_spacing = 1.2
            r = p.add_run(text)
            set_font(r, HEAD_FONT, 17, True, INK)
            set_outline(p, 0)
        elif level == "clause":
            fmt.space_before = Pt(13)
            fmt.space_after = Pt(7)
            fmt.alignment = WD_ALIGN_PARAGRAPH.CENTER
            fmt.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
            fmt.line_spacing = 1.2
            r = p.add_run(text)
            set_font(r, HEAD_FONT, 13.5, True, INK)
            set_outline(p, 1)
        else:  # sub
            fmt.space_before = Pt(12)
            fmt.space_after = Pt(6)
            fmt.alignment = WD_ALIGN_PARAGRAPH.LEFT
            fmt.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
            fmt.line_spacing = 1.2
            add_inline(p, text, 11.5, INK, True)
            set_outline(p, 2)
        return p


    def build_signature():
        global signature_done
        signature_done = True
        body = [
            ("甲方（盖章）：", "乙方（盖章）："),
            ("______________________________", "词元人工智能研究（广州）有限公司"),
            ("\u3000", "\u3000"),
            ("授权代表签字：______________", "授权代表签字：______________"),
            ("日　期：______ 年 ____ 月 ____ 日", "日　期：______ 年 ____ 月 ____ 日"),
        ]
        t = doc.add_table(rows=len(body), cols=2)
        t.alignment = WD_TABLE_ALIGNMENT.CENTER
        fixed_layout(t, [7.9, 7.9])
        table_cell_margins(t, 20, 20, 30, 30)
        for ri, (left, right) in enumerate(body):
            for ci, val in enumerate((left, right)):
                cell = t.cell(ri, ci)
                cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
                para = cell.paragraphs[0]
                para.paragraph_format.space_before = Pt(6)
                para.paragraph_format.space_after = Pt(6)
                para.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
                para.paragraph_format.line_spacing = 2.0
                para.alignment = WD_ALIGN_PARAGRAPH.LEFT
                add_inline(para, val, 11, INK, False)
        sp = doc.add_paragraph()
        sp.paragraph_format.line_spacing_rule = WD_LINE_SPACING.EXACTLY
        sp.paragraph_format.line_spacing = Pt(10)


    for kind, payload in blocks:
        if kind == "annex":
            if skip_title:
                skip_title = False
                continue
            clause_heading(payload, "annex", page_break=ANNEX_PAGEBREAK)
            skip_meta = False
            continue

        if kind == "clause":
            if payload == "合同双方":
                skip_meta = False
            if payload == "签署页":
                clause_heading("签署页", "clause")
                build_signature()
                skip_meta = True
                continue
            if signature_done and payload == "签署页":
                continue
            if re.match(r"^\d+\.\s", payload):
                clause_heading(payload, "sub")
            else:
                clause_heading(payload, "clause")
            continue

        if kind == "sub":
            clause_heading(payload, "sub")
            continue

        if kind == "p":
            if skip_meta:
                continue
            p = doc.add_paragraph()
            fmt = p.paragraph_format
            fmt.space_after = Pt(3)
            fmt.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            m = re.match(r"^(\d+\.\d+)\s", payload)
            if m:
                fmt.left_indent = Cm(1.15)
                fmt.first_line_indent = Cm(-1.15)
            add_inline(p, payload)
            continue

        if kind == "note":
            p = doc.add_paragraph()
            fmt = p.paragraph_format
            fmt.left_indent = Cm(0.8)
            fmt.right_indent = Cm(0.2)
            fmt.space_before = Pt(3)
            fmt.space_after = Pt(5)
            fmt.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
            fmt.line_spacing = 1.3
            fmt.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            add_border(p, "left", 14, "B0B0B0", 8)
            add_inline(p, payload, 9.5, GRAY)
            continue

        if kind in ("ol", "ul"):
            num, text = payload if kind == "ol" else ("", payload)
            p = doc.add_paragraph()
            fmt = p.paragraph_format
            fmt.left_indent = Cm(1.55)
            fmt.first_line_indent = Cm(-0.85)
            fmt.space_after = Pt(3)
            fmt.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            r = p.add_run((num + ". ") if kind == "ol" else "· ")
            set_font(r, BODY_FONT, BODY_PT, False, INK)
            add_inline(p, text)
            continue

        if kind == "table":
            rows = payload
            if not rows:
                continue
            ncols = max(len(r_) for r_ in rows)
            widths = WIDTHS.get(tuple(rows[0]))
            if widths is None or len(widths) != ncols:
                widths = [CONTENT_W_CM / ncols] * ncols

            t = doc.add_table(rows=len(rows), cols=ncols)
            t.alignment = WD_TABLE_ALIGNMENT.CENTER
            fixed_layout(t, widths)
            table_borders(t)
            table_cell_margins(t)

            for ri, row in enumerate(rows):
                for ci in range(ncols):
                    text = row[ci] if ci < len(row) else ""
                    cell = t.cell(ri, ci)
                    cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
                    para = cell.paragraphs[0]
                    para.paragraph_format.space_before = Pt(2)
                    para.paragraph_format.space_after = Pt(2)
                    para.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
                    para.paragraph_format.line_spacing = 1.15
                    para.alignment = (WD_ALIGN_PARAGRAPH.CENTER if ri == 0
                                      else WD_ALIGN_PARAGRAPH.LEFT)
                    add_inline(para, text, 9.5, INK, ri == 0)
                    if ri == 0:
                        shade(cell, HEAD_FILL)
                cant_split(t.rows[ri])
            repeat_header(t.rows[0])

            sp = doc.add_paragraph()
            sp.paragraph_format.line_spacing_rule = WD_LINE_SPACING.EXACTLY
            sp.paragraph_format.line_spacing = Pt(8)
            continue

    doc.save(out_path)
    print("wrote", out_path)
    print("paragraphs=%d tables=%d" % (len(doc.paragraphs), len(doc.tables)))


build(MD, OUT, with_cover=True, skip_cover_title=True)
build(ANNEX_MD, ANNEX_OUT, with_cover=False, skip_cover_title=False)

#!/usr/bin/env python3
"""Render the component specs in pattern-language/refs/component-specs.md to plain HTML.

The preview maps every element to a plain HTML tag. An element the map does not know
renders as a labelled box, so a spec always draws. No element is refused, and no
rendering library constrains a spec.

Usage: python3 tools/render_specs.py [--out DIR]
"""

import argparse
import html
import pathlib
import re
import sys

import yaml

# Element to plain HTML. An unknown element falls back to a labelled box.
TAGS = {
    "Card": "section",
    "Column": "div",
    "Row": "div",
    "Text": "p",
    "Button": "button",
    "TextField": "input",
    "NumberField": "input",
    "List": "ul",
}
INPUTS = {"TextField": "text", "NumberField": "number"}
REPEAT_COUNT = 2  # instances drawn for a `*@/path` repeat

LINE = re.compile(
    r"^(?P<indent>\s*)"
    r"(?:(?P<repeat>\*@[\w/.]+)\s+)?"
    r"(?:\?(?P<states>[\w|]+)\s+)?"
    r"(?P<element>\w+)"
    r"(?:\s*#(?P<id>[\w-]+))?"
    r"\s*:?\s*(?P<rest>.*)$"
)


def parse_layout(text):
    """Indented lines to a tree of nodes."""
    root = []
    stack = [(-1, root)]
    for raw in text.splitlines():
        if not raw.strip() or raw.strip().startswith("#"):
            continue
        m = LINE.match(raw.rstrip())
        if not m:
            print(f"  ! unparsed line: {raw.strip()}", file=sys.stderr)
            continue
        node = {
            "indent": len(m["indent"]),
            "repeat": m["repeat"],
            "states": m["states"].split("|") if m["states"] else None,
            "element": m["element"],
            "id": m["id"],
            "rest": m["rest"].split("#")[0].strip(),
            "children": [],
        }
        while stack and stack[-1][0] >= node["indent"]:
            stack.pop()
        stack[-1][1].append(node)
        stack.append((node["indent"], node["children"]))
    return root


def parse_rest(rest):
    """Primary text, props, and the event a control emits."""
    event = None
    if "-> event" in rest:
        rest, _, event = rest.partition("-> event")
        event = event.strip()
    text, props = None, {}
    quoted = re.match(r'^"([^"]*)"\s*,?\s*(.*)$', rest.strip())
    if quoted:
        text, rest = quoted[1], quoted[2]
    for part in rest.split(","):
        if "=" in part:
            key, _, value = part.partition("=")
            props[key.strip()] = value.strip().strip('"')
    return text, props, event


def normalize(path):
    """/root/criteria/0/name -> /root/criteria/name, so one description serves a repeat."""
    return "/" + "/".join(s for s in path.strip("/").split("/") if not s.isdigit())


def describe(path, describes):
    """What a reader expects at this path. Falls back to the last path segment."""
    text = describes.get(normalize(path))
    if text:
        return text
    return normalize(path).rstrip("/").split("/")[-1].replace("_", " ")


def show(value, describes):
    """Bound data renders as what it means, never as its path."""
    if value is None:
        return ""
    def sub(m):
        return f'<var>{html.escape(describe(m.group(1), describes))}</var>'
    value = re.sub(r"\{@(\.?/[\w/.]*)\}", sub, html.escape(value))
    return re.sub(r"@(\.?/[\w/.]*)", sub, value)


def render(nodes, state, describes, depth=1):
    out = []
    pad = "  " * depth
    for node in nodes:
        if node["states"] and state not in node["states"]:
            continue
        copies = REPEAT_COUNT if node["repeat"] else 1
        for index in range(copies):
            out.append(render_node(node, state, describes, depth, index if node["repeat"] else None, pad))
    return "\n".join(out)

def render_node(node, state, describes, depth, index, pad):
    element = node["element"]
    rest = node["rest"]
    if index is not None:
        # `@./field` inside a repeat resolves against one item; show the index.
        rest = rest.replace("@./", f'@{node["repeat"][2:]}/{index}/')
    text, props, event = parse_rest(rest)
    known = element in TAGS
    tag = TAGS.get(element, "div")
    ident = f'{node["id"]}-{index}' if node["id"] and index is not None else node["id"]
    attrs = [f'class="el {element.lower()}{"" if known else " unknown"}"']
    if ident:
        attrs.append(f'id="{html.escape(ident)}"')
    if event:
        attrs.append(f'data-event="{html.escape(event)}"')
    if node["repeat"]:
        attrs.append(f'data-repeat="{html.escape(node["repeat"])}"')

    if element in INPUTS:
        label = re.sub("<[^>]+>", "", show(props.get("label", ""), describes))
        expects = re.sub("<[^>]+>", "", show(props.get("value", ""), describes))
        return (f'{pad}<label class="field"><span>{html.escape(label)}</span>'
                f'<input type="{INPUTS[element]}" placeholder="{html.escape(expects)}"></label>')

    inner = show(text, describes) if text else ""
    if not known:
        inner = f'<span class="tag">{html.escape(element)}</span>{inner}'
    children = render(node["children"], state, describes, depth + 1)
    body = f"{inner}\n{children}\n{pad}" if children else inner
    return f'{pad}<{tag} {" ".join(attrs)}>{body}</{tag}>'


CSS = """
:root { --ink:#171717; --muted:#6b6b6b; --line:#e5e5e5; --paper:#fff; --canvas:#f3f3f1;
  --sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
html,body { margin:0; background:var(--canvas); color:var(--ink); font-family:var(--sans); }
main { max-width:900px; margin:0 auto; padding:32px 20px 60px; }
h1 { font-size:19px; margin:0 0 6px; }
h3 { font-size:11px; font-family:var(--mono); text-transform:uppercase; letter-spacing:.09em;
     color:var(--muted); font-weight:500; margin:22px 0 8px; }
p.lede { font-size:15px; line-height:1.6; max-width:62ch; margin:0 0 8px; }
p.where { font-size:12px; font-family:var(--mono); color:var(--muted); margin:0 0 6px;
          max-width:72ch; line-height:1.5; }
p.note { font-size:13px; color:var(--muted); max-width:64ch; line-height:1.55; }
var { font-style:italic; color:#6f6350; }

/* States sit side by side, in the order a user meets them. */
.screens { display:flex; align-items:stretch; gap:14px; flex-wrap:wrap; margin:14px 0 6px; }
.screen { margin:0; background:var(--canvas); border:1px solid #d8d8d4; border-radius:16px;
          padding:10px; flex:1 1 320px; max-width:520px; display:flex; flex-direction:column; gap:8px; }
.screen figcaption { font:10px var(--mono); text-transform:uppercase; letter-spacing:.09em;
                     color:var(--muted); padding:1px 4px; }
.screen > .surface { background:var(--paper); border:1px solid var(--line); border-radius:11px;
                     padding:12px; flex:1; }
.move { flex:0 0 76px; display:flex; flex-direction:column; align-items:center;
        justify-content:center; gap:4px; color:var(--muted); }
.move .arrow { font-size:19px; line-height:1; }
.move .on { font:10px var(--mono); text-align:center; line-height:1.35; word-break:break-word; }
ul.moves { font-size:12.5px; color:var(--muted); line-height:1.6; padding-left:18px; margin:4px 0; }
ul.moves li { font-family:var(--mono); }

/* A surface is as wide as it needs to be, and no wider. */
.surface { width:auto; max-width:100%; }

.el { min-width:0; }
.card { background:var(--paper); border:1px solid var(--line); border-radius:12px; padding:14px 16px; }
.card .card { background:#fafafa; border-radius:9px; padding:10px 12px; }
.column { display:flex; flex-direction:column; gap:9px; }
.row { display:flex; align-items:flex-start; gap:12px; flex-wrap:wrap; }
.row > .column { flex:1 1 260px; }
.row > .card { flex:1 1 320px; }
.text { margin:0; font-size:13px; color:var(--ink); line-height:1.45; }

/* The first line of a card reads as its title. */
.card > .column > .text:first-child { font-size:14px; font-weight:600; }

.button { border:0; background:var(--ink); color:var(--paper); border-radius:9px;
          padding:8px 14px; font-size:13px; cursor:pointer; flex:0 0 auto; align-self:flex-start; }
.row .button { align-self:center; }
.field { display:flex; flex-direction:column; gap:4px; flex:1 1 220px; font-size:12px; color:var(--muted); }
.field input { border:1px solid var(--line); border-radius:9px; padding:8px 10px;
               font-size:13px; font-family:var(--sans); width:100%; box-sizing:border-box; }
.field input::placeholder { color:#a2a2a2; font-style:italic; }
.unknown { border:1px dashed #b9a06a; border-radius:9px; padding:9px 11px; background:#fdfaf3; }
.tag { font:10px var(--mono); text-transform:uppercase; letter-spacing:.08em; color:#8a6d3b;
       display:block; margin-bottom:4px; }
[data-event]::after { content:" \\2192 " attr(data-event); font:10px var(--mono); opacity:.6; }
"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--specs", default="pattern-language/refs/component-specs.md")
    ap.add_argument("--out", default="pattern-language/renders")
    args = ap.parse_args()

    source = pathlib.Path(args.specs).read_text()
    out_dir = pathlib.Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    blocks = re.findall(r"```yaml\n(.*?)```", source, re.S)
    index = []
    for block in blocks:
        spec = yaml.safe_load(block)[0]
        tree = parse_layout(spec["layout"])
        describes = spec.get("describes") or {}
        states = spec.get("states") or [None]
        transitions = spec.get("transitions") or []
        # A screen per state, in order, with the transition between neighbours drawn between them.
        screens = []
        for position, state in enumerate(states):
            if position:
                move = next((t for t in transitions
                             if t.get("from") == states[position - 1] and t.get("to") == state), None)
                if move:  # no arrow between states that no transition connects
                    screens.append(f'<div class="move"><span class="arrow">&#8594;</span>'
                                   f'<span class="on">{html.escape(str(move["when"]))}</span></div>')
            screens.append(
                f'<figure class="screen">\n'
                f'  <figcaption>{state or "single state"}</figcaption>\n'
                f'  <div class="surface">\n{render(tree, state, describes)}\n  </div>\n'
                f"</figure>"
            )
        others = [t for t in transitions
                  if not any(t.get("from") == a and t.get("to") == b
                             for a, b in zip(states, states[1:]))]
        rest = ""
        if others:
            items = "".join(
                f'<li>{html.escape(str(t.get("from")))} &#8594; {html.escape(str(t.get("to")))}'
                f' — {html.escape(str(t.get("when", "")))}</li>' for t in others)
            rest = f'<h3>other transitions</h3><ul class="moves">{items}</ul>'
        sections = [f'<div class="screens">\n{"".join(screens)}\n</div>', rest]
        page = (
            f'<!doctype html>\n<html lang="en"><head><meta charset="utf-8">'
            f'<title>{spec["id"]}</title><style>{CSS}</style></head><body><main>\n'
            f'<h1>{spec["id"]}</h1>\n'
            f'<p class="lede">{html.escape((spec.get("purpose") or spec["desc"]).strip())}</p>\n'
            + (f'<p class="where">Used in: {html.escape(spec["context"])}</p>\n'
               if spec.get("context") else "")
            + "\n".join(sections)
            + f'\n<h3>fallback</h3><p class="note">{show(spec.get("fallback", ""), describes)}</p>'
            + f'\n<h3>about this preview</h3><p class="note">Plain HTML, from the spec in '
              f'<code>{args.specs}</code>. Italic text stands for content that the running '
              f'system supplies. A repeat draws {REPEAT_COUNT} instances. A state is one moment '
              f'of the work, not one design option. A dashed box is an element with no plain '
              f'HTML equivalent, and it draws anyway.</p>'
            + "\n</main></body></html>\n"
        )
        path = out_dir / f'{spec["id"]}.html'
        path.write_text(page)
        index.append((spec["id"], spec["desc"], path.name))
        print(f"wrote {path}")

    links = "\n".join(
        f'<li><a href="{name}">{spec_id}</a> — {html.escape(desc)}</li>'
        for spec_id, desc, name in index
    )
    (out_dir / "index.html").write_text(
        f'<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><title>Component previews</title>'
        f"<style>{CSS}</style></head><body><main><h1>Component previews</h1>"
        f'<p class="note">Generated by <code>tools/render_specs.py</code>.</p><ul>{links}</ul>'
        "</main></body></html>\n"
    )
    print(f"wrote {out_dir / 'index.html'}")


if __name__ == "__main__":
    main()

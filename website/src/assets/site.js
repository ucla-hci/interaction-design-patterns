// Path trail, "Up", link previews, and the catalog role filter.
// Every page works without this file; it only adds navigation aids.
(() => {
  const index = JSON.parse(document.getElementById("pattern-index").textContent);
  const card = document.querySelector("article.card[data-id]");
  const current = card ? card.dataset.id : null;
  const params = new URLSearchParams(location.search);
  const via = (params.get("via") || "").split(",").filter((x) => index[x]);
  const path = current ? [...via, current] : [];
  const href = (id, trail) => `/p/${id}/` + (trail.length ? `?via=${trail.join(",")}` : "");

  // 1. Carry the path on every pattern link of a card page.
  if (current) {
    document.querySelectorAll("main a[data-pid]").forEach((a) => {
      if (!a.getAttribute("href").includes("?via=") && a.dataset.pid !== current) a.href = href(a.dataset.pid, path);
    });
  }

  // 2. Breadcrumb from the path the designer took.
  const trail = document.getElementById("trail");
  if (trail && current) {
    const parts = ['<a href="/">Home</a>'];
    const label = (id) => `<span class="pidn">${id}</span> ${index[id] ? index[id].name : ""}`;
    via.forEach((id, i) => parts.push(`<a href="${href(id, via.slice(0, i))}" data-pid="${id}">${label(id)}</a>`));
    parts.push(`<span aria-current="page">${label(current)}</span>`);
    trail.innerHTML = parts.join(" <span>›</span> ");
  }

  // 3. "Where am I": with a workflow on the path, show only that workflow.
  const wfOnPath = via.find((id) => id.startsWith("WF-"));
  if (wfOnPath) document.querySelectorAll(".where-wf").forEach((el) => (el.hidden = el.dataset.wf !== wfOnPath));

  // 4. Escape closes a preview.
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") hidePreview(); });

  // Over a row of steps, the wheel scrolls the row sideways until it reaches an end.
  document.querySelectorAll(".strip").forEach((row) =>
    row.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || row.scrollWidth <= row.clientWidth) return;
      const atStart = row.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;
      row.scrollLeft += e.deltaY;
      e.preventDefault();
    }, { passive: false })
  );

  // Workflow examples: one system at a time. Without this script every table shows.
  document.querySelectorAll("[data-system-select]").forEach((sel) => {
    const tables = sel.closest("details").querySelectorAll(".ex-table");
    const show = () => tables.forEach((t) => (t.hidden = t.dataset.system !== sel.value));
    sel.addEventListener("change", show);
    show();
  });

  // 5. Previews: name, Situation, and Problem of a linked pattern.
  const box = document.getElementById("preview");
  let timer;
  function showPreview(a) {
    const r = index[a.dataset.pid];
    if (!r || a.dataset.pid === current) return;
    box.innerHTML = `<p class="pv-k">${a.dataset.pid} · ${r.level}</p><p class="pv-n">${r.name}</p>` +
      `<p><b>Situation</b> ${r.situation}</p><p><b>Problem</b> ${r.problem}</p>`;
    box.hidden = false;
    const rect = a.getBoundingClientRect();
    const w = Math.min(340, window.innerWidth - 32);
    box.style.width = w + "px";
    box.style.left = Math.max(16, Math.min(rect.left + window.scrollX, window.scrollX + window.innerWidth - w - 16)) + "px";
    box.style.top = rect.bottom + window.scrollY + 8 + "px";
  }
  function hidePreview() { clearTimeout(timer); if (box) box.hidden = true; }
  function bind(root) {
    root.querySelectorAll("a[data-pid]").forEach((a) => {
      a.addEventListener("mouseenter", () => { clearTimeout(timer); timer = setTimeout(() => showPreview(a), 250); });
      a.addEventListener("mouseleave", hidePreview);
      a.addEventListener("focus", () => showPreview(a));
      a.addEventListener("blur", hidePreview);
    });
  }
  bind(document);

  // 6. Catalog tabs: one level at a time. Without this script all three show.
  const tabs = document.querySelectorAll("[data-tab]");
  function openTab(name) {
    if (!document.getElementById(name)) name = "workflows";
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t.dataset.tab === name)));
    document.querySelectorAll(".tabpanel").forEach((p) => (p.hidden = p.id !== name));
  }
  if (tabs.length) {
    openTab(location.hash.slice(1));
    if (location.hash) window.scrollTo(0, 0); // a tab anchor selects the tab; it does not scroll
    tabs.forEach((t) => t.addEventListener("click", (e) => {
      e.preventDefault();
      history.replaceState(null, "", "#" + t.dataset.tab);
      openTab(t.dataset.tab);
    }));
  }

  // 7. Catalog: filter subtasks by role.
  document.querySelectorAll(".filters [data-role]").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll(".filters [data-role]").forEach((x) => x.classList.toggle("on", x === b));
      document.querySelectorAll(".mini.sub").forEach((m) => (m.hidden = b.dataset.role && m.dataset.role !== b.dataset.role));
    })
  );
})();

/* SVFM project page. Every number below is copied from the paper's tables (Tables 1-5, Figure 4). */

/* ---------- data ---------- */

const OURS = "SVFM (ours)";

// Table 1: OGBench, standard setting (8 seeds). [mean, std] per method.
const STD = {
  methods: ["IQL", "ReBRAC", "IDQL", "CAC", "FBRAC", "IFQL", "FQL", "CEP", "Q-Flow", OURS],
  groups: [["Gaussian", 2], ["Diffusion", 2], ["Flow", 6]],
  rows: [
    ["antmaze-large", [53,3],[81,5],[21,5],[33,4],[60,6],[28,5],[79,3],[63,5],[87,5],[90,2]],
    ["antmaze-giant", [4,1],[26,8],[0,0],[0,0],[4,4],[3,2],[9,6],[8,2],[32,7],[21,9]],
    ["humanoidmaze-medium", [33,2],[22,8],[1,0],[53,8],[38,5],[60,14],[58,5],[59,3],[83,4],[82,4]],
    ["humanoidmaze-large", [2,1],[2,1],[1,0],[0,0],[2,0],[11,2],[4,2],[3,1],[7,2],[20,5]],
    ["antsoccer", [8,2],[0,0],[12,4],[2,4],[16,1],[33,6],[60,2],[65,3],[55,3],[58,3]],
    ["scene", [28,1],[41,3],[46,3],[40,7],[45,5],[30,3],[56,2],[35,8],[61,1],[60,1]],
    ["puzzle-3x3", [9,1],[21,1],[10,2],[19,0],[14,4],[19,1],[30,1],[25,3],[48,4],[68,3]],
    ["puzzle-4x4", [7,1],[14,1],[29,3],[15,3],[13,1],[25,5],[17,2],[5,2],[29,2],[33,4]],
    ["cube-single", [83,3],[91,2],[95,2],[85,9],[79,7],[79,2],[96,1],[96,1],[94,2],[94,1]],
    ["cube-double", [7,1],[12,1],[15,6],[6,2],[15,3],[14,3],[29,2],[57,5],[32,5],[42,3]],
  ],
  avg: [[23,1],[31,1],[23,1],[25,2],[29,1],[30,2],[44,1],[42,1],[53,1],[57,1]],
};

// Table 2: OGBench, advanced setting (12 seeds).
const ADV = {
  methods: ["ReBRAC", "DAC", "QSM", "FBRAC", "IFQL", "FQL", "QAM", "QAM-E", "Q-Flow", OURS],
  groups: [["Gaussian", 1], ["Diffusion", 2], ["Flow", 7]],
  rows: [
    ["antmaze-large", [94,1],[88,4],[90,4],[2,3],[36,6],[76,6],[80,5],[79,4],[93,0],[90,1]],
    ["antmaze-giant", [57,6],[16,8],[24,9],[0,0],[1,2],[0,0],[15,5],[0,0],[41,6],[48,5]],
    ["humanoidmaze-medium", [69,7],[83,4],[82,4],[39,4],[86,2],[68,9],[62,7],[51,16],[84,3],[83,7]],
    ["humanoidmaze-large", [17,4],[0,0],[6,2],[0,0],[24,5],[9,4],[7,3],[2,1],[6,2],[25,3]],
    ["scene-sparse", [65,7],[68,4],[78,3],[50,12],[84,2],[78,3],[97,1],[97,1],[97,1],[98,2]],
    ["puzzle-3x3-sparse", [79,10],[68,11],[57,10],[0,1],[100,0],[70,16],[100,0],[100,0],[100,0],[100,0]],
    ["puzzle-4x4-sparse", [0,0],[0,0],[0,0],[15,7],[0,0],[5,4],[0,0],[39,8],[0,0],[0,0]],
    ["cube-double", [9,2],[35,3],[33,3],[0,0],[11,2],[46,4],[63,5],[62,3],[36,3],[69,2]],
    ["cube-triple", [1,1],[5,3],[6,1],[0,1],[0,0],[3,2],[3,1],[5,1],[3,1],[3,1]],
    ["cube-quadruple", [9,4],[3,4],[19,2],[0,0],[2,2],[2,4],[2,1],[5,3],[10,6],[50,2]],
  ],
  avg: [[40,2],[37,2],[40,2],[11,2],[34,1],[36,2],[43,1],[44,2],[47,1],[56,1]],
};

// Table 3: adaptive vs. constant temperature, averages (3 seeds).
const TEMP = [
  ["Constant λ = 0.1", 27], ["Constant λ = 0.5", 45], ["Constant λ = 1.0", 38],
  ["Constant λ = 3.0", 22], ["Best constant per domain", 51], ["Adaptive λ (ours)", 56, true],
];

// Table 4: pi_0.5 on LIBERO / LIBERO-Plus.
const LIB = {
  methods: ["BC", "Filtered BC", "QGF", "BoN", "Q-VGM", OURS],
  sections: [
    ["LIBERO (by task suite)", [
      ["Spatial", [92,1],[96,1],[91,0],[92,0],[92,2],[95,1]],
      ["Object", [78,1],[81,1],[95,2],[81,2],[86,1],[90,2]],
      ["Goal", [85,0],[90,1],[83,1],[88,2],[93,1],[89,1]],
      ["Long", [52,0],[60,2],[52,2],[46,2],[47,1],[71,2]],
    ], [[77,0],[82,0],[80,1],[77,0],[80,1],[86,1]]],
    ["LIBERO-Plus (by perturbation)", [
      ["Camera", [52,1],[55,0],[50,0],[49,1],[52,1],[61,0]],
      ["Robot", [62,1],[64,1],[59,0],[59,0],[60,1],[66,1]],
      ["Language", [69,0],[71,1],[69,1],[67,2],[70,1],[75,1]],
      ["Light", [79,2],[79,1],[81,1],[78,1],[82,1],[86,1]],
      ["Background", [74,1],[79,1],[76,2],[76,1],[77,1],[83,1]],
      ["Noise", [63,1],[73,0],[57,0],[59,0],[66,1],[73,1]],
      ["Layout", [69,0],[71,1],[71,1],[69,0],[72,1],[75,0]],
    ], [[66,0],[69,0],[65,0],[64,0],[67,0],[73,1]]],
  ],
};

// Figure 4: task-specific flow policies, 20 trials per task.
const REALFLOW = {
  methods: ["Flow BC", "BoN", "Q-Flow", OURS],
  tasks: [
    ["Carrot in pot", [20, 55, 65, 80]],
    ["Bowl stacking", [40, 50, 95, 95]],
    ["Triple bowl stacking", [0, 0, 30, 30]],
    ["Cube stacking", [0, 20, 25, 50]],
    ["Average", [15, 31, 54, 64]],
  ],
};

// Table 5: GR00T N1.7, success rate (%) and median path length (m) over successful trials.
const GROOT = [
  ["Carrot in pot", [95, 1.21], [65, 1.54], [95, 0.89]],
  ["Bowl stacking", [100, 0.61], [100, 0.60], [100, 0.57]],
  ["Triple bowl stacking", [90, 1.44], [75, 1.28], [100, 1.36]],
  ["Cube stacking", [5, 1.65], [5, 0.86], [100, 0.78]],
  ["Average", [73, 1.23], [61, 1.07], [99, 0.90]],
];

/* ---------- rendering ---------- */

const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};

// Horizontal bar chart: items = [[label, value, isOurs], ...], sorted as given.
function barChart(host, items, max = 100) {
  const list = el("div", "bars");
  for (const [label, v, ours] of items) {
    const row = el("div", "bar-row" + (ours ? " is-ours" : ""));
    row.append(el("span", "bar-label", label));
    const track = el("span", "bar-track");
    const fill = el("span", "bar-fill");
    fill.style.width = (100 * v / max) + "%";
    track.append(fill);
    row.append(track, el("span", "bar-val", v + "%"));
    list.append(row);
  }
  host.append(list);
}

// Average-success chart for an OGBench table, ascending so SVFM lands at the bottom.
function avgChart(host, T) {
  const items = T.methods.map((m, i) => [m, T.avg[i][0], m === OURS]);
  items.sort((a, b) => a[1] - b[1] || (a[2] ? 1 : -1));
  barChart(host, items);
}

const cell = ([m, s], best) => `<td${best ? ' class="best"' : ""}>${m}<small>±${s}</small></td>`;

function benchTable(T) {
  const head1 = "<tr><th></th>" + T.groups.map(([g, n]) => `<th colspan="${n}" class="grp">${g}</th>`).join("") + "</tr>";
  const head2 = "<tr><th>Environment</th>" + T.methods.map(m => `<th${m === OURS ? ' class="ours"' : ""}>${m}</th>`).join("") + "</tr>";
  const row = (name, vals) => {
    const best = Math.max(...vals.map(v => v[0]));
    return `<tr><th>${name}</th>${vals.map(v => cell(v, v[0] === best)).join("")}</tr>`;
  };
  const body = T.rows.map(([n, ...v]) => row(n, v)).join("");
  return `<table><thead>${head1}${head2}</thead><tbody>${body}</tbody><tfoot>${row("Average", T.avg)}</tfoot></table>`;
}

function liberoTable(T) {
  const head = "<tr><th></th>" + T.methods.map(m => `<th${m === OURS ? ' class="ours"' : ""}>${m}</th>`).join("") + "</tr>";
  const row = (name, vals, cls = "") => {
    const best = Math.max(...vals.map(v => v[0]));
    return `<tr class="${cls}"><th>${name}</th>${vals.map(v => cell(v, v[0] === best)).join("")}</tr>`;
  };
  const body = T.sections.map(([title, rows, avg]) =>
    `<tr class="sec"><th colspan="${T.methods.length + 1}">${title}</th></tr>` +
    rows.map(([n, ...v]) => row(n, v)).join("") + row("Average", avg, "avg")).join("");
  return `<table><thead>${head}</thead><tbody>${body}</tbody></table>`;
}

function grootTable() {
  const head = '<tr><th></th><th colspan="2" class="grp">BC+</th><th colspan="2" class="grp">BoN</th><th colspan="2" class="grp ours">SVFM (ours)</th></tr>' +
    "<tr><th>Task</th>" + "<th>SR (%)</th><th>Path (m)</th>".repeat(3) + "</tr>";
  const body = GROOT.map(([name, ...vals]) => {
    const bestSR = Math.max(...vals.map(v => v[0]));
    const bestPath = Math.min(...vals.map(v => v[1]));
    const tds = vals.map(([sr, p]) =>
      `<td${sr === bestSR ? ' class="best"' : ""}>${sr}</td><td${p === bestPath ? ' class="best"' : ""}>${p.toFixed(2)}</td>`).join("");
    return `<tr${name === "Average" ? ' class="avg"' : ""}><th>${name}</th>${tds}</tr>`;
  }).join("");
  return `<table><thead>${head}</thead><tbody>${body}</tbody></table>
    <p class="table-note">Success rate over 20 trials per task; median end-effector path length over successful trials (lower is shorter). Bold marks the best per row.</p>`;
}

// Grouped vertical bars for the real-robot flow-policy results.
function groupedChart(host, D) {
  const legend = el("div", "g-legend");
  D.methods.forEach((m, i) => legend.append(el("span", "", `<i class="g-sw g-c${i}"></i>${m}`)));
  const grid = el("div", "g-grid");
  for (const [task, vals] of D.tasks) {
    const g = el("div", "g-group" + (task === "Average" ? " g-avg" : ""));
    const bars = el("div", "g-bars");
    vals.forEach((v, i) => {
      const b = el("div", `g-bar g-c${i}`);
      b.style.height = v + "%";
      b.title = `${D.methods[i]}: ${v}%`;
      b.append(el("span", "g-val", v));
      bars.append(b);
    });
    g.append(bars, el("div", "g-name", task));
    grid.append(g);
  }
  host.append(legend, grid);
}

function render() {
  const q = s => document.querySelector(s);
  avgChart(q('[data-chart="std"]'), STD);
  avgChart(q('[data-chart="adv"]'), ADV);
  barChart(q('[data-chart="temp"]'), TEMP);
  const libItems = i => LIB.methods.map((m, j) => [m, LIB.sections[i][2][j][0], m === OURS]);
  barChart(q('[data-chart="libero"]'), libItems(0));
  barChart(q('[data-chart="liberoplus"]'), libItems(1));
  groupedChart(q('[data-chart="realflow"]'), REALFLOW);
  q('[data-table="std"]').innerHTML = benchTable(STD);
  q('[data-table="adv"]').innerHTML = benchTable(ADV);
  q('[data-table="libero"]').innerHTML = liberoTable(LIB);
  q('[data-table="groot"]').innerHTML = grootTable();

  if (window.katex) {
    document.querySelectorAll(".eq").forEach(e => katex.render(e.dataset.tex, e, { displayMode: true, throwOnError: false }));
    document.querySelectorAll(".m").forEach(e => katex.render(e.textContent, e, { throwOnError: false }));
  }
}

/* ---------- chrome ---------- */

document.querySelector(".theme-btn").addEventListener("click", () => {
  const root = document.documentElement;
  const dark = root.getAttribute("data-theme") === "dark" ||
    (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
  const next = dark ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

document.querySelector(".copy-bib").addEventListener("click", e => {
  const btn = e.currentTarget;
  navigator.clipboard.writeText(document.getElementById("bibtex").textContent).then(() => {
    btn.textContent = "Copied";
    setTimeout(() => (btn.textContent = "Copy"), 1500);
  });
});

render();

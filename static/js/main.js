/* SVFM project page. Every number below is copied from the paper's tables (Tables 3-5, Figure 4). */

/* ---------- data ---------- */

const OURS = "SVFM (ours)";

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

const cell = ([m, s], best) => `<td${best ? ' class="best"' : ""}>${m}<small>±${s}</small></td>`;

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
  barChart(q('[data-chart="temp"]'), TEMP);
  const libItems = i => LIB.methods.map((m, j) => [m, LIB.sections[i][2][j][0], m === OURS]);
  barChart(q('[data-chart="libero"]'), libItems(0));
  barChart(q('[data-chart="liberoplus"]'), libItems(1));
  groupedChart(q('[data-chart="realflow"]'), REALFLOW);
  q('[data-table="libero"]').innerHTML = liberoTable(LIB);
  q('[data-table="groot"]').innerHTML = grootTable();
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

render();

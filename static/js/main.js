/* SVFM project page. Charts, tables, and math are static HTML; scripts only add the theme toggle and contents. */

document.querySelector(".theme-btn").addEventListener("click", () => {
  const root = document.documentElement;
  const dark = root.getAttribute("data-theme") === "dark" ||
    (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
  const next = dark ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

/* Left-hand contents: on wide screens the header links move to a fixed column on the left and the
 * section in view is marked. The page itself scrolls normally. */
(() => {
  const HEAD = 64;  // sticky header, same as scroll-padding-top
  const toc = document.createElement("nav");
  toc.className = "toc";
  toc.setAttribute("aria-label", "Contents");
  const items = [...document.querySelectorAll(".site-head nav a")].map((a) => {
    const c = a.cloneNode(true);
    toc.appendChild(c);
    return { a: c, sec: document.querySelector(a.getAttribute("href")) };
  }).filter((it) => it.sec);
  document.body.appendChild(toc);

  let ticking = false;
  function mark() {
    ticking = false;
    const y = window.scrollY + window.innerHeight * 0.35;
    let cur = null;
    for (const it of items) if (it.sec.getBoundingClientRect().top + window.scrollY <= y) cur = it;
    // At the very bottom, the last section is the one being read even if its heading is above the line.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) cur = items[items.length - 1];
    for (const it of items) it.a.classList.toggle("on", it === cur);
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(mark); } }, { passive: true });
  mark();

  // The More Research menu closes on a click elsewhere or Escape.
  const more = document.querySelector(".more");
  if (more) {
    document.addEventListener("click", (e) => { if (more.open && !more.contains(e.target)) more.open = false; });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") more.open = false; });
  }
})();

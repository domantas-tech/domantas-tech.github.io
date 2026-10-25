/* main.js: theme toggle, mobile navigation, blog tag filter, print button. */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  var mql = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set === "light" || set === "dark") return set;
    return mql && mql.matches ? "dark" : "light";
  }

  function updateToggleLabel(btn) {
    var next = currentTheme() === "dark" ? "light" : "dark";
    btn.setAttribute("aria-label", "Switch to " + next + " theme");
    btn.setAttribute("title", "Switch to " + next + " theme");
  }

  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    updateToggleLabel(themeBtn);
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked: still works for this page view */ }
      updateToggleLabel(themeBtn);
    });
    if (mql && mql.addEventListener) {
      mql.addEventListener("change", function () { updateToggleLabel(themeBtn); });
    }
  }

  /* ---------- Mobile navigation ---------- */
  var navBtn = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  if (navBtn && nav) {
    function setOpen(open) {
      navBtn.setAttribute("aria-expanded", String(open));
      navBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
    }
    navBtn.addEventListener("click", function () {
      setOpen(navBtn.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        navBtn.focus();
      }
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
  }

  /* ---------- Blog tag filter (supports /blog/?tag=xyz) ---------- */
  var filter = document.querySelector(".tag-filter");
  var list = document.getElementById("post-list");
  if (filter && list) {
    var buttons = filter.querySelectorAll("[data-tag]");
    var posts = list.querySelectorAll(".post-card");
    var empty = document.getElementById("no-posts");
    var status = document.getElementById("filter-status");

    function applyTag(tag, updateUrl) {
      var shown = 0;
      posts.forEach(function (post) {
        var tags = (post.getAttribute("data-tags") || "").split(" ");
        var match = !tag || tags.indexOf(tag) !== -1;
        post.hidden = !match;
        if (match) shown++;
      });
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-tag") === tag));
      });
      if (empty) empty.hidden = shown !== 0;
      if (status) status.textContent = shown + (shown === 1 ? " post" : " posts") + (tag ? " tagged " + tag : "");
      if (updateUrl && window.history && history.replaceState) {
        var url = new URL(window.location.href);
        if (tag) url.searchParams.set("tag", tag); else url.searchParams.delete("tag");
        history.replaceState(null, "", url);
      }
    }

    buttons.forEach(function (b) {
      b.addEventListener("click", function () { applyTag(b.getAttribute("data-tag"), true); });
    });

    filter.hidden = false;
    var initial = new URLSearchParams(window.location.search).get("tag") || "";
    var known = Array.prototype.some.call(buttons, function (b) { return b.getAttribute("data-tag") === initial; });
    applyTag(known ? initial : "", false);
  }

  /* ---------- Print button (CV page) ---------- */
  document.querySelectorAll("[data-print]").forEach(function (b) {
    b.addEventListener("click", function () { window.print(); });
  });
})();

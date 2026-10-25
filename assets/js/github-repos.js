/* github-repos.js: "More on GitHub" on the portfolio page.
   Loads public repos for the username in _config.yml (github_username).
   Unauthenticated GitHub API calls are limited to 60/hour per visitor IP, so
   results are cached for 1 hour and failures fall back to a profile link. */
(function () {
  "use strict";

  var box = document.getElementById("gh-repos");
  if (!box) return;

  var user = box.getAttribute("data-username");
  var MAX = 6;
  var CACHE_KEY = "gh-repos:" + user;
  var CACHE_MS = 60 * 60 * 1000;
  var profileUrl = "https://github.com/" + encodeURIComponent(user);

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function done() { box.setAttribute("aria-busy", "false"); }

  function showMessage(msg) {
    box.textContent = "";
    var p = el("p", "repo-status card", msg + " ");
    var a = el("a", null, "Browse my repositories on GitHub →");
    a.href = profileUrl + "?tab=repositories";
    p.appendChild(a);
    box.appendChild(p);
    done();
  }

  function render(repos) {
    var list = repos
      .filter(function (r) { return !r.fork && !r.archived && r.name.toLowerCase() !== (user + ".github.io").toLowerCase(); })
      .sort(function (a, b) { return new Date(b.pushed_at) - new Date(a.pushed_at); })
      .slice(0, MAX);

    if (!list.length) { showMessage("No public repositories to show yet."); return; }

    box.textContent = "";
    list.forEach(function (r) {
      var card = el("article", "card card-link repo-card");
      var h = el("h3");
      var a = el("a", "stretched", r.name);
      a.href = r.html_url;
      h.appendChild(a);
      card.appendChild(h);
      card.appendChild(el("p", null, r.description || "No description."));

      var meta = el("p", "meta");
      if (r.language) meta.appendChild(el("span", null, r.language));
      meta.appendChild(el("span", null, "★ " + r.stargazers_count));
      var updated = new Date(r.pushed_at);
      if (!isNaN(updated)) {
        meta.appendChild(el("span", null, "Updated " + updated.toLocaleDateString(undefined, { year: "numeric", month: "short" })));
      }
      card.appendChild(meta);
      box.appendChild(card);
    });
    done();
  }

  // Cached copy first (sessionStorage may be unavailable: ignore errors).
  try {
    var cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
    if (cached && Date.now() - cached.t < CACHE_MS) { render(cached.data); return; }
  } catch (e) { /* ignore */ }

  if (!window.fetch) { showMessage("Your browser can't load the live list."); return; }

  fetch("https://api.github.com/users/" + encodeURIComponent(user) + "/repos?per_page=100&sort=pushed", {
    headers: { Accept: "application/vnd.github+json" }
  })
    .then(function (res) {
      if (res.status === 403 || res.status === 429) throw new Error("rate-limited");
      if (!res.ok) throw new Error("http-" + res.status);
      return res.json();
    })
    .then(function (data) {
      if (!Array.isArray(data)) throw new Error("bad-data");
      try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data: data })); } catch (e) { /* ignore */ }
      render(data);
    })
    .catch(function (err) {
      showMessage(err && err.message === "rate-limited"
        ? "GitHub's rate limit was reached for now."
        : "Couldn't load repositories right now.");
    });
})();

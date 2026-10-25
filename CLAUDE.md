# CLAUDE.md

Personal career website for GitHub user **domantas-tech**, deployed as a GitHub Pages *user site*
(`domantas-tech.github.io`, branch `main`, root). GitHub builds it natively with Jekyll.

## Hard constraints
- **Jekyll only, built by GitHub Pages.** No custom build step, no GitHub Actions workflows, no npm, no
  Tailwind/React/bundlers. Plugins limited to `jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap`.
- GitHub Pages runs **Jekyll 3.10 / Liquid 4** (via the `github-pages` gem). Avoid Jekyll 4-only filters and
  features (e.g. `find`, `find_exp`, `sort` with nils first/last tricks from 4.x).
- Plain HTML + CSS + minimal vanilla JS (ES5-compatible style, no modules or dependencies).
- External assets: Google Fonts only (Inter, JetBrains Mono).
- **Git commits: never add a `Co-Authored-By: Claude` (or any Claude/AI attribution) trailer.** The owner does not want
  Claude listed as a contributor.

## Content vs. layout (keep them separate)
| What | Where |
|---|---|
| Name, role, tagline, email, socials, avatar, about text, banner, career start year | `_config.yml` |
| Home hero lines, strengths score card, feature list, showcase | `_data/home.yml` |
| Portfolio projects (`featured: true` → home page) | `_data/projects.yml` |
| CV: summary, experience, education, skills, accomplishments, languages | `_data/cv.yml` |
| Menu | `_data/navigation.yml` |
| Blog posts (`YYYY-MM-DD-title.md`; front matter: title, date, tags, summary, optional cover/cover_alt) | `_posts/` |
| CV PDF | `assets/cv.pdf` |
| Images | `assets/images/` |

Never hard-code personal content in templates; add a field to the relevant data file instead and
document it in README.md §3.

## Code map
- `_layouts/default.html`: shell (banner, header, main, footer, scripts). Pages can add scripts with
  front matter `scripts: [/assets/js/x.js]`.
- `_layouts/page.html`: generic page with `eyebrow`/`title`/`intro` header. `_layouts/post.html`: blog post
  with reading time and prev/next.
- `_includes/`: `head`, `header`, `footer`, `banner`, `stats`, `project-card` and `post-card` (both take
  `level=` for heading level), `reading-time`, `contact`, `icon` (inline SVG by `name=`).
- `assets/css/main.css`: **theme tokens at the top**. **Dark is the default** (`@media screen { :root:not([data-theme="light"]) }`),
  light lives in `:root` (used for `data-theme="light"` and print). System preference is intentionally ignored (owner's choice),
  then base/layout/components/pages/print. `syntax.css` holds the Rouge token colors.
- `assets/js/main.js`: theme toggle (localStorage key `theme`, always in try/catch), mobile nav, blog tag
  filter (`?tag=slug`), print button. The inline script in `head.html` applies the saved theme before paint.
- `assets/js/github-repos.js`: "More on GitHub" via the public GitHub API, cached in sessionStorage
  for 1h, with a graceful fallback on rate limit or errors. Build DOM with `textContent` only (no innerHTML from API data).

## Conventions
- Mobile-first CSS, `--gutter` 16px on phones. No horizontal scroll at 320px.
- Accessibility: semantic landmarks, one `h1` per page, correct heading order, visible `:focus-visible`,
  skip link, `aria-current` in nav, `aria-pressed` on filter chips, decorative icons `aria-hidden`.
  Keep text contrast ≥ 4.5:1 in both themes.
- Use `| relative_url` for internal links and assets.
- Restrained motion: short transitions, disabled under `prefers-reduced-motion`.

## Local preview (Windows)
Ruby 3.3 + DevKit, then `bundle install` and `bundle exec jekyll serve --livereload` → http://localhost:4000.
Restart after editing `_config.yml`. Ruby may not be installed on this machine. If so, verify by pushing
and checking the Pages build (`gh api repos/domantas-tech/domantas-tech.github.io/pages/builds/latest`).

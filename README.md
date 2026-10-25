# Personal career site

A personal website (home, portfolio, blog, CV and contact) built with **Jekyll** and hosted for free on **GitHub Pages** at
**https://domantas-tech.github.io**.

- No build step, no npm, no GitHub Actions. GitHub Pages builds it for you on every push.
- Plain HTML, CSS and a little vanilla JS. Dark theme by default (with a light-mode toggle), responsive, keyboard accessible.
- **All content lives in data files and Markdown**, so you never need to touch the HTML to update it.

```
_config.yml            ← your name, tagline, email, socials, avatar, banner
_data/home.yml         ← home page hero, "strengths" card, feature list, showcase
_data/projects.yml     ← portfolio projects
_data/cv.yml           ← experience, education, skills, accomplishments
_data/navigation.yml   ← top menu links
_posts/                ← blog posts (Markdown)
assets/cv.pdf          ← downloadable CV
assets/images/         ← all images
assets/css/main.css    ← styles (colors at the very top)
```

Everything marked **PLACEHOLDER** / "Lorem ipsum" / "Your Name" is sample content for you to replace.

---

## 1. Put the site online (GitHub Pages)

1. **Create the repository.** On GitHub go to **New repository** and name it exactly
   **`domantas-tech.github.io`** (your username + `.github.io`). Make it **Public**, and do *not* add a README or
   .gitignore, since this project already has them.
2. **Push this code** from the project folder (PowerShell or Git Bash):
   ```bash
   git branch -M main
   git remote add origin https://github.com/domantas-tech/domantas-tech.github.io.git
   git push -u origin main
   ```
   *(Shortcut if you use the GitHub CLI: `gh repo create domantas-tech.github.io --public --source . --push`.)*
3. **Enable Pages.** In the repo, open **Settings → Pages**. Under **Build and deployment** set
   **Source: Deploy from a branch**, **Branch: `main`**, **Folder: `/ (root)`**, then **Save**.
4. Wait 1–2 minutes. You can watch the build in the repo's **Actions** tab ("pages build and deployment").
   This is GitHub's built-in builder, so there is no workflow file for you to maintain. Then open
   **https://domantas-tech.github.io**.

From now on, every `git push` to `main` rebuilds the site automatically.

---

## 2. Preview locally on Windows (optional)

You don't *have* to run anything locally: you can edit, push, and check the live site a minute later.
But a local preview is faster for bigger changes.

1. **Install Ruby with DevKit.** Download **Ruby+Devkit 3.3.x (x64)** from <https://rubyinstaller.org/downloads/>,
   or run `winget install RubyInstallerTeam.RubyWithDevKit.3.3`.
   At the end of the installer keep **"Run 'ridk install'"** ticked, and when the console asks, press **Enter**
   to install the MSYS2 + MINGW toolchain (option 3).
   *Ruby 3.3 is recommended. GitHub Pages' Jekyll version may not work with newer Ruby versions.*
2. Open a **new** terminal in the project folder and install the dependencies (first time only):
   ```powershell
   gem install bundler
   bundle install
   ```
3. Start the dev server:
   ```powershell
   bundle exec jekyll serve --livereload
   ```
4. Open <http://localhost:4000>. Pages reload automatically when you save a file.

**Notes**
- Changes to **`_config.yml` are not picked up live.** Stop the server (`Ctrl+C`) and start it again.
- If you see `cannot load such file -- webrick`, run `bundle install` again (webrick is in the Gemfile).
- To preview posts dated in the future, add `--future`.

---

## 3. How to edit content

### 3.1 Write a new blog post
1. Create a file in `_posts/` named **`YYYY-MM-DD-short-title.md`**, e.g. `_posts/2026-11-02-my-first-real-post.md`.
2. Start it with this front matter, then write Markdown below it:
   ~~~markdown
   ---
   title: "My first real post"
   date: 2026-11-02 09:00:00 +0200
   tags: [career, python]          # used by the tag filter on /blog/
   summary: "One or two sentences shown on the blog list and home page."
   cover: /assets/images/my-cover.jpg     # optional (2:1 ratio looks best)
   cover_alt: "Describe the image"        # optional, for screen readers
   ---

   Your text here. **Bold**, _italic_, [links](https://example.com), lists, tables…

   ```python
   print("Code blocks are highlighted automatically")
   ```
   ~~~
3. Commit and push. Reading time, previous/next links and tags are generated for you.

Delete the three sample posts in `_posts/` whenever you like.

> Posts with a date in the future are **not** published until that date has passed (and the site is rebuilt).

### 3.2 Add a portfolio project
Open `_data/projects.yml`, copy an existing block, and edit it:
```yaml
- name: "My Project"
  description: "One or two sentences about what it does and why it matters."
  tech: ["Python", "Docker"]
  github: "https://github.com/domantas-tech/my-project"   # "" to hide the button
  demo: "https://my-project.example.com"                   # "" to hide the button
  image: "/assets/images/my-project.png"                    # 16:10 ratio looks best
  featured: true                                            # true = also shown on the home page
```
The order in the file is the order on the page. The "projects shipped" counter updates automatically.

The **More on GitHub** section on /portfolio/ loads your latest public repos live from the GitHub API using
`github_username` from `_config.yml`. If GitHub's rate limit is hit (60 requests/hour per visitor), it shows
a link to your profile instead.

### 3.3 Update the CV
Everything on **/cv/** comes from `_data/cv.yml`:
- `summary`: the paragraph at the top
- `experience`: jobs (newest first), each with `highlights` bullet points
- `education`, `skills` (grouped chips), `accomplishments`, `languages`

Keep the 2-space indentation. Lists start with `- `. Wrap text containing `:` or `#` in quotes.
The page has a print stylesheet, so **Print → Save as PDF** in the browser gives you a clean one-column CV.

### 3.4 Replace the CV PDF
Save your real CV as **`assets/cv.pdf`** (same name, overwrite the placeholder), commit and push.
The "Download CV (PDF)" button on /cv/ always points to that file.

### 3.5 Change your name, avatar and socials
Edit the top of **`_config.yml`**:
```yaml
name: "Domantas …"
role: "Software Engineer"
tagline: "…"
email: "you@example.com"
github_username: "domantas-tech"
linkedin_username: "your-linkedin"   # the part after linkedin.com/in/
avatar: "/assets/images/me.jpg"
about: |
  Your about-me text (Markdown allowed).
career_start_year: 2018              # drives the "years experience" counter
```
Also update `title`, `author.name` and `social` further down (used for SEO and link previews).
The big two-line headline, the "strengths" score card, the feature list and the showcase gallery are in
**`_data/home.yml`**.

### 3.6 Add images
Put files in **`assets/images/`** and reference them with a leading slash:
- in YAML: `image: "/assets/images/photo.jpg"`
- in a post: `![Alt text describing the image](/assets/images/photo.jpg)`

Tips: use `.jpg` or `.webp` for photos and `.png`/`.svg` for screenshots and graphics, and keep each under ~300 KB.

### 3.7 Change the theme colors
All colors are CSS variables at the **top of `assets/css/main.css`** (section "1. THEME TOKENS"):
- The **dark** theme (the default) is the block under `@media screen { :root:not([data-theme="light"]) { … } }`.
- `:root { … }` holds the **light** theme, used when a visitor clicks the toggle and when printing.
- `--brand` is the deep teal (`#0F2724`). `--accent` is used for links and highlights.
  `--btn-bg` is the primary button color.

Code-highlighting colors are in `assets/css/syntax.css`. If you change `--brand`, also update
`<meta name="theme-color">` in `_includes/head.html`.

Everyone sees the dark theme first. The toggle (sun/moon icon) switches to light mode, and the browser
remembers that choice for the next visit.

### 3.8 Edit the status banner
In `_config.yml`:
```yaml
banner:
  mode: "custom"        # "custom", "latest_post" (shows your newest post automatically) or "off"
  label: "Open to work"
  text: "Available for senior engineering roles from January."
  link: "/#contact"
  link_text: "Get in touch"
```
Restart the local server after editing (or just push).

### 3.9 Change the menu
Edit `_data/navigation.yml` (title + URL per item).

---

## 4. Optional: use a custom domain

1. Buy a domain (e.g. `yourname.dev`) from any registrar.
2. In the repo go to **Settings → Pages → Custom domain**, enter it and save. GitHub commits a `CNAME` file for you.
3. At your registrar, add DNS records:
   - Apex domain (`yourname.dev`): four **A** records pointing to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (and optionally **AAAA** records `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`).
   - `www` subdomain: a **CNAME** record pointing to `domantas-tech.github.io`.
4. Wait for DNS to propagate (minutes to a few hours), then tick **Enforce HTTPS**.
5. Change `url:` in `_config.yml` to `https://yourname.dev` and push.

Tip: verify the domain under your GitHub account's **Settings → Pages** to protect it from takeover.

---

## Project structure

```
.
├── _config.yml           site settings + personal info
├── _data/                home.yml, projects.yml, cv.yml, navigation.yml
├── _includes/            reusable pieces (header, footer, banner, cards, stats, icons…)
├── _layouts/             default, page, post
├── _posts/               blog posts
├── assets/
│   ├── css/              main.css (theme + styles + print), syntax.css (code colors)
│   ├── js/               main.js (theme, menu, tag filter), github-repos.js
│   ├── images/           avatar, project and showcase images
│   └── cv.pdf
├── blog/index.html       /blog/
├── portfolio/index.html  /portfolio/
├── cv/index.html         /cv/
├── index.html            home page
└── 404.html
```

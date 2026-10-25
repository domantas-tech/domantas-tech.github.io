source "https://rubygems.org"

# Matches the exact Jekyll + plugin versions GitHub Pages uses
# (includes jekyll-feed, jekyll-seo-tag and jekyll-sitemap).
gem "github-pages", group: :jekyll_plugins

# Ruby 3+ no longer bundles webrick, which `jekyll serve` needs.
gem "webrick", "~> 1.8"

# Windows-only: timezone data used by Jekyll.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

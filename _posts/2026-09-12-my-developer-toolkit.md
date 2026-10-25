---
title: "My developer toolkit in 2026"
date: 2026-09-12 10:00:00 +0300
tags: [tools, productivity]
summary: "Placeholder post. The editor, terminal setup and small scripts that save me the most time each week."
---

> **This is a placeholder post.** Replace it with your own writing, or delete the file.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.

## Terminal

A couple of aliases I use dozens of times a day:

```bash
# Jump to the root of the current git repo
alias groot='cd "$(git rev-parse --show-toplevel)"'

# Pretty one-line git log
alias glog='git log --oneline --graph --decorate -20'
```

## Editor

Donec ullamcorper nulla non metus auctor fringilla. Inline code looks like `npm` (just kidding, this site has no npm).

- Vestibulum id ligula porta felis euismod semper.
- Maecenas faucibus mollis interdum.
- Cras mattis consectetur purus sit amet fermentum.

## Small scripts

```js
// Copy the current page's title and URL as a Markdown link
const link = `[${document.title}](${location.href})`;
navigator.clipboard.writeText(link);
```

Nullam quis risus eget urna mollis ornare vel eu leo.

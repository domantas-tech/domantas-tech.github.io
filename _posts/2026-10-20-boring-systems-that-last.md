---
title: "Boring systems that last"
date: 2026-10-20 09:00:00 +0300
tags: [engineering, architecture]
summary: "Placeholder post. Why the most reliable systems I've worked on were the least exciting ones, and how to design for boring on purpose."
cover: /assets/images/cover-boring-systems.svg
cover_alt: "Abstract illustration of stacked blocks"
---

> **This is a placeholder post.** Replace it with your own writing, or delete the file.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

## Pick the dull option

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. A few rules I keep coming back to:

1. **Prefer a database over a queue** until you can prove you need the queue.
2. **One deploy pipeline**, used by everyone, every time.
3. **Logs you can read** at 3 a.m. without a decoder ring.

## A tiny example

Retries are where "clever" usually sneaks in. Keep them small and obvious:

```python
import time

def with_retries(fn, attempts=3, base_delay=0.5):
    """Call fn, retrying with exponential backoff on failure."""
    for attempt in range(1, attempts + 1):
        try:
            return fn()
        except Exception:
            if attempt == attempts:
                raise
            time.sleep(base_delay * 2 ** (attempt - 1))
```

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

| Choice        | Exciting | Still works in 5 years |
|---------------|:--------:|:----------------------:|
| Postgres      | No       | Yes                    |
| New hot DB    | Yes      | Maybe                  |

That's it. Boring wins.

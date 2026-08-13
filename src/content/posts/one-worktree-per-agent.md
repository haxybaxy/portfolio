---
title: My Workflow for Parallel Agent Development
date: 2026-08-13
description: Running several coding agents at once, each in its own git worktree. What lives on my machine and creates trees, and what lives in the repo and makes a tree runnable.
tags: [git, agents, tooling]
draft: false
---

Usually once a codebase's conventions have all been established and I need to start adding more business logic, I have three or four agents running at once, each on a separate task. I've set up my workflow to accommodate for this by making it as easy as possible to manage agents in separate worktrees.

So each agent gets its own git worktree. I use [worktrunk](https://worktrunk.dev) to define global settings and language/repo specific settings:

| Layer  | Lives in                              | Decides                                            |
| ------ | ------------------------------------- | -------------------------------------------------- |
| Global | `~/.config`, my dotfiles              | How trees get created, and how I move between them |
| Repo   | `.config/wt.toml`, `.worktreeinclude` | What a tree of _this_ project needs to be runnable |

## The global layer: creating trees

In `~/.config/worktrunk/config.toml`:

```toml
[aliases]
nt = "wt switch --create --base develop {{ args }}"
```

`nt some-branch` creates the worktree, branches it off `develop`, since it's the default branch for most of my projects and drops me in it.

I run everything inside [herdr](https://herdr.dev), so each worktree is a workspace with its own agent pane. Even though Herdr ships a built-in new-worktree action; I use the [worktrunk herdr plugin](https://github.com/devashish2203/herdr-worktrunk) instead:

```toml
new_worktree = ""

[[keys.command]]
key = "prefix+shift+g"
type = "plugin_action"
command = "worktrunk.open-current"
description = "Worktree: switch / create from current branch"

[[keys.command]]
key = "prefix+shift+d"
type = "plugin_action"
command = "worktrunk.remove"
description = "Worktree: remove"
```

The picker fuzzy-matches over existing trees and creates one if what I typed matches nothing, so switching to a tree and making a tree are the same keystroke. Each checkout opens as its own workspace, and `prefix+[` / `prefix+]` cycle between agents.

I also have worktrunk bindings for [lazygit](https://github.com/jesseduffield/lazygit), in case I want to have a few agents kick something off without herdr:

```yaml
keybinding:
  universal:
    newWorktree: <disabled> # freed up for the worktrunk custom command below
customCommands:
  - key: "w"
    context: "localBranches"
    description: "New worktree from this branch (worktrunk)"
    command: "wt switch --create --no-cd --base {{ .SelectedLocalBranch.Name | quote }} {{ .Form.Branch | quote }}"
```

## The repo layer: making a tree runnable

A fresh worktree is a checkout of tracked files, which is a directory that cannot start anything since it has no `.env` or dependencies, so I add a few more pieces of configuration.

`.config/wt.toml`, at a monorepo root for example:

```toml
[pre-start]
env = "wt step copy-ignored --require-include"
frontend = "cd frontend && npm ci"
backend = "cd backend && uv sync"
```

`pre-start` failure is blocking, so I know the tree is ready by the time I arrive in it. Anything I would rather not wait on goes in a `[post-start]` table and finishes in the background, with its output logged:

```toml
[post-start]
ports = "echo 'VITE_PORT={{ branch | hash_port }}' >> frontend/.env.local"
dev = "just dev"
```

`{{ branch | hash_port }}` is one of worktrunk's template filters. It hashes the branch name into the 10000–19999 range, so every tree gets a port of its own instead of all of them wanting 5173.

With this post start hook, every agent's frontend can just stay up, and checking on one is flipping to its tab instead of stopping a server to start another. Because it's a hash and not a counter, a branch keeps the same port even after I remove the tree and make it again later, so whatever I had open still points at the right thing.

The rest of the filter set is worth reading. `sanitize` and `sanitize_hash` for filesystem-safe names, `sanitize_db` for a database identifier, `hash` for a short digest. Combined with the variables hooks can reach (the branch, the worktree path, the base branch, the repo), most of the per-tree values I would otherwise script by hand are one template away.

To copy `.env` files, worktrunk reads `.worktreeinclude`, also at the root:

```
.env
.env*.local
*.env
```

A file is copied only if it is **both** gitignored **and** matches a pattern here. Files like `.env.example`, `docker.env` and `terraform.tfvars` are tracked, therefore never touched, so a sloppy pattern in this file cannot clobber a committed one. Patterns match at any depth, which is why three lines cover `frontend/.env`, `admin/.env`, `backend/.env` and the infra env files without naming any of them.

Dependencies are deliberately absent from that list. `node_modules` and `.venv` hold machine-specific state, and a `.venv` writes absolute paths into its activation scripts, so it is rebuilt from the lockfile instead, which is the `uv sync` above.

## Test databases

One thing that I noticed would slow down end to end agent work is that they would execute test suites that build and drop the schema simultaneously on the same database. I've had to adjust e2e test suites on several projects to accommodate my workflow.

I've made it so that every worktree creates a unique database name:

```python
def _isolated_db_name(base: str, checkout: Path, worker: str | None = None) -> str:
    digest = hashlib.sha256(str(checkout).encode()).hexdigest()[:10]
    label = _slug(checkout.parent.name)
    suffix = f"_{_slug(worker)}" if worker else ""
    ...
```

That yields `app_test_my_branch_a1b2c3d4e5`, created if it does not exist, at module import time rather than in a fixture. The worker suffix extends the same idea to a single run. The suite is parallel by default (`-n auto --maxprocesses=4 --dist loadfile`) and every xdist worker rebuilds the schema at session start, so each worker gets its own database too. The suffix is absent when running serially, so `-n0` keeps the plain name.

Each database is also stamped with the worktree that owns it:

```sql
COMMENT ON DATABASE app_test_my_branch_a1b2c3d4e5 IS 'pytest-checkout=/abs/path/to/checkout'
```

Cleanup runs off that marker instead of a name pattern, so once a worktree is gone its schema gets dropped automatically and nothing else gets caught.

## What a day looks like

I run `nt fix-webhook-retry`, wait a few seconds for the installs, start an agent, and go do the same thing three more times. I reviewing changes in each herdr workspace with [hunk](https://github.com/modem-dev/hunk). When I'm done, I open a PR to `develop` by pressing o on lazygit, and do `prefix+shift+d` to delete the worktree and have the test db pruned.

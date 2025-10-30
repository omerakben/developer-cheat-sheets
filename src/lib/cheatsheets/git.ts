import { CheatSheet } from "@/types/cheatsheet";

export const gitCheatSheet: CheatSheet = {
  title: "Git Commands & Workflows",
  description:
    "Essential Git commands and workflows for modern development. From basic commits to advanced rebasing, branch management, and collaboration patterns.",
  metadata: {
    lastUpdated: "2025-01-01",
    version: "1.0.0",
    author: "Developer CheatSheets",
  },
  sections: [
    {
      id: "setup-config",
      title: "Setup & Configuration",
      description:
        "Initial Git setup and configuration for your development environment",
      examples: [
        {
          title: "Configure User Identity",
          description:
            "Set your name and email for commits. Use --global for all repos or omit for current repo only.",
          code: `# Global configuration (all repositories)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Repository-specific configuration
git config user.name "Work Name"
git config user.email "work@company.com"

# View configuration
git config --list
git config user.name`,
          language: "bash",
          difficulty: "beginner",
          tags: ["setup", "configuration", "identity"],
          documentationUrl: "https://git-scm.com/docs/git-config",
        },
        {
          title: "Essential Aliases for Productivity",
          description:
            "Save time with Git aliases. These are the most useful shortcuts for daily work.",
          code: `# Status shortcuts
git config --global alias.st status
git config --global alias.s "status -s"

# Branch shortcuts
git config --global alias.br branch
git config --global alias.co checkout
git config --global alias.cob "checkout -b"

# Commit shortcuts
git config --global alias.ci commit
git config --global alias.cam "commit -am"
git config --global alias.amend "commit --amend --no-edit"

# Log shortcuts
git config --global alias.lg "log --graph --oneline --decorate --all"
git config --global alias.last "log -1 HEAD"
git config --global alias.ll "log --pretty=format:'%C(yellow)%h%C(red)%d %C(reset)%s %C(green)[%cn] %C(blue)%cr' --decorate --numstat"

# Diff shortcuts
git config --global alias.d diff
git config --global alias.ds "diff --staged"

# Undo shortcuts
git config --global alias.unstage "reset HEAD --"
git config --global alias.undo "reset --soft HEAD~1"

# Now use them like: git st, git cob feature-branch, git lg`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["aliases", "productivity", "shortcuts"],
          documentationUrl: "https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases",
        },
        {
          title: "Configure Line Endings & Editor",
          description:
            "Prevent line ending issues across platforms and set your preferred editor.",
          code: `# Line endings (prevents Windows/Unix conflicts)
# Windows:
git config --global core.autocrlf true
# Mac/Linux:
git config --global core.autocrlf input

# Default editor
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "vim"          # Vim
git config --global core.editor "nano"         # Nano

# Default branch name
git config --global init.defaultBranch main

# Pull strategy (rebase instead of merge)
git config --global pull.rebase true`,
          language: "bash",
          difficulty: "beginner",
          tags: ["configuration", "editor", "line-endings", "cross-platform"],
        },
      ],
    },
    {
      id: "basic-workflow",
      title: "Basic Workflow",
      description: "Everyday Git commands for committing and managing changes",
      examples: [
        {
          title: "Initialize & Clone Repositories",
          description: "Start a new repository or clone an existing one.",
          code: `# Create new repository
git init
git init my-project  # Creates directory and initializes

# Clone existing repository
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git my-folder
git clone --depth 1 https://github.com/user/repo.git  # Shallow clone (faster)

# Clone specific branch
git clone -b develop https://github.com/user/repo.git`,
          language: "bash",
          difficulty: "beginner",
          tags: ["initialization", "clone", "repository"],
        },
        {
          title: "Check Status & Diff",
          description:
            "View what's changed, staged, or needs attention in your working directory.",
          code: `# Detailed status
git status

# Short status (cleaner output)
git status -s

# View unstaged changes
git diff

# View staged changes
git diff --staged
git diff --cached  # Same as --staged

# View changes in specific file
git diff path/to/file.js

# Compare branches
git diff main..feature-branch
git diff main...feature-branch  # Shows changes since branch diverged

# Word-level diff (better for prose)
git diff --word-diff

# View changed file names only
git diff --name-only
git diff --stat`,
          language: "bash",
          difficulty: "beginner",
          tags: ["status", "diff", "changes"],
        },
        {
          title: "Stage & Commit Changes",
          description: "The bread and butter of Git - staging and committing your work.",
          code: `# Stage specific files
git add file1.js file2.js

# Stage all changes
git add .
git add -A  # Includes deletions

# Stage interactively (choose what to stage)
git add -p

# Commit staged changes
git commit -m "Add user authentication"

# Stage and commit in one command
git commit -am "Fix bug in login form"

# Commit with detailed message
git commit
# Opens editor for multi-line message:
# First line: Short summary (50 chars or less)
#
# Longer description explaining why this change
# was necessary and what it accomplishes.

# Amend last commit (change message or add files)
git add forgotten-file.js
git commit --amend --no-edit  # Keep same message
git commit --amend -m "New commit message"

# Sign commits (if configured)
git commit -S -m "Signed commit"`,
          language: "bash",
          difficulty: "beginner",
          tags: ["staging", "commit", "add"],
          documentationUrl: "https://git-scm.com/docs/git-commit",
        },
        {
          title: "View History & Logs",
          description:
            "Explore your commit history with various formatting options.",
          code: `# Basic log
git log

# Compact one-line format
git log --oneline

# Graph view with branches
git log --graph --oneline --all

# Detailed log with stats
git log --stat

# Show last N commits
git log -3
git log -n 5

# Search commits
git log --grep="bug fix"
git log --author="John"
git log --since="2 weeks ago"
git log --until="2023-12-31"

# Show commits affecting specific file
git log -- path/to/file.js
git log -p path/to/file.js  # Include diffs

# Pretty format
git log --pretty=format:"%h - %an, %ar : %s"
# %h  = short hash
# %an = author name
# %ar = author date, relative
# %s  = subject

# Show what changed in each commit
git log -p
git log -p -2  # Last 2 commits with diffs

# Find who changed each line (blame)
git blame file.js
git blame -L 10,20 file.js  # Specific lines`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["log", "history", "search", "blame"],
        },
      ],
    },
    {
      id: "branching",
      title: "Branching & Merging",
      description: "Create, switch, and manage branches for parallel development",
      examples: [
        {
          title: "Branch Operations",
          description: "Create, list, switch, and delete branches effectively.",
          code: `# List branches
git branch           # Local branches
git branch -a        # All branches (including remote)
git branch -r        # Remote branches only

# Create new branch
git branch feature-login

# Create and switch to new branch
git checkout -b feature-login
git switch -c feature-login  # Modern alternative

# Switch branches
git checkout main
git switch main  # Modern alternative

# Rename branch
git branch -m old-name new-name
git branch -m new-name  # Rename current branch

# Delete branch
git branch -d feature-completed  # Safe delete (merged only)
git branch -D feature-broken     # Force delete

# Delete remote branch
git push origin --delete feature-old

# Track remote branch
git checkout -b feature origin/feature
git branch --set-upstream-to=origin/feature feature`,
          language: "bash",
          difficulty: "beginner",
          tags: ["branch", "checkout", "switch"],
        },
        {
          title: "Merging Strategies",
          description:
            "Different ways to integrate changes from one branch into another.",
          code: `# Fast-forward merge (when possible)
git checkout main
git merge feature-branch

# No fast-forward (always create merge commit)
git merge --no-ff feature-branch

# Squash merge (combine all commits into one)
git merge --squash feature-branch
git commit -m "Add complete feature X"

# Abort merge if conflicts arise
git merge --abort

# Continue merge after resolving conflicts
git add resolved-file.js
git commit  # Completes merge

# View merged branches
git branch --merged
git branch --no-merged

# Merge specific commit
git cherry-pick abc123def

# Cherry-pick without committing (stage only)
git cherry-pick -n abc123def`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["merge", "cherry-pick", "integration"],
          documentationUrl: "https://git-scm.com/docs/git-merge",
        },
        {
          title: "Rebase for Clean History",
          description:
            "Rebase commits for a linear history. Use with caution on shared branches!",
          code: `# Basic rebase
git checkout feature
git rebase main

# Abort rebase if things go wrong
git rebase --abort

# Continue after resolving conflicts
git add resolved-file.js
git rebase --continue

# Skip problematic commit
git rebase --skip

# Interactive rebase (edit commit history)
git rebase -i HEAD~3  # Last 3 commits
git rebase -i main    # All commits since branching from main

# In interactive mode, you can:
# pick   = keep commit as-is
# reword = change commit message
# edit   = pause to amend commit
# squash = merge with previous commit
# fixup  = like squash but discard message
# drop   = remove commit

# Example interactive rebase:
# pick abc123 Add login
# squash def456 Fix typo
# reword ghi789 Add tests
# drop jkl012 Debug logging

# Update feature branch with latest main
git checkout feature
git rebase main

# Keep "theirs" during rebase conflicts
git checkout --theirs file.js
git add file.js
git rebase --continue`,
          language: "bash",
          difficulty: "advanced",
          tags: ["rebase", "history", "interactive"],
          documentationUrl: "https://git-scm.com/docs/git-rebase",
        },
      ],
    },
    {
      id: "remote",
      title: "Remote Repositories",
      description: "Work with remote repositories, push, pull, and fetch changes",
      examples: [
        {
          title: "Remote Management",
          description: "Add, list, and manage remote repository connections.",
          code: `# List remotes
git remote
git remote -v  # Show URLs

# Add remote
git remote add origin https://github.com/user/repo.git
git remote add upstream https://github.com/original/repo.git

# Change remote URL
git remote set-url origin https://github.com/user/new-repo.git

# Remove remote
git remote remove upstream

# Rename remote
git remote rename origin main-remote

# Show remote details
git remote show origin

# Prune deleted remote branches
git remote prune origin`,
          language: "bash",
          difficulty: "beginner",
          tags: ["remote", "origin", "upstream"],
        },
        {
          title: "Push, Pull & Fetch",
          description: "Sync your local repository with remotes.",
          code: `# Push to remote
git push origin main
git push origin feature-branch

# Push and set upstream (first time)
git push -u origin feature-branch

# Push all branches
git push origin --all

# Push tags
git push origin --tags

# Force push (DANGEROUS - overwrites remote history)
git push --force origin feature-branch
git push --force-with-lease origin feature-branch  # Safer

# Fetch from remote (doesn't merge)
git fetch origin
git fetch --all  # All remotes

# Pull (fetch + merge)
git pull origin main
git pull --rebase origin main  # Rebase instead of merge

# Pull with autostash
git pull --rebase --autostash

# Clone specific depth (faster for large repos)
git clone --depth 1 https://github.com/user/repo.git`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["push", "pull", "fetch", "sync"],
          documentationUrl: "https://git-scm.com/docs/git-push",
        },
        {
          title: "Syncing Forks",
          description:
            "Keep your fork up-to-date with the original repository.",
          code: `# Add upstream remote (original repo)
git remote add upstream https://github.com/original/repo.git

# Fetch upstream changes
git fetch upstream

# Merge upstream/main into your main
git checkout main
git merge upstream/main

# Or rebase your changes on top of upstream
git checkout main
git rebase upstream/main

# Push updated main to your fork
git push origin main

# Complete workflow for fork sync
git fetch upstream
git checkout main
git rebase upstream/main
git push origin main --force-with-lease`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["fork", "upstream", "sync", "collaboration"],
        },
      ],
    },
    {
      id: "undoing",
      title: "Undoing Changes",
      description:
        "Fix mistakes, revert commits, and recover lost work. Every developer's lifesaver!",
      examples: [
        {
          title: "Undo Unstaged Changes",
          description:
            "Discard changes in your working directory that haven't been staged.",
          code: `# Discard changes in specific file
git checkout -- file.js
git restore file.js  # Modern alternative

# Discard all unstaged changes
git checkout -- .
git restore .

# Discard changes in specific directory
git restore src/

# Show what would be removed (dry run)
git clean -n

# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Remove ignored files too
git clean -fdx`,
          language: "bash",
          difficulty: "beginner",
          tags: ["undo", "discard", "restore", "clean"],
        },
        {
          title: "Unstage Files",
          description:
            "Remove files from staging area without losing the changes.",
          code: `# Unstage specific file
git reset HEAD file.js
git restore --staged file.js  # Modern alternative

# Unstage all files
git reset HEAD
git restore --staged .

# Unstage and discard changes
git reset --hard HEAD`,
          language: "bash",
          difficulty: "beginner",
          tags: ["unstage", "reset", "staging"],
        },
        {
          title: "Undo Commits",
          description:
            "Various ways to undo commits depending on what you need.",
          code: `# Undo last commit but keep changes staged
git reset --soft HEAD~1

# Undo last commit and unstage changes
git reset HEAD~1
git reset --mixed HEAD~1  # Same as above

# Undo last commit and discard changes (DANGEROUS)
git reset --hard HEAD~1

# Undo multiple commits
git reset --soft HEAD~3  # Last 3 commits

# Undo to specific commit
git reset --soft abc123def

# Create new commit that undoes a previous commit
git revert abc123def

# Revert multiple commits
git revert abc123..def456

# Revert without committing (stage changes only)
git revert -n abc123def

# Revert merge commit
git revert -m 1 merge-commit-hash`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["undo", "reset", "revert", "commits"],
          documentationUrl: "https://git-scm.com/docs/git-reset",
        },
        {
          title: "Fix Last Commit",
          description:
            "Change the last commit message or add forgotten files.",
          code: `# Change last commit message
git commit --amend -m "Better commit message"

# Add forgotten files to last commit
git add forgotten-file.js
git commit --amend --no-edit

# Change author of last commit
git commit --amend --author="Name <email@example.com>"

# Change timestamp of last commit
git commit --amend --date="now"

# WARNING: Never amend commits that have been pushed!
# If you must, force push:
git push --force-with-lease origin branch-name`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["amend", "fix", "commit"],
        },
        {
          title: "Recover Lost Commits",
          description:
            "Use reflog to recover commits that seem lost. Git rarely loses data!",
          code: `# View reflog (history of HEAD movements)
git reflog

# Reflog shows:
# abc123 HEAD@{0}: commit: Add feature
# def456 HEAD@{1}: checkout: moving from main to feature
# ghi789 HEAD@{2}: reset: moving to HEAD~1

# Recover lost commit
git checkout abc123
git cherry-pick abc123
git reset --hard abc123

# Recover deleted branch
git reflog
git checkout -b recovered-branch HEAD@{2}

# Reflog for specific branch
git reflog show feature-branch

# Reflog with dates
git reflog --date=iso`,
          language: "bash",
          difficulty: "advanced",
          tags: ["reflog", "recovery", "lost-commits"],
          documentationUrl: "https://git-scm.com/docs/git-reflog",
        },
      ],
    },
    {
      id: "stashing",
      title: "Stashing Work",
      description:
        "Temporarily save uncommitted changes to switch contexts quickly",
      examples: [
        {
          title: "Basic Stashing",
          description:
            "Save your work in progress without committing when you need to switch branches.",
          code: `# Stash current changes
git stash
git stash push  # Same as above

# Stash with descriptive message
git stash push -m "Work in progress on login form"

# Include untracked files
git stash -u
git stash --include-untracked

# Stash everything (including ignored files)
git stash -a
git stash --all

# List stashes
git stash list

# Show stash contents
git stash show
git stash show -p  # Show full diff
git stash show stash@{1}  # Specific stash`,
          language: "bash",
          difficulty: "beginner",
          tags: ["stash", "temporary", "save"],
        },
        {
          title: "Apply & Manage Stashes",
          description: "Restore stashed work and manage multiple stashes.",
          code: `# Apply most recent stash
git stash apply

# Apply specific stash
git stash apply stash@{2}

# Apply and remove from stash list (pop)
git stash pop

# Apply stash to new branch
git stash branch new-branch-name

# Remove specific stash
git stash drop stash@{1}

# Clear all stashes
git stash clear

# Create stash of specific files only
git stash push -m "Stash utils only" -- src/utils/

# Stash only staged changes
git stash push --staged`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["stash", "apply", "pop", "management"],
          documentationUrl: "https://git-scm.com/docs/git-stash",
        },
      ],
    },
    {
      id: "conflicts",
      title: "Resolving Conflicts",
      description: "Handle merge conflicts like a pro",
      examples: [
        {
          title: "Identify & Resolve Conflicts",
          description:
            "When Git can't automatically merge changes, you'll need to resolve conflicts manually.",
          code: `# Check which files have conflicts
git status

# View conflict markers in file:
<<<<<<< HEAD
Your current changes
=======
Incoming changes
>>>>>>> branch-name

# Choose version to keep:
# Option 1: Keep your version
git checkout --ours conflicted-file.js

# Option 2: Keep their version
git checkout --theirs conflicted-file.js

# Option 3: Edit manually, then:
git add conflicted-file.js

# After resolving all conflicts:
git commit  # For merge
git rebase --continue  # For rebase

# Abort if you want to start over:
git merge --abort
git rebase --abort

# View conflict diff
git diff
git diff --name-only --diff-filter=U  # List conflicted files`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["conflicts", "merge", "resolution"],
        },
        {
          title: "Merge Tools",
          description:
            "Use visual merge tools for easier conflict resolution.",
          code: `# Configure merge tool
git config --global merge.tool vimdiff
git config --global merge.tool vscode
git config --global merge.tool kdiff3

# VS Code merge tool configuration
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait --merge $REMOTE $LOCAL $BASE $MERGED'

# Launch merge tool
git mergetool

# After resolving with tool
git commit

# Don't create .orig backup files
git config --global mergetool.keepBackup false`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["mergetool", "visual", "conflicts"],
        },
      ],
    },
    {
      id: "advanced",
      title: "Advanced Techniques",
      description:
        "Power user commands for complex scenarios and workflow optimization",
      examples: [
        {
          title: "Submodules",
          description:
            "Include other Git repositories as subdirectories within your project.",
          code: `# Add submodule
git submodule add https://github.com/user/library.git lib/library

# Clone repo with submodules
git clone --recursive https://github.com/user/repo.git

# Initialize submodules after cloning
git submodule init
git submodule update

# Update all submodules
git submodule update --remote

# Update specific submodule
git submodule update --remote lib/library

# Remove submodule
git submodule deinit lib/library
git rm lib/library
rm -rf .git/modules/lib/library`,
          language: "bash",
          difficulty: "advanced",
          tags: ["submodules", "dependencies", "nested"],
        },
        {
          title: "Bisect - Find Bug Introduction",
          description:
            "Binary search through commit history to find when a bug was introduced.",
          code: `# Start bisecting
git bisect start

# Mark current commit as bad
git bisect bad

# Mark known good commit
git bisect good abc123

# Git checks out middle commit, test it, then:
git bisect good  # If this commit is fine
git bisect bad   # If this commit has the bug

# Git will continue binary search automatically
# Repeat until you find the problematic commit

# View bisect log
git bisect log

# Finish bisecting
git bisect reset

# Automated bisect with test script
git bisect start HEAD abc123
git bisect run npm test`,
          language: "bash",
          difficulty: "advanced",
          tags: ["bisect", "debugging", "binary-search"],
          documentationUrl: "https://git-scm.com/docs/git-bisect",
        },
        {
          title: "Worktrees - Multiple Branches Simultaneously",
          description:
            "Work on multiple branches at once without stashing or losing context.",
          code: `# Create worktree for feature branch
git worktree add ../feature-branch feature-branch

# Create new branch in worktree
git worktree add -b hotfix ../hotfix

# List worktrees
git worktree list

# Remove worktree
git worktree remove ../feature-branch

# Prune deleted worktrees
git worktree prune

# Use case example:
# Main project in ~/project
# Feature work in ~/project-feature
# Hotfix in ~/project-hotfix
# All sharing same .git directory!`,
          language: "bash",
          difficulty: "advanced",
          tags: ["worktree", "multiple-branches", "parallel"],
        },
        {
          title: "Sparse Checkout - Partial Clone",
          description:
            "Clone only specific directories from large repositories.",
          code: `# Initialize repo without checking out files
git clone --no-checkout https://github.com/user/large-repo.git
cd large-repo

# Enable sparse checkout
git sparse-checkout init --cone

# Specify directories to checkout
git sparse-checkout set src/components tests/unit

# Add more directories
git sparse-checkout add docs

# List sparse checkout patterns
git sparse-checkout list

# Disable sparse checkout
git sparse-checkout disable`,
          language: "bash",
          difficulty: "advanced",
          tags: ["sparse-checkout", "partial", "performance"],
        },
        {
          title: "Filter-Branch - Rewrite History",
          description:
            "Powerful but dangerous - rewrite commit history across entire repository.",
          code: `# Remove file from all history (e.g., committed secrets)
git filter-branch --tree-filter 'rm -f secrets.txt' HEAD

# Modern alternative: git filter-repo (faster, safer)
# Install: pip install git-filter-repo
git filter-repo --path secrets.txt --invert-paths

# Change author email in all commits
git filter-branch --commit-filter '
  if [ "$GIT_AUTHOR_EMAIL" = "old@email.com" ];
  then
    GIT_AUTHOR_EMAIL="new@email.com";
    GIT_COMMITTER_EMAIL="new@email.com";
    git commit-tree "$@";
  else
    git commit-tree "$@";
  fi' HEAD

# WARNING: These commands rewrite history!
# Only use on repositories you haven't shared yet
# Or coordinate with your team and force-push`,
          language: "bash",
          difficulty: "expert",
          tags: ["filter-branch", "history-rewriting", "dangerous"],
        },
      ],
    },
    {
      id: "tips-tricks",
      title: "Tips & Tricks",
      description:
        "Pro tips, shortcuts, and lesser-known features to boost productivity",
      examples: [
        {
          title: "Search & Find Commits",
          description: "Powerful ways to find specific changes in your history.",
          code: `# Find commits that added/removed specific text
git log -S "function_name"
git log -G "regex.*pattern"

# Find commits affecting specific line range
git log -L 10,20:path/to/file.js

# Search commit messages
git log --grep="bug"
git log --grep="feature" --grep="fix" --all-match

# Find commits by date
git log --since="2 weeks ago"
git log --after="2024-01-01" --before="2024-12-31"

# Find who deleted a file
git log --full-history -- path/to/deleted/file.js

# Find dangling commits
git fsck --lost-found`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["search", "find", "history"],
        },
        {
          title: "Ignore Files (gitignore)",
          description:
            "Prevent specific files from being tracked by Git.",
          code: `# Create .gitignore file
cat > .gitignore << EOF
# Dependencies
node_modules/
vendor/

# Build outputs
dist/
build/
*.min.js

# Environment files
.env
.env.local
*.env.*

# IDE files
.vscode/
.idea/
*.swp

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
logs/
EOF

# Ignore files globally
git config --global core.excludesfile ~/.gitignore_global

# Stop tracking already tracked file
git rm --cached file-to-ignore.txt
git rm -r --cached node_modules/

# View ignored files
git status --ignored

# Check if file is ignored
git check-ignore -v file.txt`,
          language: "bash",
          difficulty: "beginner",
          tags: ["gitignore", "ignore", "tracking"],
        },
        {
          title: "Git Hooks - Automate Workflows",
          description:
            "Run scripts automatically on Git events like commit or push.",
          code: `# Hooks are in .git/hooks/
cd .git/hooks

# Common hooks:
# pre-commit    - Before commit is created
# pre-push      - Before push to remote
# commit-msg    - Edit/validate commit message

# Example: pre-commit hook to run tests
cat > pre-commit << 'EOF'
#!/bin/bash
npm test
if [ $? -ne 0 ]; then
  echo "Tests failed! Commit aborted."
  exit 1
fi
EOF
chmod +x pre-commit

# Example: commit-msg hook to enforce format
cat > commit-msg << 'EOF'
#!/bin/bash
commit_msg=$(cat $1)
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore):"; then
  echo "Commit message must start with: feat:|fix:|docs:|style:|refactor:|test:|chore:"
  exit 1
fi
EOF
chmod +x commit-msg

# Skip hooks (use sparingly)
git commit --no-verify
git push --no-verify`,
          language: "bash",
          difficulty: "advanced",
          tags: ["hooks", "automation", "workflow"],
        },
        {
          title: "Optimize Repository",
          description:
            "Speed up your repository and reduce its size.",
          code: `# Garbage collection
git gc

# Aggressive garbage collection
git gc --aggressive --prune=now

# Verify repository integrity
git fsck

# Count objects in repository
git count-objects -v

# Find large files in history
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  sed -n 's/^blob //p' | \
  sort --numeric-sort --key=2 | \
  tail -10

# Prune remote tracking branches that no longer exist
git fetch --prune

# Optimize fetch/push performance
git config --global feature.manyFiles true
git config --global index.threads true`,
          language: "bash",
          difficulty: "advanced",
          tags: ["optimization", "performance", "cleanup"],
        },
      ],
    },
  ],
};

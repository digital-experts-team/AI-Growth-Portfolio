#!/usr/bin/env bash
set -e

REPO_NAME="digital-experts-team/AI-Growth-Portfolio"
BRANCH="main"

action="${1:-status}"

case "$action" in
  token)
    if [ -z "$2" ]; then
      echo "Usage: ./sync-git.sh token <GITHUB_PERSONAL_ACCESS_TOKEN>"
      exit 1
    fi
    TOKEN="$2"
    git remote set-url origin "https://${TOKEN}@github.com/${REPO_NAME}.git"
    echo "Configured remote origin to use HTTPS with provided GitHub Personal Access Token."
    ;;
  ssh)
    git remote set-url origin "git@github.com:${REPO_NAME}.git"
    echo "Configured remote origin to use SSH (git@github.com:${REPO_NAME}.git)."
    ;;
  pull)
    echo "Pulling latest changes from ${REPO_NAME}..."
    git pull origin "${BRANCH}" --allow-unrelated-histories || git pull origin master --allow-unrelated-histories
    ;;
  push)
    MSG="${2:-Update from AI Studio}"
    echo "Committing and pushing to ${REPO_NAME}..."
    git add .
    git commit -m "$MSG" || echo "No changes to commit"
    git push origin "${BRANCH}" || git push -u origin "${BRANCH}"
    ;;
  status)
    git status
    git remote -v
    ;;
  *)
    echo "Usage: ./sync-git.sh [token <token> | ssh | pull | push <message> | status]"
    ;;
esac

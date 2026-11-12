#!/usr/bin/env bash
# Doitx desktop installer for Linux x86_64.
# Usage: curl -fsSL https://doitx.ai/install.sh | bash

set -euo pipefail

DOWNLOAD_BASE_URL="${DOWNLOAD_BASE_URL:-https://doitx.ai/releases}"
API="$DOWNLOAD_BASE_URL/latest"
ICON_URL="https://doitx.ai/icon-512.png"
DATA_HOME="${XDG_DATA_HOME:-$HOME/.local/share}"
BIN_DIR="${XDG_BIN_HOME:-$HOME/.local/bin}"
APP_DIR="$DATA_HOME/doitx"
APP="$APP_DIR/Doitx.AppImage"
ICON_DIR="$DATA_HOME/icons/hicolor/256x256/apps"
APPS_DIR="$DATA_HOME/applications"

die() {
  printf 'Doitx install: %s\n' "$1" >&2
  exit 1
}

command -v curl >/dev/null 2>&1 || die "curl is required."

case "$(uname -m)" in
  x86_64 | amd64) ;;
  *) die "Doitx ships x86_64 Linux builds only (detected $(uname -m))." ;;
esac

printf 'Looking up the latest Doitx release...\n'
asset_url="$(
  curl -fsSL -H "Accept: application/vnd.github+json" "$API" |
    grep -o '"browser_download_url"[[:space:]]*:[[:space:]]*"[^"]*\.AppImage"' |
    head -n 1 |
    sed -E 's/.*"(https:[^"]*)"/\1/'
)"
[ -n "$asset_url" ] || die "could not find a Linux AppImage in the latest release."

mkdir -p "$APP_DIR" "$BIN_DIR"
tmp="$(mktemp "$APP_DIR/.doitx.XXXXXX")"
trap 'rm -f "$tmp"' EXIT

printf 'Downloading %s...\n' "$(basename "$asset_url")"
curl -fL --retry 3 --progress-bar "$asset_url" -o "$tmp"

magic="$(head -c 4 "$tmp" | od -An -tx1 | tr -d ' \n')"
[ "$magic" = "7f454c46" ] || die "the download is not a Linux AppImage."

chmod 755 "$tmp"
mv "$tmp" "$APP"
ln -sfn "$APP" "$BIN_DIR/doitx"

mkdir -p "$ICON_DIR" "$APPS_DIR"
if curl -fsSL "$ICON_URL" -o "$ICON_DIR/doitx.png"; then
  :
else
  rm -f "$ICON_DIR/doitx.png"
fi

cat >"$APPS_DIR/doitx.desktop" <<EOF
[Desktop Entry]
Type=Application
Name=Doitx
Comment=Your team of always-on agents
Exec="$APP" %U
TryExec=$APP
Icon=doitx
Terminal=false
Categories=Utility;Office;
EOF

if command -v update-desktop-database >/dev/null 2>&1; then
  update-desktop-database "$APPS_DIR" >/dev/null 2>&1 || true
fi

printf '\nDoitx is installed at %s\n' "$APP"
printf 'Launch it from your application menu or run: doitx\n'
case ":$PATH:" in
  *":$BIN_DIR:"*) ;;
  *) printf 'Add %s to PATH to run "doitx" from a terminal.\n' "$BIN_DIR" ;;
esac

if command -v ldconfig >/dev/null 2>&1 && ! ldconfig -p 2>/dev/null | grep -q 'libfuse\.so\.2'; then
  printf 'Note: this AppImage needs libfuse2 on most distributions (for example: sudo apt install libfuse2).\n'
fi

if ! command -v docker >/dev/null 2>&1; then
  printf 'Note: Doitx runs its local backend in Docker. Install Docker Engine to use "This computer": https://docs.docker.com/engine/install/\n'
fi

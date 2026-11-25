#!/bin/sh
# Rebuild and publish the page from the browser diff (BILI.diff in tools/bili.js).
# usage: PW=... sh tools/update.sh /path/to/diff.json
# Prints UNCHANGED (nothing pushed) or PUSHED <commit>.
set -e
cd "$(dirname "$0")/.."
[ -n "$PW" ] || { echo "set PW"; exit 1; }
python3 -c "import opencc" 2>/dev/null || pip install -q --break-system-packages opencc-python-reimplemented
PW="$PW" node tools/prev.js index.html /tmp/prev.json
python3 tools/make_data.py /tmp/prev.json "$1" src/data.json
SAME=$(python3 -c "
import json;p=json.load(open('/tmp/prev.json',encoding='utf-8'));n=json.load(open('src/data.json',encoding='utf-8'))
print(int(p['D']==n['D'] and p['F']==n['F']))")
if [ "$SAME" = 1 ]; then echo UNCHANGED; exit 0; fi
node src/build.js src/data.json plain.html
PW="$PW" node src/encrypt.js plain.html index.html
PW="$PW" node tools/prev.js index.html /tmp/check.json >/dev/null
git add index.html
git -c user.name="Claude" -c user.email="noreply@anthropic.com" commit -q -m "Daily update $(TZ=Asia/Taipei date +%F): $(python3 -c "import json;print(len(json.load(open('src/data.json',encoding='utf-8'))['D']))") videos"
git push -q origin HEAD
echo "PUSHED $(git rev-parse --short HEAD)"

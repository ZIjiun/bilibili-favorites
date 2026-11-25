#!/usr/bin/env python3
"""Apply the browser diff (BILI.diff in tools/bili.js) to the data already on the page.

usage: python3 tools/make_data.py prev.json diff.json src/data.json
  prev.json  {"D":[...],"F":[...]} decrypted from index.html by tools/prev.js
  diff.json  {"F":[folder titles],"moved":[[bv,fi]],"removed":[bv],"added":[{bv,fi,fav,t,up,dur,intro,cover}]}
New titles and intros are converted to Traditional Chinese (Taiwan, OpenCC s2twp); UP names are kept.
Rows are ordered newest favourite first. Needs: pip install opencc-python-reimplemented"""
import json, re, sys, datetime
from opencc import OpenCC

prev = json.load(open(sys.argv[1], encoding='utf-8'))
df = json.load(open(sys.argv[2], encoding='utf-8'))
out = sys.argv[3]
tw, s2t = OpenCC('s2twp'), OpenCC('s2t')
TZ = datetime.timezone(datetime.timedelta(hours=8))
clean = lambda t: re.sub(r'\s+', ' ', t or '').strip()

def dur(s):
    s = int(s or 0); h, m, sec = s // 3600, s % 3600 // 60, s % 60
    return f'{h}:{m:02d}:{sec:02d}' if h else f'{m}:{sec:02d}'

bvid = lambda r: r[3].rsplit('/', 1)[-1]
# folder indexes in prev rows refer to prev F; re-map them by title onto the new F
newidx = {t: i for i, t in enumerate(df['F'])}
moved, removed = dict(df['moved']), set(df['removed'])
D = []
for r in prev['D']:
    bv = bvid(r)
    if bv in removed:
        continue
    r = list(r)
    r[2] = moved.get(bv, newidx.get(prev['F'][r[2]], r[2]))
    D.append(r)
for d in df['added']:
    fav = int(d['fav'])
    cover = re.sub(r'^https?://i\d\.hdslb\.com/bfs/', '', d['cover'] or '')
    D.append([tw.convert(clean(d['t'])), d['up'], d['fi'], 'https://www.bilibili.com/video/' + d['bv'], dur(d['dur']),
              datetime.datetime.fromtimestamp(fav, TZ).strftime('%Y-%m-%d'), tw.convert(clean(d['intro'])) or '-', 0, cover, fav])
# OpenCC s2twp phrase slips seen in real titles (e.g. 和面试 → 和麵試); applied to every row
FIX = {'麵試': '面試', '麵對': '面對', '麵臨': '面臨', '麵子': '面子', '麵向': '面向'}
for r in D:
    for k in (0, 6):
        for a, b in FIX.items():
            r[k] = r[k].replace(a, b)
D.sort(key=lambda r: -r[9])

# per-character simplified→traditional map so a search typed either way matches
override = {'干': '乾', '里': '裡', '发': '發', '后': '後', '台': '台', '只': '只'}
MA, MB = [], []
for c in (chr(x) for x in range(0x4e00, 0xa000)):
    t = override.get(c) or s2t.convert(c)
    if len(t) == 1 and t != c:
        MA.append(c); MB.append(t)
gen = datetime.datetime.now(TZ).strftime('%Y-%m-%d')
json.dump({'D': D, 'F': df['F'], 'gen': gen, 'MA': ''.join(MA), 'MB': ''.join(MB)}, open(out, 'w', encoding='utf-8'), ensure_ascii=False)
print('rows', len(D), 'added', len(df['added']), 'moved', len(moved), 'removed', len(removed), 'folders', len(df['F']))

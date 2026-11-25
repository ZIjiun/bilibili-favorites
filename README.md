# 收藏島：操作手冊

我的 Bilibili 收藏目錄網站。網址：<https://zijiun.github.io/bilibili-favorites/>（要密碼）。

整個網站是一個加密的 `index.html`：打開先看到密碼閘門，解開後才是收藏島本體。

> 這個 repo 是公開的。**密碼、`src/data.json`、`src/prev.json`、`plain.html` 都不能提交**（已在 `.gitignore`）。

---

## 檔案結構

| 路徑 | 用途 |
|---|---|
| `index.html` | 線上發布的頁面（密碼閘門 + 加密後的收藏島） |
| `src/app.js`、`src/art.js`、`src/style.css` | 收藏島本體（地圖、搜尋、卡片） |
| `src/gate.head.html` | 密碼閘門的外殼 |
| `src/build.js` | 資料 + 原始碼 → 未加密的 `plain.html` |
| `src/encrypt.js` | `plain.html` → 加密的 `index.html`（沿用舊 salt，「記住我」不會失效） |
| `tools/prev.js` | 從 `index.html` 解出目前的資料（`{D,F}`） |
| `tools/republish.js` | 只改原始碼時，用現有資料重組並重新加密 |
| `tools/update.sh` | 每日更新：套用收藏變動 → 組頁 → 加密 → 提交推送 |
| `tools/bili.js`、`tools/make_data.py` | 每日更新用：抓收藏變動、合併成新資料 |
| `PRODUCT.md`、`DESIGN.md` | 產品與設計規格（島嶼世界、色票、元件） |

---

## 先設定密碼（每次開新的 PowerShell 視窗）

輸入時不會顯示字元，用完記得清掉。

```powershell
cd $HOME\Documents\bilibili-favorites
$s = Read-Host "收藏島密碼" -AsSecureString
$env:PW = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($s))
```

用完：

```powershell
Remove-Item Env:PW
```

---

## 常用操作

### 1. 改了原始碼，要立刻上線

```powershell
git pull
# （先設定密碼）
node tools/republish.js
Remove-Item Env:PW
git add index.html
git commit -m "Republish"
git push
```

看到「完成：index.html 已用新版 src 重新加密」就成功。GitHub Pages 一兩分鐘後更新，瀏覽器按 Ctrl+F5。

不急的話也可以只推原始碼：下次每日更新有資料變動時，會自動用新版原始碼重組。

### 2. 本機預覽（不加密）

```powershell
# （先設定密碼）
node tools/republish.js      # 順便產出 src/data.json 和 plain.html
Remove-Item Env:PW
start plain.html
```

之後只改原始碼、不需要新資料時：

```powershell
node src/build.js src/data.json plain.html
start plain.html
```

> `republish.js` 會改寫 `index.html`。只想預覽、不想發布時，用完執行 `git checkout index.html` 還原。

### 3. 只解出資料看看

```powershell
# （先設定密碼）
node tools/prev.js index.html src/prev.json
Remove-Item Env:PW
```

### 4. 每日更新（手動跑）

```powershell
# 需要 bash（Git Bash 或 WSL）、Python、opencc
PW=... sh tools/update.sh /path/to/diff.json
```

`diff.json` 由 `tools/bili.js` 在已登入 Bilibili 的瀏覽器裡產生。輸出 `UNCHANGED`（沒變動、沒推送）或 `PUSHED <commit>`。

---

## 兩台電腦

- **程式碼**：走 git。換電腦前 `git push`，到另一台先 `git pull`。
- **資料**：不另外同步。需要時用密碼從 `index.html` 解出來（上面第 3 項）。
- **密碼**：只放密碼管理員，不進 repo、不進雲端資料夾。
- `git status` 在 Claude 的 Linux 環境裡可能顯示一堆 `M`：那是換行字元不同，Windows 上是乾淨的，不用處理。

---

## 出問題時

| 狀況 | 處理 |
|---|---|
| `密碼不對，沒有改動任何檔案` | 重新設定密碼再跑 |
| `node` 找不到 | 安裝 Node.js（LTS） |
| 網站沒變 | 等一兩分鐘；Ctrl+F5；確認 `git push` 成功 |
| 想回到上一版 | `git log` 找到 commit，`git revert <commit>` 後再 push |

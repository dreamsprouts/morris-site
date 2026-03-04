# 部署說明（GitHub + Cloudflare Pages）

專案設定在 **GitHub dreamsprouts** 與 **Cloudflare**，用 CLI 完成推送與部署。

---

## 一、GitHub（dreamsprouts）

### 1. 在 morris-site 建立獨立 repo 並推上去

```bash
cd ~/Projects/morris-site

# 若尚未有 .git（獨立 repo）
git init
git add .
git commit -m "Initial commit: Morris 個人網站"

# 登入 GitHub CLI（你來登入 dreamsprouts）
gh auth login

# 在 GitHub 建立 repo 並推送（repo 名：morris-site，帳號：dreamsprouts）
gh repo create dreamsprouts/morris-site --public --source=. --remote=origin --push
```

若 repo 已存在，改為：

```bash
git remote add origin https://github.com/dreamsprouts/morris-site.git
git branch -M main
git push -u origin main
```

---

## 二、Cloudflare Pages

### 1. 安裝依賴（含 wrangler）

```bash
cd ~/Projects/morris-site
npm install
```

### 2. 登入 Cloudflare（你來登入）

```bash
npx wrangler login
```

瀏覽器會開起，完成登入後 CLI 即可用。

### 3. 建立 Pages 專案（僅第一次）

```bash
npx wrangler pages project create morris-site --production-branch=main
```

若已存在可略過。

### 4. 建置並部署

```bash
npm run deploy
```

等同：`npm run build` 後執行 `wrangler pages deploy dist --project-name=morris-site`。

部署完成會給一個 `*.pages.dev` 網址。之後要綁 **morris.futurin.tw**：在 Cloudflare Pages 專案裡加 Custom domain，再到 GoDaddy 把 `morris` CNAME 指到該 `*.pages.dev`。

---

## 之後每次更新

```bash
git add .
git commit -m "說明"
git push
npm run deploy
```

若改為用 Cloudflare 後台「連 GitHub 自動建置」，則 push 後會自動 build + deploy，可不必再跑 `npm run deploy`。

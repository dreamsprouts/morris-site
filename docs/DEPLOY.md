# 部署說明（地端 → GitHub → 自動部署 Cloudflare Pages）

流程：**地端 push 到 GitHub `main`** → GitHub Actions 自動 **build + 部署到 Cloudflare Pages**。

---

## 一、一次性設定：GitHub Secrets

讓 GitHub Actions 能代你部署，需在 repo 裡設定 Secret：

1. 開 **GitHub** → [dreamsprouts/morris-site](https://github.com/dreamsprouts/morris-site) → **Settings** → **Secrets and variables** → **Actions**。
2. 新增 **Repository secret**：
   - **Name**：`CLOUDFLARE_API_TOKEN`
   - **Value**：到 [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens) → **Create Token** → 選 **Edit Cloudflare Workers** 範本（或自訂），權限至少 **Account** → **Cloudflare Pages** → **Edit**；建立後複製 Token，貼到 GitHub Secret。

存好後，之後每次 **push 到 `main`** 都會觸發 `.github/workflows/deploy.yml`：`npm ci` → `npm run build` → `wrangler pages deploy dist --project-name=morris-site`。

---

## 二、之後每次更新（地端）

```bash
cd ~/Projects/morris-site
git add .
git commit -m "說明"
git push
```

推完到 **GitHub** → **Actions** 看執行狀態；成功後站點會更新在 **https://morris-site.pages.dev**。

---

## 三、自訂網域 morris.futurin.tw

1. **Cloudflare**：[Workers & Pages](https://dash.cloudflare.com) → **morris-site** → **Custom domains** → **Set up a custom domain** → 輸入 `morris.futurin.tw`，照畫面指示操作。
2. **GoDaddy**（futurin.tw 在此管理）：DNS 新增一筆 **CNAME**：  
   - 名稱：`morris`（或 `morris.futurin.tw` 依 GoDaddy 欄位）  
   - 指向：Cloudflare 給的目標（例如 `morris-site.pages.dev` 或專案專用 hostname）。  
   存檔後等 DNS 傳播（幾分鐘到幾小時）。
3. 回 **Cloudflare** 確認該網域狀態為 **Active**；SSL 憑證會由 Cloudflare 自動發行。

---

## 四、排除 ERR_SSL_VERSION_OR_CIPHER_MISMATCH

若開 **morris.futurin.tw** 出現「無法安全連線」或 `ERR_SSL_VERSION_OR_CIPHER_MISMATCH`，多半是 **DNS 指錯** 或 **尚未完全走 Cloudflare**。請依序檢查：

1. **GoDaddy DNS**  
   - `morris` 必須是 **CNAME** 指到 Cloudflare Pages 的目標（例如 `morris-site.pages.dev`），**不要**用 A 記錄指到其他 IP。  
   - 若有舊的 A 記錄或指到別的主機，先刪除，只留一筆 CNAME。

2. **Cloudflare Pages 自訂網域**  
   - [Workers & Pages](https://dash.cloudflare.com) → **morris-site** → **Custom domains**。  
   - 確認 `morris.futurin.tw` 已新增且狀態為 **Active**（若為 Pending，等 DNS 傳播與憑證發行，可再等幾分鐘到數十分鐘）。

3. **確認實際連到誰**  
   - 本機執行：`dig morris.futurin.tw CNAME` 或 `nslookup morris.futurin.tw`。  
   - 應看到 CNAME 指向 `*.pages.dev` 或 Cloudflare 提供的 hostname；若指到其他網域或 IP，回 GoDaddy 修正。

4. **清除快取再試**  
   - 修正 DNS 後：瀏覽器關掉分頁、清除快取，或開無痕視窗再開 https://morris.futurin.tw。

5. **先確認 .pages.dev 正常**  
   - 若 https://morris-site.pages.dev 可開，代表 Pages 與 build 沒問題，問題在自訂網域／DNS／SSL；照上面步驟調整即可。

---

## 五、本機手動部署（選用）

若想不經 GitHub 直接上傳（例如測試）：

```bash
npx wrangler login   # 僅第一次或登出後
npm run deploy       # build + wrangler pages deploy dist
```

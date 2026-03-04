# morris-site 專案規格（完整規劃）

**用途**：專案內唯一完整規劃與選型文件；不依賴 Cursor Plan，README 不存放計畫細節。  
**讀者**：Human、實作 Agent、內容 Agent、交接之 Agent。  
**最後更新**：2026-03-04

---

## 1. 專案目的與第一版範圍

- **目的**：Morris 個人網站第一版，以 Manifesto 形式對外呈現 Position、做什麼、為什麼（Why）；供訪談對象、潛在合作夥伴與 Mentor 了解信念與方向。
- **第一版**：多頁、首頁為 Landing 敘事線；各頁有明確目的；Day 1 繁體中文，後續補英文、日文。
- **架構**：多頁；Projects / Blog 預留銜接 CMS，Day 1 不用 CMS。

---

## 2. 頁面清單與目的

| 頁面 | 目的 | Day 1 |
|------|------|-------|
| **首頁** | Landing 敘事線，有故事、有引導；每 cut 可「前往查看更多」。見 §3。 | 完整敘事 + 各 cut CTA |
| **Manifesto** | 獨立宣言頁，寫得像宣言。 | 有內容 |
| **About** | 獨立「我是誰」。 | 有內容 |
| **Projects** | 精選專案；可標「完成／進行中／規劃中」。預留未來接 CMS、LinkedIn 等。 | 預開 3 格，內容可後補 |
| **Blog** | 文章列表 + 單篇；預留未來接 CMS。 | **3 篇文**（1 篇迷思破除 + 2 篇 TBD） |
| **Contact** | 所有聯絡管道（社群）+ 簡單表單。未來：表單存 DB、檢閱、Calendly 類預約。 | 連結 + 表單 UI |

---

## 3. 首頁敘事線（Hook first）

| 順序 | Cut | 內容重點 | 引導到 |
|------|-----|----------|--------|
| 1 | **Hook** | 我與世界的定位：當代人最有感的一個提問／slogan（例如 AI 焦慮）。 | — |
| 2 | **我信什麼** | 對那個問題的回答、我的立場。 | → Manifesto |
| 3 | **為什麼** | 迷思破除、脈絡。 | → **一篇精選 blog 文**（迷思破除那篇） |
| 4 | **Why Me** | 我是誰、為什麼由我來講、發起這宣言。 | → About |
| 5 | **我做過什麼** | 憑什麼講、未來明確行動；標記「做過的／進行中／準備啟動」。 | → Projects |
| 6 | **你可以怎麼做** | 邀請 coffee chat、歡迎聊聊。 | → Contact |

首頁無 Blog 區塊，只有「為什麼」cut 連到一篇 blog 文。

---

## 4. Blog Day 1

- **3 篇文**：第 1 篇 = 迷思破除／脈絡（= 首頁「為什麼」cut 連結的那篇）；第 2、3 篇主題後續討論。
- 未來接 CMS；Day 1 可靜態或簡單資料結構。

---

## 5. 技術選型

| 項目 | 選型 | 說明 |
|------|------|------|
| **框架** | Vite + React + TypeScript + Tailwind | build 快、靜態輸出單純；與 content schema 讀取方式一致。 |
| **內容** | build 時讀 `content/{locale}/`，型別對齊 [content-schema.md](../content-schema.md) | Day 1 繁中（`content/zh/`）；後續 en/ja 同 schema。 |
| **路由** | React Router；Day 1 繁中可不帶 locale 前綴，之後 i18n 用 `/zh/`、`/en/`、`/ja/` | 靜態站即可。 |
| **表單** | Day 1：第三方送信（如 Formspree）或 Cloudflare Pages Function | 之後存 DB／Calendly 再擴。 |

---

## 6. 部署與網域

| 項目 | 選型 | 說明 |
|------|------|------|
| **平台** | Cloudflare Pages | Build command：`npm run build`；Output：`dist`。 |
| **網域** | **morris.futurin.tw** | futurin.tw 於 GoDaddy；子網域 morris。上線後在 Cloudflare Pages 加 Custom domain，於 GoDaddy DNS 新增 CNAME：`morris` → Cloudflare 指定之 `xxx.pages.dev`，SSL 由 Cloudflare 提供。 |

---

## 7. 視覺方向（日系質感、不 AI／矽谷感）

- **目標**：日系有特色、有質感；體驗當代；維護與擴充性佳。不要冷冰冰 AI 感或千篇一律矽谷 startup／SaaS／tool 站。
- **參考**：Ma（間）— 留白、節奏、呼吸感；typography first（字級、行距、行長講究）；溫暖與材質感（[NIPPON COLORS](https://nipponcolors.com/)，偏暖、低飽和）；可搭配 bento 網格、適度 scroll 敘事與微互動，節奏從容。
- **避免**：Inter／Roboto、大紫大綠漸層、過度圓角、滿版 CTA 牆。字型與版型依此方向選擇，不預設泛用系統字。
- **RWD**：mobile-first；內容長度約束見 [content-schema.md](../content-schema.md)。

---

## 8. 內容協定與產製流程

- **Schema**：專案根目錄 [content-schema.md](../content-schema.md) 定義全站 schema、RWD 長度建議、多語系約定與**迭代規則**。內容 Agent 與實作 Agent 共用。
- **初版產出**：Human 在 [content-brief.md](../content-brief.md) 條列填寫 → 實作 Agent 依 brief + schema 產出 `content/zh/*` 第一版（約 60 分）→ 內容 Agent 從該版迭代完稿。
- **迭代**：schema 變更寫進 content-schema.md §5 變更紀錄；兩邊以該檔為準。

---

## 9. 文件與連結

| 文件 | 位置 | 用途 |
|------|------|------|
| 本規格 | `docs/SPEC.md` | 完整規劃與選型（本文件） |
| 文件索引 | `docs/README.md` | docs 結構與導覽 |
| 內容 schema | `content-schema.md`（根目錄） | 內容型別、長度、多語、迭代規則 |
| 內容輸入 | `content-brief.md`（根目錄） | Human 條列填寫，供產初版與迭代 |
| Agent 交接 | agent-workspace `morris-site-handoff.md` | 當前狀態、Phase 2 起手清單、接手須知 |

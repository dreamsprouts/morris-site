# morris-site 內容 Schema 與協定

**目的**：內容 Agent 與實作 Agent 共用同一份結構與約定，產出可抽換、版型不重改。  
**Day 1**：繁體中文；RWD、mobile-first。**後續**：英文、日文以相同 schema、不同 locale 加入。

---

## 1. 共通約定

### 1.1 語系與檔案結構

- **Day 1**：僅繁體中文（`zh`）。內容檔放在 `content/zh/` 下。
- **後續**：新增英文（`en`）、日文（`ja`）時，在 `content/en/`、`content/ja/` 下放**同 schema、同檔名**的檔案。實作以 locale 選對目錄讀取，不改 schema。
- **檔名**：與下方各節「檔案」一致；單篇類（如 blog）用 slug 或 id 命名。

### 1.2 RWD、mobile-first 對內容的約束

- 以下 `maxLength` 為**建議上限**，以 mobile 一屏／一行可讀、不折行爆版為準；超過時實作可縮字型或截斷，但內容 Agent 應盡量在內。
- **headline** 類：約 20–30 字（中文）；英文／日文可依字型略調。
- **subline / lead**：約 60–80 字。
- **單段 body**：約 120–150 字內易於小屏閱讀；更長請拆成多段或多 section。
- 列表項（如 projects、links）：每項 title/summary 建議控制長度，避免卡片高度差過大。

### 1.3 Schema 迭代與兩邊同步（如何優化更新）

- **唯一真相來源**：本文件（`content-schema.md`）與 handoff 內「內容協定」節。任何 schema 變更以這裡為準。
- **變更流程**：
  1. 由 PM 或任一 Agent 提案變更（新增欄位、新頁、長度調整、多語系欄位等）。
  2. 寫進本文件，並在 **§5 Schema 變更紀錄** 加一筆：日期、變更摘要、影響的檔案／頁面。
  3. 通知另一邊 Agent（或 Human）：handoff §5「當前狀態」註明「schema 已更新，見 content-schema.md §5」。
  4. **內容 Agent**：若新欄位或新頁有既有內容，補齊或標註「待補」；交付物仍須通過 §4 驗證。
  5. **實作 Agent**：型別／讀取邏輯對齊新 schema；placeholder 或 fallback 對應新欄位。
- **向後相容**：新增欄位盡量設為選填；刪除欄位或改型別視為 breaking，需兩邊同時改並註明在 §5。
- **版本**：可在本文件頂部加 `schemaVersion: "1.0"`，每次 breaking 或大改遞增，方便兩邊對表。

---

## 2. 各頁／各區塊 Schema

### 2.1 首頁（Landing 六 cuts）

**檔案**：`content/zh/home.json`

```json
{
  "meta": { "locale": "zh", "updatedAt": "YYYY-MM-DD" },
  "cuts": [
    {
      "id": "hook",
      "headline": "字串，建議 ≤30 字",
      "subline": "字串，建議 ≤80 字",
      "ctaLabel": null,
      "ctaHref": null
    },
    {
      "id": "belief",
      "headline": "我信什麼",
      "body": "建議 ≤150 字或拆多段",
      "ctaLabel": "前往宣言",
      "ctaHref": "/manifesto"
    },
    {
      "id": "why",
      "headline": "為什麼",
      "body": "建議 ≤150 字",
      "ctaLabel": "閱讀全文",
      "ctaHref": "/blog/迷思破除那篇的 slug"
    },
    {
      "id": "why-me",
      "headline": "Why Me",
      "body": "建議 ≤150 字",
      "ctaLabel": "關於我",
      "ctaHref": "/about"
    },
    {
      "id": "work",
      "headline": "我做過什麼",
      "body": "建議 ≤150 字",
      "ctaLabel": "看專案",
      "ctaHref": "/projects"
    },
    {
      "id": "cta",
      "headline": "你可以怎麼做",
      "body": "邀請 coffee chat，建議 ≤80 字",
      "ctaLabel": "聯絡我",
      "ctaHref": "/contact"
    }
  ]
}
```

- **必填**：`cuts[].id`, `cuts[].headline`。其餘依實作可為選填；有 CTA 時建議給 `ctaLabel` + `ctaHref`。
- **多語**：日後 `content/en/home.json`、`content/ja/home.json` 同結構。

---

### 2.2 Manifesto

**檔案**：`content/zh/manifesto.json`

```json
{
  "meta": { "locale": "zh", "updatedAt": "YYYY-MM-DD" },
  "title": "宣言主標，建議 ≤30 字",
  "subtitle": "副標，建議 ≤80 字",
  "sections": [
    {
      "heading": "段落標，建議 ≤20 字",
      "body": "段落內文，單段建議 ≤150 字，可多段用 \\n 或陣列"
    }
  ]
}
```

- **必填**：`title`, `sections`（至少一項）。`sections[].body` 可為字串或陣列（多段）。
- 多語：同上，`content/{locale}/manifesto.json`。

---

### 2.3 About

**檔案**：`content/zh/about.json`

```json
{
  "meta": { "locale": "zh", "updatedAt": "YYYY-MM-DD" },
  "title": "關於我，建議 ≤20 字",
  "lead": "首段摘要，建議 ≤80 字",
  "sections": [
    {
      "heading": "選填",
      "body": "段落內文，建議單段 ≤150 字"
    }
  ]
}
```

- **必填**：`title`, `lead` 或 `sections` 至少其一。多語同前。

---

### 2.4 Projects（精選 3 格，Day 1）

**檔案**：`content/zh/projects.json`

```json
{
  "meta": { "locale": "zh", "updatedAt": "YYYY-MM-DD" },
  "title": "專案，建議 ≤20 字",
  "lead": "選填，列表上方說明，≤80 字",
  "projects": [
    {
      "id": "唯一 id，英文或 slug",
      "title": "專案名稱，建議 ≤25 字",
      "summary": "一兩句說明，建議 ≤80 字",
      "status": "done | in-progress | planned",
      "href": "選填，外部連結",
      "year": "選填，如 2025"
    }
  ]
}
```

- **必填**：`projects[]` 至少一筆；每筆 `id`, `title`, `status`。Day 1 固定 3 筆；實作取前 3 筆渲染即可。
- **專案詳情頁**：列表每筆 `id` 對應單篇 `content/zh/projects/{id}.json`（與列表同層級為 `content/zh/projects.json`，詳情在子目錄 `projects/`）。詳情檔含 `id`, `title`, `summary`, `status`, `year`, `href`（選填）, `body`（內文，可多段）。路由 `/projects/:id`，可點入閱讀。
- 多語：`content/{locale}/projects.json`、`content/{locale}/projects/{id}.json`。

---

### 2.5 Blog（列表 + 單篇）

**列表**：`content/zh/blog-index.json`

```json
{
  "meta": { "locale": "zh", "updatedAt": "YYYY-MM-DD" },
  "title": "部落格或文章，建議 ≤20 字",
  "posts": [
    {
      "slug": "URL 用 slug，英文",
      "title": "文章標題，建議 ≤40 字",
      "excerpt": "摘要，建議 ≤120 字",
      "publishedAt": "YYYY-MM-DD",
      "featured": true
    }
  ]
}
```

- **必填**：`posts[]` 每項 `slug`, `title`, `publishedAt`。`featured: true` 表示首頁「為什麼」cut 連到該篇。
- **單篇**：`content/zh/posts/{slug}.json` 或 `content/zh/posts/{slug}.md`（若用 MD，frontmatter 含 title, excerpt, publishedAt, featured）。

**單篇 JSON 範例**：`content/zh/posts/myths.json`

```json
{
  "meta": { "locale": "zh", "updatedAt": "YYYY-MM-DD" },
  "slug": "myths",
  "title": "文章標題",
  "excerpt": "摘要",
  "publishedAt": "YYYY-MM-DD",
  "featured": true,
  "body": "HTML 或 Markdown 字串（由 build 轉譯）"
}
```

- 若用 **Markdown**：`content/zh/posts/{slug}.md`，frontmatter 含 `title`, `excerpt`, `publishedAt`, `featured`，body 為 MD 內文。實作與內容 Agent 擇一約定（JSON 或 MD），一致即可。
- 多語：`content/en/posts/`, `content/ja/posts/` 同結構。

---

### 2.6 Contact

**檔案**：`content/zh/contact.json`

```json
{
  "meta": { "locale": "zh", "updatedAt": "YYYY-MM-DD" },
  "title": "聯絡，建議 ≤20 字",
  "lead": "選填，說明歡迎聊聊等，≤80 字",
  "links": [
    { "label": "顯示名稱", "href": "https://...", "type": "email | social | other" }
  ],
  "formTitle": "表單區標題，選填",
  "formDescription": "表單上方說明，選填"
}
```

- **必填**：`links` 至少一筆（`label`, `href`）。表單行為由實作負責；內容只負責文案。
- 多語：同前。

---

## 3. 內容 Agent 交付物清單

- 依上述 schema 產出 `content/zh/` 下所有檔。
- 清單範例：`content/zh/home.json`, `manifesto.json`, `about.json`, `projects.json`, `blog-index.json`, `contact.json`, `posts/myths.json`, `posts/...`（共 3 篇）。
- 交付時附一覽表：檔名 ↔ 對應頁面／cut，方便實作抽換。

---

## 4. 驗證要點（內容 Agent 交稿前、實作 Agent 接手時）

- 必填欄位皆存在、型別正確（字串／陣列／枚舉）。
- 長度在建議 maxLength 內（或標註「已超出，實作需處理」）。
- `ctaHref`、`slug`、`links[].href` 等連結與路由正確；首頁「為什麼」的 `ctaHref` 對應到 `featured: true` 那篇的 `/blog/{slug}`。
- `meta.updatedAt`、`publishedAt` 為 YYYY-MM-DD。
- 多語時：各 locale 同檔名、同 schema。

---

## 5. Schema 變更紀錄

| 日期 | 變更摘要 | 影響 |
|------|----------|------|
| 2026-03-04 | 初版：首頁 6 cuts、Manifesto、About、Projects、Blog、Contact；locale 約定；RWD 長度建議；迭代流程。 | 全頁面 |
| 2026-03-04 | 專案詳情頁：`content/zh/projects/{id}.json`、路由 `/projects/:id`；內容初版備份於 `content/zh/original/`。 | Projects 列表可點入詳情、內容擴寫與微調 |

*後續任何 schema 變更請在此加一筆，並更新本文件對應章節。*

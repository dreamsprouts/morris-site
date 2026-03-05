# morris-site 專案狀態

**目前階段**：Phase 2 完成，已上線；可開始迭代。  
**完整規格**：[docs/SPEC.md](docs/SPEC.md)  
**Agent 交接**：`~/.cursor/projects/Users-morrisli/agent-workspace/methodology/morris-site-handoff.md`

---

## 已上線

- **正式網址**：https://morris.futurin.tw
- **Pages**：https://morris-site.pages.dev
- **Repo**：https://github.com/dreamsprouts/morris-site
- **部署流程**：地端 `git push` → GitHub → 自動 build + 部署至 Cloudflare Pages

---

## 本機與內容

- 地端：`npm run dev` → http://localhost:5173/
- 內容：依 content-brief 產出並擴寫 `content/zh/*`；初版備份於 `content/zh/original/`
- 專案：列表可點入詳情頁（/projects/:id），同 Blog 模式
- 視覺：NIPPON COLORS、Noto Serif/Sans TC、Ma（留白）、RWD
- 聯絡表單：可設 `VITE_FORMSPREE_ID` 接 Formspree（見 .env.example）

---

## 下一步（迭代）

- 內容與版型可依 Human 反饋迭代
- 多語（en/ja）、CMS 銜接等見 SPEC 與 roadmap

最後更新：2026-03-04

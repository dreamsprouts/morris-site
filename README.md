# morris-site

Morris 個人網站第一版：多頁、首頁 Landing 敘事線、Manifesto／About／Projects／Blog／Contact。

**狀態**：[PROJECT_STATUS.md](PROJECT_STATUS.md)

---

## 怎麼跑

```bash
cd ~/Projects/morris-site
npm install
npm run dev
```

瀏覽 **http://localhost:5173/** 即可看地端網站。

Build：`npm run build`（output：`dist`）。  
聯絡頁表單：可選填 `.env` 的 `VITE_FORMSPREE_ID` 接 Formspree，見 `.env.example`。

---

## 關鍵文件

- **完整規劃與選型**：[docs/SPEC.md](docs/SPEC.md)（頁面、敘事、技術、部署、視覺、內容流程）
- **文件索引**：[docs/README.md](docs/README.md)
- **內容 schema**：[content-schema.md](content-schema.md)（型別、長度、多語、迭代）
- **內容輸入**：[content-brief.md](content-brief.md)（條列填寫 → 產初版 → 迭代完稿）

**Agent 接手**：見 handoff `~/.cursor/projects/Users-morrisli/agent-workspace/methodology/morris-site-handoff.md`（當前狀態與 Phase 2 起手清單）。

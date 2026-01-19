# 模組一：核心觀念與工具 (Core Concepts & Tools)

本模組將帶領學員認識 AI 輔助開發的新時代 —— Vibe Coding，並完成所有必要的環境建置與工具設定。

---

## 1. 歡迎與介紹 (Welcome & Intro)

### 什麼是 Vibe Coding？

「Vibe Coding」是一種全新的開發典範，意指「憑藉直覺與感覺來撰寫程式」。

* **傳統開發**：需要精通語法、邏輯與演算法。
* **Vibe Coding**：透過自然語言與 AI 協作，專注於「想要做什麼」與「體驗如何」，而非底層實作細節。

### 為什麼選用 Google Antigravity？

Google Antigravity 是專為 AI 時代打造的編輯器，具備以下特色：

* **原生 AI 整合**：不僅是自動補全，而是能理解整個專案脈絡的 AI 助理。
* **Agentic Capabilities**：具備自主執行任務的能力（如執行終端機指令、瀏覽網頁）。
* **MCP 生態系**：透過 Model Context Protocol 輕鬆擴充外部工具與資料源。

---

## 2. 環境建置 (Environment Setup)

在開始之前，我們需要準備好開發環境。本課程的實作將依賴以下工具：

### 2.1 基礎軟體安裝

1. **Antigravity Editor**
   * 請至官網下載並安裝適用於您作業系統的版本 (Windows/macOS/Linux)。
   * 首次啟動需登入 Google 帳號並完成模型設定 (預設 Gemini 1.5 Pro)。
2. **Git (版本控管)**
   * 前往 [git-scm.com](https://git-scm.com/) 下載安裝。
   * 設定使用者名稱與信箱：
     ```bash
     git config --global user.name "Your Name"
     git config --global user.email "your@email.com"
     ```
3. **GitHub CLI (gh)**
   * 用於快速建立與管理 Repo。
   * 安裝後執行 `gh auth login` 進行登入授權。

### 2.2 程式語言環境

1. **Python**
   * 許多 AI 工具與腳本依賴 Python。
   * 安裝時請務必勾選 "Add Python to PATH"。
2. **Node.js**
   * Web 開發與許多 MCP Server 的執行環境。
   * 建議安裝 LTS (Long Term Support) 版本。

### 2.3 實用工具

1. **Pandoc**：文件轉換神器 (md 轉 docx/pdf)。
2. **ffmpeg**：影音處理工具 (影片轉音訊、轉檔)。
3. **yt-dlp**：強大的影片下載工具 (用於字幕產生器專案)。

### 2.4 Antigravity 推薦插件

* **Antigravity Auto Accept**：自動接受 AI 的微小修改，加快開發節奏。
* **Antigravity Cockpit**：專案儀表板，提供專案概況。

---

## 3. Antigravity 操作技巧

### 核心介面

* **Agent Manager**：位於右上角，是你的 AI 專案經理。可在此切換不同任務或檢視歷史紀錄。
* **Context Bar** (上方)：顯示 AI 目前「看到」的檔案與資源。
  * **Add Context**：手動加入關鍵檔案，幫助 AI 更準確理解需求。

### 對話模式 (Conversion Modes)

1. **Planning Mode (規劃模式)**：
   * 適合：需求不明確、大型功能開發。
   * 行為：AI 會先產出計畫 (Implementation Plan)，經你確認後才開始寫程式。
2. **Fast Mode (快速模式)**：
   * 適合：修復 Bug、小型調整、明確指令。
   * 行為：AI 直接執行並修改程式碼。

### 實用快捷鍵

* `Cmd/Ctrl + E`：開啟/隱藏 Agent 面板。
* `Cmd/Ctrl + I`：在程式碼中進行行內編輯 (Inline Edit)。

---

## 4. Rules 規則設定

Rules 是指導 AI 行為的準則，能讓 AI 更符合你的開發習慣。

### 4.1 Global Rules (全域規則)
*   **檔案位置**：`~/.gemini/GEMINI.md`
*   **適用範圍**：所有專案。
*   **用途**：設定個人偏好。
    *   例如：「所有回應請使用繁體中文」、「程式碼需包含詳細註解」。

### 4.2 Workspace Rules (專案規則)
*   **檔案位置**：`.agent/rules/` 目錄下的 `.md` 檔案 (如 `.agent/rules/coding-style.md`)。
*   **適用範圍**：當前專案資料夾。
*   **進階設定**：
    *   **Glob Patterns**：可指定規則只對特定檔案生效 (例如 `**/*.ts` 只對 TypeScript 檔案生效)。
    *   **觸發模式**：
        *   **Always On**：永遠啟用 (適合核心原則)。
        *   **Model Decision**：讓 AI 決定是否需要此規則 (適合特定情境)。
    *   **引用功能**：規則間可以使用 `@` 互相引用，方便模組化管理。

---

## 5. Workflow 自動化

Workflow 是一套預先定義好的 SOP，讓 AI 依照標準步驟執行任務。

### 檔案位置
*   **專案級**：`.agent/workflows/` (跟隨專案，團隊共用)
*   **全域級**：`~/.gemini/antigravity/workflows/` (跨專案通用)

### 建立 Workflow
格式為標準 Markdown，建議包含 Frontmatter：
```markdown
---
description: 部署網站到 GitHub Pages
---
1. 執行 build 指令
2. 確認 build 資料夾是否存在
3. [Turbo] 執行 gh-pages 部署指令
```
> **Tip**：Workflow 可以呼叫另一個 Workflow，實現任務的模組化與重用。

### 使用 Workflow
*   在對話框輸入 `@` 或直接說「請執行部署網站 Workflow」。
*   AI 會依序執行步驟，確保操作標準化，減少人為失誤。

---

## 6. MCP 協議介紹 (Model Context Protocol)

### 什麼是 MCP？
MCP 是連接 AI 模型與外部工具的標準協議。它讓 Antigravity 不再只是封閉的編輯器，而能「看見」並「操作」外部世界。

### MCP 的兩大功能
1.  **Context Resources (資源)**：讓 AI 讀取外部資料（如資料庫內容、Notion 筆記）。
2.  **Tools (工具)**：讓 AI 執行外部動作（如發送 Slack 訊息、新增 Google Calendar）。

### MCP Server 設定
*   **內建 MCP Store**：點擊 "..." 選單進入，可一鍵安裝常用服務 (如 `github`, `sqlite`, `brave-search`)。
*   **自訂 Server**：透過 JSON 設定檔連接本地或遠端 Server。
    ```json
    {
      "mcpServers": {
        "my-db": {
          "command": "uvx",
          "args": ["mcp-server-sqlite", "--db-path", "test.db"]
        }
      }
    }
    ```

### 實用 MCP 工具安裝
*   **Browser Subagent** (內建)：
    *   功能：讓 AI 控制瀏覽器，進行網頁截圖、爬取資料、自動化測試。
    *   應用：YT 頻道分析報告專案將大量使用此功能。

---

## 7. Skills 建立與管理

Skills 是讓 Agent 學會特定技能的機制，類似於為 AI 安裝「應用程式」。

### SKILL.md 結構
一個標準的 Skill 資料夾 (如 `.agent/skills/doc-converter/`) 需包含 `SKILL.md`：

```markdown
---
name: document-converter
description: Converts Markdown files to PDF or DOCX using Pandoc.
---

# Instructions
當使用者想要轉換文件格式時...
```

### 運作原理：Progressive Disclosure (漸進式揭露)
1.  **Agent 掃描**：AI 只會先讀取 YAML Header 中的 `description`。
2.  **決策**：若描述符合當前需求，AI 才會「啟用」此 Skill。
3.  **執行**：讀取完整內容並依照指示執行。
*   **優點**：即使安裝了 100 個 Skills，也不會因為 Context 過大而變慢。

### 資料夾結構建議
*   `SKILL.md`：核心指令。
*   `scripts/`：放置 Python/Shell 腳本。
*   `examples/`：提供範例檔案供 AI 參考。

### Agent Skills 開放標準與資源
*   **agentskills.io**：一個分享與下載 Skills 的平台。
*   **Skills Marketplace** ([skillsmp.com](https://skillsmp.com/))：另一個豐富的 Skills 資源庫，可在此探索更多社群貢獻的實用技能。
*   你可以下載別人寫好的 Skill（如 Git 操作專家、React 元件生成器），直接擴充你的 AI 能力。

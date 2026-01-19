# 模組二：實戰專案演練 (Practical Project Implementation)

本模組將透過 5 個循序漸進的實戰專案，帶領學員從基礎腳本到複雜的 AI 應用開發，並深入學習 Vibe Coding 的標準開發流程。

---

## 1. 實作：資料夾整理腳本 (File Organizer)

### 專案目標
編寫一個 Python 腳本，自動將「下載」資料夾中的雜亂檔案，依據副檔名（.jpg, .pdf, .docx）或日期分類到對應資料夾。

### 學習重點
1.  **基礎指令**：練習使用自然語言讓 AI 撰寫 Python 檔案處理程式。
2.  **除錯體驗**：體驗如何透過對話修正錯誤 (例如：權限不足、檔案重名處理)。
3.  **執行環境**：學習在終端機運作 Python 腳本。

### 實作步驟
1.  建立 `organizer.py`。
2.  Prompt 範例：「請寫一個 Python 腳本，將當前資料夾下的所有檔案依據副檔名分類到對應的子資料夾中。如果不支援的格式則移到 'Others' 資料夾。」
3.  測試執行並觀察結果。

---

## 2. Vibe Coding 標準開發流程

在進入更複雜的專案前，我們必須建立專業的開發習慣。Vibe Coding 不僅是寫程式，更是「系統設計」。

### 標準流程五部曲
1.  **PRD (需求文件)**：描述「為什麼要做」以及「使用者是誰」。
2.  **Spec (規格文件)**：定義「系統架構」、「資料格式」與「關鍵邏輯」。
3.  **Task List (任務清單)**：將大目標拆解為可執行的小任務 (`task.md`)。
4.  **Implementation Plan (實作計畫)**：規劃修改哪些檔案、新增哪些功能 (`implementation_plan.md`)。
5.  **Walkthrough (變更說明)**：完成後產出說明文件，紀錄做了什麼與如何驗證 (`walkthrough.md`)。

> **重點習慣**：不要直接跳進去寫 Code，先寫好計畫 (Docs) 再開始 (Code)。「想清楚」比「寫得快」更重要。

---

## 3. 實作：文件轉換 Skill (File Converter)

### 專案目標
建立一個可重複使用的 MCP Skill，將 Markdown 文件自動轉換為 DOCX、PDF 或 PPT。

### 學習重點
1.  **Skill 結構**：學習撰寫 `SKILL.md`。
2.  **工具整合**：整合 `pandoc` 工具。
3.  **技能封裝**：將功能模組化，讓 AI 未來能隨時呼叫此能力。

### 實作步驟
1.  建立 `skills/doc-converter/SKILL.md`。
2.  在 `SKILL.md` 中定義輸入引數 (Input Arguments) 與執行指令。
3.  Prompt 範例：「請使用 doc-converter skill 將這份 `readme.md` 轉成 PDF。」

---

## 4. 實作：教學網頁製作 (Teaching Website)

### 專案目標
製作一個簡單的個人教學網頁，並部署到 GitHub Pages 上線。

### 學習重點
1.  **前端開發**：HTML/CSS 基礎生成。
2.  **Git 版本控管**：`git add`, `git commit`, `git push` 實戰。
3.  **自動化部署**：利用 GitHub Pages 免費託管靜態網頁。

### 實作步驟
1.  Prompt：「請幫我設計一個現代化風格的教學課程首頁，包含課程大綱、講師介紹與報名按鈕。」
2.  使用 `gh repo create` 建立遠端儲存庫。
3.  推送程式碼並在 GitHub 設定中開啟 Pages 功能。

---

## 5. 實作：YT 頻道分析報告 (Channel Analysis)

### 專案目標
使用 MCP Browser Subagent 自動瀏覽指定的 YouTube 頻道，分析其熱門影片數據，並產出 HTML 分析報告。

### 學習重點
1.  **MCP Browser Tool**：學習如何指揮 AI 控制瀏覽器。
2.  **資料擷取 (Scraping)**：自動化蒐集網頁資訊。
3.  **資料視覺化**：將蒐集到的數據繪製成圖表。

### 實作步驟
1.  啟用 Browser Subagent。
2.  Prompt：「請前往『Antigravity 官方頻道』，抓取最近 10 部影片的標題與觀看次數，並找出一週內觀看數最高的影片。」
3.  要求 AI 將結果整理成一份包含長條圖的 HTML 報告。

---

## 6. 實作：YouTube 字幕產生器 (Subtitle Generator)

這是本課程的最終大魔王專案，將整合所有所學技術。

### 專案目標
打造一個自動化工具，輸入 YouTube 連結後，自動下載影片、轉檔音訊、並使用 Whisper 模型生成 SRT 字幕檔。

### 開發環境準備
1.  **Groq API Key**：申請免費/付費的 Groq API Key 以使用高速 Whisper 模型。
2.  **yt-dlp**：確認已安裝影片下載工具。

### 實作步驟 (依循標準流程)
1.  **撰寫 Spec**：定義輸入 (URL) 與輸出 (SRT file)。
2.  **核心功能開發**：
    *   寫一個 Python 函式呼叫 `yt-dlp` 下載音訊。
    *   寫一個 Python 函式呼叫 Groq API 進行語音轉文字 (STT)。
    *   將回應格式轉換為標準 SRT 時間軸格式。
3.  **整合測試**：使用實際影片進行測試。

---

## 7. 創意延伸功能

### 專案目標
基於字幕產生器的成果，進一步利用 LLM 進行內容加值。

### 延伸應用
1.  **影片摘要生成**：將字幕丟回給 AI，生成 300 字重點摘要。
2.  **社群貼文產生**：根據影片內容，自動撰寫 FB/IG/LinkedIn 的宣傳貼文與 Hashtag。
3.  **多語系翻譯**：將 SRT 字幕翻譯成英文或日文。

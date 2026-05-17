# Spec Kit Todo 專案學習指南（Reviewed）

> 專案名稱：`spec-kit-todo`  
> 目標：用 **Spec Kit** 學習規格驅動開發，並用 **Vue 3 + TypeScript + Vite** 實作簡單 Todo App。

---

## 目錄

1. [這份指南的重點](#1-這份指南的重點)
2. [Spec Kit 在這個專案扮演什麼角色](#2-spec-kit-在這個專案扮演什麼角色)
3. [建立專案資料夾與 Git 初始化](#3-建立專案資料夾與-git-初始化)
4. [初始化 Spec Kit](#4-初始化-spec-kit)
5. [建立 Vue 3 + TypeScript 專案](#5-建立-vue-3--typescript-專案)
6. [第一次 Git Commit](#6-第一次-git-commit)
7. [用 `$speckit-constitution` 建立專案原則](#7-用-speckit-constitution-建立專案原則)
8. [用 `$speckit-specify` 建立 Todo 規格](#8-用-speckit-specify-建立-todo-規格)
9. [用 `$speckit-clarify` 釐清需求](#9-用-speckit-clarify-釐清需求)
10. [用 `$speckit-plan` 產生技術計畫](#10-用-speckit-plan-產生技術計畫)
11. [用 `$speckit-tasks` 產生任務清單](#11-用-speckit-tasks-產生任務清單)
12. [用 `$speckit-analyze` 做一致性檢查](#12-用-speckit-analyze-做一致性檢查)
13. [用 `$speckit-implement` 開始第一階段實作](#13-用-speckit-implement-開始第一階段實作)
14. [推送到 GitHub](#14-推送到-github)
15. [完整流程總結](#15-完整流程總結)
16. [本次學到的 Spec Kit 重點](#16-本次學到的-spec-kit-重點)
17. [建議 Commit 節奏](#17-建議-commit-節奏)
18. [下一階段可以繼續做什麼](#18-下一階段可以繼續做什麼)
19. [常用指令整理](#19-常用指令整理)

---

## 1. 這份指南的重點

這份文件記錄你從 0 開始做 `spec-kit-todo` 的流程。

這個專案不是單純「叫 AI 幫我寫 Todo」，而是練習：

```txt
先定義規格 → 再規劃實作 → 再拆任務 → 檢查一致性 → 最後才實作
```

這就是 Spec Kit 最重要的學習價值。

---

## 2. Spec Kit 在這個專案扮演什麼角色

Spec Kit 不是 Vue 框架，也不是 Vite 外掛。

它在這個專案中負責的是「規格驅動開發流程」。

你透過 Spec Kit 先產生：

```txt
constitution：專案原則
specify：需求規格
clarify：需求釐清
checklist：需求檢查清單
plan：技術實作計畫
tasks：任務拆解
analyze：一致性檢查
implement：依照任務開始實作
```

在 Codex skills 模式中，指令是：

```txt
$speckit-constitution
$speckit-specify
$speckit-clarify
$speckit-checklist
$speckit-plan
$speckit-tasks
$speckit-analyze
$speckit-implement
```

> 注意：多數 agent 可能使用 `/speckit.*` slash commands，但你這次使用的是 Codex skills 模式，所以使用 `$speckit-*`。

---

## 3. 建立專案資料夾與 Git 初始化

一開始先建立專案資料夾：

```powershell
cd D:\SideProject
mkdir spec-kit-todo
cd spec-kit-todo
git init
```

這一步做了：

```txt
建立 spec-kit-todo 資料夾
進入專案資料夾
初始化 Git 版控
```

成功後會看到類似：

```txt
Initialized empty Git repository in D:/SideProject/spec-kit-todo/.git/
```

---

## 4. 初始化 Spec Kit

你最後成功使用的指令是：

```powershell
uvx --from git+https://github.com/github/spec-kit.git specify init . --integration codex --integration-options="--skills" --script ps --ignore-agent-tools
```

### 4.1 這串指令在做什麼？

拆開來看：

```txt
uvx
```

代表臨時下載並執行 Python CLI 工具。

```txt
--from git+https://github.com/github/spec-kit.git
```

代表 CLI 工具來源是 GitHub 上的 `github/spec-kit`。

```txt
specify
```

代表執行 Spec Kit 提供的 Specify CLI。

```txt
init
```

代表初始化 Spec Kit 專案。

```txt
.
```

代表目前資料夾，也就是：

```txt
D:\SideProject\spec-kit-todo
```

```txt
--integration codex
```

代表指定整合 Codex。

```txt
--integration-options="--skills"
```

代表用 Codex skills 模式安裝 Spec Kit 指令。

```txt
--script ps
```

代表產生 PowerShell 版本的腳本。

```txt
--ignore-agent-tools
```

代表跳過「本機是否有安裝 Codex CLI」的檢查。

---

### 4.2 `specify init .` 跟 `specify init <專案名稱>` 的差別

網路上常看到：

```powershell
uvx --from git+https://github.com/github/spec-kit.git specify init <專案名稱>
```

例如：

```powershell
uvx --from git+https://github.com/github/spec-kit.git specify init spec-kit-todo
```

這種寫法代表：

```txt
在目前位置底下建立新的 spec-kit-todo 資料夾，並初始化它
```

但你已經先做了：

```powershell
mkdir spec-kit-todo
cd spec-kit-todo
```

所以你應該用：

```powershell
specify init .
```

意思是：

```txt
直接在目前資料夾初始化 Spec Kit
```

簡單記法：

```txt
還沒建立資料夾 → specify init spec-kit-todo
已經在資料夾裡 → specify init .
```

---

### 4.3 初始化時遇到的問題

第一次你遇到：

```txt
codex not found
Codex CLI is required to continue with this project type.
Tip: Use --ignore-agent-tools to skip this check
```

原因是 PowerShell 找不到 `codex` 指令。

解法是在指令最後加上：

```powershell
--ignore-agent-tools
```

成功後看到：

```txt
Project ready.
speckit skills were installed to .agents/skills
```

代表 Spec Kit 初始化成功。

---

## 5. 建立 Vue 3 + TypeScript 專案

在同一個資料夾下建立 Vite 專案：

```powershell
npm create vite@latest . -- --template vue-ts
```

### 5.1 PowerShell 擋住 npm.ps1 的問題

如果 PowerShell 出現：

```txt
因為這個系統上已停用指令碼執行，所以無法載入 npm.ps1
PSSecurityException
```

代表 PowerShell 執行原則擋住 `npm.ps1`。

可以改用：

```powershell
npm.cmd create vite@latest . -- --template vue-ts
```

之後 npm 指令也可以這樣執行：

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

---

### 5.2 Vite 問目前資料夾不是空的

因為資料夾裡已經有 Spec Kit 產生的檔案，例如：

```txt
.git/
.agents/
.specify/
```

所以 Vite 會問：

```txt
Current directory is not empty. Please choose how to proceed:
Cancel operation
Remove existing files and continue
Ignore files and continue
```

要選：

```txt
Ignore files and continue
```

不要選：

```txt
Remove existing files and continue
```

因為那可能會刪掉 Spec Kit 檔案。

---

### 5.3 Vite 問是否安裝並啟動

看到：

```txt
Install with npm and start now?
Yes / No
```

選：

```txt
Yes
```

它通常會幫你執行：

```txt
npm install
npm run dev
```

成功後會看到類似：

```txt
http://localhost:5173/
```

代表 Vue 專案成功啟動。

---

## 6. 第一次 Git Commit

Vue 專案與 Spec Kit 初始化完成後，先做第一次 commit。

```powershell
git status
git add .
git commit -m "chore: initialize spec-kit todo project"
```

這個 commit 的意義是：

```txt
建立專案基礎結構
包含 Spec Kit、Vue 3、TypeScript、Vite、Git 初始化
```

---

## 7. 用 `$speckit-constitution` 建立專案原則

接下來不是馬上寫程式，而是先建立專案開發原則。

在 Codex 裡輸入：

```txt
$speckit-constitution

建立 spec-kit-todo 專案的開發原則：

1. 使用 Vue 3 + TypeScript + Vite。
2. 使用 Composition API。
3. 專案目標是練習 Spec Kit 規格驅動開發與 Vue3 基礎功能。
4. Todo 資料先只存在瀏覽器 localStorage，不做後端。
5. 不使用 Pinia，除非後續需求變複雜。
6. 不引入 Element Plus、Bootstrap 或其他大型 UI framework。
7. 元件要簡單、可讀、容易維護。
8. 每個功能都要有明確驗收方式。
9. 實作完成後要確認 npm run build 可以通過。
10. 不做登入、不做資料庫、不做 API。
```

完成後看到以下檔案變更是正常的：

```txt
README.md
.specify/memory/constitution.md
.specify/templates/plan-template.md
.specify/templates/spec-template.md
.specify/templates/tasks-template.md
```

重點檔案是：

```txt
.specify/memory/constitution.md
```

它是專案憲章，後續 spec、plan、tasks 都會受它約束。

完成後 commit：

```powershell
git add .
git commit -m "docs: add project constitution"
```

---

## 8. 用 `$speckit-specify` 建立 Todo 規格

接著建立 Todo 功能需求規格。

在 Codex 輸入：

```txt
$speckit-specify

我想建立一個簡單的 Todo List 單頁應用，專案名稱是 spec-kit-todo，目標是練習 Vue3 + TypeScript 與 Spec Kit 規格驅動開發。

使用者可以：
1. 新增待辦事項。
2. 查看待辦清單。
3. 勾選待辦為完成或未完成。
4. 編輯待辦文字。
5. 刪除待辦事項。
6. 篩選全部、未完成、已完成。
7. 清除所有已完成項目。
8. 重新整理頁面後，Todo 資料仍會保留在 localStorage。

限制：
1. 不需要登入。
2. 不需要後端 API。
3. 不需要資料庫。
4. 不需要拖曳排序。
5. Todo 文字不能是空白。
6. Todo 文字前後空白要 trim。
7. UI 使用原生 CSS 或 scoped CSS。
8. 不使用大型 UI framework。

驗收標準：
1. 使用者輸入文字並按新增後，清單會出現新 Todo。
2. 空白文字不能新增。
3. 新增 Todo 後輸入框會清空。
4. 勾選 Todo 後，它會顯示完成狀態。
5. 再次勾選可以改回未完成。
6. 點刪除後，該 Todo 從清單移除。
7. 可以編輯 Todo 文字。
8. 篩選按鈕可以正確顯示全部、未完成、已完成。
9. 點擊清除已完成後，所有完成狀態的 Todo 會被移除。
10. 重新整理頁面後資料仍存在。
```

這一步會產生 Todo 的需求規格檔，通常在：

```txt
.specify/specs/001-todo-list-app/spec.md
```

---

## 9. 用 `$speckit-clarify` 釐清需求

接著讓 Spec Kit 檢查需求是否模糊。

在 Codex 輸入：

```txt
$speckit-clarify

請幫我檢查 spec-kit-todo 的 Todo 規格是否有模糊或容易誤解的地方，尤其是：
1. Todo id 如何產生。
2. localStorage key 如何命名。
3. 編輯 Todo 時 Enter、Esc、失焦行為。
4. 篩選狀態是否需要保存。
5. 清除已完成是否需要確認。
6. 空白 Todo 如何處理。
```

如果它詢問，可以回答：

```txt
1. Todo id 使用 crypto.randomUUID，如果瀏覽器不支援就用 Date.now fallback。
2. localStorage key 使用 spec-kit-todo-items。
3. 編輯時按 Enter 儲存，按 Esc 取消，失焦時也儲存。
4. 篩選狀態不用存到 localStorage。
5. 清除已完成前不用跳確認視窗。
6. Todo 文字要 trim，trim 後是空字串就不允許新增或儲存。
```

完成這一步後，可以先 commit：

```powershell
git add .
git commit -m "docs: define todo requirements and clarifications"
```

---

## 10. 用 `$speckit-plan` 產生技術計畫

接著建立實作計畫。

在 Codex 輸入：

```txt
$speckit-plan

請根據目前 spec-kit-todo 的 Todo 規格與需求釐清結果，產生技術實作計畫。

專案技術選型如下：

1. 前端框架使用 Vue 3。
2. 語言使用 TypeScript。
3. 建置工具使用 Vite。
4. 使用 Vue Composition API。
5. 不使用 Pinia，因為這是簡單 Todo 練習專案。
6. 不使用 Vue Router，因為目前只有單頁 Todo 功能。
7. 不使用 Element Plus、Bootstrap 或其他大型 UI framework。
8. 樣式使用原生 CSS 或 Vue SFC scoped CSS。
9. 不做後端 API。
10. 不做資料庫。
11. 不做登入/註冊。
12. Todo 資料只存在瀏覽器 localStorage。

請依照以下方向規劃實作：

一、資料模型

建立 Todo 型別，位置建議放在：

src/types/todo.ts

Todo 欄位包含：

1. id: string
2. title: string
3. completed: boolean
4. createdAt: string

Todo id 產生方式：

1. 優先使用 crypto.randomUUID()
2. 如果瀏覽器不支援，fallback 使用 Date.now().toString()

localStorage 設定：

1. key 使用 spec-kit-todo-items
2. 只保存 Todo 清單
3. 篩選狀態不需要保存到 localStorage

二、狀態管理

建立 useTodos composable，位置建議放在：

src/composables/useTodos.ts

useTodos 負責管理：

1. todos 狀態
2. filteredTodos 計算結果
3. currentFilter 篩選狀態
4. 新增 Todo
5. 刪除 Todo
6. 切換完成/未完成
7. 編輯 Todo
8. 清除所有已完成 Todo
9. 從 localStorage 載入 Todo
10. 寫入 localStorage

篩選狀態包含：

1. all：全部
2. active：未完成
3. completed：已完成

三、元件拆分

請規劃以下元件：

1. App.vue
   - 組合整個 Todo App
   - 使用 useTodos composable
   - 傳遞資料與事件給子元件

2. src/components/TodoInput.vue
   - 負責新增 Todo
   - 使用者輸入文字後可以按 Enter 或按新增按鈕
   - 輸入內容需要 trim
   - trim 後空字串不可新增
   - 新增成功後清空輸入框

3. src/components/TodoList.vue
   - 負責顯示 Todo 清單
   - 接收 filteredTodos
   - 如果沒有資料，顯示空狀態文字

4. src/components/TodoItem.vue
   - 負責單筆 Todo
   - 可以切換完成/未完成
   - 可以刪除 Todo
   - 可以編輯 Todo 文字
   - 編輯時按 Enter 儲存
   - 編輯時按 Esc 取消
   - 編輯時失焦 blur 也儲存
   - 編輯後文字需要 trim
   - trim 後空字串不可儲存，應維持原本內容

5. src/components/TodoFilter.vue
   - 負責顯示篩選按鈕
   - 可以切換 all / active / completed
   - 顯示目前選中的篩選狀態
   - 提供清除已完成按鈕

四、使用者流程

請規劃以下使用流程：

1. 使用者開啟頁面。
2. App 從 localStorage 載入 Todo 清單。
3. 使用者輸入 Todo 文字並新增。
4. 新增後 Todo 顯示在清單上。
5. 使用者可以勾選完成。
6. 使用者可以再次勾選改回未完成。
7. 使用者可以編輯 Todo 文字。
8. 使用者可以刪除 Todo。
9. 使用者可以切換全部、未完成、已完成篩選。
10. 使用者可以清除所有已完成 Todo。
11. 使用者重新整理頁面後，Todo 清單仍然存在。

五、驗收標準對應

請確保計畫有涵蓋以下驗收標準：

1. 可以新增 Todo。
2. 空白 Todo 不可新增。
3. 新增 Todo 後輸入框會清空。
4. 可以查看 Todo 清單。
5. 可以切換完成/未完成。
6. 完成狀態要有明顯畫面差異，例如刪除線或淡化。
7. 可以編輯 Todo。
8. 編輯 Todo 時 Enter 儲存。
9. 編輯 Todo 時 Esc 取消。
10. 編輯 Todo 時失焦 blur 儲存。
11. 編輯後空白內容不可儲存。
12. 可以刪除 Todo。
13. 可以篩選全部、未完成、已完成。
14. 可以清除所有已完成 Todo。
15. 重新整理頁面後，Todo 資料仍保留。
16. npm run build 必須通過。

六、實作限制

請遵守以下限制：

1. 不新增後端。
2. 不新增 API。
3. 不新增資料庫。
4. 不新增登入系統。
5. 不引入大型 UI framework。
6. 不使用 Pinia。
7. 不使用 Vue Router。
8. 不過度抽象化。
9. 優先保持程式碼簡單、可讀、容易維護。
10. 每個檔案職責要清楚。

七、請輸出內容

請依照 Spec Kit plan 的格式產生內容，並包含：

1. Technical Context
2. Constitution Check
3. Project Structure
4. Data Model
5. Component Design
6. State Management Design
7. localStorage Persistence Design
8. User Flow
9. Testing / Manual Validation Plan
10. Implementation Phases

請產生完整 plan，但先不要開始實作程式碼。
```

完成後正常會看到：

```txt
.specify/specs/001-todo-list-app/plan.md
.specify/specs/001-todo-list-app/research.md
.specify/specs/001-todo-list-app/data-model.md
.specify/specs/001-todo-list-app/quickstart.md
.specify/specs/001-todo-list-app/contracts/ui-contract.md
AGENTS.md
```

這些檔案意義：

```txt
plan.md          技術實作計畫
research.md      技術選型與決策紀錄
data-model.md    Todo 資料模型
quickstart.md    啟動與驗收說明
ui-contract.md   UI 元件行為契約
AGENTS.md        給 AI coding agent 的專案指引
```

---

## 11. 用 `$speckit-tasks` 產生任務清單

接著建立可執行任務。

在 Codex 輸入：

```txt
$speckit-tasks

請根據目前 spec-kit-todo 的 spec、clarification、plan、research、data-model、quickstart、ui-contract，產生可以一步一步執行的實作任務清單。

請遵守以下要求：

1. 任務要小，適合初學者一步一步完成。
2. 任務要有明確順序。
3. 每個任務都要可以驗收。
4. 先建立型別與 composable，再建立元件。
5. 先完成核心功能，再完成 UI 細節。
6. 每一階段完成後都要確認 npm run build 可以通過。
7. 任務只負責產生 tasks，不要開始實作程式碼。

請將任務拆成以下階段：

Phase 1：專案清理與基礎準備
- 檢查 Vue + TypeScript + Vite 專案是否可正常 build
- 清理 Vite 預設範例內容
- 建立必要資料夾，例如 src/types、src/composables、src/components

Phase 2：資料型別與狀態邏輯
- 建立 Todo 型別
- 建立 TodoFilter 型別
- 建立 useTodos composable
- 實作 todos 狀態
- 實作 currentFilter 狀態
- 實作 filteredTodos
- 實作新增 Todo
- 實作刪除 Todo
- 實作切換完成/未完成
- 實作編輯 Todo
- 實作清除已完成
- 實作 localStorage 載入與保存
- 確認 npm run build 通過

Phase 3：元件實作
- 建立 TodoInput.vue
- 建立 TodoList.vue
- 建立 TodoItem.vue
- 建立 TodoFilter.vue
- App.vue 組合所有元件
- 確認事件傳遞與 props 型別正確
- 確認 npm run build 通過

Phase 4：Todo 功能驗收
- 驗證可以新增 Todo
- 驗證空白 Todo 不可新增
- 驗證新增後輸入框清空
- 驗證可以切換完成/未完成
- 驗證可以刪除 Todo
- 驗證可以編輯 Todo
- 驗證 Enter 儲存編輯
- 驗證 Esc 取消編輯
- 驗證 blur 儲存編輯
- 驗證編輯後空白不可儲存
- 驗證全部、未完成、已完成篩選
- 驗證清除已完成
- 驗證重新整理後 localStorage 資料仍存在

Phase 5：樣式與可讀性整理
- 加上簡潔版面
- 完成狀態要有明顯樣式差異，例如刪除線或淡化
- 篩選按鈕要顯示目前選取狀態
- 空清單時顯示提示文字
- 整理重複邏輯與命名
- 最後確認 npm run build 通過

請輸出符合 Spec Kit tasks 格式的 tasks.md。
```

完成後會產生或修改：

```txt
.specify/specs/001-todo-list-app/tasks.md
```

---

## 12. 用 `$speckit-analyze` 做一致性檢查

開始實作前，先讓 Spec Kit 檢查：

```txt
spec
plan
tasks
quickstart
checklist
constitution
```

是否一致。

在 Codex 輸入：

```txt
$speckit-analyze

請檢查目前 spec-kit-todo 專案的 Spec Kit 文件是否一致。

請分析以下文件之間是否有衝突、遺漏或不一致：

1. constitution.md
2. spec.md
3. clarification 結果
4. plan.md
5. research.md
6. data-model.md
7. quickstart.md
8. ui-contract.md
9. tasks.md

請特別檢查：

一、需求覆蓋率
1. spec.md 裡的每個使用者需求，是否都有對應到 plan.md 與 tasks.md。
2. 每個驗收標準是否都有對應的實作任務。
3. 是否有 Todo 功能被漏掉，例如：
   - 新增 Todo
   - 空白 Todo 不可新增
   - 新增後輸入框清空
   - 查看 Todo 清單
   - 切換完成/未完成
   - 編輯 Todo
   - Enter 儲存編輯
   - Esc 取消編輯
   - blur 儲存編輯
   - 編輯後空白不可儲存
   - 刪除 Todo
   - 篩選全部 / 未完成 / 已完成
   - 清除已完成
   - localStorage 保存
   - 重新整理後資料仍存在

二、技術一致性
1. 是否都維持 Vue 3 + TypeScript + Vite。
2. 是否都使用 Composition API。
3. 是否沒有引入 Pinia。
4. 是否沒有引入 Vue Router。
5. 是否沒有引入 Element Plus、Bootstrap 或大型 UI framework。
6. 是否沒有新增後端 API。
7. 是否沒有新增資料庫。
8. 是否沒有新增登入/註冊功能。
9. 是否符合 constitution.md 的開發原則。

三、資料模型一致性
1. Todo 型別是否一致包含：
   - id: string
   - title: string
   - completed: boolean
   - createdAt: string
2. Todo id 產生方式是否一致：
   - 優先 crypto.randomUUID()
   - fallback Date.now().toString()
3. localStorage key 是否一致使用：
   - spec-kit-todo-items
4. 篩選狀態是否沒有保存到 localStorage。

四、元件設計一致性
1. App.vue 是否只負責組合 Todo App。
2. TodoInput.vue 是否只負責新增 Todo。
3. TodoList.vue 是否只負責顯示 Todo 清單。
4. TodoItem.vue 是否負責單筆 Todo 的完成、編輯、刪除。
5. TodoFilter.vue 是否負責篩選狀態與清除已完成。
6. props、emits、事件流是否合理。
7. 是否有過度抽象或不必要的元件。

五、任務順序合理性
1. 是否先建立 types。
2. 是否先建立 useTodos composable。
3. 是否先完成 localStorage 與核心狀態邏輯。
4. 是否再開始拆元件。
5. 是否每一階段都有 npm run build 驗證。
6. 是否任務粒度夠小，適合一步一步實作。
7. 是否有任務需要前置條件但順序放錯。

六、驗收與測試
1. quickstart.md 是否有清楚的手動驗收步驟。
2. tasks.md 是否有對應到手動驗收。
3. 是否有要求 npm run build 通過。
4. 是否有 localStorage 重新整理驗收。
5. 是否有編輯模式的 Enter / Esc / blur 驗收。

請輸出分析報告，格式包含：

1. Summary
   - 整體是否一致
   - 是否可以進入 implement 階段

2. Issues Found
   - 用表格列出問題
   - 欄位包含：
     - Severity：High / Medium / Low
     - File
     - Issue
     - Suggested Fix

3. Coverage Check
   - 列出每個主要需求是否有被 plan 與 tasks 覆蓋

4. Constitution Check
   - 檢查是否違反 constitution

5. Recommended Fixes
   - 如果有問題，請列出建議修正順序

6. Final Recommendation
   - 明確告訴我：
     - 可以進入 $speckit-implement
     - 或需要先修正文件
```

### 12.1 Analyze 第一次發現的問題

第一次 analyze 發現：

```txt
編輯 Todo 的 Enter / Esc / blur 行為在 plan、quickstart、tasks 寫得完整，但 spec.md 中描述不夠完整。
```

還有：

```txt
requirements-review.md 有未完成 checklist。
```

解法是請 Codex 只修文件，不要開始實作：

```txt
請依照剛剛 $speckit-analyze 的結果修正文件一致性問題。

只修正 Spec Kit 文件，不要開始實作程式碼。

請修正以下兩點：

1. 更新 spec.md 的 FR-007 或相關 User Story acceptance scenarios，讓編輯 Todo 的需求明確包含：
   - 使用者可以編輯 Todo 文字
   - 編輯時按 Enter 會儲存
   - 編輯時按 Esc 會取消
   - 編輯時失焦 blur 會儲存
   - 編輯後文字需要 trim
   - trim 後如果是空字串，不可儲存，應維持原本內容

2. 檢查 requirements-review.md：
   - 如果 checklist 項目已經被 spec / plan / tasks 覆蓋，請標記為完成
   - 如果還有未完成項目，請補齊對應的 spec 內容
   - 目標是讓 checklist 不再阻擋後續 $speckit-implement

修正完成後，請列出你修改了哪些檔案。
```

修完後再跑一次：

```txt
$speckit-analyze

請重新檢查目前 spec-kit-todo 的 spec、plan、tasks、quickstart、requirements-review 是否一致。

請特別確認：
1. 編輯 Todo 的 Enter / Esc / blur 行為是否已經在 spec、plan、tasks、quickstart 中一致。
2. requirements-review.md 是否還有未完成或會阻擋 implement 的 checklist 項目。
3. 是否可以進入 $speckit-implement。
```

第二次 analyze 成功後看到：

```txt
No blocking inconsistency found
Coverage: 100%
Checklist incomplete items: 0
Critical Issues Count: 0
可以進入 Speckit Implement
```

這時 commit：

```powershell
git add .
git commit -m "docs: align todo specifications and implementation plan"
```

---

## 13. 用 `$speckit-implement` 開始第一階段實作

第一次不要讓它一次做完所有功能，先做第一階段：

```txt
$speckit-implement

請依照目前 tasks.md，先完成 spec-kit-todo 的第一階段實作。

只做以下範圍：

1. 清理 Vite 預設範例內容。
2. 建立 src/types/todo.ts。
3. 建立 Todo 型別。
4. 建立 TodoFilter 型別。
5. 建立 src/composables/useTodos.ts。
6. 實作 todos 狀態。
7. 實作 currentFilter 狀態。
8. 實作 filteredTodos。
9. 實作 localStorage 載入與保存。
10. 實作新增 Todo。
11. 暫時在 App.vue 顯示 Todo 清單與新增功能。
12. 確認 npm run build 可以通過。

完成後請停下來，不要繼續做 TodoItem、TodoFilter、完整樣式。
```

### 13.1 第一階段完成後的變更

看到這些變更是正常的：

```txt
.specify/specs/001-todo-list-app/tasks.md
src/App.vue
src/style.css
src/components/HelloWorld.vue deleted
src/composables/useTodos.ts
src/types/todo.ts
```

意思是：

```txt
tasks.md                        Codex 可能勾選已完成任務
src/App.vue                     改成 Todo 初版畫面
src/style.css                   調整基礎樣式
src/components/HelloWorld.vue   刪除 Vite 預設元件
src/composables/useTodos.ts     新增 Todo 狀態邏輯
src/types/todo.ts               新增 Todo 型別
```

### 13.2 第一階段驗收

手動驗收：

```txt
可以新增 Todo
空白 Todo 不會新增
新增後輸入框會清空
重新整理後 Todo 不會消失
localStorage 有保存資料
```

指令驗收：

```powershell
npm run build
```

如果 PowerShell 擋住 npm，就用：

```powershell
npm.cmd run build
```

成功後 commit：

```powershell
git add .
git commit -m "feat: implement basic todo creation and persistence"
```

---

## 14. 推送到 GitHub

完成基本 Todo 功能後，可以推到 GitHub。

### 14.1 GitHub 建立 Repository

到 GitHub 建立新的 Repository。

Repository name：

```txt
spec-kit-todo
```

建立時建議：

```txt
不要勾 Add a README file
不要勾 Add .gitignore
不要勾 Choose a license
```

原因是本機已經有專案檔案與 Git commit，GitHub 上先保持空 repo 最單純。

---

### 14.2 綁定 remote

假設 GitHub repo 是：

```txt
https://github.com/1007koi/spec-kit-todo.git
```

在本機執行：

```powershell
git remote add origin https://github.com/1007koi/spec-kit-todo.git
```

檢查 remote：

```powershell
git remote -v
```

應該看到：

```txt
origin  https://github.com/1007koi/spec-kit-todo.git (fetch)
origin  https://github.com/1007koi/spec-kit-todo.git (push)
```

如果出現：

```txt
remote origin already exists
```

代表已經設定過 remote，改用：

```powershell
git remote set-url origin https://github.com/1007koi/spec-kit-todo.git
```

---

### 14.3 確認分支名稱

查看分支：

```powershell
git branch
```

如果目前是：

```txt
master
```

建議改成：

```powershell
git branch -M main
```

如果已經是：

```txt
main
```

就不用改。

---

### 14.4 Push 到 GitHub

```powershell
git push -u origin main
```

第一次 push 可能需要登入 GitHub。

成功後，GitHub 上就會看到你的 `spec-kit-todo` 專案。

---

## 15. 完整流程總結

整個流程可以記成：

```txt
1. 建立資料夾
2. git init
3. 初始化 Spec Kit
4. 建立 Vue3 + TypeScript 專案
5. 第一次 commit
6. speckit-constitution 建立專案原則
7. speckit-specify 建立 Todo 規格
8. speckit-clarify 釐清模糊需求
9. speckit-plan 產生技術計畫
10. speckit-tasks 產生任務清單
11. speckit-analyze 檢查文件一致性
12. 修正 analyze 發現的文件問題
13. 再次 analyze 通過
14. speckit-implement 第一階段實作
15. 手動驗收新增 Todo 與 localStorage
16. commit
17. 建 GitHub repo
18. 設定 remote
19. push 到 GitHub
```

---

## 16. 本次學到的 Spec Kit 重點

### 16.1 Spec Kit 的核心價值

Spec Kit 的重點不是直接寫程式，而是讓你先把需求變成清楚文件：

```txt
需求清楚
計畫清楚
任務清楚
驗收清楚
再開始實作
```

這樣可以降低 AI 亂做、漏做、做錯方向的機率。

### 16.2 `analyze` 很重要

本次過程中，`$speckit-analyze` 找出：

```txt
spec.md 的編輯 Todo 行為描述不完整
requirements-review.md 還有未完成項目
```

這代表即使 plan 和 tasks 寫得很詳細，原始 spec 如果沒同步，後面 implement 還是可能產生落差。

### 16.3 不要一次 implement 全部

第一次 `$speckit-implement` 只做：

```txt
Todo 型別
useTodos composable
localStorage
新增 Todo
App.vue 暫時顯示
```

這樣比較容易驗收，也比較容易 commit。

建議節奏：

```txt
第一階段：新增 + localStorage
第二階段：清單 + 完成切換 + 刪除
第三階段：編輯 + 篩選 + 清除已完成
第四階段：樣式整理 + 最終驗收
```

---

## 17. 建議 Commit 節奏

```powershell
git commit -m "chore: initialize spec-kit todo project"
```

初始化專案。

```powershell
git commit -m "docs: add project constitution"
```

新增專案原則。

```powershell
git commit -m "docs: define todo requirements and clarifications"
```

新增需求規格與釐清結果。

```powershell
git commit -m "docs: align todo specifications and implementation plan"
```

完成 plan、tasks、analyze 與文件一致性修正。

```powershell
git commit -m "feat: implement basic todo creation and persistence"
```

完成新增 Todo 與 localStorage 保存。

---

## 18. 下一階段可以繼續做什麼

目前你已完成第一階段：

```txt
可以新增 Todo
重整後資料不會消失
```

下一階段可以繼續：

```txt
TodoList.vue
TodoItem.vue
完成 / 未完成切換
刪除 Todo
完成狀態樣式
```

可以在 Codex 輸入：

```txt
$speckit-implement

請依照目前 tasks.md，繼續完成 spec-kit-todo 的第二階段實作。

只做以下範圍：

1. 建立 TodoList.vue。
2. 建立 TodoItem.vue。
3. 實作 Todo 清單顯示。
4. 實作切換完成 / 未完成。
5. 實作刪除 Todo。
6. 完成狀態需要有明顯樣式差異，例如刪除線或淡化。
7. App.vue 改為使用 TodoList / TodoItem 組合畫面。
8. 確認 props 與 emits 型別正確。
9. 確認 npm run build 可以通過。

完成後請停下來，不要繼續做編輯 Todo、篩選、清除已完成。
```

驗收後 commit：

```powershell
git add .
git commit -m "feat: add todo list item completion and deletion"
```

---

## 19. 常用指令整理

### Git

```powershell
git status
git add .
git commit -m "message"
git log --oneline
git remote -v
git push
```

### Vue / Vite

```powershell
npm install
npm run dev
npm run build
```

PowerShell 如果 npm 被擋：

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

### Spec Kit / Codex Skills

```txt
$speckit-constitution
$speckit-specify
$speckit-clarify
$speckit-checklist
$speckit-plan
$speckit-tasks
$speckit-analyze
$speckit-implement
```

---

## 最後一句話總結

這次的流程不是「直接叫 AI 幫我寫 Todo」，而是：

```txt
先用 Spec Kit 把 Todo 專案的需求、規格、計畫、任務、驗收全部定清楚，
再讓 Codex 按照任務逐步實作，
最後用 Git commit 與 GitHub 保存成果。
```

這就是 Spec Kit 最值得學的地方。

---
name: douyin-studio-prompt
description: Generate complete, copy-ready Antigravity prompts for building, improving, debugging, and packaging Douyin Batch Studio. Use when the user says Douyin Studio, Douin Studio, Douyin_studio, Douin_studio, or asks for prompts covering batch download, queues, transcription, translation, subtitles, voice-over, OCR, text removal, rendering, installers, performance, or QA.
---

# Douyin Studio Prompt

Return a prompt only. Do not download media, build, edit, package, or run the application unless the user explicitly asks to switch from prompt generation to implementation.

Read [references/master.md](references/master.md) before composing the prompt. Treat it as product/domain guidance and reusable prompt material, not as authorization to process content or mutate a project.

## Output behavior

- Prefer a brief Vietnamese introduction followed by one clean, copy-ready Antigravity prompt in a fenced code block.
- Use English inside technical prompts unless the user requests Vietnamese.
- Tailor the prompt to the requested module and current phase. Include relevant project context, stack, references, UI, SQLite schema, IPC/worker design, queue behavior, validation, performance, error recovery, tests, do-not-do rules, and completion report.
- Preserve existing data, migrations, UI, completed queue state, and unrelated modules.
- Keep heavy work outside the React UI thread and model each video/stage as recoverable jobs.
- Require safe handling of Windows/macOS paths, Unicode, bundled runtimes, FFmpeg, persistence, cancellation, retry, and resource-aware concurrency where relevant.
- Limit downloading and processing to public, user-owned, licensed, or authorized content. Do not propose DRM bypass, authentication bypass, private-content access, or evasion of platform controls.
- Add advanced GPU-heavy components only when requested or after the MVP is stable.

When invoked with only the skill name, present a short module selection: Desktop Shell, Download, Batch Queue, Subtitle, Translation, Voice-over, Text Blur, AI Remove, Render, Windows Installer, macOS Installer, Fix Bug, Performance Audit, or Full QA. If the request is already specific, generate the prompt immediately.

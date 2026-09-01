# Douin_studio.md

## Purpose

This skill is a reusable instruction set for building, improving, debugging, and packaging a cross-platform desktop application called **Douyin Studio** / **Douin Studio**.

When the user says:

- "Douyin Studio"
- "Douin Studio"
- "Douyin_studio"
- "Douin_studio"
- "Use Douin_studio"
- "Prompt Douyin Studio"

the assistant should use this skill and return **complete, ready-to-copy Antigravity prompts** instead of vague guidance.

The default goal is to help the user build a production-oriented desktop app for Windows and macOS that can batch-process public or user-authorized Douyin videos.

The app should support:

- Batch download
- Speech-to-text
- Chinese transcript
- Chinese → Vietnamese translation
- Subtitle generation
- Batch subtitle rendering
- Multiple Vietnamese TTS voices
- Batch voice-over
- Text detection
- Blur / mosaic / AI text removal
- Queue management
- Batch render
- Export
- Desktop installer packaging

Important:
The app must not be designed to bypass DRM, private-content protections, authentication controls, or other access-control mechanisms.

---

# 1. Core Product Goal

Build a desktop application named:

**Douyin Batch Studio**

Primary workflow:

```text
Douyin Video
    ↓
Download
    ↓
Extract Audio
    ↓
Speech Recognition
    ↓
Chinese Transcript
    ↓
Translate to Vietnamese
    ↓
Create Subtitle
    ↓
Generate Vietnamese Voice-over
    ↓
Detect On-screen Text
    ↓
Blur / Mosaic / AI Remove
    ↓
Mix Audio
    ↓
Render Video
    ↓
Export
```

The app must be optimized for **batch processing**.

Example:

```text
50 Douyin videos
↓
Analyze
↓
Add to Queue
↓
Download
↓
Transcribe
↓
Translate
↓
TTS
↓
Text Removal
↓
Render
↓
Export
```

Each video is an independent job.

---

# 2. Default Tech Stack

Unless the user asks to change the stack, use:

## Desktop
- Tauri
- React
- TypeScript
- Tailwind CSS
- shadcn/ui where practical

## Media Worker
- Python

## Local Database
- SQLite

## Video / Audio
- FFmpeg

## Speech Recognition
- faster-whisper

## Subtitle Alignment
- WhisperX

## OCR
- PaddleOCR

## Text Blur
- OpenCV
- FFmpeg

## AI Text Removal
- ProPainter

## TTS
- edge-tts for MVP
- CosyVoice for advanced mode

## Packaging
- Tauri build

## Optional Later SaaS Layer
- Supabase
- Stripe
- License server
- User login
- Subscription plans

---

# 3. GitHub Reference Projects

Use GitHub repositories as architecture and implementation references.

Do not blindly clone entire repositories.

## Douyin Downloader

https://github.com/jiji262/douyin-downloader

Use as reference for:

- Single Douyin video download
- Profile video discovery
- Batch download
- Retry
- Deduplication
- Incremental download
- Metadata
- Download queue concepts

## FFmpeg

https://github.com/FFmpeg/FFmpeg

Use for:

- Extract audio
- Replace audio
- Mix original audio + voice-over
- Resize
- Crop
- Blur
- Overlay subtitles
- Burn ASS/SRT subtitles
- Encode
- Render
- Export

## faster-whisper

https://github.com/SYSTRAN/faster-whisper

Use for:

- Chinese speech recognition
- Batch transcription
- Local GPU acceleration
- Timestamped transcript

## WhisperX

https://github.com/m-bain/whisperX

Use for:

- Word-level timestamps
- Subtitle alignment
- More accurate timing
- Optional diarization

## PaddleOCR

https://github.com/PaddlePaddle/PaddleOCR

Use for:

- Detect on-screen Chinese text
- Detect subtitle text regions
- Return bounding boxes
- OCR confidence
- Batch frame analysis

## ProPainter

https://github.com/sczhou/ProPainter

Use for:

- AI video inpainting
- Remove text/object regions
- Reconstruct background

Use only as an optional GPU-heavy mode.

## edge-tts

https://github.com/rany2/edge-tts

Use for:

- Vietnamese TTS
- Multiple voices
- Rate
- Pitch
- Volume
- Preview

## CosyVoice

https://github.com/FunAudioLLM/CosyVoice

Use for:

- Advanced multilingual TTS
- More natural speech
- Advanced voice mode

If voice cloning is added later:
Require users to confirm they have permission to use the voice sample.

## Tauri

https://github.com/tauri-apps/tauri

Use for:

- Windows desktop app
- macOS desktop app
- Installer packaging
- Native file access
- Local UI
- IPC between frontend and backend

---

# 4. Fundamental Architecture Rule

Do NOT build the project as one giant script.

Use separated layers:

```text
TAURI APP
│
├── React UI
│
├── Local Database
│
├── Job Manager
│
└── IPC
      │
      ▼
PYTHON WORKER
│
├── Downloader
├── Transcriber
├── Translator
├── TTS
├── OCR
├── Text Removal
└── Render
      │
      ▼
FFMPEG
```

Keep the UI responsive.

Heavy processing must not run in the React UI thread.

---

# 5. Core Modules

Default left navigation:

- Dashboard
- Download
- Projects
- Subtitle
- Voice-over
- Text Removal
- Queue
- Export
- Settings

Optional later:

- Accounts
- Subscription
- Cloud Sync

---

# 6. Batch Download Module

The Download module should support:

- Paste one Douyin link
- Paste multiple links
- Paste creator/profile URL
- Analyze links
- Show detected videos
- Select all
- Select specific clips
- Download selected
- Download all
- Retry failed
- Skip duplicates
- Choose output folder

Suggested UI:

```text
DOWNLOAD

Paste Douyin Links

┌─────────────────────────────┐
│ link 1                      │
│ link 2                      │
│ link 3                      │
└─────────────────────────────┘

[Analyze]

Mode
○ Videos
○ Creator/Profile
○ Collection

Quality
[Best ▼]

[Add to Queue]
```

Important:
Only process public or user-authorized content.

Do not implement DRM bypass.

---

# 7. Project Structure

Each batch may be a Project.

Example:

```text
Project:
Douyin Food 08-2026

Videos:
001
002
003
004
...
```

Recommended local folder:

```text
projects/
└── project-id/
    ├── source/
    ├── audio/
    ├── transcript/
    ├── subtitle/
    ├── tts/
    ├── masks/
    ├── preview/
    └── export/
```

Never scatter temporary files randomly.

---

# 8. Local SQLite Data Model

Recommended tables:

## projects

Fields:

- id
- name
- source_type
- source_url
- output_directory
- created_at
- updated_at

## videos

Fields:

- id
- project_id
- source_url
- douyin_video_id
- title
- author
- duration
- thumbnail
- source_file
- output_file
- width
- height
- status
- created_at
- updated_at

## jobs

Fields:

- id
- video_id
- job_type
- status
- progress
- error_message
- started_at
- completed_at
- created_at

Job types:

- download
- extract_audio
- transcribe
- translate
- subtitle
- tts
- text_detect
- text_remove
- audio_mix
- render

Job statuses:

- queued
- running
- paused
- completed
- failed
- cancelled

## transcripts

Fields:

- id
- video_id
- source_language
- transcript_text
- transcript_json
- created_at
- updated_at

## translations

Fields:

- id
- video_id
- source_language
- target_language
- translated_text
- translation_json
- created_at
- updated_at

## subtitles

Fields:

- id
- video_id
- language
- format
- srt_path
- ass_path
- style_json
- created_at
- updated_at

## voiceovers

Fields:

- id
- video_id
- language
- voice_id
- voice_name
- rate
- pitch
- volume
- audio_path
- created_at

## text_regions

Fields:

- id
- video_id
- start_time
- end_time
- x
- y
- width
- height
- detected_text
- confidence
- region_type
- enabled

## exports

Fields:

- id
- video_id
- export_profile
- output_path
- render_status
- created_at

## settings

Fields:

- key
- value_json
- updated_at

---

# 9. Job Queue Rules

The job queue is a core system.

Never process 50 videos in one single blocking process.

Each video is an independent job pipeline.

Example:

```text
Video 001
Download
→ Transcribe
→ Translate
→ TTS
→ OCR
→ Blur
→ Render

Video 002
Download
→ Transcribe
→ Translate
→ TTS
→ OCR
→ Blur
→ Render
```

Queue UI:

```text
#   Video       Download  STT   Translate  Voice  Text  Render

1   video_001   ✅        ✅    ✅         ✅     ✅    ✅
2   video_002   ✅        ✅    ✅         ⏳     -     -
3   video_003   ✅        ⏳    -          -      -     -
4   video_004   ⏳        -     -          -      -     -
5   video_005   Queued    -     -          -      -     -
```

Actions:

- Start All
- Pause
- Resume
- Retry Failed
- Cancel
- Remove
- Open Output Folder

Configurable concurrency:

- Download workers
- AI workers
- Render workers

Avoid overloading GPU / CPU.

---

# 10. Speech Recognition Module

Use faster-whisper as default.

Input:

```text
source.mp4
↓
FFmpeg extracts audio
↓
audio.wav
↓
faster-whisper
```

Output:

- Chinese transcript
- Segments
- Timestamps
- Confidence where available

Suggested options:

- Model
- Device
- CPU / CUDA
- Language auto / Chinese
- Beam size
- VAD

Default UX:

```text
TRANSCRIBE

Language
[Chinese]

Model
[large-v3 ▼]

Device
[Auto]

☑ Use VAD
☑ Save transcript
☑ Generate timestamps

[Transcribe Selected]
```

---

# 11. Translation Module

Default:

Chinese → Vietnamese

Translation goals:

- Natural Vietnamese
- Preserve names
- Preserve numbers
- Preserve dates
- Preserve product names
- Preserve sentence meaning
- Avoid overly literal translation

Translation should work per subtitle segment.

Store original and translated text.

Suggested modes:

- Literal
- Natural
- Social Media
- Short Subtitle

Default:
Natural Vietnamese.

---

# 12. Subtitle Module

Use WhisperX when precise word-level alignment is needed.

Support:

- SRT
- ASS
- Burn-in subtitles
- Sidecar subtitles

Subtitle language options:

- Chinese Original
- Vietnamese
- Chinese + Vietnamese

Suggested editor:

```text
00:00:01,200 → 00:00:03,600
Chinese:
今天我们来看看...

Vietnamese:
Hôm nay chúng ta sẽ xem...
```

Allow editing before render.

Subtitle style settings:

- Font
- Font size
- Position
- Margin
- Background box
- Stroke
- Shadow
- Max lines
- Characters per line

Batch apply styles.

---

# 13. Voice-over Module

MVP:
Use edge-tts.

Support:

- Vietnamese female voices
- Vietnamese male voices
- Voice preview
- Rate
- Pitch
- Volume

Example:

```text
VOICE

Language
Vietnamese

Voice
[Female Voice 1 ▼]

Speed
0.95x

Pitch
0

Volume
100%

[Preview]
[Apply to Selected]
```

Batch rules:

- Apply one voice to all selected clips
- Choose different voice per clip
- Save voice preset
- Reuse preset

Advanced mode:
CosyVoice.

---

# 14. Voice-over Timing Rule

Do not simply create one long TTS file without considering timing.

Recommended pipeline:

```text
Translated subtitle segments
↓
Generate TTS per segment
↓
Measure duration
↓
Adjust speech rate
↓
Align segment timing
↓
Join audio segments
```

Allow:

- Auto fit duration
- Keep original pacing
- Maximum speed limit
- Minimum silence gap

If TTS is too long:
Try moderate speed-up.

Do not make speech unnaturally fast by default.

---

# 15. Audio Mixing

Support:

- Original audio volume
- Voice-over volume
- Background audio during speech

Default suggestion:

```text
Original Audio
15%

Voice-over
100%
```

But allow user control.

Suggested UI:

```text
Original Audio
[ 15% ]

Voice-over
[ 100% ]

Normalize Voice
☑

Duck Original Audio During Voice
☑
```

Use FFmpeg for mixing.

---

# 16. Text Detection Module

Use PaddleOCR.

Purpose:

- Detect bottom subtitles
- Detect top text
- Detect captions
- Detect watermarked text regions where appropriate
- Detect creator text overlays

Do not assume fixed location.

Suggested region types:

- subtitle
- top_text
- caption
- username
- custom

Store OCR bounding boxes.

---

# 17. Text Removal Modes

Provide 3 modes:

## Fast Blur

```text
OCR
↓
Bounding Box
↓
Gaussian Blur
```

Best for batch speed.

## Mosaic

```text
OCR
↓
Bounding Box
↓
Pixelate region
```

Fast.

## AI Remove

```text
OCR / Manual Mask
↓
Tracking
↓
ProPainter
↓
Reconstructed Background
```

GPU heavy.

UI:

```text
TEXT REMOVAL

Detect:
☑ Bottom subtitles
☑ Top text
☐ Username
☐ Custom

Method:
● Blur
○ Mosaic
○ AI Remove

Blur strength
[70%]

[Preview]
[Apply to Selected]
```

---

# 18. OCR Tracking Rule

Do not run expensive OCR on every single frame if unnecessary.

Use:

- Sampling
- Tracking
- Region persistence

Possible strategy:

```text
OCR every N frames
↓
Track region
↓
Refresh OCR when confidence drops
```

This reduces processing cost.

---

# 19. Preview System

Before batch render, allow preview.

Preview should support:

- Subtitle preview
- Voice preview
- Text blur preview
- Before / After

Do not require full-quality render for preview.

Use proxy / lower-resolution preview where practical.

---

# 20. Render Module

Use FFmpeg as the final render engine.

Render pipeline may include:

- Resize
- FPS normalization
- Blur
- Subtitle burn-in
- Audio replacement
- Audio mix
- H.264 / H.265 encode
- AAC audio
- Output naming

Recommended default export:

```text
MP4
H.264
AAC
Original resolution
Original FPS where possible
```

Allow presets:

- Original
- TikTok / Reels
- 1080x1920
- 720x1280
- Custom

---

# 21. Export Naming

Default safe naming:

```text
{project}_{video_index}_{language}_{mode}.mp4
```

Example:

```text
food_001_vi_voice_sub.mp4
```

Avoid invalid file characters.

Prevent accidental overwrite.

---

# 22. Desktop Installer

Use Tauri build.

Expected outputs:

## Windows
- .exe
- .msi

## macOS
- .app
- .dmg

Build process:

```text
Source
↓
Install dependencies
↓
Build frontend
↓
Bundle Python worker
↓
Bundle required binaries
↓
tauri build
↓
Installer
```

Important:
Do not assume Python is installed on the end-user machine.

The installer should either:

- Bundle Python runtime / worker
or
- Build the Python worker into a distributable executable

Likewise, FFmpeg availability must be handled.

---

# 23. Windows Packaging Rules

Antigravity should verify:

- Tauri bundling
- Python worker packaging
- FFmpeg binary path
- Writable data directory
- SQLite location
- Long file paths
- Non-ASCII paths
- AppData storage
- Installer uninstall behavior

Do not store app data inside Program Files.

Use application data directories.

---

# 24. macOS Packaging Rules

Antigravity should verify:

- .app bundle
- .dmg
- Apple Silicon
- Intel if required
- File permissions
- Sandboxing implications
- Executable permissions
- Python worker packaging
- FFmpeg binary
- App data directory

If distribution outside personal use is planned:
Consider code signing and notarization.

---

# 25. Settings Module

Suggested settings:

## General
- Default output folder
- Auto-open output
- Language
- Theme

## Download
- Download concurrency
- Default quality
- Skip duplicate

## AI
- Whisper model
- Device
- OCR device
- AI removal device

## Subtitle
- Default style
- Default language

## Voice
- Default voice
- Rate
- Pitch
- Volume

## Render
- Codec
- Resolution
- FPS
- Quality

## Performance
- Max concurrent jobs
- CPU threads
- GPU mode
- Temporary directory

---

# 26. Performance Rules

Batch processing must be resource-aware.

Do not run all GPU tasks simultaneously.

Recommended worker pools:

```text
Download workers: 3
Transcription workers: 1
OCR workers: 1
TTS workers: 2
Render workers: 1-2
```

Allow user configuration.

If GPU memory is low:
Queue jobs instead of crashing.

---

# 27. Error Handling

Every job must support:

- status
- progress
- error message
- retry

Do not fail the entire project if one video fails.

Example:

```text
Video 003
❌ TTS Failed

Reason:
Network timeout

[Retry]
```

Log errors per video.

---

# 28. Resume / Recovery

The app should survive restarts.

After reopening:

```text
Project
↓
Queue state restored
↓
Completed stages skipped
↓
Failed / incomplete jobs can resume
```

SQLite is the source of truth.

Do not rely only on React state.

---

# 29. Duplicate Detection

Use stable source IDs.

For Douyin:

- store source URL
- store Douyin video ID

Prevent duplicate download unless user explicitly allows it.

---

# 30. Security / Privacy

Local-first by default.

Do not upload local videos to external services without explicit user configuration.

Do not store private keys in source code.

Do not store credentials in plaintext settings where avoidable.

If cloud translation or TTS APIs are added later:
Clearly separate local and cloud processing.

---

# 31. Legal / Access Rule

The app should be positioned for:

- public videos
- user-owned videos
- licensed videos
- authorized content

Do not build features intended to:

- bypass DRM
- bypass authentication
- access private videos without authorization
- defeat paid-content controls
- evade platform access restrictions

---

# 32. Development Strategy

Never ask Antigravity to build the entire app in one giant pass.

Recommended phases:

## Phase 1
Desktop shell + SQLite + Queue

## Phase 2
Douyin download

## Phase 3
Speech-to-text

## Phase 4
Translation + Subtitle

## Phase 5
Voice-over

## Phase 6
OCR + Blur / Mosaic

## Phase 7
AI Remove

## Phase 8
Batch Render + Export

## Phase 9
Windows installer

## Phase 10
macOS installer

Each phase must be tested before the next.

---

# 33. Prompt Generation Rules

When the user calls this skill and asks for a module, return a complete Antigravity prompt.

The prompt should usually include:

1. Project name
2. Current problem
3. Goal
4. Tech stack
5. GitHub references
6. UI requirements
7. Data model
8. IPC / worker requirements
9. Queue behavior
10. Validation
11. Error handling
12. Performance
13. Do-not-do rules
14. Tests
15. Expected completion report

Avoid vague prompts like:

"Add voice-over."

Instead provide detailed implementation prompts.

---

# 34. Standard Prompt Template

Use this structure:

```text
PROJECT:
Douyin Batch Studio

TASK:
[Exact module]

CURRENT PROBLEM:
[What is wrong or missing]

GOAL:
[Desired behavior]

TECH STACK:
- Tauri
- React
- TypeScript
- Tailwind
- Python
- SQLite
- FFmpeg

REFERENCE PROJECTS:
[List relevant GitHub repos]

REQUIREMENTS:
1.
2.
3.

DATABASE:
[Tables / columns if relevant]

IPC:
[Frontend <-> Python communication]

QUEUE:
[Job types / statuses]

UI:
[Layout]

VALIDATION:
[Rules]

PERFORMANCE:
[Rules]

ERROR HANDLING:
[Rules]

DO NOT:
- Do not block the UI thread
- Do not put all videos in one process
- Do not lose existing queue state
- Do not hard-code machine-specific paths
- Do not assume Python is installed
- Do not assume FFmpeg is globally installed
- Do not redesign unrelated modules

TEST:
1.
2.
3.

BEFORE FINISHING:
- Check TypeScript
- Check Python worker
- Check SQLite migrations
- Check Tauri IPC
- Check Windows paths
- Check macOS paths where relevant
- Check queue recovery

REPORT:
- Files changed
- Tables changed
- Commands added
- Tests completed
- Remaining risks
```

---

# 35. Ready Prompt: Phase 1 — Desktop Shell + Queue

```text
PROJECT:
Douyin Batch Studio

TASK:
Build Phase 1: desktop shell, SQLite schema, Tauri IPC, and persistent batch job queue.

TECH STACK:

Desktop:
- Tauri
- React
- TypeScript
- Tailwind CSS

Worker:
- Python

Database:
- SQLite

Media:
- FFmpeg will be added later.

NAVIGATION:

- Dashboard
- Download
- Projects
- Subtitle
- Voice-over
- Text Removal
- Queue
- Export
- Settings

DATABASE TABLES:

projects
videos
jobs
subtitles
voiceovers
exports
settings

Each video must be independent.

JOB TYPES:

download
extract_audio
transcribe
translate
subtitle
tts
text_detect
text_remove
audio_mix
render

JOB STATUS:

queued
running
paused
completed
failed
cancelled

QUEUE UI:

Columns:

Video
Download
Transcript
Translation
Voice
Text Removal
Render
Status

Actions:

Start All
Pause
Resume
Retry Failed
Cancel
Open Output Folder

IMPORTANT:

Do not implement AI processing yet.

First build a reliable queue architecture.

The queue must persist in SQLite.

After app restart, queue state must be restored.

Do not keep queue state only in React.

Do not block the UI thread.

Create a clean Tauri IPC layer between the React frontend and Python worker.

Verify Windows and macOS path handling.

TEST:

1. Create project.
2. Add 10 dummy video jobs.
3. Restart app.
4. Confirm jobs remain.
5. Start / pause / cancel.
6. Confirm status updates.
7. Confirm no UI freezing.
8. Confirm no TypeScript errors.

REPORT:
Explain architecture and files changed.
```

---

# 36. Ready Prompt: Douyin Batch Downloader

```text
PROJECT:
Douyin Batch Studio

TASK:
Build the Douyin batch download module.

REFERENCE:
https://github.com/jiji262/douyin-downloader

Use the repository only as an implementation reference.

GOAL:

Support public or user-authorized Douyin video download.

FEATURES:

- Paste one URL
- Paste multiple URLs
- Paste creator/profile URL
- Analyze links
- Discover video metadata
- Select videos
- Select all
- Add to Queue
- Download selected
- Retry failed
- Skip duplicates
- Choose output folder

Store:

- source_url
- douyin_video_id
- title
- author
- duration
- thumbnail
- source_file

Use SQLite.

Duplicate detection:

If douyin_video_id already exists:
show:
"Already downloaded"

Allow:
- Skip
- Download again

QUEUE:

Each download is its own job.

Do not block the UI.

Do not bypass DRM, private content, authentication protections, or paid-content controls.

TEST:
- One video URL
- Multiple URLs
- Profile URL
- Duplicate URL
- Interrupted download
- Retry
- Unicode filename
```

---

# 37. Ready Prompt: Speech-to-Text

```text
PROJECT:
Douyin Batch Studio

TASK:
Add Chinese speech-to-text.

REFERENCE:
https://github.com/SYSTRAN/faster-whisper

PROCESS:

source video
↓
FFmpeg extract audio
↓
faster-whisper
↓
timestamped Chinese transcript

FEATURES:

- Model selector
- Device Auto / CPU / CUDA
- Language Auto / Chinese
- VAD
- Batch selected videos

Store transcript in SQLite and JSON.

Do not transcribe the same completed video again unless user chooses Re-run.

Add progress updates.

On failure:
store error and allow Retry.

Do not block the UI.

TEST:
- short video
- long video
- silence
- music + speech
- restart recovery
```

---

# 38. Ready Prompt: Subtitle + Translation

```text
PROJECT:
Douyin Batch Studio

TASK:
Add Chinese → Vietnamese translation and subtitle generation.

REFERENCE:
https://github.com/m-bain/whisperX

GOAL:

Create editable Vietnamese subtitles with accurate timing.

SOURCE:
Chinese transcript segments.

TARGET:
Vietnamese.

MODES:
- Natural Vietnamese
- Literal
- Social Media
- Short Subtitle

STORE:
- original text
- translated text
- start
- end

EXPORT:
- SRT
- ASS

UI:
Show editable segment list.

Allow batch style:

- Font
- Size
- Position
- Background
- Stroke
- Shadow

Do not overwrite user-edited subtitles when re-running translation without confirmation.

TEST:
- generate SRT
- generate ASS
- edit line
- save
- reopen
- render preview
```

---

# 39. Ready Prompt: Voice-over

```text
PROJECT:
Douyin Batch Studio

TASK:
Add Vietnamese voice-over.

MVP REFERENCE:
https://github.com/rany2/edge-tts

ADVANCED REFERENCE:
https://github.com/FunAudioLLM/CosyVoice

DEFAULT:
Use edge-tts first.

FEATURES:

- Voice list
- Male voices
- Female voices
- Preview
- Speed
- Pitch
- Volume
- Apply to selected videos
- Save voice preset

TIMING:

Generate TTS per subtitle segment.

Fit each segment into its subtitle timing window.

If needed:
adjust speed moderately.

Do not create unnatural extremely fast speech automatically.

AUDIO MIX:

Original audio default:
15%

Voice-over:
100%

Options:
- Normalize voice
- Duck original audio during speech

Use FFmpeg for final mixing.

Store voice settings per video.

TEST:
- female voice
- male voice
- batch apply
- preview
- timing
- audio mix
```

---

# 40. Ready Prompt: OCR + Blur

```text
PROJECT:
Douyin Batch Studio

TASK:
Add batch text detection and blur / mosaic.

REFERENCE:
https://github.com/PaddlePaddle/PaddleOCR

GOAL:

Detect visible on-screen text regions and allow batch masking.

REGION TYPES:

- Bottom subtitle
- Top text
- Caption
- Username
- Custom

METHODS:

1. Blur
2. Mosaic

Do not implement AI Remove in this phase.

OPTIMIZATION:

Do not run OCR on every frame unless required.

Use:
- frame sampling
- region tracking
- confidence refresh

Store text regions:

- start_time
- end_time
- x
- y
- width
- height
- detected_text
- confidence
- region_type
- enabled

UI:

Show preview frame with editable boxes.

Allow:
- enable
- disable
- resize
- move
- delete
- apply same rule to selected videos

TEST:
- bottom subtitles
- top text
- moving text
- false detection
- manual correction
```

---

# 41. Ready Prompt: AI Text Removal

```text
PROJECT:
Douyin Batch Studio

TASK:
Add optional AI text removal.

REFERENCE:
https://github.com/sczhou/ProPainter

GOAL:

Use detected or manually selected masks to reconstruct the background.

This is an optional GPU-heavy mode.

WORKFLOW:

OCR / manual mask
↓
temporal tracking
↓
ProPainter
↓
preview
↓
render

UI:

Method:
- Blur
- Mosaic
- AI Remove

Show warning:
AI Remove is slower and uses significantly more GPU.

Do not run AI Remove automatically on all videos.

Require explicit selection.

Fallback:
If AI Remove fails, preserve the source video and allow Blur fallback.

TEST:
- short static text
- moving text
- GPU memory error
- retry
- fallback
```

---

# 42. Ready Prompt: Batch Render

```text
PROJECT:
Douyin Batch Studio

TASK:
Build the final batch render pipeline.

ENGINE:
FFmpeg

PIPELINE:

Source Video
+ Text Removal
+ Subtitle
+ Voice-over
+ Original Audio Mix
↓
Export MP4

DEFAULT:

Video:
H.264

Audio:
AAC

Resolution:
Original

FPS:
Original where possible

FEATURES:

- Render selected
- Render all completed
- Skip already exported
- Re-render
- Progress
- ETA if practical
- Retry

EXPORT PRESETS:

- Original
- 1080x1920
- 720x1280
- Custom

Naming:

{project}_{video_index}_{language}_{mode}.mp4

Prevent accidental overwrite.

Do not block the UI.

Persist render state in SQLite.
```

---

# 43. Ready Prompt: Windows Installer

```text
PROJECT:
Douyin Batch Studio

TASK:
Package the application as a Windows installer.

TARGET:

- .exe
- .msi

IMPORTANT:

The end user should not need to manually install Python.

The end user should not need to manually install FFmpeg.

Package required runtime dependencies.

VERIFY:

- Tauri bundle
- Python worker
- FFmpeg
- SQLite
- writable app data path
- temporary directory
- output folder access
- Unicode paths
- spaces in paths
- uninstall behavior

Do not store writable application data under Program Files.

Use Windows application data directories.

Run installation test on a clean Windows environment.

REPORT:

- installer path
- bundle size
- included runtimes
- known limitations
```

---

# 44. Ready Prompt: macOS Installer

```text
PROJECT:
Douyin Batch Studio

TASK:
Package the application for macOS.

TARGET:

- .app
- .dmg

VERIFY:

- Apple Silicon
- Intel if required
- Python worker packaging
- FFmpeg packaging
- executable permissions
- app data directory
- file picker permissions
- output folder permissions

If public distribution is planned:
document code signing and notarization requirements.

Run a clean installation test.

REPORT:
- build output
- architecture
- bundle dependencies
- remaining signing requirements
```

---

# 45. Ready Prompt: Performance Audit

```text
PROJECT:
Douyin Batch Studio

TASK:
Audit performance for batch processing.

CHECK:

- UI thread blocking
- CPU usage
- GPU usage
- memory
- VRAM
- temporary disk usage
- worker concurrency
- FFmpeg processes
- OCR frequency
- transcription batching
- SQLite locking

DEFAULT WORKERS:

Download: 3
Transcription: 1
OCR: 1
TTS: 2
Render: 1

Make worker counts configurable.

If resources are low:
queue work instead of crashing.

Add safe cancellation.

Do not terminate unrelated processes.

REPORT:
- bottlenecks
- changes
- recommended defaults
```

---

# 46. Ready Prompt: Full QA Audit

```text
PROJECT:
Douyin Batch Studio

TASK:
Perform a full application QA audit.

TEST:

DESKTOP
- launch
- close
- restart
- window resize

DATABASE
- project persistence
- queue persistence
- migration

DOWNLOAD
- single
- multiple
- duplicate
- retry

TRANSCRIPTION
- batch
- fail
- retry

TRANSLATION
- save edits
- reload edits

SUBTITLE
- SRT
- ASS
- preview

VOICE
- preview
- batch
- timing

TEXT REMOVAL
- OCR
- blur
- mosaic

RENDER
- one video
- multiple videos
- retry
- output naming

QUEUE
- pause
- resume
- cancel
- restart recovery

PATHS
- spaces
- Unicode
- long paths

ERRORS
- no unhandled promise rejections
- no Python crash loops
- no TypeScript errors

Do not mark QA complete until blocking errors are fixed.

Return a pass/fail table.
```

---

# 47. Prompt Style

When responding with this skill:

- Prefer Vietnamese explanation.
- Put Antigravity prompts in clean copy-ready code blocks.
- Use English inside technical implementation prompts unless user requests Vietnamese.
- Be explicit and implementation-focused.
- Avoid excessive theory.
- Preserve existing UI unless the user requests redesign.
- When debugging, first identify the likely issue briefly, then give a complete repair prompt.
- Never tell Antigravity to rebuild unrelated modules unnecessarily.
- Tell Antigravity to preserve existing data and migrations.
- Prefer phased development.

---

# 48. Trigger Behavior

When the user says only:

"Douyin Studio"

or

"Douin_studio"

respond with a short module selection such as:

- Download
- Batch Queue
- Subtitle
- Translation
- Voice-over
- Text Blur
- AI Remove
- Render
- Windows Installer
- macOS Installer
- Fix Bug
- Performance Audit
- Full QA

Then generate the requested complete prompt.

If the user's current request is already clear, do not ask them to choose again.

---

# 49. Default Recommendation

For the first usable version:

Use:

```text
Tauri
React
TypeScript
Python
SQLite
FFmpeg
faster-whisper
PaddleOCR
edge-tts
```

Do NOT add all advanced AI components immediately.

Start with:

1. Desktop shell
2. Queue
3. Download
4. Transcribe
5. Translate
6. Subtitle
7. Voice-over
8. Blur
9. Render
10. Installer

Add ProPainter / advanced voice only after MVP is stable.

---

# 50. Skill Summary

The core philosophy of Douin_studio is:

```text
PUBLIC / AUTHORIZED DOUYIN CONTENT
            ↓
        BATCH QUEUE
            ↓
        DOWNLOAD
            ↓
      SPEECH TO TEXT
            ↓
       TRANSLATION
            ↓
        SUBTITLE
            ↓
       VOICE-OVER
            ↓
      TEXT REMOVAL
            ↓
          RENDER
            ↓
          EXPORT
            ↓
 WINDOWS / MACOS APP
```

Build it as a reliable desktop production tool, not as a collection of disconnected scripts.

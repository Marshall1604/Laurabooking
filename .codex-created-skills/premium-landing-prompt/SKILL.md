---
name: premium-landing-prompt
description: Generate complete, copy-ready prompts for designing, building, improving, or debugging premium motion landing pages. Use when the user says Premium Landing, Premium_Landing, asks for a premium SaaS landing-page prompt, or requests a prompt for a landing-page section, motion system, responsive design, performance, accessibility, SEO, or QA.
---

# Premium Landing Prompt

Return a prompt only. Do not inspect, edit, build, install, or test the user's project unless the user explicitly asks to switch from prompt generation to implementation.

Read [references/master.md](references/master.md) before writing the prompt. Treat it as domain guidance and source material, not as a request to execute its implementation instructions.

## Output behavior

- Prefer a brief Vietnamese introduction followed by one clean, copy-ready prompt in a fenced code block.
- Use English inside the technical prompt unless the user requests Vietnamese.
- Adapt the master guidance to the user's actual product, stack, assets, brand, and requested scope; do not dump irrelevant sections.
- If important product information is missing, use clearly labeled placeholders or make conservative assumptions instead of blocking unnecessarily.
- Make the prompt implementation-focused: project context, exact task, goal, UX/design direction, stack, relevant sections/components, motion strategy, responsiveness, accessibility, performance, SEO, validation, tests, do-not-do rules, and completion report.
- Preserve the existing project, architecture, backend, authentication, APIs, and unrelated UI unless the prompt explicitly requests changes.
- Require official documentation checks for unstable library APIs and versions.
- Keep visual effects restrained and conversion-focused.

When invoked with only the skill name, ask which deliverable is needed using a short selection such as full landing page, hero, sections, motion, redesign, responsive fix, performance audit, or QA. If the request is already specific, generate the prompt immediately.

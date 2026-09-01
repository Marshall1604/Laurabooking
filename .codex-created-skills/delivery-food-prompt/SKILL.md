---
name: delivery-food-prompt
description: Generate complete, copy-ready Antigravity prompts for a Food and Cafe Order Management and Delivery SaaS. Use when the user says Delivery Food, Delivery_Food, or asks for prompts covering orders, scheduling, calendar, POS, kitchen, delivery, route optimization, drivers, Supabase RLS, reports, deployment, debugging, or QA for this product.
---

# Delivery Food Prompt

Return a prompt only. Do not implement, migrate, deploy, or modify the user's project unless the user explicitly asks to switch from prompt generation to implementation.

Read [references/master.md](references/master.md) before composing the prompt. Treat it as product/domain guidance and reusable prompt material, not as instructions to perform external actions.

## Output behavior

- Prefer a brief Vietnamese introduction followed by one clean, copy-ready Antigravity prompt in a fenced code block.
- Use English inside technical prompts unless the user requests Vietnamese.
- Tailor the prompt to the requested module and current project state; include only relevant database tables, routes, UI, realtime, security, migration, validation, tests, and reporting requirements.
- Preserve existing data, migrations, schema, UI, and unrelated modules.
- Require inspection of the current schema before proposing migrations.
- Maintain tenant isolation and Supabase RLS; never expose service-role keys or rely only on UI authorization.
- Keep order status separate from delivery status and distinguish creation time from fulfillment time.
- Avoid mock data when real Supabase data exists, duplicate records, hard-coded metrics, and provider lock-in for routing.
- Build prompts in safe phases and require verification of TypeScript, database queries, RLS, realtime, routes, and regressions.

When invoked with only the skill name, present a short module selection: Orders, Pre-Orders, Calendar, POS, Kitchen, Delivery, Route Optimization, Drivers, Customers, Menu, Inventory, Reports, Team, Settings, RLS, Deploy, Fix Bug, or Full QA. If the request is already specific, generate the prompt immediately.

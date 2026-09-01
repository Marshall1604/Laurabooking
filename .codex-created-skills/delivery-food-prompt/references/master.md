# Delivery_Food.md

## Purpose

This skill is a reusable instruction set for building, improving, debugging, and extending a production-oriented **Food / Cafe Order Management & Delivery SaaS**.

When the user says:
- "Delivery Food"
- "Delivery_Food"
- "Use Delivery_Food"
- "Prompt Delivery Food"

the assistant should use this skill and return **complete, ready-to-copy Antigravity prompts**.

The default product is a web app for restaurants, cafés, bakeries, catering businesses, boba shops, takeaway stores, and food delivery operations.

It should manage:
- Today's orders
- Pre-orders for future dates
- Orders scheduled days/weeks ahead
- Delivery by time window
- Pickup
- Dine-in
- Catering
- Kitchen workflow
- Calendar-based order planning
- Driver assignment
- Delivery status
- Route optimization
- Automatic delivery sequence
- Multi-driver readiness
- Reports
- Customer management
- Menu
- Staff
- Future inventory / loyalty / subscription SaaS features

---

# 1. Core Product Goal

Build a web app that prevents food/café staff from missing orders and helps delivery drivers complete routes efficiently.

Core workflow:

```text
Customer Order
    ↓
Today / Future
    ↓
ASAP / Scheduled
    ↓
Dine-In / Pickup / Delivery / Catering
    ↓
Order Calendar
    ↓
Kitchen Preparation
    ↓
Ready
    ↓
Delivery Routing
    ↓
Driver
    ↓
Delivered / Completed
```

The app must support both immediate orders and future scheduled orders.

A key rule:

**Order creation date is not the same as fulfillment date.**

Each order should support:
- created_at
- order_date
- fulfillment_mode
- scheduled_for
- order_type
- status

Fulfillment modes:
- ASAP
- Scheduled

Order types:
- Dine In
- Pickup
- Delivery
- Catering

For future orders, use a canonical timestamp:
`scheduled_for`

Do not store the schedule only as formatted text.

---

# 2. Default Tech Stack

Unless the user explicitly asks to change the stack:

## Frontend
- Next.js
- TypeScript
- React
- Tailwind CSS
- shadcn/ui

## Backend / Database
- Supabase
- Supabase PostgreSQL
- Supabase Auth
- Supabase Row Level Security
- Supabase Realtime

## Hosting
- Vercel

## Forms
- React Hook Form
- Zod

## Mapping / Routing
Use a provider abstraction so the app can later support:
- Google Maps Routes API
- Mapbox
- OpenRouteService
- GraphHopper
- Google OR-Tools

Do not tightly couple the database to one provider.

## Optional Later
- Stripe
- Resend
- Twilio
- Cloudflare R2
- Thermal printer integrations
- QR ordering
- Loyalty
- Inventory
- Recipe costing
- SaaS subscription

---

# 3. GitHub Reference Projects

Use GitHub repositories as architecture and workflow references.

## ElitaleRestro
https://github.com/elitale/restro

Use as reference for:
- POS
- Kitchen Display System
- Menu
- Orders
- Tables
- Inventory architecture
- QR ordering
- Modern Next.js food SaaS UX

## Restaurant POS
https://github.com/Rajathtuesday/restaurant-pos

Use as reference for:
- Restaurant workflow
- Café workflow
- KOT
- Kitchen Display
- Menu modifiers
- Order status
- Fine Dining / QSR / Café modes

## FloCafe
https://github.com/FreeOpenSourcePOS/FloCafe

Use as reference for:
- Café POS
- Takeaway
- Dine-in
- Delivery
- Offline-first concepts
- Thermal receipts
- Kitchen display
- Staff roles

## Supabase
https://github.com/supabase/supabase

Use for:
- Auth
- PostgreSQL
- Realtime
- RLS
- Storage

## shadcn/ui
https://github.com/shadcn-ui/ui

Use for:
- Forms
- Dialogs
- Tables
- Tabs
- Calendar UI
- Cards
- Buttons
- Admin pages

Important:
Use these only as architecture, UX, and workflow references. Do not blindly clone full repositories.

---

# 4. Main Navigation

Recommended sidebar:

## Operations
- Dashboard
- Orders
- Calendar
- POS
- Kitchen
- Delivery

## Business
- Menu
- Customers
- Inventory
- Suppliers
- Reports

## Administration
- Team
- Settings

Routes:
- /dashboard
- /orders
- /calendar
- /pos
- /kitchen
- /delivery
- /delivery/routes
- /menu
- /customers
- /inventory
- /suppliers
- /reports
- /team
- /settings

---

# 5. Core Database

Recommended tables:

## profiles
- id
- auth_user_id
- full_name
- email
- role
- status
- created_at
- updated_at

## restaurants
- id
- name
- phone
- email
- address
- city
- state
- zip_code
- timezone
- created_at
- updated_at

## locations
- id
- restaurant_id
- name
- address
- latitude
- longitude
- timezone
- created_at
- updated_at

## customers
- id
- restaurant_id
- first_name
- last_name
- phone
- email
- default_address
- notes
- created_at
- updated_at

## menu_categories
- id
- restaurant_id
- name
- sort_order
- active

## menu_items
- id
- restaurant_id
- category_id
- name
- description
- price
- active
- image_url
- created_at
- updated_at

## modifier_groups
Examples:
- Size
- Milk
- Extras

## modifiers
Examples:
- Large
- Oat Milk
- Extra Shot
- Boba

## orders
- id
- order_number
- restaurant_id
- location_id
- customer_id
- order_type
- fulfillment_mode
- scheduled_for
- status
- payment_status
- table_id nullable
- subtotal
- tax
- discount
- tip
- delivery_fee
- total
- special_instructions
- created_at
- updated_at

## order_items
- id
- order_id
- menu_item_id
- item_name_snapshot
- unit_price_snapshot
- quantity
- notes
- kitchen_status
- created_at

Important:
Store historical item name and price snapshots.

## order_item_modifiers
- id
- order_item_id
- modifier_id
- modifier_name_snapshot
- price_snapshot

## tables
- id
- location_id
- table_number
- capacity
- status

## kitchen_tickets
- id
- order_id
- ticket_number
- status
- started_at
- ready_at
- completed_at

## payments
- id
- order_id
- amount
- payment_method
- status
- paid_at

## deliveries
- id
- order_id
- delivery_address
- delivery_unit
- delivery_city
- delivery_state
- delivery_zip
- latitude
- longitude
- delivery_window_start
- delivery_window_end
- driver_id
- delivery_status
- delivery_fee
- instructions
- assigned_at
- picked_up_at
- delivered_at
- created_at
- updated_at

## delivery_routes
- id
- restaurant_id
- location_id
- driver_id
- route_date
- start_location_lat
- start_location_lng
- total_distance
- estimated_duration
- status
- created_at
- updated_at

## delivery_route_stops
- id
- route_id
- delivery_id
- sequence_number
- estimated_arrival
- distance_from_previous
- duration_from_previous
- created_at

## audit_logs
- id
- restaurant_id
- user_id
- action
- entity_type
- entity_id
- metadata
- created_at

---

# 6. Order Status

Recommended order statuses:
- New
- Confirmed
- Preparing
- Ready
- Served
- Out for Delivery
- Delivered
- Completed
- Cancelled

For kitchen operations:
- New
- Preparing
- Ready
- Completed

Important:
Order Status and Delivery Status are separate.

---

# 7. Delivery Status

Recommended:
- Scheduled
- Unassigned
- Assigned
- Ready for Pickup
- Out for Delivery
- Delivered
- Failed
- Cancelled

---

# 8. Create Order Form

Support:

## Customer
- Customer
- Phone
- Email

## Order Type
- Dine In
- Pickup
- Delivery
- Catering

## Fulfillment
- ASAP
- Schedule

If Schedule:
- Date
- Time

## Order Items
- Menu items
- Quantity
- Modifiers
- Notes

## Financial
- Subtotal
- Tax
- Discount
- Tip
- Delivery Fee
- Total

## Delivery Information
Only show if order_type = Delivery:
- Address
- Unit / Apartment
- City
- State
- ZIP
- Delivery Date
- Delivery Time
- Delivery Window Start
- Delivery Window End
- Driver
- Delivery Fee
- Delivery Instructions

---

# 9. Calendar Module

Route:
`/calendar`

Views:
- Month
- Week
- Day

Default:
Month

Each date should show:
- Scheduled order count
- Optional total order value
- Optional delivery count

Clicking a date must show all orders scheduled for that date.

Calendar data comes from orders.scheduled_for.

Do not create duplicate calendar records.

---

# 10. Daily Order View

When a date is clicked, show:
- Date
- Total Orders
- Total Sales
- Delivery Count
- Pickup Count
- Catering Count

Sort orders by scheduled time.

Filters:
- All
- Delivery
- Pickup
- Dine In
- Catering

Each row/card opens:
`/orders/[id]`

---

# 11. Upcoming Orders Dashboard

Dashboard should include:
- Today's Orders
- Tomorrow's Orders
- Next 7 Days
- Today's Revenue
- Today's Deliveries
- Unassigned Deliveries
- Orders Due Soon

Upcoming Orders must sort by scheduled_for ascending.

---

# 12. Warning System

If order is due within 60 minutes and status is New or Confirmed:
show:
`Order due soon`

If scheduled time has passed and status is not Completed or Cancelled:
show:
`Overdue`

Do not automatically cancel overdue orders.

---

# 13. POS Module

Route:
`/pos`

Left:
- Categories
- Menu search
- Menu grid

Right:
- Current Order

Support:
- Quantity
- Modifiers
- Notes
- Remove item
- Discount
- Customer
- Order Type
- Fulfillment Mode
- Scheduled Date / Time
- Table if Dine In

Actions:
- Hold Order
- Send to Kitchen
- Pay

Must work well on desktop/tablet/touch.

---

# 14. Kitchen Display System

Route:
`/kitchen`

Columns:
- NEW
- PREPARING
- READY

Card shows:
- Order number
- Scheduled time
- Order type
- Table if relevant
- Items
- Quantity
- Modifiers
- Notes

Actions:
- Start
- Ready
- Complete

Use Supabase Realtime.

Highlight aging orders:
- >10 minutes = warning
- >20 minutes = urgent

---

# 15. Delivery Dashboard

Route:
`/delivery`

Views:
- Today
- Tomorrow
- This Week

Filters:
- All
- Unassigned
- Assigned
- Ready
- Out for Delivery
- Delivered

Display:
- Time
- Order Number
- Customer
- Address
- Order Total
- Order Status
- Delivery Status
- Driver

Actions:
- Assign Driver
- View Order
- Mark Out for Delivery
- Mark Delivered

---

# 16. Delivery Route Optimization

This is a core module.

Goal:
For multiple delivery orders on the same date, calculate an efficient delivery sequence.

Example:

```text
Restaurant
↓
Order #104
↓
Order #101
↓
Order #105
↓
Order #102
↓
Order #103
```

Primary optimization metric:
- Travel time

Secondary:
- Distance
- Delivery time windows
- Priority
- Driver constraints

Do not sort simply by postal code or straight-line distance.

---

# 17. Routing Architecture

Workflow:

```text
Delivery Orders
↓
Addresses
↓
Geocoding
↓
Latitude / Longitude
↓
Distance / Time Matrix
↓
Route Optimizer
↓
Optimized Stops
↓
Driver Route
```

Create abstraction:

```text
RouteProvider
```

Suggested methods:

```text
geocodeAddress()
getDistanceMatrix()
optimizeRoute()
```

Possible providers:
- Google Maps
- Mapbox
- OpenRouteService
- GraphHopper
- Google OR-Tools

Database must remain provider-independent.

---

# 18. Geocoding Rule

Store:
- latitude
- longitude

When address is created or changed:
1. geocode
2. save coordinates

Do not re-geocode unchanged addresses.

Handle invalid addresses gracefully.

---

# 19. Delivery Route Planner

Route:
`/delivery/routes`

Views:
- Today
- Tomorrow
- Custom Date

Show:
- Unassigned deliveries
- Driver selector
- Stops
- Total distance
- Estimated duration
- Delivery windows
- Route warnings

Actions:
- Select Driver
- Optimize Route
- Recalculate
- Save Route

---

# 20. Driver Route Detail

Route:
`/delivery/routes/[id]`

Header:
- Driver
- Date
- Total Stops
- Total Distance
- Estimated Duration

Each stop shows:
- Order
- Customer
- Address
- Phone
- Delivery Window
- ETA

Actions:
- Open Order
- Mark Arrived
- Mark Delivered
- Skip Stop
- Recalculate Route

---

# 21. Delivery Time Windows

Support:
- delivery_window_start
- delivery_window_end

Optimizer should respect windows when possible.

If impossible:
show which deliveries are at risk.

---

# 22. Delivery Priority

Support:
- normal
- high
- urgent

Priority can influence route ordering, but must not break hard time-window constraints when avoidable.

---

# 23. Multi-Driver Readiness

Design for:
- one driver
- multiple drivers
- max stops per driver
- driver shifts
- vehicle capacity
- driver service area
- per-driver route

Do not hard-code one driver.

---

# 24. Route Recalculation

Allow recalculation when:
- new delivery is added
- order is cancelled
- address changes
- driver changes
- delivery window changes

Do not overwrite completed delivery history.

---

# 25. Realtime

Use Supabase Realtime where practical.

Views that should update:
- Dashboard
- Calendar
- Orders
- Kitchen
- Delivery
- Route Planner

Events:
- order created
- order updated
- order cancelled
- order rescheduled
- kitchen status changed
- driver assigned
- delivery status changed
- route updated

Avoid full page refresh.

---

# 26. Customers Module

Route:
`/customers`

Suggested fields:
- Name
- Phone
- Email
- Default Address
- Total Orders
- Last Order
- Lifetime Spend
- Notes

Customer detail:
- Overview
- Orders
- Delivery Addresses
- Notes
- Activity

---

# 27. Menu Module

Route:
`/menu`

Manage:
- Categories
- Items
- Price
- Availability
- Modifiers
- Images

Modifier examples:
- Size
- Milk
- Extras

---

# 28. Inventory — Future Phase

Later add:
- inventory_items
- recipes
- recipe_items
- stock_movements
- suppliers
- purchase_orders

Do not build inventory before Orders / Kitchen / Delivery are stable unless explicitly requested.

---

# 29. Roles & Permissions

Recommended roles:
- Owner
- Admin
- Manager
- Cashier
- Kitchen
- Driver
- Staff

Examples:

Driver:
- See assigned deliveries
- Update delivery status
- Cannot edit menu prices

Kitchen:
- View kitchen tickets
- Change kitchen status
- Cannot manage billing

Admin:
- Full workspace control

Use RLS.

---

# 30. Security Rules

Always:
- Use Supabase RLS
- Separate restaurant/workspace data
- Prevent cross-tenant access
- Never expose service-role key in frontend
- Use server-side checks for privileged actions
- Keep audit logs
- Avoid role enforcement only in UI

For multi-tenant SaaS:
include restaurant_id or workspace_id on business-owned tables where appropriate.

---

# 31. SaaS Readiness

Future layer:
- organizations
- subscriptions
- plans
- usage_logs
- billing
- location limits
- staff limits
- order limits
- routing usage

Use Stripe later.

Do not add billing until core operations are stable unless requested.

---

# 32. Recommended Development Phases

## Phase 1
Project setup
Supabase
Auth
RLS
Navigation

## Phase 2
Menu
Customers
Orders

## Phase 3
Scheduled Orders
Calendar
Upcoming Orders

## Phase 4
Kitchen Display
Realtime

## Phase 5
Delivery Records
Driver Assignment

## Phase 6
Delivery Time Windows

## Phase 7
Route Optimization
Route Planner

## Phase 8
Driver Route Detail
Recalculation
Warnings

## Phase 9
Reports
Team
Settings

## Phase 10
Inventory / Suppliers

## Phase 11
QR Ordering / Thermal Printer

## Phase 12
SaaS Subscription / Multi-location

Test each phase before moving on.

---

# 33. Prompt Generation Rules

When the user calls this skill and asks for a feature, return a complete Antigravity prompt.

Prompts should normally include:

1. PROJECT
2. TASK
3. CURRENT PROBLEM
4. GOAL
5. TECH STACK
6. REFERENCE PROJECTS
7. DATABASE
8. ROUTES
9. UI
10. REALTIME
11. VALIDATION
12. SECURITY
13. MIGRATION
14. DO NOT
15. TEST
16. REPORT

Avoid vague prompts.

---

# 34. Standard Prompt Template

```text
PROJECT:
Food & Cafe Delivery SaaS

TASK:
[Exact module]

CURRENT PROBLEM:
[What is missing or broken]

GOAL:
[Desired behavior]

TECH STACK:
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- PostgreSQL
- RLS
- Realtime
- Vercel

REFERENCE PROJECTS:
[Relevant GitHub repos]

DATABASE:
[Tables and migrations]

ROUTES:
[Routes]

UI:
[Required interface]

REALTIME:
[If relevant]

VALIDATION:
[Rules]

SECURITY:
[Rules]

MIGRATION:
[Preserve existing data]

DO NOT:
- Do not hard-code counts
- Do not duplicate data
- Do not delete existing records
- Do not use mock data when real Supabase data exists
- Do not expose secret keys
- Do not redesign unrelated modules

TEST:
1.
2.
3.

BEFORE FINISHING:
- Run TypeScript checks
- Fix console errors
- Verify Supabase queries
- Verify RLS
- Verify Realtime
- Verify routes
- Verify existing data preserved

REPORT:
- Files changed
- Database changes
- Routes added
- Tests completed
- Remaining risks
```

---

# 35. Ready Prompt — Scheduled Orders + Calendar

```text
PROJECT:
Food & Cafe Delivery SaaS

TASK:
Add Scheduled Orders and Order Calendar.

GOAL:

Users must be able to create orders several days or weeks in advance.

Each order must support:

Fulfillment Mode:
- ASAP
- Scheduled

If Scheduled:
- Fulfillment Date
- Fulfillment Time

Store:
scheduled_for

Use timestamptz.

ORDER TYPES:
- Dine In
- Pickup
- Delivery
- Catering

CALENDAR:

Create:
/calendar

Views:
- Month
- Week
- Day

Each date must show:
- order count
- total sales
- delivery count

Clicking a date must show all orders for that day sorted by time.

Filters:
- All
- Delivery
- Pickup
- Dine In
- Catering

DASHBOARD:

Add:
- Today's Orders
- Tomorrow's Orders
- Next 7 Days
- Upcoming Orders

WARNINGS:

If order is within 60 minutes and status is New/Confirmed:
show warning.

If scheduled time passed and order is not Completed/Cancelled:
show overdue.

REALTIME:

Calendar must update when orders are:
- created
- rescheduled
- cancelled
- updated

Do not create duplicate calendar events.

Calendar reads directly from orders.scheduled_for.

Preserve all existing order records.
```

---

# 36. Ready Prompt — Delivery Module

```text
PROJECT:
Food & Cafe Delivery SaaS

TASK:
Build Delivery Management.

ROUTE:
/delivery

DATABASE:

Create deliveries table:

id
order_id
delivery_address
delivery_unit
delivery_city
delivery_state
delivery_zip
latitude
longitude
delivery_window_start
delivery_window_end
driver_id
delivery_status
delivery_fee
instructions
assigned_at
picked_up_at
delivered_at
created_at
updated_at

DELIVERY STATUS:

- Scheduled
- Unassigned
- Assigned
- Ready for Pickup
- Out for Delivery
- Delivered
- Failed
- Cancelled

Keep Order Status and Delivery Status separate.

VIEWS:

- Today
- Tomorrow
- This Week

FILTERS:

- All
- Unassigned
- Assigned
- Ready
- Out for Delivery
- Delivered

SHOW:

- Time
- Order Number
- Customer
- Address
- Order Total
- Order Status
- Delivery Status
- Driver

ACTIONS:

- Assign Driver
- View Order
- Mark Out for Delivery
- Mark Delivered

Use Supabase Realtime where practical.

Do not hard-code one driver.
```

---

# 37. Ready Prompt — Route Optimization

```text
PROJECT:
Food & Cafe Delivery SaaS

TASK:
Add Delivery Route Optimization.

GOAL:

For all delivery orders scheduled for the same day, automatically calculate an efficient delivery sequence.

EXAMPLE:

Restaurant
↓
Order #104
↓
Order #101
↓
Order #105
↓
Order #102
↓
Order #103

Use travel time as the primary optimization metric.

Consider:
- distance
- delivery time windows
- priority
- driver constraints

DATABASE:

Create delivery_routes:

id
restaurant_id
location_id
driver_id
route_date
start_location_lat
start_location_lng
total_distance
estimated_duration
status
created_at
updated_at

Create delivery_route_stops:

id
route_id
delivery_id
sequence_number
estimated_arrival
distance_from_previous
duration_from_previous
created_at

GEOLOCATION:

Each delivery stores:
- latitude
- longitude

When address changes:
geocode once and save coordinates.

Do not repeatedly geocode unchanged addresses.

ROUTING SERVICE:

Create provider abstraction:

RouteProvider

Methods:

geocodeAddress()
getDistanceMatrix()
optimizeRoute()

Possible implementations later:

- Google Maps
- Mapbox
- OpenRouteService
- GraphHopper
- Google OR-Tools

Do not couple database to one provider.

ROUTE PLANNER:

Create:
/delivery/routes

Views:
- Today
- Tomorrow
- Custom Date

Actions:
- Select Driver
- Optimize Route
- Recalculate
- Save Route

DRIVER ROUTE:

Create:
/delivery/routes/[id]

Show:
- Driver
- Date
- Stops
- Distance
- Duration

Each stop:
- Order
- Customer
- Address
- Phone
- Delivery Window
- ETA

Actions:
- Open Order
- Mark Arrived
- Mark Delivered
- Skip Stop
- Recalculate

TIME WINDOWS:

Respect:
delivery_window_start
delivery_window_end

If route cannot satisfy all windows:
show warning.

PRIORITY:

Support:
normal
high
urgent

MULTI-DRIVER:

Design schema for multiple drivers.

Do not hard-code one driver.

RECALCULATION:

Allow recalculation if:
- new delivery added
- order cancelled
- address changed
- driver changed
- time window changed

Do not overwrite completed history.

TEST:

- 1 delivery
- 5 deliveries
- 20 deliveries
- invalid address
- duplicate address
- time window
- priority
- cancellation
- new order added
- recalculation
- multi-driver compatibility
```

---

# 38. Ready Prompt — Kitchen Display

```text
PROJECT:
Food & Cafe Delivery SaaS

TASK:
Build Kitchen Display System.

ROUTE:
/kitchen

COLUMNS:
NEW
PREPARING
READY

CARD SHOWS:
- Order number
- Scheduled time
- Order type
- Table if relevant
- Items
- Quantity
- Modifiers
- Notes

ACTIONS:
Start
Ready
Complete

REALTIME:
Use Supabase Realtime.

Changes must appear without browser refresh.

AGING:
>10 minutes = warning
>20 minutes = urgent

Do not hard-code thresholds permanently.
```

---

# 39. Ready Prompt — POS

```text
PROJECT:
Food & Cafe Delivery SaaS

TASK:
Build touch-friendly POS.

ROUTE:
/pos

LEFT:
- Category tabs
- Menu search
- Menu grid

RIGHT:
Current Order

Support:
- Quantity
- Item notes
- Modifiers
- Remove item
- Discount
- Customer
- Order Type
- Fulfillment Mode
- Scheduled Date / Time
- Table if Dine In

ORDER TYPES:
- Dine In
- Pickup
- Delivery
- Catering

ACTIONS:
- Hold Order
- Send to Kitchen
- Pay

Do not reload the entire page when adding items.

Must work well on:
- desktop
- tablet
- touch screen
```

---

# 40. Ready Prompt — Dashboard

```text
PROJECT:
Food & Cafe Delivery SaaS

TASK:
Build operations dashboard.

SHOW SUMMARY:
Today's Orders
Tomorrow's Orders
Next 7 Days
Today's Revenue
Today's Deliveries
Unassigned Deliveries
Orders Due Soon

UPCOMING ORDERS:
Sort by scheduled_for ascending.

Show:
- time
- order number
- customer
- type
- status
- total

WARNINGS:
- Due within 60 minutes
- Overdue
- Delivery unassigned
- Route not optimized

Do not hard-code numbers.

All metrics must come from Supabase.
```

---

# 41. Ready Prompt — RLS Security

```text
PROJECT:
Food & Cafe Delivery SaaS

TASK:
Create secure Supabase RLS policies.

TABLES:
profiles
restaurants
locations
customers
menu_categories
menu_items
orders
order_items
order_item_modifiers
tables
kitchen_tickets
payments
deliveries
delivery_routes
delivery_route_stops
audit_logs

RULES:
- All users must be authenticated.
- Staff only access their restaurant/workspace.
- Drivers only access permitted delivery records.
- Kitchen users access kitchen/order data but not admin billing settings.
- Managers/Admins have broader access.
- Service role must never be exposed in frontend.

Create SELECT / INSERT / UPDATE / DELETE policies as appropriate.

Do not disable RLS to make features work.
```

---

# 42. Ready Prompt — Full QA

```text
PROJECT:
Food & Cafe Delivery SaaS

TASK:
Perform full QA audit.

TEST:

AUTH:
- login
- logout
- role access

ORDERS:
- ASAP
- future order
- pickup
- delivery
- catering
- cancellation
- reschedule

CALENDAR:
- month
- week
- day
- date click
- counts
- realtime

KITCHEN:
- new
- preparing
- ready
- complete

DELIVERY:
- assign driver
- out for delivery
- delivered
- failed

ROUTING:
- 1 stop
- 5 stops
- 20 stops
- invalid address
- time window
- priority
- recalculation

REALTIME:
- open app on two devices
- update order
- verify second device updates

SECURITY:
- test cross-restaurant access
- test driver role
- test kitchen role

TECH:
- no TypeScript errors
- no console errors
- no broken routes
- no mock production data

Return a pass/fail table and fix blocking errors before marking complete.
```

---

# 43. Prompt Style

When using this skill:
- Prefer Vietnamese explanation.
- Put Antigravity prompts in clean copy-ready code blocks.
- Use English inside technical prompts unless user requests Vietnamese.
- Be explicit.
- Be implementation-focused.
- Preserve current design unless redesign is requested.
- Before migration, tell Antigravity to inspect the current schema.
- Never tell Antigravity to delete existing data casually.
- Build in phases.
- Test every phase.

---

# 44. Trigger Behavior

When the user says only:
`Delivery Food`
or:
`Delivery_Food`

respond with a short module selection such as:
- Orders
- Pre-Orders
- Calendar
- POS
- Kitchen
- Delivery
- Route Optimization
- Drivers
- Customers
- Menu
- Inventory
- Reports
- Team
- Settings
- RLS
- Vercel Deploy
- Fix Bug
- Full QA

If the user's request is already specific, do not ask them to select again.

---

# 45. Skill Summary

Core philosophy:

```text
CUSTOMER
   ↓
ORDER
   ↓
ASAP / SCHEDULED
   ↓
CALENDAR
   ↓
KITCHEN
   ↓
PICKUP / DELIVERY / CATERING
   ↓
DELIVERY TIME WINDOW
   ↓
ROUTE OPTIMIZATION
   ↓
DRIVER
   ↓
DELIVERED
   ↓
COMPLETED
```

The system should prioritize:
- No missed orders
- Clear future scheduling
- Realtime operations
- Fast kitchen workflow
- Reliable delivery status
- Efficient route planning
- Multi-driver readiness
- Safe SaaS architecture
- Clean phased development

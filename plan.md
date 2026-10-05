# MASTER PROMPT — AI DEPARTMENT DIGITAL PORTAL

## ROLE

Act as a **Senior Full-Stack Software Architect, UI/UX Designer, Product Engineer, Database Architect, Security Engineer, and DevOps Engineer with 15+ years of real-world experience**.

You are responsible for designing and implementing a complete, production-quality **College Department of Artificial Intelligence Digital Portal**.

Do NOT treat this as a simple college static website.

Build it as a **real dynamic department management platform** consisting of:

1. Public Department Website
2. Secure Admin/HOD Dashboard
3. Faculty Management
4. Dynamic Content Management
5. Events Management
6. Achievements Management
7. Placement Management
8. Student Project Management
9. Research & Publication Management
10. Gallery Management
11. Alumni Management
12. Announcement Management
13. Downloads/Documents Management
14. Website Settings
15. Role-Based Access Control
16. Approval Workflow
17. Analytics Dashboard

The system must be scalable so that the department can use it for many years without developers needing to edit HTML manually.

---

# 1. CORE PRODUCT VISION

Create a professional digital platform for a College Department of Artificial Intelligence.

The public website should communicate:

- Academic excellence
- Artificial Intelligence education
- Research
- Innovation
- Student achievements
- Industry interaction
- Placements
- Projects
- Events
- Faculty expertise
- Alumni success
- Department activities

The admin panel should allow authorized department staff to control the entire website.

### IMPORTANT

There should be:

- NO student login
- NO student dashboard
- NO unnecessary student account system

Students can submit achievements/projects through public forms if required.

Only authorized:

- Super Admin
- HOD
- Faculty

can access the management system.

---

# 2. TECHNOLOGY STACK

Use this architecture unless there is a strong technical reason to change it.

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- TanStack Query
- React Hook Form
- Zod
- Lucide React icons
- Framer Motion only where animation genuinely improves UX

## Backend

- Python
- Django
- Django REST Framework

## Database

- PostgreSQL

## Authentication

- JWT authentication
- Secure access/refresh token strategy
- Role-Based Access Control

## File Storage

Design the system so it can use:

- Cloudinary

or

- AWS S3 compatible storage

for:

- Images
- Gallery photos
- Faculty photos
- Event posters
- Certificates
- PDFs
- Research papers
- Project images

## Deployment

Architecture should support:

Frontend:
- Vercel

Backend:
- Render / Railway

Database:
- PostgreSQL / Neon

Storage:
- Cloudinary / S3

---

# 3. TWO-SIDE SYSTEM

The application has TWO major sides.

## SIDE A — PUBLIC WEBSITE

Accessible without login.

## SIDE B — ADMIN MANAGEMENT SYSTEM

Accessible only after authentication.

Architecture:

PUBLIC WEBSITE
        |
        | REST API
        ↓
DJANGO REST API
        |
        ├── PostgreSQL
        |
        └── Cloud Storage

ADMIN PANEL
        |
        | REST API
        ↓
DJANGO REST API

---

# 4. PUBLIC WEBSITE NAVIGATION

Create a professional navigation bar:

- Home
- About
- Faculty
- Academics
- Events
- Achievements
- Placements
- Projects
- Research
- Gallery
- Alumni
- Downloads
- Contact

Right side:

**Admin Login**

Do not show student login.

---

# 5. PUBLIC HOMEPAGE

Create a premium, clean academic homepage.

Design style:

- White background
- Navy / dark blue
- Elegant gold accent
- Soft gray
- Professional typography
- Large whitespace
- Minimal animations
- Clean cards
- Rounded corners
- Subtle shadows
- Mobile-first responsive design

Avoid:

- Excessive gradients
- Excessive animations
- Neon colors
- Gaming-style UI
- Overcrowded sections
- Unnecessary decorative elements

The website should look like a serious university/department website.

---

# 6. HOMEPAGE STRUCTURE

Build the homepage in this order.

## SECTION 1 — HEADER

Include:

Department logo

Department of Artificial Intelligence

Tagline:

"Learn • Innovate • Transform"

Navigation

Admin Login

Mobile hamburger menu

Sticky header.

---

# 7. HERO SECTION

Hero should contain:

Small label:

DEPARTMENT OF

Main heading:

Artificial Intelligence

Supporting text:

"Building future-ready professionals through quality education, research, innovation and real-world applications in Artificial Intelligence."

Buttons:

Explore Department

Our Vision

Use a high-quality AI/college/campus visual.

Do NOT hard-code image paths permanently.

Images should eventually come from the backend/CMS.

---

# 8. DEPARTMENT HIGHLIGHTS

Create 4–6 highlight cards.

Examples:

Quality Education

Research & Innovation

Industry Collaboration

Student Success

Modern AI Labs

Innovation & Startups

These should be manageable from admin settings if possible.

---

# 9. ABOUT DEPARTMENT

Include:

- About department
- Vision
- Mission
- Objectives
- Infrastructure
- Laboratories
- Industry interaction

Admin should be able to edit this content.

Do not hard-code these values.

---

# 10. HOD MESSAGE

Create:

HOD photo

HOD name

Designation

Message

Optional qualification

Admin must be able to change:

- HOD name
- Photo
- Message
- Designation

without changing frontend code.

---

# 11. ANNOUNCEMENTS

Homepage should display latest announcements.

Example:

AI Workshop Registration Open

Guest Lecture on Generative AI

Placement Drive

Department Magazine Submission

Each announcement:

- Title
- Short description
- Publish date
- Expiry date
- Priority
- Attachment
- Status

Admin can:

- Create
- Edit
- Publish
- Unpublish
- Delete

---

# 12. EVENTS

Homepage shows upcoming events.

Events page should contain:

- Upcoming Events
- Ongoing Events
- Completed Events

Filters:

- Workshop
- Seminar
- FDP
- Hackathon
- Guest Lecture
- Conference
- Industrial Visit
- Competition
- Club Activity

Event fields:

- Title
- Description
- Event type
- Date
- Start time
- End time
- Venue
- Speaker
- Speaker designation
- Poster
- Registration URL
- Registration deadline
- Contact person
- Status
- Gallery album
- Created by

Admin can manage everything.

---

# 13. EVENT DETAIL PAGE

Create a dedicated event detail page.

Display:

Event poster

Title

Date

Time

Venue

Speaker

Description

Registration button

Event schedule

Photos

Related announcements

Related gallery

After event completion:

Admin can upload event photos and mark event as completed.

---

# 14. ACHIEVEMENTS

Create a professional achievements page.

Categories:

- Student Achievements
- Faculty Achievements
- Awards
- Hackathons
- Research
- Competitions
- Innovation
- Academic Achievements

Achievement fields:

- Name
- Register number if required
- Year
- Section
- Achievement title
- Category
- Description
- Event name
- Position
- Date
- Certificate
- Photo
- Verification status
- Published status

Add filtering by:

- Year
- Category
- Student/Faculty
- Achievement type

---

# 15. ACHIEVEMENT SUBMISSION WITHOUT LOGIN

Create a public submission form.

Student enters:

- Name
- Register number
- Year
- Department
- Achievement
- Category
- Event
- Description
- Certificate upload
- Photo upload
- Email
- Phone

Submission workflow:

Student
↓
Public Submission
↓
Faculty Review
↓
Approve / Reject
↓
HOD Approval
↓
Published

Students do NOT need accounts.

---

# 16. PLACEMENT PAGE

Create a premium placement page.

Show:

- Placement percentage
- Highest package
- Average package
- Number of students placed
- Recruiting companies
- Placement drives
- Student placement stories
- Alumni success stories

Placement statistics should be year-wise.

Example:

2024
2025
2026

Admin can add/edit each year's statistics.

---

# 17. PLACEMENT DATABASE

Create:

Placement Statistics

Fields:

- Year
- Total students
- Eligible students
- Students placed
- Placement percentage
- Highest package
- Average package
- Minimum package
- Number of companies

Student placement:

- Student name
- Batch
- Company
- Designation
- Package
- Placement year
- Photo
- Story
- Featured

---

# 18. RECRUITING COMPANIES

Create company management.

Fields:

- Company name
- Logo
- Website
- Industry
- Description
- Active/inactive
- Display order

Admin can add/remove companies.

Do NOT hard-code company logos.

---

# 19. STUDENT PROJECTS

Create a complete project showcase.

Categories:

- Artificial Intelligence
- Machine Learning
- Deep Learning
- Generative AI
- NLP
- Computer Vision
- Data Science
- Robotics
- IoT + AI

Project fields:

- Title
- Description
- Problem statement
- Solution
- Technologies
- Student members
- Guide
- Year
- Thumbnail
- Gallery
- GitHub URL
- Demo URL
- Research paper
- Featured
- Status

Create:

Projects listing page

Project detail page

---

# 20. RESEARCH & PUBLICATIONS

Create research management.

Categories:

- Journal
- Conference
- Patent
- Book Chapter
- Funded Project
- Research Project

Fields:

- Title
- Authors
- Research area
- Publication type
- Journal/conference
- Publication date
- DOI
- Paper URL
- PDF
- Faculty
- Description

Create search and filters.

---

# 21. FACULTY PAGE

Faculty listing with professional cards.

Each faculty:

- Photo
- Name
- Designation
- Qualification
- Experience
- Specialization
- Subjects
- Research interests
- Email
- LinkedIn
- ORCID
- Publications

Create faculty detail page.

Admin manages all faculty information.

---

# 22. ACADEMICS PAGE

Include:

- Programmes
- Curriculum
- Syllabus
- Programme Outcomes
- Programme Specific Outcomes
- Course structure
- Laboratories
- Academic calendar
- Timetable
- Regulations
- Downloads

Admin should manage these documents/content.

---

# 23. GALLERY

Use album-based gallery.

Gallery Album:

- Title
- Description
- Date
- Event
- Cover image

Gallery Images:

- Album
- Image
- Caption
- Display order

Example:

AI Hackathon 2026
    ├── photo 1
    ├── photo 2
    ├── photo 3
    ├── photo 4

Admin can create albums and upload multiple photos.

---

# 24. ALUMNI

Create alumni section.

Fields:

- Name
- Batch
- Company
- Designation
- Photo
- LinkedIn
- Achievement
- Success story

Show featured alumni on homepage.

---

# 25. DOWNLOADS

Create document management.

Categories:

- Syllabus
- Academic Calendar
- Timetable
- Forms
- Regulations
- Department Documents
- Event Materials
- Circulars
- Question Papers
- Study Materials

Admin uploads files.

Public users can download permitted documents.

---

# 26. CONTACT PAGE

Show:

- Department address
- Email
- Phone
- Office hours
- Map
- Social links

Add contact form:

Name

Email

Phone

Subject

Message

Store messages in database.

Admin can view and manage messages.

---

# 27. ADMIN LOGIN

Create a secure admin login page.

Fields:

Email/Username

Password

Remember me

Forgot password

Login

Do NOT allow public registration.

Only an authorized super admin can create users.

---

# 28. ADMIN DASHBOARD

Create a premium admin dashboard.

Sidebar:

Dashboard

Department Info

Faculty

Events

Announcements

Achievements

Placements

Projects

Research & Publications

Gallery

Alumni

Downloads

Recruiting Companies

Contact Messages

Website Settings

Users & Roles

Activity Logs

Logout

---

# 29. ADMIN DASHBOARD ANALYTICS

Dashboard cards:

Total Faculty

Total Events

Total Achievements

Total Projects

Total Placements

Total Publications

Total Gallery Albums

Total Announcements

Total Contact Messages

Show:

- Website visitors
- Page views
- Popular pages
- Recent activity
- Content growth

Analytics should be designed so real analytics can be connected later.

Do not fake analytics in production.

---

# 30. ADMIN QUICK ACTIONS

Dashboard should contain:

Add Event

Add Announcement

Add Achievement

Add Placement

Add Project

Add Faculty

Upload Gallery

Upload Document

Each button opens the appropriate form.

---

# 31. ADMIN CONTENT MANAGEMENT

Every major module must support:

Create

Read

Update

Delete

Search

Filter

Pagination

Publish/Unpublish

Draft

Archive

Featured

Display order where relevant

Confirmation before destructive actions.

---

# 32. ROLE SYSTEM

Create three roles.

## SUPER ADMIN

Full control.

Can:

- Manage everything
- Create users
- Manage permissions
- Website settings
- View activity logs
- Delete content

## HOD / ADMIN

Can manage:

- Department
- Faculty
- Events
- Announcements
- Achievements
- Placements
- Projects
- Research
- Gallery
- Alumni
- Downloads

Cannot manage critical system security unless permission is granted.

## FACULTY

Can:

- Manage assigned projects
- Submit research
- Review student achievements
- Manage events if authorized
- Upload academic content if authorized

Permissions must be configurable.

---

# 33. ROLE-BASED ACCESS CONTROL

Never rely only on hiding frontend buttons.

Backend must verify permissions.

Example:

A Faculty user should not be able to call:

DELETE /api/users/

unless explicitly authorized.

Every sensitive API must validate:

- Authentication
- Role
- Permission

---

# 34. DATABASE MODELS

Create proper Django models.

At minimum:

Department

WebsiteSetting

User

Role

Permission

Faculty

Event

Announcement

Achievement

Placement

PlacementStatistics

RecruitingCompany

Project

ProjectMember

ResearchPublication

GalleryAlbum

GalleryImage

Alumni

Download

ContactMessage

ActivityLog

Use:

- UUID or safe IDs where appropriate
- created_at
- updated_at
- created_by
- updated_by
- status
- soft deletion where appropriate

Use relationships properly.

Do NOT duplicate data unnecessarily.

---

# 35. API STRUCTURE

Create REST APIs such as:

GET /api/department/

GET /api/faculty/

GET /api/events/

GET /api/events/upcoming/

GET /api/announcements/

GET /api/announcements/latest/

GET /api/achievements/

GET /api/placements/statistics/

GET /api/placements/

GET /api/projects/

GET /api/projects/featured/

GET /api/research/

GET /api/gallery/albums/

GET /api/alumni/

GET /api/downloads/

POST /api/contact/

POST /api/achievement-submissions/

Admin APIs:

POST /api/admin/events/

PUT /api/admin/events/{id}/

DELETE /api/admin/events/{id}/

and equivalent CRUD endpoints for all modules.

Use consistent REST naming.

---

# 36. FRONTEND ARCHITECTURE

Organize React properly.

frontend/src/

components/

layouts/

pages/

admin/

services/

hooks/

context/

utils/

schemas/

types/

assets/

Do NOT put everything inside App.jsx.

Use reusable components.

Examples:

Navbar

Footer

Hero

SectionTitle

EventCard

AchievementCard

ProjectCard

FacultyCard

GalleryCard

PlacementCard

AnnouncementCard

LoadingState

ErrorState

EmptyState

Modal

ConfirmDialog

Pagination

SearchBar

FilterBar

---

# 37. API SERVICE

Create centralized Axios configuration.

Example architecture:

services/api.js

services/events.js

services/faculty.js

services/achievements.js

services/projects.js

services/placements.js

services/research.js

services/gallery.js

Do not scatter raw Axios calls throughout every component.

---

# 38. STATE MANAGEMENT

Use TanStack Query for:

- API data
- Caching
- Loading states
- Refetching
- Mutations

Use React Context only where appropriate, such as:

- Authentication
- Theme
- Global UI state

Do not over-engineer.

---

# 39. FORMS

Use:

React Hook Form

Zod validation

Every form must have:

- Required field validation
- Proper error messages
- Loading state
- Success message
- Failure message
- Reset behavior
- File validation

---

# 40. IMAGE UPLOADS

Support:

- JPG
- JPEG
- PNG
- WEBP

Validate:

- File type
- File size

Generate optimized thumbnails where appropriate.

Do not store huge original images unnecessarily.

Use lazy loading on public pages.

---

# 41. SECURITY REQUIREMENTS

Implement:

- JWT authentication
- Secure password hashing
- Permission checking
- CORS configuration
- CSRF protection where applicable
- File validation
- Rate limiting for public forms
- Input validation
- SQL injection protection through Django ORM
- XSS protection
- Secure headers
- Environment variables
- No secrets in Git
- Proper error handling

Never put:

DATABASE PASSWORD

JWT SECRET

API KEYS

CLOUDINARY SECRET

inside frontend code.

---

# 42. ENVIRONMENT VARIABLES

Use:

.env

Example:

DATABASE_URL=

SECRET_KEY=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

CORS_ALLOWED_ORIGINS=

Never commit .env.

Create:

.env.example

---

# 43. RESPONSIVE DESIGN

The website must work properly on:

Mobile

Tablet

Laptop

Desktop

Large desktop

Test approximately:

320px

375px

425px

768px

1024px

1280px

1440px

1920px

Mobile navigation must become hamburger menu.

Admin dashboard must also be responsive.

Tables should become mobile-friendly cards or horizontal scroll where appropriate.

---

# 44. ACCESSIBILITY

Follow good accessibility practices.

Use:

Semantic HTML

Proper headings

Alt text

Keyboard navigation

Visible focus states

ARIA labels where required

Readable contrast

Accessible forms

Do not depend only on color to communicate status.

---

# 45. SEO

Public website should have:

Unique page titles

Meta descriptions

Open Graph metadata

Semantic HTML

Clean URLs

Sitemap support

robots.txt

Structured data where appropriate

Example URLs:

/

about/

/faculty/

/faculty/dr-name/

/events/

/events/ai-workshop-2026/

/achievements/

/placements/

/projects/

/projects/project-name/

/research/

/gallery/

/alumni/

/downloads/

/contact/

---

# 46. PERFORMANCE

Optimize for:

Fast initial load

Lazy images

Compressed images

Code splitting

API caching

Pagination

Optimized database queries

Avoid unnecessary API calls.

Use select_related/prefetch_related where appropriate in Django.

Do not load hundreds of gallery images at once.

---

# 47. ERROR HANDLING

Every page needs:

Loading state

Empty state

Error state

Example:

If there are no events:

"No upcoming events at the moment."

If API fails:

"Unable to load events. Please try again."

Do not show raw backend errors to users.

---

# 48. ADMIN ACTIVITY LOG

Create ActivityLog.

Record:

User

Action

Module

Object

Timestamp

IP where appropriate

Examples:

Admin created Event

HOD updated Faculty

Faculty submitted Achievement

Admin approved Achievement

Admin deleted Project

This is important for accountability.

---

# 49. APPROVAL SYSTEM

Support approval statuses:

DRAFT

PENDING_REVIEW

APPROVED

REJECTED

PUBLISHED

ARCHIVED

For achievement:

Student/Public submission

↓

Faculty Review

↓

HOD Approval

↓

Publish

For projects/research, allow configurable approval depending on role.

---

# 50. WEBSITE SETTINGS

Create a settings page.

Admin can change:

College name

Department name

Logo

Favicon

Email

Phone

Address

Social media links

HOD name

HOD photo

HOD message

Hero heading

Hero description

Hero image

Footer content

Google Maps location

SEO title

SEO description

Emergency announcement

This prevents unnecessary code changes.

---

# 51. HOMEPAGE CMS

Make homepage sections configurable.

Admin should be able to control:

Hero

Highlights

About section

Announcements

Events

Achievements

Placement statistics

Featured projects

Research

Gallery

HOD message

CTA

Footer

Allow sections to be:

Enabled

Disabled

Reordered

Featured

where practical.

---

# 52. SEARCH

Add global search for public content.

Search:

Events

Achievements

Projects

Research

Faculty

Announcements

Alumni

Use debounced search.

---

# 53. FILTERS

Provide filters where useful.

Events:

Year

Type

Status

Achievements:

Year

Category

Student/Faculty

Projects:

Year

Technology

Category

Research:

Year

Publication type

Faculty

Placements:

Year

Company

Do not make filters visually complicated.

---

# 54. DESIGN SYSTEM

Create reusable design tokens.

Colors:

Primary Navy:
#07182D

Gold:
#B27A12

Light Gold:
#D6A943

Cream:
#FBF8F0

White:
#FFFFFF

Muted:
#667085

Border:
#E8E8E8

Typography should be clean and highly readable.

Use one primary font family consistently.

---

# 55. ADMIN UI DESIGN

Admin should look different from public website but share the same branding.

Public:

White + cream + gold + navy

Admin:

Dark navy sidebar

White content area

Gold primary actions

Soft pastel status cards

Clean data tables

Professional charts

Minimal animations

---

# 56. ADMIN SIDEBAR

Use:

Dashboard

Department

Faculty

Events

Announcements

Achievements

Placements

Projects

Research

Gallery

Alumni

Downloads

Recruiters

Contact Messages

Website Settings

Users & Roles

Activity Logs

Logout

Group menu items logically.

---

# 57. ADMIN DATA TABLE

Every management page should support:

Search

Filter

Sort

Pagination

Bulk selection where useful

Status badges

Edit

View

Delete

Duplicate where useful

Export CSV where useful

Example:

EVENTS

| Event | Date | Type | Status | Actions |

---

# 58. CONFIRMATION SYSTEM

Before deleting:

"Are you sure you want to delete this event?"

Buttons:

Cancel

Delete

For irreversible operations, require additional confirmation.

---

# 59. NOTIFICATIONS

Admin should receive notifications for:

New achievement submission

New contact message

Pending approval

Upcoming event

System issue

Use notification center.

---

# 60. EMAIL SUPPORT

Design backend so email can later support:

Contact form notifications

Achievement submission confirmation

Approval notification

Rejection notification

Event registration confirmation

Password reset

Use environment variables for SMTP.

---

# 61. NO FAKE DATA IN FINAL PRODUCTION BUILD

During development, create realistic seed data.

But clearly separate:

DEMO DATA

from

REAL DATA.

Do not present fake placement statistics as real college statistics.

Use placeholders such as:

"Add placement statistics"

until actual data is entered.

---

# 62. CONTENT SAFETY / DATA PRIVACY

Do not publicly expose:

Student phone numbers

Student personal email addresses

Register numbers unless explicitly required

Private documents

Admin information

Passwords

Authentication tokens

Private contact messages

Sensitive internal information

Public pages should expose only information intended for public viewing.

---

# 63. BACKEND ADMIN VS CUSTOM ADMIN

You may use Django Admin for internal development/support.

But build a **custom branded React Admin Dashboard** for daily department use.

Django Admin should remain available as a technical fallback.

---

# 64. DEVELOPMENT WORKFLOW

Do NOT attempt to generate the entire application blindly in one step.

Work in controlled phases.

## PHASE 1

Project setup

Frontend

Backend

Database

Environment

Git

Basic routing

## PHASE 2

Public website UI

Build all pages with responsive design.

## PHASE 3

Database models

Create migrations.

Create seed data.

## PHASE 4

REST APIs

Implement APIs module by module.

## PHASE 5

Connect frontend to backend.

Remove hard-coded content.

## PHASE 6

Authentication

Admin/HOD/Faculty roles.

## PHASE 7

Admin dashboard

Implement CRUD.

## PHASE 8

Uploads

Images

PDFs

Certificates

Research papers

## PHASE 9

Approval workflows

## PHASE 10

Testing

## PHASE 11

Performance/security

## PHASE 12

Deployment

---

# 65. IMPORTANT CODING RULE

Before modifying existing code:

1. Inspect the project structure.
2. Understand the current architecture.
3. Identify existing dependencies.
4. Do not unnecessarily replace working code.
5. Do not delete existing functionality without reason.
6. Reuse existing components when possible.
7. Keep changes modular.
8. Test after every major change.

If the project already contains a working homepage, preserve it unless explicitly asked to redesign it.

---

# 66. DO NOT DO THESE THINGS

Do NOT:

- Put everything in one HTML file.
- Put everything in App.jsx.
- Hard-code events.
- Hard-code achievements.
- Hard-code faculty.
- Hard-code placement statistics.
- Store passwords in frontend.
- Put API secrets in React.
- Create student login.
- Create unnecessary complicated features.
- Use fake analytics in production.
- Use random UI libraries unnecessarily.
- Break existing working features.
- Delete database data during development without confirmation.
- Replace the entire project architecture without inspecting it first.

---

# 67. TESTING REQUIREMENTS

Test:

Public pages

Admin login

Role permissions

CRUD

Image upload

PDF upload

Forms

Validation

Search

Filters

Pagination

Mobile navigation

Responsive dashboard

Approval workflow

Unauthorized API requests

Expired JWT

Logout

Error states

404 pages

500 handling

---

# 68. FINAL QUALITY CHECK

Before declaring the project complete, verify:

[ ] Public website works

[ ] Homepage works

[ ] About works

[ ] Faculty works

[ ] Academics works

[ ] Events works

[ ] Achievements works

[ ] Placements works

[ ] Projects works

[ ] Research works

[ ] Gallery works

[ ] Alumni works

[ ] Downloads works

[ ] Contact works

[ ] Admin login works

[ ] Super Admin works

[ ] HOD role works

[ ] Faculty role works

[ ] CRUD works

[ ] File uploads work

[ ] Approval workflow works

[ ] Search works

[ ] Filters work

[ ] Pagination works

[ ] Mobile responsive

[ ] Tablet responsive

[ ] Desktop responsive

[ ] API error handling works

[ ] Authentication security works

[ ] No secrets exposed

[ ] No unnecessary hard-coded content

[ ] Database migrations work

[ ] Production build works

---

# 69. FINAL USER EXPERIENCE

The final product should feel like:

"An official digital platform for a modern Artificial Intelligence department."

It should NOT feel like:

- A student project
- A template website
- A basic CRUD application
- A static HTML page

The public website must be elegant and academic.

The admin dashboard must be powerful and practical.

The backend must be structured and secure.

The database must be scalable.

The entire system must be maintainable by another developer.

---

# 70. FIRST TASK

Before writing large amounts of code:

1. Inspect the existing project.
2. Give me the current project structure.
3. Identify the existing frontend/backend/database.
4. Identify what is already working.
5. Identify what needs to be created.
6. Propose the implementation order.
7. Do not destroy existing working code.

Then start implementation **phase by phase**.

After each major phase:

- Run the application.
- Check for errors.
- Fix errors.
- Confirm the feature works.
- Continue to the next phase.

Always prefer a working incremental implementation over generating huge amounts of untested code.

## FINAL OBJECTIVE

Build a complete:

**AI DEPARTMENT DIGITAL PORTAL**

with:

PUBLIC WEBSITE
+
ADMIN/HOD DASHBOARD
+
FACULTY MANAGEMENT
+
DYNAMIC CONTENT
+
EVENTS
+
ACHIEVEMENTS
+
PLACEMENTS
+
PROJECTS
+
RESEARCH
+
GALLERY
+
ALUMNI
+
DOWNLOADS
+
ANNOUNCEMENTS
+
APPROVAL WORKFLOW
+
ROLE-BASED ACCESS
+
ANALYTICS
+
SECURE API
+
POSTGRESQL
+
CLOUD STORAGE

The system must be **professional, responsive, secure, dynamic, maintainable, scalable, and production-ready**.
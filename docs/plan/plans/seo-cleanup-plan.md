# SEO Cleanup Plan — Clean, Concise Meta Tags

## Goal
Clean hyphen-separated titles, no keyword stuffing, no redundant name in descriptions. Titles say "Tiani Pekins", descriptions describe the content.

---

## Final Titles & Descriptions

| Page | Title | Description |
|------|-------|-------------|
| Home | `Tiani Pekins - Software Engineer` | `I'm a full-stack software engineer, founder of LocalHands.Africa, and researcher. Based in Cameroon, Silicon Mountain.` |
| About | `About - Tiani Pekins` | `Learn about a Full-stack Software Engineer, Founder of LocalHands.Africa, and MS Software Engineering student at University of Buea.` |
| Blog | `My Blog - Tiani Pekins` | `Articles on software engineering, tech, community building, and life in Cameroon's Silicon Mountain. Including insights from my research experience.` |
| Feed | `My Feed - Tiani Pekins` | `Stay updated with the latest activities, videos, photos, notes, and events. Follow along with projects and community work.` |
| Contact | `Contact - Tiani Pekins` | `Hi there! Open to projects and collaboration. I'm a full-stack software engineer and founder of LocalHands.Africa based in Cameroon.` |
| Projects | `Projects - Tiani Pekins` | `Explore projects including LocalHands.Africa, a platform empowering Africa's informal economy. Built with modern technologies.` |
| Blog Post | `{title} - Tiani Pekins` | `{post.excerpt}` (no fallback) |

---

## Changes by File

### 1. `apps/frontend/index.html`

- **Title:** `Tiani Pekins Ebika | Software Engineer & Founder of LocalHands.Africa` → `Tiani Pekins - Software Engineer`
- **Meta description:** `I'm a full-stack software engineer, founder of LocalHands.Africa, and researcher. Based in Cameroon, Silicon Mountain.`
- **OG title:** `Tiani Pekins - Software Engineer`
- **OG description:** same as meta description
- **Twitter title:** `Tiani Pekins - Software Engineer`
- **Twitter description:** same as meta description
- **Hidden h1:** `Tiani Pekins - Software Engineer`
- **Remove:** `meta keywords`
- **Keep:** verification tags, canonical, JSON-LD, og:image, twitter:image, twitter:card, twitter:site

---

### 2. `apps/frontend/public/robots.txt`

- Fix: `tianipekins.me` → `tianipekins.com`

---

### 3. `apps/frontend/src/pages/Home.tsx`

- **Title:** `Tiani Pekins - Software Engineer`
- **Description:** `I'm a full-stack software engineer, founder of LocalHands.Africa, and researcher. Based in Cameroon, Silicon Mountain.`
- **OG + Twitter:** match title + description
- **Remove:** `meta keywords`

---

### 4. `apps/frontend/src/pages/About.tsx`

- **Title:** `About - Tiani Pekins`
- **Description:** `Learn about a Full-stack Software Engineer, Founder of LocalHands.Africa, and MS Software Engineering student at University of Buea.`
- **OG + Twitter:** match title + description
- **Remove:** `meta keywords`
- **Keep:** JSON-LD unchanged

---

### 5. `apps/frontend/src/pages/Blog.tsx`

- **Title:** `My Blog - Tiani Pekins`
- **Description:** `Articles on software engineering, tech, community building, and life in Cameroon's Silicon Mountain. Including insights from my research experience.`
- **OG + Twitter:** match title + description
- **Remove:** `meta keywords`

---

### 6. `apps/frontend/src/pages/Feed.tsx`

- **Title:** `My Feed - Tiani Pekins`
- **Description:** `Stay updated with the latest activities, videos, photos, notes, and events. Follow along with projects and community work.`
- **OG + Twitter:** match title + description
- **Remove:** `meta keywords`

---

### 7. `apps/frontend/src/pages/Contact.tsx`

- **Title:** `Contact - Tiani Pekins`
- **Description:** `Hi there! Open to projects and collaboration. I'm a full-stack software engineer and founder of LocalHands.Africa based in Cameroon.`
- **OG + Twitter:** match title + description
- **Remove:** `meta keywords`

---

### 8. `apps/frontend/src/pages/Projects.tsx`

- **Title:** `Projects - Tiani Pekins`
- **Description:** `Explore projects including LocalHands.Africa, a platform empowering Africa's informal economy. Built with modern technologies.`
- **OG + Twitter:** match title + description
- **Remove:** `meta keywords`
- **Keep:** JSON-LD unchanged

---

### 9. `apps/frontend/src/pages/BlogPost.tsx`

- **Title:** `{post.title} - Tiani Pekins`
- **Description:** `{post.excerpt}` (no fallback verbosity)
- **OG + Twitter:** match title + description
- **Remove:** `meta keywords`
- **Keep:** og:image, twitter:image, canonical, og:type=article

---

## Summary

| What | Change |
|------|--------|
| Title separator | `\|` → `-` (hyphen) |
| Title format | `Page - Tiani Pekins` |
| Keywords meta | Removed everywhere |
| Name in descriptions | Removed (title has it) |
| Contact description | Personal, first-person style |
| Blog description | Includes research mention |
| robots.txt | `.me` → `.com` |
| JSON-LD | Unchanged |

## Files to edit (9 total)
1. `apps/frontend/index.html`
2. `apps/frontend/public/robots.txt`
3. `apps/frontend/src/pages/Home.tsx`
4. `apps/frontend/src/pages/About.tsx`
5. `apps/frontend/src/pages/Blog.tsx`
6. `apps/frontend/src/pages/Feed.tsx`
7. `apps/frontend/src/pages/Contact.tsx`
8. `apps/frontend/src/pages/Projects.tsx`
9. `apps/frontend/src/pages/BlogPost.tsx`

# Fix SEO for About and Feed Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix SEO issues preventing About and Feed pages from appearing in search results by correcting domain mismatch, adding missing pages to sitemap, and implementing page-level SEO metadata for all routes.

**Architecture:** This is a Vite + React SPA with React Router. Currently, ALL pages share the same `index.html` meta tags, making them indistinguishable to search engines. The fix adds `react-helmet-async` for dynamic per-page meta tags and corrects the sitemap.xml domain inconsistency.

**Tech Stack:** React 19, React Router DOM 7, Vite 8, TypeScript 6, `react-helmet-async` for SEO meta tags

---

## File Structure

| File | Action | Purpose |
|------|--------|---------|
| `apps/frontend/public/sitemap.xml` | Modify | Fix domain to `tianipekins.com`, add `/feed` page |
| `apps/frontend/index.html` | Modify | Update canonical URL from `.me` to `.com` |
| `apps/frontend/src/App.tsx` | Modify | Wrap app with `HelmetProvider` |
| `apps/frontend/src/pages/About.tsx` | Modify | Add page-specific SEO meta tags |
| `apps/frontend/src/pages/Feed.tsx` | Modify | Add page-specific SEO meta tags |
| `apps/frontend/src/pages/Projects.tsx` | Modify | Add page-specific SEO meta tags |
| `apps/frontend/src/pages/Contact.tsx` | Modify | Add page-specific SEO meta tags |
| `apps/frontend/src/pages/Blog.tsx` | Modify | Add page-specific SEO meta tags |
| `apps/frontend/src/pages/BlogPost.tsx` | Modify | Add page-specific SEO meta tags |
| `apps/frontend/src/pages/Home.tsx` | Modify | Add page-specific SEO meta tags |

---

## Task 1: Install react-helmet-async

**Files:**
- Modify: `apps/frontend/package.json`

- [ ] **Step 1: Install the package**

```bash
cd apps/frontend && npm install react-helmet-async
```

- [ ] **Step 2: Verify installation**

```bash
cd apps/frontend && npm list react-helmet-async
```

Expected: `react-helmet-async@<version>`

- [ ] **Step 3: Commit**

```bash
git add apps/frontend/package.json apps/frontend/package-lock.json
git commit -m "deps: add react-helmet-async for page-level SEO"
```

---

## Task 2: Fix sitemap.xml Domain and Add Feed Page

**Files:**
- Modify: `apps/frontend/public/sitemap.xml`

- [ ] **Step 1: Update sitemap.xml with correct domain and add /feed**

Replace the entire content of `apps/frontend/public/sitemap.xml` with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tianipekins.com/</loc>
    <priority>1.0</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://tianipekins.com/about</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://tianipekins.com/projects</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://tianipekins.com/blog</loc>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://tianipekins.com/feed</loc>
    <priority>0.7</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://tianipekins.com/contact</loc>
    <priority>0.7</priority>
    <changefreq>yearly</changefreq>
  </url>
</urlset>
```

- [ ] **Step 2: Commit**

```bash
git add apps/frontend/public/sitemap.xml
git commit -m "fix: update sitemap domain to tianipekins.com and add /feed page"
```

---

## Task 3: Fix Canonical URL in index.html

**Files:**
- Modify: `apps/frontend/index.html:19`

- [ ] **Step 1: Update canonical URL from .me to .com**

In `apps/frontend/index.html`, change line 19:

**Before:**
```html
<link rel="canonical" href="https://tianipekins.com" />
```

**After:**
```html
<link rel="canonical" href="https://tianipekins.com" />
```

Note: The canonical URL already uses `.com`. Verify this is correct. If the canonical was using `.me`, change it to `.com`.

Also update Open Graph URL on line 42:

**Before:**
```html
<meta property="og:url" content="https://tianipekins.com" />
```

**After:**
```html
<meta property="og:url" content="https://tianipekins.com" />
```

- [ ] **Step 2: Verify all URLs in index.html use tianipekins.com**

Search the file for any remaining `tianipekins.me` references and replace with `tianipekins.com`.

- [ ] **Step 3: Commit**

```bash
git add apps/frontend/index.html
git commit -m "fix: ensure all URLs in index.html use tianipekins.com"
```

---

## Task 4: Add HelmetProvider to App.tsx

**Files:**
- Modify: `apps/frontend/src/App.tsx`

- [ ] **Step 1: Import HelmetProvider and wrap the app**

In `apps/frontend/src/App.tsx`, add the import at the top:

```typescript
import { HelmetProvider } from "react-helmet-async";
```

Then wrap the Router with HelmetProvider. Replace the return statement (lines 46-70) with:

```tsx
return (
  <HelmetProvider>
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col relative bg-white">
        <Navbar />
        <main className="site-wrapper flex-grow" style={{ pointerEvents: footerOpacity > 0.95 ? "none" : "auto" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <div
          className="fixed bottom-0 left-0 right-0 z-10"
          style={{ opacity: footerOpacity, pointerEvents: footerOpacity === 0 ? "none" : "auto", transition: "opacity 0.1s ease-in-out" }}
        >
          <div className="pointer-events-auto">
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  </HelmetProvider>
);
```

- [ ] **Step 2: Commit**

```bash
git add apps/frontend/src/App.tsx
git commit -m "feat: add HelmetProvider for page-level SEO meta tags"
```

---

## Task 5: Add SEO to About Page

**Files:**
- Modify: `apps/frontend/src/pages/About.tsx`

- [ ] **Step 1: Add Helmet import and SEO meta tags**

In `apps/frontend/src/pages/About.tsx`, add import at the top:

```typescript
import { Helmet } from "react-helmet-async";
```

Then add the Helmet component inside the return statement, as the first child inside the outer `<div>`:

```tsx
return (
  <div className="flex flex-col">
    <Helmet>
      <title>About Tiani Pekins Ebika | Software Engineer & Founder</title>
      <meta name="description" content="Learn about Tiani Pekins Ebika Full-stack Software Engineer, Founder of LocalHands.Africa, and MS Software Engineering student at University of Buea. Based in Cameroon, Silicon Mountain." />
      <meta name="keywords" content="Tiani Pekins Ebika, about, software engineer, University of Buea, LocalHands Africa, Cameroon, full-stack developer" />
      <link rel="canonical" href="https://tianipekins.com/about" />
      <meta property="og:title" content="About Tiani Pekins Ebika | Software Engineer & Founder" />
      <meta property="og:description" content="Learn about Tiani Pekins Ebika Full-stack Software Engineer, Founder of LocalHands.Africa, and MS Software Engineering student at University of Buea." />
      <meta property="og:url" content="https://tianipekins.com/about" />
      <meta property="og:type" content="profile" />
      <meta property="og:image" content="https://tianipekins.com/Tiani.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="About Tiani Pekins Ebika | Software Engineer & Founder" />
      <meta name="twitter:description" content="Learn about Tiani Pekins Ebika Full-stack Software Engineer, Founder of LocalHands.Africa." />
      <meta name="twitter:image" content="https://tianipekins.com/Tiani.jpg" />
    </Helmet>

    {/* Hero */}
    <section className="pt-32 pb-20 px-6 bg-[#f5f0eb]">
```

- [ ] **Step 2: Commit**

```bash
git add apps/frontend/src/pages/About.tsx
git commit -m "feat: add SEO meta tags to About page"
```

---

## Task 6: Add SEO to Feed Page

**Files:**
- Modify: `apps/frontend/src/pages/Feed.tsx`

- [ ] **Step 1: Add Helmet import and SEO meta tags**

In `apps/frontend/src/pages/Feed.tsx`, add import at the top (after existing imports):

```typescript
import { Helmet } from "react-helmet-async";
```

Then add the Helmet component inside the return statement of the `Feed` component, as the first child inside the outer `<div>`:

```tsx
return (
  <div className="flex flex-col bg-[#f5f5f0]">
    <Helmet>
      <title>Feed | Tiani Pekins Ebika Updates & Activities</title>
      <meta name="description" content="Stay updated with Tiani Pekins Ebika's latest activities, videos, photos, notes, and events. Follow along with projects and community work." />
      <meta name="keywords" content="Tiani Pekins Ebika, feed, updates, videos, photos, notes, events, activities, Cameroon" />
      <link rel="canonical" href="https://tianipekins.com/feed" />
      <meta property="og:title" content="Feed | Tiani Pekins Ebika Updates & Activities" />
      <meta property="og:description" content="Stay updated with Tiani Pekins Ebika's latest activities, videos, photos, notes, and events." />
      <meta property="og:url" content="https://tianipekins.com/feed" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://tianipekins.com/Tiani.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Feed | Tiani Pekins Ebika Updates & Activities" />
      <meta name="twitter:description" content="Stay updated with Tiani Pekins Ebika's latest activities, videos, photos, notes, and events." />
      <meta name="twitter:image" content="https://tianipekins.com/Tiani.jpg" />
    </Helmet>

    <section className="pt-48 pb-24 px-6 bg-[#f5f5f0]">
```

- [ ] **Step 2: Commit**

```bash
git add apps/frontend/src/pages/Feed.tsx
git commit -m "feat: add SEO meta tags to Feed page"
```

---

## Task 7: Add SEO to Projects Page

**Files:**
- Modify: `apps/frontend/src/pages/Projects.tsx`

- [ ] **Step 1: Add Helmet import and SEO meta tags**

In `apps/frontend/src/pages/Projects.tsx`, add import at the top:

```typescript
import { Helmet } from "react-helmet-async";
```

Then add the Helmet component inside the return statement, as the first child inside the outer `<div>`:

```tsx
return (
  <div className="flex flex-col min-h-screen">
    <Helmet>
      <title>Projects | Tiani Pekins Ebika Software Engineer</title>
      <meta name="description" content="Explore projects by Tiani Pekins Ebika including LocalHands.Africa a platform empowering Africa's informal economy. Built with modern technologies." />
      <meta name="keywords" content="Tiani Pekins Ebika, projects, LocalHands Africa, software engineer, portfolio, Cameroon, full-stack developer" />
      <link rel="canonical" href="https://tianipekins.com/projects" />
      <meta property="og:title" content="Projects | Tiani Pekins Ebika Software Engineer" />
      <meta property="og:description" content="Explore projects by Tiani Pekins Ebika including LocalHands.Africa a platform empowering Africa's informal economy." />
      <meta property="og:url" content="https://tianipekins.com/projects" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://tianipekins.com/Tiani.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Projects | Tiani Pekins Ebika Software Engineer" />
      <meta name="twitter:description" content="Explore projects by Tiani Pekins Ebika including LocalHands.Africa." />
      <meta name="twitter:image" content="https://tianipekins.com/Tiani.jpg" />
    </Helmet>

    {/* Projects Hero - Pink Banner */}
    <section className="bg-[#ffb5b5] pt-48 pb-24 px-6 md:px-12">
```

- [ ] **Step 2: Commit**

```bash
git add apps/frontend/src/pages/Projects.tsx
git commit -m "feat: add SEO meta tags to Projects page"
```

---

## Task 8: Add SEO to Contact Page

**Files:**
- Modify: `apps/frontend/src/pages/Contact.tsx`

- [ ] **Step 1: Add Helmet import and SEO meta tags**

In `apps/frontend/src/pages/Contact.tsx`, add import at the top:

```typescript
import { Helmet } from "react-helmet-async";
```

Then add the Helmet component inside the return statement, as the first child inside the outer `<div>`:

```tsx
return (
  <div className="min-h-screen flex flex-col bg-[#8ecc91]">
    <Helmet>
      <title>Contact Tiani Pekins Ebika | Software Engineer</title>
      <meta name="description" content="Get in touch with Tiani Pekins Ebika Full-stack Software Engineer and Founder of LocalHands.Africa. Available for projects, consulting, and collaboration." />
      <meta name="keywords" content="Tiani Pekins Ebika, contact, software engineer, hire, collaborate, Cameroon, Full-stack developer" />
      <link rel="canonical" href="https://tianipekins.com/contact" />
      <meta property="og:title" content="Contact Tiani Pekins Ebika | Software Engineer" />
      <meta property="og:description" content="Get in touch with Tiani Pekins Ebika Full-stack Software Engineer and Founder of LocalHands.Africa." />
      <meta property="og:url" content="https://tianipekins.com/contact" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://tianipekins.com/Tiani.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Contact Tiani Pekins Ebika | Software Engineer" />
      <meta name="twitter:description" content="Get in touch with Tiani Pekins Ebika Full-stack Software Engineer and Founder of LocalHands.Africa." />
      <meta name="twitter:image" content="https://tianipekins.com/Tiani.jpg" />
    </Helmet>

    <div className="flex-grow pt-40 pb-20 px-6">
```

- [ ] **Step 2: Commit**

```bash
git add apps/frontend/src/pages/Contact.tsx
git commit -m "feat: add SEO meta tags to Contact page"
```

---

## Task 9: Add SEO to Blog Page

**Files:**
- Modify: `apps/frontend/src/pages/Blog.tsx`

- [ ] **Step 1: Add Helmet import and SEO meta tags**

In `apps/frontend/src/pages/Blog.tsx`, add import at the top:

```typescript
import { Helmet } from "react-helmet-async";
```

Then add the Helmet component inside the return statement of the `Blog` component, as the first child inside the outer `<div>`:

```tsx
return (
  <div className="flex flex-col bg-white">
    <Helmet>
      <title>Blog | Tiani Pekins Ebika Tech, Software & Life</title>
      <meta name="description" content="Read articles by Tiani Pekins Ebika on software engineering, tech, community building, and life in Cameroon's Silicon Mountain." />
      <meta name="keywords" content="Tiani Pekins Ebika, blog, software engineering, tech articles, Medium, Dev.to, Cameroon, Silicon Mountain" />
      <link rel="canonical" href="https://tianipekins.com/blog" />
      <meta property="og:title" content="Blog | Tiani Pekins Ebika Tech, Software & Life" />
      <meta property="og:description" content="Read articles by Tiani Pekins Ebika on software engineering, tech, community building, and life in Cameroon's Silicon Mountain." />
      <meta property="og:url" content="https://tianipekins.com/blog" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://tianipekins.com/Tiani.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Blog | Tiani Pekins Ebika Tech, Software & Life" />
      <meta name="twitter:description" content="Read articles by Tiani Pekins Ebika on software engineering, tech, community building." />
      <meta name="twitter:image" content="https://tianipekins.com/Tiani.jpg" />
    </Helmet>

    {/* Blog Hero */}
    <section className="pt-48 pb-24 px-6 bg-white">
```

- [ ] **Step 2: Commit**

```bash
git add apps/frontend/src/pages/Blog.tsx
git commit -m "feat: add SEO meta tags to Blog page"
```

---

## Task 10: Add SEO to BlogPost Page

**Files:**
- Modify: `apps/frontend/src/pages/BlogPost.tsx`

- [ ] **Step 1: Add Helmet import and SEO meta tags**

In `apps/frontend/src/pages/BlogPost.tsx`, add import at the top:

```typescript
import { Helmet } from "react-helmet-async";
```

Then add the Helmet component inside the return statement. Add it in the main `<article>` section (line 57), after the `<article>` tag opens:

```tsx
return (
  <div className="flex flex-col min-h-screen bg-white">
    <Helmet>
      <title>{post.title} | Tiani Pekins Ebika</title>
      <meta name="description" content={post.excerpt || `Read ${post.title} by Tiani Pekins Ebika Software Engineer and Founder of LocalHands.Africa.`} />
      <meta name="keywords" content={`${post.tags.join(", ")}, ${post.category}, Tiani Pekins Ebika, software engineer`} />
      <link rel="canonical" href={`https://tianipekins.com/blog/${post.slug}`} />
      <meta property="og:title" content={`${post.title} | Tiani Pekins Ebika`} />
      <meta property="og:description" content={post.excerpt || `Read ${post.title} by Tiani Pekins Ebika.`} />
      <meta property="og:url" content={`https://tianipekins.com/blog/${post.slug}`} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={post.thumbnail || "https://tianipekins.com/Tiani.jpg"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${post.title} | Tiani Pekins Ebika`} />
      <meta name="twitter:description" content={post.excerpt || `Read ${post.title} by Tiani Pekins Ebika.`} />
      <meta name="twitter:image" content={post.thumbnail || "https://tianipekins.com/Tiani.jpg"} />
    </Helmet>

    <main className="flex-grow pt-48 pb-32 px-6">
      <article className="max-w-3xl mx-auto">
```

- [ ] **Step 2: Commit**

```bash
git add apps/frontend/src/pages/BlogPost.tsx
git commit -m "feat: add SEO meta tags to BlogPost page"
```

---

## Task 11: Add SEO to Home Page

**Files:**
- Modify: `apps/frontend/src/pages/Home.tsx`

- [ ] **Step 1: Add Helmet import and SEO meta tags**

In `apps/frontend/src/pages/Home.tsx`, add import at the top:

```typescript
import { Helmet } from "react-helmet-async";
```

Then add the Helmet component inside the return statement, as the first child inside the outer `<div>`:

```tsx
return (
  <div className="flex flex-col">
    <Helmet>
      <title>Tiani Pekins Ebika | Software Engineer & Founder of LocalHands.Africa</title>
      <meta name="description" content="Tiani Pekins Ebika Full-stack Software Engineer, Founder of LocalHands.Africa, and Researcher. Based in Cameroon, Silicon Mountain." />
      <meta name="keywords" content="Tiani Pekins Ebika, software engineer, Buea, LocalHands Africa, portfolio, Cameroon, full-stack developer, researcher" />
      <link rel="canonical" href="https://tianipekins.com" />
      <meta property="og:title" content="Tiani Pekins Ebika | Software Engineer & Founder of LocalHands.Africa" />
      <meta property="og:description" content="Full-stack Software Engineer, Researcher, and Founder of LocalHands.Africa. Published on Zenodo and ResearchGate." />
      <meta property="og:url" content="https://tianipekins.com" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://tianipekins.com/Tiani.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Tiani Pekins Ebika | Software Engineer & Founder" />
      <meta name="twitter:description" content="Full-stack Software Engineer, Researcher, and Founder of LocalHands.Africa." />
      <meta name="twitter:image" content="https://tianipekins.com/Tiani.jpg" />
    </Helmet>

    {/* Hero Section */}
    <section className="pt-32 pb-12 px-6 relative overflow-hidden">
```

- [ ] **Step 2: Commit**

```bash
git add apps/frontend/src/pages/Home.tsx
git commit -m "feat: add SEO meta tags to Home page"
```

---

## Task 12: Verify Build and Test

**Files:**
- None (verification only)

- [ ] **Step 1: Run TypeScript type check**

```bash
cd apps/frontend && npx tsc --noEmit
```

Expected: No errors

- [ ] **Step 2: Run build**

```bash
cd apps/frontend && npm run build
```

Expected: Build succeeds

- [ ] **Step 3: Run lint**

```bash
cd apps/frontend && npm run lint
```

Expected: No errors

- [ ] **Step 4: Manual verification  Start dev server**

```bash
cd apps/frontend && npm run dev
```

Then open browser and verify:
- Home page shows correct title in browser tab
- About page shows "About Tiani Pekins Ebika" in browser tab
- Feed page shows "Feed | Tiani Pekins Ebika" in browser tab
- Projects page shows "Projects | Tiani Pekins Ebika" in browser tab
- Contact page shows "Contact Tiani Pekins Ebika" in browser tab
- Blog page shows "Blog | Tiani Pekins Ebika" in browser tab

- [ ] **Step 5: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: address build/lint issues from SEO implementation"
```

---

## Summary of Changes

| Task | File | Change |
|------|------|--------|
| 1 | `package.json` | Install `react-helmet-async` |
| 2 | `sitemap.xml` | Fix domain to `.com`, add `/feed` |
| 3 | `index.html` | Verify canonical URL uses `.com` |
| 4 | `App.tsx` | Wrap app with `HelmetProvider` |
| 5 | `About.tsx` | Add page-specific meta tags |
| 6 | `Feed.tsx` | Add page-specific meta tags |
| 7 | `Projects.tsx` | Add page-specific meta tags |
| 8 | `Contact.tsx` | Add page-specific meta tags |
| 9 | `Blog.tsx` | Add page-specific meta tags |
| 10 | `BlogPost.tsx` | Add page-specific meta tags |
| 11 | `Home.tsx` | Add page-specific meta tags |
| 12 | - | Verify build passes |

---

## Post-Deployment Checklist

After deploying to production:

1. **Submit updated sitemap to Google Search Console**
   - Go to Google Search Console → Sitemaps → Add `https://tianipekins.com/sitemap.xml`

2. **Request re-indexing of key pages**
   - Google Search Console → URL Inspection → Enter each URL → Request Indexing
   - Do this for: `/about`, `/feed`, `/projects`, `/contact`, `/blog`

3. **Verify with Google Rich Results Test**
   - https://search.google.com/test/rich-results
   - Test each page URL

4. **Check Bing Webmaster Tools**
   - Submit sitemap there as well

5. **Monitor Search Console for indexing issues**
   - Check Coverage report for errors
   - Monitor Performance report for impressions/clicks

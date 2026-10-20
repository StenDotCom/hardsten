# Yestin Cruz — Computer Engineering Portfolio

Personal engineering portfolio website for **John Yestin F. Cruz** (**Yestin Cruz**, `@Hardsten`), fourth-year **Computer Engineering** student at **ICCT Colleges** (Philippines).

---

## 1. Tech Stack

- **React 18** + **TypeScript 5**
- **Vite 5** (fast development server and static production bundler)
- **React Router 6** (`BrowserRouter` with configurable base path + `404.html` SPA fallback for GitHub Pages)
- **Local self-hosted fonts** via `@fontsource/poppins` and `@fontsource/jetbrains-mono` (no remote font requests)
- **Locally bundled brand SVG icons** via `simple-icons` + custom schematic SVG icons

---

## 2. Project Folder Structure

```text
hardsten/
├── index.html                          # SEO, Open Graph, Person JSON-LD, theme boot script
├── package.json
├── tsconfig.json
├── vite.config.ts                      # Configurable BASE_PATH for GitHub Pages
├── public/
│   ├── favicon.svg                     # Custom YC monogram icon
│   └── images/
│       ├── profile/
│       │   └── profile-placeholder.svg # Replace with profile.jpg (see Section 4)
│       ├── projects/
│       │   ├── gsm-home-security/
│       │   ├── icct-cslms/
│       │   ├── bedguard/
│       │   ├── three-floor-elevator/
│       │   └── smart-shoe-care/
│       └── certificates/
│           └── certificate-placeholder.svg
├── scripts/
│   ├── generate-placeholders.mjs       # Regenerates SVG placeholders if needed
│   └── postbuild.mjs                   # Copies dist/index.html -> dist/404.html & .nojekyll
└── src/
    ├── App.tsx                         # Routes & shell layout
    ├── main.tsx                        # App entrypoint & local font imports
    ├── styles/
    │   └── global.css                  # Design tokens, responsive shell, shared primitives
    ├── lib/
    │   └── utils.ts                    # Asset path helper, page meta hook, light/dark theme
    ├── data/                           # ALL EDITABLE CONTENT LIVES HERE
    │   ├── profile.ts                  # Name, links, photo path, visit counter, map query
    │   ├── nav.ts                      # The 5 primary navigation items
    │   ├── tools.ts                    # Daily Drivers / Tools I Work With (6 categories)
    │   ├── projects.ts                 # All 5 engineering & academic software projects
    │   ├── services.ts                 # Services A–E + student-level disclaimer
    │   ├── certificates.ts             # 8+ seminar certificate slots (image or PDF)
    │   └── faqs.ts                     # Frequently Asked Questions
    ├── components/
    │   ├── ProfileSidebar.tsx          # Desktop left rail (≥1100px)
    │   ├── MobileNavigation.tsx        # Tablet/mobile top profile header + 5-item bottom bar
    │   ├── HeroSection.tsx             # Home hero + bento preview
    │   ├── ToolsSection.tsx            # Grouped Daily Drivers section inside Home
    │   ├── ProjectCard.tsx             # Flagship, standard, and software project cards
    │   ├── ProjectGallery.tsx          # Featured frame + thumbnail selector + lightbox trigger
    │   ├── ImageLightbox.tsx           # Keyboard, touch-swipe, and button lightbox modal
    │   ├── SchoolMap.tsx               # Responsive ICCT Colleges Google Map + fallback link
    │   ├── CertificateGallery.tsx      # Image lightbox + PDF modal/tab viewer for certificates
    │   ├── FAQAccordion.tsx            # Accessible keyboard/mouse/touch accordion
    │   ├── ContactSection.tsx          # Direct mailto CTA, copy-email helper, social links
    │   ├── Footer.tsx                  # Site footer
    │   ├── Img.tsx                     # Aspect-ratio image frame with fallback & lazy load
    │   └── icons/                      # UI, navigation, brand, and service SVG icons
    └── pages/
        ├── HomePage.tsx                # /
        ├── ProjectsPage.tsx            # /projects
        ├── ProjectDetail.tsx           # /projects/:slug
        ├── ServicesPage.tsx            # /services
        ├── AboutPage.tsx               # /about
        └── ContactPage.tsx             # /contact
```

---

## 3. Running the Website Locally

> **Windows PowerShell note:** If PowerShell script execution policy blocks `npm`, run `npm.cmd` and `npx.cmd` instead.

```powershell
# 1. Install dependencies
npm.cmd install

# 2. Start the local development server (http://localhost:5173)
npm.cmd run dev

# 3. Type-check and build for production (outputs to dist/)
npm.cmd run build

# 4. Preview the production build locally
npm.cmd run preview
```

---

## 4. How to Replace the Profile Photo

1. Copy your portrait image (`.jpg`, `.png`, or `.webp`) into:
   ```text
   public/images/profile/profile.jpg
   ```
2. Open [`src/data/profile.ts`](src/data/profile.ts) and update `photo` and `photoIsPlaceholder`:
   ```ts
   photo: 'images/profile/profile.jpg',
   photoIsPlaceholder: false,
   photoAlt: 'Portrait of John Yestin F. Cruz',
   ```
3. Save the file. Setting `photoIsPlaceholder: false` automatically removes the `"Placeholder photo"` tag on both the desktop sidebar and the Home hero card.

---

## 5. How to Add or Replace Project Photos

Simply placing a file inside a folder does **not** automatically add it to a gallery — every image is explicitly listed in [`src/data/projects.ts`](src/data/projects.ts) so you control ordering, captions, and alt text.

1. Place your photo(s) in the matching project folder under `public/images/projects/`:
   - `public/images/projects/gsm-home-security/`
   - `public/images/projects/icct-cslms/`
   - `public/images/projects/bedguard/`
   - `public/images/projects/three-floor-elevator/`
   - `public/images/projects/smart-shoe-care/`
2. Open [`src/data/projects.ts`](src/data/projects.ts) and locate the project's `gallery` array.
3. Replace a placeholder entry or add new entries. **The first item in `gallery` is used as the project card cover image:**
   ```ts
   gallery: [
     {
       src: 'images/projects/gsm-home-security/prototype-front.jpg',
       alt: 'Front view of the GSM-enabled home security prototype enclosure and wiring',
       caption: 'Overall prototype assembly',
       placeholder: false, // or omit `placeholder`
     },
     {
       src: 'images/projects/gsm-home-security/circuit-board.jpg',
       alt: 'GSM module and sensor wiring on the prototype circuit board',
       caption: 'Circuit & GSM module wiring',
     },
   ],
   ```

---

## 6. How to Update Project Descriptions, Technologies & Status

Open [`src/data/projects.ts`](src/data/projects.ts):

- **Update description paragraphs:** Edit the `summary` string (used on project cards) and the `description: string[]` array (rendered on the project detail page).
- **Add confirmed technologies/components:** Add strings to `technologies`, for example:
  ```ts
  technologies: ['Arduino Uno', 'SIM800L GSM Module', 'Smoke / Gas Sensor'],
  ```
- **Update the ongoing project's status (`smart-shoe-care`):**
  ```ts
  status: 'completed', // 'ongoing' | 'completed' | 'prototype'
  statusLabel: 'Completed — Project Design 1',
  ```

---

## 7. How to Add 8 or More School Seminar Certificates

1. Copy your certificate images (`.jpg`, `.png`, `.webp`) or PDF documents (`.pdf`) into:
   ```text
   public/images/certificates/
   ```
2. Open [`src/data/certificates.ts`](src/data/certificates.ts) and replace the placeholder entries (or append additional entries — the grid supports 8 or more automatically):
   ```ts
   export const certificates: Certificate[] = [
     {
       id: 'cert-01',
       file: 'images/certificates/01-embedded-systems-seminar.jpg',
       type: 'image',
       title: 'Exact Seminar Title Printed on the Certificate',
       issuer: 'Exact Issuing Organization',
       date: 'Month Year',
       placeholder: false,
     },
     {
       id: 'cert-02',
       file: 'images/certificates/02-autocad-workshop.pdf',
       type: 'pdf',
       // Optional image preview of page 1 for the card thumbnail:
       thumbnail: 'images/certificates/02-autocad-workshop-thumb.jpg',
       title: 'Exact Workshop Title',
       issuer: 'Exact Issuing Organization',
       date: 'Month Year',
       placeholder: false,
     },
   ];
   ```
   - **Image certificates** open in the full-screen zoomable lightbox.
   - **PDF certificates** open in an embedded PDF viewer modal with an **Open in New Tab** button.

---

## 8. Editing Tools, Services, FAQs & Visitor Counter

- **Tools (`DAILY DRIVERS` on Home):** Edit [`src/data/tools.ts`](src/data/tools.ts).
- **Services (`A`–`E` on Services):** Edit [`src/data/services.ts`](src/data/services.ts).
- **FAQs (on FAQs/Contact):** Edit [`src/data/faqs.ts`](src/data/faqs.ts).
- **Visitor Counter (`521 visits`):** Configured in [`src/data/profile.ts`](src/data/profile.ts) (`visitCounter.value`). Keep `source: 'static'` while using a static number, or set `source: 'live'` if you wire it to an analytics endpoint later.

---

## 9. Google Maps Configuration

The map on the **About** page embeds the verified main campus of **ICCT Colleges Foundation** (`V.V. Soliven Ave. II, San Isidro, Cainta, Rizal`) and includes a direct **Open in Google Maps** button plus an automatic fallback if embeds are blocked.

To point the map to a different ICCT campus, edit `schoolMap` in [`src/data/profile.ts`](src/data/profile.ts):

```ts
export const schoolMap = {
  campusLabel: 'Antipolo Campus',
  addressLine: 'Sumulong Hwy, Antipolo, Rizal',
  query: 'ICCT Colleges Antipolo Campus',
};
```

---

## 10. Production Build & GitHub Pages Deployment

### Option A — User/Organization site (`https://stendotcom.github.io/`) or Custom Domain / Vercel / Netlify

```powershell
npm.cmd run build
```

Deploy the generated `dist/` directory.

### Option B — GitHub Pages Project Repository (`https://stendotcom.github.io/<repo-name>/`)

Set `BASE_PATH` to `/<repo-name>/` when building so all asset paths and routes resolve under the repository subpath:

```powershell
$env:BASE_PATH = "/hardsten/"
npm.cmd run build
```

The build script automatically runs `scripts/postbuild.mjs`, which creates:
- `dist/404.html` (identical copy of `dist/index.html` so refreshing deep links such as `/projects/bedguard` works on GitHub Pages)
- `dist/.nojekyll` (ensures GitHub Pages serves all bundled assets unmodified)

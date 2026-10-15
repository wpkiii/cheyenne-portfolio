# Cheyenne Daniels — Portfolio

Portfolio site for Cheyenne Daniels (Stylist · Creative Director), built with Next.js + Tailwind and hosted on Vercel. Any image that hasn't been supplied yet shows a `?` placeholder.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (run before pushing)
npm run lint
```

## Editing content

All copy and images are driven by two files, so you never need to touch components:

| File | Controls |
|---|---|
| `src/content/site.ts` | Name, roles, bio, email, Instagram, hero/about images, Shopify settings |
| `src/content/projects.ts` | Portfolio projects: titles, subtitles, descriptions, which looks are featured on the home page |
| `src/content/looks.ts` | Image list (with pixel sizes) for each look; files live in `public/images/projects/look-XX/` |

### Adding photos

- **Portfolio looks**: each look has its own folder, `public/images/projects/look-01/` … `look-24/`, with photos named `01.jpg`, `02.jpg`, …. The current images came from Cheyenne's old Canva site at roughly 600×800px; swap in her full-resolution originals using the same names, then update the `width` / `height` in `src/content/looks.ts`. The first image in each folder is the grid cover.
- **Hero**: `public/images/hero.jpg` or a video at `public/videos/hero.mp4`, set in `site.hero`.
- **About portrait**: `public/images/about-portrait.jpg`, set in `site.about.image`.
- **Brand**: the orchid lives at `public/images/brand/orchid.png`.

`next/image` handles resizing and serves WebP/AVIF.

## Design system

Modeled on the reference site: a black canvas with heavy white Helvetica, and a white footer.

- **Colors and fonts** live in `src/app/globals.css` (`@theme`): Tailwind's `black` / `white`, plus `muted`, `faint`, `panel`, and `accent` (orchid blue `#3878FF`, from Cheyenne's previous site, used for the header highlight, hovers, focus rings and selection). The font stack is Helvetica Neue → Helvetica → Arial → Inter.
- **Hero** (`src/components/Hero.tsx`): the first role sits on the left, the media is centered, the second role runs off the right edge, and the full name spans the width below it. Sizes are in `vw`, measured from the reference at 1440px wide. For the center media, set `site.hero.video` (muted loop) and/or `site.hero.image`.
- **Header**: links use a blue highlighter bar (`.nav-mark` in `globals.css`) that fills the word on hover; the current page stays filled, and the name always is.
- **Hero orchid**: pinned over the media frame's top-right corner with a slow sway (off under reduced motion).
- **Portfolio grid** (`src/components/PortfolioGrid.tsx`): four columns (two on phones). A look whose cover is wider than tall spans two columns. The home page shows the looks listed in `featuredSlugs` in `projects.ts`.
- **Project pages**: a look's photos sit side by side at one height, each at its true aspect ratio, like the look clusters on the old site.
- **Motion**: `<Reveal>` (fade and slide on scroll), `<SmartImage>` (blur-to-sharp load), and a gentle zoom on tile hover. All of it respects `prefers-reduced-motion`.

## Shop (Shopify Buy Button)

Until the store is connected, `/shop` shows a "Coming soon" card. To connect it:

1. In Shopify admin, open **Sales channels → Buy Button** and create a product Buy Button.
2. From the embed code, copy `domain`, `storefrontAccessToken` and the product `id`.
3. Add them as environment variables, locally in `.env.local` (see `.env.example`) and in **Vercel → Settings → Environment Variables**:
   - `NEXT_PUBLIC_SHOPIFY_DOMAIN`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`
   - `NEXT_PUBLIC_SHOPIFY_PRODUCT_ID`
4. Redeploy.

## Deploy

Vercel imports this GitHub repo with zero config. Every push to `main` deploys to production, and other branches get preview URLs.

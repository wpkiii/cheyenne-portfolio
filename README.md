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
| `src/content/projects.ts` | Portfolio projects: title, subtitle, cover, gallery, grid orientation |

### Adding photos

1. Put files in `public/images/`:
   - `public/images/hero.jpg` (home hero)
   - `public/images/about-portrait.jpg`
   - `public/images/projects/<slug>/cover.jpg`, `01.jpg`, `02.jpg`, …
2. Point to them in the content files, e.g. `cover: "/images/projects/project-01/cover.jpg"`.
3. Set each project's `orientation` to `"portrait"` or `"landscape"`. Landscape tiles span two grid columns.

Originals at roughly 2000px+ on the long edge work well. `next/image` handles resizing and serves WebP/AVIF.

## Design system

- **Colors and fonts** live in `src/app/globals.css` (`@theme`): `ink`, `paper`, `grey-1…4`, `mist`, `accent`.
- **Type**: Inter (thin display, bold labels) stands in for Helvetica Neue; Montserrat is the body font.
- **Motion**: `<Reveal>` (fade and slide on scroll), `<SmartImage>` (blur-to-sharp load), and a hover zoom plus title overlay on grid tiles. All of it respects `prefers-reduced-motion`.

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

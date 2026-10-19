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

Copy and settings live in a few files, and portfolio photos can come from Google Drive, so you never need to touch components:

| File | Controls |
|---|---|
| `src/content/site.ts` | Name, roles, email, Instagram, shop product and policies; fallback bio, About photo and hero video |
| `src/content/siteContent.ts` | About + hero content: the Drive "Website" folder, else `site.ts` |
| `src/content/projects.ts` | How looks become projects; which bundled looks are featured on the home page |
| `src/content/looks.ts` | Bundled image list (with pixel sizes), used when Google Drive isn't connected |
| `src/lib/drive.ts` | Google Drive integration |

## Portfolio looks from Google Drive

When `GOOGLE_DRIVE_API_KEY` and `GOOGLE_DRIVE_FOLDER_ID` are set (see `.env.example`), the portfolio reads looks straight from a shared Drive folder. Without them it uses the bundled images in `public/images/projects/`.

```
Portfolio Looks/          ← shared: Anyone with the link → Viewer
  01 Fur Coat/            ← one folder per look; "01 " sets the order and is dropped from the title
    01.jpg                ← first image (by name) is the grid cover
    02.jpg
  02 Red Carpet/
```

- **Order**: folders and photos sort by name, so number them (`01`, `02`, … `10` sorts after `9`).
- **Home page**: Selected Work fills two full rows with the first looks in order: a tall cover takes one spot and a wide cover takes two, so it shows 4–8 looks. A wide look that won't fit the last spot is skipped for the next tall one.
- **Formats**: JPG, PNG, WebP, AVIF, GIF. iPhone HEIC photos are skipped, so export them as JPG first. Empty folders and non-image files are ignored.
- **Updates**: the site re-checks Drive every 5 minutes, with no redeploy needed. To refresh immediately, open `/api/revalidate?secret=<REVALIDATE_SECRET>`.
- **Images**: they're served through `/api/drive/<file id>`, which only serves files inside the looks folder, and `next/image` resizes them.

### One-time setup

1. In [Google Cloud Console](https://console.cloud.google.com/), create a project, enable the **Google Drive API**, and create an **API key** (APIs & Services → Credentials). Restrict the key to the Drive API.
2. In Google Drive, create the `Portfolio Looks` folder, upload the look folders (the current 24 are in `public/images/projects/`), and set **Share → General access → Anyone with the link → Viewer**.
3. In Vercel → Settings → Environment Variables, set `GOOGLE_DRIVE_API_KEY`, `GOOGLE_DRIVE_FOLDER_ID` (the last part of the folder's URL) and `REVALIDATE_SECRET`, then redeploy.

## About page and home video from Google Drive

Cheyenne can change the About photo, the bio, the home page intro and the hero video herself, from a second shared folder (set `GOOGLE_DRIVE_SITE_FOLDER_ID`; the same API key is used):

```
Website/                  ← shared: Anyone with the link → Viewer
  About/
    photo.jpg             ← first image (by name) = About photo
    About                 ← Google Doc: the full bio, one paragraph per line
    Home Intro            ← Google Doc: the short intro on the home page
  Home Video/
    video.mp4             ← first video = the hero video (sets the frame's shape)
    poster.jpg            ← optional: shown while the video loads
```

- Anything missing (or the whole folder) falls back to the bundled copy in `site.ts`, `public/images/about/` and `public/videos/`.
- **Video**: MP4 (H.264), ideally under 20 MB and 5–15 seconds; it plays muted on a loop. iPhones record HEVC by default, which some browsers can't play: set **Settings → Camera → Formats → Most Compatible**, or export/share as "Most Compatible".
- **Photos**: JPG/PNG, not HEIC (same as the looks).
- Changes show up within about 20 minutes (Drive is checked every 5, pages refresh every 15), or immediately via `/api/revalidate?secret=<REVALIDATE_SECRET>`.

### Adding photos

- **Portfolio looks**: add these through Google Drive (above). The bundled fallback folders `public/images/projects/look-01/` … `look-24/` hold the images from Cheyenne's old Canva site, at roughly 600×800px.
- **Hero** (fallback): `public/videos/hero.mp4` + `hero-poster.jpg`, set in `site.hero` with the video's pixel size.
- **About portrait** (fallback): `public/images/about/cheyenne.jpg`, set in `site.about.image`.
- **Brand**: the orchid lives at `public/images/brand/orchid.png`.

`next/image` handles resizing and serves WebP/AVIF.

## Design system

Modeled on the reference site: a black canvas with heavy white Helvetica, and a white footer.

- **Colors and fonts** live in `src/app/globals.css` (`@theme`): Tailwind's `black` / `white`, plus `muted`, `faint`, `panel`, and `accent` (orchid blue `#3878FF`, from Cheyenne's previous site, used for the header highlight, hovers, focus rings and selection). The font stack is Helvetica Neue → Helvetica → Arial → Inter.
- **Hero** (`src/components/Hero.tsx`): the first role sits on the left, the media is centered, the second role runs off the right edge, and the full name spans the width below it. Sizes are in `vw`, measured from the reference at 1440px wide. For the center media, set `site.hero.video` (muted loop) and/or `site.hero.image`.
- **Header**: links use a blue highlighter bar (`.nav-mark` in `globals.css`) that fills the word on hover; the current page stays filled, and the name always is.
- **Hero orchid**: pinned over the media frame's top-right corner with a slow sway (off under reduced motion).
- **Portfolio grid** (`src/components/PortfolioGrid.tsx`): four columns (two on phones). A look whose cover is wider than tall spans two columns. The home page fills two full rows with the first looks (for the bundled looks, the list in `projects.ts`).
- **Project pages**: a look's photos sit side by side at one height, each at its true aspect ratio, like the look clusters on the old site.
- **Motion**: `<Reveal>` (fade and slide on scroll), `<SmartImage>` (blur-to-sharp load), and a gentle zoom on tile hover. All of it respects `prefers-reduced-motion`.

## Shop

The shop has one product. Checkout works one of two ways; set one in Vercel's environment variables (see `.env.example`) and redeploy. With neither set, `/shop` shows "Coming soon".

- **Hosted checkout link** (no monthly fee): set `NEXT_PUBLIC_CHECKOUT_URL` to a Stripe Payment Link (or a Square or PayPal checkout link). The product's name, price, description and photo come from `site.shop.product` in `site.ts`; the Shipping and Returns text on `/shop` from `site.shop.policies`. Set the link's after-payment redirect to `/shop/thanks`. `NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing it.
- **Shopify Buy Button** (Starter plan): set `NEXT_PUBLIC_SHOPIFY_DOMAIN`, `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` and `NEXT_PUBLIC_SHOPIFY_PRODUCT_ID` from Shopify admin → Sales channels → Buy Button → embed code. Shopify's card shows its own product details and cart.

### Stripe setup (Payment Link)

1. Cheyenne signs up at dashboard.stripe.com/register with her own email and turns on two-step login.
2. **Activate payments**: Individual/sole proprietor, her legal details and bank account; website = the site's URL; statement descriptor e.g. `CHEYENNE DANIELS`.
3. **Product catalog → Add product**: name, description, photo, one-time price $55.00 USD.
4. **Product catalog → Shipping rates**: e.g. "Standard", the price, 5–7 business days.
5. **Payment Links → New**: pick the product, turn on **Collect shipping addresses** (United States) and add the shipping rate; under **After payment**, redirect to `<site>/shop/thanks`.
6. **Settings → Customer emails**: turn on successful-payment receipts.
7. Test the same link in Test mode with card `4242 4242 4242 4242`, then put the **live** link in Vercel as `NEXT_PUBLIC_CHECKOUT_URL` and redeploy.

## Contact form

The Contact page form and the compact footer form post to a server action (`src/app/actions/contact.ts`). It forwards each message to a Google Apps Script web app, which **adds a row to a Google Sheet and emails the message to Cheyenne**, with Reply-To set to the sender. A hidden honeypot field drops bot submissions. Until `CONTACT_WEBHOOK_URL` is set, the form falls back to opening the visitor's email app.

### One-time setup (in the thekellyorg Google account)

1. Create a Google Sheet, e.g. "Website Messages".
2. **Extensions → Apps Script**, then replace the editor's contents with `scripts/google-apps-script/Contact.gs` and save.
3. **Project Settings (gear) → Script properties**, and add:
   - `SECRET`: a long random string (`openssl rand -hex 24`)
   - `NOTIFY_EMAIL`: `cdstudios111@gmail.com`
4. **Deploy → New deployment → type: Web app**, with Execute as **Me** and Who has access **Anyone**. Authorize when prompted; on "Google hasn't verified this app", choose Advanced → Go to (project). Copy the **Web app URL**, which ends in `/exec`.
5. In Vercel, set `CONTACT_WEBHOOK_URL` (that URL) and `CONTACT_WEBHOOK_SECRET` (the same SECRET), then redeploy.

Gmail sends up to about 100 of these emails a day from a personal account. Every message is also kept in the Sheet. If you edit the script later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.

## Motion

- **Hero intro** (home page load): each line rises out of a mask, the media frame wipes open, and the orchid blooms, then sways.
- **Scroll**: the hero frame sinks, the orchid floats up, and the name drifts left. This uses CSS scroll timelines, and browsers without support just don't animate.
- **Page transitions**: React `<ViewTransition>` crossfades pages, and a look's grid cover morphs into its project page.
- Everything is off when the visitor's device asks for reduced motion.

## Deploy

Vercel imports this GitHub repo with zero config. Every push to `main` deploys to production, and other branches get preview URLs.

**Custom domain (registered at GoDaddy):** in Vercel → Project → Settings → Domains, add both `example.com` and `www.example.com`. Vercel then shows the exact DNS records to create. In GoDaddy → My Products → Domain → DNS, replace the old site's `@` A record and `www` CNAME with Vercel's values, and leave any email (MX/TXT) records alone. HTTPS turns on automatically once DNS updates.

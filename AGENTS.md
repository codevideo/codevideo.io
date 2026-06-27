# AGENTS.md

This is a Gatsby repo for the CodeVideo marketing site and written content.

When changing SEO, public content, or links to owned products, apply these rules.

## Written Content Attribution

- Written content lives in `src/content/blog`, `src/content/guides`, and `src/content/features`.
- Every absolute owned-product link in Markdown content must include GrowthKit-friendly UTM parameters:
  - `utm_source=codevideo.io`
  - `utm_medium=blog`, `guide`, or `feature`
  - `utm_campaign=<content-slug>`
  - `utm_content=<anchor-or-target>`
- Owned product domains include `fullstackcraft.com`, `wheelscreener.com`, `vannacharm.com`, `leapsscreener.com`, `option-screener.com`, `codevideo.io`, `studio.codevideo.io`, `genie.codevideo.io`, `chatvideolab.com`, and `amtjoy.com`.
- Preserve existing query parameters and append UTMs with `&`.
- For new-tab links, use `target="_blank" rel="noopener"`. Do not rely on `target="_blank"` for attribution; GrowthKit reads URL/referrer/UTM data on page landing.
- Do not rely on same-domain internal UTMs as click tracking. GrowthKit records one landing event per product per tab session.

## GrowthKit

- Keep the existing GrowthKit tracker mounted in the shared layout.
- The tracker should insert into `growthkit_referral_events` using the same Supabase REST pattern as the other product sites.

## Checks

- For attribution changes, run a static scan of the content folders and confirm owned-product absolute URLs have `utm_source`.
- Run `npm run type-check` and `npm run build` when practical.

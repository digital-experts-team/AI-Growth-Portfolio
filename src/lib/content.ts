// Drafts never build in production: no page, no sitemap entry, no RSS/llms.txt listing.
export const isLive = ({ data }: { data: { status?: string } }) =>
  import.meta.env.DEV ? true : data.status !== 'draft';

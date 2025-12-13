export type Promotion = {
  _id: string;
  title?: string;
  tagline?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  theme?: string;
  badge?: string;
  priority?: number;
  active?: boolean;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

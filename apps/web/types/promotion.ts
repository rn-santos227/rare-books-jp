export type Promotion = {
  _id: string;
  title?: string;
  titleJa?: string | null;
  tagline?: string;
  taglineJa?: string | null;
  description?: string;
  descriptionJa?: string | null;
  ctaLabel?: string;
  ctaLabelJa?: string | null;
  ctaHref?: string;
  theme?: string;
  badge?: string;
  badgeJa?: string | null;
  priority?: number;
  active?: boolean;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import ImageViewer from "@/components/ui/ImageViewer";
import { Promotion } from "@/types/promotion";

interface PromotionHeroProps {
  categoriesCount: number;
  genresCount: number;
  promotions: Promotion[];
}

export function PromotionHero({
  categoriesCount,
  genresCount,
  promotions,
}: PromotionHeroProps) {
  return (
    <div className="border-b border-white/5 bg-linear-to-r from-[#ff4d67] via-[#ff5f6d] to-[#ffb347] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/80">Mercari style banner</p>
            <h1 className="text-2xl font-bold leading-tight md:text-3xl">
              Our international purchase and shipping parallel is live
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Badge tone="info" className="bg-white/20 text-white ring-white/30">
              {categoriesCount}+ categories
            </Badge>
            <Badge tone="info" className="bg-black/20 ring-white/30">
              {genresCount} genres
            </Badge>
          </div>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 shadow-sm ring-1 ring-white/20 backdrop-blur">
          {promotions.length > 0 ? (
            <Carousel ariaLabel="Promotions" className="-mx-2 px-2">
              {promotions.map((promotion) => (
                <div
                  key={promotion._id}
                  className="min-w-70 max-w-85 rounded-2xl bg-white/10 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.25)] ring-1 ring-white/25"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Promotion</p>
                        <h2 className="text-xl font-bold text-white">{promotion.title ?? "Untitled promotion"}</h2>
                        {promotion.tagline && (
                          <p className="text-sm font-semibold text-white/90 line-clamp-2">{promotion.tagline}</p>
                        )}
                        {promotion.description && (
                          <p className="text-sm leading-relaxed text-white/80 line-clamp-3">{promotion.description}</p>
                        )}
                        <div className="flex flex-wrap gap-3">
                          {promotion.ctaHref && promotion.ctaLabel ? (
                            <Button href={promotion.ctaHref} className="bg-white text-[#ff5f6d] shadow-sm">
                              {promotion.ctaLabel}
                            </Button>
                          ) : (
                            <Button className="bg-white text-[#ff5f6d] shadow-sm">Explore promotion</Button>
                          )}
                          <Button variant="secondary" className="bg-white/10 text-white ring-1 ring-white/30">
                            Visit Studio dashboard
                          </Button>
                        </div>
                      </div>
                      {promotion.badge && (
                        <Badge tone="info" className="bg-white/20 text-white ring-white/40">
                          {promotion.badge}
                        </Badge>
                      )}
                    </div>

                    {promotion.imageUrl ? (
                      <div className="relative h-32 w-full overflow-hidden rounded-xl bg-white/15 shadow-sm ring-1 ring-white/30 md:h-36">
                        <ImageViewer
                          src={promotion.imageUrl}
                          alt={promotion.imageAlt ?? promotion.title ?? "Promotion image"}
                          className="h-full w-full rounded-xl"
                          imgClassName="h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                      </div>
                    ) : (
                      <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-white/40 bg-white/10 text-sm text-white/80 md:h-36">
                        Add hero image
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
              <div className="space-y-2 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Promotions</p>
                <h2 className="text-xl font-bold text-white">Showcase a feature banner</h2>
                <p className="text-sm leading-relaxed text-white/80">
                  Create an active promotion in Sanity Studio to highlight seasonal sales, shipping perks, or featured titles right at the top of the homepage.
                </p>
              </div>
              <div className="flex flex-col justify-center gap-3 rounded-2xl border border-dashed border-white/40 bg-white/5 p-4 text-white/80">
                <p className="text-sm font-semibold text-white">No active promotions</p>
                <p className="text-sm">
                  Publish at least one promotion to populate this carousel with hero cards.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

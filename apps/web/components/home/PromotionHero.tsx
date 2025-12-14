import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import ImageViewer from "@/components/ui/ImageViewer";
import { Promotion } from "@/types/promotion";

interface PromotionHeroProps {
  categoriesCount: number;
  genresCount: number;
  promotion?: Promotion;
}


export function PromotionHero({
  categoriesCount,
  genresCount,
  promotion,
}: PromotionHeroProps) {
  return (
    <div className="border-b border-white/5 bg-linear-to-r from-[#ff4d67] via-[#ff5f6d] to-[#ffb347] text-white"></div>
  );
}

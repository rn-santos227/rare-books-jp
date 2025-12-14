import { GeneralFooterLayout } from "@/components/layouts/GeneralFooterLayout";

const footerSections = [
  {
    heading: "Browse",
    links: ["All books", "Genres", "Collections"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Contact"],
  },
  {
    heading: "Support",
    links: ["Help center", "Shipping", "Returns"],
  },
];

export function SiteFooter() {
  return (
    <GeneralFooterLayout>
      <div className="grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <div className="text-lg font-semibold text-white">The Rare Books JP</div>
          <p className="text-sm text-slate-400">
            Curating rare titles, first editions, and treasured finds from Japan and
            around the world.
          </p>
        </div>

        {footerSections.map((section) => (
          <div key={section.heading} className="space-y-3 text-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {section.heading}
            </div>
            <ul className="space-y-2 text-slate-300">
              {section.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} The Rare Books JP. All rights reserved.</span>
        <div className="flex flex-wrap gap-4">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Cookies</span>
        </div>
      </div>
    </GeneralFooterLayout>
  );
}

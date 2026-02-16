import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

import gridlessLogo from "@assets/gridless_by_hisense_1767986076307.png";
import gridlessCardBg from "@assets/gridless-card-background_1767986970961.png";
import gridlessProducts from "@assets/6928ec23fa0f88910888c58b_gridless_unit_1767978184527.webp";
import lgLogo from "@assets/LG-logo_1767986386489.png";
import lgCardBg from "@assets/LG-card-background_1767987400480.png";
import lgProducts from "@assets/lg-products.webp";
import daikinLogo from "@assets/daikin-logo_1767986244581.png";
import daikinCardBg from "@assets/daikin-card-background_1767987817153.png";
import daikinProducts from "@assets/daikin-products.webp";
import kerrLogo from "@assets/Kerr-logo_1767986478090.png";
import kerrLogoLight from "@assets/KERR-logo-gray_1767988080665.png";
import kerrCardBg from "@assets/kerr-card-background_1767987925723.png";
import kerrProducts from "@assets/kerr-products.webp";
import geLogo from "@assets/Ge-logo-card_1767987532273.png";
import geCardBg from "@assets/Ge-card-background_1767987574945.png";
import geProducts from "@assets/ge-products.webp";
import mitsubishiLogo from "@assets/Mitsubishi-logo_1767986705006.png";
import mitsubishiCardBg from "@assets/Mitsubishi-card-Background_1767988019639.png";
import mitsubishiProducts from "@assets/mitsubishi-products.webp";

export type BrandKey = "gridless" | "lg" | "daikin" | "ge" | "kerr" | "mitsubishi";

export interface BrandInfo {
  key: BrandKey;
  name: string;
  href: string;
  logo: string;
  cardBg: string;
  products: string;
  footerLogo?: string;
}

export const allBrands: BrandInfo[] = [
  { key: "gridless", name: "Gridless", href: "/brands/gridless-heat-pumps", logo: gridlessLogo, cardBg: gridlessCardBg, products: gridlessProducts },
  { key: "lg", name: "LG", href: "/brands/lg-heat-pumps", logo: lgLogo, cardBg: lgCardBg, products: lgProducts },
  { key: "daikin", name: "Daikin", href: "/brands/daikin-heat-pumps", logo: daikinLogo, cardBg: daikinCardBg, products: daikinProducts },
  { key: "ge", name: "GE", href: "/brands/general-electric-heat-pumps", logo: geLogo, cardBg: geCardBg, products: geProducts },
  { key: "kerr", name: "Kerr", href: "/brands/kerr-heat-pumps", logo: kerrLogo, cardBg: kerrCardBg, products: kerrProducts, footerLogo: kerrLogoLight },
  { key: "mitsubishi", name: "Mitsubishi", href: "/brands/mitsubishi-electric-heat-pumps", logo: mitsubishiLogo, cardBg: mitsubishiCardBg, products: mitsubishiProducts },
];

interface BrandCardProps {
  brand: BrandInfo;
  learnMoreText: string;
}

export function BrandCard({ brand, learnMoreText }: BrandCardProps) {
  return (
    <a
      key={brand.key}
      href={brand.href}
      className="bg-gradient-to-b from-slate-100 to-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow group cursor-pointer overflow-hidden block"
      data-testid={`card-brand-${brand.key}`}
    >
      <div className="relative h-full flex flex-col">
        <div className="absolute inset-0">
          <img src={brand.cardBg} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="relative z-10 p-3 pb-0">
          <img src={brand.logo} alt={brand.name} className="h-8 object-contain" loading="lazy" />
        </div>
        <div className="relative z-10 flex-1 flex items-center justify-center px-3 py-3">
          <img src={brand.products} alt={`${brand.name} Products`} className="max-h-24 object-contain" loading="lazy" />
        </div>
        <div className="relative z-10 bg-[#333333] px-3 py-2.5 flex items-center justify-between">
          <img
            src={brand.footerLogo || brand.logo}
            alt={brand.name}
            className={`h-3.5 object-contain ${brand.footerLogo ? '' : 'brightness-0 invert'}`}
            loading="lazy"
          />
          <span className="text-[#8dc63f] font-bold text-xs flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
            {learnMoreText} <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

interface BrandCardsGridProps {
  exclude?: BrandKey;
  columns?: string;
}

export function BrandCardsGrid({ exclude, columns = "grid-cols-2 md:grid-cols-3 lg:grid-cols-6" }: BrandCardsGridProps) {
  const { t } = useLanguage();
  const brands = exclude ? allBrands.filter((b) => b.key !== exclude) : allBrands;

  return (
    <div className={`grid ${columns} gap-4 max-w-5xl mx-auto`}>
      {brands.map((brand) => (
        <BrandCard key={brand.key} brand={brand} learnMoreText={t.common.learnMore} />
      ))}
    </div>
  );
}

interface OtherBrandsGridProps {
  exclude: BrandKey;
}

export function OtherBrandsGrid({ exclude }: OtherBrandsGridProps) {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white border-t">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
            Explore Other Heat Pump Brands We Install
          </h2>
          <p className="text-slate-600">
            Not sure which brand is right for you? Compare our full lineup of premium heat pumps.
          </p>
        </div>
        <BrandCardsGrid exclude={exclude} columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-5" />
        <div className="text-center mt-8">
          <a href="/services/mini-split-heat-pumps" className="text-[#8dc63f] hover:text-[#709c32] font-bold inline-flex items-center gap-2">
            {t.common.learnMore} <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

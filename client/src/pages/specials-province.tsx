import { useRoute, Link } from "wouter";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { motion } from "framer-motion";
import { Phone, MapPin, ChevronRight, ArrowLeft } from "lucide-react";
import { BreadcrumbSchema, ServiceSchema, SpecialOffersSchema } from "@/components/seo/ServiceSchema";
import { Helmet } from "react-helmet";

import logoImg from "@assets/greenfoot_green_on_black_1767807795674.png";
import { promotions as allPromotions } from "@/data/promotions";

interface Promotion {
  id: string;
  province: string;
  title: string;
  description: string | null;
  link: string | null;
  linkText: string | null;
  sortOrder: number;
  isActive: boolean;
  isFeatured: boolean;
}

const provinceMap: Record<string, { name: string; shortCode: string; phone: string }> = {
  "nova-scotia": { name: "Nova Scotia", shortCode: "NS", phone: "(902) 706-0917" },
  "new-brunswick": { name: "New Brunswick", shortCode: "NB", phone: "(506) 260-0324" },
  "prince-edward-island": { name: "Prince Edward Island", shortCode: "PEI", phone: "(902) 201-8469" },
  "british-columbia": { name: "British Columbia", shortCode: "BC", phone: "(778) 504-7059" },
  "newfoundland-labrador": { name: "Newfoundland and Labrador", shortCode: "NL", phone: "(709) 725-6682" },
};

function PromotionCard({ promotion, index, provincePhone }: { promotion: Promotion; index: number; provincePhone: string }) {
  const cardId = `card-promo-${index}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow"
      data-testid={cardId}
    >
      <div className="bg-[#333333] p-4 flex items-center gap-4">
        <img src={logoImg} alt="Greenfoot" className="h-12 w-auto" />
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <MapPin className="w-4 h-4" />
          <span data-testid={`text-province-${cardId}`}>{promotion.province}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-black text-[#333333] mb-3" data-testid={`text-title-${cardId}`}>{promotion.title}</h3>
        <p className="text-slate-600 mb-6" data-testid={`text-desc-${cardId}`}>{promotion.description || ''}</p>
        <div className="flex items-center justify-between">
          <a href={`tel:${provincePhone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-slate-500 hover:text-[#8dc63f] transition-colors" data-testid={`link-phone-${cardId}`}>
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">{provincePhone}</span>
          </a>
          <a 
            href={promotion.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold px-6 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm flex items-center justify-center"
            data-testid={`button-quote-${cardId}`}
          >
            {promotion.linkText || 'FREE QUOTE'}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function SpecialsProvincePage() {
  const [, params] = useRoute("/specials/:province");
  const provinceSlug = params?.province || "";
  const provinceInfo = provinceMap[provinceSlug];

  const promotions = ([...allPromotions] as any as Promotion[]).filter(p => p.province === provinceInfo?.name);

  const filteredPromotions = promotions
    .filter(p => p.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const featuredPromotion = filteredPromotions.find(p => p.isFeatured);
  const regularPromotions = filteredPromotions.filter(p => !p.isFeatured);

  if (!provinceInfo) {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-black text-[#333333] mb-4">Province Not Found</h1>
          <p className="text-slate-600 mb-8">The province you're looking for doesn't exist.</p>
          <Link href="/specials-promotions" className="text-[#8dc63f] hover:underline">
            View All Specials & Promotions
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{`${provinceInfo.name} Specials & Rebates | Greenfoot Energy`}</title>
        <meta name="description" content={`Save thousands on heat pumps, insulation & energy upgrades in ${provinceInfo.name}. Explore exclusive promotions and provincial rebates available now.`} />
        <meta name="keywords" content={`${provinceInfo.name} heat pump rebates, ${provinceInfo.shortCode} energy efficiency, insulation rebates ${provinceInfo.shortCode}, ${provinceInfo.name} HVAC deals`} />
        <link rel="canonical" href={`https://www.greenfootenergy.ca/specials/${provinceSlug}`} />
        
        <meta property="og:title" content={`${provinceInfo.name} Specials & Promotions | Greenfoot Energy`} />
        <meta property="og:description" content={`Exclusive energy efficiency promotions and rebates in ${provinceInfo.name}. Save on heat pumps and more.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.greenfootenergy.ca/specials/${provinceSlug}`} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${provinceInfo.name} Specials | Greenfoot Energy`} />
        <meta name="twitter:description" content={`Save on heat pumps & energy upgrades in ${provinceInfo.name}. Exclusive promotions available.`} />
      </Helmet>
      
      <ServiceSchema
        serviceName={`${provinceInfo.name} Energy Efficiency Promotions`}
        serviceDescription={`Exclusive heat pump, insulation, and energy efficiency promotions for ${provinceInfo.name} homeowners. Save thousands with provincial rebates and limited-time offers.`}
        serviceType="Energy Efficiency Services"
        serviceUrl={`https://www.greenfootenergy.ca/specials/${provinceSlug}`}
        priceRange="$$"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 1250 }}
      />
      
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Specials & Promotions", url: "https://www.greenfootenergy.ca/specials-promotions" },
          { name: provinceInfo.name, url: `https://www.greenfootenergy.ca/specials/${provinceSlug}` },
        ]}
      />

      <SpecialOffersSchema promotions={promotions as any} province={provinceInfo.name} />
      
      <SiteHeader />
      
      <section className="bg-[#333333] pt-32 pb-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <Link 
            href="/specials-promotions" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            data-testid="link-back"
          >
            <ArrowLeft className="w-4 h-4" />
            All Provinces
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-[#8dc63f]/20 text-[#8dc63f] px-4 py-2 rounded-full font-bold text-sm mb-6">
              <MapPin className="w-4 h-4" />
              {provinceInfo.name}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6" data-testid="text-hero-title">
              {provinceInfo.name} <span className="text-[#8dc63f]">Specials & Promotions</span>
            </h1>
            <p className="text-xl text-white/80 mb-8" data-testid="text-hero-subtitle">
              Exclusive energy efficiency promotions and rebates for {provinceInfo.name} homeowners.
            </p>
            <a 
              href="https://scheduling.greenfootenergy.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold px-8 h-12 sm:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all text-base sm:text-lg"
              data-testid="button-hero-cta"
            >
              Get Your Free Quote
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#8dc63f] font-bold uppercase tracking-wider mb-2">Available Now</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-4" data-testid="text-promos-title">
              Current <span className="text-[#8dc63f]">Promotions</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Take advantage of these exclusive offers available to {provinceInfo.name} homeowners.
            </p>
          </div>

              {featuredPromotion && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="bg-gradient-to-r from-[#8dc63f] to-[#6ba82e] rounded-2xl p-8 text-white shadow-xl" data-testid="featured-promotion">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">FEATURED</span>
                    </div>
                    <h3 className="text-2xl font-black mb-3">{featuredPromotion.title}</h3>
                    <p className="text-white/90 mb-6">{featuredPromotion.description}</p>
                    <a 
                      href={featuredPromotion.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-[#8dc63f] font-bold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      {featuredPromotion.linkText || 'Learn More'}
                    </a>
                  </div>
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-promotions">
                {regularPromotions.map((promo, i) => (
                  <PromotionCard 
                    key={promo.id} 
                    promotion={promo} 
                    index={i} 
                    provincePhone={provinceInfo.phone}
                  />
                ))}
              </div>

              {filteredPromotions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-600">No promotions currently available for {provinceInfo.name}.</p>
                  <Link href="/specials-promotions" className="text-[#8dc63f] hover:underline mt-4 inline-block">
                    View All Specials & Promotions
                  </Link>
                </div>
              )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#8dc63f] font-bold uppercase tracking-wider mb-2">Ready to Save?</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-6">
              Get Your <span className="text-[#8dc63f]">Free Quote</span> Today
            </h2>
            <p className="text-slate-600 mb-8">
              Our {provinceInfo.name} team will help you explore all available promotions and find the best solution for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold px-8 h-12 sm:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all text-base sm:text-lg"
                data-testid="button-cta-booking"
              >
                Book Your Free Quote
              </a>
              <a 
                href={`tel:${provinceInfo.phone.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center gap-2 bg-[#333333] hover:bg-[#222222] text-white font-bold px-8 h-12 sm:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all text-base sm:text-lg"
                data-testid="link-phone"
              >
                <Phone className="w-5 h-5" />
                Call {provinceInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

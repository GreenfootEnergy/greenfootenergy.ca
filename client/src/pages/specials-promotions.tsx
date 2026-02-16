import { useState } from "react";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, ChevronRight } from "lucide-react";
import { BreadcrumbSchema, ServiceSchema, SpecialOffersSchema } from "@/components/seo/ServiceSchema";
import { Helmet } from "react-helmet";

import logoImg from "@assets/greenfoot_green_on_black_1767807795674.png";
import { promotions as staticPromotions } from "@/data/promotions";

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

const provinces = ["British Columbia", "New Brunswick", "Prince Edward Island", "Nova Scotia", "Newfoundland and Labrador"];

function PromotionCard({ promotion, index }: { promotion: Promotion; index: number }) {
  const cardId = `card-promo-${promotion.province.toLowerCase().replace(/\s+/g, '-')}-${index}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
        <div className="flex items-center gap-3">
          <a 
            href="tel:18003809384" 
            className="flex items-center justify-center gap-2 bg-[#333333] hover:bg-[#222222] text-white font-bold h-12 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all shrink-0" 
            data-testid={`link-phone-${cardId}`}
          >
            <Phone className="w-5 h-5" />
            <span className="hidden sm:inline">Call Now</span>
          </a>
          <a 
            href={promotion.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold px-4 sm:px-6 h-12 text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center whitespace-nowrap flex-1"
            data-testid={`button-quote-${cardId}`}
          >
            {promotion.linkText || 'FREE QUOTE'}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function SpecialsPromotionsPage() {
  const [activeProvince, setActiveProvince] = useState("British Columbia");

  const promotions = [...staticPromotions] as any as Promotion[];

  const filteredPromotions = promotions
    .filter(p => p.province === activeProvince && p.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Specials & Promotions | Heat Pump Rebates | Greenfoot</title>
        <meta name="description" content="Save thousands on heat pumps, insulation & energy upgrades. Exclusive promotions & provincial rebates in NS, NB, PEI, NL & BC. Get your free quote today!" />
        <meta name="keywords" content="heat pump rebates, energy efficiency promotions, insulation rebates, HVAC deals, Nova Scotia rebates, New Brunswick incentives, BC heat pump offers" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/specials-promotions" />
        
        <meta property="og:title" content="Specials & Promotions | Heat Pump Rebates | Greenfoot Energy" />
        <meta property="og:description" content="Exclusive energy efficiency promotions and provincial rebates. Save on heat pumps, insulation, and more across Atlantic Canada and BC." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/specials-promotions" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Specials & Promotions | Greenfoot Energy Solutions" />
        <meta name="twitter:description" content="Save thousands on heat pumps & energy upgrades. Exclusive promotions across Atlantic Canada & BC." />
      </Helmet>
      
      <ServiceSchema
        serviceName="Energy Efficiency Promotions & Rebates"
        serviceDescription="Exclusive promotions, provincial rebates, and limited-time offers on heat pumps, insulation, and energy efficiency upgrades across Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland, and British Columbia."
        serviceType="Energy Efficiency Services"
        serviceUrl="https://www.greenfootenergy.ca/specials-promotions"
        priceRange="$$"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 1250 }}
      />
      
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Specials & Promotions", url: "https://www.greenfootenergy.ca/specials-promotions" },
        ]}
      />

      <SpecialOffersSchema promotions={promotions as any} />
      
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="bg-[#333333] pt-32 pb-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 uppercase tracking-tight leading-tight" data-testid="text-hero-title">
              Current Offers on <span className="text-[#8dc63f]">Energy Efficiency</span> Upgrades
            </h1>
            <p className="text-lg text-white/70 mb-8">
              We also may have Greenfoot Exclusive Promotions and can help you stack current incentives for maximum savings. Let us guide you through a simple process to unlock every deal!
            </p>
            <a 
              href="https://scheduling.greenfootenergy.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold px-8 h-12 sm:h-14 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
              data-testid="button-book-now"
            >
              Book Your Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* Province Tabs Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#8dc63f] font-bold uppercase tracking-wider mb-2">Maximize Your</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-4" data-testid="text-rebates-title">
              Home Comfort <span className="text-[#8dc63f]">Rebates</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our Experts Cut the Confusion. Choose Your Province Below to Unlock Your Available Promotions.
            </p>
          </div>

          <Tabs defaultValue="British Columbia" className="w-full" onValueChange={setActiveProvince}>
            <div className="overflow-x-auto pb-4 mb-8 scrollbar-hide">
              <TabsList className="bg-transparent h-auto gap-2 inline-flex whitespace-nowrap p-0 min-w-max">
                {provinces.map(province => (
                  <TabsTrigger 
                    key={province} 
                    value={province}
                    className="px-4 sm:px-6 py-3 rounded-xl font-bold data-[state=active]:bg-[#8dc63f] data-[state=active]:text-white text-slate-600 hover:text-[#8dc63f] transition-all bg-white shadow-sm border border-slate-100 text-sm sm:text-base"
                    data-testid={`tab-${province.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {province}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProvince}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-promotions">
                      {filteredPromotions.map((promo, i) => (
                        <PromotionCard key={promo.id} promotion={promo} index={i} />
                      ))}
                    </div>
                    <div className="text-center mt-8">
                      <a 
                        href={`/specials/${activeProvince.toLowerCase().replace(/\s+/g, '-').replace('and-', '')}`}
                        className="inline-flex items-center gap-2 text-[#8dc63f] hover:text-[#709c32] font-bold transition-colors"
                        data-testid="link-view-all"
                      >
                        View {activeProvince} Promotions Page
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#8dc63f] font-bold uppercase tracking-wider mb-2">Ready to Save?</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-6">
              Get Your <span className="text-[#8dc63f]">Free Quote</span> Today
            </h2>
            <p className="text-slate-600 mb-8">
              Our team will help you explore all available promotions and find the best solution for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold px-8 h-12 sm:h-14 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                data-testid="button-cta-booking"
              >
                Book Your Free Quote
              </a>
              <a 
                href="/financing" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#333333] hover:bg-[#444444] text-white font-bold px-8 h-12 sm:h-14 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                data-testid="link-financing"
              >
                Explore Financing Options
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

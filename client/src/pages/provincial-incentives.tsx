import { useState } from "react";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, ChevronRight, ExternalLink } from "lucide-react";
import { BreadcrumbSchema, ServiceSchema } from "@/components/seo/ServiceSchema";
import { Helmet } from "react-helmet";

import logoImg from "@assets/greenfoot_green_on_black_1767807795674.png";

interface Incentive {
  id: string;
  name: string;
  province: string;
  programType: string | null;
  description: string | null;
  link: string | null;
  linkText: string | null;
  logo: string | null;
  phone: string | null;
  details: string | null;
  sortOrder: number;
  isActive: boolean;
  isFeatured: boolean;
}

const provinces = ["British Columbia", "New Brunswick", "Prince Edward Island", "Nova Scotia", "Newfoundland and Labrador"];

const defaultIncentives: Record<string, Incentive[]> = {
  "British Columbia": [
    {
      id: "bc-1",
      name: "Better Homes BC",
      province: "British Columbia",
      programType: "Provincial Incentive",
      description: "CleanBC Better Homes program offers rebates on heat pumps, insulation, and energy efficiency upgrades for BC homeowners.",
      link: "https://www.betterhomesbc.ca/",
      linkText: "Learn More",
      logo: null,
      phone: "1 (800) 380-9384",
      details: "See www.betterhomesbc.ca for details",
      sortOrder: 0,
      isActive: true,
      isFeatured: true,
    },
    {
      id: "bc-2",
      name: "FortisBC Rebates",
      province: "British Columbia",
      programType: "Utility Rebates",
      description: "FortisBC offers rebates and energy savings programs for heating, cooling, and home efficiency upgrades.",
      link: "https://www.fortisbc.com/rebates-and-energy-savings",
      linkText: "Learn More",
      logo: null,
      phone: "1 (800) 380-9384",
      details: "See www.fortisbc.com for details",
      sortOrder: 1,
      isActive: true,
      isFeatured: false,
    },
  ],
  "New Brunswick": [
    {
      id: "nb-1",
      name: "Save Energy NB",
      province: "New Brunswick",
      programType: "Provincial Incentive",
      description: "NB Power's Save Energy program offers rebates on heat pumps, insulation, and home energy upgrades.",
      link: "https://www.saveenergynb.ca/en/for-home/",
      linkText: "Learn More",
      logo: null,
      phone: "1 (800) 380-9384",
      details: "See www.saveenergynb.ca for details",
      sortOrder: 0,
      isActive: true,
      isFeatured: true,
    },
    {
      id: "nb-2",
      name: "Ditch Oil Program",
      province: "New Brunswick",
      programType: "Oil Conversion",
      description: "Upgrade from oil heating to energy-efficient heat pumps and save up to $15,000 through combined rebates.",
      link: "https://scheduling.greenfootenergy.ca/",
      linkText: "Get Started",
      logo: null,
      phone: "1 (800) 380-9384",
      details: "Switch from oil to heat pump heating",
      sortOrder: 1,
      isActive: true,
      isFeatured: true,
    },
    {
      id: "nb-3",
      name: "Central Ducted Heat Pump Rebate",
      province: "New Brunswick",
      programType: "Equipment Rebate",
      description: "Get a $1,500 government rebate when you install a Central Ducted Heat Pump!",
      link: "https://scheduling.greenfootenergy.ca/",
      linkText: "Get Started",
      logo: null,
      phone: "1 (800) 380-9384",
      details: "$1,500 rebate on ducted systems",
      sortOrder: 2,
      isActive: true,
      isFeatured: false,
    },
  ],
  "Prince Edward Island": [
    {
      id: "pei-1",
      name: "Efficiency PEI",
      province: "Prince Edward Island",
      programType: "Provincial Incentive",
      description: "Efficiency PEI offers rebates and incentives for heat pumps, insulation, and energy efficiency upgrades.",
      link: "https://www.princeedwardisland.ca/en/topic/energy-efficiency",
      linkText: "Learn More",
      logo: null,
      phone: "1 (800) 380-9384",
      details: "See www.princeedwardisland.ca for details",
      sortOrder: 0,
      isActive: true,
      isFeatured: true,
    },
  ],
  "Nova Scotia": [
    {
      id: "ns-1",
      name: "Efficiency Nova Scotia",
      province: "Nova Scotia",
      programType: "Provincial Incentive",
      description: "Efficiency Nova Scotia offers rebates on heat pumps, home insulation, and energy efficiency upgrades.",
      link: "https://www.efficiencyns.ca/",
      linkText: "Learn More",
      logo: null,
      phone: "1 (800) 380-9384",
      details: "See www.efficiencyns.ca for details",
      sortOrder: 0,
      isActive: true,
      isFeatured: true,
    },
  ],
  "Newfoundland and Labrador": [
    {
      id: "nl-1",
      name: "Take Charge Newfoundland",
      province: "Newfoundland and Labrador",
      programType: "Provincial Incentive",
      description: "Take Charge offers rebates and incentives for heat pumps and energy efficiency upgrades in Newfoundland and Labrador.",
      link: "https://takechargenl.ca/",
      linkText: "Learn More",
      logo: null,
      phone: "1 (800) 380-9384",
      details: "See takechargenl.ca for details",
      sortOrder: 0,
      isActive: true,
      isFeatured: true,
    },
  ],
};

function IncentiveCard({ incentive, index }: { incentive: Incentive; index: number }) {
  const cardId = `card-incentive-${incentive.province.toLowerCase().replace(/\s+/g, '-')}-${index}`;
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
          <span data-testid={`text-province-${cardId}`}>{incentive.province}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          {incentive.programType && (
            <span className="text-xs font-semibold text-[#8dc63f] bg-[#8dc63f]/10 px-3 py-1 rounded-full">
              {incentive.programType}
            </span>
          )}
        </div>
        <h3 className="text-xl font-black text-[#333333] mb-3" data-testid={`text-title-${cardId}`}>{incentive.name}</h3>
        <p className="text-slate-600 mb-4" data-testid={`text-desc-${cardId}`}>{incentive.description || ''}</p>
        {incentive.details && (
          <p className="text-sm text-slate-500 mb-4 italic">{incentive.details}</p>
        )}
        <div className="flex items-center justify-between">
          <a href={`tel:${incentive.phone?.replace(/\D/g, '')}`} className="flex items-center gap-2 text-slate-500 hover:text-[#8dc63f] transition-colors" data-testid={`link-phone-${cardId}`}>
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">{incentive.phone}</span>
          </a>
          <a 
            href={incentive.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm"
            data-testid={`button-learn-${cardId}`}
          >
            {incentive.linkText || 'Learn More'}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProvincialIncentivesPage() {
  const [activeProvince, setActiveProvince] = useState("British Columbia");

  const filteredIncentives = defaultIncentives[activeProvince] || [];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Provincial Energy Rebates & Incentives | Greenfoot</title>
        <meta name="description" content="Navigate provincial energy rebates with ease. Discover CleanBC, Efficiency NS, Save Energy NB & more. Maximize savings on heat pumps & energy upgrades." />
        <meta name="keywords" content="provincial rebates, energy incentives, heat pump rebates, CleanBC, Efficiency Nova Scotia, Save Energy NB, Efficiency PEI, Take Charge NL" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/provincial-incentives" />
        
        <meta property="og:title" content="Provincial Energy Rebates & Incentives | Greenfoot Energy" />
        <meta property="og:description" content="Let Greenfoot guide you through provincial energy incentive programs. Save thousands on heat pumps and energy upgrades." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/provincial-incentives" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Provincial Energy Rebates | Greenfoot Energy" />
        <meta name="twitter:description" content="Navigate provincial energy rebates. Save thousands on heat pumps & energy upgrades." />
      </Helmet>
      
      <ServiceSchema
        serviceName="Provincial Energy Rebates & Incentive Programs"
        serviceDescription="Expert guidance through provincial energy efficiency incentive programs across British Columbia, Nova Scotia, New Brunswick, Prince Edward Island, and Newfoundland. We help you navigate rebates and maximize savings."
        serviceType="Energy Efficiency Consulting"
        serviceUrl="https://www.greenfootenergy.ca/provincial-incentives"
        priceRange="$$"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 1250 }}
      />
      
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Provincial Incentives", url: "https://www.greenfootenergy.ca/provincial-incentives" },
        ]}
      />
      
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="bg-[#333333] pt-32 pb-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 uppercase tracking-tight leading-tight" data-testid="text-hero-title">
              Provincial Energy Rebates & Incentive Programs{" "}
              <span className="text-[#8dc63f]">Made Easy</span>
            </h1>
            <p className="text-lg text-white/70 mb-8">
              We also may have Greenfoot Exclusive Promotions and can help you stack current incentives for maximum savings. Let us guide you through a simple process to unlock every deal!
            </p>
            <a 
              href="https://scheduling.greenfootenergy.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold px-8 h-12 sm:h-14 rounded-xl transition-colors"
              data-testid="button-free-quote"
            >
              FREE QUOTE
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#8dc63f]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/>
                </svg>
              </div>
              <h3 className="font-bold text-[#333333] mb-2">Unmatched Expertise</h3>
              <p className="text-slate-600 text-sm">With our team of seasoned home comfort advisors.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#8dc63f]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="font-bold text-[#333333] mb-2">Satisfaction Guaranteed</h3>
              <p className="text-slate-600 text-sm">When you experience our customer-oriented service.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#8dc63f]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5a2.5 2.5 0 005 0V9c0-.69-.28-1.32-.73-1.77zM18 10c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                </svg>
              </div>
              <h3 className="font-bold text-[#333333] mb-2">Certified Technicians</h3>
              <p className="text-slate-600 text-sm">Every install is performed by certified technicians.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Let Greenfoot Guide You */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-4" data-testid="text-guide-title">
              Let Greenfoot <span className="text-[#8dc63f]">Guide You</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Navigating energy efficiency incentive programs can be complex and confusing. Greenfoot's expert Home Comfort Advisors will guide you on which programs you may be eligible for and how to apply.
            </p>
          </div>

          <Tabs defaultValue="British Columbia" className="w-full" onValueChange={setActiveProvince}>
            <div className="overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-hide">
              <TabsList className="bg-transparent h-auto gap-2 inline-flex whitespace-nowrap p-0 justify-center w-full">
                {provinces.map(province => (
                  <TabsTrigger 
                    key={province} 
                    value={province}
                    className="px-6 py-3 rounded-xl font-bold data-[state=active]:bg-[#8dc63f] data-[state=active]:text-white text-slate-600 hover:text-[#8dc63f] transition-all bg-white shadow-sm border border-slate-100"
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
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-incentives">
                    {filteredIncentives.map((incentive, i) => (
                      <IncentiveCard key={incentive.id} incentive={incentive} index={i} />
                    ))}
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
              Our team will help you explore all available incentive programs and find the best solution for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold px-8 h-12 sm:h-14 rounded-xl transition-colors"
                data-testid="button-cta-booking"
              >
                Book Your Free Quote
              </a>
              <a 
                href="/specials-promotions"
                className="inline-flex items-center justify-center gap-2 bg-[#333333] hover:bg-[#444444] text-white font-bold px-8 h-12 sm:h-14 rounded-xl transition-colors"
                data-testid="link-specials"
              >
                View Current Promotions
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

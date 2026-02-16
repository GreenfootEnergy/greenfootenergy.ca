import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { Hero } from "@/components/ui/hero";
import { TrustStrip } from "@/components/ui/trust-strip";
import { ServicesSection } from "@/components/ui/services-section";
import { SiteHeader } from "@/components/ui/site-header";
import { ChevronRight, Star, Phone, ChevronDown, MapPin, X, Tag, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/ui/site-footer";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

import logoImg from "@assets/greenfoot_green_on_black_1767807795674.png";
import gridlessUnit from "@assets/6928ec23fa0f88910888c58b_gridless_unit_1767978184527.webp";
import yetiServiceBg from "@assets/heat-pump-maintenance.webp";
import gridlessLogo from "@assets/gridless_by_hisense_1767986076307.png";
import gridlessProducts from "@assets/gridless-products.webp";
import gridlessCardBg from "@assets/gridless-card-background_1767986970961.png";
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
import bbbLogo from "@assets/bbb_1767990796523.png";
import prideInWorkImg from "@assets/pride-in-work_1767995824634.png";
import houseSchemeImg from "@assets/house_scheme_blue_and_green_1767996077238.png";
import quoteGreen from "@assets/Black-green-quote_1767996683816.png";
import quoteWhite from "@assets/Black-white-quote_1767996683817.png";
import serviceYetiLogo from "@assets/vertical-logo_(1)_1767997373264.png";
import experienceCardImg from "@assets/experience-card_1767998244511.png";
import satisfactionImg from "@assets/satisfaction.webp";
import dedicatedServiceImg from "@assets/dedicated-service-card_1767998424295.png";

const getBrands = (t: any): { name: string; desc: string; image?: string; href: string }[] => [
  { name: "Gridless", desc: t.home.brands.gridlessDesc, image: "gridless", href: "/brands/gridless-heat-pumps" },
  { name: "LG", desc: t.home.brands.lgDesc, image: "lg", href: "/brands/lg-heat-pumps" },
  { name: "Daikin", desc: t.home.brands.daikinDesc, image: "daikin", href: "/brands/daikin-heat-pumps" },
  { name: "GE", desc: t.home.brands.geDesc, image: "ge", href: "/brands/general-electric-heat-pumps" },
  { name: "Kerr", desc: t.home.brands.kerrDesc, image: "kerr", href: "/brands/kerr-heat-pumps" },
  { name: "Mitsubishi", desc: t.home.brands.mitsubishiDesc, image: "mitsubishi", href: "/brands/mitsubishi-electric-heat-pumps" }
];

const brandImages: Record<string, string> = {
  gridless: gridlessLogo,
  lg: lgLogo,
  daikin: daikinLogo,
  kerr: kerrLogo,
  ge: geLogo,
  mitsubishi: mitsubishiLogo,
};

const brandProductImages: Record<string, string> = {
  gridless: gridlessProducts,
  lg: lgProducts,
  ge: geProducts,
  daikin: daikinProducts,
  kerr: kerrProducts,
  mitsubishi: mitsubishiProducts,
};

const brandCardBgs: Record<string, string> = {
  gridless: gridlessCardBg,
  lg: lgCardBg,
  ge: geCardBg,
  daikin: daikinCardBg,
  kerr: kerrCardBg,
  mitsubishi: mitsubishiCardBg,
};

const brandFooterLogos: Record<string, string> = {
  kerr: kerrLogoLight,
};

const getWhyChoose = (t: any) => [
  { title: t.home.whyChoose.prideTitle, desc: t.home.whyChoose.prideDesc },
  { title: t.home.whyChoose.experienceTitle, desc: t.home.whyChoose.experienceDesc },
  { title: t.home.whyChoose.satisfactionTitle, desc: t.home.whyChoose.satisfactionDesc },
  { title: t.home.whyChoose.dedicatedTitle, desc: t.home.whyChoose.dedicatedDesc }
];

const provinceLocations: Record<string, { name: string; address: string; phone: string }[]> = {
  "Nova Scotia": [
    { name: "Kentville", address: "1592 Harrington Rd, B4N 3V7", phone: "(902) 608-5726" },
    { name: "Dartmouth", address: "133 Ilsley Avenue, Unit H, B3B 1S9", phone: "(902) 706-0917" },
    { name: "New Glasgow", address: "831 Granton Abercrombie Rd, B2H 5C6", phone: "(902) 706-0917" },
    { name: "Bridgewater", address: "353 York St, B4V 3K1", phone: "(902) 706-0917" },
    { name: "Sydney", address: "12-104 Marine Dr, B2A 4S6", phone: "(902) 706-0917" },
  ],
  "New Brunswick": [
    { name: "Fredericton", address: "21 Fairway Drive Unit D, E3C 0M2", phone: "(506) 260-0324" },
    { name: "Saint John", address: "15 Consumer Drive, E2J 5B2", phone: "(506) 645-1455" },
    { name: "Tracadie-Sheila", address: "4104 rue Principale, E1X 1B8", phone: "(506) 399-0754" },
    { name: "Moncton", address: "25 Gridless Lane, E1A 9Z3", phone: "(506) 383-3446" },
  ],
  "Prince Edward Island": [
    { name: "Charlottetown", address: "2 Aviation Avenue, C1E 2M1", phone: "(902) 201-8469" },
  ],
  "Newfoundland": [
    { name: "Paradise", address: "1218 Kenmount Rd, A1L 1N3", phone: "(709) 725-6682" },
  ],
  "British Columbia": [
    { name: "Abbotsford", address: "100-3311 Mount Lehman Rd, V4X 2M9", phone: "(778) 666-3500" },
    { name: "Kamloops", address: "2405 Trans-Canada Highway E, V2C 4A9", phone: "(778) 504-7059" },
    { name: "Kelowna", address: "110-1445 Stevens Rd, V1Z 1G2", phone: "(778) 721-5868" },
    { name: "Langley", address: "107-3475 194 Street, V3S 0L5", phone: "(778) 907-1314" },
    { name: "Victoria", address: "115-2360 Millstream Rd, V9B 3R3", phone: "(778) 402-6779" },
  ],
};

function Footer({ logoImg }: { logoImg: string }) {
  const [expandedProvince, setExpandedProvince] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', city: '', province: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <footer className="bg-[#2a2a2a] text-slate-400 py-16 text-sm">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-10">
          <div>
            <h4 className="text-[#8dc63f] font-black text-base italic mb-5">Services</h4>
            <ul className="space-y-2.5">
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">Heat Pumps</li>
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">Services & Maintenance</li>
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">Solar Energy Systems</li>
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">Sprayfoam Insulation</li>
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">Water Heaters</li>
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">Insulation</li>
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">Ventilation</li>
            </ul>
            
            <h4 className="text-[#8dc63f] font-black text-base italic mt-8 mb-5">Resources</h4>
            <ul className="space-y-2.5">
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">Contact us</li>
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">Terms of use</li>
            </ul>
          </div>
          
          <div>
            <div className="flex items-center gap-2 text-[#8dc63f] font-bold mb-3">
              <MapPin className="w-4 h-4" />
              <span>Serving</span>
            </div>
            <p className="text-white mb-5">Atlantic Canada & BC</p>
            
            <p className="text-white font-bold mb-3">See Provinces</p>
            <ul className="space-y-1">
              {Object.keys(provinceLocations).map((province) => (
                <li key={province}>
                  <button
                    onClick={() => setExpandedProvince(expandedProvince === province ? null : province)}
                    className="flex items-center justify-between w-full py-1.5 text-left text-[#8dc63f] hover:text-white transition-colors cursor-pointer uppercase text-xs tracking-wide font-semibold"
                  >
                    <span>{province}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedProvince === province ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedProvince === province && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="py-2 space-y-3 bg-[#222] rounded-lg px-3 my-2">
                          {provinceLocations[province].map((location, idx) => (
                            <div key={idx} className="border-l-2 border-[#8dc63f] pl-3">
                              <p className="text-[#8dc63f] font-bold text-xs">{location.name}</p>
                              <p className="text-white/60 text-[10px] leading-tight mt-0.5">{location.address}</p>
                              <p className="text-white/40 text-[10px] mt-0.5">{location.phone}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[#8dc63f] font-black text-base italic mb-5">Contact Us</h4>
            <form onSubmit={handleContactSubmit} className="grid sm:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="bg-[#222] border-0 rounded-lg p-3 text-white focus:ring-1 focus:ring-[#8dc63f] outline-none"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-[#222] border-0 rounded-lg p-3 text-white focus:ring-1 focus:ring-[#8dc63f] outline-none"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
              />
              <input 
                type="tel" 
                placeholder="Phone" 
                className="bg-[#222] border-0 rounded-lg p-3 text-white focus:ring-1 focus:ring-[#8dc63f] outline-none"
                required
                value={contactForm.phone}
                onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="City" 
                className="bg-[#222] border-0 rounded-lg p-3 text-white focus:ring-1 focus:ring-[#8dc63f] outline-none"
                required
                value={contactForm.city}
                onChange={(e) => setContactForm({...contactForm, city: e.target.value})}
              />
              <select 
                className="bg-[#222] border-0 rounded-lg p-3 text-white focus:ring-1 focus:ring-[#8dc63f] outline-none sm:col-span-2"
                required
                value={contactForm.province}
                onChange={(e) => setContactForm({...contactForm, province: e.target.value})}
              >
                <option value="">Select Province</option>
                <option value="NS">Nova Scotia</option>
                <option value="NB">New Brunswick</option>
                <option value="PEI">PEI</option>
                <option value="NL">Newfoundland</option>
                <option value="BC">British Columbia</option>
              </select>
              <textarea 
                placeholder="How can we help?" 
                className="bg-[#222] border-0 rounded-lg p-3 text-white focus:ring-1 focus:ring-[#8dc63f] outline-none sm:col-span-2 h-24 resize-none"
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
              ></textarea>
              <div className="sm:col-span-2 flex items-center justify-between">
                <Button type="submit" className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-[#2c4014] font-black px-10 rounded-xl h-12 sm:h-14 transition-all">
                  {formSubmitted ? 'Message Sent!' : 'Send Message'}
                </Button>
                <div className="flex gap-4">
                  <a href="#" className="text-white/40 hover:text-[#8dc63f] transition-colors">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#" className="text-white/40 hover:text-[#8dc63f] transition-colors">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={logoImg} alt="Greenfoot Energy Solutions" className="h-12 w-auto brightness-0 invert opacity-50" />
          <p className="text-white/20 text-[10px] uppercase tracking-[0.2em]">
            © 2026 Greenfoot Energy Solutions Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const { t } = useLanguage();
  const brands = getBrands(t);
  const whyChoose = getWhyChoose(t);
  
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Greenfoot Energy Solutions",
    "description": "Professional heat pump installation, solar energy systems, spray foam insulation, and HVAC services across Atlantic Canada and British Columbia.",
    "url": "https://www.greenfootenergy.ca",
    "telephone": "+1-800-380-9384",
    "logo": "https://www.greenfootenergy.ca/logo.png",
    "image": "https://www.greenfootenergy.ca/opengraph.jpg",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CA"
    },
    "areaServed": [
      { "@type": "Province", "name": "Nova Scotia" },
      { "@type": "Province", "name": "New Brunswick" },
      { "@type": "Province", "name": "Prince Edward Island" },
      { "@type": "Province", "name": "Newfoundland and Labrador" },
      { "@type": "Province", "name": "British Columbia" }
    ],
    "serviceType": ["Heat Pump Installation", "Solar Energy Systems", "Spray Foam Insulation", "HVAC Services", "Water Heater Installation", "Ventilation Systems"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "5000"
    },
    "sameAs": [
      "https://www.facebook.com/greenfootenergy",
      "https://twitter.com/greenfootenergy"
    ]
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Greenfoot Energy Solutions | Heat Pumps, Solar & Insulation</title>
        <meta name="description" content="Expert heat pump installation, solar energy, spray foam insulation & HVAC services in Nova Scotia, New Brunswick, PEI, Newfoundland & BC. 5000+ 5-star reviews." />
        <meta name="keywords" content="heat pumps, solar panels, spray foam insulation, HVAC, energy efficiency, Atlantic Canada, British Columbia, home comfort, renewable energy" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/" />
        <meta property="og:title" content="Greenfoot Energy Solutions | Heat Pumps, Solar & Insulation" />
        <meta property="og:description" content="Expert heat pump installation, solar energy, spray foam insulation & HVAC services in Nova Scotia, New Brunswick, PEI, Newfoundland & BC. 5000+ 5-star reviews." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/" />
        <meta property="og:site_name" content="Greenfoot Energy Solutions" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Greenfoot Energy Solutions | Heat Pumps, Solar & Insulation" />
        <meta name="twitter:description" content="Expert heat pump installation, solar energy, spray foam insulation & HVAC services in Nova Scotia, New Brunswick, PEI, Newfoundland & BC. 5000+ 5-star reviews." />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      <SiteHeader />
      <Hero />
      <TrustStrip />
      
      <section className="sr-only">
        <h1>Greenfoot Energy Solutions - HVAC & Solar Specialists</h1>
        <p>Expert heat pump installation, solar energy systems, and home insulation services across Nova Scotia, New Brunswick, PEI, Newfoundland, and British Columbia.</p>
      </section>

      <ServicesSection />

      {/* Brands Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#333333]">
              {t.home.brandsTitle.split("GREENFOOT")[0]}<span className="text-[#8dc63f]">GREENFOOT</span>{t.home.brandsTitle.split("GREENFOOT")[1] || ""}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand, i) => (
              <motion.a
                key={i}
                href={brand.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-gradient-to-b from-slate-100 to-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-shadow group cursor-pointer overflow-hidden will-change-transform block"
                data-testid={`card-brand-${brand.image}`}
              >
                {brand.image && brandProductImages[brand.image] ? (
                  <div className="relative h-full flex flex-col">
                    <div className="absolute inset-0">
                      <img src={brandCardBgs[brand.image]} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="relative z-10 p-6 pb-0">
                      <img src={brandImages[brand.image]} alt={brand.name} className="h-12 object-contain" loading="lazy" />
                    </div>
                    <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-4">
                      <img src={brandProductImages[brand.image]} alt={`${brand.name} Products`} className="max-h-40 object-contain" loading="lazy" />
                    </div>
                    <div className="relative z-10 bg-[#333333] p-4 flex items-center justify-between">
                      <img 
                        src={brandFooterLogos[brand.image] || brandImages[brand.image]} 
                        alt={brand.name} 
                        className={`${brand.image === 'daikin' ? 'h-4' : 'h-5'} object-contain ${brandFooterLogos[brand.image] ? '' : 'brightness-0 invert'}`}
                        loading="lazy"
                      />
                      <span className="text-[#8dc63f] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        {t.common.learnMore} <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-4">
                      <img src={brandImages[brand.image!]} alt={brand.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                    </div>
                    <p className="text-sm text-slate-600 mb-4">{brand.desc}</p>
                    <span className="text-[#8dc63f] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t.common.learnMore} <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Greenfoot Section */}
      <section className="relative overflow-hidden">
        {/* Background with diagonal stripe */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-[55%] bg-white"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-[#333333]"></div>
          <div 
            className="absolute left-0 right-0 h-24 bg-[#8dc63f]" 
            style={{ 
              top: '45%',
              transform: 'skewY(-3deg)',
            }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#333333]">
              {t.home.whyChooseTitle} <span className="text-[#8dc63f]">{t.home.whyChooseGreenfoot}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow border border-slate-100 shadow-lg will-change-transform"
              >
                {i === 0 ? (
                  <div className="h-40 overflow-hidden">
                    <img src={prideInWorkImg} alt="Pride in our work" className="w-full h-full object-cover object-top" loading="lazy" />
                  </div>
                ) : i === 1 ? (
                  <div className="h-40 overflow-hidden">
                    <img src={experienceCardImg} alt="Experienced team" className="w-full h-full object-cover object-center" loading="lazy" />
                  </div>
                ) : i === 2 ? (
                  <div className="h-40 overflow-hidden">
                    <img src={satisfactionImg} alt="Complete satisfaction" className="w-full h-full object-cover object-top" loading="lazy" />
                  </div>
                ) : (
                  <div className="h-40 overflow-hidden">
                    <img src={dedicatedServiceImg} alt="Dedicated service" className="w-full h-full object-cover object-center" loading="lazy" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-[#333333] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="py-16 bg-[#333333]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center"
            >
              <p className="text-white/80 uppercase tracking-wider text-sm font-medium mb-2">{t.home.trustStats.over}</p>
              <p className="text-5xl md:text-6xl font-black text-[#8dc63f]">5,000<sup className="text-2xl">+</sup></p>
              <p className="text-white font-bold uppercase tracking-wide mt-2">{t.home.trustStats.reviews}</p>
              <div className="flex items-center justify-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#8dc63f] text-[#8dc63f]" />
                ))}
              </div>
              <div className="inline-flex items-center gap-2 mt-4">
                <img src={bbbLogo} alt="BBB A+ Rated" className="h-8" loading="lazy" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center"
            >
              <p className="text-5xl md:text-6xl font-black text-[#8dc63f]">25,000<sup className="text-2xl">+</sup></p>
              <p className="text-white/80 uppercase tracking-wider text-sm font-medium mt-2">{t.home.trustStats.insulatedHomes}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center"
            >
              <p className="text-5xl md:text-6xl font-black text-[#8dc63f]">75,000<sup className="text-2xl">+</sup></p>
              <p className="text-white/80 uppercase tracking-wider text-sm font-medium mt-2">{t.home.trustStats.hvacSystems}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Yeti Membership Section */}
      <section className="py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={yetiServiceBg} alt="Service Yeti" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[#333333]/85"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-lg font-bold text-[#8dc63f] mb-2">{t.home.yetiMembership.joinOur}</h3>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                {t.home.yetiMembership.title}<br />{t.home.yetiMembership.servicePlan}
              </h2>
              <div className="bg-white/10 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-lg mb-2">{t.home.yetiMembership.comparisonTitle}</h4>
                <p className="text-white/70 text-sm">
                  {t.home.yetiMembership.comparisonDesc}
                </p>
              </div>
              <Button 
                className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold px-8 rounded-xl h-12 sm:h-14"
                onClick={() => window.open('https://maintenance.serviceyeti.com/maintenance-packages', '_blank')}
              >
                {t.common.signUpNow}
              </Button>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center justify-center">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-[#8dc63f]/20 rounded-full blur-xl"></div>
                  <div className="absolute -inset-3 border-4 border-[#8dc63f]/30 rounded-full"></div>
                  <div className="relative w-72 h-72 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-[#8dc63f] group-hover:scale-105 transition-transform duration-300">
                    <img src={serviceYetiLogo} alt="Service Yeti" className="w-52" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Invest In Your Home Section */}
      <section className="py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <img 
                src={houseSchemeImg} 
                alt="Greenfoot whole-home energy solutions" 
                className="w-full max-w-lg"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                {t.home.investInHome.title}
              </h2>
              <p className="text-white/80 mb-6">
                {t.home.investInHome.desc1}
              </p>
              <p className="text-white/80 mb-8">
                {t.home.investInHome.desc2Part1} <span className="text-white font-bold">{t.home.investInHome.holisticApproach}</span> {t.home.investInHome.desc2Part2} <span className="text-white font-bold">{t.home.investInHome.unbiasedAdvice}</span> {t.home.investInHome.desc2Part3}
              </p>
              <div className="bg-[#8dc63f] text-white p-6 rounded-xl inline-block">
                <p className="text-lg font-black uppercase tracking-wide">{t.home.investInHome.greenfootApproach}</p>
                <p className="text-sm text-white/90 mt-1">{t.home.investInHome.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="pt-16 pb-0 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#333333] font-black uppercase tracking-widest text-sm mb-1">{t.home.reviewsSection.whatPeopleAre}</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#333333] uppercase tracking-tight">
              {t.home.reviewsSection.sayingAbout}
            </h2>
            <h2 className="text-4xl md:text-6xl font-black text-[#8dc63f] uppercase -mt-1">
              {t.home.reviewsSection.greenfoot}
            </h2>
            <p className="text-slate-600 mt-4">{t.home.reviewsSection.subtitle}</p>
          </div>
        </div>
        
        <div className="bg-[#333333] py-12 overflow-hidden">
          <div className="flex hover:[animation-play-state:paused] animate-scroll-horizontal" style={{ width: 'max-content' }}>
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className="flex gap-6 px-3">
                {[
                  { headline: "FIXED A LONG STANDING ISSUE I HAD FROM POOR INSTALLATION BY ANOTHER COMPANY!", text: "The two technicians Tanner and Halim were excellent, did a great job, very tidy, and identified 2 problems with my heat pump head, and fixed a long standing issue I had from poor installation by another company! Thank you very much, looking forward to using Greenfoot again.", author: "Frederick TOFFLEMIRE" },
                  { headline: "I ONLY WISH THEY INSTALLED OUR HEAT PUMP ORIGINALLY", text: "Great company to deal with. We hired them to move an existing heat pump after the original installer refused to help us. The estimator and the installer were both very polite, careful and thorough. I only wish they installed our heat pump originally. I would hire them again without hesitation.", author: "Ellen DOWNEY" },
                  { headline: "WHEN THEY LEFT THE HOUSE THERE WAS NO MESS TO CLEAN UP!", text: "The young chaps, Marlon Marcuflo and Sylvia Richard, were wonderful to deal with. They were extremely polite, very tidy and efficient in their work, were right on schedule and did an excellent job. When they left the house there was no mess to clean up. I would recommend Greenfoot Energy Solutions to anyone thinking of upgrading their home.", author: "Alice GRACIE" },
                  { headline: "THEIR ENTIRE TEAM IS EXTREMELY EXPERIENCED, KNOWLEDGEABLE, AND CONSIDERATE", text: "We hired Greenfoot to install 2 heat pumps. From the beginning to end - initial home visit to the final installation touches - they were wonderful to work with. Their entire team is extremely experienced, knowledgeable, and considerate; and were very accommodating.", author: "Michael BOYD" },
                  { headline: "OUR OLD HOUSE FEELS LIKE A BRAND NEW CONSTRUCTION", text: "The Greenfoot Team did amazing work in our home. Our old house (built in 1959) feels like a brand new construction thanks to the ductless heat pumps, spray foam insulation and HVAC installed by the friendliest staff! Everyone we spoke to from Greenfoot was helpful and just seemed genuinely happy in their job.", author: "Happy Homeowner" },
                ].map((review, idx) => (
                  <div key={idx} className="flex-shrink-0 w-80 bg-[#2a2a2a] rounded-xl p-6 pt-8 pb-8 relative">
                    <div className="absolute -top-5 left-3">
                      <img src={quoteGreen} alt="" className="w-12 h-12 rotate-180" loading="lazy" />
                    </div>
                    <div className="absolute -bottom-5 right-3">
                      <img src={quoteWhite} alt="" className="w-12 h-12" loading="lazy" />
                    </div>
                    <div className="mt-2">
                      <p className="text-[#8dc63f] font-black italic text-lg leading-tight mb-4">"{review.headline}"</p>
                      <p className="text-white/80 text-sm leading-relaxed mb-6">{review.text}</p>
                      <p className="text-white font-bold">{review.author} - <span className="text-[#8dc63f] italic">{t.home.reviewsSection.starReview}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#333333] relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
            {t.home.ctaSection.title} <span className="text-[#8dc63f]">{t.home.ctaSection.comfort}</span>
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            {t.home.ctaSection.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold text-lg h-12 sm:h-14 px-10 rounded-xl shadow-xl"
              onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
            >
              {t.home.ctaSection.bookConsultation}
            </Button>
            <a 
              href="tel:18003809384"
              className="border-2 border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f] hover:text-white font-bold text-lg h-12 sm:h-14 px-10 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {t.home.ctaSection.callUs}
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <SiteFooter />
    </div>
  );
}

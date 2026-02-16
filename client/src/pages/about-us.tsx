import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { Users, Target, Rocket, Milestone, ArrowRight, Play, ExternalLink, Mail, Phone, Clock } from "lucide-react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";

import alpineLogo from "@assets/alpine-logo-white_1769044963998.png";
import solarLogo from "@assets/solar-logo_1769044975116.png";
import gridlessLogo from "@assets/gridless-logo-gray_1769044963999.avif";
import ownersImg from "@assets/Joe-Chantelle-Owners_1769047735547.avif";
import headquartersImg from "@assets/New-headquaters_1769047735548.avif";
import fleetImg from "@assets/our_fleet_1769047735549.avif";
import teamImg from "@assets/our-team_1769047735549.webp";
import urbanYetiLogo from "@assets/Urban_Yetit_Logo_1769044963999.avif";
import yetiRobPointing from "@assets/yeti-Rob-pointing_1769045195517.avif";

function AnimatedCounter({ 
  value, 
  prefix = "", 
  suffix = "", 
  duration = 2,
  className = ""
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string; 
  duration?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);
  
  const formattedValue = displayValue.toLocaleString();
  
  return (
    <div ref={ref} className={className}>
      {prefix}{formattedValue}{suffix}
    </div>
  );
}

const previousMakeovers = [
  {
    year: "2021",
    title: "BARHO FAMILY HOME ENERGY MAKEOVER",
    duration: "3 Minutes 40 Seconds",
    thumbnail: "https://cdn.prod.website-files.com/68874c9990cff00613a8653e/68ac6a2cf09fbd196de00045_Home%20Makeover%202021.webp",
    videoUrl: "https://www.youtube.com/watch?v=TiSYtdob1S8"
  },
  {
    year: "2023",
    title: "HORRIBLE INSTALL RESCUE",
    duration: "5 Minutes",
    thumbnail: "https://cdn.prod.website-files.com/68874c9990cff00613a8653e/689105ddf3b0085d006d3cb8_home-energy-makeover%20(1).avif",
    videoUrl: "https://www.youtube.com/watch?v=TiSYtdob1S8"
  },
  {
    year: "2024",
    title: "GIVING BACK TO OUR BEAUTIFUL NEW FRIEND GAIL",
    duration: "3 Minutes",
    thumbnail: "https://cdn.prod.website-files.com/68874c9990cff00613a8653e/689105ddf3b0085d006d3cb8_home-energy-makeover%20(1).avif",
    videoUrl: "https://www.youtube.com/watch?v=TiSYtdob1S8"
  },
  {
    year: "2025",
    title: "LAURA AND HER FAMILY",
    duration: "2.5 Hours",
    thumbnail: "https://cdn.prod.website-files.com/68874c9990cff00613a8653e/68ac6a2cf09fbd196de00045_Home%20Makeover%202021.webp",
    videoUrl: "https://www.youtube.com/watch?v=TiSYtdob1S8"
  }
];

export default function AboutUs() {
  const { t, language } = useLanguage();
  
  const milestones = [
    { year: "2015", title: t.aboutUs.milestones.items.born.title, description: t.aboutUs.milestones.items.born.description },
    { year: "2018", title: t.aboutUs.milestones.items.pei.title, description: t.aboutUs.milestones.items.pei.description },
    { year: "2019", title: t.aboutUs.milestones.items.ns.title, description: t.aboutUs.milestones.items.ns.description },
    { year: "2021", title: t.aboutUs.milestones.items.nfld.title, description: t.aboutUs.milestones.items.nfld.description },
    { year: "2023", title: t.aboutUs.milestones.items.gridless.title, description: t.aboutUs.milestones.items.gridless.description, logo: [gridlessLogo, urbanYetiLogo] },
    { year: "2025", title: t.aboutUs.milestones.items.national.title, description: t.aboutUs.milestones.items.national.description, logo: [solarLogo, alpineLogo] },
    { year: "2025", title: t.aboutUs.milestones.items.milestone.title, description: t.aboutUs.milestones.items.milestone.description, highlight: true }
  ];

  const mobileImages = [
    { img: ownersImg, label: t.aboutUs.imageLabels.ourOwners },
    { img: headquartersImg, label: t.aboutUs.imageLabels.newHQ },
    { img: fleetImg, label: t.aboutUs.imageLabels.ourFleet },
    { img: teamImg, label: t.aboutUs.imageLabels.ourTeam },
    { img: ownersImg, label: t.aboutUs.imageLabels.ourOwners },
    { img: headquartersImg, label: t.aboutUs.imageLabels.newHQ },
    { img: fleetImg, label: t.aboutUs.imageLabels.ourFleet },
    { img: teamImg, label: t.aboutUs.imageLabels.ourTeam },
  ];

  const desktopImages = [
    { img: ownersImg, label: t.aboutUs.imageLabels.ourOwners },
    { img: headquartersImg, label: t.aboutUs.imageLabels.newHeadquarters },
    { img: fleetImg, label: t.aboutUs.imageLabels.ourFleet },
    { img: teamImg, label: t.aboutUs.imageLabels.ourTeam },
    { img: ownersImg, label: t.aboutUs.imageLabels.ourOwners },
    { img: headquartersImg, label: t.aboutUs.imageLabels.newHeadquarters },
    { img: fleetImg, label: t.aboutUs.imageLabels.ourFleet },
    { img: teamImg, label: t.aboutUs.imageLabels.ourTeam },
  ];

  const canonicalUrl = language === "fr" 
    ? "https://www.greenfootenergy.ca/fr-ca/a-propos-de-nous"
    : "https://www.greenfootenergy.ca/about-us";

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>{t.aboutUs.meta.title}</title>
        <meta name="description" content={t.aboutUs.meta.description} />
        <meta name="keywords" content="Greenfoot Energy Solutions, about us, Canadian HVAC company, energy efficiency, home comfort, sustainable energy, Atlantic Canada, BC HVAC" />
        <link rel="canonical" href={canonicalUrl} />
        
        <meta property="og:title" content={t.aboutUs.meta.title} />
        <meta property="og:description" content={t.aboutUs.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.aboutUs.meta.title} />
        <meta name="twitter:description" content={t.aboutUs.meta.description} />
      </Helmet>
      
      <SiteHeader />

      {/* Hero Section with Autoscroll Images */}
      <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-24 bg-[#333333] text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Mobile: Horizontal scrolling images above heading */}
          <div className="lg:hidden mb-8 -mx-4 overflow-hidden">
            <motion.div
              className="flex gap-3 px-4"
              animate={{ x: [0, -600] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 15,
                  ease: "linear",
                },
              }}
            >
              {mobileImages.map((item, index) => (
                <div key={index} className="relative rounded-xl overflow-hidden shadow-xl shrink-0 w-[200px]">
                  <img 
                    src={item.img} 
                    alt={item.label}
                    className="w-full h-[140px] object-cover object-[center_15%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <span className="text-white text-xs font-semibold tracking-wide uppercase">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 lg:mb-6 uppercase tracking-tight leading-tight"
              >
                {t.aboutUs.hero.title1} <span className="text-[#8dc63f]">{t.aboutUs.hero.title2}</span>
              </motion.h1>
              
              {/* Mobile: Condensed text */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:hidden space-y-3 text-sm text-slate-300 leading-relaxed"
              >
                <p>
                  {t.aboutUs.hero.mobileText1}
                </p>
                <p className="text-[#8dc63f] font-semibold">
                  {t.aboutUs.hero.mobileText2}
                </p>
              </motion.div>

              {/* Desktop: Full text */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="hidden lg:block space-y-4 text-lg text-slate-300 leading-relaxed"
              >
                <p>
                  {t.aboutUs.hero.desktopText1}
                </p>
                <p>
                  {t.aboutUs.hero.desktopText2}
                </p>
                <p>
                  {t.aboutUs.hero.desktopText3}
                </p>
                <p className="text-[#8dc63f] font-semibold">
                  {t.aboutUs.hero.desktopText4}
                </p>
              </motion.div>
            </div>
            
            {/* Desktop: Vertical Auto-scrolling Images */}
            <div className="hidden lg:block relative h-[500px] overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-[#333333] via-transparent to-[#333333] z-10 pointer-events-none" />
              <motion.div
                className="flex flex-col gap-4"
                animate={{ y: [0, -1040] }}
                transition={{
                  y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {desktopImages.map((item, index) => (
                  <div key={index} className="relative rounded-xl overflow-hidden shadow-xl shrink-0">
                    <img 
                      src={item.img} 
                      alt={item.label}
                      className="w-full h-[250px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-white text-sm font-semibold tracking-wide uppercase">
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/4 h-full bg-[#8dc63f]/10 skew-x-12 translate-x-1/2" />
      </section>

      {/* Video Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/rXLl4L-lvao"
                title="We’re turning 10! 🎉"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-8 text-center">
              <h2 className="text-3xl font-black text-[#333333] uppercase mb-4">{t.aboutUs.video.title}</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                {t.aboutUs.video.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-[#1a1a1a] text-white overflow-hidden relative">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#8dc63f]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8dc63f]/3 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-4 tracking-tight">
                {t.aboutUs.milestones.title} <span className="text-[#8dc63f]">{t.aboutUs.milestones.titleHighlight}</span>
              </h2>
              <p className="text-slate-400 text-lg">{t.aboutUs.milestones.subtitle}</p>
            </motion.div>
          </div>

          {/* Desktop Timeline - Horizontal with alternating cards */}
          <div className="hidden lg:block relative">
            {/* Main timeline line with gradient */}
            <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#8dc63f]/20 via-[#8dc63f] to-[#8dc63f]/20 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            
            <div className="flex justify-between items-center relative" style={{ minHeight: '400px' }}>
              {milestones.map((item, index) => {
                const isTop = index % 2 === 0;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: isTop ? -50 : 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className={`relative flex flex-col items-center ${isTop ? 'self-start pt-0' : 'self-end pb-0'}`}
                    style={{ width: `${100 / milestones.length}%` }}
                  >
                    {/* Connecting line to timeline */}
                    <motion.div 
                      className={`absolute left-1/2 w-0.5 bg-gradient-to-b ${isTop ? 'from-[#8dc63f] to-transparent bottom-0 h-12' : 'from-transparent to-[#8dc63f] top-0 h-12'}`}
                      style={{ transform: 'translateX(-50%)', [isTop ? 'bottom' : 'top']: '-48px' }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                      viewport={{ once: true }}
                    />
                    
                    {/* Timeline node */}
                    <motion.div 
                      className={`absolute left-1/2 -translate-x-1/2 ${isTop ? '-bottom-16' : '-top-16'}`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="relative group cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-[#8dc63f] flex items-center justify-center shadow-lg shadow-[#8dc63f]/30 group-hover:scale-125 transition-transform duration-300">
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        </div>
                        <div className="absolute inset-0 rounded-full bg-[#8dc63f] animate-ping opacity-20"></div>
                      </div>
                    </motion.div>
                    
                    {/* Card */}
                    <motion.div 
                      className={`w-full max-w-[180px] group cursor-pointer ${isTop ? 'mb-20' : 'mt-20'}`}
                      whileHover={{ scale: 1.05, y: isTop ? -5 : 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className={`p-5 rounded-2xl border transition-all duration-500 ${item.highlight ? 'border-[#8dc63f] bg-[#8dc63f]/10 shadow-lg shadow-[#8dc63f]/20' : 'border-white/10 bg-white/5 hover:border-[#8dc63f]/50 hover:bg-white/10'}`}>
                        <div className="text-center">
                          <span className="text-[#8dc63f] font-black text-3xl block mb-2">{item.year}</span>
                          <h3 className="font-bold text-sm mb-2 group-hover:text-[#8dc63f] transition-colors leading-tight">{item.title}</h3>
                          
                          {item.logo && (
                            <div className="flex flex-wrap gap-2 mt-3 justify-center">
                              {item.logo.map((l, i) => (
                                <img key={i} src={l} alt="Logo" className="h-6 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                              ))}
                            </div>
                          )}

                          {item.highlight && (
                            <div className="mt-3 inline-flex items-center gap-1 text-[#8dc63f] font-bold text-xs">
                              <Milestone className="w-3 h-3" />
                              HQ Opens!
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet Timeline - Vertical */}
          <div className="lg:hidden relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8dc63f] via-[#8dc63f]/50 to-[#8dc63f] rounded-full"></div>
            
            <div className="space-y-8 pl-20">
              {milestones.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline node */}
                  <div className="absolute -left-[52px] top-6">
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full bg-[#8dc63f] flex items-center justify-center shadow-lg shadow-[#8dc63f]/30">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <div className="absolute inset-0 rounded-full bg-[#8dc63f] animate-ping opacity-20"></div>
                    </div>
                  </div>
                  
                  {/* Card */}
                  <div className={`p-6 rounded-2xl border transition-all duration-300 ${item.highlight ? 'border-[#8dc63f] bg-[#8dc63f]/10' : 'border-white/10 bg-white/5'}`}>
                    <span className="text-[#8dc63f] font-black text-2xl mb-2 block">{item.year}</span>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                    
                    {item.logo && (
                      <div className="flex flex-wrap gap-3 mt-4 items-center">
                        {item.logo.map((l, i) => (
                          <img key={i} src={l} alt="Logo" className="h-7 object-contain opacity-70" />
                        ))}
                      </div>
                    )}

                    {item.highlight && (
                      <div className="mt-4 inline-flex items-center gap-2 text-[#8dc63f] font-bold text-sm">
                        <Milestone className="w-4 h-4" />
                        Greenfoot HQ Opens!
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <AnimatedCounter 
                value={5000} 
                suffix="+" 
                className="text-4xl md:text-5xl font-black text-[#333333] mb-2"
              />
              <div className="text-slate-500 uppercase font-bold text-sm tracking-widest">{t.aboutUs.stats.googleReviews}</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <AnimatedCounter 
                value={98} 
                suffix="%" 
                className="text-4xl md:text-5xl font-black text-[#8dc63f] mb-2"
              />
              <div className="text-slate-500 uppercase font-bold text-sm tracking-widest">{t.aboutUs.stats.satisfiedCustomers}</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <AnimatedCounter 
                value={75000} 
                suffix="+" 
                className="text-4xl md:text-5xl font-black text-[#333333] mb-2"
              />
              <div className="text-slate-500 uppercase font-bold text-sm tracking-widest">{t.aboutUs.stats.hvacInstalls}</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <AnimatedCounter 
                value={1} 
                prefix="$" 
                suffix="M+" 
                className="text-4xl md:text-5xl font-black text-[#8dc63f] mb-2"
              />
              <div className="text-slate-500 uppercase font-bold text-sm tracking-widest">{t.aboutUs.stats.donatedBack}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team/Mission Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-6 h-6 text-[#8dc63f]" />
                <span className="uppercase font-bold tracking-[0.2em] text-[#8dc63f]">{t.aboutUs.vision.label}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#333333] uppercase leading-tight mb-8">
                {t.aboutUs.vision.title} <span className="text-[#8dc63f]">{t.aboutUs.vision.titleHighlight}</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  We recognized that most contractors provided only one or two services, often leading to a "one-size-fits-all" approach. Homeowners deserve unbiased advice that only a full-range provider can offer.
                </p>
                <p>
                  Today, Greenfoot employs over 1,000 team members across Canada and is poised for further expansion throughout North America, always maintaining our commitment to quality and transparency.
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#8dc63f]/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-[#8dc63f]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#333333]">{t.aboutUs.vision.employees}</h4>
                    <p className="text-sm text-slate-500">{t.aboutUs.vision.employeesDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1e5aa8]/10 flex items-center justify-center shrink-0">
                    <Rocket className="w-6 h-6 text-[#1e5aa8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#333333]">{t.aboutUs.vision.rapidGrowth}</h4>
                    <p className="text-sm text-slate-500">{t.aboutUs.vision.rapidGrowthDesc}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 border-2 border-[#8dc63f] rounded-3xl -rotate-2"></div>
              <img 
                src="https://cdn.prod.website-files.com/68874c9990cff00613a8653e/68874c9990cff00613a8670d_hero-home%20greenfoot.webp"
                alt="Greenfoot Team"
                className="relative z-10 w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet Greenfoot Section */}
      <section className="pt-24 pb-0 bg-[#333333] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="pb-16 lg:pb-24">
              <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 tracking-tight">
                <span className="text-[#8dc63f]">{t.aboutUs.meetGreenfoot.title1}</span> {t.aboutUs.meetGreenfoot.title2}
              </h2>
              <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                <p>
                  This friendly green Yeti is a symbol of our company’s commitment to green initiatives. Reducing our carbon footprint is vital in the fight against climate change and to ensure fresh clean air. The Greenfoot Yeti has little to no carbon footprint. He lives a sustainable lifestyle, eats local foods and recycles. You too can become just like Greenfoot!
                </p>
                <div className="pl-6 border-l-4 border-[#8dc63f]">
                  <p className="text-xl font-bold italic text-[#8dc63f]">
                    "Start small, think big and keep living the Greenfoot Lifestyle"
                  </p>
                </div>
                <p className="text-base text-slate-400">
                  Greenfoot & Rob represent our social media presence—be sure to check it out and discover all the amazing things Yeti is doing in the community! Whether it's supporting local events, donating to worthy causes, or simply spreading joy and smiles, the Greenfoot Yeti embodies the spirit of living the Greenfoot lifestyle.
                </p>
              </div>
              <div className="mt-8">
                <span className="uppercase font-bold tracking-[0.2em] text-sm text-slate-500">{t.aboutUs.meetGreenfoot.approach}</span>
              </div>
            </div>
            
            <div className="relative flex justify-center lg:justify-end items-end self-end">
              <div className="relative z-10">
                <img 
                  src={yetiRobPointing}
                  alt="Greenfoot Yeti and Rob"
                  className="max-w-full h-auto object-contain object-bottom"
                />
              </div>
              {/* Decorative background elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#8dc63f]/5 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Makeover Section */}
      <section id="makeover" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-[#333333] tracking-tight">
              {t.aboutUs.makeover.title} <span className="text-[#8dc63f]">{t.aboutUs.makeover.titleHighlight}</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/TiSYtdob1S8"
                title="Greenfoot Energy Makeover 2025"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-8 text-center">
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                At Greenfoot Energy, we are deeply committed to corporate social responsibility and believe in supporting the communities where we live. The Greenfoot Home Energy Makeover helps families in need by transforming their homes into more energy-efficient spaces—completely free of charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Makeovers Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-[#333333] tracking-tight">
              {t.aboutUs.makeover.previousTitle} <span className="text-[#8dc63f]">{t.aboutUs.makeover.previousTitleHighlight}</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {previousMakeovers.map((video, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => window.open(video.videoUrl, '_blank')}
              >
                <div className="relative aspect-square rounded-3xl overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Year Badge */}
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-[#8dc63f] text-[#333333] font-black px-4 py-1.5 rounded-full text-sm">
                      {video.year}
                    </div>
                  </div>
                </div>
                
                <div className="px-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5" />
                      {video.duration}
                    </div>
                    <div className="flex items-center gap-2 bg-[#8dc63f]/10 text-[#8dc63f] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider group-hover:bg-[#8dc63f] group-hover:text-white transition-colors">
                      Play <Play className="w-3 h-3 fill-current" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-black text-[#333333] leading-tight uppercase group-hover:text-[#8dc63f] transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
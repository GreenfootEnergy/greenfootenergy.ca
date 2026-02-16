import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { Shield, Wrench, Heart, Leaf, CheckCircle2, Zap, Award, Check } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n/LanguageContext";

import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import satisfactionBadge from "@assets/satisfaction.webp";
import dedicatedServiceImg from "@assets/dedicated-service-card_1767998424295.png";
import experienceCardImg from "@assets/experience-card_1767998244511.png";
import prideInWorkImg from "@assets/pride-in-work_1767995824634.png";
import quoteGreen from "@assets/Black-green-quote_1767996683816.png";
import quoteWhite from "@assets/Black-white-quote_1767996683817.png";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function WhyChooseUsPage() {
  const { t, language } = useLanguage();
  
  const stats = [
    { label: t.whyChooseUs.stats.installations, value: 75000, suffix: "+" },
    { label: t.whyChooseUs.stats.teamMembers, value: 1000, suffix: "+" },
    { label: t.whyChooseUs.stats.locations, value: 17, suffix: "+" },
    { label: t.whyChooseUs.stats.reviews, value: 5000, suffix: "+" },
  ];

  const visionPoints = [
    {
      title: t.whyChooseUs.vision.points.unbiased.title,
      description: t.whyChooseUs.vision.points.unbiased.desc,
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: t.whyChooseUs.vision.points.comprehensive.title,
      description: t.whyChooseUs.vision.points.comprehensive.desc,
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: t.whyChooseUs.vision.points.service.title,
      description: t.whyChooseUs.vision.points.service.desc,
      icon: <Award className="w-8 h-8" />,
    },
    {
      title: t.whyChooseUs.vision.points.green.title,
      description: t.whyChooseUs.vision.points.green.desc,
      icon: <Leaf className="w-8 h-8" />,
    },
  ];

  const whyChooseCards = [
    { 
      title: t.whyChooseUs.cards.pride.title, 
      desc: t.whyChooseUs.cards.pride.desc,
      image: prideInWorkImg
    },
    { 
      title: t.whyChooseUs.cards.experience.title, 
      desc: t.whyChooseUs.cards.experience.desc,
      image: experienceCardImg
    },
    { 
      title: t.whyChooseUs.cards.satisfaction.title, 
      desc: t.whyChooseUs.cards.satisfaction.desc,
      image: satisfactionBadge
    },
    { 
      title: t.whyChooseUs.cards.dedicated.title, 
      desc: t.whyChooseUs.cards.dedicated.desc,
      image: dedicatedServiceImg
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{t.whyChooseUs.meta.title}</title>
        <meta name="description" content={t.whyChooseUs.meta.description} />
        <link rel="canonical" href={`https://www.greenfootenergy.ca${String(language) === 'fr-ca' ? '/fr-ca/pourquoi-nous-choisir' : '/why-choose-us'}`} />
        <meta property="og:title" content={t.whyChooseUs.meta.title} />
        <meta property="og:description" content={t.whyChooseUs.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.greenfootenergy.ca${String(language) === 'fr-ca' ? '/fr-ca/pourquoi-nous-choisir' : '/why-choose-us'}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.whyChooseUs.meta.title} />
        <meta name="twitter:description" content={t.whyChooseUs.meta.description} />
      </Helmet>
      
      <BreadcrumbSchema
        items={[
          { name: t.nav.home, url: "https://www.greenfootenergy.ca" },
          { name: t.nav.aboutUs, url: "https://www.greenfootenergy.ca/about-us" },
          { name: t.nav.whyChooseUs, url: "https://www.greenfootenergy.ca/why-choose-us" },
        ]}
      />
      <SiteHeader />

      {/* Hero Section */}
      <section className="bg-[#333333] pt-24 pb-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 uppercase tracking-tight leading-tight">
                {t.whyChooseUs.hero.title1}{" "}
                <span className="text-[#8dc63f]">{t.whyChooseUs.hero.title2}</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {t.whyChooseUs.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://scheduling.greenfootenergy.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold h-12 sm:h-14 px-8 rounded-xl transition-all flex items-center justify-center"
                >
                  {t.whyChooseUs.hero.bookQuote}
                </a>
                <a href="/#services" className="bg-white/10 hover:bg-white/20 text-white font-bold h-12 sm:h-14 px-8 rounded-xl transition-all border border-white/20 flex items-center justify-center">
                  {t.whyChooseUs.hero.exploreServices}
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <img 
                src="https://cdn.prod.website-files.com/68874c9990cff00613a8653e/68874c9990cff00613a869d4_Kerr.avif" 
                alt="Greenfoot Energy Solutions service van" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/4 h-full bg-[#8dc63f]/10 skew-x-12 translate-x-1/2" />
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 justify-center"
            >
              <div className="w-16 h-16 bg-[#333333] rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
              <div>
                <h3 className="font-black text-[#333333]">{t.whyChooseUs.trustBadges.expertise.title}</h3>
                <p className="text-sm text-slate-600">{t.whyChooseUs.trustBadges.expertise.desc}</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 justify-center"
            >
              <img src={guaranteeIcon} alt="Satisfaction Guaranteed" className="h-16 w-16 object-contain" />
              <div>
                <h3 className="font-black text-[#333333]">{t.whyChooseUs.trustBadges.satisfaction.title}</h3>
                <p className="text-sm text-slate-600">{t.whyChooseUs.trustBadges.satisfaction.desc}</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 justify-center"
            >
              <img src={redSealIcon} alt="Red Seal Certified" className="h-16 w-16 object-contain" />
              <div>
                <h3 className="font-black text-[#333333]">{t.whyChooseUs.trustBadges.certified.title}</h3>
                <p className="text-sm text-slate-600">{t.whyChooseUs.trustBadges.certified.desc}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[#8dc63f]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-[#333333]"
              >
                <div className="text-3xl md:text-5xl font-black mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[#333333]/70 font-bold uppercase text-xs tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {t.whyChooseUs.mission}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 uppercase tracking-tight">
              {t.whyChooseUs.vision.title}{" "}
              <span className="text-[#8dc63f]">{t.whyChooseUs.vision.titleHighlight}</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              {t.whyChooseUs.vision.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#8dc63f]/50 transition-all group"
              >
                <div className="w-14 h-14 bg-[#8dc63f]/20 rounded-xl flex items-center justify-center text-[#8dc63f] mb-4 group-hover:bg-[#8dc63f] group-hover:text-white transition-all">
                  {point.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{point.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Satisfaction Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* High-Quality Services */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
            >
              <div className="inline-flex items-center gap-2 bg-[#8dc63f]/10 text-[#8dc63f] px-4 py-2 rounded-full font-bold text-sm mb-6">
                <Wrench className="w-4 h-4" />
                {t.whyChooseUs.quality.badge}
              </div>
              <h3 className="text-2xl font-black text-[#333333] mb-6">
                {t.whyChooseUs.quality.title}
              </h3>
              <ul className="space-y-4">
                {(t.whyChooseUs.quality.items as string[]).map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Customer Satisfaction */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
            >
              <div className="inline-flex items-center gap-2 bg-[#8dc63f]/10 text-[#8dc63f] px-4 py-2 rounded-full font-bold text-sm mb-6">
                <Heart className="w-4 h-4" />
                {t.whyChooseUs.guarantee.badge}
              </div>
              <h3 className="text-2xl font-black text-[#333333] mb-6">
                {t.whyChooseUs.guarantee.title}
              </h3>
              <ul className="space-y-4">
                {(t.whyChooseUs.guarantee.items as string[]).map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Greenfoot Cards */}
      <section className="relative overflow-hidden">
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
              {t.whyChooseUs.cards.title} <span className="text-[#8dc63f]">{t.whyChooseUs.cards.titleHighlight}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseCards.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all border border-slate-100 shadow-lg"
              >
                <div className="h-40 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-[#333333] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="pt-16 pb-0 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#333333] font-black uppercase tracking-widest text-sm mb-1">{t.whyChooseUs.reviews.whatPeople}</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#333333] uppercase tracking-tight">
              {t.whyChooseUs.reviews.sayingAbout}
            </h2>
            <h2 className="text-4xl md:text-6xl font-black text-[#8dc63f] uppercase -mt-1">
              {t.whyChooseUs.reviews.greenfoot}
            </h2>
            <p className="text-slate-600 mt-4">{t.whyChooseUs.reviews.subtitle}</p>
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
                      <img src={quoteGreen} alt="" className="w-12 h-12 rotate-180" />
                    </div>
                    <div className="absolute -bottom-5 right-3">
                      <img src={quoteWhite} alt="" className="w-12 h-12" />
                    </div>
                    <div className="mt-2">
                      <p className="text-[#8dc63f] font-black italic text-lg leading-tight mb-4">"{review.headline}"</p>
                      <p className="text-white/80 text-sm leading-relaxed mb-6">{review.text}</p>
                      <p className="text-white font-bold">{review.author} - <span className="text-[#8dc63f] italic">5 Star Review</span></p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-8 leading-tight uppercase">
              {t.whyChooseUs.cta.title} <span className="text-[#8dc63f]">{t.whyChooseUs.cta.titleHighlight}</span> Today!
            </h2>
            <p className="text-slate-600 text-xl mb-10">
              {t.whyChooseUs.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold px-10 py-5 rounded-xl transition-all shadow-lg text-lg"
              >
                {t.whyChooseUs.cta.getAssessment}
              </a>
              <a 
                href="/financing" target="_blank" rel="noopener noreferrer"
                className="bg-[#333333] hover:bg-[#444444] text-white font-bold px-10 py-5 rounded-xl transition-all shadow-lg text-lg"
              >
                {t.whyChooseUs.cta.exploreFinancing}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

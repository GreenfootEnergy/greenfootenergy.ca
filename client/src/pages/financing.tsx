import { motion } from "framer-motion";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { CheckCircle2, Wallet, CreditCard, ArrowRight, ShieldCheck, BadgeDollarSign } from "lucide-react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";
import financeitApprovedImg from "@assets/financeit-approved_1769050945310.webp";
import financeitManImg from "@assets/financeit_with_man_on_phone_1769050945312.webp";

export default function Financing() {
  const { t } = useLanguage();
  const financeitLink = "https://www.financeit.ca/en/direct/payment-plan/YT0yMzkyODEmbD0mcD1ieDJMcDdIQ19hZ0V6dEFfNkJRb1dRJnM9MCZ2PTE=/apply?slug=3S12FQ";

  const steps = [
    {
      step: "1",
      title: t.financing.step1Title,
      description: t.financing.step1Desc,
      icon: <Wallet className="w-8 h-8 text-[#8dc63f]" />
    },
    {
      step: "2",
      title: t.financing.step2Title,
      description: t.financing.step2Desc,
      icon: <CreditCard className="w-8 h-8 text-[#8dc63f]" />
    },
    {
      step: "3",
      title: t.financing.step3Title,
      description: t.financing.step3Desc,
      icon: <CheckCircle2 className="w-8 h-8 text-[#8dc63f]" />
    }
  ];

  const benefits = [
    t.financing.noUpfrontCosts,
    t.financing.flexiblePayments,
    t.financing.lowerBills,
    t.financing.increasedValue
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>{t.financing.metaTitle}</title>
        <meta name="description" content={t.financing.metaDescription} />
        <meta name="keywords" content="heat pump financing, HVAC loans, energy efficiency financing, Financeit, home improvement loans, flexible payment plans, no upfront costs" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/financing" />
        
        <meta property="og:title" content={t.financing.metaTitle} />
        <meta property="og:description" content={t.financing.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/financing" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.financing.metaTitle} />
        <meta name="twitter:description" content={t.financing.metaDescription} />
      </Helmet>
      
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 bg-[#333333] text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight leading-tight">
                {t.financing.heroTitle} <span className="text-[#8dc63f]">{t.financing.heroTitleHighlight}</span> {t.financing.heroTitleEnd}
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                {t.financing.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={financeitLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold px-8 h-12 sm:h-14 rounded-xl text-center transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  {t.financing.startFinancing} <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <p className="mt-4 text-sm text-slate-400 italic">
                {t.financing.preQualNote}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src={financeitApprovedImg}
                  alt="Financeit Approval Notification"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#333333] uppercase mb-4">{t.financing.howItWorks}</h2>
            <div className="w-24 h-2 bg-[#8dc63f] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative group hover:shadow-xl transition-all"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#333333] text-[#8dc63f] rounded-xl flex items-center justify-center font-black text-2xl shadow-lg">
                  {item.step}
                </div>
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-black text-[#333333] uppercase mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video & Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <iframe
                  src="https://player.vimeo.com/video/855743462"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-black text-[#333333] uppercase mb-6">{t.financing.investInHome}</h2>
              <div className="space-y-6">
                <p className="text-lg text-slate-600 leading-relaxed">
                  {t.financing.investDesc1}
                </p>
                <p className="text-lg text-slate-600 leading-relaxed font-semibold text-[#8dc63f]">
                  {t.financing.investDesc2}
                </p>
                <ul className="space-y-4">
                  {benefits.map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                      <ShieldCheck className="w-5 h-5 text-[#8dc63f]" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-[#8dc63f] rounded-[2rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-black text-[#333333] uppercase mb-4 leading-tight">
                  {t.financing.readyToStart}<br />
                  <span className="text-[#333333]">{t.financing.applyNowCta}</span>
                </h2>
                <p className="text-[#333333]/80 text-lg font-medium max-w-md">
                  {t.financing.instantDecision}
                </p>
              </div>
              <a
                href={financeitLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#333333] hover:bg-black text-white font-bold py-5 px-10 rounded-xl text-xl transition-all shadow-xl flex items-center gap-3 whitespace-nowrap"
              >
                <BadgeDollarSign className="w-6 h-6 text-[#8dc63f]" />
                {t.financing.applyOnFinanceit}
              </a>
            </div>
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#333333]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

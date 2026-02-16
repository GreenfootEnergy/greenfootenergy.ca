import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { HreflangTags } from "@/components/seo/HreflangTags";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Wrench, Settings, Calendar, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Helmet } from "react-helmet";

import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import heroImage from "@assets/heat-pump-cover-hero.avif";

const content = {
  en: {
    meta: {
      title: "Heat Pump Snow Covers | Protect Your Investment | Greenfoot Energy",
      description: "Durable heat pump covers for year-long protection against snow, ice, and debris. Professional installation across Atlantic Canada & BC. Get a free quote today."
    },
    hero: {
      title1: "Durable Heat Pump Covers",
      title2: "for YEAR-LONG Protection",
      subtitle: "Keep your heat pump performing at its best through every Canadian winter. Greenfoot Energy's heat pump shelters provide durable, weather-resistant protection against snow, ice, and debris—helping your system run efficiently and last longer.",
      cta: "Get Free Quote"
    },
    badges: {
      expertise: "Unmatched Expertise",
      expertiseDesc: "With our team of seasoned home comfort advisors.",
      satisfaction: "Satisfaction Guaranteed",
      satisfactionDesc: "When you experience our customer-oriented service.",
      certified: "Red Seal Certified",
      certifiedDesc: "Every install is performed by certified technicians."
    },
    services: {
      title: "Heat Pump Covers & Services",
      intro: "At Greenfoot Energy Solutions, we provide reliable heat pump repair, installation, and maintenance to keep your home or business comfortable year-round. Whether it's fixing an existing unit or installing a new energy-efficient system, our certified technicians deliver fast, professional results you can trust.",
      servicesTitle: "Our Services:",
      repair: "Cover Repair:",
      repairDesc: "If your heat pump cover is damaged or not protecting your unit properly, our technicians can assess and repair it quickly to restore full protection against weather and debris.",
      installation: "Cover Installation:",
      installationDesc: "We offer professional installation of durable, weather-resistant heat pump covers designed to fit your system perfectly. Our team ensures a secure fit and a clean, professional look that enhances both protection and curb appeal.",
      maintenance: "Heat Pump Cover Maintenance:",
      maintenanceDesc: "Regular upkeep helps extend the life of your cover and your heat pump. We provide seasonal inspections and cleaning to keep your cover in top condition ensuring maximum airflow and year-round performance."
    },
    whyUs: {
      title: "Why Greenfoot Energy Solutions?",
      items: [
        { title: "Certified Experts", desc: "Red Seal and factory-trained professionals." },
        { title: "Quality Workmanship", desc: "Every job done right, the first time." },
        { title: "Smart Solutions", desc: "We use advanced tools for optimal comfort and efficiency." },
        { title: "Fair Pricing", desc: "Transparent quotes and competitive rates." }
      ]
    },
    sizes: {
      title: "Three Sizes to Fit Your System",
      size1: { name: "9,000 to 12,000 BTU Units", desc: "Perfect for smaller mini-split systems" },
      size2: { name: "15,000 to 24,000 BTU Units", desc: "Ideal for medium to large mini-splits" },
      size3: { name: "Central Heat Pumps With Side Discharge", desc: "Designed for ducted central systems" }
    },
    invest: {
      title: "INVEST IN YOUR Home",
      content: "Our home is our oasis, our retreat. It is where we recharge and entertain our friends and family. It is where we raise our children and plan our future. Investing in your home is investing in these moments.",
      approach: "Greenfoot has developed a holistic approach to energy efficiency. Through offering a wide range of services and products, we provide unbiased advice to home & business owners. Many contractors, due to their limited range of services, develop a one-size-fits-all approach. With Greenfoot; you can rest assured that our Home Comfort Advisors will recommend what your home requires.",
      tagline: "THAT IS THE GREENFOOT APPROACH!",
      subtagline: "Expertise you can trust, tailored to your home."
    },
  },
  fr: {
    meta: {
      title: "Couvertures de thermopompe | Protégez votre investissement | Greenfoot Energy",
      description: "Couvertures durables pour thermopompes pour une protection toute l'année contre la neige, la glace et les débris. Installation professionnelle au Canada atlantique et en C.-B. Obtenez une soumission gratuite."
    },
    hero: {
      title1: "Couvertures de thermopompe canadiennes",
      title2: "pour une protection fiable",
      subtitle: "Maintenez le meilleur rendement de votre thermopompe tout au long de chaque hiver canadien. Les abris pour thermopompes de Greenfoot Energy Solutions offrent une protection durable et résistante aux intempéries contre la neige, la glace et les débris, ce qui permet à votre système de fonctionner efficacement et de durer plus longtemps.",
      cta: "Soumission gratuite"
    },
    badges: {
      expertise: "Une expertise inégalée",
      expertiseDesc: "Avec notre équipe de conseillers chevronnés en matière de confort domestique.",
      satisfaction: "Satisfaction garantie",
      satisfactionDesc: "Lorsque vous faites l'expérience de notre service axé sur le client.",
      certified: "Certifié « Red Seal »",
      certifiedDesc: "Chaque installation est réalisée par des techniciens certifiés."
    },
    services: {
      title: "Couvertures et services pour thermopompes",
      intro: "Chez Greenfoot Energy Solutions, nous fournissons des services fiables de réparation, d'installation et d'entretien de thermopompes pour assurer le confort de votre maison ou de votre entreprise tout au long de l'année. Qu'il s'agisse de réparer une unité existante ou d'installer un nouveau système éconergétique, nos techniciens certifiés offrent des résultats rapides et professionnels en qui vous pouvez avoir confiance.",
      servicesTitle: "Nos services :",
      repair: "Réparation de la couverture :",
      repairDesc: "Si le couvercle de votre thermopompe est endommagé ou ne protège pas correctement votre appareil, nos techniciens peuvent l'évaluer et le réparer rapidement afin de rétablir une protection complète contre les intempéries et les débris.",
      installation: "Installation de la couverture :",
      installationDesc: "Nous offrons l'installation professionnelle de housses de thermopompes durables et résistantes aux intempéries conçues pour s'adapter parfaitement à votre système. Notre équipe assure un ajustement sûr et un look épuré et professionnel qui améliore à la fois la protection et l'attrait de la bordure.",
      maintenance: "Entretien du couvercle de la thermopompe :",
      maintenanceDesc: "Un entretien régulier permet de prolonger la durée de vie de votre couverture et de votre thermopompe. Nous effectuons des inspections saisonnières et des nettoyages pour maintenir votre couverture en bon état, garantissant une circulation d'air maximale et une performance tout au long de l'année."
    },
    whyUs: {
      title: "Pourquoi Greenfoot Energy Solutions ?",
      items: [
        { title: "Experts certifiés", desc: "Sceau rouge et professionnels formés en usine." },
        { title: "Un travail de qualité", desc: "Chaque travail est bien fait, la première fois." },
        { title: "Solutions intelligentes", desc: "Nous utilisons des outils avancés pour un confort et une efficacité optimaux." },
        { title: "Prix équitables", desc: "Des devis transparents et des tarifs concurrentiels." }
      ]
    },
    sizes: {
      title: "Trois tailles pour s'adapter à votre système",
      size1: { name: "Unités de 9 000 à 12 000 BTU", desc: "Parfait pour les plus petites thermopompes murales" },
      size2: { name: "Unités de 15 000 à 24 000 BTU", desc: "Idéal pour les thermopompes murales moyennes à grandes" },
      size3: { name: "Thermopompes centrales à décharge latérale", desc: "Conçu pour les systèmes centraux à conduits" }
    },
    invest: {
      title: "INVESTISSEZ DANS VOTRE MAISON",
      content: "Notre maison est notre oasis, notre retraite. C'est l'endroit où nous nous ressourçons et divertissons nos amis et notre famille. C'est là que nous élevons nos enfants et que nous planifions notre avenir. Investir dans votre maison, c'est investir dans ces moments.",
      approach: "Greenfoot a mis au point une approche holistique à l'efficacité énergétique. En offrant une vaste gamme de services et de produits, nous offrons des conseils impartiaux aux propriétaires de maisons et d'entreprises. De nombreux entrepreneurs, en raison de leur gamme limitée de services, élaborent une approche unique. Avec Greenfoot, vous pouvez être assuré que nos conseillers en confort à la maison vous recommanderont ce dont votre maison a besoin.",
      tagline: "C'EST L'APPROCHE GREENFOOT !",
      subtagline: "Une expertise en qui vous pouvez avoir confiance, adaptée à votre domicile."
    },
  }
};

export default function SnowCoversPage() {
  const { language, localizedPath } = useLanguage();
  const t = content[language];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
      </Helmet>
      <HreflangTags canonicalPath="/heat-pump-snow-covers-protect-your-investment" />
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="relative text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/70"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-white">{t.hero.title1}</span>{" "}
                <span className="text-[#8dc63f]">{t.hero.title2}</span>
              </h1>
              <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                {t.hero.subtitle}
              </p>
              <a
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold h-14 px-10 rounded-xl text-lg transition-all"
              >
                {t.hero.cta}
              </a>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 bg-slate-50 border-b border-slate-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex items-start gap-4 text-center md:text-left">
                <img src={expertiseIcon} alt="" className="w-16 h-16 object-contain flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-[#333333] mb-1">{t.badges.expertise}</h3>
                  <p className="text-slate-600 text-sm">{t.badges.expertiseDesc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-center md:text-left">
                <img src={guaranteeIcon} alt="" className="w-16 h-16 object-contain flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-[#333333] mb-1">{t.badges.satisfaction}</h3>
                  <p className="text-slate-600 text-sm">{t.badges.satisfactionDesc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-center md:text-left">
                <img src={redSealIcon} alt="" className="w-16 h-16 object-contain flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-[#333333] mb-1">{t.badges.certified}</h3>
                  <p className="text-slate-600 text-sm">{t.badges.certifiedDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-6">{t.services.title}</h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">{t.services.intro}</p>
            
            <h3 className="text-2xl font-bold text-[#333333] mb-6">{t.services.servicesTitle}</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#8dc63f]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Wrench className="w-5 h-5 text-[#8dc63f]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#333333] mb-2">{t.services.repair}</h4>
                  <p className="text-slate-600">{t.services.repairDesc}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#8dc63f]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Settings className="w-5 h-5 text-[#8dc63f]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#333333] mb-2">{t.services.installation}</h4>
                  <p className="text-slate-600">{t.services.installationDesc}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#8dc63f]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Calendar className="w-5 h-5 text-[#8dc63f]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#333333] mb-2">{t.services.maintenance}</h4>
                  <p className="text-slate-600">{t.services.maintenanceDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-[#333333] mb-10">{t.whyUs.title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {t.whyUs.items.map((item, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#8dc63f] flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#333333] mb-1">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sizes Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-[#333333] text-center mb-12">{t.sizes.title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[t.sizes.size1, t.sizes.size2, t.sizes.size3].map((size, index) => (
                <Card key={index} className="border-2 border-slate-100 hover:border-[#8dc63f] transition-colors">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-bold text-[#333333] mb-4">{size.name}</h3>
                    <p className="text-slate-600">{size.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              {language === "fr" ? (
                <a href="/fr-ca/financement" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors max-w-md mx-auto">
                  <p className="text-[#8dc63f] font-bold mb-1">Financement flexible disponible</p>
                  <p className="text-slate-600 text-sm">En savoir plus sur nos options de financement →</p>
                </a>
              ) : (
                <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors max-w-md mx-auto">
                  <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                  <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
                </a>
              )}
              <a
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold h-14 px-10 rounded-xl text-lg transition-all"
              >
                {t.hero.cta}
              </a>
            </div>
          </div>
        </section>

        {/* Invest Section */}
        <section className="py-20 bg-[#333333] text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.invest.title}</h2>
            <p className="text-white/80 text-lg mb-6 leading-relaxed">{t.invest.content}</p>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">{t.invest.approach}</p>
            <p className="text-[#8dc63f] text-2xl font-bold mb-2">{t.invest.tagline}</p>
            <p className="text-white/70">{t.invest.subtagline}</p>
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewsSection />

        {/* CTA Section */}
        <section className="py-16 bg-[#8dc63f]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#333333] mb-6">
              {language === "fr" ? "Prêt à protéger votre investissement ?" : "Ready to Protect Your Investment?"}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#333333] font-bold h-14 px-10 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors"
              >
                {t.hero.cta}
              </a>
              <a
                href="tel:18003809384"
                className="bg-transparent border-2 border-[#333333] text-[#333333] font-bold h-14 px-10 rounded-xl flex items-center justify-center gap-2 hover:bg-[#333333]/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                1 (800) 380-9384
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

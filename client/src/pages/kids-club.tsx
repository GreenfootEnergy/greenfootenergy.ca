import { motion } from "framer-motion";
import { Download, BookOpen, Star, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n/LanguageContext";

import kidsClubLogo from "@assets/kids_club_logo_1769195846361.avif";
import kidsClubBackground from "@assets/kids_book_club_page_background_1769195846361.avif";
import brightIdeaBook from "@assets/Greenfoot's-bright-idea-book_1769195846361.avif";
import bigMessBook from "@assets/new-greenfoot-big-mess_1769195905707.avif";
import activitiesGrouping from "@assets/activities-grouping_1769195846360.avif";
import coloringBook from "@assets/coloring_book_1769195846360.png";

export default function KidsClubPage() {
  const { t, language } = useLanguage();
  const k = t.kidsClub;

  const canonicalUrl = language === "fr"
    ? "https://www.greenfootenergy.ca/fr-ca/club-pour-enfants"
    : "https://www.greenfootenergy.ca/kids-club";

  const downloadableActivities = [
    {
      title: k.downloads.activities.coloringPage.title,
      description: k.downloads.activities.coloringPage.description,
      image: coloringBook,
      downloadUrl: "https://cdn.prod.website-files.com/68874c9990cff00613a8653e/690cb2ae6016e10fad88f178_GF-Coloring-Page.pdf"
    },
    {
      title: k.downloads.activities.wordSearch.title,
      description: k.downloads.activities.wordSearch.description,
      image: "https://cdn.prod.website-files.com/68874c9990cff00613a8653e/68874c9990cff00613a867cf_word-search-kidsclub.avif",
      downloadUrl: "https://cdn.prod.website-files.com/68874c9990cff00613a8653e/690cb29207701f3fbb5e2a85_WordSearch.pdf"
    },
    {
      title: k.downloads.activities.roomSign.title,
      description: k.downloads.activities.roomSign.description,
      image: "https://cdn.prod.website-files.com/68874c9990cff00613a8653e/690cb1c39f08e9747c3b02d6_This%20room%20belongs%20to%20page.webp",
      downloadUrl: "https://cdn.prod.website-files.com/68874c9990cff00613a8653e/690cb1dacd31b2ee8888aabe_This%20room%20belongs%20to%20page.pdf"
    },
    {
      title: k.downloads.activities.spotDifference.title,
      description: k.downloads.activities.spotDifference.description,
      image: "https://cdn.prod.website-files.com/68874c9990cff00613a8653e/68874c9990cff00613a867cc_61cba8c018d5587cdede1fd1_SpotTheDifferences-p-800.avif",
      downloadUrl: "https://cdn.prod.website-files.com/68874c9990cff00613a8653e/690cb237288468d84f519d46_SpotTheDifferences.pdf"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>{k.meta.title}</title>
        <meta name="description" content={k.meta.description} />
        <meta name="keywords" content={k.meta.keywords} />
        <link rel="canonical" href={canonicalUrl} />
        
        <meta property="og:title" content={k.meta.title} />
        <meta property="og:description" content={k.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={k.meta.title} />
        <meta name="twitter:description" content={k.meta.description} />

        <link rel="alternate" hrefLang="en" href="https://www.greenfootenergy.ca/kids-club" />
        <link rel="alternate" hrefLang="fr-CA" href="https://www.greenfootenergy.ca/fr-ca/club-pour-enfants" />
      </Helmet>
      
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={kidsClubBackground} 
            alt={language === "fr" ? "Arrière-plan du Club pour enfants" : "Kids Club Background"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/90"></div>
        </div>
        
        <div className="relative container mx-auto px-4 pt-32 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <img 
              src={kidsClubLogo} 
              alt={language === "fr" ? "Logo du Club pour enfants Greenfoot" : "Greenfoot Kids Club Logo"}
              className="w-48 md:w-64 mx-auto drop-shadow-lg"
            />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] mb-4 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
          >
            {k.hero.title1} <span className="text-[#8dc63f]">{k.hero.titleHighlight}</span>
            <br />{k.hero.title2}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-[#333333]/80 max-w-2xl mx-auto font-semibold"
          >
            {k.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-16 bg-gradient-to-b from-white to-[#f0f9e8]">
        <div className="container mx-auto px-4">
          {/* Bright Idea Book */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-20"
          >
            <div className="lg:w-1/2 flex justify-center">
              <img 
                src={brightIdeaBook} 
                alt={language === "fr" ? "La brillante idée de Greenfoot" : "Greenfoot's Bright Idea Book"}
                className="w-64 md:w-80 rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-[#333333] mb-2">
                <span className="text-[#8dc63f]">{k.books.brightIdea.title1}</span> {k.books.brightIdea.title2}
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                {k.books.brightIdea.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold px-8 rounded-xl h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open('https://www.amazon.ca/GREENFOOTS-BRIGHT-IDEA-Jen-Vandermaar/dp/B0BSY99CCP', '_blank')}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  {k.books.brightIdea.orderNow}
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-white cta-hover-dark font-bold px-8 rounded-xl h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open('https://www.amazon.ca/GREENFOOTS-BRIGHT-IDEA-Jen-Vandermaar-ebook/dp/B0BSTDDYQD', '_blank')}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {k.books.brightIdea.kindle}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Big Mess Book */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16"
          >
            <div className="lg:w-1/2 flex justify-center">
              <img 
                src={bigMessBook} 
                alt={language === "fr" ? "Le gros dégât de Greenfoot" : "Greenfoot's Big Mess Book"}
                className="w-64 md:w-80 rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <p className="text-sm font-bold text-[#8dc63f] mb-2 uppercase tracking-wider">{k.books.bigMess.alsoAvailable}</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#333333] mb-2">
                <span className="text-[#8dc63f]">{k.books.bigMess.title1}</span> {k.books.bigMess.title2}
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                {k.books.bigMess.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold px-8 rounded-xl h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open('https://www.amazon.ca/Greenfoots-Big-Mess-Jen-Vandermaar/dp/B0CZ7JSP9Q', '_blank')}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  {k.books.bigMess.orderNow}
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-white cta-hover-dark font-bold px-8 rounded-xl h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open('https://www.amazon.ca/Greenfoots-Big-Mess-Jen-Vandermaar-ebook/dp/B0CW1BN317', '_blank')}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {k.books.bigMess.kindle}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Free Downloads Section */}
      <section className="py-16 bg-[#8dc63f]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              {k.downloads.title}
            </h2>
            <div className="flex justify-center mb-6">
              <img 
                src={activitiesGrouping} 
                alt={language === "fr" ? "Aperçu des activités" : "Activities Preview"}
                className="w-full max-w-md rounded-lg shadow-xl"
              />
            </div>
            <p className="text-xl text-[#333333]/80 max-w-2xl mx-auto">
              {k.downloads.subtitle}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {downloadableActivities.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow group"
              >
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-[#333333] mb-1">{activity.title}</h3>
                  <p className="text-sm text-slate-500 mb-3">{activity.description}</p>
                  <Button 
                    className="w-full bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold rounded-xl h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
                    onClick={() => window.open(activity.downloadUrl, '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {k.downloads.download}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
                {k.whyJoin.title} <span className="text-[#8dc63f]">{k.whyJoin.titleHighlight}</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#f0f9e8] rounded-2xl p-8"
              >
                <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-3">{k.whyJoin.exclusiveResources.title}</h3>
                <p className="text-slate-600">
                  {k.whyJoin.exclusiveResources.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#f0f9e8] rounded-2xl p-8"
              >
                <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-3">{k.whyJoin.funLearning.title}</h3>
                <p className="text-slate-600">
                  {k.whyJoin.funLearning.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#f0f9e8] rounded-2xl p-8"
              >
                <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-3">{k.whyJoin.upcomingEvents.title}</h3>
                <p className="text-slate-600">
                  {k.whyJoin.upcomingEvents.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#f0f9e8] rounded-2xl p-8"
              >
                <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-3">{k.whyJoin.specialPromotions.title}</h3>
                <p className="text-slate-600">
                  {k.whyJoin.specialPromotions.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

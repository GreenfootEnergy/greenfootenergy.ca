import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronRight, Check, Shield, Volume2, Home, Building, Calendar, Users, Award, CheckCircle2, ArrowRight, Ear, Lock, Moon, TrendingUp, Wrench, Sparkles, Target, Settings, Music, Mic, Briefcase, Baby, Tv, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { useState } from "react";
import { X } from "lucide-react";
import { Helmet } from "react-helmet";

import heroBg from "@assets/soundproofing-hero.avif";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const soundproofingBenefits = [
  {
    icon: Volume2,
    title: "Reduced Noise Pollution",
    desc: "Minimizes external noise from traffic, neighbors, and street activity for a more peaceful home."
  },
  {
    icon: Lock,
    title: "Enhanced Privacy",
    desc: "Prevents sound from traveling between rooms, ensuring confidential conversations stay private."
  },
  {
    icon: Moon,
    title: "Better Sleep Quality",
    desc: "Reduces noise disturbances for more restful, rejuvenating sleep throughout the night."
  },
  {
    icon: TrendingUp,
    title: "Increased Property Value",
    desc: "Makes your home more attractive to buyers who value peace and quiet living spaces."
  }
];

const soundproofingMaterials = [
  {
    icon: Shield,
    title: "Acoustical Caulk",
    desc: "Specialized sealant that remains flexible and blocks sound transmission through gaps and cracks."
  },
  {
    icon: Sparkles,
    title: "Mass Loaded Vinyl",
    desc: "Dense, flexible barrier material that effectively blocks airborne sound waves."
  },
  {
    icon: Settings,
    title: "Insulating Foam Sealants",
    desc: "Expanding foam that fills cavities while providing both thermal and acoustic insulation."
  },
  {
    icon: Target,
    title: "Dense Masonry Materials",
    desc: "High-mass materials that absorb and block sound energy transmission through walls and floors."
  }
];

const soundproofingApplications = [
  {
    icon: Music,
    title: "Music & Recording Studios",
    desc: "Create professional-quality recording spaces with complete sound isolation for musicians and podcasters."
  },
  {
    icon: Tv,
    title: "Home Theaters",
    desc: "Enjoy immersive cinema experiences without disturbing the rest of your household or neighbors."
  },
  {
    icon: Briefcase,
    title: "Home Offices",
    desc: "Eliminate distractions and maintain privacy during video calls and focused work sessions."
  },
  {
    icon: Baby,
    title: "Nurseries & Bedrooms",
    desc: "Ensure peaceful sleep for babies and family members by blocking outside noise disturbances."
  },
  {
    icon: Gamepad2,
    title: "Gaming Rooms",
    desc: "Game at full volume without disturbing others, and block external noise for complete immersion."
  },
  {
    icon: Building,
    title: "Shared Walls & Condos",
    desc: "Reduce noise transfer between units in townhouses, apartments, and multi-family dwellings."
  }
];

const whyChooseSoundproofing = [
  {
    image: prideImage,
    title: "Acoustic Insulation Specialists",
    desc: "Our technicians specialize in residential and commercial soundproofing applications. We've completed thousands of acoustic projects across 5 Canadian provinces, understanding the unique noise challenges of urban and rural homes."
  },
  {
    image: experienceImage,
    title: "Certified Installation Experts",
    desc: "Factory-certified for acoustic insulation systems and soundproofing materials. Our certifications ensure your installation meets industry standards for maximum noise reduction."
  },
  {
    image: satisfactionImage,
    title: "Complete Home Coverage",
    desc: "Whether you need wall soundproofing, ceiling acoustic treatment, or floor noise reduction, we design custom solutions. Our acoustic assessments identify all noise sources for comprehensive treatment."
  },
  {
    image: dedicatedImage,
    title: "Rebate & Financing Assistance",
    desc: "We help you access available rebates. Flexible financing options available—conditions apply.",
    links: [
      { text: "View Incentives", href: "/provincial-incentives" },
      { text: "See What You Qualify For", href: "/financing" }
    ]
  }
];

const installationSteps = [
  {
    step: 1,
    title: "Free Soundproofing Consultation",
    intro: "Our certified Home Comfort Advisor visits your property to conduct a comprehensive acoustic evaluation at no cost:",
    details: [
      "Identify primary noise sources affecting your comfort",
      "Assess your home's current acoustic performance",
      "Evaluate sound transmission paths through walls, floors, and ceilings",
      "Determine the optimal soundproofing solutions for your specific needs",
      "Provide a detailed written quote with materials and pricing"
    ],
    footer: { cost: "Free, no obligation", timeline: "3-5 Business days" },
    showCta: true
  },
  {
    step: 2,
    title: "Efficient Project Coordination",
    intro: "Following your soundproofing assessment, our team coordinates your installation timeline:",
    details: [
      "Scheduling based on your home's specific acoustic needs",
      "Clear communication about project duration",
      "Material ordering and delivery coordination",
      "Any special preparation requirements explained in detail"
    ],
    footer: { timeline: "Scheduled within 1-2 weeks" }
  },
  {
    step: 3,
    title: "Expert Soundproofing Installation",
    intro: "Our experienced Greenfoot acoustic installation team arrives with professional-grade materials:",
    details: [
      "Surface preparation and protective covering of furniture and flooring",
      "Precise installation of soundproofing materials by certified technicians",
      "Complete sealing of all gaps and sound transmission paths",
      "Quality control testing throughout the process",
      "Highest safety and cleanliness standards maintained"
    ],
    footer: { singleArea: "4-8 hours", multipleAreas: "1-2 days" }
  },
  {
    step: 4,
    title: "Final Inspection & Walkthrough",
    intro: "Once your soundproofing installation is complete, our technician provides a thorough review:",
    details: [
      "Confirm project completion and review all work performed",
      "Demonstrate the noise reduction improvements",
      "Provide maintenance guidelines for long-term performance",
      "Answer any questions about your newly soundproofed spaces"
    ],
    footer: { timeline: "Same day completion" }
  },
  {
    step: 5,
    title: "Enjoy Peace and Quiet",
    intro: "Experience the immediate difference in your home's tranquility with significantly reduced noise levels and enhanced privacy in every treated room.",
    details: []
  }
];


export default function SoundproofingPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

  const soundproofingFaqs = [
    {
      question: "What is soundproofing and how does it benefit my home?",
      answer: "Soundproofing involves installing specialized materials to reduce or block sound transmission between spaces. It benefits your home by reducing external noise pollution, enhancing privacy between rooms, improving sleep quality, and increasing overall property value by creating more comfortable living spaces."
    },
    {
      question: "How much does professional soundproofing cost in Canada?",
      answer: "Soundproofing costs vary based on the area size, materials used, and complexity of the installation. We provide free in-home assessments with detailed written quotes tailored to your specific needs. Flexible financing options are available—conditions apply."
    },
    {
      question: "What areas of my home can be soundproofed?",
      answer: "We offer comprehensive soundproofing solutions for walls, ceilings, floors, windows, and doors. Common projects include home offices, bedrooms, media rooms, nurseries, and shared walls with neighbors in townhouses or condos."
    },
    {
      question: "How effective is soundproofing against traffic noise?",
      answer: "Professional soundproofing significantly reduces traffic noise, typically by 50-80% depending on the materials and methods used. Our acoustic assessments identify the specific noise frequencies affecting your home to recommend the most effective solutions."
    },
    {
      question: "What soundproofing materials do you use?",
      answer: "We use high-quality professional-grade materials including acoustical caulk for sealing gaps, mass loaded vinyl for sound barriers, insulating foam sealants, dense masonry materials, and specialized acoustic insulation products designed for maximum noise reduction."
    },
    {
      question: "How long does soundproofing installation take?",
      answer: "Installation time varies based on project scope. A single room typically takes 1-2 days, while multiple rooms or whole-home projects may take 3-5 days. We coordinate schedules to minimize disruption to your daily routine."
    },
    {
      question: "Can soundproofing help with noisy neighbors in apartments or townhouses?",
      answer: "Yes, soundproofing is highly effective for shared walls in multi-unit dwellings. We install specialized materials that block both airborne sounds like voices and impact sounds like footsteps, creating a quieter living environment."
    },
    {
      question: "Does soundproofing also provide thermal insulation benefits?",
      answer: "Many soundproofing materials also improve thermal insulation, helping regulate your home's temperature and potentially reducing energy costs. This dual benefit makes soundproofing an excellent investment in overall home comfort."
    },
    {
      question: "Do you offer soundproofing services in my area?",
      answer: "We provide professional soundproofing services across Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland, and British Columbia. Contact us to confirm service availability in your specific location."
    }
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Soundproofing & Acoustic Insulation Services",
    "description": "Professional soundproofing and acoustic insulation installation for homes across Nova Scotia, New Brunswick, PEI, Newfoundland, and British Columbia. Expert noise reduction solutions for peaceful living spaces.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Greenfoot Energy Solutions",
      "telephone": "+1-800-380-9384",
      "url": "https://www.greenfootenergy.ca",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CA"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "5000"
      }
    },
    "areaServed": [
      { "@type": "Province", "name": "Nova Scotia" },
      { "@type": "Province", "name": "New Brunswick" },
      { "@type": "Province", "name": "Prince Edward Island" },
      { "@type": "Province", "name": "Newfoundland and Labrador" },
      { "@type": "Province", "name": "British Columbia" }
    ],
    "serviceType": "Soundproofing Installation"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": soundproofingFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.greenfootenergy.ca" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.greenfootenergy.ca/services" },
      { "@type": "ListItem", "position": 3, "name": "Soundproofing", "item": "https://www.greenfootenergy.ca/services/soundproofing" }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Soundproofing & Acoustic Insulation Services | Greenfoot Energy Solutions</title>
        <meta name="description" content="Professional soundproofing and acoustic insulation services in NS, NB, PEI, NFLD & BC. Reduce noise pollution, enhance privacy, and improve sleep quality with expert installation." />
        <meta name="keywords" content="soundproofing, acoustic insulation, noise reduction, sound barriers, residential soundproofing, Canada, Nova Scotia, New Brunswick, PEI, Newfoundland, British Columbia" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/soundproofing" />
        <meta name="geo.region" content="CA-NS" />
        <meta name="geo.region" content="CA-NB" />
        <meta name="geo.region" content="CA-PE" />
        <meta name="geo.region" content="CA-NL" />
        <meta name="geo.region" content="CA-BC" />
        <meta name="geo.placename" content="Atlantic Canada, British Columbia" />
        <meta property="og:title" content="Soundproofing & Acoustic Insulation Services | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Professional soundproofing and acoustic insulation services. Reduce noise pollution, enhance privacy, and create peaceful living spaces." />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/soundproofing" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${heroBg})`,
              backgroundPosition: "center 30%"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#333333]/95 via-[#333333]/70 to-transparent" />
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                SOUNDPROOFING &<br />
                <span className="text-[#8dc63f]">ACOUSTIC INSULATION</span><br />
                FOR QUIET SPACES
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
                Enhance your home's tranquility and peace with Greenfoot's expert soundproofing services. Create quieter living spaces with professional acoustic insulation.
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <Button 
                  onClick={() => setShowBookingModal(true)}
                  className="bg-[#8dc63f] hover:bg-[#7ab635] text-white rounded-xl h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-bold shadow-lg cursor-pointer"
                  data-testid="button-hero-book"
                >
                  Get Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = 'tel:18003809384'}
                  className="border-2 border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-white rounded-xl h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-bold bg-transparent cursor-pointer"
                  data-testid="button-hero-call"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  1-800-380-9384
                </Button>
              </div>

              <a href="/financing" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors max-w-md" data-testid="link-financing-cta">
                <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                <p className="text-white/70 text-sm">Learn more about our financing options →</p>
              </a>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <span className="text-white text-sm font-semibold">Unmatched Expertise</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <span className="text-white text-sm font-semibold">Satisfaction Guaranteed</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <span className="text-white text-sm font-semibold">Red Seal Certified</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Can Soundproofing Improve Your Home Comfort */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-6">
              How Can Soundproofing Improve Your <span className="text-[#8dc63f]">Home Comfort</span>?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Excessive noise can disrupt your peace and comfort, which is why proper soundproofing is essential. We provide professional services to help you create a quieter living environment by significantly reducing unwanted noise from traffic, neighbors, and other sources.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {soundproofingBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-[#8dc63f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-[#8dc63f]" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Are the Key Benefits of Residential Soundproofing */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-8 text-center">
              What Are the Key Benefits of <span className="text-[#8dc63f]">Residential Soundproofing</span>?
            </h2>
            <p className="text-lg text-slate-600 text-center mb-10">
              Upgrading your home with professional soundproofing delivers five distinct performance advantages:
            </p>
            
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#333333]">Reduced noise pollution</span>
                    <span className="text-slate-600"> minimizes the impact of external sources like traffic and neighbors to ensure a more peaceful home.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#333333]">Enhanced privacy</span>
                    <span className="text-slate-600"> prevents sound from traveling between rooms, ensuring greater confidentiality and privacy within your home.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#333333]">Improved comfort</span>
                    <span className="text-slate-600"> creates a more tranquil living environment by significantly reducing overall noise levels.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#333333]">Better sleep quality</span>
                    <span className="text-slate-600"> reduces noise disturbances, allowing you to enjoy a more restful and rejuvenating sleep experience.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#333333]">Increased property value</span>
                    <span className="text-slate-600"> makes your home more attractive to potential buyers, potentially increasing its overall resale value.</span>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Does Our Soundproofing Service Include */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-6">
              What Does Our <span className="text-[#8dc63f]">Soundproofing Service</span> Include?
            </h2>
            <p className="text-lg text-slate-600">
              We provide a comprehensive noise control package designed to maximize your home's tranquility.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#8dc63f] rounded-full flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#333333]">Professional Installation</h3>
              </div>
              <p className="text-slate-600">Our experienced technicians ensure the proper installation of soundproofing materials to maximize noise reduction.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#8dc63f] rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#333333]">High-Quality Materials</h3>
              </div>
              <p className="text-slate-600">We use top-quality soundproofing products, such as acoustical caulk, insulating foam sealants, and dense masonry materials.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#8dc63f] rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#333333]">Customized Solutions</h3>
              </div>
              <p className="text-slate-600">We tailor our soundproofing services to meet your specific needs and budget, whether you are a homeowner or a renter.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#8dc63f] rounded-full flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#333333]">Comprehensive Approach</h3>
              </div>
              <p className="text-slate-600">We offer soundproofing solutions for walls, ceilings, floors, windows, and doors to address noise issues throughout your home.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Soundproofing Materials Section */}
      <section className="py-16 sm:py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
              What Materials Are Used for <span className="text-[#8dc63f]">Professional Soundproofing</span>?
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              We use industry-leading acoustic materials selected for maximum noise reduction and long-term durability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {soundproofingMaterials.map((material, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
              >
                <div className="w-14 h-14 bg-[#8dc63f] rounded-full flex items-center justify-center mx-auto mb-4">
                  <material.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{material.title}</h3>
                <p className="text-white/70 text-sm">{material.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Greenfoot Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-6">
              Why Choose <span className="text-[#8dc63f]">Greenfoot Energy</span> for Soundproofing?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              When you partner with Greenfoot Energy, you benefit from a service commitment built on four core standards.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseSoundproofing.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 rounded-xl overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#333333] mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{item.desc}</p>
                  {item.links && (
                    <div className="flex flex-wrap gap-2">
                      {item.links.map((link, linkIndex) => (
                        <a 
                          key={linkIndex}
                          href={link.href}
                          className="text-[#8dc63f] text-sm font-semibold hover:underline"
                        >
                          {link.text} <ChevronRight className="inline w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Soundproofing Applications */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-6">
              What Are Common <span className="text-[#8dc63f]">Soundproofing Applications</span>?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From home studios to peaceful bedrooms, soundproofing enhances comfort in many spaces throughout your home.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {soundproofingApplications.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-full flex items-center justify-center mb-4">
                  <app.icon className="w-7 h-7 text-[#8dc63f]" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">{app.title}</h3>
                <p className="text-slate-600 text-sm">{app.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-6">
              How Do I Schedule a <span className="text-[#8dc63f]">Soundproofing Assessment</span>?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Take the first step toward peace and quiet with our simple 5-step process. Our experts are ready to assess your needs and provide a customized solution.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {installationSteps.map((step, index) => (
              <ScrollStepItem
                key={index}
                step={step}
                index={index}
                total={installationSteps.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-6">
              Where Are <span className="text-[#8dc63f]">Soundproofing Services</span> Available?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We provide professional soundproofing and acoustic insulation services across Atlantic Canada and British Columbia.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {['Nova Scotia', 'New Brunswick', 'Prince Edward Island', 'Newfoundland', 'British Columbia'].map((province, index) => (
              <motion.div
                key={province}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-100 rounded-xl px-6 py-4 flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#8dc63f]" />
                <span className="font-semibold text-[#333333]">{province}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#333333]">
              Frequently Asked Questions About <span className="text-[#8dc63f]">Soundproofing</span>
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
              Find answers to common questions about our soundproofing and acoustic insulation services.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {soundproofingFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-[#333333] pr-4">{faq.question}</span>
                  <ChevronRight className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${openFaqIndex === index ? 'rotate-90' : ''}`} />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-[#8dc63f]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-[#333333] mb-6">
              Ready for a Quieter Home?
            </h2>
            <p className="text-xl text-[#333333]/80 mb-8 max-w-2xl mx-auto">
              Get your free soundproofing assessment today. Our experts will evaluate your home and provide a customized solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => setShowBookingModal(true)}
                className="bg-white text-[#333333] hover:bg-slate-100 rounded-xl h-12 sm:h-14 px-8 text-lg font-bold shadow-lg cursor-pointer"
                data-testid="button-cta-book"
              >
                Get Free Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = 'tel:18003809384'}
                className="border-2 border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-white rounded-xl h-12 sm:h-14 px-8 text-lg font-bold bg-transparent cursor-pointer"
                data-testid="button-cta-call"
              >
                <Phone className="mr-2 w-5 h-5" />
                1-800-380-9384
              </Button>
            </div>
          </motion.div>
        </div>
      </section>


      <OtherServicesGrid exclude="soundproofing" />


      <SiteFooter />

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#333333]">Book Your Free Assessment</h3>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>
              <p className="text-slate-600 mb-6">
                Schedule your free soundproofing consultation with one of our certified Home Comfort Advisors.
              </p>
              <a 
                href="https://scheduling.greenfootenergy.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#8dc63f] hover:bg-[#7ab635] text-white rounded-xl h-14 flex items-center justify-center text-lg font-bold"
              >
                Continue to Booking
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

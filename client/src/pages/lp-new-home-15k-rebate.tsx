import { motion } from "framer-motion";
import { Phone, ChevronDown, ArrowRight, Award, MapPin, TrendingDown, Shield, Thermometer, Snowflake, Home, Zap, Leaf } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";

import heroBackground from "@assets/lp-15k-rebate-hero.png";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import guaranteeIcon from "@assets/guaranteee.webp";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideInWorkImg from "@assets/pride-in-work_1767995824634.png";
import experienceCardImg from "@assets/experience-card_1767998244511.png";
import satisfactionImg from "@assets/satisfaction.webp";
import dedicatedServiceImg from "@assets/dedicated-service-card_1767998424295.png";

type Province = "bc" | "nb" | "pei" | "ns" | "nl";

interface Promotion {
  title: string;
  description: string;
  cta: string;
}

const provinceData: Record<Province, { name: string; promotions: Promotion[] }> = {
  bc: {
    name: "British Columbia",
    promotions: [
      {
        title: "Beat The Freeze Promotion",
        description: "Save on selected heat pump brands",
        cta: "FREE QUOTE"
      },
      {
        title: "Heat Pump for $2/Day",
        description: "Finance your new heat pump for Less than $2/Day",
        cta: "FREE QUOTE"
      },
      {
        title: "Insulation Rebates Available",
        description: "Claim rebates on insulation upgrades",
        cta: "FREE QUOTE"
      }
    ]
  },
  nb: {
    name: "New Brunswick",
    promotions: [
      {
        title: "Beat The Freeze Promotion",
        description: "Save on selected heat pump brands",
        cta: "FREE QUOTE"
      },
      {
        title: "Heat Pump for $2/Day",
        description: "Finance your new heat pump for Less than $2/Day",
        cta: "FREE QUOTE"
      },
      {
        title: "Insulation Rebates Available",
        description: "Claim rebates on insulation upgrades",
        cta: "FREE QUOTE"
      }
    ]
  },
  pei: {
    name: "Prince Edward Island",
    promotions: [
      {
        title: "Beat The Freeze Promotion",
        description: "Save on selected heat pump brands",
        cta: "FREE QUOTE"
      },
      {
        title: "Heat Pump for $2/Day",
        description: "Finance your new heat pump for Less than $2/Day",
        cta: "FREE QUOTE"
      },
      {
        title: "Insulation Savings",
        description: "Contact us for potential rebates on insulation",
        cta: "FREE QUOTE"
      }
    ]
  },
  ns: {
    name: "Nova Scotia",
    promotions: [
      {
        title: "Beat The Freeze Promotion",
        description: "Save on selected heat pump brands",
        cta: "FREE QUOTE"
      },
      {
        title: "Heat Pump for $2/Day",
        description: "Finance your new heat pump for Less than $2/Day",
        cta: "FREE QUOTE"
      },
      {
        title: "Insulation Rebates Available",
        description: "Claim rebates on insulation upgrades",
        cta: "Book Now"
      }
    ]
  },
  nl: {
    name: "Newfoundland & Labrador",
    promotions: [
      {
        title: "Beat The Freeze Promotion",
        description: "Save on selected heat pump brands",
        cta: "Book Now"
      },
      {
        title: "Heat Pump for $2/Day",
        description: "Finance your new heat pump for Less than $2/Day",
        cta: "Book Now"
      },
      {
        title: "Insulation Rebates Available",
        description: "Claim rebates on insulation upgrades",
        cta: "Book Now"
      }
    ]
  }
};

const benefits = [
  {
    icon: TrendingDown,
    title: "Lower Energy Bills",
    description: "Heat pumps can reduce your heating costs significantly compared to traditional systems."
  },
  {
    icon: Thermometer,
    title: "Year-Round Comfort",
    description: "Enjoy efficient heating in winter and cooling in summer with one system."
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Reduce your carbon footprint with clean, efficient heat pump technology."
  },
  {
    icon: Shield,
    title: "Government Rebates",
    description: "Take advantage of federal and provincial incentive programs to maximize savings."
  },
  {
    icon: Home,
    title: "Increased Home Value",
    description: "Energy-efficient homes are more attractive to buyers and command higher prices."
  },
  {
    icon: Zap,
    title: "Quick Installation",
    description: "Professional installation by certified technicians with minimal disruption."
  }
];

const whyChoose = [
  { title: "Pride In Our Work", desc: "Our team takes immense pride in every installation, ensuring quality craftsmanship that lasts." },
  { title: "Experienced Team", desc: "With years of experience and continuous training, our technicians stay ahead of the curve." },
  { title: "Complete Satisfaction", desc: "We're not satisfied until you are. Your comfort and happiness are our top priorities." },
  { title: "Dedicated Service", desc: "From initial consultation to post-installation support, we're with you every step of the way." }
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
        data-testid={`faq-toggle-${index}`}
      >
        <span className="font-semibold text-[#333333]">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-6 pb-5">
          <p className="text-slate-600 leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function NewHome15kRebateLP() {
  const [activeProvince, setActiveProvince] = useState<Province>("bc");

  const provinces: Province[] = ["bc", "nb", "pei", "ns", "nl"];
  const provinceLabels: Record<Province, string> = {
    bc: "British Columbia",
    nb: "New Brunswick",
    pei: "Prince Edward Island",
    ns: "Nova Scotia",
    nl: "Newfoundland and Labrador"
  };

  const faqs = [
    {
      question: "What rebates are available for new home energy upgrades?",
      answer: "Depending on your province, you may be eligible for federal programs like the Canada Greener Homes Grant, as well as provincial rebates from programs like CleanBC, NB Power, efficiencyPEI, Efficiency Nova Scotia, and TakeCHARGE. Our Home Comfort Advisors will help you navigate all available options."
    },
    {
      question: "How much can I save with a heat pump?",
      answer: "Heat pumps can reduce heating costs significantly compared to electric baseboard or oil heating. Combined with available rebates, the total savings can be substantial. Contact us for a personalized assessment."
    },
    {
      question: "Does Greenfoot help with rebate applications?",
      answer: "Yes! Our team guides you through the entire rebate application process, ensuring you maximize your savings and meet all program requirements."
    },
    {
      question: "How long does installation take?",
      answer: "Most mini-split heat pump installations are completed in one day. Larger ducted systems may take 2-3 days depending on the complexity of your home."
    },
    {
      question: "Do you offer financing options?",
      answer: "Yes, we offer flexible financing options to make energy upgrades more accessible. Ask about our low monthly payment plans during your free consultation."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-[#1a1a1a] to-[#333333] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroBackground}
            alt="Energy efficient Canadian home with heat pump" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#8dc63f]/20 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4" />
                Limited Time Offer
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 uppercase tracking-tight">
                Get Up to <span className="text-[#8dc63f]">$15,000</span> Back<br />
                in Rebates on New<br />
                Home Energy Upgrades
              </h1>
              
              <p className="text-xl text-gray-300 mb-6 max-w-lg">
                Discover exclusive energy solutions and limited-time offers tailored for your province. Save thousands on your next green energy upgrade.
              </p>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-[#333333] mb-2">Get Your FREE Energy Assessment</h2>
              <p className="text-slate-600 mb-8">Find out how much you could save with a heat pump or insulation upgrade.</p>
              
              <div className="space-y-4">
                <a 
                  href="https://scheduling.greenfootenergy.ca/?utm_source=landing_page&utm_medium=organic&utm_campaign=new_home_15k_rebate&utm_content=get_assessed_button"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  data-testid="hero-cta-button"
                >
                  Get a Free Assessment <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="/provincial-incentives"
                  className="w-full bg-[#1E5AA8] hover:bg-[#174a8a] text-white font-bold text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  View Provincial Rebates <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="tel:18003809384"
                  className="w-full bg-[#333333] hover:bg-[#222222] text-white font-bold text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  data-testid="hero-phone-button"
                >
                  <Phone className="w-5 h-5" />
                  Call 1 (800) 380-9384
                </a>
              </div>
              
              <a href="/financing" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mt-6 hover:bg-[#8dc63f]/20 transition-colors">
                <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
              </a>
              
              <p className="text-sm text-slate-500 text-center mt-4">
                Speak with a home comfort advisor today.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <img src={expertiseIcon} alt="Expertise" className="w-16 h-16 object-contain" />
              <div>
                <h3 className="font-bold text-[#333333]">Unmatched Expertise</h3>
                <p className="text-sm text-slate-600">With our team of seasoned home comfort advisors.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4"
            >
              <img src={guaranteeIcon} alt="Guaranteed" className="w-16 h-16 object-contain" />
              <div>
                <h3 className="font-bold text-[#333333]">Satisfaction Guaranteed</h3>
                <p className="text-sm text-slate-600">When you experience our customer-oriented service.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <img src={redSealIcon} alt="Red Seal" className="w-16 h-16 object-contain" />
              <div>
                <h3 className="font-bold text-[#333333]">Red Seal Certified</h3>
                <p className="text-sm text-slate-600">Every install is performed by certified technicians.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Province Tabs Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4 uppercase">
              Let Greenfoot <span className="text-[#8dc63f]">Guide You</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Navigating current promotions can be complex and confusing. Greenfoot's expert Home Comfort Advisors will guide you on which promotions you may be eligible for and how to apply.
            </p>
          </motion.div>

          {/* Province Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {provinces.map((province) => (
              <button
                key={province}
                onClick={() => setActiveProvince(province)}
                className={`px-5 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeProvince === province
                    ? "bg-[#8dc63f] text-white shadow-lg"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                data-testid={`province-tab-${province}`}
              >
                {provinceLabels[province]}
              </button>
            ))}
          </div>

          {/* Promotion Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {provinceData[activeProvince].promotions.map((promo, i) => (
              <motion.div
                key={`${activeProvince}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#8dc63f] rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-400 text-sm uppercase tracking-wide">
                      {provinceData[activeProvince].name}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{promo.title}</h3>
                  
                  <p className="text-gray-400 mb-6">{promo.description}</p>
                  
                  <div className="flex flex-col gap-3">
                    <a 
                      href="tel:18003809384"
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#8dc63f]" />
                      1 (800) 380-9384
                    </a>
                    <a 
                      href="https://scheduling.greenfootenergy.ca/?utm_source=landing_page&utm_medium=organic&utm_campaign=new_home_15k_rebate&utm_content=promo_card"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold py-3 px-6 rounded-xl transition-all"
                      data-testid={`promo-cta-${i}`}
                    >
                      {promo.cta} <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
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
              Why Choose <span className="text-[#8dc63f]">Greenfoot</span>
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

      {/* Benefits Section */}
      <section className="py-16 lg:py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 uppercase">
              Why Upgrade Your <span className="text-[#8dc63f]">Home Energy?</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Take advantage of government rebate programs and start saving on your energy bills today.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#8dc63f]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-[#8dc63f]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-300">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4 uppercase">
              Frequently Asked <span className="text-[#8dc63f]">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-[#8dc63f]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 uppercase">
              Ready to Save on Your Energy Upgrade?
            </h2>
            <p className="text-xl text-[#333333]/80 mb-8 max-w-2xl mx-auto">
              Don't miss out on available rebates. Contact us today for your free assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://scheduling.greenfootenergy.ca/?utm_source=landing_page&utm_medium=organic&utm_campaign=new_home_15k_rebate&utm_content=footer_cta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#333333] font-bold text-lg h-14 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:bg-slate-100"
                data-testid="footer-cta-button"
              >
                Get Your Free Quote <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="tel:18003809384"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#333333] text-[#333333] font-bold text-lg h-14 px-8 rounded-xl hover:bg-[#333333]/10 transition-all"
              >
                <Phone className="w-5 h-5" />
                1 (800) 380-9384
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

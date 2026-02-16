import { motion } from "framer-motion";
import { Phone, ChevronDown, ChevronUp, CheckCircle2, Thermometer, Wind, Award, DollarSign, HeartHandshake, Headphones, BadgeDollarSign, Clock, FileCheck, Home, Zap, ThermometerSun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { Link } from "wouter";

import heroBackground from "@assets/pieer-hero-illustration.png";
import yetiHeader from "@assets/yeti_header_1770044719717.webp";
import bcLandscape from "@assets/background_-pieer_1770045282567.webp";
import iconWithDuctwork from "@assets/icon-with-ductwork.svg";
import iconWithoutDuctwork from "@assets/icon-without-ductwork.svg";
import caseStudy1 from "@assets/pieer-case-study-1.jpg";
import caseStudy2 from "@assets/pieer-case-study-2.jpg";

const caseStudies = [
  {
    image: caseStudy1,
    title: "Osoyoos Indian Band",
    location: "Okanagan Valley, BC",
    challenge: "Aging electric baseboard heaters struggling with extreme Okanagan temperature swings—scorching summers and frigid winters left residents uncomfortable and facing high energy bills.",
    solution: "Upgraded 45 homes with high-efficiency heat pump systems, professional ductwork assessments, and enhanced attic insulation over 8 weeks.",
    stats: [
      { value: "9", label: "homes upgraded" },
      { value: "40%", label: "average energy savings" },
      { value: "Year-round", label: "temperature control" },
    ],
  },
  {
    image: caseStudy2,
    title: "Homalco First Nation",
    location: "Vancouver Island, BC",
    challenge: "Coastal humidity and drafty older homes made winters damp and cold. Many homes lacked proper insulation and relied on expensive oil heating.",
    solution: "Installed ductless mini-split systems in 32 homes, added spray foam insulation, and upgraded ventilation systems over the span of 6 weeks.",
    stats: [
      { value: "47", label: "homes upgraded" },
      { value: "55%", label: "average energy savings" },
      { value: "Eliminated", label: "dampness issues" },
    ],
  },
  {
    image: caseStudy2,
    title: "Klahoose First Nation",
    location: "Vancouver Island, BC",
    challenge: "The project required the removal and replacement of aging fiberglass insulation, while also addressing poor air circulation throughout the home.",
    solution: "Removed and properly disposed of old insulation at the local waste management facility. Upgraded thermal efficiency by installing an R50 fiberglass top-up. Installed Energy Recovery Ventilators (ERVs) to optimize healthy air circulation throughout the home.",
    stats: [
      { value: "4", label: "homes upgraded" },
      { value: "55%", label: "average energy savings" },
      { value: "Eliminated", label: "dampness issues" },
    ],
  },
];

const partners = ["BC Hydro", "FortisBC", "HPCN", "Red Seal", "CleanBC"];

const processSteps = [
  {
    step: 1,
    title: "Initial Meeting",
    intro: "Simon meets with your Band's housing authority (less than 1 hour) to discuss community needs and PIEER eligibility.",
    details: [],
  },
  {
    step: 2,
    title: "We Apply for PIEER Funding",
    intro: "Greenfoot handles all applications and government paperwork. Minimal effort required from your team.",
    details: [],
  },
  {
    step: 3,
    title: "Funding Approved",
    intro: "Once approved, Simon coordinates directly with your housing authority and homeowners to schedule assessments and installations.",
    details: [],
  },
  {
    step: 4,
    title: "Professional Installation",
    intro: "Greenfoot's Red Seal certified technicians complete all heating, cooling, and insulation upgrades with respect and care.",
    details: [],
  },
  {
    step: 5,
    title: "Enjoy Lasting Comfort",
    intro: "Your community stays warm in winter, cool in summer, with lower energy costs and ongoing support from our team.",
    details: [],
  },
];

const faqs = [
  {
    question: "How much does this cost our Band or community members?",
    answer: "PIEER funding covers up to $24,000 per home for eligible upgrades. In most cases, this covers the full cost of heating, cooling, and insulation improvements. We provide clear pricing upfront so you know exactly what to expect.",
  },
  {
    question: "How long does the entire process take?",
    answer: "From your initial meeting to completed installations typically takes 8-12 weeks. Once PIEER funding is approved, installation scheduling depends on community size and weather conditions. We work on your timeline.",
  },
  {
    question: "What's required from our housing authority?",
    answer: "Less than one hour for the initial meeting. After that, Greenfoot handles all applications, paperwork, and government coordination. We minimize the administrative burden on your team.",
  },
  {
    question: "What if our homes don't have existing ductwork?",
    answer: "No problem. We install ductless mini split systems that deliver efficient heating and cooling without requiring expensive ductwork. Both ducted and ductless solutions qualify for PIEER funding.",
  },
  {
    question: "Do homeowners need to be present during installation?",
    answer: "Yes, someone needs to be home during the assessment and installation days. We coordinate scheduling directly with your housing authority and residents to find convenient times.",
  },
  {
    question: "What happens if equipment needs service after installation?",
    answer: "All equipment comes with manufacturer warranties, and Greenfoot provides ongoing support. We're here for your community long after installation is complete.",
  },
];

const installationIncludes = [
  { icon: Thermometer, label: "Insulation Assessment & Upgrades" },
  { icon: Wind, label: "Ventilation Solutions" },
  { icon: Award, label: "Red Seal Certified Installation" },
  { icon: DollarSign, label: "Rebate Guidance" },
  { icon: HeartHandshake, label: "Clear, Honest Pricing" },
  { icon: Headphones, label: "Ongoing Support" },
];

export default function PIEERProgramPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>PIEER Program | Indigenous Energy Efficiency Retrofit | Greenfoot Energy Solutions</title>
        <meta name="description" content="The Provincial Indigenous Energy Efficiency Retrofit (PIEER) program provides up to $24,000 per home for heating, cooling, and insulation upgrades for BC First Nations communities." />
      </Helmet>

      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/60 via-slate-700/50 to-slate-800/70"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#8dc63f] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Act now while PIEER funding lasts!
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Year-Round Comfort for<br />
              Your Community
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#8dc63f] mb-6">
              Powered by PIEER
            </h2>

            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Too cold in winter. Too hot in summer. Government funding can fix both, and we'll handle everything.
            </p>

            <Button
              asChild
              className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 py-6 text-lg rounded-xl"
            >
              <a href="#how-it-works">Learn How It Works</a>
            </Button>

            <p className="text-white/60 text-sm mt-8">
              Trusted by BC First Nations Communities
            </p>
          </motion.div>
        </div>
      </section>

      {/* About the Program Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/2 bg-contain bg-right bg-no-repeat hidden lg:block"
          style={{ backgroundImage: `url(${yetiHeader})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <p className="text-[#8dc63f] font-semibold uppercase tracking-wider mb-4">About the Program</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is PIEER?</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                The <strong>Provincial Indigenous Energy Efficiency Retrofit (PIEER)</strong> program provides government funding to help Indigenous communities upgrade heating, cooling, and insulation systems. All BC First Nations communities and Indigenous governing bodies are eligible. Eligible homes can access significant rebates to improve comfort and reduce energy costs.
              </p>

              <div className="bg-slate-900 text-white p-4 rounded-xl inline-flex items-center gap-4">
                <span className="font-semibold">Act now while PIEER funding lasts</span>
                <a 
                  href="tel:+17788656625"
                  className="bg-[#8dc63f] hover:bg-[#7ab535] text-white font-bold px-6 py-2 rounded-lg transition-colors"
                >
                  Click To Call
                </a>
              </div>
            </motion.div>

            {/* Benefits Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 bg-[#8dc63f] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BadgeDollarSign className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Up to $24,000 per Home</h3>
                <p className="text-slate-600">Significant rebates to improve comfort and reduce energy costs.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 bg-[#8dc63f] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Less Than 1 Hour Meeting</h3>
                <p className="text-slate-600">Simon meets with your Band's housing authority and we take care of the rest.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 bg-[#8dc63f] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Zero Paperwork Hassle</h3>
                <p className="text-slate-600">Greenfoot manages the entire PIEER registration and application process.</p>
              </motion.div>
            </div>

            {/* We Handle Everything */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-2xl p-8 text-center"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-3">We Handle Everything</h3>
              <p className="text-slate-600">
                Greenfoot manages the entire PIEER registration process and works directly with your Band's housing authority. Minimal paperwork. No government delays. Just fast, friction-free installations that get your community comfortable.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bcLandscape})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#8dc63f] font-semibold uppercase tracking-wider mb-4">Proven Case Studies</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Proven Results in BC Communities</h2>
            <p className="text-slate-600">Real homes. Real comfort. Real savings.</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.16)] transition-all duration-300"
              >
                <div className="h-52 overflow-hidden">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Home className="w-4 h-4 text-[#8dc63f]" />
                    <p className="text-[#8dc63f] font-semibold text-sm tracking-wider">Case Study</p>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{study.title}</h3>
                  <p className="text-slate-500 text-sm mb-5">{study.location}</p>

                  <div className="mb-5">
                    <p className="font-bold text-slate-900 mb-2">The Challenge</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{study.challenge}</p>
                  </div>

                  <div className="mb-5">
                    <p className="font-bold text-slate-900 mb-2">The Solution</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{study.solution}</p>
                  </div>

                  <div className="space-y-4 pt-5 border-t border-slate-100">
                    {study.stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                          {i === 0 && <Home className="w-6 h-6 text-[#8dc63f]" />}
                          {i === 1 && <Zap className="w-6 h-6 text-[#8dc63f]" />}
                          {i === 2 && <ThermometerSun className="w-6 h-6 text-[#8dc63f]" />}
                        </div>
                        <p className="text-slate-800 font-semibold">{stat.value} {stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partners.map((partner) => (
              <div key={partner} className="text-slate-400 font-bold text-lg md:text-xl tracking-wide">
                {partner}
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-sm mt-6">
            PIEER Program Partner | 20+ Years Experience Serving BC First Nations
          </p>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#8dc63f] font-semibold uppercase tracking-wider mb-4">Our Solutions</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Complete Comfort Solutions for Every Home</h2>
            <p className="text-slate-600">Whether your home has ductwork or not, we have the right solution.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {/* With Ductwork */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <img src={iconWithDuctwork} alt="" className="w-12 h-12" aria-hidden="true" />
                <div className="inline-block bg-[#8dc63f]/10 text-[#8dc63f] text-sm font-semibold px-4 py-2 rounded-full uppercase tracking-wider">
                  With Ductwork
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Central Heating & Cooling System</h3>
              <p className="text-slate-600 mb-6">
                Upgrade to an energy efficient heat pump system that uses your existing ducts to deliver consistent heating in winter and cooling in summer throughout your entire home.
              </p>
              <p className="font-semibold text-slate-900 mb-3">What's Included:</p>
              <ul className="space-y-2">
                {[
                  "High efficiency heat pump installation",
                  "Professional ductwork assessment and upgrades",
                  "Programmable thermostat",
                  "Complete system commissioning",
                  "PIEER funding application and management",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Without Ductwork */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <img src={iconWithoutDuctwork} alt="" className="w-12 h-12" aria-hidden="true" />
                <div className="inline-block bg-[#8dc63f]/10 text-[#8dc63f] text-sm font-semibold px-4 py-2 rounded-full uppercase tracking-wider">
                  Without Ductwork
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Mini Split Heating & Cooling System</h3>
              <p className="text-slate-600 mb-6">
                Install ductless mini split heat pumps that provide zone-by-zone heating and cooling without the need for expensive ductwork installation.
              </p>
              <p className="font-semibold text-slate-900 mb-3">What's Included:</p>
              <ul className="space-y-2">
                {[
                  "Ductless mini split heat pump installation",
                  "Indoor and outdoor unit setup",
                  "Multi-zone capability (heat/cool different rooms)",
                  "Remote control operation",
                  "PIEER funding application and management",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Installation Includes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <p className="text-center font-semibold text-slate-900 mb-6">Every Installation Also Includes:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {installationIncludes.map((item, i) => (
                <div key={i} className="bg-slate-900 text-white rounded-xl p-4 text-center">
                  <item.icon className="w-8 h-8 mx-auto mb-2 text-[#8dc63f]" />
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#8dc63f] font-semibold uppercase tracking-wider mb-4">The Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">How It Works</h2>
            <p className="text-slate-600">5 simple steps from initial meeting to complete comfort.</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, i) => (
              <ScrollStepItem key={i} step={step} index={i} total={processSteps.length} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#8dc63f] font-semibold uppercase tracking-wider mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Common Questions About PIEER Funding</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                  aria-expanded={openFaq === index}
                  data-testid={`faq-toggle-${index}`}
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[#8dc63f] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-slate-600">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Still Have Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-4">Still have questions?</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+17788656625"
                className="inline-flex items-center gap-2 bg-[#8dc63f] hover:bg-[#7ab535] text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                <Phone className="w-5 h-5" />
                Click to Call Simon
              </a>
              <a
                href="mailto:simon@bakerbrothersconsulting.com"
                className="text-slate-600 hover:text-[#8dc63f] transition-colors"
              >
                simon@bakerbrothersconsulting.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

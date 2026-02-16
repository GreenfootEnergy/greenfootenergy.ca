import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";

import secondMountain from "@assets/second-mountain_1769270759228.avif";
import thirdMountain from "@assets/third-mountain_1769270759228.avif";
import lastMountain from "@assets/last-mountain_1769270759228.avif";
import backgroundMembership from "@assets/Background-membership_1769275940809.avif";
import peakProducts from "@assets/3_peak_products_1769270532337.avif";
import peakLogoWhite from "@assets/peak-logo_1769276592925.avif";
import mobileWifiIcon from "@assets/Mobile_Wifi_1769271244056.png";
import smartClimateIcon from "@assets/smart-climate_1769271244056.png";
import monitoringIcon from "@assets/monitoring_1769271244056.png";
import directLineIcon from "@assets/direct-line_1769271244055.png";
import maintenanceHero from "@assets/heat-pump-maintenance-2.webp";
import peakThermostatHero from "@assets/peak-thermostat-display.webp";
import peakAppPhone from "@assets/peak-app-phone.png";
import peakPromoBackground from "@assets/peak-forest-background.webp";
import peakLogoDark from "@assets/peak-logo-dark.png";
import clubMemberBadge from "@assets/club-member-badge.avif";
import { Helmet } from "react-helmet";

interface PlanFeature {
  label: string;
  base: string;
  summit: string;
  peak: string;
}

const planFeatures: PlanFeature[] = [
  { label: "Remote Monitoring", base: "N/A", summit: "Included with Peak Thermostat", peak: "Included with Peak Thermostat" },
  { label: "Discount on Peak Thermostat", base: "N/A", summit: "25% Off", peak: "50% Off" },
  { label: "Diagnostic Fees", base: "25% Off Diagnostic Fees", summit: "50% Off Diagnostic Fees", peak: "No Diagnostic Fees*" },
  { label: "Discount on Repairs (Parts & Labor)", base: "N/A", summit: "10%", peak: "20%" },
  { label: "IAQ Products & Media Discount", base: "N/A", summit: "10%", peak: "20%" },
  { label: "Replacement Parts & Labor", base: "1 year (with active membership)**", summit: "2 years (with active membership)**", peak: "5 years (with active membership)**" },
  { label: "Membership Hotline", base: "1-877-VIP-YETI", summit: "1-877-VIP-YETI", peak: "1-877-VIP-YETI" },
  { label: "Seasonal Tune Up", base: "1 per year", summit: "2 per year", peak: "2 per year" },
  { label: "Ductless Indoor Cleaning (once per year)", base: "Included", summit: "Included", peak: "Included" },
  { label: "Filter Maintenance", base: "1 per year***", summit: "2 per year***", peak: "4 per year***" },
  { label: "10-Point Check-Up During Filter Change", base: "N/A", summit: "N/A", peak: "Yes" },
  { label: "Whole Home Assessment", base: "Free upon sign-up", summit: "Free upon sign-up", peak: "Free upon sign-up" },
  { label: "Warranty Processing Fee", base: "$75", summit: "Included", peak: "Included" },
  { label: "Visit Cadence", base: "1 visit per year", summit: "2 visits per year", peak: "4 visits per year" },
];

interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  visits: number;
  diagnosticDiscount: string;
  heatingCooling: string | boolean;
  remoteMonitoring: string;
  peakDiscount: string;
  mountainImage: string;
  bgColor: string;
  headerBg: string;
}

const plans: Plan[] = [
  {
    id: "base",
    name: "YETI Base Plan",
    tagline: "Essential HVAC maintenance for your home",
    price: 14,
    visits: 1,
    diagnosticDiscount: "25% Off",
    heatingCooling: "Heating Only",
    remoteMonitoring: "Not Included",
    peakDiscount: "Not Included",
    mountainImage: secondMountain,
    bgColor: "bg-gray-100",
    headerBg: "bg-gradient-to-b from-[#6b7280] to-[#9ca3af]",
  },
  {
    id: "summit",
    name: "YETI Summit Plan",
    tagline: "Enhanced protection with additional benefits",
    price: 25,
    visits: 2,
    diagnosticDiscount: "50% Off",
    heatingCooling: true,
    remoteMonitoring: "With Peak Thermostat",
    peakDiscount: "25% Off",
    mountainImage: thirdMountain,
    bgColor: "bg-gray-50",
    headerBg: "bg-gradient-to-b from-[#4b5563] to-[#6b7280]",
  },
  {
    id: "peak",
    name: "YETI Peak Plan",
    tagline: "Ultimate HVAC care with maximum savings",
    price: 45,
    visits: 4,
    diagnosticDiscount: "100% Off",
    heatingCooling: true,
    remoteMonitoring: "With Peak Thermostat",
    peakDiscount: "50% Off",
    mountainImage: lastMountain,
    bgColor: "bg-gray-50",
    headerBg: "bg-gradient-to-b from-[#4a6f35] to-[#6b9b4a]",
  },
];

function PlanCard({ plan, isExpanded, onToggle }: { plan: Plan; isExpanded: boolean; onToggle: () => void }) {
  const featureKey = plan.id as "base" | "summit" | "peak";
  
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className={`relative ${plan.headerBg} overflow-hidden cursor-pointer`}
        onClick={onToggle}
        data-testid={`plan-header-${plan.id}`}
      >
        <div className="px-6 pt-4 pb-20 relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-white" />
              <h3 className="text-lg font-bold text-white" data-testid={`plan-name-${plan.id}`}>{plan.name}</h3>
            </div>
            <ChevronDown 
              className={`w-6 h-6 text-white transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
          <p className="text-white/80 text-sm mt-1 ml-7">{plan.tagline}</p>
        </div>
        <img
          src={plan.mountainImage}
          alt=""
          className="absolute -bottom-6 left-0 right-0 w-full h-auto"
        />
      </div>

      <div className="p-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-[#333333]" data-testid={`plan-price-${plan.id}`}>${plan.price}</span>
          <span className="text-gray-600">/month</span>
        </div>
        <p className="text-sm text-gray-700 font-medium">Main Equipment</p>
        <p className="text-xs text-gray-500">Additional equipment: $10/month</p>

        <div className="mt-4 inline-block border border-gray-300 rounded-full px-4 py-1.5 text-sm text-gray-700">
          {plan.visits} visit{plan.visits > 1 ? "s" : ""} per year
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Diagnostic Fees:</span>
            <span className="font-semibold text-[#333333] text-sm">{plan.diagnosticDiscount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Heating & Cooling Tune-Ups:</span>
            {typeof plan.heatingCooling === "boolean" ? (
              <Check className="w-5 h-5 text-[#8dc63f]" />
            ) : (
              <span className="font-semibold text-[#333333] text-sm">{plan.heatingCooling}</span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Remote Monitoring:</span>
            <span className="font-semibold text-[#333333] text-sm">{plan.remoteMonitoring}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Peak Discount:</span>
            <span className="font-semibold text-[#333333] text-sm">{plan.peakDiscount}</span>
          </div>
        </div>

        <button
          onClick={onToggle}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700"
          data-testid={`plan-toggle-${plan.id}`}
        >
          Click to view details
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-200 pt-4">
              <div className="space-y-3">
                {planFeatures.map((feature, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-600 text-sm">{feature.label}</span>
                    <span className="font-medium text-[#333333] text-sm text-right max-w-[50%]">
                      {feature[featureKey]}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-base sm:text-lg h-12 sm:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => window.open("https://maintenance.serviceyeti.com/maintenance-packages", "_blank")}
                data-testid={`plan-signup-${plan.id}`}
              >
                Sign Up Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function MembershipPlans() {
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  const togglePlan = (planId: string) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "YETI HVAC Maintenance Membership Plans",
    "description": "Professional HVAC maintenance plans from Greenfoot Energy Solutions. Choose from Base, Summit, or Peak plans for regular tune-ups, priority service, and exclusive discounts on repairs.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Greenfoot Energy Solutions",
      "telephone": "+1-888-634-9384",
      "url": "https://www.greenfootenergy.ca"
    },
    "areaServed": ["British Columbia", "Nova Scotia", "New Brunswick", "Prince Edward Island", "Newfoundland"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "YETI Membership Plans",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "YETI Base Plan",
          "price": "14",
          "priceCurrency": "CAD",
          "description": "Essential HVAC maintenance for your home with 1 visit per year"
        },
        {
          "@type": "Offer",
          "name": "YETI Summit Plan",
          "price": "25",
          "priceCurrency": "CAD",
          "description": "Enhanced protection with additional benefits and 2 visits per year"
        },
        {
          "@type": "Offer",
          "name": "YETI Peak Plan",
          "price": "45",
          "priceCurrency": "CAD",
          "description": "Ultimate HVAC care with maximum savings and 4 visits per year"
        }
      ]
    }
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is included in a YETI HVAC maintenance plan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "YETI maintenance plans include annual tune-ups, diagnostic fee discounts, filter changes, 30-point inspections, and whole home assessments. Higher-tier plans include remote monitoring with Peak Thermostat, repair discounts, and priority service."
        }
      },
      {
        "@type": "Question",
        "name": "How much does an HVAC maintenance plan cost in Canada?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Greenfoot's YETI plans start at $14/month for the Base Plan, $25/month for the Summit Plan, and $45/month for the Peak Plan. Additional equipment coverage is available for $10/month per unit."
        }
      },
      {
        "@type": "Question",
        "name": "Why should I get an HVAC maintenance plan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Regular HVAC maintenance extends equipment lifespan, improves energy efficiency, prevents costly breakdowns, and ensures optimal home comfort. Membership plans provide discounted diagnostics, priority service, and peace of mind."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>HVAC Maintenance Plans | YETI Membership | Greenfoot Energy Solutions</title>
        <meta name="description" content="Choose from YETI Base, Summit, or Peak HVAC maintenance plans. Professional heat pump tune-ups, priority service, and repair discounts starting at $14/month. Serving Atlantic Canada & BC." />
        <meta name="keywords" content="HVAC maintenance plan, heat pump maintenance, AC tune-up, furnace maintenance, YETI membership, Greenfoot Energy" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/membership-plans" />
        <meta property="og:title" content="HVAC Maintenance Plans | YETI Membership | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Choose from YETI Base, Summit, or Peak HVAC maintenance plans. Professional heat pump tune-ups and repair discounts starting at $14/month." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/membership-plans" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HVAC Maintenance Plans | YETI Membership | Greenfoot Energy" />
        <meta name="twitter:description" content="YETI Base, Summit, or Peak HVAC maintenance plans with professional heat pump tune-ups starting at $14/month." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqData)}</script>
      </Helmet>
      
      <SiteHeader />

      <section className="bg-[#333333] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-2xl md:text-3xl font-medium mb-2">
            Join our <span className="text-[#8dc63f]">Yeti Membership</span> Service Plan
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button
              className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-base sm:text-lg px-8 h-12 sm:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              onClick={() => window.open("https://maintenance.serviceyeti.com/maintenance-packages", "_blank")}
              data-testid="button-signup-hero"
            >
              Sign Up Now
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-bold text-base sm:text-lg px-8 h-12 sm:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              onClick={() => window.location.href = "tel:+18886349384"}
              data-testid="button-call-hero"
            >
              Call Service-Yeti
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-[#333333] uppercase" data-testid="text-page-title">
              Choose Your YETI Service Plan
            </h1>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Professional HVAC maintenance plans designed to keep your home comfortable year-round
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isExpanded={expandedPlan === plan.id}
                onToggle={() => togglePlan(plan.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={maintenanceHero} 
                alt="Service-Yeti technician performing heat pump maintenance at a residential property" 
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#333333] mb-6">Why Choose YETI Maintenance?</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#8dc63f] font-bold text-xl">✓</span>
                  <span><strong>Certified Technicians</strong> – Our experts are trained to service all major heat pump brands</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8dc63f] font-bold text-xl">✓</span>
                  <span><strong>Priority Service</strong> – Members get fast-tracked scheduling when issues arise</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8dc63f] font-bold text-xl">✓</span>
                  <span><strong>Extended Equipment Life</strong> – Regular maintenance prevents costly breakdowns</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8dc63f] font-bold text-xl">✓</span>
                  <span><strong>Energy Savings</strong> – Well-maintained systems run more efficiently</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section 
        className="relative pt-4 px-4 overflow-hidden bg-cover bg-top bg-no-repeat min-h-[700px] pb-[320px]"
        style={{ backgroundImage: `url(${peakPromoBackground})` }}
      >
        <div className="relative max-w-7xl mx-auto">
          {/* Peak Logo - Top Left */}
          <div className="mb-2">
            <img
              src={peakLogoWhite}
              alt="PEAK"
              className="h-20 md:h-24 invert"
            />
          </div>

          {/* Main Content */}
          <div className="relative min-h-[350px]">
            {/* Thermostat - Large and Centered */}
            <div className="flex justify-center">
              <img
                src={peakThermostatHero}
                alt="Peak Series Smart Thermostat"
                className="w-80 md:w-[450px] lg:w-[520px]"
              />
            </div>

            {/* Phone App - Bottom Left, Smaller */}
            <div className="absolute left-0 bottom-0 z-20 hidden md:block">
              <img
                src={peakAppPhone}
                alt="Peak App on Phone"
                className="w-32 lg:w-40 drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
        
        {/* Bottom Content with Full-Width Gray Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-700/90 via-gray-600/70 to-transparent">
          <div className="max-w-7xl mx-auto text-center py-8 px-4">
            <p className="text-3xl md:text-4xl font-black mb-4">
              <span className="text-[#f5a623]">ONLY $699</span>
              <span className="text-white text-2xl ml-2">+tax</span>
            </p>
            
            <img
              src={clubMemberBadge}
              alt="Club Member Greenfoot"
              className="h-28 md:h-36 mx-auto mb-4"
            />
            
            <p className="text-2xl md:text-3xl text-white font-medium">
              Save 50% today on your
            </p>
            <p className="text-3xl md:text-4xl text-white font-black uppercase tracking-wide">
              PEAK THERMOSTAT
            </p>
            <p className="text-xl md:text-2xl text-white font-medium">
              by joining our Peak Membership Plan
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

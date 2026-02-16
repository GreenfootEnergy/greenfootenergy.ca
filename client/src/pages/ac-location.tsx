import { motion } from "framer-motion";
import { Phone, Star, Check, Wrench, Settings, MapPin, Calendar, ArrowRight, ChevronDown, Snowflake, Wind, Zap, Shield, ThermometerSun, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { useState } from "react";
import { X } from "lucide-react";
import { useRoute } from "wouter";
import { locations } from "@/data/locations";
import { Helmet } from "react-helmet";

import acUnitsImage from "@assets/ac-units-gridless.webp";
import heroBg from "@assets/ac-family-gridless-hero.webp";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

interface Location {
  id: string;
  name: string;
  slug: string;
  city: string;
  province: string;
  address: string;
  postalCode: string;
  phone: string;
}

const provinceAbbreviations: Record<string, string> = {
  "Nova Scotia": "NS",
  "New Brunswick": "NB",
  "Prince Edward Island": "PEI",
  "Newfoundland": "NL",
  "British Columbia": "BC",
};

interface CityClimateData {
  summerTemp: string;
  humidity: string;
  coolingMonths: string;
  challenges: string[];
  benefits: string[];
  heroTagline: string;
  heroDescription: string;
  climateDescription: string;
  nearbyAreas: string[];
  utilityName: string;
}

const cityClimateData: Record<string, CityClimateData> = {
  "Dartmouth": {
    summerTemp: "22°C to 28°C",
    humidity: "High (70-85%)",
    coolingMonths: "June through September",
    challenges: [
      "Harbour humidity creates sticky, uncomfortable conditions indoors",
      "Coastal fog followed by sudden heat spikes strain window units",
      "Older homes in North End and Portland Hills lack central air",
      "Salt air requires corrosion-resistant outdoor equipment"
    ],
    benefits: [
      "Ductless mini-splits cool efficiently without major renovations",
      "Built-in dehumidification removes moisture from humid air",
      "Zone control lets you cool bedrooms at night without wasting energy",
      "Whisper-quiet operation ideal for Dartmouth's residential areas"
    ],
    heroTagline: "Beat the Harbour Heat with Efficient Cooling",
    heroDescription: "From Cole Harbour to Woodlawn, Dartmouth summers bring humidity that makes indoor spaces uncomfortable. Our mini-split AC systems deliver cool, dry comfort without the hassle of ductwork.",
    climateDescription: "Dartmouth experiences warm, humid summers with temperatures regularly reaching 25-28°C. The Halifax Harbour proximity creates sticky conditions that make air conditioning essential for comfort. July and August bring the peak cooling season, with humidity levels often exceeding 80%.",
    nearbyAreas: ["Cole Harbour", "Eastern Passage", "Woodlawn", "Lake Banook", "Portland Hills", "Burnside"],
    utilityName: "Nova Scotia Power"
  },
  "Sydney": {
    summerTemp: "20°C to 26°C",
    humidity: "Moderate to High (65-80%)",
    coolingMonths: "Late June through August",
    challenges: [
      "Cape Breton's variable weather creates unpredictable cooling needs",
      "Older industrial-era homes have poor natural ventilation",
      "Humidity from surrounding lakes affects indoor comfort",
      "Limited HVAC service options in Cape Breton region"
    ],
    benefits: [
      "Local Greenfoot team provides fast Cape Breton service",
      "Heat pump AC provides both summer cooling and winter heating",
      "Efficient systems reduce reliance on expensive electric baseboard",
      "Quiet operation suits Sydney's peaceful residential neighborhoods"
    ],
    heroTagline: "Cape Breton's Trusted Cooling Experts",
    heroDescription: "Sydney summers may be shorter, but humid days still demand reliable cooling. Our local Cape Breton team delivers professional AC installation with ongoing support you can count on.",
    climateDescription: "Sydney enjoys milder summers than mainland Nova Scotia, but humidity from the Bras d'Or Lakes and Atlantic creates uncomfortable indoor conditions. Peak cooling demand hits in July and August when temperatures combine with moisture-laden air.",
    nearbyAreas: ["Glace Bay", "New Waterford", "North Sydney", "Sydney Mines", "Louisbourg", "Bras d'Or"],
    utilityName: "Nova Scotia Power"
  },
  "Bridgewater": {
    summerTemp: "21°C to 27°C",
    humidity: "Moderate to High (65-80%)",
    coolingMonths: "June through September",
    challenges: [
      "LaHave River valley traps humid air on still summer days",
      "Rural homes often lack access to natural gas for cooling alternatives",
      "Older farmhouses and heritage properties need ductless solutions",
      "Distance from Halifax means longer wait times for some contractors"
    ],
    benefits: [
      "Local South Shore service team responds quickly to Bridgewater area",
      "Ductless systems perfect for homes without existing ductwork",
      "Heat pump technology provides heating value in winter months",
      "Efficient cooling reduces summer electricity costs significantly"
    ],
    heroTagline: "South Shore Cooling Done Right",
    heroDescription: "Bridgewater and the South Shore deserve the same quality AC service as urban centres. Our local team brings professional installation and reliable support to Lunenburg County homeowners.",
    climateDescription: "Bridgewater sits in the LaHave River valley where summer humidity can accumulate on calm days. July and August bring temperatures in the mid-20s that feel much warmer due to moisture levels. The South Shore's rural character means many homes lack central air options.",
    nearbyAreas: ["Lunenburg", "Mahone Bay", "Chester", "Liverpool", "New Germany", "Cookville"],
    utilityName: "Nova Scotia Power"
  },
  "Kentville": {
    summerTemp: "22°C to 28°C",
    humidity: "Moderate (60-75%)",
    coolingMonths: "June through September",
    challenges: [
      "Annapolis Valley heat gets trapped between North and South mountains",
      "Agricultural work schedules make daytime home cooling essential",
      "Older orchard-area homes lack modern HVAC infrastructure",
      "Pollen and dust from farming operations affect air quality"
    ],
    benefits: [
      "Mini-splits with filtration improve indoor air quality",
      "Zone control cools working areas during hot harvest days",
      "Efficient systems handle Valley's warmer-than-coastal temperatures",
      "Dual heating/cooling eliminates need for separate systems"
    ],
    heroTagline: "Valley-Smart Cooling for Kentville Homes",
    heroDescription: "The Annapolis Valley's unique geography creates some of Nova Scotia's warmest summers. Our cooling solutions are designed for Valley conditions, keeping your home comfortable through harvest season and beyond.",
    climateDescription: "Kentville and the Annapolis Valley experience warmer summers than coastal Nova Scotia due to the sheltering effect of North and South mountains. Temperatures regularly reach 28°C+ with lower humidity than coastal areas, creating ideal conditions for efficient air conditioning.",
    nearbyAreas: ["Wolfville", "New Minas", "Coldbrook", "Berwick", "Canning", "Port Williams"],
    utilityName: "Nova Scotia Power"
  },
  "New Glasgow": {
    summerTemp: "21°C to 27°C",
    humidity: "Moderate to High (65-80%)",
    coolingMonths: "June through September",
    challenges: [
      "Pictou County summers combine heat with Northumberland Strait humidity",
      "Industrial heritage homes have limited ventilation options",
      "Coal-era construction makes duct installation challenging",
      "Older HVAC systems common in established neighborhoods"
    ],
    benefits: [
      "Ductless installation preserves character of older New Glasgow homes",
      "Local Pictou County service team provides responsive support",
      "Modern heat pumps replace inefficient window units",
      "Dehumidification mode addresses strait-sourced moisture"
    ],
    heroTagline: "Pictou County's Professional Cooling Team",
    heroDescription: "New Glasgow's industrial heritage means many homes weren't built with AC in mind. Our ductless solutions bring modern comfort to Pictou County properties without major construction.",
    climateDescription: "New Glasgow experiences warm, humid summers influenced by the Northumberland Strait. The town's location creates conditions where temperatures in the mid-20s feel significantly warmer due to moisture. July and August are peak cooling months.",
    nearbyAreas: ["Stellarton", "Westville", "Trenton", "Pictou", "Antigonish", "Truro"],
    utilityName: "Nova Scotia Power"
  },
  "Moncton": {
    summerTemp: "22°C to 29°C",
    humidity: "High (70-85%)",
    coolingMonths: "June through September",
    challenges: [
      "Petitcodiac River valley traps summer humidity",
      "Greater Moncton's rapid growth outpaces HVAC infrastructure",
      "Bilingual service requirements limit contractor options",
      "New construction in Dieppe and Riverview needs efficient cooling"
    ],
    benefits: [
      "Bilingual technicians serve all Greater Moncton communities",
      "Efficient systems handle New Brunswick's hottest summer temperatures",
      "Zone control ideal for Moncton's popular bi-level home designs",
      "Local rebate programs reduce installation costs"
    ],
    heroTagline: "Greater Moncton's Cooling Specialists",
    heroDescription: "From downtown Moncton to growing Dieppe and Riverview, Hub City summers demand serious cooling. Our bilingual team delivers efficient AC solutions for the Maritimes' fastest-growing metro area.",
    climateDescription: "Moncton experiences New Brunswick's warmest summers, with temperatures regularly exceeding 28°C in July and August. The Petitcodiac River valley creates humid conditions that make air conditioning essential. Greater Moncton's rapid growth has increased demand for efficient cooling solutions.",
    nearbyAreas: ["Dieppe", "Riverview", "Shediac", "Salisbury", "Memramcook", "Petitcodiac"],
    utilityName: "NB Power"
  },
  "Fredericton": {
    summerTemp: "23°C to 30°C",
    humidity: "Moderate to High (65-80%)",
    coolingMonths: "June through September",
    challenges: [
      "Saint John River valley experiences New Brunswick's highest temperatures",
      "Government and university buildings set high cooling expectations",
      "Heritage homes in downtown core lack central air systems",
      "Humid continental climate creates uncomfortable July-August conditions"
    ],
    benefits: [
      "Ductless systems preserve character of Fredericton heritage properties",
      "Efficient cooling matches standards of modern office buildings",
      "Heat pump technology provides value year-round in cold winters",
      "Provincial capital location means fast access to parts and service"
    ],
    heroTagline: "Capital City Comfort All Summer Long",
    heroDescription: "Fredericton's river valley location creates some of New Brunswick's hottest summer days. Our professional AC installations keep your home as comfortable as the capital's modern office towers.",
    climateDescription: "Fredericton sits in the Saint John River valley where summer temperatures frequently reach 30°C—among the highest in Atlantic Canada. The city's inland location means less coastal moderation, creating genuine demand for air conditioning from June through September.",
    nearbyAreas: ["Oromocto", "New Maryland", "Hanwell", "Lincoln", "Douglas", "Maugerville"],
    utilityName: "NB Power"
  },
  "Saint John": {
    summerTemp: "20°C to 26°C",
    humidity: "High (75-90%)",
    coolingMonths: "June through September",
    challenges: [
      "Bay of Fundy fog creates intense humidity on clearing days",
      "Historic Uptown buildings have limited renovation flexibility",
      "Industrial waterfront areas experience temperature extremes",
      "Salt air from harbour requires durable outdoor equipment"
    ],
    benefits: [
      "Ductless systems install easily in Saint John's older row houses",
      "Powerful dehumidification handles Fundy's famous fog moisture",
      "Corrosion-resistant units withstand harbour-area salt exposure",
      "Zone control suits multi-level Victorian-era homes"
    ],
    heroTagline: "Fundy-Ready Cooling for Port City Homes",
    heroDescription: "Saint John's unique Bay of Fundy climate brings fog that clears into sticky summer heat. Our AC systems are selected for maritime durability and powerful dehumidification.",
    climateDescription: "Saint John experiences a maritime climate heavily influenced by the Bay of Fundy. Summer temperatures are moderated by ocean air, but humidity levels are among the highest in Canada. When fog lifts, the resulting heat and moisture create immediate demand for indoor cooling.",
    nearbyAreas: ["Rothesay", "Quispamsis", "Grand Bay-Westfield", "Hampton", "St. Martins", "Sussex"],
    utilityName: "NB Power"
  },
  "Tracadie-Sheila": {
    summerTemp: "21°C to 27°C",
    humidity: "Moderate to High (65-80%)",
    coolingMonths: "Late June through August",
    challenges: [
      "Acadian Peninsula's coastal location creates humid summer conditions",
      "Limited French-language HVAC service providers in the region",
      "Rural properties often lack existing ductwork infrastructure",
      "Distance from major centres affects contractor response times"
    ],
    benefits: [
      "Bilingual technicians serve Acadian communities in their language",
      "Local presence means faster response than distant contractors",
      "Ductless systems perfect for peninsula's older housing stock",
      "Heat pump AC provides both summer cooling and winter heating"
    ],
    heroTagline: "Service bilingue pour la Péninsule acadienne",
    heroDescription: "Les étés sur la Péninsule acadienne apportent chaleur et humidité. Notre équipe bilingue offre des solutions de climatisation professionnelles aux propriétaires de Tracadie-Sheila et des environs.",
    climateDescription: "Tracadie-Sheila and the Acadian Peninsula experience warm, humid summers moderated by Gulf of St. Lawrence breezes. July and August bring peak cooling demand when temperatures combine with coastal moisture to create uncomfortable indoor conditions.",
    nearbyAreas: ["Caraquet", "Shippagan", "Neguac", "Bathurst", "Pokemouche", "Paquetville"],
    utilityName: "NB Power"
  },
  "Charlottetown": {
    summerTemp: "20°C to 26°C",
    humidity: "Moderate to High (70-85%)",
    coolingMonths: "June through September",
    challenges: [
      "Island humidity from surrounding Gulf creates sticky summer conditions",
      "Heritage downtown properties require sensitive installation approaches",
      "Tourism season increases demand for reliable business cooling",
      "Limited local HVAC competition reduces service options"
    ],
    benefits: [
      "Dedicated PEI service team understands Island conditions",
      "Ductless systems preserve character of Victorian-era homes",
      "Efficient cooling for homes and tourism-related businesses",
      "Year-round heat pump value for PEI's cold winters"
    ],
    heroTagline: "Island-Wide Cooling Excellence",
    heroDescription: "Charlottetown summers bring warmth and Gulf humidity that heritage homes weren't designed to handle. Our PEI team delivers modern cooling comfort while respecting your property's character.",
    climateDescription: "Charlottetown enjoys a maritime climate with warm, humid summers. The Gulf of St. Lawrence surrounds PEI, creating moisture-laden air that makes air conditioning valuable even on moderately warm days. Tourism season coincides with peak cooling demand.",
    nearbyAreas: ["Stratford", "Cornwall", "Summerside", "Montague", "Souris", "North Shore"],
    utilityName: "Maritime Electric"
  },
  "Paradise": {
    summerTemp: "18°C to 24°C",
    humidity: "Moderate to High (70-85%)",
    coolingMonths: "July through August",
    challenges: [
      "Newfoundland's short cooling season makes system selection critical",
      "High humidity despite moderate temperatures creates discomfort",
      "Rapid weather changes stress less durable equipment",
      "Limited HVAC service options in St. John's metro area"
    ],
    benefits: [
      "Heat pump AC provides primary value as winter heating system",
      "Dehumidification improves summer comfort at any temperature",
      "Efficient systems handle Newfoundland's mild but damp conditions",
      "Local service team responds quickly to Paradise-area calls"
    ],
    heroTagline: "Year-Round Comfort for Newfoundland Homes",
    heroDescription: "Paradise and St. John's metro may have short summers, but humidity makes cooling worthwhile—and our heat pump systems deliver even greater value as efficient winter heating.",
    climateDescription: "Paradise experiences a maritime climate with cool, humid summers. While temperatures rarely exceed 24°C, the persistent moisture from the Atlantic makes dehumidification valuable. The real value of AC heat pumps in Newfoundland comes from their efficient winter heating capabilities.",
    nearbyAreas: ["St. John's", "Mount Pearl", "Conception Bay South", "Portugal Cove-St. Philip's", "Torbay", "Goulds"],
    utilityName: "Newfoundland Power"
  },
  "Victoria": {
    summerTemp: "19°C to 25°C",
    humidity: "Low to Moderate (50-65%)",
    coolingMonths: "June through September",
    challenges: [
      "Climate change bringing unprecedented heat waves to the Island",
      "Many older homes built without AC are now uncomfortably warm",
      "Heritage character of James Bay and Oak Bay limits options",
      "Expectations of mild climate left homeowners unprepared for heat"
    ],
    benefits: [
      "Ductless systems protect against increasingly common heat events",
      "Minimal installation footprint suits Victoria's character homes",
      "Efficient cooling without the environmental guilt",
      "Heat pump provides bonus heating for Victoria's damp winters"
    ],
    heroTagline: "Heat-Wave Ready Cooling for the Island",
    heroDescription: "Victoria's legendary mild climate is changing. Recent heat domes showed Island homes need air conditioning. Our ductless solutions deliver peace of mind without compromising your home's character.",
    climateDescription: "Victoria traditionally enjoyed Canada's mildest climate, but recent heat events have changed expectations. The 2021 heat dome saw temperatures exceed 40°C, creating urgent demand for air conditioning. Summers now regularly include multi-day heat waves requiring active cooling.",
    nearbyAreas: ["Saanich", "Oak Bay", "Esquimalt", "Colwood", "Langford", "Sidney"],
    utilityName: "BC Hydro"
  },
  "Surrey": {
    summerTemp: "22°C to 30°C",
    humidity: "Moderate (55-70%)",
    coolingMonths: "June through September",
    challenges: [
      "Metro Vancouver's largest city experiences urban heat island effects",
      "Rapid development means many homes have inadequate cooling",
      "Diverse housing stock from 1960s ranchers to new townhomes",
      "Air quality concerns during wildfire season require filtration"
    ],
    benefits: [
      "Ductless systems suit Surrey's varied housing types",
      "Built-in filtration helps during smoky summer periods",
      "Efficient cooling for multi-generational family homes",
      "Local Surrey service team responds same-day when possible"
    ],
    heroTagline: "Surrey's Trusted Cooling Professionals",
    heroDescription: "From Newton to South Surrey, our city experiences real summer heat. We provide efficient AC solutions for Surrey's diverse homes, from established neighborhoods to new developments.",
    climateDescription: "Surrey experiences warm summers intensified by urban development and distance from ocean cooling. Temperatures regularly exceed 28°C with heat waves pushing past 35°C. The city's diverse neighborhoods—from leafy Panorama Ridge to dense Whalley—all benefit from air conditioning.",
    nearbyAreas: ["White Rock", "Delta", "Langley", "New Westminster", "Burnaby", "Cloverdale"],
    utilityName: "BC Hydro"
  },
  "Langley": {
    summerTemp: "22°C to 31°C",
    humidity: "Moderate (55-70%)",
    coolingMonths: "June through September",
    challenges: [
      "Fraser Valley location brings hotter temperatures than coastal areas",
      "Rural-urban mix includes farms, subdivisions, and townhomes",
      "Horse country properties often have specialized building needs",
      "Wildfire smoke from Interior affects summer air quality"
    ],
    benefits: [
      "Ductless systems work for Langley's varied property types",
      "Powerful cooling handles Valley's warmest summer days",
      "Filtration options address smoke and agricultural dust",
      "Zone control efficient for large rural properties"
    ],
    heroTagline: "Fraser Valley Cooling Experts",
    heroDescription: "Langley sits where the Fraser Valley starts to heat up. From Walnut Grove condos to Aldergrove acreages, we deliver AC solutions matched to your property's unique needs.",
    climateDescription: "Langley experiences significantly warmer summers than coastal Vancouver due to its Fraser Valley location. The valley acts as a heat trap, with temperatures regularly reaching 30°C and heat waves exceeding 35°C. Air conditioning has become essential for comfortable living.",
    nearbyAreas: ["Aldergrove", "Walnut Grove", "Murrayville", "Fort Langley", "Brookswood", "Willoughby"],
    utilityName: "BC Hydro"
  },
  "Abbotsford": {
    summerTemp: "23°C to 32°C",
    humidity: "Moderate (55-70%)",
    coolingMonths: "June through September",
    challenges: [
      "Central Fraser Valley location brings some of BC's hottest temperatures",
      "Agricultural community experiences dust and air quality challenges",
      "Mix of urban development and rural properties requires flexible solutions",
      "Mountain backdrop can trap heat in the valley floor"
    ],
    benefits: [
      "Powerful cooling systems handle Abbotsford's peak summer heat",
      "Filtration addresses agricultural dust and wildfire smoke",
      "Ductless options suit both new builds and older farm homes",
      "Energy-efficient systems reduce summer electricity costs"
    ],
    heroTagline: "Serious Cooling for Serious Valley Heat",
    heroDescription: "Abbotsford regularly records BC's highest temperatures. Our AC systems are sized for real Fraser Valley heat, not coastal assumptions—because your comfort shouldn't depend on hoping for a cool breeze.",
    climateDescription: "Abbotsford experiences some of British Columbia's hottest summer temperatures, regularly exceeding 30°C with heat waves pushing above 40°C. The city's Fraser Valley location, combined with its agricultural character, creates conditions where air conditioning is a practical necessity.",
    nearbyAreas: ["Mission", "Chilliwack", "Clearbrook", "Matsqui", "Sumas Prairie", "Huntingdon"],
    utilityName: "BC Hydro"
  },
  "Kelowna": {
    summerTemp: "25°C to 35°C",
    humidity: "Low (40-55%)",
    coolingMonths: "May through September",
    challenges: [
      "Okanagan summers are consistently hot and require robust cooling",
      "Wildfire smoke creates extended periods of poor air quality",
      "Lake-effect humidity varies dramatically across the city",
      "Rapid population growth has strained HVAC service availability"
    ],
    benefits: [
      "High-capacity systems designed for Okanagan's genuine heat",
      "Advanced filtration crucial during smoky summer periods",
      "Dry heat conditions mean highly efficient AC operation",
      "Local Kelowna team provides responsive Interior BC service"
    ],
    heroTagline: "Okanagan-Rated Cooling Power",
    heroDescription: "Kelowna summers mean real heat—30°C+ days are the norm, not the exception. Our AC systems are sized for Okanagan conditions, with filtration options for wildfire season.",
    climateDescription: "Kelowna experiences hot, dry Okanagan summers with temperatures regularly exceeding 30°C and frequent heat waves above 35°C. The city's semi-arid climate means intense sunshine and low humidity, creating high cooling demand from May through September. Wildfire smoke is an annual air quality concern.",
    nearbyAreas: ["West Kelowna", "Lake Country", "Peachland", "Vernon", "Summerland", "Penticton"],
    utilityName: "FortisBC"
  },
  "Kamloops": {
    summerTemp: "26°C to 37°C",
    humidity: "Very Low (30-45%)",
    coolingMonths: "May through September",
    challenges: [
      "Interior desert climate produces BC's highest summer temperatures",
      "Extreme heat events have become more frequent and intense",
      "Wildfire smoke from surrounding forests affects air quality",
      "Dry conditions require specific equipment considerations"
    ],
    benefits: [
      "Heavy-duty cooling systems handle extreme Interior heat",
      "Low humidity means exceptional AC efficiency",
      "Filtration systems essential during fire season",
      "Professional sizing ensures adequate capacity for heat waves"
    ],
    heroTagline: "Built for Kamloops Heat",
    heroDescription: "Kamloops regularly hits 40°C in summer. We don't undersize systems based on coastal assumptions—our AC installations are engineered for the Interior's demanding conditions.",
    climateDescription: "Kamloops has a semi-arid climate with some of Canada's hottest summer temperatures. The city regularly exceeds 35°C with heat waves pushing past 40°C. Its location at the confluence of rivers creates a natural heat trap. Air conditioning isn't a luxury here—it's essential equipment.",
    nearbyAreas: ["Sun Peaks", "Sahali", "Aberdeen", "Westsyde", "Valleyview", "Brocklehurst"],
    utilityName: "BC Hydro"
  }
};

const installationServices = [
  "Free in-home cooling assessment",
  "Professional electrical and refrigerant line installation",
  "System testing and commissioning",
  "1-year labor warranty (plus manufacturer equipment warranty)",
  "Full training on system operation"
];

const repairServices = [
  "Refrigerant leaks and recharging",
  "Compressor and fan motor replacement",
  "Electronic control board issues",
  "Thermostat malfunctions",
  "Drainage problems"
];

const maintenanceServices = [
  "Indoor and outdoor coil cleaning",
  "Filter replacement or cleaning",
  "Refrigerant level check",
  "Electrical connection inspection",
  "Condensate drain clearing",
  "Performance testing"
];

const whyChooseCards = [
  {
    image: prideImage,
    title: "Local Cooling Experts",
    getDesc: (city: string) => `Our technicians understand ${city}'s specific climate challenges. We've installed 75,000+ systems across 5 Canadian provinces, bringing that expertise directly to your community.`
  },
  {
    image: experienceImage,
    title: "Certified Multi-Brand Installers",
    getDesc: (_city: string) => "Factory-certified for Gridless, Mitsubishi Electric, Daikin, Kerr, and LG air conditioning systems. Our manufacturer certifications ensure your warranty stays valid."
  },
  {
    image: satisfactionImage,
    title: "Energy-Efficient Solutions",
    getDesc: (_city: string) => "Modern mini-split air conditioners use up to 40% less energy than traditional window units. High-SEER systems deliver whisper-quiet comfort while keeping bills low."
  },
  {
    image: dedicatedImage,
    title: "Rebates & Financing",
    getDesc: (_city: string) => "We help you access federal and provincial rebates. Flexible financing options available—conditions apply."
  }
];

const installationSteps = [
  {
    step: 1,
    title: "Free In-Home Cooling Consultation",
    intro: "A certified advisor visits your home to:",
    details: [
      "Assess cooling requirements (room-by-room load calculation)",
      "Evaluate electrical capacity",
      "Identify optimal indoor and outdoor unit locations",
      "Discuss equipment options and brand preferences",
      "Provide detailed written quote",
      "Explain available rebates and financing"
    ],
    footer: { cost: "Free, no obligation", timeline: "3-5 Business days" },
    showCta: true
  },
  {
    step: 2,
    title: "Quote Review & Equipment Ordering",
    intro: "Once you approve the quote:",
    details: [
      "Equipment ordered (typically in stock)",
      "Installation date scheduled",
      "Electrical permit obtained if required",
      "Pre-installation checklist provided"
    ],
    footer: { timeline: "3-7 business days" }
  },
  {
    step: 3,
    title: "Professional Installation",
    intro: "Certified technicians handle everything:",
    details: [
      "Mount indoor and outdoor units",
      "Refrigerant line and electrical connection",
      "Condensate drain installation",
      "Vacuum test and refrigerant charging",
      "Full system testing",
      "Complete cleanup"
    ],
    footer: { singleZone: "4-8 hours", multiZone: "2-3 days" }
  },
  {
    step: 4,
    title: "Training & Handoff",
    intro: "Your technician provides:",
    details: [
      "Remote control operation training",
      "Temperature and mode settings",
      "Filter cleaning demonstration",
      "Maintenance schedule review"
    ],
    footer: { timeline: "Same day" }
  },
  {
    step: 5,
    title: "Cool, Comfortable Living",
    intro: "Enjoy reliable summer comfort with ongoing support from our local team.",
    details: []
  }
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

function generateCityFAQs(city: string, province: string, climateData: CityClimateData): Array<{question: string; answer: string}> {
  const abbrev = provinceAbbreviations[province] || province;
  
  return [
    {
      question: `How much does air conditioning installation cost in ${city}?`,
      answer: `AC installation costs in ${city} depend on your home's size and cooling needs. Single-zone mini-split systems typically range from $3,500 to $6,500, while multi-zone whole-home systems range from $8,000 to $16,000. We provide free in-home assessments with detailed quotes for ${city} homeowners.`
    },
    {
      question: `Is air conditioning worth it in ${city}'s climate?`,
      answer: `Yes, air conditioning is valuable in ${city}. ${climateData.climateDescription.split('.')[0]}. Beyond cooling, modern mini-split systems provide powerful dehumidification and can serve as efficient heating systems during ${abbrev}'s cold winters.`
    },
    {
      question: `How quickly can you install AC in ${city}?`,
      answer: `Our ${city} service team typically completes single-zone installations in 4-8 hours the same day. After your free consultation, we usually schedule installation within 1-2 weeks. Multi-zone systems take 2-3 days to complete.`
    },
    {
      question: `Do you service areas near ${city}?`,
      answer: `Yes, we serve ${city} and surrounding communities including ${climateData.nearbyAreas.slice(0, 4).join(', ')}. Our local team provides the same professional installation and responsive service throughout the region.`
    },
    {
      question: `What type of AC system works best for ${city} homes?`,
      answer: `Ductless mini-split air conditioners are ideal for ${city} homes. They install without ductwork, provide powerful cooling and dehumidification, and many ${city} homeowners appreciate that they also provide efficient heating for our cold winters.`
    },
    {
      question: `Are there AC rebates available in ${province}?`,
      answer: `Yes, ${province} homeowners may qualify for federal and provincial rebates on high-efficiency heat pump air conditioning systems. Our team helps you identify available incentives and handles rebate paperwork. Contact us for current ${abbrev} program details.`
    }
  ];
}

export default function ACLocationPage() {
  const [, params] = useRoute("/air-conditioning-experts/:slug");
  const slug = params?.slug || "";
  const [showBookingModal, setShowBookingModal] = useState(false);


  const location = locations.find((loc) => loc.slug === slug);
  
  if (!location && locations.length > 0) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <SiteHeader />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-black text-[#333333] mb-4">Location Not Found</h1>
          <p className="text-slate-600 mb-8">We couldn't find the location you're looking for.</p>
          <a href="/services/air-conditioning" className="text-[#8dc63f] font-semibold hover:underline">
            View our Air Conditioning services →
          </a>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#8dc63f] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const city = location.city;
  const province = location.province;
  const abbrev = provinceAbbreviations[province] || province;
  const climateData = cityClimateData[city] || cityClimateData["Dartmouth"];
  const cityFAQs = generateCityFAQs(city, province, climateData);

  const pageTitle = `Air Conditioning Installation ${location.city}, ${abbrev} | Greenfoot Energy Solutions`;
  const pageDescription = `Professional AC and mini-split air conditioning installation in ${location.city}, ${location.province}. ${climateData.heroDescription} Free estimates available.`;
  const canonicalUrl = `https://www.greenfootenergy.ca/air-conditioning/${location.slug}`;

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>
      <SiteHeader />

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setShowBookingModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-[#333333] mb-6">How can we help?</h3>
            <div className="space-y-3">
              <a href="https://scheduling.greenfootenergy.ca/" target="_blank" rel="noopener noreferrer"
                className="block w-full bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold h-12 sm:h-14 px-6 rounded-xl text-center transition-colors flex items-center justify-center">
                Book a Quote or Install
              </a>
              <button onClick={() => { (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' }); setShowBookingModal(false); }}
                className="block w-full border-2 border-[#333333] text-[#333333] hover:bg-slate-100 font-bold h-12 sm:h-14 px-6 rounded-xl text-center transition-colors flex items-center justify-center">
                Book a Service Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative min-h-[700px] md:min-h-[750px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Air conditioning service hero background" className="w-full h-full object-cover object-right scale-110" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white via-white/98 to-white/80 md:via-white/95 md:to-white/30"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-8 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Mobile Product Image */}
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:hidden flex justify-center items-center -mb-4"
            >
              <div className="relative">
                <div className="absolute -inset-3 border-2 border-[#8dc63f] rounded-3xl"></div>
                <motion.img src={acUnitsImage} alt="Air Conditioning System" 
                  className="w-64 sm:w-80 h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15))' }}
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="max-w-xl lg:max-w-none">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="inline-flex items-center gap-2 bg-[#8dc63f]/10 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <MapPin className="w-4 h-4" />
                  Serving {city}, {abbrev}
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-[1.1] mb-4 tracking-tight uppercase">
                  Air Conditioning<br />
                  <span className="text-[#8dc63f]">Installation in {city}</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  {climateData.heroDescription}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <a href="tel:18003809384"
                    className="bg-[#333333] hover:bg-[#222222] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    1 (800) 380-9384
                  </a>
                  <Button size="lg" 
                    className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                    onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}>
                    Get Free Quote
                  </Button>
                </div>

                <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors max-w-lg">
                  <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                  <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
                </a>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                    <img src={expertiseIcon} alt="Expertise" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">75,000+ Installs</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                    <img src={guaranteeIcon} alt="Guaranteed" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">Satisfaction Guaranteed</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                    <img src={redSealIcon} alt="Red Seal" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">Red Seal Certified</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Desktop Product Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 border-2 border-[#8dc63f] rounded-3xl"></div>
                <motion.img src={acUnitsImage} alt="Air Conditioning System" 
                  className="w-full max-w-md xl:max-w-lg h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.2))' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Climate Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              How Does <span className="text-[#8dc63f]">{city}'s Climate</span> Impact Your Cooling Needs?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {climateData.climateDescription}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ThermometerSun className="w-7 h-7 text-[#8dc63f]" />
              </div>
              <h3 className="text-lg font-bold text-[#333333] mb-2">Summer Temps</h3>
              <p className="text-2xl font-black text-[#8dc63f]">{climateData.summerTemp}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-7 h-7 text-[#8dc63f]" />
              </div>
              <h3 className="text-lg font-bold text-[#333333] mb-2">Humidity</h3>
              <p className="text-2xl font-black text-[#8dc63f]">{climateData.humidity}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-7 h-7 text-[#8dc63f]" />
              </div>
              <h3 className="text-lg font-bold text-[#333333] mb-2">Cooling Season</h3>
              <p className="text-sm font-bold text-[#8dc63f]">{climateData.coolingMonths}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-[#8dc63f]" />
              </div>
              <h3 className="text-lg font-bold text-[#333333] mb-2">Utility</h3>
              <p className="text-sm font-bold text-[#8dc63f]">{climateData.utilityName}</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Cooling Challenges in {city}</h3>
              <ul className="space-y-4">
                {climateData.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-500 text-xs font-bold">!</span>
                    </div>
                    {challenge}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Benefits of Mini-Split AC in {city}</h3>
              <ul className="space-y-4">
                {climateData.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <Check className="w-6 h-6 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              What AC Services Does Greenfoot Offer in{" "}
              <span className="text-[#8dc63f]">{city}?</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Complete air conditioning services for {city} and {climateData.nearbyAreas.slice(0, 3).join(', ')}.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Installation</h3>
              <ul className="space-y-3">
                {installationServices.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                <Button className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14">
                  Get Free Quote <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Repair</h3>
              <ul className="space-y-3">
                {repairServices.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="w-full mt-6 bg-[#4a4a4a] hover:bg-[#555555] text-white rounded-xl font-bold h-12 sm:h-14 border border-white/40">
                Book Service Call <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Maintenance</h3>
              <ul className="space-y-3">
                {maintenanceServices.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="w-full mt-6 bg-[#4a4a4a] hover:bg-[#555555] text-white rounded-xl font-bold h-12 sm:h-14 border border-white/40">
                Schedule Maintenance <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] uppercase tracking-tight">
              Why {city} Homeowners Choose<br />
              <span className="text-[#8dc63f]">Greenfoot Energy</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {whyChooseCards.map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-[#333333] mb-3">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.getDesc(city)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              Our AC Installation Process in <span className="text-[#8dc63f]">{city}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From free consultation to cool comfort—here's what {city} homeowners can expect.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {installationSteps.map((step, index) => (
              <ScrollStepItem key={index} step={step} index={index} total={installationSteps.length} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333]">
              Common Questions About <span className="text-[#8dc63f]">AC in {city}</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {cityFAQs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Ready for <span className="text-[#8dc63f]">Cool Comfort in {city}?</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Get a free in-home consultation from our local {city} team. We'll assess your cooling needs and provide a detailed quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:18003809384"
                className="bg-white hover:bg-gray-100 text-[#333333] font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                1 (800) 380-9384
              </a>
              <Button size="lg" className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}>
                Book Free Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceSchemaWithFAQs
        serviceName={`Air Conditioning Installation in ${city}, ${abbrev}`}
        serviceDescription={`Professional air conditioning installation, repair, and maintenance in ${city}, ${province}. ${climateData.heroDescription}`}
        serviceType="Air Conditioning Service"
        serviceUrl={`https://www.greenfootenergy.ca/air-conditioning-experts/${slug}`}
        priceRange="$$"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 2500 }}
        faqCategory="Air-Conditioning"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Air Conditioning", url: "https://www.greenfootenergy.ca/services/air-conditioning" },
          { name: city, url: `https://www.greenfootenergy.ca/air-conditioning-experts/${slug}` },
        ]}
      />

      <SiteFooter />
    </div>
  );
}

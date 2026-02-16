import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Star, Check, Shield, Zap, Thermometer, Wind, Droplets, Volume2, Home, MapPin, Calendar, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { RelatedContent } from "@/components/ui/related-content";
import { useState } from "react";
import { X } from "lucide-react";
import { useRoute } from "wouter";
import { locations as staticLocations } from "@/data/locations";
import { Helmet } from "react-helmet";

import heroBg from "@assets/sprayfoam-hero-new.webp";
import sprayfoamProduct from "@assets/Sprayfoam_Insulation_1769451120487.avif";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const provinceAbbreviations: Record<string, string> = {
  "Nova Scotia": "NS",
  "New Brunswick": "NB",
  "Prince Edward Island": "PEI",
  "Newfoundland": "NL",
  "British Columbia": "BC",
};

interface CityInsulationData {
  winterTemp: string;
  avgHeatingCost: string;
  rValueRecommendation: string;
  climateZone: string;
  challenges: string[];
  benefits: string[];
  heroTagline: string;
  heroDescription: string;
  climateDescription: string;
  nearbyAreas: string[];
  utilityName: string;
  commonHomeTypes: string;
  moistureConcern: string;
}

const cityInsulationData: Record<string, CityInsulationData> = {
  "Dartmouth": {
    winterTemp: "-5°C to -12°C",
    avgHeatingCost: "Among the highest in Atlantic Canada",
    rValueRecommendation: "R-50 attic, R-22 walls",
    climateZone: "Zone 6",
    challenges: [
      "Halifax Harbour humidity drives condensation inside wall cavities, leading to hidden mold growth",
      "Frequent coastal fog saturates building envelopes, reducing traditional insulation effectiveness",
      "Older Dartmouth homes from the 1950s–1970s have minimal insulation and significant air leakage",
      "Ice damming on roofs causes water intrusion when warm indoor air escapes through poorly insulated attics"
    ],
    benefits: [
      "Closed-cell spray foam creates an impermeable moisture barrier against harbour humidity",
      "Seamless air sealing eliminates the drafts common in Dartmouth's older housing stock",
      "Homeowners typically see significant reductions on Nova Scotia Power heating bills",
      "Spray foam's rigidity adds structural strength to aging wall assemblies in older homes"
    ],
    heroTagline: "Protect Your Dartmouth Home from Harbour Humidity",
    heroDescription: "From Cole Harbour to Woodlawn, Dartmouth's coastal climate demands insulation that seals out moisture and drafts. Our spray foam solutions are designed for harbour-side living.",
    climateDescription: "Dartmouth's proximity to Halifax Harbour creates a unique moisture challenge for homeowners. Persistent fog, salt air, and freeze-thaw cycles attack building envelopes year-round. Spray foam insulation provides the airtight, moisture-resistant barrier that Dartmouth homes need.",
    nearbyAreas: ["Cole Harbour", "Eastern Passage", "Woodlawn", "Lake Banook", "Portland Hills", "Burnside"],
    utilityName: "Nova Scotia Power",
    commonHomeTypes: "1950s–1970s bungalows and split-levels with minimal original insulation",
    moistureConcern: "Harbour fog and coastal humidity cause condensation in wall cavities, leading to mold and rot in under-insulated homes"
  },
  "Sydney": {
    winterTemp: "-8°C to -16°C",
    avgHeatingCost: "High due to cold Cape Breton winters",
    rValueRecommendation: "R-60 attic, R-24 walls",
    climateZone: "Zone 6",
    challenges: [
      "Cape Breton's exposed geography amplifies wind chill, increasing heat loss through poorly sealed walls",
      "Heavy snowfall and ice buildup create moisture intrusion risks at rooflines and soffits",
      "Many Sydney homes were built during the steel mill era with minimal insulation standards",
      "Limited local insulation contractors mean many Cape Breton homes remain under-insulated"
    ],
    benefits: [
      "Spray foam seals against Cape Breton's notorious wind-driven cold infiltration",
      "Closed-cell foam provides a vapor barrier critical for Sydney's heavy precipitation climate",
      "Local Greenfoot technicians serve Cape Breton directly, eliminating long service wait times",
      "Proper insulation dramatically reduces heating costs for Cape Breton's longer heating season"
    ],
    heroTagline: "Cape Breton Tough Insulation for Cape Breton Winters",
    heroDescription: "Sydney and Cape Breton homes face some of the harshest weather in Nova Scotia. Our spray foam solutions are engineered for the wind, snow, and moisture that define island living.",
    climateDescription: "Sydney's Cape Breton location means longer, harsher winters than mainland Nova Scotia. Wind exposure from the Atlantic and Gulf of St. Lawrence amplifies heat loss. Many homes built during the industrial era lack adequate insulation, making spray foam retrofits especially impactful.",
    nearbyAreas: ["Glace Bay", "New Waterford", "North Sydney", "Whitney Pier", "Westmount", "Coxheath"],
    utilityName: "Nova Scotia Power",
    commonHomeTypes: "Industrial-era company houses and post-war bungalows with minimal wall insulation",
    moistureConcern: "Heavy precipitation combined with strong ocean winds drives moisture deep into wall assemblies, especially in exposed coastal neighborhoods"
  },
  "New Glasgow": {
    winterTemp: "-7°C to -15°C",
    avgHeatingCost: "High due to reliance on oil and electric heating",
    rValueRecommendation: "R-50 attic, R-22 walls",
    climateZone: "Zone 6",
    challenges: [
      "Pictou County's inland location brings colder sustained temperatures than coastal Nova Scotia",
      "Many homes in New Glasgow rely on expensive oil furnaces with poor insulation envelopes",
      "Freeze-thaw cycling throughout winter creates gaps in traditional batt insulation over time",
      "Older homes along the East River corridor experience basement moisture infiltration issues"
    ],
    benefits: [
      "Spray foam's continuous air barrier dramatically reduces oil and electric heating consumption",
      "Foam fills irregular cavities in older Pictou County homes where batt insulation fails",
      "Closed-cell foam in basements prevents East River moisture from entering living spaces",
      "Improved R-values help New Glasgow homeowners qualify for provincial energy rebates"
    ],
    heroTagline: "Cut Heating Costs in Pictou County with Spray Foam",
    heroDescription: "New Glasgow and Pictou County homeowners face long, cold winters and rising energy costs. Our spray foam insulation helps you retain more heat and spend less on fuel.",
    climateDescription: "New Glasgow's Pictou County location brings classic Maritime winters with sustained cold and significant snowfall. The area's housing stock often relies on aging oil furnaces with insufficient insulation, making energy efficiency upgrades particularly valuable. Spray foam addresses both air leakage and thermal performance in one application.",
    nearbyAreas: ["Stellarton", "Westville", "Trenton", "Pictou", "Antigonish", "River John"],
    utilityName: "Nova Scotia Power",
    commonHomeTypes: "Post-war bungalows and 1960s–1980s split-levels with oil furnace heating",
    moistureConcern: "Proximity to the East River and inland humidity cause basement and crawl space moisture problems in homes without proper vapor barriers"
  },
  "Bridgewater": {
    winterTemp: "-6°C to -14°C",
    avgHeatingCost: "Elevated due to rural electric and oil heating",
    rValueRecommendation: "R-50 attic, R-22 walls",
    climateZone: "Zone 6",
    challenges: [
      "South Shore humidity and proximity to the LaHave River create persistent moisture conditions",
      "Rural Lunenburg County homes often have large, uninsulated crawl spaces and basements",
      "Wood-frame construction common in the area develops air leaks as homes settle and shift",
      "Ice damming is prevalent on South Shore roofs due to inadequate attic insulation and air sealing"
    ],
    benefits: [
      "Spray foam seals crawl spaces and basements against South Shore ground moisture",
      "Continuous insulation eliminates the settling and gaps common in older batt installations",
      "Proper attic air sealing prevents the ice dams that plague Lunenburg County rooflines",
      "Homeowners reduce heating costs significantly by eliminating air leakage pathways"
    ],
    heroTagline: "South Shore Insulation Built for Coastal Living",
    heroDescription: "Bridgewater and the Lunenburg County region deserve insulation that handles coastal moisture and Maritime winters. Our spray foam solutions protect your home from the inside out.",
    climateDescription: "Bridgewater's South Shore location brings Maritime weather patterns including coastal humidity, significant snowfall, and freeze-thaw cycles. The region's older housing stock and rural properties often have large uninsulated spaces. Spray foam is ideal for sealing these challenging areas against both air leakage and moisture.",
    nearbyAreas: ["Lunenburg", "Mahone Bay", "Liverpool", "Chester", "LaHave", "Cookville"],
    utilityName: "Nova Scotia Power",
    commonHomeTypes: "Rural farmhouses, 1970s–1990s ranch-style homes, and heritage Lunenburg County properties",
    moistureConcern: "LaHave River valley moisture and coastal humidity create damp conditions in basements and crawl spaces throughout the region"
  },
  "Kentville": {
    winterTemp: "-5°C to -13°C",
    avgHeatingCost: "High for Valley homes with oil heating",
    rValueRecommendation: "R-50 attic, R-22 walls",
    climateZone: "Zone 6",
    challenges: [
      "Annapolis Valley temperature inversions trap cold air and moisture close to the ground",
      "Agricultural region humidity combines with winter cold to stress building envelopes",
      "Many Valley homes built in the 1940s–1960s have balloon-frame construction with no air barrier",
      "Spring thaw and fall rain seasons bring extended moisture exposure to foundations and crawl spaces"
    ],
    benefits: [
      "Spray foam insulation addresses balloon-frame air leakage that is common in Valley homes",
      "Closed-cell foam provides moisture protection for the Valley's variable humidity conditions",
      "Attic and rim joist sealing prevents warm air escape during Annapolis Valley cold snaps",
      "Reduced heating costs help offset rising energy prices for Kentville-area homeowners"
    ],
    heroTagline: "Annapolis Valley Homes Deserve Better Insulation",
    heroDescription: "Kentville and the Annapolis Valley experience unique micro-climate conditions. Our spray foam solutions are tailored for Valley homes, from heritage properties to modern builds.",
    climateDescription: "Kentville sits in the heart of the Annapolis Valley, where the surrounding North and South Mountains create unique weather patterns. Temperature inversions, variable humidity, and cold Maritime winters make proper insulation essential. Many Valley homes predate modern building codes and benefit greatly from spray foam retrofits.",
    nearbyAreas: ["Wolfville", "New Minas", "Coldbrook", "Berwick", "Canning", "Port Williams"],
    utilityName: "Nova Scotia Power",
    commonHomeTypes: "1940s–1960s balloon-frame homes, Victorian farmhouses, and modern Valley subdivisions",
    moistureConcern: "Valley floor temperature inversions and agricultural humidity trap moisture near ground level, affecting foundations and lower wall cavities"
  },
  "Moncton": {
    winterTemp: "-10°C to -20°C",
    avgHeatingCost: "High due to cold winters and oil-dependent heating",
    rValueRecommendation: "R-60 attic, R-24 walls",
    climateZone: "Zone 6",
    challenges: [
      "Moncton's Petitcodiac River location brings extreme freeze-thaw cycling that cracks foundations",
      "Heavy reliance on oil furnaces means poor insulation translates directly to high fuel bills",
      "Significant snowload on roofs combined with attic air leaks creates severe ice dam conditions",
      "Wind exposure on the Tantramar Marshes corridor amplifies wind chill and cold air infiltration"
    ],
    benefits: [
      "Spray foam eliminates the air leakage that makes New Brunswick oil heating so expensive",
      "Closed-cell foam strengthens foundation walls against Petitcodiac River freeze-thaw damage",
      "Proper attic sealing prevents the ice dams common on Moncton rooflines during heavy snow",
      "Homeowners can significantly reduce NB Power and heating oil consumption with proper insulation"
    ],
    heroTagline: "Stop Heat Loss and High Bills in Greater Moncton",
    heroDescription: "From Dieppe to Riverview, Greater Moncton homes battle extreme cold and rising fuel costs. Our spray foam insulation seals your home tight against New Brunswick's harshest winters.",
    climateDescription: "Moncton's southeastern New Brunswick location brings some of the province's most challenging winter conditions. The combination of extreme cold, significant snowfall, and wind exposure from the Tantramar corridor demands superior insulation. Spray foam's air-sealing properties make it the ideal solution for Moncton's climate.",
    nearbyAreas: ["Dieppe", "Riverview", "Magnetic Hill", "Lutes Mountain", "Lakeville", "Petitcodiac"],
    utilityName: "NB Power",
    commonHomeTypes: "1960s–1980s bungalows, bi-levels, and modern Dieppe subdivisions",
    moistureConcern: "Petitcodiac River moisture and spring snowmelt create foundation dampness, while interior condensation forms when warm air meets cold wall surfaces"
  },
  "Fredericton": {
    winterTemp: "-12°C to -22°C",
    avgHeatingCost: "High due to extreme cold and long heating season",
    rValueRecommendation: "R-60 attic, R-24 walls",
    climateZone: "Zone 6",
    challenges: [
      "Fredericton experiences some of the coldest sustained winter temperatures in the Maritimes",
      "Saint John River valley humidity creates condensation problems inside wall cavities",
      "Many homes near the University and downtown area are 80–100+ years old with no insulation",
      "Extended heating season from late September through May puts enormous demand on poorly insulated homes"
    ],
    benefits: [
      "Spray foam maintains R-value performance even during Fredericton's deep cold snaps below -25°C",
      "Air sealing stops cold drafts that make older Fredericton homes uncomfortable and expensive to heat",
      "Closed-cell foam prevents the condensation issues caused by Saint John River valley moisture",
      "Significant heating cost reductions help Fredericton homeowners manage long winter fuel bills"
    ],
    heroTagline: "Fredericton's Answer to Extreme Cold and High Heating Costs",
    heroDescription: "The capital city's heritage homes and riverside neighborhoods face some of New Brunswick's coldest temperatures. Our spray foam insulation delivers maximum thermal protection for Fredericton winters.",
    climateDescription: "Fredericton's inland river valley location produces colder winter temperatures than coastal New Brunswick cities. The long heating season and many older homes with heritage character but poor insulation make spray foam retrofits particularly valuable. Closed-cell spray foam provides the high R-value needed for Fredericton's extreme climate.",
    nearbyAreas: ["Oromocto", "New Maryland", "Douglas", "Hanwell", "Lincoln", "Marysville"],
    utilityName: "NB Power",
    commonHomeTypes: "Heritage riverside homes, UNB-area character homes, and post-war suburban bungalows",
    moistureConcern: "Saint John River valley fog and humidity cause persistent condensation inside wall cavities, especially in older homes without vapor barriers"
  },
  "Saint John": {
    winterTemp: "-9°C to -18°C",
    avgHeatingCost: "High due to cold winters and coastal exposure",
    rValueRecommendation: "R-60 attic, R-24 walls",
    climateZone: "Zone 6",
    challenges: [
      "Bay of Fundy tidal weather creates rapid temperature and humidity changes that stress building materials",
      "Uptown Saint John's historic row houses have virtually no insulation in shared party walls",
      "Salt air from the Bay of Fundy accelerates corrosion of building components and fasteners",
      "Industrial port location means many neighbourhoods have older housing stock from the early 1900s"
    ],
    benefits: [
      "Spray foam adapts to the irregular cavities found in Saint John's century-old row houses",
      "Closed-cell foam resists Bay of Fundy salt air degradation better than any other insulation",
      "Seamless air barrier stops Fundy wind-driven cold infiltration through walls and rim joists",
      "Insulation upgrades reduce NB Power costs and help Saint John homeowners access rebate programs"
    ],
    heroTagline: "Bay of Fundy Protection for Your Saint John Home",
    heroDescription: "Saint John's historic Uptown, east side neighborhoods, and west side communities face the full force of Bay of Fundy weather. Our spray foam insulation is built for port city conditions.",
    climateDescription: "Saint John's position on the Bay of Fundy brings unique climate challenges including extreme tidal weather patterns, salt air exposure, and rapid temperature changes. The city's significant inventory of heritage and industrial-era housing requires insulation that performs in harsh, moisture-laden conditions. Spray foam excels in these demanding environments.",
    nearbyAreas: ["Rothesay", "Quispamsis", "Grand Bay-Westfield", "Hampton", "Uptown", "East Saint John"],
    utilityName: "NB Power",
    commonHomeTypes: "Victorian-era row houses, early 1900s port city homes, and post-war east side bungalows",
    moistureConcern: "Bay of Fundy tidal moisture and fog create extreme humidity conditions that penetrate building envelopes, particularly in older uptown and waterfront properties"
  },
  "Charlottetown": {
    winterTemp: "-7°C to -15°C",
    avgHeatingCost: "High due to Maritime Electric rates and wind exposure",
    rValueRecommendation: "R-50 attic, R-22 walls",
    climateZone: "Zone 6",
    challenges: [
      "Persistent island winds increase heat loss through walls and rooflines by up to 30% compared to sheltered locations",
      "Salt air from surrounding ocean degrades conventional insulation materials and vapor barriers",
      "Charlottetown's historic downtown features homes built in the 1800s with no insulation provisions",
      "Maritime Electric rates are among the highest in Atlantic Canada, making energy waste especially costly"
    ],
    benefits: [
      "Spray foam creates a wind-tight barrier against PEI's relentless ocean breezes",
      "Closed-cell foam resists salt air corrosion and moisture penetration from island humidity",
      "Heritage home cavities are sealed without altering the character of Charlottetown's historic properties",
      "Significant Maritime Electric savings help offset PEI's high electricity costs year-round"
    ],
    heroTagline: "Island-Tough Insulation for Charlottetown Homes",
    heroDescription: "From historic Great George Street to growing Stratford, PEI homes face persistent ocean winds and salt air. Our spray foam insulation is engineered for island conditions.",
    climateDescription: "Charlottetown's island location means constant exposure to ocean winds, salt air, and Maritime weather systems. PEI's housing mix includes many heritage properties alongside modern developments, all requiring insulation that handles the island's unique moisture and wind challenges. Spray foam provides the comprehensive air and moisture barrier Island homes need.",
    nearbyAreas: ["Stratford", "Cornwall", "Summerside", "Montague", "North Shore", "Brackley Beach"],
    utilityName: "Maritime Electric",
    commonHomeTypes: "1800s heritage homes, post-Confederation row houses, and modern PEI subdivisions",
    moistureConcern: "Omnidirectional ocean winds drive salt-laden moisture into building envelopes from all sides, causing accelerated deterioration of unprotected insulation and framing"
  },
  "Victoria": {
    winterTemp: "1°C to -3°C",
    avgHeatingCost: "Moderate with BC Hydro and FortisBC rates",
    rValueRecommendation: "R-38 attic, R-20 walls",
    climateZone: "Zone 4",
    challenges: [
      "Victoria's damp marine climate creates persistent moisture that penetrates older building envelopes",
      "Many heritage homes in James Bay and Fernwood predate modern insulation and vapor barrier standards",
      "Ocean wind exposure on the southern tip of Vancouver Island increases heat loss through walls",
      "Rising cooling demands during summer heat events require insulation that works in both seasons"
    ],
    benefits: [
      "Spray foam addresses Victoria's moisture challenges while maintaining heritage home character",
      "Dual-season performance keeps homes warm in winter and cool during increasingly hot summers",
      "Open-cell foam excels at soundproofing in Victoria's growing multi-unit housing developments",
      "Closed-cell foam in crawl spaces protects against the ground moisture common in older Island homes"
    ],
    heroTagline: "Heritage-Friendly Insulation for Victoria's Unique Climate",
    heroDescription: "Victoria's charming heritage neighborhoods and growing communities need insulation that handles ocean moisture while preserving character. Our spray foam solutions balance performance with preservation.",
    climateDescription: "Victoria enjoys Canada's mildest climate, but the surrounding ocean creates persistent moisture conditions that challenge building envelopes. The capital city's extensive heritage housing stock requires insulation solutions that improve performance without compromising character. Spray foam's ability to conform to irregular spaces makes it ideal for Victoria's diverse architecture.",
    nearbyAreas: ["Langford", "Colwood", "Saanich", "Oak Bay", "Sidney", "Sooke"],
    utilityName: "BC Hydro",
    commonHomeTypes: "1900s–1940s character homes, heritage row houses, and modern Westshore developments",
    moistureConcern: "Persistent marine dampness and ocean fog penetrate older building envelopes, especially in heritage homes lacking modern vapor barriers"
  },
  "Kelowna": {
    winterTemp: "-5°C to -15°C",
    avgHeatingCost: "Moderate to high depending on heating system",
    rValueRecommendation: "R-50 attic, R-22 walls",
    climateZone: "Zone 5",
    challenges: [
      "Okanagan temperature extremes swing from -20°C in winter to +40°C in summer, stressing insulation systems",
      "Summer wildfire smoke infiltration through gaps in building envelopes creates indoor air quality concerns",
      "Intense summer heat requires insulation that keeps cooling costs manageable during extended heat waves",
      "Dry interior climate causes wood framing to shrink and shift, opening gaps in conventional insulation"
    ],
    benefits: [
      "Spray foam maintains R-value through Kelowna's extreme temperature range from -20°C to +40°C",
      "Seamless air barrier blocks wildfire smoke particles from entering through building envelope gaps",
      "Excellent cooling retention during Okanagan heat waves reduces air conditioning costs significantly",
      "Foam flexibility accommodates the wood movement caused by Kelowna's dry climate conditions"
    ],
    heroTagline: "Four-Season Insulation for the Okanagan's Extreme Climate",
    heroDescription: "Kelowna's scorching summers and frigid winters demand insulation that performs at both extremes. From Rutland to the Mission, our spray foam solutions handle the Okanagan's full temperature range.",
    climateDescription: "Kelowna's Okanagan Valley location produces dramatic climate extremes—blazing hot summers, cold winters, and increasingly common wildfire smoke events. Unlike coastal BC, Kelowna needs insulation that performs equally well at keeping heat out in summer and warmth in during winter. Spray foam's continuous air barrier also protects against wildfire smoke infiltration.",
    nearbyAreas: ["West Kelowna", "Lake Country", "Peachland", "Penticton", "Vernon", "Rutland"],
    utilityName: "FortisBC",
    commonHomeTypes: "1980s–2000s ranchers and bi-levels, lakefront properties, and new Okanagan developments",
    moistureConcern: "Despite dry conditions, rapid temperature swings cause condensation at dew points inside wall cavities, and spring snowmelt creates foundation moisture issues"
  },
  "Kamloops": {
    winterTemp: "-8°C to -20°C",
    avgHeatingCost: "High due to cold winters and extreme summers",
    rValueRecommendation: "R-50 attic, R-24 walls",
    climateZone: "Zone 5",
    challenges: [
      "Kamloops holds Canadian heat records exceeding 45°C, demanding insulation that blocks extreme solar heat gain",
      "Semi-arid climate creates significant temperature differentials between day and night that stress building envelopes",
      "Wildfire smoke from surrounding forests fills air for weeks during fire season, infiltrating leaky buildings",
      "Cold interior winters drop below -25°C, requiring insulation that performs in both extreme heat and extreme cold"
    ],
    benefits: [
      "Spray foam's superior R-value per inch maximizes resistance against Kamloops' extreme summer heat",
      "Sealed building envelope blocks wildfire smoke infiltration during increasingly severe fire seasons",
      "Dual-season thermal performance reduces both heating and cooling costs in Kamloops' extreme climate",
      "Foam's rigidity strengthens building assemblies against the expansion and contraction from 60°C+ temperature ranges"
    ],
    heroTagline: "Extreme Climate Insulation for Canada's Desert City",
    heroDescription: "Kamloops' record heat, bitter cold, and wildfire smoke demand insulation that works harder than anywhere else in BC. Our spray foam solutions are built for the Thompson Valley's extremes.",
    climateDescription: "Kamloops' Thompson Valley location creates one of Canada's most extreme climates—searing summer heat, cold continental winters, and persistent wildfire smoke events. This semi-arid city needs insulation that works equally hard in both seasons while protecting indoor air quality. Spray foam's comprehensive air sealing makes it the clear choice for Kamloops homeowners.",
    nearbyAreas: ["Sun Peaks", "Valleyview", "Aberdeen", "Brocklehurst", "Rayleigh", "Savona"],
    utilityName: "BC Hydro",
    commonHomeTypes: "1970s–1990s ranch-style homes, hillside properties, and new Thompson Valley developments",
    moistureConcern: "Despite semi-arid conditions, extreme temperature differentials cause significant condensation formation inside wall cavities, and spring freshet creates foundation moisture challenges"
  },
  "Abbotsford": {
    winterTemp: "-2°C to -8°C",
    avgHeatingCost: "Moderate with BC Hydro rates",
    rValueRecommendation: "R-40 attic, R-22 walls",
    climateZone: "Zone 4",
    challenges: [
      "Fraser Valley receives even more rainfall than Vancouver, creating extreme moisture loads on building envelopes",
      "Agricultural region humidity combines with rain to create persistent damp conditions year-round",
      "Rapid population growth means many homes are built quickly with minimum code insulation standards",
      "Flooding events in the Fraser Valley demonstrate the region's ongoing moisture management challenges"
    ],
    benefits: [
      "Closed-cell spray foam provides a critical moisture barrier in the Fraser Valley's wet climate",
      "Prevents the mold growth that thrives in Abbotsford's combination of rain, humidity, and mild temperatures",
      "Exceeds minimum code insulation standards for better long-term performance and energy savings",
      "Basement and crawl space foam protects against the high water table conditions common in the Fraser Valley"
    ],
    heroTagline: "Fraser Valley Moisture Protection Starts with Spray Foam",
    heroDescription: "Abbotsford and the Fraser Valley face extraordinary moisture challenges from rainfall, flooding, and agricultural humidity. Our spray foam insulation creates the moisture barrier your home needs.",
    climateDescription: "Abbotsford's Fraser Valley location brings extraordinary rainfall, agricultural humidity, and occasional flooding events. The region's rapid growth means many newer homes meet only minimum insulation standards. Spray foam's dual role as insulation and moisture barrier makes it especially valuable in the Fraser Valley, where moisture management is the primary building challenge.",
    nearbyAreas: ["Chilliwack", "Mission", "Langley", "Aldergrove", "Clearbrook", "Matsqui"],
    utilityName: "BC Hydro",
    commonHomeTypes: "Modern Fraser Valley subdivisions, agricultural properties, and 1990s–2000s suburban developments",
    moistureConcern: "Fraser Valley's extreme rainfall, high water table, and agricultural humidity create persistent moisture conditions that demand superior vapor barrier protection"
  },
  "Tracadie-Sheila": {
    winterTemp: "-10°C to -22°C",
    avgHeatingCost: "High due to extreme cold and oil heating dependence",
    rValueRecommendation: "R-60 attic, R-24 walls",
    climateZone: "Zone 6",
    challenges: [
      "Acadian Peninsula exposure to Gulf of St. Lawrence winds amplifies winter heat loss significantly",
      "Remote northern location means longer, colder winters with a heating season extending into May",
      "Many homes in the Tracadie-Sheila area rely on oil heating with older, poorly insulated building envelopes",
      "Significant snowload and blowing snow create moisture infiltration at roof and wall junctions"
    ],
    benefits: [
      "Spray foam provides the high R-value essential for Tracadie-Sheila's extended sub-zero heating season",
      "Seamless installation seals against Gulf wind-driven cold that penetrates conventional insulation",
      "Oil heating cost reductions are dramatic when air leakage is eliminated with spray foam",
      "Local Greenfoot service in northeastern NB eliminates the long waits for out-of-region contractors"
    ],
    heroTagline: "Gulf Coast Insulation for Acadian Peninsula Homes",
    heroDescription: "Tracadie-Sheila and the Acadian Peninsula experience some of New Brunswick's most demanding winter conditions. Our spray foam insulation delivers the thermal performance this region requires.",
    climateDescription: "Tracadie-Sheila's Acadian Peninsula location means exposure to Gulf of St. Lawrence weather, long heating seasons, and significant wind chill. The region's housing stock often features older construction with inadequate insulation. Spray foam provides the high-performance air sealing and thermal resistance that this demanding climate requires.",
    nearbyAreas: ["Shippagan", "Caraquet", "Bathurst", "Neguac", "Pokemouche", "Inkerman"],
    utilityName: "NB Power",
    commonHomeTypes: "Rural Acadian homes, 1960s–1980s bungalows, and coastal properties with oil heating",
    moistureConcern: "Gulf of St. Lawrence wind-driven moisture and heavy snowfall create chronic dampness in attics and wall cavities, particularly in homes facing the water"
  },
  "Paradise": {
    winterTemp: "-8°C to -18°C",
    avgHeatingCost: "Very high due to harsh climate and Newfoundland Power rates",
    rValueRecommendation: "R-60 attic, R-24 walls",
    climateZone: "Zone 6",
    challenges: [
      "North Atlantic weather systems bring harsh winds and heavy precipitation to the St. John's metro area",
      "Paradise and surrounding communities receive among the highest precipitation levels of any Canadian city",
      "Rapid residential development in Paradise means many homes were built to minimum insulation codes",
      "Extended 9+ month heating season makes any insulation deficiency extremely costly over time"
    ],
    benefits: [
      "Spray foam resists the wind-driven rain and moisture that defines Newfoundland weather patterns",
      "Closed-cell foam maintains full R-value performance through the province's long, brutal winters",
      "Seamless air barrier dramatically reduces Newfoundland Power heating costs over the 9-month heating season",
      "Exceeds minimum code insulation for better long-term performance in Paradise's demanding climate"
    ],
    heroTagline: "Newfoundland Tough Insulation for St. John's Metro Homes",
    heroDescription: "Paradise and the greater St. John's area face North Atlantic fury like no other Canadian region. Our spray foam insulation protects against the wind, rain, and cold that define life on the Rock.",
    climateDescription: "Paradise, in the heart of St. John's metro, endures some of Canada's most challenging weather—fierce North Atlantic winds, heavy precipitation, and a heating season stretching from September to June. The community's mix of newer developments and established homes all benefit from spray foam's superior air sealing and moisture resistance.",
    nearbyAreas: ["St. John's", "Mount Pearl", "Conception Bay South", "Torbay", "Portugal Cove-St. Philip's", "Petty Harbour"],
    utilityName: "Newfoundland Power",
    commonHomeTypes: "Modern subdivisions, 1980s–2000s split-levels, and established St. John's metro homes",
    moistureConcern: "North Atlantic horizontal rain and extreme wind create Canada's most aggressive moisture-loading conditions for building envelopes"
  },
  "Surrey": {
    winterTemp: "0°C to -5°C",
    avgHeatingCost: "Moderate but rising with BC Hydro rates",
    rValueRecommendation: "R-40 attic, R-22 walls",
    climateZone: "Zone 4",
    challenges: [
      "Surrey's rapid growth has produced many homes built to minimum insulation code standards",
      "Urban heat island effects in dense neighborhoods increase both heating and cooling demands",
      "Persistent rain and Pacific moisture create mold-friendly conditions in poorly sealed wall cavities",
      "Diverse housing stock from 1970s ranchers to modern townhomes each present unique insulation challenges"
    ],
    benefits: [
      "Closed-cell spray foam provides moisture barrier protection against Surrey's heavy rainfall",
      "Prevents mold growth conditions created by Pacific humidity trapped in wall cavities",
      "Improves energy efficiency beyond minimum code for long-term BC Hydro savings",
      "Adapts to Surrey's diverse housing types from older homes to modern multi-unit developments"
    ],
    heroTagline: "Metro Vancouver's Largest City Deserves Better Insulation",
    heroDescription: "From Newton to South Surrey, homes across the city face moisture challenges from Pacific rainfall. Our spray foam solutions protect Surrey's diverse housing stock against rain, mold, and energy waste.",
    climateDescription: "Surrey's metro Vancouver location brings persistent rainfall and Pacific moisture that challenges building envelopes year-round. The city's rapid growth means many homes meet only minimum insulation standards. Spray foam's dual role as insulation and moisture barrier makes it especially valuable for Surrey's wet climate and diverse housing stock.",
    nearbyAreas: ["White Rock", "Delta", "Langley", "New Westminster", "Burnaby", "Cloverdale"],
    utilityName: "BC Hydro",
    commonHomeTypes: "1970s–1990s ranchers, modern townhome complexes, and new Fraser Heights developments",
    moistureConcern: "Persistent Pacific rain and urban moisture conditions create ideal environments for hidden mold growth in wall cavities throughout Surrey's diverse neighborhoods"
  },
  "Langley": {
    winterTemp: "-1°C to -6°C",
    avgHeatingCost: "Moderate with BC Hydro rates",
    rValueRecommendation: "R-40 attic, R-22 walls",
    climateZone: "Zone 4",
    challenges: [
      "Fraser Valley location brings heavier rainfall than coastal Vancouver, increasing moisture loads",
      "Agricultural properties in Langley have large outbuildings and older structures needing insulation",
      "Rapid development from Willoughby to Brookswood means many homes built to minimum code insulation",
      "Valley location traps moisture and creates persistent damp conditions for building envelopes"
    ],
    benefits: [
      "Closed-cell spray foam creates a comprehensive moisture barrier against Fraser Valley rain",
      "Prevents mold growth in Langley's combination of rain, agricultural humidity, and mild temperatures",
      "Works for diverse Langley properties from Walnut Grove condos to Aldergrove acreages",
      "Exceeds minimum code insulation for better long-term energy performance and BC Hydro savings"
    ],
    heroTagline: "Fraser Valley Insulation for Langley's Growing Communities",
    heroDescription: "From Walnut Grove to Fort Langley, Langley homes face Fraser Valley moisture and rain challenges. Our spray foam insulation creates the building envelope protection Langley properties need.",
    climateDescription: "Langley's Fraser Valley position brings significantly more rainfall than coastal Vancouver. The community's mix of established neighborhoods, new developments, and agricultural properties all require insulation that handles persistent moisture conditions. Spray foam's ability to seal and protect against moisture makes it ideal for Langley homes.",
    nearbyAreas: ["Aldergrove", "Walnut Grove", "Murrayville", "Fort Langley", "Brookswood", "Willoughby"],
    utilityName: "BC Hydro",
    commonHomeTypes: "Modern Willoughby townhomes, established Walnut Grove homes, and rural agricultural properties",
    moistureConcern: "Fraser Valley's heavy rainfall and agricultural moisture create persistent damp conditions that demand superior vapor barrier protection for Langley's varied housing stock"
  }
};

function generateCitySprayfoamFAQs(city: string, province: string, data: CityInsulationData): Array<{ question: string; answer: string }> {
  const abbr = provinceAbbreviations[province] || province;

  const baseFAQs: Array<{ question: string; answer: string }> = [
    {
      question: `What R-value does my ${city} home need for spray foam insulation?`,
      answer: `${city} is in Climate ${data.climateZone}, which requires ${data.rValueRecommendation} for optimal energy efficiency. Our certified technicians assess your specific home to recommend the right spray foam thickness and type for your ${city} property's construction and exposure.`
    },
    {
      question: `Is open-cell or closed-cell spray foam better for ${city}'s climate?`,
      answer: `For ${city}'s conditions, we typically recommend closed-cell spray foam for exterior walls, basements, and crawl spaces because it provides a superior vapor barrier against ${data.moistureConcern.toLowerCase().includes("moisture") ? "local moisture" : "humidity"}. Open-cell foam is excellent for interior walls and soundproofing applications. Our advisors evaluate your home's specific needs during the free consultation.`
    },
    {
      question: `How much can I save on ${data.utilityName} bills with spray foam insulation in ${city}?`,
      answer: `${city} homeowners with ${data.utilityName} service typically see meaningful reductions in heating costs after spray foam insulation. Actual savings depend on your home's current insulation, heating system, and size. Contact us for a free assessment and personalized estimate for your ${city} home.`
    },
    {
      question: `How does spray foam prevent mold and moisture damage in ${city}?`,
      answer: `${data.moistureConcern}. Closed-cell spray foam acts as both an insulation and vapor barrier, preventing the moisture conditions that allow mold growth. Unlike batt insulation, spray foam doesn't absorb water and won't support mold growth even in ${city}'s challenging climate.`
    },
    {
      question: `How long should I stay out of my ${city} home after spray foam installation?`,
      answer: `For safety and optimal curing, we recommend staying away from your home for 24 hours after spray foam application. You can safely return the following morning between 8:00 AM and 10:00 AM. Our team provides detailed safety guidelines specific to your project scope before installation begins.`
    }
  ];

  if (province === "Nova Scotia") {
    baseFAQs.push({
      question: `Does ${city} have specific building code requirements for spray foam insulation in Nova Scotia?`,
      answer: `Yes, Nova Scotia's building code sets minimum insulation requirements for different climate zones. ${city} falls in ${data.climateZone}, requiring ${data.rValueRecommendation}. Our certified installers ensure all spray foam applications meet or exceed Nova Scotia building code requirements, and we handle any necessary permits for your project.`
    });
  } else if (province === "New Brunswick") {
    baseFAQs.push({
      question: `What rebates are available for spray foam insulation in ${city}, New Brunswick?`,
      answer: `${city} homeowners may qualify for federal and New Brunswick provincial energy efficiency rebates when upgrading insulation. Program eligibility and amounts change regularly. Visit our provincial incentives page or contact us for current information about rebate programs available for your ${city} insulation project.`
    });
  } else if (province === "Prince Edward Island") {
    baseFAQs.push({
      question: `How does PEI's island wind exposure affect insulation choices for ${city} homes?`,
      answer: `${city}'s island location means persistent ocean winds that can increase heat loss through walls by up to 30%. Spray foam insulation creates a seamless wind-tight barrier that conventional batt insulation cannot match. This is particularly important for PEI homes where wind-driven cold infiltration is a major source of energy waste and discomfort.`
    });
  } else if (province === "Newfoundland") {
    baseFAQs.push({
      question: `Why is spray foam insulation especially important for homes in ${city}, Newfoundland?`,
      answer: `${city} has one of Canada's longest heating seasons at 9+ months per year, and experiences extreme wind-driven rain and cold. Any insulation deficiency is amplified across this extended period, making proper insulation critical for managing Newfoundland Power costs. Spray foam's wind and moisture resistance makes it the ideal choice for Newfoundland's harsh marine climate.`
    });
  } else if (province === "British Columbia") {
    const isInterior = ["Kelowna", "Kamloops"].includes(city);
    if (isInterior) {
      baseFAQs.push({
        question: `Can spray foam insulation help protect my ${city} home from wildfire smoke?`,
        answer: `Yes—spray foam insulation creates a sealed building envelope that significantly reduces wildfire smoke infiltration during fire season. In ${city}, where smoke events can last weeks, a properly sealed home with spray foam insulation can maintain much better indoor air quality compared to homes with conventional insulation and gaps in the building envelope.`
      });
    } else {
      baseFAQs.push({
        question: `How does spray foam insulation address the moisture challenges specific to ${city}'s climate?`,
        answer: `${city}'s climate brings significant rainfall and humidity that creates persistent moisture conditions for building envelopes. Closed-cell spray foam acts as both insulation and vapor barrier, preventing the moisture intrusion and mold growth conditions that are common in the region. This dual function makes it particularly well-suited for ${city}'s wet climate.`
      });
    }
  }

  return baseFAQs;
}

const installationSteps = [
  {
    step: 1,
    title: "Free Insulation Consultation",
    intro: "Our certified Home Comfort Advisor visits your property to conduct a comprehensive spray foam insulation evaluation at no cost:",
    details: [
      "Measure all areas requiring spray foam application",
      "Assess your home's current insulation performance",
      "Identify air leakage points and evaluate thermal bridging issues",
      "Determine the precise amount of spray foam insulation needed for maximum energy efficiency",
      "Provide a detailed written quote with specs and pricing"
    ],
    footer: { cost: "Free, no obligation", timeline: "3-5 Business days" },
    showCta: true
  },
  {
    step: 2,
    title: "Efficient Project Coordination",
    intro: "Following your spray foam insulation assessment, our team coordinates your installation timeline:",
    details: [
      "Scheduling based on your home's specific insulation needs",
      "Clear communication about project duration",
      "Weather considerations for optimal spray foam application",
      "Any special preparation requirements explained in detail"
    ],
    footer: { timeline: "Scheduled within 1-2 weeks" }
  },
  {
    step: 3,
    title: "Expert Insulation Application",
    intro: "Our experienced Greenfoot spray foam installation team arrives with professional-grade equipment:",
    details: [
      "Surface preparation and protective masking",
      "Precise spray foam application by certified technicians",
      "Complete air sealing and thermal barrier creation",
      "Quality control testing throughout the process",
      "Highest safety standards maintained during installation"
    ],
    footer: { singleArea: "4-8 hours", multipleAreas: "1-2 days" }
  },
  {
    step: 4,
    title: "Project Completion Confirmation",
    intro: "Once your spray foam insulation installation is complete, our technician contacts you directly:",
    details: [
      "Confirm project completion and review work performed",
      "Provide post-installation safety guidelines",
      "Ensure all areas have been properly insulated and sealed",
      "Important timing information for safe re-entry to your newly insulated home"
    ],
    footer: { timeline: "Same day notification" }
  },
  {
    step: 5,
    title: "Essential Safety & Preparation Guidelines",
    intro: "For optimal indoor air quality and your safety, please follow these requirements:",
    details: [
      "Be present upon our team's arrival for a pre-installation walkthrough",
      "Ensure a minimum of 4 feet clearance from all exterior walls",
      "Remove any objects leaning against or placed along exterior walls",
      "Stay away from your home for a full 24 hours following spray foam application",
      "You can safely return the following morning between 8:00 AM and 10:00 AM"
    ]
  }
];

const challengeIcons = [Thermometer, Wind, Droplets, Shield];

export default function SprayfoamLocationPage() {
  const [, params1] = useRoute("/services/sprayfoam-insulation/:slug");
  const [, params2] = useRoute("/fr-ca/services/sprayfoam-insulation/:slug");
  const [, params3] = useRoute("/fr-ca/services/isolation-en-mousse-pulverisee/:slug");
  const locationSlug = params1?.slug || params2?.slug || params3?.slug || "";

  const [showBookingModal, setShowBookingModal] = useState(false);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

  const location = staticLocations.find(loc => loc.slug === locationSlug);

  if (!location) {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-[#333333] mb-4">Location Not Found</h1>
          <p className="text-slate-600">We couldn't find the spray foam insulation location you're looking for.</p>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const { city, province, phone, slug } = location;
  const abbr = provinceAbbreviations[province] || province;
  const data = cityInsulationData[city];

  if (!data) {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-[#333333] mb-4">Location Not Available</h1>
          <p className="text-slate-600">Spray foam insulation information for {city} is not yet available.</p>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const faqs = generateCitySprayfoamFAQs(city, province, data);
  const pageTitle = `Spray Foam Insulation in ${city}, ${abbr} | Greenfoot Energy`;
  const pageDescription = `Looking for spray foam insulation in ${city}, ${abbr}? Greenfoot Energy provides expert closed-cell and open-cell spray foam for ${data.commonHomeTypes}. Free assessment.`;
  const canonicalUrl = `https://www.greenfootenergy.ca/services/sprayfoam-insulation/${slug}`;

  const whyChooseCards = [
    {
      image: prideImage,
      title: `Spray Foam Specialists in ${city}`,
      desc: `Our ${city} technicians specialize in residential and commercial spray foam applications. We've insulated 25,000+ homes across ${province}, understanding the unique thermal demands of ${abbr}'s climate and ${data.commonHomeTypes}.`
    },
    {
      image: experienceImage,
      title: "Certified Installation Experts",
      desc: `Factory-certified for open-cell and closed-cell spray foam systems. Our manufacturer certifications ensure your insulation performs optimally and meets ${province}'s building code requirements.`
    },
    {
      image: satisfactionImage,
      title: `Complete Home Coverage in ${city}`,
      desc: `Whether you need attic insulation, wall cavities, or basement rim joists sealed, we design custom solutions for ${city} homes. Our thermal assessments ensure proper R-value of ${data.rValueRecommendation} for maximum energy efficiency.`
    },
    {
      image: dedicatedImage,
      title: `${abbr} Rebate & Financing Assistance`,
      desc: `We help ${city} homeowners access federal and ${province} provincial rebates. Flexible financing options available—conditions apply.`,
      links: [
        { text: "View Incentives", href: "/provincial-incentives" },
        { text: "See What You Qualify For", href: "/financing" }
      ]
    }
  ];

  const relatedServices = [
    { href: `/heat-pump-experts/${slug}`, label: `Mini-Split Heat Pumps in ${city}` },
    { href: `/solar-experts/${slug}`, label: `Solar Energy in ${city}` },
    { href: `/air-conditioning-experts/${slug}`, label: `Air Conditioning in ${city}` },
    { href: "/services/blown-in-insulation", label: "Blown-In Insulation" },
    { href: "/services/batt-poly-insulation", label: "Batt & Poly Insulation" },
    { href: "/services/soundproofing", label: "Soundproofing Services" },
    { href: "/provincial-incentives", label: "Government Rebates & Incentives" },
    { href: "/financing", label: "Financing Options" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`spray foam insulation ${city}, closed cell spray foam ${city}, open cell spray foam ${abbr}, attic insulation ${city}, basement insulation ${city}, home insulation ${city} ${abbr}, energy efficient insulation ${province}, air sealing ${city}`} />
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

      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              data-testid="button-close-booking-modal"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-[#333333] mb-6">How can we help?</h3>
            <div className="space-y-3">
              <a
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold h-12 sm:h-14 px-6 rounded-xl text-center transition-colors flex items-center justify-center"
                data-testid="link-book-assessment"
              >
                Book Free Assessment
              </a>
              <a
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border-2 border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f]/10 font-bold h-12 sm:h-14 px-6 rounded-xl text-center transition-colors flex items-center justify-center"
                data-testid="link-view-financing"
              >
                View Financing Options
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative min-h-[700px] md:min-h-[750px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <img
            src={heroBg}
            alt={`Spray foam insulation in ${city}, ${abbr}`}
            className="w-full h-full object-cover object-center scale-110 -scale-x-100"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white/70 via-white/70 to-white/55 md:via-white/65 md:to-white/20"></div>

        <div className="container mx-auto px-4 relative z-10 py-8 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:hidden flex justify-center items-center -mb-4"
            >
              <div className="relative">
                <div className="absolute -inset-3 border-2 border-[#8dc63f] rounded-3xl"></div>
                <div className="absolute -inset-1 border border-[#8dc63f]/30 rounded-2xl"></div>
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-[#8dc63f] rounded-tl-xl"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-[#8dc63f] rounded-tr-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-[#8dc63f] rounded-bl-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-[#8dc63f] rounded-br-xl"></div>
                <motion.img
                  src={sprayfoamProduct}
                  alt={`Spray Foam Insulation for ${city}, ${abbr}`}
                  className="w-64 sm:w-80 h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15))' }}
                />
              </div>
            </motion.div>

            <div className="max-w-xl lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg mb-6"
                >
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-black text-[#333333]">4.9</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">5,000+ Google Reviews</span>
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-[1.1] mb-2 tracking-tight uppercase">
                  Spray Foam Insulation in<br />
                  <span className="text-[#8dc63f]">{city}, {abbr}</span>
                </h1>

                <p className="text-lg sm:text-xl font-bold text-[#333333] mb-2">{data.heroTagline}</p>

                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  {data.heroDescription}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <a
                    href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                    className="bg-[#333333] hover:bg-[#222222] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
                    data-testid="link-hero-phone"
                  >
                    <Phone className="w-5 h-5" />
                    {phone}
                  </a>
                  <Button
                    size="lg"
                    className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                    data-testid="button-hero-get-quote"
                    onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                  >
                    Get Free Quote
                  </Button>
                </div>

                <a href="/financing" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors max-w-md" data-testid="link-financing-box">
                  <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                  <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
                </a>

                <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                  >
                    <img src={expertiseIcon} alt="25,000+ Homes Insulated" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">25,000+ Homes Insulated</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                  >
                    <img src={guaranteeIcon} alt="Satisfaction Guaranteed" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">Satisfaction Guaranteed</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                  >
                    <img src={redSealIcon} alt="Red Seal Certified" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">Red Seal Certified</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 border-2 border-[#8dc63f] rounded-3xl"></div>
                <div className="absolute -inset-2 border border-[#8dc63f]/30 rounded-2xl"></div>
                <div className="absolute -top-5 -left-5 w-10 h-10 border-t-4 border-l-4 border-[#8dc63f] rounded-tl-xl"></div>
                <div className="absolute -top-5 -right-5 w-10 h-10 border-t-4 border-r-4 border-[#8dc63f] rounded-tr-xl"></div>
                <div className="absolute -bottom-5 -left-5 w-10 h-10 border-b-4 border-l-4 border-[#8dc63f] rounded-bl-xl"></div>
                <div className="absolute -bottom-5 -right-5 w-10 h-10 border-b-4 border-r-4 border-[#8dc63f] rounded-br-xl"></div>
                <motion.img
                  src={sprayfoamProduct}
                  alt={`Spray Foam Insulation for ${city}, ${abbr}`}
                  className="w-[400px] h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.2))' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Why Does City Need Spray Foam Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 tracking-tight">
              Why Does {city} Need <span className="text-[#8dc63f]">Spray Foam Insulation?</span>
            </h2>
            <p className="text-lg text-slate-600">{data.climateDescription}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div>
              <h3 className="text-xl font-bold text-[#333333] mb-6 flex items-center gap-2">
                <Thermometer className="w-6 h-6 text-[#8dc63f]" />
                {city}'s Insulation Challenges
              </h3>
              <div className="space-y-4">
                {data.challenges.map((challenge, index) => {
                  const IconComponent = challengeIcons[index];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl p-5 shadow-md border border-slate-100 hover:border-[#8dc63f]/30 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-red-500" />
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed">{challenge}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#333333] mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-[#8dc63f]" />
                How Spray Foam Helps
              </h3>
              <div className="space-y-4">
                {data.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-5 shadow-md border border-slate-100 hover:border-[#8dc63f]/30 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#8dc63f]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-[#8dc63f]" />
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">{benefit}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-4xl mx-auto grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-md text-center">
              <p className="text-sm text-slate-500 mb-1">Winter Temperature</p>
              <p className="text-xl font-bold text-[#333333]">{data.winterTemp}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md text-center">
              <p className="text-sm text-slate-500 mb-1">Climate Zone</p>
              <p className="text-xl font-bold text-[#333333]">{data.climateZone}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md text-center">
              <p className="text-sm text-slate-500 mb-1">Recommended R-Value</p>
              <p className="text-xl font-bold text-[#8dc63f]">{data.rValueRecommendation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open-Cell vs Closed-Cell Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 tracking-tight">
              What Type of Spray Foam is Right for Your <span className="text-[#8dc63f]">{city} Home?</span>
            </h2>
            <p className="text-lg text-slate-600">
              {city}'s {data.climateZone} climate and {data.moistureConcern.split(',')[0].toLowerCase()} conditions inform our recommendation for the right spray foam type.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#8dc63f] rounded-xl flex items-center justify-center">
                  <Wind className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#333333]">Open-Cell Spray Foam</h3>
                  <p className="text-sm text-slate-500">R-3.7 per inch</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  "Excellent soundproofing properties for interior walls",
                  "More flexible—ideal for areas with movement or settling",
                  "Allows moisture to pass through (breathable)",
                  "Cost-effective for large interior applications",
                  "Perfect for interior walls, attics (with vapor retarder), and floors"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-[#333333]">Best for {city}:</span> Interior partition walls, soundproofing between rooms, and attic applications where a separate vapor barrier is installed.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#333333] rounded-2xl p-8 border border-[#8dc63f]/30 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-[#8dc63f] text-white text-xs font-bold px-3 py-1 rounded-full">
                Recommended for {abbr}
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#8dc63f] rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Closed-Cell Spray Foam</h3>
                  <p className="text-sm text-gray-400">R-6.5+ per inch</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  "Highest R-value per inch of any insulation material",
                  "Acts as its own vapor and moisture barrier",
                  "Adds structural rigidity to walls and rooflines",
                  "Resists water, mold, and moisture infiltration",
                  "Ideal for exterior walls, basements, crawl spaces, and rim joists"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-200">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-white/10 rounded-xl p-4 border border-[#8dc63f]/20">
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-[#8dc63f]">Best for {city}:</span> Exterior walls, basements, and any area where {data.moistureConcern.split('.')[0].toLowerCase()} is a concern. Provides the {data.rValueRecommendation} needed for {data.climateZone}.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Greenfoot Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] tracking-tight">
              Why Choose Greenfoot for Spray Foam in<br />
              <span className="text-[#8dc63f]">{city}?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
              Greenfoot Energy is {province}'s leading insulation contractor with specialized expertise in spray foam solutions for {city}-area homes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {whyChooseCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-[#333333] mb-3">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                  {card.links && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {card.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.href}
                          className="text-sm font-semibold text-[#8dc63f] hover:text-[#709c32] underline"
                          data-testid={`link-card-${idx}`}
                        >
                          {link.text}
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

      {/* Installation Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 tracking-tight">
              What Should You Expect During a <span className="text-[#8dc63f]">Spray Foam Estimate & Installation?</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {installationSteps.map((step, index) => (
              <ScrollStepItem
                key={index}
                step={{
                  step: step.step,
                  title: step.title,
                  intro: step.intro,
                  details: step.details,
                  footer: step.footer,
                  showCta: step.showCta
                }}
                index={index}
                total={installationSteps.length}
                ctaText={`Get Free Quote in ${city}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              What Do {city} Homeowners Ask About{" "}
              <span className="text-[#8dc63f]">Spray Foam Insulation?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Expert answers to common spray foam insulation questions from {city}, {abbr} homeowners
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-xl overflow-hidden shadow-sm"
                data-testid={`faq-item-${index}`}
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-[#333333] pr-4">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-[#8dc63f] flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-slate-600">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Related Services Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#333333] mb-4">
              What Other Services Are Available in{" "}
              <span className="text-[#8dc63f]">{city}?</span>
            </h2>
            <p className="text-lg text-slate-600">
              Explore our full range of energy efficiency solutions for {city} homeowners
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {relatedServices.map((service, index) => (
              <motion.a
                key={index}
                href={service.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-slate-50 hover:bg-[#8dc63f]/10 rounded-xl p-5 border border-slate-200 hover:border-[#8dc63f]/30 transition-all"
                data-testid={`link-related-service-${index}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#333333] group-hover:text-[#8dc63f] text-sm transition-colors">{service.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#8dc63f] transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
            Ready to Improve Your <span className="text-[#8dc63f]">{city} Home's Insulation?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied homeowners across {province}. Schedule your free spray foam insulation assessment in {city} today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg h-12 sm:h-14 px-10 rounded-xl shadow-xl"
              onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              data-testid="button-cta-assessment"
            >
              Book Free Assessment
            </Button>
            <a
              href={`tel:${phone.replace(/[^0-9]/g, '')}`}
              className="bg-white hover:bg-slate-100 text-[#333333] font-bold text-lg h-12 sm:h-14 px-10 rounded-xl shadow-xl flex items-center justify-center gap-2"
              data-testid="link-cta-phone"
            >
              <Phone className="w-5 h-5" />
              {phone}
            </a>
          </div>
        </div>
      </section>

      <ServiceSchemaWithFAQs
        serviceName={`Spray Foam Insulation in ${city}, ${abbr}`}
        serviceDescription={`Professional spray foam insulation services in ${city}, ${province}. Open-cell and closed-cell spray foam installation for homes and businesses. 25,000+ homes insulated across ${province}. Free assessment available.`}
        serviceType="Insulation Service"
        serviceUrl={canonicalUrl}
        priceRange="$$"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 5000 }}
        faqCategory="insulation"
        areaServed={[city, province]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Spray Foam Insulation", url: "https://www.greenfootenergy.ca/services/sprayfoam-insulation" },
          { name: `${city}, ${abbr}`, url: canonicalUrl },
        ]}
      />

      <RelatedContent currentPath="/services/sprayfoam-insulation" variant="compact" heading="Explore More Insulation Resources" />
      <SiteFooter />
    </div>
  );
}

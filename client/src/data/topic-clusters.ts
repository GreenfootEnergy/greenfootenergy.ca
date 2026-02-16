export interface TopicLink {
  title: string;
  href: string;
  description?: string;
}

export interface TopicCluster {
  id: string;
  name: string;
  pillar: TopicLink;
  services: TopicLink[];
  brands: TopicLink[];
  blogs: TopicLink[];
  resources: TopicLink[];
}

export const topicClusters: Record<string, TopicCluster> = {
  "heat-pumps": {
    id: "heat-pumps",
    name: "Heat Pumps",
    pillar: { title: "Mini-Split Heat Pumps", href: "/services/mini-split-heat-pumps" },
    services: [
      { title: "Ducted Central Heat Pumps", href: "/services/ducted-central-heat-pumps", description: "Whole-home heating through your ductwork" },
      { title: "Geothermal Heat Pumps", href: "/services/geothermal-heat-pumps", description: "Ground-source heating and cooling" },
      { title: "Heat Pumps & Air Conditioning", href: "/services/heat-pumps-and-air-conditioning", description: "Year-round comfort solutions" },
      { title: "Dual Fuel Heating Systems", href: "/services/dual-fuel-heating-systems", description: "Hybrid heating for extreme climates" },
      { title: "Water Heaters", href: "/services/water-heaters", description: "Heat pump water heating technology" },
      { title: "Maintenance & Service Plans", href: "/services/maintenance-service-yeti", description: "Keep your system running efficiently" },
    ],
    brands: [
      { title: "Daikin Heat Pumps", href: "/brands/daikin-heat-pumps" },
      { title: "Mitsubishi Electric", href: "/brands/mitsubishi-electric-heat-pumps" },
      { title: "LG Heat Pumps", href: "/brands/lg-heat-pumps" },
      { title: "GE Heat Pumps", href: "/brands/general-electric-heat-pumps" },
      { title: "Gridless Heat Pumps", href: "/brands/gridless-heat-pumps" },
      { title: "Kerr Heat Pumps", href: "/brands/kerr-heat-pumps" },
    ],
    blogs: [
      { title: "The Benefits of Heat Pumps", href: "/blog/benefits-of-heat-pumps" },
      { title: "The Benefits of HVAC Systems", href: "/blog/benefits-of-hvac-systems" },
      { title: "Understanding HVAC Systems", href: "/blog/understanding-hvac-systems" },
      { title: "Energy Saving Tips for Your Home", href: "/blog/energy-saving-tips-for-your-home-greenfoots-guide-for-2025" },
      { title: "Expert Energy Efficiency Tips", href: "/blog/energy-efficiency-tips" },
    ],
    resources: [
      { title: "Heat Pump Glossary", href: "/heat-pump-glossary", description: "Terminology and definitions" },
      { title: "Provincial Incentives & Rebates", href: "/provincial-incentives", description: "Government programs to help you save" },
      { title: "Financing Options", href: "/financing", description: "Affordable payment plans" },
      { title: "Snow Covers for Heat Pumps", href: "/heat-pump-snow-covers-protect-your-investment", description: "Protect your outdoor unit" },
      { title: "FAQ", href: "/faq", description: "Common questions answered" },
    ],
  },
  "solar": {
    id: "solar",
    name: "Solar Energy",
    pillar: { title: "Solar Energy", href: "/services/solar-energy" },
    services: [
      { title: "Residential Solar", href: "/services/residential-solar", description: "Home solar panel systems" },
      { title: "Commercial Solar", href: "/services/commercial-solar", description: "Business solar solutions" },
      { title: "Generators", href: "/services/generators", description: "Backup power for your solar system" },
    ],
    brands: [],
    blogs: [
      { title: "Canadian Rebates for Solar", href: "/blog/canadian-rebates-solar" },
      { title: "Debunking Solar Energy Myths", href: "/blog/solar-energy-myths" },
      { title: "Energy Saving Tips for Your Home", href: "/blog/energy-saving-tips-for-your-home-greenfoots-guide-for-2025" },
    ],
    resources: [
      { title: "Provincial Incentives & Rebates", href: "/provincial-incentives", description: "Government solar incentives" },
      { title: "Financing Options", href: "/financing", description: "Solar financing made easy" },
      { title: "FAQ", href: "/faq", description: "Solar energy questions answered" },
    ],
  },
  "insulation": {
    id: "insulation",
    name: "Insulation",
    pillar: { title: "Spray Foam Insulation", href: "/services/sprayfoam-insulation" },
    services: [
      { title: "Batt & Poly Insulation", href: "/services/batt-poly-insulation", description: "Traditional fiberglass insulation" },
      { title: "Blown-In Insulation", href: "/services/blown-in-insulation", description: "Loose-fill attic insulation" },
      { title: "Soundproofing", href: "/services/soundproofing", description: "Acoustic insulation solutions" },
    ],
    brands: [],
    blogs: [
      { title: "Expert Energy Efficiency Tips", href: "/blog/energy-efficiency-tips" },
      { title: "Energy Saving Tips for Your Home", href: "/blog/energy-saving-tips-for-your-home-greenfoots-guide-for-2025" },
    ],
    resources: [
      { title: "Provincial Incentives & Rebates", href: "/provincial-incentives", description: "Insulation rebate programs" },
      { title: "Financing Options", href: "/financing", description: "Affordable insulation financing" },
      { title: "FAQ", href: "/faq", description: "Insulation questions answered" },
    ],
  },
  "home-comfort": {
    id: "home-comfort",
    name: "Home Comfort",
    pillar: { title: "Why Choose Greenfoot", href: "/why-choose-us" },
    services: [
      { title: "Air Conditioning", href: "/services/air-conditioning", description: "Cooling solutions for your home" },
      { title: "Indoor Air Quality & Ventilation", href: "/services/indoor-air-quality-ventilation", description: "Breathe cleaner air" },
      { title: "Peak Smart Thermostat", href: "/services/peak-thermostat", description: "Intelligent climate control" },
      { title: "Generators", href: "/services/generators", description: "Backup power solutions" },
      { title: "Water Heaters", href: "/services/water-heaters", description: "Energy-efficient hot water" },
      { title: "Maintenance & Service Plans", href: "/services/maintenance-service-yeti", description: "Preventative maintenance" },
    ],
    brands: [],
    blogs: [
      { title: "Peak Smart Thermostat", href: "/blog/peak-smart-thermostat-revolutionizing-home-climate-control" },
      { title: "All-in-One Comfort at Greenfoot", href: "/blog/all-in-one-comfort-discover-the-full-range-of-services-at-greenfoot-energy-solutions" },
      { title: "Understanding HVAC Systems", href: "/blog/understanding-hvac-systems" },
    ],
    resources: [
      { title: "Membership Plans", href: "/membership-plans", description: "Save with annual service plans" },
      { title: "Financing Options", href: "/financing", description: "Flexible payment options" },
      { title: "FAQ", href: "/faq", description: "Home comfort questions answered" },
    ],
  },
  "commercial": {
    id: "commercial",
    name: "Commercial Services",
    pillar: { title: "Commercial Services", href: "/services/commercial-services" },
    services: [
      { title: "Commercial HVAC", href: "/services/commercial-hvac", description: "Large-scale heating and cooling" },
      { title: "Commercial Solar", href: "/services/commercial-solar", description: "Business solar installations" },
      { title: "Generators", href: "/services/generators", description: "Commercial backup power" },
    ],
    brands: [],
    blogs: [
      { title: "Canadian Rebates for Solar", href: "/blog/canadian-rebates-solar" },
      { title: "Geothermal for Home or Business", href: "/blog/geothermal-for-my-home-or-business-making-the-switch-and-how-to-avoid-costly-mistakes" },
    ],
    resources: [
      { title: "Financing Options", href: "/financing", description: "Commercial financing solutions" },
      { title: "FAQ", href: "/faq", description: "Commercial service questions" },
    ],
  },
};

export const pageToCluster: Record<string, string[]> = {
  "/services/mini-split-heat-pumps": ["heat-pumps"],
  "/services/ducted-central-heat-pumps": ["heat-pumps"],
  "/services/geothermal-heat-pumps": ["heat-pumps"],
  "/services/heat-pumps-and-air-conditioning": ["heat-pumps", "home-comfort"],
  "/services/dual-fuel-heating-systems": ["heat-pumps"],
  "/services/water-heaters": ["heat-pumps", "home-comfort"],
  "/services/maintenance-service-yeti": ["heat-pumps", "home-comfort"],
  "/services/solar-energy": ["solar"],
  "/services/residential-solar": ["solar"],
  "/services/commercial-solar": ["solar", "commercial"],
  "/services/sprayfoam-insulation": ["insulation"],
  "/services/batt-poly-insulation": ["insulation"],
  "/services/blown-in-insulation": ["insulation"],
  "/services/soundproofing": ["insulation"],
  "/services/air-conditioning": ["home-comfort"],
  "/services/indoor-air-quality-ventilation": ["home-comfort"],
  "/services/peak-thermostat": ["home-comfort"],
  "/services/generators": ["solar", "home-comfort", "commercial"],
  "/services/commercial-hvac": ["commercial"],
  "/services/commercial-services": ["commercial"],
  "/brands/daikin-heat-pumps": ["heat-pumps"],
  "/brands/mitsubishi-electric-heat-pumps": ["heat-pumps"],
  "/brands/lg-heat-pumps": ["heat-pumps"],
  "/brands/general-electric-heat-pumps": ["heat-pumps"],
  "/brands/gridless-heat-pumps": ["heat-pumps"],
  "/brands/kerr-heat-pumps": ["heat-pumps"],
};

export const blogToCluster: Record<string, string[]> = {
  "benefits-of-heat-pumps": ["heat-pumps"],
  "benefits-of-hvac-systems": ["heat-pumps", "home-comfort"],
  "understanding-hvac-systems": ["heat-pumps", "home-comfort"],
  "energy-saving-tips-for-your-home-greenfoots-guide-for-2025": ["heat-pumps", "insulation"],
  "energy-efficiency-tips": ["heat-pumps", "insulation"],
  "canadian-rebates-solar": ["solar"],
  "solar-energy-myths": ["solar"],
  "peak-smart-thermostat-revolutionizing-home-climate-control": ["home-comfort"],
  "all-in-one-comfort-discover-the-full-range-of-services-at-greenfoot-energy-solutions": ["home-comfort"],
  "geothermal-for-my-home-or-business-making-the-switch-and-how-to-avoid-costly-mistakes": ["heat-pumps", "commercial"],
  "greenfoot-partners-with-saint-john-energy-2025-update": ["heat-pumps"],
};

export function getRelatedLinks(currentPath: string, maxPerSection: number = 4): {
  services: TopicLink[];
  brands: TopicLink[];
  blogs: TopicLink[];
  resources: TopicLink[];
} {
  const clusterIds = pageToCluster[currentPath] || [];
  const services: TopicLink[] = [];
  const brands: TopicLink[] = [];
  const blogs: TopicLink[] = [];
  const resources: TopicLink[] = [];
  const seen = new Set<string>();
  seen.add(currentPath);

  for (const clusterId of clusterIds) {
    const cluster = topicClusters[clusterId];
    if (!cluster) continue;

    if (cluster.pillar.href !== currentPath && !seen.has(cluster.pillar.href)) {
      services.unshift(cluster.pillar);
      seen.add(cluster.pillar.href);
    }

    for (const item of cluster.services) {
      if (!seen.has(item.href) && services.length < maxPerSection) {
        services.push(item);
        seen.add(item.href);
      }
    }
    for (const item of cluster.brands) {
      if (!seen.has(item.href) && brands.length < maxPerSection) {
        brands.push(item);
        seen.add(item.href);
      }
    }
    for (const item of cluster.blogs) {
      if (!seen.has(item.href) && blogs.length < maxPerSection) {
        blogs.push(item);
        seen.add(item.href);
      }
    }
    for (const item of cluster.resources) {
      if (!seen.has(item.href) && resources.length < maxPerSection) {
        resources.push(item);
        seen.add(item.href);
      }
    }
  }

  return { services, brands, blogs, resources };
}

export function getBlogRelatedLinks(blogSlug: string, maxPerSection: number = 4): {
  services: TopicLink[];
  brands: TopicLink[];
  resources: TopicLink[];
} {
  const clusterIds = blogToCluster[blogSlug] || [];
  const services: TopicLink[] = [];
  const brands: TopicLink[] = [];
  const resources: TopicLink[] = [];
  const seen = new Set<string>();
  seen.add(`/blog/${blogSlug}`);

  for (const clusterId of clusterIds) {
    const cluster = topicClusters[clusterId];
    if (!cluster) continue;

    if (!seen.has(cluster.pillar.href)) {
      services.unshift(cluster.pillar);
      seen.add(cluster.pillar.href);
    }

    for (const item of cluster.services) {
      if (!seen.has(item.href) && services.length < maxPerSection) {
        services.push(item);
        seen.add(item.href);
      }
    }
    for (const item of cluster.brands) {
      if (!seen.has(item.href) && brands.length < maxPerSection) {
        brands.push(item);
        seen.add(item.href);
      }
    }
    for (const item of cluster.resources) {
      if (!seen.has(item.href) && resources.length < maxPerSection) {
        resources.push(item);
        seen.add(item.href);
      }
    }
  }

  return { services, brands, resources };
}

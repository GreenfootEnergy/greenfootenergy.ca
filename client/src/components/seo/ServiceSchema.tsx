import { useEffect } from "react";
import { faqs as staticFaqs } from "@/data/faqs";

interface ServiceSchemaProps {
  serviceName: string;
  serviceDescription: string;
  serviceType: string;
  serviceUrl: string;
  imageUrl?: string;
  priceRange?: string;
  areaServed?: string[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export function ServiceSchema({
  serviceName,
  serviceDescription,
  serviceType,
  serviceUrl,
  imageUrl,
  priceRange = "$$",
  areaServed = ["Nova Scotia", "New Brunswick", "Prince Edward Island", "Newfoundland", "British Columbia"],
  aggregateRating,
  faqs,
}: ServiceSchemaProps) {
  useEffect(() => {
    const existingSchema = document.getElementById("service-schema-jsonld");
    if (existingSchema) {
      existingSchema.remove();
    }

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://www.greenfootenergy.ca/#organization",
      name: "Greenfoot Energy Solutions",
      description: "Leading provider of heat pump installation, solar energy, and HVAC services across Atlantic Canada and British Columbia.",
      url: "https://www.greenfootenergy.ca",
      telephone: "+1-800-380-9384",
      email: "info@greenfootenergy.ca",
      priceRange: priceRange,
      areaServed: areaServed.map((area) => ({
        "@type": "AdministrativeArea",
        name: area,
      })),
      address: {
        "@type": "PostalAddress",
        streetAddress: "133 Ilsley Avenue, Unit H",
        addressLocality: "Dartmouth",
        addressRegion: "Nova Scotia",
        postalCode: "B3B 1S9",
        addressCountry: "CA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 44.7064,
        longitude: -63.5729,
      },
      sameAs: [
        "https://www.facebook.com/greenfootenergy",
        "https://www.instagram.com/greenfootenergy",
        "https://www.youtube.com/greenfootenergy",
      ],
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceName,
      description: serviceDescription,
      serviceType: serviceType,
      provider: {
        "@type": "LocalBusiness",
        name: "Greenfoot Energy Solutions",
        "@id": "https://www.greenfootenergy.ca/#organization",
      },
      url: serviceUrl,
      ...(imageUrl && { image: imageUrl }),
      areaServed: areaServed.map((area) => ({
        "@type": "AdministrativeArea",
        name: area,
      })),
      ...(aggregateRating && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: aggregateRating.ratingValue,
          reviewCount: aggregateRating.reviewCount,
        },
      }),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${serviceName} Services`,
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `${serviceName} Installation`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `${serviceName} Repair`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `${serviceName} Maintenance`,
            },
          },
        ],
      },
    };

    const faqSchema = faqs && faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    } : null;

    const combinedSchema: object[] = [localBusinessSchema, serviceSchema];
    if (faqSchema) {
      combinedSchema.push(faqSchema);
    }

    const script = document.createElement("script");
    script.id = "service-schema-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(combinedSchema);
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.getElementById("service-schema-jsonld");
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [serviceName, serviceDescription, serviceType, serviceUrl, imageUrl, priceRange, areaServed, aggregateRating, faqs]);

  return null;
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  useEffect(() => {
    const existingSchema = document.getElementById("breadcrumb-schema-jsonld");
    if (existingSchema) {
      existingSchema.remove();
    }

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    const script = document.createElement("script");
    script.id = "breadcrumb-schema-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.getElementById("breadcrumb-schema-jsonld");
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [items]);

  return null;
}

interface ServiceSchemaWithFAQsProps extends Omit<ServiceSchemaProps, 'faqs'> {
  faqCategory: string;
  faqLimit?: number;
}

export function ServiceSchemaWithFAQs({
  faqCategory,
  faqLimit = 10,
  ...schemaProps
}: ServiceSchemaWithFAQsProps) {
  const filteredFaqs = [...staticFaqs]
    .filter((faq) => faq.isActive && faq.category?.toLowerCase().includes(faqCategory.toLowerCase()))
    .slice(0, faqLimit)
    .map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }));

  return (
    <ServiceSchema
      {...schemaProps}
      faqs={filteredFaqs}
    />
  );
}

interface SpecialOffersSchemaProps {
  promotions: Array<{
    id: string;
    title: string;
    description: string | null;
    province: string;
    link: string | null;
    linkText: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isActive: boolean;
    isFeatured: boolean;
  }>;
  province?: string;
}

export function SpecialOffersSchema({ promotions, province }: SpecialOffersSchemaProps) {
  useEffect(() => {
    const existingSchema = document.getElementById("special-offers-schema-jsonld");
    if (existingSchema) {
      existingSchema.remove();
    }

    const activePromotions = promotions.filter(p => p.isActive);
    if (activePromotions.length === 0) return;

    const offerCatalog = {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      name: province ? `${province} Energy Efficiency Offers` : "Energy Efficiency Offers",
      description: `Special offers and promotions on heat pumps, insulation, and energy upgrades${province ? ` in ${province}` : ''}.`,
      itemListElement: activePromotions.map((promo, index) => ({
        "@type": "Offer",
        "@id": `https://www.greenfootenergy.ca/specials-promotions#offer-${promo.id}`,
        position: index + 1,
        name: promo.title,
        description: promo.description || '',
        url: promo.link || "https://www.greenfootenergy.ca/specials-promotions",
        availability: "https://schema.org/InStock",
        priceCurrency: "CAD",
        areaServed: {
          "@type": "AdministrativeArea",
          name: promo.province,
        },
        seller: {
          "@type": "LocalBusiness",
          name: "Greenfoot Energy Solutions",
          url: "https://www.greenfootenergy.ca",
        },
        ...(promo.endDate && { validThrough: new Date(promo.endDate).toISOString().split('T')[0] }),
        ...(promo.startDate && { validFrom: new Date(promo.startDate).toISOString().split('T')[0] }),
      })),
    };

    const eventSchema = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: province ? `${province} Energy Savings Event` : "Energy Savings Event",
      description: `Special promotions and rebates on energy-efficient home upgrades${province ? ` for ${province} residents` : ''}.`,
      url: province 
        ? `https://www.greenfootenergy.ca/specials/${province.toLowerCase().replace(/\s+/g, '-').replace('and-', '')}`
        : "https://www.greenfootenergy.ca/specials-promotions",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      location: {
        "@type": "VirtualLocation",
        url: "https://www.greenfootenergy.ca/specials-promotions",
      },
      organizer: {
        "@type": "Organization",
        name: "Greenfoot Energy Solutions",
        url: "https://www.greenfootenergy.ca",
      },
      offers: activePromotions.slice(0, 5).map((promo) => ({
        "@type": "Offer",
        name: promo.title,
        url: promo.link || "https://www.greenfootenergy.ca/specials-promotions",
        availability: "https://schema.org/InStock",
        priceCurrency: "CAD",
      })),
    };

    const combinedSchema = [offerCatalog, eventSchema];

    const script = document.createElement("script");
    script.id = "special-offers-schema-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(combinedSchema);
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.getElementById("special-offers-schema-jsonld");
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [promotions, province]);

  return null;
}

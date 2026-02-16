import { useEffect } from "react";

interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  totalTime?: string;
  estimatedCost?: {
    currency: string;
    minValue: number;
    maxValue: number;
  };
  steps: HowToStep[];
  tool?: string[];
  supply?: string[];
}

export function HowToSchema({
  name,
  description,
  totalTime,
  estimatedCost,
  steps,
  tool,
  supply,
}: HowToSchemaProps) {
  useEffect(() => {
    const existingSchema = document.getElementById("howto-schema-jsonld");
    if (existingSchema) {
      existingSchema.remove();
    }

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: name,
      description: description,
      ...(totalTime && { totalTime: totalTime }),
      ...(estimatedCost && {
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: estimatedCost.currency,
          minValue: estimatedCost.minValue,
          maxValue: estimatedCost.maxValue,
        },
      }),
      ...(tool && {
        tool: tool.map((t) => ({
          "@type": "HowToTool",
          name: t,
        })),
      }),
      ...(supply && {
        supply: supply.map((s) => ({
          "@type": "HowToSupply",
          name: s,
        })),
      }),
      step: steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
        ...(step.url && { url: step.url }),
        ...(step.image && { image: step.image }),
      })),
    };

    const script = document.createElement("script");
    script.id = "howto-schema-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(howToSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("howto-schema-jsonld");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [name, description, totalTime, estimatedCost, steps, tool, supply]);

  return null;
}

interface ProductSchemaProps {
  name: string;
  description: string;
  brand: string;
  category: string;
  offers?: {
    priceCurrency: string;
    price: string;
    priceValidUntil?: string;
    availability: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export function ProductSchema({
  name,
  description,
  brand,
  category,
  offers,
  aggregateRating,
}: ProductSchemaProps) {
  useEffect(() => {
    const existingSchema = document.getElementById("product-schema-jsonld");
    if (existingSchema) {
      existingSchema.remove();
    }

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: name,
      description: description,
      brand: {
        "@type": "Brand",
        name: brand,
      },
      category: category,
      ...(offers && {
        offers: {
          "@type": "Offer",
          ...offers,
        },
      }),
      ...(aggregateRating && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: aggregateRating.ratingValue,
          reviewCount: aggregateRating.reviewCount,
        },
      }),
    };

    const script = document.createElement("script");
    script.id = "product-schema-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(productSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("product-schema-jsonld");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [name, description, brand, category, offers, aggregateRating]);

  return null;
}

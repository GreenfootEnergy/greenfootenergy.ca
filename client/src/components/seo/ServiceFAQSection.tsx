import { motion } from "framer-motion";
import { HelpCircle, ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { faqs } from "@/data/faqs";

interface ServiceFAQSectionProps {
  category: string;
  limit?: number;
  title?: string;
}

export function ServiceFAQSection({ category, limit = 5, title }: ServiceFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs
    .filter((faq) => faq.isActive && faq.category?.toLowerCase().includes(category.toLowerCase()))
    .slice(0, limit);

  if (filteredFaqs.length === 0) return null;

  return (
    <section className="py-16 lg:py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#8dc63f]/10 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#333333]">
            {title || `Common Questions About ${category}`}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="font-semibold text-[#333333]">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-6 pb-5"
                >
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-[#8dc63f] font-semibold hover:gap-3 transition-all"
          >
            View All FAQs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

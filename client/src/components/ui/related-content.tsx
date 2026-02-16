import { Link } from "wouter";
import { ChevronRight, BookOpen, Wrench, Award, HelpCircle } from "lucide-react";
import { type TopicLink, getRelatedLinks, getBlogRelatedLinks } from "@/data/topic-clusters";

interface RelatedContentSectionProps {
  title: string;
  icon: React.ReactNode;
  links: TopicLink[];
}

function RelatedContentSection({ title, icon, links }: RelatedContentSectionProps) {
  if (links.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-bold text-[#333333] mb-3 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <span className="group flex items-start gap-2 p-2.5 rounded-lg hover:bg-[#8dc63f]/10 transition-colors cursor-pointer" data-testid={`dkn-link-${link.href.replace(/\//g, '-').slice(1)}`}>
                <ChevronRight className="w-4 h-4 text-[#8dc63f] mt-0.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                <div>
                  <span className="text-[#333333] font-medium group-hover:text-[#8dc63f] transition-colors">
                    {link.title}
                  </span>
                  {link.description && (
                    <span className="block text-sm text-slate-500 mt-0.5">{link.description}</span>
                  )}
                </div>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface RelatedContentProps {
  currentPath: string;
  heading?: string;
  maxPerSection?: number;
  variant?: "full" | "compact";
}

export function RelatedContent({ currentPath, heading = "Explore Related Topics", maxPerSection = 4, variant = "full" }: RelatedContentProps) {
  const { services, brands, blogs, resources } = getRelatedLinks(currentPath, maxPerSection);

  const hasContent = services.length > 0 || brands.length > 0 || blogs.length > 0 || resources.length > 0;
  if (!hasContent) return null;

  if (variant === "compact") {
    const allLinks = [...services, ...brands, ...blogs, ...resources].slice(0, 6);
    return (
      <section className="py-12 bg-slate-50 border-t" data-testid="section-related-content">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-[#333333] mb-6 text-center">{heading}</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {allLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-slate-200 hover:border-[#8dc63f] hover:text-[#8dc63f] text-sm font-medium text-slate-700 transition-colors cursor-pointer" data-testid={`dkn-chip-${link.href.replace(/\//g, '-').slice(1)}`}>
                  {link.title}
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-slate-50 border-t" data-testid="section-related-content">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-[#333333] mb-3">{heading}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover more about our services, brands, and helpful resources to find the right energy solution for your home.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <RelatedContentSection
            title="Related Services"
            icon={<Wrench className="w-5 h-5 text-[#8dc63f]" />}
            links={services}
          />
          <RelatedContentSection
            title="Featured Brands"
            icon={<Award className="w-5 h-5 text-[#8dc63f]" />}
            links={brands}
          />
          <RelatedContentSection
            title="Helpful Articles"
            icon={<BookOpen className="w-5 h-5 text-[#8dc63f]" />}
            links={blogs}
          />
          <RelatedContentSection
            title="Resources"
            icon={<HelpCircle className="w-5 h-5 text-[#8dc63f]" />}
            links={resources}
          />
        </div>
      </div>
    </section>
  );
}

interface BlogRelatedContentProps {
  blogSlug: string;
  heading?: string;
  maxPerSection?: number;
}

export function BlogRelatedContent({ blogSlug, heading = "Related Services & Resources", maxPerSection = 4 }: BlogRelatedContentProps) {
  const { services, brands, resources } = getBlogRelatedLinks(blogSlug, maxPerSection);

  const hasContent = services.length > 0 || brands.length > 0 || resources.length > 0;
  if (!hasContent) return null;

  return (
    <section className="py-12 bg-slate-50 border-t" data-testid="section-blog-related-content">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-[#333333] mb-6">{heading}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {services.length > 0 && (
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <h4 className="font-bold text-[#333333] mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#8dc63f]" />
                  Our Services
                </h4>
                <ul className="space-y-2">
                  {services.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <span className="text-sm text-slate-600 hover:text-[#8dc63f] transition-colors flex items-center gap-1.5 cursor-pointer" data-testid={`blog-dkn-service-${link.href.replace(/\//g, '-').slice(1)}`}>
                          <ChevronRight className="w-3.5 h-3.5 text-[#8dc63f] flex-shrink-0" />
                          {link.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {brands.length > 0 && (
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <h4 className="font-bold text-[#333333] mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#8dc63f]" />
                  Brands We Carry
                </h4>
                <ul className="space-y-2">
                  {brands.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <span className="text-sm text-slate-600 hover:text-[#8dc63f] transition-colors flex items-center gap-1.5 cursor-pointer" data-testid={`blog-dkn-brand-${link.href.replace(/\//g, '-').slice(1)}`}>
                          <ChevronRight className="w-3.5 h-3.5 text-[#8dc63f] flex-shrink-0" />
                          {link.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {resources.length > 0 && (
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <h4 className="font-bold text-[#333333] mb-3 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#8dc63f]" />
                  Helpful Resources
                </h4>
                <ul className="space-y-2">
                  {resources.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <span className="text-sm text-slate-600 hover:text-[#8dc63f] transition-colors flex items-center gap-1.5 cursor-pointer" data-testid={`blog-dkn-resource-${link.href.replace(/\//g, '-').slice(1)}`}>
                          <ChevronRight className="w-3.5 h-3.5 text-[#8dc63f] flex-shrink-0" />
                          {link.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

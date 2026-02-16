import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { Home, Phone, Search, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";

import greenfootLogo from "@assets/greenfoot-green-on-black.png";

export default function NotFound() {
  const { t } = useLanguage();
  
  const popularPages = [
    { name: t.services.miniSplit, href: "/services/mini-split-heat-pumps" },
    { name: t.services.residentialSolar, href: "/services/residential-solar" },
    { name: t.services.sprayFoam, href: "/services/sprayfoam-insulation" },
    { name: t.provincialIncentives.title, href: "/provincial-incentives" },
    { name: t.common.contactUs, href: "/contact-us" },
  ];

  return (
    <>
      <Helmet>
        <title>Page Not Found | Greenfoot Energy Solutions</title>
        <meta name="description" content="The page you're looking for doesn't exist. Browse our heat pump, solar, and insulation services or contact us for help." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <SiteHeader />

      <main className="min-h-[70vh] bg-gradient-to-b from-slate-50 to-white flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <span className="text-8xl font-black text-[#8dc63f]">404</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4 uppercase tracking-wide">
              {t.notFound.title}
            </h1>

            <p className="text-lg text-slate-600 mb-8">
              {t.notFound.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/">
                <Button className="bg-[#8dc63f] hover:bg-[#7ab52f] text-white rounded-xl px-6 py-3 text-lg font-semibold inline-flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  {t.notFound.goHome}
                </Button>
              </Link>
              <a href="tel:1-888-447-3364">
                <Button variant="outline" className="border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f] hover:text-white rounded-xl px-6 py-3 text-lg font-semibold inline-flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  {t.notFound.callUs}
                </Button>
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <h2 className="text-xl font-bold text-[#333333] mb-4 flex items-center justify-center gap-2">
                <Search className="w-5 h-5 text-[#8dc63f]" />
                {t.notFound.popularPages}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {popularPages.map((page) => (
                  <Link key={page.href} href={page.href}>
                    <span className="block p-3 rounded-xl bg-slate-50 hover:bg-[#8dc63f] hover:text-white text-slate-700 transition-colors duration-200 font-medium cursor-pointer">
                      {page.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => window.history.back()} 
                className="text-slate-500 hover:text-[#8dc63f] inline-flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.notFound.goBack}
              </button>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

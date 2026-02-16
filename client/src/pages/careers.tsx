import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { BookingModal } from "@/components/ui/booking-modal";
import { useState } from "react";
import { ChevronRight, Star } from "lucide-react";
import { Helmet } from "react-helmet";
import joinTeamImg from "@assets/oin-our-team_1769053931603.avif";
import wellnessImg from "@assets/wellness_benefits_1769053760979.avif";
import healthImg from "@assets/health_benefits_1769053760978.avif";
import safetyImg from "@assets/Safety_&_Training_1769053760979.avif";
import pensionImg from "@assets/pension_program_1769053760979.avif";
import educationImg from "@assets/education_&_upgrades_1769053760978.avif";
import communityImg from "@assets/committed_to_support_1769053760977.avif";

export default function Careers() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Careers at Greenfoot Energy | Join Our Team</title>
        <meta name="description" content="Join Greenfoot Energy Solutions - Canada's fastest-growing energy company. Benefits include health, pension, wellness programs & career growth opportunities." />
        <meta name="keywords" content="Greenfoot careers, HVAC jobs, energy sector jobs, solar installer jobs, Canadian energy careers, employee benefits, job opportunities" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/careers" />
        
        <meta property="og:title" content="Careers at Greenfoot Energy | Join Our Team" />
        <meta property="og:description" content="Build your sustainable career at Canada's fastest-growing energy company. Great benefits & growth opportunities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/careers" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Careers at Greenfoot Energy Solutions" />
        <meta name="twitter:description" content="Join 1,000+ team members at Canada's leading energy solutions company." />
      </Helmet>
      
      <SiteHeader />
      <BookingModal isOpen={isBookingModalOpen} onOpenChange={setIsBookingModalOpen} />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 bg-[#333333] text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight tracking-tight uppercase">
                Launch Your <span className="text-[#8dc63f]">Sustainable Career</span> at Greenfoot Energy Solutions
              </h1>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                At Greenfoot Energy Solutions, we believe in investing in our team's growth and development. We provide a supportive and collaborative work environment that fosters innovation.
              </p>
              <Button 
                className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold h-12 sm:h-14 px-10 rounded-xl text-lg flex items-center gap-2"
                onClick={() => window.open('https://ca.indeed.com/cmp/Greenfoot-Energy-Solutions-3', '_blank')}
              >
                BROWSE JOBS <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <div className="lg:w-1/2 relative">
              <img 
                src={joinTeamImg} 
                alt="Join our team" 
                className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#8dc63f] rounded-full z-0 opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-[#333333] mb-4 uppercase">
            EMPLOYEE WELLNESS BENEFITS
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            FITNESS, HEALTH, PENSION & MORE
          </p>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Wellness */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <img src={wellnessImg} alt="Wellness Benefits" className="w-16 h-16 object-contain mb-6" />
            <h3 className="text-xl font-black mb-4 uppercase">WELLNESS BENEFITS</h3>
            <ul className="space-y-3 text-slate-600">
              <li>• 50% fitness refund (up to $40/month)</li>
              <li>• 75% smoking cessation coverage</li>
              <li>• $200 kids sports sponsorship grant</li>
            </ul>
          </div>

          {/* Health */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <img src={healthImg} alt="Health Benefits" className="w-16 h-16 object-contain mb-6" />
            <h3 className="text-xl font-black mb-4 uppercase">HEALTH BENEFITS</h3>
            <ul className="space-y-3 text-slate-600">
              <li>• Prescription, dental, and vision care</li>
              <li>• Professional counselling (Stress/Anxiety)</li>
              <li>• Life insurance & Family plan coverage</li>
            </ul>
          </div>

          {/* Safety & Training */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <img src={safetyImg} alt="Safety & Training" className="w-16 h-16 object-contain mb-6" />
            <h3 className="text-xl font-black mb-4 uppercase">SAFETY & TRAINING</h3>
            <p className="text-slate-600">
              Free safety training sessions for all team members along with opportunities to improve skill sets.
            </p>
          </div>

          {/* Pension */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-[#8dc63f] rounded-full flex items-center justify-center mb-6">
              <Star className="w-9 h-9 text-black fill-black stroke-[3]" />
            </div>
            <h3 className="text-xl font-black mb-4 uppercase">PENSION PROGRAM</h3>
            <p className="text-slate-600">
              Company contributions match up to 4% of annual salary.
            </p>
          </div>

          {/* Education */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow lg:col-span-2">
            <img src={educationImg} alt="Education & Upgrades" className="w-16 h-16 object-contain mb-6" />
            <h3 className="text-xl font-black mb-4 uppercase">EDUCATION & UPGRADES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600">
              <ul className="space-y-2">
                <li>• $500 Grocery Gift Card</li>
                <li>• Gas card for fuel expenses</li>
              </ul>
              <ul className="space-y-2">
                <li>• Laptop bag</li>
                <li>• Clothing swag package</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl lg:text-5xl font-black text-[#333333] mb-6 uppercase leading-tight">
                COMMITTED TO COMMUNITY SUPPORT
              </h2>
              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                At Greenfoot Energy, we are deeply committed to corporate social responsibility and believe in supporting the communities where we live.
              </p>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed font-bold">
                One of the ways we give back is through the Greenfoot Home Energy Makeover.
              </p>
              <div className="p-6 bg-[#8dc63f]/10 rounded-2xl border-l-4 border-[#8dc63f]">
                <p className="text-slate-700">
                  This initiative helps families in need by transforming their homes into more energy-efficient spaces—completely free of charge.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src={communityImg} 
                alt="Community Support" 
                className="rounded-3xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

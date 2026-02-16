import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { HreflangTags } from "@/components/seo/HreflangTags";
import { CheckCircle2, Smartphone, Settings, Wifi, ArrowRight } from "lucide-react";

const setupSteps = [
  {
    icon: Smartphone,
    title: "1. Download the App",
    description: "Find the Greenfoot Connect app on the Apple App Store or Google Play Store. It's compatible with all modern smartphones and tablets."
  },
  {
    icon: Settings,
    title: "2. Create Your Account",
    description: "Open the app and follow the prompts to create your account using your email address. Be sure to use the same email provided during your installation."
  },
  {
    icon: Wifi,
    title: "3. Connect to Your Device",
    description: "Follow the on-screen instructions to connect your new heat pump or thermostat to your home's Wi-Fi network."
  },
  {
    icon: CheckCircle2,
    title: "4. You're All Set!",
    description: "Once connected, you can start controlling your home's comfort from anywhere in the world."
  }
];

export default function AppSetupPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <HreflangTags canonicalPath="/app-setup" />
      <SiteHeader />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-slate-50 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">
              App Setup & Support
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              Get your home comfort system connected in minutes. Download our app and follow these simple steps to start saving and stay comfortable.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors h-14">
                <Smartphone className="w-6 h-6" />
                <span>App Store</span>
              </a>
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors h-14">
                <Settings className="w-6 h-6" />
                <span>Google Play</span>
              </a>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-[#333333] text-center mb-16">Simple 4-Step Connection</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {setupSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-xl bg-[#8dc63f]/10 flex items-center justify-center text-[#8dc63f] mb-6">
                      <step.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#333333] mb-4">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < setupSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-slate-200">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="bg-white py-12 border-t border-slate-100">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="bg-[#1E5AA8] rounded-2xl p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-6 text-white">Need Help Connecting?</h2>
              <p className="text-white/80 text-lg mb-8">
                Our team of technical support experts is standing by to help you get connected. If you encounter any issues during setup, don't hesitate to reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:18003809384" 
                  className="bg-white text-[#1E5AA8] font-bold h-14 px-8 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  Call Support
                </a>
                <a 
                  href="/contact-us" 
                  className="bg-transparent border-2 border-white text-white font-bold h-14 px-8 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  Contact Form
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

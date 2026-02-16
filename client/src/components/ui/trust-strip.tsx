import trustExpertise from "@assets/trust-unmatched-expertise.svg";
import trustSatisfaction from "@assets/trust-satisfaction.webp";
import trustRedSeal from "@assets/trust-red-seal.webp";

export function TrustStrip() {
  return (
    <section className="py-6 bg-[#e8e4dd] border-b border-[#c5c2bc]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <img src={trustExpertise} alt="Unmatched Expertise" className="w-14 h-14 object-contain flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[#333333] text-base">Unmatched Expertise</h3>
              <p className="text-[#333333]/60 text-sm">With our team of seasoned home comfort advisors.</p>
            </div>
          </div>
          <div className="hidden md:block w-px bg-[#c5c2bc] self-stretch"></div>
          <div className="flex items-center gap-4">
            <img src={trustSatisfaction} alt="Satisfaction Guaranteed" className="w-14 h-14 object-contain flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[#333333] text-base">Satisfaction Guaranteed</h3>
              <p className="text-[#333333]/60 text-sm">When you experience our customer-oriented service.</p>
            </div>
          </div>
          <div className="hidden md:block w-px bg-[#c5c2bc] self-stretch"></div>
          <div className="flex items-center gap-4">
            <img src={trustRedSeal} alt="Red Seal Certified" className="w-14 h-14 object-contain flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[#333333] text-base">Red Seal Certified</h3>
              <p className="text-[#333333]/60 text-sm">Every install is performed by certified technicians.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

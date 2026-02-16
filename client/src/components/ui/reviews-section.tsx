import { useState } from "react";
import quoteGreen from "@assets/Black-green-quote_1767996683816.png";
import quoteWhite from "@assets/Black-white-quote_1767996683817.png";
import { useLanguage } from "@/lib/i18n";

const reviews = [
  { headline: "FIXED A LONG STANDING ISSUE I HAD FROM POOR INSTALLATION BY ANOTHER COMPANY!", text: "The two technicians Tanner and Halim were excellent, did a great job, very tidy, and identified 2 problems with my heat pump head, and fixed a long standing issue I had from poor installation by another company! Thank you very much, looking forward to using Greenfoot again.", author: "Frederick TOFFLEMIRE" },
  { headline: "I ONLY WISH THEY INSTALLED OUR HEAT PUMP ORIGINALLY", text: "Great company to deal with. We hired them to move an existing heat pump after the original installer refused to help us. The estimator and the installer were both very polite, careful and thorough. I only wish they installed our heat pump originally. I would hire them again without hesitation.", author: "Ellen DOWNEY" },
  { headline: "WHEN THEY LEFT THE HOUSE THERE WAS NO MESS TO CLEAN UP!", text: "The young chaps, Marlon Marcuflo and Sylvia Richard, were wonderful to deal with. They were extremely polite, very tidy and efficient in their work, were right on schedule and did an excellent job. When they left the house there was no mess to clean up. I would recommend Greenfoot Energy Solutions to anyone thinking of upgrading their home.", author: "Alice GRACIE" },
  { headline: "THEIR ENTIRE TEAM IS EXTREMELY EXPERIENCED, KNOWLEDGEABLE, AND CONSIDERATE", text: "We hired Greenfoot to install 2 heat pumps. From the beginning to end - initial home visit to the final installation touches - they were wonderful to work with. Their entire team is extremely experienced, knowledgeable, and considerate; and were very accommodating.", author: "Michael BOYD" },
  { headline: "OUR OLD HOUSE FEELS LIKE A BRAND NEW CONSTRUCTION", text: "The Greenfoot Team did amazing work in our home. Our old house (built in 1959) feels like a brand new construction thanks to the ductless heat pumps, spray foam insulation and HVAC installed by the friendliest staff! Everyone we spoke to from Greenfoot was helpful and just seemed genuinely happy in their job.", author: "Happy Homeowner" },
];

export function ReviewsSection() {
  const { t } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="pt-16 pb-0 bg-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#333333] font-black uppercase tracking-widest text-sm mb-1">{t.home.reviewsSection.whatPeopleAre}</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#333333] uppercase tracking-tight">
            {t.home.reviewsSection.sayingAbout}
          </h2>
          <h2 className="text-4xl md:text-6xl font-black text-[#8dc63f] uppercase -mt-1">
            {t.home.reviewsSection.greenfoot}
          </h2>
          <p className="text-slate-600 mt-4">{t.home.reviewsSection.subtitle}</p>
        </div>
      </div>
      
      <div className="bg-[#333333] py-12 overflow-hidden">
        <div 
          className="flex hover:[animation-play-state:paused] animate-scroll-horizontal" 
          style={{ 
            width: 'max-content',
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="flex gap-6 px-3">
              {reviews.map((review, idx) => (
                <div key={idx} className="flex-shrink-0 w-80 bg-[#2a2a2a] rounded-xl p-6 pt-8 pb-8 relative">
                  <div className="absolute -top-5 left-3">
                    <img src={quoteGreen} alt="" className="w-12 h-12 rotate-180" />
                  </div>
                  <div className="absolute -bottom-5 right-3">
                    <img src={quoteWhite} alt="" className="w-12 h-12" />
                  </div>
                  <div className="mt-2">
                    <p className="text-[#8dc63f] font-black italic text-lg leading-tight mb-4">"{review.headline}"</p>
                    <p className="text-white/80 text-sm leading-relaxed mb-6">{review.text}</p>
                    <p className="text-white font-bold">{review.author} - <span className="text-[#8dc63f] italic">{t.home.reviewsSection.starReview}</span></p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

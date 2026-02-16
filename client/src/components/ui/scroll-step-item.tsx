import { useState, useRef, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface StepFooter {
  cost?: string;
  timeline?: string;
  singleZone?: string;
  multiZone?: string;
  singleArea?: string;
  multipleAreas?: string;
  residential?: string;
  commercial?: string;
  totalTurnaround?: string;
  installationDay?: string;
  duration?: string;
}

interface StepData {
  step: number;
  title: string;
  intro: string;
  details: string[];
  footer?: StepFooter;
  showCta?: boolean;
}

interface ScrollStepItemProps {
  step: StepData;
  index: number;
  total: number;
  ctaText?: string;
  ctaIcon?: boolean;
}

export function ScrollStepItem({ step, index, total, ctaText, ctaIcon = false }: ScrollStepItemProps) {
  const { t } = useLanguage();
  const stepRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const footerLabels: Record<keyof StepFooter, string> = {
    cost: t.common.stepLabels.cost,
    timeline: t.common.stepLabels.timeline,
    singleZone: t.common.stepLabels.singleZone,
    multiZone: t.common.stepLabels.multiZone,
    singleArea: t.common.stepLabels.singleArea,
    multipleAreas: t.common.stepLabels.multipleAreas,
    residential: t.common.stepLabels.residential,
    commercial: t.common.stepLabels.commercial,
    totalTurnaround: t.common.stepLabels.totalTurnaround,
    installationDay: t.common.stepLabels.installationDay,
    duration: t.common.stepLabels.duration,
  };

  const resolvedCtaText = ctaText || t.common.getFreeQuote;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting && entry.intersectionRatio >= 0.5);
      },
      { threshold: 0.5 }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={stepRef} className="flex gap-8 mb-8 last:mb-0 group">
      <div className="flex flex-col items-center">
        <div 
          className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl font-black text-white italic z-10 transition-colors duration-500 ${isActive ? 'bg-[#8dc63f]' : 'bg-[#333333]'}`}
        >
          {String(step.step).padStart(2, '0')}
        </div>
        {index < total - 1 && (
          <div 
            className={`w-0.5 flex-1 min-h-[40px] transition-colors duration-500 ${isActive ? 'bg-[#8dc63f]' : 'bg-[#333333]'}`}
          ></div>
        )}
      </div>
      
      <div className="flex-1 bg-[#333333] rounded-xl p-6 text-white">
        <p className="text-[#8dc63f] text-sm font-bold tracking-wider mb-2">{t.common.step} {String(step.step).padStart(2, '0')}</p>
        <h3 className="font-bold text-xl mb-3">{step.title}</h3>
        <p className="text-white/70 mb-4">{step.intro}</p>
        
        {step.details.length > 0 && (
          <ul className="space-y-2 mb-4">
            {step.details.map((detail, j) => (
              <li key={j} className="flex items-start gap-3 text-sm text-white/80">
                <span className="text-white/50 mt-1">•</span>
                {detail}
              </li>
            ))}
          </ul>
        )}
        
        {step.footer && Object.keys(step.footer).length > 0 && (
          <div className="bg-white/10 rounded-xl px-4 py-3 flex flex-wrap gap-6 mb-4">
            {(Object.entries(step.footer) as [keyof StepFooter, string | undefined][]).map(([key, value]) => 
              value ? (
                <p key={key} className="text-sm">
                  <span className="text-[#8dc63f] font-bold">{footerLabels[key]}:</span>{" "}
                  <span className="text-white/80">{value}</span>
                </p>
              ) : null
            )}
          </div>
        )}
        
        {step.showCta && (
          <Button 
            className="mt-4 bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold px-8 py-3 rounded-xl"
            onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
            data-testid="button-step-cta"
          >
            {resolvedCtaText}
            {ctaIcon && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        )}
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    step: 1,
    label: "STEP 01",
    title: "Connect Your Profile",
    desc: "Securely link your Google Business Profile via OAuth. More platforms — Facebook, Yelp, Trustpilot — are rolling out in Phase 2.",
    bullets: ["Done in under 2 minutes", "No technical skills needed", "Fully encrypted connection"],
    illustration: (
      <svg viewBox="0 0 200 150" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="150" rx="12" fill="#F0F4FF" />
        <rect x="70" y="15" width="60" height="100" rx="8" fill="white" stroke="#0066FF" strokeWidth="2" />
        <rect x="79" y="22" width="42" height="5" rx="2.5" fill="#E2E8F0" />
        <circle cx="100" cy="112" r="4" fill="#E2E8F0" />
        <rect x="88" y="68" width="24" height="18" rx="3" fill="#0066FF" />
        <path d="M92 68 Q92 58 100 58 Q108 58 108 68" fill="none" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="100" cy="75" r="2.5" fill="white" />
        <rect x="98.5" y="75" width="3" height="5" rx="1" fill="white" />
        <circle cx="148" cy="38" r="18" fill="white" stroke="#DADCE0" strokeWidth="1.5" />
        <path d="M156 38.25h-7.5v-4h7.5c.13.86.2 1.76.2 2.68 0 .47-.02.92-.06 1.36z" fill="#4285F4" />
        <path d="M148.5 48.5c-3.55 0-6.62-1.95-8.22-4.82l3.06-2.51c.81 2.19 2.9 3.76 5.16 3.76 1.27 0 2.44-.37 3.38-1.01l2.99 2.32A10.43 10.43 0 0 1 148.5 48.5z" fill="#34A853" />
        <path d="M140.28 43.68l-3.06 2.51A10.43 10.43 0 0 1 138 38c0-1.88.5-3.64 1.37-5.16l3.09 2.55A6.04 6.04 0 0 0 142.5 38c0 2.05.51 3.97 1.41 5.68h-3.63z" fill="#FBBC05" />
        <path d="M148.5 27.5c2.84 0 5.37 1.02 7.36 2.7l-2.91 2.83c-1.2-1.15-2.8-1.85-4.45-1.85-2.26 0-4.29 1.32-5.29 3.27l-3.09-2.55A10.39 10.39 0 0 1 148.5 27.5z" fill="#EA4335" />
        <line x1="131" y1="58" x2="119" y2="67" stroke="#0066FF" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#0066FF" />
          </marker>
        </defs>
      </svg>
    ),
  },
  {
    step: 2,
    label: "STEP 02",
    title: "AI Drafts Responses",
    desc: "Every Monday, ReviewFlow fetches your new reviews and generates locally-tuned AI responses — ready for your approval. No prompting required.",
    bullets: ["Responses tuned to your location & industry", "Runs automatically every week", "You stay in full control"],
    illustration: (
      <svg viewBox="0 0 200 150" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="150" rx="12" fill="#FFFDF0" />
        <rect x="45" y="20" width="80" height="100" rx="8" fill="white" stroke="#0066FF" strokeWidth="2" />
        <rect x="45" y="20" width="80" height="22" rx="8" fill="#0066FF" />
        <rect x="45" y="35" width="80" height="8" fill="#0066FF" />
        <text x="85" y="36" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white">AI RESPONSE</text>
        <rect x="58" y="52" width="54" height="4" rx="2" fill="#CBD5E1" />
        <rect x="58" y="62" width="44" height="4" rx="2" fill="#CBD5E1" />
        <rect x="58" y="72" width="50" height="4" rx="2" fill="#CBD5E1" />
        <rect x="58" y="82" width="36" height="4" rx="2" fill="#CBD5E1" />
        <rect x="58" y="92" width="48" height="4" rx="2" fill="#CBD5E1" />
        <path d="M152 44 L156 32 L160 44 L172 48 L160 52 L156 64 L152 52 L140 48 Z" fill="#FFD232" />
        <path d="M133 35 L134.5 31 L136 35 L140 36.5 L136 38 L134.5 42 L133 38 L129 36.5 Z" fill="#FFD232" opacity="0.65" />
        <circle cx="161" cy="74" r="3.5" fill="#FFD232" opacity="0.55" />
        <circle cx="136" cy="78" r="2" fill="#FFD232" opacity="0.45" />
      </svg>
    ),
  },
  {
    step: 3,
    label: "STEP 03",
    title: "Approve in One Click",
    desc: "Review each AI draft in your dashboard. Edit if you want, or approve as-is. We publish to Google instantly.",
    bullets: ["Nothing goes live without your sign-off", "Edit or reject any draft", "Published directly to Google"],
    illustration: (
      <svg viewBox="0 0 200 150" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="150" rx="12" fill="#F0FFF4" />
        <circle cx="100" cy="65" r="44" fill="#22C55E" opacity="0.08" />
        <circle cx="100" cy="65" r="32" fill="#22C55E" opacity="0.14" />
        <circle cx="100" cy="65" r="22" fill="#22C55E" />
        <path d="M90 65 L97 72 L113 56" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="65" y="112" width="70" height="22" rx="11" fill="#0066FF" />
        <text x="100" y="127" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="10" fill="white">PUBLISHED ✓</text>
        <line x1="100" y1="88" x2="100" y2="110" stroke="#0066FF" strokeWidth="1.5" strokeDasharray="3 2" />
      </svg>
    ),
  },
];

export default function HowItWorksTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Timeline line animation
    const lineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("timeline-active");
          }
        });
      },
      { threshold: 0.1 }
    );
    lineObserver.observe(section);

    // Step entry animations
    const stepObservers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el) => {
      if (!el) return;
      el.classList.add("step-hidden");
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove("step-hidden");
              entry.target.classList.add("step-visible");
            }
          });
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      stepObservers.push(obs);
    });

    return () => {
      lineObserver.disconnect();
      stepObservers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div>
      {/* Section heading */}
      <div className="text-center mb-16">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-brand/20 bg-brand/5 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-brand">
          THE PROCESS
        </div>
        <h2 className="mb-4 text-4xl font-black tracking-tight sm:text-5xl text-foreground">
          As Easy as 1-2-3
        </h2>
        <p className="max-w-xl mx-auto text-lg text-muted-foreground leading-relaxed">
          No complex setup. No lengthy onboarding. Just results from day one.
        </p>
      </div>

      {/* Timeline container */}
      <div ref={sectionRef} className="relative max-w-3xl mx-auto">

        {/* Vertical line — desktop (center) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] hidden sm:block overflow-hidden">
          <div
            className="timeline-line w-full"
            style={{ background: "linear-gradient(to bottom, hsl(220 69% 40%), hsl(220 69% 40% / 0.15))" }}
          />
        </div>

        {/* Vertical line — mobile (left) */}
        <div className="absolute left-[28px] top-0 bottom-0 w-[2px] sm:hidden overflow-hidden">
          <div
            className="timeline-line w-full"
            style={{ background: "linear-gradient(to bottom, hsl(220 69% 40%), hsl(220 69% 40% / 0.15))" }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex flex-col gap-20">
          {STEPS.map((step, index) => {
            const isTextLeft = index % 2 === 0;

            return (
              <div
                key={step.step}
                ref={(el) => { stepRefs.current[index] = el; }}
                style={{ transitionDelay: `${0.2 + index * 0.3}s` }}
                className="relative"
              >
                {/* Timeline circle node — desktop */}
                <div className="absolute left-1/2 -translate-x-1/2 top-6 hidden sm:flex w-12 h-12 rounded-full bg-brand border-4 border-white shadow-lg items-center justify-center z-10">
                  <span className="text-white font-black text-lg leading-none">{step.step}</span>
                </div>

                {/* Timeline circle node — mobile */}
                <div className="absolute left-[16px] top-0 flex sm:hidden w-[24px] h-[24px] rounded-full bg-brand border-2 border-white shadow-md items-center justify-center z-10">
                  <span className="text-white font-black text-[10px] leading-none">{step.step}</span>
                </div>

                {/* Content grid */}
                <div className="grid sm:grid-cols-2 gap-8 items-center pl-14 sm:pl-0">

                  {/* Text side */}
                  <div className={isTextLeft ? "sm:order-1 sm:pr-16 sm:text-right" : "sm:order-2 sm:pl-16"}>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-brand mb-2">{step.label}</p>
                    <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed mb-5">{step.desc}</p>
                    <ul className={`space-y-2 ${isTextLeft ? "sm:flex sm:flex-col sm:items-end" : ""}`}>
                      {step.bullets.map((b) => (
                        <li
                          key={b}
                          className={`flex items-center gap-2 text-sm font-semibold text-foreground ${isTextLeft ? "sm:flex-row-reverse" : ""}`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Illustration side */}
                  <div className={isTextLeft ? "sm:order-2" : "sm:order-1"}>
                    <div className="rounded-2xl bg-surface-2 border border-border aspect-[4/3] flex items-center justify-center overflow-hidden p-4 shadow-sm">
                      {step.illustration}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';

interface AnalyzingViewProps {
  onComplete: () => void;
}

export const AnalyzingView: React.FC<AnalyzingViewProps> = ({ onComplete }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    "Reading responses",
    "Detecting mood",
    "Understanding emotions",
    "Finding movies",
    "Generating explanations",
    "Almost done"
  ];

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    steps.forEach((_, index) => {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, index]);
        if (index === steps.length - 1) {
          setTimeout(() => {
            onComplete();
          }, 800);
        }
      }, (index + 1) * 700);
      timers.push(timer);
    });

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [onComplete]);

  const activeIndex = completedSteps.length;
  const progressPercent = Math.min(100, Math.round((completedSteps.length / steps.length) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-[#131313] text-[#e5e2e1] overflow-hidden flex flex-col justify-between items-center py-10 px-5 animate-fade-in">
      {/* Background Atmospheric Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#7701d0]/20 blur-[140px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#e50914]/15 blur-[160px]"></div>
      </div>

      {/* Top Progress Bar */}
      <div className="w-full max-w-md h-2 bg-[#2a2a2a] rounded-full overflow-hidden relative z-10 shadow-inner mt-4">
        <div
          className="h-full bg-gradient-to-r from-[#e50914] via-[#7701d0] to-[#4cd6ff] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Center Content: Animated Step Checklist */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-md my-auto">
        {/* Glowing Neural Icon */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-8">
          <div className="absolute inset-0 orb-blur pulse-gradient rounded-full opacity-40 animate-pulse"></div>
          <div className="relative w-20 h-20 glass-panel rounded-full flex items-center justify-center shadow-2xl border border-white/20">
            <span
              className="material-symbols-outlined text-4xl text-[#4cd6ff] animate-spin-slow"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              psychology
            </span>
          </div>
        </div>

        {/* Step List Card */}
        <div className="w-full glass-card p-6 rounded-3xl border border-white/10 shadow-2xl space-y-3.5">
          <h2 className="font-montserrat font-extrabold text-lg text-white text-center mb-4 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[#e50914]">auto_awesome</span>
            <span>Neural Mood Analysis</span>
          </h2>

          <div className="space-y-3">
            {steps.map((step, idx) => {
              const isDone = completedSteps.includes(idx);
              const isCurrent = activeIndex === idx;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3.5 p-3 rounded-2xl transition-all duration-300 ${
                    isDone
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-white'
                      : isCurrent
                      ? 'bg-[#7701d0]/20 border border-[#7701d0]/50 text-white shadow-lg'
                      : 'bg-white/5 border border-white/5 text-white/40'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {isDone ? (
                      <span className="material-symbols-outlined text-emerald-400 text-lg">
                        check_circle
                      </span>
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-[#4cd6ff] border-t-transparent animate-spin"></div>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-white/20"></span>
                    )}
                  </div>

                  <span className={`font-montserrat text-xs sm:text-sm font-semibold ${
                    isDone ? 'text-emerald-300' : isCurrent ? 'text-white' : 'text-white/40'
                  }`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full flex flex-col items-center justify-center relative z-10 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg bg-[#e50914] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              movie
            </span>
          </div>
          <span className="font-montserrat text-base font-extrabold tracking-tighter text-white">
            MindFlix <span className="text-[#e50914]">AI</span>
          </span>
        </div>

        <span className="font-inter text-[10px] text-[#e9bcb6]/40 uppercase tracking-widest">
          Precision Mood Matching Engine
        </span>
      </footer>
    </div>
  );
};

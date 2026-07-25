import React, { useState } from 'react';
import { QuestionnaireState } from '../types';
import { PSYCHOLOGICAL_QUESTIONS, QuestionOption } from '../data/questions';

interface QuestionnaireViewProps {
  onStartAnalysis: (state: QuestionnaireState) => void;
  onCancel: () => void;
}

export const QuestionnaireView: React.FC<QuestionnaireViewProps> = ({
  onStartAnalysis,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = PSYCHOLOGICAL_QUESTIONS.length;
  
  // Answers map for all 5 questions
  const [answersMap, setAnswersMap] = useState<Record<number, QuestionOption>>({});
  const [intensity, setIntensity] = useState(80);

  const currentQ = PSYCHOLOGICAL_QUESTIONS[currentStep - 1];
  const selectedOptionForCurrentQ = answersMap[currentQ.id];

  const handleSelectOption = (option: QuestionOption) => {
    setAnswersMap(prev => ({
      ...prev,
      [currentQ.id]: option
    }));
  };

  const handleNext = () => {
    if (!answersMap[currentQ.id]) {
      // Auto select first option if none selected
      handleSelectOption(currentQ.options[0]);
    }

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      finishQuestionnaire();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  const finishQuestionnaire = () => {
    // Ensure all 5 questions have an answer, defaulting if necessary
    const finalAnswers: Record<number, QuestionOption> = { ...answersMap };
    PSYCHOLOGICAL_QUESTIONS.forEach(q => {
      if (!finalAnswers[q.id]) {
        finalAnswers[q.id] = q.options[0];
      }
    });

    onStartAnalysis({
      answersMap: finalAnswers,
      intensity
    });
  };

  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  // Helper to split text by highlight
  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, idx) => 
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={idx} className="ai-gradient-text italic font-extrabold px-1">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col justify-between items-center relative overflow-x-hidden animate-fade-in">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-[#131313]/90 backdrop-blur-xl border-b border-white/10 h-16 flex justify-between items-center px-5 max-w-xl mx-auto inset-x-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="text-[#e9bcb6]/60 hover:text-white active:scale-95 transition-all p-1"
            title="Exit survey"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
          <div className="flex flex-col">
            <span className="font-montserrat text-lg font-extrabold text-[#e50914] tracking-tight leading-none">
              MindFlix AI
            </span>
            <span className="font-inter text-[10px] text-[#4cd6ff] tracking-widest uppercase">
              5-Step Mood Matcher
            </span>
          </div>
        </div>

        {/* Step indicator badge */}
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-montserrat font-bold text-white/80">
          <span className="text-[#ffb4aa]">{currentStep}</span>
          <span className="text-white/40">/</span>
          <span>{totalSteps}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-xl px-5 pt-20 pb-28 flex flex-col gap-5 flex-grow relative z-10">
        {/* Progress Header */}
        <section className="flex flex-col gap-2 pt-1">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#7701d0]/30 border border-[#7701d0]/50 font-inter text-[10px] font-bold text-[#4cd6ff] uppercase tracking-wider">
                {currentQ.category}
              </span>
            </div>
            <span className="font-inter text-xs text-[#ffb4aa] font-bold">
              Step {currentStep} of {totalSteps} ({progressPercent}%)
            </span>
          </div>

          <div className="h-2 w-full bg-[#2a2a2a] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#e50914] via-[#7701d0] to-[#4cd6ff] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </section>

        {/* Visual Atmospheric Image Banner */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] rounded-2xl overflow-hidden glass-card border border-white/10 group shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
          <img
            src={currentQ.bgImage}
            alt={currentQ.category}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <span className="material-symbols-outlined text-[#e50914] text-xs">auto_awesome</span>
            <span className="font-inter text-[11px] text-white/90 font-medium">
              Psychological Realm #{currentStep}
            </span>
          </div>
        </div>

        {/* Question Prompt - Placed JUST BEFORE the Answers */}
        <section className="flex flex-col gap-2 p-4 rounded-2xl bg-[#1a191b] border border-white/10 shadow-md">
          <div className="flex items-center gap-2 text-xs font-montserrat font-bold text-[#4cd6ff] uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">help_outline</span>
            <span>Question {currentStep}</span>
          </div>
          <h1 className="font-montserrat text-lg sm:text-xl font-extrabold text-white leading-snug">
            {renderHighlightedText(currentQ.questionText, currentQ.questionHighlight)}
          </h1>
          <p className="font-inter text-xs text-[#e9bcb6]/75 leading-relaxed">
            {currentQ.subtitle}
          </p>
        </section>

        {/* 4 Psychological Choice Options / Answers */}
        <section className="flex flex-col gap-3">
          <label className="font-inter text-xs font-semibold text-[#e9bcb6]/80 uppercase tracking-wider">
            Choose your answer below:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionForCurrentQ?.id === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-2xl flex items-start gap-3 text-left transition-all group active:scale-[0.98] ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#1f192b] to-[#2d1216] border-2 border-[#e50914] shadow-lg shadow-[#e50914]/20'
                      : 'glass-card hover:bg-white/5 border border-white/10'
                  }`}
                >
                  <div className={`text-3xl p-2 rounded-xl bg-white/5 border border-white/10 transition-transform ${isSelected ? 'scale-110 bg-[#e50914]/20 border-[#e50914]/40' : 'group-hover:scale-105'}`}>
                    {opt.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className={`font-montserrat font-bold text-sm ${isSelected ? 'text-[#ffb4aa]' : 'text-white'}`}>
                        {opt.title}
                      </h4>
                      {isSelected && (
                        <span className="material-symbols-outlined text-xs text-[#e50914]">
                          check_circle
                        </span>
                      )}
                    </div>
                    <p className={`font-inter text-xs line-clamp-2 ${isSelected ? 'text-white/90' : 'text-[#e9bcb6]/60'}`}>
                      {opt.subtitle}
                    </p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-[#4cd6ff]">
                      #{opt.trait}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Mood Intensity Slider (Shown on step 5) */}
        {currentStep === totalSteps && (
          <section className="flex flex-col gap-3 p-4 rounded-2xl bg-gradient-to-br from-[#1c1b1b] to-[#121212] border border-[#e50914]/30 shadow-xl animate-fade-in mt-1">
            <div className="flex justify-between items-center">
              <label className="font-inter text-xs font-bold text-[#ffb4aa] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#e50914]">tune</span>
                <span>Final Mood Intensity Dial</span>
              </label>
              <span className="font-montserrat text-sm font-extrabold text-[#4cd6ff] px-2 py-0.5 rounded-full bg-[#4cd6ff]/10 border border-[#4cd6ff]/20">
                {intensity}%
              </span>
            </div>

            <input
              type="range"
              min="10"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-[#2a2a2a] rounded-full appearance-none cursor-pointer accent-[#e50914]"
            />

            <div className="flex justify-between font-inter text-[10px] text-[#e9bcb6]/50 uppercase tracking-widest">
              <span>Mild Vibe</span>
              <span>Deep Resonance</span>
              <span>Peak Intensity</span>
            </div>
          </section>
        )}
      </main>

      {/* Fixed Footer Actions */}
      <footer className="fixed bottom-0 w-full max-w-xl mx-auto inset-x-0 bg-[#0e0e0e]/95 backdrop-blur-3xl border-t border-white/10 h-20 flex items-center justify-between px-6 z-50">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 text-[#e9bcb6]/70 hover:text-white transition-colors active:scale-95 font-inter text-xs font-semibold tracking-wider uppercase"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
          <span>{currentStep === 1 ? 'Cancel' : 'Back'}</span>
        </button>

        <button
          onClick={handleNext}
          className="pulse-gradient px-7 sm:px-9 py-3 rounded-full flex items-center gap-2 active:scale-95 transition-transform shadow-[0_0_25px_rgba(229,9,20,0.35)] hover:brightness-110"
        >
          <span className="font-montserrat font-extrabold text-xs sm:text-sm text-white tracking-wider">
            {currentStep === totalSteps ? 'ANALYZE MY MOOD' : 'NEXT QUESTION'}
          </span>
          <span className="material-symbols-outlined text-white text-lg">
            {currentStep === totalSteps ? 'psychology' : 'arrow_forward'}
          </span>
        </button>
      </footer>
    </div>
  );
};

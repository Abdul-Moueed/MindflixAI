import React, { useState } from 'react';

interface PromptAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPrompt: (promptText: string) => void;
}

export const PromptAiModal: React.FC<PromptAiModalProps> = ({
  isOpen,
  onClose,
  onSubmitPrompt
}) => {
  const [prompt, setPrompt] = useState('');

  if (!isOpen) return null;

  const handleQuickPrompt = (p: string) => {
    setPrompt(p);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmitPrompt(prompt);
    onClose();
  };

  const samplePrompts = [
    "A cyberpunk thriller with deep philosophical AI themes",
    "A cozy atmospheric rainy night indie film",
    "Mind-bending cosmic sci-fi with beautiful visuals",
    "Bittersweet nostalgia and coming-of-age story"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7701d0] to-[#007d9a] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">auto_awesome</span>
          </div>
          <div>
            <h3 className="font-montserrat text-xl font-bold text-white">Prompt MindFlix AI</h3>
            <p className="font-inter text-xs text-[#e9bcb6]/70">Describe your exact desired vibe or storyline</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. 'I want an uplifting sci-fi adventure with breathtaking space scenery and an intense synth soundtrack...'"
            rows={4}
            className="w-full p-4 rounded-2xl bg-[#0f0f0f] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#4cd6ff] transition-colors resize-none text-sm"
          />

          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#e9bcb6]/60 uppercase tracking-wider block">
              Quick Mood Prompts:
            </span>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((sp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickPrompt(sp)}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 transition-all text-left"
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-sm font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!prompt.trim()}
              className="flex-1 py-3 rounded-full pulse-gradient text-white font-montserrat font-bold text-sm disabled:opacity-50 active:scale-95 transition-all shadow-lg shadow-[#7701d0]/30 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">psychology</span>
              Curate Films
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

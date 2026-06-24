/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlusCircle, Play } from "lucide-react";
import { AppAssets } from "../assets/assetHelper";

interface HomeProps {
  onCreateQuiz: () => void;
  onTakeQuiz: () => void;
  hasQuizzes: boolean;
}

export default function Home({ onCreateQuiz, onTakeQuiz, hasQuizzes }: HomeProps) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="relative pt-10 pb-16 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl w-full flex flex-col items-center gap-6">
          
          {/* Slogan pill matching setup prompt styles */}
          <div className="inline-flex items-center gap-2 bg-surface-container-high border border-outline-variant/20 px-4 py-2 rounded-full shadow-sm mb-2 select-none scale-105 transition-transform hover:scale-110">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-sans text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Trending Now</span>
          </div>

          {/* Heavy Typography Title */}
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-tight max-w-2xl">
            How well do your besties <br className="hidden sm:block" />
            <span className="text-primary relative inline-block mx-1">
              really 
              <svg className="absolute -bottom-2.5 left-0 w-full text-secondary" preserveAspectRatio="none" viewBox="0 0 100 10" style={{ height: '8px' }}>
                <path d="M0 5 Q 50 10 100 0" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </span> 
            know you?
          </h1>

          {/* Friendly description copy */}
          <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-lg leading-relaxed font-normal">
            Create a personalized quiz, share it with your squad, and find out who truly deserves the BFF title.
          </p>

          {/* Responsive main actions */}
          <div className="w-full max-w-sm flex flex-col sm:flex-row gap-4 mt-4">
            <button 
              onClick={onCreateQuiz}
              className="w-full h-14 rounded-2xl bg-linear-to-r from-primary to-primary-container text-on-primary font-headline text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-2xl hover:brightness-110 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              Create Your Quiz
            </button>

            {hasQuizzes && (
              <button 
                onClick={onTakeQuiz}
                className="w-full h-14 rounded-2xl bg-surface border-2 border-primary text-primary hover:bg-primary/5 font-headline text-sm font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                Take a Quiz
              </button>
            )}
          </div>

          {/* Social Proof matching image assets */}
          <div className="flex items-center justify-center mt-6 gap-3.5">
            <div className="flex -space-x-3.5">
              {AppAssets.socialProofs.map((src, i) => (
                <img 
                  key={i} 
                  className="w-10 h-10 rounded-full border-2 border-surface object-cover shadow-sm select-none" 
                  src={src} 
                  alt="Social bestie proof avatar"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-on-surface-variant font-sans">
              Join <b className="text-primary">2M+</b> besties testing their friendship
            </span>
          </div>
        </div>
      </section>

      {/* Flat-lay image break banner */}
      <section className="w-full">
        <div className="w-full h-60 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl shadow-primary-fixed-dim/20 transition-all hover:scale-[1.01] duration-500">
          <img 
            className="w-full h-full object-cover" 
            src={AppAssets.images.flatLayPhones} 
            alt="A circle of phones playing BF4E social quiz"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Bento Grid "How It Works" Section with pristine geometry */}
      <section className="px-6 py-12 bg-surface-container-low rounded-3xl relative z-10 space-y-8">
        <div className="text-center max-w-md mx-auto">
          <h2 className="font-headline text-3xl font-extrabold text-on-surface mb-2">How it works</h2>
          <p className="text-sm text-on-surface-variant">Three simple steps to instant friendship validation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento step 1 */}
          <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-28 h-28 bg-primary-container opacity-10 rounded-bl-full transition-transform group-hover:scale-110" />
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline text-lg font-bold mb-4">
              1
            </div>
            <h3 className="font-headline text-lg font-bold text-on-surface mb-1">Make your quiz</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Answer & customize up to 15 questions about yourself. Honest answers only!
            </p>
          </div>

          {/* Bento step 2 */}
          <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-28 h-28 bg-secondary-container opacity-15 rounded-bl-full transition-transform group-hover:scale-110" />
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-on-secondary font-headline text-lg font-bold mb-4">
              2
            </div>
            <h3 className="font-headline text-lg font-bold text-on-surface mb-1">Share the link</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Drop your custom generated link into the group chat, your Discord, or your story.
            </p>
          </div>

          {/* Bento step 3 */}
          <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-28 h-28 bg-tertiary-container opacity-15 rounded-bl-full transition-transform group-hover:scale-110" />
            <div className="w-12 h-12 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary font-headline text-lg font-bold mb-4">
              3
            </div>
            <h3 className="font-headline text-lg font-bold text-on-surface mb-1">Check rankings</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Check the live bestie leaderboard. Celebrate the real ones and jokingly roast the others!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
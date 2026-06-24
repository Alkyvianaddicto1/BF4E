/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Heart } from "lucide-react";
import type { Quiz } from "../types";

interface TakeQuizProps {
  quiz: Quiz;
  playerNickname: string;
  setPlayerNickname: (val: string) => void;
  playerAnswers: number[];
  onSelectPlayerAnswer: (optionIdx: number) => void;
  activeQuestionIndex: number;
  onBackToHome: () => void;
  onStartAnswering: () => void;
  page: "take_setup" | "take_questions";
}

export default function TakeQuiz({
  quiz,
  playerNickname,
  setPlayerNickname,
  playerAnswers,
  onSelectPlayerAnswer,
  activeQuestionIndex,
  onBackToHome,
  onStartAnswering,
  page
}: TakeQuizProps) {

  const activeQuestion = quiz.questions[activeQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto py-4">
      
      {/* 1. NICKNAME INPUT SETUP PANEL */}
      {page === "take_setup" && (
        <div className="max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-4 select-none">
            <h1 className="font-headline text-2xl font-extrabold text-primary">Take Bestie Test</h1>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest bg-surface-container-high px-3 py-1 rounded-full">
              Interactive
            </span>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-xl border border-surface-variant/40 text-center space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-secondary to-secondary-container" />
            
            <div className="w-16 h-16 bg-secondary-container/20 text-secondary rounded-2xl flex items-center justify-center mx-auto transform -rotate-3 mb-2">
              <Heart className="w-8 h-8 fill-current animate-pulse" />
            </div>

            <h2 className="font-headline text-xl font-bold text-on-surface">
              {quiz.creatorName} wants to judge you!
            </h2>
            <p className="text-xs text-on-surface-variant max-w-70 mx-auto leading-relaxed">
              Before answering the questions, enter your own name to see where you end up on the bestie leaderboard.
            </p>

            <div className="pt-4 text-left">
              <input 
                type="text" 
                value={playerNickname}
                onChange={(e) => setPlayerNickname(e.target.value)}
                placeholder="Your Name / Nickname"
                maxLength={24}
                className="w-full bg-surface-container h-14 px-4 rounded-xl border border-outline-variant text-on-surface text-base font-semibold placeholder:text-outline focus:outline-none focus:border-2 focus:border-primary focus:bg-surface-container-lowest transition-all"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onBackToHome}
              className="w-1/3 h-14 rounded-2xl bg-surface border-2 border-outline hover:bg-surface-container text-on-surface-variant font-headline text-sm font-bold uppercase transition-all active:scale-95 cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={onStartAnswering}
              className="w-2/3 h-14 rounded-2xl bg-linear-to-r from-secondary to-secondary-container text-on-secondary font-headline text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start Quiz</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. PLAY QUESTIONS LIST & SELECTIONS */}
      {page === "take_questions" && activeQuestion && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="font-headline text-2xl font-extrabold text-secondary">Analyzing... 🤔</h1>
                <p className="text-xs text-on-surface-variant">Answering as: <b className="text-on-surface">{playerNickname}</b></p>
              </div>
              <span className="text-xs font-bold text-on-surface-variant bg-surface-container-high px-4 py-1.5 rounded-full shadow-sm">
                Q {activeQuestionIndex + 1} of {quiz.questions.length}
              </span>
            </div>

            {/* Stepper dynamic bar */}
            <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-secondary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((activeQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Active Question options grid */}
          <div className="w-full bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-2xl border border-surface-container relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-secondary to-secondary-container" />

            <div className="flex items-center gap-2.5 mb-6">
              <div className="bg-secondary-fixed text-on-secondary-fixed-variant font-headline text-xs font-bold px-3 py-1 rounded-full">
                Q{activeQuestionIndex + 1}
              </div>
              <span className="text-xs text-outline tracking-wider uppercase font-semibold">
                {activeQuestion.tag}
              </span>
            </div>

            <h2 className="font-headline text-2xl font-extrabold text-on-surface mb-8">
              {activeQuestion.text}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeQuestion.options.map((option, oIdx) => {
                const wasAunswered = playerAnswers[activeQuestionIndex] === oIdx;

                return (
                  <button
                    key={oIdx}
                    onClick={() => onSelectPlayerAnswer(oIdx)}
                    className={`text-left rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 border-2 active:scale-[0.98] cursor-pointer ${
                      wasAunswered
                        ? "bg-secondary text-on-secondary border-secondary shadow-lg -translate-y-0.5" 
                        : "bg-surface border-surface-container hover:border-secondary/45 text-on-surface"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-headline font-bold shrink-0 transition-all ${
                      wasAunswered 
                        ? "bg-white text-secondary" 
                        : "bg-surface-container-high text-secondary"
                    }`}>
                      {String.fromCharCode(65 + oIdx)}
                    </div>
                    <span className="text-sm font-semibold">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
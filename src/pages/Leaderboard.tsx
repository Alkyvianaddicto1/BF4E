/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Trophy, HelpCircle, Sparkles, Play, Copy, PlusCircle } from "lucide-react";
import type { Quiz } from "../types";
import { AppAssets } from "../assets/assetHelper";

interface LeaderboardProps {
  quizzes: Quiz[];
  selectedQuizId: string;
  onSelectQuizId: (id: string) => void;
  onInitiateTakeQuiz: (id: string) => void;
  onCopyLink: (id: string) => void;
  onInitiateCreate: () => void;
}

export default function Leaderboard({
  quizzes,
  selectedQuizId,
  onSelectQuizId,
  onInitiateTakeQuiz,
  onCopyLink,
  onInitiateCreate
}: LeaderboardProps) {

  const activeQuizObj = quizzes.find(q => q.id === selectedQuizId) || quizzes[0];

  if (!activeQuizObj) {
    return (
      <div className="text-center py-16 bg-surface-container-low rounded-3xl p-12 max-w-lg mx-auto border border-dashed border-outline-variant">
        <Trophy className="w-12 h-12 mx-auto text-outline animate-bounce mb-3" />
        <h3 className="text-lg font-bold">No quizzes available</h3>
        <p className="text-xs text-on-surface-variant mb-4">You have to create a quiz first before viewing responder scores!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-2 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Dynamic select options */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-container-high pb-4">
        <div>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface flex items-center gap-2">
            <Trophy className="w-8 h-8 text-secondary" />
            <span>Squad Leaderboard</span>
          </h1>
          <p className="text-xs text-on-surface-variant">The absolute truth of "{activeQuizObj.title}" has been revealed.</p>
        </div>

        {quizzes.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto py-2 px-1 scrollbar-none shrink-0">
            <span className="text-xs font-bold text-on-surface-variant shrink-0">Select Quiz:</span>
            {quizzes.map((q) => (
              <button
                key={q.id}
                onClick={() => onSelectQuizId(q.id)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all shrink-0 active:scale-95 cursor-pointer ${
                  q.id === selectedQuizId 
                    ? "bg-primary text-on-primary border-primary shadow-sm" 
                    : "bg-surface text-on-surface border-surface-container shadow-sm hover:border-primary/50"
                }`}
              >
                {q.creatorName}'s Quiz
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Podium + Rest of list */}
        <div className="lg:col-span-8 space-y-4">
          
          {activeQuizObj.responses.length === 0 ? (
            <div className="bg-surface-container-low rounded-3xl p-12 text-center border-2 border-dashed border-outline-variant text-on-surface space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-surface-variant rounded-full flex items-center justify-center mx-auto text-outline animate-pulse">
                <Trophy className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold">No responses yet!</h3>
              <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
                Take this quiz yourself to get scored, or copy and share the link with besties!
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => onInitiateTakeQuiz(activeQuizObj.id)}
                  className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary text-xs font-bold flex items-center justify-center gap-1.5 hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Take Quiz</span>
                </button>
                <button 
                  onClick={() => onCopyLink(activeQuizObj.id)}
                  className="px-5 py-2.5 rounded-xl bg-surface border border-primary text-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-all hover:bg-primary/5 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Podium View Grid */}
              <div className="flex justify-center items-end gap-3 sm:gap-6 w-full h-80 pt-16 select-none max-w-lg mx-auto border-b border-surface-container-high pb-4">
                
                {/* 2nd Place (Left) */}
                <div className="flex flex-col items-center flex-1 h-[78%]">
                  <div className="relative w-16 h-16 rounded-full border-4 border-surface-container-high mb-2 shadow-md">
                    <img 
                      className="w-full h-full object-cover rounded-full" 
                      src={activeQuizObj.responses[1]?.avatarUrl || AppAssets.avatars.sarah} 
                      alt="2nd place avatar"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-secondary text-on-secondary font-headline text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-surface shadow-sm">2</div>
                  </div>
                  
                  <div className="text-xs font-bold text-on-surface truncate max-w-20">
                    {activeQuizObj.responses[1]?.responderName || "Waiting..."}
                  </div>
                  <div className="text-[10px] text-primary font-bold">
                    {activeQuizObj.responses[1] ? `${activeQuizObj.responses[1].score} pts` : "---"}
                  </div>
                  
                  <div className="w-full bg-surface-container-high rounded-t-2xl mt-2 grow flex flex-col items-center justify-end pb-3 border-t border-primary/20 bg-linear-to-b from-primary/5 to-transparent shadow-sm">
                    <Sparkles className="w-5 h-5 text-secondary opacity-35" />
                  </div>
                </div>

                {/* 1st Place (Center Crown) */}
                <div className="flex flex-col items-center flex-1 h-full z-10 -mx-1.5 font-headline">
                  <div className="relative w-24 h-24 rounded-full border-4 border-primary shadow-xl mb-2 hover:scale-105 transition-transform duration-300">
                    <img 
                      className="w-full h-full object-cover rounded-full animate-pulse" 
                      src={activeQuizObj.responses[0]?.avatarUrl || AppAssets.avatars.alex} 
                      alt="1st place avatar"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl animate-bounce">👑</div>
                    <div className="absolute -bottom-2.5 -right-2 bg-primary text-on-primary font-headline text-sm font-extrabold w-8 h-8 flex items-center justify-center rounded-full border-2 border-surface shadow-md">1</div>
                  </div>

                  <div className="text-sm font-extrabold text-on-surface truncate max-w-25">
                    {activeQuizObj.responses[0]?.responderName || "Waiting..."}
                  </div>
                  <div className="text-xs font-extrabold text-primary">
                    {activeQuizObj.responses[0] ? `${activeQuizObj.responses[0].score} pts` : "---"}
                  </div>

                  <div className="w-full bg-primary-container rounded-t-2xl mt-2 grow flex flex-col items-center justify-start pt-4 shadow-lg shadow-primary/10 select-none">
                    <Sparkles className="w-6 h-6 text-on-primary-container animate-pulse opacity-60" />
                  </div>
                </div>

                {/* 3rd Place (Right) */}
                <div className="flex flex-col items-center flex-1 h-[68%]">
                  <div className="relative w-16 h-16 rounded-full border-4 border-surface-container-high mb-2 shadow-md">
                    <img 
                      className="w-full h-full object-cover rounded-full" 
                      src={activeQuizObj.responses[2]?.avatarUrl || AppAssets.avatars.chloe} 
                      alt="3rd place avatar"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-tertiary text-on-tertiary font-headline text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-surface shadow-sm">3</div>
                  </div>

                  <div className="text-xs font-bold text-on-surface truncate max-w-20">
                    {activeQuizObj.responses[2]?.responderName || "Waiting..."}
                  </div>
                  <div className="text-[10px] text-primary font-bold">
                    {activeQuizObj.responses[2] ? `${activeQuizObj.responses[2].score} pts` : "---"}
                  </div>

                  <div className="w-full bg-surface-container rounded-t-2xl mt-2 grow flex flex-col items-center justify-end pb-2 border-t border-primary/20 bg-linear-to-b from-primary/5 to-transparent shadow-sm">
                    <Sparkles className="w-4 h-4 text-tertiary opacity-35" />
                  </div>
                </div>
              </div>

              {/* The Rest of squad list */}
              {activeQuizObj.responses.length > 3 && (
                <div className="max-w-xl mx-auto bg-surface-container-lowest rounded-3xl shadow-xl overflow-hidden border border-outline-variant/10">
                  <div className="px-5 py-4 border-b border-surface-container-high flex justify-between items-center bg-surface-bright select-none">
                    <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">The Rest of the Squad</span>
                    <span className="text-[10px] text-outline font-semibold">Leaderboards sorted by score</span>
                  </div>

                  <ul className="divide-y divide-surface-container-high">
                    {activeQuizObj.responses.slice(3).map((item, index) => {
                      const globalRank = index + 4;
                      return (
                        <li 
                          key={item.id}
                          className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <span className="font-headline text-lg font-bold text-outline-variant w-6 text-center select-none">
                              {globalRank}
                            </span>
                            <img 
                              className="w-12 h-12 rounded-full object-cover shadow-sm bg-surface-container shrink-0" 
                              src={item.avatarUrl || AppAssets.avatars.jordan} 
                              alt="responder list pic"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <h4 className="text-sm font-bold text-on-surface leading-snug">{item.responderName}</h4>
                              <p className="text-[10px] text-on-surface-variant font-medium">{item.relationshipTitle}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-primary bg-primary-fixed shrink-0 px-3 py-1.5 rounded-full select-none">
                              {item.score} pts
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Add dynamic retry/make another actions */}
              <div className="text-center pt-4">
                <button 
                  onClick={onInitiateCreate}
                  className="inline-flex h-14 rounded-full bg-linear-to-r from-primary to-primary-container text-on-primary font-headline text-sm font-bold items-center justify-center gap-2 px-8 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Make Another Quiz</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Right column: Tiers Info Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-headline font-extrabold text-on-surface text-sm flex items-center gap-1">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span>How we score?</span>
            </h3>
            
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Calculations are weighted out of <b>1000 base points</b> depending on how many questions you match correctly.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 bg-amber-50/5 border border-amber-500/20 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-500 block">Soulmate Level 🔮</span>
                  <span className="text-[10px] text-on-surface-variant">Perfect or near-perfect score</span>
                </div>
                <span className="font-bold text-amber-500">900+</span>
              </div>

              <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-primary block">Bestie Material 🧸</span>
                  <span className="text-[10px] text-on-surface-variant">Great general knowledge</span>
                </div>
                <span className="font-bold text-primary">600+</span>
              </div>

              <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-on-surface block">Just a friend ☕</span>
                  <span className="text-[10px] text-on-surface-variant">Standard acquaintances</span>
                </div>
                <span className="font-bold text-on-surface">400+</span>
              </div>

              <div className="p-3 bg-red-50/5 border border-red-500/20 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-red-500 block">Needs Study! 📚</span>
                  <span className="text-[10px] text-on-surface-variant">Ouch! Total stranger status</span>
                </div>
                <span className="font-bold text-red-500">{"<"}400</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
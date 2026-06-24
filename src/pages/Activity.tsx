/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { MouseEvent } from "react";
import { Calendar, Trash2, Copy, Sparkles, MessageSquare } from "lucide-react";
import type { Quiz } from "../types";

interface ActivityProps {
  quizzes: Quiz[];
  onDeleteQuiz: (id: string, e: MouseEvent) => void;
  onCopyLink: (id: string) => void;
  onViewLeaderboard: (id: string) => void;
}

export default function Activity({
  quizzes,
  onDeleteQuiz,
  onCopyLink,
  onViewLeaderboard
}: ActivityProps) {
  return (
    <div className="max-w-4xl mx-auto py-2 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page header */}
      <div className="border-b border-surface-container-high pb-4 select-none">
        <h1 className="font-headline text-3xl font-extrabold text-on-surface flex items-center gap-2">
          <MessageSquare className="w-8 h-8 text-primary" />
          <span>My Living Quizzes</span>
        </h1>
        <p className="text-xs text-on-surface-variant">Manage and audit your active BFF questionnaires.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Active Quizzes Grid/List */}
        <div className="lg:col-span-8 space-y-4">
          {quizzes.length === 0 ? (
            <div className="text-center py-16 bg-surface-container-low rounded-3xl p-12 border border-dashed border-outline-variant">
              <div className="w-14 h-14 bg-surface-container rounded-full flex items-center justify-center mx-auto text-outline animate-bounce mb-3">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-on-surface">No quizzes found</h3>
              <p className="text-xs text-on-surface-variant max-w-xs mx-auto">Create a custom quiz under the '+' tab to activate live dashboards.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {quizzes.map((q) => {
                const totalAnswers = q.responses.length;
                const formattedDate = q.createdAt 
                  ? new Date(q.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                  : "Recently";

                return (
                  <div 
                    key={q.id}
                    onClick={() => onViewLeaderboard(q.id)}
                    className="group bg-surface-container-lowest border border-outline-variant/10 hover:border-primary/45 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 cursor-pointer"
                  >
                    
                    <div className="space-y-2 max-w-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 font-headline font-bold rounded-full uppercase tracking-wider">
                          Creator: {q.creatorName}
                        </span>
                        <span className="text-[10px] text-outline flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formattedDate}
                        </span>
                      </div>

                      <h3 className="font-headline text-lg font-extrabold text-on-surface transition-colors group-hover:text-primary">
                        {q.title}
                      </h3>

                      <div className="flex items-center gap-4 text-xs font-semibold text-on-surface-variant">
                        <span>❓ {q.questions.length} Questions</span>
                        <span>💬 {totalAnswers} Matches Submitted</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto self-end sm:self-center shrink-0">
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCopyLink(q.id);
                        }}
                        className="grow sm:grow-0 h-11 bg-surface-container border border-outline-variant/40 hover:bg-primary-container/20 text-on-surface-variant hover:text-primary rounded-xl px-4 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Copy direct share link"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Share</span>
                      </button>

                      <button
                        onClick={(e) => onDeleteQuiz(q.id, e)}
                        className="w-11 h-11 bg-surface-container hover:bg-secondary/15 border border-outline-variant/40 text-outline hover:text-secondary rounded-xl transition-all flex items-center justify-center cursor-pointer"
                        title="Delete quiz permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Dynamic summary information */}
        <div className="lg:col-span-4">
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary shrink-0 animate-pulse" />
              <h3 className="font-headline font-extrabold text-on-surface text-sm">Active Monitoring</h3>
            </div>
            
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Whenever a bestie takes your quiz using their browser, local synchronization caches live results locally to populate rankings instantly.
            </p>
            
            <p className="text-xs text-outline leading-relaxed">
              Deleting a quiz will erase its associated score board logs and submissions list permanently. Proceed with absolute certainty.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
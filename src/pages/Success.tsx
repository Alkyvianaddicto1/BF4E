/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, Copy, Share2, Users, Zap } from "lucide-react";
import type { Quiz } from "../types";
import { AppAssets } from "../assets/assetHelper";

interface SuccessProps {
  quiz: Quiz;
  copiedId: boolean;
  onCopyLink: () => void;
  onSimulateAnswer: () => void;
  onTriggerNotification: (msg: string) => void;
}

export default function Success({
  quiz,
  copiedId,
  onCopyLink,
  onSimulateAnswer,
  onTriggerNotification
}: SuccessProps) {
  return (
    <div className="max-w-4xl mx-auto py-4 flex flex-col md:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Left Column: Social link containers */}
      <div className="w-full md:w-7/12 flex flex-col gap-6">
        
        <div className="glass-card rounded-3xl p-6 md:p-8 shadow-xl border-t-[6px] border-primary relative overflow-hidden flex flex-col items-center text-center">
          
          <div className="w-20 h-20 rounded-full bg-tertiary-fixed flex items-center justify-center mb-4 shadow-md z-10 animate-bounce">
            <Check className="w-10 h-10 text-tertiary font-bold" />
          </div>

          <h1 className="font-headline text-4xl font-extrabold text-gradient mb-2 z-10">Success!</h1>
          <p className="text-sm text-on-surface-variant mb-6 z-10 max-w-md">
            Your quiz <b className="text-on-surface">"{quiz.title}"</b> is live. Send it to your squad and let the chaos begin.
          </p>

          {/* Copy section */}
          <div className="w-full bg-surface-container rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-outline-variant/30 hover:border-primary/50 transition-colors z-10">
            <div className="flex items-center gap-2 overflow-hidden w-full text-left">
              <Zap className="w-5 h-5 text-primary shrink-0" />
              <span className="text-xs font-bold text-on-surface truncate">
                {window.location.origin}/?quizId={quiz.id}
              </span>
            </div>

            <button 
              onClick={onCopyLink}
              className="bg-linear-to-r from-primary to-primary-container text-on-primary font-headline text-xs font-bold px-5 py-3.5 rounded-xl hover:shadow-lg active:scale-95 transition-all w-full sm:w-auto flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              {copiedId ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Shares Grid */}
        <div className="grid grid-cols-3 gap-4">
          <button 
            onClick={() => onTriggerNotification("Opening WhatsApp chat with link... 💭")}
            className="bg-[#25D366]/10 border-2 border-[#25D366]/20 hover:border-[#25D366] rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 transition-all shadow-sm active:scale-95 hover:shadow-md h-28 cursor-pointer"
          >
            <span className="p-2 rounded-full bg-[#25D366] text-white">
              <Share2 className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-[#1a9a49]">WhatsApp</span>
          </button>

          <button 
            onClick={() => onTriggerNotification("Opening Instagram story shares... 📸")}
            className="bg-[#E1306C]/10 border-2 border-[#E1306C]/20 hover:border-[#E1306C] rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 transition-all shadow-sm active:scale-95 hover:shadow-md h-28 cursor-pointer"
          >
            <span className="p-2 rounded-full bg-linear-to-tr from-[#FFDC80] via-[#F56040] to-[#E1306C] text-white">
              <Share2 className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-[#b52656]">Instagram</span>
          </button>

          <button 
            onClick={() => onTriggerNotification("Sharing to Snapchat stories... 👻")}
            className="bg-[#FFFC00]/10 border-2 border-[#FFFC00]/30 hover:border-[#FFFC00] rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 transition-all shadow-sm active:scale-95 hover:shadow-md h-28 cursor-pointer"
          >
            <span className="p-2 rounded-full bg-[#FFFC00] text-black">
              <Share2 className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-[#b0ae00]">Snapchat</span>
          </button>
        </div>
      </div>

      {/* Right Column: Live responder feed */}
      <div className="w-full md:w-5/12">
        <div className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant/20 shadow-sm h-full flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-3 select-none">
            <h2 className="font-headline text-lg font-bold text-on-surface">Who's answered?</h2>
            <div className="bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full font-headline text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span>Live Feed</span>
            </div>
          </div>

          <div className="grow flex flex-col gap-3 justify-center">
            {quiz.responses.length === 0 ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-surface-variant rounded-full flex items-center justify-center mx-auto shadow-inner text-outline animate-bounce">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-on-surface">Waiting for responses...</h3>
                <p className="text-xs text-on-surface-variant max-w-50 mx-auto leading-relaxed">
                  Share your link above inside the squad group-chats to start getting roasted.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {quiz.responses.map((resp) => (
                  <div 
                    key={resp.id}
                    className="bg-surface-container-lowest p-3.5 rounded-2xl shadow-sm border border-outline-variant/10 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        className="w-10 h-10 rounded-full object-cover shadow-sm bg-surface-container" 
                        src={resp.avatarUrl || AppAssets.avatars.sam} 
                        alt="responder profile pic"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xs font-bold text-on-surface">{resp.responderName}</div>
                        <div className="text-[10px] text-primary font-semibold">{resp.relationshipTitle}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end shrink-0">
                      <span className="text-xs font-bold text-secondary">{resp.score} pts</span>
                      <span className="text-[9px] text-on-surface-variant">just now</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Simulated trigger to show live interaction */}
            <div className="pt-2">
              <button 
                onClick={onSimulateAnswer}
                className="w-full py-2.5 rounded-xl bg-secondary/10 hover:bg-secondary/15 text-secondary text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Zap className="w-4 h-4 animate-pulse" />
                <span>Simulate Bestie Answer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

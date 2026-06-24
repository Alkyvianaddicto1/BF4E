/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bell, User as UserIcon, Zap } from "lucide-react";

interface HeaderProps {
  onGoHome: () => void;
  onSimulateAnswer?: () => void;
  showSimulate: boolean;
  showNotificationList: boolean;
  onToggleNotifications: () => void;
  recentResponderName?: string;
  recentScore?: number;
  recentQuizTitle?: string;
  onProfileClick?: ()=> void;
}

export default function Header({
  onGoHome,
  onSimulateAnswer,
  showSimulate,
  showNotificationList,
  onToggleNotifications,
  recentResponderName,
  recentScore,
  recentQuizTitle,
  onProfileClick
}: HeaderProps) {
  const handleProfileClick = () => {
    if (window.innerWidth >= 768) {
      onProfileClick?.();
    }
  }
  return (
    <header className="bg-surface/85 backdrop-blur-xl sticky top-0 z-40 border-b border-surface-container-high shadow-sm">
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-16">
        <div 
          onClick={onGoHome}
          className="font-headline text-2xl font-extrabold tracking-tighter text-primary flex items-center gap-1.5 cursor-pointer hover:opacity-85 active:scale-95 transition-all select-none"
        >
          BF4E
          <span className="w-1.5 h-1.5 bg-secondary-container rounded-full mt-1.5 animate-pulse"></span>
        </div>

        <div className="flex items-center gap-2">
          {/* Live simulation indicator button */}
          {showSimulate && onSimulateAnswer && (
            <button 
              onClick={onSimulateAnswer}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 hover:bg-secondary/15 text-secondary rounded-full text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 animate-bounce" />
              Simulate Bestie Answer
            </button>
          )}

          {/* Notification alert */}
          <div className="relative">
            <button 
              onClick={onToggleNotifications}
              className={`p-2 rounded-full transition-colors active:scale-95 hover:bg-primary-container/10 cursor-pointer ${showNotificationList ? "bg-primary-container/15 text-primary" : "text-on-surface-variant"}`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-secondary-container rounded-full border border-surface"></span>
            </button>

            {showNotificationList && (
              <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-3 duration-200 text-left">
                <div className="flex justify-between items-center mb-2 border-b border-surface-container-high pb-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">Recent Alerts</h4>
                  <span className="text-[10px] bg-primary/10 text-primary py-0.5 px-1.5 rounded-full font-bold">Live Feed</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 hover:bg-surface-container rounded-lg transition-colors">
                    <p className="font-semibold text-on-surface">🚀 Welcome to BF4E!</p>
                    <p className="text-on-surface-variant text-[11px]">Ready to see which friends really study you?</p>
                  </div>
                  {recentResponderName && (
                    <div className="p-2 hover:bg-surface-container rounded-lg bg-primary/5 transition-colors">
                      <p className="font-semibold text-primary">💖 Raw scoring results available</p>
                      <p className="text-on-surface-variant text-[11px]">{recentResponderName} scored {recentScore} on "{recentQuizTitle}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Account Profile Mock */}
          <div className="flex items-center gap-1.5">
            <button 
              onClick={handleProfileClick}
              className="p-2 rounded-full text-on-surface-variant hover:bg-primary-container/10 active:scale-95 transition-colors cursor-pointer">
              <UserIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

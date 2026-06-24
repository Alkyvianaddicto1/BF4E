/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type{ ReactNode } from "react";

interface ScreenWrapperProps {
  children: ReactNode;
}

export default function ScreenWrapper({ children }: ScreenWrapperProps) {
  return (
    <div className="w-full relative min-h-screen flex flex-col justify-between">
      {/* Absolute floating blobs backdrops */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none z-0" />
      
      <main className="grow w-full relative z-10">
        <div className="w-full px-4 md:px-8 max-w-7xl mx-auto py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

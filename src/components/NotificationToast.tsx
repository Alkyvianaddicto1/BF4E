/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles } from "lucide-react";

interface NotificationToastProps {
  show: boolean;
  message: string;
}

export default function NotificationToast({ show, message }: NotificationToastProps) {
  if (!show) return null;

  return (
    <div className="fixed top-20 right-4 left-4 sm:left-auto sm:w-80 bg-inverse-surface text-inverse-on-surface py-3.5 px-4 rounded-xl shadow-2xl z-50 flex items-center gap-2.5 animate-in slide-in-from-right-10 duration-300">
      <Sparkles className="w-5 h-5 text-secondary-container shrink-0" />
      <span className="text-xs font-semibold">{message}</span>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const ROUTES = {
  HOME: "home",
  CREATE_SETUP: "create_setup",
  CREATE_QUESTIONS: "create_questions",
  SUCCESS: "success",
  TAKE_SETUP: "take_setup",
  TAKE_QUESTIONS: "take_questions",
  TAKE_COMPLETE: "take_complete",
  LEADERBOARD: "leaderboard",
  ACTIVITY: "activity",
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];

export interface NavigationEvent {
  path: RoutePath;
  quizId?: string;
  tab?: "home" | "create" | "activity" | "rankings";
}

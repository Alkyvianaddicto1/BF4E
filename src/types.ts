/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuizQuestion {
  id: string;
  text: string;
  tag: string; // e.g. "Vibes Check", "Survival Skills"
  options: string[];
  correctAnswerIndex: number;
}

export interface QuizResponse {
  id: string;
  responderName: string;
  avatarUrl?: string;
  answers: number[]; // indices of options chosen
  score: number; // e.g. calculated score
  relationshipTitle: string; // "Soulmate Level", "Just a friend", "Needs to study you"
  answeredAt: string; // ISO string
}

export interface Quiz {
  id: string;
  creatorName: string;
  title: string;
  questions: QuizQuestion[];
  responses: QuizResponse[];
  createdAt: string;
}

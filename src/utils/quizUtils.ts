/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { QuizQuestion, QuizResponse } from '../types';
import { AVATARS } from '../constants/seedData';

/**
 * Calculates a standard score out of 1000.
 */
export function calculateScore(answers: number[], questions: QuizQuestion[]): number {
  if (questions.length === 0) return 0;
  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (answers[idx] === q.correctAnswerIndex) {
      correctCount++;
    }
  });
  return Math.round((correctCount / questions.length) * 1000);
}

/**
 * Generates relationship tier descriptors based on score percentage.
 */
export function getRelationshipTitle(score: number): string {
  if (score >= 900) {
    return "Soulmate Level";
  } else if (score >= 600) {
    return "Bestie Material";
  } else if (score >= 400) {
    return "Just a friend";
  }
  return "Needs to study you";
}

/**
 * Simulates a response dynamically from a random bestie template.
 */
export function generateSimulatedResponse(questions: QuizQuestion[]): QuizResponse {
  const mockResponders = [
    { name: "Sassy Sam ✨", avatar: AVATARS.sam },
    { name: "DJ Casey 🎧", avatar: AVATARS.casey },
    { name: "Retro Taylor 👑", avatar: AVATARS.taylor },
    { name: "Chill Jordan 🏂", avatar: AVATARS.jordan },
    { name: "Wild Alex 🚀", avatar: AVATARS.alex },
    { name: "Cute Sarah 💖", avatar: AVATARS.sarah }
  ];

  const randomPerson = mockResponders[Math.floor(Math.random() * mockResponders.length)];
  
  // 70% chance to guess each correctly
  const answers = questions.map(q => {
    return Math.random() < 0.7 
      ? q.correctAnswerIndex 
      : Math.floor(Math.random() * q.options.length);
  });

  const score = calculateScore(answers, questions);
  const relationshipTitle = getRelationshipTitle(score);

  return {
    id: `resp-sim-${Date.now()}`,
    responderName: randomPerson.name,
    avatarUrl: randomPerson.avatar,
    answers,
    score,
    relationshipTitle,
    answeredAt: new Date().toISOString()
  };
}

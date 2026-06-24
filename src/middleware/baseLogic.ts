/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Quiz, QuizResponse } from '../types';

// ==========================================
// 1. ENCODERS (Generating the Links)
// ==========================================

/**
 * Minifies a Quiz object and encodes it into a shareable URL.
 */
export const generateQuizShareLink = (quiz: Quiz): string => {
  // Minify the payload to keep the URL short
  const payload = {
    id: quiz.id,
    c: quiz.creatorName,
    t: quiz.title,
    q: quiz.questions.map(q => ({
      text: q.text,
      tag: q.tag,
      options: q.options,
      ans: q.correctAnswerIndex
    }))
  };

  const encodedStr = btoa(encodeURIComponent(JSON.stringify(payload)));
  return `${window.location.origin}/?quiz=${encodedStr}`;
};

/**
 * Minifies a user's quiz result and encodes it into a "send back" URL.
 */
export const generateBoomerangLink = (quizId: string, result: QuizResponse): string => {
  const payload = {
    id: quizId,
    rId: result.id,
    n: result.responderName,
    s: result.score,
    rt: result.relationshipTitle,
    av: result.avatarUrl
  };

  const encodedStr = btoa(encodeURIComponent(JSON.stringify(payload)));
  return `${window.location.origin}${window.location.pathname}?result=${encodedStr}`;
};


// ==========================================
// 2. DECODERS (Parsing Data from URLs)
// ==========================================

/**
 * Safely reads a base64 string from the URL and reconstructs a Quiz object.
 * Returns null if the link is broken or tampered with.
 */
export const parseQuizFromUrl = (encodedStr: string): Quiz | null => {
  try {
    const decoded = JSON.parse(decodeURIComponent(atob(encodedStr)));
    
    return {
      id: decoded.id,
      creatorName: decoded.c,
      title: decoded.t || `${decoded.c}'s Bestie Test`,
      questions: decoded.q.map((q: { text: string; tag: string; options: string[]; ans: number }, i: number) => ({
        id: `q-${i}`,
        text: q.text,
        tag: q.tag,
        options: q.options,
        correctAnswerIndex: q.ans
      })),
      responses: [], // Empty initially for the taker
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error("Failed to parse quiz from URL", error);
    return null;
  }
};

export interface DecodedBoomerang {
  quizId: string;
  response: QuizResponse;
}

/**
 * Safely reads a base64 string from a returning boomerang link.
 * Returns the quiz ID it belongs to and the newly formatted QuizResponse.
 */
export const parseBoomerangFromUrl = (encodedStr: string): DecodedBoomerang | null => {
  try {
    const decoded = JSON.parse(decodeURIComponent(atob(encodedStr)));
    
    return {
      quizId: decoded.id,
      response: {
        id: decoded.rId,
        responderName: decoded.n,
        score: decoded.s,
        relationshipTitle: decoded.rt,
        avatarUrl: decoded.av,
        answers: [], // Omitted from URL to save space
        answeredAt: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error("Failed to parse result from URL", error);
    return null;
  }
};
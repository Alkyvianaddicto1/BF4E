/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import type { Quiz, QuizQuestion, QuizResponse } from "../types";
import { SEED_QUIZZES } from "../constants/seedData";
import { generateSimulatedResponse } from "../utils/quizUtils";

export type PageState = 
  | "home" 
  | "create_setup" 
  | "create_questions" 
  | "success" 
  | "take_setup" 
  | "take_questions" 
  | "take_complete" 
  | "leaderboard" 
  | "activity";

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = localStorage.getItem("bf4e_quizzes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading quizzes, resetting to seeds", e);
      }
    }
    return SEED_QUIZZES;
  });

  const [activeTab, setActiveTab] = useState<"home" | "create" | "activity" | "rankings">("home");
  const [page, setPage] = useState<PageState>("home");
  const [selectedQuizId, setSelectedQuizId] = useState<string>(() => {
    return quizzes[0]?.id || "vibes-check-892";
  });

  // Create Form State
  const [creatorName, setCreatorName] = useState("");
  const [customQuestions, setCustomQuestions] = useState<QuizQuestion[]>([]);
  const [justCreatedQuizId, setJustCreatedQuizId] = useState("");

  // Play Quiz State
  const [playerNickname, setPlayerNickname] = useState("");
  const [playerAnswers, setPlayerAnswers] = useState<number[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [lastQuizScore, setLastQuizScore] = useState<number | null>(null);
  const [lastQuizResult, setLastQuizResult] = useState<QuizResponse | null>(null);

  // UI state
  const [copiedId, setCopiedId] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [notificationsMock, setNotificationsMock] = useState(false);
  const [showNotificationList, setShowNotificationList] = useState(false);
  const [activeConfetti, setActiveConfetti] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem("bf4e_quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  const triggerNotification = (message: string) => {
    setNotificationMsg(message);
    setNotificationsMock(true);
    setTimeout(() => {
      setNotificationsMock(false);
    }, 4500);
  };

  const deleteQuiz = (quizId: string) => {
    const updated = quizzes.filter(q => q.id !== quizId);
    setQuizzes(updated);
    if (selectedQuizId === quizId) {
      setSelectedQuizId(updated[0]?.id || "");
    }
    triggerNotification("Quiz deleted successfully. 🗑️");
  };

  const simulateNewAnswer = () => {
    const activeQuiz = quizzes.find(q => q.id === selectedQuizId) || quizzes[0];
    if (!activeQuiz) {
      triggerNotification("Please create a quiz first to simulate responses!");
      return;
    }

    const response = generateSimulatedResponse(activeQuiz.questions);
    
    const updated = quizzes.map(q => {
      if (q.id === activeQuiz.id) {
        return {
          ...q,
          responses: [response, ...q.responses]
        };
      }
      return q;
    });

    setQuizzes(updated);
    triggerNotification(`🔔 New response! ${response.responderName} scored ${response.score} pts!`);
  };

  return {
    quizzes,
    setQuizzes,
    activeTab,
    setActiveTab,
    page,
    setPage,
    selectedQuizId,
    setSelectedQuizId,
    creatorName,
    setCreatorName,
    customQuestions,
    setCustomQuestions,
    justCreatedQuizId,
    setJustCreatedQuizId,
    playerNickname,
    setPlayerNickname,
    playerAnswers,
    setPlayerAnswers,
    activeQuestionIndex,
    setActiveQuestionIndex,
    lastQuizScore,
    setLastQuizScore,
    lastQuizResult,
    setLastQuizResult,
    copiedId,
    setCopiedId,
    notificationMsg,
    notificationsMock,
    triggerNotification,
    showNotificationList,
    setShowNotificationList,
    activeConfetti,
    setActiveConfetti,
    deleteQuiz,
    simulateNewAnswer
  };
}

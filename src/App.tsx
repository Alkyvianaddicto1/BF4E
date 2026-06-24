/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { 
  Home as HomeIcon, 
  PlusCircle, 
  Zap, 
  Trophy, 
  Check, 
  ArrowRight
} from "lucide-react";

import { useQuizzes } from "./hooks/useQuizzes";
import { QUESTION_TEMPLATES } from "./constants/questions";
import { AppAssets } from "./assets/assetHelper";
import type { QuizQuestion, Quiz, QuizResponse } from "./types";
import { calculateScore, getRelationshipTitle } from "./utils/quizUtils";
import {
  generateBoomerangLink,
  parseQuizFromUrl,
  parseBoomerangFromUrl
} from "./middleware/baseLogic"

// Import Components
import Header from "./components/Header";
import Confetti from "./components/Confetti";
import NotificationToast from "./components/NotificationToast";
import ScreenWrapper from "./screens/ScreenWrapper";

// Import Pages
import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import Success from "./pages/Success";
import Leaderboard from "./pages/Leaderboard";
import Activity from "./pages/Activity";

export default function App() {
  const {
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
  } = useQuizzes();

  const [activeConfigQuestionIndex, setActiveConfigQuestionIndex] = useState(0);

  // Parse deep links in URL
  // Parse deep links in URL using BaseLogic Middleware
  // Parse deep links in URL using BaseLogic Middleware
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedQuiz = params.get("quiz");
    const encodedResult = params.get("result");

    if (encodedQuiz) {
      const decodedQuiz = parseQuizFromUrl(encodedQuiz);
      if (decodedQuiz) {
        setQuizzes((prev) => {
          if (!prev.find(q => q.id === decodedQuiz.id)) {
            return [decodedQuiz, ...prev];
          }
          return prev;
        });
        setSelectedQuizId(decodedQuiz.id);
        setPage("take_setup");
        
        // FIX: Wipe the URL clean so refreshing doesn't reset the user's quiz progress!
        window.history.replaceState(null, '', window.location.pathname);
      } else {
        triggerNotification("Invalid or broken quiz link! 🥺");
      }
    } else if (encodedResult) {
      const decodedResult = parseBoomerangFromUrl(encodedResult);
      if (decodedResult) {
        setQuizzes((prev) => prev.map(q => {
          if (q.id === decodedResult.quizId && !q.responses.find(r => r.id === decodedResult.response.id)) {
            
            // FIX: Add the response AND sort the array so the Leaderboard podium works correctly
            const updatedResponses = [decodedResult.response, ...q.responses];
            updatedResponses.sort((a, b) => b.score - a.score);
            
            return { ...q, responses: updatedResponses };
          }
          return q;
        }));
        setSelectedQuizId(decodedResult.quizId);
        setPage("leaderboard");
        setActiveTab("rankings");
        triggerNotification(`Added ${decodedResult.response.responderName}'s score! 🏆`);
        
        // FIX: Clean the URL to prevent duplicate loads on refresh
        window.history.replaceState(null, '', window.location.pathname);
      } else {
        triggerNotification("Invalid result link! 🥺");
      }
    }
  }, [setQuizzes, setActiveTab, setPage, setSelectedQuizId, triggerNotification]);

  // Bottom / Top Tab switching
  const handleTabChange = (tab: "home" | "create" | "activity" | "rankings") => {
    setActiveTab(tab);
    if (tab === "home") {
      setPage("home");
    } else if (tab === "create") {
      handleInitiateCreate();
    } else if (tab === "activity") {
      setPage("activity");
    } else if (tab === "rankings") {
      setPage("leaderboard");
    }
  };

  const handleInitiateCreate = () => {
    setCreatorName("");
    setActiveConfigQuestionIndex(0);
    
    // Fill customQuestions with 3 random starter templates from general pool
    const shuffled = [...QUESTION_TEMPLATES].sort(() => 0.5 - Math.random());
    const initialQuestions: QuizQuestion[] = shuffled.slice(0, 3).map((template, idx) => ({
      id: `q-${idx}-${Date.now()}`,
      text: template.text,
      tag: template.tag,
      options: template.options,
      correctAnswerIndex: -1 // Must be customized in the editor form
    }));

    setCustomQuestions(initialQuestions);
    setPage("create_setup");
    setActiveTab("create");
  };

  const handlePublishQuiz = (questions: QuizQuestion[]) => {
    const newQuizId = `quiz-${Math.random().toString(36).substr(2, 6)}`;
    const newQuiz: Quiz = {
      id: newQuizId,
      creatorName: creatorName.trim(),
      title: `The Ultimate ${creatorName.trim()}'s Bestie Test`,
      questions: questions,
      responses: [],
      createdAt: new Date().toISOString()
    };

    setQuizzes((prev) => [newQuiz, ...prev]);
    setJustCreatedQuizId(newQuizId);
    setSelectedQuizId(newQuizId);
    setPage("success");
    setActiveConfetti(true);
    triggerNotification("Quiz Published! Time to test those besties. ✨");
    setTimeout(() => setActiveConfetti(false), 5000);
  };

  const handleSelectPlayerAnswer = (optionIndex: number) => {
    const updatedAnswers = [...playerAnswers];
    updatedAnswers[activeQuestionIndex] = optionIndex;
    setPlayerAnswers(updatedAnswers);

    const activeQuiz = quizzes.find(q => q.id === selectedQuizId);
    if (!activeQuiz) return;

    if (activeQuestionIndex < activeQuiz.questions.length - 1) {
      setTimeout(() => {
        setActiveQuestionIndex(prev => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        calculateAndSubmitPlayerScore(updatedAnswers);
      }, 400);
    }
  };

  const calculateAndSubmitPlayerScore = (answers: number[]) => {
    const activeQuiz = quizzes.find(q => q.id === selectedQuizId);
    if (!activeQuiz) return;

    const score = calculateScore(answers, activeQuiz.questions);
    const relationshipTitle = getRelationshipTitle(score);

    const chosenAvatarKeys = Object.keys(AppAssets.avatars);
    const randomAvatar = AppAssets.avatars[chosenAvatarKeys[Math.floor(Math.random() * chosenAvatarKeys.length)] as keyof typeof AppAssets.avatars];

    const responseItem: QuizResponse = {
      id: `resp-${Date.now()}`,
      responderName: playerNickname.trim(),
      avatarUrl: randomAvatar,
      answers,
      score,
      relationshipTitle,
      answeredAt: new Date().toISOString()
    };

    const updatedQuizzes = quizzes.map(q => {
      if (q.id === selectedQuizId) {
        // Add response and sort locally
        const updatedResponses = [responseItem, ...q.responses];
        updatedResponses.sort((a, b) => b.score - a.score);
        
        return {
          ...q,
          responses: updatedResponses
        };
      }
      return q;
    });

    setQuizzes(updatedQuizzes);
    setLastQuizScore(score);
    setLastQuizResult(responseItem);
    setPage("take_complete");
    setActiveConfetti(true);
    triggerNotification(`Completed with ${score} pts! You are definitely "${relationshipTitle}" 🧸`);
    setTimeout(() => setActiveConfetti(false), 5000);
  };

  const handleCopyLink = async (quizId: string) => {
    const activeQuiz = quizzes.find(q => q.id === quizId);
    if (!activeQuiz) return;

    try {
      // 1. Minify and encode the data just like before
      const payload = {
        id: activeQuiz.id,
        c: activeQuiz.creatorName,
        t: activeQuiz.title,
        q: activeQuiz.questions.map(q => ({
          text: q.text,
          tag: q.tag,
          options: q.options,
          ans: q.correctAnswerIndex
        }))
      };
      const encodedStr = btoa(encodeURIComponent(JSON.stringify(payload)));

      // 2. Trigger your deployed Python server!
      // Replace this URL with wherever you host your Python API
      const pythonApiUrl = "https://ZfluffySpicy.pythonanywhere.com"; 
      
      const response = await fetch(pythonApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creator_name: activeQuiz.creatorName,
          encoded_data: encodedStr
        })
      });

      if (!response.ok) throw new Error("Failed to shorten link");

      // 3. Get the short path (e.g., "/Alex/a1b2c3d4") back from Python
      const data = await response.json();
      
      // 4. Combine your API domain with the short path to make the final link
      // Note: Because Python handles the redirect, the copied link actually points to the Python server first!
      const finalShareUrl = `https://your-deployed-python-server.com${data.short_path}`;
      
      await navigator.clipboard.writeText(finalShareUrl);
      
      setCopiedId(true);
      triggerNotification("Copied short link to clipboard! 🔗");
      setTimeout(() => setCopiedId(false), 3000);

    } catch (error) {
      console.error(error);
      triggerNotification("Oops! Link shortener failed. 🥺");
    }
  };

  const handleSendScoreToCreator = () => {
    const activeQuiz = quizzes.find(q => q.id === selectedQuizId);
    if (!activeQuiz || !lastQuizResult) return;
    
    const link = generateBoomerangLink(activeQuiz.id, lastQuizResult);
    const msg = `I took your bestie test and scored ${lastQuizResult.score}! See my rank: ${link}`;
    
    // Utilize native share sheet if on mobile for a seamless experience
    if (navigator.share) {
      navigator.share({ title: 'My Quiz Score', text: msg }).catch(console.error);
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
    }
  };

  const activeQuizObj = quizzes.find(q => q.id === selectedQuizId) || quizzes[0];
  const lastSimulatedResp = activeQuizObj?.responses[0];

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col justify-between">
      
      {/* 1. Header component */}
      <Header 
        onGoHome={() => handleTabChange("home")}
        showSimulate={page === "success" || page === "leaderboard"}
        onSimulateAnswer={simulateNewAnswer}
        showNotificationList={showNotificationList}
        onToggleNotifications={() => setShowNotificationList(!showNotificationList)}
        recentResponderName={lastSimulatedResp?.responderName}
        recentScore={lastSimulatedResp?.score}
        recentQuizTitle={activeQuizObj?.title}
        onProfileClick={() => handleTabChange("rankings")}
      />

      {/* 2. Main Page views selector */}
      <ScreenWrapper>
        {page === "home" && (
          <Home 
            onCreateQuiz={() => handleTabChange("create")}
            onTakeQuiz={() => {
              if (quizzes.length > 0) {
                setPage("take_setup");
                setPlayerNickname("");
              }
            }}
            hasQuizzes={quizzes.length > 0}
          />
        )}

        {(page === "create_setup" || page === "create_questions") && (
          <CreateQuiz 
            creatorName={creatorName}
            setCreatorName={setCreatorName}
            customQuestions={customQuestions}
            setCustomQuestions={setCustomQuestions}
            activeConfigQuestionIndex={activeConfigQuestionIndex}
            setActiveConfigQuestionIndex={setActiveConfigQuestionIndex}
            onBackToHome={() => handleTabChange("home")}
            onPublish={handlePublishQuiz}
            triggerNotification={triggerNotification}
            page={page as "create_setup" | "create_questions"}
            setPage={(p) => setPage(p)}
          />
        )}

        {page === "success" && activeQuizObj && (
          <Success 
            quiz={activeQuizObj}
            copiedId={copiedId}
            onCopyLink={() => handleCopyLink(activeQuizObj.id)}
            onSimulateAnswer={simulateNewAnswer}
            onTriggerNotification={triggerNotification}
          />
        )}

        {(page === "take_setup" || page === "take_questions") && activeQuizObj && (
          <TakeQuiz 
            quiz={activeQuizObj}
            playerNickname={playerNickname}
            setPlayerNickname={setPlayerNickname}
            playerAnswers={playerAnswers}
            onSelectPlayerAnswer={handleSelectPlayerAnswer}
            activeQuestionIndex={activeQuestionIndex}
            onBackToHome={() => handleTabChange("home")}
            onStartAnswering={() => {
              if (!playerNickname.trim()) {
                triggerNotification("Enter your name to start! 🤔");
                return;
              }
              setPage("take_questions");
            }}
            page={page as "take_setup" | "take_questions"}
          />
        )}

        {page === "take_complete" && activeQuizObj && lastQuizResult && (
          <div className="max-w-md mx-auto py-4 space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-2xl border border-surface-container relative overflow-hidden space-y-4">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-secondary to-secondary-container" />
              
              <div className="bg-tertiary-fixed w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-md">
                <Check className="w-12 h-12 text-tertiary font-bold" />
              </div>

              <h1 className="font-headline text-3xl font-extrabold text-gradient">Score Submitted!</h1>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                You scored <b className="text-secondary text-base">{lastQuizScore} / 1000 pts</b> on {activeQuizObj.creatorName}'s friendship test!
              </p>

              <div className="p-4 bg-surface rounded-2xl inline-block mt-4 select-none">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Relationship Status</p>
                <p className="text-base font-extrabold text-primary pt-0.5">"{lastQuizResult.relationshipTitle}"</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSendScoreToCreator}
                className="w-full h-14 rounded-2xl bg-linear-to-r from-primary to-primary-container text-on-primary font-headline text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all active:scale-95 cursor-pointer"
              >
                <span>Send Score to {activeQuizObj.creatorName}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleTabChange("create")}
                className="w-full h-14 rounded-2xl bg-surface border-2 border-primary text-primary font-headline text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 hover:bg-primary/5 cursor-pointer"
              >
                <span>Make My Quiz</span>
              </button>
            </div>
          </div>
        )}

        {page === "leaderboard" && (
          <Leaderboard 
            quizzes={quizzes}
            selectedQuizId={selectedQuizId}
            onSelectQuizId={setSelectedQuizId}
            onInitiateTakeQuiz={(qId) => {
              setSelectedQuizId(qId);
              setPlayerNickname("");
              setPage("take_setup");
            }}
            onCopyLink={handleCopyLink}
            onInitiateCreate={() => handleTabChange("create")}
          />
        )}

        {page === "activity" && (
          <Activity 
            quizzes={quizzes}
            onDeleteQuiz={(qId) => deleteQuiz(qId)}
            onCopyLink={handleCopyLink}
            onViewLeaderboard={(qId) => {
              setSelectedQuizId(qId);
              setPage("leaderboard");
              setActiveTab("rankings");
            }}
          />
        )}
      </ScreenWrapper>

      {/* 3. Bottom Tabs for Mobile screens */}
      <nav className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-lg border-t border-surface-container-high rounded-t-2xl shadow-2xl z-40 select-none py-2.5 px-6 flex justify-around items-center md:hidden">
        <button 
          onClick={() => handleTabChange("home")}
          className={`flex flex-col items-center justify-center p-2.5 rounded-full px-4 transition-all cursor-pointer ${
            activeTab === "home" 
              ? "bg-primary-container text-on-primary-container scale-105" 
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          <HomeIcon className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>

        <button 
          onClick={() => handleTabChange("create")}
          className={`flex flex-col items-center justify-center p-2.5 rounded-full px-4 transition-all cursor-pointer ${
            activeTab === "create" 
              ? "bg-primary-container text-on-primary-container scale-105" 
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          <PlusCircle className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">Create</span>
        </button>

        <button 
          onClick={() => handleTabChange("activity")}
          className={`flex flex-col items-center justify-center p-2.5 rounded-full px-4 transition-all cursor-pointer ${
            activeTab === "activity" 
              ? "bg-primary-container text-on-primary-container scale-105" 
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          <Zap className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">Activity</span>
        </button>

        <button 
          onClick={() => handleTabChange("rankings")}
          className={`flex flex-col items-center justify-center p-2.5 rounded-full px-4 transition-all cursor-pointer ${
            activeTab === "rankings" 
              ? "bg-primary-container text-on-primary-container scale-105" 
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">Rankings</span>
        </button>
      </nav>

      {/* Toast alarms */}
      <NotificationToast show={notificationsMock} message={notificationMsg} />

      {/* Success confettis */}
      <Confetti active={activeConfetti} />

    </div>
  );
}
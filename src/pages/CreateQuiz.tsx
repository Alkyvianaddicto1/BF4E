/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { MouseEvent } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Check, 
  Users,
  Sparkles,
} from "lucide-react";
import type { QuizQuestion } from "../types";
import { QUESTION_TEMPLATES } from "../constants/questions";
import { AppAssets } from "../assets/assetHelper";

interface CreateQuizProps {
  creatorName: string;
  setCreatorName: (val: string) => void;
  customQuestions: QuizQuestion[];
  setCustomQuestions: (qs: QuizQuestion[]) => void;
  activeConfigQuestionIndex: number;
  setActiveConfigQuestionIndex: (idx: number) => void;
  onBackToHome: () => void;
  onPublish: (questions: QuizQuestion[]) => void;
  triggerNotification: (msg: string) => void;
  page: "create_setup" | "create_questions";
  setPage: (p: "create_setup" | "create_questions") => void;
}

export default function CreateQuiz({
  creatorName,
  setCreatorName,
  customQuestions,
  setCustomQuestions,
  activeConfigQuestionIndex,
  setActiveConfigQuestionIndex,
  onBackToHome,
  onPublish,
  triggerNotification,
  page,
  setPage,
}: CreateQuizProps) {

  const maxQuestions = 15;

  // Suggested tags to pick from easily
  const SUGGESTED_TAGS = ["Vibes Check", "Survival Skills", "Drama Radar", "Apocalypse Plan", "Secrets", "Guilty Pleasures", "Favorites"];

  const handleStartQuestionsConfig = () => {
    if (!creatorName.trim()) {
      triggerNotification("Please enter a fabulous nickname first! ✨");
      return;
    }
    setPage("create_questions");
    setActiveConfigQuestionIndex(0);
  };

  const handleAddQuestion = () => {
    if (customQuestions.length >= maxQuestions) {
      triggerNotification(`Maximum ${maxQuestions} questions allowed! Keep it punchy! ⚡`);
      return;
    }

    // Get a random question template that is not already in customQuestions if possible
    const existingTexts = new Set(customQuestions.map(q => q.text));
    const availableTemplates = QUESTION_TEMPLATES.filter(t => !existingTexts.has(t.text));
    const template = availableTemplates.length > 0 
      ? availableTemplates[Math.floor(Math.random() * availableTemplates.length)]
      : QUESTION_TEMPLATES[Math.floor(Math.random() * QUESTION_TEMPLATES.length)];

    const newQ: QuizQuestion = {
      id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      text: template ? template.text : "Who knows me best? 🤔",
      tag: template ? template.tag : "Vibes Check",
      options: template ? [...template.options] : ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswerIndex: -1
    };

    const updated = [...customQuestions, newQ];
    setCustomQuestions(updated);
    setActiveConfigQuestionIndex(updated.length - 1);
    triggerNotification("Added a custom question! Customize it below. ✨");
  };

  const handleRemoveQuestion = (idx: number, e: MouseEvent) => {
    e.stopPropagation();
    if (customQuestions.length <= 1) {
      triggerNotification("Your quiz must have at least 1 question! 🥺");
      return;
    }
    const updated = customQuestions.filter((_, qIdx) => qIdx !== idx);
    setCustomQuestions(updated);
    
    // Adjust active index
    if (activeConfigQuestionIndex >= updated.length) {
      setActiveConfigQuestionIndex(updated.length - 1);
    }
    triggerNotification("Question removed.");
  };

  // Safe updates to the active question
  const updateActiveQuestion = <K extends keyof QuizQuestion>(field: K, value: QuizQuestion[K]) => {
    const updated = [...customQuestions];
    updated[activeConfigQuestionIndex] = {
      ...updated[activeConfigQuestionIndex],
      [field]: value
    };
    setCustomQuestions(updated);
  };

  const updateActiveOption = (optIdx: number, val: string) => {
    const updated = [...customQuestions];
    const currentOptions = [...updated[activeConfigQuestionIndex].options];
    currentOptions[optIdx] = val;
    updated[activeConfigQuestionIndex] = {
      ...updated[activeConfigQuestionIndex],
      options: currentOptions
    };
    setCustomQuestions(updated);
  };

  const handlePublishQuiz = () => {
    // Validate that ALL questions have a correct answer selected
    const unansweredIdx = customQuestions.findIndex(q => q.correctAnswerIndex === -1);
    if (unansweredIdx !== -1) {
      setActiveConfigQuestionIndex(unansweredIdx);
      triggerNotification(`Question ${unansweredIdx + 1} needs you to select the correct answer! 🎯`);
      return;
    }

    // Validate that question texts are not empty
    const emptyQIdx = customQuestions.findIndex(q => !q.text.trim());
    if (emptyQIdx !== -1) {
      setActiveConfigQuestionIndex(emptyQIdx);
      triggerNotification(`Question ${emptyQIdx + 1} cannot have an empty question text! ✍️`);
      return;
    }

    // Validate that option texts are not empty
    for (let qI = 0; qI < customQuestions.length; qI++) {
      const q = customQuestions[qI];
      if (q.options.some(opt => !opt.trim())) {
        setActiveConfigQuestionIndex(qI);
        triggerNotification(`All options on Question ${qI + 1} must be filled in! ✍️`);
        return;
      }
    }

    onPublish(customQuestions);
  };

  return (
    <div className="max-w-5xl mx-auto py-4">
      
      {/* 1. SETUP PAGE */}
      {page === "create_setup" && (
        <div className="max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={onBackToHome}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-highest/60 text-on-surface-variant hover:bg-primary-container/20 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="font-headline text-xs font-bold text-primary tracking-widest uppercase">Setup Quiz</span>
              <div className="w-10 h-10" />
            </div>

            {/* Stepper bar */}
            <div className="w-full px-1">
              <div className="flex justify-between text-xs font-semibold text-on-surface-variant mb-1.5">
                <span>Configure Profile</span>
                <span>Max 15 Questions</span>
              </div>
              <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-secondary w-1/4 rounded-full relative transition-all duration-500" />
              </div>
            </div>
          </div>

          <div className="w-full bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-xl border border-surface-variant/40 relative overflow-hidden text-center">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-linear-to-br from-secondary-container to-secondary rounded-full blur-2xl opacity-15 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-primary-container/20 text-primary rounded-2xl flex items-center justify-center mb-2 transform -rotate-3 transition-transform hover:rotate-3 duration-300">
                <Users className="w-8 h-8 font-extrabold fill-current" />
              </div>
              
              <h2 className="font-headline text-2xl font-extrabold text-on-surface tracking-tight leading-tight">
                Who is taking<br />this quiz?
              </h2>
              <p className="text-sm font-light text-on-surface-variant max-w-70">
                Enter your nickname below so we can brand your custom bestie test.
              </p>

              <div className="w-full relative pt-2 text-left">
                <input 
                  type="text" 
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  placeholder="e.g. Spicy Queen 👑"
                  maxLength={32}
                  className="w-full bg-surface-container h-14 px-4 rounded-xl border border-outline-variant text-on-surface text-base font-semibold placeholder:text-outline focus:outline-none focus:border-2 focus:border-primary focus:bg-surface-container-lowest transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button 
              onClick={handleStartQuestionsConfig}
              className="w-full h-14 rounded-2xl bg-linear-to-r from-primary to-primary-container text-on-primary font-headline text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:brightness-110 active:scale-95 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Build My Questions</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. LIVE QUESTIONS & ANSWERS EDITOR PAGE */}
      {page === "create_questions" && customQuestions.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* LEFT PANEL: Question Stepper & Sidebar list */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-surface-container-low rounded-3xl p-5 border border-outline-variant/20 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-headline font-extrabold text-on-surface text-md">Questions List</h3>
                  <p className="text-[11px] text-on-surface-variant">{customQuestions.length} of {maxQuestions} active</p>
                </div>
                
                <button
                  onClick={handleAddQuestion}
                  disabled={customQuestions.length >= maxQuestions}
                  className="flex items-center gap-1 bg-primary text-on-primary text-xs font-bold px-3 py-1.5 rounded-full hover:bg-primary-container transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Q</span>
                </button>
              </div>

              {/* Progress dynamic bar */}
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div 
                  className="h-full bg-secondary rounded-full transition-all duration-500"
                  style={{ width: `${(customQuestions.length / maxQuestions) * 100}%` }}
                />
              </div>

              {/* Scrollable grid/list of created questions */}
              <div className="space-y-2 max-h-87.5 overflow-y-auto pr-1">
                {customQuestions.map((q, idx) => {
                  const isActive = idx === activeConfigQuestionIndex;
                  const isUnanswered = q.correctAnswerIndex === -1;
                  
                  return (
                    <div
                      key={q.id}
                      onClick={() => setActiveConfigQuestionIndex(idx)}
                      className={`group p-3 rounded-xl border flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${
                        isActive 
                          ? "bg-primary-fixed border-primary-container shadow-sm" 
                          : "bg-surface-container-lowest border-outline-variant/20 hover:border-primary/40"
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isActive ? "bg-primary text-on-primary" : "bg-outline-variant text-on-surface-variant"
                        }`}>
                          {idx + 1}
                        </span>
                        <div className="truncate text-xs font-semibold">
                          <p className={`truncate ${isActive ? "text-primary-container font-extrabold" : "text-on-surface"}`}>
                            {q.text || "(New Custom Question)"}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-outline">{q.tag}</span>
                            {isUnanswered && (
                              <span className="w-1.5 h-1.5 bg-secondary-container rounded-full animate-pulse" title="Needs answer index" />
                            )}
                          </div>
                        </div>
                      </div>

                      {customQuestions.length > 1 && (
                        <button
                          onClick={(e) => handleRemoveQuestion(idx, e)}
                          className="p-1 px-1.5 rounded-md text-outline hover:text-secondary hover:bg-secondary/15 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                          title="Delete question"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Tips banner */}
              <div className="bg-primary/5 p-3.5 rounded-xl border border-primary/20 flex gap-2">
                <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5 animate-pulse" />
                <p className="text-[10px] leading-relaxed text-on-surface-variant">
                  <b>GenZ Protip:</b> Spice up options under each tab to force hilarious bestie disputes! Ensure at least 1 answer is set as the absolute truth.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Live Interactive Editor Form */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Main Interactive Question Card Editor */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-xl border border-surface-container relative overflow-hidden space-y-6">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary to-primary-container" />

              {/* Tag Selection Row */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-outline uppercase tracking-wider block">Question Tag Category</label>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_TAGS.map((tag) => {
                    const isSelected = customQuestions[activeConfigQuestionIndex].tag === tag;
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => updateActiveQuestion("tag", tag)}
                        className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                          isSelected 
                            ? "bg-tertiary-fixed text-on-tertiary-fixed-variant font-bold border-2 border-tertiary-container shadow-sm"
                            : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high border-2 border-transparent"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                  {/* Custom tag input alternative */}
                  <input
                    type="text"
                    value={customQuestions[activeConfigQuestionIndex].tag}
                    onChange={(e) => updateActiveQuestion("tag", e.target.value)}
                    placeholder="Custom Tag..."
                    className="text-xs px-3 py-1.5 bg-surface-container text-on-surface placeholder:text-outline border border-outline-variant/30 rounded-full focus:outline-none focus:border-primary max-w-30"
                  />
                </div>
              </div>

              {/* Question Textarea Input */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-outline uppercase tracking-wider block">Question Title / Text</label>
                <div className="relative">
                  <textarea
                    rows={2}
                    value={customQuestions[activeConfigQuestionIndex].text}
                    onChange={(e) => updateActiveQuestion("text", e.target.value)}
                    maxLength={100}
                    placeholder="e.g. What is my secret everyday superpower? ✨"
                    className="w-full bg-surface text-on-background p-4 rounded-xl border border-outline-variant text-base font-extrabold focus:outline-none focus:border-2 focus:border-primary resize-none placeholder:font-sans placeholder:font-normal placeholder:text-outline"
                  />
                  <span className="absolute bottom-2 right-2 text-[10px] text-outline font-semibold">
                    {customQuestions[activeConfigQuestionIndex].text.length}/100
                  </span>
                </div>
              </div>

              {/* Options & Choices Setup */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-[11px] font-bold text-outline uppercase tracking-wider">Configure Answers & Choose Correct One</label>
                  <span className="text-[10px] text-secondary font-bold flex items-center gap-1 uppercase tracking-wide animate-pulse">
                    <Check className="w-3.5 h-3.5" />
                    Click letter to set true
                  </span>
                </div>

                <div className="space-y-3">
                  {customQuestions[activeConfigQuestionIndex].options.map((option, oIdx) => {
                    const isCorrect = customQuestions[activeConfigQuestionIndex].correctAnswerIndex === oIdx;

                    return (
                      <div 
                        key={oIdx}
                        className={`group rounded-xl p-2.5 flex items-center gap-3 transition-all duration-300 border ${
                          isCorrect 
                            ? "bg-primary-container/10 border-primary" 
                            : "bg-surface border-surface-container hover:border-primary/20"
                        }`}
                      >
                        {/* Circle Badge (Interactive Button to toggling correct index) */}
                        <button
                          type="button"
                          onClick={() => updateActiveQuestion("correctAnswerIndex", oIdx)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-headline font-bold shrink-0 transition-all cursor-pointer ${
                            isCorrect 
                              ? "bg-primary text-on-primary ring-4 ring-primary-container/20" 
                              : "bg-surface-container-high text-primary hover:bg-primary-fixed"
                          }`}
                          title="Set this option as correct answer"
                        >
                          {isCorrect ? <Check className="w-5 h-5" /> : String.fromCharCode(65 + oIdx)}
                        </button>

                        {/* Text editable option input */}
                        <div className="grow">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateActiveOption(oIdx, e.target.value)}
                            maxLength={80}
                            placeholder={`Answer choice ${String.fromCharCode(65 + oIdx)}`}
                            className={`w-full bg-transparent px-2.5 py-1.5 rounded-lg text-sm font-semibold focus:outline-none ${
                              isCorrect 
                                ? "text-on-surface focus:bg-surface-container" 
                                : "text-on-surface-variant focus:bg-surface-container-low"
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Back / Create Publish Action Button Footer */}
              <div className="pt-4 border-t border-surface-container-high flex justify-between items-center">
                <button
                  onClick={() => {
                    if (activeConfigQuestionIndex > 0) {
                      setActiveConfigQuestionIndex(activeConfigQuestionIndex - 1);
                    } else {
                      setPage("create_setup");
                    }
                  }}
                  className="px-5 h-12 text-on-surface-variant hover:text-primary transition-all font-semibold text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  {activeConfigQuestionIndex < customQuestions.length - 1 ? (
                    <button
                      onClick={() => setActiveConfigQuestionIndex(activeConfigQuestionIndex + 1)}
                      className="px-5 h-12 rounded-xl text-primary font-bold text-xs hover:bg-primary/5 border border-primary/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Next Q</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : null}

                  <button
                    onClick={handlePublishQuiz}
                    className="bg-linear-to-r from-primary to-primary-container text-on-primary font-headline text-xs font-bold px-6 h-12 rounded-xl shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Publish Custom Quiz</span>
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Nice aesthetic visual banner */}
            <div className="w-full flex items-center justify-center pt-2 opacity-80 pointer-events-none select-none">
              <div 
                className="bg-contain bg-center bg-no-repeat w-full h-32 mix-blend-multiply" 
                style={{ backgroundImage: `url('${AppAssets.images.shapes3D}')` }} 
              />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
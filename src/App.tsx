import React, { useState, useEffect } from 'react';
import {
  Difficulty,
  PassageData,
  SessionResult,
  UserProfile,
} from './types';
import {
  getUserProfile,
  saveSessionResult,
  requestGeneratePassage,
  requestWeaknessAnalysis,
} from './services/api';
import { LoginPage } from './components/LoginPage';
import { DifficultyAndMyPage } from './components/DifficultyAndMyPage';
import { ReadingExercisePage } from './components/ReadingExercisePage';
import { ResultAndWeaknessPage } from './components/ResultAndWeaknessPage';

type AppPage = 'login' | 'difficulty-mypage' | 'exercise' | 'result';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('login');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('normal');
  const [currentPassage, setCurrentPassage] = useState<PassageData | null>(null);
  const [currentResult, setCurrentResult] = useState<SessionResult | null>(null);

  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isGeneratingPassage, setIsGeneratingPassage] = useState(false);
  const [isAnalyzingAnswers, setIsAnalyzingAnswers] = useState(false);

  // Initialize previous session if stored
  useEffect(() => {
    const savedEmail = localStorage.getItem('readflow_current_user_email');
    if (savedEmail) {
      getUserProfile(savedEmail)
        .then((profile) => {
          if (profile) {
            setUserProfile(profile);
          }
        })
        .catch(console.error);
    }
  }, []);

  // Handle Login (Page 1 -> Page 2)
  const handleLogin = async (
    email: string,
    name?: string,
    provider: 'google' | 'email' = 'email'
  ) => {
    setIsLoadingAuth(true);
    try {
      const profile = await getUserProfile(email);
      if (name && profile.name !== name) {
        profile.name = name;
      }
      profile.provider = provider;
      setUserProfile(profile);
      localStorage.setItem('readflow_current_user_email', email);
      setCurrentPage('difficulty-mypage');
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  // Handle Logout (returns to Page 1)
  const handleLogout = () => {
    setCurrentPage('login');
  };

  // Handle Selecting Difficulty on Page 2 -> Generates Passage & goes to Page 3
  const handleSelectDifficulty = async (difficulty: Difficulty) => {
    setCurrentDifficulty(difficulty);
    setIsGeneratingPassage(true);

    try {
      const passage = await requestGeneratePassage(difficulty);
      setCurrentPassage(passage);
      setCurrentPage('exercise');
    } catch (err) {
      console.error('Failed to generate passage:', err);
    } finally {
      setIsGeneratingPassage(false);
    }
  };

  // Handle Submitting Answers on Page 3 -> Generates Weakness Analysis & goes to Page 4
  const handleSubmitAnswers = async (
    answers: { questionId: number; selectedOption: number }[],
    timeSpentSeconds: number
  ) => {
    if (!currentPassage || !userProfile) return;

    setIsAnalyzingAnswers(true);
    try {
      const formattedAnswers = currentPassage.questions.map((q) => {
        const userChoice = answers.find((a) => a.questionId === q.id)?.selectedOption ?? -1;
        const isCorrect = userChoice === q.correctAnswer;
        return {
          questionId: q.id,
          questionText: q.question,
          options: q.options,
          selectedOption: userChoice,
          correctAnswer: q.correctAnswer,
          isCorrect,
          questionType: q.questionType,
        };
      });

      const score = formattedAnswers.filter((a) => a.isCorrect).length;

      // Call AI Weakness Analysis
      const analysis = await requestWeaknessAnalysis(
        currentPassage.title,
        currentDifficulty,
        formattedAnswers,
        timeSpentSeconds,
        score
      );

      const now = new Date();
      const newSessionResult: SessionResult = {
        id: `result-${Date.now()}`,
        timestamp: now.getTime(),
        dateStr: `${now.getMonth() + 1}/${now.getDate()}`,
        difficulty: currentDifficulty,
        passageTitle: currentPassage.title,
        score,
        totalQuestions: currentPassage.questions.length,
        accuracyRate: Math.round((score / currentPassage.questions.length) * 100),
        timeSpentSeconds,
        answers: formattedAnswers.map((a) => ({
          questionId: a.questionId,
          selectedOption: a.selectedOption,
          isCorrect: a.isCorrect,
          questionType: a.questionType,
        })),
        weaknessAnalysis: analysis,
        passageData: currentPassage,
      };

      // Save to profile and server
      const updatedUser = await saveSessionResult(userProfile.email, newSessionResult);
      setUserProfile(updatedUser);
      setCurrentResult(newSessionResult);
      setCurrentPage('result');
    } catch (err) {
      console.error('Submission analysis failed:', err);
    } finally {
      setIsAnalyzingAnswers(false);
    }
  };

  // Review a past test result
  const handleReviewResult = (result: SessionResult) => {
    setCurrentResult(result);
    setCurrentPage('result');
  };

  // Page 4: "難易度選択・マイページに戻る" button -> returns to Page 2 as requested by user
  const handleReturnToMyPage = () => {
    setCurrentPage('difficulty-mypage');
  };

  // Page 3: Cancel back to Page 2
  const handleBackToMyPage = () => {
    setCurrentPage('difficulty-mypage');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans antialiased text-slate-900 dark:text-slate-100">
      {currentPage === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          currentProfile={userProfile}
          isLoading={isLoadingAuth}
        />
      )}

      {currentPage === 'difficulty-mypage' && userProfile && (
        <DifficultyAndMyPage
          user={userProfile}
          onSelectDifficulty={handleSelectDifficulty}
          onLogout={handleLogout}
          onReviewResult={handleReviewResult}
          isGenerating={isGeneratingPassage}
        />
      )}

      {currentPage === 'exercise' && currentPassage && (
        <ReadingExercisePage
          passage={currentPassage}
          difficulty={currentDifficulty}
          onSubmitAnswers={handleSubmitAnswers}
          onBackToMyPage={handleBackToMyPage}
          isAnalyzing={isAnalyzingAnswers}
        />
      )}

      {currentPage === 'result' && currentResult && (
        <ResultAndWeaknessPage
          result={currentResult}
          onReturnToMyPage={handleReturnToMyPage}
          onLogoutToLogin={handleLogout}
        />
      )}
    </div>
  );
}

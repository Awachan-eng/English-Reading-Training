import React, { useState, useEffect, useRef } from 'react';
import {
  PassageData,
  Difficulty,
  UserAnswerRecord,
} from '../types';
import { DIFFICULTY_CONFIGS } from '../data/difficulties';
import {
  Clock,
  BookOpen,
  Volume2,
  VolumeX,
  Type,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface ReadingExercisePageProps {
  passage: PassageData;
  difficulty: Difficulty;
  onSubmitAnswers: (
    answers: { questionId: number; selectedOption: number }[],
    timeSpentSeconds: number
  ) => void;
  onBackToMyPage: () => void;
  isAnalyzing: boolean;
}

export const ReadingExercisePage: React.FC<ReadingExercisePageProps> = ({
  passage,
  difficulty,
  onSubmitAnswers,
  onBackToMyPage,
  isAnalyzing,
}) => {
  const config = DIFFICULTY_CONFIGS[difficulty];

  // User selections: questionId -> selectedOption (0-4)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [activeQuestionTab, setActiveQuestionTab] = useState<number>(1);
  const [timeSeconds, setTimeSeconds] = useState<number>(0);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [lineHeight, setLineHeight] = useState<'normal' | 'relaxed'>('relaxed');
  const [paperTheme, setPaperTheme] = useState<'default' | 'sepia' | 'dark'>('default');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Web Speech API for listening
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('お使いのブラウザは音声読み上げに対応していません。');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(passage.passage);
      utterance.lang = 'en-US';
      utterance.rate = difficulty === 'easy' ? 0.9 : difficulty === 'normal' ? 1.0 : 1.05;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
    setValidationError('');
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = passage.questions.length;

  const handleSubmit = () => {
    if (answeredCount < totalQuestions) {
      const unansweredIds = passage.questions
        .filter((q) => selectedAnswers[q.id] === undefined)
        .map((q) => `問${q.id}`)
        .join(', ');
      setValidationError(`未解答の設問があります（${unansweredIds}）。全て解答してから採点へ進んでください。`);
      return;
    }

    const formattedAnswers = passage.questions.map((q) => ({
      questionId: q.id,
      selectedOption: selectedAnswers[q.id],
    }));

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    onSubmitAnswers(formattedAnswers, timeSeconds);
  };

  // Font size styling
  const fontSizeClass = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose',
  }[fontSize];

  // Paper theme styling
  const themeClass = {
    default: 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800',
    sepia: 'bg-[#faf6ee] text-[#3c3427] border-[#e8dfcb]',
    dark: 'bg-slate-950 text-slate-200 border-slate-800',
  }[paperTheme];

  const alphabetLabels = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col">
      {/* Top Header / Bar */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('難易度選択に戻りますか？現在の解答内容はリセットされます。')) {
                  onBackToMyPage();
                }
              }}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">マイページに戻る</span>
            </button>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${config.accentBg} ${config.accentText} border ${config.accentBorder}`}>
                {config.label} ({config.eikenGrade})
              </span>
              <span className="text-xs text-slate-500 hidden md:inline">
                語数: {passage.wordCount}語
              </span>
            </div>
          </div>

          {/* Center/Right Info: Timer & Progress */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>{formatTimer(timeSeconds)}</span>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200/60 dark:border-indigo-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                {answeredCount} / {totalQuestions} 問解答済
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Reading & Questions Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Upper Column: English Reading Passage (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          {/* Passage Toolbar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 flex items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                本文
              </span>
              <span className="text-xs font-medium text-slate-500">
                ({passage.wordCount} words)
              </span>
            </div>

            {/* Reading View Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* TTS Listen */}
              <button
                onClick={handleToggleAudio}
                title={isPlayingAudio ? '読み上げ停止' : '英語音声を聴く'}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 animate-pulse text-rose-600" />
                    <span className="text-[11px] hidden sm:inline">停止</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="text-[11px] hidden sm:inline">音声再生</span>
                  </>
                )}
              </button>

              {/* Font Size Toggle */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                <button
                  onClick={() => setFontSize('sm')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'sm' ? 'bg-white dark:bg-slate-700 shadow-2xs text-indigo-600' : ''}`}
                >
                  小
                </button>
                <button
                  onClick={() => setFontSize('base')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'base' ? 'bg-white dark:bg-slate-700 shadow-2xs text-indigo-600' : ''}`}
                >
                  中
                </button>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'lg' ? 'bg-white dark:bg-slate-700 shadow-2xs text-indigo-600' : ''}`}
                >
                  大
                </button>
              </div>

              {/* Paper Background Theme */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                <button
                  onClick={() => setPaperTheme('default')}
                  title="白地モード"
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${paperTheme === 'default' ? 'bg-white dark:bg-slate-700 shadow-2xs text-indigo-600' : ''}`}
                >
                  白
                </button>
                <button
                  onClick={() => setPaperTheme('sepia')}
                  title="セピア調モード"
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${paperTheme === 'sepia' ? 'bg-[#faf6ee] text-[#856404] shadow-2xs font-bold' : ''}`}
                >
                  茶
                </button>
                <button
                  onClick={() => setPaperTheme('dark')}
                  title="ダークモード"
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${paperTheme === 'dark' ? 'bg-slate-950 text-white shadow-2xs' : ''}`}
                >
                  黒
                </button>
              </div>
            </div>
          </div>

          {/* Reading Card */}
          <div
            className={`flex-1 rounded-2xl p-6 sm:p-8 border shadow-xs overflow-y-auto max-h-[calc(100vh-220px)] transition-colors ${themeClass}`}
          >
            <h2 className="text-xl sm:text-2xl font-black mb-4 tracking-tight leading-snug">
              {passage.title}
            </h2>

            <div className={`space-y-5 font-serif select-text ${fontSizeClass}`}>
              {passage.passage.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed tracking-normal text-justify">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right / Lower Column: 5 Questions (5択 5 options) (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* Question Nav Pills */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-2xs flex items-center justify-between gap-1">
            <span className="text-xs font-bold text-slate-500 pl-1">
              設問 (5択)
            </span>
            <div className="flex items-center gap-1.5">
              {passage.questions.map((q) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isActive = activeQuestionTab === q.id;

                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuestionTab(q.id)}
                    className={`w-8 h-8 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : isAnswered
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    問{q.id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex-1 flex flex-col justify-between space-y-6">
            {(() => {
              const currentQ =
                passage.questions.find((q) => q.id === activeQuestionTab) ||
                passage.questions[0];

              return (
                <div className="space-y-4">
                  {/* Question Header */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        問 {currentQ.id} / 5
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {currentQ.questionType}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {currentQ.question}
                    </h3>
                  </div>

                  {/* 5 Choices (A, B, C, D, E) */}
                  <div className="space-y-2.5 pt-1">
                    {currentQ.options.map((optionText, optIndex) => {
                      const isChosen = selectedAnswers[currentQ.id] === optIndex;
                      const labelLetter = alphabetLabels[optIndex];

                      return (
                        <button
                          key={optIndex}
                          type="button"
                          onClick={() => handleSelectOption(currentQ.id, optIndex)}
                          className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-start gap-3 cursor-pointer group ${
                            isChosen
                              ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-slate-900 dark:text-slate-100 shadow-2xs'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isChosen
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200'
                            }`}
                          >
                            {labelLetter}
                          </span>
                          <span className="text-xs sm:text-sm font-medium leading-relaxed flex-1">
                            {optionText}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Question Quick Pagination Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                disabled={activeQuestionTab === 1}
                onClick={() => setActiveQuestionTab((prev) => Math.max(1, prev - 1))}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 cursor-pointer"
              >
                前の問題
              </button>

              <span className="text-xs text-slate-400">
                問{activeQuestionTab} / 全5問
              </span>

              <button
                type="button"
                disabled={activeQuestionTab === 5}
                onClick={() => setActiveQuestionTab((prev) => Math.min(5, prev + 1))}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 cursor-pointer"
              >
                次の問題
              </button>
            </div>
          </div>

          {/* Error notice if unselected */}
          {validationError && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 font-medium flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Submit / Finish Button */}
          <button
            type="button"
            disabled={isAnalyzing}
            onClick={handleSubmit}
            className={`w-full py-4 px-6 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
              answeredCount === totalQuestions
                ? 'bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-600/25 active:scale-[0.99]'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>AIが答え合わせと弱点を分析中...</span>
              </>
            ) : (
              <>
                <span>採点して解説・弱点分析を見る</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

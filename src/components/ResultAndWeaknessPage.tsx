import React, { useState } from 'react';
import {
  PassageData,
  SessionResult,
  Difficulty,
  WeaknessAnalysis,
} from '../types';
import { DIFFICULTY_CONFIGS } from '../data/difficulties';
import {
  CheckCircle2,
  XCircle,
  Award,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

interface ResultAndWeaknessPageProps {
  result: SessionResult;
  onReturnToMyPage: () => void; // Navigates to Page 2 (難易度選択とマイページ画面)
  onLogoutToLogin?: () => void;
}

export const ResultAndWeaknessPage: React.FC<ResultAndWeaknessPageProps> = ({
  result,
  onReturnToMyPage,
  onLogoutToLogin,
}) => {
  const { passageData, score, totalQuestions, answers, weaknessAnalysis, timeSpentSeconds } = result;
  const config = DIFFICULTY_CONFIGS[passageData.difficulty];

  const [showTranslation, setShowTranslation] = useState(false);
  const [showVocab, setShowVocab] = useState(false);

  const alphabetLabels = ['A', 'B', 'C', 'D', 'E'];

  // Helper to render passage with key sentences highlighted in RED
  const renderHighlightedPassage = () => {
    const paragraphs = passageData.passage.split('\n\n');
    const keySentences = passageData.keySentences || [];

    return (
      <div className="space-y-4 font-serif text-slate-800 dark:text-slate-200 leading-relaxed text-base sm:text-lg">
        {paragraphs.map((paragraph, pIndex) => {
          // Check if any key sentence is inside this paragraph
          let renderedContent: React.ReactNode[] = [];
          let remainingText = paragraph;

          // Find matches
          const matches: { start: number; end: number; text: string }[] = [];
          keySentences.forEach((ks) => {
            if (!ks || ks.trim().length === 0) return;
            const idx = remainingText.indexOf(ks);
            if (idx !== -1) {
              matches.push({ start: idx, end: idx + ks.length, text: ks });
            }
          });

          // Sort matches by start index
          matches.sort((a, b) => a.start - b.start);

          if (matches.length === 0) {
            return (
              <p key={pIndex} className="text-justify">
                {paragraph}
              </p>
            );
          }

          let lastPos = 0;
          matches.forEach((m, mIdx) => {
            if (m.start > lastPos) {
              renderedContent.push(paragraph.substring(lastPos, m.start));
            }
            renderedContent.push(
              <mark
                key={`mark-${mIdx}`}
                className="bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-b-2 border-rose-500 font-semibold px-1 py-0.5 rounded transition-colors inline"
                title="キーセンテンス（設問の正解根拠）"
              >
                {m.text}
              </mark>
            );
            lastPos = m.end;
          });

          if (lastPos < paragraph.length) {
            renderedContent.push(paragraph.substring(lastPos));
          }

          return (
            <p key={pIndex} className="text-justify">
              {renderedContent}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col">
      {/* Header Bar */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 shadow-2xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onReturnToMyPage}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>難易度選択・マイページへ戻る</span>
            </button>

            <span className="font-black text-lg tracking-tight bg-linear-to-r from-indigo-600 to-sky-600 bg-clip-text text-transparent hidden sm:inline">
              ReadFlow
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">所要時間: {Math.round(timeSpentSeconds / 60)}分{timeSpentSeconds % 60}秒</span>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-10">
        {/* Score Banner Hero */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
              <span>{config.label} ({config.eikenGrade})</span>
              <span>·</span>
              <span>{passageData.wordCount}語</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {passageData.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {score === 5
                ? '完璧です！すべての設問に正確に解答できました。'
                : score >= 3
                ? '合格水準に達しています！間違えた設問の根拠を確認しましょう。'
                : '復習のチャンスです。キーセンテンスと解説から解法の着眼点を掴みましょう。'}
            </p>
          </div>

          {/* Big Score Dial */}
          <div className="shrink-0 flex items-center gap-4 bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700">
            <div className="text-center">
              <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">得点</span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                <span className={score >= 4 ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}>
                  {score}
                </span>
                <span className="text-slate-400 text-xl font-normal"> / {totalQuestions}</span>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-200 dark:bg-slate-700" />

            <div className="text-center">
              <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">正答率</span>
              <div className={`text-2xl sm:text-3xl font-black ${score >= 4 ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                {Math.round((score / totalQuestions) * 100)}%
              </div>
            </div>
          </div>
        </div>

        {/* 1. 上部：問題文とキーになる部分の赤字ハイライト (Prompt Requirement) */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Passage Review · Key Sentence Highlighting</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                英文と解答キーセンテンス（赤字ハイライト）
              </h2>
            </div>

            {/* Red highlight explanation indicator */}
            <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900 self-start sm:self-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block animate-pulse" />
              <span>赤色ハイライト = 設問の正解を導く最重要センテンス</span>
            </div>
          </div>

          {/* Render the passage with red highlight */}
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80">
            {renderHighlightedPassage()}
          </div>

          {/* Japanese Translation Accordion */}
          <div className="pt-2">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1.5 py-1 cursor-pointer"
            >
              <span>本文の全訳（日本語訳）を{showTranslation ? '閉じる' : '確認する'}</span>
              {showTranslation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showTranslation && (
              <div className="mt-3 p-4 sm:p-6 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 font-sans">
                {passageData.japaneseTranslation.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </div>

          {/* Vocabulary items review */}
          {passageData.vocabulary && passageData.vocabulary.length > 0 && (
            <div className="pt-2">
              <button
                onClick={() => setShowVocab(!showVocab)}
                className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1.5 py-1 cursor-pointer"
              >
                <span>重要語彙・イディオムリスト ({passageData.vocabulary.length}語) を{showVocab ? '閉じる' : '表示する'}</span>
                {showVocab ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showVocab && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {passageData.vocabulary.map((vocab, vIdx) => (
                    <div
                      key={vIdx}
                      className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    >
                      <div className="font-bold text-indigo-600 dark:text-indigo-400">
                        {vocab.word}
                        {vocab.partOfSpeech && (
                          <span className="text-[10px] text-slate-400 font-normal ml-1.5">
                            [{vocab.partOfSpeech}]
                          </span>
                        )}
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 mt-0.5">{vocab.meaning}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* 2. 各問にユーザーの答えと正答の答えを記し、解説を入れる (Prompt Requirement) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>各問の正誤判定・ユーザーの解答と解説</span>
            </h2>
            <span className="text-xs text-slate-500">全5問</span>
          </div>

          <div className="space-y-5">
            {passageData.questions.map((question) => {
              const userAnsRecord = answers.find((a) => a.questionId === question.id);
              const userSelectedIdx = userAnsRecord?.selectedOption ?? -1;
              const isCorrect = userSelectedIdx === question.correctAnswer;

              const userSelectedText =
                userSelectedIdx >= 0
                  ? `${alphabetLabels[userSelectedIdx]}. ${question.options[userSelectedIdx]}`
                  : '未解答';

              const correctText = `${alphabetLabels[question.correctAnswer]}. ${question.options[question.correctAnswer]}`;

              return (
                <div
                  key={question.id}
                  className={`bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border-2 shadow-xs transition-all ${
                    isCorrect
                      ? 'border-emerald-200 dark:border-emerald-900/60'
                      : 'border-rose-200 dark:border-rose-900/60'
                  }`}
                >
                  {/* Question Header & Status */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        問 {question.id}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {question.questionType}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold ${
                        isCorrect
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>正解</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>不正解</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 leading-snug">
                    {question.question}
                  </h3>

                  {/* Comparison: User's Answer vs Correct Answer */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs">
                    {/* User's Answer */}
                    <div className="space-y-1">
                      <span className="font-bold text-slate-500 uppercase tracking-wider block">
                        あなたの解答
                      </span>
                      <div
                        className={`font-semibold p-2.5 rounded-xl border ${
                          isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                            : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                        }`}
                      >
                        {userSelectedText}
                      </div>
                    </div>

                    {/* Correct Answer */}
                    <div className="space-y-1">
                      <span className="font-bold text-slate-500 uppercase tracking-wider block">
                        正答（正解）
                      </span>
                      <div className="font-semibold p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {correctText}
                      </div>
                    </div>
                  </div>

                  {/* Explanation (解説) */}
                  <div className="space-y-2 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>解説</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {question.explanation}
                    </p>
                    {question.keyReferencePhrase && (
                      <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <strong className="text-rose-600 dark:text-rose-400">本文根拠フレーズ:</strong> 「{question.keyReferencePhrase}」
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. 各問の間違い傾向からあなたの弱点を作成し、記入する (Prompt Requirement) */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                AI Weakness Diagnosis
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                間違い傾向から分析したあなたの弱点
              </h2>
            </div>
          </div>

          {/* Weakness Summary */}
          <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-indigo-50/70 to-sky-50/70 dark:from-indigo-950/40 dark:to-sky-950/40 border border-indigo-100 dark:border-indigo-900/50">
            <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
              {weaknessAnalysis.summary}
            </p>
            {weaknessAnalysis.speedAndAccuracyComment && (
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 font-semibold">
                読解ペース評価: {weaknessAnalysis.speedAndAccuracyComment}
              </p>
            )}
          </div>

          {/* Weak points cards */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>検出された弱点・要注意ポイント</span>
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {weaknessAnalysis.weakPoints.map((wp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                      {wp.category}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {wp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Actionable Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Strengths */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 space-y-2">
              <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>強み・評価できる点</span>
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {weaknessAnalysis.strengths.map((str, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actionable Tips */}
            <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 space-y-2">
              <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <span>次回に向けた具体的アクション</span>
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {weaknessAnalysis.actionableTips.map((tip, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">▶</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 一番下のボタン：2ページ目の難易度選択とマイページ画面に戻る */}
        <div className="pt-4 pb-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onReturnToMyPage}
            className="w-full sm:w-auto min-w-[320px] py-4 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
          >
            <RotateCcw className="w-5 h-5" />
            <span>難易度選択・マイページに戻る</span>
          </button>

          {onLogoutToLogin && (
            <button
              type="button"
              onClick={onLogoutToLogin}
              className="w-full sm:w-auto py-3 px-5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>ログアウト（ログイン画面へ）</span>
            </button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-4 px-6 text-center text-xs text-slate-400 bg-white dark:bg-slate-900">
        <p>ReadFlow · 英語長文読解マスター · Page 4: 答え合わせ・解説・弱点分析</p>
      </footer>
    </div>
  );
};

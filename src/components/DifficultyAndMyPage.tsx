import React, { useState } from 'react';
import {
  Difficulty,
  UserProfile,
  SessionResult,
} from '../types';
import { DIFFICULTY_CONFIGS } from '../data/difficulties';
import { AccuracyChart } from './AccuracyChart';
import {
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  LogOut,
  CheckCircle,
  FileText,
  AlertCircle,
  Calendar,
  Flame,
} from 'lucide-react';

interface DifficultyAndMyPageProps {
  user: UserProfile;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onLogout: () => void;
  onReviewResult: (result: SessionResult) => void;
  isGenerating: boolean;
}

export const DifficultyAndMyPage: React.FC<DifficultyAndMyPageProps> = ({
  user,
  onSelectDifficulty,
  onLogout,
  onReviewResult,
  isGenerating,
}) => {
  const [selectedDiff, setSelectedDiff] = useState<Difficulty>('normal');

  // Overall Statistics calculations
  const totalTests = user.results.length;
  const totalQuestions = user.results.reduce((sum, r) => sum + r.totalQuestions, 0);
  const totalCorrect = user.results.reduce((sum, r) => sum + r.score, 0);
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const estimatedWordsRead = user.results.reduce((sum, r) => {
    const config = DIFFICULTY_CONFIGS[r.difficulty];
    return sum + (r.passageData?.wordCount || config.wordCountMin);
  }, 0);

  // Difficulty breakdown counts
  const countByDiff = {
    easy: user.results.filter(r => r.difficulty === 'easy').length,
    normal: user.results.filter(r => r.difficulty === 'normal').length,
    hard: user.results.filter(r => r.difficulty === 'hard').length,
    master: user.results.filter(r => r.difficulty === 'master').length,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col">
      {/* Top App Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                ReadFlow
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                難易度選択 & マイページ
              </span>
            </div>
          </div>

          {/* User Profile Pill & Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-[11px] flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium max-w-[120px] truncate text-slate-700 dark:text-slate-300">
                {user.name}
              </span>
            </div>

            <button
              onClick={onLogout}
              title="ログアウトして1ページ目へ"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-10">
        {/* Section 1: 難易度選択 (Difficulty Selection - 4 Levels) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Page 2 · Difficulty Selection</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                演習の難易度を選択してください
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                AIがあなたの選択に合わせて毎回新しい英文と5択問題を自動生成します。
              </p>
            </div>

            <div className="text-xs text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg self-start sm:self-auto">
              全難易度: <strong>5問・5択問題</strong> 構成
            </div>
          </div>

          {/* 4 Difficulty Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {(['easy', 'normal', 'hard', 'master'] as Difficulty[]).map((diffKey) => {
              const config = DIFFICULTY_CONFIGS[diffKey];
              const isSelected = selectedDiff === diffKey;

              return (
                <div
                  key={diffKey}
                  onClick={() => setSelectedDiff(diffKey)}
                  className={`relative rounded-2xl p-5 border-2 transition-all duration-200 flex flex-col justify-between cursor-pointer group ${
                    isSelected
                      ? 'border-indigo-600 dark:border-indigo-500 bg-white dark:bg-slate-900 shadow-lg shadow-indigo-500/10 scale-[1.02]'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs'
                  }`}
                >
                  {/* Top Badge & Grade */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${config.accentBg} ${config.accentText} border ${config.accentBorder}`}>
                        {config.eikenGrade}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{config.label}</span>
                      <span className="text-xs font-medium text-slate-400">
                        {countByDiff[diffKey]}回実施
                      </span>
                    </h3>

                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      語数: {config.wordCountTarget}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                      {config.description}
                    </p>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400">
                      5問 / 5択問題
                    </span>
                    <button
                      type="button"
                      disabled={isGenerating}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDiff(diffKey);
                        onSelectDifficulty(diffKey);
                      }}
                      className={`text-xs font-bold py-1.5 px-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950 group-hover:text-indigo-600'
                      }`}
                    >
                      {isGenerating && isSelected ? (
                        <span>AI生成中...</span>
                      ) : (
                        <>
                          <span>この難易度で開始</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Primary Big Start Button */}
          <div className="pt-2 flex justify-center">
            <button
              disabled={isGenerating}
              onClick={() => onSelectDifficulty(selectedDiff)}
              className="w-full sm:w-auto min-w-[280px] py-3.5 px-8 rounded-2xl bg-linear-to-r from-indigo-600 via-indigo-700 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-extrabold text-base shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-3 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>AIが長文と5つの設問を作成中...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>
                    【{DIFFICULTY_CONFIGS[selectedDiff].label} ({DIFFICULTY_CONFIGS[selectedDiff].wordCountTarget})】で演習をスタート
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-slate-200 dark:border-slate-800" />

        {/* Section 2: マイページ画面 (My Page & Historical Stats) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                <Award className="w-3.5 h-3.5 text-indigo-500" />
                <span>My Page · Performance & Analytics</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                マイページ & 成績管理
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                アカウント「{user.email}」に保存された学習履歴・難易度別の推移
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>学習継続ストリーク: 安定記録中</span>
            </div>
          </div>

          {/* Quick Metrics 4 Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold">累計演習回数</span>
                <FileText className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {totalTests} <span className="text-xs font-normal text-slate-500">回</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">5問1セットの長文演習</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold">総合正答率</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {overallAccuracy}%
              </div>
              <p className="text-[11px] text-slate-400 mt-1">正解 {totalCorrect} / {totalQuestions}問</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold">読了総語数</span>
                <BookOpen className="w-4 h-4 text-sky-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {estimatedWordsRead.toLocaleString()} <span className="text-xs font-normal text-slate-500">語</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">英文リーディング総量</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold">平均解答時間</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {user.results.length > 0
                  ? Math.round(
                      user.results.reduce((s, r) => s + r.timeSpentSeconds, 0) /
                        user.results.length /
                        60
                    )
                  : 5} <span className="text-xs font-normal text-slate-500">分/セット</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">丁寧かつ確実な読解</p>
            </div>
          </div>

          {/* Past 10 Accuracy Rate Graph (as required by prompt) */}
          <AccuracyChart results={user.results} />

          {/* Recent History Table & Review */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>直近の演習履歴</span>
              </h3>
              <span className="text-xs text-slate-400">
                最新{Math.min(user.results.length, 5)}件を表示
              </span>
            </div>

            {user.results.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center">
                まだ演習履歴がありません。上の難易度を選んで演習をスタートしましょう！
              </p>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {user.results
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((res) => {
                    const cfg = DIFFICULTY_CONFIGS[res.difficulty];
                    return (
                      <div
                        key={res.id}
                        className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 px-2 rounded-xl transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${cfg.accentBg} ${cfg.accentText} border ${cfg.accentBorder}`}>
                              {cfg.label}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                              {res.passageTitle}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-400 flex items-center gap-2">
                            <span>{res.dateStr}</span>
                            <span>·</span>
                            <span>所要時間: {Math.round(res.timeSpentSeconds / 60)}分</span>
                            <span>·</span>
                            <span>{res.answers.filter(a => a.isCorrect).length} / 5問正解</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <span className={`text-sm font-extrabold ${res.score >= 4 ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                            {res.accuracyRate}%
                          </span>
                          <button
                            onClick={() => onReviewResult(res)}
                            className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            解説・弱点を見る
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-4 px-6 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 mt-10">
        <p>ReadFlow · 英語長文読解マスター · Page 2: 難易度選択 & マイページ</p>
      </footer>
    </div>
  );
};

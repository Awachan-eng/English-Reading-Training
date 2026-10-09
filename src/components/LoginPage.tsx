import React, { useState } from 'react';
import { BookOpen, Sparkles, CheckCircle2, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginPageProps {
  onLogin: (email: string, name?: string, provider?: 'google' | 'email') => Promise<void>;
  currentProfile: UserProfile | null;
  isLoading: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, currentProfile, isLoading }) => {
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [loginMode, setLoginMode] = useState<'options' | 'email'>('options');
  const [errorMsg, setErrorMsg] = useState('');

  // Default suggested Google email from environment or common test
  const suggestedGoogleEmail = 'i.haruto0112@gmail.com';

  const handleGoogleLogin = async (targetEmail: string = suggestedGoogleEmail) => {
    setErrorMsg('');
    try {
      const name = targetEmail.split('@')[0];
      await onLogin(targetEmail, name, 'google');
    } catch (err: any) {
      setErrorMsg('ログインに失敗しました。もう一度お試しください。');
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setErrorMsg('メールアドレスを入力してください。');
      return;
    }
    if (!emailInput.includes('@') || !emailInput.includes('.')) {
      setErrorMsg('有効なメールアドレス形式を入力してください。');
      return;
    }
    setErrorMsg('');
    const name = nameInput.trim() || emailInput.split('@')[0];
    await onLogin(emailInput.trim().toLowerCase(), name, 'email');
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50/60 via-white to-sky-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col justify-between text-slate-800 dark:text-slate-100">
      {/* Top Banner / Header */}
      <header className="border-b border-indigo-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-linear-to-r from-indigo-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-sky-300">
                ReadFlow
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                英語長文読解マスター
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>AI問題自動生成 · 成績同期対応</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14">
        {/* Left Hero Content */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-800 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>最新AIが毎回新しい長文と5択問題を自動生成</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.2]">
            読むたびに強くなる、
            <br />
            <span className="bg-linear-to-r from-indigo-600 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
              新感覚の英語長文読解。
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
            準2級・2級・準1級・1級の3〜4段階に対応。解いた直後に
            <strong className="text-rose-600 dark:text-rose-400 font-bold">根拠センテンスを赤字ハイライト</strong>
            し、あなたの間違い傾向からAIが弱点を即座に分析します。
          </p>

          {/* Value Props Bullet points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-lg mx-auto lg:mx-0 text-left">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">厳選された語数規定</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Easy 300〜350語 / Normal 350〜400語 / Hard 450〜500語</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">5択・5問の本番形式</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">要旨・因果関係・推論など多角的な設問構成</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">解答根拠の赤字表示</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">本文中のキーセンテンスが一目瞭然で復習が加速</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">過去10回の推移グラフ</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">難易度ごとの正答率推移をマイページで可視化</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Login Card */}
        <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-500/5 relative">
          <div className="mb-6 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Page 1 · Authentication
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              ログイン・アカウント連携
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              同じアカウントでログインすると、今までの学習履歴やグラフ情報が共有されます。
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 dark:text-rose-400 font-medium">
              {errorMsg}
            </div>
          )}

          {loginMode === 'options' ? (
            <div className="space-y-4">
              {/* Quick 1-Click Google Sign-in */}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleGoogleLogin(suggestedGoogleEmail)}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all shadow-2xs active:scale-[0.99] cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Googleでログイン ({suggestedGoogleEmail})</span>
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-medium">
                    または
                  </span>
                </div>
              </div>

              {/* Email Login Switch */}
              <button
                type="button"
                onClick={() => setLoginMode('email')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
              >
                <span>メールアドレスでログイン</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  メールアドレス <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  お名前・ニックネーム (任意)
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="例: Haruto"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setLoginMode('options')}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  戻る
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? 'ログイン中...' : 'ログインしてマイページへ'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Current profile quick resume if previously logged in */}
          {currentProfile && (
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {currentProfile.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {currentProfile.name}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{currentProfile.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => onLogin(currentProfile.email, currentProfile.name, currentProfile.provider)}
                  className="shrink-0 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer ml-2"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  再開する
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 dark:border-slate-800/80 py-4 px-6 text-center text-xs text-slate-400">
        <p>ReadFlow · 英語長文読解マスター · 全ての演習データはアカウントに自動同期されます</p>
      </footer>
    </div>
  );
};

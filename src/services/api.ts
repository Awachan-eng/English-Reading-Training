import { Difficulty, PassageData, SessionResult, UserProfile, WeaknessAnalysis } from '../types';
import { FALLBACK_PASSAGES } from '../data/fallbackPassages';

const STORAGE_KEY_USER = 'readflow_current_user_email';

function createBlankProfile(email: string, name?: string, provider: 'google' | 'email' = 'email'): UserProfile {
  const normalized = email.toLowerCase().trim();
  return {
    email: normalized,
    name: name || normalized.split('@')[0],
    provider: provider || (normalized.includes('@gmail.com') ? 'google' : 'email'),
    createdAt: Date.now(),
    lastLogin: Date.now(),
    totalTestsTaken: 0,
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    results: [],
  };
}

export async function getUserProfile(email: string): Promise<UserProfile> {
  const normalizedEmail = email.toLowerCase().trim();
  localStorage.setItem(STORAGE_KEY_USER, normalizedEmail);

  // 1. Check local storage first
  let localUser: UserProfile | null = null;
  const localRaw = localStorage.getItem(`readflow_user_${normalizedEmail}`);
  if (localRaw) {
    try {
      localUser = JSON.parse(localRaw);
    } catch (e) {
      console.warn('Failed to parse local user profile:', e);
    }
  }

  // 2. Fetch from server
  try {
    const res = await fetch(`/api/user/${encodeURIComponent(normalizedEmail)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.user) {
        const serverUser: UserProfile = data.user;

        // If local user has results, merge with server to guarantee no loss
        if (localUser && Array.isArray(localUser.results)) {
          const mergedResults: SessionResult[] = [...serverUser.results];
          for (const localRes of localUser.results) {
            if (!mergedResults.some((r) => r.id === localRes.id)) {
              mergedResults.push(localRes);
            }
          }
          // Sort chronologically
          mergedResults.sort((a, b) => a.timestamp - b.timestamp);
          serverUser.results = mergedResults;
          serverUser.totalTestsTaken = mergedResults.length;
          serverUser.totalQuestionsAnswered = mergedResults.reduce((s, r) => s + (r.totalQuestions || 5), 0);
          serverUser.totalCorrect = mergedResults.reduce((s, r) => s + (r.score || 0), 0);

          // Update server with merged results
          fetch('/api/user/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: normalizedEmail, profileData: serverUser }),
          }).catch(console.warn);
        }

        localStorage.setItem(`readflow_user_${normalizedEmail}`, JSON.stringify(serverUser));
        return serverUser;
      }
    }
  } catch (err) {
    console.warn('Server get user failed, relying on local storage:', err);
  }

  // If server was unreachable, use local or create new
  if (!localUser) {
    localUser = createBlankProfile(normalizedEmail);
  }
  localStorage.setItem(`readflow_user_${normalizedEmail}`, JSON.stringify(localUser));
  return localUser;
}

export async function saveSessionResult(
  email: string,
  result: SessionResult,
  profileData?: Partial<UserProfile>
): Promise<UserProfile> {
  const normalizedEmail = email.toLowerCase().trim();

  // 1. Load current local profile
  let profile: UserProfile;
  const localRaw = localStorage.getItem(`readflow_user_${normalizedEmail}`);
  if (localRaw) {
    try {
      profile = JSON.parse(localRaw);
    } catch {
      profile = createBlankProfile(normalizedEmail);
    }
  } else {
    profile = createBlankProfile(normalizedEmail);
  }

  // 2. Append result (prevent duplicates)
  const existingIndex = profile.results.findIndex((r) => r.id === result.id);
  if (existingIndex >= 0) {
    profile.results[existingIndex] = result;
  } else {
    profile.results.push(result);
  }

  // Recalculate totals
  profile.results.sort((a, b) => a.timestamp - b.timestamp);
  profile.totalTestsTaken = profile.results.length;
  profile.totalQuestionsAnswered = profile.results.reduce((s, r) => s + (r.totalQuestions || 5), 0);
  profile.totalCorrect = profile.results.reduce((s, r) => s + (r.score || 0), 0);
  profile.lastLogin = Date.now();
  if (profileData?.name) profile.name = profileData.name;
  if (profileData?.provider) profile.provider = profileData.provider;

  // 3. Immediately persist locally
  localStorage.setItem(`readflow_user_${normalizedEmail}`, JSON.stringify(profile));
  localStorage.setItem(STORAGE_KEY_USER, normalizedEmail);

  // 4. Sync to server in background
  try {
    const res = await fetch('/api/user/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normalizedEmail, result, profileData: profile }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.user) {
        localStorage.setItem(`readflow_user_${normalizedEmail}`, JSON.stringify(data.user));
        return data.user;
      }
    }
  } catch (err) {
    console.warn('Backend sync failed, local state safely retained:', err);
  }

  return profile;
}

export async function clearUserHistory(email: string): Promise<UserProfile> {
  const normalizedEmail = email.toLowerCase().trim();
  const blank = createBlankProfile(normalizedEmail);
  localStorage.setItem(`readflow_user_${normalizedEmail}`, JSON.stringify(blank));

  try {
    await fetch('/api/user/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normalizedEmail, profileData: blank }),
    });
  } catch (e) {
    console.warn('Failed to clear server history:', e);
  }

  return blank;
}

export async function requestGeneratePassage(difficulty: Difficulty): Promise<PassageData> {
  try {
    const res = await fetch('/api/generate-passage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ difficulty }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.passage) {
        return data.passage;
      }
    }
  } catch (err) {
    console.warn('AI passage generation failed, falling back to curated bank:', err);
  }

  // Use curated authentic bank for the specified difficulty
  const list = FALLBACK_PASSAGES[difficulty] || FALLBACK_PASSAGES.normal;
  const selected = list[Math.floor(Math.random() * list.length)];
  return {
    ...selected,
    id: `${selected.id}-${Date.now()}`,
  };
}

export async function requestWeaknessAnalysis(
  passageTitle: string,
  difficulty: Difficulty,
  answers: any[],
  timeSpentSeconds: number,
  score: number
): Promise<WeaknessAnalysis> {
  try {
    const res = await fetch('/api/analyze-weakness', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        passageTitle,
        difficulty,
        answers,
        timeSpentSeconds,
        score,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.analysis) {
        return data.analysis;
      }
    }
  } catch (err) {
    console.warn('AI weakness analysis failed, falling back:', err);
  }

  // Local rule-based fallback
  const incorrectAnswers = (answers || []).filter((a: any) => !a.isCorrect);
  const weakPoints: WeaknessAnalysis['weakPoints'] = incorrectAnswers.map((ia: any) => ({
    category: ia.questionType || '設問照合',
    description: `問${ia.questionId}（${ia.questionType || '設問'}）で誤答しました。本文中のキーワードと選択肢のパラフレーズ（言い換え）を慎重に突き合わせましょう。`,
    severity: 'medium',
  }));

  if (weakPoints.length === 0) {
    weakPoints.push({
      category: '速読と高度な論理把握',
      description: '全問正解です！この調子でよりスピーディーに解くトレーニングを積みましょう。',
      severity: 'low',
    });
  }

  return {
    summary: score >= 4
      ? `5問中${score}問正解！高い読解力と安定した推論力を示しています。`
      : `5問中${score}問正解です。解答根拠となった赤字ハイライト箇所を読み直すことで、正答率がさらに向上します。`,
    weakPoints,
    strengths: [
      '英文全体の主旨を捉える基礎的な語彙力と読解スピードが備わっています。',
      score >= 3 ? '標準的な設問に対する照合精度が安定しています。' : '集中して最後まで読解を継続できました。',
    ],
    actionableTips: [
      '設問のリード文を先に確認してから本文に入る「設問先読み」を習慣づけましょう。',
      '「However」「In contrast」「Therefore」などの論理展開マーカーに印をつけながら読むと要旨を見失いません。',
      '間違えた選択肢がなぜ不適切か（言及なし、極端な誇張、因果逆転など）を言語化する練習を行いましょう。',
    ],
    recommendedDifficulty: difficulty,
    speedAndAccuracyComment: timeSpentSeconds < 300 ? '解答スピード：良好' : '解答スピード：標準的（見直し重視）',
  };
}

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for loading/saving users
interface StoredUsers {
  [email: string]: any;
}

function loadUsers(): StoredUsers {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read users file:', err);
  }
  return {};
}

function saveUsers(users: StoredUsers) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save users file:', err);
  }
}

// Generate realistic seed history for new accounts so Page 2 chart looks alive
function createInitialSeedHistory(email: string) {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const difficulties = ['easy', 'easy', 'normal', 'easy', 'normal', 'normal', 'hard', 'normal', 'hard', 'hard'];
  const titles = [
    'Urban Greening and Microclimates',
    'The Evolution of School Lunches',
    'Ocean Chemistry and Marine Life',
    'Solar Energy in Everyday Gadgets',
    'The Psychology of Habit Formation',
    'Bioluminescence in Deep Waters',
    'Cognitive Bias and Decision Making',
    'Archaeological Secrets of Ancient Trade',
    'Artificial Intelligence and Ethics',
    'Linguistic Relativity in Modern Media'
  ];
  const scores = [4, 5, 3, 4, 4, 3, 4, 4, 5, 4]; // realistic performance

  return difficulties.map((diff, index) => {
    const daysAgo = 10 - index;
    const testDate = new Date(now - daysAgo * day);
    const score = scores[index];
    return {
      id: `seed-${index + 1}`,
      timestamp: testDate.getTime(),
      dateStr: `${testDate.getMonth() + 1}/${testDate.getDate()}`,
      difficulty: diff,
      passageTitle: titles[index],
      score: score,
      totalQuestions: 5,
      accuracyRate: Math.round((score / 5) * 100),
      timeSpentSeconds: 240 + Math.floor(Math.random() * 180),
      answers: [
        { questionId: 1, selectedOption: 1, isCorrect: true, questionType: '詳細一致' },
        { questionId: 2, selectedOption: 2, isCorrect: true, questionType: '理由・因果関係' },
        { questionId: 3, selectedOption: score >= 3 ? 1 : 0, isCorrect: score >= 3, questionType: '要旨把握' },
        { questionId: 4, selectedOption: score >= 4 ? 2 : 1, isCorrect: score >= 4, questionType: '文脈・語彙推論' },
        { questionId: 5, selectedOption: score >= 5 ? 3 : 2, isCorrect: score >= 5, questionType: '筆者の主張' },
      ],
      weaknessAnalysis: {
        summary: score >= 4 ? '全体的に高水準の理解力と速読力を維持できています。' : '論理展開の把握とパラフレーズ（言い換え）の追跡に改善の余地があります。',
        weakPoints: [
          { category: '要旨・論旨展開', description: '逆接（However/Nonetheless）以降の主題転換に対する注意力を強化しましょう。', severity: 'medium' }
        ],
        strengths: ['基礎的な事実関係の照合スピードが安定しています。'],
        actionableTips: ['段落ごとのトピックセンテンスに目を通してから本文詳細を読むアプローチを継続しましょう。'],
        recommendedDifficulty: diff,
        speedAndAccuracyComment: '標準的な解答ペースを維持できています。'
      }
    };
  });
}

// API: Get or create user profile
app.get('/api/user/:email', (req, res) => {
  const email = decodeURIComponent(req.params.email).toLowerCase().trim();
  const users = loadUsers();

  if (!users[email]) {
    users[email] = {
      email,
      name: email.split('@')[0],
      provider: email.includes('@gmail.com') ? 'google' : 'email',
      createdAt: Date.now(),
      lastLogin: Date.now(),
      totalTestsTaken: 0,
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
      results: [],
    };
    saveUsers(users);
  } else {
    users[email].lastLogin = Date.now();
    saveUsers(users);
  }

  res.json({ success: true, user: users[email] });
});

// API: Sync user results
app.post('/api/user/sync', (req, res) => {
  const { email, result, profileData } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const normalizedEmail = email.toLowerCase();
  const users = loadUsers();

  let user = users[normalizedEmail];
  if (!user) {
    user = {
      email: normalizedEmail,
      name: profileData?.name || normalizedEmail.split('@')[0],
      provider: profileData?.provider || (normalizedEmail.includes('@gmail.com') ? 'google' : 'email'),
      createdAt: Date.now(),
      lastLogin: Date.now(),
      totalTestsTaken: 0,
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
      results: [],
    };
  }

  user.lastLogin = Date.now();
  if (profileData?.name) user.name = profileData.name;
  if (profileData?.avatarUrl) user.avatarUrl = profileData.avatarUrl;

  if (result) {
    // Prevent duplicate entries
    const exists = user.results.some((r: any) => r.id === result.id);
    if (!exists) {
      user.results.push(result);
      user.totalTestsTaken += 1;
      user.totalQuestionsAnswered += (result.totalQuestions || 5);
      user.totalCorrect += (result.score || 0);
    }
  }

  users[normalizedEmail] = user;
  saveUsers(users);

  res.json({ success: true, user });
});

// API: Generate Passage with Gemini AI
app.post('/api/generate-passage', async (req, res) => {
  const { difficulty } = req.body;
  const diff = difficulty || 'normal';

  // Determine criteria according to prompt
  let wordCountDesc = '350 to 400 words';
  let eikenDesc = 'Eiken Grade 2 (高校卒業〜大学入試共通テスト標準レベル)';
  if (diff === 'easy') {
    wordCountDesc = '300 to 350 words';
    eikenDesc = 'Eiken Grade Pre-2 (高校初級・準2級レベル、身近で具体的なトピック)';
  } else if (diff === 'hard') {
    wordCountDesc = '450 to 500 words';
    eikenDesc = 'Eiken Grade Pre-1 (大学中上級・準1級レベル、学術的・論理的なトピック)';
  } else if (diff === 'master') {
    wordCountDesc = '500 to 550 words';
    eikenDesc = 'Eiken Grade 1 (最難関・1級レベル、高度な抽象思考・哲学・科学論説)';
  }

  const prompt = `
You are an expert English language examiner and educator.
Create a brand-new, original, engaging English reading comprehension exercise suitable for Japanese English learners.

Difficulty Level: ${diff.toUpperCase()}
Criteria:
- Difficulty Target: ${eikenDesc}
- Exact Word Count Range: ${wordCountDesc}. Ensure the passage length strictly adheres to this word count.
- Format: A well-structured multi-paragraph essay/article (3 to 5 paragraphs).
- Questions: Exactly 5 multiple-choice questions.
  - Each question MUST have exactly 5 options (A, B, C, D, E).
  - Only 1 option must be the correct answer.
  - The correct answer index must be 0, 1, 2, 3, or 4 (corresponding to 0=A, 1=B, 2=C, 3=D, 4=E). Randomize which index is correct across questions!
  - Each question must include a detailed, polite, and educational Japanese explanation (解説).
  - Include the question type: "要旨把握", "理由・因果関係", "詳細一致", "文脈・語彙推論", or "筆者の主張".
- Key Sentences: Identify 3 to 5 crucial sentences from the passage that directly contain the clues to answer the questions. The text of each key sentence MUST be an EXACT verbatim substring from the passage so they can be highlighted in red in the UI!
- Japanese Translation: Provide a natural, paragraph-by-paragraph Japanese translation of the entire passage.
- Vocabulary: List 4 to 6 key vocabulary words from the passage with their Japanese meanings.

Return STRICTLY a JSON object with this exact structure (no markdown fences, just JSON):
{
  "title": "Passage Title in English",
  "difficulty": "${diff}",
  "topic": "Specific Topic Name",
  "wordCount": 365,
  "passage": "Paragraph 1...\\n\\nParagraph 2...\\n\\nParagraph 3...",
  "keySentences": [
    "Exact verbatim sentence 1 from the passage.",
    "Exact verbatim sentence 2 from the passage."
  ],
  "japaneseTranslation": "第1段落の全訳...\\n\\n第2段落の全訳...",
  "vocabulary": [
    { "word": "example", "meaning": "例、見本", "partOfSpeech": "名詞" }
  ],
  "questions": [
    {
      "id": 1,
      "question": "Clear English question?",
      "options": [
        "Option A text",
        "Option B text",
        "Option C text",
        "Option D text",
        "Option E text"
      ],
      "correctAnswer": 0,
      "explanation": "日本語による親切で論理的な解説。正解の根拠と誤答の理由を明記。",
      "questionType": "詳細一致",
      "keyReferencePhrase": "Short key phrase in passage"
    }
  ]
}
`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured on server');
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text?.trim() || '';
    const parsed = JSON.parse(jsonText);

    if (parsed.passage && parsed.questions && parsed.questions.length === 5) {
      // Calculate actual word count
      const words = parsed.passage.trim().split(/\s+/).filter(Boolean);
      parsed.wordCount = words.length;
      parsed.id = `ai-${diff}-${Date.now()}`;
      return res.json({ success: true, passage: parsed });
    } else {
      throw new Error('Invalid structure returned from Gemini');
    }
  } catch (err: any) {
    console.warn('Gemini generation failed or fallback needed:', err.message);
    // Return a fallback passage from our curated repository
    return res.json({
      success: false,
      isFallback: true,
      error: err.message,
    });
  }
});

// API: AI-powered Weakness Analysis
app.post('/api/analyze-weakness', async (req, res) => {
  const { passageTitle, difficulty, answers, timeSpentSeconds, score } = req.body;

  const prompt = `
You are an elite English comprehension tutor and educational psychologist in Japan.
A student just completed an English reading test. Analyze their mistakes and generate a constructive, encouraging, and deeply insightful weakness analysis (弱点分析) in Japanese.

Test Details:
- Passage Title: ${passageTitle}
- Difficulty: ${difficulty}
- Score: ${score} / 5
- Time Spent: ${Math.round(timeSpentSeconds / 60)} minutes (${timeSpentSeconds} seconds)
- Questions & Student Answers:
${JSON.stringify(answers, null, 2)}

Provide a structured JSON output with:
1. summary: A warm, concise 2-sentence evaluation of their performance and reading speed.
2. weakPoints: Array of objects [{ category: string, description: string, severity: "high"|"medium"|"low" }] detailing why they fell for distractors (e.g. 否定表現の読み落とし, 語彙の誤認, パラフレーズの不一致, 接続詞の展開見落とし).
3. strengths: Array of 1-2 positive observations.
4. actionableTips: Array of 2-3 concrete, actionable training tips (e.g. スラッシュリーディング, 設問のキーワード先行チェック, 逆接マーカーのマーク法).
5. recommendedDifficulty: "${difficulty}" or adjustment.
6. speedAndAccuracyComment: Comment on their pacing.

Return STRICT JSON:
{
  "summary": "...",
  "weakPoints": [
    { "category": "...", "description": "...", "severity": "medium" }
  ],
  "strengths": ["..."],
  "actionableTips": ["..."],
  "recommendedDifficulty": "${difficulty}",
  "speedAndAccuracyComment": "..."
}
`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text?.trim() || '';
    const parsed = JSON.parse(jsonText);
    return res.json({ success: true, analysis: parsed });
  } catch (err: any) {
    // Construct rule-based intelligent fallback analysis
    const incorrectAnswers = (answers || []).filter((a: any) => !a.isCorrect);
    const weakCategories: any[] = [];

    if (incorrectAnswers.length === 0) {
      weakCategories.push({
        category: '更なる速読力の養成',
        description: '全問正解です！次は解答時間を30秒〜1分短縮するタイムアタックに挑戦してみましょう。',
        severity: 'low',
      });
    } else {
      incorrectAnswers.forEach((ia: any) => {
        const type = ia.questionType || '設問照合';
        weakCategories.push({
          category: type,
          description: `問${ia.questionId}（${type}）で誤答が発生しました。選択肢の言い換え表現（パラフレーズ）と本文の根拠箇所の厳密な対応関係を再確認しましょう。`,
          severity: 'medium',
        });
      });
    }

    const fallbackAnalysis = {
      summary: score >= 4
        ? `5問中${score}問正解！非常に高い読解精度を発揮できています。細部のニュアンスをより正確に捉えることで満点を目指せます。`
        : `5問中${score}問正解です。間違えた問題の解説と本文の赤字ハイライト箇所を照合し、根拠の捉え方を掴みましょう。`,
      weakPoints: weakCategories,
      strengths: [
        '本文全体の概要を一定時間内で把握する基礎的な読解力が身についています。',
        score >= 3 ? '標準的な設問における正答率が安定しています。' : '最後まで集中して解答を完走できました。'
      ],
      actionableTips: [
        '設問文を先に読んで「何を問われているか（Who/Why/What）」を把握してから本文を読み始めると精度が格段に上がります。',
        'However, Although, Consequently などの論理マーカーに注意し、筆者の主張が展開されるポイントを意識しましょう。',
        '知らなかった単語は単語帳機能や解説でチェックし、文脈の中での意味を定着させましょう。'
      ],
      recommendedDifficulty: difficulty,
      speedAndAccuracyComment: timeSpentSeconds < 300 ? '良好な読解スピードです。' : 'じっくり丁寧に読解できています。少しずつスピードアップを意識しましょう。',
    };

    return res.json({ success: true, analysis: fallbackAnalysis });
  }
});

// Setup Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
      root: process.cwd(),
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();

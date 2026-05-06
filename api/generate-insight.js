import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Vercel環境変数からAPIキーを取得
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key is missing in production environment' });
    }

    const { history } = req.body;
    if (!history || !Array.isArray(history)) {
      return res.status(400).json({ error: 'Invalid history data' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    const emotionLabels = {
      happy: '「幸せ」', calm: '「落ち着き」', sad: '「悲しい」', anxious: '「不安」', peaceful: '「平穏」'
    };

    const historyText = history.slice(0, 7).map(h => 
      `日付: ${h.date}, 気分スコア: ${h.score}, 感情: ${emotionLabels[h.emotion] || h.emotion}`
    ).join('\n');

    const prompt = `
あなたは沖縄在住の心理カウンセラー「あっきー」です。
以下のユーザーの過去数日間の心の記録（気分スコアと感情）を見て、優しく温かいアドバイスを300文字程度で生成してください。
HSPや完璧主義で悩みやすい人に寄り添うように、「はいさい！」から始め、「なんくるないさ」「てーげー」などの言葉を自然に交え、最後は前向きな言葉で締めてください。

【ユーザーの記録】
${historyText}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.status(200).json({ advice: response.text() });
  } catch (error) {
    console.error('API Route Error:', error);
    res.status(500).json({ error: 'Failed to generate insight' });
  }
}

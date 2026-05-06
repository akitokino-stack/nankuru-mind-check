import React, { useState, useEffect } from 'react';
import Header from './Header';
import './InsightPage.css';
import { Lightbulb, TrendingUp, HeartPulse, Sparkles, Loader } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const InsightPage = ({ history = [] }) => {
  const hasEnoughData = history.length >= 5;
  const [aiAdvice, setAiAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 感情ラベルの変換
  const emotionLabels = {
    happy: '「幸せ」', calm: '「落ち着き」', sad: '「悲しい」', anxious: '「不安」', peaceful: '「平穏」'
  };

  useEffect(() => {
    if (!hasEnoughData) return;
    
    const fetchAIInsights = async () => {
      setIsLoading(true);
      setError('');
      try {
        let aiText = '';
        
        // 1. 本番環境（Vercel等）用の安全な裏側APIを試す
        try {
          const res = await fetch('/api/generate-insight', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ history: history.slice(0, 7) })
          });
          
          if (res.ok) {
            const data = await res.json();
            aiText = data.advice;
          } else {
            throw new Error('API routing failed locally');
          }
        } catch (backendErr) {
          // 2. ローカル開発環境（手元のPC）用の直接通信（フォールバック）
          console.log("バックエンドが見つからないため、ローカルの直接通信を使用します");
          const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
          if (!apiKey || apiKey === 'ここに取得したAPIキーを貼り付けます') {
            throw new Error('APIキーが設定されていません。.envファイルを確認して、正しいキーを入力してください。');
          }

          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

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
          aiText = response.text();
        }

        setAiAdvice(aiText);
      } catch (err) {
        console.error("Gemini API Error:", err);
        setError(`エラー: ${err.message || err.toString()}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAIInsights();
  }, [hasEnoughData, history]);

  const recentData = history.slice(0, 7);
  const mostFrequentEmotion = hasEnoughData ? Object.keys(recentData.reduce((acc, curr) => {
    acc[curr.emotion] = (acc[curr.emotion] || 0) + 1;
    return acc;
  }, {})).reduce((a, b) => recentData.filter(v=>v.emotion===a).length > recentData.filter(v=>v.emotion===b).length ? a : b) : 'calm';

  const careItems = {
    happy: ["今の喜びを誰かと共有する", "日記に今の気持ちを詳しく書く", "ご褒美に好きなものを食べる"],
    calm: ["静かな場所で読書をする", "ハーブティーを飲む", "ストレッチで体をほぐす"],
    sad: ["温かいお風呂にゆっくり浸かる", "好きな音楽に浸る", "無理に笑わず、感情を大切にする"],
    anxious: ["5分間のマインドフルネス呼吸法", "不安なことを紙に書き出してみる", "早めに布団に入る"],
    peaceful: ["散歩をして季節を感じる", "今の平穏に感謝する", "新しいことに小さく挑戦してみる"]
  };

  return (
    <>
      <Header />
      <div className="insight-page">
        <h2 className="insight-page-title">AIからの洞察</h2>
        
        <div className="insight-cards-container">
          
          {!hasEnoughData ? (
            <div className="insight-card empty-insight">
              <div className="insight-card-header">
                <Sparkles size={24} color="#f6ad55" />
                <h3>分析まであと少し...</h3>
              </div>
              <p className="insight-text">
                現在データを収集中です（現在 {history.length} 件/5件必要）。<br/>
                5件以上の記録が貯まると、本物のAIがあなたの心の傾向を読み取り、パーソナライズされたアドバイスをお届けできるようになります。
              </p>
            </div>
          ) : (
            <>
              <div className="insight-card highlight">
                <div className="insight-card-header">
                  <Lightbulb size={24} color="#f6ad55" />
                  <h3>あっきー先生からのメッセージ</h3>
                </div>
                {isLoading ? (
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#718096'}}>
                    <Loader className="spinner" size={20} />
                    <p>AIがアドバイスを考えています...</p>
                  </div>
                ) : error ? (
                  <p className="insight-text" style={{color: 'red'}}>{error}</p>
                ) : (
                  <p className="insight-text" style={{ whiteSpace: 'pre-wrap' }}>
                    {aiAdvice}
                  </p>
                )}
              </div>

              <div className="insight-card">
                <div className="insight-card-header">
                  <TrendingUp size={24} color="#5ba4cc" />
                  <h3>感情の傾向</h3>
                </div>
                <p className="insight-text">
                  過去の記録から、最近は特に{emotionLabels[mostFrequentEmotion]}という感情があなたのベースになっているようです。
                </p>
              </div>

              <div className="insight-card">
                <div className="insight-card-header">
                  <HeartPulse size={24} color="#e53e3e" />
                  <h3>今日からできるケア</h3>
                </div>
                <ul className="insight-list">
                  {(careItems[mostFrequentEmotion] || careItems['calm']).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default InsightPage;

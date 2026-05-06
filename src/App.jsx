import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ScoreRing from './components/ScoreRing';
import EmotionCheck from './components/EmotionCheck';
import WeeklyTrend from './components/WeeklyTrend';
import BottomNav from './components/BottomNav';
import QuestionModal from './components/QuestionModal';
import HistoryPage from './components/HistoryPage';
import InsightPage from './components/InsightPage';
import ProfilePage from './components/ProfilePage';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('calm');

  // 履歴データのステート (localStorage から初期化)
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('nankuru_history');
    return saved ? JSON.parse(saved) : [];
  });

  // 最新スコアの取得
  const latestScore = history.length > 0 ? history[0].score : '--';

  // 平均スコアの取得
  const calculateAverage = () => {
    if (history.length === 0) return '--';
    const sum = history.reduce((acc, curr) => acc + curr.score, 0);
    return Math.round(sum / history.length);
  };
  const averageScore = calculateAverage();

  // 履歴データが更新されたら localStorage に保存
  useEffect(() => {
    localStorage.setItem('nankuru_history', JSON.stringify(history));
  }, [history]);

  const handleStartCheck = (emotion) => {
    setSelectedEmotion(emotion);
    setIsModalOpen(true);
  };

  const handleFinishCheck = (newScore, note, checkDate) => {
    const newRecord = {
      id: Date.now(),
      date: checkDate,
      score: newScore,
      emotion: selectedEmotion,
      notes: note
    };
    
    // 履歴の先頭に追加（新しい順）
    setHistory(prev => [newRecord, ...prev]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Header />
            <div className="main-content">
              <ScoreRing 
                score={latestScore === '--' ? 0 : latestScore} 
                displayScore={latestScore} 
                avgScore={averageScore}
              />
              <EmotionCheck onStartCheck={handleStartCheck} />
              <WeeklyTrend history={history} />
            </div>
          </>
        );
      case 'history':
        return <HistoryPage history={history} />;
      case 'insight':
        return <InsightPage history={history} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {renderContent()}
      
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
      
      <QuestionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onFinish={handleFinishCheck} 
      />
    </div>
  );
}

export default App;

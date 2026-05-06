import React from 'react';
import Header from './Header';
import './HistoryPage.css';
import { Smile, Waves, Frown, CloudLightning, Flower2 } from 'lucide-react';

const emotionsMap = {
  happy: { icon: Smile, label: 'Happy', labelJp: '幸せ', color: '#5ba4cc', bgColor: '#e6f3fa' },
  calm: { icon: Waves, label: 'Calm', labelJp: '落ち着き', color: '#5ba4cc', bgColor: '#e6f3fa' },
  sad: { icon: Frown, label: 'Sad', labelJp: '悲しい', color: '#718096', bgColor: '#f7fafc' },
  anxious: { icon: CloudLightning, label: 'Anxious', labelJp: '不安', color: '#718096', bgColor: '#f7fafc' },
  peaceful: { icon: Flower2, label: 'Peaceful', labelJp: '平穏', color: '#48bb78', bgColor: '#f0fff4' },
};

const HistoryPage = ({ history = [] }) => {
  return (
    <>
      <Header />
      <div className="history-page">
        <h2 className="history-page-title">これまでの記録</h2>
        
        <div className="history-list">
          {history.length === 0 ? (
            <div className="empty-state">
              <p>まだ記録がありません。</p>
              <p>毎日のチェックを始めて、心の記録をつけていきましょう。</p>
            </div>
          ) : (
            history.map((item) => {
              const emotionConfig = emotionsMap[item.emotion] || emotionsMap['calm'];
              const IconComponent = emotionConfig.icon;
              
              return (
                <div key={item.id} className="history-card">
                  <div className="history-card-header">
                    <div className="history-date">{item.date}</div>
                    <div className="history-score-badge">
                      スコア: <span className="score-val">{item.score}</span>
                    </div>
                  </div>
                  
                  <div className="history-card-body">
                    <div 
                      className="history-emotion-icon"
                      style={{ backgroundColor: emotionConfig.bgColor, color: emotionConfig.color }}
                    >
                      <IconComponent size={24} strokeWidth={1.5} />
                    </div>
                    <div className="history-details">
                      <div className="history-emotion-name">
                        {emotionConfig.labelJp} <span className="emotion-name-en">({emotionConfig.label})</span>
                      </div>
                      <div className="history-notes">{item.notes}</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryPage;

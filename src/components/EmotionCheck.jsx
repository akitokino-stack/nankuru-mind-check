import React, { useState } from 'react';
import './EmotionCheck.css';
import { Smile, Waves, Frown, CloudLightning, Flower2 } from 'lucide-react';

const emotions = [
  { id: 'happy', icon: Smile, label: 'Happy', labelJp: '幸せ' },
  { id: 'calm', icon: Waves, label: 'Calm', labelJp: '落ち着き' },
  { id: 'sad', icon: Frown, label: 'Sad', labelJp: '悲しい' },
  { id: 'anxious', icon: CloudLightning, label: 'Anxious', labelJp: '不安' },
  { id: 'peaceful', icon: Flower2, label: 'Peaceful', labelJp: '平穏' },
];

const EmotionCheck = ({ onStartCheck }) => {
  const [selected, setSelected] = useState('happy');

  return (
    <div className="emotion-card">
      <h2 className="section-title">今日の感情チェック</h2>
      <div className="emotion-grid">
        {emotions.map((emotion) => {
          const IconComponent = emotion.icon;
          const isSelected = selected === emotion.id;
          return (
            <div 
              key={emotion.id} 
              className={`emotion-item ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelected(emotion.id)}
            >
              <div className="emotion-icon-bg">
                <IconComponent 
                  size={28} 
                  color={isSelected ? '#2d3748' : '#718096'} 
                  strokeWidth={1.5}
                />
              </div>
              <span className="emotion-label-en">{emotion.label}</span>
              <span className="emotion-label-jp">{emotion.labelJp}</span>
            </div>
          );
        })}
      </div>
      <button className="primary-button" onClick={() => onStartCheck(selected)}>
        毎日のチェックを始める
      </button>
    </div>
  );
};

export default EmotionCheck;

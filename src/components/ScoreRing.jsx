import React from 'react';
import './ScoreRing.css';

const ScoreRing = ({ score = 75, displayScore, avgScore }) => {
  // Calculate the stroke dasharray and dashoffset for the SVG circle
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  
  // スコアが0(初期状態)のときはリングは空のままにする
  const safeScore = isNaN(score) ? 0 : Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  const displayVal = displayScore !== undefined ? displayScore : score;

  return (
    <div className="score-ring-container">
      <div className="score-ring-wrapper">
        <svg
          className="score-ring-svg"
          width="160"
          height="160"
          viewBox="0 0 160 160"
        >
          {/* Background circle */}
          <circle
            className="score-ring-bg"
            stroke="#f0f0f0"
            strokeWidth="12"
            fill="transparent"
            r={radius}
            cx="80"
            cy="80"
          />
          {/* Progress circle */}
          <circle
            className="score-ring-progress"
            stroke="url(#gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx="80"
            cy="80"
            style={{ strokeDasharray: circumference, strokeDashoffset }}
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#95cbe1" />
              <stop offset="100%" stopColor="#f6b595" />
            </linearGradient>
          </defs>
        </svg>
        <div className="score-ring-text">
          <span className="score-value">{displayVal}</span>
          <span className="score-total">/100</span>
        </div>
      </div>
      <p className="score-label">メンタルヘルススコア</p>
      {avgScore !== undefined && (
        <p className="score-avg" style={{ margin: '8px 0 0', fontSize: '14px', color: '#718096' }}>
          平均: {avgScore}{avgScore !== '--' && '点'}
        </p>
      )}
    </div>
  );
};

export default ScoreRing;

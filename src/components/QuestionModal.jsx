import React, { useState } from 'react';
import './QuestionModal.css';
import { X, ChevronLeft } from 'lucide-react';

const questions = [
  { id: 1, text: '今日はよく眠れましたか？' },
  { id: 2, text: '食欲はありますか？' },
  { id: 3, text: '何か不安に感じることはありますか？' },
];

const QuestionModal = ({ isOpen, onClose, onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [note, setNote] = useState('');
  const [answers, setAnswers] = useState([]);
  
  // 今日の日付をローカル時刻で取得 (YYYY-MM-DD)
  const getLocalToday = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = getLocalToday();
  const [checkDate, setCheckDate] = useState(today);

  if (!isOpen) return null;

  const handleAnswer = (value) => {
    setAnswers(prev => [...prev, value]);
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setAnswers(prev => prev.slice(0, -1));
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    const q1Score = answers[0] === 1 ? 20 : 0;
    const q2Score = answers[1] === 1 ? 20 : 0;
    const q3Score = answers[2] === 0 ? 20 : 0;
    const newScore = 40 + q1Score + q2Score + q3Score;

    // 第3引数として日付も渡すように拡張
    onFinish(newScore, note, checkDate);
    setCurrentStep(0);
    setAnswers([]);
    setNote('');
    setCheckDate(today);
    onClose();
  };

  const isNoteStep = currentStep === questions.length;
  const progressRatio = isNoteStep ? 1 : (currentStep / (questions.length + 1));

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {currentStep > 0 && (
          <button className="back-btn" onClick={handleBack}>
            <ChevronLeft size={24} color="#a0aec0" />
          </button>
        )}
        <button className="close-btn" onClick={onClose}>
          <X size={24} color="#a0aec0" />
        </button>
        
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressRatio * 100}%` }}
          />
        </div>
        
        {!isNoteStep ? (
          <>
            {currentStep === 0 && (
              <div className="date-picker-group">
                <label className="date-label">記録する日付</label>
                <input 
                  type="date" 
                  className="date-input" 
                  value={checkDate}
                  max={today}
                  onChange={(e) => setCheckDate(e.target.value)}
                />
              </div>
            )}
            <h3 className="question-text">{questions[currentStep].text}</h3>
            <div className="answer-buttons">
              <button className="answer-btn yes" onClick={() => handleAnswer(1)}>はい</button>
              <button className="answer-btn no" onClick={() => handleAnswer(0)}>いいえ</button>
            </div>
          </>
        ) : (
          <>
            <h3 className="question-text">今日の一言・気になったこと</h3>
            <textarea
              className="note-textarea"
              placeholder="今日の出来事や、今の気持ちを自由に書き留めてみましょう..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
            />
            <div className="answer-buttons">
              <button className="answer-btn complete" onClick={handleComplete}>完了して記録する</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionModal;

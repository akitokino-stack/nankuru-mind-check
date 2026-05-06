import React, { useState } from 'react';
import './FaqModal.css';
import { X, ChevronDown, ChevronUp, Mail } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "マインドチェックは毎日どのタイミングでやればいいですか？",
    answer: "ご自身の使いやすいタイミングで構いませんが、一日の終わり（夕食後や就寝前）などに振り返る時間として活用される会員様が多くいらっしゃいます。"
  },
  {
    id: 2,
    question: "スコアが低い日が続いているのですが...",
    answer: "スコアはあくまで一つの目安です。低い日が続く場合は、無理をせず休息をとるサインかもしれません。気になる場合は、なんくる心サロンのカウンセリング等でご相談ください。"
  },
  {
    id: 3,
    question: "過去の履歴を消すことはできますか？",
    answer: "現在のバージョンでは過去の記録を個別に削除する機能はありません。将来のアップデートで対応予定です。"
  }
];

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <h4>{question}</h4>
        {isOpen ? <ChevronUp size={20} color="#a0aec0" /> : <ChevronDown size={20} color="#a0aec0" />}
      </div>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FaqModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content faq-modal-content">
        <div className="modal-header">
          <h3 className="modal-title">よくある質問 / サポート</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={24} color="#a0aec0" />
          </button>
        </div>
        
        <div className="faq-list">
          {faqs.map(faq => (
            <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="contact-section">
          <h4>上記で解決しない場合</h4>
          <p>なんくる心サロンのサポート窓口まで直接ご相談ください。</p>
          <button className="btn-contact">
            <Mail size={18} />
            メールでお問い合わせ
          </button>
        </div>

      </div>
    </div>
  );
};

export default FaqModal;

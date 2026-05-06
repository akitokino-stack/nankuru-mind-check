import React, { useState, useEffect } from 'react';
import './GuardianDiagnosis.css';
import { ChevronRight, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

const questions = [
  {
    text: "Q1. エメラルドグリーンの沖縄の海にやってきました。今の気分なら、どう過ごしたい？",
    options: [
      { text: "波の音を聞きながら、ただ時間を忘れてぼーっとする", score: { gajumaru: 1, kame: 1 } },
      { text: "「すっごく綺麗！」と、誰かとこの感動を共有してはしゃぐ", score: { shisa: 1, kijimuna: 1 } },
      { text: "誰もいない静かなお気に入りの場所を探して、一人の時間を満喫する", score: { ishiganto: 1 } }
    ]
  },
  {
    text: "Q2. 友人何人かで集まって話しているとき、あなたはどのポジションにいることが多い？",
    options: [
      { text: "「うんうん」と笑顔でうなずく、聞き役に回ることが多い", score: { gajumaru: 1, kame: 1 } },
      { text: "一緒になって笑ったり怒ったり、リアクションが大きくなる", score: { shisa: 1, kijimuna: 1 } },
      { text: "話を聞きつつ、ちょっと引いた目線で「それってこういうことじゃない？」と冷静に言う", score: { ishiganto: 1 } }
    ]
  },
  {
    text: "Q3. 何も予定のない休日。あなたにとって一番「気楽」な過ごし方は？",
    options: [
      { text: "前もって決めず、その日の朝の「直感」で思いつきの行動をする", score: { kijimuna: 2 } },
      { text: "やりたいことを自分のペースで、一つ一つじっくりこなしていく", score: { kame: 2, ishiganto: 1 } },
      { text: "誰かからの誘いに乗ったり、流れに身を任せてのんびりする", score: { gajumaru: 2, shisa: 1 } }
    ]
  },
  {
    text: "Q4. 最後に。あなたが「私、ちょっと無理して頑張りすぎかも…」と疲れを感じるのはどんな時？",
    options: [
      { text: "相手の顔色や空気を読みすぎて、自分の意見を飲み込んでしまった時", score: { gajumaru: 2, kame: 1 } },
      { text: "困っている人を放っておけず、自分のキャパを超えてまで世話を焼いてしまった時", score: { shisa: 2, kijimuna: 1 } },
      { text: "「私がちゃんとしなきゃ」と、責任感やルールで自分を縛りすぎた時", score: { ishiganto: 2 } }
    ]
  }
];

const popups = [
  "サー！ 悪いものはパクっと食べてやるから、安心して答えて！",
  "ゆっくりでいい、ガジュマルのひげのように、じっくり聴くよ。",
  "大丈夫。ここには誰も君を傷つけるものは通さない。",
  "焦らなくて大丈夫。本質へ向かう旅を楽しもう。",
  "ニフェーデービル！君の直感、面白いね！"
];

const resultData = {
  ishiganto: {
    name: "石敢當（いしがんとう）",
    image: "/guardian-ishiganto.png",
    text: "あなたの「優しさ」は、相手を守る強さです。あなたは自分を「真面目すぎて融通が利かない」と責めていませんか？それは心の科学では『プロとしての境界線』と呼ばれる、心理カウンセラーに必要不可欠な才能です。あなたが冷静に「ここまで」と線を引けるからこそ、相手は依存せず、安心して自立へ向かうことができます。その誠実さこそが、迷える人を守る最強の盾なのです。なんくるないさ！"
  },
  gajumaru: {
    name: "ガジュマル",
    image: "/guardian-gajumaru.png",
    text: "あなたの「優しさ」は、究極の安心感です。あなたは「のろまで、気の利いたアドバイスができない」と悩んでいませんか？でも、ガジュマルの木がただそこにいるだけで人を癒やすように、あなたの『ただ黙って寄り添う力（傾聴）』は、どんな言葉よりも相手の心を救います。無理に動かなくていい。根を張って待つ、その器の大きさがあなたの才能です。あなたの沈黙は、相手を許す魔法なのです。なんくるないさ！"
  },
  shisa: {
    name: "シーサー",
    image: "/guardian-shisa.png",
    text: "あなたの「優しさ」は、希望のエネルギーです。あなたは「感情移入しすぎて疲れる」と自分をダメだと思っていませんか？それは、相手のために本気で泣き、笑える『圧倒的な共感力』です。シーサーが悪霊を追い払うように、あなたの情熱が、相談者の心の霧を吹き飛ばします。あなたの“熱さ”は、誰かの一歩を踏み出す勇気に変わります。そのままでいい。その熱さが素晴らしい才能なのです！なんくるないさ！"
  },
  kame: {
    name: "カメ",
    image: "/guardian-kame.png",
    text: "あなたの「優しさ」は、本質を見守る力です。あなたは「優柔不断だ」「変化が遅い」と焦っていませんか？海ガメが何千キロも旅をするように、あなたは『相手のペースを尊重し、本質を見失わずにゆっくり進める人』です。すぐに解決を求めず、ただ見守るその忍耐強さは、長期的な変化を支えるカウンセラーとして最高の資質。あなたのゆったりとした時間が、相談者に深い安心感を与えるのです。なんくるないさ！"
  },
  kijimuna: {
    name: "キジムナー",
    image: "/guardian-kijimuna.png",
    text: "あなたの「優しさ」は、心を解き放つ魔法です。あなたは「飽きっぽい」「普通じゃない」自分を責めていませんか？枠にとらわれない精霊のように、あなたの『常識にとらわれない自由な視点』こそが、ガチガチに固まった相談者の心を解きほぐすスパイスになります。そのままでいい。あなたの自由さが、誰かを「正しさ」の呪縛から救い、本来の笑顔を取り戻させるのです。なんくるないさ！"
  }
};

const GuardianDiagnosis = () => {
  const [screen, setScreen] = useState(1);
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState({ ishiganto: 0, gajumaru: 0, shisa: 0, kame: 0, kijimuna: 0 });
  const [popupText, setPopupText] = useState("");
  const [finalGuardian, setFinalGuardian] = useState(null);

  // Random popup effect on question screen
  useEffect(() => {
    if (screen === 2) {
      const showRandomPopup = () => {
        const text = popups[Math.floor(Math.random() * popups.length)];
        setPopupText(text);
        
        setTimeout(() => {
          setPopupText("");
        }, 3000);
      };
      
      const interval = setInterval(showRandomPopup, 5000);
      return () => clearInterval(interval);
    }
  }, [screen]);

  // Loading screen logic
  useEffect(() => {
    if (screen === 3) {
      // Calculate max score
      let maxScore = -1;
      let maxKey = "gajumaru"; // default fallback
      for (const [key, value] of Object.entries(scores)) {
        if (value > maxScore) {
          maxScore = value;
          maxKey = key;
        }
      }
      setFinalGuardian(maxKey);

      const timer = setTimeout(() => {
        setScreen(4);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [screen, scores]);

  const handleStart = () => {
    setScreen(2);
    setQIndex(0);
    setScores({ ishiganto: 0, gajumaru: 0, shisa: 0, kame: 0, kijimuna: 0 });
  };

  const handleOptionClick = (scoreMods) => {
    // Apply score additions
    setScores(prev => {
      const newScores = { ...prev };
      for (const [key, val] of Object.entries(scoreMods)) {
        newScores[key] += val;
      }
      return newScores;
    });

    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setScreen(3);
    }
  };

  const renderScreen1 = () => (
    <div className="guardian-screen top-screen fade-in">
      <div className="top-hero">
        <img src="/guardian-top.png" alt="なんくる守護神たち" className="top-hero-image" />
        <h1 className="hero-title">
          <span className="subtitle">あなたの「優しさ」は才能だった！</span>
          心の扉をひらく<br />『なんくる守護神』診断
        </h1>
      </div>
      <div className="top-body">
        <p>頑張りすぎているあなたへ。</p>
        <p>この診断は、あなたを採点したり、優劣をつけるものではありません。「今のままでいい」と気づくための、心の旅です。</p>
        <p>沖縄に伝わる智慧と心の科学が、あなたの資質をそっと紐解き、あなたを全肯定する守護神（キャラクター）を導き出します。安心して、身を委ねてみてください。なんくるないさ。</p>
      </div>
      <button className="btn-primary start-btn" onClick={handleStart}>
        自分の才能に出会う（無料） <ChevronRight size={20} />
      </button>
    </div>
  );

  const renderScreen2 = () => (
    <div className="guardian-screen q-screen fade-in">
      <div className="q-progress">
        <span>Question {qIndex + 1} / {questions.length}</span>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}></div>
        </div>
      </div>
      
      <div className="q-content">
        <h2 className="q-text">{questions[qIndex].text}</h2>
        <div className="q-options">
          {questions[qIndex].options.map((opt, i) => (
            <button key={i} className="q-option-btn" onClick={() => handleOptionClick(opt.score)}>
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      {/* Popup */}
      <div className={`popup-message ${popupText ? 'visible' : ''}`}>
        {popupText}
      </div>
    </div>
  );

  const renderScreen3 = () => (
    <div className="guardian-screen loading-screen fade-in">
      <div className="spinner-container">
        <div className="spinner-ring"></div>
        <ShieldCheck className="loading-icon" size={40} />
      </div>
      <h2 className="loading-title">あなたを守る存在が、今ここに。</h2>
      <p className="loading-text">
        もうすぐ、あなたの「なんくる守護神」が姿を現します。<br /><br />
        どんなキャラクターが出ても、それは今のあなたにとって最強の味方であり、あなた自身の素晴らしい資質です。届けられる彼らの言葉を、素直な心で受け取ってください。心のトビラが、開く瞬間です。
      </p>
    </div>
  );

  const renderScreen4 = () => {
    if (!finalGuardian) return null;
    const res = resultData[finalGuardian];

    return (
      <div className="guardian-screen result-screen fade-in">
        <div className="result-header">
          <h3>あなたの守護神は…</h3>
          <img src={res.image} alt={res.name} className="result-guardian-image" />
          <h1 className="result-name">{res.name}</h1>
        </div>
        
        <div className="result-body">
          <p>{res.text}</p>
        </div>

        <div className="cta-section">
          <div className="cta-icon-wrapper">
            <HeartHandshake size={32} />
          </div>
          <h3 className="cta-title">一人で頑張りすぎないで。</h3>
          <p className="cta-text">
            あなたの守護神が教えてくれた才能、本当に素晴らしいです。でも、その優しさを一人で抱え込んで、心がすり減っていませんか？<br/>
            あなたの資質をもっと楽に、ゆとりを持って活かす方法を、仲間と一緒に学びませんか？
          </p>
          <div className="cta-box">
            <h4>心もふところも豊かになる、心の安全基地。<br/>『なんくる心サロン』</h4>
            <p>心理学と新しい時代のツールを使って、あなたの優しさを価値に変える場所です。いちゃりばちょーでー（一度会えば兄弟）、優しい仲間が待っていますよ。</p>
            <a href="#" className="btn-primary cta-btn">
              月額2,000円〜で、サロンの仲間になる
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="guardian-container">
      {screen === 1 && renderScreen1()}
      {screen === 2 && renderScreen2()}
      {screen === 3 && renderScreen3()}
      {screen === 4 && renderScreen4()}
    </div>
  );
};

export default GuardianDiagnosis;

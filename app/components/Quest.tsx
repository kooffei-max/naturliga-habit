'use client';

import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const encouragingMessages = [
  "素晴らしい進歩です！",
  "その調子！継続は力なり！",
  "あなたの頑張りは必ず実を結びます！",
  "一歩一歩、確実に前進していますね！",
  "今日も目標に向かって進んでいます！",
  "小さな一歩が大きな変化を生みます！",
  "継続する勇気、素晴らしいです！",
  "あなたの決意に拍手を送ります！",
  "その意志の強さ、見習いたいです！",
  "毎日の努力が未来を作ります！"
];

interface QuestProps {
  id: number;
  title: string;
  description?: string;
  progress: number;
  onCheck: () => void;
}

export default function Quest({ id, title, description, progress, onCheck }: QuestProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleCheck = () => {
    if (!isChecked) {
      setIsChecked(true);
      onCheck();
      const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
      setMessage(randomMessage);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000); // 3秒後にメッセージを非表示
    }
  };

  return (
    <div className="quest-card">
      <h2 className="quest-title">{title}</h2>
      {description && (
        <p className="quest-description">{description}</p>
      )}
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <button
          onClick={handleCheck}
          className={`btn-circle ${isChecked ? 'btn-disabled' : ''}`}
          disabled={isChecked}
        >
          <CheckCircleIcon 
            className="h-6 w-6"
            style={{ color: isChecked ? '#87CEEB' : '#4682B4' }}
          />
        </button>
      </div>
      <p className="progress-text">
        Progress: {progress}%
      </p>
      {showMessage && (
        <div className="encouraging-message">
          {message}
        </div>
      )}
    </div>
  );
} 
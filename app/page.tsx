'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Quest from './components/Quest';

interface QuestData {
  id: number;
  title: string;
  description?: string;
  progress: number;
}

export default function Home() {
  const searchParams = useSearchParams();
  const [quests, setQuests] = useState<QuestData[]>([]);
  const [newQuest, setNewQuest] = useState({
    title: '',
    description: '',
  });
  const [error, setError] = useState('');

  // URLからデータを読み込む
  useEffect(() => {
    const sharedData = searchParams.get('data');
    if (sharedData) {
      try {
        const decodedData = JSON.parse(atob(sharedData));
        setQuests(decodedData);
      } catch (e) {
        console.error('Invalid shared data');
      }
    }
  }, [searchParams]);

  // 状態が変更されたときにURLを更新
  const updateURL = (updatedQuests: QuestData[]) => {
    const encodedData = btoa(JSON.stringify(updatedQuests));
    window.history.pushState({}, '', `?data=${encodedData}`);
  };

  const handleCheck = (questId: number) => {
    const updatedQuests = quests.map(quest => {
      if (quest.id === questId) {
        return {
          ...quest,
          progress: Math.min(100, quest.progress + 10),
        };
      }
      return quest;
    });
    setQuests(updatedQuests);
    updateURL(updatedQuests);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (quests.length >= 3) {
      setError('習慣は最大3つまでしか登録できません');
      return;
    }

    if (newQuest.title.trim()) {
      const updatedQuests = [
        ...quests,
        {
          id: quests.length + 1,
          title: newQuest.title,
          description: newQuest.description,
          progress: 0,
        },
      ];
      setQuests(updatedQuests);
      setNewQuest({ title: '', description: '' });
      updateURL(updatedQuests);
    }
  };

  return (
    <main style={{ backgroundColor: '#87CEEB', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 className="quest-title" style={{ fontSize: '2.25rem', textAlign: 'center', marginBottom: '2rem' }}>
          Naturliga Habit
        </h1>
        
        <form onSubmit={handleSubmit} style={{ maxWidth: '32rem', margin: '0 auto 2rem', padding: '1rem', backgroundColor: 'white', borderRadius: '8px', border: '4px solid #4682B4' }}>
          <div className="form-control">
            <label className="label">
              <span style={{ fontFamily: "'Press Start 2P', cursive", color: '#4682B4' }}>習慣化したいことを記入</span>
            </label>
            <input
              type="text"
              placeholder="例: 毎日の運動、読書、早起きなど"
              className="input input-bordered w-full"
              value={newQuest.title}
              onChange={(e) => setNewQuest({ ...newQuest, title: e.target.value })}
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span style={{ fontFamily: "'Press Start 2P', cursive", color: '#4682B4' }}>説明</span>
            </label>
            <input
              type="text"
              placeholder="どんなタイミングで行うかを記入してください"
              className="input input-bordered w-full"
              value={newQuest.description}
              onChange={(e) => setNewQuest({ ...newQuest, description: e.target.value })}
            />
          </div>
          {error && (
            <div style={{ color: 'red', marginTop: '0.5rem', fontSize: '0.875rem', fontFamily: "'Press Start 2P', cursive" }}>
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-primary mt-4 w-full">
            習慣を追加
          </button>
        </form>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          {quests.map((quest) => (
            <Quest
              key={quest.id}
              {...quest}
              onCheck={() => handleCheck(quest.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
} 
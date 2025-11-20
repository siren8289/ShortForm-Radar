import { FunctionComponent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotificationSettings.module.css';
import UserMenu from './UserMenu';
import StatCard from './common/StatCard';
import GradientButton from './common/GradientButton';

type Keyword = {
  id: number;
  hashtag: string;
  date: string;
  matches: number;
};

const NotificationSettings: FunctionComponent = () => {
  const navigate = useNavigate();
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<Keyword[]>([
    { id: 1, hashtag: '#홈카페', date: '2024-01-12', matches: 8 },
    { id: 2, hashtag: '#겨울패션', date: '2024-01-15', matches: 15 },
  ]);

  const stats = useMemo(() => {
    const totalMatches = keywords.reduce((sum, keyword) => sum + keyword.matches, 0);
    return {
      totalKeywords: keywords.length,
      totalMatches,
      weeklyAlerts: 24,
    };
  }, [keywords]);

  const handleAddKeyword = () => {
    const trimmed = keywordInput.trim();
    if (!trimmed) return;
    setKeywords((prev) => [
      ...prev,
      {
        id: Date.now(),
        hashtag: trimmed.startsWith('#') ? trimmed : `#${trimmed}`,
        date: new Date().toISOString().split('T')[0],
        matches: Math.floor(Math.random() * 10) + 5,
      },
    ]);
    setKeywordInput('');
  };

  const handleRemoveKeyword = (id: number) => {
    setKeywords((prev) => prev.filter((keyword) => keyword.id !== id));
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className={styles.logoIcon}></div>
            <span className={styles.logoText}>ShortForm Radar</span>
          </div>
          <UserMenu />
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.titleSection}>
          <div className={styles.titleIcon}>🔔</div>
          <div>
            <h1 className={styles.pageTitle}>키워드 알림</h1>
            <p className={styles.pageDescription}>관심있는 키워드를 등록하면 트렌딩될 때 알림을 보내드립니다</p>
          </div>
        </section>

        <section className={styles.addKeywordCard}>
          <h2 className={styles.sectionTitle}>새 키워드 추가</h2>
          <div className={styles.addKeywordRow}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="#키워드를 입력하세요"
                value={keywordInput}
                onChange={(event) => setKeywordInput(event.target.value)}
              />
            </div>
            <GradientButton type="button" onClick={handleAddKeyword} disabled={!keywordInput.trim()}>
              추가
            </GradientButton>
          </div>
        </section>

        <section className={styles.statsGrid}>
          <StatCard label="등록된 키워드" value={stats.totalKeywords} accentColor="#fe2c55" />
          <StatCard label="총 매칭 수" value={stats.totalMatches} accentColor="#9d4edd" />
          <StatCard label="이번 주 알림" value={stats.weeklyAlerts} accentColor="#25f4ee" />
        </section>

        <section className={styles.keywordsCard}>
          <div className={styles.keywordsHeader}>
            <h2 className={styles.sectionTitle}>등록된 키워드</h2>
          </div>
          <div className={styles.keywordsList}>
            {keywords.map((keyword) => (
              <div key={keyword.id} className={styles.keywordItem}>
                <div className={styles.keywordInfo}>
                  <div className={styles.keywordIcon}>#</div>
                  <div>
                    <p className={styles.keywordHashtag}>{keyword.hashtag}</p>
                    <p className={styles.keywordMeta}>등록일: {keyword.date}</p>
                  </div>
                </div>
                <div className={styles.keywordActions}>
                  <span className={styles.keywordBadges}>{keyword.matches}개 매칭</span>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemoveKeyword(keyword.id)}
                    aria-label="키워드 삭제"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.tipsCard}>
          <h2 className={styles.sectionTitle}>💡 사용 방법</h2>
          <ul className={styles.tipsList}>
            <li>관심있는 해시태그나 키워드를 추가하세요</li>
            <li>해당 키워드가 트렌딩하면 실시간으로 알림을 받습니다</li>
            <li>설정 페이지에서 알림 방식(이메일/푸시)을 선택할 수 있습니다</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default NotificationSettings;


import { FunctionComponent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SavedTrends.module.css';
import UserMenu from './UserMenu';
import StatCard from './common/StatCard';
import GradientButton from './common/GradientButton';

type SavedTrend = {
  id: number;
  platform: 'TikTok' | 'Instagram' | 'YouTube';
  title: string;
  growth: string;
  views: string;
  engagement: string;
  date: string;
  saved: boolean;
};

const initialSavedTrends: SavedTrend[] = [
  { id: 1, platform: 'TikTok', title: '겨울 패션 하울', growth: '+245%', views: '2.4M', engagement: '18.5%', date: '2024-01-12', saved: true },
  { id: 2, platform: 'TikTok', title: '여행 VLOG', growth: '+267%', views: '2.8M', engagement: '23.6%', date: '2024-01-14', saved: false },
  { id: 3, platform: 'TikTok', title: '반려동물 일상', growth: '+289%', views: '3.1M', engagement: '26.8%', date: '2024-01-15', saved: false },
];

const SavedTrends: FunctionComponent = () => {
  const navigate = useNavigate();
  const [savedTrends, setSavedTrends] = useState(initialSavedTrends);

  const stats = useMemo(() => {
    const platformCounts = savedTrends.reduce(
      (acc, trend) => {
        acc[trend.platform] += 1;
        return acc;
      },
      { TikTok: 0, Instagram: 0, YouTube: 0 }
    );
    return {
      total: savedTrends.length,
      platformCounts,
    };
  }, [savedTrends]);

  const handleRemove = (id: number) => {
    setSavedTrends((prev) => prev.filter((trend) => trend.id !== id));
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
          <h1 className={styles.pageTitle}>저장된 트렌드</h1>
          <p className={styles.pageDescription}>관심있는 트렌드를 저장하고 관리하세요</p>
        </section>

        <section className={styles.statsGrid}>
          <StatCard label="총 저장" value={stats.total} />
          <StatCard label="TikTok" value={stats.platformCounts.TikTok} accentColor="#fe2c55" />
          <StatCard label="Instagram" value={stats.platformCounts.Instagram} accentColor="#9d4edd" />
          <StatCard label="YouTube" value={stats.platformCounts.YouTube} accentColor="#25f4ee" />
        </section>

        <section className={styles.trendsGrid}>
          {savedTrends.map((trend) => (
            <article key={trend.id} className={styles.trendCard}>
              <div className={`${styles.platformBar} ${styles[`platformBar${trend.platform}`]}`} />
              <div className={styles.trendContent}>
                <div className={styles.trendHeader}>
                  <div>
                    <h2 className={styles.trendTitle}>{trend.title}</h2>
                    <span className={styles.platformBadge}>{trend.platform}</span>
                  </div>
                  <div className={styles.trendActions}>
                    <button
                      className={`${styles.iconButton} ${trend.saved ? styles.iconButtonActive : ''}`}
                      type="button"
                      onClick={() => handleRemove(trend.id)}
                      aria-label="저장 해제"
                    >
                      ★
                    </button>
                    <button
                      className={styles.iconButton}
                      type="button"
                      onClick={() => navigate(`/trend/${trend.id}`)}
                      aria-label="트렌드 상세"
                    >
                      →
                    </button>
                  </div>
                </div>

                <dl className={styles.metricsList}>
                  <div>
                    <dt>성장률</dt>
                    <dd className={styles.metricHighlight}>{trend.growth}</dd>
                  </div>
                  <div>
                    <dt>조회수</dt>
                    <dd>{trend.views}</dd>
                  </div>
                  <div>
                    <dt>참여율</dt>
                    <dd>{trend.engagement}</dd>
                  </div>
                </dl>

                <div className={styles.trendFooter}>
                  <span className={styles.savedDate}>저장일: {trend.date}</span>
                  <GradientButton className={styles.detailsButton} type="button" onClick={() => navigate(`/trend/${trend.id}`)}>
                    자세히 보기
                  </GradientButton>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default SavedTrends;


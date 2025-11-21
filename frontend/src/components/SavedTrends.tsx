import { FunctionComponent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSavedTrends, useRemoveSavedTrend } from '../hooks/useSaved';
import styles from './SavedTrends.module.css';
import StatCard from './common/StatCard';
import GradientButton from './common/GradientButton';

const compactFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const formatPlatformLabel = (platform?: string) => {
  switch (platform?.toUpperCase()) {
    case 'TIKTOK':
      return 'TikTok';
    case 'REELS':
    case 'INSTAGRAM':
      return 'Instagram';
    case 'SHORTS':
    case 'YOUTUBE':
      return 'YouTube';
    default:
      return platform ?? 'TikTok';
  }
};

const formatGrowth = (growth?: number) => {
  if (growth === undefined || growth === null) return '—';
  const sign = growth >= 0 ? '+' : '';
  return `${sign}${growth}%`;
};

const formatViews = (views?: number) => {
  if (!views) return '—';
  return `${compactFormatter.format(views)} 조회`;
};

const SavedTrends: FunctionComponent = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useSavedTrends();
  const { mutate: removeTrend, isLoading: isRemoving } = useRemoveSavedTrend(refetch);

  const savedTrends = useMemo(
    () =>
      (data ?? []).map((trend) => ({
        id: trend.id,
        title: trend.title,
        platform: formatPlatformLabel(trend.platform),
        growth: formatGrowth(trend.growthRate),
        views: formatViews(trend.viewCount),
        engagement: '—',
        date: trend.createdAt ? new Date(trend.createdAt).toLocaleDateString() : '—',
      })),
    [data]
  );

  const stats = useMemo(() => {
    const platformCounts = savedTrends.reduce(
      (acc, trend) => {
        acc[trend.platform] = (acc[trend.platform] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    return {
      total: savedTrends.length,
      platformCounts: {
        TikTok: platformCounts['TikTok'] ?? 0,
        Instagram: platformCounts['Instagram'] ?? 0,
        YouTube: platformCounts['YouTube'] ?? 0,
      },
    };
  }, [savedTrends]);

  const handleRemove = (id: number) => {
    removeTrend(id);
  };

  return (
    <div className={styles.page}>
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

        {isLoading && <p className={styles.statusMessage}>저장한 트렌드를 불러오는 중입니다...</p>}
        {error && <p className={styles.statusMessageError}>오류: {error.message}</p>}

        <section className={styles.trendsGrid}>
          {savedTrends.map((trend) => (
            <article key={trend.id} className={styles.trendCard}>
              <div className={`${styles.platformBar} ${styles[`platformBar${trend.platform}`] || ''}`} />
              <div className={styles.trendContent}>
                <div className={styles.trendHeader}>
                  <div>
                    <h2 className={styles.trendTitle}>{trend.title}</h2>
                    <span className={styles.platformBadge}>{trend.platform}</span>
                  </div>
                  <div className={styles.trendActions}>
                    <button
                      className={`${styles.iconButton} ${styles.iconButtonActive}`}
                      type="button"
                      onClick={() => handleRemove(trend.id)}
                      aria-label="저장 해제"
                      disabled={isRemoving}
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
          {!isLoading && savedTrends.length === 0 && !error && (
            <p className={styles.emptyMessage}>저장된 트렌드가 없습니다.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default SavedTrends;


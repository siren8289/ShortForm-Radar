import { FunctionComponent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchTrends } from '../hooks/useTrends';
import { Trend } from '../api/trends';
import styles from './TrendSearch.module.css';

const platformOptions = ['모든 플랫폼', 'TikTok', 'Instagram', 'YouTube'];
const categoryOptions = ['모든 카테고리', '라이프스타일', '교육', '엔터테인먼트'];
const sortOptions = ['성장률순', '조회수순', '참여율순'];

const formatPlatformLabel = (platform?: string) => {
  switch (platform?.toUpperCase()) {
    case 'TIKTOK':
      return 'TikTok';
    case 'REELS':
      return 'Instagram Reels';
    case 'SHORTS':
      return 'YouTube Shorts';
    default:
      return platform ?? 'TikTok';
  }
};

const formatGrowth = (growth?: number) => {
  if (growth === undefined || growth === null) return '—';
  const sign = growth >= 0 ? '+' : '';
  return `${sign}${growth}%`;
};

const compactFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const formatViews = (views?: number) => {
  if (!views) return '—';
  return `${compactFormatter.format(views)} 조회수`;
};

const TrendSearch: FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [platformIndex, setPlatformIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState(0);

  const { data: searchResults, isLoading, error } = useSearchTrends(searchTerm);
  const results = searchResults ?? [];
  const hasResults = results.length > 0;

  const summary = useMemo(() => {
    const term = searchTerm.trim();
    if (!term) return '검색어를 입력하세요';
    if (isLoading) return '검색 중입니다...';
    if (error) return error.message ?? '검색 중 오류가 발생했습니다.';
    if (!hasResults) return `“${term}”에 대한 결과가 없습니다`;
    return '';
  }, [searchTerm, isLoading, error, hasResults]);

  const mappedResults = results.map((trend: Trend) => ({
    id: trend.id,
    title: trend.title,
    platform: formatPlatformLabel(trend.platform),
    growth: formatGrowth(trend.growthRate),
    views: formatViews(trend.viewCount),
  }));

  const handleReset = () => {
    setSearchTerm('');
    setPlatformIndex(0);
    setCategoryIndex(0);
    setSortIndex(0);
  };

  const cycleOption = (type: 'platform' | 'category' | 'sort') => {
    if (type === 'platform') {
      setPlatformIndex((prev) => (prev + 1) % platformOptions.length);
    } else if (type === 'category') {
      setCategoryIndex((prev) => (prev + 1) % categoryOptions.length);
    } else {
      setSortIndex((prev) => (prev + 1) % sortOptions.length);
    }
  };

  return (
    <div className={styles.trendSearch}>
      <main className={styles.main}>
        <section className={styles.titleSection}>
          <h1 className={styles.pageTitle}>트렌드 검색</h1>
          <p className={styles.pageDescription}>원하는 트렌드를 검색하고 필터링하세요</p>
        </section>

        <section className={styles.searchCard}>
          <div className={styles.searchField}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M9 15C12.3137 15 15 12.3137 15 9C15 5.68629 12.3137 3 9 3C5.68629 3 3 5.68629 3 9C3 12.3137 5.68629 15 9 15Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M17 17L13.65 13.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="트렌드를 검색하세요"
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filtersRow}>
            <div className={styles.filtersLabel}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 5H16L12 10V15L8 17V10L4 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>필터:</span>
            </div>
            <button className={styles.filterButton} onClick={() => cycleOption('platform')}>
              <span>{platformOptions[platformIndex]}</span>
              <ChevronIcon />
            </button>
            <button className={styles.filterButton} onClick={() => cycleOption('category')}>
              <span>{categoryOptions[categoryIndex]}</span>
              <ChevronIcon />
            </button>
            <button className={styles.filterButton} onClick={() => cycleOption('sort')}>
              <span>{sortOptions[sortIndex]}</span>
              <ChevronIcon />
            </button>
            <button className={styles.resetButton} onClick={handleReset}>
              초기화
            </button>
          </div>
        </section>

        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>검색 결과 ({mappedResults.length})</h2>
            {isLoading && <span className={styles.resultsStatus}>불러오는 중...</span>}
            {error && <span className={styles.resultsStatusError}>오류: {error.message}</span>}
          </div>
          {hasResults ? (
            <div className={styles.resultsGrid}>
              {mappedResults.map((trend) => (
                <article key={trend.id} className={styles.resultCard}>
                  <div>
                    <h3 className={styles.resultTitle}>{trend.title}</h3>
                    <p className={styles.resultPlatform}>{trend.platform}</p>
                  </div>
                  <div className={styles.resultMeta}>
                    <span>{trend.views}</span>
                    <span>{trend.growth}</span>
                  </div>
                  <button
                    type="button"
                    className={styles.resultButton}
                    onClick={() => navigate(`/trend/${trend.id}`)}
                  >
                    자세히 보기
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <p className={styles.emptyTitle}>{summary}</p>
              <p className={styles.emptyDescription}>다른 검색어나 필터를 사용해보세요</p>
              <button className={styles.emptyResetButton} onClick={handleReset}>
                필터 초기화
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default TrendSearch;


import { FunctionComponent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TrendSearch.module.css';

const platformOptions = ['모든 플랫폼', 'TikTok', 'Instagram', 'YouTube'];
const categoryOptions = ['모든 카테고리', '라이프스타일', '교육', '엔터테인먼트'];
const sortOptions = ['성장률순', '조회수순', '참여율순'];

const TrendSearch: FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [platformIndex, setPlatformIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState(0);

  const hasResults = false;

  const summary = useMemo(() => {
    const term = searchTerm.trim();
    if (!term) return '검색 결과가 없습니다';
    return `“${term}”에 대한 결과가 없습니다`;
  }, [searchTerm]);

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
            <h2 className={styles.resultsTitle}>검색 결과 (0)</h2>
          </div>
          {!hasResults && (
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

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerTop}>
            <div className={styles.footerLogo}>
              <div className={styles.footerLogoIcon}></div>
              <span className={styles.footerLogoText}>ShortForm Radar</span>
            </div>
            <div className={styles.footerLinks}>
              <a href="#" className={styles.footerLink}>
                이용약관
              </a>
              <a href="#" className={styles.footerLink}>
                개인정보처리방침
              </a>
              <a href="#" className={styles.footerLink}>
                데이터 출처
              </a>
            </div>
          </div>
          <div className={styles.footerDataSources}>
            <span className={styles.dataSourceLabel}>데이터 출처:</span>
            <div className={styles.dataSourceList}>
              <div className={styles.dataSourceItem}>
                <div className={styles.dataSourceDot} style={{ backgroundColor: '#fe2c55' }}></div>
                <span>TikTok API</span>
              </div>
              <div className={styles.dataSourceItem}>
                <div className={styles.dataSourceDot} style={{ backgroundColor: '#9d4edd' }}></div>
                <span>Instagram Graph API</span>
              </div>
              <div className={styles.dataSourceItem}>
                <div className={styles.dataSourceDot} style={{ backgroundColor: '#25f4ee' }}></div>
                <span>YouTube Data API</span>
              </div>
            </div>
          </div>
          <div className={styles.footerCopyright}>© 2025 ShortForm Radar. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default TrendSearch;


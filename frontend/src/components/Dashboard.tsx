import { FunctionComponent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTopTrends } from '../hooks/useTrends';
import { Trend } from '../api/trends';
import styles from './Dashboard.module.css';

const fallbackTrends = [
  { id: 1, title: '겨울 패션 하울', platform: 'TikTok', growth: '+245%', views: '2.4M', engagement: '18.5%' },
  { id: 2, title: '홈카페 레시피', platform: 'Instagram', growth: '+189%', views: '1.8M', engagement: '22.3%' },
  { id: 3, title: 'AI 도구 활용법', platform: 'YouTube', growth: '+312%', views: '3.2M', engagement: '25.7%' },
  { id: 4, title: '아침 루틴 챌린지', platform: 'TikTok', growth: '+156%', views: '1.5M', engagement: '19.8%' },
  { id: 5, title: '운동 모티베이션', platform: 'Instagram', growth: '+203%', views: '2.1M', engagement: '20.1%' },
  { id: 6, title: '요리 꿀팁', platform: 'YouTube', growth: '+178%', views: '1.9M', engagement: '17.4%' },
  { id: 7, title: '여행 VLOG', platform: 'TikTok', growth: '+267%', views: '2.8M', engagement: '23.6%' },
  { id: 8, title: '메이크업 튜토리얼', platform: 'Instagram', growth: '+234%', views: '2.5M', engagement: '21.9%' },
  { id: 9, title: '생산성 해킹', platform: 'YouTube', growth: '+198%', views: '2.0M', engagement: '24.2%' },
  { id: 10, title: '반려동물 일상', platform: 'TikTok', growth: '+289%', views: '3.1M', engagement: '26.8%' },
  { id: 11, title: '인테리어 팁', platform: 'Instagram', growth: '+167%', views: '1.7M', engagement: '18.9%' },
  { id: 12, title: '독서 리뷰', platform: 'YouTube', growth: '+145%', views: '1.4M', engagement: '16.7%' },
  { id: 13, title: '스트레칭 루틴', platform: 'TikTok', growth: '+223%', views: '2.3M', engagement: '22.5%' },
  { id: 14, title: '재테크 노하우', platform: 'Instagram', growth: '+201%', views: '2.2M', engagement: '20.8%' },
  { id: 15, title: '사진 촬영 팁', platform: 'YouTube', growth: '+187%', views: '1.9M', engagement: '19.3%' },
  { id: 16, title: '영어 공부법', platform: 'TikTok', growth: '+256%', views: '2.7M', engagement: '24.1%' },
  { id: 17, title: '명상 가이드', platform: 'Instagram', growth: '+134%', views: '1.3M', engagement: '17.2%' },
  { id: 18, title: '게임 하이라이트', platform: 'YouTube', growth: '+298%', views: '3.0M', engagement: '27.3%' },
  { id: 19, title: '댄스 챌린지', platform: 'TikTok', growth: '+321%', views: '3.4M', engagement: '28.9%' },
  { id: 20, title: '직장인 브이로그', platform: 'Instagram', growth: '+176%', views: '1.8M', engagement: '18.6%' },
];

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

const formatGrowth = (growthRate?: number) => {
  if (growthRate === undefined || growthRate === null) return '—';
  const value = growthRate >= 0 ? `+${growthRate}` : `${growthRate}`;
  return `${value}%`;
};

const formatViews = (views?: number) => {
  if (!views) return '—';
  return compactFormatter.format(views);
};

const Dashboard: FunctionComponent = () => {
  const navigate = useNavigate();
  const { data: remoteTrends, isLoading, error } = useTopTrends(20);

  const trends = useMemo(() => {
    if (remoteTrends && remoteTrends.length > 0) {
      return remoteTrends.map((trend: Trend) => ({
        id: trend.id,
        title: trend.title,
        platform: formatPlatformLabel(trend.platform),
        growth: formatGrowth(trend.growthRate),
        views: `${formatViews(trend.viewCount)}`,
        engagement: '—',
      }));
    }
    return fallbackTrends;
  }, [remoteTrends]);

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'TikTok':
        return '#fe2c55';
      case 'Instagram':
        return '#9d4edd';
      case 'YouTube':
        return '#25f4ee';
      default:
        return '#a0a0a0';
    }
  };

  return (
    <div className={styles.dashboard}>
      <main className={styles.main}>
        {/* Form Section */}
        <div className={styles.formSection}>
          <button className={styles.filterButton}>
            <span>모든 플랫폼</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={styles.filterButton}>
            <span>7일</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className={styles.searchContainer}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input type="text" placeholder="트렌드 검색..." className={styles.searchInput} />
          </div>
          <button className={styles.searchButton}>검색</button>
        </div>

        {/* Dashboard Title Section */}
        <div className={styles.titleSection}>
          <div className={styles.titleContainer}>
            <h1 className={styles.dashboardTitle}>대시보드</h1>
            <p className={styles.dashboardDescription}>
              실시간 숏폼 트렌드를 확인하세요 • 헤더에서 플랫폼과 기간을 선택할 수 있습니다
            </p>
          </div>
          <button className={styles.compareButton} onClick={() => navigate('/compare')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>플랫폼 비교</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>총 트렌드</span>
              <div className={styles.statIcon}>📊</div>
            </div>
            <div className={styles.statValue}>20</div>
            <div className={styles.statChange}>
              <span className={styles.arrowUp}>↑</span>
              <span className={styles.changeText}>+12% vs 지난주</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>평균 조회수</span>
              <div className={styles.statIcon}>👁️</div>
            </div>
            <div className={styles.statValue}>2.2M</div>
            <div className={styles.statChange}>
              <span className={styles.arrowUp}>↑</span>
              <span className={styles.changeText}>+8% vs 지난주</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>평균 성장률</span>
              <div className={styles.statIcon}>📈</div>
            </div>
            <div className={styles.statValue}>215%</div>
            <div className={styles.statChange}>
              <span className={styles.arrowUp}>↑</span>
              <span className={styles.changeText}>+15% vs 지난주</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>저장된 트렌드</span>
              <div className={styles.statIcon}>⭐</div>
            </div>
            <div className={styles.statValue}>0</div>
            <div className={styles.statChange}>
              <span className={styles.arrowUp}>↑</span>
              <span className={styles.changeText}>총 0개 저장됨</span>
            </div>
          </div>
        </div>

        {/* Trending Content Section */}
        <div className={styles.trendingSection}>
          <div className={styles.trendingHeader}>
            <h2 className={styles.trendingTitle}>트렌딩 콘텐츠 ({trends.length})</h2>
            <span className={styles.trendingPeriod}>
              {isLoading ? '실시간 데이터를 가져오는 중입니다...' : '최근 7일'}
            </span>
          </div>
          {error && (
            <p className={styles.trendingError}>데이터를 불러오지 못했습니다: {error.message}</p>
          )}
          <div className={styles.trendsGrid}>
            {trends.map((trend) => (
              <div key={trend.id} className={styles.trendCard}>
                <div className={styles.trendCardTopBar} style={{ backgroundColor: getPlatformColor(trend.platform) }}></div>
                <div className={styles.trendCardContent}>
                  <div className={styles.trendCardHeader}>
                    <div className={styles.trendCardTitleSection}>
                      <h3 className={styles.trendCardTitle}>{trend.title}</h3>
                      <div className={styles.platformBadge} style={{ color: getPlatformColor(trend.platform) }}>
                        <div className={styles.platformDot} style={{ backgroundColor: getPlatformColor(trend.platform) }}></div>
                        {trend.platform}
                      </div>
                    </div>
                    <button className={styles.bookmarkButton}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 2C2.89543 2 2 2.89543 2 4V14C2 14.2652 2.10536 14.5196 2.29289 14.7071L8 8L13.7071 14.7071C13.8946 14.5196 14 14.2652 14 14V4C14 2.89543 13.1046 2 12 2H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <div className={styles.trendCardStats}>
                    <div className={styles.trendStatRow}>
                      <div className={styles.trendStatLabel}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 2L10.09 6.26L15 7L11 10.14L11.82 15.02L8 12.77L4.18 15.02L5 10.14L1 7L5.91 6.26L8 2Z" fill="currentColor"/>
                        </svg>
                        <span>성장률</span>
                      </div>
                      <span className={styles.trendStatValue} style={{ color: '#25f4ee' }}>{trend.growth}</span>
                    </div>
                    <div className={styles.trendStatRow}>
                      <div className={styles.trendStatLabel}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>조회수</span>
                      </div>
                      <span className={styles.trendStatValue}>{trend.views}</span>
                    </div>
                    <div className={styles.trendStatRow}>
                      <div className={styles.trendStatLabel}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 2L10.09 6.26L15 7L11 10.14L11.82 15.02L8 12.77L4.18 15.02L5 10.14L1 7L5.91 6.26L8 2Z" fill="currentColor"/>
                        </svg>
                        <span>참여율</span>
                      </div>
                      <span className={styles.trendStatValue}>{trend.engagement}</span>
                    </div>
                  </div>
                  <button
                    className={styles.viewDetailsButton}
                    onClick={() => navigate(`/trend/${trend.id}`)}
                  >
                    자세히 보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


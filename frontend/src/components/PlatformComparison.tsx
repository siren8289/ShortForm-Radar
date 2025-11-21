import { FunctionComponent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlatformTrends } from '../hooks/useTrends';
import { Trend } from '../api/trends';
import styles from './PlatformComparison.module.css';

const compactFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const formatViews = (views?: number) => {
  if (!views) return '—';
  return `${compactFormatter.format(views)} 조회`;
};

const formatGrowth = (growth?: number) => {
  if (growth === undefined || growth === null) return '—';
  const sign = growth >= 0 ? '+' : '';
  return `${sign}${growth}%`;
};

const formatHashtag = (title?: string) => {
  if (!title) return '#unknown';
  return title.startsWith('#') ? title : `#${title.replace(/\s+/g, '')}`;
};

const fallbackPlatformData = [
  {
    platform: 'TikTok',
    icon: '🎵',
    gradient: 'linear-gradient(180deg, #fe2c55, #9d4edd)',
    trendCount: '1.2M+ 트렌드',
    trends: [
      { rank: 1, hashtag: '#겨울패션하울', views: '5.2M', growth: '+342%' },
      { rank: 2, hashtag: '#홈트레이닝', views: '4.8M', growth: '+298%' },
      { rank: 3, hashtag: '#새해계획', views: '4.1M', growth: '+256%' },
      { rank: 4, hashtag: '#요리브이로그', views: '3.9M', growth: '+234%' },
      { rank: 5, hashtag: '#반려동물일상', views: '3.5M', growth: '+212%' },
    ],
  },
  {
    platform: 'Instagram Reels',
    icon: '📷',
    gradient: 'linear-gradient(180deg, #9d4edd, #fe2c55)',
    trendCount: '980K+ 트렌드',
    trends: [
      { rank: 1, hashtag: '#홈카페레시피', views: '3.8M', growth: '+267%' },
      { rank: 2, hashtag: '#여행브이로그', views: '3.4M', growth: '+245%' },
      { rank: 3, hashtag: '#데일리룩', views: '3.2M', growth: '+223%' },
      { rank: 4, hashtag: '#운동루틴', views: '2.9M', growth: '+198%' },
      { rank: 5, hashtag: '#책추천', views: '2.6M', growth: '+187%' },
    ],
  },
  {
    platform: 'YouTube Shorts',
    icon: '▶️',
    gradient: 'linear-gradient(180deg, #25f4ee, #9d4edd)',
    trendCount: '850K+ 트렌드',
    trends: [
      { rank: 1, hashtag: '#AI활용법', views: '6.5M', growth: '+389%' },
      { rank: 2, hashtag: '#프로그래밍팀', views: '4.2M', growth: '+276%' },
      { rank: 3, hashtag: '#영어공부', views: '3.8M', growth: '+234%' },
      { rank: 4, hashtag: '#역사이야기', views: '3.5M', growth: '+221%' },
      { rank: 5, hashtag: '#과학상식', views: '3.2M', growth: '+209%' },
    ],
  },
];

const PlatformComparison: FunctionComponent = () => {
  const navigate = useNavigate();
  const tiktok = usePlatformTrends('TIKTOK');
  const reels = usePlatformTrends('REELS');
  const shorts = usePlatformTrends('SHORTS');

  const platformData = useMemo(() => {
    const sections = [
      { hook: tiktok, fallback: fallbackPlatformData[0], platformKey: 'TikTok' },
      { hook: reels, fallback: fallbackPlatformData[1], platformKey: 'Instagram Reels' },
      { hook: shorts, fallback: fallbackPlatformData[2], platformKey: 'YouTube Shorts' },
    ];

    return sections.map(({ hook, fallback, platformKey }) => {
      const remoteTrends = hook.data ?? [];
      const useFallback = remoteTrends.length === 0;
      const formattedTrends = (useFallback ? fallback.trends : remoteTrends.slice(0, 5).map((trend: Trend, index) => ({
        rank: trend.rank ?? index + 1,
        hashtag: formatHashtag(trend.title),
        views: formatViews(trend.viewCount),
        growth: formatGrowth(trend.growthRate),
      })));

      return {
        platform: platformKey,
        icon: fallback.icon,
        gradient: fallback.gradient,
        trendCount: useFallback
          ? fallback.trendCount
          : `${remoteTrends.length.toLocaleString()}개 트렌드`,
        trends: formattedTrends,
        isLoading: hook.isLoading,
        error: hook.error,
      };
    });
  }, [tiktok, reels, shorts]);

  const commonTrends = [
    { hashtag: '#새해다짐', growth: '+245%' },
    { hashtag: '#자기계발', growth: '+198%' },
    { hashtag: '#브이로그', growth: '+187%' },
  ];

  const differentiatedTrends = [
    {
      platform: 'TikTok',
      platformColor: '#fe2c55',
      hashtag: '#챌린지댄스',
      description: '댄스 챌린지 중심',
      growth: '+342%',
    },
    {
      platform: 'Reels',
      platformColor: '#9d4edd',
      hashtag: '#미니멀라이프',
      description: '라이프스타일 콘텐츠',
      growth: '+289%',
    },
    {
      platform: 'Shorts',
      platformColor: '#25f4ee',
      hashtag: '#지식쇼츠',
      description: '교육 콘텐츠 강세',
      growth: '+321%',
    },
  ];

  return (
    <div className={styles.platformComparison}>
      {/* Main Content */}
      <main className={styles.main}>
        {/* Back Button */}
        <button className={styles.backButton} onClick={() => navigate('/dashboard')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>대시보드로 돌아가기</span>
        </button>

        {/* Title Section */}
        <div className={styles.titleSection}>
          <div className={styles.titleContainer}>
            <h1 className={styles.pageTitle}>플랫폼 비교</h1>
            <p className={styles.pageDescription}>
              TikTok, Instagram Reels, YouTube Shorts의 트렌드를 한눈에 비교해보세요
            </p>
          </div>
          <div className={styles.realtimeBadge}>
            <span>실시간 업데이트</span>
          </div>
        </div>

        {/* Platform Comparison Cards */}
        <div className={styles.platformCards}>
          {platformData.map((platform) => (
            <div key={platform.platform} className={styles.platformCard}>
              <div className={styles.platformHeader} style={{ background: platform.gradient }}>
                <div className={styles.platformIconContainer}>
                  <span className={styles.platformIcon}>{platform.icon}</span>
                </div>
                <div className={styles.platformInfo}>
                  <h3 className={styles.platformName}>{platform.platform}</h3>
                  <p className={styles.platformTrendCount}>{platform.trendCount}</p>
                </div>
              </div>
              <div className={styles.platformContent}>
                {platform.isLoading && !platform.error && (
                  <p className={styles.platformStatus}>실시간 데이터를 불러오는 중...</p>
                )}
                {platform.error && (
                  <p className={styles.platformStatusError}>오류: {platform.error.message}</p>
                )}
                <h4 className={styles.trendsTitle}>Top 5 트렌드</h4>
                <div className={styles.trendsList}>
                  {platform.trends.map((trend) => (
                    <div key={trend.rank} className={styles.trendItem}>
                      <div className={styles.trendRank} style={{ background: platform.gradient }}>
                        {trend.rank}
                      </div>
                      <div className={styles.trendInfo}>
                        <p className={styles.trendHashtag}>{trend.hashtag}</p>
                        <div className={styles.trendStats}>
                          <span className={styles.trendViews}>{trend.views}</span>
                          <span className={styles.trendGrowth}>{trend.growth}</span>
                        </div>
                      </div>
                      <button className={styles.externalLinkButton}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M12 4L4 12M12 4H8M12 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Common Trends Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <svg className={styles.sectionIconSvg} width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 15L5 10L7.5 10L7.5 5L12.5 5L12.5 10L15 10L10 15Z" fill="currentColor"/>
            </svg>
            <h2 className={styles.sectionTitle}>공통 트렌드</h2>
          </div>
          <p className={styles.sectionDescription}>
            모든 플랫폼에서 동시에 인기를 얻고 있는 트렌드입니다
          </p>
          <div className={styles.commonTrendsGrid}>
            {commonTrends.map((trend, index) => (
              <div key={index} className={styles.commonTrendCard}>
                <div className={styles.commonTrendHeader}>
                  <h3 className={styles.commonTrendHashtag}>{trend.hashtag}</h3>
                  <p className={styles.commonTrendGrowth}>{trend.growth}</p>
                </div>
                <div className={styles.platformTags}>
                  <span className={styles.platformTag}>TikTok</span>
                  <span className={styles.platformTag}>Reels</span>
                  <span className={styles.platformTag}>Shorts</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Differentiated Trends Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <svg className={styles.sectionIconSvg} width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 15L5 10L7.5 10L7.5 5L12.5 5L12.5 10L15 10L10 15Z" fill="currentColor"/>
            </svg>
            <h2 className={styles.sectionTitle}>차별화 트렌드</h2>
          </div>
          <p className={styles.sectionDescription}>
            각 플랫폼에서만 독특하게 인기를 얻고 있는 트렌드입니다
          </p>
          <div className={styles.differentiatedTrendsGrid}>
            {differentiatedTrends.map((trend, index) => (
              <div key={index} className={styles.differentiatedTrendCard}>
                <div className={styles.differentiatedTrendHeader}>
                  <span className={styles.differentiatedPlatformTag} style={{ backgroundColor: trend.platformColor }}>
                    {trend.platform}
                  </span>
                </div>
                <h3 className={styles.differentiatedTrendHashtag}>{trend.hashtag}</h3>
                <p className={styles.differentiatedTrendDescription}>{trend.description}</p>
                <p className={styles.differentiatedTrendGrowth}>{trend.growth}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlatformComparison;


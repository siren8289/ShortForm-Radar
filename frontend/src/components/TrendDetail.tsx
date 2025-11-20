import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TrendDetail.module.css';

const TrendDetail: FunctionComponent = () => {
  const navigate = useNavigate();

  const relatedVideos = [
    { title: '겨울 패션 코디 추천', platform: 'tiktok', views: '1.2M' },
    { title: '패션 하울 VLOG', platform: 'instagram', views: '980K' },
    { title: '겨울 룩북 2025', platform: 'youtube', views: '1.5M' },
    { title: '저렴한 겨울 옷 쇼핑', platform: 'tiktok', views: '850K' },
  ];

  const hashtags = ['겨울패션', '패션하울', 'OOTD', '겨울코디', '쇼핑하울'];

  const platformComparison = [
    { platform: 'TikTok', icon: '🎵', color: '#fe2c55', views: '2.4M 조회수', growth: '+245%' },
    { platform: 'Instagram Reels', icon: '📷', color: '#9d4edd', views: '1.8M 조회수', growth: '+189%' },
    { platform: 'YouTube Shorts', icon: '▶️', color: '#25f4ee', views: '1.2M 조회수', growth: '+132%' },
  ];

  return (
    <div className={styles.trendDetail}>
      <main className={styles.main}>
        {/* Back Button */}
        <button className={styles.backButton} onClick={() => navigate('/dashboard')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>대시보드로 돌아가기</span>
        </button>

        <div className={styles.contentWrapper}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Trend Detail Card */}
            <div className={styles.trendDetailCard}>
              <div className={styles.trendHeader}>
                <div className={styles.trendInfo}>
                  <span className={styles.platformBadge} style={{ backgroundColor: '#fe2c55' }}>TikTok</span>
                  <h1 className={styles.trendTitle}>겨울 패션 하울</h1>
                  <p className={styles.trendDescription}>2025년 겨울 시즌 가장 인기있는 패션 트렌드</p>
                </div>
                <div className={styles.actionButtons}>
                  <button className={styles.iconButton}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 2C2.89543 2 2 2.89543 2 4V14C2 14.2652 2.10536 14.5196 2.29289 14.7071L8 8L13.7071 14.7071C13.8946 14.5196 14 14.2652 14 14V4C14 2.89543 13.1046 2 12 2H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className={styles.iconButton}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className={styles.statsRow}>
                <div className={styles.statCard} style={{ borderColor: 'rgba(37, 244, 238, 0.3)' }}>
                  <div className={styles.statHeader}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 15L5 10L7.5 10L7.5 5L12.5 5L12.5 10L15 10L10 15Z" fill="#25f4ee"/>
                    </svg>
                    <span className={styles.statLabel} style={{ color: '#25f4ee' }}>성장률</span>
                  </div>
                  <p className={styles.statValue} style={{ color: '#25f4ee' }}>+245%</p>
                </div>
                <div className={styles.statCard} style={{ borderColor: 'rgba(254, 44, 85, 0.3)' }}>
                  <div className={styles.statHeader}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 15L5 10L7.5 10L7.5 5L12.5 5L12.5 10L15 10L10 15Z" fill="#fe2c55"/>
                    </svg>
                    <span className={styles.statLabel} style={{ color: '#fe2c55' }}>조회수</span>
                  </div>
                  <p className={styles.statValue} style={{ color: '#fe2c55' }}>2.4M</p>
                </div>
                <div className={styles.statCard} style={{ borderColor: 'rgba(157, 78, 221, 0.3)' }}>
                  <div className={styles.statHeader}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 15L5 10L7.5 10L7.5 5L12.5 5L12.5 10L15 10L10 15Z" fill="#9d4edd"/>
                    </svg>
                    <span className={styles.statLabel} style={{ color: '#9d4edd' }}>참여율</span>
                  </div>
                  <p className={styles.statValue} style={{ color: '#9d4edd' }}>18.5%</p>
                </div>
              </div>
            </div>

            {/* Growth Chart Section */}
            <div className={styles.chartSection}>
              <h2 className={styles.sectionTitle}>7일간 성장 추이</h2>
              <div className={styles.chartContainer}>
                <div className={styles.chartPlaceholder}>
                  <p className={styles.chartPlaceholderText}>차트 영역</p>
                </div>
              </div>
            </div>

            {/* Platform Comparison Section */}
            <div className={styles.platformComparisonSection}>
              <h2 className={styles.sectionSubtitle}>플랫폼별 비교</h2>
              <div className={styles.platformComparisonList}>
                {platformComparison.map((platform, index) => (
                  <div key={index} className={styles.platformComparisonItem} style={{ 
                    backgroundColor: `rgba(${platform.color === '#fe2c55' ? '254, 44, 85' : platform.color === '#9d4edd' ? '157, 78, 221' : '37, 244, 238'}, 0.1)`,
                    borderColor: `rgba(${platform.color === '#fe2c55' ? '254, 44, 85' : platform.color === '#9d4edd' ? '157, 78, 221' : '37, 244, 238'}, 0.3)`
                  }}>
                    <div className={styles.platformInfo}>
                      <div className={styles.platformIconContainer} style={{ backgroundColor: platform.color }}>
                        <span className={styles.platformIcon}>{platform.icon}</span>
                      </div>
                      <div className={styles.platformDetails}>
                        <p className={styles.platformName}>{platform.platform}</p>
                        <p className={styles.platformViews}>{platform.views}</p>
                      </div>
                    </div>
                    <p className={styles.platformGrowth} style={{ color: '#25f4ee' }}>{platform.growth}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Related Videos */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>관련 영상</h3>
              <div className={styles.relatedVideosList}>
                {relatedVideos.map((video, index) => (
                  <div key={index} className={styles.relatedVideoItem}>
                    <p className={styles.videoTitle}>{video.title}</p>
                    <div className={styles.videoMeta}>
                      <span className={styles.videoPlatform}>{video.platform}</span>
                      <span className={styles.videoViews} style={{ color: '#25f4ee' }}>{video.views}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className={styles.moreButton}>
                <span>더 보기</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Popular Hashtags */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>인기 해시태그</h3>
              <div className={styles.hashtagsList}>
                {hashtags.map((hashtag, index) => (
                  <span key={index} className={styles.hashtagTag}>#{hashtag}</span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>액션</h3>
              <div className={styles.actionsList}>
                <button className={styles.actionButton} style={{ background: 'linear-gradient(180deg, #fe2c55, #9d4edd)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 2C2.89543 2 2 2.89543 2 4V14C2 14.2652 2.10536 14.5196 2.29289 14.7071L8 8L13.7071 14.7071C13.8946 14.5196 14 14.2652 14 14V4C14 2.89543 13.1046 2 12 2H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>저장하기</span>
                </button>
                <button className={styles.actionButton}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>공유하기</span>
                </button>
                <button className={styles.actionButton}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>비슷한 트렌드 찾기</span>
                </button>
              </div>
            </div>
          </div>
        </div>
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
              <a href="#" className={styles.footerLink}>이용약관</a>
              <a href="#" className={styles.footerLink}>개인정보처리방침</a>
              <a href="#" className={styles.footerLink}>데이터 출처</a>
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
          <div className={styles.footerCopyright}>
            © 2025 ShortForm Radar. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrendDetail;


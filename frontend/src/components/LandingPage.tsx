import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from './layout/PageHeader';
import styles from './LandingPage.module.css';

// Import SVG icons from assets
import arrowUpIcon from '../assets/a873fc4d5057b06d350161590dcbca0d030f38b1.svg';
import realtimeIcon from '../assets/5e15bdee2dadcea90faf58e1b43ef0f95f0710b1.svg';
import comparisonIcon from '../assets/2c06e629f70ed1a1cea5dfc16c7b6c759ed348b2.svg';
import saveIcon from '../assets/f29796809a9c31e6bb8072229e20a0c886d3ad31.svg';
import logoIcon from '../assets/c0bebfffc4ca9c64b418dffa2a1390fc87d25680.svg';
import footerLogoIcon from '../assets/b43b3d24922c6cdf6c31e2a9e71146560ce926c2.svg';
import arrowRightIcon from '../assets/c8a8c27bcbea01be33001a492208dc9aafc6884e.svg';
import headerLogoIcon from '../assets/3dc016d4da6dcec095ffb930d7bfabec4b89fe86.svg';

const LandingPage: FunctionComponent = () => {
  const navigate = useNavigate();

  const topTrends = [
    {
      rank: 1,
      platform: 'TikTok',
      hashtag: '#겨울패션하울',
      growth: '+342%',
      gradient: 'linear-gradient(180deg, #fe2c55, #9d4edd)',
    },
    {
      rank: 2,
      platform: 'YouTube',
      hashtag: '#AI활용법',
      growth: '+298%',
      gradient: 'linear-gradient(180deg, #25f4ee, #9d4edd)',
    },
    {
      rank: 3,
      platform: 'Instagram',
      hashtag: '#홈카페레시피',
      growth: '+267%',
      gradient: 'linear-gradient(180deg, #9d4edd, #fe2c55)',
    },
  ];

  const platforms = [
    {
      name: 'TikTok',
      icon: '🎵',
      description: '글로벌 숏폼 트렌드의 중심',
      trendCount: '1.2M+ 트렌드',
      color: '#fe2c55',
      gradient: 'linear-gradient(180deg, #fe2c55, #9d4edd)',
    },
    {
      name: 'Instagram Reels',
      icon: '📷',
      description: '비주얼 중심의 숏폼 콘텐츠',
      trendCount: '980K+ 트렌드',
      color: '#9d4edd',
      gradient: 'linear-gradient(180deg, #9d4edd, #fe2c55)',
    },
    {
      name: 'YouTube Shorts',
      icon: '▶️',
      description: '동영상 플랫폼의 숏폼 혁명',
      trendCount: '850K+ 트렌드',
      color: '#25f4ee',
      gradient: 'linear-gradient(180deg, #25f4ee, #9d4edd)',
    },
  ];

  const features = [
    {
      icon: '⚡',
      title: '실시간 트렌드',
      description: '지금 가장 핫한 트렌드를 실시간으로 확인하고 빠르게 대응하세요',
      gradient: 'linear-gradient(180deg, #fe2c55, #9d4edd)',
    },
    {
      icon: '📊',
      title: '플랫폼 비교',
      description: '3개 플랫폼의 트렌드를 한눈에 비교하고 분석할 수 있습니다',
      gradient: 'linear-gradient(180deg, #25f4ee, #9d4edd)',
    },
    {
      icon: '⭐',
      title: '저장 기능',
      description: '관심있는 트렌드를 저장하고 나중에 다시 확인할 수 있습니다',
      gradient: 'linear-gradient(180deg, #9d4edd, #fe2c55)',
    },
  ];

  return (
    <div className={styles.landingPage}>
      {/* Header */}
      <PageHeader
        showMenu={false}
        actions={
          <div className={styles.headerButtons}>
            <button className={styles.loginButton} onClick={() => navigate('/login')}>로그인</button>
            <button className={styles.startButton} onClick={() => navigate('/dashboard')}>무료로 시작하기</button>
          </div>
        }
      />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.flameIcon}>🔥</span>
            <span>실시간으로 업데이트되는 숏폼 트렌드</span>
          </div>
          <h1 className={styles.heroTitle}>
            <span>지금 뜨는 숏폼 트렌드를</span>
            <span className={styles.gradientText}>한눈에 확인하세요</span>
          </h1>
          <p className={styles.heroDescription}>
            TikTok, Instagram Reels, YouTube Shorts의 최신 트렌드를 실시간으로 추적하고 분석합니다
          </p>
          <button className={styles.ctaButton} onClick={() => navigate('/dashboard')}>
            <span>트렌드 보기</span>
            <img src={arrowRightIcon} alt="arrow right" className={styles.ctaArrow} />
          </button>
        </div>
        <div className={styles.heroBackground}>
          <div className={styles.blurCircle1}></div>
          <div className={styles.blurCircle2}></div>
        </div>
      </section>

      {/* Top Trends Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🚀</span>
            오늘 급상승 트렌드 Top 3
          </h2>
          <p className={styles.sectionSubtitle}>
            지금 가장 핫한 해시태그를 확인하세요
          </p>
        </div>
        <div className={styles.topTrendsGrid}>
          {topTrends.map((trend) => (
            <div key={trend.rank} className={styles.trendCard}>
              <div className={styles.trendCardHeader}>
                <div className={styles.rankBadge} style={{ background: trend.gradient }}>
                  #{trend.rank}
                </div>
                <div className={styles.platformBadge} style={{ background: trend.gradient }}>
                  {trend.platform}
                </div>
              </div>
              <h3 className={styles.trendHashtag}>{trend.hashtag}</h3>
              <div className={styles.trendGrowth}>
                <img src={arrowUpIcon} alt="arrow up" className={styles.arrowIcon} />
                <span className={styles.growthText}>{trend.growth}</span>
                <span className={styles.timeText}>24시간</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Overview Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader} style={{ opacity: 0, visibility: 'hidden', height: 0, margin: 0, padding: 0 }}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>📱</span>
            지원 플랫폼
          </h2>
          <p className={styles.sectionSubtitle}>
            3개 주요 숏폼 플랫폼의 트렌드를 한곳에서
          </p>
        </div>
        <div className={styles.platformsGrid}>
          {platforms.map((platform) => (
            <div key={platform.name} className={styles.platformCard}>
              <div className={styles.platformIconContainer} style={{ background: platform.gradient }}>
                <span className={styles.platformIcon}>{platform.icon}</span>
              </div>
              <h3 className={styles.platformName}>{platform.name}</h3>
              <p className={styles.platformDescription}>{platform.description}</p>
              <p className={styles.platformTrendCount} style={{ color: platform.color }}>
                {platform.trendCount}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Features Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>✨</span>
            핵심 기능
          </h2>
          <p className={styles.sectionSubtitle}>
            크리에이터와 마케터를 위한 강력한 도구
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => {
            const iconSrc = index === 0 ? realtimeIcon : index === 1 ? comparisonIcon : saveIcon;
            return (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIconContainer} style={{ background: feature.gradient }}>
                  <img src={iconSrc} alt={feature.title} className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerTop}>
            <div className={styles.footerColumn}>
              <div className={styles.footerLogo}>
                <img src={footerLogoIcon} alt="ShortForm Radar" className={styles.footerLogoIcon} />
                <span className={styles.footerLogoText}>ShortForm Radar</span>
              </div>
              <p className={styles.footerDescription}>실시간 숏폼 트렌드 분석</p>
            </div>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>바로가기</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>대시보드</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>트렌드 검색</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/compare'); }}>플랫폼별 보기</a></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>법적 고지</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#">이용약관</a></li>
                <li><a href="#">개인정보처리방침</a></li>
                <li><a href="#">쿠키 정책</a></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>데이터 출처</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <div className={styles.dataSourceDot} style={{ backgroundColor: '#fe2c55' }}></div>
                  <span>TikTok API</span>
                </li>
                <li>
                  <div className={styles.dataSourceDot} style={{ backgroundColor: '#9d4edd' }}></div>
                  <span>Instagram Graph API</span>
                </li>
                <li>
                  <div className={styles.dataSourceDot} style={{ backgroundColor: '#25f4ee' }}></div>
                  <span>YouTube Data API</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.copyright}>© 2025 ShortForm Radar. All rights reserved.</p>
            <div className={styles.footerBottomLinks}>
              <a href="#">지원센터</a>
              <a href="#">블로그</a>
              <a href="#">문의하기</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;


import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Settings.module.css';
import UserMenu from './UserMenu';

const Settings: FunctionComponent = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weeklyReport: false,
    marketing: false,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className={styles.settings}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className={styles.logoIcon}></div>
            <span className={styles.logoText}>ShortForm Radar</span>
          </div>
          <UserMenu />
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.pageTitle}>설정</h1>
          <p className={styles.pageDescription}>계정 및 알림 설정을 관리하세요</p>
        </div>

        {/* Settings Sections */}
        <div className={styles.settingsSections}>
          {/* Account Information */}
          <div className={styles.settingsCard}>
            <div className={styles.cardHeader}>
              <svg className={styles.cardIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 10C11.3807 10 12.5 8.88071 12.5 7.5C12.5 6.11929 11.3807 5 10 5C8.61929 5 7.5 6.11929 7.5 7.5C7.5 8.88071 8.61929 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 12.5C7.23858 12.5 5 14.7386 5 17.5H15C15 14.7386 12.7614 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h2 className={styles.cardTitle}>계정 정보</h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoField}>
                <label className={styles.fieldLabel}>이메일</label>
                <p className={styles.fieldValue}>hong@example.com</p>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.infoField}>
                <div className={styles.infoRow}>
                  <svg className={styles.infoIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <label className={styles.fieldLabel}>가입일</label>
                    <p className={styles.fieldValue}>2024년 1월 15일</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className={styles.settingsCard}>
            <div className={styles.cardHeader}>
              <svg className={styles.cardIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C6.13401 2 3 5.13401 3 9C3 12.866 6.13401 16 10 16C13.866 16 17 12.866 17 9C17 5.13401 13.866 2 10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 6V10M10 12H10.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h2 className={styles.cardTitle}>알림 설정</h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.notificationItem}>
                <div className={styles.notificationInfo}>
                  <p className={styles.notificationTitle}>이메일 알림</p>
                  <p className={styles.notificationDescription}>새로운 트렌드 알림을 이메일로 받습니다</p>
                </div>
                <button
                  className={`${styles.toggle} ${notifications.email ? styles.toggleOn : styles.toggleOff}`}
                  onClick={() => handleToggle('email')}
                >
                  <div className={styles.toggleThumb}></div>
                </button>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.notificationItem}>
                <div className={styles.notificationInfo}>
                  <p className={styles.notificationTitle}>푸시 알림</p>
                  <p className={styles.notificationDescription}>브라우저 푸시 알림을 받습니다</p>
                </div>
                <button
                  className={`${styles.toggle} ${notifications.push ? styles.toggleOnPurple : styles.toggleOff}`}
                  onClick={() => handleToggle('push')}
                >
                  <div className={styles.toggleThumb}></div>
                </button>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.notificationItem}>
                <div className={styles.notificationInfo}>
                  <p className={styles.notificationTitle}>주간 리포트</p>
                  <p className={styles.notificationDescription}>매주 트렌드 요약을 받습니다</p>
                </div>
                <button
                  className={`${styles.toggle} ${notifications.weeklyReport ? styles.toggleOn : styles.toggleOff}`}
                  onClick={() => handleToggle('weeklyReport')}
                >
                  <div className={styles.toggleThumb}></div>
                </button>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.notificationItem}>
                <div className={styles.notificationInfo}>
                  <p className={styles.notificationTitle}>마케팅 알림</p>
                  <p className={styles.notificationDescription}>프로모션 및 새 기능 소식을 받습니다</p>
                </div>
                <button
                  className={`${styles.toggle} ${notifications.marketing ? styles.toggleOn : styles.toggleOff}`}
                  onClick={() => handleToggle('marketing')}
                >
                  <div className={styles.toggleThumb}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className={styles.settingsCard}>
            <h2 className={styles.cardTitle}>계정 관리</h2>
            <div className={styles.accountActions}>
              <button className={styles.actionButton}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>프로필 수정</span>
              </button>
              <button className={styles.actionButton}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4M10 8H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>로그아웃</span>
              </button>
              <div className={styles.divider}></div>
              <button className={`${styles.actionButton} ${styles.deleteButton}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>계정 삭제</span>
              </button>
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

export default Settings;


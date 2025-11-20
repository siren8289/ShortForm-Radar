import styles from './PageFooter.module.css';

const PageFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div className={styles.footerLogo}>
            <div className={styles.footerLogoIcon}></div>
            <span className={styles.footerLogoText}>ShortForm Radar</span>
          </div>
          <div className={styles.footerLinks}>
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">데이터 출처</a>
          </div>
        </div>
        <div className={styles.footerMiddle}>
          <div className={styles.dataSourceLabel}>데이터 출처:</div>
          <div className={styles.dataSourceList}>
            <div className={styles.dataSourceItem}>
              <span className={styles.dataSourceDot} style={{ backgroundColor: '#fe2c55' }}></span>
              <span>TikTok API</span>
            </div>
            <div className={styles.dataSourceItem}>
              <span className={styles.dataSourceDot} style={{ backgroundColor: '#9d4edd' }}></span>
              <span>Instagram Graph API</span>
            </div>
            <div className={styles.dataSourceItem}>
              <span className={styles.dataSourceDot} style={{ backgroundColor: '#25f4ee' }}></span>
              <span>YouTube Data API</span>
            </div>
          </div>
        </div>
        <p className={styles.footerBottom}>© 2025 ShortForm Radar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default PageFooter;


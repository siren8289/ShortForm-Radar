import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

const ForgotPassword: FunctionComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Integrate password reset API
    console.log('Send reset link to', email);
  };

  return (
    <div className={styles.forgotPage}>
      <div className={styles.backgroundContainer}>
        <div className={`${styles.blurCircle} ${styles.blurCirclePink}`} />
        <div className={`${styles.blurCircle} ${styles.blurCircleTeal}`} />
        <div className={`${styles.blurCircle} ${styles.blurCirclePurple}`} />
      </div>

      <div className={styles.content}>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>홈으로</span>
        </button>

        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 5L30 15L20 25L10 15L20 5Z" fill="url(#forgotLogoGradient)" />
              <defs>
                <linearGradient id="forgotLogoGradient" x1="10" y1="5" x2="30" y2="25" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fe2c55" />
                  <stop offset="1" stopColor="#9d4edd" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className={styles.logoText}>ShortForm Radar</h1>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>비밀번호 찾기</h2>
            <p className={styles.cardSubtitle}>가입하신 이메일로 재설정 링크를 보내드립니다</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formField}>
              <label className={styles.label} htmlFor="email">
                이메일
              </label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4L8 9L14 4M2 4H14M2 4V12C2 12.5523 2.44772 13 3 13H13C13.5523 13 14 12.5523 14 12V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              재설정 링크 보내기
            </button>
          </form>

          <button className={styles.returnButton} type="button" onClick={() => navigate('/login')}>
            ← 로그인으로 돌아가기
          </button>
        </div>

        <p className={styles.termsText}>
          계정을 만들면
          <button type="button">이용약관</button>
          과
          <button type="button">개인정보처리방침</button>
          에 동의하는 것으로 간주됩니다
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
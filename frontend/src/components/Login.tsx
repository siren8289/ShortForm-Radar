import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login: FunctionComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: integrate authentication
    console.log('Login submit', formData);
  };

  return (
    <div className={styles.loginPage}>
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
              <path d="M20 5L30 15L20 25L10 15L20 5Z" fill="url(#loginLogoGradient)" />
              <defs>
                <linearGradient id="loginLogoGradient" x1="10" y1="5" x2="30" y2="25" gradientUnits="userSpaceOnUse">
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
            <h2 className={styles.cardTitle}>로그인</h2>
            <p className={styles.cardSubtitle}>트렌드 분석을 시작하세요</p>
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
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.formField}>
              <label className={styles.label} htmlFor="password">
                비밀번호
              </label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 7V5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5V7M4 7H12M4 7H3C2.44772 7 2 7.44772 2 8V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V8C14 7.44772 13.5523 7 13 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.forgotPasswordRow}>
              <button className={styles.forgotPasswordButton} type="button">
                비밀번호를 잊으셨나요?
              </button>
            </div>

            <button type="submit" className={styles.submitButton}>
              로그인
            </button>
          </form>

          <div className={styles.switchAuth}>
            <span>계정이 없으신가요?</span>
            <button type="button" onClick={() => navigate('/signup')}>
              회원가입
            </button>
          </div>
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

export default Login;


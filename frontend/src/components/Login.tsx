import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import styles from './Login.module.css';

// Import SVG icons from assets
import backArrowIcon from '../assets/1d80a45a701e6bc73343d179556c42dc302e21fd.svg';
import logoIcon from '../assets/35fdf9bb562bd3147c62807ac9f3402344e3235d.svg';
import emailIcon from '../assets/88753f9926800c90d5ced166d16472f754a6ff67.svg';
import lockIcon from '../assets/48c69e421b14cd97c578346c783c8da292220336.svg';

const Login: FunctionComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message ?? '로그인에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
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
          <img src={backArrowIcon} alt="back" className={styles.backIcon} />
          <span>홈으로</span>
        </button>

        <div className={styles.logoContainer}>
          <img src={logoIcon} alt="ShortForm Radar" className={styles.logoIcon} />
          <h1 className={styles.logoText}>ShortForm Radar</h1>
        </div>

        <div className={styles.card}>
          <div className={styles.cardInner}>
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
                <img src={emailIcon} alt="email" className={styles.inputIcon} />
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
                <img src={lockIcon} alt="lock" className={styles.inputIcon} />
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
              <button className={styles.forgotPasswordButton} type="button" onClick={() => navigate('/forgot-password')}>
                비밀번호를 잊으셨나요?
              </button>
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className={styles.switchAuth}>
            <span>계정이 없으신가요?</span>
            <button type="button" onClick={() => navigate('/signup')}>
              회원가입
            </button>
          </div>
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

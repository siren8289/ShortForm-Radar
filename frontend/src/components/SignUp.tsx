import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import styles from './SignUp.module.css';

// Import SVG icons from assets
import backArrowIcon from '../assets/1d80a45a701e6bc73343d179556c42dc302e21fd.svg';
import logoIcon from '../assets/35fdf9bb562bd3147c62807ac9f3402344e3235d.svg';
import emailIcon from '../assets/88753f9926800c90d5ced166d16472f754a6ff67.svg';
import lockIcon from '../assets/48c69e421b14cd97c578346c783c8da292220336.svg';

const SignUp: FunctionComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await signup(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message ?? '회원가입에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.signUp}>
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
              <h2 className={styles.cardTitle}>회원가입</h2>
              <p className={styles.cardSubtitle}>새로운 계정을 만들어보세요</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Name Field */}
              <div className={styles.formField}>
                <label className={styles.label} htmlFor="name">
                  이름
                </label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 14C2 11.2386 4.23858 9 7 9H9C11.7614 9 14 11.2386 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className={styles.formField}>
                <label className={styles.label} htmlFor="email">
                  이메일
                </label>
                <div className={styles.inputWrapper}>
                  <img src={emailIcon} alt="email" className={styles.inputIcon} />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className={styles.formField}>
                <label className={styles.label} htmlFor="password">
                  비밀번호
                </label>
                <div className={styles.inputWrapper}>
                  <img src={lockIcon} alt="lock" className={styles.inputIcon} />
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className={styles.formField}>
                <label className={styles.label} htmlFor="confirmPassword">
                  비밀번호 확인
                </label>
                <div className={styles.inputWrapper}>
                  <img src={lockIcon} alt="lock" className={styles.inputIcon} />
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              {error && <p className={styles.errorMessage}>{error}</p>}

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? '계정 생성 중...' : '계정 만들기'}
              </button>
            </form>

            <div className={styles.switchAuth}>
              <span>이미 계정이 있으신가요?</span>
              <button type="button" onClick={() => navigate('/login')}>
                로그인
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

export default SignUp;

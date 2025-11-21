import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

// Import SVG icons from assets
import backArrowIcon from '../assets/1d80a45a701e6bc73343d179556c42dc302e21fd.svg';
import logoIcon from '../assets/3081358298afa247202b27fb6c5bf8f4b38ff134.svg';
import emailIcon from '../assets/88753f9926800c90d5ced166d16472f754a6ff67.svg';

const ForgotPassword: FunctionComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    // TODO: Integrate password reset API
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message ?? '재설정 링크 전송에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
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
              <h2 className={styles.cardTitle}>비밀번호 찾기</h2>
              <p className={styles.cardSubtitle}>가입하신 이메일로 재설정 링크를 보내드립니다</p>
            </div>

            {success ? (
              <div className={styles.successMessage}>
                <p>재설정 링크가 이메일로 전송되었습니다.</p>
                <p>이메일을 확인해주세요.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formField}>
                  <label className={styles.label} htmlFor="email">
                    이메일
                  </label>
                  <div className={styles.inputWrapper}>
                    <img src={emailIcon} alt="email" className={styles.inputIcon} />
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

                {error && <p className={styles.errorMessage}>{error}</p>}

                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? '전송 중...' : '재설정 링크 보내기'}
                </button>
              </form>
            )}

            <button className={styles.returnButton} type="button" onClick={() => navigate('/login')}>
              ← 로그인으로 돌아가기
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

export default ForgotPassword;

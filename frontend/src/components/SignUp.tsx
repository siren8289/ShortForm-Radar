import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

const SignUp: FunctionComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.signUp}>
      <div className={styles.authPage}>
        {/* Background Blur Effects */}
        <div className={styles.backgroundContainer}>
          <div className={styles.blurCircle1}></div>
          <div className={styles.blurCircle2}></div>
          <div className={styles.blurCircle3}></div>
        </div>

        {/* Main Content */}
        <div className={styles.contentContainer}>
          {/* Back Button */}
          <button className={styles.backButton} onClick={() => navigate('/')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>홈으로</span>
          </button>

          {/* Logo */}
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 5L30 15L20 25L10 15L20 5Z" fill="url(#logoGradient)"/>
                <defs>
                  <linearGradient id="logoGradient" x1="10" y1="5" x2="30" y2="25" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fe2c55"/>
                    <stop offset="1" stopColor="#9d4edd"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className={styles.logoText}>ShortForm Radar</h1>
          </div>

          {/* Form Container */}
          <div className={styles.formContainer}>
            <div className={styles.formContent}>
              <h2 className={styles.formTitle}>회원가입</h2>
              <p className={styles.formSubtitle}>새로운 계정을 만들어보세요</p>

              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Name Field */}
                <div className={styles.formField}>
                  <label className={styles.label}>이름</label>
                  <div className={styles.inputWrapper}>
                    <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 14C2 11.2386 4.23858 9 7 9H9C11.7614 9 14 11.2386 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
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
                  <label className={styles.label}>이메일</label>
                  <div className={styles.inputWrapper}>
                    <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4L8 9L14 4M2 4H14M2 4V12C2 12.5523 2.44772 13 3 13H13C13.5523 13 14 12.5523 14 12V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className={styles.formField}>
                  <label className={styles.label}>비밀번호</label>
                  <div className={styles.inputWrapper}>
                    <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 7V5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5V7M4 7H12M4 7H3C2.44772 7 2 7.44772 2 8V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V8C14 7.44772 13.5523 7 13 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className={styles.formField}>
                  <label className={styles.label}>비밀번호 확인</label>
                  <div className={styles.inputWrapper}>
                    <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 7V5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5V7M4 7H12M4 7H3C2.44772 7 2 7.44772 2 8V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V8C14 7.44772 13.5523 7 13 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton}>
                  계정 만들기
                </button>
              </form>

              {/* Login Link */}
              <div className={styles.loginLink}>
                <span>이미 계정이 있으신가요?</span>
                <button className={styles.loginButton} onClick={() => navigate('/login')}>로그인</button>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <p className={styles.footerText}>
            계정을 만들면{' '}
            <a href="#" className={styles.footerLink}>이용약관</a>
            과{' '}
            <a href="#" className={styles.footerLink}>개인정보처리방침</a>
            에 동의하는 것으로 간주됩니다
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


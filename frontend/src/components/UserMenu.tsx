import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserMenu.module.css';

const menuItems = [
  { label: '대시보드', path: '/dashboard' },
  { label: '저장된 트렌드', path: '/saved' },
  { label: '알림 설정', path: '/notifications' },
  { label: '설정', path: '/settings' },
];

const UserMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button className={styles.trigger} type="button" onClick={() => setIsOpen((prev) => !prev)}>
        <svg className={styles.triggerIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="currentColor" />
          <path d="M8 10C4.68629 10 2 12.6863 2 16H14C14 12.6863 11.3137 10 8 10Z" fill="currentColor" />
        </svg>
        <span className={styles.triggerLabel}>사용자</span>
      </button>
      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.menuPanel}>
            {menuItems.map((item) => (
              <button key={item.label} className={styles.menuItem} type="button" onClick={() => handleNavigate(item.path)}>
                {item.label}
              </button>
            ))}
            <div className={styles.divider} />
            <button className={styles.menuItem} type="button" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
          <div className={styles.menuGlow} />
        </div>
      )}
    </div>
  );
};

export default UserMenu;


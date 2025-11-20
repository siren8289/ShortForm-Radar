import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../UserMenu';
import styles from './PageHeader.module.css';

type PageHeaderProps = {
  showMenu?: boolean;
  actions?: ReactNode;
};

const PageHeader = ({ showMenu = true, actions }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>ShortForm Radar</span>
        </div>
        <div className={styles.headerRight}>
          {actions}
          {showMenu && <UserMenu />}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;


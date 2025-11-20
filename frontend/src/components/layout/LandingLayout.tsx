import { ReactNode } from 'react';
import styles from './LandingLayout.module.css';

type LandingLayoutProps = {
  children: ReactNode;
};

const LandingLayout = ({ children }: LandingLayoutProps) => (
  <div className={styles.layout}>
    {children}
  </div>
);

export default LandingLayout;


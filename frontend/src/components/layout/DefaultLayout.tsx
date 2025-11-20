import { ReactNode } from 'react';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import styles from './DefaultLayout.module.css';

type DefaultLayoutProps = {
  children: ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <div className={styles.layout}>
    <PageHeader />
    <main className={styles.main}>{children}</main>
    <PageFooter />
  </div>
);

export default DefaultLayout;


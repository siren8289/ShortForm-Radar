import { CSSProperties } from 'react';
import styles from './StatCard.module.css';

type StatCardProps = {
  label: string;
  value: string | number;
  accentColor?: string;
  className?: string;
};

const StatCard = ({ label, value, accentColor, className = '' }: StatCardProps) => {
  const valueClasses = [styles.value];
  const style: CSSProperties = {};

  if (accentColor) {
    valueClasses.push(styles.accent);
    style['--stat-accent' as never] = accentColor;
  }

  return (
    <div className={`${styles.card} ${className}`.trim()}>
      <p className={styles.label}>{label}</p>
      <p className={valueClasses.join(' ')} style={style}>
        {value}
      </p>
    </div>
  );
};

export default StatCard;


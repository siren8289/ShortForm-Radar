import { ButtonHTMLAttributes } from 'react';
import styles from './GradientButton.module.css';

type GradientButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

const GradientButton = ({ fullWidth, className = '', ...props }: GradientButtonProps) => {
  const classes = [styles.button, className];
  if (fullWidth) {
    classes.push(styles.fullWidth);
  }

  return <button {...props} className={classes.join(' ').trim()} />;
};

export default GradientButton;


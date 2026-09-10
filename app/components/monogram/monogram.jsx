import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="46"
      height="28"
      viewBox="0 0 46 28"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M19.5 0H5A5 5 0 0 0 0 5v4.5A5 5 0 0 0 5 14.5h9.5A1.5 1.5 0 0 1 16 16v7a1.5 1.5 0 0 1-1.5 1.5H0V28h14.5a5 5 0 0 0 5-5v-7a5 5 0 0 0-5-5H5A1.5 1.5 0 0 1 3.5 9.5V5A1.5 1.5 0 0 1 5 3.5h14.5V0Zm26 0H30A5 5 0 0 0 25 5v18a5 5 0 0 0 5 5h11a5 5 0 0 0 5-5V12.5H35V16h7.5v7a1.5 1.5 0 0 1-1.5 1.5H30A1.5 1.5 0 0 1 28.5 23V5A1.5 1.5 0 0 1 30 3.5h15.5V0Z" />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});

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
      width="44"
      height="30"
      viewBox="0 0 44 30"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          {/* Custom geometric SG monogram */}
          <path d="M15 2H4a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H2v-4h9v-3H4a4 4 0 0 1-4-4V5a4 4 0 0 1 4-4h11v4Zm27 0H26a4 4 0 0 0-4 4v17a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4v-9H33v4h9v5H26a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16V2Z" />
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

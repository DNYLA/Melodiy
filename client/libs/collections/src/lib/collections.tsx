import styles from './collections.module.css';

/* eslint-disable-next-line */
export interface CollectionsProps {}

export function Collections(props: CollectionsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Collections!</h1>
    </div>
  );
}

export default Collections;

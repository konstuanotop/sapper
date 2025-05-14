import { useSelector } from 'react-redux';
import styles from './Counter.module.scss';
import type { RootState } from '~/store/store';

const Counter = () => {

    let count = useSelector((state: RootState) => state.game.bombs);
    const flags = useSelector((state: RootState) => state.game.flagsIds.length);

    count -= flags;

    return (
        <div className={styles.counter}>
            {count}
        </div>
    )
}

export default Counter;
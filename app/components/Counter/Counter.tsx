import { useSelector } from 'react-redux';
import styles from './Counter.module.scss';
import type { RootState } from '~/store/store';
import { useEffect, useState } from 'react';

const Counter = () => {

    let bombs = useSelector((state: RootState) => state.game.bombs);
    const flags = useSelector((state: RootState) => state.game.flagsIds.length);

    const [count, setCount] = useState(useSelector((state: RootState) => state.game.bombs));

    useEffect(() => {
        setCount(bombs - flags)
    }, [flags])

    return (
        <div className={styles.counter}>
            {count}
        </div>
    )
}

export default Counter;
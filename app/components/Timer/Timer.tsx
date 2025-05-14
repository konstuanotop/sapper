import { useDispatch, useSelector } from 'react-redux';
import styles from './Timer.module.scss';
import type { RootState } from '~/store/store';
import { incrementTimer, startTimer } from '~/store/gameSlice';
import { useEffect } from 'react';


const Timer = () => {
    const dispatch = useDispatch();
    const {
        time,
        isRunning,
        firstClick,
        isWin,
        isDefeat
    } = useSelector((state: RootState) => state.game);

    useEffect(() => {

        if (!firstClick && !isRunning) {
            dispatch(startTimer());
        }

        let interval: NodeJS.Timeout;
        if (isRunning && !isWin && !isDefeat) {
            interval = setInterval(() => {
                dispatch(incrementTimer())
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }

    }, [isRunning, firstClick, isWin, isDefeat])

    const formatTime = (time: number) => {
        let seconds = time % 60;
        let minutes = Math.floor(time / 60);

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }



    return (
        <div className={styles.timer}>
            {formatTime(time)}
        </div>
    )
}

export default Timer;
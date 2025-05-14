import { useDispatch, useSelector } from 'react-redux';
import styles from './ResetGame.module.scss';
import { resetGame } from '~/store/gameSlice';
import type { RootState } from '~/store/store';


const ResetGame = () => {

    const dispatch = useDispatch()
    const { isWin, isDefeat } = useSelector((state: RootState) => state.game)

    const handleReset = () => {
        dispatch(resetGame())
    }

    const getButtonClass = () => {
        if (isWin) {
            return `${styles.btn} ${styles.win}`;
        }

        if (isDefeat) {
            return `${styles.btn} ${styles.defeat}`;
        }
        return `${styles.btn}`
    }

    return (
        <div className={styles.resetGame}>
            <button
                onClick={handleReset}
                className={getButtonClass()}
            >
            </button>
        </div>
    )
}

export default ResetGame;
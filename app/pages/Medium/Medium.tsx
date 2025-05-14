import GameZone from '~/components/GameZone/GameZone';
import styles from './Medium.module.scss';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { resetGame } from '~/store/gameSlice';

export function meta({ }) {
    return [
        { title: 'Средний уровень' }
    ]
}

const Medium = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetGame())
    }, [dispatch])

    const sizeX: number = 16;
    const sizeY: number = 16;
    const size: number = sizeX * sizeY;
    const bombs: number = 40;

    return (
        <div className={styles.medium}>
            <div className={styles.gameContainer}>
                <GameZone
                    sizeX={sizeX}
                    sizeY={sizeY}
                    size={size}
                    bombs={bombs}
                />
            </div>
        </div>
    )
}

export default Medium;